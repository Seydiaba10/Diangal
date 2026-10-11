// Catalogue fictif de 3e (phases 1-2). Titres, ordre des chapitres et coefficients sont
// indicatifs : le programme réel sera saisi par l'admin et validé par des enseignants.

import { slugify } from "@/lib/slug";
import type { Chapter, Lesson, LessonResource, Subject, SubjectCode } from "@/types/domain";

export const SUBJECTS_3E: Subject[] = [
  { code: "MATH", slug: "mathematiques", name: "Mathématiques", coefficient: 4 },
  { code: "FR", slug: "francais", name: "Français", coefficient: 4 },
  { code: "ANG", slug: "anglais", name: "Anglais", coefficient: 2 },
  { code: "HG", slug: "histoire-geographie", name: "Histoire-Géographie", coefficient: 2 },
  { code: "SVT", slug: "svt", name: "SVT", coefficient: 2 },
  { code: "PC", slug: "sciences-physiques", name: "Sciences physiques", coefficient: 2 },
  { code: "EC", slug: "education-civique", name: "Éducation civique", coefficient: 1 },
];

type LessonSpec = string | { title: string; premium?: boolean; minutes?: number; resources?: LessonResource[] };

interface ChapterSpec {
  title: string;
  summary: string;
  lessons?: LessonSpec[];
}

// Structure par défaut d'un chapitre dont les leçons ne sont pas encore rédigées.
const DEFAULT_LESSONS: LessonSpec[] = ["Découvrir la notion", "L’essentiel à retenir", "Méthodes et exemples", "Je m’entraîne"];

const PDF_SUMMARY: LessonResource = { kind: "pdf", title: "Fiche résumé", sizeBytes: 240_000 };

const SPECS: Record<SubjectCode, ChapterSpec[]> = {
  MATH: [
    { title: "Racine carrée", summary: "Définition, propriétés et calculs avec les racines carrées." },
    { title: "Calcul littéral et identités remarquables", summary: "Développer, factoriser et utiliser les identités remarquables." },
    { title: "Relations trigonométriques", summary: "Cosinus, sinus et tangente d’un angle aigu dans le triangle rectangle." },
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
    { title: "Équations et inéquations du premier degré", summary: "Résoudre des équations et des inéquations à une inconnue." },
    { title: "Systèmes de deux équations", summary: "Résoudre un système par substitution, par combinaison ou graphiquement." },
    { title: "Applications affines", summary: "Représenter et utiliser une application affine." },
    { title: "Statistiques", summary: "Effectifs, fréquences, moyenne et représentations graphiques." },
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
    { title: "La Seconde Guerre mondiale", summary: "Causes, déroulement et conséquences du conflit." },
    { title: "La guerre froide", summary: "Deux blocs face à face de 1947 à 1991." },
    { title: "L’Organisation des Nations unies", summary: "Création, organes et missions de l’ONU." },
    {
      title: "La décolonisation en Afrique",
      summary: "Les étapes de l’accès des pays africains à l’indépendance.",
      lessons: [
        "Les causes de la décolonisation",
        "Les formes de la décolonisation",
        "La décolonisation en Afrique du Nord",
        "La décolonisation en Afrique centrale",
        "Les indépendances en Afrique de l’Ouest",
      ],
    },
    { title: "Le Sénégal depuis l’indépendance", summary: "Les grandes étapes politiques du Sénégal." },
    { title: "La population du Sénégal", summary: "Répartition, croissance et mobilités." },
    { title: "Les ressources du Sénégal", summary: "Agriculture, pêche, mines et énergie." },
    { title: "L’Afrique dans le monde", summary: "Échanges, intégration régionale et défis." },
  ],
  SVT: [
    { title: "La nutrition", summary: "Aliments, digestion et absorption." },
    { title: "La respiration", summary: "Échanges gazeux et respiration cellulaire." },
    { title: "L’immunité de l’organisme", summary: "Comment le corps se défend contre les microbes." },
    { title: "La reproduction humaine", summary: "Appareils reproducteurs, fécondation et grossesse." },
    { title: "L’hérédité", summary: "Chromosomes, gènes et transmission des caractères." },
    { title: "Le système nerveux", summary: "Réflexes et actes volontaires." },
    { title: "L’environnement", summary: "Écosystèmes et action de l’homme." },
    { title: "La géologie du Sénégal", summary: "Roches, sols et paysages." },
  ],
  PC: [
    { title: "Les lentilles", summary: "Lentilles convergentes et divergentes, images." },
    { title: "La dispersion de la lumière", summary: "Le prisme et les couleurs de la lumière blanche." },
    {
      title: "Électrolyse et synthèse de l’eau",
      summary: "Décomposer l’eau et la reformer à partir de ses éléments.",
      lessons: [
        "L’électrolyse de l’eau",
        { title: "Bilan de l’électrolyse", premium: true },
        { title: "La synthèse de l’eau", premium: true },
        { title: "Exercices de synthèse", premium: true },
      ],
    },
    { title: "Les hydrocarbures", summary: "Alcanes et combustions." },
    { title: "Les forces", summary: "Caractéristiques et représentation d’une force." },
    { title: "Travail et puissance", summary: "Travail d’une force et puissance mécanique." },
    { title: "L’énergie électrique", summary: "Puissance et énergie électriques." },
    { title: "Les solutions acides et basiques", summary: "pH et réactions acido-basiques." },
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

function buildLessons(chapterId: string, specs: LessonSpec[]): Lesson[] {
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
  SPECS[subject.code].map((spec, index) => {
    const slug = slugify(spec.title);
    const id = `${subject.code.toLowerCase()}-${slug}`;
    return {
      id,
      slug,
      number: index + 1,
      title: spec.title,
      summary: spec.summary,
      subjectCode: subject.code,
      lessons: buildLessons(id, spec.lessons ?? DEFAULT_LESSONS),
    };
  }),
);

// Progression d'Awa : nombre de leçons terminées par chapitre (« all » = chapitre terminé).
// 18 chapitres terminés, comme sur le dashboard.
export const LESSONS_DONE_BY_CHAPTER: Record<string, number | "all"> = {
  "math-racine-carree": "all",
  "math-calcul-litteral-et-identites-remarquables": "all",
  "math-relations-trigonometriques": "all",
  "math-theoreme-de-thales": 3,
  "fr-le-recit": "all",
  "fr-la-description": "all",
  "fr-le-discours-rapporte": "all",
  "fr-le-texte-argumentatif": 2,
  "ang-present-simple-and-continuous": "all",
  "ang-daily-life-and-routines": "all",
  "hg-la-seconde-guerre-mondiale": "all",
  "hg-la-guerre-froide": "all",
  "hg-l-organisation-des-nations-unies": "all",
  "hg-la-decolonisation-en-afrique": 4,
  "svt-la-nutrition": "all",
  "svt-la-respiration": "all",
  "svt-l-immunite-de-l-organisme": "all",
  "pc-les-lentilles": "all",
  "pc-la-dispersion-de-la-lumiere": "all",
  "pc-electrolyse-et-synthese-de-l-eau": 1,
  "ec-les-droits-de-l-enfant": "all",
  "ec-la-constitution-du-senegal": "all",
};
