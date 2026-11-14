"use client";

import type { Feature, MultiPolygon } from "geojson";
import { useEffect, useMemo, useState } from "react";
import { ANIO_FIN, ANIO_INICIO, datos } from "@/lib/data";
import argentina from "@/lib/geo/argentina.json";
import { fmt, fmtLat, fmtLon, fmtSigno } from "@/lib/formato";
import { ESCALA_ANOMALIA, dentroDe, escalaTemperatura, type Escala } from "@/lib/mapa/bandas";
import { campoDe, rejillaDesdeGrilla, valorBilineal, type VistaCampo } from "@/lib/mapa/rejilla";
import { PanelLateral } from "./Diseno/PanelLateral";
import { LeyendaBandas } from "./Mapa/LeyendaBandas";
import { MapaBandas, type CapasMapa } from "./Mapa/MapaBandas";
import { useBandas } from "./Mapa/useBandas";
import { PanelMapa } from "./Panel/PanelMapa";
import { useGrilla } from "./useGrilla";
import estilos from "./Explorador.module.css";

const PASO_REPRODUCCION_MS = 800;
const contorno = argentina as Feature<MultiPolygon>;

export function Explorador() {
  const { estado, reintentar } = useGrilla();
  const [vista, setVista] = useState<VistaCampo>("temperatura");
  const [anio, setAnio] = useState(ANIO_FIN);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [capas, setCapas] = useState<CapasMapa>({ temperatura: true, provincias: true, coordenadas: true, base: true });
  const [opacidad, setOpacidad] = useState(0.9);
  const [punto, setPunto] = useState<{ lon: number; lat: number } | null>(null);

  const grilla = estado.tipo === "listo" ? estado.grilla : null;
  const rejilla = useMemo(() => (grilla ? rejillaDesdeGrilla(grilla) : null), [grilla]);

  // Escalas fijas para todos los anios: los colores se comparan entre anios
  const escalas = useMemo<Record<VistaCampo, Escala> | null>(() => {
    if (!rejilla) return null;
    let min = Infinity;
    let max = -Infinity;
    for (const campo of rejilla.porAnio) {
      for (const v of campo) {
        min = Math.min(min, v);
        max = Math.max(max, v);
      }
    }
    return { temperatura: escalaTemperatura([min, max]), anomalia: ESCALA_ANOMALIA };
  }, [rejilla]);

  const indice = anio - ANIO_INICIO;
  const { bandas, calculando, error } = useBandas(rejilla, escalas, vista, indice);

  useEffect(() => {
    if (!reproduciendo) return;
    const id = setInterval(() => setAnio((a) => (a >= ANIO_FIN ? ANIO_INICIO : a + 1)), PASO_REPRODUCCION_MS);
    return () => clearInterval(id);
  }, [reproduciendo]);

  const lectura = useMemo(() => {
    if (!punto || !rejilla) return "Pasa el cursor o toca el mapa para leer el valor de un punto.";
    if (!dentroDe(contorno, punto.lon, punto.lat)) return "Ese punto está fuera de Argentina: el mapa muestra valores solo dentro del país.";
    const t = valorBilineal(campoDe(rejilla, "temperatura", indice), punto.lon, punto.lat);
    const a = valorBilineal(campoDe(rejilla, "anomalia", indice), punto.lon, punto.lat);
    return `${fmtLon(punto.lon)}, ${fmtLat(punto.lat)}: ${fmt(t, 1)} °C en ${anio}, ${fmtSigno(a, 1)} °C respecto de su promedio ${ANIO_INICIO}-${ANIO_FIN}.`;
  }, [punto, rejilla, indice, anio]);

  const nombreVista = vista === "temperatura" ? "temperatura media anual" : "anomalía de temperatura";

  return (
    <div className={estilos.pagina}>
      <div className={estilos.presentacion}>
        <h1>¿Cómo cambió tu región con el tiempo?</h1>
        <p>
          Recorre los años sobre el mapa para ver dónde hace más calor y cómo se movió la temperatura entre{" "}
          {ANIO_INICIO} y {ANIO_FIN}.
        </p>
      </div>

      <div className={estilos.columnas}>
        <PanelLateral>
          <PanelMapa
            vista={vista}
            onVista={setVista}
            anio={anio}
            onAnio={setAnio}
            reproduciendo={reproduciendo}
            onReproducir={() => setReproduciendo((r) => !r)}
            capas={capas}
            onCapas={setCapas}
            opacidad={opacidad}
            onOpacidad={setOpacidad}
          />
        </PanelLateral>

        <main className={estilos.principal}>
          <section className={estilos.tarjeta} aria-labelledby="titulo-mapa">
            <h2 id="titulo-mapa" className={estilos.tituloMapa}>
              Mapa de {nombreVista}
            </h2>

            {estado.tipo === "error" && (
              <div className={estilos.error} role="alert">
                <p>No pudimos cargar los datos de la API: {estado.mensaje}.</p>
                <button type="button" onClick={reintentar}>
                  Reintentar
                </button>
              </div>
            )}
            {estado.tipo === "cargando" && (
              <div className={estilos.esqueleto} role="status">
                Cargando datos…
              </div>
            )}

            {escalas && (
              <div className={estilos.mapaYLeyenda}>
                <MapaBandas
                  bandas={bandas}
                  capas={capas}
                  opacidad={opacidad}
                  etiqueta={`Mapa de ${nombreVista} de Argentina, año ${anio}. Pasa el cursor o toca el mapa para leer el valor de un punto.`}
                  onPuntero={setPunto}
                />
                <div className={estilos.lateral}>
                  <p className={estilos.anio}>
                    <span className="sr-only">Año </span>
                    {anio}
                  </p>
                  <LeyendaBandas vista={vista} escala={escalas[vista]} />
                  <p className={estilos.lectura}>{lectura}</p>
                  <p className={estilos.estado} role="status">
                    {error
                      ? `No se pudo dibujar el mapa de ${anio}: ${error}`
                      : calculando
                        ? `Calculando el mapa de ${anio}…`
                        : ""}
                  </p>
                </div>
              </div>
            )}
            {datos.ilustrativo && (
              <p className={estilos.nota}>
                Datos ilustrativos: la grilla se genera en el navegador hasta conectar la API de la NASA. Límites:
                Natural Earth.
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
