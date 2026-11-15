// Prepara los datos estaticos del sitio a partir de backend/data (generados una vez
// por backend/scripts/descargar_datos.mjs y por el pipeline de backend/incendios). Se ejecuta antes de dev y build:
//   node scripts/preparar-datos.mts
//
// - Copia los archivos livianos a public/datos/ (se cargan en diferido en el navegador)
// - Precalcula cifras, estacionalidad, tendencia y hallazgos de los dos modos del sitio:
//     src/lib/generado/resumen.json            focos de calor (CONAE + FIRMS, serie de Aqua)
//     src/lib/generado/resumen-incendios.json  incendios confirmados (hectareas quemadas, MCD64A1)

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { calcularResumen, validarEntrada } from "../src/lib/focos/agregados.ts";
import type { FocosCompactos, SerieMensualDeptos } from "../src/lib/focos/tipos.ts";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const origen = join(raiz, "..", "backend", "data");
const incendios = join(origen, "incendios");
const publico = join(raiz, "public", "datos");
const generado = join(raiz, "src", "lib", "generado");

// Entradas del pipeline de backend/incendios (ver backend/incendios/README.md)
const ENTRADAS = {
  focosUnificados: join(incendios, "focos_confirmados.compact.json"), // python -m incendios.cruce
  serieAqua: join(incendios, "serie_aqua.json"), // python -m incendios.serie_aqua
  incendios: join(incendios, "incendios.compact.json"), // python -m incendios.exportar_incendios
  serieIncendios: join(incendios, "serie_incendios.json"), // python -m incendios.serie_incendios
  validacion: join(incendios, "validacion.json"), // python (validacion de sensibilidad)
};

const ARCHIVOS_CONAE: [string, string][] = [
  ["departamentos.geojson", "departamentos.geojson"],
  ["embalses.geojson", "embalses.geojson"],
];

const faltan = [...Object.values(ENTRADAS), ...ARCHIVOS_CONAE.map(([a]) => join(origen, a))].filter((a) => !existsSync(a));
if (faltan.length) {
  console.error(
    `Faltan datos generados:\n  ${faltan.join("\n  ")}\n` +
      "Genera los focos y los incendios con el pipeline de backend/incendios (ver su README) " +
      "y los datos de CONAE con: node backend/scripts/descargar_datos.mjs",
  );
  process.exit(1);
}

mkdirSync(publico, { recursive: true });
mkdirSync(generado, { recursive: true });

// Modo focos de calor
copyFileSync(ENTRADAS.focosUnificados, join(publico, "focos.json"));
copyFileSync(ENTRADAS.serieAqua, join(publico, "serie-aqua.json"));
// Modo incendios confirmados
copyFileSync(ENTRADAS.incendios, join(publico, "incendios.json"));
copyFileSync(ENTRADAS.serieIncendios, join(publico, "serie-incendios.json"));
// Cifras de validacion (linea base al azar), usadas en el texto del metodo
copyFileSync(ENTRADAS.validacion, join(generado, "validacion.json"));
for (const [desde, hacia] of ARCHIVOS_CONAE) copyFileSync(join(origen, desde), join(publico, hacia));

function leer<T>(ruta: string): T {
  return JSON.parse(readFileSync(ruta, "utf8")) as T;
}

const focos = leer<FocosCompactos>(ENTRADAS.focosUnificados);
const serieFocos = leer<SerieMensualDeptos>(ENTRADAS.serieAqua);
validarEntrada(focos, serieFocos);
// La fecha de generacion es la de descarga: el resumen no cambia entre compilaciones
const resumenFocos = calcularResumen(focos, serieFocos, focos.descargado);
writeFileSync(join(generado, "resumen.json"), JSON.stringify(resumenFocos, null, 1) + "\n");

const incendiosCompactos = leer<FocosCompactos>(ENTRADAS.incendios);
const serieIncendios = leer<SerieMensualDeptos>(ENTRADAS.serieIncendios);
validarEntrada(incendiosCompactos, serieIncendios);
const resumenIncendios = calcularResumen(incendiosCompactos, serieIncendios, incendiosCompactos.descargado);
writeFileSync(join(generado, "resumen-incendios.json"), JSON.stringify(resumenIncendios, null, 1) + "\n");

console.log(
  `Datos listos: ${resumenFocos.todos.total} focos (serie Aqua ${resumenFocos.aqua.desde} a ${resumenFocos.aqua.hasta}, ` +
    `tendencia ${resumenFocos.aqua.tendencia.desde}-${resumenFocos.aqua.tendencia.hasta} p=${resumenFocos.aqua.tendencia.p.toFixed(3)}); ` +
    `${resumenIncendios.todos.total} incendios (${resumenIncendios.aqua.desde} a ${resumenIncendios.aqua.hasta}, ` +
    `tendencia ${resumenIncendios.aqua.tendencia.desde}-${resumenIncendios.aqua.tendencia.hasta})`,
);
