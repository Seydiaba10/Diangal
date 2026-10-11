"use client";

import { BookOpen, Download, HardDrive, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatBytes, formatDate } from "@/lib/format";
import { chapterBytes, deleteChapter, listChapters, type OfflineChapter } from "../db";

/** Chapitres téléchargés sur ce téléphone (IndexedDB), avec l'espace utilisé. */
export function DownloadsList() {
  const t = useTranslations("offline");
  const [chapters, setChapters] = useState<OfflineChapter[] | null>(null);

  useEffect(() => {
    listChapters()
      .then(setChapters)
      .catch(() => setChapters([]));
  }, []);

  if (chapters === null) return <div className="h-40 animate-pulse rounded-2xl bg-idle-50" aria-hidden />;

  const used = chapters.reduce((sum, c) => sum + chapterBytes(c), 0);

  return (
    <div className="space-y-4">
      <p className="flex items-center gap-2 text-sm text-ink-muted">
        <HardDrive className="size-4" aria-hidden />
        {t("used", { size: formatBytes(used), count: chapters.length })}
      </p>
      {chapters.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-surface px-6 py-10 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
            <Download className="size-7" aria-hidden />
          </span>
          <p className="mt-4 text-lg font-semibold text-ink">{t("emptyTitle")}</p>
          <p className="mt-1 max-w-sm text-sm text-ink-muted">{t("emptyBody")}</p>
          <Link href="/eleve/cours" className="mt-6 inline-flex h-12 items-center rounded-xl bg-brand-600 px-5 font-medium text-white hover:bg-brand-700">
            {t("browse")}
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {chapters.map((chapter) => (
            <li key={chapter.id} className="flex items-center gap-3 p-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <BookOpen className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <Link href={`/hors-ligne/lecons?chapitre=${encodeURIComponent(chapter.id)}`} className="block truncate font-medium text-ink hover:underline">
                  {chapter.title}
                </Link>
                <span className="block text-xs text-ink-muted">
                  {t("meta", { subject: chapter.subjectName, size: formatBytes(chapterBytes(chapter)), date: formatDate(chapter.savedAt) })}
                </span>
              </span>
              <button
                type="button"
                aria-label={t("removeNamed", { title: chapter.title })}
                onClick={async () => {
                  await deleteChapter(chapter.id);
                  setChapters(chapters.filter((c) => c.id !== chapter.id));
                }}
                className="flex size-11 shrink-0 items-center justify-center rounded-xl text-ink-muted hover:bg-canvas hover:text-danger-700"
              >
                <Trash className="size-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
