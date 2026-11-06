import "server-only";

// CFEE blanc DIANGAL, mathématiques, contrôle de la compétence (60 min, 60 points). Même forme que les sujets
// officiels : un seul problème, un contexte et une ou deux consignes. Le guide de correction de 2025 compte
// 6 étapes de 10 points (opération convenable 6, résultat juste 4). Ici, l'élève résout le problème sur sa
// feuille, puis entre le résultat de chaque étape : seul le résultat peut être vérifié. Situations de DIANGAL.

import type { MockExamSpec } from "../../exercise-series";
import { head, reading } from "./helpers";

const POINTS = 10;
const NOTE = "Résous le problème sur ta feuille en posant toutes tes opérations. Écris ensuite ici le résultat de chaque étape, sans l’unité. À l’examen, chaque étape vaut 6 points pour l’opération et 4 points pour le résultat : un résultat sans opération posée est noté zéro.";

interface Step {
  chapter: string;
  num: string;
  answer: number;
  why: string;
}

const spec = (n: number, context: string[], consignes: string[], steps: Step[]): MockExamSpec => {
  const stem = `${head("Contrôle de la compétence", 60)}${reading(
    `<strong>Contexte.</strong> ${context[0]}`,
    ...context.slice(1),
    `<strong>Consignes.</strong> ${consignes.map((text, i) => `${i + 1}. ${text}`).join(" ")}`,
    NOTE,
  )}`;
  return {
    id: `cfee-blanc-${n}-4-maths-competence`,
    subject: "MATH",
    title: `CFEE blanc DIANGAL n°${n} : mathématiques (compétence)`,
    durationMin: 60,
    parts: steps.map((step, i) => ({
      chapter: step.chapter,
      stem,
      questions: [{ num: `Étape ${i + 1} : ${step.num}`, answer: step.answer, why: step.why, pts: POINTS }],
    })),
  };
};

export const MATHS_COMPETENCE: MockExamSpec[] = [
  spec(
    1,
    [
      "L’école de Ndoffane veut entourer son jardin d’un grillage. Ce jardin est un rectangle de 45 m de long et 28 m de large. On laissera un passage de 3 m pour le portail. Le mètre de grillage coûte 850 F.",
      "L’association des parents d’élèves paie les 2/5 de la dépense. Le reste est partagé à parts égales entre les 6 classes de l’école.",
    ],
    ["Calcule le prix du grillage.", "Calcule la somme versée par chaque classe."],
    [
      { chapter: "Longueurs et périmètres", num: "quel est le périmètre du jardin, en m ?", answer: 146, why: "Périmètre = (longueur + largeur) × 2 : 45 + 28 = 73, puis 73 × 2 = 146 m." },
      { chapter: "Longueurs et périmètres", num: "quelle longueur de grillage faut-il acheter, en m ?", answer: 143, why: "Le passage du portail n’a pas de grillage : 146 − 3 = 143 m." },
      { chapter: "Les quatre opérations sur les grands nombres", num: "quel est le prix du grillage, en francs ?", answer: 121550, why: "Prix = longueur × prix du mètre : 143 × 850 = 121 550 F." },
      { chapter: "Opérations sur les fractions", num: "combien paie l’association des parents d’élèves, en francs ?", answer: 48620, why: "Elle paie les 2/5 : on divise par 5, puis on multiplie par 2 : 121 550 ÷ 5 × 2 = 48 620 F." },
      { chapter: "Les quatre opérations sur les grands nombres", num: "quelle somme reste à payer, en francs ?", answer: 72930, why: "Reste = dépense − part de l’association : 121 550 − 48 620 = 72 930 F." },
      { chapter: "Partages et moyenne", num: "combien verse chaque classe, en francs ?", answer: 12155, why: "Partage égal entre les 6 classes : 72 930 ÷ 6 = 12 155 F." },
    ],
  ),
  spec(
    2,
    [
      "Une école de Tambacounda construit une nouvelle salle de classe de 9 m de long et 7 m de large. Le sol sera couvert de carreaux carrés de 50 cm de côté, vendus 1 250 F l’un. La peinture coûte 54 000 F et la main-d’œuvre 90 000 F.",
      "La mairie donne 350 000 F. Le reste est payé par les 218 élèves de l’école, qui versent tous la même somme.",
    ],
    ["Calcule la dépense totale.", "Calcule la somme versée par chaque élève."],
    [
      { chapter: "Les aires", num: "quelle est l’aire du sol de la salle, en m² ?", answer: 63, why: "Le sol est un rectangle : 9 × 7 = 63 m²." },
      { chapter: "Opérations sur les nombres décimaux", num: "combien de carreaux faut-il pour couvrir le sol ?", answer: 252, why: "Un carreau a 0,5 m de côté : 0,5 × 0,5 = 0,25 m². Nombre de carreaux : 63 ÷ 0,25 = 252." },
      { chapter: "Les quatre opérations sur les grands nombres", num: "quel est le prix des carreaux, en francs ?", answer: 315000, why: "Prix = nombre de carreaux × prix d’un carreau : 252 × 1 250 = 315 000 F." },
      { chapter: "Prix, budget et pourcentages", num: "quelle est la dépense totale, en francs ?", answer: 459000, why: "On additionne les carreaux, la peinture et la main-d’œuvre : 315 000 + 54 000 + 90 000 = 459 000 F." },
      { chapter: "Prix, budget et pourcentages", num: "quelle somme reste à payer après le don de la mairie, en francs ?", answer: 109000, why: "Reste = dépense − don : 459 000 − 350 000 = 109 000 F." },
      { chapter: "Partages et moyenne", num: "combien verse chaque élève, en francs ?", answer: 500, why: "Partage égal entre les 218 élèves : 109 000 ÷ 218 = 500 F." },
    ],
  ),
  spec(
    3,
    [
      "Mame Diarra cultive de l’arachide près de Kaffrine, dans un champ en forme de trapèze. Ses deux côtés parallèles mesurent 120 m et 80 m, et sa hauteur 30 m. Ce champ produit 15 kg d’arachide par are.",
      "Elle garde 1/5 de sa récolte pour les semences et vend le reste 325 F le kg. Elle a dépensé 18 500 F pour le labour, 22 000 F pour l’engrais et 9 500 F pour le transport.",
    ],
    ["Calcule la masse d’arachide vendue.", "Calcule le bénéfice de Mame Diarra."],
    [
      { chapter: "Les aires", num: "quelle est l’aire du champ, en m² ?", answer: 3000, why: "Aire du trapèze = (grande base + petite base) × hauteur ÷ 2 : 120 + 80 = 200, puis 200 × 30 ÷ 2 = 3 000 m²." },
      { chapter: "Les aires", num: "quelle est l’aire du champ, en ares ?", answer: 30, why: "1 are vaut 100 m² : 3 000 ÷ 100 = 30 ares." },
      { chapter: "Capacités, masses et angles", num: "quelle est la masse de la récolte, en kg ?", answer: 450, why: "15 kg par are sur 30 ares : 30 × 15 = 450 kg." },
      { chapter: "Opérations sur les fractions", num: "quelle masse d’arachide vend-elle, en kg ?", answer: 360, why: "Elle garde 1/5 de la récolte : 450 ÷ 5 = 90 kg. Elle vend le reste : 450 − 90 = 360 kg." },
      { chapter: "Les quatre opérations sur les grands nombres", num: "combien reçoit-elle pour cette vente, en francs ?", answer: 117000, why: "Recette = masse × prix du kilogramme : 360 × 325 = 117 000 F." },
      { chapter: "Prix, budget et pourcentages", num: "quel est son bénéfice, en francs ?", answer: 67000, why: "Dépenses : 18 500 + 22 000 + 9 500 = 50 000 F. Bénéfice = recette − dépenses : 117 000 − 50 000 = 67 000 F." },
    ],
  ),
  spec(
    4,
    [
      "Un groupement de 25 femmes de Thiès gère un réservoir en forme de pavé droit : 4 m de long, 2,5 m de large et 1,5 m de haut. L’eau est vendue en bidons de 20 ℓ, à 25 F le bidon. Le réservoir est rempli et entièrement vendu 12 fois par mois.",
      "Chaque mois, le groupement paie 65 000 F de gasoil, 40 000 F pour le gardien et 20 000 F d’entretien. Le bénéfice est partagé à parts égales entre les femmes.",
    ],
    ["Calcule le bénéfice du mois.", "Calcule la part de chaque femme."],
    [
      { chapter: "Les volumes", num: "quel est le volume du réservoir, en m³ ?", answer: 15, why: "Volume = longueur × largeur × hauteur : 4 × 2,5 × 1,5 = 15 m³." },
      { chapter: "Les volumes", num: "combien de litres d’eau contient-il ?", answer: 15000, why: "1 m³ contient 1 000 ℓ : 15 × 1 000 = 15 000 ℓ." },
      { chapter: "Les quatre opérations sur les grands nombres", num: "combien de bidons remplit-on avec un réservoir ?", answer: 750, why: "Nombre de bidons = capacité ÷ contenance d’un bidon : 15 000 ÷ 20 = 750 bidons." },
      { chapter: "Les quatre opérations sur les grands nombres", num: "quelle est la recette du mois, en francs ?", answer: 225000, why: "Un réservoir rapporte 750 × 25 = 18 750 F. En un mois : 18 750 × 12 = 225 000 F." },
      { chapter: "Prix, budget et pourcentages", num: "quel est le bénéfice du mois, en francs ?", answer: 100000, why: "Dépenses : 65 000 + 40 000 + 20 000 = 125 000 F. Bénéfice = recette − dépenses : 225 000 − 125 000 = 100 000 F." },
      { chapter: "Partages et moyenne", num: "quelle est la part de chaque femme, en francs ?", answer: 4000, why: "Partage égal entre les 25 femmes : 100 000 ÷ 25 = 4 000 F." },
    ],
  ),
];
