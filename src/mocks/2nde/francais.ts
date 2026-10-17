// Français de 2nde (séries L et S). Chapitres INDICATIFS (programme officiel de 2nde non trouvé ; repris
// en partie des exercices du Bac : résumé et discussion, commentaire, dissertation). Leçons rédigées par
// DIANGAL, à faire valider par un professeur de français.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

export const FR_2NDE: ChapterSpec[] = [
  {
    title: "Le résumé de texte",
    summary: "Réduire un texte argumentatif au quart de sa longueur en respectant sa logique.",
    strand: "Méthodes",
    lessons: [
      {
        title: "Résumer un texte argumentatif",
        minutes: 15,
        body: `${methode([
            "Lire le texte plusieurs fois et dégager la thèse.",
            "Repérer les articulations logiques (mais, donc, en effet) et les idées de chaque paragraphe.",
            "Reformuler avec ses mots, au même point de vue que l’auteur, sans citer ni commenter.",
            "Respecter le nombre de mots demandé (avec une marge de 10 % environ) et l’indiquer.",
          ])}
          ${retenir("Le résumé suit l’ordre du texte et garde son système d’énonciation.")}`,
      },
    ],
  },
  {
    title: "La discussion",
    summary: "Discuter une idée du texte : problématique, arguments, exemples.",
    strand: "Méthodes",
    lessons: [
      {
        title: "Construire une discussion",
        minutes: 15,
        body: `${liste([
            "introduction : amener le sujet, poser le problème, annoncer le plan ;",
            "développement : arguments organisés, chacun illustré par un exemple précis ;",
            "conclusion : bilan et ouverture.",
          ])}
          ${exemple(["Sujet : « L’école doit-elle enseigner dans les langues nationales ? » Plan possible : intérêts, limites, conditions."])}`,
      },
    ],
  },
  {
    title: "Le commentaire de texte",
    summary: "Initiation au commentaire : lecture méthodique et axes de lecture.",
    strand: "Méthodes",
    lessons: [
      {
        title: "Lire méthodiquement un texte",
        minutes: 15,
        body: `${methode([
            "Situer le texte (auteur, œuvre, époque, genre).",
            "Dégager le thème et l’idée générale.",
            "Relever les procédés (champs lexicaux, figures de style, temps, rythme).",
            "Organiser l’interprétation en deux ou trois axes de lecture.",
          ])}`,
      },
    ],
  },
  {
    title: "Le roman",
    summary: "Narrateur, point de vue, personnages, temps du récit.",
    strand: "Genres",
    lessons: [
      {
        title: "Analyser un roman",
        minutes: 15,
        body: `${tableau([
            ["Notion", "Question à se poser"],
            ["narrateur", "qui raconte ? (personnage ou narrateur extérieur)"],
            ["point de vue", "interne, externe ou omniscient ?"],
            ["personnages", "portrait, rôle, évolution"],
            ["temps", "ordre des événements, retours en arrière, ellipses"],
          ])}
          ${exemple(["<em>Les Bouts de bois de Dieu</em> (1960), d’Ousmane Sembène, raconte la grève des cheminots du Dakar-Niger (1947-1948)."])}`,
      },
    ],
  },
  {
    title: "La poésie",
    summary: "Versification, formes poétiques, images.",
    strand: "Genres",
    lessons: [
      {
        title: "Lire un poème",
        minutes: 12,
        body: `${liste([
            "vers : alexandrin (12 syllabes), décasyllabe (10), octosyllabe (8) ; vers libres ;",
            "rimes plates (AABB), croisées (ABAB), embrassées (ABBA) ;",
            "formes : sonnet (deux quatrains et deux tercets), poème en prose, poème de la Négritude rythmé par la répétition.",
          ])}
          ${retenir("Dans un poème, la forme fait sens : rythme, sonorités et images servent le propos.")}`,
      },
    ],
  },
  {
    title: "Le théâtre",
    summary: "Le texte et la représentation, comédie et tragédie, double énonciation.",
    strand: "Genres",
    lessons: [
      {
        title: "Lire et voir le théâtre",
        minutes: 12,
        body: `${liste([
            "double énonciation : les personnages se parlent, mais l’auteur s’adresse au public ;",
            "comédie (fin heureuse, satire des mœurs) et tragédie (personnages nobles, fatalité) ;",
            "exposition, nœud, dénouement.",
          ])}`,
      },
    ],
  },
  {
    title: "Littérature du Moyen Âge et de la Renaissance",
    summary: "Chansons de geste, roman de chevalerie, humanisme et Pléiade.",
    strand: "Histoire littéraire",
    lessons: [
      {
        title: "Du Moyen Âge à la Renaissance",
        minutes: 12,
        body: `${liste([
            "Moyen Âge : chansons de geste (<em>La Chanson de Roland</em>), romans de chevalerie, fabliaux ;",
            "XVI<sup>e</sup> siècle : l’humanisme (Rabelais, Montaigne) met l’homme et le savoir au centre ;",
            "la Pléiade (Ronsard, Du Bellay) enrichit la langue et la poésie française.",
          ])}`,
      },
    ],
  },
];
