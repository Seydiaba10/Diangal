import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { publicEnv } from "@/lib/env";
import type { Database } from "@/types/database";

/**
 * Client Supabase côté serveur (Server Components, Server Actions, Route Handlers),
 * avec la session de l'utilisateur : toutes les requêtes passent par la RLS.
 * connection() : donnée propre à l'utilisateur, toujours lue à la requête (jamais prérendue),
 * et la vérification de session (heure courante) n'a jamais lieu pendant un prérendu.
 */
export async function createSupabaseServerClient() {
  await connection();
  const cookieStore = await cookies();
  return createServerClient<Database>(publicEnv.NEXT_PUBLIC_SUPABASE_URL!, publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {
          // Appel depuis un Server Component : le rafraîchissement de session est assuré par proxy.ts.
        }
      },
    },
  });
}
