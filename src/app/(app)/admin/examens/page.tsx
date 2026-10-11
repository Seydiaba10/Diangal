import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { updateExamSessionAction } from "@/features/admin/actions";
import { getExamPapers, getExamSessions } from "@/features/exams/data";
import { formatDate } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("adminExams");
  return { title: t("title") };
}

async function ExamSessions({ searchParams }: { searchParams: PageProps<"/admin/examens">["searchParams"] }) {
  const [params, sessions, papers, t] = await Promise.all([
    searchParams,
    getExamSessions(),
    getExamPapers("BFEM"),
    getTranslations("adminExams"),
  ]);
  return (
    <div className="space-y-5">
      {params.enregistre ? <Notice tone="success">{t("saved")}</Notice> : null}
      {params.erreur ? <Notice tone="error">{t("error")}</Notice> : null}
      <SectionCard id="dates-titre" title={t("sessions")} subtitle={t("sessionsHint")}>
        <ul className="divide-y divide-line">
          {sessions.map((s) => (
            <li key={s.id} className="py-4">
              <form action={updateExamSessionAction.bind(null, s.id)} className="grid items-end gap-3 sm:grid-cols-[1fr_180px_auto_auto]">
                <div>
                  <p className="font-semibold text-ink">
                    {s.type} {s.year}
                  </p>
                  <p className="text-xs text-ink-muted">
                    {t("current", { date: formatDate(s.startsOn) })} · {s.isOfficial ? t("official") : t("indicative")}
                  </p>
                </div>
                <div>
                  <label htmlFor={`date-${s.id}`} className="text-xs text-ink-muted">
                    {t("startsOn")}
                  </label>
                  <input
                    id={`date-${s.id}`}
                    name="startsOn"
                    type="date"
                    defaultValue={s.startsOn}
                    className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink focus:border-brand-600"
                  />
                </div>
                <label className="flex h-11 items-center gap-2 text-sm text-ink">
                  <input type="checkbox" name="official" defaultChecked={s.isOfficial} className="size-5 accent-brand-600" />
                  {t("officialLabel")}
                </label>
                <Button type="submit" size="sm">
                  {t("save")}
                </Button>
              </form>
            </li>
          ))}
        </ul>
      </SectionCard>
      <SectionCard id="annales-titre" title={t("papers")}>
        <p className="text-sm text-ink">{t("papersCount", { count: papers.length, exam: "BFEM" })}</p>
        <p className="mt-1 text-xs text-ink-muted">{t("papersHint")}</p>
      </SectionCard>
    </div>
  );
}

export default async function AdminExamsPage({ searchParams }: PageProps<"/admin/examens">) {
  const t = await getTranslations("adminExams");
  return (
    <PageContainer className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ExamSessions searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
