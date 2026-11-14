import { describe, expect, it } from "vitest";
import { ANIOS } from "@/lib/data";
import { ESCALA_ANOMALIA } from "./bandas";
import type { MensajeEntrada, MensajeSalida } from "./bandas.worker";
import { CalculadorBandas } from "./calculador";
import type { Rejilla } from "./rejilla";

// Worker falso: registra los pedidos y responde cuando la prueba lo indica
class WorkerFalso {
  pedidos: MensajeEntrada[] = [];
  onmessage: ((e: MessageEvent<MensajeSalida>) => void) | null = null;
  onerror: ((e: ErrorEvent) => void) | null = null;
  terminado = false;
  postMessage(m: MensajeEntrada) {
    this.pedidos.push(m);
  }
  terminate() {
    this.terminado = true;
  }
  responder() {
    const ultimo = this.pedidos.at(-1);
    if (ultimo?.tipo !== "calcular") throw new Error("No hay calculo pendiente");
    this.onmessage!({
      data: { tipo: "bandas", vista: ultimo.vista, indice: ultimo.indice, bandas: { type: "FeatureCollection", features: [] } },
    } as unknown as MessageEvent<MensajeSalida>);
  }
  calculos() {
    return this.pedidos.filter((p) => p.tipo === "calcular").map((p) => (p.tipo === "calcular" ? p.indice : -1));
  }
}

const rejilla: Rejilla = { lons: [0, 1], lats: [0, 1], porAnio: [], media: new Float32Array(4) };
const escalas = { temperatura: ESCALA_ANOMALIA, anomalia: ESCALA_ANOMALIA };

function preparar() {
  const workers: WorkerFalso[] = [];
  const calc = new CalculadorBandas(rejilla, escalas, () => {
    const w = new WorkerFalso();
    workers.push(w);
    return w as unknown as Worker;
  });
  return { calc, workers };
}

describe("CalculadorBandas", () => {
  it("calcula primero el anio pedido y despues los mas cercanos", () => {
    const { calc, workers } = preparar();
    calc.priorizar("anomalia", 10);
    expect(workers[0].pedidos[0].tipo).toBe("iniciar");
    expect(workers[0].calculos()).toEqual([10]);
    workers[0].responder();
    workers[0].responder();
    expect(workers[0].calculos()).toEqual([10, 9, 11]);
  });

  it("guarda en cache y no vuelve a pedir un anio calculado", () => {
    const { calc, workers } = preparar();
    calc.priorizar("anomalia", 0);
    for (let i = 0; i < ANIOS.length; i++) workers[0].responder();
    const pedidos = workers[0].calculos().length;
    expect(pedidos).toBe(ANIOS.length);
    calc.priorizar("anomalia", 5);
    expect(calc.obtener("anomalia", 5)).not.toBeNull();
    expect(workers[0].calculos()).toHaveLength(pedidos);
  });

  it("muestra el anio cacheado mas cercano mientras calcula", () => {
    const { calc, workers } = preparar();
    calc.priorizar("temperatura", 3);
    workers[0].responder();
    calc.priorizar("temperatura", 15);
    expect(calc.obtener("temperatura", 15)).toBeNull();
    expect(calc.obtenerCercano("temperatura", 15)).not.toBeNull();
    expect(calc.obtenerCercano("anomalia", 15)).toBeNull();
  });

  it("avisa a los suscriptores en cada resultado y se recupera tras cerrar", () => {
    const { calc, workers } = preparar();
    let avisos = 0;
    calc.suscribir(() => avisos++);
    calc.priorizar("anomalia", 0);
    workers[0].responder();
    expect(avisos).toBe(1);
    calc.cerrar();
    expect(workers[0].terminado).toBe(true);
    calc.priorizar("anomalia", 0);
    expect(workers).toHaveLength(2);
    expect(workers[1].calculos()).toEqual([1]);
  });
});
