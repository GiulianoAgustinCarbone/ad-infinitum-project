import { EstadoDato } from "@/components/sitio/EstadoDato";
import { NOMBRE_SATELITE } from "@/lib/focos/satelites";
import type { Resumen } from "@/lib/focos/tipos";
import { fechaLarga } from "@/lib/formato";
import estilos from "./Inicio.module.css";

const SERVICIOS = "https://services5.arcgis.com/HhpfpBpfJF3e3irA/arcgis/rest/services/";

export function DatosFuentes({ resumen }: { resumen: Resumen }) {
  const viirs = resumen.todos.porSatelite.filter((s) => s.sensor === "VIIRS");
  return (
    <section id="fuentes" className="seccion" aria-labelledby="titulo-fuentes">
      <div className={`contenedor ${estilos.fuentes}`} data-revelar>
        <div className="seccion-cabeza">
          <h2 id="titulo-fuentes">Datos y fuentes</h2>
        </div>
        <div className={estilos.fuentesTexto}>
          <p className={estilos.atribucion}>
            Focos de calor de CONAE, publicados por el Gobierno de San Luis, y detecciones de NASA FIRMS para los meses
            que CONAE no registró y para el periodo posterior a octubre de 2024.
          </p>
          <EstadoDato estado="real" />
          {viirs.length > 0 && (
            <p>
              El registro incluye además detecciones VIIRS de{" "}
              {viirs.map((s) => `${NOMBRE_SATELITE[s.satelite] ?? s.satelite} (desde ${s.desde})`).join(" y ")}.
            </p>
          )}
          <p>
            Capas publicadas en{" "}
            <a href={SERVICIOS} rel="noopener noreferrer">
              ArcGIS Online
            </a>
            , descargadas el {fechaLarga(resumen.descargado)}.
          </p>
          <p className={estilos.licencia}>
            <strong>Licencia pendiente.</strong> La fuente no declara una licencia de uso. Su publicación en este
            sitio está pendiente de autorización de CONAE y del Gobierno de San Luis.
          </p>
        </div>
      </div>
    </section>
  );
}
