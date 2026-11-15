"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Explorador } from "./Explorador";
import estilos from "./Explorador.module.css";

type Rango = { desde: number; hasta: number };

// Lee ?anio=2009&mes=10 para abrir el explorador en ese mes (enlaces desde la pagina de inicio)
function ConParametros({ desde, hasta }: Rango) {
  const parametros = useSearchParams();
  const anio = Number(parametros.get("anio"));
  const mes = Number(parametros.get("mes"));
  const valido = Number.isInteger(anio) && anio >= desde && anio <= hasta && Number.isInteger(mes) && mes >= 1 && mes <= 12;
  return <Explorador inicial={valido ? { anio, mes } : undefined} />;
}

export function ExploradorEnlazado(rango: Rango) {
  return (
    <Suspense fallback={<div className={estilos.mapaCargando}>Preparando el mapa…</div>}>
      <ConParametros {...rango} />
    </Suspense>
  );
}
