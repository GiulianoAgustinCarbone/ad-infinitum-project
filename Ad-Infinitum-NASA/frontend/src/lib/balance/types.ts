export type MonthlyClimate = {
  year: number;
  month: number;
  p: number | null;
  etp: number | null;
  etr: number | null;
  days?: { p: number; etp: number; etr: number };
  status?: "estimated" | "observed" | "missing";
  pLow?: number;
  pHigh?: number;
  etpLow?: number;
  etpHigh?: number;
};

export type AnnualClimate = {
  year: number;
  p: number;
  etp: number;
  ia: number | null;
  iaLow?: number;
  iaHigh?: number;
  months?: number;
};

export type DamClimate = {
  id: string;
  name: string;
  sourceName: string;
  coordinates: [number, number];
  powerCoordinates: [number, number];
  monthly: MonthlyClimate[];
  annual: AnnualClimate[];
  partialAnnual: AnnualClimate & { through: string };
  forecast: MonthlyClimate[];
  forecastAnnual: AnnualClimate[];
  models: {
    p: { method: string; mae: number; baselineMae: number };
    etp: { method: string; mae: number; baselineMae: number };
  };
};

export type ClimateData = {
  source: string;
  sourceUrl: string;
  attribution: string;
  downloaded: string;
  start: string;
  observed: {
    trainingStart: string;
    displayedStart: string;
    lastCommonCompleteMonth: string;
    note: string;
  };
  projection: {
    start: string;
    end: string;
    status: string;
    model: string;
    uncertainty: string;
    limitation: string;
  };
  resolution: string;
  parameters: {
    precipitation: { id: string; units: string; aggregation: string };
    actualEvapotranspirationContext: { id: string; units: string; aggregation: string };
    referenceEvapotranspiration: { id: string; units: string; sourceVariables: string[]; aggregation: string };
  };
  note: string;
  dams: DamClimate[];
};
