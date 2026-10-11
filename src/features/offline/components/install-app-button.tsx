"use client";

import { Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** Proposition d'installation (Android / Chrome) : n'apparaît que si le navigateur l'autorise. */
export function InstallAppButton() {
  const t = useTranslations("offline");
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!promptEvent) return null;

  return (
    <button
      type="button"
      onClick={async () => {
        await promptEvent.prompt();
        await promptEvent.userChoice;
        setPromptEvent(null);
      }}
      className="flex w-full items-center gap-3 rounded-2xl bg-brand-600 p-4 text-left text-white hover:bg-brand-700"
    >
      <Smartphone className="size-6 shrink-0" aria-hidden />
      <span>
        <span className="block font-semibold">{t("install")}</span>
        <span className="block text-sm text-brand-50">{t("installHint")}</span>
      </span>
    </button>
  );
}
