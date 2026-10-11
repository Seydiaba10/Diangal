// Types métier partagés entre l'UI et la couche de données (features/*/data.ts).
// En phase 3, les fonctions de data.ts liront Supabase en renvoyant ces mêmes types.

export type SubjectCode =
  | "MATH"
  | "FR"
  | "ANG"
  | "HG"
  | "SVT"
  | "PC"
  | "EC"
  | "LV2"
  | "PHILO"
  | "EPS";

export type ChapterStatus = "completed" | "in_progress" | "not_started";

export type ExamType = "CFEE" | "BFEM" | "BAC";

export type AvatarKey = "awa" | "moussa" | "fatou";

export type ConsentStatus = "not_required" | "pending" | "granted" | "refused";

export interface StudentSummary {
  firstName: string;
  lastName: string;
  levelCode: string;
  levelName: string;
  seriesCode: string | null;
  schoolName?: string;
  avatarKey: AvatarKey;
  isPremium: boolean;
  isMinor: boolean;
  /** Mode limité tant que le parent n'a pas validé (élève mineur). */
  consentStatus: ConsentStatus;
  streakDays: number;
  unreadNotifications: number;
}

// ── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardStats {
  /** Moyenne /20 des contrôles, pondérée par les coefficients ; null si aucun contrôle. */
  average20: number | null;
  chaptersCompleted: number;
  chaptersTotal: number;
  quizzesTaken: number;
  streakDays: number;
}

export interface ContinueItem {
  chapterId: string;
  subject: SubjectCode;
  subjectName: string;
  chapterTitle: string;
  status: ChapterStatus;
  isPremium: boolean;
  progressPct: number;
  lessonsDone: number;
  lessonsTotal: number;
  nextLessonTitle: string;
  href: string;
}

export type WeakPointAction = "review_lesson" | "practice" | "retake_quiz";

export interface WeakPoint {
  chapterId: string;
  subject: SubjectCode;
  subjectName: string;
  chapterTitle: string;
  lastScore20: number;
  action: WeakPointAction;
  href: string;
}

export interface NextExam {
  type: ExamType;
  year: number;
  /** Date ISO (aaaa-mm-jj) du premier jour d'épreuves. */
  startsOn: string;
  /** false tant que l'admin n'a pas saisi la date officielle. */
  isOfficial: boolean;
  daysLeft: number;
}

export interface StudentDashboard {
  student: StudentSummary;
  stats: DashboardStats;
  continueLearning: ContinueItem[];
  weakPoints: WeakPoint[];
  nextExam: NextExam | null;
}

// ── Catalogue de cours (contenu publié, identique pour tous) ────────────────

export interface Subject {
  code: SubjectCode;
  slug: string;
  name: string;
  coefficient: number;
}

export type LessonResourceKind = "pdf" | "video" | "audio";

export interface LessonResource {
  kind: LessonResourceKind;
  title: string;
  sizeBytes: number;
  durationS?: number;
}

export interface Lesson {
  id: string;
  slug: string;
  number: number;
  title: string;
  estimatedMinutes: number;
  isPremium: boolean;
  resources: LessonResource[];
}

export interface Chapter {
  id: string;
  slug: string;
  number: number;
  title: string;
  summary: string;
  subjectCode: SubjectCode;
  lessons: Lesson[];
}

/** Chapitre + progression de l'élève connecté. */
export interface ChapterSummary {
  id: string;
  slug: string;
  number: number;
  title: string;
  status: ChapterStatus;
  progressPct: number;
  isPremium: boolean;
  lessonsCount: number;
  lessonsDone: number;
  estimatedMinutes: number;
}

export interface SubjectProgress extends Subject {
  chaptersTotal: number;
  chaptersCompleted: number;
  progressPct: number;
}

export type LessonStatus = "completed" | "not_started";

export interface ChapterSearchHit {
  subject: Subject;
  chapterSlug: string;
  chapterTitle: string;
  number: number;
}

// ── Évaluations ─────────────────────────────────────────────────────────────

export type AssessmentKind = "exercise" | "quiz" | "mock_exam" | "past_paper";

export type QuestionType = "single_choice" | "multiple_choice" | "true_false" | "short_text" | "numeric";

export interface Assessment {
  id: string;
  kind: AssessmentKind;
  title: string;
  subjectCode: SubjectCode;
  chapterId: string | null;
  /** null = non chronométré. */
  durationS: number | null;
  isPremium: boolean;
  questionIds: string[];
}

export interface AssessmentSummary {
  id: string;
  kind: AssessmentKind;
  title: string;
  subject: Subject;
  chapterTitle: string | null;
  chapterHref: string | null;
  durationS: number | null;
  questionsCount: number;
  isPremium: boolean;
  bestScore20: number | null;
}

/** Question telle qu'envoyée au navigateur : jamais d'information de correction. */
export interface PlayerQuestion {
  id: string;
  type: QuestionType;
  promptHtml: string;
  points: number;
  options: { id: string; labelHtml: string }[];
}

/** Ids d'options cochées (QCM, vrai/faux) ou texte saisi (réponse courte, numérique). */
export type AnswerValue = string[] | string;

export type AnswerMap = Record<string, AnswerValue>;

export interface AttemptSession {
  id: string;
  assessment: AssessmentSummary;
  questions: PlayerQuestion[];
  startedAt: string;
  /** null pour un entraînement non chronométré. */
  deadlineAt: string | null;
  /** Heure du serveur au chargement (ms) : le chronomètre ne dépend pas de l'horloge du téléphone. */
  serverNow: number;
}

export interface QuestionReview extends PlayerQuestion {
  response: AnswerValue | null;
  isCorrect: boolean;
  pointsAwarded: number;
  correctOptionIds: string[];
  /** Réponse attendue pour une question à saisir. */
  expectedAnswer: string | null;
  explanationHtml: string;
}

export interface AttemptResult {
  id: string;
  assessment: AssessmentSummary;
  score: number;
  maxScore: number;
  score20: number;
  correctCount: number;
  durationS: number;
  submittedAt: string;
  late: boolean;
  questions: QuestionReview[];
}

// ── Répétiteurs ─────────────────────────────────────────────────────────────

export type TeachingMode = "online" | "home" | "both";

export interface TutorCard {
  id: string;
  displayName: string;
  photoUrl: string | null;
  headline: string;
  subjects: SubjectCode[];
  levels: string[];
  city: string;
  neighborhood: string | null;
  mode: TeachingMode;
  hourlyRateFcfa: number;
  ratingAvg: number | null;
  ratingCount: number;
  verified: true;
}

export interface TutorProfile extends TutorCard {
  bio: string;
  yearsExperience: number;
  qualifications: { title: string; institution: string; year: number }[];
  /** weekday : 1 = lundi … 7 = dimanche. Heures « HH:MM ». */
  availability: { weekday: number; start: string; end: string }[];
  whatsappOptIn: boolean;
}

export type TutorSort = "relevance" | "price" | "rating";

export interface TutorFilters {
  subject?: SubjectCode;
  level?: string;
  city?: string;
  mode?: "online" | "home";
  priceMax?: number;
  minRating?: number;
  sort: TutorSort;
}

// ── Rôles et session ────────────────────────────────────────────────────────

export type AppRole = "student" | "parent" | "tutor" | "admin";

export interface SessionUser {
  role: AppRole;
  id: string;
  firstName: string;
  lastName: string;
  avatarKey: AvatarKey | null;
  unreadNotifications: number;
  /** Élève : classe et établissement. */
  levelName?: string;
  schoolName?: string;
  /** Élève : jours d'affilée. */
  streakDays?: number;
  /** Parent : nombre d'enfants reliés. */
  childrenCount?: number;
}

// ── Parents ─────────────────────────────────────────────────────────────────

export interface ChildOverview {
  id: string;
  firstName: string;
  lastName: string;
  levelCode: string;
  levelName: string;
  schoolName?: string;
  avatarKey: AvatarKey;
  average20: number | null;
  streakDays: number;
  chaptersCompleted: number;
  chaptersTotal: number;
  lastActivityAt: string | null;
  weakPointsCount: number;
  consentStatus: ConsentStatus;
  premiumUntil: string | null;
  nextExam: NextExam | null;
}

// ── Paiements ───────────────────────────────────────────────────────────────

export type PaymentChannel = "wave" | "orange_money" | "free_money" | "card";

export type PlanCode = "monthly" | "quarterly" | "yearly" | "bfem_pass";

export interface Plan {
  code: PlanCode;
  priceFcfa: number;
  durationDays: number;
}

export interface PaymentRecord {
  id: string;
  reference: string;
  payerName: string;
  beneficiaryName: string;
  planCode: PlanCode;
  amountFcfa: number;
  channel: PaymentChannel;
  status: "pending" | "succeeded" | "failed";
  createdAt: string;
}

// ── Messagerie et notifications ─────────────────────────────────────────────

export interface ConversationSummary {
  id: string;
  title: string;
  subtitle: string;
  lastMessage: string;
  lastMessageAt: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: AppRole;
  body: string;
  createdAt: string;
  mine: boolean;
}

export type NotificationKind = "consent" | "quiz_result" | "tutor_message" | "payment" | "exam" | "tutor_review";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  /** Paramètres du message traduit (prénom, note, matière…). */
  params: Record<string, string>;
  href: string;
  createdAt: string;
  read: boolean;
}

// ── Examens nationaux ───────────────────────────────────────────────────────

export interface ExamSession {
  id: string;
  type: ExamType;
  year: number;
  startsOn: string;
  isOfficial: boolean;
}

export interface ExamPaper {
  id: string;
  examType: ExamType;
  year: number;
  subjectCode: SubjectCode;
  subjectName: string;
  subjectSizeBytes: number;
  correctionSizeBytes: number;
  correctionPremium: boolean;
  /** Version numérisée corrigée automatiquement, si disponible. */
  assessmentId: string | null;
}

// ── Administration ──────────────────────────────────────────────────────────

export type TutorStatus = "pending" | "approved" | "rejected" | "suspended";

export type TutorDocumentType = "cni" | "diploma" | "criminal_record";

export interface TutorReviewItem {
  id: string;
  displayName: string;
  subjects: SubjectCode[];
  city: string;
  mode: TeachingMode;
  hourlyRateFcfa: number;
  submittedAt: string;
  status: TutorStatus;
  rejectionReason: string | null;
  documents: { type: TutorDocumentType; fileName: string; status: "pending" | "accepted" | "rejected" }[];
}

export interface AdminStats {
  students: number;
  parents: number;
  tutorsApproved: number;
  tutorsPending: number;
  premiumStudents: number;
  revenueMonthFcfa: number;
  quizzesThisWeek: number;
  reportsOpen: number;
  signupsByDay: { day: string; count: number }[];
  revenueByChannel: { channel: PaymentChannel; amountFcfa: number }[];
}

export interface AdminUserRow {
  id: string;
  name: string;
  role: AppRole;
  city: string;
  createdAt: string;
  consentStatus: ConsentStatus | null;
}

export interface ReportRow {
  id: string;
  targetType: "message" | "review" | "tutor" | "user";
  reason: string;
  reporterName: string;
  targetName: string;
  createdAt: string;
  status: "open" | "handled";
}

export interface AuditEntry {
  id: string;
  actorName: string;
  action: string;
  target: string;
  createdAt: string;
}
