// Mathématiques de Terminale : probabilités, statistiques, nombres complexes et arithmétique
// (programmes S1-S3, S2-S4 et L de 2006, Office du Bac). Leçons rédigées par DIANGAL, à faire
// valider par un enseignant.

import { auBac, erreurs, exemple, exercice, formula, frac, type LessonSpec, liste, methode, objectifs, retenir, sqrt, sup, tableau, vec } from "./blocks";

/** Conjugué ou événement contraire : lettre surlignée (trait combinant U+0305). */
const bar = (x: string) => `${x}̅`;
const C = (n: string, p: string) => `C<sub>${n}</sub><sup>${p}</sup>`;

// ── Probabilités ────────────────────────────────────────────────────────────

export const PROBA_VOCABULAIRE: LessonSpec = {
  title: "Vocabulaire des probabilités et dénombrement",
  minutes: 30,
  body: `${objectifs([
      "utiliser le vocabulaire des probabilités ;",
      "dénombrer avec les arrangements et les combinaisons ;",
      "calculer une probabilité en situation d’équiprobabilité.",
    ])}
    <p>Une <strong>expérience aléatoire</strong> a plusieurs résultats possibles, les <strong>issues</strong>. Leur ensemble est l’<strong>univers</strong> Ω. Un <strong>événement</strong> est une partie de Ω.</p>
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
    ])}
    ${exercice(
      "Une classe compte 18 filles et 12 garçons. On choisit au hasard 3 délégués. Calcule la probabilité d’avoir : a) 3 filles ; b) au moins un garçon ; c) exactement 2 filles.",
      [
        "Tirage simultané : card Ω = C<sub>30</sub><sup>3</sup> = 4 060.",
        "a) p = C<sub>18</sub><sup>3</sup> ÷ 4 060 = 816 ÷ 4 060 ≈ <strong>0,201</strong>.",
        "b) C’est le contraire de « 3 filles » : p = 1 − 0,201 ≈ <strong>0,799</strong>.",
        "c) p = C<sub>18</sub><sup>2</sup> × C<sub>12</sub><sup>1</sup> ÷ 4 060 = 153 × 12 ÷ 4 060 ≈ <strong>0,452</strong>.",
      ],
    )}
    ${erreurs(["confondre tirage simultané (combinaisons, sans ordre) et tirages successifs (ordre compté) ;", "oublier de passer par l’événement contraire pour « au moins un »."])}`,
};

export const PROBA_CONDITIONNELLE: LessonSpec = {
  title: "Probabilité conditionnelle et indépendance",
  minutes: 30,
  body: `${objectifs([
      "calculer une probabilité conditionnelle ;",
      "utiliser un arbre pondéré et la formule des probabilités totales ;",
      "reconnaître des événements indépendants.",
    ])}
    <p>Si p(B) ≠ 0, la probabilité de A <strong>sachant</strong> B est :</p>
    ${formula(`p<sub>B</sub>(A) = ${frac("p(A ∩ B)", "p(B)")}, d’où p(A ∩ B) = p(B) × p<sub>B</sub>(A)`)}
    <p>A et B sont <strong>indépendants</strong> si p(A ∩ B) = p(A) × p(B) : savoir que B est réalisé ne change pas la probabilité de A.</p>
    ${retenir(`<strong>Probabilités totales</strong> : si B₁, …, B<sub>n</sub> forment une partition de Ω, p(A) = p(A ∩ B₁) + … + p(A ∩ B<sub>n</sub>). Sur un arbre pondéré, on multiplie le long d’un chemin et on additionne les chemins qui mènent à A.`)}
    ${exemple([
      "2 % d’une population a une maladie M. Un test est positif (T) chez 95 % des malades et chez 3 % des personnes saines.",
      "p(T) = 0,02 × 0,95 + 0,98 × 0,03 = 0,019 + 0,0294 = 0,0484.",
      `p<sub>T</sub>(M) = ${frac("0,019", "0,0484")} ≈ 0,39 : un test positif ne signifie pas toujours qu’on est malade.`,
    ])}
    ${exercice(
      "L’urne U₁ contient 3 boules rouges et 2 noires, l’urne U₂ une rouge et 4 noires. On lance un dé : si on obtient 6, on tire une boule dans U₂, sinon dans U₁. Calcule p(R), puis la probabilité que la boule vienne de U₂ sachant qu’elle est rouge.",
      [
        "Arbre : p(U₁) = 5/6, p<sub>U₁</sub>(R) = 3/5 ; p(U₂) = 1/6, p<sub>U₂</sub>(R) = 1/5.",
        "Probabilités totales : p(R) = 5/6 × 3/5 + 1/6 × 1/5 = 15/30 + 1/30 = <strong>8/15</strong>.",
        "p<sub>R</sub>(U₂) = p(U₂ ∩ R) ÷ p(R) = (1/30) ÷ (16/30) = <strong>1/16</strong>.",
      ],
    )}
    ${auBac("Construis toujours l’arbre pondéré : la somme des probabilités issues d’un même nœud vaut 1, et chaque branche porte une probabilité conditionnelle.")}`,
};

export const VARIABLE_ALEATOIRE: LessonSpec = {
  title: "Variables aléatoires",
  minutes: 30,
  body: `${objectifs([
      "déterminer la loi de probabilité d’une variable aléatoire ;",
      "calculer espérance, variance et écart-type ;",
      "représenter la fonction de répartition.",
    ])}
    <p>Une <strong>variable aléatoire</strong> X associe un nombre à chaque issue. Sa <strong>loi de probabilité</strong> donne les valeurs x₁, …, x<sub>n</sub> et les probabilités p<sub>i</sub> = p(X = x<sub>i</sub>), de somme 1.</p>
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
    ${retenir("Un jeu est équitable si l’espérance du gain est nulle.")}
    ${exercice(
      "Une urne contient 3 boules blanches et 2 noires. On tire simultanément 2 boules ; X est le nombre de boules blanches. Donne la loi de X, son espérance, son écart-type et sa fonction de répartition.",
      [
        "card Ω = C<sub>5</sub><sup>2</sup> = 10. p(X = 0) = 1/10 ; p(X = 1) = 3 × 2/10 = 6/10 ; p(X = 2) = C<sub>3</sub><sup>2</sup>/10 = 3/10 (somme 1).",
        "E(X) = 0 + 6/10 + 2 × 3/10 = <strong>1,2</strong>.",
        "E(X²) = 6/10 + 4 × 3/10 = 1,8, donc V(X) = 1,8 − 1,44 = 0,36 et <strong>σ(X) = 0,6</strong>.",
        "F(x) = 0 si x &lt; 0 ; 0,1 si 0 ≤ x &lt; 1 ; 0,7 si 1 ≤ x &lt; 2 ; 1 si x ≥ 2.",
      ],
    )}`,
};

export const LOI_BINOMIALE: LessonSpec = {
  title: "Épreuve de Bernoulli et loi binomiale",
  minutes: 30,
  body: `${objectifs([
      "reconnaître une situation de loi binomiale et en donner les paramètres ;",
      "calculer des probabilités, l’espérance et la variance ;",
      "déterminer un nombre minimal de répétitions.",
    ])}
    <p>Une <strong>épreuve de Bernoulli</strong> a deux issues : succès (probabilité p) ou échec (1 − p). Si on répète n fois cette épreuve de façon <strong>indépendante</strong>, le nombre X de succès suit la <strong>loi binomiale</strong> B(n ; p) :</p>
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
    ])}
    ${exercice(
      "Un tireur atteint la cible avec la probabilité 0,8 ; il tire 5 fois de façon indépendante. X est le nombre de tirs réussis. Calcule p(X = 5), p(X ≥ 4) et E(X). Combien de tirs faut-il pour que la probabilité d’atteindre au moins une fois la cible dépasse 0,999 ?",
      [
        "5 répétitions indépendantes d’une épreuve de Bernoulli de succès 0,8 : X suit B(5 ; 0,8).",
        "p(X = 5) = 0,8⁵ ≈ <strong>0,328</strong> ; p(X ≥ 4) = 5 × 0,8⁴ × 0,2 + 0,8⁵ ≈ 0,410 + 0,328 = <strong>0,737</strong>.",
        "E(X) = 5 × 0,8 = <strong>4</strong>.",
        "Avec n tirs : p(au moins un succès) = 1 − 0,2ⁿ ≥ 0,999 ⇔ 0,2ⁿ ≤ 0,001 ⇔ n ≥ ln 0,001 / ln 0,2 ≈ 4,3 : il faut <strong>5 tirs</strong>.",
      ],
    )}
    ${erreurs(["appliquer la loi binomiale sans vérifier que les répétitions sont indépendantes et identiques (tirages sans remise : ce n’est pas une loi binomiale) ;", "changer le sens de l’inégalité en divisant par ln 0,2, qui est négatif : il faut l’inverser."])}`,
};

// ── Statistiques (séries S2 et L) ───────────────────────────────────────────

export const SERIES_DOUBLES: LessonSpec = {
  title: "Séries statistiques à deux variables",
  minutes: 25,
  body: `${objectifs([
      "représenter un nuage de points et calculer le point moyen ;",
      "calculer variances et covariance.",
    ])}
    <p>On étudie deux caractères x et y sur une même population (taille et poids, année et production…). Chaque individu donne un point M<sub>i</sub>(x<sub>i</sub> ; y<sub>i</sub>) : l’ensemble forme le <strong>nuage de points</strong>.</p>
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
    ${retenir("Si le nuage a une forme allongée, on peut l’approcher par une droite : c’est l’ajustement linéaire.")}
    ${exercice(
      "Notes de 5 élèves en mathématiques (x) et en physique (y) : x = 8, 10, 12, 14, 16 ; y = 9, 10, 13, 13, 15. Calcule le point moyen, V(x) et cov(x, y).",
      [
        "x̄ = 60/5 = 12 ; ȳ = 60/5 = 12 : <strong>G(12 ; 12)</strong>.",
        "Σx<sub>i</sub>² = 64 + 100 + 144 + 196 + 256 = 760, donc V(x) = 760/5 − 144 = <strong>8</strong>.",
        "Σx<sub>i</sub>y<sub>i</sub> = 72 + 100 + 156 + 182 + 240 = 750, donc cov(x, y) = 750/5 − 144 = <strong>6</strong>.",
      ],
    )}
    ${auBac("Présente tes calculs dans un tableau (colonnes x<sub>i</sub>, y<sub>i</sub>, x<sub>i</sub>², y<sub>i</sub>², x<sub>i</sub>y<sub>i</sub>) : c’est plus sûr et le correcteur suit ton travail.")}`,
};

export const AJUSTEMENT_LINEAIRE: LessonSpec = {
  title: "Ajustement linéaire et corrélation",
  minutes: 30,
  body: `${objectifs([
      "déterminer la droite de régression par la méthode des moindres carrés ;",
      "calculer et interpréter le coefficient de corrélation ;",
      "faire une prévision.",
    ])}
    <p>La <strong>droite de régression de y en x</strong> (méthode des moindres carrés) passe par le point moyen G et a pour équation y = ax + b avec :</p>
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
    ${retenir("Une prévision par la droite de régression n’a de sens que si la corrélation est forte et si on ne s’éloigne pas trop des données.")}
    ${exercice(
      "Avec les notes précédentes (V(x) = 8, cov = 6, G(12 ; 12)) et V(y) = 4,8 : donne la droite de régression de y en x, le coefficient de corrélation et estime la note de physique d’un élève qui a 18 en mathématiques.",
      [
        "a = cov(x, y)/V(x) = 6/8 = 0,75 et b = ȳ − a x̄ = 12 − 9 = 3 : <strong>y = 0,75x + 3</strong>.",
        "r = cov/(σ<sub>x</sub>σ<sub>y</sub>) = 6/√(8 × 4,8) ≈ <strong>0,97</strong> : corrélation forte et positive, l’ajustement est justifié.",
        "Pour x = 18 : y ≈ 0,75 × 18 + 3 = <strong>16,5</strong>.",
      ],
    )}`,
};

// ── Nombres complexes ───────────────────────────────────────────────────────

export const COMPLEXES_ALGEBRIQUE: LessonSpec = {
  title: "Forme algébrique et conjugué",
  minutes: 25,
  body: `${objectifs([
      "calculer avec la forme algébrique ;",
      "utiliser le conjugué pour écrire un quotient et résoudre une équation.",
    ])}
    <p>L’ensemble ℂ des <strong>nombres complexes</strong> prolonge ℝ : il contient un nombre i tel que i² = −1. Tout complexe s’écrit de façon unique z = a + ib (a, b réels) : a = Re(z) est la partie réelle, b = Im(z) la partie imaginaire.</p>
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
    <p>Dans un repère orthonormé direct, le point M(a ; b) a pour <strong>affixe</strong> z = a + ib ; le vecteur ${vec("w")}(a ; b) aussi. Le conjugué correspond au symétrique par rapport à l’axe des abscisses.</p>
    ${exercice(
      "z₁ = 3 − 2i et z₂ = 1 + 4i. Calcule z₁ + z₂, z₁z₂ et z₁/z₂ sous forme algébrique, puis trouve z tel que 2z − z̅ = 1 + 6i.",
      [
        "z₁ + z₂ = <strong>4 + 2i</strong> ; z₁z₂ = 3 + 12i − 2i − 8i² = <strong>11 + 10i</strong>.",
        "z₁/z₂ = (3 − 2i)(1 − 4i)/(1 + 16) = (3 − 12i − 2i − 8)/17 = <strong>(−5 − 14i)/17</strong>.",
        "On pose z = a + ib : 2a + 2ib − a + ib = a + 3ib = 1 + 6i, donc a = 1, b = 2 : <strong>z = 1 + 2i</strong>.",
      ],
    )}`,
};

export const COMPLEXES_TRIGO: LessonSpec = {
  title: "Module, argument et forme exponentielle",
  minutes: 30,
  body: `${objectifs([
      "calculer module et argument ; passer d’une forme à l’autre ;",
      "utiliser la forme exponentielle pour calculer des puissances.",
    ])}
    <p>Pour z = a + ib ≠ 0, d’image M : le <strong>module</strong> |z| = ${sqrt("(a² + b²)")} = OM, et un <strong>argument</strong> θ est une mesure de l’angle (${vec("u")}, ${vec("OM")}), avec cos θ = ${frac("a", "|z|")} et sin θ = ${frac("b", "|z|")}.</p>
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
    ])}
    ${exercice(
      "Écris z = −1 + i sous forme exponentielle, puis calcule z⁴ et (√3 + i)⁶.",
      [
        "|z| = √2 ; cos θ = −1/√2 et sin θ = 1/√2, donc θ = 3π/4 : <strong>z = √2 e<sup>3iπ/4</sup></strong>.",
        "z⁴ = (√2)⁴ e<sup>3iπ</sup> = 4 × (−1) = <strong>−4</strong>.",
        "√3 + i = 2e<sup>iπ/6</sup>, donc (√3 + i)⁶ = 64 e<sup>iπ</sup> = <strong>−64</strong>.",
      ],
    )}
    ${erreurs(["lire l’argument seulement avec tan θ = b/a : il faut regarder le signe de cos θ et de sin θ ;", "oublier que l’argument est défini à 2π près."])}`,
};

export const COMPLEXES_EQUATIONS: LessonSpec = {
  title: "Équations du second degré dans ℂ",
  minutes: 35,
  body: `${objectifs([
      "résoudre une équation du second degré à coefficients complexes ;",
      "factoriser un polynôme dont on connaît une racine.",
    ])}
    <p>Pour az² + bz + c = 0 (a ≠ 0), on calcule Δ = b² − 4ac.</p>
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
    ${retenir("Équation de degré 3 dont on connaît une racine z₀ : on factorise P(z) = (z − z₀)(az² + βz + γ), par identification ou division, puis on résout l’équation du second degré.")}
    ${exercice(
      "P(z) = z³ − (2 + i)z² + (2 + 2i)z − 2i. Vérifie que i est racine, factorise P(z) et résous P(z) = 0.",
      [
        "P(i) = i³ − (2 + i)i² + (2 + 2i)i − 2i = −i + 2 + i + 2i − 2 − 2i = 0 : i est racine.",
        "Donc P(z) = (z − i)(z² + bz + c). En développant et en identifiant : <strong>P(z) = (z − i)(z² − 2z + 2)</strong>.",
        "z² − 2z + 2 = 0 : Δ = −4 = (2i)², donc z = 1 + i ou z = 1 − i.",
        "<strong>S = {i ; 1 + i ; 1 − i}</strong>.",
      ],
    )}`,
};

export const RACINES_NIEMES: LessonSpec = {
  title: "Racines n-ièmes d’un nombre complexe",
  minutes: 30,
  body: `${objectifs([
      "déterminer les racines n-ièmes d’un nombre complexe ;",
      "les représenter : polygone régulier.",
    ])}
    <p>Les solutions de z${sup("n")} = 1 sont les <strong>racines n-ièmes de l’unité</strong> :</p>
    ${formula(`z<sub>k</sub> = e${sup("2ikπ/n")}, pour k = 0, 1, …, n − 1`)}
    <p>Leurs images sont les sommets d’un polygone régulier à n côtés inscrit dans le cercle trigonométrique ; leur somme est nulle.</p>
    ${retenir(`Si a = r e${sup("iθ")} (r &gt; 0), les solutions de z${sup("n")} = a sont z<sub>k</sub> = r${sup("1/n")} e${sup("i(θ + 2kπ)/n")}, k = 0, …, n − 1.`)}
    ${exemple([
      `Racines cubiques de l’unité : 1, j = e${sup("2iπ/3")} = −½ + i${frac(sqrt("3"), "2")} et j² = ${bar("j")}. On a 1 + j + j² = 0.`,
      `Solutions de z³ = 8i : 8i = 8e${sup("iπ/2")}, donc z<sub>k</sub> = 2e${sup("i(π/6 + 2kπ/3)")}, soit ${sqrt("3")} + i, −${sqrt("3")} + i et −2i.`,
    ])}
    ${exercice(
      "Résous z⁴ = −16 et représente les solutions.",
      [
        "−16 = 16 e<sup>iπ</sup>. Les solutions sont z<sub>k</sub> = 2 e<sup>i(π/4 + kπ/2)</sup>, k = 0, 1, 2, 3.",
        "<strong>√2 + i√2 ; −√2 + i√2 ; −√2 − i√2 ; √2 − i√2</strong>.",
        "Leurs images sont les sommets d’un carré inscrit dans le cercle de centre O et de rayon 2.",
      ],
    )}`,
};

export const COMPLEXES_GEOMETRIE: LessonSpec = {
  title: "Nombres complexes et géométrie",
  minutes: 35,
  body: `${objectifs([
      "calculer distances et angles avec les nombres complexes ;",
      "déterminer la nature d’un triangle ou d’un quadrilatère ;",
      "écrire une translation, une homothétie, une rotation.",
    ])}
    <p>Si A, B, C ont pour affixes z<sub>A</sub>, z<sub>B</sub>, z<sub>C</sub> :</p>
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
    ${retenir("Quatre points A, B, C, D sont cocycliques (ou alignés) si le quotient [(z<sub>C</sub> − z<sub>A</sub>)/(z<sub>D</sub> − z<sub>A</sub>)] ÷ [(z<sub>C</sub> − z<sub>B</sub>)/(z<sub>D</sub> − z<sub>B</sub>)] est réel.")}
    ${exercice(
      "A, B, C ont pour affixes 1, 3 + 2i et −1 + 2i. Calcule (z<sub>C</sub> − z<sub>A</sub>)/(z<sub>B</sub> − z<sub>A</sub>), conclus sur la nature de ABC, puis trouve D tel que ABDC soit un carré.",
      [
        "(−2 + 2i)/(2 + 2i) = (−2 + 2i)(2 − 2i)/8 = (−4 + 4i + 4i + 4)/8 = <strong>i</strong>.",
        "Module 1 : AC = AB ; argument π/2 : (AB⃗, AC⃗) = π/2. <strong>ABC est rectangle isocèle en A</strong> ; C est l’image de B par la rotation de centre A d’angle π/2 : z’ − 1 = i(z − 1).",
        "ABDC est un carré si AD⃗ = AB⃗ + AC⃗ : z<sub>D</sub> = z<sub>B</sub> + z<sub>C</sub> − z<sub>A</sub> = <strong>1 + 4i</strong>.",
      ],
    )}`,
};

export const COMPLEXES_TRIGONOMETRIE: LessonSpec = {
  title: "Complexes et trigonométrie : linéariser, transformer",
  minutes: 35,
  body: `${objectifs([
      "linéariser cosⁿ x et sinⁿ x avec les formules d’Euler ;",
      "exprimer cos nx et sin nx avec la formule de Moivre ;",
      "résoudre p cos x + q sin x = c.",
    ])}
    <h2>Linéariser avec Euler</h2>
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
    ${retenir(`Pour z ≠ 1 : 1 + z + z² + … + z${sup("n")} = ${frac("1 − z<sup>n+1</sup>", "1 − z")} (somme géométrique, valable dans ℂ).`)}
    ${exercice(
      "Linéarise sin³ x, puis calcule I = ∫ de 0 à π/2 de sin³ x dx.",
      [
        "sin³ x = ((e<sup>ix</sup> − e<sup>−ix</sup>)/(2i))³ = (e<sup>3ix</sup> − 3e<sup>ix</sup> + 3e<sup>−ix</sup> − e<sup>−3ix</sup>)/(−8i) = (2i sin 3x − 6i sin x)/(−8i).",
        "<strong>sin³ x = (3 sin x − sin 3x)/4</strong>.",
        "I = [−3 cos x/4 + cos 3x/12] entre 0 et π/2 = 0 − (−3/4 + 1/12) = <strong>2/3</strong>.",
      ],
    )}`,
};

export const SIMILITUDES_COMPLEXES: LessonSpec = {
  title: "Similitudes planes directes",
  minutes: 35,
  body: `${objectifs([
      "reconnaître une similitude directe à son écriture complexe ;",
      "déterminer ses éléments caractéristiques (centre, rapport, angle) ;",
      "déterminer une similitude par deux points et leurs images.",
    ])}
    <p>Une <strong>similitude directe</strong> est une transformation du plan dont l’écriture complexe est z’ = az + b, avec a ≠ 0. Elle multiplie les distances par k = |a| et conserve les angles orientés.</p>
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
    ], "Déterminer une similitude par deux points et leurs images")}
    ${exercice(
      "Détermine la similitude directe s qui transforme A(1) en A’(1 + 2i) et B(i) en B’(−1), puis ses éléments caractéristiques.",
      [
        "a = (z<sub>B’</sub> − z<sub>A’</sub>)/(z<sub>B</sub> − z<sub>A</sub>) = (−2 − 2i)/(−1 + i) = (−2 − 2i)(−1 − i)/2 = <strong>2i</strong>.",
        "b = z<sub>A’</sub> − a z<sub>A</sub> = 1 + 2i − 2i = 1 : <strong>s : z’ = 2iz + 1</strong> (vérification : s(i) = −2 + 1 = −1).",
        "Rapport |2i| = <strong>2</strong>, angle arg(2i) = <strong>π/2</strong>, centre ω = 1/(1 − 2i) = <strong>(1 + 2i)/5</strong>.",
      ],
    )}
    ${auBac("Pour trouver le centre, résous ω = aω + b : c’est le seul point invariant (si a ≠ 1).")}`,
};

// ── Arithmétique (séries S1 et S3) ──────────────────────────────────────────

export const DIVISIBILITE: LessonSpec = {
  title: "Divisibilité et division euclidienne",
  minutes: 25,
  body: `${objectifs([
      "utiliser la définition de la divisibilité et ses propriétés ;",
      "effectuer une division euclidienne ; raisonner selon les restes.",
    ])}
    <p>Pour des entiers relatifs a et b, <strong>b divise a</strong> (noté b | a) s’il existe un entier k tel que a = kb ; on dit aussi que a est un multiple de b.</p>
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
    ${exemple(["Pour tout entier n, n(n + 1) est pair : l’un des deux entiers consécutifs est pair."])}
    ${exercice(
      "a) Montre que n³ − n est divisible par 6 pour tout entier n. b) Trouve les entiers naturels n tels que n + 3 divise 2n + 11.",
      [
        "a) n³ − n = (n − 1)n(n + 1) est le produit de trois entiers consécutifs : l’un est pair, l’un est multiple de 3. Comme 2 et 3 sont premiers entre eux, 6 divise n³ − n.",
        "b) 2n + 11 = 2(n + 3) + 5. Si n + 3 divise 2n + 11, il divise 5 = (2n + 11) − 2(n + 3).",
        "n + 3 ≥ 3 et divise 5, donc n + 3 = 5 : <strong>n = 2</strong> (vérification : 5 divise 15).",
      ],
    )}`,
};

export const PGCD_PPCM: LessonSpec = {
  title: "PGCD, PPCM et algorithme d’Euclide",
  minutes: 30,
  body: `${objectifs([
      "calculer un PGCD par l’algorithme d’Euclide ;",
      "utiliser la relation PGCD × PPCM = |ab| ;",
      "résoudre un problème avec PGCD donné.",
    ])}
    <p>Le <strong>PGCD</strong> de a et b est leur plus grand diviseur commun ; le <strong>PPCM</strong> leur plus petit multiple commun strictement positif. Si PGCD(a, b) = 1, a et b sont <strong>premiers entre eux</strong>.</p>
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
    ])}
    ${exercice(
      "Trouve les couples (a ; b) d’entiers naturels tels que a + b = 72, a &lt; b et PGCD(a, b) = 9.",
      [
        "On écrit a = 9a’ et b = 9b’ avec a’ et b’ premiers entre eux et a’ &lt; b’.",
        "9(a’ + b’) = 72, donc a’ + b’ = 8.",
        "Couples premiers entre eux de somme 8 : (1 ; 7) et (3 ; 5) ((2 ; 6) et (4 ; 4) ne conviennent pas).",
        "<strong>(9 ; 63) et (27 ; 45)</strong>.",
      ],
    )}`,
};

export const NOMBRES_PREMIERS: LessonSpec = {
  title: "Nombres premiers et décomposition",
  minutes: 25,
  body: `${objectifs([
      "reconnaître un nombre premier ;",
      "décomposer un entier en facteurs premiers et en tirer ses diviseurs.",
    ])}
    <p>Un entier naturel p est <strong>premier</strong> s’il a exactement deux diviseurs positifs : 1 et p. Les premiers sont 2, 3, 5, 7, 11, 13, 17, 19, 23, 29… Il y en a une infinité.</p>
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
    ${exemple(["84 = 2² × 3 × 7 et 90 = 2 × 3² × 5 : PGCD = 2 × 3 = 6 ; PPCM = 2² × 3² × 5 × 7 = 1260."])}
    ${exercice(
      "Décompose 1 176 en facteurs premiers, donne son nombre de diviseurs et le plus petit entier k tel que 1 176k soit un carré parfait.",
      [
        "1 176 = 2 × 588 = 2² × 294 = 2³ × 147 = <strong>2³ × 3 × 7²</strong>.",
        "Nombre de diviseurs : (3 + 1)(1 + 1)(2 + 1) = <strong>24</strong>.",
        "Un carré a tous ses exposants pairs : il manque un facteur 2 et un facteur 3, donc <strong>k = 6</strong> (1 176 × 6 = 7 056 = 84²).",
      ],
    )}`,
};

export const BEZOUT_GAUSS: LessonSpec = {
  title: "Théorèmes de Bézout et de Gauss",
  minutes: 35,
  body: `${objectifs([
      "utiliser les théorèmes de Bézout et de Gauss ;",
      "résoudre une équation diophantienne ax + by = c.",
    ])}
    ${retenir("<strong>Bézout</strong> : a et b sont premiers entre eux si et seulement s’il existe des entiers u et v tels que au + bv = 1.")}
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
    ])}
    ${exercice(
      "Résous dans ℤ² l’équation 7x + 4y = 3.",
      [
        "PGCD(7, 4) = 1 divise 3 : il y a des solutions. Solution particulière : (1 ; −1), car 7 − 4 = 3.",
        "7x + 4y = 7 × 1 + 4 × (−1), donc 7(x − 1) = −4(y + 1).",
        "4 divise 7(x − 1) et 4 est premier avec 7 : d’après Gauss, 4 divise x − 1, donc x = 1 + 4k (k ∈ ℤ).",
        "Alors 7 × 4k = −4(y + 1), donc y = −1 − 7k. Solutions : <strong>(1 + 4k ; −1 − 7k), k ∈ ℤ</strong> (on vérifie : 7 + 28k − 4 − 28k = 3).",
      ],
    )}
    ${erreurs(["appliquer Gauss sans avoir justifié que les deux nombres sont premiers entre eux ;", "oublier la vérification (réciproque)."])}`,
};

export const CONGRUENCES: LessonSpec = {
  title: "Congruences",
  minutes: 35,
  body: `${objectifs([
      "calculer avec les congruences ;",
      "trouver le reste d’une grande puissance ; utiliser le petit théorème de Fermat ;",
      "résoudre une équation de congruence.",
    ])}
    <p>Soit n ≥ 2. a est <strong>congru</strong> à b modulo n, noté a ≡ b [n], si n divise a − b, c’est-à-dire si a et b ont le même reste dans la division par n.</p>
    ${liste([
      "si a ≡ b [n] et c ≡ d [n], alors a + c ≡ b + d [n] et ac ≡ bd [n] ;",
      "si a ≡ b [n], alors a<sup>k</sup> ≡ b<sup>k</sup> [n] pour tout entier naturel k.",
    ])}
    ${retenir("<strong>Petit théorème de Fermat</strong> : si p est premier, x<sup>p</sup> ≡ x [p] pour tout entier x ; si de plus p ne divise pas x, x<sup>p−1</sup> ≡ 1 [p].")}
    ${exemple([
      "Reste de 3<sup>100</sup> dans la division par 7. Fermat : 3<sup>6</sup> ≡ 1 [7].",
      "100 = 6 × 16 + 4, donc 3<sup>100</sup> = (3<sup>6</sup>)<sup>16</sup> × 3<sup>4</sup> ≡ 3<sup>4</sup> = 81 ≡ 4 [7]. Le reste est 4.",
    ])}
    ${exemple(["10 ≡ 1 [9], donc un nombre est congru à la somme de ses chiffres modulo 9 : il est divisible par 9 si et seulement si cette somme l’est."], "Critère de divisibilité")}
    ${exercice(
      "a) Trouve le reste de la division de 2<sup>2025</sup> par 7. b) Résous 3n ≡ 2 [5].",
      [
        "a) 2³ = 8 ≡ 1 [7]. Or 2025 = 3 × 675, donc 2<sup>2025</sup> = (2³)<sup>675</sup> ≡ 1 [7] : le reste est <strong>1</strong>.",
        "b) 3 × 2 = 6 ≡ 1 [5] : 2 est un inverse de 3 modulo 5. En multipliant par 2 : 6n ≡ 4 [5], soit n ≡ 4 [5].",
        "<strong>n = 4 + 5k</strong>, k ∈ ℤ (vérification : 3 × 4 = 12 ≡ 2 [5]).",
      ],
    )}
    ${auBac("Pour une puissance, cherche la plus petite puissance congrue à 1 (ou dresse un tableau des restes successifs), puis écris l’exposant comme un multiple de cette période plus un reste.")}`,
};

export const NUMERATION: LessonSpec = {
  title: "Systèmes de numération",
  minutes: 25,
  body: `${objectifs([
      "écrire un entier dans une base donnée ;",
      "passer d’une base à une autre ; résoudre un problème de base inconnue.",
    ])}
    <p>En base b (b ≥ 2), un entier s’écrit avec des chiffres de 0 à b − 1 :</p>
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
    ])}
    ${exercice(
      "a) Écris en base 10 le nombre qui s’écrit 1011011 en base 2. b) Trouve la base b dans laquelle 42 (en base 10) s’écrit 132.",
      [
        "a) 1 × 2⁶ + 0 × 2⁵ + 1 × 2⁴ + 1 × 2³ + 0 × 2² + 1 × 2 + 1 = 64 + 16 + 8 + 2 + 1 = <strong>91</strong>.",
        "b) 132 en base b vaut b² + 3b + 2 (avec b ≥ 4, car le chiffre 3 doit exister).",
        "b² + 3b + 2 = 42 ⇔ b² + 3b − 40 = 0 ⇔ b = 5 ou b = −8 : <strong>b = 5</strong> (25 + 15 + 2 = 42).",
      ],
    )}`,
};
