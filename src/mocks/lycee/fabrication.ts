// Fabrication et automatismes des séries S3 et T1 (1re et Terminale) : matériaux, procédés, usinage,
// métrologie, logique, GRAFCET, pneumatique. Chapitres INDICATIFS, établis d’après la liste des épreuves
// du Bac (S3 : analyse de fabrication, technologie et automatisme ; T1 : analyse de fabrication et
// outillage, technologie et automatisme) ; programme officiel non trouvé en ligne. Leçons rédigées par
// DIANGAL, à faire valider par un professeur de fabrication mécanique.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, tableau } from "../tle/blocks";

const FAB = "Fabrication";
const AUTO = "Automatismes";

export const TECH_1RE: ChapterSpec[] = [
  {
    title: "Les matériaux et leur désignation",
    summary: "Métaux ferreux et non ferreux, alliages, matières plastiques, désignations normalisées.",
    strand: FAB,
    lessons: [
      {
        title: "Choisir un matériau",
        minutes: 15,
        body: `${tableau([
            ["Famille", "Exemples", "Désignation"],
            ["aciers", "acier de construction, acier non allié", "S235 (limite élastique 235 MPa), C45 (0,45 % de carbone)"],
            ["fontes", "fonte grise (bâtis de machines)", "EN-GJL-250"],
            ["non ferreux", "aluminium, cuivre, laiton (cuivre + zinc), bronze (cuivre + étain)", "EN AW-2017 (alliage d’aluminium)"],
            ["plastiques", "polyamide, PVC, polyéthylène", "PA, PVC, PE"],
          ])}`,
      },
    ],
  },
  {
    title: "Les procédés d’obtention des pièces",
    summary: "Moulage, forgeage, découpage et pliage, soudage, usinage.",
    strand: FAB,
    lessons: [
      {
        title: "Fabriquer une pièce",
        minutes: 12,
        body: `${liste([
            "moulage : métal liquide coulé dans un moule (fonderie) ;",
            "forgeage et estampage : déformation à chaud ;",
            "découpage, pliage, emboutissage : mise en forme des tôles ;",
            "soudage : assemblage permanent par fusion ;",
            "usinage : enlèvement de matière (copeaux) pour obtenir des surfaces précises.",
          ])}`,
      },
    ],
  },
  {
    title: "Le tournage",
    summary: "Principe, opérations, vitesse de coupe et fréquence de rotation.",
    strand: FAB,
    lessons: [
      {
        title: "Usiner sur un tour",
        minutes: 15,
        body: `${liste([
            "la pièce tourne, l’outil se déplace : on obtient des surfaces de révolution ;",
            "opérations : chariotage (cylindre), dressage (face plane), alésage (intérieur), filetage, tronçonnage.",
          ])}
          ${formula(`N = ${frac("1 000 × Vc", "π × D")} (N en tr/min, Vc en m/min, D en mm)`)}
          ${exemple(["Pièce de 50 mm de diamètre, Vc = 100 m/min : N ≈ 637 tr/min."])}`,
      },
    ],
  },
  {
    title: "Le fraisage et le perçage",
    summary: "Principe du fraisage, opérations, perçage et taraudage, vitesse d’avance.",
    strand: FAB,
    lessons: [
      {
        title: "Fraiser et percer",
        minutes: 15,
        body: `${liste([
            "en fraisage, l’outil (fraise) tourne et la pièce se déplace : surfaçage, rainurage, contournage ;",
            "en perçage, le foret fait un trou ; le taraudage crée un filetage intérieur ;",
            "vitesse d’avance : Vf = f<sub>z</sub> × Z × N (avance par dent × nombre de dents × fréquence de rotation).",
          ])}
          ${exemple(["Fraise de 4 dents, f<sub>z</sub> = 0,1 mm, N = 500 tr/min : Vf = 200 mm/min."])}`,
      },
    ],
  },
  {
    title: "La métrologie",
    summary: "Instruments de mesure et de contrôle, lecture du pied à coulisse.",
    strand: FAB,
    lessons: [
      {
        title: "Mesurer et contrôler",
        minutes: 12,
        body: `${tableau([
            ["Instrument", "Précision courante"],
            ["réglet", "0,5 mm"],
            ["pied à coulisse au 1/50", "0,02 mm"],
            ["micromètre", "0,01 mm"],
            ["comparateur", "0,01 mm (mesure d’écarts)"],
          ])}
          ${retenir("Le calibre « entre – n’entre pas » vérifie rapidement qu’une dimension est dans sa tolérance.")}`,
      },
    ],
  },
  {
    title: "La logique combinatoire",
    summary: "Variables binaires, fonctions logiques, tables de vérité, équations.",
    strand: AUTO,
    lessons: [
      {
        title: "Les fonctions logiques",
        minutes: 15,
        body: `${tableau([
            ["a", "b", "ET (a·b)", "OU (a + b)", "NON a"],
            ["0", "0", "0", "0", "1"],
            ["0", "1", "0", "1", "1"],
            ["1", "0", "0", "1", "0"],
            ["1", "1", "1", "1", "0"],
          ])}
          ${exemple(["Une presse ne descend que si l’opérateur appuie sur deux boutons à la fois : S = a · b (sécurité à deux mains)."])}`,
      },
    ],
  },
  {
    title: "Sécurité et organisation de l’atelier",
    summary: "Équipements de protection, règles de sécurité sur machines, méthode 5S.",
    strand: FAB,
    lessons: [
      {
        title: "Travailler en sécurité",
        minutes: 12,
        body: `${liste([
            "équipements de protection individuelle : lunettes, chaussures de sécurité, protections auditives, tenue ajustée ;",
            "sur machine : carter fermé, arrêt d’urgence accessible, ne jamais retirer les copeaux à la main ;",
            "méthode 5S : trier, ranger, nettoyer, standardiser, maintenir.",
          ])}
          ${retenir("Les cheveux longs s’attachent et on ne porte ni bijou ni vêtement flottant près d’une machine qui tourne.")}`,
      },
    ],
  },
];

export const TECH_TLE: ChapterSpec[] = [
  {
    title: "Analyse de fabrication et gamme d’usinage",
    summary: "Surfaces de référence, mise en position isostatique, ordre des phases, contrat de phase.",
    strand: FAB,
    lessons: [
      {
        title: "Préparer une fabrication",
        minutes: 15,
        body: `${methode([
            "Repérer les surfaces fonctionnelles et les cotes à respecter.",
            "Choisir les surfaces de départ et la mise en position (6 points de contact au plus : isostatisme).",
            "Ordonner les phases : ébauche avant finition, surfaces de référence d’abord.",
            "Rédiger pour chaque phase un contrat de phase : machine, outils, conditions de coupe, cotes fabriquées.",
          ])}`,
      },
    ],
  },
  {
    title: "Les conditions de coupe",
    summary: "Vitesse de coupe, avance, profondeur de passe, matériaux d’outils.",
    strand: FAB,
    lessons: [
      {
        title: "Choisir les conditions de coupe",
        minutes: 12,
        body: `${liste([
            "elles dépendent du matériau usiné, du matériau de l’outil (acier rapide, carbure) et de l’opération ;",
            "un outil carbure accepte une vitesse de coupe plus élevée qu’un outil en acier rapide ;",
            "en finition, l’avance et la profondeur de passe sont faibles pour un bon état de surface.",
          ])}
          ${formula("Débit de copeaux Q = a × f × Vc")}`,
      },
    ],
  },
  {
    title: "Le GRAFCET",
    summary: "Étapes, transitions, réceptivités, actions et règles d’évolution.",
    strand: AUTO,
    lessons: [
      {
        title: "Décrire un automatisme",
        minutes: 15,
        body: `${liste([
            "le GRAFCET décrit le fonctionnement d’un système automatisé par des <strong>étapes</strong> (carrés) reliées par des <strong>transitions</strong> ;",
            "une étape active déclenche des <strong>actions</strong> ; une transition est franchie quand l’étape précédente est active et que la <strong>réceptivité</strong> est vraie ;",
            "l’étape initiale (double carré) est active au démarrage.",
          ])}
          ${exemple(["Perceuse automatique : étape 0 (attente), bouton départ → étape 1 (descente du foret), capteur bas → étape 2 (remontée), capteur haut → retour à l’étape 0."])}`,
      },
    ],
  },
  {
    title: "La pneumatique",
    summary: "Production d’air comprimé, vérins, distributeurs, effort d’un vérin.",
    strand: AUTO,
    lessons: [
      {
        title: "Vérins et distributeurs",
        minutes: 15,
        body: `${liste([
            "l’air est comprimé par un compresseur, puis traité par un ensemble filtre-régulateur-lubrificateur ;",
            "vérin simple effet (retour par ressort) ou double effet ;",
            "les distributeurs (3/2, 5/2) dirigent l’air vers les vérins.",
          ])}
          ${formula("F = p × S")}
          ${exemple(["p = 6 bar = 0,6 MPa, piston de 50 mm de diamètre (S ≈ 1 963 mm²) : F ≈ 1 178 N."])}`,
      },
    ],
  },
  {
    title: "Capteurs, actionneurs et automates",
    summary: "Chaîne d’information et chaîne d’énergie, capteurs, automate programmable.",
    strand: AUTO,
    lessons: [
      {
        title: "La chaîne d’un système automatisé",
        minutes: 15,
        body: `${liste([
            "chaîne d’information : acquérir (capteurs), traiter (automate), communiquer ;",
            "chaîne d’énergie : alimenter, distribuer (préactionneurs), convertir (actionneurs : moteurs, vérins), transmettre ;",
            "capteurs : fin de course mécanique, inductif (métaux), capacitif, photoélectrique ;",
            "l’automate programmable (API) lit ses entrées, exécute son programme et commande ses sorties en boucle.",
          ])}`,
      },
    ],
  },
  {
    title: "Qualité et maintenance",
    summary: "Contrôle qualité, maintenance préventive et corrective.",
    strand: FAB,
    lessons: [
      {
        title: "Produire bien et durablement",
        minutes: 12,
        body: `${liste([
            "le contrôle qualité vérifie que les pièces respectent les spécifications ; une pièce hors tolérance est non conforme ;",
            "maintenance corrective : réparer après une panne ; préventive : intervenir avant (graissage, remplacement planifié) ;",
            "un carnet de maintenance trace les interventions.",
          ])}`,
      },
    ],
  },
];
