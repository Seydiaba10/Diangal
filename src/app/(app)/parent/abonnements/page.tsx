import { CircleCheck, CircleX, Clock, Crown, Undo2, Users } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentAvatar } from "@/components/ui/student-avatar";
import { getParentChildren } from "@/features/account/data";
import { getFamilyCoverage } from "@/features/family/data";
import { CheckoutForm } from "@/features/payments/components/checkout-form";
import { getMyPayments } from "@/features/payments/data";
import { formatDate, formatFCFA } from "@/lib/format";
import type { PaymentRecord } from "@/types/domain";

const STATUS = {
  succeeded: { tone: "success", icon: CircleCheck },
  pending: { tone: "info", icon: Clock },
  failed: { tone: "danger", icon: CircleX },
  refunded: { tone: "info", icon: Undo2 },
} as const satisfies Record<PaymentRecord["status"], { tone: "success" | "info" | "danger"; icon: typeof CircleCheck }>;

export async function generateMetadata() {
  const t = await getTranslations("parentSubscriptions");
  return { title: t("title") };
}

async function SubscriptionsContent({ searchParams }: { searchParams: PageProps<"/parent/abonnements">["searchParams"] }) {
  const [{ erreur }, children, coverage, payments, t, tSubscription, tCheckout] = await Promise.all([
    searchParams,
    getParentChildren(),
    getFamilyCoverage(),
    getMyPayments(),
    getTranslations("parentSubscriptions"),
    getTranslations("subscription"),
    getTranslations("checkout"),
  ]);
  const covered = children.filter((c) => coverage?.childIds.includes(c.id));
  return (
    <div className="space-y-5">
      {erreur ? (
        <Notice tone="error">
          {erreur === "famille"
            ? t("familyError")
            : tSubscription(erreur === "indisponible" ? "errors.unavailable" : erreur === "prestataire" ? "errors.provider" : "errors.form")}
        </Notice>
      ) : null}
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
      <SectionCard id="famille-titre" title={t("familyTitle")} subtitle={t("familyHint")}>
        {coverage ? (
          <p className="mb-4 flex items-start gap-2 rounded-xl bg-premium-50 px-4 py-3 text-sm text-premium-700">
            <Users className="mt-0.5 size-4 shrink-0" aria-hidden />
            {t("familyActive", {
              date: formatDate(coverage.endsAt),
              names: covered.map((c) => c.firstName).join(", "),
              count: coverage.childIds.length,
              max: coverage.maxChildren,
            })}
          </p>
        ) : null}
        {children.length ? (
          <CheckoutForm scope="family" />
        ) : (
          <p className="text-sm text-ink-muted">
            {t("familyNoChild")}{" "}
            <Link href="/parent/enfants/ajouter" className="font-medium text-brand-700 underline">
              {t("familyAddChild")}
            </Link>
          </p>
        )}
      </SectionCard>

      <SectionCard id="payer-titre" title={t("buy")} subtitle={t("buyHint")}>
        <CheckoutForm beneficiaries={children.map((c) => ({ id: c.id, name: `${c.firstName} ${c.lastName}` }))} />
      </SectionCard>

      <SectionCard id="paiements-titre" title={t("paymentsTitle")} subtitle={t("paymentsHint")}>
        {payments.length ? (
          <ul className="divide-y divide-line">
            {payments.map((p) => {
              const status = STATUS[p.status];
              return (
                <li key={p.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-ink">
                      {tCheckout(`plans.${p.planCode}`)} · {formatFCFA(p.amountFcfa)}
                    </span>
                    <span className="block text-xs text-ink-muted">
                      {formatDate(p.createdAt)} · {p.reference}
                    </span>
                  </span>
                  <Badge tone={status.tone} icon={status.icon}>
                    {t(`paymentStatus.${p.status}`)}
                  </Badge>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-ink-muted">{t("noPayments")}</p>
        )}
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
