import type { Feature, MultiPolygon } from "geojson";
import { describe, expect, it } from "vitest";
import { ANIOS, claveAnio, type Grilla, type PropiedadesCelda } from "@/lib/data";
import { generarGrillaMock } from "@/lib/data/mock";
import argentina from "@/lib/geo/argentina.json";
import provincias from "@/lib/geo/provincias.json";
import { fmt, fmtSigno } from "@/lib/formato";
import {
  ESCALA_ANOMALIA,
  calcularBandas,
  claseDe,
  dentroDe,
  escalaTemperatura,
  muestrearPaleta,
} from "./bandas";
import { campoDe, refinar, rejillaDesdeGrilla, valorBilineal, type Campo } from "./rejilla";

const contorno = argentina as Feature<MultiPolygon>;

function grillaDe(valor: (lon: number, lat: number) => number, faltante?: [number, number]): Grilla {
  const features: Grilla["features"] = [];
  for (let lat = -3; lat < 0; lat++) {
    for (let lon = 0; lon < 4; lon++) {
      if (faltante && faltante[0] === lon && faltante[1] === lat) continue;
      const props = {} as PropiedadesCelda;
      for (const anio of ANIOS) props[claveAnio(anio)] = valor(lon + 0.5, lat + 0.5) + (anio - 2005);
      features.push({
        type: "Feature",
        properties: props,
        geometry: { type: "Polygon", coordinates: [[[lon, lat + 1], [lon + 1, lat + 1], [lon + 1, lat], [lon, lat], [lon, lat + 1]]] },
      });
    }
  }
  return { type: "FeatureCollection", features };
}

describe("rejilla", () => {
  const plano = (lon: number, lat: number) => 2 * lon + lat;

  it("ordena las celdas en una matriz regular", () => {
    const r = rejillaDesdeGrilla(grillaDe(plano));
    expect(r.lons).toEqual([0.5, 1.5, 2.5, 3.5]);
    expect(r.lats).toEqual([-2.5, -1.5, -0.5]);
    expect(r.porAnio).toHaveLength(ANIOS.length);
    expect(r.porAnio[0][0]).toBe(plano(0.5, -2.5));
  });

  it("rellena celdas faltantes con sus vecinas", () => {
    const r = rejillaDesdeGrilla(grillaDe(plano, [1, -2]));
    expect(Number.isNaN(r.porAnio[0][1 * 4 + 1])).toBe(false);
  });

  it("la anomalia es la diferencia contra la media de la celda", () => {
    const r = rejillaDesdeGrilla(grillaDe(plano));
    const a = campoDe(r, "anomalia", 0).valores;
    // Los valores suben 1 C por anio: el primer anio queda 9,5 C bajo la media
    expect(a[0]).toBeCloseTo(-9.5, 5);
  });

  it("la interpolacion bilineal reproduce un plano exactamente", () => {
    const campo = campoDe(rejillaDesdeGrilla(grillaDe(plano)), "temperatura", 0);
    expect(valorBilineal(campo, 1.2, -1.1)).toBeCloseTo(plano(1.2, -1.1), 5);
    expect(Number.isNaN(valorBilineal(campo, 10, -1))).toBe(true);
    const fino = refinar(campo, 4);
    expect(fino.lons).toHaveLength(13);
    expect(fino.lats).toHaveLength(9);
    expect(fino.valores[5 * 13 + 7]).toBeCloseTo(plano(fino.lons[7], fino.lats[5]), 5);
  });
});

describe("escalas discretas", () => {
  it("la escala de anomalia usa los cortes del SMN con una clase neutra central", () => {
    expect(ESCALA_ANOMALIA.cortes).toEqual([-1.5, -1.0, -0.8, -0.6, -0.4, -0.2, 0.2, 0.4, 0.6, 0.8, 1.0, 1.5]);
    expect(ESCALA_ANOMALIA.colores).toHaveLength(13);
    expect(ESCALA_ANOMALIA.colores[claseDe(ESCALA_ANOMALIA, 0)]).toBe("#FFFFFF");
    expect(claseDe(ESCALA_ANOMALIA, -2)).toBe(0);
    expect(claseDe(ESCALA_ANOMALIA, 0.2)).toBe(7);
    expect(claseDe(ESCALA_ANOMALIA, 9)).toBe(12);
  });

  it("la escala de temperatura corta cada 2 C dentro del rango", () => {
    const e = escalaTemperatura([-5.3, 29.1]);
    expect(e.cortes[0]).toBe(-4);
    expect(e.cortes.at(-1)).toBe(28);
    expect(e.cortes.every((c, i) => i === 0 || c - e.cortes[i - 1] === 2)).toBe(true);
    expect(e.colores).toHaveLength(e.cortes.length + 1);
  });

  it("muestrea la paleta de extremo a extremo", () => {
    expect(muestrearPaleta(["#000000", "#FFFFFF"], 3)).toEqual(["#000000", "#808080", "#FFFFFF"]);
  });
});

describe("bandas", () => {
  const campo: Campo = (() => {
    const r = rejillaDesdeGrilla(generarGrillaMock());
    return refinar(campoDe(r, "anomalia", ANIOS.length - 1), 2);
  })();
  const bandas = calcularBandas(campo, ESCALA_ANOMALIA, contorno);

  it("genera bandas con la clase y el color de la escala", () => {
    expect(bandas.features.length).toBeGreaterThan(2);
    for (const b of bandas.features) {
      expect(b.properties.color).toBe(ESCALA_ANOMALIA.colores[b.properties.clase]);
    }
  });

  it("recorta las bandas por el contorno de Argentina", () => {
    for (const b of bandas.features) {
      const coords = JSON.stringify(b.geometry.coordinates).match(/-?\d+\.?\d*/g)!.map(Number);
      const lons = coords.filter((_, i) => i % 2 === 0);
      expect(Math.min(...lons)).toBeGreaterThanOrEqual(-73.6);
      expect(Math.max(...lons)).toBeLessThanOrEqual(-53.6);
    }
  });
});

describe("limites", () => {
  it("incluye las 24 jurisdicciones y las Islas Malvinas", () => {
    expect(provincias.features).toHaveLength(24);
    expect(dentroDe(contorno, -59, -51.7)).toBe(true);
  });

  it("distingue puntos dentro y fuera de Argentina", () => {
    expect(dentroDe(contorno, -64.2, -31.4)).toBe(true);
    expect(dentroDe(contorno, -71, -33.4)).toBe(false);
    expect(dentroDe(contorno, -56, -34.9)).toBe(false);
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
