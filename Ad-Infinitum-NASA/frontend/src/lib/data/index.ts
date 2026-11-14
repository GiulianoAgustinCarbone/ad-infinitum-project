import { fuenteApi } from "./api";
import { fuenteFocos } from "./focos";
import { fuenteMock } from "./mock";
import type { FuenteDatos } from "./tipos";

// Unico punto que conoce las implementaciones.
//   NEXT_PUBLIC_FUENTE=focos  datos reales de focos de calor (archivos en public/datos)
//   NEXT_PUBLIC_FUENTE=api    backend propio
//   NEXT_PUBLIC_FUENTE=mock   datos sinteticos (por defecto, compatible con NEXT_PUBLIC_USE_MOCK)
function elegir(): FuenteDatos {
  const fuente = process.env.NEXT_PUBLIC_FUENTE;
  if (fuente === "focos") return fuenteFocos;
  if (fuente === "api" || process.env.NEXT_PUBLIC_USE_MOCK === "false") return fuenteApi;
  return fuenteMock;
}

export const datos: FuenteDatos = elegir();

export * from "./tipos";
export { serieDesdeGrilla, celdasEnSector, centroCelda, normalizarSector } from "./serie";
export { fuenteFocos, grillaDeFocos, type FuenteFocos } from "./focos";
