# Detective de Tendencias

Sitio web para NASA Space Apps Challenge 2026 que muestra cómo cambiaron el fuego y el agua en la **provincia de San
Luis, Argentina**, con datos satelitales reales, estadística explicada y la incertidumbre a la vista.

> **TODO (licencia de datos):** las capas de focos de calor, departamentos y embalses (CONAE / Gobierno de San Luis)
> **no declaran licencia**. Hay que pedir autorización antes de publicar el sitio. Mientras tanto se muestra la
> atribución "Datos: CONAE / Gobierno de San Luis".

## Estado

| Módulo | Ruta prevista | Estado |
|---|---|---|
| Focos de calor: hero, cifras, explorador, estacionalidad y tendencia | `/` y `/focos` (hoy todo en `/`) | Hecho, con datos reales |
| Comparar departamentos | `/focos/comparar` | Pendiente |
| Sequía (lluvia, evaporación, balance hídrico aproximado) | `/sequia` | Pendiente; datos de NASA POWER disponibles |
| Diques (máximo y mínimo) | `/sequia/diques` | Sin fuente de niveles: se mostrará como "Próximamente" |
| Método | `/metodo` | Hoy es una sección de `/` |
| Datos, descargas y atribuciones | `/datos` | CSV listo; PNG, Word y PDF pendientes |

## Cómo correrlo

Requisitos: Node 24 (el script de datos usa TypeScript nativo de Node) y, para el backend, Python 3.13.

```bash
# Frontend (los datos procesados ya están en el repo)
cd Ad-Infinitum-NASA/frontend
npm install
npm run dev            # http://localhost:3000
npm test               # Vitest
npx eslint .           # lint
npx tsc --noEmit       # tipos
npm run build && npx next start

# Volver a descargar los datos de focos (opcional, una sola vez; sin dependencias)
node Ad-Infinitum-NASA/backend/scripts/descargar_datos.mjs

# Backend (opcional; el sitio actual no lo necesita)
cd Ad-Infinitum-NASA/backend
pip install -r requirements.txt fastapi uvicorn requests   # requirements.txt todavía no los incluye
uvicorn main:app --reload                                  # http://127.0.0.1:8000/ping
```

## Cómo se organiza

```
Ad-Infinitum-NASA/
├── docs/        Especificación (secciones v2, prototipo), auditoría y arquitectura
├── backend/     FastAPI sobre NASA POWER, script de descarga de ArcGIS y datos procesados en data/
└── frontend/    Next.js 16 (App Router) + TypeScript + MapLibre
    ├── scripts/        Preparación de datos y del worker de MapLibre (corren antes de dev y build)
    └── src/
        ├── app/        Rutas
        ├── components/ Secciones del sitio, explorador, gráficos y hero
        └── lib/        Datos, estadística, exportación, formato y resumen generado
```

Flujo de datos: `backend/scripts/descargar_datos.mjs` baja las capas de ArcGIS una vez y deja archivos compactos en
`backend/data/`. En cada `dev` o `build`, `frontend/scripts/preparar-datos.mts` los copia a `public/datos/` y
precalcula `src/lib/generado/resumen.json`. Ningún número del sitio está escrito a mano.

La organización por módulos (focos, sequía, compartido) y el plan para llegar a ella están en
[`docs/arquitectura.md`](Ad-Infinitum-NASA/docs/arquitectura.md). El estado actual, con evidencia, está en
[`docs/auditoria-repo.md`](Ad-Infinitum-NASA/docs/auditoria-repo.md). Detalle del frontend y de las particularidades de
los datos: [`frontend/README.md`](Ad-Infinitum-NASA/frontend/README.md).

## Fuentes

| Dato | Fuente | Uso |
|---|---|---|
| Focos de calor 2002–2024, departamentos, embalses (mayo 2024) | CONAE / Gobierno de San Luis, ArcGIS Online | Módulo de focos y contornos de diques |
| Lluvia, evaporación, temperatura, humedad, viento | NASA POWER (MERRA-2) | Módulo de sequía (pendiente) |
| Límites de provincias | Natural Earth (dominio público) | Mapa base |
