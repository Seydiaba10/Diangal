import "server-only";

// CI, résolution de problèmes : une série DIANGAL par leçon du cahier de l'école. Trois chapitres :
// « Observer une image » (ordre logique, indices, modèle, rythmes, tableaux à double entrée),
// « Comprendre un problème » (informations utiles, inutiles, manquantes, problème mathématique,
// données, questions, consignes, intégrations) et « Résoudre un petit problème » (données utiles et
// inutiles, question finale, questions intermédiaires, intégrations).

import { besideOf, copyOfModel, faceOf, growing, inQueue, intruder, likesTable, whichSolid } from "../../early-math";
import type { ExerciseSeries, ExerciseSpec } from "../../exercise-series";
import { nextShape } from "../../geometry";
import { dayNext, fact, heavierFruit, nearOrFar } from "../../measure";
import { bandGap, storyOp } from "../../primary-exercises";
import { countData, lettered, orderStatement, twoSteps, whatRemains } from "../../problems";
import { seriesOf } from "../../cp/maths/helpers";
import { ctx } from "./ensembles";

const vf = (statement: string, answer: boolean, why: string): ExerciseSpec => ({ vf: statement, answer, why: `<strong>${answer ? "Vrai" : "Faux"}</strong> : ${why}` });
const STEPS = "Voici des étapes en désordre :";

// ── Observer une image ──────────────────────────────────────────────────────

const images = seriesOf("Observer une image");
const KIDS = ["Awa", "Modou", "Fatou"];

export const IMAGES_CI: ExerciseSeries[] = [
  images(1, "remettre dans le bon ordre", [
    orderStatement(["On arrose la graine.", "On creuse un petit trou.", "La plante pousse.", "On met la graine dans le trou."], [1, 3, 0, 2], "on creuse, on sème, on arrose, puis la plante pousse.", STEPS),
    orderStatement(["On mange le repas.", "On lave les légumes.", "On fait cuire les légumes."], [1, 2, 0], "on lave, on fait cuire, puis on mange.", STEPS),
    orderStatement(["On met ses chaussures.", "On se lève.", "On va à l’école.", "On se lave."], [1, 3, 0, 2], "on se lève, on se lave, on se chausse, puis on part.", STEPS),
    orderStatement(["On dessine le toit.", "On dessine les murs de la maison.", "On colorie la maison.", "On dessine la porte."], [1, 0, 3, 2], "d’abord les murs, puis le toit et la porte, et on colorie à la fin.", STEPS),
    fact("Le bébé, l’enfant, puis… ?", ["le bébé", "*l’adulte"], "le bébé grandit : il devient enfant, puis adulte."),
    fact("La graine, la jeune plante, puis… ?", ["*le grand arbre", "la graine"], "la graine pousse et devient un arbre."),
    fact("Le matin, midi, puis… ?", ["le matin", "*le soir"], "après midi vient le soir."),
    fact("L’œuf, le poussin, puis… ?", ["l’œuf", "*la poule"], "le poussin grandit et devient une poule."),
  ]),
  images(2, "trouver avec un indice", [
    fact("Awa aime un fruit jaune et long. Lequel ?", ["la mangue", "*la banane", "l’orange"], "la banane est jaune et longue."),
    fact("Modou porte un vêtement pour la pluie. Lequel ?", ["un tee-shirt", "*un imperméable", "un short"], "l’imperméable protège de la pluie."),
    fact("Fatou aime un fruit rond et orange. Lequel ?", ["*l’orange", "la banane", "la pastèque"], "l’orange est ronde et orange."),
    fact("Ibou joue avec un objet rond qu’on frappe du pied. Lequel ?", ["un cahier", "*un ballon", "un crayon"], "on frappe le ballon du pied."),
    fact("Khady écrit avec un objet long et pointu. Lequel ?", ["*un crayon", "une gomme", "un ballon"], "le crayon est long et pointu."),
    fact("C’est un gros fruit vert dehors et rouge dedans. Lequel ?", ["la mangue", "l’orange", "*la pastèque"], "la pastèque est verte dehors et rouge dedans."),
    fact("Cet animal donne du lait et dit « meuh ». Lequel ?", ["le coq", "*la vache", "le chat"], "la vache donne du lait."),
    fact("On l’utilise pour balayer la classe. Qu’est-ce que c’est ?", ["*un balai", "une craie", "un seau"], "le balai sert à balayer."),
  ]),
  images(3, "reproduire un modèle", [
    copyOfModel("● ■ ▲", ["● ■ ▲", "● ▲ ■", "■ ● ▲"]),
    copyOfModel("○ ○ ●", ["○ ● ○", "○ ○ ●", "● ○ ○"]),
    copyOfModel("▲ ■ ■ ●", ["▲ ■ ● ■", "■ ▲ ■ ●", "▲ ■ ■ ●"]),
    copyOfModel("□ ▲ □", ["□ ▲ □", "▲ □ □", "□ □ ▲"]),
    copyOfModel("● ● ■ ■", ["● ■ ● ■", "● ● ■ ■", "■ ■ ● ●"]),
    copyOfModel("△ ○ ■ ○", ["△ ○ ■ ○", "△ ■ ○ ○", "○ △ ■ ○"]),
    copyOfModel("■ ● ▲ ●", ["■ ▲ ● ●", "● ■ ▲ ●", "■ ● ▲ ●"]),
    copyOfModel("○ ■ ○ ■", ["○ ■ ○ ■", "○ ■ ■ ○", "■ ○ ■ ○"]),
  ]),
  images(4, "le rythme répétitif", [
    nextShape(["●", "▲"], 4, ["●", "▲", "■"]),
    nextShape(["■", "■", "○"], 3, ["■", "○", "▲"]),
    nextShape(["▲", "○", "○"], 3, ["▲", "○", "■"]),
    nextShape(["□", "■"], 4, ["□", "■", "○"]),
    nextShape(["●", "●", "▲"], 3, ["●", "▲", "□"]),
    nextShape(["○", "□", "△"], 3, ["○", "□", "△"]),
    nextShape(["■", "▲", "▲"], 3, ["■", "▲", "●"]),
    nextShape(["△", "●"], 4, ["△", "●", "■"]),
  ]),
  images(5, "le rythme récursif", [
    growing([1, 2, 3]),
    growing([1, 2, 3, 4]),
    growing([2, 3, 4]),
    growing([1, 3, 5]),
    growing([2, 4, 6]),
    growing([3, 4, 5]),
    bandGap([1, 2, 3, 4, 5], 4),
    bandGap([2, 4, 6, 8, 10], 4),
  ]),
  images(6, "le tableau à double entrée (1)", [
    likesTable(KIDS, ["mangue", "banane", "orange"], [[1], [0], [2]], "Awa", "fruit"),
    likesTable(KIDS, ["mangue", "banane", "orange"], [[1], [0], [2]], "Modou", "fruit"),
    likesTable(KIDS, ["mangue", "banane", "orange"], [[1], [0], [2]], "Fatou", "fruit"),
    likesTable(["Khady", "Oumar", "Victor"], ["bonbon", "ballon", "cahier"], [[2], [1], [0]], "Victor", "cadeau"),
    likesTable(["Khady", "Oumar", "Victor"], ["bonbon", "ballon", "cahier"], [[2], [1], [0]], "Khady", "cadeau"),
    likesTable(["Khady", "Oumar", "Victor"], ["bonbon", "ballon", "cahier"], [[2], [1], [0]], "Oumar", "cadeau"),
    likesTable(["Yaya", "Sira"], ["orange", "pasteque", "mangue"], [[0], [2]], "Sira", "fruit"),
    likesTable(["Yaya", "Sira"], ["orange", "pasteque", "mangue"], [[0], [2]], "Yaya", "fruit"),
  ]),
  images(7, "le tableau à double entrée (2)", [
    likesTable(["Lahat", "Fatou", "Biram"], ["ballon", "crayon", "bonbon"], [[0], [1], [1, 2]], "Lahat", "objet"),
    likesTable(["Lahat", "Fatou", "Biram"], ["ballon", "crayon", "bonbon"], [[0], [1], [1, 2]], "Fatou", "objet"),
    likesTable(["Binta", "Ali", "Rama", "Ibou"], ["mangue", "orange", "banane", "pasteque"], [[3], [1], [0], [2]], "Rama", "fruit"),
    likesTable(["Binta", "Ali", "Rama", "Ibou"], ["mangue", "orange", "banane", "pasteque"], [[3], [1], [0], [2]], "Ibou", "fruit"),
    likesTable(["Binta", "Ali", "Rama", "Ibou"], ["mangue", "orange", "banane", "pasteque"], [[3], [1], [0], [2]], "Binta", "fruit"),
    likesTable(["Sidi", "Ndèye"], ["cahier", "crayon", "ballon"], [[2], [0]], "Ndèye", "objet"),
    vf("Dans un tableau à double entrée, on lit une ligne et une colonne.", true, "la case se trouve au croisement de la ligne et de la colonne."),
    fact("Dans le tableau, Biram a deux coches. Que veut dire cela ?", ["*Biram aime deux objets", "Biram n’aime rien"], "chaque coche ✔ montre un objet aimé."),
  ]),
];

// ── Comprendre un problème ──────────────────────────────────────────────────

const understand = seriesOf("Comprendre un problème");
const Q: [string, "fille" | "garçon"][] = [["Sira", "fille"], ["Awa", "fille"], ["Baba", "garçon"], ["Modou", "garçon"]];

export const UNDERSTAND_CI: ExerciseSeries[] = [
  understand(1, "les informations utiles : les indices", [
    fact("Quel objet fait penser à la boulangerie ?", ["*le pain", "le ballon", "la craie"], "on achète le pain à la boulangerie."),
    fact("Quel objet fait penser au football ?", ["la craie", "*le ballon", "la cuillère"], "on joue au football avec un ballon."),
    fact("Quel objet fait penser à l’école ?", ["*le cahier", "la marmite", "le filet de pêche"], "on écrit dans son cahier à l’école."),
    fact("Quel objet fait penser à la cuisine ?", ["le stylo", "*la marmite", "le ballon"], "on cuisine dans la marmite."),
    fact("Quel objet fait penser à la pêche ?", ["*le filet", "le cahier", "le balai"], "le pêcheur attrape les poissons avec un filet."),
    fact("Quel objet fait penser au marché ?", ["la craie", "*le panier", "le tableau"], "on porte ses achats dans un panier."),
    fact("Quel indice montre qu’il pleut ?", ["*les flaques d’eau", "le soleil brûlant", "la poussière"], "les flaques d’eau se forment quand il pleut."),
    fact("Quel indice montre que c’est la nuit ?", ["le soleil", "*la lune et les étoiles", "le chant du matin"], "la lune et les étoiles brillent la nuit."),
  ]),
  understand(2, "les informations inutiles : l’intrus", [
    intruder(["mangue", "orange", "ballon", "banane"], "fruit"),
    intruder(["crayon", "cahier", "crayon", "pasteque"], "fourniture"),
    intruder(["eleve-fille", "bonbon", "eleve-garcon", "eleve-fille"], "enfant"),
    intruder(["banane", "pasteque", "cahier", "orange"], "fruit"),
    fact("Quel animal est l’intrus ? le chat, le chien, le poisson, la chèvre", ["le chat", "*le poisson", "la chèvre"], "le poisson vit dans l’eau, les autres sur la terre."),
    fact("Quel objet est l’intrus ? la règle, le crayon, la casserole, la gomme", ["la règle", "*la casserole", "la gomme"], "la casserole sert à cuisiner, les autres à l’école."),
    fact("Quel vêtement est l’intrus ? la chemise, le boubou, le seau, le pantalon", ["le boubou", "*le seau", "le pantalon"], "le seau n’est pas un vêtement."),
    fact("Quel moyen de transport est l’intrus ? le car, la moto, la table, le vélo", ["le car", "*la table", "le vélo"], "la table n’est pas un moyen de transport."),
  ]),
  understand(3, "les informations manquantes (1)", [
    fact("Le vélo de Modou n’a qu’une roue. Que lui manque-t-il ?", ["*une roue", "un guidon", "une selle"], "un vélo a deux roues."),
    fact("La table n’a que 3 pieds. Que lui manque-t-il ?", ["un plateau", "*un pied", "un tiroir"], "une table a souvent 4 pieds."),
    fact("Sur le dessin du visage, il n’y a qu’un œil. Que manque-t-il ?", ["*un œil", "le nez", "la bouche"], "un visage a deux yeux."),
    fact("La maison n’a pas de toit. Que manque-t-il ?", ["une porte", "*le toit", "une fenêtre"], "le toit protège la maison de la pluie."),
    fact("La chaise n’a pas de dossier. Que manque-t-il ?", ["*le dossier", "un pied", "le siège"], "le dossier sert à s’appuyer."),
    fact("Le chat dessiné n’a pas de queue. Que lui manque-t-il ?", ["les oreilles", "*la queue", "les pattes"], "un chat a une queue."),
    fact("La voiture dessinée n’a que 3 roues. Combien en manque-t-il ?", ["*1", "2", "3"], "une voiture a 4 roues : 4 − 3 = 1."),
    fact("Le drapeau du Sénégal n’a pas son étoile. De quelle couleur est-elle ?", ["rouge", "*verte", "jaune"], "l’étoile verte est au milieu de la bande jaune."),
  ]),
  understand(4, "les informations manquantes (2)", [
    fact("Les enfants veulent jouer au football. Que leur manque-t-il ?", ["*un ballon", "une craie", "un cahier"], "sans ballon, on ne peut pas jouer au football."),
    fact("Fatou doit cuisiner le riz. Que lui manque-t-il ?", ["un ballon", "*une marmite", "une règle"], "on fait cuire le riz dans une marmite."),
    fact("Awa veut écrire son nom. Que lui manque-t-il ?", ["*un crayon", "un balai", "un seau"], "on écrit avec un crayon."),
    fact("Les filles jouent à la marelle. Que leur manque-t-il pour dessiner les cases ?", ["un ballon", "*une craie", "une assiette"], "on trace les cases de la marelle avec une craie."),
    fact("Baba veut puiser de l’eau. Que lui manque-t-il ?", ["*un seau", "un cahier", "une gomme"], "le seau sert à puiser l’eau."),
    fact("Modou veut couper le pain. Que lui manque-t-il ?", ["une cuillère", "*un couteau", "un verre"], "on coupe le pain avec un couteau."),
    fact("Le pêcheur veut aller pêcher en mer. Que lui manque-t-il ?", ["*une pirogue", "une charrette", "un vélo"], "on va en mer avec une pirogue."),
    fact("Khady veut balayer la classe. Que lui manque-t-il ?", ["un ballon", "*un balai", "un crayon"], "on balaie avec un balai."),
  ]),
  understand(5, "révision", [
    intruder(["orange", "mangue", "crayon", "pasteque"], "fruit"),
    fact("Quel objet fait penser à l’hôpital ?", ["*le thermomètre", "le ballon", "le seau"], "on prend la température avec un thermomètre."),
    fact("Le cahier de Rama n’a pas de couverture. Que manque-t-il ?", ["*la couverture", "les pages", "les lignes"], "la couverture protège le cahier."),
    orderStatement(["On colorie le dessin.", "On prend une feuille.", "On dessine une maison.", "On montre le dessin au maître."], [1, 2, 0, 3], "on prend la feuille, on dessine, on colorie, puis on montre.", STEPS),
    fact("Les enfants veulent sauter à la corde. Que leur manque-t-il ?", ["*une corde", "un ballon", "un cahier"], "il faut une corde pour sauter à la corde."),
    fact("Quel animal est l’intrus ? la poule, le canard, le coq, la vache", ["la poule", "le canard", "*la vache"], "la vache n’est pas un oiseau."),
    intruder(["eleve-garcon", "eleve-fille", "mangue", "eleve-garcon"], "enfant"),
    fact("Quel indice montre que c’est la récréation ?", ["*les enfants jouent dans la cour", "les enfants écrivent en classe"], "on joue dans la cour pendant la récréation."),
  ]),
  understand(6, "activité d’intégration", [
    fact("Pour nettoyer la classe, Baba balaie le sol. Quel outil utilise-t-il ?", ["*un balai", "un seau", "une poubelle"], "on balaie avec un balai."),
    fact("Sira change l’eau du seau. De quoi a-t-elle besoin ?", ["un balai", "*un seau", "une craie"], "l’eau se transporte dans un seau."),
    fact("Awa jette les ordures. Où les met-elle ?", ["*dans la poubelle", "sous la table", "dans le cartable"], "les ordures vont à la poubelle."),
    likesTable(["Baba", "Sira", "Awa"], ["ballon", "cahier", "bonbon"], [[1], [0], [2]], "Sira", "objet"),
    fact("Après le nettoyage, que manque-t-il pour essuyer les tables ?", ["*un chiffon", "un ballon", "un crayon"], "on essuie avec un chiffon."),
    intruder(["cahier", "crayon", "orange", "cahier"], "fourniture"),
    orderStatement(["On essuie les tables.", "On balaie le sol.", "On jette les ordures."], [1, 2, 0], "on balaie, on jette les ordures, puis on essuie.", STEPS),
    vf("Une classe propre aide à bien travailler.", true, "on est mieux pour apprendre dans une classe propre."),
  ]),
  understand(7, "intégration avec les autres matières (1)", [
    ctx("Devant le drapeau, les élèves se mettent en file pour le salut aux couleurs.", inQueue(Q, "Awa", "devant")),
    ctx("Devant le drapeau, les élèves se mettent en file pour le salut aux couleurs.", inQueue(Q, "Baba", "derrière")),
    ctx("Les élèves posent leurs affaires sur l’étagère.", besideOf(["cahier", "ballon", "crayon"], "ballon", "gauche")),
    ctx("Les élèves jouent autour du drapeau.", nearOrFar("eleve-fille", "la fille", [[150, 40], [260, 130], [110, 150]], "ballon", "le plus loin")),
    fact("De quelles couleurs est le drapeau du Sénégal ?", ["*vert, jaune, rouge", "bleu, blanc, rouge", "vert, blanc, orange"], "le drapeau du Sénégal est vert, jaune et rouge, avec une étoile verte."),
    vf("Pendant le salut aux couleurs, on reste debout et calme.", true, "on montre son respect pour le drapeau."),
    fact("Combien de bandes a le drapeau du Sénégal ?", ["2", "*3", "4"], "trois bandes : verte, jaune et rouge."),
    vf("Les filles sont alignées à gauche et les garçons à droite : une fille est donc à gauche d’un garçon.", true, "la file des filles est du côté gauche."),
  ]),
  understand(8, "le problème mathématique (1)", [
    vf("« Il y a 3 garçons et 2 filles. Combien d’enfants y a-t-il en tout ? » est un problème mathématique.", true, "il y a des nombres et une question à résoudre par un calcul."),
    vf("« Fatou a acheté 6 œufs pour faire des omelettes. » est un problème mathématique.", false, "il n’y a pas de question : rien à chercher."),
    vf("« Awa a 4 oranges et Modou en a 2. Combien d’oranges ont-ils ensemble ? » est un problème mathématique.", true, "on cherche un nombre avec un calcul."),
    vf("« Quelle est ta couleur préférée ? » est un problème mathématique.", false, "on ne fait aucun calcul pour répondre."),
    vf("« Papa a 5 moutons. Il en vend 2. Combien lui en reste-t-il ? » est un problème mathématique.", true, "il y a des nombres et une question."),
    vf("« Le ciel est bleu aujourd’hui. » est un problème mathématique.", false, "c’est une phrase, sans nombre ni question."),
    fact("Dans un problème mathématique, on trouve…", ["*des nombres et une question", "seulement des dessins", "seulement des couleurs"], "les nombres sont les données ; la question dit ce qu’on cherche."),
    vf("« Il y a 7 billes dans la boîte et 2 dehors. Combien de billes en tout ? » est un problème mathématique.", true, "on additionne pour répondre."),
  ]),
  understand(9, "le problème mathématique (2)", [
    storyOp("Fatma a <strong>5</strong> bonbons. Elle en donne <strong>2</strong> à Ngor.", "Combien de bonbons lui reste-t-il ?", 5, "−", 2, "bonbons"),
    storyOp("Ngor a <strong>3</strong> billes. Fatma lui en donne <strong>4</strong>.", "Combien de billes Ngor a-t-il maintenant ?", 3, "+", 4, "billes"),
    storyOp("Il y a <strong>6</strong> poules dans la cour. <strong>2</strong> vont dans le poulailler.", "Combien de poules restent dans la cour ?", 6, "−", 2, "poules"),
    storyOp("Awa a <strong>2</strong> crayons rouges et <strong>5</strong> crayons bleus.", "Combien de crayons a-t-elle en tout ?", 2, "+", 5, "crayons"),
    storyOp("Le maître a <strong>9</strong> craies. Il en casse <strong>3</strong>.", "Combien de craies entières lui reste-t-il ?", 9, "−", 3, "craies"),
    storyOp("<strong>4</strong> enfants jouent. <strong>4</strong> autres arrivent.", "Combien d’enfants jouent maintenant ?", 4, "+", 4, "enfants"),
    storyOp("Maman a <strong>10</strong> oranges. Elle en donne <strong>5</strong> aux voisins.", "Combien d’oranges lui reste-t-il ?", 10, "−", 5, "oranges"),
    storyOp("Il y a <strong>1</strong> chèvre dans l’enclos. Papa en amène <strong>6</strong>.", "Combien de chèvres y a-t-il maintenant ?", 1, "+", 6, "chèvres"),
  ]),
  understand(10, "les données d’un énoncé", [
    countData("Amy a <strong>5</strong> chaises. Elle en installe <strong>1</strong> dans la chambre et <strong>2</strong> dans le salon."),
    countData("Maman a <strong>7</strong> mangues. Elle en donne <strong>3</strong> à Awa."),
    countData("Il y a <strong>4</strong> garçons, <strong>3</strong> filles et <strong>2</strong> maîtres dans la cour."),
    countData("Papa achète <strong>6</strong> pains."),
    lettered("Modou a 8 billes. Il en perd 3.", "Quelle est une donnée de ce problème ?", ["8 billes", "les poules", "le marché"], 0, "le problème parle de 8 billes."),
    lettered("Awa achète 4 bananes et 2 oranges.", "Quelle est une donnée de ce problème ?", ["5 mangues", "2 oranges", "3 pommes"], 1, "les données sont 4 bananes et 2 oranges."),
    lettered("Il y a 9 élèves. 2 sont absents.", "Quelle est une donnée de ce problème ?", ["2 absents", "10 tables", "1 maître"], 0, "le problème parle de 9 élèves et de 2 absents."),
    vf("Les données d’un problème sont les informations qu’il nous donne.", true, "ce sont les nombres et les objets de l’énoncé."),
  ]),
  understand(11, "les questions d’un énoncé", [
    vf("« Combien y a-t-il de chats ? » est une question.", true, "elle demande une réponse et finit par « ? »."),
    vf("« Il y a trois chats. » est une question.", false, "c’est une information, elle finit par un point."),
    vf("« Combien de carottes reste-t-il ? » est une question.", true, "elle demande un nombre."),
    vf("« Modou a 6 carottes. » est une question.", false, "c’est une donnée, pas une question."),
    vf("Une question se termine par un point d’interrogation « ? ».", true, "le signe « ? » montre qu’on demande quelque chose."),
    vf("« Combien d’élèves sont présents ? » est une question.", true, "on cherche le nombre d’élèves présents."),
    fact("Quelle phrase est une question ?", ["Awa a 4 billes.", "*Combien de billes a Awa ?", "Awa joue."], "elle demande quelque chose et finit par « ? »."),
    fact("Par quoi finit une question ?", ["un point", "*un point d’interrogation", "une virgule"], "le point d’interrogation « ? » finit une question."),
  ]),
  understand(12, "les consignes d’un énoncé", [
    vf("« Trouve le nombre de baguettes restantes. » est une consigne.", true, "elle dit ce qu’il faut faire."),
    vf("« Soda a 7 petits bonbons. » est une consigne.", false, "c’est une donnée, pas un ordre à suivre."),
    vf("« Calcule le nombre de biscuits mangés. » est une consigne.", true, "« calcule » dit ce qu’il faut faire."),
    vf("« Entoure la bonne réponse. » est une consigne.", true, "elle demande une action."),
    vf("« Maty a 5 biscuits. » est une consigne.", false, "c’est une information de l’énoncé."),
    fact("Quelle phrase est une consigne ?", ["*Écris le nombre de billes.", "Awa a 4 billes.", "Combien de billes ?"], "« Écris » dit ce qu’il faut faire."),
    fact("Une consigne commence souvent par…", ["*un verbe d’action : trouve, calcule, écris", "un nombre", "un point"], "elle dit à l’élève ce qu’il doit faire."),
    vf("Une consigne et une question servent toutes les deux à dire ce qu’on cherche.", true, "l’une ordonne, l’autre demande."),
  ]),
  understand(13, "révision", [
    orderStatement(["Combien d’enfants y a-t-il au total ?", "3 garçons jouent.", "2 filles viennent."], [1, 2, 0], "d’abord les données, puis la question."),
    countData("Maman achète <strong>3</strong> poissons et <strong>4</strong> oignons."),
    vf("« Combien de poissons reste-t-il ? » est une question.", true, "elle finit par « ? » et demande un nombre."),
    vf("« Calcule le prix total. » est une consigne.", true, "« calcule » dit ce qu’il faut faire."),
    storyOp("<strong>3</strong> garçons jouent. <strong>2</strong> filles viennent.", "Combien d’enfants y a-t-il au total ?", 3, "+", 2, "enfants"),
    storyOp("Maty a <strong>5</strong> biscuits. Elle en mange <strong>4</strong>.", "Combien de biscuits lui reste-t-il ?", 5, "−", 4, "biscuit"),
    vf("« La maison est jolie. » est un problème mathématique.", false, "il n’y a ni nombre ni question."),
    countData("Il y a <strong>8</strong> chaises et <strong>2</strong> tables."),
  ]),
  understand(14, "activité d’intégration", [
    countData("Kiné a <strong>8</strong> pommes. Elle en donne <strong>2</strong> à son frère."),
    storyOp("Kiné a <strong>8</strong> pommes. Elle en donne <strong>2</strong> à son frère.", "Combien de pommes lui reste-t-il ?", 8, "−", 2, "pommes"),
    lettered("Kiné a 8 pommes. Elle en donne 2 à son frère. Combien de pommes lui reste-t-il ?", "Quelle est la question du problème ?", ["Kiné a 8 pommes.", "Combien de pommes lui reste-t-il ?", "Elle en donne 2 à son frère."], 1, "la question finit par « ? »."),
    storyOp("Samba a <strong>4</strong> cahiers. Sa sœur lui en donne <strong>3</strong>.", "Combien de cahiers a-t-il maintenant ?", 4, "+", 3, "cahiers"),
    countData("Samba a <strong>4</strong> cahiers. Sa sœur lui en donne <strong>3</strong>."),
    vf("« Samba a 4 cahiers. » est une donnée.", true, "c’est une information du problème."),
    storyOp("Il y a <strong>10</strong> moutons. <strong>3</strong> sortent de l’enclos.", "Combien de moutons restent dans l’enclos ?", 10, "−", 3, "moutons"),
    vf("Pour répondre, je relis la question.", true, "la question dit ce qu’il faut chercher."),
  ]),
  understand(15, "intégration avec les autres matières (2)", [
    ctx("Des enfants portent des objets lourds ou légers.", whichSolid(["cylindre", "pavé droit", "cube"], "cylindre")),
    ctx("Awa porte une boîte en forme de pavé droit.", faceOf("pavé droit", "la boîte d’Awa")),
    ctx("Au marché, on compare deux fruits sur la balance.", heavierFruit("pasteque", "orange", "gauche", "le plus lourd")),
    ctx("Au marché, on compare deux fruits sur la balance.", heavierFruit("mangue", "banane", "droite", "le plus léger")),
    fact("Quel objet est lourd et a la forme d’un cylindre ?", ["*un tronc d’arbre", "un dé", "une feuille"], "le tronc est rond, long et lourd."),
    fact("Quel objet est léger et a la forme d’un pavé droit ?", ["une armoire", "*une boîte d’allumettes", "un ballon"], "la boîte d’allumettes est légère et a des faces rectangulaires."),
    dayNext("jeudi", "après"),
    vf("Un dé a la forme d’un cube.", true, "ses 6 faces sont des carrés."),
  ]),
];

// ── Résoudre un petit problème ──────────────────────────────────────────────

const solve = seriesOf("Résoudre un petit problème");

export const SOLVE_CI: ExerciseSeries[] = [
  solve(1, "données utiles et inutiles (1)", [
    lettered("Papa a acheté 2 moutons, 3 ânes et 4 oranges. Combien d’animaux Papa a-t-il achetés ?", "Quelle donnée est inutile ?", ["2 moutons", "3 ânes", "4 oranges"], 2, "les oranges ne sont pas des animaux : on n’en a pas besoin."),
    lettered("Awa a 5 billes et 2 crayons. Combien de billes a-t-elle ?", "Quelle donnée est inutile ?", ["5 billes", "2 crayons"], 1, "on parle seulement des billes."),
    lettered("Il y a 6 filles, 4 garçons et 2 chèvres dans la cour. Combien d’enfants y a-t-il ?", "Quelle donnée est inutile ?", ["6 filles", "4 garçons", "2 chèvres"], 2, "les chèvres ne sont pas des enfants."),
    lettered("Modou a 3 cahiers et 7 bonbons. Il mange 2 bonbons. Combien de bonbons lui reste-t-il ?", "Quelle donnée est inutile ?", ["3 cahiers", "7 bonbons", "2 bonbons"], 0, "les cahiers ne servent pas à répondre."),
    lettered("Maman achète 4 poissons et 3 oignons. Combien de poissons a-t-elle ?", "Quelle donnée est utile ?", ["4 poissons", "3 oignons"], 0, "on cherche le nombre de poissons."),
    lettered("Il y a 8 tables et 9 élèves. Combien d’élèves y a-t-il ?", "Quelle donnée est utile ?", ["8 tables", "9 élèves"], 1, "on cherche le nombre d’élèves."),
    vf("Les données utiles permettent de répondre à la question.", true, "on s’en sert pour calculer."),
    vf("Il faut toujours utiliser toutes les données d’un énoncé.", false, "certaines données sont inutiles."),
  ]),
  solve(2, "données utiles et inutiles (2)", [
    lettered("Awa donne 1 carotte, 2 oignons et 4 bonbons à maman. Combien de légumes Awa a-t-elle donnés ?", "Quelle donnée est inutile ?", ["1 carotte", "2 oignons", "4 bonbons"], 2, "les bonbons ne sont pas des légumes."),
    storyOp("Awa donne <strong>1</strong> carotte, <strong>2</strong> oignons et 4 bonbons à maman.", "Combien de légumes Awa a-t-elle donnés ?", 1, "+", 2, "légumes"),
    lettered("Voici 3 chiens. 2 autres chiens et 1 chat viennent. Combien de chiens y a-t-il ?", "Quelle donnée est inutile ?", ["3 chiens", "2 autres chiens", "1 chat"], 2, "on compte seulement les chiens."),
    storyOp("Voici <strong>3</strong> chiens. <strong>2</strong> autres chiens et 1 chat viennent.", "Combien de chiens y a-t-il ?", 3, "+", 2, "chiens"),
    lettered("Amadou achète 4 bananes, 1 pomme et 2 oignons. Combien de fruits achète-t-il ?", "Quelle donnée est inutile ?", ["4 bananes", "1 pomme", "2 oignons"], 2, "l’oignon est un légume, pas un fruit."),
    storyOp("Amadou achète <strong>4</strong> bananes, <strong>1</strong> pomme et 2 oignons.", "Combien de fruits achète-t-il ?", 4, "+", 1, "fruits"),
    lettered("Binta a 9 perles et 5 cahiers. Elle perd 3 perles. Combien de perles lui reste-t-il ?", "Quelle donnée est inutile ?", ["9 perles", "5 cahiers", "3 perles"], 1, "les cahiers ne changent rien aux perles."),
    storyOp("Binta a <strong>9</strong> perles et 5 cahiers. Elle perd <strong>3</strong> perles.", "Combien de perles lui reste-t-il ?", 9, "−", 3, "perles"),
  ]),
  solve(3, "la question finale", [
    lettered("Modou a 10 billes. Il en donne 4 à Moussa et 3 à Khady.", "Quelle est la question finale ?", ["Combien de billes a-t-il données en tout ?", "Combien de billes lui reste-t-il ?"], 1, "c’est la dernière question, celle qu’on cherche à la fin."),
    whatRemains("Modou a <strong>10</strong> billes. Il en donne <strong>4</strong> à Moussa et <strong>3</strong> à Khady. Combien de billes lui reste-t-il ?", 10, 4, 3, "billes"),
    lettered("Maman a 9 mangues. Elle en donne 2 à Awa et 3 à Sidi.", "Quelle est la question finale ?", ["Combien de mangues reste-t-il à maman ?", "Combien de mangues a-t-elle données ?"], 0, "on cherche à la fin ce qui reste."),
    whatRemains("Maman a <strong>9</strong> mangues. Elle en donne <strong>2</strong> à Awa et <strong>3</strong> à Sidi. Combien de mangues lui reste-t-il ?", 9, 2, 3, "mangues"),
    lettered("Fatou a 12 bonbons. Elle en mange 2 le matin et 3 le soir.", "Quelle est la question finale ?", ["Combien de bonbons a-t-elle mangés ?", "Combien de bonbons lui reste-t-il ?"], 1, "la question finale demande le reste."),
    vf("La question finale indique ce qu’on cherche à la fin du problème.", true, "c’est la dernière tâche à faire."),
    lettered("Il y a 15 élèves. 3 sortent, puis 2 autres sortent.", "Quelle est la question finale ?", ["Combien d’élèves sont sortis ?", "Combien d’élèves restent en classe ?"], 1, "on cherche à la fin les élèves qui restent."),
    whatRemains("Il y a <strong>15</strong> élèves. <strong>3</strong> sortent, puis <strong>2</strong> autres sortent. Combien d’élèves restent en classe ?", 15, 3, 2, "élèves"),
  ]),
  solve(4, "les questions intermédiaires", [
    lettered("Modou a 10 billes. Il en donne 4 à Moussa et 3 à Khady. Combien de billes lui reste-t-il ?", "Quelle est la question intermédiaire ?", ["Combien de billes a-t-il données en tout ?", "Combien de billes lui reste-t-il ?"], 0, "on calcule d’abord les billes données : 4 + 3."),
    twoSteps("Awa a <strong>6</strong> oranges. Elle en achète <strong>4</strong>, puis en donne <strong>3</strong> à Fatou. Combien d’oranges a-t-elle à la fin ?", 6, "+", 4, "−", 3, "oranges"),
    lettered("Papa a 8 poules. Il en achète 5, puis en vend 6. Combien de poules a-t-il à la fin ?", "Quelle est la question intermédiaire ?", ["Combien de poules a-t-il après l’achat ?", "Combien de poules a-t-il à la fin ?"], 0, "on cherche d’abord combien il en a après l’achat : 8 + 5."),
    twoSteps("Papa a <strong>8</strong> poules. Il en achète <strong>5</strong>, puis en vend <strong>6</strong>. Combien de poules a-t-il à la fin ?", 8, "+", 5, "−", 6, "poules"),
    twoSteps("Il y a <strong>12</strong> élèves dans la cour. <strong>4</strong> rentrent en classe, puis <strong>3</strong> arrivent. Combien d’élèves y a-t-il dans la cour ?", 12, "−", 4, "+", 3, "élèves"),
    vf("Les questions intermédiaires aident à répondre à la question finale.", true, "on les résout d’abord, étape par étape."),
    twoSteps("Khady a <strong>9</strong> crayons. Elle en perd <strong>2</strong>, puis sa maman lui en donne <strong>5</strong>. Combien de crayons a-t-elle ?", 9, "−", 2, "+", 5, "crayons"),
    vf("On répond à la question finale avant les questions intermédiaires.", false, "on commence par les questions intermédiaires."),
  ]),
  solve(5, "révision", [
    lettered("Voici 4 chats. 2 autres chats et 1 chien arrivent. Combien de chats y a-t-il ?", "Quelle donnée est inutile ?", ["4 chats", "2 autres chats", "1 chien"], 2, "on compte seulement les chats."),
    storyOp("Voici <strong>4</strong> chats. <strong>2</strong> autres chats et 1 chien arrivent.", "Combien de chats y a-t-il ?", 4, "+", 2, "chats"),
    lettered("Ali a 11 billes. Il en donne 3 à Samba et 2 à Rama. Combien lui en reste-t-il ?", "Quelle est la question intermédiaire ?", ["Combien de billes a-t-il données ?", "Combien de billes lui reste-t-il ?"], 0, "on calcule d’abord les billes données."),
    whatRemains("Ali a <strong>11</strong> billes. Il en donne <strong>3</strong> à Samba et <strong>2</strong> à Rama. Combien lui en reste-t-il ?", 11, 3, 2, "billes"),
    twoSteps("Le marchand a <strong>7</strong> pastèques. Il en reçoit <strong>6</strong>, puis en vend <strong>5</strong>. Combien de pastèques a-t-il ?", 7, "+", 6, "−", 5, "pastèques"),
    countData("Amadou achète <strong>4</strong> bananes, <strong>1</strong> pomme et <strong>2</strong> oignons."),
    vf("Une donnée inutile ne sert pas à répondre à la question.", true, "on peut la laisser de côté."),
    lettered("Maman a 6 œufs et 2 poulets. Combien d’œufs a-t-elle ?", "Quelle donnée est utile ?", ["6 œufs", "2 poulets"], 0, "on cherche le nombre d’œufs."),
  ]),
  solve(6, "activité d’intégration", [
    lettered("Maman a acheté 2 citrons verts, 3 citrons jaunes, 1 melon et 7 œufs.", "Quelle est la question finale ?", ["Combien de citrons a-t-elle achetés ?", "Combien de fruits a-t-elle achetés ?"], 1, "on cherche à la fin tous les fruits : les citrons, puis le melon."),
    storyOp("Maman a acheté <strong>2</strong> citrons verts et <strong>3</strong> citrons jaunes.", "Combien de citrons a-t-elle achetés ?", 2, "+", 3, "citrons"),
    storyOp("Maman a acheté <strong>5</strong> citrons et <strong>1</strong> melon.", "Combien de fruits a-t-elle achetés ?", 5, "+", 1, "fruits"),
    lettered("Maman a acheté 2 citrons verts, 3 citrons jaunes, 1 melon et 7 œufs. Combien de fruits a-t-elle achetés ?", "Quelle donnée est inutile ?", ["3 citrons jaunes", "1 melon", "7 œufs"], 2, "les œufs ne sont pas des fruits."),
    whatRemains("Papa a <strong>14</strong> mangues. Il en donne <strong>5</strong> à l’imam et <strong>4</strong> au voisin. Combien de mangues lui reste-t-il ?", 14, 5, 4, "mangues"),
    twoSteps("Il y a <strong>8</strong> bouteilles d’eau. Maman en achète <strong>6</strong>, puis la famille en boit <strong>5</strong>. Combien de bouteilles reste-t-il ?", 8, "+", 6, "−", 5, "bouteilles"),
    vf("Pour résoudre un problème, je lis l’énoncé, je trouve les données utiles, puis je calcule.", true, "c’est la démarche à suivre."),
    countData("Maman a acheté <strong>2</strong> citrons verts, <strong>3</strong> citrons jaunes, <strong>1</strong> melon et <strong>7</strong> œufs."),
  ]),
  solve(7, "intégration avec les autres matières (3)", [
    storyOp("La classe de Baba compte <strong>20</strong> élèves. Le lundi, <strong>2</strong> élèves sont absents.", "Combien d’élèves sont présents le lundi ?", 20, "−", 2, "élèves"),
    storyOp("La classe de Baba compte <strong>20</strong> élèves. Le mardi, <strong>4</strong> élèves sont absents.", "Combien d’élèves sont présents le mardi ?", 20, "−", 4, "élèves"),
    storyOp("Le lundi, <strong>2</strong> élèves sont absents ; le mardi, <strong>4</strong>.", "Combien d’absences y a-t-il en tout ces deux jours ?", 2, "+", 4, "absences"),
    fact("Tous les élèves sont présents le mercredi, le jeudi et le vendredi. Combien sont présents le jeudi ?", ["18", "*20", "16"], "tous les élèves sont là : 20."),
    dayNext("lundi", "après"),
    dayNext("vendredi", "avant"),
    vf("Être présent à l’école tous les jours aide à bien apprendre.", true, "chaque jour, on apprend de nouvelles choses."),
    fact("Quel jour y a-t-il le plus d’absents ?", ["lundi (2 absents)", "*mardi (4 absents)", "jeudi (0 absent)"], "4 est plus grand que 2 et que 0."),
  ]),
];
