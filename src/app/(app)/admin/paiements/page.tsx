import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { Table, Td, Th } from "@/components/ui/table";
import { getAllPayments } from "@/features/payments/data";
import { formatDate, formatFCFA } from "@/lib/format";
import { CircleCheck, CircleX, Wallet } from "lucide-react";

export async function generateMetadata() {
  const t = await getTranslations("adminPayments");
  return { title: t("title") };
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
                <Badge tone={p.status === "succeeded" ? "success" : p.status === "failed" ? "danger" : "info"}>{t(`status.${p.status}`)}</Badge>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="text-xs text-ink-subtle">{t("note")}</p>
    </div>
  );
}

export default async function AdminPaymentsPage() {
  const t = await getTranslations("adminPayments");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-64 rounded-2xl" />}>
        <Payments />
      </Suspense>
    </PageContainer>
  );
}
