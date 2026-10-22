import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { ROLE_HOME } from "@/features/account/roles";
import { getAuthIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";

const LINKS = [
  { href: "/#cours", key: "courses" },
  { href: "/#examens", key: "exams" },
  { href: "/#parents", key: "parents" },
  { href: "/tarifs", key: "pricing" },
  { href: "/devenir-repetiteur", key: "becomeTutor" },
] as const;

/** Visiteur : se connecter / s'inscrire. */
async function GuestLinks() {
  const t = await getTranslations("marketing.header");
  return (
    <>
      <Link href="/connexion" className="inline-flex h-11 items-center whitespace-nowrap rounded-xl px-2 text-sm font-medium text-ink hover:bg-canvas sm:px-3">
        {t("signIn")}
      </Link>
      <ButtonLink href="/inscription" size="sm">
        {t("signUp")}
        <ArrowRight className="hidden size-4 sm:block" aria-hidden />
      </ButtonLink>
    </>
  );
}

/** Déjà connecté (arrivé ici par le logo) : retour direct à son espace. */
async function AccountLinks() {
  const identity = isSupabaseConfigured() ? await getAuthIdentity() : null;
  if (!identity) return <GuestLinks />;
  const t = await getTranslations("marketing.header");
  return (
    <ButtonLink href={ROLE_HOME[identity.role]} size="sm">
      {t("mySpace")}
      <ArrowRight className="size-4" aria-hidden />
    </ButtonLink>
  );
}

/** Barre de navigation en « pilule » flottante, inspirée de la maquette Kindering. */
export async function MarketingHeader() {
  const t = await getTranslations("marketing.header");
  return (
    <header className="relative z-20 w-full px-4 pt-4">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-2xl border border-line bg-surface/95 px-3 shadow-sm backdrop-blur sm:px-4">
        <Logo href="/" compact />
        <nav aria-label={t("label")} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Suspense fallback={<GuestLinks />}>
            <AccountLinks />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
