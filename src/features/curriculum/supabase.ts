import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { programSlug } from "@/lib/slug";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Chapter, LessonResource, Subject, SubjectCode } from "@/types/domain";

// Lecture Supabase du catalogue et de la progression (mêmes types que les données de démo).

export interface Catalog {
  subjects: Subject[];
  chapters: Chapter[];
}

/**
 * Catalogue publié de toutes les classes et séries (identique pour tous) : mis en cache une heure,
 * invalidé par l'admin (tag « catalog »). Une matière sans chapitre publié n'apparaît pas.
 */
export async function loadCatalog(): Promise<Catalog> {
  "use cache";
  cacheLife("hours");
  cacheTag("catalog");
  const supabase = createSupabasePublicClient();

  const { data: programs, error } = await supabase
    .from("programs")
    .select("id, coefficient, sort_order, subjects!inner(code, slug, name), levels!inner(code, sort_order), series(code)")
    .order("sort_order");
  if (error) throw new Error(`catalogue (programmes) : ${error.message}`);

  const { data: chapters, error: chaptersError } = await supabase
    .from("chapters")
    .select(
      "id, program_id, number, slug, title, summary, strand, sort_order, lessons(id, number, slug, title, is_premium, estimated_minutes, media(kind, title, size_bytes, duration_s))",
    )
    .in(
      "program_id",
      programs.map((p) => p.id),
    )
    .order("sort_order")
    .order("number", { referencedTable: "lessons" });
  if (chaptersError) throw new Error(`catalogue (chapitres) : ${chaptersError.message}`);

  // Classes dans l'ordre de la scolarité (CI → Terminale), matières dans l'ordre du programme.
  const ordered = [...programs].sort((a, b) => a.levels.sort_order - b.levels.sort_order || a.sort_order - b.sort_order);
  const subjectByProgram = new Map(
    ordered.map((p) => [
      p.id,
      {
        code: p.subjects.code as SubjectCode,
        slug: programSlug(p.subjects.slug, p.levels.code, p.series?.code),
        name: p.subjects.name,
        coefficient: Number(p.coefficient),
        levelCode: p.levels.code,
        seriesCode: p.series?.code ?? null,
      },
    ]),
  );
  // Pas de page vide : seules les matières qui ont au moins un chapitre publié.
  const withChapters = new Set(chapters.map((c) => c.program_id));

  return {
    subjects: [...subjectByProgram].filter(([id]) => withChapters.has(id)).map(([, subject]) => subject),
    chapters: chapters.map((c) => ({
      id: c.id,
      slug: c.slug,
      number: c.number,
      title: c.title,
      summary: c.summary,
      subjectCode: subjectByProgram.get(c.program_id)!.code,
      levelCode: subjectByProgram.get(c.program_id)!.levelCode,
      seriesCode: subjectByProgram.get(c.program_id)!.seriesCode,
      strand: c.strand,
      lessons: c.lessons.map((l) => ({
        id: l.id,
        slug: l.slug,
        number: l.number,
        title: l.title,
        estimatedMinutes: l.estimated_minutes,
        isPremium: l.is_premium,
        resources: l.media
          .filter((m): m is typeof m & { kind: LessonResource["kind"] } => m.kind !== "image")
          .map((m) => ({ kind: m.kind, title: m.title, sizeBytes: m.size_bytes, durationS: m.duration_s ?? undefined })),
      })),
    })),
  };
}

export interface LessonProgressRow {
  lessonId: string;
  completed: boolean;
  updatedAt: string;
}

/** Leçons suivies par un élève (lui-même, ou son enfant pour un parent : la RLS vérifie le lien). */
export const getLessonProgressRows = cache(async (studentId: string): Promise<LessonProgressRow[]> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id, status, updated_at")
    .eq("user_id", studentId);
  if (error) throw new Error(`progression : ${error.message}`);
  return data.map((r) => ({ lessonId: r.lesson_id, completed: r.status === "completed", updatedAt: r.updated_at }));
});

export async function getCompletedLessonIds(studentId: string): Promise<Set<string>> {
  return new Set((await getLessonProgressRows(studentId)).filter((r) => r.completed).map((r) => r.lessonId));
}

/** Corps de la leçon lu avec la session : la RLS ne renvoie rien pour une leçon Premium sans abonnement. */
export async function getLessonBodyHtml(lessonId: string): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("lesson_bodies").select("body_html").eq("lesson_id", lessonId).maybeSingle();
  if (error) throw new Error(`leçon : ${error.message}`);
  return data?.body_html || null;
}
