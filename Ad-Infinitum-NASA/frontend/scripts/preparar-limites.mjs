// Genera src/lib/geo/argentina.json y src/lib/geo/provincias.json a partir de
// Natural Earth v5.1.2 (dominio publico):
//   https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_10m_admin_0_countries_arg.geojson
//   https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_10m_admin_1_states_provinces.geojson
// Se usa la version de paises con punto de vista argentino: incluye Islas Malvinas.
//
// Uso: node scripts/preparar-limites.mjs <carpeta con los dos geojson descargados>

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import simplify from "@turf/simplify";

const [carpeta] = process.argv.slice(2);
if (!carpeta) {
  console.error("Falta la carpeta con los archivos de Natural Earth");
  process.exit(1);
}

// Area del mapa: lo que queda afuera (Georgias y Sandwich del Sur) se descarta
const AREA = { oeste: -74, este: -53, sur: -56, norte: -21 };
const TOLERANCIA = 0.02;

function leer(nombre) {
  return JSON.parse(readFileSync(join(carpeta, nombre), "utf8"));
}

function dentroDelArea(anillo) {
  const lons = anillo.map(([x]) => x);
  const lats = anillo.map(([, y]) => y);
  const lon = (Math.min(...lons) + Math.max(...lons)) / 2;
  const lat = (Math.min(...lats) + Math.max(...lats)) / 2;
  return lon >= AREA.oeste && lon <= AREA.este && lat >= AREA.sur && lat <= AREA.norte;
}

function redondear(geometria) {
  const r = (c) => (typeof c[0] === "number" ? [Math.round(c[0] * 1000) / 1000, Math.round(c[1] * 1000) / 1000] : c.map(r));
  return { ...geometria, coordinates: r(geometria.coordinates) };
}

function simplificar(feature) {
  const s = simplify(feature, { tolerance: TOLERANCIA, highQuality: true, mutate: false });
  return { ...s, geometry: redondear(s.geometry) };
}

const pais = leer("ne_10m_admin_0_countries_arg.geojson").features.find((f) => f.properties.ADM0_A3 === "ARG");
const poligonos = pais.geometry.coordinates.filter((p) => dentroDelArea(p[0]));
const argentina = simplificar({
  type: "Feature",
  properties: { nombre: "Argentina" },
  geometry: { type: "MultiPolygon", coordinates: poligonos },
});

const provincias = {
  type: "FeatureCollection",
  features: leer("ne_10m_admin_1_states_provinces.geojson")
    .features.filter((f) => f.properties.adm0_a3 === "ARG")
    .map((f) =>
      simplificar({
        type: "Feature",
        properties: { nombre: f.properties.name, iso: f.properties.iso_3166_2 },
        geometry: f.geometry,
      }),
    ),
};

const salida = join("src", "lib", "geo");
mkdirSync(salida, { recursive: true });
writeFileSync(join(salida, "argentina.json"), JSON.stringify(argentina));
writeFileSync(join(salida, "provincias.json"), JSON.stringify(provincias));
console.log(`Argentina: ${poligonos.length} poligonos. Provincias: ${provincias.features.length}.`);
