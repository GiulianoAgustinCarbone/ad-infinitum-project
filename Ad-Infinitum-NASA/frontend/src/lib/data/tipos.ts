import type { FeatureCollection, Polygon } from "geojson";

// Rango de anios del contrato con el backend
export const ANIO_INICIO = 2005;
export const ANIO_FIN = 2024;

export const ANIOS: readonly number[] = Array.from(
  { length: ANIO_FIN - ANIO_INICIO + 1 },
  (_, i) => ANIO_INICIO + i,
);

// Clave de propiedad por anio: t2005 ... t2024, en grados C
export type ClaveAnio = `t${number}`;

export function claveAnio(anio: number): ClaveAnio {
  return `t${anio}`;
}

export type PropiedadesCelda = {
  id?: string;
} & Record<ClaveAnio, number>;

// Grilla: una celda por feature, propiedades t2005 ... t2024
export type Grilla = FeatureCollection<Polygon, PropiedadesCelda>;

// Rectangulo geografico [oeste, sur, este, norte] en grados
export type Sector = readonly [number, number, number, number];

export type SerieSector = {
  years: number[];
  values: number[];
};

export interface FuenteDatos {
  // true cuando los valores no provienen de mediciones reales
  readonly ilustrativo: boolean;
  getGrilla(): Promise<Grilla>;
  getSerieSector(sector: Sector): Promise<SerieSector>;
}
