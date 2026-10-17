// Anglais de 4e. Chapitres INDICATIFS (le programme officiel du moyen n’a pas été trouvé). Explications
// en anglais simple avec des repères en français. Leçons rédigées par DIANGAL, à faire valider.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "../tle/blocks";

export const ANG_4E: ChapterSpec[] = [
  {
    title: "Family and friends",
    summary: "Describing people; the possessive ’s; have got.",
    lessons: [
      {
        title: "Describing people",
        minutes: 12,
        body: `${liste([
            "the possessive ’s: Awa’s brother, my parents’ house ;",
            "have got: I have got two sisters. Has he got a bike? ;",
            "describing: He is tall and thin. She has got long hair. He is kind and generous.",
          ])}
          ${retenir("“What does she look like?” asks about appearance; “What is she like?” asks about character.")}`,
      },
    ],
  },
  {
    title: "Food and meals",
    summary: "Countable and uncountable nouns; some / any; how much / how many.",
    lessons: [
      {
        title: "Some, any, much, many",
        minutes: 12,
        body: `${tableau([
            ["", "Countable (mangoes, eggs)", "Uncountable (rice, water)"],
            ["question", "How many mangoes?", "How much rice?"],
            ["affirmative", "some eggs", "some water"],
            ["negative / question", "any eggs", "any water"],
          ])}
          ${exemple(["We need some rice for the thieboudienne. Are there any tomatoes?"])}`,
      },
    ],
  },
  {
    title: "Telling a story in the past",
    summary: "The past continuous and the past simple; when and while.",
    lessons: [
      {
        title: "Past continuous and past simple",
        minutes: 15,
        body: `${liste([
            "past continuous: was / were + verb-ing, for an action in progress in the past ;",
            "past simple: for a short, finished action ;",
            "I was walking to school when it started to rain. While she was cooking, the phone rang.",
          ])}
          ${retenir("The long action uses the past continuous; the short action that interrupts it uses the past simple.")}`,
      },
    ],
  },
  {
    title: "Experiences",
    summary: "The present perfect with ever, never, already and yet.",
    lessons: [
      {
        title: "The present perfect",
        minutes: 15,
        body: `${liste([
            "have / has + past participle: I have visited Saint-Louis. She has finished her homework ;",
            "Have you ever been to Ziguinchor? — No, I have never been there ;",
            "already in affirmative sentences, yet in questions and negatives: I haven’t eaten yet.",
          ])}
          ${retenir("With a precise time in the past (yesterday, in 2020), we use the past simple, not the present perfect.")}`,
      },
    ],
  },
  {
    title: "Rules at school and at home",
    summary: "Must, mustn’t, have to, don’t have to.",
    lessons: [
      {
        title: "Obligation and prohibition",
        minutes: 12,
        body: `${tableau([
            ["Form", "Meaning", "Example"],
            ["must / have to", "obligation", "You must wear your uniform."],
            ["mustn’t", "prohibition (interdiction)", "You mustn’t cheat in a test."],
            ["don’t have to", "no obligation", "You don’t have to come on Sunday."],
          ])}`,
      },
    ],
  },
  {
    title: "The environment",
    summary: "Environmental problems; the first conditional.",
    lessons: [
      {
        title: "If we protect the environment…",
        minutes: 12,
        body: `${liste([
            "vocabulary: pollution, plastic bags, rubbish, to recycle, to plant trees, drought, flood ;",
            "first conditional: If + present simple, will + verb ;",
            "If we plant trees, the desert will not advance. If you throw plastic bags, animals will die.",
          ])}
          ${retenir("No “will” after “if”: If it rains (not If it will rain).")}`,
      },
    ],
  },
  {
    title: "Technology and communication",
    summary: "Phones, computers, the internet; the future with will.",
    lessons: [
      {
        title: "Talking about technology",
        minutes: 12,
        body: `${liste([
            "a mobile phone, a computer, the internet, to send a message, to download, to search ;",
            "will for predictions: In the future, more students will learn online ;",
            "online safety: never share your password; don’t talk to strangers on the internet.",
          ])}`,
      },
    ],
  },
  {
    title: "Festivals and celebrations",
    summary: "Celebrations in Senegal; dates, ordinal numbers and prepositions of time.",
    lessons: [
      {
        title: "Celebrations in Senegal",
        minutes: 12,
        body: `${liste([
            "Tabaski, Korité, Christmas, Independence Day (on the fourth of April), the Magal of Touba ;",
            "ordinal numbers: first, second, third, fourth… twenty-first ;",
            "prepositions: in April, in 1960, on the 4th of April, on Monday, at 8 o’clock.",
          ])}
          ${exemple(["Senegal became independent in 1960. We celebrate Independence Day on the 4th of April."])}`,
      },
    ],
  },
];
