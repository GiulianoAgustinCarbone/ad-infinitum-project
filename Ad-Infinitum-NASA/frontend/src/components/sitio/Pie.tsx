import type { Resumen } from "@/lib/focos/tipos";
import { fechaLarga } from "@/lib/formato";
import estilos from "./Pie.module.css";

const SERVICIOS = "https://services5.arcgis.com/HhpfpBpfJF3e3irA/arcgis/rest/services/";

export function Pie({ resumen }: { resumen: Resumen }) {
  return (
    <footer className={estilos.pie}>
      <div className={`contenedor ${estilos.grilla}`}>
        <div>
          <p className={estilos.marca}>Detective de Tendencias</p>
          <p>Equipo Ad Infinitum · NASA Space Apps Challenge 2026.</p>
          <p>Alcance: provincia de San Luis, Argentina.</p>
        </div>
        <div>
          <p className={estilos.atribucion}>Datos: CONAE / Gobierno de San Luis</p>
          <p>
            Focos de calor, departamentos y embalses publicados en{" "}
            <a href={SERVICIOS} rel="noopener noreferrer">
              ArcGIS Online
            </a>
            , descargados el {fechaLarga(resumen.descargado)}. La fuente no declara una licencia de uso; su
            publicación está pendiente de autorización.
          </p>
          <p>Límites de provincias: Natural Earth (dominio público). Mapa: MapLibre GL JS.</p>
        </div>
      </div>
    </footer>
  );
}
