import { getTranslations } from "next-intl/server";
import { MarketingHeader } from "@/features/marketing/components/marketing-header";
import { PlanCards } from "@/features/payments/components/plan-cards";

export async function generateMetadata() {
  const t = await getTranslations("pricing");
  return { title: t("pageTitle") };
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");
  return (
    <>
      <MarketingHeader />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">{t("pageTitle")}</h1>
          <p className="mt-3 text-ink-muted">{t("pageSubtitle")}</p>
        </div>
        <div className="mt-12">
          <PlanCards />
        </div>
        <p className="mt-8 text-center text-sm text-ink-muted">{t("note")}</p>
      </div>
    </>
  );
}
