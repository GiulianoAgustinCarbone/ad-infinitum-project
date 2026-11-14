import type { ExpressionSpecification } from "maplibre-gl";
import { ANIOS, claveAnio, type Grilla, type PropiedadesCelda } from "@/lib/data";

export type Vista = "temperatura" | "anomalia";
export type Dominio = readonly [number, number];

// Secuencial amarillo a rojo oscuro (ColorBrewer YlOrRd)
export const PALETA_TEMPERATURA = ["#FFFFCC", "#FFEDA0", "#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C", "#B10026"];
// Divergente azul a rojo con centro neutro (ColorBrewer RdBu invertida)
export const PALETA_ANOMALIA = ["#2166AC", "#67A9CF", "#D1E5F0", "#F7F7F7", "#FDDBC7", "#EF8A62", "#B2182B"];

export type PropiedadesConMedia = PropiedadesCelda & { media: number };
export type GrillaConMedia = Grilla & {
  features: (Grilla["features"][number] & { properties: PropiedadesConMedia })[];
};

// Agrega a cada celda su promedio del periodo completo; la anomalia de un anio
// es la diferencia contra ese promedio
export function conMedia(grilla: Grilla): GrillaConMedia {
  return {
    ...grilla,
    features: grilla.features.map((celda) => {
      let suma = 0;
      for (const anio of ANIOS) suma += celda.properties[claveAnio(anio)];
      return { ...celda, properties: { ...celda.properties, media: suma / ANIOS.length } };
    }),
  };
}

// Dominio fijo para todos los anios: los colores se comparan entre anios y mapas
export function dominioTemperatura(grilla: Grilla): Dominio {
  let min = Infinity;
  let max = -Infinity;
  for (const celda of grilla.features) {
    for (const anio of ANIOS) {
      const v = celda.properties[claveAnio(anio)];
      min = Math.min(min, v);
      max = Math.max(max, v);
    }
  }
  return [Math.floor(min), Math.ceil(max)];
}

// Simetrico alrededor de cero, redondeado a medio grado
export function dominioAnomalia(grilla: GrillaConMedia): Dominio {
  let maxAbs = 0;
  for (const celda of grilla.features) {
    for (const anio of ANIOS) {
      maxAbs = Math.max(maxAbs, Math.abs(celda.properties[claveAnio(anio)] - celda.properties.media));
    }
  }
  const limite = Math.max(0.5, Math.ceil(maxAbs * 2) / 2);
  return [-limite, limite];
}

export function paleta(vista: Vista): string[] {
  return vista === "temperatura" ? PALETA_TEMPERATURA : PALETA_ANOMALIA;
}

export function valorCelda(propiedades: PropiedadesConMedia, vista: Vista, anio: number): number {
  const v = propiedades[claveAnio(anio)];
  return vista === "temperatura" ? v : v - propiedades.media;
}

// Expresion interpolate de MapLibre: color por valor del anio elegido
export function expresionColor(vista: Vista, anio: number, [min, max]: Dominio): ExpressionSpecification {
  const valor: ExpressionSpecification =
    vista === "temperatura"
      ? ["get", claveAnio(anio)]
      : ["-", ["get", claveAnio(anio)], ["get", "media"]];
  const colores = paleta(vista);
  const paradas = colores.flatMap((color, i) => [min + ((max - min) * i) / (colores.length - 1), color]);
  return ["interpolate", ["linear"], valor, ...paradas] as ExpressionSpecification;
}
