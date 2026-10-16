import { Video, VideoOff } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTutorStudents, getUpcomingTutorSessions } from "@/features/tutoring/data";
import { formatDateTime } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("tutoring.online");
  return { title: t("metaTitle") };
}

async function SessionList() {
  const [next, students, t, tStudent] = await Promise.all([
    getUpcomingTutorSessions(),
    getTutorStudents(),
    getTranslations("tutoring.online"),
    getTranslations("tutoring.student"),
  ]);
  const names = new Map(students.map((s) => [s.id, s.name]));
  if (next.length === 0) {
    return (
      <EmptyState
        icon={<Video className="size-7" aria-hidden />}
        title={t("title")}
        body={t("empty")}
        action={
          <ButtonLink href="/prof/eleves" variant="outline">
            {t("planFromStudents")}
          </ButtonLink>
        }
      />
    );
  }
  return (
    <SectionCard id="cours-titre" title={t("subtitle")}>
      <ul className="divide-y divide-line">
        {next.map((s) => (
          <li key={s.id} className="flex items-start gap-3 py-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Video className="size-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-ink">{s.topic}</span>
              <span className="block text-sm text-ink-muted">
                {formatDateTime(s.startsAt)} · {tStudent("minutes", { count: s.durationMin })}
              </span>
              <Link href={`/prof/eleves/${s.studentId}`} className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-brand-700 hover:underline">
                {t("with", { name: names.get(s.studentId) ?? "" })}
              </Link>
            </span>
            <Badge tone="idle" icon={VideoOff}>
              {t("visioBadge")}
            </Badge>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export default async function OnlineSessionsPage() {
  const t = await getTranslations("tutoring.online");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Notice tone="info">{t("visioSoon")}</Notice>
      <Suspense fallback={<Skeleton className="h-64 rounded-2xl" />}>
        <SessionList />
      </Suspense>
    </PageContainer>
  );
}
