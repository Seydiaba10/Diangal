import "server-only";

// CFEE blanc DIANGAL : éducation artistique (45 min, 10 points) et épreuve facultative (60 min, 10 points : en
// arabe pour l'option français, en français pour l'option franco-arabe). Éducation artistique : même forme que
// les sujets officiels de 2024 à 2026 (reproduire ou dessiner, puis colorier) et grille du guide de correction de
// 2025, découpée en paliers : conformité 5, soin 3, harmonie 2. Arabe : même forme que le sujet de 2025.
// Aucun sujet officiel n'a été trouvé pour l'épreuve facultative de français : elle reste une proposition de DIANGAL.

import type { ExerciseSpec, MockExamSpec } from "../../exercise-series";
import { schemaFig } from "../../illustrated-questions";
import { arabic, head, reading } from "./helpers";

interface Artwork {
  technique: string;
  context: string;
  instruction: string;
  /** Dessin à reproduire, s'il y en a un. */
  figure?: string;
  /** Ce qu'on doit reconnaître dans le dessin. */
  parts: string;
  /** Le sujet du dessin, pour la première question : « ta mangue ». */
  thing: string;
}

const art = (n: number, w: Artwork): MockExamSpec => {
  const step = (self: string, pts: number, why: string): ExerciseSpec => ({ self, pts, why: `<p>${why}</p>` });
  const conform = `Regarde ${w.parts}, avec les bonnes formes et les bonnes proportions.`;
  const clean = "Une imperfection, c’est une tache, un trait qui dépasse ou une couleur qui déborde.";
  const colors = "Les couleurs sont bien choisies, bien placées et posées de façon régulière.";
  return {
    id: `cfee-blanc-${n}-7-education-artistique`,
    subject: "ART",
    title: `CFEE blanc DIANGAL n°${n} : éducation artistique (${w.technique})`,
    durationMin: 45,
    parts: [
      {
        stem: `${head("Contrôle de la compétence", 10, "Fais ton dessin sur une feuille, avec tes crayons de couleur, puis évalue-le. Si tu le peux, montre-le à un adulte.")}${reading(
          `<strong>Contexte.</strong> ${w.context}`,
          `<strong>Consigne.</strong> ${w.instruction}`,
        )}${w.figure ?? ""}`,
        questions: [
          step(`Conformité (2 points) : ${w.thing} a-t-elle au plus 3 erreurs de forme ou de proportion ?`, 2, conform),
          step("Conformité (2 points) : a-t-elle une erreur au plus ?", 2, conform),
          step("Conformité (1 point) : est-elle sans aucune erreur ?", 1, conform),
          step("Soin (1 point) : ton coloriage a-t-il 4 imperfections au plus ?", 1, clean),
          step("Soin (1 point) : a-t-il 2 imperfections au plus ?", 1, clean),
          step("Soin (1 point) : est-il sans aucune imperfection ?", 1, clean),
          step("Harmonie (1 point) : au moins les deux tiers de ton dessin sont-ils coloriés harmonieusement ?", 1, colors),
          step("Harmonie (1 point) : tout ton dessin est-il colorié harmonieusement ?", 1, colors),
        ],
      },
    ],
  };
};

export const EDUCATION_ARTISTIQUE: MockExamSpec[] = [
  art(1, {
    technique: "reproduire un dessin",
    context: "Le dessin ci-dessous t’est proposé.",
    instruction: "Reproduis ce dessin, puis colorie-le.",
    figure: schemaFig("cfee-dessin-mangue", "Dessin à reproduire : une mangue qui pend à une branche, avec deux feuilles."),
    parts: "si on reconnaît la branche, les deux feuilles, la tige et le fruit",
    thing: "ta mangue",
  }),
  art(2, {
    technique: "reproduire un dessin",
    context: "Le dessin ci-dessous t’est proposé.",
    instruction: "Reproduis ce dessin, puis colorie-le.",
    figure: schemaFig("cfee-dessin-pirogue", "Dessin à reproduire : une pirogue à voile sur les vagues."),
    parts: "si on reconnaît la coque, sa bande décorée, le mât, la voile et les vagues",
    thing: "ta pirogue",
  }),
  art(3, {
    technique: "dessiner un outil",
    context: "Ta classe prépare une exposition sur le travail des champs.",
    instruction: "Dessine une daba, l’outil du cultivateur, puis colorie-la.",
    parts: "si on reconnaît bien la daba, avec son manche et sa lame",
    thing: "ta daba",
  }),
  art(4, {
    technique: "dessiner une maison",
    context: "Ta classe prépare une exposition sur les maisons de nos villages.",
    instruction: "Dessine une case traditionnelle, puis colorie-la.",
    parts: "si on reconnaît bien la case, avec ses murs, son toit de paille et sa porte",
    thing: "ta case",
  }),
];

const facultative = (n: number, language: "arabe" | "français", parts: MockExamSpec["parts"]): MockExamSpec => ({
  id: `cfee-blanc-${n}-8-facultative-${language === "arabe" ? "arabe" : "francais"}`,
  subject: language === "arabe" ? "AR" : "FR",
  title: language === "arabe" ? `CFEE blanc DIANGAL n°${n} : épreuve optionnelle d’arabe` : `CFEE blanc DIANGAL n°${n} : épreuve facultative de français (option franco-arabe)`,
  durationMin: 60,
  parts,
});

const lire = (html: string) => `${head("Épreuve facultative", 10)}${html}`;
const texteArabe = (context: string, text: string) =>
  `${head("Épreuve optionnelle d’arabe", 10)}${reading(`<strong>Contexte.</strong> ${context}`, "<strong>Consigne.</strong> Lis le texte, puis réponds aux questions suivantes.")}<p dir="rtl" lang="ar">${text}</p>`;

const OMAR = texteArabe(
  "Omar raconte sa matinée à l’école.",
  "ذَهَبَ عُمَرُ إِلَى المَدْرَسَةِ فِي الصَّبَاحِ. سَلَّمَ عَلَى مُعَلِّمِهِ وَجَلَسَ فِي الفَصْلِ. قَرَأَ التَّلَامِيذُ الدَّرْسَ وَكَتَبُوا فِي دَفَاتِرِهِمْ. بَعْدَ الدَّرْسِ لَعِبَ عُمَرُ مَعَ أَصْدِقَائِهِ فِي السَّاحَةِ.",
);
const FATIMA = texteArabe(
  "Fatima aide sa mère à chercher de l’eau au puits.",
  "فِي قَرْيَتِنَا بِئْرٌ كَبِيرَةٌ. تَذْهَبُ فَاطِمَةُ إِلَى البِئْرِ مَعَ أُمِّهَا كُلَّ يَوْمٍ. تَحْمِلُ المَاءَ إِلَى البَيْتِ. المَاءُ مُهِمٌّ لِلنَّاسِ وَالحَيَوَانَاتِ وَالأَشْجَارِ.",
);

const choices = (good: string, ...others: string[]) => [`*${arabic(good)}`, ...others.map(arabic)];

const LETTRE = lire(
  reading(
    "Lis ce texte, puis réponds aux questions.",
    "Mon grand frère Cheikh travaille à Dakar. Chaque mois, il envoie un peu d’argent à la famille et une longue lettre pour moi. Il me demande toujours si je travaille bien à l’école. Pour lui répondre, j’essaie d’écrire sans faute. Quand il rentrera pour les vacances, je lui montrerai mon livret.",
  ),
);
const LOUMA = lire(
  reading(
    "Lis ce texte, puis réponds aux questions.",
    "Chaque semaine, le village s’anime pour le louma, le grand marché. Les commerçants arrivent très tôt avec leurs charrettes. Mariama accompagne sa mère, qui vend de l’huile de palme. Elle aide à rendre la monnaie, car elle est forte en calcul. Le soir, toutes les deux rentrent fatiguées mais heureuses.",
  ),
);

export const FACULTATIVES: MockExamSpec[] = [
  facultative(1, "arabe", [
    {
      stem: OMAR,
      questions: [
        { qcm: `Je choisis un titre pour le texte. ${arabic("أَخْتَارُ عُنْوَانًا مُنَاسِبًا لِلنَّصِّ.")}`, choices: choices("عُمَرُ فِي المَدْرَسَةِ", "عُمَرُ فِي السُّوقِ", "عُمَرُ فِي البَيْتِ"), why: "Le texte raconte la matinée d’Omar à l’école : le titre qui convient est « Omar à l’école »." },
        { qcm: arabic("أَيْنَ ذَهَبَ عُمَرُ فِي الصَّبَاحِ؟"), choices: choices("إِلَى المَدْرَسَةِ", "إِلَى السُّوقِ", "إِلَى البَيْتِ"), why: "Le texte dit qu’Omar est allé à l’école (المدرسة) le matin." },
        { qcm: arabic("عَلَى مَنْ سَلَّمَ عُمَرُ؟"), choices: choices("عَلَى مُعَلِّمِهِ", "عَلَى أُمِّهِ", "عَلَى أَخِيهِ"), why: "Le texte dit qu’Omar a salué son maître (معلمه)." },
        { qcm: arabic("مَا جَمْعُ كَلِمَةِ «كِتَابٌ»؟"), choices: choices("كُتُبٌ", "كِتَابَانِ", "كَاتِبٌ"), why: "Le pluriel de « livre » (كتاب) est كتب. كتابان veut dire « deux livres » et كاتب « écrivain »." },
        { qcm: `Je conjugue le verbe au présent. ${arabic("أَنْتَ … (ذَهَبَ)")}`, choices: choices("تَذْهَبُ", "يَذْهَبُ", "أَذْهَبُ"), why: "Avec « أنت » (tu, au masculin), le présent du verbe ذهب est تذهب." },
      ],
    },
  ]),
  facultative(2, "arabe", [
    {
      stem: FATIMA,
      questions: [
        { qcm: `Je choisis un titre pour le texte. ${arabic("أَخْتَارُ عُنْوَانًا مُنَاسِبًا لِلنَّصِّ.")}`, choices: choices("فَاطِمَةُ وَالبِئْرُ", "فَاطِمَةُ فِي السُّوقِ", "فَاطِمَةُ فِي المَدْرَسَةِ"), why: "Le texte parle de Fatima qui va au puits : le titre qui convient est « Fatima et le puits »." },
        { qcm: arabic("مَعَ مَنْ تَذْهَبُ فَاطِمَةُ إِلَى البِئْرِ؟"), choices: choices("مَعَ أُمِّهَا", "مَعَ أَبِيهَا", "مَعَ مُعَلِّمَتِهَا"), why: "Le texte dit que Fatima va au puits avec sa mère (أمها)." },
        { qcm: arabic("مَاذَا تَحْمِلُ فَاطِمَةُ إِلَى البَيْتِ؟"), choices: choices("المَاءَ", "الكِتَابَ", "الخُبْزَ"), why: "Elle porte de l’eau (الماء) à la maison." },
        { qcm: arabic("مَا ضِدُّ كَلِمَةِ «كَبِيرَةٌ»؟"), choices: choices("صَغِيرَةٌ", "جَمِيلَةٌ", "بَعِيدَةٌ"), why: "Le contraire de « grande » (كبيرة) est « petite » (صغيرة)." },
        { qcm: `Je conjugue le verbe au présent. ${arabic("نَحْنُ … (حَمَلَ)")}`, choices: choices("نَحْمِلُ", "يَحْمِلُ", "تَحْمِلُ"), why: "Avec « نحن » (nous), le présent du verbe حمل est نحمل." },
      ],
    },
  ]),
  facultative(1, "français", [
    {
      chapter: "Lire et comprendre un texte",
      stem: LETTRE,
      questions: [
        { qcm: "Où Cheikh travaille-t-il ?", choices: ["*À Dakar", "À Thiès", "À Saint-Louis", "À l’étranger"], why: "Le texte le dit dès le début : « Mon grand frère Cheikh travaille à Dakar. »" },
        { qcm: "Que demande toujours Cheikh dans ses lettres ?", choices: ["*Si le narrateur travaille bien à l’école", "Combien coûte le riz", "Quand les vacances commencent", "Où se trouve le livret"], why: "« Il me demande toujours si je travaille bien à l’école. »" },
      ],
    },
    {
      chapter: "Le futur et le conditionnel",
      stem: LETTRE,
      questions: [{ qcm: "Dans « il rentrera », le verbe est au :", choices: ["*futur simple", "présent", "imparfait", "passé simple"], why: "Les vacances sont à venir : « rentrera » est au futur simple." }],
    },
    {
      chapter: "Les accords",
      stem: LETTRE,
      questions: [{ qcm: "Quel est le pluriel de « une longue lettre » ?", choices: ["*de longues lettres", "de longue lettres", "de longues lettre", "de longs lettres"], why: "Le nom et l’adjectif sont au féminin pluriel : de longues lettres." }],
    },
    {
      chapter: "Les homophones grammaticaux",
      stem: LETTRE,
      questions: [{ qcm: "Complète : Cheikh ___ envoyé une lettre ___ sa famille.", choices: ["*a … à", "à … a", "a … a", "à … à"], why: "Le premier mot est le verbe avoir (on peut dire « avait envoyé ») ; le second est une préposition (on ne peut pas dire « avait »)." }],
    },
  ]),
  facultative(2, "français", [
    {
      chapter: "Lire et comprendre un texte",
      stem: LOUMA,
      questions: [
        { qcm: "Qu’est-ce que le louma ?", choices: ["*Le grand marché", "Une charrette", "Une école", "Une sorte d’huile"], why: "Le texte l’explique : « le louma, le grand marché »." },
        { qcm: "Pourquoi Mariama aide-t-elle à rendre la monnaie ?", choices: ["*Elle est forte en calcul.", "Sa mère est absente.", "Elle veut acheter une charrette.", "Elle n’aime pas l’huile."], why: "« Elle aide à rendre la monnaie, car elle est forte en calcul. »" },
      ],
    },
    {
      chapter: "Déterminants et pronoms",
      stem: LOUMA,
      questions: [{ qcm: "Dans « Mariama accompagne sa mère, qui vend de l’huile », le mot « qui » remplace :", choices: ["*sa mère", "Mariama", "l’huile", "le marché"], why: "Le pronom relatif « qui » reprend le nom placé juste avant : c’est sa mère qui vend l’huile." }],
    },
    {
      chapter: "Les accords",
      stem: LOUMA,
      questions: [{ qcm: "Pourquoi écrit-on « fatiguées » avec -ées dans « toutes les deux rentrent fatiguées » ?", choices: ["*Il s’accorde avec Mariama et sa mère : féminin pluriel.", "Parce que c’est un verbe à l’infinitif.", "Parce que le mot est masculin.", "Parce qu’il est toujours écrit ainsi."], why: "« Fatiguées » se rapporte à deux personnes de sexe féminin : on écrit -e pour le féminin et -s pour le pluriel." }],
    },
    {
      chapter: "Le futur et le conditionnel",
      stem: LOUMA,
      questions: [{ qcm: "Au futur simple, « elle (vendre) » donne :", choices: ["*elle vendra", "elle vendait", "elle vend", "elle vendrait"], why: "Au futur : vendr- + -a. « Elle vendrait » est au conditionnel." }],
    },
  ]),
];
