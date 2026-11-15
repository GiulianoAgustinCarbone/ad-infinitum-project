import type { Metadata } from "next";
import { ContenidoFocos } from "@/components/sitio/ContenidoFocos";
import { Navegacion } from "@/components/sitio/Navegacion";
import { Pie } from "@/components/sitio/Pie";
import type { Resumen } from "@/lib/focos/tipos";
import datosResumen from "@/lib/generado/resumen.json";
import datosIncendios from "@/lib/generado/resumen-incendios.json";

const resumenFocos = datosResumen as Resumen;
const resumenIncendios = datosIncendios as Resumen;

export const metadata: Metadata = {
  title: "Focos de calor e incendios en San Luis | Detective de Tendencias",
  description:
    "Explorá mes a mes los focos de calor y los incendios confirmados en San Luis, su estacionalidad y su tendencia.",
};

export default function Focos() {
  return (
    <>
      <Navegacion />
      <ContenidoFocos resumenFocos={resumenFocos} resumenIncendios={resumenIncendios} />
      <Pie resumen={resumenFocos} />
    </>
  );
}
