import { MessageCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveRefresh } from "@/features/messaging/components/live-refresh";
import { getConversations, getMessagingAccess } from "@/features/messaging/data";
import { isSupabaseConfigured } from "@/lib/env";
import { TutorAvatar } from "@/features/tutors/components/tutor-bits";
import { formatDate } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("messages") };
}

async function ConversationList() {
  const [access, t] = await Promise.all([getMessagingAccess(), getTranslations("messaging")]);
  if (access === "consent_required") {
    return (
      <div className="rounded-2xl bg-premium-50 p-5">
        <p className="flex items-center gap-2 font-semibold text-premium-700">
          <ShieldAlert className="size-5" aria-hidden />
          {t("consentTitle")}
        </p>
        <p className="mt-1 text-sm text-ink">{t("consentBody")}</p>
        <ButtonLink href="/eleve/profil" variant="outline" size="sm" className="mt-4">
          {t("consentCta")}
        </ButtonLink>
      </div>
    );
  }

  const conversations = await getConversations();
  if (conversations.length === 0) {
    return (
      <EmptyState
        icon={<MessageCircle className="size-7" aria-hidden />}
        title={t("emptyTitle")}
        body={t("emptyBody")}
        action={<ButtonLink href="/repetiteurs">{t("findTutor")}</ButtonLink>}
      />
    );
  }

  return (
    <>
    {isSupabaseConfigured() ? <LiveRefresh /> : null}
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
      {conversations.map((c) => (
        <li key={c.id}>
          <Link href={`/messages/${c.id}`} className="flex items-center gap-3 p-4 transition-colors hover:bg-canvas">
            <TutorAvatar name={c.title} className="size-12" />
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="truncate font-semibold text-ink">{c.title}</span>
                <span className="shrink-0 text-xs text-ink-subtle">{formatDate(c.lastMessageAt)}</span>
              </span>
              <span className="block truncate text-xs text-ink-muted">{c.subtitle}</span>
              <span className="mt-0.5 block truncate text-sm text-ink-muted">{c.lastMessage}</span>
            </span>
            {c.unread ? <span className="size-2.5 shrink-0 rounded-full bg-brand-600" aria-label={t("unread")} /> : null}
          </Link>
        </li>
      ))}
    </ul>
    </>
  );
}

export default async function MessagesPage() {
  const [tPages, t] = await Promise.all([getTranslations("pages"), getTranslations("messaging")]);
  return (
    <PageContainer width="narrow" className="space-y-5">
      <PageHeader title={tPages("messages")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-48 rounded-2xl" />}>
        <ConversationList />
      </Suspense>
    </PageContainer>
  );
}
