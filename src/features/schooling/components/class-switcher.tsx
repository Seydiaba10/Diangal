import { ArrowLeft, ChevronDown, History } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CycleDot } from "@/components/ui/level-badge";
import { Notice } from "@/components/ui/notice";
import { cn } from "@/lib/cn";
import { cycleOf, SERIES_BY_LEVEL } from "@/lib/levels";
import { classQuery, type BrowsedClass } from "../class-navigation";
import type { ClassOption } from "../data";

/** Nombre de classes affichées d'emblée (la sienne et les plus récentes) ; les autres sont repliées. */
const VISIBLE = 4;

/**
 * Choix de la classe parcourue : la classe actuelle (mise en avant) et les classes précédentes,
 * avec leur progression. Un simple lien : rien n'est enregistré, la classe de l'élève ne change pas.
 */
export async function ClassSwitcher({
  basePath,
  browsed,
  options,
}: {
  /** Page à rouvrir avec la classe choisie (/eleve/cours, /eleve/exercices…). */
  basePath: string;
  browsed: BrowsedClass;
  options: ClassOption[];
}) {
  const [t, tLevels] = await Promise.all([getTranslations("classSwitcher"), getTranslations("levels")]);
  const current = options.find((o) => o.isCurrent);
  if (!current || options.length < 2) return null;
  const label = (o: Pick<BrowsedClass, "levelCode" | "seriesCode">) => `${tLevels(o.levelCode)}${o.seriesCode ? ` ${o.seriesCode}` : ""}`;
  const href = (o: Pick<BrowsedClass, "levelCode" | "seriesCode" | "isCurrent">) => {
    const query = new URLSearchParams(classQuery(o));
    return query.size ? `${basePath}?${query}` : basePath;
  };

  const chip = (o: ClassOption) => {
    const active = o.levelCode === browsed.levelCode;
    const cycle = cycleOf(o.levelCode);
    return (
      <li key={o.levelCode}>
        <Link
          href={href(o)}
          aria-current={active ? "page" : undefined}
          className={cn(
            "flex min-h-11 flex-wrap items-center gap-x-2 rounded-xl border px-3 py-1.5 text-sm transition-colors",
            active ? "border-brand-600 bg-brand-50 text-brand-800" : "border-line bg-surface text-ink hover:border-brand-500",
          )}
        >
          {cycle ? <CycleDot cycle={cycle} /> : null}
          <span className="font-semibold">{label(o)}</span>
          <span className="text-xs text-ink-muted">
            {o.isCurrent ? t("current") : t("progress", { done: o.chaptersCompleted, total: o.chaptersTotal })}
          </span>
        </Link>
      </li>
    );
  };

  const visible = options.slice(0, VISIBLE);
  const hidden = options.slice(VISIBLE);
  const hiddenActive = hidden.some((o) => o.levelCode === browsed.levelCode);
  const seriesOptions = !browsed.isCurrent ? (SERIES_BY_LEVEL[browsed.levelCode] ?? []) : [];

  return (
    <section aria-labelledby="classes-titre" className="space-y-3">
      <div className="rounded-2xl border border-line bg-surface p-4">
        <h2 id="classes-titre" className="flex items-center gap-2 text-sm font-semibold text-ink">
          <History className="size-4 text-ink-muted" aria-hidden />
          {t("title")}
        </h2>
        <p className="mt-0.5 text-xs text-ink-muted">{t("hint")}</p>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">{visible.map(chip)}</ul>
        {hidden.length ? (
          <details className="group mt-2" open={hiddenActive}>
            <summary className="flex h-11 cursor-pointer list-none items-center gap-1 text-sm font-medium text-brand-700">
              <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
              {t("more", { count: hidden.length })}
            </summary>
            <ul className="mt-1 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">{hidden.map(chip)}</ul>
          </details>
        ) : null}
        {seriesOptions.length ? (
          <div className="mt-3 border-t border-line pt-3">
            <p className="text-xs font-medium text-ink-muted">{t("series", { level: tLevels(browsed.levelCode) })}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {seriesOptions.map((series) => {
                const active = series === browsed.seriesCode;
                return (
                  <li key={series}>
                    <Link
                      href={href({ ...browsed, seriesCode: series })}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex size-11 items-center justify-center rounded-full border text-sm font-medium",
                        active ? "border-brand-600 bg-brand-600 text-white" : "border-line text-ink-muted hover:text-ink",
                      )}
                    >
                      {series}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
      {!browsed.isCurrent ? (
        <Notice tone="info">
          <p>{t("reviewing", { level: label(browsed), current: label(current) })}</p>
          <Link href={basePath} className="mt-1 inline-flex min-h-11 items-center gap-1.5 font-semibold underline">
            <ArrowLeft className="size-4" aria-hidden />
            {t("back", { current: label(current) })}
          </Link>
        </Notice>
      ) : null}
    </section>
  );
}
