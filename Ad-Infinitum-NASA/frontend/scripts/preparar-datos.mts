// Prepara los datos estaticos del sitio a partir de backend/data (generados una vez
// por backend/scripts/descargar_datos.mjs). Se ejecuta antes de dev y build:
//   node scripts/preparar-datos.mts
//
// - Copia los archivos livianos a public/datos/ (se cargan en diferido en el navegador)
// - Precalcula cifras, estacionalidad, tendencia y hallazgos en src/lib/generado/resumen.json

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { calcularResumen, validarEntrada } from "../src/lib/focos/agregados.ts";
import type { FocosCompactos, SerieMensualDeptos } from "../src/lib/focos/tipos.ts";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const origen = join(raiz, "..", "backend", "data");
// Focos de CONAE + NASA FIRMS (generado por: python -m incendios.cruce)
const focosUnificados = join(origen, "incendios", "focos_confirmados.compact.json");
// Serie mensual de Aqua: CONAE donde hay dato y NASA FIRMS donde no (generado por: python -m incendios.serie_aqua)
const serieAqua = join(origen, "incendios", "serie_aqua.json");
const publico = join(raiz, "public", "datos");
const generado = join(raiz, "src", "lib", "generado");

const ARCHIVOS: [string, string][] = [
  ["departamentos.geojson", "departamentos.geojson"],
  ["departamentos.mensual.json", "departamentos.mensual.json"],
  ["embalses.geojson", "embalses.geojson"],
];

for (const archivo of [focosUnificados, serieAqua, ...ARCHIVOS.map(([a]) => join(origen, a))]) {
  if (!existsSync(archivo)) {
    console.error(
      `Falta ${archivo}. Genera los focos con: python -m incendios.cruce (en backend/) ` +
        `y los datos de CONAE con: node backend/scripts/descargar_datos.mjs`,
    );
    process.exit(1);
  }
}

mkdirSync(publico, { recursive: true });
mkdirSync(generado, { recursive: true });
copyFileSync(focosUnificados, join(publico, "focos.json"));
copyFileSync(serieAqua, join(publico, "serie-aqua.json"));
for (const [desde, hacia] of ARCHIVOS) copyFileSync(join(origen, desde), join(publico, hacia));

const focos = JSON.parse(readFileSync(focosUnificados, "utf8")) as FocosCompactos;
const serie = JSON.parse(readFileSync(serieAqua, "utf8")) as SerieMensualDeptos;
validarEntrada(focos, serie);

// La fecha de generacion es la de descarga: el resumen no cambia entre compilaciones
const resumen = calcularResumen(focos, serie, focos.descargado);
writeFileSync(join(generado, "resumen.json"), JSON.stringify(resumen, null, 1) + "\n");

console.log(
  `Datos listos: ${resumen.todos.total} focos, serie Aqua ${resumen.aqua.desde} a ${resumen.aqua.hasta}, ` +
    `tendencia ${resumen.aqua.tendencia.desde}-${resumen.aqua.tendencia.hasta} p=${resumen.aqua.tendencia.p.toFixed(3)}`,
);
