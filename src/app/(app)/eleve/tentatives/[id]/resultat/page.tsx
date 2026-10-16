import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { ResultView } from "@/features/assessments/components/result-view";

export async function generateMetadata() {
  const t = await getTranslations("result");
  return { title: t("title") };
}

export default async function AttemptResultPage({ params }: PageProps<"/eleve/tentatives/[id]/resultat">) {
  const [t, tBreadcrumb] = await Promise.all([getTranslations("result"), getTranslations("breadcrumb")]);
  return (
    <PageContainer width="narrow" className="space-y-5">
      <Breadcrumb items={[{ label: tBreadcrumb("practice"), href: "/eleve/exercices" }, { label: t("title") }]} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        {params.then(({ id }) => (
          <ResultView attemptId={id} />
        ))}
      </Suspense>
    </PageContainer>
  );
}
