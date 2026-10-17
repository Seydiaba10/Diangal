// Anglais de 2nde (séries L et S). Chapitres INDICATIFS (programme officiel de 2nde non trouvé ; thèmes
// proches de ceux du programme de Terminale de l’Office du Bac). Leçons rédigées par DIANGAL, à faire
// valider.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "../tle/blocks";

export const ANG_2NDE: ChapterSpec[] = [
  {
    title: "Education and school life",
    summary: "Talking about school; the present perfect and the past simple.",
    lessons: [
      {
        title: "School life",
        minutes: 12,
        body: `${liste([
            "vocabulary: a timetable, a subject, a test, to pass / to fail an exam, a boarding school, a scholarship ;",
            "present perfect (have + past participle) for a period that continues: I have studied English for four years ;",
            "past simple for finished time: I passed the BFEM in 2025.",
          ])}
          ${retenir("for + duration (for four years); since + starting point (since 2022).")}`,
      },
    ],
  },
  {
    title: "Health and hygiene",
    summary: "Diseases and prevention; modal verbs of advice and obligation.",
    lessons: [
      {
        title: "Staying healthy",
        minutes: 12,
        body: `${liste([
            "malaria, cholera, diabetes, a mosquito net, a vaccine, a balanced diet ;",
            "should / ought to for advice; must / have to for obligation ;",
            "You should sleep under a mosquito net. We must wash our hands before eating.",
          ])}`,
      },
    ],
  },
  {
    title: "The environment",
    summary: "Environmental problems and solutions; the passive voice.",
    lessons: [
      {
        title: "Protecting nature",
        minutes: 15,
        body: `${liste([
            "deforestation, desertification, coastal erosion, plastic pollution, recycling ;",
            "passive voice: be + past participle: Trees are cut down every day. The Great Green Wall is being built across the Sahel.",
          ])}
          ${tableau([
            ["Active", "Passive"],
            ["People pollute the sea.", "The sea is polluted by people."],
            ["They planted trees.", "Trees were planted."],
          ])}`,
      },
    ],
  },
  {
    title: "Family and society",
    summary: "Family relationships and traditions; relative pronouns.",
    lessons: [
      {
        title: "Families in Senegal",
        minutes: 12,
        body: `${liste([
            "the extended family, a nephew, a niece, a cousin, an in-law, solidarity ;",
            "relative pronouns: who (people), which (things), whose (possession), where (places) ;",
            "My uncle, who lives in Thiès, is a teacher. The house where I was born is in Kolda.",
          ])}`,
      },
    ],
  },
  {
    title: "Jobs and the future",
    summary: "Careers and ambitions; the future with will, going to and the present continuous.",
    lessons: [
      {
        title: "Talking about the future",
        minutes: 12,
        body: `${liste([
            "will: predictions and quick decisions (I think I will become a nurse) ;",
            "going to: plans and intentions (I am going to study medicine) ;",
            "present continuous: fixed arrangements (I am meeting the counsellor tomorrow).",
          ])}
          ${exemple(["What do you want to be? — I want to be an engineer because I love maths."])}`,
      },
    ],
  },
  {
    title: "Reading and writing skills",
    summary: "Reading comprehension strategies; writing a letter and a short essay.",
    lessons: [
      {
        title: "Reading and writing",
        minutes: 15,
        body: `${liste([
            "reading: skim for the general idea, scan for specific information, guess words from context ;",
            "informal letter: address, date, Dear…, paragraphs, Best wishes, signature ;",
            "short essay: introduction, two or three paragraphs with linking words (firstly, moreover, however, finally), conclusion.",
          ])}`,
      },
    ],
  },
];
