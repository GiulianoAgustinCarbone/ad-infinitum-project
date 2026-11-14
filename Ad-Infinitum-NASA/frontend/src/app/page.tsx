import { Explorador } from "@/components/explorador/Explorador";
import { Cifras } from "@/components/sitio/Cifras";
import { Descargas } from "@/components/sitio/Descargas";
import { Estacionalidad } from "@/components/sitio/Estacionalidad";
import { Hero } from "@/components/sitio/Hero";
import { Metodo } from "@/components/sitio/Metodo";
import { Navegacion, type Enlace } from "@/components/sitio/Navegacion";
import { Pie } from "@/components/sitio/Pie";
import type { Resumen } from "@/lib/focos/tipos";
// Generado por scripts/preparar-datos.mts a partir de los datos reales
import datosResumen from "@/lib/generado/resumen.json";

const resumen = datosResumen as Resumen;

const ENLACES: Enlace[] = [
  { href: "#explorar", texto: "Explorar" },
  { href: "#estacionalidad", texto: "Estacionalidad" },
  { href: "#metodo", texto: "Método" },
];

export default function Inicio() {
  return (
    <>
      <Navegacion enlaces={ENLACES} />
      <main id="contenido">
        <Hero resumen={resumen} />
        <Cifras resumen={resumen} />
        <section id="explorar" className="seccion seccion-alterna" aria-labelledby="titulo-explorar">
          <div className="contenedor">
            <div className="seccion-cabeza">
              <h2 id="titulo-explorar">Explorá dónde y cuándo aparecen</h2>
              <p>
                Cada punto es un foco de calor detectado por satélite. Elegí un año y un mes, filtrá por departamento o
                reproducí el registro mes a mes.
              </p>
            </div>
            <Explorador />
          </div>
        </section>
        <Estacionalidad resumen={resumen} />
        <Metodo resumen={resumen} />
        <Descargas resumen={resumen} />
      </main>
      <Pie resumen={resumen} />
    </>
  );
}
