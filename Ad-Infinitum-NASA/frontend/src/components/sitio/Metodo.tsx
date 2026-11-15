import { NOMBRE_SATELITE } from "@/lib/focos/satelites";
import type { Resumen } from "@/lib/focos/tipos";
import { decimal, entero, nombreMes } from "@/lib/formato";
import estilos from "./Metodo.module.css";

export function Metodo({ resumen }: { resumen: Resumen }) {
  const { todos, aqua } = resumen;
  const viirs = todos.porSatelite.filter((s) => s.sensor === "VIIRS");
  const modis = todos.porSatelite.filter((s) => s.sensor === "MODIS");
  const tri = aqua.trimestrePico;
  return (
    <section id="metodo" className="seccion" aria-labelledby="titulo-metodo">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <h2 id="titulo-metodo">Cómo lo calculamos</h2>
          <p>Cuatro pasos, sin cajas negras. Todo el cálculo corre con los datos publicados y se puede repetir.</p>
        </div>
        <ol className={estilos.pasos}>
          <li>
            <h3>Datos satelitales</h3>
            <p>
              Los satélites {modis.map((s) => NOMBRE_SATELITE[s.satelite]).join(" y ")} (sensor MODIS) y, más tarde,{" "}
              {viirs.map((s) => `${NOMBRE_SATELITE[s.satelite]} desde ${s.desde}`).join(" y ")} (sensor VIIRS) pasan
              sobre San Luis varias veces por día. Marcan como foco de calor cada punto mucho más caliente que su
              entorno. NASA FIRMS permite consultar estas detecciones satelitales de focos de calor.
            </p>
          </li>
          <li>
            <h3>Serie mensual</h3>
            <p>
              Contamos los focos de cada mes y de cada departamento. Para comparar años usamos solo el satélite Aqua,
              que tiene el mismo sensor durante todo el período. La fuente de consulta es NASA FIRMS.
            </p>
          </li>
          <li>
            <h3>Tendencia</h3>
            <p>
              Sumamos los focos de cada año completo y trazamos la recta que mejor sigue a esos totales. El cambio por
              década sale de la pendiente de Sen, que usa la mediana y no se deja arrastrar por un año extremo.
            </p>
          </li>
          <li>
            <h3>Significancia</h3>
            <p>
              La prueba de Mann-Kendall dice si la subida o bajada es más fuerte de lo que daría el azar. Con un valor p
              menor a 0,05 la llamamos significativa; si no, no concluyente.
            </p>
          </li>
        </ol>

        <div className={estilos.limites}>
          <h3 className={estilos.limitesTitulo}>Límites que conviene tener presentes</h3>
          <ul>
            <li>
              <strong>Un foco es una detección, no superficie quemada.</strong> Un incendio grande puede dejar decenas
              de focos y uno chico, o cubierto por nubes, ninguno.
            </li>
            <li>
              <strong>Los sensores cambian.</strong> VIIRS detecta fuegos más chicos que MODIS. Por eso la suma de todos
              los satélites no sirve para ver tendencias. Aqua, además, fue cambiando su horario de paso en sus últimos
              años.
            </li>
            <li>
              <strong>La serie es muy estacional.</strong> {nombreMes(tri.meses[0])}, {nombreMes(tri.meses[1])} y{" "}
              {nombreMes(tri.meses[2])} reúnen el {decimal(tri.porcentaje, 0)} % de los focos de un año. Por eso
              comparamos años completos y no meses sueltos.
            </li>
            <li>
              <strong>Pocos años para una tendencia.</strong> {aqua.tendencia.n} años completos es poco cuando un año
              puede tener el triple de focos que el siguiente.
            </li>
            <li>
              <strong>La calidad de cada registro importa.</strong> Los meses sin datos se distinguen de los meses sin focos. En {entero(todos.potenciaNoConfiable)} detecciones la potencia no es confiable y se muestra como “sin dato confiable”. El sensor se identifica a partir del satélite.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
