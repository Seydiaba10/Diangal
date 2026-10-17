// Catalogue de Terminale, toutes séries (L1, L2, LA, S1 à S5, G, T1, T2). Séries S1, S2, L1 et L2 : programmes
// officiels mis en ligne par l'Office du Bac (docs/programme/programme-tle.md) ; séries LA, S3, S4, S5, G, T1
// et T2 : maths officielles (APAMS), matières propres à la série indicatives (programme-lycee.md).
// Une matière (programme) par série : les élèves d'une série ne voient que ses matières, comme le tableau
// de bord en base. Les leçons (src/mocks/tle/, src/mocks/lycee/) sont rédigées par DIANGAL et doivent
// être validées par des enseignants. Coefficients : ceux de la philosophie et de la physique-chimie en L2
// viennent des programmes, les autres sont indicatifs.

import { programSlug, slugify } from "@/lib/slug";
import type { Chapter, Subject, SubjectCode } from "@/types/domain";
import { ANG_TLE_L, ANG_TLE_S } from "./tle/anglais";
import type { ChapterSpec } from "./tle/blocks";
import { CHIMIE_TLE_S } from "./tle/chimie-s";
import { FR_TLE } from "./tle/francais";
import { HG_TLE } from "./tle/histoire-geographie";
import { MATH_TLE_G, MATH_TLE_L, MATH_TLE_S1, MATH_TLE_S2, MATH_TLE_T } from "./tle/mathematiques";
import { PHILO_TLE_L, PHILO_TLE_S } from "./tle/philosophie";
import { PHYSIQUE_TLE_S } from "./tle/physique-s";
import { PC_TLE_L2 } from "./tle/sciences-physiques-l2";
import { SVT_TLE_L2, SVT_TLE_S1, SVT_TLE_S2 } from "./tle/svt";
import { AGRI_TLE } from "./lycee/agriculture";
import { AGRO_TLE } from "./lycee/agroalimentaire";
import { AR_TLE } from "./lycee/arabe";
import { CONST_TLE } from "./lycee/construction";
import { ECO_TLE } from "./lycee/economie";
import { ELEC_TLE } from "./lycee/electrotechnique";
import { TECH_TLE } from "./lycee/fabrication";
import { GEST_TLE } from "./lycee/gestion";

const LEVEL = "TLE";

/** Séries de Terminale dont le programme est publié. */
export const TLE_SERIES = ["S1", "S2", "L1", "L2", "LA", "S3", "S4", "S5", "G", "T1", "T2"] as const;
type TleSeries = (typeof TLE_SERIES)[number];

const NAMES: Partial<Record<SubjectCode, [slug: string, name: string]>> = {
  MATH: ["mathematiques", "Mathématiques"],
  PC: ["sciences-physiques", "Sciences physiques"],
  SVT: ["svt", "SVT"],
  PHILO: ["philosophie", "Philosophie"],
  FR: ["francais", "Français"],
  HG: ["histoire-geographie", "Histoire-Géographie"],
  ANG: ["anglais", "Anglais"],
  AR: ["arabe", "Arabe"],
  ECO: ["economie", "Économie"],
  GEST: ["gestion", "Techniques de gestion"],
  CONST: ["construction-mecanique", "Construction mécanique"],
  TECH: ["fabrication-automatismes", "Fabrication et automatismes"],
  ELEC: ["electrotechnique", "Électrotechnique-électronique"],
  AGRI: ["sciences-agricoles", "Sciences agricoles"],
  AGRO: ["agroalimentaire", "Technologie agroalimentaire"],
};

const PC_TLE_S: ChapterSpec[] = [...PHYSIQUE_TLE_S, ...CHIMIE_TLE_S];
/** Séries T : la physique de la Terminale S (programme de chimie propre aux séries T non trouvé). */
const PC_TLE_T: ChapterSpec[] = PHYSIQUE_TLE_S;

/** Matières de chaque série, dans l'ordre d'affichage : [code, coefficient, chapitres]. */
const PROGRAMS: Record<TleSeries, [SubjectCode, number, ChapterSpec[]][]> = {
  S1: [
    ["MATH", 5, MATH_TLE_S1],
    ["PC", 5, PC_TLE_S],
    ["SVT", 2, SVT_TLE_S1],
    ["PHILO", 2, PHILO_TLE_S],
    ["FR", 2, FR_TLE],
    ["HG", 2, HG_TLE],
    ["ANG", 2, ANG_TLE_S],
  ],
  S2: [
    ["MATH", 4, MATH_TLE_S2],
    ["PC", 4, PC_TLE_S],
    ["SVT", 4, SVT_TLE_S2],
    ["PHILO", 2, PHILO_TLE_S],
    ["FR", 2, FR_TLE],
    ["HG", 2, HG_TLE],
    ["ANG", 2, ANG_TLE_S],
  ],
  L1: [
    ["PHILO", 4, PHILO_TLE_L],
    ["FR", 4, FR_TLE],
    ["HG", 3, HG_TLE],
    ["ANG", 3, ANG_TLE_L],
    ["MATH", 2, MATH_TLE_L],
  ],
  L2: [
    ["PHILO", 4, PHILO_TLE_L],
    ["FR", 4, FR_TLE],
    ["HG", 3, HG_TLE],
    ["ANG", 3, ANG_TLE_L],
    ["MATH", 2, MATH_TLE_L],
    ["PC", 2, PC_TLE_L2],
    ["SVT", 2, SVT_TLE_L2],
  ],
  // Séries suivantes : coefficients indicatifs, d’après la liste des épreuves du Bac.
  LA: [
    ["AR", 8, AR_TLE],
    ["PHILO", 6, PHILO_TLE_L],
    ["HG", 4, HG_TLE],
    ["FR", 4, FR_TLE],
    ["ANG", 2, ANG_TLE_L],
    ["MATH", 2, MATH_TLE_L],
  ],
  S3: [
    ["MATH", 8, MATH_TLE_S1],
    ["PC", 8, PC_TLE_S],
    ["CONST", 8, CONST_TLE],
    ["TECH", 5, TECH_TLE],
    ["PHILO", 2, PHILO_TLE_S],
    ["FR", 3, FR_TLE],
    ["ANG", 2, ANG_TLE_S],
  ],
  S4: [
    ["MATH", 5, MATH_TLE_S2],
    ["PC", 5, PC_TLE_S],
    ["SVT", 5, SVT_TLE_S2],
    ["AGRI", 10, AGRI_TLE],
    ["PHILO", 2, PHILO_TLE_S],
    ["FR", 3, FR_TLE],
    ["HG", 2, HG_TLE],
    ["ANG", 2, ANG_TLE_S],
  ],
  S5: [
    ["MATH", 5, MATH_TLE_S2],
    ["PC", 5, PC_TLE_S],
    ["SVT", 5, SVT_TLE_S2],
    ["AGRO", 10, AGRO_TLE],
    ["PHILO", 2, PHILO_TLE_S],
    ["FR", 3, FR_TLE],
    ["HG", 2, HG_TLE],
    ["ANG", 2, ANG_TLE_S],
  ],
  G: [
    ["GEST", 10, GEST_TLE],
    ["ECO", 6, ECO_TLE],
    ["MATH", 5, MATH_TLE_G],
    ["PHILO", 2, PHILO_TLE_S],
    ["FR", 3, FR_TLE],
    ["HG", 2, HG_TLE],
    ["ANG", 3, ANG_TLE_S],
  ],
  T1: [
    ["TECH", 12, TECH_TLE],
    ["CONST", 8, CONST_TLE],
    ["MATH", 5, MATH_TLE_T],
    ["PC", 4, PC_TLE_T],
    ["FR", 3, FR_TLE],
    ["ANG", 2, ANG_TLE_S],
  ],
  T2: [
    ["ELEC", 21, ELEC_TLE],
    ["MATH", 4, MATH_TLE_T],
    ["PC", 2, PC_TLE_T],
    ["FR", 3, FR_TLE],
    ["ANG", 2, ANG_TLE_S],
  ],
};

export const SUBJECTS_TLE: Subject[] = TLE_SERIES.flatMap((series) =>
  PROGRAMS[series].map(([code, coefficient]) => {
    const [slug, name] = NAMES[code]!;
    return { code, slug: programSlug(slug, LEVEL, series), name, coefficient, levelCode: LEVEL, seriesCode: series };
  }),
);

/** Corps des leçons de Terminale, par identifiant de leçon. */
export const LESSON_BODIES_TLE: Record<string, string> = {};

export const CHAPTERS_TLE: Chapter[] = TLE_SERIES.flatMap((series) =>
  PROGRAMS[series].flatMap(([code, , specs]) =>
    specs.map((spec, index) => {
      const slug = slugify(spec.title);
      const id = `tle-${series.toLowerCase()}-${code.toLowerCase()}-${slug}`;
      return {
        id,
        slug,
        number: index + 1,
        title: spec.title,
        summary: spec.summary,
        subjectCode: code,
        levelCode: LEVEL,
        seriesCode: series,
        strand: spec.strand,
        lessons: spec.lessons.map((lesson, lessonIndex) => {
          const lessonSlug = slugify(lesson.title);
          const lessonId = `${id}--${lessonSlug}`;
          LESSON_BODIES_TLE[lessonId] = lesson.body.replace(/\n\s+/g, "\n").trim();
          return {
            id: lessonId,
            slug: lessonSlug,
            number: lessonIndex + 1,
            title: lesson.title,
            estimatedMinutes: lesson.minutes ?? 10,
            isPremium: false,
            resources: [],
          };
        }),
      };
    }),
  ),
);
