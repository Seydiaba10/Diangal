import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { INPUT_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentAvatar } from "@/components/ui/student-avatar";
import { AuthCard } from "@/features/account/components/auth-card";
import { childLookupAction, childSignInAction } from "@/features/family/actions";
import { getFamilyChildrenForLogin, normalizeFamilyCode } from "@/features/family/data";

type SearchParams = PageProps<"/connexion/enfant">["searchParams"];

const ERRORS = ["code", "pin", "bloque", "session"] as const;

export async function generateMetadata() {
  const t = await getTranslations("childLogin");
  return { title: t("title") };
}

/** Étape 1 : le code famille, donné par le parent (page « Famille » de son espace). */
async function CodeForm({ error }: { error?: (typeof ERRORS)[number] }) {
  const t = await getTranslations("childLogin");
  return (
    <form action={childLookupAction} className="space-y-4">
      {error ? <Notice tone="error">{t(`errors.${error}`)}</Notice> : null}
      <div>
        <label htmlFor="code" className="text-sm font-medium text-ink">
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
          className={`${INPUT_CLASS} mt-1.5 text-center font-mono text-xl uppercase tracking-[0.3em]`}
        />
        <p className="mt-1.5 text-xs text-ink-muted">{t("codeHint")}</p>
      </div>
      <Button type="submit" className="w-full">
        {t("next")}
      </Button>
    </form>
  );
}

async function ChildLogin({ searchParams }: { searchParams: SearchParams }) {
  const [{ code, enfant, erreur }, t] = await Promise.all([searchParams, getTranslations("childLogin")]);
  const error = ERRORS.find((e) => e === erreur);
  const family = normalizeFamilyCode(code);
  if (family.length !== 8) return <CodeForm error={error} />;

  const children = await getFamilyChildrenForLogin(family);
  if (!children.length) return <CodeForm error="code" />;
  const selected = children.find((c) => c.id === enfant);

  if (!selected) {
    return (
      <div className="space-y-4">
        <p className="text-center font-medium text-ink">{t("whoAreYou")}</p>
        <ul className="grid grid-cols-2 gap-3">
          {children.map((child) => (
            <li key={child.id}>
              <Link
                href={`/connexion/enfant?code=${family}&enfant=${encodeURIComponent(child.id)}`}
                className="flex flex-col items-center gap-2 rounded-2xl border-2 border-line bg-surface p-4 hover:border-brand-600"
              >
                <StudentAvatar avatarKey={child.avatarKey} className="size-16" />
                <span className="font-semibold text-ink">{child.firstName}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/connexion/enfant" className="block text-center text-sm font-medium text-brand-700 underline">
          {t("otherCode")}
        </Link>
      </div>
    );
  }

  return (
    <form action={childSignInAction.bind(null, family, selected.id)} className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <StudentAvatar avatarKey={selected.avatarKey} className="size-20" />
        <p className="text-lg font-semibold text-ink">{t("hello", { name: selected.firstName })}</p>
      </div>
      {error ? <Notice tone="error">{t(`errors.${error}`)}</Notice> : null}
      <div>
        <label htmlFor="pin" className="text-sm font-medium text-ink">
          {t("pinLabel")}
        </label>
        <input
          id="pin"
          name="pin"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          pattern="[0-9]{4,6}"
          minLength={4}
          maxLength={6}
          required
          autoFocus
          className={`${INPUT_CLASS} mt-1.5 text-center font-mono text-2xl tracking-[0.5em]`}
        />
      </div>
      <Button type="submit" className="w-full">
        {t("signIn")}
      </Button>
      <p className="text-center text-xs text-ink-muted">{t("sharedDevice")}</p>
      <Link href={`/connexion/enfant?code=${family}`} className="block text-center text-sm font-medium text-brand-700 underline">
        {t("notMe")}
      </Link>
    </form>
  );
}

/** Connexion d'un enfant sans email ni téléphone : code famille, prénom, puis code PIN. */
export default async function ChildLoginPage({ searchParams }: PageProps<"/connexion/enfant">) {
  const t = await getTranslations("childLogin");
  return (
    <AuthCard title={t("title")} subtitle={t("subtitle")} centered>
      <Suspense fallback={<Skeleton className="h-72" />}>
        <ChildLogin searchParams={searchParams} />
      </Suspense>
      <p className="mt-6 border-t border-line pt-4 text-center text-sm text-ink-muted">
        {t("withEmail")}{" "}
        <Link href="/connexion" className="font-semibold text-brand-700 hover:underline">
          {t("withEmailLink")}
        </Link>
      </p>
    </AuthCard>
  );
}
