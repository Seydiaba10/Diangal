"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/features/account/guards";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { safeInternalPath } from "@/lib/safe-path";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mockState } from "@/mocks/progress-store";
import { DEMO_STUDENT_LINK_CODE, DEMO_STUDENT_ID, DEMO_TUTOR_ID } from "@/mocks/users";

// Suivi d'élèves par un répétiteur. Chaque droit est vérifié en base (RPC SECURITY DEFINER).

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const DURATIONS = [30, 45, 60, 90, 120];

function studentPage(studentId: string, params: Record<string, string>) {
  return `/prof/eleves/${encodeURIComponent(studentId)}?${new URLSearchParams(params)}`;
}

/** Le répétiteur invite un élève avec son code élève ; un parent (ou l'élève majeur) acceptera. */
export async function inviteStudentAction(formData: FormData) {
  await requireRole("tutor");
  const code = String(formData.get("code") ?? "").trim();
  if (!code) redirect("/prof/eleves?invitation=code");
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("invite_student_by_code", { p_code: code });
    if (error?.message.includes("tutor_not_approved")) redirect("/prof/eleves?invitation=verification");
    if (error) redirect("/prof/eleves?invitation=code");
    const result = data as { firstName: string; alreadyLinked: boolean };
    redirect(`/prof/eleves?${new URLSearchParams({ invitation: result.alreadyLinked ? "deja" : "envoyee", prenom: result.firstName })}`);
  }
  if (code.replace(/[^A-Za-z0-9]/g, "").toUpperCase() !== DEMO_STUDENT_LINK_CODE.replace(/[^A-Za-z0-9]/g, "")) {
    redirect("/prof/eleves?invitation=code");
  }
  redirect(`/prof/eleves?${new URLSearchParams({ invitation: "deja", prenom: "Awa" })}`);
}

/** Réponse d'un parent (ou de l'élève majeur) à une invitation. */
export async function answerTutorInviteAction(tutorId: string, studentId: string, accept: boolean, formData: FormData) {
  const back = safeInternalPath(formData.get("back")) ?? "/parent";
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("answer_tutor_invite", { p_tutor: tutorId, p_student: studentId, p_accept: accept });
    redirect(`${back}${back.includes("?") ? "&" : "?"}repetiteur=${error ? "erreur" : accept ? "accepte" : "refuse"}`);
  }
  const link = mockState.tutorLinks.get(`${tutorId}:${studentId}`);
  if (link?.status === "pending") link.status = accept ? "active" : "declined";
  redirect(`${back}${back.includes("?") ? "&" : "?"}repetiteur=${accept ? "accepte" : "refuse"}`);
}

/** Fin du suivi : par le répétiteur, un parent lié ou l'élève majeur. */
export async function endTutorLinkAction(tutorId: string, studentId: string, formData: FormData) {
  const back = safeInternalPath(formData.get("back")) ?? "/";
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("end_tutor_link", { p_tutor: tutorId, p_student: studentId });
    redirect(`${back}${back.includes("?") ? "&" : "?"}repetiteur=${error ? "erreur" : "fin"}`);
  }
  const link = mockState.tutorLinks.get(`${tutorId}:${studentId}`);
  if (link) link.status = "revoked";
  redirect(`${back}${back.includes("?") ? "&" : "?"}repetiteur=fin`);
}

/** Le répétiteur connecté arrête de suivre un élève. */
export async function stopFollowingStudentAction(studentId: string) {
  await requireRole("tutor");
  if (isSupabaseConfigured()) {
    const { userId } = await requireIdentity();
    const supabase = await createSupabaseServerClient();
    await supabase.rpc("end_tutor_link", { p_tutor: userId, p_student: studentId });
  } else {
    const link = mockState.tutorLinks.get(`${DEMO_TUTOR_ID}:${studentId}`);
    if (link) link.status = "revoked";
  }
  redirect("/prof/eleves");
}

// ── Devoirs ─────────────────────────────────────────────────────────────────

export async function createAssignmentAction(studentId: string, formData: FormData) {
  await requireRole("tutor");
  const title = String(formData.get("title") ?? "").trim().slice(0, 120);
  const instructions = String(formData.get("instructions") ?? "").trim().slice(0, 4000);
  const dueOn = String(formData.get("dueOn") ?? "");
  if (!title || (dueOn && !DATE.test(dueOn))) redirect(studentPage(studentId, { devoir: "erreur" }));

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("create_tutor_assignment", {
      p_student: studentId,
      p_title: title,
      p_instructions: instructions,
      p_due_on: dueOn || undefined,
    });
    if (error?.message.includes("due_date_past")) redirect(studentPage(studentId, { devoir: "date" }));
    redirect(studentPage(studentId, { devoir: error ? "erreur" : "envoye" }));
  }
  mockState.tutorAssignments.unshift({
    id: crypto.randomUUID(),
    tutorId: DEMO_TUTOR_ID,
    studentId,
    title,
    instructions,
    dueOn: dueOn || null,
    doneAt: null,
    createdAt: new Date().toISOString(),
  });
  redirect(studentPage(studentId, { devoir: "envoye" }));
}

/** L'élève coche un devoir fait (ou le décoche). */
export async function setAssignmentDoneAction(assignmentId: string, done: boolean) {
  await requireRole("student");
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.rpc("set_tutor_assignment_done", { p_assignment: assignmentId, p_done: done });
  } else {
    const assignment = mockState.tutorAssignments.find((a) => a.id === assignmentId && a.studentId === DEMO_STUDENT_ID);
    if (assignment) assignment.doneAt = done ? new Date().toISOString() : null;
  }
  refresh();
}

export async function deleteAssignmentAction(assignmentId: string, studentId: string) {
  await requireRole("tutor");
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.rpc("delete_tutor_assignment", { p_assignment: assignmentId });
  } else {
    mockState.tutorAssignments = mockState.tutorAssignments.filter((a) => a.id !== assignmentId);
  }
  redirect(studentPage(studentId, { devoir: "supprime" }));
}

// ── Cours en ligne ──────────────────────────────────────────────────────────

/** Date et heure saisies en heure de Dakar (UTC+0, sans heure d'été). */
export async function scheduleSessionAction(studentId: string, formData: FormData) {
  await requireRole("tutor");
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  const duration = Number(formData.get("duration"));
  const topic = String(formData.get("topic") ?? "").trim().slice(0, 120);
  if (!DATE.test(date) || !TIME.test(time) || !DURATIONS.includes(duration) || !topic) {
    redirect(studentPage(studentId, { cours: "erreur" }));
  }
  const startsAt = new Date(`${date}T${time}:00Z`);
  if (startsAt.getTime() <= Date.now()) redirect(studentPage(studentId, { cours: "passe" }));

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("schedule_tutor_session", {
      p_student: studentId,
      p_starts_at: startsAt.toISOString(),
      p_duration_min: duration,
      p_topic: topic,
    });
    redirect(studentPage(studentId, { cours: error ? "erreur" : "planifie" }));
  }
  mockState.tutorSessions.push({
    id: crypto.randomUUID(),
    tutorId: DEMO_TUTOR_ID,
    studentId,
    startsAt: startsAt.toISOString(),
    durationMin: duration,
    topic,
    status: "planned",
  });
  redirect(studentPage(studentId, { cours: "planifie" }));
}

export async function cancelSessionAction(sessionId: string, formData: FormData) {
  await requireRole("tutor");
  const back = safeInternalPath(formData.get("back")) ?? "/prof/cours-en-ligne";
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.rpc("cancel_tutor_session", { p_session: sessionId });
  } else {
    const session = mockState.tutorSessions.find((s) => s.id === sessionId);
    if (session) session.status = "cancelled";
  }
  redirect(`${back}${back.includes("?") ? "&" : "?"}cours=annule`);
}

// ── Message ─────────────────────────────────────────────────────────────────

export async function messageStudentAction(studentId: string, formData: FormData) {
  await requireRole("tutor");
  const body = String(formData.get("message") ?? "").trim().slice(0, 1000);
  if (!body) redirect(studentPage(studentId, { message: "vide" }));
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("tutor_message_student", { p_student: studentId, p_body: body });
    if (error || !data) redirect(studentPage(studentId, { message: "erreur" }));
    redirect(`/messages/${data}`);
  }
  redirect("/messages");
}
