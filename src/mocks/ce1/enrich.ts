import "server-only";

// CE1 : questions illustrées ajoutées aux séries de français et d'ESVS (8 questions par chapitre),
// avec les dessins de la banque et les schémas des leçons. Elles complètent les questions de
// ce1/exercises.ts sans les répéter.

import type { ExerciseSpec } from "../exercise-series";
import { ask, howMany, pc, scene, schemaFig, tf } from "../illustrated-questions";

const DAY = schemaFig("ci-journee", "Ma journée dans l’ordre : le matin, l’école, le repas, la nuit.");
const FAMILY = schemaFig("ce1-famille", "Arbre généalogique : les grands-parents, les parents, les enfants.");
const COMPASS = schemaFig("ce1-rose-vents", "Une rose des vents : nord, sud, est, ouest.");
const RELIEF = schemaFig("ce1-relief", "Le relief de profil : plaine, colline, plateau, vallée avec une rivière, montagne.");
const PLAN = schemaFig("ce1-plan-classe", "Le plan d’une classe vue de dessus : tableau, bureau, tables, porte, fenêtre.");

export const EXTRA_CE1: Record<string, ExerciseSpec[]> = {
  // ── Français ──
  "Raconter, décrire et converser": [
    ask("Remets dans l’ordre. Que s’est-il passé en premier ?", ["*Awa a planté une graine.", "La fleur a poussé.", "Awa a arrosé la graine."], "on plante, puis on arrose, enfin la fleur pousse.", scene(["plante", "une graine plantée"], ["arrosoir", "un arrosoir"], ["fleur", "une fleur"])),
    ask("Au téléphone, Awa dit : « Allô, bonjour, c’est Awa. » Qu’a-t-elle fait ?", ["*Elle a salué et s’est présentée.", "Elle a raccroché.", "Elle a dit au revoir."], "on salue, puis on dit qui on est.", scene(["telephone", "un téléphone"])),
    ask("Pour décrire le lion, je dis…", ["*Il a une grosse crinière.", "Il est parti hier.", "Il s’appelle Modou."], "décrire, c’est dire comment il est.", scene(["lion", "un lion"])),
    ask("Pour finir un appel, je dis…", ["*Merci, au revoir !", "Allô ?", "Bonjour !"], "on termine poliment."),
    tf("Quand je raconte, je regarde ceux qui m’écoutent.", true, "on parle clairement en les regardant."),
  ],
  "Le texte narratif": [
    ask("Dans les contes du Sénégal, Leuk est…", ["*un lièvre malin", "un lion", "un oiseau"], "Leuk-le-lièvre trouve toujours une ruse.", scene(["lapin", "un lièvre"])),
    ask("Dans un récit, la fin raconte…", ["*comment le problème se règle", "qui sont les personnages", "le titre"], "la fin dit comment l’histoire se termine."),
    ask("« Un matin, Modou part au marché. » Où se passe l’histoire ?", ["*au marché", "à l’école", "sur la mer"], "le lieu est « au marché ».", scene(["boutique", "le marché"])),
    ask("« La poule rousse trouve un grain de mil. » Qui est le personnage ?", ["*la poule", "le mil", "le grain"], "c’est la poule qui agit.", scene(["poule", "une poule"])),
    tf("Un récit raconte une histoire dans l’ordre.", true, "le début, le problème, puis la fin."),
  ],
  "Le texte descriptif": [
    ask("Quelle phrase décrit le drapeau du Sénégal ?", ["*Il a trois bandes : verte, jaune et rouge.", "Il court très vite.", "Il mange de l’herbe."], "on dit ses couleurs et sa forme.", scene(["drapeau", "le drapeau du Sénégal"])),
    ask("Quel adjectif décrit la girafe ?", ["*grande", "petite", "ronde"], "elle a un très long cou.", scene(["girafe", "une girafe"])),
    ask("« Elle est ronde et son toit est en paille. » Que décrit-on ?", [`*${pc("case", "la case")}`, pc("maison", "la maison"), pc("ecole", "l’école")], "la case est ronde, avec un toit de paille."),
    ask("Quel mot de couleur décrit cette tomate ?", ["*rouge", "bleue", "noire"], "la tomate mûre est rouge.", scene(["tomate", "une tomate"])),
    tf("« La mangue est jaune et sucrée » est une description.", true, "on dit comment est la mangue."),
  ],
  "Le texte injonctif": [
    ask("Pour faire du jus, quelle est la première étape ?", ["*Verse l’eau dans le bol.", "Bois le jus.", "Mets le jus au frais."], "on commence par préparer ; on boit à la fin.", scene(["verre-eau", "de l’eau"], ["bol", "un bol"])),
    ask("Dans une recette, la liste des ingrédients se trouve…", ["*au début", "à la fin", "nulle part"], "on prépare d’abord ce qu’il faut."),
    ask("Quelle phrase est une consigne de jeu ?", ["*Lance le dé et avance ton pion.", "Le dé est blanc.", "J’aime ce jeu."], "elle dit ce qu’il faut faire.", scene(["de", "un dé"])),
    ask("Dans « Arrose les plantes chaque soir », le verbe d’action est…", ["*arrose", "plantes", "soir"], "c’est l’action à faire.", scene(["arrosoir", "un arrosoir"])),
    tf("Un texte injonctif dit ce qu’il faut faire.", true, "recette, règle de jeu, consigne."),
  ],
  "Le dictionnaire et le vocabulaire": [
    ask("Lequel vient en premier dans le dictionnaire ?", [`*${pc("ananas", "ananas")}`, pc("mangue", "mangue"), pc("tomate", "tomate")], "a vient avant m et t."),
    ask("Lequel vient en premier dans le dictionnaire ?", [`*${pc("chat", "chat")}`, pc("chien", "chien"), pc("cheval", "cheval")], "cha… avant che… avant chi… : chat, cheval, chien."),
    ask("Le cri de la vache : la vache…", ["*meugle", "aboie", "miaule"], "on dit que la vache meugle.", scene(["vache", "une vache"])),
    ask("Le cri du chien : le chien…", ["*aboie", "meugle", "chante"], "on dit que le chien aboie.", scene(["chien", "un chien"])),
    ask("Le petit de la chèvre s’appelle…", ["*le chevreau", "le poussin", "le veau"], "le poussin est le petit de la poule, le veau celui de la vache.", scene(["chevre", "une chèvre"])),
  ],
  "La phrase": [
    ask("Dans « Le coq chante », le verbe est…", ["*chante", "le", "coq"], "le verbe dit ce que fait le coq.", scene(["coq", "un coq"])),
    ask("Dans « La poule picore le mil », le sujet est…", ["*la poule", "picore", "le mil"], "c’est la poule qui picore.", scene(["poule", "une poule"])),
    ask("Dans « Awa lit un livre », le complément est…", ["*un livre", "Awa", "lit"], "Awa lit quoi ? un livre.", scene(["eleve-fille", "Awa"], ["livre", "un livre"])),
    ask("Quelle suite de mots est une phrase ?", ["*Le chat boit du lait.", "lait chat le du", "boit le du"], "elle a un sens, une majuscule et un point.", scene(["chat", "un chat"], ["lait", "du lait"])),
    tf("« pêcheur filet le son » est une phrase.", false, "les mots sont en désordre : ce n’est pas une phrase."),
  ],
  "Le groupe nominal": [
    ask("Quel article va avec « oiseau » ?", ["*un", "une", "la"], "on dit « un oiseau ».", scene(["oiseau", "un oiseau"])),
    ask("Quel article va avec « tomates » ?", ["*des", "un", "la"], "« tomates » est au pluriel : des tomates.", scene(["tomate", "des tomates"])),
    ask("Dans « un ballon rouge », l’adjectif est…", ["*rouge", "ballon", "un"], "rouge dit comment est le ballon.", scene(["ballon-baudruche", "un ballon rouge"])),
    ask("Quel groupe nominal va avec le dessin ?", ["*une grande girafe", "un petit lapin bleu", "une poule noire"], "on voit une grande girafe.", scene(["girafe", "une girafe"])),
    ask("Dans « la belle étoile », le nom est…", ["*étoile", "belle", "la"], "le nom désigne la chose : étoile.", scene(["etoile", "une étoile"])),
  ],
  "Phrases impératives, impersonnelles et infinitives": [
    ask("Quelle phrase donne un ordre ?", ["*Ferme le robinet.", "Le robinet est fermé ?", "J’aime le robinet."], "c’est une phrase impérative : pas de sujet.", scene(["fontaine", "un robinet"])),
    ask("Transforme en phrase impérative : « Tu ranges tes livres. »", ["*Range tes livres.", "Ranger tes livres.", "Il faut tes livres."], "à l’impératif, on enlève le sujet.", scene(["livre", "des livres"])),
    ask("Laquelle est une phrase infinitive ?", ["*Arroser les fleurs le soir.", "Arrose les fleurs.", "Awa arrose les fleurs."], "le verbe est à l’infinitif : arroser.", scene(["arrosoir", "un arrosoir"])),
    ask("Dans une phrase impérative, il n’y a pas de…", ["*sujet", "verbe", "point"], "« Range ton cartable. » : pas de sujet."),
    tf("« Mettez vos cahiers sur la table. » est une phrase impérative.", true, "c’est un ordre, sans sujet.", scene(["cahier", "un cahier"])),
  ],
  "Le présent de l’indicatif": [
    ask("Le coq (chanter) le matin →", ["*chante", "chantes", "chantent"], "il chante : terminaison -e.", scene(["coq", "un coq"])),
    ask("Les poules (picorer) le mil →", ["*picorent", "picore", "picorons"], "ils picorent : terminaison -ent.", scene(["poule", "des poules"])),
    ask("Je (être) à l’école →", ["*suis", "es", "est"], "être : je suis.", scene(["ecole", "l’école"])),
    ask("Nous (avoir) un chat →", ["*avons", "avez", "ont"], "avoir : nous avons.", scene(["chat", "un chat"])),
    ask("Vous (arroser) le jardin →", ["*arrosez", "arrosons", "arrosent"], "vous arrosez : terminaison -ez.", scene(["arrosoir", "un arrosoir"])),
  ],
  "Le passé composé": [
    ask("Hier, Awa (manger) une mangue → Awa…", ["*a mangé", "mange", "mangera"], "avoir au présent + participe passé.", scene(["eleve-fille", "Awa"], ["mangue", "une mangue"])),
    ask("Hier, nous (jouer) au ballon → nous…", ["*avons joué", "jouons", "jouerons"], "« avons » + « joué ».", scene(["ballon", "un ballon"])),
    ask("Le participe passé de « arroser » est…", ["*arrosé", "arroser", "arrose"], "les verbes en -er ont un participe passé en -é.", scene(["arrosoir", "un arrosoir"])),
    ask("Quelle phrase est au passé composé ?", ["*Le coq a chanté.", "Le coq chante.", "Le coq chantera."], "« a chanté » : c’est déjà fait.", scene(["coq", "un coq"])),
    tf("« Ils ont fermé la porte » est au passé composé.", true, "« ont » (avoir) + « fermé » (participe passé)."),
  ],
  "L’impératif et le futur simple": [
    ask("Demain, Modou (jouer) au football → Modou…", ["*jouera", "joue", "a joué"], "demain : futur, il jouera.", scene(["ballon", "un ballon"])),
    ask("Impératif : « (arroser) les fleurs, Awa ! » →", ["*Arrose", "Arroses", "Arrosez"], "on parle à Awa : arrose.", scene(["arrosoir", "un arrosoir"])),
    ask("Futur : vous (manger) des mangues →", ["*mangerez", "mangez", "mangeons"], "vous mangerez : terminaison -ez.", scene(["mangue", "une mangue"])),
    ask("Quelle phrase dit ce qui se passera plus tard ?", ["*Demain, il pleuvra.", "Hier, il a plu.", "Il pleut."], "« pleuvra » est au futur.", scene(["nuage", "un nuage"])),
    ask("Impératif de « fermer » (2e personne du pluriel) :", ["*fermez", "fermons", "ferme"], "on parle à plusieurs personnes : fermez."),
  ],
  "Ponctuation et accords": [
    ask("Quel signe faut-il ? « Quelle belle fleur … »", ["*!", "?", ","], "c’est une exclamation : on s’émerveille.", scene(["fleur", "une fleur"])),
    ask("Les poules (manger) le mil →", ["*mangent", "mange", "manges"], "le sujet est au pluriel : mangent.", scene(["poule", "des poules"])),
    ask("Le chien (aboyer) →", ["*aboie", "aboient", "aboies"], "un seul chien : il aboie.", scene(["chien", "un chien"])),
    ask("Quel signe sépare les mots d’une liste : « une mangue … une orange et une banane » ?", ["*,", ".", "?"], "la virgule sépare les mots d’une liste.", scene(["mangue", "une mangue"], ["orange", "une orange"], ["banane", "une banane"])),
    tf("Le verbe s’accorde avec son sujet.", true, "le chien aboie, les chiens aboient."),
  ],
  "Les homophones et le féminin des adjectifs": [
    ask("Modou … un vélo.", ["*a", "à"], "on peut dire « Modou avait un vélo ».", scene(["velo", "un vélo"])),
    ask("Le ciel … bleu.", ["*est", "et"], "on peut dire « le ciel était bleu ».", scene(["soleil", "le soleil dans le ciel"])),
    ask("Awa … Modou vont à l’école.", ["*et", "est"], "« et » relie deux noms : on peut dire « et puis ».", scene(["eleve-fille", "Awa"], ["eleve-garcon", "Modou"])),
    ask("Le féminin de « petit » est…", ["*petite", "petit", "petits"], "on ajoute un e.", scene(["bebe", "une petite fille"])),
    ask("Le féminin de « grand » est…", ["*grande", "grand", "grands"], "on ajoute un e : une grande girafe.", scene(["girafe", "une girafe"])),
  ],
  "Écrire des textes": [
    ask("Quelle phrase commence bien un récit ?", ["*Un matin, Awa part au marché.", "au marché.", "Awa marché part."], "on dit quand, qui et où.", scene(["eleve-fille", "Awa"], ["boutique", "le marché"])),
    ask("Dans une recette, chaque étape commence par…", ["*un verbe d’action", "un nom de ville", "un nombre de jours"], "verse, mélange, sers…"),
    ask("Quel mot de liaison annonce la dernière étape ?", ["*enfin", "d’abord", "ensuite"], "« enfin » annonce la fin."),
    ask("Quelle phrase décrit bien le dessin ?", ["*La tortue avance lentement.", "La tortue vole haut.", "La tortue aboie."], "la tortue marche doucement.", scene(["tortue", "une tortue"])),
    tf("Avant de recopier mon texte, je corrige les fautes.", true, "je relis avec la fiche de vérification."),
  ],
  // ── ESVS ──
  "Le temps qui passe": [
    ask("Sur cette frise de la journée, qu’est-ce qui vient en dernier ?", ["*la nuit", "le matin", "l’école"], "la frise se lit de gauche à droite.", DAY),
    ask("Avant les maisons en ciment, on habitait souvent dans…", [`*${pc("case", "une case")}`, pc("taxi", "un taxi"), pc("avion", "un avion")], "autrefois, beaucoup de familles vivaient dans des cases."),
    ask("« Il y a longtemps », c’est…", ["*le passé", "le présent", "le futur"], "ce qui est déjà arrivé."),
    ask("Quel mot dit le présent ?", ["*maintenant", "hier", "demain"], "maintenant, c’est aujourd’hui."),
    tf("Mon grand-père est né avant moi.", true, "il appartient à une génération plus ancienne.", scene(["grand-pere", "un grand-père"])),
  ],
  "L’histoire de ma famille et de mon école": [
    ask("Dans cet arbre généalogique, qui est en haut ?", ["*les grands-parents", "les enfants", "les cousins"], "on place les plus anciens en haut.", FAMILY),
    ask("Combien de générations voit-on sur cet arbre ?", ["2", "*3", "5"], "grands-parents, parents, enfants.", FAMILY),
    ask("La maman de mon papa est ma…", ["*grand-mère", "tante", "sœur"], "les parents de mes parents sont mes grands-parents.", scene(["grand-mere", "une grand-mère"])),
    ask("Le frère de ma maman est mon…", ["*oncle", "cousin", "grand-père"], "le frère de mon père ou de ma mère est mon oncle."),
    tf("Mes frères et sœurs sont de la même génération que moi.", true, "nous sommes tous des enfants de nos parents."),
  ],
  "L’histoire de mon quartier ou de mon village": [
    ask("Lequel montre un village d’autrefois ?", [`*${pc("case", "des cases")}`, pc("taxi", "des taxis"), pc("telephone", "des téléphones")], "autrefois, les villages avaient surtout des cases."),
    ask("Qui peut raconter l’histoire du village ?", [`*${pc("grand-pere", "un ancien du village")}`, pc("bebe", "un bébé"), pc("chat", "un chat")], "les anciens ont vu le village changer."),
    ask("Qu’est-ce qui a changé dans beaucoup de villages ?", ["*l’arrivée des routes et de l’électricité", "la couleur du ciel", "le nombre de jours dans la semaine"], "le village se transforme avec le temps."),
    ask("Le fondateur d’un village est…", ["*la personne qui l’a créé", "le plus jeune habitant", "le premier élève de l’école"], "c’est lui qui s’y est installé le premier."),
    tf("Un quartier change au fil du temps.", true, "nouvelles maisons, routes, marchés.", scene(["maison", "une maison neuve"])),
  ],
  "L’histoire de ma commune": [
    ask("Qui s’occupe de la propreté des rues de la commune ?", ["*la mairie", "les touristes", "les oiseaux"], "c’est une mission de la commune.", scene(["poubelle", "une poubelle"])),
    ask("Une commune regroupe…", ["*plusieurs quartiers ou villages", "une seule maison", "un seul arbre"], "elle rassemble les habitants de plusieurs quartiers ou villages."),
    ask("Que peut construire la commune pour les habitants ?", [`*${pc("fontaine", "une borne-fontaine")}`, pc("lion", "un lion"), pc("avion", "un avion")], "la commune s’occupe des points d’eau."),
    ask("Le maire travaille avec…", ["*le conseil municipal", "la maîtresse seule", "personne"], "le conseil municipal est élu, lui aussi."),
    tf("La commune s’occupe aussi des marchés.", true, "elle les organise et les entretient.", scene(["boutique", "le marché"])),
  ],
  "Le jour, la nuit et les points cardinaux": [
    ask("En combien de temps la Terre fait-elle un tour sur elle-même ?", ["*un jour", "une semaine", "une année"], "c’est ce qui fait le jour et la nuit.", schemaFig("ci-jour-nuit", "Le soleil éclaire la Terre : le jour d’un côté, la nuit de l’autre.")),
    ask("Sur la rose des vents, quel point est en haut ?", ["*le nord", "le sud", "l’est"], "le nord est en haut, le sud en bas.", COMPASS),
    ask("Le Soleil se couche…", ["*à l’ouest", "à l’est", "au nord"], "il se lève à l’est et se couche à l’ouest.", COMPASS),
    ask("Je regarde le Soleil levant. Le nord est…", ["*à ma gauche", "à ma droite", "derrière moi"], "face à l’est, le nord est à gauche et le sud à droite."),
    tf("La nuit, la Terre continue de tourner.", true, "elle tourne sans arrêt."),
  ],
  "Le temps qu’il fait et les saisons": [
    ask("Quel temps fait-il souvent pendant l’hivernage ?", ["*Il pleut.", "Il neige.", "Il ne pleut jamais."], "l’hivernage est la saison des pluies.", scene(["nuage", "un nuage"])),
    ask("Pendant la saison sèche, il…", ["*ne pleut presque pas", "pleut tous les jours", "neige"], "c’est la plus longue saison au Sénégal.", scene(["soleil", "le soleil"])),
    ask("Quand il fait très chaud, je bois…", ["*beaucoup d’eau propre", "rien du tout", "de l’huile"], "on boit souvent pour ne pas avoir soif.", scene(["verre-eau", "un verre d’eau"])),
    ask("Les paysans sèment le mil…", ["*au début de l’hivernage", "au milieu de la saison sèche", "jamais"], "les graines ont besoin de pluie pour pousser.", scene(["plante", "une jeune plante"])),
    tf("Au Sénégal, il fait plus frais en décembre qu’en mai.", true, "de décembre à février, il fait plus frais."),
  ],
  "Le relief": [
    ask("Sur le dessin, quelle forme est un terrain plat et élevé ?", ["*le plateau", "la plaine", "la vallée"], "le plateau est plat, mais en hauteur.", RELIEF),
    ask("Quelle forme a les pentes les plus raides ?", ["*la montagne", "la colline", "la plaine"], "la montagne est haute, avec des pentes raides.", RELIEF),
    ask("Où coule la rivière sur le dessin ?", ["*dans la vallée", "sur le plateau", "en haut de la montagne"], "l’eau coule dans le creux de la vallée.", RELIEF),
    ask("Une colline a des pentes…", ["*douces", "très raides", "plates"], "c’est une petite hauteur."),
    tf("Une vallée est un creux entre deux hauteurs.", true, "souvent, une rivière y coule."),
  ],
  "Les points d’eau et les cours d’eau": [
    ask("Lequel est un point d’eau creusé par l’homme ?", [`*${pc("puits", "le puits")}`, pc("pirogue", "la pirogue"), pc("nuage", "le nuage")], "on creuse le puits pour atteindre l’eau."),
    ask("Sur quoi les pêcheurs naviguent-ils sur le fleuve ?", [`*${pc("pirogue", "la pirogue")}`, pc("train", "le train"), pc("camion", "le camion")], "la pirogue va sur l’eau."),
    ask("D’où vient l’eau de la borne-fontaine ?", ["*d’un forage ou du réseau d’eau", "directement des nuages", "de la mer salée"], "l’eau est puisée sous la terre, puis amenée par des tuyaux.", scene(["fontaine", "une borne-fontaine"])),
    ask("Un petit cours d’eau s’appelle…", ["*un ruisseau", "un fleuve", "une mer"], "le ruisseau rejoint la rivière, qui rejoint le fleuve."),
    tf("Une mare peut sécher pendant la saison sèche.", true, "il ne pleut plus et l’eau s’évapore."),
  ],
  "Faire un plan": [
    ask("Sur ce plan, où est le tableau ?", ["*en haut", "en bas", "à gauche"], "il est dessiné sur le mur du haut.", PLAN),
    howMany("Combien de tables y a-t-il sur ce plan ?", 9, "3 rangées de 3 tables : <strong>9</strong> tables.", PLAN),
    ask("Où est la porte sur ce plan ?", ["*à droite, en bas", "en haut, à gauche", "au milieu"], "on la voit sur le mur de droite, en bas.", PLAN),
    ask("Pour dessiner un plan, on regarde la pièce…", ["*d’en haut", "de côté", "de très loin seulement"], "un plan est un dessin vu de dessus."),
    tf("Sur un plan, un petit rectangle peut représenter une table.", true, "chaque objet a son signe ; la légende l’explique."),
  ],
  "Les êtres vivants se nourrissent": [
    ask("Lequel est herbivore ?", [`*${pc("vache", "la vache")}`, pc("lion", "le lion"), pc("chat", "le chat")], "la vache mange de l’herbe."),
    ask("Que mange la chèvre ?", ["*de l’herbe et des feuilles", "de la viande", "des cailloux"], "la chèvre est herbivore.", scene(["chevre", "une chèvre"])),
    ask("La poule mange des graines et des insectes : elle est…", ["*omnivore", "carnivore", "herbivore"], "elle mange de tout.", scene(["poule", "une poule"])),
    ask("Par quelle partie la plante prend-elle l’eau du sol ?", ["*les racines", "les fleurs", "les fruits"], "les racines puisent l’eau dans la terre.", scene(["plante", "une plante"])),
    ask("Lequel mange surtout des graines ?", [`*${pc("oiseau", "le moineau")}`, pc("lion", "le lion"), pc("chat", "le chat")], "le moineau est granivore."),
  ],
  "Les êtres vivants respirent": [
    ask("Par quoi la plante respire-t-elle ?", ["*ses feuilles", "seulement ses racines", "elle ne respire pas"], "la plante respire surtout par ses feuilles.", scene(["feuille", "une feuille"])),
    ask("Lequel respire dans l’eau ?", [`*${pc("poisson", "le poisson")}`, pc("chat", "le chat"), pc("oiseau", "l’oiseau")], "le poisson respire avec ses branchies."),
    ask("Quand on respire, l’air va dans…", ["*les poumons", "l’estomac", "les os"], "on inspire l’air par le nez jusqu’aux poumons."),
    ask("La grenouille respire…", ["*par ses poumons et sa peau", "seulement par des branchies", "jamais"], "sa peau fine l’aide à respirer.", scene(["grenouille", "une grenouille"])),
    tf("Sans air, aucun être vivant ne peut vivre.", true, "tous les êtres vivants respirent."),
  ],
  "Les produits et les objets de la maison": [
    ask("Où range-t-on la bouteille de gaz ?", ["*loin du feu, dans un endroit aéré", "sous le lit des enfants", "tout près du feu"], "le gaz est un combustible dangereux.", scene(["bouteille-gaz", "une bouteille de gaz"])),
    ask("On verse de l’huile dans l’eau. L’huile…", ["*reste au-dessus", "disparaît", "devient du sucre"], "l’huile ne se mélange pas à l’eau.", scene(["verre-eau", "un verre d’eau"])),
    ask("On met du sucre dans l’eau et on remue. Le sucre…", ["*fond (il se dissout)", "flotte toujours", "devient dur"], "l’eau dissout le sucre.", scene(["tasse", "une tasse"])),
    ask("Comment met-on les piles dans une lampe de poche ?", ["*dans le bon sens (+ et −)", "n’importe comment", "mouillées"], "sinon, la lampe ne s’allume pas.", scene(["lampe", "une lampe de poche"])),
    tf("On éteint la radio quand on ne l’écoute plus.", true, "on économise les piles ou l’électricité.", scene(["radio", "une radio"])),
  ],
  "L’eau potable": [
    ask("Quelle eau peut-on boire ?", [`*${pc("fontaine", "l’eau du robinet")}`, "l’eau d’une flaque", "l’eau d’une mare"], "l’eau du robinet est traitée : elle est potable."),
    ask("Comment garde-t-on l’eau de boisson ?", ["*dans un récipient propre et couvert", "dans un seau ouvert", "au soleil, sans couvercle"], "le couvercle empêche la saleté et les insectes d’entrer.", scene(["seau", "un seau"])),
    ask("Laisser l’eau reposer pour que la saleté tombe au fond, c’est…", ["*la décantation", "la cuisson", "le lavage"], "c’est une étape pour purifier l’eau."),
    ask("Lequel gaspille l’eau ?", ["*laisser couler le robinet pour rien", "fermer le robinet", "réparer une fuite"], "l’eau est précieuse."),
    tf("L’eau d’un puits protégé est plus sûre que l’eau d’une mare.", true, "le puits protégé est couvert et propre.", scene(["puits", "un puits"])),
  ],
  "L’hygiène et l’alimentation": [
    ask("Quel aliment donne de l’énergie ?", [`*${pc("sac-riz", "le riz")}`, pc("verre-eau", "l’eau"), pc("savon", "le savon")], "le riz, le mil et le maïs donnent de l’énergie."),
    ask("Quel aliment protège des maladies ?", [`*${pc("mangue", "les fruits")}`, pc("bonbon", "les bonbons")], "les fruits et les légumes protègent la santé."),
    ask("Quand faut-il se brosser les dents ?", ["*après chaque repas", "une fois par mois", "jamais"], "on enlève les restes d’aliments.", scene(["brosse-a-dents", "une brosse à dents"])),
    ask("Pour avoir des ongles propres, je…", ["*les coupe et les nettoie", "les ronge", "les laisse sales"], "des microbes se cachent sous les ongles."),
    ask("Quel repas est équilibré ?", ["*du riz, du poisson et des légumes", "seulement des bonbons", "seulement du pain"], "il mélange les trois groupes d’aliments.", scene(["poisson", "du poisson"])),
  ],
  "Protéger l’environnement": [
    ask("Que fait-on contre la coupe des arbres ?", ["*on plante et on arrose de jeunes arbres", "on brûle la brousse", "on coupe encore plus"], "les arbres protègent le sol.", scene(["arbre", "un arbre"], ["arrosoir", "un arrosoir"])),
    ask("Où jette-t-on les sachets en plastique ?", ["*dans une poubelle", "dans la rue", "dans la mer"], "le plastique pollue la terre et la mer.", scene(["poubelle", "une poubelle"])),
    ask("Le vent emporte la terre d’un champ nu. Que peut-on faire ?", ["*planter des arbres autour", "enlever toute l’herbe", "brûler le champ"], "les arbres arrêtent le vent."),
    ask("Qui doit garder les toilettes de l’école propres ?", ["*tout le monde", "personne", "seulement le directeur"], "chacun participe."),
    tf("Balayer la cour de l’école protège notre milieu.", true, "un milieu propre est plus sain.", scene(["balai", "un balai"])),
  ],
  "Respecter les autres": [
    ask("Ton voisin dort. Tu…", ["*parles doucement", "mets la radio très fort", "cries"], "on respecte le repos des voisins.", scene(["radio", "une radio"])),
    ask("Quand tu demandes quelque chose, tu dis…", ["*s’il vous plaît", "Donne !", "Vite !"], "on demande poliment."),
    ask("Ta maman te demande de ranger tes affaires. Tu…", ["*obéis", "refuses en criant", "pars jouer"], "on obéit à ses parents.", scene(["maman", "maman"])),
    ask("On n’insulte pas les autres, car…", ["*cela les blesse", "c’est amusant", "c’est permis"], "les mots peuvent faire mal."),
    tf("Saluer une personne âgée est une marque de respect.", true, "on salue les aînés.", scene(["grand-pere", "un grand-père"])),
  ],
  "Le civisme": [
    ask("Où est l’étoile sur le drapeau du Sénégal ?", ["*au milieu, sur la bande jaune", "sur la bande rouge", "il n’y a pas d’étoile"], "une étoile verte au centre.", scene(["drapeau", "le drapeau du Sénégal"])),
    ask("Que fait-on quand on chante l’hymne national ?", ["*on se tient debout, en silence", "on court", "on mange"], "on montre du respect pour la Nation."),
    ask("Quel animal est un symbole du Sénégal ?", [`*${pc("lion", "le lion")}`, pc("chat", "le chat"), pc("poule", "la poule")], "le lion figure sur les armoiries du Sénégal."),
    ask("Qui nous protège et fait respecter la loi ?", ["*les policiers et les gendarmes", "les voleurs", "personne"], "ce sont les forces de l’ordre."),
    tf("Au feu rouge, les piétons attendent.", true, "on respecte le code de la route.", scene(["feu-tricolore", "un feu rouge"])),
  ],
  "Respecter les différences": [
    ask("Awa est grande, Fatou est petite. Elles ont…", ["*les mêmes droits", "des droits différents"], "la taille ne change pas les droits.", scene(["eleve-fille", "Awa"], ["bebe", "la petite Fatou"])),
    ask("Qui peut jouer au football ?", ["*les filles et les garçons", "seulement les garçons", "personne"], "tous les enfants peuvent jouer.", scene(["ballon", "un ballon"])),
    ask("Au Sénégal, des personnes de religions différentes vivent…", ["*ensemble, en paix", "toujours séparées", "en se disputant"], "on respecte les croyances de chacun."),
    ask("Un nouvel élève parle une autre langue. Tu…", ["*l’accueilles et l’aides", "te moques de lui", "l’ignores"], "on accueille chacun."),
    tf("On peut être ami avec quelqu’un qui ne nous ressemble pas.", true, "nos différences nous enrichissent."),
  ],
};
