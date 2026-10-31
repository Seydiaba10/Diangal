import "server-only";

// CE2 : questions illustrées ajoutées aux séries de français et d'ESVS (8 questions par chapitre),
// avec les dessins de la banque, la carte du Sénégal et les schémas des leçons. Elles complètent les
// questions de ce2/exercises.ts sans les répéter.

import type { ExerciseSpec } from "../exercise-series";
import { ask, howMany, pc, scene, schemaFig, tf } from "../illustrated-questions";

const POSTER = schemaFig("ce2-affiche", "Une affiche de kermesse : samedi 12 décembre, 9 h, dans la cour de l’école, entrée 100 F.");
const MAP = schemaFig("sn-regions", "Carte du Sénégal et de ses 14 régions ; Dakar est marquée d’un point rouge.");
const PLANT = schemaFig("ce2-plante", "Une plante et ses parties : la fleur, les feuilles, la tige, un fruit et les racines.");
const CIRCUIT = schemaFig("ce2-circuit", "Un circuit électrique fermé : la pile, les fils, l’interrupteur et l’ampoule.");

export const EXTRA_CE2: Record<string, ExerciseSpec[]> = {
  // ── Français ──
  "Prendre la parole": [
    ask("Pour un exposé, je prépare…", ["*un début, un milieu et une fin", "seulement la fin", "rien du tout"], "un exposé organisé est plus facile à suivre.", scene(["cahier", "mes notes"])),
    ask("Pendant que je parle, je regarde…", ["*mon public", "mes pieds", "le plafond"], "regarder ceux qui écoutent les aide à suivre.", scene(["oeil", "un œil"])),
    ask("À la fin de mon exposé, je…", ["*remercie et réponds aux questions", "pars en courant", "recommence tout"], "on termine poliment."),
    ask("Quel geste aide à se faire comprendre ?", ["*montrer l’objet dont on parle", "se cacher le visage", "tourner le dos"], "les gestes accompagnent la parole."),
    tf("Il faut parler très vite pour finir plus tôt.", false, "on parle lentement et clairement."),
  ],
  "Récits, descriptions et consignes": [
    ask("Avec ce dessin, quel texte peut-on écrire ?", ["*une recette (texte injonctif)", "un conte", "un poème"], "un bol : on explique comment préparer un plat.", scene(["bol", "un bol"])),
    ask("« Il était une fois un lièvre très malin… » est…", ["*un récit (texte narratif)", "une recette", "une affiche"], "il raconte une histoire.", scene(["lapin", "un lièvre"])),
    ask("« La case est ronde, son toit est en paille. » Ce texte…", ["*décrit", "raconte", "donne des ordres"], "il fait voir la case.", scene(["case", "une case"])),
    ask("Dans un texte injonctif, les verbes sont souvent…", ["*à l’impératif ou à l’infinitif", "au passé", "absents"], "« Lave le riz. » ; « Laver le riz. »"),
    tf("Une notice de montage est un texte injonctif.", true, "elle dit, étape par étape, ce qu’il faut faire."),
  ],
  "La lettre": [
    ask("Où écrit-on l’adresse de la personne qui reçoit la lettre ?", ["*sur l’enveloppe", "sous la signature", "dans le titre"], "l’adresse permet au facteur de livrer la lettre.", scene(["enveloppe", "une enveloppe"])),
    ask("Quelle formule peut terminer une lettre à sa grand-mère ?", ["*Je t’embrasse très fort.", "Cher grand-père,", "Kaolack, le 3 mars"], "c’est une formule d’affection, à la fin."),
    ask("Celui qui écrit et envoie la lettre s’appelle…", ["*l’expéditeur", "le destinataire", "le facteur"], "le destinataire est celui qui la reçoit.", scene(["enveloppe", "une enveloppe"])),
    ask("Que colle-t-on sur l’enveloppe pour l’envoyer ?", ["*un timbre", "une photo", "un ticket de car"], "le timbre paie l’envoi.", scene(["enveloppe", "une enveloppe avec un timbre"])),
    tf("Dans une lettre à un ami, on peut le tutoyer.", true, "on vouvoie plutôt un adulte qu’on connaît peu."),
  ],
  "L’affiche": [
    ask("Regarde l’affiche. Quel jour a lieu la kermesse ?", ["*samedi 12 décembre", "dimanche 5 janvier", "lundi"], "la date est écrite sous l’image.", POSTER),
    ask("Combien coûte l’entrée ?", ["*100 F", "500 F", "rien"], "l’affiche le dit : « Entrée : 100 F ».", POSTER),
    ask("Où a lieu la kermesse ?", ["*dans la cour de l’école", "au marché", "à la plage"], "le lieu est écrit sur l’affiche.", POSTER),
    ask("Pourquoi met-on une image sur une affiche ?", ["*pour attirer le regard", "pour cacher le texte", "pour rien"], "l’image donne envie de lire."),
    tf("Une affiche doit pouvoir se lire de loin.", true, "le titre est écrit en gros."),
  ],
  "Le texte poétique": [
    ask("Quel mot rime avec « quartier » ?", ["*lever", "maison", "soleil"], "quar-tier, le-ver : le même son [é] à la fin."),
    ask("Quel mot rime avec « chanson » ?", ["*maison", "soleil", "coq"], "chan-son, mai-son : le même son [on]."),
    ask("Une strophe de quatre lignes a…", ["*4 vers", "2 vers", "8 vers"], "chaque ligne d’un poème est un vers."),
    ask("Pour dire un poème, je…", ["*le lis avec le ton, en respectant les pauses", "le crie très vite", "le lis sans m’arrêter"], "on fait sentir le rythme et les rimes."),
    tf("Un poème est toujours écrit en paragraphes.", false, "il est écrit en vers, regroupés en strophes."),
  ],
  "Les compléments d’objet": [
    ask("Dans « Awa arrose les fleurs », le COD est…", ["*les fleurs", "Awa", "arrose"], "Awa arrose quoi ? les fleurs.", scene(["arrosoir", "un arrosoir"])),
    ask("Dans « Modou parle à son père », le COI est…", ["*à son père", "Modou", "parle"], "Modou parle à qui ? à son père.", scene(["papa", "le père de Modou"])),
    ask("Dans « Le pêcheur répare sa pirogue », le COD est…", ["*sa pirogue", "le pêcheur", "répare"], "il répare quoi ? sa pirogue.", scene(["pirogue", "une pirogue"])),
    ask("Le COD répond à la question…", ["*quoi ? ou qui ? après le verbe", "où ?", "quand ?"], "il est relié directement au verbe."),
    tf("Dans « Fatou téléphone à sa tante », « à sa tante » est un COI.", true, "elle téléphone à qui ? à sa tante.", scene(["telephone", "un téléphone"])),
  ],
  "Le pronom personnel": [
    ask("« Awa lit le livre. » devient « Awa … lit. »", ["*le", "la", "les"], "« le » remplace « le livre ».", scene(["livre", "un livre"])),
    ask("« Les élèves chantent. » devient « … chantent. »", ["*Ils", "Il", "Elle"], "« ils » remplace un nom masculin pluriel."),
    ask("« Je donne la mangue à Modou. » devient « Je … donne la mangue. »", ["*lui", "le", "leur"], "« lui » remplace « à Modou ».", scene(["mangue", "une mangue"])),
    ask("« Maman et moi allons au marché. » devient « … allons au marché. »", ["*Nous", "Vous", "Ils"], "« maman et moi », c’est « nous ».", scene(["maman", "maman"])),
    tf("« elle » remplace un nom féminin singulier.", true, "« la poule picore » → « elle picore »."),
  ],
  "La phrase nominale et les articles": [
    ask("Quelle phrase nominale pourrait servir de titre à cette affiche ?", ["*Grande kermesse samedi !", "La kermesse aura lieu samedi.", "Venez samedi."], "une phrase nominale n’a pas de verbe.", POSTER),
    ask("Dans « un chat », l’article est…", ["*indéfini", "défini"], "« un » parle d’un chat qu’on ne connaît pas encore.", scene(["chat", "un chat"])),
    ask("Dans « la pirogue du pêcheur », l’article « la » est…", ["*défini", "indéfini"], "« la » parle d’une pirogue précise.", scene(["pirogue", "une pirogue"])),
    ask("« Défense de fumer » est…", ["*une phrase nominale", "une phrase verbale", "une question"], "il n’y a pas de verbe conjugué."),
    tf("« des » est l’article indéfini pluriel.", true, "un, une, des."),
  ],
  "Les compléments circonstanciels": [
    ask("Dans « Les enfants jouent au ballon sur la plage », « sur la plage » indique…", ["*le lieu", "le temps", "la manière"], "ils jouent où ? sur la plage.", scene(["ballon", "un ballon"])),
    ask("Dans « Le soir, les poules rentrent », « Le soir » indique…", ["*le temps", "le lieu"], "elles rentrent quand ? le soir.", scene(["lune", "la lune"])),
    ask("Dans « La tortue avance lentement », « lentement » indique…", ["*la manière", "le lieu", "le temps"], "elle avance comment ? lentement.", scene(["tortue", "une tortue"])),
    ask("Quelle question pose-t-on pour trouver le lieu ?", ["*où ?", "quand ?", "qui ?"], "le complément de lieu répond à « où ? »."),
    tf("« demain » est un complément circonstanciel de temps.", true, "il répond à « quand ? »."),
  ],
  "Adjectifs possessifs et démonstratifs": [
    ask("Modou montre une moto : « … moto est rapide. »", ["*Cette", "Cet", "Ces"], "moto est un nom féminin singulier.", scene(["moto", "une moto"])),
    ask("« … oiseau chante bien. »", ["*Cet", "Ce", "Cette"], "devant une voyelle, on écrit « cet ».", scene(["oiseau", "un oiseau"])),
    ask("C’est le vélo de Modou : c’est … vélo.", ["*son", "sa", "ses"], "un seul vélo, masculin : son.", scene(["velo", "un vélo"])),
    ask("Ce sont les cahiers d’Awa : ce sont … cahiers.", ["*ses", "son", "sa"], "plusieurs cahiers : ses.", scene(["cahier", "des cahiers"])),
    tf("« notre » est un adjectif possessif.", true, "notre classe, notre école."),
  ],
  "L’imparfait": [
    ask("Autrefois, grand-père (cultiver) le mil →", ["*cultivait", "cultive", "cultivera"], "une action qui se répétait dans le passé.", scene(["grand-pere", "grand-père"])),
    ask("Petit, je (jouer) avec une voiture en fil de fer →", ["*jouais", "joue", "jouerai"], "je jouais : terminaison -ais.", scene(["jouet", "une voiture en fil de fer"])),
    ask("Vous (aller) au puits chaque matin →", ["*alliez", "allez", "irez"], "vous alliez : terminaison -iez.", scene(["puits", "un puits"])),
    ask("Ils (avoir) une grande case →", ["*avaient", "ont", "auront"], "ils avaient : terminaison -aient.", scene(["case", "une case"])),
    ask("À l’imparfait, avec « nous », la terminaison est…", ["*-ions", "-ons", "-ez"], "nous jouions, nous allions."),
  ],
  "Le passé composé": [
    ask("Hier, Awa (prendre) le taxi → Awa…", ["*a pris", "a prendu", "prenait"], "le participe passé de prendre est « pris ».", scene(["taxi", "un taxi"])),
    ask("Nous (voir) un lion → nous…", ["*avons vu", "avons voir", "voyions"], "« avons » + « vu ».", scene(["lion", "un lion"])),
    ask("Les enfants (courir) dans la cour → ils…", ["*ont couru", "ont couri", "couraient"], "le participe passé de courir est « couru ».", scene(["ballon", "un ballon"])),
    ask("Fatou (venir) à l’école → Fatou…", ["*est venue", "a venu", "est venu"], "avec être, le participe s’accorde avec le sujet : venue.", scene(["ecole", "l’école"])),
    tf("Avec « aller », on utilise l’auxiliaire être : je suis allé.", true, "aller, venir, partir se conjuguent avec être."),
  ],
  "L’impératif et le futur simple": [
    ask("Futur : demain, il (faire) beau →", ["*fera", "faira", "fait"], "faire → il fera.", scene(["soleil", "le soleil"])),
    ask("Futur : vous (venir) à la fête →", ["*viendrez", "venirez", "venez"], "venir → vous viendrez.", scene(["ballon-baudruche", "des ballons de fête"])),
    ask("Impératif de « finir » (2e personne du singulier) :", ["*finis", "finit", "finissez"], "« Finis ton devoir ! »"),
    ask("Impératif de « aller » (1re personne du pluriel) :", ["*allons", "allez", "vas"], "« Allons à l’école ! »"),
    ask("Futur : nous (avoir) une kermesse →", ["*aurons", "avons", "avions"], "avoir → nous aurons.", scene(["ballon-baudruche", "des ballons"])),
  ],
  "Le féminin et le pluriel des noms": [
    ask("Le féminin de « fermier » est…", ["*fermière", "fermiere", "fermieuse"], "-ier devient -ière.", scene(["vache", "une vache de la ferme"])),
    ask("Le pluriel de « un cheval » est…", ["*des chevaux", "des chevals", "des chevaus"], "-al devient souvent -aux.", scene(["cheval", "un cheval"])),
    ask("Le pluriel de « un oiseau » est…", ["*des oiseaux", "des oiseaus", "des oiseau"], "les noms en -eau prennent un x.", scene(["oiseau", "un oiseau"])),
    ask("Le féminin de « boulanger » est…", ["*boulangère", "boulangeuse", "boulangerie"], "-er devient -ère.", scene(["pain", "du pain"])),
    ask("Le pluriel de « un œil » est…", ["*des yeux", "des œils", "des œilles"], "c’est un pluriel particulier.", scene(["oeil", "un œil"])),
  ],
  "Les homophones": [
    ask("Modou range … cartable.", ["*son", "sont"], "on peut dire « mon cartable ».", scene(["cartable", "un cartable"])),
    ask("Les oranges … mûres.", ["*sont", "son"], "on peut dire « étaient mûres ».", scene(["orange", "une orange"])),
    ask("Awa … Fatou jouent ensemble.", ["*et", "est"], "« et » relie deux noms.", scene(["eleve-fille", "Awa"])),
    ask("Le lion … fort.", ["*est", "et"], "on peut dire « était fort ».", scene(["lion", "un lion"])),
    ask("Le car va … Thiès.", ["*à", "a"], "on ne peut pas dire « avait Thiès ».", scene(["camion", "un car"])),
  ],
  "Le dictionnaire et les mots": [
    ask("Un synonyme de « content » est…", ["*joyeux", "triste", "fâché"], "les deux mots ont un sens proche.", scene(["eleve-fille", "une fille contente"])),
    ask("Lequel est de la famille de « dent » ?", ["*dentiste", "danse", "dinde"], "dentiste contient le mot dent.", scene(["brosse-a-dents", "une brosse à dents"])),
    ask("« verre » et « vert » sont des…", ["*homonymes", "synonymes", "contraires"], "ils se prononcent pareil, mais n’ont pas le même sens.", scene(["verre-eau", "un verre"], ["feuille", "une feuille verte"])),
    ask("Le contraire de « grand » est…", ["*petit", "gros", "haut"], "la girafe est grande, le lapin est petit.", scene(["girafe", "une girafe"], ["lapin", "un lapin"])),
    ask("Dans le dictionnaire, quel mot vient en premier ?", ["*arbre", "arrosoir", "avion"], "ar-b avant ar-r, puis av."),
  ],
  "Écrire une lettre, une affiche et un poème": [
    ask("Une affiche n’a pas de date. Que ne sait-on pas ?", ["*quand a lieu l’événement", "ce qui se passe", "où cela se passe"], "il faut toujours dire quand."),
    ask("Pour écrire un poème, je cherche des mots qui…", ["*riment", "sont très longs", "sont en anglais"], "les rimes donnent de la musique au poème."),
    ask("Je finis ma lettre par…", ["*une formule de politesse et ma signature", "le lieu et la date", "le titre"], "le lieu et la date se mettent en haut.", scene(["enveloppe", "une lettre"])),
    ask("Après le premier jet, je…", ["*relis et corrige", "jette mon texte", "recopie sans relire"], "je vérifie avec la fiche de critères."),
    tf("Une affiche, une lettre et un poème n’ont pas la même présentation.", true, "chaque texte a sa forme."),
  ],
  // ── ESVS ──
  "L’idée de progrès": [
    ask("Lequel est un progrès pour parler à quelqu’un de loin ?", [`*${pc("telephone", "le téléphone")}`, pc("caillou", "le caillou"), pc("feu", "le feu")], "on peut appeler une personne dans une autre ville."),
    ask("Avant les moteurs, les pêcheurs faisaient avancer la pirogue…", ["*à la pagaie et à la voile", "avec un moteur", "en avion"], "les moteurs sont venus plus tard.", scene(["pirogue", "une pirogue"])),
    ask("Qu’a permis la découverte de l’agriculture ?", ["*produire sa nourriture", "voler", "éclairer la nuit"], "on n’a plus besoin de seulement chasser et cueillir.", scene(["plante", "une plante cultivée"])),
    ask("Lequel transporte les marchandises le plus vite ?", [`*${pc("camion", "le camion")}`, pc("tortue", "la tortue"), pc("ane", "l’âne")], "le camion a un moteur."),
    tf("Les outils en fer ont remplacé les outils en pierre.", true, "ils sont plus solides et plus efficaces."),
  ],
  "Faits et personnages de l’histoire locale": [
    ask("Pour connaître l’histoire de ma localité, j’interroge…", [`*${pc("grand-pere", "les anciens")}`, pc("bebe", "les bébés"), pc("chat", "le chat")], "les anciens se souviennent des événements."),
    ask("Une sécheresse est…", ["*une longue période sans pluie", "une grande fête", "un roi"], "elle peut causer une famine.", scene(["soleil", "un soleil brûlant"])),
    ask("Où trouve-t-on des traces du passé ?", ["*dans les vieux bâtiments, les puits, les cimetières", "dans les nuages", "dans les voitures neuves"], "ce sont des vestiges."),
    ask("Les griots racontent…", ["*l’histoire des familles et des rois", "la météo du jour", "les prix du marché"], "ils gardent la mémoire du passé."),
    tf("La fondation d’un village est un fait de l’histoire locale.", true, "c’est un événement marquant."),
  ],
  "Les royaumes du Sénégal d’autrefois": [
    ask("Où se trouvait le royaume du Sine ?", ["*autour de Fatick", "autour de Matam", "autour de Kédougou"], "au centre-ouest du Sénégal actuel.", MAP),
    ask("Où se trouvait le Saloum ?", ["*autour de Kaolack", "autour de Saint-Louis", "autour de Ziguinchor"], "le Saloum était au sud du Sine.", MAP),
    ask("Un chef qui doit obéir à un roi plus puissant est son…", ["*vassal", "empire", "capitale"], "c’est la vassalité."),
    ask("La « république » lébou se trouvait…", ["*au Cap-Vert, près de Dakar", "à Kédougou", "à Matam"], "la presqu’île du Cap-Vert, aujourd’hui Dakar.", MAP),
    tf("Le Tékrour se trouvait au bord du fleuve Sénégal.", true, "au nord, dans la vallée du fleuve."),
  ],
  "Le Djolof, le Gabou et les royaumes successeurs": [
    ask("D’après la tradition, qui a fondé le Djolof ?", ["*Ndiadiane Ndiaye", "Lat Dior", "Ndatté Yalla"], "il réunit plusieurs royaumes."),
    ask("Le Djolof se trouvait autour de…", ["*Linguère", "Ziguinchor", "Kédougou"], "dans l’actuelle région de Louga.", MAP),
    ask("Le chef du Gabou portait le titre de…", ["*mansa", "damel", "bourba"], "le Gabou était un royaume mandingue."),
    ask("Le Cayor se trouvait…", ["*entre Dakar et Saint-Louis", "en Casamance", "à l’est, vers Bakel"], "son roi était le damel.", MAP),
    tf("Le Walo se trouvait près du fleuve Sénégal.", true, "autour de l’actuelle région de Saint-Louis."),
  ],
  "S’orienter et lire une carte": [
    ask("Sur cette carte, quelle région est tout au nord ?", ["*Saint-Louis", "Ziguinchor", "Kédougou"], "le nord est en haut de la carte.", MAP),
    ask("Quelle région est au sud-ouest, en Casamance ?", ["*Ziguinchor", "Louga", "Matam"], "elle est en bas, à gauche.", MAP),
    ask("Où se trouve Dakar ?", ["*à l’ouest, au bord de la mer", "au centre", "à l’est"], "le point rouge est tout à gauche.", MAP),
    howMany("Combien de régions compte le Sénégal ?", 14, "Le Sénégal compte <strong>14</strong> régions.", MAP),
    ask("Quelle région est à l’est ?", ["*Tambacounda", "Thiès", "Dakar"], "l’est est à droite de la carte.", MAP),
  ],
  "Ma région : relief, eau, climat et végétation": [
    ask("Quel fleuve forme la frontière nord du Sénégal ?", ["*le fleuve Sénégal", "la Gambie", "la Casamance"], "il sépare le Sénégal de la Mauritanie."),
    ask("Quel arbre est un symbole des savanes du Sénégal ?", ["*le baobab", "le sapin", "le pommier"], "le baobab figure aussi sur les armoiries.", scene(["arbre", "un arbre"])),
    ask("Pendant l’hivernage, les mares…", ["*se remplissent", "sèchent", "gèlent"], "il pleut : l’eau s’accumule.", scene(["nuage", "un nuage de pluie"])),
    ask("Les plus hautes collines du Sénégal sont…", ["*au sud-est, vers Kédougou", "au bord de la mer à Dakar", "à Saint-Louis"], "le relief s’élève vers le Fouta-Djalon."),
    tf("Le climat du Sénégal a une saison sèche et une saison des pluies.", true, "la saison des pluies, c’est l’hivernage."),
  ],
  "Les activités et la vie des hommes": [
    ask("Quelle activité montre ce dessin ?", ["*la pêche", "l’élevage", "le commerce"], "la pirogue sert à pêcher.", scene(["pirogue", "une pirogue"])),
    ask("Le mil, le riz et le maïs sont des cultures…", ["*vivrières", "industrielles"], "on les cultive pour se nourrir.", scene(["sac-riz", "un sac de riz"])),
    ask("L’éleveur s’occupe…", [`*${pc("vache", "des troupeaux")}`, pc("pirogue", "des pirogues"), pc("plante", "des jeunes plantes")], "l’élevage, c’est s’occuper des animaux."),
    ask("Les touristes viennent au Sénégal surtout pour…", ["*les plages, les parcs et la culture", "la neige", "les volcans"], "le tourisme fait vivre beaucoup de familles.", scene(["avion", "un avion"])),
    tf("Le coton est une culture industrielle.", true, "il est transformé en tissu dans des usines."),
  ],
  "Le corps humain": [
    ask("Avec quel organe sent-on les odeurs ?", ["*le nez", "l’oreille", "la main"], "l’odorat est le sens du nez."),
    ask("Avec quel sens reconnaît-on le goût du sucre ?", ["*le goût (la langue)", "l’ouïe", "la vue"], "la langue reconnaît le sucré, le salé…"),
    ask("Où se trouve le genou sur ce squelette ?", ["*au milieu de la jambe", "dans le bras", "dans la tête"], "il permet de plier la jambe.", schemaFig("ce2-squelette", "Un squelette simplifié et le nom de quelques os.")),
    ask("Qu’est-ce qui fait bouger les os ?", ["*les muscles", "les cheveux", "les ongles"], "les muscles tirent sur les os."),
    ask("Pour protéger ses yeux, on…", ["*ne regarde pas le soleil en face", "lit dans le noir", "se frotte les yeux avec des mains sales"], "le soleil peut abîmer les yeux.", scene(["oeil", "un œil"])),
  ],
  "Les animaux": [
    ask("Comment se déplace l’oiseau ?", ["*il vole", "il rampe", "il nage"], "il a des ailes.", scene(["oiseau", "un oiseau"])),
    ask("Lequel nage ?", [`*${pc("poisson", "le poisson")}`, pc("chevre", "la chèvre"), pc("abeille", "l’abeille")], "le poisson vit dans l’eau."),
    ask("Le petit de la vache s’appelle…", ["*le veau", "le poussin", "l’agneau"], "l’agneau est le petit du mouton.", scene(["vache", "une vache"])),
    ask("Le lion mange de la viande : il est…", ["*carnivore", "herbivore", "granivore"], "carnivore : qui mange de la viande.", scene(["lion", "un lion"])),
    ask("La grenouille vit…", ["*dans l’eau et sur terre", "seulement dans les arbres", "seulement dans le désert"], "elle nage et elle saute.", scene(["grenouille", "une grenouille"])),
  ],
  "Les plantes": [
    ask("Quelle partie de la plante est sous la terre ?", ["*les racines", "la fleur", "les feuilles"], "les racines puisent l’eau.", PLANT),
    ask("Que donne la fleur après un certain temps ?", ["*un fruit", "une racine", "un caillou"], "le fruit contient les graines.", PLANT),
    ask("De quoi la plante a-t-elle besoin pour fabriquer sa nourriture ?", ["*de lumière et d’eau", "de bonbons", "de sable sec seulement"], "les feuilles utilisent la lumière.", scene(["soleil", "le soleil"])),
    ask("Lequel est un fruit ?", [`*${pc("mangue", "la mangue")}`, pc("feuille", "la feuille"), pc("caillou", "le caillou")], "la mangue vient de la fleur du manguier."),
    tf("Une graine peut germer si elle a de l’eau.", true, "l’eau la réveille : elle germe."),
  ],
  "Utiliser et fabriquer des objets technologiques": [
    ask("Dans ce circuit, qu’est-ce qui donne l’électricité ?", ["*la pile", "l’ampoule", "l’interrupteur"], "la pile est la source d’énergie.", CIRCUIT),
    ask("Si on ouvre l’interrupteur, l’ampoule…", ["*s’éteint", "brille plus fort", "change de couleur"], "le circuit est ouvert : le courant ne passe plus.", CIRCUIT),
    ask("Quel objet a besoin de piles ?", [`*${pc("lampe", "la lampe de poche")}`, pc("balai", "le balai"), pc("peigne", "le peigne")], "la lampe de poche fonctionne avec des piles."),
    ask("Pourquoi ne touche-t-on pas une prise avec des mains mouillées ?", ["*on peut s’électrocuter", "ça salit la prise", "ça fait du bruit"], "l’eau laisse passer le courant."),
    ask("Avec quoi peut-on fabriquer une petite voiture ?", [`*${pc("jouet", "du fil de fer et des bouchons")}`, pc("pain", "du pain"), pc("verre-eau", "de l’eau")], "on récupère des objets usagés."),
  ],
  "Se protéger contre le paludisme": [
    ask("Quel moustique transmet le paludisme ?", ["*l’anophèle femelle", "l’abeille", "la mouche"], "c’est la femelle qui pique.", scene(["moustique", "un moustique"])),
    ask("Quels sont des signes du paludisme ?", ["*fièvre, maux de tête, frissons", "rire et chanter", "avoir faim"], "il faut alors consulter vite."),
    ask("Que faire si on a de la fièvre ?", ["*aller vite au centre de santé", "attendre plusieurs jours", "jouer dehors"], "le paludisme se soigne s’il est traité tôt.", scene(["medicament", "des médicaments"])),
    ask("Comment empêcher les moustiques de pondre ?", ["*vider les eaux stagnantes", "garder les vieux pneus pleins d’eau", "laisser les seaux ouverts dehors"], "les larves vivent dans l’eau qui ne coule pas.", scene(["seau", "un seau"])),
    tf("La moustiquaire imprégnée protège pendant le sommeil.", true, "elle empêche les moustiques de piquer.", scene(["moustiquaire", "une moustiquaire"])),
  ],
  "Se protéger contre le sida": [
    ask("Comment s’appelle le virus du sida ?", ["*le VIH", "le paludisme", "la grippe"], "le VIH affaiblit les défenses du corps."),
    ask("Lequel ne doit-on pas partager ?", [`*${pc("ciseaux", "une lame ou des ciseaux qui ont coupé")}`, pc("livre", "un livre"), pc("ballon", "un ballon")], "le virus peut passer par le sang."),
    tf("Une personne malade doit aller au centre de santé pour se soigner.", true, "les soignants l’aident.", scene(["medicament", "des médicaments"])),
    ask("Tu trouves une seringue par terre. Tu…", ["*ne la touches pas et tu préviens un adulte", "la ramasses pour jouer", "la donnes à un ami"], "elle peut porter du sang."),
    ask("Le VIH affaiblit…", ["*les défenses du corps", "les cheveux", "seulement la vue"], "le corps se défend alors moins bien contre les maladies."),
  ],
  "Environnement et population": [
    ask("Planter des arbres pour freiner le désert, c’est…", ["*le reboisement", "la pollution", "l’érosion"], "les arbres retiennent le sol.", scene(["arbre", "un arbre"])),
    ask("Le foyer amélioré permet de…", ["*consommer moins de bois", "brûler plus de bois", "cuire sans feu"], "on coupe moins d’arbres.", scene(["feu", "un feu de bois"])),
    ask("Trop de personnes dans un petit logement, c’est…", ["*la promiscuité", "la teranga", "la transhumance"], "cela favorise les maladies.", scene(["case", "une case"])),
    ask("Que faire des déchets plastiques ?", ["*les ramasser et les recycler", "les brûler partout", "les jeter dans la mer"], "le plastique pollue longtemps.", scene(["poubelle", "une poubelle"])),
    tf("Une bonne alimentation aide à lutter contre la malnutrition.", true, "manger varié aide à grandir.", scene(["mangue", "des fruits"])),
  ],
  "Droits et devoirs": [
    ask("Le droit d’aller à l’école va avec le devoir de…", ["*travailler et respecter le maître", "rester à la maison", "déchirer ses cahiers"], "chaque droit a son devoir.", scene(["ecole", "l’école"])),
    ask("Un enfant malade a le droit…", ["*d’être soigné", "d’être puni", "de rester seul"], "c’est le droit à la santé.", scene(["medicament", "des médicaments"])),
    ask("Donner son avis en classe est…", ["*un droit, en respectant l’avis des autres", "interdit", "un devoir de crier"], "chacun s’exprime à son tour."),
    ask("Lequel est un devoir à la maison ?", [`*${pc("balai", "aider au ménage")}`, pc("ballon", "jouer toute la journée"), pc("telephone", "téléphoner sans arrêt")], "chacun participe à la vie de la famille."),
    tf("Respecter le règlement de l’école est un devoir.", true, "le règlement protège tout le monde."),
  ],
  "La paix et les valeurs": [
    ask("Un nouveau voisin arrive. Avec la teranga, on…", ["*l’accueille et lui offre à boire", "l’ignore", "ferme la porte"], "la teranga, c’est l’hospitalité.", scene(["tasse", "une tasse de thé"])),
    ask("La tolérance, c’est…", ["*accepter que les autres pensent autrement", "se moquer des différences", "refuser de parler"], "on respecte les idées des autres."),
    ask("Deux camarades se disputent. Tu…", ["*les aides à se parler calmement", "les encourages à se battre", "filmes la dispute"], "le dialogue apaise."),
    ask("Être solidaire, c’est…", ["*aider ceux qui en ont besoin", "garder tout pour soi", "se moquer"], "on s’entraide.", scene(["eleve-fille", "Awa"], ["eleve-garcon", "Modou"])),
    tf("Le dialogue aide à régler les conflits.", true, "on écoute et on cherche une solution ensemble."),
  ],
};
