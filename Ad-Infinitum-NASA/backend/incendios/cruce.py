"""Une los focos de CONAE y FIRMS, y marca cuales son incendios confirmados por area quemada.

Reglas:
- CONAE es la base para 2002 a 2024-10-01.
- FIRMS agrega detecciones solo en los meses faltantes de CONAE y desde 2024-10-02 hasta hoy.
  Una deteccion de FIRMS se considera ya presente en CONAE si coincide el mismo satelite, el mismo dia y
  esta a menos de 1 km.
- Incendio confirmado: existe un pixel quemado (MCD64A1 o VNP64A1) a menos de 1 km en el mismo mes.
  Si el mes no tiene granulo de area quemada, quemado queda en null (no evaluable).

Uso: python -m incendios.cruce
"""

import json
import sys
from datetime import date, datetime

import numpy as np
import pandas as pd
from pyproj import Transformer
from scipy.spatial import cKDTree
from shapely.geometry import Point, shape
from shapely.ops import unary_union

from incendios.config import (
    DIR_INCENDIOS, DIR_PROCESADO, DIR_RAW_AREAS, DIR_RAW_FIRMS, FIN_CONAE, FOCOS_CONAE,
    MESES_FALTANTES_CONAE, DATOS,
)
from incendios.indice_quemados import SIN_PROJ, fecha_granulo

DISTANCIA_MISMO_FOCO_M = 1000.0
DISTANCIA_QUEMADO_M = 1000.0
DISTANCIA_BORDE_DEG = 1000.0 / 111_000.0
SATELITES = ["TERRA", "AQUA", "SNPP", "NOAA20", "NOAA21"]
SAT_FIRMS = {"Terra": "TERRA", "Aqua": "AQUA", "N": "SNPP", "N20": "NOAA20", "N21": "NOAA21"}
CONFIANZA_VIIRS = {"l": 0, "n": 1, "h": 2}
ORIGEN = {"CONAE": 0, "FIRMS": 1}
ORIGEN_INVERSO = {v: k for k, v in ORIGEN.items()}

TO_SIN = Transformer.from_crs("EPSG:4326", SIN_PROJ, always_xy=True)


def cargar_conae():
    d = json.loads(FOCOS_CONAE.read_text(encoding="utf-8"))
    c = d["columnas"]
    filas = pd.DataFrame({
        "lon": c["lon"], "lat": c["lat"], "anio": c["anio"], "mes": c["mes"], "dia": c["dia"],
        "power": c["power"], "confianza": c["confianza"],
        "depto_nombre": [d["departamentos"][i] for i in c["depto"]],
        "sat": [d["satelites"][i] for i in c["sat"]],
    })
    filas["fecha"] = pd.to_datetime(dict(year=filas.anio, month=filas.mes, day=filas.dia)).dt.date
    filas["origen"] = "CONAE"
    filas["confianza_viirs"] = -1
    filas["hora"] = -1
    return filas, d["departamentos"]


def cargar_firms():
    partes = []
    for carpeta in sorted(DIR_RAW_FIRMS.iterdir()) if DIR_RAW_FIRMS.exists() else []:
        fuente = carpeta.name
        for archivo in sorted(carpeta.glob("*.csv")):
            df = pd.read_csv(archivo)
            if df.empty:
                continue
            df["fuente_firms"] = fuente
            partes.append(df)
    if not partes:
        return pd.DataFrame()
    crudo = pd.concat(partes, ignore_index=True)
    es_modis = crudo["instrument"].astype(str).str.upper().eq("MODIS")
    out = pd.DataFrame({
        "lon": crudo["longitude"].astype(float),
        "lat": crudo["latitude"].astype(float),
        "fecha": pd.to_datetime(crudo["acq_date"]).dt.date,
        "hora": crudo["acq_time"].astype(int),
        "sat": crudo["satellite"].astype(str).map(SAT_FIRMS),
        "power": crudo["frp"].astype(float),
        "confianza": np.where(es_modis, pd.to_numeric(crudo["confidence"], errors="coerce"), np.nan),
        "confianza_viirs": np.where(es_modis, -1, crudo["confidence"].astype(str).str.lower().map(CONFIANZA_VIIRS).fillna(-1)),
        "fuente_firms": crudo["fuente_firms"],
    })
    out["origen"] = "FIRMS"
    out = out.drop_duplicates(subset=["sat", "fecha", "hora", "lon", "lat"]).reset_index(drop=True)
    return out


def coordenadas_sin(df):
    x, y = TO_SIN.transform(df["lon"].to_numpy(), df["lat"].to_numpy())
    return np.asarray(x), np.asarray(y)


def faltantes_conae_fechas():
    fechas = set()
    for mes in MESES_FALTANTES_CONAE:
        anio, m = int(mes[:4]), int(mes[5:])
        fechas.add((anio, m))
    return fechas


def provincia():
    geo = json.loads((DATOS / "departamentos.geojson").read_text(encoding="utf-8"))
    return unary_union([shape(f["geometry"]) for f in geo["features"]])


def filtrar_periodo_firms(firms):
    """Conserva solo las detecciones de los meses faltantes y las posteriores al fin de CONAE,
    dentro de la provincia (la consulta de FIRMS usa una caja rectangular que incluye provincias vecinas)."""
    if firms.empty:
        return firms
    meses_falt = faltantes_conae_fechas()
    desde_post = FIN_CONAE.toordinal() + 1
    en_falt = firms["fecha"].apply(lambda f: (f.year, f.month) in meses_falt)
    en_post = firms["fecha"].apply(lambda f: f.toordinal() >= desde_post)
    periodo = firms[en_falt | en_post].reset_index(drop=True)
    prov = provincia()
    dentro = [prov.distance(Point(lo, la)) <= DISTANCIA_BORDE_DEG for lo, la in zip(periodo["lon"], periodo["lat"])]
    return periodo[np.array(dentro, dtype=bool)].reset_index(drop=True)


def quitar_ya_en_conae(firms, conae):
    """Quita detecciones de FIRMS que ya estan en CONAE (mismo satelite, mismo dia, a menos de 1 km)."""
    if firms.empty or conae.empty:
        return firms
    conae_x, conae_y = coordenadas_sin(conae)
    firms_x, firms_y = coordenadas_sin(firms)
    duplicado = np.zeros(len(firms), dtype=bool)
    grupos_conae = conae.assign(x=conae_x, y=conae_y).groupby(["fecha", "sat"]).indices
    indices = conae.assign(x=conae_x, y=conae_y)
    for (fecha, sat), idx_firms in firms.groupby(["fecha", "sat"]).indices.items():
        idx_conae = grupos_conae.get((fecha, sat))
        if idx_conae is None:
            continue
        arbol = cKDTree(np.column_stack([indices["x"].to_numpy()[idx_conae], indices["y"].to_numpy()[idx_conae]]))
        consultas = np.column_stack([firms_x[idx_firms], firms_y[idx_firms]])
        dist, _ = arbol.query(consultas, distance_upper_bound=DISTANCIA_MISMO_FOCO_M)
        duplicado[idx_firms] = np.isfinite(dist)
    return firms[~duplicado].reset_index(drop=True)


def cargar_granulos_disponibles():
    """Meses con granulo de area quemada por producto (evaluables aunque no tengan pixeles quemados)."""
    disponibles = {}
    for producto in ("MCD64A1", "VNP64A1"):
        carpeta = DIR_RAW_AREAS / producto
        if not carpeta.exists():
            continue
        meses = set()
        for archivo in carpeta.iterdir():
            if archivo.suffix.lower() in (".hdf", ".h5") and archivo.name.startswith(producto):
                try:
                    meses.add(fecha_granulo(archivo.name).strftime("%Y-%m"))
                except ValueError:
                    continue
        disponibles[producto] = meses
    return disponibles


def cargar_quemados():
    tablas = {}
    for producto in ("MCD64A1", "VNP64A1"):
        ruta = DIR_PROCESADO / f"quemados_{producto}.parquet"
        if ruta.exists():
            tablas[producto] = pd.read_parquet(ruta)
    return tablas


def marcar_quemados(df, quemados, evaluables):
    """Agrega quemado (True/False/None), sensor_quemado y distancia_quemado_m."""
    n = len(df)
    quemado = np.full(n, None, dtype=object)
    sensor = np.full(n, "", dtype=object)
    distancia = np.full(n, np.nan)
    evaluable_alguno = np.zeros(n, dtype=bool)
    detectado = np.zeros(n, dtype=bool)
    mes = pd.to_datetime(df["fecha"]).dt.strftime("%Y-%m").to_numpy()
    x, y = coordenadas_sin(df)

    for producto, tabla in quemados.items():
        if tabla.empty:
            continue
        for m, grupo in tabla.groupby("mes"):
            idx = np.nonzero(mes == m)[0]
            if idx.size == 0:
                continue
            arbol = cKDTree(np.column_stack([grupo["x_m"].to_numpy(), grupo["y_m"].to_numpy()]))
            dist, _ = arbol.query(np.column_stack([x[idx], y[idx]]), distance_upper_bound=DISTANCIA_QUEMADO_M)
            hit = np.isfinite(dist)
            detectado[idx[hit]] = True
            for i, d in zip(idx[hit], dist[hit]):
                if not np.isfinite(distancia[i]) or d < distancia[i]:
                    distancia[i] = d
                sensor[i] = producto if sensor[i] == "" else (sensor[i] if producto in sensor[i] else sensor[i] + "+" + producto)
    for producto, meses in evaluables.items():
        if not meses:
            continue
        en_eval = np.isin(mes, list(meses))
        evaluable_alguno |= en_eval

    quemado[evaluable_alguno] = False
    quemado[detectado] = True
    out = df.copy()
    out["quemado"] = quemado
    out["sensor_quemado"] = sensor
    out["distancia_quemado_m"] = distancia
    out["evaluable"] = evaluable_alguno
    return out


def asignar_departamento(df, nombres_conae):
    geo = json.loads((DATOS / "departamentos.geojson").read_text(encoding="utf-8"))
    poligonos = [(f["properties"].get("nombre") or f["properties"].get("NAME_2"), shape(f["geometry"])) for f in geo["features"]]
    nombres = []
    for lon, lat in zip(df["lon"], df["lat"]):
        p = Point(lon, lat)
        nombre = None
        for n, poli in poligonos:
            if poli.contains(p):
                nombre = n
                break
        if nombre is None:
            mas_cercano = min(poligonos, key=lambda np_: np_[1].distance(p))
            if mas_cercano[1].distance(p) <= DISTANCIA_BORDE_DEG:
                nombre = mas_cercano[0]
        nombres.append(nombre)
    out = df.copy()
    out["depto_nombre"] = [n if n is not None else (prev or None) for n, prev in zip(nombres, df["depto_nombre"])]
    return out


def unificar():
    conae, nombres_conae = cargar_conae()
    firms = filtrar_periodo_firms(cargar_firms())
    firms_nuevos = quitar_ya_en_conae(firms, conae)
    print(f"CONAE: {len(conae)} focos | FIRMS en periodo: {len(firms)} | FIRMS nuevos: {len(firms_nuevos)}", flush=True)
    union = pd.concat([conae, firms_nuevos], ignore_index=True)
    union = union.sort_values(["fecha", "hora"]).reset_index(drop=True)
    return union, nombres_conae


def construir_salida(df, nombres_conae):
    departamentos = list(nombres_conae)
    for n in df["depto_nombre"].dropna().unique():
        if n not in departamentos:
            departamentos.append(n)
    depto_idx = [departamentos.index(n) if n in departamentos else -1 for n in df["depto_nombre"]]
    sat_idx = [SATELITES.index(s) if s in SATELITES else -1 for s in df["sat"]]
    fechas = pd.to_datetime(df["fecha"])
    columnas = {
        "lon": [round(float(v), 6) for v in df["lon"]],
        "lat": [round(float(v), 6) for v in df["lat"]],
        "anio": fechas.dt.year.astype(int).tolist(),
        "mes": fechas.dt.month.astype(int).tolist(),
        "dia": fechas.dt.day.astype(int).tolist(),
        "power": [None if pd.isna(v) else round(float(v), 2) for v in df["power"]],
        "confianza": [None if pd.isna(v) else int(v) for v in df["confianza"]],
        "confianza_viirs": df["confianza_viirs"].astype(int).tolist(),
        "depto": depto_idx,
        "sat": sat_idx,
        "origen": [ORIGEN[o] for o in df["origen"]],
        "quemado": [None if q is None or (isinstance(q, float) and np.isnan(q)) else bool(q) for q in df["quemado"]],
        "sensor_quemado": df["sensor_quemado"].tolist(),
        "distancia_quemado_m": [None if pd.isna(v) else round(float(v), 1) for v in df["distancia_quemado_m"]],
    }
    return {
        "fuente": "CONAE / Gobierno de San Luis (2002-2024-10) + NASA FIRMS (meses faltantes y desde 2024-10-02); "
                  "incendio confirmado por NASA MCD64A1 y VNP64A1 (area quemada, 1 km, mismo mes)",
        "generado": datetime.now().isoformat(timespec="seconds"),
        "descargado": date.today().isoformat(),
        "n": int(len(df)),
        "fechaMin": str(df["fecha"].min()),
        "fechaMax": str(df["fecha"].max()),
        "departamentos": departamentos,
        "satelites": SATELITES,
        "sensores": ["MODIS" if s in ("TERRA", "AQUA") else "VIIRS" for s in SATELITES],
        "origenes": ORIGEN_INVERSO,
        "notas": [
            "origen: 0 = CONAE, 1 = FIRMS (completa meses faltantes y desde 2024-10-02).",
            "quemado: true si hay pixel quemado a menos de 1 km en el mismo mes; false si el mes es evaluable y no hay quemado; null si no hay granulo de area quemada.",
            "confianza: numerica (MODIS/CONAE). confianza_viirs: -1 n/a, 0 baja, 1 nominal, 2 alta (FIRMS VIIRS).",
            "Datos derivados de CONAE, sin licencia declarada: uso restringido hasta confirmar autorizacion.",
        ],
        "columnas": columnas,
    }


def resumen(df):
    e = df[df["quemado"].notna()]
    por_anio = df.groupby([pd.to_datetime(df["fecha"]).dt.year, "origen"]).size().unstack(fill_value=0)
    confirmados = df[df["quemado"] == True]  # noqa: E712
    return {
        "total": int(len(df)),
        "por_origen": df["origen"].value_counts().to_dict(),
        "evaluables": int(df["evaluable"].sum()),
        "confirmados_incendio": int(len(confirmados)),
        "tasa_confirmacion_evaluables": round(float(len(confirmados) / max(1, len(e))), 4),
        "por_sensor_quemado": confirmados["sensor_quemado"].value_counts().to_dict(),
        "por_anio": {str(k): v for k, v in por_anio.to_dict(orient="index").items()},
    }


def main():
    union, nombres_conae = unificar()
    granulos = cargar_granulos_disponibles()
    print("granulos disponibles por mes:", {k: len(v) for k, v in granulos.items()}, flush=True)
    marcado = marcar_quemados(union, cargar_quemados(), granulos)
    marcado = asignar_departamento(marcado, nombres_conae)
    salida = construir_salida(marcado, nombres_conae)
    DIR_INCENDIOS.mkdir(parents=True, exist_ok=True)
    (DIR_INCENDIOS / "focos_confirmados.compact.json").write_text(
        json.dumps(salida, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    (DIR_INCENDIOS / "resumen.json").write_text(
        json.dumps(resumen(marcado), indent=2, ensure_ascii=False, default=str), encoding="utf-8")
    print("RESULTADO:", json.dumps(resumen(marcado), ensure_ascii=False, default=str), flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
