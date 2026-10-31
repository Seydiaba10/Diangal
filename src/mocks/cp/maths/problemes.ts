import "server-only";

// CP, résolution de problèmes : séries DIANGAL du même genre que les leçons du cahier de l'école
// (données, données utiles, inutiles et manquantes, questions et consignes, question finale et
// questions intermédiaires, énoncé à remettre en ordre, démarche progressive, intégrations), avec
// d'autres énoncés, tirés de la vie au Sénégal.

import { picture } from "../../drawings";
import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { cellOf } from "../../geometry";
import { cmOf, coinsTotal, fact, readClock } from "../../measure";
import { biggerGroup, compare, posedOp, product, storyOp } from "../../primary-exercises";
import { countData, lettered, orderStatement, twoSteps, whatRemains } from "../../problems";
import { seriesOf } from "./helpers";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });
const box = (s: string) => `<span class="dg-enonce"><strong>Énoncé :</strong> ${s}</span>`;
const DONNEE = "Quelle est une donnée de cet énoncé ?";
const USELESS = "Quelle donnée est <strong>inutile</strong> pour répondre à la question ?";
const MISSING = "Quelle donnée <strong>manque</strong> pour répondre à la question ?";
const FINAL = "Quelle est la <strong>question finale</strong> ?";
const MIDDLE = "Quelle est la <strong>question intermédiaire</strong> ?";

// ── Les données d’un problème ──────────────────────────────────────────────

const data = seriesOf("Les données d’un problème");

export const DATA_CP: ExerciseSeries[] = [
  data(1, "les données d’un énoncé", [
    countData(box("Papa achète <strong>4</strong> mangues, <strong>3</strong> oranges et <strong>6</strong> bananes. Combien de fruits a-t-il achetés ?")),
    lettered(box("Awa a <strong>10</strong> billes. Fatou lui donne <strong>4</strong> billes. Combien de billes Awa a-t-elle ?"), DONNEE, ["Combien de billes Awa a-t-elle ?", "4 billes", "Fatou est contente"], 1, "« 4 billes » est une information de l’énoncé qui sert au calcul. A est la question ; C n’est pas dans l’énoncé."),
    countData(box("Moussa a <strong>7</strong> cahiers et <strong>5</strong> crayons. Combien d’objets a-t-il ?")),
    lettered(box("Au marché, maman achète <strong>2</strong> poulets et <strong>5</strong> poissons. Combien d’animaux a-t-elle achetés ?"), DONNEE, ["5 poissons", "Combien d’animaux ?", "le marché est grand"], 0, "« 5 poissons » est une donnée de l’énoncé."),
    countData(box("Dans la classe, il y a <strong>12</strong> filles, <strong>11</strong> garçons et <strong>1</strong> maître. Combien d’élèves y a-t-il ?")),
    vf("Dans un problème, les données sont les informations qui servent à trouver la réponse.", true, "on les trouve dans l’énoncé."),
    countData(box("Fatou range <strong>6</strong> assiettes, <strong>6</strong> verres et <strong>2</strong> marmites. Combien d’objets range-t-elle ?")),
    lettered(box("Ibou a <strong>15</strong> francs. Il trouve <strong>10</strong> francs. Combien d’argent a-t-il ?"), DONNEE, ["Ibou est content", "Combien d’argent a-t-il ?", "15 francs"], 2, "« 15 francs » est une donnée de l’énoncé."),
  ]),
  data(2, "les données et la question", [
    lettered(box("Grand-mère a <strong>8</strong> poules et <strong>3</strong> canards. Combien d’oiseaux a-t-elle ?"), "Quelle est la <strong>question</strong> de cet énoncé ?", ["8 poules", "Combien d’oiseaux a-t-elle ?", "3 canards"], 1, "la question demande ce qu’il faut chercher : elle se termine par un point d’interrogation."),
    countData(box("Le car a <strong>20</strong> places. <strong>14</strong> personnes montent. Combien de places restent libres ?")),
    lettered(box("Binta a <strong>5</strong> robes et <strong>4</strong> pagnes. Combien d’habits a-t-elle ?"), DONNEE, ["4 pagnes", "Combien d’habits a-t-elle ?", "Binta est à l’école"], 0, "« 4 pagnes » est une donnée de l’énoncé."),
    storyOp(box("Binta a <strong>5</strong> robes et <strong>4</strong> pagnes."), "Combien d’habits a-t-elle ?", 5, "+", 4, "habits"),
    countData(box("Le vendeur a <strong>30</strong> œufs. Il en vend <strong>12</strong> le matin et <strong>9</strong> le soir. Combien d’œufs a-t-il vendus ?")),
    lettered(box("Malick a <strong>9</strong> ans. Sa sœur a <strong>6</strong> ans. Combien d’années Malick a-t-il de plus que sa sœur ?"), "Quelle est la <strong>question</strong> de cet énoncé ?", ["Malick a 9 ans.", "Sa sœur a 6 ans.", "Combien d’années Malick a-t-il de plus que sa sœur ?"], 2, "c’est la phrase qui demande ce qu’il faut chercher."),
    storyOp(box("Malick a <strong>9</strong> ans. Sa sœur a <strong>6</strong> ans."), "Combien d’années Malick a-t-il de plus que sa sœur ?", 9, "−", 6, "ans"),
    vf("La question d’un problème est une donnée.", false, "la question dit ce qu’il faut chercher ; les données servent à le trouver."),
  ]),
  data(3, "informations numériques et non numériques", [
    lettered(box("Babacar élève <strong>6</strong> moutons et des chèvres. Son oncle lui donne <strong>3</strong> moutons. Combien de moutons a-t-il ?"), "Quelle est l’information <strong>non numérique</strong> ?", ["6 moutons", "des chèvres", "3 moutons"], 1, "« des chèvres » ne dit pas combien : il n’y a pas de nombre."),
    lettered(box("Léna a <strong>4</strong> billes, des cailloux et <strong>7</strong> capsules."), "Quelle est l’information <strong>non numérique</strong> ?", ["des cailloux", "4 billes", "7 capsules"], 0, "« des cailloux » ne donne pas de nombre."),
    lettered(box("Aïcha récupère <strong>13</strong> stylos le matin, <strong>8</strong> stylos et des gommes l’après-midi."), "Quelle est une information <strong>numérique</strong> ?", ["des gommes", "l’après-midi", "8 stylos"], 2, "« 8 stylos » donne un nombre."),
    countData(box("Maman a <strong>14</strong> bonbons et des gâteaux. Elle donne <strong>5</strong> bonbons à son enfant.")),
    lettered(box("Au jardin, il y a <strong>10</strong> manguiers et des fleurs."), "Quelle est l’information <strong>non numérique</strong> ?", ["10 manguiers", "des fleurs", "il y a 10 arbres"], 1, "« des fleurs » ne dit pas combien de fleurs."),
    vf("« Des oranges » est une information numérique.", false, "il n’y a pas de nombre : c’est une information non numérique."),
    lettered(box("Le pêcheur ramène <strong>25</strong> poissons et des crabes."), "Quelle est une information <strong>numérique</strong> ?", ["25 poissons", "des crabes", "le pêcheur"], 0, "« 25 poissons » donne un nombre."),
    countData(box("Pape a <strong>3</strong> frères, <strong>2</strong> sœurs et des cousins.")),
  ]),
  data(4, "données utiles, données inutiles", [
    lettered(box("Fatou achète <strong>5</strong> oranges. Amy achète <strong>4</strong> oranges et <strong>6</strong> bananes. Combien d’oranges ont-elles achetées ?"), USELESS, ["5 oranges", "4 oranges", "6 bananes"], 2, "on cherche le nombre d’oranges : les bananes ne servent pas."),
    storyOp(box("Fatou achète <strong>5</strong> oranges. Amy achète <strong>4</strong> oranges."), "Combien d’oranges ont-elles achetées ?", 5, "+", 4, "oranges"),
    lettered(box("Un car a <strong>30</strong> sièges. <strong>9</strong> passagers montent, puis <strong>6</strong> autres. Combien de passagers sont montés ?"), USELESS, ["9 passagers", "30 sièges", "6 passagers"], 1, "le nombre de sièges ne sert pas à compter les passagers montés."),
    storyOp(box("<strong>9</strong> passagers montent dans le car, puis <strong>6</strong> autres."), "Combien de passagers sont montés ?", 9, "+", 6, "passagers"),
    lettered(box("Le vendeur a <strong>8</strong> paniers de tomates et <strong>4</strong> sacs d’oignons. Il vend <strong>5</strong> paniers de tomates. Combien de paniers de tomates lui reste-t-il ?"), USELESS, ["4 sacs d’oignons", "8 paniers de tomates", "5 paniers de tomates"], 0, "on cherche les paniers de tomates : les oignons ne servent pas."),
    storyOp(box("Le vendeur a <strong>8</strong> paniers de tomates. Il en vend <strong>5</strong>."), "Combien de paniers de tomates lui reste-t-il ?", 8, "−", 5, "paniers"),
    vf("Une donnée inutile sert au calcul.", false, "on ne l’utilise pas pour répondre à la question."),
    lettered(box("Au marché, Coumba vend <strong>7</strong> mangues et <strong>2</strong> savons. Ndèye vend <strong>6</strong> oranges. Combien de fruits ont-elles vendus ?"), USELESS, ["7 mangues", "6 oranges", "2 savons"], 2, "les savons ne sont pas des fruits."),
  ]),
  data(5, "données utiles, données inutiles (2)", [
    lettered(box("Seynabou a <strong>9</strong> tomates, <strong>6</strong> oignons et <strong>3</strong> bouteilles d’eau. Combien de légumes a-t-elle ?"), USELESS, ["9 tomates", "3 bouteilles d’eau", "6 oignons"], 1, "l’eau n’est pas un légume."),
    storyOp(box("Seynabou a <strong>9</strong> tomates et <strong>6</strong> oignons."), "Combien de légumes a-t-elle ?", 9, "+", 6, "légumes"),
    lettered(box("Au louma, papa vend <strong>12</strong> moutons le matin. Le soir, il vend <strong>5</strong> moutons et <strong>8</strong> poules. Combien de moutons a-t-il vendus ?"), USELESS, ["8 poules", "12 moutons", "5 moutons"], 0, "on compte seulement les moutons."),
    storyOp(box("Papa vend <strong>12</strong> moutons le matin et <strong>5</strong> moutons le soir."), "Combien de moutons a-t-il vendus ?", 12, "+", 5, "moutons"),
    lettered(box("L’équipe de football compte <strong>11</strong> joueurs, dont <strong>6</strong> garçons. Le maître achète <strong>4</strong> ballons. Combien de filles y a-t-il dans l’équipe ?"), USELESS, ["11 joueurs", "6 garçons", "4 ballons"], 2, "les ballons ne servent pas à compter les filles."),
    storyOp(box("L’équipe compte <strong>11</strong> joueurs, dont <strong>6</strong> garçons."), "Combien de filles y a-t-il dans l’équipe ?", 11, "−", 6, "filles"),
    lettered(box("Mamadou a <strong>3</strong> voitures grises et <strong>2</strong> voitures noires. Son ami lui donne <strong>1</strong> voiture grise. Combien de voitures grises a-t-il ?"), USELESS, ["3 voitures grises", "2 voitures noires", "1 voiture grise"], 1, "on compte seulement les voitures grises."),
    storyOp(box("Mamadou a <strong>3</strong> voitures grises. Son ami lui en donne <strong>1</strong>."), "Combien de voitures grises a-t-il ?", 3, "+", 1, "voitures"),
  ]),
  data(6, "les données manquantes", [
    lettered(box("Julie a <strong>50</strong> F. Elle veut acheter <strong>2</strong> beignets. Combien lui restera-t-il ?"), MISSING, ["le prix d’un beignet", "le nombre de beignets", "le nom de la vendeuse"], 0, "sans le prix des beignets, on ne peut pas savoir ce qu’elle dépense."),
    lettered(box("Khady a reçu <strong>3</strong> cadeaux de papa et des cadeaux de maman. Combien de cadeaux a-t-elle reçus ?"), MISSING, ["le nombre de cadeaux de papa", "le nombre de cadeaux de maman", "le jour de la fête"], 1, "l’énoncé dit « des cadeaux de maman » sans dire combien."),
    lettered(box("La porte mesure <strong>1</strong> m de plus que la fenêtre. Combien mesure la porte ?"), MISSING, ["la longueur de la fenêtre", "le prix de la porte", "la couleur de la fenêtre"], 0, "il faut connaître la longueur de la fenêtre pour ajouter 1 m."),
    lettered(box("Maman achète <strong>4</strong> pains et papa achète aussi des pains. Combien de pains ont-ils achetés ?"), MISSING, ["le nombre de pains de maman", "le nombre de pains de papa", "le prix du pain"], 1, "on ne sait pas combien de pains papa a achetés."),
    vf("Une donnée manquante est écrite dans l’énoncé.", false, "elle n’est pas dans l’énoncé, et pourtant on en a besoin pour répondre."),
    lettered(box("Une marchande achète <strong>18</strong> poissons. Elle en vend le matin et <strong>5</strong> le soir. Combien de poissons lui reste-t-il ?"), MISSING, ["le nombre de poissons achetés", "le nombre de poissons vendus le soir", "le nombre de poissons vendus le matin"], 2, "l’énoncé ne dit pas combien de poissons elle vend le matin."),
    lettered(box("Moussa a des billes. Il en perd <strong>6</strong>. Combien lui en reste-t-il ?"), MISSING, ["le nombre de billes perdues", "le nombre de billes de Moussa au départ", "la couleur des billes"], 1, "on ne sait pas combien de billes il avait au départ."),
  ]),
  data(7, "données utiles, inutiles et manquantes", [
    lettered(box("Papa a <strong>25</strong> oranges et <strong>30</strong> bananes. Il vend <strong>8</strong> bananes le matin et <strong>10</strong> bananes le soir. Combien de bananes a-t-il vendues ?"), USELESS, ["25 oranges", "8 bananes", "10 bananes"], 0, "on cherche les bananes vendues : les oranges ne servent pas."),
    storyOp(box("Papa vend <strong>8</strong> bananes le matin et <strong>10</strong> bananes le soir."), "Combien de bananes a-t-il vendues ?", 8, "+", 10, "bananes"),
    lettered(box("Pour arroser son jardin, papa utilise <strong>30</strong> ℓ d’eau le matin et <strong>15</strong> ℓ l’après-midi. Combien d’eau lui reste-t-il ?"), MISSING, ["l’eau qu’il avait au départ", "l’eau utilisée le matin", "l’eau utilisée l’après-midi"], 0, "pour trouver ce qui reste, il faut savoir combien d’eau il avait au départ."),
    lettered(box("Awa a <strong>4</strong> carottes, <strong>5</strong> oignons et <strong>3</strong> oranges. Combien de légumes a-t-elle ?"), USELESS, ["4 carottes", "3 oranges", "5 oignons"], 1, "les oranges sont des fruits."),
    storyOp(box("Awa a <strong>4</strong> carottes et <strong>5</strong> oignons."), "Combien de légumes a-t-elle ?", 4, "+", 5, "légumes"),
    lettered(box("Aliou a <strong>9</strong> ans et pèse <strong>28</strong> kg. Son frère pèse <strong>10</strong> kg de plus que lui. Combien pèse son frère ?"), USELESS, ["9 ans", "28 kg", "10 kg"], 0, "l’âge ne sert pas à trouver la masse."),
    storyOp(box("Aliou pèse <strong>28</strong> kg. Son frère pèse <strong>10</strong> kg de plus."), "Combien pèse son frère ?", 28, "+", 10, "kg"),
    lettered(box("Ndèye achète un cahier et un stylo à <strong>50</strong> F. Combien a-t-elle payé ?"), MISSING, ["le prix du stylo", "le prix du cahier", "le nom de la boutique"], 1, "on connaît le prix du stylo (50 F) mais pas celui du cahier."),
  ]),
];

// ── Les questions d’un problème et la démarche ─────────────────────────────

const steps = seriesOf("Les questions d’un problème et la démarche");

export const PROBLEM_QUESTIONS_CP: ExerciseSeries[] = [
  steps(1, "la question d’un énoncé", [
    lettered(box("Un commerçant a <strong>12</strong> pots de peinture. Il en vend <strong>5</strong>."), "Quelle question correspond à l’énoncé ?", ["Combien de pots a-t-il perdus ?", "Combien de pots lui reste-t-il ?", "Combien de pots a-t-il vendus ?"], 1, "on peut calculer ce qui reste : 12 − 5 = 7. Le nombre de pots vendus est déjà donné."),
    storyOp(box("Un commerçant a <strong>12</strong> pots de peinture. Il en vend <strong>5</strong>."), "Combien de pots lui reste-t-il ?", 12, "−", 5, "pots"),
    lettered(box("Khady remplit l’arrosoir <strong>7</strong> fois et Aminata <strong>6</strong> fois."), "Quelle question correspond à l’énoncé ?", ["Combien de fois Khady a-t-elle rempli l’arrosoir ?", "Combien de fois l’ont-elles rempli en tout ?", "Combien de fois Aminata l’a-t-elle rempli ?"], 1, "on peut calculer le total, 7 + 6 = 13 ; les deux autres réponses sont déjà dans l’énoncé."),
    storyOp(box("Khady remplit l’arrosoir <strong>7</strong> fois et Aminata <strong>6</strong> fois."), "Combien de fois l’ont-elles rempli en tout ?", 7, "+", 6, "fois"),
    lettered(box("Aïssatou a <strong>3</strong> robes vertes, <strong>4</strong> robes jaunes et <strong>2</strong> robes rouges."), "Quelle question correspond à l’énoncé ?", ["Combien de robes a-t-elle perdues ?", "Combien de robes a-t-elle en tout ?", "Combien de robes vertes a-t-elle ?"], 1, "on peut calculer le total, 3 + 4 + 2 = 9."),
    vf("La question d’un problème fait partie de l’énoncé.", true, "elle vient à la fin de l’énoncé."),
    lettered(box("Dans le frigo, il y a <strong>4</strong> ℓ de jus. Moustapha en boit <strong>1</strong> ℓ."), "Quelle question correspond à l’énoncé ?", ["Combien de ℓ de jus reste-t-il ?", "Combien de ℓ a-t-il bus ?", "Combien de ℓ y avait-il ?"], 0, "on peut calculer ce qui reste : 4 − 1 = 3 ℓ."),
  ]),
  steps(2, "la consigne", [
    lettered(box("Ibrahima vend <strong>15</strong> pommes le lundi. Le mardi, il en vend <strong>10</strong> de plus."), "Quelle <strong>consigne</strong> correspond à l’énoncé ?", ["Trouve le nombre de pommes vendues le lundi.", "Trouve le nombre de pommes vendues le mardi."], 1, "le nombre du lundi est donné ; il faut trouver celui du mardi : 15 + 10 = 25."),
    storyOp(box("Ibrahima vend <strong>15</strong> pommes le lundi. Le mardi, il en vend <strong>10</strong> de plus."), "Trouve le nombre de pommes vendues le mardi.", 15, "+", 10, "pommes"),
    lettered(box("Modou gagne <strong>8</strong> billes. Moussa gagne <strong>3</strong> billes de moins que Modou."), "Quelle <strong>consigne</strong> correspond à l’énoncé ?", ["Donne le nombre de billes gagnées par Moussa.", "Donne le nombre de billes gagnées par Modou."], 0, "Modou a gagné 8 billes (c’est donné) ; il faut trouver celles de Moussa : 8 − 3 = 5."),
    storyOp(box("Modou gagne <strong>8</strong> billes. Moussa gagne <strong>3</strong> billes de moins."), "Donne le nombre de billes gagnées par Moussa.", 8, "−", 3, "billes"),
    vf("Une consigne demande de faire quelque chose : « Trouve… », « Calcule… ».", true, "elle dit la tâche à réaliser."),
    lettered(box("Mariama avait <strong>15</strong> perles. Elle en a perdu <strong>4</strong>."), "Quelle <strong>consigne</strong> correspond à l’énoncé ?", ["Trouve le nombre de perles perdues.", "Trouve le nombre de perles qui lui restent.", "Trouve le nombre de perles du départ."], 1, "les perles perdues et celles du départ sont données : 15 − 4 = 11."),
    storyOp(box("Mariama avait <strong>15</strong> perles. Elle en a perdu <strong>4</strong>."), "Trouve le nombre de perles qui lui restent.", 15, "−", 4, "perles"),
  ]),
  steps(3, "intégration : nombres, mesures et figures", [
    compare(29, 45, "m"),
    posedOp(45, "−", 29),
    storyOp(box("Moussa a une corde de <strong>45</strong> m et une corde de <strong>29</strong> m."), "Quelle est la différence de longueur entre les deux cordes, en mètres ?", 45, "−", 29, "m"),
    storyOp(box("Maman achète une bouteille de <strong>19</strong> ℓ d’eau et une autre de <strong>20</strong> ℓ."), "Combien de litres d’eau a-t-elle achetés ?", 19, "+", 20, "ℓ"),
    storyOp(box("La famille a <strong>39</strong> ℓ d’eau. Elle en boit <strong>24</strong> ℓ."), "Combien de litres d’eau reste-t-il ?", 39, "−", 24, "ℓ"),
    cellOf(3, 3, [{ row: 1, col: 2, picture: "mangue" }, { row: 2, col: 0, picture: "banane" }], "mangue"),
    cmOf(8),
  ]),
  steps(4, "la question finale", [
    lettered(box("Khady a <strong>30</strong> tomates. Elle en vend <strong>15</strong> hier et <strong>5</strong> aujourd’hui."), FINAL, ["Combien de tomates lui reste-t-il ?", "Combien de tomates a-t-elle vendues ?"], 0, "on trouve d’abord les tomates vendues (15 + 5 = 20), puis ce qui reste (30 − 20 = 10) : c’est la dernière tâche."),
    whatRemains(box("Khady a <strong>30</strong> tomates. Elle en vend <strong>15</strong> hier et <strong>5</strong> aujourd’hui. Combien de tomates lui reste-t-il ?"), 30, 15, 5, "tomates"),
    lettered(box("Monsieur Fall a <strong>20</strong> ℓ d’eau. Il en utilise <strong>8</strong> ℓ le matin et <strong>5</strong> ℓ le soir."), FINAL, ["Combien de ℓ a-t-il utilisés ?", "Combien de ℓ lui reste-t-il ?"], 1, "on trouve d’abord l’eau utilisée (8 + 5 = 13), puis ce qui reste (20 − 13 = 7)."),
    lettered(box("Ousmane vend <strong>30</strong> paquets de biscuits la semaine passée et <strong>20</strong> cette semaine."), FINAL, ["Combien de paquets a-t-il vendus pendant les deux semaines ?", "Combien de paquets a-t-il vendus cette semaine ?", "Combien de paquets a-t-il vendus la semaine passée ?"], 0, "les deux autres réponses sont déjà dans l’énoncé : il faut trouver le total, 30 + 20 = 50."),
    vf("La question finale est la dernière tâche à réaliser.", true, "elle donne la réponse du problème."),
    lettered(box("Aminata a <strong>40</strong> perles : <strong>15</strong> jaunes, <strong>10</strong> rouges et des blanches."), FINAL, ["Combien y a-t-il de perles blanches ?", "Combien y a-t-il de perles jaunes et rouges ?", "Combien y a-t-il de perles jaunes ?"], 0, "on trouve d’abord les jaunes et rouges (15 + 10 = 25), puis les blanches (40 − 25 = 15)."),
  ]),
  steps(5, "les questions intermédiaires", [
    lettered(box("Alioune achète <strong>20</strong> m de ruban. Il en utilise <strong>3</strong> m le lundi et <strong>9</strong> m le mardi."), MIDDLE, ["Combien de m a-t-il utilisés ?", "Combien de m lui reste-t-il ?"], 0, "il faut d’abord trouver le ruban utilisé (3 + 9 = 12) pour trouver ce qui reste (20 − 12 = 8)."),
    lettered(box("Adama cueille <strong>20</strong> mangues. Elle en donne <strong>8</strong> mûres et <strong>10</strong> vertes à Mariama."), MIDDLE, ["Combien de mangues a-t-elle cueillies ?", "Combien de mangues a-t-elle données ?", "Combien de mangues lui reste-t-il ?"], 1, "on trouve d’abord les mangues données (8 + 10 = 18), puis celles qui restent (20 − 18 = 2)."),
    lettered(box("Paul a <strong>9</strong> ans. Fatou a <strong>3</strong> ans de moins que Paul. Abdou a <strong>2</strong> ans de moins que Fatou."), MIDDLE, ["Quel est l’âge d’Abdou ?", "Quel est l’âge de Fatou ?", "Quel est l’âge de Paul ?"], 1, "pour trouver l’âge d’Abdou, il faut d’abord l’âge de Fatou : 9 − 3 = 6, puis 6 − 2 = 4."),
    twoSteps(box("Paul a <strong>9</strong> ans. Fatou a <strong>3</strong> ans de moins que Paul. Abdou a <strong>2</strong> ans de moins que Fatou. Quel est l’âge d’Abdou ?"), 9, "−", 3, "−", 2, "ans"),
    vf("Une question intermédiaire se résout avant la question finale.", true, "elle donne un résultat dont on a besoin ensuite."),
    lettered(box("Ibrahima a un sachet de <strong>10</strong> oranges et un autre de <strong>18</strong> oranges. Il en donne <strong>8</strong> à Khady."), MIDDLE, ["Combien d’oranges lui reste-t-il ?", "Combien d’oranges a-t-il donné ?", "Combien d’oranges avait-il au départ ?"], 2, "il faut d’abord les oranges du départ (10 + 18 = 28) pour trouver ce qui reste (28 − 8 = 20)."),
    twoSteps(box("Ibrahima a un sachet de <strong>10</strong> oranges et un autre de <strong>18</strong> oranges. Il en donne <strong>8</strong> à Khady. Combien d’oranges lui reste-t-il ?"), 10, "+", 18, "−", 8, "oranges"),
  ]),
  steps(6, "question finale et questions intermédiaires", [
    lettered(box("Un commerçant a <strong>33</strong> kg de mangues. Il en vend <strong>15</strong> kg le matin et <strong>10</strong> kg l’après-midi."), MIDDLE, ["Quelle masse de mangues a-t-il vendue ?", "Quelle masse de mangues lui reste-t-il ?"], 0, "on trouve d’abord la masse vendue (15 + 10 = 25 kg)."),
    lettered(box("Un commerçant a <strong>33</strong> kg de mangues. Il en vend <strong>15</strong> kg le matin et <strong>10</strong> kg l’après-midi."), FINAL, ["Quelle masse de mangues a-t-il vendue ?", "Quelle masse de mangues lui reste-t-il ?"], 1, "c’est la dernière tâche : 33 − 25 = 8 kg."),
    whatRemains(box("Un commerçant a <strong>33</strong> kg de mangues. Il en vend <strong>15</strong> kg le matin et <strong>10</strong> kg l’après-midi. Quelle masse de mangues lui reste-t-il ?"), 33, 15, 10, "kg"),
    lettered(box("Amadou achète un sac d’oranges de <strong>20</strong> kg. Il donne <strong>8</strong> kg à Aminata et <strong>7</strong> kg à Moustapha."), FINAL, ["Quelle masse d’oranges reste-t-il ?", "Quelle masse a-t-il donnée en tout ?", "Quelle masse a-t-il donnée à Aminata ?"], 0, "on trouve d’abord la masse donnée (8 + 7 = 15 kg), puis ce qui reste : 20 − 15 = 5 kg."),
    whatRemains(box("Amadou achète un sac d’oranges de <strong>20</strong> kg. Il donne <strong>8</strong> kg à Aminata et <strong>7</strong> kg à Moustapha. Quelle masse d’oranges reste-t-il ?"), 20, 8, 7, "kg"),
    vf("Dans un problème, on peut avoir plusieurs questions intermédiaires.", true, "on les résout l’une après l’autre avant la question finale."),
  ]),
  steps(7, "révision", [
    lettered(box("Marie achète <strong>4</strong> bananes, <strong>5</strong> mangues et <strong>2</strong> savons. Combien de fruits a-t-elle achetés ?"), USELESS, ["4 bananes", "5 mangues", "2 savons"], 2, "les savons ne sont pas des fruits."),
    lettered(box("Une marchande achète <strong>18</strong> poissons. Elle en vend <strong>8</strong> le matin et d’autres le soir. Combien de poissons lui reste-t-il ?"), MISSING, ["le nombre de poissons vendus le soir", "le nombre de poissons achetés", "le nombre de poissons vendus le matin"], 0, "l’énoncé dit « d’autres le soir » sans donner leur nombre."),
    lettered(box("Un infirmier donne <strong>9</strong> comprimés à un malade. Il en prend <strong>2</strong> le matin et <strong>3</strong> le soir."), MIDDLE, ["Combien de comprimés reste-t-il ?", "Combien de comprimés a-t-il déjà pris ?", "Quel est le prix des comprimés ?"], 1, "on trouve d’abord les comprimés pris (2 + 3 = 5), puis ceux qui restent (9 − 5 = 4)."),
    whatRemains(box("Un infirmier donne <strong>9</strong> comprimés à un malade. Il en prend <strong>2</strong> le matin et <strong>3</strong> le soir. Combien de comprimés reste-t-il ?"), 9, 2, 3, "comprimés"),
    countData(box("<strong>8</strong> garçons jouent dans la cour. <strong>2</strong> adultes et <strong>13</strong> filles les rejoignent. Combien d’enfants y a-t-il ?")),
    lettered(box("<strong>8</strong> garçons jouent dans la cour. <strong>2</strong> adultes et <strong>13</strong> filles les rejoignent. Combien d’enfants y a-t-il ?"), USELESS, ["8 garçons", "2 adultes", "13 filles"], 1, "les adultes ne sont pas des enfants."),
    storyOp(box("<strong>8</strong> garçons jouent dans la cour. <strong>13</strong> filles les rejoignent."), "Combien d’enfants y a-t-il ?", 8, "+", 13, "enfants"),
  ]),
  steps(8, "activités d’intégration", [
    lettered(box("Hier, une restauratrice a acheté <strong>6</strong> ℓ d’huile. Aujourd’hui, elle en achète <strong>2</strong> ℓ. Pour le repas, elle utilise <strong>3</strong> ℓ d’huile et <strong>4</strong> ℓ d’eau."), FINAL, ["Quelle quantité d’huile a-t-elle achetée hier ?", "Quelle quantité d’huile lui reste-t-il ?", "Quelle quantité d’huile a-t-elle achetée en tout ?"], 1, "on trouve d’abord l’huile achetée (6 + 2 = 8 ℓ), puis ce qui reste : 8 − 3 = 5 ℓ."),
    twoSteps(box("Une restauratrice achète <strong>6</strong> ℓ d’huile hier et <strong>2</strong> ℓ aujourd’hui. Elle en utilise <strong>3</strong> ℓ. Combien de litres d’huile lui reste-t-il ?"), 6, "+", 2, "−", 3, "ℓ"),
    storyOp(box("Un enfant a <strong>30</strong> billes. Après le jeu, il lui en reste <strong>17</strong>."), "Combien de billes a-t-il perdues ?", 30, "−", 17, "billes"),
    lettered(box("Il y a <strong>10</strong> sacs de riz dans une boutique. Mariama en achète <strong>2</strong> et Oumar <strong>5</strong>."), MIDDLE, ["Combien de sacs reste-t-il dans la boutique ?", "Combien de sacs ont été achetés ?", "Quel est le prix d’un sac ?"], 1, "on trouve d’abord les sacs achetés (2 + 5 = 7), puis ceux qui restent (10 − 7 = 3)."),
    whatRemains(box("Il y a <strong>10</strong> sacs de riz dans une boutique. Mariama en achète <strong>2</strong> et Oumar <strong>5</strong>. Combien de sacs reste-t-il ?"), 10, 2, 5, "sacs"),
    picturedTotal(),
  ]),
  steps(9, "données et questions d’un problème", [
    lettered(box("Oumar a <strong>4</strong> bananes et <strong>12</strong> citrons. Il donne <strong>5</strong> citrons à Cheikh et <strong>3</strong> à Adama. Combien de citrons lui reste-t-il ?"), USELESS, ["4 bananes", "12 citrons", "5 citrons"], 0, "on compte seulement les citrons."),
    lettered(box("Oumar a <strong>12</strong> citrons. Il en donne <strong>5</strong> à Cheikh et <strong>3</strong> à Adama."), MIDDLE, ["Combien de citrons a-t-il donnés ?", "Combien de citrons lui reste-t-il ?"], 0, "on trouve d’abord les citrons donnés : 5 + 3 = 8."),
    whatRemains(box("Oumar a <strong>12</strong> citrons. Il en donne <strong>5</strong> à Cheikh et <strong>3</strong> à Adama. Combien de citrons lui reste-t-il ?"), 12, 5, 3, "citrons"),
    lettered(box("Aliou garde <strong>10</strong> bœufs et <strong>5</strong> sacs de foin. Il achète <strong>2</strong> moutons et <strong>4</strong> poules. Combien d’animaux a-t-il en tout ?"), USELESS, ["10 bœufs", "5 sacs de foin", "2 moutons"], 1, "le foin n’est pas un animal."),
    lettered(box("Fatou prépare <strong>13</strong> plats de yassa et <strong>5</strong> plats de mafé. Elle vend <strong>6</strong> plats de yassa sur place et <strong>2</strong> à emporter. Combien de plats de yassa lui reste-t-il ?"), FINAL, ["Combien de plats de yassa a-t-elle vendus ?", "Combien de plats de yassa lui reste-t-il ?"], 1, "on trouve d’abord les plats vendus (6 + 2 = 8), puis ce qui reste : 13 − 8 = 5."),
    whatRemains(box("Fatou prépare <strong>13</strong> plats de yassa. Elle en vend <strong>6</strong> sur place et <strong>2</strong> à emporter. Combien de plats de yassa lui reste-t-il ?"), 13, 6, 2, "plats"),
  ]),
  steps(10, "intégration : chemins, dattes et pavés", [
    storyOp(box("Sur le chemin courbe, Georges ramasse <strong>25</strong> dattes sur un palmier et <strong>38</strong> sur un autre."), "Combien de dattes ramasse-t-il en tout ?", 25, "+", 38, "dattes"),
    posedOp(25, "+", 38, true),
    product(2, 4, "Papa achète <strong>4</strong> pavés carrés. Chaque pavé pèse <strong>2</strong> kg."),
    compare(4, 8, "kg"),
    readClock(9, 0),
    coinsTotal([25, 25, 10]),
  ]),
  steps(11, "écrire un énoncé dans l’ordre", [
    orderStatement(["Combien a-t-elle dépensé en tout ?", "Ndiémé achète un bonbon à 25 F.", "Elle achète aussi un sachet de biscuits à 50 F."], [1, 2, 0], "d’abord les achats, puis la question."),
    orderStatement(["Maman a 20 oranges.", "Combien d’oranges reste-t-il à maman ?", "Elle en donne 3 à Omar et 9 à Waly.", "Combien d’oranges donne-t-elle aux enfants ?"], [0, 2, 3, 1], "ce qu’elle a, ce qu’elle donne, la question intermédiaire, puis la question finale."),
    orderStatement(["Combien d’enfants reste-t-il ?", "Il y a 12 garçons et 14 filles.", "8 enfants rentrent à la maison.", "Combien y avait-il d’enfants au début ?"], [1, 2, 3, 0], "les enfants au début, ceux qui rentrent, la question intermédiaire, puis la question finale."),
    orderStatement(["Il a mangé 2 bananes le matin et 3 le soir.", "Oncle Moussa a 20 bananes.", "Combien de bananes lui reste-t-il ?", "Combien de bananes a-t-il mangées ?"], [1, 0, 3, 2], "les données, la question intermédiaire, puis la question finale."),
    orderStatement(["Sa maman lui donne 50 F.", "Combien lui reste-t-il ?", "Pape a 35 F.", "Il achète des chocolats à 75 F."], [2, 0, 3, 1], "Pape a 35 F, sa maman lui donne 50 F (85 F), il achète des chocolats à 75 F, puis la question."),
    vf("Dans un énoncé, la question vient en dernier.", true, "on donne d’abord les informations, puis on pose la question."),
  ]),
  steps(12, "la démarche progressive", [
    twoSteps(box("Oumar a <strong>4</strong> moutons. Il en achète <strong>3</strong> autres. La veille de la Tabaski, il en vend <strong>2</strong>. Combien de moutons lui reste-t-il ?"), 4, "+", 3, "−", 2, "moutons"),
    twoSteps(box("Astou vend <strong>10</strong> tomates à Soda et <strong>6</strong> à Awa le matin. Le soir, elle en vend <strong>8</strong> à Marie. Combien de tomates a-t-elle vendues en tout ?"), 10, "+", 6, "+", 8, "tomates"),
    twoSteps(box("Aminata achète <strong>6</strong> mangues et <strong>3</strong> bananes. Elle mange <strong>2</strong> mangues. Combien de fruits lui reste-t-il ?"), 6, "+", 3, "−", 2, "fruits"),
    twoSteps(box("Léna a <strong>10</strong> billes noires et <strong>5</strong> billes bleues. Amy lui donne <strong>3</strong> billes bleues. Combien de billes Léna a-t-elle maintenant ?"), 10, "+", 5, "+", 3, "billes"),
    twoSteps(box("Yatma a <strong>30</strong> œufs. Il en donne <strong>10</strong> à sa voisine, puis il en achète <strong>15</strong>. Combien d’œufs a-t-il à la fin ?"), 30, "−", 10, "+", 15, "œufs"),
    vf("Dans la démarche progressive, on répond d’abord à la question intermédiaire.", true, "son résultat sert pour la question finale."),
  ]),
  steps(13, "révision", [
    lettered(box("Fatoumata a <strong>3</strong> kg d’oignons et <strong>2</strong> kg de riz. Sa tante a <strong>5</strong> kg de riz et des oignons. Quelle masse de riz ont-elles ?"), USELESS, ["2 kg de riz", "3 kg d’oignons", "5 kg de riz"], 1, "on cherche la masse de riz : les oignons ne servent pas."),
    storyOp(box("Fatoumata a <strong>2</strong> kg de riz. Sa tante a <strong>5</strong> kg de riz."), "Quelle masse de riz ont-elles ensemble, en kg ?", 2, "+", 5, "kg"),
    orderStatement(["Combien lui reste-t-il ?", "Pape a 35 F.", "Il achète des chocolats à 75 F.", "Sa maman lui donne 50 F."], [1, 3, 2, 0], "Pape a 35 F, sa maman lui donne 50 F, il achète des chocolats, puis la question."),
    twoSteps(box("Yatma a <strong>25</strong> œufs. Il en donne <strong>10</strong>, puis il en achète <strong>12</strong>. Combien d’œufs a-t-il à la fin ?"), 25, "−", 10, "+", 12, "œufs"),
    lettered(box("Le CP A compte <strong>31</strong> garçons et <strong>28</strong> filles, le CP B <strong>29</strong> garçons et <strong>33</strong> filles. Combien de filles y a-t-il dans les deux classes ?"), USELESS, ["28 filles", "31 garçons", "33 filles"], 1, "on cherche les filles : les garçons ne servent pas."),
    storyOp(box("Le CP A compte <strong>28</strong> filles et le CP B <strong>33</strong> filles."), "Combien de filles y a-t-il dans les deux classes ?", 28, "+", 33, "filles"),
  ]),
  steps(14, "activités d’intégration", [
    lettered(box("<strong>2</strong> femmes vont au marché. Elles achètent <strong>8</strong> citrons verts et <strong>6</strong> citrons jaunes. Elles en utilisent <strong>4</strong>. Combien de citrons reste-t-il ?"), USELESS, ["2 femmes", "8 citrons verts", "4 citrons"], 0, "le nombre de femmes ne sert pas à compter les citrons."),
    twoSteps(box("Elles achètent <strong>8</strong> citrons verts et <strong>6</strong> citrons jaunes. Elles en utilisent <strong>4</strong>. Combien de citrons reste-t-il ?"), 8, "+", 6, "−", 4, "citrons"),
    lettered(box("Un boutiquier a <strong>70</strong> sacs de riz de <strong>10</strong> kg. Il vend <strong>18</strong> sacs le lundi et <strong>29</strong> le mardi."), FINAL, ["Combien de sacs a-t-il vendus ?", "Combien de sacs lui reste-t-il ?", "Quelle est la masse d’un sac ?"], 1, "on trouve d’abord les sacs vendus (18 + 29 = 47), puis ceux qui restent (70 − 47 = 23)."),
    whatRemains(box("Un boutiquier a <strong>70</strong> sacs de riz. Il vend <strong>18</strong> sacs le lundi et <strong>29</strong> le mardi. Combien de sacs lui reste-t-il ?"), 70, 18, 29, "sacs"),
    lettered(box("Ndèye achète <strong>10</strong> beignets le matin, <strong>6</strong> beignets et <strong>3</strong> bonbons l’après-midi. Elle mange <strong>7</strong> beignets. Combien de beignets lui reste-t-il ?"), USELESS, ["10 beignets", "3 bonbons", "7 beignets"], 1, "on compte seulement les beignets."),
    twoSteps(box("Ndèye achète <strong>10</strong> beignets le matin et <strong>6</strong> l’après-midi. Elle en mange <strong>7</strong>. Combien de beignets lui reste-t-il ?"), 10, "+", 6, "−", 7, "beignets"),
  ]),
  steps(15, "intégration : calendrier, mangues et monnaie", [
    storyOp(box("Le dimanche <strong>13</strong> juillet, maman récolte <strong>49</strong> mangues. Le dimanche <strong>27</strong>, elle en récolte <strong>27</strong>."), "Combien de mangues a-t-elle récoltées ces deux dimanches ?", 49, "+", 27, "mangues", picture("mangue", "Une mangue.")),
    fact("Quel mois vient après juin ?", ["mai", "*juillet", "août"], "après juin vient juillet."),
    readClock(11, 0),
    coinsTotal([10, 10, 50, 25], "Yaba"),
    storyOp(box("Yaba a <strong>95</strong> F. Il achète une glace à <strong>50</strong> F."), "Combien lui reste-t-il ?", 95, "−", 50, "F"),
    biggerGroup(box("Le samedi, maman récolte <strong>30</strong> mangues, le vendredi <strong>28</strong>."), [["le samedi", 30], ["le vendredi", 28]]),
  ]),
];

/** Situation d'intégration : total de deux groupes avec illustration. */
function picturedTotal(): ExerciseSpec {
  return storyOp(box("Sur l’étal, il y a <strong>24</strong> mangues et <strong>16</strong> oranges."), "Combien de fruits y a-t-il en tout ?", 24, "+", 16, "fruits", picture("mangue", "Une mangue."));
}
