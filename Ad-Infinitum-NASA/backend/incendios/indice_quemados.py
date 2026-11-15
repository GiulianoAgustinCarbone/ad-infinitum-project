"""Convierte los granulos mensuales de area quemada (MCD64A1, VNP64A1) en una tabla de pixeles quemados.

Salida: backend/data/incendios/procesado/quemados_<PRODUCTO>.parquet, una fila por pixel quemado dentro de la
provincia: mes del granulo, dia del mes del quemado (Burn Date), QA sin interpretar, lon/lat y x/y sinusoidales.

Burn Date: 1..366 = dia del quemado (dentro del mes del granulo), 0 = sin quemar, -1 = relleno, -2 = agua.
Requiere el entorno conda 'incendios' (GDAL con driver HDF4).

Uso: python -m incendios.indice_quemados [MCD64A1 VNP64A1]
"""

import os
import re
import sys
from datetime import date, timedelta
from pathlib import Path

import numpy as np
import pandas as pd


def _configurar_gdal():
    """Hace visibles el driver HDF4 y sus DLL del entorno conda (Windows)."""
    prefijo = Path(sys.prefix)
    bin_dir = prefijo / "Library" / "bin"
    plugins = prefijo / "Library" / "lib" / "gdalplugins"
    if bin_dir.exists():
        os.environ["PATH"] = f"{bin_dir};{prefijo};" + os.environ.get("PATH", "")
    if plugins.exists():
        os.environ.setdefault("GDAL_DRIVER_PATH", str(plugins))


_configurar_gdal()
from osgeo import gdal  # noqa: E402
from pyproj import Transformer  # noqa: E402

from incendios.config import BBOX, DIR_PROCESADO, DIR_RAW_AREAS, PRODUCTOS_AREA  # noqa: E402

gdal.UseExceptions()

SIN_PROJ = "+proj=sinu +R=6371007.181 +nodef +units=m +no_defs"
PATRON_GRANULO = re.compile(r"\.A(\d{4})(\d{3})\.")
CAMPO_QUEMADO = "Burn Date"
CAMPO_QA = "QA"


def fecha_granulo(nombre):
    m = PATRON_GRANULO.search(nombre)
    if not m:
        raise ValueError(f"nombre sin fecha: {nombre}")
    anio, doy = int(m.group(1)), int(m.group(2))
    return date(anio, 1, 1) + timedelta(days=doy - 1)


def _leer_campo(ds_base, campo):
    """Lee un subdataset HDF4/HDF5 por nombre de campo. Devuelve (matriz, geotransform)."""
    for nombre, _descripcion in ds_base.GetSubDatasets():
        ultimo = nombre.rsplit(":", 1)[-1].strip('"').strip()
        if ultimo == campo:
            sub = gdal.Open(nombre)
            return sub.GetRasterBand(1).ReadAsArray(), sub.GetGeoTransform()
    raise KeyError(f"no hay campo '{campo}' en el granulo")


def leer_granulo(ruta):
    nombre = ruta.name
    fecha = fecha_granulo(nombre)
    base = gdal.Open(str(ruta))
    quemado, gt = _leer_campo(base, CAMPO_QUEMADO)
    qa, _ = _leer_campo(base, CAMPO_QA)

    mascara = quemado > 0
    if not mascara.any():
        return pd.DataFrame()
    r, c = np.nonzero(mascara)
    x = gt[0] + (c + 0.5) * gt[1]
    y = gt[3] + (r + 0.5) * gt[5]
    lon, lat = Transformer.from_crs(SIN_PROJ, "EPSG:4326", always_xy=True).transform(x, y)
    lon, lat = np.asarray(lon), np.asarray(lat)
    dentro = (lon >= BBOX[0]) & (lon <= BBOX[2]) & (lat >= BBOX[1]) & (lat <= BBOX[3])
    if not dentro.any():
        return pd.DataFrame()
    return pd.DataFrame({
        "mes": fecha.strftime("%Y-%m"),
        "granulo": nombre,
        "dia_quemado": quemado[r, c][dentro].astype(int),
        "qa": qa[r, c][dentro].astype(int),
        "lon": lon[dentro],
        "lat": lat[dentro],
        "x_m": np.asarray(x)[dentro],
        "y_m": np.asarray(y)[dentro],
    })


def procesar_producto(producto):
    carpeta = DIR_RAW_AREAS / producto
    archivos = sorted(carpeta.glob(f"{producto}.A*.hdf")) + sorted(carpeta.glob(f"{producto}.A*.h5"))
    if not archivos:
        raise FileNotFoundError(f"no hay granulos de {producto} en {carpeta}")
    partes, vacios = [], 0
    for n, ruta in enumerate(archivos, 1):
        df = leer_granulo(ruta)
        if df.empty:
            vacios += 1
        else:
            partes.append(df)
        if n % 25 == 0 or n == len(archivos):
            print(f"  {producto} {n}/{len(archivos)}", flush=True)
    salida = pd.concat(partes, ignore_index=True) if partes else pd.DataFrame()
    DIR_PROCESADO.mkdir(parents=True, exist_ok=True)
    ruta_salida = DIR_PROCESADO / f"quemados_{producto}.parquet"
    salida.to_parquet(ruta_salida, index=False)
    meses = salida["mes"].nunique() if len(salida) else 0
    print(f"{producto}: {len(archivos)} granulos, {vacios} sin quemados en la provincia, "
          f"{len(salida)} pixeles, {meses} meses con quemados -> {ruta_salida.name}", flush=True)
    return ruta_salida


def main(productos):
    for p in productos:
        procesar_producto(p)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:] or list(PRODUCTOS_AREA)))
