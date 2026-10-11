import { ArrowRight, CircleCheck, Crown, FileText, Headphones, PlayCircle } from "lucide-react";
import Link from "next/link";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Card, CardHeader } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentStudent } from "@/features/account/data";
import { AssessmentCard } from "@/features/assessments/components/assessment-card";
import { getChapterAssessments } from "@/features/assessments/data";
import { DownloadChapterButton } from "@/features/offline/components/download-chapter-button";
import { cn } from "@/lib/cn";
import { formatBytes } from "@/lib/format";
import { SUBJECT_STYLES } from "@/lib/subjects";
import type { Chapter, LessonResourceKind, Subject } from "@/types/domain";
import { getChapterProgress, lessonHref } from "../data";

const RESOURCE_ICONS: Record<LessonResourceKind, typeof FileText> = {
  pdf: FileText,
  audio: Headphones,
  video: PlayCircle,
};

/** Partie propre à l'élève de la page chapitre : progression, leçons faites, évaluations. */
export async function ChapterContent({ subject, chapter }: { subject: Subject; chapter: Chapter }) {
  const [{ summary, statuses }, assessments, student, t, tBadges, messages] = await Promise.all([
    getChapterProgress(chapter),
    getChapterAssessments(chapter.id),
    getCurrentStudent(),
    getTranslations("chapter"),
    getTranslations("badges"),
    getMessages(),
  ]);
  const style = SUBJECT_STYLES[subject.code];
  const nextLesson = chapter.lessons.find((l) => statuses[l.id] !== "completed");
  const totalSize = chapter.lessons.flatMap((l) => l.resources).reduce((sum, r) => sum + r.sizeBytes, 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4 sm:space-y-6">
        <Card aria-labelledby="lecons-titre" className="p-4 sm:p-5">
          <CardHeader
            titleId="lecons-titre"
            title={t("lessonsTitle")}
            subtitle={t("progress", { done: summary.lessonsDone, total: summary.lessonsCount })}
          />
          <ProgressBar
            value={summary.progressPct}
            label={t("progress", { done: summary.lessonsDone, total: summary.lessonsCount })}
            fillClassName={style.solid}
            className="mt-3"
          />
          <ol className="mt-4 space-y-2">
            {chapter.lessons.map((lesson) => {
              const done = statuses[lesson.id] === "completed";
              const locked = lesson.isPremium && !student.isPremium;
              return (
                <li key={lesson.id}>
                  <Link
                    href={lessonHref(subject, chapter, lesson)}
                    className="flex items-center gap-3 rounded-xl border border-line p-3 transition-colors hover:border-brand-500"
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                        done ? "bg-success-50 text-success-700" : "bg-idle-50 text-idle-700",
                      )}
                    >
                      {done ? <CircleCheck className="size-5" aria-label={t("lessonDone")} /> : lesson.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium leading-snug text-ink">{lesson.title}</span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
                        {t("lessonMeta", { minutes: lesson.estimatedMinutes })}
                        {lesson.resources.map((r) => {
                          const Icon = RESOURCE_ICONS[r.kind];
                          return <Icon key={r.kind} className="size-3.5" aria-label={r.title} />;
                        })}
                      </span>
                    </span>
                    {locked ? <Crown className="size-5 shrink-0 text-premium-700" aria-label={tBadges("premium")} /> : null}
                  </Link>
                </li>
              );
            })}
          </ol>
        </Card>

        <section aria-labelledby="entrainement-titre">
          <h2 id="entrainement-titre" className="text-lg font-semibold text-ink">
            {t("practiceTitle")}
          </h2>
          {assessments.length > 0 ? (
            <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {assessments.map((a) => (
                <li key={a.id}>
                  <AssessmentCard assessment={a} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-ink-muted">{t("practiceEmpty")}</p>
          )}
        </section>
      </div>

      {/* Sur mobile, l'action principale passe avant la liste des leçons. */}
      <aside className="order-first space-y-3 lg:sticky lg:top-6 lg:order-none lg:self-start">
        {nextLesson ? (
          <Link
            href={lessonHref(subject, chapter, nextLesson)}
            className="flex items-center gap-3 rounded-2xl bg-brand-600 p-4 text-white transition-colors hover:bg-brand-700"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-700">
              <PlayCircle className="size-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-brand-50">
                {summary.lessonsDone > 0 ? t("resume") : t("start")}
              </span>
              <span className="block font-semibold leading-snug">{nextLesson.title}</span>
            </span>
            <ArrowRight className="size-5 shrink-0" aria-hidden />
          </Link>
        ) : null}
        <NextIntlClientProvider messages={{ offline: messages.offline }}>
          <DownloadChapterButton chapterId={chapter.id} sizeLabel={totalSize > 0 ? formatBytes(totalSize) : null} />
        </NextIntlClientProvider>
      </aside>
    </div>
  );
}

export function ChapterContentSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Skeleton className="h-96 rounded-2xl" />
      <Skeleton className="h-28 rounded-2xl" />
    </div>
  );
}
