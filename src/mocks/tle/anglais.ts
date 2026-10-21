// Anglais de Terminale : « Programmes de LV anglais » (Commission nationale pour l'anglais, IGEN,
// 4e édition, 2017), mis en ligne par l'Office du Bac. Thèmes (topics) marqués L, S ou L & S ;
// la Terminale révise les fonctions et la grammaire de la 2nde et de la 1re et prépare l'examen.
// Explications en anglais simple avec des repères en français. Leçons rédigées par DIANGAL, à
// faire valider par un professeur d'anglais.

import { auBac, type ChapterSpec, erreurs, exemple, exercice, liste, methode, objectifs, retenir, tableau } from "./blocks";

const reading = (title: string, paragraphs: string[]) =>
  `<h2>${title}</h2>${paragraphs.map((p) => `<p>${p}</p>`).join("")}`;

const trade: ChapterSpec = {
  title: "Trade, professions and occupations",
  summary: "Jobs, working conditions, unemployment, child labour ; obligation and the letter of application.",
  lessons: [
    {
      title: "The world of work",
      minutes: 30,
      body: `${objectifs([
          "parler des métiers, de l’emploi et du chômage ;",
          "distinguer noms dénombrables et indénombrables, et bien employer les articles.",
        ])}
        ${reading("Reading: Looking for a job in Dakar", [
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
        ${retenir("“Work” is uncountable: <em>I have a lot of work</em>. “Job” is countable: <em>She has two jobs</em>.")}
        <h2>Grammar: countable and uncountable nouns</h2>
        ${tableau([
          ["Countable", "Uncountable"],
          ["a job, two jobs ; a worker, many workers", "work, information, advice, money, equipment"],
          ["How many jobs?", "How much work?"],
          ["a few / many", "a little / much"],
        ])}
        ${exercice(
          "Complete with a, an, some, much or many: 1) She has ___ interesting job. 2) We need ___ information about the training. 3) There aren’t ___ jobs in my village. 4) He gave me ___ good advice.",
          [
            "1) <strong>an</strong> interesting job (countable, before a vowel sound).",
            "2) <strong>some</strong> information (uncountable: no “an informations”).",
            "3) <strong>many</strong> jobs (countable plural, negative sentence).",
            "4) <strong>some</strong> good advice (uncountable: never “an advice”).",
          ],
        )}`,
    },
    {
      title: "Obligation, necessity and the letter of application",
      minutes: 30,
      body: `${objectifs([
          "exprimer l’obligation, l’absence d’obligation et l’interdiction ;",
          "rédiger une lettre de candidature.",
        ])}
        ${tableau([
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
        ], "Writing a letter of application")}
        ${exercice(
          "Rewrite using must, mustn’t, don’t have to or had to: 1) It is compulsory to wear a helmet on a building site. 2) It is forbidden to employ children. 3) It is not necessary to have a degree for this job. 4) Last year, he was obliged to stop school.",
          [
            "1) Workers <strong>must</strong> wear a helmet on a building site.",
            "2) Employers <strong>mustn’t</strong> employ children.",
            "3) You <strong>don’t have to</strong> have a degree for this job.",
            "4) Last year, he <strong>had to</strong> stop school.",
          ],
        )}
        ${auBac("In the writing part, a letter is often required: respect the layout (addresses, date, greeting, closing formula) and the number of words.")}`,
    },
  ],
};

const freeTime: ChapterSpec = {
  title: "Free time and entertainment",
  summary: "Hobbies, sports, media and culture ; expressing preferences.",
  lessons: [
    {
      title: "Hobbies, sports and entertainment",
      minutes: 25,
      body: `${objectifs([
          "parler des loisirs, des sports et des spectacles ;",
          "employer correctement le gérondif et l’infinitif après certains verbes.",
        ])}
        ${reading("Reading: Wrestling, more than a sport", [
          "In Senegal, traditional wrestling (laamb) is the most popular sport. Before a fight, wrestlers dance, sing and perform rituals, and griots praise them with drums. Big fights fill the national arena and are watched on television by millions of fans.",
          "Young people also enjoy football, basketball, music and social media. Leisure activities help us relax, meet people and discover new talents.",
        ])}
        ${tableau([
          ["Word", "Meaning"],
          ["a hobby / a pastime", "un passe-temps"],
          ["a fan / a supporter", "un supporter"],
          ["to go to the cinema / to a concert", "aller au cinéma, à un concert"],
          ["a museum / an exhibition", "un musée / une exposition"],
        ])}
        <h2>Grammar: verb + -ing or verb + to</h2>
        ${tableau([
          ["+ verb-ing", "+ to + verb"],
          ["enjoy, mind, avoid, finish, keep, can’t stand", "want, decide, hope, plan, refuse, learn"],
          ["I enjoy watching wrestling.", "I want to become a footballer."],
        ])}
        ${exercice(
          "Put the verbs in the correct form: 1) He decided (join) a football club. 2) They enjoy (watch) laamb on TV. 3) She avoids (play) video games at night. 4) We hope (go) to the concert.",
          ["1) to join.", "2) watching.", "3) playing.", "4) to go."],
        )}`,
    },
    {
      title: "Expressing likes, dislikes and preferences",
      minutes: 25,
      body: `${objectifs([
          "exprimer goûts, préférences et souhaits ;",
          "employer would rather, prefer et would like.",
        ])}
        ${tableau([
          ["Structure", "Example"],
          ["like / love / enjoy / hate + verb-ing", "I enjoy reading novels."],
          ["prefer + noun / verb-ing + to", "She prefers football to basketball."],
          ["would rather + base verb (+ than)", "I would rather stay at home than go out tonight."],
          ["would like + to + verb", "I would like to visit Gorée."],
        ])}
        ${retenir("After <strong>enjoy</strong>, <strong>mind</strong>, <strong>avoid</strong>, <strong>finish</strong>, use verb-ing. After <strong>would rather</strong>, use the base form: <em>I’d rather watch</em> (not “to watch”).")}
        ${exercice(
          "Rewrite each sentence using the word in brackets: 1) I like reading more than watching TV. (prefer) 2) I’d prefer to stay at home. (rather) 3) I want to visit Saint-Louis. (would like)",
          [
            "1) I <strong>prefer</strong> reading <strong>to</strong> watching TV.",
            "2) I <strong>would rather</strong> stay at home.",
            "3) I <strong>would like</strong> to visit Saint-Louis.",
          ],
        )}`,
    },
  ],
};

const economy: ChapterSpec = {
  title: "Economy",
  summary: "Shopping, consumer society, poverty, development, agriculture and industry ; describing graphs.",
  lessons: [
    {
      title: "Poverty and development",
      minutes: 30,
      body: `${objectifs([
          "parler de pauvreté, de richesse et de développement durable ;",
          "former des mots avec des préfixes et des suffixes.",
        ])}
        ${reading("Reading: From groundnuts to oil", [
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
        ])}
        <h2>Word formation: prefixes and suffixes</h2>
        ${tableau([
          ["Affix", "Meaning", "Examples"],
          ["un-, in-, im-, dis-", "opposite", "unemployed, independent, impossible, dishonest"],
          ["-ment, -tion, -ness", "noun", "development, production, happiness"],
          ["-ful / -less", "with / without", "useful / useless, careful / careless"],
          ["-ize / -ise", "verb", "industrialize, modernise"],
        ])}
        ${exercice(
          "Give the word asked for: 1) poor → noun. 2) develop → noun. 3) employed → opposite. 4) sustain → adjective.",
          ["1) poverty.", "2) development.", "3) unemployed.", "4) sustainable."],
        )}`,
    },
    {
      title: "Describing graphs and making comparisons",
      minutes: 30,
      body: `${objectifs([
          "décrire l’évolution d’un graphique ;",
          "employer comparatifs et superlatifs.",
        ])}
        ${tableau([
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
        ])}
        ${exercice(
          "A graph shows the number of tourists in Senegal (in thousands): 2015: 1 000 ; 2019: 1 600 ; 2020: 500 ; 2023: 1 400. Write three sentences describing it.",
          [
            "Between 2015 and 2019, the number of tourists <strong>rose steadily</strong> from one million to 1.6 million.",
            "In 2020, it <strong>fell dramatically</strong> to 500,000 because of the Covid-19 pandemic.",
            "Since then, it has <strong>increased sharply</strong>, but it is still <strong>lower than</strong> in 2019.",
          ],
        )}`,
    },
  ],
};

const health: ChapterSpec = {
  title: "Health, welfare and environment",
  summary: "Diseases, hygiene, pollution, the progress of medicine ; giving advice and conditionals.",
  lessons: [
    {
      title: "Health and environment",
      minutes: 30,
      body: `${objectifs([
          "parler de santé, d’hygiène et de pollution ;",
          "comprendre un texte et répondre à des questions.",
        ])}
        ${reading("Reading: Plastic everywhere", [
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
        ])}
        ${exercice(
          "Answer the questions on the reading “Plastic everywhere”: 1) Why are plastic bags popular? 2) Give two dangers of plastic bags. 3) True or false: burning plastic is a good solution. Justify.",
          [
            "1) Because they are cheap and practical.",
            "2) They block drains and they kill animals that eat them (they also pollute beaches).",
            "3) False: “Burning them releases toxic smoke.”",
          ],
        )}`,
    },
    {
      title: "Giving advice and conditionals",
      minutes: 30,
      body: `${objectifs([
          "donner des conseils ;",
          "employer les trois types de conditionnel.",
        ])}
        ${tableau([
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
        ${retenir("No “will” or “would” in the if-clause: <em>If it rains</em> (not “if it will rain”).")}
        ${exercice(
          "Complete with the correct form: 1) If you (sleep) under a mosquito net, you won’t catch malaria. 2) If I (be) the Minister of Health, I would build more hospitals. 3) If he had washed his hands, he (not / be) ill.",
          [
            "1) <strong>sleep</strong> (type 1: present in the if-clause).",
            "2) <strong>were</strong> (type 2: “If I were…”).",
            "3) <strong>wouldn’t have been</strong> (type 3: would have + past participle).",
          ],
        )}
        ${erreurs(["putting will or would in the if-clause ;", "writing “if I was” in formal writing: prefer “if I were”."])}`,
    },
  ],
};

const events: ChapterSpec = {
  title: "Events and changes",
  summary: "Colonial time and independence, war, politics, contemporary Africa ; past tenses and the passive.",
  lessons: [
    {
      title: "Colonial times and the struggle for independence",
      minutes: 30,
      body: `${objectifs([
          "parler de la colonisation et des indépendances ;",
          "comprendre un texte historique et en dégager les idées.",
        ])}
        ${reading("Reading: The winds of change", [
          "After the Second World War, many African soldiers who had fought for Europe came back with new ideas. Political parties and trade unions were created, and leaders such as Kwame Nkrumah, Léopold Sédar Senghor and Amílcar Cabral demanded freedom.",
          "Ghana became independent in 1957. In 1960 alone, seventeen African countries gained their independence. In Portuguese colonies, the struggle was longer and armed.",
        ])}
        ${tableau([
          ["Word", "Meaning"],
          ["to colonise / a colony", "coloniser / une colonie"],
          ["independence / to gain independence", "l’indépendance / obtenir l’indépendance"],
          ["a struggle / to struggle", "une lutte / lutter"],
          ["an election / to vote", "une élection / voter"],
        ])}
        ${exercice(
          "Answer the questions on “The winds of change”: 1) What did African soldiers bring back after the Second World War? 2) Name two leaders who demanded freedom. 3) What happened in 1960?",
          [
            "1) They came back with new ideas.",
            "2) Kwame Nkrumah, Léopold Sédar Senghor (or Amílcar Cabral).",
            "3) Seventeen African countries gained their independence.",
          ],
        )}`,
    },
    {
      title: "Talking about the past: tenses and the passive",
      minutes: 30,
      body: `${objectifs([
          "employer les temps du passé ;",
          "passer de la voix active à la voix passive.",
        ])}
        ${tableau([
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
        ${retenir("Passive = be (at the right tense) + past participle. Use “by” to name the agent when it is important.")}
        ${exercice(
          "Turn into the passive: 1) Britain colonised Ghana. 2) The government has built new schools. 3) People speak Wolof all over Senegal.",
          [
            "1) Ghana <strong>was colonised</strong> by Britain.",
            "2) New schools <strong>have been built</strong> (by the government).",
            "3) Wolof <strong>is spoken</strong> all over Senegal (no agent: “people” is not important).",
          ],
        )}`,
    },
  ],
};

const heritage: ChapterSpec = {
  title: "Cultural heritage",
  summary: "Religions, ceremonies and festivals, moral values ; relative clauses.",
  lessons: [
    {
      title: "Customs, ceremonies and values",
      minutes: 25,
      body: `${objectifs([
          "parler des coutumes, des fêtes et des valeurs ;",
          "placer correctement plusieurs adjectifs devant un nom.",
        ])}
        ${reading("Reading: Teranga", [
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
        ])}
        <h2>Grammar: the order of adjectives</h2>
        <p>opinion → size → age → shape → colour → origin → material → purpose + noun: <em>a beautiful long white Senegalese cotton boubou</em>.</p>
        ${exercice(
          "Put the adjectives in the right order: 1) a (old / wooden / small) mask. 2) a (Senegalese / delicious / traditional) dish. 3) a (blue / big / beautiful) boat.",
          ["1) a small old wooden mask.", "2) a delicious traditional Senegalese dish.", "3) a beautiful big blue boat."],
        )}`,
    },
    {
      title: "Relative clauses",
      minutes: 25,
      body: `${objectifs([
          "relier deux phrases avec un pronom relatif ;",
          "distinguer propositions relatives déterminatives et explicatives.",
        ])}
        ${tableau([
          ["Pronoun", "Use", "Example"],
          ["who", "people", "The griot who sang at the wedding is famous."],
          ["which / that", "things", "Gorée is an island which reminds us of the slave trade."],
          ["whose", "possession", "Senghor, whose poems are studied in schools, was a president."],
          ["where", "places", "Touba is the city where the Grand Magal takes place."],
        ])}
        ${retenir("Non-defining relative clauses give extra information: they are separated by commas and never use “that”.")}
        ${exercice(
          "Join the sentences with a relative pronoun: 1) This is the griot. He sang at my sister’s wedding. 2) Gorée is an island. Thousands of slaves were deported from it. 3) Senghor was a poet. His poems are famous.",
          [
            "1) This is the griot <strong>who</strong> sang at my sister’s wedding.",
            "2) Gorée is an island <strong>from which</strong> thousands of slaves were deported.",
            "3) Senghor was a poet <strong>whose</strong> poems are famous.",
          ],
        )}`,
    },
  ],
};

const science: ChapterSpec = {
  title: "Science and technology",
  summary: "Inventions and discoveries, ICTs, science and ethics ; describing a process with the passive.",
  lessons: [
    {
      title: "Inventions, discoveries and ICTs",
      minutes: 25,
      body: `${objectifs([
          "parler des inventions, des découvertes et des TIC ;",
          "débattre des avantages et des dangers de la technologie.",
        ])}
        ${reading("Reading: Mobile money", [
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
        ])}
        ${exercice(
          "Write a short paragraph (60 words) on: “Mobile phones: a blessing or a curse?” Give the outline.",
          [
            "Topic sentence: Mobile phones have changed our lives.",
            "Advantages: communication with relatives, mobile money, access to information and education.",
            "Disadvantages: addiction, distraction at school, fake news, cyberbullying.",
            "Conclusion: a blessing if we use them wisely.",
          ],
        )}
        ${auBac("In an argumentative paragraph, give both sides with linking words (on the one hand, on the other hand, however) before your opinion.")}`,
    },
    {
      title: "Describing a process",
      minutes: 25,
      body: `${objectifs([
          "décrire un procédé avec le passif et les mots de séquence ;",
          "exprimer le but.",
        ])}
        <p>To describe how something is made or how it works, we use <strong>the passive</strong> and <strong>sequence words</strong>.</p>
        ${exemple([
          "<strong>First</strong>, the groundnuts are shelled. <strong>Then</strong>, they are crushed and pressed to extract the oil. <strong>After that</strong>, the oil is filtered. <strong>Finally</strong>, it is put into bottles and sold.",
        ], "How groundnut oil is made")}
        ${liste([
          "sequence words: first, then, next, after that, finally ;",
          "purpose: to + verb, so that, in order to.",
        ])}
        ${exercice(
          "Describe how mango juice is made, using the passive and sequence words: wash the mangoes ; peel them ; cut them ; mix them with water and sugar ; filter the juice ; put it into bottles.",
          [
            "<strong>First</strong>, the mangoes are washed and peeled.",
            "<strong>Then</strong>, they are cut and mixed with water and sugar.",
            "<strong>After that</strong>, the juice is filtered. <strong>Finally</strong>, it is put into bottles.",
          ],
        )}`,
    },
  ],
};

const information: ChapterSpec = {
  title: "Information and communication",
  summary: "Media, ICTs, advertisements, the right to information ; reported speech.",
  lessons: [
    {
      title: "The media and the information explosion",
      minutes: 25,
      body: `${objectifs([
          "parler des médias, des réseaux sociaux et de la publicité ;",
          "exercer son esprit critique face à l’information.",
        ])}
        ${reading("Reading: Fake news", [
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
        ])}
        ${exercice(
          "Answer the questions on “Fake news”: 1) Why do rumours travel fast today? 2) What should we do before sharing a message? 3) Find in the text a word meaning “publicity”.",
          [
            "1) Because, with social networks, anyone can publish information.",
            "2) We should check its source and compare it with other reliable media.",
            "3) Advertisements.",
          ],
        )}`,
    },
    {
      title: "Reported speech",
      minutes: 30,
      body: `${objectifs([
          "passer du discours direct au discours indirect ;",
          "appliquer la concordance des temps et le changement des repères de temps.",
        ])}
        ${tableau([
          ["Direct speech", "Reported speech"],
          ["“I am tired,” she said.", "She said (that) she was tired."],
          ["“We will come,” they said.", "They said they would come."],
          ["“I saw him yesterday,” he said.", "He said he had seen him the day before."],
          ["“Where do you live?” he asked.", "He asked me where I lived."],
          ["“Are you ready?” she asked.", "She asked if I was ready."],
        ])}
        ${retenir("After a past reporting verb, tenses go one step back (present → past, past → past perfect, will → would) and time words change (now → then, today → that day, tomorrow → the next day).")}
        ${exercice(
          "Turn into reported speech: 1) “I am watching the news,” said Awa. 2) “We will vote tomorrow,” they said. 3) “Did you read the newspaper?” he asked me. 4) “Don’t share fake news,” the teacher told us.",
          [
            "1) Awa said (that) she <strong>was watching</strong> the news.",
            "2) They said they <strong>would vote the next day</strong>.",
            "3) He asked me <strong>if I had read</strong> the newspaper.",
            "4) The teacher told us <strong>not to share</strong> fake news (imperative → (not) to + verb).",
          ],
        )}`,
    },
  ],
};

const education: ChapterSpec = {
  title: "Education",
  summary: "Traditional education, schooling, changing values, civics and peace ; linking words.",
  lessons: [
    {
      title: "Traditional and modern education",
      minutes: 25,
      body: `${objectifs([
          "comparer éducation traditionnelle et éducation moderne ;",
          "argumenter sur le rôle de l’école.",
        ])}
        ${reading("Reading: Learning under the tree", [
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
        ])}
        ${exercice(
          "Compare traditional and modern education in three sentences using whereas, both and unlike.",
          [
            "Traditional education took place in the community, <strong>whereas</strong> modern education takes place at school.",
            "<strong>Both</strong> systems teach children how to become responsible adults.",
            "<strong>Unlike</strong> traditional education, modern education gives certificates.",
          ],
        )}`,
    },
    {
      title: "Linking words for an argumentative essay",
      minutes: 25,
      body: `${objectifs([
          "employer les mots de liaison de l’argumentation ;",
          "organiser des idées en paragraphes cohérents.",
        ])}
        ${tableau([
          ["Function", "Linking words"],
          ["adding", "moreover, furthermore, in addition, besides"],
          ["contrasting", "however, although, whereas, on the other hand, despite + noun"],
          ["cause", "because, since, as, because of + noun"],
          ["consequence", "so, therefore, as a result, consequently"],
          ["concluding", "to sum up, in conclusion, all in all"],
        ])}
        ${exemple(["<strong>Although</strong> school is free, many children drop out. <strong>Therefore</strong>, the government should help poor families."])}
        ${exercice(
          "Choose the right linking word: 1) (Although / Because) he studied hard, he failed. 2) Many girls drop out of school; (therefore / however), some of them become successful businesswomen. 3) School is important (because of / because) it prepares us for life.",
          ["1) Although.", "2) however.", "3) because (followed by a clause)."],
        )}`,
    },
  ],
};

const examSkills: ChapterSpec = {
  title: "Exam skills: reading and writing",
  summary: "Reading comprehension strategies and essay writing for the baccalauréat.",
  lessons: [
    {
      title: "Reading comprehension strategies",
      minutes: 30,
      body: `${objectifs([
          "appliquer les stratégies de lecture (skimming, scanning) ;",
          "répondre avec précision aux questions de compréhension.",
        ])}
        ${methode([
          "<strong>Skim</strong> the text: read the title and the first lines of each paragraph to get the general idea.",
          "Read the questions before reading the text in detail.",
          "<strong>Scan</strong> for specific information: names, dates, numbers, key words.",
          "For “True or False”, always justify with a short quotation from the text.",
          "Guess the meaning of new words from the context, the word family or prefixes and suffixes.",
        ])}
        ${retenir("Answer questions with your own words when asked “explain” or “why”, and with short complete sentences.")}
        ${exercice(
          "Read: “Lake Retba, also called the Pink Lake, is 35 km from Dakar. Its water is very salty, and hundreds of workers collect salt there every day. Its pink colour comes from tiny algae.” Answer: 1) Where is Lake Retba? 2) True or false: nobody works at the lake. Justify. 3) Why is the lake pink?",
          [
            "1) It is 35 km from Dakar.",
            "2) False: “hundreds of workers collect salt there every day”.",
            "3) Because of tiny algae (its pink colour comes from tiny algae).",
          ],
        )}
        ${auBac("The English paper usually includes reading comprehension, language usage (grammar and vocabulary) and writing: manage your time and answer every question.")}`,
    },
    {
      title: "Writing an essay",
      minutes: 35,
      body: `${objectifs([
          "analyser un sujet et construire un plan ;",
          "rédiger une introduction, des paragraphes argumentés et une conclusion.",
        ])}
        ${methode([
          "Read the subject carefully and underline the key words.",
          "Brainstorm ideas and examples, then make a plan.",
          "<strong>Introduction</strong>: present the topic and announce your point of view or your plan.",
          "<strong>Body</strong>: one paragraph per idea, with an example; use linking words.",
          "<strong>Conclusion</strong>: sum up and give your opinion.",
          "Check your grammar, spelling and the number of words required.",
        ])}
        ${exemple(["Subject: “Should mobile phones be allowed at school?” Paragraph 1: advantages (research, communication). Paragraph 2: disadvantages (distraction, cheating). Conclusion: allowed, but with strict rules."])}
        ${exercice(
          "Write the introduction and the outline of an essay on: “Should young Africans emigrate to find a better life?”",
          [
            "<strong>Introduction</strong>: Every year, thousands of young Africans leave their countries, sometimes at the risk of their lives. Is emigration the best solution to find a better life?",
            "<strong>Paragraph 1</strong>: reasons to emigrate: unemployment, poverty, better education abroad, money sent home.",
            "<strong>Paragraph 2</strong>: dangers and disadvantages: dangerous journeys, loneliness, racism, brain drain for Africa.",
            "<strong>Conclusion</strong>: emigration can help some people, but creating jobs at home is the real solution.",
          ],
        )}`,
    },
  ],
};

/** Séries L : thèmes marqués L ou L & S. */
export const ANG_TLE_L: ChapterSpec[] = [trade, freeTime, economy, health, events, heritage, information, education, examSkills];

/** Séries S : thèmes marqués S ou L & S. */
export const ANG_TLE_S: ChapterSpec[] = [trade, economy, health, science, information, examSkills];
