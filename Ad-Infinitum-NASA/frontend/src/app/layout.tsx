import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import datosResumen from "@/lib/generado/resumen.json";

const desde = datosResumen.todos.fechaMin.slice(0, 4);
const hasta = datosResumen.todos.fechaMax.slice(0, 4);

const titulos = Bricolage_Grotesque({
  variable: "--fuente-titulos",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
});

const texto = Atkinson_Hyperlegible_Next({
  variable: "--fuente-texto",
  subsets: ["latin"],
  // Next no tiene metricas de respaldo para esta familia
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Detective de Tendencias: el fuego en San Luis",
  description:
    `Cómo cambiaron los focos de calor detectados por satélite en la provincia de San Luis entre ${desde} y ${hasta}: cuándo, dónde y si hay una tendencia.`,
};

export const viewport: Viewport = {
  themeColor: "#13202d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${titulos.variable} ${texto.variable}`} suppressHydrationWarning>
      <body>
        {/* Marca que hay JavaScript antes de pintar, para que las animaciones de entrada no parpadeen */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a className="saltar" href="#contenido">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
