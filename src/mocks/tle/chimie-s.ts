// Chimie de Terminale S1 et S2 (programme de sciences physiques d'août 2008, Office du Bac) :
// chapitres C1 à C9. Hors programme respecté : mécanismes réactionnels, ordre de réaction, étude
// systématique de la catalyse, propriétés des polyalcools. Les amines se limitent à leurs
// propriétés basiques. Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { auBac, type ChapterSpec, definition, erreurs, exercice, formula, frac, liste, methode, objectifs, retenir, tableau } from "./blocks";

export const CHIMIE_TLE_S: ChapterSpec[] = [
  {
    title: "Les alcools",
    summary: "Nomenclature, classes, obtention, propriétés, oxydation ménagée et tests d’identification.",
    lessons: [
      {
        title: "Structure, nomenclature et classes des alcools",
        minutes: 30,
        body: `${objectifs([
            "reconnaître et nommer un alcool ;",
            "déterminer la classe d’un alcool ;",
            "écrire les réactions d’obtention et quelques propriétés des alcools.",
          ])}
          <h2>1. Définition et nomenclature</h2>
          ${definition("alcool", "composé organique dont le groupe hydroxyle −OH est lié à un atome de carbone <strong>tétragonal</strong> (lié à quatre atomes). Formule générale des alcools saturés non cycliques : C<sub>n</sub>H<sub>2n+1</sub>OH, ou C<sub>n</sub>H<sub>2n+2</sub>O.")}
          ${methode([
            "Repérer la chaîne carbonée la plus longue qui contient le carbone fonctionnel (celui qui porte −OH).",
            "La numéroter pour donner au carbone fonctionnel l’indice le plus petit.",
            "Nommer : préfixes des ramifications + nom de l’alcane sans le « e » + indice + « ol ».",
          ], "Nommer un alcool")}
          <p>Exemples : CH₃−OH, méthanol ; CH₃−CH₂−OH, éthanol ; CH₃−CHOH−CH₃, propan-2-ol ; (CH₃)₂CH−CH₂OH, 2-méthylpropan-1-ol.</p>
          <h2>2. Les trois classes</h2>
          ${tableau([
            ["Classe", "Le carbone fonctionnel est lié à…", "Exemple"],
            ["primaire", "au plus <strong>1</strong> atome de carbone", "CH₃−CH₂−CH₂−OH, propan-1-ol"],
            ["secondaire", "<strong>2</strong> atomes de carbone", "CH₃−CHOH−CH₃, propan-2-ol"],
            ["tertiaire", "<strong>3</strong> atomes de carbone", "(CH₃)₃C−OH, 2-méthylpropan-2-ol"],
          ])}
          <p>Il existe aussi des polyalcools, comme le <strong>glycérol</strong> (propane-1,2,3-triol), qui interviendra dans la fabrication des savons.</p>
          <h2>3. Obtention</h2>
          ${liste([
            "<strong>hydratation d’un alcène</strong> (catalyseur acide) : CH₂=CH₂ + H₂O → CH₃−CH₂OH ; avec un alcène dissymétrique, on obtient surtout l’alcool le plus substitué (règle de Markovnikov) ;",
            "<strong>fermentation alcoolique</strong> des sucres par des levures (vin de palme, bière de mil) : C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂.",
          ])}
          <h2>4. Quelques propriétés</h2>
          ${liste([
            "<strong>combustion</strong> complète : C₂H₅OH + 3 O₂ → 2 CO₂ + 3 H₂O (l’éthanol est un carburant) ;",
            "<strong>action du sodium</strong> : 2 R−OH + 2 Na → 2 R−O⁻ + 2 Na⁺ + H₂ ;",
            "<strong>déshydratation intramoléculaire</strong> (vers 180 °C, alumine ou acide sulfurique) : l’alcool donne un alcène ;",
            "<strong>déshydratation intermoléculaire</strong> (vers 140 °C) : deux molécules donnent un éther-oxyde R−O−R.",
          ])}
          ${exercice(
            "Un alcool saturé A contient 21,6 % d’oxygène en masse. Trouve sa formule brute et écris les formules et noms de ses isomères alcools en précisant leur classe (C = 12 ; H = 1 ; O = 16).",
            [
              "Formule C<sub>n</sub>H<sub>2n+2</sub>O, M = 14n + 18. % O = 16 ÷ M = 0,216, donc M ≈ 74 et 14n + 18 = 74 : n = 4. A est <strong>C₄H₁₀O</strong>.",
              "Isomères : butan-1-ol CH₃−CH₂−CH₂−CH₂OH (primaire) ; butan-2-ol CH₃−CHOH−CH₂−CH₃ (secondaire) ; 2-méthylpropan-1-ol (CH₃)₂CH−CH₂OH (primaire) ; 2-méthylpropan-2-ol (CH₃)₃C−OH (tertiaire).",
            ],
          )}`,
      },
      {
        title: "Oxydation ménagée et identification",
        minutes: 35,
        body: `${objectifs([
            "écrire l’équation d’une oxydation ménagée ;",
            "relier la classe d’un alcool au produit de son oxydation ménagée ;",
            "identifier aldéhydes et cétones par des tests.",
          ])}
          <p>L’<strong>oxydation ménagée</strong> modifie le groupe fonctionnel sans casser la chaîne carbonée. On utilise le dichromate de potassium (orange, devient vert : ion Cr³⁺) ou le permanganate de potassium (violet, se décolore : ion Mn²⁺) en milieu acide.</p>
          ${tableau([
            ["Classe de l’alcool", "Produit de l’oxydation ménagée"],
            ["primaire R−CH₂OH", "<strong>aldéhyde</strong> R−CHO, puis <strong>acide carboxylique</strong> R−COOH si l’oxydant est en excès"],
            ["secondaire R−CHOH−R’", "<strong>cétone</strong> R−CO−R’"],
            ["tertiaire", "pas d’oxydation ménagée"],
          ])}
          <h2>Écrire l’équation (méthode des demi-équations)</h2>
          ${methode([
            "Couple de l’oxydant : Cr₂O₇²⁻ + 14 H⁺ + 6 e⁻ → 2 Cr³⁺ + 7 H₂O.",
            "Couple de l’alcool : CH₃−CH₂OH → CH₃−CHO + 2 H⁺ + 2 e⁻ (multiplié par 3).",
            "Somme, après simplification des H⁺ : Cr₂O₇²⁻ + 8 H⁺ + 3 CH₃CH₂OH → 2 Cr³⁺ + 3 CH₃CHO + 7 H₂O.",
          ], "Exemple : éthanol → éthanal")}
          <p>C’est la réaction des anciens alcootests : le dichromate orange devient vert en présence de l’éthanol de l’haleine.</p>
          <h2>Tests d’identification</h2>
          ${tableau([
            ["Test", "Aldéhyde", "Cétone"],
            ["DNPH (2,4-dinitrophénylhydrazine)", "précipité jaune", "précipité jaune"],
            ["liqueur de Fehling, à chaud", "précipité <strong>rouge brique</strong>", "rien"],
            ["réactif de Tollens (nitrate d’argent ammoniacal)", "<strong>miroir d’argent</strong>", "rien"],
            ["réactif de Schiff", "coloration <strong>rose</strong>", "rien"],
          ])}
          <p>La DNPH caractérise le groupe carbonyle C=O (aldéhydes et cétones) ; les trois autres tests distinguent l’aldéhyde, qui est réducteur.</p>
          ${exercice(
            "L’oxydation ménagée d’un alcool B de formule C₄H₁₀O donne un composé C qui donne un précipité jaune avec la DNPH mais ne réagit pas avec la liqueur de Fehling. Identifie B et C.",
            [
              "C réagit avec la DNPH : il possède un groupe carbonyle ; il ne réagit pas avec la liqueur de Fehling : ce n’est pas un aldéhyde, c’est une <strong>cétone</strong>.",
              "Une cétone provient d’un alcool <strong>secondaire</strong> : parmi les isomères de C₄H₁₀O, seul le butan-2-ol est secondaire.",
              "B est le <strong>butan-2-ol</strong> CH₃−CHOH−CH₂−CH₃ et C la <strong>butanone</strong> CH₃−CO−CH₂−CH₃.",
            ],
          )}
          ${erreurs(["oublier qu’un alcool primaire peut aller jusqu’à l’acide carboxylique ;", "dire qu’un alcool tertiaire donne une cétone."])}`,
      },
    ],
  },
  {
    title: "Les amines",
    summary: "Nomenclature, classes, structure de Lewis et propriétés basiques des amines.",
    lessons: [
      {
        title: "Structure et nomenclature des amines",
        minutes: 25,
        body: `${objectifs([
            "reconnaître une amine et donner sa structure de Lewis ;",
            "nommer une amine et déterminer sa classe.",
          ])}
          ${definition("amine", "composé qui dérive de l’ammoniac NH₃ par remplacement d’un, deux ou trois atomes d’hydrogène par des groupes carbonés. L’atome d’azote porte un <strong>doublet d’électrons non liant</strong>.")}
          ${tableau([
            ["Classe", "Formule", "Exemple et nom"],
            ["primaire", "R−NH₂", "CH₃−CH₂−NH₂ : <strong>éthanamine</strong> (éthylamine)"],
            ["secondaire", "R−NH−R’", "CH₃−NH−CH₂−CH₃ : <strong>N-méthyléthanamine</strong>"],
            ["tertiaire", "R−N(R’)−R’’", "(CH₃)₃N : <strong>N,N-diméthylméthanamine</strong> (triméthylamine)"],
          ])}
          ${methode([
            "Amine primaire : nom de l’alcane sans « e » + indice de position + « amine » (propan-2-amine).",
            "Amine secondaire ou tertiaire : la chaîne la plus longue liée à N donne le nom ; les autres groupes sont précédés de « N- ».",
            "L’amine aromatique la plus simple est l’<strong>aniline</strong> (phénylamine) C₆H₅−NH₂.",
          ], "Nommer une amine")}
          <p>Les amines légères sont gazeuses ou liquides, solubles dans l’eau, d’odeur forte (poisson avarié). Elles servent à fabriquer des médicaments, des colorants (aniline), des polyamides (nylon).</p>
          ${exercice(
            "Une monoamine saturée contient 23,7 % d’azote en masse. Trouve sa formule brute et écris ses isomères en précisant leur classe (N = 14).",
            [
              "Formule C<sub>n</sub>H<sub>2n+3</sub>N ; M = 14n + 17 ; % N = 14 ÷ M = 0,237, donc M ≈ 59 et n = 3 : <strong>C₃H₉N</strong>.",
              "Primaires : propan-1-amine CH₃−CH₂−CH₂−NH₂ et propan-2-amine CH₃−CH(NH₂)−CH₃.",
              "Secondaire : N-méthyléthanamine CH₃−NH−C₂H₅. Tertiaire : N,N-diméthylméthanamine (CH₃)₃N.",
            ],
          )}`,
      },
      {
        title: "Caractère basique et nucléophile",
        minutes: 30,
        body: `${objectifs([
            "expliquer le caractère basique des amines par le doublet de l’azote ;",
            "écrire l’équation de l’ionisation (partielle) d’une amine dans l’eau ;",
            "décrire l’action des amines sur les indicateurs colorés et sur les ions métalliques.",
          ])}
          <h2>1. Ionisation dans l’eau</h2>
          <p>Grâce au doublet non liant de l’azote, une amine capte un proton H⁺ : c’est une <strong>base</strong> (au sens de Brönsted).</p>
          ${formula("R−NH₂ + H₂O ⇌ R−NH₃⁺ + OH⁻")}
          ${liste([
            "la réaction est <strong>partielle</strong> (limitée) : une amine est une base faible ;",
            "une solution d’amine est basique (pH &gt; 7) et conduit le courant (présence d’ions) ;",
            "les amines aliphatiques sont un peu plus basiques que l’ammoniac (pK<sub>a</sub> du couple CH₃NH₃⁺/CH₃NH₂ ≈ 10,7 contre 9,2 pour NH₄⁺/NH₃) ; l’aniline est beaucoup moins basique (pK<sub>a</sub> ≈ 4,6).",
          ])}
          <h2>2. Action sur les indicateurs et les ions métalliques</h2>
          ${liste([
            "le BBT devient <strong>bleu</strong>, la phénolphtaléine <strong>rose</strong> ;",
            "les ions OH⁻ formés précipitent les ions métalliques sous forme d’hydroxydes : Cu²⁺ + 2 OH⁻ → Cu(OH)₂ (précipité bleu) ; Fe³⁺ + 3 OH⁻ → Fe(OH)₃ (rouille) ; Al³⁺ donne un précipité blanc.",
          ])}
          <h2>3. Caractère nucléophile</h2>
          <p>Le doublet de l’azote peut aussi attaquer un atome de carbone pauvre en électrons, par exemple celui d’un chlorure d’acyle : c’est ainsi qu’une amine primaire ou secondaire donne un <strong>amide</strong> (voir le chapitre sur les acides carboxyliques et leurs dérivés).</p>
          ${retenir("Doublet non liant de l’azote → l’amine capte un proton : base faible. Ionisation partielle R−NH₂ + H₂O ⇌ R−NH₃⁺ + OH⁻.")}
          ${exercice(
            "Une solution d’éthanamine à 0,01 mol/L a un pH de 11,3. Montre que l’éthanamine est une base faible.",
            [
              "Si la réaction avec l’eau était totale, on aurait [OH⁻] = 0,01 mol/L et pH = 14 + log 0,01 = 12.",
              "Le pH mesuré (11,3) est plus petit : [OH⁻] = 10<sup>11,3 − 14</sup> ≈ 2 × 10<sup>−3</sup> mol/L, inférieur à 0,01 mol/L.",
              "Seule une partie de l’amine a réagi : la réaction est partielle, l’éthanamine est une <strong>base faible</strong>.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Acides carboxyliques et dérivés",
    summary: "Acides, chlorures d’acyle, anhydrides, esters et amides ; estérification, hydrolyse, saponification, polyesters et polyamides.",
    lessons: [
      {
        title: "Acides carboxyliques et leurs dérivés",
        minutes: 35,
        body: `${objectifs([
            "nommer un acide carboxylique et ses dérivés ;",
            "écrire les réactions de passage de l’acide à ses dérivés et les réactions inverses ;",
            "citer des applications : polyesters et polyamides.",
          ])}
          <h2>1. Les acides carboxyliques</h2>
          <p>Ils possèdent le groupe <strong>carboxyle</strong> −COOH. Nom : « acide » + nom de l’alcane sans « e » + « oïque », le carbone du groupe étant le carbone 1 : HCOOH, acide méthanoïque ; CH₃COOH, acide éthanoïque (acide du vinaigre).</p>
          ${liste([
            "ce sont des acides <strong>faibles</strong> : CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺ ;",
            "ils rougissent le BBT et réagissent avec les métaux réducteurs : Zn + 2 CH₃COOH → Zn²⁺ + 2 CH₃COO⁻ + H₂ ;",
            "<strong>décarboxylation</strong> : à chaud, sur un catalyseur, deux molécules d’acide donnent une cétone : 2 R−COOH → R−CO−R + CO₂ + H₂O.",
          ])}
          <h2>2. Les dérivés</h2>
          ${tableau([
            ["Dérivé", "Groupe", "Exemple", "Obtention à partir de l’acide"],
            ["chlorure d’acyle", "R−COCl", "chlorure d’éthanoyle", "avec SOCl₂ : R−COOH + SOCl₂ → R−COCl + SO₂ + HCl (ou PCl₅)"],
            ["anhydride d’acide", "R−CO−O−CO−R", "anhydride éthanoïque", "déshydratation par P₄O₁₀ : 2 R−COOH → (R−CO)₂O + H₂O"],
            ["ester", "R−COO−R’", "éthanoate d’éthyle", "estérification avec un alcool (leçon suivante)"],
            ["amide", "R−CO−NH₂", "éthanamide", "R−COOH + NH₃ → R−COO⁻ + NH₄⁺, puis chauffage : R−CONH₂ + H₂O"],
          ])}
          <h2>3. Réactions inverses</h2>
          ${liste([
            "un chlorure d’acyle est hydrolysé rapidement et totalement : R−COCl + H₂O → R−COOH + HCl ;",
            "un anhydride est hydrolysé : (R−CO)₂O + H₂O → 2 R−COOH ;",
            "un chlorure d’acyle (ou un anhydride) réagit rapidement et totalement avec un alcool pour donner un ester, avec l’ammoniac ou une amine pour donner un amide : R−COCl + 2 NH₃ → R−CONH₂ + NH₄⁺ + Cl⁻.",
          ])}
          <h2>4. Applications : polyesters et polyamides</h2>
          <p>Un diacide et un dialcool donnent un <strong>polyester</strong> (tergal, bouteilles en PET) ; un diacide (ou un dichlorure d’acyle) et une diamine donnent un <strong>polyamide</strong>, comme le <strong>nylon 6-6</strong> obtenu à partir de l’acide hexanedioïque et de l’hexane-1,6-diamine.</p>
          ${exercice(
            "Écris l’équation de la réaction du chlorure d’éthanoyle avec la méthanamine et nomme le produit.",
            [
              "Le doublet de l’azote de l’amine attaque le carbone du groupe −COCl ; il se forme un amide N-substitué et du chlorure d’hydrogène, qui réagit avec une deuxième molécule d’amine.",
              "CH₃−COCl + 2 CH₃−NH₂ → CH₃−CO−NH−CH₃ + CH₃−NH₃⁺ + Cl⁻.",
              "Le produit est le <strong>N-méthyléthanamide</strong>.",
            ],
          )}`,
      },
      {
        title: "Estérification, hydrolyse et saponification",
        minutes: 35,
        body: `${objectifs([
            "écrire et nommer les produits d’une estérification et d’une hydrolyse ;",
            "connaître les caractéristiques de ces réactions et la notion d’équilibre chimique ;",
            "écrire une saponification et expliquer la fabrication des savons.",
          ])}
          <h2>1. Estérification et hydrolyse</h2>
          ${formula("R−COOH + R’−OH ⇌ R−COO−R’ + H₂O")}
          <p>Nom de l’ester : « -oate » de « -yle » : CH₃−COO−CH₂−CH₃ est l’<strong>éthanoate d’éthyle</strong>. Les esters ont souvent une odeur fruitée (arômes).</p>
          ${tableau([
            ["Caractéristique", "Estérification et hydrolyse"],
            ["vitesse", "<strong>lentes</strong> (plusieurs jours à froid)"],
            ["avancement", "<strong>limitées</strong> : elles aboutissent à un même état d’<strong>équilibre chimique</strong>"],
            ["énergie", "pratiquement <strong>athermiques</strong>"],
          ])}
          ${liste([
            "à partir d’un mélange équimolaire d’acide et d’alcool, on obtient environ <strong>67 %</strong> d’ester avec un alcool primaire, 60 % avec un alcool secondaire, 5 % avec un alcool tertiaire ;",
            "un catalyseur (acide sulfurique) et la chaleur permettent d’atteindre l’équilibre plus vite, sans le modifier ;",
            "on <strong>déplace l’équilibre</strong> en mettant un réactif en excès ou en éliminant l’eau (ou l’ester) au fur et à mesure ;",
            "avec un chlorure d’acyle ou un anhydride à la place de l’acide, l’estérification est rapide et <strong>totale</strong>.",
          ])}
          <h2>2. La saponification</h2>
          ${formula("R−COO−R’ + OH⁻ → R−COO⁻ + R’−OH (lente mais totale)")}
          <p>Les <strong>corps gras</strong> (huiles, beurre de karité) sont des <strong>triglycérides</strong> : triesters du glycérol et d’acides gras (acides à longue chaîne). Leur saponification par la soude (savons durs) ou la potasse (savons mous) donne le glycérol et le <strong>savon</strong>, mélange de carboxylates de sodium ou de potassium :</p>
          ${formula("triglycéride + 3 (Na⁺ + OH⁻) → glycérol + 3 (R−COO⁻ + Na⁺)")}
          ${exercice(
            "On mélange 0,50 mol d’acide éthanoïque et 0,50 mol d’éthanol avec quelques gouttes d’acide sulfurique. À l’équilibre, il reste 0,17 mol d’acide. Calcule la quantité d’ester formé et le rendement. Comment l’améliorer ?",
            [
              "Il a réagi 0,50 − 0,17 = 0,33 mol d’acide, donc il s’est formé <strong>0,33 mol</strong> d’éthanoate d’éthyle.",
              "Rendement = 0,33 ÷ 0,50 ≈ <strong>67 %</strong> : c’est la limite attendue pour un alcool primaire.",
              "Pour l’améliorer : utiliser un excès d’un réactif (l’acide, moins cher), éliminer l’eau ou l’ester, ou remplacer l’acide par l’anhydride éthanoïque (réaction totale).",
            ],
          )}
          ${erreurs(["dire que le catalyseur augmente le rendement : il ne change que la vitesse ;", "confondre hydrolyse (limitée) et saponification (totale)."])}`,
      },
    ],
  },
  {
    title: "Cinétique chimique",
    summary: "Vitesse de réaction, facteurs cinétiques, temps de demi-réaction.",
    lessons: [
      {
        title: "Vitesse d’une réaction chimique",
        minutes: 35,
        body: `${objectifs([
            "distinguer réactions rapides et lentes ;",
            "définir et déterminer graphiquement une vitesse de formation ou de disparition ;",
            "définir et lire le temps de demi-réaction.",
          ])}
          <p>Certaines réactions sont quasi instantanées (précipitation, réaction acide-base), d’autres <strong>lentes</strong> (estérification, oxydation des ions iodure par l’eau oxygénée), d’autres extrêmement lentes (formation de la rouille). Le caractère rapide ou lent est relatif à nos moyens de mesure.</p>
          <h2>1. Suivre une réaction</h2>
          <p>On mesure au cours du temps la quantité ou la concentration d’un réactif ou d’un produit : par dosage de prélèvements refroidis brutalement (<strong>trempe</strong>), par mesure de pression, de conductivité ou d’absorbance (colorimétrie).</p>
          <h2>2. Vitesse</h2>
          ${formula(`Vitesse de formation d’un produit P : v(t) = ${frac("d[P]", "dt")} ; vitesse de disparition d’un réactif R : v(t) = −${frac("d[R]", "dt")}`)}
          ${liste([
            "unité : mol·L<sup>−1</sup>·s<sup>−1</sup> (ou mol·L<sup>−1</sup>·min<sup>−1</sup>) ; si l’on suit une quantité de matière, mol·s<sup>−1</sup> ;",
            "v(t) est le <strong>coefficient directeur de la tangente</strong> à la courbe [P] = f(t) à l’instant t ;",
            "la vitesse <strong>moyenne</strong> entre t₁ et t₂ est Δ[P]/Δt ;",
            "en général, la vitesse <strong>diminue</strong> au cours du temps, car les réactifs s’épuisent.",
          ])}
          ${definition("temps de demi-réaction t<sub>½</sub>", "durée au bout de laquelle la moitié du réactif limitant a disparu, ou durée nécessaire pour que la quantité de produit atteigne la moitié de sa valeur finale.")}
          ${methode([
            "Tracer soigneusement la courbe à partir du tableau de mesures (échelles adaptées).",
            "Pour une vitesse à l’instant t : tracer la tangente, choisir deux points éloignés sur elle, calculer Δy/Δx.",
            "Pour t<sub>½</sub> : calculer la moitié de la valeur finale et lire l’abscisse correspondante.",
          ], "Exploiter une courbe")}
          ${exercice(
            "On suit la formation d’un ester : t (min) = 0 ; 10 ; 20 ; 30 ; 40 ; 60 ; 90 et n(ester) (mol) = 0 ; 0,20 ; 0,32 ; 0,40 ; 0,45 ; 0,50 ; 0,52. La valeur finale est 0,53 mol. Calcule les vitesses moyennes entre 0 et 10 min puis entre 30 et 40 min. Estime t<sub>½</sub>.",
            [
              "Entre 0 et 10 min : v = 0,20 ÷ 10 = <strong>0,020 mol/min</strong>.",
              "Entre 30 et 40 min : v = (0,45 − 0,40) ÷ 10 = <strong>0,005 mol/min</strong> : la vitesse diminue.",
              "Moitié de la valeur finale : 0,265 mol, atteinte entre 10 et 20 min ; par lecture graphique, t<sub>½</sub> ≈ <strong>15 min</strong>.",
            ],
          )}`,
      },
      {
        title: "Facteurs cinétiques",
        minutes: 25,
        body: `${objectifs([
            "citer et illustrer les facteurs cinétiques ;",
            "définir un catalyseur et donner des exemples de catalyse ;",
            "exploiter des courbes obtenues dans des conditions différentes.",
          ])}
          ${tableau([
            ["Facteur", "Effet", "Exemple"],
            ["<strong>concentration</strong> des réactifs", "plus elle est grande, plus la réaction est rapide", "un acide concentré attaque plus vite le métal"],
            ["<strong>température</strong>", "une élévation de température accélère la réaction", "on chauffe à reflux pour accélérer une estérification ; on fait une trempe pour arrêter"],
            ["<strong>catalyseur</strong>", "il accélère la réaction sans être consommé et sans modifier l’état final", "acide sulfurique (estérification), platine des pots catalytiques, enzymes"],
          ])}
          ${liste([
            "<strong>catalyse homogène</strong> : le catalyseur est dans la même phase que les réactifs (ions Fe³⁺ pour décomposer l’eau oxygénée) ;",
            "<strong>catalyse hétérogène</strong> : catalyseur solide (platine, nickel) ;",
            "<strong>catalyse enzymatique</strong> : les enzymes des êtres vivants (amylase de la salive) sont des catalyseurs très spécifiques.",
          ])}
          ${retenir("Le réfrigérateur ralentit les réactions qui dégradent les aliments ; la cocotte-minute accélère la cuisson en augmentant la température.")}
          ${exercice(
            "On réalise la même réaction à 20 °C puis à 40 °C, avec les mêmes concentrations initiales. Comment se placent les deux courbes [P] = f(t) ? Atteignent-elles la même valeur finale ?",
            [
              "À 40 °C, la réaction est plus rapide : la courbe monte plus vite et t<sub>½</sub> est plus petit.",
              "Avec les mêmes quantités de réactifs (réaction totale), la quantité finale de produit est la même : les deux courbes tendent vers la <strong>même asymptote</strong>.",
            ],
          )}
          ${auBac("La notion d’ordre de réaction n’est pas au programme : on te demandera surtout de tracer, lire et interpréter des courbes.")}`,
      },
    ],
  },
  {
    title: "Autoprotolyse de l’eau, pH et indicateurs colorés",
    summary: "Produit ionique de l’eau, définition du pH, solutions acides, basiques, neutres, indicateurs.",
    lessons: [
      {
        title: "Autoprotolyse de l’eau et pH",
        minutes: 30,
        body: `${objectifs([
            "écrire l’autoprotolyse de l’eau et utiliser le produit ionique K<sub>e</sub> ;",
            "définir le pH et calculer [H₃O⁺] et [OH⁻] ;",
            "caractériser une solution acide, neutre ou basique.",
          ])}
          <p>L’eau pure conduit très faiblement le courant : elle contient des ions, formés par la réaction d’<strong>autoprotolyse</strong>, très limitée :</p>
          ${formula("2 H₂O ⇌ H₃O⁺ + OH⁻")}
          ${formula("Produit ionique : K<sub>e</sub> = [H₃O⁺][OH⁻] = 10<sup>−14</sup> à 25 °C ; pK<sub>e</sub> = −log K<sub>e</sub> = 14")}
          <p>K<sub>e</sub> ne dépend que de la température (à 60 °C, K<sub>e</sub> ≈ 10<sup>−13</sup>) ; cette relation est valable dans <strong>toute</strong> solution aqueuse.</p>
          ${definition("pH", "pH = −log[H₃O⁺], soit [H₃O⁺] = 10<sup>−pH</sup> mol/L. Le pH se mesure au pH-mètre (au dixième) ou au papier pH.")}
          ${tableau([
            ["Solution (25 °C)", "Comparaison", "pH"],
            ["acide", "[H₃O⁺] &gt; [OH⁻]", "&lt; 7"],
            ["neutre", "[H₃O⁺] = [OH⁻] = 10<sup>−7</sup> mol/L", "= 7"],
            ["basique", "[H₃O⁺] &lt; [OH⁻]", "&gt; 7"],
          ])}
          <p>Quelques pH : suc gastrique ≈ 2, jus de citron ≈ 2,5, sang 7,4, eau de mer ≈ 8,2. Les produits très acides ou très basiques (déboucheurs, détartrants) se manipulent avec gants et lunettes.</p>
          ${exercice(
            "Une solution a une concentration en ions OH⁻ de 2,0 × 10<sup>−4</sup> mol/L à 25 °C. Calcule [H₃O⁺] et le pH. La solution est-elle acide ou basique ?",
            [
              "[H₃O⁺] = K<sub>e</sub> ÷ [OH⁻] = 10<sup>−14</sup> ÷ (2,0 × 10<sup>−4</sup>) = <strong>5,0 × 10<sup>−11</sup> mol/L</strong>.",
              "pH = −log(5,0 × 10<sup>−11</sup>) ≈ <strong>10,3</strong>.",
              "pH &gt; 7 : la solution est <strong>basique</strong>.",
            ],
          )}
          ${erreurs(["oublier le signe moins dans pH = −log[H₃O⁺] ;", "croire qu’une solution neutre a toujours pH = 7 : ce n’est vrai qu’à 25 °C."])}`,
      },
      {
        title: "Indicateurs colorés",
        minutes: 20,
        body: `${objectifs([
            "définir un indicateur coloré et sa zone de virage ;",
            "utiliser un indicateur pour estimer un pH ou repérer une équivalence.",
          ])}
          <p>Un <strong>indicateur coloré</strong> est un couple acide/base dont la forme acide et la forme basique n’ont pas la même couleur. Il change de teinte dans un intervalle de pH appelé <strong>zone de virage</strong> (environ pK<sub>a</sub> ± 1) ; dans cette zone, on voit la <strong>teinte sensible</strong>, mélange des deux couleurs.</p>
          ${tableau([
            ["Indicateur", "Zone de virage", "Couleurs (acide → basique)"],
            ["hélianthine", "3,1 – 4,4", "rouge → jaune"],
            ["rouge de méthyle", "4,2 – 6,2", "rouge → jaune"],
            ["bleu de bromothymol (BBT)", "6,0 – 7,6", "jaune → bleu (vert dans la zone)"],
            ["phénolphtaléine", "8,2 – 10", "incolore → rose"],
          ])}
          ${retenir("Pour un dosage, on choisit un indicateur dont la <strong>zone de virage contient le pH à l’équivalence</strong>. Le mode d’action d’un indicateur (couple acide/base, pK<sub>a</sub>) est détaillé avec les acides faibles.")}
          <p>Le jus de bissap ou de chou rouge change aussi de couleur avec le pH : ce sont des indicateurs naturels.</p>
          ${exercice(
            "Une solution prend une teinte jaune avec le BBT et une teinte jaune avec l’hélianthine. Encadre son pH.",
            [
              "Jaune avec le BBT : pH &lt; 6,0.",
              "Jaune avec l’hélianthine : pH &gt; 4,4.",
              "Donc <strong>4,4 &lt; pH &lt; 6,0</strong>.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Acide fort, base forte et dosage",
    summary: "Solutions d’acide fort et de base forte, réaction acide fort-base forte, dosage.",
    lessons: [
      {
        title: "Acides forts et bases fortes",
        minutes: 30,
        body: `${objectifs([
            "définir un acide fort et une base forte ;",
            "calculer le pH d’une solution d’acide fort ou de base forte ;",
            "prévoir l’effet d’une dilution.",
          ])}
          ${definition("acide fort", "acide qui réagit <strong>totalement</strong> avec l’eau : HCl + H₂O → H₃O⁺ + Cl⁻. Exemples : acide chlorhydrique, acide nitrique.")}
          ${definition("base forte", "base qui se dissocie ou réagit <strong>totalement</strong> dans l’eau : NaOH → Na⁺ + OH⁻. Exemples : soude, potasse, ion éthanolate.")}
          ${formula("Acide fort de concentration C : [H₃O⁺] = C et pH = −log C ; base forte : [OH⁻] = C et pH = 14 + log C")}
          <p>Ces formules sont valables pour 10<sup>−5</sup> &lt; C &lt; 10<sup>−1</sup> mol/L (au-delà, la solution n’est plus idéale ; en deçà, il faut tenir compte des ions de l’eau).</p>
          ${retenir("Diluer 10 fois une solution d’acide fort augmente son pH d’une unité ; diluer 10 fois une base forte le diminue d’une unité. Un acide dilué ne peut jamais devenir basique : son pH tend vers 7.")}
          ${exercice(
            "On dissout 0,73 g de chlorure d’hydrogène dans de l’eau pour obtenir 2 L de solution (M(HCl) = 36,5 g/mol). Calcule le pH. Quel volume d’eau faut-il ajouter à 100 mL de cette solution pour obtenir un pH de 3 ?",
            [
              "n = 0,73 ÷ 36,5 = 0,020 mol ; C = 0,020 ÷ 2 = 0,010 mol/L ; pH = −log 0,010 = <strong>2</strong>.",
              "Pour pH = 3, il faut C’ = 10<sup>−3</sup> mol/L : dilution par 10.",
              "100 mL doivent devenir 1 000 mL : il faut ajouter <strong>900 mL</strong> d’eau.",
            ],
          )}`,
      },
      {
        title: "Réaction acide fort-base forte et dosage",
        minutes: 35,
        body: `${objectifs([
            "écrire la réaction entre un acide fort et une base forte ;",
            "calculer le pH d’un mélange ;",
            "réaliser et exploiter un dosage : équivalence, courbe, choix d’un indicateur.",
          ])}
          ${formula("H₃O⁺ + OH⁻ → 2 H₂O (réaction rapide, totale, exothermique)")}
          <h2>1. pH d’un mélange</h2>
          ${methode([
            "Calculer les quantités n(H₃O⁺) = C<sub>a</sub>V<sub>a</sub> et n(OH⁻) = C<sub>b</sub>V<sub>b</sub>.",
            "Le réactif en défaut disparaît ; calculer la quantité restante de l’autre.",
            "Diviser par le volume <strong>total</strong> pour obtenir la concentration, puis calculer le pH.",
          ], "Calculer le pH d’un mélange")}
          <h2>2. Le dosage</h2>
          <p>Pour <strong>doser</strong> un acide de concentration inconnue C<sub>a</sub>, on y verse progressivement, à la burette, une base de concentration connue C<sub>b</sub>, en suivant le pH. À l’<strong>équivalence</strong>, les réactifs ont été mélangés dans les proportions de l’équation :</p>
          ${formula("C<sub>a</sub> V<sub>a</sub> = C<sub>b</sub> V<sub>bE</sub>")}
          ${liste([
            "la courbe pH = f(V<sub>b</sub>) présente un <strong>saut de pH</strong> autour de l’équivalence ;",
            "pour un dosage acide fort-base forte, le pH à l’équivalence vaut <strong>7</strong> (solution de chlorure de sodium) ;",
            "<strong>méthode des tangentes</strong> : on trace deux tangentes parallèles de part et d’autre du saut, puis la parallèle équidistante ; elle coupe la courbe au point d’équivalence ;",
            "indicateur adapté : le <strong>BBT</strong> (zone 6,0 – 7,6).",
          ])}
          ${exercice(
            "On mélange 20 mL d’acide chlorhydrique à 0,10 mol/L et 10 mL de soude à 0,10 mol/L. Calcule le pH du mélange.",
            [
              "n(H₃O⁺) = 0,10 × 0,020 = 2,0 × 10<sup>−3</sup> mol ; n(OH⁻) = 0,10 × 0,010 = 1,0 × 10<sup>−3</sup> mol.",
              "Les OH⁻ sont en défaut : il reste 1,0 × 10<sup>−3</sup> mol de H₃O⁺ dans 30 mL.",
              "[H₃O⁺] = 1,0 × 10<sup>−3</sup> ÷ 0,030 ≈ 3,3 × 10<sup>−2</sup> mol/L ; pH ≈ <strong>1,5</strong>.",
            ],
          )}
          ${exercice(
            "Le dosage de 20 mL d’une solution d’acide chlorhydrique par de la soude à 0,10 mol/L donne une équivalence pour 15 mL. Calcule C<sub>a</sub>.",
            ["C<sub>a</sub> = C<sub>b</sub> V<sub>bE</sub> ÷ V<sub>a</sub> = 0,10 × 15 ÷ 20 = <strong>0,075 mol/L</strong>."],
          )}
          ${erreurs(["oublier d’utiliser le volume total du mélange ;", "lire l’équivalence au début du saut au lieu de son milieu."])}`,
      },
    ],
  },
  {
    title: "Acides et bases faibles, couples acide-base",
    summary: "Couples acide/base, constante d’acidité, pKa, classification et domaines de prédominance.",
    lessons: [
      {
        title: "Acides faibles, bases faibles et couples",
        minutes: 35,
        body: `${objectifs([
            "reconnaître un acide faible ou une base faible à partir du pH ;",
            "définir un couple acide/base, K<sub>a</sub> et pK<sub>a</sub> ;",
            "calculer K<sub>a</sub> et les concentrations des espèces d’une solution.",
          ])}
          <h2>1. Acides et bases faibles</h2>
          <p>Un <strong>acide faible</strong> ne réagit que partiellement avec l’eau : pour une concentration C, son pH est supérieur à −log C. Exemple : CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺. De même, une <strong>base faible</strong> (ammoniac, amines, ion éthanoate) a un pH inférieur à 14 + log C.</p>
          <h2>2. Couples acide/base</h2>
          <p>Selon Brönsted, un acide cède un proton H⁺, une base en capte un. Un acide AH et sa base conjuguée A⁻ forment un <strong>couple acide/base</strong> AH/A⁻ : AH ⇌ A⁻ + H⁺. Exemples : CH₃COOH/CH₃COO⁻, NH₄⁺/NH₃, H₃O⁺/H₂O, H₂O/OH⁻.</p>
          ${formula(`Constante d’acidité : K<sub>a</sub> = ${frac("[A⁻][H₃O⁺]", "[AH]")} ; pK<sub>a</sub> = −log K<sub>a</sub>`)}
          ${formula(`Relation d’Henderson : pH = pK<sub>a</sub> + log ${frac("[A⁻]", "[AH]")}`)}
          ${methode([
            "Écrire l’équation de la réaction de l’acide avec l’eau et faire l’inventaire des espèces.",
            "Utiliser le pH : [H₃O⁺] = 10<sup>−pH</sup> et [OH⁻] = 10<sup>−14</sup>/[H₃O⁺].",
            "Électroneutralité : [H₃O⁺] = [A⁻] + [OH⁻] ≈ [A⁻] en milieu acide.",
            "Conservation de la matière : C = [AH] + [A⁻].",
            "Calculer K<sub>a</sub> et pK<sub>a</sub>.",
          ], "Calculer les concentrations et le pK<sub>a</sub>")}
          ${exercice(
            "Une solution d’acide éthanoïque à 1,0 × 10<sup>−2</sup> mol/L a un pH de 3,4. Montre que c’est un acide faible et calcule son pK<sub>a</sub>.",
            [
              "Un acide fort de même concentration aurait pH = 2 ; ici pH = 3,4 &gt; 2 : la réaction avec l’eau est partielle, l’acide est <strong>faible</strong>.",
              "[H₃O⁺] = 10<sup>−3,4</sup> ≈ 4,0 × 10<sup>−4</sup> mol/L ≈ [CH₃COO⁻] ; [CH₃COOH] = 10<sup>−2</sup> − 4,0 × 10<sup>−4</sup> ≈ 9,6 × 10<sup>−3</sup> mol/L.",
              "K<sub>a</sub> = (4,0 × 10<sup>−4</sup>)² ÷ (9,6 × 10<sup>−3</sup>) ≈ 1,7 × 10<sup>−5</sup>, soit pK<sub>a</sub> ≈ <strong>4,8</strong>. Seulement 4 % des molécules ont réagi.",
            ],
          )}`,
      },
      {
        title: "Classification des couples et domaines de prédominance",
        minutes: 30,
        body: `${objectifs([
            "classer des couples acide/base par leur pK<sub>a</sub> ;",
            "tracer un diagramme de prédominance ;",
            "prévoir et quantifier une réaction acide-base (constante de réaction).",
          ])}
          ${liste([
            "plus le pK<sub>a</sub> est <strong>petit</strong>, plus l’acide est <strong>fort</strong> et sa base conjuguée faible ;",
            "dans l’eau, les couples ont un pK<sub>a</sub> compris entre 0 (H₃O⁺/H₂O) et 14 (H₂O/OH⁻) ; un acide fort est plus fort que H₃O⁺ et n’existe pas dans l’eau.",
          ])}
          ${tableau([
            ["Couple", "pK<sub>a</sub>"],
            ["HCOOH/HCOO⁻ (acide méthanoïque)", "3,8"],
            ["CH₃COOH/CH₃COO⁻ (acide éthanoïque)", "4,8"],
            ["NH₄⁺/NH₃ (ammoniac)", "9,2"],
            ["CH₃NH₃⁺/CH₃NH₂ (méthanamine)", "10,7"],
          ])}
          <h2>Domaines de prédominance</h2>
          ${tableau([
            ["pH", "Espèce prédominante"],
            ["pH &lt; pK<sub>a</sub>", "la forme acide AH"],
            ["pH = pK<sub>a</sub>", "[AH] = [A⁻]"],
            ["pH &gt; pK<sub>a</sub>", "la forme basique A⁻"],
          ])}
          <p>Un indicateur coloré HIn/In⁻ prend la couleur de HIn si pH &lt; pK<sub>a</sub> − 1, celle de In⁻ si pH &gt; pK<sub>a</sub> + 1 : d’où sa zone de virage.</p>
          <h2>Constante de réaction</h2>
          ${formula("Réaction de l’acide A₁H avec la base A₂⁻ : K = 10<sup>pK<sub>a2</sub> − pK<sub>a1</sub></sup>")}
          ${liste([
            "si K &gt; 10⁴, la réaction est pratiquement <strong>totale</strong> ; si K &lt; 10<sup>−4</sup>, elle est négligeable ;",
            "réaction d’un acide faible avec OH⁻ : K = 10<sup>14 − pK<sub>a</sub></sup> (pour l’acide éthanoïque, K = 10<sup>9,2</sup> : totale) ;",
            "réaction d’une base faible avec H₃O⁺ : K = 10<sup>pK<sub>a</sub></sup>.",
          ])}
          ${exercice(
            "On mélange de l’acide méthanoïque et de l’ammoniac. Écris l’équation de la réaction, calcule sa constante et conclus.",
            [
              "L’acide le plus fort (HCOOH, pK<sub>a</sub> = 3,8) réagit avec la base la plus forte (NH₃, couple de pK<sub>a</sub> 9,2) : HCOOH + NH₃ → HCOO⁻ + NH₄⁺.",
              "K = 10<sup>9,2 − 3,8</sup> = 10<sup>5,4</sup> ≈ 2,5 × 10<sup>5</sup>.",
              "K &gt; 10⁴ : la réaction est pratiquement <strong>totale</strong>.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Réaction acide faible-base forte, effet tampon",
    summary: "Dosage d’un acide faible par une base forte (et inversement), demi-équivalence, solutions tampons.",
    lessons: [
      {
        title: "Dosage d’un acide faible par une base forte",
        minutes: 35,
        body: `${objectifs([
            "écrire la réaction entre un acide faible et une base forte et justifier qu’elle est totale ;",
            "exploiter la courbe de dosage : équivalence, demi-équivalence, pK<sub>a</sub> ;",
            "traiter le dosage d’une base faible par un acide fort.",
          ])}
          ${formula("CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O (K = 10<sup>9,2</sup> : réaction totale)")}
          <h2>La courbe pH = f(V<sub>b</sub>)</h2>
          ${tableau([
            ["Point", "Caractéristique"],
            ["départ", "pH de l’acide faible seul (plus élevé que pour un acide fort de même concentration)"],
            ["<strong>demi-équivalence</strong> (V<sub>b</sub> = V<sub>bE</sub>/2)", "[CH₃COOH] = [CH₃COO⁻], donc <strong>pH = pK<sub>a</sub></strong> ; la courbe présente un point d’inflexion où le pH varie peu"],
            ["<strong>équivalence</strong>", "C<sub>a</sub>V<sub>a</sub> = C<sub>b</sub>V<sub>bE</sub> ; la solution contient la base faible CH₃COO⁻ : <strong>pH &gt; 7</strong> (environ 8 à 9)"],
            ["après l’équivalence", "le pH tend vers celui de la soude"],
          ])}
          ${liste([
            "le saut de pH est plus petit que pour un acide fort ; l’indicateur adapté est la <strong>phénolphtaléine</strong> ;",
            "<strong>dosage d’une base faible par un acide fort</strong> (ammoniac par l’acide chlorhydrique) : NH₃ + H₃O⁺ → NH₄⁺ + H₂O ; pH &lt; 7 à l’équivalence (hélianthine ou rouge de méthyle) ; pH = pK<sub>a</sub> à la demi-équivalence.",
          ])}
          ${exercice(
            "On dose 20 mL d’une solution d’acide faible AH par de la soude à 0,10 mol/L. L’équivalence est obtenue pour 10 mL ; pour 5 mL, le pH vaut 4,8. Calcule C<sub>a</sub>, identifie l’acide et choisis un indicateur.",
            [
              "C<sub>a</sub> = C<sub>b</sub>V<sub>bE</sub> ÷ V<sub>a</sub> = 0,10 × 10 ÷ 20 = <strong>0,050 mol/L</strong>.",
              "5 mL correspond à la demi-équivalence : pK<sub>a</sub> = pH = 4,8 : c’est probablement l’<strong>acide éthanoïque</strong>.",
              "À l’équivalence, la solution d’éthanoate de sodium est basique : on choisit la <strong>phénolphtaléine</strong> (zone 8,2 – 10).",
            ],
          )}
          ${auBac("Sur la courbe, repère toujours dans l’ordre : V<sub>bE</sub> (méthode des tangentes), puis V<sub>bE</sub>/2, puis lis le pK<sub>a</sub> à la demi-équivalence.")}`,
      },
      {
        title: "Solutions tampons",
        minutes: 25,
        body: `${objectifs([
            "définir une solution tampon et citer ses propriétés ;",
            "préparer une solution tampon de pH donné ;",
            "citer des exemples de solutions tampons naturelles.",
          ])}
          ${definition("solution tampon", "solution dont le pH varie peu par addition modérée d’un acide ou d’une base, ou par dilution modérée.")}
          <p>On l’obtient avec un mélange d’un acide faible et de sa base conjuguée en quantités voisines : son pH est proche du pK<sub>a</sub> du couple (pH = pK<sub>a</sub> + log [A⁻]/[AH]).</p>
          ${liste([
            "préparation : mélange équimolaire AH + A⁻ ; ou neutralisation d’un acide faible par la moitié de la quantité de base forte nécessaire à l’équivalence ; ou d’une base faible par la moitié de la quantité d’acide fort ;",
            "l’effet tampon est maximal pour [AH] = [A⁻], c’est-à-dire pH = pK<sub>a</sub> ;",
            "le <strong>sang</strong> est tamponné à pH = 7,4 (couple CO₂,H₂O / HCO₃⁻ notamment) : une variation de 0,2 unité est déjà dangereuse ;",
            "les solutions tampons servent à étalonner les pH-mètres et dans de nombreuses préparations (médicaments, cosmétiques, analyses).",
          ])}
          ${exercice(
            "Un mélange contient 0,010 mol d’acide éthanoïque et 0,010 mol d’éthanoate de sodium (pK<sub>a</sub> = 4,8). On ajoute 0,001 mol d’acide chlorhydrique. Calcule le pH avant et après l’ajout.",
            [
              "Avant : [A⁻] = [AH], donc pH = pK<sub>a</sub> = <strong>4,8</strong>.",
              "Les ions H₃O⁺ ajoutés réagissent avec la base : CH₃COO⁻ + H₃O⁺ → CH₃COOH + H₂O. Il reste 0,009 mol de CH₃COO⁻ et 0,011 mol de CH₃COOH.",
              "pH = 4,8 + log(0,009 ÷ 0,011) ≈ 4,8 − 0,09 ≈ <strong>4,7</strong> : le pH n’a presque pas varié (dans l’eau pure, la même quantité d’acide aurait fait passer le pH d’un litre d’eau de 7 à 3).",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Acides α-aminés",
    summary: "Structure, nomenclature, chiralité, représentation de Fischer, amphion, liaison peptidique.",
    lessons: [
      {
        title: "Structure et chiralité des acides α-aminés",
        minutes: 30,
        body: `${objectifs([
            "reconnaître et nommer un acide α-aminé ;",
            "reconnaître un carbone asymétrique et une molécule chirale ;",
            "représenter des énantiomères en projection de Fischer et les désigner par D et L.",
          ])}
          <p>Un <strong>acide α-aminé</strong> a pour formule R−CH(NH₂)−COOH : le groupe amine −NH₂ et le groupe carboxyle −COOH sont portés par le même carbone, appelé carbone α. Ce sont les « briques » des protéines : il en existe une vingtaine dans les êtres vivants.</p>
          ${tableau([
            ["Nom usuel (abréviation)", "R", "Nom systématique"],
            ["glycine (Gly)", "H", "acide 2-aminoéthanoïque"],
            ["alanine (Ala)", "CH₃", "acide 2-aminopropanoïque"],
            ["valine (Val)", "CH(CH₃)₂", "acide 2-amino-3-méthylbutanoïque"],
          ])}
          <h2>Chiralité</h2>
          ${definition("carbone asymétrique", "atome de carbone lié à quatre atomes ou groupes d’atomes <strong>tous différents</strong> ; on le marque d’un astérisque C*.")}
          ${liste([
            "une molécule qui possède un seul carbone asymétrique est <strong>chirale</strong> : elle n’est pas superposable à son image dans un miroir, comme la main droite et la main gauche ;",
            "la molécule et son image sont deux <strong>énantiomères</strong> : mêmes propriétés physiques et chimiques usuelles, mais action différente sur la lumière polarisée et sur les êtres vivants ;",
            "seule la <strong>glycine</strong> (R = H) n’est pas chirale.",
          ])}
          <h2>Représentation de Fischer</h2>
          <p>La chaîne carbonée est verticale, le groupe le plus oxydé (COOH) en haut et R en bas ; les liaisons horizontales pointent vers l’observateur, les verticales vers l’arrière. Si NH₂ est à <strong>gauche</strong>, c’est l’énantiomère <strong>L</strong> ; à droite, l’énantiomère <strong>D</strong>. Les acides α-aminés naturels sont presque tous de la série L.</p>
          ${exercice(
            "Un acide α-aminé a une masse molaire de 89 g/mol. Identifie-le et dis s’il est chiral (C = 12 ; H = 1 ; O = 16 ; N = 14).",
            [
              "R−CH(NH₂)−COOH : la partie fixe CH(NH₂)COOH pèse 13 + 16 + 45 = 74 g/mol, donc R pèse 89 − 74 = 15 g/mol : R = CH₃.",
              "C’est l’<strong>alanine</strong>, acide 2-aminopropanoïque CH₃−CH(NH₂)−COOH.",
              "Le carbone α est lié à H, CH₃, NH₂ et COOH, quatre groupes différents : il est asymétrique, l’alanine est <strong>chirale</strong> (deux énantiomères D et L).",
            ],
          )}`,
      },
      {
        title: "Amphion et liaison peptidique",
        minutes: 30,
        body: `${objectifs([
            "écrire l’amphion d’un acide α-aminé et ses formes en milieu acide ou basique ;",
            "écrire la formation d’une liaison peptidique et d’un dipeptide ;",
            "expliquer la nécessité de bloquer et d’activer des groupes.",
          ])}
          <h2>1. L’amphion</h2>
          <p>Dans un acide α-aminé, le groupe acide −COOH cède un proton au groupe basique −NH₂ de la même molécule : en solution aqueuse et à l’état solide, il existe surtout sous forme d’<strong>amphion</strong> (zwitterion) R−CH(NH₃⁺)−COO⁻. C’est un <strong>ampholyte</strong> : il peut jouer le rôle d’acide ou de base. Il intervient dans deux couples : cation/amphion (pK<sub>a1</sub> ≈ 2,3 pour l’alanine) et amphion/anion (pK<sub>a2</sub> ≈ 9,7).</p>
          ${tableau([
            ["Milieu", "Forme prédominante"],
            ["pH &lt; pK<sub>a1</sub>", "cation R−CH(NH₃⁺)−COOH"],
            ["pK<sub>a1</sub> &lt; pH &lt; pK<sub>a2</sub>", "amphion R−CH(NH₃⁺)−COO⁻"],
            ["pH &gt; pK<sub>a2</sub>", "anion R−CH(NH₂)−COO⁻"],
          ])}
          <h2>2. La liaison peptidique</h2>
          <p>Le groupe −COOH d’un acide aminé réagit avec le groupe −NH₂ d’un autre ; une molécule d’eau est éliminée et il se forme la liaison <strong>peptidique</strong> −CO−NH− (fonction amide) :</p>
          ${formula("H₂N−CH(R₁)−COOH + H₂N−CH(R₂)−COOH → H₂N−CH(R₁)−CO−NH−CH(R₂)−COOH + H₂O")}
          ${liste([
            "deux acides aminés différents peuvent donner <strong>deux dipeptides</strong> (Gly-Ala et Ala-Gly), plus Gly-Gly et Ala-Ala ;",
            "pour obtenir un seul dipeptide, on <strong>bloque</strong> (protège) le groupe amine du premier et le groupe carboxyle du second, puis on <strong>active</strong> le groupe carboxyle qui doit réagir ; on débloque à la fin ;",
            "un enchaînement de nombreux acides aminés forme un polypeptide, puis une <strong>protéine</strong>.",
          ])}
          ${exercice(
            "Écris la formule du dipeptide Gly-Ala (la glycine apporte son groupe carboxyle) et repère la liaison peptidique.",
            [
              "La glycine H₂N−CH₂−COOH réagit par son groupe −COOH avec le groupe −NH₂ de l’alanine H₂N−CH(CH₃)−COOH.",
              "Gly-Ala : <strong>H₂N−CH₂−CO−NH−CH(CH₃)−COOH</strong> ; la liaison peptidique est −CO−NH−.",
              "L’alanine apporte un carbone asymétrique : ce dipeptide est chiral.",
            ],
          )}
          ${erreurs(["oublier l’eau éliminée lors de la formation de la liaison peptidique ;", "croire qu’un mélange de deux acides aminés donne un seul dipeptide."])}`,
      },
    ],
  },
];
