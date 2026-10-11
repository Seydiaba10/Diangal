import { Circle, CircleCheck, CircleDot, Crown, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ChapterStatus } from "@/types/domain";

type Tone = "success" | "info" | "idle" | "premium" | "danger" | "brand";

const TONES: Record<Tone, string> = {
  success: "bg-success-50 text-success-700",
  info: "bg-info-50 text-info-700",
  idle: "bg-idle-50 text-idle-700",
  premium: "bg-premium-50 text-premium-700",
  danger: "bg-danger-50 text-danger-700",
  brand: "bg-brand-50 text-brand-700",
};

interface BadgeProps {
  tone: Tone;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone, icon: Icon, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
        TONES[tone],
        className,
      )}
    >
      {Icon ? <Icon className="size-3.5" aria-hidden /> : null}
      {children}
    </span>
  );
}

// Vert = terminé, bleu = en cours, gris = non commencé. Toujours icône + libellé.
const STATUS_BADGE: Record<ChapterStatus, { tone: Tone; icon: LucideIcon }> = {
  completed: { tone: "success", icon: CircleCheck },
  in_progress: { tone: "info", icon: CircleDot },
  not_started: { tone: "idle", icon: Circle },
};

export async function ChapterStatusBadge({ status }: { status: ChapterStatus }) {
  const t = await getTranslations("chapterStatus");
  const { tone, icon } = STATUS_BADGE[status];
  return (
    <Badge tone={tone} icon={icon}>
      {t(status)}
    </Badge>
  );
}

export async function PremiumBadge() {
  const t = await getTranslations("badges");
  return (
    <Badge tone="premium" icon={Crown}>
      {t("premium")}
    </Badge>
  );
}
