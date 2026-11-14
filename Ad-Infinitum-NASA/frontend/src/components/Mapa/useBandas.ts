"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import type { Escala } from "@/lib/mapa/bandas";
import { CalculadorBandas } from "@/lib/mapa/calculador";
import type { Rejilla, VistaCampo } from "@/lib/mapa/rejilla";

const sinSuscripcion = () => () => {};
const versionCero = () => 0;

function crearWorker() {
  return new Worker(new URL("../../lib/mapa/bandas.worker.ts", import.meta.url), { type: "module" });
}

// Bandas del anio visible; volver a un anio ya calculado es inmediato
export function useBandas(
  rejilla: Rejilla | null,
  escalas: Record<VistaCampo, Escala> | null,
  vista: VistaCampo,
  indice: number,
) {
  const calculador = useMemo(
    () => (rejilla && escalas ? new CalculadorBandas(rejilla, escalas, crearWorker) : null),
    [rejilla, escalas],
  );
  useSyncExternalStore(
    calculador?.suscribir ?? sinSuscripcion,
    calculador?.leerVersion ?? versionCero,
    versionCero,
  );

  useEffect(() => {
    calculador?.priorizar(vista, indice);
  }, [calculador, vista, indice]);

  useEffect(() => () => calculador?.cerrar(), [calculador]);

  const actuales = calculador?.obtener(vista, indice) ?? null;
  return {
    bandas: actuales ?? calculador?.obtenerCercano(vista, indice) ?? null,
    calculando: calculador !== null && actuales === null,
    error: calculador?.error ?? null,
  };
}
