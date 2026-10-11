import { connection } from "next/server";
import { cache } from "react";
import { getCurrentRole, getCurrentStudent } from "@/features/account/data";
import { mockState, type MockConversation } from "@/mocks/progress-store";
import { MOCK_TUTORS } from "@/mocks/tutors";
import { DEMO_PARENT, DEMO_STUDENT_ID, DEMO_TUTOR_ID } from "@/mocks/users";
import type { AppRole, ChatMessage, ConversationSummary } from "@/types/domain";

// Phase 3 : tables conversations / conversation_members / messages (RLS : membres + parent observateur),
// mises à jour en temps réel par Supabase Realtime.

const SEED_ID = "conv-awa-mamadou";

function ensureSeed() {
  if (mockState.conversations.has(SEED_ID)) return;
  const base = Date.parse("2026-10-09T18:00:00Z");
  mockState.conversations.set(SEED_ID, {
    id: SEED_ID,
    tutorId: DEMO_TUTOR_ID,
    studentId: DEMO_STUDENT_ID,
    parentId: DEMO_PARENT.id,
    messages: [
      {
        id: "m1",
        senderId: DEMO_PARENT.id,
        body: "Bonjour M. Diallo, ma fille Awa prépare le BFEM et a du mal en géométrie. Êtes-vous disponible le samedi matin ?",
        createdAt: base,
      },
      {
        id: "m2",
        senderId: DEMO_TUTOR_ID,
        body: "Bonjour Madame Ndiaye, oui, je suis disponible le samedi de 9 h à 13 h. Nous pourrions commencer par Thalès et la trigonométrie.",
        createdAt: base + 45 * 60_000,
      },
    ],
  });
}

const NAMES: Record<string, { name: string; role: AppRole }> = {
  [DEMO_PARENT.id]: { name: `${DEMO_PARENT.firstName} ${DEMO_PARENT.lastName}`, role: "parent" },
  [DEMO_STUDENT_ID]: { name: "Awa Ndiaye", role: "student" },
  [DEMO_TUTOR_ID]: { name: MOCK_TUTORS.find((t) => t.id === DEMO_TUTOR_ID)!.displayName, role: "tutor" },
};

const SELF_ID: Record<AppRole, string> = {
  student: DEMO_STUDENT_ID,
  parent: DEMO_PARENT.id,
  tutor: DEMO_TUTOR_ID,
  admin: "admin",
};

/** Un élève mineur sans validation parentale n'a pas accès à la messagerie (mode limité). */
export const getMessagingAccess = cache(async (): Promise<"ok" | "consent_required"> => {
  const role = await getCurrentRole();
  if (role !== "student") return "ok";
  const student = await getCurrentStudent();
  return student.isMinor && student.consentStatus !== "granted" ? "consent_required" : "ok";
});

function isMember(conversation: MockConversation, role: AppRole) {
  const self = SELF_ID[role];
  return conversation.tutorId === self || conversation.studentId === self || conversation.parentId === self;
}

export const getConversations = cache(async (): Promise<ConversationSummary[]> => {
  await connection();
  ensureSeed();
  const role = await getCurrentRole();
  return [...mockState.conversations.values()]
    .filter((c) => isMember(c, role))
    .map((c) => {
      const last = c.messages.at(-1)!;
      const other = role === "tutor" ? NAMES[c.parentId ?? c.studentId]! : NAMES[c.tutorId]!;
      return {
        id: c.id,
        title: other.name,
        subtitle: role === "tutor" ? NAMES[c.studentId]!.name : MOCK_TUTORS.find((t) => t.id === c.tutorId)!.headline,
        lastMessage: last.body,
        lastMessageAt: new Date(last.createdAt).toISOString(),
        unread: last.senderId !== SELF_ID[role] && role === "tutor",
      };
    });
});

export const getConversation = cache(async (id: string) => {
  await connection();
  ensureSeed();
  const role = await getCurrentRole();
  const conversation = mockState.conversations.get(id);
  if (!conversation || !isMember(conversation, role)) return null;
  const summary = (await getConversations()).find((c) => c.id === id)!;
  const messages: ChatMessage[] = conversation.messages.map((m) => ({
    id: m.id,
    senderName: NAMES[m.senderId]?.name ?? "",
    senderRole: NAMES[m.senderId]?.role ?? "student",
    body: m.body,
    createdAt: new Date(m.createdAt).toISOString(),
    mine: m.senderId === SELF_ID[role],
  }));
  return { summary, messages, observedByParent: conversation.parentId !== null && role !== "parent" };
});

export function selfIdFor(role: AppRole) {
  return SELF_ID[role];
}
