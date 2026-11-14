"use client";

// Vista provisoria de la etapa 1: comprueba que la capa de datos responde.
// Se reemplaza por el mapa y los resultados en las etapas siguientes.

import { useEffect, useState } from "react";
import { datos, type Grilla, type Sector, type SerieSector } from "@/lib/data";

const SECTOR_PRUEBA: Sector = [-63.5, -29.5, -61, -27];

type Estado =
  | { tipo: "cargando" }
  | { tipo: "error"; mensaje: string }
  | { tipo: "listo"; grilla: Grilla; serie: SerieSector };

export function EstadoDatos() {
  const [estado, setEstado] = useState<Estado>({ tipo: "cargando" });

  useEffect(() => {
    let vigente = true;
    Promise.all([datos.getGrilla(), datos.getSerieSector(SECTOR_PRUEBA)])
      .then(([grilla, serie]) => vigente && setEstado({ tipo: "listo", grilla, serie }))
      .catch((e: unknown) =>
        vigente && setEstado({ tipo: "error", mensaje: e instanceof Error ? e.message : String(e) }),
      );
    return () => {
      vigente = false;
    };
  }, []);

  if (estado.tipo === "cargando") return <p role="status">Cargando datos…</p>;
  if (estado.tipo === "error") {
    return <p role="alert">No pudimos cargar los datos de la API: {estado.mensaje}</p>;
  }

  const { grilla, serie } = estado;
  return (
    <div>
      <p>
        Fuente: {datos.ilustrativo ? "datos ilustrativos generados en el navegador" : "backend"}.{" "}
        {grilla.features.length} celdas, años {serie.years[0]} a {serie.years.at(-1)}.
      </p>
      <table>
        <caption>Serie anual del sector de prueba (°C)</caption>
        <thead>
          <tr>
            <th scope="col">Año</th>
            <th scope="col">Temperatura media</th>
          </tr>
        </thead>
        <tbody>
          {serie.years.map((anio, i) => (
            <tr key={anio}>
              <td>{anio}</td>
              <td>{serie.values[i].toFixed(2).replace(".", ",")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
