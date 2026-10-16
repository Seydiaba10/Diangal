import { CircleCheck, KeyRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Field, INPUT_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { RichText } from "@/components/ui/rich-text";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { updateAssessmentProvenanceAction } from "@/features/admin/actions";
import { SourcesFieldset } from "@/features/admin/components/sources-fieldset";
import { getAdminAssessment } from "@/features/admin/data";
import { cn } from "@/lib/cn";

export async function generateMetadata() {
  const t = await getTranslations("adminAssessments");
  return { title: t("title") };
}

type Props = PageProps<"/admin/evaluations/[id]">;

const ERRORS = ["champs", "lien"] as const;

async function AssessmentDetail({ params, searchParams }: Props) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const [data, t, tAssessment, tChapter, tContent] = await Promise.all([
    getAdminAssessment(id),
    getTranslations("adminAssessments"),
    getTranslations("assessment"),
    getTranslations("adminChapter"),
    getTranslations("adminContent"),
  ]);
  if (!data) notFound();
  const { assessment, questions } = data;
  const error = ERRORS.find((e) => e === query.erreur);

  return (
    <>
      <Breadcrumb items={[{ label: t("title"), href: "/admin/evaluations" }, { label: assessment.title }]} />
      <header>
        <p className="text-sm text-ink-muted">
          {assessment.subjectName} · {tAssessment(`kind.${assessment.kind}`)}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{assessment.title}</h1>
      </header>
      {query.demo ? <Notice tone="info">{tChapter("demo")}</Notice> : null}
      {query.enregistre ? <Notice tone="success">{t("provenanceSaved")}</Notice> : null}
      {error ? <Notice tone="error">{tChapter(`errors.${error}`)}</Notice> : null}
      <SectionCard id="provenance-titre" title={t("provenanceTitle")} subtitle={t("provenanceHint")}>
        <form action={updateAssessmentProvenanceAction.bind(null, assessment.id)} className="space-y-4">
          <Field id="verification" label={tChapter("fields.verification")} hint={t("verificationHint")}>
            <select id="verification" name="verification" defaultValue={assessment.verification} className={INPUT_CLASS}>
              {(["unverified", "reviewed", "official"] as const).map((v) => (
                <option key={v} value={v}>
                  {tContent(`verification.${v}`)}
                </option>
              ))}
            </select>
          </Field>
          <SourcesFieldset sources={assessment.sources} />
          <Field id="correctionSource" label={t("correctionSource")} hint={t("correctionSourceHint")}>
            <input
              id="correctionSource"
              name="correctionSource"
              maxLength={200}
              defaultValue={assessment.correctionSource ?? ""}
              className={INPUT_CLASS}
            />
          </Field>
          <Button type="submit" size="sm">
            {tChapter("save")}
          </Button>
        </form>
      </SectionCard>
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

export default function AdminAssessmentPage(props: Props) {
  return (
    <PageContainer className="space-y-5">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <AssessmentDetail {...props} />
      </Suspense>
    </PageContainer>
  );
}
