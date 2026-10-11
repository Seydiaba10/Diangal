"use server";

import { redirect } from "next/navigation";
import { requireRole } from "@/features/account/guards";
import { logAudit, mockState } from "@/mocks/progress-store";
import type { SubjectCode, TeachingMode } from "@/types/domain";

const SUBJECTS: SubjectCode[] = ["MATH", "FR", "ANG", "HG", "SVT", "PC", "EC", "LV2", "PHILO", "EPS"];
const LEVELS = ["CI", "CP", "CE1", "CE2", "CM1", "CM2", "6E", "5E", "4E", "3E", "2NDE", "1RE", "TLE"];
const MODES: TeachingMode[] = ["online", "home", "both"];
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Phase 3 : update de tutor_profiles (RLS : le répétiteur ne modifie que son profil, jamais son statut). */
export async function saveTutorProfileAction(formData: FormData) {
  await requireRole("tutor");
  const headline = String(formData.get("headline") ?? "").trim().slice(0, 120);
  const bio = String(formData.get("bio") ?? "").trim().slice(0, 800);
  const rate = Number(formData.get("rate"));
  const subjects = formData.getAll("subjects").map(String).filter((s): s is SubjectCode => SUBJECTS.includes(s as SubjectCode));
  const levels = formData.getAll("levels").map(String).filter((l) => LEVELS.includes(l));
  const mode = String(formData.get("mode")) as TeachingMode;

  if (!headline || subjects.length === 0 || levels.length === 0 || !MODES.includes(mode) || !(rate >= 1000 && rate <= 50000)) {
    redirect("/prof/profil?erreur=1");
  }
  mockState.tutorProfileEdits = {
    ...mockState.tutorProfileEdits,
    headline,
    bio,
    hourlyRateFcfa: Math.round(rate / 100) * 100,
    subjects,
    levels,
    mode,
    whatsappOptIn: formData.get("whatsapp") === "on",
  };
  logAudit("Mamadou Diallo", "mise à jour du profil", "Profil répétiteur");
  redirect("/prof/profil?enregistre=1");
}

/** Un créneau par jour au maximum dans cette version de démonstration. */
export async function saveAvailabilityAction(formData: FormData) {
  await requireRole("tutor");
  const availability = [1, 2, 3, 4, 5, 6, 7].flatMap((weekday) => {
    if (formData.get(`d${weekday}-on`) !== "on") return [];
    const start = String(formData.get(`d${weekday}-start`));
    const end = String(formData.get(`d${weekday}-end`));
    return TIME.test(start) && TIME.test(end) && start < end ? [{ weekday, start, end }] : [];
  });
  mockState.tutorProfileEdits = { ...mockState.tutorProfileEdits, availability };
  redirect("/prof/disponibilites?enregistre=1");
}
