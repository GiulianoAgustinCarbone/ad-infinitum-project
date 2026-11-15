import type { Resumen } from "@/lib/focos/tipos";
import { mesAnio, valorP } from "@/lib/formato";
import estilos from "./Inicio.module.css";

const NOMBRE_SATELITE: Record<string, string> = { TERRA: "Terra", AQUA: "Aqua", SNPP: "Suomi NPP", NOAA20: "NOAA-20" };

function lista(nombres: string[]): string {
  return nombres.length < 2 ? nombres.join("") : `${nombres.slice(0, -1).join(", ")} y ${nombres.at(-1)}`;
}

export function ComoFunciona({ resumen, language = "es" }: { resumen: Resumen; language?: "es" | "en" }) {
  const { todos, aqua } = resumen;
  const t = aqua.tendencia;
  const [a0, m0] = aqua.desde.split("-").map(Number);
  const [a1, m1] = aqua.hasta.split("-").map(Number);
  const satelites = language === "en"
    ? new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(todos.porSatelite.map((s) => NOMBRE_SATELITE[s.satelite] ?? s.satelite))
    : lista(todos.porSatelite.map((s) => NOMBRE_SATELITE[s.satelite] ?? s.satelite));
  const dateMonth = (year: number, month: number) => language === "en"
    ? `${new Date(Date.UTC(year, month - 1, 1)).toLocaleString("en-US", { month: "long", timeZone: "UTC" })} ${year}`
    : mesAnio(year, month);
  const pDisplay = language === "en"
    ? t.p < 0.001 ? "p < 0.001" : `p = ${t.p.toLocaleString("en-US", { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`
    : valorP(t.p);
  return (
    <section id="como-funciona" className="seccion" aria-labelledby="titulo-como" lang={language}>
      <div className="contenedor">
        <div className="seccion-cabeza" data-revelar>
          <h2 id="titulo-como">{language === "en" ? "How it works" : "Cómo funciona"}</h2>
          <p>{language === "en" ? "Three steps from satellite observations to a conclusion you can check." : "Tres pasos desde el satélite hasta una conclusión que se puede revisar."}</p>
        </div>
        <ol className={estilos.pasos}>
          <li data-revelar>
            <span className={estilos.numeroPaso} aria-hidden="true">
              1
            </span>
            <h3>{language === "en" ? "Satellite observations" : "Datos satelitales"}</h3>
            <p>
              {language === "en" ? `Satellites ${satelites} pass over San Luis several times a day and flag locations that are much hotter than their surroundings. Each detection is a heat hotspot.` : `Los satélites ${satelites} pasan sobre San Luis varias veces por día y marcan cada punto mucho más caliente que su entorno. Cada marca es un foco de calor.`}
            </p>
          </li>
          <li data-revelar>
            <span className={estilos.numeroPaso} aria-hidden="true">
              2
            </span>
            <h3>{language === "en" ? "Monthly record" : "Serie mensual"}</h3>
            <p>
              {language === "en" ? `We count hotspots by month and department. To compare years, we use Aqua alone, which covers the full period (${dateMonth(a0, m0)} to ${dateMonth(a1, m1)}). Adding satellites introduced later would inflate recent counts.` : `Contamos los focos de cada mes y departamento. Para comparar años usamos solo Aqua, presente en todo el período (de ${dateMonth(a0, m0)} a ${dateMonth(a1, m1)}): sumar los satélites que se agregaron después inflaría los años recientes.`}
            </p>
          </li>
          <li data-revelar>
            <span className={estilos.numeroPaso} aria-hidden="true">
              3
            </span>
            <h3>{language === "en" ? "Trend and significance" : "Tendencia con significancia"}</h3>
            <p>
              {language === "en" ? `We test whether hotspot counts rise or fall using the Mann–Kendall test and Sen’s slope. From ${t.desde} to ${t.hasta}, the result is ${t.significativa ? "statistically significant" : "inconclusive"} (${pDisplay}).` : `Medimos si los focos suben o bajan con la prueba de Mann-Kendall y la pendiente de Sen. Entre ${t.desde} y ${t.hasta} el resultado es ${t.significativa ? "significativo" : "no concluyente"} (${pDisplay}).`}
            </p>
          </li>
        </ol>
        <p className={estilos.aviso} data-revelar>
          {language === "en" ? <><strong>A hotspot is not burned area.</strong> It is a satellite heat detection: a large fire can produce many hotspots, a small or cloud-covered fire may not appear, and some heat sources are not fires.</> : <><strong>Un foco no es superficie quemada.</strong> Es una detección de calor tomada desde el espacio: un incendio grande puede dejar muchos focos, uno pequeño o tapado por nubes puede no aparecer, y algunas fuentes de calor no son incendios.</>}
        </p>
      </div>
    </section>
  );
}
