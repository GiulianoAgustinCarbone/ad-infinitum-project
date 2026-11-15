"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import estilos from "@/app/focos/focos.module.css";
import { ExploradorEnlazado } from "@/components/explorador/ExploradorEnlazado";
import { Descargas } from "@/components/sitio/Descargas";
import { Estacionalidad } from "@/components/sitio/Estacionalidad";
import { EstadoDato } from "@/components/sitio/EstadoDato";
import { Metodo } from "@/components/sitio/Metodo";
import { MetodoIncendios } from "@/components/sitio/MetodoIncendios";
import modoEstilos from "@/components/sitio/ModoFocos.module.css";
import { MODOS, type Modo } from "@/lib/focos/modo";
import type { Resumen } from "@/lib/focos/tipos";
import { entero } from "@/lib/formato";

type Props = { resumenFocos: Resumen; resumenIncendios: Resumen };

const ATAJOS = [
  { href: "#explorar", texto: "Mapa" },
  { href: "#estacionalidad", texto: "Estacionalidad y tendencia" },
  { href: "#metodo", texto: "Cómo lo calculamos" },
  { href: "#descargas", texto: "Descargas" },
];

function Selector({ modo }: { modo: Modo }) {
  return (
    <nav aria-label="Qué mostrar" className={modoEstilos.selector}>
      {MODOS.map((m) => {
        const activa = m.valor === modo;
        return (
          <Link
            key={m.valor}
            href={m.valor === "focos" ? "/focos" : "/focos?modo=incendios"}
            scroll={false}
            aria-current={activa ? "page" : undefined}
            className={`${modoEstilos.opcion} ${activa ? modoEstilos.activa : ""}`}
          >
            {m.etiqueta}
          </Link>
        );
      })}
    </nav>
  );
}

function Contenido({ modo, resumenFocos, resumenIncendios }: Props & { modo: Modo }) {
  const incendios = modo === "incendios";
  const resumen = incendios ? resumenIncendios : resumenFocos;
  const desde = Number(resumen.todos.fechaMin.slice(0, 4));
  const hasta = Number(resumen.todos.fechaMax.slice(0, 4));
  // Claves internas de origen: "CONAE" es la serie histórica y "FIRMS" es NASA FIRMS
  const totalDe = (origen: string) => resumen.todos.porOrigen.find((o) => o.origen === origen)?.total ?? 0;
  const historica = totalDe("CONAE");
  const firms = totalDe("FIRMS");

  return (
    <main id="contenido">
      <header className={`contenedor ${estilos.cabeza}`}>
        <EstadoDato estado="real" />
        <h1>{incendios ? "Incendios confirmados en San Luis" : "Focos de calor en San Luis"}</h1>
        <p>
          {incendios
            ? `Incendios confirmados entre ${desde} y ${hasta}: dónde y cuándo aparecen, cuánta superficie quemaron y si hay una tendencia.`
            : `Detecciones satelitales de ${desde} a ${hasta}: dónde y cuándo aparecen, cómo se reparten en el año y si hay una tendencia.`}
        </p>
        <Selector modo={modo} />
        <nav aria-label="En esta página">
          <ul className={estilos.atajos}>
            {ATAJOS.map((a) => (
              <li key={a.href}>
                <a href={a.href}>{a.texto}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section id="explorar" className="seccion seccion-alterna" aria-labelledby="titulo-explorar">
        <div className="contenedor">
          <div className="seccion-cabeza">
            <h2 id="titulo-explorar">Explorá dónde y cuándo aparecen</h2>
            <p>
              {incendios
                ? "Cada punto es un foco de calor confirmado como incendio: tuvo un píxel quemado a menos de 1 km en el mismo mes. Elegí un año y un mes, filtrá por departamento o reproducí el registro mes a mes."
                : "Cada punto es un foco de calor detectado por satélite. Elegí un año y un mes, filtrá por departamento o reproducí el registro mes a mes."}
            </p>
          </div>
          <p className="nota">
            {incendios
              ? `${entero(resumen.todos.total)} incendios confirmados: ${entero(historica)} de la serie histórica (hasta octubre de 2024) y ${entero(firms)} de NASA FIRMS. Las hectáreas quemadas de la tendencia y la matriz vienen de MCD64A1 y no son una cantidad de focos.`
              : `${entero(resumen.todos.total)} focos en total: ${entero(historica)} de la serie histórica (hasta octubre de 2024) y ${entero(firms)} de NASA FIRMS, que completa los meses que la serie no registra y el período posterior. La serie de Aqua que se usa para comparar años sigue siendo solo la serie histórica.`}
          </p>
          <ExploradorEnlazado desde={desde} hasta={hasta} modo={modo} />
        </div>
      </section>

      <Estacionalidad resumen={resumen} modo={modo} />
      {incendios ? <MetodoIncendios resumen={resumen} /> : <Metodo resumen={resumen} />}
      <Descargas resumen={resumen} modo={modo} />
    </main>
  );
}

function ConModo(props: Props) {
  const parametros = useSearchParams();
  const modo: Modo = parametros.get("modo") === "incendios" ? "incendios" : "focos";
  return <Contenido modo={modo} {...props} />;
}

// El modo se lee de la URL (?modo=incendios). Suspense permite prerenderizar la pagina en modo focos.
export function ContenidoFocos(props: Props) {
  return (
    <Suspense fallback={<Contenido modo="focos" {...props} />}>
      <ConModo {...props} />
    </Suspense>
  );
}
