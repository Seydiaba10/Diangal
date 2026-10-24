import "server-only";

// Sujets blancs du BFEM rédigés par DIANGAL d'après le programme de 3e (24/10/2026) : mathématiques,
// français, sciences physiques, SVT, histoire-géographie et anglais. Ce ne sont PAS des sujets
// officiels ; questions et corrigés sont à faire relire par des enseignants.
// Corrigés inclus : ce fichier ne doit jamais atteindre le navigateur.

import { CHAPTERS_3E } from "../curriculum-3e";
import { buildMockExams, type MockExamSpec } from "../exercise-series";

const SPECS: MockExamSpec[] = [
  // ── Mathématiques ──────────────────────────────────────────────────────────
  {
    id: "bfem-blanc-1-maths",
    subject: "MATH",
    title: "BFEM blanc DIANGAL n°1 : mathématiques",
    durationMin: 90,
    parts: [
      {
        chapter: "Racine carrée",
        questions: [
          {
            num: "Activités numériques. On pose A = √50 − √18 + √8. Écris A sous la forme a√2 : quelle est la valeur de a ?",
            answer: 4,
            why: "√50 = 5√2, √18 = 3√2 et √8 = 2√2, donc A = (5 − 3 + 2)√2 = 4√2 : a = 4.",
          },
          {
            qcm: "Rendre rationnel le dénominateur de 3/√3 donne :",
            choices: ["3√3", "*√3", "1/3", "9"],
            why: "3/√3 = (3 × √3)/(√3 × √3) = 3√3/3 = √3.",
          },
        ],
      },
      {
        chapter: "Calcul algébrique",
        questions: [
          {
            qcm: "Développer et réduire (2x − 3)² donne :",
            choices: ["4x² − 9", "4x² + 12x + 9", "*4x² − 12x + 9", "2x² − 12x + 9"],
            why: "(a − b)² = a² − 2ab + b² avec a = 2x et b = 3 : 4x² − 12x + 9.",
          },
          {
            qcm: "Une factorisation de 9x² − 16 est :",
            choices: ["*(3x − 4)(3x + 4)", "(3x − 4)²", "(9x − 16)(9x + 16)", "(3x − 16)(3x + 1)"],
            why: "9x² − 16 = (3x)² − 4² : c’est une différence de deux carrés, a² − b² = (a − b)(a + b).",
          },
        ],
      },
      {
        chapter: "Équations et inéquations à une inconnue",
        questions: [
          {
            num: "Résous l’équation 3x − 7 = 2x + 5. Quelle est la valeur de x ?",
            answer: 12,
            why: "3x − 2x = 5 + 7, donc x = 12. Vérification : 3 × 12 − 7 = 29 et 2 × 12 + 5 = 29.",
          },
          {
            qcm: "L’ensemble des solutions de l’inéquation −2x + 6 > 0 est :",
            choices: ["]3 ; +∞[", "*]−∞ ; 3[", "]−∞ ; −3[", "[3 ; +∞["],
            why: "−2x > −6 ; en divisant par −2 (négatif), on change le sens : x < 3.",
          },
        ],
      },
      {
        chapter: "Équations et inéquations à deux inconnues",
        questions: [
          {
            num: "Résous le système x + y = 10 et x − y = 4. Quelle est la valeur de x ?",
            answer: 7,
            why: "En additionnant les deux équations : 2x = 14, donc x = 7, puis y = 10 − 7 = 3.",
          },
        ],
      },
      {
        chapter: "Applications affines",
        questions: [
          {
            num: "f est l’application affine définie par f(x) = 2x − 3. Calcule f(5).",
            answer: 7,
            why: "f(5) = 2 × 5 − 3 = 10 − 3 = 7.",
          },
          {
            num: "Une application affine g vérifie g(0) = 1 et g(2) = 7. Quel est son coefficient ?",
            answer: 3,
            why: "Le coefficient vaut (g(2) − g(0)) / (2 − 0) = (7 − 1) / 2 = 3. Donc g(x) = 3x + 1.",
          },
        ],
      },
      {
        chapter: "Statistique",
        questions: [
          {
            num: "Les notes de cinq élèves sont 8 ; 12 ; 10 ; 14 ; 11. Calcule la moyenne de cette série.",
            answer: 11,
            why: "Somme : 8 + 12 + 10 + 14 + 11 = 55 ; moyenne : 55 ÷ 5 = 11.",
          },
        ],
      },
      {
        chapter: "Relations trigonométriques",
        questions: [
          {
            num: "Activités géométriques. ABC est un triangle rectangle en A avec AB = 3 cm et AC = 4 cm. Calcule BC (en cm).",
            answer: 5,
            why: "D’après le théorème de Pythagore : BC² = AB² + AC² = 9 + 16 = 25, donc BC = 5 cm.",
          },
          {
            qcm: "Dans ce même triangle ABC rectangle en A, cos B est égal à :",
            choices: ["4/5", "3/4", "*3/5", "4/3"],
            why: "cos B = côté adjacent à B / hypoténuse = AB / BC = 3/5.",
          },
        ],
      },
      {
        chapter: "Vecteurs",
        questions: [
          {
            qcm: "Si les vecteurs AB et CD sont égaux, alors le quadrilatère ABDC est :",
            choices: ["*un parallélogramme", "un trapèze quelconque", "toujours un carré", "un triangle"],
            why: "Deux vecteurs égaux (même direction, même sens, même longueur) : ABDC est un parallélogramme (éventuellement aplati).",
          },
        ],
      },
      {
        chapter: "Repérage dans le plan",
        questions: [
          {
            num: "Dans un repère orthonormé, A(1 ; 2) et B(7 ; 10). Calcule la distance AB.",
            answer: 10,
            why: "AB = √((7 − 1)² + (10 − 2)²) = √(36 + 64) = √100 = 10.",
          },
          {
            qcm: "Les coordonnées du milieu I du segment [AB] sont :",
            choices: ["(3 ; 4)", "(8 ; 12)", "(6 ; 8)", "*(4 ; 6)"],
            why: "I((1 + 7)/2 ; (2 + 10)/2) = I(4 ; 6).",
          },
        ],
      },
      {
        chapter: "Angle inscrit et angle au centre",
        questions: [
          {
            num: "Dans un cercle de centre O, un angle inscrit et un angle au centre de 110° interceptent le même arc. Quelle est la mesure de l’angle inscrit, en degrés ?",
            answer: 55,
            why: "Un angle inscrit mesure la moitié de l’angle au centre qui intercepte le même arc : 110 ÷ 2 = 55°.",
          },
        ],
      },
      {
        chapter: "Géométrie dans l’espace",
        questions: [
          {
            num: "Calcule le volume d’un cylindre de rayon 2 cm et de hauteur 5 cm, en cm³ (prends π = 3,14).",
            answer: 62.8,
            why: "V = π × r² × h = 3,14 × 4 × 5 = 62,8 cm³.",
          },
        ],
      },
    ],
  },

  // ── Français ───────────────────────────────────────────────────────────────
  {
    id: "bfem-blanc-1-francais",
    subject: "FR",
    title: "BFEM blanc DIANGAL n°1 : français",
    durationMin: 60,
    parts: [
      {
        chapter: "Le récit",
        questions: [
          {
            qcm: "« Il était une fois, dans un village du Saloum, un pêcheur qui ne rentrait jamais bredouille. » Dans un récit, cette phrase appartient le plus souvent à :",
            choices: ["l’élément perturbateur", "*la situation initiale", "le dénouement", "une description de paysage"],
            why: "« Il était une fois » ouvre le récit : on présente le lieu, le personnage et sa situation avant tout événement.",
          },
          {
            qcm: "Dans un récit au passé, les actions de premier plan sont en général conjuguées au :",
            choices: ["*passé simple", "imparfait", "présent de vérité générale", "futur antérieur"],
            why: "Le passé simple raconte les actions successives ; l’imparfait sert à l’arrière-plan (décor, habitudes).",
          },
        ],
      },
      {
        chapter: "La description",
        questions: [
          {
            qcm: "« Le fleuve, large et paresseux, s’étirait sous un ciel blanc de chaleur. » Les mots « large » et « paresseux » sont :",
            choices: ["des adverbes", "*des adjectifs qualificatifs", "des verbes", "des noms communs"],
            why: "Ils qualifient le nom « fleuve » et s’accordent avec lui : ce sont des adjectifs qualificatifs (ici apposés).",
          },
          {
            vf: "Dans une description au passé, l’imparfait est souvent employé pour présenter le décor.",
            answer: true,
            why: "L’imparfait exprime ce qui dure, sans début ni fin précis : il convient au décor et aux portraits.",
          },
        ],
      },
      {
        chapter: "Le discours rapporté",
        questions: [
          {
            qcm: "Mets au discours indirect : Awa a dit : « Je viendrai demain. »",
            choices: [
              "Awa a dit qu’elle viendra demain.",
              "*Awa a dit qu’elle viendrait le lendemain.",
              "Awa a dit qu’elle venait hier.",
              "Awa a dit : elle viendrait le lendemain.",
            ],
            why: "Le verbe introducteur est au passé : le futur devient conditionnel (viendrait), « je » devient « elle » et « demain » devient « le lendemain ».",
          },
          {
            qcm: "Dans la phrase « Il cria qu’il avait faim », les paroles sont rapportées au discours :",
            choices: ["direct", "*indirect", "théâtral"],
            why: "Pas de guillemets, une proposition subordonnée introduite par « que » et un changement de personne : c’est le discours indirect.",
          },
        ],
      },
      {
        chapter: "Le texte argumentatif",
        questions: [
          {
            qcm: "Dans un texte argumentatif, la thèse est :",
            choices: ["*l’opinion que l’auteur défend", "un exemple chiffré", "le titre du texte", "le dénouement de l’histoire"],
            why: "La thèse est la position soutenue ; les arguments la justifient et les exemples les illustrent.",
          },
          {
            qcm: "Quel connecteur logique introduit une concession ?",
            choices: ["Donc", "*Certes", "Ensuite", "Car"],
            why: "« Certes » admet un point de vue opposé avant de le nuancer (« Certes…, mais… »). « Donc » marque la conséquence, « car » la cause.",
          },
        ],
      },
      {
        chapter: "La poésie",
        questions: [
          {
            qcm: "« La ville est un cœur qui bat la nuit. » Cette figure de style est :",
            choices: ["une comparaison", "*une métaphore", "une litote", "une énumération"],
            why: "On rapproche la ville d’un cœur sans outil de comparaison (comme, tel…) : c’est une métaphore.",
          },
          {
            num: "Combien de syllabes compte un alexandrin ?",
            answer: 12,
            why: "L’alexandrin est le vers de douze syllabes, souvent coupé en deux hémistiches de six.",
          },
        ],
      },
      {
        chapter: "Le résumé de texte",
        questions: [
          {
            vf: "Dans un résumé de texte, on peut donner son avis personnel sur les idées de l’auteur.",
            answer: false,
            why: "Le résumé reformule fidèlement la pensée de l’auteur, sans commentaire ni jugement personnel.",
          },
          {
            qcm: "Un résumé de texte doit respecter :",
            choices: ["*l’ordre des idées du texte", "l’ordre alphabétique des mots clés", "les phrases exactes du texte", "le nombre de paragraphes du texte"],
            why: "On garde la progression et l’énonciation du texte, en reformulant avec ses propres mots et en réduisant sa longueur.",
          },
        ],
      },
    ],
  },

  // ── Sciences physiques ─────────────────────────────────────────────────────
  {
    id: "bfem-blanc-1-pc",
    subject: "PC",
    title: "BFEM blanc DIANGAL n°1 : sciences physiques",
    durationMin: 60,
    parts: [
      {
        chapter: "Les lentilles minces",
        questions: [
          {
            num: "Une lentille convergente a une distance focale de 20 cm. Calcule sa vergence, en dioptries.",
            answer: 5,
            why: "C = 1/f avec f en mètres : C = 1/0,20 = 5 δ.",
          },
          {
            qcm: "Une lentille à bords minces est :",
            choices: ["*convergente", "divergente", "ni convergente ni divergente"],
            why: "Une lentille plus épaisse au centre qu’aux bords (bords minces) est convergente.",
          },
        ],
      },
      {
        chapter: "La dispersion de la lumière blanche",
        questions: [
          {
            qcm: "Un prisme décompose la lumière blanche parce que :",
            choices: [
              "le verre colore la lumière",
              "*le verre ne dévie pas toutes les couleurs de la même façon",
              "la lumière blanche est une lumière monochromatique",
            ],
            why: "Chaque radiation colorée est déviée différemment (le violet plus que le rouge) : on obtient le spectre de la lumière blanche.",
          },
        ],
      },
      {
        chapter: "Les forces",
        questions: [
          {
            num: "Calcule le poids, en newtons, d’un objet de masse 2 kg (g = 10 N/kg).",
            answer: 20,
            why: "P = m × g = 2 × 10 = 20 N.",
          },
        ],
      },
      {
        chapter: "L’équilibre d’un solide soumis à deux forces",
        questions: [
          {
            qcm: "Un solide soumis à deux forces est en équilibre si ces forces ont :",
            choices: [
              "le même sens et la même intensité",
              "*la même droite d’action, des sens opposés et la même intensité",
              "des droites d’action perpendiculaires",
            ],
            why: "À l’équilibre, la somme des deux forces est nulle : même droite d’action, sens contraires, même valeur.",
          },
        ],
      },
      {
        chapter: "Travail et puissance mécaniques",
        questions: [
          {
            num: "Une force constante de 50 N déplace son point d’application de 4 m dans sa direction et son sens. Calcule son travail, en joules.",
            answer: 200,
            why: "W = F × d = 50 × 4 = 200 J.",
          },
          {
            num: "Ce travail est effectué en 10 s. Calcule la puissance moyenne, en watts.",
            answer: 20,
            why: "P = W / t = 200 / 10 = 20 W.",
          },
        ],
      },
      {
        chapter: "Le courant électrique",
        questions: [
          {
            qcm: "Pour mesurer l’intensité du courant dans un circuit, l’ampèremètre se branche :",
            choices: ["*en série", "en dérivation", "aux bornes du générateur seulement"],
            why: "L’ampèremètre doit être traversé par le courant qu’il mesure : il se place en série. Le voltmètre, lui, se branche en dérivation.",
          },
        ],
      },
      {
        chapter: "La résistance électrique et la loi d’Ohm",
        questions: [
          {
            num: "Un conducteur ohmique de 100 Ω est traversé par un courant de 0,05 A. Calcule la tension à ses bornes, en volts.",
            answer: 5,
            why: "Loi d’Ohm : U = R × I = 100 × 0,05 = 5 V.",
          },
        ],
      },
      {
        chapter: "La calorimétrie",
        questions: [
          {
            num: "Calcule la quantité de chaleur, en joules, pour chauffer 1 kg d’eau de 20 °C à 30 °C (capacité thermique massique de l’eau : 4 200 J/(kg·°C)).",
            answer: 42000,
            why: "Q = m × c × (θf − θi) = 1 × 4 200 × (30 − 20) = 42 000 J.",
          },
        ],
      },
      {
        chapter: "Les solutions aqueuses",
        questions: [
          {
            num: "On dissout 10 g de sel dans de l’eau pour obtenir 0,5 L de solution. Calcule la concentration massique, en g/L.",
            answer: 20,
            why: "Cm = m / V = 10 / 0,5 = 20 g/L.",
          },
        ],
      },
      {
        chapter: "Solutions acides et solutions basiques",
        questions: [
          {
            qcm: "À 25 °C, une solution de pH = 3 est :",
            choices: ["*acide", "basique", "neutre"],
            why: "À 25 °C : pH < 7 acide, pH = 7 neutre, pH > 7 basique.",
          },
        ],
      },
      {
        chapter: "Les métaux",
        questions: [
          {
            qcm: "La rouille se forme sur le fer en présence de :",
            choices: ["diazote seul", "*dioxygène et eau (humidité)", "dihydrogène"],
            why: "La corrosion du fer demande le dioxygène de l’air et l’eau ; elle est plus rapide en air humide et salé.",
          },
        ],
      },
      {
        chapter: "Les hydrocarbures",
        questions: [
          {
            qcm: "La formule brute du méthane est :",
            choices: ["C₂H₆", "CO₂", "*CH₄", "C₂H₄"],
            why: "Le méthane est l’alcane le plus simple : un atome de carbone lié à quatre atomes d’hydrogène, CH₄.",
          },
        ],
      },
    ],
  },

  // ── SVT ────────────────────────────────────────────────────────────────────
  {
    id: "bfem-blanc-1-svt",
    subject: "SVT",
    title: "BFEM blanc DIANGAL n°1 : SVT",
    durationMin: 60,
    parts: [
      {
        chapter: "Le système nerveux",
        questions: [
          {
            qcm: "Le centre nerveux d’un réflexe médullaire comme le réflexe rotulien est :",
            choices: ["le cerveau", "*la moelle épinière", "le cervelet", "le muscle"],
            why: "Un réflexe médullaire est commandé par la moelle épinière, sans intervention du cerveau.",
          },
          {
            qcm: "Le message nerveux va du récepteur au centre nerveux par :",
            choices: ["*le nerf sensitif", "le nerf moteur", "les vaisseaux sanguins"],
            why: "Récepteur → nerf sensitif → centre nerveux → nerf moteur → effecteur (muscle).",
          },
        ],
      },
      {
        chapter: "La vision",
        questions: [
          {
            qcm: "Dans l’œil, l’image d’un objet se forme sur :",
            choices: ["le cristallin", "*la rétine", "la cornée", "l’iris"],
            why: "Le cristallin joue le rôle d’une lentille convergente ; l’image se forme sur la rétine, qui la transmet au cerveau par le nerf optique.",
          },
          {
            qcm: "Un myope voit mal de loin. On corrige la myopie avec :",
            choices: ["des lentilles convergentes", "*des lentilles divergentes", "des verres teintés"],
            why: "L’œil myope est trop convergent : l’image se forme en avant de la rétine. Une lentille divergente la ramène sur la rétine.",
          },
        ],
      },
      {
        chapter: "La respiration",
        questions: [
          {
            qcm: "Au niveau des alvéoles pulmonaires, le sang :",
            choices: [
              "rejette du dioxygène",
              "absorbe du dioxyde de carbone",
              "*s’enrichit en dioxygène et rejette du dioxyde de carbone",
            ],
            why: "Les échanges gazeux se font entre l’air alvéolaire et le sang : le dioxygène passe dans le sang, le dioxyde de carbone en sort.",
          },
        ],
      },
      {
        chapter: "La fermentation",
        questions: [
          {
            vf: "La fermentation alcoolique de la levure se fait sans dioxygène et produit de l’éthanol et du dioxyde de carbone.",
            answer: true,
            why: "C’est une dégradation incomplète du glucose, en absence de dioxygène : elle libère peu d’énergie, de l’éthanol et du CO₂.",
          },
        ],
      },
      {
        chapter: "Le rein et l’excrétion urinaire",
        questions: [
          {
            qcm: "L’unité fonctionnelle du rein, où l’urine est élaborée, est :",
            choices: ["*le néphron", "l’alvéole", "le neurone"],
            why: "Chaque rein compte environ un million de néphrons, qui filtrent le sang et élaborent l’urine.",
          },
          {
            vf: "Chez une personne en bonne santé, l’urine contient normalement du glucose.",
            answer: false,
            why: "Le glucose filtré est réabsorbé en totalité : sa présence dans l’urine est un signe d’alerte (diabète, par exemple).",
          },
        ],
      },
      {
        chapter: "Le VIH/sida et l’aide à l’immunité",
        questions: [
          {
            qcm: "Le VIH détruit principalement :",
            choices: ["les globules rouges", "les plaquettes", "*les lymphocytes T4", "les neurones"],
            why: "Le VIH infecte les lymphocytes T4, qui coordonnent les défenses immunitaires : l’organisme devient sensible aux maladies opportunistes.",
          },
          {
            qcm: "La vaccination est une immunisation :",
            choices: ["*active : l’organisme fabrique ses propres anticorps", "passive : on injecte des anticorps tout faits", "sans effet durable"],
            why: "Le vaccin stimule la mémoire immunitaire (protection durable). La sérothérapie, elle, apporte des anticorps : c’est une immunisation passive.",
          },
        ],
      },
      {
        chapter: "La tectonique des plaques",
        questions: [
          {
            qcm: "Au niveau d’une dorsale océanique, les plaques lithosphériques :",
            choices: ["*s’écartent", "se rapprochent", "restent immobiles"],
            why: "À la dorsale, du magma monte et crée une nouvelle croûte océanique : les plaques s’écartent (divergence).",
          },
        ],
      },
      {
        chapter: "Les roches métamorphiques",
        questions: [
          {
            qcm: "Une roche métamorphique se forme par :",
            choices: [
              "refroidissement d’un magma en surface",
              "*transformation d’une roche sous l’effet de la pression et de la température",
              "dépôt de sédiments au fond de l’eau",
            ],
            why: "Le métamorphisme transforme une roche à l’état solide, en profondeur, sous l’effet de fortes pressions et températures.",
          },
        ],
      },
      {
        chapter: "Le cycle des roches et la chronologie en géologie",
        questions: [
          {
            qcm: "Selon le principe de superposition, dans une série de couches non déformées, la couche la plus ancienne est :",
            choices: ["la plus haute", "*la plus basse", "celle du milieu"],
            why: "Les couches se déposent les unes sur les autres : la plus basse s’est déposée la première.",
          },
        ],
      },
    ],
  },

  // ── Histoire-géographie ────────────────────────────────────────────────────
  {
    id: "bfem-blanc-1-hg",
    subject: "HG",
    title: "BFEM blanc DIANGAL n°1 : histoire-géographie",
    durationMin: 60,
    parts: [
      {
        chapter: "La révolution industrielle et ses conséquences",
        questions: [
          {
            qcm: "La révolution industrielle a commencé au XVIIIe siècle en :",
            choices: ["France", "*Angleterre", "Allemagne", "États-Unis"],
            why: "Elle débute en Angleterre (machine à vapeur, textile, charbon) avant de gagner l’Europe et les États-Unis au XIXe siècle.",
          },
        ],
      },
      {
        chapter: "L’impérialisme européen et le partage de l’Afrique",
        questions: [
          {
            num: "En quelle année s’ouvre la conférence de Berlin, qui fixe les règles du partage de l’Afrique ?",
            answer: 1884,
            why: "La conférence de Berlin se tient de novembre 1884 à février 1885.",
          },
        ],
      },
      {
        chapter: "Les résistances africaines",
        questions: [
          {
            qcm: "Lat Dior Ngoné Latyr Diop, qui s’opposa au chemin de fer Dakar–Saint-Louis, était damel du :",
            choices: ["Djolof", "*Cayor", "Fouta-Toro", "Sine"],
            why: "Lat Dior était damel (roi) du Cayor ; il est tué à Dékheulé en 1886.",
          },
        ],
      },
      {
        chapter: "La Première Guerre mondiale",
        questions: [
          {
            num: "En quelle année l’armistice met-il fin à la Première Guerre mondiale ?",
            answer: 1918,
            why: "L’armistice est signé le 11 novembre 1918.",
          },
        ],
      },
      {
        chapter: "La révolution russe",
        questions: [
          {
            qcm: "La révolution bolchevique d’octobre 1917 est dirigée par :",
            choices: ["*Lénine", "le tsar Nicolas II", "Kerenski"],
            why: "Les bolcheviks de Lénine prennent le pouvoir en octobre 1917, contre le gouvernement provisoire de Kerenski.",
          },
        ],
      },
      {
        chapter: "La crise des années 1930",
        questions: [
          {
            qcm: "La crise économique de 1929 commence par le krach de la Bourse de :",
            choices: ["Londres", "Paris", "*New York (Wall Street)", "Berlin"],
            why: "Le « jeudi noir » du 24 octobre 1929 à Wall Street déclenche une crise qui gagne le monde entier.",
          },
        ],
      },
      {
        chapter: "La Seconde Guerre mondiale",
        questions: [
          {
            num: "En quelle année commence la Seconde Guerre mondiale ?",
            answer: 1939,
            why: "Elle commence le 1er septembre 1939 avec l’invasion de la Pologne par l’Allemagne.",
          },
          {
            qcm: "À Thiaroye, le 1er décembre 1944 :",
            choices: [
              "*des tirailleurs qui réclamaient leur solde ont été massacrés par l’armée coloniale",
              "l’indépendance du Sénégal a été proclamée",
              "un traité de paix a été signé",
            ],
            why: "Des tirailleurs africains rapatriés, qui réclamaient le paiement de leur solde, ont été tués par l’armée coloniale française au camp de Thiaroye.",
          },
        ],
      },
      {
        chapter: "Les relations Est-Ouest de 1945 aux années 1990",
        questions: [
          {
            num: "En quelle année tombe le mur de Berlin ?",
            answer: 1989,
            why: "Le mur de Berlin tombe le 9 novembre 1989 ; l’URSS disparaît deux ans plus tard, en 1991.",
          },
        ],
      },
      {
        chapter: "Bandung et l’émergence du Tiers-monde",
        questions: [
          {
            num: "En quelle année se tient la conférence de Bandung ?",
            answer: 1955,
            why: "En avril 1955, à Bandung (Indonésie), des pays d’Asie et d’Afrique condamnent le colonialisme : c’est la naissance du Tiers-monde sur la scène internationale.",
          },
        ],
      },
      {
        chapter: "Le Sénégal de 1944 à 1962",
        questions: [
          {
            qcm: "Le premier président de la République du Sénégal est :",
            choices: ["Mamadou Dia", "*Léopold Sédar Senghor", "Lamine Guèye", "Abdou Diouf"],
            why: "Léopold Sédar Senghor est élu président de la République en septembre 1960 ; Mamadou Dia est alors président du Conseil.",
          },
          {
            num: "En quelle année le Sénégal accède-t-il à l’indépendance ?",
            answer: 1960,
            why: "Le Sénégal devient indépendant en 1960 (au sein de la Fédération du Mali, puis seul à partir d’août 1960).",
          },
        ],
      },
      {
        chapter: "La Terre, un village planétaire",
        questions: [
          {
            qcm: "La mondialisation désigne :",
            choices: [
              "la fermeture des frontières",
              "*l’intensification des échanges et des relations à l’échelle de la planète",
              "la disparition des villes",
            ],
            why: "Marchandises, capitaux, personnes et informations circulent de plus en plus entre les pays.",
          },
        ],
      },
      {
        chapter: "Les systèmes économiques et les inégalités de développement",
        questions: [
          {
            qcm: "L’indice de développement humain (IDH) combine la santé, l’éducation et :",
            choices: ["la superficie du pays", "*le niveau de vie (revenu)", "le nombre de routes"],
            why: "L’IDH mesure l’espérance de vie, la durée de scolarisation et le revenu par habitant.",
          },
        ],
      },
      {
        chapter: "La coopération internationale",
        questions: [
          {
            qcm: "Le siège de la Commission de la CEDEAO se trouve à :",
            choices: ["Dakar", "Accra", "*Abuja", "Lomé"],
            why: "La CEDEAO, créée en 1975, a son siège à Abuja, au Nigeria.",
          },
        ],
      },
      {
        chapter: "Ressources, environnement et climat",
        questions: [
          {
            qcm: "La Grande Muraille verte, à laquelle participe le Sénégal, vise à :",
            choices: ["*freiner la désertification au Sahel", "protéger les côtes contre la mer", "relier Dakar à Djibouti par une route"],
            why: "Ce programme africain plante des arbres et restaure les sols du Sénégal à Djibouti pour lutter contre la désertification.",
          },
        ],
      },
    ],
  },

  // ── Anglais ────────────────────────────────────────────────────────────────
  {
    id: "bfem-blanc-1-anglais",
    subject: "ANG",
    title: "BFEM blanc DIANGAL n°1 : anglais",
    durationMin: 60,
    parts: [
      {
        chapter: "Present simple and continuous",
        questions: [
          {
            qcm: "Look! The children ___ football in the yard.",
            choices: ["play", "*are playing", "plays", "played"],
            why: "« Look! » shows an action happening now: present continuous, are + playing.",
          },
          {
            qcm: "She usually ___ to school by bus.",
            choices: ["go", "is going", "*goes", "went"],
            why: "« Usually » expresses a habit: present simple, with -es for she.",
          },
        ],
      },
      {
        chapter: "Daily life and routines",
        questions: [
          {
            qcm: "Complete the routine: « I wake up, I have a shower and I ___ breakfast. »",
            choices: ["*have", "do", "go"],
            why: "We say « have breakfast » (or « eat breakfast »).",
          },
        ],
      },
      {
        chapter: "The simple past",
        questions: [
          {
            text: "Write the simple past of the verb « to buy ».",
            answer: "bought",
            why: "Buy is irregular: buy, bought, bought.",
          },
          {
            qcm: "Last year, we ___ to Saint-Louis.",
            choices: ["go", "*went", "have gone", "were go"],
            why: "« Last year » is a finished time in the past: simple past, went.",
          },
        ],
      },
      {
        chapter: "The present perfect",
        questions: [
          {
            qcm: "I ___ my homework yet.",
            choices: ["didn’t finished", "*haven’t finished", "don’t finish", "am not finished"],
            why: "« Yet » goes with the present perfect in negative sentences: have not + past participle.",
          },
          {
            qcm: "She has lived in Dakar ___ 2015.",
            choices: ["for", "*since", "ago", "during"],
            why: "« Since » + a starting point (2015); « for » + a duration (for ten years).",
          },
        ],
      },
      {
        chapter: "Comparatives and superlatives",
        questions: [
          {
            qcm: "Thiès is ___ than Dakar.",
            choices: ["more small", "smallest", "*smaller", "the smaller"],
            why: "Short adjective: small → smaller than.",
          },
          {
            qcm: "The Senegal River is one of ___ rivers in West Africa.",
            choices: ["the longer", "*the longest", "longest", "more long"],
            why: "« One of the » + superlative: the longest.",
          },
        ],
      },
      {
        chapter: "Modal verbs",
        questions: [
          {
            qcm: "You ___ wear a helmet on a motorbike: it’s the law.",
            choices: ["may", "can’t", "*must", "would"],
            why: "« Must » expresses an obligation (here, a rule).",
          },
        ],
      },
      {
        chapter: "The future",
        questions: [
          {
            qcm: "Look at those dark clouds! It ___ rain.",
            choices: ["*is going to", "will to", "goes", "rains"],
            why: "A prediction based on present evidence: be going to + verb.",
          },
        ],
      },
      {
        chapter: "Reading comprehension",
        questions: [
          {
            qcm: "Read: « Fatou gets up at six. She helps her mother before going to school. In the evening, she revises her lessons. » What does Fatou do in the evening?",
            choices: ["She helps her mother.", "*She revises her lessons.", "She gets up.", "She goes to the market."],
            why: "The text says: « In the evening, she revises her lessons. »",
          },
          {
            vf: "Same text: Fatou goes to school before helping her mother.",
            answer: false,
            why: "She helps her mother before going to school, not after.",
          },
        ],
      },
    ],
  },
];

// ── Sujets n°2 : au format de l'épreuve (quatre exercices notés, barème par question) ─────────
// Structure et compétences inspirées des sujets de BFEM, énoncés, nombres et documents nouveaux.

const CONE = "Exercice 1 (5 points). Le patron d’un cône de révolution de sommet S est un secteur circulaire de rayon 30 cm (la génératrice [SA] mesure 30 cm) et d’angle 216°.";
const TRIANGLE = "Exercice 2 (5 points). ABC est un triangle rectangle en A tel que AB + AC + BC = 48 cm et 3AB = 4AC.";
const COOP = "Exercice 3 (6 points). Une coopérative de Kaolack revend l’arachide décortiquée avec une marge de 20 % sur le prix d’achat. On note x le prix d’achat d’un kilogramme et p son prix de vente, en francs.";
const ALGEBRE = "Exercice 4 (4 points). On donne A(x) = (3x − 1)(2x + 5) − (6x − 2)(x − 1).";

const CHIMIE = "Exercice 1 (5 points). Réponds par vrai ou faux, ou choisis la bonne réponse.";
const SOLUTIONS = "Exercice 2 (5 points). Masses molaires : C = 12 g/mol, H = 1 g/mol, O = 16 g/mol. Volume molaire : Vm = 24 L/mol.";
const OPTIQUE = "Exercice 3 (5 points). Forces et lentilles.";
const OHM = "Exercice 4 (5 points). Dans un circuit série, un résistor de résistance R₁ est traversé par un courant I = 0,2 A ; la tension à ses bornes est U = 6 V.";

const DEFINITIONS = "Exercice 1, maîtrise des connaissances (8 points). Trouve le mot qui correspond à chaque définition.";
const IMMUNITE =
  "Exercice 2, compétences méthodologiques (7 points). On injecte à un lapin l’anatoxine diphtérique (toxine rendue inoffensive) au jour 0, puis une seconde fois au jour 30. Quantité d’anticorps anti-toxine diphtérique dans le sang (unités arbitraires) : jour 0 : 0 ; jour 10 : 40 ; jour 20 : 75 ; jour 30 : 15 ; jour 40 : 600 ; jour 50 : 900 ; jour 60 : 750.";
const PLAQUES =
  "Exercice 3, compétences méthodologiques (5 points). Des basaltes du plancher océanique, âgés de 6 millions d’années, se trouvent aujourd’hui à 120 km de l’axe de la dorsale où ils se sont formés.";

const SPECS_2: MockExamSpec[] = [
  {
    id: "bfem-blanc-2-maths",
    subject: "MATH",
    title: "BFEM blanc DIANGAL n°2 : mathématiques",
    durationMin: 120,
    parts: [
      {
        chapter: "Géométrie dans l’espace",
        questions: [
          {
            num: `${CONE} 1) La longueur de l’arc du secteur, qui est aussi la circonférence de la base, s’écrit k × π cm. Donne k.`,
            answer: 36,
            pts: 1,
            why: "Arc = (216 / 360) × 2π × 30 = 0,6 × 60π = 36π cm : k = 36.",
          },
          {
            num: `${CONE} 2) Calcule le rayon r de la base du cône, en cm.`,
            answer: 18,
            pts: 1,
            why: "La circonférence de la base vaut 2πr = 36π, donc r = 36 / 2 = 18 cm.",
          },
          {
            num: `${CONE} 3) Calcule la hauteur h du cône, en cm.`,
            answer: 24,
            pts: 1,
            why: "Le triangle formé par la hauteur, le rayon et la génératrice est rectangle : h² = 30² − 18² = 900 − 324 = 576, donc h = 24 cm.",
          },
          {
            num: `${CONE} 4) Calcule l’aire totale du cône (surface latérale et base), en cm², avec π = 3,14.`,
            answer: 2712.96,
            pts: 2,
            why: "Aire latérale = π × r × génératrice = π × 18 × 30 = 540π ; aire de la base = π × 18² = 324π ; aire totale = 864π = 864 × 3,14 = 2 712,96 cm².",
          },
        ],
      },
      {
        chapter: "Équations et inéquations à deux inconnues",
        questions: [
          {
            qcm: `${TRIANGLE} 1) De l’égalité 3AB = 4AC, on déduit :`,
            choices: ["AC = 4/3 AB", "*AC = 3/4 AB", "AC = AB − 1", "AC = 4AB"],
            pts: 1,
            why: "En divisant les deux membres par 4 : AC = 3AB / 4 = 3/4 AB.",
          },
          {
            num: `${TRIANGLE} 2) En remplaçant AC dans le périmètre puis en multipliant par 4, on obtient 7AB + 4BC = k. Donne k.`,
            answer: 192,
            pts: 1.5,
            why: "AB + 3/4 AB + BC = 48 ; en multipliant par 4 : 4AB + 3AB + 4BC = 192, soit 7AB + 4BC = 192.",
          },
        ],
      },
      {
        chapter: "Relations trigonométriques",
        questions: [
          {
            qcm: `${TRIANGLE} 3) D’après le théorème de Pythagore, BC² = AB² + AC² = AB² + 9/16 AB² = 25/16 AB². On en déduit :`,
            choices: ["BC = AB", "5BC = 4AB", "*4BC = 5AB", "BC = 25AB"],
            pts: 1,
            why: "BC² = 25/16 AB², donc BC = 5/4 AB (longueurs positives), soit 4BC = 5AB.",
          },
        ],
      },
      {
        chapter: "Équations et inéquations à deux inconnues",
        questions: [
          {
            num: `${TRIANGLE} 4) À l’aide des questions 2) et 3), calcule AB, en cm.`,
            answer: 16,
            pts: 1.5,
            why: "4BC = 5AB, donc 7AB + 5AB = 192 : 12AB = 192 et AB = 16 cm. Puis BC = 5/4 × 16 = 20 cm et AC = 3/4 × 16 = 12 cm (vérification : 16 + 12 + 20 = 48).",
          },
        ],
      },
      {
        chapter: "Applications affines",
        questions: [
          {
            qcm: `${COOP} 1) Le prix de vente p s’exprime en fonction de x par :`,
            choices: ["p = 0,2x", "p = x + 20", "*p = 1,2x", "p = 0,8x"],
            pts: 1,
            why: "p = x + 20 % de x = x + 0,2x = 1,2x (soit p = 6/5 x).",
          },
          {
            num: `${COOP} 2) Calcule le prix de vente d’un kilogramme acheté 500 F.`,
            answer: 600,
            pts: 1,
            why: "p = 1,2 × 500 = 600 F.",
          },
          {
            num: `${COOP} 3) Calcule le prix d’achat d’un kilogramme vendu 900 F.`,
            answer: 750,
            pts: 1,
            why: "1,2x = 900, donc x = 900 / 1,2 = 750 F.",
          },
          {
            qcm: `${COOP} 4) Dans un repère, la représentation graphique de l’application x ↦ 1,2x est :`,
            choices: ["*une droite qui passe par l’origine du repère", "une droite qui ne passe pas par l’origine", "une courbe en forme de U"],
            pts: 1,
            why: "C’est une application linéaire (de la forme ax) : sa représentation est une droite passant par l’origine.",
          },
          {
            num: `${COOP} 5) Sur le graphique, 1 cm représente 100 F sur chaque axe. Le point de la droite d’abscisse 4 cm a une ordonnée de combien de centimètres ?`,
            answer: 4.8,
            pts: 2,
            why: "4 cm correspond à x = 400 F ; p = 1,2 × 400 = 480 F, soit 4,8 cm sur l’axe des ordonnées.",
          },
        ],
      },
      {
        chapter: "Calcul algébrique",
        questions: [
          {
            qcm: `${ALGEBRE} 1) Développer et réduire A(x) donne :`,
            choices: ["12x² + 21x − 7", "*21x − 7", "21x + 7", "5x − 3"],
            pts: 1,
            why: "(3x − 1)(2x + 5) = 6x² + 13x − 5 et (6x − 2)(x − 1) = 6x² − 8x + 2 ; A(x) = 6x² + 13x − 5 − 6x² + 8x − 2 = 21x − 7.",
          },
          {
            qcm: `${ALGEBRE} 2) Une factorisation de A(x) est :`,
            choices: ["(3x − 1)(2x + 5)", "7(3x + 1)", "(3x − 1)²", "*7(3x − 1)"],
            pts: 1,
            why: "6x − 2 = 2(3x − 1), donc A(x) = (3x − 1)[(2x + 5) − 2(x − 1)] = (3x − 1)(2x + 5 − 2x + 2) = 7(3x − 1).",
          },
        ],
      },
      {
        chapter: "Équations et inéquations à une inconnue",
        questions: [
          {
            qcm: `${ALGEBRE} 3) L’ensemble des solutions dans ℝ de l’inéquation (3x − 1)(x + 4) ≤ 0 est :`,
            choices: ["]−∞ ; −4] ∪ [1/3 ; +∞[", "*[−4 ; 1/3]", "[−1/3 ; 4]", "]−4 ; 1/3["],
            pts: 2,
            why: "Les facteurs s’annulent en x = 1/3 et x = −4. Le tableau de signes montre que le produit est négatif entre ces deux valeurs ; il est nul en −4 et en 1/3 (inégalité large) : S = [−4 ; 1/3].",
          },
        ],
      },
    ],
  },
  {
    id: "bfem-blanc-2-pc",
    subject: "PC",
    title: "BFEM blanc DIANGAL n°2 : sciences physiques",
    durationMin: 90,
    parts: [
      {
        chapter: "Les solutions aqueuses",
        questions: [
          {
            vf: `${CHIMIE} 1) Une solution est dite aqueuse lorsque son solvant est l’eau.`,
            answer: true,
            pts: 1,
            why: "Vrai : « aqueuse » vient du latin aqua, l’eau. Une solution dont le solvant est un autre liquide (alcool…) n’est pas aqueuse.",
          },
          {
            vf: `${CHIMIE} 2) Quand on dilue une solution, la quantité de matière de soluté augmente.`,
            answer: false,
            pts: 1,
            why: "Faux : on ajoute seulement du solvant. La quantité de soluté reste la même ; c’est la concentration qui diminue.",
          },
        ],
      },
      {
        chapter: "Solutions acides et solutions basiques",
        questions: [
          {
            qcm: `${CHIMIE} 3) Dans une solution basique, le bleu de bromothymol (BBT) prend la teinte :`,
            choices: ["jaune", "verte", "*bleue"],
            pts: 1,
            why: "Le BBT est jaune en milieu acide, vert en milieu neutre et bleu en milieu basique.",
          },
        ],
      },
      {
        chapter: "Les hydrocarbures",
        questions: [
          {
            qcm: `${CHIMIE} 4) La combustion complète d’un alcane dans le dioxygène produit :`,
            choices: ["*du dioxyde de carbone et de l’eau", "du carbone et de l’eau", "du monoxyde de carbone seulement"],
            pts: 1,
            why: "Combustion complète : CO₂ et H₂O. Le carbone (suie) et le monoxyde de carbone apparaissent quand le dioxygène manque (combustion incomplète).",
          },
        ],
      },
      {
        chapter: "La calorimétrie",
        questions: [
          {
            qcm: `${CHIMIE} 5) Une transformation qui absorbe de la chaleur est dite :`,
            choices: ["exothermique", "*endothermique", "athermique"],
            pts: 1,
            why: "Endothermique : elle absorbe de la chaleur. Exothermique : elle en libère. Athermique : sans échange de chaleur.",
          },
        ],
      },
      {
        chapter: "Les solutions aqueuses",
        questions: [
          {
            num: `${SOLUTIONS} 1) On veut préparer 500 mL d’une solution de glucose de concentration molaire C = 0,2 mol/L. Calcule la quantité de matière de glucose, en mol.`,
            answer: 0.1,
            pts: 1,
            why: "n = C × V = 0,2 × 0,500 = 0,1 mol (le volume s’exprime en litres).",
          },
          {
            num: `${SOLUTIONS} 2) Calcule la masse molaire du glucose C₆H₁₂O₆, en g/mol.`,
            answer: 180,
            pts: 1,
            why: "M = 6 × 12 + 12 × 1 + 6 × 16 = 72 + 12 + 96 = 180 g/mol.",
          },
          {
            num: `${SOLUTIONS} 3) Calcule la masse de glucose à dissoudre, en g.`,
            answer: 18,
            pts: 1,
            why: "m = n × M = 0,1 × 180 = 18 g.",
          },
        ],
      },
      {
        chapter: "Les hydrocarbures",
        questions: [
          {
            qcm: `${SOLUTIONS} 4) Le propène C₃H₆ appartient à la famille des :`,
            choices: ["alcanes, de formule générale CₙH₂ₙ₊₂", "*alcènes, de formule générale CₙH₂ₙ", "alcynes, de formule générale CₙH₂ₙ₋₂"],
            pts: 1,
            why: "C₃H₆ suit la formule CₙH₂ₙ avec n = 3 : c’est un alcène, qui possède une double liaison C=C.",
          },
          {
            num: `${SOLUTIONS} 5) Calcule le volume de dioxyde de carbone produit par la combustion complète de 0,5 mol de méthane, en L.`,
            answer: 12,
            pts: 1,
            why: "CH₄ + 2 O₂ → CO₂ + 2 H₂O : 1 mol de méthane donne 1 mol de CO₂. Donc 0,5 mol de CO₂, soit V = 0,5 × 24 = 12 L.",
          },
        ],
      },
      {
        chapter: "Les forces",
        questions: [
          {
            vf: `${OPTIQUE} 1) Le poids d’un corps est une force verticale, dirigée vers le bas.`,
            answer: true,
            pts: 1,
            why: "Vrai : le poids est l’attraction de la Terre ; sa direction est la verticale du lieu et il est orienté vers le bas.",
          },
        ],
      },
      {
        chapter: "L’équilibre d’un solide soumis à deux forces",
        questions: [
          {
            vf: `${OPTIQUE} 2) Deux forces de même intensité et de sens contraires sont toujours directement opposées.`,
            answer: false,
            pts: 1,
            why: "Faux : il faut aussi qu’elles aient la même droite d’action. Sinon, elles font tourner le solide.",
          },
        ],
      },
      {
        chapter: "Les lentilles minces",
        questions: [
          {
            qcm: `${OPTIQUE} 3) Une lentille a une vergence C = +25 δ. Elle est :`,
            choices: ["*convergente", "divergente"],
            pts: 1,
            why: "Une vergence positive caractérise une lentille convergente (négative pour une lentille divergente).",
          },
          {
            num: `${OPTIQUE} 4) Calcule la distance focale de cette lentille, en cm.`,
            answer: 4,
            pts: 1,
            why: "f = 1 / C = 1 / 25 = 0,04 m = 4 cm.",
          },
          {
            qcm: `${OPTIQUE} 5) Un objet placé entre le foyer objet et le centre optique d’une lentille convergente donne une image :`,
            choices: ["réelle et renversée", "*virtuelle, droite et plus grande que l’objet", "réelle et plus petite que l’objet"],
            pts: 1,
            why: "C’est le fonctionnement de la loupe : l’image est virtuelle, droite et agrandie.",
          },
        ],
      },
      {
        chapter: "Le courant électrique",
        questions: [
          {
            qcm: `${OHM} 1) Pour mesurer U, le voltmètre est branché :`,
            choices: ["en série avec le résistor", "*en dérivation aux bornes du résistor", "à la place du générateur"],
            pts: 1,
            why: "Le voltmètre se branche en dérivation aux bornes du dipôle ; l’ampèremètre, lui, en série.",
          },
        ],
      },
      {
        chapter: "La résistance électrique et la loi d’Ohm",
        questions: [
          {
            num: `${OHM} 2) Calcule la résistance R₁, en ohms.`,
            answer: 30,
            pts: 1,
            why: "Loi d’Ohm : U = R × I, donc R₁ = U / I = 6 / 0,2 = 30 Ω.",
          },
          {
            qcm: `${OHM} 3) On associe R₁ à un second résistor R₂ ; la résistance équivalente vaut alors 12 Ω. Les deux résistors sont associés :`,
            choices: ["en série", "*en parallèle (en dérivation)"],
            pts: 1,
            why: "En série, la résistance équivalente serait plus grande que 30 Ω. Elle est plus petite (12 Ω) : l’association est en parallèle.",
          },
          {
            num: `${OHM} 4) Calcule R₂, en ohms.`,
            answer: 20,
            pts: 2,
            why: "En parallèle : 1/Re = 1/R₁ + 1/R₂, donc 1/R₂ = 1/12 − 1/30 = 5/60 − 2/60 = 3/60 = 1/20 : R₂ = 20 Ω.",
          },
        ],
      },
    ],
  },
  {
    id: "bfem-blanc-2-svt",
    subject: "SVT",
    title: "BFEM blanc DIANGAL n°2 : SVT",
    durationMin: 90,
    parts: [
      {
        chapter: "La vision",
        questions: [
          {
            text: `${DEFINITIONS} a) Partie transparente de l’œil qui joue le rôle d’une lentille convergente.`,
            answer: "cristallin",
            accept: ["le cristallin"],
            pts: 1,
            why: "Le cristallin fait converger la lumière sur la rétine ; il se bombe plus ou moins pour voir net (accommodation).",
          },
        ],
      },
      {
        chapter: "La respiration",
        questions: [
          {
            text: `${DEFINITIONS} b) Petits sacs des poumons où se font les échanges de gaz entre l’air et le sang.`,
            answer: "alvéoles",
            accept: ["alvéole", "alvéoles pulmonaires", "les alvéoles", "alvéole pulmonaire"],
            pts: 1,
            why: "Les alvéoles pulmonaires, très nombreuses et entourées de capillaires, offrent une grande surface d’échange.",
          },
        ],
      },
      {
        chapter: "Le système nerveux",
        questions: [
          {
            text: `${DEFINITIONS} c) Réponse rapide et involontaire d’un organe à une stimulation.`,
            answer: "réflexe",
            accept: ["un réflexe", "le réflexe"],
            pts: 1,
            why: "Un réflexe est involontaire, rapide et toujours identique pour une même stimulation (exemple : le réflexe rotulien).",
          },
          {
            vf: `${DEFINITIONS} d) Vrai ou faux : le bulbe rachidien fait partie de l’encéphale.`,
            answer: true,
            pts: 1,
            why: "Vrai : l’encéphale comprend le cerveau, le cervelet et le bulbe rachidien ; la moelle épinière n’en fait pas partie.",
          },
        ],
      },
      {
        chapter: "Le rein et l’excrétion urinaire",
        questions: [
          {
            text: `${DEFINITIONS} e) Unité de structure et de fonctionnement du rein.`,
            answer: "néphron",
            accept: ["le néphron", "néphrons"],
            pts: 1,
            why: "Chaque néphron filtre le sang (au glomérule) puis transforme ce filtrat en urine le long de son tube.",
          },
          {
            vf: `${DEFINITIONS} f) Vrai ou faux : chez une personne en bonne santé, le glucose filtré retourne dans le sang par réabsorption.`,
            answer: true,
            pts: 1,
            why: "Vrai : le glucose est entièrement réabsorbé le long du tube du néphron ; c’est pourquoi l’urine normale n’en contient pas.",
          },
        ],
      },
      {
        chapter: "Le VIH/sida et l’aide à l’immunité",
        questions: [
          {
            text: `${DEFINITIONS} g) Cellules de l’immunité principalement détruites par le VIH.`,
            answer: "lymphocytes T4",
            accept: ["lymphocyte T4", "LT4", "T4", "les lymphocytes T4"],
            pts: 1,
            why: "Le VIH infecte et détruit les lymphocytes T4, qui coordonnent la réponse immunitaire.",
          },
        ],
      },
      {
        chapter: "La tectonique des plaques",
        questions: [
          {
            text: `${DEFINITIONS} h) Enfoncement d’une plaque lithosphérique océanique sous une autre plaque.`,
            answer: "subduction",
            accept: ["la subduction"],
            pts: 1,
            why: "La subduction se produit au niveau des fosses océaniques ; elle s’accompagne de séismes et de volcans.",
          },
        ],
      },
      {
        chapter: "Le VIH/sida et l’aide à l’immunité",
        questions: [
          {
            num: `${IMMUNITE} 1) Relève la quantité maximale d’anticorps après la première injection.`,
            answer: 75,
            pts: 1.5,
            why: "Après la première injection, la quantité monte lentement jusqu’à 75 unités (jour 20), puis baisse.",
          },
          {
            num: `${IMMUNITE} 2) Relève la quantité maximale d’anticorps après la seconde injection.`,
            answer: 900,
            pts: 1.5,
            why: "Après la seconde injection, la quantité atteint 900 unités dès le jour 50.",
          },
          {
            num: `${IMMUNITE} 3) Combien de fois plus d’anticorps le lapin produit-il au maximum après la seconde injection qu’après la première ?`,
            answer: 12,
            pts: 1,
            why: "900 / 75 = 12 : la réponse secondaire est douze fois plus forte.",
          },
          {
            qcm: `${IMMUNITE} 4) La réponse à la seconde injection est plus rapide et plus forte. Cela montre que le système immunitaire possède :`,
            choices: ["*une mémoire", "une spécificité", "aucune défense contre la toxine"],
            pts: 1.5,
            why: "Les cellules mémoires formées lors du premier contact réagissent vite et fort au second : c’est le principe du rappel de vaccin.",
          },
          {
            qcm: `${IMMUNITE} 5) Le sérum de ce lapin neutralise la toxine diphtérique mais pas la toxine tétanique. Cela montre que les anticorps sont :`,
            choices: ["non spécifiques", "*spécifiques", "des globules rouges"],
            pts: 1.5,
            why: "Chaque anticorps reconnaît un seul antigène : les anticorps anti-toxine diphtérique n’agissent pas sur la toxine tétanique.",
          },
        ],
      },
      {
        chapter: "La tectonique des plaques",
        questions: [
          {
            qcm: `${PLAQUES} 1) Le phénomène qui a éloigné ces roches de la dorsale est :`,
            choices: ["*l’expansion océanique (écartement des plaques)", "l’érosion", "la subduction"],
            pts: 1,
            why: "À la dorsale, du magma crée une nouvelle croûte océanique qui s’écarte de part et d’autre de l’axe.",
          },
          {
            num: `${PLAQUES} 2) Calcule la vitesse moyenne de déplacement de ces roches, en cm par an.`,
            answer: 2,
            pts: 2,
            why: "120 km = 12 000 000 cm ; v = 12 000 000 / 6 000 000 = 2 cm par an.",
          },
          {
            qcm: `${PLAQUES} 3) Quand deux plaques continentales entrent en collision, il se forme :`,
            choices: ["une dorsale", "*une chaîne de montagnes, comme l’Himalaya", "une fosse océanique"],
            pts: 1,
            why: "La collision de l’Inde avec l’Asie a plissé les roches et formé l’Himalaya.",
          },
          {
            vf: `${PLAQUES} 4) Vrai ou faux : les plaques lithosphériques ne se déplacent plus aujourd’hui.`,
            answer: false,
            pts: 1,
            why: "Faux : les mesures par satellite (GPS) montrent qu’elles bougent encore de quelques centimètres par an.",
          },
        ],
      },
    ],
  },
];

const built = buildMockExams("3E", CHAPTERS_3E, [...SPECS, ...SPECS_2]);

export const QUESTIONS_BFEM_BLANCS = built.questions;
export const ANSWER_KEYS_BFEM_BLANCS = built.keys;
export const QUESTION_CHAPTERS_BFEM_BLANCS = built.questionChapters;
export const ASSESSMENTS_BFEM_BLANCS = built.assessments;
