import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { MessagesLink, NotificationsLink, SearchForm, StreakChip } from "@/components/layout/header-widgets";
import { PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getStudentDashboard } from "../data";
import { ContinueLearning } from "./continue-learning";
import { ExamCountdown } from "./exam-countdown";
import { StatsGrid } from "./stats-grid";
import { WeakPoints } from "./weak-points";

// Mobile : stats → compte à rebours → Continuer → Points faibles (même ordre que le DOM).
// Desktop (xl) : colonne principale + colonne droite, comme la capture d'inspiration.
// Le compte à rebours couvre deux rangées pour que « Continuer » démarre juste sous les stats.
const LAYOUT =
  "grid grid-cols-1 gap-4 sm:gap-6 [grid-template-areas:'stats''exam''continue''weak'] xl:grid-cols-[minmax(0,1fr)_340px] xl:grid-rows-[auto_auto_1fr] xl:[grid-template-areas:'stats_exam''continue_exam''continue_weak']";

export async function StudentDashboard() {
  const [data, t, tStudent] = await Promise.all([
    getStudentDashboard(),
    getTranslations("dashboard"),
    getTranslations("student"),
  ]);
  const { student } = data;

  return (
    <div className="space-y-5 lg:space-y-7">
      <PageHeader
        title={t("greeting", { name: student.firstName })}
        subtitle={
          <>
            <span className="font-medium text-ink">
              {student.schoolName
                ? tStudent("levelAndSchool", { level: student.levelName, school: student.schoolName })
                : tStudent("level", { level: student.levelName })}
            </span>
            {" — "}
            {t("subtitle")}
          </>
        }
        actions={
          <div className="hidden items-center gap-3 lg:flex">
            <SearchForm className="w-72" />
            <StreakChip count={student.streakDays} />
            <NotificationsLink unread={student.unreadNotifications} />
            <MessagesLink />
          </div>
        }
      />

      <div className={LAYOUT}>
        <div className="[grid-area:stats]">
          <StatsGrid stats={data.stats} />
          <Link
            href="/eleve/progression"
            className="mt-2 inline-flex h-11 items-center gap-1 rounded-xl px-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            {t("stats.seeProgress")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        {data.nextExam ? (
          <div className="self-start [grid-area:exam]">
            <ExamCountdown exam={data.nextExam} />
          </div>
        ) : null}
        <div className="self-start [grid-area:continue]">
          <ContinueLearning items={data.continueLearning} />
        </div>
        <div className="self-start [grid-area:weak]">
          <WeakPoints items={data.weakPoints} />
        </div>
      </div>
    </div>
  );
}

export function StudentDashboardSkeleton() {
  return (
    <div className="space-y-5 lg:space-y-7" aria-busy>
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-36 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-80 rounded-2xl" />
    </div>
  );
}
