import Link from "next/link";
import type { Resumen } from "@/lib/focos/tipos";
import { capitalizar, decimal, entero, fechaLarga, mesAnio } from "@/lib/formato";
import estilos from "./Inicio.module.css";

// Hallazgo destacado: el mes con mas focos de todo el registro, calculado desde los datos
export function Hallazgo({ resumen, language = "es" }: { resumen: Resumen; language?: "es" | "en" }) {
  const { mesAnioPico: pico, porAnio, fechaMin, fechaMax } = resumen.todos;
  const delAnio = porAnio.find((a) => a.anio === pico.anio)?.total ?? pico.total;
  const parte = (pico.total / delAnio) * 100;
  const cuando = language === "en" ? `${new Date(Date.UTC(pico.anio, pico.mes - 1, 1)).toLocaleString("en-US", { month: "long", timeZone: "UTC" })} ${pico.anio}` : mesAnio(pico.anio, pico.mes);
  return (
    <section id="hallazgo" className="seccion seccion-alterna" aria-labelledby="titulo-hallazgo" lang={language}>
      <div className={`contenedor ${estilos.hallazgo}`} data-revelar>
        <p className={estilos.antetitulo}>{language === "en" ? "Key finding" : "Hallazgo destacado"}</p>
        <h2 id="titulo-hallazgo">
          {capitalizar(cuando)}: <span className={estilos.cifraHallazgo}>{pico.total.toLocaleString(language === "en" ? "en-US" : "es-AR")}</span> {language === "en" ? "hotspots in a single month" : "focos en un solo mes"}
        </h2>
        <p className={estilos.textoHallazgo}>
          {language === "en" ? `This is the highest monthly count in the record, from ${new Date(`${fechaMin}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })} to ${new Date(`${fechaMax}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}. It accounted for ${parte.toLocaleString("en-US", { maximumFractionDigits: 0 })}% of the ${delAnio.toLocaleString("en-US")} detections in ${pico.anio}.` : `Es el mes con más detecciones entre el ${fechaLarga(fechaMin)} y el ${fechaLarga(fechaMax)}. Solo ese mes reunió el ${decimal(parte, 0)} % de los ${entero(delAnio)} focos de ${pico.anio}.`}
        </p>
        <Link className="boton boton-principal" href={`/focos?anio=${pico.anio}&mes=${pico.mes}#explorar`}>
          {language === "en" ? `View ${cuando} on the map` : `Ver ${cuando} en el mapa`}
        </Link>
      </div>
    </section>
  );
}
