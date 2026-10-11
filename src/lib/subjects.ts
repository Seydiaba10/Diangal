import {
  Atom,
  Brain,
  Calculator,
  Dumbbell,
  Earth,
  Landmark,
  Languages,
  Leaf,
  MessageCircle,
  PenLine,
  type LucideIcon,
} from "lucide-react";
import type { SubjectCode } from "@/types/domain";

export interface SubjectStyle {
  icon: LucideIcon;
  /** Texte et icône dans la couleur forte de la matière. */
  text: string;
  /** Fond pastel de la matière. */
  soft: string;
  /** Remplissage plein (barres de progression, pastilles). */
  solid: string;
}

// Classes écrites en entier pour que Tailwind les détecte (tokens définis dans globals.css).
export const SUBJECT_STYLES: Record<SubjectCode, SubjectStyle> = {
  MATH: { icon: Calculator, text: "text-subject-math", soft: "bg-subject-math-soft", solid: "bg-subject-math" },
  FR: { icon: PenLine, text: "text-subject-fr", soft: "bg-subject-fr-soft", solid: "bg-subject-fr" },
  ANG: { icon: Languages, text: "text-subject-ang", soft: "bg-subject-ang-soft", solid: "bg-subject-ang" },
  HG: { icon: Earth, text: "text-subject-hg", soft: "bg-subject-hg-soft", solid: "bg-subject-hg" },
  SVT: { icon: Leaf, text: "text-subject-svt", soft: "bg-subject-svt-soft", solid: "bg-subject-svt" },
  PC: { icon: Atom, text: "text-subject-pc", soft: "bg-subject-pc-soft", solid: "bg-subject-pc" },
  EC: { icon: Landmark, text: "text-subject-ec", soft: "bg-subject-ec-soft", solid: "bg-subject-ec" },
  LV2: { icon: MessageCircle, text: "text-subject-lv2", soft: "bg-subject-lv2-soft", solid: "bg-subject-lv2" },
  PHILO: { icon: Brain, text: "text-subject-philo", soft: "bg-subject-philo-soft", solid: "bg-subject-philo" },
  EPS: { icon: Dumbbell, text: "text-subject-eps", soft: "bg-subject-eps-soft", solid: "bg-subject-eps" },
};
