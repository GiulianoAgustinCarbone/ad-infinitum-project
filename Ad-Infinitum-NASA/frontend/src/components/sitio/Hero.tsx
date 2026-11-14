import { HeroFocos } from "@/components/hero/HeroFocos";
import type { Resumen } from "@/lib/focos/tipos";
import { entero } from "@/lib/formato";
import estilos from "./Hero.module.css";

export function Hero({ resumen }: { resumen: Resumen }) {
  const desde = resumen.todos.fechaMin.slice(0, 4);
  const hasta = resumen.todos.fechaMax.slice(0, 4);
  return (
    <section id="inicio" className={estilos.hero} aria-labelledby="titulo-hero">
      <div className={`contenedor ${estilos.grilla}`}>
        <div className={estilos.texto}>
          <p className={estilos.lugar}>Provincia de San Luis, Argentina</p>
          <h1 id="titulo-hero" className={estilos.titulo}>
            ¿Cómo cambió el fuego en San Luis?
          </h1>
          <p className={estilos.bajada}>
            Entre {desde} y {hasta}, los satélites detectaron {entero(resumen.todos.total)} focos de calor en la
            provincia. Te mostramos cuándo aparecen, dónde se concentran y si hay una tendencia, con los datos reales
            y sus límites a la vista.
          </p>
          <div className={estilos.acciones}>
            <a className="boton boton-principal" href="#explorar">
              Explorar el mapa
            </a>
            <a className="boton" href="#metodo">
              Cómo funciona
            </a>
            <a className="boton" href="#descargas">
              Descargar informe
            </a>
          </div>
        </div>
        <HeroFocos />
      </div>
    </section>
  );
}
