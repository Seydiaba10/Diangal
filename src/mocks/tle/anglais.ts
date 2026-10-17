// Anglais de Terminale : « Programmes de LV anglais » (Commission nationale pour l'anglais, IGEN,
// 4e édition, 2017), mis en ligne par l'Office du Bac. Thèmes (topics) marqués L, S ou L & S ;
// la Terminale révise les fonctions et la grammaire de la 2nde et de la 1re et prépare l'examen.
// Explications en anglais simple avec des repères en français. Leçons rédigées par DIANGAL, à
// faire valider par un professeur d'anglais.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "./blocks";

const reading = (title: string, paragraphs: string[]) =>
  `<h2>${title}</h2>${paragraphs.map((p) => `<p>${p}</p>`).join("")}`;

const trade: ChapterSpec = {
  title: "Trade, professions and occupations",
  summary: "Jobs, working conditions, unemployment, child labour ; obligation and the letter of application.",
  lessons: [
    {
      title: "The world of work",
      minutes: 15,
      body: `${reading("Reading: Looking for a job in Dakar", [
          "Every year, thousands of young graduates arrive on the job market in Senegal. Some find a job in an office, a bank or a school, but many work in the informal sector as traders, tailors or drivers. Others choose vocational training to become electricians, mechanics or welders.",
          "Unemployment pushes some young people to emigrate, sometimes at the risk of their lives. Creating jobs at home is one of the biggest challenges for African countries.",
        ])}
        ${tableau([
          ["Word", "Meaning (en français)"],
          ["a job / an occupation", "un emploi, un métier"],
          ["to apply for a job", "postuler"],
          ["unemployment / jobless", "le chômage / sans emploi"],
          ["wages / salary", "salaire (à l’heure ou à la semaine / mensuel)"],
          ["vocational training", "formation professionnelle"],
          ["child labour", "le travail des enfants"],
        ])}
        ${retenir("“Work” is uncountable: <em>I have a lot of work</em>. “Job” is countable: <em>She has two jobs</em>.")}`,
    },
    {
      title: "Obligation, necessity and the letter of application",
      minutes: 15,
      body: `${tableau([
          ["Function", "Structure", "Example"],
          ["obligation", "must / have to", "Workers must wear a helmet."],
          ["absence of obligation", "don’t have to / needn’t", "You don’t have to wear a uniform."],
          ["prohibition", "mustn’t / be not allowed to", "Children mustn’t work in mines."],
          ["past obligation", "had to", "He had to work at the age of ten."],
        ])}
        ${methode([
          "Your address and the date (top right), the employer’s address (left).",
          "Dear Sir / Dear Madam (or Dear Mr Diallo).",
          "Paragraph 1: the job you are applying for and where you saw the advertisement.",
          "Paragraph 2: your qualifications and experience.",
          "Paragraph 3: why you want the job; your availability for an interview.",
          "Yours faithfully (if you began with Dear Sir) or Yours sincerely (with a name), then your signature.",
        ], "Writing a letter of application")}`,
    },
  ],
};

const freeTime: ChapterSpec = {
  title: "Free time and entertainment",
  summary: "Hobbies, sports, media and culture ; expressing preferences.",
  lessons: [
    {
      title: "Hobbies, sports and entertainment",
      minutes: 12,
      body: `${reading("Reading: Wrestling, more than a sport", [
          "In Senegal, traditional wrestling (laamb) is the most popular sport. Before a fight, wrestlers dance, sing and perform rituals, and griots praise them with drums. Big fights fill the national arena and are watched on television by millions of fans.",
          "Young people also enjoy football, basketball, music and social media. Leisure activities help us relax, meet people and discover new talents.",
        ])}
        ${tableau([
          ["Word", "Meaning"],
          ["a hobby / a pastime", "un passe-temps"],
          ["a fan / a supporter", "un supporter"],
          ["to go to the cinema / to a concert", "aller au cinéma, à un concert"],
          ["a museum / an exhibition", "un musée / une exposition"],
        ])}`,
    },
    {
      title: "Expressing likes, dislikes and preferences",
      minutes: 12,
      body: `${tableau([
          ["Structure", "Example"],
          ["like / love / enjoy / hate + verb-ing", "I enjoy reading novels."],
          ["prefer + noun / verb-ing + to", "She prefers football to basketball."],
          ["would rather + base verb (+ than)", "I would rather stay at home than go out tonight."],
          ["would like + to + verb", "I would like to visit Gorée."],
        ])}
        ${retenir("After <strong>enjoy</strong>, <strong>mind</strong>, <strong>avoid</strong>, <strong>finish</strong>, use verb-ing. After <strong>would rather</strong>, use the base form: <em>I’d rather watch</em> (not “to watch”).")}`,
    },
  ],
};

const economy: ChapterSpec = {
  title: "Economy",
  summary: "Shopping, consumer society, poverty, development, agriculture and industry ; describing graphs.",
  lessons: [
    {
      title: "Poverty and development",
      minutes: 15,
      body: `${reading("Reading: From groundnuts to oil", [
          "For decades, Senegal’s economy depended on groundnuts. Today, fishing, mining, services and tourism are also important, and the country started producing oil in 2024.",
          "However, natural resources are not enough to fight poverty. Sustainable development means growing the economy while protecting the environment and giving everyone access to education, health and decent jobs.",
        ])}
        ${tableau([
          ["Word", "Meaning"],
          ["poverty / poor", "la pauvreté / pauvre"],
          ["wealth / wealthy", "la richesse / riche"],
          ["sustainable development", "développement durable"],
          ["cash crops", "cultures de rente"],
          ["to export / to import", "exporter / importer"],
          ["the consumer society", "la société de consommation"],
        ])}`,
    },
    {
      title: "Describing graphs and making comparisons",
      minutes: 15,
      body: `${tableau([
          ["Trend", "Verbs", "Adverbs"],
          ["going up", "rise, increase, grow", "sharply, steadily, slightly"],
          ["going down", "fall, decrease, drop", "dramatically, gradually"],
          ["no change", "remain stable, level off", ""],
        ])}
        ${exemple(["Rice imports <strong>rose sharply</strong> between 2010 and 2015, then <strong>remained stable</strong>."])}
        ${tableau([
          ["Comparison", "Example"],
          ["short adjective + -er than", "Dakar is bigger than Thiès."],
          ["more + long adjective + than", "Solar energy is more sustainable than oil."],
          ["as … as / not as … as", "Our exports are not as high as our imports."],
          ["the + -est / the most", "Fishing is the most important export sector."],
        ])}`,
    },
  ],
};

const health: ChapterSpec = {
  title: "Health, welfare and environment",
  summary: "Diseases, hygiene, pollution, the progress of medicine ; giving advice and conditionals.",
  lessons: [
    {
      title: "Health and environment",
      minutes: 15,
      body: `${reading("Reading: Plastic everywhere", [
          "Plastic bags are cheap and practical, but they take hundreds of years to break down. They block drains, kill animals that eat them and pollute our beaches. Burning them releases toxic smoke.",
          "Good hygiene, clean water and vaccination prevent many diseases such as cholera, malaria and measles. Keeping fit and eating a balanced diet are also important for our health.",
        ])}
        ${tableau([
          ["Word", "Meaning"],
          ["a disease / an illness", "une maladie"],
          ["to prevent / prevention", "prévenir / la prévention"],
          ["pollution / to pollute", "la pollution / polluer"],
          ["waste", "les déchets"],
          ["a disability / disabled", "un handicap / handicapé"],
          ["to keep fit", "rester en forme"],
        ])}`,
    },
    {
      title: "Giving advice and conditionals",
      minutes: 15,
      body: `${tableau([
          ["Advice", "Example"],
          ["should / ought to", "You should wash your hands before eating."],
          ["had better (+ base verb)", "You had better see a doctor."],
          ["If I were you, I would…", "If I were you, I would sleep under a mosquito net."],
        ])}
        ${tableau([
          ["Conditional", "Form", "Example"],
          ["type 1 (real)", "If + present, will + verb", "If we plant trees, the air will be cleaner."],
          ["type 2 (unreal present)", "If + past, would + verb", "If I had money, I would build a clinic."],
          ["type 3 (unreal past)", "If + past perfect, would have + past participle", "If he had been vaccinated, he wouldn’t have caught measles."],
        ])}
        ${retenir("No “will” or “would” in the if-clause: <em>If it rains</em> (not “if it will rain”).")}`,
    },
  ],
};

const events: ChapterSpec = {
  title: "Events and changes",
  summary: "Colonial time and independence, war, politics, contemporary Africa ; past tenses and the passive.",
  lessons: [
    {
      title: "Colonial times and the struggle for independence",
      minutes: 15,
      body: `${reading("Reading: The winds of change", [
          "After the Second World War, many African soldiers who had fought for Europe came back with new ideas. Political parties and trade unions were created, and leaders such as Kwame Nkrumah, Léopold Sédar Senghor and Amílcar Cabral demanded freedom.",
          "Ghana became independent in 1957. In 1960 alone, seventeen African countries gained their independence. In Portuguese colonies, the struggle was longer and armed.",
        ])}
        ${tableau([
          ["Word", "Meaning"],
          ["to colonise / a colony", "coloniser / une colonie"],
          ["independence / to gain independence", "l’indépendance / obtenir l’indépendance"],
          ["a struggle / to struggle", "une lutte / lutter"],
          ["an election / to vote", "une élection / voter"],
        ])}`,
    },
    {
      title: "Talking about the past: tenses and the passive",
      minutes: 15,
      body: `${tableau([
          ["Tense", "Use", "Example"],
          ["past simple", "finished action at a given time", "Senegal became independent in 1960."],
          ["past continuous", "action in progress in the past", "They were fighting when the war ended."],
          ["past perfect", "action before another past action", "When he arrived, the meeting had started."],
          ["used to + verb", "past habit", "People used to travel by camel."],
        ])}
        ${tableau([
          ["Passive", "Example"],
          ["present", "English is spoken in Gambia."],
          ["past", "The country was colonised by Britain."],
          ["present perfect", "Many schools have been built."],
        ])}
        ${retenir("Passive = be (at the right tense) + past participle. Use “by” to name the agent when it is important.")}`,
    },
  ],
};

const heritage: ChapterSpec = {
  title: "Cultural heritage",
  summary: "Religions, ceremonies and festivals, moral values ; relative clauses.",
  lessons: [
    {
      title: "Customs, ceremonies and values",
      minutes: 12,
      body: `${reading("Reading: Teranga", [
          "Senegal is often called the country of teranga, a Wolof word meaning hospitality. Guests are welcomed, fed and treated with respect. Muslims and Christians live together peacefully and often celebrate each other’s religious festivals.",
          "Naming ceremonies, weddings and religious pilgrimages bring families together. These customs teach values such as solidarity, tolerance and generosity.",
        ])}
        ${tableau([
          ["Word", "Meaning"],
          ["a custom / a tradition", "une coutume / une tradition"],
          ["a ceremony / a festival", "une cérémonie / une fête"],
          ["a naming ceremony", "un baptême"],
          ["tolerance / solidarity / charity", "tolérance / solidarité / charité"],
          ["heritage", "le patrimoine"],
        ])}`,
    },
    {
      title: "Relative clauses",
      minutes: 12,
      body: `${tableau([
          ["Pronoun", "Use", "Example"],
          ["who", "people", "The griot who sang at the wedding is famous."],
          ["which / that", "things", "Gorée is an island which reminds us of the slave trade."],
          ["whose", "possession", "Senghor, whose poems are studied in schools, was a president."],
          ["where", "places", "Touba is the city where the Grand Magal takes place."],
        ])}
        ${retenir("Non-defining relative clauses give extra information: they are separated by commas and never use “that”.")}`,
    },
  ],
};

const science: ChapterSpec = {
  title: "Science and technology",
  summary: "Inventions and discoveries, ICTs, science and ethics ; describing a process with the passive.",
  lessons: [
    {
      title: "Inventions, discoveries and ICTs",
      minutes: 12,
      body: `${reading("Reading: Mobile money", [
          "A few years ago, sending money to a village meant travelling or trusting a driver. Today, thanks to mobile phones, money can be sent in seconds. Mobile money has changed the daily lives of millions of Africans.",
          "Science and technology bring great benefits, but they also raise ethical questions: who controls our personal data? Should we use genetically modified crops?",
        ])}
        ${tableau([
          ["Word", "Meaning"],
          ["to invent / an invention", "inventer / une invention"],
          ["to discover / a discovery", "découvrir / une découverte"],
          ["a device", "un appareil"],
          ["ICTs (Information and Communication Technologies)", "les TIC"],
          ["ethics / ethical", "l’éthique / éthique"],
        ])}`,
    },
    {
      title: "Describing a process",
      minutes: 12,
      body: `<p>To describe how something is made or how it works, we use <strong>the passive</strong> and <strong>sequence words</strong>.</p>
        ${exemple([
          "<strong>First</strong>, the groundnuts are shelled. <strong>Then</strong>, they are crushed and pressed to extract the oil. <strong>After that</strong>, the oil is filtered. <strong>Finally</strong>, it is put into bottles and sold.",
        ], "How groundnut oil is made")}
        ${liste([
          "sequence words: first, then, next, after that, finally ;",
          "purpose: to + verb, so that, in order to.",
        ])}`,
    },
  ],
};

const information: ChapterSpec = {
  title: "Information and communication",
  summary: "Media, ICTs, advertisements, the right to information ; reported speech.",
  lessons: [
    {
      title: "The media and the information explosion",
      minutes: 12,
      body: `${reading("Reading: Fake news", [
          "With social networks, anyone can publish information. News travels faster than ever, but so do rumours and fake news. Before sharing a message, we should check its source and compare it with other reliable media.",
          "Advertisements are everywhere too. They inform consumers but also try to make them buy things they do not need.",
        ])}
        ${tableau([
          ["Word", "Meaning"],
          ["the media / the press", "les médias / la presse"],
          ["a newspaper / a headline", "un journal / un gros titre"],
          ["an advertisement (an ad)", "une publicité"],
          ["fake news / a rumour", "fausse information / une rumeur"],
          ["the right to information", "le droit à l’information"],
        ])}`,
    },
    {
      title: "Reported speech",
      minutes: 15,
      body: `${tableau([
          ["Direct speech", "Reported speech"],
          ["“I am tired,” she said.", "She said (that) she was tired."],
          ["“We will come,” they said.", "They said they would come."],
          ["“I saw him yesterday,” he said.", "He said he had seen him the day before."],
          ["“Where do you live?” he asked.", "He asked me where I lived."],
          ["“Are you ready?” she asked.", "She asked if I was ready."],
        ])}
        ${retenir("After a past reporting verb, tenses go one step back (present → past, past → past perfect, will → would) and time words change (now → then, today → that day, tomorrow → the next day).")}`,
    },
  ],
};

const education: ChapterSpec = {
  title: "Education",
  summary: "Traditional education, schooling, changing values, civics and peace ; linking words.",
  lessons: [
    {
      title: "Traditional and modern education",
      minutes: 12,
      body: `${reading("Reading: Learning under the tree", [
          "In traditional African societies, children learned from their elders through stories, proverbs, initiation and work. Education was the responsibility of the whole community.",
          "Today, school is compulsory, but many children still leave school early. Some people think that modern education should teach both academic knowledge and the values of the past.",
        ])}
        ${tableau([
          ["Word", "Meaning"],
          ["to educate / education", "éduquer / l’éducation"],
          ["to drop out of school", "abandonner l’école"],
          ["compulsory / free", "obligatoire / gratuit"],
          ["the elders", "les anciens"],
          ["civics / a citizen", "l’éducation civique / un citoyen"],
        ])}`,
    },
    {
      title: "Linking words for an argumentative essay",
      minutes: 15,
      body: `${tableau([
          ["Function", "Linking words"],
          ["adding", "moreover, furthermore, in addition, besides"],
          ["contrasting", "however, although, whereas, on the other hand, despite + noun"],
          ["cause", "because, since, as, because of + noun"],
          ["consequence", "so, therefore, as a result, consequently"],
          ["concluding", "to sum up, in conclusion, all in all"],
        ])}
        ${exemple(["<strong>Although</strong> school is free, many children drop out. <strong>Therefore</strong>, the government should help poor families."])}`,
    },
  ],
};

const examSkills: ChapterSpec = {
  title: "Exam skills: reading and writing",
  summary: "Reading comprehension strategies and essay writing for the baccalauréat.",
  lessons: [
    {
      title: "Reading comprehension strategies",
      minutes: 15,
      body: `${methode([
          "<strong>Skim</strong> the text: read the title and the first lines of each paragraph to get the general idea.",
          "Read the questions before reading the text in detail.",
          "<strong>Scan</strong> for specific information: names, dates, numbers, key words.",
          "For “True or False”, always justify with a short quotation from the text.",
          "Guess the meaning of new words from the context, the word family or prefixes and suffixes.",
        ])}
        ${retenir("Answer questions with your own words when asked “explain” or “why”, and with short complete sentences.")}`,
    },
    {
      title: "Writing an essay",
      minutes: 15,
      body: `${methode([
          "Read the subject carefully and underline the key words.",
          "Brainstorm ideas and examples, then make a plan.",
          "<strong>Introduction</strong>: present the topic and announce your point of view or your plan.",
          "<strong>Body</strong>: one paragraph per idea, with an example; use linking words.",
          "<strong>Conclusion</strong>: sum up and give your opinion.",
          "Check your grammar, spelling and the number of words required.",
        ])}
        ${exemple(["Subject: “Should mobile phones be allowed at school?” Paragraph 1: advantages (research, communication). Paragraph 2: disadvantages (distraction, cheating). Conclusion: allowed, but with strict rules."])}`,
    },
  ],
};

/** Séries L : thèmes marqués L ou L & S. */
export const ANG_TLE_L: ChapterSpec[] = [trade, freeTime, economy, health, events, heritage, information, education, examSkills];

/** Séries S : thèmes marqués S ou L & S. */
export const ANG_TLE_S: ChapterSpec[] = [trade, economy, health, science, information, examSkills];
