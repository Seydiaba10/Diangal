import { CircleCheck, FileText, Headphones, PlayCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { RichText } from "@/components/ui/rich-text";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentStudent } from "@/features/account/data";
import { PaywallCard } from "@/features/payments/components/paywall-card";
import { formatBytes, formatDuration } from "@/lib/format";
import type { Chapter, Lesson, LessonResourceKind } from "@/types/domain";
import { markLessonCompletedAction } from "../actions";
import { getChapterProgress, getLessonBody } from "../data";

const RESOURCE_ICONS: Record<LessonResourceKind, typeof FileText> = {
  pdf: FileText,
  audio: Headphones,
  video: PlayCircle,
};

/** Supports (PDF, audio, vidéo) : rien n'est téléchargé avant un clic, pour économiser les données. */
export async function LessonResources({ lesson }: { lesson: Lesson }) {
  if (lesson.resources.length === 0) return null;
  const t = await getTranslations("lesson");
  return (
    <section aria-labelledby="supports-titre" className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <h2 id="supports-titre" className="font-semibold text-ink">
        {t("resourcesTitle")}
      </h2>
      <p className="mt-0.5 text-xs text-ink-muted">{t("dataSaverHint")}</p>
      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {lesson.resources.map((resource) => {
          const Icon = RESOURCE_ICONS[resource.kind];
          const kind = t(`resource.${resource.kind}`);
          return (
            <li key={resource.kind}>
              <button
                type="button"
                disabled
                title={t("resourceDemo")}
                className="flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">{resource.title}</span>
                  <span className="block text-xs text-ink-muted">
                    {resource.durationS
                      ? t("resourceMetaDuration", {
                          kind,
                          duration: formatDuration(resource.durationS),
                          size: formatBytes(resource.sizeBytes),
                        })
                      : t("resourceMeta", { kind, size: formatBytes(resource.sizeBytes) })}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Corps de la leçon (ou mur Premium) et bouton « Marquer comme terminée ». */
export async function LessonBody({ chapter, lesson }: { chapter: Chapter; lesson: Lesson }) {
  const student = await getCurrentStudent();
  const [html, progress, t] = await Promise.all([
    getLessonBody(chapter, lesson, student.isPremium),
    getChapterProgress(chapter),
    getTranslations("lesson"),
  ]);

  if (html === null) return <PaywallCard />;

  const done = progress.statuses[lesson.id] === "completed";
  return (
    <>
      <article className="rounded-2xl border border-line bg-surface p-5 text-ink sm:p-7">
        <RichText html={html} className="text-base" />
      </article>
      {done ? (
        <p className="flex items-center justify-center gap-2 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700">
          <CircleCheck className="size-5" aria-hidden />
          {t("done")}
        </p>
      ) : (
        <form action={markLessonCompletedAction.bind(null, lesson.id)}>
          <Button type="submit" variant="outline" className="w-full">
            <CircleCheck className="size-5" aria-hidden />
            {t("markDone")}
          </Button>
        </form>
      )}
    </>
  );
}

export function LessonBodySkeleton() {
  return <Skeleton className="h-96 rounded-2xl" />;
}
