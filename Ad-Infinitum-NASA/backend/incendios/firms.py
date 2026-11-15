"""Cliente de la API de area de NASA FIRMS, con control de cuota y cache en disco.

Cada llamada devuelve hasta 5 dias de detecciones en la provincia de San Luis. La respuesta cruda se guarda
en raw/firms/<fuente>/<AAAAMMDD>.csv, asi que una corrida interrumpida retoma sin repetir llamadas.
"""

import io
import re
import time
from datetime import date, timedelta

import pandas as pd
import requests

from incendios.config import BBOX, DIR_RAW_FIRMS, ENV

BASE = "https://firms.modaps.eosdis.nasa.gov/"
LIMITE_TRANSACCIONES = 5000
VENTANA_MIN = 10
UMBRAL_PAUSA = 4500
DIAS_POR_LLAMADA = 5
REINTENTOS = 4

# Familias de sensores: SP (estandar) y NRT (reciente). Se usa SP cuando la fecha esta en su rango.
FAMILIAS = {
    "MODIS": ["MODIS_SP", "MODIS_NRT"],
    "VIIRS_SNPP": ["VIIRS_SNPP_SP", "VIIRS_SNPP_NRT"],
    "VIIRS_NOAA20": ["VIIRS_NOAA20_SP", "VIIRS_NOAA20_NRT"],
    "VIIRS_NOAA21": ["VIIRS_NOAA21_SP", "VIIRS_NOAA21_NRT"],
}


def leer_clave():
    texto = ENV.read_text(encoding="utf-8")
    m = re.search(r'^\s*MAP_KEY\s*=\s*["\']?([^"\'\s]+)', texto, re.M)
    if not m:
        raise RuntimeError("Falta MAP_KEY en backend/.env")
    return m.group(1)


class ClienteFirms:
    def __init__(self, clave=None):
        self.clave = clave or leer_clave()
        self.sesion = requests.Session()
        self.llamadas = 0

    def estado(self):
        r = self.sesion.get(BASE + "mapserver/mapkey_status/", params={"MAP_KEY": self.clave}, timeout=60)
        r.raise_for_status()
        return r.json()

    def disponibilidad(self):
        url = BASE + f"api/data_availability/csv/{self.clave}/all"
        df = pd.read_csv(url)
        return {
            fila["data_id"]: (date.fromisoformat(fila["min_date"]), date.fromisoformat(fila["max_date"]))
            for _, fila in df.iterrows()
        }

    def _esperar_cuota(self):
        est = self.estado()
        if est["current_transactions"] >= UMBRAL_PAUSA:
            espera = VENTANA_MIN * 60 + 15
            print(f"  cuota alta ({est['current_transactions']}), pausa de {espera} s", flush=True)
            time.sleep(espera)

    def area(self, fuente, inicio, dias=DIAS_POR_LLAMADA):
        """Detecciones de `fuente` en BBOX desde `inicio` durante `dias` dias. Usa cache."""
        ruta = DIR_RAW_FIRMS / fuente / f"{inicio:%Y%m%d}_{dias}d.csv"
        if ruta.exists():
            return pd.read_csv(ruta)
        ruta.parent.mkdir(parents=True, exist_ok=True)
        oeste, sur, este, norte = BBOX
        area = f"{oeste},{sur},{este},{norte}"
        url = BASE + f"api/area/csv/{self.clave}/{fuente}/{area}/{dias}/{inicio.isoformat()}"
        for intento in range(REINTENTOS + 1):
            self._esperar_cuota()
            self.llamadas += 1
            try:
                r = self.sesion.get(url, timeout=180)
                if r.status_code == 200:
                    texto = r.text
                    if texto.lstrip().lower().startswith("invalid") or "limit" in texto[:120].lower():
                        raise RuntimeError(texto[:200])
                    ruta.write_text(texto, encoding="utf-8")
                    return pd.read_csv(io.StringIO(texto)) if texto.strip() else pd.DataFrame()
                ultimo = f"HTTP {r.status_code}: {r.text[:150]}"
            except (requests.RequestException, RuntimeError) as e:
                ultimo = str(e)[:200]
            time.sleep(10 * 2**intento)
        raise RuntimeError(f"FIRMS fallo {fuente} {inicio}: {ultimo}")


def ventanas(inicio, fin, dias=DIAS_POR_LLAMADA):
    """Ventanas contiguas de `dias` dias que cubren [inicio, fin]."""
    actual = inicio
    while actual <= fin:
        yield actual
        actual += timedelta(days=dias)


def fuentes_para_rango(familia, inicio, fin, disponibilidad):
    """Devuelve [(fuente, desde, hasta)] que cubren [inicio, fin] usando SP cuando existe y NRT en el resto."""
    tramos = []
    sp, nrt = FAMILIAS[familia]
    sp_min, sp_max = disponibilidad.get(sp, (None, None))
    nrt_min, nrt_max = disponibilidad.get(nrt, (None, None))
    if sp_min and sp_max:
        d0, d1 = max(inicio, sp_min), min(fin, sp_max)
        if d0 <= d1:
            tramos.append((sp, d0, d1))
    if nrt_min and nrt_max:
        d0 = max(inicio, nrt_min, (sp_max + timedelta(days=1)) if sp_max else nrt_min)
        d1 = min(fin, nrt_max)
        if d0 <= d1:
            tramos.append((nrt, d0, d1))
    return tramos
