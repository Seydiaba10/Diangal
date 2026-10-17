// Anglais de 5e. Chapitres INDICATIFS (le programme officiel du moyen n’a pas été trouvé). Explications
// en anglais simple avec des repères en français. Leçons rédigées par DIANGAL, à faire valider.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "../tle/blocks";

export const ANG_5E: ChapterSpec[] = [
  {
    title: "My house and my town",
    summary: "Rooms, places in town, there is / there are, prepositions of place.",
    lessons: [
      {
        title: "Describing places",
        minutes: 12,
        body: `${liste([
            "rooms: the living room, the bedroom, the kitchen, the bathroom, the yard ;",
            "places: the market, the mosque, the church, the hospital, the post office, the bus station ;",
            "there is + singular (there is a market), there are + plural (there are two schools) ;",
            "prepositions: in, on, under, next to, behind, in front of, between.",
          ])}
          ${exemple(["There is a big baobab in front of my house. The shop is next to the pharmacy."])}`,
      },
    ],
  },
  {
    title: "Hobbies and sports",
    summary: "Talk about free time with like + -ing and can for ability.",
    lessons: [
      {
        title: "What do you like doing?",
        minutes: 12,
        body: `${liste([
            "I like playing football. She loves reading. He hates swimming.",
            "can / can’t for ability: I can swim. She can’t ride a bike. Can you dance?",
            "sports: football, basketball, wrestling, athletics.",
          ])}
          ${retenir("After like, love, hate, enjoy, we use verb + -ing.")}`,
      },
    ],
  },
  {
    title: "Clothes and shopping",
    summary: "Clothes vocabulary, the present continuous, prices.",
    lessons: [
      {
        title: "At the shop",
        minutes: 12,
        body: `${liste([
            "clothes: a shirt, trousers, a dress, a boubou, shoes, a cap ;",
            "present continuous: What are you wearing today? — I am wearing a blue shirt.",
            "How much is this dress? — It is 5,000 francs. It’s too expensive / It’s cheap.",
          ])}
          ${retenir("Present continuous: am / is / are + verb-ing, for what is happening now.")}`,
      },
    ],
  },
  {
    title: "Health and the body",
    summary: "Parts of the body, illnesses, giving advice with should.",
    lessons: [
      {
        title: "What’s the matter?",
        minutes: 12,
        body: `${liste([
            "the body: head, eyes, ears, nose, mouth, arm, hand, leg, foot, stomach ;",
            "What’s the matter? — I have a headache / a stomachache / a fever.",
            "advice: You should see a doctor. You shouldn’t eat too much sugar.",
          ])}
          ${retenir("Should + base verb gives advice (conseil).")}`,
      },
    ],
  },
  {
    title: "Animals and the environment",
    summary: "Wild and domestic animals, comparatives and superlatives.",
    lessons: [
      {
        title: "Comparing animals",
        minutes: 12,
        body: `${tableau([
            ["Adjective", "Comparative", "Superlative"],
            ["big", "bigger than", "the biggest"],
            ["fast", "faster than", "the fastest"],
            ["dangerous", "more dangerous than", "the most dangerous"],
            ["good / bad", "better / worse than", "the best / the worst"],
          ])}
          ${exemple(["The elephant is bigger than the lion. The cheetah is the fastest animal."])}
          ${retenir("We must protect wild animals: the Niokolo-Koba park protects lions and elephants.")}`,
      },
    ],
  },
  {
    title: "Jobs",
    summary: "Professions and workplaces; asking about jobs.",
    lessons: [
      {
        title: "What does he do?",
        minutes: 12,
        body: `${liste([
            "a teacher, a doctor, a nurse, a farmer, a fisherman, a tailor, a driver, a trader ;",
            "What does your father do? — He is a fisherman. He works in Kayar.",
            "Where does a nurse work? — She works in a hospital.",
          ])}
          ${retenir("Use a / an before a job: She is an engineer.")}`,
      },
    ],
  },
  {
    title: "Travel and holidays",
    summary: "The past simple of irregular verbs, telling a story about a trip.",
    lessons: [
      {
        title: "My last holidays",
        minutes: 12,
        body: `${tableau([
            ["Verb", "Past simple"],
            ["go", "went"],
            ["see", "saw"],
            ["take", "took"],
            ["eat", "ate"],
            ["buy", "bought"],
          ])}
          ${exemple(["Last holidays I went to Saint-Louis. I took the bus and I saw the Faidherbe bridge."])}
          ${retenir("Questions and negatives in the past use did: Did you go? — No, I didn’t go.")}`,
      },
    ],
  },
  {
    title: "Plans for the future",
    summary: "Talk about future plans with going to and will.",
    lessons: [
      {
        title: "What are you going to do?",
        minutes: 12,
        body: `${liste([
            "going to for plans: I am going to visit my uncle next week.",
            "will for predictions and decisions: It will rain tomorrow. I will help you.",
            "time words: tomorrow, next week, next year, soon.",
          ])}
          ${retenir("I’m going to be a doctor = j’ai l’intention de devenir médecin.")}`,
      },
    ],
  },
];
