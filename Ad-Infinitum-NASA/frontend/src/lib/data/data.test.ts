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

  it("cumple el contrato de datos", () => {
    expect(() => validarGrilla(grilla)).not.toThrow();
    expect(grilla.features).toHaveLength(1600);
  });

  it("es determinista", () => {
    expect(generarGrillaMock()).toEqual(grilla);
  });

  it("tiene valores plausibles de temperatura", () => {
    for (const c of grilla.features) {
      for (const anio of ANIOS) {
        const v = c.properties[claveAnio(anio)];
        expect(v).toBeGreaterThan(10);
        expect(v).toBeLessThan(40);
      }
    }
  });

  it("es mas calida al norte que al sur", () => {
    const norte = serieDesdeGrilla(grilla, [-70, -28, -60, -26]);
    const sur = serieDesdeGrilla(grilla, [-70, -36, -60, -34]);
    expect(norte.values[0]).toBeGreaterThan(sur.values[0] + 5);
  });

  it("se calienta mas en el foco noreste que en el suroeste", () => {
    const noreste = serieDesdeGrilla(grilla, [-63.5, -29.5, -61, -27]);
    const suroeste = serieDesdeGrilla(grilla, [-69, -35, -66.5, -32.5]);
    const pNe = pendiente(noreste.years, noreste.values);
    const pSo = pendiente(suroeste.years, suroeste.values);
    expect(pNe).toBeGreaterThan(0.03);
    expect(pNe).toBeGreaterThan(pSo + 0.03);
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
