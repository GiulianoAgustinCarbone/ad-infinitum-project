import type { Feature, FeatureCollection, MultiPolygon, Point, Polygon } from "geojson";
import { featureCollection } from "@turf/helpers";
import { intersect } from "@turf/intersect";
import { isobands } from "@turf/isobands";
import type { Campo } from "./rejilla";

// Escala discreta: n cortes definen n + 1 clases, abiertas en los extremos
export type Escala = {
  cortes: number[];
  colores: string[];
};

export type PropiedadesBanda = { clase: number; color: string };
export type Bandas = FeatureCollection<Polygon | MultiPolygon, PropiedadesBanda>;

// Cortes de los mapas de anomalia del SMN; la clase central (-0,2 a 0,2) es neutra
export const ESCALA_ANOMALIA: Escala = {
  cortes: [-1.5, -1.0, -0.8, -0.6, -0.4, -0.2, 0.2, 0.4, 0.6, 0.8, 1.0, 1.5],
  colores: [
    "#0B2C6B", "#1F4E9C", "#3A6FBF", "#6C95D6", "#9DB8E6", "#CCDAF3",
    "#FFFFFF",
    "#F9CFCB", "#F2A39B", "#E7766C", "#D44A41", "#B0241F", "#7A0B0B",
  ],
};

// Secuencial amarillo a rojo oscuro (ColorBrewer YlOrRd)
const PALETA_SECUENCIAL = ["#FFFFCC", "#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#BD0026", "#800026"];

function hexARgb(hex: string): [number, number, number] {
  return [1, 3, 5].map((p) => parseInt(hex.slice(p, p + 2), 16)) as [number, number, number];
}

function rgbAHex(rgb: number[]): string {
  return "#" + rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("").toUpperCase();
}

export function muestrearPaleta(paleta: string[], n: number): string[] {
  if (n === 1) return [paleta[Math.floor(paleta.length / 2)]];
  return Array.from({ length: n }, (_, k) => {
    const p = (k / (n - 1)) * (paleta.length - 1);
    const i = Math.min(Math.floor(p), paleta.length - 2);
    const t = p - i;
    const a = hexARgb(paleta[i]);
    const b = hexARgb(paleta[i + 1]);
    return rgbAHex(a.map((c, x) => c + (b[x] - c) * t));
  });
}

// Cortes cada `paso` grados dentro del rango de valores
export function escalaTemperatura([min, max]: readonly [number, number], paso = 2): Escala {
  const cortes: number[] = [];
  for (let c = Math.floor(min / paso) * paso + paso; c < max; c += paso) cortes.push(c);
  return { cortes, colores: muestrearPaleta(PALETA_SECUENCIAL, cortes.length + 1) };
}

export function claseDe(escala: Escala, valor: number): number {
  let k = 0;
  while (k < escala.cortes.length && valor >= escala.cortes[k]) k++;
  return k;
}

const EXTREMO = 1e4;

function rejillaDePuntos(campo: Campo): FeatureCollection<Point, { v: number }> {
  const features: Feature<Point, { v: number }>[] = [];
  const nx = campo.lons.length;
  for (let j = 0; j < campo.lats.length; j++) {
    for (let i = 0; i < nx; i++) {
      features.push({
        type: "Feature",
        properties: { v: campo.valores[j * nx + i] },
        geometry: { type: "Point", coordinates: [campo.lons[i], campo.lats[j]] },
      });
    }
  }
  return { type: "FeatureCollection", features };
}

function vacia(geometria: MultiPolygon): boolean {
  return geometria.coordinates.length === 0 || geometria.coordinates.every((p) => p.length === 0);
}

// Bandas de valor del campo, recortadas por el contorno
export function calcularBandas(
  campo: Campo,
  escala: Escala,
  contorno: Feature<Polygon | MultiPolygon>,
): Bandas {
  const cortes = [-EXTREMO, ...escala.cortes, EXTREMO];
  const crudas = isobands(rejillaDePuntos(campo), cortes, {
    zProperty: "v",
    breaksProperties: escala.colores.map((color, clase) => ({ clase, color })),
  });
  const features: Bandas["features"] = [];
  for (const banda of crudas.features) {
    if (vacia(banda.geometry)) continue;
    const propiedades = banda.properties as PropiedadesBanda;
    const recortada = intersect(featureCollection([banda, contorno]), {
      properties: { clase: propiedades.clase, color: propiedades.color },
    });
    if (recortada) features.push(recortada);
  }
  return { type: "FeatureCollection", features };
}

// Punto en poligono por cruce de rayos, contando huecos
export function dentroDe(contorno: Feature<Polygon | MultiPolygon>, lon: number, lat: number): boolean {
  const poligonos =
    contorno.geometry.type === "Polygon" ? [contorno.geometry.coordinates] : contorno.geometry.coordinates;
  let dentro = false;
  for (const poligono of poligonos) {
    for (const anillo of poligono) {
      for (let a = 0, b = anillo.length - 1; a < anillo.length; b = a++) {
        const [xa, ya] = anillo[a];
        const [xb, yb] = anillo[b];
        if (ya > lat !== yb > lat && lon < ((xb - xa) * (lat - ya)) / (yb - ya) + xa) dentro = !dentro;
      }
    }
  }
  return dentro;
}
