import { ArrowLeft, ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { buttonClasses } from "@/components/ui/button";
import { LessonIllustration } from "@/features/curriculum/components/lesson-illustration";
import { LessonBody, LessonBodySkeleton, LessonResources } from "@/features/curriculum/components/lesson-parts";
import { chapterHref, getLesson, getPrerenderedLessonParams, lessonHref } from "@/features/curriculum/data";
import { coursesHrefFor } from "@/features/schooling/class-navigation";
import { hasReadAloud } from "@/lib/levels";

type Params = PageProps<"/eleve/cours/[matiere]/[chapitre]/[lecon]">;

export async function generateStaticParams() {
  return getPrerenderedLessonParams();
}

export async function generateMetadata({ params }: Params) {
  const { matiere, chapitre, lecon } = await params;
  return { title: (await getLesson(matiere, chapitre, lecon))?.lesson.title };
}

async function LessonContent({ params }: { params: Params["params"] }) {
  const { matiere, chapitre, lecon } = await params;
  const found = await getLesson(matiere, chapitre, lecon);
  if (!found) notFound();
  const { subject, chapter, lesson, previous, next } = found;
  const [t, tBreadcrumb] = await Promise.all([getTranslations("lesson"), getTranslations("breadcrumb")]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: tBreadcrumb("courses"), href: coursesHrefFor(subject) },
          { label: subject.name, href: `/eleve/cours/${subject.slug}` },
          { label: chapter.title, href: chapterHref(subject, chapter) },
        ]}
      />
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink-muted">
            {t("meta", { number: lesson.number, total: chapter.lessons.length, minutes: lesson.estimatedMinutes })}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink lg:text-[28px]">{lesson.title}</h1>
        </div>
        {hasReadAloud(subject.levelCode) ? <LessonIllustration subjectCode={subject.code} /> : null}
      </header>

      <LessonResources lesson={lesson} />

      <Suspense fallback={<LessonBodySkeleton />}>
        <LessonBody chapter={chapter} lesson={lesson} />
      </Suspense>

      <nav className="grid grid-cols-2 gap-3">
        {previous ? (
          <Link href={lessonHref(subject, chapter, previous)} className={buttonClasses({ variant: "outline", className: "justify-start" })}>
            <ArrowLeft className="size-4 shrink-0" aria-hidden />
            <span className="truncate">{t("previous")}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={lessonHref(subject, chapter, next)} className={buttonClasses({ className: "justify-end" })}>
            <span className="truncate">{t("next")}</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
        ) : (
          <Link
            href={`${chapterHref(subject, chapter)}#entrainement-titre`}
            className={buttonClasses({ className: "justify-end" })}
          >
            <Target className="size-4 shrink-0" aria-hidden />
            <span className="truncate">{t("practice")}</span>
          </Link>
        )}
      </nav>
    </>
  );
}

export default function LessonPage({ params }: Params) {
  return (
    <PageContainer width="narrow" className="space-y-5">
      <Suspense fallback={<LessonBodySkeleton />}>
        <LessonContent params={params} />
      </Suspense>
    </PageContainer>
  );
}
