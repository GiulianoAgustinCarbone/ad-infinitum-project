// Estadistica de tendencias portada de docs/prototipo-detective.html.
// Sin dependencias: se usa en el navegador y en scripts/preparar-datos.ts.

export function erf(x: number): number {
  const s = x < 0 ? -1 : 1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax);
  return s * y;
}

// Funcion de distribucion de la normal estandar
export function phi(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

export type AjusteLineal = { pendiente: number; ordenada: number };

// Regresion lineal por minimos cuadrados
export function ajusteLineal(xs: readonly number[], ys: readonly number[]): AjusteLineal {
  const n = xs.length;
  if (n < 2 || n !== ys.length) throw new Error("Se necesitan al menos dos pares (x, y)");
  let sx = 0;
  let sy = 0;
  for (let i = 0; i < n; i++) {
    sx += xs[i];
    sy += ys[i];
  }
  const mx = sx / n;
  const my = sy / n;
  let sxy = 0;
  let sxx = 0;
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - mx) * (ys[i] - my);
    sxx += (xs[i] - mx) ** 2;
  }
  const pendiente = sxx === 0 ? 0 : sxy / sxx;
  return { pendiente, ordenada: my - pendiente * mx };
}

export type MannKendall = { S: number; varianza: number; z: number; p: number };

// Prueba de Mann-Kendall (dos colas) con correccion por empates.
// El prototipo no corregia empates; con conteos de focos los empates son comunes.
export function mannKendall(ys: readonly number[]): MannKendall {
  const n = ys.length;
  if (n < 3) throw new Error("Mann-Kendall necesita al menos tres valores");
  let S = 0;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) S += Math.sign(ys[j] - ys[i]);
  }
  const grupos = new Map<number, number>();
  for (const y of ys) grupos.set(y, (grupos.get(y) ?? 0) + 1);
  let empates = 0;
  for (const t of grupos.values()) if (t > 1) empates += t * (t - 1) * (2 * t + 5);
  const varianza = (n * (n - 1) * (2 * n + 5) - empates) / 18;
  const z = S === 0 || varianza === 0 ? 0 : (S - Math.sign(S)) / Math.sqrt(varianza);
  return { S, varianza, z, p: 2 * (1 - phi(Math.abs(z))) };
}

// Pendiente de Sen: mediana de las pendientes entre todos los pares (robusta a extremos)
export function pendienteSen(xs: readonly number[], ys: readonly number[]): number {
  const pendientes: number[] = [];
  for (let i = 0; i < xs.length - 1; i++) {
    for (let j = i + 1; j < xs.length; j++) {
      if (xs[j] !== xs[i]) pendientes.push((ys[j] - ys[i]) / (xs[j] - xs[i]));
    }
  }
  if (pendientes.length === 0) return 0;
  pendientes.sort((a, b) => a - b);
  const m = pendientes.length >> 1;
  return pendientes.length % 2 ? pendientes[m] : (pendientes[m - 1] + pendientes[m]) / 2;
}

export const ALFA = 0.05;

export type Tendencia = {
  n: number;
  desde: number;
  hasta: number;
  pendienteAnual: number;
  ordenada: number;
  senAnual: number;
  // Ordenada de la recta de Sen: mediana de y - pendiente * x
  ordenadaSen: number;
  p: number;
  z: number;
  significativa: boolean;
};

export function analizarTendencia(xs: readonly number[], ys: readonly number[]): Tendencia {
  const ajuste = ajusteLineal(xs, ys);
  const mk = mannKendall(ys);
  const sen = pendienteSen(xs, ys);
  const residuos = xs.map((x, i) => ys[i] - sen * x).sort((a, b) => a - b);
  const m = residuos.length >> 1;
  const ordenadaSen = residuos.length % 2 ? residuos[m] : (residuos[m - 1] + residuos[m]) / 2;
  return {
    n: xs.length,
    desde: Math.min(...xs),
    hasta: Math.max(...xs),
    pendienteAnual: ajuste.pendiente,
    ordenada: ajuste.ordenada,
    senAnual: sen,
    ordenadaSen,
    p: mk.p,
    z: mk.z,
    significativa: mk.p < ALFA,
  };
}
