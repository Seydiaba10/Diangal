import "server-only";

// Exercices corrigés du CP : une série par chapitre, écrite par DIANGAL d'après les chapitres
// du guide officiel de l'étape 1 (à faire relire par des enseignants).
// Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CP } from "../curriculum-cp";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques ──────────────────────────────────────────────────────────
  {
    subject: "MATH",
    chapter: "Lignes, intérieur et extérieur",
    questions: [
      { qcm: "Une ligne qui a deux bouts est une ligne…", choices: ["fermée", "*ouverte"], why: "Une ligne ouverte ne se referme pas : on voit ses deux bouts." },
      { vf: "Une ligne fermée sépare l’intérieur de l’extérieur.", answer: true, why: "Pour passer de l’intérieur à l’extérieur, il faut traverser la ligne : c’est la frontière." },
      { qcm: "Continue le rythme : ○ ○ △ ○ ○ △ ○ ○ …", choices: ["○", "*△", "□"], why: "Le motif est deux ronds puis un triangle : après ○ ○ vient △." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Quadrillages et itinéraires",
    questions: [
      { qcm: "Dans un quadrillage, l’endroit où deux lignes se croisent s’appelle…", choices: ["une case", "*un nœud", "une frontière"], why: "Le croisement de deux lignes est un nœud ; le petit carré entre les lignes est une case." },
      { qcm: "Pour décrire une case, on donne…", choices: ["*sa ligne et sa colonne", "sa couleur", "son nom"], why: "Chaque case se trouve au croisement d’une ligne et d’une colonne." },
      { vf: "Un itinéraire a un point de départ et un point d’arrivée.", answer: true, why: "L’itinéraire est le chemin qui va du départ à l’arrivée." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Tracer avec la règle",
    questions: [
      { qcm: "Quel instrument utilise-t-on pour tracer une ligne droite ?", choices: ["*la règle", "la gomme", "le taille-crayon"], why: "La règle guide le crayon pour tracer droit." },
      { qcm: "Une ligne faite de morceaux droits qui changent de direction est une ligne…", choices: ["courbe", "*brisée", "fermée"], why: "Une ligne brisée ressemble aux dents d’une scie." },
      { vf: "Une frise est un motif qui se répète le long d’une bande.", answer: true, why: "On voit des frises sur les pagnes et les murs : le même motif revient." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Reproduire des figures planes",
    questions: [
      { num: "Combien de côtés a un rectangle ?", answer: 4, why: "Le rectangle a 4 côtés : 2 grands et 2 petits." },
      { qcm: "Quelle figure a 4 côtés de la même longueur ?", choices: ["le rectangle", "*le carré", "le triangle"], why: "Tous les côtés du carré ont la même longueur." },
      { num: "Combien de coins a un triangle ?", answer: 3, why: "Un triangle a 3 côtés et 3 coins." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les nombres jusqu’à 20 (révision)",
    questions: [
      { num: "8 + 5 = ?", answer: 13, why: "8 + 2 = 10, puis 10 + 3 = 13." },
      { num: "17 − 4 = ?", answer: 13, why: "17 − 4 = 13." },
      { qcm: "Comment s’écrit 16 en lettres ?", choices: ["six", "*seize", "soixante"], why: "16 se dit et s’écrit seize." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les nombres de 21 à 50",
    questions: [
      { num: "Combien font 3 dizaines et 4 unités ?", answer: 34, why: "3 dizaines = 30, plus 4 unités : 34." },
      { qcm: "Quel signe faut-il : 28 … 34 ?", choices: ["*<", "=", ">"], why: "28 a 2 dizaines, 34 en a 3 : 28 est plus petit que 34." },
      { num: "Complète : 47 = 40 + …", answer: 7, why: "47, c’est 4 dizaines (40) et 7 unités." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Additionner et soustraire jusqu’à 50",
    questions: [
      { num: "23 + 14 = ?", answer: 37, why: "3 + 4 = 7 unités ; 2 + 1 = 3 dizaines : 37." },
      { num: "48 − 25 = ?", answer: 23, why: "8 − 5 = 3 unités ; 4 − 2 = 2 dizaines : 23." },
      { qcm: "« Awa a 12 billes. Elle en gagne 7. » Quelle opération faut-il ?", choices: ["*une addition", "une soustraction"], why: "Elle gagne des billes : on ajoute. 12 + 7 = 19." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Calcul mental jusqu’à 50",
    questions: [
      { qcm: "Quel nombre est pair ?", choices: ["17", "*24", "31"], why: "24 se termine par 4 : c’est un nombre pair." },
      { num: "26 + 10 = ?", answer: 36, why: "Ajouter 10, c’est ajouter une dizaine : 26 + 10 = 36." },
      { num: "Quelle est la moitié de 30 ?", answer: 15, why: "15 + 15 = 30 : la moitié de 30 est 15." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les nombres de 51 à 79",
    questions: [
      { qcm: "Comment se dit 70 ?", choices: ["septante", "*soixante-dix", "sept-dix"], why: "En français, 70 se dit soixante-dix (60 + 10)." },
      { num: "37 + 26 = ?", answer: 63, why: "7 + 6 = 13 : j’écris 3 et je retiens 1. 3 + 2 + 1 = 6 dizaines : 63." },
      { num: "52 − 18 = ?", answer: 34, why: "J’échange une dizaine : 12 − 8 = 4, puis 4 − 1 = 3 dizaines : 34." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Partager et multiplier",
    questions: [
      { num: "On partage 12 bonbons entre 3 enfants. Combien chaque enfant en reçoit-il ?", answer: 4, why: "4 + 4 + 4 = 12 : chacun reçoit 4 bonbons." },
      { num: "3 × 4 = ?", answer: 12, why: "3 fois 4, c’est 4 + 4 + 4 = 12." },
      { num: "Combien de roues pour 4 vélos ?", answer: 8, why: "Chaque vélo a 2 roues : 4 × 2 = 8." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les nombres jusqu’à 100",
    questions: [
      { qcm: "Comment se dit 80 ?", choices: ["huitante", "*quatre-vingts", "octante"], why: "En français, 80 se dit quatre-vingts (4 fois 20)." },
      { num: "99 + 1 = ?", answer: 100, why: "Après 99 vient 100 : la centaine." },
      { num: "Combien de dizaines dans 100 ?", answer: 10, why: "100 = 10 paquets de 10." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Mesurer des longueurs",
    questions: [
      { qcm: "Pour mesurer un crayon, on utilise…", choices: ["*le double décimètre", "le litre", "le kilogramme"], why: "Le double décimètre mesure les petites longueurs." },
      { vf: "Pour mesurer avec une règle, on commence au 0.", answer: true, why: "On pose le 0 au bout de l’objet, puis on lit l’autre bout." },
      { vf: "Mesurer avec ses pas donne toujours le même résultat pour tout le monde.", answer: false, why: "Non : les pas ne sont pas tous de la même longueur. C’est pourquoi on utilise le mètre." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Mesurer des capacités",
    questions: [
      { num: "Combien de demi-litres faut-il pour faire 1 litre ?", answer: 2, why: "1 L = 2 demi-litres." },
      { num: "Combien de quarts de litre faut-il pour faire 1 litre ?", answer: 4, why: "1 L = 4 quarts de litre." },
      { qcm: "On mesure l’eau d’une bouteille en…", choices: ["mètres", "*litres", "kilogrammes"], why: "Les liquides se mesurent en litres." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Mesurer des masses",
    questions: [
      { qcm: "Sur une balance, le plateau qui descend porte l’objet…", choices: ["*le plus lourd", "le plus léger"], why: "L’objet le plus lourd fait descendre son plateau." },
      { num: "Combien de demi-kilogrammes font 1 kilogramme ?", answer: 2, why: "1 kg = 2 demi-kilogrammes." },
      { qcm: "Au marché, on achète le riz au…", choices: ["litre", "*kilogramme", "mètre"], why: "Le riz se pèse : on l’achète au kilogramme." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Le temps : calendrier et heure",
    questions: [
      { num: "Combien y a-t-il de mois dans une année ?", answer: 12, why: "De janvier à décembre, il y a 12 mois." },
      { qcm: "Quel mois vient après mars ?", choices: ["février", "*avril", "mai"], why: "Janvier, février, mars, avril…" },
      { qcm: "Sur une horloge, la petite aiguille montre…", choices: ["*les heures", "les minutes", "les jours"], why: "La petite aiguille montre les heures, la grande les minutes." },
    ],
  },
  {
    subject: "MATH",
    chapter: "La monnaie",
    questions: [
      { num: "Combien de pièces de 25 F faut-il pour faire 100 F ?", answer: 4, why: "25 + 25 + 25 + 25 = 100." },
      { num: "Je paie 75 F avec une pièce de 100 F. Combien me rend-on ?", answer: 25, why: "100 − 75 = 25 F." },
      { qcm: "Quelle somme fait une pièce de 50 F et deux pièces de 10 F ?", choices: ["60 F", "*70 F", "80 F"], why: "50 + 10 + 10 = 70 F." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les données d’un problème",
    questions: [
      { qcm: "« Jean a 8 ans. Il a 25 billes. Il en perd 10. Combien lui en reste-t-il ? » Quelle donnée est inutile ?", choices: ["25 billes", "il en perd 10", "*Jean a 8 ans"], why: "L’âge de Jean ne sert pas à calculer ses billes." },
      { num: "Dans ce même problème, combien de billes reste-t-il à Jean ?", answer: 15, why: "25 − 10 = 15 billes." },
      { vf: "Si une donnée manque, on peut quand même répondre à la question.", answer: false, why: "Non : il faut d’abord trouver la donnée qui manque." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les questions d’un problème et la démarche",
    questions: [
      { num: "Awa achète 2 cahiers à 50 F. Combien paie-t-elle ?", answer: 100, why: "50 + 50 = 100 F : c’est la question intermédiaire." },
      { num: "Elle donne 200 F. Combien lui rend-on ?", answer: 100, why: "200 − 100 = 100 F : c’est la question finale." },
      { qcm: "Par quoi termine-t-on la résolution d’un problème ?", choices: ["par un dessin", "*par une phrase réponse", "par une nouvelle question"], why: "On écrit une phrase qui répond à la question finale." },
    ],
  },

  // ── Français ───────────────────────────────────────────────────────────────
  {
    subject: "FR",
    chapter: "Inviter et recommander",
    questions: [
      { qcm: "Une invitation doit dire…", choices: ["*quoi, quand et où", "seulement le prénom", "le prix"], why: "On dit à quoi on invite, quand et où." },
      { qcm: "Pour refuser poliment une invitation, tu dis :", choices: ["Non !", "*Merci, mais je ne peux pas venir.", "Je ne veux pas."], why: "On remercie, puis on explique qu’on ne peut pas venir." },
      { vf: "Quand je recommande quelque chose, je dis aussi pourquoi.", answer: true, why: "Expliquer pourquoi aide l’autre à suivre le conseil." },
    ],
  },
  {
    subject: "FR",
    chapter: "Je relis les sons du CI",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [on] ?", choices: ["*ballon", "bateau", "moto"], why: "« bal-lon » se termine par le son [on]." },
      { qcm: "Dans quel mot entends-tu le son [ou] ?", choices: ["lune", "*soupe", "tomate"], why: "« sou-pe » : on entend [ou]." },
      { vf: "Dans « bateau », on entend le son [o] écrit « eau ».", answer: true, why: "« ba-teau » : eau se lit [o]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Raconter",
    questions: [
      { qcm: "Pour raconter dans l’ordre, je commence par…", choices: ["enfin", "*d’abord", "ensuite"], why: "D’abord, ensuite, puis, enfin : d’abord vient en premier." },
      { qcm: "Un conte commence souvent par…", choices: ["*Il était une fois", "Au revoir", "Merci"], why: "« Il était une fois » ou « Un jour » ouvrent souvent les contes." },
      { vf: "Dans un conte, il y a souvent un problème, puis une solution.", answer: true, why: "Comme Leuk qui trouve comment boire l’eau de la gourde." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons v, w et oi",
    questions: [
      { qcm: "Quel mot commence par le son [v] ?", choices: ["*vélo", "fusée", "bébé"], why: "« vé-lo » commence par [v]." },
      { qcm: "Dans quel mot entends-tu le son [oi] ?", choices: ["moto", "*étoile", "olive"], why: "« é-toi-le » : on entend [oi]." },
      { text: "Écris les lettres qui manquent : un r… (le roi)", answer: "oi", why: "On écrit roi avec oi." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons ch et é",
    questions: [
      { qcm: "Quel mot commence par le son [ch] ?", choices: ["*chat", "sac", "car"], why: "« chat » commence par ch." },
      { qcm: "Dans quel mot la fin -er se lit [é] ?", choices: ["*manger", "mer", "fer"], why: "À la fin du verbe « manger », -er se lit [é]." },
      { vf: "Dans « nez », on entend le son [é].", answer: true, why: "« nez » se lit [né]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons k et f",
    questions: [
      { qcm: "Quel mot s’écrit avec qu ?", choices: ["*quatre", "canard", "kilo"], why: "« quatre » s’écrit avec qu." },
      { qcm: "Dans quel mot ph se lit [f] ?", choices: ["*photo", "papa", "hibou"], why: "« photo » : ph se lit [f]." },
      { vf: "Dans « coq », on entend deux fois le son [k].", answer: true, why: "« coq » commence et se termine par [k]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons eu, s et z",
    questions: [
      { qcm: "Dans quel mot le s se lit [z] ?", choices: ["*maison", "salade", "poisson"], why: "Un seul s entre deux voyelles se lit [z] : mai-son." },
      { qcm: "Dans quel mot entends-tu le son [eu] ?", choices: ["*bleu", "blé", "bol"], why: "« bleu » : on entend [eu]." },
      { qcm: "Quel mot s’écrit avec ç ?", choices: ["*garçon", "cinéma", "salon"], why: "« gar-çon » : la cédille donne le son [s] devant o." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons g, j et gn",
    questions: [
      { qcm: "Dans quel mot g se lit [j] ?", choices: ["gare", "*girafe", "gomme"], why: "Devant i, g se lit [j] : girafe." },
      { qcm: "Quel mot s’écrit avec gu ?", choices: ["*guitare", "girafe", "gâteau"], why: "« gui-ta-re » : gu garde le son [g] devant i." },
      { qcm: "Dans quel mot entends-tu le son [gn] ?", choices: ["*montagne", "maman", "magie"], why: "« mon-ta-gne » : on entend [gn]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons in et an",
    questions: [
      { qcm: "Quel mot s’écrit avec ain ?", choices: ["lapin", "*pain", "peinture"], why: "« pain » s’écrit avec ain." },
      { qcm: "Dans quel mot entends-tu le son [an] ?", choices: ["*enfant", "lapin", "lune"], why: "« en-fant » : deux fois le son [an]." },
      { vf: "Devant p, on écrit am ou em : lampe, temps.", answer: true, why: "Devant m, b et p, on écrit am et em." },
    ],
  },
  {
    subject: "FR",
    chapter: "Écrire en lettres attachées",
    questions: [
      { qcm: "Quelle lettre descend sous la ligne ?", choices: ["a", "*g", "o"], why: "La queue du g descend sous la ligne, comme celles du j et du y." },
      { vf: "En écriture attachée, on lève le crayon entre chaque lettre d’un mot.", answer: false, why: "Non : les lettres d’un mot se tiennent la main, on ne lève pas le crayon." },
      { qcm: "Quelle lettre a une boucle qui monte ?", choices: ["*l", "c", "u"], why: "La boucle du l monte jusqu’à la deuxième ligne." },
    ],
  },
  {
    subject: "FR",
    chapter: "Décrire et comparer",
    questions: [
      { qcm: "Pour décrire un objet, je peux dire…", choices: ["*sa couleur et sa forme", "l’heure qu’il est", "mon âge"], why: "Décrire, c’est dire comment est l’objet : couleur, forme, taille." },
      { qcm: "Complète : Le chat est plus petit … le chien.", choices: ["*que", "et", "mais"], why: "Pour comparer : plus… que." },
      { vf: "« Awa est aussi grande que Fatou » veut dire qu’elles ont la même taille.", answer: true, why: "Aussi… que exprime l’égalité." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les consonnes doubles",
    questions: [
      { qcm: "Quel mot commence par tr ?", choices: ["*train", "drap", "prune"], why: "« train » commence par tr." },
      { qcm: "Quel mot commence par fl ?", choices: ["*fleur", "plume", "clé"], why: "« fleur » commence par fl." },
      { vf: "Dans « arbre », on entend br.", answer: true, why: "« ar-bre » : b et r se lisent ensemble." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons oir, eur et les lettres muettes",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [oir] ?", choices: ["*miroir", "moteur", "mouton"], why: "« mi-roir » se termine par [oir]." },
      { qcm: "Quelle lettre est muette dans « chat » ?", choices: ["c", "a", "*t"], why: "Le t de chat ne s’entend pas : pense à « chaton »." },
      { vf: "Dans « nid », le d ne s’entend pas.", answer: true, why: "Le d est muet ; on le retrouve dans « nicher »… et on l’écrit quand même !" },
    ],
  },
  {
    subject: "FR",
    chapter: "Donner des ordres et interdire",
    questions: [
      { qcm: "Quelle phrase donne une consigne ?", choices: ["*Ferme la porte, s’il te plaît.", "La porte est fermée.", "J’aime cette porte."], why: "Une consigne commence souvent par un verbe d’action : ferme." },
      { qcm: "Quelle phrase interdit quelque chose ?", choices: ["Je cours vite.", "*Ne cours pas dans l’escalier.", "Tu cours bien."], why: "Ne… pas sert à interdire." },
      { vf: "Quand on interdit quelque chose, il est bien de dire pourquoi.", answer: true, why: "Expliquer la raison aide à respecter la règle." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons ette, elle et ill",
    questions: [
      { qcm: "Dans quel mot e se lit [è] devant deux consonnes ?", choices: ["*terre", "lune", "petit"], why: "Devant rr, le e se lit [è] : terre." },
      { qcm: "Dans quel mot entends-tu le son [ill] ?", choices: ["*fille", "file", "fil"], why: "« fi-lle » : on entend [ill]." },
      { qcm: "Quel mot se termine par eil ?", choices: ["*soleil", "travail", "fauteuil"], why: "« so-leil » se termine par eil." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons ier, ieu, ien, ui, oin et ion",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [ien] ?", choices: ["*chien", "chat", "chou"], why: "« chien » se termine par [ien]." },
      { qcm: "Quel mot s’écrit avec oin ?", choices: ["*loin", "lion", "lune"], why: "« loin » s’écrit avec oin." },
      { vf: "Dans « hibou », le h ne se prononce pas.", answer: true, why: "Le h au début de hibou est muet." },
    ],
  },
  {
    subject: "FR",
    chapter: "Écrire de petits textes",
    questions: [
      { qcm: "Une phrase commence par…", choices: ["*une majuscule", "un point", "une virgule"], why: "La première lettre d’une phrase est une majuscule." },
      { vf: "Au CP, un petit texte contient au moins deux phrases.", answer: true, why: "Le programme demande d’écrire des énoncés d’au moins deux phrases." },
      { qcm: "Dans une consigne écrite, chaque phrase commence souvent par…", choices: ["*un verbe d’action", "un nom de ville", "un nombre"], why: "Par exemple : prends, plie, dessine." },
    ],
  },

  // ── ESVS ───────────────────────────────────────────────────────────────────
  {
    subject: "ESVS",
    chapter: "Histoire : l’ordre et la fréquence des événements",
    questions: [
      { qcm: "Quel mot indique le jour d’avant aujourd’hui ?", choices: ["demain", "*hier", "pendant"], why: "Hier, c’est le jour qui est déjà passé." },
      { qcm: "« Je me lave les mains … le repas. » Quel mot convient ?", choices: ["*avant", "après", "pendant"], why: "On se lave les mains avant de manger." },
      { qcm: "« Nous allons au marché … les dimanches. » Quel mot convient ?", choices: ["*tous", "hier", "avant"], why: "« Tous les dimanches » dit la fréquence." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Histoire : mesurer le temps",
    questions: [
      { qcm: "Quel instrument mesure une durée ?", choices: ["*le sablier", "le calendrier", "la règle"], why: "Le sablier mesure le temps qui passe." },
      { qcm: "Ce qui dit quelle activité a lieu à quelle heure en classe s’appelle…", choices: ["*l’emploi du temps", "le cahier", "le tableau"], why: "L’emploi du temps organise les activités de la journée." },
      { vf: "Une durée se dit avec un moment de début et un moment de fin.", answer: true, why: "Par exemple : de 10 heures à 10 heures et demie." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Géographie : situer et ranger",
    questions: [
      { qcm: "« La gomme est … le crayon et la règle. » Quel mot convient ?", choices: ["*entre", "loin", "dans"], why: "Entre : au milieu de deux objets." },
      { qcm: "Trier des objets selon leur usage, c’est les regrouper selon…", choices: ["*ce à quoi ils servent", "leur prix", "leur âge"], why: "L’usage, c’est ce à quoi sert l’objet." },
      { vf: "Ranger du plus grand au plus petit, c’est choisir un ordre.", answer: true, why: "Trier, c’est regrouper ; ranger, c’est mettre dans un ordre." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Géographie : estimer et mesurer des distances",
    questions: [
      { qcm: "Quel instrument permet de mesurer une distance avec précision ?", choices: ["*le mètre", "le sablier", "la balance"], why: "Le mètre mesure les longueurs et les distances." },
      { vf: "Le pas et l’empan sont des unités naturelles de mesure.", answer: true, why: "On les prend sur son corps : pas, pied, empan, coudée." },
      { qcm: "Avant de mesurer une distance, on peut d’abord…", choices: ["*l’estimer", "la dessiner", "l’oublier"], why: "On estime, puis on mesure pour vérifier." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Sciences : outils et objets techniques",
    questions: [
      { qcm: "Quel outil sert à enfoncer un clou ?", choices: ["*le marteau", "les ciseaux", "la pelle"], why: "Le marteau enfonce les clous." },
      { qcm: "Pour que la chaîne du vélo tourne bien, on la…", choices: ["*graisse", "lave au savon", "peint"], why: "Graisser la chaîne est une technique d’entretien." },
      { vf: "Un objet bien entretenu dure plus longtemps.", answer: true, why: "L’entretien protège les objets de l’usure." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Sciences : comprendre et fabriquer un objet",
    questions: [
      { qcm: "À quoi sert le guidon d’un vélo ?", choices: ["*à diriger", "à freiner la nuit", "à éclairer"], why: "Le guidon permet de diriger le vélo." },
      { qcm: "Dans une lampe de poche, qui donne l’énergie ?", choices: ["*les piles", "le bouton", "le verre"], why: "Les piles fournissent l’énergie pour éclairer." },
      { vf: "Avec du matériel de récupération, on peut fabriquer des jouets.", answer: true, why: "Boîtes, fil de fer, carton et tissu permettent de fabriquer des jouets." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre dans son milieu : éviter les intoxications",
    questions: [
      { qcm: "Où range-t-on l’eau de Javel ?", choices: ["*hors de portée des enfants", "à côté de la nourriture", "dans le frigo"], why: "Les produits d’entretien se rangent loin des aliments et hors de portée des enfants." },
      { vf: "On peut prendre un médicament seul, sans demander à un adulte.", answer: false, why: "Non : c’est un adulte qui le donne, sur avis d’un soignant." },
      { vf: "Un médicament périmé est dangereux.", answer: true, why: "Il n’est plus bon et peut rendre malade." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre dans son milieu : protéger l’environnement",
    questions: [
      { qcm: "Que faire de ses ordures ?", choices: ["*les mettre à la poubelle", "les jeter dans la rue", "les cacher sous un arbre"], why: "Les ordures vont à la poubelle pour garder le quartier propre." },
      { qcm: "Lequel est un bien commun ?", choices: ["*la fontaine du quartier", "mon cartable", "ma chemise"], why: "La fontaine appartient à tout le monde." },
      { vf: "Les eaux usées dans la rue attirent les moustiques.", answer: true, why: "L’eau sale stagnante attire les moustiques et donne des maladies." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre ensemble : respect et bonne conduite",
    questions: [
      { qcm: "Quel comportement montre du respect ?", choices: ["*saluer les aînés", "se moquer d’un camarade", "crier en classe"], why: "Saluer les aînés est une marque de respect." },
      { qcm: "Aider un camarade qui est tombé, c’est être…", choices: ["*solidaire", "paresseux", "en retard"], why: "La solidarité, c’est s’entraider." },
      { vf: "Être ponctuel, c’est arriver à l’heure.", answer: true, why: "La ponctualité est un bon comportement." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre ensemble : règles et responsabilités",
    questions: [
      { qcm: "Avant de traverser la rue, je regarde…", choices: ["*à gauche, à droite, puis encore à gauche", "seulement devant moi", "le ciel"], why: "On vérifie que la route est libre des deux côtés." },
      { qcm: "Où marche-t-on le long d’une route ?", choices: ["*sur le trottoir ou le bord", "au milieu de la route", "sur la ligne blanche"], why: "Le trottoir protège les piétons des voitures." },
      { vf: "Quand j’accepte une responsabilité, je dois tenir mon engagement.", answer: true, why: "Être responsable, c’est faire ce qu’on a promis." },
    ],
  },
];

const built = buildExerciseSeries("CP", CHAPTERS_CP, SERIES);

export const QUESTIONS_CP = built.questions;
export const ANSWER_KEYS_CP = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_CP = built.questionChapters;
export const ASSESSMENTS_CP = built.assessments;
