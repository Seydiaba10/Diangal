import { BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { formatScore } from "@/lib/format";
import type { AssessmentSummary, WorkbookDomain } from "@/types/domain";

const DOMAIN_ORDER: WorkbookDomain[] = ["AN", "AG", "AM", "RP", "II"];

/** Titre court d'une page : la partie après « Leçon N : ». */
function shortTitle(title: string): string {
  const at = title.indexOf(" : ");
  return at >= 0 ? title.slice(at + 3) : title;
}

/** Lignes compactes de pages de cahier : leçon, titre, meilleure note. */
export async function WorkbookRows({ pages, withDomain = false }: { pages: AssessmentSummary[]; withDomain?: boolean }) {
  const t = await getTranslations("workbook");
  return (
    <ul className="divide-y divide-line">
      {pages.map((a) => (
        <li key={a.id}>
          <Link href={`/eleve/evaluations/${a.id}`} className="flex min-h-12 items-center gap-3 px-4 py-2.5 hover:bg-canvas">
            <span className="w-16 shrink-0 text-xs font-semibold text-ink-muted">
              {a.workbook!.lesson !== null ? t("lesson", { lesson: a.workbook!.lesson }) : `p. ${a.workbook!.page}`}
            </span>
            <span className="min-w-0 flex-1">
              {withDomain ? <span className="block text-xs text-ink-muted">{t(`domain.${a.workbook!.domain}`)}</span> : null}
              <span className="block text-sm text-ink">{shortTitle(a.title)}</span>
            </span>
            {a.bestScore20 !== null ? <Badge tone="success">{formatScore(a.bestScore20)}</Badge> : null}
            <ChevronRight className="size-4 shrink-0 text-ink-subtle" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Pages d'un cahier d'exercices, rangées comme dans son sommaire : rubrique, palier, leçon. */
export async function WorkbookList({ items, titleId }: { items: AssessmentSummary[]; titleId: string }) {
  const [t, tPractice] = await Promise.all([getTranslations("workbook"), getTranslations("practice")]);
  const sorted = [...items].sort((a, b) => (a.workbook?.pdfPage ?? 0) - (b.workbook?.pdfPage ?? 0));
  const domains = DOMAIN_ORDER.map((domain) => ({ domain, pages: sorted.filter((a) => a.workbook?.domain === domain) })).filter(
    (d) => d.pages.length > 0,
  );

  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId} className="flex items-center gap-2 text-lg font-semibold text-ink">
        <BookOpen className="size-5 text-brand-700" aria-hidden />
        {tPractice("workbook.title")}
      </h2>
      <p className="text-sm text-ink-muted">{tPractice("workbook.hint")}</p>
      <div className="mt-3 space-y-3">
        {domains.map(({ domain, pages }) => {
          const paliers = [...new Set(pages.map((p) => p.workbook!.palier))];
          return (
            <details key={domain} className="group rounded-2xl border border-line bg-surface">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-semibold text-ink">
                <span>{t(`domain.${domain}`)}</span>
                <span className="flex items-center gap-2 text-sm font-medium text-ink-muted">
                  {tPractice("workbook.pages", { count: pages.length })}
                  <ChevronRight className="size-4 transition-transform group-open:rotate-90" aria-hidden />
                </span>
              </summary>
              {paliers.map((palier) => (
                <div key={palier} className="border-t border-line">
                  <p className="bg-canvas px-4 py-1.5 text-xs font-semibold text-ink-muted">{t("palier", { palier })}</p>
                  <WorkbookRows pages={pages.filter((p) => p.workbook!.palier === palier)} />
                </div>
              ))}
            </details>
          );
        })}
      </div>
    </section>
  );
}
