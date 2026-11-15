import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const distDir = join(dirname(require.resolve('maplibre-gl/package.json')), 'dist');
const publicDir = join(__dirname, '..', 'public');

// 1. Asegurar que la carpeta public/ exista en Vercel (Git no sube carpetas vacías)
mkdirSync(publicDir, { recursive: true });

// 2. Copiar el worker principal (soporta v6 .mjs y fallback a v5 .js)
const workerMjs = join(distDir, 'maplibre-gl-worker.mjs');
const workerCsp = join(distDir, 'maplibre-gl-csp-worker.js');
const destinoWorker = join(publicDir, 'maplibre-gl-worker.mjs');

if (existsSync(workerMjs)) {
  copyFileSync(workerMjs, destinoWorker);
} else if (existsSync(workerCsp)) {
  copyFileSync(workerCsp, destinoWorker);
} else {
  throw new Error(`No se encontró el worker de MapLibre en ${distDir}`);
}

// 3. Si existe el módulo compartido de MapLibre v6, copiarlo también
const sharedMjs = join(distDir, 'maplibre-gl-shared.mjs');
if (existsSync(sharedMjs)) {
  copyFileSync(sharedMjs, join(publicDir, 'maplibre-gl-shared.mjs'));
}

console.log('Worker de MapLibre copiado correctamente a public/');