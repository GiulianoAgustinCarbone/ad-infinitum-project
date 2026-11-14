import type { Feature, Polygon } from "geojson";
import { serieDesdeGrilla } from "./serie";
import {
  ANIOS,
  claveAnio,
  type FuenteDatos,
  type Grilla,
  type PropiedadesCelda,
  type Sector,
} from "./tipos";

// Grilla regular que cubre toda Argentina continental e insular
export const EXTENSION_MOCK = { oeste: -74, este: -53, sur: -55, norte: -22 } as const;
const LADO = 0.5;
const NX = Math.round((EXTENSION_MOCK.este - EXTENSION_MOCK.oeste) / LADO);
const NY = Math.round((EXTENSION_MOCK.norte - EXTENSION_MOCK.sur) / LADO);

// Hash entero determinista en [0, 1): misma grilla en cada carga
function hash(i: number, j: number, k: number): number {
  let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(k, 2246822519)) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function gauss(lon: number, lat: number, cLon: number, cLat: number, sLon: number, sLat: number): number {
  const dx = (lon - cLon) / sLon;
  const dy = (lat - cLat) / sLat;
  return Math.exp(-(dx * dx + dy * dy));
}

function redondear(v: number): number {
  return Math.round(v * 100) / 100;
}

// Temperatura media del periodo: gradiente norte-sur, enfriamiento por altura
// sobre la cordillera (mas marcado en la Puna) y nucleo calido en el Chaco
export function climatologia(lon: number, lat: number): number {
  const latitud = 25.5 + (lat + 22) * 0.6;
  const cordillera = -(4 + 5 * gauss(lon, lat, -67, -23.5, 2.5, 3)) * gauss(lon, lat, -70.2, lat, 1.4, 1);
  const chaco = 1.5 * gauss(lon, lat, -61.5, -25.5, 3, 3);
  return latitud + cordillera + chaco;
}

// Manchas regionales de anomalia: cada una oscila con su propio ritmo
const MANCHAS = [
  { lon: -60, lat: -27, sLon: 4, sLat: 3.5, amp: 0.75, fase: 0.4, ritmo: 1.7 },
  { lon: -63, lat: -34, sLon: 4.5, sLat: 3, amp: 0.7, fase: 2.1, ritmo: 1.1 },
  { lon: -67, lat: -43, sLon: 4, sLat: 5, amp: 0.65, fase: 4.0, ritmo: 0.8 },
  { lon: -66, lat: -26, sLon: 2.5, sLat: 3, amp: 0.55, fase: 5.3, ritmo: 2.3 },
  { lon: -69, lat: -51, sLon: 3.5, sLat: 3, amp: 0.5, fase: 1.2, ritmo: 1.4 },
];

// Anomalia del anio k (0 = 2005): tendencia que crece hacia el noreste,
// manchas regionales y ruido pequeno por celda. Queda dentro de +-1.5 C.
export function anomalia(lon: number, lat: number, k: number, ruido: number): number {
  const ritmo = 0.012 + 0.028 * gauss(lon, lat, -59, -27, 6, 5);
  const tendencia = ritmo * (k - (ANIOS.length - 1) / 2);
  let manchas = 0;
  for (const m of MANCHAS) {
    manchas += m.amp * Math.sin(m.ritmo * k + m.fase) * gauss(lon, lat, m.lon, m.lat, m.sLon, m.sLat);
  }
  return tendencia + manchas + (ruido - 0.5) * 0.06;
}

export function generarGrillaMock(): Grilla {
  const features: Feature<Polygon, PropiedadesCelda>[] = [];
  for (let j = 0; j < NY; j++) {
    for (let i = 0; i < NX; i++) {
      const o = EXTENSION_MOCK.oeste + i * LADO;
      const n = EXTENSION_MOCK.norte - j * LADO;
      const lon = o + LADO / 2;
      const lat = n - LADO / 2;
      const base = climatologia(lon, lat);

      const propiedades = { id: `c${i}-${j}` } as PropiedadesCelda;
      ANIOS.forEach((anio, k) => {
        propiedades[claveAnio(anio)] = redondear(base + anomalia(lon, lat, k, hash(i, j, k + 1)));
      });

      features.push({
        type: "Feature",
        id: j * NX + i,
        properties: propiedades,
        geometry: {
          type: "Polygon",
          coordinates: [[[o, n], [o + LADO, n], [o + LADO, n - LADO], [o, n - LADO], [o, n]]],
        },
      });
    }
  }
  return { type: "FeatureCollection", features };
}

let grilla: Grilla | null = null;

export const fuenteMock: FuenteDatos = {
  ilustrativo: true,
  async getGrilla() {
    grilla ??= generarGrillaMock();
    return grilla;
  },
  async getSerieSector(sector: Sector) {
    return serieDesdeGrilla(await this.getGrilla(), sector);
  },
};
