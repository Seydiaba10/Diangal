import "server-only";

import { parseSources } from "@/lib/sources";
import { selectAllRows, selectRowsByIds } from "@/lib/supabase/rows";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MockAnswerKey } from "@/mocks/answer-keys-3e";
import type { Json } from "@/types/database";
import type {
  AdminChapterRow,
  AdminProgram,
  AdminStats,
  AdminSubjectOption,
  AdminUserRow,
  AuditEntry,
  ContentTrackingRow,
  ContentVerification,
  PaymentChannel,
  PublishStatus,
  QuestionType,
  ReportRow,
} from "@/types/domain";

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

/** Leçons dont le cours a été rédigé (le corps n'est plus le texte de démonstration), parmi lessonIds si fourni. */
export async function fetchWrittenLessonIds(lessonIds?: string[]): Promise<Set<string>> {
  if (lessonIds && !lessonIds.length) return new Set();
  const supabase = await createSupabaseServerClient();
  const written = () => supabase.from("lesson_bodies").select("lesson_id").not("body_html", "ilike", "%Contenu de démonstration%");
  // Plus de 1 000 leçons en Terminale : identifiants par paquets, ou toutes les leçons par pages.
  const rows = lessonIds
    ? await selectRowsByIds("leçons rédigées", lessonIds, (chunk) => written().in("lesson_id", chunk))
    : await selectAllRows("leçons rédigées", (from, to) => written().order("lesson_id").range(from, to));
  return new Set(rows.map((b) => b.lesson_id));
}

// ── Référentiel : lectures avec la session admin (la RLS laisse voir les brouillons) ──

export async function fetchContentTracking(): Promise<ContentTrackingRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("admin_content_tracking");
  if (error) throw new Error(`suivi des contenus : ${error.message}`);
  return data.map((r) => ({
    programId: String(r.program_id),
    levelCode: r.level_code,
    seriesCode: r.series_code ?? null,
    subjectCode: r.subject_code,
    subjectName: r.subject_name,
    freeChapters: r.free_chapters,
    chapters: r.chapters,
    chaptersPublished: r.chapters_published,
    lessons: r.lessons,
    lessonsWritten: r.lessons_written,
    exercises: r.exercises,
    quizzes: r.quizzes,
    exams: r.exams,
    questions: r.questions,
    chaptersUnverified: r.chapters_unverified,
    chaptersReviewed: r.chapters_reviewed,
    chaptersOfficial: r.chapters_official,
    sourcedChapters: r.sourced_chapters,
  }));
}

const CHAPTER_COLUMNS = "id, number, slug, title, summary, strand, status, verification, sources, lessons(id, number, title, status)";

interface ChapterRecord {
  id: string;
  number: number;
  slug: string;
  title: string;
  summary: string;
  strand: string | null;
  status: PublishStatus;
  verification: ContentVerification;
  sources: Json;
  lessons: { id: string; number: number; title: string; status: PublishStatus }[];
}

function toAdminChapter(c: ChapterRecord, written: Set<string>): AdminChapterRow {
  return {
    id: c.id,
    number: c.number,
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    strand: c.strand,
    status: c.status,
    verification: c.verification,
    sources: parseSources(c.sources),
    lessons: [...c.lessons]
      .sort((a, b) => a.number - b.number)
      .map((l) => ({ id: l.id, number: l.number, title: l.title, status: l.status, written: written.has(l.id) })),
  };
}

/** Programmes d'une classe avec tous leurs chapitres et leçons (brouillons compris). */
export async function fetchAdminPrograms(levelCode: string): Promise<AdminProgram[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("programs")
    .select(`id, free_chapters, sort_order, subjects!inner(code, name), levels!inner(code), series(code), chapters(${CHAPTER_COLUMNS})`)
    .eq("levels.code", levelCode)
    .order("sort_order");
  if (error) throw new Error(`programmes : ${error.message}`);
  const written = await fetchWrittenLessonIds(data.flatMap((p) => p.chapters.flatMap((c) => c.lessons.map((l) => l.id))));
  // Matières communes d'abord, puis par série (lycée).
  return [...data]
    .sort((a, b) => (a.series?.code ?? "").localeCompare(b.series?.code ?? "") || a.sort_order - b.sort_order)
    .map((p) => ({
      id: String(p.id),
      levelCode: p.levels.code,
      seriesCode: p.series?.code ?? null,
      subjectCode: p.subjects.code,
      subjectName: p.subjects.name,
      freeChapters: p.free_chapters,
      chapters: [...p.chapters].sort((a, b) => a.number - b.number).map((c) => toAdminChapter(c, written)),
    }));
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Un chapitre et son programme, ou null (identifiant inconnu ou mal formé). */
export async function fetchAdminChapter(chapterId: string): Promise<{ program: AdminProgram; chapter: AdminChapterRow } | null> {
  if (!UUID.test(chapterId)) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("chapters")
    .select(`${CHAPTER_COLUMNS}, programs!inner(id, free_chapters, subjects!inner(code, name), levels!inner(code), series(code))`)
    .eq("id", chapterId)
    .maybeSingle();
  if (!data) return null;
  const written = await fetchWrittenLessonIds(data.lessons.map((l) => l.id));
  const p = data.programs;
  return {
    program: {
      id: String(p.id),
      levelCode: p.levels.code,
      seriesCode: p.series?.code ?? null,
      subjectCode: p.subjects.code,
      subjectName: p.subjects.name,
      freeChapters: p.free_chapters,
      chapters: [],
    },
    chapter: toAdminChapter(data, written),
  };
}

/** Programme seul (création d'un chapitre). */
export async function fetchAdminProgram(programId: string): Promise<AdminProgram | null> {
  if (!/^\d{1,9}$/.test(programId)) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("programs")
    .select("id, free_chapters, subjects!inner(code, name), levels!inner(code), series(code)")
    .eq("id", Number(programId))
    .maybeSingle();
  if (!data) return null;
  return {
    id: String(data.id),
    levelCode: data.levels.code,
    seriesCode: data.series?.code ?? null,
    subjectCode: data.subjects.code,
    subjectName: data.subjects.name,
    freeChapters: data.free_chapters,
    chapters: [],
  };
}

/** Offre gratuite appliquée ? (platform_settings, lisible par l'admin seulement). */
export async function fetchFreeTierEnabled(): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("platform_settings").select("value").eq("key", "free_tier").maybeSingle();
  const value = data?.value as { enabled?: boolean } | null | undefined;
  return value?.enabled === true;
}

export async function fetchSubjectOptions(): Promise<AdminSubjectOption[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("subjects").select("id, code, name").order("name");
  if (error) throw new Error(`matières : ${error.message}`);
  return data.map((s) => ({ id: String(s.id), code: s.code, name: s.name }));
}

/** Leçon (brouillon compris) avec son chapitre et sa matière, pour l'éditeur. */
export async function fetchAdminLessonContext(lessonId: string) {
  if (!UUID.test(lessonId)) return null;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("lessons")
    .select("id, title, status, chapters!inner(id, title, programs!inner(subjects!inner(name), levels!inner(code)))")
    .eq("id", lessonId)
    .maybeSingle();
  if (!data) return null;
  return {
    lesson: { id: data.id, title: data.title, status: data.status },
    chapter: { id: data.chapters.id, title: data.chapters.title },
    subjectName: data.chapters.programs.subjects.name,
    levelCode: data.chapters.programs.levels.code,
  };
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
