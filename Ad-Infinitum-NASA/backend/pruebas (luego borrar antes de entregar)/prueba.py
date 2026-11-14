"""Prueba de consistencia: conexion_databrowse.py vs API.py (NASA POWER point) en un mismo punto.

La API de punto usa la variante LST (hora solar local) del MERRA-2 mensual; conexion_databrowse.py
usa la variante UTC. Por eso se compara cada fuente contra su variante equivalente y la diferencia
UTC vs LST se reporta aparte.
"""

import contextlib
import io
import sys

import numpy as np
import pandas as pd
import xarray as xr

import conexion_databrowse as cd
from API import obtener_datos_nasa_mensuales

ZARR_UTC = cd.ZARR_URL
ZARR_LST = "s3://nasa-power/merra2/temporal/power_merra2_monthly_temporal_lst.zarr"
VARIABLE = "T2M"
FECHA_INICIO = "1981-01"
FECHA_FIN = "2026-12"
ANIO_INICIO = "1981"
ANIO_FIN = "2026"
TOLERANCIA_API = 0.01
TOLERANCIA_NC = 1e-3

PUNTOS = {
    "grilla_exacta": (-34.0, -60.0),
    "arbitrario": (-33.2948, -66.3358),
}

resultados = []


def registrar(nombre, ok, detalle=""):
    resultados.append(ok)
    estado = "OK   " if ok else "FALLO"
    print(f"   [{estado}] {nombre} {detalle}")


def serie_api(lat, lon):
    with contextlib.redirect_stdout(io.StringIO()):
        df = obtener_datos_nasa_mensuales(ANIO_INICIO, ANIO_FIN, lat, lon, ["ag"], [VARIABLE])
    serie = df[VARIABLE].dropna()
    serie.index = serie.index.strftime("%Y-%m")
    return serie


def serie_nc(lat, lon):
    df = cd.extraer_serie_region(
        VARIABLE, lat - 0.1, lat + 0.1, lon - 0.1, lon + 0.1,
        FECHA_INICIO, FECHA_FIN, ponderar_por_area=False,
    )
    serie = pd.Series(df["valor"].values, index=df["fecha"].values)
    return serie.dropna(), df.attrs


def serie_zarr(url, lat, lon):
    ds = xr.open_dataset(url, engine="zarr", consolidated=True, storage_options={"anon": True}, chunks={})
    with ds:
        da = ds[VARIABLE].sel(lat=lat, lon=lon, method="nearest")
        da = da.sel(time=slice(FECHA_INICIO, FECHA_FIN))
        serie = da.to_series().dropna().astype(float)
    serie.index = serie.index.strftime("%Y-%m")
    return serie


def comparar(nombre, a, b, tolerancia):
    unidos = pd.concat({"a": a, "b": b}, axis=1)
    comunes = unidos.dropna()
    solo_a = int(unidos["a"].notna().sum() - len(comunes))
    solo_b = int(unidos["b"].notna().sum() - len(comunes))
    max_dif = float((comunes["a"] - comunes["b"]).abs().max()) if len(comunes) else np.inf
    ok = solo_a == 0 and solo_b == 0 and max_dif <= tolerancia
    registrar(
        nombre, ok,
        f"meses={len(comunes)} solo_a={solo_a} solo_b={solo_b} max|dif|={max_dif:.5f} (tol {tolerancia})",
    )


def informar(nombre, a, b):
    comunes = pd.concat({"a": a, "b": b}, axis=1).dropna()
    dif = comunes["a"] - comunes["b"]
    print(
        f"   [INFO ] {nombre}: meses={len(comunes)} dif_media={dif.mean():+.4f} "
        f"dif_abs_media={dif.abs().mean():.4f} max|dif|={dif.abs().max():.4f}"
    )


def main():
    print(f"Variable {VARIABLE} | periodo {FECHA_INICIO} a {FECHA_FIN}\n")
    for nombre, (lat, lon) in PUNTOS.items():
        print(f"== Punto {nombre}: lat={lat}, lon={lon}")
        api = serie_api(lat, lon)
        nc, attrs = serie_nc(lat, lon)
        celda_lat = attrs["bbox_efectivo"]["lat_min"]
        celda_lon = attrs["bbox_efectivo"]["lon_min"]
        print(f"   .nc: modo={attrs['modo']} celda=({celda_lat}, {celda_lon}) meses={attrs['n_meses']}")

        zarr_utc_celda = serie_zarr(ZARR_UTC, celda_lat, celda_lon)
        zarr_utc_nativa = serie_zarr(ZARR_UTC, lat, lon)
        zarr_lst_nativa = serie_zarr(ZARR_LST, lat, lon)

        comparar(".nc vs Zarr UTC (misma celda)", nc, zarr_utc_celda, TOLERANCIA_NC)
        comparar("API vs Zarr LST (celda nativa mas cercana)", api, zarr_lst_nativa, TOLERANCIA_API)
        informar("Zarr UTC vs Zarr LST (celda nativa mas cercana)", zarr_utc_nativa, zarr_lst_nativa)
        if celda_lat == lat and celda_lon == lon:
            informar(".nc (UTC) vs API (LST), mismo punto", nc, api)
        else:
            informar(".nc (UTC) vs API (LST), distinta resolucion", nc, api)

        ejemplo = "2000-01"
        print(
            f"   ejemplo {ejemplo}: .nc={nc.get(ejemplo)} zarr_utc_celda={zarr_utc_celda.get(ejemplo)} "
            f"API={api.get(ejemplo)}\n"
        )

    total = len(resultados)
    ok_total = sum(resultados)
    print(f"RESULTADO: {ok_total}/{total} comprobaciones OK")
    sys.exit(0 if all(resultados) else 1)


if __name__ == "__main__":
    main()
