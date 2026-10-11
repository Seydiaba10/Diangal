import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number;
  label: string;
  /** Classe de remplissage, par défaut la couleur de marque. */
  fillClassName?: string;
  className?: string;
}

export function ProgressBar({ value, label, fillClassName = "bg-brand-600", className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-idle-200", className)}
    >
      <div className={cn("h-full rounded-full", fillClassName)} style={{ width: `${pct}%` }} />
    </div>
  );
}
