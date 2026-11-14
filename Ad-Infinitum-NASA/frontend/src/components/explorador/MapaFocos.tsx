"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import type { Feature, FeatureCollection, Point, Position } from "geojson";
import type { ExpressionSpecification, FilterSpecification, Map as MapaGL, Marker } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import type { Departamentos, Embalses } from "@/lib/data/focos";
import { AGUA, CENIZA, CORTES_POTENCIA, FUEGO, SIN_DATO } from "@/lib/focos/escala";
import { cajaDe } from "@/lib/focos/proyeccion";
import type { FocosCompactos } from "@/lib/focos/tipos";
import provincias from "@/lib/geo/provincias.json";
import estilos from "./Explorador.module.css";

export type FiltroFocos = {
  anio: number | null;
  mes: number | null;
  depto: number | null;
  soloAqua: boolean;
};

export type Vista = "puntos" | "calor";

export type Lectura = { tipo: "foco"; indice: number } | { tipo: "depto"; nombre: string } | null;

type Props = {
  focos: FocosCompactos;
  departamentos: Departamentos;
  embalses: Embalses;
  filtro: FiltroFocos;
  vista: Vista;
  // Focos visibles con el filtro actual: regula la intensidad del mapa de calor
  cantidad: number;
  // Indice de AQUA en focos.satelites
  indiceAqua: number;
  onLectura: (l: Lectura) => void;
  onElegirDepto: (indice: number | null) => void;
  onMapa?: (mapa: MapaGL | null) => void;
};

const TEXTOS_CONTROLES = {
  "NavigationControl.ZoomIn": "Acercar",
  "NavigationControl.ZoomOut": "Alejar",
  "AttributionControl.ToggleAttribution": "Mostrar u ocultar atribuciones",
  "CooperativeGesturesHandler.WindowsHelpText": "Usá Ctrl + rueda del mouse para acercar o alejar el mapa",
  "CooperativeGesturesHandler.MacHelpText": "Usá ⌘ + rueda del mouse para acercar o alejar el mapa",
  "CooperativeGesturesHandler.MobileHelpText": "Usá dos dedos para mover el mapa",
};

function puntosGeojson(f: FocosCompactos): FeatureCollection<Point> {
  const c = f.columnas;
  const features: Feature<Point>[] = new Array(f.n);
  for (let i = 0; i < f.n; i++) {
    const p: Record<string, number> = { i, a: c.anio[i], m: c.mes[i], d: c.depto[i], s: c.sat[i] };
    const pw = c.power[i];
    if (pw !== null) p.p = pw;
    features[i] = { type: "Feature", id: i, properties: p, geometry: { type: "Point", coordinates: [c.lon[i], c.lat[i]] } };
  }
  return { type: "FeatureCollection", features };
}

function expresionFiltro(filtro: FiltroFocos, indiceAqua: number): FilterSpecification {
  const partes: ExpressionSpecification[] = [];
  if (filtro.anio !== null) partes.push(["==", ["get", "a"], filtro.anio]);
  if (filtro.mes !== null) partes.push(["==", ["get", "m"], filtro.mes]);
  if (filtro.depto !== null) partes.push(["==", ["get", "d"], filtro.depto]);
  if (filtro.soloAqua) partes.push(["==", ["get", "s"], indiceAqua]);
  return ["all", true, ...partes] as FilterSpecification;
}

// Color por potencia radiativa; sin dato confiable en gris
const COLOR_POTENCIA: ExpressionSpecification = [
  "case",
  ["has", "p"],
  ["step", ["get", "p"], FUEGO[0], CORTES_POTENCIA[0], FUEGO[1], CORTES_POTENCIA[1], FUEGO[2], CORTES_POTENCIA[2], FUEGO[3], CORTES_POTENCIA[3], FUEGO[4]],
  SIN_DATO,
];

// Peso del mapa de calor: logaritmo de la potencia (sin dato = peso de 30 MW, cerca de la mediana)
const PESO_CALOR: ExpressionSpecification = [
  "interpolate",
  ["linear"],
  ["ln", ["+", 1, ["coalesce", ["get", "p"], 30]]],
  0,
  0.05,
  Math.log(1 + 1000),
  1,
];

function anillos(geo: Departamentos | Embalses): Position[][] {
  const r: Position[][] = [];
  for (const f of geo.features) {
    if (f.geometry.type === "Polygon") r.push(f.geometry.coordinates[0]);
    else for (const p of f.geometry.coordinates) r.push(p[0]);
  }
  return r;
}

export default function MapaFocos({
  focos,
  departamentos,
  embalses,
  filtro,
  vista,
  cantidad,
  indiceAqua,
  onLectura,
  onElegirDepto,
  onMapa,
}: Props) {
  const contenedor = useRef<HTMLDivElement>(null);
  const mapa = useRef<MapaGL | null>(null);
  const [listo, setListo] = useState(false);
  const callbacks = useRef({ onLectura, onElegirDepto, onMapa });

  useEffect(() => {
    callbacks.current = { onLectura, onElegirDepto, onMapa };
  });

  useEffect(() => {
    let cancelado = false;
    let m: MapaGL | undefined;
    const marcadores: Marker[] = [];
    const caja = cajaDe(anillos(departamentos));

    import("maplibre-gl").then((gl) => {
      if (cancelado || !contenedor.current) return;
      // Copiado a public/ por scripts/copiar-worker-maplibre.mjs
      gl.setWorkerUrl("/maplibre-gl-worker.mjs");
      m = new gl.Map({
        container: contenedor.current,
        style: {
          version: 8,
          sources: {},
          layers: [{ id: "fondo", type: "background", paint: { "background-color": "#13202d" } }],
        },
        bounds: [caja.oeste, caja.sur, caja.este, caja.norte],
        fitBoundsOptions: { padding: 24 },
        maxBounds: [caja.oeste - 3, caja.sur - 2.5, caja.este + 3, caja.norte + 2.5],
        canvasContextAttributes: { preserveDrawingBuffer: true },
        attributionControl: { compact: true, customAttribution: "Datos: CONAE / Gobierno de San Luis" },
        cooperativeGestures: true,
        dragRotate: false,
        touchPitch: false,
        locale: TEXTOS_CONTROLES,
      });
      m.touchZoomRotate.disableRotation();
      m.addControl(new gl.NavigationControl({ showCompass: false }), "top-right");
      mapa.current = m;

      m.on("load", () => {
        if (!m) return;
        m.addSource("provincias", { type: "geojson", data: provincias as FeatureCollection });
        m.addLayer({
          id: "provincias",
          type: "line",
          source: "provincias",
          filter: ["!=", ["get", "iso"], "AR-D"],
          paint: { "line-color": "#2d4054", "line-width": 1 },
        });
        m.addSource("deptos", { type: "geojson", data: departamentos, generateId: true });
        m.addLayer({
          id: "deptos-relleno",
          type: "fill",
          source: "deptos",
          paint: {
            "fill-color": ["case", ["boolean", ["feature-state", "sobre"], false], "#22344a", "#1b2a3a"],
          },
        });
        m.addLayer({
          id: "deptos-borde",
          type: "line",
          source: "deptos",
          paint: { "line-color": "#4a6077", "line-width": 1 },
        });
        m.addSource("embalses", { type: "geojson", data: embalses });
        m.addLayer({
          id: "embalses",
          type: "fill",
          source: "embalses",
          paint: { "fill-color": AGUA, "fill-opacity": 0.85 },
        });
        m.addSource("focos", { type: "geojson", data: puntosGeojson(focos) });
        m.addLayer({
          id: "calor",
          type: "heatmap",
          source: "focos",
          layout: { visibility: "none" },
          paint: {
            "heatmap-weight": PESO_CALOR,
            "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 6, 0.7, 10, 2.2],
            "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 6, 9, 8, 18, 11, 34],
            "heatmap-opacity": 0.9,
            // La escala empieza en un violeta visible, no en transparente puro
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(155, 91, 181, 0)",
              0.04,
              "rgba(155, 91, 181, 0.55)",
              0.2,
              FUEGO[0],
              0.4,
              FUEGO[1],
              0.6,
              FUEGO[2],
              0.8,
              FUEGO[3],
              1,
              FUEGO[4],
            ],
          },
        });
        m.addLayer({
          id: "puntos",
          type: "circle",
          source: "focos",
          paint: {
            "circle-color": COLOR_POTENCIA,
            "circle-radius": ["interpolate", ["linear"], ["zoom"], 6, 2.2, 9, 4, 12, 7],
            // Borde claro fino: los valores bajos no se pierden contra el fondo
            "circle-stroke-color": "rgba(236, 232, 223, 0.7)",
            "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 6, 0.4, 10, 1],
            "circle-opacity": 0.95,
          },
        });
        m.addLayer({
          id: "deptos-elegido",
          type: "line",
          source: "deptos",
          filter: ["==", ["get", "nombre"], ""],
          paint: { "line-color": CENIZA, "line-width": 2.5 },
        });

        // Nombres de departamentos como marcadores HTML (sin fuentes de glifos externas)
        for (const f of departamentos.features) {
          const c = cajaDe(f.geometry.type === "Polygon" ? [f.geometry.coordinates[0]] : f.geometry.coordinates.map((p) => p[0]));
          const el = document.createElement("span");
          el.className = estilos.etiquetaDepto;
          el.textContent = f.properties.nombre;
          el.setAttribute("aria-hidden", "true");
          marcadores.push(
            new gl.Marker({ element: el }).setLngLat([(c.oeste + c.este) / 2, (c.sur + c.norte) / 2]).addTo(m),
          );
        }

        let sobreId: number | string | undefined;
        const limpiarSobre = () => {
          if (sobreId !== undefined) m?.setFeatureState({ source: "deptos", id: sobreId }, { sobre: false });
          sobreId = undefined;
        };

        const leer = (punto: { x: number; y: number }) => {
          if (!m) return;
          const caja: [[number, number], [number, number]] = [
            [punto.x - 6, punto.y - 6],
            [punto.x + 6, punto.y + 6],
          ];
          if (m.getLayoutProperty("puntos", "visibility") !== "none") {
            const f = m.queryRenderedFeatures(caja, { layers: ["puntos"] })[0];
            if (f) {
              limpiarSobre();
              m.getCanvas().style.cursor = "pointer";
              callbacks.current.onLectura({ tipo: "foco", indice: Number(f.properties.i) });
              return;
            }
          }
          const d = m.queryRenderedFeatures([punto.x, punto.y], { layers: ["deptos-relleno"] })[0];
          if (d) {
            if (sobreId !== d.id) {
              limpiarSobre();
              sobreId = d.id;
              if (sobreId !== undefined) m.setFeatureState({ source: "deptos", id: sobreId }, { sobre: true });
            }
            m.getCanvas().style.cursor = "pointer";
            callbacks.current.onLectura({ tipo: "depto", nombre: String(d.properties.nombre) });
          } else {
            limpiarSobre();
            m.getCanvas().style.cursor = "";
            callbacks.current.onLectura(null);
          }
        };

        m.on("mousemove", (e) => leer(e.point));
        m.on("click", (e) => {
          leer(e.point);
          const d = m?.queryRenderedFeatures([e.point.x, e.point.y], { layers: ["deptos-relleno"] })[0];
          if (!d) return;
          const indice = focos.departamentos.indexOf(String(d.properties.nombre));
          callbacks.current.onElegirDepto(indice >= 0 ? indice : null);
        });
        m.getCanvas().addEventListener("mouseleave", () => {
          limpiarSobre();
          callbacks.current.onLectura(null);
        });
        m.getContainer().querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show");
        setListo(true);
        callbacks.current.onMapa?.(m);
      });
    });

    return () => {
      cancelado = true;
      marcadores.forEach((mk) => mk.remove());
      callbacks.current.onMapa?.(null);
      m?.remove();
      mapa.current = null;
      setListo(false);
    };
  }, [focos, departamentos, embalses]);

  useEffect(() => {
    const m = mapa.current;
    if (!listo || !m) return;
    const expr = expresionFiltro(filtro, indiceAqua);
    m.setFilter("puntos", expr);
    m.setFilter("calor", expr);
  }, [listo, filtro, indiceAqua]);

  // Sin este ajuste, con miles de focos el mapa de calor se satura y deja de mostrar diferencias
  useEffect(() => {
    const m = mapa.current;
    if (!listo || !m) return;
    const base = Math.min(1.5, 12 / Math.sqrt(Math.max(1, cantidad)));
    m.setPaintProperty("calor", "heatmap-intensity", ["interpolate", ["linear"], ["zoom"], 6, base * 0.7, 10, base * 2.2]);
  }, [listo, cantidad]);

  useEffect(() => {
    const m = mapa.current;
    if (!listo || !m) return;
    m.setLayoutProperty("puntos", "visibility", vista === "puntos" ? "visible" : "none");
    m.setLayoutProperty("calor", "visibility", vista === "calor" ? "visible" : "none");
  }, [listo, vista]);

  // Resalta y encuadra el departamento elegido
  useEffect(() => {
    const m = mapa.current;
    if (!listo || !m) return;
    const nombre = filtro.depto === null ? "" : focos.departamentos[filtro.depto];
    m.setFilter("deptos-elegido", ["==", ["get", "nombre"], nombre]);
    const objetivo = nombre ? departamentos.features.filter((f) => f.properties.nombre === nombre) : departamentos.features;
    const c = cajaDe(anillos({ type: "FeatureCollection", features: objetivo }));
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    m.fitBounds([c.oeste, c.sur, c.este, c.norte], { padding: 32, duration: reducido ? 0 : 700 });
  }, [listo, filtro.depto, focos, departamentos]);

  return <div ref={contenedor} className={estilos.mapa} />;
}
