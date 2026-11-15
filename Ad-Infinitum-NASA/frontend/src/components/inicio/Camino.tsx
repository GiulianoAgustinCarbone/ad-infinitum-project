import Link from "next/link";
import { EstadoDato } from "@/components/sitio/EstadoDato";
import type { Resumen } from "@/lib/focos/tipos";
import { capitalizar, decimal, nombreMes } from "@/lib/formato";
import estilos from "./Inicio.module.css";

// Miniatura con datos reales: promedio de focos por mes (Aqua), coloreado por quintil
function MiniaturaFocos({ resumen }: { resumen: Resumen }) {
  const meses = resumen.aqua.estacionalidad;
  const max = Math.max(...meses.map((m) => m.promedio));
  const orden = [...meses].sort((a, b) => a.promedio - b.promedio).map((m) => m.mes);
  const ancho = 12;
  const alto = 64;
  return (
    <svg viewBox={`0 0 ${meses.length * ancho} ${alto}`} className={estilos.miniatura} aria-hidden="true">
      {meses.map((m, i) => {
        const h = Math.max(2, (m.promedio / max) * (alto - 4));
        const clase = Math.min(4, Math.floor((orden.indexOf(m.mes) / meses.length) * 5)) + 1;
        return (
          <rect
            key={m.mes}
            x={i * ancho + 1.5}
            y={alto - h}
            width={ancho - 3}
            height={h}
            rx={1.5}
            style={{ fill: `var(--fuego-${clase})` }}
          />
        );
      })}
    </svg>
  );
}

// Miniatura de lo que vendra: un dique esquematico en trazo neutro (no son datos)
function MiniaturaSequia() {
  return (
    <svg viewBox="0 0 144 64" className={`${estilos.miniatura} ${estilos.miniaturaVacia}`} aria-hidden="true">
      <path d="M4 18h40l10 40H4" />
      <path d="M54 58h86" />
      <path d="M8 30c8-4 16 4 24 0s12-4 16 0" />
      <path d="M8 42c8-4 16 4 24 0s14-4 20 0" />
      <path d="M70 46c10-14 26-14 36-2s22 10 30-4" strokeDasharray="3 4" />
    </svg>
  );
}

export function Camino({ resumen, language = "es" }: { resumen: Resumen; language?: "es" | "en" }) {
  const pico = resumen.aqua.estacionalidad.find((e) => e.mes === resumen.aqua.mesPico)!;
  return (
    <section id="camino" className="seccion" aria-labelledby="titulo-camino" lang={language}>
      <div className="contenedor">
        <div className="seccion-cabeza" data-revelar>
          <h2 id="titulo-camino">{language === "en" ? "Choose your path" : "Elegí tu camino"}</h2>
          <p>{language === "en" ? "Each topic has its own page and data. We’ll show what is ready and what is still in progress." : "Cada tema es una página con sus propios datos. Te avisamos qué está listo y qué está en camino."}</p>
        </div>
        <ul className={estilos.tarjetas}>
          <li className={`${estilos.tarjeta} ${estilos.tarjetaActiva}`} data-revelar>
            <div className={estilos.tarjetaCabeza}>
              <EstadoDato estado="real" language={language} />
              <span className={estilos.tema}>{language === "en" ? "Heat hotspots" : "Focos de calor"}</span>
            </div>
            <h3>
              <Link href="/focos" className={estilos.enlaceTarjeta}>
                {language === "en" ? "When and where does fire activity occur?" : "¿Cuándo y dónde aparece el fuego?"}
              </Link>
            </h3>
            <figure className={estilos.figura}>
              <MiniaturaFocos resumen={resumen} />
              <figcaption>
                {language === "en" ? `Average hotspots by month. ${capitalizar(new Date(Date.UTC(2020, pico.mes - 1, 1)).toLocaleString("en-US", { month: "long", timeZone: "UTC" }))} is the peak, with ${pico.promedio.toLocaleString("en-US", { maximumFractionDigits: 0 })} per year.` : `Focos promedio por mes. ${capitalizar(nombreMes(pico.mes))} es el pico, con ${decimal(pico.promedio, 0)} por año.`}
              </figcaption>
            </figure>
            <ul className={estilos.incluye}>
              <li>{language === "en" ? "Month-by-month and department maps" : "Mapa mes a mes y por departamento"}</li>
              <li>{language === "en" ? "Seasonality and trend" : "Estacionalidad y tendencia"}</li>
              <li>
                {language === "en" ? "Compare departments" : "Comparar departamentos"} <EstadoDato estado="proximamente" compacta language={language} />
              </li>
            </ul>
            <span className={estilos.ir} aria-hidden="true">
              {language === "en" ? "Explore hotspots →" : "Explorar los focos →"}
            </span>
          </li>
          <li className={estilos.tarjeta} data-revelar>
            <div className={estilos.tarjetaCabeza}>
              <EstadoDato estado="proximamente" language={language} />
              <span className={estilos.tema}>{language === "en" ? "Drought and reservoirs" : "Sequía y diques"}</span>
            </div>
            <h3>{language === "en" ? "Is there less water than before?" : "¿Hay menos agua que antes?"}</h3>
            <figure className={estilos.figura}>
              <MiniaturaSequia />
              <figcaption>{language === "en" ? "Concept sketch; data are not available yet." : "Dibujo de referencia, todavía sin datos."}</figcaption>
            </figure>
            <p className={estilos.descripcion}>
              {language === "en" ? "An approximate water balance (rainfall minus evapotranspiration) by area, plus reservoir conditions once records become available." : "Un balance hídrico aproximado (lluvia menos evapotranspiración) por zona y el estado de los diques de la provincia, cuando consigamos sus registros."}
            </p>
          </li>
        </ul>
        <ul className={estilos.secundarios} aria-label={language === "en" ? "Other pages" : "Otras páginas"}>
          <li>
            <span aria-disabled="true">{language === "en" ? "Method" : "Método"}</span> <EstadoDato estado="proximamente" compacta language={language} />
          </li>
          <li>
            <span aria-disabled="true">{language === "en" ? "Data and downloads" : "Datos y descargas"}</span> <EstadoDato estado="proximamente" compacta language={language} />
          </li>
        </ul>
      </div>
    </section>
  );
}
