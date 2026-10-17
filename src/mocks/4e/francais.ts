// Français de 4e. Chapitres INDICATIFS (le programme officiel du moyen n’a pas été trouvé). Leçons
// rédigées par DIANGAL, à faire valider par un professeur de français.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

export const FR_4E: ChapterSpec[] = [
  {
    title: "La nouvelle",
    summary: "Un récit bref, peu de personnages, une chute.",
    strand: "Lecture",
    lessons: [
      {
        title: "Lire une nouvelle",
        minutes: 12,
        body: `${liste([
            "la nouvelle est un récit <strong>court</strong>, centré sur un événement, avec peu de personnages ;",
            "elle se termine souvent par une <strong>chute</strong> : une fin inattendue qui éclaire tout le récit ;",
            "elle peut être réaliste, fantastique ou policière.",
          ])}
          ${retenir("Pour analyser une nouvelle : qui raconte ? où et quand ? quel est l’événement central ? que révèle la chute ?")}`,
      },
    ],
  },
  {
    title: "La poésie de la Négritude",
    summary: "Le mouvement de la Négritude, ses poètes et ses thèmes.",
    strand: "Lecture",
    lessons: [
      {
        title: "La Négritude",
        minutes: 15,
        body: `${liste([
            "mouvement littéraire né à Paris dans les années 1930 autour de Léopold Sédar Senghor, Aimé Césaire et Léon-Gontran Damas ;",
            "il affirme la dignité et les valeurs des cultures noires face au colonialisme ;",
            "thèmes : l’Afrique, les ancêtres, la femme noire, la souffrance de l’esclavage et de la colonisation.",
          ])}
          ${exemple(["Birago Diop, dans « Souffles » : « Écoute plus souvent / Les Choses que les Êtres »."])}
          ${retenir("La poésie de la Négritude s’appuie sur le rythme, la répétition et les images.")}`,
      },
    ],
  },
  {
    title: "Le théâtre",
    summary: "Le texte théâtral, le dialogue et le conflit ; la tragédie historique.",
    strand: "Lecture",
    lessons: [
      {
        title: "Lire une pièce de théâtre",
        minutes: 12,
        body: `${liste([
            "le théâtre repose sur un <strong>conflit</strong> entre les personnages ; il avance par le dialogue ;",
            "monologue : un personnage parle seul ; aparté : une réplique que les autres personnages ne sont pas censés entendre ;",
            "la tragédie met en scène des personnages nobles face à un destin malheureux.",
          ])}
          ${exemple(["<em>L’Exil d’Albouri</em> (1967), de Cheik Aliou Ndao, met en scène Albouri Ndiaye, dernier roi du Jolof, face à la conquête coloniale."])}`,
      },
    ],
  },
  {
    title: "Le roman africain",
    summary: "Lire un roman : personnages, cadre, thèmes ; l’autobiographie.",
    strand: "Lecture",
    lessons: [
      {
        title: "Lire un roman",
        minutes: 12,
        body: `${liste([
            "le roman est un long récit en prose, avec de nombreux personnages et plusieurs lieux ;",
            "le récit autobiographique raconte la vie de l’auteur à la première personne ;",
            "on étudie les personnages (portrait, évolution), le cadre (lieu, époque) et les thèmes.",
          ])}
          ${exemple(["<em>L’Enfant noir</em> (1953), de Camara Laye, raconte l’enfance de l’auteur en Guinée."])}`,
      },
    ],
  },
  {
    title: "La phrase complexe",
    summary: "Propositions indépendantes, coordonnées, juxtaposées, principales et subordonnées.",
    strand: "Grammaire",
    lessons: [
      {
        title: "Les propositions",
        minutes: 12,
        body: `${tableau([
            ["Type", "Exemple"],
            ["juxtaposées (virgule, point-virgule)", "Il pleut, nous restons à la maison."],
            ["coordonnées (mais, ou, et, donc, or, ni, car)", "Il pleut, donc nous restons à la maison."],
            ["principale + subordonnée", "Nous restons à la maison <strong>parce qu’il pleut</strong>."],
          ])}
          ${retenir("Une phrase complexe a autant de propositions que de verbes conjugués.")}`,
      },
    ],
  },
  {
    title: "Le discours direct et le discours indirect",
    summary: "Rapporter les paroles : ponctuation, verbes introducteurs, transformations.",
    strand: "Grammaire",
    lessons: [
      {
        title: "Rapporter des paroles",
        minutes: 15,
        body: `${liste([
            "discours direct : les paroles sont citées entre guillemets : Il a dit : « Je viendrai demain. » ;",
            "discours indirect : elles sont intégrées à la phrase par une subordonnée : Il a dit qu’il viendrait le lendemain ;",
            "au discours indirect, les pronoms, les temps et les indications de temps changent (demain → le lendemain).",
          ])}
          ${methode(["Supprimer les guillemets et ajouter « que » (ou « si », « ce que »).", "Adapter les pronoms.", "Respecter la concordance des temps si le verbe introducteur est au passé."], "Passer au discours indirect")}`,
      },
    ],
  },
  {
    title: "Le subjonctif et le conditionnel",
    summary: "Formes et emplois du subjonctif présent et du conditionnel présent.",
    strand: "Conjugaison",
    lessons: [
      {
        title: "Subjonctif et conditionnel",
        minutes: 15,
        body: `${tableau([
            ["Mode", "Formation", "Emploi", "Exemple"],
            ["subjonctif présent", "radical + -e, -es, -e, -ions, -iez, -ent", "souhait, obligation, doute (après « que »)", "Il faut que tu viennes."],
            ["conditionnel présent", "radical du futur + terminaisons de l’imparfait", "condition, politesse, souhait", "Si j’avais le temps, je lirais. Je voudrais un livre."],
          ])}
          ${retenir("Après « si » exprimant une condition, on n’emploie jamais le conditionnel : si j’avais (et non si j’aurais).")}`,
      },
    ],
  },
  {
    title: "Les figures de style",
    summary: "Comparaison, métaphore, personnification, hyperbole, antithèse.",
    strand: "Vocabulaire",
    lessons: [
      {
        title: "Reconnaître les figures de style",
        minutes: 12,
        body: `${tableau([
            ["Figure", "Définition", "Exemple"],
            ["comparaison", "rapprochement avec un outil (comme, tel)", "Fort comme un baobab."],
            ["métaphore", "rapprochement sans outil", "Ce baobab est un géant."],
            ["personnification", "une chose agit comme une personne", "Le vent chante dans les filaos."],
            ["hyperbole", "exagération", "Je meurs de faim."],
            ["antithèse", "opposition de deux mots", "Vivre ou mourir."],
          ])}`,
      },
    ],
  },
  {
    title: "La description et le portrait",
    summary: "Décrire un lieu ou une personne : organisation, vocabulaire, point de vue.",
    strand: "Expression écrite",
    lessons: [
      {
        title: "Écrire une description",
        minutes: 12,
        body: `${methode([
            "Choisir un ordre : de près au loin, de haut en bas, du général au détail.",
            "Utiliser des adjectifs précis, des compléments de lieu et des verbes variés (se dresser, s’étendre).",
            "Faire appel aux cinq sens.",
            "Dans un portrait, décrire le physique puis le caractère.",
          ])}
          ${retenir("La description utilise souvent l’imparfait dans un récit au passé.")}`,
      },
    ],
  },
];
