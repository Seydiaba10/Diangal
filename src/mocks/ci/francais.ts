// Français du CI (domaine « Langue et communication »). Programme : Curriculum de l'Éducation
// de Base, Langue et communication, étape 1, 2e version (MEN, avril 2014) — paliers 1 à 4 du CI :
// langage, récitation, lecture (ordre officiel des sons), graphisme-écriture, production d'écrits.
// Leçons rédigées par DIANGAL (comptine originale), à faire valider par un enseignant.

import { bullets, type CiChapterSpec, keyPoint, practice, soundLesson } from "./blocks";

export const FR_CI: CiChapterSpec[] = [
  // ── Palier 1 : le contact social ─────────────────────────────────────────
  {
    title: "Bonjour l’école !",
    strand: "Communication orale",
    summary: "Comprendre les consignes de la classe, saluer, se présenter, présenter quelqu’un et prendre congé.",
    lessons: [
      {
        title: "Les consignes de la classe",
        body: `<p>En classe, le maître ou la maîtresse donne des <strong>consignes</strong>. Il faut les écouter et les faire.</p>
          <h2>Je découvre</h2>
          ${bullets(["« Debout ! » : je me lève.", "« Assis ! » : je m’assois.", "« Silence ! » : je me tais.", "« Écoutez ! » : je regarde et j’écoute."])}
          ${keyPoint("Quand j’entends une consigne, je m’arrête, j’écoute, puis je la fais.")}
          ${practice(["Jeu « Jacques a dit » avec un adulte : debout, assis, levez la main, silence…"])}`,
      },
      {
        title: "Saluer et se présenter",
        body: `<p>Quand on rencontre quelqu’un, on le <strong>salue</strong>, puis on peut se <strong>présenter</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "« Bonjour, Madame ! » le matin ; « Bonsoir, Monsieur ! » le soir.",
            "« Comment ça va ? » — « Ça va bien, merci. »",
            "« Je m’appelle Awa. J’habite à Pikine. Je suis élève au CI. »",
          ])}
          <h2>Ma comptine</h2>
          <p>Bonjour le soleil,<br>Bonjour mes amis,<br>Bonjour la maîtresse,<br>Ma classe est jolie !</p>
          ${keyPoint("Pour me présenter, je dis mon prénom, mon nom et où j’habite.")}
          ${practice(["Présente-toi à un adulte comme si c’était le premier jour d’école.", "Apprends la comptine et dis-la en saluant de la main."])}`,
      },
      {
        title: "Présenter quelqu’un et prendre congé",
        body: `<p>On peut aussi présenter une autre personne, saluer un groupe et dire au revoir.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "« Voici mon frère, il s’appelle Moussa. » « Voilà ma sœur Fatou. »",
            "Pour saluer un groupe : « Bonjour à tous ! Comment allez-vous ? »",
            "Pour partir : « Au revoir ! À demain ! Merci ! »",
          ])}
          ${keyPoint("Voici et voilà servent à montrer et à présenter.")}
          ${practice(["Présente un membre de ta famille à l’adulte, puis dis-lui au revoir poliment."])}`,
      },
    ],
  },
  {
    title: "Découvrir l’écrit",
    strand: "Lecture",
    summary: "Entendre les syllabes et les sons, reconnaître les lettres de l’alphabet et ses premiers mots.",
    lessons: [
      {
        title: "Écouter les sons des mots",
        body: `<p>Les mots sont faits de petits morceaux qu’on entend : les <strong>syllabes</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets(["« pa-pa » : 2 syllabes, je frappe 2 fois.", "« ba-na-ne » : 3 syllabes, je frappe 3 fois.", "« Awa » et « papa » finissent par le même son : ils riment."])}
          ${keyPoint("Pour compter les syllabes d’un mot, je frappe dans mes mains en le disant.")}
          ${practice(["Frappe les syllabes de ton prénom et de celui de tes amis.", "Trouve un mot qui finit comme « gâteau »."])}`,
      },
      {
        title: "Les lettres de l’alphabet",
        body: `<p>Pour écrire, on utilise des <strong>lettres</strong>. Il y en a 26 : c’est l’<strong>alphabet</strong>.</p>
          <h2>Je découvre</h2>
          <p><strong>a b c d e f g h i j k l m n o p q r s t u v w x y z</strong></p>
          <p>Chaque lettre existe en majuscule : A, B, C… On met une majuscule au début d’un prénom : Awa, Moussa.</p>
          ${keyPoint("Les lettres forment les mots, comme les perles forment un collier.")}
          ${practice(["Montre les lettres de ton prénom sur un calendrier, une affiche ou un emballage.", "Chante l’alphabet avec un adulte."])}`,
      },
      {
        title: "Mes premiers mots",
        body: `<p>Certains mots se reconnaissent tout de suite, d’un seul coup d’œil, comme une image.</p>
          <h2>Je découvre</h2>
          ${bullets(["bonjour · bonsoir · merci · au revoir", "papa · maman · frère · sœur", "école · classe · cour · élève", "livre · ardoise · craie · tableau"])}
          ${keyPoint("Je reconnais ces mots partout : dans mon livre, sur le tableau, sur les affiches.")}
          ${practice(["L’adulte écrit « papa », « maman » et ton prénom sur des papiers. Retrouve chacun.", "Cherche le mot « école » sur le chemin ou dans ton livre."])}`,
      },
    ],
  },
  {
    title: "Les premiers gestes d’écriture",
    strand: "Écriture",
    summary: "Découvrir les outils pour écrire et maîtriser les graphismes de base.",
    lessons: [
      {
        title: "Les outils pour écrire",
        body: `<p>Pour écrire, j’utilise l’<strong>ardoise</strong> et la <strong>craie</strong>, le <strong>cahier</strong> et le <strong>crayon</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets(["Je m’assois bien droit, les pieds par terre.", "Je tiens mon crayon entre le pouce et l’index, posé sur le majeur, sans serrer trop fort.", "Ma main libre tient la feuille."])}
          ${keyPoint("Une bonne position aide à bien écrire sans fatiguer.")}
          ${practice(["Montre à l’adulte comment tu tiens ton crayon.", "Range ton ardoise et ta craie après l’exercice."])}`,
      },
      {
        title: "Traits, ronds, ponts et boucles",
        body: `<p>Avant les lettres, on apprend les <strong>graphismes</strong> : ce sont les morceaux des lettres.</p>
          <h2>Je découvre</h2>
          ${bullets(["Des traits droits : | | | et — — —", "Des ronds : o o o", "Des ponts : n n n", "Des boucles : l l l"])}
          ${keyPoint("Je trace de gauche à droite et de haut en bas.")}
          ${practice(["Trace dans le sable ou la farine : traits, ronds, ponts et boucles.", "Fais une ligne de ponts sur ton ardoise sans lever la craie."])}`,
      },
    ],
  },

  // ── Palier 2 : rechercher des informations · sons a, i, t, o, l ──────────
  {
    title: "Les sons a, i et t",
    strand: "Lecture",
    summary: "Entendre, lire et écrire les premiers sons : a, i et t.",
    lessons: [
      {
        title: "Le son a",
        body: soundLesson({
          sound: "[a]",
          spellings: "a · A",
          heardIn: ["ananas", "papa", "sac", "Awa"],
          syllables: ["a", "A"],
          words: ["la", "papa", "Awa"],
          writing: "Je trace un rond, puis un petit trait collé à droite : a.",
        }),
      },
      {
        title: "Le son i",
        body: soundLesson({
          sound: "[i]",
          spellings: "i · I",
          heardIn: ["lit", "midi", "riz", "Ibrahima"],
          syllables: ["i", "a", "ia"],
          words: ["il", "Ali", "Awa"],
          writing: "Je trace un petit trait vers le bas, puis je pose le point au-dessus : i.",
        }),
      },
      {
        title: "Le son t",
        body: soundLesson({
          sound: "[t]",
          spellings: "t · T",
          heardIn: ["tomate", "tableau", "tata", "Touba"],
          syllables: ["ta", "ti", "at", "it"],
          words: ["tata", "ta tata", "Tati"],
          writing: "Je trace un grand trait vers le bas, puis une petite barre : t.",
        }),
      },
    ],
  },
  {
    title: "Les sons o et l",
    strand: "Lecture",
    summary: "Entendre, lire et écrire o et l, puis lire de petites phrases.",
    lessons: [
      {
        title: "Le son o",
        body: soundLesson({
          sound: "[o]",
          spellings: "o · O",
          heardIn: ["moto", "domino", "orange", "Oumar"],
          syllables: ["to", "ot", "ta", "ti"],
          words: ["Toto", "Tito", "tata"],
          writing: "Je trace un rond bien fermé, en tournant comme pour le a : o.",
        }),
      },
      {
        title: "Le son l",
        body: soundLesson({
          sound: "[l]",
          spellings: "l · L",
          heardIn: ["lune", "lait", "ballon", "Lamine"],
          syllables: ["la", "li", "lo", "al", "il", "ol"],
          words: ["la", "lit", "lot", "Lola", "Lili"],
          sentence: "Lola a le lit de tata.",
          writing: "Je trace une grande boucle qui monte, puis redescend : l.",
        }),
      },
    ],
  },
  {
    title: "Demander et donner un renseignement",
    strand: "Communication orale",
    summary: "Poser des questions et y répondre : où ? comment ? quand ? qui ? combien ?",
    lessons: [
      {
        title: "Où ? Comment ? Quand ?",
        body: `<p>Pour avoir un <strong>renseignement</strong>, on pose une question poliment.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "<strong>Où</strong> est la boutique ? — Elle est à côté de la mosquée.",
            "<strong>Comment</strong> fais-tu le thé ? — Je fais bouillir l’eau, puis…",
            "<strong>Quand</strong> vas-tu au marché ? — J’y vais demain matin.",
          ])}
          ${keyPoint("Une question commence souvent par un mot comme où, comment ou quand. On la dit avec la voix qui monte.")}
          ${practice(["Pose trois questions à un adulte sur la maison : où ? comment ? quand ?"])}`,
      },
      {
        title: "Qui ? Combien ?",
        body: `<p>On peut aussi demander qui fait une action, ou combien coûte une chose.</p>
          <h2>Je découvre</h2>
          ${bullets(["<strong>Qui</strong> a pris mon crayon ? — C’est Moussa.", "<strong>Combien</strong> coûte le pain ? — Il coûte cent cinquante francs.", "<strong>Combien</strong> d’élèves y a-t-il ? — Il y en a quarante."])}
          ${keyPoint("Pour répondre, je fais une phrase complète.")}
          ${practice(["Joue à la marchande avec un adulte : demande combien coûtent trois choses."])}`,
      },
    ],
  },

  // ── Palier 3 : besoins, goûts et préférences · sons n, e, p, d, m, b ────
  {
    title: "Les sons n et e",
    strand: "Lecture",
    summary: "Entendre, lire et écrire n et e (comme dans « le »).",
    lessons: [
      {
        title: "Le son n",
        body: soundLesson({
          sound: "[n]",
          spellings: "n · N",
          heardIn: ["nez", "Ndèye", "banane", "Néné"],
          syllables: ["na", "ni", "no", "ina"],
          words: ["Nina", "Tina", "Lina", "Nini"],
          sentence: "Tina a le lit de Nina.",
          writing: "Je trace un trait, puis un pont : n.",
        }),
      },
      {
        title: "Le son e",
        body: soundLesson({
          sound: "e (comme dans « le »)",
          spellings: "e",
          heardIn: ["le", "de", "petit", "cheval"],
          syllables: ["le", "ne", "te"],
          words: ["le", "de", "le lit", "le lot"],
          sentence: "Le lit de Nina.",
          writing: "Je trace une petite boucle couchée : e.",
        }),
      },
    ],
  },
  {
    title: "Les sons p, d, m et b",
    strand: "Lecture",
    summary: "Entendre, lire et écrire p, d, m et b, et ne pas confondre b, d et p.",
    lessons: [
      {
        title: "Le son p",
        body: soundLesson({
          sound: "[p]",
          spellings: "p · P",
          heardIn: ["papa", "pied", "pomme", "pirogue"],
          syllables: ["pa", "pi", "po", "pe", "ap", "op"],
          words: ["papa", "pipe", "pile", "pot", "polo"],
          sentence: "Papa a le polo de Pape.",
          writing: "Je trace un trait qui descend sous la ligne, puis un rond en haut, à droite : p.",
        }),
      },
      {
        title: "Le son d",
        body: soundLesson({
          sound: "[d]",
          spellings: "d · D",
          heardIn: ["dent", "domino", "radio", "Dakar"],
          syllables: ["da", "di", "do", "de"],
          words: ["dodo", "Dina", "Dado", "dit"],
          sentence: "Dina a dit : dodo !",
          writing: "Je trace un rond, puis un grand trait collé à droite qui monte haut : d.",
        }),
      },
      {
        title: "Le son m",
        body: soundLesson({
          sound: "[m]",
          spellings: "m · M",
          heardIn: ["maman", "mangue", "moto", "Mamadou"],
          syllables: ["ma", "mi", "mo", "me", "am", "im"],
          words: ["moto", "ami", "lime", "mine", "Momo"],
          sentence: "Amina a la moto de Momo.",
          writing: "Je trace un trait, puis deux ponts : m.",
        }),
      },
      {
        title: "Le son b",
        body: `${soundLesson({
          sound: "[b]",
          spellings: "b · B",
          heardIn: ["ballon", "bébé", "baobab", "Binta"],
          syllables: ["ba", "bi", "bo", "be", "ab", "ob"],
          words: ["bol", "bobo", "Babi", "lobe"],
          sentence: "Babi a le bol de papa.",
          writing: "Je trace un grand trait qui monte haut, puis un rond en bas, à droite : b.",
        })}${keyPoint("<strong>b</strong> a son rond en bas à droite, <strong>d</strong> en bas à gauche, <strong>p</strong> a son trait sous la ligne.")}`,
      },
    ],
  },
  {
    title: "Dire ce que je ressens et ce que j’aime",
    strand: "Communication orale",
    summary: "Exprimer un besoin, un sentiment, une sensation, son avis et ses préférences.",
    lessons: [
      {
        title: "Exprimer un besoin ou un sentiment",
        body: `<p>Pour être aidé, il faut savoir dire ce dont on a besoin et ce que l’on ressent.</p>
          <h2>Je découvre</h2>
          ${bullets(["« J’ai soif, je voudrais de l’eau, s’il vous plaît. »", "« J’ai froid. » « J’ai mal au ventre. »", "« Je suis content. » « Je suis triste. » « J’ai peur. »"])}
          ${keyPoint("Je commence par « J’ai… », « Je suis… » ou « Je voudrais… », et je dis « s’il vous plaît ».")}
          ${practice(["Mime un sentiment (joie, colère, peur) : l’adulte le devine, puis tu dis la phrase."])}`,
      },
      {
        title: "Donner son avis et ses préférences",
        body: `<p>Chacun a ses goûts. On peut les dire avec respect.</p>
          <h2>Je découvre</h2>
          ${bullets(["« J’aime le ballon. Je n’aime pas la pluie. »", "« Je préfère la mangue à l’orange. »", "« À mon avis, ce dessin est très beau. »"])}
          ${keyPoint("Pour comparer, je dis : « Je préfère… à… ».")}
          ${practice(["Dis trois choses que tu aimes et une chose que tu n’aimes pas.", "Choisis ton fruit préféré et explique pourquoi."])}`,
      },
    ],
  },

  // ── Palier 4 : permission et services · sons f, u, ou, é, è, s, r, au, on ─
  {
    title: "Les sons f, u et ou",
    strand: "Lecture",
    summary: "Entendre, lire et écrire f, u et ou, sans confondre u et ou.",
    lessons: [
      {
        title: "Le son f",
        body: soundLesson({
          sound: "[f]",
          spellings: "f · F",
          heardIn: ["feu", "café", "girafe", "Fatou"],
          syllables: ["fa", "fi", "fo", "fe", "af", "if"],
          words: ["fil", "Fifi", "film"],
          sentence: "Fifi a le fil de papa.",
          writing: "Je trace une canne qui monte haut et descend sous la ligne, puis une petite barre : f.",
        }),
      },
      {
        title: "Le son u",
        body: soundLesson({
          sound: "[u]",
          spellings: "u · U",
          heardIn: ["lune", "tortue", "jus", "pull"],
          syllables: ["tu", "lu", "nu", "mu", "bu", "pu", "du", "fu"],
          words: ["lune", "plume", "tutu", "bulle"],
          sentence: "Il a lu le menu.",
          writing: "Je trace un creux, puis un petit trait qui redescend : u.",
        }),
      },
      {
        title: "Le son ou",
        body: `${soundLesson({
          sound: "[ou]",
          spellings: "ou",
          heardIn: ["loup", "chou", "mouton", "Moussa"],
          syllables: ["tou", "lou", "nou", "mou", "bou", "pou", "dou", "fou"],
          words: ["loup", "poule", "boule", "moule", "Doudou", "Modou"],
          sentence: "Modou a la boule de Doudou.",
          writing: "J’écris o, puis u, l’un contre l’autre : ou.",
        })}${keyPoint("<strong>u</strong> et <strong>ou</strong> ne se disent pas pareil : « tu » n’est pas « tout ».")}`,
      },
    ],
  },
  {
    title: "Les sons é et è",
    strand: "Lecture",
    summary: "Entendre, lire et écrire é (é, et) et è (è, ê, ai, e).",
    lessons: [
      {
        title: "Le son é, comme dans bébé",
        body: soundLesson({
          sound: "[é]",
          spellings: "é · et",
          heardIn: ["bébé", "café", "école", "éléphant"],
          syllables: ["té", "lé", "né", "pé", "dé", "mé", "bé", "fé"],
          words: ["bébé", "été", "le dé", "la fée"],
          sentence: "Papa et le bébé.",
          writing: "J’écris e, puis je pose un petit accent qui penche vers la droite : é.",
        }),
      },
      {
        title: "Le son è, comme dans mère",
        body: soundLesson({
          sound: "[è]",
          spellings: "è · ê · ai · e (dans « elle »)",
          heardIn: ["mère", "fête", "lait", "élève"],
          syllables: ["tè", "lè", "mè", "pè", "fê", "lai", "mai"],
          words: ["fête", "tête", "lait", "elle", "belle", "même"],
          sentence: "Maman fête le bébé.",
          writing: "Pour è, l’accent penche vers la gauche ; pour ê, il fait un petit chapeau.",
        }),
      },
    ],
  },
  {
    title: "Les sons s, r, au et on",
    strand: "Lecture",
    summary: "Entendre, lire et écrire s, r, au (au, eau, o) et on (on, om).",
    lessons: [
      {
        title: "Le son s",
        body: soundLesson({
          sound: "[s]",
          spellings: "s · S",
          heardIn: ["sac", "soleil", "salade", "Sokhna"],
          syllables: ["sa", "si", "so", "su", "sou", "sé", "as", "is"],
          words: ["Sali", "sous", "soupe", "salade"],
          sentence: "Sali a salé la soupe.",
          writing: "Je trace un petit serpent : s.",
        }),
      },
      {
        title: "Le son r",
        body: soundLesson({
          sound: "[r]",
          spellings: "r · R",
          heardIn: ["riz", "rue", "radio", "Rama"],
          syllables: ["ra", "ri", "ro", "ru", "rou", "ré", "ar", "or"],
          words: ["rue", "radio", "Rama", "route", "mère", "robe"],
          sentence: "Rama a la robe de sa mère.",
          writing: "Je trace un petit trait, puis une petite vague en haut : r.",
        }),
      },
      {
        title: "Le son au",
        body: soundLesson({
          sound: "[o] écrit au ou eau",
          spellings: "au · eau · o",
          heardIn: ["auto", "bateau", "seau", "chaud"],
          syllables: ["tau", "lau", "pau", "beau", "deau", "seau"],
          words: ["auto", "bateau", "seau", "rideau", "taureau"],
          sentence: "Papa a un beau bateau.",
          writing: "J’écris a et u collés pour au ; e, a et u pour eau.",
        }),
      },
      {
        title: "Le son on",
        body: soundLesson({
          sound: "[on]",
          spellings: "on · om (devant m, b ou p)",
          heardIn: ["mouton", "ballon", "pont", "nombre"],
          syllables: ["ton", "lon", "mon", "bon", "son", "ron", "pom"],
          words: ["mouton", "ballon", "bonbon", "pompe", "salon", "rond"],
          sentence: "Modou a un bonbon et un ballon rond.",
          writing: "J’écris o puis n : on. Devant b ou p, j’écris om : pompe.",
        }),
      },
    ],
  },
  {
    title: "Demander la permission ou un service",
    strand: "Communication orale",
    summary: "Demander poliment la permission, demander un service, accepter ou refuser.",
    lessons: [
      {
        title: "Demander la permission",
        body: `<p>Avant de faire quelque chose qui ne dépend pas que de moi, je demande la <strong>permission</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets(["« Madame, est-ce que je peux sortir, s’il vous plaît ? »", "« Papa, puis-je aller jouer chez Fatou ? »", "Réponses : « Oui, tu peux. » ou « Non, pas maintenant. »"])}
          ${keyPoint("Je dis « Est-ce que je peux… ? » ou « Puis-je… ? », puis « s’il vous plaît » et « merci ».")}
          ${practice(["Joue la scène : tu demandes la permission de sortir en récréation."])}`,
      },
      {
        title: "Demander et rendre un service",
        body: `<p>On s’entraide en se rendant des <strong>services</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets(["« Peux-tu me prêter ta gomme, s’il te plaît ? » — « Oui, la voici. »", "« Pouvez-vous m’aider à porter ce seau ? » — « Avec plaisir. »", "Après un service, on dit : « Merci beaucoup ! »"])}
          ${keyPoint("Je dis « tu » à un camarade et « vous » à un adulte que je respecte.")}
          ${practice(["Demande un petit service à un adulte, puis rends-lui un service à ton tour."])}`,
      },
    ],
  },
  {
    title: "Mes premières lettres attachées",
    strand: "Écriture",
    summary: "Écrire en lettres cursives : o, c, a, d et q.",
    lessons: [
      {
        title: "Les lettres rondes : o, c, a, d, q",
        body: `<p>En écriture attachée, les lettres se tiennent la main. On commence par les lettres <strong>rondes</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets(["<strong>c</strong> : un rond qui ne se ferme pas.", "<strong>o</strong> : un rond fermé, avec un petit pont pour attacher.", "<strong>a</strong> : un rond et un petit trait.", "<strong>d</strong> : un rond et un grand trait.", "<strong>q</strong> : un rond et un trait qui descend sous la ligne."])}
          ${keyPoint("Ces lettres commencent toutes par le même geste : le rond qui tourne vers la gauche.")}
          ${practice(["Écris une ligne de c, puis une ligne de a sur ton cahier, entre les lignes.", "Écris « do » et « da » en attachant les lettres."])}`,
      },
    ],
  },
  {
    title: "J’écris mes premières phrases",
    strand: "Production d’écrits",
    summary: "Choisir des étiquettes-mots, dire une phrase à l’adulte, puis écrire une ou deux phrases.",
    lessons: [
      {
        title: "Avec des étiquettes-mots",
        body: `<p>Une <strong>phrase</strong> est faite de mots rangés dans l’ordre. Elle commence par une majuscule et finit par un point.</p>
          <h2>Je découvre</h2>
          <p>Avec les étiquettes « Bonjour », « Madame » et « ! », je forme : <strong>Bonjour Madame !</strong></p>
          <p>Avec « Je », « m’appelle » et « Awa », je forme : <strong>Je m’appelle Awa.</strong></p>
          ${keyPoint("Je range les mots pour que la phrase ait du sens.")}
          ${practice(["L’adulte écrit des mots sur des papiers : remets-les dans l’ordre pour faire une phrase."])}`,
      },
      {
        title: "Je dis, puis j’écris",
        body: `<p>Avant d’écrire, je dis ma phrase à voix haute. L’adulte peut l’écrire sous ma dictée, puis je la recopie.</p>
          <h2>Je découvre</h2>
          ${bullets(["Pour saluer : « Bonjour Tata ! »", "Pour demander : « Est-ce que je peux jouer ? »", "Pour dire ce que j’aime : « J’aime la mangue. »"])}
          ${keyPoint("Une phrase dit une seule idée. Majuscule au début, point à la fin.")}
          ${practice(["Dicte deux phrases à un adulte sur ta journée, puis recopie-les."])}`,
      },
    ],
  },
];
