import { ExternalLink, Laptop, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { getCurrentStudent } from "@/features/account/data";
import { getAllExamPaperIds, getExamPaper } from "@/features/exams/data";
import { PaywallCard } from "@/features/payments/components/paywall-card";
import type { ExamPaper } from "@/types/domain";

type Props = PageProps<"/eleve/examens/annales/[id]">;

export async function generateStaticParams() {
  return getAllExamPaperIds();
}

export async function generateMetadata({ params }: Props) {
  const paper = await getExamPaper((await params).id);
  const t = await getTranslations("examsPage");
  return { title: paper ? t("paperTitle", { exam: paper.examType, year: paper.year, subject: paper.subjectName }) : undefined };
}

/** Version en ligne corrigée automatiquement : corrigé Premium sauf mention contraire. */
async function OnlineVersion({ paper }: { paper: ExamPaper }) {
  const [student, t] = await Promise.all([getCurrentStudent(), getTranslations("examsPage")]);
  if (!paper.assessmentId) return null;
  if (paper.correctionPremium && !student.isPremium) return <PaywallCard title={t("premiumCorrection")} />;
  return (
    <div className="rounded-2xl bg-brand-50 p-5">
      <p className="flex items-center gap-2 font-semibold text-ink">
        <Laptop className="size-5 text-brand-700" aria-hidden />
        {t("onlineTitle")}
      </p>
      <p className="mt-1 text-sm text-ink-muted">{t("onlineBody")}</p>
      <ButtonLink href={`/eleve/evaluations/${paper.assessmentId}`} className="mt-4">
        {t("onlineCta")}
      </ButtonLink>
    </div>
  );
}

async function PaperContent({ params }: { params: Props["params"] }) {
  const paper = await getExamPaper((await params).id);
  if (!paper) notFound();
  const [t, tPages] = await Promise.all([getTranslations("examsPage"), getTranslations("pages")]);

  return (
    <>
      <Breadcrumb items={[{ label: tPages("exams"), href: "/eleve/examens" }, { label: `${paper.examType} ${paper.year}` }]} />
      <header className="flex items-center gap-4">
        <SubjectIcon code={paper.subjectCode} size="lg" />
        <div>
          <p className="text-sm font-medium text-ink-muted">
            {t("session", { year: paper.year })}
            {paper.seriesCode ? ` · ${t("series", { series: paper.seriesCode })}` : ""}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            {t("paperTitle", { exam: paper.examType, year: paper.year, subject: paper.subjectName })}
          </h1>
        </div>
      </header>

      <SectionCard id="provenance-titre" title={t("provenanceTitle")}>
        <p className="flex items-center gap-2 text-sm font-medium text-success-700">
          <ShieldCheck className="size-4" aria-hidden />
          {t(`verified.${paper.verification}`)}
        </p>
        {paper.sources.length ? (
          <ul className="mt-3 space-y-2 text-sm text-ink">
            {paper.sources.map((source) => (
              <li key={source.title}>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline hover:text-brand-700">
                    {source.title}
                    <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                ) : (
                  source.title
                )}
              </li>
            ))}
          </ul>
        ) : null}
        {paper.correctionSource ? (
          <p className="mt-3 text-sm text-ink-muted">{t("correctionSource", { source: paper.correctionSource })}</p>
        ) : null}
      </SectionCard>

      <Suspense fallback={<Skeleton className="h-20 rounded-2xl" />}>
        <OnlineVersion paper={paper} />
      </Suspense>
    </>
  );
}

export default function PastPaperPage({ params }: Props) {
  return (
    <PageContainer width="narrow" className="space-y-5">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <PaperContent params={params} />
      </Suspense>
    </PageContainer>
  );
}
