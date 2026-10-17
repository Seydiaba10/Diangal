// Chimie de Terminale S1 et S2 (programme de sciences physiques d'août 2008, Office du Bac) :
// chapitres C1 à C9. Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, tableau } from "./blocks";

export const CHIMIE_TLE_S: ChapterSpec[] = [
  {
    title: "Les alcools",
    summary: "Nomenclature, classes, obtention, oxydation ménagée et tests d’identification.",
    lessons: [
      {
        title: "Structure, nomenclature et classes des alcools",
        minutes: 12,
        body: `<p>Un <strong>alcool</strong> possède un groupe hydroxyle −OH lié à un carbone tétragonal. Formule générale des alcools saturés : C<sub>n</sub>H<sub>2n+1</sub>OH. Le nom se forme en remplaçant le « e » final de l’alcane par « ol », avec l’indice du carbone fonctionnel le plus petit possible.</p>
          ${tableau([
            ["Classe", "Le carbone fonctionnel porte…", "Exemple"],
            ["primaire", "au plus 1 groupe carboné", "CH₃−CH₂−CH₂−OH, propan-1-ol"],
            ["secondaire", "2 groupes carbonés", "CH₃−CHOH−CH₃, propan-2-ol"],
            ["tertiaire", "3 groupes carbonés", "(CH₃)₃C−OH, 2-méthylpropan-2-ol"],
          ])}
          <h2>Obtention</h2>
          ${liste([
            "hydratation d’un alcène (catalyseur acide) : CH₂=CH₂ + H₂O → CH₃−CH₂OH ;",
            "fermentation alcoolique des sucres (vin de palme, bière de mil) : C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂.",
          ])}
          ${retenir("L’hydratation d’un alcène dissymétrique donne surtout l’alcool le plus substitué (règle de Markovnikov).")}`,
      },
      {
        title: "Oxydation ménagée et identification",
        minutes: 15,
        body: `<p>L’<strong>oxydation ménagée</strong> (par le dichromate ou le permanganate de potassium en milieu acide) modifie le groupe fonctionnel sans casser la chaîne carbonée.</p>
          ${tableau([
            ["Alcool", "Produit de l’oxydation ménagée"],
            ["primaire", "aldéhyde R−CHO, puis acide carboxylique R−COOH si l’oxydant est en excès"],
            ["secondaire", "cétone R−CO−R’"],
            ["tertiaire", "pas d’oxydation ménagée"],
          ])}
          ${tableau([
            ["Test", "Aldéhyde", "Cétone"],
            ["DNPH (2,4-dinitrophénylhydrazine)", "précipité jaune", "précipité jaune"],
            ["liqueur de Fehling à chaud", "précipité rouge brique", "rien"],
            ["réactif de Tollens", "miroir d’argent", "rien"],
            ["réactif de Schiff", "coloration rose", "rien"],
          ])}
          ${exemple(["L’éthanol est oxydé en éthanal, puis en acide éthanoïque : c’est ce qui fait « tourner » le vin en vinaigre."])}
          ${retenir("Déshydratation : vers 180 °C avec un catalyseur, un alcool perd une molécule d’eau et donne un alcène ; vers 140 °C, deux molécules donnent un éther-oxyde.")}`,
      },
    ],
  },
  {
    title: "Les amines",
    summary: "Nomenclature, classes, caractère basique et nucléophile des amines.",
    lessons: [
      {
        title: "Structure et nomenclature des amines",
        minutes: 12,
        body: `<p>Une <strong>amine</strong> dérive de l’ammoniac NH₃ par remplacement d’un ou plusieurs atomes d’hydrogène par des groupes carbonés.</p>
          ${tableau([
            ["Classe", "Formule", "Exemple"],
            ["primaire", "R−NH₂", "CH₃−CH₂−NH₂ : éthanamine (éthylamine)"],
            ["secondaire", "R−NH−R’", "CH₃−NH−CH₃ : N-méthylméthanamine (diméthylamine)"],
            ["tertiaire", "R−N(R’)−R’’", "(CH₃)₃N : N,N-diméthylméthanamine (triméthylamine)"],
          ])}
          ${retenir("L’atome d’azote possède un doublet d’électrons non liant : c’est lui qui explique les propriétés des amines.")}
          <p>Les amines légères sont gazeuses ou liquides, solubles dans l’eau, à l’odeur de poisson ; on les trouve dans de nombreux médicaments et colorants.</p>`,
      },
      {
        title: "Caractère basique et nucléophile",
        minutes: 12,
        body: `<p><strong>Caractère basique</strong> : grâce à son doublet libre, l’amine capte un proton :</p>
          ${formula("R−NH₂ + H₂O ⇌ R−NH₃⁺ + OH⁻")}
          <p>Une solution d’amine est basique (pH &gt; 7) ; c’est une base faible, un peu plus forte que l’ammoniac pour les amines aliphatiques.</p>
          <p><strong>Caractère nucléophile</strong> : le doublet de l’azote attaque un atome de carbone déficitaire en électrons. Avec un iodoalcane, une amine donne une amine de classe supérieure (réaction d’Hofmann), jusqu’à l’ion ammonium quaternaire :</p>
          ${formula("R−NH₂ + R’−I → R−NH−R’ + HI")}
          ${retenir("Avec un chlorure d’acyle ou un anhydride d’acide, une amine primaire ou secondaire donne un amide.")}`,
      },
    ],
  },
  {
    title: "Acides carboxyliques et dérivés",
    summary: "Acides, chlorures d’acyle, anhydrides, esters et amides ; estérification et saponification.",
    lessons: [
      {
        title: "Acides carboxyliques et leurs dérivés",
        minutes: 12,
        body: `<p>Un <strong>acide carboxylique</strong> possède le groupe carboxyle −COOH. Nom : « acide » + nom de l’alcane terminé par « oïque » (acide éthanoïque CH₃COOH, l’acide du vinaigre). C’est un acide faible.</p>
          ${tableau([
            ["Dérivé", "Groupe", "Exemple"],
            ["chlorure d’acyle", "R−COCl", "chlorure d’éthanoyle"],
            ["anhydride d’acide", "R−CO−O−CO−R", "anhydride éthanoïque"],
            ["ester", "R−COO−R’", "éthanoate d’éthyle"],
            ["amide", "R−CONH₂", "éthanamide"],
          ])}
          ${liste([
            "on obtient le chlorure d’acyle avec SOCl₂ ou PCl₅, et l’anhydride par déshydratation (P₄O₁₀) ;",
            "les chlorures d’acyle et les anhydrides sont très réactifs : ils servent à préparer esters et amides.",
          ])}`,
      },
      {
        title: "Estérification, hydrolyse et saponification",
        minutes: 15,
        body: `${formula("acide + alcool ⇌ ester + eau")}
          ${liste([
            "l’estérification et l’hydrolyse de l’ester sont lentes, limitées (elles conduisent à un équilibre) et athermiques ;",
            "à partir d’un mélange équimolaire d’acide et d’alcool primaire, on obtient environ 67 % d’ester ;",
            "un catalyseur (acide sulfurique) et la chaleur accélèrent la réaction sans changer l’équilibre ;",
            "on améliore le rendement en mettant un réactif en excès ou en éliminant l’eau.",
          ])}
          ${retenir("Avec un chlorure d’acyle ou un anhydride à la place de l’acide, l’estérification est rapide et totale.")}
          <h2>Saponification</h2>
          ${formula("ester + OH⁻ → ion carboxylate + alcool (réaction lente mais totale)")}
          ${exemple(["Les savons sont obtenus par saponification des triglycérides (huile d’arachide, de palme) par la soude."])}`,
      },
    ],
  },
  {
    title: "Cinétique chimique",
    summary: "Vitesse de réaction, facteurs cinétiques, temps de demi-réaction.",
    lessons: [
      {
        title: "Vitesse d’une réaction chimique",
        minutes: 15,
        body: `<p>On suit la quantité (ou la concentration) d’un produit au cours du temps. La <strong>vitesse de formation</strong> d’un produit P est la dérivée de sa concentration :</p>
          ${formula(`v(t) = ${frac("d[P]", "dt")} (mol·L<sup>−1</sup>·s<sup>−1</sup>)`)}
          ${liste([
            "graphiquement, v(t) est le coefficient directeur de la tangente à la courbe [P] = f(t) à l’instant t ;",
            "la vitesse moyenne entre t₁ et t₂ est Δ[P]/Δt ;",
            `la vitesse de disparition d’un réactif R est −${frac("d[R]", "dt")}.`,
          ])}
          ${retenir("En général, la vitesse diminue au cours du temps, car les réactifs s’épuisent.")}
          ${formula("Temps de demi-réaction t<sub>½</sub> : durée au bout de laquelle la moitié du réactif limitant a réagi")}`,
      },
      {
        title: "Facteurs cinétiques",
        minutes: 10,
        body: `${liste([
            "<strong>concentration des réactifs</strong> : plus elle est grande, plus la réaction est rapide ;",
            "<strong>température</strong> : une élévation de température accélère la réaction (on chauffe pour accélérer, on refroidit brutalement par une « trempe » pour arrêter) ;",
            "<strong>catalyseur</strong> : il accélère la réaction sans être consommé et sans modifier l’état final (catalyse homogène, hétérogène ou enzymatique).",
          ])}
          ${exemple(["Le réfrigérateur ralentit les réactions qui gâtent les aliments ; les enzymes de la salive accélèrent la digestion de l’amidon."])}
          ${methode([
            "Tracer la courbe [P] = f(t) à partir du tableau de mesures.",
            "Tracer la tangente à l’instant voulu et calculer son coefficient directeur.",
            "Lire t<sub>½</sub> à l’ordonnée [P]<sub>final</sub> ÷ 2.",
          ], "Exploiter une courbe")}`,
      },
    ],
  },
  {
    title: "Autoprotolyse de l’eau, pH et indicateurs colorés",
    summary: "Produit ionique de l’eau, définition du pH, solutions acides, basiques, neutres, indicateurs.",
    lessons: [
      {
        title: "Autoprotolyse de l’eau et pH",
        minutes: 15,
        body: `<p>L’eau pure contient quelques ions provenant de la réaction d’<strong>autoprotolyse</strong> : 2 H₂O ⇌ H₃O⁺ + OH⁻.</p>
          ${formula("Produit ionique : K<sub>e</sub> = [H₃O⁺][OH⁻] = 10<sup>−14</sup> à 25 °C")}
          ${formula("pH = −log[H₃O⁺], soit [H₃O⁺] = 10<sup>−pH</sup> mol/L")}
          ${tableau([
            ["Solution (25 °C)", "Comparaison", "pH"],
            ["acide", "[H₃O⁺] &gt; [OH⁻]", "&lt; 7"],
            ["neutre", "[H₃O⁺] = [OH⁻] = 10<sup>−7</sup> mol/L", "= 7"],
            ["basique", "[H₃O⁺] &lt; [OH⁻]", "&gt; 7"],
          ])}
          ${exemple(["Une solution de pH = 3 a [H₃O⁺] = 10<sup>−3</sup> mol/L et [OH⁻] = 10<sup>−11</sup> mol/L."])}
          ${retenir("Le pH se mesure au pH-mètre (précision 0,1) ou, plus grossièrement, au papier pH.")}`,
      },
      {
        title: "Indicateurs colorés",
        minutes: 10,
        body: `<p>Un <strong>indicateur coloré</strong> est un couple acide/base dont les deux formes n’ont pas la même couleur. Il change de teinte dans une <strong>zone de virage</strong>.</p>
          ${tableau([
            ["Indicateur", "Zone de virage", "Couleurs (acide → basique)"],
            ["hélianthine", "3,1 – 4,4", "rouge → jaune"],
            ["bleu de bromothymol (BBT)", "6,0 – 7,6", "jaune → bleu (vert dans la zone)"],
            ["phénolphtaléine", "8,2 – 10", "incolore → rose"],
          ])}
          ${retenir("Pour un dosage, on choisit un indicateur dont la zone de virage contient le pH à l’équivalence.")}`,
      },
    ],
  },
  {
    title: "Acide fort, base forte et dosage",
    summary: "Solutions d’acide fort et de base forte, réaction acide fort-base forte, dosage.",
    lessons: [
      {
        title: "Acides forts et bases fortes",
        minutes: 12,
        body: `<p>Un <strong>acide fort</strong> réagit totalement avec l’eau : HCl + H₂O → H₃O⁺ + Cl⁻. Une <strong>base forte</strong> se dissocie totalement : NaOH → Na⁺ + OH⁻.</p>
          ${formula("Acide fort de concentration C : pH = −log C ; base forte : pH = 14 + log C")}
          ${exemple([
            "Acide chlorhydrique à 10<sup>−2</sup> mol/L : pH = 2.",
            "Soude à 10<sup>−3</sup> mol/L : pH = 14 − 3 = 11.",
          ])}
          ${retenir("Diluer 10 fois un acide fort augmente son pH d’une unité (tant que pH &lt; 6) ; diluer 10 fois une base forte le diminue d’une unité.")}`,
      },
      {
        title: "Réaction acide fort-base forte et dosage",
        minutes: 15,
        body: `${formula("H₃O⁺ + OH⁻ → 2 H₂O (réaction rapide, totale, exothermique)")}
          <p>Pour <strong>doser</strong> un acide de concentration inconnue C<sub>a</sub>, on y verse progressivement une base de concentration connue C<sub>b</sub> en suivant le pH. À l’<strong>équivalence</strong>, les réactifs ont été mélangés dans les proportions de l’équation :</p>
          ${formula("C<sub>a</sub> V<sub>a</sub> = C<sub>b</sub> V<sub>bE</sub>")}
          ${liste([
            "la courbe pH = f(V<sub>b</sub>) présente un saut de pH autour de l’équivalence ;",
            "pour un dosage acide fort-base forte, le pH à l’équivalence vaut 7 (solution de NaCl) ;",
            "méthode des tangentes : l’équivalence est au milieu des points de contact de deux tangentes parallèles.",
          ])}
          ${exemple(["20 mL d’acide sont neutralisés par 15 mL de soude à 0,1 mol/L : C<sub>a</sub> = 0,1 × 15 ÷ 20 = 0,075 mol/L."])}`,
      },
    ],
  },
  {
    title: "Acides et bases faibles, couples acide-base",
    summary: "Couples acide/base, constante d’acidité, pKa, classification et domaines de prédominance.",
    lessons: [
      {
        title: "Acides faibles, bases faibles et couples",
        minutes: 15,
        body: `<p>Un <strong>acide faible</strong> ne réagit que partiellement avec l’eau : son pH est supérieur à −log C. Exemple : CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺.</p>
          <p>Un acide AH et sa base conjuguée A⁻ forment un <strong>couple acide/base</strong> AH/A⁻ (échange d’un proton H⁺).</p>
          ${formula(`Constante d’acidité : K<sub>a</sub> = ${frac("[A⁻][H₃O⁺]", "[AH]")} ; pK<sub>a</sub> = −log K<sub>a</sub>`)}
          ${formula(`pH = pK<sub>a</sub> + log ${frac("[A⁻]", "[AH]")}`)}
          ${exemple(["Acide éthanoïque à 10<sup>−2</sup> mol/L : pH ≈ 3,4, alors qu’un acide fort de même concentration aurait pH = 2."])}`,
      },
      {
        title: "Classification des couples et domaines de prédominance",
        minutes: 12,
        body: `${liste([
            "plus le pK<sub>a</sub> est petit, plus l’acide est fort (et sa base conjuguée faible) ;",
            "couples de l’eau : H₃O⁺/H₂O (pK<sub>a</sub> = 0) et H₂O/OH⁻ (pK<sub>a</sub> = 14).",
          ])}
          ${tableau([
            ["pH", "Espèce prédominante"],
            ["pH &lt; pK<sub>a</sub>", "la forme acide AH"],
            ["pH = pK<sub>a</sub>", "[AH] = [A⁻]"],
            ["pH &gt; pK<sub>a</sub>", "la forme basique A⁻"],
          ])}
          ${tableau([
            ["Couple", "pK<sub>a</sub>"],
            ["HCOOH/HCOO⁻ (acide méthanoïque)", "3,8"],
            ["CH₃COOH/CH₃COO⁻ (acide éthanoïque)", "4,8"],
            ["NH₄⁺/NH₃ (ammoniac)", "9,2"],
          ])}
          ${retenir("Un acide réagit de façon importante avec la base d’un couple de pK<sub>a</sub> plus élevé (règle du « gamma »).")}`,
      },
    ],
  },
  {
    title: "Réaction acide faible-base forte, effet tampon",
    summary: "Dosage d’un acide faible par une base forte (et inversement), demi-équivalence, solutions tampons.",
    lessons: [
      {
        title: "Dosage d’un acide faible par une base forte",
        minutes: 15,
        body: `${formula("CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O (réaction totale)")}
          ${liste([
            "à l’équivalence, C<sub>a</sub>V<sub>a</sub> = C<sub>b</sub>V<sub>bE</sub>, et la solution contient la base faible CH₃COO⁻ : le pH est supérieur à 7 ;",
            "à la <strong>demi-équivalence</strong> (V<sub>b</sub> = V<sub>bE</sub> ÷ 2), [CH₃COOH] = [CH₃COO⁻], donc pH = pK<sub>a</sub> ;",
            "le saut de pH est moins grand que pour un acide fort ; on choisit la phénolphtaléine.",
          ])}
          ${retenir("Le dosage d’une base faible (ammoniac) par un acide fort se traite de la même façon : pH à l’équivalence inférieur à 7, pH = pK<sub>a</sub> à la demi-équivalence.")}
          ${exemple(["On lit pH = 4,8 à la demi-équivalence : l’acide dosé est probablement l’acide éthanoïque."])}`,
      },
      {
        title: "Solutions tampons",
        minutes: 10,
        body: `<p>Une <strong>solution tampon</strong> a un pH qui varie peu par addition modérée d’acide ou de base, ou par dilution. On l’obtient en mélangeant un acide faible et sa base conjuguée en quantités voisines : son pH est proche du pK<sub>a</sub>.</p>
          ${liste([
            "on peut la préparer par un mélange équimolaire AH + A⁻, ou en neutralisant à moitié un acide faible par une base forte ;",
            "le sang est tamponné vers pH = 7,4 (couple CO₂,H₂O / HCO₃⁻) ;",
            "les solutions tampons servent à étalonner les pH-mètres.",
          ])}
          ${retenir("Effet tampon maximal quand [AH] = [A⁻], c’est-à-dire à pH = pK<sub>a</sub>.")}`,
      },
    ],
  },
  {
    title: "Acides α-aminés",
    summary: "Structure, chiralité, représentation de Fischer, amphion, liaison peptidique.",
    lessons: [
      {
        title: "Structure et chiralité des acides α-aminés",
        minutes: 15,
        body: `<p>Un <strong>acide α-aminé</strong> a pour formule R−CH(NH₂)−COOH : le groupe amine et le groupe carboxyle sont portés par le même carbone. Ce sont les briques des protéines (glycine R = H, alanine R = CH₃…).</p>
          ${retenir("Un carbone lié à quatre groupes différents est <strong>asymétrique</strong>. La molécule est alors <strong>chirale</strong> : elle n’est pas superposable à son image dans un miroir. Les deux formes sont des <strong>énantiomères</strong>.")}
          ${liste([
            "en <strong>représentation de Fischer</strong>, la chaîne carbonée est verticale, COOH en haut ; le groupe NH₂ à gauche donne la configuration L, à droite la configuration D ;",
            "les acides aminés naturels sont de configuration L ;",
            "seule la glycine (R = H) n’est pas chirale.",
          ])}`,
      },
      {
        title: "Amphion et liaison peptidique",
        minutes: 12,
        body: `<p>En solution aqueuse, un acide α-aminé existe surtout sous forme d’<strong>amphion</strong> (ou zwitterion) : R−CH(NH₃⁺)−COO⁻. Il est à la fois acide (NH₃⁺) et basique (COO⁻) : c’est un <strong>ampholyte</strong>.</p>
          ${tableau([
            ["Milieu", "Forme prédominante"],
            ["très acide", "cation R−CH(NH₃⁺)−COOH"],
            ["intermédiaire", "amphion R−CH(NH₃⁺)−COO⁻"],
            ["très basique", "anion R−CH(NH₂)−COO⁻"],
          ])}
          <h2>Liaison peptidique</h2>
          <p>Le groupe −COOH d’un acide aminé réagit avec le groupe −NH₂ d’un autre en éliminant de l’eau : il se forme la liaison <strong>peptidique</strong> −CO−NH− et un dipeptide.</p>
          ${retenir("Deux acides aminés différents peuvent donner deux dipeptides (Ala-Gly et Gly-Ala) : pour n’obtenir que l’un, on bloque les groupes qui ne doivent pas réagir (protection) et on active le groupe carboxyle.")}`,
      },
    ],
  },
];
