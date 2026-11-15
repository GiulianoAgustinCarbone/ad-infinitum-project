import type { Feature, Polygon } from "geojson";
import {
  ANIOS,
  claveAnio,
  type Grilla,
  type PropiedadesCelda,
  type Sector,
  type SerieSector,
} from "./tipos";

export function centroCelda(celda: Feature<Polygon, PropiedadesCelda>): [number, number] {
  let oeste = Infinity;
  let este = -Infinity;
  let sur = Infinity;
  let norte = -Infinity;
  for (const [lon, lat] of celda.geometry.coordinates[0]) {
    oeste = Math.min(oeste, lon);
    este = Math.max(este, lon);
    sur = Math.min(sur, lat);
    norte = Math.max(norte, lat);
  }
  return [(oeste + este) / 2, (sur + norte) / 2];
}

export function normalizarSector([a, b, c, d]: Sector): Sector {
  return [Math.min(a, c), Math.min(b, d), Math.max(a, c), Math.max(b, d)];
}

// Celdas cuyo centro cae dentro del sector
export function celdasEnSector(grilla: Grilla, sector: Sector) {
  const [oeste, sur, este, norte] = normalizarSector(sector);
  return grilla.features.filter((celda) => {
    const [lon, lat] = centroCelda(celda);
    return lon >= oeste && lon <= este && lat >= sur && lat <= norte;
  });
}

// Promedio anual de las celdas del sector. Los valores no finitos se ignoran;
// un anio sin valores validos queda fuera de la serie.
export function serieDesdeGrilla(grilla: Grilla, sector: Sector): SerieSector {
  const celdas = celdasEnSector(grilla, sector);
  const years: number[] = [];
  const values: number[] = [];
  for (const anio of ANIOS) {
    const clave = claveAnio(anio);
    let suma = 0;
    let n = 0;
    for (const celda of celdas) {
      const v = celda.properties[clave];
      if (Number.isFinite(v)) {
        suma += v;
        n++;
      }
    }
    if (n > 0) {
      years.push(anio);
      values.push(suma / n);
    }
  }
  return { years, values };
}
