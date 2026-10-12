import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MockAnswerKey } from "@/mocks/answer-keys-3e";
import type { AdminStats, AdminUserRow, AuditEntry, PaymentChannel, QuestionType, ReportRow } from "@/types/domain";

// Espace admin sur Supabase : toutes les lectures passent par la RLS « private.is_admin() »
// (rôle admin ET double authentification aal2).

const CHANNELS: PaymentChannel[] = ["wave", "orange_money", "free_money", "card"];
const DAY_MS = 86_400_000;

export async function fetchAdminStats(): Promise<AdminStats> {
  const supabase = await createSupabaseServerClient();
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * DAY_MS).toISOString();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
  const sinceSixDays = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 6)).toISOString();
  const count = { count: "exact" as const, head: true };

  const [students, parents, approved, pending, premium, quizzes, reports, signups, payments] = await Promise.all([
    supabase.from("profiles").select("id", count).eq("role", "student"),
    supabase.from("profiles").select("id", count).eq("role", "parent"),
    supabase.from("tutor_profiles").select("user_id", count).eq("status", "approved"),
    supabase.from("tutor_profiles").select("user_id", count).eq("status", "pending"),
    supabase.from("subscriptions").select("student_id").eq("status", "active").gt("ends_at", now.toISOString()),
    supabase.from("attempts").select("id", count).eq("status", "submitted").gte("submitted_at", weekAgo),
    supabase.from("reports").select("id", count).eq("status", "open"),
    supabase.from("profiles").select("created_at").gte("created_at", sinceSixDays),
    supabase.from("payments").select("amount_fcfa, channel, paid_at").eq("status", "succeeded"),
  ]);

  const days = Array.from({ length: 7 }, (_, i) => new Date(Date.parse(sinceSixDays) + i * DAY_MS).toISOString().slice(0, 10));
  const succeeded = payments.data ?? [];
  return {
    students: students.count ?? 0,
    parents: parents.count ?? 0,
    tutorsApproved: approved.count ?? 0,
    tutorsPending: pending.count ?? 0,
    premiumStudents: new Set((premium.data ?? []).map((s) => s.student_id)).size,
    revenueMonthFcfa: succeeded.filter((p) => (p.paid_at ?? "") >= monthStart).reduce((sum, p) => sum + p.amount_fcfa, 0),
    quizzesThisWeek: quizzes.count ?? 0,
    reportsOpen: reports.count ?? 0,
    signupsByDay: days.map((day) => ({ day, count: (signups.data ?? []).filter((p) => p.created_at.startsWith(day)).length })),
    revenueByChannel: CHANNELS.map((channel) => ({
      channel,
      amountFcfa: succeeded.filter((p) => p.channel === channel).reduce((sum, p) => sum + p.amount_fcfa, 0),
    })),
  };
}

export async function fetchAdminUsers(query: string): Promise<AdminUserRow[]> {
  const supabase = await createSupabaseServerClient();
  let request = supabase
    .from("profiles")
    .select("id, first_name, last_name, role, created_at, cities(name), student_profiles(consent_status)")
    .order("created_at", { ascending: false })
    .limit(100);
  // Recherche sur le nom : les caractères spéciaux du filtre PostgREST sont retirés.
  const needle = query.replace(/[%,()*\\]/g, " ").trim().slice(0, 60);
  if (needle) request = request.or(`first_name.ilike.%${needle}%,last_name.ilike.%${needle}%`);
  const { data, error } = await request;
  if (error) throw new Error(`utilisateurs : ${error.message}`);
  return data.map((u) => ({
    id: u.id,
    name: `${u.first_name} ${u.last_name}`,
    role: u.role,
    city: u.cities?.name ?? "",
    createdAt: u.created_at,
    consentStatus: u.student_profiles?.consent_status ?? null,
  }));
}

async function profileNames(ids: string[]) {
  if (!ids.length) return new Map<string, string>();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("profiles").select("id, first_name, last_name").in("id", ids);
  return new Map((data ?? []).map((p) => [p.id, `${p.first_name} ${p.last_name}`]));
}

export async function fetchReports(): Promise<ReportRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("reports")
    .select("id, target_type, target_id, reason, status, created_at, reporter_id")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(`signalements : ${error.message}`);
  // Cible lisible : l'auteur d'un message signalé, ou la personne signalée.
  const messageIds = data.filter((r) => r.target_type === "message").map((r) => r.target_id);
  const { data: messages } = messageIds.length
    ? await supabase.from("messages").select("id, sender_id").in("id", messageIds)
    : { data: [] as { id: string; sender_id: string }[] };
  const senderOf = new Map((messages ?? []).map((m) => [m.id, m.sender_id]));
  const targetPerson = (r: (typeof data)[number]) => (r.target_type === "message" ? senderOf.get(r.target_id) : r.target_id);
  const names = await profileNames([
    ...new Set([...data.map((r) => r.reporter_id), ...data.map(targetPerson).filter((id): id is string => Boolean(id))]),
  ]);
  return data.map((r) => ({
    id: r.id,
    targetType: r.target_type,
    reason: r.reason,
    reporterName: names.get(r.reporter_id) ?? "",
    targetName: names.get(targetPerson(r) ?? "") ?? "",
    createdAt: r.created_at,
    status: r.status === "handled" ? "handled" : "open",
  }));
}

export async function fetchAuditLog(): Promise<AuditEntry[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("audit_logs")
    .select("id, actor_id, action, entity_type, entity_id, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(`journal : ${error.message}`);
  const personIds = data
    .filter((e) => ["tutor", "student", "user"].includes(e.entity_type) && e.entity_id)
    .map((e) => e.entity_id!);
  const names = await profileNames([...new Set([...data.map((e) => e.actor_id).filter((id): id is string => Boolean(id)), ...personIds])]);
  return data.map((e) => ({
    id: String(e.id),
    actorName: e.actor_id ? (names.get(e.actor_id) ?? "") : "Système",
    action: e.action,
    target: (e.entity_id && names.get(e.entity_id)) || [e.entity_type, e.entity_id].filter(Boolean).join(" · "),
    createdAt: e.created_at,
  }));
}

/** Leçons dont le cours a été rédigé (le corps n'est plus le texte de démonstration). */
export async function fetchWrittenLessonIds(): Promise<Set<string>> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("lesson_bodies").select("lesson_id").not("body_html", "ilike", "%Contenu de démonstration%");
  return new Set((data ?? []).map((b) => b.lesson_id));
}

export async function fetchLessonBody(lessonId: string): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("lesson_bodies").select("body_html").eq("lesson_id", lessonId).maybeSingle();
  return data?.body_html ?? null;
}

export interface AdminQuestion {
  question: {
    id: string;
    type: QuestionType;
    promptHtml: string;
    explanationHtml: string;
    points: number;
    options: { id: string; labelHtml: string }[];
  };
  key: MockAnswerKey;
}

/** Évaluation avec ses corrigés (RPC admin_get_assessment, réservée à l'admin en aal2). */
export async function fetchAdminAssessment(assessmentUuid: string): Promise<AdminQuestion[] | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("admin_get_assessment", { p_assessment: assessmentUuid });
  if (error || !data) return null;
  const raw = data as {
    questions: {
      id: string;
      type: QuestionType;
      prompt_html: string;
      explanation_html: string;
      points: number | string;
      options: { id: string; label_html: string }[];
      correct_option_ids: string[];
      accepted_texts: string[];
      numeric_value: number | string | null;
      expected_answer: string | null;
    }[];
  };
  return raw.questions.map((q) => ({
    question: {
      id: q.id,
      type: q.type,
      promptHtml: q.prompt_html,
      explanationHtml: q.explanation_html,
      points: Number(q.points),
      options: q.options.map((o) => ({ id: o.id, labelHtml: o.label_html })),
    },
    key: {
      correctOptionIds: q.correct_option_ids,
      acceptedTexts: q.accepted_texts,
      numericValue: q.numeric_value === null ? undefined : Number(q.numeric_value),
      expectedAnswer: q.expected_answer ?? undefined,
    },
  }));
}
