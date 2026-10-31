import "server-only";

// CM1 : questions illustrées ajoutées aux séries de français et d'ESVS (8 questions par chapitre),
// avec les dessins de la banque, la carte du Sénégal et les schémas des leçons. Elles complètent les
// questions de cm1/exercises.ts sans les répéter.

import type { ExerciseSpec } from "../exercise-series";
import { ask, pc, scene, schemaFig, tf } from "../illustrated-questions";

const MAP = schemaFig("sn-regions", "Carte du Sénégal et de ses 14 régions ; Dakar est marquée d’un point rouge.");
const WATER = schemaFig("cm1-etats-eau", "Les trois états de l’eau : solide, liquide, gaz, avec les flèches des changements d’état.");
const CANDLES = schemaFig("cm1-bougies", "Deux bougies : l’une brûle à l’air, l’autre s’est éteinte sous un verre retourné.");
const CYCLE = schemaFig("cm1-fleur-graine", "De la fleur au fruit, puis la graine germe et donne une jeune plante.");
const CIRCUIT = schemaFig("ce2-circuit", "Un circuit électrique fermé : la pile, les fils, l’interrupteur et l’ampoule.");
const ROAD = schemaFig("cm1-passage-pieton", "Une route, un passage piéton et un feu ; un enfant regarde des deux côtés.");

export const EXTRA_CM1: Record<string, ExerciseSpec[]> = {
  // ── Français ──
  "Lire et comprendre des textes variés": [
    ask("Le titre d’un texte sert à…", ["*annoncer de quoi il parle", "donner la fin de l’histoire", "compter les mots"], "il donne une première idée du sujet.", scene(["livre", "un livre"])),
    ask("Pour comprendre un récit, je cherche…", ["*qui ? quoi ? où ? quand ?", "la couleur du livre", "le prix du livre"], "ces questions aident à suivre l’histoire."),
    ask("Un texte qui explique comment fabriquer un jouet est…", ["*injonctif", "narratif", "poétique"], "il dit quoi faire, étape par étape.", scene(["jouet", "une voiture en fil de fer"])),
    ask("La légende sous une image sert à…", ["*expliquer l’image", "décorer la page", "cacher l’image"], "elle dit ce que montre l’image."),
    tf("Relire un passage difficile aide à le comprendre.", true, "on lit une deuxième fois, plus lentement."),
  ],
  "Le dialogue": [
    ask("« — Viens vite ! cria Awa. » Qui parle ?", ["*Awa", "Modou", "personne"], "« cria Awa » indique qui parle.", scene(["eleve-fille", "Awa"])),
    ask("Quel verbe montre qu’on parle fort ?", ["*crier", "chuchoter", "murmurer"], "chuchoter et murmurer, c’est parler tout bas."),
    ask("« Où est le marché ? » Le personnage…", ["*pose une question", "donne un ordre", "raconte une histoire"], "la phrase finit par un point d’interrogation.", scene(["boutique", "le marché"])),
    ask("Dans « — Au marché, répondit Modou. », « répondit Modou » se place…", ["*après les paroles de Modou", "avant tout le dialogue", "à la fin du livre"], "on dit qui parle juste après ses paroles."),
    tf("Un dialogue peut se trouver dans un conte.", true, "les personnages des contes se parlent.", scene(["lapin", "un lièvre"])),
  ],
  "La phrase": [
    ask("« Ferme la porte. » est une phrase…", ["*injonctive (impérative)", "interrogative", "exclamative"], "elle donne un ordre.", scene(["maison", "une maison"])),
    ask("Quelle phrase est à la forme négative ?", ["*Le car ne part pas.", "Le car part.", "Part le car ?"], "ne… pas : c’est la forme négative.", scene(["camion", "un car"])),
    ask("Transforme en question : « Tu viens au marché. »", ["*Viens-tu au marché ?", "Tu viens au marché.", "Viens au marché !"], "on inverse le sujet et on met un point d’interrogation.", scene(["boutique", "le marché"])),
    ask("Quel signe termine une phrase exclamative ?", ["*!", "?", "."], "le point d’exclamation exprime un sentiment fort."),
    tf("« Il ne pleut jamais ici » est une phrase négative.", true, "ne… jamais."),
  ],
  "La nature des mots": [
    ask("Dans « Le lion rugit », « rugit » est…", ["*un verbe", "un nom", "un adjectif"], "il dit ce que fait le lion.", scene(["lion", "un lion"])),
    ask("Dans « une grosse tortue », « grosse » est…", ["*un adjectif qualificatif", "un nom", "un verbe"], "il dit comment est la tortue.", scene(["tortue", "une tortue"])),
    ask("Dans « mon cartable », « mon » est…", ["*un déterminant", "un verbe", "un adverbe"], "c’est un déterminant possessif.", scene(["cartable", "un cartable"])),
    ask("« Dakar » est…", ["*un nom propre", "un nom commun", "un adjectif"], "il commence par une majuscule : c’est le nom d’une ville."),
    ask("« et », « ou », « mais » sont des…", ["*conjonctions de coordination", "noms", "verbes"], "ils relient des mots ou des propositions."),
  ],
  "Les fonctions dans la phrase": [
    ask("Dans « Le pêcheur répare son filet », le sujet est…", ["*le pêcheur", "répare", "son filet"], "qui est-ce qui répare ? le pêcheur.", scene(["pirogue", "une pirogue"])),
    ask("Dans « Awa offre un livre à Fatou », « à Fatou » est…", ["*COI", "COD", "sujet"], "elle offre à qui ? à Fatou.", scene(["livre", "un livre"])),
    ask("Dans « Le ciel devient gris », « gris » est…", ["*attribut du sujet", "COD", "COI"], "« devient » relie le sujet à son attribut.", scene(["nuage", "un nuage gris"])),
    ask("Dans « Modou mange une mangue », « une mangue » est…", ["*COD", "COI", "sujet"], "il mange quoi ? une mangue.", scene(["mangue", "une mangue"])),
    tf("L’attribut du sujet suit souvent le verbe être.", true, "« Le lion est fort. »"),
  ],
  "Les propositions": [
    ask("« Le coq chante et le soleil se lève. » Les propositions sont…", ["*coordonnées", "juxtaposées"], "elles sont reliées par « et ».", scene(["coq", "un coq"])),
    ask("« Il pleut ; les enfants rentrent. » Les propositions sont…", ["*juxtaposées", "coordonnées"], "un point-virgule les sépare.", scene(["nuage", "un nuage"])),
    ask("Une proposition se construit autour…", ["*d’un verbe conjugué", "d’un adjectif", "d’un nom propre"], "un verbe conjugué = une proposition."),
    ask("Quel mot peut coordonner deux propositions ?", ["*donc", "sous", "très"], "mais, ou, et, donc, or, ni, car."),
    tf("« Awa lit. » est une proposition indépendante.", true, "elle a un seul verbe conjugué et se suffit à elle-même."),
  ],
  "Le présent de l’indicatif": [
    ask("Les poules (pondre) des œufs →", ["*pondent", "pondes", "pond"], "ils pondent : terminaison -ent.", scene(["poule", "une poule"])),
    ask("Tu (finir) ton devoir →", ["*finis", "finit", "finissez"], "2e groupe : tu finis.", scene(["cahier", "un cahier"])),
    ask("Nous (faire) du thé →", ["*faisons", "faisez", "font"], "faire : nous faisons.", scene(["tasse", "une tasse"])),
    ask("Ils (prendre) le train →", ["*prennent", "prendent", "prend"], "prendre : ils prennent.", scene(["train", "un train"])),
    ask("Je (voir) la mer →", ["*vois", "voit", "voyons"], "voir : je vois.", scene(["pirogue", "la mer et une pirogue"])),
  ],
  "Les temps du passé": [
    ask("Imparfait : le lion (dormir) sous l’arbre →", ["*dormait", "dormit", "dort"], "l’imparfait décrit le décor.", scene(["lion", "un lion"])),
    ask("Passé simple : soudain, le lièvre (arriver) →", ["*arriva", "arrivait", "arrive"], "le passé simple raconte une action soudaine.", scene(["lapin", "un lièvre"])),
    ask("Passé composé : nous (manger) du riz →", ["*avons mangé", "mangions", "mangeâmes"], "avoir au présent + participe passé.", scene(["sac-riz", "du riz"])),
    ask("Plus-que-parfait : ils (partir) avant la pluie →", ["*étaient partis", "partaient", "sont partis"], "être à l’imparfait + participe passé.", scene(["nuage", "un nuage de pluie"])),
    tf("L’imparfait décrit souvent le décor d’une histoire.", true, "« Il faisait chaud, le soleil brillait. »"),
  ],
  "Le futur et le conditionnel": [
    ask("Futur : l’avion (partir) à midi →", ["*partira", "partirait", "part"], "il partira : terminaison -ra.", scene(["avion", "un avion"])),
    ask("Conditionnel : si j’avais un vélo, je (aller) plus vite →", ["*irais", "irai", "vais"], "après « si + imparfait », on met le conditionnel.", scene(["velo", "un vélo"])),
    ask("Futur : vous (voir) la mer →", ["*verrez", "voirez", "verriez"], "voir → vous verrez."),
    ask("Quelle phrase est au conditionnel ?", ["*Je voudrais un verre d’eau.", "Je veux un verre d’eau.", "J’ai voulu un verre d’eau."], "« voudrais » : conditionnel de politesse.", scene(["verre-eau", "un verre d’eau"])),
    ask("Futur : nous (être) à l’heure →", ["*serons", "serions", "sommes"], "être → nous serons."),
  ],
  "Les accords": [
    ask("Des (beau) fleurs →", ["*belles", "beaux", "beau"], "« fleurs » est féminin pluriel.", scene(["fleur", "une fleur"])),
    ask("Les poissons (nager) →", ["*nagent", "nage", "nages"], "le sujet est au pluriel.", scene(["poisson", "un poisson"])),
    ask("Une chemise (blanc) →", ["*blanche", "blanc", "blancs"], "blanc → blanche au féminin.", scene(["chemise", "une chemise"])),
    ask("Les chèvres sont (rentré) →", ["*rentrées", "rentrés", "rentré"], "avec être, le participe s’accorde avec le sujet.", scene(["chevre", "une chèvre"])),
    tf("Dans « les grands arbres », « grands » est au pluriel.", true, "il s’accorde avec « arbres »."),
  ],
  "Les homophones grammaticaux": [
    ask("… joue au ballon dans la cour.", ["*On", "Ont"], "on peut dire « il joue ».", scene(["ballon", "un ballon"])),
    ask("Les enfants … mangé.", ["*ont", "on"], "on peut dire « avaient mangé ».", scene(["bol", "un bol"])),
    ask("… livre est à moi.", ["*Ce", "Se"], "« ce » montre le livre.", scene(["livre", "un livre"])),
    ask("Les élèves … rangent en silence.", ["*se", "ce"], "« se ranger » est un verbe pronominal."),
    ask("Je mange … je bois.", ["*et", "est"], "on peut dire « et puis »."),
  ],
  "Le vocabulaire et le dictionnaire": [
    ask("Un synonyme de « joli » est…", ["*beau", "laid", "grand"], "les deux mots ont un sens proche."),
    ask("Le contraire de « allumer » est…", ["*éteindre", "brûler", "briller"], "on allume puis on éteint la lampe.", scene(["lampe", "une lampe"])),
    ask("Lequel est de la famille de « terre » ?", ["*terrain", "tête", "tirer"], "terrain contient le radical terr-."),
    ask("Dans le dictionnaire, l’abréviation « n. » signifie…", ["*nom", "nord", "neuf"], "« n. m. » : nom masculin."),
    ask("Quel préfixe forme le contraire de « heureux » ?", ["*mal- (malheureux)", "re- (reheureux)", "in- (inheureux)"], "malheureux est le contraire de heureux."),
  ],
  Rédiger: [
    ask("Dans un plan, la conclusion se trouve…", ["*à la fin", "au début", "au milieu"], "on termine par la conclusion."),
    ask("Pour séparer les idées d’un texte, j’utilise…", ["*des paragraphes", "une seule longue phrase", "seulement des dessins"], "une idée par paragraphe."),
    ask("Quel mot de liaison exprime la conséquence ?", ["*donc", "mais", "or"], "« Il pleut, donc je prends mon parapluie. »"),
    ask("Avant de rédiger, je cherche des idées…", ["*au brouillon", "dans le cahier du voisin", "sur le mur"], "le brouillon sert à préparer.", scene(["cahier", "un cahier de brouillon"])),
    tf("Je relis mon texte pour corriger l’orthographe.", true, "je vérifie les accords et la ponctuation."),
  ],
  // ── ESVS ──
  "La préhistoire et la protohistoire au Sénégal": [
    ask("Les premiers hommes fabriquaient leurs outils en…", [`*${pc("caillou", "pierre taillée")}`, pc("telephone", "plastique"), pc("cle", "métal brillant")], "ils taillaient des pierres."),
    ask("Au néolithique, les hommes ont commencé à…", ["*cultiver et élever des animaux", "prendre l’avion", "écrire des livres"], "ils deviennent agriculteurs et éleveurs.", scene(["plante", "une plante cultivée"])),
    ask("Les cercles mégalithiques se trouvent dans les régions de…", ["*Kaolack et Kaffrine", "Saint-Louis et Matam", "Ziguinchor et Kolda"], "par exemple Sine Ngayène et Wanar.", MAP),
    ask("Qui étudie les traces du passé ?", ["*les archéologues", "les pilotes", "les boulangers"], "ils fouillent le sol et étudient outils, poteries et tombes."),
    tf("La poterie est apparue au néolithique.", true, "les hommes ont commencé à fabriquer des poteries."),
  ],
  "L’empire du Ghana et le Tékrour": [
    ask("Contre quoi l’or du Ghana était-il échangé ?", ["*le sel", "le pétrole", "le coton"], "le sel venait du Sahara."),
    ask("Comment le sel arrivait-il du nord ?", ["*par les caravanes du Sahara", "en avion", "par le train"], "les caravanes traversaient le désert."),
    ask("Où se trouvait le Tékrour ?", ["*dans la vallée du fleuve Sénégal", "en Casamance", "à Dakar"], "au nord, régions actuelles de Saint-Louis et de Matam.", MAP),
    ask("Le Ghana était un empire…", ["*soninké", "sérère", "diola"], "on l’appelait aussi le Wagadou."),
    tf("Le commerce transsaharien reliait l’Afrique de l’Ouest à l’Afrique du Nord.", true, "les caravanes traversaient le Sahara."),
  ],
  "Le Sénégal sur la carte": [
    ask("Quel pays est au nord du Sénégal ?", ["*la Mauritanie", "la Guinée", "le Mali"], "le fleuve Sénégal sert de frontière.", MAP),
    ask("Quels pays sont au sud du Sénégal ?", ["*la Guinée et la Guinée-Bissau", "la Mauritanie et le Mali", "le Maroc et l’Algérie"], "ils sont au sud de la Casamance et de Kédougou.", MAP),
    ask("Quelle région est la plus à l’ouest ?", ["*Dakar", "Matam", "Kédougou"], "Dakar avance dans l’océan.", MAP),
    ask("Quel océan borde le Sénégal ?", ["*l’océan Atlantique", "l’océan Indien", "l’océan Pacifique"], "la côte est à l’ouest."),
    ask("Quelle région est tout au sud-est, près du Mali et de la Guinée ?", ["*Kédougou", "Louga", "Thiès"], "elle est en bas à droite de la carte.", MAP),
  ],
  "Le climat du Sénégal": [
    ask("Au nord du Sénégal, les pluies sont…", ["*faibles", "très fortes"], "moins de 400 mm par an vers Podor et Matam.", MAP),
    ask("La saison des pluies dure environ…", ["*de juin-juillet à octobre", "toute l’année", "de janvier à mars"], "c’est l’hivernage."),
    ask("Le vent frais et humide qui souffle de l’océan sur la côte est…", ["*l’alizé maritime", "l’harmattan", "le vent du désert"], "l’harmattan, lui, est chaud et sec."),
    ask("Pendant l’hivernage, la mousson apporte…", ["*la pluie", "la neige", "le sable"], "elle vient de l’océan, au sud-ouest.", scene(["nuage", "un nuage de pluie"])),
    tf("Ziguinchor reçoit plus de pluie que Podor.", true, "le sud est plus pluvieux que le nord."),
  ],
  "Végétation, faune et parcs nationaux": [
    ask("Au nord du Sénégal, la végétation est surtout…", ["*la steppe", "la forêt dense", "la mangrove"], "il pleut peu : herbes et arbustes."),
    ask("Le parc du Niokolo-Koba se trouve…", ["*au sud-est, vers Tambacounda", "à Dakar", "à Saint-Louis"], "c’est le plus grand parc du Sénégal.", MAP),
    ask("Quel animal sauvage peut-on voir dans un parc national ?", [`*${pc("lion", "le lion")}`, pc("chat", "le chat"), pc("poule", "la poule")], "les parcs protègent la faune sauvage."),
    ask("Pourquoi crée-t-on des parcs nationaux ?", ["*pour protéger la faune et la flore", "pour construire des routes", "pour couper les arbres"], "les animaux et les plantes y sont protégés."),
    tf("Le baobab pousse dans la savane.", true, "c’est un arbre typique de la savane.", scene(["arbre", "un arbre"])),
  ],
  "Les transports et les échanges": [
    ask("Lequel transporte beaucoup de marchandises sur l’océan ?", ["*le bateau", "le vélo", "la charrette"], "les navires arrivent au port.", scene(["pirogue", "un bateau"])),
    ask("Lequel va le plus vite ?", [`*${pc("avion", "l’avion")}`, pc("camion", "le camion"), pc("velo", "le vélo")], "l’avion relie les pays en quelques heures."),
    ask("Le grand port du Sénégal se trouve à…", ["*Dakar", "Kédougou", "Matam"], "c’est le port autonome de Dakar."),
    ask("On transporte le poisson de Mbour vers l’intérieur surtout…", ["*par la route", "en avion", "à pied"], "camions et cars sillonnent le pays.", scene(["camion", "un camion"])),
    tf("Le train peut transporter des voyageurs et des marchandises.", true, "le TER et le train de marchandises.", scene(["train", "un train"])),
  ],
  "Les états de l’eau": [
    ask("Sur ce schéma, comment s’appelle le passage de l’eau liquide à la vapeur ?", ["*l’évaporation", "la fusion", "la solidification"], "l’eau devient gaz.", WATER),
    ask("Le passage de la vapeur à l’eau liquide s’appelle…", ["*la condensation", "la fusion", "l’évaporation"], "la vapeur se refroidit et redevient liquide.", WATER),
    ask("Au congélateur, l’eau devient…", ["*de la glace", "de la vapeur", "du sable"], "c’est la solidification."),
    ask("Quand on chauffe l’eau dans la marmite, elle…", ["*s’évapore", "gèle", "disparaît dans le sol"], "la chaleur la transforme en vapeur.", scene(["feu", "le feu"])),
    ask("Les nuages se forment par…", ["*condensation de la vapeur d’eau", "fusion de la glace", "combustion"], "la vapeur se refroidit en altitude.", scene(["nuage", "un nuage"])),
  ],
  "L’air et la combustion": [
    ask("Sur le dessin, quelle bougie continue de brûler ?", ["*celle qui est à l’air", "celle qui est sous le verre"], "elle a toujours de l’air.", CANDLES),
    ask("Un feu d’huile prend dans une marmite. On…", ["*la couvre avec un couvercle", "verse de l’eau dessus", "souffle dessus"], "sans air, le feu s’éteint ; l’eau ferait jaillir l’huile brûlante.", scene(["feu", "le feu"])),
    ask("Pourquoi souffle-t-on sur les braises ?", ["*pour leur apporter de l’air", "pour les refroidir", "pour les mouiller"], "l’air ranime le feu."),
    ask("Lequel est un combustible ?", [`*${pc("feu", "le bois")}`, pc("caillou", "le caillou"), pc("verre-eau", "l’eau")], "le bois brûle."),
    ask("Qu’est-ce qui gonfle ce ballon ?", ["*l’air", "l’eau", "le sable"], "l’air est invisible mais il existe.", scene(["ballon-baudruche", "un ballon gonflé"])),
  ],
  "Les plantes à fleurs": [
    ask("Sur ce schéma, que donne la graine qui germe ?", ["*une jeune plante", "une fleur fanée", "un caillou"], "la graine germe et la plante grandit.", CYCLE),
    ask("Qui transporte le pollen d’une fleur à l’autre ?", ["*le vent et les insectes", "les poissons", "les pierres"], "l’abeille porte le pollen.", scene(["abeille", "une abeille"])),
    ask("Le pollen est produit par…", ["*les étamines", "les racines", "l’écorce"], "les étamines sont dans la fleur."),
    ask("Lequel contient des graines ?", [`*${pc("pasteque", "la pastèque")}`, pc("caillou", "le caillou"), pc("cle", "la clé")], "le fruit contient les graines."),
    tf("L’abeille aide les fleurs à devenir des fruits.", true, "elle transporte le pollen.", scene(["abeille", "une abeille"])),
  ],
  "Les aliments et leur conservation": [
    ask("Comment conserve-t-on le poisson sans réfrigérateur ?", ["*en le séchant au soleil", "en le laissant dans l’eau tiède", "en le jetant"], "le poisson séché se garde longtemps.", scene(["poisson", "un poisson"])),
    ask("Pourquoi sale-t-on la viande à sécher ?", ["*pour empêcher les microbes de se développer", "pour la colorer", "pour la rendre plus lourde"], "le sel aide à conserver."),
    ask("Lequel se conserve longtemps au sec ?", [`*${pc("sac-riz", "le riz")}`, pc("lait", "le lait frais"), pc("poisson", "le poisson frais")], "le riz sec ne pourrit pas vite."),
    ask("Une boîte de conserve gonflée…", ["*ne se mange pas", "se mange tout de suite", "se met au soleil"], "elle peut contenir des microbes dangereux."),
    tf("On lave les fruits avant de les manger.", true, "l’eau enlève la terre et une partie des microbes.", scene(["mangue", "une mangue"])),
  ],
  "L’électricité": [
    ask("Dans ce circuit, l’ampoule s’allume parce que le circuit est…", ["*fermé", "ouvert", "cassé"], "le courant fait le tour du circuit.", CIRCUIT),
    ask("Lequel est isolant ?", [`*${pc("regle", "la règle en plastique")}`, pc("cle", "la clé en métal"), pc("fourchette", "la fourchette en métal")], "le plastique ne laisse pas passer le courant."),
    ask("À quoi sert l’interrupteur ?", ["*à ouvrir ou fermer le circuit", "à produire l’électricité", "à faire du bruit"], "il allume ou éteint l’ampoule.", CIRCUIT),
    ask("Un fil électrique est tombé par terre. Que fais-tu ?", ["*Je ne le touche pas et je préviens un adulte.", "Je le ramasse.", "Je saute dessus."], "il peut être dangereux."),
    ask("Une pile possède…", ["*un pôle + et un pôle −", "deux pôles +", "aucun pôle"], "on la met dans le bon sens."),
  ],
  "L’organisation administrative": [
    ask("L’arrondissement est dirigé par…", ["*un sous-préfet", "un roi", "le directeur de l’école"], "région : gouverneur ; département : préfet ; arrondissement : sous-préfet."),
    ask("Le conseil municipal est élu par…", ["*les habitants de la commune", "le président seul", "les élèves"], "on vote pour choisir ses représentants."),
    ask("Quelle est la capitale du Sénégal ?", ["*Dakar", "Thiès", "Kaolack"], "c’est le point rouge sur la carte.", MAP),
    ask("Le chef-lieu de la région de Ziguinchor est…", ["*Ziguinchor", "Kolda", "Sédhiou"], "la région porte le nom de sa ville principale.", MAP),
    tf("Le département est divisé en arrondissements.", true, "le pays est découpé en régions, départements, arrondissements."),
  ],
  "Les droits de l’enfant": [
    ask("Lequel est un droit de l’enfant ?", [`*${pc("ecole", "aller à l’école")}`, pc("camion", "conduire un camion"), pc("feu", "travailler près du feu")], "c’est le droit à l’éducation."),
    ask("Jouer et se reposer est…", ["*un droit de l’enfant", "interdit", "réservé aux adultes"], "le jeu fait grandir.", scene(["ballon", "un ballon"])),
    ask("Le texte qui protège les droits des enfants du monde s’appelle…", ["*la Convention relative aux droits de l’enfant", "le code de la route", "le règlement du marché"], "elle a été adoptée en 1989."),
    ask("Faire travailler un jeune enfant toute la journée, c’est…", ["*une atteinte à ses droits", "un droit", "une fête"], "l’enfant doit aller à l’école et se reposer."),
    tf("Les enfants handicapés ont les mêmes droits que les autres.", true, "tous les enfants ont les mêmes droits."),
  ],
  "La sécurité routière": [
    ask("Sur ce dessin, où traverse-t-on ?", ["*sur le passage piéton", "au milieu de la route", "derrière un car garé"], "les bandes blanches indiquent le passage.", ROAD),
    ask("Avant de traverser, je regarde…", ["*à gauche, à droite, puis encore à gauche", "seulement devant moi", "mon téléphone"], "je vérifie que la route est libre.", ROAD),
    ask("À vélo, je porte…", ["*un casque", "seulement des sandales", "rien"], "le casque protège la tête.", scene(["velo", "un vélo"])),
    ask("En voiture, les enfants s’assoient…", ["*à l’arrière, avec la ceinture", "sur les genoux du conducteur", "près d’une portière ouverte"], "la ceinture protège en cas de choc.", scene(["taxi", "un taxi"])),
    tf("On ne joue pas au ballon sur la route.", true, "c’est très dangereux.", scene(["ballon", "un ballon"])),
  ],
  "Hygiène et maladies": [
    ask("Comment éviter la diarrhée ?", ["*boire de l’eau potable et se laver les mains", "manger des fruits non lavés", "boire l’eau de la mare"], "les microbes passent par l’eau et les mains sales.", scene(["savon", "du savon"])),
    ask("Lequel protège du paludisme ?", [`*${pc("moustiquaire", "la moustiquaire")}`, pc("savon", "le savon"), pc("ballon", "le ballon")], "elle empêche les moustiques de piquer."),
    ask("Le vaccin sert à…", ["*protéger d’une maladie", "guérir une jambe cassée", "grandir plus vite"], "il apprend au corps à se défendre.", scene(["medicament", "au centre de santé"])),
    ask("Quand doit-on se laver les mains ?", ["*avant de manger et après les toilettes", "jamais", "seulement le dimanche"], "les mains propres évitent les microbes."),
    tf("Couvrir les aliments les protège des mouches.", true, "les mouches transportent des microbes.", scene(["bol", "un bol"])),
  ],
  "Les déchets et la pollution": [
    ask("Que peut-on faire d’une vieille boîte de conserve propre ?", ["*la réutiliser pour fabriquer un jouet", "la jeter dans la mer", "la brûler"], "c’est du recyclage.", scene(["jouet", "un jouet de récupération"])),
    ask("Où met-on les déchets ?", [`*${pc("poubelle", "dans la bonne poubelle")}`, pc("arbre", "au pied d’un arbre"), pc("pirogue", "dans la mer")], "on trie et on jette au bon endroit."),
    ask("Les sachets plastiques dans les champs…", ["*empêchent l’eau d’entrer dans le sol", "font pousser les plantes", "nourrissent les animaux"], "ils abîment la terre."),
    ask("Pour réduire les déchets au marché, on peut…", ["*prendre un panier", "demander un sachet à chaque achat", "jeter les sacs par terre"], "le panier sert longtemps.", scene(["panier", "un panier"])),
    tf("Un animal peut mourir s’il avale un sachet plastique.", true, "le sachet bouche son estomac.", scene(["chevre", "une chèvre"])),
  ],
  "Les ressources naturelles": [
    ask("Laquelle est une ressource naturelle ?", [`*${pc("arbre", "la forêt")}`, pc("telephone", "le téléphone"), pc("camion", "le camion")], "elle vient de la nature."),
    ask("Pour économiser l’eau, on…", ["*répare les robinets qui fuient", "laisse couler l’eau", "lave la cour à grande eau chaque jour"], "chaque goutte compte.", scene(["fontaine", "un robinet"])),
    ask("Le foyer amélioré protège…", ["*la forêt", "la mer", "seulement l’air"], "il consomme moins de bois.", scene(["feu", "un feu de bois"])),
    ask("Pêcher de très petits poissons…", ["*les empêche de grandir et de se reproduire", "augmente le nombre de poissons", "n’a aucun effet"], "on laisse grandir les jeunes poissons.", scene(["poisson", "un poisson"])),
    tf("L’énergie du soleil ne s’épuise pas.", true, "c’est une énergie renouvelable.", scene(["soleil", "le soleil"])),
  ],
};
