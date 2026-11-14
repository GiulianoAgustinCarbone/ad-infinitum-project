"use client";

import { useEffect, useState } from "react";
import estilos from "./Navegacion.module.css";

export type Enlace = { href: string; texto: string };

export function Navegacion({ enlaces }: { enlaces: Enlace[] }) {
  const [abierta, setAbierta] = useState(false);
  const [activa, setActiva] = useState<string | null>(null);

  // Marca la seccion visible para orientar al lector
  useEffect(() => {
    const secciones = enlaces
      .map((e) => document.querySelector<HTMLElement>(e.href))
      .filter((s): s is HTMLElement => s !== null);
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setActiva(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secciones.forEach((s) => observador.observe(s));
    return () => observador.disconnect();
  }, [enlaces]);

  useEffect(() => {
    if (!abierta) return;
    const cerrar = (e: KeyboardEvent) => e.key === "Escape" && setAbierta(false);
    window.addEventListener("keydown", cerrar);
    return () => window.removeEventListener("keydown", cerrar);
  }, [abierta]);

  return (
    <header className={estilos.barra}>
      <div className={`contenedor ${estilos.interior}`}>
        <a href="#inicio" className={estilos.marca}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3.2" fill="#f07f4f" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>Detective de Tendencias</span>
        </a>
        <button
          type="button"
          className={estilos.menu}
          aria-expanded={abierta}
          aria-controls="menu-secciones"
          onClick={() => setAbierta((v) => !v)}
        >
          {abierta ? "Cerrar" : "Secciones"}
        </button>
        <nav id="menu-secciones" aria-label="Secciones" className={estilos.nav} data-abierta={abierta}>
          <ul>
            {enlaces.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  aria-current={activa === e.href ? "location" : undefined}
                  onClick={() => setAbierta(false)}
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
          <a className="boton boton-principal" href="#descargas" onClick={() => setAbierta(false)}>
            Descargar informe
          </a>
        </nav>
      </div>
    </header>
  );
}
