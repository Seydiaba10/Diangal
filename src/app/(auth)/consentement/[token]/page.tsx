import { CircleCheck, Lock, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { decideParentalConsentAction } from "@/features/account/actions";
import { AuthCard } from "@/features/account/components/auth-card";
import { getConsentRequest } from "@/features/account/data";
import { getAuthIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("consent");
  return { title: t("title") };
}

const COLLECTED = ["identity", "level", "progress", "messages"] as const;
const UNLOCKED = ["contact", "messages", "payments"] as const;

const ERRORS = ["parent", "numero", "lien"] as const;

/**
 * Lien reçu par SMS (jeton haché en base, valable 7 jours). Le parent doit être connecté
 * avec le numéro qui a reçu le SMS : un élève ne peut pas valider son propre compte.
 */
async function ConsentContent({
  params,
  searchParams,
}: {
  params: PageProps<"/consentement/[token]">["params"];
  searchParams: PageProps<"/consentement/[token]">["searchParams"];
}) {
  const [{ token }, { erreur }] = await Promise.all([params, searchParams]);
  const [t, request, identity] = await Promise.all([
    getTranslations("consent"),
    getConsentRequest(token),
    isSupabaseConfigured() ? getAuthIdentity() : Promise.resolve(null),
  ]);
  if (!request) return <p className="text-sm text-ink">{t("expired")}</p>;
  const error = ERRORS.find((e) => e === erreur);
  const mustLogIn = isSupabaseConfigured() && !identity;
  const next = new URLSearchParams({ next: `/consentement/${token}` });

  return (
    <div className="space-y-5">
      {error ? <Notice tone="error">{t(`errors.${error}`)}</Notice> : null}
      <p className="text-ink">{t("intro", { child: request.childFirstName })}</p>
      <section className="rounded-2xl bg-canvas p-4">
        <h2 className="flex items-center gap-2 font-semibold text-ink">
          <Lock className="size-4 text-brand-700" aria-hidden />
          {t("collectedTitle")}
        </h2>
        <ul className="mt-2 space-y-1.5 text-sm text-ink">
          {COLLECTED.map((key) => (
            <li key={key} className="flex gap-2">
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
              {t(`collected.${key}`)}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-muted">{t("neverCollected")}</p>
      </section>
      <section className="rounded-2xl bg-brand-50 p-4">
        <h2 className="flex items-center gap-2 font-semibold text-ink">
          <ShieldCheck className="size-4 text-brand-700" aria-hidden />
          {t("unlockTitle")}
        </h2>
        <ul className="mt-2 space-y-1.5 text-sm text-ink">
          {UNLOCKED.map((key) => (
            <li key={key}>• {t(`unlock.${key}`)}</li>
          ))}
        </ul>
      </section>
      <p className="text-xs text-ink-muted">{t("rights")}</p>
      {mustLogIn ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-ink">{t("loginFirst")}</p>
          <ButtonLink href={`/connexion?${next}`} className="w-full">
            {t("login")}
          </ButtonLink>
          <ButtonLink href="/inscription?role=parent" variant="outline" className="w-full">
            {t("signup")}
          </ButtonLink>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <form action={decideParentalConsentAction.bind(null, token, "granted")}>
            <Button type="submit" className="w-full">
              {t("accept")}
            </Button>
          </form>
          <form action={decideParentalConsentAction.bind(null, token, "refused")}>
            <Button type="submit" variant="ghost" className="w-full">
              {t("refuse")}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default async function ConsentPage({ params, searchParams }: PageProps<"/consentement/[token]">) {
  const t = await getTranslations("consent");
  return (
    <AuthCard title={t("title")}>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ConsentContent params={params} searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}
