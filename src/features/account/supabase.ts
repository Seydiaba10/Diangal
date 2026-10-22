import "server-only";

import { cache } from "react";
import { fetchDashboard } from "@/features/progress/supabase";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  AccountDeletionMode,
  AccountDeletionStatus,
  AccountOverview,
  AppRole,
  AvatarKey,
  ChildOverview,
  SessionUser,
  StudentSummary,
} from "@/types/domain";
import type { AuthIdentity } from "./session";

// Lecture Supabase des comptes : profils, élèves, enfants d'un parent (la RLS filtre tout).

const AVATARS: AvatarKey[] = ["awa", "moussa", "fatou"];

/** Avatar illustré choisi par l'utilisateur, sinon un des trois, stable pour un même compte. */
export function avatarFor(userId: string, key: string | null): AvatarKey {
  if (key && AVATARS.includes(key as AvatarKey)) return key as AvatarKey;
  let hash = 0;
  for (const ch of userId) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATARS[hash % AVATARS.length]!;
}

/** Jour précédent d'une date « aaaa-mm-jj » (heure de Dakar = UTC). */
function previousDay(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

/** Jours d'affilée : jours consécutifs d'activité jusqu'à aujourd'hui (ou hier). */
export function streakFrom(days: string[], today: string): number {
  const set = new Set(days);
  let day = set.has(today) ? today : previousDay(today);
  let streak = 0;
  while (set.has(day)) {
    streak += 1;
    day = previousDay(day);
  }
  return streak;
}

const countUnread = cache(async (userId: string): Promise<number> => {
  const supabase = await createSupabaseServerClient();
  const { count } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .is("read_at", null);
  return count ?? 0;
});

/** Fin du pass Premium actif d'un élève (ISO), sinon null. */
export const premiumUntilFor = cache(async (studentId: string): Promise<string | null> => {
  const supabase = await createSupabaseServerClient();
  const now = new Date().toISOString();
  const { data } = await supabase
    .from("subscriptions")
    .select("ends_at")
    .eq("student_id", studentId)
    .eq("status", "active")
    .lte("starts_at", now)
    .gt("ends_at", now)
    .order("ends_at", { ascending: false })
    .limit(1);
  return data?.[0]?.ends_at ?? null;
});

/**
 * Résumé d'un élève : l'élève connecté (self) ou l'enfant d'un parent lié.
 * La date de naissance n'est jamais lue : un élève mineur a un statut de consentement ≠ not_required.
 */
export const fetchStudentSummary = cache(async (studentId: string, self: boolean): Promise<StudentSummary | null> => {
  const supabase = await createSupabaseServerClient();
  const [{ data: profile }, { data: student }, { data: days }, premiumUntil, unread] = await Promise.all([
    supabase.from("profiles").select("first_name, last_name, avatar_key").eq("id", studentId).maybeSingle(),
    supabase
      .from("student_profiles")
      .select("school_name, consent_status, levels(code, name), series(code)")
      .eq("user_id", studentId)
      .maybeSingle(),
    supabase.from("daily_activity").select("day").eq("user_id", studentId).order("day", { ascending: false }).limit(400),
    premiumUntilFor(studentId),
    self ? countUnread(studentId) : Promise.resolve(0),
  ]);
  if (!profile || !student) return null;
  return {
    firstName: profile.first_name,
    lastName: profile.last_name,
    levelCode: student.levels.code,
    levelName: student.levels.name,
    seriesCode: student.series?.code ?? null,
    schoolName: student.school_name ?? undefined,
    avatarKey: avatarFor(studentId, profile.avatar_key),
    isPremium: premiumUntil !== null,
    isMinor: student.consent_status !== "not_required",
    consentStatus: student.consent_status,
    streakDays: streakFrom(
      (days ?? []).map((d) => d.day),
      new Date().toISOString().slice(0, 10),
    ),
    unreadNotifications: unread,
  };
});

/** Utilisateur affiché dans la coquille (carte, avatar, notifications). */
export async function fetchSessionUser(identity: AuthIdentity): Promise<SessionUser> {
  const { userId, role } = identity;
  if (role === "student") {
    const s = await fetchStudentSummary(userId, true);
    if (s) {
      return {
        role,
        id: userId,
        firstName: s.firstName,
        lastName: s.lastName,
        avatarKey: s.avatarKey,
        unreadNotifications: s.unreadNotifications,
        levelCode: s.levelCode,
        levelName: s.levelName,
        schoolName: s.schoolName,
        streakDays: s.streakDays,
      };
    }
  }
  const supabase = await createSupabaseServerClient();
  const [{ data: profile }, unread, children] = await Promise.all([
    supabase.from("profiles").select("first_name, last_name").eq("id", userId).maybeSingle(),
    countUnread(userId),
    role === "parent"
      ? supabase.from("parent_links").select("student_id", { count: "exact", head: true }).eq("parent_id", userId).eq("status", "active")
      : Promise.resolve({ count: 0 }),
  ]);
  return {
    role: role as AppRole,
    id: userId,
    firstName: profile?.first_name ?? "",
    lastName: profile?.last_name ?? "",
    avatarKey: null,
    unreadNotifications: unread,
    childrenCount: role === "parent" ? (children.count ?? 0) : undefined,
  };
}

/** Enfants reliés (lien actif) au parent connecté, avec leur suivi. */
export async function fetchParentChildren(parentId: string): Promise<ChildOverview[]> {
  const supabase = await createSupabaseServerClient();
  const { data: links } = await supabase
    .from("parent_links")
    .select("student_id")
    .eq("parent_id", parentId)
    .eq("status", "active")
    .order("approved_at");
  const children = await Promise.all(
    (links ?? []).map(async ({ student_id: id }): Promise<ChildOverview | null> => {
      const [summary, dashboard, premiumUntil, { data: last }] = await Promise.all([
        fetchStudentSummary(id, false),
        fetchDashboard(id),
        premiumUntilFor(id),
        supabase.from("daily_activity").select("day").eq("user_id", id).order("day", { ascending: false }).limit(1),
      ]);
      if (!summary) return null;
      return {
        id,
        firstName: summary.firstName,
        lastName: summary.lastName,
        levelCode: summary.levelCode,
        levelName: summary.levelName,
        seriesCode: summary.seriesCode,
        schoolName: summary.schoolName,
        avatarKey: summary.avatarKey,
        average20: dashboard?.stats.average20 ?? null,
        streakDays: dashboard?.stats.streakDays ?? summary.streakDays,
        chaptersCompleted: dashboard?.stats.chaptersCompleted ?? 0,
        chaptersTotal: dashboard?.stats.chaptersTotal ?? 0,
        lastActivityAt: last?.[0]?.day ? `${last[0].day}T12:00:00Z` : null,
        weakPointsCount: dashboard?.weakPoints.length ?? 0,
        consentStatus: summary.consentStatus,
        premiumUntil,
        nextExam: dashboard?.nextExam ?? null,
      };
    }),
  );
  return children.filter((c): c is ChildOverview => c !== null);
}

/** Page du lien SMS : prénom et nom de l'enfant si le jeton est valide. */
export async function fetchConsentRequest(token: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.rpc("get_consent_request", { p_token: token.slice(0, 200) });
  const found = data as { child_first_name: string; child_last_name: string } | null;
  return found ? { childFirstName: found.child_first_name, childLastName: found.child_last_name } : null;
}

export async function fetchDataSaver(userId: string): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("student_profiles").select("data_saver").eq("user_id", userId).maybeSingle();
  return data?.data_saver ?? false;
}

/** Code élève (à donner au parent) et numéro masqué du parent sollicité. */
export async function fetchStudentLinkInfo(userId: string) {
  const supabase = await createSupabaseServerClient();
  const [{ data: student }, { data: request }] = await Promise.all([
    supabase.from("student_profiles").select("student_code").eq("user_id", userId).maybeSingle(),
    supabase.rpc("get_my_consent_request"),
  ]);
  const code = student?.student_code ?? "";
  return {
    parentPhoneMasked: (request as { parent_phone_masked: string } | null)?.parent_phone_masked ?? null,
    // Affiché par blocs de 4 (7K3Q-AW2M), comme sur la carte élève.
    linkCode: code.length === 8 ? `${code.slice(0, 4)}-${code.slice(4)}` : code,
  };
}

/** Parents qui ont saisi le code de l'élève connecté et attendent sa confirmation. */
export async function fetchPendingParentLinks() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.rpc("get_pending_parent_links");
  return (data ?? []).map((p) => ({ parentId: p.parent_id, firstName: p.first_name, lastName: p.last_name }));
}

/** Suppression de compte : état calculé par la base (mode, connexion récente, demande en attente). */
export async function fetchDeletionStatus(targetId: string | null): Promise<AccountDeletionStatus | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_account_deletion_status", targetId ? { p_target: targetId } : {});
  if (error || !data) return null;
  const raw = data as {
    mode: AccountDeletionMode;
    recentLogin: boolean;
    pendingRequest: { requestedAt: string } | null;
    managedChildren: { id: string; firstName: string }[];
  };
  return {
    mode: raw.mode,
    recentLogin: raw.recentLogin,
    pendingRequestAt: raw.pendingRequest?.requestedAt ?? null,
    managedChildren: raw.managedChildren ?? [],
  };
}

/** Prénom, nom et identifiants de connexion (le téléphone et l'email viennent du jeton vérifié). */
export async function fetchAccountOverview(identity: AuthIdentity): Promise<AccountOverview> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("profiles").select("first_name, last_name").eq("id", identity.userId).maybeSingle();
  return {
    firstName: data?.first_name ?? "",
    lastName: data?.last_name ?? "",
    role: identity.role,
    // Les profils d'enfants gérés par un parent ont une adresse technique, jamais affichée.
    email: identity.email?.endsWith("@enfant.diangal.invalid") ? null : identity.email,
    phone: identity.phone,
  };
}
