"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/features/account/guards";
import { CHAPTERS_3E } from "@/mocks/curriculum-3e";
import { EXAM_SESSIONS } from "@/mocks/exams";
import { logAudit, mockState } from "@/mocks/progress-store";
import { DEMO_ADMIN } from "@/mocks/users";

const ADMIN_NAME = `${DEMO_ADMIN.firstName} ${DEMO_ADMIN.lastName}`;

/** Phase 3 : RPC review_tutor (statut, motif, notification, journal d'audit). */
export async function reviewTutorAction(tutorId: string, decision: "approved" | "rejected" | "suspended", formData: FormData) {
  await requireRole("admin");
  const reason = String(formData.get("reason") ?? "").trim().slice(0, 300);
  if (decision === "rejected" && !reason) redirect(`/admin/repetiteurs/${tutorId}?erreur=motif`);
  mockState.tutorStatuses.set(tutorId, decision);
  if (decision === "rejected") mockState.tutorRejections.set(tutorId, reason);
  else mockState.tutorRejections.delete(tutorId);
  logAudit(ADMIN_NAME, `répétiteur : ${decision}`, tutorId);
  redirect(`/admin/repetiteurs/${tutorId}?decision=${decision}`);
}

export async function handleReportAction(reportId: string) {
  await requireRole("admin");
  mockState.handledReports.add(reportId);
  logAudit(ADMIN_NAME, "signalement traité", reportId);
  refresh();
}

/** Les dates saisies ici alimentent le compte à rebours des élèves. */
export async function updateExamSessionAction(sessionId: string, formData: FormData) {
  await requireRole("admin");
  const startsOn = String(formData.get("startsOn") ?? "");
  if (!EXAM_SESSIONS.some((s) => s.id === sessionId) || !/^\d{4}-\d{2}-\d{2}$/.test(startsOn)) {
    redirect("/admin/examens?erreur=date");
  }
  mockState.examDates.set(sessionId, { startsOn, isOfficial: formData.get("official") === "on" });
  logAudit(ADMIN_NAME, `date d'examen : ${startsOn}`, sessionId);
  redirect("/admin/examens?enregistre=1");
}

/** Phase 3 : Markdown + LaTeX converti et assaini (rehype-sanitize) à l'enregistrement. */
export async function saveLessonBodyAction(lessonId: string, formData: FormData) {
  await requireRole("admin");
  const exists = CHAPTERS_3E.some((c) => c.lessons.some((l) => l.id === lessonId));
  const body = String(formData.get("body") ?? "")
    .slice(0, 20_000)
    // Garde-fou minimal de la démo : aucun script ni gestionnaire d'événement.
    .replace(/<\s*(script|iframe|object|embed)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  if (!exists || !body.trim()) redirect(`/admin/contenus/lecons/${encodeURIComponent(lessonId)}?erreur=1`);
  mockState.lessonBodyOverrides.set(lessonId, body);
  logAudit(ADMIN_NAME, "leçon modifiée", lessonId);
  redirect(`/admin/contenus/lecons/${encodeURIComponent(lessonId)}?enregistre=1`);
}
