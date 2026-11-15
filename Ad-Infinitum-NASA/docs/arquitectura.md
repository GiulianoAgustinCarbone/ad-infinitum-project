# Arquitectura propuesta

Objetivo: que cualquier integrante del equipo entienda el proyecto de un vistazo y que sumar un módulo, una página o
una fuente de datos sea agregar archivos en un lugar previsible, sin tocar el resto.

Se basa en los hallazgos de `auditoria-repo.md`. **Es una propuesta: no hay nada refactorizado todavía.**

## 1. Principios

1. **Por funcionalidad, no por tipo de archivo.** Todo lo de focos vive junto (componentes, cálculos, datos, paleta);
   lo mismo para sequía. Lo que usan dos o más módulos va a `compartido/`.
2. **Las páginas solo componen.** `src/app/**/page.tsx` arma secciones; no calcula ni pide datos por su cuenta.
3. **Un contrato por módulo.** Cada módulo declara sus tipos de datos y una interfaz de fuente. Los componentes
   dependen de la interfaz, nunca de una implementación concreta.
4. **Un solo lugar para el diseño.** Ningún componente escribe un color, una fuente o un tamaño de texto literal.
5. **Todo dato dice qué es.** Real, ilustrativo o próximamente, con la misma insignia en todo el sitio.
6. **Ningún número escrito a mano.** Las cifras y frases salen de los datos, precalculadas en el build y con tests.

## 2. Estructura de carpetas

```
README.md                           Vista general (raíz del repo)
Ad-Infinitum-NASA/
├── docs/                           Especificación, auditoría y arquitectura
├── backend/
│   ├── api/                        FastAPI (main.py y routers)
│   ├── fuentes/                    Clientes de APIs externas (NASA POWER, ArcGIS)
│   ├── calculos/                   Tendencias, balance hídrico, índices (con tests)
│   ├── scripts/                    Descargas únicas: un script por fuente
│   │   ├── descargar_focos.mjs     (hoy descargar_datos.mjs)
│   │   └── descargar_clima.py      NASA POWER por departamento (nuevo)
│   └── data/
│       ├── focos/                  focos.puntos.json, focos.mensual-depto.json
│       ├── sequia/                 clima.mensual-depto.json
│       ├── comun/                  departamentos.geojson, embalses.geojson
│       └── raw/                    Originales (fuera de git)
└── frontend/
    ├── scripts/
    │   ├── preparar-datos.mts      Copia data/ a public/datos/ y genera los resúmenes de cada módulo
    │   └── copiar-worker-maplibre.mjs
    └── src/
        ├── app/                    Solo rutas
        │   ├── layout.tsx          Fuentes, tokens, navegación y pie comunes
        │   ├── page.tsx            /
        │   ├── focos/page.tsx      /focos
        │   ├── focos/comparar/page.tsx
        │   ├── sequia/page.tsx     /sequia
        │   ├── sequia/diques/page.tsx
        │   ├── metodo/page.tsx     /metodo
        │   └── datos/page.tsx      /datos (descargas, fuentes, atribuciones, licencia)
        ├── modulos/
        │   ├── focos/
        │   │   ├── contrato.ts     Tipos e interfaz FuenteFocos
        │   │   ├── fuentes/        estatica.ts, api.ts (cuando exista)
        │   │   ├── index.ts        Elige la fuente (único lugar que conoce las implementaciones)
        │   │   ├── calculos/       agregados.ts, hallazgos.ts (+ tests)
        │   │   ├── paleta.ts       Escala de fuego y cortes
        │   │   └── componentes/    HeroFocos, Explorador, MapaFocos, Estacionalidad, Comparador...
        │   └── sequia/
        │       ├── contrato.ts     Tipos e interfaces FuenteClima y FuenteDiques
        │       ├── fuentes/        estatica.ts, ilustrativa.ts, api.ts
        │       ├── index.ts
        │       ├── calculos/       balance.ts (+ tests)
        │       ├── paleta.ts       Escala divergente seco-húmedo
        │       └── componentes/
        ├── compartido/
        │   ├── diseno/             tokens.ts (fuente de verdad), tipografia.ts (next/font)
        │   ├── componentes/        Navegacion, Pie, Seccion, EstadoDato, Leyenda, Boton
        │   ├── graficos/           BarrasMes, SerieAnual, MatrizAnioMes, Ranking, Globo, useAncho
        │   ├── datos/              procedencia.ts, pedirJson.ts (caché con reintento), departamentos.ts
        │   ├── estadistica/        tendencia.ts (+ tests)
        │   ├── exportar/           csv.ts, png.ts, docx.ts, pdf.ts (+ tests)
        │   └── formato.ts
        └── generado/               resumen-focos.json, resumen-sequia.json (los escribe el build)
```

Reglas de dependencia (se pueden verificar con un test que lea los `import`):
- `app/` importa de `modulos/` y `compartido/`.
- `modulos/X` importa de `compartido/`, nunca de `modulos/Y`.
- `compartido/` no importa de `modulos/` ni de `app/`.
- Solo `modulos/X/index.ts` importa de `modulos/X/fuentes/`.

## 3. Sistema de diseño

### 3.1 Una sola fuente de verdad

`compartido/diseno/tokens.ts` define todos los valores. Desde ahí:
- `layout.tsx` (componente de servidor) escribe un `<style>` con `:root { --... }` generado a partir de los tokens. Los
  CSS modules solo usan `var(--...)`.
- Canvas y MapLibre, que no leen variables CSS con comodidad, importan las constantes del mismo archivo.
- Un test (`tokens.test.ts`) recorre `src/` y falla si encuentra un color hexadecimal, `rgb()` o `font-family` fuera de
  `compartido/diseno/` y de las paletas de módulo.

Así desaparecen las 32 copias de colores y la escala duplicada entre `globals.css` y `escala.ts`.

### 3.2 Base compartida (se conserva la identidad actual)

| Grupo | Tokens | Valores actuales |
|---|---|---|
| Fondos | `fondo`, `fondo-alterno`, `superficie`, `superficie-2` | `#13202d`, `#172634`, `#1b2a3a`, `#22344a` |
| Líneas | `linea`, `linea-fuerte` | `#2d4054`, `#4a6077` |
| Texto | `texto`, `texto-2`, `texto-3` | `#ece8df`, `#b8c0c8`, `#95a1ad` |
| Interacción | `foco` | `#f8b44e` |
| Estado del dato | `estado-real`, `estado-ilustrativo`, `estado-proximamente` | Se definen sin reutilizar las paletas de datos (ver 5) |
| Tipografía | `fuente-titulos`, `fuente-texto`, escala `texto-xs` a `titulo-xl` | Bricolage Grotesque, Atkinson Hyperlegible Next |
| Espacio y forma | `espacio-1` a `espacio-8`, `radio-chico`, `radio`, `ancho` | 6 px, 12 px, 1200 px |

Una clase utilitaria `.titulo-display` reemplaza las 11 repeticiones de `font-family` de títulos.

### 3.3 Paleta de datos por módulo

| Módulo | Tipo de escala | Colores |
|---|---|---|
| Focos | Secuencial (cantidad, potencia) | La escala de fuego actual: `#9b5bb5`, `#d9507f`, `#f07f4f`, `#f8b44e`, `#fcebb0` |
| Sequía: balance hídrico | Divergente (déficit, cero, excedente) | Dos tonos con gris neutro en el centro, por ejemplo terracota y azul verdoso; **se eligen y validan** con el validador de paletas (contraste ≥ 3:1 sobre `superficie`, separación para daltonismo) antes de usarlos |
| Sequía: variables sueltas | Secuencial de un solo tono | A definir con el mismo procedimiento |
| Diques | Agua | `#5e9cc9` (ya existe como `agua`) |
| Común | Sin dato | `#8d99a6` con trama rayada, para no depender solo del color |

Cada paleta vive en `modulos/X/paleta.ts`, exporta sus colores con nombre y su leyenda, y también se valida con un test
de contraste.

## 4. Contratos de datos

### 4.1 Tipos comunes (`compartido/datos/procedencia.ts`)

```ts
export type EstadoDato = "real" | "ilustrativo" | "proximamente";

export type Procedencia = {
  estado: EstadoDato;
  fuente: string;          // "CONAE / Gobierno de San Luis", "NASA POWER (MERRA-2)"
  enlace?: string;
  descargado?: string;     // ISO 8601
  licencia?: string;       // vacio = sin declarar
  notas: string[];         // limites y particularidades, en espanol
};

export type Departamento = { id: string; nombre: string };  // id: slug sin acentos, "gobernador-dupuy"

// Serie mensual: meses "YYYY-MM" consecutivos; null = sin dato (nunca cero)
export type SerieMensualPorDepto = {
  procedencia: Procedencia;
  variable: string;        // "focos", "lluvia", "balance"...
  unidad: string;          // "focos", "mm/mes", "%"...
  meses: string[];
  departamentos: { id: string; valores: (number | null)[] }[];
};
```

### 4.2 Focos (`modulos/focos/contrato.ts`)

```ts
export type PuntosFocos = {
  procedencia: Procedencia;
  fechaMin: string;
  fechaMax: string;
  satelites: string[];
  columnas: { lon: number[]; lat: number[]; anio: number[]; mes: number[]; dia: number[];
              potencia: (number | null)[]; confianza: (number | null)[];
              depto: number[]; sat: number[] };
};

export interface FuenteFocos {
  getPuntos(): Promise<PuntosFocos>;
  getSerieMensual(): Promise<SerieMensualPorDepto>;   // conteos de Aqua por departamento
  getDepartamentos(): Promise<FeatureCollection<Polygon | MultiPolygon, Departamento>>;
}
```

Es el formato que ya se usa (`FocosCompactos`, `SerieMensualDeptos`), con la procedencia agregada. Se elimina la grilla
de temperatura (`getGrilla`, `getSerieSector`), que no describe focos.

### 4.3 Sequía y diques (`modulos/sequia/contrato.ts`)

```ts
export type VariableClima = "lluvia" | "evaporacion" | "balance" | "temperatura_maxima"
                          | "humedad_relativa" | "viento" | "humedad_suelo";

export interface FuenteClima {
  getSerieMensual(variable: VariableClima): Promise<SerieMensualPorDepto>;
}

export type SerieDique = {
  id: string;
  nombre: string;
  variable: "cota_m" | "volumen_hm3" | "superficie_km2";
  meses: string[];
  valores: (number | null)[];
};

export interface FuenteDiques {
  getContornos(): Promise<FeatureCollection<Polygon | MultiPolygon, { id: string; nombre: string }>>;
  getSeries(): Promise<{ procedencia: Procedencia; diques: SerieDique[] }>;
}
```

### 4.4 Fuentes intercambiables

Cada módulo tiene un `index.ts` que elige la implementación por variable de entorno y es el único que la conoce:

| Variable | Valores | Por defecto |
|---|---|---|
| `NEXT_PUBLIC_FUENTE_FOCOS` | `estatica`, `api` | `estatica` |
| `NEXT_PUBLIC_FUENTE_CLIMA` | `estatica`, `ilustrativa`, `api` | `estatica` si existe el archivo, si no `ilustrativa` |
| `NEXT_PUBLIC_FUENTE_DIQUES` | `proximamente`, `api` | `proximamente` |

- `estatica`: lee `public/datos/<modulo>/*.json`.
- `api`: pide al backend un endpoint con **la misma forma** que el archivo estático (por ejemplo
  `GET /api/clima/mensual?variable=lluvia` devuelve un `SerieMensualPorDepto`). Conectar la API es agregar este archivo
  y cambiar la variable; ningún componente cambia.
- `ilustrativa`: datos generados con semilla fija y `procedencia.estado = "ilustrativo"`.
- `proximamente`: devuelve contornos reales y series vacías con `procedencia.estado = "proximamente"`.

Cada fuente se prueba con los mismos tests de contrato (forma, meses consecutivos, `null` en lugar de cero, procedencia
presente), escritos una vez y aplicados a todas.

## 5. Estado de cada dato en pantalla

Un único componente `compartido/componentes/EstadoDato.tsx` recibe la `Procedencia` y muestra:

| Estado | Insignia | Además |
|---|---|---|
| `real` | "Datos reales" con ícono de satélite o estación | Fuente y fecha de descarga en una línea |
| `ilustrativo` | "Datos ilustrativos" con ícono de advertencia y borde punteado | Texto fijo: "No son mediciones. Sirven para mostrar cómo se verá la sección." Los gráficos se dibujan con trama |
| `proximamente` | "Próximamente" con ícono de reloj | Qué fuente falta y qué se mostrará; ningún número |

Reglas:
- Toda sección con datos muestra la insignia junto al título, nunca solo en el pie.
- La insignia lleva texto e ícono, no solo color.
- Las descargas incluyen el estado en el nombre del archivo y en la primera línea (`# Datos ilustrativos`).
- Un test de componente verifica que una fuente ilustrativa nunca se muestra sin la insignia.

## 6. Convenciones

| Qué | Regla | Ejemplo |
|---|---|---|
| Idioma | Español en identificadores, archivos y textos. Sin acentos ni ñ en código, nombres de archivo y comentarios; con acentos en el texto visible y en los documentos | `nombreMes`, `anio`, "Año" |
| Componentes React | PascalCase, un componente por archivo, su CSS module al lado | `Explorador.tsx`, `Explorador.module.css` |
| Hooks | `useX` | `useAncho` |
| Módulos TS | minúsculas; varias palabras en kebab-case | `pedir-json.ts` |
| Datos | `<entidad>.<granularidad>.json` | `focos.puntos.json`, `focos.mensual-depto.json`, `clima.mensual-depto.json` |
| Ids de departamento | slug sin acentos | `juan-martin-de-pueyrredon` |
| Tests | Al lado del archivo, `*.test.ts` | `balance.test.ts` |
| Carpetas Python | Sin espacios ni paréntesis, importables | `calculos/`, no `calculos intermedios/` |
| Versiones | Exactas en npm (`--save-exact`) y en `requirements.txt` (`==`) | |

### Scripts de descarga y lo que genera cada uno

| Script | Fuente | Genera | Frecuencia |
|---|---|---|---|
| `backend/scripts/descargar_focos.mjs` | ArcGIS Online (CONAE / Gobierno de San Luis) | `data/focos/*`, `data/comun/departamentos.geojson`, `data/comun/embalses.geojson`, `data/raw/*` | Una vez; se reejecuta solo si cambia la capa |
| `backend/scripts/descargar_clima.py` (nuevo) | NASA POWER, API mensual por punto o Zarr regional con `paso=1` | `data/sequia/clima.mensual-depto.json` con lluvia, evaporación, temperatura máxima, humedad relativa, viento y humedad del suelo por departamento | Una vez por actualización |
| `frontend/scripts/preparar-datos.mts` | `backend/data/` | `public/datos/` (no versionado) y `src/generado/resumen-*.json` | En cada `dev` y `build` |

Cada script imprime un resumen, valida conteos y fechas, y **se detiene sin escribir nada si una fuente responde con
error**.

## 7. Diques y balance hídrico

En el repo no existe ninguna serie de nivel, cota, volumen ni superficie de agua (ver auditoría, sección 7). Solo están
los contornos de 22 embalses de mayo de 2024.

Propuesta para `/sequia/diques`:
1. **Mapa de embalses** con los contornos reales de mayo de 2024 y su nombre. Insignia "Datos reales" con la fecha.
2. **"Máximo y mínimo de cada dique": Próximamente.** Sin números. Se explica qué fuente falta (cotas o volúmenes
   publicados por el organismo provincial del agua, o superficie de agua medida por satélite) y que se pidió.
3. **Balance hídrico aproximado (lluvia menos evaporación)**, rotulado exactamente así, por departamento y mes, con NASA
   POWER: `PRECTOTCORR − EVLAND`, ambos convertidos de mm/día a mm/mes. Texto obligatorio: "Es un indicador climático
   de la zona, calculado con un modelo de reanálisis. No mide el agua de los diques." La alternativa `P − ETP` de
   Hargreaves (ya escrita en `origin/main`, `valores_derivados.py`) se puede mostrar como segunda curva si se aclara
   que la ETP es potencial.

## 8. Plan de migración

Pasos chicos, cada uno con su commit, que se verifica con `npm run build`, `npm test`, `npx eslint .` y `npx tsc --noEmit`
(y con `pytest` en los pasos de backend). Ordenado por prioridad para el hackathon.

| # | Paso | Qué cambia | Verificación extra |
|---|---|---|---|
| 0 | **Integrar `origin/main`** | Merge de los 2 commits de backend; en `frontend/` se conserva Next.js (se descarta la plantilla Vite, a confirmar con el equipo) | El backend arranca; el sitio igual que hoy |
| 1 | Limpieza de código muerto | Borrar `lib/mapa`, la grilla de `lib/data`, `geo/argentina.json`, `preparar-limites.mjs`, `fmt*`, `/comparar`, `@turf/*` y `__pycache__`; agregar `.gitignore` y `.gitattributes` en la raíz | Tests bajan de 42 a 13 sin fallos; el build no cambia de tamaño en las rutas usadas |
| 2 | Tokens centralizados | `compartido/diseno/tokens.ts`, `:root` generado, reemplazo de los 32 colores, `.titulo-display`, test anti-literales | Captura antes y después idénticas |
| 3 | Mover lo compartido | `estadistica`, `exportar`, `formato`, `graficos`, `Navegacion`, `Pie` a `compartido/`; solo cambian rutas de import | Ningún cambio visual |
| 4 | Módulo focos con contrato | `modulos/focos/` con `contrato.ts`, `fuentes/estatica.ts`, `index.ts`; componentes leen la interfaz. Separar `hallazgos.ts` de `agregados.ts` y agregarles tests | Tests de contrato y de hallazgos |
| 5 | Rutas | `/` (hero, cifras, accesos), `/focos` (explorador, estacionalidad), navegación por rutas, `EstadoDato` en cada sección | Navegación por teclado; enlaces activos |
| 6 | `/metodo` y `/datos` | Método y límites; descargas CSV, fuentes, atribuciones y TODO de licencia | Descargas abren en planilla |
| 7 | `/focos/comparar` | Dos departamentos, mapas sincronizados, misma escala, diferencia y series | Escritorio y móvil |
| 8 | Exportación PNG, Word y PDF | Portar del prototipo a `compartido/exportar/` con tests de estructura | Archivos se abren en Word y en un lector de PDF |
| 9 | Módulo sequía con fuente ilustrativa | Contrato, `fuentes/ilustrativa.ts`, paleta validada, `/sequia` con insignia "Datos ilustrativos" | Test: ilustrativo siempre con insignia |
| 10 | Datos reales de clima | `descargar_clima.py`, `clima.mensual-depto.json`, `fuentes/estatica.ts`, balance aproximado con tests | La insignia pasa a "Datos reales" sin tocar componentes |
| 11 | `/sequia/diques` | Contornos reales y "Próximamente" para máximo y mínimo; balance aproximado | Ninguna cifra de nivel en pantalla |
| 12 | Backend ordenado | `requirements.txt` completo y exacto, CORS con origen fijo, sin llamadas al importar, endpoints con la forma de los contratos, `pytest` | `uvicorn` arranca sin pedidos externos |

Los pasos 0 a 5 dejan el sitio actual reorganizado y listo para crecer; del 6 en adelante cada paso suma una página o
una fuente.
