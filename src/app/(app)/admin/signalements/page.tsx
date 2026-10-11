import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, Td, Th } from "@/components/ui/table";
import { handleReportAction } from "@/features/admin/actions";
import { getReports } from "@/features/admin/data";
import { formatDate } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("adminReports");
  return { title: t("title") };
}

async function Reports() {
  const [reports, t] = await Promise.all([getReports(), getTranslations("adminReports")]);
  return (
    <Table caption={t("title")}>
      <thead>
        <tr>
          <Th>{t("cols.target")}</Th>
          <Th>{t("cols.reason")}</Th>
          <Th>{t("cols.reporter")}</Th>
          <Th>{t("cols.date")}</Th>
          <Th>{t("cols.status")}</Th>
          <Th>
            <span className="sr-only">{t("cols.action")}</span>
          </Th>
        </tr>
      </thead>
      <tbody>
        {reports.map((r) => (
          <tr key={r.id}>
            <Td>
              <span className="block font-medium">{t(`types.${r.targetType}`)}</span>
              <span className="block text-xs text-ink-muted">{r.targetName}</span>
            </Td>
            <Td>{r.reason}</Td>
            <Td>{r.reporterName}</Td>
            <Td>{formatDate(r.createdAt)}</Td>
            <Td>
              <Badge tone={r.status === "open" ? "danger" : "success"}>{t(`status.${r.status}`)}</Badge>
            </Td>
            <Td>
              {r.status === "open" ? (
                <form action={handleReportAction.bind(null, r.id)}>
                  <Button type="submit" variant="outline" size="sm">
                    {t("handle")}
                  </Button>
                </form>
              ) : null}
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default async function AdminReportsPage() {
  const t = await getTranslations("adminReports");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-64 rounded-2xl" />}>
        <Reports />
      </Suspense>
    </PageContainer>
  );
}
