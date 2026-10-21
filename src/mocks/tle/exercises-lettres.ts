import "server-only";

// Exercices corrigés de philosophie, français, histoire-géographie et anglais de Terminale, par titre
// de chapitre. Écrits par DIANGAL d’après les leçons, à faire relire par des enseignants.

import type { ExerciseSpec } from "../exercise-series";

export const PHILO_TLE_EXERCISES: Record<string, ExerciseSpec[]> = {
  "Origines et spécificité de la réflexion philosophique": [
    { qcm: "Étymologiquement, « philosophie » signifie…", choices: ["science de la nature", "*amour de la sagesse", "art de parler"], why: "Du grec philein (aimer) et sophia (sagesse)." },
    { qcm: "Selon Aristote, la philosophie commence par…", choices: ["la peur", "*l’étonnement", "la foi"], why: "« C’est l’étonnement qui poussa les premiers penseurs aux spéculations philosophiques. »" },
    { vf: "Le philosophe s’appuie sur la raison et l’argumentation plutôt que sur l’autorité.", answer: true, why: "C’est ce qui distingue la philosophie du sens commun et du mythe." },
  ],
  "Les grandes interrogations philosophiques": [
    { qcm: "La question « Qu’est-ce que le bien ? » relève de l’interrogation…", choices: ["métaphysique", "anthropologique", "*axiologique"], why: "L’axiologie étudie les valeurs." },
    { qcm: "Pour Kant, la question qui résume toutes les autres est…", choices: ["Que puis-je savoir ?", "*Qu’est-ce que l’homme ?", "Que dois-je faire ?"], why: "Elle rassemble les trois autres questions." },
    { vf: "L’interrogation métaphysique porte sur ce qui dépasse l’expérience sensible.", answer: true, why: "Dieu, l’âme, l’être, le sens de l’existence." },
  ],
  "Enjeux, finalités et perspectives philosophiques": [
    { qcm: "« Sapere aude ! » (aie le courage de te servir de ton propre entendement) est la devise des Lumières selon…", choices: ["Descartes", "*Kant", "Marx"], why: "Kant, Qu’est-ce que les Lumières ?" },
    { vf: "La fonction critique de la philosophie consiste à examiner les préjugés et les opinions.", answer: true, why: "C’est l’une de ses fonctions principales." },
    { qcm: "Parmi ces questions, laquelle relève de la bioéthique ?", choices: ["Le Soleil tourne-t-il autour de la Terre ?", "*Peut-on cloner un être humain ?", "Combien font 2 + 2 ?"], why: "La bioéthique réfléchit aux questions posées par la biologie et la médecine." },
  ],
  "L’idée d’une philosophie africaine": [
    { qcm: "L’auteur de La Philosophie bantoue (1945) est…", choices: ["Paulin Hountondji", "*Placide Tempels", "Cheikh Anta Diop"], why: "Tempels, missionnaire belge." },
    { qcm: "Paulin Hountondji critique…", choices: ["la négritude seulement", "*l’ethnophilosophie", "les mathématiques"], why: "Il refuse l’idée d’une philosophie collective et implicite." },
    { vf: "Souleymane Bachir Diagne est un philosophe sénégalais.", answer: true, why: "Il est l’un des représentants de la philosophie africaine contemporaine." },
  ],
  "Nature et culture": [
    { qcm: "Pour Lévi-Strauss, la règle universelle qui marque le passage de la nature à la culture est…", choices: ["l’usage du feu", "*la prohibition de l’inceste", "l’écriture"], why: "On la trouve dans toutes les sociétés." },
    { vf: "L’ethnocentrisme consiste à juger les autres cultures à partir de la sienne.", answer: true, why: "C’est sa définition." },
    { qcm: "Pour Hegel, dans la dialectique du maître et de l’esclave, celui qui se libère par le travail est…", choices: ["le maître", "*l’esclave", "aucun des deux"], why: "En transformant la nature, l’esclave se forme." },
  ],
  "Individu et société": [
    { qcm: "« L’homme est par nature un animal politique » est une phrase de…", choices: ["Rousseau", "*Aristote", "Sartre"], why: "Aristote, Politique." },
    { vf: "La légalité et la légitimité sont toujours la même chose.", answer: false, why: "Une loi peut être légale sans être juste." },
    { qcm: "Pour Kant, la personne doit toujours être traitée…", choices: ["comme un moyen", "*comme une fin", "comme une chose"], why: "C’est le fondement de la dignité humaine." },
  ],
  "Conscience et inconscient": [
    { qcm: "« Je pense, donc je suis » est de…", choices: ["Freud", "*Descartes", "Platon"], why: "Discours de la méthode." },
    { qcm: "Pour Freud, l’instance qui intériorise les interdits est…", choices: ["le ça", "le moi", "*le surmoi"], why: "Le surmoi représente les interdits parentaux et sociaux." },
    { vf: "Pour Freud, les rêves sont « la voie royale » vers l’inconscient.", answer: true, why: "Ils expriment des désirs refoulés de façon déguisée." },
  ],
  "La liberté": [
    { qcm: "« L’homme est condamné à être libre » est une phrase de…", choices: ["Spinoza", "*Sartre", "Hobbes"], why: "L’existentialisme est un humanisme." },
    { vf: "Le déterminisme et le fatalisme sont la même chose.", answer: false, why: "Connaître les causes permet d’agir sur elles ; le fatalisme dit qu’on ne peut rien changer." },
    { qcm: "Pour Rousseau, la liberté est…", choices: ["faire tout ce qu’on veut", "*l’obéissance à la loi qu’on s’est prescrite", "l’absence de toute loi"], why: "Du contrat social." },
  ],
  "L’État": [
    { qcm: "Pour éviter l’abus de pouvoir, Montesquieu propose…", choices: ["la monarchie absolue", "*la séparation des pouvoirs", "la suppression de l’État"], why: "« Le pouvoir arrête le pouvoir. »" },
    { qcm: "Un État de droit est un État…", choices: ["où le chef fait les lois seul", "*qui se soumet lui-même au droit", "sans Constitution"], why: "La Constitution limite le pouvoir et garantit les libertés." },
    { vf: "La mondialisation affaiblit la souveraineté des États.", answer: true, why: "Multinationales et marchés limitent leur marge d’action." },
  ],
  "L’émergence de la pensée scientifique": [
    { qcm: "La notion d’« obstacle épistémologique » est de…", choices: ["Comte", "*Bachelard", "Popper"], why: "La Formation de l’esprit scientifique (1938)." },
    { qcm: "La méthode expérimentale de Claude Bernard commence par…", choices: ["la loi", "*l’observation d’un fait", "la conclusion"], why: "Observation, hypothèse, expérimentation, loi." },
    { vf: "Pour Popper, une théorie scientifique doit être réfutable.", answer: true, why: "C’est le critère de falsifiabilité." },
  ],
  "Les différents types de sciences": [
    { qcm: "Les mathématiques sont une science…", choices: ["expérimentale", "*formelle", "humaine"], why: "Elles raisonnent par déduction à partir d’axiomes." },
    { qcm: "« Nous expliquons la nature, nous comprenons la vie psychique » est de…", choices: ["Descartes", "*Dilthey", "Bergson"], why: "Il distingue expliquer et comprendre." },
    { vf: "La vérité-cohérence est le critère des sciences formelles.", answer: true, why: "Un énoncé est vrai s’il ne contredit pas le système." },
  ],
  "Science et technique": [
    { qcm: "« Science sans conscience n’est que ruine de l’âme » est de…", choices: ["Montaigne", "*Rabelais", "Pascal"], why: "Pantagruel." },
    { qcm: "Hans Jonas a écrit…", choices: ["Le Contrat social", "*Le Principe responsabilité", "L’Éthique"], why: "Il y défend notre responsabilité envers les générations futures." },
    { vf: "La technique est plus ancienne que la science moderne.", answer: true, why: "Les outils de la préhistoire en témoignent." },
  ],
  "La représentation artistique": [
    { qcm: "« Est beau ce qui plaît universellement sans concept » est une définition de…", choices: ["Platon", "*Kant", "Hegel"], why: "Critique de la faculté de juger." },
    { qcm: "Pour Platon, l’art est…", choices: ["une révélation de la vérité", "*une imitation éloignée de la vérité", "une science"], why: "L’œuvre est une copie de copie." },
    { vf: "Pour Hegel, le beau artistique est supérieur au beau naturel.", answer: true, why: "Il est produit par l’esprit." },
  ],
  "Formes et fonctions de l’art": [
    { qcm: "Un masque utilisé lors d’une cérémonie traditionnelle remplit une fonction…", choices: ["décorative seulement", "*magico-religieuse", "commerciale"], why: "Il est lié au sacré et à la vie de la communauté." },
    { qcm: "L’épopée de Soundjata racontée par les griots a une fonction…", choices: ["subversive", "*commémorative", "publicitaire"], why: "Elle conserve la mémoire du passé." },
    { vf: "Pour Senghor, l’art négro-africain est fonctionnel et collectif.", answer: true, why: "Il est lié à la vie de la communauté." },
  ],
  "Les œuvres au programme : Descartes et Platon": [
    { qcm: "Dans le Discours de la méthode, la première règle de la méthode est la règle…", choices: ["de l’analyse", "*de l’évidence", "du dénombrement"], why: "Ne recevoir pour vrai que ce que l’on connaît évidemment être tel." },
    { qcm: "« Je pense, donc je suis » se trouve dans la partie du Discours consacrée…", choices: ["à la morale par provision", "*à la métaphysique (IVe partie)", "à la physique (Ve partie)"], why: "Le doute méthodique y conduit à la première certitude." },
    { qcm: "Dans le Ménon, la question de départ est :", choices: ["Qu’est-ce que la justice ?", "*La vertu peut-elle s’enseigner ?", "L’âme est-elle immortelle ?"], why: "Ménon demande si la vertu s’enseigne, s’acquiert par l’exercice ou vient de la nature." },
    { qcm: "Pour Platon, apprendre, c’est…", choices: ["recevoir le savoir du maître", "*se ressouvenir (réminiscence)", "imiter les anciens"], why: "L’âme, immortelle, a déjà tout appris : chercher et apprendre ne sont que réminiscence." },
    { vf: "L’esclave du Ménon découvre que le carré d’aire double se construit sur la diagonale du carré initial.", answer: true, why: "Socrate l’y conduit par des questions, sans lui enseigner la réponse." },
  ],
  "L’œuvre au programme : le Discours de la méthode": [
    { qcm: "Selon Descartes, « la chose du monde la mieux partagée » est…", choices: ["la richesse", "*le bon sens (la raison)", "la mémoire"], why: "La puissance de bien juger est naturellement égale chez tous les hommes." },
    { qcm: "La première règle de la méthode est la règle…", choices: ["de l’analyse", "*de l’évidence", "du dénombrement"], why: "Ne recevoir pour vrai que ce que l’on connaît évidemment être tel." },
    { qcm: "La morale par provision recommande notamment…", choices: ["de changer l’ordre du monde plutôt que ses désirs", "*d’être ferme et résolu dans ses actions", "de douter de tout dans la vie pratique"], why: "Comme des voyageurs égarés en forêt qui marchent toujours tout droit." },
    { vf: "Pour Descartes, le doute est méthodique : il vise à trouver une certitude.", answer: true, why: "Il conduit au « je pense, donc je suis »." },
    { qcm: "Dans la VIe partie, Descartes espère que la science nous rendra…", choices: ["plus heureux sans travail", "*comme maîtres et possesseurs de la nature", "indifférents à la médecine"], why: "Il pense surtout aux progrès de la médecine." },
  ],
  "Méthodologie de la dissertation et du commentaire": [
    { qcm: "Dans une introduction de dissertation, on trouve…", choices: ["la conclusion", "*la problématique et l’annonce du plan", "toutes les citations"], why: "Amorce, sujet, problème, plan." },
    { vf: "Expliquer un texte, c’est le paraphraser.", answer: false, why: "Il faut dire ce que le texte veut dire et comment il le dit." },
    { qcm: "Dans un commentaire de texte, la thèse est…", choices: ["le thème du texte", "*ce que l’auteur affirme", "la conclusion du candidat"], why: "Le thème est de quoi parle le texte ; la thèse, ce qu’il soutient." },
  ],
};

export const FR_TLE_EXERCISES: Record<string, ExerciseSpec[]> = {
  "Le surréalisme": [
    { qcm: "Le Manifeste du surréalisme (1924) est d’…", choices: ["Paul Éluard", "*André Breton", "Victor Hugo"], why: "Breton est le fondateur du mouvement." },
    { qcm: "« La terre est bleue comme une orange » est un vers de…", choices: ["Breton", "*Éluard", "Senghor"], why: "Paul Éluard, L’Amour la poésie." },
    { vf: "L’écriture automatique consiste à écrire sans le contrôle de la raison.", answer: true, why: "C’est une technique surréaliste." },
  ],
  "La poésie": [
    { num: "Combien de syllabes compte un alexandrin ?", answer: 12, why: "Deux hémistiches de 6 syllabes." },
    { qcm: "Des rimes ABAB sont…", choices: ["plates", "*croisées", "embrassées"], why: "AABB plates, ABAB croisées, ABBA embrassées." },
    { qcm: "Chants d’ombre (1945) est un recueil de…", choices: ["David Diop", "*Léopold Sédar Senghor", "Léon-Gontran Damas"], why: "Premier recueil de Senghor." },
  ],
  "Le roman": [
    { qcm: "L’Étranger est un roman de…", choices: ["Abbé Prévost", "*Albert Camus", "Ahmadou Kourouma"], why: "Camus, 1942." },
    { qcm: "Un narrateur qui sait tout des personnages adopte une focalisation…", choices: ["interne", "externe", "*zéro"], why: "C’est le narrateur omniscient." },
    { vf: "Fama est le héros des Soleils des indépendances.", answer: true, why: "Prince malinké déchu, héros de Kourouma." },
  ],
  "Le théâtre": [
    { qcm: "Les indications de mise en scène s’appellent…", choices: ["répliques", "*didascalies", "tirades"], why: "Elles sont souvent en italique." },
    { qcm: "L’Exil d’Albouri est une pièce de…", choices: ["Seydou Badian", "*Cheik Aliou Ndao", "Bernard Dadié"], why: "Elle met en scène Albouri Ndiaye, roi du Djolof." },
    { vf: "La tragédie classique respecte la règle des trois unités.", answer: true, why: "Unités d’action, de lieu et de temps." },
  ],
  "Le résumé de texte et la discussion": [
    { vf: "Dans un résumé, on peut donner son opinion personnelle.", answer: false, why: "Le résumé reste fidèle au point de vue de l’auteur." },
    { qcm: "On résume généralement un texte au…", choices: ["dixième", "*quart", "double"], why: "Le quart, avec une marge de 10 %." },
    { qcm: "Dans un résumé, on garde…", choices: ["les exemples", "*les idées essentielles dans l’ordre du texte", "les citations"], why: "On supprime exemples et citations." },
  ],
  "La dissertation littéraire": [
    { qcm: "Pour un sujet « Partagez-vous ce point de vue ? », on choisit souvent un plan…", choices: ["chronologique", "*dialectique", "descriptif"], why: "Thèse, antithèse, dépassement." },
    { vf: "Un bon exemple doit être précis et commenté.", answer: true, why: "Il prouve l’argument." },
    { qcm: "La conclusion d’une dissertation…", choices: ["introduit un nouvel argument", "*fait le bilan et répond à la problématique", "recopie l’introduction"], why: "Bilan, réponse, ouverture." },
  ],
  "Le commentaire de texte": [
    { qcm: "« Va, je ne te hais point » (Corneille) est…", choices: ["une hyperbole", "*une litote", "une métaphore"], why: "On dit moins pour suggérer plus." },
    { qcm: "Le commentaire composé s’organise en…", choices: ["mouvements du texte", "*axes de lecture", "paragraphes du texte"], why: "Le commentaire suivi suit les mouvements ; le composé, des axes." },
    { vf: "Dans un commentaire, il faut relier les procédés au sens du texte.", answer: true, why: "Forme et sens sont inséparables." },
  ],
  "Synthèse, compte rendu et correspondance": [
    { vf: "Dans une synthèse de documents, on donne son avis.", answer: false, why: "La synthèse est objective." },
    { qcm: "Un compte rendu est écrit…", choices: ["au futur", "*au passé, à la troisième personne", "en vers"], why: "Il relate un événement passé." },
    { qcm: "Une lettre formelle commence par…", choices: ["« Salut ! »", "*une formule d’appel comme « Monsieur le Directeur, »", "la signature"], why: "Le registre est soutenu." },
  ],
};

export const HG_TLE_EXERCISES: Record<string, ExerciseSpec[]> = {
  "Le monde au lendemain de la Seconde Guerre mondiale (1945-1990)": [
    { num: "En quelle année l’ONU a-t-elle été créée ?", answer: 1945, why: "Charte de San Francisco, 26 juin 1945." },
    { qcm: "Le mur de Berlin est tombé en…", choices: ["1961", "*1989", "1991"], why: "Le 9 novembre 1989." },
    { qcm: "La République populaire de Chine a été proclamée par…", choices: ["Tchang Kaï-chek", "*Mao Zedong", "Deng Xiaoping"], why: "Le 1er octobre 1949." },
  ],
  "Décolonisation et affirmation du tiers-monde": [
    { qcm: "La conférence de Bandoeng s’est tenue en…", choices: ["1945", "*1955", "1960"], why: "En avril 1955, en Indonésie." },
    { vf: "La Charte de l’ONU reconnaît le droit des peuples à disposer d’eux-mêmes.", answer: true, why: "C’est une des causes internationales de la décolonisation." },
    { qcm: "L’expression « tiers-monde » est due à…", choices: ["Nehru", "*Alfred Sauvy", "Senghor"], why: "En 1952." },
  ],
  "La décolonisation en Asie et au Proche-Orient": [
    { num: "En quelle année l’Inde est-elle devenue indépendante ?", answer: 1947, why: "Le 15 août 1947." },
    { qcm: "La défaite française qui met fin à la guerre d’Indochine a eu lieu à…", choices: ["Hanoï", "*Diên Biên Phu", "Saïgon"], why: "En mai 1954." },
    { qcm: "L’État d’Israël a été créé en…", choices: ["1947", "*1948", "1967"], why: "Le 14 mai 1948." },
  ],
  "La décolonisation en Afrique": [
    { num: "En quelle année la Gold Coast est-elle devenue indépendante sous le nom de Ghana ?", answer: 1957, why: "Le 6 mars 1957, avec Kwame Nkrumah." },
    { qcm: "Au référendum du 28 septembre 1958, le Sénégal a voté…", choices: ["non", "*oui", "il n’a pas voté"], why: "Il a choisi la Communauté française." },
    { qcm: "Le leader du PAIGC en Guinée-Bissau était…", choices: ["Agostinho Neto", "*Amílcar Cabral", "Sékou Touré"], why: "Il a été assassiné en 1973." },
    { num: "En quelle année les accords d’Évian ont-ils été signés ?", answer: 1962, why: "Le 18 mars 1962 ; l’Algérie devient indépendante le 5 juillet." },
  ],
  "Les civilisations négro-africaines": [
    { qcm: "Le fondateur de la Mouridiyya est…", choices: ["El Hadji Malick Sy", "*Cheikh Ahmadou Bamba", "Seydina Limamou Laye"], why: "Touba est la ville sainte des mourides." },
    { vf: "Dans les religions traditionnelles africaines, le culte des ancêtres occupe une grande place.", answer: true, why: "Les ancêtres sont des intermédiaires avec le monde invisible." },
    { qcm: "Le pèlerinage marial de Popenguine est…", choices: ["musulman", "*catholique", "animiste"], why: "Il rassemble chaque année des fidèles catholiques." },
  ],
  "La civilisation musulmane": [
    { num: "En quelle année a eu lieu l’hégire, point de départ du calendrier musulman ?", answer: 622, why: "Émigration du Prophète de La Mecque à Médine." },
    { num: "Combien l’islam compte-t-il de piliers ?", answer: 5, why: "Chahada, prière, aumône, jeûne, pèlerinage." },
    { qcm: "L’école juridique dominante en Afrique de l’Ouest est l’école…", choices: ["hanbalite", "*malikite", "hanafite"], why: "Elle domine aussi au Maghreb." },
  ],
  "Le système-monde : des espaces interdépendants": [
    { qcm: "Les trois grands pôles de la Triade sont…", choices: ["Afrique, Europe, Asie", "*Amérique du Nord, Union européenne, Asie orientale", "Brésil, Inde, Chine"], why: "Ils dominent l’économie mondiale." },
    { qcm: "La ZLECAf est…", choices: ["une monnaie", "*la zone de libre-échange continentale africaine", "une banque"], why: "Elle vise un grand marché africain." },
    { vf: "Une crise dans un pôle de la mondialisation peut toucher le monde entier.", answer: true, why: "C’est l’effet de l’interdépendance." },
  ],
  "L’espace nord-américain": [
    { qcm: "L’ALENA a été remplacé en 2020 par…", choices: ["l’OTAN", "*l’ACEUM", "l’Union européenne"], why: "Accord Canada–États-Unis–Mexique." },
    { qcm: "La Silicon Valley est célèbre pour…", choices: ["le pétrole", "*l’informatique", "le coton"], why: "Haute technologie, en Californie." },
    { vf: "Les maquiladoras sont des usines d’assemblage installées au Mexique.", answer: true, why: "Elles profitent d’une main-d’œuvre moins chère." },
  ],
  "L’espace européen": [
    { num: "Combien de pays membres compte l’Union européenne depuis le Brexit ?", answer: 27, why: "Le Royaume-Uni est sorti en 2020." },
    { qcm: "Le traité de Rome (1957) a créé…", choices: ["l’euro", "*la Communauté économique européenne", "l’OTAN"], why: "Le marché commun entre six pays." },
    { vf: "L’Allemagne est le pays le plus peuplé de l’Union européenne.", answer: true, why: "Environ 84 millions d’habitants." },
  ],
  "L’Asie-Pacifique": [
    { qcm: "La politique de l’enfant unique en Chine a duré de 1979 à…", choices: ["1990", "*2015", "2023"], why: "Remplacée par deux enfants (2016), puis trois (2021)." },
    { qcm: "Les « dragons » asiatiques comprennent…", choices: ["le Japon et la Chine", "*la Corée du Sud, Taïwan, Hong Kong et Singapour", "l’Inde et le Pakistan"], why: "Ce sont les premiers pays industrialisés après le Japon." },
    { vf: "Le Japon est un archipel pauvre en ressources naturelles.", answer: true, why: "Il importe l’essentiel de ses matières premières." },
  ],
  "L’Amérique latine": [
    { qcm: "Le Brésil fait partie des…", choices: ["pays du G7", "*BRICS", "pays de l’Union européenne"], why: "Avec la Russie, l’Inde, la Chine et l’Afrique du Sud, notamment." },
    { vf: "Les favelas sont des quartiers pauvres des villes brésiliennes.", answer: true, why: "Elles illustrent les inégalités urbaines." },
    { qcm: "La grande forêt menacée par la déforestation au Brésil est…", choices: ["la pampa", "*l’Amazonie", "l’Atacama"], why: "L’Amazonie recule sous l’effet de l’agriculture et de l’élevage." },
  ],
  "L’Afrique et le Sénégal": [
    { num: "Combien de régions administratives compte le Sénégal ?", answer: 14, why: "Le pays compte 14 régions." },
    { qcm: "Le barrage de Diama sert surtout à…", choices: ["produire du pétrole", "*empêcher la remontée de l’eau salée", "fabriquer du ciment"], why: "Il bloque la langue salée dans le fleuve Sénégal." },
    { qcm: "Dakar est en partie alimentée en eau par…", choices: ["le fleuve Casamance", "*le lac de Guiers", "le lac Rose"], why: "Par une conduite de plus de 200 km." },
  ],
};

export const ANG_TLE_EXERCISES: Record<string, ExerciseSpec[]> = {
  "Trade, professions and occupations": [
    { qcm: "“Children ___ work in mines.” (prohibition)", choices: ["don’t have to", "*mustn’t", "needn’t"], why: "Mustn’t expresses a prohibition (interdiction)." },
    { qcm: "A letter that begins with “Dear Sir” ends with…", choices: ["Yours sincerely", "*Yours faithfully", "See you soon"], why: "Dear Sir / Madam → Yours faithfully." },
    { vf: "“Unemployment” means “le chômage”.", answer: true, why: "Unemployed = sans emploi." },
  ],
  "Free time and entertainment": [
    { qcm: "“I enjoy ___ novels.”", choices: ["to read", "*reading", "read"], why: "Enjoy is followed by verb-ing." },
    { qcm: "“I would rather ___ at home.”", choices: ["to stay", "*stay", "staying"], why: "Would rather + base verb." },
    { vf: "“Laamb” is the Wolof name of traditional wrestling.", answer: true, why: "It is the most popular sport in Senegal." },
  ],
  Economy: [
    { qcm: "“Rice imports ___ sharply in 2015.” (going up)", choices: ["fell", "*rose", "remained"], why: "Rise / rose = augmenter." },
    { qcm: "“Solar energy is ___ sustainable than oil.”", choices: ["most", "*more", "much"], why: "Long adjective: more … than." },
    { vf: "“Wealth” means “la pauvreté”.", answer: false, why: "Wealth = la richesse ; poverty = la pauvreté." },
  ],
  "Health, welfare and environment": [
    { qcm: "“If we plant trees, the air ___ cleaner.”", choices: ["would be", "*will be", "is being"], why: "Type 1 conditional: if + present, will + verb." },
    { qcm: "“You ___ better see a doctor.”", choices: ["have", "*had", "would"], why: "Had better + base verb." },
    { qcm: "“If I ___ money, I would build a clinic.”", choices: ["have", "*had", "will have"], why: "Type 2 conditional: if + past, would + verb." },
  ],
  "Events and changes": [
    { qcm: "“The country ___ by Britain.” (passive, past)", choices: ["colonised", "*was colonised", "has colonise"], why: "Passive = be + past participle." },
    { qcm: "“People ___ travel by camel.” (past habit)", choices: ["use to", "*used to", "were use"], why: "Used to + verb for a past habit." },
    { num: "In which year did Ghana become independent?", answer: 1957, why: "Ghana became independent on 6 March 1957." },
  ],
  "Cultural heritage": [
    { qcm: "“Touba is the city ___ the Grand Magal takes place.”", choices: ["which", "*where", "who"], why: "Where for places." },
    { qcm: "“Senghor, ___ poems are studied in schools, was a president.”", choices: ["who", "*whose", "which"], why: "Whose expresses possession." },
    { vf: "“Teranga” means hospitality.", answer: true, why: "It is a Wolof word." },
  ],
  "Science and technology": [
    { qcm: "“First, the groundnuts ___ shelled.”", choices: ["are being to", "*are", "have"], why: "Present passive: are + past participle." },
    { qcm: "Which word is NOT a sequence word?", choices: ["then", "finally", "*however"], why: "However expresses contrast." },
    { vf: "“ICTs” stands for Information and Communication Technologies.", answer: true, why: "In French: les TIC." },
  ],
  "Information and communication": [
    { qcm: "“I am tired,” she said. → She said she ___ tired.", choices: ["is", "*was", "will be"], why: "The present becomes past in reported speech." },
    { qcm: "“Are you ready?” she asked. → She asked ___ I was ready.", choices: ["that", "*if", "what"], why: "Yes/no questions are reported with if or whether." },
    { vf: "Before sharing a message, we should check its source.", answer: true, why: "It helps fight fake news." },
  ],
  Education: [
    { qcm: "“___ school is free, many children drop out.”", choices: ["Because", "*Although", "Therefore"], why: "Although introduces a contrast." },
    { qcm: "Which linking word expresses a consequence?", choices: ["however", "*therefore", "although"], why: "Therefore = donc." },
    { vf: "“To drop out of school” means “abandonner l’école”.", answer: true, why: "Drop-out = élève qui abandonne." },
  ],
  "Exam skills: reading and writing": [
    { qcm: "Reading quickly to get the general idea of a text is called…", choices: ["scanning", "*skimming", "spelling"], why: "Scanning = looking for specific information." },
    { vf: "For a “True or False” question, you must justify your answer with the text.", answer: true, why: "Quote a short passage." },
    { qcm: "In an essay, each paragraph of the body should contain…", choices: ["several unrelated ideas", "*one main idea with an example", "only a quotation"], why: "One idea per paragraph, supported by an example." },
  ],
};
