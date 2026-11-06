import "server-only";

// CFEE blanc DIANGAL, mathématiques, contrôle des ressources (45 min, 40 points). Même forme que les sujets
// officiels de 2023 à 2026 : 5 exercices de 8, 8, 12, 8 et 4 points, soit numération 16, mesure 12, géométrie 8
// et résolution de problèmes 4. Énoncés et nombres propres à DIANGAL.

import type { ExerciseSpec, MockExamSpec } from "../../exercise-series";
import { schemaFig } from "../../illustrated-questions";
import { head, reading } from "./helpers";

const POSE = "Pose les opérations sur ta feuille : à l’examen, un résultat sans l’opération posée est noté zéro. Écris ici seulement le nombre demandé, sans l’unité.";

const ex = (n: number, points: number, note = POSE) => head(`Exercice ${n}`, points, note);
const EX4 = ex(4, 8, "");

const spec = (n: number, parts: MockExamSpec["parts"]): MockExamSpec => ({
  id: `cfee-blanc-${n}-3-maths-ressources`,
  subject: "MATH",
  title: `CFEE blanc DIANGAL n°${n} : mathématiques (ressources)`,
  durationMin: 45,
  parts,
});

/** Construction à faire sur la feuille, comparée à la figure du corrigé : 5 points, comme dans les sujets officiels. */
const build = (self: string, checks: string, figure: string): ExerciseSpec => ({
  self: `a) Sur ta feuille, construis avec ta règle et ton équerre ${self} Compare ensuite avec le corrigé.`,
  pts: 5,
  why: `<p>${checks}</p>${figure}<p>Compte ta réponse comme réussie si ta figure a les bonnes mesures et si tes traits sont nets.</p>`,
});

export const MATHS_RESSOURCES: MockExamSpec[] = [
  spec(1, [
    {
      chapter: "Pourcentages, échelles et proportionnalité",
      stem: `${ex(1, 8)}${reading("Awa veut acheter une robe dont le prix marqué est 8 400 F. La vendeuse lui fait une remise de 25 %.")}`,
      questions: [
        { num: "a) Quel est le montant de la remise, en francs ?", pts: 4, answer: 2100, why: "Remise = prix × taux ÷ 100 : 8 400 × 25 ÷ 100 = 2 100 F." },
        { num: "b) Combien Awa va-t-elle payer, en francs ?", pts: 4, answer: 6300, why: "Somme à payer = prix − remise : 8 400 − 2 100 = 6 300 F." },
      ],
    },
    {
      chapter: "Opérations sur les fractions",
      stem: ex(2, 8, "Effectue ces opérations sur ta feuille, puis choisis le bon résultat."),
      questions: [
        { qcm: "a) Calcule : 3/4 + 2/5.", pts: 4, choices: ["*23/20", "5/9", "5/20", "6/20"], why: "On met au même dénominateur : 3/4 = 15/20 et 2/5 = 8/20. On additionne ensuite les numérateurs : 15/20 + 8/20 = 23/20." },
        { qcm: "b) Calcule : 7/10 − 3/10.", pts: 4, choices: ["*4/10", "4/20", "10/10", "4/100"], why: "Les dénominateurs sont déjà égaux : on soustrait seulement les numérateurs. On obtient 4/10, c’est-à-dire 2/5." },
      ],
    },
    {
      chapter: "Les aires",
      stem: ex(3, 12),
      questions: [{ num: "a) Complète : 5 a + 18 ca = … m².", pts: 4, answer: 518, why: "5 a = 500 m² et 18 ca = 18 m². Ensuite, 500 + 18 = 518 m²." }],
    },
    {
      chapter: "Les volumes",
      stem: ex(3, 12),
      questions: [{ num: "b) Complète : 3 m³ + 7 hℓ = … hℓ.", pts: 4, answer: 37, why: "1 m³ vaut 10 hℓ, donc 3 m³ = 30 hℓ. Ensuite, 30 + 7 = 37 hℓ." }],
    },
    {
      chapter: "Durées, vitesse et débit",
      stem: ex(3, 12),
      questions: [{ num: "c) Calcule 4 h 20 min − 55 min. Écris le résultat en minutes.", pts: 4, answer: 205, why: "On emprunte une heure : 4 h 20 min = 3 h 80 min. On enlève 55 min : il reste 3 h 25 min. En minutes : 3 × 60 + 25 = 205 minutes." }],
    },
    {
      chapter: "Les quadrilatères et le triangle",
      stem: EX4,
      questions: [
        build(
          "un triangle de 12 cm de base et de 7 cm de hauteur.",
          "Trace d’abord la base de 12 cm. Avec l’équerre, trace la hauteur de 7 cm, perpendiculaire à la base, puis relie son sommet aux deux bouts de la base.",
          schemaFig("cfee-triangle", "Un triangle de base 12 cm et de hauteur 7 cm ; la hauteur est tracée en pointillé."),
        ),
        { qcm: "b) Qu’est-ce qu’un triangle isocèle ?", pts: 3, choices: ["*Un triangle qui a deux côtés de même longueur", "Un triangle qui a trois côtés de même longueur", "Un triangle qui a un angle droit", "Un triangle qui a quatre côtés"], why: "Isocèle : deux côtés de même longueur. Équilatéral : trois côtés de même longueur. Rectangle : un angle droit." },
      ],
    },
    {
      chapter: "Comprendre l’énoncé d’un problème",
      stem: `${ex(5, 4, "Lis ce problème. Tu n’as pas à le résoudre.")}${reading("À 9 h 15, Moussa achète au marché de Thiès 12 mangues à 150 F l’une pour ses 3 petits frères. Il donne un billet de 5 000 F à la vendeuse. Combien la vendeuse lui rendra-t-elle ?")}`,
      questions: [
        { qcm: "a) Laquelle de ces données est inutile pour répondre à la question ?", pts: 2, choices: ["*9 h 15", "12 mangues", "150 F l’une", "le billet de 5 000 F"], why: "L’heure ne sert pas à calculer la monnaie. On calcule avec le nombre de mangues, leur prix et le billet : 12 × 150 = 1 800 F, puis 5 000 − 1 800 = 3 200 F." },
        { qcm: "b) Quelle autre donnée est inutile ?", pts: 2, choices: ["*ses 3 petits frères", "12 mangues", "150 F l’une", "le billet de 5 000 F"], why: "Pour qui Moussa achète les mangues ne change rien au prix : le nombre de frères ne sert pas dans le calcul." },
      ],
    },
  ]),
  spec(2, [
    {
      chapter: "Les quatre opérations sur les grands nombres",
      stem: ex(1, 8),
      questions: [
        { num: "a) Pose et effectue : 58 464 ÷ 72.", pts: 4, answer: 812, why: "On pose la division : 58 464 ÷ 72 = 812. Vérification : 812 × 72 = 58 464." },
        { num: "b) Pose et effectue : 1 000 000 − 275 480.", pts: 4, answer: 724520, why: "On pose la soustraction en faisant attention aux zéros : 1 000 000 − 275 480 = 724 520. Vérification : 724 520 + 275 480 = 1 000 000." },
      ],
    },
    {
      chapter: "Opérations sur les fractions",
      stem: ex(2, 8),
      questions: [
        { qcm: "a) Calcule : 5/8 + 3/4.", pts: 4, choices: ["*11/8", "8/12", "8/8", "15/32"], why: "On met au même dénominateur : 3/4 = 6/8. On additionne ensuite les numérateurs : 5/8 + 6/8 = 11/8." },
        { num: "b) Calcule les 2/5 de 1 500 F.", pts: 4, answer: 600, why: "On divise par le dénominateur, puis on multiplie par le numérateur : 1 500 ÷ 5 × 2 = 600 F." },
      ],
    },
    {
      chapter: "Longueurs et périmètres",
      stem: ex(3, 12),
      questions: [{ num: "a) Complète : 2 km 300 m + 850 m = … m.", pts: 4, answer: 3150, why: "2 km 300 m = 2 300 m. Ensuite, 2 300 + 850 = 3 150 m." }],
    },
    {
      chapter: "Les intérêts",
      stem: ex(3, 12),
      questions: [{ num: "b) On place 200 000 F à la banque, au taux de 6 % par an. Quel intérêt annuel cette somme rapporte-t-elle, en francs ?", pts: 4, answer: 12000, why: "Intérêt annuel = capital × taux ÷ 100 : 200 000 × 6 ÷ 100 = 12 000 F." }],
    },
    {
      chapter: "Durées, vitesse et débit",
      stem: ex(3, 12),
      questions: [{ num: "c) Un car quitte Dakar à 7 h 40 et arrive à Kaolack à 10 h 10. Combien de minutes dure le voyage ?", pts: 4, answer: 150, why: "De 7 h 40 à 10 h 10, il s’écoule 2 h 30. Une heure vaut 60 minutes : 2 × 60 + 30 = 150 minutes." }],
    },
    {
      chapter: "Les quadrilatères et le triangle",
      stem: EX4,
      questions: [
        build(
          "un losange dont les diagonales mesurent 8 cm et 6 cm.",
          "Trace la diagonale de 8 cm. Sur son milieu, trace avec l’équerre la diagonale de 6 cm : elles se coupent en leur milieu et à angle droit. Relie ensuite les quatre extrémités.",
          schemaFig("cfee-losange", "Un losange dont les diagonales mesurent 8 cm et 6 cm."),
        ),
        { qcm: "b) Qu’est-ce qu’un carré ?", pts: 3, choices: ["*Un quadrilatère qui a 4 côtés égaux et 4 angles droits", "Un quadrilatère qui a 4 côtés égaux, sans angle droit", "Un quadrilatère qui a seulement 2 côtés parallèles", "Une figure qui a 3 côtés"], why: "Le carré a 4 côtés égaux et 4 angles droits. Le losange a 4 côtés égaux, mais pas forcément d’angle droit." },
      ],
    },
    {
      chapter: "Prix, budget et pourcentages",
      stem: `${ex(5, 4, "Cet énoncé n’a pas de question. Choisis une question intermédiaire, puis une question finale.")}${reading("Un commerçant de Kaolack achète 50 kg de riz à 400 F le kg. Il revend tout ce riz à 450 F le kg.")}`,
      questions: [
        { qcm: "a) Quelle question intermédiaire convient ?", pts: 2, choices: ["*Quel est le bénéfice sur 1 kg de riz ?", "À quelle heure le commerçant ouvre-t-il ?", "Quel âge a le commerçant ?", "Combien de clients a-t-il ?"], why: "Cette question se calcule avec les données et sert à la suite : 450 − 400 = 50 F par kilogramme." },
        { qcm: "b) Quelle question finale convient ?", pts: 2, choices: ["*Quel est le bénéfice total du commerçant ?", "Où le commerçant habite-t-il ?", "Quel est le prix d’un sac vide ?", "Combien de kilogrammes a-t-il achetés ?"], why: "La question finale utilise le résultat de la question intermédiaire : 50 × 50 = 2 500 F de bénéfice. La quantité achetée est déjà donnée dans l’énoncé." },
      ],
    },
  ]),
  spec(3, [
    {
      chapter: "Pourcentages, échelles et proportionnalité",
      stem: `${ex(1, 8)}${reading("Une école de Ziguinchor compte 480 élèves, dont 55 % de filles.")}`,
      questions: [
        { num: "a) Combien y a-t-il de filles dans cette école ?", pts: 4, answer: 264, why: "On calcule 55 % de 480 : 480 × 55 ÷ 100 = 264 filles." },
        { num: "b) Combien y a-t-il de garçons ?", pts: 4, answer: 216, why: "Garçons = total − filles : 480 − 264 = 216 garçons." },
      ],
    },
    {
      chapter: "Opérations sur les fractions",
      stem: ex(2, 8),
      questions: [{ qcm: "a) Calcule : 2/3 + 1/6.", pts: 4, choices: ["*5/6", "3/9", "3/6", "2/18"], why: "On met au même dénominateur : 2/3 = 4/6. On additionne ensuite les numérateurs : 4/6 + 1/6 = 5/6." }],
    },
    {
      chapter: "Opérations sur les nombres décimaux",
      stem: ex(2, 8),
      questions: [{ num: "b) Pose et effectue : 305,4 − 78,65.", pts: 4, answer: 226.75, why: "On aligne les virgules et on écrit 305,40 : 305,40 − 78,65 = 226,75." }],
    },
    {
      chapter: "Les aires",
      stem: ex(3, 12),
      questions: [{ num: "a) Complète : 2,5 dam² + 40 m² = … m².", pts: 4, answer: 290, why: "1 dam² vaut 100 m², donc 2,5 × 100 = 250 m². Ensuite, 250 + 40 = 290 m²." }],
    },
    {
      chapter: "Les volumes",
      stem: ex(3, 12),
      questions: [{ num: "b) Complète : 2 m³ + 6 hℓ = … hℓ.", pts: 4, answer: 26, why: "1 m³ vaut 10 hℓ, donc 2 m³ = 20 hℓ. Ensuite, 20 + 6 = 26 hℓ." }],
    },
    {
      chapter: "Durées, vitesse et débit",
      stem: ex(3, 12),
      questions: [{ num: "c) Un robinet débite 12 ℓ par minute. En combien de minutes remplit-il un fût de 180 ℓ ?", pts: 4, answer: 15, why: "Durée = capacité ÷ débit : 180 ÷ 12 = 15 minutes." }],
    },
    {
      chapter: "Le cercle et les polygones",
      stem: EX4,
      questions: [
        build(
          "un cercle de 5 cm de rayon. Marque son centre O.",
          "Écarte ton compas de 5 cm sur la règle. Pique la pointe sur le centre O et trace le cercle sans changer l’écartement.",
          schemaFig("cfee-disque", "Un disque de centre O et de rayon 5 cm."),
        ),
        { qcm: "b) Comment appelle-t-on un segment qui joint deux points d’un cercle en passant par son centre ?", pts: 3, choices: ["*Un diamètre", "Un rayon", "Un périmètre", "Un côté"], why: "Le diamètre passe par le centre et vaut deux fois le rayon. Le rayon joint le centre à un point du cercle." },
      ],
    },
    {
      chapter: "Comprendre l’énoncé d’un problème",
      stem: `${ex(5, 4, "Lis ce problème. Tu n’as pas à le résoudre.")}${reading("Le lundi matin, Fatou, qui a 11 ans, achète 4 cahiers à 350 F l’un et un stylo à 150 F. Elle paie avec un billet de 2 000 F. Combien lui rend-on ?")}`,
      questions: [
        { qcm: "a) Laquelle de ces données est inutile pour répondre à la question ?", pts: 2, choices: ["*Le lundi matin", "4 cahiers", "un stylo à 150 F", "un billet de 2 000 F"], why: "Le jour ne sert pas à calculer la monnaie : 4 × 350 = 1 400 F ; 1 400 + 150 = 1 550 F ; 2 000 − 1 550 = 450 F." },
        { qcm: "b) Quelle autre donnée est inutile ?", pts: 2, choices: ["*11 ans", "350 F l’un", "un stylo à 150 F", "un billet de 2 000 F"], why: "L’âge de Fatou ne change rien au prix de ses achats." },
      ],
    },
  ]),
  spec(4, [
    {
      chapter: "Les quatre opérations sur les grands nombres",
      stem: ex(1, 8),
      questions: [
        { num: "a) Pose et effectue : 6 250 × 64.", pts: 4, answer: 400000, why: "6 250 × 4 = 25 000 ; 6 250 × 60 = 375 000 ; 25 000 + 375 000 = 400 000." },
        { num: "b) Pose et effectue : 73 125 ÷ 125.", pts: 4, answer: 585, why: "On pose la division : 73 125 ÷ 125 = 585. Vérification : 585 × 125 = 73 125." },
      ],
    },
    {
      chapter: "Les fractions",
      stem: ex(2, 8, "Choisis la bonne réponse."),
      questions: [
        { qcm: "a) Quelle fraction est égale à 0,75 ?", pts: 4, choices: ["*3/4", "7/5", "75/10", "1/75"], why: "0,75 = 75/100. En divisant le numérateur et le dénominateur par 25, on obtient 3/4." },
        { qcm: "b) Laquelle de ces fractions est une fraction décimale ?", pts: 4, choices: ["*7/100", "7/8", "3/4", "5/6"], why: "Une fraction décimale a pour dénominateur 10, 100, 1 000…" },
      ],
    },
    {
      chapter: "Durées, vitesse et débit",
      stem: ex(3, 12),
      questions: [{ num: "a) Calcule 3 h 20 min + 1 h 55 min. Écris le résultat en minutes.", pts: 4, answer: 315, why: "On convertit en minutes : 3 × 60 + 20 = 200 ; 1 × 60 + 55 = 115. Ensuite, 200 + 115 = 315 minutes." }],
    },
    {
      chapter: "Les intérêts",
      stem: ex(3, 12),
      questions: [{ num: "b) Un capital placé à 5 % par an rapporte 10 000 F en un an. Quel est ce capital, en francs ?", pts: 4, answer: 200000, why: "Capital = intérêt × 100 ÷ taux : 10 000 × 100 ÷ 5 = 200 000 F." }],
    },
    {
      chapter: "Les aires",
      stem: ex(3, 12),
      questions: [{ num: "c) Complète : 3 ha + 50 a = … a.", pts: 4, answer: 350, why: "1 ha vaut 100 a, donc 3 × 100 = 300 a. Ensuite, 300 + 50 = 350 a." }],
    },
    {
      chapter: "Les quadrilatères et le triangle",
      stem: EX4,
      questions: [
        build(
          "un parallélogramme de 9 cm de base et de 5 cm de hauteur.",
          "Trace la base de 9 cm. Trace une droite parallèle à 5 cm au-dessus. Reporte sur cette droite un segment de 9 cm, décalé, puis relie les extrémités : les côtés opposés sont parallèles et de même longueur.",
          schemaFig("cfee-parallelogramme", "Un parallélogramme de base 9 cm et de hauteur 5 cm."),
        ),
        { qcm: "b) Dans un parallélogramme, les côtés opposés sont :", pts: 3, choices: ["*parallèles et de même longueur", "perpendiculaires", "tous de longueurs différentes", "parallèles mais de longueurs différentes"], why: "C’est ce qui définit le parallélogramme : ses côtés opposés sont parallèles deux à deux et de même longueur." },
      ],
    },
    {
      chapter: "Partages et moyenne",
      stem: `${ex(5, 4, "Cet énoncé n’a pas de question. Choisis une question intermédiaire, puis une question finale.")}${reading("Un père partage 60 000 F entre ses deux enfants. L’aîné reçoit le double du cadet.")}`,
      questions: [
        { qcm: "a) Quelle question intermédiaire convient ?", pts: 2, choices: ["*En combien de parts égales faut-il partager la somme ?", "Quel âge a l’aîné ?", "Où habitent les enfants ?", "Quel est le métier du père ?"], why: "Le cadet a 1 part et l’aîné 2 parts : 1 + 2 = 3 parts." },
        { qcm: "b) Quelle question finale convient ?", pts: 2, choices: ["*Combien reçoit chaque enfant ?", "Combien le père avait-il à partager ?", "Combien d’enfants a le père ?", "Qui est l’aîné ?"], why: "Une part vaut 60 000 ÷ 3 = 20 000 F : c’est ce que reçoit le cadet. L’aîné reçoit 20 000 × 2 = 40 000 F. Les autres réponses sont déjà dans l’énoncé." },
      ],
    },
  ]),
];
