"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fuenteFocos, type Departamentos, type Embalses } from "@/lib/data/focos";
import { CLASES_POTENCIA, SIN_DATO } from "@/lib/focos/escala";
import { NOMBRE_SATELITE, ORIGEN_CONAE } from "@/lib/focos/satelites";
import type { FocosCompactos } from "@/lib/focos/tipos";
import { capitalizar, decimal, entero, MESES, nombreMes } from "@/lib/formato";
import type { FiltroFocos, Lectura, Vista } from "./MapaFocos";
import estilos from "./Explorador.module.css";

const MapaFocos = dynamic(() => import("./MapaFocos"), {
  ssr: false,
  loading: () => <div className={estilos.mapaCargando}>Preparando el mapa…</div>,
});

const MS_POR_MES = 700;
type Datos = { focos: FocosCompactos; departamentos: Departamentos; embalses: Embalses };

function contar(f: FocosCompactos, filtro: FiltroFocos, indiceAqua: number): number {
  const c = f.columnas;
  let n = 0;
  for (let i = 0; i < f.n; i++) {
    if (filtro.anio !== null && c.anio[i] !== filtro.anio) continue;
    if (filtro.mes !== null && c.mes[i] !== filtro.mes) continue;
    if (filtro.depto !== null && c.depto[i] !== filtro.depto) continue;
    // La serie comparable de Aqua es solo la de CONAE: FIRMS tambien tiene Aqua, pero desde 2024 y sin esa tabla
    if (filtro.soloAqua && (c.sat[i] !== indiceAqua || (c.origen && c.origen[i] !== ORIGEN_CONAE))) continue;
    n++;
  }
  return n;
}

function describirPeriodo(anio: number | null, mes: number | null): string {
  if (anio === null && mes === null) return "de todo el registro";
  if (anio === null) return `de todos los meses de ${nombreMes(mes!)}`;
  if (mes === null) return `de ${anio}`;
  return `de ${nombreMes(mes)} de ${anio}`;
}

// inicial: mes y anio preseleccionados (por ejemplo desde un enlace de la pagina de inicio)
export function Explorador({ inicial }: { inicial?: { anio: number; mes: number } } = {}) {
  const [datos, setDatos] = useState<Datos | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [vista, setVista] = useState<Vista>("calor");
  const [soloAqua, setSoloAqua] = useState(false);
  const [depto, setDepto] = useState<number | null>(null);
  const [todosLosAnios, setTodosLosAnios] = useState(!inicial);
  const [momento, setMomento] = useState(inicial ?? { anio: 2009, mes: 0 });
  const { anio, mes } = momento;
  const setAnio = (a: number) => setMomento((p) => ({ ...p, anio: a }));
  const setMes = (m: number) => setMomento((p) => ({ ...p, mes: m }));
  const [quiereReproducir, setReproduciendo] = useState(false);
  const [lectura, setLectura] = useState<Lectura>(null);
  const seccion = useRef<HTMLDivElement>(null);

  const cargar = useCallback(() => {
    setError(null);
    Promise.all([fuenteFocos.getFocos(), fuenteFocos.getDepartamentos(), fuenteFocos.getEmbalses()])
      .then(([focos, departamentos, embalses]) => setDatos({ focos, departamentos, embalses }))
      .catch((e: Error) => setError(e.message));
  }, []);

  // Carga diferida: los datos se piden cuando el explorador se acerca a la pantalla
  useEffect(() => {
    const el = seccion.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (e) => {
        if (!e[0].isIntersecting) return;
        obs.disconnect();
        cargar();
      },
      { rootMargin: "400px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [cargar]);

  const rango = useMemo(() => {
    if (!datos) return { a0: 2002, a1: 2024, m1: 12 };
    const [a0] = datos.focos.fechaMin.split("-").map(Number);
    const [a1, m1] = datos.focos.fechaMax.split("-").map(Number);
    return { a0, a1, m1 };
  }, [datos]);

  const indiceAqua = datos?.focos.satelites.indexOf("AQUA") ?? 1;
  const filtro = useMemo<FiltroFocos>(
    () => ({ anio: todosLosAnios ? null : anio, mes: mes === 0 ? null : mes, depto, soloAqua }),
    [todosLosAnios, anio, mes, depto, soloAqua],
  );
  const cantidad = useMemo(() => (datos ? contar(datos.focos, filtro, indiceAqua) : 0), [datos, filtro, indiceAqua]);

  // Al llegar al ultimo mes con datos la reproduccion se detiene sola
  const enFinal = !todosLosAnios && anio === rango.a1 && mes >= rango.m1;
  const reproduciendo = quiereReproducir && !enFinal;

  // Reproducir: avanza mes a mes hasta el ultimo mes con datos
  useEffect(() => {
    if (!reproduciendo) return;
    const t = window.setInterval(() => {
      setMomento((p) => {
        const mesSig = p.mes >= 12 ? 1 : p.mes + 1;
        const anioSig = p.mes >= 12 ? p.anio + 1 : p.anio;
        if (anioSig > rango.a1 || (anioSig === rango.a1 && mesSig > rango.m1)) return p;
        return { anio: anioSig, mes: mesSig };
      });
    }, MS_POR_MES);
    return () => window.clearInterval(t);
  }, [reproduciendo, rango]);

  const alternarReproduccion = () => {
    if (reproduciendo) {
      setReproduciendo(false);
      return;
    }
    if (todosLosAnios || enFinal) setMomento({ anio: rango.a0, mes: 1 });
    else if (mes === 0) setMes(1);
    setTodosLosAnios(false);
    setReproduciendo(true);
  };

  const elegirDepto = useCallback((i: number | null) => setDepto((actual) => (actual === i ? null : i)), []);

  const textoLectura = (() => {
    if (!datos || !lectura) return null;
    if (lectura.tipo === "depto") {
      const i = datos.focos.departamentos.indexOf(lectura.nombre);
      const n = i >= 0 ? contar(datos.focos, { ...filtro, depto: i }, indiceAqua) : 0;
      return (
        <>
          <strong>{lectura.nombre}</strong>
          <span>
            {entero(n)} {n === 1 ? "foco" : "focos"} {describirPeriodo(filtro.anio, filtro.mes)}
          </span>
        </>
      );
    }
    const c = datos.focos.columnas;
    const i = lectura.indice;
    const sat = datos.focos.satelites[c.sat[i]];
    const pw = c.power[i];
    return (
      <>
        <strong>
          {c.dia[i]} de {nombreMes(c.mes[i])} de {c.anio[i]}
        </strong>
        <span>{datos.focos.departamentos[c.depto[i]]}</span>
        <span>
          Satélite {NOMBRE_SATELITE[sat] ?? sat} ({datos.focos.sensores[c.sat[i]]})
        </span>
        <span>Potencia: {pw === null ? "sin dato confiable" : `${decimal(pw, 1)} MW`}</span>
        {c.confianza[i] !== null && <span>Confianza de la detección: {c.confianza[i]} %</span>}
      </>
    );
  })();

  const periodo = describirPeriodo(filtro.anio, filtro.mes);
  const lugar = depto === null || !datos ? "en toda la provincia" : `en ${datos.focos.departamentos[depto]}`;

  return (
    <div ref={seccion} className={estilos.explorador}>
      <div className={estilos.zonaMapa}>
        {datos ? (
          <MapaFocos
            focos={datos.focos}
            departamentos={datos.departamentos}
            embalses={datos.embalses}
            filtro={filtro}
            vista={vista}
            cantidad={cantidad}
            indiceAqua={indiceAqua}
            onLectura={setLectura}
            onElegirDepto={elegirDepto}
          />
        ) : (
          <div className={estilos.mapaCargando}>
            {error ? (
              <>
                <p>No se pudieron cargar los focos: {error}</p>
                <button type="button" className="boton" onClick={cargar}>
                  Reintentar
                </button>
              </>
            ) : (
              "Cargando los focos de calor…"
            )}
          </div>
        )}
        <div className={estilos.lectura} aria-live="polite">
          {textoLectura ?? (
            <span className={estilos.ayuda}>Pasá el cursor o tocá un foco o un departamento para leer sus datos.</span>
          )}
        </div>
      </div>

      <div className={estilos.panel}>
        <p className={estilos.resultado} aria-live="polite">
          <span className={estilos.resultadoNumero}>{datos ? entero(cantidad) : "…"}</span>
          <span>
            {cantidad === 1 ? "foco" : "focos"} {periodo} {lugar}
            {soloAqua ? ", solo satélite Aqua" : ""}.
          </span>
        </p>

        <fieldset className={estilos.grupo}>
          <legend>Vista</legend>
          <div className={estilos.segmentado}>
            {(
              [
                ["puntos", "Puntos"],
                ["calor", "Mapa de calor"],
              ] as const
            ).map(([valor, texto]) => (
              <label key={valor}>
                <input type="radio" name="vista" value={valor} checked={vista === valor} onChange={() => setVista(valor)} />
                <span>{texto}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={estilos.grupo}>
          <legend>Período</legend>
          <label className={estilos.casilla}>
            <input
              type="checkbox"
              checked={todosLosAnios}
              onChange={(e) => {
                setReproduciendo(false);
                setTodosLosAnios(e.target.checked);
              }}
            />
            <span>Todos los años</span>
          </label>
          <label className={estilos.deslizador} data-inactivo={todosLosAnios}>
            <span>
              Año <output>{todosLosAnios ? `${rango.a0} a ${rango.a1}` : anio}</output>
            </span>
            <input
              type="range"
              min={rango.a0}
              max={rango.a1}
              step={1}
              value={anio}
              aria-valuetext={todosLosAnios ? "todos los años" : String(anio)}
              onChange={(e) => {
                setReproduciendo(false);
                setTodosLosAnios(false);
                setAnio(Number(e.target.value));
              }}
            />
          </label>
          <label className={estilos.deslizador}>
            <span>
              Mes <output>{mes === 0 ? "todo el año" : capitalizar(nombreMes(mes))}</output>
            </span>
            <input
              type="range"
              min={0}
              max={12}
              step={1}
              value={mes}
              aria-valuetext={mes === 0 ? "todo el año" : MESES[mes - 1]}
              onChange={(e) => {
                setReproduciendo(false);
                setMes(Number(e.target.value));
              }}
            />
          </label>
          <button type="button" className="boton" onClick={alternarReproduccion} aria-pressed={reproduciendo} disabled={!datos}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              {reproduciendo ? (
                <path d="M3 2h3v10H3zM8 2h3v10H8z" fill="currentColor" />
              ) : (
                <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
              )}
            </svg>
            {reproduciendo ? "Pausar" : "Reproducir mes a mes"}
          </button>
        </fieldset>

        <fieldset className={estilos.grupo}>
          <legend>Dónde y con qué satélites</legend>
          <label className={estilos.selector}>
            <span>Departamento</span>
            <select
              value={depto ?? ""}
              onChange={(e) => setDepto(e.target.value === "" ? null : Number(e.target.value))}
              disabled={!datos}
            >
              <option value="">Toda la provincia</option>
              {datos?.focos.departamentos
                .map((nombre, i) => ({ nombre, i }))
                .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
                .map(({ nombre, i }) => (
                  <option key={nombre} value={i}>
                    {nombre}
                  </option>
                ))}
            </select>
          </label>
          <label className={estilos.casilla}>
            <input type="checkbox" checked={soloAqua} onChange={(e) => setSoloAqua(e.target.checked)} />
            <span>Solo satélite Aqua de CONAE</span>
          </label>
        </fieldset>

        <div className={estilos.leyenda}>
          {vista === "puntos" ? (
            <>
              <p className={estilos.leyendaTitulo}>Potencia del foco (energía que emite, en megavatios)</p>
              <ul>
                {CLASES_POTENCIA.map((c) => (
                  <li key={c.etiqueta}>
                    <span className={estilos.muestra} style={{ background: c.color }} />
                    {c.etiqueta}
                  </li>
                ))}
                <li>
                  <span className={estilos.muestra} style={{ background: SIN_DATO }} />
                  sin dato confiable
                </li>
                <li>
                  <span className={estilos.muestraAgua} />
                  embalse
                </li>
              </ul>
            </>
          ) : (
            <>
              <p className={estilos.leyendaTitulo}>Concentración de focos, ponderada por su potencia</p>
              <div className={estilos.gradiente} />
              <div className={estilos.gradienteEjes}>
                <span>menor</span>
                <span>mayor</span>
              </div>
              <p className="nota">
                Muestra dónde se agrupan los focos, no la superficie quemada. Los focos sin potencia confiable pesan
                como uno de 30 MW.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
