"use client";

import { CENIZA, FUEGO } from "@/lib/focos/escala";
import type { Resumen, TendenciaResumen } from "@/lib/focos/tipos";
import { entero } from "@/lib/formato";
import { useGlobo } from "./Globo";
import { useAncho } from "./useAncho";
import estilos from "./Graficos.module.css";

const AL = 300;
const M = { arriba: 20, derecha: 16, abajo: 30, izquierda: 48 };
const ANIOS_PROYECCION = 10;

type Props = { anual: Resumen["aqua"]["anual"]; tendencia: TendenciaResumen; escenarioAbierto?: boolean; onAlternarEscenario?: () => void };

export function SerieAnual({ anual, tendencia, escenarioAbierto = false, onAlternarEscenario }: Props) {
  const { globo, mostrar, ocultar } = useGlobo();
  const { ref, ancho: AN } = useAncho<HTMLDivElement>(720);
  if (anual.length === 0) return <p className="nota">Sin datos anuales para proyectar.</p>;
  const a0 = anual[0].anio;
  const a1 = anual[anual.length - 1].anio;
  const fin = a1 + ANIOS_PROYECCION;
  // El escenario usa el ajuste existente sin agregar observaciones al analisis.
  const recta = (a: number) => tendencia.ordenadaSen + tendencia.senAnual * a;
  const proyecciones = Array.from({ length: ANIOS_PROYECCION }, (_, i) => ({
    anio: a1 + i + 1,
    total: Math.max(0, recta(a1 + i + 1)),
  }));
  const max = Math.max(...anual.map((d) => d.total), recta(a0), recta(a1), recta(fin));
  const tope = Math.max(500, Math.ceil(max / 500) * 500);
  const ancho = AN - M.izquierda - M.derecha;
  const alto = AL - M.arriba - M.abajo;
  const x = (a: number) => M.izquierda + ((a - a0) / (fin - a0)) * ancho;
  const y = (v: number) => M.arriba + alto - (Math.max(0, v) / tope) * alto;
  // Incluye el cruce por cero para no dibujar cantidades negativas de focos.
  const trayectoria = (desde: number, hasta: number) => {
    const cruce = -tendencia.ordenadaSen / tendencia.senAnual;
    const puntos = cruce > desde && cruce < hasta ? [desde, cruce, hasta] : [desde, hasta];
    return puntos.map((a, i) => `${i ? "L" : "M"}${x(a)},${y(recta(a))}`).join(" ");
  };
  const linea = anual.map((d, i) => `${i ? "L" : "M"}${x(d.anio)},${y(d.total)}`).join(" ");
  const pasoY = tope > 2000 ? 500 : 250;
  const pasoX = Math.max(4, Math.ceil((fin - a0) / 6));
  const etiquetas = [...anual.filter((d) => (d.anio - a0) % pasoX === 0 && a1 - d.anio >= 2).map((d) => d.anio), a1,
    ...proyecciones.filter((d) => (d.anio - a1) % 5 === 0).map((d) => d.anio)];

  return (
    <div>
    <div ref={ref} className={estilos.lienzo} onMouseLeave={ocultar}>
      <svg className={estilos.svg} viewBox={`0 0 ${AN} ${AL}`} role="group" aria-label={`Focos observados de ${a0} a ${a1}, con extrapolación de tendencia hasta ${fin}`}>
        <rect x={x(a1)} y={M.arriba} width={x(fin) - x(a1)} height={alto} fill={FUEGO[3]} opacity="0.08" />
        {Array.from({ length: tope / pasoY + 1 }, (_, i) => i * pasoY).map((t) => (
          <g key={t}>
            <line className={estilos.grilla} x1={M.izquierda} x2={AN - M.derecha} y1={y(t)} y2={y(t)} />
            <text className={estilos.eje} x={M.izquierda - 8} y={y(t) + 4} textAnchor="end">{entero(t)}</text>
          </g>
        ))}
        {etiquetas.map((anio) => (
          <text key={anio} className={estilos.eje} x={x(anio)} y={AL - 8} textAnchor="middle">{anio}</text>
        ))}
        <path d={linea} fill="none" stroke="#b8c0c8" strokeWidth="2" strokeLinejoin="round" />
        <path d={trayectoria(a0, a1)} fill="none" stroke={FUEGO[3]} strokeWidth="2.5" strokeDasharray="7 5" />
        <line x1={x(a1)} x2={x(a1)} y1={M.arriba} y2={y(0)} stroke={FUEGO[3]} strokeDasharray="3 5" opacity="0.5" />
        <path d={trayectoria(a1, fin)} fill="none" stroke={FUEGO[3]} strokeWidth="2.5" strokeDasharray="2 5" />
        {proyecciones.map((d) => {
          const texto = `${d.anio}: aproximadamente ${entero(Math.round(d.total))} focos si continúa la tendencia histórica`;
          const leer = () => mostrar({
            x: (x(d.anio) / AN) * 100,
            y: (y(d.total) / AL) * 100,
            contenido: <><strong>{d.anio} · Extrapolación</strong>≈ {entero(Math.round(d.total))} focos<br />Si continúa la tendencia histórica.</>,
          });
          return (
            <g key={d.anio} className={estilos.marca} tabIndex={0} onMouseEnter={leer} onFocus={leer} onBlur={ocultar} aria-label={texto}>
              <rect x={x(d.anio) - 10} y={M.arriba} width="20" height={alto} fill="transparent" />
              <path className={estilos.resalte} d={`M${x(d.anio)},${y(d.total) - 5}l5,5 -5,5 -5,-5Z`} fill="#13202d" stroke={FUEGO[3]} strokeWidth="2" />
            </g>
          );
        })}
        {anual.map((d) => {
          const leer = () => mostrar({
            x: (x(d.anio) / AN) * 100,
            y: (y(d.total) / AL) * 100,
            contenido: (
              <>
                <strong>{d.anio}</strong>
                {entero(d.total)} focos
                {d.mesesSinDato > 0 && <><br />Incluye {d.mesesSinDato} {d.mesesSinDato === 1 ? "mes" : "meses"} sin dato</>}
              </>
            ),
          });
          return (
            <g key={d.anio} className={estilos.marca} tabIndex={0} onMouseEnter={leer} onFocus={leer} onBlur={ocultar}
              aria-label={`${d.anio}: ${entero(d.total)} focos${d.mesesSinDato ? `, con ${d.mesesSinDato} meses sin dato` : ""}`}>
              <rect x={x(d.anio) - ancho / (fin - a0) / 2} y={M.arriba} width={ancho / (fin - a0)} height={alto} fill="transparent" />
              <circle className={estilos.resalte} cx={x(d.anio)} cy={y(d.total)} r="5" fill={d.mesesSinDato ? "#13202d" : CENIZA} stroke={CENIZA} strokeWidth="2" />
            </g>
          );
        })}
      </svg>
      {globo}
    </div>
      <p className="nota">
        <span style={{ color: FUEGO[3] }}>◇ Extrapolación {a1 + 1}–{fin} (zona sombreada).</span>{" "}
        Extiende la pendiente de Sen del período observado; no son datos medidos ni un pronóstico validado.
        {proyecciones.some((d) => recta(d.anio) < 0) && " Los valores negativos se muestran como cero."}
        {!tendencia.significativa && " La tendencia histórica no es estadísticamente concluyente."}
      </p>
      <div className={estilos.accionesTendencia}>
      <details className={`${estilos.tabla} ${estilos.tablaExtrapolada}`}>
        <summary>Ver valores extrapolados</summary>
        <div className={estilos.tablaScroll}>
          <table>
            <caption>Escenario si continúa la tendencia histórica</caption>
            <thead><tr><th scope="col">Año</th><th scope="col">Focos aproximados</th></tr></thead>
            <tbody>{proyecciones.map((d) => <tr key={d.anio}><th scope="row">{d.anio}</th><td>{entero(Math.round(d.total))}</td></tr>)}</tbody>
          </table>
        </div>
      </details>
      <button
        type="button"
        className={estilos.botonEscenario}
        aria-expanded={escenarioAbierto}
        aria-controls="demo-escenario-futuro"
        onClick={onAlternarEscenario}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7" />
        </svg>
        {escenarioAbierto ? "Cerrar escenario futuro" : "Ver escenario futuro"}
      </button>
      </div>
    </div>
  );
}
