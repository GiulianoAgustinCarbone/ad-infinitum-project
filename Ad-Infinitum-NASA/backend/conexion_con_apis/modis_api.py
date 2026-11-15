"""Series históricas de vegetación MODIS (NDVI, EVI, LAI, FPAR) vía ORNL DAAC TESViS Web Service.

Devuelve (df, metadatos) con el mismo formato que API.py: índice "Fecha" y una columna por variable.
El servicio es lento e inestable (~55 s por request, 502/503 frecuentes) y admite como máximo 10 fechas
por request, por eso se descarga en secuencia, con reintentos y con caché en disco reanudable.
"""

import json
import re
import time
from datetime import date
from pathlib import Path

import numpy as np
import pandas as pd
import requests

URL_BASE = "https://modis.ornl.gov/rst/api/v1"
DIR_CACHE = Path(__file__).resolve().parent.parent / "data" / "modis_cache"
HEADERS = {"Accept": "application/json"}
MAX_FECHAS_POR_REQUEST = 10
TIMEOUT = (15, 90)
CODIGOS_REINTENTABLES = {429, 500, 502, 503, 504}
VIGENCIA_FECHAS_DIAS = 7


class ErrorMODIS(Exception):
    pass


def _calidad_vi(q):
    return np.isin(q, (0, 1))


def _calidad_lai(q):
    return ((q.astype(int) >> 5) & 0b111) <= 1


def _variables_vi():
    return {
        "NDVI": {
            "banda": "250m_16_days_NDVI",
            "longname": "Normalized Difference Vegetation Index",
            "unidades": "NDVI (adimensional)",
            "rango": (-2000, 10000),
            "escala": 0.0001,
        },
        "EVI": {
            "banda": "250m_16_days_EVI",
            "longname": "Enhanced Vegetation Index",
            "unidades": "EVI (adimensional)",
            "rango": (-2000, 10000),
            "escala": 0.0001,
        },
    }


def _variables_lai():
    return {
        "LAI": {
            "banda": "Lai_500m",
            "longname": "Leaf Area Index",
            "unidades": "m2/m2",
            "rango": (0, 100),
            "escala": 0.1,
        },
        "FPAR": {
            "banda": "Fpar_500m",
            "longname": "Fraction of Photosynthetically Active Radiation",
            "unidades": "fracción (0-1)",
            "rango": (0, 100),
            "escala": 0.01,
        },
    }


PRODUCTOS = {
    "MOD13Q1": {
        "titulo": "MODIS/Terra Vegetation Indices (NDVI/EVI) 16-Day L3 Global 250m SIN Grid",
        "sensor": "MODIS Terra",
        "resolucion_m": 250,
        "variables": _variables_vi(),
        "banda_calidad": "250m_16_days_pixel_reliability",
        "criterio_calidad": "pixel_reliability en {0 buena, 1 marginal}",
        "calidad_ok": _calidad_vi,
    },
    "MYD13Q1": {
        "titulo": "MODIS/Aqua Vegetation Indices (NDVI/EVI) 16-Day L3 Global 250m SIN Grid",
        "sensor": "MODIS Aqua",
        "resolucion_m": 250,
        "variables": _variables_vi(),
        "banda_calidad": "250m_16_days_pixel_reliability",
        "criterio_calidad": "pixel_reliability en {0 buena, 1 marginal}",
        "calidad_ok": _calidad_vi,
    },
    "MOD15A2H": {
        "titulo": "MODIS/Terra Leaf Area Index/FPAR 8-Day L4 Global 500 m SIN Grid",
        "sensor": "MODIS Terra",
        "resolucion_m": 500,
        "variables": _variables_lai(),
        "banda_calidad": "FparLai_QC",
        "criterio_calidad": "SCF_QC <= 1 (método principal de retrieval)",
        "calidad_ok": _calidad_lai,
    },
    "MYD15A2H": {
        "titulo": "MODIS/Aqua Leaf Area Index/FPAR 8-Day L4 Global 500 m SIN Grid",
        "sensor": "MODIS Aqua",
        "resolucion_m": 500,
        "variables": _variables_lai(),
        "banda_calidad": "FparLai_QC",
        "criterio_calidad": "SCF_QC <= 1 (método principal de retrieval)",
        "calidad_ok": _calidad_lai,
    },
}


def listar_productos():
    """Productos soportados y sus variables."""
    return {
        nombre: {
            "titulo": p["titulo"],
            "resolucion_m": p["resolucion_m"],
            "variables": {v: d["unidades"] for v, d in p["variables"].items()},
        }
        for nombre, p in PRODUCTOS.items()
    }


def _get(sesion, ruta, params, estadisticas, reintentos, espera, verbose):
    url = f"{URL_BASE}/{ruta}"
    ultimo = None
    for intento in range(reintentos + 1):
        estadisticas["requests"] += 1
        try:
            r = sesion.get(url, params=params, headers=HEADERS, timeout=TIMEOUT)
            if r.status_code == 200:
                return r.json()
            if r.status_code not in CODIGOS_REINTENTABLES:
                raise ErrorMODIS(f"Error en la API: {r.status_code} - {r.text[:200]}")
            ultimo = f"HTTP {r.status_code}"
        except (requests.Timeout, requests.ConnectionError) as e:
            ultimo = type(e).__name__
        if intento < reintentos:
            estadisticas["reintentos"] += 1
            pausa = min(espera * 2**intento, 60)
            if verbose:
                print(f"   {ultimo} en {ruta}; reintento {intento + 1}/{reintentos} en {pausa}s")
            time.sleep(pausa)
    raise ErrorMODIS(f"El servicio ORNL no respondió tras {reintentos + 1} intentos ({ultimo}): {ruta}")


def _escribir_json(ruta, contenido):
    ruta.parent.mkdir(parents=True, exist_ok=True)
    tmp = ruta.with_suffix(".tmp")
    tmp.write_text(json.dumps(contenido), encoding="utf-8")
    tmp.replace(ruta)


def _leer_json(ruta):
    try:
        return json.loads(ruta.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return None


def _parsear_fecha(valor, es_fin):
    if valor is None:
        return pd.Timestamp(date.today())
    texto = str(valor).strip()
    if re.fullmatch(r"\d{4}", texto):
        anio = int(texto)
        return pd.Timestamp(anio, 12, 31) if es_fin else pd.Timestamp(anio, 1, 1)
    try:
        ts = pd.Timestamp(texto)
    except ValueError:
        raise ValueError(f"Fecha inválida: {valor!r}. Use 'YYYY', 'YYYY-MM' o 'YYYY-MM-DD'")
    if es_fin and re.fullmatch(r"\d{4}-\d{2}", texto):
        ts = ts + pd.offsets.MonthEnd(0)
    return ts


def _fechas_disponibles(sesion, producto, lat, lon, usar_cache, cfg):
    ruta = DIR_CACHE / f"{producto}_dates_{lat:.5f}_{lon:.5f}.json"
    if usar_cache and ruta.exists():
        edad_dias = (time.time() - ruta.stat().st_mtime) / 86400
        cache = _leer_json(ruta)
        if cache and edad_dias < VIGENCIA_FECHAS_DIAS:
            return cache
    data = _get(sesion, f"{producto}/dates", {"latitude": lat, "longitude": lon}, **cfg)
    fechas = [{"modis_date": d["modis_date"], "calendar_date": d["calendar_date"]} for d in data["dates"]]
    if usar_cache:
        _escribir_json(ruta, fechas)
    return fechas


def _descargar_banda(sesion, producto, banda, lat, lon, km, fechas, usar_cache, cfg):
    """Descarga `banda` para todas las `fechas` (lotes de 10) y devuelve {calendar_date: [pixeles]} y la escala."""
    ruta = DIR_CACHE / f"{producto}_{banda}_{lat:.5f}_{lon:.5f}_km{km}.json"
    cache = (_leer_json(ruta) if usar_cache else None) or {"escala": None, "datos": {}}
    por_modis = {f["modis_date"]: f["calendar_date"] for f in fechas}

    lotes = [fechas[i : i + MAX_FECHAS_POR_REQUEST] for i in range(0, len(fechas), MAX_FECHAS_POR_REQUEST)]
    pendientes = [l for l in lotes if any(f["calendar_date"] not in cache["datos"] for f in l)]
    if cfg["verbose"] and pendientes:
        print(f" {banda}: {len(pendientes)} de {len(lotes)} lotes por descargar")

    for n, lote in enumerate(pendientes, 1):
        params = {
            "latitude": lat,
            "longitude": lon,
            "band": banda,
            "startDate": lote[0]["modis_date"],
            "endDate": lote[-1]["modis_date"],
            "kmAboveBelow": km,
            "kmLeftRight": km,
        }
        try:
            data = _get(sesion, f"{producto}/subset", params, **cfg)
        except ErrorMODIS:
            if usar_cache:
                _escribir_json(ruta, cache)
            raise
        for f in lote:
            cache["datos"].setdefault(f["calendar_date"], [])
        for s in data.get("subset", []):
            clave = por_modis.get(s["modis_date"], s.get("calendar_date"))
            if clave:
                cache["datos"][clave] = s["data"]
        try:
            cache["escala"] = float(data["scale"])
        except (KeyError, TypeError, ValueError):
            pass
        if usar_cache:
            _escribir_json(ruta, cache)
        if cfg["verbose"]:
            print(f"   lote {n}/{len(pendientes)} OK ({lote[0]['calendar_date']} a {lote[-1]['calendar_date']})")
    return cache["datos"], cache["escala"]


def _serie_variable(datos, calidad, def_var, escala, calidad_ok):
    """Promedia los píxeles válidos de cada fecha; devuelve (Serie, n_descartadas_por_calidad, n_validas)."""
    lo, hi = def_var["rango"]
    valores, fechas = [], []
    descartadas = 0
    for fecha, pix in datos.items():
        arr = np.asarray(pix, dtype=float)
        valido = (arr >= lo) & (arr <= hi) if arr.size else np.zeros(0, dtype=bool)
        if calidad is not None:
            q = calidad.get(fecha)
            if q is None or len(q) != arr.size:
                mascara_q = np.zeros(arr.size, dtype=bool)
            else:
                mascara_q = calidad_ok(np.asarray(q, dtype=float))
            if valido.any() and not (valido & mascara_q).any():
                descartadas += 1
            valido &= mascara_q
        fechas.append(pd.Timestamp(fecha))
        valores.append(arr[valido].mean() * escala if valido.any() else np.nan)
    serie = pd.Series(valores, index=pd.DatetimeIndex(fechas), dtype=float).sort_index()
    return serie, descartadas


def obtener_datos_modis(
    fecha_inicio,
    fecha_fin,
    latitud,
    longitud,
    producto="MOD13Q1",
    variables=None,
    km_alrededor=0,
    filtrar_calidad=True,
    agregacion="mensual",
    usar_cache=True,
    reintentos=5,
    espera=10,
    verbose=True,
):
    """Serie histórica MODIS en un punto. Devuelve (df, metadatos) como API.py.

    fecha_inicio/fecha_fin: 'YYYY', 'YYYY-MM' o 'YYYY-MM-DD' (fecha_fin=None usa hoy).
    variables: lista de nombres (ver listar_productos()); None = todas las del producto.
    km_alrededor: 0 = píxel central; n>0 promedia el cuadrado de (2n+1) km de lado (más lento).
    agregacion: 'mensual' (media de composites por mes, índice al inicio del mes, compatible con
    tendencias.py) o None para mantener la frecuencia nativa del producto.
    """
    producto = str(producto).upper()
    if producto not in PRODUCTOS:
        raise ValueError(f"Producto '{producto}' no soportado. Opciones: {list(PRODUCTOS)}")
    prod = PRODUCTOS[producto]

    if variables is None:
        variables = list(prod["variables"])
    elif isinstance(variables, str):
        variables = [variables]
    variables = [v.upper() for v in variables]
    desconocidas = [v for v in variables if v not in prod["variables"]]
    if desconocidas or not variables:
        raise ValueError(f"Variables inválidas {desconocidas} para {producto}. Opciones: {list(prod['variables'])}")

    if not -90 <= latitud <= 90 or not -180 <= longitud <= 180:
        raise ValueError(f"Coordenadas fuera de rango: lat={latitud}, lon={longitud}")
    if not isinstance(km_alrededor, int) or not 0 <= km_alrededor <= 100:
        raise ValueError("km_alrededor debe ser un entero entre 0 y 100")
    if agregacion not in ("mensual", None):
        raise ValueError("agregacion debe ser 'mensual' o None")

    inicio = _parsear_fecha(fecha_inicio, es_fin=False)
    fin = _parsear_fecha(fecha_fin, es_fin=True)
    if inicio > fin:
        raise ValueError(f"fecha_inicio ({inicio.date()}) es posterior a fecha_fin ({fin.date()})")

    t0 = time.time()
    estadisticas = {"requests": 0, "reintentos": 0}
    cfg = {"estadisticas": estadisticas, "reintentos": reintentos, "espera": espera, "verbose": verbose}
    mensajes = []

    with requests.Session() as sesion:
        if verbose:
            print(f"Consultando fechas disponibles de {producto}...")
        todas = _fechas_disponibles(sesion, producto, latitud, longitud, usar_cache, cfg)
        fechas = [f for f in todas if inicio <= pd.Timestamp(f["calendar_date"]) <= fin]
        if not fechas:
            raise ErrorMODIS(
                f"No hay composites de {producto} entre {inicio.date()} y {fin.date()} "
                f"(disponibles: {todas[0]['calendar_date']} a {todas[-1]['calendar_date']})"
            )

        calidad = None
        if filtrar_calidad:
            calidad, _ = _descargar_banda(
                sesion, producto, prod["banda_calidad"], latitud, longitud, km_alrededor, fechas, usar_cache, cfg
            )

        series, parametros, tiles = {}, {}, set()
        for nombre in variables:
            d = prod["variables"][nombre]
            datos, escala = _descargar_banda(
                sesion, producto, d["banda"], latitud, longitud, km_alrededor, fechas, usar_cache, cfg
            )
            escala = escala if escala is not None else d["escala"]
            serie, descartadas = _serie_variable(datos, calidad, d, escala, prod["calidad_ok"])
            series[nombre] = serie
            parametros[nombre] = {"units": d["unidades"], "longname": d["longname"]}
            nulos = int(serie.isna().sum())
            mensajes.append(f"{nombre}: {len(serie) - nulos} de {len(serie)} composites válidos")
            if filtrar_calidad and descartadas:
                mensajes.append(f"{nombre}: {descartadas} composites descartados por calidad")

    df = pd.DataFrame(series)
    df.index.name = "Fecha"
    if agregacion == "mensual":
        df = df.resample("MS").mean()
        df.index.name = "Fecha"

    metadatos = {
        "ubicacion_modelo": {
            "longitud": longitud,
            "latitud": latitud,
            "resolucion_m": prod["resolucion_m"],
            "km_alrededor": km_alrededor,
        },
        "fuente": {
            "titulo": prod["titulo"],
            "api": {"name": "ORNL DAAC TESViS MODIS Web Service", "version": "v1", "url": URL_BASE},
            "modelos_instrumentos": [prod["sensor"]],
        },
        "parametros": parametros,
        "calidad": {
            "filtrada": bool(filtrar_calidad),
            "criterio": prod["criterio_calidad"] if filtrar_calidad else None,
        },
        "agregacion": agregacion or "nativa",
        "mensajes": mensajes,
        "tiempos_procesamiento": {
            "total_s": round(time.time() - t0, 1),
            "requests": estadisticas["requests"],
            "reintentos": estadisticas["reintentos"],
        },
    }
    return df, metadatos


if __name__ == "__main__":
    df, meta = obtener_datos_modis("2023-01", "2023-06", -33.2948, -66.3358, "MOD13Q1", ["NDVI", "EVI"])
    print(df)
    print(meta["mensajes"], meta["tiempos_procesamiento"])
