import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "/#cours", key: "courses" },
  { href: "/#examens", key: "exams" },
  { href: "/#parents", key: "parents" },
  { href: "/tarifs", key: "pricing" },
  { href: "/devenir-repetiteur", key: "becomeTutor" },
] as const;

/** Barre de navigation en « pilule » flottante, inspirée de la maquette Kindering. */
export async function MarketingHeader({ overlay = false }: { overlay?: boolean }) {
  const t = await getTranslations("marketing.header");
  return (
    <header className={cn("z-20 w-full px-4 pt-4", overlay ? "absolute inset-x-0 top-0" : "relative")}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-2xl border border-white/70 bg-surface/90 px-3 shadow-sm backdrop-blur sm:px-4">
        <Logo href="/" />
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
          <Link
            href="/connexion"
            className="hidden h-11 items-center rounded-xl px-3 text-sm font-medium text-ink hover:bg-canvas sm:inline-flex"
          >
            {t("signIn")}
          </Link>
          <ButtonLink href="/inscription" size="sm">
            {t("signUp")}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
