import "server-only";

// CM1, résolution de problèmes : une série DIANGAL par page du cahier de l'école. Trois chapitres :
// « Comprendre l’énoncé d’un problème » (données utiles, inutiles, manquantes ; consignes ; questions ;
// question finale et questions intermédiaires), « Tableaux, schémas et graphiques » (tableaux,
// factures, schémas, graphiques en barres) et « Démarches de résolution » (énoncé à partir d'une
// résolution, erreur, démarches progressive et régressive, intégrations avec les autres matières).

import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { fact } from "../../measure";
import { countData, lettered, orderStatement } from "../../problems";
import { area, areaOf, barChart, circlePerimeter, convert, perimeter, readTable, remains, steps, story, symmetricDot } from "../../upper-math";
import { seriesOf } from "../../cp/maths/helpers";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });

const understand = seriesOf("Comprendre l’énoncé d’un problème");

export const UNDERSTAND_CM1: ExerciseSeries[] = [
  understand(1, "données utiles, inutiles, manquantes (1)", [
    lettered("Dans son champ de 65 m sur 43 m, Aïssatou récolte 150 kg de concombres et 124 kg d’oignons. Combien de kilogrammes de légumes a-t-elle récoltés ?", "Quelle donnée est inutile ?", ["les dimensions du champ", "150 kg de concombres", "124 kg d’oignons"], 0, "les dimensions du champ ne servent pas à calculer la récolte."),
    story("Aïssatou récolte <strong>150</strong> kg de concombres et <strong>124</strong> kg d’oignons.", "Combien de kilogrammes de légumes a-t-elle récoltés ?", 150, "+", 124, "kg"),
    lettered("Aïssatou vend ses oignons. Combien d’argent reçoit-elle ?", "Quelle donnée manque ?", ["le prix d’un kilogramme d’oignons", "la couleur des oignons", "le nom du marché"], 0, "sans le prix, on ne peut pas calculer."),
    story("Aïssatou vend <strong>124</strong> kg d’oignons à <strong>350</strong> F le kg.", "Combien d’argent reçoit-elle ?", 124, "×", 350, "F"),
    area({ kind: "rectangle", long: 65, wide: 43 }, "m"),
    countData("Dans son champ de <strong>65</strong> m sur <strong>43</strong> m, Aïssatou récolte <strong>150</strong> kg de concombres et <strong>124</strong> kg d’oignons."),
    vf("Une donnée manquante empêche de résoudre le problème.", true, "il faut la trouver ou la demander."),
    vf("Une donnée inutile change le résultat.", false, "elle ne sert pas au calcul."),
  ]),
  understand(2, "données utiles, inutiles, manquantes (2)", [
    lettered("Un élève achète 3 sacs à dos à 4 200 F, 25 stylos à 100 F et une paire de chaussures à 16 000 F. Il a 11 ans. Combien dépense-t-il ?", "Quelle donnée est inutile ?", ["3 sacs à dos", "25 stylos", "11 ans"], 2, "l’âge ne change pas la dépense."),
    story("Il achète <strong>3</strong> sacs à dos à <strong>4 200</strong> F.", "Combien coûtent les sacs ?", 3, "×", 4200, "F"),
    story("Il achète <strong>25</strong> stylos à <strong>100</strong> F.", "Combien coûtent les stylos ?", 25, "×", 100, "F"),
    lettered("Il paie avec un billet. Combien lui rend-on ?", "Quelle donnée manque ?", ["la valeur du billet", "le nombre de stylos", "le prix des chaussures"], 0, "il faut savoir combien il a donné."),
    readTable("Achats de la rentrée", ["prix (F)", "quantité"], [["Sacs à dos", [4200, 3]], ["Stylos", [100, 25]], ["Chaussures", [16000, 1]]], "Stylos", "quantité", "Combien de stylos achète-t-il ?"),
    story("Les sacs coûtent <strong>12 600</strong> F, les stylos <strong>2 500</strong> F.", "Combien pour les sacs et les stylos ?", 12600, "+", 2500, "F"),
    vf("Un tableau aide à ranger les données d’un énoncé.", true, "on voit mieux les prix et les quantités."),
    story("Il a payé <strong>15 100</strong> F pour les sacs et les stylos, puis <strong>16 000</strong> F pour les chaussures.", "Quelle est la dépense totale ?", 15100, "+", 16000, "F"),
  ]),
  understand(3, "données utiles, inutiles, manquantes (3)", [
    lettered("Gnagna prépare un gâteau pour 8 personnes avec 500 g de farine, 250 g de sucre et 4 œufs. Combien de grammes de farine et de sucre utilise-t-elle ?", "Quelles données sont utiles ?", ["500 g et 250 g", "8 personnes et 4 œufs", "4 œufs et 500 g"], 0, "on cherche seulement la farine et le sucre."),
    story("Gnagna utilise <strong>500</strong> g de farine et <strong>250</strong> g de sucre.", "Combien de grammes en tout ?", 500, "+", 250, "g"),
    story("Pour un gâteau, il faut <strong>4</strong> œufs. Gnagna fait <strong>2</strong> gâteaux pareils.", "Combien d’œufs lui faut-il ?", 4, "×", 2, "œufs"),
    lettered("Le gâteau cuit pendant un certain temps. À quelle heure sera-t-il prêt ?", "Quelle donnée manque ?", ["l’heure de mise au four", "la quantité de farine", "le nombre d’œufs"], 0, "il faut savoir quand il est entré au four."),
    convert([[750, "g"]], "kg"),
    vf("Pour répondre, on choisit seulement les données utiles.", true, "les autres sont laissées de côté."),
    countData("Gnagna prépare un gâteau pour <strong>8</strong> personnes avec <strong>500</strong> g de farine, <strong>250</strong> g de sucre et <strong>4</strong> œufs."),
    story("La farine coûte <strong>650</strong> F le kg ; Gnagna en achète <strong>2</strong> kg.", "Combien paie-t-elle ?", 650, "×", 2, "F"),
  ]),
  understand(4, "les consignes", [
    vf("« Calcule le prix total des achats. » est une consigne.", true, "elle demande une action."),
    vf("« Un artisan gagne 4 000 F par jour. » est une consigne.", false, "c’est une donnée."),
    vf("« Trouve combien il gagne en 22 jours. » est une consigne.", true, "« trouve » dit ce qu’il faut faire."),
    story("Un artisan gagne <strong>4 000</strong> F par jour. Trouve combien il gagne en <strong>22</strong> jours.", "Réponse :", 4000, "×", 22, "F"),
    fact("Quel mot commence souvent une consigne ?", ["*Calcule", "Combien", "Pourquoi"], "un verbe d’action à l’impératif."),
    lettered("Un artisan gagne 4 000 F par jour.", "Quelle consigne convient ?", ["Calcule son gain en 5 jours.", "Il aime son travail.", "Le soleil brille."], 0, "elle demande un calcul possible avec la donnée."),
    story("Un artisan gagne <strong>4 000</strong> F par jour. Calcule son gain en <strong>5</strong> jours.", "Réponse :", 4000, "×", 5, "F"),
    vf("Une consigne et une question peuvent demander la même chose.", true, "« Calcule le prix » ou « Quel est le prix ? »."),
  ]),
  understand(5, "les questions", [
    vf("« Combien d’argent lui reste-t-il ? » est une question.", true, "elle finit par « ? »."),
    vf("« Aïda veut acheter une robe. » est une question.", false, "c’est une phrase qui donne une information."),
    lettered("Aïda a 15 000 F. Elle achète une robe à 8 500 F.", "Quelle question peut-on poser ?", ["Combien lui reste-t-il ?", "Quelle est sa couleur préférée ?", "Où habite-t-elle ?"], 0, "les données permettent de calculer le reste."),
    story("Aïda a <strong>15 000</strong> F. Elle achète une robe à <strong>8 500</strong> F.", "Combien lui reste-t-il ?", 15000, "−", 8500, "F"),
    lettered("Un car transporte 48 passagers à 2 500 F.", "Quelle question peut-on poser ?", ["Quelle est la recette du car ?", "Quel est le nom du chauffeur ?", "Quelle heure est-il ?"], 0, "on peut calculer la recette."),
    story("Un car transporte <strong>48</strong> passagers à <strong>2 500</strong> F.", "Quelle est la recette ?", 48, "×", 2500, "F"),
    fact("Une question se termine par…", ["un point", "*un point d’interrogation", "une virgule"], "le signe « ? »."),
    vf("Chaque problème a au moins une question ou une consigne.", true, "elle dit ce qu’on cherche."),
  ]),
  understand(6, "question finale et questions intermédiaires (1)", [
    lettered("Aïda veut acheter 2 robes à 6 500 F. Elle a 15 000 F. Combien lui restera-t-il ?", "Quelle est la question intermédiaire ?", ["Combien coûtent les 2 robes ?", "Combien lui restera-t-il ?"], 0, "on calcule d’abord le prix des robes."),
    steps("Aïda veut acheter <strong>2</strong> robes à <strong>6 500</strong> F. Elle a <strong>15 000</strong> F. Combien lui restera-t-il ?", 2, "×", 6500, "−", 15000, "F", true),
    lettered("Coumba vend 7 bouteilles d’eau à 150 F et 5 jus à 300 F. Combien gagne-t-elle ?", "Quelle est la question finale ?", ["Combien rapportent les bouteilles ?", "Combien gagne-t-elle en tout ?"], 1, "c’est le total des deux ventes."),
    story("Coumba vend <strong>7</strong> bouteilles d’eau à <strong>150</strong> F.", "Combien rapportent les bouteilles ?", 7, "×", 150, "F"),
    story("Les bouteilles rapportent <strong>1 050</strong> F et les jus <strong>1 500</strong> F.", "Combien gagne-t-elle en tout ?", 1050, "+", 1500, "F"),
    vf("On répond aux questions intermédiaires avant la question finale.", true, "elles préparent la réponse."),
    steps("Un marchand ambulant achète <strong>27</strong> montres à <strong>1 500</strong> F. Il les revend toutes <strong>108 000</strong> F. Quel est son bénéfice ?", 27, "×", 1500, "−", 108000, "F", true),
    lettered("Un marchand achète 27 montres à 1 500 F et les revend toutes 108 000 F.", "Quelle est la question intermédiaire ?", ["Combien a-t-il payé les montres ?", "Quel est son bénéfice ?"], 0, "on calcule d’abord le prix d’achat."),
  ]),
  understand(7, "question finale et questions intermédiaires (2)", [
    steps("Un champ produit <strong>2 400</strong> kg de mil vendus <strong>175</strong> F le kg. Le paysan paie <strong>95 000</strong> F d’engrais. Combien gagne-t-il ?", 2400, "×", 175, "−", 95000, "F"),
    lettered("Un champ produit 2 400 kg de mil vendus 175 F le kg. Le paysan paie 95 000 F d’engrais.", "Quelle est la question intermédiaire ?", ["Combien rapporte la vente du mil ?", "Combien gagne-t-il ?"], 0, "on calcule d’abord la vente."),
    remains("Une école reçoit <strong>500 000</strong> F. Elle achète des tables pour <strong>275 000</strong> F et des livres pour <strong>148 500</strong> F. Combien lui reste-t-il ?", 500000, 275000, 148500, "F"),
    steps("Un tailleur vend <strong>15</strong> boubous à <strong>12 000</strong> F, puis dépense <strong>45 000</strong> F de tissu. Combien lui reste-t-il ?", 15, "×", 12000, "−", 45000, "F"),
    vf("Un problème peut avoir plusieurs questions intermédiaires.", true, "on avance étape par étape."),
    steps("<strong>6</strong> classes de <strong>45</strong> élèves vont en excursion ; chaque car a <strong>54</strong> places. Combien de cars faut-il ?", 6, "×", 45, ":", 54, "cars"),
    lettered("6 classes de 45 élèves vont en excursion ; chaque car a 54 places.", "Quelle est la question finale ?", ["Combien d’élèves partent ?", "Combien de cars faut-il ?"], 1, "on cherche à la fin le nombre de cars."),
    steps("Awa achète <strong>3</strong> m de tissu à <strong>2 500</strong> F et paie la couture <strong>5 000</strong> F. Combien paie-t-elle ?", 3, "×", 2500, "+", 5000, "F"),
  ]),
];

const charts = seriesOf("Tableaux, schémas et graphiques");
const SALES = [["lundi", 120], ["mardi", 80], ["mercredi", 150], ["jeudi", 110]] as const;
const L = SALES.map(([d]) => d);
const V = SALES.map(([, v]) => v);

export const CHARTS_CM1: ExerciseSeries[] = [
  charts(1, "tableaux et schémas (1)", [
    steps("Cheikh a <strong>3</strong> ans de moins que Babacar. Astou a <strong>2</strong> ans de plus que Babacar et a <strong>14</strong> ans. Quel âge a Cheikh ?", 14, "−", 2, "−", 3, "ans"),
    story("Astou a <strong>14</strong> ans ; elle a <strong>2</strong> ans de plus que Babacar.", "Quel âge a Babacar ?", 14, "−", 2, "ans"),
    readTable("Récolte d’Aïssatou (kg)", ["semaine 1", "semaine 2"], [["Concombres", [70, 80]], ["Oignons", [64, 60]]], "Oignons", "semaine 1", "Combien de kilogrammes d’oignons en semaine 1 ?"),
    readTable("Récolte d’Aïssatou (kg)", ["semaine 1", "semaine 2"], [["Concombres", [70, 80]], ["Oignons", [64, 60]]], "Concombres", "semaine 2", "Combien de kilogrammes de concombres en semaine 2 ?"),
    story("Concombres : <strong>70</strong> kg en semaine 1 et <strong>80</strong> kg en semaine 2.", "Combien de kilogrammes de concombres en tout ?", 70, "+", 80, "kg"),
    vf("Un schéma aide à voir les relations entre les données.", true, "par exemple « plus que » ou « moins que »."),
    steps("Modou a <strong>5</strong> billes de plus que Samba ; Samba en a <strong>12</strong> de moins que Ali, qui en a <strong>40</strong>. Combien Modou a-t-il de billes ?", 40, "−", 12, "+", 5, "billes"),
    fact("Si A a 3 ans de moins que B, alors B a…", ["*3 ans de plus que A", "3 ans de moins que A", "le même âge que A"], "les deux phrases disent la même chose."),
  ]),
  charts(2, "les graphiques", [
    barChart("Ventes de pain de la boutique", L, V, 50, "mercredi", "Combien de pains ont été vendus le mercredi ?"),
    barChart("Ventes de pain de la boutique", L, V, 50, "mardi", "Combien de pains ont été vendus le mardi ?"),
    barChart("Élèves présents", ["CE2", "CM1", "CM2"], [45, 30, 40], 10, "CM1", "Combien d’élèves de CM1 étaient présents ?"),
    barChart("Élèves présents", ["CE2", "CM1", "CM2"], [45, 30, 40], 10, "CE2", "Combien d’élèves de CE2 étaient présents ?"),
    story("Le mercredi, on vend <strong>150</strong> pains ; le mardi <strong>80</strong>.", "Combien de pains de plus le mercredi ?", 150, "−", 80, "pains"),
    vf("Dans un graphique en barres, la barre la plus haute montre la plus grande valeur.", true, "on lit la hauteur sur l’échelle."),
    fact("Quel jour a-t-on vendu le plus de pain ?", ["lundi", "mardi", "*mercredi"], "c’est la barre la plus haute (150)."),
    barChart("Ventes de pain de la boutique", L, V, 50, "jeudi", "Combien de pains ont été vendus le jeudi ?"),
  ]),
  charts(3, "intégration avec les autres matières (1)", [
    perimeter({ kind: "carré", side: 50 }, "m"),
    story("Le mur du jardin carré fait <strong>200</strong> m. Il coûte <strong>7 500</strong> F le mètre.", "Combien coûte le mur ?", 200, "×", 7500, "F"),
    area({ kind: "carré", side: 50 }, "m"),
    convert([[5, "dam"]], "m"),
    story("Le jardin de <strong>2 500</strong> m² est partagé en <strong>10</strong> parcelles.", "Quelle est l’aire de chaque parcelle (en m²) ?", 2500, ":", 10, "m²"),
    barChart("Légumes récoltés (kg)", ["tomates", "choux", "oignons"], [60, 35, 50], 10, "choux", "Combien de kilogrammes de choux ?"),
    vf("5 dam = 50 m.", true, "1 dam = 10 m."),
    remains("Le maire donne <strong>2 000 000</strong> F. Le mur coûte <strong>1 500 000</strong> F et la porte <strong>175 000</strong> F. Combien reste-t-il ?", 2000000, 1500000, 175000, "F"),
  ]),
  charts(4, "tableaux et schémas (2)", [
    steps("Une dame achète <strong>24</strong> kg d’oignons à <strong>400</strong> F et paie aussi <strong>4 500</strong> F d’huile. Combien dépense-t-elle ?", 24, "×", 400, "+", 4500, "F"),
    readTable("Achats pour la Tabaski", ["quantité", "prix unitaire (F)"], [["Oignons (kg)", [24, 400]], ["Huile (ℓ)", [5, 900]], ["Ail (kg)", [2, 700]]], "Huile (ℓ)", "prix unitaire (F)", "Quel est le prix d’un litre d’huile ?"),
    story("Elle achète <strong>5</strong> ℓ d’huile à <strong>900</strong> F le litre.", "Combien coûte l’huile ?", 5, "×", 900, "F"),
    story("Elle achète <strong>2</strong> kg d’ail à <strong>700</strong> F le kg.", "Combien coûte l’ail ?", 2, "×", 700, "F"),
    readTable("Achats pour la Tabaski", ["quantité", "prix unitaire (F)"], [["Oignons (kg)", [24, 400]], ["Huile (ℓ)", [5, 900]], ["Ail (kg)", [2, 700]]], "Oignons (kg)", "quantité", "Combien de kilogrammes d’oignons achète-t-elle ?"),
    remains("Elle a <strong>20 000</strong> F. Elle paie <strong>9 600</strong> F d’oignons et <strong>4 500</strong> F d’huile. Combien lui reste-t-il ?", 20000, 9600, 4500, "F"),
    vf("Prix total d’un article = quantité × prix unitaire.", true, "on multiplie."),
    story("L’huile coûte <strong>4 500</strong> F et l’ail <strong>1 400</strong> F.", "Combien coûtent l’huile et l’ail ensemble ?", 4500, "+", 1400, "F"),
  ]),
  charts(5, "tableaux et graphiques", [
    barChart("Spectateurs du festival de Saint-Louis", ["vendredi", "samedi", "dimanche"], [1200, 1800, 1500], 300, "samedi", "Combien de spectateurs le samedi ?"),
    barChart("Spectateurs du festival de Saint-Louis", ["vendredi", "samedi", "dimanche"], [1200, 1800, 1500], 300, "vendredi", "Combien de spectateurs le vendredi ?"),
    story("Il y a <strong>1 200</strong> spectateurs vendredi, <strong>1 800</strong> samedi.", "Combien pour ces deux jours ?", 1200, "+", 1800, "spectateurs"),
    story("Le ticket coûte <strong>2 000</strong> F ; dimanche, <strong>1 500</strong> spectateurs.", "Quelle est la recette du dimanche ?", 1500, "×", 2000, "F"),
    readTable("Recettes (F)", ["vendredi", "samedi"], [["Tickets", [2400000, 3600000]], ["Boissons", [350000, 520000]]], "Boissons", "samedi", "Quelle est la recette des boissons le samedi ?"),
    vf("Un graphique permet de comparer des données d’un seul coup d’œil.", true, "on compare les hauteurs."),
    fact("Quel jour y a-t-il eu le moins de spectateurs ?", ["*vendredi", "samedi", "dimanche"], "1 200 est la plus petite valeur."),
    barChart("Spectateurs du festival de Saint-Louis", ["vendredi", "samedi", "dimanche"], [1200, 1800, 1500], 300, "dimanche", "Combien de spectateurs le dimanche ?"),
  ]),
  charts(6, "révision", [
    readTable("Festival de musique", ["jour 1", "jour 2", "jour 3"], [["Spectateurs", [850, 1200, 950]], ["Artistes", [12, 15, 10]]], "Artistes", "jour 2", "Combien d’artistes le jour 2 ?"),
    readTable("Festival de musique", ["jour 1", "jour 2", "jour 3"], [["Spectateurs", [850, 1200, 950]], ["Artistes", [12, 15, 10]]], "Spectateurs", "jour 3", "Combien de spectateurs le jour 3 ?"),
    story("Jour 1 : <strong>850</strong> spectateurs ; jour 2 : <strong>1 200</strong>.", "Combien de spectateurs de plus le jour 2 ?", 1200, "−", 850, "spectateurs"),
    barChart("Artistes par jour", ["jour 1", "jour 2", "jour 3"], [12, 15, 10], 5, "jour 1", "Combien d’artistes le jour 1 ?"),
    steps("<strong>850</strong> spectateurs paient <strong>1 500</strong> F ; les frais sont de <strong>500 000</strong> F. Quel est le bénéfice du jour 1 ?", 850, "×", 1500, "−", 500000, "F"),
    vf("On peut construire un graphique en barres à partir d’un tableau.", true, "une barre par donnée."),
    countData("Le festival accueille <strong>850</strong>, <strong>1 200</strong> puis <strong>950</strong> spectateurs."),
    story("Il y a <strong>12</strong>, <strong>15</strong> et <strong>10</strong> artistes ; les deux premiers jours :", "Combien d’artistes les jours 1 et 2 ?", 12, "+", 15, "artistes"),
  ]),
  charts(7, "activités d’intégration", [
    readTable("Ventes de Tonton Modou (F)", ["achat", "vente"], [["Jour 1", [45000, 62000]], ["Jour 2", [38000, 51000]], ["Jour 3", [52000, 70500]]], "Jour 2", "vente", "Quel est le montant des ventes du jour 2 ?"),
    story("Jour 1 : achat <strong>45 000</strong> F, vente <strong>62 000</strong> F.", "Quel est le bénéfice du jour 1 ?", 62000, "−", 45000, "F"),
    story("Jour 3 : achat <strong>52 000</strong> F, vente <strong>70 500</strong> F.", "Quel est le bénéfice du jour 3 ?", 70500, "−", 52000, "F"),
    barChart("Bénéfices de Tonton Modou (F)", ["jour 1", "jour 2", "jour 3"], [17000, 13000, 18500], 5000, "jour 2", "Quel est le bénéfice du jour 2 ?"),
    story("Bénéfices : <strong>17 000</strong> F et <strong>13 000</strong> F les deux premiers jours.", "Quel est le bénéfice de ces deux jours ?", 17000, "+", 13000, "F"),
    vf("Bénéfice = vente − achat (sans frais).", true, "c’est ce qu’on gagne."),
    fact("Quel jour Tonton Modou a-t-il fait le plus grand bénéfice ?", ["jour 1", "jour 2", "*jour 3"], "18 500 F est le plus grand."),
    story("Les trois bénéfices font <strong>48 500</strong> F, partagés entre <strong>2</strong> associés.", "Combien reçoit chacun ?", 48500, ":", 2, "F"),
  ]),
  charts(8, "factures et tableaux", [
    readTable("Facture de la quincaillerie", ["quantité", "prix unitaire (F)"], [["Sacs de ciment", [8, 4500]], ["Barres de fer", [12, 3250]], ["Brouettes", [1, 22000]]], "Barres de fer", "prix unitaire (F)", "Quel est le prix d’une barre de fer ?"),
    story("<strong>8</strong> sacs de ciment à <strong>4 500</strong> F.", "Quel est le prix des sacs ?", 8, "×", 4500, "F"),
    story("<strong>12</strong> barres de fer à <strong>3 250</strong> F.", "Quel est le prix des barres ?", 12, "×", 3250, "F"),
    remains("Abdou a <strong>100 000</strong> F. Il paie <strong>36 000</strong> F de ciment et <strong>39 000</strong> F de fer. Combien lui reste-t-il ?", 100000, 36000, 39000, "F"),
    vf("Sur une facture, le montant d’une ligne = quantité × prix unitaire.", true, "puis on additionne les lignes."),
    readTable("Facture de la quincaillerie", ["quantité", "prix unitaire (F)"], [["Sacs de ciment", [8, 4500]], ["Barres de fer", [12, 3250]], ["Brouettes", [1, 22000]]], "Sacs de ciment", "quantité", "Combien de sacs de ciment ?"),
    story("Ciment et fer : <strong>75 000</strong> F ; brouette : <strong>22 000</strong> F.", "Quel est le total de la facture ?", 75000, "+", 22000, "F"),
    fact("Le total d’une facture s’obtient en…", ["*additionnant les montants des lignes", "multipliant les quantités", "soustrayant les prix"], "on additionne tout ce qu’on paie."),
  ]),
  charts(9, "schémas et graphiques", [
    barChart("Pluie tombée à Kaolack (mm)", ["juillet", "août", "septembre"], [120, 210, 150], 30, "août", "Combien de millimètres de pluie en août ?"),
    barChart("Pluie tombée à Kaolack (mm)", ["juillet", "août", "septembre"], [120, 210, 150], 30, "juillet", "Combien de millimètres de pluie en juillet ?"),
    story("Août : <strong>210</strong> mm ; juillet : <strong>120</strong> mm.", "Combien de millimètres de plus en août ?", 210, "−", 120, "mm"),
    steps("Fatou a <strong>4</strong> ans de plus que Rama, qui a <strong>3</strong> ans de moins que Ali. Ali a <strong>12</strong> ans. Quel âge a Fatou ?", 12, "−", 3, "+", 4, "ans"),
    vf("Un schéma en segments aide à résoudre un problème de comparaison.", true, "on dessine les longueurs."),
    fact("Quel mois a été le plus pluvieux ?", ["juillet", "*août", "septembre"], "210 mm est la plus grande valeur."),
    story("Juillet et août : <strong>330</strong> mm de pluie ; septembre : <strong>150</strong> mm.", "Combien de millimètres en trois mois ?", 330, "+", 150, "mm"),
    barChart("Pluie tombée à Kaolack (mm)", ["juillet", "août", "septembre"], [120, 210, 150], 30, "septembre", "Combien de millimètres de pluie en septembre ?"),
  ]),
];

const method = seriesOf("Démarches de résolution");

export const METHOD_CM1: ExerciseSeries[] = [
  method(1, "énoncé à partir d’une résolution", [
    lettered("Résolution : 8 × 1 500 = 12 000 F.", "Quel énoncé correspond ?", ["Mame achète 8 chemises à 1 500 F. Combien paie-t-elle ?", "Mame a 8 chemises et en donne 1 500.", "Mame partage 1 500 F entre 8 amies."], 0, "on multiplie le prix d’une chemise par 8."),
    lettered("Résolution : 25 000 − 18 500 = 6 500 F.", "Quel énoncé correspond ?", ["Fatou a 25 000 F et dépense 18 500 F. Combien lui reste-t-il ?", "Fatou gagne 25 000 F et 18 500 F.", "Fatou partage 25 000 F en 18 500 parts."], 0, "on cherche ce qui reste."),
    lettered("Résolution : 36 000 : 4 = 9 000 F.", "Quel énoncé correspond ?", ["On partage 36 000 F entre 4 enfants. Combien chacun ?", "On ajoute 4 F à 36 000 F.", "4 enfants ont 36 000 F chacun."], 0, "partager, c’est diviser."),
    story("Mame achète <strong>8</strong> chemises à <strong>1 500</strong> F.", "Combien paie-t-elle ?", 8, "×", 1500, "F"),
    orderStatement(["Combien lui reste-t-il ?", "Henriette a 20 000 F.", "Elle achète 2 pagnes à 6 000 F."], [1, 2, 0], "on donne les données, puis la question."),
    steps("Henriette a <strong>20 000</strong> F. Elle achète <strong>2</strong> pagnes à <strong>6 000</strong> F. Combien lui reste-t-il ?", 2, "×", 6000, "−", 20000, "F", true),
    vf("On peut écrire un énoncé à partir des calculs d’une résolution.", true, "chaque calcul correspond à une phrase."),
    lettered("Résolution : 3 × 250 = 750 ; 1 000 − 750 = 250 F.", "Quel énoncé correspond ?", ["Ali a 1 000 F, achète 3 cahiers à 250 F. Combien lui reste-t-il ?", "Ali a 250 F et reçoit 1 000 F.", "Ali achète 1 000 cahiers."], 0, "le prix des cahiers puis le reste."),
  ]),
  method(2, "trouver l’erreur", [
    lettered("Coumba a 3 bouquets de 10 fleurs. Mariama a 6 fleurs de moins. Réponse donnée : 10 − 6 = 4 fleurs.", "Quelle est l’erreur ?", ["On a oublié de calculer 3 × 10 = 30 d’abord", "Il fallait additionner 10 + 6", "Il n’y a pas d’erreur"], 0, "Coumba a 30 fleurs ; Mariama en a 30 − 6 = 24."),
    steps("Coumba a <strong>3</strong> bouquets de <strong>10</strong> fleurs. Mariama a <strong>6</strong> fleurs de moins que Coumba. Combien de fleurs a Mariama ?", 3, "×", 10, "−", 6, "fleurs"),
    lettered("12 cahiers à 350 F. Réponse donnée : 12 × 350 = 3 200 F.", "Quelle est l’erreur ?", ["Erreur de calcul : 12 × 350 = 4 200", "Mauvaise opération", "Pas d’erreur"], 0, "12 × 350 = 4 200 F."),
    story("Il achète <strong>12</strong> cahiers à <strong>350</strong> F.", "Combien paie-t-il ?", 12, "×", 350, "F"),
    lettered("Un rectangle de 8 m sur 5 m. Réponse donnée pour l’aire : (8 + 5) × 2 = 26 m².", "Quelle est l’erreur ?", ["On a calculé le périmètre au lieu de l’aire", "Erreur dans l’addition", "Pas d’erreur"], 0, "l’aire = 8 × 5 = 40 m²."),
    area({ kind: "rectangle", long: 8, wide: 5 }, "m"),
    vf("Vérifier un résultat permet de trouver ses erreurs.", true, "par exemple avec la preuve ou une estimation."),
    lettered("On partage 4 500 F entre 3 enfants. Réponse donnée : 4 500 × 3 = 13 500 F.", "Quelle est l’erreur ?", ["Il fallait diviser", "Il fallait additionner", "Pas d’erreur"], 0, "4 500 : 3 = 1 500 F."),
  ]),
  method(3, "la démarche progressive", [
    steps("Aminata a <strong>10 000</strong> F. Elle achète <strong>3</strong> kg de bananes à <strong>800</strong> F le kg. Combien lui reste-t-il ?", 3, "×", 800, "−", 10000, "F", true),
    steps("Aminata achète <strong>6</strong> ℓ d’huile à <strong>1 000</strong> F et a encore <strong>7 600</strong> F. Combien lui reste-t-il après l’huile ?", 6, "×", 1000, "−", 7600, "F", true),
    steps("Un paysan récolte <strong>45</strong> sacs de <strong>50</strong> kg et en vend <strong>1 800</strong> kg. Combien de kilogrammes garde-t-il ?", 45, "×", 50, "−", 1800, "kg"),
    steps("Un car fait <strong>4</strong> voyages de <strong>65</strong> passagers ; chaque passager paie <strong>2 000</strong> F. Quelle est la recette ?", 4, "×", 65, "×", 2000, "F"),
    vf("Dans une démarche progressive, chaque résultat sert à l’étape suivante.", true, "on avance des données vers la question finale."),
    steps("Une école achète <strong>15</strong> ballons à <strong>4 500</strong> F et un filet à <strong>12 500</strong> F. Combien dépense-t-elle ?", 15, "×", 4500, "+", 12500, "F"),
    remains("Aminata a <strong>10 000</strong> F. Elle dépense <strong>2 400</strong> F de bananes et <strong>6 000</strong> F d’huile. Combien lui reste-t-il ?", 10000, 2400, 6000, "F"),
    steps("<strong>8</strong> équipes de <strong>11</strong> joueurs reçoivent chacun <strong>2</strong> maillots. Combien de maillots faut-il ?", 8, "×", 11, "×", 2, "maillots"),
  ]),
  method(4, "intégration avec les autres matières (2)", [
    circlePerimeter("diamètre", 30, "cm"),
    areaOf({ kind: "disque", radius: 15 }, "cm"),
    story("Ibrahima achète une pizza de <strong>30</strong> cm de diamètre à <strong>6 500</strong> F et une boisson à <strong>1 500</strong> F.", "Combien paie-t-il ?", 6500, "+", 1500, "F"),
    story("La pizza de <strong>706,5</strong> cm² est coupée en <strong>4</strong> parts égales.", "Quelle est l’aire de chaque part (en cm²) ?", 706.5, ":", 4, "cm²"),
    symmetricDot(2, 3, [[2, 7], [2, 6], [1, 7]]),
    fact("Une pizza ronde coupée en 8 parts égales : chaque part est…", ["*1/8 de la pizza", "1/4 de la pizza", "8 pizzas"], "on partage en 8."),
    vf("Un disque a une infinité d’axes de symétrie.", true, "chaque diamètre est un axe."),
    convert([[30, "cm"]], "dm"),
  ]),
  method(5, "la démarche régressive", [
    story("Une camionnette vide pèse <strong>4 300</strong> kg. Chargée, elle pèse <strong>4 800</strong> kg.", "Quelle est la masse du chargement (en kg) ?", 4800, "−", 4300, "kg"),
    story("Le chargement de <strong>500</strong> kg est fait de caisses de <strong>10</strong> kg.", "Combien de caisses y a-t-il ?", 500, ":", 10, "caisses"),
    story("Après avoir dépensé <strong>12 750</strong> F, il reste <strong>7 250</strong> F à Moussa.", "Combien avait-il au départ ?", 7250, "+", 12750, "F"),
    story("Après avoir reçu <strong>2 500</strong> F, Awa a <strong>9 000</strong> F.", "Combien avait-elle avant ?", 9000, "−", 2500, "F"),
    vf("Dans une démarche régressive, on part du résultat final pour remonter au début.", true, "on utilise les opérations inverses."),
    steps("Après avoir acheté <strong>3</strong> pagnes à <strong>4 000</strong> F, il reste <strong>3 000</strong> F à Binta. Combien avait-elle ?", 3, "×", 4000, "+", 3000, "F"),
    story("On a partagé un sac en <strong>12</strong> sachets de <strong>2,5</strong> kg.", "Combien pesait le sac (en kg) ?", 12, "×", 2.5, "kg"),
    fact("L’opération inverse de la multiplication est…", ["l’addition", "la soustraction", "*la division"], "on divise pour revenir en arrière."),
  ]),
  method(6, "révision", [
    lettered("Résolution : 5 × 3 000 = 15 000 F ; 20 000 − 15 000 = 5 000 F.", "Quel énoncé correspond ?", ["Abdou a 20 000 F et achète 5 sacs de riz à 3 000 F. Combien lui reste-t-il ?", "Abdou achète 20 000 sacs.", "Abdou a 5 000 F et reçoit 20 000 F."], 0, "prix des sacs, puis le reste."),
    steps("Abdou a <strong>20 000</strong> F. Il achète <strong>5</strong> sacs de riz à <strong>3 000</strong> F. Combien lui reste-t-il ?", 5, "×", 3000, "−", 20000, "F", true),
    story("Après avoir payé <strong>8 500</strong> F, il reste <strong>1 500</strong> F au client.", "Combien avait-il ?", 1500, "+", 8500, "F"),
    lettered("Un carré de 9 m de côté. Réponse donnée pour le périmètre : 9 × 9 = 81 m.", "Quelle est l’erreur ?", ["On a calculé l’aire au lieu du périmètre", "Erreur de calcul", "Pas d’erreur"], 0, "périmètre = 9 × 4 = 36 m."),
    perimeter({ kind: "carré", side: 9 }, "m"),
    barChart("Ventes de lait (ℓ)", ["lundi", "mardi", "mercredi"], [40, 65, 55], 10, "mardi", "Combien de litres de lait le mardi ?"),
    vf("On peut vérifier une démarche régressive en refaisant le problème dans le bon sens.", true, "on doit retrouver la donnée finale."),
    countData("Abdou a <strong>20 000</strong> F. Il achète <strong>5</strong> sacs de riz à <strong>3 000</strong> F."),
  ]),
  method(7, "activités d’intégration", [
    story("Amadou doit prendre un comprimé de <strong>500</strong> mg, <strong>2</strong> fois par jour.", "Combien de milligrammes prend-il par jour ?", 500, "×", 2, "mg"),
    story("Il prend <strong>1 000</strong> mg par jour pendant <strong>7</strong> jours.", "Combien de milligrammes en tout ?", 1000, "×", 7, "mg"),
    convert([[7000, "mg"]], "g"),
    story("Une boîte contient <strong>10</strong> comprimés ; il en faut <strong>14</strong>. Il achète <strong>2</strong> boîtes à <strong>1 750</strong> F.", "Combien paie-t-il ?", 2, "×", 1750, "F"),
    story("Il a <strong>14</strong> comprimés à prendre et <strong>20</strong> dans ses deux boîtes.", "Combien de comprimés restent après le traitement ?", 20, "−", 14, "comprimés"),
    vf("Il faut respecter la dose prescrite par le médecin.", true, "un médicament mal pris peut être dangereux."),
    fact("2 fois par jour pendant 7 jours, cela fait…", ["9 prises", "*14 prises", "21 prises"], "2 × 7 = 14."),
    steps("Amadou paie <strong>3 500</strong> F de médicaments et <strong>2 000</strong> F de consultation avec un billet de <strong>10 000</strong> F. Combien lui rend-on ?", 3500, "+", 2000, "−", 10000, "F", true),
  ]),
  method(8, "intégration avec les autres matières (3)", [
    symmetricDot(1, 3, [[1, 7], [1, 6], [0, 7]]),
    symmetricDot(4, 2, [[4, 8], [4, 7], [3, 8]]),
    areaOf({ kind: "triangle", base: 24, height: 18 }, "cm"),
    area({ kind: "carré", side: 20 }, "cm"),
    story("Le gâteau « A » coûte <strong>7 500</strong> F et le gâteau « B » <strong>5 500</strong> F.", "Combien coûtent les deux gâteaux ?", 7500, "+", 5500, "F"),
    story("Un gâteau est coupé en <strong>12</strong> parts ; <strong>16</strong> invités veulent une part, il en manque.", "Combien de parts manque-t-il ?", 16, "−", 12, "parts"),
    vf("Un cœur dessiné régulièrement a un axe de symétrie.", true, "on peut le plier en deux moitiés pareilles."),
    circlePerimeter("diamètre", 24, "cm"),
  ]),
];
