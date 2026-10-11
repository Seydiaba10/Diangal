// Données fictives de l'espace administrateur.

import type { AdminUserRow, PaymentRecord, ReportRow, TutorReviewItem } from "@/types/domain";

/** Répétiteurs en attente de vérification (absents de l'annuaire tant qu'ils ne sont pas approuvés). */
export const PENDING_TUTORS: TutorReviewItem[] = [
  {
    id: "seynabou-gueye",
    displayName: "Seynabou Guèye",
    subjects: ["MATH", "PC"],
    city: "Thiès",
    mode: "both",
    hourlyRateFcfa: 3000,
    submittedAt: "2026-10-08T10:15:00Z",
    status: "pending",
    rejectionReason: null,
    documents: [
      { type: "cni", fileName: "cni-recto-verso.pdf", status: "pending" },
      { type: "diploma", fileName: "licence-mathematiques.pdf", status: "pending" },
      { type: "criminal_record", fileName: "extrait-casier.pdf", status: "pending" },
    ],
  },
  {
    id: "pape-ndour",
    displayName: "Pape Ndour",
    subjects: ["ANG"],
    city: "Dakar",
    mode: "online",
    hourlyRateFcfa: 2500,
    submittedAt: "2026-10-09T16:40:00Z",
    status: "pending",
    rejectionReason: null,
    documents: [
      { type: "cni", fileName: "cni.jpg", status: "pending" },
      { type: "diploma", fileName: "master-anglais.pdf", status: "pending" },
    ],
  },
  {
    id: "awa-kane",
    displayName: "Awa Kane",
    subjects: ["FR", "HG"],
    city: "Saint-Louis",
    mode: "home",
    hourlyRateFcfa: 2000,
    submittedAt: "2026-10-05T09:00:00Z",
    status: "rejected",
    rejectionReason: "Diplôme illisible : merci d’envoyer un scan de meilleure qualité.",
    documents: [
      { type: "cni", fileName: "cni.pdf", status: "accepted" },
      { type: "diploma", fileName: "diplome.jpg", status: "rejected" },
    ],
  },
];

export const ADMIN_USERS: AdminUserRow[] = [
  { id: "eleve-awa", name: "Awa Ndiaye", role: "student", city: "Dakar", createdAt: "2026-09-14T09:12:00Z", consentStatus: "pending" },
  { id: "eleve-moussa", name: "Moussa Ndiaye", role: "student", city: "Dakar", createdAt: "2026-09-14T09:30:00Z", consentStatus: "granted" },
  { id: "parent-mariama", name: "Mariama Ndiaye", role: "parent", city: "Dakar", createdAt: "2026-09-14T09:25:00Z", consentStatus: null },
  { id: "eleve-ibou", name: "Ibou Faye", role: "student", city: "Thiès", createdAt: "2026-09-20T17:02:00Z", consentStatus: "granted" },
  { id: "eleve-khadija", name: "Khadija Sarr", role: "student", city: "Kaolack", createdAt: "2026-09-28T12:45:00Z", consentStatus: "not_required" },
  { id: "mamadou-diallo", name: "Mamadou Diallo", role: "tutor", city: "Dakar", createdAt: "2026-08-30T08:00:00Z", consentStatus: null },
  { id: "admin-ibrahima", name: "Ibrahima Sy", role: "admin", city: "Dakar", createdAt: "2026-08-01T08:00:00Z", consentStatus: null },
];

export const REPORTS: ReportRow[] = [
  {
    id: "rep-1",
    targetType: "message",
    reason: "Demande de numéro de téléphone personnel",
    reporterName: "Mariama Ndiaye",
    targetName: "Conversation avec un répétiteur",
    createdAt: "2026-10-09T20:11:00Z",
    status: "open",
  },
  {
    id: "rep-2",
    targetType: "tutor",
    reason: "Tarif affiché différent du tarif demandé",
    reporterName: "Ibou Faye",
    targetName: "Profil répétiteur",
    createdAt: "2026-10-07T14:30:00Z",
    status: "open",
  },
];

export const PAYMENTS_HISTORY: PaymentRecord[] = [
  { id: "pay-1", reference: "DGL-2610-0001", payerName: "Ibou Faye", beneficiaryName: "Ibou Faye", planCode: "monthly", amountFcfa: 2000, channel: "wave", status: "succeeded", createdAt: "2026-10-01T10:00:00Z" },
  { id: "pay-2", reference: "DGL-2610-0002", payerName: "Aminata Sow", beneficiaryName: "Cheikh Sow", planCode: "yearly", amountFcfa: 15000, channel: "orange_money", status: "succeeded", createdAt: "2026-10-03T19:22:00Z" },
  { id: "pay-3", reference: "DGL-2610-0003", payerName: "Khadija Sarr", beneficiaryName: "Khadija Sarr", planCode: "bfem_pass", amountFcfa: 7500, channel: "wave", status: "succeeded", createdAt: "2026-10-05T08:41:00Z" },
  { id: "pay-4", reference: "DGL-2610-0004", payerName: "Ousseynou Diop", beneficiaryName: "Fatou Diop", planCode: "quarterly", amountFcfa: 5000, channel: "free_money", status: "failed", createdAt: "2026-10-06T21:05:00Z" },
  { id: "pay-5", reference: "DGL-2610-0005", payerName: "Ndèye Mbaye", beneficiaryName: "Aliou Mbaye", planCode: "monthly", amountFcfa: 2000, channel: "card", status: "succeeded", createdAt: "2026-10-08T12:12:00Z" },
];

/** Inscriptions des 7 derniers jours (tableau de bord). */
export const SIGNUPS_LAST_7_DAYS = [42, 37, 51, 48, 63, 71, 58];

/** Détails de profil des répétiteurs en attente, publiés tels quels s'ils sont approuvés. */
export const PENDING_TUTOR_DETAILS: Record<
  string,
  { headline: string; bio: string; levels: string[]; yearsExperience: number; neighborhood: string | null }
> = {
  "seynabou-gueye": {
    headline: "Maths et sciences physiques au collège",
    bio: "Professeure contractuelle, j’aide les élèves de collège à reprendre confiance en maths et en PC.",
    levels: ["6E", "5E", "4E", "3E"],
    yearsExperience: 4,
    neighborhood: "Médina Fall",
  },
  "pape-ndour": {
    headline: "Anglais en ligne, de la 6e à la Terminale",
    bio: "Titulaire d’un master d’anglais, je propose des séances courtes centrées sur l’oral et la grammaire.",
    levels: ["6E", "5E", "4E", "3E", "2NDE", "1RE", "TLE"],
    yearsExperience: 2,
    neighborhood: "Grand Yoff",
  },
  "awa-kane": {
    headline: "Français et histoire-géographie à domicile",
    bio: "Institutrice à la retraite, j’accompagne les élèves du primaire et du collège.",
    levels: ["CM1", "CM2", "6E", "5E"],
    yearsExperience: 25,
    neighborhood: "Sor",
  },
};
