import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionUser } from "@/features/account/data";
import { NAV } from "@/lib/navigation";
import type { AppRole } from "@/types/domain";
import { NotificationsLink, StreakChip } from "./header-widgets";
import { Logo } from "./logo";
import { UserAvatar } from "./session-card";

async function MobileTopBarActions({ role }: { role: AppRole }) {
  const [user, t] = await Promise.all([getSessionUser(role), getTranslations("header")]);
  return (
    <div className="flex items-center gap-2">
      {user.streakDays !== undefined ? <StreakChip count={user.streakDays} /> : null}
      <NotificationsLink unread={user.unreadNotifications} />
      <Link href={NAV[role].profileHref} aria-label={t("openProfile")} className="rounded-full">
        <UserAvatar user={user} className="size-11" />
      </Link>
    </div>
  );
}

/** Barre du haut sur mobile : le profil y est accessible par l'avatar (5 onglets max en bas). */
export function MobileTopBar({ role }: { role: AppRole }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-line bg-surface px-4 lg:hidden">
      <Logo href="/" />
      <Suspense fallback={<Skeleton className="h-11 w-36" />}>
        <MobileTopBarActions role={role} />
      </Suspense>
    </header>
  );
}
