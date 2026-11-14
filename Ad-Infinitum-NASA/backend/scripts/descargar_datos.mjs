// Descarga unica de las capas publicas de ArcGIS Online (CONAE / Gobierno de San Luis)
// y genera archivos livianos para la web.
//
// Uso (Node 18+, sin dependencias), desde Ad-Infinitum-NASA/backend:
//   node scripts/descargar_datos.mjs
//
// Salida en backend/data/:
//   raw/focos.geojson, raw/departamentos.geojson, raw/embalses.geojson  (originales)
//   focos.compact.json          columnas: lon, lat, anio, mes, dia, power, confianza, depto, sat
//   departamentos.geojson       poligonos simplificados (solo nombre)
//   departamentos.mensual.json  conteos mensuales por departamento (null = mes ausente)
//   embalses.geojson            poligonos simplificados (nombre)
//
// Si un endpoint exige token o devuelve error, el script se detiene sin escribir datos.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://services5.arcgis.com/HhpfpBpfJF3e3irA/arcgis/rest/services/";
const CAPAS = {
  focos: "Focos_de_calor_%282002_2024%29/FeatureServer/0",
  departamentos: "Departamentos_CONAE/FeatureServer/0",
  embalses: "embalses_mayo_2024/FeatureServer/0",
};
const PAGINA = 2000;
const FOCOS_ESPERADOS = 38558;
const CAMPO_ANIO = "Año";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..", "data");
const CRUDOS = join(RAIZ, "raw");

// El campo Instrumento de la fuente etiqueta como VIIRS a Terra y Aqua antes de 2017:
// el sensor real se deduce del satelite
const SATELITES = ["TERRA", "AQUA", "SNPP", "NOAA20"];
const SENSOR = { TERRA: "MODIS", AQUA: "MODIS", SNPP: "VIIRS", NOAA20: "VIIRS" };

// En los registros MODIS desde 2017 la fuente perdio el separador decimal
// (por ejemplo FP_T21 = 347872 en lugar de 347,872 K). Esas potencias llegan como
// enteros y no se pueden recuperar: se guardan como null (dato no confiable).
function potenciaConfiable(p) {
  const v = p.FP_Power;
  if (!Number.isFinite(v)) return false;
  if (SENSOR[p.Satelite] === "MODIS" && p[CAMPO_ANIO] >= 2017 && Number.isInteger(v)) return false;
  return true;
}

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
  "septiembre", "octubre", "noviembre", "diciembre"];

function detener(mensaje) {
  console.error(`\nERROR: ${mensaje}\nNo se escribieron datos.`);
  process.exit(1);
}

async function pedirJson(url) {
  let respuesta;
  try {
    respuesta = await fetch(url);
  } catch (error) {
    detener(`no se pudo conectar con ${url}\n${error.message}`);
  }
  const texto = await respuesta.text();
  if (!respuesta.ok) detener(`HTTP ${respuesta.status} en ${url}\n${texto.slice(0, 500)}`);
  let cuerpo;
  try {
    cuerpo = JSON.parse(texto);
  } catch {
    detener(`respuesta no es JSON en ${url}\n${texto.slice(0, 500)}`);
  }
  // ArcGIS responde 200 con { error: {...} } cuando falta token o falla la consulta
  if (cuerpo.error) detener(`el servicio devolvio un error en ${url}\n${JSON.stringify(cuerpo.error)}`);
  return cuerpo;
}

// Conversion de geometrias Esri JSON a GeoJSON (respaldo si f=geojson falla)
function anilloHorario(anillo) {
  let area = 0;
  for (let i = 0; i < anillo.length - 1; i++) {
    area += (anillo[i + 1][0] - anillo[i][0]) * (anillo[i + 1][1] + anillo[i][1]);
  }
  return area > 0;
}

function esriAGeojson(g) {
  if (!g) return null;
  if ("x" in g) return { type: "Point", coordinates: [g.x, g.y] };
  if (g.rings) {
    // En Esri los anillos exteriores van en sentido horario y los huecos en antihorario
    const poligonos = [];
    for (const anillo of g.rings) {
      if (anilloHorario(anillo) || poligonos.length === 0) poligonos.push([anillo]);
      else poligonos[poligonos.length - 1].push(anillo);
    }
    return poligonos.length === 1
      ? { type: "Polygon", coordinates: poligonos[0] }
      : { type: "MultiPolygon", coordinates: poligonos };
  }
  return null;
}

async function descargarCapa(nombre, ruta) {
  const url = (formato, offset) =>
    `${BASE}${ruta}/query?where=1%3D1&outFields=*&f=${formato}&outSR=4326&orderByFields=FID` +
    `&resultOffset=${offset}&resultRecordCount=${PAGINA}`;

  const features = [];
  let formato = "geojson";
  for (let offset = 0; ; offset += PAGINA) {
    let pagina;
    if (formato === "geojson") {
      try {
        const r = await fetch(url("geojson", offset));
        pagina = r.ok ? await r.json() : null;
        if (!pagina || pagina.error || !Array.isArray(pagina.features)) pagina = null;
      } catch {
        pagina = null;
      }
      if (!pagina) {
        console.warn(`  ${nombre}: f=geojson fallo, se usa f=json`);
        formato = "json";
      }
    }
    if (formato === "json") {
      const esri = await pedirJson(url("json", offset));
      pagina = {
        features: esri.features.map((f) => ({
          type: "Feature",
          properties: f.attributes,
          geometry: esriAGeojson(f.geometry),
        })),
        properties: { exceededTransferLimit: esri.exceededTransferLimit },
      };
    }
    features.push(...pagina.features);
    process.stdout.write(`\r  ${nombre}: ${features.length} registros`);
    const hayMas = pagina.properties?.exceededTransferLimit || pagina.exceededTransferLimit;
    if (pagina.features.length === 0 || (!hayMas && pagina.features.length < PAGINA)) break;
  }
  process.stdout.write("\n");

  const conteo = await pedirJson(`${BASE}${ruta}/query?where=1%3D1&returnCountOnly=true&f=json`);
  if (conteo.count !== features.length) {
    detener(`${nombre}: se descargaron ${features.length} registros pero el servicio informa ${conteo.count}`);
  }
  return { type: "FeatureCollection", features };
}

// Dia puede venir como texto "AAAA-MM-DD" o como milisegundos
function leerFecha(valor) {
  if (valor === null || valor === undefined || valor === "") return null;
  if (typeof valor === "number") {
    const d = new Date(valor);
    return { anio: d.getUTCFullYear(), mes: d.getUTCMonth() + 1, dia: d.getUTCDate() };
  }
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(valor));
  if (m) return { anio: +m[1], mes: +m[2], dia: +m[3] };
  const d = new Date(valor);
  return Number.isNaN(d.getTime()) ? null : { anio: d.getUTCFullYear(), mes: d.getUTCMonth() + 1, dia: d.getUTCDate() };
}

function normalizarTexto(s) {
  return String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
}

// Simplificacion Douglas-Peucker sobre un anillo (tolerancia en grados)
function douglasPeucker(puntos, tol) {
  if (puntos.length <= 2) return puntos;
  const marcar = new Uint8Array(puntos.length);
  marcar[0] = marcar[puntos.length - 1] = 1;
  const pila = [[0, puntos.length - 1]];
  while (pila.length) {
    const [a, b] = pila.pop();
    const [ax, ay] = puntos[a];
    const [bx, by] = puntos[b];
    const dx = bx - ax;
    const dy = by - ay;
    const largo = Math.hypot(dx, dy) || 1e-12;
    let max = -1;
    let idx = -1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * puntos[i][0] - dx * puntos[i][1] + bx * ay - by * ax) / largo;
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol) {
      marcar[idx] = 1;
      pila.push([a, idx], [idx, b]);
    }
  }
  return puntos.filter((_, i) => marcar[i]);
}

function redondear(c, dec) {
  const f = 10 ** dec;
  return [Math.round(c[0] * f) / f, Math.round(c[1] * f) / f];
}

// Un anillo cerrado empieza y termina en el mismo punto: se parte en el vertice
// mas lejano al inicio y se simplifica cada mitad por separado
function simplificarAnillo(r, tol) {
  if (r.length <= 8) return r;
  let lejos = 1;
  let max = -1;
  for (let i = 1; i < r.length - 1; i++) {
    const d = Math.hypot(r[i][0] - r[0][0], r[i][1] - r[0][1]);
    if (d > max) { max = d; lejos = i; }
  }
  const a = douglasPeucker(r.slice(0, lejos + 1), tol);
  const b = douglasPeucker(r.slice(lejos), tol);
  const salida = a.concat(b.slice(1));
  return salida.length >= 4 ? salida : r;
}

function simplificarGeometria(g, tol) {
  const anillo = (r) => simplificarAnillo(r, tol).map((c) => redondear(c, 5));
  if (g.type === "Polygon") return { type: "Polygon", coordinates: g.coordinates.map(anillo) };
  if (g.type === "MultiPolygon") {
    return { type: "MultiPolygon", coordinates: g.coordinates.map((p) => p.map(anillo)) };
  }
  return g;
}

function mesesEntre(inicio, fin) {
  const lista = [];
  let [a, m] = inicio;
  while (a < fin[0] || (a === fin[0] && m <= fin[1])) {
    lista.push(`${a}_${String(m).padStart(2, "0")}`);
    m++;
    if (m > 12) { m = 1; a++; }
  }
  return lista;
}

// ---------- Descarga ----------
console.log("Descargando capas de ArcGIS Online...");
const crudos = {};
for (const [nombre, ruta] of Object.entries(CAPAS)) {
  crudos[nombre] = await descargarCapa(nombre, ruta);
}

if (crudos.focos.features.length !== FOCOS_ESPERADOS) {
  detener(`se esperaban ${FOCOS_ESPERADOS} focos y llegaron ${crudos.focos.features.length}`);
}

mkdirSync(CRUDOS, { recursive: true });
for (const [nombre, fc] of Object.entries(crudos)) {
  writeFileSync(join(CRUDOS, `${nombre}.geojson`), JSON.stringify(fc));
}

// ---------- Focos compactos ----------
const nulos = {};
const deptos = [];
const indiceDepto = new Map();
const col = { lon: [], lat: [], anio: [], mes: [], dia: [], power: [], confianza: [], depto: [], sat: [] };

// Nombres oficiales (con tildes) tomados de la capa de departamentos
const nombreOficial = new Map(
  crudos.departamentos.features.map((f) => {
    const n = String(f.properties.Departamen ?? f.properties.fna ?? "").trim();
    return [normalizarTexto(n), n];
  }),
);
let descartados = 0;
let potenciasDescartadas = 0;
const satDesconocidos = {};
let incoherenciasMes = 0;
let fechaMin = null;
let fechaMax = null;

for (const f of crudos.focos.features) {
  const p = f.properties;
  for (const [k, v] of Object.entries(p)) {
    if (v === null || v === undefined || v === "") nulos[k] = (nulos[k] ?? 0) + 1;
  }
  const fecha = leerFecha(p.Dia);
  const coords = f.geometry?.coordinates;
  const lon = Number.isFinite(p.Longitud) ? p.Longitud : coords?.[0];
  const lat = Number.isFinite(p.Latitud) ? p.Latitud : coords?.[1];
  if (!fecha || !Number.isFinite(lon) || !Number.isFinite(lat)) {
    descartados++;
    continue;
  }
  if (p[CAMPO_ANIO] !== fecha.anio || normalizarTexto(p.Mes) !== MESES[fecha.mes - 1]) incoherenciasMes++;

  const clave = fecha.anio * 10000 + fecha.mes * 100 + fecha.dia;
  if (fechaMin === null || clave < fechaMin) fechaMin = clave;
  if (fechaMax === null || clave > fechaMax) fechaMax = clave;

  const crudo = String(p.Departamento ?? "Sin dato").trim();
  const nombreDepto = nombreOficial.get(normalizarTexto(crudo)) ?? crudo;
  const sat = SATELITES.indexOf(String(p.Satelite ?? "").toUpperCase());
  if (sat < 0) satDesconocidos[p.Satelite] = (satDesconocidos[p.Satelite] ?? 0) + 1;
  const confiable = potenciaConfiable(p);
  if (!confiable && Number.isFinite(p.FP_Power)) potenciasDescartadas++;
  if (!indiceDepto.has(nombreDepto)) {
    indiceDepto.set(nombreDepto, deptos.length);
    deptos.push(nombreDepto);
  }
  col.lon.push(Math.round(lon * 10000) / 10000);
  col.lat.push(Math.round(lat * 10000) / 10000);
  col.anio.push(fecha.anio);
  col.mes.push(fecha.mes);
  col.dia.push(fecha.dia);
  col.power.push(confiable ? Math.round(p.FP_Power * 10) / 10 : null);
  col.confianza.push(Number.isFinite(p.FP_Confidence) ? p.FP_Confidence : null);
  col.depto.push(indiceDepto.get(nombreDepto));
  col.sat.push(sat);
}

const fechaTexto = (c) => `${Math.floor(c / 10000)}-${String(Math.floor(c / 100) % 100).padStart(2, "0")}-${String(c % 100).padStart(2, "0")}`;

writeFileSync(
  join(RAIZ, "focos.compact.json"),
  JSON.stringify({
    fuente: "CONAE / Gobierno de San Luis (ArcGIS Online, capa Focos_de_calor_(2002_2024))",
    descargado: new Date().toISOString().slice(0, 10),
    n: col.lon.length,
    fechaMin: fechaTexto(fechaMin),
    fechaMax: fechaTexto(fechaMax),
    departamentos: deptos,
    satelites: SATELITES,
    sensores: SATELITES.map((s) => SENSOR[s]),
    notas: [
      "sat: indice en satelites (-1 = desconocido). El sensor se deduce del satelite.",
      "power: FP_Power en MW; null cuando la fuente no lo informa o no es confiable (MODIS desde 2017 sin separador decimal).",
      "departamentos.mensual.json coincide con los focos del satelite AQUA.",
    ],
    columnas: col,
  }),
);

// ---------- Departamentos: geometria y serie mensual ----------
const columnasMes = Object.keys(crudos.departamentos.features[0].properties)
  .filter((k) => /^F\d{4}_\d{2}$/.test(k))
  .map((k) => k.slice(1))
  .sort();
const primero = columnasMes[0].split("_").map(Number);
const ultimo = columnasMes[columnasMes.length - 1].split("_").map(Number);
const todosLosMeses = mesesEntre(primero, ultimo);
const presentes = new Set(columnasMes);
const mesesFaltantes = todosLosMeses.filter((m) => !presentes.has(m));

const mensual = {
  meses: todosLosMeses.map((m) => m.replace("_", "-")),
  mesesFaltantes: mesesFaltantes.map((m) => m.replace("_", "-")),
  departamentos: crudos.departamentos.features.map((f) => {
    const p = f.properties;
    return {
      nombre: String(p.Departamen ?? p.fna ?? "").trim(),
      // null = mes sin dato (columna ausente o valor vacio); nunca se reemplaza por cero
      conteos: todosLosMeses.map((m) => {
        const v = p[`F${m}`];
        return Number.isFinite(v) ? v : null;
      }),
    };
  }),
};
let nulosMensuales = 0;
for (const d of mensual.departamentos) nulosMensuales += d.conteos.filter((v) => v === null).length;
writeFileSync(join(RAIZ, "departamentos.mensual.json"), JSON.stringify(mensual));

writeFileSync(
  join(RAIZ, "departamentos.geojson"),
  JSON.stringify({
    type: "FeatureCollection",
    features: crudos.departamentos.features.map((f) => ({
      type: "Feature",
      properties: { nombre: String(f.properties.Departamen ?? f.properties.fna ?? "").trim() },
      geometry: simplificarGeometria(f.geometry, 0.002),
    })),
  }),
);

writeFileSync(
  join(RAIZ, "embalses.geojson"),
  JSON.stringify({
    type: "FeatureCollection",
    features: crudos.embalses.features.map((f) => ({
      type: "Feature",
      properties: { nombre: String(f.properties.diques_pci ?? "").trim() },
      geometry: simplificarGeometria(f.geometry, 0.0003),
    })),
  }),
);

// ---------- Resumen ----------
const porDepto = new Map();
for (const i of col.depto) porDepto.set(deptos[i], (porDepto.get(deptos[i]) ?? 0) + 1);

console.log("\n=== Resumen ===");
console.log(`Focos: ${crudos.focos.features.length} descargados, ${col.lon.length} utilizables, ${descartados} descartados sin fecha o coordenadas`);
console.log(`Rango real de fechas (campo Dia): ${fechaTexto(fechaMin)} a ${fechaTexto(fechaMax)}`);
console.log(`Potencias FP_Power marcadas como no confiables: ${potenciasDescartadas}`);
console.log(`Satelites desconocidos: ${Object.keys(satDesconocidos).length ? JSON.stringify(satDesconocidos) : "ninguno"}`);
console.log(`Registros con Mes o ${CAMPO_ANIO} distinto de Dia: ${incoherenciasMes}`);
console.log("Valores nulos por campo:", Object.keys(nulos).length ? nulos : "ninguno");
console.log("Focos por departamento:");
for (const [d, n] of [...porDepto].sort((a, b) => b[1] - a[1])) console.log(`  ${d}: ${n}`);
console.log(`Departamentos (poligonos): ${crudos.departamentos.features.length}: ${mensual.departamentos.map((d) => d.nombre).join(", ")}`);
console.log(`Serie mensual: ${mensual.meses[0]} a ${mensual.meses.at(-1)} (${todosLosMeses.length} meses)`);
console.log(`Meses faltantes (columna ausente): ${mesesFaltantes.length ? mensual.mesesFaltantes.join(", ") : "ninguno"}`);
console.log(`Celdas mensuales vacias (todas cuentan como dato ausente): ${nulosMensuales}`);
console.log(`Embalses: ${crudos.embalses.features.length}: ${crudos.embalses.features.map((f) => f.properties.diques_pci).join(", ")}`);
