import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { SearchForm } from "@/components/layout/header-widgets";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { ChapterSearchResults } from "@/features/curriculum/components/chapter-search-results";
import { SubjectGrid, SubjectGridSkeleton } from "@/features/curriculum/components/subject-grid";
import { getSubjects } from "@/features/curriculum/data";
import { ClassSwitcher } from "@/features/schooling/components/class-switcher";
import { getBrowsedClass, getClassOptions } from "@/features/schooling/data";

type SearchParams = PageProps<"/eleve/cours">["searchParams"];

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("courses") };
}

/** Classe ouverte : celle de l'élève, ou une classe précédente choisie dans l'URL (?classe=3E). */
async function browsedFrom(searchParams: SearchParams) {
  return getBrowsedClass(await searchParams);
}

async function CoursesSubtitle({ searchParams }: { searchParams: SearchParams }) {
  const [browsed, t, tLevels] = await Promise.all([browsedFrom(searchParams), getTranslations("courses"), getTranslations("levels")]);
  const subjects = await getSubjects(browsed.levelCode, browsed.seriesCode);
  const level = `${tLevels(browsed.levelCode)}${browsed.seriesCode ? ` ${browsed.seriesCode}` : ""}`;
  return <>{t("subtitle", { level, count: subjects.length })}</>;
}

/** Classe dont le programme n'est pas encore publié : on le dit clairement. */
async function OtherLevelNotice({ searchParams }: { searchParams: SearchParams }) {
  const [browsed, t, tLevels] = await Promise.all([browsedFrom(searchParams), getTranslations("courses"), getTranslations("levels")]);
  if ((await getSubjects(browsed.levelCode, browsed.seriesCode)).length > 0) return null;
  return <Notice tone="info">{t("otherLevel", { level: tLevels(browsed.levelCode) })}</Notice>;
}

async function Classes({ searchParams }: { searchParams: SearchParams }) {
  const [browsed, options] = await Promise.all([browsedFrom(searchParams), getClassOptions()]);
  return <ClassSwitcher basePath="/eleve/cours" browsed={browsed} options={options} />;
}

async function SearchSection({ searchParams }: { searchParams: SearchParams }) {
  const [{ q }, browsed] = await Promise.all([searchParams, browsedFrom(searchParams)]);
  const query = (Array.isArray(q) ? q[0] : q)?.trim();
  return query ? <ChapterSearchResults query={query} levelCode={browsed.levelCode} /> : null;
}

async function StudentSubjects({ searchParams }: { searchParams: SearchParams }) {
  const browsed = await browsedFrom(searchParams);
  return <SubjectGrid levelCode={browsed.levelCode} seriesCode={browsed.seriesCode} />;
}

export default async function CoursesPage({ searchParams }: PageProps<"/eleve/cours">) {
  const t = await getTranslations("pages");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader
        title={t("courses")}
        subtitle={
          <Suspense fallback={null}>
            <CoursesSubtitle searchParams={searchParams} />
          </Suspense>
        }
        actions={<SearchForm className="w-full sm:w-80" />}
      />
      <Suspense fallback={<Skeleton className="h-28 rounded-2xl" />}>
        <Classes searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={null}>
        <OtherLevelNotice searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={null}>
        <SearchSection searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<SubjectGridSkeleton />}>
        <StudentSubjects searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
