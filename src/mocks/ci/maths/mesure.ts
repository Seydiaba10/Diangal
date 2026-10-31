import "server-only";

// CI, mesure : une série DIANGAL par leçon du cahier de l'école. Trois chapitres : longueurs,
// distances et quantités (long / court, grand / petit, près / loin, beaucoup / peu / rien d'eau),
// « Lourd ou léger ? » (masses comparées à la balance) et « Le temps qui passe » (durées, moments de
// la journée, jours de la semaine). Pas encore d'unités au CI : on compare.

import { longest, tallest } from "../../early-math";
import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { dayNext, fact, glassCompare, glassMost, glassOrder, heavierFruit, nearOrFar } from "../../measure";
import { seriesOf } from "../../cp/maths/helpers";
import { ctx } from "./ensembles";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });

const lengths = seriesOf("Longueurs, distances et quantités");
const D1: [number, number][] = [[140, 30], [220, 140], [100, 150]];
const D2: [number, number][] = [[250, 60], [150, 120], [90, 30]];
const D3: [number, number][] = [[170, 40], [280, 110], [120, 140]];

export const LENGTHS_CI: ExerciseSeries[] = [
  lengths(1, "long, court, grand, petit (1)", [
    longest([8, 4], "le plus long", "ruban"),
    longest([3, 7], "le plus court", "ruban"),
    tallest([80, 64], "le plus grand"),
    tallest([60, 84, 72], "le plus petit"),
    longest([5, 9, 6], "le plus long", "bâton"),
    tallest([70, 58, 90], "le plus grand"),
    vf("Un crayon neuf est plus long qu’un crayon usé.", true, "en le taillant, le crayon devient plus court."),
    vf("Un bébé est plus grand que son papa.", false, "le bébé est plus petit."),
  ]),
  lengths(2, "le plus long, le plus court (2)", [
    longest([6, 9, 4], "le plus long", "crayon"),
    longest([6, 9, 4], "le plus court", "crayon"),
    longest([10, 7, 8, 5], "le plus long", "chemin"),
    longest([10, 7, 8, 5], "le plus court", "chemin"),
    tallest([66, 88, 76], "le plus grand"),
    tallest([92, 70, 80, 62], "le plus petit"),
    fact("Qu’est-ce qui est le plus long ?", ["un crayon", "*une table de classe", "une gomme"], "la table de classe est bien plus longue qu’un crayon ou une gomme."),
    fact("Qu’est-ce qui est le plus court ?", ["*une craie", "une règle", "un banc"], "la craie est toute petite."),
  ]),
  lengths(3, "près, loin (1)", [
    nearOrFar("eleve-garcon", "le garçon", D1, "mangue", "le plus près"),
    nearOrFar("eleve-garcon", "le garçon", D1, "mangue", "le plus loin"),
    nearOrFar("eleve-fille", "la fille", D2, "ballon", "le plus loin"),
    nearOrFar("eleve-fille", "la fille", D2, "ballon", "le plus près"),
    nearOrFar("pasteque", "la pastèque", D3, "banane", "le plus près"),
    nearOrFar("pasteque", "la pastèque", D3, "banane", "le plus loin"),
    vf("Mon banc est près de moi en classe.", true, "il est juste à côté de moi."),
    vf("Le marché est plus près de ma maison que ma chambre.", false, "ma chambre est dans ma maison : elle est plus près."),
  ]),
  lengths(4, "près, loin (2)", [
    nearOrFar("eleve-fille", "la fille", D3, "cahier", "le plus loin"),
    nearOrFar("eleve-fille", "la fille", D3, "cahier", "le plus près"),
    nearOrFar("eleve-garcon", "le garçon", D2, "bonbon", "le plus près"),
    nearOrFar("eleve-garcon", "le garçon", D2, "bonbon", "le plus loin"),
    nearOrFar("pasteque", "la pastèque", D1, "orange", "le plus loin"),
    nearOrFar("pasteque", "la pastèque", D1, "orange", "le plus près"),
    fact("Le coq est plus près de la fille que la vache. Qui est le plus loin de la fille ?", ["le coq", "*la vache"], "si le coq est plus près, la vache est plus loin."),
    vf("Pour aller loin, il faut marcher plus longtemps.", true, "une grande distance demande plus de pas."),
  ]),
  lengths(5, "beaucoup, peu ou pas d’eau", [
    glassMost([6, 2, 0], "le plus"),
    glassMost([6, 2, 0], "le moins"),
    glassMost([1, 5, 3], "le plus"),
    glassMost([3, 0, 5], "le moins"),
    glassCompare([2, 5, 4], 2, "plus"),
    glassCompare([2, 5, 4], 2, "moins"),
    vf("Un verre vide n’a pas d’eau.", true, "vide veut dire qu’il n’y a rien dedans."),
    vf("Un verre plein a peu d’eau.", false, "un verre plein a beaucoup d’eau."),
  ]),
  lengths(6, "plus, moins, autant d’eau", [
    glassCompare([3, 1, 5, 3], 0, "plus"),
    glassCompare([3, 1, 5, 3], 0, "moins"),
    glassCompare([3, 1, 5, 3], 0, "autant"),
    glassCompare([4, 6, 4, 2], 2, "autant"),
    glassOrder([2, 6, 4]),
    glassMost([4, 6, 1, 3], "le plus"),
    glassMost([4, 6, 1, 3], "le moins"),
    vf("Deux verres remplis à la même hauteur ont autant d’eau, s’ils sont pareils.", true, "même verre, même hauteur : même quantité."),
  ]),
  lengths(7, "révision", [
    longest([7, 3, 5], "le plus long", "ruban"),
    tallest([84, 68], "le plus petit"),
    nearOrFar("eleve-garcon", "le garçon", D3, "ballon", "le plus près"),
    glassMost([0, 4, 6], "le moins"),
    glassCompare([5, 2, 6, 5], 0, "autant"),
    longest([4, 8, 6], "le plus court", "bâton"),
    tallest([72, 90, 60], "le plus grand"),
    glassCompare([5, 2, 6, 5], 0, "moins"),
  ]),
  lengths(8, "activités d’intégration", [
    ctx("Ibrahima veut pêcher au fleuve. Il choisit sa canne à pêche.", longest([5, 9, 7], "le plus long", "bâton")),
    ctx("Les poissons sont loin du bord. Ibrahima regarde la distance.", nearOrFar("eleve-garcon", "le garçon", D2, "mangue", "le plus loin")),
    ctx("Pour la fête de Korité, Modou aide sa maman qui est un peu souffrante.", glassMost([5, 1, 3], "le plus")),
    ctx("Modou range les bouteilles de jus.", glassCompare([4, 2, 4], 2, "moins")),
    ctx("Les enfants se mettent en rang pour la photo de classe.", tallest([70, 86, 62, 78], "le plus grand")),
    ctx("Maman coupe des rubans pour décorer la maison.", longest([6, 3, 8], "le plus court", "ruban")),
    vf("Pour ne pas se perdre, il vaut mieux jouer près de la maison.", true, "près de la maison, on reste en sécurité."),
    fact("Quel récipient contient le plus d’eau ?", ["un verre", "*un seau", "une tasse"], "le seau est bien plus grand qu’un verre ou une tasse."),
  ]),
];

const masses = seriesOf("Lourd ou léger ?");

export const MASSES_CI: ExerciseSeries[] = [
  masses(1, "lourd, léger", [
    fact("Quel objet est lourd ?", ["une plume", "*une table", "un crayon"], "une table est difficile à soulever : elle est lourde."),
    fact("Quel objet est léger ?", ["un sac de riz", "une pastèque", "*une feuille"], "une feuille ne pèse presque rien."),
    fact("Quel objet est lourd ?", ["*un marteau", "un cahier", "une gomme"], "le marteau est en fer : il est lourd."),
    fact("Quel objet est léger ?", ["*un ballon gonflé", "un seau d’eau", "une brique"], "le ballon est rempli d’air : il est léger."),
    fact("Quel enfant porte un objet lourd ?", ["Awa, qui porte une plume", "*Modou, qui porte un sac de riz", "Fatou, qui porte un cahier"], "le sac de riz est lourd."),
    fact("Quel objet est le plus léger ?", ["un livre", "*un crayon", "une chaise"], "le crayon est petit et ne pèse presque rien."),
    vf("Une pastèque est plus lourde qu’une mangue.", true, "la pastèque est un gros fruit, bien plus lourd."),
    vf("Une plume est lourde.", false, "une plume est très légère."),
  ]),
  masses(2, "plus lourd, plus léger, aussi lourd", [
    heavierFruit("pasteque", "orange", "gauche", "le plus lourd"),
    heavierFruit("mangue", "banane", "droite", "le plus léger"),
    heavierFruit("orange", "pasteque", "droite", "le plus léger"),
    heavierFruit("banane", "mangue", "gauche", "le plus lourd"),
    heavierFruit("mangue", "orange", "gauche", "le plus léger"),
    heavierFruit("pasteque", "banane", "gauche", "le plus lourd"),
    vf("Sur la balance, le plateau le plus lourd descend.", true, "le côté le plus lourd va vers le bas."),
    vf("Quand la balance est en équilibre, les deux objets sont aussi lourds l’un que l’autre.", true, "aucun plateau ne descend."),
  ]),
  masses(3, "comparer des masses", [
    heavierFruit("orange", "banane", "droite", "le plus lourd"),
    heavierFruit("banane", "pasteque", "droite", "le plus léger"),
    heavierFruit("mangue", "pasteque", "droite", "le plus lourd"),
    heavierFruit("orange", "mangue", "gauche", "le plus léger"),
    fact("Moussa est plus lourd que Mamadou. Qui est le plus léger ?", ["Moussa", "*Mamadou"], "si Moussa est plus lourd, Mamadou est plus léger."),
    fact("Le citron est plus léger que la banane. Qui est le plus lourd ?", ["le citron", "*la banane"], "le plus léger des deux est le citron."),
    fact("La noix de coco est aussi lourde que le melon. Que fait la balance ?", ["*elle reste en équilibre", "elle penche du côté du melon"], "deux masses égales laissent la balance en équilibre."),
    vf("Un objet gros est toujours plus lourd qu’un objet petit.", false, "un gros ballon gonflé est plus léger qu’un petit caillou."),
  ]),
  masses(4, "révision", [
    fact("Quel objet est lourd ?", ["une feuille", "*un marteau", "une plume", "un stylo"], "le marteau est le plus lourd."),
    heavierFruit("pasteque", "mangue", "gauche", "le plus lourd"),
    heavierFruit("banane", "orange", "gauche", "le plus léger"),
    fact("Quel garçon est le plus léger ? Ali pèse moins que Samba.", ["*Ali", "Samba"], "celui qui pèse moins est le plus léger."),
    heavierFruit("mangue", "banane", "droite", "le plus lourd"),
    vf("Pour comparer deux masses, on peut utiliser une balance.", true, "le plateau le plus lourd descend."),
    fact("Quel objet est le plus lourd ?", ["une chaise", "*une armoire", "un cahier"], "l’armoire est un très gros meuble."),
    heavierFruit("orange", "pasteque", "droite", "le plus léger"),
  ]),
  masses(5, "activités d’intégration", [
    ctx("De retour du verger, Amy et Astou comparent leurs fruits.", heavierFruit("pasteque", "mangue", "gauche", "le plus lourd")),
    ctx("Amy pèse deux autres fruits.", heavierFruit("banane", "orange", "droite", "le plus léger")),
    fact("B est plus lourd que A, et C est plus lourd que B. Lequel est le plus lourd ?", ["A", "B", "*C"], "C est plus lourd que B, qui est plus lourd que A."),
    fact("B est plus lourd que A, et C est plus lourd que B. Lequel est le plus léger ?", ["*A", "B", "C"], "A est plus léger que B, donc aussi que C."),
    ctx("Astou porte un panier pour aller au marché.", fact("Que peut-elle porter facilement ?", ["un gros sac de riz", "*un panier de mangues", "une armoire"], "le panier de mangues est assez léger pour elle.")),
    vf("Un sac de riz est plus lourd qu’un sac de plumes de même taille.", true, "le riz pèse bien plus que les plumes."),
    ctx("Au marché, la vendeuse pèse deux fruits.", heavierFruit("orange", "banane", "gauche", "le plus lourd")),
    vf("Pour transporter des objets lourds, on peut utiliser une charrette.", true, "la charrette aide à porter ce qui est trop lourd."),
  ]),
];

const time = seriesOf("Le temps qui passe");

export const TIME_CI: ExerciseSeries[] = [
  time(1, "la durée (1)", [
    fact("Quelle action dure le plus longtemps ?", ["se laver les mains", "*une journée de classe", "boire un verre d’eau"], "la journée de classe dure plusieurs heures."),
    fact("Quelle action dure peu de temps ?", ["*fermer la porte", "aller au marché à pied", "préparer le repas"], "fermer la porte se fait très vite."),
    fact("Quel moyen de transport est le plus rapide ?", ["la charrette", "*la voiture", "la marche"], "la voiture va bien plus vite."),
    fact("Quel moyen de transport est le plus lent ?", ["*la marche", "le car", "le train"], "à pied, on avance lentement."),
    fact("Quelle action est longue ?", ["dire bonjour", "*puiser l’eau pour toute la famille", "ouvrir son cahier"], "il faut beaucoup de temps pour puiser toute cette eau."),
    fact("Quelle action est courte ?", ["*s’asseoir", "faire la lessive", "cultiver le champ"], "s’asseoir prend à peine un instant."),
    vf("Dormir la nuit dure plus longtemps que manger un fruit.", true, "on dort pendant de nombreuses heures."),
    vf("Le vélo est plus lent que la marche.", false, "le vélo va plus vite que la marche."),
  ]),
  time(2, "plus long, plus court, plus rapide (2)", [
    fact("Awa va à l’école à pied, Modou en vélo. Qui arrive le plus vite, s’ils partent ensemble de la même maison ?", ["Awa", "*Modou"], "le vélo est plus rapide que la marche."),
    fact("Quelle activité dure le plus longtemps ?", ["*la journée de classe", "la récréation", "le chant du matin"], "la journée de classe contient la récréation et le chant."),
    fact("Le car met moins de temps que la charrette pour aller à Thiès. Lequel est le plus rapide ?", ["*le car", "la charrette"], "celui qui met moins de temps va plus vite."),
    vf("La récréation dure moins longtemps que la journée de classe.", true, "la récréation n’est qu’une partie de la journée."),
    vf("L’âne est plus rapide que la voiture.", false, "la voiture est bien plus rapide."),
    fact("Quelle action prend le plus de temps ?", ["se brosser les dents", "*prendre le repas en famille", "fermer son cartable"], "le repas en famille dure plus longtemps."),
    fact("Quel animal est le plus lent ?", ["le cheval", "*la tortue", "le chien"], "la tortue avance très lentement."),
    vf("Courir est plus rapide que marcher.", true, "en courant, on va plus vite."),
  ]),
  time(3, "les moments de la journée", [
    fact("À quel moment se lève le soleil ?", ["*le matin", "à midi", "le soir"], "le soleil se lève le matin."),
    fact("Quand prend-on le petit-déjeuner ?", ["*le matin", "à midi", "la nuit"], "c’est le premier repas de la journée, le matin."),
    fact("Quand le soleil est-il le plus haut dans le ciel ?", ["le matin", "*à midi", "le soir"], "à midi, le soleil est au plus haut."),
    fact("Quand fait-on ses devoirs à la maison ?", ["*le soir", "pendant la nuit", "avant de se lever"], "après l’école, on fait ses devoirs le soir."),
    fact("Quand le soleil se couche-t-il ?", ["le matin", "à midi", "*le soir"], "le soleil se couche le soir."),
    fact("Quel moment vient après le matin ?", ["le soir", "*midi", "la nuit"], "l’ordre est : matin, midi, soir."),
    vf("On dort la nuit.", true, "la nuit, on se repose."),
    vf("Le soir vient avant le matin dans la même journée.", false, "dans une journée, le matin vient d’abord, puis midi, puis le soir."),
  ]),
  time(4, "la semaine", [
    fact("Combien y a-t-il de jours dans une semaine ?", ["5", "*7", "10"], "lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche : 7 jours."),
    dayNext("lundi", "après"),
    dayNext("jeudi", "après"),
    dayNext("mercredi", "avant"),
    dayNext("dimanche", "avant"),
    dayNext("samedi", "après"),
    fact("Quel jour manque ? lundi, …, mercredi", ["*mardi", "jeudi", "dimanche"], "après lundi vient mardi, puis mercredi."),
    vf("Après dimanche, une nouvelle semaine commence par lundi.", true, "les jours recommencent chaque semaine."),
  ]),
  time(5, "révision", [
    fact("Quel moyen de déplacement est le plus lent ?", ["*la marche", "la moto", "le car"], "à pied, on avance lentement."),
    fact("Quelle action dure peu de temps ?", ["*se brosser les dents", "prendre le repas", "une journée de classe"], "se brosser les dents prend quelques minutes."),
    fact("À quel moment va-t-on à l’école ?", ["*le matin", "la nuit"], "la classe commence le matin."),
    dayNext("vendredi", "après"),
    dayNext("mardi", "avant"),
    fact("Combien de jours y a-t-il dans une semaine ?", ["6", "*7", "8"], "une semaine compte 7 jours."),
    vf("Midi vient après le matin.", true, "matin, puis midi, puis soir."),
    vf("La moto est plus lente que la marche.", false, "la moto va bien plus vite."),
  ]),
  time(6, "activités d’intégration", [
    ctx("Une charrette, un car et une moto quittent Bambey en même temps, le matin, pour aller à Bambilor.", fact("Lequel arrive le premier ?", ["la charrette", "*le car", "la moto"], "le car roule vite et ne s’arrête pas souvent.")),
    ctx("Une charrette, un car et une moto quittent Bambey en même temps, le matin, pour aller à Bambilor.", fact("Lequel met le temps le plus long ?", ["*la charrette", "le car", "la moto"], "la charrette, tirée par un cheval, est la plus lente.")),
    ctx("Deux élèves de CI font une course : Awa court, Modou marche.", fact("Qui arrive le premier ?", ["*Awa", "Modou"], "courir est plus rapide que marcher.")),
    dayNext("mercredi", "après"),
    fact("Le lundi, Baba va à l’école. Quel jour vient juste après lundi ?", ["dimanche", "*mardi", "jeudi"], "après lundi vient mardi."),
    fact("Le matin, Fatou va à l’école. Le soir, que fait-elle ?", ["*elle fait ses devoirs", "elle prend le petit-déjeuner"], "le petit-déjeuner, c’est le matin ; le soir, on fait ses devoirs."),
    vf("La semaine commence le lundi et finit le dimanche.", true, "lundi est le premier jour, dimanche le septième."),
    dayNext("dimanche", "après"),
  ]),
];
