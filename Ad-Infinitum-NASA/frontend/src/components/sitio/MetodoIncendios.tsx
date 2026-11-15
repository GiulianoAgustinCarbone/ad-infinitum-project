import validacion from "@/lib/generado/validacion.json";
import type { Resumen } from "@/lib/focos/tipos";
import { decimal } from "@/lib/formato";
import estilos from "./Metodo.module.css";

const BASE = validacion.escenarios["base: 1 km, mismo mes, MCD+VNP"];

export function MetodoIncendios({ resumen }: { resumen: Resumen }) {
  const { aqua } = resumen;
  const tendencia = aqua.tendencia;
  return (
    <section id="metodo" className="seccion" aria-labelledby="titulo-metodo">
      <div className="contenedor">
        <div className="seccion-cabeza">
          <h2 id="titulo-metodo">Cómo calculamos los incendios</h2>
          <p>
            Cuatro pasos, con datos públicos de NASA y del Gobierno de San Luis. Todo el cálculo se puede repetir y cada paso se puede revisar.
          </p>
        </div>
        <ol className={estilos.pasos}>
          <li>
            <h3>Dónde se quemó</h3>
            <p>
              Cada mes, NASA publica qué píxeles de unos 463 m se quemaron. MODIS (Terra y Aqua) cubre desde noviembre de
              2000 y VIIRS desde marzo de 2012. Un píxel quemado equivale a unas 21,5 hectáreas. Sumamos esos píxeles por mes
              y por departamento.
            </p>
          </li>
          <li>
            <h3>Qué foco es un incendio</h3>
            <p>
              Un foco de calor, de la serie histórica o de NASA FIRMS, cuenta como incendio confirmado si en el mismo mes hay un píxel
              quemado a menos de 1 km. Los focos sin área quemada cerca no se cuentan. Si el mes no tiene datos de área
              quemada, el foco no se evalúa y no se cuenta como sí ni como no.
            </p>
          </li>
          <li>
            <h3>Tendencia</h3>
            <p>
              Sumamos la superficie quemada de cada año completo y trazamos la recta de tendencia. El cambio por década sale
              de la pendiente de Sen, que usa la mediana y no se deja arrastrar por un año extremo.
            </p>
          </li>
          <li>
            <h3>Significancia</h3>
            <p>
              La prueba de Mann-Kendall dice si la subida o la bajada es más fuerte de lo que daría el azar. Con un valor p
              menor a 0,05 la llamamos significativa; si no, no concluyente.
            </p>
          </li>
        </ol>

        <div className={estilos.limites}>
          <h3 className={estilos.limitesTitulo}>Límites que conviene tener presentes</h3>
          <ul>
            <li>
              <strong>Un píxel quemado no es un incendio completo.</strong> El píxel de 463 m no ve incendios chicos, y la
              cicatriz de un fuego puede quedar parcial o tapada por nubes.
            </li>
            <li>
              <strong>No es una validación independiente.</strong> El área quemada se construye con detecciones de fuego, así
              que la coincidencia entre focos y área quemada es en parte por diseño. Para medir cuánto es real comparamos con
              puntos al azar dentro de la provincia: coinciden el {decimal(BASE.azar_tasa * 100, 2)} %, frente al{" "}
              {decimal(BASE.focos_tasa * 100, 0)} % de los focos.
            </li>
            <li>
              <strong>Los primeros años tienen cifras muy altas.</strong> Entre 2001 y 2003 la superficie quemada supera
              ampliamente al resto de la serie. Todavía no sabemos si refleja un fuego real o un efecto del producto en sus
              primeros años. Los mostramos completos y no los quitamos de la tendencia.
            </li>
            <li>
              <strong>Pocos años para una tendencia.</strong> {tendencia.n} años completos es poco cuando un año puede quemar
              varias veces lo que quemó el siguiente. El año en curso no entra en la tendencia hasta que termina.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
