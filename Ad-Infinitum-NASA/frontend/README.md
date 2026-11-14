# Detective de Tendencias - frontend

Next.js (App Router) con TypeScript. Diseño y alcance en `../docs/`.

## Uso

```bash
npm install
cp .env.example .env.local   # una sola vez
npm run dev                  # http://localhost:3000
npm test                     # pruebas unitarias (Vitest)
```

`npm run dev` y `npm run build` copian antes el worker de MapLibre a `public/`
(`scripts/copiar-worker-maplibre.mjs`). Ese archivo no se versiona.

## Mapa

Estilo de los mapas de anomalía del SMN: superficie suave en bandas discretas, recortada por el
contorno de Argentina, con límites de provincias y coordenadas en los bordes.

1. La grilla se ordena como matriz regular (`src/lib/mapa/rejilla.ts`) y se refina por interpolación
   bilineal de 0,5° a 0,125°.
2. `@turf/isobands` arma las bandas y `@turf/intersect` las recorta por el contorno del país
   (`src/lib/mapa/bandas.ts`). La leyenda usa los mismos cortes.
   - Anomalía: cortes −1,5, −1,0, −0,8, −0,6, −0,4, −0,2, 0,2, 0,4, 0,6, 0,8, 1,0, 1,5 °C; escala azul a
     rojo con clase neutra blanca. La anomalía de un año es la diferencia contra el promedio 2005-2024 del mismo punto.
   - Temperatura: cortes cada 2 °C, fijos para todos los años; escala secuencial amarillo a rojo oscuro.
3. El cálculo corre en un Web Worker (`src/lib/mapa/bandas.worker.ts`). `CalculadorBandas` pide primero el
   año visible y después el resto, y guarda cada resultado en caché: volver a un año calculado es inmediato.

Base opcional: estilo Positron de [OpenFreeMap](https://openfreemap.org), sin clave. Si no responde, el mapa
se dibuja sobre fondo blanco.

### Límites

`src/lib/geo/argentina.json` y `src/lib/geo/provincias.json` salen de Natural Earth v5.1.2 (dominio público).
El contorno usa la versión de países con punto de vista argentino, que incluye las Islas Malvinas.
Para regenerarlos, descargar `ne_10m_admin_0_countries_arg.geojson` y `ne_10m_admin_1_states_provinces.geojson`
del tag v5.1.2 de `nvkelso/natural-earth-vector` en una carpeta y correr:

```bash
node scripts/preparar-limites.mjs <carpeta>
```

## Fuente de datos

`src/lib/data/` expone una interfaz única (`datos.getGrilla()`, `datos.getSerieSector(sector)`).
`NEXT_PUBLIC_USE_MOCK` decide la implementación al compilar:

| Valor | Implementación | Origen |
|---|---|---|
| sin definir o `true` | `mock.ts` | Grilla sintética determinista generada en el navegador. La interfaz muestra "Datos ilustrativos". |
| `false` | `api.ts` | `GET ${NEXT_PUBLIC_API_URL}/api/grilla` |

## Contrato con el backend

`GET /api/grilla` devuelve una GeoJSON `FeatureCollection`:

- una celda por feature, con geometría `Polygon`;
- propiedades `t2005` ... `t2024` con la temperatura media anual en °C (números);
- una propiedad `id` opcional por celda.

La serie de un sector (`{ years: number[], values: number[] }`) se calcula en el cliente:
es el promedio anual de las celdas cuyo centro cae dentro del rectángulo
`[oeste, sur, este, norte]`. `api.ts` valida la respuesta y avisa qué propiedad falta.
