import { connection } from "next/server";
import { cache } from "react";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { CITY_NAMES } from "@/lib/places";
import { PENDING_TUTOR_DETAILS, PENDING_TUTORS } from "@/mocks/admin";
import { mockState } from "@/mocks/progress-store";
import { MOCK_TUTORS } from "@/mocks/tutors";
import { DEMO_TUTOR_ID } from "@/mocks/users";
import type {
  SubjectCode,
  TutorCard,
  TutorFilters,
  TutorProfile,
  TutorReviewItem,
  TutorSort,
  TutorStatus,
} from "@/types/domain";
import {
  countTutorConversations,
  fetchTutorProfile,
  fetchTutorReviewItems,
  loadPublishedTutorIds,
  loadTutorName,
  searchTutorsRemote,
} from "./supabase";

// Démo : src/mocks. Supabase : RPC search_tutors / get_tutor_profile (répétiteurs approuvés
// uniquement pour le public), tables tutor_profiles / tutor_documents / tutor_availability.

const SUBJECT_CODES: SubjectCode[] = ["MATH", "FR", "ANG", "HG", "SVT", "PC", "EC", "LV2", "PHILO", "EPS"];
const SORTS: TutorSort[] = ["relevance", "price", "rating"];

export const TUTOR_CITIES = CITY_NAMES;
export const PRICE_STEPS = [2000, 3000, 4000, 5000, 10000];

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Lit les filtres depuis l'URL en ignorant toute valeur inconnue. */
export function parseTutorFilters(params: RawParams): TutorFilters {
  const subject = first(params.matiere) as SubjectCode | undefined;
  const mode = first(params.mode);
  const city = first(params.ville);
  const priceMax = Number(first(params.prix));
  const minRating = Number(first(params.note));
  const sort = first(params.tri) as TutorSort | undefined;
  return {
    subject: subject && SUBJECT_CODES.includes(subject) ? subject : undefined,
    level: first(params.niveau) || undefined,
    city: city && TUTOR_CITIES.includes(city) ? city : undefined,
    mode: mode === "online" || mode === "home" ? mode : undefined,
    priceMax: PRICE_STEPS.includes(priceMax) ? priceMax : undefined,
    minRating: minRating >= 4 && minRating <= 5 ? minRating : undefined,
    sort: sort && SORTS.includes(sort) ? sort : "relevance",
  };
}

function statusOf(item: TutorReviewItem): TutorStatus {
  return mockState.tutorStatuses.get(item.id) ?? item.status;
}

/** Profil du répétiteur de démonstration, avec ses modifications enregistrées. */
function withEdits(tutor: TutorProfile): TutorProfile {
  if (tutor.id !== DEMO_TUTOR_ID) return tutor;
  const edits = mockState.tutorProfileEdits;
  return { ...tutor, ...edits, mode: edits.mode ?? tutor.mode, availability: edits.availability ?? tutor.availability };
}

function fromReviewItem(item: TutorReviewItem): TutorProfile {
  const details = PENDING_TUTOR_DETAILS[item.id]!;
  return {
    id: item.id,
    displayName: item.displayName,
    photoUrl: null,
    headline: details.headline,
    subjects: item.subjects,
    levels: details.levels,
    city: item.city,
    neighborhood: details.neighborhood,
    mode: item.mode,
    hourlyRateFcfa: item.hourlyRateFcfa,
    ratingAvg: null,
    ratingCount: 0,
    verified: true,
    bio: details.bio,
    yearsExperience: details.yearsExperience,
    qualifications: [],
    availability: [],
    whatsappOptIn: false,
  };
}

/** Répétiteurs publiés dans l'annuaire : seulement ceux dont le dossier est approuvé. */
function publishedTutors(): TutorProfile[] {
  const approvedFromQueue = PENDING_TUTORS.filter((item) => statusOf(item) === "approved").map(fromReviewItem);
  return [...MOCK_TUTORS.map(withEdits), ...approvedFromQueue];
}

function toCard(t: TutorProfile): TutorCard {
  return {
    id: t.id,
    displayName: t.displayName,
    photoUrl: t.photoUrl,
    headline: t.headline,
    subjects: t.subjects,
    levels: t.levels,
    city: t.city,
    neighborhood: t.neighborhood,
    mode: t.mode,
    hourlyRateFcfa: t.hourlyRateFcfa,
    ratingAvg: t.ratingAvg,
    ratingCount: t.ratingCount,
    verified: t.verified,
  };
}

export const searchTutors = cache(async (filters: TutorFilters): Promise<TutorCard[]> => {
  await connection();
  if (isSupabaseConfigured()) return searchTutorsRemote(filters);
  const results = publishedTutors().filter(
    (t) =>
      (!filters.subject || t.subjects.includes(filters.subject)) &&
      (!filters.level || t.levels.includes(filters.level)) &&
      (!filters.city || t.city === filters.city) &&
      (!filters.mode || t.mode === filters.mode || t.mode === "both") &&
      (!filters.priceMax || t.hourlyRateFcfa <= filters.priceMax) &&
      (!filters.minRating || (t.ratingAvg ?? 0) >= filters.minRating),
  );
  const byRating = (a: TutorProfile, b: TutorProfile) =>
    (b.ratingAvg ?? 0) - (a.ratingAvg ?? 0) || b.ratingCount - a.ratingCount;
  const sorted = [...results].sort(
    filters.sort === "price"
      ? (a, b) => a.hourlyRateFcfa - b.hourlyRateFcfa
      : filters.sort === "rating"
        ? byRating
        : (a, b) => b.ratingCount * (b.ratingAvg ?? 0) - a.ratingCount * (a.ratingAvg ?? 0),
  );
  return sorted.map(toCard);
});

export const getTutor = cache(async (id: string): Promise<TutorProfile | undefined> => {
  await connection();
  if (isSupabaseConfigured()) return (await fetchTutorProfile(id)) ?? undefined;
  return publishedTutors().find((t) => t.id === id);
});

export async function getAllTutorIds() {
  const ids = isSupabaseConfigured() ? await loadPublishedTutorIds() : MOCK_TUTORS.map((t) => t.id);
  // generateStaticParams doit renvoyer au moins une valeur : « _ » mène à une page 404.
  return ids.length ? ids.map((id) => ({ id })) : [{ id: "_" }];
}

// ── Espace répétiteur ───────────────────────────────────────────────────────

/** Profil du répétiteur connecté (tel qu'il le modifie, quel que soit son statut). */
export const getOwnTutorProfile = cache(async (): Promise<TutorProfile> => {
  await connection();
  if (isSupabaseConfigured()) {
    const profile = await fetchTutorProfile((await requireIdentity()).userId);
    if (!profile) throw new Error("profil répétiteur introuvable");
    return profile;
  }
  return withEdits(MOCK_TUTORS.find((t) => t.id === DEMO_TUTOR_ID)!);
});

export const getTutorDashboard = cache(async () => {
  const profile = await getOwnTutorProfile();
  const checklist = {
    bio: profile.bio.length >= 80,
    subjects: profile.subjects.length > 0 && profile.levels.length > 0,
    rate: profile.hourlyRateFcfa > 0,
    availability: profile.availability.length > 0,
    qualifications: profile.qualifications.length > 0,
  };
  const done = Object.values(checklist).filter(Boolean).length;
  const contactRequests = isSupabaseConfigured() ? await countTutorConversations(profile.id) : 3;
  return {
    profile,
    checklist,
    completion: Math.round((done / Object.keys(checklist).length) * 100),
    // Les vues de profil ne sont pas encore mesurées hors démonstration.
    stats: {
      profileViews: isSupabaseConfigured() ? null : 128,
      contactRequests,
      rating: profile.ratingAvg,
      ratingCount: profile.ratingCount,
    },
  };
});

// ── Administration : file de vérification ───────────────────────────────────

const STATUS_ORDER: Record<TutorStatus, number> = { pending: 0, rejected: 1, suspended: 2, approved: 3, draft: 4 };

export const getTutorReviewQueue = cache(async (): Promise<TutorReviewItem[]> => {
  await connection();
  if (isSupabaseConfigured()) {
    return (await fetchTutorReviewItems()).sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
  }
  const queue = PENDING_TUTORS.map((item) => ({
    ...item,
    status: statusOf(item),
    rejectionReason: mockState.tutorRejections.get(item.id) ?? item.rejectionReason,
  }));
  const approved: TutorReviewItem[] = MOCK_TUTORS.map((t) => ({
    id: t.id,
    displayName: t.displayName,
    subjects: t.subjects,
    city: t.city,
    mode: t.mode,
    hourlyRateFcfa: t.hourlyRateFcfa,
    submittedAt: "2026-08-30T08:00:00Z",
    status: mockState.tutorStatuses.get(t.id) ?? "approved",
    rejectionReason: null,
    documents: [
      { type: "cni", fileName: "cni.pdf", status: "accepted" },
      { type: "diploma", fileName: "diplome.pdf", status: "accepted" },
    ],
  }));
  return [...queue, ...approved].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);
});

export const getTutorReviewItem = cache(async (id: string) => {
  if (isSupabaseConfigured()) return (await fetchTutorReviewItems(id))[0];
  return (await getTutorReviewQueue()).find((t) => t.id === id);
});

/** Nom affiché (métadonnées de page) : lecture du contenu publié, sans donnée de requête. */
export async function getTutorName(id: string): Promise<string | undefined> {
  if (isSupabaseConfigured()) return loadTutorName(id);
  return MOCK_TUTORS.find((t) => t.id === id)?.displayName ?? PENDING_TUTORS.find((t) => t.id === id)?.displayName;
}

/** Dossier de vérification du répétiteur connecté (statut et pièces envoyées). */
export const getOwnVerification = cache(async () => {
  await connection();
  if (isSupabaseConfigured()) return (await fetchTutorReviewItems((await requireIdentity()).userId))[0];
  return getTutorReviewItem(DEMO_TUTOR_ID);
});
