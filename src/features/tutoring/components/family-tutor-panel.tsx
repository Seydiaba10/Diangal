import { Check, CircleCheck, CircleDashed, ClipboardList, GraduationCap, UserMinus, Video, X } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { formatDate, formatDateTime } from "@/lib/format";
import type { FamilyTutorLink, TutorAssignment, TutorSession } from "@/types/domain";
import { answerTutorInviteAction, endTutorLinkAction, setAssignmentDoneAction } from "../actions";
import { getAssignments, getFamilyTutorLinks, getOwnStudentId, getUpcomingSessions } from "../data";

const NOTICE_KEYS = ["accepte", "refuse", "fin", "erreur"] as const;

/** Message après une réponse à une invitation (paramètre « repetiteur » de l'URL). */
export async function TutorLinkNotice({ value }: { value: string | string[] | undefined }) {
  const key = NOTICE_KEYS.find((k) => k === value);
  if (!key) return null;
  const t = await getTranslations("tutoring.family.notices");
  return <Notice tone={key === "erreur" ? "error" : key === "accepte" ? "success" : "info"}>{t(key)}</Notice>;
}

async function InviteAnswer({ link, back }: { link: FamilyTutorLink; back: string }) {
  const t = await getTranslations("tutoring.family");
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <form action={answerTutorInviteAction.bind(null, link.tutorId, link.studentId, true)}>
        <input type="hidden" name="back" value={back} />
        <Button type="submit" size="sm">
          <Check className="size-4" aria-hidden />
          {t("accept")}
        </Button>
      </form>
      <form action={answerTutorInviteAction.bind(null, link.tutorId, link.studentId, false)}>
        <input type="hidden" name="back" value={back} />
        <Button type="submit" size="sm" variant="outline">
          <X className="size-4" aria-hidden />
          {t("decline")}
        </Button>
      </form>
    </div>
  );
}

function EndLink({ link, back, label }: { link: FamilyTutorLink; back: string; label: string }) {
  return (
    <form action={endTutorLinkAction.bind(null, link.tutorId, link.studentId)} className="mt-2">
      <input type="hidden" name="back" value={back} />
      <Button type="submit" variant="ghost" size="sm" className="text-danger-700">
        <UserMinus className="size-4" aria-hidden />
        {label}
      </Button>
    </form>
  );
}

/** Devoirs du répétiteur : l'élève peut les cocher, le parent les consulte. */
async function AssignmentList({ items, canCheck }: { items: TutorAssignment[]; canCheck: boolean }) {
  const t = await getTranslations("tutoring.family");
  if (items.length === 0) return <p className="text-sm text-ink-muted">{t("noAssignments")}</p>;
  return (
    <ul className="divide-y divide-line">
      {items.map((a) => (
        <li key={a.id} className="flex items-start gap-3 py-3">
          <ClipboardList className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden />
          <span className="min-w-0 flex-1">
            <span className="block font-medium text-ink">{a.title}</span>
            {a.instructions ? <span className="mt-0.5 block whitespace-pre-line text-sm text-ink-muted">{a.instructions}</span> : null}
            <span className="mt-1.5 flex flex-wrap items-center gap-2">
              {a.doneAt ? (
                <Badge tone="success" icon={CircleCheck}>
                  {t("done")}
                </Badge>
              ) : null}
              {a.dueOn ? <span className="text-xs text-ink-muted">{t("due", { date: formatDate(a.dueOn) })}</span> : null}
            </span>
          </span>
          {canCheck ? (
            <form action={setAssignmentDoneAction.bind(null, a.id, !a.doneAt)}>
              <Button type="submit" size="sm" variant={a.doneAt ? "ghost" : "outline"}>
                {a.doneAt ? <CircleDashed className="size-4" aria-hidden /> : <CircleCheck className="size-4" aria-hidden />}
                {a.doneAt ? t("markTodo") : t("markDone")}
              </Button>
            </form>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

async function SessionList({ items }: { items: TutorSession[] }) {
  const t = await getTranslations("tutoring.family");
  if (items.length === 0) return <p className="text-sm text-ink-muted">{t("noSessions")}</p>;
  return (
    <>
      <ul className="divide-y divide-line">
        {items.map((s) => (
          <li key={s.id} className="flex items-start gap-3 py-3">
            <Video className="mt-0.5 size-5 shrink-0 text-brand-700" aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-ink">{s.topic}</span>
              <span className="block text-sm text-ink-muted">{t("sessionLine", { date: formatDateTime(s.startsAt), duration: s.durationMin })}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-ink-subtle">{t("visioSoon")}</p>
    </>
  );
}

/** Parent : répétiteur(s) d'un enfant — invitation à accepter, suivi en cours, devoirs et cours. */
export async function ParentTutorPanel({ studentId, back }: { studentId: string; back: string }) {
  await connection();
  const [links, t] = await Promise.all([getFamilyTutorLinks(), getTranslations("tutoring.family")]);
  const mine = links.filter((l) => l.studentId === studentId);
  if (mine.length === 0) return null;
  const active = mine.some((l) => l.status === "active");
  const [assignments, sessions] = active ? await Promise.all([getAssignments(studentId), getUpcomingSessions(studentId)]) : [[], []];

  return (
    <SectionCard id="repetiteur-titre" title={t("title")}>
      <ul className="space-y-4">
        {mine.map((link) => (
          <li key={link.tutorId} className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 text-sm text-ink">
              <p>
                {link.status === "pending"
                  ? t("inviteParent", { tutor: link.tutorName, child: link.studentName })
                  : t("activeParent", { tutor: link.tutorName, child: link.studentName })}
              </p>
              {link.headline ? <p className="mt-0.5 text-ink-muted">{link.headline}</p> : null}
              {link.canAnswer && link.status === "pending" ? <InviteAnswer link={link} back={back} /> : null}
              {link.canAnswer && link.status === "active" ? <EndLink link={link} back={back} label={t("end")} /> : null}
            </div>
          </li>
        ))}
      </ul>
      {active ? (
        <div className="mt-5 grid grid-cols-1 gap-5 border-t border-line pt-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-ink">{t("assignmentsTitle")}</h3>
            <div className="mt-2">
              <AssignmentList items={assignments} canCheck={false} />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-ink">{t("sessionsTitle")}</h3>
            <div className="mt-2">
              <SessionList items={sessions} />
            </div>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}

/** Élève : son répétiteur, ses devoirs à cocher et ses prochains cours (rien s'il n'en a pas). */
export async function StudentTutorPanel({ back }: { back: string }) {
  await connection();
  const [links, studentId, t] = await Promise.all([getFamilyTutorLinks(), getOwnStudentId(), getTranslations("tutoring.family")]);
  const mine = links.filter((l) => l.studentId === studentId);
  if (mine.length === 0) return null;
  const active = mine.some((l) => l.status === "active");
  const [assignments, sessions] = active ? await Promise.all([getAssignments(studentId), getUpcomingSessions(studentId)]) : [[], []];

  return (
    <SectionCard id="mon-repetiteur-titre" title={t("studentTitle")}>
      <ul className="space-y-4">
        {mine.map((link) => (
          <li key={link.tutorId} className="flex gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1 text-sm text-ink">
              <p>{link.status === "pending" ? t("inviteStudent", { tutor: link.tutorName }) : t("activeStudent", { tutor: link.tutorName })}</p>
              {link.status === "pending" && !link.canAnswer ? <p className="mt-1 font-medium text-premium-700">{t("needsParent")}</p> : null}
              {link.canAnswer && link.status === "pending" ? <InviteAnswer link={link} back={back} /> : null}
              {link.canAnswer && link.status === "active" ? <EndLink link={link} back={back} label={t("end")} /> : null}
            </div>
          </li>
        ))}
      </ul>
      {active ? (
        <div className="mt-5 grid grid-cols-1 gap-5 border-t border-line pt-4 md:grid-cols-2">
          <div>
            <h3 className="font-semibold text-ink">{t("studentAssignmentsTitle")}</h3>
            <div className="mt-2">
              <AssignmentList items={assignments} canCheck />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-ink">{t("sessionsTitle")}</h3>
            <div className="mt-2">
              <SessionList items={sessions} />
            </div>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}
