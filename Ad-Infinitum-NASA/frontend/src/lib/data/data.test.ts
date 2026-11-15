import { afterEach, describe, expect, it, vi } from "vitest";
import { validarGrilla } from "./api";
import { generarGrillaMock } from "./mock";
import { celdasEnSector, serieDesdeGrilla } from "./serie";
import { ANIOS, claveAnio, type Grilla, type PropiedadesCelda } from "./tipos";

function celda(lon: number, lat: number, valor: (anio: number) => number) {
  const props = { id: `${lon},${lat}` } as PropiedadesCelda;
  for (const anio of ANIOS) props[claveAnio(anio)] = valor(anio);
  return {
    type: "Feature" as const,
    properties: props,
    geometry: {
      type: "Polygon" as const,
      coordinates: [[[lon, lat], [lon + 1, lat], [lon + 1, lat - 1], [lon, lat - 1], [lon, lat]]],
    },
  };
}

function pendiente(xs: number[], ys: number[]): number {
  const mx = xs.reduce((a, b) => a + b, 0) / xs.length;
  const my = ys.reduce((a, b) => a + b, 0) / ys.length;
  let sxy = 0;
  let sxx = 0;
  xs.forEach((x, i) => {
    sxy += (x - mx) * (ys[i] - my);
    sxx += (x - mx) ** 2;
  });
  return sxy / sxx;
}

describe("serieDesdeGrilla", () => {
  const grilla: Grilla = {
    type: "FeatureCollection",
    features: [celda(0, 0, (a) => a - 2000), celda(1, 0, (a) => a - 1990), celda(5, 0, () => 99)],
  };

  it("promedia solo las celdas cuyo centro cae en el sector", () => {
    const serie = serieDesdeGrilla(grilla, [0, -1, 2, 0]);
    expect(serie.years).toEqual([...ANIOS]);
    expect(serie.values[0]).toBe((5 + 15) / 2);
  });

  it("acepta sectores dibujados en cualquier direccion", () => {
    expect(celdasEnSector(grilla, [2, 0, 0, -1])).toHaveLength(2);
  });

  it("devuelve una serie vacia si el sector no contiene celdas", () => {
    expect(serieDesdeGrilla(grilla, [20, 20, 21, 21])).toEqual({ years: [], values: [] });
  });
});

describe("generarGrillaMock", () => {
  const grilla = generarGrillaMock();

  it("cumple el contrato de datos y cubre Argentina", () => {
    expect(() => validarGrilla(grilla)).not.toThrow();
    // 42 x 66 celdas de 0,5 grados entre -74/-53 de longitud y -55/-22 de latitud
    expect(grilla.features).toHaveLength(42 * 66);
  });

  it("es determinista", () => {
    expect(generarGrillaMock()).toEqual(grilla);
  });

  it("tiene valores plausibles de temperatura", () => {
    for (const c of grilla.features) {
      for (const anio of ANIOS) {
        const v = c.properties[claveAnio(anio)];
        expect(v).toBeGreaterThan(-10);
        expect(v).toBeLessThan(32);
      }
    }
  });

  it("mantiene la anomalia de cada celda entre -1,5 y +1,5 C", () => {
    for (const c of grilla.features) {
      const valores = ANIOS.map((a) => c.properties[claveAnio(a)]);
      const media = valores.reduce((s, v) => s + v, 0) / valores.length;
      for (const v of valores) expect(Math.abs(v - media)).toBeLessThanOrEqual(1.5);
    }
  });

  it("es mas calida al norte que al sur", () => {
    const norte = serieDesdeGrilla(grilla, [-64, -27, -58, -22]);
    const sur = serieDesdeGrilla(grilla, [-71, -55, -66, -50]);
    expect(norte.values[0]).toBeGreaterThan(sur.values[0] + 12);
  });

  it("es mas fria sobre la cordillera que en el llano a la misma latitud", () => {
    const cordillera = serieDesdeGrilla(grilla, [-71, -25, -69.5, -23]);
    const llano = serieDesdeGrilla(grilla, [-63, -25, -61.5, -23]);
    expect(llano.values[0]).toBeGreaterThan(cordillera.values[0] + 5);
  });

  it("se calienta mas en el noreste que en la Patagonia", () => {
    const noreste = serieDesdeGrilla(grilla, [-61, -29, -57, -25]);
    const patagonia = serieDesdeGrilla(grilla, [-70, -48, -66, -44]);
    const pNe = pendiente(noreste.years, noreste.values);
    const pPa = pendiente(patagonia.years, patagonia.values);
    expect(pNe).toBeGreaterThan(0.025);
    expect(pNe).toBeGreaterThan(pPa + 0.015);
  });
});

describe("validarGrilla", () => {
  it("rechaza respuestas que no cumplen el contrato", () => {
    expect(() => validarGrilla(null)).toThrow();
    expect(() => validarGrilla({ type: "FeatureCollection", features: [] })).toThrow();
    const incompleta = celda(0, 0, () => 1) as { properties: Record<string, unknown> };
    delete incompleta.properties.t2010;
    expect(() => validarGrilla({ type: "FeatureCollection", features: [incompleta] })).toThrow(/t2010/);
  });
});

describe("seleccion de fuente", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("usa el mock por defecto", async () => {
    vi.stubEnv("NEXT_PUBLIC_USE_MOCK", "");
    const { datos } = await import("./index");
    expect(datos.ilustrativo).toBe(true);
  });

  it("usa la API cuando el flag es false", async () => {
    vi.stubEnv("NEXT_PUBLIC_USE_MOCK", "false");
    const { datos } = await import("./index");
    expect(datos.ilustrativo).toBe(false);
  });
});
