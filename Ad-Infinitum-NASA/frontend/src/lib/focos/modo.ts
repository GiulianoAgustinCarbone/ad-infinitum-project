import { decimal } from "@/lib/formato";
import { FUEGO, CERO } from "./escala";

// Modo de la pagina de focos: focos de calor (CONAE + FIRMS) o incendios confirmados (area quemada)
export type Modo = "focos" | "incendios";

export const MODOS: { valor: Modo; etiqueta: string }[] = [
  { valor: "focos", etiqueta: "Focos de calor" },
  { valor: "incendios", etiqueta: "Incendios confirmados" },
];

export const TEXTOS = {
  focos: {
    singular: "foco",
    plural: "focos",
    cargando: "Cargando los focos de calor.",
    serie: "Satélite Aqua",
    unidadSerie: "focos",
    sujetoSerie: "los focos",
    porDecada: "focos por década",
    eje: "focos por año (Aqua)",
    tituloBarras: "Focos por mes, promedio de todos los años",
    tituloRanking: "Departamentos con más focos",
    subtituloRanking: "Total acumulado del satélite Aqua en todo el período.",
    subtituloBarras: (desde: string, hasta: string) => `Satélite Aqua, de ${desde} a ${hasta}. Los meses sin dato no cuentan.`,
    subtituloMatriz: "Cantidad de focos de Aqua: serie histórica, y NASA FIRMS donde la serie no tiene dato. Las celdas rayadas son meses fuera del período con datos.",
    columnaAnual: "focos_aqua",
    nombreAnual: "focos-anuales-aqua",
    nombreMensual: "focos-mensuales-por-departamento",
  },
  incendios: {
    singular: "incendio",
    plural: "incendios",
    cargando: "Cargando los incendios confirmados.",
    serie: "Área quemada (MCD64A1)",
    unidadSerie: "hectáreas",
    sujetoSerie: "la superficie quemada",
    porDecada: "hectáreas por década",
    eje: "hectáreas quemadas por año",
    tituloBarras: "Hectáreas quemadas por mes, promedio de todos los años",
    tituloRanking: "Departamentos con más área quemada",
    subtituloRanking: "Total acumulado de hectáreas quemadas en todo el período.",
    subtituloBarras: (desde: string, hasta: string) =>
      `Área quemada según MCD64A1, de ${desde} a ${hasta}. Los meses sin dato no cuentan.`,
    subtituloMatriz: "Hectáreas quemadas por mes en la provincia (MCD64A1). Las celdas rayadas son meses fuera del período con datos.",
    columnaAnual: "hectareas_quemadas",
    nombreAnual: "hectareas-quemadas-anuales",
    nombreMensual: "hectareas-quemadas-mensuales-por-departamento",
  },
} as const;

// Escala de color de la matriz de hectareas (la de focos no sirve: en hectareas casi todo quedaria en la ultima clase)
export const CORTES_HA = [1000, 5000, 15000, 40000] as const;
export const CLASES_HA = [
  { etiqueta: "menos de 1.000", color: FUEGO[0] },
  { etiqueta: "1.000 a 4.999", color: FUEGO[1] },
  { etiqueta: "5.000 a 14.999", color: FUEGO[2] },
  { etiqueta: "15.000 a 39.999", color: FUEGO[3] },
  { etiqueta: "40.000 o más", color: FUEGO[4] },
] as const;

export function colorHectareas(v: number): string {
  if (v <= 0) return CERO;
  let i = 0;
  while (i < CORTES_HA.length && v >= CORTES_HA[i]) i++;
  return FUEGO[i];
}

export type Textos = (typeof TEXTOS)[Modo];

// Paso "redondo" del eje vertical: unas 5 marcas, sea cual sea la magnitud (focos o hectareas)
export function pasoEje(max: number): number {
  const bruto = Math.max(max, 1) / 5;
  const potencia = Math.pow(10, Math.floor(Math.log10(bruto)));
  const f = bruto / potencia;
  const redondeado = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return redondeado * potencia;
}

// Etiqueta del eje: 1500 -> "1,5 mil" (los numeros chicos quedan tal cual)
export function rotuloEje(v: number): string {
  return v >= 1000 ? `${decimal(v / 1000, v % 1000 === 0 ? 0 : 1)} mil` : decimal(v, 0);
}
