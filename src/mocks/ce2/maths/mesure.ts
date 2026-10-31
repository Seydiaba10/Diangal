import "server-only";

// CE2, mesure : une série DIANGAL par page du cahier de l'école. Six chapitres : longueurs ; masses
// et capacités ; masse nette, masse brute et durées ; prix et partages ; périmètres ; aires. Les
// conversions, durées, prix et partages sont calculés par mocks/upper-math.ts.

import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { fact } from "../../measure";
import { area, areaGrid, clockRead, convert, duration, perimeter, remains, shareParts, sideFromPerimeter, steps, story } from "../../upper-math";
import { seriesOf } from "../../cp/maths/helpers";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });

const lengths = seriesOf("Les longueurs");

export const LENGTHS_CE2: ExerciseSeries[] = [
  lengths(1, "mètre, décimètre, centimètre, millimètre (1)", [
    convert([[1, "m"]], "cm"),
    convert([[3, "dm"]], "cm"),
    convert([[4, "cm"]], "mm"),
    convert([[2, "cm"], [5, "mm"]], "mm"),
    convert([[2, "m"]], "mm"),
    convert([[6, "dm"], [3, "cm"]], "cm"),
    fact("Quelle unité choisir pour mesurer l’épaisseur d’une pièce de monnaie ?", ["le mètre", "le décimètre", "*le millimètre"], "c’est une toute petite longueur."),
    vf("1 m = 10 dm = 100 cm = 1 000 mm.", true, "chaque unité est 10 fois plus grande que la suivante."),
  ]),
  lengths(2, "mètre, décimètre, centimètre, millimètre (2)", [
    convert([[3, "m"], [4, "dm"]], "cm"),
    convert([[75, "dm"]], "cm"),
    convert([[250, "cm"]], "dm"),
    convert([[4000, "mm"]], "m"),
    story("Une planche mesure <strong>250</strong> cm. On en coupe <strong>75</strong> cm.", "Quelle longueur reste-t-il (en cm) ?", 250, "−", 75, "cm"),
    story("Awa a deux rubans de <strong>45</strong> cm et <strong>38</strong> cm.", "Quelle longueur a-t-elle en tout (en cm) ?", 45, "+", 38, "cm"),
    convert([[1, "m"], [5, "cm"]], "mm"),
    fact("Quel instrument utilise-t-on pour mesurer un cahier ?", ["*le double décimètre", "le mètre ruban de 50 m", "la balance"], "le double décimètre mesure 20 cm."),
  ]),
  lengths(3, "mètre, décamètre, hectomètre, kilomètre", [
    convert([[4, "dam"]], "m"),
    convert([[8, "hm"]], "m"),
    convert([[2, "km"]], "m"),
    convert([[2, "hm"], [5, "dam"]], "m"),
    convert([[3, "km"], [4, "hm"]], "m"),
    convert([[5000, "m"]], "km"),
    story("Un car parcourt <strong>48</strong> km le matin et <strong>35</strong> km l’après-midi.", "Quelle distance a-t-il parcourue (en km) ?", 48, "+", 35, "km"),
    fact("Quelle unité choisir pour la distance entre Dakar et Thiès ?", ["le mètre", "*le kilomètre", "le centimètre"], "c’est une grande distance."),
  ]),
];

const masses = seriesOf("Les masses et les capacités");

export const MASSES_CE2: ExerciseSeries[] = [
  masses(1, "gramme, décigramme, centigramme, milligramme", [
    convert([[1, "g"]], "mg"),
    convert([[3, "dg"]], "cg"),
    convert([[2, "cg"], [5, "mg"]], "mg"),
    convert([[4, "g"], [2, "dg"]], "cg"),
    convert([[500, "mg"]], "cg"),
    fact("Quelle unité choisir pour la masse d’un grain de riz ?", ["le kilogramme", "*le milligramme", "la tonne"], "un grain de riz ne pèse presque rien."),
    vf("1 g = 1 000 mg.", true, "1 g = 10 dg = 100 cg = 1 000 mg."),
    convert([[7, "g"]], "dg"),
  ]),
  masses(2, "kilogramme, hectogramme, décagramme, gramme", [
    convert([[1, "kg"]], "g"),
    convert([[2, "kg"], [3, "hg"], [5, "dag"], [8, "g"]], "g"),
    convert([[4, "hg"]], "g"),
    convert([[6, "dag"]], "g"),
    convert([[3000, "g"]], "kg"),
    story("Maman achète <strong>2 000</strong> g de viande et <strong>750</strong> g de poisson.", "Quelle masse a-t-elle achetée en tout (en g) ?", 2000, "+", 750, "g"),
    convert([[5, "kg"], [250, "g"]], "g"),
    fact("Quelle masse est la plus lourde ?", ["900 g", "*1 kg 50 g", "9 hg"], "1 kg 50 g = 1 050 g, plus que 900 g."),
  ]),
  masses(3, "tonne, quintal, kilogramme", [
    convert([[1, "t"]], "kg"),
    convert([[1, "q"]], "kg"),
    convert([[2, "t"], [3, "q"], [5, "kg"]], "kg"),
    convert([[7, "q"]], "kg"),
    convert([[4000, "kg"]], "t"),
    story("Un camion transporte <strong>3 500</strong> kg de riz et <strong>1 200</strong> kg de sucre.", "Quelle masse transporte-t-il (en kg) ?", 3500, "+", 1200, "kg"),
    story("Un grenier contient <strong>2 800</strong> kg de mil. On en vend <strong>950</strong> kg.", "Combien de kilogrammes reste-t-il ?", 2800, "−", 950, "kg"),
    vf("1 t = 10 q = 1 000 kg.", true, "un quintal vaut 100 kg."),
  ]),
  masses(4, "litre, décilitre, centilitre, millilitre", [
    convert([[1, "ℓ"]], "cℓ"),
    convert([[2, "ℓ"], [5, "dℓ"]], "dℓ"),
    convert([[3, "dℓ"]], "mℓ"),
    convert([[33, "cℓ"]], "mℓ"),
    convert([[500, "cℓ"]], "ℓ"),
    fact("Quelle est la capacité d’une canette de jus ?", ["33 ℓ", "*33 cℓ", "33 hℓ"], "une canette contient un peu plus d’un tiers de litre."),
    story("Une bouteille contient <strong>150</strong> cℓ de jus. On en verse <strong>45</strong> cℓ.", "Combien de centilitres reste-t-il ?", 150, "−", 45, "cℓ"),
    vf("1 ℓ = 10 dℓ = 100 cℓ = 1 000 mℓ.", true, "chaque unité est 10 fois plus petite que la précédente."),
  ]),
  masses(5, "hectolitre, décalitre, litre", [
    convert([[1, "hℓ"]], "ℓ"),
    convert([[3, "daℓ"]], "ℓ"),
    convert([[2, "hℓ"], [4, "daℓ"]], "ℓ"),
    convert([[500, "ℓ"]], "hℓ"),
    convert([[7, "hℓ"]], "daℓ"),
    story("Avec l’eau d’un fût, on remplit <strong>8</strong> bidons de <strong>20</strong> ℓ.", "Combien de litres d’eau a-t-on versés dans les bidons ?", 8, "×", 20, "ℓ"),
    fact("Quelle unité choisir pour la capacité d’un grand tonneau ?", ["le millilitre", "le centilitre", "*l’hectolitre"], "un tonneau contient beaucoup de litres."),
    vf("1 hℓ = 10 daℓ = 100 ℓ.", true, "un décalitre vaut 10 litres."),
  ]),
  masses(6, "révision", [
    convert([[4, "dam"]], "m"),
    convert([[8, "hm"]], "dam"),
    convert([[2, "km"]], "dam"),
    convert([[75, "dm"]], "cm"),
    convert([[3, "kg"], [5, "hg"]], "g"),
    convert([[2, "t"], [8, "q"]], "kg"),
    convert([[4, "ℓ"], [5, "cℓ"]], "cℓ"),
    convert([[6, "hℓ"]], "ℓ"),
  ]),
  masses(7, "activités d’intégration", [
    story("Le chef du village de Diakhao doit parcourir <strong>48</strong> km aller et <strong>48</strong> km retour.", "Quelle distance parcourt-il en tout (en km) ?", 48, "+", 48, "km"),
    story("La route vers le village voisin mesure <strong>96</strong> km. Le chef s’arrête tous les <strong>12</strong> km pour se reposer.", "En combien de tronçons de 12 km la route est-elle partagée ?", 96, ":", 12, "tronçons"),
    convert([[48, "km"]], "m"),
    story("Le chef achète <strong>3</strong> sacs de riz de <strong>50</strong> kg.", "Quelle masse de riz achète-t-il (en kg) ?", 3, "×", 50, "kg"),
    convert([[1, "q"], [50, "kg"]], "kg"),
    story("Il remplit un réservoir de <strong>60</strong> ℓ qui contenait déjà <strong>15</strong> ℓ.", "Combien de litres ajoute-t-il ?", 60, "−", 15, "ℓ"),
    convert([[60, "ℓ"]], "daℓ"),
    fact("Pour mesurer la quantité d’essence, on utilise…", ["le kilogramme", "*le litre", "le mètre"], "l’essence est un liquide : on mesure sa capacité."),
  ]),
];

const net = seriesOf("Masse nette, masse brute et durées");

export const NET_CE2: ExerciseSeries[] = [
  net(1, "masse nette, masse brute, tare", [
    story("Un panier vide pèse <strong>400</strong> g. Il contient <strong>3 000</strong> g de mangues.", "Quelle est la masse brute (en g) ?", 3000, "+", 400, "g"),
    story("La masse brute d’un sac de riz est de <strong>51</strong> kg. Le sac vide (la tare) pèse <strong>1</strong> kg.", "Quelle est la masse nette (en kg) ?", 51, "−", 1, "kg"),
    story("Une boîte de lait a une masse brute de <strong>500</strong> g et une masse nette de <strong>450</strong> g.", "Quelle est la tare (en g) ?", 500, "−", 450, "g"),
    story("Un bidon vide pèse <strong>2</strong> kg. On y met <strong>18</strong> kg d’huile.", "Quelle est la masse brute (en kg) ?", 18, "+", 2, "kg"),
    vf("Masse brute = masse nette + tare.", true, "la masse brute est celle du contenu et de l’emballage."),
    vf("La tare est la masse de la marchandise seule.", false, "la tare est la masse de l’emballage vide."),
    fact("Sur un paquet de sucre, « poids net : 1 kg » indique la masse…", ["*du sucre seul", "de l’emballage seul", "du sucre et de l’emballage"], "la masse nette est celle de la marchandise."),
    story("Une caisse pleine pèse <strong>25</strong> kg ; la caisse vide pèse <strong>3</strong> kg.", "Quelle est la masse nette des tomates (en kg) ?", 25, "−", 3, "kg"),
  ]),
  net(2, "heure, minute, seconde", [
    clockRead(7, 25),
    clockRead(3, 40),
    clockRead(10, 15),
    convert([[1, "h"]], "min"),
    convert([[2, "h"], [15, "min"]], "min"),
    convert([[3, "min"]], "s"),
    convert([[180, "min"]], "h"),
    vf("1 minute = 60 secondes.", true, "la grande aiguille des secondes fait un tour."),
  ]),
  net(3, "le temps mis", [
    duration([7, 10], [7, 34]),
    duration([9, 30], [10, 30]),
    duration([8, 15], [9, 0]),
    duration([13, 45], [15, 5]),
    duration([6, 50], [8, 20]),
    duration([9, 30], [11, 15]),
    fact("La récréation commence à 10 h et dure 30 minutes. À quelle heure finit-elle ?", ["10 h 03", "*10 h 30", "11 h"], "10 h + 30 min = 10 h 30."),
    clockRead(9, 50),
  ]),
];

const prices = seriesOf("Prix et partages");

export const PRICES_CE2: ExerciseSeries[] = [
  prices(1, "prix d’achat, frais, prix de revient", [
    story("Une commerçante achète des fruits à <strong>50 000</strong> F et paie le taxi <strong>4 000</strong> F.", "Quel est le prix de revient (en F) ?", 50000, "+", 4000, "F"),
    story("Un tailleur achète du tissu à <strong>12 500</strong> F et paie <strong>1 500</strong> F de transport.", "Quel est le prix de revient du tissu ?", 12500, "+", 1500, "F"),
    story("Le prix de revient d’un vélo est <strong>45 000</strong> F ; les frais de réparation sont de <strong>7 000</strong> F.", "Quel était le prix d’achat ?", 45000, "−", 7000, "F"),
    vf("Prix de revient = prix d’achat + frais.", true, "on ajoute tout ce qu’on a dépensé."),
    story("Un boutiquier achète <strong>20</strong> cartons de savon à <strong>2 500</strong> F le carton.", "Quel est le prix d’achat des cartons ?", 20, "×", 2500, "F"),
    story("Le prix d’achat des cartons est <strong>50 000</strong> F et le transport coûte <strong>3 500</strong> F.", "Quel est le prix de revient ?", 50000, "+", 3500, "F"),
    fact("Les frais sont…", ["*les dépenses en plus de l’achat", "le bénéfice", "le prix de vente"], "par exemple le transport ou la réparation."),
    vf("Le prix de revient est toujours plus petit que le prix d’achat.", false, "il est plus grand, car on ajoute les frais."),
  ]),
  prices(2, "prix de vente et bénéfice", [
    story("Un commerçant a un prix de revient de <strong>54 000</strong> F. Il vend tout à <strong>62 500</strong> F.", "Quel est son bénéfice ?", 62500, "−", 54000, "F"),
    story("Un mouton revient à <strong>75 000</strong> F à l’éleveur. Il le vend <strong>90 000</strong> F.", "Quel est le bénéfice ?", 90000, "−", 75000, "F"),
    story("Une vendeuse revient à <strong>8 500</strong> F pour ses beignets et gagne <strong>3 000</strong> F de bénéfice.", "Quel est le prix de vente ?", 8500, "+", 3000, "F"),
    vf("Bénéfice = prix de vente − prix de revient.", true, "c’est ce qu’on gagne."),
    steps("Un marchand vend ses oranges <strong>26 000</strong> F. Il les avait achetées <strong>18 000</strong> F et avait payé <strong>2 000</strong> F de transport. Quel est son bénéfice ?", 26000, "−", 18000, "−", 2000, "F"),
    fact("Il y a bénéfice quand…", ["*le prix de vente est plus grand que le prix de revient", "le prix de vente est plus petit", "on ne vend rien"], "on vend plus cher que ce que l’on a dépensé."),
    story("Un poulet revient à <strong>2 750</strong> F et il est vendu <strong>3 500</strong> F.", "Quel est le bénéfice ?", 3500, "−", 2750, "F"),
    story("Un bénéfice de <strong>1 250</strong> F est fait sur <strong>4</strong> pagnes, le même sur chacun.", "Quel est le bénéfice total ?", 1250, "×", 4, "F"),
  ]),
  prices(3, "prix de vente et perte", [
    story("Un vélo d’occasion revient à <strong>90 000</strong> F. Il est vendu <strong>80 000</strong> F.", "Quelle est la perte ?", 90000, "−", 80000, "F"),
    story("Des tomates reviennent à <strong>15 000</strong> F. Abîmées, elles sont vendues <strong>9 500</strong> F.", "Quelle est la perte ?", 15000, "−", 9500, "F"),
    story("Un revendeur perd <strong>2 500</strong> F sur un téléphone vendu <strong>22 500</strong> F.", "Quel était le prix de revient ?", 22500, "+", 2500, "F"),
    vf("Perte = prix de revient − prix de vente.", true, "on perd quand on vend moins cher que ce que l’on a dépensé."),
    fact("Il y a perte quand…", ["le prix de vente est plus grand que le prix de revient", "*le prix de vente est plus petit que le prix de revient", "les deux prix sont égaux"], "on récupère moins d’argent que ce qu’on a dépensé."),
    story("Une chèvre achetée <strong>35 000</strong> F est revendue <strong>31 000</strong> F.", "Quelle est la perte ?", 35000, "−", 31000, "F"),
    fact("Un objet revient à 10 000 F et est vendu 10 000 F. Que fait le vendeur ?", ["un bénéfice", "une perte", "*ni bénéfice ni perte"], "il récupère exactement ce qu’il a dépensé."),
    story("Un commerçant perd <strong>750</strong> F sur chacun de ses <strong>8</strong> sacs abîmés.", "Quelle est la perte totale ?", 750, "×", 8, "F"),
  ]),
  prices(4, "parts égales", [
    story("Une bande de <strong>84</strong> m est coupée en <strong>4</strong> morceaux de même longueur.", "Combien mesure chaque morceau (en m) ?", 84, ":", 4, "m"),
    story("On partage <strong>24 000</strong> F entre <strong>6</strong> enfants.", "Combien reçoit chaque enfant ?", 24000, ":", 6, "F"),
    story("<strong>96</strong> élèves forment <strong>8</strong> équipes égales.", "Combien d’élèves y a-t-il par équipe ?", 96, ":", 8, "élèves"),
    story("Chaque part vaut <strong>1 500</strong> F et il y a <strong>5</strong> parts.", "Quelle somme a été partagée ?", 1500, "×", 5, "F"),
    vf("Valeur d’une part = total : nombre de parts.", true, "on partage le total en parts égales."),
    story("Un champ de <strong>3 600</strong> m² est partagé entre <strong>3</strong> frères.", "Quelle surface reçoit chacun (en m²) ?", 3600, ":", 3, "m²"),
    story("On verse <strong>45</strong> ℓ d’eau dans <strong>9</strong> bidons, autant dans chacun.", "Combien de litres y a-t-il dans chaque bidon ?", 45, ":", 9, "ℓ"),
    fact("On partage 100 billes en 4 parts égales. Combien y a-t-il dans chaque part ?", ["20", "*25", "40"], "100 : 4 = 25."),
  ]),
  prices(5, "parts proportionnelles", [
    shareParts(25000, [["Awa", 3], ["Modou", 2]], "Awa", "F"),
    shareParts(25000, [["Awa", 3], ["Modou", 2]], "Modou", "F"),
    shareParts(18000, [["Fatou", 1], ["Binta", 2]], "Binta", "F"),
    shareParts(42000, [["Samba", 4], ["Ali", 3]], "Samba", "F"),
    story("<strong>1</strong> bonbon coûte <strong>10</strong> F.", "Combien coûtent <strong>6</strong> bonbons ?", 6, "×", 10, "F"),
    story("<strong>3</strong> cahiers coûtent <strong>750</strong> F.", "Combien coûte un cahier ?", 750, ":", 3, "F"),
    vf("Si 2 pains coûtent 300 F, alors 4 pains coûtent 600 F.", true, "deux fois plus de pains, deux fois plus cher."),
    shareParts(36000, [["Ibou", 5], ["Khady", 4]], "Khady", "F"),
  ]),
  prices(6, "révision", [
    clockRead(8, 35),
    duration([10, 20], [11, 5]),
    story("Le prix d’achat est <strong>30 000</strong> F et les frais <strong>2 500</strong> F.", "Quel est le prix de revient ?", 30000, "+", 2500, "F"),
    story("Le prix de revient est <strong>32 500</strong> F et le prix de vente <strong>40 000</strong> F.", "Quel est le bénéfice ?", 40000, "−", 32500, "F"),
    story("Le prix de revient est <strong>32 500</strong> F et le prix de vente <strong>30 000</strong> F.", "Quelle est la perte ?", 32500, "−", 30000, "F"),
    shareParts(30000, [["Rama", 2], ["Sidi", 1]], "Rama", "F"),
    story("Une corde de <strong>63</strong> m est coupée en <strong>7</strong> parts égales.", "Combien mesure chaque part (en m) ?", 63, ":", 7, "m"),
    convert([[1, "h"], [40, "min"]], "min"),
  ]),
  prices(7, "activités d’intégration", [
    story("Birame transporte <strong>800</strong> kg de sel au marché. Il le vend <strong>75</strong> F le kilogramme.", "Combien d’argent reçoit-il ?", 800, "×", 75, "F"),
    story("Birame avait acheté le sel <strong>45 000</strong> F et payé <strong>6 000</strong> F de transport.", "Quel est le prix de revient du sel ?", 45000, "+", 6000, "F"),
    story("Birame vend le sel <strong>60 000</strong> F. Son prix de revient est <strong>51 000</strong> F.", "Quel est son bénéfice ?", 60000, "−", 51000, "F"),
    shareParts(9000, [["Birame", 2], ["son aide", 1]], "son aide", "F"),
    duration([6, 30], [8, 45]),
    remains("Birame a <strong>60 000</strong> F. Il rembourse une dette de <strong>15 000</strong> F et achète du riz pour <strong>12 500</strong> F. Combien lui reste-t-il ?", 60000, 15000, 12500, "F"),
    vf("Si le prix de vente est plus grand que le prix de revient, il y a bénéfice.", true, "on gagne de l’argent."),
    clockRead(11, 20),
  ]),
];

const perim = seriesOf("Les périmètres");

export const PERIMETERS_CE2: ExerciseSeries[] = [
  perim(1, "le périmètre du carré (1)", [
    perimeter({ kind: "carré", side: 10 }, "cm"),
    perimeter({ kind: "carré", side: 7 }, "m"),
    perimeter({ kind: "carré", side: 25 }, "m"),
    perimeter({ kind: "carré", side: 12 }, "cm", true),
    perimeter({ kind: "carré", side: 45 }, "dm"),
    vf("Le périmètre d’un carré = côté × 4.", true, "ses 4 côtés sont égaux."),
    perimeter({ kind: "carré", side: 9 }, "km", true),
    fact("Le périmètre, c’est…", ["*la longueur du tour de la figure", "la surface de la figure", "la longueur d’un côté"], "on fait le tour de la figure."),
  ]),
  perim(2, "le périmètre du rectangle (1)", [
    perimeter({ kind: "rectangle", long: 6, wide: 4 }, "cm"),
    perimeter({ kind: "rectangle", long: 8, wide: 4 }, "m"),
    perimeter({ kind: "rectangle", long: 11, wide: 7 }, "cm", true),
    perimeter({ kind: "rectangle", long: 35, wide: 15 }, "m"),
    perimeter({ kind: "rectangle", long: 120, wide: 80 }, "m"),
    vf("Le périmètre d’un rectangle = (longueur + largeur) × 2.", true, "deux longueurs et deux largeurs."),
    perimeter({ kind: "rectangle", long: 9, wide: 5 }, "dm", true),
    perimeter({ kind: "rectangle", long: 25, wide: 15 }, "m"),
  ]),
  perim(3, "le côté du carré", [
    sideFromPerimeter("carré", 80, "cm"),
    sideFromPerimeter("carré", 4, "hm", undefined, true),
    sideFromPerimeter("carré", 36, "m"),
    sideFromPerimeter("carré", 100, "dm"),
    sideFromPerimeter("carré", 30, "cm", undefined, true),
    vf("Côté du carré = périmètre : 4.", true, "les 4 côtés sont égaux."),
    sideFromPerimeter("carré", 2000, "m"),
    fact("Un carré a 20 cm de demi-périmètre. Combien mesure son côté ?", ["5 cm", "*10 cm", "40 cm"], "demi-périmètre : 2 = 20 : 2 = 10 cm."),
  ]),
  perim(4, "longueur et largeur du rectangle", [
    sideFromPerimeter("rectangle", 100, "dm", 20, true),
    sideFromPerimeter("rectangle", 60, "m", 12),
    sideFromPerimeter("rectangle", 36, "cm", 7),
    sideFromPerimeter("rectangle", 50, "m", 10, true),
    sideFromPerimeter("rectangle", 240, "m", 45),
    vf("Longueur = demi-périmètre − largeur.", true, "le demi-périmètre est longueur + largeur."),
    sideFromPerimeter("rectangle", 18, "cm", 4, true),
    fact("Un rectangle a 30 m de demi-périmètre et 18 m de longueur. Combien mesure sa largeur ?", ["*12 m", "48 m", "15 m"], "30 − 18 = 12 m."),
  ]),
  perim(5, "le périmètre du triangle", [
    perimeter({ kind: "triangle", sides: [5, 5, 5] }, "cm"),
    perimeter({ kind: "triangle", sides: [6, 8, 10] }, "cm"),
    perimeter({ kind: "triangle", sides: [12, 12, 9] }, "m"),
    perimeter({ kind: "triangle", sides: [25, 30, 35] }, "m"),
    perimeter({ kind: "triangle", sides: [7, 7, 7] }, "dm"),
    vf("Le périmètre d’un triangle équilatéral = côté × 3.", true, "ses 3 côtés sont égaux."),
    fact("Un triangle équilatéral a un périmètre de 27 cm. Combien mesure un côté ?", ["*9 cm", "27 cm", "3 cm"], "27 : 3 = 9 cm."),
    perimeter({ kind: "triangle", sides: [40, 50, 60] }, "m"),
  ]),
];

const areas = seriesOf("Les aires");

export const AREAS_CE2: ExerciseSeries[] = [
  areas(1, "le mètre carré (1)", [
    fact("Un mètre carré (1 m²), c’est l’aire…", ["*d’un carré de 1 m de côté", "d’un rectangle de 1 m de tour", "d’une ligne de 1 m"], "c’est l’unité principale des aires."),
    fact("Quelle est la longueur d’un côté d’un carré de 1 m² ?", ["*1 m", "2 m", "4 m"], "1 m × 1 m = 1 m²."),
    areaGrid(4, 3),
    areaGrid(5, 2),
    fact("Quelle unité choisir pour l’aire d’une salle de classe ?", ["le cm²", "*le m²", "le km²"], "la salle mesure quelques dizaines de m²."),
    vf("L’aire mesure la surface d’une figure.", true, "le périmètre mesure le tour, l’aire la surface."),
    areaGrid(6, 3),
    fact("Un tapis est fait de 6 carrés de 1 m². Quelle est son aire ?", ["4 m²", "*6 m²", "12 m²"], "6 carrés de 1 m² : 6 m²."),
  ]),
  areas(2, "le mètre carré (2) : dm² et cm²", [
    convert([[1, "m²"]], "dm²"),
    convert([[1, "dm²"]], "cm²"),
    convert([[6, "dm²"]], "cm²"),
    convert([[3, "m²"]], "dm²"),
    convert([[400, "cm²"]], "dm²"),
    vf("1 dm² = 100 cm².", true, "un carré de 10 cm sur 10 cm contient 100 carrés de 1 cm²."),
    areaGrid(7, 4),
    fact("Quelle unité choisir pour l’aire d’une page de cahier ?", ["*le cm²", "le m²", "le km²"], "la page est petite."),
  ]),
  areas(3, "l’aire du carré", [
    area({ kind: "carré", side: 3 }, "cm"),
    area({ kind: "carré", side: 6 }, "cm"),
    area({ kind: "carré", side: 9 }, "m"),
    area({ kind: "carré", side: 12 }, "m"),
    area({ kind: "carré", side: 20 }, "dm"),
    vf("Aire du carré = côté × côté.", true, "on compte les carrés de 1 unité sur chaque ligne et chaque colonne."),
    areaGrid(5, 5),
    fact("Un carré a 7 m de côté. Quelle est son aire ?", ["14 m²", "28 m²", "*49 m²"], "7 × 7 = 49 m²."),
  ]),
  areas(4, "l’aire du rectangle", [
    areaGrid(6, 3),
    area({ kind: "rectangle", long: 6, wide: 3 }, "cm"),
    area({ kind: "rectangle", long: 8, wide: 5 }, "m"),
    area({ kind: "rectangle", long: 15, wide: 8 }, "m"),
    area({ kind: "rectangle", long: 25, wide: 12 }, "m"),
    vf("Aire du rectangle = longueur × largeur.", true, "on compte les rangées de carrés."),
    area({ kind: "rectangle", long: 40, wide: 30 }, "dm"),
    fact("Un rectangle a 10 m de longueur et 4 m de largeur. Quelle est son aire ?", ["14 m²", "28 m²", "*40 m²"], "10 × 4 = 40 m²."),
  ]),
  areas(5, "révision", [
    perimeter({ kind: "rectangle", long: 35, wide: 65 }, "cm"),
    perimeter({ kind: "rectangle", long: 1350, wide: 650 }, "m"),
    area({ kind: "carré", side: 8 }, "m"),
    area({ kind: "rectangle", long: 12, wide: 9 }, "cm"),
    sideFromPerimeter("carré", 64, "m"),
    convert([[2, "m²"]], "dm²"),
    convert([[2000, "m"]], "km"),
    vf("Un carré de 4 cm de côté a un périmètre de 16 cm et une aire de 16 cm².", true, "4 × 4 = 16 cm et 4 × 4 = 16 cm²."),
  ]),
  areas(6, "activités d’intégration", [
    area({ kind: "rectangle", long: 15, wide: 8 }, "m"),
    story("Pour carreler une salle de <strong>120</strong> m², le comité de gestion paie <strong>800</strong> F par m² de main-d’œuvre.", "Combien paie-t-il ?", 120, "×", 800, "F"),
    perimeter({ kind: "rectangle", long: 15, wide: 8 }, "m"),
    story("La plinthe coûte <strong>1 500</strong> F le mètre. Il en faut <strong>46</strong> m.", "Combien coûte la plinthe ?", 46, "×", 1500, "F"),
    area({ kind: "carré", side: 30 }, "m"),
    story("Un champ carré de <strong>900</strong> m² est partagé entre <strong>3</strong> familles.", "Quelle surface reçoit chaque famille (en m²) ?", 900, ":", 3, "m²"),
    perimeter({ kind: "carré", side: 30 }, "m"),
    vf("Pour clôturer un champ, on calcule son périmètre ; pour le cultiver, on calcule son aire.", true, "la clôture fait le tour, la culture couvre la surface."),
  ]),
];
