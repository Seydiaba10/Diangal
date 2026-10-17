// Français de 6e. Chapitres INDICATIFS (le programme officiel du moyen n’a pas été trouvé en ligne ;
// PROMET ne montre que des leçons isolées : formes de phrases, phrase simple, familles de mots). Leçons
// rédigées par DIANGAL, à faire valider par un professeur de français.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

export const FR_6E: ChapterSpec[] = [
  {
    title: "Le conte",
    summary: "Structure du conte, personnages, merveilleux et morale ; les contes africains.",
    strand: "Lecture",
    lessons: [
      {
        title: "Lire et comprendre un conte",
        minutes: 15,
        body: `${liste([
            "Le conte commence souvent par une formule : « Il était une fois… », « Leeboon… » en wolof.",
            "Il suit un <strong>schéma narratif</strong> : situation initiale, élément déclencheur, péripéties, dénouement, situation finale.",
            "Les personnages sont souvent des animaux (Leuk-le-Lièvre, Bouki-l’Hyène) ou des humains face au merveilleux.",
            "Le conte transmet une <strong>morale</strong> ou une leçon de vie.",
          ])}
          ${exemple(["Les Contes d’Amadou Koumba de Birago Diop et La Belle Histoire de Leuk-le-Lièvre de Senghor et Abdoulaye Sadji sont des classiques sénégalais."])}
          ${retenir("Le conte appartient d’abord à la tradition orale : le conteur le dit le soir, devant un public qui participe.")}`,
      },
    ],
  },
  {
    title: "La fable",
    summary: "Récit en vers, personnages animaux et morale.",
    strand: "Lecture",
    lessons: [
      {
        title: "Lire une fable",
        minutes: 12,
        body: `<p>La <strong>fable</strong> est un court récit, souvent en vers, qui met en scène des animaux pour donner une leçon : la <strong>morale</strong>.</p>
          ${exemple(["« La raison du plus fort est toujours la meilleure » (La Fontaine, Le Loup et l’Agneau)."])}
          ${liste(["la morale peut être au début ou à la fin ;", "les animaux représentent des défauts ou des qualités humaines (le renard rusé, le lion puissant)."])}
          ${retenir("Une fable raconte pour faire réfléchir : elle « instruit en amusant ».")}`,
      },
    ],
  },
  {
    title: "La phrase simple",
    summary: "Phrase verbale et non verbale ; types et formes de phrases.",
    strand: "Grammaire",
    lessons: [
      {
        title: "Types et formes de phrases",
        minutes: 12,
        body: `${tableau([
            ["Type", "Exemple"],
            ["déclaratif", "Le soleil se lève."],
            ["interrogatif", "Le soleil se lève-t-il ?"],
            ["exclamatif", "Quel beau lever de soleil !"],
            ["impératif", "Lève-toi."],
          ])}
          ${liste(["forme affirmative / négative (ne… pas, ne… jamais, ne… rien) ;", "une phrase simple contient un seul verbe conjugué ; une phrase non verbale n’en a pas (« Silence ! »)."])}
          ${retenir("Une phrase commence par une majuscule et se termine par un signe de ponctuation forte.")}`,
      },
    ],
  },
  {
    title: "Le groupe nominal",
    summary: "Nom, déterminants, adjectif épithète et complément du nom.",
    strand: "Grammaire",
    lessons: [
      {
        title: "Les constituants du groupe nominal",
        minutes: 12,
        body: `<p>Le <strong>groupe nominal</strong> est formé autour d’un <strong>nom</strong> (le noyau).</p>
          ${liste([
            "déterminants : articles (le, un), possessifs (mon), démonstratifs (ce) ;",
            "adjectif qualificatif <strong>épithète</strong> : un <strong>vieux</strong> baobab ;",
            "<strong>complément du nom</strong> : le marché <strong>de Sandaga</strong>.",
          ])}
          ${retenir("Dans le groupe nominal, le déterminant et l’adjectif s’accordent en genre et en nombre avec le nom.")}`,
      },
    ],
  },
  {
    title: "Les fonctions dans la phrase",
    summary: "Sujet, complément d’objet direct et indirect, attribut du sujet.",
    strand: "Grammaire",
    lessons: [
      {
        title: "Sujet, COD, COI, attribut",
        minutes: 12,
        body: `${tableau([
            ["Fonction", "Question", "Exemple"],
            ["sujet", "qui est-ce qui ?", "<strong>Les élèves</strong> écoutent."],
            ["COD", "verbe + qui ? quoi ?", "Ils écoutent <strong>le maître</strong>."],
            ["COI", "verbe + à qui ? de quoi ?", "Ils obéissent <strong>au règlement</strong>."],
            ["attribut du sujet", "après un verbe d’état", "Ils sont <strong>attentifs</strong>."],
          ])}
          ${retenir("Le verbe s’accorde toujours avec son sujet.")}`,
      },
    ],
  },
  {
    title: "Les temps de l’indicatif",
    summary: "Groupes de verbes ; présent, imparfait, passé simple, futur et passé composé.",
    strand: "Conjugaison",
    lessons: [
      {
        title: "Les principaux temps de l’indicatif",
        minutes: 15,
        body: `${tableau([
            ["Temps", "chanter (1er gr.)", "finir (2e gr.)", "prendre (3e gr.)"],
            ["présent", "il chante", "il finit", "il prend"],
            ["imparfait", "il chantait", "il finissait", "il prenait"],
            ["passé simple", "il chanta", "il finit", "il prit"],
            ["futur", "il chantera", "il finira", "il prendra"],
            ["passé composé", "il a chanté", "il a fini", "il a pris"],
          ])}
          ${retenir("Dans un récit au passé, l’imparfait décrit le décor ; le passé simple raconte les actions principales.")}`,
      },
    ],
  },
  {
    title: "Accords et homophones",
    summary: "Accord dans le groupe nominal et du verbe ; homophones grammaticaux.",
    strand: "Orthographe",
    lessons: [
      {
        title: "Bien accorder, bien choisir",
        minutes: 12,
        body: `${liste([
            "pluriel des noms et adjectifs : -s, -x (-eau, -al → -aux) ;",
            "le verbe s’accorde avec son sujet, même placé après lui : « Où vont les pirogues ? » ;",
            "homophones : a/à, et/est, son/sont, ces/ses, on/ont, ou/où, leur/leurs.",
          ])}
          ${methode(["Je remplace par un autre mot (avait, était, mon, ceux-là, il…) pour choisir la bonne orthographe."])}`,
      },
    ],
  },
  {
    title: "Le vocabulaire",
    summary: "Le dictionnaire, les familles de mots, le sens propre et le sens figuré.",
    strand: "Vocabulaire",
    lessons: [
      {
        title: "Familles de mots et sens des mots",
        minutes: 12,
        body: `${liste([
            "une <strong>famille de mots</strong> partage un même radical : terre, terrien, terrain, souterrain ;",
            "un mot peut avoir un <strong>sens propre</strong> et un <strong>sens figuré</strong> : une montagne / une montagne de devoirs ;",
            "le dictionnaire donne la nature, les sens, les synonymes et l’étymologie des mots.",
          ])}
          ${retenir("Connaître la famille d’un mot aide à comprendre son sens et à l’écrire correctement.")}`,
      },
    ],
  },
  {
    title: "Raconter et décrire",
    summary: "Rédiger une narration et une description.",
    strand: "Expression écrite",
    lessons: [
      {
        title: "La narration et la description",
        minutes: 15,
        body: `${methode([
            "Lire le sujet et souligner ce qu’il demande.",
            "Chercher des idées au brouillon et faire un plan (début, déroulement, fin).",
            "Rédiger en paragraphes, avec des connecteurs (d’abord, ensuite, soudain, enfin).",
            "Relire pour corriger.",
          ], "Écrire une narration")}
          ${liste(["Pour décrire : aller du général au particulier, utiliser des adjectifs précis, des comparaisons et les cinq sens."])}
          ${exemple(["Sujet : « Raconte une journée de Tabaski dans ta famille. »"])}`,
      },
    ],
  },
];
