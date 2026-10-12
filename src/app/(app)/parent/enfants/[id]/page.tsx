import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LevelBadge } from "@/components/ui/level-badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentAvatar } from "@/components/ui/student-avatar";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { getParentChild } from "@/features/account/data";
import { getSubjectsProgress } from "@/features/curriculum/data";
import { ExamCountdown } from "@/features/progress/components/exam-countdown";
import { StatsGrid } from "@/features/progress/components/stats-grid";
import { WeakPoints } from "@/features/progress/components/weak-points";
import { getStudentDashboard } from "@/features/progress/data";
import { SUBJECT_STYLES } from "@/lib/subjects";

export async function generateMetadata() {
  const t = await getTranslations("parentChild");
  return { title: t("metaTitle") };
}

/** Suivi d'un enfant en lecture seule. Phase 3 : get_student_dashboard autorisé au parent lié (RLS). */
async function ChildContent({ params }: { params: PageProps<"/parent/enfants/[id]">["params"] }) {
  const { id } = await params;
  const child = await getParentChild(id);
  if (!child) notFound();
  const [t, tParent] = await Promise.all([getTranslations("parentChild"), getTranslations("parentHome")]);
  // Seul le programme de 3e est publié dans cette version.
  const hasProgram = child.levelCode === "3E";
  const [dashboard, subjects] = hasProgram
    ? await Promise.all([getStudentDashboard(child.id), getSubjectsProgress(child.levelCode, child.id)])
    : [null, []];

  return (
    <>
      <Breadcrumb items={[{ label: tParent("metaTitle"), href: "/parent" }, { label: child.firstName }]} />
      <header className="flex items-center gap-4">
        <StudentAvatar avatarKey={child.avatarKey} className="size-16" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            {child.firstName} {child.lastName}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
            <LevelBadge code={child.levelCode}>{child.levelName}</LevelBadge>
            {child.schoolName ? <span>{child.schoolName}</span> : null}
          </p>
        </div>
      </header>

      <StatsGrid
        stats={{
          average20: child.average20,
          chaptersCompleted: child.chaptersCompleted,
          chaptersTotal: child.chaptersTotal,
          quizzesTaken: dashboard?.stats.quizzesTaken ?? 4,
          streakDays: child.streakDays,
        }}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-5">
          {hasProgram ? (
            <SectionCard id="matieres-titre" title={t("subjects")}>
              <ul className="space-y-4">
                {subjects.map((s) => (
                  <li key={s.slug} className="flex items-center gap-3">
                    <SubjectIcon code={s.code} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="flex justify-between text-sm">
                        <span className="font-medium text-ink">{s.name}</span>
                        <span className="text-ink-muted">{s.progressPct} %</span>
                      </span>
                      <ProgressBar value={s.progressPct} label={s.name} fillClassName={SUBJECT_STYLES[s.code].solid} className="mt-1.5" />
                    </span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          ) : (
            <p className="rounded-2xl border border-dashed border-line bg-surface p-5 text-sm text-ink-muted">{t("programSoon")}</p>
          )}
          {dashboard ? <WeakPoints items={dashboard.weakPoints} /> : null}
        </div>
        <aside className="space-y-4">
          {child.nextExam ? <ExamCountdown exam={child.nextExam} /> : null}
          <p className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-800">{t("readOnly")}</p>
        </aside>
      </div>
    </>
  );
}

export default function ChildPage({ params }: PageProps<"/parent/enfants/[id]">) {
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ChildContent params={params} />
      </Suspense>
    </PageContainer>
  );
}
