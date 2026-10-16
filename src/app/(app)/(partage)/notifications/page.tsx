import {
  Bell,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  GraduationCap,
  MessageCircle,
  ShieldCheck,
  Video,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { markAllNotificationsReadAction } from "@/features/notifications/actions";
import { getNotifications } from "@/features/notifications/data";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import type { NotificationKind } from "@/types/domain";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("notifications") };
}

const ICONS: Record<NotificationKind, LucideIcon> = {
  consent: ShieldCheck,
  quiz_result: ClipboardCheck,
  tutor_message: MessageCircle,
  payment: CreditCard,
  exam: CalendarDays,
  tutor_review: ShieldCheck,
  tutor_invite: GraduationCap,
  tutor_invite_answer: GraduationCap,
  tutor_assignment: ClipboardList,
  tutor_session: Video,
  tutor_session_cancelled: Video,
};

async function NotificationList() {
  const [items, t] = await Promise.all([getNotifications(), getTranslations("notificationsPage")]);
  if (items.length === 0) {
    return <EmptyState icon={<Bell className="size-7" aria-hidden />} title={t("emptyTitle")} body={t("emptyBody")} />;
  }
  return (
    <div className="space-y-3">
      {items.some((n) => !n.read) ? (
        <form action={markAllNotificationsReadAction} className="flex justify-end">
          <Button type="submit" variant="ghost" size="sm">
            {t("markAll")}
          </Button>
        </form>
      ) : null}
      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {items.map((n) => {
          const Icon = ICONS[n.kind];
          return (
            <li key={n.id}>
              <Link href={n.href} className={cn("flex gap-3 p-4 transition-colors hover:bg-canvas", !n.read && "bg-brand-50/40")}>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-ink">{t(`items.${n.kind}`, n.params)}</span>
                  <span className="mt-0.5 block text-xs text-ink-subtle">{formatDate(n.createdAt)}</span>
                </span>
                {!n.read ? <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-brand-600" aria-label={t("unread")} /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default async function NotificationsPage() {
  const t = await getTranslations("pages");
  return (
    <PageContainer width="narrow" className="space-y-5">
      <PageHeader title={t("notifications")} />
      <Suspense fallback={<Skeleton className="h-48 rounded-2xl" />}>
        <NotificationList />
      </Suspense>
    </PageContainer>
  );
}
