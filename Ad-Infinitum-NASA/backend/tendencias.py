import numpy as np
import pandas as pd


def _extraer_serie_limpia(df: pd.DataFrame, variable: str | None) -> tuple[pd.Series, str]:
    """Valida el DataFrame, selecciona la columna y elimina valores nulos."""
    if df.empty:
        raise ValueError("El DataFrame está vacío.")

    if variable is None:
        variable = df.columns[0]
    elif variable not in df.columns:
        raise ValueError(f"La variable '{variable}' no está en el DataFrame.")

    serie = df[variable].dropna().sort_index()
    return serie, variable


def obtener_tendencia_anual(df: pd.DataFrame, variable: str | None = None) -> dict:
    """
    Agrupa los datos por año (promedio anual) y calcula la recta de regresión lineal.
    """
    serie, var_nombre = _extraer_serie_limpia(df, variable)

    # Paso clave: promediar todos los meses de cada año para tener 1 solo punto por año
    serie_anual = serie.groupby(serie.index.year).mean().dropna()

    if len(serie_anual) < 2:
        raise ValueError("Se necesitan al menos 2 años válidos para calcular la recta.")

    anios = serie_anual.index.to_numpy(dtype=float)
    # Eje X en años transcurridos desde el primer año (0, 1, 2, ...)
    x_anios = anios - anios[0]

    y = serie_anual.to_numpy(dtype=float)

    # Ajuste lineal sobre los promedios anuales: y = pendiente_anual * x + intercepto
    pendiente_anual, intercepto = np.polyfit(x_anios, y, 1)

    valores_recta = pendiente_anual * x_anios + intercepto

    recta = [
        {"fecha": str(int(anio)), "valor": round(float(val), 4)}
        for anio, val in zip(anios, valores_recta)
    ]

    return {
        "variable": var_nombre,
        "escala": "anual",
        "cantidad_puntos": int(len(serie_anual)),
        "pendiente_anual": round(float(pendiente_anual), 6),
        "pendiente_decadal": round(float(pendiente_anual * 10), 5),
        "intercepto": round(float(intercepto), 4),
        "recta": recta
    }

def obtener_tendencia_mensual(df: pd.DataFrame, variable: str | None = None) -> dict:
    """
    Calcula la recta de regresión lineal usando todos los meses disponibles.
    """
    serie, var_nombre = _extraer_serie_limpia(df, variable)

    if len(serie) < 2:
        raise ValueError("Se necesitan al menos 2 meses válidos para calcular la recta.")

    # Eje X en meses transcurridos desde el primer registro (0, 1, 2, 3, ...)
    x_meses = (
        (serie.index.year - serie.index[0].year) * 12
        + (serie.index.month - serie.index[0].month)
    ).to_numpy(dtype=float)

    y = serie.to_numpy(dtype=float)

    # Ajuste lineal: y = pendiente_mensual * x + intercepto
    pendiente_mensual, intercepto = np.polyfit(x_meses, y, 1)

    valores_recta = pendiente_mensual * x_meses + intercepto
    fechas_str = serie.index.strftime("%Y-%m")

    recta = [
        {"fecha": fecha, "valor": round(float(val), 4)}
        for fecha, val in zip(fechas_str, valores_recta)
    ]

    return {
        "variable": var_nombre,
        "escala": "mensual",
        "cantidad_puntos": int(len(serie)),
        "pendiente_mensual": round(float(pendiente_mensual), 6),
        "pendiente_anual": round(float(pendiente_mensual * 12), 5),
        "intercepto": round(float(intercepto), 4),
        "recta": recta
    }