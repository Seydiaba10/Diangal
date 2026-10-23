import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { Table, Td, Th } from "@/components/ui/table";
import { INPUT_CLASS } from "@/components/ui/form";
import { getAllPayments } from "@/features/payments/data";
import { refundPaymentAction } from "@/features/referrals/actions";
import { AdminReferralCard } from "@/features/referrals/components/admin-referral-card";
import { getReferralAdminStats } from "@/features/referrals/data";
import { formatDate, formatFCFA } from "@/lib/format";
import { CircleCheck, CircleX, Undo2, Wallet } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations("adminPayments");
  return { title: t("title") };
}

const STATUS_TONE = { succeeded: "success", failed: "danger", pending: "info", refunded: "idle" } as const;
const REFUND_NOTICES = { ok: "success", demo: "info", confirmation: "error", erreur: "error" } as const;
const REFERRAL_NOTICES = { ok: "success", erreur: "error" } as const;

async function Notices({ searchParams }: { searchParams: PageProps<"/admin/paiements">["searchParams"] }) {
  const [{ remboursement, parrainage }, t] = await Promise.all([searchParams, getTranslations("adminPayments")]);
  const refund = typeof remboursement === "string" && remboursement in REFUND_NOTICES ? (remboursement as keyof typeof REFUND_NOTICES) : null;
  const referral = typeof parrainage === "string" && parrainage in REFERRAL_NOTICES ? (parrainage as keyof typeof REFERRAL_NOTICES) : null;
  return (
    <>
      {refund ? <Notice tone={REFUND_NOTICES[refund]}>{t(`refund.notices.${refund}`)}</Notice> : null}
      {referral ? <Notice tone={REFERRAL_NOTICES[referral]}>{t(`referralNotices.${referral}`)}</Notice> : null}
    </>
  );
}

async function Payments() {
  const [payments, t, tCheckout] = await Promise.all([getAllPayments(), getTranslations("adminPayments"), getTranslations("checkout")]);
  const succeeded = payments.filter((p) => p.status === "succeeded");
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={<Wallet className="size-5" aria-hidden />}
          iconClassName="bg-brand-50 text-brand-700"
          label={t("total")}
          value={formatFCFA(succeeded.reduce((s, p) => s + p.amountFcfa, 0))}
        />
        <StatCard icon={<CircleCheck className="size-5" aria-hidden />} iconClassName="bg-success-50 text-success-700" label={t("succeeded")} value={String(succeeded.length)} />
        <StatCard
          icon={<CircleX className="size-5" aria-hidden />}
          iconClassName="bg-danger-50 text-danger-700"
          label={t("failed")}
          value={String(payments.filter((p) => p.status === "failed").length)}
        />
      </div>
      <Table caption={t("title")}>
        <thead>
          <tr>
            <Th>{t("cols.reference")}</Th>
            <Th>{t("cols.payer")}</Th>
            <Th>{t("cols.beneficiary")}</Th>
            <Th>{t("cols.plan")}</Th>
            <Th>{t("cols.channel")}</Th>
            <Th>{t("cols.amount")}</Th>
            <Th>{t("cols.date")}</Th>
            <Th>{t("cols.status")}</Th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <Td className="font-mono text-xs">{p.reference}</Td>
              <Td>{p.payerName}</Td>
              <Td>{p.beneficiaryName}</Td>
              <Td>{tCheckout(`plans.${p.planCode}`)}</Td>
              <Td>{tCheckout(`channels.${p.channel}.name`)}</Td>
              <Td className="font-medium">{formatFCFA(p.amountFcfa)}</Td>
              <Td>{formatDate(p.createdAt)}</Td>
              <Td>
                <Badge tone={STATUS_TONE[p.status]}>{t(`status.${p.status}`)}</Badge>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="text-xs text-ink-subtle">{t("note")}</p>

      {succeeded.length ? (
        <SectionCard id="remboursement-titre" title={t("refund.title")} subtitle={t("refund.subtitle")}>
          <form action={refundPaymentAction} className="space-y-3">
            <div>
              <label htmlFor="reference" className="text-sm font-medium text-ink">
                {t("refund.payment")}
              </label>
              <select id="reference" name="reference" required className={`${INPUT_CLASS} mt-1.5`}>
                {succeeded.map((p) => (
                  <option key={p.id} value={p.reference}>
                    {p.reference} · {formatFCFA(p.amountFcfa)} · {p.payerName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="motif" className="text-sm font-medium text-ink">
                {t("refund.reason")}
              </label>
              <input id="motif" name="motif" required maxLength={200} className={`${INPUT_CLASS} mt-1.5`} />
            </div>
            <label className="flex cursor-pointer gap-3 text-sm text-ink">
              <input type="checkbox" name="confirm" required className="mt-0.5 size-5 shrink-0 accent-brand-600" />
              {t("refund.confirm")}
            </label>
            <Button type="submit" variant="outline" size="sm">
              <Undo2 className="size-4" aria-hidden />
              {t("refund.submit")}
            </Button>
          </form>
        </SectionCard>
      ) : null}
    </div>
  );
}

async function Referral() {
  const stats = await getReferralAdminStats();
  return stats ? <AdminReferralCard stats={stats} /> : null;
}

export default async function AdminPaymentsPage({ searchParams }: PageProps<"/admin/paiements">) {
  const t = await getTranslations("adminPayments");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={null}>
        <Notices searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-64 rounded-2xl" />}>
        <Payments />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-64 rounded-2xl" />}>
        <Referral />
      </Suspense>
    </PageContainer>
  );
}
