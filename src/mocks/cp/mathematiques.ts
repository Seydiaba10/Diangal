// Mathématiques du CP. Programme : Curriculum de l'Éducation de Base, guide pédagogique de
// l'étape 1 (CI-CP), MEN — paliers du CP en géométrie (lignes, itinéraires, traçage, figures),
// nombres (de 0 à 100, addition, soustraction avec et sans retenue, partage, multiplication par
// 2 et 3), mesure (longueurs, capacités, masses, durées, heure, monnaie) et résolution de
// problèmes (données, questions, démarche). Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";

export const MATH_CP: CiChapterSpec[] = [
  // ── Activités géométriques ────────────────────────────────────────────────
  {
    title: "Lignes, intérieur et extérieur",
    strand: "Activités géométriques",
    summary: "Tracer des lignes ouvertes et fermées, repérer l’intérieur, l’extérieur et la frontière, continuer des rythmes graphiques.",
    lessons: [
      {
        title: "Lignes ouvertes, lignes fermées, frontière",
        body: `<p>Une ligne <strong>fermée</strong> se referme sur elle-même ; une ligne <strong>ouverte</strong> a deux bouts.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Une ligne fermée sépare l’<strong>intérieur</strong> de l’<strong>extérieur</strong>.",
            "La ligne elle-même est la <strong>frontière</strong>.",
            "Exemple : le terrain de football. Le ballon est à l’intérieur, ou bien il est sorti à l’extérieur.",
          ])}
          ${keyPoint("Pour aller de l’intérieur à l’extérieur d’une ligne fermée, il faut traverser la frontière.")}
          ${practice(["Trace une ligne fermée sur une feuille. Dessine 3 points à l’intérieur et 2 points à l’extérieur.", "Dans la cour, trace un grand rond : saute à l’intérieur, puis à l’extérieur."])}`,
      },
      {
        title: "Les rythmes graphiques",
        body: `<p>Un <strong>rythme graphique</strong> est un dessin qui se répète toujours dans le même ordre.</p>
          <h2>Je découvre</h2>
          <p>Rond, trait, rond, trait… Deux carrés, un triangle, deux carrés, un triangle…</p>
          ${keyPoint("Pour continuer un rythme, je trouve le motif qui se répète, puis je le recopie dans le même ordre.")}
          ${practice(["Invente un rythme avec trois formes et demande à un adulte de le continuer.", "Décore le bord d’une feuille avec un rythme de couleurs."])}`,
      },
    ],
  },
  {
    title: "Quadrillages et itinéraires",
    strand: "Activités géométriques",
    summary: "Se repérer sur un quadrillage (lignes, nœuds, cases) et représenter un itinéraire avec un point de départ et un point d’arrivée.",
    lessons: [
      {
        title: "Se repérer sur un quadrillage",
        body: `<p>Un <strong>quadrillage</strong> est fait de lignes qui se croisent. Les points de croisement sont des <strong>nœuds</strong> ; les petits carrés sont des <strong>cases</strong>.</p>
          <h2>Je découvre</h2>
          <p>Sur un damier, on trouve une case avec sa <strong>ligne</strong> et sa <strong>colonne</strong> : « la case de la 2<sup>e</sup> ligne et de la 3<sup>e</sup> colonne ».</p>
          ${keyPoint("Pour décrire une case, je donne sa ligne et sa colonne ; pour un nœud, je donne les deux lignes qui se croisent.")}
          ${practice(["Sur ton cahier quadrillé, colorie la case de la 3e ligne et de la 2e colonne.", "Joue à cacher un caillou sous une case d’un damier : l’adulte doit deviner avec ligne et colonne."])}`,
      },
      {
        title: "Représenter un itinéraire",
        body: `<p>Un <strong>itinéraire</strong> est le chemin qu’on suit pour aller d’un <strong>point de départ</strong> à un <strong>point d’arrivée</strong>.</p>
          <h2>Je découvre</h2>
          <p>De la maison à l’école : je sors, je tourne à droite après la boutique, je passe devant la mosquée, puis l’école est à gauche.</p>
          ${keyPoint("Pour dessiner un itinéraire, je place le départ, l’arrivée et les repères, puis je trace le chemin dans l’ordre.")}
          ${practice(["Dessine le chemin de ta maison à l’école avec trois repères.", "Sur un quadrillage, trace un chemin : 3 cases à droite, 2 cases en haut."])}`,
      },
    ],
  },
  {
    title: "Tracer avec la règle",
    strand: "Activités géométriques",
    summary: "Utiliser la règle, le double décimètre et le crayon ; tracer des lignes droites, courbes et brisées ; faire des frises.",
    lessons: [
      {
        title: "Tracer à la règle",
        body: `<p>Pour tracer une <strong>ligne droite</strong>, on utilise une règle ou un double décimètre.</p>
          <h2>Je découvre</h2>
          ${bullets(["Je pose la règle à plat et je la tiens bien avec une main.", "Je trace avec un crayon bien taillé, le long de la règle, sans m’arrêter.", "Pour relier deux points, je place la règle contre les deux points avant de tracer."])}
          ${keyPoint("La main qui tient la règle appuie fort : la règle ne doit pas bouger pendant le tracé.")}
          ${practice(["Place deux points sur une feuille et relie-les à la règle.", "Trace un trait de la longueur de ta règle, puis un trait deux fois plus court."])}`,
      },
      {
        title: "Lignes droites, courbes et brisées",
        body: `<p>Il existe plusieurs sortes de lignes.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Une ligne <strong>droite</strong> ne tourne jamais : on la trace à la règle.",
            "Une ligne <strong>courbe</strong> est arrondie, comme une vague ou un serpent.",
            "Une ligne <strong>brisée</strong> est faite de morceaux droits qui changent de direction, comme les dents d’une scie.",
          ])}
          ${keyPoint("Une ligne brisée est faite de plusieurs lignes droites mises bout à bout.")}
          ${practice(["Trace une ligne droite, une ligne courbe et une ligne brisée, puis nomme-les.", "Cherche dans la maison un objet avec un bord droit et un objet avec un bord courbe."])}`,
      },
      {
        title: "Les frises",
        body: `<p>Une <strong>frise</strong> est une bande décorée avec un motif qui se répète.</p>
          <h2>Je découvre</h2>
          <p>Sur les pagnes, les tapis et les murs, on voit souvent des frises : triangles, losanges, vagues…</p>
          ${keyPoint("Pour faire une frise, je dessine un motif, puis je le répète à la même distance, tout le long de la bande.")}
          ${practice(["Sur ton cahier quadrillé, fais une frise avec un motif de 3 cases de large.", "Observe un pagne et dessine sa frise."])}`,
      },
    ],
  },
  {
    title: "Reproduire des figures planes",
    strand: "Activités géométriques",
    summary: "Reproduire et découper un carré, un rectangle, un triangle et un rond.",
    lessons: [
      {
        title: "Le carré et le rectangle",
        body: `<p>Le carré et le rectangle ont tous les deux <strong>4 côtés</strong> et <strong>4 coins</strong> bien droits.</p>
          <h2>Je découvre</h2>
          ${bullets(["Le <strong>carré</strong> a 4 côtés de la même longueur.", "Le <strong>rectangle</strong> a 2 grands côtés et 2 petits côtés."])}
          ${keyPoint("Sur un quadrillage, je reproduis un carré en comptant le même nombre de cases sur chaque côté.")}
          ${practice(["Sur ton cahier, trace un carré de 4 cases de côté et un rectangle de 6 cases sur 3.", "Découpe-les et compare-les."])}`,
      },
      {
        title: "Le triangle et le rond",
        body: `<p>Le <strong>triangle</strong> a 3 côtés et 3 coins. Le <strong>rond</strong> n’a ni côté droit ni coin.</p>
          <h2>Je découvre</h2>
          ${bullets(["Pour un triangle, je place 3 points et je les relie à la règle.", "Pour un rond, je fais le tour d’un objet rond : un verre, une boîte, une assiette."])}
          ${keyPoint("Un triangle a 3 côtés ; un rond se trace sans compas, en faisant le tour d’un objet rond.")}
          ${practice(["Trace et découpe deux triangles, puis assemble-les pour faire un carré ou un grand triangle.", "Trace des ronds de tailles différentes avec des objets de la cuisine."])}`,
      },
    ],
  },

  // ── Activités numériques ──────────────────────────────────────────────────
  {
    title: "Les nombres jusqu’à 20 (révision)",
    strand: "Activités numériques",
    summary: "Écrire, comparer et calculer avec les nombres de 0 à 20.",
    lessons: [
      {
        title: "Écrire et ranger les nombres jusqu’à 20",
        body: `<p>Tu connais déjà les nombres de 0 à 20. On les révise.</p>
          <h2>Je relis</h2>
          ${bullets([
            "En chiffres : 0, 1, 2, 3… 10, 11, 12… 19, 20.",
            "En lettres : onze, douze, treize, quatorze, quinze, seize, dix-sept, dix-huit, dix-neuf, vingt.",
            "14, c’est 1 dizaine et 4 unités.",
          ])}
          ${keyPoint("Dans 14, le chiffre 1 compte les dizaines et le chiffre 4 compte les unités.")}
          ${practice(["Compte de 0 à 20, puis de 20 à 0.", "Écris en lettres : 12, 15, 17, 20."])}`,
      },
      {
        title: "Calculer jusqu’à 20",
        body: `<p>Additionner, c’est <strong>ajouter</strong> ; soustraire, c’est <strong>enlever</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets(["8 + 5 = 13 : je fais 8 + 2 = 10, puis 10 + 3 = 13.", "15 − 4 = 11.", "Le double de 6, c’est 6 + 6 = 12."])}
          ${keyPoint("Pour ajouter, je peux d’abord compléter jusqu’à 10, puis ajouter le reste.")}
          ${practice(["Calcule : 9 + 6, 7 + 8, 18 − 5, 20 − 10.", "Avec des cailloux, montre que 7 + 5 = 12."])}`,
      },
    ],
  },
  {
    title: "Les nombres de 21 à 50",
    strand: "Activités numériques",
    summary: "Découvrir les nombres de 21 à 50 : dizaines et unités, comparaison avec <, = et >, écritures additives.",
    lessons: [
      {
        title: "Dizaines et unités jusqu’à 50",
        body: `<p>On fait des <strong>paquets de 10</strong> : ce sont des dizaines. Ce qui reste, ce sont les unités.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "23 = 2 dizaines et 3 unités = 20 + 3 (vingt-trois).",
            "35 = 3 dizaines et 5 unités = 30 + 5 (trente-cinq).",
            "50 = 5 dizaines (cinquante).",
          ])}
          ${keyPoint("Dans un nombre à deux chiffres, le chiffre de gauche donne les dizaines, celui de droite les unités.")}
          ${practice(["Fais des paquets de 10 bâtonnets ou de 10 graines pour montrer 27, puis 42.", "Lis à voix haute : 31, 44, 29, 50."])}`,
      },
      {
        title: "Comparer : plus petit, égal, plus grand",
        body: `<p>Pour comparer deux nombres, on utilise les signes <strong>&lt;</strong>, <strong>=</strong> et <strong>&gt;</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets(["28 &lt; 34 : 28 est plus petit que 34 (2 dizaines, c’est moins que 3 dizaines).", "41 &gt; 39.", "25 = 20 + 5."])}
          ${keyPoint("Je compare d’abord les dizaines ; si elles sont pareilles, je compare les unités : 46 &gt; 43.")}
          ${practice(["Complète avec &lt;, = ou &gt; : 17 … 21 ; 38 … 35 ; 30 … 20 + 10.", "Range du plus petit au plus grand : 42, 24, 33, 19."])}`,
      },
      {
        title: "Composer et décomposer un nombre",
        body: `<p>Un nombre peut s’écrire de plusieurs façons, avec des additions : ce sont ses <strong>écritures additives</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets(["36 = 30 + 6.", "36 = 10 + 10 + 10 + 6.", "36 = 20 + 16."])}
          ${keyPoint("Décomposer un nombre en dizaines et unités aide à calculer : 36 = 30 + 6.")}
          ${practice(["Écris 47 de trois façons différentes.", "Avec des pièces de 10 F et de 1 F en papier, montre 28 F."])}`,
      },
    ],
  },
  {
    title: "Additionner et soustraire jusqu’à 50",
    strand: "Activités numériques",
    summary: "Comprendre le sens de l’addition et de la soustraction et poser les opérations.",
    lessons: [
      {
        title: "Le sens de l’addition et de la soustraction",
        body: `<p>Dans un problème, on choisit l’opération selon ce qui se passe.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "On <strong>ajoute</strong>, on réunit, on gagne → addition : « Awa a 12 billes, elle en gagne 7. » 12 + 7 = 19.",
            "On <strong>enlève</strong>, on donne, on perd → soustraction : « Il y a 25 mangues, on en mange 4. » 25 − 4 = 21.",
          ])}
          ${keyPoint("Ajouter → addition (+). Enlever → soustraction (−).")}
          ${practice(["Invente une histoire qui se calcule avec une addition, puis une avec une soustraction."])}`,
      },
      {
        title: "Poser une addition et une soustraction",
        body: `<p>Pour calculer avec de grands nombres, on <strong>pose</strong> l’opération en colonnes.</p>
          <h2>Je découvre</h2>
          <p>Pour 23 + 14 : je mets les unités sous les unités et les dizaines sous les dizaines. 3 + 4 = 7 unités ; 2 + 1 = 3 dizaines. Résultat : <strong>37</strong>.</p>
          <p>Pour 48 − 25 : 8 − 5 = 3 unités ; 4 − 2 = 2 dizaines. Résultat : <strong>23</strong>.</p>
          ${keyPoint("Je commence toujours par la colonne des unités, à droite.")}
          ${practice(["Pose et calcule : 31 + 16 ; 22 + 25 ; 47 − 13 ; 39 − 26."])}`,
      },
    ],
  },
  {
    title: "Calcul mental jusqu’à 50",
    strand: "Activités numériques",
    summary: "Reconnaître les nombres pairs et impairs, ajouter 2, 3, 5 ou 10, trouver le double et la moitié.",
    lessons: [
      {
        title: "Les nombres pairs et impairs",
        body: `<p>Un nombre est <strong>pair</strong> si on peut faire des paires sans qu’il reste d’objet. Sinon, il est <strong>impair</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets(["Nombres pairs : 0, 2, 4, 6, 8, 10, 12…", "Nombres impairs : 1, 3, 5, 7, 9, 11, 13…"])}
          ${keyPoint("Un nombre pair se termine par 0, 2, 4, 6 ou 8.")}
          ${practice(["Avec des graines, fais des paires pour 9, puis 14 : lequel est pair ?", "Dis si ces nombres sont pairs ou impairs : 21, 30, 46, 37."])}`,
      },
      {
        title: "Ajouter 2, 3, 5 ou 10",
        body: `<p>Ajouter 10, c’est ajouter une dizaine : le chiffre des dizaines augmente de 1.</p>
          <h2>Je découvre</h2>
          ${bullets(["24 + 10 = 34 ; 31 + 10 = 41.", "17 + 2 = 19 ; 25 + 3 = 28 ; 35 + 5 = 40."])}
          ${keyPoint("Quand j’ajoute 10, les unités ne changent pas : 26 + 10 = 36.")}
          ${practice(["Compte de 10 en 10 à partir de 3 : 3, 13, 23, 33, 43.", "Compte de 5 en 5 jusqu’à 50."])}`,
      },
      {
        title: "Doubles et moitiés",
        body: `<p>Le <strong>double</strong> d’un nombre, c’est ce nombre ajouté à lui-même. La <strong>moitié</strong>, c’est un partage en deux parts égales.</p>
          <h2>Je découvre</h2>
          ${bullets(["Le double de 15 est 30, car 15 + 15 = 30.", "La moitié de 20 est 10 ; la moitié de 40 est 20."])}
          ${keyPoint("Si le double de 12 est 24, alors la moitié de 24 est 12.")}
          ${practice(["Trouve le double de 5, 10, 20 et 25.", "Partage 16 cailloux en deux tas égaux : combien dans chaque tas ?"])}`,
      },
    ],
  },
  {
    title: "Les nombres de 51 à 79",
    strand: "Activités numériques",
    summary: "Lire et écrire les nombres de 51 à 79, calculer avec et sans retenue.",
    lessons: [
      {
        title: "Lire et écrire les nombres de 51 à 79",
        body: `<p>Après cinquante viennent soixante, puis soixante-dix.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "56 = 5 dizaines et 6 unités : cinquante-six.",
            "64 : soixante-quatre.",
            "Attention : 70 se dit <strong>soixante-dix</strong> (60 + 10), 71 <strong>soixante et onze</strong>, 75 <strong>soixante-quinze</strong> (60 + 15).",
          ])}
          ${keyPoint("De 70 à 79, on dit soixante, puis on compte de 10 à 19 : soixante-dix, soixante et onze… soixante-dix-neuf.")}
          ${practice(["Lis à voix haute : 58, 63, 70, 72, 77.", "Écris en chiffres : soixante-cinq, soixante-quatorze."])}`,
      },
      {
        title: "Additionner et soustraire avec une retenue",
        body: `<p>Quand les unités dépassent 9, on fait une <strong>retenue</strong> : 10 unités = 1 dizaine.</p>
          <h2>Je découvre</h2>
          <p>Pour 37 + 26 : 7 + 6 = 13. J’écris 3 et je retiens 1 dizaine. 3 + 2 + 1 = 6 dizaines. Résultat : <strong>63</strong>.</p>
          <p>Pour 52 − 18 : je ne peux pas faire 2 − 8. J’échange 1 dizaine contre 10 unités : 12 − 8 = 4 ; il reste 4 dizaines, 4 − 1 = 3. Résultat : <strong>34</strong>.</p>
          ${keyPoint("La retenue de l’addition s’ajoute à la colonne des dizaines.")}
          ${practice(["Pose et calcule : 28 + 35 ; 46 + 17 ; 61 − 24 ; 70 − 36."])}`,
      },
    ],
  },
  {
    title: "Partager et multiplier",
    strand: "Activités numériques",
    summary: "Partager équitablement et découvrir la multiplication par 2 et par 3.",
    lessons: [
      {
        title: "Le partage",
        body: `<p>Partager équitablement, c’est donner <strong>la même quantité</strong> à chacun.</p>
          <h2>Je découvre</h2>
          <p>On partage 12 bonbons entre 3 enfants : on distribue un bonbon à chacun, tour après tour. Chaque enfant reçoit <strong>4</strong> bonbons.</p>
          ${keyPoint("Dans un partage juste, chacun reçoit autant. On peut vérifier : 4 + 4 + 4 = 12.")}
          ${practice(["Partage 15 cailloux entre 3 personnes. Combien chacune en reçoit-elle ?", "Partage 10 mangues entre 2 enfants."])}`,
      },
      {
        title: "Multiplier par 2 et par 3",
        body: `<p>Quand on ajoute plusieurs fois le même nombre, on peut écrire une <strong>multiplication</strong>.</p>
          <h2>Je découvre</h2>
          ${bullets(["5 + 5 = 2 fois 5 = 2 × 5 = 10.", "4 + 4 + 4 = 3 fois 4 = 3 × 4 = 12."])}
          <p>La table de 2 : 2 × 1 = 2, 2 × 2 = 4, 2 × 3 = 6, 2 × 4 = 8, 2 × 5 = 10.</p>
          ${keyPoint("Multiplier par 2, c’est trouver le double. Le signe de la multiplication est ×.")}
          ${practice(["Combien de roues pour 4 vélos ? Écris l’addition et la multiplication.", "Récite la table de 2 jusqu’à 2 × 10."])}`,
      },
    ],
  },
  {
    title: "Les nombres jusqu’à 100",
    strand: "Activités numériques",
    summary: "Lire et écrire les nombres de 80 à 99, découvrir 100 et la centaine.",
    lessons: [
      {
        title: "Les nombres de 80 à 99",
        body: `<p>80 se dit <strong>quatre-vingts</strong> (4 fois 20).</p>
          <h2>Je découvre</h2>
          ${bullets(["81 : quatre-vingt-un ; 85 : quatre-vingt-cinq.", "90 : quatre-vingt-dix (80 + 10) ; 95 : quatre-vingt-quinze ; 99 : quatre-vingt-dix-neuf."])}
          ${keyPoint("De 90 à 99, on dit quatre-vingt, puis on compte de 10 à 19.")}
          ${practice(["Lis à voix haute : 82, 88, 91, 96.", "Écris en chiffres : quatre-vingt-sept, quatre-vingt-treize."])}`,
      },
      {
        title: "Le nombre 100 : la centaine",
        body: `<p>Quand on a 10 dizaines, on a <strong>une centaine</strong> : c’est le nombre <strong>100</strong> (cent).</p>
          <h2>Je découvre</h2>
          ${bullets(["99 + 1 = 100.", "100 = 10 dizaines = 10 paquets de 10.", "90 + 10 = 100 ; 50 + 50 = 100."])}
          ${keyPoint("100 s’écrit avec trois chiffres : 1 centaine, 0 dizaine, 0 unité.")}
          ${practice(["Fais 10 paquets de 10 graines : combien de graines en tout ?", "Compte de 10 en 10 jusqu’à 100."])}`,
      },
    ],
  },

  // ── Activités de mesure ───────────────────────────────────────────────────
  {
    title: "Mesurer des longueurs",
    strand: "Activités de mesure",
    summary: "Comparer des longueurs avec le pas, le pied, l’empan ou une ficelle, puis mesurer avec le mètre et le double décimètre.",
    lessons: [
      {
        title: "Mesurer avec son corps",
        body: `<p>Avant les instruments, on mesurait avec son corps : le <strong>pas</strong>, le <strong>pied</strong>, l’<strong>empan</strong> (la main ouverte), la <strong>coudée</strong>.</p>
          <h2>Je découvre</h2>
          <p>La table mesure 6 empans pour Awa, mais 5 empans pour son père : sa main est plus grande !</p>
          ${keyPoint("Avec le corps, les mesures changent d’une personne à l’autre. C’est pourquoi on a inventé le mètre.")}
          ${practice(["Mesure ta chambre en pas, puis demande à un adulte de la mesurer en pas : comparez.", "Mesure ton cahier en empans."])}`,
      },
      {
        title: "Le mètre et le double décimètre",
        body: `<p>Le <strong>mètre</strong> (m) sert à mesurer de grandes longueurs. Le <strong>double décimètre</strong> (la règle de 20 cm) mesure les petites.</p>
          <h2>Je découvre</h2>
          ${bullets(["Une porte mesure environ 2 m de haut.", "Un crayon mesure environ 15 cm.", "Je pose le 0 de la règle au bout de l’objet, puis je lis le nombre à l’autre bout."])}
          ${keyPoint("Pour mesurer à la règle, je commence toujours au 0.")}
          ${practice(["Mesure ton crayon, ta gomme et ton cahier avec la règle.", "Avec un mètre ruban, mesure la longueur d’une table."])}`,
      },
    ],
  },
  {
    title: "Mesurer des capacités",
    strand: "Activités de mesure",
    summary: "Comparer des contenances avec une bouteille ou une tasse, puis utiliser le litre, le demi-litre et le quart de litre.",
    lessons: [
      {
        title: "Comparer des contenances",
        body: `<p>La <strong>capacité</strong> d’un récipient, c’est la quantité de liquide qu’il peut contenir.</p>
          <h2>Je découvre</h2>
          <p>Pour remplir un seau, il faut 8 tasses d’eau ; pour remplir une bouteille, il en faut 3. Le seau contient <strong>plus</strong> que la bouteille.</p>
          ${keyPoint("Pour comparer deux récipients, je les remplis avec la même petite mesure et je compte.")}
          ${practice(["Combien de verres faut-il pour remplir une grande bouteille ? Essaie avec un adulte."])}`,
      },
      {
        title: "Le litre, le demi-litre et le quart de litre",
        body: `<p>On mesure les liquides en <strong>litres</strong> (L).</p>
          <h2>Je découvre</h2>
          ${bullets(["Une bouteille d’eau de 1 L.", "Un demi-litre, c’est la moitié d’un litre : 2 demi-litres = 1 L.", "Un quart de litre : 4 quarts de litre = 1 L."])}
          ${keyPoint("1 litre = 2 demi-litres = 4 quarts de litre.")}
          ${practice(["Cherche à la maison des bouteilles de 1 L et de ½ L : lis leurs étiquettes.", "Avec deux bouteilles de ½ L, remplis une bouteille de 1 L."])}`,
      },
    ],
  },
  {
    title: "Mesurer des masses",
    strand: "Activités de mesure",
    summary: "Comparer des masses, puis peser avec le kilogramme, le demi-kilogramme et le quart de kilogramme.",
    lessons: [
      {
        title: "Lourd ou léger : comparer des masses",
        body: `<p>Pour comparer des masses, on soupèse dans ses mains ou on utilise une <strong>balance</strong>.</p>
          <h2>Je découvre</h2>
          <p>Sur une balance à deux plateaux, le côté le plus lourd descend. Si les plateaux sont au même niveau, les deux objets ont la même masse.</p>
          ${keyPoint("Un gros objet n’est pas toujours le plus lourd : il faut peser pour savoir.")}
          ${practice(["Avec un cintre et deux sachets, fabrique une balance et compare deux fruits."])}`,
      },
      {
        title: "Le kilogramme",
        body: `<p>On mesure les masses en <strong>kilogrammes</strong> (kg). Au marché, on achète le riz, le sucre ou les oignons au kilo.</p>
          <h2>Je découvre</h2>
          ${bullets(["1 kg de riz.", "Un demi-kilogramme : la moitié d’un kilo ; 2 demi-kilos = 1 kg.", "Un quart de kilogramme : 4 quarts = 1 kg."])}
          ${keyPoint("1 kg = 2 demi-kilogrammes = 4 quarts de kilogramme.")}
          ${practice(["Au marché ou à la boutique, regarde comment le vendeur pèse.", "Lis la masse écrite sur un paquet de sucre ou de farine."])}`,
      },
    ],
  },
  {
    title: "Le temps : calendrier et heure",
    strand: "Activités de mesure",
    summary: "Comparer des durées, se repérer dans la semaine, le mois et l’année, lire l’heure.",
    lessons: [
      {
        title: "La semaine, le mois et l’année",
        body: `<p>Le <strong>calendrier</strong> montre les jours, les semaines et les mois de l’année.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Une semaine a 7 jours : lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.",
            "Une année a 12 mois : janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre.",
            "Au Sénégal, il y a la saison sèche et la saison des pluies (l’hivernage).",
          ])}
          ${keyPoint("7 jours font une semaine ; 12 mois font une année.")}
          ${practice(["Sur un calendrier, entoure ton anniversaire et le jour d’aujourd’hui.", "Récite les jours de la semaine, puis les mois de l’année."])}`,
      },
      {
        title: "Lire l’heure",
        body: `<p>Sur une horloge, la <strong>petite aiguille</strong> montre les heures ; la <strong>grande aiguille</strong> montre les minutes.</p>
          <h2>Je découvre</h2>
          ${bullets([
            "Quand la grande aiguille est sur le 12, c’est une heure juste : 8 heures, 10 heures.",
            "Quand la grande aiguille est sur le 6, c’est la demie : 8 heures et demie.",
            "Une heure dure 60 minutes.",
          ])}
          ${keyPoint("Je regarde d’abord la petite aiguille (l’heure), puis la grande (les minutes).")}
          ${practice(["Regarde une montre à l’heure du repas et dis l’heure à un adulte.", "Dessine une horloge qui montre 7 heures."])}`,
      },
    ],
  },
  {
    title: "La monnaie",
    strand: "Activités de mesure",
    summary: "Reconnaître les pièces de 5, 10, 25, 50 et 100 francs, payer et rendre la monnaie.",
    lessons: [
      {
        title: "Les pièces jusqu’à 100 francs",
        body: `<p>Au Sénégal, la monnaie est le <strong>franc CFA</strong> (F CFA).</p>
          <h2>Je découvre</h2>
          ${bullets(["Les pièces de 5 F, 10 F, 25 F, 50 F et 100 F.", "100 F = 2 pièces de 50 F = 4 pièces de 25 F = 10 pièces de 10 F."])}
          ${keyPoint("On peut faire la même somme avec des pièces différentes : 50 F = 25 F + 25 F = 5 pièces de 10 F.")}
          ${practice(["Avec des pièces en carton, montre 75 F de deux façons différentes.", "Range les pièces de la plus petite valeur à la plus grande."])}`,
      },
      {
        title: "Payer et rendre la monnaie",
        body: `<p>Quand on paie avec une pièce plus grande que le prix, le vendeur <strong>rend la monnaie</strong>.</p>
          <h2>Je découvre</h2>
          <p>Un jus en sachet coûte 75 F. Je donne 100 F. Le vendeur me rend 100 − 75 = <strong>25 F</strong>.</p>
          ${keyPoint("Monnaie rendue = somme donnée − prix.")}
          ${practice(["Joue à la boutique avec un adulte : achète des objets à 30 F, 45 F, 60 F avec une pièce de 100 F.", "Combien rend-on sur 50 F pour un achat de 35 F ?"])}`,
      },
    ],
  },

  // ── Résolution de problèmes ───────────────────────────────────────────────
  {
    title: "Les données d’un problème",
    strand: "Résolution de problèmes",
    summary: "Repérer les données d’un énoncé : numériques ou non, utiles, inutiles ou manquantes.",
    lessons: [
      {
        title: "Données utiles et données inutiles",
        body: `<p>Les <strong>données</strong> sont les informations de l’énoncé. Certaines servent à répondre, d’autres non.</p>
          <h2>Je découvre</h2>
          <p>« Jean a 8 ans. Il a 25 billes. Il en perd 10. Combien lui en reste-t-il ? »</p>
          ${bullets(["Données utiles : 25 billes, il en perd 10.", "Donnée inutile ici : Jean a 8 ans."])}
          ${keyPoint("Avant de calculer, je souligne les données utiles et je barre les données inutiles.")}
          ${practice(["Invente un problème avec une donnée inutile et demande à un adulte de la trouver."])}`,
      },
      {
        title: "La donnée qui manque",
        body: `<p>Parfois, il manque une donnée : on ne peut pas répondre à la question.</p>
          <h2>Je découvre</h2>
          <p>« Fatou va à la boutique avec 100 F. Elle achète des allumettes. Combien lui reste-t-il ? » Il manque le <strong>prix</strong> des allumettes !</p>
          ${keyPoint("Si je ne peux pas calculer, je cherche la donnée qui manque.")}
          ${practice(["Complète le problème de Fatou avec un prix, puis résous-le."])}`,
      },
    ],
  },
  {
    title: "Les questions d’un problème et la démarche",
    strand: "Résolution de problèmes",
    summary: "Distinguer la question finale et les questions intermédiaires, construire un énoncé et résoudre étape par étape.",
    lessons: [
      {
        title: "Question finale et questions intermédiaires",
        body: `<p>La <strong>question finale</strong> est la dernière question du problème. Pour y répondre, on passe parfois par des <strong>questions intermédiaires</strong>.</p>
          <h2>Je découvre</h2>
          <p>« Awa achète 2 cahiers à 50 F. Elle donne 200 F. Combien lui rend-on ? »</p>
          ${bullets(["Question intermédiaire : combien coûtent les 2 cahiers ? → 50 + 50 = 100 F.", "Question finale : combien lui rend-on ? → 200 − 100 = 100 F."])}
          ${keyPoint("Je résous les questions dans l’ordre : d’abord les questions intermédiaires, puis la question finale.")}
          ${practice(["Trouve la question intermédiaire : « 3 enfants ont chacun 10 F. Ils achètent un ballon à 25 F. Combien leur reste-t-il ? »"])}`,
      },
      {
        title: "Inventer un problème et le résoudre",
        body: `<p>Pour bien comprendre les problèmes, on apprend aussi à en <strong>inventer</strong>.</p>
          <h2>Je découvre</h2>
          <p>« Pendant la récréation, Jean avait 25 billes. À la fin du jeu, il lui en reste 10. » Je peux poser la question : « Combien de billes Jean a-t-il perdues ? » → 25 − 10 = <strong>15</strong>.</p>
          ${keyPoint("Ma démarche : je lis, je trouve les données utiles, je choisis l’opération, je calcule, puis j’écris une phrase réponse.")}
          ${practice(["Invente un problème sur le marché avec une question finale, puis résous-le avec un adulte."])}`,
      },
    ],
  },
];
