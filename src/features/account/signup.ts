import "server-only";

import type { User } from "@supabase/supabase-js";
import type { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole } from "@/types/domain";

// Fin d'inscription : exécutée après le code saisi OU après le clic sur le lien de l'email, quel que
// soit l'appareil. Les compléments saisis dans l'assistant sont rangés dans les métadonnées du
// compte à sa création (signup_pending) et effacés une fois appliqués.

/** Version des CGU et de la politique de confidentialité acceptées à l'inscription. */
const TERMS_VERSION = "2026-10";

export interface SignupExtras {
  /** Téléphone du parent (+221…) d'un élève mineur. */
  parentPhone?: string;
  childCode?: string;
  city?: string;
  subjects?: string[];
  /** Code de parrainage saisi ou reçu dans le lien d'invitation (vérifié en base). */
  referralCode?: string;
}

/** Métadonnées ajoutées au compte à sa création : la fin d'inscription reste à faire. */
export function pendingSignupMetadata(extras: SignupExtras): Record<string, string> {
  return { signup_pending: "1", signup_extras: JSON.stringify(extras) };
}

type Supabase = Awaited<ReturnType<typeof createSupabaseServerClient>>;

/**
 * Consentements d'inscription, demande de validation au parent (élève mineur), rattachement
 * d'un enfant (parent), ville et matières (répétiteur). Chaque appel passe par la RLS.
 */
export async function finishSignup(supabase: Supabase, userId: string, role: AppRole, extras: SignupExtras) {
  await supabase.rpc("record_signup_consents", { p_version: TERMS_VERSION });
  // Parrainage : lien parrain-filleul « en attente » ; aucune récompense avant un vrai paiement.
  if ((role === "student" || role === "parent") && extras.referralCode) {
    await supabase.rpc("claim_referral", { p_code: extras.referralCode });
  }
  if (role === "student" && extras.parentPhone) {
    await supabase.rpc("request_parental_consent", { p_parent_phone: extras.parentPhone });
  } else if (role === "parent" && extras.childCode) {
    await supabase.rpc("link_child_by_code", { p_code: extras.childCode });
  } else if (role === "tutor") {
    const [{ data: city }, { data: subjects }] = await Promise.all([
      // Jokers ILIKE (% _ \) retirés : la ville saisie doit correspondre exactement (sans la casse).
      extras.city
        ? supabase.from("cities").select("id").ilike("name", extras.city.replace(/[%_\\]/g, "").slice(0, 60)).maybeSingle()
        : Promise.resolve({ data: null }),
      supabase.from("subjects").select("id").in("code", extras.subjects ?? []),
    ]);
    if (city) await supabase.from("tutor_profiles").update({ city_id: city.id }).eq("user_id", userId);
    if (subjects?.length) await supabase.from("tutor_subjects").insert(subjects.map((s) => ({ tutor_id: userId, subject_id: s.id })));
  }
}

/**
 * Inscription pas encore terminée (consentements, parent, ville…) : on l'applique une seule fois,
 * puis on efface le marqueur. Sans marqueur (connexion ordinaire), rien ne se passe.
 */
export async function completePendingSignup(supabase: Supabase, user: User, role: AppRole) {
  const meta = user.user_metadata ?? {};
  if (meta.signup_pending !== "1") return;
  let extras: SignupExtras = {};
  try {
    extras = JSON.parse(String(meta.signup_extras ?? "{}")) as SignupExtras;
  } catch {
    // Compléments illisibles : les consentements sont tout de même enregistrés.
  }
  await finishSignup(supabase, user.id, role, extras);
  await supabase.auth.updateUser({ data: { signup_pending: null, signup_extras: null } });
}
