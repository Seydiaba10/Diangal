// Anglais de 1re (toutes séries). Chapitres INDICATIFS (programme officiel de 1re non trouvé ; thèmes
// proches de ceux du programme de Terminale de l’Office du Bac). Leçons rédigées par DIANGAL, à faire
// valider.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "../tle/blocks";

export const ANG_1RE: ChapterSpec[] = [
  {
    title: "Democracy and citizenship",
    summary: "Elections, rights and duties; reported speech.",
    lessons: [
      {
        title: "Reported speech",
        minutes: 15,
        body: `${liste([
            "vocabulary: to vote, a candidate, a ballot, rights and duties, the rule of law ;",
            "reported speech: tenses move back after a past reporting verb ;",
            "“I will vote,” he said. → He said (that) he would vote.",
          ])}
          ${tableau([
            ["Direct", "Reported"],
            ["present simple", "past simple"],
            ["will", "would"],
            ["today, tomorrow", "that day, the next day"],
          ])}`,
      },
    ],
  },
  {
    title: "Science and technology",
    summary: "Inventions and their effects; the second conditional.",
    lessons: [
      {
        title: "If I had a robot…",
        minutes: 12,
        body: `${liste([
            "second conditional (unreal present): If + past simple, would + verb ;",
            "If I had a computer, I would learn programming. If I were the minister, I would build more labs.",
          ])}
          ${retenir("With the verb be, we use “were” for all persons in the second conditional.")}`,
      },
    ],
  },
  {
    title: "Women’s rights and gender equality",
    summary: "Discussing equality; used to for past habits.",
    lessons: [
      {
        title: "Past habits and change",
        minutes: 12,
        body: `${liste([
            "vocabulary: equality, discrimination, empowerment, girls’ education, early marriage ;",
            "used to + verb for past habits or states: Girls used to leave school early. Now more girls go to university.",
          ])}`,
      },
    ],
  },
  {
    title: "Migration",
    summary: "Causes and consequences of migration; the past perfect.",
    lessons: [
      {
        title: "Telling a migration story",
        minutes: 12,
        body: `${liste([
            "push factors (unemployment, conflict) and pull factors (jobs, studies) ;",
            "past perfect: had + past participle, for an action before another past action ;",
            "When he arrived in Spain, he had already spent all his money.",
          ])}
          ${exemple(["Many young people take dangerous journeys by pirogue; awareness campaigns warn them of the risks."])}`,
      },
    ],
  },
  {
    title: "Media and communication",
    summary: "Newspapers, radio, social media; gerund or infinitive.",
    lessons: [
      {
        title: "Gerund or infinitive?",
        minutes: 12,
        body: `${liste([
            "verb + -ing after enjoy, avoid, finish, mind: I enjoy listening to the radio ;",
            "verb + to after want, decide, hope, refuse: She decided to start a blog ;",
            "fake news: always check the source before sharing.",
          ])}`,
      },
    ],
  },
  {
    title: "Essay writing",
    summary: "Planning and writing an argumentative essay.",
    lessons: [
      {
        title: "Writing an essay",
        minutes: 15,
        body: `${liste([
            "introduction: present the topic and your opinion ;",
            "body: one paragraph per argument, with a topic sentence and an example ;",
            "conclusion: sum up and give a final thought ;",
            "linking words: firstly, in addition, on the other hand, however, to conclude.",
          ])}`,
      },
    ],
  },
];
