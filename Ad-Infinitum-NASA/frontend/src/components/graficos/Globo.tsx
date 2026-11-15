"use client";

import { useState, type ReactNode } from "react";
import estilos from "./Graficos.module.css";

export type EstadoGlobo = { x: number; y: number; contenido: ReactNode } | null;

// Globo de lectura posicionado en porcentaje del contenedor del grafico
export function useGlobo() {
  const [globo, setGlobo] = useState<EstadoGlobo>(null);
  const nodo = globo ? (
    <div className={estilos.globo} style={{ left: `${globo.x}%`, top: `${globo.y}%` }} role="status">
      {globo.contenido}
    </div>
  ) : null;
  return { globo: nodo, mostrar: setGlobo, ocultar: () => setGlobo(null) };
}
