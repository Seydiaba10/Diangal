import {
  Bell,
  BookOpen,
  CalendarDays,
  ChartColumn,
  ClipboardList,
  Crown,
  Download,
  Flag,
  FolderTree,
  Gift,
  GraduationCap,
  House,
  KeyRound,
  ListChecks,
  LayoutDashboard,
  MessageCircle,
  ScrollText,
  Settings,
  ShieldCheck,
  Target,
  UserCheck,
  UserPlus,
  UserRound,
  Users,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { AppRole } from "@/types/domain";

export type NavLabelKey =
  | "home"
  | "courses"
  | "practice"
  | "exams"
  | "tutors"
  | "profile"
  | "account"
  | "referral"
  | "messages"
  | "downloads"
  | "notifications"
  | "subscriptions"
  | "addChild"
  | "family"
  | "dashboard"
  | "verification"
  | "availability"
  | "students"
  | "onlineSessions"
  | "stats"
  | "contents"
  | "contentTracking"
  | "referential"
  | "assessments"
  | "examSessions"
  | "tutorsReview"
  | "reports"
  | "users"
  | "payments"
  | "audit";

export interface NavItem {
  labelKey: NavLabelKey;
  href: string;
  icon: LucideIcon;
  /** Actif seulement sur l'URL exacte (sinon aussi sur les sous-pages). */
  exact?: boolean;
  /** Présent dans la barre basse mobile (5 onglets maximum). */
  inBottomNav?: boolean;
}

export const NAV: Record<AppRole, { main: NavItem[]; others: NavItem[]; profileHref: string }> = {
  student: {
    main: [
      { labelKey: "home", href: "/eleve", icon: House, exact: true, inBottomNav: true },
      { labelKey: "courses", href: "/eleve/cours", icon: BookOpen, inBottomNav: true },
      { labelKey: "practice", href: "/eleve/exercices", icon: Target, inBottomNav: true },
      { labelKey: "exams", href: "/eleve/examens", icon: GraduationCap, inBottomNav: true },
      { labelKey: "tutors", href: "/repetiteurs", icon: Users, inBottomNav: true },
      { labelKey: "profile", href: "/eleve/profil", icon: UserRound },
    ],
    others: [
      { labelKey: "messages", href: "/messages", icon: MessageCircle },
      { labelKey: "downloads", href: "/eleve/telechargements", icon: Download },
      { labelKey: "referral", href: "/parrainage", icon: Gift },
      { labelKey: "account", href: "/compte", icon: Settings },
    ],
    profileHref: "/eleve/profil",
  },
  parent: {
    main: [
      { labelKey: "home", href: "/parent", icon: House, exact: true, inBottomNav: true },
      { labelKey: "tutors", href: "/repetiteurs", icon: Users, inBottomNav: true },
      { labelKey: "messages", href: "/messages", icon: MessageCircle, inBottomNav: true },
      { labelKey: "subscriptions", href: "/parent/abonnements", icon: Crown, inBottomNav: true },
      { labelKey: "profile", href: "/parent/profil", icon: UserRound, inBottomNav: true },
    ],
    others: [
      { labelKey: "family", href: "/parent/famille", icon: KeyRound },
      { labelKey: "addChild", href: "/parent/enfants/ajouter", icon: UserPlus },
      { labelKey: "notifications", href: "/notifications", icon: Bell },
      { labelKey: "referral", href: "/parrainage", icon: Gift },
      { labelKey: "account", href: "/compte", icon: Settings },
    ],
    profileHref: "/parent/profil",
  },
  // Le répétiteur ne voit pas les cours : il suit ses élèves (notes, devoirs, messages, cours en ligne).
  tutor: {
    main: [
      { labelKey: "dashboard", href: "/prof", icon: LayoutDashboard, exact: true, inBottomNav: true },
      { labelKey: "students", href: "/prof/eleves", icon: GraduationCap, inBottomNav: true },
      { labelKey: "onlineSessions", href: "/prof/cours-en-ligne", icon: Video, inBottomNav: true },
      { labelKey: "messages", href: "/messages", icon: MessageCircle, inBottomNav: true },
      { labelKey: "profile", href: "/prof/profil", icon: UserRound, inBottomNav: true },
    ],
    others: [
      { labelKey: "verification", href: "/prof/verification", icon: ShieldCheck },
      { labelKey: "availability", href: "/prof/disponibilites", icon: CalendarDays },
      { labelKey: "notifications", href: "/notifications", icon: Bell },
      { labelKey: "account", href: "/compte", icon: Settings },
    ],
    profileHref: "/prof/profil",
  },
  admin: {
    main: [
      { labelKey: "stats", href: "/admin", icon: ChartColumn, exact: true, inBottomNav: true },
      { labelKey: "contents", href: "/admin/contenus", icon: BookOpen, inBottomNav: true },
      { labelKey: "contentTracking", href: "/admin/suivi", icon: ListChecks },
      { labelKey: "referential", href: "/admin/referentiel", icon: FolderTree },
      { labelKey: "assessments", href: "/admin/evaluations", icon: ClipboardList },
      { labelKey: "examSessions", href: "/admin/examens", icon: GraduationCap },
      { labelKey: "tutorsReview", href: "/admin/repetiteurs", icon: UserCheck, inBottomNav: true },
      { labelKey: "reports", href: "/admin/signalements", icon: Flag, inBottomNav: true },
    ],
    others: [
      { labelKey: "users", href: "/admin/utilisateurs", icon: Users },
      { labelKey: "payments", href: "/admin/paiements", icon: Wallet, inBottomNav: true },
      { labelKey: "audit", href: "/admin/journal", icon: ScrollText },
      { labelKey: "account", href: "/compte", icon: Settings },
    ],
    profileHref: "/compte",
  },
};
