// Anglais de 6e (première année d’anglais). Chapitres INDICATIFS : le programme officiel du moyen n’a
// pas été trouvé (PROMET : seasons and weather, articles, plurals, quantifiers, past simple). Explications
// en anglais simple avec des repères en français. Leçons rédigées par DIANGAL, à faire valider.

import { type ChapterSpec, exemple, liste, retenir, tableau } from "../tle/blocks";

export const ANG_6E: ChapterSpec[] = [
  {
    title: "Greetings and introductions",
    summary: "Say hello, introduce yourself, the verb to be.",
    lessons: [
      {
        title: "Hello! My name is…",
        minutes: 12,
        body: `${tableau([
            ["English", "Français"],
            ["Hello! / Hi! / Good morning!", "Bonjour !"],
            ["What’s your name? — My name is Awa.", "Comment t’appelles-tu ? — Je m’appelle Awa."],
            ["How are you? — I’m fine, thank you.", "Comment vas-tu ? — Je vais bien, merci."],
            ["Where are you from? — I’m from Senegal.", "D’où viens-tu ? — Je viens du Sénégal."],
            ["Goodbye! / See you!", "Au revoir ! / À bientôt !"],
          ])}
          ${tableau([
            ["to be", ""],
            ["I am (I’m)", "we are"],
            ["you are", "you are"],
            ["he / she / it is", "they are"],
          ])}
          ${retenir("In English, “you” is used for one person or many people (tu / vous).")}`,
      },
    ],
  },
  {
    title: "Numbers, the alphabet and colours",
    summary: "Count from 1 to 100, spell words, name colours.",
    lessons: [
      {
        title: "Numbers, letters and colours",
        minutes: 12,
        body: `${liste([
            "1 one, 2 two, 3 three, 4 four, 5 five, 6 six, 7 seven, 8 eight, 9 nine, 10 ten ;",
            "11 eleven, 12 twelve, 13 thirteen, 20 twenty, 30 thirty, 100 one hundred ;",
            "the alphabet: A (ei), B (bi), C (si)… How do you spell your name? — A-W-A.",
            "colours: red, green, yellow, blue, black, white. The Senegalese flag is green, yellow and red.",
          ])}
          ${retenir("Thirteen (13) and thirty (30) sound similar: listen to the stress (thirTEEN / THIRty).")}`,
      },
    ],
  },
  {
    title: "My family",
    summary: "Family members, have got, the possessive ’s.",
    lessons: [
      {
        title: "Talking about my family",
        minutes: 12,
        body: `${liste([
            "father, mother, brother, sister, grandfather, grandmother, uncle, aunt, cousin ;",
            "I have got two brothers. She has got a sister. Have you got a cousin?",
            "The possessive ’s: Moussa’s sister = la sœur de Moussa.",
          ])}
          ${exemple(["This is my family. My father’s name is Ibrahima. I have got one brother and two sisters."])}
          ${retenir("He / She / It has got ; I / you / we / they have got.")}`,
      },
    ],
  },
  {
    title: "At school",
    summary: "Classroom objects, articles a, an, the, plurals, this and that.",
    lessons: [
      {
        title: "In the classroom",
        minutes: 12,
        body: `${liste([
            "a pen, a book, a ruler, a bag, an eraser, a desk, the blackboard ;",
            "<strong>a</strong> before a consonant sound (a book), <strong>an</strong> before a vowel sound (an orange) ;",
            "plural: book → books, box → boxes, child → children ;",
            "this (ceci, près) / that (cela, loin) ; these / those.",
          ])}
          ${exemple(["What’s this? — It’s a pen. What are these? — They are books."])}
          ${retenir("Classroom English: Open your books. Listen! Repeat, please. May I go out?")}`,
      },
    ],
  },
  {
    title: "Daily routine and time",
    summary: "The present simple, telling the time, days of the week.",
    lessons: [
      {
        title: "My day",
        minutes: 15,
        body: `${liste([
            "I get up at six o’clock. I go to school at half past seven. She has lunch at one o’clock.",
            "Present simple: add -s with he / she / it: he plays, she goes, it watches.",
            "Negative: I don’t / he doesn’t ; question: Do you…? / Does she…?",
            "Days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.",
          ])}
          ${retenir("What time is it? — It’s ten o’clock / It’s a quarter past ten / It’s half past ten.")}`,
      },
    ],
  },
  {
    title: "Food and the market",
    summary: "Food vocabulary, countable and uncountable nouns, some, any, how much, how many.",
    lessons: [
      {
        title: "At the market",
        minutes: 12,
        body: `${liste([
            "rice, fish, bread, milk, mangoes, onions, tomatoes ;",
            "countable nouns: a mango, two mangoes — How many mangoes? ;",
            "uncountable nouns: rice, milk, water — How much rice? ;",
            "some in affirmative sentences, any in questions and negatives: I have some rice. Have you got any milk?",
          ])}
          ${exemple(["How much is it? — It’s five hundred francs."])}`,
      },
    ],
  },
  {
    title: "Weather and seasons",
    summary: "Talk about the weather and the seasons in Senegal.",
    lessons: [
      {
        title: "What’s the weather like?",
        minutes: 12,
        body: `${liste([
            "It’s hot. It’s sunny. It’s windy. It’s raining. It’s cloudy.",
            "In Senegal there are two seasons: the rainy season (July to October) and the dry season.",
            "Look! It is raining now: present continuous (be + verb-ing) for what is happening now.",
          ])}
          ${retenir("The harmattan is a hot, dry wind from the Sahara.")}`,
      },
    ],
  },
  {
    title: "Last weekend",
    summary: "The past simple of to be and of regular verbs.",
    lessons: [
      {
        title: "Talking about the past",
        minutes: 12,
        body: `${liste([
            "to be: I was, you were, he was, we were, they were ;",
            "regular verbs: add -ed: play → played, visit → visited, watch → watched ;",
            "time words: yesterday, last week, last Sunday.",
          ])}
          ${exemple(["Last weekend I visited my grandmother in Thiès. We played football and watched a film."])}
          ${retenir("Some verbs are irregular: go → went, have → had, see → saw.")}`,
      },
    ],
  },
];
