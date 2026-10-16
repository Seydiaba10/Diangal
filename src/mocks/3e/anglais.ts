// Anglais de 3e. Chapitres indicatifs (le relevé officiel de l'anglais reste à compléter :
// docs/programme/releve-ci-3e.md). Leçons rédigées par DIANGAL, à faire valider par un enseignant.
// Les explications sont en anglais simple, avec des repères en français.

import { type Chapter3eSpec, exemple, liste, retenir, tableau } from "./blocks";

export const ANG_3E: Chapter3eSpec[] = [
  {
    title: "Present simple and continuous",
    summary: "Talk about habits and actions in progress.",
    lessons: [
      {
        title: "The present simple",
        body: `<p>We use the <strong>present simple</strong> for habits, facts and routines (en français : les habitudes et les vérités générales).</p>
          ${tableau([
            ["Affirmative", "Negative", "Question"],
            ["I play / she plays", "I don’t play / she doesn’t play", "Do you play? / Does she play?"],
          ])}
          ${retenir("Don’t forget the <strong>-s</strong> with he, she, it: Awa <strong>lives</strong> in Thiès. The sun <strong>rises</strong> in the east.")}`,
      },
      {
        title: "The present continuous",
        body: `<p>We use the <strong>present continuous</strong> for actions happening now (en ce moment).</p>
          ${tableau([
            ["Form", "Example"],
            ["am / is / are + verb-ing", "I am reading. They are playing football."],
            ["Negative", "She isn’t sleeping."],
            ["Question", "Are you listening?"],
          ])}
          ${retenir("Spelling: write → writing, swim → swimming, lie → lying.")}`,
      },
      {
        title: "Simple or continuous?",
        body: `${liste([
            "Key words for the present simple: always, usually, often, every day, on Mondays.",
            "Key words for the present continuous: now, at the moment, look!, listen!",
            "Some verbs are not used in the continuous: like, love, know, want, understand.",
          ])}
          ${exemple(["Moussa usually <strong>walks</strong> to school, but today he <strong>is taking</strong> the bus."])}`,
      },
    ],
  },
  {
    title: "Daily life and routines",
    summary: "Vocabulary and expressions for everyday life.",
    lessons: [
      {
        title: "Talking about your day",
        body: `${liste([
            "I wake up at six o’clock.",
            "I have breakfast and I go to school.",
            "In the afternoon, I do my homework and help at home.",
            "In the evening, I have dinner with my family and go to bed at ten.",
          ])}
          ${retenir("Telling the time: It’s half past seven (7:30). It’s a quarter to eight (7:45).")}`,
      },
      {
        title: "Adverbs of frequency",
        body: `${tableau([
            ["Adverb", "Meaning"],
            ["always", "100 % (toujours)"],
            ["usually", "souvent, d’habitude"],
            ["sometimes", "parfois"],
            ["never", "0 % (jamais)"],
          ])}
          ${retenir("The adverb goes <strong>before</strong> the main verb but <strong>after</strong> the verb be: I always eat rice. She is never late.")}`,
      },
    ],
  },
  {
    title: "The simple past",
    summary: "Talk about finished actions in the past.",
    lessons: [
      {
        title: "Regular and irregular verbs",
        body: `<p>We use the <strong>simple past</strong> for finished actions at a definite time in the past: yesterday, last week, in 2020.</p>
          ${liste([
            "Regular verbs add <strong>-ed</strong>: play → played, visit → visited, study → studied.",
            "Irregular verbs must be learnt: go → went, see → saw, buy → bought, eat → ate, write → wrote.",
          ])}
          ${retenir("The simple past is the same for all persons: I went, she went, they went.")}`,
      },
      {
        title: "Questions and negative forms",
        body: `${tableau([
            ["Form", "Example"],
            ["Negative: didn’t + base verb", "I didn’t go to the market."],
            ["Question: Did + subject + base verb?", "Did you see the match?"],
            ["Short answer", "Yes, I did. / No, I didn’t."],
          ])}
          ${retenir("After did / didn’t, use the base verb: Did she <strong>buy</strong>? (not bought).")}`,
      },
      {
        title: "Telling a story in the past",
        body: `${liste([
            "Use time words: first, then, after that, finally.",
            "Use the simple past for the main events.",
            "Add details: who, where, when, how.",
          ])}
          ${exemple(["Last Saturday, my cousins came to our house. First, we cooked thieboudienne together. Then we played football. Finally, we watched a film."])}`,
      },
    ],
  },
  {
    title: "The present perfect",
    summary: "Experiences and recent past.",
    lessons: [
      {
        title: "Form and use",
        body: `<p><strong>have / has + past participle</strong>: I have visited Saint-Louis. She has finished her homework.</p>
          ${liste([
            "Experiences in life (without a date): Have you ever been to Ziguinchor?",
            "Recent actions with a result now: I have lost my key (I can’t open the door).",
          ])}`,
      },
      {
        title: "Present perfect or simple past?",
        body: `${tableau([
            ["Present perfect", "Simple past"],
            ["no definite time", "definite time (yesterday, in 2019)"],
            ["I have seen this film.", "I saw this film last week."],
          ])}
          ${retenir("Key words: ever, never, already, yet, just, since, for → present perfect. Yesterday, ago, last… → simple past.")}`,
      },
    ],
  },
  {
    title: "Comparatives and superlatives",
    summary: "Compare people, places and things.",
    lessons: [
      {
        title: "Comparatives",
        body: `${liste([
            "Short adjectives: adjective + <strong>-er</strong> + than. Dakar is bigger than Thiès.",
            "Long adjectives: <strong>more</strong> + adjective + than. English is more interesting than…",
            "Equality: as + adjective + as. Fatou is as tall as her brother.",
          ])}`,
      },
      {
        title: "Superlatives",
        body: `${liste([
            "Short adjectives: the + adjective + <strong>-est</strong>. The Sénégal River is the longest river in the country.",
            "Long adjectives: the <strong>most</strong> + adjective. This is the most beautiful beach.",
          ])}
          ${tableau([
            ["Adjective", "Comparative", "Superlative"],
            ["good", "better", "the best"],
            ["bad", "worse", "the worst"],
            ["far", "farther / further", "the farthest"],
          ])}`,
      },
    ],
  },
  {
    title: "Modal verbs",
    summary: "Can, must, should, may.",
    lessons: [
      {
        title: "Can, must and should",
        body: `${tableau([
            ["Modal", "Use", "Example"],
            ["can / can’t", "ability, permission", "I can swim. Can I go out?"],
            ["must / mustn’t", "obligation, interdiction", "You must wear a helmet. You mustn’t smoke here."],
            ["should", "advice", "You should drink more water."],
          ])}
          ${retenir("A modal is followed by the base verb, without “to”: She can <strong>speak</strong> Wolof.")}`,
      },
      {
        title: "May and might",
        body: `${liste(["<strong>may</strong>: permission (formal) or possibility: May I come in? It may rain.", "<strong>might</strong>: a smaller possibility: He might come later."])}
          ${retenir("Modals don’t take -s: he can, she must, it may.")}`,
      },
    ],
  },
  {
    title: "The future",
    summary: "Will, going to and the present continuous.",
    lessons: [
      {
        title: "Will and going to",
        body: `${tableau([
            ["Form", "Use", "Example"],
            ["will + verb", "decision now, prediction, promise", "I’ll help you. It will be hot tomorrow."],
            ["be going to + verb", "plan, intention, evidence", "I’m going to study medicine. Look at the clouds: it’s going to rain."],
          ])}`,
      },
      {
        title: "The present continuous for arrangements",
        body: `<p>For fixed plans with a time and a place, we often use the present continuous.</p>
          ${exemple(["We are travelling to Kaolack on Friday. I’m meeting my teacher at four."])}
          ${retenir("Negative and questions: I won’t (= will not) forget. Are you going to come?")}`,
      },
    ],
  },
  {
    title: "Reading comprehension",
    summary: "Strategies to understand a text.",
    lessons: [
      {
        title: "Before and while reading",
        body: `${liste([
            "Read the title and look at the pictures: what is the text about?",
            "Skim the text quickly to get the general idea.",
            "Scan it to find specific information (names, dates, numbers).",
            "Guess unknown words from the context; don’t stop at every word.",
          ])}`,
      },
      {
        title: "Answering the questions",
        body: `${liste([
            "<strong>True or false</strong>: justify with a short quotation from the text.",
            "<strong>Wh- questions</strong> (who, what, where, when, why, how): answer with a full sentence.",
            "<strong>Find in the text</strong> a word meaning…: look for a word with the same grammar (noun, verb…).",
          ])}
          ${retenir("Always reuse the tense of the question: “Where did he go?” → “He went to the market.”")}`,
      },
    ],
  },
];
