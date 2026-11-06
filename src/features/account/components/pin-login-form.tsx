import { CircleAlert, Info, Lock } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { DialCodeSelect } from "@/components/ui/dial-code-select";
import { Notice } from "@/components/ui/notice";
import { isSupabaseConfigured, phoneCountries } from "@/lib/env";
import { signInWithPinAction } from "../pin-actions";
import { profileLabels } from "../profile-labels";
import { SPACE_ROLES } from "../roles";
import { PILL_BUTTON, PILL_INPUT, PILL_OUTLINE } from "./auth-card";
import { richMark } from "./highlight";
import { PinBoxes } from "./pin-boxes";
import { ProfileCards } from "./profile-picker";

const ERRORS = ["phone", "identifiants", "bloque", "recuperation", "limit", "profil"] as const;
const INFOS = ["session-expiree", "session-enfant", "deconnecte", "compte-supprime"] as const;
type Search = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/**
 * Connexion des élèves et des parents : numéro + code PIN, sans message. Un élève est tutoyé (?profil=eleve).
 * Les comptes créés avec un email gardent la connexion par code email pendant la transition.
 */
export async function PinLoginForm({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const [t, tDemo, labels] = await Promise.all([getTranslations("auth.pin"), getTranslations("demo"), profileLabels()]);
  const tu = first(params.profil) === "eleve";
  const error = ERRORS.find((e) => e === first(params.erreur));
  const info = INFOS.find((i) => i === first(params.info));
  const next = first(params.next);
  const minutes = Math.max(1, Math.ceil(Number(first(params.attente)) / 60) || 15);
  const demo = !isSupabaseConfigured();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[27px] font-bold leading-tight tracking-tight text-balance text-brand-800 lg:text-[34px]">
          {t.rich(tu ? "login.titleTu" : "login.title", richMark)}
        </h1>
        <p className="mt-2 text-[15px] leading-normal text-ink-muted">{t(tu ? "login.subtitleTu" : "login.subtitle")}</p>
      </div>

      {info ? <Notice tone={info === "compte-supprime" ? "success" : "info"}>{t(`info.${info}`)}</Notice> : null}

      <div className="space-y-1.5 lg:hidden">
        <p className="text-sm font-semibold text-brand-800">{t("login.iAm")}</p>
        <ProfileCards labels={labels} current={tu ? "eleve" : "parent"} />
      </div>

      <form action={signInWithPinAction} className="space-y-4">
        {next ? <input type="hidden" name="next" value={next} /> : null}
        <div>
          <label htmlFor="identifiant" className="text-sm font-semibold text-brand-800">
            {t(tu ? "login.phoneTu" : "login.phone")}
          </label>
          <div className="mt-1.5 flex gap-2">
            <DialCodeSelect countries={phoneCountries()} name="pays" label={t("login.dialCode")} className="rounded-full border-brand-700" />
            <input
              id="identifiant"
              name="identifiant"
              type="tel"
              inputMode="tel"
              required
              autoComplete="tel-national"
              placeholder="77 000 00 00"
              className={PILL_INPUT}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="pin" className="text-sm font-semibold text-brand-800">
              {t("login.pin")}
            </label>
            <Link href="/connexion/pin-oublie" className="flex min-h-11 items-center text-sm font-semibold text-brand-700 underline">
              {t("login.forgot")}
            </Link>
          </div>
          <PinBoxes id="pin" name="pin" invalid={error === "identifiants"} describedBy={error ? "connexion-erreur" : undefined} />
          {error ? (
            <p id="connexion-erreur" role="alert" className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger-700">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              {error === "bloque" ? t("errors.bloque", { minutes }) : t(`errors.${error}`)}
            </p>
          ) : null}
          {error === "recuperation" || error === "bloque" ? (
            <Link href="/connexion/pin-oublie" className={`${PILL_OUTLINE} mt-3`}>
              {t("errors.recover")}
            </Link>
          ) : null}
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
          <input type="checkbox" name="partage" className="mt-0.5 size-5 shrink-0 accent-brand-600" />
          <span>
            {t("login.shared")} <span className="text-ink-muted">{t("login.sharedHint")}</span>
          </span>
        </label>

        {demo ? (
          <fieldset className="rounded-2xl border border-dashed border-line p-3">
            <legend className="px-1 text-xs font-medium text-ink-muted">{tDemo("loginAs")}</legend>
            <div className="grid grid-cols-2 gap-2">
              {SPACE_ROLES.famille
                .filter((r) => r !== "admin")
                .map((role, i) => (
                  <label key={role} className="flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-canvas px-3 text-sm text-ink">
                    <input type="radio" name="role" value={role} defaultChecked={i === (tu ? 0 : 1)} className="accent-brand-600" />
                    {tDemo(`roles.${role}`)}
                  </label>
                ))}
            </div>
            <p className="mt-2 flex gap-2 text-xs text-ink-muted">
              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              {t("login.demoHint")}
            </p>
          </fieldset>
        ) : null}

        <button type="submit" className={PILL_BUTTON}>
          <Lock className="size-5" aria-hidden />
          {t("login.submit")}
        </button>
      </form>

      <div className="flex items-center gap-3" role="presentation">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[13px] font-bold uppercase text-brand-800">{t("login.or")}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <Link href={tu ? "/inscription?role=student" : "/inscription"} className={PILL_OUTLINE}>
        {t("login.createAccount")}
      </Link>

      <div className="space-y-2 pt-1 text-center text-sm text-ink-muted">
        <p>
          {t(tu ? "login.childTu" : "login.child")}{" "}
          <Link href="/connexion/enfant" className="font-semibold text-brand-700 underline">
            {t("login.childLink")}
          </Link>
        </p>
        <p className="text-xs">
          {t("login.legacy")}{" "}
          <Link href="/connexion?mode=email" className="font-semibold text-brand-700 underline">
            {t("login.legacyLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
