import { FileCheck, Send, ShieldCheck, Upload } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, INPUT_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { submitTutorForReviewAction, uploadTutorDocumentAction } from "@/features/tutors/actions";
import { getOwnVerification } from "@/features/tutors/data";
import type { TutorDocumentType } from "@/types/domain";

const DOCUMENT_TYPES: TutorDocumentType[] = ["cni", "passport", "diploma", "criminal_record"];
const ERRORS = ["fichier", "format", "envoi", "incomplet", "demo"] as const;

export async function generateMetadata() {
  const t = await getTranslations("tutorVerification");
  return { title: t("title") };
}

async function VerificationContent({ searchParams }: { searchParams: PageProps<"/prof/verification">["searchParams"] }) {
  const [query, item, t] = await Promise.all([searchParams, getOwnVerification(), getTranslations("tutorVerification")]);
  if (!item) return null;
  const approved = item.status === "approved";
  const canSubmit = item.status === "draft" || item.status === "rejected";
  const error = ERRORS.find((e) => e === query.erreur);

  return (
    <div className="space-y-5">
      {query.envoye ? <Notice tone="success">{t("notices.sent")}</Notice> : null}
      {query.soumis ? <Notice tone="success">{t("notices.submitted")}</Notice> : null}
      {error ? <Notice tone="error">{t(`errors.${error}`)}</Notice> : null}

      <div className={approved ? "rounded-2xl bg-success-50 p-5" : "rounded-2xl bg-premium-50 p-5"}>
        <p className={approved ? "flex items-center gap-2 font-semibold text-success-700" : "flex items-center gap-2 font-semibold text-premium-700"}>
          <ShieldCheck className="size-5" aria-hidden />
          {t(`status.${item.status}`)}
        </p>
        <p className="mt-1 text-sm text-ink">{t(`statusBody.${item.status}`)}</p>
        {item.status === "rejected" && item.rejectionReason ? (
          <p className="mt-2 text-sm font-medium text-ink">{t("rejectionReason", { reason: item.rejectionReason })}</p>
        ) : null}
      </div>

      <SectionCard id="pieces-titre" title={t("documents")}>
        {item.documents.length ? (
          <ul className="divide-y divide-line">
            {item.documents.map((doc) => (
              <li key={doc.id ?? doc.type} className="flex items-center gap-3 py-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink-muted">
                  <FileCheck className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-ink">{t(`types.${doc.type}`)}</span>
                  <span className="block truncate text-xs text-ink-muted">{doc.fileName}</span>
                </span>
                <Badge tone={doc.status === "accepted" ? "success" : doc.status === "rejected" ? "danger" : "info"}>
                  {t(`docStatus.${doc.status}`)}
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-ink-muted">{t("empty")}</p>
        )}

        {approved ? null : (
          <form action={uploadTutorDocumentAction} className="mt-4 space-y-3 rounded-xl border border-dashed border-line p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="type-piece" label={t("typeLabel")}>
                <select id="type-piece" name="type" required className={INPUT_CLASS}>
                  {DOCUMENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {t(`types.${type}`)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="fichier-piece" label={t("fileLabel")}>
                <input
                  id="fichier-piece"
                  name="file"
                  type="file"
                  required
                  accept="application/pdf,image/jpeg,image/png"
                  className="block w-full text-sm text-ink file:mr-3 file:h-11 file:rounded-xl file:border-0 file:bg-canvas file:px-4 file:font-medium file:text-ink"
                />
              </Field>
            </div>
            <Button type="submit" variant="outline" size="sm">
              <Upload className="size-4" aria-hidden />
              {t("upload")}
            </Button>
            <p className="text-xs text-ink-muted">{t("uploadHint")}</p>
          </form>
        )}
      </SectionCard>

      {canSubmit ? (
        <SectionCard id="envoi-titre" title={t("submit")} subtitle={t("submitHint")}>
          <form action={submitTutorForReviewAction}>
            <Button type="submit">
              <Send className="size-4" aria-hidden />
              {t("submit")}
            </Button>
          </form>
        </SectionCard>
      ) : null}

      <p className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-800">{t("privacy")}</p>
    </div>
  );
}

export default async function TutorVerificationPage({ searchParams }: PageProps<"/prof/verification">) {
  const t = await getTranslations("tutorVerification");
  return (
    <PageContainer width="narrow" className="space-y-5">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <VerificationContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
