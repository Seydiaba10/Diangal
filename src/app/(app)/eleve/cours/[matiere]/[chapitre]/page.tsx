import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { ChapterContent, ChapterContentSkeleton } from "@/features/curriculum/components/chapter-content";
import { getAllChapterParams, getChapter } from "@/features/curriculum/data";

type Params = PageProps<"/eleve/cours/[matiere]/[chapitre]">["params"];

export async function generateStaticParams() {
  return getAllChapterParams();
}

export async function generateMetadata({ params }: PageProps<"/eleve/cours/[matiere]/[chapitre]">) {
  const { matiere, chapitre } = await params;
  return { title: (await getChapter(matiere, chapitre))?.chapter.title };
}

async function ChapterPageContent({ params }: { params: Params }) {
  const { matiere, chapitre } = await params;
  const found = await getChapter(matiere, chapitre);
  if (!found) notFound();
  const { subject, chapter } = found;
  const [t, tBreadcrumb] = await Promise.all([getTranslations("chapter"), getTranslations("breadcrumb")]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: tBreadcrumb("courses"), href: "/eleve/cours" },
          { label: subject.name, href: `/eleve/cours/${subject.slug}` },
          { label: chapter.title },
        ]}
      />
      <header className="flex items-start gap-4">
        <SubjectIcon code={subject.code} size="lg" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink-muted">{t("number", { number: chapter.number })}</p>
          <h1 className="text-2xl font-semibold tracking-tight text-ink lg:text-[28px]">{chapter.title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-muted lg:text-base">{chapter.summary}</p>
        </div>
      </header>
      <Suspense fallback={<ChapterContentSkeleton />}>
        <ChapterContent subject={subject} chapter={chapter} />
      </Suspense>
    </>
  );
}

export default function ChapterPage({ params }: PageProps<"/eleve/cours/[matiere]/[chapitre]">) {
  return (
    <PageContainer className="space-y-5 lg:space-y-7">
      <Suspense
        fallback={
          <>
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-20 w-full max-w-xl" />
            <ChapterContentSkeleton />
          </>
        }
      >
        <ChapterPageContent params={params} />
      </Suspense>
    </PageContainer>
  );
}
