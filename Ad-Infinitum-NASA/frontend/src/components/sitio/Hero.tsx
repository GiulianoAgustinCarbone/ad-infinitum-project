import Link from "next/link";
import { HeroFocos } from "@/components/hero/HeroFocos";
import type { Resumen } from "@/lib/focos/tipos";
import { entero } from "@/lib/formato";
import { EstadoDato } from "./EstadoDato";
import estilos from "./Hero.module.css";

export function Hero({ resumen, language = "es" }: { resumen: Resumen; language?: "es" | "en" }) {
  const desde = resumen.todos.fechaMin.slice(0, 4);
  const hasta = resumen.todos.fechaMax.slice(0, 4);
  return (
    <section id="inicio" className={estilos.hero} aria-labelledby="titulo-hero" lang={language}>
      <div className={`contenedor ${estilos.grilla}`}>
        <div className={estilos.texto}>
          <p className={estilos.lugar} data-entrada>
            {language === "en" ? "San Luis Province, Argentina" : "Provincia de San Luis, Argentina"}
          </p>
          <h1 id="titulo-hero" className={estilos.titulo} data-entrada>
            {language === "en" ? "How has fire changed in San Luis?" : "¿Cómo cambió el fuego en San Luis?"}
          </h1>
          <p className={estilos.bajada} data-entrada>
            {language === "en"
              ? `From ${desde} to ${hasta}, satellites detected ${resumen.todos.total.toLocaleString("en-US")} heat hotspots across the province. Explore when and where they appear, and whether the data show a trend—with the limits clearly explained.`
              : `Entre ${desde} y ${hasta}, los satélites detectaron ${entero(resumen.todos.total)} focos de calor en la provincia. Te mostramos cuándo aparecen, dónde se concentran y si hay una tendencia, con los datos reales y sus límites a la vista.`}
          </p>
          <p className={estilos.ingles} lang={language} data-entrada>
            {language === "en" ? "A satellite view of fire activity, month by month." : `How has fire changed in San Luis, Argentina? Satellite fire detections from ${desde} to ${hasta}.`}
          </p>
          <div className={estilos.acciones} data-entrada>
            <Link className="boton boton-principal" href="/focos">
              {language === "en" ? "Explore the hotspots" : "Explorar los focos"}
            </Link>
            <span className="boton" aria-disabled="true">
              {language === "en" ? "How we measure it" : "Cómo lo medimos"}
              <EstadoDato estado="proximamente" compacta language={language} />
            </span>
          </div>
        </div>
        <div data-entrada>
          <HeroFocos language={language} />
        </div>
      </div>
    </section>
  );
}
