import Link from "next/link";
import { HeroFocos } from "@/components/hero/HeroFocos";
import type { Resumen } from "@/lib/focos/tipos";
import { entero } from "@/lib/formato";
import { EstadoDato } from "./EstadoDato";
import estilos from "./Hero.module.css";

export function Hero({ resumen }: { resumen: Resumen }) {
  const desde = resumen.todos.fechaMin.slice(0, 4);
  const hasta = resumen.todos.fechaMax.slice(0, 4);
  return (
    <section id="inicio" className={estilos.hero} aria-labelledby="titulo-hero">
      <div className={`contenedor ${estilos.grilla}`}>
        <div className={estilos.texto}>
          <p className={estilos.lugar} data-entrada>
            Provincia de San Luis, Argentina
          </p>
          <h1 id="titulo-hero" className={estilos.titulo} data-entrada>
            ¿Cómo cambió el fuego en San Luis?
          </h1>
          <p className={estilos.bajada} data-entrada>
            Entre {desde} y {hasta}, los satélites detectaron {entero(resumen.todos.total)} focos de calor en la
            provincia. Te mostramos cuándo aparecen, dónde se concentran y si hay una tendencia, con los datos reales
            y sus límites a la vista.
          </p>
          <p className={estilos.ingles} lang="en" data-entrada>
            How has fire changed in San Luis, Argentina? Satellite fire detections from {desde} to {hasta}.
          </p>
          <div className={estilos.acciones} data-entrada>
            <Link className="boton boton-principal" href="/focos">
              Explorar los focos
            </Link>
            <span className="boton" aria-disabled="true">
              Cómo lo medimos
              <EstadoDato estado="proximamente" compacta />
            </span>
          </div>
        </div>
        <div data-entrada>
          <HeroFocos />
        </div>
      </div>
    </section>
  );
}
