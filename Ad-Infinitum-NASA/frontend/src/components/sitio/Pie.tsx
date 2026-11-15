import type { Resumen } from "@/lib/focos/tipos";
import { fechaLarga } from "@/lib/formato";
import estilos from "./Pie.module.css";

const SERVICIOS = "https://services5.arcgis.com/HhpfpBpfJF3e3irA/arcgis/rest/services/";

export function Pie({ resumen, language = "es" }: { resumen: Resumen; language?: "es" | "en" }) {
  return (
    <footer className={estilos.pie} lang={language}>
      <div className={`contenedor ${estilos.grilla}`}>
        <div>
          <p className={estilos.marca}>Eco Forensic</p>
          <p>{language === "en" ? "Ad Infinitum team · NASA Space Apps Challenge 2026." : "Equipo Ad Infinitum · NASA Space Apps Challenge 2026."}</p>
          <p>{language === "en" ? "Scope: San Luis Province, Argentina." : "Alcance: provincia de San Luis, Argentina."}</p>
        </div>
        <div>
          <p className={estilos.atribucion}>{language === "en" ? "Data: CONAE / Government of San Luis" : "Datos: CONAE / Gobierno de San Luis"}</p>
          <p>
            {language === "en" ? "Hotspots, departments, and reservoirs published on " : "Focos de calor, departamentos y embalses publicados en "}
            <a href={SERVICIOS} rel="noopener noreferrer">
              ArcGIS Online
            </a>
            , {language === "en" ? "downloaded on " : "descargados el "}{language === "en" ? new Date(`${resumen.descargado}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }) : fechaLarga(resumen.descargado)}. {language === "en" ? "The source does not declare a usage license; publication is pending authorization." : "La fuente no declara una licencia de uso; su publicación está pendiente de autorización."}
          </p>
          <p>{language === "en" ? "Province boundaries: Natural Earth (public domain). Map: MapLibre GL JS." : "Límites de provincias: Natural Earth (dominio público). Mapa: MapLibre GL JS."}</p>
        </div>
      </div>
    </footer>
  );
}
