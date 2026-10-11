import { Gauge } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";
import { setDataSaverAction } from "../actions";
import { getPreferences } from "../data";

/** Mode « économie de données » : vidéos remplacées par l'audio ou le texte, images non essentielles masquées. */
export async function DataSaverForm() {
  const [{ dataSaver }, t] = await Promise.all([getPreferences(), getTranslations("dataSaver")]);
  return (
    <form action={setDataSaverAction.bind(null, !dataSaver)} className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Gauge className="size-5" aria-hidden />
          </span>
          <div>
            <p className="font-semibold text-ink">{t("title")}</p>
            <p className="mt-0.5 text-sm text-ink-muted">{t("body")}</p>
          </div>
        </div>
        <button
          type="submit"
          role="switch"
          aria-checked={dataSaver}
          aria-label={t("title")}
          className={cn(
            "relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors",
            dataSaver ? "bg-brand-600" : "bg-idle-200",
          )}
        >
          <span
            className={cn(
              "absolute top-1 size-5 rounded-full bg-white shadow transition-all",
              dataSaver ? "left-6" : "left-1",
            )}
          />
        </button>
      </div>
    </form>
  );
}
