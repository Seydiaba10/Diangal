// Catalogue de démonstration de 3e (phases 1-2). Maths, sciences physiques, SVT et
// histoire-géographie suivent les chapitres de 3e relevés en octobre 2026 (voir
// docs/programme/releve-ci-3e.md) ; français, anglais et éducation civique, l'ordre des
// chapitres et les coefficients restent indicatifs. Le programme réel sera saisi par
// l'admin et validé par des enseignants.

import { programSlug, slugify } from "@/lib/slug";
import type { Chapter, Lesson, LessonResource, Subject, SubjectCode } from "@/types/domain";

const LEVEL = "3E";

export const SUBJECTS_3E: Subject[] = (
  [
    ["MATH", "mathematiques", "Mathématiques", 4],
    ["FR", "francais", "Français", 4],
    ["ANG", "anglais", "Anglais", 2],
    ["HG", "histoire-geographie", "Histoire-Géographie", 2],
    ["SVT", "svt", "SVT", 2],
    ["PC", "sciences-physiques", "Sciences physiques", 2],
    ["EC", "education-civique", "Éducation civique", 1],
  ] as const
).map(([code, slug, name, coefficient]) => ({ code, slug: programSlug(slug, LEVEL), name, coefficient, levelCode: LEVEL }));

export type LessonSpec = string | { title: string; premium?: boolean; minutes?: number; resources?: LessonResource[] };

export interface ChapterSpec {
  title: string;
  summary: string;
  lessons?: LessonSpec[];
}

// Structure par défaut d'un chapitre dont les leçons ne sont pas encore rédigées.
const DEFAULT_LESSONS: LessonSpec[] = ["Découvrir la notion", "L’essentiel à retenir", "Méthodes et exemples", "Je m’entraîne"];

const PDF_SUMMARY: LessonResource = { kind: "pdf", title: "Fiche résumé", sizeBytes: 240_000 };

const SPECS: Partial<Record<SubjectCode, ChapterSpec[]>> = {
  MATH: [
    { title: "Racine carrée", summary: "Définition, propriétés et calculs avec les racines carrées." },
    { title: "Calcul algébrique", summary: "Développer, factoriser et utiliser les identités remarquables." },
    {
      title: "Équations et inéquations à une inconnue",
      summary: "Résoudre des équations et des inéquations du premier degré à une inconnue.",
    },
    {
      title: "Équations et inéquations à deux inconnues",
      summary: "Systèmes d’équations et d’inéquations du premier degré à deux inconnues.",
    },
    { title: "Applications affines", summary: "Représenter et utiliser une application affine, y compris par intervalles." },
    { title: "Statistique", summary: "Effectifs, fréquences, moyenne et représentations graphiques." },
    {
      title: "Théorème de Thalès",
      summary: "Calculer des longueurs et démontrer que deux droites sont parallèles.",
      lessons: [
        { title: "La configuration de Thalès", minutes: 8 },
        {
          title: "L’énoncé du théorème",
          minutes: 10,
          resources: [
            PDF_SUMMARY,
            { kind: "audio", title: "Explication audio", sizeBytes: 1_400_000, durationS: 180 },
            { kind: "video", title: "Vidéo : le théorème en 4 minutes", sizeBytes: 3_100_000, durationS: 240 },
          ],
        },
        { title: "Calculer une longueur", minutes: 12, resources: [PDF_SUMMARY] },
        { title: "La réciproque du théorème de Thalès", minutes: 10 },
        { title: "Configuration papillon et problèmes", minutes: 15 },
      ],
    },
    { title: "Relations trigonométriques", summary: "Cosinus, sinus et tangente d’un angle aigu dans le triangle rectangle." },
    { title: "Vecteurs", summary: "Égalité et somme de vecteurs, relation de Chasles." },
    { title: "Repérage dans le plan", summary: "Coordonnées d’un vecteur, distance, milieu et équation d’une droite." },
    { title: "Angle inscrit et angle au centre", summary: "Propriétés des angles inscrits dans un cercle." },
    { title: "Géométrie dans l’espace", summary: "Pyramides et cônes : sections, agrandissement et réduction." },
  ],
  FR: [
    { title: "Le récit", summary: "Narrateur, point de vue et organisation du récit." },
    { title: "La description", summary: "Décrire un lieu, un personnage, une scène." },
    { title: "Le discours rapporté", summary: "Discours direct, indirect et indirect libre." },
    { title: "Le texte argumentatif", summary: "Thèse, arguments, exemples et connecteurs logiques." },
    { title: "La lettre", summary: "Rédiger une lettre personnelle ou officielle." },
    { title: "La poésie", summary: "Versification, images et figures de style." },
    { title: "Le théâtre", summary: "Dialogue, didascalies et genres théâtraux." },
    { title: "Le résumé de texte", summary: "Réduire un texte en respectant sa logique." },
  ],
  ANG: [
    { title: "Present simple and continuous", summary: "Talk about habits and actions in progress." },
    { title: "Daily life and routines", summary: "Vocabulary and expressions for everyday life." },
    {
      title: "The simple past",
      summary: "Talk about finished actions in the past.",
      lessons: ["Regular and irregular verbs", "Questions and negative forms", "Telling a story in the past"],
    },
    { title: "The present perfect", summary: "Experiences and recent past." },
    { title: "Comparatives and superlatives", summary: "Compare people, places and things." },
    { title: "Modal verbs", summary: "Can, must, should, may." },
    { title: "The future", summary: "Will, going to and the present continuous." },
    { title: "Reading comprehension", summary: "Strategies to understand a text." },
  ],
  HG: [
    {
      title: "La révolution industrielle et ses conséquences",
      summary: "Découvertes scientifiques, capitalisme, mutations sociales et doctrines sociales.",
    },
    {
      title: "L’impérialisme européen et le partage de l’Afrique",
      summary: "Missions et explorations, congrès de Berlin, systèmes coloniaux français et britannique.",
    },
    { title: "Les résistances africaines", summary: "Formes, exemples et bilan des résistances à la conquête coloniale." },
    { title: "L’impérialisme en Asie et en Amérique", summary: "Impérialismes européen et japonais en Asie, impérialisme américain." },
    { title: "La Première Guerre mondiale", summary: "Causes, déroulement et conséquences du conflit." },
    { title: "La révolution russe", summary: "De la révolution de 1917 à la consolidation du régime soviétique." },
    { title: "La crise des années 1930", summary: "Le krach de 1929 et ses conséquences dans le monde." },
    { title: "La Seconde Guerre mondiale", summary: "Causes, déroulement et conséquences du conflit." },
    { title: "Les révolutions chinoises", summary: "De Sun Yat-sen à Mao Zedong." },
    {
      title: "Les relations Est-Ouest de 1945 aux années 1990",
      summary: "Guerre froide, coexistence pacifique et fin des blocs.",
    },
    {
      title: "La décolonisation en Afrique",
      summary: "Causes et formes de l’accès des pays africains à l’indépendance.",
      lessons: [
        "Les causes de la décolonisation",
        "Les formes de la décolonisation",
        "La décolonisation en Afrique du Nord",
        "La décolonisation en Afrique centrale",
        "Les indépendances en Afrique de l’Ouest",
      ],
    },
    { title: "Bandung et l’émergence du Tiers-monde", summary: "La conférence de 1955 et l’affirmation des pays non alignés." },
    { title: "Le Sénégal de 1944 à 1962", summary: "Vie politique, marche vers l’indépendance et premières années de la République." },
    { title: "La Terre, un village planétaire", summary: "Moyens et problèmes de communication dans le monde." },
    {
      title: "Les systèmes économiques et les inégalités de développement",
      summary: "Économies libérales et socialistes, pays riches et pays pauvres.",
    },
    { title: "La coopération internationale", summary: "Coopération bilatérale et multilatérale, aide au développement." },
    {
      title: "Ressources, environnement et climat",
      summary: "Potentiel et équilibres, surexploitation des ressources et changement climatique.",
    },
  ],
  SVT: [
    { title: "Le système nerveux", summary: "Organisation et fonctionnement : réflexes et actes volontaires." },
    { title: "La vision", summary: "L’œil, la formation des images et les défauts de la vision." },
    { title: "La respiration", summary: "Échanges gazeux et phénomènes énergétiques de la respiration." },
    { title: "La fermentation", summary: "Un autre moyen pour les cellules de se procurer de l’énergie." },
    { title: "Le rein et l’excrétion urinaire", summary: "Formation de l’urine et régulation du milieu intérieur." },
    { title: "L’immunité de l’organisme", summary: "Le système immunitaire, la réponse immunitaire et les groupes sanguins." },
    { title: "Le VIH/sida et l’aide à l’immunité", summary: "Les défaillances du système immunitaire, vaccins et sérums." },
    { title: "La tectonique des plaques", summary: "Les plaques lithosphériques et leurs mouvements." },
    { title: "Les roches métamorphiques", summary: "Formation et caractères des roches métamorphiques." },
    {
      title: "Le cycle des roches et la chronologie en géologie",
      summary: "Transformation des roches et datation des événements géologiques.",
    },
  ],
  PC: [
    { title: "Les lentilles minces", summary: "Lentilles convergentes et divergentes, formation des images." },
    { title: "La dispersion de la lumière blanche", summary: "Le prisme et les couleurs de la lumière blanche." },
    { title: "Les forces", summary: "Caractéristiques et représentation d’une force, le poids." },
    { title: "L’équilibre d’un solide soumis à deux forces", summary: "Conditions d’équilibre et applications." },
    { title: "Le principe des actions réciproques", summary: "Les interactions entre deux corps." },
    { title: "Travail et puissance mécaniques", summary: "Travail d’une force et puissance mécanique." },
    { title: "L’électrisation par frottement", summary: "Les charges électriques et leurs interactions." },
    { title: "Le courant électrique", summary: "Sens, intensité et mesure du courant." },
    {
      title: "La résistance électrique et la loi d’Ohm",
      summary: "Conducteurs ohmiques, loi d’Ohm et associations de résistances.",
    },
    { title: "Énergie et rendement", summary: "Transformations d’énergie et rendement d’un appareil." },
    { title: "La calorimétrie", summary: "Quantité de chaleur et équilibre thermique." },
    { title: "Les solutions aqueuses", summary: "Solvant, soluté, concentration et dilution." },
    {
      title: "Solutions acides et solutions basiques",
      summary: "pH, indicateurs colorés et dilution.",
      lessons: [
        "Le pH d’une solution aqueuse",
        { title: "Les indicateurs colorés", premium: true },
        { title: "Diluer une solution acide ou basique", premium: true },
        { title: "Exercices de synthèse", premium: true },
      ],
    },
    { title: "Les métaux", summary: "Action de l’air, combustion et action des acides dilués sur les métaux usuels." },
    { title: "Les hydrocarbures", summary: "Alcanes, combustions et usages." },
  ],
  EC: [
    { title: "Les droits de l’enfant", summary: "La Convention relative aux droits de l’enfant." },
    { title: "La Constitution du Sénégal", summary: "Le texte fondamental de la République." },
    { title: "Les institutions de la République", summary: "Pouvoirs exécutif, législatif et judiciaire." },
    { title: "La citoyenneté", summary: "Droits et devoirs du citoyen." },
    { title: "La démocratie et les élections", summary: "Le vote et la vie démocratique." },
    { title: "La paix et la sécurité", summary: "Prévenir les conflits." },
    { title: "Le développement durable", summary: "Protéger l’environnement." },
    { title: "La santé publique", summary: "Hygiène et prévention." },
  ],
  LV2: [],
  PHILO: [],
  EPS: [],
};

export function buildLessons(chapterId: string, specs: LessonSpec[]): Lesson[] {
  return specs.map((spec, index) => {
    const s = typeof spec === "string" ? { title: spec } : spec;
    const slug = slugify(s.title);
    return {
      id: `${chapterId}--${slug}`,
      slug,
      number: index + 1,
      title: s.title,
      estimatedMinutes: s.minutes ?? 10,
      isPremium: s.premium ?? false,
      resources: s.resources ?? [],
    };
  });
}

export const CHAPTERS_3E: Chapter[] = SUBJECTS_3E.flatMap((subject) =>
  (SPECS[subject.code] ?? []).map((spec, index) => {
    const slug = slugify(spec.title);
    const id = `${subject.code.toLowerCase()}-${slug}`;
    return {
      id,
      slug,
      number: index + 1,
      title: spec.title,
      summary: spec.summary,
      subjectCode: subject.code,
      levelCode: LEVEL,
      lessons: buildLessons(id, spec.lessons ?? DEFAULT_LESSONS),
    };
  }),
);

// Progression d'Awa : nombre de leçons terminées par chapitre (« all » = chapitre terminé).
// 18 chapitres terminés, comme sur le dashboard.
export const LESSONS_DONE_BY_CHAPTER: Record<string, number | "all"> = {
  "math-racine-carree": "all",
  "math-calcul-algebrique": "all",
  "math-relations-trigonometriques": "all",
  "math-theoreme-de-thales": 3,
  "fr-le-recit": "all",
  "fr-la-description": "all",
  "fr-le-discours-rapporte": "all",
  "fr-le-texte-argumentatif": 2,
  "ang-present-simple-and-continuous": "all",
  "ang-daily-life-and-routines": "all",
  "hg-la-revolution-industrielle-et-ses-consequences": "all",
  "hg-l-imperialisme-europeen-et-le-partage-de-l-afrique": "all",
  "hg-la-seconde-guerre-mondiale": "all",
  "hg-la-decolonisation-en-afrique": 4,
  "svt-le-systeme-nerveux": "all",
  "svt-la-respiration": "all",
  "svt-l-immunite-de-l-organisme": "all",
  "pc-les-lentilles-minces": "all",
  "pc-la-dispersion-de-la-lumiere-blanche": "all",
  "pc-solutions-acides-et-solutions-basiques": 1,
  "ec-les-droits-de-l-enfant": "all",
  "ec-la-constitution-du-senegal": "all",
};
