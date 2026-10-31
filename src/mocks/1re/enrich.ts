import "server-only";

// 1re : questions illustrées ajoutées aux séries d'exercices, avec les schémas des leçons. Elles se
// lisent sur le schéma et complètent les questions de 1re/exercises.ts sans les répéter. Un chapitre
// commun à plusieurs séries reçoit les mêmes questions.

import { ask, howMany, schemaFig, tf, type SubjectExtras } from "../illustrated-questions";

const LIMITES = schemaFig("m1-limites", "Courbe de (2x² + 1)/(x² − 3) avec ses trois asymptotes.");
const TANGENTE = schemaFig("m1-tangente", "Courbe de x² et sa tangente au point A(1 ; 1).");
const VARIATIONS = schemaFig("m1-variations", "Courbe de x³ − 3x avec son maximum et son minimum locaux.");
const SUITES = schemaFig("m1-suites", "Termes d’une suite arithmétique et d’une suite géométrique.");
const PASCAL = schemaFig("m1-pascal", "Triangle de Pascal jusqu’à la ligne n = 5.");
const NUAGE = schemaFig("m1-nuage", "Nuage de points et droite de Mayer passant par G₁ et G₂.");
const OPTIMISATION = schemaFig("m1-optimisation", "Région des contraintes et droite du bénéfice maximal.");
const INTERETS = schemaFig("m1-interets", "Valeur d’un placement avec intérêts simples et avec intérêts composés.");
const COMPLEXE = schemaFig("m1-complexe", "Le point M d’affixe 1 + i dans le plan complexe.");
const BENZENE = schemaFig("p1-benzene", "Formules du benzène.");
const REDOX = schemaFig("p1-redox", "Échelle des potentiels standard de quelques couples, de Ag⁺/Ag à Al³⁺/Al.");
const ELECTROLYSE = schemaFig("p1-electrolyse", "Cuve d’électrolyse d’une solution de sulfate de cuivre.");
const TRAVAIL = schemaFig("p1-travail", "Caisse tirée par une force qui fait un angle α avec le déplacement.");
const ENERGIE = schemaFig("p1-energie", "Énergies cinétique, potentielle et mécanique d’un objet qui tombe.");
const CALORIMETRE = schemaFig("p3-calorimetre", "Calorimètre avec thermomètre et agitateur.");
const CHAMP = schemaFig("p1-champ", "Champ électrostatique uniforme entre deux plaques chargées.");
const ONDE = schemaFig("p1-onde", "Onde sinusoïdale le long d’une corde, avec sa longueur d’onde.");
const LENTILLE = schemaFig("p1-lentille", "Construction de l’image d’un objet par une lentille convergente.");
const DANIELL = schemaFig("p1-daniell", "Schéma de la pile Daniell.");
const CELLULES = schemaFig("s1-cellules", "Cellule animale et cellule végétale.");
const MICROBES = schemaFig("s1-bacterie-virus", "Une bactérie et un virus.");
const OSMOSE = schemaFig("s1-osmose", "Globules rouges dans de l’eau pure, dans de l’eau à 9 g/L et dans une eau très salée.");
const MITOSE = schemaFig("s1-mitose", "Les quatre phases de la mitose.");
const PROTEINES = schemaFig("s1-proteines", "Transcription dans le noyau et traduction dans le cytoplasme.");
const DIGESTIF = schemaFig("s4-digestif", "Schéma de l’appareil digestif.");
const VITESSES = schemaFig("s1-vitesses-sismiques", "Vitesse des ondes P et S selon la profondeur.");
const ROCHES = schemaFig("s4-roches", "Basalte et granite vus au microscope.");
const COUCHES = schemaFig("s5-sedimentation", "Couches de sédiments au fond de la mer.");
const CYCLE = schemaFig("s3-cycle-roches", "Le cycle des roches.");
const SOCLE = schemaFig("g5-socle", "Carte du Sénégal : bassin sédimentaire et socle ancien.");
const VILLOSITE = schemaFig("s4-villosite", "Une villosité intestinale.");
const AFRIQUE_1914 = schemaFig("h3-afrique-1914", "Carte de l’Afrique colonisée vers 1914, par puissance coloniale.");
const GUERRES = schemaFig("h3-frise-guerres", "Frise de 1910 à 1950.");
const NORD_SUD = schemaFig("g3-nord-sud", "Planisphère des pays développés, émergents et en développement.");
const POPULATION = schemaFig("g1-population", "Courbe de la population mondiale depuis 1800.");
const TRANSITION = schemaFig("g1-transition", "Schéma de la transition démographique : natalité et mortalité.");
const URBANISATION = schemaFig("g1-urbanisation", "Part des citadins dans la population mondiale depuis 1950.");

/** Questions communes à plusieurs titres de chapitre (séries S et L). */
const SUITE_ARITHMETIQUE = howMany("Une suite arithmétique a pour premier terme u₀ = 5 et pour raison 3. Combien vaut u₄ ?", 17, "u₄ = u₀ + 4r = 5 + 4 × 3 = 17.", SUITES);
const MAYER = tf("La droite de Mayer passe par les points moyens G₁ et G₂ des deux groupes de points.", true, "on partage le nuage en deux groupes de même effectif et on relie leurs points moyens.", NUAGE);

export const EXTRA_1RE: SubjectExtras = {
  MATH: {
    "Limites et continuité": [
      ask("D’après la courbe, quelle droite est asymptote horizontale ?", ["*y = 2", "x = √3", "y = 0"], "loin de l’origine, la courbe s’approche de la droite y = 2.", LIMITES),
    ],
    "Dérivation et applications": [
      howMany("La tangente à la courbe de f(x) = x² au point A(1 ; 1) a pour équation y = 2x − 1. Combien vaut f′(1) ?", 2, "f′(1) est le coefficient directeur de la tangente.", TANGENTE),
      ask("D’après la courbe de x³ − 3x, en quelle abscisse la fonction a-t-elle un maximum local ?", ["*−1", "1", "0"], "la tangente y est horizontale : f′(−1) = 3 × 1 − 3 = 0.", VARIATIONS),
    ],
    "Suites numériques": [SUITE_ARITHMETIQUE],
    "Suites arithmétiques et géométriques": [SUITE_ARITHMETIQUE],
    Dénombrement: [
      howMany("D’après le triangle de Pascal, combien vaut C(5 ; 2) ?", 10, "Ligne n = 5 : 1, 5, 10, 10, 5, 1 ; on lit la colonne p = 2.", PASCAL),
      howMany("Quelle est la somme des nombres de la ligne n = 4 du triangle ?", 16, "1 + 4 + 6 + 4 + 1 = 16 = 2⁴.", PASCAL),
    ],
    "Statistique à deux variables": [MAYER],
    "Statistique : ajustement par la méthode de Mayer": [MAYER],
    "Systèmes et optimisation": [
      howMany("D’après le graphique, le bénéfice B = 3x + 2y est maximal au sommet (6 ; 4). Combien vaut ce bénéfice maximal ?", 26, "B = 3 × 6 + 2 × 4 = 18 + 8 = 26.", OPTIMISATION),
    ],
    "Mathématiques financières : intérêts et escompte": [
      ask("D’après le graphique, quel placement rapporte le plus au bout de 10 ans ?", ["*les intérêts composés", "les intérêts simples", "les deux rapportent autant"], "avec les intérêts composés, les intérêts rapportent eux-mêmes des intérêts.", INTERETS),
      howMany("Un capital de 500 000 F est placé à 5 % par an, à intérêts simples. Quel intérêt rapporte-t-il en un an, en francs ?", 25000, "500 000 × 5 ÷ 100 = 25 000 F.", INTERETS),
    ],
    "Nombres complexes": [
      ask("D’après la figure, quel est un argument de 1 + i ?", ["*π/4", "π/2", "π/3"], "OM fait un angle de 45° avec l’axe des réels.", COMPLEXE),
      ask("Quel est le module de 1 + i ?", ["*√2", "2", "1"], "|1 + i| = √(1² + 1²) = √2 : c’est la distance OM.", COMPLEXE),
    ],
  },
  PC: {
    "Le benzène et les composés aromatiques": [
      howMany("Combien d’atomes de carbone forment le cycle du benzène ?", 6, "Benzène : C₆H₆, un cycle de 6 atomes de carbone.", BENZENE),
    ],
    "Couples oxydant-réducteur ion métallique/métal": [
      ask("D’après l’échelle des potentiels, quel métal réagit avec les ions Cu²⁺ ?", ["*le zinc", "l’argent", "le cuivre"], "règle du gamma : l’oxydant Cu²⁺ (0,34 V) réagit avec le réducteur placé plus bas, Zn (−0,76 V).", REDOX),
      ask("Quel est l’oxydant le plus fort de cette échelle ?", ["*Ag⁺", "Al³⁺", "Zn²⁺"], "il a le potentiel standard le plus élevé (0,80 V).", REDOX),
    ],
    "Les électrolyses": [
      ask("Dans l’électrolyse d’une solution de sulfate de cuivre, où se dépose le cuivre ?", ["*à la cathode (−)", "à l’anode (+)", "aux deux électrodes"], "les ions Cu²⁺ y sont réduits.", ELECTROLYSE),
      howMany("Un courant de 2 A traverse la cuve pendant 100 s. Quelle quantité d’électricité Q a circulé, en coulombs ?", 200, "Q = I × t = 2 × 100 = 200 C.", ELECTROLYSE),
    ],
    "Travail et puissance mécaniques": [
      howMany("Une force de 50 N tire une caisse sur 10 m et fait un angle de 60° avec le déplacement. Quel est son travail, en joules ?", 250, "W = F × AB × cos α = 50 × 10 × 0,5 = 250 J.", TRAVAIL),
    ],
    "Énergie potentielle et énergie mécanique": [
      tf("Sans frottement, l’énergie mécanique de l’objet reste constante pendant la chute.", true, "l’énergie potentielle se transforme en énergie cinétique : leur somme ne change pas.", ENERGIE),
    ],
    "La calorimétrie": [
      howMany("On mélange 200 g d’eau à 80 °C et 300 g d’eau à 20 °C dans un calorimètre. Quelle est la température finale, en °C ?", 44, "200 × (80 − θ) = 300 × (θ − 20), donc 500 θ = 22 000 et θ = 44 °C.", CALORIMETRE),
    ],
    "Force et champ électrostatiques": [
      ask("Entre les plaques, les lignes de champ vont…", ["*de la plaque + vers la plaque −", "de la plaque − vers la plaque +", "parallèlement aux plaques"], "une charge positive est poussée dans le sens du champ.", CHAMP),
      howMany("Deux plaques distantes de 0,05 m sont soumises à une tension de 1 000 V. Quelle est la valeur du champ E, en V/m ?", 20000, "E = U ÷ d = 1 000 ÷ 0,05 = 20 000 V/m.", CHAMP),
    ],
    "Ondes progressives et interférences mécaniques": [
      howMany("Une onde de fréquence 50 Hz se propage à 10 m/s le long d’une corde. Quelle est sa longueur d’onde, en m ?", 0.2, "λ = v ÷ f = 10 ÷ 50 = 0,2 m.", ONDE),
    ],
    "Les lentilles minces": [
      howMany("Quelle est la distance focale d’une lentille de vergence 10 δ, en cm ?", 10, "f′ = 1 ÷ C = 1 ÷ 10 = 0,1 m = 10 cm.", LENTILLE),
      tf("D’après la construction, l’image A′B′ est réelle et renversée.", true, "l’objet est placé avant le foyer F.", LENTILLE),
    ],
    "Couples oxydant-réducteur et piles électrochimiques": [
      ask("Dans la pile Daniell, quel métal constitue le pôle − ?", ["*le zinc", "le cuivre", "le pont salin"], "le zinc s’oxyde : Zn → Zn²⁺ + 2e⁻ ; les électrons partent de cette électrode.", DANIELL),
    ],
  },
  SVT: {
    "La cellule : techniques d’étude et organisation": [
      ask("D’après le schéma, quel élément est présent dans la cellule végétale mais pas dans la cellule animale ?", ["*les chloroplastes", "le noyau", "les mitochondries"], "la paroi et la grande vacuole sont aussi propres à la cellule végétale.", CELLULES),
    ],
    "Bactéries et virus": [
      tf("D’après le schéma, le virus est une cellule.", false, "il n’a qu’une capside et du matériel génétique : il ne se multiplie qu’à l’intérieur d’une cellule.", MICROBES),
      ask("Lequel est le plus petit ?", ["*le virus (environ 0,1 µm)", "la bactérie (environ 2 µm)", "ils ont la même taille"], "le virus est environ 20 fois plus petit que la bactérie.", MICROBES),
    ],
    "Les échanges cellulaires": [
      ask("D’après le schéma, que devient un globule rouge placé dans de l’eau pure ?", ["*il gonfle et éclate (hémolyse)", "il se ratatine", "il ne change pas"], "l’eau entre dans le globule, le milieu le plus concentré.", OSMOSE),
    ],
    "Chromosomes et mitose": [
      ask("Pendant quelle phase les chromosomes s’alignent-ils au milieu de la cellule ?", ["*la métaphase", "l’anaphase", "la télophase"], "à l’anaphase, ils se séparent vers les deux pôles.", MITOSE),
      tf("Les deux cellules filles ont les mêmes chromosomes que la cellule mère.", true, "chaque chromosome double se sépare en deux.", MITOSE),
    ],
    "La synthèse des protéines": [
      ask("D’après le schéma, où se déroule la traduction ?", ["*dans le cytoplasme, sur les ribosomes", "dans le noyau", "dans le gène"], "la transcription a lieu dans le noyau ; l’ARN messager sort vers les ribosomes.", PROTEINES),
    ],
    "Les aliments et la digestion": [
      ask("D’après le schéma, quel organe produit la bile ?", ["*le foie", "le pancréas", "l’estomac"], "la bile est stockée dans la vésicule biliaire, puis versée dans l’intestin.", DIGESTIF),
    ],
    "Introduction à la géologie et structure du globe": [
      ask("D’après le graphique, que deviennent les ondes S à 2 900 km de profondeur ?", ["*elles disparaissent : le noyau externe est liquide", "elles accélèrent fortement", "elles ne changent pas"], "les ondes S ne traversent pas les liquides.", VITESSES),
    ],
    "Les roches magmatiques : granite et basalte": [
      ask("D’après le schéma, quelle roche contient du verre et de petits cristaux ?", ["*le basalte", "le granite", "les deux"], "refroidi vite, en surface, il n’a pas eu le temps de former de grands cristaux.", ROCHES),
    ],
    "Les roches sédimentaires et résiduelles": [
      ask("Dans une série de couches qui n’a pas été déformée, la couche la plus ancienne est…", ["*en bas", "en haut", "au milieu"], "c’est le principe de superposition.", COUCHES),
    ],
    "Les roches métamorphiques et la tectonique": [
      ask("D’après le cycle, comment se forment les roches métamorphiques ?", ["*par enfouissement, sous de fortes pressions et températures", "par refroidissement du magma en surface", "par dépôt de débris au fond de la mer"], "les roches se transforment sans fondre.", CYCLE),
    ],
    "Les ensembles géologiques et les ressources du Sénégal": [
      ask("D’après la carte, quel ensemble géologique couvre presque tout le Sénégal ?", ["*le bassin sédimentaire", "le socle ancien", "un massif volcanique"], "le socle ancien n’affleure qu’au sud-est.", SOCLE),
    ],
    "L’absorption intestinale et le devenir des nutriments": [
      ask("D’après le schéma, où passent les nutriments qui traversent la villosité ?", ["*dans le sang et la lymphe", "dans l’air des poumons", "dans l’urine"], "chaque villosité est parcourue de capillaires et d’un vaisseau lymphatique.", VILLOSITE),
    ],
  },
  HG: {
    "L’impérialisme européen en Afrique": [
      ask("D’après la carte, quelles sont les deux grandes puissances coloniales en Afrique vers 1914 ?", ["*la France et le Royaume-Uni", "l’Allemagne et l’Italie", "le Portugal et l’Espagne"], "elles se partagent la plus grande partie du continent.", AFRIQUE_1914),
    ],
    "La Première Guerre mondiale et l’Afrique": [
      ask("D’après la frise, quel événement de 1944 concerne le Sénégal ?", ["*le massacre de Thiaroye", "le krach boursier", "les révolutions russes"], "des tirailleurs qui réclamaient leur dû y sont tués par l’armée coloniale.", GUERRES),
    ],
    "Les inégalités de développement dans le monde": [
      tf("D’après le planisphère, les pays développés sont surtout dans l’hémisphère nord.", true, "Amérique du Nord, Europe, Japon ; l’Australie et la Nouvelle-Zélande font exception.", NORD_SUD),
    ],
    "La population mondiale": [
      ask("D’après la courbe, depuis quand la population mondiale augmente-t-elle très vite ?", ["*depuis 1950", "depuis 1800", "depuis 2020"], "elle passe de 2,5 milliards en 1950 à 8 milliards en 2022.", POPULATION),
      ask("Pendant la transition démographique, quel taux baisse en premier ?", ["*la mortalité", "la natalité", "les deux en même temps"], "entre les deux baisses, la population augmente vite.", TRANSITION),
    ],
    "La ville et les activités urbaines": [
      ask("D’après la courbe, depuis quelle année plus de la moitié de l’humanité vit-elle en ville ?", ["*2007", "1950", "1975"], "la part des citadins était de 30 % en 1950.", URBANISATION),
    ],
  },
};
