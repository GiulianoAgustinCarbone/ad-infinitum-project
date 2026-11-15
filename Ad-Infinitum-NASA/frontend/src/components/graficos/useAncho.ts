"use client";

import { useEffect, useRef, useState } from "react";

// Ancho real del contenedor: el SVG se dibuja en pixeles reales para que los
// textos de los ejes no se achiquen en pantallas angostas
export function useAncho<T extends HTMLElement>(inicial: number) {
  const ref = useRef<T>(null);
  const [ancho, setAncho] = useState(inicial);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setAncho(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, ancho };
}
