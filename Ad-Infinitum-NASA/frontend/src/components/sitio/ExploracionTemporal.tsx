"use client";

import { useEffect, useRef, useState } from "react";
import { ExploradorEnlazado } from "@/components/explorador/ExploradorEnlazado";
import type { Modo } from "@/lib/focos/modo";
import { DemoEscenario } from "./DemoEscenario";
import estilos from "./ExploracionTemporal.module.css";

type Props = { desde: number; hasta: number; modo: Modo; nota: string };

export function ExploracionTemporal({ desde, hasta, modo, nota }: Props) {
  const [futuro, setFuturo] = useState(false);
  const [espacio, setEspacio] = useState(80);
  const tarjeta = useRef<HTMLDivElement>(null);
  const mostrarFuturo = futuro;

  useEffect(() => {
    const elemento = tarjeta.current;
    if (!elemento) return;
    const medir = () => setEspacio(Math.ceil(elemento.getBoundingClientRect().height) + 20);
    const observador = new ResizeObserver(medir);
    observador.observe(elemento);
    medir();
    return () => observador.disconnect();
  }, [mostrarFuturo]);

  const selector = (
    <div ref={tarjeta} className={estilos.tarjeta}>
      <div className={estilos.opciones} role="group" aria-label="Período de exploración">
        <button type="button" title={`Datos registrados de ${desde} a ${hasta}`} aria-pressed={!mostrarFuturo} onClick={() => setFuturo(false)}>
          Histórico
        </button>
          <button type="button" title="Escenario simulado para los próximos diez años" aria-pressed={mostrarFuturo} onClick={() => setFuturo(true)}>
            Futuro
          </button>
      </div>
    </div>
  );

  return (
    <section id="explorar" className="seccion seccion-alterna" aria-labelledby="titulo-explorar">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <h2 id="titulo-explorar">{mostrarFuturo ? "¿Qué nos dicen los datos sobre el futuro?" : "Explorá dónde y cuándo aparecen"}</h2>
          <p>{mostrarFuturo
            ? (modo === "incendios"
              ? "Explorá un escenario mensual construido con detecciones históricas asociadas a áreas quemadas. Los puntos son simulados, no incendios futuros confirmados ni eventos individuales."
              : "Explorá una posible evolución mensual de los focos de calor en San Luis durante diez años. Las ubicaciones son simuladas, no incendios futuros confirmados.")
            : "Explorá las detecciones registradas: elegí un año y un mes, filtrá por departamento o reproducí el registro mes a mes."}</p>
        </div>
        {mostrarFuturo ? (
          <div className={estilos.futuro}>
            <div className={estilos.selectorFuturo}>{selector}</div>
            <DemoEscenario key={modo} modo={modo} integrado espacioControles={espacio} />
          </div>
        ) : (
          <>
            <p className={`nota ${estilos.nota}`}>{nota}</p>
            <ExploradorEnlazado desde={desde} hasta={hasta} modo={modo} panelInicio={selector} />
          </>
        )}
      </div>
    </section>
  );
}
