"""Descarga y extracción de series mensuales regionales de NASA POWER (MERRA-2)."""
#Importación de librerias necesarias para la ejecución del código.
import difflib
import numbers
import re
from datetime import datetime
from pathlib import Path
import numpy as np
import pandas as pd
import xarray as xr

ZARR_URL = "s3://nasa-power/merra2/temporal/power_merra2_monthly_temporal_utc.zarr"
DIR_DATOS = Path(__file__).resolve().parent / "data"
PASO_DEFAULT = 4
PATRON_FECHA = re.compile(r"\d{4}-(0[1-9]|1[0-2])")
PATRON_HORARIA = re.compile(r"_\d{2}$")


def _abrir_zarr():
    return xr.open_dataset(
        ZARR_URL,
        engine="zarr",
        consolidated=True,
        storage_options={"anon": True},
        chunks={},
    )


def _normalizar_variable(variable):
    if not isinstance(variable, str) or not variable.strip():
        raise ValueError("variable debe ser un texto no vacío, ej. 'T2M'")
    return variable.strip().upper()


def _validar_variable(variable, disponibles):
    if variable in disponibles:
        return
    coincidencias = [
        n for n in disponibles if variable in n and not PATRON_HORARIA.search(n)
    ]
    if not coincidencias:
        coincidencias = difflib.get_close_matches(variable, disponibles, n=10)
    raise ValueError(
        f"La variable '{variable}' no existe. Sugerencias: {coincidencias[:10]}"
    )


def _validar_fecha(texto, nombre):
    if not isinstance(texto, str) or not PATRON_FECHA.fullmatch(texto):
        raise ValueError(
            f"{nombre} debe tener formato 'YYYY-MM' (ej. '1990-01'), recibido: {texto!r}"
        )
    return pd.Timestamp(f"{texto}-01")


def _validar_eje(nombre, minimo, maximo, limite):
    for valor in (minimo, maximo):
        if ( #Si no es un valor numerico, o es un booleano, o no es finito (NaN, inf), lanza error.
            not isinstance(valor, numbers.Real)
            or isinstance(valor, bool)
            or not np.isfinite(valor)
        ):
            raise ValueError(f"{nombre}: los valores deben ser numéricos, recibido: {valor!r}")
        if abs(valor) > limite: #Si se pasa del limite (90 o 180, dependiendo si es latitud o longitud), lanza error.
            raise ValueError(f"{nombre}: {valor} está fuera del rango [-{limite}, {limite}]")
    if nombre == "longitud" and minimo > maximo: #Si el minimo es mayor al maximo
        raise ValueError(
            "longitud: lon_min > lon_max. Las regiones que cruzan el antimeridiano (±180°) no están soportadas"
        )
    if minimo >= maximo: #Si el minimo es mayor o igual al maximo, lanza error.
        raise ValueError(
            f"{nombre}: el mínimo ({minimo}) debe ser menor que el máximo ({maximo})"
        )


def _indice_eje(coordenada, minimo, maximo):
    valores = coordenada.values
    if np.any((valores >= minimo) & (valores <= maximo)):
        return slice(minimo, maximo), False
    centro = (minimo + maximo) / 2
    return [float(valores[np.argmin(np.abs(valores - centro))])], True


def bajar_nc(variable, paso=PASO_DEFAULT, dir_salida=DIR_DATOS, forzar=False):
    """Descarga una variable mensual de NASA POWER submuestreada cada `paso` celdas a `{variable}_monthly.nc`."""
    variable = _normalizar_variable(variable)
    if not isinstance(paso, int) or paso < 1:
        raise ValueError(f"paso debe ser un entero >= 1, recibido: {paso!r}")

    ruta = Path(dir_salida) / f"{variable}_monthly.nc"
    if ruta.exists() and not forzar:
        print(f"Ya existe, no se descarga de nuevo: {ruta}")
        return ruta

    with _abrir_zarr() as ds:
        _validar_variable(variable, list(ds.data_vars))
        da = ds[variable].isel(lat=slice(None, None, paso), lon=slice(None, None, paso))
        da = da.load().dropna(dim="time", how="all")

    da.attrs = {
        "long_name": da.attrs.get("long_name", variable),
        "units": da.attrs.get("units", ""),
    }
    da.encoding = {}
    salida = da.to_dataset(name=variable)
    salida.attrs = {
        "fuente": "NASA POWER MERRA-2 (monthly, UTC)",
        "zarr_url": ZARR_URL,
        "paso_espacial": f"{paso * 0.5:g}° lat x {paso * 0.625:g}° lon",
        "fecha_descarga": datetime.now().isoformat(timespec="seconds"),
    }

    ruta.parent.mkdir(parents=True, exist_ok=True)
    salida.to_netcdf(
        ruta,
        engine="netcdf4",
        encoding={variable: {"zlib": True, "complevel": 4, "dtype": "float32"}},
    )
    print(f"Guardado {ruta} ({ruta.stat().st_size / 1e6:.1f} MB, {dict(salida.sizes)})")
    return ruta


def extraer_serie_region(
    variable,
    lat_min,
    lat_max,
    lon_min,
    lon_max,
    fecha_min,
    fecha_max,
    ponderar_por_area=True,
):
    """Promedio mensual de `variable` sobre el rectángulo lat/lon, entre fecha_min y fecha_max ('YYYY-MM')."""
    
    #Validación de los parametros de entrada:
    variable = _normalizar_variable(variable) #Revisa que la variable no sea un string vacio y lo pasa a mayusculas.
    
    _validar_eje("latitud", lat_min, lat_max, 90)
    _validar_eje("longitud", lon_min, lon_max, 180)
    
    inicio = _validar_fecha(fecha_min, "fecha_min")
    fin = _validar_fecha(fecha_max, "fecha_max")
    
    if inicio > fin:
        raise ValueError(f"fecha_min ({fecha_min}) es posterior a fecha_max ({fecha_max})")

    ruta = DIR_DATOS / f"{variable}_monthly.nc"
    if not ruta.exists():
        with _abrir_zarr() as ds:
            _validar_variable(variable, list(ds.data_vars))
        raise FileNotFoundError(f"No existe {ruta}. Ejecutá bajar_nc('{variable}') primero.")

    with xr.open_dataset(ruta) as ds:
        _validar_variable(variable, list(ds.data_vars))
        da = ds[variable].sel(time=slice(fecha_min, fecha_max))
        if da.time.size == 0:
            raise ValueError(f"No hay datos entre {fecha_min} y {fecha_max}")

        indice_lat, fallback_lat = _indice_eje(da.lat, lat_min, lat_max)
        indice_lon, fallback_lon = _indice_eje(da.lon, lon_min, lon_max)
        recorte = da.sel(lat=indice_lat, lon=indice_lon)

        if ponderar_por_area:
            pesos = np.cos(np.deg2rad(recorte.lat))
            serie = recorte.weighted(pesos).mean(dim=("lat", "lon"))
        else:
            serie = recorte.mean(dim=("lat", "lon"))

        valores = serie.values.astype(float)
        fechas = pd.DatetimeIndex(serie.time.values).strftime("%Y-%m")
        lat_efectiva = recorte.lat.values
        lon_efectiva = recorte.lon.values
        unidades = da.attrs.get("units", "")
        nombre_largo = da.attrs.get("long_name", variable)

    df = pd.DataFrame({"fecha": list(fechas), "valor": np.round(valores, 4)})
    df.attrs = {
        "variable": variable,
        "long_name": nombre_largo,
        "unidades": unidades,
        "bbox_solicitado": {
            "lat_min": lat_min,
            "lat_max": lat_max,
            "lon_min": lon_min,
            "lon_max": lon_max,
        },
        "bbox_efectivo": {
            "lat_min": float(lat_efectiva.min()),
            "lat_max": float(lat_efectiva.max()),
            "lon_min": float(lon_efectiva.min()),
            "lon_max": float(lon_efectiva.max()),
        },
        "n_celdas": int(lat_efectiva.size * lon_efectiva.size),
        "n_meses": len(df),
        "ponderado": ponderar_por_area,
        "modo": "celda_mas_cercana" if fallback_lat or fallback_lon else "region",
    }
    return df


def listar_variables(filtro=None, incluir_horarias=False):
    """Nombres de variables mensuales de NASA POWER; por defecto excluye las horarias (_00 a _23)."""
    with _abrir_zarr() as ds:
        nombres = sorted(ds.data_vars)
    if not incluir_horarias:
        nombres = [n for n in nombres if not PATRON_HORARIA.search(n)]
    if filtro:
        nombres = [n for n in nombres if filtro.upper() in n]
    return nombres


if __name__ == "__main__":
    bajar_nc("T2M")
    df = extraer_serie_region("T2M", -90, 90, -90, 90, "1990-01", "2025-12")
    print(df.head())
    print(df.tail())
    print(df.attrs)
