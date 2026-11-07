// Vitesse réelle des pages : seuils officiels des Core Web Vitals (web.dev) et adresse de page anonymisée.

import type { WebVitalMetric } from "@/types/domain";

/** Seuils « bon » et « mauvais » de chaque mesure (millisecondes, sauf CLS sans unité). */
export const WEB_VITAL_THRESHOLDS: Record<WebVitalMetric, readonly [good: number, poor: number]> = {
  LCP: [2500, 4000],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
};

export type WebVitalRating = "good" | "needs-improvement" | "poor";

export function rateWebVital(metric: WebVitalMetric, value: number): WebVitalRating {
  const [good, poor] = WEB_VITAL_THRESHOLDS[metric];
  return value <= good ? "good" : value <= poor ? "needs-improvement" : "poor";
}

/**
 * Adresse réduite, sans identifiant : au-delà des deux premiers niveaux, chaque partie devient « :p ».
 * « /eleve/cours/mathematiques-ci/<id>/<id> » → « /eleve/cours/:p/:p/:p ».
 */
export function pageOf(pathname: string): string {
  const parts = pathname.toLowerCase().split("/").filter(Boolean);
  const kept = parts.map((part, i) => (i < 2 && /^[a-z0-9-]{1,40}$/.test(part) ? part : ":p"));
  return `/${kept.join("/")}`.slice(0, 120);
}
