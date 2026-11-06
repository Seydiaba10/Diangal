import "server-only";

// Bac blanc DIANGAL n°1, anglais première langue (séries L1 et L2) : forme de l'épreuve de l'Office du Bac
// (3 heures ; I. reading comprehension sur 8 points, II. language sur 6 points, III. writing sur 6 points).
// Texte, questions et corrigés rédigés par DIANGAL (aucun texte publié n'est repris).

import type { MockExamSpec } from "../../exercise-series";
import { head, reading } from "../../cm2/cfee/helpers";

const TEXT = reading(
  "<strong>A classroom in her pocket</strong>",
  "When Khady passed her BFEM in Kolda, her parents were proud but worried. The nearest lycée was forty kilometres away, and the family could not afford to rent a room in town. For a whole term, Khady stayed at home, helping her mother at the market and reading the few books she had borrowed from her cousin.",
  "Then her uncle, who works in Dakar, sent her an old smartphone. At first she used it only to chat with her friends. One evening, however, a teacher from her former school told her about free courses that could be downloaded and read offline. Khady began to study every night, after the shop had closed, with the phone plugged into a small solar panel.",
  "Learning alone was not easy. Some lessons were too difficult, and when the network was down she could not ask anybody for help. “I had to be my own teacher,” she remembers. She wrote summaries in an exercise book, timed herself on practice tests and, once a month, travelled to Kolda to meet a study group of girls who were in the same situation.",
  "Two years later, Khady sat the baccalauréat as an external candidate and passed with a distinction. She now studies computer science at a university in Ziguinchor. “A phone does not replace a teacher,” she says, “but it opened a door that distance had closed.” Today she gives evening lessons, by telephone, to younger girls from her village.",
);

export const ANGLAIS_L: Omit<MockExamSpec, "series">[] = [
  {
    id: "bac-blanc-1-anglais-l",
    subject: "ANG",
    title: "Bac blanc DIANGAL n°1 : anglais",
    durationMin: 180,
    parts: [
      {
        chapter: "Education",
        stem: head("I. Reading comprehension", 8, "Read the text carefully, then answer the questions.") + TEXT,
        questions: [
          {
            vf: "1. Khady could not go to the lycée at once because it was too far and too expensive.",
            answer: true,
            pts: 1,
            why: "“The nearest lycée was forty kilometres away, and the family could not afford to rent a room in town.”",
          },
          {
            vf: "2. Khady used her smartphone for her studies as soon as she received it.",
            answer: false,
            pts: 1,
            why: "“At first she used it only to chat with her friends.” She began to study later, after a teacher told her about free courses.",
          },
          {
            vf: "3. Khady could study without the internet once the courses were downloaded.",
            answer: true,
            pts: 1,
            why: "The courses “could be downloaded and read offline”.",
          },
          {
            vf: "4. Khady studied completely alone until her exam.",
            answer: false,
            pts: 1,
            why: "Once a month, she “travelled to Kolda to meet a study group of girls who were in the same situation”.",
          },
          {
            qcm: "5. How did Khady charge her phone?",
            choices: ["At the market", "*With a small solar panel", "At her cousin’s house", "In Kolda, once a month"],
            pts: 1,
            why: "She studied “with the phone plugged into a small solar panel”.",
          },
          {
            qcm: "6. “I had to be my own teacher” means that Khady:",
            choices: ["wanted to become a teacher", "*had to organise and correct her own work", "taught her classmates", "did not like her teachers"],
            pts: 1,
            why: "She had nobody to help her when the network was down, so she wrote summaries and timed herself on practice tests: she organised her own learning.",
          },
          {
            qcm: "7. In the last paragraph, the word “distinction” is closest in meaning to:",
            choices: ["a difference", "*a very good result", "a diploma", "a failure"],
            pts: 1,
            why: "To pass “with a distinction” means to pass with a very good mark (a « mention »).",
          },
          {
            qcm: "8. Which title best sums up the message of the text?",
            choices: ["Phones are dangerous for students", "*Technology can help, but effort makes the difference", "Village girls should not study", "Universities are too far away"],
            pts: 1,
            why: "The phone “opened a door”, but Khady succeeded through hard work: “A phone does not replace a teacher.”",
          },
        ],
      },
      {
        chapter: "Exam skills: reading and writing",
        stem: head("II. Language", 6, "Choose the right answer."),
        questions: [
          {
            qcm: "1. Khady ____ in Ziguinchor since last year.",
            choices: ["studies", "*has been studying", "is studying", "studied"],
            pts: 1,
            why: "With “since”, an action that started in the past and is still going on takes the present perfect (continuous): “has been studying”.",
          },
          {
            qcm: "2. Reported speech: “A phone does not replace a teacher,” she says. → She says that a phone ____ a teacher.",
            choices: ["*does not replace", "did not replace", "had not replaced", "would not replace"],
            pts: 1,
            why: "The reporting verb is in the present (“she says”), so the tense does not change: “a phone does not replace a teacher”.",
          },
          {
            qcm: "3. Passive voice: Her uncle sent her an old smartphone. → She ____ an old smartphone by her uncle.",
            choices: ["is sent", "*was sent", "has sent", "was sending"],
            pts: 1,
            why: "The active verb is in the simple past (“sent”): the passive is “was sent”.",
          },
          {
            qcm: "4. If the lycée had been closer, Khady ____ at home for a whole term.",
            choices: ["would not stay", "will not stay", "*would not have stayed", "did not stay"],
            pts: 1,
            why: "Third conditional (an unreal past situation): if + past perfect, would have + past participle.",
          },
          {
            qcm: "5. The girls ____ Khady met in Kolda were in the same situation.",
            choices: ["whose", "*whom", "which", "what"],
            pts: 1,
            why: "The relative pronoun refers to people and is the object of “met”: “whom” (or “who”, “that”).",
          },
          {
            qcm: "6. Choose the word that does NOT belong to the field of education:",
            choices: ["timetable", "syllabus", "*harvest", "headmaster"],
            pts: 1,
            why: "“Harvest” (la récolte) belongs to farming; the other words are about school.",
          },
        ],
      },
      {
        chapter: "Exam skills: reading and writing",
        stem: head(
          "III. Writing",
          6,
          "Some people think that mobile phones should be banned from schools. Others believe they can help students learn. What is your opinion? Write an essay of about 200 words. Then compare your essay with the model and assess each criterion.",
        ),
        questions: [
          {
            self: "Content (2 points): the essay answers the question, gives a clear opinion and supports it with at least two arguments and examples.",
            pts: 2,
            why: "<p>Model essay:</p><div class=\"model-text\"><p>Mobile phones are everywhere in Senegal, even in villages. Some people want to ban them from schools because they disturb lessons, but I believe they can be useful if they are used wisely.</p><p>First of all, a phone gives access to knowledge. Many students have no library near their home, but with a phone they can download lessons, dictionaries and past exam papers. They can also revise in the evening, even without the internet.</p><p>Secondly, phones help students work together. A class can create a group to share notes, ask questions and prepare for tests. Shy students often dare to ask questions in a group chat, and good students can explain difficult lessons to their classmates.</p><p>However, phones can also be a distraction. Some students play games or chat during lessons, and others copy answers instead of thinking. That is why clear rules are necessary: phones should stay switched off in class unless the teacher asks students to use them.</p><p>In conclusion, banning phones would not solve the problem. Schools should teach students to use them as tools for learning, not as toys, and parents should help them respect these rules at home.</p></div>",
          },
          {
            self: "Organisation (1 point): an introduction, paragraphs linked with connectors (first of all, however, in conclusion…) and a conclusion.",
            pts: 1,
            why: "The model has an introduction with the writer’s opinion, three body paragraphs introduced by connectors (“First of all”, “Secondly”, “However”) and a conclusion that answers the question.",
          },
          {
            self: "Language (2 points): correct grammar and spelling, varied vocabulary.",
            pts: 2,
            why: "Check tenses, subject-verb agreement (“a phone gives”), plurals and spelling. Use precise words: access, distraction, revise, rules, tools.",
          },
          {
            self: "Length (1 point): about 200 words (between 180 and 220).",
            pts: 1,
            why: "Count your words. The model essay has about 200 words.",
          },
        ],
      },
    ],
  },
];
