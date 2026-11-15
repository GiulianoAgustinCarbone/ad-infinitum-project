"use client";

import { useState } from "react";
import { DemoEscenario } from "./DemoEscenario";
import { BarrasMes } from "@/components/graficos/BarrasMes";
import { MatrizAnioMes } from "@/components/graficos/MatrizAnioMes";
import { RankingDeptos } from "@/components/graficos/RankingDeptos";
import { SerieAnual } from "@/components/graficos/SerieAnual";
import type { Resumen } from "@/lib/focos/tipos";
import { decimal, entero, valorP } from "@/lib/formato";
import estilos from "./Estacionalidad.module.css";

function titular(t: Resumen["aqua"]["tendencia"]): string {
  const porDecada = Math.abs(t.senAnual * 10);
  if (t.senAnual === 0) return `Entre ${t.desde} y ${t.hasta}, la cantidad de focos no muestra cambio neto.`;
  const baja = t.senAnual < 0;
  const verbo = t.significativa ? (baja ? "disminuyeron" : "aumentaron") : baja ? "tendieron a disminuir" : "tendieron a aumentar";
  return `Entre ${t.desde} y ${t.hasta}, los focos ${verbo}: unos ${decimal(porDecada, 0)} ${baja ? "menos" : "más"} por década.`;
}

export function Estacionalidad({ resumen }: { resumen: Resumen }) {
  const [escenarioAbierto, setEscenarioAbierto] = useState(false);
  const { aqua, todos } = resumen;
  const t = aqua.tendencia;
  const t2 = aqua.tendenciaSinFaltantes;
  const conFaltantes = aqua.anual.filter((d) => d.mesesSinDato > 0).length;
  const aquaSat = todos.porSatelite.find((s) => s.satelite === "AQUA");

  return (
    <section id="estacionalidad" className="seccion seccion-alterna" aria-labelledby="titulo-estacionalidad">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <h2 id="titulo-estacionalidad">Cuándo hay fuego y si está cambiando</h2>
          <p>
            Para comparar años entre sí usamos un solo satélite, Aqua, que observó San Luis con el mismo sensor durante
            todo el período. Sumar satélites nuevos haría parecer que hay más fuego solo porque hay más ojos mirando.
          </p>
        </div>

        <div className={estilos.dos}>
          <BarrasMes estacionalidad={aqua.estacionalidad} mesPico={aqua.mesPico} desde={aqua.desde} hasta={aqua.hasta} />
          <RankingDeptos ranking={aqua.ranking} />
        </div>

        <div className={estilos.matriz}>
          <MatrizAnioMes matriz={aqua.matriz} />
        </div>

        <div className={estilos.tendencia} id="tendencia">
          <div className={estilos.tendenciaTexto}>
            <h3 className={estilos.tendenciaTitulo}>Tendencia de {t.desde} a {t.hasta}</h3>
            <p className={estilos.titular}>{titular(t)}</p>
            <p className={estilos.insignia} data-significativa={t.significativa}>
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                {t.significativa ? (
                  <path d="M3.5 9.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M3 10c2-3 4-3 6 0s4 3 6 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                )}
              </svg>
              {t.significativa ? "Significativa" : "No concluyente"}
            </p>
            <p className={estilos.explica}>
              {t.significativa
                ? `La prueba de Mann-Kendall da ${valorP(t.p)}: es poco probable que un cambio así aparezca por azar si en realidad no hubiera tendencia.`
                : `La prueba de Mann-Kendall da ${valorP(t.p)}. Con años tan distintos entre sí, un cambio de este tamaño puede aparecer por azar aunque no haya una tendencia real. Hacen falta más años o una señal más fuerte para afirmarla.`}
            </p>
            <dl className={estilos.datos}>
              <div>
                <dt>Cambio por década</dt>
                <dd>
                  {t.senAnual < 0 ? "−" : "+"}
                  {decimal(Math.abs(t.senAnual * 10), 0)} focos
                </dd>
              </div>
              <div>
                <dt>Valor p</dt>
                <dd>{decimal(t.p, 3)}</dd>
              </div>
              <div>
                <dt>Años analizados</dt>
                <dd>{t.n}</dd>
              </div>
            </dl>
            <p className="nota">
              Cambio por década según la pendiente de Sen, que no se deja arrastrar por un año extremo. {conFaltantes} de
              los {t.n} años tienen algún mes sin dato; si se los deja afuera, {valorP(t2.p)}
              {t2.significativa === t.significativa ? " y la conclusión no cambia." : " y la conclusión cambia: tomala con cuidado."}
            </p>
            <p className={`nota ${estilos.pieNota}`}>
              Serie de {aqua.desde.replace("-", "/")} a {aqua.hasta.replace("-", "/")}: {entero(aqua.total)} focos de Aqua
              {aquaSat ? ` sobre ${entero(todos.total)} detectados por todos los satélites` : ""}. Solo se analizan años
              completos.
            </p>
          </div>
          <figure className={estilos.tendenciaGrafico}>
            <figcaption className={estilos.leyendaSerie}>
              <span>
                <svg width="22" height="12" aria-hidden="true">
                  <line x1="0" y1="6" x2="22" y2="6" stroke="#b8c0c8" strokeWidth="2" />
                  <circle cx="11" cy="6" r="4" fill="#ece8df" />
                </svg>
                focos por año (Aqua)
              </span>
              <span>
                <svg width="14" height="14" aria-hidden="true">
                  <circle cx="7" cy="7" r="4.5" fill="#13202d" stroke="#ece8df" strokeWidth="2" />
                </svg>
                año con meses sin dato
              </span>
              <span>
                <svg width="26" height="12" aria-hidden="true">
                  <line x1="0" y1="6" x2="26" y2="6" stroke="#f8b44e" strokeWidth="2.5" strokeDasharray="7 5" />
                </svg>
                tendencia (pendiente de Sen)
              </span>
            </figcaption>
            <SerieAnual anual={aqua.anual} tendencia={t} escenarioAbierto={escenarioAbierto} onAlternarEscenario={() => setEscenarioAbierto((abierto) => !abierto)} />
          </figure>
        </div>

      </div>
      {escenarioAbierto && <DemoEscenario />}
    </section>
  );
}
