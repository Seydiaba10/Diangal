import { FileText, Laptop } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { getCurrentStudent } from "@/features/account/data";
import { getAllExamPaperIds, getExamPaper } from "@/features/exams/data";
import { PaywallCard } from "@/features/payments/components/paywall-card";
import { formatBytes } from "@/lib/format";
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

function PdfButton({ label, size }: { label: string; size: string }) {
  return (
    <button type="button" disabled className="flex w-full items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-left">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <FileText className="size-5" aria-hidden />
      </span>
      <span>
        <span className="block font-medium text-ink">{label}</span>
        <span className="block text-xs text-ink-muted">{size}</span>
      </span>
    </button>
  );
}

async function CorrectionAccess({ paper }: { paper: ExamPaper }) {
  const [student, t] = await Promise.all([getCurrentStudent(), getTranslations("examsPage")]);
  if (paper.correctionPremium && !student.isPremium) return <PaywallCard title={t("premiumCorrection")} />;
  return <PdfButton label={t("correctionPdf")} size={`PDF · ${formatBytes(paper.correctionSizeBytes)}`} />;
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
          <p className="text-sm font-medium text-ink-muted">{t("session", { year: paper.year })}</p>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            {t("paperTitle", { exam: paper.examType, year: paper.year, subject: paper.subjectName })}
          </h1>
        </div>
      </header>
      <PdfButton label={t("subjectPdf")} size={`PDF · ${formatBytes(paper.subjectSizeBytes)}`} />
      <Suspense fallback={<Skeleton className="h-20 rounded-2xl" />}>
        <CorrectionAccess paper={paper} />
      </Suspense>
      {paper.assessmentId ? (
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
      ) : null}
      <p className="text-xs text-ink-subtle">{t("pdfDemo")}</p>
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
