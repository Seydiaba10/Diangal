// SVT de 5e : chapitres du relevé DIANGAL (docs/programme/releve-ci-3e.md, titres de Sunudaara, à
// confirmer) : alimentation des animaux et de l’homme, cadre de vie, sols, roches sédimentaires. Leçons
// rédigées par DIANGAL, à faire valider par un professeur de SVT.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

export const SVT_5E: ChapterSpec[] = [
  {
    title: "L’alimentation chez les animaux",
    summary: "Régimes alimentaires et adaptations de l’appareil digestif et des dents.",
    lessons: [
      {
        title: "Régimes alimentaires et dentition",
        minutes: 12,
        body: `${tableau([
            ["Régime", "Exemple", "Dentition"],
            ["herbivore", "mouton, vache", "incisives coupantes, molaires larges pour broyer, pas de canines (ruminants)"],
            ["carnivore", "chien, lion", "canines pointues pour déchirer, molaires tranchantes"],
            ["omnivore", "homme, porc", "dents variées"],
          ])}
          ${liste(["Les ruminants (vache, mouton) ont un estomac à quatre poches et ruminent.", "Les oiseaux n’ont pas de dents : le gésier broie les graines."])}
          ${retenir("La forme des dents et de l’appareil digestif est adaptée au régime alimentaire.")}`,
      },
    ],
  },
  {
    title: "Les besoins de l’organisme et la mauvaise alimentation",
    summary: "Les aliments et leurs rôles, la ration alimentaire, les maladies liées à l’alimentation.",
    lessons: [
      {
        title: "Les besoins de l’organisme",
        minutes: 12,
        body: `${tableau([
            ["Groupe d’aliments", "Rôle", "Exemples"],
            ["glucides et lipides", "énergie", "mil, riz, sucre, huile"],
            ["protides (protéines)", "construction, croissance", "poisson, viande, œufs, niébé, lait"],
            ["vitamines et sels minéraux", "protection, bon fonctionnement", "fruits, légumes, feuilles"],
            ["eau", "indispensable à la vie", "boissons, aliments"],
          ])}
          ${retenir("La ration alimentaire doit être suffisante (quantité) et équilibrée (qualité) ; elle dépend de l’âge, du sexe et de l’activité.")}`,
      },
      {
        title: "Les maladies dues à une mauvaise alimentation",
        minutes: 12,
        body: `${liste([
            "carences : kwashiorkor (manque de protéines), marasme (manque de tout), anémie (fer), goitre (iode), scorbut (vitamine C) ;",
            "excès : obésité, diabète, hypertension (trop de sucre, de gras, de sel) ;",
            "intoxications alimentaires : aliments mal conservés.",
          ])}
          ${retenir("Bien manger, c’est varier les aliments, éviter les excès et respecter l’hygiène alimentaire.")}`,
      },
    ],
  },
  {
    title: "Le cadre de vie",
    summary: "Le milieu de vie de l’homme, sa dégradation et sa protection.",
    lessons: [
      {
        title: "Améliorer son cadre de vie",
        minutes: 12,
        body: `${liste([
            "Le cadre de vie comprend le logement, le quartier, l’école, l’air, l’eau et les espaces verts.",
            "Dégradations : ordures, eaux usées, bruit, fumées, insalubrité, inondations.",
            "Conséquences : maladies (paludisme, choléra, maladies respiratoires).",
            "Solutions : assainissement, gestion des déchets, reboisement, éducation à l’environnement.",
          ])}
          ${retenir("Chacun est responsable de la propreté et de la santé de son cadre de vie.")}`,
      },
    ],
  },
  {
    title: "Les sols",
    summary: "Formation, composition, types de sols, érosion et conservation.",
    lessons: [
      {
        title: "Formation et composition du sol",
        minutes: 12,
        body: `${liste([
            "Le sol se forme lentement par l’altération de la roche (chaleur, eau, racines) et l’apport de matière organique (humus).",
            "Il contient des éléments minéraux (sable, argile, limon), de l’humus, de l’eau, de l’air et des êtres vivants.",
            "Au Sénégal : sols « dior » (sableux, filtrants) et « deck » (plus argileux, plus riches).",
          ])}
          ${methode(["Mettre un échantillon de sol dans un bocal d’eau, agiter, laisser reposer.", "Observer les couches : graviers, sable, limon, argile ; l’humus flotte."], "Étudier la composition d’un sol")}`,
      },
      {
        title: "L’érosion et la conservation des sols",
        minutes: 12,
        body: `${liste(["L’érosion éolienne (vent) et hydrique (ruissellement) emporte la terre fertile.", "Causes aggravantes : déforestation, feux de brousse, surpâturage.", "Conservation : haies brise-vent, diguettes, reboisement, jachère, fumure organique."])}
          ${retenir("Un sol perdu se reconstitue très lentement : il faut le protéger.")}`,
      },
    ],
  },
  {
    title: "Les roches sédimentaires",
    summary: "Formation par sédimentation, quelques roches, fossiles, roches du Sénégal.",
    lessons: [
      {
        title: "Formation des roches sédimentaires",
        minutes: 12,
        body: `${liste([
            "Des débris (sables, argiles, coquilles) se déposent en couches au fond de l’eau : c’est la <strong>sédimentation</strong>.",
            "Avec le temps, les couches se tassent et durcissent : elles deviennent des roches (grès, calcaire, argile).",
            "Elles contiennent souvent des <strong>fossiles</strong>, restes d’êtres vivants anciens.",
          ])}
          ${exemple(["Le calcaire fait effervescence avec l’acide chlorhydrique ; les phosphates de Taïba et de Matam sont des roches sédimentaires exploitées."])}
          ${retenir("Le Sénégal est formé en grande partie d’un bassin sédimentaire.")}`,
      },
    ],
  },
];
