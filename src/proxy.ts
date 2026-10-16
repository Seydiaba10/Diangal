import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, publicEnv } from "@/lib/env";

// Préfixe d'URL → rôle autorisé. Les pages partagées (/repetiteurs, /messages…) sont ouvertes à tout compte connecté.
const ROLE_PREFIXES: [string, string][] = [
  ["/eleve", "student"],
  ["/parent", "parent"],
  ["/prof", "tutor"],
  ["/admin", "admin"],
];
const ROLE_HOME: Record<string, string> = { student: "/eleve", parent: "/parent", tutor: "/prof", admin: "/admin" };
const PROTECTED = ["/eleve", "/parent", "/prof", "/admin", "/repetiteurs", "/messages", "/notifications", "/paiement"];

/**
 * 1. Rafraîchit la session Supabase (cookies).
 * 2. Renvoie un visiteur non connecté vers /connexion.
 * 3. Contrôle optimiste du rôle d'après le JWT (claim user_role), sans requête en base.
 * La vraie protection reste dans les layouts (requireRole) et surtout dans la RLS.
 * En mode démo (Supabase non configuré), rien n'est fait ici : les layouts gèrent la démo.
 */
export async function proxy(request: NextRequest) {
  if (!isSupabaseConfigured()) return NextResponse.next();

  let response = NextResponse.next({ request });
  const supabase = createServerClient(publicEnv.NEXT_PUBLIC_SUPABASE_URL!, publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const path = request.nextUrl.pathname;

  if (!claims && PROTECTED.some((p) => path === p || path.startsWith(`${p}/`))) {
    const login = new URL(path === "/prof" || path.startsWith("/prof/") ? "/connexion/repetiteur" : "/connexion", request.url);
    login.searchParams.set("next", path);
    return NextResponse.redirect(login);
  }

  const role = typeof claims?.user_role === "string" ? claims.user_role : null;
  const required = ROLE_PREFIXES.find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`))?.[1];
  if (role && required && role !== required) {
    return NextResponse.redirect(new URL(ROLE_HOME[role] ?? "/", request.url));
  }
  // Espace admin : double authentification (aal2) exigée avant tout affichage.
  if (role === "admin" && required === "admin" && claims?.aal !== "aal2") {
    const mfa = new URL("/connexion/securite", request.url);
    mfa.searchParams.set("next", path);
    return NextResponse.redirect(mfa);
  }
  return response;
}

export const config = {
  // Ni fichiers statiques, ni images, ni service worker, ni webhooks de paiement (signés à part).
  matcher: ["/((?!_next/static|_next/image|serwist|icons|landing|api/webhooks|favicon|manifest.webmanifest|.*\\.(?:png|svg|jpg|webp|ico)$).*)"],
};
