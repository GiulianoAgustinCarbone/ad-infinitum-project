"use client";

import { useEffect, useMemo, useState } from "react";
import { ANIO_FIN, ANIO_INICIO, datos } from "@/lib/data";
import { fmt, fmtLat, fmtLon, fmtSigno } from "@/lib/formato";
import { extensionGrilla } from "@/lib/mapa/cuadricula";
import { dominioAnomalia, dominioTemperatura, valorCelda, type Vista } from "@/lib/mapa/escalas";
import { PanelLateral } from "./Diseno/PanelLateral";
import { LeyendaColor } from "./Mapa/LeyendaColor";
import { MapaTemperatura, type CapasMapa, type Lectura } from "./Mapa/MapaTemperatura";
import { PanelMapa } from "./Panel/PanelMapa";
import { useGrilla } from "./useGrilla";
import estilos from "./Explorador.module.css";

const PASO_REPRODUCCION_MS = 800;

export function Explorador() {
  const { estado, reintentar } = useGrilla();
  const [vista, setVista] = useState<Vista>("temperatura");
  const [anio, setAnio] = useState(ANIO_FIN);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [capas, setCapas] = useState<CapasMapa>({ temperatura: true, cuadricula: true, base: true });
  const [opacidad, setOpacidad] = useState(0.85);
  const [lectura, setLectura] = useState<Lectura | null>(null);

  const grilla = estado.tipo === "listo" ? estado.grilla : null;
  const extension = useMemo(() => (grilla ? extensionGrilla(grilla) : null), [grilla]);
  const dominios = useMemo(
    () => grilla && { temperatura: dominioTemperatura(grilla), anomalia: dominioAnomalia(grilla) },
    [grilla],
  );

  useEffect(() => {
    if (!reproduciendo) return;
    const id = setInterval(() => setAnio((a) => (a >= ANIO_FIN ? ANIO_INICIO : a + 1)), PASO_REPRODUCCION_MS);
    return () => clearInterval(id);
  }, [reproduciendo]);

  const nombreVista = vista === "temperatura" ? "temperatura media anual" : "anomalía de temperatura";

  return (
    <div className={estilos.pagina}>
      <div className={estilos.presentacion}>
        <h1>¿Cómo cambió tu región con el tiempo?</h1>
        <p>Recorre los años sobre el mapa para ver dónde hace más calor y cómo se movió la temperatura entre {ANIO_INICIO} y {ANIO_FIN}.</p>
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
            <div className={estilos.cabeceraMapa}>
              <h2 id="titulo-mapa" className={estilos.tituloMapa}>
                Mapa de {nombreVista}
              </h2>
              <p className={estilos.anio}>
                <span className="sr-only">Año </span>
                {anio}
              </p>
            </div>

            {estado.tipo === "error" && (
              <div className={estilos.error} role="alert">
                <p>No pudimos cargar los datos de la API: {estado.mensaje}.</p>
                <button type="button" onClick={reintentar}>
                  Reintentar
                </button>
              </div>
            )}
            {estado.tipo === "cargando" && <div className={estilos.esqueleto} role="status">Cargando datos…</div>}

            {grilla && extension && dominios && (
              <>
                <MapaTemperatura
                  grilla={grilla}
                  extension={extension}
                  vista={vista}
                  anio={anio}
                  dominio={dominios[vista]}
                  capas={capas}
                  opacidad={opacidad}
                  etiqueta={`Mapa de ${nombreVista}, año ${anio}. Pasa el cursor o toca una celda para leer su valor.`}
                  onLectura={setLectura}
                />
                <div className={estilos.pieMapa}>
                  <LeyendaColor vista={vista} dominio={dominios[vista]} />
                  <p className={estilos.lectura}>
                    {lectura
                      ? `${fmtLon(lectura.lon)}, ${fmtLat(lectura.lat)}: ${fmt(valorCelda(lectura.propiedades, "temperatura", anio), 1)} °C en ${anio}, ${fmtSigno(valorCelda(lectura.propiedades, "anomalia", anio), 1)} °C respecto de su promedio.`
                      : "Pasa el cursor o toca el mapa para leer el valor de una celda."}
                  </p>
                </div>
              </>
            )}
            {datos.ilustrativo && (
              <p className={estilos.nota}>
                Datos ilustrativos: la grilla se genera en el navegador hasta conectar la API de la NASA.
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
