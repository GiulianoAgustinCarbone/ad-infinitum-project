"use client";

import { CENIZA, FUEGO } from "@/lib/focos/escala";
import type { Resumen, TendenciaResumen } from "@/lib/focos/tipos";
import { entero } from "@/lib/formato";
import { rotuloEje, pasoEje, type Textos } from "@/lib/focos/modo";
import { useGlobo } from "./Globo";
import { useAncho } from "./useAncho";
import estilos from "./Graficos.module.css";

const AL = 300;
const M = { arriba: 20, derecha: 16, abajo: 30, izquierda: 48 };

type Props = { anual: Resumen["aqua"]["anual"]; tendencia: TendenciaResumen; t: Textos };

export function SerieAnual({ anual, tendencia, t }: Props) {
  const { globo, mostrar, ocultar } = useGlobo();
  const { ref, ancho: AN } = useAncho<HTMLDivElement>(720);
  const a0 = anual[0].anio;
  const a1 = anual[anual.length - 1].anio;
  const max = Math.max(...anual.map((d) => d.total));
  const pasoY = pasoEje(max);
  const tope = Math.ceil(max / pasoY) * pasoY;
  const ancho = AN - M.izquierda - M.derecha;
  const alto = AL - M.arriba - M.abajo;
  const x = (a: number) => M.izquierda + ((a - a0) / (a1 - a0)) * ancho;
  const y = (v: number) => M.arriba + alto - (Math.max(0, v) / tope) * alto;
  // Recta de Sen: la misma pendiente que se informa como cambio por decada
  const recta = (a: number) => tendencia.ordenadaSen + tendencia.senAnual * a;
  const linea = anual.map((d, i) => `${i ? "L" : "M"}${x(d.anio)},${y(d.total)}`).join(" ");

  return (
    <div ref={ref} className={estilos.lienzo} onMouseLeave={ocultar}>
      <svg className={estilos.svg} viewBox={`0 0 ${AN} ${AL}`} role="group" aria-label={`${t.eje}, de ${a0} a ${a1}, con recta de tendencia`}>
        {Array.from({ length: tope / pasoY + 1 }, (_, i) => i * pasoY).map((t) => (
          <g key={t}>
            <line className={estilos.grilla} x1={M.izquierda} x2={AN - M.derecha} y1={y(t)} y2={y(t)} />
            <text className={estilos.eje} x={M.izquierda - 8} y={y(t) + 4} textAnchor="end">
              {rotuloEje(t)}
            </text>
          </g>
        ))}
        {anual
          .filter((d) => d.anio % 4 === a0 % 4 || d.anio === a1)
          .map((d) => (
            <text key={d.anio} className={estilos.eje} x={x(d.anio)} y={AL - 8} textAnchor="middle">
              {d.anio}
            </text>
          ))}
        <path d={linea} fill="none" stroke="#b8c0c8" strokeWidth="2" strokeLinejoin="round" />
        <line
          x1={x(a0)}
          y1={y(recta(a0))}
          x2={x(a1)}
          y2={y(recta(a1))}
          stroke={FUEGO[3]}
          strokeWidth="2.5"
          strokeDasharray="7 5"
        />
        {anual.map((d) => {
          const leer = () =>
            mostrar({
              x: (x(d.anio) / AN) * 100,
              y: (y(d.total) / AL) * 100,
              contenido: (
                <>
                  <strong>{d.anio}</strong>
                  {entero(d.total)} {t.unidadSerie}
                  {d.mesesSinDato > 0 && (
                    <>
                      <br />
                      Incluye {d.mesesSinDato} {d.mesesSinDato === 1 ? "mes" : "meses"} sin dato
                    </>
                  )}
                </>
              ),
            });
          return (
            <g
              key={d.anio}
              className={estilos.marca}
              tabIndex={0}
              onMouseEnter={leer}
              onFocus={leer}
              onBlur={ocultar}
              aria-label={`${d.anio}: ${entero(d.total)} ${t.unidadSerie}${d.mesesSinDato ? `, con ${d.mesesSinDato} meses sin dato` : ""}`}
            >
              <rect x={x(d.anio) - ancho / (a1 - a0) / 2} y={M.arriba} width={ancho / (a1 - a0)} height={alto} fill="transparent" />
              <circle
                className={estilos.resalte}
                cx={x(d.anio)}
                cy={y(d.total)}
                r="5"
                fill={d.mesesSinDato ? "#13202d" : CENIZA}
                stroke={CENIZA}
                strokeWidth="2"
              />
            </g>
          );
        })}
      </svg>
      {globo}
    </div>
  );
}
