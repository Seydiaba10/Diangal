"use client";

import { CircleAlert, CircleCheck, Download, LoaderCircle, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { deleteChapter, getOfflineChapter, saveChapter, type OfflineChapter } from "../db";

type State = "checking" | "idle" | "loading" | "saved" | "error";

export function DownloadChapterButton({ chapterId, sizeLabel }: { chapterId: string; sizeLabel: string | null }) {
  const t = useTranslations("offline");
  const [state, setState] = useState<State>("checking");

  useEffect(() => {
    let active = true;
    getOfflineChapter(chapterId)
      .then((chapter) => active && setState(chapter ? "saved" : "idle"))
      .catch(() => active && setState("idle"));
    return () => {
      active = false;
    };
  }, [chapterId]);

  const download = async () => {
    setState("loading");
    try {
      const response = await fetch(`/api/hors-ligne/chapitres/${encodeURIComponent(chapterId)}`);
      if (!response.ok) throw new Error(String(response.status));
      await saveChapter((await response.json()) as OfflineChapter);
      setState("saved");
    } catch {
      setState("error");
    }
  };

  const remove = async () => {
    await deleteChapter(chapterId);
    setState("idle");
  };

  if (state === "saved") {
    return (
      <div className="rounded-2xl border border-success-500/40 bg-success-50 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-success-700">
          <CircleCheck className="size-5" aria-hidden />
          {t("saved")}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href={`/hors-ligne/lecons?chapitre=${encodeURIComponent(chapterId)}`}
            className="inline-flex h-10 items-center rounded-xl bg-surface px-3 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            {t("readOffline")}
          </Link>
          <button
            type="button"
            onClick={remove}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-ink-muted hover:bg-surface"
          >
            <Trash className="size-4" aria-hidden />
            {t("remove")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={state === "loading" || state === "checking"}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border border-dashed bg-surface p-4 text-left transition-colors",
        state === "error" ? "border-danger-500" : "border-line hover:border-brand-500",
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        {state === "loading" ? (
          <LoaderCircle className="size-5 animate-spin" aria-hidden />
        ) : state === "error" ? (
          <CircleAlert className="size-5 text-danger-500" aria-hidden />
        ) : (
          <Download className="size-5" aria-hidden />
        )}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink">
          {state === "loading" ? t("downloading") : state === "error" ? t("error") : t("download")}
        </span>
        <span className="block text-xs text-ink-muted">{sizeLabel ? t("hint", { size: sizeLabel }) : t("hintNoSize")}</span>
      </span>
    </button>
  );
}
