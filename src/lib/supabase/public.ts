import "server-only";

import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";
import type { Database } from "@/types/database";

/**
 * Client sans session (clé publiable, rôle anon) pour le contenu publié identique pour tous :
 * catalogue, offres, dates d'examen. Sans cookies, il peut servir dans une fonction « use cache ».
 */
export function createSupabasePublicClient() {
  return createClient<Database>(publicEnv.NEXT_PUBLIC_SUPABASE_URL!, publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
