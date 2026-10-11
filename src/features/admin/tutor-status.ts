import type { TutorStatus } from "@/types/domain";

export const TUTOR_STATUSES: TutorStatus[] = ["pending", "approved", "rejected", "suspended"];

/** Couleur du badge de statut d'un dossier répétiteur. */
export const TUTOR_STATUS_TONE = { pending: "info", approved: "success", rejected: "danger", suspended: "idle" } as const;
