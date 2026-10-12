import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SearchForm } from "@/components/layout/header-widgets";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { getCurrentStudent } from "@/features/account/data";
import { ChapterSearchResults } from "@/features/curriculum/components/chapter-search-results";
import { SubjectGrid, SubjectGridSkeleton } from "@/features/curriculum/components/subject-grid";
import { getSubjects } from "@/features/curriculum/data";
import { Notice } from "@/components/ui/notice";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("courses") };
}

async function CoursesSubtitle() {
  const [student, t] = await Promise.all([getCurrentStudent(), getTranslations("courses")]);
  const subjects = await getSubjects(student.levelCode);
  return <>{t("subtitle", { level: student.levelName, count: subjects.length })}</>;
}

/** Classe dont le programme n'est pas encore publié : on le dit clairement. */
async function OtherLevelNotice() {
  const [student, t] = await Promise.all([getCurrentStudent(), getTranslations("courses")]);
  if ((await getSubjects(student.levelCode)).length > 0) return null;
  return <Notice tone="info">{t("otherLevel", { level: student.levelName })}</Notice>;
}

async function SearchSection({ searchParams }: { searchParams: PageProps<"/eleve/cours">["searchParams"] }) {
  const [{ q }, student] = await Promise.all([searchParams, getCurrentStudent()]);
  const query = (Array.isArray(q) ? q[0] : q)?.trim();
  return query ? <ChapterSearchResults query={query} levelCode={student.levelCode} /> : null;
}

async function StudentSubjects() {
  const student = await getCurrentStudent();
  return <SubjectGrid levelCode={student.levelCode} />;
}

export default async function CoursesPage({ searchParams }: PageProps<"/eleve/cours">) {
  const t = await getTranslations("pages");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader
        title={t("courses")}
        subtitle={
          <Suspense fallback={null}>
            <CoursesSubtitle />
          </Suspense>
        }
        actions={<SearchForm className="w-full sm:w-80" />}
      />
      <Suspense fallback={null}>
        <OtherLevelNotice />
      </Suspense>
      <Suspense fallback={null}>
        <SearchSection searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<SubjectGridSkeleton />}>
        <StudentSubjects />
      </Suspense>
    </PageContainer>
  );
}
