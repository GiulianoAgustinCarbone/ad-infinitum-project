import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type { FocosCompactos, SerieMensualDeptos } from "../focos/tipos";
import { serieDesdeGrilla } from "./serie";
import { ANIOS, claveAnio, type FuenteDatos, type Grilla, type PropiedadesCelda, type Sector } from "./tipos";

// Fuente con datos reales: focos de calor de CONAE / Gobierno de San Luis,
// descargados una vez por backend/scripts/descargar_datos.mjs y copiados a
// public/datos/ por scripts/preparar-datos.mts. Se leen como archivos estaticos.

const BASE = "/datos";

export type Departamentos = FeatureCollection<Polygon | MultiPolygon, { nombre: string }>;
export type Embalses = FeatureCollection<Polygon | MultiPolygon, { nombre: string }>;

export interface FuenteFocos extends FuenteDatos {
  getFocos(): Promise<FocosCompactos>;
  getDepartamentos(): Promise<Departamentos>;
  getSerieMensual(): Promise<SerieMensualDeptos>;
  getIncendios(): Promise<FocosCompactos>;
  getSerieIncendios(): Promise<SerieMensualDeptos>;
  getEmbalses(): Promise<Embalses>;
}

export class ErrorFocos extends Error {}

const cache = new Map<string, Promise<unknown>>();

function pedir<T>(archivo: string): Promise<T> {
  let p = cache.get(archivo) as Promise<T> | undefined;
  if (!p) {
    p = fetch(`${BASE}/${archivo}`)
      .then((r) => {
        if (!r.ok) throw new ErrorFocos(`No se pudo leer ${archivo} (HTTP ${r.status})`);
        return r.json() as Promise<T>;
      })
      .catch((error) => {
        // Si falla se descarta para permitir reintentar
        cache.delete(archivo);
        throw error;
      });
    cache.set(archivo, p);
  }
  return p;
}

// Extension de San Luis con margen, en grados
export const EXTENSION_SAN_LUIS = { oeste: -67.5, este: -64.8, sur: -36.1, norte: -31.8 } as const;
const LADO = 0.1;

// Grilla del contrato (t2005 ... t2024): cantidad de focos por celda de 0,1 grados
// y por anio. Los anios 2002 a 2004 quedan fuera porque el contrato empieza en 2005.
export function grillaDeFocos(focos: FocosCompactos): Grilla {
  const { oeste, este, sur, norte } = EXTENSION_SAN_LUIS;
  const nx = Math.round((este - oeste) / LADO);
  const ny = Math.round((norte - sur) / LADO);
  const conteos = new Map<number, Map<number, number>>();
  const c = focos.columnas;
  for (let i = 0; i < focos.n; i++) {
    const ix = Math.floor((c.lon[i] - oeste) / LADO);
    const iy = Math.floor((norte - c.lat[i]) / LADO);
    if (ix < 0 || ix >= nx || iy < 0 || iy >= ny) continue;
    const id = iy * nx + ix;
    const porAnio = conteos.get(id) ?? new Map<number, number>();
    porAnio.set(c.anio[i], (porAnio.get(c.anio[i]) ?? 0) + 1);
    conteos.set(id, porAnio);
  }
  const features: Feature<Polygon, PropiedadesCelda>[] = [];
  for (const [id, porAnio] of conteos) {
    const ix = id % nx;
    const iy = Math.floor(id / nx);
    const o = oeste + ix * LADO;
    const n = norte - iy * LADO;
    const propiedades = { id: `f${ix}-${iy}` } as PropiedadesCelda;
    for (const anio of ANIOS) propiedades[claveAnio(anio)] = porAnio.get(anio) ?? 0;
    features.push({
      type: "Feature",
      id,
      properties: propiedades,
      geometry: { type: "Polygon", coordinates: [[[o, n], [o + LADO, n], [o + LADO, n - LADO], [o, n - LADO], [o, n]]] },
    });
  }
  return { type: "FeatureCollection", features };
}

let grilla: Promise<Grilla> | null = null;

export const fuenteFocos: FuenteFocos = {
  ilustrativo: false,
  getFocos: () => pedir<FocosCompactos>("focos.json"),
  getDepartamentos: () => pedir<Departamentos>("departamentos.geojson"),
  getSerieMensual: () => pedir<SerieMensualDeptos>("serie-aqua.json"),
  getIncendios: () => pedir<FocosCompactos>("incendios.json"),
  getSerieIncendios: () => pedir<SerieMensualDeptos>("serie-incendios.json"),
  getEmbalses: () => pedir<Embalses>("embalses.geojson"),
  getGrilla() {
    grilla ??= this.getFocos()
      .then(grillaDeFocos)
      .catch((e) => {
        grilla = null;
        throw e;
      });
    return grilla;
  },
  async getSerieSector(sector: Sector) {
    return serieDesdeGrilla(await this.getGrilla(), sector);
  },
};
