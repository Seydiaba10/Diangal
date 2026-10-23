"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useSyncExternalStore } from "react";
import { buttonClasses } from "@/components/ui/button";

/**
 * Lien d'invitation : copie, partage WhatsApp (wa.me, aucun suivi ni API Meta) et partage natif
 * du téléphone s'il existe. Le lien ne contient que le code, aucune donnée personnelle.
 */
export function SharePanel({ link, message }: { link: string; message: string }) {
  const t = useTranslations("referral.share");
  const [copied, setCopied] = useState(false);
  // Partage natif : seulement côté navigateur (rien au rendu serveur, pas d'écart à l'hydratation).
  const canShare = useSyncExternalStore(
    () => () => undefined,
    () => "share" in navigator,
    () => false,
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-3">
      <label htmlFor="lien-parrainage" className="text-sm font-medium text-ink">
        {t("linkLabel")}
      </label>
      <div className="flex gap-2">
        <input
          id="lien-parrainage"
          readOnly
          value={link}
          onFocus={(e) => e.currentTarget.select()}
          className="h-12 min-w-0 flex-1 rounded-xl border border-line bg-canvas px-3 text-sm text-ink"
        />
        <button type="button" onClick={copy} className={buttonClasses({ variant: "outline", className: "shrink-0" })}>
          {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          <span>{copied ? t("copied") : t("copy")}</span>
        </button>
      </div>
      <p className="sr-only" role="status">
        {copied ? t("copied") : ""}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${message} ${link}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ className: "sm:flex-1" })}
        >
          <Share2 className="size-4" aria-hidden />
          {t("whatsapp")}
        </a>
        {canShare ? (
          <button
            type="button"
            onClick={() => navigator.share({ text: message, url: link }).catch(() => undefined)}
            className={buttonClasses({ variant: "outline", className: "sm:flex-1" })}
          >
            {t("native")}
          </button>
        ) : null}
      </div>
    </div>
  );
}
