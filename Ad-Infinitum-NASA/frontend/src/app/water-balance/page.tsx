import type { Metadata } from "next";
import Image from "next/image";
import { WaterBalanceDashboard } from "@/components/balance/WaterBalanceDashboard";
import { FondoInicio } from "@/components/inicio/FondoInicio";
import { Navegacion } from "@/components/sitio/Navegacion";
import { Pie } from "@/components/sitio/Pie";
import type { Resumen } from "@/lib/focos/tipos";
import fondoBalance from "@/fondo/water-balance.webp";
import datosResumen from "@/lib/generado/resumen.json";

const resumen = datosResumen as Resumen;

export const metadata: Metadata = {
  title: "Water balance near San Luis reservoirs | Eco Forensic",
  description:
    "Explore rainfall, evapotranspiration, and aridity trends near San Luis reservoirs using observed climate records and clearly labeled estimates.",
};

export default function WaterBalancePage() {
  return (
    <>
      <FondoInicio extendido>
        <Image src={fondoBalance} alt="" fill sizes="100vw" fetchPriority="high" loading="eager" placeholder="blur" />
      </FondoInicio>
      <Navegacion language="en" />
      <main id="contenido" lang="en">
        <WaterBalanceDashboard />
      </main>
      <Pie resumen={resumen} language="en" />
    </>
  );
}
