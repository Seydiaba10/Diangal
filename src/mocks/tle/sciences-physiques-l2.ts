// Sciences physiques de Terminale L2 (programme d'août 2008, Office du Bac, 2 h par semaine) :
// physique (énergie, phénomènes vibratoires) et chimie (plastiques, textiles, savons, pollution).
// Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type ChapterSpec, exemple, formula, frac, liste, retenir, tableau } from "./blocks";

export const PC_TLE_L2: ChapterSpec[] = [
  {
    title: "Production, transport et utilisation de l’énergie électrique",
    summary: "Centrales électriques, alternateur, transformateur, transport en haute tension, consommation.",
    lessons: [
      {
        title: "Produire l’électricité",
        minutes: 12,
        body: `<p>Dans presque toutes les centrales, une <strong>turbine</strong> fait tourner un <strong>alternateur</strong> : un aimant (ou électroaimant) tourne devant des bobines et y crée une tension alternative.</p>
          ${tableau([
            ["Centrale", "Ce qui fait tourner la turbine", "Exemple au Sénégal ou dans la sous-région"],
            ["hydraulique", "chute d’eau d’un barrage", "Manantali (fleuve Sénégal)"],
            ["thermique", "vapeur produite en brûlant fioul, charbon ou gaz", "Cap des Biches, Bel-Air"],
            ["éolienne", "vent", "parc éolien de Taïba Ndiaye"],
            ["nucléaire", "vapeur chauffée par la fission de l’uranium", "pas encore au Sénégal"],
          ])}
          ${retenir("Les panneaux solaires photovoltaïques produisent directement un courant continu, sans alternateur (centrales de Bokhol, Malicounda…).")}
          <p>Les énergies renouvelables (soleil, vent, eau) ne s’épuisent pas et rejettent peu de gaz à effet de serre.</p>`,
      },
      {
        title: "Transporter et utiliser l’énergie électrique",
        minutes: 12,
        body: `<p>Un <strong>transformateur</strong> modifie la tension alternative : ${frac("U₂", "U₁")} = ${frac("N₂", "N₁")} (rapport des nombres de spires). Il ne fonctionne qu’en courant alternatif.</p>
          ${retenir("On transporte l’électricité en haute tension pour réduire l’intensité, donc les pertes par effet Joule dans les câbles (P<sub>J</sub> = R I²).")}
          ${formula("Puissance : P = U I (watts) ; énergie consommée : E = P × t")}
          ${exemple([
            "Un fer à repasser de 1000 W utilisé 2 h consomme E = 1 kW × 2 h = 2 kWh.",
            "À 100 F le kWh, cela coûte 200 F.",
          ])}
          ${liste([
            "on économise l’énergie avec des lampes à basse consommation (LED) et en éteignant les appareils en veille ;",
            "le disjoncteur et la prise de terre protègent les personnes et les installations.",
          ])}`,
      },
    ],
  },
  {
    title: "Énergie nucléaire",
    summary: "Noyau, radioactivité, énergie de masse, fission et fusion.",
    lessons: [
      {
        title: "Le noyau et la radioactivité",
        minutes: 12,
        body: `<p>Un noyau <sup>A</sup><sub>Z</sub>X contient Z protons et A − Z neutrons. Certains noyaux instables se désintègrent spontanément : c’est la <strong>radioactivité</strong>.</p>
          ${liste([
            "α : émission d’un noyau d’hélium ; β⁻ : émission d’un électron ; β⁺ : émission d’un positon ; γ : rayonnement très pénétrant ;",
            "dans une réaction nucléaire, A et Z se conservent ;",
            "la <strong>période</strong> (demi-vie) est la durée au bout de laquelle la moitié des noyaux s’est désintégrée.",
          ])}
          ${exemple(["Un échantillon d’iode 131 (période 8 jours) contient 1000 noyaux : il en reste 500 après 8 jours, 250 après 16 jours."])}`,
      },
      {
        title: "Fission, fusion et énergie libérée",
        minutes: 12,
        body: `<p>Dans une réaction nucléaire, la masse des produits est un peu plus petite que celle des réactifs. La masse perdue Δm est transformée en énergie selon la relation d’Einstein :</p>
          ${formula("E = Δm c², avec c = 3 × 10<sup>8</sup> m/s")}
          ${liste([
            "<strong>fission</strong> : un noyau lourd (uranium 235) frappé par un neutron se casse en deux noyaux plus légers : centrales nucléaires ;",
            "<strong>fusion</strong> : deux noyaux légers s’unissent : énergie du Soleil et des étoiles.",
          ])}
          ${exemple(["Une perte de masse de 1 g libère 10<sup>−3</sup> × (3 × 10<sup>8</sup>)² = 9 × 10<sup>13</sup> J."])}
          ${retenir("Les déchets radioactifs et les accidents (Tchernobyl, Fukushima) sont les grands risques du nucléaire.")}`,
      },
    ],
  },
  {
    title: "Signaux et ondes mécaniques",
    summary: "Signal, onde transversale et longitudinale, célérité, période, longueur d’onde, son.",
    lessons: [
      {
        title: "Propagation d’un signal",
        minutes: 12,
        body: `<p>Un <strong>signal</strong> est une déformation brève qui se propage dans un milieu (corde, ressort, surface de l’eau, air) sans transport de matière.</p>
          ${liste([
            "onde <strong>transversale</strong> : la déformation est perpendiculaire à la direction de propagation (corde, vagues) ;",
            "onde <strong>longitudinale</strong> : la déformation est parallèle à la propagation (ressort comprimé, son).",
          ])}
          ${formula(`Célérité : c = ${frac("d", "Δt")}`)}
          ${exemple(["Un signal parcourt 6 m le long d’une corde en 0,5 s : c = 12 m/s."])}`,
      },
      {
        title: "Ondes progressives périodiques et son",
        minutes: 12,
        body: `<p>Si la source vibre périodiquement, l’onde est périodique : chaque point du milieu vibre avec la même période T.</p>
          ${formula(`Longueur d’onde : λ = c T = ${frac("c", "N")}`)}
          <p>λ est la distance parcourue par l’onde pendant une période ; deux points distants de λ vibrent en phase.</p>
          ${liste([
            "le son est une onde mécanique longitudinale ; dans l’air, c ≈ 340 m/s ; il ne se propage pas dans le vide ;",
            "l’oreille entend de 20 Hz à 20 000 Hz ; au-delà, ce sont les ultrasons (échographie, sonar) ;",
            "la réflexion du son produit l’écho.",
          ])}
          ${exemple(["Un écho revient 2 s après le cri : la falaise est à 340 × 2 ÷ 2 = 340 m."])}`,
      },
    ],
  },
  {
    title: "Aspect ondulatoire de la lumière",
    summary: "Diffraction, interférences, longueur d’onde et couleurs.",
    lessons: [
      {
        title: "La lumière, une onde",
        minutes: 12,
        body: `<p>Une fente très fine éclairée par un laser ne donne pas une simple tache : la lumière s’étale, c’est la <strong>diffraction</strong>. Deux fentes voisines donnent des franges brillantes et sombres : ce sont des <strong>interférences</strong>. Ces deux phénomènes montrent que la lumière est une onde.</p>
          ${formula("λ = c / ν, avec c = 3 × 10<sup>8</sup> m/s dans le vide")}
          ${tableau([
            ["Couleur", "Longueur d’onde (environ)"],
            ["violet", "400 nm"],
            ["vert", "550 nm"],
            ["rouge", "750 nm"],
          ])}
          ${retenir("Au-delà du rouge : l’infrarouge ; en deçà du violet : l’ultraviolet. Ni l’un ni l’autre ne sont visibles.")}
          ${exemple(["Interfrange i = λD/a : avec λ = 600 nm, D = 2 m et a = 1 mm, i = 1,2 mm."])}`,
      },
    ],
  },
  {
    title: "Aspect corpusculaire de la lumière",
    summary: "Effet photoélectrique, photon, dualité onde-corpuscule.",
    lessons: [
      {
        title: "Le photon et la dualité onde-corpuscule",
        minutes: 12,
        body: `<p>La lumière ultraviolette arrache des électrons à une plaque de zinc ; la lumière visible, même intense, n’y arrive pas : c’est l’<strong>effet photoélectrique</strong>. Pour l’expliquer, Einstein a proposé que la lumière soit formée de grains d’énergie, les <strong>photons</strong>.</p>
          ${formula("Énergie d’un photon : E = h ν, avec h = 6,62 × 10<sup>−34</sup> J·s")}
          ${liste([
            "plus la fréquence est grande (violet, ultraviolet), plus le photon est énergétique ;",
            "l’effet photoélectrique est utilisé dans les cellules photoélectriques et les panneaux solaires.",
          ])}
          ${retenir("<strong>Dualité onde-corpuscule</strong> : la lumière se comporte comme une onde (diffraction, interférences) ou comme un flux de particules (effet photoélectrique).")}`,
      },
    ],
  },
  {
    title: "Matières plastiques",
    summary: "Polymères, polyaddition et polycondensation, motif, degré de polymérisation, recyclage.",
    lessons: [
      {
        title: "Les polymères",
        minutes: 12,
        body: `<p>Un <strong>polymère</strong> est une très grande molécule formée par l’enchaînement d’un même groupe d’atomes, le <strong>motif</strong>, issu de petites molécules : les <strong>monomères</strong>.</p>
          ${formula("n CH₂=CH₂ → −(CH₂−CH₂)<sub>n</sub>− (polyaddition de l’éthylène : polyéthylène)")}
          ${tableau([
            ["Monomère", "Polymère", "Usages"],
            ["éthylène CH₂=CH₂", "polyéthylène (PE)", "sachets, bidons"],
            ["chlorure de vinyle CH₂=CHCl", "PVC", "tuyaux, chaussures en plastique"],
            ["styrène", "polystyrène (PS)", "emballages, isolants"],
            ["propène", "polypropylène (PP)", "sacs tissés, chaises"],
          ])}
          ${formula(`Degré de polymérisation : n = ${frac("M(polymère)", "M(motif)")}`)}
          ${exemple(["Un polyéthylène de masse molaire 56 000 g/mol, de motif −CH₂−CH₂− (28 g/mol), a n = 2000."])}`,
      },
      {
        title: "Propriétés et recyclage des plastiques",
        minutes: 10,
        body: `${liste([
            "<strong>thermoplastiques</strong> : ils ramollissent à la chaleur et peuvent être remoulés (PE, PVC) ;",
            "<strong>thermodurcissables</strong> : ils durcissent définitivement (bakélite) ;",
            "les plastiques sont légers, isolants, imperméables et bon marché.",
          ])}
          ${retenir("Les sachets plastiques mettent des siècles à se dégrader : ils tuent le bétail, bouchent les canalisations et polluent les sols. Le Sénégal a interdit les sachets plastiques fins ; il faut réduire, réutiliser et recycler.")}
          <p>Brûler les plastiques à l’air libre dégage des gaz toxiques (dioxines, chlorure d’hydrogène pour le PVC).</p>`,
      },
    ],
  },
  {
    title: "Les textiles",
    summary: "Fibres naturelles, artificielles et synthétiques ; polyamides et polyesters.",
    lessons: [
      {
        title: "Fibres naturelles, artificielles et synthétiques",
        minutes: 12,
        body: `${tableau([
            ["Type", "Origine", "Exemples"],
            ["naturelles végétales", "plantes", "coton (Sénégal oriental), lin, sisal"],
            ["naturelles animales", "animaux", "laine, soie"],
            ["artificielles", "polymère naturel transformé", "viscose (à partir de la cellulose)"],
            ["synthétiques", "pétrole", "nylon, polyester (tergal), acrylique"],
          ])}
          <p>Les fibres synthétiques sont obtenues par <strong>polycondensation</strong> : des monomères à deux groupes fonctionnels s’unissent en éliminant de petites molécules (eau).</p>
          ${liste([
            "<strong>polyamides</strong> (nylon 6-6) : un diacide et une diamine forment des liaisons amide −CO−NH− ;",
            "<strong>polyesters</strong> (tergal) : un diacide et un dialcool forment des liaisons ester −CO−O−.",
          ])}
          ${retenir("Les fibres synthétiques sont résistantes et sèchent vite ; les fibres naturelles absorbent mieux la transpiration.")}`,
      },
    ],
  },
  {
    title: "Les savons",
    summary: "Corps gras, saponification, structure et action d’un savon.",
    lessons: [
      {
        title: "Fabrication des savons",
        minutes: 12,
        body: `<p>Les huiles et graisses (huile d’arachide, de palme, beurre de karité) sont des <strong>triglycérides</strong> : des esters du glycérol et d’acides gras.</p>
          ${formula("triglycéride + 3 OH⁻ → glycérol + 3 ions carboxylate (savon)")}
          <p>C’est la <strong>saponification</strong>, réaction lente mais totale, faite à chaud avec de la soude ou de la potasse.</p>
          ${liste([
            "avec la soude NaOH, on obtient un savon dur (savon de Marseille, savon artisanal) ;",
            "avec la potasse KOH, un savon mou ;",
            "on fait « relarguer » le savon en ajoutant de l’eau salée : il est peu soluble dans l’eau salée.",
          ])}
          ${retenir("Formule d’un savon : R−COO⁻ Na⁺, où R est une longue chaîne carbonée (15 à 17 atomes de carbone).")}`,
      },
      {
        title: "Comment un savon lave",
        minutes: 10,
        body: `<p>L’ion carboxylate a une tête <strong>hydrophile</strong> (−COO⁻, attirée par l’eau) et une queue <strong>hydrophobe</strong> et lipophile (la chaîne carbonée, attirée par les graisses) : il est <strong>amphiphile</strong>.</p>
          ${liste([
            "les queues s’enfoncent dans la tache de graisse, les têtes restent dans l’eau ;",
            "la graisse est découpée en petites gouttes entourées d’ions savon (micelles), entraînées par l’eau de rinçage ;",
            "le savon abaisse la tension superficielle de l’eau : il est mouillant et moussant.",
          ])}
          ${retenir("Dans une eau « dure » (riche en ions calcium et magnésium), le savon forme un dépôt insoluble et mousse mal.")}`,
      },
    ],
  },
  {
    title: "Lessives, antiseptiques et désinfectants",
    summary: "Détergents de synthèse, composition des lessives, antiseptiques et désinfectants.",
    lessons: [
      {
        title: "Lessives, antiseptiques et désinfectants",
        minutes: 12,
        body: `<p>Les <strong>détergents de synthèse</strong> ont la même structure amphiphile que les savons, mais restent efficaces en eau dure. Une lessive contient des tensioactifs, des adoucisseurs d’eau, des agents de blanchiment, des enzymes et des parfums.</p>
          ${tableau([
            ["Produit", "Usage", "Exemples"],
            ["antiseptique", "sur les tissus vivants (peau, plaies)", "alcool à 70°, eau oxygénée, solution iodée, Dakin"],
            ["désinfectant", "sur les objets, les sols, l’eau", "eau de Javel, crésyl"],
          ])}
          ${retenir("L’eau de Javel ne doit jamais être mélangée à un acide (détartrant) : il se dégage du dichlore, gaz très toxique. On la stocke à l’abri de la lumière et de la chaleur.")}
          <p>Les phosphates des lessives favorisent la prolifération des algues dans les cours d’eau : on préfère les lessives sans phosphates.</p>`,
      },
    ],
  },
  {
    title: "Pollution de l’air et de l’eau",
    summary: "Principaux polluants, effet de serre, pluies acides, pollution et traitement de l’eau.",
    lessons: [
      {
        title: "La pollution de l’air",
        minutes: 12,
        body: `${tableau([
            ["Polluant", "Origine", "Effets"],
            ["monoxyde de carbone CO", "combustions incomplètes (moteurs, charbon de bois)", "très toxique, mortel en lieu clos"],
            ["dioxyde de soufre SO₂ et oxydes d’azote", "industries, véhicules", "pluies acides, maladies respiratoires"],
            ["particules fines", "trafic, poussières, brûlage des ordures", "asthme, maladies cardiaques"],
            ["dioxyde de carbone CO₂", "combustion des énergies fossiles", "renforcement de l’effet de serre"],
          ])}
          ${retenir("L’augmentation des gaz à effet de serre (CO₂, méthane) réchauffe la planète : avancée du désert, montée de la mer qui menace les côtes sénégalaises (Saint-Louis, Rufisque).")}`,
      },
      {
        title: "La pollution de l’eau",
        minutes: 12,
        body: `${liste([
            "<strong>matières organiques</strong> (eaux usées, ordures) : elles consomment l’oxygène de l’eau ;",
            "<strong>nitrates et phosphates</strong> (engrais, lessives) : prolifération d’algues, ou eutrophisation ;",
            "<strong>métaux lourds</strong> (plomb, mercure de l’orpaillage) : ils s’accumulent dans les poissons et les organismes ;",
            "<strong>hydrocarbures</strong> : marées noires.",
          ])}
          <p>Le traitement de l’eau potable comprend : décantation, filtration, puis désinfection au chlore.</p>
          ${retenir("Pour protéger l’eau : traiter les eaux usées, limiter les engrais, ne pas jeter les déchets dans les canaux et sur les plages.")}`,
      },
    ],
  },
];
