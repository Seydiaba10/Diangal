import { CircleCheck, CircleX } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentRole } from "@/features/account/data";
import { ROLE_HOME } from "@/features/account/roles";
import { getPaymentByReference, getPlans } from "@/features/payments/data";
import { formatDate, formatFCFA } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("paymentReturn");
  return { title: t("title") };
}

/**
 * Page de retour du prestataire. On lit le statut en base, jamais dans l'URL.
 * Phase 5 : si le webhook n'est pas encore arrivé, la page interroge à nouveau la base.
 */
async function PaymentStatus({ searchParams }: { searchParams: PageProps<"/paiement/retour">["searchParams"] }) {
  const { ref } = await searchParams;
  const reference = Array.isArray(ref) ? ref[0] : ref;
  const [payment, plans, role, t, tCheckout] = await Promise.all([
    reference ? getPaymentByReference(reference) : undefined,
    getPlans(),
    getCurrentRole(),
    getTranslations("paymentReturn"),
    getTranslations("checkout"),
  ]);
  const home = role === "parent" ? "/parent/abonnements" : ROLE_HOME[role];

  if (!payment) {
    return (
      <div className="rounded-3xl border border-line bg-surface p-6 text-center">
        <CircleX className="mx-auto size-12 text-danger-500" aria-hidden />
        <p className="mt-3 font-semibold text-ink">{t("notFound")}</p>
        <ButtonLink href={home} variant="outline" className="mt-6">
          {t("back")}
        </ButtonLink>
      </div>
    );
  }

  const plan = plans.find((p) => p.code === payment.planCode)!;
  const rows: [string, string][] = [
    [t("reference"), payment.reference],
    [t("plan"), tCheckout(`plans.${payment.planCode}`)],
    [t("amount"), formatFCFA(payment.amountFcfa)],
    [t("channel"), tCheckout(`channels.${payment.channel}.name`)],
    [t("beneficiary"), payment.beneficiaryName],
    [t("date"), formatDate(payment.createdAt)],
    [t("duration"), t("days", { days: plan.durationDays })],
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface">
      <div className="bg-success-50 px-6 py-8 text-center">
        <CircleCheck className="mx-auto size-14 text-success-500" aria-hidden />
        <h1 className="mt-3 text-2xl font-bold text-ink">{t("success")}</h1>
        <p className="mt-1 text-sm text-ink-muted">{t("successHint", { name: payment.beneficiaryName })}</p>
      </div>
      <dl className="divide-y divide-line px-6">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 py-3 text-sm">
            <dt className="text-ink-muted">{label}</dt>
            <dd className="text-right font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="p-6">
        <ButtonLink href={home} className="w-full">
          {t("back")}
        </ButtonLink>
        <p className="mt-3 text-center text-xs text-ink-subtle">{t("demoNote")}</p>
      </div>
    </div>
  );
}

export default function PaymentReturnPage({ searchParams }: PageProps<"/paiement/retour">) {
  return (
    <PageContainer width="narrow">
      <Suspense fallback={<Skeleton className="h-96 rounded-3xl" />}>
        <PaymentStatus searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
