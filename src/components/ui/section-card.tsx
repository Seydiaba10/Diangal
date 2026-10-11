import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionCard({
  id,
  title,
  subtitle,
  action,
  className,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={cn("rounded-2xl border border-line bg-surface p-4 sm:p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={id} className="font-semibold text-ink">
            {title}
          </h2>
          {subtitle ? <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
