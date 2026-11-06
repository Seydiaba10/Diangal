import { ChevronRight, CircleAlert } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/button";
import { INPUT_CLASS } from "@/components/ui/form";
import { StudentAvatar } from "@/components/ui/student-avatar";
import { PILL_BUTTON } from "@/features/account/components/auth-card";
import { richMark } from "@/features/account/components/highlight";
import { PinBoxes } from "@/features/account/components/pin-boxes";
import { childLookupAction } from "../actions";
import { getDeviceChildrenForLogin, getFamilyChildrenForLogin, normalizeFamilyCode } from "../data";
import { childPinSignInAction } from "../pin-actions";

type Search = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const ERRORS = ["code", "pin", "bloque", "session"] as const;
const TITLE = "text-[27px] font-bold leading-tight tracking-tight text-balance text-brand-800 lg:text-[34px]";

/**
 * Connexion d'un enfant (connexion par code PIN) : sur un appareil de la famille, ses frères et sœurs et lui
 * sont affichés directement ; ailleurs, le code famille. Puis son code PIN (6 chiffres). Il est tutoyé.
 */
export async function ChildLoginV2({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const t = await getTranslations("childLogin");
  const error = ERRORS.find((e) => e === first(params.erreur));
  const typedCode = normalizeFamilyCode(first(params.code));
  const wantsCode = first(params.autre) === "1";

  const device = typedCode || wantsCode ? null : await getDeviceChildrenForLogin();
  const children = typedCode.length === 8 ? await getFamilyChildrenForLogin(typedCode) : (device?.children ?? []);
  const selected = children.find((c) => c.id === first(params.enfant));

  // Pas d'appareil de la famille ni de code : on demande le code famille.
  if (!children.length) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className={TITLE}>{t.rich("v2.codeTitle", richMark)}</h1>
          <p className="mt-2 text-[15px] text-ink-muted">{t("v2.codeSubtitle")}</p>
        </div>
        <form action={childLookupAction} className="space-y-4">
          {error === "code" || (typedCode.length === 8 && !children.length) ? (
            <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-danger-700">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              {t("errors.code")}
            </p>
          ) : null}
          <div>
            <label htmlFor="code" className="text-sm font-semibold text-brand-800">
              {t("codeLabel")}
            </label>
            <input
              id="code"
              name="code"
              required
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={12}
              placeholder="ABCD2345"
              className={`${INPUT_CLASS} mt-1.5 rounded-full text-center font-mono text-xl uppercase tracking-[0.3em]`}
            />
            <p className="mt-1.5 text-xs text-ink-muted">{t("codeHint")}</p>
          </div>
          <button type="submit" className={PILL_BUTTON}>
            {t("next")}
          </button>
        </form>
        <p className="text-center text-sm text-ink-muted">
          {t("withEmail")}{" "}
          <Link href="/connexion" className="font-semibold text-brand-700 underline">
            {t("withEmailLink")}
          </Link>
        </p>
      </div>
    );
  }

  const familyQuery = typedCode.length === 8 ? `code=${typedCode}&` : "";
  if (!selected) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className={TITLE}>{t.rich("v2.whoTitle", richMark)}</h1>
          <p className="mt-2 text-[15px] text-ink-muted">
            {device && !typedCode ? t("v2.deviceOf", { name: device.parentFirstName }) : t("v2.touchName")}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {children.map((child) => (
            <li key={child.id}>
              <Link
                href={`/connexion/enfant?${familyQuery}enfant=${encodeURIComponent(child.id)}`}
                className="flex flex-col items-center gap-2.5 rounded-[22px] border-[1.5px] border-line bg-surface px-3 py-5 hover:border-brand-600"
              >
                <StudentAvatar avatarKey={child.avatarKey} className="size-[88px]" />
                <span className="text-lg font-bold text-ink">{child.firstName}</span>
              </Link>
            </li>
          ))}
        </ul>
        {device && !typedCode ? (
          <Link href="/connexion?profil=parent" className="flex items-center gap-3 rounded-[18px] border-[1.5px] border-dashed border-line px-4 py-3 text-ink">
            <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cycle-middle font-bold">
              {device.parentFirstName.slice(0, 1).toUpperCase()}
            </span>
            <span className="flex-1">
              <span className="block text-[15px] font-semibold">{t("v2.parentSpace")}</span>
              <span className="text-[13px] text-ink-muted">{t("v2.parentSpaceHint", { name: device.parentFirstName })}</span>
            </span>
            <ChevronRight className="size-5 text-brand-700" aria-hidden />
          </Link>
        ) : null}
        <p className="text-center text-sm text-ink-muted">
          {t("v2.otherFamily")}{" "}
          <Link href="/connexion/enfant?autre=1" className="font-semibold text-brand-700 underline">
            {t("v2.otherFamilyLink")}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form action={childPinSignInAction.bind(null, typedCode.length === 8 ? typedCode : null, selected.id)} className="space-y-4">
      <div className="flex flex-col items-center gap-2.5 text-center">
        <StudentAvatar avatarKey={selected.avatarKey} className="size-[84px]" />
        <h1 className={TITLE}>{t.rich("v2.hello", { ...richMark, name: selected.firstName })}</h1>
        <p className="text-[15px] text-ink-muted">{t("v2.typePin")}</p>
      </div>
      <div className="space-y-2">
        <label htmlFor="pin" className="sr-only">
          {t("pinLabel")}
        </label>
        <PinBoxes id="pin" name="pin" autoFocus invalid={error === "pin"} />
      </div>
      {error && error !== "code" ? (
        <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-danger-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          {t(`errors.${error}`)}
        </p>
      ) : null}
      <button type="submit" className={PILL_BUTTON}>
        {t("signIn")}
      </button>
      <p className="text-center text-sm text-ink-muted">{t("v2.forgot")}</p>
      <ButtonLink href={`/connexion/enfant${familyQuery ? `?${familyQuery.slice(0, -1)}` : ""}`} variant="ghost" className="w-full">
        {t("notMe")}
      </ButtonLink>
    </form>
  );
}
