"use server";

import { refresh, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/features/account/guards";
import { requireIdentity } from "@/features/account/session";
import { findLessonById } from "@/features/curriculum/data";
import { signedDocumentUrl } from "@/features/tutors/supabase";
import { isSupabaseConfigured } from "@/lib/env";
import { isLevelCode, SERIES_BY_LEVEL } from "@/lib/levels";
import { sanitizeLessonHtml } from "@/lib/sanitize";
import { slugify } from "@/lib/slug";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EXAM_SESSIONS } from "@/mocks/exams";
import { logAudit, mockState } from "@/mocks/progress-store";
import { DEMO_ADMIN } from "@/mocks/users";
import type { Json } from "@/types/database";
import type { ContentSource, ContentVerification } from "@/types/domain";

const ADMIN_NAME = `${DEMO_ADMIN.firstName} ${DEMO_ADMIN.lastName}`;

/** RPC review_tutor : statut, motif, notification du répétiteur, journal d'audit. */
export async function reviewTutorAction(tutorId: string, decision: "approved" | "rejected" | "suspended", formData: FormData) {
  await requireRole("admin");
  const reason = String(formData.get("reason") ?? "").trim().slice(0, 300);
  if (decision === "rejected" && !reason) redirect(`/admin/repetiteurs/${tutorId}?erreur=motif`);

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("review_tutor", { p_tutor: tutorId, p_decision: decision, p_reason: reason || undefined });
    if (error) redirect(`/admin/repetiteurs/${tutorId}?erreur=decision`);
    updateTag("tutors");
    redirect(`/admin/repetiteurs/${tutorId}?decision=${decision}`);
  }

  mockState.tutorStatuses.set(tutorId, decision);
  if (decision === "rejected") mockState.tutorRejections.set(tutorId, reason);
  else mockState.tutorRejections.delete(tutorId);
  logAudit(ADMIN_NAME, `répétiteur : ${decision}`, tutorId);
  redirect(`/admin/repetiteurs/${tutorId}?decision=${decision}`);
}

/** Pièce d'un répétiteur : lien signé de 5 minutes, consultation inscrite au journal d'audit. */
export async function openTutorDocumentAction(tutorId: string, storagePath: string) {
  await requireRole("admin");
  if (!isSupabaseConfigured() || !storagePath.startsWith(`${tutorId}/`)) redirect(`/admin/repetiteurs/${tutorId}`);
  const url = await signedDocumentUrl(storagePath);
  if (!url) redirect(`/admin/repetiteurs/${tutorId}?erreur=piece`);
  const supabase = await createSupabaseServerClient();
  await supabase.rpc("admin_log", { p_action: "consultation des pièces", p_entity_type: "tutor", p_entity_id: tutorId });
  redirect(url);
}

export async function handleReportAction(reportId: string) {
  await requireRole("admin");
  if (isSupabaseConfigured()) {
    const { userId } = await requireIdentity();
    const supabase = await createSupabaseServerClient();
    await supabase
      .from("reports")
      .update({ status: "handled", handled_by: userId, handled_at: new Date().toISOString() })
      .eq("id", reportId);
    await supabase.rpc("admin_log", { p_action: "signalement traité", p_entity_type: "report", p_entity_id: reportId });
    refresh();
    return;
  }
  mockState.handledReports.add(reportId);
  logAudit(ADMIN_NAME, "signalement traité", reportId);
  refresh();
}

/** Les dates saisies ici alimentent le compte à rebours des élèves. */
export async function updateExamSessionAction(sessionId: string, formData: FormData) {
  await requireRole("admin");
  const startsOn = String(formData.get("startsOn") ?? "");
  const isOfficial = formData.get("official") === "on";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startsOn)) redirect("/admin/examens?erreur=date");

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("exam_sessions")
      .update({ starts_on: startsOn, is_official: isOfficial })
      .eq("id", sessionId)
      .select("id");
    if (error || !data?.length) redirect("/admin/examens?erreur=date");
    await supabase.rpc("admin_log", {
      p_action: `date d'examen : ${startsOn}`,
      p_entity_type: "exam_session",
      p_entity_id: sessionId,
    });
    updateTag("exam-sessions");
    redirect("/admin/examens?enregistre=1");
  }

  if (!EXAM_SESSIONS.some((s) => s.id === sessionId)) redirect("/admin/examens?erreur=date");
  mockState.examDates.set(sessionId, { startsOn, isOfficial });
  logAudit(ADMIN_NAME, `date d'examen : ${startsOn}`, sessionId);
  redirect("/admin/examens?enregistre=1");
}

/** Corps de leçon : HTML assaini côté serveur par liste blanche (sanitize-html). */
export async function saveLessonBodyAction(lessonId: string, formData: FormData) {
  await requireRole("admin");
  const body = sanitizeLessonHtml(String(formData.get("body") ?? "").slice(0, 20_000));
  const back = `/admin/contenus/lecons/${encodeURIComponent(lessonId)}`;
  if (!body.trim()) redirect(`${back}?erreur=1`);

  // Sur la base, la RPC refuse une leçon inconnue ; en démo, on vérifie dans le catalogue.
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.rpc("admin_save_lesson_body", { p_lesson: lessonId, p_html: body });
    if (error) redirect(`${back}?erreur=1`);
    redirect(`${back}?enregistre=1`);
  }

  if (!(await findLessonById(lessonId))) redirect(`${back}?erreur=1`);
  mockState.lessonBodyOverrides.set(lessonId, body);
  logAudit(ADMIN_NAME, "leçon modifiée", lessonId);
  redirect(`${back}?enregistre=1`);
}

// ── Référentiel : classes, matières, chapitres et leçons ─────────────────────
// Écriture directe sous la RLS admin (rôle admin + aal2), puis journal d'audit.
// En démo, le catalogue vient des fichiers de src/mocks : rien n'est enregistré, la page le signale.

const REFERENTIAL_PATH = "/admin/referentiel";
const chapterPath = (id: string) => `/admin/contenus/chapitres/${encodeURIComponent(id)}`;

function withParam(path: string, param: string) {
  return `${path}${path.includes("?") ? "&" : "?"}${param}`;
}

/** Démo : le référentiel ne se modifie que sur la vraie base. */
function demoOnly(back: string): never {
  redirect(withParam(back, "demo=1"));
}

const text = (formData: FormData, name: string, max: number) => String(formData.get(name) ?? "").trim().slice(0, max);

/** Entier saisi dans un formulaire, borné ; null s'il est absent ou invalide. */
function intField(formData: FormData, name: string, min: number, max: number) {
  const raw = String(formData.get(name) ?? "").trim();
  const value = Number(raw);
  return raw && Number.isInteger(value) && value >= min && value <= max ? value : null;
}

/** Identifiant d'URL unique parmi ceux déjà pris (« thales », « thales-2 »…). */
function uniqueSlug(title: string, taken: string[]) {
  const base = slugify(title).slice(0, 60) || "chapitre";
  let slug = base;
  for (let i = 2; taken.includes(slug); i++) slug = `${base}-${i}`;
  return slug;
}

async function logAdmin(action: string, entityType: string, entityId: string) {
  const supabase = await createSupabaseServerClient();
  await supabase.rpc("admin_log", { p_action: action, p_entity_type: entityType, p_entity_id: entityId });
}

/** Ajoute une matière à une classe (et à une série au lycée). */
export async function addProgramAction(formData: FormData) {
  await requireRole("admin");
  const level = text(formData, "level", 8);
  const series = text(formData, "series", 8) || null;
  const subjectId = intField(formData, "subject", 1, 32_000);
  const back = `${REFERENTIAL_PATH}?classe=${encodeURIComponent(level)}`;
  if (!isLevelCode(level) || (series && !SERIES_BY_LEVEL[level]?.includes(series))) redirect(withParam(back, "erreur=programme"));
  if (!isSupabaseConfigured()) demoOnly(back);
  if (!subjectId) redirect(withParam(back, "erreur=programme"));

  const supabase = await createSupabaseServerClient();
  const [levelRow, seriesRow] = await Promise.all([
    supabase.from("levels").select("id").eq("code", level).single(),
    series ? supabase.from("series").select("id").eq("code", series).single() : Promise.resolve({ data: null }),
  ]);
  if (!levelRow.data || (series && !seriesRow.data)) redirect(withParam(back, "erreur=programme"));
  const { data: last } = await supabase
    .from("programs")
    .select("sort_order")
    .eq("level_id", levelRow.data.id)
    .order("sort_order", { ascending: false })
    .limit(1);
  const { data, error } = await supabase
    .from("programs")
    .insert({
      level_id: levelRow.data.id,
      series_id: seriesRow.data?.id ?? null,
      subject_id: subjectId,
      sort_order: (last?.[0]?.sort_order ?? 0) + 1,
    })
    .select("id")
    .single();
  if (error || !data) redirect(withParam(back, error?.code === "23505" ? "erreur=doublon" : "erreur=programme"));
  await logAdmin("matière ajoutée à une classe", "program", String(data.id));
  updateTag("catalog");
  redirect(withParam(back, "enregistre=programme"));
}

/** Nombre de chapitres gratuits d'une matière (offre gratuite). */
export async function updateProgramAction(programId: string, level: string, formData: FormData) {
  await requireRole("admin");
  const freeChapters = intField(formData, "freeChapters", 0, 50);
  const back = `${REFERENTIAL_PATH}?classe=${encodeURIComponent(level)}`;
  if (freeChapters === null) redirect(withParam(back, "erreur=gratuits"));
  if (!isSupabaseConfigured()) demoOnly(back);
  if (!/^\d{1,9}$/.test(programId)) redirect(withParam(back, "erreur=gratuits"));

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("programs")
    .update({ free_chapters: freeChapters })
    .eq("id", Number(programId))
    .select("id");
  if (error || !data?.length) redirect(withParam(back, "erreur=gratuits"));
  await logAdmin(`chapitres gratuits : ${freeChapters}`, "program", programId);
  updateTag("catalog");
  redirect(withParam(back, "enregistre=gratuits"));
}

/** Retire une matière d'une classe, seulement si elle n'a encore aucun chapitre. */
export async function removeProgramAction(programId: string, level: string) {
  await requireRole("admin");
  const back = `${REFERENTIAL_PATH}?classe=${encodeURIComponent(level)}`;
  if (!isSupabaseConfigured()) demoOnly(back);
  if (!/^\d{1,9}$/.test(programId)) redirect(withParam(back, "erreur=retrait"));

  const supabase = await createSupabaseServerClient();
  const { count } = await supabase.from("chapters").select("id", { count: "exact", head: true }).eq("program_id", Number(programId));
  if (count !== 0) redirect(withParam(back, "erreur=retrait"));
  const { error } = await supabase.from("programs").delete().eq("id", Number(programId));
  if (error) redirect(withParam(back, "erreur=retrait"));
  await logAdmin("matière retirée d'une classe", "program", programId);
  updateTag("catalog");
  redirect(withParam(back, "enregistre=retrait"));
}

/**
 * Offre gratuite : les N premiers chapitres de chaque matière ouverts à tous, le reste Premium.
 * À activer quand le paiement est ouvert ; désactiver laisse les accès en l'état.
 */
export async function setFreeTierAction(enabled: boolean, level: string) {
  await requireRole("admin");
  const back = `${REFERENTIAL_PATH}${isLevelCode(level) ? `?classe=${level}` : ""}`;
  if (!isSupabaseConfigured()) demoOnly(back);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.rpc("admin_set_free_tier", { p_enabled: enabled });
  if (error) redirect(withParam(back, "erreur=offre"));
  updateTag("catalog");
  redirect(withParam(back, enabled ? "enregistre=offreActive" : "enregistre=offreInactive"));
}

/** Nouvelle matière du référentiel (code court en majuscules, nom affiché). */
export async function createSubjectAction(formData: FormData) {
  await requireRole("admin");
  const code = text(formData, "code", 6).toUpperCase();
  const name = text(formData, "name", 40);
  const level = text(formData, "level", 8);
  const back = `${REFERENTIAL_PATH}${isLevelCode(level) ? `?classe=${level}` : ""}`;
  if (!/^[A-Z]{2,6}$/.test(code) || name.length < 2) redirect(withParam(back, "erreur=matiere"));
  if (!isSupabaseConfigured()) demoOnly(back);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("subjects")
    .insert({ code, slug: slugify(name), name, color_token: `subject-${code.toLowerCase()}`, icon: "book-open" })
    .select("id")
    .single();
  if (error || !data) redirect(withParam(back, error?.code === "23505" ? "erreur=matiereExiste" : "erreur=matiere"));
  await logAdmin(`matière créée : ${name}`, "subject", String(data.id));
  redirect(withParam(back, "enregistre=matiere"));
}

/** Nouveau chapitre, créé en brouillon à la suite des autres. */
export async function createChapterAction(programId: string, formData: FormData) {
  await requireRole("admin");
  const title = text(formData, "title", 120);
  const summary = text(formData, "summary", 300);
  const strand = text(formData, "strand", 80) || null;
  const back = `/admin/contenus/chapitres/nouveau?programme=${encodeURIComponent(programId)}`;
  if (title.length < 3) redirect(withParam(back, "erreur=titre"));
  if (!isSupabaseConfigured()) demoOnly(back);
  if (!/^\d{1,9}$/.test(programId)) redirect(withParam(back, "erreur=titre"));

  const supabase = await createSupabaseServerClient();
  const { data: siblings } = await supabase.from("chapters").select("number, slug").eq("program_id", Number(programId));
  const number = Math.max(0, ...(siblings ?? []).map((c) => c.number)) + 1;
  const { data, error } = await supabase
    .from("chapters")
    .insert({
      program_id: Number(programId),
      number,
      sort_order: number,
      slug: uniqueSlug(title, (siblings ?? []).map((c) => c.slug)),
      title,
      summary,
      strand,
      status: "draft",
    })
    .select("id")
    .single();
  if (error || !data) redirect(withParam(back, "erreur=titre"));
  await logAdmin(`chapitre créé : ${title}`, "chapter", data.id);
  redirect(withParam(chapterPath(data.id), "cree=1"));
}

const VERIFICATIONS: ContentVerification[] = ["unverified", "reviewed", "official"];
const SOURCE_KINDS: ContentSource["kind"][] = ["official", "external", "diangal"];

/** Sources saisies ligne par ligne (titre, lien facultatif en http(s), type) ; null si un lien est invalide. */
function readSources(formData: FormData): ContentSource[] | null {
  const titles = formData.getAll("sourceTitle").map((v) => String(v).trim().slice(0, 200));
  const urls = formData.getAll("sourceUrl").map((v) => String(v).trim().slice(0, 500));
  const kinds = formData.getAll("sourceKind").map(String);
  const sources: ContentSource[] = [];
  for (const [i, title] of titles.entries()) {
    if (!title) continue;
    const url = urls[i] ?? "";
    if (url && !/^https?:\/\/[^\s]+$/i.test(url)) return null;
    const kind = SOURCE_KINDS.find((k) => k === kinds[i]) ?? "external";
    sources.push({ title, kind, ...(url ? { url } : {}) });
  }
  return sources.slice(0, 8);
}

/** Titre, résumé, rubrique, numéro, statut de vérification et sources d'un chapitre. */
export async function updateChapterAction(chapterId: string, formData: FormData) {
  await requireRole("admin");
  const back = chapterPath(chapterId);
  const title = text(formData, "title", 120);
  const summary = text(formData, "summary", 300);
  const strand = text(formData, "strand", 80) || null;
  const number = intField(formData, "number", 1, 99);
  const verification = VERIFICATIONS.find((v) => v === formData.get("verification"));
  const sources = readSources(formData);
  if (title.length < 3 || !number || !verification) redirect(withParam(back, "erreur=champs"));
  if (!sources) redirect(withParam(back, "erreur=lien"));
  if (!isSupabaseConfigured()) demoOnly(back);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("chapters")
    .update({ title, summary, strand, number, sort_order: number, verification, sources: sources as unknown as Json })
    .eq("id", chapterId)
    .select("status");
  if (error || !data?.length) redirect(withParam(back, "erreur=champs"));
  await logAdmin("chapitre modifié", "chapter", chapterId);
  if (data[0]!.status === "published") updateTag("catalog");
  redirect(withParam(back, "enregistre=1"));
}

/**
 * Sujet d'examen ou évaluation : statut de vérification, sources et origine du corrigé.
 * Une annale officielle n'est proposée aux élèves qu'une fois vérifiée.
 */
export async function updateAssessmentProvenanceAction(assessmentSlug: string, formData: FormData) {
  await requireRole("admin");
  const back = `/admin/evaluations/${encodeURIComponent(assessmentSlug)}`;
  const verification = VERIFICATIONS.find((v) => v === formData.get("verification"));
  const correctionSource = text(formData, "correctionSource", 200) || null;
  const sources = readSources(formData);
  if (!verification) redirect(withParam(back, "erreur=champs"));
  if (!sources) redirect(withParam(back, "erreur=lien"));
  if (!isSupabaseConfigured()) demoOnly(back);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("assessments")
    .update({ verification, sources: sources as unknown as Json, correction_source: correctionSource })
    .eq("slug", assessmentSlug)
    .is("owner_id", null)
    .select("id");
  if (error || !data?.length) redirect(withParam(back, "erreur=champs"));
  await logAdmin(`provenance : ${verification}`, "assessment", data[0]!.id);
  updateTag("catalog");
  redirect(withParam(back, "enregistre=1"));
}

/**
 * Publication d'un chapitre et de ses leçons. Contrôles avant de publier : au moins une source,
 * au moins une leçon, et chaque leçon rédigée. Dépublier repasse chapitre et leçons en brouillon.
 */
export async function setChapterStatusAction(chapterId: string, status: "draft" | "review" | "published") {
  await requireRole("admin");
  const back = chapterPath(chapterId);
  if (!isSupabaseConfigured()) demoOnly(back);

  const supabase = await createSupabaseServerClient();
  const { data: chapter } = await supabase.from("chapters").select("id, sources, lessons(id)").eq("id", chapterId).maybeSingle();
  if (!chapter) redirect(withParam(back, "erreur=statut"));
  const lessonIds = chapter.lessons.map((l) => l.id);

  if (status === "published") {
    if (!Array.isArray(chapter.sources) || chapter.sources.length === 0) redirect(withParam(back, "erreur=sources"));
    if (!lessonIds.length) redirect(withParam(back, "erreur=lecons"));
    const { data: bodies } = await supabase.from("lesson_bodies").select("lesson_id, body_html").in("lesson_id", lessonIds);
    // Même règle que le tableau de suivi : un contenu réel, pas le gabarit de démonstration.
    const written = new Set(
      (bodies ?? []).filter((b) => b.body_html.trim() && !b.body_html.includes("Contenu de démonstration")).map((b) => b.lesson_id),
    );
    if (lessonIds.some((id) => !written.has(id))) redirect(withParam(back, "erreur=redaction"));
  }

  const lessonStatus = status === "published" ? "published" : "draft";
  if (lessonIds.length) {
    const { error } = await supabase
      .from("lessons")
      .update({ status: lessonStatus, ...(status === "published" ? { published_at: new Date().toISOString() } : {}) })
      .eq("chapter_id", chapterId)
      .neq("status", lessonStatus);
    if (error) redirect(withParam(back, "erreur=statut"));
  }
  const { error } = await supabase.from("chapters").update({ status }).eq("id", chapterId);
  if (error) redirect(withParam(back, "erreur=statut"));
  await logAdmin({ draft: "chapitre en brouillon", review: "chapitre en relecture", published: "chapitre publié" }[status], "chapter", chapterId);
  updateTag("catalog");
  redirect(withParam(back, `statut=${status}`));
}

/** Nouvelle leçon en brouillon à la fin du chapitre, puis ouverture de l'éditeur. */
export async function addLessonAction(chapterId: string, formData: FormData) {
  await requireRole("admin");
  const back = chapterPath(chapterId);
  const title = text(formData, "title", 120);
  const minutes = intField(formData, "minutes", 1, 240) ?? 10;
  if (title.length < 3) redirect(withParam(back, "erreur=lecon"));
  if (!isSupabaseConfigured()) demoOnly(back);

  const supabase = await createSupabaseServerClient();
  const { data: siblings } = await supabase.from("lessons").select("number, slug").eq("chapter_id", chapterId);
  const number = Math.max(0, ...(siblings ?? []).map((l) => l.number)) + 1;
  const { data, error } = await supabase
    .from("lessons")
    .insert({
      chapter_id: chapterId,
      number,
      slug: uniqueSlug(title, (siblings ?? []).map((l) => l.slug)),
      title,
      estimated_minutes: minutes,
      status: "draft",
    })
    .select("id")
    .single();
  if (error || !data) redirect(withParam(back, "erreur=lecon"));
  await logAdmin(`leçon créée : ${title}`, "lesson", data.id);
  redirect(`/admin/contenus/lecons/${data.id}?nouvelle=1`);
}

/** Supprime un chapitre non publié qu'aucun élève n'a commencé (création par erreur). */
export async function deleteChapterAction(chapterId: string) {
  await requireRole("admin");
  const back = chapterPath(chapterId);
  if (!isSupabaseConfigured()) demoOnly(back);

  const supabase = await createSupabaseServerClient();
  const { data: chapter } = await supabase
    .from("chapters")
    .select("status, title, lessons(id), programs!inner(levels!inner(code))")
    .eq("id", chapterId)
    .maybeSingle();
  if (!chapter || chapter.status === "published") redirect(withParam(back, "erreur=suppression"));
  const lessonIds = chapter.lessons.map((l) => l.id);
  if (lessonIds.length) {
    const { count } = await supabase.from("lesson_progress").select("lesson_id", { count: "exact", head: true }).in("lesson_id", lessonIds);
    if (count !== 0) redirect(withParam(back, "erreur=suppression"));
  }
  const { error } = await supabase.from("chapters").delete().eq("id", chapterId);
  if (error) redirect(withParam(back, "erreur=suppression"));
  await logAdmin(`chapitre supprimé : ${chapter.title}`, "chapter", chapterId);
  redirect(`/admin/contenus?classe=${chapter.programs.levels.code}&supprime=1`);
}
