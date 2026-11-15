"""Series históricas de vegetación MODIS vía NASA AppEEARS (LP DAAC), consulta de punto.

Requiere una cuenta gratuita de NASA Earthdata en backend/.env (EARTHDATA_USERNAME / EARTHDATA_PASSWORD)
o en variables de entorno. AppEEARS es asíncrono: se envía una tarea, se espera y se descarga el CSV.
"""

import hashlib
import io
import os
import re
import time
from datetime import date
from pathlib import Path

import numpy as np
import pandas as pd
import requests

URL_BASE = "https://appeears.earthdatacloud.nasa.gov/api"
DIR_CACHE = Path(__file__).resolve().parent.parent / "data" / "appeears_cache"
ARCHIVO_ENV = Path(__file__).resolve().parent.parent / ".env"
TIMEOUT = (15, 120)
CODIGOS_REINTENTABLES = {429, 500, 502, 503, 504}


class ErrorAppEEARS(Exception):
    pass


def _credenciales():
    usuario = os.environ.get("EARTHDATA_USERNAME")
    clave = os.environ.get("EARTHDATA_PASSWORD")
    if (not usuario or not clave) and ARCHIVO_ENV.exists():
        for linea in ARCHIVO_ENV.read_text(encoding="utf-8").splitlines():
            if "=" not in linea or linea.strip().startswith("#"):
                continue
            k, v = linea.split("=", 1)
            k, v = k.strip(), v.strip().strip("'\"")
            if k == "EARTHDATA_USERNAME":
                usuario = usuario or v
            elif k == "EARTHDATA_PASSWORD":
                clave = clave or v
    if not usuario or not clave:
        raise ErrorAppEEARS(
            "Faltan credenciales de Earthdata: defina EARTHDATA_USERNAME y EARTHDATA_PASSWORD (backend/.env)"
        )
    return usuario, clave


class _Cliente:
    def __init__(self, reintentos=4, espera=5, verbose=True):
        self.s = requests.Session()
        self.token = None
        self.reintentos, self.espera, self.verbose = reintentos, espera, verbose
        self.requests = 0

    def login(self):
        r = self.s.post(f"{URL_BASE}/login", auth=_credenciales(), headers={"Content-Length": "0"}, timeout=TIMEOUT)
        if r.status_code != 200:
            raise ErrorAppEEARS(f"Login rechazado ({r.status_code}). Revise usuario/clave de Earthdata y autorice AppEEARS")
        self.token = r.json()["token"]

    def pedir(self, metodo, ruta, **kw):
        if self.token is None:
            self.login()
        url = ruta if ruta.startswith("http") else f"{URL_BASE}/{ruta}"
        ultimo, renovado = None, False
        for intento in range(self.reintentos + 1):
            self.requests += 1
            try:
                r = self.s.request(metodo, url, headers={"Authorization": f"Bearer {self.token}"}, timeout=TIMEOUT, **kw)
                if r.status_code == 403 and not renovado:
                    self.login()
                    renovado = True
                    continue
                if r.status_code < 400:
                    return r
                if r.status_code not in CODIGOS_REINTENTABLES:
                    raise ErrorAppEEARS(f"AppEEARS respondió {r.status_code} en {ruta}: {r.text[:300]}")
                ultimo = f"HTTP {r.status_code}"
            except (requests.Timeout, requests.ConnectionError) as e:
                ultimo = type(e).__name__
            if intento < self.reintentos:
                time.sleep(self.espera * 2**intento)
        raise ErrorAppEEARS(f"AppEEARS no respondió tras {self.reintentos + 1} intentos ({ultimo}): {ruta}")


def _fecha_api(ts):
    return ts.strftime("%m-%d-%Y")


def ejecutar_tarea_punto(
    cliente, nombre, inicio, fin, latitud, longitud, capas, sondeo=10, limite_espera=7200, verbose=True, task_id=None, al_enviar=None
):
    """Envía una tarea de punto (o retoma `task_id`), espera a que termine y devuelve (task_id, archivos del bundle)."""
    if task_id:
        try:
            if cliente.pedir("GET", f"task/{task_id}").json().get("status") == "error":
                task_id = None
        except ErrorAppEEARS:
            task_id = None
        if task_id and verbose:
            print(f"Retomando tarea existente: {task_id}", flush=True)
    tarea = {
        "task_type": "point",
        "task_name": nombre,
        "params": {
            "dates": [{"startDate": _fecha_api(inicio), "endDate": _fecha_api(fin)}],
            "layers": [{"product": p, "layer": c} for p, c in capas],
            "coordinates": [{"latitude": latitud, "longitude": longitud, "id": "punto", "category": "punto"}],
        },
    }
    if not task_id:
        task_id = cliente.pedir("POST", "task", json=tarea).json()["task_id"]
        if al_enviar:
            al_enviar(task_id)
        if verbose:
            print(f"Tarea enviada: {task_id}", flush=True)
    t0, ultimo, ultimo_aviso = time.time(), None, time.time()
    while True:
        estado = cliente.pedir("GET", f"task/{task_id}").json()
        st = estado.get("status")
        if verbose and (st != ultimo or time.time() - ultimo_aviso > 120):
            print(f"  estado: {st} ({round(time.time() - t0)} s)", flush=True)
            ultimo, ultimo_aviso = st, time.time()
        if st == "done":
            break
        if st == "error":
            raise ErrorAppEEARS(f"La tarea {task_id} terminó con error: {estado.get('error')}")
        if time.time() - t0 > limite_espera:
            raise ErrorAppEEARS(f"La tarea {task_id} no terminó en {limite_espera}s (sigue en AppEEARS)")
        time.sleep(sondeo)
    return task_id, cliente.pedir("GET", f"bundle/{task_id}").json()["files"]


def _calidad_vi(df, prefijo):
    return df[f"{prefijo}__250m_16_days_pixel_reliability"].isin([0, 1])


def _calidad_lai(df, prefijo):
    qc = df[f"{prefijo}_FparLai_QC"].fillna(255).astype(int)
    return ((qc >> 5) & 0b111) <= 1


def _variables_vi():
    return {
        "NDVI": {"capa": "_250m_16_days_NDVI", "longname": "Normalized Difference Vegetation Index", "unidades": "NDVI (adimensional)", "rango": (-0.2, 1.0)},
        "EVI": {"capa": "_250m_16_days_EVI", "longname": "Enhanced Vegetation Index", "unidades": "EVI (adimensional)", "rango": (-0.2, 1.0)},
    }


def _variables_lai():
    return {
        "LAI": {"capa": "Lai_500m", "longname": "Leaf Area Index", "unidades": "m2/m2", "rango": (0.0, 10.0)},
        "FPAR": {"capa": "Fpar_500m", "longname": "Fraction of Photosynthetically Active Radiation", "unidades": "fracción (0-1)", "rango": (0.0, 1.0)},
    }


def _vi(titulo, sensor):
    return {"titulo": titulo, "sensor": sensor, "resolucion_m": 250, "variables": _variables_vi(),
            "capa_calidad": "_250m_16_days_pixel_reliability", "calidad_ok": _calidad_vi,
            "criterio_calidad": "pixel_reliability en {0 buena, 1 marginal}"}


def _lai(titulo, sensor):
    return {"titulo": titulo, "sensor": sensor, "resolucion_m": 500, "variables": _variables_lai(),
            "capa_calidad": "FparLai_QC", "calidad_ok": _calidad_lai,
            "criterio_calidad": "SCF_QC <= 1 (método principal de retrieval)"}


PRODUCTOS = {
    "MOD13Q1.061": _vi("MODIS/Terra Vegetation Indices 16-Day L3 Global 250m SIN Grid V061", "MODIS Terra"),
    "MYD13Q1.061": _vi("MODIS/Aqua Vegetation Indices 16-Day L3 Global 250m SIN Grid V061", "MODIS Aqua"),
    "MOD15A2H.061": _lai("MODIS/Terra Leaf Area Index/FPAR 8-Day L4 Global 500 m SIN Grid V061", "MODIS Terra"),
    "MYD15A2H.061": _lai("MODIS/Aqua Leaf Area Index/FPAR 8-Day L4 Global 500 m SIN Grid V061", "MODIS Aqua"),
}


def listar_productos():
    return {n: {"titulo": p["titulo"], "resolucion_m": p["resolucion_m"],
                "variables": {v: d["unidades"] for v, d in p["variables"].items()}} for n, p in PRODUCTOS.items()}


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


def _csv_punto(cliente, producto, inicio, fin, lat, lon, capas, usar_cache, vigencia_dias, verbose):
    clave = hashlib.sha1(f"{producto}|{inicio.date()}|{fin.date()}|{lat:.5f}|{lon:.5f}|{sorted(capas)}".encode()).hexdigest()[:12]
    ruta = DIR_CACHE / f"{producto}_{lat:.4f}_{lon:.4f}_{inicio.year}-{fin.year}_{clave}.csv"
    if usar_cache and ruta.exists() and (time.time() - ruta.stat().st_mtime) / 86400 < vigencia_dias:
        if verbose:
            print(f"Usando caché: {ruta.name}")
        return pd.read_csv(ruta), True
    ruta_tarea = ruta.with_suffix(".task")
    previa = ruta_tarea.read_text().strip() if ruta_tarea.exists() else None

    def guardar_tarea(tid):
        ruta_tarea.parent.mkdir(parents=True, exist_ok=True)
        ruta_tarea.write_text(tid)

    nombre = f"vegetacion-{producto}-{lat:.3f}_{lon:.3f}-{int(time.time())}"
    task_id, archivos = ejecutar_tarea_punto(
        cliente, nombre, inicio, fin, lat, lon, [(producto, c) for c in capas],
        verbose=verbose, task_id=previa, al_enviar=guardar_tarea,
    )
    csvs = [f for f in archivos if f["file_name"].endswith("results.csv")]
    if not csvs:
        raise ErrorAppEEARS(f"La tarea {task_id} no generó CSV de resultados (¿punto fuera de tierra o sin datos?)")
    contenido = cliente.pedir("GET", f"bundle/{task_id}/{csvs[0]['file_id']}", allow_redirects=True).content
    if usar_cache:
        ruta.parent.mkdir(parents=True, exist_ok=True)
        ruta.write_bytes(contenido)
    ruta_tarea.unlink(missing_ok=True)
    return pd.read_csv(io.BytesIO(contenido)), False


def obtener_datos_appeears(
    fecha_inicio,
    fecha_fin,
    latitud,
    longitud,
    producto="MOD13Q1.061",
    variables=None,
    filtrar_calidad=True,
    agregacion="mensual",
    usar_cache=True,
    vigencia_cache_dias=7,
    verbose=True,
):
    """Serie histórica MODIS en un punto vía AppEEARS. Devuelve (df, metadatos) como API.py.

    producto: 'MOD13Q1.061' (NDVI/EVI), 'MYD13Q1.061', 'MOD15A2H.061' o 'MYD15A2H.061' (LAI/FPAR).
    agregacion: 'mensual' (media por mes, índice al inicio de mes) o None para la frecuencia nativa.
    """
    producto = str(producto).upper()
    if "." not in producto:
        producto += ".061"
    if producto not in PRODUCTOS:
        raise ValueError(f"Producto '{producto}' no soportado. Opciones: {list(PRODUCTOS)}")
    prod = PRODUCTOS[producto]
    variables = list(prod["variables"]) if variables is None else [variables] if isinstance(variables, str) else list(variables)
    variables = [v.upper() for v in variables]
    malas = [v for v in variables if v not in prod["variables"]]
    if malas or not variables:
        raise ValueError(f"Variables inválidas {malas} para {producto}. Opciones: {list(prod['variables'])}")
    if not -90 <= latitud <= 90 or not -180 <= longitud <= 180:
        raise ValueError(f"Coordenadas fuera de rango: lat={latitud}, lon={longitud}")
    if agregacion not in ("mensual", None):
        raise ValueError("agregacion debe ser 'mensual' o None")
    inicio, fin = _parsear_fecha(fecha_inicio, False), _parsear_fecha(fecha_fin, True)
    if inicio > fin:
        raise ValueError(f"fecha_inicio ({inicio.date()}) es posterior a fecha_fin ({fin.date()})")

    t0 = time.time()
    cliente = _Cliente(verbose=verbose)
    capas = [prod["variables"][v]["capa"] for v in variables]
    if filtrar_calidad:
        capas.append(prod["capa_calidad"])
    crudo, desde_cache = _csv_punto(cliente, producto, inicio, fin, latitud, longitud, capas, usar_cache, vigencia_cache_dias, verbose)

    prefijo = producto.replace(".", "_")
    crudo["Fecha"] = pd.to_datetime(crudo["Date"])
    crudo = crudo.set_index("Fecha").sort_index()
    crudo = crudo[(crudo.index >= inicio) & (crudo.index <= fin)]
    ok = prod["calidad_ok"](crudo, prefijo) if filtrar_calidad else None

    series, parametros, mensajes = {}, {}, []
    for v in variables:
        d = prod["variables"][v]
        col = crudo[f"{prefijo}_{d['capa']}"].astype(float)
        lo, hi = d["rango"]
        valido = col.between(lo, hi)
        if ok is not None:
            descartados = int((valido & ~ok).sum())
            valido &= ok
            if descartados:
                mensajes.append(f"{v}: {descartados} composites descartados por calidad")
        series[v] = col.where(valido)
        parametros[v] = {"units": d["unidades"], "longname": d["longname"]}
        mensajes.insert(0, f"{v}: {int(series[v].notna().sum())} de {len(col)} composites válidos")

    df = pd.DataFrame(series)
    df.index.name = "Fecha"
    if agregacion == "mensual":
        df = df.resample("MS").mean()
        df.index.name = "Fecha"

    metadatos = {
        "ubicacion_modelo": {"longitud": longitud, "latitud": latitud, "resolucion_m": prod["resolucion_m"],
                             "tile": crudo["MODIS_Tile"].iloc[0] if len(crudo) else None},
        "fuente": {"titulo": prod["titulo"],
                   "api": {"name": "NASA AppEEARS (LP DAAC)", "version": "v1", "url": URL_BASE},
                   "modelos_instrumentos": [prod["sensor"]]},
        "parametros": parametros,
        "calidad": {"filtrada": bool(filtrar_calidad), "criterio": prod["criterio_calidad"] if filtrar_calidad else None},
        "agregacion": agregacion or "nativa",
        "mensajes": mensajes,
        "tiempos_procesamiento": {"total_s": round(time.time() - t0, 1), "requests": cliente.requests, "desde_cache": desde_cache},
    }
    return df, metadatos
