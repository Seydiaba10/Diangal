import { CircleAlert, CircleCheck, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const TONES = {
  success: { box: "bg-success-50 text-success-700", icon: CircleCheck },
  error: { box: "bg-danger-50 text-danger-700", icon: CircleAlert },
  info: { box: "bg-brand-50 text-brand-800", icon: Info },
  warning: { box: "bg-premium-50 text-premium-700", icon: CircleAlert },
};

export function Notice({
  tone,
  children,
  className,
}: {
  tone: keyof typeof TONES;
  children: ReactNode;
  className?: string;
}) {
  const { box, icon: Icon } = TONES[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("flex gap-2.5 rounded-xl px-4 py-3 text-sm font-medium", box, className)}>
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
