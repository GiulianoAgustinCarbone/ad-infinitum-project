import type { Resumen } from "@/lib/focos/tipos";
import { NOMBRE_SATELITE } from "@/lib/focos/satelites";
import { mesAnio, valorP } from "@/lib/formato";
import estilos from "./Inicio.module.css";

function lista(nombres: string[]): string {
  return nombres.length < 2 ? nombres.join("") : `${nombres.slice(0, -1).join(", ")} y ${nombres.at(-1)}`;
}

export function ComoFunciona({ resumen }: { resumen: Resumen }) {
  const { todos, aqua } = resumen;
  const t = aqua.tendencia;
  const [a0, m0] = aqua.desde.split("-").map(Number);
  const [a1, m1] = aqua.hasta.split("-").map(Number);
  const satelites = lista(todos.porSatelite.map((s) => NOMBRE_SATELITE[s.satelite] ?? s.satelite));
  return (
    <section id="como-funciona" className="seccion" aria-labelledby="titulo-como">
      <div className="contenedor">
        <div className="seccion-cabeza" data-revelar>
          <h2 id="titulo-como">Cómo funciona</h2>
          <p>Tres pasos desde el satélite hasta una conclusión que se puede revisar.</p>
        </div>
        <ol className={estilos.pasos}>
          <li data-revelar>
            <span className={estilos.numeroPaso} aria-hidden="true">
              1
            </span>
            <h3>Datos satelitales</h3>
            <p>
              Los satélites {satelites} pasan sobre San Luis varias veces por día y marcan cada punto mucho más
              caliente que su entorno. Cada marca es un foco de calor.
            </p>
          </li>
          <li data-revelar>
            <span className={estilos.numeroPaso} aria-hidden="true">
              2
            </span>
            <h3>Serie mensual</h3>
            <p>
              Contamos los focos de cada mes y departamento. Para comparar años usamos solo Aqua, presente en todo el
              período (de {mesAnio(a0, m0)} a {mesAnio(a1, m1)}): sumar los satélites que se agregaron después
              inflaría los años recientes.
            </p>
          </li>
          <li data-revelar>
            <span className={estilos.numeroPaso} aria-hidden="true">
              3
            </span>
            <h3>Tendencia con significancia</h3>
            <p>
              Medimos si los focos suben o bajan con la prueba de Mann-Kendall y la pendiente de Sen. Entre {t.desde} y{" "}
              {t.hasta} el resultado es {t.significativa ? "significativo" : "no concluyente"} <span className={estilos.sinCorte}>({valorP(t.p)})</span>.
            </p>
          </li>
        </ol>
        <p className={estilos.aviso} data-revelar>
          <strong>Un foco no es superficie quemada.</strong> Es una detección de calor tomada desde el espacio: un
          incendio grande puede dejar muchos focos, uno pequeño o tapado por nubes puede no aparecer, y algunas fuentes
          de calor no son incendios.
        </p>
      </div>
    </section>
  );
}
