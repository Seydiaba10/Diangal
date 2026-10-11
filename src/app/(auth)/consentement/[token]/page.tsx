import { CircleCheck, Lock, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { decideParentalConsentAction } from "@/features/account/actions";
import { getConsentRequest } from "@/features/account/data";
import { AuthCard } from "@/features/account/components/auth-card";

export async function generateMetadata() {
  const t = await getTranslations("consent");
  return { title: t("title") };
}

const COLLECTED = ["identity", "level", "progress", "messages"] as const;
const UNLOCKED = ["contact", "messages", "payments"] as const;

/** Lien reçu par SMS. Phase 4 : jeton haché, expiration 7 jours, connexion du parent par OTP. */
async function ConsentContent({ params }: { params: PageProps<"/consentement/[token]">["params"] }) {
  const { token } = await params;
  const [t, request] = await Promise.all([getTranslations("consent"), getConsentRequest(token)]);
  if (!request) return <p className="text-sm text-ink">{t("expired")}</p>;

  return (
    <div className="space-y-5">
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
      <div className="flex flex-col gap-3">
        <form action={decideParentalConsentAction.bind(null, "granted")}>
          <Button type="submit" className="w-full">
            {t("accept")}
          </Button>
        </form>
        <form action={decideParentalConsentAction.bind(null, "refused")}>
          <Button type="submit" variant="ghost" className="w-full">
            {t("refuse")}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default async function ConsentPage({ params }: PageProps<"/consentement/[token]">) {
  const t = await getTranslations("consent");
  return (
    <AuthCard title={t("title")}>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ConsentContent params={params} />
      </Suspense>
    </AuthCard>
  );
}
