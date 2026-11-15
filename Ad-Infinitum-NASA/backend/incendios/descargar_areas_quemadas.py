"""Descarga los granulos mensuales de area quemada (MCD64A1, VNP64A1) que cubren San Luis.

Uso: python -m incendios.descargar_areas_quemadas [MCD64A1 VNP64A1]
Reanudable: un archivo ya descargado y valido se salta. La validacion comprueba la firma HDF4/HDF5
y que el tamano coincida con el de CMR (tolerancia 2 %).
"""

import os
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date

import earthaccess

from incendios.config import BBOX, DIR_RAW_AREAS, ENV, PRODUCTOS_AREA

FIRMA_HDF4 = b"\x0e\x03\x13\x01"
FIRMA_HDF5 = b"\x89HDF"
HILOS = 4


def cargar_credenciales():
    texto = ENV.read_text(encoding="utf-8")
    for clave in ("EARTHDATA_USERNAME", "EARTHDATA_PASSWORD"):
        m = re.search(rf'^\s*{clave}\s*=\s*["\']?([^"\'\s]+)', texto, re.M)
        if not m:
            raise RuntimeError(f"Falta {clave} en backend/.env")
        os.environ[clave] = m.group(1)


def es_valido(ruta, tamano_mb):
    if not ruta.exists() or ruta.stat().st_size == 0:
        return False
    with open(ruta, "rb") as f:
        firma = f.read(8)
    if not (firma.startswith(FIRMA_HDF4) or firma.startswith(FIRMA_HDF5)):
        return False
    if tamano_mb:
        esperado = float(tamano_mb) * 1024 * 1024
        return abs(ruta.stat().st_size - esperado) / esperado < 0.02
    return True


def descargar_producto(producto):
    cfg = PRODUCTOS_AREA[producto]
    destino = DIR_RAW_AREAS / producto
    destino.mkdir(parents=True, exist_ok=True)
    granulos = earthaccess.search_data(
        short_name=producto,
        version=cfg["version"],
        bounding_box=BBOX,
        temporal=(cfg["inicio"].isoformat(), date.today().isoformat()),
    )
    print(f"{producto}: {len(granulos)} granulos encontrados", flush=True)

    pendientes = []
    for g in granulos:
        nombre = g.data_links()[0].split("/")[-1]
        ruta = destino / nombre
        if es_valido(ruta, g.size):
            continue
        pendientes.append((g, ruta))
    print(f"{producto}: {len(granulos) - len(pendientes)} ya validos, {len(pendientes)} por bajar", flush=True)

    errores = []
    with ThreadPoolExecutor(max_workers=HILOS) as pool:
        futuros = {pool.submit(_bajar_uno, g, ruta): ruta for g, ruta in pendientes}
        for n, fut in enumerate(as_completed(futuros), 1):
            ruta = futuros[fut]
            try:
                fut.result()
                print(f"  [{n}/{len(pendientes)}] {ruta.name} OK", flush=True)
            except Exception as e:
                errores.append((ruta.name, str(e)[:200]))
                print(f"  [{n}/{len(pendientes)}] {ruta.name} ERROR {e}", flush=True)

    invalidos = [g.data_links()[0].split("/")[-1] for g in granulos
                 if not es_valido(destino / g.data_links()[0].split("/")[-1], g.size)]
    print(f"{producto}: invalidos al final = {len(invalidos)} {invalidos[:5]}", flush=True)
    return len(invalidos) == 0 and not errores


def _bajar_uno(granulo, ruta):
    earthaccess.download([granulo], local_path=str(ruta.parent))
    if not es_valido(ruta, granulo.size):
        raise RuntimeError("archivo descargado no valido (firma o tamano)")


def main(productos):
    cargar_credenciales()
    earthaccess.login(strategy="environment")
    ok = all(descargar_producto(p) for p in productos)
    print("RESULTADO:", "completo" if ok else "incompleto, volver a ejecutar", flush=True)
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:] or list(PRODUCTOS_AREA)))

