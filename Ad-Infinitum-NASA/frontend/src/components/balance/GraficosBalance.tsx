"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useId, useRef } from "react";
import { MONTHS_EN } from "@/lib/balance/calculos";
import type { AnnualClimate, MonthlyClimate } from "@/lib/balance/types";
import type { Tendencia } from "@/lib/estadistica";
import estilos from "./Balance.module.css";

const COLORS = { rain: "#75c58c", etp: "#a195e6", etr: "#efa06a", observed: "#60c4c2", estimate: "#f8b44e", sen: "#ece8df" };
const WIDTH = 800;
const HEIGHT = 360;
const PAD = { left: 56, right: 16, top: 30, bottom: 46 };

function useRevealOnScroll() {
  const graphRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const graph = graphRef.current;
      if (!graph) return;
      gsap.fromTo(graph,
        { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          autoAlpha: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: graph, start: "top 65%", once: true },
        },
      );
    });
    return () => media.revert();
  }, []);

  return graphRef;
}

function lineSegments(rows: MonthlyClimate[], key: "p" | "etp" | "etr", x: (index: number) => number, y: (value: number) => number) {
  const segments: { path: string; estimated: boolean }[] = [];
  let points: string[] = [];
  let estimated = false;
  const finish = () => {
    if (points.length > 1) segments.push({ path: points.join(" "), estimated });
    points = [];
  };
  rows.forEach((row, index) => {
    const value = row[key];
    if (value == null) {
      finish();
      return;
    }
    if (points.length && (row.status === "estimated") !== estimated) finish();
    estimated = row.status === "estimated";
    points.push(`${points.length ? "L" : "M"} ${x(index)} ${y(value)}`);
  });
  finish();
  return segments;
}

function comparisonZone(
  rows: MonthlyClimate[],
  index: number,
  x: (i: number) => number,
  y: (v: number) => number,
): { path: string; type: "reserve" | "deficit" | "storage" } | null {
  const a = rows[index];
  const b = rows[index + 1];
  if (!a || !b || a.p == null || b.p == null || a.etp == null || b.etp == null) return null;
  const meanP = (a.p + b.p) / 2;
  const meanEtp = (a.etp + b.etp) / 2;
  const meanEtr = a.etr == null || b.etr == null ? null : (a.etr + b.etr) / 2;
  let lower: "p" | "etp" | "etr";
  let upper: "p" | "etp" | "etr";
  let type: "reserve" | "deficit" | "storage";
  if (meanP > meanEtp) {
    lower = "etp"; upper = "p"; type = "reserve";
  } else if (meanEtr != null && meanEtp > meanP && meanEtp > meanEtr) {
    lower = meanP > meanEtr ? "etr" : "p"; upper = "etp"; type = "deficit";
  } else if (meanEtr != null && meanEtr > meanP) {
    lower = "p"; upper = "etr"; type = "storage";
  } else return null;
  const lowA = a[lower]; const lowB = b[lower]; const highA = a[upper]; const highB = b[upper];
  if (lowA == null || lowB == null || highA == null || highB == null) return null;
  return {
    type,
    path: `M ${x(index)} ${y(lowA)} L ${x(index + 1)} ${y(lowB)} L ${x(index + 1)} ${y(highB)} L ${x(index)} ${y(highA)} Z`,
  };
}

export function MonthlyComparison({ rows, selectedMonth, year }: { rows: MonthlyClimate[]; selectedMonth: number; year: number }) {
  const patternId = useId().replaceAll(":", "");
  const graphRef = useRevealOnScroll();
  const plotWidth = WIDTH - PAD.left - PAD.right;
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;
  const maximum = Math.max(40, Math.ceil(Math.max(...rows.flatMap((row) => [row.p ?? 0, row.etp ?? 0, row.etr ?? 0])) / 40) * 40);
  const x = (index: number) => PAD.left + (index / 11) * plotWidth;
  const y = (value: number) => PAD.top + plotHeight - (value / maximum) * plotHeight;
  const series = [
    { key: "etp" as const, label: "Potential evapotranspiration (ETP)", color: COLORS.etp },
    { key: "p" as const, label: "Rainfall (precipitation · P)", color: COLORS.rain },
    { key: "etr" as const, label: "Actual evapotranspiration (ETR)", color: COLORS.etr },
  ];
  return (
    <>
      <div className={estilos.chartScroll}>
        <svg ref={graphRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-labelledby="monthly-chart-title monthly-chart-desc" className={estilos.chartSvg}>
          <title id="monthly-chart-title">Monthly rainfall and evapotranspiration comparison for {year}</title>
          <desc id="monthly-chart-desc">Monthly rainfall, potential evapotranspiration, and actual evapotranspiration in millimeters. Solid lines show observed records; dashed lines show estimates. Hatched areas mark potential climate signals, not reservoir storage.</desc>
          <defs>
            <pattern id={`${patternId}-reserve`} width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#4d9bc322" /><path d="M 0 0 V 8" stroke="#76c9ee" strokeWidth="1.2" /></pattern>
            <pattern id={`${patternId}-deficit`} width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#e9787820" /><path d="M 0 0 V 8" stroke="#f08c8c" strokeWidth="1.2" /></pattern>
            <pattern id={`${patternId}-storage`} width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#e8cf6520" /><path d="M 0 0 V 8" stroke="#e9d678" strokeWidth="1.2" /></pattern>
          </defs>
          {[0, 1, 2, 3].map((step) => {
            const value = maximum * (1 - step / 3);
            return <g key={step}><line x1={PAD.left} x2={WIDTH - PAD.right} y1={y(value)} y2={y(value)} className={estilos.chartGrid} /><text x={PAD.left - 10} y={y(value) + 4} textAnchor="end" className={estilos.chartAxis}>{Math.round(value)}</text></g>;
          })}
          <text x={PAD.left} y={PAD.top - 10} className={estilos.chartAxis}>mm / month</text>
          {rows.slice(0, 11).map((_, index) => {
            const zone = comparisonZone(rows, index, x, y);
            return zone ? <path key={`zone-${index}`} d={zone.path} fill={`url(#${patternId}-${zone.type})`} /> : null;
          })}
          <line x1={x(selectedMonth - 1)} x2={x(selectedMonth - 1)} y1={PAD.top} y2={PAD.top + plotHeight} className={estilos.selectedMonth} />
          {series.map((item) => lineSegments(rows, item.key, x, y).map((segment, index) => (
            <path key={`${item.key}-${index}`} d={segment.path} fill="none" stroke={item.color} strokeWidth="3" strokeDasharray={segment.estimated ? "7 5" : undefined} strokeLinecap="round" strokeLinejoin="round" />
          )))}
          {series.map((item) => rows.map((row, index) => {
            const value = row[item.key];
            if (value == null) return null;
            return <circle key={`${item.key}-point-${index}`} cx={x(index)} cy={y(value)} r={index === selectedMonth - 1 ? 5 : 3.3} fill={item.color} stroke={row.status === "estimated" ? "#fcebb0" : "none"} strokeWidth="1.2"><title>{MONTHS_EN[index]} · {item.label}: {value.toFixed(1)} mm{row.status === "estimated" ? " · estimate" : ""}</title></circle>;
          }))}
          {MONTHS_EN.map((month, index) => <text key={month} x={x(index)} y={HEIGHT - 12} textAnchor="middle" className={estilos.chartAxis}>{month.slice(0, 3)}</text>)}
        </svg>
      </div>
      <div className={estilos.chartLegend}>
        {series.map((item) => <span key={item.key}><i style={{ backgroundColor: item.color }} />{item.label}</span>)}
        {year >= 2027 && <span><i className={estilos.estimatedLine} />Estimated values</span>}
      </div>
    </>
  );
}

export function AridityChart({ rows, trend, selectedYear }: { rows: (AnnualClimate & { status: "observed" | "partial" | "estimated" })[]; trend: Tendencia; selectedYear: number }) {
  const clipId = useId().replaceAll(":", "");
  const graphRef = useRevealOnScroll();
  const plotWidth = WIDTH - PAD.left - PAD.right;
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;
  const forecast = rows.filter((row) => row.status === "estimated");
  const values = rows.flatMap((row) => [row.ia, row.iaLow, row.iaHigh]).filter((value): value is number => value != null);
  const upper = Math.max(0.8, Math.ceil(Math.max(...values) * 5) / 5);
  const x = (year: number) => PAD.left + ((year - 2016) / 15) * plotWidth;
  const y = (value: number) => PAD.top + plotHeight - (value / upper) * plotHeight;
  const actual = rows.filter((row) => row.status === "observed" && row.ia != null);
  const partial = rows.find((row) => row.status === "partial" && row.ia != null);
  const senStart = trend.senAnual * 2016 + trend.ordenadaSen;
  const senEnd = trend.senAnual * 2025 + trend.ordenadaSen;
  const observedPath = (series: AnnualClimate[]) => series.map((row, index) => `${index ? "L" : "M"} ${x(row.year)} ${y(row.ia!)}`).join(" ");
  const forecastPath = observedPath(forecast);
  const bandPath = forecast.length ? `${forecast.map((row, index) => `${index ? "L" : "M"} ${x(row.year)} ${y(row.iaHigh ?? row.ia!)}`).join(" ")} ${[...forecast].reverse().map((row) => `L ${x(row.year)} ${y(row.iaLow ?? row.ia!)}`).join(" ")} Z` : "";

  return (
    <>
      <div className={estilos.chartScroll}>
        <svg ref={graphRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-labelledby="aridity-chart-title aridity-chart-desc" className={estilos.chartSvg}>
          <title id="aridity-chart-title">Annual aridity index, observed trend, and statistical estimates through 2031</title>
          <desc id="aridity-chart-desc">Annual aridity index observations from 2016 to 2025, a partial January to August 2026 value, the Sen trend fitted to complete annual records from 2002 to 2025, and statistical estimates from 2027 to 2031.</desc>
          <defs><clipPath id={`${clipId}-clip`}><rect x={PAD.left} y={PAD.top} width={plotWidth} height={plotHeight} /></clipPath></defs>
          {[0, 1, 2, 3].map((step) => {
            const value = upper * (1 - step / 3);
            return <g key={step}><line x1={PAD.left} x2={WIDTH - PAD.right} y1={y(value)} y2={y(value)} className={estilos.chartGrid} /><text x={PAD.left - 10} y={y(value) + 4} textAnchor="end" className={estilos.chartAxis}>{value.toFixed(2)}</text></g>;
          })}
          <g clipPath={`url(#${clipId}-clip)`}>
            {bandPath && <path d={bandPath} fill="#f8b44e24" />}
            <path d={observedPath(actual)} fill="none" stroke={COLORS.observed} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1={x(2016)} x2={x(2025)} y1={y(senStart)} y2={y(senEnd)} stroke={COLORS.sen} strokeWidth="2" strokeDasharray="4 5" />
            {forecastPath && <path d={forecastPath} fill="none" stroke={COLORS.estimate} strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" strokeLinejoin="round" />}
            {actual.map((row) => <circle key={row.year} cx={x(row.year)} cy={y(row.ia!)} r={selectedYear === row.year ? 5.5 : 3.5} fill={selectedYear === row.year ? COLORS.estimate : COLORS.observed}><title>{row.year} observed annual aridity index: {row.ia!.toFixed(2)}</title></circle>)}
            {partial?.ia != null && <circle cx={x(partial.year)} cy={y(partial.ia)} r="5" fill="#1b2a3a" stroke="#b8c0c8" strokeWidth="2"><title>2026 partial aridity index, January through August: {partial.ia.toFixed(2)}. Not a full-year value.</title></circle>}
            {forecast.map((row) => row.ia == null ? null : <circle key={row.year} cx={x(row.year)} cy={y(row.ia)} r={selectedYear === row.year ? 5.5 : 3.5} fill={COLORS.estimate}><title>{row.year} modeled estimate: {row.ia.toFixed(2)}</title></circle>)}
          </g>
          {[2016, 2020, 2025, 2027, 2031].map((year) => <text key={year} x={x(year)} y={HEIGHT - 12} textAnchor="middle" className={estilos.chartAxis}>{year}</text>)}
        </svg>
      </div>
      <div className={estilos.chartLegend}>
        <span><i className={estilos.observedLine} />Observed aridity index (IA) · turquoise</span>
        <span><i className={estilos.senLine} />Sen trend · white dashed</span>
        <span><i className={estilos.partialPoint} />2026 partial year · hollow point</span>
        <span><i className={estilos.estimateLine} />Statistical estimate · amber dashed</span>
        <span><i className={estilos.uncertaintyKey} />Variability in validation years</span>
      </div>
    </>
  );
}
