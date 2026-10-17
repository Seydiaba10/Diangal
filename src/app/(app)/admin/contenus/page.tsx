import { Eye, PenLine, Plus } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { LevelBadge } from "@/components/ui/level-badge";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { PublishStatusBadge, VerificationBadge } from "@/features/admin/components/content-badges";
import { LevelTabs, pickLevel } from "@/features/admin/components/level-tabs";
import { getAdminPrograms, getContentTracking } from "@/features/admin/data";
import { cn } from "@/lib/cn";
import type { LevelCode } from "@/lib/levels";
import type { AdminChapterRow, SubjectCode } from "@/types/domain";

export async function generateMetadata() {
  const t = await getTranslations("adminContent");
  return { title: t("title") };
}

/** Chapitres regroupés par rubrique, dans l'ordre du programme. */
function byStrand(chapters: AdminChapterRow[]) {
  const groups: { strand: string | null; chapters: AdminChapterRow[] }[] = [];
  for (const chapter of chapters) {
    const group = groups.find((g) => g.strand === chapter.strand);
    if (group) group.chapters.push(chapter);
    else groups.push({ strand: chapter.strand, chapters: [chapter] });
  }
  return groups;
}

/** Arborescence d'une classe lue à la requête (brouillons compris sur la base). */
async function ContentTree({ searchParams }: { searchParams: PageProps<"/admin/contenus">["searchParams"] }) {
  const params = await searchParams;
  const level = pickLevel(params.classe);
  const [allPrograms, tracking, t, tLevels] = await Promise.all([
    getAdminPrograms(level),
    getContentTracking(),
    getTranslations("adminContent"),
    getTranslations("levels"),
  ]);
  // Au lycée, une matière par série : filtre facultatif par série (?serie=S1).
  const seriesList = [...new Set(allPrograms.map((p) => p.seriesCode).filter((s) => s !== null))];
  const serie = typeof params.serie === "string" && seriesList.includes(params.serie) ? params.serie : null;
  const programs = serie ? allPrograms.filter((p) => p.seriesCode === serie || p.seriesCode === null) : allPrograms;
  const chip = (active: boolean) =>
    cn(
      "inline-flex h-11 items-center rounded-full border px-4 text-sm font-medium",
      active ? "border-brand-600 bg-brand-50 text-brand-800" : "border-line bg-surface text-ink hover:border-brand-600",
    );

  return (
    <div className="space-y-5">
      {params.supprime ? <Notice tone="success">{t("deleted")}</Notice> : null}
      <LevelTabs basePath="/admin/contenus" current={level} filled={new Set(tracking.filter((r) => r.chapters > 0).map((r) => r.levelCode))} />
      {seriesList.length > 0 ? (
        <nav aria-label={t("seriesFilter")}>
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link href={`/admin/contenus?classe=${level}`} aria-current={serie === null ? "page" : undefined} className={chip(serie === null)}>
                {t("allSeries")}
              </Link>
            </li>
            {seriesList.map((code) => (
              <li key={code}>
                <Link href={`/admin/contenus?classe=${level}&serie=${code}`} aria-current={serie === code ? "page" : undefined} className={chip(serie === code)}>
                  {t("series", { series: code })}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      {programs.length === 0 ? (
        <div className="rounded-2xl border border-line bg-surface p-5 text-sm text-ink">
          <p>{t("empty", { level: tLevels(level) })}</p>
          <Link href={`/admin/referentiel?classe=${level}`} className="mt-3 inline-flex h-11 items-center font-medium text-brand-700 underline">
            {t("toReferential")}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {programs.map((program) => {
            const lessons = program.chapters.flatMap((c) => c.lessons);
            return (
              <details key={program.id} className="group rounded-2xl border border-line bg-surface">
                <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
                  <SubjectIcon code={program.subjectCode as SubjectCode} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                      {program.subjectName}
                      <LevelBadge code={program.levelCode}>{tLevels(program.levelCode as LevelCode)}</LevelBadge>
                      {program.seriesCode ? <span className="text-xs text-ink-muted">{t("series", { series: program.seriesCode })}</span> : null}
                    </span>
                    <span className="block text-xs text-ink-muted">
                      {t("counts", {
                        chapters: program.chapters.length,
                        published: program.chapters.filter((c) => c.status === "published").length,
                        lessons: lessons.length,
                        written: lessons.filter((l) => l.written).length,
                      })}
                    </span>
                  </span>
                  <span aria-hidden className="text-xl text-brand-700 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="space-y-4 border-t border-line p-4">
                  <Link
                    href={`/admin/contenus/chapitres/nouveau?programme=${encodeURIComponent(program.id)}`}
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-brand-600 px-4 text-sm font-medium text-brand-700 hover:bg-brand-50"
                  >
                    <Plus className="size-4" aria-hidden />
                    {t("newChapter")}
                  </Link>
                  {program.chapters.length === 0 ? <p className="text-sm text-ink-muted">{t("noChapters")}</p> : null}
                  {byStrand(program.chapters).map((group) => (
                    <section key={group.strand ?? "-"} className="space-y-2">
                      {group.strand ? (
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{group.strand}</h3>
                      ) : null}
                      <ul className="space-y-2">
                        {group.chapters.map((chapter) => (
                          <li key={chapter.id} className="flex flex-wrap items-center gap-2 rounded-xl bg-canvas px-3 py-2 text-sm">
                            <span className="min-w-0 flex-1">
                              <span className="block font-medium text-ink">
                                {chapter.number}. {chapter.title}
                              </span>
                              <span className="block text-xs text-ink-muted">
                                {t("lessonsWritten", {
                                  count: chapter.lessons.length,
                                  written: chapter.lessons.filter((l) => l.written).length,
                                })}
                              </span>
                            </span>
                            <PublishStatusBadge status={chapter.status} />
                            <VerificationBadge verification={chapter.verification} />
                            <Link
                              href={`/admin/contenus/chapitres/${encodeURIComponent(chapter.id)}/relire`}
                              className="inline-flex h-11 items-center gap-1 rounded-lg px-2 font-medium text-brand-700 hover:bg-surface"
                            >
                              <Eye className="size-4" aria-hidden />
                              {t("review")}
                            </Link>
                            <Link
                              href={`/admin/contenus/chapitres/${encodeURIComponent(chapter.id)}`}
                              className="inline-flex h-11 items-center gap-1 rounded-lg px-2 font-medium text-brand-700 hover:bg-surface"
                            >
                              <PenLine className="size-4" aria-hidden />
                              {t("edit")}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default async function AdminContentPage({ searchParams }: PageProps<"/admin/contenus">) {
  const t = await getTranslations("adminContent");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ContentTree searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
