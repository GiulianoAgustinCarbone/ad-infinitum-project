import { EstadoDato } from "@/components/sitio/EstadoDato";
import { NOMBRE_SATELITE } from "@/lib/focos/satelites";
import type { Resumen } from "@/lib/focos/tipos";
import { fechaLarga } from "@/lib/formato";
import estilos from "./Inicio.module.css";

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
            Detecciones de calor de NASA FIRMS, y la serie histórica de focos hasta octubre de 2024 publicada por el
            Gobierno de San Luis. Las hectáreas quemadas vienen del producto de área quemada MCD64A1 de NASA.
          </p>
          <EstadoDato estado="real" />
          {viirs.length > 0 && (
            <p>
              El registro incluye además detecciones VIIRS de{" "}
              {viirs.map((s) => `${NOMBRE_SATELITE[s.satelite] ?? s.satelite} (desde ${s.desde})`).join(" y ")}.
            </p>
          )}
          <p>Datos descargados el {fechaLarga(resumen.descargado)}.</p>
          <p className={estilos.licencia}>
            <strong>Licencia pendiente.</strong> La serie histórica no declara una licencia de uso. Su publicación en este
            sitio está pendiente de autorización de la fuente original y del Gobierno de San Luis.
          </p>
        </div>
      </div>
    </section>
  );
}
