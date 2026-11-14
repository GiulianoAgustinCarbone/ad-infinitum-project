// Numeros con coma decimal, como se escriben en espanol
export function fmt(x: number, decimales: number): string {
  return x.toFixed(decimales).replace(".", ",").replace(/^-/, "−");
}

// Con signo explicito: +0,4 o −0,4
export function fmtSigno(x: number, decimales: number): string {
  const redondeado = Number(x.toFixed(decimales));
  return (redondeado > 0 ? "+" : redondeado < 0 ? "−" : "") + fmt(Math.abs(x), decimales);
}

export function fmtLon(lon: number): string {
  return `${fmt(Math.abs(lon), 1)}° ${lon < 0 ? "O" : "E"}`;
}

export function fmtLat(lat: number): string {
  return `${fmt(Math.abs(lat), 1)}° ${lat < 0 ? "S" : "N"}`;
}
