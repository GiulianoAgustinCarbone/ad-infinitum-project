"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import type { Feature, FeatureCollection, Point, Polygon, MultiPolygon, Position } from "geojson";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import type { Departamentos, Embalses } from "@/lib/data/focos";
import type { DamClimate } from "@/lib/balance/types";
import estilos from "./Balance.module.css";

type Props = { dams: DamClimate[]; selectedId: string; onSelect: (id: string) => void };

function puntosDique(dams: DamClimate[]): FeatureCollection<Point> {
  return {
    type: "FeatureCollection",
    features: dams.map((dam, index): Feature<Point> => ({
      type: "Feature",
      id: dam.id,
      properties: { id: dam.id, label: String(index + 1), name: dam.name },
      geometry: { type: "Point", coordinates: dam.powerCoordinates },
    })),
  };
}

function positions(value: unknown, result: Position[] = []): Position[] {
  if (!Array.isArray(value)) return result;
  if (value.length >= 2 && typeof value[0] === "number" && typeof value[1] === "number") {
    result.push(value as Position);
    return result;
  }
  for (const child of value) positions(child, result);
  return result;
}

export function MapaBalance({ dams, selectedId, onSelect }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef(new Map<string, Marker>());
  const selectRef = useRef(onSelect);
  const selectedRef = useRef(selectedId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    selectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    selectedRef.current = selectedId;
  }, [selectedId]);

  useEffect(() => {
    let cancelled = false;
    let map: MapLibreMap | null = null;
    const markers: Marker[] = [];
    const markerStore = markersRef.current;

    async function initialize() {
      try {
        const [departmentsResponse, reservoirsResponse, maplibre] = await Promise.all([
          fetch("/datos/departamentos.geojson"),
          fetch("/datos/embalses.geojson"),
          import("maplibre-gl"),
        ]);
        if (!departmentsResponse.ok || !reservoirsResponse.ok) {
          throw new Error("Geographic boundary data could not be loaded.");
        }
        const departments = (await departmentsResponse.json()) as Departamentos;
        const reservoirs = (await reservoirsResponse.json()) as Embalses;
        if (cancelled || !container.current) return;

        maplibre.setWorkerUrl("/maplibre-gl-worker.mjs");
        map = new maplibre.Map({
          container: container.current,
          style: {
            version: 8,
            sources: {},
            layers: [{ id: "background", type: "background", paint: { "background-color": "#13202d" } }],
          },
          attributionControl: {
            compact: true,
            customAttribution: "Climate: NASA POWER · Reservoir outlines: CONAE / Government of San Luis",
          },
          cooperativeGestures: true,
          dragRotate: false,
          touchPitch: false,
          canvasContextAttributes: { preserveDrawingBuffer: true },
        });
        map.touchZoomRotate.disableRotation();
        map.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");
        map.on("load", () => {
          if (!map || cancelled) return;
          map.addSource("departments", { type: "geojson", data: departments });
          map.addLayer({
            id: "department-fill",
            type: "fill",
            source: "departments",
            paint: { "fill-color": "#1b2a3a", "fill-opacity": 0.86 },
          });
          map.addLayer({
            id: "department-outline",
            type: "line",
            source: "departments",
            paint: { "line-color": "#4a6077", "line-width": 1.1 },
          });

          const names = new Map(dams.map((dam) => [dam.sourceName, dam.id]));
          const namedWater: FeatureCollection<Polygon | MultiPolygon> = {
            ...reservoirs,
            features: reservoirs.features.map((feature) => ({
              ...feature,
              properties: {
                ...feature.properties,
                damId: names.get(String(feature.properties.nombre ?? "")) ?? "",
              },
            })),
          };
          map.addSource("reservoirs", { type: "geojson", data: namedWater });
          map.addLayer({
            id: "reservoir-fill",
            type: "fill",
            source: "reservoirs",
            paint: {
              "fill-color": ["case", ["==", ["get", "damId"], selectedRef.current], "#f8b44e", "#5e9cc9"],
              "fill-opacity": 0.78,
            },
          });
          map.addLayer({
            id: "reservoir-outline",
            type: "line",
            source: "reservoirs",
            paint: { "line-color": "#a6d9ee", "line-width": 1.3 },
          });
          map.addSource("dam-points", { type: "geojson", data: puntosDique(dams) });
          map.addLayer({
            id: "dam-dots",
            type: "circle",
            source: "dam-points",
            paint: {
              "circle-radius": ["case", ["==", ["get", "id"], selectedRef.current], 8, 6],
              "circle-color": ["case", ["==", ["get", "id"], selectedRef.current], "#f8b44e", "#172634"],
              "circle-stroke-color": "#ece8df",
              "circle-stroke-width": 1.5,
            },
          });

          const bounds = new maplibre.LngLatBounds();
          for (const feature of departments.features) {
            for (const point of positions(feature.geometry.coordinates)) bounds.extend([point[0], point[1]]);
          }
          if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 40, maxZoom: 7 });

          for (const [index, dam] of dams.entries()) {
            const markerButton = document.createElement("button");
            markerButton.type = "button";
            markerButton.className = estilos.damMarker;
            if (dam.id === selectedRef.current) markerButton.classList.add(estilos.selectedMarker);
            markerButton.textContent = String(index + 1);
            markerButton.setAttribute("aria-label", `Select ${dam.name}`);
            markerButton.addEventListener("click", () => selectRef.current(dam.id));
            const marker = new maplibre.Marker({ element: markerButton, anchor: "center" })
              .setLngLat(dam.powerCoordinates)
              .addTo(map);
            markers.push(marker);
            markerStore.set(dam.id, marker);
          }

          map.on("click", "reservoir-fill", (event) => {
            const id = String(event.features?.[0]?.properties?.damId ?? "");
            if (id) selectRef.current(id);
          });
          map.on("mouseenter", "reservoir-fill", () => { if (map) map.getCanvas().style.cursor = "pointer"; });
          map.on("mouseleave", "reservoir-fill", () => { if (map) map.getCanvas().style.cursor = ""; });
          mapRef.current = map;
          setLoading(false);
        });
      } catch (cause) {
        if (cancelled) return;
        setError(cause instanceof Error ? cause.message : "The map could not be loaded.");
        setLoading(false);
      }
    }

    void initialize();
    return () => {
      cancelled = true;
      markers.forEach((marker) => marker.remove());
      markerStore.clear();
      map?.remove();
      mapRef.current = null;
    };
  }, [dams]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    map.setPaintProperty("reservoir-fill", "fill-color", ["case", ["==", ["get", "damId"], selectedId], "#f8b44e", "#5e9cc9"]);
    map.setPaintProperty("dam-dots", "circle-radius", ["case", ["==", ["get", "id"], selectedId], 8, 6]);
    map.setPaintProperty("dam-dots", "circle-color", ["case", ["==", ["get", "id"], selectedId], "#f8b44e", "#172634"]);
    const selected = dams.find((dam) => dam.id === selectedId);
    if (selected) map.easeTo({ center: selected.powerCoordinates, zoom: Math.max(map.getZoom(), 7.5), duration: 420 });
    for (const dam of dams) {
      const marker = markersRef.current.get(dam.id)?.getElement();
      marker?.classList.toggle(estilos.selectedMarker, dam.id === selectedId);
    }
  }, [dams, selectedId]);

  return (
    <div className={estilos.mapFrame}>
      <div ref={container} className={estilos.mapCanvas} aria-label="Interactive map of reservoir study locations in San Luis" />
      {loading && <div className={estilos.mapMessage}>Loading the San Luis map…</div>}
      {error && <div className={estilos.mapMessage} role="alert">{error}</div>}
      <div className={estilos.mapLegend} aria-label="Map legend">
        <span><i className={estilos.departmentKey} />Department boundaries</span>
        <span><i className={estilos.waterKey} />Reservoir outlines</span>
        <span><i className={estilos.markerKey} />Reservoir study locations</span>
      </div>
    </div>
  );
}
