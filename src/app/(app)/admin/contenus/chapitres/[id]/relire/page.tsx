import { ArrowLeft, ArrowRight, ExternalLink, PenLine } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LevelBadge } from "@/components/ui/level-badge";
import { Notice } from "@/components/ui/notice";
import { RichText } from "@/components/ui/rich-text";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { AnswerKeyList } from "@/features/admin/components/answer-key-list";
import { PublishStatusBadge, VerificationBadge } from "@/features/admin/components/content-badges";
import { getAdminAssessment, getAdminChapter, getAdminLesson, getAdminPrograms } from "@/features/admin/data";
import { getAssessmentCatalog } from "@/features/assessments/data";
import type { LevelCode } from "@/lib/levels";
import type { AdminChapterRow, SubjectCode } from "@/types/domain";

type Props = PageProps<"/admin/contenus/chapitres/[id]/relire">;

export async function generateMetadata() {
  const t = await getTranslations("adminReview");
  return { title: t("title") };
}

const reviewHref = (chapter: Pick<AdminChapterRow, "id">) => `/admin/contenus/chapitres/${encodeURIComponent(chapter.id)}/relire`;
const LINK_CLASS = "inline-flex h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-brand-700 hover:bg-canvas";

/** Le chapitre en entier, pour le relire : leçons telles que l'élève les voit, puis exercices avec leurs corrigés. */
async function ChapterReview({ params }: Pick<Props, "params">) {
  const { id } = await params;
  const data = await getAdminChapter(decodeURIComponent(id));
  if (!data) notFound();
  const { program, chapter } = data;
  const [programs, lessons, catalog, t, tContent, tLevels] = await Promise.all([
    getAdminPrograms(program.levelCode),
    Promise.all(chapter.lessons.map((lesson) => getAdminLesson(lesson.id))),
    getAssessmentCatalog(),
    getTranslations("adminReview"),
    getTranslations("adminContent"),
    getTranslations("levels"),
  ]);
  const series = (await Promise.all(catalog.filter((a) => a.chapterId === chapter.id).map((a) => getAdminAssessment(a.id)))).filter(
    (s) => s !== null,
  );
  const siblings = programs.find((p) => p.id === program.id)?.chapters ?? [];
  const index = siblings.findIndex((c) => c.id === chapter.id);
  const previous = index > 0 ? siblings[index - 1] : undefined;
  const next = index >= 0 ? siblings[index + 1] : undefined;
  const level = tLevels(program.levelCode as LevelCode);

  return (
    <>
      <Breadcrumb
        items={[
          { label: tContent("title"), href: `/admin/contenus?classe=${program.levelCode}${program.seriesCode ? `&serie=${program.seriesCode}` : ""}` },
          { label: `${program.subjectName} · ${level}${program.seriesCode ? ` ${program.seriesCode}` : ""}` },
          { label: chapter.title },
        ]}
      />
      <header className="space-y-3">
        <p className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <SubjectIcon code={program.subjectCode as SubjectCode} size="sm" />
          {program.subjectName}
          <LevelBadge code={program.levelCode}>{level}</LevelBadge>
          {program.seriesCode ? <span>{tContent("series", { series: program.seriesCode })}</span> : null}
          {chapter.strand ? <span>· {chapter.strand}</span> : null}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink lg:text-[28px]">
          {chapter.number}. {chapter.title}
        </h1>
        <p className="text-ink-muted">{chapter.summary}</p>
        <div className="flex flex-wrap items-center gap-2">
          <PublishStatusBadge status={chapter.status} />
          <VerificationBadge verification={chapter.verification} />
          <Link href={`/admin/contenus/chapitres/${encodeURIComponent(chapter.id)}`} className={LINK_CLASS}>
            <PenLine className="size-4" aria-hidden />
            {t("editChapter")}
          </Link>
        </div>
      </header>

      <Notice tone="info">{t("intro")}</Notice>

      <SectionCard id="sources-titre" title={t("sources")}>
        {chapter.sources.length === 0 ? (
          <p className="text-sm text-ink-muted">{t("noSources")}</p>
        ) : (
          <ul className="space-y-1.5 text-sm text-ink">
            {chapter.sources.map((source) => (
              <li key={`${source.title}-${source.url ?? ""}`}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-700 underline">
                    {source.title}
                    <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                  </a>
                ) : (
                  source.title
                )}
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <section aria-labelledby="lecons-titre" className="space-y-4">
        <h2 id="lecons-titre" className="text-xl font-semibold text-ink">
          {t("lessonsTitle", { count: chapter.lessons.length })}
        </h2>
        {chapter.lessons.map((lesson, i) => {
          const body = lessons[i]?.body.trim() ?? "";
          return (
            <article key={lesson.id} className="space-y-3 rounded-2xl border border-line bg-surface p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="min-w-0 flex-1 text-lg font-semibold text-ink">
                  {t("lessonTitle", { number: lesson.number, title: lesson.title })}
                </h3>
                <PublishStatusBadge status={lesson.status} />
                <Link href={`/admin/contenus/lecons/${encodeURIComponent(lesson.id)}`} className={LINK_CLASS}>
                  <PenLine className="size-4" aria-hidden />
                  {t("editLesson")}
                </Link>
              </div>
              {lesson.written && body ? <RichText html={body} className="text-base text-ink" /> : <Notice tone="warning">{t("noBody")}</Notice>}
            </article>
          );
        })}
      </section>

      <section aria-labelledby="exercices-titre" className="space-y-4">
        <h2 id="exercices-titre" className="text-xl font-semibold text-ink">
          {t("exercisesTitle")}
        </h2>
        {series.length === 0 ? <p className="text-sm text-ink-muted">{t("noExercises")}</p> : null}
        {series.map(({ assessment, questions }) => (
          <div key={assessment.id} className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="min-w-0 flex-1 font-semibold text-ink">{assessment.title}</h3>
              <Link href={`/admin/evaluations/${encodeURIComponent(assessment.id)}`} className={LINK_CLASS}>
                <PenLine className="size-4" aria-hidden />
                {t("openAssessment")}
              </Link>
            </div>
            <AnswerKeyList questions={questions} />
          </div>
        ))}
      </section>

      <nav aria-label={t("chapterNav")} className="grid grid-cols-2 gap-3">
        {previous ? (
          <Link href={reviewHref(previous)} className="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium text-ink hover:border-brand-600">
            <ArrowLeft className="size-4 shrink-0" aria-hidden />
            <span className="min-w-0">
              <span className="block text-xs text-ink-muted">{t("previous")}</span>
              {previous.number}. {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={reviewHref(next)}
            className="flex min-h-11 items-center justify-end gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-right text-sm font-medium text-ink hover:border-brand-600"
          >
            <span className="min-w-0">
              <span className="block text-xs text-ink-muted">{t("next")}</span>
              {next.number}. {next.title}
            </span>
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
        ) : null}
      </nav>
    </>
  );
}

export default function AdminChapterReviewPage({ params }: Props) {
  return (
    <PageContainer className="space-y-5 lg:space-y-7">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ChapterReview params={params} />
      </Suspense>
    </PageContainer>
  );
}
