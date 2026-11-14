import Link from "next/link";
import type { Resumen } from "@/lib/focos/tipos";
import { capitalizar, decimal, entero, fechaLarga, mesAnio } from "@/lib/formato";
import estilos from "./Inicio.module.css";

// Hallazgo destacado: el mes con mas focos de todo el registro, calculado desde los datos
export function Hallazgo({ resumen }: { resumen: Resumen }) {
  const { mesAnioPico: pico, porAnio, fechaMin, fechaMax } = resumen.todos;
  const delAnio = porAnio.find((a) => a.anio === pico.anio)?.total ?? pico.total;
  const parte = (pico.total / delAnio) * 100;
  const cuando = mesAnio(pico.anio, pico.mes);
  return (
    <section id="hallazgo" className="seccion seccion-alterna" aria-labelledby="titulo-hallazgo">
      <div className={`contenedor ${estilos.hallazgo}`} data-revelar>
        <p className={estilos.antetitulo}>Hallazgo destacado</p>
        <h2 id="titulo-hallazgo">
          {capitalizar(cuando)}: <span className={estilos.cifraHallazgo}>{entero(pico.total)}</span> focos en un solo
          mes
        </h2>
        <p className={estilos.textoHallazgo}>
          Es el mes con más detecciones entre el {fechaLarga(fechaMin)} y el {fechaLarga(fechaMax)}. Solo ese mes
          reunió el {decimal(parte, 0)} % de los {entero(delAnio)} focos de {pico.anio}.
        </p>
        <Link className="boton boton-principal" href={`/focos?anio=${pico.anio}&mes=${pico.mes}#explorar`}>
          Ver {cuando} en el mapa
        </Link>
      </div>
    </section>
  );
}
