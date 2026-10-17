// SVT de 6e : chapitres du relevé DIANGAL (docs/programme/releve-ci-3e.md : titres de Sunudaara, à
// confirmer avec le programme officiel) : classification et répartition des êtres vivants, relations dans
// l’environnement, production d’aliments par les végétaux et son amélioration. Leçons rédigées par
// DIANGAL, à faire valider par un professeur de SVT.

import { type ChapterSpec, exemple, formula, liste, methode, retenir, tableau } from "../tle/blocks";

export const SVT_6E: ChapterSpec[] = [
  {
    title: "La classification des êtres vivants",
    summary: "Ranger les êtres vivants en groupes selon des caractères observables.",
    lessons: [
      {
        title: "Classer les êtres vivants",
        minutes: 15,
        body: `<p>Classer, c’est regrouper les êtres vivants qui ont des <strong>caractères communs</strong> (ce qu’ils possèdent).</p>
          ${tableau([
            ["Groupe", "Caractère", "Exemples"],
            ["vertébrés", "squelette interne avec colonne vertébrale", "poisson, grenouille, lézard, poule, chèvre"],
            ["mammifères", "poils, mamelles", "chèvre, chauve-souris, dauphin"],
            ["oiseaux", "plumes, bec", "poule, mange-mil"],
            ["invertébrés", "pas de colonne vertébrale", "criquet, araignée, escargot, ver de terre"],
            ["plantes à fleurs", "fleurs et graines", "mil, baobab, manguier"],
          ])}
          ${methode(["Observer les caractères de chaque être vivant.", "Les regrouper selon un caractère commun.", "Utiliser une clé de détermination (questions à choix : a-t-il des plumes ? oui / non)."])}
          ${retenir("La chauve-souris vole mais c’est un mammifère : on classe d’après ce que les êtres possèdent, pas d’après ce qu’ils font.")}`,
      },
    ],
  },
  {
    title: "La répartition des êtres vivants",
    summary: "Les êtres vivants et les conditions du milieu : eau, lumière, température, sol.",
    lessons: [
      {
        title: "Les êtres vivants et leur milieu",
        minutes: 12,
        body: `${liste([
            "Chaque espèce vit là où les conditions lui conviennent : c’est son <strong>milieu de vie</strong>.",
            "Facteurs du milieu : eau (humidité), lumière, température, nature du sol.",
            "La mangrove pousse dans l’eau salée des estuaires ; les cactus et les épineux résistent à la sécheresse ; le palétuvier a des racines aériennes.",
            "Certains animaux changent de milieu selon les saisons : migrations des oiseaux (parc du Djoudj).",
          ])}
          ${exemple(["Sous une pierre humide et sombre, on trouve des cloportes ; ils fuient la lumière et la sécheresse."])}
          ${retenir("La répartition des êtres vivants dépend des conditions du milieu.")}`,
      },
    ],
  },
  {
    title: "Les relations entre les êtres vivants dans l’environnement",
    summary: "Chaînes et réseaux alimentaires, producteurs, consommateurs, décomposeurs, autres relations.",
    lessons: [
      {
        title: "Chaînes et réseaux alimentaires",
        minutes: 15,
        body: `<p>Une <strong>chaîne alimentaire</strong> est une suite d’êtres vivants dans laquelle chacun mange le précédent : herbe → criquet → lézard → serpent → aigle.</p>
          ${liste([
            "<strong>producteurs</strong> : les plantes vertes ;",
            "<strong>consommateurs</strong> primaires (herbivores), secondaires (carnivores)… ;",
            "<strong>décomposeurs</strong> : bactéries, champignons, vers de terre, qui recyclent la matière morte.",
          ])}
          ${retenir("Plusieurs chaînes reliées forment un <strong>réseau alimentaire</strong>. Les êtres vivants ont aussi d’autres relations : compétition, parasitisme (tique sur le bœuf), symbiose (lichen).")}`,
      },
    ],
  },
  {
    title: "La production d’aliments par les végétaux chlorophylliens",
    summary: "Les besoins de la plante verte et la photosynthèse.",
    lessons: [
      {
        title: "Les besoins nutritifs de la plante verte",
        minutes: 12,
        body: `${liste([
            "La plante puise par ses racines l’<strong>eau</strong> et les <strong>sels minéraux</strong> du sol : c’est la sève brute.",
            "Les feuilles absorbent le <strong>dioxyde de carbone</strong> de l’air.",
            "Elles ont besoin de <strong>lumière</strong> et de <strong>chlorophylle</strong> (pigment vert).",
          ])}
          ${exemple(["Une plante privée de lumière jaunit et dépérit ; une plante sans eau se fane."])}
          ${retenir("La plante verte fabrique sa propre matière à partir de matière minérale : elle est autotrophe.")}`,
      },
      {
        title: "La photosynthèse",
        minutes: 12,
        body: `${formula("eau + dioxyde de carbone + lumière → matière organique (amidon) + dioxygène")}
          ${methode(["Exposer une feuille à la lumière, en cacher une partie.", "Décolorer la feuille dans l’alcool chaud.", "Ajouter de l’eau iodée : la partie éclairée devient bleu-noir (présence d’amidon)."], "Mettre en évidence l’amidon")}
          ${retenir("Grâce à la photosynthèse, les plantes nourrissent presque tous les êtres vivants et produisent le dioxygène que nous respirons.")}`,
      },
    ],
  },
  {
    title: "L’amélioration de la production d’aliments",
    summary: "Améliorer la production végétale et animale : sélection, engrais, irrigation, élevage moderne.",
    lessons: [
      {
        title: "Produire plus et mieux",
        minutes: 12,
        body: `${tableau([
            ["Production végétale", "Production animale"],
            ["semences sélectionnées (variétés de mil, d’arachide résistantes à la sécheresse)", "sélection de races plus productives (vaches laitières, poulets de chair)"],
            ["engrais (fumier, compost, engrais chimiques)", "alimentation équilibrée (son, tourteau d’arachide)"],
            ["irrigation (vallée du fleuve, Niayes)", "vaccination et soins vétérinaires"],
            ["lutte contre les ravageurs (criquets)", "embouche, aviculture, aquaculture"],
          ])}
          ${retenir("Il faut augmenter la production tout en protégeant l’environnement : un excès d’engrais ou de pesticides pollue les sols et l’eau.")}`,
      },
    ],
  },
];
