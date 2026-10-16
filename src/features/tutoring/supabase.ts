import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FamilyTutorLink, TutorAssignment, TutorSession, TutorStudentItem, TutorStudentView } from "@/types/domain";

// Suivi par un répétiteur (Supabase) : RPC pour les listes et les notes (champs minimaux),
// lecture directe des devoirs et des cours en ligne (RLS : répétiteur, élève, parents liés).

export async function fetchTutorStudents(): Promise<TutorStudentItem[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_tutor_students");
  if (error) throw new Error(`élèves suivis : ${error.message}`);
  return data as unknown as TutorStudentItem[];
}

/** null si le lien n'est pas actif (la fonction refuse alors l'accès). */
export async function fetchTutorStudent(studentId: string): Promise<TutorStudentView | null> {
  if (!/^[0-9a-f-]{36}$/i.test(studentId)) return null;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_tutor_student", { p_student: studentId });
  if (error) return null;
  const view = data as unknown as TutorStudentView;
  return {
    ...view,
    stats: { ...view.stats, average20: view.stats.average20 === null ? null : Number(view.stats.average20) },
    subjects: view.subjects.map((s) => ({ ...s, average20: Number(s.average20) })),
    results: view.results.map((r) => ({ ...r, score20: Number(r.score20) })),
  };
}

export async function fetchFamilyTutorLinks(): Promise<FamilyTutorLink[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_family_tutor_links");
  if (error) throw new Error(`répétiteurs de la famille : ${error.message}`);
  return data as unknown as FamilyTutorLink[];
}

export async function fetchAssignments(studentId: string): Promise<TutorAssignment[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("tutor_assignments")
    .select("id, tutor_id, student_id, title, instructions, due_on, done_at, created_at")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw new Error(`devoirs : ${error.message}`);
  return data.map((a) => ({
    id: a.id,
    tutorId: a.tutor_id,
    studentId: a.student_id,
    title: a.title,
    instructions: a.instructions,
    dueOn: a.due_on,
    doneAt: a.done_at,
    createdAt: a.created_at,
  }));
}

/** Cours en ligne d'un élève, ou de tous les élèves du répétiteur connecté (studentId absent). */
export async function fetchSessions(filter: { studentId?: string; tutorId?: string }): Promise<TutorSession[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("tutor_sessions")
    .select("id, tutor_id, student_id, starts_at, duration_min, topic, status")
    .order("starts_at")
    .limit(50);
  if (filter.studentId) query = query.eq("student_id", filter.studentId);
  if (filter.tutorId) query = query.eq("tutor_id", filter.tutorId);
  const { data, error } = await query;
  if (error) throw new Error(`cours en ligne : ${error.message}`);
  return data.map((s) => ({
    id: s.id,
    tutorId: s.tutor_id,
    studentId: s.student_id,
    startsAt: s.starts_at,
    durationMin: s.duration_min,
    topic: s.topic,
    status: s.status as TutorSession["status"],
  }));
}
