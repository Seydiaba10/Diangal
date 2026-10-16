// Sessions d'examens (dates indicatives, l'admin saisit les dates officielles).
// Aucune annale de démonstration : un sujet officiel n'est publié qu'après vérification de sa source.

import type { ExamSession } from "@/types/domain";

export const EXAM_SESSIONS: ExamSession[] = [
  { id: "cfee-2027", type: "CFEE", year: 2027, startsOn: "2027-06-22", isOfficial: false },
  { id: "bfem-2027", type: "BFEM", year: 2027, startsOn: "2027-07-06", isOfficial: false },
  { id: "bac-2027", type: "BAC", year: 2027, startsOn: "2027-07-13", isOfficial: false },
];
