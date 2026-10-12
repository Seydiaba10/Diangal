import { Eye, FileText } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Field, TEXTAREA_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { openTutorDocumentAction, reviewTutorAction } from "@/features/admin/actions";
import { TUTOR_STATUS_TONE } from "@/features/admin/tutor-status";
import { getTutorReviewItem } from "@/features/tutors/data";
import { formatDate, formatFCFA } from "@/lib/format";

type Props = PageProps<"/admin/repetiteurs/[id]">;

export async function generateMetadata() {
  const t = await getTranslations("adminTutors");
  return { title: t("title") };
}

async function TutorReview({ params, searchParams }: Props) {
  const [{ id }, query, t, tVerification, tSubjects, tModes] = await Promise.all([
    params,
    searchParams,
    getTranslations("adminTutors"),
    getTranslations("tutorVerification"),
    getTranslations("subjects"),
    getTranslations("tutors.modes"),
  ]);
  const item = await getTutorReviewItem(id);
  if (!item) notFound();

  return (
    <>
      <Breadcrumb items={[{ label: t("title"), href: "/admin/repetiteurs" }, { label: item.displayName }]} />
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{item.displayName}</h1>
        <Badge tone={TUTOR_STATUS_TONE[item.status]}>{t(`status.${item.status}`)}</Badge>
      </header>
      {query.decision ? <Notice tone="success">{t("decisionSaved")}</Notice> : null}
      {query.erreur === "motif" ? <Notice tone="error">{t("reasonRequired")}</Notice> : null}
      {query.erreur === "decision" ? <Notice tone="error">{t("errors.decision")}</Notice> : null}
      {query.erreur === "piece" ? <Notice tone="error">{t("errors.piece")}</Notice> : null}
      {item.rejectionReason ? <Notice tone="warning">{t("rejectedBecause", { reason: item.rejectionReason })}</Notice> : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <SectionCard id="profil-titre" title={t("profile")}>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              {[
                [t("cols.subjects"), item.subjects.map((s) => tSubjects(s)).join(", ")],
                [t("cols.city"), item.city],
                [t("mode"), tModes(item.mode)],
                [t("cols.rate"), formatFCFA(item.hourlyRateFcfa)],
                [t("cols.submitted"), formatDate(item.submittedAt)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-canvas p-3">
                  <dt className="text-xs text-ink-muted">{label}</dt>
                  <dd className="font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </SectionCard>

          <SectionCard id="pieces-titre" title={tVerification("documents")} subtitle={t("documentsHint")}>
            <ul className="divide-y divide-line">
              {item.documents.map((doc) => (
                <li key={doc.id ?? doc.type} className="flex items-center gap-3 py-3">
                  <FileText className="size-5 shrink-0 text-ink-muted" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-ink">{tVerification(`types.${doc.type}`)}</span>
                    <span className="block truncate text-xs text-ink-muted">{doc.fileName}</span>
                  </span>
                  <Badge tone={doc.status === "accepted" ? "success" : doc.status === "rejected" ? "danger" : "info"}>
                    {tVerification(`docStatus.${doc.status}`)}
                  </Badge>
                  {/* Lien signé de 5 minutes, consultation inscrite au journal d'audit. */}
                  <form action={openTutorDocumentAction.bind(null, item.id, doc.storagePath ?? "")}>
                    <Button type="submit" variant="ghost" size="sm" disabled={!doc.storagePath} aria-label={t("view")}>
                      <Eye className="size-4" aria-hidden />
                    </Button>
                  </form>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <SectionCard id="decision-titre" title={t("decision")} subtitle={t("decisionHint")}>
          <div className="space-y-4">
            <form action={reviewTutorAction.bind(null, item.id, "approved")}>
              <Button type="submit" className="w-full" disabled={item.status === "approved"}>
                {t("approve")}
              </Button>
            </form>
            <form action={reviewTutorAction.bind(null, item.id, "rejected")} className="space-y-3 rounded-xl border border-line p-3">
              <Field id="reason" label={t("reason")} hint={t("reasonHint")}>
                <textarea id="reason" name="reason" rows={3} maxLength={300} className={TEXTAREA_CLASS} />
              </Field>
              <Button type="submit" variant="outline" className="w-full">
                {t("reject")}
              </Button>
            </form>
            {item.status === "approved" ? (
              <form action={reviewTutorAction.bind(null, item.id, "suspended")}>
                <Button type="submit" variant="ghost" className="w-full text-danger-700">
                  {t("suspend")}
                </Button>
              </form>
            ) : null}
            <p className="text-xs text-ink-subtle">{t("auditNote")}</p>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

export default function AdminTutorPage(props: Props) {
  return (
    <PageContainer width="wide" className="space-y-5">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <TutorReview {...props} />
      </Suspense>
    </PageContainer>
  );
}
