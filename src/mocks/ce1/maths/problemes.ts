import "server-only";

// CE1, résolution de problèmes : données numériques, données utiles et inutiles, données manquantes,
// question finale et questions intermédiaires, ordre d'un énoncé. Séries DIANGAL, situations de la
// vie au Sénégal ; réponses calculées par mocks/upper-math.ts et mocks/problems.ts.

import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { fact } from "../../measure";
import { countData, lettered, orderStatement } from "../../problems";
import { remains, steps, story } from "../../upper-math";
import { seriesOf } from "../../cp/maths/helpers";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });

const data = seriesOf("Les données d’un problème");

export const DATA_CE1: ExerciseSeries[] = [
  data(1, "repérer les données numériques", [
    countData("Awa achète <strong>3</strong> cahiers à <strong>250</strong> F l’un."),
    countData("Une classe a <strong>48</strong> élèves dont <strong>26</strong> filles."),
    countData("Modou a <strong>500</strong> F. Il achète un pain à <strong>175</strong> F et un jus à <strong>150</strong> F."),
    story("Awa achète <strong>3</strong> cahiers à <strong>250</strong> F l’un.", "Combien paie-t-elle ?", 250, "×", 3, "F"),
    story("Une classe a <strong>48</strong> élèves dont <strong>26</strong> filles.", "Combien y a-t-il de garçons ?", 48, "−", 26, "garçons"),
    fact("Dans un problème, les données sont…", ["*les informations qui servent à répondre", "les dessins de la page", "les réponses"], "on les trouve dans l’énoncé."),
    vf("Une donnée numérique est un nombre de l’énoncé.", true, "par exemple « 3 cahiers », « 250 F »."),
    vf("La question d’un problème est une donnée.", false, "la question dit ce qu’on cherche ; les données servent à y répondre."),
  ]),
  data(2, "données utiles et inutiles (1)", [
    lettered("Fatou a 9 ans. Elle achète 2 mangues à 150 F l’une. Combien paie-t-elle ?", "Quelle donnée est inutile ?", ["9 ans", "2 mangues", "150 F"], 0, "l’âge de Fatou ne sert pas à calculer le prix."),
    story("Fatou a 9 ans. Elle achète <strong>2</strong> mangues à <strong>150</strong> F l’une.", "Combien paie-t-elle ?", 150, "×", 2, "F"),
    lettered("Un car de 30 places part à 8 h avec 22 passagers. Combien de places sont libres ?", "Quelle donnée est inutile ?", ["30 places", "8 h", "22 passagers"], 1, "l’heure de départ ne change pas le nombre de places libres."),
    story("Un car de <strong>30</strong> places part à 8 h avec <strong>22</strong> passagers.", "Combien de places sont libres ?", 30, "−", 22, "places"),
    lettered("Le jardin de l’école a 4 rangées de 12 salades et un grand manguier. Combien de salades y a-t-il ?", "Quelle donnée est inutile ?", ["4 rangées", "12 salades", "un grand manguier"], 2, "le manguier ne sert pas à compter les salades."),
    story("Le jardin de l’école a <strong>4</strong> rangées de <strong>12</strong> salades et un grand manguier.", "Combien de salades y a-t-il ?", 12, "×", 4, "salades"),
    vf("Une donnée inutile ne sert pas à répondre à la question.", true, "on peut la laisser de côté."),
    vf("Il faut toujours utiliser toutes les données d’un énoncé.", false, "certaines données sont inutiles."),
  ]),
  data(3, "données utiles et inutiles (2)", [
    lettered("Papa a 5 chèvres, 8 moutons et 1 âne. Combien a-t-il de chèvres et de moutons ?", "Quelles données sont utiles ?", ["5 chèvres et 8 moutons", "8 moutons et 1 âne", "5 chèvres et 1 âne"], 0, "on cherche seulement les chèvres et les moutons."),
    story("Papa a <strong>5</strong> chèvres, <strong>8</strong> moutons et 1 âne.", "Combien a-t-il de chèvres et de moutons ?", 5, "+", 8, "animaux"),
    lettered("Maman part au marché à 9 h avec 5 000 F. Elle dépense 3 250 F. Combien lui reste-t-il ?", "Quelle donnée est inutile ?", ["9 h", "5 000 F", "3 250 F"], 0, "l’heure ne change pas l’argent qui reste."),
    story("Maman part au marché à 9 h avec <strong>5 000</strong> F. Elle dépense <strong>3 250</strong> F.", "Combien lui reste-t-il ?", 5000, "−", 3250, "F"),
    lettered("Ibrahima, 10 ans, lit 15 pages par jour pendant 6 jours. Combien de pages lit-il ?", "Quelle donnée est inutile ?", ["10 ans", "15 pages", "6 jours"], 0, "l’âge d’Ibrahima ne sert pas au calcul."),
    story("Ibrahima, 10 ans, lit <strong>15</strong> pages par jour pendant <strong>6</strong> jours.", "Combien de pages lit-il en tout ?", 15, "×", 6, "pages"),
    countData("Ibrahima, <strong>10</strong> ans, lit <strong>15</strong> pages par jour pendant <strong>6</strong> jours."),
    vf("Pour choisir les données utiles, je lis d’abord la question.", true, "la question dit ce qu’on cherche."),
  ]),
  data(4, "la donnée qui manque", [
    lettered("Awa achète des cahiers à 300 F l’un. Combien paie-t-elle ?", "Quelle donnée manque ?", ["le nombre de cahiers", "le prix d’un cahier", "le nom du vendeur"], 0, "sans le nombre de cahiers, on ne peut pas calculer."),
    lettered("Un car part de Dakar avec des passagers. À Thiès, 12 descendent. Combien en reste-t-il ?", "Quelle donnée manque ?", ["le nombre de passagers au départ", "la couleur du car", "l’heure d’arrivée"], 0, "il faut savoir combien il y avait de passagers au départ."),
    lettered("Modou a 1 000 F. Il achète un ballon. Combien lui reste-t-il ?", "Quelle donnée manque ?", ["le prix du ballon", "l’âge de Modou", "la couleur du ballon"], 0, "sans le prix du ballon, on ne peut pas répondre."),
    lettered("Une école a 6 classes. Combien a-t-elle d’élèves ?", "Quelle donnée manque ?", ["le nombre d’élèves par classe", "le nom de l’école", "le nombre de maîtres"], 0, "il faut savoir combien d’élèves il y a dans chaque classe."),
    story("Une école a <strong>6</strong> classes de <strong>45</strong> élèves.", "Combien a-t-elle d’élèves ?", 45, "×", 6, "élèves"),
    story("Modou a <strong>1 000</strong> F. Il achète un ballon à <strong>750</strong> F.", "Combien lui reste-t-il ?", 1000, "−", 750, "F"),
    vf("Quand il manque une donnée, on ne peut pas répondre à la question.", true, "il faut d’abord trouver ou demander la donnée."),
    vf("Dans « Awa achète des cahiers à 300 F l’un », on connaît le nombre de cahiers.", false, "on ne connaît que le prix d’un cahier."),
  ]),
  data(5, "lire un énoncé avec un tableau", [
    countData("Au marché, Awa vend <strong>35</strong> mangues le lundi, <strong>42</strong> le mardi et <strong>28</strong> le mercredi."),
    story("Awa vend <strong>35</strong> mangues le lundi et <strong>42</strong> le mardi.", "Combien en vend-elle ces deux jours ?", 35, "+", 42, "mangues"),
    story("Awa vend <strong>42</strong> mangues le mardi et <strong>28</strong> le mercredi.", "Combien en vend-elle de plus le mardi ?", 42, "−", 28, "mangues"),
    lettered("Awa vend 35 mangues le lundi, 42 le mardi et 28 le mercredi.", "Quel jour a-t-elle vendu le plus de mangues ?", ["le lundi", "le mardi", "le mercredi"], 1, "42 est le plus grand nombre."),
    lettered("Awa vend 35 mangues le lundi, 42 le mardi et 28 le mercredi.", "Quel jour a-t-elle vendu le moins de mangues ?", ["le lundi", "le mardi", "le mercredi"], 2, "28 est le plus petit nombre."),
    fact("Pour trouver le total des trois jours, on fait…", ["*une addition", "une soustraction", "une division"], "on réunit les ventes : 35 + 42 + 28."),
    vf("Les données d’un problème peuvent être rangées dans un tableau.", true, "le tableau aide à les lire."),
    vf("Dans cet énoncé, il y a 2 données numériques.", false, "il y en a 3 : 35, 42 et 28."),
  ]),
  data(6, "je trouve les données et je résous", [
    story("Une marchande a <strong>120</strong> œufs. Elle en vend <strong>85</strong>.", "Combien lui en reste-t-il ?", 120, "−", 85, "œufs"),
    story("Un jardinier plante <strong>8</strong> rangées de <strong>15</strong> choux.", "Combien de choux plante-t-il ?", 15, "×", 8, "choux"),
    story("On partage <strong>36</strong> crayons entre <strong>4</strong> tables.", "Combien de crayons par table ?", 36, ":", 4, "crayons"),
    story("Le car fait <strong>145</strong> km le matin et <strong>98</strong> km le soir.", "Quelle distance fait-il dans la journée ?", 145, "+", 98, "km"),
    lettered("Une marchande a 120 œufs. Elle en vend 85 à 50 F l’un. Combien lui en reste-t-il ?", "Quelle donnée est inutile ?", ["120 œufs", "85 œufs", "50 F"], 2, "le prix ne change pas le nombre d’œufs restants."),
    countData("On partage <strong>36</strong> crayons entre <strong>4</strong> tables."),
    fact("Avant de calculer, je cherche…", ["*les données utiles et la question", "le résultat du voisin", "le titre de la page"], "je comprends d’abord le problème."),
    vf("Je vérifie que ma réponse a du sens.", true, "par exemple : il ne peut pas rester plus d’œufs qu’au départ."),
  ]),
];

const quest = seriesOf("Les questions d’un problème");

export const PROBLEM_QUESTIONS_CE1: ExerciseSeries[] = [
  quest(1, "la question finale", [
    lettered("Awa a 500 F. Elle achète 2 cahiers à 150 F l’un. Combien lui reste-t-il ?", "Quelle est la question finale ?", ["Combien lui reste-t-il ?", "Combien coûtent 2 cahiers ?", "Combien a Awa au départ ?"], 0, "c’est la dernière question, celle qu’on cherche à la fin."),
    lettered("Un fermier a 4 enclos de 12 moutons. Il en vend 15. Combien lui en reste-t-il ?", "Quelle est la question finale ?", ["Combien a-t-il de moutons en tout ?", "Combien lui en reste-t-il ?", "Combien d’enclos a-t-il ?"], 1, "c’est la question posée à la fin de l’énoncé."),
    fact("La question finale d’un problème est…", ["*ce qu’on cherche à la fin", "la première phrase", "une donnée"], "on y répond en dernier."),
    remains("Awa a <strong>500</strong> F. Elle achète un cahier à <strong>150</strong> F et un stylo à <strong>100</strong> F. Combien lui reste-t-il ?", 500, 150, 100, "F"),
    remains("Une classe a <strong>60</strong> livres. Le maître en prête <strong>18</strong> le lundi et <strong>24</strong> le mardi. Combien en reste-t-il ?", 60, 18, 24, "livres"),
    vf("La question finale se trouve souvent à la fin de l’énoncé.", true, "elle commence souvent par « combien »."),
    vf("Un problème n’a jamais de question.", false, "la question dit ce qu’il faut chercher."),
    vf("Pour répondre, j’écris une phrase réponse.", true, "par exemple : « Il lui reste 250 F. »"),
  ]),
  quest(2, "la question intermédiaire (1)", [
    lettered("Awa a 500 F. Elle achète 2 cahiers à 150 F l’un. Combien lui reste-t-il ?", "Quelle question intermédiaire faut-il se poser d’abord ?", ["Combien coûtent les 2 cahiers ?", "Quel âge a Awa ?", "Où habite Awa ?"], 0, "il faut d’abord trouver le prix des 2 cahiers."),
    steps("Awa a <strong>500</strong> F. Elle achète <strong>2</strong> cahiers à <strong>150</strong> F l’un. Combien lui reste-t-il ?", 2, "×", 150, "−", 500, "F", true),
    lettered("Un fermier a 4 enclos de 12 moutons. Il en vend 15. Combien lui en reste-t-il ?", "Quelle question intermédiaire faut-il se poser ?", ["Combien a-t-il de moutons en tout ?", "Combien coûte un mouton ?", "Quelle est la couleur des moutons ?"], 0, "on calcule d’abord le nombre total de moutons."),
    steps("Un fermier a <strong>4</strong> enclos de <strong>12</strong> moutons. Il en vend <strong>15</strong>. Combien lui en reste-t-il ?", 4, "×", 12, "−", 15, "moutons"),
    fact("Une question intermédiaire sert à…", ["*trouver un résultat utile pour la question finale", "changer l’énoncé", "remplacer la question finale"], "on y répond avant la question finale."),
    vf("Certains problèmes se résolvent en deux étapes.", true, "d’abord la question intermédiaire, puis la question finale."),
    vf("La question intermédiaire est toujours écrite dans l’énoncé.", false, "souvent, c’est à moi de la trouver."),
    remains("Modou a <strong>1 000</strong> F. Il paie <strong>350</strong> F de pain et <strong>400</strong> F de lait. Combien lui reste-t-il ?", 1000, 350, 400, "F"),
  ]),
  quest(3, "la question intermédiaire (2)", [
    steps("Maman achète <strong>3</strong> kg de riz à <strong>450</strong> F le kg et un litre d’huile à <strong>1 200</strong> F. Combien paie-t-elle ?", 3, "×", 450, "+", 1200, "F"),
    steps("Une école reçoit <strong>5</strong> cartons de <strong>40</strong> cahiers. Elle en distribue <strong>165</strong>. Combien en reste-t-il ?", 5, "×", 40, "−", 165, "cahiers"),
    steps("Un car transporte <strong>35</strong> passagers. À Mbour, <strong>12</strong> descendent et <strong>8</strong> montent. Combien y a-t-il de passagers ?", 35, "−", 12, "+", 8, "passagers"),
    steps("Fatou a <strong>2</strong> sacs de <strong>25</strong> oranges. Elle en vend <strong>18</strong>. Combien lui en reste-t-il ?", 2, "×", 25, "−", 18, "oranges"),
    lettered("Maman achète 3 kg de riz à 450 F le kg et un litre d’huile à 1 200 F. Combien paie-t-elle ?", "Quelle question intermédiaire faut-il se poser ?", ["Combien coûtent les 3 kg de riz ?", "Combien coûte le marché ?", "Combien Maman a-t-elle d’enfants ?"], 0, "on calcule d’abord le prix du riz."),
    lettered("Une école reçoit 5 cartons de 40 cahiers. Elle en distribue 165. Combien en reste-t-il ?", "Quelle question intermédiaire faut-il se poser ?", ["Combien de cahiers a-t-elle reçus ?", "Combien de cartons sont vides ?", "Combien d’élèves a l’école ?"], 0, "on cherche d’abord le nombre de cahiers reçus."),
    vf("Dans un problème en deux étapes, la réponse de la question intermédiaire sert pour la question finale.", true, "on l’utilise dans le deuxième calcul."),
    vf("On répond à la question finale avant la question intermédiaire.", false, "on commence par la question intermédiaire."),
  ]),
  quest(4, "poser la bonne question", [
    lettered("Une école a 325 élèves dont 168 filles.", "Quelle question peut-on poser ?", ["Combien y a-t-il de garçons ?", "Quel âge a le directeur ?", "Quelle est la couleur de l’école ?"], 0, "les données permettent de trouver le nombre de garçons."),
    story("Une école a <strong>325</strong> élèves dont <strong>168</strong> filles.", "Combien y a-t-il de garçons ?", 325, "−", 168, "garçons"),
    lettered("Awa achète 4 pains à 175 F l’un.", "Quelle question peut-on poser ?", ["Combien paie-t-elle ?", "Qui a fait le pain ?", "À quelle heure ouvre la boulangerie ?"], 0, "on peut calculer le prix des 4 pains."),
    story("Awa achète <strong>4</strong> pains à <strong>175</strong> F l’un.", "Combien paie-t-elle ?", 175, "×", 4, "F"),
    lettered("Un champ de mil a donné 850 kg ; un champ d’arachide 640 kg.", "Quelle question peut-on poser ?", ["Quelle masse a-t-on récoltée en tout ?", "Combien de pluies sont tombées ?", "Qui a planté le mil ?"], 0, "on peut additionner les deux récoltes."),
    story("Un champ de mil a donné <strong>850</strong> kg ; un champ d’arachide <strong>640</strong> kg.", "Quelle masse a-t-on récoltée en tout ?", 850, "+", 640, "kg"),
    vf("On ne peut poser une question que si les données permettent d’y répondre.", true, "sinon, il manque une donnée."),
    vf("« Quel âge a le vendeur ? » peut se calculer avec le prix des pains.", false, "le prix ne dit rien sur l’âge du vendeur."),
  ]),
  quest(5, "remettre un énoncé dans l’ordre", [
    orderStatement(["Combien lui reste-t-il ?", "Awa a 500 F.", "Elle achète un cahier à 200 F."], [1, 2, 0], "d’abord ce qu’on a, puis ce qui se passe, et la question à la fin."),
    orderStatement(["Il en vend 15.", "Combien lui en reste-t-il ?", "Un fermier a 48 moutons."], [2, 0, 1], "on présente la situation, l’action, puis la question."),
    orderStatement(["Combien de pages lit-il en tout ?", "Modou lit 12 pages par jour.", "Il lit pendant 5 jours."], [1, 2, 0], "la question vient à la fin."),
    orderStatement(["Elle en donne 9 à son frère.", "Fatou a 25 billes.", "Combien lui en reste-t-il ?"], [1, 0, 2], "on commence par ce que Fatou a au départ."),
    story("Awa a <strong>500</strong> F. Elle achète un cahier à <strong>200</strong> F.", "Combien lui reste-t-il ?", 500, "−", 200, "F"),
    story("Modou lit <strong>12</strong> pages par jour pendant <strong>5</strong> jours.", "Combien de pages lit-il en tout ?", 12, "×", 5, "pages"),
    vf("Dans un énoncé, la question est souvent à la fin.", true, "on lit d’abord la situation."),
    vf("L’ordre des phrases d’un énoncé n’a pas d’importance.", false, "l’énoncé raconte la situation dans l’ordre."),
  ]),
  quest(6, "je résous un problème en deux étapes", [
    remains("Ibrahima a <strong>2 000</strong> F. Il achète un livre à <strong>1 200</strong> F et un stylo à <strong>250</strong> F. Combien lui reste-t-il ?", 2000, 1200, 250, "F"),
    remains("Un réservoir contient <strong>500</strong> ℓ d’eau. On en utilise <strong>180</strong> ℓ le matin et <strong>145</strong> ℓ le soir. Combien en reste-t-il ?", 500, 180, 145, "ℓ"),
    steps("Une boutique reçoit <strong>6</strong> caisses de <strong>24</strong> bouteilles. Elle en vend <strong>100</strong>. Combien de bouteilles reste-t-il ?", 6, "×", 24, "−", 100, "bouteilles"),
    steps("Awa économise <strong>250</strong> F par semaine pendant <strong>8</strong> semaines. Elle achète une robe à <strong>1 500</strong> F. Combien lui reste-t-il ?", 250, "×", 8, "−", 1500, "F"),
    steps("Un car part avec <strong>40</strong> passagers. À Kaolack, <strong>15</strong> descendent ; à Fatick, <strong>9</strong> descendent encore. Combien reste-t-il de passagers ?", 40, "−", 15, "−", 9, "passagers"),
    lettered("Ibrahima a 2 000 F. Il achète un livre à 1 200 F et un stylo à 250 F. Combien lui reste-t-il ?", "Quelle question intermédiaire faut-il se poser ?", ["Combien a-t-il dépensé ?", "Quel livre a-t-il acheté ?", "Où est la librairie ?"], 0, "on additionne d’abord les dépenses."),
    vf("Pour trouver ce qui reste après deux achats, on peut d’abord additionner les achats.", true, "puis on soustrait le total de ce qu’on avait."),
    vf("Ibrahima a dépensé 1 200 F en tout.", false, "il a dépensé 1 200 F + 250 F = 1 450 F."),
  ]),
];
