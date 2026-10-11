import { Bell, Flame, MessageCircle, Search } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export async function StreakChip({ count, className }: { count: number; className?: string }) {
  const t = await getTranslations("header");
  const label = t("streak", { count });
  return (
    <span
      title={label}
      className={cn(
        "inline-flex h-11 items-center gap-1.5 rounded-xl border border-line bg-surface px-3 text-sm font-semibold text-ink",
        className,
      )}
    >
      <Flame className="size-5 text-flame-500" aria-hidden />
      <span aria-hidden>{count}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

interface IconLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  badge?: number;
}

export function IconLink({ href, label, icon, badge }: IconLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative inline-flex size-11 items-center justify-center rounded-xl border border-line bg-surface text-ink-muted transition-colors hover:text-ink"
    >
      {icon}
      {badge ? (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-danger-500 text-[11px] font-semibold text-white"
        >
          {badge > 9 ? "9+" : badge}
        </span>
      ) : null}
    </Link>
  );
}

export async function NotificationsLink({ unread }: { unread: number }) {
  const t = await getTranslations("header");
  return (
    <IconLink
      href="/notifications"
      label={t("notifications", { count: unread })}
      icon={<Bell className="size-5" aria-hidden />}
      badge={unread}
    />
  );
}

export async function MessagesLink() {
  const t = await getTranslations("nav");
  return <IconLink href="/messages" label={t("messages")} icon={<MessageCircle className="size-5" aria-hidden />} />;
}

/** Recherche sans JavaScript : simple formulaire GET vers le catalogue. */
export async function SearchForm({ className }: { className?: string }) {
  const t = await getTranslations("header");
  return (
    <form action="/eleve/cours" role="search" className={cn("relative", className)}>
      <label htmlFor="recherche-cours" className="sr-only">
        {t("searchLabel")}
      </label>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-ink-subtle" aria-hidden />
      <input
        id="recherche-cours"
        name="q"
        type="search"
        placeholder={t("searchPlaceholder")}
        className="h-11 w-full rounded-xl border border-line bg-surface pl-11 pr-4 text-sm text-ink placeholder:text-ink-subtle focus:border-brand-600"
      />
    </form>
  );
}
