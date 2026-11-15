import type { Metadata } from "next";
import { WaterBalanceDashboard } from "@/components/balance/WaterBalanceDashboard";
import { Navegacion } from "@/components/sitio/Navegacion";
import { Pie } from "@/components/sitio/Pie";
import type { Resumen } from "@/lib/focos/tipos";
import datosResumen from "@/lib/generado/resumen.json";

const resumen = datosResumen as Resumen;

export const metadata: Metadata = {
  title: "Climate water balance | Eco Forensic",
  description:
    "Explore observed precipitation and evapotranspiration near San Luis reservoirs, with clearly labeled estimates through 2031.",
};

export default function WaterBalancePage() {
  return (
    <>
      <Navegacion language="en" />
      <main id="contenido" lang="en">
        <WaterBalanceDashboard />
      </main>
      <Pie resumen={resumen} language="en" />
    </>
  );
}
