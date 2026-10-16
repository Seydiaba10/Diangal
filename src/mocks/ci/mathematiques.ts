// Mathématiques du CI. Programme : Curriculum de l'Éducation de Base, guide pédagogique de
// l'étape 1 (CI-CP), MEN — paliers 1 à 3 de chaque activité (géométrie, nombres, mesure,
// résolution de problèmes) ; nombres de 0 à 20 au CI. Leçons rédigées par DIANGAL, à faire
// valider par un enseignant.

import { bullets, type CiChapterSpec, keyPoint, practice } from "./blocks";

export const MATH_CI: CiChapterSpec[] = [
  // ── Palier 1 ──────────────────────────────────────────────────────────────
  {
    title: "Se repérer dans l’espace",
    strand: "Activités géométriques",
    summary: "Devant, derrière, sur, sous, à droite, à gauche, près, loin : dire où sont les choses.",
    lessons: [
      {
        title: "Devant, derrière, sur, sous",
        body: `<p>Pour dire où se trouve un objet, on utilise des petits mots de position.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Le cartable est <strong>sur</strong> la table.",
            "Le chat dort <strong>sous</strong> la table.",
            "Awa est assise <strong>devant</strong> Moussa.",
            "Moussa est assis <strong>derrière</strong> Awa.",
          ])}
          ${keyPoint("<strong>Sur</strong> et <strong>sous</strong> sont contraires. <strong>Devant</strong> et <strong>derrière</strong> sont contraires.")}
          ${practice([
            "Pose un crayon sur ton cahier, puis sous ton cahier. Dis à chaque fois où il est.",
            "Dans la file, dis qui est devant toi et qui est derrière toi.",
          ])}`,
      },
      {
        title: "À droite, à gauche, près, loin",
        body: `<p>Ta main droite et ta main gauche t’aident à te repérer.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Lève ta main <strong>droite</strong>, puis ta main <strong>gauche</strong>.",
            "Le tableau est <strong>près</strong> du maître. La porte de la cour est <strong>loin</strong> de ta table.",
            "Ce qui est <strong>en haut</strong> est au-dessus ; ce qui est <strong>en bas</strong> est en dessous.",
          ])}
          ${keyPoint("À droite et à gauche dépendent de la personne qui regarde : on se repère avec ses propres mains.")}
          ${practice([
            "Jeu du miroir : l’adulte dit « main droite sur la tête », « pied gauche en avant »…",
            "Range trois objets : un près de toi, un loin de toi, un en haut d’une étagère.",
          ])}`,
      },
      {
        title: "Avant, au même niveau, après",
        body: `<p>Dans une file ou sur une ligne, chacun a une place.</p>
          <h2>Je découvre</h2>
          <p>Dans la file pour entrer en classe : Fatou passe <strong>avant</strong> Ali, Ali passe <strong>après</strong> Fatou. Deux enfants côte à côte sont <strong>au même niveau</strong>.</p>
          ${keyPoint("Avant, après et au même niveau servent à dire l’ordre et la place.")}
          ${practice([
            "Aligne cinq objets. Dis quel objet est avant la gomme et quel objet est après.",
            "Dessine un chemin vers l’école et place, dans l’ordre, la maison, la boutique et l’école.",
          ])}`,
      },
    ],
  },
  {
    title: "Les ensembles",
    strand: "Activités numériques",
    summary: "Regrouper des objets, comparer des collections : peu, beaucoup, plus que, moins que, autant que.",
    lessons: [
      {
        title: "Former un ensemble",
        body: `<p>Un <strong>ensemble</strong>, c’est un groupe d’objets qui vont ensemble. On l’entoure d’une ligne fermée.</p>
          <h2>Je découvre</h2>
          <p>Dans la cour, on entoure les ballons : c’est l’ensemble des ballons. Une mangue n’est pas un ballon : elle n’<strong>appartient pas</strong> à cet ensemble.</p>
          ${keyPoint("Un objet <strong>appartient</strong> à un ensemble s’il est à l’intérieur de la ligne. Sinon, il n’appartient pas à l’ensemble.")}
          ${practice([
            "Sur une feuille, dessine des fruits et des jouets. Entoure les fruits en vert et les jouets en bleu.",
            "Dans l’ensemble des fruits, entoure encore les mangues : c’est un ensemble plus petit dans le grand.",
          ])}`,
      },
      {
        title: "Peu, beaucoup, rien",
        body: `<p>On peut dire si un ensemble a beaucoup ou peu d’objets, même sans compter.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Un sac de riz contient <strong>beaucoup</strong> de grains.",
            "Dans ta trousse, il y a <strong>peu</strong> de crayons.",
            "Une boîte vide ne contient <strong>rien</strong> : c’est un ensemble vide.",
          ])}
          ${keyPoint("Beaucoup, peu et rien disent la quantité.")}
          ${practice([
            "Mets beaucoup de cailloux dans un pot et peu de cailloux dans un autre. Montre lequel a beaucoup de cailloux.",
            "Classe des objets selon leur couleur ou leur forme, puis dis comment tu as choisi.",
          ])}`,
      },
      {
        title: "Plus que, moins que, autant que",
        body: `<p>Pour comparer deux ensembles, on relie chaque objet de l’un à un objet de l’autre.</p>
          <h2>Je découvre</h2>
          <p>Sidi a 5 bonbons et Rama a 3 bonbons. On relie un bonbon de Sidi à un bonbon de Rama : il reste 2 bonbons à Sidi. Sidi a <strong>plus</strong> de bonbons que Rama. Rama a <strong>moins</strong> de bonbons que Sidi.</p>
          ${keyPoint("Si chaque objet a un partenaire et qu’il n’en reste aucun, les deux ensembles ont <strong>autant</strong> d’objets.")}
          ${practice([
            "Mets des verres et des cuillères sur la table. Pose une cuillère dans chaque verre : y a-t-il autant de cuillères que de verres ?",
            "Compare tes crayons avec ceux d’un frère ou d’une sœur : qui en a plus ?",
          ])}`,
      },
    ],
  },
  {
    title: "Longueurs, distances et quantités",
    strand: "Activités de mesure",
    summary: "Estimer et comparer des longueurs, des distances et des contenances sans instrument de mesure.",
    lessons: [
      {
        title: "Plus long, plus court",
        body: `<p>Pour savoir quel objet est le plus long, on les pose côte à côte, en partant du même point.</p>
          <h2>Je découvre</h2>
          <p>Le bâton de Moussa dépasse celui d’Awa : le bâton de Moussa est <strong>plus long</strong>, celui d’Awa est <strong>plus court</strong>.</p>
          ${keyPoint("Pour comparer deux longueurs, on aligne les objets au départ, puis on regarde lequel dépasse.")}
          ${practice([
            "Compare deux crayons, deux ficelles, deux bâtonnets : range-les du plus court au plus long.",
            "Trouve dans la maison un objet plus long que ton bras.",
          ])}`,
      },
      {
        title: "Plus près, plus loin",
        body: `<p>La distance, c’est le chemin entre deux endroits.</p>
          <h2>Je découvre</h2>
          <p>La boutique est à côté de la maison : elle est <strong>plus près</strong>. Le marché est au bout du quartier : il est <strong>plus loin</strong>.</p>
          ${keyPoint("Pour comparer deux distances sans instrument, on peut compter ses pas.")}
          ${practice([
            "Compte tes pas de la porte jusqu’au lit, puis jusqu’à la cuisine. Quel endroit est le plus près ?",
            "Lance un caillou, puis un autre : lequel est tombé le plus loin ?",
          ])}`,
      },
      {
        title: "Plus plein, moins plein",
        body: `<p>Un récipient peut contenir beaucoup ou peu de liquide : c’est sa <strong>contenance</strong>.</p>
          <h2>Je découvre</h2>
          <p>On remplit un seau avec des verres d’eau : il faut beaucoup de verres. Le seau contient <strong>plus</strong> d’eau que le verre. Le verre contient <strong>moins</strong> d’eau que le seau.</p>
          ${keyPoint("Pour comparer deux contenances, on transvase : on verse le contenu de l’un dans l’autre.")}
          ${practice([
            "Avec un adulte, remplis une bouteille avec un gobelet. Combien de gobelets faut-il ?",
            "Verse l’eau d’un bol dans un verre : déborde-t-elle ? Lequel contient le plus ?",
          ])}`,
      },
    ],
  },
  {
    title: "Observer une image",
    strand: "Résolution de problèmes",
    summary: "Chercher des indices, trouver l’intrus, remettre des images dans l’ordre, continuer un rythme, lire un tableau.",
    lessons: [
      {
        title: "Indices et intrus",
        body: `<p>Avant de résoudre un problème, il faut bien regarder. Une image donne des <strong>indices</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Sur une image de la classe, je cherche ce qui est utile : les élèves, les tables, le tableau.",
            "L’<strong>intrus</strong> est l’objet qui ne va pas avec les autres : une chèvre au milieu des fournitures scolaires.",
            "Parfois, quelque chose <strong>manque</strong> : une roue au vélo, une porte à la maison.",
          ])}
          ${keyPoint("J’observe d’abord en entier, puis je regarde chaque détail.")}
          ${practice([
            "Mets sur la table une cuillère, une fourchette, un couteau et une orange. Quel est l’intrus ?",
            "Dessine un visage sans nez : l’adulte doit trouver ce qui manque.",
          ])}`,
      },
      {
        title: "Mettre de l’ordre et continuer un rythme",
        body: `<p>Une histoire en images se lit dans l’ordre : ce qui se passe d’abord, ensuite, enfin.</p>
          <h2>Je découvre</h2>
          <p>On plante une graine, la plante pousse, puis elle donne une fleur : ces images ont un ordre.</p>
          <p>Un <strong>rythme</strong> se répète : rond, carré, rond, carré… La suite est : rond.</p>
          ${keyPoint("Pour continuer un rythme, je cherche le morceau qui se répète.")}
          ${practice([
            "Fais un collier de perles ou de capsules : rouge, bleu, rouge, bleu… et continue-le.",
            "Tape dans tes mains : deux coups, un coup, deux coups… et continue.",
          ])}`,
      },
      {
        title: "Lire un tableau",
        body: `<p>Un <strong>tableau à double entrée</strong> range des informations en lignes et en colonnes.</p>
          <h2>Je découvre</h2>
          <p>Sur chaque ligne, un enfant : Fatou, Doudou. Dans chaque colonne, un jouet : ballon, poupée, vélo. Une croix dans une case veut dire : « cet enfant a ce jouet ».</p>
          ${keyPoint("Pour lire une case, je suis la ligne avec un doigt et la colonne avec l’autre doigt : ils se rejoignent dans la case.")}
          ${practice([
            "Trace un tableau avec les prénoms de ta famille et trois fruits. Mets une croix pour le fruit que chacun aime.",
          ])}`,
      },
    ],
  },

  // ── Palier 2 ──────────────────────────────────────────────────────────────
  {
    title: "Les solides",
    strand: "Activités géométriques",
    summary: "Reconnaître, décrire et classer le cube, le pavé et le cylindre.",
    lessons: [
      {
        title: "Le cube, le pavé et le cylindre",
        body: `<p>Autour de nous, beaucoup d’objets ont la forme de <strong>solides</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Le <strong>cube</strong> : un dé à jouer. Toutes ses faces sont des carrés pareils.",
            "Le <strong>pavé</strong> : une boîte de craie ou une brique. Il ressemble au cube, mais il est plus allongé.",
            "Le <strong>cylindre</strong> : une boîte de conserve. Il roule, et ses deux bouts sont des ronds.",
          ])}
          ${keyPoint("Le cylindre roule ; le cube et le pavé ne roulent pas, ils glissent.")}
          ${practice([
            "Cherche dans la cuisine un objet en forme de cylindre et un objet en forme de pavé.",
            "Défais une boîte en carton : tu vois toutes ses faces à plat. Essaie de la remonter.",
          ])}`,
      },
    ],
  },
  {
    title: "Les figures planes",
    strand: "Activités géométriques",
    summary: "Reconnaître, décrire et classer le carré, le rectangle, le triangle et le rond.",
    lessons: [
      {
        title: "Carré, rectangle, triangle et rond",
        body: `<p>Une <strong>figure plane</strong> est toute plate : on peut la dessiner sur une feuille.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Le <strong>carré</strong> a 4 côtés de même longueur.",
            "Le <strong>rectangle</strong> a 4 côtés : 2 longs et 2 courts.",
            "Le <strong>triangle</strong> a 3 côtés.",
            "Le <strong>rond</strong> n’a pas de côté droit.",
          ])}
          ${keyPoint("Pour reconnaître une figure, je compte ses côtés.")}
          ${practice([
            "Pose un verre sur une feuille et fais le tour : quelle figure obtiens-tu ?",
            "Avec des bâtonnets, construis un triangle, puis un carré. Combien de bâtonnets pour chacun ?",
          ])}`,
      },
    ],
  },
  {
    title: "Les nombres de 0 à 5",
    strand: "Activités numériques",
    summary: "Découvrir 1, 2, 3, 4, 5 et 0 ; ranger les nombres avec les signes < et >.",
    lessons: [
      {
        title: "Les nombres 1, 2 et 3",
        body: `<p>Un nombre dit combien il y a d’objets.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "<strong>1</strong> (un) : une tête, un nez.",
            "<strong>2</strong> (deux) : deux yeux, deux mains.",
            "<strong>3</strong> (trois) : les trois pieds du foyer de la cuisine.",
          ])}
          ${keyPoint("Je dis le nombre, je montre autant de doigts et j’écris le chiffre : 1, 2, 3.")}
          ${practice([
            "Montre 2 doigts, puis 3 doigts. Fais des groupes de 1, 2 et 3 cailloux.",
            "Écris 1, 2 et 3 sur ton ardoise en commençant toujours par le haut.",
          ])}`,
      },
      {
        title: "Les nombres 4 et 5",
        body: `<p>Après 3 vient <strong>4</strong> (quatre), puis <strong>5</strong> (cinq) : les cinq doigts d’une main.</p>
          <h2>Je compare</h2>
          <p>5 est plus grand que 4 : on écrit <strong>5 &gt; 4</strong>. 4 est plus petit que 5 : on écrit <strong>4 &lt; 5</strong>.</p>
          ${keyPoint("La pointe du signe montre toujours le plus petit nombre.")}
          ${practice([
            "Compte les pattes d’une chèvre : combien y en a-t-il ?",
            "Avec des cailloux, fais un groupe de 4 et un groupe de 5. Place le bon signe entre les deux.",
          ])}`,
      },
      {
        title: "Le nombre 0",
        body: `<p>Quand il n’y a <strong>rien</strong>, on écrit <strong>0</strong> (zéro).</p>
          <h2>Je découvre</h2>
          <p>Il y avait 2 mangues dans le panier. Awa et Moussa en mangent une chacun : il reste 0 mangue. Le panier est vide.</p>
          ${keyPoint("0 est le plus petit des nombres : 0 &lt; 1 &lt; 2 &lt; 3 &lt; 4 &lt; 5.")}
          ${practice([
            "Récite les nombres de 0 à 5, puis de 5 à 0, comme une fusée qui décolle.",
            "Mets 3 objets dans une boîte, enlève-les un par un en disant combien il en reste, jusqu’à 0.",
          ])}`,
      },
    ],
  },
  {
    title: "Les nombres de 6 à 10",
    strand: "Activités numériques",
    summary: "Découvrir 6, 7, 8, 9 et 10, les composer et les décomposer ; découvrir la dizaine.",
    lessons: [
      {
        title: "Les nombres 6, 7 et 8",
        body: `<p>Avec une main entière et quelques doigts de l’autre main, on montre <strong>6</strong>, <strong>7</strong> et <strong>8</strong>.</p>
          <h2>Je compose et je décompose</h2>
          ${bullets(["6 = 5 + 1 = 4 + 2 = 3 + 3", "7 = 5 + 2 = 4 + 3 = 6 + 1", "8 = 5 + 3 = 4 + 4 = 6 + 2"])}
          ${keyPoint("Un même nombre peut s’écrire de plusieurs façons avec le signe +.")}
          ${practice([
            "Partage 6 cailloux entre deux pots de toutes les façons possibles. Dis chaque fois : 6, c’est … et …",
            "Range les nombres de 0 à 8 sur une bande de papier.",
          ])}`,
      },
      {
        title: "Le nombre 9",
        body: `<p>Après 8 vient <strong>9</strong> (neuf).</p>
          <h2>Je compose et je décompose</h2>
          ${bullets(["9 = 5 + 4", "9 = 8 + 1", "9 = 6 + 3"])}
          ${keyPoint("9 &gt; 8 et 9 &lt; 10.")}
          ${practice([
            "Compte 9 graines d’arachide en les déplaçant une par une.",
            "Écris les nombres de 0 à 9 sans en oublier.",
          ])}`,
      },
      {
        title: "Le nombre 10 et la dizaine",
        body: `<p>Avec les doigts de tes deux mains, tu montres <strong>10</strong> (dix).</p>
          <h2>Je découvre la dizaine</h2>
          <p>Quand on a 10 bâtonnets, on les attache avec un élastique : c’est <strong>une dizaine</strong>. 10, c’est 1 dizaine et 0 unité.</p>
          ${bullets(["10 = 5 + 5", "10 = 9 + 1", "10 = 8 + 2", "10 = 7 + 3", "10 = 6 + 4"])}
          ${keyPoint("10 unités font 1 dizaine.")}
          ${practice([
            "Fais des paquets de 10 bâtonnets ou de 10 capsules.",
            "L’adulte montre des doigts ; tu dis combien il en manque pour faire 10.",
          ])}`,
      },
    ],
  },
  {
    title: "Ajouter et enlever jusqu’à 10",
    strand: "Activités numériques",
    summary: "Comprendre le sens de l’addition et de la soustraction ; le double et la moitié.",
    lessons: [
      {
        title: "Ajouter : l’addition",
        body: `<p><strong>Ajouter</strong>, c’est mettre ensemble. On écrit le signe <strong>+</strong>.</p>
          <h2>Je découvre</h2>
          <p>Awa a 3 billes. Moussa lui en donne 2. Maintenant, elle a 3 + 2 = <strong>5</strong> billes.</p>
          ${keyPoint("Quand on ajoute, on obtient plus qu’avant.")}
          ${practice([
            "Mets 4 cailloux dans ta main, ajoute-en 2 : combien en as-tu ? Écris l’addition.",
            "Ajoute 2 à chaque nombre : 1, 3, 5, 6.",
          ])}`,
      },
      {
        title: "Enlever : la soustraction",
        body: `<p><strong>Enlever</strong>, c’est retirer. On écrit le signe <strong>−</strong>.</p>
          <h2>Je découvre</h2>
          <p>Il y a 7 oranges sur la table. Fatou en prend 3. Il en reste 7 − 3 = <strong>4</strong>.</p>
          ${keyPoint("Quand on enlève, il en reste moins qu’avant.")}
          ${practice([
            "Pose 8 objets, cache-en 2 sous un bol : combien en vois-tu encore ?",
            "Invente une petite histoire où l’on enlève quelque chose, et écris la soustraction.",
          ])}`,
      },
      {
        title: "Le double et la moitié",
        body: `<p>Le <strong>double</strong>, c’est deux fois le même nombre. La <strong>moitié</strong>, c’est partager en deux parts égales.</p>
          <h2>Je découvre</h2>
          ${bullets(["Le double de 3, c’est 3 + 3 = 6.", "Le double de 4, c’est 4 + 4 = 8.", "La moitié de 8, c’est 4 : on fait deux tas de 4."])}
          ${keyPoint("La moitié se trouve en partageant en deux tas pareils.")}
          ${practice([
            "Partage 10 bonbons entre deux enfants pour qu’ils en aient autant. Combien chacun ?",
            "Montre le même nombre de doigts sur chaque main : quel double obtiens-tu ?",
          ])}`,
      },
    ],
  },
  {
    title: "Lourd ou léger ?",
    strand: "Activités de mesure",
    summary: "Estimer et comparer des masses : plus lourd, plus léger, aussi lourd.",
    lessons: [
      {
        title: "Comparer des masses",
        body: `<p>Certains objets sont <strong>lourds</strong> : un sac de riz. D’autres sont <strong>légers</strong> : une plume.</p>
          <h2>Je découvre</h2>
          <p>Sur la balançoire, le côté qui descend porte l’enfant le plus lourd. Si la balançoire reste droite, les deux enfants sont <strong>aussi lourds</strong> l’un que l’autre.</p>
          ${keyPoint("Pour comparer deux masses, je prends un objet dans chaque main, ou j’utilise une balance.")}
          ${practice([
            "Prends une bouteille pleine et une bouteille vide : laquelle est la plus lourde ?",
            "Fabrique une balance avec un cintre et deux sachets, puis compare deux fruits.",
          ])}`,
      },
    ],
  },
  {
    title: "Comprendre un problème",
    strand: "Résolution de problèmes",
    summary: "Reconnaître un problème de mathématiques, ses données et sa question.",
    lessons: [
      {
        title: "Qu’est-ce qu’un problème ?",
        body: `<p>Un <strong>problème de mathématiques</strong> raconte une petite histoire avec des nombres et pose une question.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "« Moussa a 4 billes, il en gagne 3. Combien en a-t-il maintenant ? » : c’est un problème de mathématiques.",
            "« Moussa joue aux billes dans la cour. » : ce n’est pas un problème, il n’y a pas de question.",
          ])}
          ${keyPoint("Pour bien comprendre un problème, on peut le jouer, comme au théâtre.")}
          ${practice(["Joue le problème des billes avec de vrais objets, puis réponds à la question."])}`,
      },
      {
        title: "Les données et la question",
        body: `<p>Dans un problème, les <strong>données</strong> sont les informations utiles : souvent des nombres. La <strong>question</strong> dit ce qu’il faut chercher.</p>
          <h2>Je découvre</h2>
          <p>« Fatou a 5 mangues. Elle en donne 2 à sa sœur. Combien lui en reste-t-il ? »</p>
          ${bullets(["Les données : 5 mangues, 2 mangues données.", "La question : combien lui en reste-t-il ?"])}
          ${keyPoint("Je souligne les données et j’entoure la question.")}
          ${practice(["L’adulte lit un petit problème. Tu dis les données, puis la question."])}`,
      },
    ],
  },

  // ── Palier 3 ──────────────────────────────────────────────────────────────
  {
    title: "Lignes et chemins",
    strand: "Activités géométriques",
    summary: "Lignes ouvertes et fermées, intérieur et extérieur, quadrillage, tracer un itinéraire.",
    lessons: [
      {
        title: "Lignes ouvertes et lignes fermées",
        body: `<p>Une ligne <strong>fermée</strong> se rejoint : on ne peut pas sortir sans la traverser. Une ligne <strong>ouverte</strong> a deux bouts.</p>
          <h2>Je découvre</h2>
          <p>La clôture autour de la maison est une ligne fermée. La maison est à l’<strong>intérieur</strong>, la rue est à l’<strong>extérieur</strong>, et la clôture est la <strong>frontière</strong>.</p>
          ${keyPoint("Une ligne fermée sépare l’intérieur de l’extérieur.")}
          ${practice([
            "Trace une ligne fermée sur le sol avec une corde. Mets-toi dedans, puis dehors.",
            "Dessine des lignes ouvertes et des lignes fermées, et colorie l’intérieur des lignes fermées.",
          ])}`,
      },
      {
        title: "Le quadrillage",
        body: `<p>Un <strong>quadrillage</strong> est fait de lignes qui se croisent. Les petits carrés s’appellent des <strong>cases</strong> ; là où les lignes se croisent, ce sont des <strong>nœuds</strong>.</p>
          <h2>Je découvre</h2>
          <p>Sur un quadrillage, on avance d’une case vers le haut, le bas, la droite ou la gauche.</p>
          ${keyPoint("Pour décrire un déplacement, je compte les cases et je dis la direction.")}
          ${practice(["Sur ton cahier, pars d’une case et suis les consignes : 2 cases à droite, 1 case en haut. Où arrives-tu ?"])}`,
      },
      {
        title: "Tracer un itinéraire",
        body: `<p>Un <strong>itinéraire</strong> est un chemin pour aller d’un point de départ à un point d’arrivée.</p>
          <h2>Je découvre</h2>
          <p>Pour aller de la maison à l’école, Ali passe devant la boutique, puis tourne à droite après la mosquée. La boutique et la mosquée sont des <strong>repères</strong>.</p>
          ${keyPoint("Un bon itinéraire donne le départ, l’arrivée et des repères dans l’ordre.")}
          ${practice(["Dessine le chemin de ta maison à l’école avec 4 repères. Explique-le à un adulte."])}`,
      },
    ],
  },
  {
    title: "Les nombres de 11 à 20",
    strand: "Activités numériques",
    summary: "Découvrir les nombres de 11 à 20 avec les dizaines et les unités, les composer et les ranger.",
    lessons: [
      {
        title: "De 11 à 15",
        body: `<p>Après 10, on continue avec 1 dizaine et quelques unités.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "11 = 10 + 1 (onze)",
            "12 = 10 + 2 (douze)",
            "13 = 10 + 3 (treize)",
            "14 = 10 + 4 (quatorze)",
            "15 = 10 + 5 (quinze)",
          ])}
          ${keyPoint("Dans 13, le 1 est la dizaine et le 3 est le nombre d’unités.")}
          ${practice([
            "Avec un paquet de 10 bâtonnets et des bâtonnets seuls, montre 12, puis 15.",
            "Écris les nombres de 10 à 15, puis range-les du plus grand au plus petit.",
          ])}`,
      },
      {
        title: "De 16 à 20",
        body: `<p>On continue : <strong>16</strong> (seize), <strong>17</strong> (dix-sept), <strong>18</strong> (dix-huit), <strong>19</strong> (dix-neuf), <strong>20</strong> (vingt).</p>
          <h2>Je découvre</h2>
          ${bullets(["17 = 10 + 7", "19 = 10 + 9", "20 = 10 + 10 : deux dizaines"])}
          ${keyPoint("20, c’est 2 dizaines et 0 unité.")}
          ${practice([
            "Compte de 0 à 20, puis de 20 à 0.",
            "L’adulte dit un nombre entre 11 et 20 ; tu le montres avec des paquets de 10 et des bâtonnets seuls.",
          ])}`,
      },
    ],
  },
  {
    title: "Calculer jusqu’à 20",
    strand: "Activités numériques",
    summary: "Additionner et soustraire jusqu’à 20, ajouter 10, trouver le double et la moitié.",
    lessons: [
      {
        title: "Additions et soustractions jusqu’à 20",
        body: `<p>On utilise les dizaines pour calculer plus vite.</p>
          <h2>Je découvre</h2>
          ${bullets(["8 + 5 : je fais d’abord 8 + 2 = 10, puis 10 + 3 = 13.", "15 − 5 = 10", "18 − 3 = 15"])}
          ${keyPoint("Pour ajouter, je complète d’abord jusqu’à 10.")}
          ${practice([
            "Résous avec des objets : Moussa a 9 cahiers, on lui en donne 4. Combien en a-t-il ?",
            "Ajoute ou retire 2, 3 ou 5 à des nombres choisis par l’adulte.",
          ])}`,
      },
      {
        title: "Ajouter 10, doubles et moitiés",
        body: `<p>Ajouter <strong>10</strong> à un nombre plus petit que 10, c’est facile : on ajoute une dizaine.</p>
          <h2>Je découvre</h2>
          ${bullets(["10 + 4 = 14", "10 + 7 = 17", "Le double de 6, c’est 12.", "La moitié de 14, c’est 7."])}
          ${keyPoint("Le double de 10, c’est 20. La moitié de 20, c’est 10.")}
          ${practice([
            "Partage 16 graines en deux tas égaux : combien dans chaque tas ?",
            "Trouve le double de 5, de 8 et de 9.",
          ])}`,
      },
    ],
  },
  {
    title: "Le temps qui passe",
    strand: "Activités de mesure",
    summary: "Comparer des durées, repérer les moments de la journée et les jours de la semaine.",
    lessons: [
      {
        title: "C’est long ou c’est court ?",
        body: `<p>Certaines activités durent longtemps, d’autres très peu de temps.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Se laver les mains, c’est <strong>court</strong>.",
            "Une journée d’école, c’est <strong>long</strong>.",
            "Le lièvre court plus <strong>vite</strong> que la tortue : il arrive le premier.",
          ])}
          ${keyPoint("Pour comparer deux durées, on regarde ce qui finit le premier quand on commence en même temps.")}
          ${practice(["Fais une course jusqu’au mur avec quelqu’un. Qui a été le plus rapide ?"])}`,
      },
      {
        title: "Matin, midi, soir",
        body: `<p>La journée a des moments : le <strong>matin</strong>, <strong>midi</strong>, l’<strong>après-midi</strong> et le <strong>soir</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Le matin, je me réveille et je vais à l’école.",
            "À midi, je déjeune.",
            "Le soir, je dîne et je me couche.",
          ])}
          ${keyPoint("Les moments de la journée reviennent chaque jour, toujours dans le même ordre.")}
          ${practice(["Dessine ce que tu fais le matin, à midi et le soir, puis range tes dessins dans l’ordre."])}`,
      },
      {
        title: "Les jours de la semaine",
        body: `<p>Une semaine a <strong>7 jours</strong> : lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.</p>
          <h2>Je découvre</h2>
          <p>Après dimanche, une nouvelle semaine commence avec lundi.</p>
          ${keyPoint("Hier, c’est le jour d’avant. Demain, c’est le jour d’après.")}
          ${practice([
            "Récite les jours de la semaine avec un adulte.",
            "Dis quel jour nous sommes aujourd’hui, quel jour c’était hier et quel jour ce sera demain.",
          ])}`,
      },
    ],
  },
  {
    title: "Résoudre un petit problème",
    strand: "Résolution de problèmes",
    summary: "Trouver les données utiles, la question finale et les étapes pour répondre.",
    lessons: [
      {
        title: "Les données utiles",
        body: `<p>Un problème peut contenir des informations qui ne servent pas. Il faut trouver les <strong>données utiles</strong>.</p>
          <h2>Je découvre</h2>
          <p>« Ali a 7 ans. Il a 6 cahiers et sa sœur lui en donne 4. Combien de cahiers a-t-il ? »</p>
          ${bullets(["Utile : 6 cahiers et 4 cahiers.", "Inutile ici : l’âge d’Ali."])}
          ${keyPoint("Je garde seulement les nombres qui répondent à la question.")}
          ${practice(["Invente un problème avec une information inutile. L’adulte doit la retrouver."])}`,
      },
      {
        title: "La question et la réponse",
        body: `<p>Une fois la question trouvée, je calcule, puis j’écris une phrase réponse.</p>
          <h2>Je découvre</h2>
          <p>« Il y a 12 élèves dans la cour. 5 rentrent en classe. Combien en reste-t-il dans la cour ? »</p>
          <p>Je calcule : 12 − 5 = 7. Je réponds : <strong>Il reste 7 élèves dans la cour.</strong></p>
          ${keyPoint("Une bonne réponse reprend les mots de la question.")}
          ${practice(["Résous : Awa a 9 perles, elle en achète 6. Combien en a-t-elle ? Écris la phrase réponse."])}`,
      },
    ],
  },
];
