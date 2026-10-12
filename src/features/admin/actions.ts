"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/features/account/guards";
import { requireIdentity } from "@/features/account/session";
import { findLessonById } from "@/features/curriculum/data";
import { signedDocumentUrl } from "@/features/tutors/supabase";
import { isSupabaseConfigured } from "@/lib/env";
import { sanitizeLessonHtml } from "@/lib/sanitize";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EXAM_SESSIONS } from "@/mocks/exams";
import { logAudit, mockState } from "@/mocks/progress-store";
import { DEMO_ADMIN } from "@/mocks/users";

const ADMIN_NAME = `${DEMO_ADMIN.firstName} ${DEMO_ADMIN.lastName}`;

/** RPC review_tutor : statut, motif, notification du répétiteur, journal d'audit. */
export async function reviewTutorAction(tutorId: string, decision: "approved" | "rejected" | "suspended", formData: FormData) {
  await requireRole("admin");
  const reason = String(formData.get("reason") ?? "").trim().slice(0, 300);
  if (decision === "rejected" && !reason) redirect(`/admin/repetiteurs/${tutorId}?erreur=motif`);

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("review_tutor", { p_tutor: tutorId, p_decision: decision, p_reason: reason || undefined });
    if (error) redirect(`/admin/repetiteurs/${tutorId}?erreur=decision`);
    updateTag("tutors");
    redirect(`/admin/repetiteurs/${tutorId}?decision=${decision}`);
  }

  mockState.tutorStatuses.set(tutorId, decision);
  if (decision === "rejected") mockState.tutorRejections.set(tutorId, reason);
  else mockState.tutorRejections.delete(tutorId);
  logAudit(ADMIN_NAME, `répétiteur : ${decision}`, tutorId);
  redirect(`/admin/repetiteurs/${tutorId}?decision=${decision}`);
}

/** Pièce d'un répétiteur : lien signé de 5 minutes, consultation inscrite au journal d'audit. */
export async function openTutorDocumentAction(tutorId: string, storagePath: string) {
  await requireRole("admin");
  if (!isSupabaseConfigured() || !storagePath.startsWith(`${tutorId}/`)) redirect(`/admin/repetiteurs/${tutorId}`);
  const url = await signedDocumentUrl(storagePath);
  if (!url) redirect(`/admin/repetiteurs/${tutorId}?erreur=piece`);
  const supabase = await createSupabaseServerClient();
  await supabase.rpc("admin_log", { p_action: "consultation des pièces", p_entity_type: "tutor", p_entity_id: tutorId });
  redirect(url);
}

export async function handleReportAction(reportId: string) {
  await requireRole("admin");
  if (isSupabaseConfigured()) {
    const { userId } = await requireIdentity();
    const supabase = await createSupabaseServerClient();
    await supabase
      .from("reports")
      .update({ status: "handled", handled_by: userId, handled_at: new Date().toISOString() })
      .eq("id", reportId);
    await supabase.rpc("admin_log", { p_action: "signalement traité", p_entity_type: "report", p_entity_id: reportId });
    refresh();
    return;
  }
  mockState.handledReports.add(reportId);
  logAudit(ADMIN_NAME, "signalement traité", reportId);
  refresh();
}

/** Les dates saisies ici alimentent le compte à rebours des élèves. */
export async function updateExamSessionAction(sessionId: string, formData: FormData) {
  await requireRole("admin");
  const startsOn = String(formData.get("startsOn") ?? "");
  const isOfficial = formData.get("official") === "on";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startsOn)) redirect("/admin/examens?erreur=date");

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("exam_sessions")
      .update({ starts_on: startsOn, is_official: isOfficial })
      .eq("id", sessionId)
      .select("id");
    if (error || !data?.length) redirect("/admin/examens?erreur=date");
    await supabase.rpc("admin_log", {
      p_action: `date d'examen : ${startsOn}`,
      p_entity_type: "exam_session",
      p_entity_id: sessionId,
    });
    updateTag("exam-sessions");
    redirect("/admin/examens?enregistre=1");
  }

  if (!EXAM_SESSIONS.some((s) => s.id === sessionId)) redirect("/admin/examens?erreur=date");
  mockState.examDates.set(sessionId, { startsOn, isOfficial });
  logAudit(ADMIN_NAME, `date d'examen : ${startsOn}`, sessionId);
  redirect("/admin/examens?enregistre=1");
}

/** Corps de leçon : HTML assaini côté serveur par liste blanche (sanitize-html). */
export async function saveLessonBodyAction(lessonId: string, formData: FormData) {
  await requireRole("admin");
  const exists = Boolean(await findLessonById(lessonId));
  const body = sanitizeLessonHtml(String(formData.get("body") ?? "").slice(0, 20_000));
  const back = `/admin/contenus/lecons/${encodeURIComponent(lessonId)}`;
  if (!exists || !body.trim()) redirect(`${back}?erreur=1`);

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("admin_save_lesson_body", { p_lesson: lessonId, p_html: body });
    if (error) redirect(`${back}?erreur=1`);
    redirect(`${back}?enregistre=1`);
  }

  mockState.lessonBodyOverrides.set(lessonId, body);
  logAudit(ADMIN_NAME, "leçon modifiée", lessonId);
  redirect(`${back}?enregistre=1`);
}
