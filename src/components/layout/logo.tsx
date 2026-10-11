import { BookOpen } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";

export async function Logo({ href = "/", className, inverted = false }: { href?: string; className?: string; inverted?: boolean }) {
  const t = await getTranslations("brand");
  return (
    <Link href={href} aria-label={t("home")} className={cn("inline-flex items-center gap-2.5 rounded-xl", className)}>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-xl",
          inverted ? "bg-white text-brand-700" : "bg-brand-600 text-white",
        )}
      >
        <BookOpen className="size-5" aria-hidden />
      </span>
      <span className={cn("text-xl font-semibold tracking-tight", inverted ? "text-white" : "text-ink")}>{t("name")}</span>
    </Link>
  );
}
