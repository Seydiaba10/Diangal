import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, Td, Th } from "@/components/ui/table";
import { getAuditLog } from "@/features/admin/data";
import { formatDate } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("adminAudit");
  return { title: t("title") };
}

async function AuditLog() {
  const [entries, t] = await Promise.all([getAuditLog(), getTranslations("adminAudit")]);
  return (
    <Table caption={t("title")}>
      <thead>
        <tr>
          <Th>{t("cols.date")}</Th>
          <Th>{t("cols.actor")}</Th>
          <Th>{t("cols.action")}</Th>
          <Th>{t("cols.target")}</Th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr key={e.id}>
            <Td>{formatDate(e.createdAt)}</Td>
            <Td className="font-medium">{e.actorName}</Td>
            <Td>{e.action}</Td>
            <Td>{e.target}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default async function AdminAuditPage() {
  const t = await getTranslations("adminAudit");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-64 rounded-2xl" />}>
        <AuditLog />
      </Suspense>
    </PageContainer>
  );
}
