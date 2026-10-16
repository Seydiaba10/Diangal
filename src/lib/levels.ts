import type { ExamType } from "@/types/domain";

// Système éducatif sénégalais (programmes du Ministère de l'Éducation nationale).
// Chaque cycle porte une couleur du drapeau : élémentaire vert, moyen jaune, secondaire rouge.

export const LEVEL_CODES = ["CI", "CP", "CE1", "CE2", "CM1", "CM2", "6E", "5E", "4E", "3E", "2NDE", "1RE", "TLE"] as const;
export type LevelCode = (typeof LEVEL_CODES)[number];

export type Cycle = "elementary" | "middle" | "secondary";

export const CYCLES: readonly { key: Cycle; levels: readonly LevelCode[]; exam: ExamType }[] = [
  { key: "elementary", levels: ["CI", "CP", "CE1", "CE2", "CM1", "CM2"], exam: "CFEE" },
  { key: "middle", levels: ["6E", "5E", "4E", "3E"], exam: "BFEM" },
  { key: "secondary", levels: ["2NDE", "1RE", "TLE"], exam: "BAC" },
];

// 2nde L ou S, puis séries littéraires (L1, L2, LA), scientifiques (S1 à S5) et techniques (G, T1, T2).
const UPPER_SERIES = ["L1", "L2", "LA", "S1", "S2", "S3", "S4", "S5", "G", "T1", "T2"] as const;
export const SERIES_BY_LEVEL: Partial<Record<LevelCode, readonly string[]>> = {
  "2NDE": ["L", "S"],
  "1RE": UPPER_SERIES,
  TLE: UPPER_SERIES,
};

/** Classes où leçons et exercices se lisent aussi à voix haute (CI à CM1). */
export const READ_ALOUD_LEVELS: readonly LevelCode[] = ["CI", "CP", "CE1", "CE2", "CM1"];

export function hasReadAloud(levelCode: string): boolean {
  return (READ_ALOUD_LEVELS as readonly string[]).includes(levelCode);
}

export function isLevelCode(value: string): value is LevelCode {
  return (LEVEL_CODES as readonly string[]).includes(value);
}

export function cycleOf(levelCode: string): Cycle | null {
  return CYCLES.find((cycle) => (cycle.levels as readonly string[]).includes(levelCode))?.key ?? null;
}

export function cycleOfExam(exam: ExamType): Cycle {
  return CYCLES.find((cycle) => cycle.exam === exam)!.key;
}

export interface CycleStyle {
  /** Fond plein, couleur du drapeau. */
  solid: string;
  /** Texte lisible sur le fond plein (ink sur le jaune, blanc ailleurs). */
  onSolid: string;
  /** Fond doux. */
  soft: string;
  /** Texte et icônes dans la couleur du cycle, sur blanc ou sur le fond doux. */
  text: string;
}

// Classes écrites en entier pour que Tailwind les détecte (tokens définis dans globals.css).
export const CYCLE_STYLES: Record<Cycle, CycleStyle> = {
  elementary: {
    solid: "bg-cycle-elementary",
    onSolid: "text-white",
    soft: "bg-cycle-elementary-soft",
    text: "text-cycle-elementary-ink",
  },
  middle: { solid: "bg-cycle-middle", onSolid: "text-ink", soft: "bg-cycle-middle-soft", text: "text-cycle-middle-ink" },
  secondary: {
    solid: "bg-cycle-secondary",
    onSolid: "text-white",
    soft: "bg-cycle-secondary-soft",
    text: "text-cycle-secondary-ink",
  },
};
