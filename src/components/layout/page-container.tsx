import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const WIDTHS = {
  wide: "max-w-[1400px]",
  default: "max-w-5xl",
  narrow: "max-w-3xl",
};

export function PageContainer({
  width = "default",
  className,
  children,
}: {
  width?: keyof typeof WIDTHS;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-4 py-5 sm:px-6 lg:px-8 lg:py-8", WIDTHS[width], className)}>{children}</div>
  );
}
