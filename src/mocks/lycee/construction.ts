// Construction mécanique des séries S3 et T1 (1re et Terminale) : dessin technique, liaisons, statique,
// transmission de puissance, résistance des matériaux. Chapitres INDICATIFS, établis d’après la liste des
// épreuves du Bac (S3 : construction mécanique ; T1 : construction mécanique et mécanique) ; programme
// officiel non trouvé en ligne. Leçons rédigées par DIANGAL, à faire valider par un professeur de
// construction mécanique.

import { type ChapterSpec, exemple, formula, frac, liste, retenir, tableau } from "../tle/blocks";

const DESSIN = "Dessin technique";
const MECA = "Mécanique";
const CONCEPTION = "Conception";

export const CONST_1RE: ChapterSpec[] = [
  {
    title: "Le dessin technique : projections et vues",
    summary: "Projection orthogonale, disposition européenne des vues, types de traits, échelles.",
    strand: DESSIN,
    lessons: [
      {
        title: "Représenter une pièce",
        minutes: 15,
        body: `${liste([
            "on représente une pièce par plusieurs <strong>vues</strong> obtenues par projection orthogonale ;",
            "disposition européenne : la vue de dessus se place sous la vue de face, la vue de gauche à droite de la vue de face ;",
            "traits : continu fort (arêtes vues), interrompu court (arêtes cachées), mixte fin (axes et plans de symétrie) ;",
            "l’échelle compare le dessin à la pièce réelle : 1:1 (grandeur nature), 1:2 (réduction), 2:1 (agrandissement).",
          ])}`,
      },
    ],
  },
  {
    title: "Coupes et sections",
    summary: "Plan de coupe, hachures, demi-coupe, sections.",
    strand: DESSIN,
    lessons: [
      {
        title: "Voir l’intérieur d’une pièce",
        minutes: 12,
        body: `${liste([
            "une <strong>coupe</strong> montre l’intérieur d’une pièce, comme si on l’avait sciée selon un plan ;",
            "les parties coupées sont hachurées (traits fins inclinés à 45°) ;",
            "la demi-coupe montre à la fois l’extérieur et l’intérieur d’une pièce symétrique ;",
            "une <strong>section</strong> ne représente que la partie située dans le plan de coupe.",
          ])}`,
      },
    ],
  },
  {
    title: "Cotation et tolérances",
    summary: "Cotes, tolérances dimensionnelles, ajustements, état de surface.",
    strand: DESSIN,
    lessons: [
      {
        title: "Coter une pièce",
        minutes: 15,
        body: `${liste([
            "une cote indique une dimension en millimètres ; chaque dimension n’est cotée qu’une fois ;",
            "une pièce ne peut pas être fabriquée exactement à la cote : on fixe une <strong>tolérance</strong> (ex. 20 ± 0,1) ;",
            "un ajustement associe un alésage et un arbre (ex. ⌀ 20 H7/g6) : avec jeu, incertain ou serré ;",
            "l’état de surface (rugosité Ra) précise la finition attendue.",
          ])}
          ${exemple(["Cote 20 ± 0,1 : la pièce est bonne si elle mesure entre 19,9 et 20,1 mm (intervalle de tolérance 0,2 mm)."])}`,
      },
    ],
  },
  {
    title: "Les liaisons mécaniques",
    summary: "Degrés de liberté, liaisons usuelles, schéma cinématique.",
    strand: MECA,
    lessons: [
      {
        title: "Liaisons et degrés de liberté",
        minutes: 15,
        body: `${tableau([
            ["Liaison", "Mouvements possibles"],
            ["encastrement", "aucun"],
            ["pivot", "1 rotation"],
            ["glissière", "1 translation"],
            ["pivot glissant", "1 rotation + 1 translation de même axe"],
            ["hélicoïdale", "rotation et translation liées (vis-écrou)"],
            ["rotule", "3 rotations"],
            ["appui plan", "2 translations + 1 rotation"],
          ])}
          ${retenir("Un solide libre dans l’espace a 6 degrés de liberté : 3 translations et 3 rotations.")}`,
      },
    ],
  },
  {
    title: "Les assemblages",
    summary: "Assemblages démontables et permanents, éléments filetés.",
    strand: CONCEPTION,
    lessons: [
      {
        title: "Assembler des pièces",
        minutes: 12,
        body: `${liste([
            "démontables : vis, boulons (vis + écrou), goujons, goupilles, clavettes, anneaux élastiques ;",
            "permanents : soudure, rivetage, collage, frettage ;",
            "désignation d’un filetage : M10 × 1,5 (diamètre nominal 10 mm, pas 1,5 mm) ;",
            "freinage des écrous : rondelle, contre-écrou, écrou autofreiné.",
          ])}`,
      },
    ],
  },
  {
    title: "La statique du solide",
    summary: "Actions mécaniques, moments, principe fondamental de la statique, frottement.",
    strand: MECA,
    lessons: [
      {
        title: "L’équilibre d’un solide",
        minutes: 15,
        body: `${liste([
            "une action mécanique se modélise par une force (point d’application, direction, sens, intensité en N) ;",
            "moment d’une force par rapport à un point : M = F × d (N·m) ;",
            "principe fondamental de la statique : à l’équilibre, la somme des forces est nulle et la somme des moments est nulle ;",
            "frottement (loi de Coulomb) : à la limite du glissement, T = f × N.",
          ])}
          ${exemple(["Une clé de 0,25 m sur laquelle on exerce 80 N perpendiculairement produit un moment de 20 N·m."])}`,
      },
    ],
  },
  {
    title: "Le guidage en rotation",
    summary: "Paliers lisses, roulements, montage et lubrification.",
    strand: CONCEPTION,
    lessons: [
      {
        title: "Guider un arbre",
        minutes: 12,
        body: `${liste([
            "palier lisse : coussinet en bronze ou en matière plastique, simple et peu coûteux ;",
            "roulements à billes ou à rouleaux : moins de frottement, vitesses plus élevées ;",
            "un montage de roulements arrête l’arbre en translation par des épaulements, des anneaux élastiques ou des écrous ;",
            "la lubrification (graisse, huile) réduit l’usure et l’échauffement.",
          ])}`,
      },
    ],
  },
];

export const CONST_TLE: ChapterSpec[] = [
  {
    title: "Transmettre la puissance par engrenages",
    summary: "Engrenages, module, diamètre primitif, entraxe, rapport de transmission.",
    strand: MECA,
    lessons: [
      {
        title: "Les engrenages droits",
        minutes: 15,
        body: `${formula(`d = m × Z ; a = ${frac("m (Z₁ + Z₂)", "2")} ; r = ${frac("N₂", "N₁")} = ${frac("Z₁", "Z₂")}`)}
          ${liste(["m est le module (mm), Z le nombre de dents, d le diamètre primitif, a l’entraxe ;", "deux roues qui engrènent ont le même module ; la plus petite s’appelle le pignon."])}
          ${exemple(["m = 2 mm, Z₁ = 20, Z₂ = 40 : d₁ = 40 mm, d₂ = 80 mm, a = 60 mm, r = 0,5 (la vitesse est divisée par 2)."])}`,
      },
    ],
  },
  {
    title: "Poulies, courroies et chaînes",
    summary: "Transmission par lien flexible, rapport de transmission.",
    strand: MECA,
    lessons: [
      {
        title: "Les transmissions par lien",
        minutes: 12,
        body: `${formula(`N₁ × d₁ = N₂ × d₂ ; r = ${frac("N₂", "N₁")} = ${frac("d₁", "d₂")}`)}
          ${liste(["courroies plates, trapézoïdales ou crantées ; chaînes et pignons (vélo, moto) ;", "elles transmettent un mouvement entre arbres éloignés."])}
          ${exemple(["Poulie motrice de 100 mm à 1 500 tr/min, poulie réceptrice de 300 mm : N₂ = 500 tr/min."])}`,
      },
    ],
  },
  {
    title: "Cinématique : mouvements et vitesses",
    summary: "Translation, rotation, vitesse angulaire et vitesse linéaire.",
    strand: MECA,
    lessons: [
      {
        title: "Vitesse de rotation",
        minutes: 12,
        body: `${formula(`ω = ${frac("2π N", "60")} (N en tr/min, ω en rad/s) ; v = ω × R`)}
          ${exemple(["Un moteur à 1 500 tr/min : ω ≈ 157 rad/s ; un point situé à 0,1 m de l’axe va à environ 15,7 m/s."])}`,
      },
    ],
  },
  {
    title: "Résistance des matériaux : traction et compression",
    summary: "Contrainte normale, loi de Hooke, condition de résistance.",
    strand: MECA,
    lessons: [
      {
        title: "Contrainte et déformation",
        minutes: 15,
        body: `${formula(`σ = ${frac("F", "S")} ; σ = E × ε ; condition de résistance : σ ≤ ${frac("Re", "s")}`)}
          ${liste(["σ en MPa (N/mm²), S la section en mm², E le module d’Young, ε l’allongement relatif ;", "Re est la limite élastique du matériau, s le coefficient de sécurité."])}
          ${exemple(["F = 10 000 N sur une section de 100 mm² : σ = 100 MPa. Avec Re = 235 MPa et s = 2, la limite admissible est 117,5 MPa : la pièce résiste."])}`,
      },
    ],
  },
  {
    title: "Résistance des matériaux : cisaillement, torsion, flexion",
    summary: "Contrainte tangentielle, torsion d’un arbre, flexion d’une poutre.",
    strand: MECA,
    lessons: [
      {
        title: "Autres sollicitations",
        minutes: 15,
        body: `${liste([
            "cisaillement : τ = T ÷ S (goupilles, rivets) ;",
            "torsion : un arbre qui transmet un couple se tord ; la contrainte est maximale à la surface ;",
            "flexion : une poutre chargée fléchit ; les fibres d’un côté sont tendues, de l’autre comprimées ;",
            "pour chaque sollicitation, on vérifie que la contrainte reste inférieure à la contrainte admissible.",
          ])}`,
      },
    ],
  },
  {
    title: "Puissance, couple et rendement",
    summary: "Puissance mécanique, couple, rendement d’une chaîne de transmission.",
    strand: MECA,
    lessons: [
      {
        title: "Puissance et rendement",
        minutes: 12,
        body: `${formula(`P = C × ω ; η = ${frac("P utile", "P absorbée")}`)}
          ${liste(["P en watts, C (couple) en N·m, ω en rad/s ;", "le rendement global d’une chaîne de transmission est le produit des rendements de ses éléments."])}
          ${exemple(["Couple de 20 N·m à 157 rad/s : P ≈ 3 140 W. Deux étages de rendement 0,95 et 0,9 : rendement global 0,855."])}`,
      },
    ],
  },
  {
    title: "Analyse fonctionnelle et cahier des charges",
    summary: "Besoin, fonctions de service, diagramme pieuvre, FAST.",
    strand: CONCEPTION,
    lessons: [
      {
        title: "Analyser un produit",
        minutes: 12,
        body: `${liste([
            "on part du <strong>besoin</strong> : à qui le produit rend-il service ? sur quoi agit-il ? dans quel but ?",
            "fonctions de service : principales (raison d’être du produit) et contraintes (sécurité, coût, environnement) ;",
            "le diagramme pieuvre relie le produit à son environnement ; le FAST relie chaque fonction aux solutions techniques ;",
            "le cahier des charges fixe pour chaque fonction des critères et des niveaux.",
          ])}`,
      },
    ],
  },
];
