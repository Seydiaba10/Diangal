import { Crown, ShieldAlert } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentStudent } from "@/features/account/data";
import { CheckoutForm } from "@/features/payments/components/checkout-form";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("subscription") };
}

async function SubscriptionContent({ searchParams }: { searchParams: PageProps<"/eleve/abonnement">["searchParams"] }) {
  const [{ erreur }, student, t] = await Promise.all([searchParams, getCurrentStudent(), getTranslations("subscription")]);
  const blocked = student.isMinor && student.consentStatus !== "granted";

  return (
    <div className="space-y-5">
      {erreur === "consentement" ? <Notice tone="error">{t("errors.consent")}</Notice> : null}
      {erreur === "formulaire" ? <Notice tone="error">{t("errors.form")}</Notice> : null}
      {erreur === "indisponible" ? <Notice tone="error">{t("errors.unavailable")}</Notice> : null}
      {erreur === "prestataire" ? <Notice tone="error">{t("errors.provider")}</Notice> : null}

      <div className="flex items-center gap-4 rounded-2xl bg-premium-50 p-5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-premium-700">
          <Crown className="size-6" aria-hidden />
        </span>
        <div>
          <p className="font-semibold text-ink">{student.isPremium ? t("statusPremium") : t("statusFree")}</p>
          <p className="text-sm text-ink-muted">{student.isPremium ? t("statusPremiumHint") : t("statusFreeHint")}</p>
        </div>
      </div>

      {blocked ? (
        <SectionCard id="parent-titre" title={t("parentPays.title")}>
          <p className="flex gap-2 text-sm text-ink">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-premium-700" aria-hidden />
            {t("parentPays.body")}
          </p>
          <ButtonLink href="/eleve/profil" variant="outline" className="mt-4">
            {t("parentPays.cta")}
          </ButtonLink>
        </SectionCard>
      ) : (
        <SectionCard id="payer-titre" title={t("choose")}>
          <CheckoutForm />
        </SectionCard>
      )}
    </div>
  );
}

export default async function SubscriptionPage({ searchParams }: PageProps<"/eleve/abonnement">) {
  const [tPages, t] = await Promise.all([getTranslations("pages"), getTranslations("subscription")]);
  return (
    <PageContainer width="narrow" className="space-y-5">
      <PageHeader title={tPages("subscription")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <SubscriptionContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
