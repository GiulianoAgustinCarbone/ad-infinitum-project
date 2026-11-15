"""Exporta los incendios confirmados (focos con quemado = true) con el mismo esquema que focos.compact.json.

Entrada: backend/data/incendios/focos_confirmados.compact.json (python -m incendios.cruce)
Salida:  backend/data/incendios/incendios.compact.json

Uso: python -m incendios.exportar_incendios
"""

import json
import sys
from datetime import datetime

from incendios.config import DIR_INCENDIOS

ENTRADA = DIR_INCENDIOS / "focos_confirmados.compact.json"
SALIDA = DIR_INCENDIOS / "incendios.compact.json"


def main():
    d = json.loads(ENTRADA.read_text(encoding="utf-8"))
    c = d["columnas"]
    idx = [i for i in range(d["n"]) if c["quemado"][i] is True]
    columnas = {k: [v[i] for i in idx] for k, v in c.items()}
    fechas = [f"{columnas['anio'][j]:04d}-{columnas['mes'][j]:02d}-{columnas['dia'][j]:02d}" for j in range(len(idx))]
    salida = {
        "fuente": "Incendios confirmados: focos de CONAE y NASA FIRMS con area quemada (MCD64A1/VNP64A1) a menos de 1 km "
                  "en el mismo mes.",
        "generado": datetime.now().isoformat(timespec="seconds"),
        "descargado": d["descargado"],
        "n": len(idx),
        "fechaMin": min(fechas) if fechas else None,
        "fechaMax": max(fechas) if fechas else None,
        "departamentos": d["departamentos"],
        "satelites": d["satelites"],
        "sensores": d["sensores"],
        "origenes": d["origenes"],
        "notas": d["notas"],
        "columnas": columnas,
    }
    SALIDA.write_text(json.dumps(salida, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"incendios: {len(idx)} de {d['n']} focos ({salida['fechaMin']} a {salida['fechaMax']}) -> {SALIDA.name}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
