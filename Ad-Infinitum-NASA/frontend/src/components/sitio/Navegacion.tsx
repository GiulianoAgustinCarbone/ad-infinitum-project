"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EstadoDato } from "./EstadoDato";
import estilos from "./Navegacion.module.css";

// href null: la pagina todavia no existe y se muestra deshabilitada
export type Seccion = { texto: string; href: string | null };

export const SECCIONES: Seccion[] = [
  { texto: "Focos de calor", href: "/focos" },
  { texto: "Sequía y diques", href: null },
  { texto: "Método", href: null },
  { texto: "Datos", href: null },
];

const SECCIONES_EN: Seccion[] = [
  { texto: "Heat hotspots", href: "/focos" },
  { texto: "Drought & reservoirs", href: null },
  { texto: "Method", href: null },
  { texto: "Data", href: null },
];

export function Navegacion({ language = "es" }: { language?: "es" | "en" }) {
  const ruta = usePathname();
  const [abierta, setAbierta] = useState(false);
  const [solida, setSolida] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    const saltar = document.querySelector<HTMLAnchorElement>(".saltar");
    if (saltar) saltar.textContent = language === "en" ? "Skip to main content" : "Saltar al contenido";
  }, [language]);

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
    <header className={estilos.barra} data-solida={solida || abierta} lang={language}>
      <div className={`contenedor ${estilos.interior}`}>
        <Link
          href="/"
          className={estilos.marca}
          aria-current={ruta === "/" ? "page" : undefined}
          onClick={(e) => {
            setAbierta(false);
            if (ruta !== "/") return;
            e.preventDefault();
            const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reducirMovimiento ? "auto" : "smooth" });
          }}
        >
          <Image
            src="/branding/eco-forensic-mark.webp"
            alt=""
            width={320}
            height={284}
            priority
            className={estilos.logo}
          />
          <span className={estilos.marcaTexto}>Eco Forensic</span>
        </Link>
        <button
          type="button"
          className={estilos.menu}
          aria-expanded={abierta}
          aria-controls="menu-secciones"
          onClick={() => setAbierta((v) => !v)}
        >
          {language === "en" ? (abierta ? "Close" : "Menu") : abierta ? "Cerrar" : "Menú"}
        </button>
        <nav id="menu-secciones" aria-label={language === "en" ? "Main" : "Principal"} className={estilos.nav} data-abierta={abierta}>
          <ul>
            {(language === "en" ? SECCIONES_EN : SECCIONES).map((s) => (
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
                    <EstadoDato estado="proximamente" compacta language={language} />
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
