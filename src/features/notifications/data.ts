import { connection } from "next/server";
import { cache } from "react";
import { getCurrentRole } from "@/features/account/data";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { formatDateTime } from "@/lib/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mockState } from "@/mocks/progress-store";
import type { AppNotification, AppRole, NotificationKind } from "@/types/domain";

// Démo : notifications fictives. Supabase : table notifications (type + paramètres, traduits à l'affichage).

const KINDS: NotificationKind[] = [
  "consent",
  "quiz_result",
  "tutor_message",
  "payment",
  "exam",
  "tutor_review",
  "tutor_invite",
  "tutor_invite_answer",
  "tutor_assignment",
  "tutor_session",
  "tutor_session_cancelled",
  "account_deletion_request",
  "account_deletion_refused",
];

/**
 * Paramètres affichables : textes, date des cours au format de Dakar, et « child » = « none »
 * quand la notification s'adresse à l'élève lui-même (sélecteur ICU des messages).
 */
function displayParams(kind: NotificationKind, raw: Record<string, unknown>): Record<string, string> {
  const params = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v ?? "")]));
  if (kind.startsWith("tutor_") && kind !== "tutor_message" && kind !== "tutor_review" && kind !== "tutor_invite_answer") {
    params.child ||= "none";
  }
  if (params.startsAt) params.startsAt = formatDateTime(params.startsAt);
  return params;
}

const SEED: Record<AppRole, Omit<AppNotification, "read">[]> = {
  student: [
    {
      id: "n-quiz",
      kind: "quiz_result",
      params: { subject: "Français", score: "10,5/20" },
      href: "/eleve/evaluations/argumentatif-quiz",
      createdAt: "2026-10-09T17:10:00Z",
    },
    { id: "n-exam", kind: "exam", params: { exam: "BFEM" }, href: "/eleve/examens", createdAt: "2026-10-08T08:00:00Z" },
  ],
  parent: [
    { id: "n-consent", kind: "consent", params: { child: "Awa" }, href: "/consentement/demo", createdAt: "2026-10-09T09:00:00Z" },
    {
      id: "n-tutor",
      kind: "tutor_message",
      params: { tutor: "Mamadou Diallo" },
      href: "/messages/conv-awa-mamadou",
      createdAt: "2026-10-09T18:45:00Z",
    },
  ],
  tutor: [
    {
      id: "n-review",
      kind: "tutor_review",
      params: { decision: "approved" },
      href: "/prof/verification",
      createdAt: "2026-09-02T10:00:00Z",
    },
    {
      id: "n-msg",
      kind: "tutor_message",
      params: { tutor: "Mariama Ndiaye" },
      href: "/messages/conv-awa-mamadou",
      createdAt: "2026-10-09T18:00:00Z",
    },
  ],
  admin: [],
};

export const getNotifications = cache(async (): Promise<AppNotification[]> => {
  await connection();
  if (isSupabaseConfigured()) {
    const { userId } = await requireIdentity();
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("notifications")
      .select("id, type, params, link, read_at, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(`notifications : ${error.message}`);
    return data
      .filter((n) => KINDS.includes(n.type as NotificationKind))
      .map((n) => ({
        id: n.id,
        kind: n.type as NotificationKind,
        params: displayParams(n.type as NotificationKind, (n.params ?? {}) as Record<string, unknown>),
        href: n.link ?? "/notifications",
        createdAt: n.created_at,
        read: n.read_at !== null,
      }));
  }
  const role = await getCurrentRole();
  return SEED[role]
    .filter((n) => !(n.kind === "consent" && mockState.consentGranted))
    .map((n) => ({ ...n, read: mockState.readNotifications.has(n.id) }));
});
