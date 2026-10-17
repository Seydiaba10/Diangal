// Mathématiques de 5e : chapitres du relevé DIANGAL (docs/programme/releve-ci-3e.md, titres de
// Sunudaara) et du guide pédagogique officiel de mathématiques de 5e (DEMSG, 2010 : fractions,
// puissances, parallélogramme, géométrie dans l’espace). Le programme officiel de 5e n’a pas été trouvé
// en ligne. Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, sup, tableau } from "../tle/blocks";

const NUM = "Activités numériques";
const GEO = "Activités géométriques";

export const MATH_5E: ChapterSpec[] = [
  {
    title: "Addition et soustraction des nombres relatifs",
    summary: "Additionner et soustraire des nombres décimaux relatifs ; somme algébrique.",
    strand: NUM,
    lessons: [
      {
        title: "Additionner et soustraire des relatifs",
        minutes: 15,
        body: `${liste([
            "deux nombres de même signe : on additionne leurs distances à zéro et on garde le signe : (−3) + (−5) = −8 ;",
            "deux nombres de signes contraires : on soustrait les distances à zéro et on prend le signe du plus éloigné de zéro : (+7) + (−10) = −3 ;",
            "soustraire un nombre, c’est ajouter son opposé : 4 − (−6) = 4 + 6 = 10.",
          ])}
          ${exemple(["La température passe de −2 °C à +5 °C : elle monte de 5 − (−2) = 7 °C."])}
          ${retenir("Dans une somme algébrique, on peut regrouper les positifs d’un côté et les négatifs de l’autre.")}`,
      },
    ],
  },
  {
    title: "Multiplication et division des nombres relatifs",
    summary: "Règle des signes ; calcul dans l’ensemble des décimaux relatifs.",
    strand: NUM,
    lessons: [
      {
        title: "La règle des signes",
        minutes: 12,
        body: `${tableau([
            ["Signes des facteurs", "Signe du produit (ou du quotient)"],
            ["+ et +", "+"],
            ["− et −", "+"],
            ["+ et −", "−"],
          ])}
          ${exemple(["(−4) × (−3) = 12 ; (−20) ÷ 5 = −4 ; (−2) × (−3) × (−5) = −30."])}
          ${retenir("Un produit de plusieurs facteurs est positif si le nombre de facteurs négatifs est pair, négatif s’il est impair.")}`,
      },
    ],
  },
  {
    title: "Puissances",
    summary: "Puissances d’un nombre décimal, puissances de 10, propriétés.",
    strand: NUM,
    lessons: [
      {
        title: "Définition et propriétés des puissances",
        minutes: 15,
        body: `${formula(`a${sup("n")} = a × a × … × a (n facteurs) ; a${sup("1")} = a ; a${sup("0")} = 1 (a ≠ 0)`)}
          ${liste([
            `a${sup("m")} × a${sup("n")} = a${sup("m + n")} ;`,
            `(a${sup("m")})${sup("n")} = a${sup("m × n")} ;`,
            `(a × b)${sup("n")} = a${sup("n")} × b${sup("n")} ;`,
            `10${sup("3")} = 1 000 ; 10${sup("6")} = 1 000 000.`,
          ])}
          ${exemple([`2${sup("3")} × 2${sup("2")} = 2${sup("5")} = 32 ; (−3)${sup("2")} = 9 mais −3${sup("2")} = −9.`])}
          ${retenir("Une puissance de −1 vaut 1 si l’exposant est pair, −1 s’il est impair.")}`,
      },
    ],
  },
  {
    title: "Multiples et diviseurs",
    summary: "Multiples, diviseurs, critères de divisibilité, nombres premiers.",
    strand: NUM,
    lessons: [
      {
        title: "Multiples, diviseurs et nombres premiers",
        minutes: 15,
        body: `${liste([
            "a est un <strong>multiple</strong> de b s’il existe un entier k tel que a = k × b ; on dit aussi que b est un <strong>diviseur</strong> de a ;",
            "critères : par 2, 5, 10 (dernier chiffre), par 3 et 9 (somme des chiffres), par 4 (deux derniers chiffres) ;",
            "un nombre <strong>premier</strong> a exactement deux diviseurs : 1 et lui-même (2, 3, 5, 7, 11, 13…).",
          ])}
          ${exemple(["Diviseurs de 24 : 1, 2, 3, 4, 6, 8, 12, 24. Décomposition : 24 = 2 × 2 × 2 × 3."])}
          ${retenir("Le plus grand diviseur commun de 24 et 36 est 12 ; leur plus petit multiple commun est 72.")}`,
      },
    ],
  },
  {
    title: "Les fractions",
    summary: "Simplification, comparaison et opérations sur les fractions.",
    strand: NUM,
    lessons: [
      {
        title: "Simplifier et comparer des fractions",
        minutes: 12,
        body: `${liste([
            `on simplifie en divisant numérateur et dénominateur par un même nombre : ${frac("18", "24")} = ${frac("3", "4")} ;`,
            `pour comparer, on réduit au même dénominateur : ${frac("2", "3")} = ${frac("8", "12")} et ${frac("3", "4")} = ${frac("9", "12")}, donc ${frac("2", "3")} &lt; ${frac("3", "4")}.`,
          ])}
          ${retenir("Une fraction est irréductible quand on ne peut plus la simplifier.")}`,
      },
      {
        title: "Opérations sur les fractions",
        minutes: 15,
        body: `${tableau([
            ["Opération", "Règle", "Exemple"],
            ["addition", "même dénominateur, puis on additionne les numérateurs", `${frac("1", "4")} + ${frac("1", "6")} = ${frac("3", "12")} + ${frac("2", "12")} = ${frac("5", "12")}`],
            ["multiplication", "numérateurs entre eux, dénominateurs entre eux", `${frac("2", "3")} × ${frac("9", "4")} = ${frac("18", "12")} = ${frac("3", "2")}`],
            ["division", "multiplier par l’inverse", `${frac("3", "5")} ÷ ${frac("9", "10")} = ${frac("3", "5")} × ${frac("10", "9")} = ${frac("2", "3")}`],
          ])}
          ${retenir("L’inverse de a/b (a et b non nuls) est b/a.")}`,
      },
    ],
  },
  {
    title: "Proportionnalité et pourcentages",
    summary: "Tableaux de proportionnalité, quatrième proportionnelle, pourcentages, vitesse moyenne.",
    strand: NUM,
    lessons: [
      {
        title: "Quatrième proportionnelle et pourcentages",
        minutes: 15,
        body: `${methode(["Dans un tableau de proportionnalité, a/b = c/d.", "On calcule la quatrième proportionnelle par le produit en croix : d = b × c ÷ a."], "Quatrième proportionnelle")}
          ${exemple(["3 kg coûtent 1 350 F ; 7 kg coûtent 1 350 × 7 ÷ 3 = 3 150 F."])}
          ${liste(["augmenter de 10 % revient à multiplier par 1,10 ; diminuer de 20 % revient à multiplier par 0,80 ;", "vitesse moyenne = distance ÷ durée."])}`,
      },
    ],
  },
  {
    title: "Équations et inéquations",
    summary: "Résoudre des équations du type x + a = b et ax = b ; inéquations simples.",
    strand: NUM,
    lessons: [
      {
        title: "Résoudre une équation",
        minutes: 15,
        body: `<p>Résoudre une équation, c’est trouver la valeur de l’inconnue qui rend l’égalité vraie.</p>
          ${liste([
            "x + 7 = 12 : on soustrait 7 des deux côtés : x = 5 ;",
            "3x = 18 : on divise les deux côtés par 3 : x = 6 ;",
            "2x − 5 = 9 : 2x = 14, donc x = 7.",
          ])}
          ${retenir("On vérifie toujours la solution en la remplaçant dans l’équation : 2 × 7 − 5 = 9.")}
          ${exemple(["Inéquation : x + 3 &lt; 10 donne x &lt; 7."])}`,
      },
    ],
  },
  {
    title: "Repérage dans le plan",
    summary: "Coordonnées relatives, quadrants, points symétriques.",
    strand: NUM,
    lessons: [
      {
        title: "Coordonnées relatives",
        minutes: 12,
        body: `${liste([
            "dans un repère, un point a une abscisse et une ordonnée qui peuvent être négatives : A(−2 ; 3) ;",
            "les axes partagent le plan en quatre quadrants ;",
            "le symétrique de M(x ; y) par rapport à l’origine est M’(−x ; −y).",
          ])}
          ${retenir("Les points de l’axe des abscisses ont une ordonnée nulle ; ceux de l’axe des ordonnées, une abscisse nulle.")}`,
      },
    ],
  },
  {
    title: "Les angles",
    summary: "Angles opposés par le sommet, angles formés par deux parallèles et une sécante.",
    strand: GEO,
    lessons: [
      {
        title: "Angles et droites parallèles",
        minutes: 15,
        body: `${liste([
            "deux angles <strong>opposés par le sommet</strong> ont la même mesure ;",
            "deux droites parallèles coupées par une sécante forment des angles <strong>alternes-internes</strong> égaux et des angles <strong>correspondants</strong> égaux ;",
            "réciproquement, si deux angles alternes-internes sont égaux, les droites sont parallèles.",
          ])}
          ${retenir("Angles complémentaires : somme 90° ; angles supplémentaires : somme 180°.")}`,
      },
    ],
  },
  {
    title: "Les triangles",
    summary: "Construction, inégalité triangulaire, somme des angles, médiatrices et cercle circonscrit, hauteurs.",
    strand: GEO,
    lessons: [
      {
        title: "Construire un triangle",
        minutes: 12,
        body: `${retenir("Inégalité triangulaire : dans un triangle, chaque côté est plus petit que la somme des deux autres. On ne peut pas construire un triangle de côtés 3 cm, 4 cm et 9 cm.")}
          ${liste(["on construit un triangle connaissant trois côtés (compas), deux côtés et l’angle compris, ou un côté et deux angles (rapporteur) ;", "la somme des angles d’un triangle vaut 180°."])}`,
      },
      {
        title: "Médiatrices et hauteurs",
        minutes: 12,
        body: `${liste([
            "les trois <strong>médiatrices</strong> d’un triangle se coupent en un point, centre du <strong>cercle circonscrit</strong> (il passe par les trois sommets) ;",
            "une <strong>hauteur</strong> est la droite passant par un sommet et perpendiculaire au côté opposé ; les trois hauteurs sont concourantes.",
          ])}
          ${retenir("Dans un triangle rectangle, le centre du cercle circonscrit est le milieu de l’hypoténuse.")}`,
      },
    ],
  },
  {
    title: "Le parallélogramme",
    summary: "Construction, propriétés des côtés, des angles et des diagonales, reconnaissance.",
    strand: GEO,
    lessons: [
      {
        title: "Propriétés du parallélogramme",
        minutes: 15,
        body: `<p>Un <strong>parallélogramme</strong> est un quadrilatère dont les côtés opposés sont parallèles.</p>
          ${liste(["ses côtés opposés ont la même longueur ;", "ses angles opposés sont égaux ; deux angles consécutifs sont supplémentaires ;", "ses diagonales se coupent en leur milieu ; ce point est son centre de symétrie."])}
          ${methode(["Les diagonales se coupent en leur milieu.", "Ou : les côtés opposés sont égaux deux à deux.", "Ou : deux côtés opposés sont parallèles et de même longueur."], "Reconnaître un parallélogramme")}
          ${retenir("Rectangle, losange et carré sont des parallélogrammes particuliers.")}`,
      },
    ],
  },
  {
    title: "La symétrie centrale",
    summary: "Symétrique d’un point et d’une figure par rapport à un point ; propriétés ; centre de symétrie.",
    strand: GEO,
    lessons: [
      {
        title: "Symétrie par rapport à un point",
        minutes: 12,
        body: `<p>Le symétrique de A par rapport au point O est le point A’ tel que O soit le <strong>milieu</strong> de [AA’].</p>
          ${liste(["la symétrie centrale conserve les longueurs, les angles, les aires et l’alignement ;", "elle transforme une droite en une droite parallèle ;", "une figure a un centre de symétrie si elle est sa propre image (parallélogramme, cercle)."])}
          ${retenir("La symétrie centrale est un demi-tour autour du point O.")}`,
      },
    ],
  },
  {
    title: "Géométrie dans l’espace",
    summary: "Prisme droit et cylindre : observation, patrons, aires et volumes.",
    strand: GEO,
    lessons: [
      {
        title: "Prismes droits et cylindres",
        minutes: 15,
        body: `${tableau([
            ["Solide", "Aire latérale", "Volume"],
            ["prisme droit", "périmètre de la base × hauteur", "aire de la base × hauteur"],
            ["cylindre", "2 × π × r × h", "π × r² × h"],
          ])}
          ${exemple(["Un prisme à base triangulaire (base 6 cm, hauteur du triangle 4 cm) et de hauteur 10 cm : V = (6 × 4 ÷ 2) × 10 = 120 cm³."])}
          ${retenir("Le patron d’un prisme droit est formé de deux bases polygonales et de rectangles.")}`,
      },
    ],
  },
];
