import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";

/**
 * Logo DIANGAL : le baobab aux livres et le nom. Il mène toujours à la page d'accueil publique,
 * y compris depuis un espace connecté (la session reste ouverte).
 */
export async function Logo({ href = "/", className, inverted = false }: { href?: string; className?: string; inverted?: boolean }) {
  const t = await getTranslations("brand");
  return (
    <Link href={href} aria-label={t("home")} className={cn("inline-flex items-center gap-2 rounded-xl", className)}>
      <span className={cn("flex shrink-0 items-center justify-center", inverted && "rounded-xl bg-white p-1")}>
        <Image src="/brand/logo-mark.png" alt="" width={40} height={39} priority className="h-9 w-auto" />
      </span>
      <span className={cn("text-xl font-extrabold uppercase tracking-wide", inverted ? "text-white" : "text-brand-800")}>
        {t("name")}
      </span>
    </Link>
  );
}
