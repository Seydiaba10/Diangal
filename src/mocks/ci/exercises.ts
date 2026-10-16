import "server-only";

// Exercices corrigés du CI : une série par chapitre, écrite par DIANGAL d'après les chapitres
// du guide officiel de l'étape 1 (à faire relire par des enseignants). Questions courtes, avec
// des mots du quotidien, pour des enfants de 6 ans qui apprennent à lire.
// Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_CI } from "../curriculum-ci";
import { buildExerciseSeries, type ExerciseSeries } from "../exercise-series";

const SERIES: ExerciseSeries[] = [
  // ── Mathématiques ──────────────────────────────────────────────────────────
  {
    subject: "MATH",
    chapter: "Se repérer dans l’espace",
    questions: [
      { qcm: "Le chat dort sous la table. Où est le chat ?", choices: ["Sur la table", "*Sous la table", "Derrière la porte"], why: "« Sous » veut dire en dessous : le chat est en dessous de la table." },
      { qcm: "Dans la file, Awa est avant Moussa. Qui passe en premier ?", choices: ["*Awa", "Moussa", "Ils passent ensemble"], why: "« Avant » veut dire en premier : Awa passe avant Moussa." },
      { vf: "Le livre est posé sur le pupitre : il est au-dessus du pupitre.", answer: true, why: "« Sur » veut dire au-dessus, en touchant le pupitre." },
      { qcm: "Fatou habite près de l’école, Ali habite loin de l’école. Qui a le moins de chemin à faire ?", choices: ["Ali", "*Fatou"], why: "« Près » veut dire à une petite distance : Fatou a moins de chemin à faire." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les ensembles",
    questions: [
      { qcm: "Dans l’ensemble des fruits, lequel n’a pas sa place ?", choices: ["mangue", "banane", "*cahier", "orange"], why: "Le cahier n’est pas un fruit : c’est l’intrus." },
      { qcm: "Lamine a 5 billes, Binta a 1 bille. Qui a beaucoup de billes ?", choices: ["*Lamine", "Binta"], why: "5 billes, c’est beaucoup plus qu’une seule bille." },
      { vf: "Un ensemble vide ne contient aucun objet.", answer: true, why: "Vide veut dire qu’il n’y a rien dedans : zéro objet." },
      { qcm: "Awa a 3 bonbons et Ousmane a 3 bonbons. Que peut-on dire ?", choices: ["Awa en a plus", "*Ils en ont autant", "Ousmane en a plus"], why: "3 et 3, c’est la même quantité : ils en ont autant." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Longueurs, distances et quantités",
    questions: [
      { qcm: "Le serpent mesure 3 carreaux, le ver de terre mesure 1 carreau. Lequel est le plus long ?", choices: ["*Le serpent", "Le ver de terre"], why: "3 carreaux, c’est plus long qu’un seul carreau." },
      { qcm: "Quel bâton est le plus court ?<br>A : ▬▬▬▬<br>B : ▬▬<br>C : ▬▬▬", choices: ["A", "*B", "C"], why: "Le bâton B n’a que deux morceaux : c’est le plus court." },
      { qcm: "Un seau rempli d’eau jusqu’en haut est…", choices: ["vide", "à moitié plein", "*plein"], why: "Quand l’eau arrive tout en haut, le seau est plein." },
      { vf: "Une maison loin de l’école demande plus de chemin qu’une maison près de l’école.", answer: true, why: "Loin veut dire à une grande distance : il faut marcher plus longtemps." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Observer une image",
    questions: [
      { qcm: "Continue le rythme : ● ○ ● ○ ● …", choices: ["●", "*○", "▲"], why: "On alterne un rond plein et un rond vide : après ● vient ○." },
      { qcm: "Quel est l’intrus : chèvre, mouton, vache, voiture ?", choices: ["chèvre", "mouton", "*voiture", "vache"], why: "La voiture n’est pas un animal : c’est l’intrus." },
      { qcm: "Continue le rythme : ▲ ▲ ■ ▲ ▲ ■ ▲ ▲ …", choices: ["*■", "▲", "●"], why: "Le motif est deux triangles puis un carré : après ▲ ▲ vient ■." },
      { vf: "Dans un tableau, on trouve une case avec sa ligne et sa colonne.", answer: true, why: "La ligne et la colonne se croisent sur une seule case." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les solides",
    questions: [
      { qcm: "Quel objet a la forme d’un cylindre ?", choices: ["Un dé", "*Une boîte de lait en conserve", "Un livre"], why: "La boîte de conserve est ronde et peut rouler : c’est un cylindre." },
      { qcm: "Un dé à jouer a la forme d’un…", choices: ["*cube", "cylindre", "rond"], why: "Toutes les faces du dé sont des carrés pareils : c’est un cube." },
      { vf: "Un cylindre peut rouler.", answer: true, why: "Sa face courbe lui permet de rouler." },
      { qcm: "Une boîte d’allumettes a la forme d’un…", choices: ["cube", "cylindre", "*pavé"], why: "Ses faces sont des rectangles : c’est un pavé." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les figures planes",
    questions: [
      { num: "Combien de côtés a un triangle ?", answer: 3, why: "Un triangle a 3 côtés et 3 coins." },
      { qcm: "Quelle figure a 4 côtés de la même longueur ?", choices: ["Le triangle", "Le rond", "*Le carré"], why: "Le carré a 4 côtés pareils." },
      { vf: "Un rond n’a pas de coin.", answer: true, why: "Le rond est une ligne courbe : il n’a ni côté droit ni coin." },
      { num: "Combien de coins a un rectangle ?", answer: 4, why: "Un rectangle a 4 côtés et 4 coins." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les nombres de 0 à 5",
    questions: [
      { num: "Compte les points : ● ● ●<br>Combien y en a-t-il ?", answer: 3, why: "Un, deux, trois : il y a 3 points." },
      { qcm: "Quel nombre vient juste après 4 ?", choices: ["3", "*5", "6"], why: "On compte 3, 4, 5 : après 4 vient 5." },
      { vf: "Une assiette vide contient 0 mangue.", answer: true, why: "Zéro veut dire rien du tout." },
      { num: "Compte les carrés : ■ ■ ■ ■ ■<br>Combien y en a-t-il ?", answer: 5, why: "Un, deux, trois, quatre, cinq : il y a 5 carrés." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les nombres de 6 à 10",
    questions: [
      { num: "Compte les étoiles : ★ ★ ★ ★ ★ ★ ★<br>Combien y en a-t-il ?", answer: 7, why: "En comptant une par une, on trouve 7 étoiles." },
      { qcm: "Quel nombre est le plus grand ?", choices: ["6", "8", "*9"], why: "9 vient après 6 et 8 quand on compte : c’est le plus grand." },
      { qcm: "10 objets, c’est…", choices: ["*une dizaine", "une moitié", "une paire"], why: "Un groupe de 10, c’est une dizaine." },
      { num: "Quel nombre vient juste avant 10 ?", answer: 9, why: "On compte 8, 9, 10 : juste avant 10 vient 9." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Ajouter et enlever jusqu’à 10",
    questions: [
      { num: "Awa a 3 mangues. Sa maman lui en donne 2. Combien en a-t-elle maintenant ?", answer: 5, why: "On ajoute : 3 + 2 = 5 mangues." },
      { num: "Il y a 7 oiseaux sur l’arbre. 3 s’envolent. Combien en reste-t-il ?", answer: 4, why: "On enlève : 7 − 3 = 4 oiseaux." },
      { num: "Le double de 4, c’est combien ?", answer: 8, why: "Le double, c’est deux fois le même nombre : 4 + 4 = 8." },
      { num: "La moitié de 6, c’est combien ?", answer: 3, why: "On partage 6 en deux parts égales : 3 et 3." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Lourd ou léger ?",
    questions: [
      { qcm: "Qu’est-ce qui est le plus lourd ?", choices: ["Une plume", "*Un sac de riz", "Une feuille"], why: "Un sac de riz est difficile à porter : il est bien plus lourd." },
      { qcm: "Sur une balance à deux plateaux, le plateau qui descend porte l’objet…", choices: ["*le plus lourd", "le plus léger"], why: "L’objet le plus lourd fait descendre son plateau." },
      { vf: "Un gros objet est toujours plus lourd qu’un petit objet.", answer: false, why: "Non : un gros ballon gonflé peut être plus léger qu’une petite pierre. La taille ne dit pas le poids." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Comprendre un problème",
    questions: [
      { qcm: "« Moussa a 4 billes. Il gagne 2 billes. Combien a-t-il de billes ? »<br>Quelle est la question ?", choices: ["Moussa a 4 billes.", "Il gagne 2 billes.", "*Combien a-t-il de billes ?"], why: "La question se termine par un point d’interrogation : « Combien a-t-il de billes ? »" },
      { vf: "Dans un problème, les données sont les informations qui servent à trouver la réponse.", answer: true, why: "Les données, ce sont les nombres et les informations du texte." },
      { num: "« Binta a 2 cahiers et 3 crayons. »<br>Combien a-t-elle de cahiers ?", answer: 2, why: "Le texte dit : 2 cahiers. Les crayons ne comptent pas ici." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Lignes et chemins",
    questions: [
      { qcm: "Une ligne qui se referme, comme un rond, est une ligne…", choices: ["ouverte", "*fermée"], why: "Quand le bout rejoint le début, la ligne est fermée." },
      { vf: "Une ligne ouverte a deux bouts.", answer: true, why: "Elle ne se referme pas : on voit son début et sa fin." },
      { qcm: "Dans un quadrillage, pour trouver une case, on regarde…", choices: ["*sa ligne et sa colonne", "sa couleur seulement", "sa taille"], why: "Chaque case se trouve au croisement d’une ligne et d’une colonne." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Les nombres de 11 à 20",
    questions: [
      { qcm: "Quel nombre vient juste après 15 ?", choices: ["14", "*16", "17"], why: "On compte 15, 16 : après 15 vient 16." },
      { num: "Combien font 1 dizaine et 3 unités ?", answer: 13, why: "10 et encore 3, cela fait 13." },
      { qcm: "Quel est le plus petit nombre ?", choices: ["18", "20", "*12"], why: "12 vient avant 18 et 20 quand on compte : c’est le plus petit." },
      { num: "Quel nombre vient juste avant 20 ?", answer: 19, why: "On compte 18, 19, 20 : juste avant 20 vient 19." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Calculer jusqu’à 20",
    questions: [
      { num: "10 + 5 = ?", answer: 15, why: "Une dizaine et 5 unités : 15." },
      { num: "18 − 8 = ?", answer: 10, why: "On enlève les 8 unités de 18 : il reste une dizaine, 10." },
      { num: "Le double de 7, c’est combien ?", answer: 14, why: "7 + 7 = 14." },
      { num: "13 + 4 = ?", answer: 17, why: "On part de 13 et on avance de 4 : 14, 15, 16, 17." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Le temps qui passe",
    questions: [
      { qcm: "Quel jour vient après lundi ?", choices: ["dimanche", "*mardi", "jeudi"], why: "Lundi, mardi, mercredi… : après lundi vient mardi." },
      { num: "Combien y a-t-il de jours dans une semaine ?", answer: 7, why: "Lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche : 7 jours." },
      { qcm: "On prend le petit-déjeuner…", choices: ["*le matin", "à midi", "le soir"], why: "Le petit-déjeuner est le premier repas de la journée, le matin." },
      { qcm: "Qu’est-ce qui dure le plus longtemps ?", choices: ["Boire un verre d’eau", "Taper dans ses mains", "*Une journée d’école"], why: "Une journée d’école dure plusieurs heures." },
    ],
  },
  {
    subject: "MATH",
    chapter: "Résoudre un petit problème",
    questions: [
      { num: "Ali a 6 œufs. Il en casse 2. Combien lui en reste-t-il ?", answer: 4, why: "On enlève les œufs cassés : 6 − 2 = 4." },
      { num: "Dans l’équipe, il y a 5 filles et 4 garçons. Combien d’enfants en tout ?", answer: 9, why: "On ajoute : 5 + 4 = 9 enfants." },
      { qcm: "« Fatou a 8 oranges. Elle en donne 3 à sa sœur. »<br>Pour trouver combien il lui reste, on…", choices: ["ajoute 3 à 8", "*enlève 3 à 8", "compte jusqu’à 3"], why: "Elle donne des oranges : il lui en reste moins, on enlève. 8 − 3 = 5." },
      { vf: "Pour répondre à un problème, on écrit une phrase réponse.", answer: true, why: "Par exemple : « Il reste 5 oranges à Fatou. »" },
    ],
  },

  // ── Français ───────────────────────────────────────────────────────────────
  {
    subject: "FR",
    chapter: "Bonjour l’école !",
    questions: [
      { qcm: "Le matin, en arrivant à l’école, tu dis à la maîtresse :", choices: ["Au revoir, madame.", "*Bonjour, madame.", "Bonne nuit, madame."], why: "Quand on arrive, on salue : « Bonjour »." },
      { qcm: "Pour te présenter, tu dis :", choices: ["*Je m’appelle Awa.", "Tu t’appelles Awa.", "Il s’appelle Awa."], why: "Pour parler de soi, on dit « je » : « Je m’appelle… »." },
      { qcm: "En partant de l’école, tu dis :", choices: ["Bonjour !", "Merci !", "*Au revoir !"], why: "Quand on part, on prend congé : « Au revoir »." },
      { vf: "Quand la maîtresse dit « Asseyez-vous », on reste debout.", answer: false, why: "Non : on écoute la consigne et on s’assoit." },
    ],
  },
  {
    subject: "FR",
    chapter: "Découvrir l’écrit",
    questions: [
      { qcm: "Quelle est la première lettre de l’alphabet ?", choices: ["*a", "b", "z"], why: "L’alphabet commence par a, b, c…" },
      { num: "Combien de syllabes entends-tu dans « ma-man » ?", answer: 2, why: "On tape deux fois dans ses mains : ma - man." },
      { vf: "On lit une ligne de gauche à droite.", answer: true, why: "En français, on lit et on écrit de la gauche vers la droite." },
      { qcm: "Lequel est un vrai mot ?", choices: ["tqzx", "*papa", "rrrr"], why: "« papa » est un mot que l’on peut lire et comprendre." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les premiers gestes d’écriture",
    questions: [
      { qcm: "Avec quoi écris-tu sur ton ardoise ?", choices: ["Une cuillère", "*Une craie", "Un ballon"], why: "La craie sert à écrire sur l’ardoise." },
      { qcm: "Pour bien écrire, tu tiens ton crayon…", choices: ["*entre le pouce et l’index", "avec le poing fermé", "par la pointe"], why: "Le crayon se tient entre le pouce et l’index, appuyé sur le majeur." },
      { vf: "On trace les lettres de gauche à droite sur la ligne.", answer: true, why: "On avance sur la ligne de la gauche vers la droite." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons a, i et t",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [a] ?", choices: ["lit", "*ami", "tour"], why: "« a-mi » : on entend [a] au début." },
      { qcm: "Dans quel mot entends-tu le son [i] ?", choices: ["papa", "bol", "*riz"], why: "« riz » : on entend le son [i]." },
      { qcm: "Quel mot commence par le son [t] ?", choices: ["lapin", "*tapis", "mouton"], why: "« ta-pis » commence par [t]." },
      { vf: "Dans le mot « tata », on entend deux fois le son [a].", answer: true, why: "« ta - ta » : deux fois [a]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons o et l",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [o] ?", choices: ["*vélo", "lit", "pain"], why: "« vé-lo » se termine par le son [o]." },
      { qcm: "Quel mot commence par le son [l] ?", choices: ["table", "*lune", "moto"], why: "« lune » commence par [l]." },
      { text: "Écris la lettre qui manque : un vé…o", answer: "l", why: "On écrit « vélo » avec la lettre l." },
      { vf: "On entend le son [o] dans « moto ».", answer: true, why: "« mo - to » : deux fois le son [o]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Demander et donner un renseignement",
    questions: [
      { qcm: "Pour connaître le lieu, on demande :", choices: ["*Où ?", "Quand ?", "Combien ?"], why: "« Où ? » demande le lieu : « Où est ta maison ? »" },
      { qcm: "« … as-tu de frères ? »<br>Quel mot manque ?", choices: ["Où", "Qui", "*Combien"], why: "On veut un nombre : « Combien as-tu de frères ? »" },
      { qcm: "Pour connaître le moment, on demande :", choices: ["Où ?", "*Quand ?", "Qui ?"], why: "« Quand ? » demande le moment : « Quand pars-tu ? »" },
      { qcm: "« … est ton maître ? » — « C’est monsieur Diallo. »", choices: ["*Qui", "Où", "Combien"], why: "On demande une personne : « Qui est ton maître ? »" },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons n et e",
    questions: [
      { qcm: "Quel mot commence par le son [n] ?", choices: ["*nid", "pomme", "sac"], why: "« nid » commence par [n]." },
      { qcm: "Dans quel mot entends-tu le son [e], comme dans « le » ?", choices: ["papa", "*petit", "vélo"], why: "« pe-tit » : on entend [e] comme dans « le »." },
      { vf: "On entend le son [n] dans « ananas ».", answer: true, why: "« a-na-nas » : on entend [n] deux fois." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons p, d, m et b",
    questions: [
      { qcm: "Quel mot commence par le son [p] ?", choices: ["bébé", "*papa", "maman"], why: "« pa-pa » commence par [p]." },
      { qcm: "Quel mot commence par le son [m] ?", choices: ["dodo", "banane", "*mouton"], why: "« mou-ton » commence par [m]." },
      { qcm: "Quel mot commence par le son [b] ?", choices: ["*bol", "pied", "dent"], why: "« bol » commence par [b]." },
      { qcm: "Quel mot commence par le son [d] ?", choices: ["tomate", "*domino", "baobab"], why: "« do-mi-no » commence par [d]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Dire ce que je ressens et ce que j’aime",
    questions: [
      { qcm: "Tu as faim. Tu dis :", choices: ["Je suis fatigué.", "*J’ai faim, je voudrais manger.", "J’ai froid."], why: "On dit ce que l’on ressent avec « J’ai faim »." },
      { qcm: "Pour dire ce que tu préfères, tu dis :", choices: ["*Je préfère la mangue.", "Je vois la mangue.", "La mangue est jaune."], why: "« Je préfère » sert à dire ce que l’on aime le plus." },
      { vf: "On peut dire poliment que l’on n’est pas d’accord.", answer: true, why: "Oui : par exemple « Je ne suis pas d’accord, parce que… »." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons f, u et ou",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [u], comme dans « lune » ?", choices: ["*mur", "mouton", "fil"], why: "« mur » : on entend [u] comme dans « lune »." },
      { qcm: "Dans quel mot entends-tu le son [ou] ?", choices: ["lune", "fée", "*poule"], why: "« pou-le » : on entend [ou]." },
      { qcm: "Quel mot commence par le son [f] ?", choices: ["*feu", "vélo", "pied"], why: "« feu » commence par [f]." },
      { vf: "« loup » et « lune » contiennent le même son.", answer: false, why: "Non : « loup » a le son [ou], « lune » a le son [u]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons é et è",
    questions: [
      { qcm: "Dans quel mot entends-tu le son [é] ?", choices: ["mère", "*bébé", "lit"], why: "« bé-bé » : deux fois le son [é]." },
      { qcm: "Dans quel mot entends-tu le son [è] ?", choices: ["vélo", "école", "*père"], why: "« père » : on entend [è], comme dans « mère »." },
      { vf: "On entend le son [é] à la fin du mot « café ».", answer: true, why: "« ca-fé » se termine par [é]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Les sons s, r, au et on",
    questions: [
      { qcm: "Quel mot commence par le son [s] ?", choices: ["rat", "*soleil", "lion"], why: "« so-leil » commence par [s]." },
      { qcm: "Dans quel mot entends-tu le son [on] ?", choices: ["*mouton", "radio", "épaule"], why: "« mou-ton » se termine par [on]." },
      { qcm: "Dans quel mot vois-tu les lettres « au » ?", choices: ["bonbon", "*épaule", "riz"], why: "« ép-au-le » s’écrit avec « au », qui se lit [o]." },
      { vf: "On entend le son [r] dans « radio ».", answer: true, why: "« ra-di-o » commence par [r]." },
    ],
  },
  {
    subject: "FR",
    chapter: "Demander la permission ou un service",
    questions: [
      { qcm: "Pour sortir de la classe, tu demandes :", choices: ["Je sors.", "*Madame, est-ce que je peux sortir, s’il vous plaît ?", "Ouvre la porte !"], why: "On demande la permission poliment, avec « s’il vous plaît »." },
      { qcm: "Ton camarade te prête son crayon. Tu dis :", choices: ["Bonjour !", "*Merci !", "Pardon !"], why: "Quand on nous rend un service, on dit « merci »." },
      { vf: "On dit « s’il te plaît » quand on demande un service à un ami.", answer: true, why: "Avec un ami, on dit « s’il te plaît » ; avec un adulte, « s’il vous plaît »." },
    ],
  },
  {
    subject: "FR",
    chapter: "Mes premières lettres attachées",
    questions: [
      { qcm: "Laquelle de ces lettres est une lettre ronde ?", choices: ["l", "*o", "t"], why: "Le o se trace en tournant : c’est une lettre ronde." },
      { vf: "En écriture attachée, les lettres d’un mot se touchent.", answer: true, why: "On écrit le mot sans lever le crayon entre les lettres." },
      { qcm: "Les lettres o, c, a, d et q commencent toutes par…", choices: ["une boucle", "un pont", "*un rond"], why: "Ce sont les lettres rondes : on commence par tracer un rond." },
    ],
  },
  {
    subject: "FR",
    chapter: "J’écris mes premières phrases",
    questions: [
      { qcm: "Une phrase commence par…", choices: ["*une majuscule", "un point", "une virgule"], why: "La première lettre d’une phrase est une majuscule." },
      { qcm: "Une phrase se termine souvent par…", choices: ["une majuscule", "un tiret", "*un point"], why: "On met un point à la fin de la phrase." },
      { qcm: "Remets les mots dans l’ordre : mange / Awa / une mangue", choices: ["Mange une mangue Awa.", "*Awa mange une mangue.", "Une mangue Awa mange."], why: "On dit d’abord qui fait l’action : « Awa mange une mangue. »" },
      { vf: "« le chat dort » est bien écrit comme une phrase.", answer: false, why: "Il manque la majuscule au début et le point à la fin : « Le chat dort. »" },
    ],
  },

  // ── Éducation à la science et à la vie sociale (ESVS) ──────────────────────
  {
    subject: "ESVS",
    chapter: "Histoire : ma journée et le temps qui passe",
    questions: [
      { qcm: "Le jour qui vient après aujourd’hui s’appelle…", choices: ["hier", "*demain", "avant-hier"], why: "Hier est passé, aujourd’hui c’est maintenant, demain viendra ensuite." },
      { qcm: "Que fais-tu avant d’aller à l’école ?", choices: ["*Je me lave et je prends le petit-déjeuner.", "Je dîne.", "Je me couche."], why: "Le matin, on se prépare avant de partir à l’école." },
      { vf: "Hier, c’est le jour qui est déjà passé.", answer: true, why: "Hier, c’est le jour d’avant aujourd’hui." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Histoire : mesurer une durée",
    questions: [
      { qcm: "Qu’est-ce qui dure le plus longtemps ?", choices: ["Un éternuement", "*Une nuit de sommeil", "Ouvrir une porte"], why: "On dort pendant de nombreuses heures : c’est long." },
      { qcm: "Sans montre, on sait qu’il est midi parce que…", choices: ["*le soleil est haut dans le ciel", "il fait nuit", "les étoiles brillent"], why: "À midi, le soleil est au plus haut et les ombres sont courtes." },
      { vf: "Le chant du coq annonce souvent le matin.", answer: true, why: "Le coq chante souvent au lever du jour." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Géographie : se repérer autour de soi",
    questions: [
      { qcm: "Le soleil se lève…", choices: ["à midi", "*le matin", "le soir"], why: "Le jour commence quand le soleil se lève, le matin." },
      { qcm: "Pour indiquer le chemin, tu peux dire :", choices: ["*Tourne à droite après la boutique.", "Il fait beau.", "J’aime le riz."], why: "On indique un chemin avec des repères et des directions." },
      { vf: "La nuit, on peut voir la lune et les étoiles.", answer: true, why: "Quand le soleil est couché, la lune et les étoiles apparaissent." },
      { qcm: "Un bon repère dans le quartier, c’est…", choices: ["un nuage", "*un bâtiment que tout le monde connaît, comme le marché", "un oiseau qui passe"], why: "Un repère ne bouge pas et tout le monde le connaît." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Géographie : mon milieu",
    questions: [
      { qcm: "Lequel fait partie de la nature ?", choices: ["une voiture", "*un arbre", "une table"], why: "L’arbre pousse tout seul : il fait partie de la nature." },
      { qcm: "La table est devant le tableau. Le tableau est donc…", choices: ["*derrière la table", "sous la table", "sur la table"], why: "Si la table est devant le tableau, le tableau est derrière la table." },
      { vf: "Les routes, les maisons et l’école ont été construites par les hommes.", answer: true, why: "Ce sont des constructions humaines." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Sciences : le monde qui m’entoure",
    questions: [
      { qcm: "Lequel est un animal ?", choices: ["le manguier", "*la chèvre", "la pierre"], why: "La chèvre est un être vivant qui se déplace : c’est un animal." },
      { qcm: "Lequel est une plante ?", choices: ["le chat", "le seau", "*le baobab"], why: "Le baobab est un arbre : c’est une plante." },
      { vf: "Une plante a besoin d’eau pour vivre.", answer: true, why: "Sans eau, la plante se dessèche et meurt." },
      { qcm: "Lequel est un objet fabriqué par l’homme ?", choices: ["*un seau", "le sable", "la pluie"], why: "Le seau est fabriqué ; le sable et la pluie sont naturels." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Sciences : la matière et la croissance",
    questions: [
      { qcm: "L’eau du robinet est…", choices: ["un solide", "*un liquide", "un gaz"], why: "L’eau coule et prend la forme du récipient : c’est un liquide." },
      { qcm: "Une pierre est…", choices: ["*un solide", "un liquide", "un gaz"], why: "La pierre garde sa forme : c’est un solide." },
      { qcm: "L’air que l’on respire est…", choices: ["un solide", "un liquide", "*un gaz"], why: "L’air est invisible et remplit tout l’espace : c’est un gaz." },
      { vf: "Un bébé grandit et devient un enfant.", answer: true, why: "Tous les êtres vivants grandissent." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre dans son milieu : santé et hygiène",
    questions: [
      { qcm: "Pour se protéger du paludisme, on dort…", choices: ["*sous une moustiquaire", "dehors sans protection", "près d’une eau sale"], why: "La moustiquaire empêche les moustiques de piquer pendant la nuit." },
      { qcm: "Le paludisme est transmis par…", choices: ["le chat", "*la piqûre de certains moustiques", "le soleil"], why: "Certains moustiques transmettent le paludisme en piquant." },
      { qcm: "Avant de manger, on se lave…", choices: ["*les mains avec du savon", "les pieds seulement", "les cheveux"], why: "Les mains propres évitent d’avaler des microbes." },
      { vf: "On peut manger un aliment qui sent mauvais.", answer: false, why: "Non : un aliment abîmé peut rendre malade. On le jette." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre dans son milieu : protéger l’environnement",
    questions: [
      { qcm: "Après avoir mangé un bonbon, tu mets le papier…", choices: ["par terre", "*dans la poubelle", "dans la rue"], why: "Les déchets vont à la poubelle pour garder le quartier propre." },
      { vf: "Il faut fermer le robinet quand on a fini de se laver les mains.", answer: true, why: "L’eau est précieuse : on ne la gaspille pas." },
      { qcm: "Pour qu’une plante pousse bien, on…", choices: ["*l’arrose", "l’arrache", "la piétine"], why: "La plante a besoin d’eau pour pousser." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre ensemble : bien se conduire",
    questions: [
      { qcm: "Tu bouscules un camarade sans faire exprès. Tu dis :", choices: ["Bravo !", "*Pardon !", "Au revoir !"], why: "On s’excuse quand on gêne quelqu’un, même sans le vouloir." },
      { vf: "Arriver à l’heure à l’école, c’est respecter les autres.", answer: true, why: "Être à l’heure ne fait pas attendre la classe." },
      { qcm: "Être franc, c’est…", choices: ["*dire la vérité", "cacher ses fautes", "se moquer des autres"], why: "Une personne franche dit la vérité." },
    ],
  },
  {
    subject: "ESVS",
    chapter: "Vivre ensemble : moi et les autres",
    questions: [
      { qcm: "Ton camarade est tombé. Tu…", choices: ["te moques de lui", "*l’aides à se relever", "pars en courant"], why: "On aide celui qui a besoin d’aide : c’est être solidaire." },
      { qcm: "Ma famille, ma classe et mon équipe de football sont des…", choices: ["*groupes auxquels j’appartiens", "jeux", "objets"], why: "Je fais partie de plusieurs groupes." },
      { vf: "Partager son goûter avec un ami qui n’en a pas, c’est être solidaire.", answer: true, why: "La solidarité, c’est s’entraider et partager." },
    ],
  },
];

const built = buildExerciseSeries("CI", CHAPTERS_CI, SERIES);

export const QUESTIONS_CI = built.questions;
export const ANSWER_KEYS_CI = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_CI = built.questionChapters;
export const ASSESSMENTS_CI = built.assessments;
