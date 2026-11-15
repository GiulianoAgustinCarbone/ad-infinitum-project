"""Serie mensual de hectareas quemadas por departamento, a partir de los pixeles de MCD64A1.

Un pixel quemado de MCD64A1 (Burn Date > 0) en un mes cuenta como un pixel de 463 m (~21,5 ha).
Solo se usa MCD64A1: un unico producto desde 2000-11 hasta hoy, sin depender del satelite de cada epoca.

Meses sin granulo de MCD64A1 quedan en null (no evaluables); meses con granulo y sin quemados valen 0.

Uso: python -m incendios.serie_incendios
"""

import json
import sys
from datetime import date, datetime

import numpy as np
import pandas as pd
import shapely
from shapely.geometry import Point, shape

from incendios import cruce
from incendios.config import DATOS, DIR_INCENDIOS, DIR_PROCESADO
from incendios.serie_aqua import meses_entre, ultimo_mes_completo

PIXEL_M = 463.3127165283333  # tamano del pixel de MCD64A1 en la proyeccion sinusoidal
HA_POR_PIXEL = PIXEL_M * PIXEL_M / 10_000
SALIDA = DIR_INCENDIOS / "serie_incendios.json"
PRIMER_MES = "2000-11"


def departamentos_de(lon, lat, geo_features):
    """Nombre de departamento por punto (dentro del poligono, o a menos de 1 km del borde)."""
    asignado = np.array([None] * len(lon), dtype=object)
    for f in geo_features:
        nombre = f["properties"].get("nombre")
        poli = shape(f["geometry"])
        dentro = shapely.contains_xy(poli, lon, lat) & np.equal(asignado, None)
        asignado[dentro] = nombre
    pendientes = np.nonzero(np.equal(asignado, None))[0]
    for i in pendientes:
        p = Point(lon[i], lat[i])
        mejor, dist_mejor = None, np.inf
        for f in geo_features:
            d = shape(f["geometry"]).distance(p)
            if d < dist_mejor:
                mejor, dist_mejor = f["properties"].get("nombre"), d
        if mejor is not None and dist_mejor <= cruce.DISTANCIA_BORDE_DEG:
            asignado[i] = mejor
    return asignado


def construir():
    geo = json.loads((DATOS / "departamentos.geojson").read_text(encoding="utf-8"))
    nombres = [f["properties"]["nombre"] for f in geo["features"]]
    tabla = pd.read_parquet(DIR_PROCESADO / "quemados_MCD64A1.parquet")
    lon = tabla["lon"].to_numpy()
    lat = tabla["lat"].to_numpy()
    depto = departamentos_de(lon, lat, geo["features"])
    tabla = tabla.assign(depto=depto)
    tabla = tabla[tabla["depto"].notna()]
    ha = tabla.groupby(["depto", "mes"]).size() * HA_POR_PIXEL

    fin = ultimo_mes_completo(date.today())
    meses = meses_entre(PRIMER_MES, fin)
    con_granulo = cruce.cargar_granulos_disponibles()["MCD64A1"]
    departamentos = []
    for n in nombres:
        conteos = []
        for m in meses:
            if m not in con_granulo:
                conteos.append(None)
            else:
                conteos.append(round(float(ha.get((n, m), 0.0)), 1))
        departamentos.append({"nombre": n, "conteos": conteos})
    return {
        "fuente": "NASA MCD64A1 (area quemada mensual, 500 m / 463 m), Terra+Aqua. "
                  "Hectareas quemadas por mes y departamento.",
        "generado": datetime.now().isoformat(timespec="seconds"),
        "unidad": "hectareas",
        "hectareasPorPixel": round(HA_POR_PIXEL, 3),
        "meses": meses,
        "sinGranulo": [m for m in meses if m not in con_granulo],
        "mesesFaltantes": [m for m in meses if m not in con_granulo],
        "departamentos": departamentos,
    }


def main():
    serie = construir()
    DIR_INCENDIOS.mkdir(parents=True, exist_ok=True)
    SALIDA.write_text(json.dumps(serie, ensure_ascii=False), encoding="utf-8")
    total = sum(v for d in serie["departamentos"] for v in d["conteos"] if v is not None)
    print(f"serie_incendios: {len(serie['meses'])} meses ({serie['meses'][0]} a {serie['meses'][-1]}) | "
          f"sin granulo: {len(serie['sinGranulo'])} | total {total:,.0f} ha".replace(",", "."), flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
