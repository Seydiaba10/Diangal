import { BookCheck, CalendarPlus, CircleCheck, CircleDashed, ClipboardCheck, Send, Trash2, Trophy, UserMinus, Video, X } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { INPUT_CLASS, TEXTAREA_CLASS } from "@/components/ui/form";
import { LevelBadge } from "@/components/ui/level-badge";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { SubjectIcon } from "@/components/ui/subject-icon";
import {
  cancelSessionAction,
  createAssignmentAction,
  deleteAssignmentAction,
  messageStudentAction,
  scheduleSessionAction,
  stopFollowingStudentAction,
} from "@/features/tutoring/actions";
import { getAssignments, getTutorStudent, getUpcomingSessions } from "@/features/tutoring/data";
import { formatDate, formatDateTime, formatScore } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("tutoring.student");
  return { title: t("metaTitle") };
}

type Params = PageProps<"/prof/eleves/[id]">["params"];
type SearchParams = PageProps<"/prof/eleves/[id]">["searchParams"];

const NOTICE_TONES: Record<string, "success" | "error" | "info"> = {
  envoye: "success",
  supprime: "info",
  planifie: "success",
  annule: "info",
};

async function ActionNotices({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const t = await getTranslations("tutoring.student.notices");
  const shown = (["devoir", "cours", "message"] as const).flatMap((group) => {
    const value = params[group];
    const keys = { devoir: ["envoye", "erreur", "date", "supprime"], cours: ["planifie", "passe", "erreur", "annule"], message: ["vide", "erreur"] };
    return typeof value === "string" && keys[group].includes(value) ? [{ group, value }] : [];
  });
  return shown.map(({ group, value }) => (
    <Notice key={group} tone={NOTICE_TONES[value] ?? "error"}>
      {t(`${group}.${value}` as "devoir.envoye")}
    </Notice>
  ));
}

async function StudentFollowUp({ params }: { params: Params }) {
  const { id } = await params;
  const [view, t, tNav] = await Promise.all([getTutorStudent(id), getTranslations("tutoring.student"), getTranslations("nav")]);
  if (!view) {
    return (
      <>
        <Breadcrumb items={[{ label: tNav("students"), href: "/prof/eleves" }, { label: t("metaTitle") }]} />
        <Notice tone="info">{t("notLinked")}</Notice>
      </>
    );
  }
  const [assignments, next] = await Promise.all([getAssignments(id), getUpcomingSessions(id)]);
  const back = `/prof/eleves/${id}`;

  return (
    <>
      <Breadcrumb items={[{ label: tNav("students"), href: "/prof/eleves" }, { label: view.student.name }]} />
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{view.student.name}</h1>
        <LevelBadge code={view.student.levelCode}>{view.student.levelName}</LevelBadge>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3" aria-label={t("subjectsTitle")}>
        <StatCard icon={<Trophy className="size-5" aria-hidden />} iconClassName="bg-brand-50 text-brand-700" label={t("average")} value={formatScore(view.stats.average20)} />
        <StatCard icon={<ClipboardCheck className="size-5" aria-hidden />} iconClassName="bg-info-50 text-info-700" label={t("quizzes")} value={String(view.stats.quizzesTaken)} />
        <StatCard
          icon={<BookCheck className="size-5" aria-hidden />}
          iconClassName="bg-success-50 text-success-700"
          label={t("chapters")}
          value={String(view.stats.chaptersCompleted)}
          suffix={`/${view.stats.chaptersTotal}`}
        />
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <SectionCard id="moyennes-titre" title={t("subjectsTitle")}>
            {view.subjects.length === 0 ? (
              <p className="text-sm text-ink-muted">{t("noResults")}</p>
            ) : (
              <ul className="space-y-3">
                {view.subjects.map((s) => (
                  <li key={s.code} className="flex items-center gap-3 text-sm">
                    <SubjectIcon code={s.code} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">{s.name}</span>
                      <span className="block text-xs text-ink-muted">{t("attempts", { count: s.attempts })}</span>
                    </span>
                    <span className="font-semibold text-ink">{formatScore(s.average20)}</span>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard id="resultats-titre" title={t("resultsTitle")}>
            {view.results.length === 0 ? (
              <p className="text-sm text-ink-muted">{t("noResults")}</p>
            ) : (
              <ul className="divide-y divide-line">
                {view.results.map((r) => (
                  <li key={`${r.title}-${r.submittedAt}`} className="flex items-center gap-3 py-2.5 text-sm">
                    <SubjectIcon code={r.subjectCode} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-ink">{r.title}</span>
                      <span className="block text-xs text-ink-muted">{formatDate(r.submittedAt)}</span>
                    </span>
                    <span className="font-semibold text-ink">{formatScore(r.score20)}</span>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard id="devoirs-titre" title={t("assignmentsTitle")}>
            <form action={createAssignmentAction.bind(null, id)} className="space-y-3">
              <div>
                <label htmlFor="devoir-titre" className="text-sm font-medium text-ink">
                  {t("assignmentTitleLabel")}
                </label>
                <input id="devoir-titre" name="title" required maxLength={120} className={`${INPUT_CLASS} mt-1.5`} />
              </div>
              <div>
                <label htmlFor="devoir-consignes" className="text-sm font-medium text-ink">
                  {t("instructionsLabel")}
                </label>
                <textarea id="devoir-consignes" name="instructions" rows={3} maxLength={4000} className={`${TEXTAREA_CLASS} mt-1.5`} />
              </div>
              <div>
                <label htmlFor="devoir-date" className="text-sm font-medium text-ink">
                  {t("dueLabel")}
                </label>
                <input id="devoir-date" name="dueOn" type="date" className={`${INPUT_CLASS} mt-1.5`} />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                <Send className="size-4" aria-hidden />
                {t("send")}
              </Button>
            </form>
            {assignments.length === 0 ? (
              <p className="mt-4 text-sm text-ink-muted">{t("noAssignments")}</p>
            ) : (
              <ul className="mt-4 divide-y divide-line border-t border-line">
                {assignments.map((a) => (
                  <li key={a.id} className="flex items-start gap-3 py-3">
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">{a.title}</span>
                      {a.instructions ? <span className="mt-0.5 block whitespace-pre-line text-sm text-ink-muted">{a.instructions}</span> : null}
                      <span className="mt-1.5 flex flex-wrap items-center gap-2">
                        {a.doneAt ? (
                          <Badge tone="success" icon={CircleCheck}>
                            {t("done")}
                          </Badge>
                        ) : (
                          <Badge tone="idle" icon={CircleDashed}>
                            {t("todo")}
                          </Badge>
                        )}
                        {a.dueOn ? <span className="text-xs text-ink-muted">{t("due", { date: formatDate(a.dueOn) })}</span> : null}
                      </span>
                    </span>
                    <form action={deleteAssignmentAction.bind(null, a.id, id)}>
                      <Button type="submit" variant="ghost" size="sm" aria-label={`${t("delete")} : ${a.title}`}>
                        <Trash2 className="size-4" aria-hidden />
                      </Button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard id="cours-titre" title={t("sessionsTitle")}>
            <form action={scheduleSessionAction.bind(null, id)} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="cours-date" className="text-sm font-medium text-ink">
                    {t("dateLabel")}
                  </label>
                  <input id="cours-date" name="date" type="date" required className={`${INPUT_CLASS} mt-1.5`} />
                </div>
                <div>
                  <label htmlFor="cours-heure" className="text-sm font-medium text-ink">
                    {t("timeLabel")}
                  </label>
                  <input id="cours-heure" name="time" type="time" required className={`${INPUT_CLASS} mt-1.5`} />
                </div>
              </div>
              <div>
                <label htmlFor="cours-duree" className="text-sm font-medium text-ink">
                  {t("durationLabel")}
                </label>
                <select id="cours-duree" name="duration" defaultValue="60" className={`${INPUT_CLASS} mt-1.5`}>
                  {[30, 45, 60, 90, 120].map((m) => (
                    <option key={m} value={m}>
                      {t("minutes", { count: m })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cours-sujet" className="text-sm font-medium text-ink">
                  {t("topicLabel")}
                </label>
                <input id="cours-sujet" name="topic" required maxLength={120} className={`${INPUT_CLASS} mt-1.5`} />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                <CalendarPlus className="size-4" aria-hidden />
                {t("schedule")}
              </Button>
            </form>
            {next.length === 0 ? (
              <p className="mt-4 text-sm text-ink-muted">{t("noSessions")}</p>
            ) : (
              <ul className="mt-4 divide-y divide-line border-t border-line">
                {next.map((s) => (
                  <li key={s.id} className="flex items-start gap-3 py-3">
                    <Video className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">{s.topic}</span>
                      <span className="block text-sm text-ink-muted">
                        {formatDateTime(s.startsAt)} · {t("minutes", { count: s.durationMin })}
                      </span>
                    </span>
                    <form action={cancelSessionAction.bind(null, s.id)}>
                      <input type="hidden" name="back" value={back} />
                      <Button type="submit" variant="ghost" size="sm" aria-label={`${t("cancel")} : ${s.topic}`}>
                        <X className="size-4" aria-hidden />
                      </Button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </SectionCard>

          <SectionCard id="message-titre" title={t("messageTitle")} subtitle={t("messageHint")}>
            <form action={messageStudentAction.bind(null, id)} className="space-y-3">
              <label htmlFor="message-eleve" className="sr-only">
                {t("messageLabel")}
              </label>
              <textarea id="message-eleve" name="message" required rows={3} maxLength={1000} className={TEXTAREA_CLASS} />
              <Button type="submit" variant="outline" className="w-full sm:w-auto">
                <Send className="size-4" aria-hidden />
                {t("sendMessage")}
              </Button>
            </form>
          </SectionCard>

          <SectionCard id="fin-titre" title={t("endTitle")} subtitle={t("endBody")}>
            <form action={stopFollowingStudentAction.bind(null, id)}>
              <Button type="submit" variant="ghost" className="text-danger-700">
                <UserMinus className="size-4" aria-hidden />
                {t("end")}
              </Button>
            </form>
          </SectionCard>
        </div>
      </div>
    </>
  );
}

export default function TutorStudentPage({ params, searchParams }: PageProps<"/prof/eleves/[id]">) {
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <Suspense fallback={null}>
        <ActionNotices searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <StudentFollowUp params={params} />
      </Suspense>
    </PageContainer>
  );
}
