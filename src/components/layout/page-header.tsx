import type { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-ink lg:text-[28px] lg:leading-9">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-ink-muted lg:text-base">{subtitle}</p> : null}
      </div>
      {actions}
    </header>
  );
}
