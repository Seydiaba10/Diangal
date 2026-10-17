// SVT de 2nde (séries L et S) : chapitres du relevé DIANGAL (titres des cours de 2nde de Sunudaara :
// écosystème, eau, sols ; à confirmer avec le programme officiel, non trouvé en ligne). Leçons rédigées
// par DIANGAL, à faire valider par un professeur de SVT.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "../tle/blocks";

export const SVT_2NDE: ChapterSpec[] = [
  {
    title: "L’écosystème : structure et fonctionnement",
    summary: "Biotope et biocénose, facteurs du milieu, chaînes alimentaires, flux d’énergie et cycle de la matière.",
    lessons: [
      {
        title: "Structure d’un écosystème",
        minutes: 15,
        body: `${liste([
            "un écosystème = un <strong>biotope</strong> (milieu physique : sol, eau, climat) + une <strong>biocénose</strong> (ensemble des êtres vivants) ;",
            "facteurs abiotiques : lumière, température, eau, sol ; facteurs biotiques : relations entre êtres vivants (prédation, compétition, symbiose, parasitisme) ;",
            "exemples au Sénégal : mangrove du Saloum, savane du Niokolo-Koba, Niayes.",
          ])}`,
      },
      {
        title: "Chaînes alimentaires et flux d’énergie",
        minutes: 15,
        body: `${tableau([
            ["Niveau", "Rôle", "Exemple"],
            ["producteurs", "fabriquent la matière organique par photosynthèse", "herbe, plancton végétal"],
            ["consommateurs primaires", "herbivores", "gazelle, criquet"],
            ["consommateurs secondaires", "carnivores", "lion, oiseau insectivore"],
            ["décomposeurs", "recyclent la matière organique en matière minérale", "bactéries, champignons"],
          ])}
          ${retenir("L’énergie traverse l’écosystème en se perdant à chaque niveau ; la matière, elle, est recyclée.")}`,
      },
    ],
  },
  {
    title: "L’évolution des écosystèmes et l’action de l’homme",
    summary: "Successions écologiques, dégradation, désertification, protection et gestion durable.",
    lessons: [
      {
        title: "Écosystèmes menacés, écosystèmes protégés",
        minutes: 15,
        body: `${liste([
            "un écosystème évolue naturellement (colonisation d’un sol nu, puis végétation de plus en plus dense) ;",
            "l’homme le dégrade : déboisement, feux de brousse, surpâturage, surpêche, pollution ;",
            "conséquences : érosion, désertification, perte de biodiversité ;",
            "réponses : parcs et réserves, reboisement (Grande Muraille verte), repos biologique en mer, gestion communautaire.",
          ])}
          ${retenir("Gérer durablement, c’est satisfaire nos besoins sans compromettre ceux des générations futures.")}`,
      },
    ],
  },
  {
    title: "L’eau",
    summary: "Le cycle de l’eau, les ressources en eau du Sénégal, la pollution et le traitement de l’eau.",
    lessons: [
      {
        title: "Le cycle et les ressources",
        minutes: 15,
        body: `${liste([
            "cycle : évaporation, condensation (nuages), précipitations, ruissellement, infiltration vers les nappes ;",
            "au Sénégal : eaux de surface (fleuves Sénégal et Gambie, lac de Guiers) et eaux souterraines (nappes) ;",
            "le lac de Guiers alimente en partie Dakar en eau potable.",
          ])}`,
      },
      {
        title: "Pollution et potabilisation",
        minutes: 12,
        body: `${liste([
            "pollutions : eaux usées, engrais et pesticides, déchets plastiques, salinisation des nappes près de la côte ;",
            "maladies liées à l’eau : choléra, diarrhées, bilharziose ;",
            "potabilisation : décantation, filtration, désinfection (chlore) ;",
            "à la maison : conserver l’eau dans un récipient propre et fermé.",
          ])}
          ${exemple(["Quelques gouttes d’eau de Javel bien dosées désinfectent l’eau de boisson."])}`,
      },
    ],
  },
  {
    title: "Les sols",
    summary: "Formation, constituants, propriétés et fertilité ; dégradation et conservation.",
    lessons: [
      {
        title: "Le sol, un milieu vivant",
        minutes: 15,
        body: `${liste([
            "le sol se forme par altération de la roche mère et décomposition de la matière organique (humification) ;",
            "il comprend des horizons superposés ; il contient argile, limon, sable, humus, eau, air et êtres vivants ;",
            "le complexe argilo-humique retient l’eau et les ions minéraux utiles aux plantes ;",
            "dégradation : érosion, salinisation (tannes), appauvrissement ; conservation : jachère, fumure organique, haies, diguettes.",
          ])}
          ${retenir("Un sol fertile est riche en humus, bien aéré et capable de retenir l’eau.")}`,
      },
    ],
  },
];
