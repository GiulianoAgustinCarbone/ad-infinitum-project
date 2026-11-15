import estilos from "./Inicio.module.css";

const MOTIVOS = [
  {
    titulo: "Gestión de incendios",
    texto: "Saber en qué meses y departamentos se concentra el fuego ayuda a planificar la prevención y los recursos.",
  },
  {
    titulo: "Educación",
    texto: "Muestra cómo se lee un dato satelital y por qué una tendencia necesita una prueba estadística.",
  },
  {
    titulo: "Datos abiertos",
    texto: "Cada cifra sale de datos publicados y se puede descargar, revisar y volver a calcular.",
  },
];

export function PorQueImporta() {
  return (
    <section id="por-que" className="seccion seccion-alterna" aria-labelledby="titulo-por-que">
      <div className="contenedor">
        <div className="seccion-cabeza" data-revelar>
          <h2 id="titulo-por-que">Por qué importa</h2>
        </div>
        <ul className={estilos.motivos}>
          {MOTIVOS.map((m) => (
            <li key={m.titulo} data-revelar>
              <h3>{m.titulo}</h3>
              <p>{m.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
