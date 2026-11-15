import Image from "next/image";
import { AnimacionesInicio } from "@/components/inicio/AnimacionesInicio";
import { Camino } from "@/components/inicio/Camino";
import { ComoFunciona } from "@/components/inicio/ComoFunciona";
import { DatosFuentes } from "@/components/inicio/DatosFuentes";
import { FondoInicio } from "@/components/inicio/FondoInicio";
import { Hallazgo } from "@/components/inicio/Hallazgo";
import { PorQueImporta } from "@/components/inicio/PorQueImporta";
import { Cifras } from "@/components/sitio/Cifras";
import { Hero } from "@/components/sitio/Hero";
import { Navegacion } from "@/components/sitio/Navegacion";
import { Pie } from "@/components/sitio/Pie";
import type { Resumen } from "@/lib/focos/tipos";
import fondoSanLuis from "@/fondo/san-luis.webp";
// Generado por scripts/preparar-datos.mts a partir de los datos reales
import datosResumen from "@/lib/generado/resumen.json";

const resumen = datosResumen as Resumen;

export default function Inicio() {
  return (
    <>
      {/* Espacio para el fondo de la primera pantalla: ver FondoInicio.tsx */}
      <FondoInicio>
        <Image src={fondoSanLuis} alt="" fill sizes="100vw" fetchPriority="high" loading="eager" placeholder="blur" />
      </FondoInicio>
      <Navegacion />
      <main id="contenido">
        <Hero resumen={resumen} />
        <Cifras resumen={resumen} />
        <Camino resumen={resumen} />
        <Hallazgo resumen={resumen} />
        <ComoFunciona resumen={resumen} />
        <PorQueImporta />
        <DatosFuentes resumen={resumen} />
      </main>
      <Pie resumen={resumen} />
      <AnimacionesInicio />
    </>
  );
}
