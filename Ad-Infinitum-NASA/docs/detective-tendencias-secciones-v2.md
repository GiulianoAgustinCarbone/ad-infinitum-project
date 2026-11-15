# Detective de Tendencias - Secciones del frontend y cambios v2

Equipo NASA Space Apps 2026. Documento de trabajo para el frontend (Next.js). El backend ya expone la API de la NASA con las variables; este documento solo cubre la interfaz.

Estado del diseno: dos pantallas aprobadas (Explorador y Comparar regiones). Este documento las describe seccion por seccion y define los cambios que el equipo quiere sumar:

1. Mapa geografico con capa de calor (temperatura).
2. Comparar la temperatura de un sector contra otro, a lo largo de los anios.
3. Descargar los resultados en PDF, Word y otros formatos.

---

## 1. Mapa del sitio

| Ruta | Pantalla | Proposito |
|---|---|---|
| `/` | Explorador | Ver una region y una variable en el tiempo, con tendencia y significancia |
| `/comparar` | Comparar regiones | Poner dos sectores frente a frente (mapa, serie y correlacion) |
| `/metodo` (ancla) | Metodo | Explicar tendencia lineal, Mann-Kendall y correlacion en lenguaje simple |

Navegacion superior comun a todas las pantallas: Explorar, Comparar regiones, Metodo, y una etiqueta "Datos ilustrativos" mientras se use informacion de ejemplo.

---

## 2. Pantalla Explorador (`/`)

### 2.1 Encabezado
- **Contenido:** logotipo con nombre, navegacion, etiqueta de datos ilustrativos.
- **Comportamiento:** el enlace activo se marca con `aria-current="page"`. En pantallas angostas la navegacion se acomoda en varias filas.

### 2.2 Presentacion (hero)
- **Contenido:** titulo "Como cambio tu region con el tiempo?" y una frase que explica la herramienta.
- **Regla:** una sola frase, sin relleno. El objetivo es que un estudiante entienda en cinco segundos que debe elegir una region y una variable.

### 2.3 Panel de controles (columna izquierda)
Tres pasos en orden.

| Paso | Control | Comportamiento |
|---|---|---|
| 1. Region | Mapa + lista de regiones | Seleccionar region desde el mapa o la lista; ambas se sincronizan |
| 2. Variable | Botones tipo pastilla | Una variable activa a la vez (NDVI, precipitacion, humedad del suelo, **temperatura**) |
| 3. Periodo | Dos controles deslizantes (desde, hasta) | Minimo 5 anios de diferencia. Al mover, se recalcula tendencia y significancia |

Todos los controles son elementos nativos (`button`, `input type="range"`) para que funcionen con teclado y lector de pantalla. Objetivo tactil minimo de 44 px.

### 2.4 Resultado (columna derecha)
Bloques, de arriba hacia abajo:

1. **Linea de contexto:** region, variable y periodo.
2. **Titular del resultado:** una frase generada, por ejemplo "En Chaco Seco, el NDVI disminuyo X por decada entre 2005 y 2024." Si la tendencia no es significativa, el verbo cambia a "tendio a disminuir".
3. **Etiqueta de significancia + explicacion:** "Tendencia significativa" (p menor que 0,05) o "Tendencia no concluyente", con una frase que explica que significa.
4. **Grafico de serie anual:** linea de valores, puntos y recta de tendencia (terracota si baja, verde si sube). Etiquetas de ejes en HTML sobre el SVG.
5. **Tres tarjetas:** cambio por decada, valor p (Mann-Kendall), anios analizados.
6. **Bloque "Que mide":** definicion simple de la variable y fuente NASA posible.

### 2.5 Metodo (pie de pagina)
- Dos parrafos cortos: como se calcula la tendencia y que significa el valor p.
- Aviso de que los datos son ilustrativos hasta conectar la API real.

---

## 3. Pantalla Comparar regiones (`/comparar`)

### 3.1 Panel de controles
| Control | Detalle |
|---|---|
| Region A | Pastillas; color de linea oscuro |
| Region B | Pastillas; color de linea terracota |
| Variable | Igual que en Explorar |
| Desfase | Deslizador de 0 a 12 meses: cuanto tarda B en reaccionar a lo que le paso a A |

### 3.2 Resultado
1. **Veredicto automatico:** "Comportamiento opuesto" (r menor que -0,5), "Tendencia sincronizada" (r mayor que +0,5) o "Sin relacion clara". Cada uno con su explicacion.
2. **Grafico superpuesto:** dos series normalizadas (desviaciones respecto del promedio). Al mover el desfase, B se corre en el tiempo.
3. **Tarjetas:** correlacion de Pearson, desfase elegido, meses comparados.
4. **Barras de correlacion por desfase:** una barra por cada desfase de 0 a 12. Se puede tocar una barra para elegir ese desfase. Un boton lleva al "mejor desfase".

---

## 4. Cambios nuevos (v2)

### 4.1 Mapa geografico con capa de calor

**Objetivo:** que el usuario vea donde hace mas calor, sobre un mapa real, y elija la region tocando el mapa.

**Que incluye**
- Mapa base con zoom y desplazamiento.
- Capa de temperatura con escala de color (secuencial, de claro a oscuro) y leyenda con unidades.
- Selector de mes y anio para cambiar la capa.
- Al pasar el cursor (o tocar), se muestra el valor de ese punto.
- Seleccion de sector: dibujar un rectangulo o elegir un poligono predefinido. El sector elegido alimenta el grafico de la derecha.
- Boton para animar los anios en secuencia (reproducir, pausar).

**Dos formas de dibujar la capa, y cuando usar cada una**

| Enfoque | Datos que necesita | Ventaja | Limite |
|---|---|---|---|
| Teselas de imagen de NASA (GIBS) | Ninguno propio: se piden imagenes por fecha | Rapido de integrar, aspecto oficial | Es imagen: no entrega el valor numerico exacto |
| Capa propia con los datos de la API | Valores por celda o punto, desde su backend | Permite valor exacto, comparar sectores y exportar | Mas trabajo de preparacion |

**Recomendacion:** usar la capa propia con los datos de su API como principal, porque la comparacion y la descarga necesitan valores. Sumar las teselas GIBS solo como fondo opcional de contexto.

**Advertencia de honestidad visual:** una capa de "mapa de calor" por densidad de puntos representa concentracion, no un campo continuo de temperatura. Para temperatura conviene una cuadricula de celdas coloreadas por valor (o una imagen raster) con leyenda. Si usan una capa de calor por densidad, deben ponderar cada punto por su valor y explicar la escala.

### 4.2 Comparar la temperatura de un sector contra otro, por anios

**Flujo**
1. Usuario elige Sector A y Sector B en el mapa (o en la lista).
2. Dos mapas lado a lado, sincronizados en zoom y posicion, con la misma escala de color. Opcion alternativa: un solo mapa con control deslizante de cortina.
3. Un filtro de anios comun controla ambos mapas y los graficos.
4. Debajo, un grafico con la temperatura anual de A y B (dos lineas) y una tercera serie opcional con la diferencia (B menos A).
5. Tabla anual con valor A, valor B y diferencia.

**Elementos nuevos**
- Selector de sector (A y B) con colores fijos: A oscuro, B terracota.
- Tarjetas: temperatura media de cada sector en el periodo, diferencia media, y tendencia por decada de cada uno con su valor p.
- Anomalia: opcion para ver "diferencia respecto del promedio historico" con una escala divergente (azul a rojo), para que se vea que se esta calentando mas alla del ciclo normal.

**Regla estadistica:** la tendencia de cada sector se calcula con regresion lineal y Mann-Kendall, igual que en el Explorador. Para evitar que el ciclo estacional enmascare el cambio, trabajar con promedios anuales o con anomalias mensuales.

### 4.3 Descarga de resultados

**Formatos**

| Formato | Contenido | Uso |
|---|---|---|
| PDF | Informe: titulo, region, variable, periodo, captura del mapa, grafico, resultado de tendencia, tabla, fuentes | Compartir y presentar |
| Word (.docx) | Mismo informe, editable | Trabajos de clase, edicion posterior |
| CSV | Serie anual (y mensual si existe) con tendencia | Analisis en Excel o Python |
| PNG | Grafico o mapa por separado | Diapositivas y redes |

**Comportamiento**
- Boton "Descargar" con menu de formatos, visible en el Explorador y en Comparar.
- El archivo refleja exactamente lo que se ve: region, variable, rango de anios y sectores elegidos.
- El nombre del archivo incluye region, variable y periodo, por ejemplo `chaco-seco_ndvi_2005-2024.pdf`.
- Todo se genera en el navegador, sin pasar por el servidor.
- Incluir siempre las fuentes de datos y la advertencia de que los datos pueden ser ilustrativos si se estan usando de ejemplo.

**Detalle tecnico importante:** capturar un mapa WebGL con herramientas que "fotografian" el HTML suele dar una imagen en blanco. Conviene pedir la imagen directamente al lienzo del mapa (activando la opcion de conservar el buffer de dibujo) y luego insertarla en el PDF o el Word. Verificar esto en la primera prueba.

### 4.4 Ajustes menores en pantallas existentes
- Agregar **Temperatura** como cuarta variable en el selector.
- Sustituir el marcador de posicion del mapa del Paso 1 por el mapa real.
- En Comparar, anadir la fila de mapas lado a lado encima del grafico superpuesto.

---

## 5. Contrato de datos

Mantener este formato entre backend y frontend. Si la API de la NASA devuelve otra forma, un adaptador en `lib/api` la convierte.

```json
{
  "region": { "id": "san-luis", "name": "San Luis", "bbox": [-67.5, -35.5, -64.5, -32.0] },
  "variable": { "id": "land_surface_temperature", "name": "Temperatura superficial", "unit": "C" },
  "series": [
    { "date": "2005", "value": 24.1 },
    { "date": "2006", "value": 24.4 }
  ],
  "trend": {
    "slope_per_decade": 0.6,
    "p_value": 0.012,
    "significant": true,
    "method": "mann-kendall"
  },
  "grid": {
    "year": 2024,
    "cell_size_deg": 0.25,
    "cells": [
      { "lon": -66.1, "lat": -33.3, "value": 34.2 }
    ]
  },
  "sources": ["MODIS", "GLDAS"]
}
```

Para comparar, el frontend pide dos veces el mismo formato (sector A y sector B) y calcula diferencia y correlacion en el cliente.

---

## 6. Librerias y repositorios recomendados

Todo para el frontend. Verificar licencia y mantenimiento antes de instalar.

| Necesidad | Opcion recomendada | Notas |
|---|---|---|
| Mapa base | MapLibre GL JS con `react-map-gl` | `react-map-gl` es el contenedor React; deck.gl lo recomienda como companero |
| Capas de datos sobre el mapa | `deck.gl` (`@deck.gl/maplibre`, `@deck.gl/aggregation-layers`) | Incluye `HeatmapLayer`; para temperatura, evaluar capas de celdas |
| Alternativa mas simple | Leaflet + Leaflet.heat (fork `@linkurious/leaflet-heat`, TypeScript y ESM) | Menos potente, mas facil de aprender |
| Imagenes oficiales de NASA | GIBS por teselas WMTS | Repositorio `nasa-gibs/gibs-web-examples` con ejemplos para OpenLayers, Leaflet, Cesium y Mapbox GL |
| Referencia completa de interfaz NASA | Worldview (codigo abierto, basado en OpenLayers) | Para inspirarse, no para copiar |
| PDF | `jsPDF` + `jspdf-autotable` | Tablas en PDF; `html2canvas` solo para graficos HTML |
| Word | `docx` (npm) | Funciona en el navegador; admite tablas e imagenes |
| CSV | Nativo (`Blob` + enlace de descarga) | Sin dependencias |

**Advertencia de seguridad:** el paquete `react-leaflet-heatmap-layer` figuro en un aviso de seguridad por una version comprometida (2.0.1) dentro de un ataque a la cadena de suministro, y ademas tiene poco mantenimiento. Evitarlo. Si se usa Leaflet, preferir `react-leaflet-heat-layer` (envoltorio de Leaflet.heat para react-leaflet v4) y fijar versiones exactas en `package.json`.

---

## 7. Estructura de componentes (Next.js)

```
web/
  app/
    page.tsx                  Explorador
    comparar/page.tsx         Comparar regiones
  components/
    Header.tsx
    ControlPanel/
      RegionPicker.tsx
      VariablePicker.tsx
      YearRange.tsx
    Map/
      MapView.tsx             mapa base
      TempLayer.tsx           capa de temperatura
      SectorSelector.tsx      dibujar o elegir sector
      MapLegend.tsx
      SyncedMaps.tsx          dos mapas sincronizados
    Charts/
      TrendChart.tsx
      CompareChart.tsx
      LagBars.tsx
    Result/
      Headline.tsx
      SignificanceBadge.tsx
      StatCards.tsx
      VariableExplainer.tsx
    Export/
      ExportMenu.tsx
  lib/
    stats.ts                  regresion, Mann-Kendall, Pearson con desfase
    api/nasa.ts               adaptador al backend
    export/pdf.ts
    export/docx.ts
    export/csv.ts
  public/data/                JSON de ejemplo mientras no haya API
```

Estado global minimo: region o sector A y B, variable, rango de anios, desfase. Guardarlo en la URL (parametros de busqueda) para poder compartir un enlace exacto.

---

## 8. Sistema visual (resumen)

- **Estilo:** cuaderno de campo cientifico. Fondo cálido, tinta oscura, dos acentos.
- **Colores:** fondo `#F6F3EC`, tinta `#1C211F`, borde `#DDD7CA`, terracota `#C8643A` (baja o sequia, texto `#A24A22`), verde `#2F7D5B` (sube o mejora, texto `#1F6B4F`).
- **Tipografia:** Space Grotesk para titulos y cifras, Inter para texto.
- **Escala de color del mapa:** secuencial para temperatura absoluta; divergente para diferencias y anomalias. Siempre con leyenda y unidades. No depender solo del color: valor visible al pasar el cursor.
- **Accesibilidad:** contraste de texto 4,5 a 1, controles nativos, etiquetas en botones sin texto, descripcion del grafico para lectores de pantalla.

---

## 9. Orden de implementacion sugerido

1. Proyecto Next.js y paginas base con los datos de ejemplo (`public/data`).
2. Portar `lib/stats.ts` desde las pantallas del diseno (regresion, Mann-Kendall, Pearson).
3. Mapa base con seleccion de region (sin capa de calor todavia).
4. Capa de temperatura con datos de la API y leyenda.
5. Sector A y B, mapas sincronizados y comparacion por anios.
6. Exportacion: CSV primero, luego PDF, luego Word.
7. Pulido: estados de carga, errores de API, version movil, README y video de demostracion.

## 10. Decisiones pendientes del equipo

- Que variable de temperatura usar (superficial del suelo, del aire o ambas) y de que fuente.
- Resolucion espacial y temporal que entrega la API (define si la capa es de celdas o de puntos).
- Como se define un "sector": rectangulo libre, poligonos predefinidos (departamentos o provincias) o ambos.
- Idea final del desafio (Wildfire, Green Loss, Drought Memory o Teleconexiones): cambia que variables acompanan a la temperatura.

---

## Fuentes consultadas

- GIBS Web Examples (NASA): https://github.com/nasa-gibs/gibs-web-examples
- Documentacion de mapas y GIBS: https://nasa-gibs.github.io/gibs-api-docs/map-library-usage
- deck.gl con MapLibre: https://deck.gl/docs/developer-guide/base-maps/using-with-maplibre
- deck.gl HeatmapLayer: https://deck.gl/docs/api-reference/aggregation-layers/heatmap-layer
- react-map-gl: https://github.com/visgl/react-map-gl
- Leaflet.heat: https://github.com/Leaflet/Leaflet.heat
- docx (Word en JS): https://www.npmjs.com/package/docx
- jsPDF con React y html2canvas: https://nutrient.io/blog/how-to-convert-html-to-pdf-using-react
- Aviso de seguridad sobre react-leaflet-heatmap-layer: https://socket.dev/npm/package/react-leaflet-heatmap-layer/overview/2.0.1
