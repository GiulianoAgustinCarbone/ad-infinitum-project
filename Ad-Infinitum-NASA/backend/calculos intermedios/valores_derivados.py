def calcular_etp(toa_sw_dwn, t2m, t2m_range):
    
    ra = toa_sw_dwn * 0.408
    et0 = 0.0023 * ra * (t2m + 17.8) * ((t2m_range) ** 0.5)
    return et0

def balance_mensual(p, etp):
    """
    Calcula el balance hídrico simple.
    
    Parámetros:
    - p: Precipitación (mm)
    - etp: Evapotranspiración Potencial (mm)
    
    Retorna:
    - Balance hídrico (mm): D = P − ETP
    """
    return p - etp

def indice_aridez(p, etp):
    """
    Calcula el índice de aridez según la definición de UNEP.
    
    Parámetros:
    - p: Precipitación (mm)
    - etp: Evapotranspiración Potencial (mm)
    
    Retorna:
    - Índice de aridez (IA): IA = P / ETP
    """
    if etp == 0:
        raise ValueError("ETP no puede ser cero para calcular el índice de aridez.")
    return p / etp

def indice_de_martonne(p, tmed):
    """
    Calcula el índice de De Martonne.
    
    Parámetros:
    - p: Precipitación (mm)
    - tmed: Temperatura media (°C)
    
    Retorna:
    - Índice de De Martonne (IM): IM = P / (T + 10)
    """
    if tmed + 10 == 0:
        raise ValueError("La temperatura media más 10 no puede ser cero para calcular el índice de De Martonne.")
    return p / (tmed + 10)

def calcular_indice_de_precipitación_estandarizado(p, etp):
    """
    Calcula el índice de precipitación estandarizado.
    
    Parámetros:
    - p: Precipitación (mm)
    - etp: Evapotranspiración Potencial (mm)
    
    Retorna:
    - Índice de precipitación estandarizado (IP): IP = P / ETP
    """
    if etp == 0:
        raise ValueError("ETP no puede ser cero para calcular el índice de precipitación estandarizado.")
    return p / etp