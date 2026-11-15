"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EstadoDato } from "@/components/sitio/EstadoDato";
import { aridityClass, annualRows, MONTHS_EN, rowsForYear, trendForDam } from "@/lib/balance/calculos";
import type { ClimateData, DamClimate, MonthlyClimate } from "@/lib/balance/types";
import { entero } from "@/lib/formato";
import { AridityChart, MonthlyComparison } from "./GraficosBalance";
import estilos from "./Balance.module.css";

const MapaBalance = dynamic(() => import("./MapaBalance").then((module) => module.MapaBalance), {
  ssr: false,
  loading: () => <div className={estilos.mapFrame}><div className={estilos.mapMessage} data-balance-reveal>Loading the San Luis map…</div></div>,
});

const YEARS = Array.from({ length: 16 }, (_, index) => 2016 + index);
const formatNumber = (value: number, digits = 1) => new Intl.NumberFormat("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
const formatMonth = (value: string) => {
  const [year, month] = value.split("-").map(Number);
  return `${MONTHS_EN[month - 1]} ${year}`;
};

function monthlyStateText(row: MonthlyClimate | undefined, year: number): string {
  if (!row || row.p == null || row.etp == null) return "A complete monthly record is not available for this selection.";
  const balance = row.p - row.etp;
  if (year >= 2027) return balance > 0
    ? "Estimated rainfall exceeds estimated potential evapotranspiration, indicating a possible climatic surplus. This does not measure water stored in the reservoir."
    : "Estimated potential evapotranspiration exceeds estimated rainfall, indicating a possible climatic deficit. This is not a reservoir measurement.";
  if (balance > 0) return "Rainfall exceeds potential evapotranspiration, indicating a possible climatic surplus. This does not measure water stored in the reservoir.";
  if (row.etr != null && row.etp > row.p && row.etp > row.etr) return "Potential evapotranspiration exceeds both rainfall and actual evapotranspiration, a climatic deficit signal.";
  if (row.etr != null && row.etr > row.p) return "Actual evapotranspiration exceeds rainfall. It may draw on soil water from earlier periods; it does not establish reservoir storage.";
  return "Potential evapotranspiration exceeds rainfall, indicating a climatic deficit signal.";
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
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-balance-intro]", { autoAlpha: 0, y: 22 }, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.12,
        delay: 0.3,
      });
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    if (!data) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-balance-reveal]").forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 24 }, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    });
    return () => media.revert();
  }, [data]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/climate/water-balance.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Climate records could not be loaded (HTTP ${response.status}).`);
        return response.json() as Promise<ClimateData>;
      })
      .then((loaded) => {
        setData(loaded);
        setSelectedId(loaded.dams[0]?.id ?? "");
        setLoading(false);
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(cause instanceof Error ? cause.message : "Climate records could not be loaded.");
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
        <div className={estilos.eyebrow} data-balance-intro>
          <EstadoDato estado="real" language="en" />
          <span>Observed records and statistical estimates are shown separately</span>
        </div>
        <h1 className={estilos.pageTitle} data-balance-intro>How is the water balance changing near San Luis dams?</h1>
        <p className={estilos.pageLead} data-balance-intro>
          Compare observed climate records and aridity trends across reservoir locations. Use these indicators for technical assessment and academic research; they do not issue alerts or measure water stored in dams.
        </p>
        {data && <p className={estilos.periodNote} data-balance-intro>
          Monthly observations: January 2016–{displayedThrough}. Trend analysis: complete annual records from 2002–2025. Statistical estimates: 2027–2031.
        </p>}
      </header>

      <section className={`seccion seccion-alterna ${estilos.explorerSection}`} aria-labelledby="water-explorer-title">
        <div className="contenedor">
          <div className={estilos.controls} aria-label="Climate record filters" data-balance-reveal>
            <div className={estilos.control}>
              <label htmlFor="balance-year">Analysis year</label>
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
              {year >= 2027 ? "Statistical estimate · not an observed future" : year === 2026 ? `Observed through ${formatMonth(partialCut ?? "2026-08")}` : "Observed NASA POWER record"}
            </p>
          </div>

          {loading && <div className={estilos.error} role="status">Loading climate records…</div>}
          {error && <div className={estilos.error} role="alert">{error}</div>}

          {data && dam && <>
            <div className={estilos.mapGrid} data-balance-reveal>
              <section className={estilos.mapPanel} aria-labelledby="water-explorer-title">
                <div className={estilos.panelHeading}>
                  <div><h2 id="water-explorer-title">Compare climate conditions near San Luis reservoirs</h2><p>Select a reservoir to inspect its nearest NASA POWER climate cell.</p></div>
                  <span className={estilos.locationCount}>{entero(data.dams.length)} locations</span>
                </div>
                <MapaBalance dams={data.dams} selectedId={dam.id} onSelect={setSelectedId} />
              </section>
              <aside className={estilos.listPanel} aria-label="Select a reservoir location">
                <div className={estilos.panelHeading}><div><h3>Select a reservoir</h3><p>Each location is paired with its nearest climate grid cell.</p></div></div>
                <div className={estilos.damList}>
                  {data.dams.map((item, index) => <button key={item.id} type="button" className={estilos.damButton} aria-pressed={item.id === dam.id} onClick={() => setSelectedId(item.id)}>
                    <span className={estilos.damNumber}>{index + 1}</span><span>{item.name}</span>
                  </button>)}
                </div>
                <div className={estilos.selectedDam}>
                  <p>Selected study location</p><h3>{dam.name}</h3>
                  <p className={estilos.coordinates}>Nearest NASA POWER grid point · {Math.abs(dam.powerCoordinates[1]).toFixed(2)}° S, {Math.abs(dam.powerCoordinates[0]).toFixed(2)}° W</p>
                </div>
              </aside>
            </div>

            <section className={estilos.dashboardSection} aria-labelledby="monthly-balance-title">
              <h2 className={estilos.sectionTitle} id="monthly-balance-title">Monthly climate indicators</h2>
              <p className={estilos.sectionIntro}>{dam.name} · {MONTHS_EN[month - 1]} {year}. P − ETP is an approximate climate signal, not a measurement of reservoir level or stored water.</p>
              <div className={estilos.metrics}>
                <article className={`${estilos.metric} ${estilos.metricRain}`} data-balance-reveal><p className={estilos.metricLabel}>Precipitation · P</p><p className={estilos.metricValue}>{selectedMonth?.p == null ? "No data" : formatNumber(selectedMonth.p)}</p><p className={estilos.metricUnit}>mm / month · IMERG</p></article>
                <article className={`${estilos.metric} ${estilos.metricEtp}`} data-balance-reveal><p className={estilos.metricLabel}>Potential evapotranspiration · ETP</p><p className={estilos.metricValue}>{selectedMonth?.etp == null ? "No data" : formatNumber(selectedMonth.etp)}</p><p className={estilos.metricUnit}>mm / month · Hargreaves–Samani estimate</p></article>
                <article className={`${estilos.metric} ${estilos.metricBalance}`} data-balance-reveal><p className={estilos.metricLabel}>P − ETP</p><p className={estilos.metricValue}>{balance == null ? "No data" : `${balance > 0 ? "+" : ""}${formatNumber(balance)}`}</p><p className={estilos.metricUnit}>mm · approximate climate indicator</p></article>
                <article className={`${estilos.metric} ${estilos.metricEtr}`} data-balance-reveal><p className={estilos.metricLabel}>Actual evapotranspiration · ETR</p><p className={estilos.metricValue}>{year >= 2027 ? "Not projected" : selectedMonth?.etr == null ? "No data" : formatNumber(selectedMonth.etr)}</p><p className={estilos.metricUnit}>mm / month · EVLAND, observed only</p></article>
                <article className={`${estilos.metric} ${estilos.metricIa}`} data-balance-reveal><p className={estilos.metricLabel}>Aridity index · IA</p><p className={estilos.metricValue}>{ia?.index == null ? "No data" : formatNumber(ia.index, 2)}</p><p className={estilos.metricUnit}>{ia?.label}</p></article>
              </div>
              <p className={estilos.interpretation} aria-live="polite" data-balance-reveal><strong>{dam.name} · {MONTHS_EN[month - 1]} {year}: </strong>{monthlyStateText(selectedMonth, year)}</p>

              <div className={estilos.charts}>
                <article className={estilos.chartPanel} data-balance-reveal>
                  <h3>Monthly rainfall and evapotranspiration</h3>
                  <p className={estilos.chartIntro}>Monthly totals (mm). Solid lines show observed records; dashed lines show statistical estimates.</p>
                  <MonthlyComparison rows={monthly} selectedMonth={month} year={year} />
                  <div className={estilos.chartLegend}>
                    <span><i className={estilos.zoneReserve} />Potential climate surplus · P &gt; ETP</span>
                    <span><i className={estilos.zoneDeficit} />Potential climate deficit · ETP &gt; P and ETR</span>
                    <span><i className={estilos.zoneStorage} />ETR &gt; rainfall · may draw on soil water</span>
                  </div>
                  <p className={estilos.chartIntro}>Hatched zones show relationships between climate variables, not water stored in a reservoir. ETR may reflect water from earlier periods.</p>
                </article>
                <article className={estilos.chartPanel} data-balance-reveal>
                  <h3>Annual aridity index and trend</h3>
                  <p className={estilos.chartIntro}>IA = annual P / annual ETP. Lower values indicate greater aridity.</p>
                  {trend && <AridityChart rows={annual} trend={trend} selectedYear={year} />}
                  {trend && <p className={estilos.trendNote}>
                    Sen slope (complete observations, 2002–2025): <strong>{trend.senAnual > 0 ? "+" : ""}{formatNumber(trend.senAnual, 3)} IA/year</strong>. Mann–Kendall: <strong>{trend.significativa ? "significant" : "not conclusive"}</strong> (p = {formatNumber(trend.p, 3)}). Estimates are excluded from the significance test.
                  </p>}
                </article>
              </div>
            </section>
          </>}
        </div>
      </section>

      {data && <section className={estilos.methodSection} aria-labelledby="water-method-title">
        <div className="contenedor">
          <h2 className={estilos.sectionTitle} id="water-method-title" data-balance-reveal>Data, calculations, and limits</h2>
          <p className={estilos.sectionIntro} data-balance-reveal>These records describe climate near each reservoir, not conditions or water storage inside it.</p>
          <div className={estilos.methodGrid}>
            <article className={estilos.methodCard} data-balance-reveal><h3>Rainfall (precipitation) · P</h3><p>NASA POWER IMERG_PRECTOT daily values are summed into monthly rainfall totals.</p></article>
            <article className={estilos.methodCard} data-balance-reveal><h3>Potential evapotranspiration · ETP</h3><p>Estimated with Hargreaves–Samani from daily maximum and minimum temperature, site latitude, and extraterrestrial radiation.</p></article>
            <article className={estilos.methodCard} data-balance-reveal><h3>Actual evapotranspiration · ETR</h3><p>NASA POWER EVLAND is included as context. It is observed only and is not used in P − ETP or in the estimates.</p></article>
          </div>
          <p className={estilos.notice} data-balance-reveal><strong>2027–2031 statistical estimates:</strong> NASA POWER’s projection endpoint returned fill values (−999) for the San Luis cells during validation. The displayed estimates use monthly seasonal averages selected through retrospective five-year validation. The shaded band shows variability found in that validation; it is not a guaranteed confidence interval. These are not official NASA scenarios or observed future values.</p>
          <p className={estilos.notice} data-balance-reveal><strong>Spatial and operational limits:</strong> each series uses the NASA POWER grid cell nearest to the reservoir-outline centroid. The grid is coarse (roughly 0.5° × 0.625°) and does not resolve local conditions around a dam. P − ETP is an approximate climate indicator, not a measurement of reservoir level, volume, inflow, or stored water; it should not be used as an alert by itself.</p>
          <p className={estilos.sourceLine} data-balance-reveal>Climate data: <a href={data.sourceUrl} target="_blank" rel="noreferrer">NASA POWER</a>, downloaded {new Date(`${data.downloaded}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}. Reservoir outlines: CONAE / Government of San Luis.</p>
        </div>
      </section>}
    </>
  );
}
