import { ANIOS } from "@/lib/data";
import type { Bandas, Escala } from "./bandas";
import type { MensajeEntrada, MensajeSalida } from "./bandas.worker";
import type { Rejilla, VistaCampo } from "./rejilla";

const clave = (vista: VistaCampo, indice: number) => `${vista}:${indice}`;

export type CrearWorker = () => Worker;

// Cola de calculo de bandas sobre un Web Worker. Atiende primero el anio
// pedido y despues, en segundo plano, el resto de los anios de la misma vista,
// del mas cercano al mas lejano. Cada resultado queda en cache.
export class CalculadorBandas {
  version = 0;
  error: string | null = null;
  private worker: Worker | null = null;
  private cache = new Map<string, Bandas>();
  private cola: string[] = [];
  private enCurso: string | null = null;
  private oyentes = new Set<() => void>();

  constructor(
    private rejilla: Rejilla,
    private escalas: Record<VistaCampo, Escala>,
    private crearWorker: CrearWorker,
  ) {}

  suscribir = (oyente: () => void) => {
    this.oyentes.add(oyente);
    return () => {
      this.oyentes.delete(oyente);
    };
  };

  leerVersion = () => this.version;

  obtener(vista: VistaCampo, indice: number): Bandas | null {
    return this.cache.get(clave(vista, indice)) ?? null;
  }

  // Mientras se calcula un anio se muestra el anio cacheado mas cercano
  obtenerCercano(vista: VistaCampo, indice: number): Bandas | null {
    for (let d = 0; d < ANIOS.length; d++) {
      const bandas = this.obtener(vista, indice - d) ?? this.obtener(vista, indice + d);
      if (bandas) return bandas;
    }
    return null;
  }

  priorizar(vista: VistaCampo, indice: number) {
    const resto = ANIOS.map((_, i) => i)
      .filter((i) => i !== indice)
      .sort((a, b) => Math.abs(a - indice) - Math.abs(b - indice));
    this.cola = [indice, ...resto].map((i) => clave(vista, i)).filter((k) => !this.cache.has(k));
    this.siguiente();
  }

  cerrar() {
    this.worker?.terminate();
    this.worker = null;
    this.enCurso = null;
  }

  private avisar() {
    this.version++;
    for (const oyente of this.oyentes) oyente();
  }

  private iniciarWorker(): Worker {
    const w = this.crearWorker();
    w.onmessage = (evento: MessageEvent<MensajeSalida>) => {
      const m = evento.data;
      this.enCurso = null;
      if (m.tipo === "bandas") {
        this.cache.set(clave(m.vista, m.indice), m.bandas);
        this.error = null;
      } else {
        this.error = m.mensaje;
      }
      this.avisar();
      this.siguiente();
    };
    w.onerror = (evento) => {
      this.enCurso = null;
      this.error = evento.message || "No se pudo iniciar el cálculo del mapa";
      this.avisar();
    };
    w.postMessage({ tipo: "iniciar", rejilla: this.rejilla, escalas: this.escalas } satisfies MensajeEntrada);
    return w;
  }

  private siguiente() {
    if (this.enCurso) return;
    const k = this.cola.find((c) => !this.cache.has(c));
    if (!k) return;
    this.cola = this.cola.filter((c) => c !== k);
    this.worker ??= this.iniciarWorker();
    const [vista, indice] = k.split(":");
    this.enCurso = k;
    this.worker.postMessage({ tipo: "calcular", vista: vista as VistaCampo, indice: Number(indice) } satisfies MensajeEntrada);
  }
}
