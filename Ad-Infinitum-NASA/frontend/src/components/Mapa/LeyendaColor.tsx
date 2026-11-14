import { fmt, fmtSigno } from "@/lib/formato";
import { paleta, type Dominio, type Vista } from "@/lib/mapa/escalas";
import estilos from "./LeyendaColor.module.css";

type Props = { vista: Vista; dominio: Dominio };

export function LeyendaColor({ vista, dominio: [min, max] }: Props) {
  const medio = (min + max) / 2;
  const etiqueta = (v: number) => (vista === "temperatura" ? fmt(v, 0) : fmtSigno(v, 1)) + " °C";
  const titulo = vista === "temperatura" ? "Temperatura media anual" : "Diferencia con el promedio de la celda";
  return (
    <figure className={estilos.leyenda}>
      <figcaption className={estilos.titulo}>{titulo}</figcaption>
      <div
        className={estilos.barra}
        style={{ background: `linear-gradient(to right, ${paleta(vista).join(", ")})` }}
        role="img"
        aria-label={`Escala de color de ${etiqueta(min)} a ${etiqueta(max)}`}
      />
      <div className={estilos.marcas} aria-hidden="true">
        <span>{etiqueta(min)}</span>
        <span>{etiqueta(medio)}</span>
        <span>{etiqueta(max)}</span>
      </div>
    </figure>
  );
}
