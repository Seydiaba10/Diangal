// Comptes fictifs des phases 1-2 (un par rôle). Personnes inventées.

import type { AvatarKey } from "@/types/domain";

export const DEMO_STUDENT_ID = "eleve-awa";
export const DEMO_TUTOR_ID = "mamadou-diallo";

export const DEMO_PARENT = {
  id: "parent-mariama",
  firstName: "Mariama",
  lastName: "Ndiaye",
  /** Numéro masqué : seuls les deux derniers chiffres sont affichés. */
  phoneMasked: "77 ••• •• 21",
  city: "Dakar",
  childIds: ["eleve-awa", "eleve-moussa"],
};

export const DEMO_ADMIN = {
  id: "admin-ibrahima",
  firstName: "Ibrahima",
  lastName: "Sy",
};

/** Second enfant du parent de démo : profil du primaire géré par le parent (CM2, CFEE). */
export const DEMO_SECOND_CHILD = {
  id: "eleve-moussa",
  firstName: "Moussa",
  lastName: "Ndiaye",
  levelCode: "CM2",
  levelName: "CM2",
  schoolName: "École élémentaire Liberté 6",
  avatarKey: "moussa" as AvatarKey,
  average20: 15.2,
  streakDays: 2,
  chaptersCompleted: 21,
  chaptersTotal: 48,
  lastActivityAt: "2026-10-09T18:20:00Z",
  weakPointsCount: 1,
};

/** Code que l'élève donne à son parent pour relier les comptes (affiché dans son profil). */
export const DEMO_STUDENT_LINK_CODE = "AWA-7K3Q";
