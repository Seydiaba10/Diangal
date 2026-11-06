import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { isSupabaseAuthCookie, sessionCookieOptions, type DeviceMode } from "@/features/account/device-cookies";
import { publicEnv } from "@/lib/env";
import type { Database } from "@/types/database";

/**
 * Client d'ouverture de session (code PIN, mot de passe) : clé secrète et adresse IP du visiteur
 * transmise à Supabase (en-tête Sb-Forwarded-For, à activer dans le projet), sinon toutes les limites
 * par adresse IP de Supabase viseraient le serveur du site. Sert UNIQUEMENT à ouvrir la session : les
 * cookies écrits sont ceux de l'utilisateur, les requêtes suivantes passent par createSupabaseServerClient.
 */
export async function createSupabaseAuthGateway(ip: string, mode: DeviceMode) {
  await connection();
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!publicEnv.NEXT_PUBLIC_SUPABASE_URL || !secret) throw new Error("Supabase n'est pas configuré (SUPABASE_SECRET_KEY).");
  const cookieStore = await cookies();
  return createServerClient<Database>(publicEnv.NEXT_PUBLIC_SUPABASE_URL, secret, {
    global: { headers: ip && ip !== "inconnue" ? { "sb-forwarded-for": ip } : {} },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookieStore.set(name, value, isSupabaseAuthCookie(name) ? sessionCookieOptions(options, mode) : options);
        }
      },
    },
  });
}
