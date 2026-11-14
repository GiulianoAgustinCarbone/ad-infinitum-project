import type { FeatureCollection, LineString, Point } from "geojson";
import type { Grilla } from "@/lib/data";
import { fmt } from "@/lib/formato";

export type Extension = readonly [number, number, number, number];

export function extensionGrilla(grilla: Grilla): Extension {
  let oeste = Infinity;
  let sur = Infinity;
  let este = -Infinity;
  let norte = -Infinity;
  for (const celda of grilla.features) {
    for (const [lon, lat] of celda.geometry.coordinates[0]) {
      oeste = Math.min(oeste, lon);
      este = Math.max(este, lon);
      sur = Math.min(sur, lat);
      norte = Math.max(norte, lat);
    }
  }
  return [oeste, sur, este, norte];
}

// Lineas de meridianos y paralelos cada `paso` grados, con un punto de
// etiqueta por linea sobre el borde oeste (latitudes) y sur (longitudes).
// La esquina suroeste no lleva etiquetas para que no se superpongan.
export function cuadricula([oeste, sur, este, norte]: Extension, paso = 2) {
  const lineas: FeatureCollection<LineString> = { type: "FeatureCollection", features: [] };
  const etiquetas: FeatureCollection<Point, { texto: string; tipo: "lon" | "lat" }> = { type: "FeatureCollection", features: [] };

  for (let lon = Math.ceil(oeste / paso) * paso; lon <= este; lon += paso) {
    lineas.features.push({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: [[lon, sur], [lon, norte]] },
    });
    if (lon === oeste) continue;
    etiquetas.features.push({
      type: "Feature",
      properties: { texto: `${fmt(Math.abs(lon), 0)}° ${lon < 0 ? "O" : "E"}`, tipo: "lon" },
      geometry: { type: "Point", coordinates: [lon, sur] },
    });
  }
  for (let lat = Math.ceil(sur / paso) * paso; lat <= norte; lat += paso) {
    lineas.features.push({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: [[oeste, lat], [este, lat]] },
    });
    if (lat === sur) continue;
    etiquetas.features.push({
      type: "Feature",
      properties: { texto: `${fmt(Math.abs(lat), 0)}° ${lat < 0 ? "S" : "N"}`, tipo: "lat" },
      geometry: { type: "Point", coordinates: [oeste, lat] },
    });
  }
  return { lineas, etiquetas };
}
