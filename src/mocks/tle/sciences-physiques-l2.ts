// Sciences physiques de Terminale L2 (programme d'août 2008, Office du Bac, 2 h par semaine) :
// physique (énergie, phénomènes vibratoires) et chimie (plastiques, textiles, savons, lessives,
// pollution). Consignes du programme respectées : pas d'exercice sur l'induction, la réfraction ou
// l'effet photoélectrique ; lessives et pollution traitées en exposé, sans formule chimique de
// lessive ni d'antiseptique. Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { auBac, type ChapterSpec, definition, erreurs, exercice, formula, frac, liste, methode, objectifs, retenir, tableau } from "./blocks";

export const PC_TLE_L2: ChapterSpec[] = [
  {
    title: "Production, transport et utilisation de l’énergie électrique",
    summary: "Alternateur, centrales électriques, transformateur, transport en haute tension, installation domestique, facturation, sécurité.",
    lessons: [
      {
        title: "Produire l’électricité",
        minutes: 25,
        body: `${objectifs([
            "expliquer le principe d’un alternateur ;",
            "citer les différents types de centrales et les conversions d’énergie correspondantes ;",
            "distinguer énergies renouvelables et non renouvelables.",
          ])}
          <h2>1. L’alternateur</h2>
          <p>Quand on fait tourner un aimant devant une bobine (ou une bobine devant un aimant), un courant apparaît dans la bobine : c’est le phénomène d’<strong>induction</strong>. On le met en évidence avec un oscilloscope ou un microampèremètre, ou avec la dynamo d’un vélo.</p>
          ${liste([
            "l’<strong>alternateur</strong> comprend une partie mobile, le <strong>rotor</strong> (aimant ou électroaimant, l’inducteur), et une partie fixe, le <strong>stator</strong> (bobines, l’induit) ;",
            "il convertit l’énergie <strong>mécanique</strong> de rotation en énergie <strong>électrique</strong> ;",
            "il produit une tension <strong>alternative sinusoïdale</strong> ; au Sénégal, sa fréquence est de 50 Hz.",
          ])}
          <h2>2. Les centrales électriques</h2>
          <p>Dans presque toutes les centrales, une <strong>turbine</strong> fait tourner un alternateur. Ce qui change, c’est la source d’énergie qui fait tourner la turbine.</p>
          ${tableau([
            ["Centrale", "Conversion d’énergie", "Exemple au Sénégal ou dans la sous-région"],
            ["thermique", "chimique (fioul, charbon, gaz) → thermique (vapeur) → mécanique → électrique", "Cap des Biches, Bel-Air, Sendou"],
            ["hydraulique", "potentielle de l’eau d’un barrage → mécanique → électrique", "Manantali (fleuve Sénégal, OMVS)"],
            ["éolienne", "cinétique du vent → mécanique → électrique", "parc éolien de Taïba Ndiaye"],
            ["solaire photovoltaïque", "rayonnement → électrique, sans alternateur (courant continu)", "Bokhol, Malicounda, Diass"],
            ["nucléaire", "nucléaire (fission) → thermique → mécanique → électrique", "pas encore au Sénégal"],
          ])}
          ${retenir("Les énergies <strong>renouvelables</strong> (soleil, vent, eau) ne s’épuisent pas et rejettent peu de gaz à effet de serre ; les énergies <strong>fossiles</strong> (pétrole, charbon, gaz) s’épuisent et polluent.")}
          ${auBac("La partie 1 de l’épreuve demande souvent des définitions : sache définir alternateur, rotor, stator, induction, énergie renouvelable.")}`,
      },
      {
        title: "Transporter et utiliser l’énergie électrique",
        minutes: 35,
        body: `${objectifs([
            "décrire et utiliser un transformateur ;",
            "expliquer pourquoi on transporte l’électricité en haute tension ;",
            "calculer puissance, énergie consommée, rendement et coût ; connaître les dangers du courant.",
          ])}
          <h2>1. Le transformateur</h2>
          <p>Il est formé de deux bobines (primaire de N₁ spires, secondaire de N₂ spires) enroulées sur un même noyau de fer feuilleté. Il ne fonctionne qu’en tension <strong>alternative</strong> : en continu, il ne transmet rien.</p>
          ${formula(`${frac("U₂", "U₁")} = ${frac("N₂", "N₁")} = ${frac("I₁", "I₂")} (transformateur parfait)`)}
          ${liste([
            "N₂ &gt; N₁ : <strong>élévateur</strong> de tension ; N₂ &lt; N₁ : <strong>abaisseur</strong> de tension (chargeur de téléphone) ;",
            "<strong>rendement</strong> : η = P<sub>2</sub> ÷ P<sub>1</sub> (puissance fournie au secondaire ÷ puissance reçue au primaire), souvent supérieur à 95 %.",
          ])}
          <h2>2. Le transport</h2>
          <p>Les câbles ont une résistance R : ils dissipent par effet Joule une puissance P<sub>J</sub> = R I². Pour transporter une même puissance P = U I, on élève la tension pour <strong>diminuer l’intensité</strong>, donc les pertes en ligne : lignes très haute tension (THT, 225 kV), haute tension (HT), moyenne tension, puis basse tension (BT, 220 V) chez l’abonné, grâce à des transformateurs.</p>
          <h2>3. Puissance et énergie</h2>
          ${formula("Puissance moyenne : P<sub>m</sub> = k U I ; puissance apparente : P<sub>a</sub> = U I ; énergie : E = P × t")}
          <p>U et I sont des valeurs efficaces ; k (≤ 1) est le <strong>facteur de puissance</strong> (k = 1 pour un radiateur ou un fer à repasser). L’énergie se compte en joules ou, sur la facture, en <strong>kilowattheures</strong> (1 kWh = 3,6 × 10⁶ J).</p>
          <h2>4. L’installation domestique et la sécurité</h2>
          ${liste([
            "les appareils sont branchés en <strong>dérivation</strong> (parallèle) : ils reçoivent tous 220 V ;",
            "le compteur (ou le compteur prépayé Woyofal) mesure l’énergie consommée ; le disjoncteur coupe le courant en cas de surintensité ;",
            "la <strong>prise de terre</strong> protège des électrocutions ; ne jamais toucher un appareil avec des mains mouillées ni surcharger une multiprise ;",
            "un courant de quelques dizaines de milliampères traversant le corps peut être mortel.",
          ])}
          ${exercice(
            "Un transformateur abaisse la tension de 220 V à 11 V ; son primaire compte 1 000 spires. Combien de spires a le secondaire ? Si l’intensité au secondaire est de 2 A, quelle est l’intensité au primaire (transformateur parfait) ?",
            [
              "N₂ = N₁ × U₂ ÷ U₁ = 1 000 × 11 ÷ 220 = <strong>50 spires</strong>.",
              "I₁ = I₂ × U₂ ÷ U₁ = 2 × 11 ÷ 220 = <strong>0,1 A</strong>.",
            ],
          )}
          ${exercice(
            "Un ménage utilise un fer à repasser de 1 000 W pendant 2 h, un téléviseur de 100 W pendant 5 h et 5 lampes LED de 10 W pendant 6 h par jour. Calcule l’énergie consommée par jour et le coût sur 30 jours à 100 F le kWh.",
            [
              "Fer : 1 kW × 2 h = 2 kWh ; téléviseur : 0,1 kW × 5 h = 0,5 kWh ; lampes : 5 × 0,01 kW × 6 h = 0,3 kWh.",
              "Total : <strong>2,8 kWh par jour</strong>, soit 84 kWh en 30 jours.",
              "Coût : 84 × 100 = <strong>8 400 F</strong>.",
            ],
          )}
          ${erreurs(["oublier de convertir les watts en kilowatts avant de calculer des kWh ;", "croire qu’un transformateur fonctionne avec une pile."])}`,
      },
    ],
  },
  {
    title: "Énergie nucléaire",
    summary: "Noyau, isotopes, radioactivité, période, énergie de masse, fission, fusion, applications et dangers.",
    lessons: [
      {
        title: "Le noyau et la radioactivité",
        minutes: 30,
        body: `${objectifs([
            "décrire un noyau à partir de son symbole ; définir des isotopes ;",
            "définir la radioactivité et les rayonnements α, β, γ ;",
            "écrire une équation de désintégration et utiliser la période radioactive.",
          ])}
          <h2>1. Le noyau</h2>
          <p>Un noyau noté <sup>A</sup><sub>Z</sub>X contient <strong>Z protons</strong> (numéro atomique) et <strong>N = A − Z neutrons</strong> ; A est le nombre de nucléons. Des <strong>isotopes</strong> ont le même Z mais des A différents : <sup>12</sup><sub>6</sub>C et <sup>14</sup><sub>6</sub>C, <sup>235</sup><sub>92</sub>U et <sup>238</sup><sub>92</sub>U.</p>
          <h2>2. La radioactivité</h2>
          ${definition("radioactivité", "transformation <strong>spontanée</strong> et <strong>inéluctable</strong> d’un noyau instable (noyau père) en un autre noyau (noyau fils), avec émission d’un rayonnement.")}
          ${tableau([
            ["Rayonnement", "Nature", "Pouvoir de pénétration"],
            ["α", "noyaux d’hélium <sup>4</sup><sub>2</sub>He", "faible : arrêté par une feuille de papier"],
            ["β⁻", "électrons <sup>0</sup><sub>−1</sub>e", "moyen : arrêté par quelques mm d’aluminium"],
            ["β⁺", "positons <sup>0</sup><sub>1</sub>e", "moyen"],
            ["γ", "ondes électromagnétiques (photons) de grande énergie", "très grand : il faut du plomb ou du béton"],
          ])}
          ${retenir("Dans une réaction nucléaire, le <strong>nombre de nucléons A</strong> et le <strong>nombre de charge Z</strong> se conservent. Exemple : <sup>226</sup><sub>88</sub>Ra → <sup>222</sup><sub>86</sub>Rn + <sup>4</sup><sub>2</sub>He.")}
          <h2>3. La période radioactive</h2>
          ${definition("période (demi-vie) T", "durée au bout de laquelle la moitié des noyaux radioactifs présents s’est désintégrée.")}
          ${formula("Après n périodes : N = N₀ ÷ 2ⁿ")}
          ${exercice(
            "L’iode 131 (période 8 jours) est utilisé pour soigner la thyroïde. Un patient en reçoit une dose contenant N₀ noyaux. Quelle fraction reste-t-il après 24 jours ? Après combien de temps reste-t-il moins de 10 % des noyaux ?",
            [
              "24 jours = 3 périodes : N = N₀ ÷ 2³ = <strong>N₀/8</strong>, soit 12,5 %.",
              "Après 4 périodes (32 jours), N = N₀/16 ≈ 6 % : il en reste moins de 10 % au bout d’environ <strong>4 périodes</strong>, soit 32 jours (un peu moins en réalité : entre 3 et 4 périodes).",
            ],
          )}
          ${erreurs(["croire qu’après 2 périodes tous les noyaux ont disparu : il en reste un quart ;", "oublier de conserver Z dans l’équation."])}`,
      },
      {
        title: "Fission, fusion et énergie libérée",
        minutes: 35,
        body: `${objectifs([
            "utiliser la relation d’Einstein et calculer une énergie libérée en joules et en MeV ;",
            "définir la fission et la fusion et écrire leurs équations ;",
            "expliquer l’origine de l’énergie des étoiles ; citer des applications et des dangers.",
          ])}
          <h2>1. Énergie de masse</h2>
          <p>Selon Einstein, la masse est une forme d’énergie. Dans une réaction nucléaire, la masse des produits est un peu plus petite que celle des réactifs : la perte de masse Δm est libérée sous forme d’énergie :</p>
          ${formula("E = Δm c², avec c = 3,00 × 10<sup>8</sup> m/s ; 1 MeV = 1,6 × 10<sup>−13</sup> J ; 1 u ↔ 931,5 MeV")}
          <h2>2. Fission et fusion</h2>
          ${tableau([
            ["", "Fission", "Fusion"],
            ["Définition", "rupture d’un noyau <strong>lourd</strong> en deux noyaux plus légers sous l’action d’un <strong>neutron lent</strong> ; elle libère des neutrons", "union de deux noyaux <strong>légers</strong> qui forment un noyau plus lourd"],
            ["Exemple", "<sup>235</sup><sub>92</sub>U + <sup>1</sup><sub>0</sub>n → <sup>94</sup><sub>38</sub>Sr + <sup>140</sup><sub>54</sub>Xe + 2 <sup>1</sup><sub>0</sub>n (≈ 200 MeV)", "<sup>2</sup><sub>1</sub>H + <sup>3</sup><sub>1</sub>H → <sup>4</sup><sub>2</sub>He + <sup>1</sup><sub>0</sub>n (≈ 17,6 MeV)"],
            ["Utilisation", "centrales nucléaires (réaction en chaîne contrôlée)", "énergie du Soleil et des étoiles ; recherche"],
          ])}
          <p><strong>L’énergie stellaire</strong> : au cœur du Soleil, à plus de 10 millions de degrés, des noyaux d’hydrogène fusionnent en hélium. La masse perdue est rayonnée sous forme de lumière et de chaleur : c’est l’origine de presque toute l’énergie disponible sur Terre.</p>
          <h2>3. Applications et dangers</h2>
          ${liste([
            "<strong>applications</strong> : production d’électricité, datation au carbone 14, traceurs radioactifs, médecine (scintigraphie, radiothérapie), stérilisation ;",
            "<strong>effets physiologiques</strong> : les rayonnements détruisent les cellules et abîment l’ADN (brûlures, cancers, malformations) ; on se protège par la distance, des écrans et une durée d’exposition courte ;",
            "<strong>avantages</strong> du nucléaire : beaucoup d’énergie, pas de CO₂ ; <strong>inconvénients</strong> : déchets radioactifs pendant des milliers d’années, risque d’accident (Tchernobyl en 1986, Fukushima en 2011).",
          ])}
          ${exercice(
            "Dans une réaction de fusion, la perte de masse est Δm = 0,0189 u. Calcule l’énergie libérée en MeV puis en joules.",
            [
              "E = 0,0189 × 931,5 ≈ <strong>17,6 MeV</strong>.",
              "E = 17,6 × 1,6 × 10<sup>−13</sup> ≈ <strong>2,8 × 10<sup>−12</sup> J</strong> pour une seule réaction.",
            ],
          )}
          ${auBac("La partie 4 de l’épreuve propose souvent un texte scientifique (médecine nucléaire, centrale, Soleil) : lis les questions d’abord, puis souligne dans le texte les informations utiles.")}`,
      },
    ],
  },
  {
    title: "Signaux et ondes mécaniques",
    summary: "Signal, ondes progressives, célérité, période, longueur d’onde, son, réflexion, diffraction et interférences mécaniques.",
    lessons: [
      {
        title: "Propagation d’un signal",
        minutes: 25,
        body: `${objectifs([
            "distinguer signal et onde ; décrire la séquence émission-propagation-réception ;",
            "distinguer ondes transversales et longitudinales ;",
            "calculer une célérité.",
          ])}
          ${definition("signal mécanique", "déformation brève et locale d’un milieu (corde, ressort, surface de l’eau, air) qui se propage de proche en proche, <strong>sans transport de matière</strong> mais avec transport d’énergie.")}
          <p>On observe toujours trois étapes : l’<strong>émission</strong> (par une source), la <strong>propagation</strong> (dans un milieu), la <strong>réception</strong> (par un récepteur). Un bouchon posé sur l’eau monte et descend au passage de la vague, mais n’avance pas.</p>
          ${tableau([
            ["Onde", "Déformation par rapport à la propagation", "Exemples"],
            ["<strong>transversale</strong>", "perpendiculaire", "corde secouée, vagues à la surface de l’eau"],
            ["<strong>longitudinale</strong>", "parallèle", "ressort comprimé, son dans l’air"],
          ])}
          ${formula(`Célérité : c = ${frac("d", "Δt")} (en m/s)`)}
          <p>La célérité dépend du milieu (tension et masse de la corde, nature du gaz, température), pas de la forme du signal.</p>
          ${exercice(
            "Un signal parcourt 6 m le long d’une corde en 0,5 s. Calcule sa célérité. Combien de temps mettrait-il pour parcourir une corde de 9 m identique ?",
            ["c = 6 ÷ 0,5 = <strong>12 m/s</strong>.", "Δt = 9 ÷ 12 = <strong>0,75 s</strong> (même corde, même célérité)."],
          )}`,
      },
      {
        title: "Ondes progressives périodiques et son",
        minutes: 30,
        body: `${objectifs([
            "définir période temporelle, longueur d’onde (période spatiale) et amplitude ;",
            "utiliser la relation λ = c T ;",
            "comparer l’état vibratoire de deux points ; connaître les caractéristiques du son.",
          ])}
          <p>Si la source vibre de façon <strong>périodique</strong> (vibreur, diapason), elle émet une onde progressive périodique : chaque point du milieu reproduit le mouvement de la source avec un retard.</p>
          ${tableau([
            ["Grandeur", "Définition", "Unité"],
            ["période T", "durée d’une vibration (périodicité dans le temps)", "seconde (s)"],
            ["fréquence N", "nombre de vibrations par seconde : N = 1/T", "hertz (Hz)"],
            ["longueur d’onde λ", "distance parcourue par l’onde pendant une période (périodicité dans l’espace)", "mètre (m)"],
            ["amplitude", "élongation maximale d’un point", "mètre"],
          ])}
          ${formula(`λ = c T = ${frac("c", "N")}`)}
          ${liste([
            "deux points distants d’un nombre entier de longueurs d’onde (d = kλ) vibrent <strong>en phase</strong> ;",
            "deux points distants d’un nombre impair de demi-longueurs d’onde (d = (2k + 1)λ/2) vibrent en <strong>opposition de phase</strong>.",
          ])}
          <h2>Le son</h2>
          ${liste([
            "c’est une onde mécanique <strong>longitudinale</strong> ; dans l’air, c ≈ 340 m/s ; dans l’eau ≈ 1 500 m/s ; il ne se propage <strong>pas dans le vide</strong> ;",
            "l’oreille humaine perçoit de 20 Hz à 20 000 Hz ; au-dessous, les infrasons ; au-dessus, les <strong>ultrasons</strong> (échographie, sonar, chauves-souris) ;",
            "un son aigu a une fréquence élevée, un son grave une fréquence faible.",
          ])}
          ${exercice(
            "Un vibreur de fréquence 50 Hz crée des ondes à la surface de l’eau ; la célérité vaut 0,30 m/s. Calcule la longueur d’onde. Deux points M et P, situés sur un même rayon, sont distants de 1,5 cm : comment vibrent-ils l’un par rapport à l’autre ?",
            [
              "λ = c ÷ N = 0,30 ÷ 50 = 6 × 10<sup>−3</sup> m = <strong>6 mm</strong>.",
              "d ÷ λ = 15 ÷ 6 = 2,5 : la distance vaut un nombre impair de demi-longueurs d’onde (5 × λ/2).",
              "M et P vibrent en <strong>opposition de phase</strong>.",
            ],
          )}
          ${erreurs(["confondre la période T (temps) et la longueur d’onde λ (distance) ;", "oublier de convertir les cm en m."])}`,
      },
      {
        title: "Réflexion, diffraction et interférences mécaniques",
        minutes: 30,
        body: `${objectifs([
            "décrire la réflexion, la réfraction et la diffraction d’une onde à la surface de l’eau ;",
            "énoncer les lois de la réflexion et expliquer l’écho ;",
            "interpréter des interférences mécaniques par le principe de superposition.",
          ])}
          <h2>1. Réflexion et écho</h2>
          <p>Une onde qui rencontre un obstacle repart en arrière : c’est la <strong>réflexion</strong>. Dans une cuve à ondes, on vérifie les lois :</p>
          ${retenir("<strong>Lois de la réflexion</strong> : la direction de l’onde réfléchie est dans le plan d’incidence ; l’angle de réflexion est égal à l’angle d’incidence (i = r), angles mesurés par rapport à la normale à l’obstacle.")}
          <p>L’<strong>écho</strong> est un son réfléchi par un obstacle éloigné (falaise, mur) ; on l’entend séparément si l’obstacle est à plus de 17 m environ. Le sonar des bateaux et l’échographie utilisent la réflexion des ultrasons.</p>
          <h2>2. Réfraction et diffraction</h2>
          ${liste([
            "<strong>réfraction</strong> : en passant d’une zone profonde à une zone peu profonde, l’onde change de célérité et de direction ;",
            "<strong>diffraction</strong> : une onde qui passe par une ouverture étroite (de taille voisine de λ) s’étale au-delà ; derrière une fente fine, l’onde devient circulaire.",
          ])}
          <h2>3. Interférences mécaniques</h2>
          <p>Deux pointes qui frappent l’eau en même temps (sources synchrones) créent deux ondes circulaires. Là où elles se superposent, on observe des lignes immobiles (amplitude nulle) séparées par des zones d’agitation maximale : ce sont des <strong>franges d’interférences</strong>.</p>
          ${retenir("<strong>Principe de superposition</strong> : en un point atteint par deux ondes, l’élongation est la somme des élongations dues à chaque onde. Deux vibrations en phase s’ajoutent (amplitude maximale) ; deux vibrations en opposition de phase s’annulent (amplitude nulle).")}
          ${exercice(
            "Un randonneur crie face à une falaise et entend l’écho 2 s plus tard. À quelle distance est la falaise (c = 340 m/s) ?",
            [
              "Le son fait l’aller et le retour : distance parcourue = 340 × 2 = 680 m.",
              "La falaise est à 680 ÷ 2 = <strong>340 m</strong>.",
            ],
          )}
          ${exercice(
            "Une onde arrive sur une paroi plane avec un angle d’incidence de 35°. Quel est l’angle de réflexion ? Quel angle forme l’onde réfléchie avec la paroi ?",
            ["D’après les lois de la réflexion, r = i = <strong>35°</strong>.", "L’angle avec la paroi vaut 90° − 35° = <strong>55°</strong>."],
          )}
          ${auBac("Au Bac, les exercices de ce chapitre portent sur les lois de la réflexion, la longueur d’onde et l’état vibratoire d’un point ; il n’y a pas d’exercice sur la réfraction.")}`,
      },
    ],
  },
  {
    title: "Aspect ondulatoire de la lumière",
    summary: "Propagation rectiligne, réflexion et miroir plan, réfraction, diffraction et interférences lumineuses.",
    lessons: [
      {
        title: "Propagation et réflexion de la lumière",
        minutes: 30,
        body: `${objectifs([
            "citer des sources et des récepteurs de lumière ;",
            "connaître le principe de la propagation rectiligne et la célérité de la lumière ;",
            "énoncer les lois de la réflexion et construire l’image d’un objet dans un miroir plan.",
          ])}
          <h2>1. Émission, propagation, réception</h2>
          ${liste([
            "<strong>sources primaires</strong> : elles produisent la lumière (Soleil, lampe, flamme) ; <strong>objets diffusants</strong> : ils renvoient la lumière reçue (Lune, murs) ;",
            "<strong>récepteurs</strong> : œil, photopile, pellicule photo, capteur de téléphone ;",
            "dans un milieu transparent et homogène, la lumière se propage en <strong>ligne droite</strong> ; on la représente par des <strong>rayons</strong> et des faisceaux ;",
            "célérité dans le vide (et presque dans l’air) : <strong>c = 3,00 × 10<sup>8</sup> m/s</strong>.",
          ])}
          <h2>2. La réflexion</h2>
          ${retenir("<strong>Lois de la réflexion</strong> (Descartes) : le rayon réfléchi est dans le plan d’incidence (défini par le rayon incident et la normale au miroir) ; l’angle de réflexion est égal à l’angle d’incidence : r = i.")}
          ${methode([
            "Tracer le symétrique A’ de chaque point A de l’objet par rapport au plan du miroir.",
            "L’image A’B’ est symétrique de l’objet : même taille, à la même distance derrière le miroir.",
            "Pour tracer un rayon qui atteint l’œil, joindre l’image A’ à l’œil : le point où cette droite coupe le miroir est le point d’incidence.",
          ], "Construire l’image dans un miroir plan")}
          <h2>3. La réfraction</h2>
          <p>Quand la lumière passe de l’air à l’eau (ou au verre), elle change de direction à la surface de séparation : c’est la <strong>réfraction</strong> (une paille paraît « cassée » dans un verre d’eau). On l’observe ; son étude chiffrée (indice de réfraction) n’est pas au programme de la série L.</p>
          ${exercice(
            "Un élève se tient à 2 m d’un miroir plan vertical. À quelle distance de lui voit-il son image ? Un rayon arrive sur le miroir avec un angle d’incidence de 40° : quel angle fait-il avec le rayon réfléchi ?",
            [
              "L’image est symétrique : elle est à 2 m derrière le miroir, donc à <strong>4 m</strong> de l’élève.",
              "r = i = 40° : l’angle entre le rayon incident et le rayon réfléchi vaut i + r = <strong>80°</strong>.",
            ],
          )}`,
      },
      {
        title: "La lumière, une onde",
        minutes: 30,
        body: `${objectifs([
            "décrire la diffraction de la lumière ;",
            "décrire l’expérience des interférences lumineuses et interpréter les franges brillantes et obscures ;",
            "relier longueur d’onde et couleur.",
          ])}
          <h2>1. La diffraction</h2>
          <p>Un faisceau laser qui traverse une fente très fine (quelques dixièmes de millimètre) ne donne pas une simple tache : sur l’écran, la lumière s’étale perpendiculairement à la fente, en une tache centrale brillante entourée de taches plus faibles. C’est la <strong>diffraction</strong>, phénomène caractéristique des ondes (comme pour les vagues à la surface de l’eau).</p>
          <h2>2. Les interférences lumineuses</h2>
          <p>Deux fentes fines et voisines, éclairées par la même source, donnent sur un écran une alternance de <strong>franges brillantes</strong> et de <strong>franges obscures</strong>. Comme pour les ondes à la surface de l’eau :</p>
          ${liste([
            "là où les deux ondes lumineuses arrivent <strong>en phase</strong>, elles s’ajoutent : frange brillante ;",
            "là où elles arrivent en <strong>opposition de phase</strong>, elles s’annulent : frange obscure. Lumière + lumière peut donc donner de l’obscurité !",
          ])}
          ${retenir("Diffraction et interférences ne s’expliquent que si la lumière est une <strong>onde</strong> (Young, Fresnel, au XIX<sup>e</sup> siècle).")}
          <h2>3. Longueur d’onde et couleur</h2>
          ${formula("λ = c ÷ ν (λ : longueur d’onde dans le vide ; ν : fréquence)")}
          ${tableau([
            ["Domaine", "Longueur d’onde dans le vide"],
            ["ultraviolet (invisible)", "moins de 400 nm"],
            ["violet", "≈ 400 nm"],
            ["vert", "≈ 550 nm"],
            ["rouge", "≈ 750 nm"],
            ["infrarouge (invisible)", "plus de 800 nm"],
          ])}
          <p>La lumière blanche est un mélange de toutes les couleurs : un prisme ou un arc-en-ciel les sépare.</p>
          ${exercice(
            "Une radiation lumineuse a une fréquence de 5,0 × 10<sup>14</sup> Hz. Calcule sa longueur d’onde dans le vide et donne sa couleur.",
            [
              "λ = c ÷ ν = 3,0 × 10<sup>8</sup> ÷ (5,0 × 10<sup>14</sup>) = 6,0 × 10<sup>−7</sup> m = <strong>600 nm</strong>.",
              "600 nm est entre le vert et le rouge : lumière <strong>orangée</strong>.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Aspect corpusculaire de la lumière",
    summary: "Effet photoélectrique, photon, théorie d’Einstein, dualité onde-corpuscule.",
    lessons: [
      {
        title: "Le photon et la dualité onde-corpuscule",
        minutes: 30,
        body: `${objectifs([
            "décrire la mise en évidence de l’effet photoélectrique ;",
            "énoncer la théorie des photons et calculer l’énergie d’un photon ;",
            "expliquer la dualité onde-corpuscule et l’évolution des idées sur la lumière.",
          ])}
          <h2>1. L’effet photoélectrique</h2>
          <p>Une plaque de zinc chargée négativement est fixée sur un électroscope. Éclairée en <strong>ultraviolet</strong>, elle se décharge : la lumière arrache des électrons au métal. En lumière visible, même très intense, rien ne se passe. L’effet est <strong>sélectif</strong> : pour chaque métal, il faut une lumière de fréquence suffisante.</p>
          <h2>2. La théorie d’Einstein (1905)</h2>
          <p>La lumière est formée de grains d’énergie, les <strong>photons</strong>. Un photon cède toute son énergie à un seul électron ; s’il n’est pas assez énergétique, il ne peut pas l’arracher, quel que soit le nombre de photons.</p>
          ${formula("Énergie d’un photon : E = h ν, avec h = 6,62 × 10<sup>−34</sup> J·s (constante de Planck)")}
          ${liste([
            "plus la fréquence est grande (violet, ultraviolet), plus le photon est énergétique ;",
            "applications : cellules photovoltaïques des panneaux solaires, capteurs de lumière des appareils photo, portes automatiques.",
          ])}
          <h2>3. La dualité onde-corpuscule</h2>
          ${tableau([
            ["Époque", "Idée sur la lumière"],
            ["XVII<sup>e</sup> siècle", "Newton : la lumière est faite de corpuscules ; Huygens : c’est une onde"],
            ["XIX<sup>e</sup> siècle", "Young et Fresnel (interférences, diffraction) : la lumière est une onde"],
            ["1905", "Einstein (effet photoélectrique) : la lumière est aussi faite de photons"],
          ])}
          ${retenir("<strong>Dualité onde-corpuscule</strong> : la lumière se comporte comme une onde (diffraction, interférences) ou comme un ensemble de particules (effet photoélectrique), selon l’expérience. Les deux aspects se complètent, reliés par E = h ν. Les théories scientifiques évoluent avec les expériences.")}
          ${exercice(
            "Calcule l’énergie d’un photon de lumière violette de fréquence 7,5 × 10<sup>14</sup> Hz et celle d’un photon rouge de fréquence 4,0 × 10<sup>14</sup> Hz. Lequel est le plus énergétique ?",
            [
              "Violet : E = 6,62 × 10<sup>−34</sup> × 7,5 × 10<sup>14</sup> ≈ <strong>5,0 × 10<sup>−19</sup> J</strong>.",
              "Rouge : E = 6,62 × 10<sup>−34</sup> × 4,0 × 10<sup>14</sup> ≈ <strong>2,6 × 10<sup>−19</sup> J</strong>.",
              "Le photon <strong>violet</strong>, de plus grande fréquence, est le plus énergétique.",
            ],
          )}
          ${auBac("Il n’y a pas d’exercice de calcul sur l’effet photoélectrique (énergie d’extraction) au Bac L2 : on attend surtout des définitions et l’interprétation des expériences.")}`,
      },
    ],
  },
  {
    title: "Matières plastiques",
    summary: "Polymères, motif, degré de polymérisation, thermoplastiques et thermodurcissables, exemples, tests de reconnaissance.",
    lessons: [
      {
        title: "Les polymères",
        minutes: 35,
        body: `${objectifs([
            "définir monomère, polymère, motif et degré de polymérisation ;",
            "écrire l’équation-bilan d’une polymérisation par addition ;",
            "connaître quelques polymères usuels et leurs utilisations.",
          ])}
          ${definition("polymère", "très grande molécule (macromolécule) formée par l’enchaînement d’un grand nombre de fois un même groupe d’atomes, le <strong>motif</strong>, issu de petites molécules, les <strong>monomères</strong>.")}
          <p>Les monomères des plastiques usuels sont des molécules <strong>insaturées</strong> (alcènes) : leur double liaison C=C s’ouvre et les molécules s’additionnent les unes aux autres. C’est la <strong>polyaddition</strong> (polymérisation par addition).</p>
          ${formula("n CH₂=CH₂ → −(CH₂−CH₂)<sub>n</sub>−")}
          ${tableau([
            ["Monomère", "Polymère (sigle)", "Motif", "Usages"],
            ["éthylène CH₂=CH₂", "polyéthylène (PE)", "−CH₂−CH₂−", "sachets, bidons, films"],
            ["propène CH₂=CH−CH₃", "polypropylène (PP)", "−CH₂−CH(CH₃)−", "sacs tissés, chaises, cordes"],
            ["chlorure de vinyle CH₂=CHCl", "polychlorure de vinyle (PVC)", "−CH₂−CHCl−", "tuyaux, gaines électriques, chaussures"],
            ["styrène CH₂=CH−C₆H₅", "polystyrène (PS)", "−CH₂−CH(C₆H₅)−", "emballages, gobelets, isolants"],
            ["tétrafluoroéthylène CF₂=CF₂", "polytétrafluoroéthylène (PTFE, Téflon)", "−CF₂−CF₂−", "revêtement des poêles"],
            ["acétate de vinyle", "polyacétate de vinyle (PAV)", "—", "colles, peintures"],
          ])}
          ${liste([
            "le polyéthylène <strong>haute pression</strong> (PEHP, basse densité) est souple (sachets) ; le polyéthylène <strong>basse pression</strong> (PEBP, haute densité) est rigide (bidons) ;",
            "un polymère peut être <strong>linéaire</strong> (chaînes) ou <strong>ramifié</strong> ou réticulé (réseau).",
          ])}
          ${formula(`Degré de polymérisation : n = ${frac("M(polymère)", "M(motif)")}`)}
          ${exercice(
            "Un échantillon de PVC a une masse molaire moyenne de 62 500 g/mol. Écris l’équation de sa formation et calcule son degré de polymérisation (C = 12 ; H = 1 ; Cl = 35,5).",
            [
              "n CH₂=CHCl → −(CH₂−CHCl)<sub>n</sub>−.",
              "M(motif) = 2 × 12 + 3 × 1 + 35,5 = 62,5 g/mol.",
              "n = 62 500 ÷ 62,5 = <strong>1 000</strong>.",
            ],
          )}
          ${erreurs(["confondre le monomère (avec une double liaison) et le motif (sans double liaison, avec deux liaisons libres) ;", "oublier l’indice n dans l’équation."])}`,
      },
      {
        title: "Propriétés et recyclage des plastiques",
        minutes: 30,
        body: `${objectifs([
            "distinguer thermoplastiques et thermodurcissables ;",
            "reconnaître une matière plastique par des tests simples ;",
            "connaître les problèmes posés par les déchets plastiques.",
          ])}
          ${tableau([
            ["Famille", "Comportement à la chaleur", "Exemples"],
            ["<strong>thermoplastiques</strong>", "ils ramollissent quand on les chauffe et durcissent en refroidissant : on peut les remouler (recyclage)", "PE, PP, PVC, PS"],
            ["<strong>thermodurcissables</strong>", "ils durcissent définitivement ; chauffés fortement, ils se décomposent sans fondre", "bakélite (prises électriques), résines"],
          ])}
          <h2>Tests de reconnaissance</h2>
          ${tableau([
            ["Test", "Ce qu’il révèle"],
            ["chauffage", "thermoplastique (ramollit) ou thermodurcissable"],
            ["densité (dans l’eau)", "PE et PP flottent ; PVC et PS coulent"],
            ["test de Beilstein (fil de cuivre chauffé, puis mis en contact avec le plastique, remis dans la flamme)", "flamme <strong>verte</strong> : le plastique contient du chlore (PVC)"],
            ["papier pH au-dessus des fumées", "fumées acides (chlorure d’hydrogène) pour le PVC"],
            ["solvant (acétone)", "certains plastiques (PS) s’y dissolvent"],
            ["combustion", "odeur, couleur de la flamme, fumées"],
          ])}
          <h2>Les déchets plastiques</h2>
          ${retenir("Les plastiques sont légers, isolants, imperméables et bon marché, mais ils mettent des siècles à se dégrader. Les sachets abandonnés tuent le bétail et les animaux marins, bouchent les canalisations et favorisent les inondations. Le Sénégal a interdit les sachets plastiques fins : il faut <strong>réduire, réutiliser, recycler</strong>.")}
          <p>Brûler les plastiques à l’air libre est dangereux : la combustion du PVC dégage du chlorure d’hydrogène et des dioxines, très toxiques.</p>
          ${exercice(
            "Un morceau de plastique coule dans l’eau, ramollit quand on le chauffe et donne une flamme verte au test de Beilstein. De quel plastique s’agit-il ? Pourquoi ne faut-il pas le brûler ?",
            [
              "Il ramollit : c’est un thermoplastique ; il coule : PVC ou PS ; la flamme verte révèle la présence de chlore.",
              "C’est le <strong>PVC</strong> (polychlorure de vinyle).",
              "Sa combustion dégage du chlorure d’hydrogène (gaz acide et corrosif) et des dioxines toxiques.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Les textiles",
    summary: "Fibres naturelles, artificielles et synthétiques ; procédés de fabrication ; polyamides et polyesters.",
    lessons: [
      {
        title: "Fibres naturelles, artificielles et synthétiques",
        minutes: 35,
        body: `${objectifs([
            "distinguer textiles naturels, artificiels et synthétiques ;",
            "décrire le procédé de fabrication des textiles artificiels ;",
            "écrire l’équation-bilan de la synthèse du nylon 6-6 et donner le motif de quelques polymères textiles.",
          ])}
          ${tableau([
            ["Type", "Origine", "Exemples"],
            ["naturels végétaux", "plantes", "coton (cultivé au Sénégal oriental et en Casamance, égrené par la SODEFITEX), lin, sisal"],
            ["naturels animaux", "animaux", "laine, soie"],
            ["<strong>artificiels</strong>", "polymère naturel (cellulose du bois ou du coton) transformé chimiquement", "<strong>rayonne</strong> (fils continus), <strong>fibranne</strong> (fibres courtes), viscose"],
            ["<strong>synthétiques</strong>", "molécules fabriquées à partir du pétrole", "polyamides (nylon), polyesters (tergal), acryliques, chlorofibres (PVC)"],
          ])}
          <h2>1. Fabrication des textiles artificiels</h2>
          ${methode([
            "Dissoudre la cellulose (ou un de ses dérivés) dans un solvant pour obtenir une solution visqueuse.",
            "Faire passer cette solution dans des <strong>filières</strong>, plaques percées de trous calibrés.",
            "À la sortie, évaporer ou détruire chimiquement le solvant : la cellulose se reforme sous forme de fils.",
          ], "Trois étapes")}
          <h2>2. Fabrication des textiles synthétiques</h2>
          <p>On utilise soit la <strong>polyaddition</strong> (acryliques, chlorofibres : comme pour les plastiques), soit la <strong>polycondensation</strong> : deux monomères portant chacun deux groupes fonctionnels réagissent en éliminant à chaque liaison une petite molécule (eau, chlorure d’hydrogène).</p>
          ${formula("n HOOC−(CH₂)₄−COOH + n H₂N−(CH₂)₆−NH₂ → −[CO−(CH₂)₄−CO−NH−(CH₂)₆−NH]<sub>n</sub>− + 2n H₂O")}
          <p>C’est la synthèse du <strong>nylon 6-6</strong> (un polyamide) à partir de l’acide hexanedioïque et de l’hexane-1,6-diamine (6 atomes de carbone chacun) ; la liaison formée −CO−NH− est une liaison <strong>amide</strong>. Un diacide et un dialcool donnent de même un <strong>polyester</strong> (liaison ester −CO−O−).</p>
          <h2>3. Propriétés et utilisations</h2>
          ${tableau([
            ["Fibre", "Propriétés", "Utilisations"],
            ["polyamides (nylon)", "très résistants, élastiques, légers", "bas, cordes, filets de pêche, parachutes"],
            ["polyesters (tergal)", "infroissables, sèchent vite", "vêtements, souvent mélangés au coton"],
            ["acryliques", "doux et chauds", "pulls, couvertures"],
            ["chlorofibres", "ininflammables, imputrescibles", "vêtements de travail, filtres"],
          ])}
          ${retenir("Les fibres synthétiques sont résistantes et bon marché ; les fibres naturelles absorbent mieux la transpiration et sont plus agréables par temps chaud.")}
          ${exercice(
            "Le motif d’un nylon 6-6 a pour masse molaire 226 g/mol. Combien de motifs contient une chaîne de masse molaire 22 600 g/mol ? Quelle molécule est éliminée lors de sa formation ?",
            ["n = 22 600 ÷ 226 = <strong>100 motifs</strong>.", "À chaque liaison amide formée, une molécule d’<strong>eau</strong> est éliminée : c’est une polycondensation."],
          )}`,
      },
    ],
  },
  {
    title: "Les savons",
    summary: "Acides gras, glycérol, estérification, corps gras, saponification, savons durs et mous, action d’un savon.",
    lessons: [
      {
        title: "Fabrication des savons",
        minutes: 35,
        body: `${objectifs([
            "écrire les formules du glycérol et de quelques acides gras ;",
            "écrire l’équation de l’estérification et en donner les caractéristiques ;",
            "écrire l’équation de la saponification, en donner les caractéristiques, distinguer savons durs et mous.",
          ])}
          <h2>1. Alcools, acides et esters</h2>
          ${liste([
            "un <strong>alcool</strong> possède le groupe −OH ; le <strong>glycérol</strong> (propane-1,2,3-triol) en possède trois : CH₂OH−CHOH−CH₂OH ;",
            "un <strong>acide carboxylique</strong> possède le groupe −COOH ; les <strong>acides gras</strong> ont une longue chaîne carbonée : acide palmitique C₁₅H₃₁−COOH, acide stéarique C₁₇H₃₅−COOH, acide oléique C₁₇H₃₃−COOH (une double liaison).",
          ])}
          <h2>2. L’estérification</h2>
          ${formula("acide + alcool ⇌ ester + eau")}
          <p>Elle est <strong>lente</strong>, <strong>limitée</strong> (réversible : l’ester est hydrolysé par l’eau) et <strong>athermique</strong>. Le glycérol et trois molécules d’acide gras forment un triester, le <strong>triglycéride</strong> : les huiles (arachide, palme) et les graisses (beurre de karité) sont des mélanges de triglycérides.</p>
          <h2>3. La saponification</h2>
          ${formula("triglycéride + 3 (Na⁺ + OH⁻) → glycérol + 3 (R−COO⁻ + Na⁺)")}
          ${liste([
            "elle se fait à chaud ; elle est <strong>lente</strong> mais <strong>totale</strong> ;",
            "avec la <strong>soude</strong> (NaOH), on obtient des savons <strong>durs</strong> (savon de Marseille, savon en barre) ; avec la <strong>potasse</strong> (KOH), des savons <strong>mous</strong> ou liquides ;",
            "on ajoute ensuite de l’eau salée : le savon, peu soluble dans l’eau salée, se sépare (<strong>relargage</strong>) ; le glycérol reste dans l’eau ;",
            "méthode traditionnelle : on chauffe l’huile d’arachide ou de palme avec le « <strong>khémé</strong> », solution basique tirée des cendres de végétaux.",
          ])}
          ${exercice(
            "Écris l’équation de la saponification de la tristéarine (triester du glycérol et de l’acide stéarique C₁₇H₃₅COOH) par la soude et nomme les produits.",
            [
              "La tristéarine s’écrit (C₁₇H₃₅COO)₃C₃H₅.",
              "(C₁₇H₃₅COO)₃C₃H₅ + 3 (Na⁺ + OH⁻) → C₃H₅(OH)₃ + 3 (C₁₇H₃₅COO⁻ + Na⁺).",
              "Produits : le <strong>glycérol</strong> et le <strong>stéarate de sodium</strong>, qui est le savon (savon dur).",
            ],
          )}
          ${erreurs(["dire que la saponification est limitée : c’est l’estérification qui l’est ;", "oublier le coefficient 3 devant la soude et le savon."])}`,
      },
      {
        title: "Comment un savon lave",
        minutes: 25,
        body: `${objectifs([
            "décrire la structure amphiphile de l’ion carboxylate ;",
            "expliquer l’action détergente d’un savon ;",
            "expliquer pourquoi un savon mousse mal en eau dure ou acide.",
          ])}
          <p>L’ion carboxylate R−COO⁻ d’un savon a deux parties :</p>
          ${liste([
            "une <strong>tête hydrophile</strong> (−COO⁻), attirée par l’eau ;",
            "une <strong>queue hydrophobe</strong> et lipophile (la longue chaîne carbonée R), attirée par les graisses.",
          ])}
          <p>On dit que l’ion est <strong>amphiphile</strong>. Dans l’eau, les ions se regroupent en <strong>micelles</strong> : les queues vers l’intérieur, les têtes vers l’eau.</p>
          ${methode([
            "Le savon abaisse la tension superficielle de l’eau : l’eau <strong>mouille</strong> mieux le tissu.",
            "Les queues hydrophobes s’enfoncent dans la tache de graisse ; les têtes restent dans l’eau.",
            "Avec le frottement, la graisse est découpée en fines gouttelettes entourées d’ions savon, qui restent dispersées dans l’eau (<strong>émulsion</strong>).",
            "Le rinçage emporte ces gouttelettes.",
          ], "Les étapes du lavage")}
          ${liste([
            "dans une <strong>eau dure</strong> (riche en ions calcium Ca²⁺ et magnésium Mg²⁺, comme l’eau de certains forages), les ions carboxylate forment un dépôt insoluble : le savon mousse mal et on en consomme plus ;",
            "en milieu <strong>acide</strong>, l’ion carboxylate redevient acide gras insoluble : le savon n’agit plus ;",
            "les détergents de synthèse (lessives) restent efficaces en eau dure.",
          ])}
          ${retenir("Un savon lave parce que ses ions sont amphiphiles : la partie lipophile capte la graisse, la partie hydrophile l’entraîne dans l’eau.")}
          ${auBac("La partie 3 de l’épreuve peut demander de compléter un schéma : dessine l’ion savon comme une « allumette » (tête ronde hydrophile, queue hydrophobe) et une micelle autour d’une goutte de graisse.")}`,
      },
    ],
  },
  {
    title: "Lessives, antiseptiques et désinfectants",
    summary: "Détergents de synthèse, composition et effets des lessives, antiseptiques et désinfectants (exposé).",
    lessons: [
      {
        title: "Lessives, antiseptiques et désinfectants",
        minutes: 25,
        body: `${objectifs([
            "décrire la composition d’une lessive et le rôle de ses constituants ;",
            "distinguer antiseptique et désinfectant et citer des exemples ;",
            "connaître les précautions d’emploi et les effets sur l’environnement.",
          ])}
          <p>Ce chapitre est traité sous forme d’<strong>exposé</strong> : il ne donne pas lieu à des exercices au Bac et aucune formule chimique n’est exigée.</p>
          <h2>1. Les lessives</h2>
          <p>Les <strong>détergents de synthèse</strong>, fabriqués à partir du pétrole, ont la même structure amphiphile que les savons, mais restent efficaces en eau dure et en milieu acide. Une lessive contient :</p>
          ${tableau([
            ["Constituant", "Rôle"],
            ["tensioactifs (détergents)", "décollent et dispersent les salissures grasses"],
            ["adoucisseurs (agents anticalcaires)", "neutralisent les ions de l’eau dure"],
            ["agents de blanchiment", "détruisent les taches colorées"],
            ["enzymes", "dégradent les taches d’origine biologique (sang, œuf) à basse température"],
            ["azurants optiques, parfums", "donnent un aspect « plus blanc » et une odeur agréable"],
          ])}
          <h2>2. Antiseptiques et désinfectants</h2>
          ${tableau([
            ["Produit", "Définition", "Exemples"],
            ["<strong>antiseptique</strong>", "détruit les microbes sur les <strong>tissus vivants</strong> (peau, plaies)", "alcool à 70°, eau oxygénée, solutions iodées, Dakin, chlorhexidine"],
            ["<strong>désinfectant</strong>", "détruit les microbes sur les <strong>objets inertes</strong> (sols, toilettes, matériel, eau)", "eau de Javel, crésyl, ammoniums quaternaires"],
          ])}
          ${retenir("L’eau de Javel ne doit <strong>jamais</strong> être mélangée à un acide (détartrant, vinaigre) ni à l’ammoniaque : il se dégage des gaz très toxiques (dichlore). On la stocke à l’abri de la lumière et de la chaleur, hors de portée des enfants.")}
          <h2>3. Effets sur l’environnement</h2>
          ${liste([
            "les <strong>phosphates</strong> des lessives enrichissent les eaux et provoquent la prolifération d’algues qui asphyxient les cours d’eau (eutrophisation) : on préfère les lessives sans phosphates ;",
            "certains détergents se dégradent mal et forment des mousses dans les rivières ;",
            "l’usage excessif de désinfectants favorise des microbes résistants et tue les bactéries utiles (fosses septiques).",
          ])}`,
      },
    ],
  },
  {
    title: "Pollution de l’air et de l’eau",
    summary: "Principaux polluants de l’air, effet de serre, couche d’ozone et CFC, pollution et protection de l’eau (exposé).",
    lessons: [
      {
        title: "La pollution de l’air",
        minutes: 30,
        body: `${objectifs([
            "citer les principaux polluants de l’air, leur origine et leurs effets ;",
            "expliquer l’effet de serre et la destruction de la couche d’ozone par les CFC ;",
            "proposer des moyens de protection.",
          ])}
          <p>Chapitre traité en <strong>exposé</strong> (pas d’exercice au Bac).</p>
          ${tableau([
            ["Polluant", "Origine", "Effets"],
            ["monoxyde de carbone CO", "combustions incomplètes (moteurs, fourneaux à charbon de bois en lieu clos)", "très toxique : il empêche le sang de transporter l’oxygène ; mortel en lieu clos"],
            ["dioxyde de soufre SO₂ et oxydes d’azote", "industries, centrales thermiques, véhicules", "<strong>pluies acides</strong>, maladies respiratoires"],
            ["particules fines et poussières", "trafic, brûlage des ordures, poussières du Sahara (brume sèche)", "asthme, bronchites, maladies cardiaques"],
            ["dioxyde de carbone CO₂, méthane", "combustion du pétrole, du charbon, du gaz ; déforestation ; élevage", "renforcement de l’<strong>effet de serre</strong>"],
            ["chlorofluorocarbones (CFC ou fréons)", "anciens réfrigérateurs, climatiseurs, aérosols", "destruction de la <strong>couche d’ozone</strong>"],
          ])}
          <h2>L’effet de serre</h2>
          <p>Certains gaz de l’atmosphère retiennent une partie de la chaleur émise par la Terre : sans eux, il ferait −18 °C en moyenne. Mais leur augmentation par les activités humaines <strong>réchauffe</strong> la planète : sécheresses, avancée du désert, montée du niveau de la mer qui menace les côtes sénégalaises (Saint-Louis, Rufisque, Saly).</p>
          <h2>La couche d’ozone</h2>
          <p>L’<strong>ozone</strong> (O₃) de la haute atmosphère (stratosphère) arrête la plus grande partie des rayons ultraviolets dangereux du Soleil. Les CFC, très stables, montent jusqu’à cette couche et la détruisent (« trou » au-dessus de l’Antarctique) : plus de cancers de la peau et de maladies des yeux. Le protocole de Montréal (1987) a interdit les CFC ; la couche se reconstitue lentement.</p>
          ${retenir("Protéger l’air : économiser l’énergie, préférer les énergies renouvelables et les transports collectifs, entretenir les moteurs, ne pas brûler les ordures, planter des arbres, aérer les pièces où l’on cuisine au charbon.")}`,
      },
      {
        title: "La pollution de l’eau",
        minutes: 25,
        body: `${objectifs([
            "citer les principaux polluants de l’eau et leurs effets ;",
            "décrire les étapes du traitement de l’eau potable ;",
            "proposer des moyens de protéger l’eau.",
          ])}
          <p>Chapitre traité en <strong>exposé</strong> (pas d’exercice au Bac).</p>
          ${tableau([
            ["Polluant", "Origine", "Effets"],
            ["matières organiques et microbes", "eaux usées, ordures, latrines proches des puits", "maladies hydriques (choléra, diarrhées, fièvre typhoïde) ; l’eau perd son oxygène"],
            ["nitrates et phosphates", "engrais, lessives", "prolifération d’algues (<strong>eutrophisation</strong>) : les poissons meurent"],
            ["pesticides", "agriculture (zone des Niayes, vallée du fleuve)", "intoxication des êtres vivants"],
            ["métaux lourds (mercure, plomb)", "orpaillage (Kédougou), batteries recyclées artisanalement", "s’accumulent dans les poissons et dans l’organisme : maladies graves"],
            ["hydrocarbures", "dégazages, fuites, marées noires", "mort des oiseaux et des poissons, plages souillées"],
            ["plastiques", "déchets jetés", "étouffent les animaux marins ; microplastiques"],
          ])}
          <h2>Le traitement de l’eau potable</h2>
          ${methode([
            "dégrillage et tamisage (gros déchets) ;",
            "décantation, parfois avec un floculant (les particules tombent au fond) ;",
            "filtration sur sable ;",
            "désinfection (chlore, ozone ou ultraviolets) avant la distribution.",
          ], "Étapes")}
          <p>Les eaux usées doivent aussi être traitées en <strong>station d’épuration</strong> avant d’être rejetées. À la maison, on peut désinfecter l’eau douteuse par ébullition ou avec quelques gouttes d’eau de Javel.</p>
          ${retenir("Protéger l’eau : traiter les eaux usées, éloigner les latrines des puits, limiter engrais et pesticides, ne jeter ni déchets ni plastiques dans les canaux, le fleuve ou la mer.")}`,
      },
    ],
  },
];
