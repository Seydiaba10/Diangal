import type { ReactNode } from "react";

export const INPUT_CLASS =
  "h-12 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink placeholder:text-ink-subtle focus:border-brand-600";

export const TEXTAREA_CLASS =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-subtle focus:border-brand-600";

export function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint ? <p className="mt-1.5 text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}

/** Case à cocher en forme de pastille (matières, niveaux…). */
export function ChipCheckbox({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-ink has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-700">
      <input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} className="accent-brand-600" />
      {label}
    </label>
  );
}
