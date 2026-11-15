"""Serie mensual de Aqua por departamento: CONAE donde hay dato, NASA FIRMS (Aqua) donde no.

Regla por celda (departamento, mes):
- Si la tabla de CONAE (departamentos.mensual.json) tiene un valor, se usa ese valor (fuente CONAE).
- Si la tabla tiene null (mes sin dato) o el mes es posterior a la tabla, se usa el conteo de focos de Aqua
  de FIRMS (fuente FIRMS).

La tabla original de CONAE no se modifica. Ademas se valida la coincidencia entre ambas fuentes en los meses
donde las dos tienen dato (2023-01 a 2024-04) y se guarda el resultado.

Uso: python -m incendios.serie_aqua
"""

import json
import sys
from datetime import date, datetime

import numpy as np
import pandas as pd

from incendios import cruce
from incendios.config import DATOS, DIR_INCENDIOS

TABLA_CONAE = DATOS / "departamentos.mensual.json"
SALIDA = DIR_INCENDIOS / "serie_aqua.json"
VALIDACION = DIR_INCENDIOS / "validacion_serie_aqua.json"
# CONAE solo publica focos con confianza >= 60 (minimo observado en sus datos de Aqua)
UMBRAL_CONFIANZA_CONAE = 60


def ultimo_mes_completo(hoy):
    primero = date(hoy.year, hoy.month, 1)
    previo = date(primero.year - 1, 12, 1) if primero.month == 1 else date(primero.year, primero.month - 1, 1)
    return f"{previo.year:04d}-{previo.month:02d}"


def meses_entre(desde, hasta):
    a, m = int(desde[:4]), int(desde[5:])
    a1, m1 = int(hasta[:4]), int(hasta[5:])
    salida = []
    while (a, m) <= (a1, m1):
        salida.append(f"{a:04d}-{m:02d}")
        m += 1
        if m == 13:
            a, m = a + 1, 1
    return salida


def aqua_firms_por_depto_y_mes(nombres):
    """Conteos de Aqua (FIRMS, MODIS) por departamento y mes, solo dentro de la provincia."""
    firms = cruce.cargar_firms()
    if firms.empty:
        return {}
    firms = firms[firms["sat"] == "AQUA"].copy()
    firms = firms[firms["fuente_firms"].str.startswith("MODIS")]
    firms = firms[firms["confianza"] >= UMBRAL_CONFIANZA_CONAE]
    prov = cruce.provincia()
    dentro = [prov.distance(cruce.Point(lo, la)) <= cruce.DISTANCIA_BORDE_DEG for lo, la in zip(firms["lon"], firms["lat"])]
    firms = firms[np.array(dentro, dtype=bool)].copy()
    firms["depto_nombre"] = None
    firms = cruce.asignar_departamento(firms, nombres)
    firms["mes"] = pd.to_datetime(firms["fecha"]).dt.strftime("%Y-%m")
    conteos = {}
    for (depto, mes), n in firms.groupby(["depto_nombre", "mes"]).size().items():
        if depto is None or (isinstance(depto, float) and np.isnan(depto)):
            continue
        conteos[(depto, mes)] = int(n)
    return conteos


def construir():
    tabla = json.loads(TABLA_CONAE.read_text(encoding="utf-8"))
    nombres = [d["nombre"] for d in tabla["departamentos"]]
    meses_conae = tabla["meses"]
    fin = ultimo_mes_completo(date.today())
    meses = meses_entre(meses_conae[0], fin)
    firms = aqua_firms_por_depto_y_mes(nombres)

    conae = {d["nombre"]: dict(zip(meses_conae, d["conteos"])) for d in tabla["departamentos"]}
    fuente_mes = []
    departamentos = []
    for m in meses:
        usa_conae = m in set(meses_conae) and all(conae[n][m] is not None for n in nombres)
        fuente_mes.append("CONAE" if usa_conae else "FIRMS")
    for n in nombres:
        conteos = []
        for m, f in zip(meses, fuente_mes):
            if f == "CONAE":
                conteos.append(conae[n][m])
            else:
                conteos.append(firms.get((n, m), 0))
        departamentos.append({"nombre": n, "conteos": conteos})
    return {
        "fuente": "Serie de Aqua: CONAE / Gobierno de San Luis donde hay dato; NASA FIRMS (MODIS, Aqua) en los meses "
                  "sin dato de CONAE y desde mayo de 2024. Cada mes indica su fuente en fuentePorMes.",
        "generado": datetime.now().isoformat(timespec="seconds"),
        "meses": meses,
        "mesesFaltantes": tabla["mesesFaltantes"],
        "fuentePorMes": fuente_mes,
        "departamentos": departamentos,
    }, tabla, firms, nombres


def validar(tabla, firms, nombres):
    """Compara CONAE y FIRMS (Aqua) en los meses donde ambas tienen dato."""
    meses_conae = tabla["meses"]
    comunes = [m for m in meses_conae if m >= "2023-01" and all(d["conteos"][meses_conae.index(m)] is not None for d in tabla["departamentos"])]
    filas_c, filas_f = [], []
    por_depto = {}
    for n in nombres:
        serie = dict(zip(meses_conae, [d for d in tabla["departamentos"] if d["nombre"] == n][0]["conteos"]))
        c_n = [serie[m] for m in comunes]
        f_n = [firms.get((n, m), 0) for m in comunes]
        filas_c += c_n
        filas_f += f_n
        por_depto[n] = {"conae": int(sum(c_n)), "firms": int(sum(f_n))}
    mensual_c = [sum(d["conteos"][meses_conae.index(m)] for d in tabla["departamentos"]) for m in comunes]
    mensual_f = [sum(firms.get((n, m), 0) for n in nombres) for m in comunes]
    r = float(np.corrcoef(mensual_c, mensual_f)[0, 1]) if len(comunes) > 2 and np.std(mensual_c) and np.std(mensual_f) else None
    return {
        "meses_comparados": len(comunes),
        "periodo": [comunes[0], comunes[-1]] if comunes else None,
        "total_conae": int(sum(mensual_c)),
        "total_firms": int(sum(mensual_f)),
        "correlacion_mensual_total": None if r is None else round(r, 3),
        "por_departamento": por_depto,
        "nota": "Aqua de FIRMS (MODIS) frente a la tabla de CONAE en los meses con dato de ambas fuentes.",
    }


def main():
    serie, tabla, firms, nombres = construir()
    DIR_INCENDIOS.mkdir(parents=True, exist_ok=True)
    SALIDA.write_text(json.dumps(serie, ensure_ascii=False), encoding="utf-8")
    val = validar(tabla, firms, nombres)
    VALIDACION.write_text(json.dumps(val, indent=2, ensure_ascii=False), encoding="utf-8")
    fuentes = pd.Series(serie["fuentePorMes"]).value_counts().to_dict()
    print(f"serie_aqua: {len(serie['meses'])} meses ({serie['meses'][0]} a {serie['meses'][-1]}) | fuentes {fuentes}", flush=True)
    print(f"validacion: {val['meses_comparados']} meses comparados | CONAE {val['total_conae']} vs FIRMS {val['total_firms']} | r = {val['correlacion_mensual_total']}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
