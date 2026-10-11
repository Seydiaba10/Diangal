import { getTranslations } from "next-intl/server";
import { switchDemoRoleAction } from "@/features/account/actions";
import { ROLES } from "@/features/account/roles";
import { cn } from "@/lib/cn";
import type { AppRole } from "@/types/domain";

/** Phases 1-2 uniquement : bascule entre les comptes de démonstration (supprimé en phase 4). */
export async function DemoRoleSwitcher({ current, className }: { current: AppRole; className?: string }) {
  const t = await getTranslations("demo");
  return (
    <div className={cn("rounded-2xl border border-dashed border-line p-3", className)}>
      <p className="text-xs font-medium text-ink-muted">{t("title")}</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {ROLES.map((role) => (
          <form key={role} action={switchDemoRoleAction.bind(null, role)}>
            <button
              type="submit"
              aria-pressed={role === current}
              className={cn(
                "h-10 w-full rounded-lg text-xs font-medium transition-colors",
                role === current ? "bg-brand-600 text-white" : "bg-canvas text-ink-muted hover:text-ink",
              )}
            >
              {t(`roles.${role}`)}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
