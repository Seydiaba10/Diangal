import "server-only";

import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { DashboardStats, ExamType, NextExam, SubjectCode, WeakPointAction } from "@/types/domain";

// Tableau de bord d'un élève en un seul appel (RPC get_student_dashboard) : l'élève lui-même,
// un parent lié ou l'admin (la fonction vérifie le droit de lecture).

export interface DashboardData {
  stats: DashboardStats;
  weakPoints: {
    chapterId: string;
    chapterTitle: string;
    subject: SubjectCode;
    subjectName: string;
    lastScore20: number;
    action: WeakPointAction;
  }[];
  nextExam: NextExam | null;
}

interface RawDashboard {
  stats: {
    average20: number | string | null;
    chaptersTotal: number;
    chaptersCompleted: number;
    quizzesTaken: number;
    streakDays: number;
  };
  weakPoints: {
    chapterId: string;
    chapterTitle: string;
    subject: SubjectCode;
    subjectName: string;
    lastScore20: number | string;
    action: WeakPointAction;
  }[];
  nextExam: { type: ExamType; year: number; startsOn: string; isOfficial: boolean; daysLeft: number } | null;
}

export const fetchDashboard = cache(async (studentId: string): Promise<DashboardData | null> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_student_dashboard", { p_student: studentId });
  if (error || !data) return null;
  const d = data as unknown as RawDashboard;
  return {
    stats: {
      average20: d.stats.average20 === null ? null : Number(d.stats.average20),
      chaptersTotal: Number(d.stats.chaptersTotal),
      chaptersCompleted: Number(d.stats.chaptersCompleted),
      quizzesTaken: Number(d.stats.quizzesTaken),
      streakDays: Number(d.stats.streakDays),
    },
    weakPoints: (d.weakPoints ?? []).map((w) => ({ ...w, lastScore20: Number(w.lastScore20) })),
    nextExam: d.nextExam
      ? {
          type: d.nextExam.type,
          year: Number(d.nextExam.year),
          startsOn: d.nextExam.startsOn,
          isOfficial: d.nextExam.isOfficial,
          daysLeft: Math.max(0, Number(d.nextExam.daysLeft)),
        }
      : null,
  };
});
