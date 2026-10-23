import "server-only";

// État en mémoire des phases 1-2 (remplacé par Supabase en phase 3). Conservé sur
// globalThis pour survivre au rechargement à chaud ; perdu au redémarrage du serveur.

import type {
  Assessment,
  AttemptResult,
  AuditEntry,
  PaymentRecord,
  TeachingMode,
  TutorAssignment,
  TutorLinkStatus,
  TutorProfile,
  TutorSession,
  TutorStatus,
} from "@/types/domain";

export interface MockAttempt {
  id: string;
  assessmentId: string;
  startedAt: number;
  deadlineAt: number | null;
  /** Ordre des options mélangé pour cette tentative (QCM). */
  optionOrder: Record<string, string[]>;
  status: "in_progress" | "submitted";
  result?: AttemptResult;
}

export interface MockMessage {
  id: string;
  senderId: string;
  body: string;
  createdAt: number;
}

export interface MockConversation {
  id: string;
  tutorId: string;
  studentId: string;
  /** Le parent d'un élève mineur est observateur de la conversation. */
  parentId: string | null;
  messages: MockMessage[];
}

interface MockState {
  attempts: Map<string, MockAttempt>;
  completedLessons: Set<string>;
  /** Consentement parental d'Awa (élève mineure de démo). */
  consentGranted: boolean;
  /** Fin d'abonnement Premium par élève (timestamp). */
  premiumUntil: Map<string, number>;
  payments: PaymentRecord[];
  conversations: Map<string, MockConversation>;
  tutorStatuses: Map<string, TutorStatus>;
  tutorRejections: Map<string, string>;
  tutorProfileEdits: Partial<Pick<TutorProfile, "headline" | "bio" | "hourlyRateFcfa" | "subjects" | "levels" | "whatsappOptIn">> & {
    mode?: TeachingMode;
    availability?: TutorProfile["availability"];
  };
  auditLog: AuditEntry[];
  examDates: Map<string, { startsOn: string; isOfficial: boolean }>;
  readNotifications: Set<string>;
  dataSaver: boolean;
  lessonBodyOverrides: Map<string, string>;
  handledReports: Set<string>;
  /** Suivi par un répétiteur : clé « tuteur:élève ». */
  tutorLinks: Map<string, { tutorId: string; studentId: string; status: TutorLinkStatus; invitedAt: string }>;
  tutorAssignments: TutorAssignment[];
  tutorSessions: TutorSession[];
  /** Séances « Préparer mon prochain devoir » créées pendant la démo. */
  practiceSessions: Map<string, Assessment & { createdAt: string }>;
  /** Passage en classe supérieure d'Awa pendant la démo (sinon : la 3e des données fictives). */
  studentLevel?: { levelCode: string; seriesCode: string | null };
  levelHistory: { levelCode: string; seriesCode: string | null; startedAt: string; endedAt: string }[];
}

const g = globalThis as typeof globalThis & { __diangalMockState?: MockState };

export const mockState: MockState = (g.__diangalMockState ??= {
  attempts: new Map(),
  completedLessons: new Set(),
  consentGranted: false,
  premiumUntil: new Map(),
  payments: [],
  conversations: new Map(),
  tutorStatuses: new Map(),
  tutorRejections: new Map(),
  tutorProfileEdits: {},
  auditLog: [],
  examDates: new Map(),
  readNotifications: new Set(),
  dataSaver: false,
  lessonBodyOverrides: new Map(),
  handledReports: new Set(),
  tutorLinks: new Map(),
  tutorAssignments: [],
  tutorSessions: [],
  practiceSessions: new Map(),
  levelHistory: [],
});

// Champs ajoutés après le premier démarrage : complétés si l'état existait déjà (rechargement à chaud).
mockState.premiumUntil ??= new Map();
mockState.payments ??= [];
mockState.conversations ??= new Map();
mockState.tutorStatuses ??= new Map();
mockState.tutorRejections ??= new Map();
mockState.tutorProfileEdits ??= {};
mockState.auditLog ??= [];
mockState.examDates ??= new Map();
mockState.readNotifications ??= new Set();
mockState.lessonBodyOverrides ??= new Map();
mockState.handledReports ??= new Set();
mockState.consentGranted ??= false;
mockState.dataSaver ??= false;
mockState.tutorLinks ??= new Map();
mockState.tutorAssignments ??= [];
mockState.tutorSessions ??= [];
mockState.practiceSessions ??= new Map();
mockState.levelHistory ??= [];

export function logAudit(actorName: string, action: string, target: string) {
  mockState.auditLog.unshift({
    id: crypto.randomUUID(),
    actorName,
    action,
    target,
    createdAt: new Date().toISOString(),
  });
}
