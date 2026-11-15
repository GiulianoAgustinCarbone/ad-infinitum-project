"use client";

import { useState } from "react";
import { fuenteFocos } from "@/lib/data/focos";
import { aCsv, descargar } from "@/lib/exportar/csv";
import { etiquetaOrigen } from "@/lib/focos/origen";
import { TEXTOS, type Modo } from "@/lib/focos/modo";
import type { Resumen } from "@/lib/focos/tipos";
import estilos from "./Descargas.module.css";

const ATRIBUCION = "Datos: Gobierno de San Luis";
const ATRIBUCION_TODOS = "Datos: Gobierno de San Luis y NASA FIRMS";
const ATRIBUCION_INCENDIOS = "Datos: NASA (MCD64A1), Gobierno de San Luis y NASA FIRMS";

function porAnioYFuente(resumen: Resumen, modo: Modo) {
  const { porAnioOrigen, porOrigen, fechaMin, fechaMax } = resumen.todos;
  const nombres = porOrigen.map((o) => o.origen);
  const filas = [
    ["anio", ...nombres.map(etiquetaOrigen), "total"],
    ...porAnioOrigen.map((a) => {
      const valores = nombres.map((n) => a.origenes[n] ?? 0);
      return [a.anio, ...valores, valores.reduce((s, v) => s + v, 0)];
    }),
    [],
    [
      `# ${modo === "incendios" ? ATRIBUCION_INCENDIOS : ATRIBUCION_TODOS}. Serie histórica: base hasta octubre de 2024. NASA FIRMS: meses que la serie no registra y período posterior. Descargado ${resumen.descargado}.`,
    ],
  ];
  const prefijo = modo === "incendios" ? "incendios-confirmados" : "focos";
  descargar(
    `san-luis_${prefijo}-por-anio-y-fuente_${fechaMin.slice(0, 4)}-${fechaMax.slice(0, 4)}.csv`,
    aCsv(filas),
    "text/csv;charset=utf-8",
  );
}

function anual(resumen: Resumen, modo: Modo) {
  const T = TEXTOS[modo];
  const incendios = modo === "incendios";
  const { anual: serie, tendencia: t } = resumen.aqua;
  const filas = [
    ["anio", T.columnaAnual, "meses_sin_dato", "tendencia_sen", "tendencia_minimos_cuadrados"],
    ...serie.map((d) => [
      d.anio,
      incendios ? Math.round(d.total) : d.total,
      d.mesesSinDato,
      Math.round((t.ordenadaSen + t.senAnual * d.anio) * 10) / 10,
      Math.round((t.ordenada + t.pendienteAnual * d.anio) * 10) / 10,
    ]),
    [],
    ["# Mann-Kendall p", Math.round(t.p * 10000) / 10000],
    [`# Pendiente de Sen (${T.porDecada})`, Math.round(t.senAnual * 100) / 10],
    ["# Significativa (p < 0.05)", t.significativa ? "si" : "no"],
    [
      incendios
        ? `# ${ATRIBUCION_INCENDIOS}. Superficie quemada por año según MCD64A1. Descargado ${resumen.descargado}.`
        : `# ${ATRIBUCION}. Aqua (MODIS): serie histórica y NASA FIRMS donde la serie no tiene dato. Descargado ${resumen.descargado}.`,
    ],
  ];
  descargar(`san-luis_${T.nombreAnual}_${t.desde}-${t.hasta}.csv`, aCsv(filas), "text/csv;charset=utf-8");
}

async function mensual(resumen: Resumen, modo: Modo) {
  const T = TEXTOS[modo];
  const incendios = modo === "incendios";
  const serie = incendios ? await fuenteFocos.getSerieIncendios() : await fuenteFocos.getSerieMensual();
  const nombres = serie.departamentos.map((d) => d.nombre);
  const filas = [
    ["mes", ...nombres, "total_provincia", "fuente"],
    ...serie.meses.map((m, i) => {
      const valores = serie.departamentos.map((d) => d.conteos[i]);
      const total = valores.some((v) => v === null) ? null : valores.reduce<number>((s, v) => s + (v ?? 0), 0);
      const fuente = incendios ? "MCD64A1" : etiquetaOrigen(serie.fuentePorMes?.[i] ?? "CONAE");
      return [m, ...valores, total, fuente];
    }),
    [],
    [
      incendios
        ? "# Celdas vacías: mes sin granulo de MCD64A1 (no es cero). Valores en hectáreas."
        : "# Celdas vacías: mes sin dato en la fuente (no es cero).",
    ],
    [
      `# ${incendios ? ATRIBUCION_INCENDIOS : ATRIBUCION}${incendios ? "" : ". Aqua (MODIS): serie histórica y NASA FIRMS donde la serie no tiene dato"}. Descargado ${resumen.descargado}.`,
    ],
  ];
  descargar(
    `san-luis_${T.nombreMensual}_${serie.meses[0]}_${serie.meses.at(-1)}.csv`,
    aCsv(filas),
    "text/csv;charset=utf-8",
  );
}

export function Descargas({ resumen, modo = "focos" }: { resumen: Resumen; modo?: Modo }) {
  const [error, setError] = useState<string | null>(null);
  const incendios = modo === "incendios";
  return (
    <section id="descargas" className="seccion seccion-alterna" aria-labelledby="titulo-descargas">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <h2 id="titulo-descargas">Descargas</h2>
          <p>
            Los mismos números que ves en el sitio, para abrir en una planilla o en Python. Cada archivo incluye la fuente
            y avisa qué meses no tienen dato.
          </p>
        </div>
        <ul className={estilos.lista}>
          <li>
            <div>
              <h3>{incendios ? "Hectáreas quemadas por año" : "Focos por año"}</h3>
              <p>
                {incendios
                  ? `Superficie quemada anual, de ${resumen.aqua.tendencia.desde} a ${resumen.aqua.tendencia.hasta}, con la recta de tendencia, el valor p y la pendiente de Sen.`
                  : `Serie anual de Aqua ${resumen.aqua.tendencia.desde} a ${resumen.aqua.tendencia.hasta}, con la recta de tendencia, el valor p y la pendiente de Sen.`}
              </p>
            </div>
            <button type="button" className="boton boton-principal" onClick={() => anual(resumen, modo)}>
              Descargar CSV
            </button>
          </li>
          <li>
            <div>
              <h3>{incendios ? "Hectáreas quemadas por mes y departamento" : "Focos por mes y departamento"}</h3>
              <p>
                Los {resumen.aqua.ranking.length} departamentos, mes por mes.{" "}
                {incendios ? "Las celdas vacías son meses sin granulo de MCD64A1." : "Las celdas vacías son meses sin dato."}
              </p>
            </div>
            <button
              type="button"
              className="boton boton-principal"
              onClick={() => mensual(resumen, modo).catch((e: Error) => setError(e.message))}
            >
              Descargar CSV
            </button>
          </li>
          <li>
            <div>
              <h3>{incendios ? "Incendios por año y fuente" : "Focos por año y fuente"}</h3>
              <p>
                {incendios
                  ? "Incendios confirmados por año, según venga el foco de la serie histórica o de NASA FIRMS."
                  : "Todos los focos del sitio, por año y por fuente: serie histórica y NASA FIRMS. Incluye los focos que no son de Aqua."}
              </p>
            </div>
            <button type="button" className="boton boton-principal" onClick={() => porAnioYFuente(resumen, modo)}>
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
