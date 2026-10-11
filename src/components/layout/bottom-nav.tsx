import { getTranslations } from "next-intl/server";
import { NAV } from "@/lib/navigation";
import type { AppRole } from "@/types/domain";
import { NavLink } from "./nav-link";

export async function BottomNav({ role }: { role: AppRole }) {
  const t = await getTranslations("nav");
  const items = [...NAV[role].main, ...NAV[role].others].filter((item) => item.inBottomNav);
  return (
    <nav
      aria-label={t("primary")}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map(({ labelKey, href, icon: Icon, exact }) => (
          <li key={href}>
            <NavLink
              variant="bottom"
              href={href}
              exact={exact}
              label={t(labelKey)}
              icon={<Icon className="size-5" aria-hidden />}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
