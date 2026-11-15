import estilos from "./EstadoDato.module.css";

export type Estado = "real" | "ilustrativo" | "proximamente";

const TEXTO: Record<Estado, Record<"es" | "en", string>> = {
  real: { es: "Datos reales", en: "Real data" },
  ilustrativo: { es: "Datos ilustrativos", en: "Illustrative data" },
  proximamente: { es: "Próximamente", en: "Coming soon" },
};

// Insignia de estado del dato: texto e icono, nunca solo color
export function EstadoDato({ estado, compacta = false, language = "es" }: { estado: Estado; compacta?: boolean; language?: "es" | "en" }) {
  return (
    <span className={`${estilos.insignia} ${compacta ? estilos.compacta : ""}`} data-estado={estado}>
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" className={estilos.icono}>
        {estado === "real" && <circle cx="6" cy="6" r="4" />}
        {estado === "ilustrativo" && <path d="M6 1.5 11 10.5H1Z" />}
        {estado === "proximamente" && (
          <>
            <circle cx="6" cy="6" r="4.5" />
            <path d="M6 3.5V6l1.8 1.2" />
          </>
        )}
      </svg>
      {TEXTO[estado][language]}
    </span>
  );
}
