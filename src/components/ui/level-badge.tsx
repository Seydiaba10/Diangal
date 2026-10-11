import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CYCLE_STYLES, cycleOf, type Cycle } from "@/lib/levels";

/** Classe dans la couleur de son cycle : vert (CI-CM2), jaune (6e-3e) ou rouge (2nde-Terminale). */
export function LevelBadge({ code, children, className }: { code: string; children: ReactNode; className?: string }) {
  const cycle = cycleOf(code);
  const style = cycle ? CYCLE_STYLES[cycle] : null;
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold",
        style ? [style.solid, style.onSolid] : "bg-idle-50 text-idle-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Pastille ronde de la couleur d'un cycle (légendes, intitulés de groupes). */
export function CycleDot({ cycle, className }: { cycle: Cycle; className?: string }) {
  return <span aria-hidden className={cn("inline-block size-2.5 shrink-0 rounded-full", CYCLE_STYLES[cycle].solid, className)} />;
}
