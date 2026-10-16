import { CalendarClock, ChevronRight, ClipboardList, GraduationCap, Hourglass, UserPlus } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { INPUT_CLASS } from "@/components/ui/form";
import { LevelBadge } from "@/components/ui/level-badge";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { inviteStudentAction } from "@/features/tutoring/actions";
import { getTutorStudents } from "@/features/tutoring/data";
import { formatDateTime } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("tutoring.students");
  return { title: t("metaTitle") };
}

const NOTICES = { envoyee: "success", deja: "info", code: "error", verification: "warning" } as const;

async function InvitationNotice({ searchParams }: { searchParams: PageProps<"/prof/eleves">["searchParams"] }) {
  const { invitation, prenom } = await searchParams;
  const key = Object.keys(NOTICES).find((k) => k === invitation) as keyof typeof NOTICES | undefined;
  if (!key) return null;
  const t = await getTranslations("tutoring.students.notices");
  return <Notice tone={NOTICES[key]}>{t(key, { prenom: typeof prenom === "string" ? prenom.slice(0, 40) : "" })}</Notice>;
}

async function StudentList() {
  const [students, t] = await Promise.all([getTutorStudents(), getTranslations("tutoring.students")]);
  if (students.length === 0) {
    return <EmptyState icon={<GraduationCap className="size-7" aria-hidden />} title={t("emptyTitle")} body={t("emptyBody")} />;
  }
  return (
    <SectionCard id="eleves-titre" title={t("listTitle")}>
      <ul className="divide-y divide-line">
        {students.map((s) => {
          const content = (
            <>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                  {s.name}
                  <LevelBadge code={s.levelCode}>{s.levelName}</LevelBadge>
                </span>
                {s.status === "active" ? (
                  <span className="mt-1.5 flex flex-col gap-1 text-sm text-ink-muted sm:flex-row sm:gap-4">
                    <span className="flex items-center gap-1.5">
                      <ClipboardList className="size-4" aria-hidden />
                      {t("openAssignments", { count: s.openAssignments })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarClock className="size-4" aria-hidden />
                      {s.nextSessionAt ? t("nextSession", { date: formatDateTime(s.nextSessionAt) }) : t("noSession")}
                    </span>
                  </span>
                ) : (
                  <Badge tone="premium" icon={Hourglass} className="mt-1.5">
                    {t("pending")}
                  </Badge>
                )}
              </span>
              {s.status === "active" ? <ChevronRight className="size-5 shrink-0 text-ink-subtle" aria-hidden /> : null}
            </>
          );
          return (
            <li key={s.id}>
              {s.status === "active" ? (
                <Link href={`/prof/eleves/${s.id}`} className="flex min-h-11 items-center gap-3 rounded-xl py-3 hover:bg-canvas">
                  {content}
                </Link>
              ) : (
                <div className="flex items-center gap-3 py-3">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}

export default async function TutorStudentsPage({ searchParams }: PageProps<"/prof/eleves">) {
  const t = await getTranslations("tutoring.students");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={null}>
        <InvitationNotice searchParams={searchParams} />
      </Suspense>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Suspense fallback={<Skeleton className="h-64 rounded-2xl" />}>
          <StudentList />
        </Suspense>
        <SectionCard id="inviter-titre" title={t("inviteTitle")} subtitle={t("inviteBody")} className="self-start">
          <form action={inviteStudentAction} className="space-y-3">
            <label htmlFor="code-eleve" className="text-sm font-medium text-ink">
              {t("codeLabel")}
            </label>
            <input
              id="code-eleve"
              name="code"
              required
              maxLength={20}
              autoCapitalize="characters"
              placeholder={t("codePlaceholder")}
              className={`${INPUT_CLASS} uppercase`}
            />
            <Button type="submit" className="w-full">
              <UserPlus className="size-4" aria-hidden />
              {t("invite")}
            </Button>
          </form>
        </SectionCard>
      </div>
    </PageContainer>
  );
}
