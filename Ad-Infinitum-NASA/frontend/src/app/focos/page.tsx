import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { FondoInicio } from "@/components/inicio/FondoInicio";
import { ContenidoFocos } from "@/components/sitio/ContenidoFocos";
import { ContenidoFocos as ContenidoFocosEn } from "@/presentation-en/components/sitio/ContenidoFocos";
import { Navegacion } from "@/components/sitio/Navegacion";
import { Pie } from "@/components/sitio/Pie";
import type { Resumen } from "@/lib/focos/tipos";
import datosResumen from "@/lib/generado/resumen.json";
import datosIncendios from "@/lib/generado/resumen-incendios.json";
import fondoIncendios from "@/fondo/incendios-san-luis.jpg";

// Photo: ANSL / Gobierno de San Luis, San Martín, September 21, 2024.
// https://agenciasanluis.com/2024/09/21/982750-los-incendios-que-afectan-a-la-provincia-desde-el-aire/

const resumenFocos = datosResumen as Resumen;
const resumenIncendios = datosIncendios as Resumen;

export const metadata: Metadata = {
  title: "Thermal hotspots and fires in San Luis | Eco Forensic",
  description:
    "Explore monthly thermal hotspots and fire-associated detections in San Luis, their seasonality and long-term trends.",
};

type Props = { searchParams: Promise<{ lang?: string }> };

async function FocosConIdioma({ searchParams }: Props) {
  const language = (await searchParams).lang === "es" ? "es" : "en";
  const Contenido = language === "en" ? ContenidoFocosEn : ContenidoFocos;
  return (
    <>
      <FondoInicio>
        <Image src={fondoIncendios} alt="" fill sizes="100vw" fetchPriority="high" loading="eager" placeholder="blur" />
      </FondoInicio>
      <Navegacion language={language} />
      <Contenido resumenFocos={resumenFocos} resumenIncendios={resumenIncendios} />
      <Pie resumen={resumenFocos} language={language} />
    </>
  );
}

export default function Focos(props: Props) {
  return (
    <Suspense fallback={<main id="contenido" className="contenedor seccion" lang="en" aria-busy="true">Loading satellite data…</main>}>
      <FocosConIdioma {...props} />
    </Suspense>
  );
}
