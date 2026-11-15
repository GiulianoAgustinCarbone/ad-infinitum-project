import type { Resumen } from "@/lib/focos/tipos";
import { fechaLarga } from "@/lib/formato";
import estilos from "./Pie.module.css";

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
          <p className={estilos.atribucion}>Datos: Gobierno de San Luis y NASA FIRMS</p>
          <p>
            Focos de calor y departamentos, descargados el {fechaLarga(resumen.descargado)}. La serie histórica no declara
            una licencia de uso; su publicación está pendiente de autorización.
          </p>
          <p>Límites de provincias: Natural Earth (dominio público). Mapa: MapLibre GL JS.</p>
        </div>
      </div>
    </footer>
  );
}
