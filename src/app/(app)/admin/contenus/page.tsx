import { Crown, PenLine } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { LevelBadge } from "@/components/ui/level-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { getContentOverview } from "@/features/admin/data";
import type { LevelCode } from "@/lib/levels";

export async function generateMetadata() {
  const t = await getTranslations("adminContent");
  return { title: t("title") };
}

/** Arborescence lue à la requête (leçons rédigées ou non, selon la base). */
async function ContentTree() {
  const [subjects, t, tLevels] = await Promise.all([getContentOverview(), getTranslations("adminContent"), getTranslations("levels")]);
  return (
      <div className="space-y-3">
        {subjects.map(({ subject, chapters }) => {
          const lessons = chapters.flatMap((c) => c.lessons);
          const written = lessons.filter((l) => l.written).length;
          return (
            <details key={subject.slug} className="group rounded-2xl border border-line bg-surface">
              <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
                <SubjectIcon code={subject.code} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                    {subject.name}
                    <LevelBadge code={subject.levelCode}>{tLevels(subject.levelCode as LevelCode)}</LevelBadge>
                  </span>
                  <span className="block text-xs text-ink-muted">
                    {t("counts", { chapters: chapters.length, lessons: lessons.length, written })}
                  </span>
                </span>
                <span aria-hidden className="text-xl text-brand-700 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <ol className="space-y-3 border-t border-line p-4">
                {chapters.map((chapter) => (
                  <li key={chapter.id}>
                    <p className="text-sm font-semibold text-ink">
                      {chapter.number}. {chapter.title}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {chapter.lessons.map((lesson) => (
                        <li key={lesson.id} className="flex flex-wrap items-center gap-2 rounded-lg bg-canvas px-3 py-2 text-sm">
                          <span className="min-w-0 flex-1 text-ink">{lesson.title}</span>
                          {lesson.isPremium ? (
                            <Badge tone="premium" icon={Crown}>
                              {t("premium")}
                            </Badge>
                          ) : null}
                          <Badge tone={lesson.written ? "success" : "idle"}>{lesson.written ? t("written") : t("toWrite")}</Badge>
                          <Link
                            href={`/admin/contenus/lecons/${encodeURIComponent(lesson.id)}`}
                            className="inline-flex h-9 items-center gap-1 rounded-lg px-2 font-medium text-brand-700 hover:bg-surface"
                          >
                            <PenLine className="size-4" aria-hidden />
                            {t("edit")}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </details>
          );
        })}
      </div>
  );
}

export default async function AdminContentPage() {
  const t = await getTranslations("adminContent");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-brand-600 px-4 py-2 font-medium text-white">{t("level", { level: "3e" })}</span>
        <span className="rounded-full bg-canvas px-4 py-2 text-ink-muted">{t("otherLevels")}</span>
      </div>
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ContentTree />
      </Suspense>
    </PageContainer>
  );
}
