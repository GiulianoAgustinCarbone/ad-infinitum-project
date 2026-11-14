import { fmt, fmtSigno } from "@/lib/formato";
import type { Escala } from "@/lib/mapa/bandas";
import type { VistaCampo } from "@/lib/mapa/rejilla";
import estilos from "./LeyendaBandas.module.css";

type Props = { vista: VistaCampo; escala: Escala };

// Columna de clases de arriba (mas calido) hacia abajo, con cada corte
// escrito sobre el limite entre dos clases
export function LeyendaBandas({ vista, escala }: Props) {
  const etiqueta = (c: number) => (vista === "anomalia" ? fmtSigno(c, 1) : fmt(c, 0));
  const titulo = vista === "anomalia" ? "Anomalía (°C)" : "Temperatura (°C)";
  const clases = escala.colores.map((color, k) => ({ color, corte: escala.cortes[k - 1] })).reverse();
  const n = escala.cortes.length;
  const descripcion = `Escala de ${n + 1} clases con cortes en ${escala.cortes.map(etiqueta).join(", ")} °C`;

  return (
    <figure className={estilos.leyenda}>
      <figcaption className={estilos.titulo}>{titulo}</figcaption>
      <div className={estilos.columna} role="img" aria-label={descripcion}>
        {clases.map(({ color, corte }, k) => (
          <div key={k} className={estilos.clase}>
            <span className={estilos.color} style={{ background: color }} />
            {corte !== undefined && <span className={estilos.corte}>{etiqueta(corte)}</span>}
          </div>
        ))}
      </div>
    </figure>
  );
}
