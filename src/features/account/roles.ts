import type { AppRole } from "@/types/domain";

export const ROLES: AppRole[] = ["student", "parent", "tutor", "admin"];

/** Page d'accueil de chaque rôle. */
export const ROLE_HOME: Record<AppRole, string> = {
  student: "/eleve",
  parent: "/parent",
  tutor: "/prof",
  admin: "/admin",
};
