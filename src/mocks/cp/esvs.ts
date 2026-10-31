// Éducation à la science et à la vie sociale (ESVS) du CP. Programme : Curriculum de l'Éducation
// de Base, guide pédagogique de l'étape 1 (CI-CP), MEN — paliers 3 et 4 (niveau 2) de l'histoire,
// de la géographie, de l'initiation scientifique et technologique, de « Vivre dans son milieu » et
// de « Vivre ensemble ». Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";
import { figure, pic, row, schema } from "../lesson-figures";

export const ESVS_CP: CiChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "Histoire : l’ordre et la fréquence des événements",
    strand: "Histoire",
    summary: "Utiliser les indicateurs de temps, ordonner des événements et dire leur fréquence.",
    lessons: [
      {
        title: "Les indicateurs de temps",
        body: `<p>Des mots nous aident à situer les événements dans le temps : ce sont les <strong>indicateurs de temps</strong>.</p>
          ${figure(schema("ci-journee", "Ma journée dans l’ordre : le matin, l’école, le repas, la nuit."), "Je dis l’ordre : <strong>d’abord</strong> le matin, <strong>ensuite</strong> l’école, <strong>puis</strong> le repas, <strong>enfin</strong> la nuit.")}
          <h2>Je découvre</h2>
          ${bullets(["« <strong>Hier</strong>, je suis arrivé chez mon oncle. »", "« <strong>Aujourd’hui</strong>, nous allons à l’école. »", "« <strong>Demain</strong>, ce sera la fête. »", "« <strong>Pendant</strong> la pluie, nous restons à l’abri. »"])}
          ${keyPoint("Hier, aujourd’hui, demain et pendant disent <strong>quand</strong> une chose se passe.")}
          ${practice(["Fais trois phrases avec hier, aujourd’hui et demain."])}`,
      },
      {
        title: "Avant, pendant, après",
        body: `<p>Pour raconter, on met les événements <strong>dans l’ordre</strong>.</p>
          ${figure(row(pic("savon", "avant : je me lave les mains", 44), pic("bol", "pendant : je mange", 44), pic("brosse-a-dents", "après : je me brosse les dents", 30)), "Le repas : <strong>avant</strong>, <strong>pendant</strong> et <strong>après</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["<strong>Avant</strong> le repas, je me lave les mains.", "<strong>En même temps que</strong> maman cuisine, ma sœur met la table.", "<strong>Après</strong> le coucher du soleil, il fait nuit."])}
          ${keyPoint("Avant, pendant, en même temps que et après permettent de ranger les événements dans l’ordre.")}
          ${practice(["Range dans l’ordre : se coucher, dîner, se brosser les dents.", "Raconte une fête de famille avec avant, pendant et après."])}`,
      },
      {
        title: "Combien de fois ? La fréquence",
        body: `<p>Certaines choses arrivent souvent, d’autres rarement : c’est leur <strong>fréquence</strong>.</p>
          ${figure("<table><tr><th>souvent</th><td>je me brosse les dents chaque jour</td></tr><tr><th>parfois</th><td>je vais au marché le dimanche</td></tr><tr><th>rarement</th><td>la Tabaski, une fois par an</td></tr></table>", "Ce qui arrive souvent, parfois ou rarement : c’est la <strong>fréquence</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["Je prends une douche <strong>chaque</strong> jour.", "Nous allons au marché <strong>tous les</strong> dimanches.", "On mange <strong>trois fois par</strong> jour."])}
          ${keyPoint("Chaque, tous les, … fois par… disent combien de fois une chose arrive.")}
          ${practice(["Dis ce que tu fais chaque jour, chaque semaine et une fois par an."])}`,
      },
    ],
  },
  {
    title: "Histoire : mesurer le temps",
    strand: "Histoire",
    summary: "Estimer et comparer des durées, utiliser l’emploi du temps, le calendrier et les instruments de mesure du temps.",
    lessons: [
      {
        title: "Estimer et comparer des durées",
        body: `<p>Une <strong>durée</strong>, c’est le temps que dure une activité, de son début à sa fin.</p>
          ${figure(row(pic("verre-eau", "boire un verre : quelques secondes", 50), pic("lit", "dormir : toute la nuit", 44)), "Boire un verre d’eau dure <strong>peu</strong> de temps ; dormir dure <strong>longtemps</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["La récréation dure <strong>de</strong> 10 heures <strong>à</strong> 10 heures et demie.", "<strong>Depuis</strong> ce matin, il pleut.", "Le match a duré <strong>plus</strong> longtemps <strong>que</strong> la récréation."])}
          ${keyPoint("Pour dire une durée, je donne le moment du début et le moment de la fin.")}
          ${practice(["Estime combien de temps tu mets pour aller à l’école, puis vérifie avec un adulte."])}`,
      },
      {
        title: "Les instruments du temps",
        body: `<p>Pour organiser et mesurer le temps, on utilise des outils.</p>
          ${figure(row(pic("sablier", "le sablier", 70), schema("cp-heure-3", "Une horloge qui marque 3 heures."), pic("telephone", "le téléphone", 70)), "Le sablier mesure une durée ; l’horloge et le téléphone donnent l’heure.")}
          <h2>Je découvre</h2>
          ${bullets(["L’<strong>emploi du temps</strong> de la classe dit quelle activité a lieu à quelle heure.", "Le <strong>calendrier</strong> montre les jours et les mois.", "Le <strong>sablier</strong>, la <strong>montre</strong> et l’<strong>horloge</strong> mesurent les durées."])}
          ${keyPoint("Le calendrier organise les jours ; la montre et l’horloge mesurent les heures et les minutes.")}
          ${practice(["Fabrique un petit sablier avec deux bouteilles et du sable sec, puis chronomètre une activité."])}`,
      },
    ],
  },

  // ── Géographie ────────────────────────────────────────────────────────────
  {
    title: "Géographie : situer et ranger",
    strand: "Géographie",
    summary: "Repérer et situer un élément dans un ensemble, trier et ranger des objets selon un critère.",
    lessons: [
      {
        title: "Situer un objet",
        body: `<p>Pour dire où se trouve un objet, on utilise des mots de <strong>position</strong>.</p>
          ${figure(schema("cp-entre", "Un crayon, un cahier et un ballon sur une étagère."), "Le cahier est <strong>entre</strong> le crayon et le ballon.")}
          <h2>Je découvre</h2>
          ${bullets(["Le livre est <strong>à côté de</strong> la trousse.", "La gomme est <strong>entre</strong> le crayon et la règle.", "La lampe est <strong>au-dessus de</strong> la table.", "L’école est <strong>loin de</strong> la gare, mais <strong>près de</strong> la mosquée."])}
          ${keyPoint("À côté de, entre, devant, derrière, au-dessus de, près de et loin de servent à situer.")}
          ${practice(["Cache un objet dans la pièce et guide un adulte avec des mots de position."])}`,
      },
      {
        title: "Trier et ranger",
        body: `<p><strong>Trier</strong>, c’est mettre ensemble les objets qui se ressemblent. <strong>Ranger</strong>, c’est les mettre dans un ordre.</p>
          ${figure(schema("cp-trier", "Deux ensembles : A des fruits, B des affaires d’école."), "On a <strong>trié</strong> : dans A les fruits, dans B les affaires d’école.")}
          <h2>Je découvre</h2>
          ${bullets(["Trier selon la couleur, la matière, l’usage ou la taille.", "Ranger du plus grand au plus petit, du plus lourd au plus léger, du plus long au plus court."])}
          ${keyPoint("Pour trier, je choisis un critère ; pour ranger, je choisis un ordre.")}
          ${practice(["Trie le matériel de ta trousse selon l’usage, puis range les crayons du plus long au plus court."])}`,
      },
    ],
  },
  {
    title: "Géographie : estimer et mesurer des distances",
    strand: "Géographie",
    summary: "Estimer et comparer des distances, puis les mesurer avec le pas, l’empan ou le mètre.",
    lessons: [
      {
        title: "Loin, proche, plus loin",
        body: `<p>Une <strong>distance</strong> est l’espace entre deux endroits.</p>
          ${figure(schema("cp-distances", "Une maison et deux arbres A et B, reliés à elle par des pointillés."), "L’arbre A est <strong>proche</strong> de la maison, l’arbre B est <strong>plus loin</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["La boutique est <strong>proche</strong> : on y va vite à pied.", "Le marché est <strong>plus loin</strong> que la boutique.", "Le chemin de l’école est <strong>plus long</strong> que celui de la mosquée."])}
          ${keyPoint("Pour comparer deux distances, j’utilise plus loin que, plus proche que, plus long que.")}
          ${practice(["Classe ces lieux du plus proche au plus loin de ta maison : l’école, la boutique, le marché."])}`,
      },
      {
        title: "Mesurer une distance",
        body: `<p>On peut mesurer une distance avec des <strong>unités naturelles</strong> (pas, pied, empan, coudée) ou avec un <strong>mètre</strong>.</p>
          ${figure(schema("cp-pas", "Une bande mesurée avec un mètre posé 5 fois."), "On pose le mètre 5 fois, bout à bout : la longueur est de <strong>5 mètres</strong>.")}
          <h2>Je découvre</h2>
          <p>De la porte de la classe au bureau du maître, Awa compte 12 pas. Avec le mètre, on trouve 9 mètres.</p>
          ${keyPoint("J’estime d’abord une distance, puis je la mesure pour vérifier.")}
          ${practice(["Estime puis mesure en pas la distance entre ta maison et l’arbre le plus proche.", "Mesure ton saut en longueur avec un mètre ruban."])}`,
      },
    ],
  },

  // ── Initiation scientifique et technologique ─────────────────────────────
  {
    title: "Sciences : outils et objets techniques",
    strand: "Initiation scientifique et technologique",
    summary: "Choisir l’outil adapté à une tâche, utiliser et entretenir un objet technique.",
    lessons: [
      {
        title: "Le bon outil pour chaque tâche",
        body: `<p>Chaque <strong>outil</strong> sert à faire un travail précis.</p>
          ${figure(row(pic("marteau", "le marteau : enfoncer un clou", 56), pic("ciseaux", "les ciseaux : couper", 44), pic("pelle", "la pelle : creuser", 70), pic("balai", "le balai : balayer", 70)), "Chaque <strong>outil</strong> sert à un travail précis.")}
          <h2>Je découvre</h2>
          ${bullets(["Le marteau enfonce un clou.", "Les ciseaux coupent une feuille.", "La pelle creuse un trou.", "Le stylo sert à écrire ; le balai à nettoyer."])}
          ${keyPoint("Avant de commencer un travail, je choisis l’outil adapté et je l’utilise prudemment.")}
          ${practice(["Associe chaque tâche à un outil : arroser, couper du tissu, balayer la cour."])}`,
      },
      {
        title: "Utiliser et entretenir un objet",
        body: `<p>Un objet bien entretenu dure plus longtemps.</p>
          ${figure(row(pic("velo", "je graisse la chaîne du vélo", 50), pic("cartable", "je range mon cartable", 56)), "Un objet bien <strong>entretenu</strong> dure plus longtemps.")}
          <h2>Je découvre</h2>
          ${bullets(["On <strong>dépoussière</strong> la radio et la table.", "On <strong>lave</strong> les ustensiles après le repas.", "On <strong>graisse</strong> la chaîne du vélo pour qu’elle tourne bien."])}
          ${keyPoint("Nettoyer, laver, graisser : ce sont des techniques d’entretien.")}
          ${practice(["Avec un adulte, nettoie et range un objet de la maison : ton cartable, tes chaussures ou un jouet."])}`,
      },
    ],
  },
  {
    title: "Sciences : comprendre et fabriquer un objet",
    strand: "Initiation scientifique et technologique",
    summary: "Identifier les parties d’un objet technique et leur rôle, fabriquer un objet à partir d’un modèle avec du matériel de récupération.",
    lessons: [
      {
        title: "Les parties d’un objet",
        body: `<p>Un objet technique est fait de <strong>parties</strong> qui ont chacune un rôle.</p>
          ${figure(schema("cp-velo", "Un vélo avec le nom de ses parties : la selle, le guidon, la roue, la pédale."), "Chaque partie du vélo a un rôle : le guidon dirige, les pédales font avancer, la selle sert à s’asseoir.")}
          <h2>Je découvre</h2>
          ${bullets(["Le vélo : le guidon pour diriger, les pédales et la chaîne pour avancer, les roues pour rouler.", "La lampe de poche : le bouton pour allumer, les piles pour l’énergie, l’ampoule pour éclairer.", "La radio : le bouton pour le volume, l’antenne pour capter."])}
          ${keyPoint("Pour comprendre un objet, je nomme ses parties et je dis à quoi chacune sert.")}
          ${practice(["Observe un objet de la maison et nomme trois de ses parties avec leur rôle."])}`,
      },
      {
        title: "Fabriquer un jouet de récupération",
        body: `<p>Avec des objets usagés (boîtes de conserve, fil de fer, carton, bouts de tissu), on peut <strong>fabriquer</strong> des jouets.</p>
          ${figure(row(pic("jouet", "une voiture en fil de fer")), "Avec du fil de fer, des bouchons et un bâton, on fabrique une petite voiture.")}
          <h2>Je découvre</h2>
          ${bullets(["Une petite voiture en fil de fer, avec des roues en capsules.", "Une poupée en tissu.", "Un animal en carton."])}
          ${keyPoint("Je regarde bien le modèle, je prépare le matériel, puis je fabrique étape par étape. Un adulte m’aide pour couper ou plier le fil de fer.")}
          ${practice(["Avec un adulte, fabrique un jouet avec du matériel de récupération, puis présente-le."])}`,
      },
    ],
  },

  // ── Vivre dans son milieu ─────────────────────────────────────────────────
  {
    title: "Vivre dans son milieu : éviter les intoxications",
    strand: "Vivre dans son milieu",
    summary: "Reconnaître les produits d’entretien et les médicaments dangereux, et savoir se protéger des intoxications.",
    lessons: [
      {
        title: "Les produits d’entretien",
        body: `<p>Le savon, l’eau de Javel et les détergents servent à nettoyer, mais ils peuvent être <strong>dangereux</strong>.</p>
          ${figure(row(pic("javel", "l’eau de Javel", 80), pic("savon", "le savon", 44)), "Le dessin sur la bouteille veut dire <strong>danger</strong> : on ne boit pas, on ne touche pas, on range hors de portée.")}
          <h2>Je découvre</h2>
          ${bullets(["On peut s’intoxiquer en les respirant, en les avalant ou s’ils touchent la peau.", "Il ne faut jamais mettre de l’eau dans une bouteille qui a contenu un produit d’entretien."])}
          ${keyPoint("Je ne respire pas, je ne bois pas, je ne touche pas les produits d’entretien. On les range loin des aliments et hors de portée des enfants.")}
          ${practice(["Avec un adulte, repère où sont rangés les produits d’entretien chez toi : sont-ils hors de portée des petits ?"])}`,
      },
      {
        title: "Les médicaments",
        body: `<p>Les médicaments soignent quand le médecin ou l’infirmier les donne. Mal utilisés, ils peuvent <strong>empoisonner</strong>.</p>
          ${figure(row(pic("medicament", "les médicaments", 56), pic("maman", "un adulte les donne", 100)), "Seul un <strong>adulte</strong> donne un médicament, comme le soignant l’a dit.")}
          <h2>Je découvre</h2>
          ${bullets(["Les médicaments vendus dans la rue peuvent être faux ou abîmés.", "Un médicament périmé n’est plus bon.", "Prendre un médicament sans avis du médecin est dangereux."])}
          ${keyPoint("Je ne prends jamais un médicament seul : c’est un adulte qui me le donne, sur avis d’un soignant.")}
          ${practice(["Explique à un adulte pourquoi on ne doit pas acheter de médicaments dans la rue."])}`,
      },
    ],
  },
  {
    title: "Vivre dans son milieu : protéger l’environnement",
    strand: "Vivre dans son milieu",
    summary: "Reconnaître la saleté et la pollution, leurs causes et conséquences, et protéger les biens communs.",
    lessons: [
      {
        title: "Ordures et eaux usées",
        body: `<p>Les ordures et les eaux sales dans la rue <strong>salissent</strong> le quartier et donnent des maladies.</p>
          ${figure(row(pic("poubelle", "la poubelle", 70), pic("moustique", "l’eau sale attire les moustiques", 40)), "Les ordures vont à la poubelle ; l’eau sale dans la rue attire les moustiques.")}
          <h2>Je découvre</h2>
          ${bullets(["Causes : décharges sauvages, eaux usées versées dans la rue, déchets jetés par terre.", "Conséquences : mauvaises odeurs, moustiques, maladies.", "Solutions : jeter les ordures à la poubelle, utiliser les toilettes, planter des arbres."])}
          ${keyPoint("Un quartier propre protège la santé de tous.")}
          ${practice(["Participe avec ta famille au nettoyage devant la maison (set setal).", "Dessine une affiche pour garder l’école propre."])}`,
      },
      {
        title: "Protéger les biens communs",
        body: `<p>Les <strong>biens communs</strong> appartiennent à tout le monde : l’école, la fontaine, les arbres de la rue, les bancs du jardin public.</p>
          ${figure(row(pic("fontaine", "la fontaine", 80), pic("ecole", "l’école", 56), pic("arbre", "les arbres", 70)), "Ces <strong>biens communs</strong> appartiennent à tout le monde : on en prend soin.")}
          <h2>Je découvre</h2>
          ${bullets(["On ne fait pas de graffitis sur les murs.", "On ne casse pas les tables ni les robinets.", "On ne laisse pas les animaux abîmer les plantations."])}
          ${keyPoint("Les biens communs sont à nous tous : je les respecte et je les protège.")}
          ${practice(["Fais la liste des biens communs de ton quartier.", "Propose une action pour embellir ta classe ou ta cour."])}`,
      },
    ],
  },

  // ── Vivre ensemble ────────────────────────────────────────────────────────
  {
    title: "Vivre ensemble : respect et bonne conduite",
    strand: "Vivre ensemble",
    summary: "Se respecter et respecter les autres, se présenter et dire ses groupes, avoir de bons comportements et être solidaire.",
    lessons: [
      {
        title: "Se respecter et respecter les autres",
        body: `<p>Le respect commence par soi-même et continue avec les autres.</p>
          ${figure(row(pic("eleve-garcon", "Modou", 90), pic("papa", "un aîné", 100)), "Modou salue son aîné : c’est une marque de <strong>respect</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["Se respecter : prendre soin de son corps et de ses habits, bien parler.", "Respecter les autres : les aînés, les parents, les maîtres, l’adversaire au jeu, les personnes handicapées."])}
          ${keyPoint("Je parle poliment et je traite les autres comme j’aimerais être traité.")}
          ${practice(["Donne trois exemples de gestes de respect envers une personne âgée."])}`,
      },
      {
        title: "Mes groupes et la solidarité",
        body: `<p>Je fais partie de plusieurs <strong>groupes</strong> : ma famille, ma classe, mon école, mon équipe.</p>
          ${figure(row(pic("papa", "papa", 90), pic("maman", "maman", 90), pic("eleve-fille", "moi", 80), pic("maitresse", "la maîtresse", 90)), "Ma famille et ma classe sont des <strong>groupes</strong> : on s’entraide.")}
          <h2>Je découvre</h2>
          ${bullets(["Me présenter : prénom, nom, âge, adresse, classe et école.", "Bons comportements : ponctualité, assiduité, honnêteté, franchise.", "Solidarité : s’entraider, secourir, soutenir celui qui en a besoin."])}
          ${keyPoint("Être solidaire, c’est aider les membres de mon groupe et les autres.")}
          ${practice(["Présente-toi complètement à un adulte.", "Raconte une fois où tu as aidé quelqu’un."])}`,
      },
    ],
  },
  {
    title: "Vivre ensemble : règles et responsabilités",
    strand: "Vivre ensemble",
    summary: "Respecter le règlement intérieur, le code de la route et le code de l’hygiène, prendre des responsabilités.",
    lessons: [
      {
        title: "Les règles de la classe, de la rue et de l’hygiène",
        body: `<p>Les <strong>règles</strong> permettent de bien vivre ensemble et de rester en sécurité.</p>
          ${figure(row(pic("feu-tricolore", "au feu rouge, on attend", 80), pic("poubelle", "les déchets à la poubelle", 60), pic("savon", "on se lave les mains", 40)), "Des <strong>règles</strong> de la rue, de la classe et de l’hygiène.")}
          <h2>Je découvre</h2>
          ${bullets(["Le règlement intérieur de l’école : être à l’heure, respecter le matériel.", "Le code de la route : traverser au passage piéton, regarder à gauche puis à droite, marcher sur le trottoir.", "Le code de l’hygiène : ne pas jeter d’ordures ni d’eaux usées dans la rue."])}
          ${keyPoint("Pour traverser, je m’arrête, je regarde à gauche, à droite, puis encore à gauche, et je traverse sans courir.")}
          ${practice(["Avec un adulte, entraîne-toi à traverser une rue en toute sécurité."])}`,
      },
      {
        title: "Prendre des responsabilités",
        body: `<p>Chacun peut <strong>participer</strong> à la vie de la classe, de l’école et de la famille.</p>
          ${figure(row(pic("arrosoir", "arroser les plantes", 50), pic("balai", "balayer la classe", 76)), "Chacun a une tâche : arroser les plantes, balayer la classe…")}
          <h2>Je découvre</h2>
          ${bullets(["En classe : chef de rang, équipe de nettoyage, responsable du matériel.", "À l’école : la coopérative scolaire.", "À la maison : aider aux tâches, tenir ses engagements."])}
          ${keyPoint("Quand j’accepte une responsabilité, je tiens mon engagement jusqu’au bout.")}
          ${practice(["Choisis une tâche à faire chaque jour à la maison pendant une semaine."])}`,
      },
    ],
  },
];
