import { cn } from "@/lib/cn";
import { SUBJECT_STYLES } from "@/lib/subjects";
import type { SubjectCode } from "@/types/domain";

const SIZES = {
  sm: { box: "size-10 rounded-xl", icon: "size-5" },
  md: { box: "size-11 rounded-xl", icon: "size-5" },
  lg: { box: "size-14 rounded-2xl", icon: "size-7" },
};

/** Carré d'icône aux couleurs de la matière. */
export function SubjectIcon({
  code,
  size = "md",
  inverted = false,
}: {
  code: SubjectCode;
  size?: keyof typeof SIZES;
  /** Fond blanc (sur une carte déjà pastel). */
  inverted?: boolean;
}) {
  const style = SUBJECT_STYLES[code];
  const Icon = style.icon;
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center",
        SIZES[size].box,
        inverted ? "bg-surface" : style.soft,
        style.text,
      )}
    >
      <Icon className={SIZES[size].icon} aria-hidden />
    </span>
  );
}
