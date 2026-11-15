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
      <Navegacion language="en" />
      <main id="contenido" lang="en">
        <Hero resumen={resumen} language="en" />
        <Cifras resumen={resumen} language="en" />
        <Camino resumen={resumen} language="en" />
        <Hallazgo resumen={resumen} language="en" />
        <ComoFunciona resumen={resumen} language="en" />
        <PorQueImporta language="en" />
        <DatosFuentes resumen={resumen} language="en" />
      </main>
      <Pie resumen={resumen} language="en" />
      <AnimacionesInicio />
    </>
  );
}
