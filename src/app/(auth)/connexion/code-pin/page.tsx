import { Check, CircleAlert, CircleCheck, ShieldCheck, Smartphone, UserPlus, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { DEMO_ROLE_COOKIE } from "@/features/account/data";
import { DEVICE_COOKIE } from "@/features/account/device-cookies";
import { AuthCard, PILL_BUTTON, PILL_OUTLINE } from "@/features/account/components/auth-card";
import { richMark } from "@/features/account/components/highlight";
import { PinBoxes } from "@/features/account/components/pin-boxes";
import { PROFILE_PHOTOS } from "@/features/account/profile-photos";
import { setPinAction } from "@/features/account/pin-actions";
import type { PinReason } from "@/features/account/pin-constants";
import { ROLE_HOME } from "@/features/account/roles";
import { getAuthIdentity } from "@/features/account/session";
import { isPinLoginEnabled, isSupabaseConfigured } from "@/lib/env";
import type { AppRole } from "@/types/domain";

export async function generateMetadata() {
  const t = await getTranslations("auth.pin.create");
  return { title: t("metaTitle") };
}

const ERRORS = ["format", "repeat", "sequence", "pattern", "common", "phone", "different", "enregistrement"] as const;
type Search = PageProps<"/connexion/code-pin">["searchParams"];
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

interface Account {
  role: AppRole;
  firstName: string | null;
  /** Identifiants vérifiés du compte : le numéro (principal) et l'e-mail (facultatif). */
  phone: string | null;
  email: string | null;
}

/** Rôle et identifiants du compte connecté (démo : rôle du cookie, compte à numéro). */
async function currentAccount(): Promise<Account | null> {
  if (!isSupabaseConfigured()) {
    const role = ((await cookies()).get(DEMO_ROLE_COOKIE)?.value ?? "parent") as AppRole;
    return { role, firstName: null, phone: "+221770000000", email: null };
  }
  const identity = await getAuthIdentity();
  return identity ? { role: identity.role, firstName: null, phone: identity.phone, email: identity.email } : null;
}

async function Done({ reason }: { reason: PinReason }) {
  const [t, account] = await Promise.all([getTranslations("auth.pin.create.done"), currentAccount()]);
  if (!account) redirect("/connexion");
  const home = ROLE_HOME[account!.role];
  if (reason === "recuperation") {
    return (
      <div className="space-y-4 text-center">
        <span className="mx-auto mt-6 flex size-[84px] items-center justify-center rounded-full bg-cycle-middle text-brand-800">
          <ShieldCheck className="size-10" aria-hidden />
        </span>
        <h1 className="text-[27px] font-bold leading-tight text-brand-800 lg:text-[34px]">{t.rich("titleReset", richMark)}</h1>
        <p className="text-[15px] text-ink-muted">{t("reset")}</p>
        <Link href={home} className={PILL_BUTTON}>
          {t("start")}
        </Link>
        <p className="text-sm text-ink-muted">{t("notYou")}</p>
      </div>
    );
  }
  const shared = (await cookies()).get(DEVICE_COOKIE)?.value === "partage";
  const parent = account!.role === "parent";
  return (
    <div className="space-y-4">
      <Image
        src={parent ? PROFILE_PHOTOS.parent : PROFILE_PHOTOS.eleve}
        alt=""
        width={199}
        height={149}
        loading="eager"
        className="mx-auto aspect-[4/3] w-full max-w-[220px] rounded-[20px] object-cover object-[center_30%]"
      />
      <h1 className="text-[27px] font-bold leading-tight text-brand-800 lg:text-[34px]">{t.rich("titleSignup", richMark)}</h1>
      <p className="text-[15px] text-ink-muted">{t("signup")}</p>
      <ul className="space-y-2 text-[13px] text-success-700">
        {([account!.phone ? "phone" : "email", "pin", shared ? "shared" : "stay"] as const).map((key) => (
          <li key={key} className="flex items-start gap-1.5">
            <CircleCheck className="mt-px size-4 shrink-0" aria-hidden />
            {t(`checks.${key}`)}
          </li>
        ))}
      </ul>
      {parent ? (
        <>
          <Notice tone="info">{t("childHint")}</Notice>
          <Link href="/parent/enfants/ajouter" className={PILL_BUTTON}>
            <UserPlus className="size-5" aria-hidden />
            {t("addChild")}
          </Link>
          <Link href={home} className={PILL_OUTLINE}>
            {t("start")}
          </Link>
        </>
      ) : (
        <Link href={home} className={PILL_BUTTON}>
          {t("start")}
        </Link>
      )}
      {account!.phone && !account!.email ? (
        <p className="text-center text-sm leading-normal text-ink-muted">
          {t.rich("addEmail", {
            link: (chunks) => (
              <Link href="/compte#email-titre" className="font-semibold text-brand-700 underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      ) : null}
    </div>
  );
}

async function PinForm({ searchParams }: { searchParams: Search }) {
  const params = await searchParams;
  const reason: PinReason = first(params.raison) === "inscription" ? "inscription" : "recuperation";
  if (first(params.fait)) return <Done reason={reason} />;
  const account = await currentAccount();
  if (!account) redirect("/connexion");

  const t = await getTranslations("auth.pin.create");
  const error = ERRORS.find((e) => e === first(params.erreur));
  const signup = reason === "inscription";
  return (
    <AuthCard title={t.rich(signup ? "title" : "titleReset", richMark)} subtitle={t("subtitle")}>
      <form action={setPinAction} className="space-y-4">
        <input type="hidden" name="raison" value={reason} />
        <Notice tone="success">{t("verified")}</Notice>
        <div className="space-y-2">
          <label htmlFor="pin" className="text-sm font-semibold text-brand-800">
            {t("pin")}
          </label>
          <PinBoxes id="pin" name="pin" autoFocus invalid={Boolean(error) && error !== "different"} describedBy="pin-regles" />
        </div>
        <div className="space-y-2">
          <label htmlFor="pinConfirm" className="text-sm font-semibold text-brand-800">
            {t("confirm")}
          </label>
          <PinBoxes id="pinConfirm" name="pinConfirm" invalid={error === "different"} />
        </div>
        {error ? (
          <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-danger-700">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {t(`errors.${error}`)}
          </p>
        ) : null}
        <ul id="pin-regles" className="space-y-1.5 text-[13px]">
          {(
            [
              ["easy", Check, "text-success-700"],
              ["sequence", X, "text-danger-700"],
              ["personal", X, "text-danger-700"],
              ["secret", ShieldCheck, "text-brand-800"],
            ] as const
          ).map(([key, Icon, color]) => (
            <li key={key} className={`flex items-start gap-1.5 ${color}`}>
              <Icon className="mt-px size-4 shrink-0" aria-hidden />
              {t(`rules.${key}`)}
            </li>
          ))}
        </ul>
        {signup ? (
          <fieldset className="space-y-2.5">
            <legend className="mb-2.5 text-sm font-semibold text-brand-800">{t("device")}</legend>
            {(
              [
                ["perso", Smartphone, "personal"],
                ["partage", Users, "shared"],
              ] as const
            ).map(([value, Icon, key], i) => (
              <label
                key={value}
                className="flex cursor-pointer items-start gap-3 rounded-2xl border-[1.5px] border-line bg-surface p-4 has-[:checked]:border-[2.5px] has-[:checked]:border-brand-600 has-[:checked]:bg-cycle-middle-soft"
              >
                <input type="radio" name="appareil" value={value} defaultChecked={i === 0} className="mt-0.5 size-5 shrink-0 accent-brand-600" />
                <span>
                  <span className="flex items-center gap-2 font-semibold text-brand-800">
                    <Icon className="size-5 text-brand-700" aria-hidden />
                    {t(key)}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">{t(`${key}Hint`)}</span>
                </span>
              </label>
            ))}
          </fieldset>
        ) : (
          <Notice tone="info">{t("resetNote")}</Notice>
        )}
        <button type="submit" className={PILL_BUTTON}>
          {t(signup ? "submit" : "submitReset")}
        </button>
      </form>
    </AuthCard>
  );
}

/** Choix du code PIN, juste après un code reçu par message (inscription ou « Code PIN oublié »). */
export default function ChoosePinPage({ searchParams }: PageProps<"/connexion/code-pin">) {
  // Connexion PIN éteinte : la page n'existe pas.
  if (!isPinLoginEnabled()) notFound();
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <PinForm searchParams={searchParams} />
    </Suspense>
  );
}
