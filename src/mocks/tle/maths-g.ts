// Chapitres propres à la Terminale G (programme officiel de mathématiques de la série G, MEN, 2006,
// APAMS) : calcul matriciel et programmation linéaire, mathématiques financières. Leçons rédigées par
// DIANGAL, à faire valider par un enseignant.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, sup } from "./blocks";

export const MATRICES: ChapterSpec = {
  title: "Calcul matriciel et programmation linéaire",
  summary: "Matrices, opérations, déterminant, inverse ; programme linéaire et algorithme du simplexe.",
  lessons: [
    {
      title: "Matrices et déterminants",
      minutes: 15,
      body: `${liste([
          "une matrice est un tableau de nombres à n lignes et p colonnes ; on additionne deux matrices de même format terme à terme ;",
          "le produit AB existe si le nombre de colonnes de A égale le nombre de lignes de B ;",
          "déterminant d’une matrice 2 × 2 : ad − bc ; d’une matrice 3 × 3 : règle de Sarrus ou développement par les cofacteurs ;",
          "une matrice carrée est inversible si et seulement si son déterminant n’est pas nul.",
        ])}
        ${exemple(["Le système 2x + y = 5, x − y = 1 s’écrit AX = B ; det A = 2 × (−1) − 1 × 1 = −3 ≠ 0 : solution unique x = 2, y = 1."])}`,
    },
    {
      title: "L’algorithme du simplexe",
      minutes: 15,
      body: `${methode([
          "Écrire le programme linéaire : variables, fonction économique à maximiser, contraintes.",
          "Mettre sous forme standard en ajoutant une variable d’écart par contrainte.",
          "Construire le tableau initial (solution de départ : variables d’écart égales aux seconds membres).",
          "Choisir la variable entrante (plus grand coefficient positif de la fonction économique) et la variable sortante (plus petit rapport positif), puis pivoter.",
          "Recommencer jusqu’à ce qu’aucun coefficient de la fonction économique ne soit positif : la solution est optimale.",
        ])}
        ${retenir("La méthode graphique ne convient qu’à deux variables ; le simplexe traite des problèmes plus grands.")}`,
    },
  ],
};

export const FINANCE_TLE: ChapterSpec = {
  title: "Mathématiques financières : annuités et emprunts",
  summary: "Valeur acquise et valeur actuelle d’annuités constantes, emprunt indivis, tableau d’amortissement.",
  lessons: [
    {
      title: "Les annuités constantes",
      minutes: 15,
      body: `${formula(`V<sub>n</sub> = a × ${frac(`(1 + i)${sup("n")} − 1`, "i")} ; V<sub>0</sub> = a × ${frac(`1 − (1 + i)${sup("−n")}`, "i")}`)}
        ${liste(["a est l’annuité versée en fin de période, i le taux par période, n le nombre de versements ;", "V<sub>n</sub> est la valeur acquise au moment du dernier versement, V<sub>0</sub> la valeur actuelle une période avant le premier."])}
        ${exemple(["Verser 100 000 F à la fin de chaque année pendant 3 ans à 10 % : V₃ = 100 000 × (1,1³ − 1) ÷ 0,1 = 331 000 F."])}`,
    },
    {
      title: "L’emprunt indivis",
      minutes: 15,
      body: `${formula(`annuité constante a = V<sub>0</sub> × ${frac("i", `1 − (1 + i)${sup("−n")}`)}`)}
        ${liste([
          "chaque annuité = intérêt de la période (sur le capital restant dû) + amortissement du capital ;",
          "le tableau d’amortissement donne, pour chaque période, le capital restant dû, l’intérêt, l’amortissement et l’annuité ;",
          "avec des annuités constantes, les amortissements forment une suite géométrique de raison 1 + i.",
        ])}
        ${exemple(["Emprunt de 1 000 000 F à 10 % sur 2 ans : a ≈ 576 190 F ; première année : intérêt 100 000 F, amortissement 476 190 F."])}`,
    },
  ],
};
