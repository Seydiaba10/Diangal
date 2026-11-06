import "server-only";

// CFEE blanc DIANGAL, langue et communication, contrôle de la compétence (60 min, 60 points). Même forme que les
// sujets officiels de 2023 à 2026 : un contexte, une consigne, 6 ou 8 phrases au moins. L'élève écrit sur sa
// feuille, compare avec le modèle, puis s'évalue avec la grille du guide de correction de 2025 : pertinence 35,
// cohérence 12, correction de la langue 8, présentation 5. Le lecteur ne connaît que « réussi » ou « à revoir » :
// chaque critère est donc découpé en paliers, dont les points s'additionnent.

import type { ExerciseSpec, MockExamSpec } from "../../exercise-series";
import { head, reading } from "./helpers";

interface Writing {
  theme: string;
  /** Type de texte demandé : première ligne de la grille. */
  kind: string;
  /** Nombre de phrases demandé par la consigne. */
  sentences: 6 | 8;
  context: string;
  instruction: string;
  /** Ce qui est attendu pour traiter le sujet. */
  expected: string;
  /** Exemple de texte (original), paragraphe par paragraphe. */
  model: string[];
  /** Organisation attendue, propre au type de texte. */
  plan: string[];
  /** Temps et personnes à employer. */
  verbs: string;
}

const list = (items: string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

const SUBJECT_ONLY = "Compte seulement les phrases qui répondent vraiment à la consigne.";
const LINKS = "Deux phrases sont en lien quand la seconde continue l’idée de la première, sans changer de sujet sans raison.";
const FAULTS = list(["les accords : le nom et l’adjectif, le sujet et le verbe ;", "les homophones : a/à, et/est, son/sont, on/ont ;", "les majuscules, les points et les mots difficiles que tu connais déjà."]);
const FLAWS = "Une imperfection, c’est une rature, une surcharge, un mot difficile à lire ou une mise en page mal faite.";

function criteria(w: Writing): ExerciseSpec[] {
  const half = w.sentences / 2;
  const twoThirds = w.sentences === 8 ? 6 : 4;
  const step = (self: string, pts: number, why: string): ExerciseSpec => ({ self, pts, why: `<p>${why}</p>` });
  return [
    {
      self: `Écris ton texte sur ta feuille, sans regarder la suite. Quand tu as fini, compare-le avec le modèle. Pertinence (10 points) : as-tu bien écrit ${w.kind} ?`,
      pts: 10,
      why: `<p><strong>Ce qui est attendu :</strong> ${w.expected}</p><p><strong>Exemple de texte (ce n’est pas le seul possible) :</strong></p><div class="model-text">${w.model.map((text) => `<p>${text}</p>`).join("")}</div>`,
    },
    step(`Pertinence (9 points) : au moins ${half} phrases de ton texte traitent-elles bien le sujet ?`, 9, SUBJECT_ONLY),
    step(`Pertinence (8 points) : au moins ${twoThirds} phrases traitent-elles bien le sujet ?`, 8, SUBJECT_ONLY),
    step(`Pertinence (8 points) : tout ton texte, ${w.sentences} phrases au moins, traite-t-il bien le sujet ?`, 8, "Si ton texte a moins de phrases que demandé, réponds « Je dois revoir »."),
    { self: "Cohérence (6 points) : au moins la moitié de tes phrases sont-elles en lien ?", pts: 6, why: `<p>${LINKS} Vérifie que tu as bien :</p>${list(w.plan)}` },
    step("Cohérence (3 points) : au moins les deux tiers de tes phrases sont-elles en lien ?", 3, LINKS),
    step("Cohérence (3 points) : toutes tes phrases sont-elles en lien ?", 3, LINKS),
    { self: "Correction de la langue (4 points) : as-tu fait 7 fautes ou moins ?", pts: 4, why: `<p>${w.verbs} Vérifie aussi chaque phrase, en cherchant une seule chose à la fois :</p>${FAULTS}` },
    step("Correction de la langue (2 points) : as-tu fait 4 fautes ou moins ?", 2, "Compte les fautes de grammaire, de conjugaison, d’orthographe et de construction des phrases."),
    step("Correction de la langue (2 points) : ton texte est-il sans aucune faute ?", 2, "Relis une dernière fois, ou demande à un adulte de t’aider à compter."),
    step("Présentation (4 points) : ta copie a-t-elle une imperfection au plus ?", 4, FLAWS),
    step("Présentation (1 point) : ta copie est-elle sans aucune imperfection ?", 1, FLAWS),
  ];
}

const spec = (n: number, w: Writing): MockExamSpec => ({
  id: `cfee-blanc-${n}-2-production-ecrits`,
  subject: "FR",
  title: `CFEE blanc DIANGAL n°${n} : production d’écrits (${w.theme})`,
  durationMin: 60,
  parts: [
    {
      chapter: "Rédiger un texte",
      stem: `${head("Contrôle de la compétence", 60)}${reading(`<strong>Contexte.</strong> ${w.context}`, `<strong>Consigne.</strong> ${w.instruction}`, "Si tu le peux, fais relire ton texte par un adulte pour t’évaluer honnêtement.")}`,
      questions: criteria(w),
    },
  ],
});

export const LANGUE_ECRITS: MockExamSpec[] = [
  spec(1, {
    theme: "une lettre",
    kind: "une lettre",
    sentences: 6,
    context: "Tu as appris que ton ami(e), qui habite à Ziguinchor, ne révise plus pour le CFEE et passe ses soirées à jouer dehors. Tu veux qu’il ou elle change de comportement.",
    instruction: "Écris-lui une lettre de six phrases au moins pour le ou la convaincre de bien préparer son examen. <strong>NB :</strong> sur la lettre, n’écris ni ton prénom, ni ton nom, ni ton adresse, et ne la signe pas.",
    expected: "une vraie lettre à un(e) ami(e), avec une formule pour saluer et une formule pour finir. Elle explique pourquoi il faut réviser et donne au moins un conseil. Comme à l’examen, elle ne porte ni nom ni signature.",
    model: [
      "Cher ami,",
      "J’espère que ta famille et toi allez bien. J’ai appris que tu ne révises plus pour le CFEE, et cela m’inquiète. Cet examen arrive vite et il ouvre les portes du collège. Si tu travailles un peu chaque soir, tu n’auras pas peur le jour des épreuves. Moi, je refais mes exercices après le dîner, puis je relis une leçon. Essaie de faire comme moi, tu verras que ce n’est pas si difficile.",
      "À bientôt, et bon courage !",
    ],
    plan: ["une formule pour saluer (« Cher ami ») ;", "le problème, puis les raisons de réviser, puis un conseil ;", "une formule pour finir (« À bientôt »), sans signature."],
    verbs: "Tu parles de ce qui se passe maintenant : emploie le présent. Pour ce qui arrivera, emploie le futur (« tu n’auras pas peur ») et, pour conseiller, l’impératif (« essaie »).",
  }),
  spec(2, {
    theme: "un récit",
    kind: "un récit",
    sentences: 8,
    context: "Le week-end dernier, les élèves et les jeunes de ton quartier ont organisé une grande journée de nettoyage, un « set-setal ».",
    instruction: "Raconte cette journée en huit phrases au moins : ce que vous avez fait, ce qui s’est passé, et ce que tu as ressenti à la fin.",
    expected: "un récit au passé, qui raconte la journée dans l’ordre, avec au moins un événement précis et ce que tu as ressenti.",
    model: [
      "Samedi dernier, dès huit heures, tous les jeunes du quartier se sont retrouvés devant la mosquée. Le président de l’association a distribué des balais, des pelles et des brouettes. Nous avons formé des équipes, et la mienne a choisi la rue qui mène au marché.",
      "Le travail était dur : les sachets plastiques s’accrochaient partout et les ordures sentaient mauvais. Soudain, Awa a trouvé un petit chat coincé sous un tas de cartons. Nous l’avons libéré, et tout le monde a applaudi.",
      "À midi, la rue était méconnaissable. Les mamans nous ont apporté du bissap bien frais. Fatigué mais content, j’ai regardé notre quartier tout propre et je me suis dit que chacun doit le garder ainsi.",
    ],
    plan: ["un début qui dit quand, où et qui (la situation) ;", "un milieu qui raconte le travail et un événement précis ;", "une fin qui dit comment la journée s’est terminée et ce que tu as ressenti."],
    verbs: "Le récit se passe avant aujourd’hui : emploie le passé composé pour les actions (« nous avons formé ») et l’imparfait pour décrire (« le travail était dur »).",
  }),
  spec(3, {
    theme: "une description",
    kind: "une description",
    sentences: 8,
    context: "Un correspondant qui vit à l’étranger ne connaît pas le Sénégal. Il te demande à quoi ressemble un marché de chez toi.",
    instruction: "Décris-lui en huit phrases au moins un marché que tu connais, un jour de grande affluence : les lieux, les personnes, les bruits et les odeurs.",
    expected: "une description qui aide quelqu’un à imaginer le marché : le lieu, les gens, ce qu’on voit, ce qu’on entend et ce qu’on sent.",
    model: [
      "Le grand marché est le cœur de notre ville, Ziguinchor. Dès le matin, ses petites allées sont pleines de monde. Sous les toits de tôle, les étals débordent de mangues jaunes, de tomates bien rouges et de poissons brillants.",
      "Les vendeuses, assises derrière leurs bassines, appellent les clientes d’une voix forte. Les charretiers crient pour qu’on leur laisse le passage, et une radio joue du mbalax à côté du marchand de tissus.",
      "L’odeur du poisson fumé se mêle à celle des épices et du café Touba. Il fait chaud, on se bouscule un peu, mais tout le monde se salue. J’aime ce marché, car on y trouve de tout, et surtout de la bonne humeur.",
    ],
    plan: ["une phrase qui présente le lieu ;", "des phrases qui décrivent dans l’ordre : ce qu’on voit, puis ce qu’on entend, puis ce qu’on sent ;", "une phrase de fin qui donne ton avis."],
    verbs: "Une description peut s’écrire au présent, car le marché existe encore aujourd’hui (« les vendeuses appellent »). Garde le même temps du début à la fin.",
  }),
  spec(4, {
    theme: "un dialogue",
    kind: "un dialogue",
    sentences: 8,
    context: "Dans ton quartier, les parents d’Aïssatou, une élève de CM2, veulent qu’elle quitte l’école pour aider à la maison. Elle est très triste. Tu vas voir son père pour le faire changer d’avis.",
    instruction: "Rédige la discussion entre le père d’Aïssatou et toi, en huit phrases au moins.",
    expected: "un vrai dialogue, avec un tiret à chaque changement de personne. Tu restes poli(e) et tu donnes au moins deux raisons de laisser Aïssatou à l’école.",
    model: [
      "– Bonjour, monsieur. Aïssatou est très triste, car elle va quitter l’école.",
      "– Bonjour, mon enfant. Sa mère a besoin d’aide à la maison.",
      "– Je comprends, mais Aïssatou peut aider après la classe.",
      "– Et à quoi lui servira l’école ?",
      "– Elle pourra devenir infirmière ou maîtresse, et vous aider encore mieux plus tard.",
      "– C’est vrai que madame Sarr, la sage-femme, est très respectée.",
      "– Alors, laissez-la passer son CFEE, s’il vous plaît.",
      "– D’accord, je vais en parler à sa mère. Merci pour ta visite.",
    ],
    plan: ["un tiret chaque fois qu’une autre personne parle ;", "une formule de politesse au début ;", "chaque réponse qui suit bien ce que l’autre vient de dire, jusqu’à une fin claire."],
    verbs: "Dans un dialogue, les personnes parlent au présent. Emploie le futur pour ce qui arrivera (« elle pourra ») et l’impératif poli pour demander (« laissez-la »).",
  }),
];
