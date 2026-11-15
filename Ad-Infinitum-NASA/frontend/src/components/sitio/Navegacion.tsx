"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EstadoDato } from "./EstadoDato";
import estilos from "./Navegacion.module.css";

// href null: la pagina todavia no existe y se muestra deshabilitada
export type Seccion = { texto: string; href: string | null };

export const SECCIONES: Seccion[] = [
  { texto: "Focos e incendios", href: "/focos" },
  { texto: "Sequía y diques", href: null },
  { texto: "Método", href: null },
  { texto: "Datos", href: null },
];

export function Navegacion() {
  const ruta = usePathname();
  const [abierta, setAbierta] = useState(false);
  const [solida, setSolida] = useState(false);

  // Transparente arriba de todo; al hacer scroll la barra toma fondo
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const disparador = ScrollTrigger.create({
      start: 12,
      end: "max",
      onToggle: (s) => setSolida(s.isActive),
    });
    return () => disparador.kill();
  }, []);

  useEffect(() => {
    if (!abierta) return;
    const cerrar = (e: KeyboardEvent) => e.key === "Escape" && setAbierta(false);
    window.addEventListener("keydown", cerrar);
    return () => window.removeEventListener("keydown", cerrar);
  }, [abierta]);

  return (
    <header className={estilos.barra} data-solida={solida || abierta}>
      <div className={`contenedor ${estilos.interior}`}>
        <Link href="/" className={estilos.marca} aria-current={ruta === "/" ? "page" : undefined}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3.2" className={estilos.marcaCentro} />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>Detective de Tendencias</span>
        </Link>
        <button
          type="button"
          className={estilos.menu}
          aria-expanded={abierta}
          aria-controls="menu-secciones"
          onClick={() => setAbierta((v) => !v)}
        >
          {abierta ? "Cerrar" : "Menú"}
        </button>
        <nav id="menu-secciones" aria-label="Principal" className={estilos.nav} data-abierta={abierta}>
          <ul>
            {SECCIONES.map((s) => (
              <li key={s.texto}>
                {s.href ? (
                  <Link
                    href={s.href}
                    aria-current={ruta === s.href ? "page" : undefined}
                    onClick={() => setAbierta(false)}
                  >
                    {s.texto}
                  </Link>
                ) : (
                  <span className={estilos.inactivo} aria-disabled="true">
                    {s.texto}
                    <EstadoDato estado="proximamente" compacta />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
