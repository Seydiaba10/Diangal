// Mathématiques du CM2 : activités numériques (paliers 4 à 6 de la progression officielle des
// cahiers d'exercices PAAME, MEN 2024, conformes au CEB). Leçons rédigées par DIANGAL.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, tableau } from "./blocks";
import { figure, schema } from "../lesson-figures";

const NUM = "Activités numériques";

export const MATH_CM2_NOMBRES: ChapterSpec[] = [
  {
    title: "Les grands nombres",
    summary: "Lire, écrire, décomposer et comparer les nombres jusqu’aux milliards.",
    strand: NUM,
    lessons: [
      {
        title: "Lire et écrire les grands nombres",
        minutes: 12,
        body: `<p>Pour lire un grand nombre, on sépare ses chiffres en <strong>classes</strong> de trois, en partant de la droite.</p>
          ${figure(schema("cm2-millions", "Une droite graduée de 3 000 000 à 4 000 000 : A est à 3 405 270."), "3 405 270 se lit trois millions quatre cent cinq mille deux cent soixante-dix.")}
          ${tableau([
            ["Classe des milliards", "Classe des millions", "Classe des mille", "Classe des unités"],
            ["2", "450", "306", "018"],
          ])}
          <p>On lit : <strong>deux milliards quatre cent cinquante millions trois cent six mille dix-huit</strong>.</p>
          ${retenir("« Mille » ne prend jamais de « s ». « Million » et « milliard » sont des noms : ils prennent un « s » au pluriel (trois millions).")}
          ${exemple(["Le Sénégal compte environ 18 000 000 d’habitants : dix-huit millions.", "En chiffres, « cinq millions vingt mille » s’écrit 5 020 000."])}`,
      },
      {
        title: "Décomposer et comparer les grands nombres",
        minutes: 12,
        body: `${figure("<table><tr><th>classe des millions</th><th>classe des mille</th><th>classe des unités</th></tr><tr><td>3</td><td>405</td><td>270</td></tr></table>", "3 405 270 = 3 000 000 + 405 000 + 270 : on lit les classes de trois chiffres.")}
          ${exemple(["3 405 270 = 3 000 000 + 400 000 + 5 000 + 200 + 70.", "Dans 3 405 270, le chiffre des centaines de mille est 4 ; le nombre de milliers est 3 405."])}
          ${methode([
            "Le nombre qui a le plus de chiffres est le plus grand.",
            "S’ils ont autant de chiffres, on compare les chiffres un à un en partant de la gauche.",
          ], "Comparer deux nombres")}
          ${exemple(["1 250 000 &lt; 1 520 000, car au rang des centaines de mille, 2 &lt; 5."])}
          ${retenir("Pour ranger des nombres dans l’ordre croissant, on va du plus petit au plus grand ; dans l’ordre décroissant, du plus grand au plus petit.")}`,
      },
    ],
  },
  {
    title: "Les caractères de divisibilité",
    summary: "Reconnaître sans calculer si un nombre est divisible par 2, 3, 4, 5, 9, 10, 25.",
    strand: NUM,
    lessons: [
      {
        title: "Divisibilité par 2, 5, 10, 4 et 25",
        minutes: 12,
        body: `${figure("<table><tr><th>Nombre</th><th>par 2</th><th>par 4</th><th>par 5</th><th>par 10</th><th>par 25</th></tr><tr><th>100</th><td>oui</td><td>oui</td><td>oui</td><td>oui</td><td>oui</td></tr><tr><th>316</th><td>oui</td><td>oui</td><td>non</td><td>non</td><td>non</td></tr><tr><th>475</th><td>non</td><td>non</td><td>oui</td><td>non</td><td>oui</td></tr></table>", "316 : ses deux derniers chiffres (16) forment un multiple de 4. 475 : il finit par 75, multiple de 25.")}
          ${tableau([
            ["Un nombre est divisible par…", "si…", "Exemples"],
            ["2", "il est pair : son chiffre des unités est 0, 2, 4, 6 ou 8", "126 ; 3 058"],
            ["5", "son chiffre des unités est 0 ou 5", "235 ; 1 480"],
            ["10", "son chiffre des unités est 0", "750"],
            ["4", "le nombre formé par ses deux derniers chiffres est divisible par 4", "1 316 (16 = 4 × 4)"],
            ["25", "il se termine par 00, 25, 50 ou 75", "1 275"],
          ])}
          ${retenir("Un nombre divisible par 2 et par 5 est divisible par 10.")}`,
      },
      {
        title: "Divisibilité par 3 et par 9",
        minutes: 12,
        body: `${figure("<table><tr><th>2 754</th><td>2 + 7 + 5 + 4 = 18</td><td>divisible par 3 et par 9</td></tr><tr><th>1 345</th><td>1 + 3 + 4 + 5 = 13</td><td>ni par 3 ni par 9</td></tr></table>", "On additionne les chiffres : si la somme est divisible par 3 (ou par 9), le nombre l’est aussi.")}
          ${retenir("Un nombre est divisible par 3 si la somme de ses chiffres est divisible par 3 ; il est divisible par 9 si cette somme est divisible par 9.")}
          ${exemple([
            "4 518 : 4 + 5 + 1 + 8 = 18. 18 est divisible par 9 (et par 3), donc 4 518 est divisible par 9 et par 3.",
            "722 : 7 + 2 + 2 = 11, qui n’est pas divisible par 3 : 722 n’est divisible ni par 3 ni par 9.",
          ])}
          <p>Les caractères de divisibilité servent à simplifier les fractions et à faire des partages sans reste.</p>`,
      },
    ],
  },
  {
    title: "Les quatre opérations sur les grands nombres",
    summary: "Addition, soustraction, multiplication et division ; choisir la bonne opération.",
    strand: NUM,
    lessons: [
      {
        title: "Addition et soustraction",
        minutes: 12,
        body: `${figure(schema("cm2-addition", "L’addition 256 485 + 137 926 posée en colonnes, avec les retenues."), "256 485 + 137 926 = 394 411 : on calcule de droite à gauche, sans oublier les retenues.")}
          ${methode([
            "Poser les nombres en colonnes, unités sous unités, dizaines sous dizaines…",
            "Calculer de droite à gauche, sans oublier les retenues.",
            "Vérifier : on contrôle une soustraction par une addition (différence + nombre retranché = premier nombre).",
          ])}
          ${exemple(["458 320 − 129 745 = 328 575. Vérification : 328 575 + 129 745 = 458 320."])}
          ${retenir("On additionne pour trouver un total, un « en tout » ; on soustrait pour trouver ce qui reste, un écart ou une différence.")}`,
      },
      {
        title: "La multiplication",
        minutes: 15,
        body: `<p>Multiplier, c’est additionner plusieurs fois le même nombre : 4 × 250 = 250 + 250 + 250 + 250 = 1 000.</p>
          ${figure(schema("cm2-multiplication", "La multiplication 408 × 25 posée : deux produits partiels, puis leur somme."), "408 × 5 = 2 040 ; 408 × 20 = 8 160 ; 2 040 + 8 160 = <strong>10 200</strong>.")}
          ${methode([
            "Multiplier le multiplicande par le chiffre des unités du multiplicateur.",
            "Multiplier par le chiffre des dizaines : on décale d’un rang vers la gauche (on met un 0).",
            "Multiplier par le chiffre des centaines : décalage de deux rangs.",
            "Additionner les produits partiels.",
          ], "Multiplier par un nombre de plusieurs chiffres")}
          ${exemple(["325 × 46 = 325 × 6 + 325 × 40 = 1 950 + 13 000 = 14 950."])}
          ${retenir("Multiplier par 10, 100, 1 000 revient à ajouter 1, 2 ou 3 zéros à droite d’un nombre entier.")}`,
      },
      {
        title: "La division",
        minutes: 15,
        body: `<p>Diviser, c’est partager en parts égales ou chercher combien de fois un nombre est contenu dans un autre.</p>
          ${figure(schema("cm2-division", "La division 5 875 divisé par 25 posée : quotient 235, reste 0."), "5 875 : 25 = 235, reste 0. Preuve : 235 × 25 = 5 875.")}
          ${formula("dividende = diviseur × quotient + reste, avec reste &lt; diviseur")}
          ${methode([
            "Prendre à gauche du dividende assez de chiffres pour contenir le diviseur.",
            "Chercher combien de fois le diviseur y est contenu, multiplier, soustraire.",
            "Abaisser le chiffre suivant et recommencer.",
          ])}
          ${exemple(["4 375 ÷ 25 = 175, car 25 × 175 = 4 375.", "1 000 ÷ 7 : quotient 142, reste 6 (7 × 142 + 6 = 1 000)."])}
          ${retenir("Pour vérifier une division : diviseur × quotient + reste doit redonner le dividende.")}`,
      },
    ],
  },
  {
    title: "Les nombres décimaux",
    summary: "Partie entière et partie décimale, fractions décimales, comparaison des décimaux.",
    strand: NUM,
    lessons: [
      {
        title: "Lire et écrire les nombres décimaux",
        minutes: 12,
        body: `<p>Un nombre décimal a une <strong>partie entière</strong> et une <strong>partie décimale</strong>, séparées par une virgule.</p>
          ${figure(schema("cm2-decimal", "Une droite graduée de 15 à 16 : A est à 15,375."), "15,375 : 15 unités, 3 dixièmes, 7 centièmes et 5 millièmes.")}
          ${tableau([
            ["Centaines", "Dizaines", "Unités", ",", "Dixièmes", "Centièmes", "Millièmes"],
            ["1", "2", "5", ",", "3", "0", "7"],
          ])}
          <p>125,307 se lit « cent vingt-cinq virgule trois cent sept » ou « 125 unités et 307 millièmes ».</p>
          ${exemple([`${frac("7", "10")} = 0,7 ; ${frac("45", "100")} = 0,45 ; ${frac("3", "1000")} = 0,003 : ce sont des fractions décimales.`])}
          ${retenir("On ne change pas un nombre décimal en ajoutant ou en supprimant des zéros à la fin de sa partie décimale : 2,5 = 2,50 = 2,500.")}`,
      },
      {
        title: "Comparer et ranger les nombres décimaux",
        minutes: 12,
        body: `${figure(schema("cm2-decimaux-comparer", "Une droite graduée de 2 à 3 : A est à 2,35 et B à 2,7."), "2,35 &lt; 2,7 : même partie entière ; on compare les dixièmes : 3 &lt; 7.")}
          ${methode([
            "Comparer d’abord les parties entières.",
            "Si elles sont égales, comparer les dixièmes, puis les centièmes, puis les millièmes.",
          ])}
          ${exemple(["3,45 et 3,5 : même partie entière ; dixièmes : 4 &lt; 5, donc 3,45 &lt; 3,5.", "Astuce : écrire 3,5 = 3,50 ; on compare alors 45 centièmes et 50 centièmes."])}
          ${retenir("Le nombre qui a le plus de chiffres après la virgule n’est pas forcément le plus grand : 0,9 &gt; 0,125.")}`,
      },
    ],
  },
  {
    title: "Opérations sur les nombres décimaux",
    summary: "Additionner, soustraire, multiplier et diviser des nombres décimaux.",
    strand: NUM,
    lessons: [
      {
        title: "Addition et soustraction des nombres décimaux",
        minutes: 12,
        body: `${figure("<table><tr><td></td><td>1</td><td>2</td><td>5</td><td>,</td><td>6</td><td>0</td></tr><tr><td>−</td><td></td><td>4</td><td>8</td><td>,</td><td>7</td><td>5</td></tr><tr><th>=</th><th></th><th>7</th><th>6</th><th>,</th><th>8</th><th>5</th></tr></table>", "On aligne les virgules et on complète avec un zéro : 125,60 − 48,75 = 76,85.")}
          ${methode([
            "Poser les nombres en alignant les virgules les unes sous les autres.",
            "Compléter avec des zéros si nécessaire.",
            "Calculer comme avec des entiers, puis placer la virgule du résultat sous les autres.",
          ])}
          ${exemple(["12,5 + 3,75 = 16,25 (on écrit 12,50 + 3,75).", "20 − 7,35 = 12,65 (on écrit 20,00 − 7,35)."])}`,
      },
      {
        title: "Multiplication des nombres décimaux",
        minutes: 15,
        body: `${figure("<table><tr><th>3,25 × 10</th><td>32,5</td></tr><tr><th>3,25 × 100</th><td>325</td></tr><tr><th>3,25 × 1 000</th><td>3 250</td></tr></table>", "Multiplier par 10, 100 ou 1 000 : la virgule avance de 1, 2 ou 3 rangs vers la droite.")}
          ${retenir("Pour multiplier par 10, 100 ou 1 000, on déplace la virgule de 1, 2 ou 3 rangs vers la droite : 3,45 × 100 = 345.")}
          ${methode([
            "Calculer le produit sans tenir compte des virgules.",
            "Compter le nombre total de chiffres après la virgule dans les deux facteurs.",
            "Placer la virgule dans le résultat pour avoir autant de chiffres après la virgule.",
          ], "Multiplier deux décimaux")}
          ${exemple(["2,5 × 1,2 : 25 × 12 = 300 ; il y a 2 chiffres après les virgules, donc 2,5 × 1,2 = 3,00 = 3.", "Un mètre de tissu coûte 1 250 F : 2,5 m coûtent 1 250 × 2,5 = 3 125 F."])}`,
      },
      {
        title: "Division des nombres décimaux",
        minutes: 15,
        body: `${figure("<table><tr><th>45 ÷ 10</th><td>4,5</td></tr><tr><th>45 ÷ 100</th><td>0,45</td></tr><tr><th>45 ÷ 1 000</th><td>0,045</td></tr></table>", "Diviser par 10, 100 ou 1 000 : la virgule recule de 1, 2 ou 3 rangs vers la gauche.")}
          ${retenir("Pour diviser par 10, 100 ou 1 000, on déplace la virgule de 1, 2 ou 3 rangs vers la gauche : 45 ÷ 100 = 0,45.")}
          ${liste([
            "<strong>Décimal ÷ entier</strong> : on divise normalement et on met la virgule au quotient au moment d’abaisser le premier chiffre après la virgule (8,4 ÷ 4 = 2,1).",
            "<strong>Quotient décimal de deux entiers</strong> : on ajoute une virgule et des zéros au dividende pour continuer (7 ÷ 4 = 1,75).",
            "<strong>Diviser par un décimal</strong> : on multiplie le dividende et le diviseur par 10, 100… pour que le diviseur devienne entier (6 ÷ 1,5 = 60 ÷ 15 = 4).",
          ])}
          ${exemple(["4 cahiers coûtent 1 500 F : un cahier coûte 1 500 ÷ 4 = 375 F."])}`,
      },
    ],
  },
  {
    title: "Les fractions",
    summary: "Notion de fraction, simplification, réduction au même dénominateur, comparaison.",
    strand: NUM,
    lessons: [
      {
        title: "Notion de fraction",
        minutes: 12,
        body: `<p>Dans la fraction ${frac("3", "4")}, 4 est le <strong>dénominateur</strong> (en combien de parts égales on partage l’unité) et 3 le <strong>numérateur</strong> (combien de parts on prend).</p>
          ${figure(schema("ce2-fraction", "Une bande partagée en 4 parts égales, dont 3 sont coloriées."), "3/4 : l’unité est partagée en 4 parts égales et on en prend 3.")}
          ${liste([
            `si le numérateur est plus petit que le dénominateur, la fraction est plus petite que 1 (${frac("3", "4")} &lt; 1) ;`,
            `s’ils sont égaux, elle vaut 1 (${frac("5", "5")} = 1) ;`,
            `s’il est plus grand, elle est plus grande que 1 : ${frac("7", "4")} = 1 + ${frac("3", "4")} (nombre fractionnaire 1 ${frac("3", "4")}).`,
          ])}
          ${exemple([`Un pain partagé en 8 parts égales : Awa en mange 3 ; elle a mangé ${frac("3", "8")} du pain.`])}`,
      },
      {
        title: "Simplifier une fraction",
        minutes: 12,
        body: `${figure(schema("cm2-fractions-egales", "Deux bandes : 2/4 et 1/2, de même longueur coloriée."), "2/4 = 1/2 : on divise le numérateur et le dénominateur par 2.")}
          ${retenir("On ne change pas une fraction en multipliant ou en divisant son numérateur et son dénominateur par un même nombre (non nul).")}
          ${methode([
            "Chercher un diviseur commun au numérateur et au dénominateur (caractères de divisibilité).",
            "Diviser les deux termes par ce nombre.",
            "Recommencer jusqu’à obtenir une fraction irréductible.",
          ])}
          ${exemple([`${frac("18", "24")} = ${frac("18 ÷ 6", "24 ÷ 6")} = ${frac("3", "4")}.`, `${frac("45", "60")} = ${frac("9", "12")} = ${frac("3", "4")} (on a divisé par 5, puis par 3).`])}`,
      },
      {
        title: "Réduire au même dénominateur et comparer",
        minutes: 15,
        body: `${figure(schema("cm2-fractions-comparer", "Deux bandes de 12 parts : 8/12 et 9/12."), "2/3 = 8/12 et 3/4 = 9/12 : donc 2/3 &lt; 3/4.")}
          ${methode([
            "Chercher un multiple commun aux dénominateurs (souvent le plus petit).",
            "Transformer chaque fraction pour qu’elle ait ce dénominateur.",
          ], "Réduire au même dénominateur")}
          ${exemple([`${frac("2", "3")} et ${frac("3", "4")} : dénominateur commun 12. ${frac("2", "3")} = ${frac("8", "12")} et ${frac("3", "4")} = ${frac("9", "12")}.`])}
          ${retenir("Deux fractions de même dénominateur se rangent comme leurs numérateurs : 8/12 &lt; 9/12, donc 2/3 &lt; 3/4. Deux fractions de même numérateur : la plus grande est celle qui a le plus petit dénominateur (1/3 &gt; 1/5).")}`,
      },
    ],
  },
  {
    title: "Opérations sur les fractions",
    summary: "Additionner, soustraire, multiplier des fractions ; fraction d’une grandeur.",
    strand: NUM,
    lessons: [
      {
        title: "Additionner et soustraire des fractions",
        minutes: 12,
        body: `${figure(schema("cm2-fractions-somme", "Trois bandes : 2/4, 1/4 et 3/4."), "1/2 + 1/4 = 2/4 + 1/4 = <strong>3/4</strong> : on met d’abord les fractions au même dénominateur.")}
          ${retenir("Pour additionner ou soustraire des fractions, il faut qu’elles aient le même dénominateur : on additionne (ou on soustrait) les numérateurs et on garde le dénominateur.")}
          ${exemple([
            `${frac("2", "7")} + ${frac("3", "7")} = ${frac("5", "7")}.`,
            `${frac("1", "2")} + ${frac("1", "3")} = ${frac("3", "6")} + ${frac("2", "6")} = ${frac("5", "6")}.`,
            `1 − ${frac("3", "8")} = ${frac("8", "8")} − ${frac("3", "8")} = ${frac("5", "8")}.`,
          ])}`,
      },
      {
        title: "Multiplier et diviser des fractions",
        minutes: 12,
        body: `${figure("<table><tr><th>2/3 × 4/5</th><td>(2 × 4) / (3 × 5) = 8/15</td></tr><tr><th>2/3 de 30</th><td>30 : 3 × 2 = 20</td></tr></table>", "On multiplie les numérateurs entre eux et les dénominateurs entre eux.")}
          ${formula(`${frac("a", "b")} × ${frac("c", "d")} = ${frac("a × c", "b × d")}`)}
          ${exemple([`${frac("2", "3")} × ${frac("3", "5")} = ${frac("6", "15")} = ${frac("2", "5")}.`, `${frac("3", "4")} × 8 = ${frac("24", "4")} = 6.`])}
          ${retenir(`Diviser une fraction par un nombre entier, c’est multiplier son dénominateur par ce nombre : ${frac("3", "4")} ÷ 2 = ${frac("3", "8")}.`)}`,
      },
      {
        title: "Fraction d’une grandeur",
        minutes: 15,
        body: `${figure(schema("cm2-fraction-grandeur", "7 500 F partagés en 3/5 et 2/5."), "Les 3/5 de 7 500 F : 7 500 : 5 = 1 500 ; 1 500 × 3 = <strong>4 500 F</strong>.")}
          ${methode([
            "Pour prendre une fraction d’une grandeur, on divise la grandeur par le dénominateur, puis on multiplie par le numérateur.",
          ], "Prendre une fraction d’une grandeur")}
          ${exemple([`Les ${frac("3", "5")} de 2 000 F : 2 000 ÷ 5 = 400 ; 400 × 3 = 1 200 F.`])}
          ${methode([
            "On divise la valeur connue par le numérateur : on obtient la valeur d’une part.",
            "On multiplie par le dénominateur.",
          ], "Retrouver une grandeur dont on connaît une fraction")}
          ${exemple([`Les ${frac("2", "3")} d’une somme valent 600 F. Une part : 600 ÷ 2 = 300 F ; la somme : 300 × 3 = 900 F.`])}`,
      },
    ],
  },
  {
    title: "Pourcentages, échelles et proportionnalité",
    summary: "Calculer un pourcentage, utiliser une échelle, tableaux de proportionnalité, règle de trois.",
    strand: NUM,
    lessons: [
      {
        title: "Les pourcentages",
        minutes: 15,
        body: `<p>Un pourcentage est une fraction de dénominateur 100 : 15 % = ${frac("15", "100")}.</p>
          ${figure(schema("cm2-pourcent", "Un carré de 100 carreaux dont 15 sont coloriés."), "15 % = 15/100 : 15 carreaux sur 100. 15 % de 4 000 F = 4 000 × 15 : 100 = 600 F.")}
          ${formula("Prendre 15 % de 4 000 F : 4 000 × 15 ÷ 100 = 600 F")}
          ${exemple([
            "Une classe de 40 élèves compte 60 % de filles : 40 × 60 ÷ 100 = 24 filles.",
            "Sur 25 élèves, 5 sont absents : 5 ÷ 25 = 0,20, soit 20 % d’absents.",
          ])}
          ${retenir("50 % = la moitié ; 25 % = le quart ; 10 % = le dixième ; 100 % = le tout.")}`,
      },
      {
        title: "Les échelles",
        minutes: 12,
        body: `<p>L’<strong>échelle</strong> d’un plan ou d’une carte est le rapport entre une distance sur le plan et la distance réelle, dans la même unité.</p>
          ${figure(schema("cm2-echelle", "Une carte : 4 cm entre A et B, échelle 1 cm pour 500 m."), "À l’échelle 1/50 000, 1 cm représente 500 m : 4 cm représentent 2 000 m, soit 2 km.")}
          ${formula(`Échelle ${frac("1", "100 000")} : 1 cm sur la carte représente 100 000 cm = 1 km en réalité`)}
          ${tableau([
            ["On cherche…", "On calcule…"],
            ["la distance réelle", "distance sur la carte × dénominateur de l’échelle"],
            ["la distance sur la carte", "distance réelle ÷ dénominateur de l’échelle"],
            ["l’échelle", "distance sur la carte ÷ distance réelle (même unité)"],
          ])}
          ${exemple(["Sur une carte à 1/1 000 000, Dakar et Thiès sont à 7 cm : 7 × 1 000 000 cm = 7 000 000 cm = 70 km."])}`,
      },
      {
        title: "Proportionnalité et règle de trois",
        minutes: 15,
        body: `<p>Deux grandeurs sont <strong>proportionnelles</strong> si on passe de l’une à l’autre en multipliant toujours par le même nombre (le coefficient).</p>
          ${figure("<table><tr><th>riz (kg)</th><td>1</td><td>2</td><td>5</td><td>10</td></tr><tr><th>prix (F)</th><td>450</td><td>900</td><td>2 250</td><td>4 500</td></tr></table>", "Le prix est proportionnel à la masse : on multiplie toujours par 450.")}
          ${tableau([
            ["Kilos de riz", "1", "2", "5", "10"],
            ["Prix (F)", "450", "900", "2 250", "4 500"],
          ])}
          ${methode([
            "Calculer la valeur pour 1 unité (division).",
            "Multiplier par le nombre d’unités demandé.",
          ], "Règle de trois (passage par l’unité)")}
          ${exemple(["3 m de tissu coûtent 4 500 F. 1 m coûte 4 500 ÷ 3 = 1 500 F ; 7 m coûtent 1 500 × 7 = 10 500 F."])}`,
      },
    ],
  },
];
