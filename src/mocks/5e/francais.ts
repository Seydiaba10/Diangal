// Français de 5e. Chapitres INDICATIFS (le programme officiel du moyen n’a pas été trouvé ; PROMET :
// groupes de verbes, mots de la même famille, temps de l’indicatif). Leçons rédigées par DIANGAL, à
// faire valider par un professeur de français.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

export const FR_5E: ChapterSpec[] = [
  {
    title: "Le récit d’aventure",
    summary: "Le héros, les péripéties, le suspense et le schéma narratif.",
    strand: "Lecture",
    lessons: [
      {
        title: "Lire un récit d’aventure",
        minutes: 12,
        body: `${liste([
            "Le héros affronte des obstacles et des dangers : ce sont les <strong>péripéties</strong>.",
            "Le <strong>suspense</strong> tient le lecteur en haleine : on veut savoir la suite.",
            "Le narrateur peut être un personnage (« je ») ou extérieur à l’histoire (« il »).",
          ])}
          ${retenir("Le schéma narratif : situation initiale → élément déclencheur → péripéties → dénouement → situation finale.")}`,
      },
    ],
  },
  {
    title: "Initiation à la poésie",
    summary: "Vers, strophes, rimes et images poétiques.",
    strand: "Lecture",
    lessons: [
      {
        title: "Lire un poème",
        minutes: 12,
        body: `${liste([
            "Un poème est écrit en <strong>vers</strong>, regroupés en <strong>strophes</strong> ;",
            "les <strong>rimes</strong> sont les sons répétés en fin de vers ;",
            "les <strong>images</strong> (comparaisons, métaphores) font voir et ressentir.",
          ])}
          ${exemple(["« Femme nue, femme noire / Vêtue de ta couleur qui est vie… » (Senghor)."])}
          ${retenir("Pour dire un poème, on respecte le rythme et la ponctuation.")}`,
      },
    ],
  },
  {
    title: "Initiation au théâtre",
    summary: "Répliques, didascalies, actes et scènes ; la comédie.",
    strand: "Lecture",
    lessons: [
      {
        title: "Lire une scène de théâtre",
        minutes: 12,
        body: `${tableau([
            ["Mot", "Sens"],
            ["réplique", "ce que dit un personnage"],
            ["didascalie", "indication de jeu ou de décor, en italique"],
            ["acte, scène", "grandes et petites parties de la pièce"],
            ["comédie", "pièce qui fait rire et critique les défauts"],
          ])}
          ${retenir("Le théâtre est écrit pour être joué devant un public.")}`,
      },
    ],
  },
  {
    title: "Les groupes de verbes et les temps de l’indicatif",
    summary: "Reconnaître le groupe d’un verbe ; temps simples et temps composés de l’indicatif.",
    strand: "Conjugaison",
    lessons: [
      {
        title: "Groupes et temps de l’indicatif",
        minutes: 15,
        body: `${liste([
            "1<sup>er</sup> groupe : infinitif en -er (sauf aller) ; 2<sup>e</sup> groupe : -ir avec -issons ; 3<sup>e</sup> groupe : tous les autres.",
            "temps simples : présent, imparfait, passé simple, futur ;",
            "temps composés (auxiliaire + participe passé) : passé composé, plus-que-parfait, passé antérieur, futur antérieur.",
          ])}
          ${tableau([
            ["Temps simple", "Temps composé correspondant"],
            ["présent : je finis", "passé composé : j’ai fini"],
            ["imparfait : je finissais", "plus-que-parfait : j’avais fini"],
            ["futur : je finirai", "futur antérieur : j’aurai fini"],
          ])}`,
      },
    ],
  },
  {
    title: "Les compléments circonstanciels",
    summary: "Lieu, temps, manière, cause et but.",
    strand: "Grammaire",
    lessons: [
      {
        title: "Les compléments circonstanciels",
        minutes: 12,
        body: `${tableau([
            ["Circonstance", "Question", "Exemple"],
            ["lieu", "où ?", "dans la cour"],
            ["temps", "quand ?", "le soir"],
            ["manière", "comment ?", "avec patience"],
            ["cause", "pourquoi ?", "à cause de la pluie"],
            ["but", "dans quel but ?", "pour réussir"],
          ])}
          ${retenir("Les compléments circonstanciels sont souvent déplaçables et supprimables.")}`,
      },
    ],
  },
  {
    title: "La proposition subordonnée relative",
    summary: "Les pronoms relatifs et l’antécédent.",
    strand: "Grammaire",
    lessons: [
      {
        title: "La subordonnée relative",
        minutes: 12,
        body: `<p>La proposition <strong>subordonnée relative</strong> complète un nom (l’<strong>antécédent</strong>) ; elle commence par un pronom relatif : qui, que, quoi, dont, où, lequel…</p>
          ${exemple(["Le livre <strong>que tu lis</strong> est passionnant. La ville <strong>où je suis né</strong> est Kaolack."])}
          ${retenir("« Qui » est sujet du verbe de la relative ; « que » en est le COD.")}`,
      },
    ],
  },
  {
    title: "L’accord du participe passé",
    summary: "Avec être, avec avoir, employé seul.",
    strand: "Orthographe",
    lessons: [
      {
        title: "Accorder le participe passé",
        minutes: 12,
        body: `${liste([
            "avec <strong>être</strong> : accord avec le sujet (Elles sont venues) ;",
            "avec <strong>avoir</strong> : accord avec le COD placé avant (Les lettres que j’ai écrites) ; sinon, pas d’accord (J’ai écrit des lettres) ;",
            "employé seul : accord comme un adjectif (des portes fermées).",
          ])}
          ${methode(["Repérer l’auxiliaire.", "Avec avoir, chercher le COD et sa place."])}`,
      },
    ],
  },
  {
    title: "La formation des mots",
    summary: "Familles de mots, radical, préfixes et suffixes.",
    strand: "Vocabulaire",
    lessons: [
      {
        title: "Familles de mots, préfixes, suffixes",
        minutes: 12,
        body: `${liste([
            "les mots d’une même famille ont le même <strong>radical</strong> : mer, marin, maritime, amerrir ;",
            "le <strong>préfixe</strong> se place avant le radical (re-, dé-, in-, pré-) ;",
            "le <strong>suffixe</strong> se place après (-age, -ment, -eur, -able).",
          ])}
          ${retenir("Un préfixe change le sens ; un suffixe change souvent la nature du mot (laver → lavage, nom).")}`,
      },
    ],
  },
  {
    title: "Le résumé et la lettre",
    summary: "Résumer un texte court ; écrire une lettre personnelle ou officielle.",
    strand: "Expression écrite",
    lessons: [
      {
        title: "Résumer un texte",
        minutes: 12,
        body: `${methode(["Lire le texte et trouver son idée principale.", "Repérer les idées importantes de chaque paragraphe.", "Les reformuler avec ses mots, dans l’ordre, sans exemples ni avis personnel."])}
          ${retenir("Un résumé est plus court que le texte et reste fidèle à son sens.")}`,
      },
      {
        title: "Écrire une lettre",
        minutes: 12,
        body: `${liste(["lieu et date ; formule d’appel ; corps de la lettre en paragraphes ; formule de politesse ; signature ;", "lettre personnelle (à un parent, un ami) ou officielle (au directeur, au maire) : le ton change."])}
          ${exemple(["« Monsieur le Principal, j’ai l’honneur de solliciter… Veuillez agréer, Monsieur le Principal, l’expression de mon profond respect. »"])}`,
      },
    ],
  },
];
