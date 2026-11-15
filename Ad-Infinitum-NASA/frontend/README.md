# Detective de Tendencias - frontend

Sitio de una página sobre los focos de calor en la provincia de San Luis (NASA Space Apps Challenge 2026).
Next.js (App Router) con TypeScript. Alcance y secciones en `../docs/`.

> **TODO (licencia de datos):** los datos de focos de calor, departamentos y embalses **no declaran licencia**.
> Hay que pedir autorización a CONAE y al Gobierno de San Luis antes de publicar el sitio. Mientras tanto, el pie de
> página muestra la atribución "Datos: CONAE / Gobierno de San Luis" y la fecha de descarga.

## Uso

```bash
# Una sola vez: descarga los datos reales (Node 18+, sin dependencias)
node ../backend/scripts/descargar_datos.mjs

npm install
npm run dev     # http://localhost:3000
npm test        # pruebas unitarias (Vitest)
npm run build
```

`npm run dev` y `npm run build` ejecutan antes:

- `scripts/copiar-worker-maplibre.mjs`: copia el worker de MapLibre a `public/` (no se versiona).
- `scripts/preparar-datos.mts`: copia `backend/data/*` a `public/datos/` (no se versiona) y precalcula
  `src/lib/generado/resumen.json` (cifras, estacionalidad, tendencia y hallazgos). Ningún número del sitio está
  escrito a mano: todos salen de ese archivo o de los datos.

## Datos

Capas públicas de ArcGIS Online (CONAE / Gobierno de San Luis), descargadas una vez por
`backend/scripts/descargar_datos.mjs`, que valida el total (38558 focos) e imprime un resumen:

| Archivo en `backend/data/` | Contenido |
|---|---|
| `focos_confirmados.compact.json` (en `backend/data/incendios/`) | Focos de CONAE (2002 a 2024-10) más detecciones de NASA FIRMS (meses faltantes y desde 2024-10-02), con origen y área quemada. Se copia a `public/datos/focos.json`. Generar con `python -m incendios.cruce`. |
| `departamentos.geojson` | 9 departamentos simplificados |
| `departamentos.mensual.json` | Focos por mes y departamento, 2002-07 a 2024-04. `null` = mes sin dato (nunca cero) |
| `embalses.geojson` | 22 embalses (solo forma, sin nivel de agua) |
| `raw/` | GeoJSON originales (no se versionan, ~18 MB) |

Particularidades encontradas en la fuente, y cómo se tratan:

- La tabla por departamento coincide con los focos del satélite **Aqua**. Es la serie que se usa para comparar
  años, porque mantiene el mismo sensor todo el período. Sumar Terra, Suomi NPP (desde 2012) y NOAA-20 (desde 2019)
  inflaría los años recientes.
- 9 meses no tienen columna en la tabla. Se tratan como dato ausente. Coinciden con meses sin focos de Aqua y de
  baja temporada, así que podrían ser ceros omitidos, pero no se asume.
- En los registros MODIS desde 2017, `FP_Power` (y otras columnas) perdieron el separador decimal. Esas potencias
  (6802) se guardan como `null` y se muestran como "sin dato confiable".
- El campo `Instrumento` etiqueta como VIIRS a Terra y Aqua; el sensor se deduce del satélite.

## Fuente de datos (interfaz)

`src/lib/data/` expone una interfaz única (`getGrilla()`, `getSerieSector(sector)`) con tres implementaciones.
`NEXT_PUBLIC_FUENTE` decide cuál usa `datos`:

| Valor | Implementación | Origen |
|---|---|---|
| `focos` | `focos.ts` | Archivos estáticos de `public/datos/`. La grilla cuenta focos por celda de 0,1° y año. Además expone `getFocos()`, `getDepartamentos()`, `getSerieMensual()` y `getEmbalses()`. |
| `api` | `api.ts` | `GET ${NEXT_PUBLIC_API_URL}/api/grilla` |
| sin definir | `mock.ts` | Grilla sintética de temperatura (ilustrativa) |

Las secciones del sitio usan siempre `fuenteFocos` (datos reales).

## Estadística

`src/lib/estadistica.ts`, portada del prototipo (`docs/prototipo-detective.html`) y con pruebas:
regresión lineal, Mann-Kendall con corrección por empates (el prototipo no la tenía) y pendiente de Sen.

## Diseño

Carta de relevamiento satelital: fondo pizarra nocturno; el único color saturado es la escala de fuego de los datos
(violeta a amarillo pálido, apta para daltonismo, con contraste de 3:1 o más sobre la superficie para que los
valores bajos se vean; los puntos llevan además un borde claro fino). Tipografías: Bricolage Grotesque (títulos y
cifras) y Atkinson Hyperlegible Next (texto). La única animación automática es la del inicio, con botón de pausa, y
se reemplaza por una imagen fija con `prefers-reduced-motion`.

## Límites de provincias

`src/lib/geo/*.json` salen de Natural Earth v5.1.2 (dominio público); ver `scripts/preparar-limites.mjs`.
