// Escalas de color compartidas por mapa, graficos y canvas (mismos valores que globals.css)

export const FUEGO = ["#9b5bb5", "#d9507f", "#f07f4f", "#f8b44e", "#fcebb0"] as const;
export const SIN_DATO = "#8d99a6";
export const CERO = "#22344a";
export const CENIZA = "#ece8df";
export const AGUA = "#5e9cc9";

// Potencia radiativa del foco (FP_Power, MW): cortes por clase
export const CORTES_POTENCIA = [10, 30, 100, 300] as const;

export const CLASES_POTENCIA = [
  { etiqueta: "menos de 10 MW", color: FUEGO[0] },
  { etiqueta: "10 a 30 MW", color: FUEGO[1] },
  { etiqueta: "30 a 100 MW", color: FUEGO[2] },
  { etiqueta: "100 a 300 MW", color: FUEGO[3] },
  { etiqueta: "300 MW o más", color: FUEGO[4] },
] as const;

// Cantidad de focos por mes (matriz anio x mes)
export const CORTES_CONTEO = [10, 30, 80, 200] as const;

export const CLASES_CONTEO = [
  { etiqueta: "1 a 9", color: FUEGO[0] },
  { etiqueta: "10 a 29", color: FUEGO[1] },
  { etiqueta: "30 a 79", color: FUEGO[2] },
  { etiqueta: "80 a 199", color: FUEGO[3] },
  { etiqueta: "200 o más", color: FUEGO[4] },
] as const;

export function colorConteo(v: number): string {
  if (v <= 0) return CERO;
  let i = 0;
  while (i < CORTES_CONTEO.length && v >= CORTES_CONTEO[i]) i++;
  return FUEGO[i];
}

export function colorPotencia(p: number | null): string {
  if (p === null) return SIN_DATO;
  let i = 0;
  while (i < CORTES_POTENCIA.length && p >= CORTES_POTENCIA[i]) i++;
  return FUEGO[i];
}

// Texto oscuro o claro sobre cada color de la escala
export function tintaSobre(color: string): string {
  return color === FUEGO[0] || color === CERO || color === FUEGO[1] ? CENIZA : "#13202d";
}
