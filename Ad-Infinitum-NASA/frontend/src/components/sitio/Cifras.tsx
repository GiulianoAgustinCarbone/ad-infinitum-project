import type { Resumen } from "@/lib/focos/tipos";
import { capitalizar, decimal, entero, fechaLarga, nombreMes } from "@/lib/formato";
import estilos from "./Cifras.module.css";

const NOMBRE_SATELITE: Record<string, string> = {
  TERRA: "Terra",
  AQUA: "Aqua",
  SNPP: "Suomi NPP",
  NOAA20: "NOAA-20",
};

function duracion(desde: string, hasta: string): string {
  const [a0, m0] = desde.split("-").map(Number);
  const [a1, m1] = hasta.split("-").map(Number);
  const meses = (a1 - a0) * 12 + (m1 - m0) + 1;
  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  return resto ? `${anios} años y ${resto} ${resto === 1 ? "mes" : "meses"}` : `${anios} años`;
}

function duracionEn(desde: string, hasta: string): string {
  const [a0, m0] = desde.split("-").map(Number);
  const [a1, m1] = hasta.split("-").map(Number);
  const meses = (a1 - a0) * 12 + (m1 - m0) + 1;
  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  return `${anios} ${anios === 1 ? "year" : "years"}${resto ? ` and ${resto} ${resto === 1 ? "month" : "months"}` : ""}`;
}

export function Cifras({ resumen, language = "es" }: { resumen: Resumen; language?: "es" | "en" }) {
  const { todos, aqua } = resumen;
  const primero = todos.porDepto[0];
  const pico = aqua.estacionalidad.find((e) => e.mes === aqua.mesPico)!;
  const sats = todos.porSatelite;
  return (
    <section id="cifras" className="seccion" aria-labelledby="titulo-cifras" lang={language}>
      <div className={`contenedor ${estilos.grilla}`}>
        <div className={estilos.principal}>
          <h2 id="titulo-cifras" className={estilos.titulo}>
            {language === "en" ? "Fire detections at a glance" : "Los datos en cifras"}
          </h2>
          <p className={estilos.numero}>{todos.total.toLocaleString(language === "en" ? "en-US" : "es-AR")}</p>
          <p className={estilos.leyenda}>
            {language === "en"
              ? `satellite thermal hotspot detections in San Luis between ${new Date(`${todos.fechaMin}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })} and ${new Date(`${todos.fechaMax}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}.`
              : `focos de calor detectados por satélite en San Luis entre el ${fechaLarga(todos.fechaMin)} y el ${fechaLarga(todos.fechaMax)}.`}
          </p>
        </div>
        <dl className={estilos.lista}>
          <div>
            <dt>{language === "en" ? "Observation period" : "Período cubierto"}</dt>
            <dd>
              <span className={estilos.valor}>{language === "en" ? duracionEn(todos.fechaMin, todos.fechaMax) : duracion(todos.fechaMin, todos.fechaMax)}</span>
              <span className={estilos.detalle}>
                {language === "en" ? `of thermal detections across ${sats.length} satellites: ` : `de detecciones, con ${sats.length} satélites: `}
                {sats.map((s, i) => (
                  <span key={s.satelite}>
                    {NOMBRE_SATELITE[s.satelite] ?? s.satelite} ({s.sensor}, {language === "en" ? "since" : "desde"} {s.desde})
                    {i < sats.length - 2 ? ", " : i === sats.length - 2 ? (language === "en" ? " and " : " y ") : "."}
                  </span>
                ))}
              </span>
            </dd>
          </div>
          <div>
            <dt>{language === "en" ? "Department with the most detections" : "Departamento con más focos"}</dt>
            <dd>
              <span className={estilos.valor}>{primero.nombre}</span>
              <span className={estilos.detalle}>
                {language === "en" ? `${primero.total.toLocaleString("en-US")} detections, ${((primero.total / todos.total) * 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}% of the total.` : `${entero(primero.total)} detecciones, el ${decimal((primero.total / todos.total) * 100, 0)} % del total.`}
              </span>
            </dd>
          </div>
          <div>
            <dt>{language === "en" ? "Peak calendar month (Aqua average)" : "Mes pico"}</dt>
            <dd>
              <span className={estilos.valor}>{capitalizar(language === "en" ? new Date(Date.UTC(2020, aqua.mesPico - 1, 1)).toLocaleString("en-US", { month: "long", timeZone: "UTC" }) : nombreMes(aqua.mesPico))}</span>
              <span className={estilos.detalle}>
                {language === "en" ? `${pico.promedio.toLocaleString("en-US", { maximumFractionDigits: 0 })} detections per year on average, based on Aqua (${pico.anios} years with data).` : `${decimal(pico.promedio, 0)} focos en promedio cada año, según el satélite Aqua (${pico.anios} años con dato).`}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
