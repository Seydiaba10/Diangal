import { ChevronRight, Sparkles, Timer } from "lucide-react";
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
import { getPracticeAssessments, getPracticeHistory, getRecommendedAssessments } from "@/features/assessments/data";
import { getCurrentStudent } from "@/features/account/data";
import { getSubjects } from "@/features/curriculum/data";
import { getStudentDashboard } from "@/features/progress/data";
import { cn } from "@/lib/cn";
import { formatDate, formatScore } from "@/lib/format";
import type { AssessmentSummary } from "@/types/domain";

type SearchParams = PageProps<"/eleve/exercices">["searchParams"];

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("practice") };
}

function AssessmentGrid({ items }: { items: AssessmentSummary[] }) {
  return (
    <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {items.map((a) => (
        <li key={a.id}>
          <AssessmentCard assessment={a} />
        </li>
      ))}
    </ul>
  );
}

async function PracticeContent({ searchParams }: { searchParams: SearchParams }) {
  const { matiere } = await searchParams;
  const student = await getCurrentStudent();
  const [subjects, t] = await Promise.all([getSubjects(student.levelCode, student.seriesCode), getTranslations("practice")]);
  const selected = subjects.find((s) => s.slug === matiere);
  const [all, dashboard, history] = await Promise.all([
    getPracticeAssessments(student.levelCode, selected?.code, student.seriesCode),
    getStudentDashboard(),
    getPracticeHistory(),
  ]);
  const recommended = selected ? [] : await getRecommendedAssessments(dashboard.weakPoints.map((w) => w.chapterId));

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
        <ButtonLink href="/eleve/exercices/preparer" className="bg-white text-brand-700 hover:bg-brand-50">
          {t("prepare.cta")}
        </ButtonLink>
      </section>

      <nav aria-label={t("filterLabel")} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 pb-1">
          <li>{chip("/eleve/exercices", t("allSubjects"), !selected)}</li>
          {subjects.map((s) => (
            <li key={s.slug}>{chip(`/eleve/exercices?matiere=${s.slug}`, s.name, selected?.slug === s.slug)}</li>
          ))}
        </ul>
      </nav>

      {recommended.length > 0 ? (
        <section aria-labelledby="recommande-titre">
          <h2 id="recommande-titre" className="text-lg font-semibold text-ink">
            {t("recommended")}
          </h2>
          <p className="text-sm text-ink-muted">{t("recommendedHint")}</p>
          <AssessmentGrid items={recommended} />
        </section>
      ) : null}

      <section aria-labelledby="tous-titre">
        <h2 id="tous-titre" className="text-lg font-semibold text-ink">
          {selected ? selected.name : t("all")}
        </h2>
        {all.length > 0 ? <AssessmentGrid items={all} /> : <p className="mt-2 text-sm text-ink-muted">{t("empty")}</p>}
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
