// Mathématiques du CM2 : résolution de problèmes (paliers 3 et 4 de la progression officielle des
// cahiers PAAME, MEN 2024, conformes au CEB). Leçons rédigées par DIANGAL.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "./blocks";

const PB = "Résolution de problèmes";

export const MATH_CM2_PROBLEMES: ChapterSpec[] = [
  {
    title: "Comprendre l’énoncé d’un problème",
    summary: "Données utiles, inutiles ou manquantes ; consignes, questions intermédiaires et question finale.",
    strand: PB,
    lessons: [
      {
        title: "Trier les données",
        minutes: 12,
        body: `<p>Un énoncé contient des <strong>données</strong> (nombres, informations). Certaines servent à répondre (données <strong>utiles</strong>), d’autres non (données <strong>inutiles</strong>) ; parfois il en manque une (donnée <strong>manquante</strong>).</p>
          ${exemple([
            "« Modou a 12 ans. Il achète 3 cahiers à 250 F l’un. Combien paie-t-il ? »",
            "Données utiles : 3 cahiers et 250 F. Donnée inutile : 12 ans. Réponse : 3 × 250 = 750 F.",
            "« Modou achète des cahiers à 250 F l’un. Combien paie-t-il ? » : il manque le nombre de cahiers.",
          ])}
          ${retenir("Avant de calculer, souligne les données utiles et barre les données inutiles.")}`,
      },
      {
        title: "Consignes, question finale et questions intermédiaires",
        minutes: 12,
        body: `<p>La <strong>question finale</strong> est ce qu’on cherche à la fin. Pour y arriver, il faut souvent répondre d’abord à des <strong>questions intermédiaires</strong>, qui ne sont pas toujours écrites.</p>
          ${exemple([
            "« Un éleveur a 45 moutons. Il en vend 15 à 60 000 F l’un. Combien gagne-t-il et combien de moutons lui reste-t-il ? »",
            "Question 1 : 15 × 60 000 = 900 000 F. Question 2 : 45 − 15 = 30 moutons.",
          ])}
          ${methode(["Lire l’énoncé deux fois.", "Repérer la question finale.", "Trouver les questions intermédiaires et les écrire dans l’ordre.", "Répondre à chaque question par une phrase."])}`,
      },
    ],
  },
  {
    title: "Tableaux, schémas et graphiques",
    summary: "Lire et utiliser des tableaux, des factures, des schémas et des graphiques.",
    strand: PB,
    lessons: [
      {
        title: "Lire un tableau et une facture",
        minutes: 12,
        body: `${tableau([
            ["Article", "Quantité", "Prix unitaire", "Montant"],
            ["Sac de riz (50 kg)", "2", "22 500 F", "45 000 F"],
            ["Bidon d’huile (5 L)", "1", "6 500 F", "6 500 F"],
            ["Total", "", "", "51 500 F"],
          ])}
          ${retenir("Montant = quantité × prix unitaire ; le total d’une facture est la somme des montants.")}
          ${exemple(["Si on paie avec 60 000 F, la monnaie rendue est 60 000 − 51 500 = 8 500 F."])}`,
      },
      {
        title: "Lire un graphique et faire un schéma",
        minutes: 12,
        body: `${liste([
            "un <strong>diagramme en bâtons</strong> compare des quantités (élèves par classe) ;",
            "une <strong>courbe</strong> montre une évolution dans le temps (température, pluie) ;",
            "un <strong>schéma</strong> (segments, dessins) aide à comprendre un partage ou un trajet.",
          ])}
          ${methode(["Lire le titre et ce que représentent les axes.", "Repérer l’unité et la graduation.", "Lire les valeurs utiles, puis calculer."], "Exploiter un graphique")}
          ${exemple(["Un graphique montre qu’il est tombé 120 mm de pluie en juillet et 210 mm en août : août a reçu 90 mm de plus."])}`,
      },
    ],
  },
  {
    title: "Démarches de résolution et vérification",
    summary: "Démarche progressive ou régressive, inventer un énoncé, repérer une erreur, vérifier une solution.",
    strand: PB,
    lessons: [
      {
        title: "Démarche progressive et démarche régressive",
        minutes: 15,
        body: `${tableau([
            ["Démarche", "Principe", "Exemple"],
            ["progressive", "on part des données pour aller vers la question", "J’ai 5 000 F, j’achète 2 livres à 1 500 F : il me reste 5 000 − 3 000 = 2 000 F."],
            ["régressive", "on part du résultat et on « remonte » en faisant les opérations inverses", "Il me reste 2 000 F après avoir dépensé 3 000 F : j’avais 2 000 + 3 000 = 5 000 F."],
          ])}
          ${retenir("Dans la démarche régressive, chaque opération est remplacée par son opération inverse : l’addition par la soustraction, la multiplication par la division.")}`,
      },
      {
        title: "Inventer un énoncé, trouver une erreur, vérifier",
        minutes: 12,
        body: `${liste([
            "à partir d’une opération (3 × 750 = 2 250), on peut <strong>inventer un énoncé</strong> : « Trois cahiers à 750 F coûtent… » ;",
            "pour <strong>trouver une erreur</strong>, on refait chaque étape et on vérifie l’opération choisie et les unités ;",
            "pour <strong>vérifier</strong> un résultat, on fait l’opération inverse ou on estime un ordre de grandeur.",
          ])}
          ${exemple(["Un élève trouve qu’un sac de 50 kg à 22 500 F coûte 1 125 000 F le kilo : c’est impossible. Le bon calcul est 22 500 ÷ 50 = 450 F le kilo."])}
          ${retenir("Une solution complète comprend : les calculs, une phrase-réponse avec l’unité, et une vérification.")}`,
      },
    ],
  },
];
