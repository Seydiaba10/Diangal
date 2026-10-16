// Sciences physiques de 3e (programme relevé : docs/programme/releve-ci-3e.md).
// Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type Chapter3eSpec, exemple, formula, frac, liste, methode, retenir, tableau } from "./blocks";

export const PC_3E: Chapter3eSpec[] = [
  {
    title: "Les lentilles minces",
    summary: "Lentilles convergentes et divergentes, formation des images.",
    lessons: [
      {
        title: "Lentilles convergentes et divergentes",
        body: `<p>Une <strong>lentille mince</strong> est un milieu transparent (verre, plastique) limité par deux faces dont l’une au moins est bombée ou creusée.</p>
          ${liste([
            "<strong>Lentille convergente</strong> : à bords minces. Un faisceau de lumière parallèle à l’axe converge en un point, le <strong>foyer image F’</strong>.",
            "<strong>Lentille divergente</strong> : à bords épais. Le faisceau parallèle s’écarte comme s’il venait d’un point situé avant la lentille.",
          ])}
          <p>Le point O au centre de la lentille est le <strong>centre optique</strong>. La distance OF’ est la <strong>distance focale</strong> f.</p>
          ${retenir("Pour reconnaître une lentille convergente, on la place au-dessus d’un texte : elle grossit les lettres (effet loupe).")}`,
      },
      {
        title: "Vergence et rayons particuliers",
        body: `<p>La <strong>vergence</strong> C d’une lentille s’exprime en dioptries (δ), avec f en mètres :</p>
          ${formula(`C = ${frac("1", "f")}`)}
          ${exemple(["Une lentille de distance focale f = 20 cm = 0,20 m a pour vergence C = 1 ÷ 0,20 = 5 δ."])}
          <h2>Trois rayons particuliers (lentille convergente)</h2>
          ${liste([
            "Un rayon qui passe par le centre optique O n’est pas dévié.",
            "Un rayon parallèle à l’axe ressort en passant par le foyer image F’.",
            "Un rayon qui passe par le foyer objet F ressort parallèle à l’axe.",
          ])}
          ${retenir("Plus la vergence est grande, plus la lentille est convergente (et plus sa distance focale est courte).")}`,
      },
      {
        title: "Construire l’image d’un objet",
        body: `${methode([
            "Tracer l’axe optique, la lentille, les foyers F et F’ à la même distance de O.",
            "Depuis le sommet B de l’objet AB, tracer deux des trois rayons particuliers.",
            "Leur point de rencontre est B’, image de B ; A’ est sur l’axe, à la verticale de B’.",
          ])}
          ${tableau([
            ["Position de l’objet", "Image obtenue"],
            ["Avant F (loin de la lentille)", "réelle, renversée, sur un écran"],
            ["Entre F et O", "virtuelle, droite, agrandie (loupe)"],
          ])}
          ${retenir("Une image réelle se forme sur un écran ; une image virtuelle se voit seulement à travers la lentille.")}`,
      },
    ],
  },
  {
    title: "La dispersion de la lumière blanche",
    summary: "Le prisme et les couleurs de la lumière blanche.",
    lessons: [
      {
        title: "Le prisme décompose la lumière",
        body: `<p>Un faisceau de lumière blanche (soleil, lampe) qui traverse un <strong>prisme</strong> en verre est dévié et étalé en une bande colorée : le <strong>spectre</strong>.</p>
          <p>On y voit, dans l’ordre : rouge, orangé, jaune, vert, bleu, indigo, violet. Le violet est le plus dévié, le rouge le moins.</p>
          ${retenir("La lumière blanche est un mélange de lumières colorées. Le prisme ne crée pas les couleurs : il les sépare. C’est la <strong>dispersion</strong>.")}`,
      },
      {
        title: "Recomposition et arc-en-ciel",
        body: `<p>Si on fait passer le spectre dans un second prisme retourné, ou si on fait tourner vite un disque peint aux couleurs du spectre (disque de Newton), on retrouve du blanc : c’est la <strong>recomposition</strong> de la lumière blanche.</p>
          <p>L’<strong>arc-en-ciel</strong> apparaît quand le soleil éclaire des gouttes de pluie dans le dos de l’observateur : chaque goutte joue le rôle d’un petit prisme.</p>
          ${retenir("Une lumière qui ne peut pas être décomposée (par exemple celle d’un laser) est une lumière <strong>monochromatique</strong>.")}`,
      },
      {
        title: "La couleur des objets",
        body: `<p>Un objet éclairé en lumière blanche <strong>absorbe</strong> une partie des couleurs et <strong>diffuse</strong> les autres : on voit la couleur diffusée.</p>
          ${liste([
            "Un tissu rouge diffuse le rouge et absorbe les autres couleurs.",
            "Un objet blanc diffuse toutes les couleurs ; un objet noir les absorbe presque toutes.",
            "Un filtre ne laisse passer que sa couleur : un filtre vert devant une lampe donne une lumière verte.",
          ])}
          ${exemple(["Un pagne rouge éclairé en lumière verte paraît presque noir : il absorbe le vert et ne reçoit pas de rouge à diffuser."])}`,
      },
    ],
  },
  {
    title: "Les forces",
    summary: "Caractéristiques et représentation d’une force, le poids.",
    lessons: [
      {
        title: "Effets et caractéristiques d’une force",
        body: `<p>Une <strong>force</strong> modélise une action mécanique. Elle peut mettre un objet en mouvement, modifier son mouvement ou le déformer.</p>
          <p>Une force a quatre caractéristiques :</p>
          ${liste(["son <strong>point d’application</strong> ;", "sa <strong>droite d’action</strong> (direction) ;", "son <strong>sens</strong> ;", "son <strong>intensité</strong>, en newtons (N), mesurée avec un dynamomètre."])}
          <p>On la représente par une flèche (vecteur) qui part du point d’application. On choisit une échelle, par exemple 1 cm pour 10 N.</p>
          ${retenir("Forces de contact (main qui pousse, fil qui tire) et forces à distance (poids, force magnétique).")}`,
      },
      {
        title: "Le poids d’un corps",
        body: `<p>Le <strong>poids</strong> est la force d’attraction exercée par la Terre sur un objet. Il est vertical, dirigé vers le bas, appliqué au centre de gravité.</p>
          ${formula("P = m × g")}
          <p>P en newtons, m en kilogrammes, g ≈ 9,8 N/kg à la surface de la Terre (on prend souvent g = 10 N/kg).</p>
          ${exemple(["Un sac de riz de 25 kg a pour poids P = 25 × 10 = 250 N."])}
          ${retenir("La masse (en kg) ne change pas d’un lieu à l’autre ; le poids change : sur la Lune, g ≈ 1,6 N/kg.")}`,
      },
    ],
  },
  {
    title: "L’équilibre d’un solide soumis à deux forces",
    summary: "Conditions d’équilibre et applications.",
    lessons: [
      {
        title: "Les conditions d’équilibre",
        body: `<p>Un solide soumis à deux forces F<sub>1</sub> et F<sub>2</sub> est en équilibre si :</p>
          ${liste(["les deux forces ont la même droite d’action ;", "elles sont de sens contraires ;", "elles ont la même intensité."])}
          ${formula("F<sub>1</sub> + F<sub>2</sub> = 0 (somme vectorielle)")}
          ${retenir("Les deux forces « s’annulent » : le solide reste immobile s’il l’était au départ.")}`,
      },
      {
        title: "Applications : fil, support, ressort",
        body: `${liste([
            "<strong>Objet suspendu à un fil</strong> : la tension T du fil compense le poids P. T = P, et le fil est vertical.",
            "<strong>Objet posé sur une table</strong> : la réaction R de la table compense le poids. R = P.",
            "<strong>Ressort</strong> : son allongement est proportionnel à la force qui le tire (dans la limite d’élasticité).",
          ])}
          ${exemple(["Une lampe de 2 kg est suspendue au plafond. Son poids vaut P = 2 × 10 = 20 N, donc la tension du fil vaut T = 20 N, verticale et vers le haut."])}`,
      },
    ],
  },
  {
    title: "Le principe des actions réciproques",
    summary: "Les interactions entre deux corps.",
    lessons: [
      {
        title: "Énoncé du principe",
        body: `<p>Quand un corps A exerce une force sur un corps B, le corps B exerce en même temps une force sur A. Ces deux forces :</p>
          ${liste(["ont la même droite d’action ;", "sont de sens contraires ;", "ont la même intensité ;", "s’appliquent sur deux corps <strong>différents</strong>."])}
          ${retenir("Ne pas confondre avec l’équilibre : dans l’équilibre, les deux forces s’appliquent sur le <strong>même</strong> solide.")}`,
      },
      {
        title: "Exemples de la vie courante",
        body: `${liste([
            "En marchant, le pied pousse le sol vers l’arrière ; le sol pousse le pied vers l’avant.",
            "Une pirogue : la pagaie pousse l’eau vers l’arrière, l’eau pousse la pirogue vers l’avant.",
            "Deux aimants : chacun attire (ou repousse) l’autre avec la même intensité.",
          ])}
          ${exemple(["Un livre posé sur une table exerce sur elle une force de 5 N vers le bas : la table exerce sur le livre une force de 5 N vers le haut."])}`,
      },
    ],
  },
  {
    title: "Travail et puissance mécaniques",
    summary: "Travail d’une force et puissance mécanique.",
    lessons: [
      {
        title: "Le travail d’une force",
        body: `<p>Une force <strong>travaille</strong> quand son point d’application se déplace. Si la force est constante et parallèle au déplacement :</p>
          ${formula("W = F × ℓ")}
          <p>W en joules (J), F en newtons, ℓ (longueur du déplacement) en mètres.</p>
          ${liste([
            "Travail <strong>moteur</strong> (positif) : la force aide le mouvement.",
            "Travail <strong>résistant</strong> (négatif) : la force s’oppose au mouvement (frottements).",
            "Travail du poids pour une hauteur h : W = P × h = m × g × h.",
          ])}
          ${exemple(["Soulever un sac de 20 kg de 1,5 m demande un travail W = 20 × 10 × 1,5 = 300 J."])}`,
      },
      {
        title: "La puissance mécanique",
        body: `<p>La <strong>puissance</strong> indique la rapidité avec laquelle un travail est fourni :</p>
          ${formula(`P = ${frac("W", "t")}`)}
          <p>P en watts (W), W en joules, t en secondes. 1 kW = 1 000 W.</p>
          ${exemple(["Le sac précédent est soulevé en 2 s : P = 300 ÷ 2 = 150 W. En 1 s, il faudrait 300 W."])}
          ${retenir("Pour un même travail, plus on va vite, plus la puissance est grande.")}`,
      },
    ],
  },
  {
    title: "L’électrisation par frottement",
    summary: "Les charges électriques et leurs interactions.",
    lessons: [
      {
        title: "Deux sortes de charges",
        body: `<p>Une règle en plastique frottée avec un chiffon de laine attire de petits morceaux de papier : elle est <strong>électrisée</strong>.</p>
          ${liste([
            "Il existe deux sortes de charges : <strong>positives (+)</strong> et <strong>négatives (−)</strong>.",
            "Deux corps chargés de même signe se <strong>repoussent</strong> ; de signes contraires, ils s’<strong>attirent</strong>.",
          ])}
          ${retenir("Le plastique frotté avec la laine se charge négativement ; le verre frotté avec la soie se charge positivement.")}`,
      },
      {
        title: "L’explication : les électrons",
        body: `<p>La matière est faite d’atomes : un noyau chargé positivement entouré d’<strong>électrons</strong> chargés négativement. Un atome est électriquement neutre.</p>
          <p>Lors du frottement, des électrons passent d’un corps à l’autre :</p>
          ${liste(["le corps qui gagne des électrons devient négatif ;", "le corps qui perd des électrons devient positif."])}
          ${retenir("Les <strong>conducteurs</strong> (métaux) laissent circuler les charges ; les <strong>isolants</strong> (plastique, verre sec) les gardent là où elles sont apparues. La foudre est une énorme décharge électrique entre un nuage et le sol.")}`,
      },
    ],
  },
  {
    title: "Le courant électrique",
    summary: "Sens, intensité et mesure du courant.",
    lessons: [
      {
        title: "Sens et nature du courant",
        body: `<p>Dans un circuit fermé, le courant circule, par convention, de la borne <strong>+</strong> vers la borne <strong>−</strong> du générateur, à l’extérieur de celui-ci.</p>
          <p>Dans les métaux, le courant est un déplacement d’<strong>électrons</strong>, qui vont en sens inverse du sens conventionnel.</p>
          ${retenir("Une diode ne laisse passer le courant que dans un sens : elle permet de vérifier le sens du courant.")}`,
      },
      {
        title: "L’intensité et sa mesure",
        body: `<p>L’<strong>intensité</strong> I du courant se mesure en ampères (A) avec un <strong>ampèremètre</strong> branché <strong>en série</strong>.</p>
          ${liste([
            "Le courant entre par la borne A (ou mA) et sort par la borne COM.",
            "On commence par le plus grand calibre, puis on descend.",
            "1 A = 1 000 mA.",
          ])}
          ${retenir("Dans un circuit en série, l’intensité est la même en tout point.")}`,
      },
      {
        title: "Loi des nœuds et tensions",
        body: `<p>Dans un circuit avec dérivations, l’intensité du courant principal est égale à la somme des intensités des branches :</p>
          ${formula("I = I<sub>1</sub> + I<sub>2</sub>")}
          <p>La <strong>tension</strong> U se mesure en volts (V) avec un <strong>voltmètre</strong> branché <strong>en dérivation</strong>.</p>
          ${liste(["En série, les tensions s’additionnent.", "Des dipôles branchés en dérivation ont la même tension à leurs bornes."])}
          ${exemple(["I = 0,8 A dans la branche principale et I<sub>1</sub> = 0,3 A : alors I<sub>2</sub> = 0,8 − 0,3 = 0,5 A."])}`,
      },
    ],
  },
  {
    title: "La résistance électrique et la loi d’Ohm",
    summary: "Conducteurs ohmiques, loi d’Ohm et associations de résistances.",
    lessons: [
      {
        title: "La loi d’Ohm",
        body: `<p>Un <strong>conducteur ohmique</strong> (résistor) freine le passage du courant. Sa <strong>résistance</strong> R se mesure en ohms (Ω).</p>
          ${formula("U = R × I")}
          <p>U en volts, R en ohms, I en ampères. La courbe U en fonction de I est une droite qui passe par l’origine.</p>
          ${exemple(["Un résistor de 100 Ω traversé par un courant de 0,05 A a une tension U = 100 × 0,05 = 5 V à ses bornes."])}`,
      },
      {
        title: "Associer des résistances",
        body: `${tableau([
            ["Association", "Résistance équivalente"],
            ["En série", "R = R<sub>1</sub> + R<sub>2</sub>"],
            ["En dérivation", `${frac("1", "R")} = ${frac("1", "R<sub>1</sub>")} + ${frac("1", "R<sub>2</sub>")}`],
          ])}
          ${exemple([
            "En série : 100 Ω et 200 Ω donnent 300 Ω.",
            "En dérivation : 100 Ω et 100 Ω donnent 1 ÷ (1/100 + 1/100) = 50 Ω.",
          ])}
          ${retenir("En dérivation, la résistance équivalente est plus petite que chacune des résistances.")}`,
      },
    ],
  },
  {
    title: "Énergie et rendement",
    summary: "Transformations d’énergie et rendement d’un appareil.",
    lessons: [
      {
        title: "Puissance et énergie électriques",
        body: `<p>Un appareil de puissance P qui fonctionne pendant une durée t consomme l’énergie :</p>
          ${formula("E = P × t")}
          <p>E en joules si P est en watts et t en secondes ; E en kilowattheures (kWh) si P est en kW et t en heures. 1 kWh = 3 600 000 J.</p>
          <p>Pour un dipôle : P = U × I. Dans un résistor, toute l’énergie devient de la chaleur (<strong>effet Joule</strong>).</p>
          ${exemple(["Un ventilateur de 50 W allumé 6 h consomme 0,05 × 6 = 0,3 kWh."])}`,
      },
      {
        title: "Transformations et rendement",
        body: `<p>Un appareil transforme une énergie en une autre : une lampe transforme l’énergie électrique en lumière (et en chaleur), un moteur en énergie mécanique, un panneau solaire l’énergie lumineuse en énergie électrique.</p>
          ${formula(`η = ${frac("énergie utile", "énergie reçue")}`)}
          ${exemple(["Un moteur reçoit 1 000 J et fournit 750 J d’énergie mécanique : η = 750 ÷ 1 000 = 0,75, soit 75 %. Les 250 J restants sont perdus en chaleur."])}
          ${retenir("Le rendement est toujours inférieur à 1 (100 %) : une partie de l’énergie est perdue.")}`,
      },
    ],
  },
  {
    title: "La calorimétrie",
    summary: "Quantité de chaleur et équilibre thermique.",
    lessons: [
      {
        title: "Quantité de chaleur",
        body: `<p>Pour faire passer une masse m d’un corps de la température θ<sub>i</sub> à θ<sub>f</sub>, il faut la quantité de chaleur :</p>
          ${formula("Q = m × c × (θ<sub>f</sub> − θ<sub>i</sub>)")}
          <p>Q en joules, m en kg, c = <strong>capacité thermique massique</strong> en J/(kg·°C). Pour l’eau, c ≈ 4 180 J/(kg·°C).</p>
          ${exemple(["Chauffer 2 kg d’eau de 25 °C à 75 °C : Q = 2 × 4 180 × 50 = 418 000 J."])}
          ${retenir("Q &gt; 0 : le corps reçoit de la chaleur. Q &lt; 0 : il en cède.")}`,
      },
      {
        title: "L’équilibre thermique",
        body: `<p>Quand on mélange un corps chaud et un corps froid dans un calorimètre (récipient isolé), le chaud cède de la chaleur au froid jusqu’à une température commune θ<sub>e</sub>.</p>
          ${formula("Q<sub>cédée</sub> + Q<sub>reçue</sub> = 0")}
          ${exemple([
            "On mélange 200 g d’eau à 80 °C et 300 g d’eau à 20 °C.",
            "0,2 × c × (θ<sub>e</sub> − 80) + 0,3 × c × (θ<sub>e</sub> − 20) = 0, donc 0,5 θ<sub>e</sub> = 16 + 6 et θ<sub>e</sub> = 44 °C.",
          ], "Exemple corrigé")}
          ${retenir("Pendant un changement d’état (la glace qui fond), la température reste constante : Q = m × L, où L est la chaleur latente.")}`,
      },
    ],
  },
  {
    title: "Les solutions aqueuses",
    summary: "Solvant, soluté, concentration et dilution.",
    lessons: [
      {
        title: "Solution, solvant et soluté",
        body: `<p>Une <strong>solution aqueuse</strong> s’obtient en dissolvant un <strong>soluté</strong> (sel, sucre) dans l’eau, le <strong>solvant</strong>.</p>
          <p>Une solution est <strong>saturée</strong> quand le soluté ne peut plus se dissoudre : le surplus reste au fond.</p>
          ${retenir("La masse se conserve : masse de la solution = masse du solvant + masse du soluté.")}`,
      },
      {
        title: "Concentrations massique et molaire",
        body: `${formula(`C<sub>m</sub> = ${frac("m", "V")} (g/L)  et  C = ${frac("n", "V")} (mol/L), avec n = ${frac("m", "M")}`)}
          <p>M est la masse molaire du soluté (g/mol), V le volume de la solution (L).</p>
          ${exemple(["On dissout 5,85 g de chlorure de sodium (M = 58,5 g/mol) dans de l’eau pour obtenir 500 mL de solution : n = 5,85 ÷ 58,5 = 0,1 mol et C = 0,1 ÷ 0,5 = 0,2 mol/L."])}
          ${retenir("C<sub>m</sub> = C × M.")}`,
      },
      {
        title: "La dilution",
        body: `<p><strong>Diluer</strong>, c’est ajouter du solvant : la quantité de soluté ne change pas, la concentration diminue.</p>
          ${formula("C<sub>1</sub> × V<sub>1</sub> = C<sub>2</sub> × V<sub>2</sub>")}
          ${exemple(["On prélève 50 mL d’une solution à 0,2 mol/L et on complète à 200 mL : C<sub>2</sub> = 0,2 × 50 ÷ 200 = 0,05 mol/L."])}`,
      },
    ],
  },
  {
    title: "Solutions acides et solutions basiques",
    summary: "pH, indicateurs colorés et dilution.",
    lessons: [
      {
        title: "Le pH d’une solution aqueuse",
        body: `<p>Le <strong>pH</strong> est un nombre de 0 à 14 qui indique si une solution est acide, neutre ou basique (à 25 °C).</p>
          ${tableau([
            ["pH", "Solution", "Exemples"],
            ["pH &lt; 7", "acide", "jus de citron, vinaigre, acide chlorhydrique"],
            ["pH = 7", "neutre", "eau pure, eau salée"],
            ["pH &gt; 7", "basique", "eau de javel, soude, eau savonneuse"],
          ])}
          <p>On le mesure avec du papier pH ou un pH-mètre.</p>
          ${retenir("Une solution acide contient plus d’ions H₃O⁺ que d’ions OH⁻ ; une solution basique, l’inverse.")}`,
      },
      {
        title: "Les indicateurs colorés",
        body: `<p>Un <strong>indicateur coloré</strong> change de couleur selon le pH.</p>
          ${tableau([
            ["Indicateur", "Milieu acide", "Milieu neutre", "Milieu basique"],
            ["Bleu de bromothymol (BBT)", "jaune", "vert", "bleu"],
            ["Phénolphtaléine", "incolore", "incolore", "rose"],
          ])}
          <p>Quand on verse peu à peu une base dans un acide, le mélange se neutralise : acide + base → sel + eau. Exemple : acide chlorhydrique + soude → chlorure de sodium + eau.</p>`,
      },
      {
        title: "Diluer une solution acide ou basique",
        body: `<p>Quand on dilue une solution, son pH se rapproche de 7 :</p>
          ${liste(["le pH d’une solution acide <strong>augmente</strong> ;", "le pH d’une solution basique <strong>diminue</strong>."])}
          ${retenir("Sécurité : on verse toujours l’acide dans l’eau, jamais l’eau dans l’acide. Lunettes et blouse obligatoires.")}
          ${exemple(["Un vinaigre de pH 3 dilué dix fois a un pH plus grand que 3, mais il reste acide (pH &lt; 7)."])}`,
      },
    ],
  },
  {
    title: "Les métaux",
    summary: "Action de l’air, combustion et action des acides dilués sur les métaux usuels.",
    lessons: [
      {
        title: "Action de l’air sur les métaux",
        body: `${liste([
            "<strong>Fer</strong> : dans l’air humide, il <strong>rouille</strong>. La rouille est poreuse : la corrosion continue en profondeur.",
            "<strong>Aluminium</strong> : il se couvre d’une fine couche d’alumine (Al₂O₃) qui le protège.",
            "<strong>Zinc</strong> et <strong>cuivre</strong> : une couche (blanchâtre pour le zinc, verte pour le cuivre) les protège.",
          ])}
          ${retenir("On protège le fer par la peinture, le graissage ou une couche de zinc (tôle galvanisée).")}`,
      },
      {
        title: "Combustion des métaux",
        body: `<p>Chauffés dans le dioxygène, certains métaux brûlent et donnent des oxydes :</p>
          ${liste([
            "3 Fe + 2 O₂ → Fe₃O₄ (oxyde magnétique) ;",
            "4 Al + 3 O₂ → 2 Al₂O₃ (alumine) ;",
            "2 Cu + O₂ → 2 CuO (oxyde de cuivre, noir) ;",
            "2 Zn + O₂ → 2 ZnO (oxyde de zinc, blanc).",
          ])}
          ${retenir("Dans une équation chimique, chaque atome doit apparaître le même nombre de fois de chaque côté.")}`,
      },
      {
        title: "Action des acides dilués",
        body: `<p>L’acide chlorhydrique dilué attaque le fer, le zinc et l’aluminium avec un dégagement de <strong>dihydrogène</strong> (H₂), qui produit une petite détonation à l’approche d’une flamme. Il n’attaque pas le cuivre.</p>
          ${exemple(["Fe + 2 H⁺ → Fe²⁺ + H₂. Avec la soude, les ions Fe²⁺ donnent un précipité vert."])}
          ${tableau([
            ["Ion", "Couleur du précipité avec la soude"],
            ["Fe²⁺", "vert"],
            ["Fe³⁺", "rouille"],
            ["Cu²⁺", "bleu"],
            ["Zn²⁺ et Al³⁺", "blanc"],
          ])}`,
      },
    ],
  },
  {
    title: "Les hydrocarbures",
    summary: "Alcanes, combustions et usages.",
    lessons: [
      {
        title: "Les alcanes",
        body: `<p>Un <strong>hydrocarbure</strong> est un composé formé uniquement de carbone (C) et d’hydrogène (H). Les <strong>alcanes</strong> ont pour formule générale :</p>
          ${formula("C<sub>n</sub>H<sub>2n+2</sub>")}
          ${tableau([
            ["n", "Nom", "Formule"],
            ["1", "méthane", "CH₄"],
            ["2", "éthane", "C₂H₆"],
            ["3", "propane", "C₃H₈"],
            ["4", "butane", "C₄H₁₀"],
          ])}
          ${retenir("On les trouve dans le pétrole et le gaz naturel. Le gaz de cuisine est du butane.")}`,
      },
      {
        title: "Combustions complète et incomplète",
        body: `<p><strong>Combustion complète</strong> (assez de dioxygène, flamme bleue) : il se forme du dioxyde de carbone et de l’eau.</p>
          ${formula("CH₄ + 2 O₂ → CO₂ + 2 H₂O")}
          <p>Le CO₂ trouble l’eau de chaux.</p>
          <p><strong>Combustion incomplète</strong> (manque de dioxygène, flamme jaune) : il se forme aussi du carbone (suie) et du <strong>monoxyde de carbone</strong> CO, un gaz mortel et sans odeur.</p>
          ${retenir("Ne jamais utiliser un réchaud ou un fourneau à charbon dans une pièce fermée.")}`,
      },
      {
        title: "Usages et environnement",
        body: `${liste([
            "Carburants : essence, gasoil, kérosène ; combustibles : butane, gaz naturel.",
            "Matières premières : plastiques, engrais, médicaments.",
            "Le Sénégal produit du pétrole depuis 2024 (champ de Sangomar).",
          ])}
          ${retenir("La combustion des hydrocarbures rejette du CO₂, un gaz à effet de serre qui contribue au réchauffement climatique.")}`,
      },
    ],
  },
];
