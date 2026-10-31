import "server-only";

// CM2 : questions illustrées ajoutées aux séries de français et d'ESVS (8 questions par chapitre),
// avec les dessins de la banque, la carte du Sénégal et les schémas des leçons. Elles complètent les
// questions de cm2/exercises.ts sans les répéter.

import type { ExerciseSpec } from "../exercise-series";
import { ask, pc, scene, schemaFig, tf } from "../illustrated-questions";

const MAP = schemaFig("sn-regions", "Carte du Sénégal et de ses 14 régions ; Dakar est marquée d’un point rouge.");
const EMPIRES = schemaFig("cm2-empires", "Une frise : l’empire du Ghana, puis l’empire du Mali, puis l’empire songhaï.");
const DIGESTION = schemaFig("cm2-digestion", "Le trajet des aliments : bouche, œsophage, estomac, intestin grêle, gros intestin.");
const BREATH = schemaFig("cm2-respiration", "Le trajet de l’air : nez ou bouche, trachée, bronches, poumons.");
const BLOOD = schemaFig("cm2-circulation", "La circulation : le cœur, les artères, les organes, les veines.");
const CHAIN = schemaFig("cm2-chaine", "Une chaîne alimentaire : l’herbe, la chèvre, le lion.");
const CIRCUIT = schemaFig("ce2-circuit", "Un circuit électrique fermé : la pile, les fils, l’interrupteur et l’ampoule.");

export const EXTRA_CM2: Record<string, ExerciseSpec[]> = {
  // ── Français ──
  "Lire et comprendre un texte": [
    ask("Pour comprendre un texte, je me pose les questions…", ["*qui ? quoi ? où ? quand ? comment ? pourquoi ?", "combien coûte le livre ?", "quelle heure est-il ?"], "elles aident à repérer l’essentiel.", scene(["livre", "un livre"])),
    ask("Le titre « La pêche à Kayar » annonce…", ["*un texte sur la pêche", "une recette de cuisine", "un poème sur la neige"], "le titre donne le sujet du texte.", scene(["pirogue", "une pirogue de pêche"])),
    ask("Un poème est écrit en…", ["*vers", "colonnes de chiffres", "tableaux"], "les vers sont regroupés en strophes."),
    ask("Pour vérifier le sens d’un mot, je consulte…", ["*le dictionnaire", "le calendrier", "la carte"], "le dictionnaire donne les sens du mot."),
    tf("Les illustrations d’un texte aident à le comprendre.", true, "elles montrent les personnages et les lieux."),
  ],
  "Le texte dialogué": [
    ask("« — Tu viens jouer ? demanda Fatou. » Qui parle ?", ["*Fatou", "Ibou", "le narrateur"], "« demanda Fatou » indique qui parle.", scene(["eleve-fille", "Fatou"])),
    ask("Quel verbe de parole introduit une réponse ?", ["*répondre", "demander", "crier"], "« répondit Ibou »."),
    ask("« Awa dit : “Je suis fatiguée.” » Au discours indirect, cela devient…", ["*Awa dit qu’elle est fatiguée.", "Awa dit : je suis fatiguée.", "Awa est dite fatiguée."], "au discours indirect, on supprime les guillemets et on change le pronom."),
    ask("Quel signe ferme un dialogue ?", ["*»", "«", "—"], "on ouvre avec « et on ferme avec »."),
    tf("Dans un dialogue, on va à la ligne à chaque changement de personne qui parle.", true, "et on met un tiret."),
  ],
  "La phrase et les propositions": [
    ask("« Quel beau coucher de soleil ! » est une phrase…", ["*exclamative", "interrogative", "injonctive"], "elle exprime un sentiment fort.", scene(["soleil", "le soleil"])),
    ask("La forme négative de « Il pleut souvent » est…", ["*Il ne pleut jamais.", "Il pleut toujours.", "Pleut-il ?"], "souvent ↔ ne… jamais.", scene(["nuage", "un nuage"])),
    ask("Quel mot peut relier deux propositions coordonnées ?", ["*mais", "sous", "très"], "mais, ou, et, donc, or, ni, car."),
    ask("« Il pleut ; nous restons à la maison. » Les propositions sont…", ["*juxtaposées", "coordonnées", "subordonnées"], "un point-virgule les sépare."),
    tf("Une phrase simple contient un seul verbe conjugué.", true, "une phrase complexe en contient plusieurs."),
  ],
  "Les fonctions dans la phrase": [
    ask("Dans « Awa offre un livre à sa sœur », le COI est…", ["*à sa sœur", "un livre", "Awa"], "elle offre à qui ? à sa sœur.", scene(["livre", "un livre"])),
    ask("Dans « Le lion semble fatigué », « fatigué » est…", ["*attribut du sujet", "COD", "complément de lieu"], "« semble » est un verbe d’état.", scene(["lion", "un lion"])),
    ask("Dans « À midi, les élèves mangent », « À midi » indique…", ["*le temps", "le lieu", "la manière"], "ils mangent quand ? à midi.", scene(["bol", "un bol"])),
    ask("Dans « Les enfants jouent dans la cour », « dans la cour » est…", ["*complément circonstanciel de lieu", "COD", "sujet"], "ils jouent où ? dans la cour.", scene(["ballon", "un ballon"])),
    ask("Le sujet répond à la question…", ["*qui est-ce qui ? ou qu’est-ce qui ?", "où ?", "quand ?"], "on pose la question devant le verbe."),
  ],
  "La proposition subordonnée": [
    ask("Dans « Le chien qui aboie est à Modou », la subordonnée relative est…", ["*qui aboie", "le chien", "est à Modou"], "elle complète le nom « chien ».", scene(["chien", "un chien"])),
    ask("« Quand il pleut, nous restons à la maison. » La subordonnée exprime…", ["*le temps", "la cause", "le but"], "« quand » introduit le temps.", scene(["nuage", "un nuage de pluie"])),
    ask("Quel mot peut introduire une subordonnée relative ?", ["*qui", "mais", "et"], "qui, que, dont, où."),
    ask("« Je reste à la maison parce qu’il pleut. » La conjonction est…", ["*parce que", "il", "reste"], "« parce que » introduit la cause."),
    tf("Une subordonnée ne peut pas être employée seule.", true, "elle dépend de la proposition principale."),
  ],
  "Déterminants et pronoms": [
    ask("Dans « mes cahiers », « mes » est un déterminant…", ["*possessif", "démonstratif", "numéral"], "il dit à qui sont les cahiers.", scene(["cahier", "des cahiers"])),
    ask("Dans « trois mangues », « trois » est un déterminant…", ["*numéral", "possessif", "démonstratif"], "il donne un nombre.", scene(["mangue", "des mangues"])),
    ask("« Awa range ses livres » devient « Awa … range. »", ["*les", "la", "leur"], "« les » remplace « ses livres ».", scene(["livre", "des livres"])),
    ask("« Je parle à mes parents » devient « Je … parle. »", ["*leur", "les", "lui"], "« leur » remplace « à mes parents »."),
    ask("Quel pronom remplace « Awa et moi » ?", ["*nous", "vous", "ils"], "moi + une autre personne = nous."),
  ],
  "Le présent de l’indicatif": [
    ask("Je (jeter) les papiers à la poubelle →", ["*jette", "jete", "jettes"], "jeter double le t : je jette.", scene(["poubelle", "une poubelle"])),
    ask("Nous (nettoyer) la classe →", ["*nettoyons", "nettoiyons", "nettoient"], "avec nous, on garde le y.", scene(["balai", "un balai"])),
    ask("Vous (prendre) le taxi →", ["*prenez", "prennez", "prendez"], "prendre : vous prenez.", scene(["taxi", "un taxi"])),
    ask("Tu (vouloir) de l’eau →", ["*veux", "veut", "voulez"], "vouloir : tu veux.", scene(["verre-eau", "un verre d’eau"])),
    ask("Elle (grandir) vite →", ["*grandit", "grandi", "grandis"], "2e groupe : elle grandit.", scene(["plante", "une plante"])),
  ],
  "Les temps du passé": [
    ask("Passé simple : ils (arriver) →", ["*arrivèrent", "arrivaient", "sont arrivés"], "1er groupe : ils arrivèrent."),
    ask("Imparfait : nous (habiter) à Thiès →", ["*habitions", "habitons", "habitâmes"], "nous habitions : terminaison -ions."),
    ask("Passé composé : elle (partir) →", ["*est partie", "a parti", "partit"], "partir se conjugue avec être : elle est partie."),
    ask("Plus-que-parfait : j’(finir) mon devoir →", ["*avais fini", "ai fini", "finissais"], "avoir à l’imparfait + participe passé.", scene(["cahier", "un cahier"])),
    tf("Le passé simple s’emploie surtout à l’écrit, dans les récits.", true, "on l’emploie peu à l’oral."),
  ],
  "Le futur et le conditionnel": [
    ask("Futur : ils (venir) demain →", ["*viendront", "venirons", "viendraient"], "venir → ils viendront."),
    ask("Conditionnel de politesse : je (vouloir) un livre, s’il vous plaît →", ["*voudrais", "voudrai", "veux"], "le conditionnel adoucit la demande.", scene(["livre", "un livre"])),
    ask("Futur antérieur : quand j’(finir), je sortirai →", ["*aurai fini", "avais fini", "finirais"], "avoir au futur + participe passé."),
    ask("Futur : tu (faire) tes devoirs →", ["*feras", "fairas", "ferais"], "faire → tu feras.", scene(["cahier", "un cahier"])),
    ask("Quelle phrase exprime une condition ?", ["*Si tu travailles, tu réussiras.", "Tu travailles.", "Travaille !"], "« si » introduit la condition."),
  ],
  "Le subjonctif et l’impératif": [
    ask("Il faut que nous (partir) →", ["*partions", "partons", "partirons"], "subjonctif : que nous partions."),
    ask("Il faut que vous (être) à l’heure →", ["*soyez", "êtes", "serez"], "être au subjonctif : que vous soyez."),
    ask("Impératif de « finir » (2e personne du pluriel) :", ["*finissez", "finissiez", "finirez"], "« Finissez vos exercices ! »"),
    ask("Impératif de « avoir » (2e personne du singulier) : « … du courage ! »", ["*Aie", "As", "Ai"], "avoir à l’impératif : aie, ayons, ayez."),
    ask("Quelle phrase contient un subjonctif ?", ["*Il faut que tu viennes.", "Tu viens.", "Viens !"], "après « il faut que »."),
  ],
  "Les accords": [
    ask("Le féminin de « sportif » est…", ["*sportive", "sportife", "sportifve"], "-if devient -ive."),
    ask("Des chemises (blanc) →", ["*blanches", "blancs", "blanc"], "chemises : féminin pluriel.", scene(["chemise", "une chemise"])),
    ask("Les poules ont (pondre) des œufs →", ["*pondu", "pondues", "pondus"], "avec avoir, le participe ne s’accorde pas avec le sujet.", scene(["oeuf", "un œuf"])),
    ask("Une robe (bleu) →", ["*bleue", "bleu", "bleus"], "robe est féminin singulier.", scene(["robe", "une robe"])),
    ask("Des fleurs (rouge) →", ["*rouges", "rouge"], "fleurs est au pluriel.", scene(["fleur", "une fleur"])),
  ],
  "Les homophones grammaticaux": [
    ask("Awa range … affaires.", ["*ses", "ces"], "ce sont les siennes : ses.", scene(["cartable", "ses affaires"])),
    ask("… sont les enfants de Modou.", ["*Ce", "Se"], "« ce » montre : ce sont…"),
    ask("Les élèves … en classe.", ["*sont", "son"], "on peut dire « étaient en classe »."),
    ask("Il va … l’école.", ["*à", "a"], "on ne peut pas dire « avait l’école »."),
    ask("Je ne sais pas … il viendra.", ["*si", "s’y"], "« si » marque une condition ou une question."),
  ],
  "Mots invariables et ponctuation": [
    ask("L’adverbe formé sur « lent » est…", ["*lentement", "lentment", "lentemant"], "lent → lente → lentement.", scene(["tortue", "une tortue"])),
    ask("Quel signe peut séparer deux propositions juxtaposées ?", ["*le point-virgule (;)", "le tiret (—)", "les guillemets"], "« Il pleut ; nous restons. »"),
    ask("« sous », « sur », « dans » sont des…", ["*prépositions", "verbes", "noms"], "ce sont des mots invariables."),
    ask("Quels signes encadrent les paroles d’un personnage ?", ["*les guillemets « »", "les parenthèses", "les points"], "on ouvre et on ferme les guillemets."),
    tf("Un adverbe est invariable.", true, "il ne change jamais d’orthographe."),
  ],
  "Le sens des mots": [
    ask("« Modou est un lion ! » : « lion » est employé au sens…", ["*figuré", "propre"], "Modou n’est pas un animal : il est courageux.", scene(["lion", "un lion"])),
    ask("Un synonyme de « débuter » est…", ["*commencer", "finir", "arrêter"], "les deux mots ont un sens proche."),
    ask("Le contraire de « ancien » est…", ["*nouveau", "vieux", "usé"], "ancien ↔ nouveau."),
    ask("Dans « une feuille de papier », « feuille » veut dire…", ["*une page", "une partie de l’arbre", "un insecte"], "c’est le contexte qui donne le sens.", scene(["feuille", "une feuille d’arbre"])),
    ask("« canne » (le bâton) et « cane » (l’oiseau) sont des…", ["*homonymes", "synonymes", "contraires"], "ils se prononcent pareil mais n’ont pas le même sens."),
  ],
  "La formation des mots": [
    ask("Dans « impossible », le préfixe « im- » signifie…", ["*le contraire", "encore une fois", "avant"], "impossible : qui n’est pas possible."),
    ask("Lequel est de la famille de « mer » ?", ["*marin", "mère", "maire"], "marin vient de « mer »."),
    ask("Le suffixe « -ette » dans « maisonnette » indique…", ["*quelque chose de petit", "une action", "une personne"], "une maisonnette est une petite maison.", scene(["maison", "une maison"])),
    ask("Le radical commun à « terrain, terrasse, enterrer » est…", ["*terr-", "-ain", "en-"], "c’est la partie qui ne change pas."),
    ask("Quel mot est formé avec le préfixe « re- » ?", ["*refaire", "reine", "renard"], "refaire : faire de nouveau."),
  ],
  "Rédiger un texte": [
    ask("Dans une lettre, la formule de politesse se place…", ["*à la fin, avant la signature", "au début", "dans le titre"], "on termine poliment.", scene(["enveloppe", "une lettre"])),
    ask("Pour décrire un lieu, je vais…", ["*du général au particulier", "du dernier détail au premier", "au hasard"], "je présente d’abord l’ensemble, puis les détails."),
    ask("Un bon paragraphe développe…", ["*une idée principale", "toutes les idées du texte", "un seul mot"], "une idée par paragraphe."),
    ask("Quel mot de liaison exprime une opposition ?", ["*cependant", "donc", "ensuite"], "cependant, mais, pourtant."),
    ask("Avant de rédiger, je fais…", ["*un plan au brouillon", "le texte définitif tout de suite", "seulement un dessin"], "le plan organise les idées.", scene(["cahier", "un cahier de brouillon"])),
  ],
  // ── ESVS ──
  "Les grands empires du Soudan occidental": [
    ask("Sur la frise, quel empire vient en premier ?", ["*le Ghana", "le Mali", "le Songhaï"], "le temps descend sur la frise.", EMPIRES),
    ask("La capitale de l’empire du Ghana était…", ["*Koumbi Saleh", "Gao", "Tombouctou"], "Gao était la capitale de l’empire songhaï."),
    ask("L’empire du Mali est fondé après la bataille de…", ["*Kirina", "Tondibi", "Dékheulé"], "vers 1235."),
    ask("Tombouctou et Djenné étaient de grands centres…", ["*de savoir", "de pêche en mer", "de mines de fer"], "on y trouvait des savants et des livres."),
    tf("L’empire songhaï fut détruit par l’armée marocaine en 1591.", true, "à la bataille de Tondibi."),
  ],
  "Les royaumes du Sénégal": [
    ask("Le roi du Baol portait le titre de…", ["*Teigne", "Damel", "Brak"], "le Damel régnait sur le Cayor, le Brak sur le Walo."),
    ask("Le roi du Walo portait le titre de…", ["*Brak", "Teigne", "Bour Sine"], "le Walo était près du fleuve."),
    ask("Où se trouvait le royaume du Saloum ?", ["*autour de Kaolack", "autour de Saint-Louis", "en Casamance"], "au centre-ouest du pays.", MAP),
    ask("Le royaume du Walo se trouvait…", ["*près du fleuve Sénégal, vers Saint-Louis", "vers Kédougou", "vers Ziguinchor"], "au nord-ouest.", MAP),
    tf("Le Djolof se trouvait autour de Linguère.", true, "dans l’actuelle région de Louga.", MAP),
  ],
  "La traite négrière": [
    ask("Vers quel continent les captifs étaient-ils déportés ?", ["*l’Amérique", "l’Asie", "l’Océanie"], "ils traversaient l’océan Atlantique."),
    ask("La traite atlantique a duré…", ["*du XVIe au XIXe siècle", "un seul été", "depuis l’an 2000"], "pendant plus de trois siècles."),
    ask("Aujourd’hui, l’île de Gorée est…", ["*un lieu de mémoire inscrit au patrimoine mondial", "une mine d’or", "un aéroport"], "on y rappelle les souffrances de la traite."),
    ask("En Amérique, les captifs étaient forcés de travailler…", ["*dans les plantations", "dans des écoles", "comme touristes"], "coton, canne à sucre, tabac."),
    tf("Les captifs étaient vendus comme des marchandises.", true, "ils étaient privés de liberté."),
  ],
  "La conquête coloniale et les résistances": [
    ask("De quelle ville est partie la conquête française du Sénégal ?", ["*Saint-Louis", "Kédougou", "Ziguinchor"], "au nord-ouest, près de l’embouchure du fleuve.", MAP),
    ask("Quel gouverneur a mené la conquête à partir de 1854 ?", ["*Faidherbe", "Senghor", "Blaise Diagne"], "Louis Faidherbe."),
    ask("Alboury Ndiaye était le dernier Bourba du…", ["*Djolof", "Cayor", "Sine"], "il est mort en exil en 1901."),
    ask("Maba Diakhou Bâ est mort à la bataille de…", ["*Somb (1867)", "Kirina", "Tondibi"], "il résistait dans le Rip et le Saloum."),
    ask("Où Lat Dior est-il mort au combat ?", ["*à Dékheulé, en 1886", "à Gorée", "à Gao"], "il s’opposait au chemin de fer."),
  ],
  "De la colonisation à l’indépendance du Sénégal": [
    ask("En 1902, Dakar devient la capitale…", ["*de l’AOF", "du Mali actuel", "de la Mauritanie"], "l’Afrique-Occidentale française.", MAP),
    ask("Quelles villes formaient les Quatre Communes ?", ["*Saint-Louis, Gorée, Rufisque et Dakar", "Thiès, Kaolack, Louga et Matam", "Ziguinchor, Kolda, Sédhiou et Kédougou"], "leurs habitants avaient des droits de citoyens.", MAP),
    ask("En 1959, le Sénégal et le Soudan français forment…", ["*la Fédération du Mali", "l’empire du Ghana", "la CEDEAO"], "elle n’a duré que quelques mois."),
    ask("En quelle année le Sénégal devient-il indépendant ?", ["*1960", "1902", "1886"], "on fête l’indépendance le 4 avril.", scene(["drapeau", "le drapeau du Sénégal"])),
    tf("La Fédération du Mali est devenue indépendante le 20 juin 1960.", true, "puis le Sénégal a pris son indépendance seul."),
  ],
  "Le Sénégal : situation et milieu physique": [
    ask("Le point le plus à l’ouest de l’Afrique est…", ["*la pointe des Almadies, à Dakar", "Kédougou", "Saint-Louis"], "Dakar avance dans l’océan.", MAP),
    ask("Quel pays est presque entièrement entouré par le Sénégal ?", ["*la Gambie", "le Mali", "la Guinée"], "elle s’étend le long du fleuve Gambie.", MAP),
    ask("Le fleuve qui coule en Casamance s’appelle…", ["*la Casamance", "le Niger", "le Nil"], "il a donné son nom à la région naturelle."),
    ask("Les plus hauts reliefs du Sénégal sont au…", ["*sud-est (Kédougou)", "nord (Saint-Louis)", "centre (Kaolack)"], "le reste du pays est surtout plat.", MAP),
    tf("Le Sénégal est bordé par l’océan Atlantique.", true, "à l’ouest."),
  ],
  "La population et les régions du Sénégal": [
    ask("Combien d’habitants le Sénégal compte-t-il environ (2023) ?", ["*18 millions", "1 million", "180 millions"], "d’après le recensement de 2023."),
    ask("Quelle région est très peuplée sur une petite surface ?", ["*Dakar", "Tambacounda", "Matam"], "c’est la plus petite région, mais la plus peuplée.", MAP),
    ask("L’est du Sénégal est…", ["*peu peuplé", "très peuplé"], "la population se concentre à l’ouest.", MAP),
    ask("La population du Sénégal est surtout…", ["*jeune", "très âgée"], "beaucoup d’habitants ont moins de 20 ans."),
    ask("Quelle région est la plus au nord ?", ["*Saint-Louis", "Ziguinchor", "Fatick"], "elle est en haut de la carte.", MAP),
  ],
  "Les activités économiques du Sénégal": [
    ask("Le bassin arachidier se trouve surtout…", ["*au centre-ouest (Kaolack, Fatick, Diourbel)", "à Kédougou", "seulement à Saint-Louis"], "l’arachide et le mil y sont cultivés.", MAP),
    ask("Les phosphates sont exploités à…", ["*Taïba", "Sabodala", "Gorée"], "Sabodala est une mine d’or."),
    ask("Laquelle est une activité de pêche ?", [`*${pc("pirogue", "partir en mer en pirogue")}`, pc("vache", "garder les troupeaux"), pc("plante", "cultiver des légumes")], "la pêche est importante sur la côte."),
    ask("Le riz est surtout cultivé…", ["*dans la vallée du fleuve et en Casamance", "dans le désert", "en pleine mer"], "le riz a besoin de beaucoup d’eau."),
    tf("Le Sénégal produit du pétrole et du gaz depuis 2024.", true, "ce sont de nouvelles ressources."),
  ],
  "L’Afrique et le monde": [
    ask("Quel océan borde l’ouest de l’Afrique ?", ["*l’Atlantique", "le Pacifique", "l’Arctique"], "le Sénégal est sur cette côte."),
    ask("Le plus grand désert d’Afrique est…", ["*le Sahara", "le Ferlo", "les Niayes"], "il couvre le nord du continent."),
    ask("L’Afrique est bordée par l’océan Atlantique et par l’océan…", ["*Indien", "Pacifique", "Arctique"], "l’océan Indien est à l’est."),
    ask("Lequel n’est pas un continent ?", ["*le Sahara", "l’Asie", "l’Europe"], "le Sahara est un désert."),
    tf("Le Sénégal est membre de la CEDEAO.", true, "la Communauté économique des États de l’Afrique de l’Ouest."),
  ],
  "La digestion et la nutrition": [
    ask("Sur ce schéma, où vont les aliments après l’œsophage ?", ["*dans l’estomac", "dans les poumons", "dans le cœur"], "l’œsophage mène à l’estomac.", DIGESTION),
    ask("Quel est le dernier organe de ce trajet ?", ["*le gros intestin", "la bouche", "l’estomac"], "il est à la fin du tube digestif.", DIGESTION),
    ask("Les dents servent à…", ["*couper et broyer les aliments", "respirer", "entendre"], "la digestion commence dans la bouche."),
    ask("Pour bien digérer, on…", ["*mâche longtemps", "avale sans mâcher", "mange en courant"], "des aliments bien mâchés se digèrent mieux."),
    tf("Boire de l’eau aide la digestion.", true, "l’eau aide les aliments à avancer."),
  ],
  "La respiration et la circulation": [
    ask("Sur ce schéma, par où passe l’air juste après le nez ?", ["*la trachée", "l’estomac", "les veines"], "puis les bronches et les poumons.", BREATH),
    ask("Le cœur fonctionne comme…", ["*une pompe", "un filtre", "un os"], "il envoie le sang dans tout le corps.", BLOOD),
    ask("Le sang revient au cœur par…", ["*les veines", "les artères", "les bronches"], "les artères partent du cœur, les veines y reviennent.", BLOOD),
    ask("Pendant une course, le cœur bat…", ["*plus vite", "moins vite", "plus du tout"], "les muscles ont besoin de plus d’oxygène."),
    tf("Le sport régulier fortifie le cœur.", true, "le cœur est un muscle."),
  ],
  "Les êtres vivants et leurs milieux": [
    ask("Sur cette chaîne, que mange la chèvre ?", ["*l’herbe", "le lion", "rien"], "la flèche part de ce qui est mangé.", CHAIN),
    ask("Dans cette chaîne, qui mange la chèvre ?", ["*le lion", "l’herbe", "personne"], "la chèvre est mangée par le lion.", CHAIN),
    ask("Lequel vit en milieu aquatique ?", [`*${pc("poisson", "le poisson")}`, pc("chevre", "la chèvre"), pc("lion", "le lion")], "le poisson vit dans l’eau."),
    ask("Lequel vit en milieu terrestre ?", [`*${pc("lion", "le lion")}`, pc("poisson", "le poisson")], "le lion vit sur la terre ferme."),
    tf("Si tous les lions disparaissaient, les chèvres pourraient devenir trop nombreuses.", true, "la chaîne alimentaire serait déséquilibrée."),
  ],
  "Outils et objets technologiques": [
    ask("Quel objet utilise une poulie ?", [`*${pc("puits", "le puits")}`, pc("marteau", "le marteau"), pc("regle", "la règle")], "la poulie aide à remonter le seau."),
    ask("Les ciseaux sont…", ["*un double levier", "une poulie", "une roue"], "deux leviers qui tournent autour d’un axe.", scene(["ciseaux", "des ciseaux"])),
    ask("Dans ce circuit, quel élément est le récepteur ?", ["*l’ampoule", "la pile", "le fil"], "le récepteur utilise l’énergie électrique.", CIRCUIT),
    ask("Un panneau solaire produit…", ["*de l’électricité", "de l’eau", "du bois"], "il transforme la lumière du soleil.", scene(["soleil", "le soleil"])),
    tf("Le marteau est un outil qui prolonge la main.", true, "il permet de frapper plus fort.", scene(["marteau", "un marteau"])),
  ],
  "Les symboles de la République": [
    ask("Dans quel ordre sont les bandes du drapeau, du côté du mât vers l’extérieur ?", ["*vert, or, rouge", "rouge, or, vert", "or, vert, rouge"], "l’étoile verte est sur la bande du milieu.", scene(["drapeau", "le drapeau du Sénégal"])),
    ask("Quel animal figure sur les armoiries du Sénégal ?", ["*le lion", "l’éléphant", "l’aigle"], "avec un baobab.", scene(["lion", "un lion"])),
    ask("Les bandes du drapeau sont…", ["*verticales", "horizontales", "en diagonale"], "trois bandes égales, debout.", scene(["drapeau", "le drapeau du Sénégal"])),
    ask("Qui a écrit les paroles de l’hymne national ?", ["*Léopold Sédar Senghor", "Lat Dior", "Blaise Diagne"], "le premier président du Sénégal était aussi poète."),
    tf("On se tient debout quand on joue l’hymne national.", true, "c’est une marque de respect."),
  ],
  "Les institutions de la République": [
    ask("Qui dirige le Gouvernement ?", ["*le Premier ministre", "le maire", "le gouverneur"], "il coordonne le travail des ministres."),
    ask("Les députés siègent à…", ["*l’Assemblée nationale", "la mairie", "l’école"], "ils votent les lois."),
    ask("Qui juge les personnes qui ne respectent pas la loi ?", ["*les juges des cours et tribunaux", "les députés", "les élèves"], "c’est le pouvoir judiciaire."),
    ask("Le Président de la République est élu…", ["*par les citoyens, au suffrage universel direct", "par les ministres", "par les enfants"], "chaque citoyen vote."),
    tf("Le pouvoir judiciaire est indépendant des autres pouvoirs.", true, "les juges décident librement, selon la loi."),
  ],
  "Vivre en communauté": [
    ask("Un groupement de promotion féminine aide…", ["*des femmes à mener des activités ensemble", "les voitures à rouler", "les poissons à nager"], "par exemple du maraîchage ou de la transformation de produits.", scene(["maman", "une femme du groupement"])),
    ask("Participer au set setal du quartier, c’est…", ["*nettoyer le quartier ensemble", "faire la fête seul", "rester chez soi"], "chacun aide à rendre le quartier propre.", scene(["balai", "un balai"])),
    ask("Un enfant a droit…", ["*à l’éducation, à la santé et au jeu", "à un salaire", "à une voiture"], "ses droits sont protégés.", scene(["ecole", "l’école"])),
    ask("Lequel est un devoir de l’enfant ?", ["*respecter les autres", "ne jamais aider", "casser le matériel"], "à chaque droit correspond un devoir."),
    tf("La solidarité aide les familles en difficulté.", true, "on s’entraide dans la communauté."),
  ],
  "La dégradation du milieu et des ressources": [
    ask("La coupe abusive des arbres provoque…", ["*l’avancée du désert", "plus de pluie", "plus de forêts"], "le sol nu s’abîme et s’assèche.", scene(["arbre", "un arbre"])),
    ask("Quel projet africain plante des arbres contre le désert ?", ["*la Grande Muraille verte", "le TER", "la CEDEAO"], "une bande d’arbres à travers le Sahel."),
    ask("Les foyers améliorés permettent…", ["*d’économiser le bois", "de brûler plus de bois", "de cuisiner sans feu"], "on coupe moins d’arbres.", scene(["feu", "un feu de bois"])),
    ask("Les déchets jetés dans la mer…", ["*tuent les poissons et les tortues", "nourrissent les poissons", "nettoient l’eau"], "le plastique est avalé par les animaux.", scene(["tortue", "une tortue"])),
    tf("Les pare-feu aident à arrêter les feux de brousse.", true, "ce sont des bandes sans herbe sèche."),
  ],
  "Alimentation, santé et carences nutritionnelles": [
    ask("Lequel donne surtout de l’énergie ?", [`*${pc("sac-riz", "le riz")}`, pc("poisson", "le poisson"), pc("mangue", "la mangue")], "les céréales donnent de l’énergie."),
    ask("Les fruits et légumes apportent…", ["*des vitamines", "seulement du sucre", "du sel"], "ils protègent contre les maladies.", scene(["mangue", "une mangue"])),
    ask("Un repas équilibré contient…", ["*des aliments des trois groupes", "seulement du riz", "seulement des bonbons"], "énergie, construction, protection."),
    ask("Le lait et les œufs aident surtout à…", ["*grandir et construire le corps", "sentir les odeurs", "voir la nuit"], "ils apportent des protéines.", scene(["oeuf", "un œuf"])),
    tf("Manger trop de sucreries abîme les dents.", true, "le sucre favorise les caries.", scene(["bonbon", "des bonbons"])),
  ],
};
