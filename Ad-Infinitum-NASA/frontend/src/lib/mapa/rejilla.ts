import { ANIOS, centroCelda, claveAnio, type Grilla } from "@/lib/data";

// Grilla regular como matriz: valores[j * lons.length + i] para la celda
// con centro (lons[i], lats[j]). lons y lats van en orden creciente.
export type Campo = {
  lons: number[];
  lats: number[];
  valores: Float32Array;
};

export type Rejilla = {
  lons: number[];
  lats: number[];
  // Un campo por anio, en el orden de ANIOS
  porAnio: Float32Array[];
  media: Float32Array;
};

function ejes(valores: number[]): number[] {
  return [...new Set(valores.map((v) => Math.round(v * 1e6) / 1e6))].sort((a, b) => a - b);
}

// Completa celdas sin dato con el promedio de sus vecinas, en pasadas sucesivas
function rellenarHuecos(campo: Float32Array, nx: number, ny: number) {
  let pendientes = campo.some(Number.isNaN);
  while (pendientes) {
    pendientes = false;
    const copia = Float32Array.from(campo);
    let cambios = 0;
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        if (!Number.isNaN(copia[j * nx + i])) continue;
        let suma = 0;
        let n = 0;
        for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const ii = i + di;
          const jj = j + dj;
          if (ii < 0 || jj < 0 || ii >= nx || jj >= ny) continue;
          const v = copia[jj * nx + ii];
          if (!Number.isNaN(v)) {
            suma += v;
            n++;
          }
        }
        if (n > 0) {
          campo[j * nx + i] = suma / n;
          cambios++;
        } else {
          pendientes = true;
        }
      }
    }
    if (cambios === 0) break;
  }
}

export function rejillaDesdeGrilla(grilla: Grilla): Rejilla {
  const centros = grilla.features.map(centroCelda);
  const lons = ejes(centros.map(([lon]) => lon));
  const lats = ejes(centros.map(([, lat]) => lat));
  const nx = lons.length;
  const indiceLon = new Map(lons.map((v, i) => [v, i]));
  const indiceLat = new Map(lats.map((v, j) => [v, j]));
  const porAnio = ANIOS.map(() => new Float32Array(nx * lats.length).fill(NaN));

  grilla.features.forEach((celda, n) => {
    const [lon, lat] = centros[n];
    const i = indiceLon.get(Math.round(lon * 1e6) / 1e6)!;
    const j = indiceLat.get(Math.round(lat * 1e6) / 1e6)!;
    ANIOS.forEach((anio, k) => {
      const v = celda.properties[claveAnio(anio)];
      if (Number.isFinite(v)) porAnio[k][j * nx + i] = v;
    });
  });
  for (const campo of porAnio) rellenarHuecos(campo, nx, lats.length);

  const media = new Float32Array(nx * lats.length);
  for (const campo of porAnio) for (let p = 0; p < media.length; p++) media[p] += campo[p] / porAnio.length;
  return { lons, lats, porAnio, media };
}

export type VistaCampo = "temperatura" | "anomalia";

export function campoDe(rejilla: Rejilla, vista: VistaCampo, indiceAnio: number): Campo {
  const anio = rejilla.porAnio[indiceAnio];
  const valores = vista === "temperatura" ? anio : anio.map((v, p) => v - rejilla.media[p]);
  return { lons: rejilla.lons, lats: rejilla.lats, valores };
}

// Posicion fraccionaria de x en un eje creciente; null si queda afuera
function ubicar(eje: number[], x: number): [number, number] | null {
  if (x < eje[0] || x > eje[eje.length - 1]) return null;
  let i = 0;
  while (i < eje.length - 2 && eje[i + 1] < x) i++;
  const t = eje[i + 1] === eje[i] ? 0 : (x - eje[i]) / (eje[i + 1] - eje[i]);
  return [i, t];
}

export function valorBilineal(campo: Campo, lon: number, lat: number): number {
  const x = ubicar(campo.lons, lon);
  const y = ubicar(campo.lats, lat);
  if (!x || !y) return NaN;
  const nx = campo.lons.length;
  const [i, tx] = x;
  const [j, ty] = y;
  const i1 = Math.min(i + 1, nx - 1);
  const j1 = Math.min(j + 1, campo.lats.length - 1);
  const v = campo.valores;
  const abajo = v[j * nx + i] * (1 - tx) + v[j * nx + i1] * tx;
  const arriba = v[j1 * nx + i] * (1 - tx) + v[j1 * nx + i1] * tx;
  return abajo * (1 - ty) + arriba * ty;
}

// Interpolacion bilineal a una rejilla `factor` veces mas fina en cada eje
export function refinar(campo: Campo, factor: number): Campo {
  const fino = (eje: number[]) => {
    const salida: number[] = [];
    for (let i = 0; i < eje.length - 1; i++) {
      for (let s = 0; s < factor; s++) salida.push(eje[i] + ((eje[i + 1] - eje[i]) * s) / factor);
    }
    salida.push(eje[eje.length - 1]);
    return salida;
  };
  const lons = fino(campo.lons);
  const lats = fino(campo.lats);
  const valores = new Float32Array(lons.length * lats.length);
  for (let j = 0; j < lats.length; j++) {
    const jc = Math.min(Math.floor(j / factor), campo.lats.length - 2);
    const ty = (j - jc * factor) / factor;
    for (let i = 0; i < lons.length; i++) {
      const ic = Math.min(Math.floor(i / factor), campo.lons.length - 2);
      const tx = (i - ic * factor) / factor;
      const nx = campo.lons.length;
      const v = campo.valores;
      const abajo = v[jc * nx + ic] * (1 - tx) + v[jc * nx + ic + 1] * tx;
      const arriba = v[(jc + 1) * nx + ic] * (1 - tx) + v[(jc + 1) * nx + ic + 1] * tx;
      valores[j * lons.length + i] = abajo * (1 - ty) + arriba * ty;
    }
  }
  return { lons, lats, valores };
}
