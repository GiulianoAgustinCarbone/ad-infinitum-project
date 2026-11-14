"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import type { GeoJSONSource, Map as MapaGL, StyleSpecification } from "maplibre-gl";
import argentina from "@/lib/geo/argentina.json";
import provincias from "@/lib/geo/provincias.json";
import type { Bandas } from "@/lib/mapa/bandas";
import estilos from "./MapaBandas.module.css";

const URL_ESTILO_BASE = "https://tiles.openfreemap.org/styles/positron";

// Si la base no responde, el mapa sigue funcionando sobre un fondo liso
const ESTILO_SIN_BASE: StyleSpecification = {
  version: 8,
  sources: {},
  layers: [{ id: "fondo", type: "background", paint: { "background-color": "#FFFFFF" } }],
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

// Encuadre de Argentina continental, Tierra del Fuego y Malvinas
const ENCUADRE: [number, number, number, number] = [-74, -55.2, -53.4, -21.7];

// Etiquetas de los bordes cada 5 grados, como en los mapas del SMN
const LATITUDES = [-25, -30, -35, -40, -45, -50, -55];
const LONGITUDES = [-75, -70, -65, -60, -55];

const VACIA: Bandas = { type: "FeatureCollection", features: [] };

export type CapasMapa = {
  temperatura: boolean;
  provincias: boolean;
  coordenadas: boolean;
  base: boolean;
};

type Props = {
  bandas: Bandas | null;
  capas: CapasMapa;
  opacidad: number;
  etiqueta: string;
  onPuntero: (punto: { lon: number; lat: number } | null) => void;
};

export function MapaBandas({ bandas, capas, opacidad, etiqueta, onPuntero }: Props) {
  const contenedor = useRef<HTMLDivElement>(null);
  const ejeLat = useRef<HTMLDivElement>(null);
  const ejeLon = useRef<HTMLDivElement>(null);
  const mapa = useRef<MapaGL | null>(null);
  const capasBase = useRef<string[]>([]);
  const puntero = useRef(onPuntero);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    puntero.current = onPuntero;
  }, [onPuntero]);

  useEffect(() => {
    let cancelado = false;
    let m: MapaGL | undefined;

    // Ubica las etiquetas de latitud y longitud junto al borde del mapa
    const ubicarEjes = () => {
      if (!m || !ejeLat.current || !ejeLon.current) return;
      const { lng, lat } = m.getCenter();
      const alto = m.getContainer().clientHeight;
      const ancho = m.getContainer().clientWidth;
      ejeLat.current.querySelectorAll<HTMLElement>("[data-lat]").forEach((el) => {
        const y = m!.project([lng, Number(el.dataset.lat)]).y;
        el.style.top = `${y}px`;
        el.hidden = y < 8 || y > alto - 8;
      });
      ejeLon.current.querySelectorAll<HTMLElement>("[data-lon]").forEach((el) => {
        const x = m!.project([Number(el.dataset.lon), lat]).x;
        el.style.left = `${x}px`;
        el.hidden = x < 16 || x > ancho - 16;
      });
    };

    Promise.all([import("maplibre-gl"), cargarEstiloBase()]).then(([gl, estilo]) => {
      if (cancelado || !contenedor.current) return;
      // Copiado a public/ por scripts/copiar-worker-maplibre.mjs
      gl.setWorkerUrl("/maplibre-gl-worker.mjs");
      m = new gl.Map({
        container: contenedor.current,
        style: estilo,
        bounds: ENCUADRE,
        fitBoundsOptions: { padding: 8 },
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

        m.addSource("bandas", { type: "geojson", data: VACIA });
        m.addLayer(
          { id: "bandas", type: "fill", source: "bandas", paint: { "fill-color": ["get", "color"] } },
          primerSimbolo,
        );
        // Linea del mismo color para tapar las uniones entre bandas vecinas
        m.addLayer(
          {
            id: "bandas-union",
            type: "line",
            source: "bandas",
            paint: { "line-color": ["get", "color"], "line-width": 0.6 },
          },
          primerSimbolo,
        );
        m.addSource("provincias", { type: "geojson", data: provincias as GeoJSON.FeatureCollection });
        m.addLayer({
          id: "provincias",
          type: "line",
          source: "provincias",
          paint: { "line-color": "#3C4441", "line-width": 0.6, "line-opacity": 0.8 },
        });
        m.addSource("pais", { type: "geojson", data: argentina as GeoJSON.Feature });
        m.addLayer({
          id: "pais",
          type: "line",
          source: "pais",
          paint: { "line-color": "#1C211F", "line-width": 1.1 },
        });

        m.on("mousemove", (e) => puntero.current({ lon: e.lngLat.lng, lat: e.lngLat.lat }));
        m.on("click", (e) => puntero.current({ lon: e.lngLat.lng, lat: e.lngLat.lat }));
        m.getCanvas().addEventListener("mouseleave", () => puntero.current(null));
        m.getCanvas().style.cursor = "crosshair";
        // La atribucion compacta arranca abierta y tapa el sur del pais
        m.getContainer().querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show");
        m.on("move", ubicarEjes);
        m.on("resize", ubicarEjes);
        ubicarEjes();
        setListo(true);
      });
    });

    return () => {
      cancelado = true;
      m?.remove();
      mapa.current = null;
      setListo(false);
    };
  }, []);

  useEffect(() => {
    const m = mapa.current;
    if (!listo || !m) return;
    const fuente = m.getSource<GeoJSONSource>("bandas");
    fuente?.setData(bandas ?? VACIA);
  }, [listo, bandas]);

  useEffect(() => {
    const m = mapa.current;
    if (!listo || !m) return;
    m.setPaintProperty("bandas", "fill-opacity", opacidad);
    m.setPaintProperty("bandas-union", "line-opacity", opacidad);
  }, [listo, opacidad]);

  useEffect(() => {
    const m = mapa.current;
    if (!listo || !m) return;
    const visible = (si: boolean) => (si ? "visible" : "none");
    for (const id of capasBase.current) m.setLayoutProperty(id, "visibility", visible(capas.base));
    for (const id of ["bandas", "bandas-union"]) m.setLayoutProperty(id, "visibility", visible(capas.temperatura));
    m.setLayoutProperty("provincias", "visibility", visible(capas.provincias));
  }, [listo, capas]);

  useEffect(() => {
    if (!listo || !mapa.current) return;
    mapa.current.getCanvas().setAttribute("aria-label", etiqueta);
  }, [listo, etiqueta]);

  return (
    <div className={estilos.marco} data-coordenadas={capas.coordenadas}>
      <div ref={ejeLat} className={estilos.ejeLat} aria-hidden="true">
        {LATITUDES.map((lat) => (
          <span key={lat} data-lat={lat} hidden>
            {Math.abs(lat)}° S
          </span>
        ))}
      </div>
      <div className={estilos.lienzo}>
        <div ref={contenedor} className={estilos.mapa} />
        {!listo && (
          <div className={estilos.cargando} role="status">
            Cargando mapa…
          </div>
        )}
      </div>
      <div ref={ejeLon} className={estilos.ejeLon} aria-hidden="true">
        {LONGITUDES.map((lon) => (
          <span key={lon} data-lon={lon} hidden>
            {Math.abs(lon)}° O
          </span>
        ))}
      </div>
    </div>
  );
}
