// Photos des trois profils des pages de connexion (provisoires : à remplacer par de vraies photos,
// avec l’accord écrit des personnes, avant la mise en ligne). Les enfants ne sont jamais en photo.

export type LoginProfile = "eleve" | "parent" | "repetiteur";

export const PROFILE_PHOTOS: Record<LoginProfile, string> = {
  eleve: "/connexion/profil-eleves.png",
  parent: "/connexion/profil-parents.png",
  repetiteur: "/connexion/profil-repetiteurs.png",
};
