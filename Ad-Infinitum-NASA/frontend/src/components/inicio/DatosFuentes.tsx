import { EstadoDato } from "@/components/sitio/EstadoDato";
import type { Resumen } from "@/lib/focos/tipos";
import { fechaLarga } from "@/lib/formato";
import estilos from "./Inicio.module.css";

const SERVICIOS = "https://services5.arcgis.com/HhpfpBpfJF3e3irA/arcgis/rest/services/";
const NOMBRE_SATELITE: Record<string, string> = { SNPP: "Suomi NPP", NOAA20: "NOAA-20" };

export function DatosFuentes({ resumen, language = "es" }: { resumen: Resumen; language?: "es" | "en" }) {
  const viirs = resumen.todos.porSatelite.filter((s) => s.sensor === "VIIRS");
  return (
    <section id="fuentes" className="seccion" aria-labelledby="titulo-fuentes" lang={language}>
      <div className={`contenedor ${estilos.fuentes}`} data-revelar>
        <div className="seccion-cabeza">
          <h2 id="titulo-fuentes">{language === "en" ? "Data and sources" : "Datos y fuentes"}</h2>
        </div>
        <div className={estilos.fuentesTexto}>
          <p className={estilos.atribucion}>
            {language === "en" ? "MODIS detections (NASA), distributed by CONAE and published by the Government of San Luis." : "Detecciones MODIS (NASA), distribuidas por CONAE y publicadas por el Gobierno de San Luis."}
          </p>
          <EstadoDato estado="real" language={language} />
          {viirs.length > 0 && (
            <p>
              {language === "en" ? "The record also includes VIIRS detections from " : "El registro incluye además detecciones VIIRS de "}
              {viirs.map((s) => `${NOMBRE_SATELITE[s.satelite] ?? s.satelite} (${language === "en" ? "since" : "desde"} ${s.desde})`).join(language === "en" ? " and " : " y ")}.
            </p>
          )}
          <p>
            {language === "en" ? "Layers published on " : "Capas publicadas en "}
            <a href={SERVICIOS} rel="noopener noreferrer">
              ArcGIS Online
            </a>
            , {language === "en" ? "downloaded on " : "descargadas el "}{language === "en" ? new Date(`${resumen.descargado}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }) : fechaLarga(resumen.descargado)}.
          </p>
          <p className={estilos.licencia}>
            {language === "en" ? <><strong>License pending.</strong> The source does not declare a usage license. Publication on this site is pending authorization from CONAE and the Government of San Luis.</> : <><strong>Licencia pendiente.</strong> La fuente no declara una licencia de uso. Su publicación en este sitio está pendiente de autorización de CONAE y del Gobierno de San Luis.</>}
          </p>
        </div>
      </div>
    </section>
  );
}
