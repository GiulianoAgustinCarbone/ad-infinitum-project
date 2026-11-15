"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import estilos from "@/app/focos/focos.module.css";
import acabado from "./AcabadoFocos.module.css";
import { ExploracionTemporal } from "./ExploracionTemporal";
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

function Atajos() {
  const [activa, setActiva] = useState("#explorar");
  useEffect(() => {
    let cuadro = 0;
    const actualizar = () => {
      cuadro = 0;
      let actual = ATAJOS[0].href;
      for (const atajo of ATAJOS) {
        const seccion = document.getElementById(atajo.href.slice(1));
        if (seccion && seccion.getBoundingClientRect().top <= window.innerHeight * .35) actual = atajo.href;
      }
      setActiva(actual);
    };
    const alDesplazar = () => { if (!cuadro) cuadro = requestAnimationFrame(actualizar); };
    const alCambiarEnlace = () => {
      if (ATAJOS.some((a) => a.href === window.location.hash)) setActiva(window.location.hash);
    };
    actualizar();
    alCambiarEnlace();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("hashchange", alCambiarEnlace);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("hashchange", alCambiarEnlace);
    };
  }, []);
  return (
    <nav aria-label="En esta página" className={estilos.navegacionSecciones}>
      <ul className={estilos.atajos}>
        {ATAJOS.map((a, i) => (
          <li key={a.href}>
            <a href={a.href} aria-current={activa === a.href ? "location" : undefined} onClick={() => setActiva(a.href)}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {i === 0 && <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5ZM9 3v16M15 5v16" />}
                {i === 1 && <path d="m3 17 6-6 4 4 8-10M15 5h6v6" />}
                {i === 2 && <path d="M12 5c-3-2-6-2-10-1v16c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v16" />}
                {i === 3 && <path d="M12 3v12m-5-5 5 5 5-5M3 16v5h18v-5" />}
              </svg>
              {a.texto}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

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
            <span className={modoEstilos.icono} aria-hidden="true">
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {m.valor === "focos" ? (
                  <><path d="m8 4 4 4-4 4-4-4 4-4Zm8 8 4 4-4 4-4-4 4-4ZM13 3l2-2 4 4-2 2M3 13l-2 2 4 4 2-2M10 10l4 4M17 10l3-3M7 17l-3 3" /></>
                ) : (
                  <path d="M13 2c1 5-3 5-2 9 1 2 3 2 4 0 3 3 4 5 3 8-1 3-4 4-7 3-4-1-6-5-4-9 0 3 2 4 3 3-3-6 3-8 3-14Z" />
                )}
              </svg>
            </span>
            <span className={modoEstilos.textos}>
              <strong>{m.etiqueta}</strong>
              <span>{m.valor === "focos"
                ? "Anomalías térmicas detectadas por satélite. Incluyen quemas controladas y otras fuentes de calor."
                : "Detecciones asociadas a una cicatriz de quema cercana en el mismo mes. Incluye el análisis de superficie quemada."}</span>
            </span>
            <span className={modoEstilos.indicador} aria-hidden="true">{activa && <span />}</span>
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
    <main id="contenido" className={acabado.pagina}>
      <header className={`contenedor ${estilos.cabeza}`}>
        <EstadoDato estado="real" />
        <h1>{incendios ? "Incendios confirmados en San Luis" : "Focos de calor en San Luis"}</h1>
        <p>
          {incendios
            ? `Incendios confirmados entre ${desde} y ${hasta}: dónde y cuándo aparecen, cuánta superficie quemaron y si hay una tendencia.`
            : `Detecciones satelitales de ${desde} a ${hasta}: dónde y cuándo aparecen, cómo se reparten en el año y si hay una tendencia.`}
        </p>
        <div className={modoEstilos.registro}>
          <div className={modoEstilos.cabecera}>
            <span className={modoEstilos.titulo}>Tipo de registro</span>
            <span className={modoEstilos.ayuda}>Elegí qué mostrar en el mapa y las métricas</span>
          </div>
          <Selector modo={modo} />
        </div>
        <Atajos />
      </header>

      <ExploracionTemporal
        desde={desde}
        hasta={hasta}
        modo={modo}
        nota={incendios
          ? `${entero(resumen.todos.total)} incendios confirmados: ${entero(historica)} de la serie histórica y ${entero(firms)} de NASA FIRMS.`
          : `${entero(resumen.todos.total)} focos en total: ${entero(historica)} de la serie histórica y ${entero(firms)} de NASA FIRMS. Para la tendencia se analizan años completos de Aqua.`}
      />

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
