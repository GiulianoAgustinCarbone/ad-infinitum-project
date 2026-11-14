"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { datos } from "@/lib/data";
import estilos from "./Encabezado.module.css";

const ENLACES = [
  { href: "/", texto: "Explorar" },
  { href: "/comparar", texto: "Comparar sectores" },
] as const;

export function Encabezado() {
  const ruta = usePathname();
  return (
    <header className={estilos.encabezado}>
      <Link href="/" className={estilos.marca}>
        <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
          <circle cx="15" cy="15" r="12" fill="none" stroke="#1C211F" strokeWidth="2" />
          <path d="M3.5 16 C8 8, 12 22, 17 13 S 24 11, 26.5 14" fill="none" stroke="#C8643A" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        Detective de Tendencias
      </Link>
      <nav aria-label="Modo">
        <ul className={estilos.modos}>
          {ENLACES.map(({ href, texto }) => (
            <li key={href}>
              <Link href={href} aria-current={ruta === href ? "page" : undefined}>
                {texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {datos.ilustrativo && <span className={estilos.etiqueta}>Datos ilustrativos</span>}
    </header>
  );
}
