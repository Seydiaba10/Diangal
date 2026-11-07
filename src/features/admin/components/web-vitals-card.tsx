import { CircleAlert, CircleCheck, TriangleAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionCard } from "@/components/ui/section-card";
import { cn } from "@/lib/cn";
import { formatDecimal, formatMilliseconds } from "@/lib/format";
import { rateWebVital, type WebVitalRating } from "@/lib/web-vitals";
import type { WebVitalMetric } from "@/types/domain";
import { getWebVitals } from "../data";

const METRICS: WebVitalMetric[] = ["LCP", "INP", "CLS", "FCP", "TTFB"];
const RATING_STYLE: Record<WebVitalRating, { icon: typeof CircleCheck; className: string }> = {
  good: { icon: CircleCheck, className: "text-success-700" },
  "needs-improvement": { icon: TriangleAlert, className: "text-premium-700" },
  poor: { icon: CircleAlert, className: "text-danger-700" },
};
/** Une page n'est classée qu'avec assez de visites pour que son 75e centile ait un sens. */
const MIN_SAMPLES = 5;

const show = (metric: WebVitalMetric, value: number) => (metric === "CLS" ? formatDecimal(Math.round(value * 100) / 100) : formatMilliseconds(value));

/**
 * Vitesse réelle des pages (7 derniers jours), mesurée sur les téléphones des utilisateurs : valeur que 75 % des
 * visites ne dépassent pas, avec un état (bon, à améliorer, mauvais) toujours écrit en plus de la couleur.
 */
export async function WebVitalsCard() {
  const [rows, t] = await Promise.all([getWebVitals(), getTranslations("adminHome.vitals")]);
  const site = METRICS.map((metric) => rows.find((r) => r.metric === metric && r.page === "*")).filter((r) => r !== undefined);
  const slowest = rows
    .filter((r) => r.metric === "LCP" && r.page !== "*" && r.samples >= MIN_SAMPLES)
    .sort((a, b) => b.p75 - a.p75)
    .slice(0, 5);

  return (
    <SectionCard id="vitesse-titre" title={t("title")} subtitle={t("subtitle")}>
      {site.length === 0 ? (
        <p className="text-sm text-ink-muted">{t("empty")}</p>
      ) : (
        <div className="space-y-5">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {site.map((row) => {
              const rating = rateWebVital(row.metric, row.p75);
              const { icon: Icon, className } = RATING_STYLE[rating];
              return (
                <li key={row.metric} className="rounded-xl border border-line p-3">
                  <p className="text-xs font-medium text-ink-muted">{t(`metrics.${row.metric}`)}</p>
                  <p className="mt-1 text-xl font-semibold text-ink">{show(row.metric, row.p75)}</p>
                  <p className={cn("mt-1 flex items-center gap-1 text-xs font-medium", className)}>
                    <Icon className="size-3.5 shrink-0" aria-hidden />
                    {t(`ratings.${rating}`)}
                  </p>
                  <p className="mt-1 text-xs text-ink-subtle">{t("samples", { count: row.samples, good: row.goodPct })}</p>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-ink-muted">{t("slowNetwork", { pct: site[0]?.slowNetworkPct ?? 0 })}</p>
          {slowest.length ? (
            <div>
              <h3 className="text-sm font-semibold text-ink">{t("slowestTitle")}</h3>
              <ul className="mt-2 divide-y divide-line text-sm">
                {slowest.map((row) => (
                  <li key={row.page} className="flex items-center justify-between gap-3 py-2">
                    <span className="min-w-0 truncate font-mono text-xs text-ink">{row.page}</span>
                    <span className="shrink-0 text-ink-muted">{show("LCP", row.p75)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </SectionCard>
  );
}
