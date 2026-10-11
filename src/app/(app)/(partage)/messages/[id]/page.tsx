import { Eye, Flag, Send } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { TEXTAREA_CLASS } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { sendMessageAction } from "@/features/messaging/actions";
import { getConversation, getMessagingAccess } from "@/features/messaging/data";
import { TutorAvatar } from "@/features/tutors/components/tutor-bits";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("pages");
  return { title: t("messages") };
}

async function Thread({ params }: { params: PageProps<"/messages/[id]">["params"] }) {
  const { id } = await params;
  if ((await getMessagingAccess()) !== "ok") redirect("/messages");
  const [conversation, t, tPages] = await Promise.all([
    getConversation(id),
    getTranslations("messaging"),
    getTranslations("pages"),
  ]);
  if (!conversation) notFound();
  const { summary, messages, observedByParent } = conversation;

  return (
    <>
      <Breadcrumb items={[{ label: tPages("messages"), href: "/messages" }, { label: summary.title }]} />
      <header className="flex items-center gap-3">
        <TutorAvatar name={summary.title} className="size-12" />
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-ink">{summary.title}</h1>
          <p className="truncate text-sm text-ink-muted">{summary.subtitle}</p>
        </div>
      </header>

      {observedByParent ? (
        <p className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-xs text-brand-800">
          <Eye className="size-4 shrink-0" aria-hidden />
          {t("observed")}
        </p>
      ) : null}

      <ol aria-label={t("threadLabel")} className="space-y-3">
        {messages.map((m) => (
          <li key={m.id} className={cn("flex", m.mine ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3",
                m.mine ? "rounded-br-md bg-brand-600 text-white" : "rounded-bl-md border border-line bg-surface text-ink",
              )}
            >
              {!m.mine ? <p className="text-xs font-semibold text-brand-700">{m.senderName}</p> : null}
              <p className="whitespace-pre-line text-sm leading-relaxed">{m.body}</p>
              <p className={cn("mt-1 text-right text-[11px]", m.mine ? "text-brand-50" : "text-ink-subtle")}>
                {formatDate(m.createdAt)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <form action={sendMessageAction.bind(null, id)} className="sticky bottom-20 rounded-2xl border border-line bg-surface p-3 lg:bottom-4">
        <label htmlFor="message" className="sr-only">
          {t("composeLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={2}
          maxLength={1000}
          placeholder={t("composePlaceholder")}
          className={cn(TEXTAREA_CLASS, "resize-none border-0 px-2 focus:border-0")}
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-ink-subtle">{t("safety")}</p>
          <Button type="submit" size="sm">
            <Send className="size-4" aria-hidden />
            {t("send")}
          </Button>
        </div>
      </form>
      <button type="button" disabled className="inline-flex items-center gap-1.5 text-xs text-ink-subtle">
        <Flag className="size-3.5" aria-hidden />
        {t("report")}
      </button>
    </>
  );
}

export default function ConversationPage({ params }: PageProps<"/messages/[id]">) {
  return (
    <PageContainer width="narrow" className="space-y-4">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <Thread params={params} />
      </Suspense>
    </PageContainer>
  );
}
