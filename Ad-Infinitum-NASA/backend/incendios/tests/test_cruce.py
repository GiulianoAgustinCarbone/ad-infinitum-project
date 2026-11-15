from datetime import date

import numpy as np
import pandas as pd
import pytest

from incendios import cruce
from incendios.indice_quemados import SIN_PROJ, fecha_granulo
from pyproj import Transformer

TO_SIN = Transformer.from_crs("EPSG:4326", SIN_PROJ, always_xy=True)


def punto(lon, lat, fecha, sat, origen="CONAE", hora=-1):
    return {"lon": lon, "lat": lat, "fecha": fecha, "sat": sat, "origen": origen,
            "power": np.nan, "confianza": np.nan, "confianza_viirs": -1, "hora": hora,
            "depto_nombre": None}


def sin_de(lon, lat):
    x, y = TO_SIN.transform(lon, lat)
    return x, y


INVERSA = Transformer.from_crs(SIN_PROJ, "EPSG:4326", always_xy=True)


def desplazar_m(lon, lat, metros_este):
    x, y = sin_de(lon, lat)
    return INVERSA.transform(x + metros_este, y)


def test_fecha_granulo_mcd64a1_y_vnp64a1():
    assert fecha_granulo("MCD64A1.A2024001.h12v12.061.2024066083910.hdf") == date(2024, 1, 1)
    assert fecha_granulo("VNP64A1.A2019335.h12v12.002.2023184183045.h5") == date(2019, 12, 1)


def test_quitar_ya_en_conae_solo_si_mismo_satelite_dia_y_menos_de_1km():
    lon, lat = -65.0, -33.0
    conae = pd.DataFrame([punto(lon, lat, date(2014, 2, 3), "TERRA")])
    cerca_mismo_sat = pd.DataFrame([punto(*desplazar_m(lon, lat, 100), date(2014, 2, 3), "TERRA", "FIRMS")])
    otro_sat = pd.DataFrame([punto(lon, lat, date(2014, 2, 3), "AQUA", "FIRMS")])
    lejos = pd.DataFrame([punto(*desplazar_m(lon, lat, 2000), date(2014, 2, 3), "TERRA", "FIRMS")])
    otro_dia = pd.DataFrame([punto(lon, lat, date(2014, 2, 4), "TERRA", "FIRMS")])
    firms = pd.concat([cerca_mismo_sat, otro_sat, lejos, otro_dia], ignore_index=True)
    nuevos = cruce.quitar_ya_en_conae(firms, conae)
    assert len(nuevos) == 3
    assert set(nuevos["sat"]) == {"AQUA", "TERRA"}
    assert not (nuevos["fecha"].eq(date(2014, 2, 3)) & nuevos["sat"].eq("TERRA") & nuevos["lon"].sub(cerca_mismo_sat["lon"].iloc[0]).abs().lt(1e-5)).any()


def test_filtrar_periodo_firms_mantiene_meses_faltantes_y_post_conae():
    firms = pd.DataFrame([
        punto(-65, -33, date(2012, 4, 10), "TERRA", "FIRMS"),
        punto(-65, -33, date(2013, 1, 10), "TERRA", "FIRMS"),
        punto(-65, -33, date(2024, 9, 30), "TERRA", "FIRMS"),
        punto(-65, -33, date(2024, 10, 5), "TERRA", "FIRMS"),
    ])
    out = cruce.filtrar_periodo_firms(firms)
    assert list(out["fecha"]) == [date(2012, 4, 10), date(2024, 10, 5)]


def test_marcar_quemados_mismo_mes_y_radio():
    quemados = {"MCD64A1": pd.DataFrame({"mes": ["2024-01"], "x_m": [0.0], "y_m": [0.0]})}
    xq, yq = 0.0, 0.0
    lon_q, lat_q = Transformer.from_crs(SIN_PROJ, "EPSG:4326", always_xy=True).transform(xq, yq)
    cerca = punto(*desplazar_m(lon_q, lat_q, 400), date(2024, 1, 15), "AQUA")
    lejos = punto(*desplazar_m(lon_q, lat_q, 3000), date(2024, 1, 15), "AQUA")
    otro_mes = punto(lon_q, lat_q, date(2024, 2, 15), "AQUA")
    sin_granulo = punto(lon_q, lat_q, date(2025, 6, 1), "AQUA")
    df = pd.DataFrame([cerca, lejos, otro_mes, sin_granulo])
    evaluables = {"MCD64A1": {"2024-01", "2024-02"}}
    out = cruce.marcar_quemados(df, quemados, evaluables)
    assert out["quemado"].iloc[0] == True  # noqa: E712
    assert out["quemado"].iloc[1] == False  # noqa: E712
    assert out["quemado"].iloc[2] == False  # noqa: E712
    assert out["quemado"].iloc[3] is None or pd.isna(out["quemado"].iloc[3])
    assert out["sensor_quemado"].iloc[0] == "MCD64A1"
    assert 0 < out["distancia_quemado_m"].iloc[0] < 1000
