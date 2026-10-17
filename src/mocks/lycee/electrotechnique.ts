// Électrotechnique-électronique de la série T2 (1re et Terminale). Chapitres INDICATIFS, établis d’après
// la liste des épreuves du Bac de la série T2 (électrotechnique-électronique, construction
// électromécanique, analyse des systèmes électriques, schéma, automatique) ; programme officiel non
// trouvé en ligne. Leçons rédigées par DIANGAL, à faire valider par un professeur d’électrotechnique.

import { type ChapterSpec, exemple, formula, frac, liste, retenir, tableau } from "../tle/blocks";

const ELEC = "Électrotechnique";
const ELECTRONIQUE = "Électronique";
const SYSTEMES = "Systèmes et sécurité";

export const ELEC_1RE: ChapterSpec[] = [
  {
    title: "Les lois des circuits en courant continu",
    summary: "Loi d’Ohm, lois de Kirchhoff, diviseur de tension, associations de résistances.",
    strand: ELEC,
    lessons: [
      {
        title: "Analyser un circuit",
        minutes: 15,
        body: `${liste([
            "loi d’Ohm : U = R × I ;",
            "loi des nœuds : la somme des courants qui arrivent à un nœud égale la somme des courants qui en partent ;",
            "loi des mailles : la somme algébrique des tensions le long d’une maille est nulle ;",
            `diviseur de tension : U<sub>2</sub> = U × ${frac("R₂", "R₁ + R₂")}.`,
          ])}
          ${exemple(["U = 12 V, R₁ = 2 kΩ, R₂ = 1 kΩ : U<sub>2</sub> = 4 V."])}`,
      },
    ],
  },
  {
    title: "Puissance et énergie électriques",
    summary: "Puissance, énergie, effet Joule, consommation et facture.",
    strand: ELEC,
    lessons: [
      {
        title: "Puissance et énergie",
        minutes: 12,
        body: `${formula("P = U × I ; W = P × t ; effet Joule : P = R × I²")}
          ${liste(["l’énergie se compte en kilowattheures (kWh) sur le compteur ;", "1 kWh = 3,6 × 10⁶ J."])}
          ${exemple(["Un climatiseur de 1,5 kW utilisé 8 h par jour consomme 12 kWh par jour."])}`,
      },
    ],
  },
  {
    title: "Le régime sinusoïdal monophasé",
    summary: "Grandeurs sinusoïdales, valeur efficace, fréquence, déphasage, impédances.",
    strand: ELEC,
    lessons: [
      {
        title: "Tension alternative sinusoïdale",
        minutes: 15,
        body: `${formula(`u(t) = U<sub>max</sub> sin(ωt + φ) ; U = ${frac("U<sub>max</sub>", "√2")} ; ω = 2π f`)}
          ${liste([
            "au Sénégal, le réseau fournit environ 230 V efficaces (on dit souvent « 220 V ») à 50 Hz (ω ≈ 314 rad/s) ;",
            "impédances : résistance R, bobine Lω, condensateur 1 ÷ (Cω) ;",
            "dans une bobine le courant est en retard sur la tension, dans un condensateur il est en avance.",
          ])}
          ${exemple(["U = 230 V : U<sub>max</sub> ≈ 325 V."])}`,
      },
    ],
  },
  {
    title: "Puissances en alternatif et facteur de puissance",
    summary: "Puissances active, réactive et apparente, facteur de puissance, compensation.",
    strand: ELEC,
    lessons: [
      {
        title: "Le triangle des puissances",
        minutes: 15,
        body: `${formula("P = U I cos φ (W) ; Q = U I sin φ (var) ; S = U I (VA) ; S² = P² + Q²")}
          ${liste(["cos φ est le facteur de puissance ; un faible cos φ augmente le courant appelé et les pertes ;", "on le relève en installant des condensateurs en parallèle."])}
          ${exemple(["U = 230 V, I = 10 A, cos φ = 0,8 : P = 1 840 W, S = 2 300 VA."])}`,
      },
    ],
  },
  {
    title: "Magnétisme et induction",
    summary: "Champ magnétique, force de Laplace, induction électromagnétique.",
    strand: ELEC,
    lessons: [
      {
        title: "De l’électroaimant à la dynamo",
        minutes: 15,
        body: `${liste([
            "un courant crée un champ magnétique (électroaimant, bobine) ;",
            "force de Laplace : un conducteur parcouru par un courant dans un champ subit une force F = B × I × L (principe du moteur) ;",
            "induction : un flux magnétique variable crée une tension induite (principe de l’alternateur et du transformateur) ;",
            "loi de Lenz : le courant induit s’oppose à la cause qui lui a donné naissance.",
          ])}`,
      },
    ],
  },
  {
    title: "Composants électroniques de base",
    summary: "Diode, redressement, filtrage, diode Zener, LED.",
    strand: ELECTRONIQUE,
    lessons: [
      {
        title: "Redresser et filtrer",
        minutes: 15,
        body: `${liste([
            "la diode ne laisse passer le courant que dans un sens ;",
            "redressement simple alternance (une diode) ou double alternance (pont de quatre diodes) ;",
            "un condensateur de filtrage lisse la tension redressée ;",
            "une diode Zener stabilise la tension ; une LED émet de la lumière quand elle conduit.",
          ])}
          ${retenir("Une alimentation continue : transformateur → redresseur → filtrage → régulation.")}`,
      },
    ],
  },
  {
    title: "Schémas électriques et sécurité",
    summary: "Symboles, schémas, protection des personnes et des biens.",
    strand: SYSTEMES,
    lessons: [
      {
        title: "Se protéger de l’électricité",
        minutes: 12,
        body: `${tableau([
            ["Danger", "Protection"],
            ["court-circuit, surcharge", "fusible, disjoncteur"],
            ["contact avec une masse sous tension", "prise de terre + disjoncteur différentiel 30 mA"],
            ["intervention sur une installation", "consignation (couper, condamner, vérifier l’absence de tension)"],
          ])}
          ${retenir("On ne travaille jamais sous tension : on coupe et on vérifie avant d’intervenir.")}`,
      },
    ],
  },
];

export const ELEC_TLE: ChapterSpec[] = [
  {
    title: "Le système triphasé",
    summary: "Tensions simples et composées, couplages étoile et triangle, puissance.",
    strand: ELEC,
    lessons: [
      {
        title: "Le réseau triphasé",
        minutes: 15,
        body: `${formula("U = V × √3 ; P = √3 × U × I × cos φ")}
          ${liste(["réseau 230 V / 400 V : 230 V entre phase et neutre, 400 V entre deux phases ;", "couplage étoile ou triangle selon la tension que supporte chaque enroulement du récepteur."])}
          ${exemple(["U = 400 V, I = 10 A, cos φ = 0,8 : P ≈ 5 543 W."])}`,
      },
    ],
  },
  {
    title: "Le transformateur monophasé",
    summary: "Constitution, rapport de transformation, rendement.",
    strand: ELEC,
    lessons: [
      {
        title: "Transformer une tension",
        minutes: 15,
        body: `${formula(`m = ${frac("U₂", "U₁")} = ${frac("N₂", "N₁")} ; transformateur parfait : ${frac("I₂", "I₁")} = ${frac("1", "m")}`)}
          ${liste(["un circuit magnétique feuilleté porte deux enroulements (primaire et secondaire) ;", "il ne fonctionne qu’en alternatif ; ses pertes (fer et cuivre) réduisent le rendement."])}
          ${exemple(["230 V au primaire, m = 0,05 : 11,5 V au secondaire."])}`,
      },
    ],
  },
  {
    title: "La machine à courant continu",
    summary: "Force électromotrice, moteur, couple, réglage de la vitesse.",
    strand: ELEC,
    lessons: [
      {
        title: "Le moteur à courant continu",
        minutes: 15,
        body: `${formula("E = k Φ N ; U = E + R I ; P<sub>u</sub> = C<sub>u</sub> × Ω")}
          ${liste(["la vitesse est proportionnelle à la f.é.m. E, donc réglable par la tension d’induit ;", "le couple est proportionnel au courant d’induit (à flux constant)."])}`,
      },
    ],
  },
  {
    title: "Le moteur asynchrone triphasé",
    summary: "Champ tournant, vitesse de synchronisme, glissement, démarrage.",
    strand: ELEC,
    lessons: [
      {
        title: "Le moteur le plus utilisé",
        minutes: 15,
        body: `${formula(`n<sub>s</sub> = ${frac("60 f", "p")} (tr/min) ; g = ${frac("n<sub>s</sub> − n", "n<sub>s</sub>")}`)}
          ${liste(["trois enroulements alimentés en triphasé créent un champ tournant ;", "le rotor tourne un peu moins vite que le champ : c’est le glissement ;", "démarrage étoile-triangle pour limiter le courant de démarrage."])}
          ${exemple(["f = 50 Hz, p = 2 paires de pôles : n<sub>s</sub> = 1 500 tr/min ; si n = 1 440 tr/min, g = 4 %."])}`,
      },
    ],
  },
  {
    title: "Le transistor",
    summary: "Transistor bipolaire, fonctionnement en commutation et en amplification.",
    strand: ELECTRONIQUE,
    lessons: [
      {
        title: "Commuter et amplifier",
        minutes: 15,
        body: `${liste([
            "transistor bipolaire : base, collecteur, émetteur ; I<sub>C</sub> = β × I<sub>B</sub> en régime linéaire ;",
            "en commutation, il est bloqué (interrupteur ouvert) ou saturé (interrupteur fermé) : il commande un relais, une LED, un moteur ;",
            "en amplification, un petit courant de base commande un grand courant de collecteur.",
          ])}
          ${exemple(["β = 100 et I<sub>B</sub> = 0,2 mA : I<sub>C</sub> = 20 mA."])}`,
      },
    ],
  },
  {
    title: "Logique séquentielle et automatismes",
    summary: "Bascules, compteurs, GRAFCET, automates programmables.",
    strand: SYSTEMES,
    lessons: [
      {
        title: "Mémoriser et séquencer",
        minutes: 15,
        body: `${liste([
            "une bascule mémorise un état binaire (RS, D, JK) ; plusieurs bascules forment un compteur ;",
            "le GRAFCET décrit la succession des étapes d’un automatisme ;",
            "l’automate programmable commande moteurs, vérins et voyants à partir des informations des capteurs.",
          ])}`,
      },
    ],
  },
  {
    title: "Électronique de puissance et énergie solaire",
    summary: "Redresseurs, hacheurs, onduleurs ; installation photovoltaïque.",
    strand: ELECTRONIQUE,
    lessons: [
      {
        title: "Convertir l’énergie électrique",
        minutes: 15,
        body: `${tableau([
            ["Convertisseur", "Conversion", "Exemple"],
            ["redresseur", "alternatif → continu", "chargeur de batterie"],
            ["hacheur", "continu → continu réglable", "variateur de vitesse d’un moteur à courant continu"],
            ["onduleur", "continu → alternatif", "installation solaire, alimentation de secours"],
          ])}
          ${retenir("Une installation solaire comprend des panneaux photovoltaïques, un régulateur, des batteries et un onduleur.")}`,
      },
    ],
  },
];
