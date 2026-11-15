// Escenario ilustrativo reproducible; no es un modelo predictivo validado.
// Ejecutar tras preparar-datos.mts. Comparar siempre un solo sensor (Aqua).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import assert from "node:assert/strict";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const leer = (p) => JSON.parse(readFileSync(join(raiz, p), "utf8"));
const fuente = leer("public/datos/incendios.json");
const plantilla = readFileSync(join(raiz, "public/demo/escenario-futuro.html"), "utf8");
const datos = JSON.parse(plantilla.match(/<script id="scenario" type="application\/json">([\s\S]*?)<\/script>/)[1]);
const columnas = fuente.columnas;
const ultimo = Number(fuente.fechaMax.slice(0, 4));
const baseEnd = fuente.fechaMax.slice(5, 10) === "12-31" ? ultimo : ultimo - 1;
const baseStart = baseEnd - 9;
const start = ultimo + 1;
const names = fuente.departamentos;
const aqua = fuente.satelites.indexOf("AQUA");
assert(aqua >= 0, "Falta Aqua en los datos de incendios");
const historicos = Array.from({ length: 10 }, () => Array.from({ length: 12 }, () => names.map(() => 0)));
const puntos = names.map(() => Array.from({ length: 12 }, () => []));
let baseTotal = 0;
for (let i = 0; i < fuente.n; i++) {
  const anio = columnas.anio[i];
  if (columnas.sat[i] !== aqua || anio < baseStart || anio > baseEnd || columnas.quemado?.[i] !== true) continue;
  const d = columnas.depto[i], m = columnas.mes[i] - 1;
  assert(d >= 0 && d < names.length && m >= 0 && m < 12);
  historicos[anio - baseStart][m][d]++;
  puntos[d][m].push([columnas.lon[i], columnas.lat[i]]);
  baseTotal++;
}
assert(baseTotal > 0, "No hay registros de Aqua asociados a area quemada en la ventana base");
let semilla = 271828;
const aleatorio = () => {
  semilla = (Math.imul(1664525, semilla) + 1013904223) >>> 0;
  return semilla / 4294967296;
};
const mediana = (valores) => {
  valores.sort((a, b) => a - b);
  const mitad = Math.floor(valores.length / 2);
  return valores.length % 2 ? valores[mitad] : (valores[mitad - 1] + valores[mitad]) / 2;
};
const trends = names.map((_, d) => {
  const anuales = historicos.map((meses) => meses.reduce((s, mes) => s + mes[d], 0));
  const pendientes = [];
  for (let i = 0; i < 10; i++) for (let j = i + 1; j < 10; j++) pendientes.push((anuales[j] - anuales[i]) / (j - i));
  const media = anuales.reduce((a, b) => a + b, 0) / 10;
  return media ? Math.max(-.05, Math.min(.05, mediana(pendientes) / media)) : 0;
});
const contieneAnillo = ([x, y], anillo) => {
  let dentro = false;
  for (let i = 0, j = anillo.length - 1; i < anillo.length; j = i++) {
    const [xi, yi] = anillo[i], [xj, yj] = anillo[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) dentro = !dentro;
  }
  return dentro;
};
const contiene = (punto, geometria) => {
  const poligonos = geometria.type === "Polygon" ? [geometria.coordinates] : geometria.coordinates;
  return poligonos.some(([exterior, ...huecos]) => contieneAnillo(punto, exterior) && !huecos.some((a) => contieneAnillo(punto, a)));
};
const geometrias = names.map((nombre) => datos.departments.features.find((f) => f.properties.nombre === nombre)?.geometry);
assert(geometrias.every(Boolean), "Faltan limites departamentales");
const events = [], monthly = [], expected = [];
for (let y = 0; y < 10; y++) {
  // Un mismo año remuestreado para preservar parte de la variación provincial.
  const muestra = Math.floor(aleatorio() * 10);
  for (let m = 0; m < 12; m++) {
    const conteos = [], medias = [];
    for (let d = 0; d < names.length; d++) {
      const media = historicos.reduce((s, meses) => s + meses[m][d], 0) / 10;
      const factor = Math.max(.7, Math.min(1.3, 1 + trends[d] * 5 * (1 - Math.exp(-(y + 1) / 5))));
      const valor = (.5 * media + .5 * historicos[muestra][m][d]) * factor;
      const cantidad = Math.floor(valor) + Number(aleatorio() < valor % 1);
      medias.push(Math.round(media * factor * 100) / 100);
      conteos.push(cantidad);
      const candidatos = puntos[d][m];
      assert(cantidad === 0 || candidatos.length > 0);
      for (let n = 0; n < cantidad; n++) {
        const centro = candidatos[Math.floor(aleatorio() * candidatos.length)];
        let punto;
        for (let intento = 0; intento < 200; intento++) {
          const radio = Math.sqrt(aleatorio()) * .012, angulo = aleatorio() * 2 * Math.PI;
          const candidato = [Number((centro[0] + radio * Math.cos(angulo) / .84).toFixed(5)), Number((centro[1] + radio * Math.sin(angulo)).toFixed(5))];
          if (contiene(candidato, geometrias[d])) { punto = candidato; break; }
        }
        assert(punto, "No se pudo ubicar un punto dentro de su departamento");
        events.push([...punto, d, y * 12 + m]);
      }
    }
    monthly.push(conteos); expected.push(medias);
  }
}
assert.equal(monthly.length, 120);
assert.equal(events.length, monthly.flat().reduce((a, b) => a + b, 0));
assert(events.every((e) => contiene(e, geometrias[e[2]])));
Object.assign(datos, { names, events, monthly, expected, start, end: start + 9, baseStart, baseEnd, seed: 271828, trends,
  source: "incendios.json: detecciones de Aqua con quemado=true", baseTotal,
  method: "Remuestreo anual: 50% conteo del año muestreado y 50% media mensual por departamento; pendiente de Sen relativa amortiguada y acotada a +/-30%; coordenadas remuestreadas con desplazamiento de hasta 1,5 km dentro del departamento. No validado como pronostico.",
  target: "Detecciones hipoteticas asociadas a incendios; no eventos independientes, probabilidades ni hectareas futuras.",
});
let html = plantilla.replace(/(<script id="scenario" type="application\/json">)[\s\S]*?(<\/script>)/, (_, a, b) => a + JSON.stringify(datos) + b);
html = html.replace(/<section class="scenario-note"[\s\S]*?<\/section>/, `<section class="scenario-note" aria-labelledby="scenario-note-title">
  <h2 id="scenario-note-title">Escenario simulado a partir del registro de incendios</h2>
  <p>Basado en ${baseTotal.toLocaleString("es-AR")} detecciones de Aqua asociadas a áreas quemadas entre ${baseStart} y ${baseEnd}. Reproduce patrones mensuales y departamentales, variabilidad entre años y una tendencia histórica amortiguada.</p>
  <p>Los puntos son ubicaciones hipotéticas para ${start}–${start + 9}, no incendios futuros confirmados. Una detección no equivale a un incendio individual. No se predicen hectáreas ni probabilidades; este escenario no está validado como pronóstico.</p>
</section>`);
html = html.replace('Punto térmico simulado', 'Detección de incendio simulada')
  .replace('puntos simulados · ${period()}', 'detecciones simuladas · ${period()}')
  .replace('} focos para este período', '} detecciones para este período')
  .replace('escenario-simulado-${state.all', 'escenario-incendios-simulado-${state.all');
writeFileSync(join(raiz, "public/demo/escenario-incendios.html"), html);
console.log(`Escenario incendios ${start}-${start + 9}: ${events.length} puntos; base Aqua ${baseStart}-${baseEnd}: ${baseTotal} detecciones. Validacion estructural y geometrica OK.`);
