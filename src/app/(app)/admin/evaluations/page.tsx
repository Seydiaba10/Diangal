import { Crown, Upload } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, Td, Th } from "@/components/ui/table";
import { getAdminAssessments } from "@/features/admin/data";
import { formatDuration } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("adminAssessments");
  return { title: t("title") };
}

export default async function AdminAssessmentsPage() {
  const [assessments, t, tAssessment] = await Promise.all([
    getAdminAssessments(),
    getTranslations("adminAssessments"),
    getTranslations("assessment"),
  ]);
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        actions={
          <Button variant="outline" size="sm" disabled>
            <Upload className="size-4" aria-hidden />
            {t("import")}
          </Button>
        }
      />
      <Table caption={t("title")}>
        <thead>
          <tr>
            <Th>{t("cols.title")}</Th>
            <Th>{t("cols.subject")}</Th>
            <Th>{t("cols.kind")}</Th>
            <Th>{t("cols.questions")}</Th>
            <Th>{t("cols.duration")}</Th>
            <Th>{t("cols.access")}</Th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((a) => (
            <tr key={a.id}>
              <Td>
                <Link href={`/admin/evaluations/${a.id}`} className="font-medium text-brand-700 hover:underline">
                  {a.title}
                </Link>
              </Td>
              <Td>{a.subjectName}</Td>
              <Td>{tAssessment(`kind.${a.kind}`)}</Td>
              <Td>{t("questionsValue", { count: a.questionsCount, points: a.points })}</Td>
              <Td>{a.durationS ? formatDuration(a.durationS) : tAssessment("untimed")}</Td>
              <Td>
                {a.isPremium ? (
                  <Badge tone="premium" icon={Crown}>
                    {t("premium")}
                  </Badge>
                ) : (
                  <Badge tone="success">{t("free")}</Badge>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
}
