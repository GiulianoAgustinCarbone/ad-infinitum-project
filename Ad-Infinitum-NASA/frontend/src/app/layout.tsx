import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Encabezado } from "@/components/Encabezado";
import "./globals.css";

const titulos = Space_Grotesk({
  variable: "--fuente-titulos",
  subsets: ["latin"],
});

const texto = Inter({
  variable: "--fuente-texto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Detective de Tendencias",
  description: "Explora cómo cambió la temperatura de tu región entre 2005 y 2024 y compara dos sectores.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${titulos.variable} ${texto.variable}`}>
      <body>
        <Encabezado />
        {children}
      </body>
    </html>
  );
}
