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

- Base: estilo Positron de [OpenFreeMap](https://openfreemap.org), sin clave. Si no responde, el mapa se dibuja sobre un fondo liso.
- Capa de temperatura: `fill` sobre las celdas de la grilla, coloreada con una expresión `interpolate` sobre la propiedad del año elegido.
  Escala secuencial (amarillo a rojo oscuro) para temperatura y divergente (azul a rojo) para anomalía.
  El dominio de colores es fijo para todos los años, así los colores se comparan entre años.
- La anomalía de un año es la diferencia contra el promedio 2005-2024 de la misma celda.

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
