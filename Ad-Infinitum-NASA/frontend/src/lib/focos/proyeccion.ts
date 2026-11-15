import type { Position } from "geojson";

// Proyeccion equirectangular con correccion por latitud media: suficiente para
// una provincia (error de forma despreciable a esta escala).
export type Proyeccion = {
  x: (lon: number) => number;
  y: (lat: number) => number;
  escala: number;
};

export type Caja = { oeste: number; este: number; sur: number; norte: number };

export function cajaDe(anillos: Position[][]): Caja {
  const caja = { oeste: Infinity, este: -Infinity, sur: Infinity, norte: -Infinity };
  for (const anillo of anillos) {
    for (const [lon, lat] of anillo) {
      caja.oeste = Math.min(caja.oeste, lon);
      caja.este = Math.max(caja.este, lon);
      caja.sur = Math.min(caja.sur, lat);
      caja.norte = Math.max(caja.norte, lat);
    }
  }
  return caja;
}

export function ajustarProyeccion(caja: Caja, ancho: number, alto: number, margen: number): Proyeccion {
  const latMedia = ((caja.sur + caja.norte) / 2) * (Math.PI / 180);
  const k = Math.cos(latMedia);
  const anchoGeo = (caja.este - caja.oeste) * k;
  const altoGeo = caja.norte - caja.sur;
  const escala = Math.min((ancho - 2 * margen) / anchoGeo, (alto - 2 * margen) / altoGeo);
  const dx = (ancho - anchoGeo * escala) / 2;
  const dy = (alto - altoGeo * escala) / 2;
  return {
    x: (lon) => dx + (lon - caja.oeste) * k * escala,
    y: (lat) => dy + (caja.norte - lat) * escala,
    escala,
  };
}
