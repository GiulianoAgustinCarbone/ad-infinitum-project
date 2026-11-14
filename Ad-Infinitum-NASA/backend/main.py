from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
import pandas as pd
import numpy as np
from API import obtener_datos_nasa_mensuales

app = FastAPI(title="Earth Trend Detective API")

# 1. Habilitar CORS: Vital para que el frontend (localhost o Vercel) pueda consultar este backend sin bloqueos
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción pueden cambiar "*" por la URL exacta del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NASA_POINT_URL = "https://power.larc.nasa.gov/api/temporal/monthly/point"


@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/serie-punto")
def get_serie_punto(
    lat: float = Query(..., description="Latitud (ej. -33.2948)"),
    lon: float = Query(..., description="Longitud (ej. -66.3358)"),
    start: int = Query(..., description="Año de inicio"),
    end: int = Query(..., description="Año de fin"),
    params: str = Query(..., description="Variables separadas por coma"),
    community: str = Query("ag", description="Comunidad NASA (ag, re, sb)")
):
    lista_parametros = [p.strip().upper() for p in params.split(",") if p.strip()]
    
    try:
        df = obtener_datos_nasa_mensuales(
            fecha_inicio=start,
            fecha_fin=end,
            latitud=lat,
            longitud=lon,
            comunidades=[community],  # En plural para coincidir con API.py
            parametros=lista_parametros
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))
    
    # Formatear fechas a texto "YYYY-MM" y pasar NaN a None (null) para que sea JSON válido
    df_json = df.copy()
    df_json.index = df_json.index.strftime("%Y-%m")
    df_json = df_json.where(pd.notnull(df_json), None)
    serie = df_json.reset_index().to_dict(orient="records")

    return {
        "ubicacion": {"lat": lat, "lon": lon},
        "parametros": lista_parametros,
        "total_registros": len(serie),
        "serie": serie
    }