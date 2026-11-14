import { describe, expect, it } from "vitest";
import { generarGrillaMock } from "@/lib/data/mock";
import { ANIOS, claveAnio } from "@/lib/data";
import { fmt, fmtSigno } from "@/lib/formato";
import { cuadricula, extensionGrilla } from "./cuadricula";
import {
  PALETA_TEMPERATURA,
  conMedia,
  dominioAnomalia,
  dominioTemperatura,
  expresionColor,
  valorCelda,
} from "./escalas";

const grilla = conMedia(generarGrillaMock());

describe("escalas", () => {
  it("el dominio de temperatura contiene todos los valores", () => {
    const [min, max] = dominioTemperatura(grilla);
    for (const c of grilla.features) {
      for (const anio of ANIOS) {
        const v = c.properties[claveAnio(anio)];
        expect(v).toBeGreaterThanOrEqual(min);
        expect(v).toBeLessThanOrEqual(max);
      }
    }
  });

  it("el dominio de anomalia es simetrico y cubre los valores", () => {
    const [min, max] = dominioAnomalia(grilla);
    expect(min).toBe(-max);
    for (const c of grilla.features) {
      expect(Math.abs(valorCelda(c.properties, "anomalia", 2024))).toBeLessThanOrEqual(max);
    }
  });

  it("la anomalia media de cada celda es cero", () => {
    const c = grilla.features[123].properties;
    const suma = ANIOS.reduce((s, a) => s + valorCelda(c, "anomalia", a), 0);
    expect(suma).toBeCloseTo(0, 6);
  });

  it("la expresion interpola la propiedad del anio con todas las paradas", () => {
    const exp = expresionColor("temperatura", 2010, [10, 38]);
    expect(exp.slice(0, 3)).toEqual(["interpolate", ["linear"], ["get", "t2010"]]);
    expect(exp.length).toBe(3 + PALETA_TEMPERATURA.length * 2);
    expect(exp[3]).toBe(10);
    expect(exp.at(-2)).toBe(38);
  });

  it("la expresion de anomalia resta la media", () => {
    const exp = expresionColor("anomalia", 2024, [-2, 2]);
    expect(exp[2]).toEqual(["-", ["get", "t2024"], ["get", "media"]]);
  });
});

describe("cuadricula", () => {
  it("dibuja meridianos y paralelos dentro de la extension", () => {
    const ext = extensionGrilla(grilla);
    expect(ext).toEqual([-70, -36, -60, -26]);
    const { lineas, etiquetas } = cuadricula(ext, 2);
    expect(lineas.features).toHaveLength(6 + 6);
    expect(etiquetas.features.map((e) => e.properties.texto)).toContain("64° O");
    expect(etiquetas.features.map((e) => e.properties.texto)).toContain("30° S");
    expect(etiquetas.features.map((e) => e.properties.texto)).not.toContain("70° O");
    expect(etiquetas.features.map((e) => e.properties.texto)).not.toContain("36° S");
  });
});

describe("formato", () => {
  it("usa coma decimal y signo tipografico", () => {
    expect(fmt(27.345, 1)).toBe("27,3");
    expect(fmt(-1.5, 1)).toBe("−1,5");
    expect(fmtSigno(0.42, 1)).toBe("+0,4");
    expect(fmtSigno(-0.42, 1)).toBe("−0,4");
    expect(fmtSigno(0.01, 1)).toBe("0,0");
  });
});
