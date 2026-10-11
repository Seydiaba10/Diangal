import { FileCheck, ShieldCheck, Upload } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getOwnVerification } from "@/features/tutors/data";

export async function generateMetadata() {
  const t = await getTranslations("tutorVerification");
  return { title: t("title") };
}

async function VerificationContent() {
  const [item, t] = await Promise.all([getOwnVerification(), getTranslations("tutorVerification")]);
  if (!item) return null;
  const approved = item.status === "approved";

  return (
    <div className="space-y-5">
      <div className={approved ? "rounded-2xl bg-success-50 p-5" : "rounded-2xl bg-premium-50 p-5"}>
        <p className={approved ? "flex items-center gap-2 font-semibold text-success-700" : "flex items-center gap-2 font-semibold text-premium-700"}>
          <ShieldCheck className="size-5" aria-hidden />
          {t(`status.${item.status}`)}
        </p>
        <p className="mt-1 text-sm text-ink">{t(`statusBody.${item.status}`)}</p>
      </div>

      <SectionCard id="pieces-titre" title={t("documents")}>
        <ul className="divide-y divide-line">
          {item.documents.map((doc) => (
            <li key={doc.type} className="flex items-center gap-3 py-3">
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
        <div className="mt-4 rounded-xl border border-dashed border-line p-4">
          <Button variant="outline" size="sm" disabled>
            <Upload className="size-4" aria-hidden />
            {t("upload")}
          </Button>
          <p className="mt-2 text-xs text-ink-muted">{t("uploadHint")}</p>
        </div>
      </SectionCard>

      <p className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-800">{t("privacy")}</p>
    </div>
  );
}

export default async function TutorVerificationPage() {
  const t = await getTranslations("tutorVerification");
  return (
    <PageContainer width="narrow" className="space-y-5">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <VerificationContent />
      </Suspense>
    </PageContainer>
  );
}
