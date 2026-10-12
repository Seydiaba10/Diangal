import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole, ChatMessage, ConversationSummary } from "@/types/domain";

// Messagerie Supabase : conversations / conversation_members / messages (RLS : membres,
// parent observateur). Les numéros de téléphone sont masqués par un déclencheur en base.

const ROLE_OF_MEMBER: Record<string, AppRole> = { tutor: "tutor", student: "student", parent: "parent", observer: "parent" };

type Supabase = Awaited<ReturnType<typeof createSupabaseServerClient>>;

async function namesOf(supabase: Supabase, ids: string[]) {
  if (!ids.length) return new Map<string, string>();
  const { data } = await supabase.from("profiles").select("id, first_name, last_name").in("id", ids);
  return new Map((data ?? []).map((p) => [p.id, `${p.first_name} ${p.last_name}`]));
}

async function headlinesOf(supabase: Supabase, tutorIds: string[]) {
  if (!tutorIds.length) return new Map<string, string>();
  const { data } = await supabase.from("tutor_profiles").select("user_id, headline").in("user_id", tutorIds);
  return new Map((data ?? []).map((t) => [t.user_id, t.headline]));
}

const SUMMARY_COLUMNS =
  "id, tutor_id, student_id, parent_id, last_message_at, conversation_members(user_id, member_role, last_read_at), messages(body, created_at, sender_id)";

interface SummaryRow {
  id: string;
  tutor_id: string;
  student_id: string | null;
  parent_id: string | null;
  last_message_at: string;
  conversation_members: { user_id: string; member_role: string; last_read_at: string | null }[];
  messages: { body: string; created_at: string; sender_id: string }[];
}

/** Ligne de la liste : l'autre partie, le dernier message (seul chargé) et l'état « non lu ». */
function toSummary(c: SummaryRow, names: Map<string, string>, headlines: Map<string, string>, userId: string, role: AppRole): ConversationSummary {
  const last = c.messages[0];
  const me = c.conversation_members.find((m) => m.user_id === userId);
  const familyId = c.parent_id ?? c.student_id;
  return {
    id: c.id,
    title: role === "tutor" ? (familyId ? (names.get(familyId) ?? "") : "") : (names.get(c.tutor_id) ?? ""),
    subtitle: role === "tutor" ? (c.student_id ? (names.get(c.student_id) ?? "") : "") : (headlines.get(c.tutor_id) ?? ""),
    lastMessage: last?.body ?? "",
    lastMessageAt: last?.created_at ?? c.last_message_at,
    unread: Boolean(last && last.sender_id !== userId && (!me?.last_read_at || me.last_read_at < last.created_at)),
  };
}

export async function fetchConversations(userId: string, role: AppRole): Promise<ConversationSummary[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("conversations")
    .select(SUMMARY_COLUMNS)
    .order("last_message_at", { ascending: false })
    .order("created_at", { referencedTable: "messages", ascending: false })
    .limit(1, { referencedTable: "messages" });
  if (error) throw new Error(`messagerie : ${error.message}`);

  const people = [...new Set(data.flatMap((c) => c.conversation_members.map((m) => m.user_id)))];
  const [names, headlines] = await Promise.all([namesOf(supabase, people), headlinesOf(supabase, [...new Set(data.map((c) => c.tutor_id))])]);
  return data.map((c) => toSummary(c, names, headlines, userId, role));
}

/** Conversation complète (membre ou observateur). Marque la conversation comme lue. */
export async function fetchConversation(conversationId: string, userId: string, role: AppRole) {
  if (!/^[0-9a-f-]{36}$/i.test(conversationId)) return null;
  const supabase = await createSupabaseServerClient();
  // Seulement cette conversation (RLS : membre ou observateur), avec son dernier message pour l'en-tête.
  const [{ data: row }, { data: messages }] = await Promise.all([
    supabase
      .from("conversations")
      .select(SUMMARY_COLUMNS)
      .eq("id", conversationId)
      .order("created_at", { referencedTable: "messages", ascending: false })
      .limit(1, { referencedTable: "messages" })
      .maybeSingle(),
    supabase
      .from("messages")
      .select("id, sender_id, body, created_at")
      .eq("conversation_id", conversationId)
      .is("deleted_at", null)
      .order("created_at"),
  ]);
  if (!row) return null;

  const members = row.conversation_members;
  const [names, headlines] = await Promise.all([
    namesOf(supabase, members.map((m) => m.user_id)),
    role === "tutor" ? Promise.resolve(new Map<string, string>()) : headlinesOf(supabase, [row.tutor_id]),
  ]);
  const roleOf = new Map(members.map((m) => [m.user_id, ROLE_OF_MEMBER[m.member_role] ?? "student"]));

  await supabase
    .from("conversation_members")
    .update({ last_read_at: new Date().toISOString() })
    .eq("conversation_id", conversationId)
    .eq("user_id", userId);

  const chat: ChatMessage[] = (messages ?? []).map((m) => ({
    id: m.id,
    senderName: names.get(m.sender_id) ?? "",
    senderRole: roleOf.get(m.sender_id) ?? "student",
    body: m.body,
    createdAt: m.created_at,
    mine: m.sender_id === userId,
  }));
  return {
    summary: { ...toSummary(row, names, headlines, userId, role), unread: false },
    messages: chat,
    observedByParent: members.some((m) => m.member_role === "observer") && role !== "parent",
  };
}

/**
 * Conversations déjà ouvertes par l'utilisateur avec ce répétiteur. Un parent en a une par enfant
 * (studentId), plus éventuellement une pour lui-même (studentId = null).
 */
export async function findConversationsWithTutor(tutorId: string, userId: string, role: AppRole): Promise<{ id: string; studentId: string | null }[]> {
  const supabase = await createSupabaseServerClient();
  const query = supabase.from("conversations").select("id, student_id").eq("tutor_id", tutorId);
  const { data } = await (role === "parent" ? query.eq("parent_id", userId) : query.eq("student_id", userId)).order("last_message_at", {
    ascending: false,
  });
  return (data ?? []).map((c) => ({ id: c.id, studentId: c.student_id }));
}
