"use client";

import { useCallback, useEffect, useState } from "react";
import { datos } from "@/lib/data";
import { conMedia, type GrillaConMedia } from "@/lib/mapa/escalas";

export type EstadoGrilla =
  | { tipo: "cargando" }
  | { tipo: "error"; mensaje: string }
  | { tipo: "listo"; grilla: GrillaConMedia };

export function useGrilla() {
  const [estado, setEstado] = useState<EstadoGrilla>({ tipo: "cargando" });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let vigente = true;
    datos
      .getGrilla()
      .then((g) => vigente && setEstado({ tipo: "listo", grilla: conMedia(g) }))
      .catch((e: unknown) => {
        if (vigente) setEstado({ tipo: "error", mensaje: e instanceof Error ? e.message : String(e) });
      });
    return () => {
      vigente = false;
    };
  }, [intento]);

  const reintentar = useCallback(() => {
    setEstado({ tipo: "cargando" });
    setIntento((n) => n + 1);
  }, []);

  return { estado, reintentar };
}
