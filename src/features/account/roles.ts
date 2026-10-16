import type { AppRole } from "@/types/domain";

export const ROLES: AppRole[] = ["student", "parent", "tutor", "admin"];

/** Page d'accueil de chaque rôle. */
export const ROLE_HOME: Record<AppRole, string> = {
  student: "/eleve",
  parent: "/parent",
  tutor: "/prof",
  admin: "/admin",
};

/** Deux pages de connexion séparées : élèves et parents d'un côté, répétiteurs de l'autre. */
export type LoginSpace = "famille" | "repetiteur";

export const LOGIN_PATH: Record<LoginSpace, string> = { famille: "/connexion", repetiteur: "/connexion/repetiteur" };

/** Rôles de démonstration proposés sur chaque page de connexion. */
export const SPACE_ROLES: Record<LoginSpace, AppRole[]> = { famille: ["student", "parent", "admin"], repetiteur: ["tutor"] };

export function parseSpace(value: unknown): LoginSpace {
  return value === "repetiteur" ? "repetiteur" : "famille";
}
