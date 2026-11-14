// CSV estandar (coma como separador, punto decimal) con BOM para que Excel lea las tildes

export type Celda = string | number | null | undefined;

function escapar(v: Celda): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function aCsv(filas: Celda[][]): string {
  return "﻿" + filas.map((f) => f.map(escapar).join(",")).join("\r\n") + "\r\n";
}

export function descargar(nombre: string, contenido: BlobPart, tipo: string): void {
  const url = URL.createObjectURL(new Blob([contenido], { type: tipo }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
