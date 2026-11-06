import "server-only";

// Bac blanc DIANGAL n°1, sciences physiques des séries S2, S4 et S5 : forme de l'épreuve de l'Office du Bac
// (4 heures, 5 exercices de 4 points : chimie organique, acides et bases, mécanique, électricité, physique
// moderne). Énoncés et corrigés rédigés par DIANGAL ; résultats recalculés par tests/unit/bac-blancs.test.ts.

import type { MockExamSpec } from "../../exercise-series";
import { head, reading } from "../../cm2/cfee/helpers";

const DATA = "Données : M(C) = 12 g/mol ; M(H) = 1 g/mol ; M(O) = 16 g/mol.";

export const PHYSIQUE_S: Omit<MockExamSpec, "series">[] = [
  {
    id: "bac-blanc-1-physique-s",
    subject: "PC",
    title: "Bac blanc DIANGAL n°1 : sciences physiques",
    durationMin: 240,
    parts: [
      {
        chapter: "Acides carboxyliques et dérivés",
        stem:
          head("Exercice 1 : préparation d’un arôme de poire", 4) +
          reading(
            "Dans un laboratoire de Thiès, on chauffe à reflux un mélange de 0,50 mol d’acide éthanoïque, de 0,50 mol de propan-1-ol et de quelques gouttes d’acide sulfurique concentré. On obtient un ester, l’éthanoate de propyle, à l’odeur de poire.",
            DATA,
          ),
        questions: [
          {
            qcm: "1. La formule semi-développée de l’éthanoate de propyle est :",
            choices: ["CH₃−CH₂−COO−CH₃", "*CH₃−COO−CH₂−CH₂−CH₃", "CH₃−CH₂−CH₂−COOH", "CH₃−CO−O−CH₂−CH₃"],
            pts: 0.5,
            why: "L’ester provient de l’acide éthanoïque (CH₃−COOH) et du propan-1-ol (CH₃−CH₂−CH₂−OH) : CH₃−COO−CH₂−CH₂−CH₃.",
          },
          {
            qcm: "2. Le rôle de l’acide sulfurique est :",
            choices: ["d’augmenter le rendement", "*de catalyseur : il accélère la réaction sans changer l’état final", "de déplacer l’équilibre", "de réactif"],
            pts: 0.5,
            why: "L’acide sulfurique est un catalyseur : il rend l’estérification plus rapide, mais ne modifie pas la composition du mélange à l’équilibre.",
          },
          {
            qcm: "3. L’estérification est une réaction :",
            choices: ["rapide, totale et exothermique", "*lente, limitée et presque athermique", "rapide et limitée", "lente et totale"],
            pts: 1,
            why: "Estérification et hydrolyse sont deux réactions inverses, lentes, limitées et presque athermiques : elles conduisent à un équilibre chimique.",
          },
          {
            num: "4. Calcule la masse molaire de l’éthanoate de propyle (C₅H₁₀O₂), en g/mol.",
            answer: 102,
            pts: 1,
            why: "M = 5 × 12 + 10 × 1 + 2 × 16 = 60 + 10 + 32 = 102 g/mol.",
          },
          {
            num: "5. On recueille 34,0 g d’ester. Calcule le rendement de la synthèse, en %, arrondi à l’unité.",
            answer: 67,
            pts: 1,
            why: "n(ester) = 34,0 / 102 ≈ 0,333 mol. Le mélange est équimolaire : au plus 0,50 mol d’ester. Rendement = 0,333 / 0,50 ≈ 0,67, soit 67 %, la valeur habituelle avec un alcool primaire.",
          },
        ],
      },
      {
        chapter: "Acides et bases faibles, couples acide-base",
        stem:
          head("Exercice 2 : l’acide méthanoïque", 4) +
          reading("Une solution d’acide méthanoïque HCOOH de concentration Ca = 1,0 × 10⁻² mol/L a un pH de 2,9 à 25 °C."),
        questions: [
          {
            num: "1. Calcule la concentration en ions H₃O⁺, en mmol/L, arrondie au centième.",
            answer: 1.26,
            pts: 0.5,
            why: "[H₃O⁺] = 10^(−pH) = 10^(−2,9) ≈ 1,26 × 10⁻³ mol/L, soit 1,26 mmol/L.",
          },
          {
            qcm: "2. L’acide méthanoïque est un acide faible car :",
            choices: ["*[H₃O⁺] est inférieure à Ca : l’acide ne réagit pas totalement avec l’eau", "son pH est inférieur à 7", "sa solution conduit le courant", "[H₃O⁺] est égale à Ca"],
            pts: 0.5,
            why: "Pour un acide fort, on aurait [H₃O⁺] = Ca = 10⁻² mol/L et pH = 2. Ici [H₃O⁺] ≈ 1,26 × 10⁻³ mol/L < Ca : la réaction avec l’eau est limitée.",
          },
          {
            num: "3. Calcule le coefficient d’ionisation α de l’acide, en %, arrondi à l’unité.",
            answer: 13,
            pts: 0.75,
            why: "α = [HCOO⁻] / Ca = [H₃O⁺] / Ca ≈ 1,26 × 10⁻³ / 1,0 × 10⁻² ≈ 0,126, soit environ 13 %.",
          },
          {
            num: "4. Calcule le pKa du couple HCOOH/HCOO⁻, arrondi au centième.",
            answer: 3.74,
            pts: 1,
            why: "Ka = [H₃O⁺][HCOO⁻] / [HCOOH] = (1,26 × 10⁻³)² / (1,0 × 10⁻² − 1,26 × 10⁻³) ≈ 1,81 × 10⁻⁴, donc pKa = −log Ka ≈ 3,74 (la valeur des tables est 3,75).",
          },
          {
            num: "5. On dose Va = 20,0 mL de cette solution par une solution d’hydroxyde de sodium de concentration Cb = 1,0 × 10⁻² mol/L. Quel est le volume versé à l’équivalence, en mL ?",
            answer: 20,
            pts: 0.5,
            why: "À l’équivalence, Ca × Va = Cb × VbE, donc VbE = 1,0 × 10⁻² × 20,0 / 1,0 × 10⁻² = 20,0 mL.",
          },
          {
            qcm: "6. Le pH à la demi-équivalence vaut :",
            choices: ["7", "*le pKa, soit environ 3,7", "2,9", "plus de 7"],
            pts: 0.75,
            why: "À la demi-équivalence, [HCOOH] = [HCOO⁻], donc pH = pKa ≈ 3,7 : c’est une solution tampon.",
          },
        ],
      },
      {
        chapter: "Applications des bases de la dynamique",
        stem:
          head("Exercice 3 : un coup franc", 4) +
          reading(
            "Sur un terrain de football de Ziguinchor, un joueur frappe le ballon posé au sol. Le ballon part avec une vitesse de 15 m/s faisant un angle de 30° avec l’horizontale. On néglige les frottements de l’air et on prend g = 10 m/s².",
          ),
        questions: [
          {
            qcm: "1. Selon l’horizontale, le mouvement du centre du ballon est :",
            choices: ["uniformément accéléré", "*uniforme", "uniformément ralenti", "circulaire"],
            pts: 0.5,
            why: "La seule force est le poids, vertical. L’accélération est verticale : la composante horizontale de la vitesse, v₀ cos α, reste constante.",
          },
          {
            qcm: "2. L’équation de la trajectoire (x et y en mètres, origine au point de frappe) est :",
            choices: ["y = −0,0296 x² + 1,73 x", "*y = −0,0296 x² + 0,577 x", "y = −0,0222 x² + 0,577 x", "y = 0,0296 x² + 0,577 x"],
            pts: 0.5,
            why: "y = −g x² / (2 v₀² cos² α) + x tan α = −10 x² / (2 × 225 × 0,75) + x tan 30° ≈ −0,0296 x² + 0,577 x.",
          },
          {
            num: "3. Calcule la hauteur maximale atteinte par le ballon, en m, arrondie au centième.",
            answer: 2.81,
            pts: 1,
            why: "Au sommet, la vitesse verticale est nulle : h = (v₀ sin α)² / (2g) = (15 × 0,5)² / 20 = 56,25 / 20 ≈ 2,81 m.",
          },
          {
            num: "4. Calcule la distance horizontale à laquelle le ballon retombe au sol, en m, arrondie au centième.",
            answer: 19.49,
            pts: 1,
            why: "La portée vaut v₀² sin 2α / g = 225 × sin 60° / 10 ≈ 225 × 0,866 / 10 ≈ 19,49 m.",
          },
          {
            num: "5. Calcule la durée du vol, en s.",
            answer: 1.5,
            pts: 1,
            why: "Le ballon retombe quand y = 0 : t = 2 v₀ sin α / g = 2 × 15 × 0,5 / 10 = 1,5 s.",
          },
        ],
      },
      {
        chapter: "Étude du dipôle (R, C)",
        stem:
          head("Exercice 4 : charge d’un condensateur", 4) +
          reading(
            "Un condensateur de capacité C = 100 µF, d’abord déchargé, est chargé à travers un conducteur ohmique de résistance R = 1,0 kΩ par un générateur de tension constante E = 12 V. On ferme l’interrupteur à la date t = 0.",
          ),
        questions: [
          {
            qcm: "1. L’équation différentielle vérifiée par la tension uC aux bornes du condensateur est :",
            choices: ["*RC duC/dt + uC = E", "RC duC/dt − uC = E", "duC/dt + RC uC = E", "RC duC/dt + uC = 0"],
            pts: 0.75,
            why: "La loi des mailles donne E = uR + uC = R i + uC, avec i = C duC/dt : RC duC/dt + uC = E.",
          },
          {
            num: "2. Calcule la constante de temps τ du circuit, en s.",
            answer: 0.1,
            pts: 0.75,
            why: "τ = RC = 1,0 × 10³ × 100 × 10⁻⁶ = 0,10 s.",
          },
          {
            num: "3. Calcule la tension uC à la date t = τ, en V, arrondie au centième.",
            answer: 7.59,
            pts: 1,
            why: "uC(t) = E(1 − e^(−t/τ)), donc uC(τ) = 12 × (1 − e⁻¹) ≈ 12 × 0,632 ≈ 7,59 V : 63 % de la tension finale.",
          },
          {
            num: "4. On considère la charge terminée au bout de 5τ. Au bout de combien de secondes ?",
            answer: 0.5,
            pts: 0.5,
            why: "5τ = 5 × 0,10 = 0,50 s : uC vaut alors plus de 99 % de E.",
          },
          {
            num: "5. Calcule l’énergie emmagasinée par le condensateur en fin de charge, en mJ.",
            answer: 7.2,
            pts: 1,
            why: "W = ½ C E² = 0,5 × 100 × 10⁻⁶ × 12² = 7,2 × 10⁻³ J = 7,2 mJ.",
          },
        ],
      },
      {
        chapter: "Effet photoélectrique",
        stem:
          head("Exercice 5 : une cellule photoélectrique", 4) +
          reading(
            "La cathode d’une cellule photoélectrique est en césium, dont le travail d’extraction vaut W₀ = 1,9 eV. On l’éclaire avec une lumière bleue de longueur d’onde λ = 450 nm.",
            "Données : h = 6,63 × 10⁻³⁴ J·s ; c = 3,00 × 10⁸ m/s ; 1 eV = 1,60 × 10⁻¹⁹ J.",
          ),
        questions: [
          {
            num: "1. Calcule l’énergie d’un photon de cette lumière, en eV, arrondie au centième.",
            answer: 2.76,
            pts: 1,
            why: "E = hc / λ = 6,63 × 10⁻³⁴ × 3,00 × 10⁸ / 450 × 10⁻⁹ ≈ 4,42 × 10⁻¹⁹ J, soit 4,42 × 10⁻¹⁹ / 1,60 × 10⁻¹⁹ ≈ 2,76 eV.",
          },
          {
            num: "2. Calcule l’énergie cinétique maximale des électrons émis, en eV, arrondie au centième.",
            answer: 0.86,
            pts: 1,
            why: "Ec max = E − W₀ ≈ 2,76 − 1,9 = 0,86 eV.",
          },
          {
            num: "3. Calcule la longueur d’onde seuil λ₀ du césium, en nm, arrondie à l’unité.",
            answer: 654,
            pts: 1,
            why: "λ₀ = hc / W₀ = 6,63 × 10⁻³⁴ × 3,00 × 10⁸ / (1,9 × 1,60 × 10⁻¹⁹) ≈ 6,54 × 10⁻⁷ m, soit environ 654 nm.",
          },
          {
            vf: "4. Une lumière rouge de longueur d’onde 700 nm produit l’effet photoélectrique sur cette cathode.",
            answer: false,
            pts: 0.5,
            why: "700 nm > λ₀ ≈ 654 nm : l’énergie de chaque photon est inférieure à W₀, aucun électron n’est arraché, quelle que soit l’intensité de la lumière.",
          },
          {
            qcm: "5. L’effet photoélectrique met en évidence :",
            choices: ["l’aspect ondulatoire de la lumière", "*l’aspect corpusculaire de la lumière (photons)", "la diffraction", "les interférences"],
            pts: 0.5,
            why: "L’existence d’un seuil qui ne dépend pas de l’intensité s’explique par des échanges d’énergie par quanta, les photons : c’est l’aspect corpusculaire.",
          },
        ],
      },
    ],
  },
];
