import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  DEVICE_COOKIE,
  idleDecision,
  isSupabaseAuthCookie,
  parseDeviceMode,
  PIN_COOKIE,
  SEEN_COOKIE,
  sessionCookieOptions,
} from "@/features/account/device-cookies";
import { isPinLoginEnabled, isSupabaseConfigured, publicEnv } from "@/lib/env";

// Préfixe d'URL → rôle autorisé. Les pages partagées (/repetiteurs, /messages…) sont ouvertes à tout compte connecté.
const ROLE_PREFIXES: [string, string][] = [
  ["/eleve", "student"],
  ["/parent", "parent"],
  ["/prof", "tutor"],
  ["/admin", "admin"],
];
const ROLE_HOME: Record<string, string> = { student: "/eleve", parent: "/parent", tutor: "/prof", admin: "/admin" };
const PROTECTED = ["/eleve", "/parent", "/prof", "/admin", "/repetiteurs", "/messages", "/notifications", "/paiement", "/compte", "/parrainage"];

/**
 * 1. Rafraîchit la session Supabase (cookies) ; sur un appareil partagé ou pour un enfant, sans durée.
 * 2. Ferme une session inactive trop longtemps (appareil partagé : 15 min ; enfant : 30 min) et redemande
 *    le code PIN après 30 jours sans visite sur son propre téléphone (connexion par code PIN).
 * 3. Renvoie un visiteur non connecté vers /connexion.
 * 4. Contrôle optimiste du rôle d'après le JWT (claim user_role), sans requête en base.
 * La vraie protection reste dans les layouts (requireRole) et surtout dans la RLS.
 * En mode démo (Supabase non configuré), rien n'est fait ici : les layouts gèrent la démo.
 */
export async function proxy(request: NextRequest) {
  if (!isSupabaseConfigured()) return NextResponse.next();

  const mode = parseDeviceMode(request.cookies.get(DEVICE_COOKIE)?.value);
  let response = NextResponse.next({ request });
  const supabase = createServerClient(publicEnv.NEXT_PUBLIC_SUPABASE_URL!, publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, isSupabaseAuthCookie(name) ? sessionCookieOptions(options, mode) : options);
        }
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED.some((p) => path === p || path.startsWith(`${p}/`));
  // Redirection qui garde les cookies déjà écrits (session rafraîchie ou fermée).
  const redirectTo = (url: URL) => {
    const target = NextResponse.redirect(url);
    for (const c of response.cookies.getAll()) target.cookies.set(c);
    return target;
  };

  if (claims && isPinLoginEnabled()) {
    const now = Math.floor(Date.now() / 1000);
    const seen = Number(request.cookies.get(SEEN_COOKIE)?.value ?? Number.NaN);
    const decision = idleDecision(mode, Number.isFinite(seen) ? seen : null, now, request.cookies.has(PIN_COOKIE));
    if (decision.signOut) {
      await supabase.auth.signOut({ scope: "local" });
      for (const name of [DEVICE_COOKIE, SEEN_COOKIE, PIN_COOKIE]) response.cookies.delete(name);
      return redirectTo(new URL(`/connexion?info=${mode === "enfant" ? "session-enfant" : "session-expiree"}`, request.url));
    }
    if (decision.lock && isProtected) {
      const lock = new URL("/connexion/session", request.url);
      lock.searchParams.set("next", path);
      return redirectTo(lock);
    }
    if (decision.touch) {
      response.cookies.set(SEEN_COOKIE, String(now), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        // Appareil partagé ou enfant : cookie de session, comme la connexion elle-même.
        ...(mode === "perso" ? { maxAge: 400 * 24 * 60 * 60 } : {}),
      });
    }
  }

  if (!claims && isProtected) {
    const login = new URL(path === "/prof" || path.startsWith("/prof/") ? "/connexion/repetiteur" : "/connexion", request.url);
    login.searchParams.set("next", path);
    return NextResponse.redirect(login);
  }

  const role = typeof claims?.user_role === "string" ? claims.user_role : null;
  const required = ROLE_PREFIXES.find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`))?.[1];
  if (role && required && role !== required) {
    return redirectTo(new URL(ROLE_HOME[role] ?? "/", request.url));
  }
  // Espace admin : double authentification (aal2) exigée avant tout affichage.
  if (role === "admin" && required === "admin" && claims?.aal !== "aal2") {
    const mfa = new URL("/connexion/securite", request.url);
    mfa.searchParams.set("next", path);
    return redirectTo(mfa);
  }
  return response;
}

export const config = {
  // Ni fichiers statiques, ni images, ni service worker, ni webhooks de paiement (signés à part).
  matcher: ["/((?!_next/static|_next/image|serwist|icons|landing|api/webhooks|favicon|manifest.webmanifest|.*\\.(?:png|svg|jpg|webp|ico)$).*)"],
};
