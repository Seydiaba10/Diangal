import { ChevronRight, Crown, Lightbulb } from "lucide-react";
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
import { getAssessmentsByKind } from "@/features/assessments/data";
import { getExamPapers, getNextExamFor } from "@/features/exams/data";
import { ExamCountdown } from "@/features/progress/components/exam-countdown";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("exams") };
}

async function ExamsContent() {
  const student = await getCurrentStudent();
  const [exam, papers, mockExams, t] = await Promise.all([
    getNextExamFor(student.levelCode),
    getExamPapers("BFEM"),
    getAssessmentsByKind("mock_exam"),
    getTranslations("examsPage"),
  ]);
  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-5">
        <section aria-labelledby="blancs-titre">
          <h2 id="blancs-titre" className="text-lg font-semibold text-ink">
            {t("mockExams")}
          </h2>
          <p className="text-sm text-ink-muted">{t("mockExamsHint")}</p>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {mockExams.map((a) => (
              <li key={a.id}>
                <AssessmentCard assessment={a} />
              </li>
            ))}
          </ul>
        </section>

        <SectionCard id="annales-titre" title={t("pastPapers", { exam: "BFEM" })} subtitle={t("pastPapersHint")}>
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
                          className="flex items-center gap-3 rounded-xl border border-line p-3 transition-colors hover:border-brand-500"
                        >
                          <SubjectIcon code={paper.subjectCode} size="sm" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium text-ink">{paper.subjectName}</span>
                            <span className="block text-xs text-ink-muted">
                              {paper.assessmentId ? t("withOnline") : t("subjectAndCorrection")}
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
        </SectionCard>
      </div>

      <aside className="order-first space-y-4 lg:order-none">
        {exam ? <ExamCountdown exam={exam} /> : null}
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
  );
}

export default async function ExamsPage() {
  const [tPages, t] = await Promise.all([getTranslations("pages"), getTranslations("examsPage")]);
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={tPages("exams")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ExamsContent />
      </Suspense>
    </PageContainer>
  );
}
