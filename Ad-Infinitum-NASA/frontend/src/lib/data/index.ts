import { fuenteApi } from "./api";
import { fuenteMock } from "./mock";
import type { FuenteDatos } from "./tipos";

// Unico punto que conoce las implementaciones. Por defecto se usan datos
// sinteticos; NEXT_PUBLIC_USE_MOCK=false activa el backend.
export const datos: FuenteDatos =
  process.env.NEXT_PUBLIC_USE_MOCK === "false" ? fuenteApi : fuenteMock;

export * from "./tipos";
export { serieDesdeGrilla, celdasEnSector, centroCelda, normalizarSector } from "./serie";
