import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { NAV, type NavItem } from "@/lib/navigation";
import type { AppRole } from "@/types/domain";
import { DemoRoleSwitcher } from "./demo-role-switcher";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";
import { PremiumCard } from "./premium-card";
import { SessionCard, SessionCardSkeleton } from "./session-card";

export async function Sidebar({ role }: { role: AppRole }) {
  const t = await getTranslations("nav");
  const nav = NAV[role];

  const renderItems = (items: NavItem[]) => (
    <ul className="mt-2 space-y-1">
      {items.map(({ labelKey, href, icon: Icon, exact }) => (
        <li key={href}>
          <NavLink
            variant="sidebar"
            href={href}
            exact={exact}
            label={t(labelKey)}
            icon={<Icon className="size-5" aria-hidden />}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-62 flex-col border-r border-line bg-surface lg:flex">
      <div className="px-5 pb-5 pt-6">
        <Logo href={nav.main[0]!.href} />
      </div>
      <div className="px-4">
        <Suspense fallback={<SessionCardSkeleton />}>
          <SessionCard role={role} />
        </Suspense>
      </div>
      <nav aria-label={t("primary")} className="mt-6 flex-1 overflow-y-auto px-4">
        <p className="px-3 text-xs font-medium uppercase tracking-wider text-ink-subtle">{t("mainMenu")}</p>
        {renderItems(nav.main)}
        <p className="mt-6 px-3 text-xs font-medium uppercase tracking-wider text-ink-subtle">{t("others")}</p>
        {renderItems(nav.others)}
      </nav>
      <div className="space-y-3 p-4">
        {role === "student" ? (
          <Suspense fallback={null}>
            <PremiumCard />
          </Suspense>
        ) : null}
        <DemoRoleSwitcher current={role} />
      </div>
    </aside>
  );
}
