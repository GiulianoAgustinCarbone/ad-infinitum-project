"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import estilos from "./PanelLateral.module.css";

// Columna de controles en escritorio; hoja inferior con boton "Filtros" en movil
export function PanelLateral({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(false);
  const hoja = useRef<HTMLElement>(null);
  const disparador = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!abierto) return;
    hoja.current?.focus();
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        disparador.current?.focus();
      }
    };
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  return (
    <>
      <aside
        id="panel-controles"
        ref={hoja}
        tabIndex={-1}
        className={estilos.panel}
        data-abierto={abierto}
        aria-label="Controles"
      >
        <div className={estilos.cabeceraHoja}>
          <h2>Filtros</h2>
          <button
            type="button"
            className={estilos.cerrar}
            onClick={() => {
              setAbierto(false);
              disparador.current?.focus();
            }}
          >
            Cerrar
          </button>
        </div>
        {children}
      </aside>
      {abierto && <div className={estilos.velo} onClick={() => setAbierto(false)} aria-hidden="true" />}
      <button
        ref={disparador}
        type="button"
        className={estilos.abrir}
        aria-expanded={abierto}
        aria-controls="panel-controles"
        onClick={() => setAbierto(true)}
      >
        Filtros
      </button>
    </>
  );
}
