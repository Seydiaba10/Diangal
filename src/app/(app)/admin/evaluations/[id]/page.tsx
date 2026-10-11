import { CircleCheck, KeyRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { RichText } from "@/components/ui/rich-text";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminAssessment } from "@/features/admin/data";
import { cn } from "@/lib/cn";

export async function generateMetadata() {
  const t = await getTranslations("adminAssessments");
  return { title: t("title") };
}

async function AssessmentDetail({ params }: { params: PageProps<"/admin/evaluations/[id]">["params"] }) {
  const { id } = await params;
  const [data, t, tAssessment] = await Promise.all([
    getAdminAssessment(id),
    getTranslations("adminAssessments"),
    getTranslations("assessment"),
  ]);
  if (!data) notFound();
  const { assessment, questions } = data;

  return (
    <>
      <Breadcrumb items={[{ label: t("title"), href: "/admin/evaluations" }, { label: assessment.title }]} />
      <header>
        <p className="text-sm text-ink-muted">
          {assessment.subjectName} · {tAssessment(`kind.${assessment.kind}`)}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{assessment.title}</h1>
      </header>
      <p className="flex items-center gap-2 rounded-xl bg-premium-50 px-4 py-3 text-sm text-premium-700">
        <KeyRound className="size-4 shrink-0" aria-hidden />
        {t("keysWarning")}
      </p>
      <ol className="space-y-3">
        {questions.map(({ question, key }, i) => (
          <li key={question.id} className="rounded-2xl border border-line bg-surface p-5">
            <p className="flex justify-between text-sm text-ink-muted">
              <span>
                {i + 1}. {t(`types.${question.type}`)}
              </span>
              <span>{t("points", { points: question.points })}</span>
            </p>
            <RichText html={question.promptHtml} className="mt-2 text-ink" />
            {question.options.length > 0 ? (
              <ul className="mt-3 space-y-1.5">
                {question.options.map((o) => {
                  const right = key.correctOptionIds?.includes(o.id);
                  return (
                    <li
                      key={o.id}
                      className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm", right ? "bg-success-50 text-success-700" : "bg-canvas text-ink")}
                    >
                      {right ? <CircleCheck className="size-4 shrink-0" aria-hidden /> : <span className="size-4 shrink-0" />}
                      <RichText html={o.labelHtml} />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 rounded-lg bg-success-50 px-3 py-2 text-sm text-success-700">
                {t("expected", { answer: key.expectedAnswer ?? key.acceptedTexts?.join(" / ") ?? String(key.numericValue ?? "") })}
              </p>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}

export default function AdminAssessmentPage({ params }: PageProps<"/admin/evaluations/[id]">) {
  return (
    <PageContainer className="space-y-5">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <AssessmentDetail params={params} />
      </Suspense>
    </PageContainer>
  );
}
