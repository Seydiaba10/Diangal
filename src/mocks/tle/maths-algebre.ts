// Mathématiques de Terminale : probabilités, statistiques, nombres complexes et arithmétique
// (programmes S1-S3, S2-S4 et L de 2006, Office du Bac). Leçons rédigées par DIANGAL, à faire
// valider par un enseignant.

import { exemple, formula, frac, type LessonSpec, liste, methode, retenir, sqrt, sup, tableau, vec } from "./blocks";

/** Conjugué ou événement contraire : lettre surlignée (trait combinant U+0305). */
const bar = (x: string) => `${x}̅`;
const C = (n: string, p: string) => `C<sub>${n}</sub><sup>${p}</sup>`;

// ── Probabilités ────────────────────────────────────────────────────────────

export const PROBA_VOCABULAIRE: LessonSpec = {
  title: "Vocabulaire des probabilités et dénombrement",
  minutes: 15,
  body: `<p>Une <strong>expérience aléatoire</strong> a plusieurs résultats possibles, les <strong>issues</strong>. Leur ensemble est l’<strong>univers</strong> Ω. Un <strong>événement</strong> est une partie de Ω.</p>
    ${liste([
      "A ∩ B (« A et B ») ; A ∪ B (« A ou B ») ;",
      "A et B sont <strong>incompatibles</strong> si A ∩ B = ∅ ;",
      `l’événement <strong>contraire</strong> ${bar("A")} est formé des issues qui ne sont pas dans A.`,
    ])}
    <h2>Probabilité</h2>
    ${liste([
      "0 ≤ p(A) ≤ 1, p(Ω) = 1 et p(∅) = 0 ;",
      "p(A) est la somme des probabilités des issues qui composent A ;",
      `p(${bar("A")}) = 1 − p(A) et p(A ∪ B) = p(A) + p(B) − p(A ∩ B).`,
    ])}
    ${retenir(`En cas d’<strong>équiprobabilité</strong> (dé équilibré, tirage « au hasard ») : p(A) = ${frac("card A", "card Ω")}.`)}
    <h2>Dénombrer</h2>
    ${tableau([
      ["Situation", "Nombre de tirages"],
      ["p tirages successifs avec remise parmi n", "n<sup>p</sup>"],
      ["p tirages successifs sans remise (ordre compté)", "A<sub>n</sub><sup>p</sup> = n(n − 1)…(n − p + 1)"],
      ["p objets tirés simultanément (sans ordre)", `${C("n", "p")} = ${frac("n!", "p!(n − p)!")}`],
    ])}
    ${exemple([
      "Une urne contient 5 boules rouges et 3 vertes. On tire 2 boules simultanément.",
      `card Ω = ${C("8", "2")} = 28 ; p(« deux rouges ») = ${frac(C("5", "2"), "28")} = ${frac("10", "28")} = ${frac("5", "14")}.`,
    ])}`,
};

export const PROBA_CONDITIONNELLE: LessonSpec = {
  title: "Probabilité conditionnelle et indépendance",
  minutes: 15,
  body: `<p>Si p(B) ≠ 0, la probabilité de A <strong>sachant</strong> B est :</p>
    ${formula(`p<sub>B</sub>(A) = ${frac("p(A ∩ B)", "p(B)")}, d’où p(A ∩ B) = p(B) × p<sub>B</sub>(A)`)}
    <p>A et B sont <strong>indépendants</strong> si p(A ∩ B) = p(A) × p(B) : savoir que B est réalisé ne change pas la probabilité de A.</p>
    ${retenir(`<strong>Probabilités totales</strong> : si B₁, …, B<sub>n</sub> forment une partition de Ω, p(A) = p(A ∩ B₁) + … + p(A ∩ B<sub>n</sub>). Sur un arbre pondéré, on multiplie le long d’un chemin et on additionne les chemins qui mènent à A.`)}
    ${exemple([
      "2 % d’une population a une maladie M. Un test est positif (T) chez 95 % des malades et chez 3 % des personnes saines.",
      "p(T) = 0,02 × 0,95 + 0,98 × 0,03 = 0,019 + 0,0294 = 0,0484.",
      `p<sub>T</sub>(M) = ${frac("0,019", "0,0484")} ≈ 0,39 : un test positif ne signifie pas toujours qu’on est malade.`,
    ])}`,
};

export const VARIABLE_ALEATOIRE: LessonSpec = {
  title: "Variables aléatoires",
  minutes: 15,
  body: `<p>Une <strong>variable aléatoire</strong> X associe un nombre à chaque issue. Sa <strong>loi de probabilité</strong> donne les valeurs x₁, …, x<sub>n</sub> et les probabilités p<sub>i</sub> = p(X = x<sub>i</sub>), de somme 1.</p>
    ${liste([
      "Espérance : E(X) = x₁p₁ + x₂p₂ + … + x<sub>n</sub>p<sub>n</sub> (valeur moyenne sur un grand nombre d’expériences) ;",
      "Variance : V(X) = Σ p<sub>i</sub> x<sub>i</sub>² − E(X)² ; écart-type : σ(X) = √V(X) ;",
      "Fonction de répartition : F(x) = p(X ≤ x), fonction en escalier croissante de 0 à 1.",
    ])}
    ${exemple([
      "On lance un dé : on gagne 600 F si on obtient 6, 100 F pour 4 ou 5, et on perd 200 F sinon.",
      `Loi : p(X = 600) = ${frac("1", "6")}, p(X = 100) = ${frac("2", "6")}, p(X = −200) = ${frac("3", "6")}.`,
      `E(X) = ${frac("600 + 200 − 600", "6")} = ${frac("200", "6")} ≈ 33 F : en moyenne, le jeu est favorable au joueur.`,
    ])}
    ${retenir("Un jeu est équitable si l’espérance du gain est nulle.")}`,
};

export const LOI_BINOMIALE: LessonSpec = {
  title: "Épreuve de Bernoulli et loi binomiale",
  minutes: 15,
  body: `<p>Une <strong>épreuve de Bernoulli</strong> a deux issues : succès (probabilité p) ou échec (1 − p). Si on répète n fois cette épreuve de façon <strong>indépendante</strong>, le nombre X de succès suit la <strong>loi binomiale</strong> B(n ; p) :</p>
    ${formula(`p(X = k) = ${C("n", "k")} p${sup("k")} (1 − p)${sup("n − k")}, pour k = 0, 1, …, n`)}
    ${formula("E(X) = np et V(X) = np(1 − p)")}
    ${methode([
      "Repérer l’épreuve répétée et le succès, puis vérifier l’indépendance des répétitions.",
      "Donner n et p, puis appliquer la formule.",
      "« Au moins un succès » : passer par le contraire, p(X ≥ 1) = 1 − p(X = 0).",
    ])}
    ${exemple([
      `Un élève répond au hasard à un QCM de 5 questions à 4 choix : X suit B(5 ; ${frac("1", "4")}).`,
      `p(X = 3) = ${C("5", "3")} × (${frac("1", "4")})³ × (${frac("3", "4")})² = ${frac("90", "1024")} ≈ 0,088.`,
      `p(X ≥ 1) = 1 − (${frac("3", "4")})⁵ ≈ 0,76 ; E(X) = 5 × ${frac("1", "4")} = 1,25.`,
    ])}`,
};

// ── Statistiques (séries S2 et L) ───────────────────────────────────────────

export const SERIES_DOUBLES: LessonSpec = {
  title: "Séries statistiques à deux variables",
  minutes: 12,
  body: `<p>On étudie deux caractères x et y sur une même population (taille et poids, année et production…). Chaque individu donne un point M<sub>i</sub>(x<sub>i</sub> ; y<sub>i</sub>) : l’ensemble forme le <strong>nuage de points</strong>.</p>
    ${liste([
      `Point moyen G(x̄ ; ȳ), avec x̄ = ${frac("1", "n")} Σ x<sub>i</sub> et ȳ = ${frac("1", "n")} Σ y<sub>i</sub> ;`,
      `variance V(x) = ${frac("1", "n")} Σ x<sub>i</sub>² − x̄² et écart-type σ<sub>x</sub> = √V(x) ;`,
      `covariance cov(x, y) = ${frac("1", "n")} Σ x<sub>i</sub>y<sub>i</sub> − x̄ ȳ.`,
    ])}
    ${exemple([
      "Années (x) : 1, 2, 3, 4 ; ventes en millions de F (y) : 2, 3, 5, 6.",
      "x̄ = 2,5 et ȳ = 4 : G(2,5 ; 4).",
      "Σ x<sub>i</sub>y<sub>i</sub> = 2 + 6 + 15 + 24 = 47, donc cov(x, y) = 47 ÷ 4 − 2,5 × 4 = 1,75.",
      "Σ x<sub>i</sub>² = 30, donc V(x) = 7,5 − 6,25 = 1,25.",
    ])}
    ${retenir("Si le nuage a une forme allongée, on peut l’approcher par une droite : c’est l’ajustement linéaire.")}`,
};

export const AJUSTEMENT_LINEAIRE: LessonSpec = {
  title: "Ajustement linéaire et corrélation",
  minutes: 15,
  body: `<p>La <strong>droite de régression de y en x</strong> (méthode des moindres carrés) passe par le point moyen G et a pour équation y = ax + b avec :</p>
    ${formula(`a = ${frac("cov(x, y)", "V(x)")} et b = ȳ − a x̄`)}
    <p>Le <strong>coefficient de corrélation linéaire</strong> mesure la qualité de l’ajustement :</p>
    ${formula(`r = ${frac("cov(x, y)", "σ<sub>x</sub> σ<sub>y</sub>")}, avec −1 ≤ r ≤ 1`)}
    ${liste([
      "|r| proche de 1 (en pratique |r| ≥ 0,87) : forte corrélation, l’ajustement est justifié ;",
      "r &gt; 0 : y augmente quand x augmente ; r &lt; 0 : y diminue ;",
      "r proche de 0 : pas de lien linéaire.",
    ])}
    ${exemple([
      "Avec les données précédentes : a = 1,75 ÷ 1,25 = 1,4 et b = 4 − 1,4 × 2,5 = 0,5, donc y = 1,4x + 0,5.",
      "V(y) = (4 + 9 + 25 + 36) ÷ 4 − 16 = 2,5 ; r = 1,75 ÷ (√1,25 × √2,5) ≈ 0,99 : très bonne corrélation.",
      "Prévision pour l’année 6 : y ≈ 1,4 × 6 + 0,5 = 8,9 millions de F.",
    ])}
    ${retenir("Une prévision par la droite de régression n’a de sens que si la corrélation est forte et si on ne s’éloigne pas trop des données.")}`,
};

// ── Nombres complexes ───────────────────────────────────────────────────────

export const COMPLEXES_ALGEBRIQUE: LessonSpec = {
  title: "Forme algébrique et conjugué",
  minutes: 15,
  body: `<p>L’ensemble ℂ des <strong>nombres complexes</strong> prolonge ℝ : il contient un nombre i tel que i² = −1. Tout complexe s’écrit de façon unique z = a + ib (a, b réels) : a = Re(z) est la partie réelle, b = Im(z) la partie imaginaire.</p>
    ${liste([
      "On calcule comme avec des réels, en remplaçant i² par −1 ;",
      "z est réel si Im(z) = 0 ; z est imaginaire pur si Re(z) = 0 ;",
      `le <strong>conjugué</strong> de z = a + ib est ${bar("z")} = a − ib, et z × ${bar("z")} = a² + b².`,
    ])}
    ${retenir(`Pour écrire un quotient sous forme algébrique, on multiplie numérateur et dénominateur par le conjugué du dénominateur. Le conjugué d’une somme, d’un produit ou d’un quotient est la somme, le produit ou le quotient des conjugués.`)}
    ${exemple([
      "(2 + 3i)(1 − i) = 2 − 2i + 3i − 3i² = 5 + i.",
      `${frac("1 + 2i", "1 − i")} = ${frac("(1 + 2i)(1 + i)", "(1 − i)(1 + i)")} = ${frac("−1 + 3i", "2")}.`,
    ])}
    <p>Dans un repère orthonormé direct, le point M(a ; b) a pour <strong>affixe</strong> z = a + ib ; le vecteur ${vec("w")}(a ; b) aussi. Le conjugué correspond au symétrique par rapport à l’axe des abscisses.</p>`,
};

export const COMPLEXES_TRIGO: LessonSpec = {
  title: "Module, argument et forme exponentielle",
  minutes: 15,
  body: `<p>Pour z = a + ib ≠ 0, d’image M : le <strong>module</strong> |z| = ${sqrt("(a² + b²)")} = OM, et un <strong>argument</strong> θ est une mesure de l’angle (${vec("u")}, ${vec("OM")}), avec cos θ = ${frac("a", "|z|")} et sin θ = ${frac("b", "|z|")}.</p>
    ${formula("z = r(cos θ + i sin θ) = r e<sup>iθ</sup>, avec r = |z|")}
    ${liste([
      "|zz’| = |z| |z’| et arg(zz’) = arg z + arg z’ (modulo 2π) ;",
      `|${frac("z", "z’")}| = ${frac("|z|", "|z’|")} et arg ${frac("z", "z’")} = arg z − arg z’ ;`,
      "inégalité triangulaire : |z + z’| ≤ |z| + |z’| ;",
      "e<sup>iθ</sup> × e<sup>iθ’</sup> = e<sup>i(θ + θ’)</sup>.",
    ])}
    ${retenir(`Formule de <strong>Moivre</strong> : (cos θ + i sin θ)${sup("n")} = cos nθ + i sin nθ. Formules d’<strong>Euler</strong> : cos θ = ${frac("e<sup>iθ</sup> + e<sup>−iθ</sup>", "2")} et sin θ = ${frac("e<sup>iθ</sup> − e<sup>−iθ</sup>", "2i")}.`)}
    ${exemple([
      `z = 1 + i${sqrt("3")} : |z| = 2, cos θ = ½ et sin θ = ${frac(sqrt("3"), "2")}, donc z = 2e${sup("iπ/3")}.`,
      `(1 + i)⁸ = (${sqrt("2")} e${sup("iπ/4")})⁸ = 16 e${sup("2iπ")} = 16.`,
    ])}`,
};

export const COMPLEXES_EQUATIONS: LessonSpec = {
  title: "Équations du second degré dans ℂ",
  minutes: 15,
  body: `<p>Pour az² + bz + c = 0 (a ≠ 0), on calcule Δ = b² − 4ac.</p>
    ${liste([
      `Δ réel positif : deux racines réelles ${frac("−b ± √Δ", "2a")} ; Δ = 0 : une racine double −${frac("b", "2a")} ;`,
      `Δ réel négatif : deux racines complexes conjuguées ${frac("−b ± i√(−Δ)", "2a")} ;`,
      `Δ complexe : on cherche δ tel que δ² = Δ, et les racines sont ${frac("−b ± δ", "2a")}.`,
    ])}
    ${methode([
      "Écrire δ = x + iy ; δ² = Δ donne x² − y² = Re(Δ) et 2xy = Im(Δ).",
      "Ajouter l’égalité des modules : x² + y² = |Δ|.",
      "Résoudre, en choisissant les signes de x et y d’après le signe de xy.",
    ], "Racines carrées d’un complexe")}
    ${exemple([
      "z² − 2z + 5 = 0 : Δ = −16 = (4i)², donc z = 1 + 2i ou z = 1 − 2i.",
      "Racines carrées de 3 + 4i : x² − y² = 3, x² + y² = 5, xy &gt; 0, d’où ±(2 + i).",
    ])}
    ${retenir("Équation de degré 3 dont on connaît une racine z₀ : on factorise P(z) = (z − z₀)(az² + βz + γ), par identification ou division, puis on résout l’équation du second degré.")}`,
};

export const RACINES_NIEMES: LessonSpec = {
  title: "Racines n-ièmes d’un nombre complexe",
  minutes: 12,
  body: `<p>Les solutions de z${sup("n")} = 1 sont les <strong>racines n-ièmes de l’unité</strong> :</p>
    ${formula(`z<sub>k</sub> = e${sup("2ikπ/n")}, pour k = 0, 1, …, n − 1`)}
    <p>Leurs images sont les sommets d’un polygone régulier à n côtés inscrit dans le cercle trigonométrique ; leur somme est nulle.</p>
    ${retenir(`Si a = r e${sup("iθ")} (r &gt; 0), les solutions de z${sup("n")} = a sont z<sub>k</sub> = r${sup("1/n")} e${sup("i(θ + 2kπ)/n")}, k = 0, …, n − 1.`)}
    ${exemple([
      `Racines cubiques de l’unité : 1, j = e${sup("2iπ/3")} = −½ + i${frac(sqrt("3"), "2")} et j² = ${bar("j")}. On a 1 + j + j² = 0.`,
      `Solutions de z³ = 8i : 8i = 8e${sup("iπ/2")}, donc z<sub>k</sub> = 2e${sup("i(π/6 + 2kπ/3)")}, soit ${sqrt("3")} + i, −${sqrt("3")} + i et −2i.`,
    ])}`,
};

export const COMPLEXES_GEOMETRIE: LessonSpec = {
  title: "Nombres complexes et géométrie",
  minutes: 15,
  body: `<p>Si A, B, C ont pour affixes z<sub>A</sub>, z<sub>B</sub>, z<sub>C</sub> :</p>
    ${liste([
      "AB = |z<sub>B</sub> − z<sub>A</sub>| et (u⃗, AB⃗) = arg(z<sub>B</sub> − z<sub>A</sub>) ;",
      `(${vec("AB")}, ${vec("AC")}) = arg ${frac("z<sub>C</sub> − z<sub>A</sub>", "z<sub>B</sub> − z<sub>A</sub>")} et ${frac("AC", "AB")} = |${frac("z<sub>C</sub> − z<sub>A</sub>", "z<sub>B</sub> − z<sub>A</sub>")}|.`,
    ])}
    ${tableau([
      [`Le quotient Z = ${frac("z<sub>C</sub> − z<sub>A</sub>", "z<sub>B</sub> − z<sub>A</sub>")} est…`, "alors"],
      ["réel", "A, B, C sont alignés"],
      ["imaginaire pur", "(AB) ⊥ (AC)"],
      ["i ou −i", "ABC est rectangle isocèle en A"],
      ["e<sup>iπ/3</sup> ou e<sup>−iπ/3</sup>", "ABC est équilatéral"],
    ])}
    <h2>Transformations et écriture complexe</h2>
    ${liste([
      "z’ = z + b : translation de vecteur d’affixe b ;",
      "z’ − ω = k(z − ω), k réel non nul : homothétie de centre Ω(ω) et de rapport k ;",
      "z’ − ω = e<sup>iθ</sup>(z − ω) : rotation de centre Ω(ω) et d’angle θ.",
    ])}
    ${exemple([
      "A(1 + i), B(3 + 2i), C(3i) : Z = (−1 + 2i) ÷ (2 + i) = (−1 + 2i)(2 − i) ÷ 5 = i.",
      "Donc AB = AC et (AB⃗, AC⃗) = π/2 : ABC est rectangle isocèle en A.",
    ])}
    ${retenir("Quatre points A, B, C, D sont cocycliques (ou alignés) si le quotient [(z<sub>C</sub> − z<sub>A</sub>)/(z<sub>D</sub> − z<sub>A</sub>)] ÷ [(z<sub>C</sub> − z<sub>B</sub>)/(z<sub>D</sub> − z<sub>B</sub>)] est réel.")}`,
};

export const COMPLEXES_TRIGONOMETRIE: LessonSpec = {
  title: "Complexes et trigonométrie : linéariser, transformer",
  minutes: 15,
  body: `<h2>Linéariser avec Euler</h2>
    <p>Linéariser cos${sup("n")} x ou sin${sup("n")} x, c’est l’écrire comme une somme de cos(kx) et sin(kx), pour la dériver ou l’intégrer facilement.</p>
    ${exemple([
      `cos³ x = (${frac("e<sup>ix</sup> + e<sup>−ix</sup>", "2")})³ = ${frac("1", "8")}(e<sup>3ix</sup> + 3e<sup>ix</sup> + 3e<sup>−ix</sup> + e<sup>−3ix</sup>) = ${frac("cos 3x + 3 cos x", "4")}.`,
    ])}
    <h2>Développer avec Moivre</h2>
    ${exemple([
      "(cos x + i sin x)³ = cos 3x + i sin 3x. En développant le membre de gauche (binôme de Newton) et en identifiant les parties réelles : cos 3x = 4cos³ x − 3 cos x.",
    ])}
    <h2>Transformer p cos x + q sin x</h2>
    ${formula(`p cos x + q sin x = r cos(x − φ), avec r = ${sqrt("(p² + q²)")}, cos φ = ${frac("p", "r")}, sin φ = ${frac("q", "r")}`)}
    ${exemple([
      `Résoudre cos x + ${sqrt("3")} sin x = 1 : r = 2 et φ = ${frac("π", "3")}, donc cos(x − ${frac("π", "3")}) = ½.`,
      `x − ${frac("π", "3")} = ${frac("π", "3")} + 2kπ ou −${frac("π", "3")} + 2kπ : x = ${frac("2π", "3")} + 2kπ ou x = 2kπ.`,
    ])}
    ${retenir(`Pour z ≠ 1 : 1 + z + z² + … + z${sup("n")} = ${frac("1 − z<sup>n+1</sup>", "1 − z")} (somme géométrique, valable dans ℂ).`)}`,
};

export const SIMILITUDES_COMPLEXES: LessonSpec = {
  title: "Similitudes planes directes",
  minutes: 15,
  body: `<p>Une <strong>similitude directe</strong> est une transformation du plan dont l’écriture complexe est z’ = az + b, avec a ≠ 0. Elle multiplie les distances par k = |a| et conserve les angles orientés.</p>
    ${tableau([
      ["Cas", "Nature"],
      ["a = 1", "translation de vecteur d’affixe b"],
      ["a ≠ 1", `similitude de centre Ω d’affixe ω = ${frac("b", "1 − a")}, de rapport k = |a| et d’angle θ = arg a`],
    ])}
    ${retenir("Une similitude de centre Ω, de rapport k et d’angle θ est la composée (dans n’importe quel ordre) de l’homothétie de centre Ω de rapport k et de la rotation de centre Ω d’angle θ : z’ − ω = k e<sup>iθ</sup>(z − ω).")}
    ${liste([
      "elle transforme une droite en droite, un cercle de rayon R en cercle de rayon kR ;",
      "elle multiplie les aires par k² et conserve l’alignement, le parallélisme, l’orthogonalité ;",
      "la composée de deux similitudes directes de rapports k, k’ et d’angles θ, θ’ a pour rapport kk’ et pour angle θ + θ’.",
    ])}
    ${exemple([
      "z’ = (1 + i)z + 2 : a = 1 + i, donc k = √2 et θ = π/4.",
      "Centre : ω = 2 ÷ (1 − (1 + i)) = 2 ÷ (−i) = 2i.",
    ])}
    ${methode([
      "Si s transforme A en A’ et B en B’ (A ≠ B), on résout le système z<sub>A’</sub> = a z<sub>A</sub> + b et z<sub>B’</sub> = a z<sub>B</sub> + b.",
      "On obtient a = (z<sub>B’</sub> − z<sub>A’</sub>) ÷ (z<sub>B</sub> − z<sub>A</sub>), puis b = z<sub>A’</sub> − a z<sub>A</sub>.",
    ], "Déterminer une similitude par deux points et leurs images")}`,
};

// ── Arithmétique (séries S1 et S3) ──────────────────────────────────────────

export const DIVISIBILITE: LessonSpec = {
  title: "Divisibilité et division euclidienne",
  minutes: 12,
  body: `<p>Pour des entiers relatifs a et b, <strong>b divise a</strong> (noté b | a) s’il existe un entier k tel que a = kb ; on dit aussi que a est un multiple de b.</p>
    ${liste([
      "si b | a et a | c, alors b | c ;",
      "si d | a et d | b, alors d divise toute combinaison au + bv (u, v entiers).",
    ])}
    <h2>Division euclidienne</h2>
    ${formula("a = bq + r, avec 0 ≤ r &lt; |b| (q quotient, r reste, uniques)")}
    ${exemple([
      "137 = 12 × 11 + 5 : le quotient est 11 et le reste 5.",
      "−17 = 5 × (−4) + 3 : le reste est 3 (il doit être positif), pas −2.",
    ])}
    ${retenir("Tout entier n s’écrit 2k ou 2k + 1 ; de même 3k, 3k + 1 ou 3k + 2. On raisonne souvent « selon le reste de n ».")}
    ${exemple(["Pour tout entier n, n(n + 1) est pair : l’un des deux entiers consécutifs est pair."])}`,
};

export const PGCD_PPCM: LessonSpec = {
  title: "PGCD, PPCM et algorithme d’Euclide",
  minutes: 15,
  body: `<p>Le <strong>PGCD</strong> de a et b est leur plus grand diviseur commun ; le <strong>PPCM</strong> leur plus petit multiple commun strictement positif. Si PGCD(a, b) = 1, a et b sont <strong>premiers entre eux</strong>.</p>
    ${retenir("Si a = bq + r, alors PGCD(a, b) = PGCD(b, r). Le dernier reste non nul de l’algorithme d’Euclide est le PGCD.", "Algorithme d’Euclide")}
    ${exemple([
      "PGCD(1071 ; 462) : 1071 = 2 × 462 + 147 ; 462 = 3 × 147 + 21 ; 147 = 7 × 21 + 0.",
      "Le dernier reste non nul est 21 : PGCD(1071 ; 462) = 21.",
    ])}
    ${formula("PGCD(a, b) × PPCM(a, b) = |ab|")}
    ${exemple([`PPCM(1071 ; 462) = ${frac("1071 × 462", "21")} = 1071 × 22 = 23 562.`])}
    ${liste([
      "PGCD(ka, kb) = k PGCD(a, b) pour k &gt; 0 ;",
      "les diviseurs communs à a et b sont les diviseurs de leur PGCD ;",
      "pour plusieurs entiers : PGCD(a, b, c) = PGCD(PGCD(a, b), c).",
    ])}`,
};

export const NOMBRES_PREMIERS: LessonSpec = {
  title: "Nombres premiers et décomposition",
  minutes: 12,
  body: `<p>Un entier naturel p est <strong>premier</strong> s’il a exactement deux diviseurs positifs : 1 et p. Les premiers sont 2, 3, 5, 7, 11, 13, 17, 19, 23, 29… Il y en a une infinité.</p>
    ${retenir(`Si n ≥ 2 n’est divisible par aucun nombre premier p tel que p² ≤ n, alors n est premier.`)}
    ${exemple(["127 : on teste 2, 3, 5, 7 et 11 (car 13² = 169 &gt; 127). Aucun ne divise 127 : il est premier."])}
    <h2>Décomposition en facteurs premiers</h2>
    <p>Tout entier n ≥ 2 s’écrit de façon unique (à l’ordre près) comme produit de nombres premiers.</p>
    ${exemple([
      "360 = 2³ × 3² × 5.",
      "Nombre de diviseurs de 360 : (3 + 1)(2 + 1)(1 + 1) = 24.",
    ])}
    ${methode([
      "Décomposer chaque nombre.",
      "PGCD : produit des facteurs communs, chacun avec son plus petit exposant.",
      "PPCM : produit de tous les facteurs, chacun avec son plus grand exposant.",
    ], "PGCD et PPCM par la décomposition")}
    ${exemple(["84 = 2² × 3 × 7 et 90 = 2 × 3² × 5 : PGCD = 2 × 3 = 6 ; PPCM = 2² × 3² × 5 × 7 = 1260."])}`,
};

export const BEZOUT_GAUSS: LessonSpec = {
  title: "Théorèmes de Bézout et de Gauss",
  minutes: 15,
  body: `${retenir("<strong>Bézout</strong> : a et b sont premiers entre eux si et seulement s’il existe des entiers u et v tels que au + bv = 1.")}
    ${retenir("<strong>Gauss</strong> : si a divise bc et si a est premier avec b, alors a divise c.")}
    <p>Conséquence : l’équation ax + by = c a des solutions entières si et seulement si PGCD(a, b) divise c.</p>
    ${methode([
      "Trouver une solution particulière (x₀ ; y₀) (à vue, ou en remontant l’algorithme d’Euclide).",
      "Soustraire : a(x − x₀) = −b(y − y₀).",
      "Avec a et b premiers entre eux, Gauss donne b | (x − x₀) : x = x₀ + bk, puis y = y₀ − ak (k entier).",
      "Vérifier en remplaçant.",
    ], "Résoudre ax + by = c")}
    ${exemple([
      "Résoudre 5x + 3y = 1. Solution particulière : (2 ; −3), car 10 − 9 = 1.",
      "5(x − 2) = −3(y + 3). 5 et 3 sont premiers entre eux, donc 3 divise x − 2 : x = 2 + 3k.",
      "Alors y = −3 − 5k. Les solutions sont les couples (2 + 3k ; −3 − 5k), k ∈ ℤ.",
    ])}`,
};

export const CONGRUENCES: LessonSpec = {
  title: "Congruences",
  minutes: 15,
  body: `<p>Soit n ≥ 2. a est <strong>congru</strong> à b modulo n, noté a ≡ b [n], si n divise a − b, c’est-à-dire si a et b ont le même reste dans la division par n.</p>
    ${liste([
      "si a ≡ b [n] et c ≡ d [n], alors a + c ≡ b + d [n] et ac ≡ bd [n] ;",
      "si a ≡ b [n], alors a<sup>k</sup> ≡ b<sup>k</sup> [n] pour tout entier naturel k.",
    ])}
    ${retenir("<strong>Petit théorème de Fermat</strong> : si p est premier, x<sup>p</sup> ≡ x [p] pour tout entier x ; si de plus p ne divise pas x, x<sup>p−1</sup> ≡ 1 [p].")}
    ${exemple([
      "Reste de 3<sup>100</sup> dans la division par 7. Fermat : 3<sup>6</sup> ≡ 1 [7].",
      "100 = 6 × 16 + 4, donc 3<sup>100</sup> = (3<sup>6</sup>)<sup>16</sup> × 3<sup>4</sup> ≡ 3<sup>4</sup> = 81 ≡ 4 [7]. Le reste est 4.",
    ])}
    ${exemple(["10 ≡ 1 [9], donc un nombre est congru à la somme de ses chiffres modulo 9 : il est divisible par 9 si et seulement si cette somme l’est."], "Critère de divisibilité")}`,
};

export const NUMERATION: LessonSpec = {
  title: "Systèmes de numération",
  minutes: 12,
  body: `<p>En base b (b ≥ 2), un entier s’écrit avec des chiffres de 0 à b − 1 :</p>
    ${formula("N = a<sub>k</sub> b<sup>k</sup> + … + a<sub>1</sub> b + a<sub>0</sub>, noté a<sub>k</sub>…a<sub>1</sub>a<sub>0</sub> en base b")}
    ${liste([
      "base 2 (binaire, utilisée en informatique) : chiffres 0 et 1 ;",
      "base 16 (hexadécimale) : chiffres 0 à 9 puis A = 10, B = 11, …, F = 15.",
    ])}
    ${methode([
      "Diviser N par b : le reste est le chiffre des unités a₀.",
      "Recommencer avec le quotient, jusqu’à obtenir un quotient nul.",
      "Lire les restes du dernier au premier.",
    ], "Passer de la base 10 à la base b")}
    ${exemple([
      "45 = 32 + 8 + 4 + 1 = 2<sup>5</sup> + 2<sup>3</sup> + 2<sup>2</sup> + 1 : 45 s’écrit 101101 en base 2.",
      "2024 = 7 × 256 + 14 × 16 + 8 : 2024 s’écrit 7E8 en base 16.",
      "2024 = 3 × 625 + 1 × 125 + 0 × 25 + 4 × 5 + 4 : 2024 s’écrit 31044 en base 5.",
    ])}`,
};
