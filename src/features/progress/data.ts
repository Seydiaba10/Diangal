import { connection } from "next/server";
import { cache } from "react";
import { getCurrentStudent } from "@/features/account/data";
import { getNextExamFor } from "@/features/exams/data";
import { mockDashboard } from "@/mocks/student-3e";
import type { StudentDashboard } from "@/types/domain";

/** Dashboard élève. Phase 3 : RPC Supabase get_student_dashboard, même signature. */
export const getStudentDashboard = cache(async (): Promise<StudentDashboard> => {
  await connection(); // donnée propre à l'élève et compte à rebours relatif à aujourd'hui
  const student = await getCurrentStudent();
  return { ...mockDashboard, student, nextExam: await getNextExamFor(student.levelCode) };
});

/** Moyenne /20 par matière (fictive) pour la page Progression. Phase 3 : agrégat de attempts. */
const SUBJECT_AVERAGES: Record<string, number> = { MATH: 12.1, FR: 11.5, ANG: 15, HG: 14.2, SVT: 12.8, PC: 13.9, EC: 16 };

export async function getSubjectAverages(): Promise<Record<string, number>> {
  return SUBJECT_AVERAGES;
}
