"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import type {
  Map as MapaGL,
  MapLayerMouseEvent,
  StyleSpecification,
  SymbolLayerSpecification,
} from "maplibre-gl";
import { cuadricula, type Extension } from "@/lib/mapa/cuadricula";
import {
  expresionColor,
  type Dominio,
  type GrillaConMedia,
  type PropiedadesConMedia,
  type Vista,
} from "@/lib/mapa/escalas";
import estilos from "./MapaTemperatura.module.css";

const URL_ESTILO_BASE = "https://tiles.openfreemap.org/styles/positron";
const FUENTE_ETIQUETAS = ["Noto Sans Regular"];

// Si la base no responde, el mapa sigue funcionando sobre un fondo liso
const ESTILO_SIN_BASE: StyleSpecification = {
  version: 8,
  glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf",
  sources: {},
  layers: [{ id: "fondo", type: "background", paint: { "background-color": "#EFEBE1" } }],
};

async function cargarEstiloBase(): Promise<StyleSpecification> {
  try {
    const respuesta = await fetch(URL_ESTILO_BASE, { signal: AbortSignal.timeout(8000) });
    if (!respuesta.ok) return ESTILO_SIN_BASE;
    return (await respuesta.json()) as StyleSpecification;
  } catch {
    return ESTILO_SIN_BASE;
  }
}

const TEXTOS_CONTROLES = {
  "NavigationControl.ZoomIn": "Acercar",
  "NavigationControl.ZoomOut": "Alejar",
  "NavigationControl.ResetBearing": "Orientar al norte",
  "AttributionControl.ToggleAttribution": "Mostrar u ocultar atribuciones",
  "CooperativeGesturesHandler.WindowsHelpText": "Usa Ctrl + rueda del mouse para acercar o alejar el mapa",
  "CooperativeGesturesHandler.MacHelpText": "Usa ⌘ + rueda del mouse para acercar o alejar el mapa",
  "CooperativeGesturesHandler.MobileHelpText": "Usa dos dedos para mover el mapa",
};

export type CapasMapa = {
  temperatura: boolean;
  cuadricula: boolean;
  base: boolean;
};

export type Lectura = {
  lon: number;
  lat: number;
  propiedades: PropiedadesConMedia;
};

type Props = {
  grilla: GrillaConMedia;
  extension: Extension;
  vista: Vista;
  anio: number;
  dominio: Dominio;
  capas: CapasMapa;
  opacidad: number;
  etiqueta: string;
  onLectura: (lectura: Lectura | null) => void;
};

const CAPAS_CUADRICULA = ["cuadricula-lineas", "cuadricula-lon", "cuadricula-lat"];
const CAPAS_TEMPERATURA = ["temperatura", "celda-activa"];

export function MapaTemperatura({
  grilla,
  extension,
  vista,
  anio,
  dominio,
  capas,
  opacidad,
  etiqueta,
  onLectura,
}: Props) {
  const contenedor = useRef<HTMLDivElement>(null);
  const mapa = useRef<MapaGL | null>(null);
  const capasBase = useRef<string[]>([]);
  const lectura = useRef(onLectura);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    lectura.current = onLectura;
  }, [onLectura]);

  // Crea el mapa una vez por grilla
  useEffect(() => {
    let cancelado = false;
    let m: MapaGL | undefined;

    Promise.all([import("maplibre-gl"), cargarEstiloBase()]).then(([gl, estilo]) => {
      if (cancelado || !contenedor.current) return;
      // Copiado a public/ por scripts/copiar-worker-maplibre.mjs
      gl.setWorkerUrl("/maplibre-gl-worker.mjs");
      m = new gl.Map({
        container: contenedor.current,
        style: estilo,
        bounds: [...extension] as [number, number, number, number],
        fitBoundsOptions: { padding: 12 },
        canvasContextAttributes: { preserveDrawingBuffer: true },
        attributionControl: { compact: true },
        // La rueda no hace zoom sin Ctrl: asi la pagina se puede desplazar sobre el mapa
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
        const capasEstilo = m.getStyle().layers;
        capasBase.current = capasEstilo.map((c) => c.id);
        const primerSimbolo = capasEstilo.find((c) => c.type === "symbol")?.id;
        const { lineas, etiquetas } = cuadricula(extension);

        m.addSource("grilla", { type: "geojson", data: grilla, generateId: true });
        m.addLayer(
          {
            id: "temperatura",
            type: "fill",
            source: "grilla",
            paint: { "fill-color": "#FFFFFF", "fill-antialias": false },
          },
          primerSimbolo,
        );
        m.addLayer({
          id: "celda-activa",
          type: "line",
          source: "grilla",
          paint: {
            "line-color": "#1C211F",
            "line-width": ["case", ["boolean", ["feature-state", "activa"], false], 2, 0],
          },
        });

        m.addSource("cuadricula-lineas", { type: "geojson", data: lineas });
        m.addSource("cuadricula-etiquetas", { type: "geojson", data: etiquetas });
        m.addLayer({
          id: "cuadricula-lineas",
          type: "line",
          source: "cuadricula-lineas",
          paint: { "line-color": "rgba(28, 33, 31, 0.35)", "line-width": 1 },
        });
        const texto: SymbolLayerSpecification["layout"] = {
          "text-field": ["get", "texto"],
          "text-font": FUENTE_ETIQUETAS,
          "text-size": 12,
          "text-allow-overlap": true,
        };
        const pintura = { "text-color": "#1C211F", "text-halo-color": "#FFFFFF", "text-halo-width": 1.5 };
        m.addLayer({
          id: "cuadricula-lon",
          type: "symbol",
          source: "cuadricula-etiquetas",
          filter: ["==", ["get", "tipo"], "lon"],
          layout: { ...texto, "text-anchor": "bottom", "text-offset": [0, -0.4] },
          paint: pintura,
        });
        m.addLayer({
          id: "cuadricula-lat",
          type: "symbol",
          source: "cuadricula-etiquetas",
          filter: ["==", ["get", "tipo"], "lat"],
          layout: { ...texto, "text-anchor": "bottom-left", "text-offset": [0.4, -0.2] },
          paint: pintura,
        });

        let activa: string | number | undefined;
        const limpiar = () => {
          if (activa !== undefined) m?.setFeatureState({ source: "grilla", id: activa }, { activa: false });
          activa = undefined;
        };
        const leer = (e: MapLayerMouseEvent) => {
          const celda = e.features?.[0];
          if (!celda || !m) return;
          if (celda.id !== activa) {
            limpiar();
            activa = celda.id;
            m.setFeatureState({ source: "grilla", id: activa! }, { activa: true });
          }
          lectura.current({
            lon: e.lngLat.lng,
            lat: e.lngLat.lat,
            propiedades: celda.properties as PropiedadesConMedia,
          });
        };
        m.on("mousemove", "temperatura", leer);
        m.on("click", "temperatura", leer);
        m.on("mouseleave", "temperatura", () => {
          limpiar();
          lectura.current(null);
        });
        m.getCanvas().style.cursor = "crosshair";
        setListo(true);
      });
    });

    return () => {
      cancelado = true;
      m?.remove();
      mapa.current = null;
      setListo(false);
    };
  }, [grilla, extension]);

  useEffect(() => {
    if (!listo || !mapa.current) return;
    mapa.current.setPaintProperty("temperatura", "fill-color", expresionColor(vista, anio, dominio));
  }, [listo, vista, anio, dominio]);

  useEffect(() => {
    if (!listo || !mapa.current) return;
    mapa.current.setPaintProperty("temperatura", "fill-opacity", opacidad);
  }, [listo, opacidad]);

  useEffect(() => {
    const m = mapa.current;
    if (!listo || !m) return;
    const visible = (si: boolean) => (si ? "visible" : "none");
    for (const id of capasBase.current) m.setLayoutProperty(id, "visibility", visible(capas.base));
    for (const id of CAPAS_TEMPERATURA) m.setLayoutProperty(id, "visibility", visible(capas.temperatura));
    for (const id of CAPAS_CUADRICULA) m.setLayoutProperty(id, "visibility", visible(capas.cuadricula));
  }, [listo, capas]);

  useEffect(() => {
    if (!listo || !mapa.current) return;
    mapa.current.getCanvas().setAttribute("aria-label", etiqueta);
  }, [listo, etiqueta]);

  return (
    <div className={estilos.marco}>
      <div ref={contenedor} className={estilos.mapa} />
      {!listo && <div className={estilos.cargando} role="status">Cargando mapa…</div>}
    </div>
  );
}
