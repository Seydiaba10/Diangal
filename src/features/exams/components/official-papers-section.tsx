import { ChevronDown, ExternalLink, FileCheck2, FileText, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { SectionCard } from "@/components/ui/section-card";
import { formatDate } from "@/lib/format";
import type { OfficialPaper } from "@/types/domain";
import { groupOfficialPapers, OFFICIAL_PAPERS_PAGE, type OfficialPaperSubject } from "../official-papers";

/**
 * Sujets et corrigés officiels du Bac (PDF de l'Office du Bac), par session et par matière :
 * ceux de la série d'abord, les langues et épreuves sans série précisée repliées. Chaque lien
 * ouvre le document sur le site officiel : DIANGAL n'en garde aucune copie.
 */
export async function OfficialPapersSection({
  papers,
  series,
  total,
  checkedOn,
}: {
  /** Documents de la série choisie et épreuves communes. */
  papers: OfficialPaper[];
  series: string | null;
  /** Nombre total de documents relevés (toutes séries). */
  total: number;
  checkedOn: string;
}) {
  const t = await getTranslations("examsPage.official");
  const sessions = series ? groupOfficialPapers(papers, series) : [];

  const subjectList = (subjects: OfficialPaperSubject[]) => (
    <div className="space-y-4">
      {subjects.map((subject) => (
        <div key={subject.label}>
          <h3 className="text-sm font-semibold text-ink">{subject.label}</h3>
          <ul className="mt-1.5 space-y-1">
            {subject.papers.map((paper) => {
              const kind = t(paper.kind);
              const details = [paper.seriesLabel ?? t("unknownSeries"), paper.group ? t(paper.group === 1 ? "group1" : "group2") : null].filter(
                Boolean,
              );
              return (
                <li key={paper.id}>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("open", { label: `${subject.label}, ${kind}, ${details.join(", ")}` })}
                    className="flex min-h-11 flex-wrap items-center gap-x-2 gap-y-1 rounded-lg px-2 py-1.5 text-sm text-ink transition-colors hover:bg-canvas"
                  >
                    {paper.kind === "corrige" ? (
                      <FileCheck2 className="size-4 shrink-0 text-success-700" aria-hidden />
                    ) : (
                      <FileText className="size-4 shrink-0 text-brand-700" aria-hidden />
                    )}
                    <span className="font-medium">{kind}</span>
                    <span className="text-ink-muted">{details.join(" · ")}</span>
                    {paper.replacement ? <Badge tone="idle">{t("replacement")}</Badge> : null}
                    <ExternalLink className="ml-auto size-3.5 shrink-0 text-ink-subtle" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <SectionCard id="officiels-titre" title={t("title")} subtitle={t("subtitle")}>
      {!series ? (
        <p className="text-sm text-ink-muted">{t("chooseSeries", { count: total })}</p>
      ) : sessions.length === 0 ? (
        <p className="text-sm text-ink-muted">{t("empty")}</p>
      ) : (
        <div className="space-y-2">
          {sessions.map((session, index) => (
            <details key={session.year} open={index === 0} className="group rounded-xl border border-line">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-2">
                <span className="font-semibold text-ink">
                  {t("session", { year: session.year })}
                  <span className="ml-2 text-sm font-normal text-ink-muted">{t("count", { count: session.count })}</span>
                </span>
                <ChevronDown className="size-4 shrink-0 text-ink-muted transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <div className="space-y-4 border-t border-line px-4 py-3">
                {session.subjects.length ? subjectList(session.subjects) : <p className="text-sm text-ink-muted">{t("noSeriesPapers")}</p>}
                {session.othersCount ? (
                  <details className="group/others rounded-lg bg-canvas">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-sm font-medium text-ink">
                      {t("others", { count: session.othersCount })}
                      <ChevronDown className="size-4 shrink-0 text-ink-muted transition-transform group-open/others:rotate-180" aria-hidden />
                    </summary>
                    <div className="px-3 pb-3">{subjectList(session.others)}</div>
                  </details>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      )}
      <p className="mt-4 flex gap-2 text-xs text-ink-muted">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success-700" aria-hidden />
        <span>
          {t("source", { date: formatDate(checkedOn) })}{" "}
          <a href={OFFICIAL_PAPERS_PAGE} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline">
            {t("sourceLink")}
          </a>
        </span>
      </p>
    </SectionCard>
  );
}
