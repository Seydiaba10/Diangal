import { CircleAlert, Info, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { isSupabaseConfigured } from "@/lib/env";
import { signInWithPasswordAction, type PasswordSpace } from "../password-actions";
import { profileLabels } from "../profile-labels";
import { PILL_BUTTON, PILL_INPUT } from "./auth-card";
import { richMark } from "./highlight";
import { PasswordField } from "./password-field";
import { ProfileCards } from "./profile-picker";

const ERRORS = ["identifiants", "bloque", "recuperation", "limit", "non-verifie"] as const;
type Search = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/** E-mail + mot de passe : répétiteurs (page publique) et administrateur (page non liée sur le site). */
export async function PasswordLoginForm({ space, searchParams }: { space: PasswordSpace; searchParams: Promise<Search> }) {
  const params = await searchParams;
  const [t, labels] = await Promise.all([getTranslations("auth.password"), profileLabels()]);
  const error = ERRORS.find((e) => e === first(params.erreur));
  const next = first(params.next);
  const minutes = Math.max(1, Math.ceil(Number(first(params.attente)) / 60) || 15);
  const admin = space === "admin";

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[27px] font-bold leading-tight tracking-tight text-balance text-brand-800 lg:text-[34px]">
          {t.rich(admin ? "admin.title" : "login.title", richMark)}
        </h1>
        <p className="mt-2 text-[15px] leading-normal text-ink-muted">{t(admin ? "admin.subtitle" : "login.subtitle")}</p>
      </div>

      {admin ? null : (
        <div className="space-y-1.5 lg:hidden">
          <p className="text-sm font-semibold text-brand-800">{t("login.iAm")}</p>
          <ProfileCards labels={labels} current="repetiteur" />
        </div>
      )}

      <form action={signInWithPasswordAction} className="space-y-4">
        <input type="hidden" name="espace" value={space} />
        {next ? <input type="hidden" name="next" value={next} /> : null}
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-brand-800">
            {t("email")}
          </label>
          <input id="email" name="email" type="email" required autoComplete="username" placeholder="nom@exemple.sn" className={`${PILL_INPUT} mt-1.5`} />
        </div>
        <div>
          <PasswordField
            id="password"
            name="password"
            label={t("password")}
            showLabel={t("show")}
            hideLabel={t("hide")}
            autoComplete="current-password"
            invalid={error === "identifiants"}
          />
          <div className="flex justify-end">
            <Link href={`/connexion/mot-de-passe?espace=${space}`} className="flex min-h-11 items-center text-sm font-semibold text-brand-700 underline">
              {t("forgot")}
            </Link>
          </div>
        </div>
        {error ? (
          <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-danger-700">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
            {error === "bloque" ? t("errors.bloque", { minutes }) : t(`errors.${error}`)}
          </p>
        ) : null}
        {admin ? null : (
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink">
            <input type="checkbox" name="partage" className="mt-0.5 size-5 shrink-0 accent-brand-600" />
            <span>
              {t("shared")} <span className="text-ink-muted">{t("sharedHint")}</span>
            </span>
          </label>
        )}
        {isSupabaseConfigured() ? null : (
          <p className="flex gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-800">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {t("demoHint")}
          </p>
        )}
        <button type="submit" className={PILL_BUTTON}>
          <Lock className="size-5" aria-hidden />
          {t(admin ? "admin.submit" : "login.submit")}
        </button>
      </form>

      {admin ? (
        <p className="flex gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-800">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t("admin.next")}
        </p>
      ) : (
        <div className="space-y-2 pt-1 text-center text-sm text-ink-muted">
          <p>
            {t("login.noAccount")}{" "}
            <Link href="/inscription?role=tutor" className="font-semibold text-brand-700 underline">
              {t("login.signUp")}
            </Link>
          </p>
          <p>
            {t("login.family")}{" "}
            <Link href="/connexion" className="font-semibold text-brand-700 underline">
              {t("login.familyLink")}
            </Link>
          </p>
          <p className="text-xs">
            {t("login.legacy")}{" "}
            <Link href="/connexion/repetiteur?mode=email" className="font-semibold text-brand-700 underline">
              {t("login.legacyLink")}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
