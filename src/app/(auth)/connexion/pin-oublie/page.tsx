import { ArrowLeft, CircleAlert } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { siWhatsapp } from "simple-icons";
import { Suspense } from "react";
import { DialCodeSelect } from "@/components/ui/dial-code-select";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { requestLoginCodeAction } from "@/features/account/actions";
import { AuthCard, PILL_BUTTON, PILL_INPUT } from "@/features/account/components/auth-card";
import { ChannelChoice } from "@/features/account/components/channel-choice";
import { richMark } from "@/features/account/components/highlight";
import type { PhoneChannel } from "@/features/account/otp";
import { isPinLoginEnabled, isSmsEnabled, isSupabaseConfigured, isWhatsAppEnabled, phoneCountries } from "@/lib/env";

export async function generateMetadata() {
  const t = await getTranslations("auth.pin.forgot");
  return { title: t("metaTitle") };
}

const ERRORS = ["phone", "limit", "sms", "whatsapp", "send", "delai"] as const;

async function ForgotForm({ searchParams }: { searchParams: PageProps<"/connexion/pin-oublie">["searchParams"] }) {
  const params = await searchParams;
  const [t, tErrors] = await Promise.all([getTranslations("auth.pin.forgot"), getTranslations("auth.login.errors")]);
  const raw = Array.isArray(params.erreur) ? params.erreur[0] : params.erreur;
  const error = ERRORS.find((e) => e === raw);
  const demo = !isSupabaseConfigured();
  const channels: PhoneChannel[] = [...(demo || isWhatsAppEnabled() ? (["whatsapp"] as const) : []), ...(demo || isSmsEnabled() ? (["sms"] as const) : [])];

  if (!channels.length) return <Notice tone="warning">{t("closed")}</Notice>;
  return (
    <form action={requestLoginCodeAction} className="space-y-4">
      <input type="hidden" name="but" value="pin" />
      <input type="hidden" name="espace" value="famille" />
      {error ? (
        <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-danger-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          {error === "delai" ? t("delai") : tErrors(error)}
        </p>
      ) : null}
      <div>
        <label htmlFor="identifiant" className="text-sm font-semibold text-brand-800">
          {t("phone")}
        </label>
        <div className="mt-1.5 flex gap-2">
          <DialCodeSelect countries={phoneCountries()} name="pays" label={t("dialCode")} className="rounded-full border-brand-700" />
          <input id="identifiant" name="identifiant" type="tel" inputMode="tel" required autoComplete="tel-national" placeholder="77 000 00 00" className={PILL_INPUT} />
        </div>
      </div>
      <ChannelChoice channels={channels} />
      <button type="submit" className={PILL_BUTTON}>
        <svg viewBox="0 0 24 24" className="size-5 fill-white" aria-hidden>
          <path d={siWhatsapp.path} />
        </svg>
        {t("submit")}
      </button>
      <p className="text-center text-sm leading-normal text-ink-muted">{t("note")}</p>
    </form>
  );
}

/** « Code PIN oublié » : un code reçu sur le téléphone, puis un nouveau code PIN. */
export default async function ForgotPinPage({ searchParams }: PageProps<"/connexion/pin-oublie">) {
  // Connexion PIN éteinte : la page n'existe pas.
  if (!isPinLoginEnabled()) notFound();
  const t = await getTranslations("auth.pin.forgot");
  return (
    <div className="space-y-4">
      <Link href="/connexion" className="-my-1 inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-brand-700">
        <ArrowLeft className="size-[18px]" aria-hidden />
        {t("back")}
      </Link>
      <AuthCard title={t.rich("title", richMark)} subtitle={t("subtitle")}>
        <Suspense fallback={<Skeleton className="h-80" />}>
          <ForgotForm searchParams={searchParams} />
        </Suspense>
      </AuthCard>
    </div>
  );
}
