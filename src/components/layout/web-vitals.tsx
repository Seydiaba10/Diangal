"use client";

import { useReportWebVitals } from "next/web-vitals";
import { pageOf } from "@/lib/web-vitals";

// Vitesse réelle des pages chez les utilisateurs (LCP, INP, CLS, FCP, TTFB), envoyée au site lui-même par lots,
// quand la page est quittée ou cachée. Anonyme : aucune donnée de compte, adresse de page réduite (voir pageOf).

const KEPT = new Set(["LCP", "INP", "CLS", "FCP", "TTFB"]);
const CONNECTIONS = new Set(["slow-2g", "2g", "3g", "4g"]);
const queue: Record<string, string | number>[] = [];

function flush() {
  if (!queue.length) return;
  const body = JSON.stringify(queue.splice(0, 20));
  try {
    if (navigator.sendBeacon?.("/api/vitals", new Blob([body], { type: "application/json" }))) return;
    void fetch("/api/vitals", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } }).catch(() => undefined);
  } catch {
    // Mesure perdue : jamais d'erreur pour l'utilisateur.
  }
}

if (typeof window !== "undefined") {
  addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
  addEventListener("pagehide", flush);
}

/** Rappel stable (défini une seule fois) : Next.js ne renvoie pas deux fois la même mesure. */
function report(metric: Parameters<Parameters<typeof useReportWebVitals>[0]>[0]) {
  if (!KEPT.has(metric.name)) return;
  const effective = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection?.effectiveType;
  // Page de la mesure (une navigation sans rechargement peut avoir changé l'adresse entre-temps).
  let path = location.pathname;
  try {
    if (metric.navigationURL) path = new URL(metric.navigationURL, location.href).pathname;
  } catch {
    // adresse illisible : on garde celle de la fenêtre
  }
  queue.push({
    metric: metric.name,
    // CLS n'a pas d'unité (0,05) ; les autres sont en millisecondes.
    value: metric.name === "CLS" ? Math.round(metric.value * 1000) / 1000 : Math.round(metric.value),
    rating: metric.rating,
    page: pageOf(path),
    ...(effective && CONNECTIONS.has(effective) ? { connection: effective } : {}),
  });
  if (queue.length >= 10) flush();
}

export function WebVitals() {
  useReportWebVitals(report);
  return null;
}
