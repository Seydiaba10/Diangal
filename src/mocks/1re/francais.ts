// Français de 1re (toutes séries). Chapitres INDICATIFS (programme officiel de 1re non trouvé ; exercices
// du Bac et grands courants littéraires). Leçons rédigées par DIANGAL, à faire valider par un professeur
// de français.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

export const FR_1RE: ChapterSpec[] = [
  {
    title: "Le commentaire composé",
    summary: "Construire un commentaire organisé en axes, à partir des procédés du texte.",
    strand: "Méthodes",
    lessons: [
      {
        title: "Rédiger un commentaire composé",
        minutes: 15,
        body: `${methode([
            "Introduction : situer le texte, présenter son thème, annoncer les axes.",
            "Développement : deux ou trois axes ; chaque idée s’appuie sur des citations et des procédés analysés.",
            "Conclusion : bilan de la lecture et ouverture.",
          ])}
          ${retenir("On ne sépare jamais le fond et la forme : un procédé est toujours relié au sens qu’il produit.")}`,
      },
    ],
  },
  {
    title: "La dissertation littéraire",
    summary: "Analyser un sujet, problématiser, construire un plan dialectique ou thématique.",
    strand: "Méthodes",
    lessons: [
      {
        title: "Construire une dissertation",
        minutes: 15,
        body: `${liste([
            "analyser les mots clés du sujet et reformuler la question posée ;",
            "plan dialectique (thèse, antithèse, synthèse) ou thématique ;",
            "chaque argument est illustré par un exemple tiré des œuvres lues.",
          ])}
          ${exemple(["Sujet : « Le roman doit-il refléter la réalité ? » On peut s’appuyer sur Balzac, Zola, Sembène ou Mariama Bâ."])}`,
      },
    ],
  },
  {
    title: "L’argumentation",
    summary: "Thèse, arguments, exemples ; convaincre et persuader ; connecteurs logiques.",
    strand: "Méthodes",
    lessons: [
      {
        title: "Convaincre et persuader",
        minutes: 12,
        body: `${liste([
            "convaincre : s’adresser à la raison (arguments logiques, exemples, faits) ;",
            "persuader : toucher les sentiments (images, interpellations, émotion) ;",
            "connecteurs : d’abord, de plus, en effet, cependant, donc, en conclusion.",
          ])}`,
      },
    ],
  },
  {
    title: "Le XVIIe siècle : le classicisme",
    summary: "Raison, mesure, règles ; théâtre classique et fables.",
    strand: "Histoire littéraire",
    lessons: [
      {
        title: "Le classicisme",
        minutes: 12,
        body: `${liste([
            "idéal de raison, de mesure et de vraisemblance ; « plaire et instruire » ;",
            "règle des trois unités au théâtre (temps, lieu, action) ;",
            "auteurs : Corneille et Racine (tragédie), Molière (comédie), La Fontaine (fables).",
          ])}`,
      },
    ],
  },
  {
    title: "Le XVIIIe siècle : les Lumières",
    summary: "Raison critique, combat contre l’intolérance et l’arbitraire.",
    strand: "Histoire littéraire",
    lessons: [
      {
        title: "Les philosophes des Lumières",
        minutes: 12,
        body: `${liste([
            "Montesquieu (<em>Lettres persanes</em>, <em>De l’esprit des lois</em>) ;",
            "Voltaire (<em>Candide</em>) dénonce l’intolérance et l’esclavage ;",
            "Rousseau (<em>Du contrat social</em>) et Diderot (<em>Encyclopédie</em>).",
          ])}
          ${retenir("Les Lumières utilisent l’ironie, le conte philosophique et l’essai pour faire réfléchir.")}`,
      },
    ],
  },
  {
    title: "Le XIXe siècle : romantisme, réalisme, symbolisme",
    summary: "Les grands mouvements littéraires du XIXe siècle.",
    strand: "Histoire littéraire",
    lessons: [
      {
        title: "Trois mouvements",
        minutes: 15,
        body: `${tableau([
            ["Mouvement", "Caractères", "Auteurs"],
            ["romantisme", "expression du moi, sentiments, nature, engagement", "Hugo, Lamartine"],
            ["réalisme et naturalisme", "peindre la société telle qu’elle est", "Balzac, Flaubert, Zola"],
            ["symbolisme", "suggérer par les images et la musique des mots", "Baudelaire, Verlaine, Rimbaud"],
          ])}`,
      },
    ],
  },
  {
    title: "La littérature négro-africaine",
    summary: "La Négritude, le roman de la période coloniale et des indépendances.",
    strand: "Histoire littéraire",
    lessons: [
      {
        title: "De la Négritude au roman africain",
        minutes: 15,
        body: `${liste([
            "la Négritude (Senghor, Césaire, Damas) affirme les valeurs des civilisations noires ;",
            "le roman colonial dénonce l’injustice : <em>Une vie de boy</em> (Ferdinand Oyono, 1956) ;",
            "<em>L’Aventure ambiguë</em> (Cheikh Hamidou Kane, 1961) pose la question de la rencontre des cultures ;",
            "<em>Une si longue lettre</em> (Mariama Bâ, 1979) donne la parole aux femmes.",
          ])}`,
      },
    ],
  },
];
