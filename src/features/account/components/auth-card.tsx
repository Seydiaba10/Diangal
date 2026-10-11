import type { ReactNode } from "react";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
      {subtitle ? <p className="mt-1.5 text-sm text-ink-muted">{subtitle}</p> : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

export const INPUT_CLASS =
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink placeholder:text-ink-subtle focus:border-brand-600";
