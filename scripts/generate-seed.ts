// Génère supabase/seed.sql à partir des données de démonstration (src/mocks) :
// la base et les écrans partent ainsi du même contenu. Usage : pnpm db:seed
import { writeFileSync } from "node:fs";
import { CITIES } from "../src/lib/places";
import { CATALOG_ANSWER_KEYS } from "../src/mocks/answer-keys";
import { CATALOG_ASSESSMENTS, CATALOG_QUESTIONS, QUESTION_CHAPTERS } from "../src/mocks/assessments";
import { CATALOG_CHAPTERS, CATALOG_LESSON_BODIES, CATALOG_SUBJECTS, chapterSources } from "../src/mocks/curriculum";
import { EXAM_SESSIONS } from "../src/mocks/exams";
import { genericLessonBody } from "../src/mocks/lesson-content";
import { MOCK_PLANS } from "../src/mocks/plans";

const q = (value: string | null | undefined) => (value == null ? "null" : `'${value.replace(/'/g, "''")}'`);
const html = (value: string) => `$html$${value.trim()}$html$`;
const textArray = (values: string[]) => `array[${values.map(q).join(", ")}]::text[]`;

const out: string[] = [
  "-- Généré par scripts/generate-seed.ts : ne pas modifier à la main.",
  "-- Contenu publié : CI et CP (Curriculum de l'Éducation de Base, étape 1), CE1 et CE2 (étape 2), CM1, CM2, 6e, 5e, 4e, 3e, 2nde (séries S et L), 1re et Terminale (séries S1, S2, L1, L2). Leçons et exercices à faire valider par des enseignants.",
  "",
];

// ── Référentiels ─────────────────────────────────────────────────────────────
const REGIONS = [
  "Dakar", "Diourbel", "Fatick", "Kaffrine", "Kaolack", "Kédougou", "Kolda",
  "Louga", "Matam", "Saint-Louis", "Sédhiou", "Tambacounda", "Thiès", "Ziguinchor",
];
out.push(`insert into public.regions (id, name) values\n${REGIONS.map((r, i) => `  (${i + 1}, ${q(r)})`).join(",\n")};`);

out.push(
  `insert into public.cities (region_id, name, slug) values\n${CITIES.map(
    ({ name, slug, region }) => `  ((select id from public.regions where name = ${q(region)}), ${q(name)}, ${q(slug)})`,
  ).join(",\n")};`,
);

const NEIGHBORHOODS: [string, string[]][] = [
  ["dakar", ["Plateau", "Médina", "Sacré-Cœur", "Mermoz", "Ouakam", "Parcelles Assainies", "Grand Yoff", "Yoff", "Almadies"]],
  ["thies", ["Randoulène", "Médina Fall"]],
  ["saint-louis", ["Sor"]],
  ["ziguinchor", ["Boucotte"]],
  ["kaolack", ["Médina Baye"]],
];
out.push(
  `insert into public.neighborhoods (city_id, name) values\n${NEIGHBORHOODS.flatMap(([city, names]) =>
    names.map((n) => `  ((select id from public.cities where slug = ${q(city)}), ${q(n)})`),
  ).join(",\n")};`,
);

const LEVELS: [string, string, string, string | null][] = [
  ["CI", "CI", "elementaire", null], ["CP", "CP", "elementaire", null], ["CE1", "CE1", "elementaire", null],
  ["CE2", "CE2", "elementaire", null], ["CM1", "CM1", "elementaire", null], ["CM2", "CM2", "elementaire", "CFEE"],
  ["6E", "6e", "moyen", null], ["5E", "5e", "moyen", null], ["4E", "4e", "moyen", null], ["3E", "3e", "moyen", "BFEM"],
  ["2NDE", "2nde", "secondaire", null], ["1RE", "1re", "secondaire", null], ["TLE", "Terminale", "secondaire", "BAC"],
];
out.push(
  `insert into public.levels (id, code, name, cycle, sort_order, exam_type) values\n${LEVELS.map(
    ([code, name, cycle, exam], i) => `  (${i + 1}, ${q(code)}, ${q(name)}, ${q(cycle)}, ${i + 1}, ${exam ? q(exam) : "null"})`,
  ).join(",\n")};`,
);

const SERIES: [string, string][] = [
  ["L", "Littéraire (2nde)"], ["S", "Scientifique (2nde)"], ["L1", "L1"], ["L2", "L2"], ["LA", "LA"],
  ["S1", "S1"], ["S2", "S2"], ["S3", "S3"], ["S4", "S4"], ["S5", "S5"], ["G", "G"], ["T1", "T1"], ["T2", "T2"],
];
out.push(`insert into public.series (code, name) values\n${SERIES.map(([c, n]) => `  (${q(c)}, ${q(n)})`).join(",\n")};`);
out.push(
  `insert into public.level_series (level_id, series_id)\nselect l.id, s.id from public.levels l join public.series s on\n` +
    `  (l.code = '2NDE' and s.code in ('L', 'S')) or (l.code in ('1RE', 'TLE') and s.code not in ('L', 'S'));`,
);

const SUBJECTS: [string, string, string, string, string][] = [
  ["MATH", "mathematiques", "Mathématiques", "subject-math", "calculator"],
  ["FR", "francais", "Français", "subject-fr", "pen-line"],
  ["ANG", "anglais", "Anglais", "subject-ang", "languages"],
  ["HG", "histoire-geographie", "Histoire-Géographie", "subject-hg", "earth"],
  ["SVT", "svt", "SVT", "subject-svt", "leaf"],
  ["PC", "sciences-physiques", "Sciences physiques", "subject-pc", "atom"],
  ["EC", "education-civique", "Éducation civique", "subject-ec", "landmark"],
  ["LV2", "lv2", "Langue vivante 2", "subject-lv2", "message-circle"],
  ["PHILO", "philosophie", "Philosophie", "subject-philo", "brain"],
  ["EPS", "eps", "EPS", "subject-eps", "dumbbell"],
  ["ESVS", "esvs", "Science et vie sociale", "subject-esvs", "compass"],
];
out.push(
  `insert into public.subjects (code, slug, name, color_token, icon) values\n${SUBJECTS.map(
    (s) => `  (${s.map(q).join(", ")})`,
  ).join(",\n")};`,
);

// ── Programmes publiés : matières, chapitres, leçons ────────────────────────
// Ordre des matières : celui du catalogue, classe par classe (une matière par série au lycée).
const sortOrder = (levelCode: string, slug: string) =>
  CATALOG_SUBJECTS.filter((s) => s.levelCode === levelCode).findIndex((s) => s.slug === slug) + 1;
const seriesRef = (seriesCode: string | null | undefined) =>
  seriesCode ? `(select id from public.series where code = ${q(seriesCode)})` : "null";
out.push(
  `insert into public.programs (level_id, series_id, subject_id, coefficient, sort_order) values\n${CATALOG_SUBJECTS.map(
    (s) =>
      `  ((select id from public.levels where code = ${q(s.levelCode)}), ${seriesRef(s.seriesCode)}, (select id from public.subjects where code = ${q(s.code)}), ${s.coefficient}, ${sortOrder(s.levelCode, s.slug)})`,
  ).join(",\n")};`,
);

const programOf = (code: string, levelCode: string, seriesCode?: string | null) =>
  `(select p.id from public.programs p join public.subjects s on s.id = p.subject_id join public.levels l on l.id = p.level_id where s.code = ${q(code)} and l.code = ${q(levelCode)} and ${
    seriesCode ? `p.series_id = ${seriesRef(seriesCode)}` : "p.series_id is null"
  })`;
const chapterRef = (chapterId: string) => {
  const c = CATALOG_CHAPTERS.find((x) => x.id === chapterId)!;
  return `(select c.id from public.chapters c where c.program_id = ${programOf(c.subjectCode, c.levelCode, c.seriesCode)} and c.slug = ${q(c.slug)})`;
};

for (const chapter of CATALOG_CHAPTERS) {
  out.push(
    `insert into public.chapters (program_id, number, slug, title, summary, sort_order, status, strand, sources) values ` +
      `(${programOf(chapter.subjectCode, chapter.levelCode, chapter.seriesCode)}, ${chapter.number}, ${q(chapter.slug)}, ${q(chapter.title)}, ${q(chapter.summary)}, ${chapter.number}, 'published', ` +
      `${chapter.strand ? q(chapter.strand) : "null"}, ${q(JSON.stringify(chapterSources(chapter)))}::jsonb);`,
  );
  for (const lesson of chapter.lessons) {
    const lessonRef = `(select id from public.lessons where chapter_id = ${chapterRef(chapter.id)} and slug = ${q(lesson.slug)})`;
    out.push(
      `insert into public.lessons (chapter_id, number, slug, title, is_premium, status, estimated_minutes, published_at) values ` +
        `(${chapterRef(chapter.id)}, ${lesson.number}, ${q(lesson.slug)}, ${q(lesson.title)}, ${lesson.isPremium}, 'published', ${lesson.estimatedMinutes}, now());`,
      `insert into public.lesson_bodies (lesson_id, body_html) values (${lessonRef}, ${html(
        CATALOG_LESSON_BODIES[lesson.id] ?? genericLessonBody(lesson.title, chapter.title),
      )});`,
    );
  }
}

// ── Évaluations, questions, corrigés ────────────────────────────────────────
for (const question of Object.values(CATALOG_QUESTIONS)) {
  const assessment = CATALOG_ASSESSMENTS.find((a) => a.questionIds.includes(question.id))!;
  const chapterId = QUESTION_CHAPTERS[question.id];
  out.push(
    `insert into public.questions (slug, subject_id, chapter_id, type, prompt_html, explanation_html, points) values (` +
      `${q(question.id)}, (select id from public.subjects where code = ${q(assessment.subjectCode)}), ` +
      `${chapterId ? chapterRef(chapterId) : "null"}, ${q(question.type)}, ${html(question.promptHtml)}, ` +
      `${html(question.explanationHtml)}, ${question.points});`,
  );
  question.options.forEach((option, i) => {
    out.push(
      `insert into public.question_options (question_id, slug, label_html, sort_order) values (` +
        `(select id from public.questions where slug = ${q(question.id)}), ${q(option.id)}, ${html(option.labelHtml)}, ${i});`,
    );
  });
  const key = CATALOG_ANSWER_KEYS[question.id] ?? {};
  out.push(
    `insert into private.answer_keys (question_id, correct_option_ids, accepted_texts, numeric_value, expected_answer) values (` +
      `(select id from public.questions where slug = ${q(question.id)}), ` +
      `array(select o.id from public.question_options o join public.questions qq on qq.id = o.question_id ` +
      `where qq.slug = ${q(question.id)} and o.slug = any (${textArray(key.correctOptionIds ?? [])})), ` +
      `${textArray(key.acceptedTexts ?? [])}, ${key.numericValue ?? "null"}, ${q(key.expectedAnswer ?? null)});`,
  );
}

for (const a of CATALOG_ASSESSMENTS) {
  out.push(
    `insert into public.assessments (slug, kind, title, level_id, series_id, subject_id, chapter_id, exam_type, duration_s, is_premium, status, verification, sources, correction_source) values (` +
      `${q(a.id)}, ${q(a.kind)}, ${q(a.title)}, (select id from public.levels where code = ${q(a.levelCode)}), ${seriesRef(a.seriesCode)}, ` +
      `(select id from public.subjects where code = ${q(a.subjectCode)}), ${a.chapterId ? chapterRef(a.chapterId) : "null"}, ` +
      `${a.kind === "mock_exam" ? "'BFEM'" : "null"}, ${a.durationS ?? "null"}, ${a.isPremium}, 'published', ` +
      `${q(a.verification ?? "unverified")}, ${q(JSON.stringify(a.sources ?? []))}::jsonb, ${q(a.correctionSource ?? null)});`,
  );
  a.questionIds.forEach((qid, i) => {
    out.push(
      `insert into public.assessment_questions (assessment_id, question_id, sort_order) values (` +
        `(select id from public.assessments where slug = ${q(a.id)}), (select id from public.questions where slug = ${q(qid)}), ${i});`,
    );
  });
}

// ── Examens, offres, réglages ───────────────────────────────────────────────
out.push(
  `insert into public.exam_sessions (id, exam_type, year, starts_on, is_official) values\n${EXAM_SESSIONS.map(
    (s) => `  (${q(s.id)}, ${q(s.type)}, ${s.year}, ${q(s.startsOn)}, ${s.isOfficial})`,
  ).join(",\n")};`,
);
const PLAN_NAMES: Record<string, string> = { monthly: "1 mois", quarterly: "3 mois", yearly: "1 an", bfem_pass: "Pass BFEM" };
out.push(
  `insert into public.plans (code, name, price_fcfa, duration_days, sort_order) values\n${MOCK_PLANS.filter((p) => !p.maxChildren).map(
    (p, i) => `  (${q(p.code)}, ${q(PLAN_NAMES[p.code] ?? p.code)}, ${p.priceFcfa}, ${p.durationDays}, ${i + 1})`,
  ).join(",\n")};`,
);
out.push(`insert into public.platform_settings (key, value) values ('commission_rate', '0.15'::jsonb);`);
// Formules Famille (créées inactives par la migration) : ouvertes dans la démo et les tests.
out.push(`update public.plans set is_active = true where max_children is not null;`);
// Offre gratuite appliquée dans la démo et les tests (les accès Premium des mocks suivent déjà la règle).
out.push(`update public.platform_settings set value = '{"enabled": true}'::jsonb where key = 'free_tier';`);

writeFileSync("supabase/seed.sql", `${out.join("\n")}\n`);
console.log(`supabase/seed.sql : ${out.length} instructions`);
