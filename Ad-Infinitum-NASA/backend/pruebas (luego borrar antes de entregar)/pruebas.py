from datetime import date

import pandas as pd

from API import obtener_datos_nasa_mensuales
from tendencias import obtener_tendencia_mensual

fecha_inicio = "2026"
fecha_fin = date.today().strftime("%Y")
latitud = -33.2948
longitud = -66.3358
comunidades = ["ag","hy","sb","re"]
parametros = ["PRECTOTCORR"]
df, metadatos = obtener_datos_nasa_mensuales(fecha_inicio, fecha_fin, latitud, longitud, comunidades, parametros)
tendencia = obtener_tendencia_mensual(df, parametros[0])

unidad = metadatos["parametros"].get(parametros[0], {}).get("units", "")
print(f"Variable: {tendencia['variable']} ({unidad})")
print(f"Cantidad de puntos: {tendencia['cantidad_puntos']}")
print(f"Pendiente mensual: {tendencia['pendiente_mensual']} | anual: {tendencia['pendiente_anual']}")
print(f"Intercepto: {tendencia['intercepto']}")
print(pd.DataFrame(tendencia["recta"]).to_string(index=False))