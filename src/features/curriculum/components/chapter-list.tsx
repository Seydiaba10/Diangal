import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ChapterStatusBadge, PremiumBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { subjectStyle } from "@/lib/subjects";
import type { ChapterSummary, Subject } from "@/types/domain";
import { chapterHref, getChapterSummaries } from "../data";

export async function ChapterList({ subject }: { subject: Subject }) {
  const chapters = await getChapterSummaries(subject);
  // Rubriques du programme (ex. « Activités numériques ») : chapitres regroupés, dans l’ordre de première apparition.
  const groups: { strand: string | null; items: typeof chapters }[] = [];
  for (const chapter of chapters) {
    const strand = chapter.strand ?? null;
    const group = groups.find((g) => g.strand === strand);
    if (group) group.items.push(chapter);
    else groups.push({ strand, items: [chapter] });
  }
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.strand ?? "-"} aria-label={group.strand ?? undefined}>
          {group.strand ? <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">{group.strand}</h2> : null}
          <ChapterItems subject={subject} chapters={group.items} />
        </section>
      ))}
    </div>
  );
}

async function ChapterItems({ subject, chapters }: { subject: Subject; chapters: ChapterSummary[] }) {
  const t = await getTranslations("subject");
  const style = subjectStyle(subject.code);
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
