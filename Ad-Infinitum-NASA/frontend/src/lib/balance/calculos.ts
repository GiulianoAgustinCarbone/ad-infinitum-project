import { analizarTendencia } from "@/lib/estadistica";
import type { AnnualClimate, DamClimate, MonthlyClimate } from "./types";

export const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export function rowsForYear(dam: DamClimate, year: number): MonthlyClimate[] {
  const observed = dam.monthly.filter((row) => row.year === year);
  const estimated = dam.forecast.filter((row) => row.year === year);
  return Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const actual = observed.find((row) => row.month === month);
    if (actual) return { ...actual, status: "observed" as const };
    return estimated.find((row) => row.month === month)
      ?? { year, month, p: null, etp: null, etr: null, status: "missing" as const };
  });
}

export function annualRows(dam: DamClimate): (AnnualClimate & { status: "observed" | "partial" | "estimated" })[] {
  return [
    ...dam.annual.filter((row) => row.year >= 2016 && row.year <= 2025)
      .map((row) => ({ ...row, status: "observed" as const })),
    { ...dam.partialAnnual, status: "partial" as const },
    ...dam.forecastAnnual.map((row) => ({ ...row, status: "estimated" as const })),
  ];
}

export function trendForDam(dam: DamClimate) {
  const rows = dam.annual.filter((row) => row.year >= 2002 && row.year <= 2025 && row.ia !== null);
  return analizarTendencia(rows.map((row) => row.year), rows.map((row) => row.ia!));
}

export function aridityClass(index: number): string {
  if (index < 0.05) return "Hyper-arid";
  if (index < 0.2) return "Arid";
  if (index < 0.5) return "Semi-arid";
  if (index < 0.65) return "Dry sub-humid";
  return "Humid";
}

