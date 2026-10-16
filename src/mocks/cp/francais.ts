// Français du CP (domaine « Langue et communication »). Programme : Curriculum de l'Éducation
// de Base, Langue et communication, étape 1, 2e version (MEN, avril 2014) — paliers 5 à 8 du CP :
// invitation, narration, description, injonction ; ordre officiel des sons ; lettres cursives ;
// production d'écrits d'au moins deux phrases. Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { bullets, type CiChapterSpec, keyPoint, practice, soundLesson } from "../ci/blocks";

export const FR_CP: CiChapterSpec[] = [
  // ── Palier 5 : l'invitation ───────────────────────────────────────────────
  {
    title: "Inviter et recommander",
    strand: "Communication orale",
    summary: "Inviter quelqu’un poliment, accepter ou refuser une invitation, recommander quelque chose.",
    lessons: [
      {
        title: "Inviter quelqu’un",
        body: `<p>Pour <strong>inviter</strong> quelqu’un, on dit à quoi on l’invite, quand et où.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "« Moussa, je t’invite à mon anniversaire samedi, à la maison. »",
            "« Madame, voulez-vous venir à la fête de l’école jeudi ? »",
            "Pour accepter : « Oui, avec plaisir, merci ! » Pour refuser : « Merci, mais je ne peux pas venir. »",
          ])}
          ${keyPoint("Une invitation dit <strong>quoi</strong>, <strong>quand</strong> et <strong>où</strong>. On répond toujours poliment, même pour refuser.")}
          ${practice(["Invite un adulte de la maison à venir voir ton cahier ce soir : dis quoi, quand et où.", "Joue les deux rôles : celui qui invite et celui qui répond."])}`,
      },
      {
        title: "Recommander quelque chose",
        body: `<p><strong>Recommander</strong>, c’est conseiller quelque chose à quelqu’un parce que c’est bien pour lui.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "« Je te recommande ce livre : l’histoire est très drôle. »",
            "« Couvre-toi bien, il fait froid ce matin. »",
            "« N’oublie pas ta gourde, il fait chaud aujourd’hui. »",
          ])}
          ${keyPoint("Quand je recommande quelque chose, je dis aussi <strong>pourquoi</strong>.")}
          ${practice(["Recommande à un camarade un jeu que tu aimes et explique pourquoi."])}`,
      },
    ],
  },
  {
    title: "Je relis les sons du CI",
    strand: "Lecture",
    summary: "Réviser les sons et les lettres appris au CI, puis lire de petits textes en comprenant ce qu’on lit.",
    lessons: [
      {
        title: "Les sons du CI",
        body: `<p>Au CI, tu as appris beaucoup de sons. On les relit pour bien commencer l’année.</p>
          <h2>Je relis</h2>
          ${bullets([
            "Les voyelles : <strong>a · e · i · o · u · é · è</strong>.",
            "Les consonnes : <strong>t · l · n · p · d · m · b · f · s · r</strong>.",
            "Les sons de deux lettres : <strong>ou · au · eau · on</strong>.",
          ])}
          <p>Des mots : <strong>moto · bébé · tomate · soupe · bateau · ballon · salade</strong></p>
          ${keyPoint("Pour lire un mot, je lis chaque syllabe, puis je dis le mot en entier.")}
          ${practice(["Lis les mots à voix haute à un adulte, puis cache-les et écris-en trois.", "Cherche dans la maison un objet dont le nom contient le son on, puis le son ou."])}`,
      },
      {
        title: "Lire et comprendre un petit texte",
        body: `<p>Lire, ce n’est pas seulement dire les mots : c’est aussi <strong>comprendre</strong> l’histoire.</p>
          <h2>Je lis</h2>
          <p><strong>Le ballon de Fatou</strong><br>Fatou a un ballon rouge. Elle joue avec Moussa dans la cour. Le ballon roule sous la moto de papa. Moussa le ramène. Fatou dit : « Merci ! »</p>
          <h2>Je comprends</h2>
          ${bullets(["Qui joue avec Fatou ? → Moussa.", "Où roule le ballon ? → Sous la moto de papa.", "Que dit Fatou ? → « Merci ! »"])}
          ${keyPoint("Après avoir lu, je me demande : qui ? où ? quoi ? Je cherche la réponse dans le texte.")}
          ${practice(["Relis le texte à voix haute, sans te presser.", "Raconte l’histoire avec tes mots à un adulte."])}`,
      },
    ],
  },

  // ── Palier 6 : la narration ───────────────────────────────────────────────
  {
    title: "Raconter",
    strand: "Communication orale",
    summary: "Relater ce qu’on a fait, ce qu’un autre a fait, raconter un conte et une histoire en images.",
    lessons: [
      {
        title: "Relater ce qu’on a fait",
        body: `<p>Pour raconter ce qu’on a fait, on dit les actions <strong>dans l’ordre</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "« Hier, je suis allé au marché avec ma mère. »",
            "« D’abord, nous avons acheté des légumes. Ensuite, nous avons pris du poisson. Enfin, nous sommes rentrés. »",
            "Pour quelqu’un d’autre : « Mon frère a joué au football, puis il s’est reposé. »",
          ])}
          ${keyPoint("Les mots <strong>d’abord</strong>, <strong>ensuite</strong>, <strong>puis</strong> et <strong>enfin</strong> m’aident à raconter dans l’ordre.")}
          ${practice(["Raconte ta journée d’hier à un adulte avec d’abord, ensuite et enfin.", "Raconte ce qu’a fait un membre de ta famille ce matin."])}`,
      },
      {
        title: "Raconter un conte",
        body: `<p>Un <strong>conte</strong> est une histoire inventée, souvent avec des animaux qui parlent.</p>
          <h2>Je lis</h2>
          <p><strong>Leuk et la gourde</strong><br>Un jour de grande chaleur, Leuk le lièvre a très soif. Il trouve une gourde, mais il ne peut pas boire : l’eau est tout au fond. Leuk réfléchit. Il met des cailloux dans la gourde, un par un. L’eau monte, monte… et Leuk peut enfin boire !</p>
          ${keyPoint("Un conte commence souvent par « Il était une fois » ou « Un jour ». Il y a un problème, puis une solution.")}
          ${practice(["Raconte le conte avec tes mots : le début, le problème, la solution.", "Demande à un adulte de te raconter un conte de chez nous, puis raconte-le à ton tour."])}`,
      },
      {
        title: "Raconter une histoire en images",
        body: `<p>Une <strong>bande dessinée</strong> raconte une histoire avec des images, case après case.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Image 1 : Awa plante une graine dans un pot.",
            "Image 2 : elle arrose le pot tous les jours.",
            "Image 3 : une petite plante pousse. Awa est contente.",
          ])}
          ${keyPoint("Pour raconter une histoire en images, je regarde chaque image dans l’ordre et je fais une phrase pour chacune.")}
          ${practice(["Dessine trois cases pour raconter ton réveil, puis raconte-les.", "Invente la fin d’une histoire : que se passe-t-il après la troisième image ?"])}`,
      },
    ],
  },
  {
    title: "Les sons v, w et oi",
    strand: "Lecture",
    summary: "Lire et écrire le son v (v, parfois w) et le son oi.",
    lessons: [
      {
        title: "Le son v",
        body: soundLesson({
          sound: "v",
          spellings: "v · V (et parfois w, comme dans wagon)",
          heardIn: ["vélo", "lave", "avion"],
          syllables: ["va", "vi", "vo", "vu", "vé", "ve"],
          words: ["vélo", "lave", "olive", "lavabo", "navire", "valise"],
          sentence: "Valérie a un vélo rouge.",
          writing: "Le v se trace comme une petite pointe : je descends, puis je remonte sans lever le crayon.",
        }),
      },
      {
        title: "Le son oi",
        body: soundLesson({
          sound: "oi",
          spellings: "oi",
          heardIn: ["roi", "moi", "étoile"],
          syllables: ["moi", "toi", "roi", "loi", "noi", "voi"],
          words: ["roi", "moi", "toi", "voile", "étoile", "boire"],
          sentence: "Le roi voit une étoile.",
          writing: "Pour écrire oi, j’attache le o au i et je n’oublie pas le point sur le i.",
        }),
      },
    ],
  },
  {
    title: "Les sons ch et é",
    strand: "Lecture",
    summary: "Lire le son ch, puis les différentes écritures du son é (é, er, ez, es).",
    lessons: [
      {
        title: "Le son ch",
        body: soundLesson({
          sound: "ch",
          spellings: "ch (deux lettres pour un seul son)",
          heardIn: ["chat", "vache", "chocolat"],
          syllables: ["cha", "che", "chi", "cho", "chou", "chu"],
          words: ["chat", "chaton", "vache", "niche", "chemise", "mouche"],
          sentence: "Le chat de Michel dort dans la niche.",
          writing: "J’écris ch avec deux lettres : le c, puis le h. Ensemble, elles font un seul son.",
        }),
      },
      {
        title: "Les écritures du son é",
        body: soundLesson({
          sound: "é",
          spellings: "é · er · ez · es (dans les, des, mes, tes)",
          heardIn: ["bébé", "nez", "manger"],
          syllables: ["pé", "té", "ré", "ter", "rez", "les"],
          words: ["café", "marcher", "nez", "chez", "les", "donner"],
          sentence: "Le bébé va manger chez mémé.",
          writing: "À la fin d’un mot, -er et -ez se lisent souvent é : manger, chantez.",
        }),
      },
    ],
  },
  {
    title: "Les sons k et f",
    strand: "Lecture",
    summary: "Lire le son k (c, qu, q, k) et le son f (f et ph).",
    lessons: [
      {
        title: "Le son k : c, qu, q, k",
        body: soundLesson({
          sound: "k",
          spellings: "c (ca, co, cu) · qu · q · k",
          heardIn: ["canard", "coq", "kilo"],
          syllables: ["ca", "co", "cu", "que", "qui", "ka"],
          words: ["canard", "école", "coq", "quatre", "qui", "képi"],
          sentence: "Kader a quatre canards.",
          writing: "Devant e et i, j’écris qu pour garder le son k : qui, que.",
        }),
      },
      {
        title: "Le son f : f et ph",
        body: soundLesson({
          sound: "f",
          spellings: "f · F · ph",
          heardIn: ["feu", "photo", "café"],
          syllables: ["fa", "fi", "fo", "pha", "pho", "phi"],
          words: ["fusée", "farine", "photo", "phare", "téléphone", "Sophie"],
          sentence: "Sophie a une photo du phare.",
          writing: "Les lettres p et h côte à côte se lisent f : photo, phare.",
        }),
      },
    ],
  },
  {
    title: "Les sons eu, s et z",
    strand: "Lecture",
    summary: "Lire le son eu (eu, œu), le son s (s, ss, c, ç) et le s qui se lit z.",
    lessons: [
      {
        title: "Le son eu : eu et œu",
        body: soundLesson({
          sound: "eu",
          spellings: "eu · œu",
          heardIn: ["feu", "cheveu", "sœur"],
          syllables: ["peu", "deu", "neu", "feu", "veu", "bleu"],
          words: ["feu", "deux", "bleu", "neveu", "cheveu", "sœur"],
          sentence: "Il y a deux œufs dans le nid.",
          writing: "Dans œ, le o et le e sont collés : on les écrit sans lever le crayon.",
        }),
      },
      {
        title: "Le son s : s, ss, c, ç",
        body: soundLesson({
          sound: "s",
          spellings: "s · ss · c (ce, ci) · ç (ça, ço, çu)",
          heardIn: ["sac", "poisson", "garçon"],
          syllables: ["sa", "ssa", "ce", "ci", "ça", "ço"],
          words: ["salade", "poisson", "tasse", "cinéma", "garçon", "leçon"],
          sentence: "Le garçon lit sa leçon dans le salon.",
          writing: "La cédille sous le c (ç) lui donne le son s devant a, o et u : ça, garçon, reçu.",
        }),
      },
      {
        title: "Quand s se lit z",
        body: soundLesson({
          sound: "z",
          spellings: "z · s entre deux voyelles",
          heardIn: ["maison", "rose", "zéro"],
          syllables: ["za", "zo", "zé", "zu", "mai-son", "ro-se"],
          words: ["maison", "rose", "valise", "oiseau", "zéro", "zébu"],
          sentence: "La valise rose est dans la maison.",
          writing: "Un seul s entre deux voyelles se lit z : rose. Pour garder le son s, on écrit ss : poisson.",
        }),
      },
    ],
  },
  {
    title: "Les sons g, j et gn",
    strand: "Lecture",
    summary: "Lire le son g (g, gu), le son j (j, ge, gi) et le son gn.",
    lessons: [
      {
        title: "Le son g : g et gu",
        body: soundLesson({
          sound: "g",
          spellings: "g (ga, go, gu) · gu (gue, gui)",
          heardIn: ["gâteau", "légume", "guitare"],
          syllables: ["ga", "go", "gu", "gue", "gui"],
          words: ["gare", "gomme", "légume", "bague", "guitare", "figue"],
          sentence: "Guy mange une figue à la gare.",
          writing: "Devant e et i, j’ajoute un u pour garder le son g : bague, guitare.",
        }),
      },
      {
        title: "Le son j : j, ge, gi",
        body: soundLesson({
          sound: "j",
          spellings: "j · g devant e, i, y (ge, gi)",
          heardIn: ["jupe", "girafe", "page"],
          syllables: ["ja", "jo", "ju", "ge", "gi"],
          words: ["jupe", "jaune", "joli", "girafe", "page", "magie"],
          sentence: "Ma jupe jaune est jolie.",
          writing: "Devant e, i et y, la lettre g se lit j : girafe, page.",
        }),
      },
      {
        title: "Le son gn",
        body: soundLesson({
          sound: "gn",
          spellings: "gn",
          heardIn: ["montagne", "peigne", "agneau"],
          syllables: ["gna", "gne", "gni", "gno"],
          words: ["ligne", "signe", "vigne", "agneau", "montagne", "cygne"],
          sentence: "L’agneau est sur la montagne.",
          writing: "Le g et le n ensemble se lisent gn, comme dans ligne.",
        }),
      },
    ],
  },
  {
    title: "Les sons in et an",
    strand: "Lecture",
    summary: "Lire le son in (in, ain, ein) et le son an (an, en, am, em).",
    lessons: [
      {
        title: "Le son in : in, ain, ein",
        body: soundLesson({
          sound: "in",
          spellings: "in · ain · ein",
          heardIn: ["lapin", "pain", "peinture"],
          syllables: ["pin", "lin", "main", "pain", "pein"],
          words: ["lapin", "sapin", "matin", "jardin", "pain", "main"],
          sentence: "Le lapin mange du pain le matin.",
          writing: "Le son in s’écrit de trois façons : in, ain, ein. Je regarde bien le mot pour l’écrire.",
        }),
      },
      {
        title: "Le son an : an, en, am, em",
        body: soundLesson({
          sound: "an",
          spellings: "an · en · am · em",
          heardIn: ["maman", "enfant", "lampe"],
          syllables: ["man", "tan", "ven", "den", "lam", "tem"],
          words: ["maman", "enfant", "lampe", "dent", "vent", "chambre"],
          sentence: "Maman range la lampe dans la chambre.",
          writing: "Devant m, b et p, on écrit am et em : lampe, chambre, temps.",
        }),
      },
    ],
  },
  {
    title: "Écrire en lettres attachées",
    strand: "Écriture",
    summary: "Réviser les lettres rondes du CI et apprendre les autres lettres cursives, dans l’ordre du programme.",
    lessons: [
      {
        title: "Les lettres à boucle et à pont",
        body: `<p>Au CP, on écrit surtout en <strong>lettres attachées</strong> (cursives) : les lettres d’un mot se tiennent la main.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Révision des lettres rondes : <strong>o · c · a · d · q</strong>.",
            "Les lettres à boucle : <strong>e · l · b · h · k</strong> (la boucle monte, puis redescend).",
            "Les lettres à pont et à pointe : <strong>u · t</strong>.",
          ])}
          ${keyPoint("J’écris sur la ligne, sans lever le crayon au milieu d’un mot. Les boucles de l, b, h et k montent jusqu’à la deuxième ligne.")}
          ${practice(["Écris trois fois chaque lettre sur ton cahier, puis les mots : bébé, lune, table.", "Montre ton écriture à un adulte : les lettres sont-elles bien posées sur la ligne ?"])}`,
      },
      {
        title: "Les dernières lettres cursives",
        body: `<p>On termine l’alphabet en lettres attachées.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Les lettres qui descendent sous la ligne : <strong>j · y · g</strong>.",
            "Les lettres délicates : <strong>s · r · z · x</strong>.",
            "Les lettres en pointe : <strong>v · w</strong>.",
          ])}
          ${keyPoint("Les queues de j, y et g descendent sous la ligne, puis remontent pour s’attacher à la lettre suivante.")}
          ${practice(["Écris ton prénom et celui de deux personnes de ta famille en lettres attachées.", "Copie la phrase : « Le zébu joyeux va à la rivière. »"])}`,
      },
    ],
  },

  // ── Palier 7 : la description ─────────────────────────────────────────────
  {
    title: "Décrire et comparer",
    strand: "Communication orale",
    summary: "Décrire un objet, un lieu, un animal, une personne, puis comparer.",
    lessons: [
      {
        title: "Décrire un objet ou un lieu",
        body: `<p><strong>Décrire</strong>, c’est dire comment est quelque chose pour que l’autre puisse l’imaginer.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Un objet : sa forme, sa couleur, sa taille, sa matière, son usage. « Mon cartable est bleu, en tissu, avec deux poches. »",
            "Un lieu : ce qu’on y voit et où se trouvent les choses. « Dans ma classe, le tableau est devant, les tables sont en rangées. »",
          ])}
          ${keyPoint("Pour décrire, je regarde bien et j’utilise des mots précis : couleur, forme, taille, place.")}
          ${practice(["Décris un objet caché à un adulte : il doit deviner ce que c’est.", "Décris ta chambre ou ta cour."])}`,
      },
      {
        title: "Décrire un animal ou une personne, et comparer",
        body: `<p>On peut décrire un animal ou une personne, puis les comparer.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Un animal : « Le zébu est grand. Il a des cornes et une bosse sur le dos. »",
            "Une personne : « Ma sœur est petite. Elle a les cheveux tressés et elle rit souvent. »",
            "Comparer : « Le chat est <strong>plus petit que</strong> le chien. Awa est <strong>aussi grande que</strong> Fatou. »",
          ])}
          ${keyPoint("Pour comparer, j’utilise plus… que, moins… que, aussi… que.")}
          ${practice(["Décris un animal de la maison ou du quartier.", "Compare deux membres de ta famille avec plus… que et aussi… que (gentiment !)."])}`,
      },
    ],
  },
  {
    title: "Les consonnes doubles",
    strand: "Lecture",
    summary: "Lire les groupes de deux consonnes : tr, pr, dr, br, cr, fr, gr puis fl, pl, gl, bl, cl.",
    lessons: [
      {
        title: "tr, pr, dr, br, cr, fr, gr",
        body: soundLesson({
          sound: "r après une consonne",
          spellings: "tr · pr · dr · br · cr · fr · gr",
          heardIn: ["train", "prune", "arbre"],
          syllables: ["tra", "pré", "dri", "bro", "cra", "fru", "gra"],
          words: ["train", "prune", "drap", "arbre", "crabe", "fruit", "grand"],
          sentence: "Le train passe près du grand arbre.",
          writing: "Je lis les deux consonnes ensemble, sans les séparer : tr-ain, pr-une.",
        }),
      },
      {
        title: "fl, pl, gl, bl, cl",
        body: soundLesson({
          sound: "l après une consonne",
          spellings: "fl · pl · gl · bl · cl",
          heardIn: ["fleur", "plume", "table"],
          syllables: ["fla", "plu", "gli", "blé", "clo"],
          words: ["fleur", "plume", "glace", "table", "clé", "plage"],
          sentence: "Sur la table, il y a une fleur et une clé.",
          writing: "Comme pour tr et pr, je lis les deux consonnes d’un seul coup : fl-eur, pl-ume.",
        }),
      },
    ],
  },
  {
    title: "Les sons oir, eur et les lettres muettes",
    strand: "Lecture",
    summary: "Lire ac, oir, eur, el, ec, puis repérer les lettres qu’on écrit sans les entendre.",
    lessons: [
      {
        title: "ac, oir et eur",
        body: soundLesson({
          sound: "oir et eur",
          spellings: "ac · oir · eur",
          heardIn: ["sac", "miroir", "fleur"],
          syllables: ["lac", "sac", "voir", "soir", "peur", "leur"],
          words: ["lac", "sac", "miroir", "couloir", "chanteur", "moteur"],
          sentence: "Ce soir, le chanteur se voit dans le miroir.",
          writing: "À la fin de oir et eur, j’entends bien le r : je ne l’oublie pas.",
        }),
      },
      {
        title: "el, ec, es et les lettres muettes",
        body: `<p>Certaines lettres s’entendent, d’autres sont <strong>muettes</strong> : on les écrit, mais on ne les entend pas.</p>
          <h2>Je lis</h2>
          <p>Le e se lit è devant une consonne qui se prononce : <strong>sel · bec · reste · ciel</strong>.</p>
          <p>Des lettres muettes à la fin des mots : <strong>chat · lit · nid · riz · loup · tapis</strong>.</p>
          ${keyPoint("Pour trouver une lettre muette, je cherche un mot de la même famille : chat → chaton, lit → literie, nid → nicher.")}
          ${practice(["Lis les mots à voix haute et montre la lettre muette.", "Trouve un mot de la même famille pour : petit, grand, gros."])}`,
      },
    ],
  },

  // ── Palier 8 : l'injonction ───────────────────────────────────────────────
  {
    title: "Donner des ordres et interdire",
    strand: "Communication orale",
    summary: "Donner un ordre ou une consigne, puis interdire quelque chose poliment.",
    lessons: [
      {
        title: "Donner une consigne",
        body: `<p>Pour faire faire quelque chose, on donne une <strong>consigne</strong> avec un verbe d’action.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "« Ferme la porte, s’il te plaît. »",
            "« Prends ton cahier et ouvre-le à la page 10. »",
            "« Lavez-vous les mains avant de manger. »",
          ])}
          ${keyPoint("Une consigne commence souvent par un verbe : ferme, prends, lave. On ajoute « s’il te plaît » ou « s’il vous plaît ».")}
          ${practice(["Donne trois consignes à un adulte pour préparer la table, puis vérifie qu’il les fait dans l’ordre."])}`,
      },
      {
        title: "Interdire quelque chose",
        body: `<p>Pour <strong>interdire</strong>, on dit ce qu’il ne faut pas faire, et on explique pourquoi.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "« Ne jette pas tes papiers par terre : la cour doit rester propre. »",
            "« Il est interdit de courir dans les escaliers : on peut tomber. »",
            "« Ne touche pas aux médicaments : c’est dangereux. »",
          ])}
          ${keyPoint("Pour interdire, j’utilise <strong>ne… pas</strong> ou « Il est interdit de… », et je donne la raison.")}
          ${practice(["Invente trois règles pour la classe qui commencent par « Ne… pas ».", "Explique à un adulte pourquoi chaque règle est utile."])}`,
      },
    ],
  },
  {
    title: "Les sons ette, elle et ill",
    strand: "Lecture",
    summary: "Lire -ette, -erre, -esse, -elle, -enne, puis ill, ail, eil, euil, ouil.",
    lessons: [
      {
        title: "-ette, -erre, -esse, -elle, -enne",
        body: soundLesson({
          sound: "è devant deux consonnes",
          spellings: "ette · erre · esse · elle · enne",
          heardIn: ["lunette", "terre", "pelle"],
          syllables: ["nette", "terre", "tesse", "belle", "tenne"],
          words: ["lunette", "terre", "pierre", "maîtresse", "pelle", "antenne"],
          sentence: "La maîtresse range la pelle près de la pierre.",
          writing: "Devant deux consonnes pareilles (tt, rr, ss, ll, nn), le e se lit è.",
        }),
      },
      {
        title: "ill, ail, eil, euil, ouil",
        body: soundLesson({
          sound: "ill",
          spellings: "ill · ail · aill · eil · eill · euil · ouil · ouill",
          heardIn: ["fille", "soleil", "grenouille"],
          syllables: ["bille", "ail", "eil", "euil", "ouille"],
          words: ["fille", "bille", "travail", "soleil", "fauteuil", "grenouille"],
          sentence: "La fille joue aux billes au soleil.",
          writing: "À la fin d’un mot, ail, eil et euil s’écrivent avec un seul l ; au milieu, on double le l : travailler, oreille.",
        }),
      },
    ],
  },
  {
    title: "Les sons ier, ieu, ien, ui, oin et ion",
    strand: "Lecture",
    summary: "Lire y (= deux i), ier, iez, iau, ieu, ien, puis ui, oin, ion, et sc, st, sp, h, x.",
    lessons: [
      {
        title: "y, ier, ieu et ien",
        body: soundLesson({
          sound: "i suivi d’un autre son",
          spellings: "y (= deux i, comme dans crayon) · ier · iez · iau · ieu · ien",
          heardIn: ["crayon", "panier", "chien"],
          syllables: ["yon", "pier", "nier", "mieu", "bien", "chien"],
          words: ["crayon", "papier", "cahier", "panier", "mieux", "chien"],
          sentence: "Le chien dort dans le panier.",
          writing: "Je lis i et le son qui suit d’un seul coup : pa-nier, chien.",
        }),
      },
      {
        title: "ui, oin, ion et les lettres h et x",
        body: soundLesson({
          sound: "ui, oin, ion",
          spellings: "ui · oin · ion (et sc, st, sp ; h muet ; x)",
          heardIn: ["nuit", "loin", "camion"],
          syllables: ["nui", "fui", "loin", "coin", "lion", "tion"],
          words: ["nuit", "fruit", "point", "camion", "lion", "taxi"],
          sentence: "La nuit, le camion roule loin.",
          writing: "Le h au début d’un mot ne se prononce pas : hibou, histoire. Le x se lit souvent ks : taxi.",
        }),
      },
    ],
  },
  {
    title: "Écrire de petits textes",
    strand: "Production d’écrits",
    summary: "Écrire au moins deux phrases pour raconter, décrire ou donner des consignes.",
    lessons: [
      {
        title: "Raconter par écrit",
        body: `<p>Au CP, tu écris de petits textes d’<strong>au moins deux phrases</strong>.</p>
          <h2>Je découvre</h2>
          <p>Exemple : « Dimanche, je suis allé à la plage avec mon oncle. Nous avons ramassé des coquillages. »</p>
          ${keyPoint("Chaque phrase commence par une majuscule et se termine par un point. Je dis qui, quand, où et ce qui se passe.")}
          ${practice(["Écris deux phrases pour raconter ce que tu as fait hier.", "Relis-toi : majuscule au début, point à la fin ?"])}`,
      },
      {
        title: "Décrire par écrit",
        body: `<p>Pour décrire par écrit, je regarde bien et j’utilise des mots précis.</p>
          <h2>Je découvre</h2>
          <p>Exemple : « Mon chat s’appelle Tigre. Il est gris avec des rayures noires. Il dort toujours sur la natte. »</p>
          ${keyPoint("Pour décrire, je dis comment est la chose : sa couleur, sa forme, sa taille, ce qu’elle fait.")}
          ${practice(["Écris deux ou trois phrases pour décrire ton animal préféré.", "Dessine-le à côté de ton texte."])}`,
      },
      {
        title: "Écrire une consigne",
        body: `<p>Une consigne écrite explique ce qu’il faut faire, étape par étape.</p>
          <h2>Je découvre</h2>
          <p>Exemple : « Prends une feuille. Plie-la en deux. Dessine un soleil sur la première moitié. »</p>
          ${keyPoint("J’écris une action par phrase, avec un verbe au début : prends, plie, dessine.")}
          ${practice(["Écris trois consignes pour se laver les mains.", "Fais lire tes consignes à un adulte : arrive-t-il à les suivre ?"])}`,
      },
    ],
  },
];
