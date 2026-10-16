// Français de 3e. Chapitres indicatifs (le relevé officiel du français reste à compléter :
// docs/programme/releve-ci-3e.md). Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type Chapter3eSpec, exemple, liste, methode, retenir, tableau } from "./blocks";

export const FR_3E: Chapter3eSpec[] = [
  {
    title: "Le récit",
    summary: "Narrateur, point de vue et organisation du récit.",
    lessons: [
      {
        title: "Le narrateur et le point de vue",
        body: `<p>Le <strong>narrateur</strong> est celui qui raconte l’histoire ; ce n’est pas forcément l’auteur.</p>
          ${tableau([
            ["Point de vue", "Ce que sait le narrateur", "Indice"],
            ["Interne", "ce que voit et pense un personnage", "« Il sentait son cœur battre… »"],
            ["Externe", "seulement ce qu’on voit de l’extérieur", "aucune pensée des personnages"],
            ["Omniscient", "tout, y compris les pensées de tous", "passé, futur, secrets"],
          ])}
          ${retenir("Récit à la 1re personne : le narrateur est un personnage. À la 3e personne : il est extérieur à l’histoire.")}`,
      },
      {
        title: "Le schéma narratif",
        body: `${methode([
            "<strong>Situation initiale</strong> : les personnages, le lieu, l’époque.",
            "<strong>Élément perturbateur</strong> : un événement rompt l’équilibre.",
            "<strong>Péripéties</strong> : les actions et rebondissements.",
            "<strong>Dénouement</strong> : l’événement qui résout le problème.",
            "<strong>Situation finale</strong> : le nouvel équilibre.",
          ], "Les cinq étapes")}
          ${retenir("Les contes de Birago Diop (Les Contes d’Amadou Koumba) suivent souvent ce schéma.")}`,
      },
      {
        title: "Les temps du récit",
        body: `${liste([
            "<strong>Passé simple</strong> : actions de premier plan, brèves et successives (« Il ouvrit la porte et sortit »).",
            "<strong>Imparfait</strong> : arrière-plan, descriptions, habitudes (« Le soleil brillait »).",
            "Retours en arrière et anticipations bousculent l’ordre chronologique.",
          ])}
          ${exemple(["« Chaque soir, la vieille <em>racontait</em> des contes. Ce soir-là, un inconnu <em>frappa</em> à la porte. »"])}`,
      },
    ],
  },
  {
    title: "La description",
    summary: "Décrire un lieu, un personnage, une scène.",
    lessons: [
      {
        title: "Organiser une description",
        body: `<p>Une description peint un lieu, un objet ou un personnage. Elle suit un <strong>ordre</strong> :</p>
          ${liste(["de loin à près, ou de haut en bas ;", "de gauche à droite ;", "du général au détail."])}
          <p>Elle s’appuie sur les cinq sens et utilise des <strong>indicateurs de lieu</strong> : au premier plan, à droite, au loin…</p>
          ${retenir("Le temps de la description dans un récit au passé est l’imparfait.")}`,
      },
      {
        title: "Le portrait",
        body: `${liste([
            "<strong>Portrait physique</strong> : visage, taille, vêtements, gestes.",
            "<strong>Portrait moral</strong> : caractère, qualités, défauts.",
          ])}
          <p>Les adjectifs qualificatifs, les comparaisons et les verbes précis rendent le portrait vivant.</p>
          ${exemple(["« Le vieux pêcheur avait des mains épaisses comme des racines de baobab ; son regard calme rassurait tout le village. »"])}
          ${retenir("Une description peut être <strong>valorisante</strong> ou <strong>dévalorisante</strong> : elle révèle le regard du narrateur.")}`,
      },
    ],
  },
  {
    title: "Le discours rapporté",
    summary: "Discours direct, indirect et indirect libre.",
    lessons: [
      {
        title: "Discours direct et indirect",
        body: `${tableau([
            ["", "Discours direct", "Discours indirect"],
            ["Exemple", "Awa dit : « Je pars demain. »", "Awa dit qu’elle partait le lendemain."],
            ["Ponctuation", "deux-points, guillemets, tirets", "aucune marque particulière"],
            ["Liaison", "verbe introducteur", "verbe introducteur + que, si…"],
          ])}
          ${retenir("Au discours direct, on cite les paroles exactes ; au discours indirect, elles sont intégrées au récit.")}`,
      },
      {
        title: "Passer du direct à l’indirect",
        body: `${methode([
            "Changer les pronoms et les possessifs (je → il, mon → son).",
            "Concordance des temps si le verbe introducteur est au passé (présent → imparfait, futur → conditionnel).",
            "Adapter les indicateurs de temps et de lieu (demain → le lendemain, ici → là).",
          ])}
          ${exemple(["Il demanda : « Viendras-tu ? » → Il demanda si je viendrais."])}
          ${retenir("Le <strong>discours indirect libre</strong> mêle les deux : pas de verbe introducteur, mais les temps et pronoms du récit.")}`,
      },
    ],
  },
  {
    title: "Le texte argumentatif",
    summary: "Thèse, arguments, exemples et connecteurs logiques.",
    lessons: [
      {
        title: "Thèse, arguments et exemples",
        body: `${liste([
            "La <strong>thèse</strong> est l’opinion défendue.",
            "Les <strong>arguments</strong> sont les raisons qui la justifient.",
            "Les <strong>exemples</strong> illustrent et rendent les arguments concrets.",
          ])}
          ${exemple(["Thèse : la lecture est indispensable. Argument : elle enrichit le vocabulaire. Exemple : un élève qui lit régulièrement écrit avec plus d’aisance."])}`,
      },
      {
        title: "Les connecteurs logiques",
        body: `${tableau([
            ["Rapport", "Connecteurs"],
            ["Addition", "de plus, en outre, par ailleurs"],
            ["Cause", "car, parce que, puisque"],
            ["Conséquence", "donc, ainsi, c’est pourquoi"],
            ["Opposition", "mais, cependant, pourtant"],
            ["Conclusion", "en somme, en définitive"],
          ])}
          ${retenir("Les connecteurs rendent l’enchaînement des idées clair pour le lecteur.")}`,
      },
      {
        title: "Rédiger un paragraphe argumentatif",
        body: `${methode([
            "Annoncer l’idée principale (l’argument).",
            "L’expliquer en une ou deux phrases.",
            "Donner un exemple précis.",
            "Conclure le paragraphe ou faire la transition.",
          ])}
          ${retenir("Pour la dissertation du BFEM : introduction (amener, poser, annoncer), développement en parties, conclusion (bilan et ouverture).")}`,
      },
    ],
  },
  {
    title: "La lettre",
    summary: "Rédiger une lettre personnelle ou officielle.",
    lessons: [
      {
        title: "La lettre personnelle",
        body: `${liste([
            "En haut à droite : le lieu et la date (Thiès, le 12 mars 2027).",
            "La formule d’appel : Cher Moussa, Chère tante…",
            "Le corps de la lettre, en paragraphes.",
            "La formule finale et la signature.",
          ])}
          ${retenir("Le ton est familier mais correct ; on tutoie ou on vouvoie selon le destinataire.")}`,
      },
      {
        title: "La lettre officielle",
        body: `${methode([
            "En haut à gauche : nom et adresse de l’expéditeur ; à droite, le lieu et la date.",
            "Le destinataire (Monsieur le Proviseur…), puis l’objet de la lettre.",
            "La formule d’appel (Monsieur, Madame), le corps de la lettre, la formule de politesse.",
            "La signature.",
          ])}
          ${exemple(["Formule de politesse : « Veuillez agréer, Monsieur le Directeur, l’expression de mes salutations distinguées. »"])}
          ${retenir("<em>Une si longue lettre</em> de Mariama Bâ est un roman écrit sous forme de lettre.")}`,
      },
    ],
  },
  {
    title: "La poésie",
    summary: "Versification, images et figures de style.",
    lessons: [
      {
        title: "La versification",
        body: `${liste([
            "Le <strong>vers</strong> se mesure en syllabes : alexandrin (12), décasyllabe (10), octosyllabe (8).",
            "La <strong>strophe</strong> : quatrain (4 vers), tercet (3 vers).",
            "Les <strong>rimes</strong> : plates (AABB), croisées (ABAB), embrassées (ABBA).",
          ])}
          ${retenir("Le « e » muet se prononce devant une consonne à l’intérieur du vers, pas en fin de vers.")}`,
      },
      {
        title: "Les figures de style",
        body: `${tableau([
            ["Figure", "Définition", "Exemple"],
            ["Comparaison", "rapprochement avec un outil (comme, tel)", "Ses yeux brillent comme des étoiles."],
            ["Métaphore", "rapprochement sans outil", "Ses yeux sont des étoiles."],
            ["Personnification", "un objet agit comme une personne", "Le vent gémit."],
            ["Anaphore", "répétition en début de vers", "Afrique… Afrique…"],
          ])}
          ${retenir("La poésie de la négritude (Senghor, David Diop) célèbre l’Afrique et dénonce la colonisation.")}`,
      },
    ],
  },
  {
    title: "Le théâtre",
    summary: "Dialogue, didascalies et genres théâtraux.",
    lessons: [
      {
        title: "Le texte de théâtre",
        body: `${liste([
            "Il est écrit pour être joué : il se compose de <strong>répliques</strong> (dialogue), de <strong>monologues</strong> et de <strong>tirades</strong>.",
            "Les <strong>didascalies</strong> (souvent en italique) indiquent les gestes, le ton, le décor.",
            "La pièce est divisée en actes et en scènes.",
          ])}
          ${retenir("L’aparté est une réplique que le personnage dit pour lui-même, sans être entendu des autres.")}`,
      },
      {
        title: "Les genres théâtraux",
        body: `${tableau([
            ["Genre", "Caractéristiques"],
            ["Comédie", "fait rire, se termine bien, critique les défauts de la société"],
            ["Tragédie", "personnages nobles, destin malheureux"],
            ["Drame", "mélange le tragique et le comique"],
          ])}
          ${retenir("Le théâtre africain met souvent en scène l’histoire (les héros de la résistance) et les problèmes de société.")}`,
      },
    ],
  },
  {
    title: "Le résumé de texte",
    summary: "Réduire un texte en respectant sa logique.",
    lessons: [
      {
        title: "Les règles du résumé",
        body: `${liste([
            "Réduire le texte au quart de sa longueur environ (le nombre de mots est fixé par la consigne).",
            "Respecter l’ordre des idées et le système d’énonciation de l’auteur.",
            "Reformuler avec ses propres mots, sans recopier de phrases.",
            "Ne rien ajouter : pas d’opinion personnelle ni de « l’auteur dit que… ».",
          ])}
          ${retenir("On indique à la fin le nombre de mots utilisés.")}`,
      },
      {
        title: "La méthode du résumé",
        body: `${methode([
            "Lire le texte plusieurs fois et dégager le thème et la thèse.",
            "Repérer les paragraphes et les connecteurs : ils montrent le plan.",
            "Noter l’idée essentielle de chaque partie, en supprimant les exemples.",
            "Rédiger un texte suivi, avec des connecteurs, puis compter les mots.",
          ])}
          ${exemple(["Une phrase de 18 mots comme « La pluie, qui tombait sans arrêt depuis trois jours, avait transformé les rues du quartier en rivières boueuses » peut devenir « Les pluies avaient inondé le quartier » (6 mots)."])}`,
      },
    ],
  },
];
