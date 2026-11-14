import { decimal, entero } from "@/lib/formato";
import estilos from "./Graficos.module.css";

type Props = { ranking: { nombre: string; total: number }[] };

export function RankingDeptos({ ranking }: Props) {
  const max = ranking[0]?.total ?? 1;
  const total = ranking.reduce((s, d) => s + d.total, 0);
  return (
    <figure className={estilos.figura}>
      <figcaption>
        <p className={estilos.titulo}>Departamentos con más focos</p>
        <p className={estilos.subtitulo}>Total acumulado del satélite Aqua en todo el período.</p>
      </figcaption>
      <ol className={estilos.ranking}>
        {ranking.map((d) => (
          <li key={d.nombre}>
            <span>{d.nombre}</span>
            <span className={estilos.valor}>
              {entero(d.total)} ({decimal((d.total / total) * 100, 0)} %)
            </span>
            <span className={estilos.barra} style={{ width: `${(d.total / max) * 100}%` }} aria-hidden="true" />
          </li>
        ))}
      </ol>
    </figure>
  );
}
