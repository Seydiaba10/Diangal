import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ChapterStatusBadge, PremiumBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { SUBJECT_STYLES } from "@/lib/subjects";
import type { Subject } from "@/types/domain";
import { chapterHref, getChapterSummaries } from "../data";

export async function ChapterList({ subject }: { subject: Subject }) {
  const [chapters, t] = await Promise.all([getChapterSummaries(subject), getTranslations("subject")]);
  const style = SUBJECT_STYLES[subject.code];
  return (
    <ol className="space-y-3">
      {chapters.map((chapter) => (
        <li key={chapter.id}>
          <Link
            href={chapterHref(subject, chapter)}
            className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-brand-500 sm:gap-4"
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold",
                style.soft,
                style.text,
              )}
            >
              {chapter.number}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium leading-snug text-ink">{chapter.title}</span>
              <span className="mt-0.5 block text-xs text-ink-muted">
                {t("meta", { lessons: chapter.lessonsCount, minutes: chapter.estimatedMinutes })}
              </span>
              <span className="mt-2 flex flex-wrap gap-1.5">
                <ChapterStatusBadge status={chapter.status} />
                {chapter.isPremium ? <PremiumBadge /> : null}
              </span>
              {chapter.status === "in_progress" ? (
                <ProgressBar
                  value={chapter.progressPct}
                  label={t("progressLabel", { title: chapter.title })}
                  fillClassName={style.solid}
                  className="mt-3 max-w-xs"
                />
              ) : null}
            </span>
            <ChevronRight className="size-5 shrink-0 text-ink-subtle" aria-hidden />
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function ChapterListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-24 rounded-2xl" />
      ))}
    </div>
  );
}
