import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function AuthCard({
  title,
  subtitle,
  centered = false,
  children,
}: {
  title: string;
  subtitle?: ReactNode;
  /** Titre centré, plus grand (pages de connexion). */
  centered?: boolean;
  children: ReactNode;
}) {
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
