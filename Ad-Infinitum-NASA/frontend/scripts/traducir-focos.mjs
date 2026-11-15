// Generate an isolated English presentation from the Spanish components.
// Shared data, calculations, styles and Spanish sources remain unchanged.
import ts from 'typescript';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'components/sitio/ContenidoFocos.tsx', 'components/sitio/ExploracionTemporal.tsx',
  'components/sitio/DemoEscenario.tsx', 'components/sitio/Descargas.tsx',
  'components/sitio/Estacionalidad.tsx', 'components/sitio/Metodo.tsx',
  'components/sitio/MetodoIncendios.tsx', 'components/explorador/Explorador.tsx',
  'components/explorador/ExploradorEnlazado.tsx', 'components/explorador/MapaFocos.tsx',
  'components/graficos/BarrasMes.tsx', 'components/graficos/SerieAnual.tsx',
  'components/graficos/MatrizAnioMes.tsx', 'components/graficos/RankingDeptos.tsx',
  'lib/formato.ts', 'lib/focos/modo.ts', 'lib/focos/escala.ts', 'lib/focos/origen.ts',
];
const modules = new Set(files.map(f => f.replace(/\.tsx?$/, '')));

const pairs = [
  ['Punto térmico simulado', 'Simulated thermal hotspot'],
  ['Dónde', 'Location'],
  ['Detección de incendio simulada', 'Simulated fire detection'],
  ['Cada punto es una muestra del escenario, no una ubicación futura confirmada.', 'Each point is a scenario sample, not a confirmed future location.'],
  ['Foco de calor simulado', 'Simulated thermal hotspot'],
  ['Simulación', 'Simulation'], ['Septiembre', 'September'],
  ['Aqua satellite, de', 'Aqua satellite, from'],
  ['Satélite Aqua, de', 'Aqua satellite, from'],
  [', de', ', from'],
  ['entre', 'between'], ['de los', 'of the'], ['de Aqua', 'from Aqua'], ['sobre', 'out of'],
  ['por década', 'per decade'], ['con extrapolación de tendencia hasta', 'with trend extrapolation through'],
  ['Pendiente de Sen', 'Sen’s slope'],
  ['Aqua (MODIS): serie histórica y NASA FIRMS donde la serie no tiene dato', 'Aqua (MODIS): historical series, supplemented with NASA FIRMS for missing months'],
  ['Escenario simulado basado en datos históricos', 'Simulated scenario based on historical data'],
  ['Este mapa muestra un escenario de focos de calor para un horizonte de diez años, construido a partir de registros históricos del satélite Aqua en San Luis. Considera la distribución de las detecciones por mes y departamento, su variabilidad entre años y sus patrones espaciales.', 'This map presents a ten-year thermal-hotspot scenario based on historical Aqua satellite records in San Luis. It considers monthly and departmental detection patterns, variability between years, and spatial patterns.'],
  ['Los puntos representan ubicaciones hipotéticas para explorar una posible evolución de la actividad térmica.', 'Points represent hypothetical locations for exploring a possible evolution of thermal activity.'],
  ['No corresponden a incendios observados ni a ubicaciones futuras confirmadas.', 'They are neither observed fires nor confirmed future locations.'],
  ['Explorá una posible evolución de los focos de calor en San Luis, basada en patrones históricos.', 'Explore a possible evolution of thermal hotspots in San Luis based on historical patterns.'],
  ['Los puntos son hipotéticos: no indican incendios que sabemos que ocurrirán.', 'Points are hypothetical: they do not identify fires known to occur in the future.'],
  ['Reproduce patrones mensuales y departamentales, variabilidad entre años y una tendencia histórica amortiguada.', 'It reproduces monthly and departmental patterns, year-to-year variability and a damped historical trend.'],
  ['no incendios futuros confirmados. Una detección no equivale a un incendio individual. No se predicen hectáreas ni probabilidades; este escenario no está validado como pronóstico.', 'not confirmed future fires. One detection does not equal one individual fire. Neither hectares nor probabilities are predicted; this scenario is not a validated forecast.'],
  ['Los puntos son ubicaciones hipotéticas para', 'Points are hypothetical locations for'],
  ['Basado en', 'Based on'], ['detecciones de Aqua asociadas a áreas quemadas entre', 'Aqua detections associated with burned areas between'],
  ['Ubicaciones hipotéticas para este período', 'Hypothetical locations for this period'],
  ['Concentración de puntos del escenario', 'Concentration of scenario points'],
  ['Horizonte de diez años', 'Ten-year horizon'], ['Intensidad relativa', 'Relative intensity'],
  ['Focos de calor simulados', 'Simulated thermal hotspots'],
  ['focos para este período', 'hotspots for this period'],
  ['focos', 'hotspots'],
  ['meses)', 'months)'], ['meses', 'months'],
  ['en la provincia', 'in the province'], ['en promedio', 'on average'],
  ['Hectáreas', 'Hectares'], ['Cargando', 'Loading'],
  ['Los diez años', 'All ten years'], ['Todo el año', 'All months'],
  ['Mes anterior', 'Previous month'], ['Mes siguiente', 'Next month'],
  ['Velocidad', 'Speed'], ['Lenta', 'Slow'], ['Normal', 'Normal'], ['Rápida', 'Fast'],
  ['Año del escenario', 'Scenario year'], ['Mes del escenario', 'Scenario month'],
  ['Distribución mensual del escenario', 'Monthly scenario distribution'],
  ['Distribución mensual', 'Monthly distribution'],
  ['Escenario mensual', 'Monthly scenario'], ['provincia de San Luis', 'San Luis Province'],
  ['Puntos simulados', 'Simulated points'], ['puntos simulados', 'simulated points'],
  ['Punto simulado', 'Simulated point'], ['no observaciones', 'not observations'],
  ['detecciones simuladas', 'simulated detections'], ['detecciones', 'detections'],
  ['Promedio del escenario:', 'Scenario average:'], ['para este período', 'for this period'],
  ['en diez años', 'over ten years'], ['durante diez años', 'over ten years'],
  ['Escenario simulado a partir del registro de incendios', 'Simulated scenario based on the fire record'],
  ['Explorador mensual de focos simulados', 'Monthly simulated hotspot explorer'],
  ['Controles de tiempo y departamento', 'Time and department controls'],
  ['Controles del mapa', 'Map controls'], ['Restablecer encuadre', 'Reset map view'],
  ['Mapa de San Luis con puntos térmicos simulados', 'San Luis map with simulated thermal hotspots'],
  ['Este escenario no genera focos para el período seleccionado.', 'This scenario generates no hotspots for the selected period.'],
  ['toda la provincia', 'the entire province'], ['SIMULADO', 'SIMULATED'],
  ['Serie histórica:', 'Historical series:'], ['Descargado', 'Downloaded'],
  ['Superficie quemada por año según MCD64A1.', 'Annual burned area from MCD64A1.'],
  ['Celdas vacías: mes sin granulo de MCD64A1 (no es cero). Valores en hectáreas.', 'Empty cells: no MCD64A1 granule for the month (not zero). Values are in hectares.'],
  ['Celdas vacías: mes sin dato en la fuente (no es cero).', 'Empty cells: no source data for the month (not zero).'],
  ['Aqua (MODIS): serie histórica y NASA FIRMS donde la serie no tiene dato.', 'Aqua (MODIS): historical series, supplemented with NASA FIRMS for missing months.'],
  ['base hasta octubre de 2024. NASA FIRMS: meses que la serie no registra y período posterior.', 'historical data through October 2024. NASA FIRMS: missing months and subsequent periods.'],
  ['Los satélites', 'The satellites'],
  ['(sensor MODIS) y, más tarde,', '(MODIS sensor) and, later,'],
  ['(sensor VIIRS) pasan sobre San Luis varias veces por día. Marcan como foco de calor cada punto mucho más caliente que su entorno. Esas detecciones se publican a través del Gobierno de San Luis. Para los meses que la serie histórica no registró y desde octubre de 2024 usamos las detecciones de NASA FIRMS.', '(VIIRS sensor) pass over San Luis several times a day. They flag points significantly hotter than their surroundings as thermal hotspots. The historical detections are published by the Government of San Luis. For missing months and from October 2024 onward, we use NASA FIRMS detections.'],
  ['Contamos los focos de cada mes y de cada departamento. Para comparar años usamos solo el satélite Aqua, que tiene el mismo sensor durante todo el período. Donde la serie histórica no tiene dato usamos los focos de Aqua de NASA FIRMS, con confianza 60 o más (el mismo criterio de la serie histórica). Cada mes indica de qué fuente viene.', 'We count hotspots by month and department. To compare years, we use only Aqua, which has the same sensor throughout the record. Missing historical months are supplemented with Aqua detections from NASA FIRMS at confidence 60 or higher, matching the historical criterion. Each month identifies its source.'],
  ['Sumamos los focos de cada año completo y trazamos la recta que mejor sigue a esos totales. El cambio por década sale de la pendiente de Sen, que usa la mediana y no se deja arrastrar por un año extremo.', 'We total the hotspots in each complete year and calculate the trend line. Change per decade is based on Sen’s slope, a median-based estimate that is less sensitive to an extreme year.'],
  ['La prueba de Mann-Kendall dice si la subida o bajada es más fuerte de lo que daría el azar. Con un valor p menor a 0,05 la llamamos significativa; si no, no concluyente.', 'The Mann–Kendall test assesses whether an increase or decrease is stronger than expected by chance. We label a trend significant when p < 0.05; otherwise, it is inconclusive.'],
  ['La prueba de Mann-Kendall dice si la subida o la bajada es más fuerte de lo que daría el azar. Con un valor p menor a 0,05 la llamamos significativa; si no, no concluyente.', 'The Mann–Kendall test assesses whether an increase or decrease is stronger than expected by chance. We label a trend significant when p < 0.05; otherwise, it is inconclusive.'],
  ['Un incendio grande puede dejar decenas de focos y uno chico, o cubierto por nubes, ninguno.', 'A large fire may produce dozens of detections, while a small or cloud-covered fire may produce none.'],
  ['VIIRS detecta fuegos más chicos que MODIS. Por eso la suma de todos los satélites no sirve para ver tendencias. Aqua, además, fue cambiando su horario de paso en sus últimos años.', 'VIIRS detects smaller fires than MODIS, so combining all satellites is unsuitable for trend analysis. Aqua’s overpass time has also shifted in recent years.'],
  ['reúnen el', 'account for'],
  ['% de los focos de un año. Por eso comparamos años completos y no meses sueltos.', '% of annual hotspots. This is why we compare complete years rather than isolated months.'],
  ['años completos es poco cuando un año puede tener el triple de focos que el siguiente.', 'complete years is a short record when one year can have three times as many hotspots as the next.'],
  ['meses no tenían dato en la tabla de la serie histórica por departamento; los completamos con NASA FIRMS. En', 'months were missing from the historical departmental table; we supplemented them with NASA FIRMS. For'],
  ['focos la potencia no es confiable (los registros MODIS desde 2017 perdieron el separador decimal) y se muestran como “sin dato confiable”. El campo Instrumento etiqueta como VIIRS a Terra y Aqua, por eso deducimos el sensor a partir del satélite.', 'hotspots, power values are unreliable (MODIS records from 2017 onward lost the decimal separator) and are shown as “no reliable data”. The Instrument field labels Terra and Aqua as VIIRS, so we infer the sensor from the satellite.'],
  ['Cada mes, NASA publica qué píxeles de unos 463 m se quemaron. MODIS (Terra y Aqua) cubre desde noviembre de 2000 y VIIRS desde marzo de 2012. Un píxel quemado equivale a unas 21,5 hectáreas. Sumamos esos píxeles por mes y por departamento.', 'NASA publishes monthly burned pixels at approximately 463 m resolution. MODIS (Terra and Aqua) coverage starts in November 2000 and VIIRS in March 2012. Each burned pixel represents about 21.5 hectares. We sum these pixels by month and department.'],
  ['Un foco de calor, de la serie histórica o de NASA FIRMS, cuenta como incendio confirmado si en el mismo mes hay un píxel quemado a menos de 1 km. Los focos sin área quemada cerca no se cuentan. Si el mes no tiene datos de área quemada, el foco no se evalúa y no se cuenta como sí ni como no.', 'A thermal hotspot from the historical series or NASA FIRMS is classified as fire-associated when a burned pixel lies within 1 km in the same month. Hotspots without nearby burned area are excluded. If burned-area data are missing for the month, the detection is not assessed or classified as either positive or negative.'],
  ['Sumamos la superficie quemada de cada año completo y trazamos la recta de tendencia. El cambio por década sale de la pendiente de Sen, que usa la mediana y no se deja arrastrar por un año extremo.', 'We total burned area for each complete year and calculate the trend line. Change per decade is based on Sen’s slope, a median-based estimate that is less sensitive to an extreme year.'],
  ['El píxel de 463 m no ve incendios chicos, y la cicatriz de un fuego puede quedar parcial o tapada por nubes.', 'The 463 m pixel may miss small fires, and burn scars may be incomplete or obscured by clouds.'],
  ['El área quemada se construye con detecciones de fuego, así que la coincidencia entre focos y área quemada es en parte por diseño. Para medir cuánto es real comparamos con puntos al azar dentro de la provincia: coinciden el', 'Burned-area products use active-fire detections, so some spatial agreement is built into the method. As a baseline, we compare with random points within the province:'],
  ['%, frente al', '% match, compared with'], ['% de los focos.', '% of hotspots.'],
  ['Entre 2001 y 2003 la superficie quemada supera ampliamente al resto de la serie. Todavía no sabemos si refleja un fuego real o un efecto del producto en sus primeros años. Los mostramos completos y no los quitamos de la tendencia.', 'Burned area in 2001–2003 is much higher than in the rest of the record. It is not yet clear whether this reflects actual burning or an early-product effect. These years remain visible and are retained in the trend analysis.'],
  ['años completos es poco cuando un año puede quemar varias veces lo que quemó el siguiente. El año en curso no entra en la tendencia hasta que termina.', 'complete years is a short record when one year can burn several times the area of the next. The current year is excluded from trend analysis until complete.'],
  ['Serie histórica (hasta oct. 2024)', 'Historical series (through Oct. 2024)'],
  ['Los', 'The'], ['Año', 'Year'], ['Mes', 'Month'], ['por década.', 'per decade.'],
  ['menos', 'fewer'], ['más', 'more'], ['mil', 'thousand'],
  ['¿Qué nos dicen los datos sobre el futuro?', 'What do the data tell us about the future?'],
  ['Explorá dónde y cuándo aparecen', 'Explore where and when they occur'],
  ['Explorá las detecciones registradas: elegí un año y un mes, filtrá por departamento o reproducí el registro mes a mes.', 'Explore recorded detections: choose a year and month, filter by department, or play the record month by month.'],
  ['Explorá un escenario mensual construido con detecciones históricas asociadas a áreas quemadas. Los puntos son simulados, no incendios futuros confirmados ni eventos individuales.', 'Explore a monthly scenario based on historical detections associated with burned areas. Points are simulated, not confirmed future fires or individual events.'],
  ['Explorá una posible evolución mensual de los focos de calor en San Luis durante diez años. Las ubicaciones son simuladas, no incendios futuros confirmados.', 'Explore a possible monthly evolution of thermal hotspots in San Luis over ten years. Locations are simulated, not confirmed future fires.'],
  ['Anomalías térmicas detectadas por satélite. Incluyen quemas controladas y otras fuentes de calor.', 'Satellite-detected thermal anomalies. These include controlled burns and other heat sources.'],
  ['Detecciones asociadas a una cicatriz de quema cercana en el mismo mes. Incluye el análisis de superficie quemada.', 'Detections associated with a nearby burn scar in the same month. Includes burned-area analysis.'],
  ['Elegí qué mostrar en el mapa y las métricas', 'Choose the data shown on the map and in the metrics'],
  ['Estacionalidad y tendencia', 'Seasonality and trend'], ['Cómo lo calculamos', 'How we calculate it'],
  ['Cómo calculamos los incendios', 'How we identify fires'],
  ['Análisis del registro histórico', 'Historical record analysis'],
  ['Usamos un solo producto, MCD64A1 (área quemada mensual de MODIS), desde noviembre de 2000 hasta hoy. No depende de qué satélite estaba activo, así que sirve para comparar años completos.', 'We use a single product, MCD64A1 (monthly MODIS burned area), from November 2000 onward. This avoids changes in the active satellite mix and allows comparisons across complete years.'],
  ['Para comparar años entre sí usamos un solo satélite, Aqua, que observó San Luis con el mismo sensor durante todo el período. Sumar satélites nuevos haría parecer que hay más fuego solo porque hay más ojos mirando.', 'To compare years, we use a single satellite, Aqua, which observed San Luis with the same sensor throughout the record. Adding new satellites could create an apparent increase simply because more sensors are observing.'],
  ['es poco probable que un cambio así aparezca por azar si en realidad no hubiera tendencia.', 'a change this large is unlikely to occur by chance if there were no underlying trend.'],
  ['Con años tan distintos entre sí, un cambio de este tamaño puede aparecer por azar aunque no haya una tendencia real. Hacen falta más años o una señal más fuerte para afirmarla.', 'With such large differences between years, a change of this size can occur by chance without a real trend. More years or a stronger signal are needed to establish one.'],
  ['La prueba de Mann-Kendall da', 'The Mann–Kendall test gives'],
  ['Cambio por década según la pendiente de Sen, que no se deja arrastrar por un año extremo.', 'Change per decade based on Sen’s slope, which is less sensitive to an extreme year.'],
  ['años tienen algún mes sin dato; si se los deja afuera,', 'years have at least one month with missing data; excluding them gives'],
  [' y la conclusión no cambia.', ' and the conclusion is unchanged.'],
  [' y la conclusión cambia: tomala con cuidado.', ' and the conclusion changes: interpret it cautiously.'],
  ['Solo se analizan años completos.', 'Only complete years are analyzed.'],
  ['hectáreas quemadas según MCD64A1, sobre', 'burned hectares according to MCD64A1, alongside'],
  ['detectados por todos los satélites', 'detected by all satellites'],
  ['Para la tendencia se analizan años completos de Aqua.', 'Trend analysis uses complete Aqua years.'],
  ['dónde y cuándo aparecen, cuánta superficie quemaron y si hay una tendencia.', 'where and when they occur, how much area burned, and whether there is a trend.'],
  ['dónde y cuándo aparecen, cómo se reparten en el año y si hay una tendencia.', 'where and when they occur, their seasonal distribution, and whether there is a trend.'],
  ['Sin datos anuales para proyectar.', 'No annual data available for extrapolation.'],
  ['Extiende la pendiente de Sen del período observado; no son datos medidos ni un pronóstico validado.', 'Extends Sen’s slope from the observed period; these are neither measured data nor a validated forecast.'],
  ['La tendencia histórica no es estadísticamente concluyente.', 'The historical trend is not statistically conclusive.'],
  ['Los valores negativos se muestran como cero.', 'Negative values are displayed as zero.'],
  ['Escenario si continúa la tendencia histórica', 'Scenario if the historical trend continues'],
  ['si continúa la tendencia histórica', 'if the historical trend continues'],
  ['Si continúa la tendencia histórica.', 'If the historical trend continues.'],
  ['Ver valores extrapolados', 'Show extrapolated values'], ['Valor aproximado', 'Approximate value'],
  ['Incluye', 'Includes'], ['meses sin dato', 'months with missing data'], ['mes sin dato', 'month with missing data'],
  ['año con meses sin dato', 'year with missing months'],
  ['tendencia (pendiente de Sen)', 'trend (Sen’s slope)'],
  ['Promedio por mes', 'Monthly average'], ['El máximo es', 'Peak month:'],
  ['en promedio', 'on average'], ['años con dato', 'years with data'], ['Máximo:', 'Maximum:'],
  ['Cada año, mes por mes', 'Every year, month by month'],
  ['Matriz de hectáreas quemadas por año y mes. La tabla equivalente está debajo.', 'Burned-area matrix by year and month. An equivalent table is available below.'],
  ['Matriz de focos por año y mes. La tabla equivalente está debajo.', 'Hotspot matrix by year and month. An equivalent table is available below.'],
  ['Hectáreas quemadas por año y mes', 'Burned hectares by year and month'],
  ['Focos por año y mes, satélite Aqua', 'Hotspots by year and month, Aqua satellite'],
  ['sin área quemada', 'no burned area'], ['sin focos', 'no hotspots'],
  ['fuera del registro', 'outside the record'], ['Ver como tabla', 'View as table'],
  ['sin dato', 'no data'], ['Sin dato', 'No data'],
  ['Fuera del período', 'Outside the period'],
  ['Focos por mes, promedio de todos los años', 'Monthly hotspots, average across all years'],
  ['Departamentos con más focos', 'Departments with the most hotspots'],
  ['Total acumulado del satélite Aqua en todo el período.', 'Cumulative Aqua detections over the entire period.'],
  ['Los meses sin dato no cuentan.', 'Months with missing data are excluded.'],
  ['Cantidad de focos de Aqua: serie histórica, y NASA FIRMS donde la serie no tiene dato. Las celdas rayadas son meses fuera del período con datos.', 'Aqua hotspot counts: historical series, supplemented with NASA FIRMS where records are missing. Hatched cells mark months outside the available record.'],
  ['Hectáreas quemadas por mes, promedio de todos los años', 'Monthly burned hectares, average across all years'],
  ['Departamentos con más área quemada', 'Departments with the largest burned area'],
  ['Total acumulado de hectáreas quemadas en todo el período.', 'Cumulative burned hectares over the entire period.'],
  ['Hectáreas quemadas por mes en la provincia (MCD64A1). Las celdas rayadas son meses fuera del período con datos.', 'Monthly burned hectares in the province (MCD64A1). Hatched cells mark months outside the available record.'],
  ['Área quemada según MCD64A1, de', 'Burned area from MCD64A1, from'],
  ['Preparando el mapa', 'Preparing the map'],
  ['de todo el registro', 'across the entire record'], ['de todos los meses de', 'across all years in'],
  ['en toda la provincia', 'across the province'],
  ['Pasá el cursor o tocá un foco o un departamento para leer sus datos.', 'Hover over or tap a hotspot or department to see its data.'],
  ['No se pudieron cargar los focos:', 'Could not load detections:'],
  ['No se pudo leer', 'Could not read'], ['Reintentar', 'Retry'],
  ['sin dato confiable', 'no reliable data'], ['Confianza de la detección:', 'Detection confidence:'],
  ['Potencia:', 'Radiative power:'], ['Potencia del foco (energía que emite, en megavatios)', 'Hotspot radiative power (megawatts)'],
  ['Concentración de', 'Concentration of'], ['ponderada por su potencia', 'weighted by radiative power'],
  ['Muestra dónde se agrupan los', 'Shows the concentration of'],
  [', no la superficie quemada. Los focos sin potencia confiable pesan como uno de 30 MW.', ', not burned area. Hotspots without reliable power data are weighted as 30 MW.'],
  ['como uno de 30 MW.', 'as a 30 MW hotspot.'],
  ['no la superficie quemada. Los focos sin potencia confiable pesan', 'not burned area. Hotspots without reliable power data are weighted'],
  ['Solo satélite Aqua (serie histórica)', 'Aqua satellite only (historical series)'],
  [', solo satélite Aqua', ', Aqua satellite only'],
  ['Dónde y con qué satélites', 'Location and satellites'],
  ['Todos los años', 'All years'], ['todos los años', 'all years'],
  ['todo el año', 'all months'], ['Reproducir mes a mes', 'Play month by month'], ['Pausar', 'Pause'],
  ['Datos registrados de', 'Recorded data from'],
  ['Escenario simulado para los próximos diez años', 'Simulated scenario for the next ten years'],
  ['Período de exploración', 'Exploration period'],
  ['Mostrar u ocultar atribuciones', 'Toggle attribution'], ['Acercar', 'Zoom in'], ['Alejar', 'Zoom out'],
  ['Usá Ctrl + rueda del mouse para acercar o alejar el mapa', 'Use Ctrl + scroll to zoom the map'],
  ['Usá ⌘ + rueda del mouse para acercar o alejar el mapa', 'Use ⌘ + scroll to zoom the map'],
  ['Usá dos dedos para mover el mapa', 'Use two fingers to move the map'],
  ['Datos: Gobierno de San Luis y NASA FIRMS', 'Data: Government of San Luis and NASA FIRMS'],
  ['Datos: NASA (MCD64A1), Gobierno de San Luis y NASA FIRMS', 'Data: NASA (MCD64A1), Government of San Luis and NASA FIRMS'],
  ['Datos: Gobierno de San Luis', 'Data: Government of San Luis'],
  ['Los mismos números que ves en el sitio, para abrir en una planilla o en Python. Cada archivo incluye la fuente y avisa qué meses no tienen dato.', 'The same figures shown on the site, ready for a spreadsheet or Python. Each file includes its source and identifies months with missing data.'],
  ['Hectáreas quemadas por mes y departamento', 'Burned hectares by month and department'],
  ['Focos por mes y departamento', 'Hotspots by month and department'],
  ['Hectáreas quemadas por año', 'Burned hectares by year'], ['Focos por año y fuente', 'Hotspots by year and source'],
  ['Focos por año', 'Hotspots by year'], ['Incendios por año y fuente', 'Fire detections by year and source'],
  ['Superficie quemada anual, de', 'Annual burned area, from'], ['Serie anual de Aqua', 'Annual Aqua series'],
  [', con la recta de tendencia, el valor p y la pendiente de Sen.', ', including the trend line, p-value and Sen’s slope.'],
  ['departamentos, mes por mes.', 'departments, month by month.'],
  ['Las celdas vacías son meses sin granulo de MCD64A1.', 'Empty cells indicate months without an MCD64A1 granule.'],
  ['Las celdas vacías son meses sin dato.', 'Empty cells indicate months with missing data.'],
  ['Incendios confirmados por año, según venga el foco de la serie histórica o de NASA FIRMS.', 'Fire-associated detections by year, from the historical series or NASA FIRMS.'],
  ['Todos los focos del sitio, por año y por fuente: serie histórica y NASA FIRMS. Incluye los focos que no son de Aqua.', 'All site detections by year and source: historical series and NASA FIRMS, including satellites other than Aqua.'],
  ['Puntos simulados para diez años. Exporta los filtros del escenario abierto o el horizonte completo si estás en la vista histórica. No son observaciones ni ubicaciones futuras confirmadas.', 'Simulated points over ten years. Exports the active scenario filters, or the full horizon from the historical view. These are not observations or confirmed future locations.'],
  ['No se pudo generar el archivo:', 'Could not generate the file:'], ['Probá de nuevo en unos segundos.', 'Please try again in a few seconds.'],
  ['No se pudieron cargar los datos del escenario', 'Could not load scenario data'],
  ['El escenario no contiene datos exportables', 'The scenario has no exportable data'],
  ['Escenario futuro basado en incendios', 'Future scenario based on fire detections'],
  ['Escenario futuro de focos de calor', 'Future thermal-hotspot scenario'],
  ['Escenario futuro: detecciones de incendios simuladas durante diez años', 'Future scenario: simulated fire detections over ten years'],
  ['Escenario futuro: evolución mensual de focos simulados en San Luis durante diez años', 'Future scenario: monthly simulated hotspots in San Luis over ten years'],
  ['Descargar CSV', 'Download CSV'],
  ['Cuatro pasos, sin cajas negras. Todo el cálculo corre con los datos publicados y se puede repetir.', 'Four transparent steps. All calculations use published data and can be reproduced.'],
  ['Cuatro pasos, con datos públicos de NASA y del Gobierno de San Luis. Todo el cálculo se puede repetir y cada paso se puede revisar.', 'Four steps using public data from NASA and the Government of San Luis. All calculations can be reproduced and every step can be reviewed.'],
  ['Datos satelitales', 'Satellite data'], ['Serie mensual', 'Monthly series'], ['Significancia', 'Statistical significance'],
  ['Dónde se quemó', 'Where burning occurred'], ['Qué foco es un incendio', 'Which hotspots are associated with fires'],
  ['Límites que conviene tener presentes', 'Limitations to keep in mind'],
  ['Un foco es una detección, no superficie quemada.', 'A hotspot is a detection, not burned area.'],
  ['Los sensores cambian.', 'Sensors change.'], ['La serie es muy estacional.', 'The record is highly seasonal.'],
  ['Pocos años para una tendencia.', 'Few years for estimating a trend.'], ['La fuente tiene errores conocidos.', 'The source has known errors.'],
  ['Un píxel quemado no es un incendio completo.', 'A burned pixel is not an entire fire.'],
  ['No es una validación independiente.', 'This is not independent validation.'],
  ['Los primeros años tienen cifras muy altas.', 'The earliest years have very high values.'],
  ['Cambio por década', 'Change per decade'], ['Valor p', 'P-value'], ['Años analizados', 'Years analyzed'],
  ['No concluyente', 'Inconclusive'], ['Significativa', 'Significant'],
  ['Tendencia de', 'Trend from'], ['tendió a disminuir', 'tended to decrease'], ['tendió a aumentar', 'tended to increase'],
  ['tendieron a disminuir', 'tended to decrease'], ['tendieron a aumentar', 'tended to increase'],
  ['disminuyeron', 'decreased'], ['aumentaron', 'increased'], ['disminuyó', 'decreased'], ['aumentó', 'increased'],
  ['no muestra cambio neto.', 'shows no net change.'], ['Entre', 'Between'], ['unos', 'about'],
  ['menos por década.', 'fewer per decade.'], ['más por década.', 'more per decade.'],
  ['focos por año (Aqua)', 'hotspots per year (Aqua)'], ['hectáreas quemadas por año', 'burned hectares per year'],
  ['focos por década', 'hotspots per decade'], ['hectáreas por década', 'hectares per decade'],
  ['los focos', 'hotspots'], ['la superficie quemada', 'burned area'], ['Área quemada (MCD64A1)', 'Burned area (MCD64A1)'],
  ['Cargando los focos de calor.', 'Loading thermal hotspots.'], ['Cargando los incendios confirmados.', 'Loading fire-associated detections.'],
  ['Focos de calor en San Luis', 'Thermal hotspots in San Luis'], ['Incendios confirmados en San Luis', 'Fire-associated detections in San Luis'],
  ['Focos de calor', 'Thermal hotspots'], ['Incendios confirmados', 'Fire-associated detections'],
  ['Detecciones satelitales de', 'Satellite detections from'],
  ['incendios confirmados', 'fire-associated detections'], ['focos en total', 'total hotspots'],
  ['de la serie histórica y', 'from the historical series and'], ['de NASA FIRMS', 'from NASA FIRMS'],
  ['Tipo de registro', 'Record type'], ['En esta página', 'On this page'], ['Qué mostrar', 'Data selection'],
  ['Descargas', 'Downloads'], ['Histórico', 'Historical'], ['Futuro', 'Future'],
  ['Mapa de calor', 'Heatmap'], ['Puntos', 'Points'], ['Mapa', 'Map'],
  ['Departamento', 'Department'], ['Toda la provincia', 'Entire province'],
  ['Satélite Aqua', 'Aqua satellite'], ['Satélite', 'Satellite'], ['Período', 'Period'], ['Vista', 'View'],
  ['Tendencia', 'Trend'], ['Extrapolación', 'Extrapolation'], ['aproximadamente', 'approximately'],
  ['zona sombreada', 'shaded area'], ['Serie de', 'Record from'],
  ['hectáreas', 'hectares'], ['embalse', 'reservoir'], ['menor', 'lower'], ['mayor', 'higher'],
  ['menos de', 'less than'], ['o más', 'or more'],
];

const protectedValues = new Set(['focos', 'incendios', 'puntos', 'calor', 'dato', 'sin-dato', 'fuera', 'depto', 'foco', 'es', 'en', 'base: 1 km, mismo mes, MCD+VNP']);
const sorted = [...pairs].sort((a,b) => b[0].length-a[0].length);
function translate(value) {
  // Normalize source indentation for long prose while preserving literal edge spaces.
  let s = value.replace(/\s+/g, ' ');
  const used = [];
  for (const [es,en] of sorted) {
    const rx = new RegExp('(?<![\\p{L}])'+es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')+'(?![\\p{L}])', 'gu');
    s = s.replace(rx, () => { const i=used.push(en)-1; return `\u0001${i}\u0002`; });
  }
  s=s.replace(/\u0001(\d+)\u0002/g,(_,i)=>used[Number(i)]);
  const exact={ y:'and', a:'to', de:'of', en:'in', desde:'from', meses:'months', total:'total', anio:'year', periodo:'period', departamento:'department', longitud:'longitude', latitud:'latitude', tipo:'type' };
  const key=s.trim();
  return exact[key] ? s.replace(key,exact[key]) : s;
}

for (const file of files) {
  let source = readFileSync(path.join(root,'src',file),'utf8');
  if (file==='lib/focos/modo.ts') {
    source=source.replace('singular: "foco"','singular: "hotspot"').replace('plural: "focos"','plural: "hotspots"')
      .replace('unidadSerie: "focos"','unidadSerie: "hotspots"').replace('singular: "incendio"','singular: "fire detection"').replace('plural: "incendios"','plural: "fire detections"');
  }
  const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  const edits=[];
  function visit(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      const start=node.getStart(ast)+1;
      const end=node.end-(ts.isTemplateHead(node)||ts.isTemplateMiddle(node)?2:1);
      const raw=source.slice(start,end);
      if (!protectedValues.has(raw) && !raw.startsWith('@/') && !raw.startsWith('./') && !raw.startsWith('../') && !raw.startsWith('/')) {
        let translated=translate(raw);
        if (node.parent && ts.isJsxAttribute(node.parent)) translated=translated.replaceAll('"','&quot;');
        else translated=translated.replaceAll("'","’");
        if (translated!==raw && raw.trim()) edits.push({start,end,text:translated});
      }
    } else if (ts.isJsxText(node) && node.text.trim()) {
      edits.push({start:node.pos,end:node.end,text:translate(source.slice(node.pos,node.end)).replaceAll('<','&lt;')});
    }
    ts.forEachChild(node,visit);
  }
  visit(ast);
  for (const e of edits.sort((a,b)=>b.start-a.start)) source=source.slice(0,e.start)+e.text+source.slice(e.end);
  source=source.replace(/(from\s+|import\s*\()(["'])([^"']+)\2/g,(all,prefix,q,spec)=>{
    let resolved=spec.startsWith('@/')?spec.slice(2):spec.startsWith('.')?path.posix.normalize(path.posix.join(path.posix.dirname(file),spec)):null;
    if(!resolved) return all;
    return `${prefix}${q}@/${modules.has(resolved)?'presentation-en/':''}${resolved}${q}`;
  });
  if(file==='components/sitio/ContenidoFocos.tsx') {
    source=source.replace('language = "es"','language = "en"').replaceAll('"/focos"','"/focos?lang=en"').replaceAll('"/focos?modo=incendios"','"/focos?modo=incendios&lang=en"')
      .replace('<EstadoDato estado="real" />','<EstadoDato estado="real" language="en" />')
      .replace('className={acabado.pagina}>','className={acabado.pagina} lang="en">');
  }
  if(file==='components/explorador/Explorador.tsx') {
    source=source.replace(/function describirPeriodo[\s\S]*?\n}/,`function describirPeriodo(anio: number | null, mes: number | null): string {
  if (anio === null && mes === null) return "across the entire record";
  if (anio === null) return \`in \${nombreMes(mes!)} across all years\`;
  if (mes === null) return \`in \${anio}\`;
  return \`in \${nombreMes(mes)} \${anio}\`;
}`)
      .replace('"across all years in septiembre"','"in September across all years"')
      .replace('`de septiembre de ${anio}`','`in September ${anio}`')
      .replace('`${rango.a0} a ${rango.a1}`','`${rango.a0} to ${rango.a1}`')
      .replace('{c.dia[i]} of {nombreMes(c.mes[i])} of {c.anio[i]}','{nombreMes(c.mes[i])} {c.dia[i]}, {c.anio[i]}');
  }
  if(file==='components/sitio/Estacionalidad.tsx') {
    source=source.replaceAll('"menos"','"fewer"').replaceAll('"más"','"more"')
      .replace('${verbo}: about ${decimal(porDecada, 0)} ${T.unidadSerie} ${baja ? "fewer" : "more"} per decade.', '${verbo} by about ${decimal(porDecada, 0)} ${T.unidadSerie} per decade.');
  }
  if(file==='components/sitio/Descargas.tsx') {
    const headers={mes:'month',total_provincia:'province_total',fuente:'source',meses_sin_dato:'missing_months',months_sin_dato:'missing_months',tendencia_sen:'sen_trend',tendencia_minimos_cuadrados:'least_squares_trend',si:'yes'};
    for(const [es,en] of Object.entries(headers)) source=source.replaceAll(JSON.stringify(es),JSON.stringify(en));
  }
  // Friendly numeric class labels use English grouping and range connectors.
  if(file==='lib/focos/escala.ts' || file==='lib/focos/modo.ts') {
    source=source.replace(/etiqueta: "([^"]+)"/g,(_,v)=>`etiqueta: "${v.replace(/(\d)\.(\d{3})/g,'$1,$2').replace(/(\d) a (\d)/g,'$1 to $2')}"`);
    source=source.replace('} thousand`','}k`')
      .replaceAll('"hectareas_quemadas"','"burned_hectares"')
      .replaceAll('"hotspots-anuales-aqua"','"annual-aqua-hotspots"')
      .replaceAll('"hotspots-mensuales-por-departamento"','"monthly-hotspots-by-department"')
      .replaceAll('"hectareas-quemadas-anuales"','"annual-burned-hectares"')
      .replaceAll('"hectareas-quemadas-mensuales-por-departamento"','"monthly-burned-hectares-by-department"');
  }
  if(file==='components/sitio/DemoEscenario.tsx' || file==='components/sitio/Descargas.tsx') {
    source=source.replaceAll('/demo/escenario-incendios.html','/demo/escenario-incendios-en.html').replaceAll('/demo/escenario-futuro.html','/demo/escenario-futuro-en.html');
  }
  if(file==='lib/formato.ts') {
    const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    const es=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    es.forEach((m,i)=>source=source.replace(`"${m}"`,JSON.stringify(months[i])));
    source=source.replace(/export const MESES_CORTOS = .*?as const;/,`export const MESES_CORTOS = ${JSON.stringify(months.map(m=>m.slice(0,3)))} as const;`)
      .replaceAll('"es-AR"','"en-US"').replace('p < 0,001','p < 0.001')
      .replace('`${nombreMes(mes)} of ${anio}`','`${nombreMes(mes)} ${anio}`')
      .replace('`${d} of ${nombreMes(m)} of ${a}`','`${nombreMes(m)} ${d}, ${a}`');
  }
  const dest=path.join(root,'src/presentation-en',file);
  mkdirSync(path.dirname(dest),{recursive:true});
  writeFileSync(dest,'// Generated by scripts/traducir-focos.mjs. Spanish source and calculations are shared.\n'+source);
}
console.log(`English presentation generated: ${files.length} modules.`);

const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
for(const name of ['escenario-futuro','escenario-incendios']) {
  const original=readFileSync(path.join(root,`public/demo/${name}.html`),'utf8');
  const blocks=[];
  let html=original.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g,(block,tag)=>{
    if(tag==='script' && !block.includes('application/json')) {
      const start=block.indexOf('>')+1,end=block.lastIndexOf('</script>');
      let js=block.slice(start,end);
      const tree=ts.createSourceFile('scenario.js',js,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS), edits=[];
      function visit(node) {
        if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)||ts.isTemplateHead(node)||ts.isTemplateMiddle(node)||ts.isTemplateTail(node)) {
          const a=node.getStart(tree)+1,b=node.end-(ts.isTemplateHead(node)||ts.isTemplateMiddle(node)?2:1),raw=js.slice(a,b);
          if(!protectedValues.has(raw)) edits.push({a,b,text:translate(raw).replaceAll("'",'’')});
        }
        ts.forEachChild(node,visit);
      }
      visit(tree);
      for(const e of edits.sort((a,b)=>b.a-a.a)) js=js.slice(0,e.a)+e.text+js.slice(e.b);
      js=js.replace(/const MONTHS=\[[^\]]+\]/,`const MONTHS=${JSON.stringify(monthNames)}`)
        .replace(/const SHORT=\[[^\]]+\]/,`const SHORT=${JSON.stringify(monthNames.map(m=>m.slice(0,3)))}`)
        .replaceAll('es-AR','en-US').replace(' of ${y}',' ${y}').replace('focos para','hotspots for')
        .replace(' de 10',' of 10').replace(' de 12',' of 12').replace(' · mes ',' · month ')
        .replace('periodo,departamento,longitud,latitud,tipo','period,department,longitude,latitude,type');
      block=block.slice(0,start)+js+block.slice(end);
    }
    return `\u0000BLOCK${blocks.push(block)-1}\u0000`;
  });
  html=html.replace(/>([^<>]+)</g,(_,text)=>`>${translate(text)}<`)
    .replace(/(aria-label|title)="([^"]+)"/g,(_,attr,value)=>`${attr}="${translate(value)}"`)
    .replace('lang="es"','lang="en"')
    .replace('3.945','3,945').replace('2016 y 2025','2016 and 2025').replace('0,5×','0.5×');
  html=html.replace(/\u0000BLOCK(\d+)\u0000/g,(_,i)=>blocks[Number(i)]);
  writeFileSync(path.join(root,`public/demo/${name}-en.html`),html);
}
