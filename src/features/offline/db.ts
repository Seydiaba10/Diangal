"use client";

import { openDB, type DBSchema } from "idb";
import type { SubjectCode } from "@/types/domain";

/** Chapitre téléchargé, lisible sans connexion. */
export interface OfflineChapter {
  id: string;
  title: string;
  subjectCode: SubjectCode;
  subjectName: string;
  href: string;
  savedAt: string;
  lessons: {
    id: string;
    number: number;
    title: string;
    /** null : leçon Premium non débloquée au moment du téléchargement. */
    html: string | null;
  }[];
}

interface OfflineDb extends DBSchema {
  chapters: { key: string; value: OfflineChapter };
}

const dbPromise = () =>
  openDB<OfflineDb>("diangal-hors-ligne", 1, {
    upgrade(db) {
      db.createObjectStore("chapters", { keyPath: "id" });
    },
  });

export async function saveChapter(chapter: OfflineChapter) {
  // Demande au navigateur de ne pas effacer ces données en cas de manque d'espace.
  await navigator.storage?.persist?.().catch(() => false);
  await (await dbPromise()).put("chapters", chapter);
}

export async function listChapters(): Promise<OfflineChapter[]> {
  const all = await (await dbPromise()).getAll("chapters");
  return all.sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export async function getOfflineChapter(id: string) {
  return (await dbPromise()).get("chapters", id);
}

export async function deleteChapter(id: string) {
  await (await dbPromise()).delete("chapters", id);
}

/** Taille approximative d'un chapitre stocké (texte UTF-16). */
export function chapterBytes(chapter: OfflineChapter) {
  return JSON.stringify(chapter).length * 2;
}
