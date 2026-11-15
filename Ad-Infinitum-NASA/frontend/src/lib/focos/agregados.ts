// Agregados precalculados a partir de los datos reales. Funciones puras: las usa
// scripts/preparar-datos.ts para generar src/lib/generado/resumen.json.
// Las importaciones llevan extension .ts para poder ejecutarse con Node sin compilar.

import { analizarTendencia, type Tendencia } from "../estadistica.ts";
import { capitalizar, decimal, entero, mesAnio, nombreMes, valorP } from "../formato.ts";
import type { CeldaMatriz, FocosCompactos, Resumen, SerieMensualDeptos, TendenciaResumen } from "./tipos.ts";

function resumirTendencia(t: Tendencia): TendenciaResumen {
  return {
    n: t.n,
    desde: t.desde,
    hasta: t.hasta,
    pendienteAnual: t.pendienteAnual,
    ordenada: t.ordenada,
    senAnual: t.senAnual,
    ordenadaSen: t.ordenadaSen,
    p: t.p,
    significativa: t.significativa,
  };
}

// Total mensual de la provincia: suma de departamentos. Si un mes no tiene dato
// en ningun departamento queda null; si falta solo en algunos tambien es null
// para no subestimar el total.
export function totalesMensuales(serie: SerieMensualDeptos): (number | null)[] {
  return serie.meses.map((_, i) => {
    let suma = 0;
    for (const d of serie.departamentos) {
      const v = d.conteos[i];
      if (v === null) return null;
      suma += v;
    }
    return suma;
  });
}

function anioMes(clave: string): [number, number] {
  const [a, m] = clave.split("-").map(Number);
  return [a, m];
}

export function calcularResumen(focos: FocosCompactos, serie: SerieMensualDeptos, generado: string): Resumen {
  const c = focos.columnas;

  // ---------- Todas las detecciones (todos los satelites) ----------
  const porDepto = new Map<string, number>();
  const porSat = new Map<number, { total: number; desde: number; hasta: number }>();
  const porAnio = new Map<number, number>();
  const porMesAnio = new Map<number, number>();
  const porOrigen = new Map<number, { total: number; desde: number; hasta: number }>();
  const porAnioOrigen = new Map<number, Map<number, number>>();
  let potenciaNoConfiable = 0;
  for (let i = 0; i < focos.n; i++) {
    const d = focos.departamentos[c.depto[i]];
    porDepto.set(d, (porDepto.get(d) ?? 0) + 1);
    const s = porSat.get(c.sat[i]) ?? { total: 0, desde: Infinity, hasta: -Infinity };
    s.total++;
    s.desde = Math.min(s.desde, c.anio[i]);
    s.hasta = Math.max(s.hasta, c.anio[i]);
    porSat.set(c.sat[i], s);
    porAnio.set(c.anio[i], (porAnio.get(c.anio[i]) ?? 0) + 1);
    const o = c.origen ? c.origen[i] : 0;
    const og = porOrigen.get(o) ?? { total: 0, desde: Infinity, hasta: -Infinity };
    og.total++;
    og.desde = Math.min(og.desde, c.anio[i]);
    og.hasta = Math.max(og.hasta, c.anio[i]);
    porOrigen.set(o, og);
    const pa = porAnioOrigen.get(c.anio[i]) ?? new Map<number, number>();
    pa.set(o, (pa.get(o) ?? 0) + 1);
    porAnioOrigen.set(c.anio[i], pa);
    const k = c.anio[i] * 100 + c.mes[i];
    porMesAnio.set(k, (porMesAnio.get(k) ?? 0) + 1);
    if (c.power[i] === null) potenciaNoConfiable++;
  }
  const [kPico, nPico] = [...porMesAnio].sort((a, b) => b[1] - a[1])[0];
  const [aPico, nAPico] = [...porAnio].sort((a, b) => b[1] - a[1])[0];

  // ---------- Serie comparable: tabla departamental (satelite AQUA) ----------
  const totales = totalesMensuales(serie);
  const [a0] = anioMes(serie.meses[0]);
  const [a1] = anioMes(serie.meses[serie.meses.length - 1]);
  const valorDe = new Map<number, number | null>();
  serie.meses.forEach((clave, i) => {
    const [a, m] = anioMes(clave);
    valorDe.set(a * 100 + m, totales[i]);
  });

  const matriz: CeldaMatriz[] = [];
  for (let a = a0; a <= a1; a++) {
    for (let m = 1; m <= 12; m++) {
      const k = a * 100 + m;
      if (!valorDe.has(k)) matriz.push({ anio: a, mes: m, valor: null, estado: "fuera" });
      else {
        const v = valorDe.get(k) ?? null;
        matriz.push({ anio: a, mes: m, valor: v, estado: v === null ? "sin-dato" : "dato" });
      }
    }
  }

  const estacionalidad = Array.from({ length: 12 }, (_, i) => {
    const mes = i + 1;
    const celdas = matriz.filter((x) => x.mes === mes && x.estado === "dato") as (CeldaMatriz & { valor: number })[];
    const suma = celdas.reduce((s, x) => s + x.valor, 0);
    const max = celdas.reduce((best, x) => (x.valor > best.valor ? x : best), celdas[0]);
    return {
      mes,
      promedio: celdas.length ? suma / celdas.length : 0,
      anios: celdas.length,
      maximo: max?.valor ?? 0,
      anioMaximo: max?.anio ?? 0,
    };
  });
  const ordenEst = [...estacionalidad].sort((a, b) => b.promedio - a.promedio);
  const mesPico = ordenEst[0].mes;
  const mesMinimo = ordenEst[ordenEst.length - 1].mes;

  // Tres meses consecutivos (circular) con mayor promedio y su peso en el anio
  const sumaProm = estacionalidad.reduce((s, e) => s + e.promedio, 0);
  let mejor = { meses: [1, 2, 3], suma: -1 };
  for (let i = 0; i < 12; i++) {
    const meses = [i, (i + 1) % 12, (i + 2) % 12];
    const suma = meses.reduce((s, j) => s + estacionalidad[j].promedio, 0);
    if (suma > mejor.suma) mejor = { meses: meses.map((j) => j + 1), suma };
  }

  const ranking = serie.departamentos
    .map((d) => ({ nombre: d.nombre, total: d.conteos.reduce<number>((s, v) => s + (v ?? 0), 0) }))
    .sort((a, b) => b.total - a.total);

  // Anios completos dentro de la tabla (enero a diciembre cubiertos)
  const anual: Resumen["aqua"]["anual"] = [];
  for (let a = a0; a <= a1; a++) {
    const celdas = matriz.filter((x) => x.anio === a);
    if (celdas.some((x) => x.estado === "fuera")) continue;
    anual.push({
      anio: a,
      total: celdas.reduce((s, x) => s + (x.valor ?? 0), 0),
      mesesSinDato: celdas.filter((x) => x.estado === "sin-dato").length,
    });
  }
  const tendencia = analizarTendencia(anual.map((x) => x.anio), anual.map((x) => x.total));
  const completos = anual.filter((x) => x.mesesSinDato === 0);
  const tendenciaSinFaltantes = analizarTendencia(completos.map((x) => x.anio), completos.map((x) => x.total));
  const anioPicoAqua = [...anual].sort((a, b) => b.total - a.total)[0];
  const anioMinAqua = [...anual].sort((a, b) => a.total - b.total)[0];

  const totalTodos = focos.n;
  const deptosOrden = [...porDepto].sort((a, b) => b[1] - a[1]).map(([nombre, total]) => ({ nombre, total }));

  // ---------- Hallazgos: cada cifra sale de los datos ----------
  const porDecada = tendencia.senAnual * 10;
  const verbo = tendencia.senAnual > 0 ? "aumentar" : tendencia.senAnual < 0 ? "disminuir" : "mantenerse";
  const hallazgos: Resumen["hallazgos"] = [
    {
      titulo: `${capitalizar(mesAnio(Math.floor(kPico / 100), kPico % 100))} fue el mes con más focos`,
      texto: `Los satélites registraron ${entero(nPico)} focos de calor en San Luis ese mes, el máximo mensual entre ${focos.fechaMin.slice(0, 4)} y ${focos.fechaMax.slice(0, 4)}. El año con más detecciones fue ${aPico}, con ${entero(nAPico)}.`,
    },
    {
      titulo: `El fuego tiene temporada: ${nombreMes(mejor.meses[0])}, ${nombreMes(mejor.meses[1])} y ${nombreMes(mejor.meses[2])}`,
      texto: `En la serie del satélite Aqua, esos tres meses reúnen el ${decimal((mejor.suma / sumaProm) * 100, 0)} % de los focos de un año promedio. ${capitalizar(nombreMes(mesPico))} es el mes más activo (${decimal(ordenEst[0].promedio, 0)} focos en promedio) y ${nombreMes(mesMinimo)} el más tranquilo (${decimal(ordenEst[ordenEst.length - 1].promedio, 1)}).`,
    },
    {
      titulo: tendencia.significativa
        ? `Los focos tienden a ${verbo} y la tendencia es significativa`
        : "No hay una tendencia clara en la cantidad de focos",
      texto: `Entre ${tendencia.desde} y ${tendencia.hasta} la serie anual de Aqua ${porDecada >= 0 ? "sube" : "baja"} unos ${decimal(Math.abs(porDecada), 0)} focos por década (pendiente de Sen) y la prueba de Mann-Kendall da ${valorP(tendencia.p)}. ${tendencia.significativa ? "Es poco probable que sea solo variación entre años." : "Con años tan distintos entre sí, esa diferencia puede deberse al azar."} Sin los ${anual.length - completos.length} años que tienen meses sin dato, ${valorP(tendenciaSinFaltantes.p)}.`,
    },
    {
      titulo:
        aPico === anioPicoAqua.anio
          ? `${aPico} fue el año más activo`
          : "El año más activo depende de qué satélites se cuenten",
      texto:
        (aPico === anioPicoAqua.anio
          ? `Lo es tanto con un solo satélite (Aqua: ${entero(anioPicoAqua.total)} focos) como sumando todos (${entero(nAPico)}).`
          : `Con un solo satélite (Aqua) fue ${anioPicoAqua.anio}, con ${entero(anioPicoAqua.total)} focos; sumando todos fue ${aPico}, con ${entero(nAPico)}.`) +
        ` El año más tranquilo de Aqua fue ${anioMinAqua.anio}, con ${entero(anioMinAqua.total)}. Años muy activos alternan con años tranquilos, y eso vuelve difícil leer una tendencia.`,
    },
    {
      titulo: `${deptosOrden[0].nombre} es el departamento con más focos`,
      texto: `Reúne ${entero(deptosOrden[0].total)} detecciones, el ${decimal((deptosOrden[0].total / totalTodos) * 100, 0)} % del total provincial, seguido por ${deptosOrden[1].nombre} y ${deptosOrden[2].nombre}.`,
    },
  ];

  return {
    generado,
    descargado: focos.descargado,
    fuente: focos.fuente,
    todos: {
      total: totalTodos,
      fechaMin: focos.fechaMin,
      fechaMax: focos.fechaMax,
      porDepto: deptosOrden,
      porSatelite: [...porSat]
        .map(([i, s]) => ({ satelite: focos.satelites[i] ?? "Desconocido", sensor: focos.sensores[i] ?? "", ...s }))
        .sort((a, b) => a.desde - b.desde || b.total - a.total),
      porAnio: [...porAnio].map(([anio, total]) => ({ anio, total })).sort((a, b) => a.anio - b.anio),
      porOrigen: [...porOrigen]
        .map(([o, s]) => ({ origen: focos.origenes?.[String(o)] ?? "CONAE", ...s }))
        .sort((a, b) => a.desde - b.desde),
      porAnioOrigen: [...porAnioOrigen]
        .map(([anio, mapa]) => ({
          anio,
          origenes: Object.fromEntries([...mapa].map(([o, n]) => [focos.origenes?.[String(o)] ?? "CONAE", n])),
        }))
        .sort((a, b) => a.anio - b.anio),
      mesAnioPico: { anio: Math.floor(kPico / 100), mes: kPico % 100, total: nPico },
      anioPico: { anio: aPico, total: nAPico },
      potenciaNoConfiable,
    },
    aqua: {
      desde: serie.meses[0],
      hasta: serie.meses[serie.meses.length - 1],
      total: ranking.reduce((s, d) => s + d.total, 0),
      mesesFaltantes: serie.mesesFaltantes,
      estacionalidad,
      matriz,
      ranking,
      anual,
      tendencia: resumirTendencia(tendencia),
      tendenciaSinFaltantes: resumirTendencia(tendenciaSinFaltantes),
      mesPico,
      mesMinimo,
      trimestrePico: { meses: mejor.meses, porcentaje: (mejor.suma / sumaProm) * 100 },
    },
    hallazgos,
  };
}

// Prueba rapida de coherencia para los archivos de entrada
export function validarEntrada(focos: FocosCompactos, serie: SerieMensualDeptos): void {
  const largo = focos.columnas.lon.length;
  for (const [k, v] of Object.entries(focos.columnas)) {
    if (v.length !== largo) throw new Error(`La columna ${k} tiene ${v.length} valores y se esperaban ${largo}`);
  }
  if (largo !== focos.n) throw new Error(`n = ${focos.n} pero hay ${largo} focos`);
  for (const d of serie.departamentos) {
    if (d.conteos.length !== serie.meses.length) throw new Error(`Serie incompleta en ${d.nombre}`);
  }
}
