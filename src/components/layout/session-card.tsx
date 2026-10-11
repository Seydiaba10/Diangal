import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentAvatar } from "@/components/ui/student-avatar";
import { getSessionUser } from "@/features/account/data";
import { cn } from "@/lib/cn";
import { NAV } from "@/lib/navigation";
import type { AppRole, SessionUser } from "@/types/domain";

/** Avatar illustré (élève) ou initiales (adultes). */
export function UserAvatar({ user, className }: { user: SessionUser; className?: string }) {
  if (user.avatarKey) return <StudentAvatar avatarKey={user.avatarKey} className={className} />;
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-pastel-lavender text-sm font-semibold text-ink",
        className,
      )}
    >
      {`${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase()}
    </span>
  );
}

export async function userSubtitle(user: SessionUser): Promise<string> {
  const t = await getTranslations("session");
  switch (user.role) {
    case "student":
      return user.schoolName
        ? t("studentSubtitle", { level: user.levelName ?? "", school: user.schoolName })
        : (user.levelName ?? "");
    case "parent":
      return t("parentSubtitle", { count: user.childrenCount ?? 0 });
    case "tutor":
      return t("tutorSubtitle");
    case "admin":
      return t("adminSubtitle");
  }
}

export async function SessionCard({ role }: { role: AppRole }) {
  const [user, tHeader] = await Promise.all([getSessionUser(role), getTranslations("header")]);
  const subtitle = await userSubtitle(user);
  return (
    <Link
      href={NAV[role].profileHref}
      aria-label={tHeader("openProfile")}
      className="flex items-center gap-3 rounded-2xl border border-line p-3 transition-colors hover:bg-canvas"
    >
      <UserAvatar user={user} className="size-10" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-ink">
          {user.firstName} {user.lastName}
        </span>
        <span className="block truncate text-xs text-ink-muted">{subtitle}</span>
      </span>
      <ChevronRight className="size-4 text-ink-subtle" aria-hidden />
    </Link>
  );
}

export function SessionCardSkeleton() {
  return <Skeleton className="h-[66px] rounded-2xl" />;
}
