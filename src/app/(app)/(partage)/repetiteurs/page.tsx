import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { TutorSearch, TutorSearchSkeleton } from "@/features/tutors/components/tutor-search";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("tutors") };
}

export default async function TutorsPage({ searchParams }: PageProps<"/repetiteurs">) {
  const [tPages, t] = await Promise.all([getTranslations("pages"), getTranslations("tutors")]);
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={tPages("tutors")} subtitle={t("subtitle")} />
      <Suspense fallback={<TutorSearchSkeleton />}>
        {searchParams.then((params) => (
          <TutorSearch params={params} />
        ))}
      </Suspense>
    </PageContainer>
  );
}
