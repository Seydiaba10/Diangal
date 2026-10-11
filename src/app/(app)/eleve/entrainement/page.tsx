import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { AssessmentCard } from "@/features/assessments/components/assessment-card";
import { getPracticeAssessments, getRecommendedAssessments } from "@/features/assessments/data";
import { getSubjects } from "@/features/curriculum/data";
import { getStudentDashboard } from "@/features/progress/data";
import { cn } from "@/lib/cn";
import type { AssessmentSummary } from "@/types/domain";

type SearchParams = PageProps<"/eleve/entrainement">["searchParams"];

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("practice") };
}

function AssessmentGrid({ items }: { items: AssessmentSummary[] }) {
  return (
    <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {items.map((a) => (
        <li key={a.id}>
          <AssessmentCard assessment={a} />
        </li>
      ))}
    </ul>
  );
}

async function PracticeContent({ searchParams }: { searchParams: SearchParams }) {
  const { matiere } = await searchParams;
  const [subjects, t] = await Promise.all([getSubjects(), getTranslations("practice")]);
  const selected = subjects.find((s) => s.slug === matiere);
  const [all, dashboard] = await Promise.all([getPracticeAssessments(selected?.code), getStudentDashboard()]);
  const recommended = selected ? [] : await getRecommendedAssessments(dashboard.weakPoints.map((w) => w.chapterId));

  const chip = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors",
        active ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface text-ink-muted hover:text-ink",
      )}
    >
      {label}
    </Link>
  );

  return (
    <>
      <nav aria-label={t("filterLabel")} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 pb-1">
          <li>{chip("/eleve/entrainement", t("allSubjects"), !selected)}</li>
          {subjects.map((s) => (
            <li key={s.slug}>{chip(`/eleve/entrainement?matiere=${s.slug}`, s.name, selected?.slug === s.slug)}</li>
          ))}
        </ul>
      </nav>

      {recommended.length > 0 ? (
        <section aria-labelledby="recommande-titre">
          <h2 id="recommande-titre" className="text-lg font-semibold text-ink">
            {t("recommended")}
          </h2>
          <p className="text-sm text-ink-muted">{t("recommendedHint")}</p>
          <AssessmentGrid items={recommended} />
        </section>
      ) : null}

      <section aria-labelledby="tous-titre">
        <h2 id="tous-titre" className="text-lg font-semibold text-ink">
          {selected ? selected.name : t("all")}
        </h2>
        {all.length > 0 ? <AssessmentGrid items={all} /> : <p className="mt-2 text-sm text-ink-muted">{t("empty")}</p>}
      </section>
    </>
  );
}

export default async function PracticePage({ searchParams }: PageProps<"/eleve/entrainement">) {
  const [tPages, t] = await Promise.all([getTranslations("pages"), getTranslations("practice")]);
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={tPages("practice")} subtitle={t("subtitle")} />
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        }
      >
        <PracticeContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
