import "server-only";

import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";

/**
 * Client avec la clé SECRÈTE : contourne la RLS. Réservé aux webhooks de paiement et aux
 * tâches serveur ; jamais utilisé pour répondre directement à une requête d'utilisateur.
 */
export function createSupabaseAdminClient() {
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!publicEnv.NEXT_PUBLIC_SUPABASE_URL || !secret) throw new Error("Supabase n'est pas configuré (SUPABASE_SECRET_KEY).");
  return createClient(publicEnv.NEXT_PUBLIC_SUPABASE_URL, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
