import { ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard } from "@/features/account/components/auth-card";
import { MfaForm } from "@/features/account/components/mfa-form";
import { ROLE_HOME } from "@/features/account/roles";
import { getAuthIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function generateMetadata() {
  const t = await getTranslations("mfa");
  return { title: t("title") };
}

/**
 * Double authentification de l'admin (application TOTP). Première visite : enrôlement par QR code,
 * créé au clic (MfaForm) ; ensuite : saisie du code. La RLS admin exige une session aal2.
 * Le rendu ne fait que lire : la page peut être rendue plusieurs fois par visite.
 */
async function MfaContent({ searchParams }: { searchParams: PageProps<"/connexion/securite">["searchParams"] }) {
  const { next } = await searchParams;
  if (!isSupabaseConfigured()) redirect("/admin");
  const identity = await getAuthIdentity();
  if (!identity) redirect("/connexion?next=/admin");
  if (identity.role !== "admin") redirect(ROLE_HOME[identity.role]);
  if (identity.aal === "aal2") redirect(typeof next === "string" && next.startsWith("/admin") ? next : "/admin");

  const supabase = await createSupabaseServerClient();
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const verifiedFactorId = factors?.totp.find((f) => f.status === "verified")?.id ?? null;

  const t = await getTranslations("mfa");
  return (
    <div className="space-y-5">
      <p className="flex items-center gap-2 text-sm text-ink">
        <ShieldCheck className="size-5 shrink-0 text-brand-700" aria-hidden />
        {t("intro")}
      </p>
      <MfaForm
        verifiedFactorId={verifiedFactorId}
        next={typeof next === "string" ? next : null}
        labels={{
          challengeBody: t("challengeBody"),
          enrollIntro: t("enrollIntro"),
          showQr: t("showQr"),
          enrollTitle: t("enrollTitle"),
          enrollBody: t("enrollBody"),
          qrAlt: t("qrAlt"),
          secretLabel: t("secretLabel"),
          enrollError: t("enrollError"),
          codeLabel: t("codeLabel"),
          submit: t("submit"),
          error: t("error"),
        }}
      />
    </div>
  );
}

export default async function MfaPage({ searchParams }: PageProps<"/connexion/securite">) {
  const t = await getTranslations("mfa");
  return (
    <AuthCard title={t("title")}>
      <Suspense fallback={<Skeleton className="h-80" />}>
        <MfaContent searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}
