import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole } from "@/types/domain";
import { ROLES } from "./roles";

export interface AuthIdentity {
  userId: string;
  role: AppRole;
  /** aal2 = double authentification validée (obligatoire pour l'admin). */
  aal: "aal1" | "aal2";
  email: string | null;
  phone: string | null;
}

/**
 * Utilisateur connecté d'après le JWT vérifié (claim user_role ajoutée par le hook d'Auth),
 * ou null. Une seule lecture par requête grâce à cache().
 */
export const getAuthIdentity = cache(async (): Promise<AuthIdentity | null> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) return null;

  let role = claims.user_role as AppRole | undefined;
  if (!role || !ROLES.includes(role)) {
    // Jeton émis avant l'activation du hook : on relit le rôle dans le profil.
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", claims.sub).maybeSingle();
    role = profile?.role;
  }
  if (!role) return null;
  return {
    userId: claims.sub,
    role,
    aal: claims.aal === "aal2" ? "aal2" : "aal1",
    email: typeof claims.email === "string" && claims.email ? claims.email : null,
    phone: typeof claims.phone === "string" && claims.phone ? `+${claims.phone.replace(/^\+/, "")}` : null,
  };
});

/** Utilisateur connecté, sinon renvoi vers la connexion. */
export async function requireIdentity(): Promise<AuthIdentity> {
  const identity = await getAuthIdentity();
  if (!identity) redirect("/connexion");
  return identity;
}
