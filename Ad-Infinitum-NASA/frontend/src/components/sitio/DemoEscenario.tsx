"use client";

import { useEffect, useRef, useState } from "react";
import type { Modo } from "@/lib/focos/modo";
import estilos from "./DemoEscenario.module.css";

export function DemoEscenario({ integrado = false, espacioControles = 220, modo = "focos" }: { integrado?: boolean; espacioControles?: number; modo?: Modo }) {
  const marco = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    marco.current?.contentDocument?.documentElement.style.setProperty("--espacio-controles", `${espacioControles}px`);
  }, [espacioControles]);
  const observador = useRef<ResizeObserver | null>(null);
  const [alto, setAlto] = useState(1100);

  useEffect(() => () => observador.current?.disconnect(), []);

  return (
    <div id="demo-escenario-futuro" className={integrado ? estilos.integrado : estilos.area} role="region" aria-label={modo === "incendios" ? "Escenario futuro basado en incendios" : "Escenario futuro de focos de calor"}>
      <iframe
        ref={marco}
        className={estilos.demo}
        src={modo === "incendios" ? "/demo/escenario-incendios.html" : "/demo/escenario-futuro.html"}
        title={modo === "incendios" ? "Escenario futuro: detecciones de incendios simuladas durante diez años" : "Escenario futuro: evolución mensual de focos simulados en San Luis durante diez años"}
        style={{ height: alto }}
        onLoad={(evento) => {
          observador.current?.disconnect();
          const documento = evento.currentTarget.contentDocument;
          if (integrado && documento) {
            documento.documentElement.style.setProperty("--espacio-controles", `${espacioControles}px`);
            const ajustes = documento.createElement("style");
            ajustes.textContent = `
              .shell{max-width:none;padding:0}
              .heading{display:none}
              .explorer{grid-template-columns:minmax(0,1fr) 340px;gap:24px}
              .panel{padding-top:var(--espacio-controles,220px)}
              @media(max-width:960px){
                .explorer{grid-template-columns:minmax(0,1fr)}
                .panel{padding-top:0;grid-template-columns:1fr}
                .group.period,.group.where,.maplegend{grid-column:auto;grid-row:auto}
              }
            `;
            documento.head.appendChild(ajustes);
          }
          const cuerpo = documento?.body;
          if (!cuerpo) return;
          const ajustar = () => setAlto(Math.ceil(cuerpo.scrollHeight));
          observador.current = new ResizeObserver(ajustar);
          observador.current.observe(cuerpo);
          ajustar();
        }}
      />
    </div>
  );
}
