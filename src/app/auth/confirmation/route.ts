import type { EmailOtpType, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { LOGIN_PATH, parseSpace, ROLE_HOME } from "@/features/account/roles";
import { completePendingSignup } from "@/features/account/signup";
import { isPinLoginEnabled } from "@/lib/env";
import { safeInternalPath } from "@/lib/safe-path";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Lien de l'email de connexion ou d'inscription : Supabase renvoie ici avec un code (PKCE)
 * ou un token_hash. La session est ouverte, l'inscription terminée, puis l'utilisateur
 * arrive dans son espace (l'admin passe d'abord par la double authentification).
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const next = safeInternalPath(params.get("next"));
  const login = LOGIN_PATH[parseSpace(params.get("espace"))];
  // Réseau social sans compte DIANGAL (le déclencheur refuse un compte sans rôle) ou accès refusé.
  const providerError = params.get("error_description") ?? params.get("error");
  if (providerError) {
    redirect(`${login}?erreur=${/database error|saving new user/i.test(providerError) ? "social-inconnu" : "social"}`);
  }
  const supabase = await createSupabaseServerClient();

  let user: User | null = null;
  const code = params.get("code");
  const tokenHash = params.get("token_hash");
  if (code) {
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    user = data.user;
  } else if (tokenHash) {
    const { data } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: (params.get("type") ?? "email") as EmailOtpType });
    user = data.user;
  }
  if (!user) redirect(`${login}?mode=email&erreur=lien`);

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (!profile) redirect(`${login}?mode=email&erreur=profil`);
  await completePendingSignup(supabase, user, profile.role);
  // Lien de l'e-mail ajouté dans « Mon compte » : l'adresse confirmée est recopiée dans le profil.
  if (next?.startsWith("/compte")) await supabase.rpc("sync_my_contact");

  if (profile.role === "admin") redirect("/connexion/securite");
  // Connexion par code PIN : un élève ou un parent arrivé par le lien de l'e-mail sans code PIN le choisit maintenant.
  if (!next && isPinLoginEnabled() && (profile.role === "student" || profile.role === "parent")) {
    const { data: pinSetAt } = await supabase.rpc("get_my_pin_status");
    if (!pinSetAt) redirect("/connexion/code-pin?raison=inscription");
  }
  redirect(next ?? ROLE_HOME[profile.role]);
}
