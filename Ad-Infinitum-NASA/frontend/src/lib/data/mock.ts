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

// Extension de la grilla sintetica, centrada en el centro oeste de Argentina
const OESTE = -70;
const NORTE = -26;
const LADO = 0.25;
const N = 40;

// Hash entero determinista en [0, 1): misma grilla en cada carga
function hash(i: number, j: number, k: number): number {
  let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(k, 2246822519)) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function gauss(x: number, y: number, cx: number, cy: number, s: number): number {
  const dx = x - cx;
  const dy = y - cy;
  return Math.exp(-(dx * dx + dy * dy) / s);
}

function redondear(v: number): number {
  return Math.round(v * 100) / 100;
}

// Generador portado del prototipo: gradiente norte-sur, relieve suave,
// tendencia que varia en el espacio (foco de calentamiento al noreste,
// leve enfriamiento al suroeste), ciclo interanual comun y ruido por celda
export function generarGrillaMock(): Grilla {
  const features: Feature<Polygon, PropiedadesCelda>[] = [];
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const x = i / (N - 1);
      const y = j / (N - 1);
      const base = 30.5 - 10.5 * y + 2.4 * Math.sin(5.2 * x + 1.3) * Math.cos(4.1 * y) + 1.1 * Math.sin(9 * x + 3 * y);
      const tendencia = 0.012 + 0.055 * gauss(x, y, 0.78, 0.25, 0.07) - 0.03 * gauss(x, y, 0.22, 0.78, 0.06);
      const sesgo = (hash(i, j, 0) - 0.5) * 0.5;

      const propiedades = { id: `c${i}-${j}` } as PropiedadesCelda;
      ANIOS.forEach((anio, k) => {
        const ciclo = (0.7 * Math.sin(1.7 * k + 0.4) + 0.45 * Math.sin(0.65 * k + 2.0)) * (0.8 + 0.4 * x);
        const ruido = (hash(i, j, k + 1) - 0.5) * 0.3;
        propiedades[claveAnio(anio)] = redondear(base + tendencia * k + ciclo + sesgo + ruido);
      });

      const o = OESTE + i * LADO;
      const n = NORTE - j * LADO;
      features.push({
        type: "Feature",
        id: j * N + i,
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
