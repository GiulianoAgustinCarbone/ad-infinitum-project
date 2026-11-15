"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { EstadoDato } from "@/components/sitio/EstadoDato";
import { aridityClass, annualRows, MONTHS_EN, rowsForYear, trendForDam } from "@/lib/balance/calculos";
import type { ClimateData, DamClimate, MonthlyClimate } from "@/lib/balance/types";
import { entero } from "@/lib/formato";
import { AridityChart, MonthlyComparison } from "./GraficosBalance";
import estilos from "./Balance.module.css";

const MapaBalance = dynamic(() => import("./MapaBalance").then((module) => module.MapaBalance), {
  ssr: false,
  loading: () => <div className={estilos.mapMessage}>Loading the San Luis map…</div>,
});

const YEARS = Array.from({ length: 16 }, (_, index) => 2016 + index);
const formatNumber = (value: number, digits = 1) => new Intl.NumberFormat("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
const formatMonth = (value: string) => {
  const [year, month] = value.split("-").map(Number);
  return `${MONTHS_EN[month - 1]} ${year}`;
};

function monthlyStateText(row: MonthlyClimate | undefined, year: number): string {
  if (!row || row.p == null || row.etp == null) return "No complete monthly data for this selection.";
  const balance = row.p - row.etp;
  if (year >= 2027) return balance > 0
    ? "Estimated precipitation is above estimated potential evapotranspiration. This is a climate indicator, not reservoir storage."
    : "Estimated potential evapotranspiration is above estimated precipitation. This is a climate indicator, not reservoir storage.";
  if (balance > 0) return "Precipitation is above potential evapotranspiration: a potential climatic surplus. It does not measure water stored in the reservoir.";
  if (row.etr != null && row.etp > row.p && row.etp > row.etr) return "Potential evapotranspiration exceeds both precipitation and actual evapotranspiration: a climatic deficit signal.";
  if (row.etr != null && row.etr > row.p) return "Actual evapotranspiration exceeds precipitation. This may draw on prior soil water; it does not prove reservoir storage.";
  return "Potential evapotranspiration is above precipitation: a climatic deficit indicator.";
}

function annualMetric(dam: DamClimate, year: number) {
  if (year === dam.partialAnnual.year) return { index: dam.partialAnnual.ia, label: `Partial · Jan–${formatMonth(dam.partialAnnual.through).split(" ")[0]}, not a full-year class` };
  if (year >= 2027) {
    const row = dam.forecastAnnual.find((item) => item.year === year);
    return { index: row?.ia ?? null, label: row?.ia == null ? "No estimate" : `Estimated annual · ${aridityClass(row.ia)}` };
  }
  const row = dam.annual.find((item) => item.year === year);
  return { index: row?.ia ?? null, label: row?.ia == null ? "No complete annual value" : `Observed annual · ${aridityClass(row.ia)}` };
}

export function WaterBalanceDashboard() {
  const [data, setData] = useState<ClimateData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/climate/water-balance.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Climate data could not be loaded (HTTP ${response.status}).`);
        return response.json() as Promise<ClimateData>;
      })
      .then((loaded) => {
        setData(loaded);
        setSelectedId(loaded.dams[0]?.id ?? "");
        setLoading(false);
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(cause instanceof Error ? cause.message : "Climate data could not be loaded.");
        setLoading(false);
      });
    return () => controller.abort();
  }, []);

  const dam = data?.dams.find((item) => item.id === selectedId) ?? data?.dams[0];
  const monthly = useMemo(() => dam ? rowsForYear(dam, year) : [], [dam, year]);
  const annual = useMemo(() => dam ? annualRows(dam) : [], [dam]);
  const trend = useMemo(() => dam ? trendForDam(dam) : null, [dam]);
  const selectedMonth = monthly[month - 1];
  const partialCut = data?.observed.lastCommonCompleteMonth;
  const ia = dam ? annualMetric(dam, year) : null;
  const balance = selectedMonth?.p != null && selectedMonth.etp != null ? selectedMonth.p - selectedMonth.etp : null;
  const displayedThrough = data?.observed.lastCommonCompleteMonth ? formatMonth(data.observed.lastCommonCompleteMonth) : "";

  return (
    <>
      <header className={`contenedor ${estilos.pageHead}`}>
        <div className={estilos.eyebrow}>
          <EstadoDato estado="real" language="en" />
          <span>Modeled estimates are labeled separately</span>
        </div>
        <h1 className={estilos.pageTitle}>A climate water balance around San Luis reservoirs</h1>
        <p className={estilos.pageLead}>
          Compare precipitation with potential and actual evapotranspiration near each dam. Explore observed monthly conditions and a clearly labeled statistical estimate through 2031.
        </p>
        {data && <p className={estilos.periodNote}>
          Observed monthly record: January 2016–{displayedThrough}. Annual trend calculations use complete years from 2002 to 2025. Estimates: 2027–2031.
        </p>}
      </header>

      <section className="seccion seccion-alterna" aria-labelledby="water-explorer-title">
        <div className="contenedor">
          <div className={estilos.controls} aria-label="Climate data filters">
            <div className={estilos.control}>
              <label htmlFor="balance-year">Year</label>
              <select id="balance-year" value={year} onChange={(event) => setYear(Number(event.target.value))}>
                {YEARS.map((value) => <option key={value} value={value}>{value}{value === 2026 ? " · partial" : value >= 2027 ? " · estimate" : ""}</option>)}
              </select>
            </div>
            <div className={estilos.control}>
              <label htmlFor="balance-month">Month</label>
              <select id="balance-month" value={month} onChange={(event) => setMonth(Number(event.target.value))}>
                {MONTHS_EN.map((value, index) => <option key={value} value={index + 1}>{value}</option>)}
              </select>
            </div>
            <p className={estilos.stateLabel} aria-live="polite">
              {year >= 2027 ? "Statistical estimate · not an observed future" : year === 2026 ? `Observed through ${formatMonth(partialCut ?? "2026-08")}` : "Observed NASA POWER data"}
            </p>
          </div>

          {loading && <div className={estilos.error} role="status">Loading the climate series…</div>}
          {error && <div className={estilos.error} role="alert">{error}</div>}

          {data && dam && <>
            <div className={estilos.mapGrid}>
              <section className={estilos.mapPanel} aria-labelledby="water-explorer-title">
                <div className={estilos.panelHeading}>
                  <div><h2 id="water-explorer-title">Dams and reservoirs in San Luis</h2><p>Select a reservoir on the map or from the list.</p></div>
                  <span className={estilos.locationCount}>{entero(data.dams.length)} locations</span>
                </div>
                <MapaBalance dams={data.dams} selectedId={dam.id} onSelect={setSelectedId} />
              </section>
              <aside className={estilos.listPanel} aria-label="Select a dam">
                <div className={estilos.panelHeading}><div><h3>Choose a dam</h3><p>Climate cell nearest to its reservoir outline</p></div></div>
                <div className={estilos.damList}>
                  {data.dams.map((item, index) => <button key={item.id} type="button" className={estilos.damButton} aria-pressed={item.id === dam.id} onClick={() => setSelectedId(item.id)}>
                    <span className={estilos.damNumber}>{index + 1}</span><span>{item.name}</span>
                  </button>)}
                </div>
                <div className={estilos.selectedDam}>
                  <p>Selected reservoir</p><h3>{dam.name}</h3>
                  <p className={estilos.coordinates}>Nearest NASA POWER point · {Math.abs(dam.powerCoordinates[1]).toFixed(2)}° S, {Math.abs(dam.powerCoordinates[0]).toFixed(2)}° W</p>
                </div>
              </aside>
            </div>

            <section className={estilos.dashboardSection} aria-labelledby="monthly-balance-title">
              <h2 className={estilos.sectionTitle} id="monthly-balance-title">Monthly climate balance</h2>
              <p className={estilos.sectionIntro}>{dam.name} · {MONTHS_EN[month - 1]} {year}. Positive P − ETP is a potential climatic surplus, not a reservoir measurement.</p>
              <div className={estilos.metrics}>
                <article className={`${estilos.metric} ${estilos.metricRain}`}><p className={estilos.metricLabel}>Precipitation · P</p><p className={estilos.metricValue}>{selectedMonth?.p == null ? "No data" : formatNumber(selectedMonth.p)}</p><p className={estilos.metricUnit}>mm / month · IMERG</p></article>
                <article className={`${estilos.metric} ${estilos.metricEtp}`}><p className={estilos.metricLabel}>Potential evapotranspiration · ETP</p><p className={estilos.metricValue}>{selectedMonth?.etp == null ? "No data" : formatNumber(selectedMonth.etp)}</p><p className={estilos.metricUnit}>mm / month · Hargreaves–Samani estimate</p></article>
                <article className={`${estilos.metric} ${estilos.metricBalance}`}><p className={estilos.metricLabel}>P − ETP</p><p className={estilos.metricValue}>{balance == null ? "No data" : `${balance > 0 ? "+" : ""}${formatNumber(balance)}`}</p><p className={estilos.metricUnit}>mm · approximate climate indicator</p></article>
                <article className={`${estilos.metric} ${estilos.metricEtr}`}><p className={estilos.metricLabel}>Actual evapotranspiration · ETR</p><p className={estilos.metricValue}>{year >= 2027 ? "Not projected" : selectedMonth?.etr == null ? "No data" : formatNumber(selectedMonth.etr)}</p><p className={estilos.metricUnit}>mm / month · EVLAND, observed only</p></article>
                <article className={`${estilos.metric} ${estilos.metricIa}`}><p className={estilos.metricLabel}>Aridity index · IA</p><p className={estilos.metricValue}>{ia?.index == null ? "No data" : formatNumber(ia.index, 2)}</p><p className={estilos.metricUnit}>{ia?.label}</p></article>
              </div>
              <p className={estilos.interpretation} aria-live="polite"><strong>{dam.name} · {MONTHS_EN[month - 1]} {year}: </strong>{monthlyStateText(selectedMonth, year)}</p>

              <div className={estilos.charts}>
                <article className={estilos.chartPanel}>
                  <h3>Precipitation and evapotranspiration</h3>
                  <p className={estilos.chartIntro}>Monthly totals in millimeters. Dashed lines indicate estimates.</p>
                  <MonthlyComparison rows={monthly} selectedMonth={month} year={year} />
                  <div className={estilos.chartLegend}>
                    <span><i className={estilos.zoneReserve} />Potential reserve signal · P &gt; ETP</span>
                    <span><i className={estilos.zoneDeficit} />Climatic deficit · ETP exceeds P and ETR</span>
                    <span><i className={estilos.zoneStorage} />Potential storage signal · ETR &gt; P</span>
                  </div>
                  <p className={estilos.chartIntro}>These hatched zones describe relationships between climate variables. They do not measure water stored in a reservoir; ETR can draw on water from earlier periods.</p>
                </article>
                <article className={estilos.chartPanel}>
                  <h3>Aridity index over time</h3>
                  <p className={estilos.chartIntro}>IA = annual P / annual ETP · lower values indicate greater aridity.</p>
                  {trend && <AridityChart rows={annual} trend={trend} selectedYear={year} />}
                  {trend && <p className={estilos.trendNote}>
                    Sen slope (observations 2002–2025): <strong>{trend.senAnual > 0 ? "+" : ""}{formatNumber(trend.senAnual, 3)} IA/year</strong>. Mann–Kendall: <strong>{trend.significativa ? "significant" : "not conclusive"}</strong> (p = {formatNumber(trend.p, 3)}). Future estimates are excluded from this test.
                  </p>}
                </article>
              </div>
            </section>
          </>}
        </div>
      </section>

      {data && <section className={estilos.methodSection} aria-labelledby="water-method-title">
        <div className="contenedor">
          <h2 className={estilos.sectionTitle} id="water-method-title">How to read this estimate</h2>
          <p className={estilos.sectionIntro}>Climate at the nearest grid cell, not water level or storage inside the dam.</p>
          <div className={estilos.methodGrid}>
            <article className={estilos.methodCard}><h3>Precipitation · P</h3><p>NASA POWER IMERG_PRECTOT daily precipitation is summed by month.</p></article>
            <article className={estilos.methodCard}><h3>Potential evapotranspiration · ETP</h3><p>Calculated with Hargreaves–Samani from daily maximum and minimum temperature, latitude, and extraterrestrial radiation.</p></article>
            <article className={estilos.methodCard}><h3>Actual evapotranspiration · ETR</h3><p>NASA POWER EVLAND is shown as context. It is observed only and is not part of P − ETP or the future estimates.</p></article>
          </div>
          <p className={estilos.notice}><strong>About 2027–2031:</strong> NASA POWER’s projection endpoint returned fill values (−999) for the San Luis cells during validation. These estimates instead use the monthly seasonal average selected by retrospective five-year validation. Their shaded band describes historical validation variability, not a guaranteed confidence interval. They are not official NASA climate scenarios or observed future values.</p>
          <p className={estilos.notice}><strong>Spatial and water-storage limits:</strong> each series uses the nearest NASA POWER cell to a reservoir outline centroid. The climate grid is coarse (roughly 0.5° × 0.625°). The P − ETP balance is an approximate climate indicator, not a measurement of reservoir level, volume, inflow, or stored water.</p>
          <p className={estilos.sourceLine}>Climate data: <a href={data.sourceUrl} target="_blank" rel="noreferrer">NASA POWER</a>, downloaded {new Date(`${data.downloaded}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}. Reservoir outlines: CONAE / Government of San Luis.</p>
        </div>
      </section>}
    </>
  );
}
