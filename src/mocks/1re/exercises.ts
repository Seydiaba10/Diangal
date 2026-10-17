import "server-only";

// Exercices corrigés de 1re : une série par chapitre et par série (toutes séries). Les questions sont
// rangées par matière et par titre de chapitre ; un chapitre commun à plusieurs séries reçoit la même
// série. Écrits par DIANGAL d’après les leçons, à faire relire par des enseignants. Corrigés inclus : ce
// fichier ne doit jamais atteindre le navigateur.

import type { SubjectCode } from "@/types/domain";
import { CHAPTERS_1RE } from "../curriculum-1re";
import { buildExerciseSeries, type ExerciseSeries, type ExerciseSpec } from "../exercise-series";
import { LYCEE_SERIES_EXERCISES, MATH_1RE_SERIES_EXERCISES } from "../lycee/exercises";

const BANK: Partial<Record<SubjectCode, Record<string, ExerciseSpec[]>>> = {
  MATH: {
    "Généralités sur les fonctions et applications": [
      { qcm: "Une application à la fois injective et surjective est…", choices: ["*bijective", "constante", "périodique"], why: "Définition." },
      { vf: "x ↦ x² est injective sur IR.", answer: false, why: "f(−2) = f(2) = 4." },
      { qcm: "La période de la fonction cosinus est…", choices: ["π", "*2π", "π/2"], why: "cos(x + 2π) = cos x." },
    ],
    "Limites et continuité": [
      { num: "Limite en +∞ de (2x² + 1)/(x² − 3) ?", answer: 2, why: "Quotient des termes de plus haut degré." },
      { qcm: "∞ − ∞ est…", choices: ["*une forme indéterminée", "égal à 0", "égal à +∞"], why: "Il faut transformer l’expression." },
      { qcm: "Si lim f(x) = +∞ quand x tend vers 3, la droite x = 3 est…", choices: ["*asymptote verticale", "asymptote horizontale", "tangente"], why: "Définition." },
    ],
    "Dérivation et applications": [
      { qcm: "La dérivée de x³ est…", choices: ["x²", "*3x²", "3x"], why: "(xⁿ)’ = nxⁿ⁻¹." },
      { qcm: "La dérivée de 1/x est…", choices: ["*−1/x²", "1/x²", "ln x"], why: "Dérivée usuelle." },
      { num: "f(x) = x³ − 3x. Valeur du maximum local f(−1) ?", answer: 2, why: "−1 + 3 = 2." },
    ],
    "Étude de fonctions": [
      { qcm: "Si f(x) − (2x + 1) tend vers 0 en +∞, la droite y = 2x + 1 est…", choices: ["*asymptote oblique", "tangente", "axe de symétrie"], why: "Définition." },
      { qcm: "La droite x = a est axe de symétrie si…", choices: ["*f(2a − x) = f(x)", "f(2a − x) = −f(x)", "f(a) = 0"], why: "Symétrie par rapport à x = a." },
      { qcm: "Le tableau de variations s’obtient à partir…", choices: ["*du signe de la dérivée", "des limites seulement", "de la parité"], why: "Signe de f’." },
    ],
    "Suites numériques": [
      { num: "Calcule 1 + 2 + … + 100.", answer: 5050, why: "100 × 101 ÷ 2." },
      { num: "Suite géométrique : u₀ = 3, q = 2. Calcule u₄.", answer: 48, why: "3 × 2⁴." },
      { num: "Suite arithmétique : u₀ = 5, r = 3. Calcule u₁₀.", answer: 35, why: "5 + 10 × 3." },
    ],
    "Polynômes, équations et systèmes": [
      { num: "Somme des racines de 2x² − 6x + 1 = 0 ?", answer: 3, why: "−b/a = 6/2." },
      { num: "Produit des racines de 2x² − 6x + 1 = 0 ?", answer: 0.5, why: "c/a = 1/2." },
      { qcm: "Pour résoudre un système de 3 équations à 3 inconnues, on peut utiliser…", choices: ["*la méthode du pivot de Gauss", "le théorème de Pythagore", "la méthode de Mayer"], why: "Système triangulaire." },
    ],
    "Dénombrement": [
      { num: "Combien de podiums (1er, 2e, 3e) possibles avec 8 coureurs ?", answer: 336, why: "8 × 7 × 6." },
      { num: "Combien de comités de 2 personnes parmi 5 ?", answer: 10, why: "C(5, 2) = 10." },
      { num: "Combien de codes de 4 chiffres (0 à 9) ?", answer: 10000, why: "10⁴." },
    ],
    "Statistique à deux variables": [
      { qcm: "Le point moyen G a pour coordonnées…", choices: ["*(x̄ ; ȳ)", "(0 ; 0)", "(xmax ; ymax)"], why: "Moyennes des deux caractères." },
      { qcm: "La droite de Mayer passe par…", choices: ["*les points moyens des deux sous-groupes", "l’origine", "les points extrêmes"], why: "Méthode de Mayer." },
      { qcm: "Le coefficient de la droite des moindres carrés de y en x est…", choices: ["*cov(x, y) ÷ V(x)", "V(x) ÷ cov(x, y)", "x̄ ÷ ȳ"], why: "Formule du cours." },
    ],
    "Barycentre et lignes de niveau": [
      { num: "G barycentre de (A, 1), (B, 2), (C, 1) avec xA = 0, xB = 4, xC = 8. Calcule xG.", answer: 4, why: "(0 + 8 + 8) ÷ 4." },
      { qcm: "L’ensemble des points M tels que MA⃗ · MB⃗ = 0 est…", choices: ["*le cercle de diamètre [AB]", "la médiatrice de [AB]", "la droite (AB)"], why: "Angle droit en M." },
      { qcm: "L’ensemble des points M tels que MA = MB est…", choices: ["le cercle de diamètre [AB]", "*la médiatrice de [AB]", "le point A"], why: "Équidistance." },
    ],
    "Angles orientés et trigonométrie": [
      { qcm: "cos 2a =", choices: ["*2cos²a − 1", "2 sin a cos a", "cos²a + sin²a"], why: "Formule de duplication." },
      { qcm: "Les solutions de cos x = 1/2 sont…", choices: ["*π/3 + 2kπ ou −π/3 + 2kπ", "π/6 + 2kπ", "π/3 + kπ seulement"], why: "cos x = cos a." },
      { qcm: "Un angle inscrit mesure… l’angle au centre qui intercepte le même arc.", choices: ["*la moitié de", "le double de", "autant que"], why: "Propriété de l’angle inscrit." },
    ],
    "Transformations du plan": [
      { qcm: "Une isométrie conserve…", choices: ["*les distances", "seulement les angles", "seulement l’alignement"], why: "Définition." },
      { qcm: "La composée de deux rotations de même centre d’angles θ et θ’ est…", choices: ["*la rotation d’angle θ + θ’", "une translation", "une homothétie"], why: "Les angles s’ajoutent." },
      { qcm: "Deux symétries orthogonales d’axes sécants en O donnent…", choices: ["*une rotation de centre O", "une translation", "une symétrie centrale toujours"], why: "Angle double de celui des axes." },
    ],
    "Géométrie dans l’espace": [
      { num: "Produit scalaire de u⃗(1 ; 2 ; 3) et v⃗(3 ; 0 ; −1) ?", answer: 0, why: "3 + 0 − 3 = 0 : orthogonaux." },
      { qcm: "Un vecteur normal au plan 2x − y + 3z − 5 = 0 est…", choices: ["*(2 ; −1 ; 3)", "(−1 ; 3 ; −5)", "(2 ; 3 ; 5)"], why: "Coefficients de x, y, z." },
      { num: "Rayon de la sphère x² + y² + z² = 16 ?", answer: 4, why: "r² = 16." },
    ],
    "Primitives": [
      { qcm: "Une primitive de 3x² est…", choices: ["*x³", "6x", "3x³"], why: "(x³)’ = 3x²." },
      { qcm: "Une primitive de cos x est…", choices: ["*sin x", "−sin x", "cos x"], why: "(sin x)’ = cos x." },
      { num: "F primitive de 3x² + 2x avec F(0) = 1. Calcule F(1).", answer: 3, why: "F(x) = x³ + x² + 1." },
    ],
    "Systèmes et optimisation": [
      { num: "Contraintes x ≥ 0, y ≥ 0, x + y ≤ 10, x ≤ 6 ; maximum de B = 3x + 2y ?", answer: 26, why: "Atteint au sommet (6 ; 4)." },
      { qcm: "L’optimum d’une fonction linéaire sur un polygone de contraintes est atteint…", choices: ["*en un sommet", "au centre", "nulle part"], why: "Propriété de la programmation linéaire." },
      { qcm: "Le pivot de Gauss ramène un système à une forme…", choices: ["*triangulaire", "circulaire", "quadratique"], why: "On élimine les inconnues une à une." },
    ],
    "Polynômes et signe": [
      { qcm: "x³ − x se factorise en…", choices: ["*x(x − 1)(x + 1)", "x²(x − 1)", "(x − 1)³"], why: "x(x² − 1)." },
      { qcm: "x³ − x ≥ 0 pour x dans…", choices: ["*[−1 ; 0] ∪ [1 ; +∞[", "[0 ; 1]", "]−∞ ; −1]"], why: "Tableau de signes." },
      { num: "P(x) = x² − 5x + 6. Calcule P(2).", answer: 0, why: "4 − 10 + 6 = 0." },
    ],
    "Fonctions numériques : limites et continuité": [
      { num: "Limite de (x² − 4)/(x − 2) quand x tend vers 2 ?", answer: 4, why: "On simplifie : x + 2." },
      { qcm: "Limite de −3x² + x en +∞ ?", choices: ["+∞", "*−∞", "0"], why: "Terme de plus haut degré −3x²." },
      { vf: "Les fonctions polynômes sont continues sur IR.", answer: true, why: "Propriété du cours." },
    ],
    "Dérivation et étude de fonctions": [
      { qcm: "La dérivée de x² − 4x + 1 est…", choices: ["*2x − 4", "x − 4", "2x + 1"], why: "Règles de dérivation." },
      { num: "Minimum de f(x) = x² − 4x + 1 ?", answer: -3, why: "f(2) = −3." },
      { qcm: "Si f’ &gt; 0 sur un intervalle, f y est…", choices: ["*croissante", "décroissante", "constante"], why: "Signe de la dérivée." },
    ],
    "Suites arithmétiques et géométriques": [
      { num: "Salaire de 100 000 F augmenté de 5 000 F par an : salaire après 5 ans (F) ?", answer: 125000, why: "Suite arithmétique." },
      { num: "Suite géométrique u₀ = 1 000, q = 2 : u₃ ?", answer: 8000, why: "1 000 × 2³." },
      { qcm: "Un capital placé à 5 % d’intérêts composés est multiplié chaque année par…", choices: ["0,05", "*1,05", "5"], why: "Suite géométrique de raison 1,05." },
    ],
    "Statistique : ajustement par la méthode de Mayer": [
      { qcm: "Pour la méthode de Mayer, on partage la série en…", choices: ["*deux groupes", "trois groupes", "quatre groupes"], why: "Deux points moyens." },
      { qcm: "La droite de Mayer sert à…", choices: ["*faire des prévisions", "calculer une médiane", "dessiner un histogramme"], why: "Ajustement." },
      { vf: "La droite de Mayer passe par le point moyen de tout le nuage.", answer: true, why: "Elle passe par les deux points moyens partiels, donc aussi par le point moyen global." },
    ],
  },
  PC: {
    "Généralités sur la chimie organique": [
      { qcm: "L’atome de carbone est…", choices: ["bivalent", "*tétravalent", "monovalent"], why: "Quatre liaisons." },
      { qcm: "Des isomères ont…", choices: ["*la même formule brute et des formules développées différentes", "la même formule développée", "des masses molaires différentes"], why: "Définition." },
      { qcm: "La combustion complète d’un composé organique donne…", choices: ["*CO₂ et H₂O", "CO et C", "O₂ et H₂"], why: "Carbone et hydrogène oxydés." },
    ],
    "Les alcanes": [
      { qcm: "La formule générale des alcanes est…", choices: ["*CnH2n+2", "CnH2n", "CnH2n−2"], why: "Hydrocarbures saturés." },
      { num: "Combien de moles de O₂ pour brûler 1 mol de propane C₃H₈ ?", answer: 5, why: "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O." },
      { qcm: "Avec le dichlore à la lumière, un alcane donne une réaction de…", choices: ["*substitution", "addition", "polymérisation"], why: "Un H remplacé par un Cl." },
    ],
    "Les alcènes et les alcynes": [
      { qcm: "L’éthylène est un…", choices: ["*alcène", "alcane", "alcyne"], why: "Double liaison C=C." },
      { qcm: "L’eau de brome se décolore en présence…", choices: ["*d’un hydrocarbure insaturé", "d’un alcane", "d’eau pure"], why: "Addition du dibrome." },
      { qcm: "Le polyéthylène est obtenu par…", choices: ["*polymérisation de l’éthylène", "combustion du méthane", "électrolyse de l’eau"], why: "Polyaddition." },
    ],
    "Le benzène et les composés aromatiques": [
      { qcm: "La formule brute du benzène est…", choices: ["*C₆H₆", "C₆H₁₂", "C₆H₁₄"], why: "Cycle aromatique." },
      { qcm: "Le benzène donne surtout des réactions de…", choices: ["*substitution", "addition", "combustion lente"], why: "Stabilité du cycle." },
      { vf: "Le benzène est toxique.", answer: true, why: "Il faut le manipuler avec précaution." },
    ],
    "Les composés oxygénés": [
      { qcm: "Le groupe –COOH caractérise…", choices: ["un alcool", "une cétone", "*un acide carboxylique"], why: "Groupe carboxyle." },
      { qcm: "L’oxydation ménagée d’un alcool secondaire donne…", choices: ["un aldéhyde", "*une cétone", "un alcane"], why: "Règle du cours." },
      { qcm: "Le vinaigre contient…", choices: ["*de l’acide éthanoïque", "de l’éthanol pur", "du méthane"], why: "Acide acétique." },
    ],
    "Couples oxydant-réducteur ion métallique/métal": [
      { qcm: "Un oxydant…", choices: ["*capte des électrons", "cède des électrons", "ne change pas"], why: "Définition." },
      { qcm: "Une lame de zinc dans du sulfate de cuivre se recouvre de…", choices: ["*cuivre", "zinc", "rouille"], why: "Zn + Cu²⁺ → Zn²⁺ + Cu." },
      { num: "Potentiel standard (V) du couple de référence H⁺/H₂ ?", answer: 0, why: "Référence." },
    ],
    "Généralisation de l’oxydoréduction": [
      { qcm: "Lors d’une oxydation, le nombre d’oxydation…", choices: ["*augmente", "diminue", "reste égal"], why: "Perte d’électrons." },
      { qcm: "Dans Fe₂O₃ + 2 Al → 2 Fe + Al₂O₃, l’aluminium est…", choices: ["*le réducteur", "l’oxydant", "un catalyseur"], why: "Il est oxydé." },
      { qcm: "Une réaction redox sans solution aqueuse se fait…", choices: ["*par voie sèche", "par dilution", "par filtration"], why: "Exemple : aluminothermie." },
    ],
    "Les électrolyses": [
      { num: "Quantité d’électricité (C) pour I = 2 A pendant 1 930 s ?", answer: 3860, why: "Q = I × t." },
      { num: "Quantité d’électrons (mol) correspondant à 3 860 C (F = 96 500 C/mol) ?", answer: 0.04, why: "Q ÷ F." },
      { qcm: "À la cathode se produit…", choices: ["*une réduction", "une oxydation", "rien"], why: "Électrode reliée au pôle −." },
    ],
    "Travail et puissance mécaniques": [
      { num: "Travail (J) d’une force de 50 N sur 4 m dans le sens du déplacement ?", answer: 200, why: "W = F × d × cos 0." },
      { qcm: "Une force perpendiculaire au déplacement a un travail…", choices: ["*nul", "moteur", "résistant"], why: "cos 90° = 0." },
      { num: "Puissance (W) d’un travail de 600 J effectué en 2 min ?", answer: 5, why: "600 ÷ 120." },
    ],
    "L’énergie cinétique": [
      { num: "Énergie cinétique (J) d’une voiture de 1 000 kg à 20 m/s ?", answer: 200000, why: "½ × 1 000 × 400." },
      { qcm: "Si la vitesse double, l’énergie cinétique est…", choices: ["doublée", "*multipliée par 4", "inchangée"], why: "v² ." },
      { qcm: "La variation d’énergie cinétique est égale…", choices: ["*à la somme des travaux des forces", "au poids", "à la puissance"], why: "Théorème de l’énergie cinétique." },
    ],
    "Énergie potentielle et énergie mécanique": [
      { num: "Énergie potentielle (J) d’un objet de 2 kg à 5 m (g = 10 N/kg, origine au sol) ?", answer: 100, why: "mgz." },
      { num: "Vitesse (m/s) au sol d’un objet lâché de 5 m sans frottement (g = 10) ?", answer: 10, why: "√(2gh)." },
      { qcm: "Avec frottements, l’énergie mécanique…", choices: ["*diminue", "augmente", "reste constante"], why: "Dissipée en chaleur." },
    ],
    "La calorimétrie": [
      { num: "Chaleur (J) pour chauffer 2 kg d’eau de 20 °C à 100 °C (c = 4 180 J/kg/°C) ?", answer: 668800, why: "2 × 4 180 × 80." },
      { qcm: "Dans un calorimètre isolé, la somme des chaleurs échangées est…", choices: ["*nulle", "positive", "négative"], why: "Conservation de l’énergie." },
      { qcm: "Pendant un changement d’état d’un corps pur, la température…", choices: ["*reste constante", "augmente", "diminue"], why: "Q = mL." },
    ],
    "Force et champ électrostatiques": [
      { qcm: "Si la distance entre deux charges double, la force de Coulomb est…", choices: ["divisée par 2", "*divisée par 4", "doublée"], why: "En 1/r²." },
      { num: "Champ (V/m) entre deux plaques distantes de 0,02 m sous 100 V ?", answer: 5000, why: "E = U ÷ d." },
      { qcm: "L’unité du champ électrostatique est…", choices: ["*V/m", "N·m", "J"], why: "Volt par mètre." },
    ],
    "Travail de la force électrostatique et énergie potentielle électrostatique": [
      { qcm: "Le travail de la force électrostatique…", choices: ["*ne dépend pas du chemin suivi", "dépend de la longueur du trajet", "est toujours nul"], why: "Force conservative." },
      { num: "Travail (en mJ) de la force électrostatique sur q = 2 × 10⁻⁶ C entre deux points tels que U = 500 V ?", answer: 1, why: "W = qU = 10⁻³ J = 1 mJ." },
      { qcm: "1 eV vaut…", choices: ["*1,6 × 10⁻¹⁹ J", "1 J", "9 × 10⁹ J"], why: "Énergie d’un électron sous 1 V." },
    ],
    "L’énergie électrique dans un circuit": [
      { num: "Énergie (kWh) consommée par un fer de 1 000 W pendant 30 min ?", answer: 0.5, why: "1 kW × 0,5 h." },
      { num: "Puissance (W) d’un appareil sous 220 V parcouru par 2 A ?", answer: 440, why: "P = UI." },
      { qcm: "L’effet Joule transforme l’énergie électrique en…", choices: ["*chaleur", "lumière seulement", "énergie chimique"], why: "W = RI²t." },
    ],
    "Les condensateurs": [
      { num: "Charge (en mC) d’un condensateur de 100 μF sous 12 V ?", answer: 1.2, why: "Q = CU = 1,2 × 10⁻³ C." },
      { qcm: "En parallèle, les capacités…", choices: ["*s’additionnent", "se multiplient", "s’annulent"], why: "C = C₁ + C₂." },
      { qcm: "L’énergie stockée dans un condensateur vaut…", choices: ["*½ CU²", "CU", "C/U"], why: "Formule du cours." },
    ],
    "Ondes progressives et interférences mécaniques": [
      { num: "Longueur d’onde (m) d’une onde de 50 Hz se propageant à 10 m/s ?", answer: 0.2, why: "λ = v ÷ f." },
      { vf: "Une onde transporte de la matière.", answer: false, why: "Elle transporte de l’énergie." },
      { qcm: "Le son dans l’air est une onde…", choices: ["*longitudinale", "transversale", "électromagnétique"], why: "Compression-dilatation." },
    ],
    "Les lentilles minces": [
      { num: "Vergence (δ) d’une lentille de distance focale 0,25 m ?", answer: 4, why: "C = 1/f’." },
      { num: "Lentille f’ = 10 cm, objet à 30 cm devant : distance lentille-image (cm) ?", answer: 15, why: "Relation de conjugaison." },
      { qcm: "Un rayon passant par le centre optique…", choices: ["*n’est pas dévié", "passe par le foyer", "revient en arrière"], why: "Rayon particulier." },
    ],
    "Couples oxydant-réducteur et piles électrochimiques": [
      { qcm: "Dans la pile Daniell, le pôle négatif est…", choices: ["*la lame de zinc", "la lame de cuivre", "le pont salin"], why: "Le zinc est oxydé." },
      { num: "Force électromotrice (V) approximative de la pile Daniell ?", answer: 1.1, why: "E°(Cu²⁺/Cu) − E°(Zn²⁺/Zn) ≈ 1,1 V." },
      { qcm: "Une pile transforme l’énergie chimique en énergie…", choices: ["*électrique", "nucléaire", "lumineuse seulement"], why: "Générateur électrochimique." },
    ],
  },
  SVT: {
    "La cellule : techniques d’étude et organisation": [
      { qcm: "La respiration cellulaire a lieu dans…", choices: ["*les mitochondries", "les chloroplastes", "le noyau"], why: "Centrale énergétique." },
      { qcm: "Propre à la cellule végétale :", choices: ["*la paroi et les chloroplastes", "la membrane plasmique", "le cytoplasme"], why: "Les animaux n’en ont pas." },
      { qcm: "L’ultrastructure de la cellule s’observe…", choices: ["*au microscope électronique", "à la loupe", "à l’œil nu"], why: "Très fort grossissement." },
    ],
    "Bactéries et virus": [
      { qcm: "Une bactérie est une cellule…", choices: ["*sans noyau (procaryote)", "à noyau", "végétale"], why: "Procaryote." },
      { qcm: "Un virus se multiplie…", choices: ["*seulement dans une cellule hôte", "seul, par division", "dans l’eau"], why: "Parasite obligatoire." },
      { vf: "Les antibiotiques soignent les maladies virales.", answer: false, why: "Ils agissent sur les bactéries." },
    ],
    "Les échanges cellulaires": [
      { qcm: "Dans l’osmose, l’eau se déplace vers le milieu…", choices: ["*le plus concentré", "le moins concentré", "neutre"], why: "Hypertonique." },
      { qcm: "Une cellule végétale placée dans l’eau salée concentrée subit…", choices: ["la turgescence", "*la plasmolyse", "la mitose"], why: "Elle perd son eau." },
      { qcm: "Le transport actif consomme…", choices: ["*de l’énergie (ATP)", "de la lumière", "rien"], why: "Contre le gradient." },
    ],
    "Chromosomes et mitose": [
      { num: "Combien de chromosomes dans une cellule humaine non reproductrice ?", answer: 46, why: "2n = 46." },
      { qcm: "Les chromosomes s’alignent sur la plaque équatoriale pendant…", choices: ["la prophase", "*la métaphase", "la télophase"], why: "Étape de la mitose." },
      { qcm: "La mitose donne…", choices: ["*deux cellules identiques", "quatre cellules différentes", "une seule cellule"], why: "Reproduction conforme." },
    ],
    "La synthèse des protéines": [
      { qcm: "La transcription produit…", choices: ["*un ARN messager", "une protéine", "un chromosome"], why: "Copie de l’ADN." },
      { num: "Combien de nucléotides forment un codon ?", answer: 3, why: "Triplet." },
      { qcm: "La traduction a lieu…", choices: ["*sur les ribosomes", "dans le noyau", "dans la mitochondrie"], why: "Cytoplasme." },
    ],
    "La respiration cellulaire": [
      { num: "Combien de molécules de CO₂ libère l’oxydation complète d’une molécule de glucose ?", answer: 6, why: "C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O." },
      { qcm: "L’énergie est stockée sous forme…", choices: ["*d’ATP", "d’ADN", "d’eau"], why: "Monnaie énergétique." },
      { qcm: "La levure sans dioxygène réalise…", choices: ["*une fermentation alcoolique", "la photosynthèse", "la mitose"], why: "Production d’éthanol." },
    ],
    "Les aliments et la digestion": [
      { qcm: "L’amidon est digéré en…", choices: ["*glucose", "acides aminés", "glycérol"], why: "Par les amylases." },
      { qcm: "La pepsine agit dans…", choices: ["*l’estomac", "la bouche", "le gros intestin"], why: "Enzyme gastrique." },
      { vf: "La bile est une enzyme.", answer: false, why: "Elle émulsionne les graisses." },
    ],
    "La ration alimentaire": [
      { num: "Énergie (kJ) fournie par 10 g de lipides (38 kJ/g) ?", answer: 380, why: "10 × 38." },
      { qcm: "Le kwashiorkor est dû à un manque de…", choices: ["*protéines", "sucres", "eau"], why: "Carence protéique." },
      { qcm: "La ration augmente avec…", choices: ["*l’activité physique", "le sommeil", "l’âge avancé"], why: "Dépenses plus fortes." },
    ],
    "Introduction à la géologie et structure du globe": [
      { num: "Profondeur (km) de la discontinuité de Gutenberg ?", answer: 2900, why: "Limite manteau-noyau." },
      { qcm: "La limite entre la croûte et le manteau est…", choices: ["*le Moho", "la discontinuité de Gutenberg", "l’asthénosphère"], why: "Mohorovičić." },
      { qcm: "La lithosphère comprend…", choices: ["*la croûte et le sommet du manteau", "le noyau", "seulement les océans"], why: "Enveloppe rigide." },
    ],
    "Les roches magmatiques : granite et basalte": [
      { qcm: "Le granite a une structure…", choices: ["*grenue", "microlitique", "vitreuse"], why: "Refroidissement lent." },
      { qcm: "Le basalte de la presqu’île du Cap-Vert est une roche…", choices: ["*volcanique", "plutonique", "sédimentaire"], why: "Refroidissement rapide." },
      { qcm: "Un minéral typique du granite :", choices: ["*le quartz", "l’olivine", "le calcaire"], why: "Quartz, feldspaths, micas." },
    ],
    "Les roches sédimentaires et résiduelles": [
      { qcm: "La transformation d’un sédiment en roche s’appelle…", choices: ["*la diagenèse", "le métamorphisme", "la fusion"], why: "Tassement et cimentation." },
      { qcm: "La latérite est une roche…", choices: ["*résiduelle", "volcanique", "métamorphique"], why: "Reste sur place après altération." },
      { qcm: "Le grès est une roche…", choices: ["*détritique", "chimique", "magmatique"], why: "Grains de sable cimentés." },
    ],
    "Les roches métamorphiques et la tectonique": [
      { qcm: "Le métamorphisme se produit…", choices: ["*sans fusion, sous l’effet de la température et de la pression", "par fusion complète", "à la surface par l’érosion"], why: "Transformation à l’état solide." },
      { qcm: "Une cassure des roches avec déplacement s’appelle…", choices: ["un pli", "*une faille", "un filon"], why: "Déformation cassante." },
      { qcm: "L’argile peut devenir, par métamorphisme croissant,…", choices: ["*schiste puis gneiss", "basalte", "granite directement"], why: "Série métamorphique." },
    ],
    "Les ensembles géologiques et les ressources du Sénégal": [
      { qcm: "L’essentiel du Sénégal appartient…", choices: ["*au bassin sédimentaire sénégalo-mauritanien", "à une chaîne de montagnes", "à un volcan"], why: "Roches sédimentaires." },
      { qcm: "L’or est exploité au Sénégal à…", choices: ["*Sabodala", "Taïba", "Bargny"], why: "Socle du Sénégal oriental." },
      { qcm: "Les phosphates sont exploités à…", choices: ["*Taïba et Matam", "Kédougou", "Ziguinchor"], why: "Roches sédimentaires." },
    ],
    "L’absorption intestinale et le devenir des nutriments": [
      { qcm: "Les nutriments sont absorbés au niveau…", choices: ["*des villosités de l’intestin grêle", "de l’estomac", "de l’œsophage"], why: "Grande surface d’échange." },
      { qcm: "Les lipides absorbés passent surtout dans…", choices: ["*la lymphe", "l’urine", "l’air"], why: "Vaisseaux lymphatiques." },
      { qcm: "Le glucose absorbé gagne d’abord…", choices: ["*le foie", "le cerveau", "les poumons"], why: "Par la veine porte." },
    ],
  },
  HG: {
    "La révolution industrielle et ses conséquences": [
      { num: "En quelle année paraît le Manifeste du parti communiste ?", answer: 1848, why: "Marx et Engels." },
      { qcm: "La deuxième révolution industrielle repose sur…", choices: ["*l’électricité et le pétrole", "le charbon seul", "la voile"], why: "Fin du XIXe siècle." },
      { qcm: "Les ouvriers s’organisent en…", choices: ["*syndicats", "corporations royales", "ordres religieux"], why: "Défense de leurs intérêts." },
    ],
    "L’impérialisme européen en Afrique": [
      { qcm: "La conférence de Berlin a eu lieu en…", choices: ["*1884-1885", "1914", "1945"], why: "Partage de l’Afrique." },
      { qcm: "En 1914, l’un des seuls pays africains indépendants était…", choices: ["*l’Éthiopie", "le Sénégal", "le Ghana"], why: "Avec le Liberia." },
      { qcm: "La « mission civilisatrice » était…", choices: ["*une justification idéologique de la colonisation", "une organisation africaine", "un traité de paix"], why: "Doctrine coloniale." },
    ],
    "Les résistances africaines à l’impérialisme": [
      { num: "En quelle année Lat Dior meurt-il à Dékhélé ?", answer: 1886, why: "Résistance du Kayor." },
      { qcm: "Cheikh Ahmadou Bamba est exilé au…", choices: ["*Gabon", "Mali", "Maroc"], why: "De 1895 à 1902." },
      { qcm: "Le refus de l’impôt est une résistance…", choices: ["*passive", "armée", "diplomatique"], why: "Sans combat." },
    ],
    "L’impérialisme en Asie, en Amérique et dans les Caraïbes": [
      { qcm: "La Chine est ouverte de force par…", choices: ["*les guerres de l’opium", "la conférence de Berlin", "la révolution russe"], why: "XIXe siècle." },
      { num: "En quelle année commence l’ère Meiji au Japon ?", answer: 1868, why: "Modernisation du Japon." },
      { qcm: "Le canal de Panama est contrôlé au début du XXe siècle par…", choices: ["*les États-Unis", "la France", "l’Espagne"], why: "Impérialisme américain." },
    ],
    "La Première Guerre mondiale et l’Afrique": [
      { num: "En quelle année l’armistice met-il fin à la Première Guerre mondiale ?", answer: 1918, why: "Le 11 novembre." },
      { qcm: "Le traité qui sanctionne l’Allemagne en 1919 est…", choices: ["*le traité de Versailles", "le traité de Berlin", "la charte de l’ONU"], why: "Signé en 1919." },
      { qcm: "Les soldats africains de l’armée française étaient appelés…", choices: ["*tirailleurs", "spahis seulement", "légionnaires"], why: "Tirailleurs sénégalais." },
    ],
    "La révolution russe et la Chine de 1911 à 1945": [
      { qcm: "Le chef des bolcheviks en 1917 est…", choices: ["*Lénine", "Staline", "Trotski"], why: "Révolution d’octobre." },
      { num: "En quelle année naît l’URSS ?", answer: 1922, why: "Union des républiques socialistes soviétiques." },
      { qcm: "La Longue Marche est menée par…", choices: ["*Mao Zedong", "Sun Yat-sen", "Tchang Kaï-chek"], why: "1934-1935." },
    ],
    "La crise des années 1930, les fascismes et la faillite de la sécurité collective": [
      { num: "En quelle année a lieu le krach de Wall Street ?", answer: 1929, why: "Octobre 1929." },
      { qcm: "Hitler arrive au pouvoir en…", choices: ["*1933", "1922", "1939"], why: "Chancelier en janvier 1933." },
      { qcm: "L’Italie envahit l’Éthiopie en…", choices: ["*1935", "1914", "1945"], why: "Échec de la SDN." },
    ],
    "La Seconde Guerre mondiale et l’Afrique": [
      { num: "En quelle année commence la Seconde Guerre mondiale ?", answer: 1939, why: "Invasion de la Pologne." },
      { qcm: "Le massacre de tirailleurs à Thiaroye a lieu en…", choices: ["*1944", "1918", "1960"], why: "Le 1er décembre 1944." },
      { qcm: "Un tournant de la guerre en 1942-1943 :", choices: ["*Stalingrad", "Verdun", "Sarajevo"], why: "Défaite allemande." },
    ],
    "Le Sénégal de 1914 à 1945": [
      { qcm: "Le premier député africain élu à l’Assemblée française (1914) est…", choices: ["*Blaise Diagne", "Lamine Guèye", "Senghor"], why: "Député du Sénégal." },
      { num: "Combien de communes formaient les « Quatre Communes » ?", answer: 4, why: "Dakar, Gorée, Rufisque, Saint-Louis." },
      { qcm: "La bataille de Dakar a lieu en…", choices: ["*1940", "1914", "1944"], why: "Septembre 1940." },
    ],
    "Les inégalités de développement dans le monde": [
      { qcm: "L’IDH combine…", choices: ["*revenu, santé et éducation", "superficie et population", "exportations et importations"], why: "Indicateur de développement humain." },
      { qcm: "Un pays émergent :", choices: ["*le Brésil", "le Tchad", "la Norvège"], why: "Croissance rapide." },
      { vf: "Les inégalités existent aussi à l’intérieur d’un même pays.", answer: true, why: "Villes et campagnes." },
    ],
    "La population mondiale": [
      { qcm: "Taux d’accroissement naturel =", choices: ["*natalité − mortalité", "immigration − émigration", "natalité + mortalité"], why: "Définition." },
      { qcm: "La population mondiale dépasse…", choices: ["2 milliards", "*8 milliards", "20 milliards"], why: "Depuis 2022." },
      { num: "Densité (hab./km²) d’un pays de 18 000 000 habitants sur 200 000 km² ?", answer: 90, why: "Densité = population ÷ superficie." },
    ],
    "Les formes de mise en valeur agricole et la pêche": [
      { qcm: "L’arachide au Sénégal est surtout une culture…", choices: ["*commerciale", "vivrière uniquement", "industrielle européenne"], why: "Culture de rente." },
      { qcm: "Les pays neufs pratiquent une agriculture…", choices: ["*très mécanisée sur de grandes exploitations", "manuelle", "itinérante"], why: "États-Unis, Canada, Australie." },
      { qcm: "La ressource halieutique est menacée par…", choices: ["*la surpêche", "le repos biologique", "les aires marines protégées"], why: "Prélèvements excessifs." },
    ],
    "La ville et les activités urbaines": [
      { qcm: "Aujourd’hui, la majorité de l’humanité vit…", choices: ["*en ville", "à la campagne", "en mer"], why: "Urbanisation." },
      { qcm: "Touba illustre surtout une fonction urbaine…", choices: ["*religieuse", "portuaire", "industrielle"], why: "Ville sainte du mouridisme." },
      { qcm: "Un problème des villes du Sud :", choices: ["*les quartiers spontanés", "le manque d’habitants", "l’absence de commerce"], why: "Croissance non planifiée." },
    ],
    "Transports, échanges et intégration économique": [
      { qcm: "La plus grande part des marchandises mondiales voyage…", choices: ["*par mer", "par avion", "par rail"], why: "Environ 90 %." },
      { qcm: "L’organisation qui encadre le commerce mondial est…", choices: ["*l’OMC", "l’OMS", "l’UNESCO"], why: "Organisation mondiale du commerce." },
      { qcm: "L’échange inégal désigne…", choices: ["*des matières premières bon marché contre des produits manufacturés chers", "un commerce sans monnaie", "le troc"], why: "Déséquilibre Nord-Sud." },
    ],
  },
  FR: {
    "Le commentaire composé": [
      { qcm: "Un commentaire composé s’organise en…", choices: ["*axes de lecture", "paragraphes chronologiques", "résumés"], why: "Plan thématique." },
      { vf: "On analyse les procédés en les reliant au sens du texte.", answer: true, why: "Fond et forme sont liés." },
      { qcm: "Chaque idée s’appuie sur…", choices: ["*des citations analysées", "des opinions personnelles", "des dates"], why: "Preuves tirées du texte." },
    ],
    "La dissertation littéraire": [
      { qcm: "Un plan thèse, antithèse, synthèse est…", choices: ["*dialectique", "thématique", "chronologique"], why: "Il confronte des points de vue." },
      { qcm: "Les exemples d’une dissertation littéraire viennent…", choices: ["*des œuvres lues", "de l’actualité seulement", "de la vie privée"], why: "Culture littéraire." },
      { qcm: "On commence par…", choices: ["*analyser les mots clés du sujet", "écrire la conclusion", "recopier le sujet"], why: "Compréhension du sujet." },
    ],
    "L’argumentation": [
      { qcm: "Convaincre, c’est s’adresser…", choices: ["*à la raison", "aux sentiments", "aux sens"], why: "Arguments logiques." },
      { qcm: "Persuader, c’est surtout…", choices: ["*toucher les sentiments", "démontrer", "définir"], why: "Émotion." },
      { qcm: "Un connecteur d’opposition :", choices: ["donc", "*cependant", "de plus"], why: "Il marque une restriction." },
    ],
    "Le XVIIe siècle : le classicisme": [
      { num: "Combien d’unités compte la règle classique du théâtre ?", answer: 3, why: "Temps, lieu, action." },
      { qcm: "Molière est surtout un auteur de…", choices: ["*comédies", "tragédies", "romans"], why: "Le Misanthrope, Le Bourgeois gentilhomme." },
      { qcm: "La devise classique est…", choices: ["*plaire et instruire", "choquer pour réveiller", "l’art pour l’art"], why: "Idéal classique." },
    ],
    "Le XVIIIe siècle : les Lumières": [
      { qcm: "Candide est de…", choices: ["*Voltaire", "Rousseau", "Diderot"], why: "Conte philosophique (1759)." },
      { qcm: "L’Encyclopédie est dirigée par…", choices: ["*Diderot et d’Alembert", "Montesquieu", "Molière"], why: "Diffusion des savoirs." },
      { qcm: "Les Lettres persanes sont de…", choices: ["*Montesquieu", "Voltaire", "Hugo"], why: "Roman épistolaire (1721)." },
    ],
    "Le XIXe siècle : romantisme, réalisme, symbolisme": [
      { qcm: "Victor Hugo est un auteur…", choices: ["*romantique", "classique", "symboliste"], why: "Chef de file du romantisme." },
      { qcm: "Zola appartient au…", choices: ["*naturalisme", "romantisme", "classicisme"], why: "Les Rougon-Macquart." },
      { qcm: "Les Fleurs du mal sont de…", choices: ["*Baudelaire", "Balzac", "Lamartine"], why: "Recueil de 1857." },
    ],
    "La littérature négro-africaine": [
      { qcm: "L’Aventure ambiguë est de…", choices: ["*Cheikh Hamidou Kane", "Ousmane Sembène", "Ferdinand Oyono"], why: "Roman de 1961." },
      { qcm: "Une si longue lettre est de…", choices: ["*Mariama Bâ", "Aminata Sow Fall", "Ken Bugul"], why: "Roman de 1979." },
      { qcm: "Une vie de boy dénonce…", choices: ["*l’injustice coloniale", "la guerre froide", "la mondialisation"], why: "Ferdinand Oyono, 1956." },
    ],
  },
  ANG: {
    "Democracy and citizenship": [
      { qcm: "“I will vote,” he said. → He said he … vote.", choices: ["will", "*would", "votes"], why: "Will becomes would." },
      { qcm: "In reported speech, “tomorrow” becomes…", choices: ["*the next day", "yesterday", "today"], why: "Time shift." },
      { qcm: "A “ballot” is…", choices: ["*un bulletin de vote", "un candidat", "un parti"], why: "Vocabulary." },
    ],
    "Science and technology": [
      { qcm: "If I … a computer, I would learn programming.", choices: ["have", "*had", "will have"], why: "Second conditional: past simple." },
      { qcm: "If I … the minister, I would build labs.", choices: ["am", "*were", "be"], why: "Were for all persons." },
      { qcm: "If she studied, she … pass.", choices: ["will", "*would", "is"], why: "Would + verb." },
    ],
    "Women’s rights and gender equality": [
      { qcm: "Girls … leave school early. (past habit)", choices: ["*used to", "use to", "are used to"], why: "Used to + verb." },
      { qcm: "“Empowerment” means…", choices: ["*l’autonomisation", "le mariage", "le chômage"], why: "Vocabulary." },
      { vf: "“Equality” means that men and women have the same rights.", answer: true, why: "Definition." },
    ],
    "Migration": [
      { qcm: "When he arrived, he … all his money.", choices: ["spent", "*had spent", "has spent"], why: "Past perfect: earlier action." },
      { qcm: "Unemployment is a … factor of migration.", choices: ["*push", "pull", "neutral"], why: "It pushes people to leave." },
      { qcm: "The past perfect is formed with…", choices: ["*had + past participle", "have + -ing", "did + verb"], why: "Form." },
    ],
    "Media and communication": [
      { qcm: "I enjoy … to the radio.", choices: ["to listen", "*listening", "listen"], why: "Enjoy + -ing." },
      { qcm: "She decided … a blog.", choices: ["*to start", "starting", "start"], why: "Decide + to." },
      { qcm: "Before sharing news online, you should…", choices: ["*check the source", "share it quickly", "change the title"], why: "Fight fake news." },
    ],
    "Essay writing": [
      { qcm: "Each body paragraph starts with…", choices: ["*a topic sentence", "a conclusion", "a question"], why: "Main idea first." },
      { qcm: "A linking word to add an idea:", choices: ["however", "*in addition", "to conclude"], why: "Addition." },
      { qcm: "The introduction presents…", choices: ["*the topic and your opinion", "all your examples", "the bibliography"], why: "Essay structure." },
    ],
  },
};

/** Banque complète : tronc commun, matières propres aux séries LA, S3, S4, S5, G, T1 et T2, maths G et T. */
function bankFor(subject: SubjectCode): Record<string, ExerciseSpec[]> {
  return { ...BANK[subject], ...LYCEE_SERIES_EXERCISES[subject], ...(subject === "MATH" ? MATH_1RE_SERIES_EXERCISES : {}) };
}

const SERIES: ExerciseSeries[] = CHAPTERS_1RE.map((chapter) => {
  const questions = bankFor(chapter.subjectCode)[chapter.title];
  if (!questions) throw new Error(`Exercices (1RE) : aucune série pour « ${chapter.title} » (${chapter.subjectCode})`);
  return { subject: chapter.subjectCode, chapter: chapter.title, series: chapter.seriesCode ?? undefined, questions };
});

const built = buildExerciseSeries("1RE", CHAPTERS_1RE, SERIES);

export const QUESTIONS_1RE = built.questions;
export const ANSWER_KEYS_1RE = built.keys;
/** Chapitre de chaque question (banque utilisée par « Préparer mon prochain devoir »). */
export const QUESTION_CHAPTERS_1RE = built.questionChapters;
export const ASSESSMENTS_1RE = built.assessments;
