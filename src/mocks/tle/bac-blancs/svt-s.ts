import "server-only";

// Bac blanc DIANGAL n°1, SVT des séries S2, S4 et S5 : forme de l'épreuve de l'Office du Bac (4 heures ;
// I. maîtrise des connaissances sur 5 points, un exposé ; II. compétences méthodologiques sur 13 points,
// deux exercices ; III. communication sur 2 points). Énoncés et corrigés rédigés par DIANGAL.

import type { MockExamSpec } from "../../exercise-series";
import { head, reading } from "../../cm2/cfee/helpers";

const list = (...items: string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

export const SVT_S: Omit<MockExamSpec, "series">[] = [
  {
    id: "bac-blanc-1-svt-s",
    subject: "SVT",
    title: "Bac blanc DIANGAL n°1 : SVT",
    durationMin: 240,
    parts: [
      {
        chapter: "Régulation de la glycémie",
        stem:
          head(
            "I. Maîtrise des connaissances",
            5,
            "Traite le sujet sur ta feuille, puis compare ton exposé au corrigé et note chaque palier : « réussi » seulement si tout ce qu’il demande y est.",
          ) +
          reading(
            "Après un repas riche en riz ou en pain, la glycémie d’un élève s’élève ; après un long match de football, elle tend à baisser. Pourtant, chez une personne en bonne santé, elle reste proche de 1 g/L.",
            "Dans un exposé structuré et illustré, explique comment l’organisme corrige une hyperglycémie, puis une hypoglycémie.",
          ),
        questions: [
          {
            self: "Introduction (1 point) : la glycémie est définie, sa valeur normale est donnée (environ 1 g/L) et le problème est posé.",
            pts: 1,
            why: "La glycémie est le taux de glucose dans le sang. Elle reste voisine de 1 g/L malgré les apports (repas) et les dépenses (effort). Problème : par quels mécanismes l’organisme ramène-t-il la glycémie à sa valeur normale ?",
          },
          {
            self: "Correction de l’hyperglycémie (1,5 point) : cellules β des îlots de Langerhans, insuline, et ses effets sur le foie, les muscles et le tissu adipeux.",
            pts: 1.5,
            why: list(
              "Les cellules β des îlots de Langerhans du pancréas détectent l’élévation de la glycémie et sécrètent davantage d’insuline.",
              "L’insuline est hypoglycémiante : elle favorise l’entrée du glucose dans les cellules, son stockage sous forme de glycogène dans le foie et les muscles (glycogénogenèse) et sa transformation en lipides dans le tissu adipeux.",
              "La glycémie redescend vers 1 g/L, et la sécrétion d’insuline diminue.",
            ),
          },
          {
            self: "Correction de l’hypoglycémie (1,5 point) : cellules α, glucagon, glycogénolyse dans le foie et néoglucogenèse.",
            pts: 1.5,
            why: list(
              "Les cellules α des îlots de Langerhans détectent la baisse de la glycémie et sécrètent du glucagon.",
              "Le glucagon est hyperglycémiant : il agit sur le foie, qui hydrolyse son glycogène en glucose (glycogénolyse) et en fabrique à partir d’autres molécules (néoglucogenèse) ; le glucose est libéré dans le sang.",
              "La glycémie remonte vers 1 g/L.",
            ),
          },
          {
            self: "Schéma et conclusion (1 point) : un schéma fonctionnel montre la boucle de régulation (capteurs, messages hormonaux, effecteurs) ; la conclusion répond au problème.",
            pts: 1,
            why: "Schéma attendu : glycémie → îlots de Langerhans (capteurs et centre) → insuline ou glucagon (messages) → foie, muscles, tissu adipeux (effecteurs) → retour de la glycémie vers 1 g/L, avec une flèche de rétrocontrôle. Conclusion : la glycémie est maintenue par deux hormones aux effets opposés ; un défaut d’insuline conduit au diabète.",
          },
        ],
      },
      {
        chapter: "Génétique",
        stem:
          head("II. Compétences méthodologiques : exercice 1", 6) +
          reading(
            "On croise deux lignées pures de drosophiles : l’une a des ailes longues et un corps gris, l’autre des ailes vestigiales et un corps noir. Toutes les drosophiles de la première génération (F1) ont des ailes longues et un corps gris.",
            "On croise ensuite une femelle de F1 avec un mâle aux ailes vestigiales et au corps noir. On obtient : 41 % d’ailes longues et corps gris, 41 % d’ailes vestigiales et corps noir, 9 % d’ailes longues et corps noir, 9 % d’ailes vestigiales et corps gris.",
          ),
        questions: [
          {
            qcm: "1. Les résultats de la F1 montrent que :",
            choices: ["*les allèles « ailes longues » et « corps gris » sont dominants", "les allèles « ailes vestigiales » et « corps noir » sont dominants", "les deux caractères sont codominants", "les gènes sont portés par le chromosome X"],
            pts: 1,
            why: "Les parents sont de lignée pure et toute la F1 est identique (première loi de Mendel) : le phénotype de la F1, ailes longues et corps gris, est dominant.",
          },
          {
            qcm: "2. Si les deux gènes étaient indépendants, le second croisement (test-cross) donnerait :",
            choices: ["deux phénotypes à 50 % chacun", "*quatre phénotypes à 25 % chacun", "quatre phénotypes à 41 %, 41 %, 9 % et 9 %", "un seul phénotype"],
            pts: 1,
            why: "Avec deux gènes indépendants, la femelle F1 produit quatre sortes de gamètes en proportions égales ; le mâle double récessif ne révèle que ces gamètes : quatre phénotypes à 25 %.",
          },
          {
            qcm: "3. Les proportions obtenues (41 %, 41 %, 9 %, 9 %) montrent que :",
            choices: ["les gènes sont indépendants", "*les gènes sont liés, avec des crossing-over pendant la méiose de la femelle", "les gènes sont liés sans aucun crossing-over", "l’un des allèles est létal"],
            pts: 1,
            why: "Les phénotypes parentaux sont majoritaires et les phénotypes recombinés minoritaires : les deux gènes sont sur le même chromosome, et des crossing-over pendant la méiose de la femelle F1 produisent les recombinés.",
          },
          {
            num: "4. Calcule le pourcentage de recombinaison, en %.",
            answer: 18,
            pts: 1,
            why: "Recombinés = ailes longues et corps noir + ailes vestigiales et corps gris = 9 + 9 = 18 %. La distance entre les deux gènes est d’environ 18 centimorgans.",
          },
          {
            num: "5. Sur 1 000 descendants du test-cross, combien de drosophiles aux ailes longues et au corps noir attend-on ?",
            answer: 90,
            pts: 1,
            why: "Ce phénotype représente 9 % des descendants : 1 000 × 9 ÷ 100 = 90 drosophiles.",
          },
          {
            self: "6. Interprétation chromosomique (1 point) : génotypes des parents et de la F1 écrits avec deux chromosomes, gamètes de la femelle F1 avec leurs proportions, échiquier du test-cross.",
            pts: 1,
            why: "Notation : L (longues) > vg (vestigiales), G (gris) > n (noir). Parents : LG//LG et vg n//vg n ; F1 : LG//vg n. Gamètes de la femelle F1 : LG 41 %, vg n 41 % (parentaux), L n 9 %, vg G 9 % (recombinés) ; gamètes du mâle : vg n 100 %. Les phénotypes du test-cross reproduisent exactement les gamètes de la femelle.",
          },
        ],
      },
      {
        chapter: "Le tissu nerveux et ses propriétés",
        stem:
          head("II. Compétences méthodologiques : exercice 2", 7) +
          reading(
            "On stimule une fibre nerveuse isolée et on enregistre, avec une électrode placée à l’intérieur de la fibre, la variation de son potentiel. Au repos, le potentiel vaut −70 mV ; au sommet du potentiel d’action, il atteint +30 mV.",
            "Deux électrodes d’enregistrement R1 et R2 sont placées à 4 cm l’une de l’autre sur la même fibre. Le potentiel d’action arrive en R2 2 ms après son passage en R1.",
          ),
        questions: [
          {
            num: "1. Calcule l’amplitude du potentiel d’action, en mV.",
            answer: 100,
            pts: 1,
            why: "Amplitude = valeur au sommet − potentiel de repos = 30 − (−70) = 100 mV.",
          },
          {
            qcm: "2. La phase de dépolarisation est due :",
            choices: ["à une sortie d’ions potassium", "*à une entrée massive d’ions sodium par des canaux qui s’ouvrent", "au fonctionnement de la pompe sodium-potassium", "à une entrée d’ions chlorure"],
            pts: 1,
            why: "Les canaux sodium voltage-dépendants s’ouvrent : les ions Na⁺, plus concentrés à l’extérieur, entrent en masse et l’intérieur devient positif.",
          },
          {
            qcm: "3. La phase de repolarisation est due :",
            choices: ["*à une sortie d’ions potassium", "à une entrée d’ions sodium", "à une entrée d’ions calcium", "à l’arrêt de la stimulation"],
            pts: 1,
            why: "Les canaux sodium se ferment et des canaux potassium s’ouvrent : les ions K⁺ sortent et le potentiel redevient négatif.",
          },
          {
            num: "4. Calcule la vitesse de propagation du potentiel d’action, en m/s.",
            answer: 20,
            pts: 1.5,
            why: "v = distance ÷ durée = 0,04 m ÷ 0,002 s = 20 m/s.",
          },
          {
            qcm: "5. Sur une autre fibre, le message se propage à 100 m/s. Cette fibre est :",
            choices: ["amyélinisée, à conduction de proche en proche", "*myélinisée, à conduction saltatoire d’un nœud de Ranvier à l’autre", "une fibre musculaire", "une fibre plus courte"],
            pts: 1,
            why: "La gaine de myéline isole la fibre : le potentiel d’action « saute » d’un nœud de Ranvier au suivant, ce qui rend la propagation bien plus rapide.",
          },
          {
            vf: "6. Si l’on augmente l’intensité de la stimulation au-dessus du seuil, l’amplitude du potentiel d’action enregistré sur la fibre isolée augmente.",
            answer: false,
            pts: 1,
            why: "Une fibre isolée obéit à la loi du tout ou rien : au-dessus du seuil, l’amplitude reste la même ; c’est la fréquence des potentiels d’action qui code l’intensité.",
          },
          {
            self: "7. Schéma (0,5 point) : le potentiel d’action est tracé et légendé (potentiel de repos, dépolarisation, repolarisation, hyperpolarisation, axes avec leurs unités).",
            pts: 0.5,
            why: "Axe horizontal : temps en ms ; axe vertical : potentiel en mV. On lit le potentiel de repos (−70 mV), la dépolarisation jusqu’à +30 mV, la repolarisation, une courte hyperpolarisation sous −70 mV, puis le retour au repos.",
          },
        ],
      },
      {
        stem: head(
          "III. Communication",
          2,
          "Relis ta copie entière : ces points récompensent la manière dont tu as présenté ton travail.",
        ),
        questions: [
          {
            self: "Plan de l’exposé (1 point) : une introduction, un développement en parties annoncées par des titres, une conclusion.",
            pts: 1,
            why: "L’exposé suit un plan visible : introduction qui pose le problème, développement en deux parties (hyperglycémie, hypoglycémie) avec des titres, conclusion.",
          },
          {
            self: "Qualité de l’expression (0,5 point) : phrases correctes, vocabulaire scientifique exact.",
            pts: 0.5,
            why: "Les termes justes sont employés (glycogénogenèse, glycogénolyse, cellules α et β, hormone hypoglycémiante) et les phrases sont complètes.",
          },
          {
            self: "Présentation de la copie (0,5 point) : écriture lisible, schémas tracés au crayon, titrés et légendés.",
            pts: 0.5,
            why: "La copie est propre et lisible ; chaque schéma a un titre et des légendes reliées par des traits à la règle.",
          },
        ],
      },
    ],
  },
];
