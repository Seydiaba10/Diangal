import "server-only";

import { redirect } from "next/navigation";
import type { AppRole } from "@/types/domain";
import { getCurrentRole } from "./data";
import { ROLE_HOME } from "./roles";

/**
 * À appeler en tête de chaque Server Action réservée à un rôle : une action est un point
 * d'entrée public, la navigation seule ne la protège pas. Phase 4 : session Supabase + RLS.
 */
export async function requireRole(role: AppRole) {
  const current = await getCurrentRole();
  if (current !== role) redirect(ROLE_HOME[current]);
}
