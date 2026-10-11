"use client";

import { ArrowLeft, ArrowRight, BookOpen, Crown, WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RichText } from "@/components/ui/rich-text";
import { listChapters, type OfflineChapter } from "../db";

/**
 * Lecteur hors ligne : précaché par le service worker, il lit uniquement IndexedDB.
 * ?chapitre=… affiche les leçons d'un chapitre, &lecon=… affiche une leçon.
 */
export function OfflineReader() {
  const t = useTranslations("offline");
  const params = useSearchParams();
  const [chapters, setChapters] = useState<OfflineChapter[] | null>(null);

  useEffect(() => {
    listChapters()
      .then(setChapters)
      .catch(() => setChapters([]));
  }, []);

  if (chapters === null) return <div className="h-64 animate-pulse rounded-2xl bg-idle-50" aria-hidden />;

  const chapter = chapters.find((c) => c.id === params.get("chapitre"));
  const lessonIndex = chapter ? chapter.lessons.findIndex((l) => l.id === params.get("lecon")) : -1;
  const lesson = chapter && lessonIndex >= 0 ? chapter.lessons[lessonIndex] : undefined;
  const link = (chapterId: string, lessonId?: string) =>
    `/hors-ligne/lecons?chapitre=${encodeURIComponent(chapterId)}${lessonId ? `&lecon=${encodeURIComponent(lessonId)}` : ""}`;

  if (chapter && lesson) {
    const previous = chapter.lessons[lessonIndex - 1];
    const next = chapter.lessons[lessonIndex + 1];
    return (
      <article className="space-y-5">
        <Link href={link(chapter.id)} className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
          <ArrowLeft className="size-4" aria-hidden />
          {chapter.title}
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{lesson.title}</h1>
        {lesson.html ? (
          <div className="rounded-2xl border border-line bg-surface p-5 text-ink sm:p-7">
            <RichText html={lesson.html} />
          </div>
        ) : (
          <p className="flex gap-2 rounded-2xl bg-premium-50 p-5 text-sm text-premium-700">
            <Crown className="size-5 shrink-0" aria-hidden />
            {t("premiumLocked")}
          </p>
        )}
        <nav className="grid grid-cols-2 gap-3">
          {previous ? (
            <Link href={link(chapter.id, previous.id)} className="inline-flex h-12 items-center gap-2 rounded-xl border border-brand-600 px-4 font-medium text-brand-700">
              <ArrowLeft className="size-4" aria-hidden />
              {t("previous")}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={link(chapter.id, next.id)} className="inline-flex h-12 items-center justify-end gap-2 rounded-xl bg-brand-600 px-4 font-medium text-white">
              {t("next")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          ) : null}
        </nav>
      </article>
    );
  }

  if (chapter) {
    return (
      <section className="space-y-4">
        <Link href="/hors-ligne/lecons" className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
          <ArrowLeft className="size-4" aria-hidden />
          {t("allDownloads")}
        </Link>
        <div>
          <p className="text-sm text-ink-muted">{chapter.subjectName}</p>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{chapter.title}</h1>
        </div>
        <ol className="space-y-2">
          {chapter.lessons.map((l) => (
            <li key={l.id}>
              <Link href={link(chapter.id, l.id)} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3 hover:border-brand-500">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-idle-50 text-sm font-semibold text-idle-700">
                  {l.number}
                </span>
                <span className="min-w-0 flex-1 font-medium text-ink">{l.title}</span>
                {l.html ? null : <Crown className="size-4 shrink-0 text-premium-700" aria-label={t("premiumLocked")} />}
              </Link>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">{t("readerTitle")}</h1>
      {chapters.length === 0 ? (
        <p className="flex gap-2 rounded-2xl border border-dashed border-line bg-surface p-5 text-sm text-ink-muted">
          <WifiOff className="size-5 shrink-0" aria-hidden />
          {t("nothingOffline")}
        </p>
      ) : (
        <ul className="space-y-2">
          {chapters.map((c) => (
            <li key={c.id}>
              <Link href={link(c.id)} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 hover:border-brand-500">
                <BookOpen className="size-5 shrink-0 text-brand-700" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium text-ink">{c.title}</span>
                  <span className="block text-xs text-ink-muted">{c.subjectName}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
