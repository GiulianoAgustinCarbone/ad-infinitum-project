// Formatos de los archivos generados por backend/scripts/descargar_datos.mjs

export type ColumnasFocos = {
  lon: number[];
  lat: number[];
  anio: number[];
  mes: number[];
  dia: number[];
  // FP_Power en MW; null = no informado o no confiable en la fuente
  power: (number | null)[];
  confianza: (number | null)[];
  // Indice en FocosCompactos.departamentos
  depto: number[];
  // Indice en FocosCompactos.satelites (-1 = desconocido)
  sat: number[];
};

export type FocosCompactos = {
  fuente: string;
  descargado: string;
  n: number;
  fechaMin: string;
  fechaMax: string;
  departamentos: string[];
  satelites: string[];
  sensores: string[];
  notas: string[];
  columnas: ColumnasFocos;
};

// Conteos mensuales por departamento (coinciden con los focos del satelite AQUA).
// null = mes sin dato: nunca se trata como cero.
export type SerieMensualDeptos = {
  meses: string[];
  mesesFaltantes: string[];
  departamentos: { nombre: string; conteos: (number | null)[] }[];
};

export type EstadoCelda = "dato" | "sin-dato" | "fuera";

export type CeldaMatriz = { anio: number; mes: number; valor: number | null; estado: EstadoCelda };

export type TendenciaResumen = {
  n: number;
  desde: number;
  hasta: number;
  pendienteAnual: number;
  ordenada: number;
  senAnual: number;
  ordenadaSen: number;
  p: number;
  significativa: boolean;
};

export type Resumen = {
  generado: string;
  descargado: string;
  fuente: string;
  todos: {
    total: number;
    fechaMin: string;
    fechaMax: string;
    porDepto: { nombre: string; total: number }[];
    porSatelite: { satelite: string; sensor: string; total: number; desde: number; hasta: number }[];
    porAnio: { anio: number; total: number }[];
    mesAnioPico: { anio: number; mes: number; total: number };
    anioPico: { anio: number; total: number };
    potenciaNoConfiable: number;
  };
  aqua: {
    desde: string;
    hasta: string;
    total: number;
    mesesFaltantes: string[];
    estacionalidad: { mes: number; promedio: number; anios: number; maximo: number; anioMaximo: number }[];
    matriz: CeldaMatriz[];
    ranking: { nombre: string; total: number }[];
    anual: { anio: number; total: number; mesesSinDato: number }[];
    tendencia: TendenciaResumen;
    tendenciaSinFaltantes: TendenciaResumen;
    mesPico: number;
    mesMinimo: number;
    trimestrePico: { meses: number[]; porcentaje: number };
  };
  hallazgos: { titulo: string; texto: string }[];
};
