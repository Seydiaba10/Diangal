import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Tableau d'administration : défilement horizontal sur petit écran plutôt que débordement de page. */
export function Table({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    // « relative » : les éléments sr-only (positionnés en absolu) restent dans le cadre défilant.
    <div className="relative overflow-x-auto rounded-2xl border border-line bg-surface">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

export function Th({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      scope="col"
      className={cn("border-b border-line bg-canvas px-4 py-3 text-xs font-medium uppercase tracking-wide text-ink-muted", className)}
      {...props}
    />
  );
}

export function Td({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("border-b border-line px-4 py-3 align-middle text-ink", className)} {...props} />;
}
