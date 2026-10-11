// Sessions d'examens et annales fictives. Les dates officielles sont saisies par l'admin.

import type { ExamPaper, ExamSession, SubjectCode } from "@/types/domain";

export const EXAM_SESSIONS: ExamSession[] = [
  { id: "cfee-2027", type: "CFEE", year: 2027, startsOn: "2027-06-22", isOfficial: false },
  { id: "bfem-2027", type: "BFEM", year: 2027, startsOn: "2027-07-06", isOfficial: false },
  { id: "bac-2027", type: "BAC", year: 2027, startsOn: "2027-07-13", isOfficial: false },
];

const BFEM_SUBJECTS: { code: SubjectCode; name: string }[] = [
  { code: "MATH", name: "Mathématiques" },
  { code: "FR", name: "Français" },
  { code: "PC", name: "Sciences physiques" },
  { code: "SVT", name: "SVT" },
  { code: "HG", name: "Histoire-Géographie" },
  { code: "ANG", name: "Anglais" },
];

export const EXAM_PAPERS: ExamPaper[] = [2025, 2024, 2023].flatMap((year) =>
  BFEM_SUBJECTS.map((subject, i) => ({
    id: `bfem-${year}-${subject.code.toLowerCase()}`,
    examType: "BFEM" as const,
    year,
    subjectCode: subject.code,
    subjectName: subject.name,
    subjectSizeBytes: 180_000 + i * 35_000,
    correctionSizeBytes: 260_000 + i * 40_000,
    // Sujets gratuits ; corrigés détaillés Premium sauf pour l'année la plus récente.
    correctionPremium: year !== 2025,
    assessmentId: year === 2025 && subject.code === "MATH" ? "bfem-blanc-maths" : null,
  })),
);
