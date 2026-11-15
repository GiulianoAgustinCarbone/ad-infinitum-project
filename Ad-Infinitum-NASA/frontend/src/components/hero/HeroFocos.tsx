"use client";

import type { Position } from "geojson";
import { useEffect, useRef, useState } from "react";
import { fuenteFocos } from "@/lib/data/focos";
import { colorPotencia, FUEGO } from "@/lib/focos/escala";
import { ajustarProyeccion, cajaDe } from "@/lib/focos/proyeccion";
import { entero, mesAnio } from "@/lib/formato";
import estilos from "./HeroFocos.module.css";

const MS_POR_MES = 85;
const PAUSA_FINAL_MS = 4000;
const ESTELA = 4;

type Preparado = {
  anillos: Position[][];
  lon: number[];
  lat: number[];
  power: (number | null)[];
  porMes: number[][];
  mes0: { anio: number; mes: number };
  total: number;
};

function anillosDe(geo: Awaited<ReturnType<typeof fuenteFocos.getDepartamentos>>): Position[][] {
  const anillos: Position[][] = [];
  for (const f of geo.features) {
    if (f.geometry.type === "Polygon") anillos.push(f.geometry.coordinates[0]);
    else for (const p of f.geometry.coordinates) anillos.push(p[0]);
  }
  return anillos;
}

export function HeroFocos() {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const tira = useRef<HTMLCanvasElement>(null);
  const textoMes = useRef<HTMLSpanElement>(null);
  const textoCuenta = useRef<HTMLSpanElement>(null);
  const [datos, setDatos] = useState<Preparado | null>(null);
  const [error, setError] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [quieto, setQuieto] = useState(false);
  const [activa, setActiva] = useState(false);
  const animar = !quieto || activa;
  const pausadoRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizar = () => setQuieto(mq.matches);
    actualizar();
    mq.addEventListener("change", actualizar);
    return () => mq.removeEventListener("change", actualizar);
  }, []);

  useEffect(() => {
    pausadoRef.current = pausado;
  }, [pausado]);

  useEffect(() => {
    let vivo = true;
    Promise.all([fuenteFocos.getFocos(), fuenteFocos.getDepartamentos()])
      .then(([focos, deptos]) => {
        if (!vivo) return;
        const c = focos.columnas;
        const [a0, m0] = focos.fechaMin.split("-").map(Number);
        const [a1, m1] = focos.fechaMax.split("-").map(Number);
        const meses = (a1 - a0) * 12 + (m1 - m0) + 1;
        const porMes: number[][] = Array.from({ length: meses }, () => []);
        for (let i = 0; i < focos.n; i++) {
          porMes[(c.anio[i] - a0) * 12 + (c.mes[i] - m0)]?.push(i);
        }
        setDatos({
          anillos: anillosDe(deptos),
          lon: c.lon,
          lat: c.lat,
          power: c.power,
          porMes,
          mes0: { anio: a0, mes: m0 },
          total: focos.n,
        });
      })
      .catch(() => vivo && setError(true));
    return () => {
      vivo = false;
    };
  }, []);

  useEffect(() => {
    const cv = lienzo.current;
    const cvTira = tira.current;
    if (!datos || !cv || !cvTira) return;
    const ctx = cv.getContext("2d");
    const ctxTira = cvTira.getContext("2d");
    if (!ctx || !ctxTira) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const base = document.createElement("canvas");
    const ceniza = document.createElement("canvas");
    let ancho = 0;
    let alto = 0;
    let anchoTira = 0;
    let altoTira = 0;
    let proy = ajustarProyeccion(cajaDe(datos.anillos), 1, 1, 0);
    const maxMes = Math.max(...datos.porMes.map((m) => m.length));
    let mesDibujado = -1;

    const fecha = (k: number) => {
      const t = datos.mes0.mes - 1 + k;
      return { anio: datos.mes0.anio + Math.floor(t / 12), mes: (t % 12) + 1 };
    };

    const dibujarBase = () => {
      base.width = ceniza.width = cv.width;
      base.height = ceniza.height = cv.height;
      const b = base.getContext("2d")!;
      b.setTransform(dpr, 0, 0, dpr, 0, 0);
      b.lineJoin = "round";
      for (const anillo of datos.anillos) {
        b.beginPath();
        anillo.forEach(([lon, lat], i) => (i ? b.lineTo(proy.x(lon), proy.y(lat)) : b.moveTo(proy.x(lon), proy.y(lat))));
        b.closePath();
        b.fillStyle = "#1b2a3a";
        b.fill();
        b.strokeStyle = "#4a6077";
        b.lineWidth = 1;
        b.stroke();
      }
      // Marcas de coordenadas cada grado sobre el borde, como en una carta
      const fuente = getComputedStyle(document.body).fontFamily;
      b.font = `12px ${fuente}`;
      b.fillStyle = "#95a1ad";
      b.strokeStyle = "#2d4054";
      for (let lat = -32; lat >= -36; lat--) {
        const y = proy.y(lat);
        if (y < 14 || y > alto - 6) continue;
        b.beginPath();
        b.moveTo(0, y);
        b.lineTo(10, y);
        b.stroke();
        b.fillText(`${-lat}° S`, 14, y + 4);
      }
      for (let lon = -67; lon <= -65; lon++) {
        const x = proy.x(lon);
        if (x < 30 || x > ancho - 30) continue;
        b.beginPath();
        b.moveTo(x, alto);
        b.lineTo(x, alto - 10);
        b.stroke();
        b.fillText(`${-lon}° O`, x - 14, alto - 14);
      }
    };

    const punto = (c: CanvasRenderingContext2D, i: number, r: number) => {
      c.beginPath();
      c.arc(proy.x(datos.lon[i]), proy.y(datos.lat[i]), r, 0, Math.PI * 2);
      c.fill();
    };

    const sumarCeniza = (k: number) => {
      const c = ceniza.getContext("2d")!;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.fillStyle = FUEGO[0];
      c.globalAlpha = 0.32;
      for (const i of datos.porMes[k]) punto(c, i, 1.1);
      c.globalAlpha = 1;
    };

    const dibujarTira = (k: number) => {
      ctxTira.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctxTira.clearRect(0, 0, anchoTira, altoTira);
      const n = datos.porMes.length;
      const w = anchoTira / n;
      for (let j = 0; j < n; j++) {
        const h = Math.max(1, (Math.sqrt(datos.porMes[j].length) / Math.sqrt(maxMes)) * (altoTira - 4));
        ctxTira.fillStyle = j <= k ? FUEGO[2] : "#2d4054";
        ctxTira.fillRect(j * w, altoTira - h, Math.max(1, w - 0.6), h);
      }
      if (k >= 0 && k < n) {
        ctxTira.fillStyle = "#ece8df";
        ctxTira.fillRect(k * w - 0.5, 0, 1.5, altoTira);
      }
    };

    const dibujar = (k: number) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(base, 0, 0);
      ctx.drawImage(ceniza, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Estela: el mes actual brilla y los anteriores se apagan
      for (let e = ESTELA - 1; e >= 0; e--) {
        const j = k - e;
        if (j < 0 || j >= datos.porMes.length) continue;
        ctx.globalAlpha = e === 0 ? 1 : 0.55 / e;
        for (const i of datos.porMes[j]) {
          ctx.fillStyle = colorPotencia(datos.power[i]);
          punto(ctx, i, e === 0 ? 2.6 : 1.8);
        }
      }
      ctx.globalAlpha = 1;
      dibujarTira(k);
      if (k >= 0 && k < datos.porMes.length) {
        const f = fecha(k);
        if (textoMes.current) textoMes.current.textContent = mesAnio(f.anio, f.mes);
        if (textoCuenta.current) {
          const n = datos.porMes[k].length;
          textoCuenta.current.textContent = `${entero(n)} ${n === 1 ? "foco" : "focos"}`;
        }
      }
    };

    const estadoFinal = () => {
      const c = ceniza.getContext("2d")!;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, ceniza.width, ceniza.height);
      datos.porMes.forEach((_, k) => sumarCeniza(k));
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(base, 0, 0);
      ctx.drawImage(ceniza, 0, 0);
      dibujarTira(datos.porMes.length - 1);
      if (textoMes.current) textoMes.current.textContent = "2002 a 2024";
      if (textoCuenta.current) textoCuenta.current.textContent = `${entero(datos.total)} focos`;
    };

    const medir = () => {
      const r = cv.getBoundingClientRect();
      // Al salir de la pagina el lienzo mide 0: no hay nada que dibujar
      if (r.width < 1 || r.height < 1) return;
      ancho = r.width;
      alto = r.height;
      cv.width = Math.round(ancho * dpr);
      cv.height = Math.round(alto * dpr);
      const rt = cvTira.getBoundingClientRect();
      anchoTira = rt.width;
      altoTira = rt.height;
      cvTira.width = Math.round(anchoTira * dpr);
      cvTira.height = Math.round(altoTira * dpr);
      proy = ajustarProyeccion(cajaDe(datos.anillos), ancho, alto, Math.min(48, ancho * 0.08));
      dibujarBase();
      // Reconstruye la ceniza hasta el mes que se estaba mostrando
      if (!animar) estadoFinal();
      else {
        for (let k = 0; k <= mesDibujado; k++) sumarCeniza(k);
        dibujar(mesDibujado);
      }
    };

    const ro = new ResizeObserver(medir);
    ro.observe(cv);
    medir();

    if (!animar) return () => ro.disconnect();

    let raf = 0;
    let acumulado = 0;
    let ultimo = performance.now();
    const n = datos.porMes.length;

    const paso = (ahora: number) => {
      const dt = ahora - ultimo;
      ultimo = ahora;
      if (!pausadoRef.current && document.visibilityState === "visible") acumulado += dt;
      const k = Math.floor(acumulado / MS_POR_MES);
      if (k < n) {
        while (mesDibujado < k) {
          mesDibujado++;
          sumarCeniza(mesDibujado);
        }
        dibujar(k);
      } else if (acumulado > n * MS_POR_MES + PAUSA_FINAL_MS) {
        // Reinicia el recorrido
        acumulado = 0;
        mesDibujado = -1;
        const c = ceniza.getContext("2d")!;
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.clearRect(0, 0, ceniza.width, ceniza.height);
      } else if (mesDibujado === n - 1 && k === n) {
        dibujar(n + ESTELA);
        if (textoMes.current) textoMes.current.textContent = "2002 a 2024";
        if (textoCuenta.current) textoCuenta.current.textContent = `${entero(datos.total)} focos`;
      }
      raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [datos, animar]);

  return (
    <figure className={estilos.figura}>
      <div className={estilos.marco}>
        <canvas
          ref={lienzo}
          className={estilos.lienzo}
          role="img"
          aria-label="Mapa de San Luis con sus nueve departamentos. Los focos de calor detectados por satélite aparecen mes a mes desde enero de 2002 hasta octubre de 2024 y dejan una marca acumulada."
        />
        {!datos && !error && <p className={estilos.estado}>Cargando 22 años de focos…</p>}
        {error && (
          <p className={estilos.estado}>
            No se pudieron cargar los focos. Recargá la página para intentar de nuevo.
          </p>
        )}
        <div className={estilos.lectura} aria-hidden="true">
          <span ref={textoMes} className={estilos.mes}>
            {" "}
          </span>
          <span ref={textoCuenta} className={estilos.cuenta}>
            {" "}
          </span>
        </div>
      </div>
      <div className={estilos.pie}>
        <canvas ref={tira} className={estilos.tira} aria-hidden="true" />
        <div className={estilos.ejes} aria-hidden="true">
          <span>2002</span>
          <span>2013</span>
          <span>2024</span>
        </div>
        <div className={estilos.controles}>
          <figcaption className="nota">Cada barra es un mes: altura según la cantidad de focos.</figcaption>
          {animar ? (
            <button type="button" className="boton" onClick={() => setPausado((p) => !p)} aria-pressed={pausado}>
              {pausado ? "Reanudar" : "Pausar"}
            </button>
          ) : (
            <button type="button" className="boton" onClick={() => setActiva(true)}>
              Reproducir animación
            </button>
          )}
        </div>
      </div>
    </figure>
  );
}
