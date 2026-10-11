// Évaluations fictives de 3e. Les corrigés (bonnes réponses) sont dans answer-keys-3e.ts,
// importé uniquement côté serveur : rien ici ne permet de deviner la réponse.

import type { Assessment, PlayerQuestion } from "@/types/domain";

export interface MockQuestion extends PlayerQuestion {
  /** Corrigé détaillé, révélé seulement après la soumission. */
  explanationHtml: string;
}

const frac = (num: string, den: string) => `<span class="frac"><span>${num}</span><span>${den}</span></span>`;

const trueFalse = (id: string) => [
  { id: `${id}-vrai`, labelHtml: "Vrai" },
  { id: `${id}-faux`, labelHtml: "Faux" },
];

const options = (id: string, labels: string[]) =>
  labels.map((labelHtml, index) => ({ id: `${id}-${String.fromCharCode(97 + index)}`, labelHtml }));

const QUESTION_LIST: MockQuestion[] = [
  // ── Thalès (contrôle) ──
  {
    id: "thales-q1",
    type: "single_choice",
    points: 3,
    promptHtml: "<p>Dans un triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC). Quelle égalité est vraie ?</p>",
    options: options("thales-q1", [
      `${frac("AM", "AB")} = ${frac("AN", "AC")} = ${frac("MN", "BC")}`,
      `${frac("AM", "MB")} = ${frac("MN", "BC")}`,
      `${frac("AB", "AM")} = ${frac("AC", "NC")}`,
      `${frac("AM", "AC")} = ${frac("AN", "AB")}`,
    ]),
    explanationHtml: `<p>Le théorème de Thalès compare les côtés du petit triangle AMN à ceux du grand triangle ABC, dans le même ordre : ${frac("AM", "AB")} = ${frac("AN", "AC")} = ${frac("MN", "BC")}.</p>`,
  },
  {
    id: "thales-q2",
    type: "numeric",
    points: 4,
    promptHtml: "<p>Avec (MN) // (BC), AM = 3 cm, AB = 5 cm et AC = 10 cm. Calcule AN (en cm).</p>",
    options: [],
    explanationHtml: `<p>${frac("AM", "AB")} = ${frac("AN", "AC")} donc AN = ${frac("AM × AC", "AB")} = ${frac("3 × 10", "5")} = <strong>6 cm</strong>.</p>`,
  },
  {
    id: "thales-q3",
    type: "numeric",
    points: 4,
    promptHtml: "<p>Dans la même figure, BC = 7,5 cm. Calcule MN (en cm).</p>",
    options: [],
    explanationHtml: `<p>${frac("MN", "BC")} = ${frac("AM", "AB")} donc MN = ${frac("7,5 × 3", "5")} = <strong>4,5 cm</strong>.</p>`,
  },
  {
    id: "thales-q4",
    type: "true_false",
    points: 3,
    promptHtml: `<p>Si A, M, B et A, N, C sont alignés dans le même ordre et ${frac("AM", "AB")} = ${frac("AN", "AC")}, alors (MN) // (BC).</p>`,
    options: trueFalse("thales-q4"),
    explanationHtml: "<p><strong>Vrai</strong> : c’est la réciproque du théorème de Thalès.</p>",
  },
  {
    id: "thales-q5",
    type: "multiple_choice",
    points: 3,
    promptHtml: "<p>Dans quelles situations peut-on appliquer le théorème de Thalès ? (plusieurs réponses)</p>",
    options: options("thales-q5", [
      "Deux droites sécantes coupées par deux droites parallèles",
      "N’importe quel triangle rectangle",
      "Une configuration « papillon » avec (MN) // (BC)",
      "Deux droites perpendiculaires",
    ]),
    explanationHtml: "<p>Il faut deux droites sécantes et deux droites parallèles : c’est le cas du triangle et du papillon. Le triangle rectangle relève de Pythagore ou de la trigonométrie.</p>",
  },
  {
    id: "thales-q6",
    type: "short_text",
    points: 3,
    promptHtml: "<p>Quel théorème permet de démontrer que deux droites sont parallèles à partir de rapports égaux ?</p>",
    options: [],
    explanationHtml: "<p>C’est la <strong>réciproque du théorème de Thalès</strong>.</p>",
  },

  // ── Thalès (exercices) ──
  {
    id: "thales-e1",
    type: "numeric",
    points: 5,
    promptHtml: "<p>(MN) // (BC), AM = 2, AB = 8 et AN = 3. Calcule AC.</p>",
    options: [],
    explanationHtml: `<p>AC = ${frac("AN × AB", "AM")} = ${frac("3 × 8", "2")} = <strong>12</strong>.</p>`,
  },
  {
    id: "thales-e2",
    type: "single_choice",
    points: 5,
    promptHtml: "<p>Dans une configuration papillon où (MN) // (BC), le point A est…</p>",
    options: options("thales-e2", [
      "le point d’intersection des droites (BM) et (CN)",
      "le milieu de [BC]",
      "un point quelconque de (MN)",
      "le sommet de l’angle droit",
    ]),
    explanationHtml: "<p>Dans le papillon, A est le point où se croisent les droites (BM) et (CN).</p>",
  },
  {
    id: "thales-e3",
    type: "true_false",
    points: 5,
    promptHtml: `<p>Points dans le même ordre, ${frac("AM", "AB")} = ${frac("4", "6")} et ${frac("AN", "AC")} = ${frac("6", "9")} : (MN) est parallèle à (BC).</p>`,
    options: trueFalse("thales-e3"),
    explanationHtml: `<p><strong>Vrai</strong> : ${frac("4", "6")} = ${frac("6", "9")} = ${frac("2", "3")}, donc d’après la réciproque, (MN) // (BC).</p>`,
  },
  {
    id: "thales-e4",
    type: "numeric",
    points: 5,
    promptHtml: "<p>(MN) // (BC), AB = 6, AM = 4 et MN = 5. Calcule BC.</p>",
    options: [],
    explanationHtml: `<p>BC = ${frac("MN × AB", "AM")} = ${frac("5 × 6", "4")} = <strong>7,5</strong>.</p>`,
  },

  // ── Trigonométrie ──
  {
    id: "trigo-q1",
    type: "single_choice",
    points: 6,
    promptHtml: "<p>Le triangle ABC est rectangle en A. Que vaut cos B ?</p>",
    options: options("trigo-q1", [frac("AB", "BC"), frac("AC", "BC"), frac("AC", "AB"), frac("BC", "AB")]),
    explanationHtml: `<p>cos B = ${frac("côté adjacent", "hypoténuse")} = ${frac("AB", "BC")}.</p>`,
  },
  {
    id: "trigo-q2",
    type: "numeric",
    points: 7,
    promptHtml: "<p>Pour tout angle aigu x, combien vaut cos²x + sin²x ?</p>",
    options: [],
    explanationHtml: "<p>C’est une relation fondamentale : cos²x + sin²x = <strong>1</strong>.</p>",
  },
  {
    id: "trigo-q3",
    type: "single_choice",
    points: 7,
    promptHtml: "<p>Le triangle ABC est rectangle en A. Que vaut tan B ?</p>",
    options: options("trigo-q3", [frac("AC", "AB"), frac("AB", "AC"), frac("AB", "BC"), frac("BC", "AC")]),
    explanationHtml: `<p>tan B = ${frac("côté opposé", "côté adjacent")} = ${frac("AC", "AB")}.</p>`,
  },

  // ── Électrolyse (premium) ──
  {
    id: "elec-q1",
    type: "single_choice",
    points: 7,
    promptHtml: "<p>Lors de l’électrolyse de l’eau, quel gaz se dégage à la cathode ?</p>",
    options: options("elec-q1", ["Le dihydrogène", "Le dioxygène", "Le dioxyde de carbone", "Le diazote"]),
    explanationHtml: "<p>À la cathode (borne −), il se dégage du <strong>dihydrogène</strong> ; à l’anode, du dioxygène.</p>",
  },
  {
    id: "elec-q2",
    type: "numeric",
    points: 7,
    promptHtml: "<p>On recueille 10 mL de dioxygène. Quel volume de dihydrogène (en mL) obtient-on ?</p>",
    options: [],
    explanationHtml: "<p>Le volume de dihydrogène est le double de celui du dioxygène : <strong>20 mL</strong>.</p>",
  },
  {
    id: "elec-q3",
    type: "true_false",
    points: 6,
    promptHtml: "<p>La synthèse de l’eau est la réaction entre le dihydrogène et le dioxygène.</p>",
    options: trueFalse("elec-q3"),
    explanationHtml: "<p><strong>Vrai</strong> : 2 H₂ + O₂ → 2 H₂O.</p>",
  },

  // ── Texte argumentatif ──
  {
    id: "arg-q1",
    type: "single_choice",
    points: 4,
    promptHtml: "<p>Dans un texte argumentatif, la thèse est…</p>",
    options: options("arg-q1", ["l’opinion défendue par l’auteur", "un exemple", "un connecteur logique", "la conclusion du texte"]),
    explanationHtml: "<p>La thèse est l’<strong>opinion défendue</strong> par l’auteur ; les arguments la soutiennent.</p>",
  },
  {
    id: "arg-q2",
    type: "multiple_choice",
    points: 4,
    promptHtml: "<p>Quels mots sont des connecteurs d’opposition ? (plusieurs réponses)</p>",
    options: options("arg-q2", ["mais", "cependant", "donc", "en effet", "toutefois"]),
    explanationHtml: "<p><strong>Mais, cependant, toutefois</strong> marquent l’opposition. « Donc » marque la conséquence, « en effet » l’explication.</p>",
  },
  {
    id: "arg-q3",
    type: "true_false",
    points: 4,
    promptHtml: "<p>Un exemple sert à illustrer un argument.</p>",
    options: trueFalse("arg-q3"),
    explanationHtml: "<p><strong>Vrai</strong> : l’exemple rend l’argument concret et plus convaincant.</p>",
  },
  {
    id: "arg-q4",
    type: "single_choice",
    points: 4,
    promptHtml: "<p>« En effet » introduit généralement…</p>",
    options: options("arg-q4", ["une explication ou une justification", "une opposition", "une conséquence", "une concession"]),
    explanationHtml: "<p>« En effet » introduit une <strong>explication</strong>.</p>",
  },
  {
    id: "arg-q5",
    type: "short_text",
    points: 4,
    promptHtml: "<p>Comment appelle-t-on la thèse que l’auteur combat ?</p>",
    options: [],
    explanationHtml: "<p>C’est la <strong>thèse réfutée</strong> (ou thèse adverse).</p>",
  },

  // ── Immunité (exercices) ──
  {
    id: "imm-q1",
    type: "single_choice",
    points: 5,
    promptHtml: "<p>Les anticorps sont produits par…</p>",
    options: options("imm-q1", ["les lymphocytes B", "les globules rouges", "les plaquettes", "les neurones"]),
    explanationHtml: "<p>Les <strong>lymphocytes B</strong>, transformés en plasmocytes, produisent les anticorps.</p>",
  },
  {
    id: "imm-q2",
    type: "true_false",
    points: 5,
    promptHtml: "<p>La phagocytose est une réaction immunitaire non spécifique.</p>",
    options: trueFalse("imm-q2"),
    explanationHtml: "<p><strong>Vrai</strong> : les phagocytes ingèrent tout élément étranger, sans le reconnaître précisément.</p>",
  },
  {
    id: "imm-q3",
    type: "single_choice",
    points: 5,
    promptHtml: "<p>La vaccination permet…</p>",
    options: options("imm-q3", [
      "de développer une mémoire immunitaire",
      "de guérir immédiatement une maladie",
      "de remplacer les globules blancs",
      "de détruire les cellules du corps",
    ]),
    explanationHtml: "<p>Le vaccin prépare l’organisme : il crée une <strong>mémoire immunitaire</strong>.</p>",
  },
  {
    id: "imm-q4",
    type: "multiple_choice",
    points: 5,
    promptHtml: "<p>Quelles sont des barrières naturelles de l’organisme ? (plusieurs réponses)</p>",
    options: options("imm-q4", ["la peau", "les muqueuses", "les globules rouges", "les os"]),
    explanationHtml: "<p>La <strong>peau</strong> et les <strong>muqueuses</strong> empêchent les microbes d’entrer.</p>",
  },

  // ── Simple past ──
  {
    id: "past-q1",
    type: "single_choice",
    points: 4,
    promptHtml: "<p>Yesterday, I ___ to school by bus.</p>",
    options: options("past-q1", ["went", "go", "goes", "gone"]),
    explanationHtml: "<p>« Go » est irrégulier : au prétérit, on écrit <strong>went</strong>.</p>",
  },
  {
    id: "past-q2",
    type: "short_text",
    points: 4,
    promptHtml: "<p>Write the simple past of the verb « eat ».</p>",
    options: [],
    explanationHtml: "<p>Eat → <strong>ate</strong> → eaten.</p>",
  },
  {
    id: "past-q3",
    type: "single_choice",
    points: 4,
    promptHtml: "<p>She ___ TV last night.</p>",
    options: options("past-q3", ["watched", "watch", "watches", "watching"]),
    explanationHtml: "<p>Verbe régulier : on ajoute <strong>-ed</strong> → watched.</p>",
  },
  {
    id: "past-q4",
    type: "true_false",
    points: 4,
    promptHtml: "<p>« Did you saw the film? » is correct.</p>",
    options: trueFalse("past-q4"),
    explanationHtml: "<p><strong>Faux</strong> : après « did », le verbe reste à la base verbale → « Did you <strong>see</strong> the film? »</p>",
  },
  {
    id: "past-q5",
    type: "short_text",
    points: 4,
    promptHtml: "<p>Write the simple past of the verb « buy ».</p>",
    options: [],
    explanationHtml: "<p>Buy → <strong>bought</strong> → bought.</p>",
  },
];

export const MOCK_QUESTIONS: Record<string, MockQuestion> = Object.fromEntries(QUESTION_LIST.map((q) => [q.id, q]));

export const ASSESSMENTS_3E: Assessment[] = [
  {
    id: "thales-quiz",
    kind: "quiz",
    title: "Contrôle : théorème de Thalès",
    subjectCode: "MATH",
    chapterId: "math-theoreme-de-thales",
    durationS: 15 * 60,
    isPremium: false,
    questionIds: ["thales-q1", "thales-q2", "thales-q3", "thales-q4", "thales-q5", "thales-q6"],
  },
  {
    id: "thales-exercices",
    kind: "exercise",
    title: "Exercices corrigés : Thalès",
    subjectCode: "MATH",
    chapterId: "math-theoreme-de-thales",
    durationS: null,
    isPremium: false,
    questionIds: ["thales-e1", "thales-e2", "thales-e3", "thales-e4"],
  },
  {
    id: "trigo-quiz",
    kind: "quiz",
    title: "Contrôle : relations trigonométriques",
    subjectCode: "MATH",
    chapterId: "math-relations-trigonometriques",
    durationS: 10 * 60,
    isPremium: false,
    questionIds: ["trigo-q1", "trigo-q2", "trigo-q3"],
  },
  {
    id: "electrolyse-quiz",
    kind: "quiz",
    title: "Contrôle : électrolyse et synthèse de l’eau",
    subjectCode: "PC",
    chapterId: "pc-electrolyse-et-synthese-de-l-eau",
    durationS: 15 * 60,
    isPremium: true,
    questionIds: ["elec-q1", "elec-q2", "elec-q3"],
  },
  {
    id: "argumentatif-quiz",
    kind: "quiz",
    title: "Contrôle : le texte argumentatif",
    subjectCode: "FR",
    chapterId: "fr-le-texte-argumentatif",
    durationS: 15 * 60,
    isPremium: false,
    questionIds: ["arg-q1", "arg-q2", "arg-q3", "arg-q4", "arg-q5"],
  },
  {
    id: "immunite-exercices",
    kind: "exercise",
    title: "Exercices corrigés : l’immunité",
    subjectCode: "SVT",
    chapterId: "svt-l-immunite-de-l-organisme",
    durationS: null,
    isPremium: false,
    questionIds: ["imm-q1", "imm-q2", "imm-q3", "imm-q4"],
  },
  {
    id: "bfem-blanc-maths",
    kind: "mock_exam",
    title: "BFEM blanc : mathématiques",
    subjectCode: "MATH",
    chapterId: null,
    durationS: 2 * 60 * 60,
    isPremium: true,
    questionIds: ["thales-q1", "thales-q2", "thales-q3", "trigo-q1", "trigo-q2", "trigo-q3"],
  },
  {
    id: "past-simple-quiz",
    kind: "quiz",
    title: "Quiz : the simple past",
    subjectCode: "ANG",
    chapterId: "ang-the-simple-past",
    durationS: 10 * 60,
    isPremium: false,
    questionIds: ["past-q1", "past-q2", "past-q3", "past-q4", "past-q5"],
  },
];

/** Meilleures notes /20 déjà obtenues par Awa. */
export const BEST_SCORES: Record<string, number> = {
  "trigo-quiz": 7.5,
  "immunite-exercices": 9,
  "argumentatif-quiz": 10.5,
};
