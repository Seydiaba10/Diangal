import { MessageSquare } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siWhatsapp } from "simple-icons";
import type { PhoneChannel } from "../otp";

/** WhatsApp ou SMS pour recevoir un code (seulement les canaux branchés), WhatsApp d'abord. */
export async function ChannelChoice({ channels }: { channels: PhoneChannel[] }) {
  const t = await getTranslations("auth.pin.channels");
  return (
    <fieldset className="space-y-2.5">
      <legend className="mb-2.5 text-sm font-semibold text-brand-800">{t("legend")}</legend>
      {channels.map((channel, i) => (
        <label
          key={channel}
          className="flex cursor-pointer items-start gap-3 rounded-2xl border-[1.5px] border-line bg-surface p-4 has-[:checked]:border-[2.5px] has-[:checked]:border-brand-600 has-[:checked]:bg-cycle-middle-soft"
        >
          <input type="radio" name="mode" value={channel} defaultChecked={i === 0} className="mt-0.5 size-5 shrink-0 accent-brand-600" />
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2 font-semibold text-brand-800">
              {channel === "whatsapp" ? (
                <svg viewBox="0 0 24 24" className="size-5 fill-brand-700" aria-hidden>
                  <path d={siWhatsapp.path} />
                </svg>
              ) : (
                <MessageSquare className="size-5 text-brand-700" aria-hidden />
              )}
              {t(channel)}
              {channel === "whatsapp" ? <span className="rounded-full bg-cycle-middle px-2 py-0.5 text-xs font-semibold text-ink">{t("recommended")}</span> : null}
            </span>
            <span className="mt-1 block text-sm leading-snug text-ink-muted">{t(`${channel}Hint`)}</span>
          </span>
        </label>
      ))}
    </fieldset>
  );
}
