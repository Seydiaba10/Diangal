import { ArrowLeft, CircleAlert, Mail, Smartphone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { siWhatsapp } from "simple-icons";
import { Suspense, type ReactNode } from "react";
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

const ERRORS = ["phone", "email", "limit", "sms", "whatsapp", "send", "delai"] as const;
type Search = PageProps<"/connexion/pin-oublie">["searchParams"];
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
/** Lien discret entre le numéro (principal) et l'e-mail (au choix). */
const SWITCH_LINK = "flex min-h-11 items-center justify-center gap-2 text-[15px] font-semibold text-brand-700";

async function ForgotForm({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const [t, tErrors] = await Promise.all([getTranslations("auth.pin.forgot"), getTranslations("auth.login.errors")]);
  const byEmail = first(params.mode) === "email";
  const error = ERRORS.find((e) => e === first(params.erreur));
  const demo = !isSupabaseConfigured();
  const channels: PhoneChannel[] = [...(demo || isWhatsAppEnabled() ? (["whatsapp"] as const) : []), ...(demo || isSmsEnabled() ? (["sms"] as const) : [])];
  const alert = error ? (
    <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-danger-700">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
      {error === "delai" ? t("delai") : tErrors(error)}
    </p>
  ) : null;

  // Au choix : le code arrive par e-mail, gratuitement (et sans réseau mobile, avec internet).
  if (byEmail) {
    return (
      <form action={requestLoginCodeAction} className="space-y-4">
        <input type="hidden" name="but" value="pin" />
        <input type="hidden" name="espace" value="famille" />
        <input type="hidden" name="mode" value="email" />
        {alert}
        <div>
          <label htmlFor="identifiant" className="text-sm font-semibold text-brand-800">
            {t("email")}
          </label>
          <input
            id="identifiant"
            name="identifiant"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            placeholder="exemple@gmail.com"
            className={`${PILL_INPUT} mt-1.5`}
          />
        </div>
        <button type="submit" className={PILL_BUTTON}>
          <Mail className="size-5" aria-hidden />
          {t("submit")}
        </button>
        <Link href="/connexion/pin-oublie" className={SWITCH_LINK}>
          <Smartphone className="size-[18px]" aria-hidden />
          {t("usePhone")}
        </Link>
        <p className="text-center text-sm leading-normal text-ink-muted">{t("noteEmail")}</p>
      </form>
    );
  }

  const emailLink = (
    <Link href="/connexion/pin-oublie?mode=email" className={SWITCH_LINK}>
      <Mail className="size-[18px]" aria-hidden />
      {t("useEmail")}
    </Link>
  );
  if (!channels.length) {
    return (
      <div className="space-y-4">
        <Notice tone="warning">{t("closed")}</Notice>
        {emailLink}
      </div>
    );
  }
  return (
    <form action={requestLoginCodeAction} className="space-y-4">
      <input type="hidden" name="but" value="pin" />
      <input type="hidden" name="espace" value="famille" />
      {alert}
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
      {emailLink}
      <p className="text-center text-sm leading-normal text-ink-muted">{t("note")}</p>
    </form>
  );
}

/** Titre et retour selon le moyen choisi (numéro, ou e-mail au choix). */
async function ForgotHeader({ searchParams, children }: { searchParams: Search; children: ReactNode }) {
  const [params, t] = await Promise.all([searchParams, getTranslations("auth.pin.forgot")]);
  const byEmail = first(params.mode) === "email";
  return (
    <>
      <Link
        href={byEmail ? "/connexion?mode=email" : "/connexion"}
        className="-my-1 inline-flex min-h-11 items-center gap-1.5 self-start font-semibold text-brand-700"
      >
        <ArrowLeft className="size-[18px]" aria-hidden />
        {t("back")}
      </Link>
      <AuthCard title={t.rich("title", richMark)} subtitle={t(byEmail ? "subtitleEmail" : "subtitle")}>
        {children}
      </AuthCard>
    </>
  );
}

/** « Code PIN oublié » : un code reçu sur le téléphone (ou, au choix, par e-mail), puis un nouveau code PIN. */
export default async function ForgotPinPage({ searchParams }: PageProps<"/connexion/pin-oublie">) {
  // Connexion PIN éteinte : la page n'existe pas.
  if (!isPinLoginEnabled()) notFound();
  return (
    <div className="space-y-4">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <ForgotHeader searchParams={searchParams}>
          <ForgotForm searchParams={searchParams} />
        </ForgotHeader>
      </Suspense>
    </div>
  );
}
