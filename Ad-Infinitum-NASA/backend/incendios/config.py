"""Constantes compartidas del pipeline de incendios confirmados (San Luis)."""

from datetime import date
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
DATOS = RAIZ / "data"
DIR_INCENDIOS = DATOS / "incendios"
DIR_RAW_AREAS = DIR_INCENDIOS / "raw" / "areas_quemadas"
DIR_RAW_FIRMS = DIR_INCENDIOS / "raw" / "firms"
DIR_PROCESADO = DIR_INCENDIOS / "procesado"
ENV = RAIZ / ".env"
FOCOS_CONAE = RAIZ.parent / "frontend" / "public" / "datos" / "focos.json"

# Provincia de San Luis (lon_min, lat_min, lon_max, lat_max), con margen
BBOX = (-67.4, -36.1, -64.7, -31.7)

# Productos de área quemada mensual (NASA LP DAAC)
PRODUCTOS_AREA = {
    "MCD64A1": {"version": "061", "inicio": date(2000, 11, 1), "sensor": "MODIS"},
    "VNP64A1": {"version": "002", "inicio": date(2012, 3, 1), "sensor": "VIIRS"},
}

# Meses en los que CONAE tiene menos detecciones de las esperadas (dato nulo en la tabla de Aqua)
MESES_FALTANTES_CONAE = [
    "2012-04", "2014-02", "2015-04", "2016-04", "2016-05", "2017-05", "2020-04", "2020-06", "2021-06",
]
# Primer dia sin datos de CONAE (fechaMax de focos.json es 2024-10-01)
FIN_CONAE = date(2024, 10, 1)
