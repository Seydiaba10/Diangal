import { CircleAlert, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { verifyMfaAction } from "@/features/account/actions";
import { AuthCard, INPUT_CLASS } from "@/features/account/components/auth-card";
import { ROLE_HOME } from "@/features/account/roles";
import { getAuthIdentity } from "@/features/account/session";
import { cn } from "@/lib/cn";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function generateMetadata() {
  const t = await getTranslations("mfa");
  return { title: t("title") };
}

/**
 * Double authentification de l'admin (application TOTP). Première visite : enrôlement par
 * QR code ; ensuite : saisie du code. La RLS admin exige une session aal2.
 */
async function MfaContent({ searchParams }: { searchParams: PageProps<"/connexion/securite">["searchParams"] }) {
  const { erreur, next, nouveau } = await searchParams;
  if (!isSupabaseConfigured()) redirect("/admin");
  const identity = await getAuthIdentity();
  if (!identity) redirect("/connexion?next=/admin");
  if (identity.role !== "admin") redirect(ROLE_HOME[identity.role]);
  if (identity.aal === "aal2") redirect(typeof next === "string" && next.startsWith("/admin") ? next : "/admin");

  const supabase = await createSupabaseServerClient();
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const pending = factors?.all.filter((f) => f.factor_type === "totp" && f.status !== "verified") ?? [];
  let factorId = factors?.totp.find((f) => f.status === "verified")?.id ?? null;
  let enrollment: { qrCode: string; secret: string } | null = null;
  // Enrôlement commencé (QR déjà scanné, code mal saisi…) : on le garde, sauf demande d'un nouveau QR.
  const resuming = !factorId && pending.length > 0 && nouveau !== "1";
  if (resuming) factorId = pending[0]!.id;

  if (!factorId) {
    // Nouveau QR demandé : les enrôlements jamais terminés sont remplacés (leur clé n'est plus affichable).
    for (const stale of pending) {
      await supabase.auth.mfa.unenroll({ factorId: stale.id });
    }
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: "DIANGAL admin" });
    if (error || !data) throw new Error(`double authentification : ${error?.message ?? "enrôlement impossible"}`);
    factorId = data.id;
    enrollment = { qrCode: data.totp.qr_code, secret: data.totp.secret };
  }

  const t = await getTranslations("mfa");
  return (
    <div className="space-y-5">
      <p className="flex items-center gap-2 text-sm text-ink">
        <ShieldCheck className="size-5 shrink-0 text-brand-700" aria-hidden />
        {t("intro")}
      </p>
      {enrollment ? (
        <section className="space-y-3 rounded-2xl bg-canvas p-4">
          <h2 className="font-semibold text-ink">{t("enrollTitle")}</h2>
          <p className="text-sm text-ink">{t("enrollBody")}</p>
          {/* QR code SVG renvoyé par Supabase (data URI) : aucune requête externe. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={enrollment.qrCode} alt={t("qrAlt")} width={192} height={192} className="mx-auto rounded-xl bg-white p-2" />
          <p className="break-all text-xs text-ink-muted">{t("secret", { secret: enrollment.secret })}</p>
        </section>
      ) : resuming ? (
        <div className="space-y-2 text-sm text-ink">
          <p>{t("resumeBody")}</p>
          {/* Pas de préchargement : ouvrir ce lien remplace l'enrôlement en cours. */}
          <Link
            prefetch={false}
            href={`/connexion/securite?${new URLSearchParams({ nouveau: "1", ...(typeof next === "string" ? { next } : {}) })}`}
            className="inline-flex min-h-11 items-center font-medium text-brand-700 underline underline-offset-2"
          >
            {t("newQr")}
          </Link>
        </div>
      ) : (
        <p className="text-sm text-ink">{t("challengeBody")}</p>
      )}
      <form action={verifyMfaAction.bind(null, factorId)} className="space-y-4">
        {typeof next === "string" ? <input type="hidden" name="next" value={next} /> : null}
        <div>
          <label htmlFor="code" className="text-sm font-medium text-ink">
            {t("codeLabel")}
          </label>
          <input
            id="code"
            name="code"
            required
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9 ]{6,7}"
            maxLength={7}
            aria-invalid={erreur === "code" || undefined}
            className={cn(INPUT_CLASS, "mt-1.5 text-center text-2xl font-semibold tracking-[0.5em]")}
          />
          {erreur === "code" ? (
            <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-danger-700">
              <CircleAlert className="size-4" aria-hidden />
              {t("error")}
            </p>
          ) : null}
        </div>
        <Button type="submit" className="w-full">
          {t("submit")}
        </Button>
      </form>
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
