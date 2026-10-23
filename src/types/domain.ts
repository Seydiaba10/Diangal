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
  | "EPS"
  /** Éducation à la science et à la vie sociale (élémentaire : histoire, géographie, sciences, vivre ensemble). */
  | "ESVS"
  | "AR"
  | "ER"
  | "ESP"
  /** Matières propres à certaines séries du lycée (G, S3, S4, S5, T1, T2). */
  | "ECO"
  | "GEST"
  | "CONST"
  | "TECH"
  | "ELEC"
  | "AGRI"
  | "AGRO";

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

/** Matière telle qu'enseignée dans une classe (un programme) : « Mathématiques » en CI ≠ en 3e. */
export interface Subject {
  code: SubjectCode;
  /** Identifiant d'URL du programme, unique dans le catalogue (ex. « mathematiques-ci »). */
  slug: string;
  name: string;
  coefficient: number;
  /** Classe du programme (CI, 3E…). */
  levelCode: string;
  /** Série du lycée (S1, L2…), ou null pour un programme commun à la classe. */
  seriesCode?: string | null;
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
  /** Classe du programme auquel appartient le chapitre. */
  levelCode: string;
  seriesCode?: string | null;
  /** Rubrique du programme officiel (ex. « Activités géométriques »), si la matière en a. */
  strand?: string | null;
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
  strand?: string | null;
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
  /** Classe de l’évaluation (CI, 3E…). */
  levelCode: string;
  chapterId: string | null;
  /** null = non chronométré. */
  durationS: number | null;
  isPremium: boolean;
  questionIds: string[];
  /** Série (lycée) d'un sujet de Bac. */
  seriesCode?: string | null;
  /** Sujet d'examen : vérification, sources et origine du corrigé. */
  verification?: ContentVerification;
  sources?: ContentSource[];
  correctionSource?: string | null;
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
  /** Séance « Préparer mon prochain devoir » propre à un élève (absente du catalogue). */
  isPersonal?: boolean;
  /** Épreuve d'examen (sujet blanc ou annale) : examen, année, série, vérification, provenance. */
  examType?: ExamType | null;
  examYear?: number | null;
  seriesCode?: string | null;
  verification?: ContentVerification;
  sources?: ContentSource[];
  correctionSource?: string | null;
}

/** Chapitre proposé pour « Préparer mon prochain devoir ». */
export interface PracticeChapterOption {
  id: string;
  number: number;
  title: string;
  strand: string | null;
  questionsCount: number;
  isPremium: boolean;
}

/** Séance « Préparer mon prochain devoir » dans l'historique de l'élève. */
export interface PracticeHistoryItem {
  attemptId: string;
  subject: Subject;
  questionsCount: number;
  timed: boolean;
  status: "in_progress" | "submitted";
  score20: number | null;
  date: string;
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
  levelCode?: string;
  levelName?: string;
  schoolName?: string;
  /** Élève : jours d'affilée. */
  streakDays?: number;
  /** Parent : nombre d'enfants reliés. */
  childrenCount?: number;
}

// ── Compte ──────────────────────────────────────────────────────────────────

/** Ce que l'utilisateur connecté peut faire d'un compte (le sien ou celui d'un enfant relié). */
export type AccountDeletionMode =
  | "direct"
  | "parent_approval"
  | "blocked_admin"
  | "blocked_managed_children"
  | "not_allowed"
  | "not_found";

export interface AccountDeletionStatus {
  mode: AccountDeletionMode;
  /** Connexion de moins de 15 minutes : pas besoin d'un nouveau code. */
  recentLogin: boolean;
  /** Demande d'un élève mineur en attente de son parent (date ISO). */
  pendingRequestAt: string | null;
  /** Profils d'enfants sans email ni téléphone que le parent doit d'abord supprimer. */
  managedChildren: { id: string; firstName: string }[];
}

/** Identifiants de connexion de l'utilisateur, pour « Mon compte ». */
export interface AccountOverview {
  firstName: string;
  lastName: string;
  role: AppRole;
  email: string | null;
  /** Numéro E.164 (affiché masqué). */
  phone: string | null;
}

// ── Parrainage ──────────────────────────────────────────────────────────────

export type ReferralStatus = "pending" | "qualified" | "rewarded" | "cancelled" | "expired";
export type ReferralScenario = "prudent" | "intermediaire" | "genereux";

/** Règles du scénario choisi par l'admin (jours Premium offerts, garde, plafonds). */
export interface ReferralSettings {
  scenario: ReferralScenario;
  referrerDays: number;
  refereeDays: number;
  holdDays: number;
  minAmountFcfa: number;
  maxRewardsPerMonth: number;
  claimWindowDays: number;
  qualifyWithinDays: number;
}

export interface ReferralOverview {
  /** Élève validé par son parent (s'il est mineur) ou parent. */
  eligible: boolean;
  enabled: boolean;
  code: string | null;
  settings: ReferralSettings | null;
  /** Jours utilisables, encore en garde, déjà utilisés. */
  daysAvailable: number;
  daysOnHold: number;
  daysUsed: number;
  /** Filleuls : initiale seulement (minimisation des données). */
  referrals: { initial: string; role: AppRole; status: ReferralStatus; reason: string | null; createdAt: string }[];
}

export interface ReferralAdminStats {
  enabled: boolean;
  settings: ReferralSettings;
  byStatus: Partial<Record<ReferralStatus, number>>;
  daysGranted: number;
  daysUsed: number;
  daysRevoked: number;
}

// ── Parents ─────────────────────────────────────────────────────────────────

export interface ChildOverview {
  id: string;
  firstName: string;
  lastName: string;
  levelCode: string;
  levelName: string;
  /** Série au lycée (S1, L2…), qui détermine ses matières. */
  seriesCode?: string | null;
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

/** Formules proposées à la vente. */
export type OfferPlanCode = "monthly" | "quarterly" | "yearly" | "family_monthly" | "family_quarterly" | "family_yearly";
/** Formule d’un paiement : « bfem_pass » est une ancienne offre retirée (22/10/2026), gardée pour l’historique. */
export type PlanCode = OfferPlanCode | "bfem_pass";

export interface Plan {
  code: OfferPlanCode;
  priceFcfa: number;
  durationDays: number;
  /** Formule Famille : nombre d'enfants couverts ; null pour un pass individuel. */
  maxChildren?: number | null;
}

/** Formule Famille en cours d'un parent : fin de période et enfants couverts. */
export interface FamilyCoverage {
  planCode: PlanCode;
  endsAt: string;
  childIds: string[];
  maxChildren: number;
}

/** Connexion d'un enfant par code famille + code PIN. */
export interface ChildLoginInfo {
  studentId: string;
  hasPin: boolean;
  locked: boolean;
}

export interface PaymentRecord {
  id: string;
  reference: string;
  payerName: string;
  beneficiaryName: string;
  planCode: PlanCode;
  amountFcfa: number;
  channel: PaymentChannel;
  status: "pending" | "succeeded" | "failed" | "refunded";
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

export type NotificationKind =
  | "consent"
  | "quiz_result"
  | "tutor_message"
  | "payment"
  | "exam"
  | "tutor_review"
  | "tutor_invite"
  | "tutor_invite_answer"
  | "tutor_assignment"
  | "tutor_session"
  | "tutor_session_cancelled"
  | "account_deletion_request"
  | "account_deletion_refused"
  | "referral_reward";

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

/** Annale officielle vérifiée (évaluation « past_paper »). */
export interface ExamPaper {
  id: string;
  examType: ExamType;
  year: number;
  seriesCode: string | null;
  subjectCode: SubjectCode;
  subjectName: string;
  correctionPremium: boolean;
  /** Version numérisée corrigée automatiquement. */
  assessmentId: string | null;
  questionsCount: number;
  durationS: number | null;
  verification: ContentVerification;
  sources: ContentSource[];
  correctionSource: string | null;
}

// ── Administration ──────────────────────────────────────────────────────────

/** draft : dossier pas encore envoyé à la vérification. */
export type TutorStatus = "draft" | "pending" | "approved" | "rejected" | "suspended";

export type TutorDocumentType = "cni" | "passport" | "diploma" | "criminal_record";

export interface TutorDocument {
  /** Supabase uniquement : ligne tutor_documents et chemin dans le Storage privé. */
  id?: string;
  storagePath?: string;
  type: TutorDocumentType;
  fileName: string;
  status: "pending" | "accepted" | "rejected";
}

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
  documents: TutorDocument[];
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

// ── Référentiel scolaire (administration des contenus) ─────────────────────

export type PublishStatus = "draft" | "review" | "published" | "archived";

/** Vérification d'un chapitre : à vérifier, relu par un enseignant, source officielle vérifiée. */
export type ContentVerification = "unverified" | "reviewed" | "official";

/** Source d'un chapitre : document officiel vérifié, source externe ou contenu créé par DIANGAL. */
export interface ContentSource {
  title: string;
  url?: string;
  kind: "official" | "external" | "diangal";
}

/** Ligne du tableau de suivi : un programme (classe, série au lycée, matière). */
export interface ContentTrackingRow {
  programId: string;
  levelCode: string;
  seriesCode: string | null;
  subjectCode: string;
  subjectName: string;
  freeChapters: number;
  chapters: number;
  chaptersPublished: number;
  lessons: number;
  lessonsWritten: number;
  exercises: number;
  quizzes: number;
  exams: number;
  questions: number;
  chaptersUnverified: number;
  chaptersReviewed: number;
  chaptersOfficial: number;
  sourcedChapters: number;
}

export interface AdminLessonRow {
  id: string;
  number: number;
  title: string;
  status: PublishStatus;
  written: boolean;
}

/** Chapitre vu par l'admin : brouillons compris. */
export interface AdminChapterRow {
  id: string;
  number: number;
  slug: string;
  title: string;
  summary: string;
  strand: string | null;
  status: PublishStatus;
  verification: ContentVerification;
  sources: ContentSource[];
  lessons: AdminLessonRow[];
}

/** Programme (matière d'une classe) vu par l'admin. */
export interface AdminProgram {
  id: string;
  levelCode: string;
  seriesCode: string | null;
  subjectCode: string;
  subjectName: string;
  freeChapters: number;
  chapters: AdminChapterRow[];
}

export interface AdminSubjectOption {
  id: string;
  code: string;
  name: string;
}

// ── Suivi par un répétiteur ────────────────────────────────────────────────

export type TutorLinkStatus = "pending" | "active" | "declined" | "revoked";

/** Élève suivi (ou invité) par le répétiteur connecté : prénom et initiale seulement. */
export interface TutorStudentItem {
  id: string;
  name: string;
  levelCode: string;
  levelName: string;
  status: TutorLinkStatus;
  invitedAt: string;
  openAssignments: number;
  nextSessionAt: string | null;
}

/** Notes d'un élève suivi, telles que les voit son répétiteur. */
export interface TutorStudentView {
  student: { id: string; name: string; levelCode: string; levelName: string };
  stats: { average20: number | null; quizzesTaken: number; chaptersCompleted: number; chaptersTotal: number };
  subjects: { code: SubjectCode; name: string; average20: number; attempts: number }[];
  results: { title: string; subjectCode: SubjectCode; score20: number; submittedAt: string }[];
}

/** Répétiteur d'un enfant (vu par le parent) ou de l'élève lui-même. */
export interface FamilyTutorLink {
  tutorId: string;
  tutorName: string;
  headline: string;
  studentId: string;
  studentName: string;
  status: TutorLinkStatus;
  invitedAt: string;
  /** Le parent lié, ou l'élève majeur : peut accepter, refuser ou mettre fin au suivi. */
  canAnswer: boolean;
}

export interface TutorAssignment {
  id: string;
  tutorId: string;
  studentId: string;
  title: string;
  instructions: string;
  /** aaaa-mm-jj */
  dueOn: string | null;
  doneAt: string | null;
  createdAt: string;
}

/** Cours en ligne planifié par le répétiteur. */
export interface TutorSession {
  id: string;
  tutorId: string;
  studentId: string;
  startsAt: string;
  durationMin: number;
  topic: string;
  status: "planned" | "cancelled";
}
