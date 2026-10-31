import "server-only";

// Terminale : questions illustrées ajoutées aux séries d'exercices, avec les schémas des leçons. Elles
// se lisent sur le schéma et complètent les questions de tle/exercises.ts sans les répéter. Un chapitre
// commun à plusieurs séries reçoit les mêmes questions.

import { ask, howMany, schemaFig, tf, type SubjectExtras } from "../illustrated-questions";

const ARBRE = schemaFig("t-arbre", "Arbre pondéré à deux niveaux : A et Ā, puis B et B̄.");
const BINOMIALE = schemaFig("t-binomiale", "Diagramme de la loi binomiale de paramètres 6 et 0,5.");
const RACINES = schemaFig("t-racines", "Les six racines sixièmes de l’unité sur le cercle trigonométrique.");
const ESCALIER = schemaFig("t-escalier", "Construction en escalier de la suite définie par u(n+1) = 0,5 u(n) + 2.");
const OBLIQUE = schemaFig("t-oblique", "Courbe avec l’asymptote verticale x = 1 et l’asymptote oblique y = x + 1.");
const TVI = schemaFig("t-tvi", "Courbe continue qui coupe la droite y = k entre a et b.");
const EXP_LN = schemaFig("t-exp-ln", "Courbes de exp et de ln, symétriques par rapport à la droite y = x.");
const INFLEXION = schemaFig("t-inflexion", "Courbe de x³ et son point d’inflexion.");
const INTEGRALE = schemaFig("t-integrale", "Aire sous une courbe entre a et b.");
const EQUA_DIFF = schemaFig("t-equa-diff", "Famille de solutions de y′ = −y et la solution telle que y(0) = 3.");
const SIMILITUDE = schemaFig("t-similitude", "Un point M et son image M′ par une similitude directe de centre Ω.");
const VECTORIEL = schemaFig("t-produit-vectoriel", "Vecteurs u, v et leur produit vectoriel.");
const PARABOLE = schemaFig("t-parabole", "Parabole avec son foyer F et sa directrice.");
const ELLIPSE = schemaFig("t-ellipse", "Ellipse avec ses deux foyers F et F′ et un point M.");
const NUAGE = schemaFig("m1-nuage", "Nuage de points et droite d’ajustement passant par G₁ et G₂.");
const PLAN_INCLINE = schemaFig("t-plan-incline", "Solide sur un plan incliné d’un angle α, avec son poids et la réaction du plan.");
const PROJECTILE = schemaFig("t-projectile", "Trajectoire parabolique d’un projectile.");
const SATELLITE = schemaFig("t-satellite", "Satellite en orbite circulaire autour de la Terre.");
const SOLENOIDE = schemaFig("t-solenoide", "Lignes de champ d’un solénoïde.");
const LORENTZ = schemaFig("t-lorentz", "Trajectoire circulaire d’une particule chargée dans un champ magnétique.");
const LAPLACE = schemaFig("t-laplace", "Rails de Laplace dans un champ magnétique.");
const RL = schemaFig("t-rl", "Établissement du courant dans un dipôle RL.");
const RC = schemaFig("t-rc", "Courbes de charge et de décharge d’un condensateur.");
const RESONANCE = schemaFig("t-resonance", "Courbes de résonance d’un circuit RLC pour deux résistances.");
const PENDULE = schemaFig("t-pendule", "Pendule élastique et courbe de x en fonction du temps.");
const YOUNG = schemaFig("t-young", "Dispositif des fentes de Young et franges d’interférence.");
const PHOTOELECTRIQUE = schemaFig("t-photoelectrique", "Énergie cinétique maximale des électrons émis selon la fréquence de la lumière.");
const NIVEAUX = schemaFig("t-niveaux", "Diagramme des niveaux d’énergie de l’atome d’hydrogène.");
const ASTON = schemaFig("t-aston", "Courbe d’Aston : énergie de liaison par nucléon selon le nombre de masse.");
const DECROISSANCE = schemaFig("t-decroissance", "Courbe de décroissance radioactive.");
const CINETIQUE = schemaFig("t-cinetique", "Avancement d’une réaction en fonction du temps.");
const PH = schemaFig("p3-echelle-ph", "Échelle de pH de 0 à 14.");
const DOSAGE_FORT = schemaFig("t-dosage-fort", "Courbe de dosage d’un acide fort par une base forte.");
const PREDOMINANCE = schemaFig("t-predominance", "Diagramme de prédominance du couple acide éthanoïque / ion éthanoate.");
const DOSAGE_FAIBLE = schemaFig("t-dosage-faible", "Courbe de dosage d’un acide faible par une base forte.");
const ENCEPHALE = schemaFig("t-encephale", "L’encéphale vu de côté.");
const MOELLE = schemaFig("t-moelle", "Coupe transversale de la moelle épinière.");
const POTENTIEL = schemaFig("t-potentiel", "Courbe d’un potentiel d’action.");
const SYNAPSE = schemaFig("t-synapse", "Schéma d’une synapse chimique.");
const SARCOMERE = schemaFig("t-sarcomere", "Sarcomère relâché et sarcomère contracté.");
const GLYCEMIE = schemaFig("t-glycemie", "Boucle de régulation de la glycémie.");
const ANTICORPS = schemaFig("s3-anticorps", "Un anticorps fixé sur son antigène.");
const CYCLE_OVARIEN = schemaFig("t-cycle-ovarien", "Allure des taux d’hormones pendant un cycle de 28 jours.");
const CROISEMENT = schemaFig("t-croisement", "Échiquier de croisement de deux hybrides Aa.");
const REFLEXE = schemaFig("s3-arc-reflexe", "L’arc réflexe.");
const COEUR = schemaFig("s4-coeur", "Le cœur en coupe.");
const FLEUR = schemaFig("t-fleur", "Coupe d’une fleur.");
const PEDIGREE = schemaFig("t-pedigree", "Arbre généalogique d’une maladie récessive.");
const GUERRE_FROIDE = schemaFig("h3-frise-guerre-froide", "Frise de la guerre froide.");
const INDEPENDANCES = schemaFig("h3-independances", "Carte de l’Afrique colorée selon la date d’indépendance.");
const SENEGAL = schemaFig("h3-frise-senegal", "Frise du Sénégal de 1944 à 1960.");
const TRIADE = schemaFig("t-triade", "Planisphère des trois grands pôles de la mondialisation.");
const ACEUM = schemaFig("t-aceum", "Carte de l’Amérique du Nord.");
const UE = schemaFig("t-ue", "Carte des États de l’Union européenne.");
const ASIE = schemaFig("t-asie-pacifique", "Carte de l’Asie-Pacifique.");
const MERCOSUR = schemaFig("t-mercosur", "Carte de l’Amérique latine et du Mercosur.");
const PLUIES = schemaFig("g5-pluies", "Carte des pluies du Sénégal.");

/** Questions communes à plusieurs titres de chapitre (séries S1, S2, L). */
const ASYMPTOTE = ask("D’après la courbe, quelle droite est asymptote oblique ?", ["*y = x + 1", "x = 1", "y = x"], "quand x tend vers l’infini, f(x) − (x + 1) tend vers 0.", OBLIQUE);
const TVI_Q = tf("Si f est continue sur [a ; b] et si k est compris entre f(a) et f(b), l’équation f(x) = k a au moins une solution dans [a ; b].", true, "c’est le théorème des valeurs intermédiaires : la courbe coupe la droite y = k.", TVI);
const INFLEXION_Q = ask("Où se trouve le point d’inflexion de la courbe de x³ ?", ["*à l’origine O", "au point (1 ; 1)", "il n’y en a pas"], "la dérivée seconde 6x s’annule et change de signe en 0.", INFLEXION);
const EXP_Q = ask("Par quel point passe la courbe de la fonction exponentielle ?", ["*(0 ; 1)", "(1 ; 0)", "(0 ; 0)"], "e⁰ = 1.", EXP_LN);
const SYMETRIE_Q = tf("Les courbes de exp et de ln sont symétriques par rapport à la droite y = x.", true, "ce sont deux fonctions réciproques.", EXP_LN);
const INTEGRALE_Q = howMany("Calcule l’intégrale de 1 à 3 de 2x dx.", 8, "Une primitive de 2x est x² : 3² − 1² = 9 − 1 = 8.", INTEGRALE);
const SIMILITUDE_Q = howMany("Une similitude directe de centre Ω et de rapport 2 transforme M en M′, avec ΩM = 3 cm. Combien mesure ΩM′, en cm ?", 6, "ΩM′ = k × ΩM = 2 × 3 = 6 cm.", SIMILITUDE);
const MAYER = tf("La droite de Mayer passe par les points moyens G₁ et G₂ des deux moitiés du nuage.", true, "on partage le nuage en deux groupes de même effectif.", NUAGE);
const REPRODUCTION = [
  ask("D’après la courbe, quelle hormone présente un pic juste avant l’ovulation ?", ["*la LH", "la progestérone", "aucune"], "le pic de LH déclenche l’ovulation, vers le 14e jour.", CYCLE_OVARIEN),
];

export const EXTRA_TLE: SubjectExtras = {
  MATH: {
    Probabilités: [
      howMany("D’après l’arbre, quelle est la probabilité de Ā ∩ B̄ ?", 0.48, "On multiplie le long du chemin : 0,6 × 0,8 = 0,48.", ARBRE),
      howMany("Quelle est l’espérance de la loi binomiale de paramètres n = 6 et p = 0,5 ?", 3, "E(X) = n × p = 6 × 0,5 = 3.", BINOMIALE),
    ],
    "Nombres complexes": [
      howMany("Quel angle sépare deux racines sixièmes de l’unité voisines, en degrés ?", 60, "2π/6 = π/3, soit 60°.", RACINES),
    ],
    "Suites numériques": [
      howMany("D’après la construction en escalier, vers quelle limite la suite définie par u(n+1) = 0,5 u(n) + 2 converge-t-elle ?", 4, "La limite ℓ vérifie ℓ = 0,5ℓ + 2, soit ℓ = 4 : c’est le point où la courbe coupe y = x.", ESCALIER),
    ],
    "Limites et continuité": [ASYMPTOTE, TVI_Q],
    "Limites, continuité et fonction réciproque": [ASYMPTOTE, TVI_Q],
    "Étude de fonctions": [ASYMPTOTE],
    "Dérivation et étude de fonctions": [INFLEXION_Q],
    "Dérivées et primitives": [INFLEXION_Q],
    "Fonction logarithme népérien": [
      ask("Par quel point passe la courbe de ln ?", ["*(1 ; 0)", "(0 ; 1)", "(0 ; 0)"], "ln 1 = 0.", EXP_LN),
      SYMETRIE_Q,
    ],
    "Fonctions exponentielles et puissances": [EXP_Q, SYMETRIE_Q],
    "Fonction exponentielle et fonctions puissances": [EXP_Q, SYMETRIE_Q],
    "Fonction exponentielle": [EXP_Q],
    "Calcul intégral": [INTEGRALE_Q],
    "Équations différentielles": [
      ask("Quelles sont les solutions de l’équation y′ = −y ?", ["*les fonctions x ↦ C e⁻ˣ", "les fonctions x ↦ C eˣ", "les fonctions x ↦ −x + C"], "la condition initiale y(0) = 3 choisit C = 3.", EQUA_DIFF),
    ],
    "Isométries et similitudes planes": [SIMILITUDE_Q],
    "Nombres complexes et similitudes": [SIMILITUDE_Q],
    "Produit vectoriel et produit mixte": [
      tf("Le vecteur u ∧ v est orthogonal à u et à v.", true, "sa norme est l’aire du parallélogramme construit sur u et v.", VECTORIEL),
    ],
    Coniques: [
      howMany("Sur l’ellipse, MF + MF′ = 6 pour le point M. Combien vaut NF + NF′ pour un autre point N de l’ellipse ?", 6, "La somme des distances aux deux foyers est la même pour tous les points de l’ellipse.", ELLIPSE),
      ask("Pour un point M de la parabole, la distance MF est égale…", ["*à la distance de M à la directrice", "au double de la distance de M à la directrice", "à la distance de F à la directrice"], "MF = MH, où H est le projeté de M sur la directrice.", PARABOLE),
    ],
    "Statistiques à deux variables": [MAYER],
    "Statistique : ajustement linéaire": [MAYER],
  },
  PC: {
    "Applications des bases de la dynamique": [
      howMany("Un solide glisse sans frottement sur un plan incliné de 30°. Quelle est son accélération, en m/s² (g = 10 m/s²) ?", 5, "a = g sin α = 10 × 0,5 = 5 m/s².", PLAN_INCLINE),
      ask("Sans frottement et pour une même vitesse de lancement, la portée d’un projectile est maximale pour un angle de tir de…", ["*45°", "30°", "60°"], "la portée vaut v₀² sin(2α) ÷ g, maximale quand 2α = 90°.", PROJECTILE),
    ],
    "Gravitation universelle": [
      ask("La force qui maintient le satellite sur son orbite est dirigée…", ["*vers le centre de la Terre", "dans le sens de la vitesse", "vers l’extérieur de l’orbite"], "elle joue le rôle de force centripète.", SATELLITE),
    ],
    "Champs magnétiques": [
      tf("À l’intérieur d’un long solénoïde, le champ magnétique est uniforme.", true, "B = μ₀ n I : il est proportionnel à l’intensité du courant.", SOLENOIDE),
    ],
    "Particule chargée dans un champ magnétique uniforme": [
      tf("La force de Lorentz change la valeur de la vitesse de la particule.", false, "elle est toujours perpendiculaire à la vitesse : elle courbe la trajectoire sans changer la valeur de la vitesse.", LORENTZ),
    ],
    "Loi de Laplace": [
      howMany("Une tige de 0,1 m, parcourue par un courant de 5 A, est placée dans un champ de 0,2 T qui lui est perpendiculaire. Quelle est la force de Laplace, en newtons ?", 0.1, "F = I L B = 5 × 0,1 × 0,2 = 0,1 N.", LAPLACE),
    ],
    "Induction magnétique et dipôle (R, L)": [
      ask("D’après la courbe, à l’instant t = τ, le courant atteint environ…", ["*63 % de sa valeur finale", "100 % de sa valeur finale", "50 % de sa valeur finale"], "on lit 63 mA pour une valeur finale de 100 mA.", RL),
    ],
    "Étude du dipôle (R, C)": [
      howMany("Avec R = 1 000 Ω et C = 1 µF, quelle est la constante de temps τ = RC, en ms ?", 1, "τ = 1 000 × 10⁻⁶ = 10⁻³ s = 1 ms.", RC),
    ],
    "Oscillations électriques libres et forcées": [
      ask("D’après les courbes de résonance, pour quelle fréquence l’intensité est-elle maximale ?", ["*159 Hz", "100 Hz", "250 Hz"], "c’est la fréquence propre du circuit : la résonance.", RESONANCE),
      tf("D’après les courbes, plus la résistance est grande, plus la résonance est aiguë.", false, "avec R = 60 Ω, la courbe est plus aplatie : la résonance est floue.", RESONANCE),
    ],
    "Oscillations mécaniques libres": [
      ask("La période propre du pendule élastique dépend…", ["*de la masse et de la raideur du ressort", "de l’amplitude des oscillations", "de la longueur d’un fil"], "T₀ = 2π √(m/k).", PENDULE),
    ],
    "Interférences lumineuses": [
      howMany("Avec λ = 600 nm, D = 2 m et a = 1 mm, quelle est l’interfrange i, en mm ?", 1.2, "i = λD ÷ a = 600 × 10⁻⁹ × 2 ÷ 10⁻³ = 1,2 × 10⁻³ m = 1,2 mm.", YOUNG),
    ],
    "Effet photoélectrique": [
      ask("D’après le graphique, que représente la pente de la droite ?", ["*la constante de Planck h", "la fréquence seuil ν₀", "le travail d’extraction W₀"], "Ec max = hν − W₀ : la pente est h.", PHOTOELECTRIQUE),
    ],
    "Niveaux d’énergie de l’atome": [
      howMany("Quelle est l’énergie du photon émis lors de la transition du niveau n = 2 au niveau n = 1, en eV ?", 10.2, "E = −3,4 − (−13,6) = 10,2 eV (série de Lyman, ultraviolet).", NIVEAUX),
    ],
    "Réactions nucléaires": [
      ask("D’après la courbe d’Aston, quels noyaux sont les plus stables ?", ["*ceux proches du fer", "l’hydrogène et l’hélium", "l’uranium"], "leur énergie de liaison par nucléon est la plus grande.", ASTON),
      ask("Au bout de 3 périodes radioactives, combien reste-t-il de noyaux ?", ["*N₀/8", "N₀/3", "N₀/6"], "le nombre de noyaux est divisé par 2 à chaque période : N₀ ÷ 2³.", DECROISSANCE),
    ],
    "Cinétique chimique": [
      tf("D’après la courbe, la vitesse de la réaction diminue au cours du temps.", true, "la pente de la tangente diminue : les réactifs s’épuisent.", CINETIQUE),
    ],
    "Autoprotolyse de l’eau, pH et indicateurs colorés": [
      ask("À 25 °C, une solution de pH 9 est…", ["*basique", "acide", "neutre"], "son pH est supérieur à 7.", PH),
    ],
    "Acide fort, base forte et dosage": [
      howMany("D’après la courbe, quel volume de base faut-il verser pour atteindre l’équivalence, en mL ?", 20, "Le point d’équivalence est au milieu du saut de pH : E (20 mL ; 7).", DOSAGE_FORT),
    ],
    "Acides et bases faibles, couples acide-base": [
      ask("À pH = 3, quelle espèce domine pour le couple CH₃COOH / CH₃COO⁻ (pKa = 4,8) ?", ["*CH₃COOH", "CH₃COO⁻", "les deux à égalité"], "pH &lt; pKa : c’est l’acide qui domine.", PREDOMINANCE),
    ],
    "Réaction acide faible-base forte, effet tampon": [
      howMany("D’après la courbe de dosage, quel est le pKa du couple ?", 4.8, "À la demi-équivalence, pH = pKa = 4,8.", DOSAGE_FAIBLE),
    ],
  },
  SVT: {
    "Organisation du système nerveux cérébro-spinal": [
      ask("D’après le schéma, quelle partie de l’encéphale coordonne les mouvements ?", ["*le cervelet", "le bulbe", "la moelle épinière"], "le cerveau commande les mouvements volontaires ; le cervelet les coordonne.", ENCEPHALE),
      ask("Dans la moelle épinière, la racine dorsale contient les fibres…", ["*sensitives", "motrices", "sensitives et motrices"], "la racine ventrale contient les fibres motrices.", MOELLE),
    ],
    "Le tissu nerveux et ses propriétés": [
      howMany("D’après la courbe, quelle est la valeur du potentiel de repos, en mV ?", -70, "Avant la stimulation, l’intérieur de la fibre est négatif : −70 mV.", POTENTIEL),
      ask("Dans la synapse, le message nerveux traverse la fente synaptique grâce…", ["*à un neurotransmetteur", "à un courant électrique", "au sang"], "le neurotransmetteur se fixe sur les récepteurs du neurone postsynaptique.", SYNAPSE),
    ],
    "Activité du muscle strié squelettique": [
      tf("Pendant la contraction, les filaments d’actine et de myosine raccourcissent.", false, "ils glissent les uns entre les autres : c’est le sarcomère qui raccourcit.", SARCOMERE),
    ],
    "Régulation de la glycémie": [
      ask("Après un repas riche en sucres, quelle hormone le pancréas libère-t-il ?", ["*l’insuline", "le glucagon", "la progestérone"], "elle fait baisser la glycémie vers 1 g/L.", GLYCEMIE),
    ],
    Immunologie: [
      tf("Un anticorps peut se fixer sur n’importe quel antigène.", false, "la reconnaissance est spécifique : un anticorps ne reconnaît qu’un antigène.", ANTICORPS),
    ],
    "Reproduction chez les mammifères": REPRODUCTION,
    Génétique: [
      ask("Dans le croisement Aa × Aa, quelle proportion des descendants a le phénotype récessif ?", ["*1/4", "3/4", "1/2"], "seuls les aa (1 case sur 4) montrent le phénotype récessif.", CROISEMENT),
    ],
    "Rôle du système nerveux dans le comportement moteur": [
      ask("D’après le schéma, quel est le centre nerveux du réflexe ?", ["*la moelle épinière", "le cerveau", "le muscle"], "le message ne passe pas par le cerveau.", REFLEXE),
    ],
    "Activité cardiaque et régulation de la pression artérielle": [
      ask("D’après le schéma, quelle cavité envoie le sang dans l’aorte ?", ["*le ventricule gauche", "le ventricule droit", "l’oreillette droite"], "le cœur gauche envoie le sang riche en dioxygène vers les organes.", COEUR),
    ],
    "Reproduction chez les spermaphytes": [
      ask("D’après la coupe de la fleur, où se trouvent les ovules ?", ["*dans l’ovaire", "dans les étamines", "dans les pétales"], "après la fécondation, l’ovaire devient le fruit et les ovules les graines.", FLEUR),
    ],
    Biotechnologies: [
      tf("Deux parents sains peuvent avoir un enfant atteint d’une maladie récessive.", true, "chacun porte l’allèle de la maladie sans être malade.", PEDIGREE),
    ],
  },
  HG: {
    "Le monde au lendemain de la Seconde Guerre mondiale (1945-1990)": [
      ask("D’après la frise, en quelle année l’URSS disparaît-elle ?", ["*1991", "1989", "1962"], "le mur de Berlin était tombé en 1989.", GUERRE_FROIDE),
    ],
    "Décolonisation et affirmation du tiers-monde": [
      ask("D’après la carte, autour de quelle année la plupart des pays d’Afrique deviennent-ils indépendants ?", ["*1960", "1945", "1990"], "en 1960, 17 pays africains deviennent indépendants.", INDEPENDANCES),
    ],
    "La décolonisation en Afrique": [
      ask("D’après la frise, quelle loi de 1956 donne plus d’autonomie aux territoires d’Afrique noire française ?", ["*la loi-cadre", "la loi Lamine Guèye", "le référendum"], "la loi Lamine Guèye date de 1946, le référendum de 1958.", SENEGAL),
    ],
    "Le système-monde : des espaces interdépendants": [
      ask("D’après le planisphère, quels sont les trois grands pôles de la mondialisation ?", ["*l’Amérique du Nord, l’Union européenne et l’Asie orientale", "l’Afrique, l’Amérique latine et l’Océanie", "la Russie, l’Inde et le Brésil"], "les échanges mondiaux se concentrent entre ces trois pôles.", TRIADE),
    ],
    "L’espace nord-américain": [
      ask("D’après la carte, quels pays forment l’espace nord-américain ?", ["*le Canada, les États-Unis et le Mexique", "les États-Unis, Cuba et le Brésil", "le Canada, le Groenland et l’Islande"], "ils sont liés par un accord de libre-échange (ACEUM).", ACEUM),
    ],
    "L’espace européen": [
      howMany("D’après la carte, combien d’États compte l’Union européenne ?", 27, "Depuis la sortie du Royaume-Uni en 2020, l’Union européenne compte 27 États.", UE),
    ],
    "L’Asie-Pacifique": [
      ask("D’après la carte, quel pays s’est développé le premier en Asie orientale ?", ["*le Japon", "la Chine", "le Viêt Nam"], "puis les « dragons » (Corée du Sud, Taïwan…), la Chine et l’Asie du Sud-Est.", ASIE),
    ],
    "L’Amérique latine": [
      ask("D’après la carte, quel est le plus grand pays d’Amérique du Sud ?", ["*le Brésil", "l’Argentine", "le Venezuela"], "il occupe près de la moitié du continent.", MERCOSUR),
    ],
    "L’Afrique et le Sénégal": [
      ask("D’après la carte des pluies, quelle partie du Sénégal est la plus arrosée ?", ["*le sud", "le nord", "le centre-ouest"], "les pluies diminuent du sud vers le nord.", PLUIES),
    ],
  },
};
