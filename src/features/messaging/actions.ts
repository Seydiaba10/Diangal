"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentRole } from "@/features/account/data";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mockState } from "@/mocks/progress-store";
import { getConversation, getMessagingAccess, selfIdFor } from "./data";

const MAX_LENGTH = 1000;
// Numéros de téléphone : masqués pour garder les échanges sur la plateforme (protection des mineurs).
const PHONE_PATTERN = /(\+?\d[\d\s.-]{7,}\d)/g;

/** Supabase : insert dans messages (RLS : membre non observateur, mineur validé ; numéros masqués en base). */
export async function sendMessageAction(conversationId: string, formData: FormData) {
  const body = String(formData.get("message") ?? "").trim().slice(0, MAX_LENGTH);
  if (!body || (await getMessagingAccess()) !== "ok") return;

  if (isSupabaseConfigured()) {
    const { userId } = await requireIdentity();
    const supabase = await createSupabaseServerClient();
    await supabase.from("messages").insert({ conversation_id: conversationId, sender_id: userId, body });
    refresh();
    return;
  }

  const found = await getConversation(conversationId);
  const conversation = mockState.conversations.get(conversationId);
  if (!found || !conversation) return;
  const role = await getCurrentRole();
  conversation.messages.push({
    id: crypto.randomUUID(),
    senderId: selfIdFor(role),
    body: body.replace(PHONE_PATTERN, "•••"),
    createdAt: Date.now(),
  });
  refresh();
}

/**
 * Premier message à un répétiteur (RPC start_conversation) : un mineur doit être validé par
 * son parent, et ses parents liés deviennent observateurs de la conversation.
 */
export async function startConversationAction(tutorId: string, formData: FormData) {
  const body = String(formData.get("message") ?? "").trim().slice(0, MAX_LENGTH);
  const child = String(formData.get("child") ?? "") || undefined;
  if (!body) redirect(`/repetiteurs/${tutorId}?erreur=message`);
  if (!isSupabaseConfigured()) redirect("/messages");

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("start_conversation", { p_tutor: tutorId, p_body: body, p_student: child });
  if (error?.message.includes("consent_required")) redirect("/eleve/profil");
  if (error || !data) redirect(`/repetiteurs/${tutorId}?erreur=contact`);
  redirect(`/messages/${data}`);
}
