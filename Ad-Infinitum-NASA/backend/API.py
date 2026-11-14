import requests
import pandas as pd
import numpy as np
from datetime import date

url = "https://power.larc.nasa.gov/api/temporal/monthly/point"

fecha_inicio = "1981"
fecha_fin = date.today().strftime("%Y")
latitud = -33.2948
longitud = -66.3358
comunidades = ["ag","hy","sb","re"]
parametros = ["PRECTOTCORR"]

def obtener_datos_nasa_mensuales(fecha_inicio, fecha_fin, latitud, longitud, comunidades, parametros):
    parametros = {
        "start": fecha_inicio,
        "end":fecha_fin,
        "latitude": latitud,
        "longitude": longitud,
        "community": comunidades[0],
        "parameters": ",".join(parametros),
        "format": "JSON"
    }

    respuesta = requests.get(url,parametros)

    if respuesta.status_code != 200:
        raise Exception(f"Error en la API: {respuesta.status_code} - {respuesta.text}")
    else:
        data = respuesta.json()
        df = pd.DataFrame(data["properties"]["parameter"])
        #Como la data mensual va del mes 1 al 13, siendo el 13 el promedio entre los 12 meses, hay que filtrarlo para que no aparezca en el dataframe.
        df = df[~df.index.str.endswith("13")] #De los indices (es decir de las fechas), busca las que terminan en 13 y las extrae del dataframe.
        df.index = pd.to_datetime(df.index, format="%Y%m")
        df.index.name = "Fecha"
        
        #La NASA pone como "-999.0" los valores nulos. Para no romper los calculos, se limpian dichos valores:
        df.replace(-999.0, np.nan, inplace=True)
        
        return df
