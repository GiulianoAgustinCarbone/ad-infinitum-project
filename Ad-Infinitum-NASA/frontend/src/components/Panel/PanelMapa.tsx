"use client";

import { ANIO_FIN, ANIO_INICIO } from "@/lib/data";
import type { VistaCampo as Vista } from "@/lib/mapa/rejilla";
import type { CapasMapa } from "@/components/Mapa/MapaBandas";
import estilos from "./Panel.module.css";

type Props = {
  vista: Vista;
  onVista: (v: Vista) => void;
  anio: number;
  onAnio: (a: number) => void;
  reproduciendo: boolean;
  onReproducir: () => void;
  capas: CapasMapa;
  onCapas: (c: CapasMapa) => void;
  opacidad: number;
  onOpacidad: (o: number) => void;
};

const NOMBRES_CAPAS: { clave: keyof CapasMapa; texto: string }[] = [
  { clave: "temperatura", texto: "Temperatura" },
  { clave: "provincias", texto: "Límites de provincias" },
  { clave: "coordenadas", texto: "Coordenadas" },
  { clave: "base", texto: "Base del mapa" },
];

// Secciones Variable, Años y Capas del panel izquierdo
export function PanelMapa(p: Props) {
  return (
    <>
      <section className={estilos.seccion} aria-labelledby="titulo-variable">
        <h2 id="titulo-variable">Variable</h2>
        <div className={estilos.segmentado} role="group" aria-label="Qué muestra el mapa">
          <button type="button" aria-pressed={p.vista === "temperatura"} onClick={() => p.onVista("temperatura")}>
            Temperatura
          </button>
          <button type="button" aria-pressed={p.vista === "anomalia"} onClick={() => p.onVista("anomalia")}>
            Anomalía
          </button>
        </div>
        <p className={estilos.ayuda}>
          {p.vista === "temperatura"
            ? "Temperatura superficial media de cada año, en °C."
            : `Cuánto se aleja cada año del promedio ${ANIO_INICIO}-${ANIO_FIN} de la misma celda.`}
        </p>
      </section>

      <section className={estilos.seccion} aria-labelledby="titulo-anios">
        <h2 id="titulo-anios">Años</h2>
        <div className={estilos.campo}>
          <div className={estilos.fila}>
            <label htmlFor="anio-mapa">Año del mapa</label>
            <output htmlFor="anio-mapa">{p.anio}</output>
          </div>
          <input
            id="anio-mapa"
            type="range"
            min={ANIO_INICIO}
            max={ANIO_FIN}
            step={1}
            value={p.anio}
            onChange={(e) => p.onAnio(Number(e.target.value))}
          />
          <button type="button" className={`${estilos.boton} ${estilos.botonOscuro}`} onClick={p.onReproducir}>
            {p.reproduciendo ? "Pausar" : "Reproducir años"}
          </button>
        </div>
      </section>

      <section className={estilos.seccion} aria-labelledby="titulo-capas">
        <h2 id="titulo-capas">Capas</h2>
        {NOMBRES_CAPAS.map(({ clave, texto }) => (
          <div key={clave}>
            <label className={estilos.casilla}>
              <input
                type="checkbox"
                checked={p.capas[clave]}
                onChange={(e) => p.onCapas({ ...p.capas, [clave]: e.target.checked })}
              />
              {texto}
            </label>
            {clave === "temperatura" && (
              <div className={`${estilos.campo} ${estilos.anidado}`}>
                <div className={estilos.fila}>
                  <label htmlFor="opacidad">Opacidad</label>
                  <output htmlFor="opacidad">{Math.round(p.opacidad * 100)} %</output>
                </div>
                <input
                  id="opacidad"
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={Math.round(p.opacidad * 100)}
                  disabled={!p.capas.temperatura}
                  onChange={(e) => p.onOpacidad(Number(e.target.value) / 100)}
                />
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
