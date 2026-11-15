"use client";

import { useState } from "react";
import { fuenteFocos } from "@/lib/data/focos";
import { aCsv, descargar } from "@/lib/exportar/csv";
import type { Resumen } from "@/lib/focos/tipos";
import estilos from "./Descargas.module.css";

const ATRIBUCION = "Datos: CONAE / Gobierno de San Luis";
const ATRIBUCION_TODOS = "Datos: CONAE / Gobierno de San Luis y NASA FIRMS";

function porAnioYFuente(resumen: Resumen) {
  const { porAnioOrigen, porOrigen, fechaMin, fechaMax } = resumen.todos;
  const nombres = porOrigen.map((o) => o.origen);
  const filas = [
    ["anio", ...nombres, "total"],
    ...porAnioOrigen.map((a) => {
      const valores = nombres.map((n) => a.origenes[n] ?? 0);
      return [a.anio, ...valores, valores.reduce((s, v) => s + v, 0)];
    }),
    [],
    [
      `# ${ATRIBUCION_TODOS}. CONAE: serie base. FIRMS: meses que CONAE no registro y periodo posterior a su serie. Descargado ${resumen.descargado}.`,
    ],
  ];
  descargar(
    `san-luis_focos-por-anio-y-fuente_${fechaMin.slice(0, 4)}-${fechaMax.slice(0, 4)}.csv`,
    aCsv(filas),
    "text/csv;charset=utf-8",
  );
}

function anual(resumen: Resumen) {
  const { anual: serie, tendencia: t } = resumen.aqua;
  const filas = [
    ["anio", "focos_aqua", "meses_sin_dato", "tendencia_sen", "tendencia_minimos_cuadrados"],
    ...serie.map((d) => [
      d.anio,
      d.total,
      d.mesesSinDato,
      Math.round((t.ordenadaSen + t.senAnual * d.anio) * 10) / 10,
      Math.round((t.ordenada + t.pendienteAnual * d.anio) * 10) / 10,
    ]),
    [],
    ["# Mann-Kendall p", Math.round(t.p * 10000) / 10000],
    ["# Pendiente de Sen (focos por decada)", Math.round(t.senAnual * 100) / 10],
    ["# Significativa (p < 0.05)", t.significativa ? "si" : "no"],
    [`# ${ATRIBUCION}. Aqua (MODIS): CONAE y NASA FIRMS donde CONAE no tiene dato. Descargado ${resumen.descargado}.`],
  ];
  descargar(`san-luis_focos-anuales-aqua_${t.desde}-${t.hasta}.csv`, aCsv(filas), "text/csv;charset=utf-8");
}

async function mensual(resumen: Resumen) {
  const serie = await fuenteFocos.getSerieMensual();
  const nombres = serie.departamentos.map((d) => d.nombre);
  const filas = [
    ["mes", ...nombres, "total_provincia", "fuente"],
    ...serie.meses.map((m, i) => {
      const valores = serie.departamentos.map((d) => d.conteos[i]);
      const total = valores.some((v) => v === null) ? null : valores.reduce<number>((s, v) => s + (v ?? 0), 0);
      return [m, ...valores, total, serie.fuentePorMes?.[i] ?? "CONAE"];
    }),
    [],
    ["# Celdas vacias: mes sin dato en la fuente (no es cero)."],
    [`# ${ATRIBUCION}. Aqua (MODIS): CONAE y NASA FIRMS donde CONAE no tiene dato. Descargado ${resumen.descargado}.`],
  ];
  descargar(`san-luis_focos-mensuales-por-departamento_${serie.meses[0]}_${serie.meses.at(-1)}.csv`, aCsv(filas), "text/csv;charset=utf-8");
}

export function Descargas({ resumen }: { resumen: Resumen }) {
  const [error, setError] = useState<string | null>(null);
  return (
    <section id="descargas" className="seccion seccion-alterna" aria-labelledby="titulo-descargas">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <h2 id="titulo-descargas">Descargas</h2>
          <p>
            Los mismos números que ves en el sitio, para abrir en una planilla o en Python. Cada archivo incluye la
            fuente y avisa qué meses no tienen dato.
          </p>
        </div>
        <ul className={estilos.lista}>
          <li>
            <div>
              <h3>Focos por año</h3>
              <p>
                Serie anual de Aqua {resumen.aqua.tendencia.desde} a {resumen.aqua.tendencia.hasta}, con la recta de
                tendencia, el valor p y la pendiente de Sen.
              </p>
            </div>
            <button type="button" className="boton boton-principal" onClick={() => anual(resumen)}>
              Descargar CSV
            </button>
          </li>
          <li>
            <div>
              <h3>Focos por mes y departamento</h3>
              <p>Los {resumen.aqua.ranking.length} departamentos, mes por mes. Las celdas vacías son meses sin dato.</p>
            </div>
            <button
              type="button"
              className="boton boton-principal"
              onClick={() => mensual(resumen).catch((e: Error) => setError(e.message))}
            >
              Descargar CSV
            </button>
          </li>
          <li>
            <div>
              <h3>Focos por año y fuente</h3>
              <p>Todos los focos del sitio, por año y por fuente: CONAE y NASA FIRMS. Incluye los focos que no son de Aqua.</p>
            </div>
            <button type="button" className="boton boton-principal" onClick={() => porAnioYFuente(resumen)}>
              Descargar CSV
            </button>
          </li>
        </ul>
        {error && (
          <p role="alert" className={estilos.error}>
            No se pudo generar el archivo: {error}. Probá de nuevo en unos segundos.
          </p>
        )}
      </div>
    </section>
  );
}
