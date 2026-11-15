import { describe, expect, it } from "vitest";
import { grillaDeFocos } from "./focos";
import type { FocosCompactos } from "../focos/tipos";

function focos(puntos: [number, number, number][]): FocosCompactos {
  return {
    fuente: "prueba", descargado: "2026-11-14", n: puntos.length, fechaMin: "", fechaMax: "",
    departamentos: ["A"], satelites: ["AQUA"], sensores: ["MODIS"], notas: [],
    columnas: {
      lon: puntos.map((p) => p[0]), lat: puntos.map((p) => p[1]), anio: puntos.map((p) => p[2]),
      mes: puntos.map(() => 8), dia: puntos.map(() => 1), power: puntos.map(() => 10),
      confianza: puntos.map(() => 90), depto: puntos.map(() => 0), sat: puntos.map(() => 1),
    },
  };
}

describe("grillaDeFocos", () => {
  it("cuenta focos por celda y anio, con cero en los anios sin focos", () => {
    const g = grillaDeFocos(focos([[-66.05, -33.05, 2010], [-66.04, -33.06, 2010], [-66.05, -33.05, 2020]]));
    expect(g.features).toHaveLength(1);
    const p = g.features[0].properties;
    expect(p.t2010).toBe(2);
    expect(p.t2020).toBe(1);
    expect(p.t2005).toBe(0);
  });

  it("descarta puntos fuera de San Luis", () => {
    expect(grillaDeFocos(focos([[-60, -30, 2010]])).features).toHaveLength(0);
  });
});
