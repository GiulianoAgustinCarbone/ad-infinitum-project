# Auditoría del repositorio

Fecha: 14 de noviembre de 2026. Rama auditada: `feature/mapa-calor` (commit `c88d3a7`).
Todo lo que sigue sale de comandos ejecutados sobre el repo; al final de cada sección se indica la evidencia.
Durante la auditoría no se modificó código de la aplicación.

## Resumen

| Área | Estado | Lo más importante |
|---|---|---|
| Build, tests, lint, tipos | Verde | `npm run build` OK (15 s), 42/42 tests, ESLint sin avisos, `tsc` sin errores |
| Seguridad de dependencias | Aceptable | 0 vulnerabilidades en producción; 7 moderadas solo en herramientas de desarrollo (ESLint) |
| Código muerto | Alto | `src/lib/mapa`, la grilla de temperatura de `src/lib/data`, 5 paquetes `@turf/*` y 16 de los 42 tests cubren código que ya no se usa |
| Capa de datos | Desalineada | La interfaz `FuenteDatos` es de grilla de temperatura; las páginas reales la esquivan e importan `fuenteFocos` directo. `fuenteApi` pide `/api/grilla`, que el backend no tiene |
| Diseño | Casi centralizado | Tokens en `globals.css`, pero 32 colores repetidos a mano en componentes (canvas, MapLibre, SVG) |
| Estado del dato | Incompleto | Existe el campo `ilustrativo` pero ninguna pantalla lo muestra |
| Git | **Riesgo** | La rama y `origin/main` divergieron: `main` conserva el frontend Vite original y reorganizó el backend; esta rama reemplazó el frontend por Next.js |
| Backend | Prototipo | Un solo endpoint útil (`/api/serie-punto`, NASA POWER por punto). Sin autenticación ni claves. `requirements.txt` incompleto |
| Datos | Bien | 1,6 MB procesados en git, 18 MB crudos fuera de git. Licencia sin declarar (TODO) |
| Diques | Sin fuente | No hay en el repo ninguna serie de nivel, cota, volumen ni superficie de agua |

## 1. Árbol del repositorio

Raíz: `ad-infinitum-project/` (87 archivos versionados).

```
ad-infinitum-project/
├── .claude/skills/frontend-design/   Skill de diseño usada por el asistente (no es parte del sitio)
└── Ad-Infinitum-NASA/
    ├── docs/                         Especificación del sitio
    │   ├── detective-tendencias-secciones-v2.md   Secciones y comportamiento (vigente, salvo paleta)
    │   ├── prompt-stitch.md                        Brief visual anterior (paleta superada)
    │   └── prototipo-detective.html                Prototipo con estadística y exportación PDF/Word
    ├── backend/                      Python (FastAPI) + script Node de descarga
    │   ├── main.py                   API: /ping, /health, /api/serie-punto
    │   ├── API.py                    Cliente de NASA POWER (mensual por punto)
    │   ├── conexion_databrowse.py    NASA POWER MERRA-2 por región (Zarr en S3, anónimo)
    │   ├── requirements.txt
    │   ├── __pycache__/              Compilados de Python versionados por error
    │   ├── scripts/descargar_datos.mjs   Descarga única de focos, departamentos y embalses (ArcGIS)
    │   └── data/                     Datos procesados (en git) y raw/ (fuera de git)
    └── frontend/                     Next.js 16 (App Router) + TypeScript
        ├── scripts/                  copiar-worker-maplibre, preparar-datos, preparar-limites
        ├── src/app/                  Rutas: / y /comparar (redirige)
        ├── src/components/           sitio/, explorador/, graficos/, hero/
        └── src/lib/                  data/, focos/, exportar/, estadistica, formato, generado/, geo/, mapa/
```

No hay `README.md` ni `.gitignore` en la raíz; solo `frontend/.gitignore` y `backend/data/.gitignore`.

Evidencia: `git ls-files`, `ls -la`.

## 2. Frontend

### 2.1 Rutas

| Ruta | Archivo | Qué hace |
|---|---|---|
| `/` | `src/app/page.tsx` | Página única: Navegación, Hero, Cifras, Explorador, Estacionalidad, Método, Descargas, Pie |
| `/comparar` | `src/app/comparar/page.tsx` | Solo redirige a `/#estacionalidad` (resto de la etapa anterior) |

Las rutas decididas (`/focos`, `/focos/comparar`, `/sequia`, `/sequia/diques`, `/metodo`, `/datos`) no existen todavía.

### 2.2 Componentes (líneas de código)

| Carpeta | Componente | Líneas TSX + CSS | Cliente | Observación |
|---|---|---|---|---|
| explorador | `Explorador` | 348 + 288 | sí | Estado, filtros, reproducción, carga de datos, lecturas y leyenda en un solo archivo |
| explorador | `MapaFocos` | 349 | sí | Capas MapLibre con colores escritos a mano |
| hero | `HeroFocos` | 331 + 80 | sí | Animación en canvas con colores escritos a mano |
| sitio | `Estacionalidad` | 119 + 125 | no | Íconos SVG con colores a mano |
| sitio | `Navegacion`, `Hero`, `Cifras`, `Metodo`, `Descargas`, `Pie` | 30 a 95 cada uno | parcial | Tamaños razonables |
| graficos | `BarrasMes`, `SerieAnual`, `MatrizAnioMes`, `RankingDeptos`, `Globo`, `useAncho` | 17 a 135 | sí | Reutilizables, pero viven fuera de un espacio "compartido" |

Total del frontend: 5.372 líneas en `src/` y `scripts/`.

**Componentes demasiado grandes o con varias responsabilidades:**
- `Explorador.tsx` (348 líneas): mezcla carga de datos, filtrado y conteo (`contar()`), reproducción, controles y leyenda.
- `MapaFocos.tsx` (349 líneas): define estilo, capas, filtros y eventos del mapa.
- `HeroFocos.tsx` (331 líneas): animación, dibujo y tira de meses.
- `page.tsx` arma la sección "Explorar" en línea en vez de delegarla a un componente.
- `lib/focos/agregados.ts` (221 líneas): calcula estadísticas y redacta los hallazgos en el mismo archivo.

Evidencia: `wc -l` sobre `src` y `scripts`.

### 2.3 Utilidades

| Archivo | Uso real |
|---|---|
| `lib/estadistica.ts` | Regresión, Mann-Kendall con empates, Sen. Usada por `preparar-datos.mts` |
| `lib/focos/agregados.ts` | Genera `resumen.json` (cifras, estacionalidad, tendencia, hallazgos). **Sin tests** |
| `lib/focos/escala.ts` | Escala de fuego y cortes. Fuente de colores para TS. Sin tests |
| `lib/focos/proyeccion.ts` | Proyección del canvas del hero |
| `lib/formato.ts` | Formato es-AR. `fmt`, `fmtSigno`, `fmtLon`, `fmtLat` solo los usan tests de `lib/mapa` |
| `lib/exportar/csv.ts` | CSV con BOM y descarga |
| `lib/generado/resumen.json` | Generado en cada build; versionado |
| `lib/geo/provincias.json` | Límites de provincias, usado por `MapaFocos` |
| `lib/geo/argentina.json` | Solo lo usa `lib/mapa` (muerto) |

### 2.4 Capa de datos (`src/lib/data`)

| Archivo | Contenido | ¿Lo usa alguna página? |
|---|---|---|
| `tipos.ts` | `FuenteDatos { ilustrativo, getGrilla(), getSerieSector() }`, `Grilla` con propiedades `t2005…t2024` "en grados C" | Solo vía `lib/mapa` (muerto) |
| `mock.ts` | Grilla sintética de temperatura (`ilustrativo: true`) | No |
| `api.ts` | `GET ${NEXT_PUBLIC_API_URL}/api/grilla` | No, y el backend **no tiene** ese endpoint |
| `serie.ts` | Serie anual promedio dentro de un rectángulo | Solo por mock, api y focos |
| `focos.ts` | `fuenteFocos`: lee `/datos/*.json`; además mete los focos en una grilla de 0,1° con claves `t2005…` para cumplir la interfaz | **Sí**, pero importado directo, no a través de `index.ts` |
| `index.ts` | Elige fuente por `NEXT_PUBLIC_FUENTE` | No (solo `lib/mapa`) |

Problemas:
1. La interfaz común está pensada para una grilla de temperatura. Los focos no encajan: la grilla de focos guarda conteos en claves que el tipo documenta como grados.
2. Los componentes reales (`Explorador`, `HeroFocos`, `Descargas`) importan `@/lib/data/focos` directamente, así que cambiar de fuente por variable de entorno no tiene efecto sobre el sitio.
3. `fuenteApi` y el backend no comparten contrato: el frontend espera `/api/grilla` y el backend expone `/api/serie-punto`.
4. `.env.local` no define `NEXT_PUBLIC_FUENTE` (solo `NEXT_PUBLIC_USE_MOCK` y `NEXT_PUBLIC_API_URL`; valores no impresos).

Evidencia: `grep -rn "@/lib/data" src`.

### 2.5 Estilos y tokens

- Tokens en `src/app/globals.css` (`:root`): fondos, líneas, tintas, escala de fuego, sin dato, agua, foco, anchos y radios. Las fuentes las define `layout.tsx` con `next/font` (`--fuente-titulos`, `--fuente-texto`).
- La misma escala existe **dos veces**: como variables CSS y como constantes en `lib/focos/escala.ts`.
- **32 colores literales** fuera de `globals.css` y `escala.ts` (sin contar `lib/mapa`): `MapaFocos.tsx`, `HeroFocos.tsx`, `Estacionalidad.tsx`, `SerieAnual.tsx`, `Navegacion.tsx`, `Navegacion.module.css` y `Graficos.module.css`, entre otros. Son copias de tokens (por ejemplo `#13202d`, `#2d4054`, `#ece8df`) que se desincronizan si cambia la paleta.
- `font-family: var(--fuente-titulos), sans-serif` se repite en 11 reglas de 8 CSS modules; convendría una clase o mezcla única.
- No hay tokens de espaciado ni de tipografía (tamaños), ni paleta por módulo.

Evidencia: `grep -rnoE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src`.

### 2.6 Tests, lint, tipos y build (resultados reales)

| Comando | Resultado |
|---|---|
| `npm run build` | OK en 14,9 s. Rutas estáticas: `/`, `/_not-found`, `/comparar`. Un aviso: `Failed to find font override values for font 'Atkinson Hyperlegible Next'` (sin efecto) |
| `npm test` (Vitest 5.1.0) | 6 archivos, **42 tests aprobados**, 1,7 s |
| `npx eslint .` | 0 errores, 0 avisos |
| `npx tsc --noEmit` | 0 errores |

Reparto de los tests:

| Archivo | Tests | Cubre código en uso |
|---|---|---|
| `lib/estadistica.test.ts` | 10 | Sí |
| `lib/data/focos.test.ts` | 2 | Sí |
| `lib/exportar/csv.test.ts` | 1 | Sí |
| `lib/data/data.test.ts` | 13 | No: mock, api y grilla de temperatura |
| `lib/mapa/mapa.test.ts` | 12 | No |
| `lib/mapa/calculador.test.ts` | 4 | No |

Sin tests: `agregados.ts` (las cifras y textos que muestra el sitio), `escala.ts`, `formato.ts` (funciones nuevas), componentes.

Peso del build: `.next/static` ocupa 7,3 MB. El fragmento mayor (1,1 MB) es MapLibre y se carga con `dynamic(..., { ssr: false })` solo al llegar al explorador.

### 2.7 Código muerto y duplicaciones

| Elemento | Por qué está muerto | Peso |
|---|---|---|
| `src/lib/mapa/` (bandas, worker, calculador, rejilla + 2 tests) | Era el mapa de temperatura de la etapa anterior; ningún componente lo importa | 6 archivos, 637 líneas (229 de tests) |
| `src/lib/data/mock.ts`, `api.ts`, `serie.ts`, `index.ts` y `data.test.ts` | Ninguna página usa la interfaz `FuenteDatos` | 5 archivos, 370 líneas |
| `grillaDeFocos` en `focos.ts` | Solo existe para cumplir `getGrilla()` | |
| `src/lib/geo/argentina.json` | Solo lo usa el worker de bandas | 23 KB |
| `scripts/preparar-limites.mjs` | Regenera límites; ya generados | 70 líneas |
| `fmt`, `fmtSigno`, `fmtLon`, `fmtLat` en `formato.ts` | Solo los usan tests muertos | |
| `src/app/comparar/page.tsx` | Redirección provisoria | |
| Dependencias `@turf/helpers`, `@turf/intersect`, `@turf/isobands` (producción) y `@turf/simplify`, `@turf/union` (desarrollo) | Solo las importan `lib/mapa` y `preparar-limites` | |

Duplicaciones: escala de fuego en CSS y TS; colores de fondo y líneas repetidos en canvas y MapLibre; `font-family` de títulos en 11 reglas.

## 3. Backend

### 3.1 En esta rama (`feature/mapa-calor`)

| Pieza | Qué hace | Entrada | Salida |
|---|---|---|---|
| `API.py` → `obtener_datos_nasa_mensuales` | NASA POWER, API mensual por punto (`/api/temporal/monthly/point`) | inicio y fin (años), lat, lon, comunidad, parámetros | `DataFrame` mensual; quita el mes 13 (promedio anual) y reemplaza `-999` por `NaN` |
| `conexion_databrowse.py` | NASA POWER MERRA-2 mensual desde Zarr público en S3 (`anon: True`) | variable, rectángulo lat/lon, fechas `YYYY-MM` | `.nc` local y serie promedio ponderada por área |
| `main.py` (FastAPI) | `/ping`, `/health`, `GET /api/serie-punto?lat&lon&start&end&params&community` | Query string | `{ ubicacion, parametros, total_registros, serie: [{Fecha: "YYYY-MM", PARAM: valor}] }` |
| `scripts/descargar_datos.mjs` | Descarga única desde ArcGIS Online (focos, departamentos CONAE, embalses mayo 2024) | Ninguna | Archivos en `data/` |

**Autenticación:** ninguna. NASA POWER y ArcGIS son públicos y el Zarr se abre en modo anónimo. Se revisó el repo con `git grep -iE "api[_-]?key|token|secret|password|bearer|authorization"`: no hay claves ni credenciales versionadas (solo aparecen comentarios del script de descarga). `.env.local` del frontend contiene dos variables públicas (`NEXT_PUBLIC_*`); sus valores no se imprimieron.

**Brechas:**
- `requirements.txt` no incluye `fastapi`, `uvicorn` ni `requests`, que `main.py` y `API.py` importan.
- CORS con `allow_origins=["*"]` y `allow_credentials=True` a la vez: es una combinación que los navegadores no aceptan para pedidos con credenciales; conviene fijar el origen del frontend.
- `/api/serie-punto` devuelve un solo punto; no hay endpoint por departamento ni el `/api/grilla` que espera el frontend.
- El submuestreo por defecto de `conexion_databrowse.py` (`PASO_DEFAULT = 4`, unas 2° × 2,5°) es más grueso que un departamento de San Luis.
- `__pycache__/*.pyc` está versionado.
- No hay tests de Python.

### 3.2 En `origin/main` (divergente, no está en esta rama)

`origin/main` tiene dos commits posteriores al punto de partida común (`7158f71`): `c463cba` "Tendencias + Metadatos" y `fe2650e` "Estructuración de Back + Variables Derivadas" (14/11, 15:35 y 17:54). Cambios:

- Mueve `API.py` y `conexion_databrowse.py` a `backend/conexion_con_apis/` y agrega `time-standard=utc` y metadatos de la respuesta.
- Agrega `backend/calculos intermedios/tendencias.py`: tendencia anual y mensual por mínimos cuadrados (sin prueba de significancia).
- Agrega `backend/calculos intermedios/valores_derivados.py`: **ETP por Hargreaves** (con `TOA_SW_DWN`, `T2M`, `T2M_RANGE`), **balance P − ETP**, índice de aridez P/ETP y De Martonne.
- Agrega `backend/pruebas (luego borrar antes de entregar)/`.
- Conserva en `frontend/` la plantilla **Vite + React** original (`App.jsx`, `vite.config.js`).

Observaciones sobre ese código (para cuando se integre):
- `conexion_con_apis/API.py` ejecuta una consulta a NASA POWER y un `print` al importarse (el "ejemplo de uso" está a nivel de módulo), así que arrancar `main.py` dispara una llamada externa.
- `calcular_indice_de_precipitación_estandarizado` calcula P/ETP, igual que el índice de aridez; no es el SPI estándar (que ajusta una distribución gamma). El nombre lleva tilde.
- Carpetas con espacios y paréntesis (`calculos intermedios`, `pruebas (...)`) no se pueden importar como paquetes de Python.
- `tendencias.py` no está conectado a ningún endpoint.
- Las unidades deben coincidir: `PRECTOTCORR` mensual de POWER viene en mm/día, y Hargreaves con `Ra × 0,408` también da mm/día; para mostrar mm/mes hay que multiplicar ambos por los días del mes.

Evidencia: `git log HEAD..origin/main`, `git show --stat`, `git show origin/main:<archivo>`.

## 4. Datos

| Archivo | Tamaño | En git | Origen |
|---|---|---|---|
| `backend/data/focos.compact.json` | 1,54 MB | Sí | ArcGIS `Focos_de_calor_(2002_2024)` |
| `backend/data/departamentos.geojson` | 39 KB | Sí | `Departamentos_CONAE`, simplificado (tolerancia 0,002°) |
| `backend/data/departamentos.mensual.json` | 8,5 KB | Sí | Tabla mensual por departamento (2002-07 a 2024-04) |
| `backend/data/embalses.geojson` | 29 KB | Sí | `embalses_mayo_2024`, simplificado; solo `nombre` |
| `backend/data/raw/focos.geojson` | 16,1 MB | No (`raw/`) | Original |
| `backend/data/raw/departamentos.geojson` | 1,2 MB | No | Original |
| `backend/data/raw/embalses.geojson` | 0,7 MB | No | Original |
| `frontend/public/datos/*` | copia | No | Copiado por `preparar-datos.mts` en cada build |
| `frontend/src/lib/generado/resumen.json` | | Sí | Precalculado en cada build |
| `*.nc` (NASA POWER) | | No (`*.nc`) | `conexion_databrowse.py`; no hay ninguno en disco |

Particularidades documentadas en `frontend/README.md`: tabla mensual = focos de Aqua; 9 meses sin dato; potencia MODIS desde 2017 sin separador decimal (6.802 registros en `null`); campo `Instrumento` mal etiquetado.

**Licencia y atribución:** las tres capas de ArcGIS no declaran licencia. El sitio muestra "Datos: CONAE / Gobierno de San Luis" en el pie y en el mapa, y el README tiene el TODO de pedir autorización antes de publicar. **Sigue pendiente.** NASA POWER no exige licencia pero pide citar la fuente; hoy no se cita en el sitio porque todavía no se usa.

## 5. Dependencias

Todas las versiones del frontend están fijadas (sin `^` ni `~`).

| Paquete | Versión | Tipo | Uso |
|---|---|---|---|
| next | 16.4.6 | prod | Sí |
| react, react-dom | 19.3.0 | prod | Sí (hay 19.3.1) |
| maplibre-gl | 6.18.0 | prod | Sí |
| @turf/helpers, @turf/intersect, @turf/isobands | 7.4.0 | prod | **No** (solo `lib/mapa`) |
| @turf/simplify, @turf/union | 7.4.0 | dev | **No** (solo `preparar-limites`) |
| @types/geojson | 7946.0.16 | dev | Sí |
| @types/node | 24.19.2 | dev | Sí |
| @types/react, @types/react-dom | 19.3.0 | dev | Sí |
| eslint | 9.39.5 | dev | Sí (hay 10.15.0) |
| eslint-config-next | 16.4.6 | dev | Sí |
| typescript | 5.9.3 | dev | Sí (hay 7.0.2) |
| vitest | 5.1.0 | dev | Sí |

`npm audit`: **7 vulnerabilidades moderadas**, todas en la cadena `typescript-eslint → minimatch` (GHSA-g3hv-75wg-m249, denegación de servicio con patrones glob). Solo afecta a ESLint en desarrollo. `npm audit --omit=dev`: **0 vulnerabilidades**.

Python: `requirements.txt` usa rangos (`>=`), no versiones exactas, y le faltan `fastapi`, `uvicorn` y `requests`.

## 6. Git

| Dato | Valor |
|---|---|
| Rama actual | `feature/mapa-calor` |
| Commits sin subir | 4 (`81b1854`, `8de0361`, `606574d`, `c88d3a7`) |
| Rama remota | `origin/feature/mapa-calor` está en `7158f71` |
| `main` local | `c463cba`, 1 commit detrás de `origin/main` |
| Divergencia con `origin/main` | Base común `7158f71`. `main` tiene 2 commits de backend; esta rama, 4 de frontend. Habrá conflictos en `frontend/` (Vite vs. Next.js) y en `backend/` (archivos movidos) |
| Archivos sin seguimiento | Ninguno |
| Modificado sin commit | `frontend/package-lock.json`, solo finales de línea (CRLF); `git diff --ignore-cr-at-eol` no muestra cambios |
| Ignorados presentes | `backend/data/raw/`, `frontend/.env.local`, `.next/`, `node_modules/`, `public/`, `next-env.d.ts`, `tsconfig.tsbuildinfo` |
| Versionado por error | `backend/__pycache__/*.pyc` |
| Último fetch | 14/11, 19:15 |

Faltan un `.gitignore` en la raíz (para `__pycache__/`, `.venv/`, `.DS_Store`) y un `.gitattributes` que fije los finales de línea.

## 7. Diques: fuentes de datos disponibles

**No hay en el repo ninguna fuente de nivel, cota, volumen ni superficie de agua de los diques a lo largo del tiempo.**

Lo único relacionado es la capa `embalses_mayo_2024`: 22 polígonos de los embalses con campos `FID`, `OBJECTID`, `diques_pci` (nombre), `Shape_STAr`, `Shape_STLe`, `Shape__Area` y `Shape__Length`. Es una sola fecha (mayo de 2024), así que permite dibujar los contornos y conocer el área de ese momento, pero **no** permite mostrar máximo y mínimo ni ninguna evolución.

Por eso la propuesta (ver `arquitectura.md`) es:
- `/sequia/diques`: los contornos reales de mayo de 2024 y el bloque "Máximo y mínimo: Próximamente", sin cifras inventadas.
- Como indicador provisional, un **balance hídrico aproximado (lluvia menos evaporación)**, rotulado así, calculado con NASA POWER. Es un indicador climático de la zona, no una medición del agua embalsada.

## 8. NASA POWER para variables por departamento (opcional)

Se hizo una consulta de prueba a la API mensual por punto que ya usa el backend (San Luis capital, 2023, comunidad `ag`). Respondió sin errores ni mensajes con todos estos parámetros:

| Necesidad | Parámetro POWER | Unidad | Ejemplo ene/jul 2023 |
|---|---|---|---|
| Lluvia | `PRECTOTCORR` | mm/día | 2,49 / 0,27 |
| Evaporación real (suelo) | `EVLAND` | mm/día | 2,42 / 0,51 |
| Humedad del suelo (zona de raíces) | `GWETROOT` | 0 a 1 | 0,44 / 0,43 |
| Humedad del suelo (superficie) | `GWETTOP` | 0 a 1 | 0,43 / 0,42 |
| Temperatura máxima | `T2M_MAX` | °C | 37,65 / 26,78 |
| Humedad relativa | `RH2M` | % | 47,22 / 66,24 |
| Viento a 2 m | `WS2M` | m/s | 2,98 / 2,94 |

Conclusiones:
- **La función `obtener_datos_nasa_mensuales` ya sirve** para las cinco variables pedidas; solo hay que pasarle los parámetros.
- **No da valores por departamento**: devuelve la celda del modelo (MERRA-2, unas 0,5° × 0,625°) que contiene el punto. Para un valor por departamento hay dos caminos: consultar el centroide de cada uno (9 pedidos) o promediar las celdas que caen dentro de cada polígono con `conexion_databrowse.py`, pero con `paso=1` (el valor por defecto, 4, es demasiado grueso). En ambos casos varios departamentos compartirán celda; hay que decirlo en el sitio.
- Balance aproximado con lo disponible: `PRECTOTCORR − EVLAND` (evaporación real del modelo) o `PRECTOTCORR − ETP Hargreaves` (lo que ya calcula `valores_derivados.py` en `origin/main`). Cualquiera de los dos debe rotularse como aproximado y con su fuente.
- Falta confirmar en la documentación de POWER si `T2M_MAX` mensual es el máximo absoluto del mes o el promedio de las máximas diarias, antes de redactar textos.

## Comandos ejecutados

```bash
git status --short; git branch -vv; git log --oneline; git rev-list --left-right --count origin/feature/mapa-calor...HEAD
git ls-files; git status --ignored --short; git log HEAD..origin/main; git show --stat fe2650e c463cba
git grep -nIiE "api[_-]?key|token|secret|password|bearer|authorization"
npm run build; npm test; npx eslint .; npx tsc --noEmit; npm audit; npm audit --omit=dev; npm outdated
wc -l (src, scripts); grep de imports, colores literales y font-family
du -sh backend/data/raw; ls -la backend/data
curl "https://power.larc.nasa.gov/api/temporal/monthly/point?start=2023&end=2023&latitude=-33.2948&longitude=-66.3358&community=ag&parameters=PRECTOTCORR,T2M_MAX,RH2M,WS2M,GWETROOT,GWETTOP,EVLAND,EVPTRNS&format=JSON"
```
