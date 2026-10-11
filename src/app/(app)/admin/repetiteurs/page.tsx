import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, Td, Th } from "@/components/ui/table";
import { getTutorReviewQueue } from "@/features/tutors/data";
import { TUTOR_STATUS_TONE, TUTOR_STATUSES } from "@/features/admin/tutor-status";
import { cn } from "@/lib/cn";
import { formatDate, formatFCFA } from "@/lib/format";
import type { TutorStatus } from "@/types/domain";

export async function generateMetadata() {
  const t = await getTranslations("adminTutors");
  return { title: t("title") };
}


async function TutorQueue({ searchParams }: { searchParams: PageProps<"/admin/repetiteurs">["searchParams"] }) {
  const [{ statut }, queue, t, tSubjects] = await Promise.all([
    searchParams,
    getTutorReviewQueue(),
    getTranslations("adminTutors"),
    getTranslations("subjects"),
  ]);
  const filter = TUTOR_STATUSES.includes(statut as TutorStatus) ? (statut as TutorStatus) : null;
  const rows = filter ? queue.filter((r) => r.status === filter) : queue;

  const tab = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium",
        active ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface text-ink-muted",
      )}
    >
      {label}
    </Link>
  );

  return (
    <div className="space-y-4">
      <nav aria-label={t("filter")} className="flex flex-wrap gap-2">
        {tab("/admin/repetiteurs", t("all", { count: queue.length }), !filter)}
        {TUTOR_STATUSES.map((s) =>
          tab(`/admin/repetiteurs?statut=${s}`, t(`statusCount.${s}`, { count: queue.filter((r) => r.status === s).length }), filter === s),
        )}
      </nav>
      <Table caption={t("title")}>
        <thead>
          <tr>
            <Th>{t("cols.name")}</Th>
            <Th>{t("cols.subjects")}</Th>
            <Th>{t("cols.city")}</Th>
            <Th>{t("cols.rate")}</Th>
            <Th>{t("cols.submitted")}</Th>
            <Th>{t("cols.status")}</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <Td>
                <Link href={`/admin/repetiteurs/${r.id}`} className="font-medium text-brand-700 hover:underline">
                  {r.displayName}
                </Link>
              </Td>
              <Td>{r.subjects.map((s) => tSubjects(s)).join(", ")}</Td>
              <Td>{r.city}</Td>
              <Td>{formatFCFA(r.hourlyRateFcfa)}</Td>
              <Td>{formatDate(r.submittedAt)}</Td>
              <Td>
                <Badge tone={TUTOR_STATUS_TONE[r.status]}>{t(`status.${r.status}`)}</Badge>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default async function AdminTutorsPage({ searchParams }: PageProps<"/admin/repetiteurs">) {
  const t = await getTranslations("adminTutors");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <TutorQueue searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
