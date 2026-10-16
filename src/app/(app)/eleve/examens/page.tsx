import { ChevronRight, Crown, Lightbulb, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { getCurrentStudent } from "@/features/account/data";
import { AssessmentCard } from "@/features/assessments/components/assessment-card";
import { EXAM_BY_LEVEL, getExamHistory, getExamPapers, getMockExams, getNextExamOfType } from "@/features/exams/data";
import { ExamCountdown } from "@/features/progress/components/exam-countdown";
import { cn } from "@/lib/cn";
import { formatDate, formatScore } from "@/lib/format";
import { SERIES_BY_LEVEL } from "@/lib/levels";
import type { ExamType } from "@/types/domain";

type SearchParams = PageProps<"/eleve/examens">["searchParams"];

const EXAMS: { type: ExamType; param: string }[] = [
  { type: "CFEE", param: "cfee" },
  { type: "BFEM", param: "bfem" },
  { type: "BAC", param: "bac" },
];
const BAC_SERIES = SERIES_BY_LEVEL.TLE ?? [];

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("exams") };
}

function chipClass(active: boolean) {
  return cn(
    "inline-flex h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium",
    active ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface text-ink-muted hover:text-ink",
  );
}

async function ExamsContent({ searchParams }: { searchParams: SearchParams }) {
  const [{ examen, serie }, student, t, tExams] = await Promise.all([
    searchParams,
    getCurrentStudent(),
    getTranslations("examsPage"),
    getTranslations("examNames"),
  ]);
  // Onglet choisi, sinon l'examen de la classe de l'élève (BFEM par défaut).
  const exam = EXAMS.find((e) => e.param === examen)?.type ?? EXAM_BY_LEVEL[student.levelCode] ?? "BFEM";
  const series =
    exam === "BAC" ? (BAC_SERIES.find((s) => s === serie) ?? BAC_SERIES.find((s) => s === student.seriesCode) ?? null) : null;
  const [next, papers, mockExams, history] = await Promise.all([
    getNextExamOfType(exam),
    getExamPapers(exam, series),
    getMockExams(exam, series),
    getExamHistory(exam),
  ]);
  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);
  const examName = tExams(exam);
  const tabHref = (param: string) => `/eleve/examens?examen=${param}`;

  return (
    <div className="space-y-5">
      <nav aria-label={t("tabsLabel")}>
        <ul className="flex flex-wrap gap-2">
          {EXAMS.map((e) => (
            <li key={e.type}>
              <Link href={tabHref(e.param)} aria-current={e.type === exam ? "page" : undefined} className={chipClass(e.type === exam)}>
                {tExams(e.type)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {exam === "BAC" ? (
        <nav aria-label={t("seriesLabel")} className="space-y-2">
          <p className="text-sm font-medium text-ink">{t("seriesLabel")}</p>
          <ul className="flex flex-wrap gap-2">
            {BAC_SERIES.map((code) => (
              <li key={code}>
                <Link
                  href={`/eleve/examens?examen=bac&serie=${code}`}
                  aria-current={code === series ? "page" : undefined}
                  className={chipClass(code === series)}
                >
                  {code}
                </Link>
              </li>
            ))}
          </ul>
          {!series ? <p className="text-xs text-ink-muted">{t("chooseSeries")}</p> : null}
        </nav>
      ) : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          <section aria-labelledby="blancs-titre">
            <h2 id="blancs-titre" className="text-lg font-semibold text-ink">
              {t("mockExams")}
            </h2>
            <p className="text-sm text-ink-muted">{t("mockExamsHint")}</p>
            {mockExams.length ? (
              <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {mockExams.map((a) => (
                  <li key={a.id}>
                    <AssessmentCard assessment={a} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 rounded-2xl border border-line bg-surface p-4 text-sm text-ink-muted">
                {t("noMockExams", { exam: examName })}
              </p>
            )}
          </section>

          <SectionCard id="annales-titre" title={t("pastPapers", { exam: examName })} subtitle={t("pastPapersHint")}>
            {years.length ? (
              <div className="space-y-5">
                {years.map((year) => (
                  <div key={year}>
                    <h3 className="text-sm font-semibold text-ink-muted">{t("session", { year })}</h3>
                    <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {papers
                        .filter((p) => p.year === year)
                        .map((paper) => (
                          <li key={paper.id}>
                            <Link
                              href={`/eleve/examens/annales/${paper.id}`}
                              className="flex min-h-11 items-center gap-3 rounded-xl border border-line p-3 transition-colors hover:border-brand-500"
                            >
                              <SubjectIcon code={paper.subjectCode} size="sm" />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-medium text-ink">
                                  {paper.subjectName}
                                  {paper.seriesCode ? ` · ${paper.seriesCode}` : ""}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-success-700">
                                  <ShieldCheck className="size-3.5" aria-hidden />
                                  {t(`verified.${paper.verification}`)}
                                </span>
                              </span>
                              {paper.correctionPremium && !student.isPremium ? (
                                <Crown className="size-4 shrink-0 text-premium-700" aria-label={t("premiumCorrection")} />
                              ) : null}
                              <ChevronRight className="size-4 shrink-0 text-ink-subtle" aria-hidden />
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-muted">{t("noPastPapers", { exam: examName })}</p>
            )}
          </SectionCard>

          <SectionCard id="historique-titre" title={t("historyTitle")}>
            {history.length ? (
              <ul className="divide-y divide-line">
                {history.map((item) => (
                  <li key={item.attemptId}>
                    <Link
                      href={`/eleve/tentatives/${item.attemptId}/resultat`}
                      className="flex min-h-11 items-center gap-3 py-3 hover:text-brand-700"
                    >
                      <SubjectIcon code={item.subject.code} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-ink">{item.title}</span>
                        <span className="block text-xs text-ink-muted">{formatDate(item.date)}</span>
                      </span>
                      <span className="font-semibold text-ink">{formatScore(item.score20)}</span>
                      <ChevronRight className="size-4 shrink-0 text-ink-subtle" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-muted">{t("historyEmpty", { exam: examName })}</p>
            )}
          </SectionCard>
        </div>

        <aside className="order-first space-y-4 lg:order-none">
          {next ? <ExamCountdown exam={next} /> : null}
          <SectionCard id="conseils-titre" title={t("tipsTitle")}>
            <ul className="space-y-3">
              {(["plan", "papers", "timed", "rest"] as const).map((tip) => (
                <li key={tip} className="flex gap-2.5 text-sm text-ink">
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-premium-500" aria-hidden />
                  {t(`tips.${tip}`)}
                </li>
              ))}
            </ul>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}

export default async function ExamsPage({ searchParams }: PageProps<"/eleve/examens">) {
  const [tPages, t] = await Promise.all([getTranslations("pages"), getTranslations("examsPage")]);
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={tPages("exams")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ExamsContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
