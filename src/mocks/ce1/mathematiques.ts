// Mathématiques du CE1 (étape 2 du CEB, niveau 1). Progression : cahier d’exercices PAAME du CE1
// (MEN, édition 2024, conforme au CEB) et guide pédagogique officiel de l’étape 2. Leçons rédigées
// par DIANGAL, à faire valider par un enseignant.

import { tableau } from "../3e/blocks";
import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";
import { counted, figure, pic, row, schema, sign } from "../lesson-figures";

const NUM = "Activités numériques";
const GEO = "Activités géométriques";
const MES = "Activités de mesure";
const PB = "Résolution de problèmes";

export const MATH_CE1: CiChapterSpec[] = [
  // ── Activités numériques ──────────────────────────────────────────────────
  {
    title: "Les nombres jusqu’à 500",
    strand: NUM,
    summary: "Lire, écrire et décomposer les nombres jusqu’à 500 ; nombres pairs et impairs, double et moitié.",
    lessons: [
      {
        title: "Lire, écrire et décomposer les nombres jusqu’à 500",
        body: `<p>Un nombre de trois chiffres a des <strong>centaines</strong>, des <strong>dizaines</strong> et des <strong>unités</strong>.</p>
          ${figure(schema("ce1-347", "347 : 3 plaques de 100, 4 barres de 10 et 7 cubes."), "347, c’est <strong>3 centaines</strong>, <strong>4 dizaines</strong> et <strong>7 unités</strong> : 300 + 40 + 7.")}
          ${tableau([
            ["Centaines", "Dizaines", "Unités"],
            ["3", "4", "7"],
          ])}
          <p>347 = 300 + 40 + 7. On lit : trois cent quarante-sept.</p>
          ${keyPoint("100 unités = 10 dizaines = 1 centaine. Le chiffre de gauche est celui des centaines.")}
          ${practice(["Décompose 258 en centaines, dizaines et unités.", "Écris en chiffres : quatre cent six."])}`,
      },
      {
        title: "Pairs, impairs, double et moitié",
        body: `${figure(schema("ce1-pairs", "10 jetons rangés par deux, sans jeton seul."), "10 jetons se rangent par deux sans en laisser un seul : 10 est <strong>pair</strong>. Sa moitié est 5.")}
          ${bullets([
            "Un nombre <strong>pair</strong> se termine par 0, 2, 4, 6 ou 8 : on peut le partager en deux parts égales.",
            "Un nombre <strong>impair</strong> se termine par 1, 3, 5, 7 ou 9.",
            "Le <strong>double</strong> de 12 est 24 (12 + 12) ; la <strong>moitié</strong> de 24 est 12.",
          ])}
          ${keyPoint("Pour trouver le double, j’ajoute le nombre à lui-même. Pour trouver la moitié, je partage en deux parts égales.")}
          ${practice(["Donne le double de 15, 20 et 35.", "Donne la moitié de 10, 30 et 50."])}`,
      },
    ],
  },
  {
    title: "Les nombres jusqu’à 1 000",
    strand: NUM,
    summary: "Les nombres de 500 à 999 et le nombre 1 000.",
    lessons: [
      {
        title: "Les nombres de 500 à 1 000",
        body: `<p>Après 999 vient <strong>1 000</strong> (mille) : 10 centaines font un millier.</p>
          ${figure(schema("ce1-mille", "Dix plaques de 100 cubes."), "10 centaines font <strong>1 000</strong> (mille).")}
          ${bullets(["999 + 1 = 1 000.", "1 000 = 500 + 500 = 900 + 100 = 10 × 100."])}
          ${keyPoint("Pour comparer deux nombres de trois chiffres, je compare d’abord les centaines, puis les dizaines, puis les unités.")}
          ${practice(["Range dans l’ordre croissant : 712, 527, 689, 590.", "Complète : 600 + … = 1 000."])}`,
      },
    ],
  },
  {
    title: "Les nombres jusqu’à 10 000",
    strand: NUM,
    summary: "Lire, écrire, décomposer et comparer les nombres jusqu’à 10 000.",
    lessons: [
      {
        title: "Lire et écrire les nombres jusqu’à 10 000",
        body: `${figure(row(schema("ce1-billets-4000", "Quatre billets de 1 000 F."), pic("piece-100", "100 F", 44), pic("piece-100", "100 F", 44), pic("piece-5", "5 F", 44)), "4 billets de 1 000 F, 2 pièces de 100 F et 1 pièce de 5 F : <strong>4 205 F</strong>.")}
          ${tableau([
            ["Unités de mille", "Centaines", "Dizaines", "Unités"],
            ["4", "2", "0", "5"],
          ])}
          <p>4 205 = 4 000 + 200 + 5. On lit : quatre mille deux cent cinq.</p>
          ${keyPoint("On laisse un petit espace entre les mille et les centaines : 4 205. Mille ne prend jamais de « s ».")}
          ${practice(["Écris en chiffres : sept mille trente.", "Écris en lettres : 9 999."])}`,
      },
      {
        title: "Comparer et ranger les nombres",
        body: `${figure(schema("ce1-droite-5000", "Une droite graduée de 5 000 à 6 000 : A est à 5 432, B à 5 621."), "Sur la droite, 5 432 est avant 5 621 : <strong>5 432 &lt; 5 621</strong>.")}
          ${bullets([
            "Le nombre qui a le plus de chiffres est le plus grand : 1 250 &gt; 980.",
            "S’ils ont autant de chiffres, je compare de gauche à droite : 5 432 &lt; 5 621, car 4 &lt; 6.",
          ])}
          ${keyPoint("Les signes : &lt; veut dire « plus petit que », &gt; veut dire « plus grand que ».")}
          ${practice(["Compare 7 089 et 7 098.", "Range du plus grand au plus petit : 3 500, 5 300, 3 050."])}`,
      },
    ],
  },
  {
    title: "L’addition",
    strand: NUM,
    summary: "Sens de l’addition ; additionner sans retenue et avec retenue.",
    lessons: [
      {
        title: "Additionner sans et avec retenue",
        body: `<p>On additionne pour trouver un <strong>total</strong> : « en tout », « ensemble ».</p>
          ${figure(schema("ce1-addition", "L’addition 368 + 254 posée en colonnes, avec les retenues en rouge."), "8 + 4 = 12 : j’écris 2 et je retiens 1. 6 + 5 + 1 = 12 : j’écris 2 et je retiens 1. 3 + 2 + 1 = 6. Donc 368 + 254 = 622.")}
          ${bullets([
            "Je pose l’addition en colonnes : unités sous unités, dizaines sous dizaines.",
            "Je commence par les unités.",
            "Si une colonne dépasse 9, j’écris les unités et je mets la <strong>retenue</strong> sur la colonne suivante.",
          ])}
          <p>Exemple : 368 + 254 = 622 (8 + 4 = 12, j’écris 2 et je retiens 1).</p>
          ${keyPoint("On peut additionner dans n’importe quel ordre : 125 + 75 = 75 + 125.")}
          ${practice(["Calcule 245 + 132 et 476 + 258.", "Moussa a 350 F, son frère lui donne 200 F. Combien a-t-il en tout ?"])}`,
      },
    ],
  },
  {
    title: "La soustraction",
    strand: NUM,
    summary: "Sens de la soustraction ; soustraire sans retenue et avec retenue.",
    lessons: [
      {
        title: "Soustraire sans et avec retenue",
        body: `<p>On soustrait pour trouver ce qui <strong>reste</strong> ou la <strong>différence</strong> entre deux nombres.</p>
          ${figure(schema("ce1-soustraction", "La soustraction 523 − 178 posée en colonnes."), "523 − 178 = 345. Je vérifie avec une addition : 345 + 178 = 523.")}
          ${bullets([
            "Je pose la soustraction : le plus grand nombre en haut.",
            "Je commence par les unités.",
            "Si je ne peux pas enlever, j’ajoute 10 en haut et 1 au chiffre suivant en bas (la retenue).",
          ])}
          <p>Exemple : 742 − 318 = 424.</p>
          ${keyPoint("Pour vérifier une soustraction, j’additionne le résultat et le nombre enlevé : 424 + 318 = 742.")}
          ${practice(["Calcule 865 − 432 et 703 − 256.", "Awa avait 500 F, elle achète du pain à 150 F. Combien lui reste-t-il ?"])}`,
      },
    ],
  },
  {
    title: "La multiplication",
    strand: NUM,
    summary: "Sens de la multiplication, tables de 1 à 6, multiplier sans et avec retenue.",
    lessons: [
      {
        title: "Le sens de la multiplication et les tables",
        body: `<p>Multiplier, c’est additionner plusieurs fois le même nombre : 4 + 4 + 4 = 3 × 4 = 12.</p>
          ${figure(schema("ce1-groupes", "3 groupes de 4 jetons."), "3 groupes de 4 jetons : 4 + 4 + 4 = <strong>3 × 4 = 12</strong>.")}
          ${tableau([
            ["× 2", "× 3", "× 4", "× 5"],
            ["2 × 6 = 12", "3 × 6 = 18", "4 × 6 = 24", "5 × 6 = 30"],
          ])}
          ${keyPoint("Le <strong>triple</strong> d’un nombre, c’est 3 fois ce nombre : le triple de 7 est 21.")}
          ${practice(["Récite la table de 6.", "Il y a 5 rangées de 4 tables dans la classe. Combien de tables ?"])}`,
      },
      {
        title: "Multiplier un nombre",
        body: `${figure(schema("ce1-multiplication", "La multiplication 124 × 3 posée en colonnes, avec la retenue en rouge."), "4 × 3 = 12 : j’écris 2 et je retiens 1. 2 × 3 + 1 = 7. 1 × 3 = 3. Donc 124 × 3 = 372.")}
          ${bullets([
            "Je multiplie d’abord les unités, puis les dizaines, puis les centaines.",
            "Si un produit dépasse 9, j’écris les unités et je retiens les dizaines.",
            "Avec deux chiffres au multiplicateur, je fais deux lignes, la deuxième décalée d’un rang (0).",
          ])}
          <p>Exemple : 124 × 3 = 372 ; 23 × 12 = 46 + 230 = 276.</p>
          ${keyPoint("Multiplier par 10, c’est ajouter un zéro à droite : 35 × 10 = 350.")}
          ${practice(["Calcule 213 × 3 et 47 × 5.", "Un cahier coûte 125 F. Combien coûtent 4 cahiers ?"])}`,
      },
    ],
  },
  {
    title: "La division",
    strand: NUM,
    summary: "Sens de la division (partage), division sans reste et avec reste ; nombres divisibles par 2 et 5.",
    lessons: [
      {
        title: "Partager : la division",
        body: `<p>Diviser, c’est <strong>partager en parts égales</strong>. 12 ÷ 3 = 4 : 12 mangues partagées entre 3 enfants, chacun en a 4.</p>
          ${figure(row(counted("mangue", 4, "4 pour Awa", 30), counted("mangue", 4, "4 pour Modou", 30), counted("mangue", 4, "4 pour Fatou", 30)), "12 mangues partagées entre 3 enfants : chacun en a 4. 12 ÷ 3 = 4.")}
          ${bullets([
            "Division sans reste : 20 ÷ 5 = 4, car 5 × 4 = 20.",
            "Division avec reste : 17 ÷ 5 = 3, il reste 2, car 5 × 3 + 2 = 17.",
          ])}
          ${keyPoint("Le reste est toujours plus petit que le diviseur.")}
          ${practice(["Partage 24 bonbons entre 6 enfants.", "Combien de paquets de 4 peut-on faire avec 18 biscuits ? Reste-t-il des biscuits ?"])}`,
      },
      {
        title: "Les nombres divisibles par 2 et par 5",
        body: `${figure("<table><tr><th>× 2</th><td>2</td><td>4</td><td>6</td><td>8</td><td>10</td><td>12</td><td>14</td></tr><tr><th>× 5</th><td>5</td><td>10</td><td>15</td><td>20</td><td>25</td><td>30</td><td>35</td></tr></table>", "Les multiples de 2 finissent par 0, 2, 4, 6 ou 8 ; ceux de 5 par 0 ou 5.")}
          ${bullets([
            "Un nombre est divisible par 2 s’il est pair (il se termine par 0, 2, 4, 6, 8).",
            "Un nombre est divisible par 5 s’il se termine par 0 ou 5.",
          ])}
          ${keyPoint("40 est divisible par 2 et par 5 ; 35 seulement par 5 ; 18 seulement par 2.")}
          ${practice(["Parmi 15, 22, 30, 41, lesquels sont divisibles par 5 ?", "Écris trois nombres divisibles par 2 et par 5."])}`,
      },
    ],
  },
  // ── Activités géométriques ────────────────────────────────────────────────
  {
    title: "Lignes et droites",
    strand: GEO,
    summary: "Lignes droites, brisées et courbes ; droites horizontales, verticales et obliques ; droites sécantes, perpendiculaires et parallèles ; l’angle droit.",
    lessons: [
      {
        title: "Lignes droites, brisées et courbes",
        body: `${figure(schema("cp-lignes", "Trois lignes : A droite, B courbe, C brisée."), "A est une ligne <strong>droite</strong>, B une ligne <strong>courbe</strong>, C une ligne <strong>brisée</strong>.")}${figure(schema("ce1-directions", "Trois droites : A horizontale, B verticale, C oblique."), "A est <strong>horizontale</strong>, B <strong>verticale</strong>, C <strong>oblique</strong>.")}
          ${bullets([
            "Une ligne <strong>droite</strong> se trace avec la règle.",
            "Une ligne <strong>brisée</strong> est faite de plusieurs segments droits.",
            "Une ligne <strong>courbe</strong> n’a pas de partie droite.",
            "Une droite <strong>horizontale</strong> est couchée, une droite <strong>verticale</strong> est debout (comme le fil à plomb), une droite <strong>oblique</strong> est penchée.",
          ])}
          ${keyPoint("Pour tracer une droite, je tiens bien la règle et je fais glisser le crayon le long de son bord.")}
          ${practice(["Trace une ligne droite, une ligne brisée et une ligne courbe.", "Cherche dans la classe une ligne verticale et une ligne horizontale."])}`,
      },
      {
        title: "Droites sécantes, perpendiculaires et parallèles",
        body: `${figure(schema("ce1-droites", "Trois paires de droites : A sécantes, B perpendiculaires, C parallèles."), "A : droites <strong>sécantes</strong>. B : droites <strong>perpendiculaires</strong> (angle droit). C : droites <strong>parallèles</strong>.")}
          ${bullets([
            "Deux droites <strong>sécantes</strong> se coupent en un point.",
            "Deux droites <strong>perpendiculaires</strong> se coupent en formant un <strong>angle droit</strong> (on le vérifie avec l’équerre).",
            "Deux droites <strong>parallèles</strong> ne se coupent jamais, même si on les prolonge : elles restent toujours à la même distance.",
          ])}
          ${keyPoint("Les bords d’une feuille forment des angles droits ; les rails du train sont parallèles.")}
          ${practice(["Avec ton équerre, trace deux droites perpendiculaires.", "Trace deux droites parallèles en utilisant les lignes de ton cahier."])}`,
      },
    ],
  },
  {
    title: "Le carré et le rectangle",
    strand: GEO,
    summary: "Reconnaître et tracer le carré et le rectangle ; leurs diagonales et leurs médianes.",
    lessons: [
      {
        title: "Le carré et le rectangle",
        body: `${figure(schema("cp-carre-rectangle", "Un carré A et un rectangle B sur un quadrillage."), "Le carré A a 4 côtés égaux ; le rectangle B a 2 longueurs et 2 largeurs. Tous deux ont 4 angles droits.")}
          ${tableau([
            ["Figure", "Côtés", "Angles"],
            ["carré", "4 côtés de même longueur", "4 angles droits"],
            ["rectangle", "2 grands côtés égaux (longueurs) et 2 petits côtés égaux (largeurs)", "4 angles droits"],
          ])}
          ${keyPoint("Pour vérifier qu’une figure est un carré, je mesure ses côtés avec la règle et je vérifie ses angles avec l’équerre.")}
          ${practice(["Trace un carré de 4 cm de côté sur ton cahier.", "Trace un rectangle de 6 cm sur 3 cm."])}`,
      },
      {
        title: "Diagonales et médianes",
        body: `${figure(schema("ce1-diagonales", "Un carré avec deux traits rouges : A relie deux coins opposés, B relie les milieux de deux côtés."), "A est une <strong>diagonale</strong> : elle relie deux sommets opposés. B est une <strong>médiane</strong> : elle relie les milieux de deux côtés opposés.")}
          ${bullets([
            "Les <strong>diagonales</strong> relient deux sommets opposés. Dans un carré et dans un rectangle, elles ont la même longueur et se coupent en leur milieu.",
            "Les <strong>médianes</strong> relient les milieux de deux côtés opposés.",
          ])}
          ${keyPoint("Dans un carré, les diagonales sont en plus perpendiculaires.")}
          ${practice(["Trace les deux diagonales d’un carré : qu’observes-tu ?", "Plie une feuille rectangulaire en deux : le pli est une médiane."])}`,
      },
    ],
  },
  // ── Activités de mesure ───────────────────────────────────────────────────
  {
    title: "Mesurer des longueurs",
    strand: MES,
    summary: "Le mètre, le décimètre, le centimètre et le millimètre.",
    lessons: [
      {
        title: "Le mètre et ses sous-multiples",
        body: `${figure(schema("ce1-metre", "Un mètre partagé en 10 décimètres."), "Le mètre se partage en 10 décimètres, et chaque décimètre en 10 centimètres.")}
          ${tableau([
            ["m", "dm", "cm", "mm"],
            ["1 m = 10 dm", "1 dm = 10 cm", "1 cm = 10 mm", ""],
          ])}
          ${bullets(["1 m = 100 cm = 1 000 mm.", "On mesure une table en mètres ou en centimètres, un crayon en centimètres, une fourmi en millimètres."])}
          ${keyPoint("Pour mesurer avec la règle, je place le 0 au début de l’objet.")}
          ${practice(["Mesure ton crayon et ton cahier.", "Convertis : 3 m = … cm ; 50 mm = … cm."])}`,
      },
    ],
  },
  {
    title: "Mesurer des capacités",
    strand: MES,
    summary: "Le litre, le décilitre, le centilitre et le millilitre.",
    lessons: [
      {
        title: "Le litre et ses sous-multiples",
        body: `<p>La <strong>capacité</strong> est la quantité de liquide qu’un récipient peut contenir. L’unité est le <strong>litre</strong> (L).</p>
          ${figure(schema("cp-litres", "Trois bouteilles : 1 litre, un demi-litre et un quart de litre."), "1 L = 10 dL = 100 cL. Deux bouteilles d’un demi-litre font 1 litre.")}
          ${tableau([
            ["L", "dL", "cL", "mL"],
            ["1 L = 10 dL", "1 dL = 10 cL", "1 cL = 10 mL", ""],
          ])}
          ${keyPoint("1 L = 100 cL. Une bouteille d’eau contient souvent 1,5 L ; une canette 33 cL.")}
          ${practice(["Combien de verres de 20 cL peut-on remplir avec 1 L ?", "Convertis : 2 L = … dL."])}`,
      },
    ],
  },
  {
    title: "Les masses",
    strand: MES,
    summary: "Le kilogramme et le gramme ; peser avec les masses marquées.",
    lessons: [
      {
        title: "Le kilogramme et le gramme",
        body: `<p>On mesure la <strong>masse</strong> d’un objet avec une balance. Les unités sont le <strong>kilogramme</strong> (kg) et le <strong>gramme</strong> (g).</p>
          ${figure(schema("ce1-kilo", "Une balance en équilibre : un sac de riz et deux masses d’un demi-kilogramme."), "Le sac de riz pèse 500 g + 500 g = <strong>1 kg</strong>.")}
          ${bullets(["1 kg = 1 000 g.", "1 kg = 500 g + 500 g = 4 × 250 g."])}
          ${keyPoint("Un sac de riz se pèse en kilogrammes ; un morceau de savon en grammes.")}
          ${practice(["Combien de paquets de 250 g faut-il pour faire 1 kg ?", "Convertis : 2 kg = … g."])}`,
      },
    ],
  },
  {
    title: "Le temps",
    strand: MES,
    summary: "Jours, semaines, mois et années ; lire l’heure (heures et minutes).",
    lessons: [
      {
        title: "Jours, semaines, mois et années",
        body: `${figure("<table><tr><th>lun.</th><th>mar.</th><th>mer.</th><th>jeu.</th><th>ven.</th><th>sam.</th><th>dim.</th></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td>1</td></tr><tr><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr><tr><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td></tr><tr><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td></tr><tr><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td></tr><tr><td>30</td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>", "Novembre 2026 : 30 jours, rangés par semaines de 7 jours.")}
          ${bullets([
            "1 semaine = 7 jours ; 1 mois = 30 ou 31 jours (28 ou 29 en février) ; 1 année = 12 mois = 365 jours.",
            "Les jours : lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.",
          ])}
          ${keyPoint("Le calendrier permet de retrouver une date : jour, mois, année.")}
          ${practice(["Quel jour serons-nous dans 7 jours ?", "Cite les mois de l’année dans l’ordre."])}`,
      },
      {
        title: "Lire l’heure",
        body: `${figure(row(schema("ce1-heure-9-15", "Une horloge qui marque 9 h 15."), schema("ce1-heure-2-45", "Une horloge qui marque 2 h 45.")), "À gauche : <strong>9 h 15</strong> (9 heures et quart). À droite : <strong>2 h 45</strong> (3 heures moins le quart).")}
          ${bullets([
            "La petite aiguille indique les <strong>heures</strong>, la grande aiguille les <strong>minutes</strong>.",
            "1 heure = 60 minutes ; une demi-heure = 30 minutes ; un quart d’heure = 15 minutes.",
          ])}
          ${keyPoint("Quand la grande aiguille est sur le 12, il est une heure « pile » : 8 h 00.")}
          ${practice(["À quelle heure commence l’école ? Dessine les aiguilles.", "Le car part à 9 h et roule 30 minutes. À quelle heure arrive-t-il ?"])}`,
      },
    ],
  },
  {
    title: "Le périmètre du carré et du rectangle",
    strand: MES,
    summary: "Calculer le tour d’un carré et d’un rectangle.",
    lessons: [
      {
        title: "Calculer un périmètre",
        body: `<p>Le <strong>périmètre</strong> est la longueur du tour d’une figure.</p>
          ${figure(schema("ce1-perimetre", "Un rectangle de 8 m de longueur et 3 m de largeur."), "Périmètre : 8 + 3 + 8 + 3 = (8 + 3) × 2 = <strong>22 m</strong>.")}
          ${bullets([
            "Carré : côté × 4. Un carré de 5 m de côté a un périmètre de 20 m.",
            "Rectangle : (longueur + largeur) × 2. Un rectangle de 8 m sur 3 m a un périmètre de 22 m.",
          ])}
          ${keyPoint("Pour clôturer un jardin, on a besoin de connaître son périmètre.")}
          ${practice(["Calcule le périmètre d’un carré de 6 cm de côté.", "Un champ rectangulaire mesure 50 m sur 20 m. Quelle longueur de grillage faut-il pour l’entourer ?"])}`,
      },
    ],
  },
  {
    title: "La monnaie et les prix",
    strand: MES,
    summary: "Pièces et billets en francs CFA ; prix d’achat, frais, prix de revient et prix de vente.",
    lessons: [
      {
        title: "Pièces et billets",
        body: `${figure(schema("ce1-billets", "Des billets de 500 F, 1 000 F, 2 000 F, 5 000 F et 10 000 F."), "Les billets du franc CFA : 500 F, 1 000 F, 2 000 F, 5 000 F et 10 000 F.")}
          ${bullets([
            "Pièces : 5 F, 10 F, 25 F, 50 F, 100 F, 200 F, 250 F, 500 F.",
            "Billets : 500 F, 1 000 F, 2 000 F, 5 000 F, 10 000 F.",
          ])}
          ${keyPoint("1 000 F = 2 billets de 500 F = 10 pièces de 100 F.")}
          ${practice(["Fais 750 F avec le moins de pièces possible.", "Tu paies un pain de 150 F avec une pièce de 200 F. Combien te rend-on ?"])}`,
      },
      {
        title: "Prix d’achat, prix de revient, prix de vente",
        body: `${figure(row(pic("sac-riz", "prix d’achat : 12 500 F", 56), sign("+"), pic("camion", "transport : 500 F", 40), sign("= prix de revient : 13 000 F")), "Prix de revient = prix d’achat + frais. Vendu 15 000 F, le sac rapporte un bénéfice de 15 000 − 13 000 = 2 000 F.")}
          ${bullets([
            "Le <strong>prix d’achat</strong> est ce que le commerçant paie la marchandise.",
            "Les <strong>frais</strong> sont les dépenses en plus (transport…).",
            "Prix de revient = prix d’achat + frais.",
            "Le <strong>prix de vente</strong> est le prix payé par le client.",
          ])}
          ${keyPoint("Si le prix de vente est plus grand que le prix de revient, le commerçant gagne de l’argent : c’est le bénéfice.")}
          ${practice(["Une vendeuse achète des oranges 2 000 F et paie 300 F de transport. Quel est le prix de revient ?"])}`,
      },
    ],
  },
  // ── Résolution de problèmes ───────────────────────────────────────────────
  {
    title: "Les données d’un problème",
    strand: PB,
    summary: "Informations numériques et non numériques ; données utiles, inutiles et manquantes ; tableau de données.",
    lessons: [
      {
        title: "Trouver les données utiles",
        body: `<p>Un problème contient des <strong>données</strong> : les nombres et les informations qui servent à répondre.</p>
          ${figure(row(pic("eleve-fille", "Fatou, 8 ans", 80), counted("mangue", 3, "3 mangues à 100 F", 30)), "« Fatou a 8 ans. Elle achète 3 mangues à 100 F l’une. » Données utiles : 3 mangues et 100 F. L’âge ne sert pas.")}
          <p>« Fatou a 8 ans. Elle achète 3 mangues à 100 F l’une. Combien paie-t-elle ? »</p>
          ${bullets([
            "Données utiles : 3 mangues, 100 F.",
            "Donnée inutile : 8 ans.",
            "Si on ne connaissait pas le prix d’une mangue, il manquerait une donnée.",
          ])}
          ${keyPoint("Je souligne les données utiles avant de calculer.")}
          ${practice(["Invente un problème avec une donnée inutile.", "Lis un tableau des notes de la classe et trouve la meilleure note."])}`,
      },
    ],
  },
  {
    title: "Les questions d’un problème",
    strand: PB,
    summary: "Relier données et questions ; question finale et questions intermédiaires.",
    lessons: [
      {
        title: "Question finale et questions intermédiaires",
        body: `<p>La <strong>question finale</strong> est ce qu’on cherche à la fin. Parfois, il faut d’abord répondre à une autre question, la <strong>question intermédiaire</strong>.</p>
          ${figure(row(counted("cahier", 2, "2 cahiers à 200 F", 34), pic("crayon", "1 stylo à 100 F", 26), pic("eleve-garcon", "Modou donne 1 000 F", 80)), "D’abord : combien coûtent les achats ? 2 × 200 + 100 = 500 F. Ensuite : combien lui rend-on ? 1 000 − 500 = 500 F.")}
          <p>« Modou achète 2 cahiers à 200 F et un stylo à 100 F. Il donne 1 000 F. Combien lui rend-on ? »</p>
          ${bullets([
            "Question intermédiaire : combien coûtent les achats ? 2 × 200 + 100 = 500 F.",
            "Question finale : 1 000 − 500 = 500 F.",
          ])}
          ${keyPoint("Je réponds à chaque question par une phrase avec l’unité : « On lui rend 500 F. »")}
          ${practice(["Trouve la question intermédiaire : « Awa a 3 sacs de 10 kg de riz. Elle en vend 12 kg. Combien lui en reste-t-il ? »"])}`,
      },
    ],
  },
];
