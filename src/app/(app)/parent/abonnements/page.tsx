import { Crown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentAvatar } from "@/components/ui/student-avatar";
import { getParentChildren } from "@/features/account/data";
import { CheckoutForm } from "@/features/payments/components/checkout-form";
import { formatDate } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("parentSubscriptions");
  return { title: t("title") };
}

async function SubscriptionsContent({ searchParams }: { searchParams: PageProps<"/parent/abonnements">["searchParams"] }) {
  const [{ erreur }, children, t, tSubscription] = await Promise.all([
    searchParams,
    getParentChildren(),
    getTranslations("parentSubscriptions"),
    getTranslations("subscription"),
  ]);
  return (
    <div className="space-y-5">
      {erreur ? <Notice tone="error">{tSubscription("errors.form")}</Notice> : null}
      <ul className="grid gap-3 sm:grid-cols-2">
        {children.map((child) => (
          <li key={child.id} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
            <StudentAvatar avatarKey={child.avatarKey} className="size-12" />
            <div className="min-w-0">
              <p className="font-semibold text-ink">{child.firstName}</p>
              {child.premiumUntil ? (
                <p className="flex items-center gap-1 text-sm font-medium text-premium-700">
                  <Crown className="size-4" aria-hidden />
                  {t("activeUntil", { date: formatDate(child.premiumUntil) })}
                </p>
              ) : (
                <p className="text-sm text-ink-muted">{t("free")}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <SectionCard id="payer-titre" title={t("buy")} subtitle={t("buyHint")}>
        <CheckoutForm beneficiaries={children.map((c) => ({ id: c.id, name: `${c.firstName} ${c.lastName}` }))} />
      </SectionCard>
    </div>
  );
}

export default async function ParentSubscriptionsPage({ searchParams }: PageProps<"/parent/abonnements">) {
  const t = await getTranslations("parentSubscriptions");
  return (
    <PageContainer className="space-y-5">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <SubscriptionsContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
