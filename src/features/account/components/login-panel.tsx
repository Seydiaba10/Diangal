import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { siApple, siFacebook, siGoogle, siX, type SimpleIcon } from "simple-icons";
import { Notice } from "@/components/ui/notice";
import { cn } from "@/lib/cn";
import { isSupabaseConfigured, isWhatsAppEnabled } from "@/lib/env";
import { requestLoginCodeAction, signInWithSocialAction } from "../actions";
import { getEnabledSocialProviders, SOCIAL_PROVIDERS, type SocialProvider } from "../oauth";
import { LOGIN_PATH, SPACE_ROLES, type LoginSpace } from "../roles";

const ERRORS = ["email", "phone", "unknown", "limit", "sms", "whatsapp", "send", "profil", "lien", "social", "social-inconnu"] as const;
const ICONS: Record<SocialProvider, SimpleIcon> = { facebook: siFacebook, apple: siApple, google: siGoogle, x: siX };

/** Champs arrondis de la maquette de connexion. */
const PILL_INPUT =
  "h-12 w-full rounded-full border border-brand-700 bg-surface px-5 text-base text-ink placeholder:text-ink-subtle focus:border-brand-600 focus:outline-2 focus:outline-brand-600";

type Channel = "whatsapp" | "email";

/**
 * Connexion d'un espace (élèves et parents, ou répétiteurs) : code reçu sur WhatsApp ou par
 * email, ou réseau social pour un compte existant. Pas de mot de passe.
 */
export async function LoginPanel({
  space,
  searchParams,
}: {
  space: LoginSpace;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ mode, erreur, next }, social, t, tDemo] = await Promise.all([
    searchParams,
    getEnabledSocialProviders(),
    getTranslations("auth.login"),
    getTranslations("demo"),
  ]);
  const demo = !isSupabaseConfigured();
  const channels: Channel[] = demo || isWhatsAppEnabled() ? ["whatsapp", "email"] : ["email"];
  const channel = channels.find((c) => c === mode) ?? channels[0]!;
  const error = ERRORS.find((e) => e === erreur);
  const nextValue = typeof next === "string" ? next : undefined;
  const otherSpace: LoginSpace = space === "famille" ? "repetiteur" : "famille";
  const icons = { whatsapp: MessageCircle, email: Mail };
  // Réseaux pas encore ouverts dans Supabase : affichés grisés, avec la mention « bientôt ».
  const closed = SOCIAL_PROVIDERS.filter((p) => !social[p]).map((p) => ICONS[p].title);

  return (
    <div className="space-y-6">
      {error ? <Notice tone="error">{t(`errors.${error === "social-inconnu" ? "socialUnknown" : error}`)}</Notice> : null}

      {channels.length > 1 ? (
        <div className="flex gap-1 rounded-full bg-canvas p-1">
          {channels.map((c) => {
            const Icon = icons[c];
            return (
              <Link
                key={c}
                href={`${LOGIN_PATH[space]}?${new URLSearchParams({ mode: c, ...(nextValue ? { next: nextValue } : {}) })}`}
                aria-current={c === channel ? "page" : undefined}
                className={cn(
                  "flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-sm font-medium",
                  c === channel ? "bg-surface text-ink shadow-sm" : "text-ink-muted",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {t(`tabs.${c}`)}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-sm text-ink-muted">{t("whatsappSoon")}</p>
      )}

      <form action={requestLoginCodeAction} className="space-y-4">
        <input type="hidden" name="mode" value={channel} />
        <input type="hidden" name="espace" value={space} />
        {nextValue ? <input type="hidden" name="next" value={nextValue} /> : null}
        {channel === "email" ? (
          <div>
            <label htmlFor="identifiant" className="text-sm font-semibold text-brand-800">
              {t("emailLabel")}
            </label>
            <input
              id="identifiant"
              name="identifiant"
              type="email"
              required
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              className={cn(PILL_INPUT, "mt-1.5")}
            />
            <p className="mt-1.5 text-xs text-ink-muted">{t("emailHint")}</p>
          </div>
        ) : (
          <div>
            <label htmlFor="identifiant" className="text-sm font-semibold text-brand-800">
              {t("whatsappLabel")}
            </label>
            <div className="mt-1.5 flex gap-2">
              <span className="flex h-12 items-center rounded-full border border-brand-700 bg-canvas px-4 font-medium text-ink">+221</span>
              <input
                id="identifiant"
                name="identifiant"
                type="tel"
                inputMode="numeric"
                required
                pattern="[0-9 ]{9,12}"
                autoComplete="tel-national"
                placeholder={t("phonePlaceholder")}
                className={PILL_INPUT}
              />
            </div>
            <p className="mt-1.5 text-xs text-ink-muted">{t("whatsappHint")}</p>
          </div>
        )}

        {demo ? (
          <fieldset className="rounded-2xl border border-dashed border-line p-3">
            <legend className="px-1 text-xs font-medium text-ink-muted">{tDemo("loginAs")}</legend>
            <div className="grid grid-cols-2 gap-2">
              {SPACE_ROLES[space].map((role, i) => (
                <label key={role} className="flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-canvas px-3 text-sm text-ink">
                  <input type="radio" name="role" value={role} defaultChecked={i === 0} className="accent-brand-600" />
                  {tDemo(`roles.${role}`)}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-full bg-brand-700 font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          {t("submit")}
        </button>
      </form>

      <div className="flex items-center gap-3" role="presentation">
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-800">{t("or")}</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div>
        <ul className="flex justify-center gap-4">
          {SOCIAL_PROVIDERS.map((provider) => {
            const icon = ICONS[provider];
            const svg = (
              <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
                <path d={icon.path} />
              </svg>
            );
            return (
              <li key={provider}>
                {social[provider] ? (
                  <form action={signInWithSocialAction.bind(null, provider, space)}>
                    <button
                      type="submit"
                      aria-label={t("socialLabel", { provider: icon.title })}
                      className="flex size-12 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-brand-600 focus-visible:outline-2 focus-visible:outline-brand-600"
                    >
                      {svg}
                    </button>
                  </form>
                ) : (
                  <span
                    role="img"
                    aria-label={t("socialUnavailable", { provider: icon.title })}
                    title={t("socialUnavailable", { provider: icon.title })}
                    className="flex size-12 items-center justify-center rounded-full border border-line bg-canvas text-ink-subtle"
                  >
                    {svg}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        {closed.length ? (
          <p className="mt-2 text-center text-xs text-ink-subtle">
            {t("socialSoon", { providers: new Intl.ListFormat("fr", { type: "conjunction" }).format(closed) })}
          </p>
        ) : null}
      </div>

      <div className="space-y-2 border-t border-line pt-4 text-center text-sm">
        <p className="text-ink-muted">
          {t("noAccount")}{" "}
          <Link href={space === "repetiteur" ? "/inscription?role=tutor" : "/inscription"} className="font-semibold text-brand-700 hover:underline">
            {t("signUpLink")}
          </Link>
        </p>
        <p className="text-ink-muted">
          {t(`otherSpace.${space}`)}{" "}
          <Link href={LOGIN_PATH[otherSpace]} className="font-semibold text-brand-700 hover:underline">
            {t(`otherSpaceLink.${space}`)}
          </Link>
        </p>
        {space === "famille" ? (
          <p className="text-ink-muted">
            {t("childLogin")}{" "}
            <Link href="/connexion/enfant" className="font-semibold text-brand-700 hover:underline">
              {t("childLoginLink")}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
