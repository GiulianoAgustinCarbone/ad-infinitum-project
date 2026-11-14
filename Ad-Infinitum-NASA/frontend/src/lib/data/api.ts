import { serieDesdeGrilla } from "./serie";
import { ANIOS, claveAnio, type FuenteDatos, type Grilla, type Sector } from "./tipos";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export class ErrorApi extends Error {}

// Verifica que la respuesta cumpla el contrato antes de usarla
export function validarGrilla(datos: unknown): Grilla {
  const g = datos as Grilla;
  if (g?.type !== "FeatureCollection" || !Array.isArray(g.features) || g.features.length === 0) {
    throw new ErrorApi("La grilla no es una FeatureCollection con celdas");
  }
  for (const celda of g.features) {
    if (celda?.geometry?.type !== "Polygon") {
      throw new ErrorApi("Cada celda de la grilla debe ser un Polygon");
    }
    for (const anio of ANIOS) {
      if (typeof celda.properties?.[claveAnio(anio)] !== "number") {
        throw new ErrorApi(`Falta la propiedad ${claveAnio(anio)} en una celda`);
      }
    }
  }
  return g;
}

let pedido: Promise<Grilla> | null = null;

async function pedirGrilla(): Promise<Grilla> {
  const respuesta = await fetch(`${API_URL}/api/grilla`);
  if (!respuesta.ok) {
    throw new ErrorApi(`Error HTTP ${respuesta.status} al pedir la grilla`);
  }
  return validarGrilla(await respuesta.json());
}

export const fuenteApi: FuenteDatos = {
  ilustrativo: false,
  getGrilla() {
    // Si falla, se descarta para permitir reintentar
    pedido ??= pedirGrilla().catch((error) => {
      pedido = null;
      throw error;
    });
    return pedido;
  },
  async getSerieSector(sector: Sector) {
    return serieDesdeGrilla(await this.getGrilla(), sector);
  },
};
