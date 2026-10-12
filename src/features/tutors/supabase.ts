import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  SubjectCode,
  TeachingMode,
  TutorCard,
  TutorDocumentType,
  TutorFilters,
  TutorProfile,
  TutorReviewItem,
  TutorStatus,
} from "@/types/domain";

// Lecture Supabase des répétiteurs : annuaire (search_tutors), fiche (get_tutor_profile),
// dossier de vérification (tutor_documents, Storage privé).

export const TUTOR_DOCUMENTS_BUCKET = "tutor-documents";

export async function searchTutorsRemote(filters: TutorFilters): Promise<TutorCard[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("search_tutors", {
    p_subject: filters.subject,
    p_level: filters.level,
    p_city: filters.city,
    p_mode: filters.mode,
    p_price_max: filters.priceMax,
    p_min_rating: filters.minRating,
    p_sort: filters.sort,
    p_limit: 50,
  });
  if (error) throw new Error(`annuaire : ${error.message}`);
  return data.map((t) => ({
    id: t.user_id,
    displayName: t.display_name,
    photoUrl: null,
    headline: t.headline,
    subjects: t.subjects as SubjectCode[],
    levels: t.levels,
    city: t.city ?? "",
    neighborhood: t.neighborhood,
    mode: t.mode,
    hourlyRateFcfa: t.hourly_rate_fcfa,
    ratingAvg: t.rating_avg === null ? null : Number(t.rating_avg),
    ratingCount: t.rating_count,
    verified: true,
  }));
}

interface RawTutorProfile {
  id: string;
  display_name: string;
  status: TutorStatus | "draft";
  headline: string;
  bio: string;
  years_experience: number;
  hourly_rate_fcfa: number;
  mode: TeachingMode;
  city: string | null;
  neighborhood: string | null;
  whatsapp_opt_in: boolean;
  rating_avg: number | string | null;
  rating_count: number;
  submitted_at: string | null;
  rejection_reason: string | null;
  subjects: SubjectCode[];
  levels: string[];
  qualifications: { title: string; institution: string; year: number | null }[];
  availability: { weekday: number; start: string; end: string }[];
}

export interface RemoteTutorProfile extends TutorProfile {
  status: RawTutorProfile["status"];
  submittedAt: string | null;
  rejectionReason: string | null;
}

function toProfile(t: RawTutorProfile): RemoteTutorProfile {
  return {
    id: t.id,
    displayName: t.display_name,
    photoUrl: null,
    headline: t.headline,
    subjects: t.subjects,
    levels: t.levels,
    city: t.city ?? "",
    neighborhood: t.neighborhood,
    mode: t.mode,
    hourlyRateFcfa: t.hourly_rate_fcfa,
    ratingAvg: t.rating_avg === null ? null : Number(t.rating_avg),
    ratingCount: t.rating_count,
    verified: true,
    bio: t.bio,
    yearsExperience: t.years_experience,
    qualifications: t.qualifications.map((q) => ({ title: q.title, institution: q.institution, year: q.year ?? 0 })),
    availability: t.availability,
    whatsappOptIn: t.whatsapp_opt_in,
    status: t.status,
    submittedAt: t.submitted_at,
    rejectionReason: t.rejection_reason,
  };
}

/** Fiche d'un répétiteur : publique s'il est approuvé ; sinon visible par lui-même et l'admin. */
export const fetchTutorProfile = cache(async (tutorId: string): Promise<RemoteTutorProfile | null> => {
  if (!/^[0-9a-f-]{36}$/i.test(tutorId)) return null;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_tutor_profile", { p_tutor: tutorId });
  if (error || !data) return null;
  return toProfile(data as unknown as RawTutorProfile);
});

/** Répétiteurs publiés (prérendu des fiches) : contenu public, mis en cache. */
export async function loadPublishedTutorIds(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("tutors");
  const { data } = await createSupabasePublicClient().rpc("search_tutors", { p_limit: 50 });
  return (data ?? []).map((t) => t.user_id);
}

/** Nom d'un répétiteur publié, pour le titre de sa page (contenu public). */
export async function loadTutorName(tutorId: string): Promise<string | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("tutors");
  if (!/^[0-9a-f-]{36}$/i.test(tutorId)) return undefined;
  const { data } = await createSupabasePublicClient().rpc("get_tutor_profile", { p_tutor: tutorId });
  return (data as { display_name?: string } | null)?.display_name;
}

/** Nombre de familles qui ont écrit au répétiteur. */
export async function countTutorConversations(tutorId: string): Promise<number> {
  const supabase = await createSupabaseServerClient();
  const { count } = await supabase.from("conversations").select("id", { count: "exact", head: true }).eq("tutor_id", tutorId);
  return count ?? 0;
}

function fileName(path: string) {
  return path.split("/").at(-1) ?? path;
}

/** Dossiers de vérification (admin) : tous les répétiteurs ayant soumis leur dossier. */
export async function fetchTutorReviewItems(onlyTutor?: string): Promise<TutorReviewItem[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("tutor_profiles")
    .select(
      "user_id, status, mode, hourly_rate_fcfa, submitted_at, rejection_reason, created_at, profiles!tutor_profiles_user_id_fkey(first_name, last_name), cities(name), tutor_subjects(subjects(code)), tutor_documents(id, type, storage_path, status)",
    )
    .order("submitted_at", { ascending: false, nullsFirst: false });
  query = onlyTutor ? query.eq("user_id", onlyTutor) : query.neq("status", "draft");
  const { data, error } = await query;
  if (error) throw new Error(`vérification : ${error.message}`);
  return data.map((t) => ({
    id: t.user_id,
    displayName: t.profiles ? `${t.profiles.first_name} ${t.profiles.last_name}` : "",
    subjects: t.tutor_subjects.map((s) => s.subjects.code as SubjectCode),
    city: t.cities?.name ?? "",
    mode: t.mode,
    hourlyRateFcfa: t.hourly_rate_fcfa,
    submittedAt: t.submitted_at ?? t.created_at,
    status: t.status,
    rejectionReason: t.rejection_reason,
    documents: t.tutor_documents.map((d) => ({
      id: d.id,
      type: d.type as TutorDocumentType,
      fileName: fileName(d.storage_path),
      storagePath: d.storage_path,
      status: d.status as "pending" | "accepted" | "rejected",
    })),
  }));
}

/** Lien temporaire (5 min) vers une pièce : réservé à l'admin par les règles du Storage. */
export async function signedDocumentUrl(storagePath: string): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.storage.from(TUTOR_DOCUMENTS_BUCKET).createSignedUrl(storagePath, 300);
  return data?.signedUrl ?? null;
}
