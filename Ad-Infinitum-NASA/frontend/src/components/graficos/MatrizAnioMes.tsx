"use client";

import { CLASES_CONTEO, CERO, colorConteo } from "@/lib/focos/escala";
import { CLASES_HA, colorHectareas, type Modo, type Textos } from "@/lib/focos/modo";
import type { CeldaMatriz } from "@/lib/focos/tipos";
import { capitalizar, entero, MESES_CORTOS, mesAnio } from "@/lib/formato";
import { useGlobo } from "./Globo";
import estilos from "./Graficos.module.css";

export function MatrizAnioMes({ matriz, t, modo }: { matriz: CeldaMatriz[]; t: Textos; modo: Modo }) {
  const clases: readonly { etiqueta: string; color: string }[] = modo === "incendios" ? CLASES_HA : CLASES_CONTEO;
  const color = modo === "incendios" ? colorHectareas : colorConteo;
  const { globo, mostrar, ocultar } = useGlobo();
  const anios = [...new Set(matriz.map((c) => c.anio))];
  const filas = anios.length;
  const sinDato = matriz.filter((c) => c.estado === "sin-dato");

  return (
    <figure className={estilos.figura}>
      <figcaption>
        <p className={estilos.titulo}>Cada año, mes por mes</p>
        <p className={estilos.subtitulo}>
          {t.subtituloMatriz}
        </p>
      </figcaption>
      <div className={estilos.lienzo} onMouseLeave={ocultar}>
        <div className={estilos.matriz} role="img" aria-label={modo === "incendios" ? "Matriz de hectáreas quemadas por año y mes. La tabla equivalente está debajo." : "Matriz de focos por año y mes. La tabla equivalente está debajo."}>
          <span />
          {MESES_CORTOS.map((m) => (
            <span key={m} className={estilos.encabezado}>
              {m}
            </span>
          ))}
          {anios.map((a, fila) => (
            <Fila key={a} anio={a} fila={fila} filas={filas} celdas={matriz.filter((c) => c.anio === a)} mostrar={mostrar} color={color} unidad={t.unidadSerie} />
          ))}
        </div>
        {globo}
      </div>
      <ul className={estilos.leyenda}>
        <li>
          <span className={estilos.muestra} style={{ background: CERO }} />
          {modo === "incendios" ? "sin área quemada" : "sin focos"}
        </li>
        {clases.map((c) => (
          <li key={c.etiqueta}>
            <span className={estilos.muestra} style={{ background: c.color }} />
            {c.etiqueta}
          </li>
        ))}
        <li>
          <span className={`${estilos.muestra} ${estilos.sinDato}`} />
          sin dato ({sinDato.length} meses)
        </li>
        <li>
          <span className={`${estilos.muestra} ${estilos.fuera}`} />
          fuera del registro
        </li>
      </ul>
      <details className={estilos.tabla}>
        <summary>Ver como tabla</summary>
        <div className={estilos.tablaScroll}>
          <table>
            <caption className="sr-only">{modo === "incendios" ? "Hectáreas quemadas por año y mes" : "Focos por año y mes, satélite Aqua"}</caption>
            <thead>
              <tr>
                <th scope="col">Año</th>
                {MESES_CORTOS.map((m) => (
                  <th key={m} scope="col">
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {anios.map((a) => (
                <tr key={a}>
                  <th scope="row">{a}</th>
                  {matriz
                    .filter((c) => c.anio === a)
                    .map((c) => (
                      <td key={c.mes}>{c.estado === "dato" ? c.valor : c.estado === "sin-dato" ? "s/d" : "—"}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}

type FilaProps = {
  anio: number;
  fila: number;
  filas: number;
  celdas: CeldaMatriz[];
  mostrar: ReturnType<typeof useGlobo>["mostrar"];
  color: (v: number) => string;
  unidad: string;
};

function Fila({ anio, fila, filas, celdas, mostrar, color, unidad }: FilaProps) {
  return (
    <>
      <span className={estilos.anio}>{anio}</span>
      {celdas.map((c) => {
        const clase =
          c.estado === "sin-dato" ? `${estilos.celda} ${estilos.sinDato}` : c.estado === "fuera" ? `${estilos.celda} ${estilos.fuera}` : estilos.celda;
        const fondo = c.estado === "dato" ? color(c.valor ?? 0) : undefined;
        return (
          <span
            key={c.mes}
            className={clase}
            style={fondo ? { background: fondo } : undefined}
            onMouseEnter={() =>
              mostrar({
                // Posicion aproximada en la grilla: 13 columnas, primera para el anio
                x: ((c.mes + 0.5) / 13) * 100 + 2,
                y: ((fila + 1) / (filas + 1)) * 100,
                contenido: (
                  <>
                    <strong>{capitalizar(mesAnio(anio, c.mes))}</strong>
                    {c.estado === "dato"
                      ? `${entero(c.valor ?? 0)} ${unidad}`
                      : c.estado === "sin-dato"
                        ? "Sin dato en la fuente"
                        : "Fuera del período registrado"}
                  </>
                ),
              })
            }
          />
        );
      })}
    </>
  );
}
