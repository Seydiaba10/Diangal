import { connection } from "next/server";
import { cache } from "react";
import { getCurrentRole } from "@/features/account/data";
import { mockState } from "@/mocks/progress-store";
import type { AppNotification, AppRole } from "@/types/domain";

// Phase 3 : table notifications (type + paramètres, traduits à l'affichage) et Web Push.

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
    { id: "n-review", kind: "tutor_review", params: {}, href: "/prof/verification", createdAt: "2026-09-02T10:00:00Z" },
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
  const role = await getCurrentRole();
  return SEED[role]
    .filter((n) => !(n.kind === "consent" && mockState.consentGranted))
    .map((n) => ({ ...n, read: mockState.readNotifications.has(n.id) }));
});
