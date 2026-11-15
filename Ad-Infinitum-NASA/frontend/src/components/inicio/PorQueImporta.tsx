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

export function PorQueImporta({ language = "es" }: { language?: "es" | "en" }) {
  const motivos = language === "en" ? [
    { titulo: "Environmental and fire-risk planning", texto: "Historical monthly and departmental patterns can inform seasonal planning alongside current incident reports and official alerts. This dashboard is not an operational alert system." },
    { titulo: "Research and teaching", texto: "Examine sensor coverage, seasonality, missing records, and statistical uncertainty using a documented satellite series." },
    { titulo: "Open and reproducible analysis", texto: "Review the sources and methods, download available records, and reproduce the summaries behind the findings." },
  ] : MOTIVOS;
  return (
    <section id="por-que" className="seccion seccion-alterna" aria-labelledby="titulo-por-que" lang={language}>
      <div className="contenedor">
        <div className="seccion-cabeza" data-revelar>
          <h2 id="titulo-por-que">{language === "en" ? "How these records can be used" : "Por qué importa"}</h2>
        </div>
        <ul className={estilos.motivos}>
          {motivos.map((m) => (
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
