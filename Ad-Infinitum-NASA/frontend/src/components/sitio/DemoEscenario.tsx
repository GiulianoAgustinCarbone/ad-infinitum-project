"use client";

import { useEffect, useRef, useState } from "react";
import estilos from "./DemoEscenario.module.css";

export function DemoEscenario() {
  const observador = useRef<ResizeObserver | null>(null);
  const [alto, setAlto] = useState(1100);

  useEffect(() => () => observador.current?.disconnect(), []);

  return (
    <div id="demo-escenario-futuro" className={estilos.area} role="region" aria-label="Escenario futuro de focos de calor">
      <iframe
        className={estilos.demo}
        src="/demo/escenario-futuro.html"
        title="Escenario futuro: evolución mensual de focos simulados en San Luis durante diez años"
        style={{ height: alto }}
        onLoad={(evento) => {
          observador.current?.disconnect();
          const cuerpo = evento.currentTarget.contentDocument?.body;
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
