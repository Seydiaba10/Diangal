import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { getRecentResults } from "@/features/assessments/data";
import { getCurrentStudent } from "@/features/account/data";
import { getSubjectsProgress } from "@/features/curriculum/data";
import { WeakPoints } from "@/features/progress/components/weak-points";
import { getStudentDashboard, getSubjectAverages } from "@/features/progress/data";
import { cn } from "@/lib/cn";
import { formatDate, formatScore } from "@/lib/format";
import { SUBJECT_STYLES } from "@/lib/subjects";

export async function generateMetadata() {
  const t = await getTranslations("progressPage");
  return { title: t("title") };
}

function scoreTone(score: number) {
  if (score >= 14) return "bg-success-50 text-success-700";
  if (score >= 10) return "bg-premium-50 text-premium-700";
  return "bg-danger-50 text-danger-700";
}

async function ProgressContent() {
  const student = await getCurrentStudent();
  const [subjects, averages, results, dashboard, t] = await Promise.all([
    getSubjectsProgress(student.levelCode),
    getSubjectAverages(),
    getRecentResults(),
    getStudentDashboard(),
    getTranslations("progressPage"),
  ]);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-5">
        <SectionCard id="matieres-titre" title={t("bySubject")}>
          <ul className="space-y-4">
            {subjects.map((s) => {
              const avg = averages[s.code];
              return (
                <li key={s.slug}>
                  <Link href={`/eleve/cours/${s.slug}`} className="flex items-center gap-3 rounded-xl hover:bg-canvas">
                    <SubjectIcon code={s.code} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate font-medium text-ink">{s.name}</span>
                        {avg !== undefined ? (
                          <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", scoreTone(avg))}>
                            {formatScore(avg)}
                          </span>
                        ) : null}
                      </span>
                      <ProgressBar
                        value={s.progressPct}
                        label={t("progressLabel", { subject: s.name })}
                        fillClassName={SUBJECT_STYLES[s.code].solid}
                        className="mt-2"
                      />
                      <span className="mt-1 block text-xs text-ink-muted">
                        {t("chapters", { done: s.chaptersCompleted, total: s.chaptersTotal })}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard id="resultats-titre" title={t("recentResults")}>
          {results.length === 0 ? (
            <p className="text-sm text-ink-muted">{t("noResults")}</p>
          ) : (
            <ul className="divide-y divide-line">
              {results.map((r) => (
                <li key={r.id} className="flex items-center gap-3 py-3">
                  <SubjectIcon code={r.subject.code} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-ink">{r.title}</span>
                    <span className="block text-xs text-ink-muted">{formatDate(r.date)}</span>
                  </span>
                  <span className={cn("rounded-full px-2.5 py-1 text-sm font-semibold", scoreTone(r.score20))}>
                    {formatScore(r.score20)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
      <aside className="space-y-4">
        <WeakPoints items={dashboard.weakPoints} />
      </aside>
    </div>
  );
}

export default async function ProgressPage() {
  const t = await getTranslations("progressPage");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ProgressContent />
      </Suspense>
    </PageContainer>
  );
}
