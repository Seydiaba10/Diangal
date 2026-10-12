import { CalendarDays, MessageCircle, Send, ShieldAlert, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button, ButtonLink } from "@/components/ui/button";
import { INPUT_CLASS, TEXTAREA_CLASS } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentRole, getCurrentStudent, getParentChildren } from "@/features/account/data";
import { startConversationAction } from "@/features/messaging/actions";
import { getConversationsWithTutor } from "@/features/messaging/data";
import { formatFCFA } from "@/lib/format";
import type { TutorProfile } from "@/types/domain";

/**
 * Contact d'un répétiteur. Seuls les élèves et les parents peuvent contacter.
 * Mode limité : un élève mineur sans validation parentale ne peut pas contacter.
 * WhatsApp n'est jamais proposé à un mineur (numéro exposé hors plateforme).
 */
export async function TutorContactPanel({ tutor }: { tutor: TutorProfile }) {
  const [role, t, tTutors] = await Promise.all([getCurrentRole(), getTranslations("tutor"), getTranslations("tutors")]);
  const isFamily = role === "student" || role === "parent";
  const student = role === "student" ? await getCurrentStudent() : null;
  const canContact = isFamily && (!student || !student.isMinor || student.consentStatus === "granted");
  const [existing, children] = canContact
    ? await Promise.all([getConversationsWithTutor(tutor.id), role === "parent" ? getParentChildren() : Promise.resolve([])])
    : [[], []];
  // Un parent ouvre une conversation par enfant (et une pour lui-même s'il ne précise pas).
  const opened = new Set(existing.map((c) => c.studentId ?? ""));
  const childName = new Map(children.map((c) => [c.id, c.firstName]));
  const targets =
    role === "parent"
      ? [
          ...children.filter((c) => !opened.has(c.id)).map((c) => ({ value: c.id, label: `${c.firstName} ${c.lastName}` })),
          ...(children.length !== 1 && !opened.has("") ? [{ value: "", label: t("childNone") }] : []),
        ]
      : existing.length === 0
        ? [{ value: "", label: "" }]
        : [];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <p className="text-sm text-ink-muted">{t("rate")}</p>
        <p className="mt-0.5 text-2xl font-semibold text-ink">
          {tTutors("perHour", { price: formatFCFA(tutor.hourlyRateFcfa) })}
        </p>

        {!isFamily ? null : canContact ? (
          <div className="mt-4 space-y-3">
            {existing.map((c) => {
              const name = role === "parent" && c.studentId ? childName.get(c.studentId) : undefined;
              return (
                <ButtonLink key={c.id} href={`/messages/${c.id}`} variant={targets.length ? "outline" : "primary"} className="w-full">
                  <MessageCircle className="size-4" aria-hidden />
                  {name ? t("continueAbout", { name }) : t("continueConversation")}
                </ButtonLink>
              );
            })}
            {targets.length ? (
              <form action={startConversationAction.bind(null, tutor.id)} className="space-y-3">
                {targets.length > 1 ? (
                  <div>
                    <label htmlFor="contact-enfant" className="text-sm font-medium text-ink">
                      {t("childLabel")}
                    </label>
                    <select id="contact-enfant" name="child" className={`${INPUT_CLASS} mt-1.5`}>
                      {targets.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : targets[0]!.value ? (
                  <input type="hidden" name="child" value={targets[0]!.value} />
                ) : null}
                <div>
                  <label htmlFor="contact-message" className="text-sm font-medium text-ink">
                    {t("messageLabel")}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={3}
                    maxLength={1000}
                    placeholder={t("messagePlaceholder")}
                    className={`${TEXTAREA_CLASS} mt-1.5`}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="size-4" aria-hidden />
                  {t("contact")}
                </Button>
              </form>
            ) : null}
            <Button variant="outline" className="w-full" disabled>
              <CalendarDays className="size-4" aria-hidden />
              {t("book")}
            </Button>
            <p className="text-center text-xs text-ink-subtle">{t("bookSoon")}</p>
          </div>
        ) : (
          <div className="mt-4 rounded-xl bg-premium-50 p-4">
            <p className="flex items-center gap-2 font-semibold text-premium-700">
              <ShieldAlert className="size-5" aria-hidden />
              {t("consentTitle")}
            </p>
            <p className="mt-1 text-sm text-ink">{t("consentBody")}</p>
            <ButtonLink href="/eleve/profil" variant="outline" size="sm" className="mt-3 w-full">
              {t("consentCta")}
            </ButtonLink>
          </div>
        )}
      </div>
      <p className="flex gap-2 rounded-2xl bg-brand-50 p-4 text-xs leading-relaxed text-brand-800">
        <ShieldCheck className="size-4 shrink-0" aria-hidden />
        {t("safety")}
      </p>
    </div>
  );
}

export function TutorContactSkeleton() {
  return <Skeleton className="h-56 rounded-2xl" />;
}
