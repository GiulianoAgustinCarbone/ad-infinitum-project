"""Descarga detecciones de FIRMS para completar:
  1) los meses marcados como faltantes en CONAE (2012-2021), y
  2) desde el fin de CONAE (2024-10-02) hasta hoy.

Uso: python -m incendios.descargar_firms
"""

import calendar
import json
import sys
from datetime import date, datetime, timedelta

from incendios.config import FIN_CONAE, MESES_FALTANTES_CONAE, DIR_INCENDIOS
from incendios.firms import ClienteFirms, FAMILIAS, fuentes_para_rango, ventanas


def meses_a_rangos():
    for mes in MESES_FALTANTES_CONAE:
        anio, m = int(mes[:4]), int(mes[5:])
        ultimo = calendar.monthrange(anio, m)[1]
        yield f"faltante {mes}", date(anio, m, 1), date(anio, m, ultimo)


def planificar(disponibilidad):
    """Lista de (etiqueta, fuente, inicio_ventana) de todas las llamadas necesarias."""
    plan = []
    for etiqueta, ini, fin in meses_a_rangos():
        for familia in ("MODIS", "VIIRS_SNPP", "VIIRS_NOAA20"):
            for fuente, d0, d1 in fuentes_para_rango(familia, ini, fin, disponibilidad):
                for v in ventanas(d0, d1):
                    plan.append((etiqueta, fuente, v))
    fin_actual = date.today()
    ini_post = FIN_CONAE + timedelta(days=1)
    for familia in FAMILIAS:
        for fuente, d0, d1 in fuentes_para_rango(familia, ini_post, fin_actual, disponibilidad):
            for v in ventanas(d0, d1):
                plan.append(("post-CONAE", fuente, v))
    return plan


def main():
    cliente = ClienteFirms()
    disp = cliente.disponibilidad()
    print("disponibilidad:", {k: (str(a), str(b)) for k, (a, b) in disp.items()}, flush=True)
    plan = planificar(disp)
    print(f"llamadas planificadas: {len(plan)}", flush=True)

    resumen = {}
    for n, (etiqueta, fuente, inicio) in enumerate(plan, 1):
        df = cliente.area(fuente, inicio)
        clave = (etiqueta, fuente)
        resumen[clave] = resumen.get(clave, 0) + len(df)
        if n % 25 == 0 or n == len(plan):
            est = cliente.estado()
            print(f"[{n}/{len(plan)}] {fuente} {inicio} filas={len(df)} | transacciones={est['current_transactions']}", flush=True)

    manifest = {
        "generado": datetime.now().isoformat(timespec="seconds"),
        "llamadas_planificadas": len(plan),
        "llamadas_nuevas": cliente.llamadas,
        "filas_por_etiqueta_y_fuente": {f"{e} | {f}": n for (e, f), n in resumen.items()},
    }
    DIR_INCENDIOS.mkdir(parents=True, exist_ok=True)
    (DIR_INCENDIOS / "firms_manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print("RESULTADO: completo", json.dumps(manifest["llamadas_nuevas"]), flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
