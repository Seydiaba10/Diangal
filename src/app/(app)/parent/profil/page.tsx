import { Bell, Download, LogOut, Phone, Trash } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { DemoRoleSwitcher } from "@/components/layout/demo-role-switcher";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { UserAvatar } from "@/components/layout/session-card";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "@/components/ui/level-badge";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { signOutAction } from "@/features/account/actions";
import { getOwnContact, getParentChildren, getSessionUser } from "@/features/account/data";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("profile") };
}

async function ParentProfile() {
  const [user, children, t] = await Promise.all([getSessionUser("parent"), getParentChildren(), getTranslations("parentProfile")]);
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-5">
        <section className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
          <UserAvatar user={user} className="size-16 text-lg" />
          <div>
            <p className="text-lg font-semibold text-ink">
              {user.firstName} {user.lastName}
            </p>
            <p className="flex items-center gap-1.5 text-sm text-ink-muted">
              <Phone className="size-4" aria-hidden />
              {(await getOwnContact()) ?? t("contactUnknown")}
            </p>
          </div>
        </section>
        <SectionCard id="enfants-titre" title={t("children")}>
          <ul className="divide-y divide-line">
            {children.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="flex flex-wrap items-center gap-2 font-medium text-ink">
                  {c.firstName} {c.lastName}
                  <LevelBadge code={c.levelCode}>{c.levelName}</LevelBadge>
                </span>
                <Button variant="ghost" size="sm" disabled>
                  {t("unlink")}
                </Button>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard id="notif-titre" title={t("notifications.title")} subtitle={t("notifications.soon")}>
          <ul className="space-y-3 text-sm text-ink">
            {(["sms", "push", "weekly"] as const).map((key) => (
              <li key={key} className="flex items-center gap-3">
                <Bell className="size-4 text-ink-muted" aria-hidden />
                <span className="flex-1">{t(`notifications.${key}`)}</span>
                <span className="rounded-full bg-canvas px-2.5 py-1 text-xs font-medium text-ink-muted">{t("notifications.soonBadge")}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard id="donnees-titre" title={t("data.title")} subtitle={t("data.body")}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" size="sm" disabled>
              <Download className="size-4" aria-hidden />
              {t("data.export")}
            </Button>
            <Button variant="ghost" size="sm" disabled className="text-danger-700">
              <Trash className="size-4" aria-hidden />
              {t("data.delete")}
            </Button>
          </div>
          <p className="mt-2 text-xs text-ink-subtle">{t("data.soon")}</p>
        </SectionCard>
      </div>
      <aside className="space-y-4">
        <DemoRoleSwitcher current="parent" />
        <form action={signOutAction}>
          <Button type="submit" variant="outline" className="w-full">
            <LogOut className="size-4" aria-hidden />
            {t("signOut")}
          </Button>
        </form>
      </aside>
    </div>
  );
}

export default async function ParentProfilePage() {
  const t = await getTranslations("pages");
  return (
    <PageContainer className="space-y-5 lg:space-y-7">
      <PageHeader title={t("profile")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ParentProfile />
      </Suspense>
    </PageContainer>
  );
}
