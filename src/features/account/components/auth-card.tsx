import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isPinLoginEnabled } from "@/lib/env";

/**
 * Bloc d'une page de connexion. Nouvelle présentation (interrupteur DIANGAL_PIN_LOGIN) : titre à gauche,
 * mots surlignés possibles, sans cadre, sur la colonne blanche. Sinon : carte blanche sur fond crème.
 */
export function AuthCard({
  title,
  subtitle,
  centered = false,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Titre centré, plus grand (pages de connexion, ancienne présentation). */
  centered?: boolean;
  children: ReactNode;
}) {
  if (isPinLoginEnabled()) {
    return (
      <div>
        <h1 className="text-[27px] font-bold leading-tight tracking-tight text-balance text-brand-800 lg:text-[34px]">{title}</h1>
        {subtitle ? <p className="mt-2 text-[15px] leading-normal text-ink-muted">{subtitle}</p> : null}
        <div className="mt-6">{children}</div>
      </div>
    );
  }
  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <h1 className={cn("font-bold tracking-tight", centered ? "text-center text-3xl text-brand-800" : "text-2xl text-ink")}>{title}</h1>
      {subtitle ? <p className={cn("mt-1.5 text-sm text-ink-muted", centered && "text-center")}>{subtitle}</p> : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export const INPUT_CLASS =
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink placeholder:text-ink-subtle focus:border-brand-600";

/** Champ en pilule des pages de connexion (numéro, email, mot de passe). */
export const PILL_INPUT =
  "h-12 w-full rounded-full border border-brand-700 bg-surface px-5 text-base text-ink placeholder:text-ink-subtle focus:border-brand-600 focus:outline-2 focus:outline-brand-600";

/** Bouton principal en pilule des pages de connexion. */
export const PILL_BUTTON =
  "flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-brand-700 px-4 font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700";

/** Bouton secondaire en pilule (bordure verte). */
export const PILL_OUTLINE =
  "flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border-[1.5px] border-brand-700 bg-surface px-4 font-semibold text-brand-700 transition-colors hover:bg-brand-50";
