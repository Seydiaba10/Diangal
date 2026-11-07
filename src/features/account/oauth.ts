import "server-only";

import type { Provider } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import { isSupabaseConfigured, publicEnv } from "@/lib/env";

// Connexion avec un réseau social : seulement pour un compte DIANGAL existant (même email).
// Un réseau s'active tout seul dès qu'il est configuré dans Supabase (Authentication → Providers).

export const SOCIAL_PROVIDERS = ["facebook", "apple", "google", "x"] as const;
export type SocialProvider = (typeof SOCIAL_PROVIDERS)[number];

/** Fournisseur Supabase de chaque réseau ouvert (X : OAuth 2.0 « x », sinon l'ancien « twitter »). */
export async function getEnabledSocialProviders(): Promise<Partial<Record<SocialProvider, Provider>>> {
  "use cache";
  cacheLife("hours");
  cacheTag("auth-settings");
  if (!isSupabaseConfigured()) return {};
  try {
    // 5 secondes au plus : sur un réseau lent, la page de connexion s'affiche quand même (réseaux grisés).
    const response = await fetch(`${publicEnv.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`, {
      headers: { apikey: publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) return {};
    const external = ((await response.json()) as { external?: Record<string, boolean> }).external ?? {};
    const enabled: Partial<Record<SocialProvider, Provider>> = {};
    if (external.facebook) enabled.facebook = "facebook";
    if (external.apple) enabled.apple = "apple";
    if (external.google) enabled.google = "google";
    if (external.x) enabled.x = "x";
    else if (external.twitter) enabled.x = "twitter";
    return enabled;
  } catch {
    return {};
  }
}
