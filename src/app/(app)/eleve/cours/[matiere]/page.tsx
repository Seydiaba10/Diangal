import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { ChapterList, ChapterListSkeleton } from "@/features/curriculum/components/chapter-list";
import { getChapters, getSubject, getSubjects } from "@/features/curriculum/data";

type Params = PageProps<"/eleve/cours/[matiere]">["params"];

export async function generateStaticParams() {
  return (await getSubjects()).map((s) => ({ matiere: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/eleve/cours/[matiere]">) {
  const subject = await getSubject((await params).matiere);
  return { title: subject?.name };
}

async function SubjectContent({ params }: { params: Params }) {
  const subject = await getSubject((await params).matiere);
  if (!subject) notFound();
  const [chapters, t, tCourses, tBreadcrumb] = await Promise.all([
    getChapters(subject),
    getTranslations("subject"),
    getTranslations("courses"),
    getTranslations("breadcrumb"),
  ]);

  return (
    <>
      <Breadcrumb items={[{ label: tBreadcrumb("courses"), href: "/eleve/cours" }, { label: subject.name }]} />
      <header className="flex items-center gap-4">
        <SubjectIcon code={subject.code} size="lg" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink lg:text-[28px]">{subject.name}</h1>
          <p className="mt-0.5 text-sm text-ink-muted">
            {t("chapters", { count: chapters.length })} · {tCourses("coefficient", { value: subject.coefficient })}
          </p>
        </div>
      </header>
      <section aria-label={t("chaptersTitle")}>
        <Suspense fallback={<ChapterListSkeleton />}>
          <ChapterList subject={subject} />
        </Suspense>
      </section>
    </>
  );
}

export default function SubjectPage({ params }: PageProps<"/eleve/cours/[matiere]">) {
  return (
    <PageContainer className="space-y-5 lg:space-y-7">
      <Suspense
        fallback={
          <>
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-14 w-72" />
            <ChapterListSkeleton />
          </>
        }
      >
        <SubjectContent params={params} />
      </Suspense>
    </PageContainer>
  );
}
