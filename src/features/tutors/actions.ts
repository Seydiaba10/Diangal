"use server";

import { redirect } from "next/navigation";
import { requireRole } from "@/features/account/guards";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { isLevelCode } from "@/lib/levels";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logAudit, mockState } from "@/mocks/progress-store";
import type { SubjectCode, TeachingMode, TutorDocumentType } from "@/types/domain";
import { TUTOR_DOCUMENTS_BUCKET } from "./supabase";

const SUBJECTS: SubjectCode[] = ["MATH", "FR", "ANG", "HG", "SVT", "PC", "EC", "LV2", "PHILO", "EPS"];
const MODES: TeachingMode[] = ["online", "home", "both"];
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const DOCUMENT_TYPES: TutorDocumentType[] = ["cni", "passport", "diploma", "criminal_record"];
const DOCUMENT_MIME = ["application/pdf", "image/jpeg", "image/png"];
const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;

/** Profil du répétiteur (RLS : il ne modifie que son profil, jamais son statut ni sa note). */
export async function saveTutorProfileAction(formData: FormData) {
  await requireRole("tutor");
  const headline = String(formData.get("headline") ?? "").trim().slice(0, 120);
  const bio = String(formData.get("bio") ?? "").trim().slice(0, 800);
  const rate = Number(formData.get("rate"));
  const subjects = formData.getAll("subjects").map(String).filter((s): s is SubjectCode => SUBJECTS.includes(s as SubjectCode));
  const levels = formData.getAll("levels").map(String).filter(isLevelCode);
  const mode = String(formData.get("mode")) as TeachingMode;

  if (!headline || subjects.length === 0 || levels.length === 0 || !MODES.includes(mode) || !(rate >= 1000 && rate <= 50000)) {
    redirect("/prof/profil?erreur=1");
  }
  const hourlyRateFcfa = Math.round(rate / 100) * 100;
  const whatsappOptIn = formData.get("whatsapp") === "on";

  if (isSupabaseConfigured()) {
    const { userId } = await requireIdentity();
    const supabase = await createSupabaseServerClient();
    const [{ data: subjectRows }, { data: levelRows }] = await Promise.all([
      supabase.from("subjects").select("id, code").in("code", subjects),
      supabase.from("levels").select("id, code").in("code", levels),
    ]);
    const { error } = await supabase
      .from("tutor_profiles")
      .update({ headline, bio, hourly_rate_fcfa: hourlyRateFcfa, mode, whatsapp_opt_in: whatsappOptIn })
      .eq("user_id", userId);
    if (error || !subjectRows?.length || !levelRows?.length) redirect("/prof/profil?erreur=1");
    // Matières et niveaux : on ajoute d'abord les nouveaux, puis on retire les autres. Un échec
    // en cours de route ne vide donc jamais la liste (RLS : seulement les siennes).
    const subjectIds = subjectRows.map((s) => s.id);
    const levelIds = levelRows.map((l) => l.id);
    const added = await Promise.all([
      supabase
        .from("tutor_subjects")
        .upsert(subjectIds.map((id) => ({ tutor_id: userId, subject_id: id })), { onConflict: "tutor_id,subject_id", ignoreDuplicates: true }),
      supabase
        .from("tutor_levels")
        .upsert(levelIds.map((id) => ({ tutor_id: userId, level_id: id })), { onConflict: "tutor_id,level_id", ignoreDuplicates: true }),
    ]);
    if (added.some((r) => r.error)) redirect("/prof/profil?erreur=1");
    const removed = await Promise.all([
      supabase.from("tutor_subjects").delete().eq("tutor_id", userId).not("subject_id", "in", `(${subjectIds.join(",")})`),
      supabase.from("tutor_levels").delete().eq("tutor_id", userId).not("level_id", "in", `(${levelIds.join(",")})`),
    ]);
    if (removed.some((r) => r.error)) redirect("/prof/profil?erreur=1");
    redirect("/prof/profil?enregistre=1");
  }

  mockState.tutorProfileEdits = {
    ...mockState.tutorProfileEdits,
    headline,
    bio,
    hourlyRateFcfa,
    subjects,
    levels,
    mode,
    whatsappOptIn,
  };
  logAudit("Mamadou Diallo", "mise à jour du profil", "Profil répétiteur");
  redirect("/prof/profil?enregistre=1");
}

/** Un créneau par jour : la semaine type du répétiteur. */
export async function saveAvailabilityAction(formData: FormData) {
  await requireRole("tutor");
  const availability = [1, 2, 3, 4, 5, 6, 7].flatMap((weekday) => {
    if (formData.get(`d${weekday}-on`) !== "on") return [];
    const start = String(formData.get(`d${weekday}-start`));
    const end = String(formData.get(`d${weekday}-end`));
    return TIME.test(start) && TIME.test(end) && start < end ? [{ weekday, start, end }] : [];
  });

  if (isSupabaseConfigured()) {
    const { userId } = await requireIdentity();
    const supabase = await createSupabaseServerClient();
    // Nouveaux créneaux d'abord, puis suppression des anciens : un échec ne vide jamais la semaine.
    const { data: previous, error: readError } = await supabase.from("tutor_availability").select("id").eq("tutor_id", userId);
    if (readError || !previous) redirect("/prof/disponibilites?erreur=1");
    if (availability.length) {
      const { error } = await supabase
        .from("tutor_availability")
        .insert(availability.map((a) => ({ tutor_id: userId, weekday: a.weekday, start_time: a.start, end_time: a.end })));
      if (error) redirect("/prof/disponibilites?erreur=1");
    }
    if (previous.length) {
      const { error } = await supabase
        .from("tutor_availability")
        .delete()
        .in("id", previous.map((r) => r.id));
      if (error) redirect("/prof/disponibilites?erreur=1");
    }
    redirect("/prof/disponibilites?enregistre=1");
  }

  mockState.tutorProfileEdits = { ...mockState.tutorProfileEdits, availability };
  redirect("/prof/disponibilites?enregistre=1");
}

/**
 * Pièce justificative (CNI, passeport, diplôme, casier) : envoyée dans le Storage privé
 * « tutor-documents », dossier du répétiteur. Lisible par lui et par l'admin seulement.
 */
export async function uploadTutorDocumentAction(formData: FormData) {
  await requireRole("tutor");
  const type = String(formData.get("type")) as TutorDocumentType;
  const file = formData.get("file");
  if (!isSupabaseConfigured()) redirect("/prof/verification?erreur=demo");
  if (!DOCUMENT_TYPES.includes(type) || !(file instanceof File) || file.size === 0) redirect("/prof/verification?erreur=fichier");
  if (file.size > MAX_DOCUMENT_BYTES || !DOCUMENT_MIME.includes(file.type)) redirect("/prof/verification?erreur=format");

  const { userId } = await requireIdentity();
  const supabase = await createSupabaseServerClient();
  const extension = file.type === "application/pdf" ? "pdf" : file.type === "image/png" ? "png" : "jpg";
  const path = `${userId}/${type}-${Date.now()}.${extension}`;
  const { error: uploadError } = await supabase.storage
    .from(TUTOR_DOCUMENTS_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (uploadError) redirect("/prof/verification?erreur=envoi");
  const { error } = await supabase.from("tutor_documents").insert({ tutor_id: userId, type, storage_path: path });
  if (error) redirect("/prof/verification?erreur=envoi");
  redirect("/prof/verification?envoye=1");
}

/** Envoi du dossier à la vérification (profil complet + pièce d'identité + diplôme). */
export async function submitTutorForReviewAction() {
  await requireRole("tutor");
  if (!isSupabaseConfigured()) redirect("/prof/verification?erreur=demo");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("submit_tutor_for_review");
  if (error?.message.includes("profile_incomplete")) redirect("/prof/verification?erreur=incomplet");
  if (error) redirect("/prof/verification?erreur=envoi");
  redirect("/prof/verification?soumis=1");
}
