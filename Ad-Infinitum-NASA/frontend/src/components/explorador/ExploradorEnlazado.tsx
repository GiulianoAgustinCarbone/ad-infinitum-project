"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Modo } from "@/lib/focos/modo";
import { Explorador } from "./Explorador";
import estilos from "./Explorador.module.css";

type Rango = { desde: number; hasta: number };

// Lee ?anio=2009&mes=10 para abrir el explorador en ese mes (enlaces desde la pagina de inicio)
function ConParametros({ desde, hasta, modo }: Rango & { modo: Modo }) {
  const parametros = useSearchParams();
  const anio = Number(parametros.get("anio"));
  const mes = Number(parametros.get("mes"));
  const valido = Number.isInteger(anio) && anio >= desde && anio <= hasta && Number.isInteger(mes) && mes >= 1 && mes <= 12;
  // key: al cambiar de modo el explorador se reinicia con los datos del nuevo modo
  return <Explorador key={modo} inicial={valido ? { anio, mes } : undefined} modo={modo} />;
}

export function ExploradorEnlazado({ modo = "focos", ...rango }: Rango & { modo?: Modo }) {
  return (
    <Suspense fallback={<div className={estilos.mapaCargando}>Preparando el mapa…</div>}>
      <ConParametros {...rango} modo={modo} />
    </Suspense>
  );
}
