import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface StatCardProps {
  icon: ReactNode;
  /** Teinte du carré d'icône (fond + couleur), ex. « bg-brand-50 text-brand-700 ». */
  iconClassName: string;
  label: string;
  value: string;
  suffix?: string;
  hint?: string;
}

export function StatCard({ icon, iconClassName, label, value, suffix, hint }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5" title={hint}>
      <span className={cn("flex size-11 items-center justify-center rounded-xl", iconClassName)}>{icon}</span>
      <p className="mt-4 flex items-baseline gap-0.5">
        <span className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{value}</span>
        {suffix ? <span className="text-sm font-medium text-ink-muted">{suffix}</span> : null}
      </p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
    </div>
  );
}
