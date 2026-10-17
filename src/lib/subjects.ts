import {
  Atom,
  BookOpen,
  Brain,
  Briefcase,
  Calculator,
  Cog,
  Compass,
  Dumbbell,
  Earth,
  HandHeart,
  Landmark,
  Languages,
  Leaf,
  MessageCircle,
  MessagesSquare,
  PenLine,
  ScrollText,
  Sprout,
  TrendingUp,
  Wheat,
  Wrench,
  Zap,
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
  ESVS: { icon: Compass, text: "text-subject-esvs", soft: "bg-subject-esvs-soft", solid: "bg-subject-esvs" },
  AR: { icon: ScrollText, text: "text-subject-ar", soft: "bg-subject-ar-soft", solid: "bg-subject-ar" },
  ER: { icon: HandHeart, text: "text-subject-er", soft: "bg-subject-er-soft", solid: "bg-subject-er" },
  ESP: { icon: MessagesSquare, text: "text-subject-esp", soft: "bg-subject-esp-soft", solid: "bg-subject-esp" },
  ECO: { icon: TrendingUp, text: "text-subject-eco", soft: "bg-subject-eco-soft", solid: "bg-subject-eco" },
  GEST: { icon: Briefcase, text: "text-subject-gest", soft: "bg-subject-gest-soft", solid: "bg-subject-gest" },
  CONST: { icon: Cog, text: "text-subject-const", soft: "bg-subject-const-soft", solid: "bg-subject-const" },
  TECH: { icon: Wrench, text: "text-subject-tech", soft: "bg-subject-tech-soft", solid: "bg-subject-tech" },
  ELEC: { icon: Zap, text: "text-subject-elec", soft: "bg-subject-elec-soft", solid: "bg-subject-elec" },
  AGRI: { icon: Sprout, text: "text-subject-agri", soft: "bg-subject-agri-soft", solid: "bg-subject-agri" },
  AGRO: { icon: Wheat, text: "text-subject-agro", soft: "bg-subject-agro-soft", solid: "bg-subject-agro" },
};

/** Matière ajoutée par l'admin sans style dédié : couleurs neutres. */
const FALLBACK_STYLE: SubjectStyle = { icon: BookOpen, text: "text-ink", soft: "bg-canvas", solid: "bg-ink-muted" };

export function subjectStyle(code: string): SubjectStyle {
  return SUBJECT_STYLES[code as SubjectCode] ?? FALLBACK_STYLE;
}
