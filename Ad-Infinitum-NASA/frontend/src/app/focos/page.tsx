import type { Metadata } from "next";
import { ExploradorEnlazado } from "@/components/explorador/ExploradorEnlazado";
import { Descargas } from "@/components/sitio/Descargas";
import { Estacionalidad } from "@/components/sitio/Estacionalidad";
import { EstadoDato } from "@/components/sitio/EstadoDato";
import { Metodo } from "@/components/sitio/Metodo";
import { Navegacion } from "@/components/sitio/Navegacion";
import { Pie } from "@/components/sitio/Pie";
import type { Resumen } from "@/lib/focos/tipos";
import { entero } from "@/lib/formato";
import datosResumen from "@/lib/generado/resumen.json";
import estilos from "./focos.module.css";

const resumen = datosResumen as Resumen;

export const metadata: Metadata = {
  title: "Focos de calor en San Luis | Detective de Tendencias",
  description:
    "Explorá mes a mes los focos de calor detectados por satélite en San Luis, su estacionalidad y su tendencia.",
};

const ATAJOS = [
  { href: "#explorar", texto: "Mapa" },
  { href: "#estacionalidad", texto: "Estacionalidad y tendencia" },
  { href: "#metodo", texto: "Cómo lo calculamos" },
  { href: "#descargas", texto: "Descargas" },
];

export default function Focos() {
  const desde = Number(resumen.todos.fechaMin.slice(0, 4));
  const hasta = Number(resumen.todos.fechaMax.slice(0, 4));
  return (
    <>
      <Navegacion />
      <main id="contenido">
        <header className={`contenedor ${estilos.cabeza}`}>
          <EstadoDato estado="real" />
          <h1>Focos de calor en San Luis</h1>
          <p>
            Detecciones satelitales de {desde} a {hasta}: dónde y cuándo aparecen, cómo se reparten en el año y si
            hay una tendencia.
          </p>
          <nav aria-label="En esta página">
            <ul className={estilos.atajos}>
              {ATAJOS.map((a) => (
                <li key={a.href}>
                  <a href={a.href}>{a.texto}</a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <section id="explorar" className="seccion seccion-alterna" aria-labelledby="titulo-explorar">
          <div className="contenedor">
            <div className="seccion-cabeza">
              <h2 id="titulo-explorar">Explorá dónde y cuándo aparecen</h2>
              <p>
                Cada punto es un foco de calor detectado por satélite. Elegí un año y un mes, filtrá por departamento o
                reproducí el registro mes a mes.
              </p>
            </div>
            <p className="nota">
              {entero(resumen.todos.total)} focos de calor en total. Fuente: NASA FIRMS. Para comparar años usamos la serie del satélite Aqua.
            </p>
            <ExploradorEnlazado desde={desde} hasta={hasta} />
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
