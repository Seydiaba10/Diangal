// Mathématiques de 3e (programme relevé : docs/programme/releve-ci-3e.md). Le chapitre « Théorème
// de Thalès » est dans lesson-content.ts. Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type Chapter3eSpec, exemple, formula, frac, liste, methode, retenir, tableau } from "./blocks";

const sqrt = (x: string) => `√${x}`;

/** Chapitres de maths placés avant Thalès (dans l'ordre du programme). */
export const MATH_3E_BEFORE_THALES: Chapter3eSpec[] = [
  {
    title: "Racine carrée",
    summary: "Définition, propriétés et calculs avec les racines carrées.",
    lessons: [
      {
        title: "Définition et propriétés",
        body: `<p>Soit a un nombre <strong>positif</strong>. La <strong>racine carrée</strong> de a, notée ${sqrt("a")}, est le nombre positif dont le carré est a.</p>
          ${formula(`(${sqrt("a")})² = a et ${sqrt("a²")} = a, pour a ≥ 0`)}
          <h2>Propriétés</h2>
          ${liste([
            `Pour a ≥ 0 et b ≥ 0 : ${sqrt("a × b")} = ${sqrt("a")} × ${sqrt("b")}.`,
            `Pour a ≥ 0 et b &gt; 0 : ${sqrt(frac("a", "b"))} = ${frac(sqrt("a"), sqrt("b"))}.`,
            `Attention : en général, ${sqrt("a + b")} ≠ ${sqrt("a")} + ${sqrt("b")}. Exemple : ${sqrt("9 + 16")} = ${sqrt("25")} = 5, mais ${sqrt("9")} + ${sqrt("16")} = 7.`,
          ])}
          ${retenir(`Un nombre négatif n’a pas de racine carrée. ${sqrt("36")} = 6 et non −6.`)}`,
      },
      {
        title: "Simplifier une racine carrée",
        body: `<p>Simplifier ${sqrt("a")}, c’est l’écrire sous la forme b${sqrt("c")} avec c entier le plus petit possible.</p>
          ${methode(["Décomposer a en produit d’un carré parfait et d’un autre nombre.", "Appliquer √(a × b) = √a × √b.", "Remplacer la racine du carré parfait par sa valeur."])}
          ${exemple([`${sqrt("72")} = ${sqrt("36 × 2")} = ${sqrt("36")} × ${sqrt("2")} = 6${sqrt("2")}.`, `3${sqrt("12")} − ${sqrt("27")} = 3 × 2${sqrt("3")} − 3${sqrt("3")} = 6${sqrt("3")} − 3${sqrt("3")} = 3${sqrt("3")}.`])}
          ${retenir("On ne peut additionner que des racines « semblables » : 2√3 + 5√3 = 7√3.")}`,
      },
      {
        title: "Rendre rationnel un dénominateur",
        body: `<p>On évite de laisser une racine carrée au dénominateur.</p>
          ${liste([
            `Avec un seul terme : ${frac("5", sqrt("2"))} = ${frac(`5${sqrt("2")}`, `${sqrt("2")} × ${sqrt("2")}`)} = ${frac(`5${sqrt("2")}`, "2")}.`,
            `Avec deux termes, on multiplie par l’<strong>expression conjuguée</strong> : ${frac("1", `${sqrt("3")} − 1`)} = ${frac(`${sqrt("3")} + 1`, `(${sqrt("3")} − 1)(${sqrt("3")} + 1)`)} = ${frac(`${sqrt("3")} + 1`, "3 − 1")} = ${frac(`${sqrt("3")} + 1`, "2")}.`,
          ])}
          ${retenir("L’expression conjuguée de √a − b est √a + b : leur produit vaut a − b² (identité remarquable).")}`,
      },
      {
        title: "Résoudre x² = a",
        body: `<p>Selon le signe de a, l’équation x² = a a 0, 1 ou 2 solutions.</p>
          ${tableau([
            ["Cas", "Solutions"],
            ["a &gt; 0", `x = ${sqrt("a")} ou x = −${sqrt("a")}`],
            ["a = 0", "x = 0"],
            ["a &lt; 0", "aucune solution"],
          ])}
          ${exemple(["x² = 49 donne x = 7 ou x = −7.", `x² = 5 donne x = ${sqrt("5")} ou x = −${sqrt("5")}.`, "x² = −4 n’a pas de solution : un carré est toujours positif."])}`,
      },
    ],
  },
  {
    title: "Calcul algébrique",
    summary: "Développer, factoriser et utiliser les identités remarquables.",
    lessons: [
      {
        title: "Développer et réduire",
        body: `<p><strong>Développer</strong>, c’est transformer un produit en somme. <strong>Réduire</strong>, c’est regrouper les termes semblables.</p>
          ${formula("k(a + b) = ka + kb &nbsp;&nbsp; (a + b)(c + d) = ac + ad + bc + bd")}
          ${exemple(["(2x + 3)(x − 4) = 2x² − 8x + 3x − 12 = 2x² − 5x − 12."])}
          ${retenir("Attention aux signes : −(a − b) = −a + b.")}`,
      },
      {
        title: "Les identités remarquables",
        body: `<p>Trois égalités sont à connaître par cœur :</p>
          ${formula("(a + b)² = a² + 2ab + b²")}
          ${formula("(a − b)² = a² − 2ab + b²")}
          ${formula("(a + b)(a − b) = a² − b²")}
          ${exemple(["(3x + 2)² = 9x² + 12x + 4.", "(x − 5)² = x² − 10x + 25.", "(2x + 7)(2x − 7) = 4x² − 49."])}
          ${retenir("(a + b)² n’est pas égal à a² + b² : il ne faut pas oublier le double produit 2ab.")}`,
      },
      {
        title: "Factoriser",
        body: `<p><strong>Factoriser</strong>, c’est transformer une somme en produit.</p>
          ${methode([
            "Chercher un <strong>facteur commun</strong> : 6x² + 9x = 3x(2x + 3).",
            "Sinon, reconnaître une <strong>identité remarquable</strong> : x² − 16 = (x − 4)(x + 4) ; x² + 6x + 9 = (x + 3)².",
            "Avec un facteur commun entre parenthèses : (x + 1)(2x − 3) + (x + 1)(x + 5) = (x + 1)(3x + 2).",
          ])}
          ${exemple(["Factoriser (2x − 1)² − 9 : c’est a² − b² avec a = 2x − 1 et b = 3.", "(2x − 1 − 3)(2x − 1 + 3) = (2x − 4)(2x + 2)."], "Exercice corrigé")}`,
      },
    ],
  },
  {
    title: "Équations et inéquations à une inconnue",
    summary: "Résoudre des équations et des inéquations du premier degré à une inconnue.",
    lessons: [
      {
        title: "Équations du premier degré",
        body: `<p>Résoudre une équation, c’est trouver toutes les valeurs de l’inconnue qui rendent l’égalité vraie.</p>
          ${methode(["Développer et réduire chaque membre.", "Regrouper les termes en x d’un côté, les nombres de l’autre.", "Diviser par le coefficient de x.", "Vérifier la solution."])}
          ${exemple(["3x − 7 = x + 5 ⇔ 3x − x = 5 + 7 ⇔ 2x = 12 ⇔ x = 6.", "Vérification : 3 × 6 − 7 = 11 et 6 + 5 = 11."])}`,
      },
      {
        title: "Équation produit nul",
        body: `<p>Un produit de facteurs est nul si et seulement si l’un au moins des facteurs est nul.</p>
          ${formula("A × B = 0 ⇔ A = 0 ou B = 0")}
          ${exemple(["(x − 3)(2x + 5) = 0 ⇔ x − 3 = 0 ou 2x + 5 = 0 ⇔ x = 3 ou x = −5/2.", "x² − 9 = 0 ⇔ (x − 3)(x + 3) = 0 ⇔ x = 3 ou x = −3."])}
          ${retenir("Pour résoudre une équation du second degré au BFEM, on la factorise d’abord, puis on applique le produit nul.")}`,
      },
      {
        title: "Inéquations du premier degré",
        body: `<p>On résout une inéquation comme une équation, avec une règle supplémentaire.</p>
          ${retenir("Quand on multiplie ou divise les deux membres par un nombre <strong>négatif</strong>, on <strong>change le sens</strong> de l’inégalité.")}
          ${exemple(["−2x + 4 &lt; 10 ⇔ −2x &lt; 6 ⇔ x &gt; −3 (on a divisé par −2).", "Les solutions sont tous les nombres strictement supérieurs à −3 : l’intervalle ]−3 ; +∞[."])}
          <p>On représente les solutions sur une droite graduée en hachurant la partie qui ne convient pas.</p>`,
      },
      {
        title: "Mettre un problème en équation",
        body: `${methode(["Choisir l’inconnue et l’écrire clairement.", "Traduire l’énoncé par une équation.", "Résoudre l’équation.", "Vérifier et répondre par une phrase."])}
          ${exemple([
            "Un père a 41 ans et son fils 9 ans. Dans combien d’années l’âge du père sera-t-il le triple de celui du fils ?",
            "Soit x le nombre d’années : 41 + x = 3(9 + x) ⇔ 41 + x = 27 + 3x ⇔ 14 = 2x ⇔ x = 7.",
            "Dans 7 ans : le père aura 48 ans et le fils 16 ans (48 = 3 × 16).",
          ], "Problème corrigé")}`,
      },
    ],
  },
  {
    title: "Équations et inéquations à deux inconnues",
    summary: "Systèmes d’équations et d’inéquations du premier degré à deux inconnues.",
    lessons: [
      {
        title: "Système de deux équations : la substitution",
        body: `<p>Un système de deux équations à deux inconnues x et y : on cherche les couples (x ; y) qui vérifient <strong>les deux</strong> équations.</p>
          ${methode(["Exprimer une inconnue en fonction de l’autre dans une équation.", "Remplacer (substituer) dans l’autre équation.", "Résoudre, puis calculer la seconde inconnue.", "Vérifier dans les deux équations."], "Méthode par substitution")}
          ${exemple(["{ x + y = 10 ; 2x − y = 5 }. De la 1re : y = 10 − x.", "Dans la 2e : 2x − (10 − x) = 5 ⇔ 3x = 15 ⇔ x = 5, puis y = 5.", "Solution : (5 ; 5)."])}`,
      },
      {
        title: "Système de deux équations : la combinaison",
        body: `<p>On additionne (ou soustrait) les équations, après les avoir multipliées, pour éliminer une inconnue.</p>
          ${exemple([
            "{ 3x + 2y = 16 ; x − 2y = 0 }. En additionnant : 4x = 16, donc x = 4.",
            "Puis 4 − 2y = 0, donc y = 2. Solution : (4 ; 2).",
          ])}
          ${retenir("On choisit la méthode la plus rapide : substitution si une inconnue est facile à isoler, combinaison sinon.")}`,
      },
      {
        title: "Résolution graphique et problèmes",
        body: `<p>Chaque équation du premier degré à deux inconnues est représentée par une <strong>droite</strong>. La solution du système est le <strong>point d’intersection</strong> des deux droites.</p>
          ${exemple([
            "Au marché, 2 kg de riz et 1 kg de sucre coûtent 1 500 F ; 1 kg de riz et 2 kg de sucre coûtent 1 800 F.",
            "Soit x le prix du kg de riz et y celui du sucre : { 2x + y = 1 500 ; x + 2y = 1 800 }.",
            "On trouve x = 400 F et y = 700 F.",
          ], "Problème corrigé")}`,
      },
      {
        title: "Inéquations à deux inconnues",
        body: `<p>Les solutions d’une inéquation comme 2x + y − 4 &gt; 0 forment un <strong>demi-plan</strong> limité par la droite d’équation 2x + y − 4 = 0.</p>
          ${methode(["Tracer la droite frontière.", "Tester un point qui n’est pas sur la droite (souvent l’origine O).", "Si le point vérifie l’inéquation, son demi-plan est la solution ; sinon, c’est l’autre.", "Hachurer la partie qui ne convient pas."])}
          ${retenir("Pour un système d’inéquations, la solution est l’intersection des demi-plans (partie non hachurée).")}`,
      },
    ],
  },
  {
    title: "Applications affines",
    summary: "Représenter et utiliser une application affine, y compris par intervalles.",
    lessons: [
      {
        title: "Applications linéaires et affines",
        body: `<p>Une <strong>application affine</strong> f associe à tout nombre x le nombre f(x) = ax + b, où a et b sont des réels fixés.</p>
          ${liste(["a est le <strong>coefficient</strong> (ou coefficient directeur), b l’<strong>ordonnée à l’origine</strong>.", "Si b = 0, f(x) = ax est une <strong>application linéaire</strong> (proportionnalité).", "Si a = 0, f est constante."])}
          ${exemple(["f(x) = 3x − 2 : f(0) = −2, f(4) = 10.", "L’image de 4 est 10 ; un antécédent de 10 est 4."])}`,
      },
      {
        title: "Représentation graphique",
        body: `<p>La représentation graphique d’une application affine est une <strong>droite</strong>. Celle d’une application linéaire passe par l’origine.</p>
          ${methode(["Calculer les images de deux nombres.", "Placer les deux points dans le repère.", "Tracer la droite qui passe par ces points."])}
          ${retenir("Le coefficient a donne la pente : si a &gt; 0, la droite « monte » ; si a &lt; 0, elle « descend ».")}`,
      },
      {
        title: "Déterminer une application affine",
        body: `<p>Si on connaît deux points A(x₁ ; y₁) et B(x₂ ; y₂) de la droite :</p>
          ${formula(`a = ${frac("y₂ − y₁", "x₂ − x₁")} &nbsp; puis b = y₁ − a x₁`)}
          ${exemple(["f(1) = 4 et f(3) = 10 : a = (10 − 4)/(3 − 1) = 3, b = 4 − 3 × 1 = 1. Donc f(x) = 3x + 1."])}`,
      },
      {
        title: "Applications affines par intervalles",
        body: `<p>Une application est affine <strong>par intervalles</strong> si son expression change selon l’intervalle où se trouve x.</p>
          ${exemple([
            "Un taxi demande 500 F de prise en charge puis 200 F par km jusqu’à 10 km, et 150 F par km au-delà.",
            "Pour 0 ≤ x ≤ 10 : f(x) = 200x + 500. Pour x &gt; 10 : f(x) = 150(x − 10) + 2 500.",
            "La représentation est faite de deux segments de droites qui se rejoignent au point (10 ; 2 500).",
          ])}
          ${retenir("La valeur absolue |x| est un exemple : |x| = x si x ≥ 0 et |x| = −x si x &lt; 0.")}`,
      },
    ],
  },
  {
    title: "Statistique",
    summary: "Effectifs, fréquences, moyenne et représentations graphiques.",
    lessons: [
      {
        title: "Vocabulaire, effectifs et fréquences",
        body: `${liste([
            "La <strong>population</strong> est l’ensemble étudié ; chaque élément est un <strong>individu</strong>.",
            "Le <strong>caractère</strong> est ce qu’on étudie (note, taille…) ; ses valeurs sont les <strong>modalités</strong>.",
            "L’<strong>effectif</strong> d’une modalité est le nombre d’individus qui la présentent ; l’effectif total est N.",
            `La <strong>fréquence</strong> d’une modalité est ${frac("effectif", "N")}, souvent écrite en pourcentage.`,
          ])}
          ${retenir("Les effectifs cumulés croissants s’obtiennent en ajoutant les effectifs de proche en proche ; la somme des fréquences vaut 1 (100 %).")}`,
      },
      {
        title: "La moyenne et le mode",
        body: `<p>La <strong>moyenne</strong> d’une série est la somme des valeurs divisée par l’effectif total.</p>
          ${formula(`moyenne = ${frac("n₁x₁ + n₂x₂ + … + nₚxₚ", "N")}`)}
          ${exemple([
            "Notes : 8 (3 élèves), 12 (5 élèves), 15 (2 élèves). N = 10.",
            "Moyenne = (3 × 8 + 5 × 12 + 2 × 15) / 10 = (24 + 60 + 30) / 10 = 11,4.",
            "Le <strong>mode</strong> est la valeur de plus grand effectif : ici 12.",
          ])}
          <p>Pour une série groupée en <strong>classes</strong>, on utilise le centre de chaque classe.</p>`,
      },
      {
        title: "Représentations graphiques",
        body: `${liste([
            "Le <strong>diagramme en bâtons</strong> : une hauteur proportionnelle à l’effectif de chaque valeur.",
            "Le <strong>diagramme circulaire</strong> : l’angle de chaque secteur vaut fréquence × 360°.",
            "L’<strong>histogramme</strong> : pour des classes, l’aire de chaque rectangle est proportionnelle à l’effectif.",
          ])}
          ${exemple(["Une modalité de fréquence 25 % occupe un secteur de 0,25 × 360° = 90°."])}`,
      },
    ],
  },
];

/** Chapitres de maths placés après Thalès. */
export const MATH_3E_AFTER_THALES: Chapter3eSpec[] = [
  {
    title: "Relations trigonométriques",
    summary: "Cosinus, sinus et tangente d’un angle aigu dans le triangle rectangle.",
    lessons: [
      {
        title: "Cosinus, sinus et tangente",
        body: `<p>Dans un triangle ABC rectangle en A, pour l’angle aigu B̂ :</p>
          ${formula(`cos B̂ = ${frac("côté adjacent", "hypoténuse")} = ${frac("AB", "BC")} &nbsp; sin B̂ = ${frac("côté opposé", "hypoténuse")} = ${frac("AC", "BC")} &nbsp; tan B̂ = ${frac("côté opposé", "côté adjacent")} = ${frac("AC", "AB")}`)}
          ${retenir("Le cosinus et le sinus d’un angle aigu sont compris entre 0 et 1, car l’hypoténuse est le plus grand côté.")}`,
      },
      {
        title: "Calculer une longueur",
        body: `${methode(["Repérer l’angle connu, l’hypoténuse, le côté adjacent et le côté opposé.", "Choisir la formule qui relie la longueur cherchée et la longueur connue.", "Isoler la longueur cherchée et calculer à la calculatrice (en degrés)."])}
          ${exemple(["ABC rectangle en A, BC = 8 cm et B̂ = 30°. Calculer AC.", `sin B̂ = ${frac("AC", "BC")}, donc AC = BC × sin 30° = 8 × 0,5 = 4 cm.`])}`,
      },
      {
        title: "Calculer un angle",
        body: `<p>Si l’on connaît deux côtés, on calcule le cosinus, le sinus ou la tangente de l’angle, puis on utilise la touche inverse de la calculatrice (cos⁻¹, sin⁻¹, tan⁻¹).</p>
          ${exemple(["ABC rectangle en A avec AB = 5 et AC = 5 : tan B̂ = 5/5 = 1, donc B̂ = 45°."])}`,
      },
      {
        title: "Relations entre cosinus, sinus et tangente",
        body: `<p>Pour tout angle aigu x :</p>
          ${formula(`cos² x + sin² x = 1 &nbsp;&nbsp; tan x = ${frac("sin x", "cos x")}`)}
          ${exemple([`Si cos x = 0,6 : sin² x = 1 − 0,36 = 0,64, donc sin x = 0,8 et tan x = ${frac("0,8", "0,6")} = ${frac("4", "3")}.`])}
          ${retenir("Valeurs à connaître : cos 60° = sin 30° = 1/2 ; cos 45° = sin 45° = √2/2 ; cos 30° = sin 60° = √3/2.")}`,
      },
    ],
  },
  {
    title: "Vecteurs",
    summary: "Égalité et somme de vecteurs, relation de Chasles.",
    lessons: [
      {
        title: "Égalité de deux vecteurs",
        body: `<p>Un <strong>vecteur</strong> AB⃗ est défini par une direction (celle de la droite (AB)), un sens (de A vers B) et une longueur AB.</p>
          ${retenir("AB⃗ = DC⃗ ⇔ ABCD est un parallélogramme (éventuellement aplati).")}
          ${liste(["Le vecteur nul AA⃗ se note 0⃗.", "Le vecteur opposé à AB⃗ est BA⃗ : AB⃗ + BA⃗ = 0⃗.", "I est le milieu de [AB] ⇔ AI⃗ = IB⃗."])}`,
      },
      {
        title: "Somme de vecteurs et relation de Chasles",
        body: `${formula("Relation de Chasles : AB⃗ + BC⃗ = AC⃗")}
          <p>Pour additionner deux vecteurs de même origine, on construit le parallélogramme : AB⃗ + AD⃗ = AC⃗ si ABCD est un parallélogramme.</p>
          ${exemple(["Simplifier AB⃗ + CA⃗ + BC⃗ = CA⃗ + AB⃗ + BC⃗ = CB⃗ + BC⃗ = 0⃗."], "Exercice corrigé")}`,
      },
      {
        title: "Produit d’un vecteur par un réel",
        body: `<p>Pour un réel k, le vecteur kAB⃗ a la même direction que AB⃗, une longueur |k| × AB, et le même sens si k &gt; 0 (sens contraire si k &lt; 0).</p>
          ${retenir("Deux vecteurs u⃗ et v⃗ sont colinéaires s’il existe un réel k tel que v⃗ = ku⃗. Trois points A, B, C sont alignés ⇔ AB⃗ et AC⃗ sont colinéaires.")}`,
      },
    ],
  },
  {
    title: "Repérage dans le plan",
    summary: "Coordonnées d’un vecteur, distance, milieu et équation d’une droite.",
    lessons: [
      {
        title: "Coordonnées d’un vecteur",
        body: `<p>Dans un repère, si A(x_A ; y_A) et B(x_B ; y_B), alors :</p>
          ${formula("AB⃗ (x_B − x_A ; y_B − y_A)")}
          ${exemple(["A(1 ; 3) et B(4 ; −1) : AB⃗(3 ; −4)."])}
          ${retenir("Deux vecteurs sont égaux si et seulement s’ils ont les mêmes coordonnées.")}`,
      },
      {
        title: "Milieu et distance",
        body: `${formula(`Milieu I de [AB] : I(${frac("x_A + x_B", "2")} ; ${frac("y_A + y_B", "2")})`)}
          ${formula("Dans un repère orthonormé : AB = √((x_B − x_A)² + (y_B − y_A)²)")}
          ${exemple(["A(1 ; 3) et B(4 ; −1) : I(2,5 ; 1) et AB = √(3² + (−4)²) = √25 = 5."])}`,
      },
      {
        title: "Équation d’une droite",
        body: `<p>Une droite non parallèle à l’axe des ordonnées a une équation de la forme <strong>y = ax + b</strong> : a est le coefficient directeur, b l’ordonnée à l’origine. Une droite parallèle à l’axe des ordonnées a une équation x = c.</p>
          ${exemple(["Droite passant par A(1 ; 2) et B(3 ; 8) : a = (8 − 2)/(3 − 1) = 3, et 2 = 3 × 1 + b donne b = −1. Équation : y = 3x − 1."])}`,
      },
      {
        title: "Droites parallèles et perpendiculaires",
        body: `<p>Soit (D) : y = ax + b et (D′) : y = a′x + b′.</p>
          ${liste(["(D) // (D′) ⇔ a = a′ (même coefficient directeur).", "Dans un repère orthonormé : (D) ⊥ (D′) ⇔ a × a′ = −1."])}
          ${exemple(["y = 2x + 1 et y = −½x + 3 sont perpendiculaires, car 2 × (−½) = −1."])}`,
      },
    ],
  },
  {
    title: "Angle inscrit et angle au centre",
    summary: "Propriétés des angles inscrits dans un cercle.",
    lessons: [
      {
        title: "Angle inscrit et angle au centre",
        body: `${liste([
            "Un <strong>angle inscrit</strong> dans un cercle a son sommet sur le cercle et ses côtés coupent le cercle.",
            "Un <strong>angle au centre</strong> a son sommet au centre O du cercle.",
            "Les deux angles <strong>interceptent le même arc</strong> s’ils s’appuient sur les mêmes points du cercle.",
          ])}
          ${retenir("La mesure d’un angle inscrit est égale à la moitié de celle de l’angle au centre qui intercepte le même arc.")}
          ${exemple(["Si l’angle au centre AÔB mesure 100°, tout angle inscrit AMB interceptant l’arc AB mesure 50°."])}`,
      },
      {
        title: "Angles inscrits interceptant le même arc",
        body: `${retenir("Deux angles inscrits qui interceptent le même arc ont la même mesure.")}
          ${retenir("Un angle inscrit qui intercepte un demi-cercle est droit : si [AB] est un diamètre et M un point du cercle, le triangle AMB est rectangle en M.", "Cas particulier")}
          ${exemple(["A, B, C, D sont sur un cercle et AĈB = 35°. Alors AD̂B = 35° si C et D sont du même côté de (AB)."])}`,
      },
      {
        title: "Polygones réguliers",
        body: `<p>Un polygone est <strong>régulier</strong> si tous ses côtés ont la même longueur et tous ses angles la même mesure. Il est inscrit dans un cercle.</p>
          ${formula(`Angle au centre d’un polygone régulier à n côtés : ${frac("360°", "n")}`)}
          ${exemple(["Hexagone régulier : angle au centre 360°/6 = 60° ; ses côtés sont égaux au rayon du cercle."])}`,
      },
    ],
  },
  {
    title: "Géométrie dans l’espace",
    summary: "Pyramides et cônes : sections, agrandissement et réduction.",
    lessons: [
      {
        title: "La pyramide et le cône",
        body: `${liste(["Une <strong>pyramide</strong> a une base polygonale et des faces latérales triangulaires qui se rejoignent au sommet.", "Un <strong>cône de révolution</strong> est engendré par la rotation d’un triangle rectangle autour d’un côté de l’angle droit."])}
          ${formula(`Volume = ${frac("aire de la base × hauteur", "3")}`)}
          ${exemple(["Pyramide à base carrée de côté 6 cm et de hauteur 5 cm : V = 36 × 5 / 3 = 60 cm³.", "Cône de rayon 3 cm et de hauteur 4 cm : V = π × 9 × 4 / 3 = 12π ≈ 37,7 cm³."])}`,
      },
      {
        title: "Sections planes",
        body: `<p>La section d’une pyramide ou d’un cône par un plan <strong>parallèle à la base</strong> est une réduction de la base.</p>
          ${liste(["Pyramide : la section est un polygone de même forme que la base.", "Cône : la section est un disque."])}
          ${retenir("Si la section est à la distance h′ du sommet et que la hauteur totale est h, le coefficient de réduction est k = h′/h.")}`,
      },
      {
        title: "Agrandissement et réduction",
        body: `<p>Dans un agrandissement ou une réduction de rapport k :</p>
          ${tableau([
            ["Grandeur", "Multipliée par"],
            ["Longueurs", "k"],
            ["Aires", "k²"],
            ["Volumes", "k³"],
          ])}
          ${exemple(["On coupe un cône de volume 120 cm³ à mi-hauteur (k = ½). Le petit cône a pour volume 120 × (½)³ = 15 cm³."])}`,
      },
    ],
  },
];
