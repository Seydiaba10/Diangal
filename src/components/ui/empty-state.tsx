import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  body?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, body, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">{icon}</span>
      <p className="mt-4 text-lg font-semibold text-ink">{title}</p>
      {body ? <p className="mt-1 max-w-sm text-sm text-ink-muted">{body}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
