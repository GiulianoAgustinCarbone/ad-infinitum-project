import { describe, expect, it } from "vitest";
import { ajusteLineal, analizarTendencia, mannKendall, pendienteSen, phi } from "./estadistica";

describe("phi", () => {
  it("devuelve 0,5 en cero y es simetrica", () => {
    expect(phi(0)).toBeCloseTo(0.5, 6);
    expect(phi(1.96)).toBeCloseTo(0.975, 3);
    expect(phi(-1.96) + phi(1.96)).toBeCloseTo(1, 6);
  });
});

describe("ajusteLineal", () => {
  it("recupera una recta exacta", () => {
    const xs = [2000, 2001, 2002, 2003];
    const ys = xs.map((x) => 3 * x - 10);
    const a = ajusteLineal(xs, ys);
    expect(a.pendiente).toBeCloseTo(3, 9);
    expect(a.ordenada).toBeCloseTo(-10, 6);
  });

  it("rechaza menos de dos puntos", () => {
    expect(() => ajusteLineal([1], [1])).toThrow();
  });
});

describe("mannKendall", () => {
  it("serie creciente estricta: S maximo y p pequeno", () => {
    const ys = Array.from({ length: 20 }, (_, i) => i);
    const mk = mannKendall(ys);
    expect(mk.S).toBe((20 * 19) / 2);
    expect(mk.p).toBeLessThan(0.001);
  });

  it("serie constante: S = 0 y p = 1", () => {
    const mk = mannKendall([5, 5, 5, 5, 5]);
    expect(mk.S).toBe(0);
    expect(mk.p).toBeCloseTo(1, 6);
  });

  it("corrige la varianza por empates", () => {
    // n = 6 sin empates: 6*5*17/18. Con un grupo de 2 empates se resta 2*1*9/18
    const sin = mannKendall([1, 2, 3, 4, 5, 6]);
    const con = mannKendall([1, 2, 2, 4, 5, 6]);
    expect(sin.varianza).toBeCloseTo((6 * 5 * 17) / 18, 9);
    expect(con.varianza).toBeCloseTo((6 * 5 * 17 - 2 * 1 * 9) / 18, 9);
  });

  it("valor conocido: S = 8 en 6 datos", () => {
    // ys = [3,1,4,1,5,9]: aportes por fila 1 + 3 + 1 + 2 + 1 -> S = 8
    const mk = mannKendall([3, 1, 4, 1, 5, 9]);
    expect(mk.S).toBe(8);
  });
});

describe("pendienteSen", () => {
  it("ignora un valor extremo", () => {
    const xs = [1, 2, 3, 4, 5, 6, 7];
    const ys = [1, 2, 3, 400, 5, 6, 7];
    expect(pendienteSen(xs, ys)).toBeCloseTo(1, 9);
  });
});

describe("analizarTendencia", () => {
  it("marca significativa solo con p < 0,05", () => {
    const xs = Array.from({ length: 21 }, (_, i) => 2003 + i);
    const sube = analizarTendencia(xs, xs.map((x) => x - 2000));
    expect(sube.significativa).toBe(true);
    const ruido = analizarTendencia(xs, [5, 1, 4, 2, 5, 1, 4, 2, 5, 1, 4, 2, 5, 1, 4, 2, 5, 1, 4, 2, 5]);
    expect(ruido.significativa).toBe(false);
  });
});

describe("ordenadaSen", () => {
  it("la recta de Sen pasa por una serie exacta", () => {
    const xs = [2000, 2001, 2002, 2003, 2004];
    const t = analizarTendencia(xs, xs.map((x) => 2 * x - 3990));
    expect(t.senAnual).toBeCloseTo(2, 9);
    expect(t.ordenadaSen + t.senAnual * 2002).toBeCloseTo(14, 6);
  });
});
