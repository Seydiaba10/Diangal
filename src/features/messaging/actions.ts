"use server";

import { refresh } from "next/cache";
import { getCurrentRole } from "@/features/account/data";
import { mockState } from "@/mocks/progress-store";
import { getConversation, getMessagingAccess, selfIdFor } from "./data";

const MAX_LENGTH = 1000;
// Numéros de téléphone : masqués pour garder les échanges sur la plateforme (protection des mineurs).
const PHONE_PATTERN = /(\+?\d[\d\s.-]{7,}\d)/g;

/** Phase 3 : insert dans messages (RLS : membre de la conversation), diffusion Realtime. */
export async function sendMessageAction(conversationId: string, formData: FormData) {
  const body = String(formData.get("message") ?? "").trim().slice(0, MAX_LENGTH);
  if (!body || (await getMessagingAccess()) !== "ok") return;
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
