// Calcula las bandas de un anio fuera del hilo principal: refina la grilla,
// arma las isobandas y las recorta por el contorno de Argentina

import type { Feature, MultiPolygon } from "geojson";
import argentina from "@/lib/geo/argentina.json";
import { calcularBandas, type Bandas, type Escala } from "./bandas";
import { campoDe, refinar, type Rejilla, type VistaCampo } from "./rejilla";

// 0,5 grados de la grilla pasan a 0,125 grados
const FACTOR_REFINADO = 4;

export type MensajeEntrada =
  | { tipo: "iniciar"; rejilla: Rejilla; escalas: Record<VistaCampo, Escala> }
  | { tipo: "calcular"; vista: VistaCampo; indice: number };

export type MensajeSalida =
  | { tipo: "bandas"; vista: VistaCampo; indice: number; bandas: Bandas }
  | { tipo: "error"; vista: VistaCampo; indice: number; mensaje: string };

const contorno = argentina as Feature<MultiPolygon>;
let rejilla: Rejilla | null = null;
let escalas: Record<VistaCampo, Escala> | null = null;

self.onmessage = (evento: MessageEvent<MensajeEntrada>) => {
  const m = evento.data;
  if (m.tipo === "iniciar") {
    rejilla = m.rejilla;
    escalas = m.escalas;
    return;
  }
  if (!rejilla || !escalas) return;
  try {
    const fino = refinar(campoDe(rejilla, m.vista, m.indice), FACTOR_REFINADO);
    const bandas = calcularBandas(fino, escalas[m.vista], contorno);
    self.postMessage({ tipo: "bandas", vista: m.vista, indice: m.indice, bandas } satisfies MensajeSalida);
  } catch (e) {
    self.postMessage({
      tipo: "error",
      vista: m.vista,
      indice: m.indice,
      mensaje: e instanceof Error ? e.message : String(e),
    } satisfies MensajeSalida);
  }
};
