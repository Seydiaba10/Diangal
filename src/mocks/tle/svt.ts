// SVT de Terminale, par série : thèmes et leçons des programmes officiels L2 (6 thèmes, 11 leçons),
// S1 (9 thèmes, 19 leçons) et S2 (13 thèmes, 30 leçons), mis en ligne par l'Office du Bac.
// Un thème = un chapitre. Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import type { ChapterSpec } from "./blocks";
import * as N from "./svt-nerveux";
import * as R from "./svt-reproduction";

const systemeNerveux: ChapterSpec = {
  title: "Organisation du système nerveux cérébro-spinal",
  summary: "Encéphale et moelle épinière : protection, organisation externe et interne, rôles.",
  lessons: [N.ENCEPHALE, N.MOELLE],
};

const tissuNerveux: ChapterSpec = {
  title: "Le tissu nerveux et ses propriétés",
  summary: "Neurone et nerf, excitabilité, potentiels de repos et d’action, conduction, synapse.",
  lessons: [N.STRUCTURE_TISSU_NERVEUX, N.PROPRIETES_TISSU_NERVEUX, N.PHENOMENES_ELECTRIQUES, N.CONDUCTION_INFLUX, N.SYNAPSE],
};

const muscle: ChapterSpec = {
  title: "Activité du muscle strié squelettique",
  summary: "Structure du muscle, unité motrice, contraction, énergie et chaleur.",
  lessons: [N.STRUCTURE_MUSCLE, N.FONCTIONNEMENT_MUSCLE],
};

const coeur: ChapterSpec = {
  title: "Activité cardiaque et régulation de la pression artérielle",
  summary: "Automatisme cardiaque, cycle cardiaque, régulation nerveuse et hormonale de la pression artérielle.",
  lessons: [N.AUTOMATISME_CARDIAQUE, N.PRESSION_ARTERIELLE],
};

const glycemie: ChapterSpec = {
  title: "Régulation de la glycémie",
  summary: "Insuline et glucagon, rôle du foie, diabète.",
  lessons: [N.GLYCEMIE],
};

const reproductionMammiferes = (complete: boolean): ChapterSpec => ({
  title: "Reproduction chez les mammifères",
  summary: complete
    ? "Gamétogenèse, fécondation, régulation hormonale, gestation, lactation et contraception."
    : "Gamétogenèse, fécondation et régulation hormonale des appareils reproducteurs.",
  lessons: complete
    ? [R.GAMETOGENESE, R.FECONDATION, R.REGULATION_REPRODUCTION, R.GESTATION, R.LACTATION, R.CONTRACEPTION]
    : [R.GAMETOGENESE, R.FECONDATION, R.REGULATION_REPRODUCTION],
});

const immunologie = (complete: boolean): ChapterSpec => ({
  title: "Immunologie",
  summary: complete
    ? "Soi et non-soi, réponses immunitaires, VIH-sida, vaccination et sérothérapie."
    : "Soi et non-soi, réponses immunitaires, VIH-sida.",
  lessons: complete
    ? [R.SYSTEME_IMMUNITAIRE, R.REPONSE_IMMUNITAIRE, R.VIH_SIDA, R.AIDES_IMMUNITE]
    : [R.SYSTEME_IMMUNITAIRE, R.REPONSE_IMMUNITAIRE, R.VIH_SIDA],
});

const genetique: ChapterSpec = {
  title: "Génétique",
  summary: "Lois de Mendel, monohybridisme, dihybridisme, gènes liés et crossing-over.",
  lessons: [R.LOIS_MENDEL],
};

const heredite: ChapterSpec = {
  title: "Hérédité humaine",
  summary: "Arbres généalogiques, maladies héréditaires, groupes sanguins, anomalies chromosomiques.",
  lessons: [R.HEREDITE_HUMAINE],
};

export const SVT_TLE_S2: ChapterSpec[] = [
  systemeNerveux,
  tissuNerveux,
  {
    title: "Rôle du système nerveux dans le comportement moteur",
    summary: "Réflexes innés et conditionnels, arc réflexe, mouvements volontaires.",
    lessons: [N.REFLEXES, N.MOUVEMENTS_VOLONTAIRES],
  },
  muscle,
  coeur,
  {
    title: "Le milieu intérieur",
    summary: "Composition et rôles du milieu intérieur, homéostasie.",
    lessons: [N.MILIEU_INTERIEUR, N.HOMEOSTASIE],
  },
  glycemie,
  immunologie(true),
  reproductionMammiferes(true),
  {
    title: "Reproduction chez les spermaphytes",
    summary: "Fleur, pollinisation, double fécondation, graine et fruit.",
    lessons: [R.REPRODUCTION_SPERMAPHYTES],
  },
  genetique,
  heredite,
  {
    title: "Biotechnologies",
    summary: "Génie génétique, OGM, applications médicales et questions éthiques.",
    lessons: [R.BIOTECHNOLOGIES],
  },
];

export const SVT_TLE_S1: ChapterSpec[] = [
  systemeNerveux,
  tissuNerveux,
  muscle,
  coeur,
  glycemie,
  immunologie(false),
  reproductionMammiferes(false),
  genetique,
  heredite,
];

export const SVT_TLE_L2: ChapterSpec[] = [
  systemeNerveux,
  coeur,
  glycemie,
  immunologie(false),
  reproductionMammiferes(false),
  heredite,
];
