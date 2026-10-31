import "server-only";

// CP : questions illustrées ajoutées aux séries de français et d'ESVS (8 questions par chapitre),
// avec les dessins de la banque et les schémas des leçons. Elles complètent les questions de
// cp/exercises.ts sans les répéter.

import type { ExerciseSpec } from "../exercise-series";
import { ask, howMany, pc, scene, schemaFig, soundPick, syllableCount, tf } from "../illustrated-questions";

const GESTURES = schemaFig("ci-gestes", "Quatre gestes d’écriture : un trait, un rond, un pont et une boucle.");
const DAY = schemaFig("ci-journee", "Ma journée dans l’ordre : le matin, l’école, le repas, la nuit.");
const BIKE = schemaFig("cp-velo", "Un vélo avec le nom de ses parties : la selle, le guidon, la roue, la pédale.");

export const EXTRA_CP: Record<string, ExerciseSpec[]> = {
  // ── Français ──
  "Inviter et recommander": [
    ask("Awa invite Modou à sa fête. Quelle phrase dit le jour ?", ["*C’est samedi.", "C’est chez moi.", "C’est une fête."], "« samedi » dit quand.", scene(["ballon-baudruche", "des ballons de fête"])),
    ask("« Je t’invite à jouer au football, au terrain, après l’école. » Où a lieu le match ?", ["*au terrain", "à la maison", "au marché"], "« au terrain » dit où.", scene(["ballon", "un ballon"])),
    ask("Modou accepte l’invitation. Il dit :", ["*Merci, je viendrai avec plaisir !", "Je ne sais pas.", "Laisse-moi."], "on remercie et on accepte poliment."),
    ask("Ton ami se fait piquer par les moustiques la nuit. Que lui recommandes-tu ?", ["*Dors sous une moustiquaire.", "Laisse la fenêtre ouverte.", "Dors dehors."], "la moustiquaire protège du paludisme.", scene(["moustiquaire", "une moustiquaire"])),
    ask("« Je te recommande ce livre, il est très drôle. » Pourquoi le recommande-t-il ?", ["*parce qu’il est drôle", "parce qu’il est lourd", "parce qu’il est rouge"], "il donne la raison : le livre est drôle.", scene(["livre", "un livre"])),
  ],
  "Je relis les sons du CI": [
    soundPick("on", ["mouton", "mouton"], [["moto", "moto"], ["lune", "lune"]]),
    soundPick("ou", ["poule", "poule"], [["pomme", "pomme"], ["table", "table"]]),
    soundPick("é", ["velo", "vélo"], [["sac", "sac"], ["robe", "robe"]]),
    syllableCount("radio", "une radio", "ra-di-o"),
    ask("Dans quel mot entends-tu le son <strong>[i]</strong> ?", [`*${pc("nid", "nid")}`, pc("bol", "bol"), pc("sac", "sac")], "« nid » : on entend [i]."),
  ],
  Raconter: [
    ask("Remets l’histoire dans l’ordre. Que se passe-t-il en premier ?", ["*Awa plante une graine.", "Une fleur pousse.", "Awa arrose."], "on plante d’abord, puis on arrose, enfin la fleur pousse.", scene(["plante", "une graine plantée"], ["arrosoir", "un arrosoir"], ["fleur", "une fleur"])),
    ask("Dans les contes, Leuk le lièvre est…", ["*rusé", "très lent", "un oiseau"], "Leuk trouve toujours une ruse.", scene(["lapin", "un lièvre"])),
    ask("Quel mot annonce ce qui vient à la fin ?", ["*enfin", "d’abord", "ensuite"], "« enfin » annonce la fin du récit."),
    ask("Hier, Modou est allé au marché. Comment commence-t-il son récit ?", ["*Hier, je suis allé au marché.", "Demain, j’irai au marché.", "Je vais au marché."], "il raconte ce qu’il a fait : « hier », au passé.", scene(["eleve-garcon", "Modou"], ["boutique", "le marché"])),
    tf("Une bande dessinée raconte une histoire avec des images, case après case.", true, "on lit les cases dans l’ordre."),
  ],
  "Les sons v, w et oi": [
    soundPick("v", ["vache", "vache"], [["chat", "chat"], ["poule", "poule"]]),
    soundPick("v", ["avion", "avion"], [["camion", "camion"], ["lion", "lion"]]),
    soundPick("oi", ["oiseau", "oiseau"], [["lapin", "lapin"], ["moto", "moto"]]),
    soundPick("oi", ["poisson", "poisson"], [["poule", "poule"], ["savon", "savon"]]),
    ask("Quel mot s’écrit avec un w ?", ["*wagon", "vélo", "valise"], "« wagon » s’écrit avec w, qui se lit [v].", scene(["train", "un train et son wagon"])),
  ],
  "Les sons ch et é": [
    soundPick("ch", ["chemise", "chemise"], [["savon", "savon"], ["sac", "sac"]]),
    soundPick("ch", ["vache", "vache"], [["lapin", "lapin"], ["coq", "coq"]]),
    soundPick("ch", ["chien", "chien"], [["lion", "lion"], ["poule", "poule"]]),
    ask("Dans quel mot le son <strong>[é]</strong> s’écrit-il « er » ?", [`*${pc("panier", "panier")}`, pc("bebe", "bébé"), pc("cle", "clé")], "« pa-nier » : er se lit [é]."),
    ask("Dans quel mot le son <strong>[é]</strong> s’écrit-il « é » ?", [`*${pc("velo", "vélo")}`, pc("panier", "panier"), pc("cahier", "cahier")], "« vé-lo » : on voit la lettre é."),
  ],
  "Les sons k et f": [
    soundPick("k", ["kora", "kora"], [["girafe", "girafe"], ["oignon", "oignon"]]),
    ask("Quel mot s’écrit avec ph ?", [`*${pc("telephone", "téléphone")}`, pc("feu", "feu"), pc("fleur", "fleur")], "« té-lé-phone » : ph se lit [f]."),
    soundPick("f", ["feuille", "feuille"], [["lune", "lune"], ["vache", "vache"]]),
    ask("Dans quel mot le son <strong>[k]</strong> s’écrit-il « c » ?", [`*${pc("cahier", "cahier")}`, pc("kora", "kora"), pc("lion", "lion")], "« ca-hier » commence par c, qui se lit [k]."),
    tf("Dans « kilo », le son [k] s’écrit avec un k.", true, "« ki-lo » commence par la lettre k.", scene(["sac-riz", "un sac de riz"])),
  ],
  "Les sons eu, s et z": [
    soundPick("eu", ["feu", "feu"], [["lit", "lit"], ["moto", "moto"]]),
    ask("Quel mot s’écrit avec « œu » ?", [`*${pc("oeuf", "œuf")}`, pc("feu", "feu"), pc("bol", "bol")], "« œuf » s’écrit avec œu."),
    ask("Dans quel mot le son <strong>[s]</strong> s’écrit-il « ss » ?", [`*${pc("tasse", "tasse")}`, pc("maison", "maison"), pc("chemise", "chemise")], "« ta-sse » : ss se lit [s]."),
    ask("Dans quel mot le s se lit-il <strong>[z]</strong> ?", [`*${pc("oiseau", "oiseau")}`, pc("sac", "sac"), pc("savon", "savon")], "un seul s entre deux voyelles se lit [z] : oi-seau."),
    ask("Dans quel mot la lettre c se lit-elle <strong>[s]</strong> ?", [`*${pc("ciseaux", "ciseaux")}`, pc("cahier", "cahier"), pc("coq", "coq")], "devant i, c se lit [s] : ci-seaux."),
  ],
  "Les sons g, j et gn": [
    ask("Quel mot commence par le son <strong>[g]</strong> ?", [`*${pc("gomme", "gomme")}`, pc("girafe", "girafe"), pc("jouet", "jouet")], "« go-mme » : devant o, g se lit [g]."),
    ask("Dans quel mot entends-tu le son <strong>[gn]</strong> ?", [`*${pc("oignon", "oignon")}`, pc("orange", "orange"), pc("mangue", "mangue")], "« oi-gnon » : on entend [gn]."),
    ask("Quel mot commence par le son <strong>[j]</strong> ?", [`*${pc("jouet", "jouet")}`, pc("gomme", "gomme"), pc("grenouille", "grenouille")], "« jou-et » commence par [j]."),
    ask("Dans quel mot « ge » se lit-il <strong>[j]</strong> ?", [`*${pc("orange", "orange")}`, pc("mangue", "mangue"), pc("gomme", "gomme")], "« o-ran-ge » : ge se lit [j]."),
    soundPick("gn", ["peigne", "peigne"], [["pain", "pain"], ["panier", "panier"]]),
  ],
  "Les sons in et an": [
    soundPick("in", ["lapin", "lapin"], [["lune", "lune"], ["lait", "lait"]]),
    ask("Dans quel mot le son <strong>[in]</strong> s’écrit-il « ain » ?", [`*${pc("main", "main")}`, pc("lapin", "lapin"), pc("lion", "lion")], "« main » s’écrit avec ain."),
    soundPick("an", ["mangue", "mangue"], [["moto", "moto"], ["lit", "lit"]]),
    ask("Dans quel mot le son <strong>[an]</strong> s’écrit-il « am » ?", [`*${pc("tambour", "tambour")}`, pc("orange", "orange"), pc("mangue", "mangue")], "devant b, on écrit am : tam-bour."),
    soundPick("an", ["orange", "orange"], [["poule", "poule"], ["robe", "robe"]]),
  ],
  "Écrire en lettres attachées": [
    ask("Quelle lettre est faite de ponts ?", ["*m", "o", "l"], "le m se trace avec des ponts.", GESTURES),
    ask("Quelle lettre descend sous la ligne, comme le g ?", ["*j", "a", "e"], "la queue du j descend sous la ligne."),
    ask("Regarde les gestes. Lequel commence le b et le h ?", ["*la boucle", "le rond", "le pont"], "b et h commencent par une grande boucle.", GESTURES),
    tf("Le o est une lettre ronde.", true, "on le trace en tournant."),
    howMany("Combien de lettres compte l’alphabet ?", 26, "De a à z, l’alphabet compte <strong>26</strong> lettres."),
  ],
  "Décrire et comparer": [
    ask("Quelle phrase décrit bien le dessin ?", ["*Le ballon est rond, blanc et noir.", "Le ballon est carré et rouge.", "Le ballon est long et vert."], "on dit la forme et les couleurs.", scene(["ballon", "un ballon"])),
    ask("Compare. La girafe est…", ["*plus grande que le lapin", "plus petite que le lapin", "aussi petite que le lapin"], "la girafe a un très long cou.", scene(["girafe", "une girafe"], ["lapin", "un lapin"])),
    ask("Quelle phrase décrit le lion ?", ["*Le lion a une grosse crinière.", "Le lion a des ailes.", "Le lion a des plumes."], "la crinière entoure la tête du lion.", scene(["lion", "un lion"])),
    ask("Compare. Le camion est… que le taxi.", ["*plus long", "plus court"], "le camion porte de lourdes charges : il est bien plus long.", scene(["camion", "un camion"], ["taxi", "un taxi"])),
    ask("Pour décrire un lieu, je dis…", ["*ce que je vois et où sont les choses", "mon âge", "l’heure"], "par exemple : « L’école a un toit rouge. »", scene(["ecole", "l’école"])),
  ],
  "Les consonnes doubles": [
    ask("Quel mot commence par dr ?", [`*${pc("drapeau", "drapeau")}`, pc("train", "train"), pc("crayon", "crayon")], "« dra-peau » commence par dr."),
    ask("Quel mot commence par cr ?", [`*${pc("crayon", "crayon")}`, pc("drapeau", "drapeau"), pc("plante", "plante")], "« cra-yon » commence par cr."),
    ask("Quel mot commence par pl ?", [`*${pc("plante", "plante")}`, pc("fleur", "fleur"), pc("cle", "clé")], "« plan-te » commence par pl."),
    ask("Quel mot commence par cl ?", [`*${pc("cle", "clé")}`, pc("craie", "craie"), pc("table", "table")], "« clé » commence par cl."),
    ask("Dans quel mot entends-tu bl ?", [`*${pc("table", "table")}`, pc("lapin", "lapin"), pc("drapeau", "drapeau")], "« ta-ble » : on entend bl."),
  ],
  "Les sons oir, eur et les lettres muettes": [
    ask("Dans quel mot entends-tu le son <strong>[oir]</strong> ?", [`*${pc("arrosoir", "arrosoir")}`, pc("fleur", "fleur"), pc("poisson", "poisson")], "« a-rro-soir » se termine par [oir]."),
    ask("Dans quel mot entends-tu le son <strong>[eur]</strong> ?", [`*${pc("fleur", "fleur")}`, pc("arrosoir", "arrosoir"), pc("feu", "feu")], "« fleur » se termine par [eur]."),
    ask("Quelle lettre est muette dans « lit » ?", ["l", "i", "*t"], "on écrit t mais on ne l’entend pas.", scene(["lit", "un lit"])),
    ask("Quelle lettre est muette dans « riz » ?", ["r", "i", "*z"], "le z de riz ne s’entend pas.", scene(["sac-riz", "un sac de riz"])),
    ask("Dans quel mot entends-tu <strong>[ac]</strong> ?", [`*${pc("sac", "sac")}`, pc("lit", "lit"), pc("bol", "bol")], "« sac » se termine par [ac]."),
  ],
  "Donner des ordres et interdire": [
    ask("Le feu est rouge. Que dit-on à un enfant au bord de la route ?", ["*Attends, ne traverse pas !", "Cours vite !", "Traverse sans regarder !"], "au feu rouge, on attend.", scene(["feu-tricolore", "un feu rouge"])),
    ask("Sur la bouteille d’eau de Javel, ce dessin veut dire :", ["*Danger, ne touche pas !", "Bois-moi !", "Joue avec moi !"], "le losange rouge annonce un danger.", scene(["javel", "une bouteille d’eau de Javel"])),
    ask("Quelle phrase est une consigne ?", ["*Range tes crayons.", "Mes crayons sont rangés.", "J’aime mes crayons."], "« range » est un verbe d’action : il dit quoi faire.", scene(["crayon", "un crayon"])),
    ask("Pour interdire de jeter des papiers par terre, on dit :", ["*Ne jette pas tes papiers par terre.", "Jette tes papiers par terre.", "Les papiers sont blancs."], "« ne… pas » interdit.", scene(["poubelle", "une poubelle"])),
    tf("« Arrose la plante » est une consigne.", true, "« arrose » dit l’action à faire.", scene(["arrosoir", "un arrosoir"])),
  ],
  "Les sons ette, elle et ill": [
    ask("Quel mot se termine par « ette » ?", [`*${pc("fourchette", "fourchette")}`, pc("poubelle", "poubelle"), pc("verre-eau", "verre")], "« four-chette » se termine par ette."),
    ask("Quel mot se termine par « elle » ?", [`*${pc("poubelle", "poubelle")}`, pc("lunettes", "lunettes"), pc("feuille", "feuille")], "« pou-belle » se termine par elle."),
    ask("Dans quel mot entends-tu <strong>[euil]</strong> ?", [`*${pc("feuille", "feuille")}`, pc("soleil", "soleil"), pc("abeille", "abeille")], "« feuille » : on entend [euil]."),
    ask("Dans quel mot entends-tu <strong>[ouil]</strong> ?", [`*${pc("grenouille", "grenouille")}`, pc("fourchette", "fourchette"), pc("oreille", "oreille")], "« gre-nouille » : on entend [ouil]."),
    ask("Dans quel mot entends-tu <strong>[eil]</strong> ?", [`*${pc("abeille", "abeille")}`, pc("feuille", "feuille"), pc("grenouille", "grenouille")], "« a-beille » : on entend [eil]."),
  ],
  "Les sons ier, ieu, ien, ui, oin et ion": [
    ask("Dans quel mot entends-tu <strong>[ion]</strong> ?", [`*${pc("camion", "camion")}`, pc("chien", "chien"), pc("puits", "puits")], "« ca-mion » se termine par [ion]."),
    ask("Dans quel mot entends-tu <strong>[ui]</strong> ?", [`*${pc("puits", "puits")}`, pc("lion", "lion"), pc("panier", "panier")], "« puits » : on entend [ui]."),
    ask("Quel mot se termine par « ier » ?", [`*${pc("panier", "panier")}`, pc("lion", "lion"), pc("taxi", "taxi")], "« pa-nier » se termine par ier."),
    ask("Dans quel mot vois-tu la lettre x ?", [`*${pc("taxi", "taxi")}`, pc("lapin", "lapin"), pc("avion", "avion")], "« ta-xi » s’écrit avec x."),
    soundPick("ion", ["lion", "lion"], [["lune", "lune"], ["lit", "lit"]]),
  ],
  "Écrire de petits textes": [
    ask("Quelle phrase va avec le dessin ?", ["*Le coq chante le matin.", "Le coq nage dans la mer.", "Le coq dort sous le lit."], "on voit un coq et le soleil du matin.", scene(["coq", "un coq"], ["soleil", "le soleil"])),
    ask("Remets les mots dans l’ordre : arrose / Awa / les fleurs", ["*Awa arrose les fleurs.", "Les fleurs Awa arrose.", "Arrose les fleurs Awa."], "on dit d’abord qui fait l’action.", scene(["eleve-fille", "Awa"], ["arrosoir", "un arrosoir"])),
    ask("Quel petit texte est bien écrit ?", ["*Le chat dort. Il fait la sieste.", "le chat dort il fait la sieste", "Le chat dort il fait. la sieste"], "chaque phrase commence par une majuscule et finit par un point.", scene(["chat", "un chat"])),
    ask("Pour décrire le drapeau, j’écris :", ["*Il a trois bandes : verte, jaune et rouge.", "Il a des roues.", "Il est carré et noir."], "le drapeau du Sénégal est vert, jaune et rouge, avec une étoile verte.", scene(["drapeau", "le drapeau du Sénégal"])),
    ask("Quel mot termine bien la phrase « Le train roule sur les… » ?", ["*rails.", "nuages.", "arbres."], "le train roule sur des rails.", scene(["train", "un train"])),
  ],
  // ── ESVS ──
  "Histoire : l’ordre et la fréquence des événements": [
    ask("Dans l’ordre, qu’est-ce qui vient juste après l’école ?", ["*le repas", "le matin", "la nuit"], "le matin, l’école, le repas, puis la nuit.", DAY),
    ask("Le coq chante tous les matins. Cela arrive…", ["*souvent", "rarement", "jamais"], "tous les matins : cela arrive souvent.", scene(["coq", "un coq"])),
    ask("La Tabaski revient une fois par an. Elle arrive…", ["*rarement", "tous les jours", "toutes les heures"], "une fois par an, c’est rare."),
    ask("Quel mot dit ce qui vient en premier ?", ["*d’abord", "enfin", "après"], "« d’abord » ouvre le récit."),
    tf("On se brosse les dents après le repas.", true, "après le repas, on se brosse les dents.", scene(["brosse-a-dents", "une brosse à dents"])),
  ],
  "Histoire : mesurer le temps": [
    ask("Quel instrument donne la date du jour ?", ["*le calendrier", "le sablier", "la balance"], "le calendrier montre les jours et les mois."),
    ask("Regarde l’horloge. Quelle heure est-il ?", ["*3 heures", "12 heures", "6 heures"], "la petite aiguille est sur le 3, la grande sur le 12.", schemaFig("cp-heure-3", "Une horloge qui marque 3 heures.")),
    ask("Qu’est-ce qui dure le moins longtemps ?", [`*${pc("main", "taper dans ses mains")}`, pc("ecole", "une journée d’école"), pc("train", "un voyage en train")], "taper dans ses mains dure un instant."),
    ask("Avec quoi peut-on lire l’heure ?", [`*${pc("telephone", "le téléphone")}`, pc("sablier", "le sablier"), pc("livre", "le livre")], "le téléphone affiche l’heure ; le sablier mesure seulement une durée."),
    ask("Le sable du sablier a fini de tomber. Cela veut dire que…", ["*la durée choisie est passée", "il est midi", "c’est dimanche"], "le sablier mesure une durée.", scene(["sablier", "un sablier"])),
  ],
  "Géographie : situer et ranger": [
    ask("Où est le cahier ?", ["*entre le crayon et le ballon", "à gauche du crayon", "à droite du ballon"], "le cahier est au milieu.", schemaFig("cp-entre", "Un crayon, un cahier et un ballon sur une étagère.")),
    ask("Qu’y a-t-il dans l’ensemble A ?", ["*des fruits", "des affaires d’école"], "mangue, orange, banane : ce sont des fruits.", schemaFig("cp-trier", "Deux ensembles : A des fruits, B des affaires d’école.")),
    ask("Quel objet range-t-on avec les affaires d’école ?", [`*${pc("gomme", "la gomme")}`, pc("mangue", "la mangue"), pc("savon", "le savon")], "la gomme sert en classe."),
    ask("Range les animaux du plus petit au plus grand. Lequel vient en premier ?", [`*${pc("abeille", "l’abeille")}`, pc("chien", "le chien"), pc("girafe", "la girafe")], "l’abeille est la plus petite."),
    ask("Où est la pastèque ?", ["*sur la table", "sous la table"], "la pastèque est posée sur la table.", schemaFig("ci-sur-sous", "Une pastèque sur une table et un ballon sous la table.")),
  ],
  "Géographie : estimer et mesurer des distances": [
    ask("Quel arbre est le plus loin de la maison ?", ["*l’arbre B", "l’arbre A"], "son pointillé est le plus long.", schemaFig("cp-distances", "Une maison et deux arbres A et B, reliés à elle par des pointillés.")),
    howMany("On a posé le mètre bout à bout. Combien de mètres mesure la bande ?", 5, "On compte les mètres posés : <strong>5</strong> mètres.", schemaFig("cp-pas", "Une bande mesurée avec un mètre posé 5 fois.")),
    ask("Quel moyen de transport va le plus loin, d’un pays à l’autre ?", [`*${pc("avion", "l’avion")}`, pc("velo", "le vélo"), pc("jouet", "la voiture en fil de fer")], "l’avion fait de très longs trajets."),
    tf("L’empan, c’est la main ouverte, du pouce au petit doigt.", true, "on mesure avec sa main bien ouverte.", scene(["main", "une main ouverte"])),
    ask("Pour mesurer la cour sans mètre, on peut compter…", ["*ses pas", "les nuages", "les heures"], "le pas est une unité naturelle."),
  ],
  "Sciences : outils et objets techniques": [
    ask("Quel outil sert à couper le papier ?", [`*${pc("ciseaux", "les ciseaux")}`, pc("marteau", "le marteau"), pc("pelle", "la pelle")], "les ciseaux coupent."),
    ask("Quel outil sert à creuser un trou ?", [`*${pc("pelle", "la pelle")}`, pc("ciseaux", "les ciseaux"), pc("peigne", "le peigne")], "la pelle creuse la terre."),
    ask("Quel objet sert à balayer la cour ?", [`*${pc("balai", "le balai")}`, pc("marteau", "le marteau"), pc("echelle", "l’échelle")], "le balai ramasse la poussière."),
    ask("Quel objet aide à monter en haut d’un mur ?", [`*${pc("echelle", "l’échelle")}`, pc("balai", "le balai"), pc("arrosoir", "l’arrosoir")], "on grimpe sur les barreaux de l’échelle."),
    ask("Quel objet éclaire la nuit ?", [`*${pc("lampe", "la lampe de poche")}`, pc("pelle", "la pelle"), pc("gomme", "la gomme")], "la lampe éclaire grâce à ses piles."),
  ],
  "Sciences : comprendre et fabriquer un objet": [
    ask("Quelle partie du vélo sert à s’asseoir ?", ["*la selle", "le guidon", "la pédale"], "on s’assoit sur la selle.", BIKE),
    ask("Sur quelle partie du vélo appuie-t-on avec les pieds ?", ["*la pédale", "la selle", "le guidon"], "en appuyant sur les pédales, on fait avancer le vélo.", BIKE),
    ask("Avec quoi est fabriquée cette petite voiture ?", ["*du fil de fer et des bouchons", "du pain", "de l’eau"], "c’est un jouet de récupération.", scene(["jouet", "une voiture en fil de fer"])),
    howMany("Combien de roues a ce vélo ?", 2, "Un vélo a <strong>2</strong> roues.", scene(["velo", "un vélo"])),
    ask("Le camion a des roues pour…", ["*rouler", "voler", "nager"], "les roues font rouler le camion.", scene(["camion", "un camion"])),
  ],
  "Vivre dans son milieu : éviter les intoxications": [
    ask("Que veut dire ce dessin sur la bouteille ?", ["*Danger !", "Bon à boire", "Pour jouer"], "le losange rouge avec un point d’exclamation annonce un danger.", scene(["javel", "une bouteille d’eau de Javel"])),
    ask("Tu trouves des comprimés sur la table. Que fais-tu ?", ["*Je ne les touche pas et je préviens un adulte.", "Je les goûte.", "Je les donne à mon petit frère."], "un médicament peut empoisonner.", scene(["medicament", "des médicaments"])),
    tf("On peut verser de l’eau de Javel dans une bouteille de jus.", false, "on pourrait la boire par erreur : elle reste dans sa bouteille d’origine."),
    ask("Qui peut te donner un médicament ?", ["*un adulte, comme le soignant l’a dit", "un camarade", "toi tout seul"], "c’est l’adulte qui le donne.", scene(["maman", "maman"])),
    ask("Avec quoi te laves-tu les mains sans danger ?", [`*${pc("savon", "le savon et l’eau")}`, pc("javel", "l’eau de Javel"), pc("medicament", "un médicament")], "le savon se rince à l’eau."),
  ],
  "Vivre dans son milieu : protéger l’environnement": [
    ask("Qu’est-ce qui appartient à tout le monde ?", [`*${pc("ecole", "l’école")}`, pc("cartable", "mon cartable"), pc("chemise", "ma chemise")], "l’école est un bien commun."),
    ask("Où verse-t-on l’eau de la vaisselle ?", ["*dans le trou ou le caniveau prévu", "au milieu de la rue", "dans la fontaine"], "l’eau usée ne doit pas stagner dans la rue."),
    ask("La fontaine du quartier fuit. Que fais-tu ?", ["*Je préviens un adulte.", "Je la casse.", "Je laisse couler l’eau."], "on protège les biens communs.", scene(["fontaine", "la fontaine"])),
    ask("Quel insecte butine les fleurs et fait le miel ?", [`*${pc("abeille", "l’abeille")}`, pc("moustique", "le moustique"), pc("grenouille", "la grenouille")], "l’abeille est utile : on la protège."),
    tf("On peut écrire sur les tables de l’école.", false, "les tables sont des biens communs : on les garde propres.", scene(["table", "une table"])),
  ],
  "Vivre ensemble : respect et bonne conduite": [
    ask("Un aîné entre dans la pièce. Que fais-tu ?", ["*Je le salue poliment.", "Je l’ignore.", "Je crie."], "saluer les aînés, c’est les respecter.", scene(["papa", "un aîné"])),
    ask("Ton camarade parle. Toi, tu…", ["*attends ton tour pour parler", "lui coupes la parole", "pars"], "on écoute avant de répondre.", scene(["oreille", "une oreille"])),
    ask("Pour te respecter toi-même, tu…", ["*prends soin de ton corps et de ta propreté", "ne te laves jamais", "manges des aliments abîmés"], "le respect commence par soi-même.", scene(["savon", "du savon"])),
    ask("Un camarade n’a pas de gomme. Tu…", ["*lui prêtes la tienne", "caches la tienne", "te moques de lui"], "partager, c’est être solidaire.", scene(["gomme", "une gomme"])),
    tf("Se moquer d’un camarade, c’est le respecter.", false, "se moquer blesse : ce n’est pas du respect."),
  ],
  "Vivre ensemble : règles et responsabilités": [
    ask("Le feu est rouge pour toi. Que fais-tu ?", ["*J’attends.", "Je traverse en courant.", "Je joue sur la route."], "au rouge, on attend.", scene(["feu-tricolore", "un feu rouge"])),
    ask("Avant de manger, la règle d’hygiène dit :", ["*Je me lave les mains au savon.", "Je joue avec la terre.", "Je ne bois pas."], "les mains propres évitent les microbes.", scene(["savon", "du savon"])),
    ask("La maîtresse te confie l’arrosage des plantes. Tu…", ["*les arroses chaque jour, comme promis", "oublies", "les arraches"], "être responsable, c’est tenir son engagement.", scene(["arrosoir", "un arrosoir"])),
    ask("Quelle règle de la classe est bonne ?", ["*Lever la main pour parler", "Crier pour être entendu", "Courir dans la classe"], "on lève la main et on attend son tour.", scene(["main", "une main levée"])),
    ask("Après la classe, le chef de rangée…", ["*range les livres de sa rangée", "jette les livres", "rentre sans rien faire"], "chacun a une responsabilité.", scene(["livre", "des livres"])),
  ],
};
