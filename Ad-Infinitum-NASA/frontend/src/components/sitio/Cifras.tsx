import { NOMBRE_SATELITE } from "@/lib/focos/satelites";
import type { Resumen } from "@/lib/focos/tipos";
import { capitalizar, decimal, entero, fechaLarga, nombreMes } from "@/lib/formato";
import estilos from "./Cifras.module.css";

function duracion(desde: string, hasta: string): string {
  const [a0, m0] = desde.split("-").map(Number);
  const [a1, m1] = hasta.split("-").map(Number);
  const meses = (a1 - a0) * 12 + (m1 - m0) + 1;
  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  return resto ? `${anios} años y ${resto} ${resto === 1 ? "mes" : "meses"}` : `${anios} años`;
}

export function Cifras({ resumen }: { resumen: Resumen }) {
  const { todos, aqua } = resumen;
  const primero = todos.porDepto[0];
  const pico = aqua.estacionalidad.find((e) => e.mes === aqua.mesPico)!;
  const sats = todos.porSatelite;
  return (
    <section id="cifras" className="seccion" aria-labelledby="titulo-cifras">
      <div className={`contenedor ${estilos.grilla}`}>
        <div className={estilos.principal}>
          <h2 id="titulo-cifras" className={estilos.titulo}>
            Los datos en cifras
          </h2>
          <p className={estilos.numero}>{entero(todos.total)}</p>
          <p className={estilos.leyenda}>
            focos de calor detectados por satélite en San Luis entre el {fechaLarga(todos.fechaMin)} y el{" "}
            {fechaLarga(todos.fechaMax)}.
          </p>
        </div>
        <dl className={estilos.lista}>
          <div>
            <dt>Período cubierto</dt>
            <dd>
              <span className={estilos.valor}>{duracion(todos.fechaMin, todos.fechaMax)}</span>
              <span className={estilos.detalle}>
                de detecciones, con {sats.length} satélites:{" "}
                {sats.map((s, i) => (
                  <span key={s.satelite}>
                    {NOMBRE_SATELITE[s.satelite] ?? s.satelite} ({s.sensor}, desde {s.desde})
                    {i < sats.length - 2 ? ", " : i === sats.length - 2 ? " y " : "."}
                  </span>
                ))}
              </span>
            </dd>
          </div>
          <div>
            <dt>Departamento con más focos</dt>
            <dd>
              <span className={estilos.valor}>{primero.nombre}</span>
              <span className={estilos.detalle}>
                {entero(primero.total)} detecciones, el {decimal((primero.total / todos.total) * 100, 0)} % del total.
              </span>
            </dd>
          </div>
          <div>
            <dt>Mes pico</dt>
            <dd>
              <span className={estilos.valor}>{capitalizar(nombreMes(aqua.mesPico))}</span>
              <span className={estilos.detalle}>
                {decimal(pico.promedio, 0)} focos en promedio cada año, según el satélite Aqua ({pico.anios} años con
                dato).
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
