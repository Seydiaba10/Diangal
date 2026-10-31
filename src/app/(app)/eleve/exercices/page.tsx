import { ChevronRight, History, Sparkles, Timer } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { AssessmentCard } from "@/features/assessments/components/assessment-card";
import {
  getAnyAssessmentSummary,
  getOpenAttempts,
  getPracticeAssessments,
  getPracticeHistory,
  getRecommendedAssessments,
} from "@/features/assessments/data";
import { getSubjects } from "@/features/curriculum/data";
import { getStudentDashboard } from "@/features/progress/data";
import { classQuery } from "@/features/schooling/class-navigation";
import { ClassSwitcher } from "@/features/schooling/components/class-switcher";
import { getBrowsedClass, getClassOptions } from "@/features/schooling/data";
import { cn } from "@/lib/cn";
import { formatDate, formatScore } from "@/lib/format";
import type { AssessmentSummary, OpenAttempt, Subject } from "@/types/domain";

type SearchParams = PageProps<"/eleve/exercices">["searchParams"];

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("practice") };
}

/** Essais en cours, par évaluation : la carte affiche « En cours » et « Reprendre ». */
type OpenByAssessment = Map<string, OpenAttempt>;

function AssessmentGrid({ items, open }: { items: AssessmentSummary[]; open: OpenByAssessment }) {
  return (
    <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {items.map((a) => (
        <li key={a.id}>
          <AssessmentCard assessment={a} open={open.get(a.id) ?? null} />
        </li>
      ))}
    </ul>
  );
}

/**
 * Séries regroupées par chapitre, dans l'ordre du programme (matière, puis numéro du chapitre) ; un
 * chapitre peut en compter plusieurs (série 1, 2…). Les évaluations sans chapitre viennent à la fin.
 */
function ChapterGroups({
  items,
  subjects,
  showSubject,
  countLabel,
  othersLabel,
  open,
  openChapterId,
  inProgressLabel,
}: {
  items: AssessmentSummary[];
  subjects: Subject[];
  showSubject: boolean;
  countLabel: (count: number) => string;
  othersLabel: string;
  open: OpenByAssessment;
  /** Chapitre ouvert au retour d'un exercice (« Retour aux exercices »). */
  openChapterId: string | null;
  inProgressLabel: string;
}) {
  const groups = new Map<string, AssessmentSummary[]>();
  const others: AssessmentSummary[] = [];
  for (const a of items) {
    if (!a.chapterId) others.push(a);
    else groups.set(a.chapterId, [...(groups.get(a.chapterId) ?? []), a]);
  }
  const subjectRank = (a: AssessmentSummary) => {
    const i = subjects.findIndex((s) => s.code === a.subject.code);
    return i < 0 ? subjects.length : i;
  };
  const ordered = [...groups.values()]
    .map((list) => list.sort((x, y) => x.id.localeCompare(y.id)))
    .sort((x, y) => subjectRank(x[0]!) - subjectRank(y[0]!) || (x[0]!.chapterNumber ?? 0) - (y[0]!.chapterNumber ?? 0));
  return (
    <div className="mt-3 space-y-3">
      {ordered.map((list) => (
        <details
          key={list[0]!.chapterId}
          id={`chapitre-${list[0]!.chapterId}`}
          open={list[0]!.chapterId === openChapterId || undefined}
          className="group scroll-mt-20 rounded-2xl border border-line bg-surface"
        >
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-semibold text-ink">
            <span className="min-w-0">
              {showSubject ? <span className="block text-xs font-medium text-ink-muted">{list[0]!.subject.name}</span> : null}
              {list[0]!.chapterTitle}
            </span>
            <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-ink-muted">
              {list.some((a) => open.has(a.id)) ? (
                <span className="inline-flex items-center gap-1 text-info-700">
                  <History className="size-4" aria-hidden />
                  <span className="sr-only sm:not-sr-only">{inProgressLabel}</span>
                </span>
              ) : null}
              {countLabel(list.length)}
              <ChevronRight className="size-4 transition-transform group-open:rotate-90" aria-hidden />
            </span>
          </summary>
          <div className="border-t border-line px-3 pb-3 sm:px-4 sm:pb-4">
            <AssessmentGrid items={list} open={open} />
          </div>
        </details>
      ))}
      {others.length > 0 ? (
        <section aria-label={othersLabel}>
          <h3 className="pt-2 font-semibold text-ink">{othersLabel}</h3>
          <AssessmentGrid items={others} open={open} />
        </section>
      ) : null}
    </div>
  );
}

async function PracticeContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const { matiere } = params;
  const openChapterId = typeof params.chapitre === "string" ? params.chapitre : null;
  // Classe ouverte : celle de l'élève, ou une classe précédente (?classe=3E) pour réviser.
  const [browsed, classes] = await Promise.all([getBrowsedClass(params), getClassOptions()]);
  const [subjects, t] = await Promise.all([getSubjects(browsed.levelCode, browsed.seriesCode), getTranslations("practice")]);
  const selected = subjects.find((s) => s.slug === matiere);
  const [practice, dashboard, history, openAttempts, tAssessment] = await Promise.all([
    getPracticeAssessments(browsed.levelCode, selected?.code, browsed.seriesCode),
    getStudentDashboard(),
    getPracticeHistory(),
    getOpenAttempts(),
    getTranslations("assessment"),
  ]);
  // Exercices commencés (au moins une réponse ou une question passée), les plus récents d'abord.
  const resumable = openAttempts.filter((o) => o.answered > 0 || o.currentIndex > 0);
  const open: OpenByAssessment = new Map(resumable.map((o) => [o.assessmentId, o]));
  const resumeItems = (
    await Promise.all(resumable.slice(0, 5).map(async (o) => ({ open: o, assessment: await getAnyAssessmentSummary(o.assessmentId) })))
  ).filter((r): r is { open: OpenAttempt; assessment: AssessmentSummary } => Boolean(r.assessment));
  // Pages des cahiers officiels : listées à part, dans l'ordre du cahier.
  const all = practice.filter((a) => !a.workbook);
  // Recommandations : séries des chapitres faibles (les pages recopiées d'un cahier ne sont pas proposées).
  const recommended =
    selected || !browsed.isCurrent
      ? []
      : (await getRecommendedAssessments(dashboard.weakPoints.map((w) => w.chapterId))).filter((a) => !a.workbook);
  const withClass = (path: string, extra: Record<string, string> = {}) => {
    const query = new URLSearchParams({ ...classQuery(browsed), ...extra });
    return query.size ? `${path}?${query}` : path;
  };

  const chip = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors",
        active ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface text-ink-muted hover:text-ink",
      )}
    >
      {label}
    </Link>
  );

  return (
    <>
      <ClassSwitcher basePath="/eleve/exercices" browsed={browsed} options={classes} />
      {/* Exercices quittés en cours de route : on les reprend à la question où on s'était arrêté. */}
      {resumeItems.length > 0 ? (
        <section aria-labelledby="reprendre-titre">
          <h2 id="reprendre-titre" className="text-lg font-semibold text-ink">
            {t("open.title")}
          </h2>
          <p className="text-sm text-ink-muted">{t("open.hint")}</p>
          <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
            {resumeItems.map(({ open: o, assessment }) => (
              <li key={o.attemptId}>
                <Link href={`/eleve/tentatives/${o.attemptId}`} className="flex min-h-16 items-center gap-3 p-4 hover:bg-canvas">
                  <SubjectIcon code={assessment.subject.code} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-ink-muted">{assessment.subject.name}</span>
                    <span className="block font-medium text-ink">{assessment.title}</span>
                    <span className="flex flex-wrap items-center gap-x-2 text-xs text-ink-muted">
                      {t("open.progress", { answered: o.answered, total: o.total, number: o.currentIndex + 1 })}
                      {o.timed ? (
                        <span className="inline-flex items-center gap-1 font-medium text-premium-700">
                          <Timer className="size-3.5" aria-hidden />
                          {t("open.timed")}
                        </span>
                      ) : null}
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-700">
                    <History className="size-4" aria-hidden />
                    <span className="hidden sm:inline">{tAssessment("resume")}</span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-ink-subtle" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {/* « Préparer mon prochain devoir » : séance composée à partir des chapitres choisis. */}
      <section
        aria-labelledby="preparer-titre"
        className="flex flex-col gap-4 rounded-2xl bg-brand-700 p-5 text-white sm:flex-row sm:items-center"
      >
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
          <Sparkles className="size-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="preparer-titre" className="text-lg font-semibold">
            {t("prepare.title")}
          </h2>
          <p className="text-sm text-white/85">{t("prepare.hint")}</p>
        </div>
        <ButtonLink href={withClass("/eleve/exercices/preparer")} className="bg-white text-brand-700 hover:bg-brand-50">
          {t("prepare.cta")}
        </ButtonLink>
      </section>

      <nav aria-label={t("filterLabel")} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 pb-1">
          <li>{chip(withClass("/eleve/exercices"), t("allSubjects"), !selected)}</li>
          {subjects.map((s) => (
            <li key={s.slug}>{chip(withClass("/eleve/exercices", { matiere: s.slug }), s.name, selected?.slug === s.slug)}</li>
          ))}
        </ul>
      </nav>

      {recommended.length > 0 ? (
        <section aria-labelledby="recommande-titre">
          <h2 id="recommande-titre" className="text-lg font-semibold text-ink">
            {t("recommended")}
          </h2>
          <p className="text-sm text-ink-muted">{t("recommendedHint")}</p>
          <AssessmentGrid items={recommended} open={open} />
        </section>
      ) : null}

      <section aria-labelledby="tous-titre">
        <h2 id="tous-titre" className="text-lg font-semibold text-ink">
          {selected ? selected.name : t("all")}
        </h2>
        {all.length > 0 ? (
          <ChapterGroups
            items={all}
            subjects={subjects}
            showSubject={!selected}
            countLabel={(count) => t("chapterSeries", { count })}
            othersLabel={t("otherAssessments")}
            open={open}
            openChapterId={openChapterId}
            inProgressLabel={tAssessment("inProgress")}
          />
        ) : (
          <p className="mt-2 text-sm text-ink-muted">{t("empty")}</p>
        )}
      </section>

      {history.length > 0 ? (
        <section aria-labelledby="historique-titre">
          <h2 id="historique-titre" className="text-lg font-semibold text-ink">
            {t("history.title")}
          </h2>
          <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
            {history.slice(0, 8).map((item) => (
              <li key={item.attemptId}>
                <Link
                  href={item.status === "submitted" ? `/eleve/tentatives/${item.attemptId}/resultat` : `/eleve/tentatives/${item.attemptId}`}
                  className="flex items-center gap-3 p-4 hover:bg-canvas"
                >
                  <SubjectIcon code={item.subject.code} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-ink">{item.subject.name}</span>
                    <span className="flex flex-wrap items-center gap-x-2 text-xs text-ink-muted">
                      {t("history.questions", { count: item.questionsCount })}
                      {item.timed ? (
                        <span className="inline-flex items-center gap-1">
                          <Timer className="size-3.5" aria-hidden />
                          {t("history.timed")}
                        </span>
                      ) : null}
                      <span>{formatDate(item.date)}</span>
                    </span>
                  </span>
                  {item.status === "submitted" && item.score20 !== null ? (
                    <span className="font-semibold text-ink">{formatScore(item.score20)}</span>
                  ) : (
                    <Badge tone="info">{t("history.inProgress")}</Badge>
                  )}
                  <ChevronRight className="size-4 shrink-0 text-ink-subtle" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

export default async function PracticePage({ searchParams }: PageProps<"/eleve/exercices">) {
  const [tPages, t] = await Promise.all([getTranslations("pages"), getTranslations("practice")]);
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={tPages("practice")} subtitle={t("subtitle")} />
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        }
      >
        <PracticeContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
