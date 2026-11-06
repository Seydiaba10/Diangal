import "server-only";

// Bac blanc DIANGAL n°1, français (toutes les séries) : au Bac, le candidat choisit un sujet parmi trois
// (résumé et discussion, commentaire, dissertation), en 4 heures. DIANGAL en fait trois sujets blancs, un par
// type d'épreuve, chacun avec sa grille d'auto-évaluation. Texte à résumer et sujets rédigés par DIANGAL ;
// poème à commenter du domaine public (Victor Hugo, 1856).

import type { MockExamSpec } from "../../exercise-series";
import { head, reading } from "../../cm2/cfee/helpers";

const list = (...items: string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
const model = (...paragraphs: string[]) => `<div class="model-text">${reading(...paragraphs)}</div>`;

/** Texte à résumer, rédigé par DIANGAL (nombre de mots vérifié par tests/unit/bac-blancs.test.ts). */
export const RESUME_TEXT = [
  "Il y a une génération, l’élève qui voulait lire devait d’abord trouver un livre. Les bibliothèques étaient rares, les librairies concentrées dans les grandes villes, et un roman passait de main en main jusqu’à perdre sa couverture. Aujourd’hui, le même élève tient dans sa poche plus de textes qu’aucune bibliothèque de son quartier n’en a jamais contenu. On pourrait croire que la lecture n’a jamais été aussi florissante. Pourtant, parents et enseignants se plaignent partout que les jeunes ne lisent plus.",
  "Ce paradoxe n’est qu’apparent. Les jeunes lisent sans doute davantage que leurs aînés, mais ils ne lisent plus de la même façon. Sur l’écran, la lecture est fragmentée : un message chasse l’autre, une notification interrompt la phrase commencée, une vidéo promet de dire en une minute ce qu’un chapitre expliquait en vingt pages. On parcourt, on survole, on fait défiler. L’œil s’habitue à chercher l’information utile et à abandonner le reste. Cette lecture rapide a ses mérites : elle permet de s’informer vite et de trier une masse de documents. Mais elle n’est pas la lecture profonde, celle qui suit patiemment un raisonnement ou s’attache au destin d’un personnage pendant des centaines de pages.",
  "Or cette lecture lente forme l’esprit d’une manière irremplaçable. Elle exige de l’attention, de la mémoire, de l’imagination. Elle oblige à se mettre à la place d’autrui, à entendre une voix différente de la sienne, à supporter qu’une question reste un moment sans réponse. L’élève qui a lu un roman jusqu’au bout a appris à persévérer ; celui qui a suivi la démonstration d’un essai a appris à penser avec ordre. Aucun résumé, si bien fait soit-il, ne peut offrir cette expérience.",
  "Faut-il pour autant condamner les écrans ? Ce serait une erreur. Le téléphone peut porter des livres entiers jusque dans les villages les plus éloignés ; il peut faire découvrir un auteur, donner envie d’ouvrir une œuvre. Le danger n’est pas dans l’outil, mais dans l’habitude de la dispersion. C’est à l’école et à la famille d’apprendre aux jeunes à passer d’une lecture à l’autre : survoler quand il faut chercher, ralentir quand il faut comprendre. Lire, au fond, n’est pas seulement déchiffrer des mots ; c’est accepter de donner du temps à la pensée d’un autre.",
];

/** Longueur demandée pour le résumé : le quart du texte, arrondi à la dizaine. */
export const RESUME_WORDS = 100;

/** Résumé modèle (sa longueur est vérifiée par le test). */
export const RESUME_MODEL = [
  "Autrefois rares, les livres tiennent aujourd’hui dans la poche des jeunes, qui pourtant passeraient pour ne plus lire. En réalité, ils lisent beaucoup, mais autrement : sur l’écran, la lecture devient rapide et morcelée. Utile pour s’informer et trier, elle ne remplace pas la lecture profonde, qui suit une pensée ou une histoire jusqu’au bout. Celle-ci, exigeant attention, mémoire et imagination, apprend à comprendre autrui, à persévérer et à raisonner. Les écrans ne sont pas à condamner pour autant : ils diffusent les livres partout. Seule la dispersion menace ; il faut donc apprendre aux jeunes à adapter leur lecture, car lire, c’est consacrer du temps à autrui.",
];

const TEXT = reading("<strong>Lire à l’heure des écrans</strong>", ...RESUME_TEXT) + "<p><em>Texte rédigé par DIANGAL pour ce sujet blanc.</em></p>";

const POEM =
  "<p><strong>Demain, dès l’aube…</strong></p>" +
  "<p>Demain, dès l’aube, à l’heure où blanchit la campagne,<br>Je partirai. Vois-tu, je sais que tu m’attends.<br>J’irai par la forêt, j’irai par la montagne.<br>Je ne puis demeurer loin de toi plus longtemps.</p>" +
  "<p>Je marcherai les yeux fixés sur mes pensées,<br>Sans rien voir au dehors, sans entendre aucun bruit,<br>Seul, inconnu, le dos courbé, les mains croisées,<br>Triste, et le jour pour moi sera comme la nuit.</p>" +
  "<p>Je ne regarderai ni l’or du soir qui tombe,<br>Ni les voiles au loin descendant vers Harfleur,<br>Et quand j’arriverai, je mettrai sur ta tombe<br>Un bouquet de houx vert et de bruyère en fleur.</p>" +
  "<p><em>Victor Hugo, Les Contemplations, livre IV, poème XIV (1856).</em></p>";

const EXPRESSION = "Les phrases sont correctes et variées, l’orthographe et les accords sont soignés, les paragraphes sont séparés et reliés par des transitions, la copie est propre.";

export const FRANCAIS: Omit<MockExamSpec, "series">[] = [
  {
    id: "bac-blanc-1-francais-resume",
    subject: "FR",
    title: "Bac blanc DIANGAL n°1 : français, résumé et discussion",
    durationMin: 240,
    parts: [
      {
        chapter: "Le résumé de texte et la discussion",
        stem:
          head(
            "I. Résumé",
            10,
            `Résume ce texte au quart de sa longueur, soit ${RESUME_WORDS} mots environ (10 % en plus ou en moins sont tolérés). Indique à la fin le nombre de mots employés. Ensuite, compare ton travail au corrigé et note chaque palier.`,
          ) + TEXT,
        questions: [
          {
            self: "Fidélité au texte (4 points) : toutes les idées essentielles sont présentes, dans l’ordre du texte, sans ajout ni commentaire personnel.",
            pts: 4,
            why:
              "<p>Les idées à retrouver : 1. les livres, autrefois rares, sont aujourd’hui partout, mais on dit que les jeunes ne lisent plus ; 2. ils lisent en fait beaucoup, mais d’une lecture rapide et fragmentée ; 3. utile, celle-ci ne remplace pas la lecture profonde ; 4. la lecture lente forme l’esprit (attention, imagination, ouverture à autrui, persévérance, ordre de la pensée) ; 5. les écrans ne sont pas à condamner, car ils diffusent les livres ; 6. le vrai danger est la dispersion : il faut apprendre à adapter sa lecture.</p><p>Résumé modèle :</p>" +
              model(...RESUME_MODEL),
          },
          {
            self: "Reformulation (2 points) : le résumé est écrit avec tes propres mots, sans phrase recopiée, et garde le point de vue de l’auteur (pas de « l’auteur dit que »).",
            pts: 2,
            why: "Le résumé parle à la place de l’auteur, comme s’il avait écrit un texte plus court. On remplace les énumérations par un mot général (« attention, mémoire et imagination ») et on ne recopie que des mots isolés, jamais des phrases.",
          },
          {
            self: "Enchaînement (2 points) : les idées sont reliées par des mots de liaison qui montrent la logique du texte (opposition, cause, conséquence).",
            pts: 2,
            why: "Le texte avance par oppositions : le paradoxe (« pourtant »), sa solution (« en réalité »), la limite de la lecture rapide (« ne remplace pas »), la concession (« ne sont pas à condamner pour autant ») et la conclusion (« donc »). Le résumé garde ces liens.",
          },
          {
            self: `Longueur et langue (2 points) : entre ${RESUME_WORDS - 10} et ${RESUME_WORDS + 10} mots, nombre de mots indiqué, orthographe et syntaxe correctes.`,
            pts: 2,
            why: "Compte tes mots : chaque mot séparé par une espace ou une apostrophe compte (« l’école » fait deux mots). Un résumé trop long ou trop court perd ces points, même s’il est fidèle.",
          },
        ],
      },
      {
        chapter: "Le résumé de texte et la discussion",
        stem:
          head(
            "II. Discussion",
            10,
            "« Aucun résumé, si bien fait soit-il, ne peut offrir cette expérience. » Penses-tu, comme l’auteur, que rien ne remplace la lecture complète d’une œuvre ? Tu justifieras ton point de vue par des arguments précis et des exemples tirés de tes lectures et de ton expérience.",
          ) + TEXT,
        questions: [
          {
            self: "Introduction (2 points) : une amorce, la phrase du sujet rappelée, le problème posé et le plan annoncé.",
            pts: 2,
            why: "Exemple : « Avec les vidéos et les fiches de lecture, beaucoup d’élèves croient connaître une œuvre sans l’avoir lue. Pour l’auteur du texte, aucun résumé ne peut remplacer cette expérience. Une œuvre ne vaut-elle que par son contenu, ou par le chemin que fait le lecteur en la lisant ? Nous verrons ce que le résumé apporte, puis ce que seule la lecture complète permet. »",
          },
          {
            self: "Argumentation (5 points) : deux parties équilibrées ; chaque argument est expliqué et illustré par un exemple précis.",
            pts: 5,
            why: list(
              "Ce que le résumé apporte : il fait gagner du temps, aide à réviser, donne une vue d’ensemble ; il peut donner envie de lire l’œuvre entière.",
              "Ce qu’il ne remplace pas : l’émotion née du style (la lettre de Ramatoulaye dans <em>Une si longue lettre</em> de Mariama Bâ ne se résume pas), l’attachement aux personnages (Samba Diallo dans <em>L’Aventure ambiguë</em> de Cheikh Hamidou Kane), la patience et la concentration que demande une lecture longue, l’interprétation personnelle.",
              "Position nuancée possible : le résumé est un outil de travail, la lecture complète une expérience de formation.",
            ),
          },
          {
            self: "Conclusion (1 point) : un bilan clair qui répond à la question, éventuellement une ouverture.",
            pts: 1,
            why: "Exemple : « Le résumé informe, mais il ne forme pas : comme l’affirme l’auteur, rien ne remplace le temps passé avec une œuvre. Encore faut-il que l’école donne aux jeunes le goût de ces lectures longues. »",
          },
          {
            self: "Expression (2 points) : langue correcte, paragraphes distincts, transitions entre les parties.",
            pts: 2,
            why: EXPRESSION,
          },
        ],
      },
    ],
  },
  {
    id: "bac-blanc-1-francais-commentaire",
    subject: "FR",
    title: "Bac blanc DIANGAL n°1 : français, commentaire",
    durationMin: 240,
    parts: [
      {
        chapter: "Le commentaire de texte",
        stem:
          head(
            "Commentaire",
            20,
            "Fais de ce poème un commentaire composé. Tu pourras, par exemple, montrer comment le poème se présente d’abord comme le récit d’un départ vers un être aimé, puis se révèle être un pèlerinage de deuil. Ensuite, compare ton travail au corrigé et note chaque palier.",
          ) + POEM,
        questions: [
          {
            self: "Introduction (3 points) : situation du poème (auteur, recueil, circonstances), projet de lecture, annonce des deux axes.",
            pts: 3,
            why: "Victor Hugo écrit ce poème en 1847 pour l’anniversaire de la mort de sa fille Léopoldine, noyée dans la Seine à Villequier en 1843 ; il le publie dans <em>Les Contemplations</em> (1856), dans la partie consacrée au deuil. Projet de lecture : comment ce qui semble l’annonce d’un rendez-vous amoureux devient-il un hommage à une morte ? Axes : un départ résolu vers un être aimé ; un pèlerinage de deuil.",
          },
          {
            self: "Premier axe (5 points) : un départ résolu vers un être aimé (futur, tutoiement, marche décidée, rythme).",
            pts: 5,
            why: list(
              "Le futur de certitude (« je partirai », « j’irai », « je marcherai ») et l’indication précise du moment (« Demain, dès l’aube ») montrent une décision ferme.",
              "Le tutoiement et la question « Vois-tu » créent un dialogue intime : le lecteur croit à un rendez-vous amoureux (« je sais que tu m’attends »).",
              "L’anaphore « J’irai par la forêt, j’irai par la montagne » et le rythme régulier des alexandrins traduisent une marche obstinée, que rien n’arrête.",
              "« Je ne puis demeurer loin de toi plus longtemps » exprime l’urgence du manque.",
            ),
          },
          {
            self: "Deuxième axe (5 points) : un pèlerinage de deuil (isolement, refus du paysage, révélation finale, symboles).",
            pts: 5,
            why: list(
              "Le marcheur est coupé du monde : « Sans rien voir au dehors, sans entendre aucun bruit » ; l’énumération « Seul, inconnu, le dos courbé, les mains croisées » dessine la posture du deuil et de la prière.",
              "L’antithèse « le jour pour moi sera comme la nuit » montre que la douleur éteint toute lumière.",
              "Il refuse la beauté du paysage : « ni l’or du soir qui tombe, / Ni les voiles au loin » ; l’image du soir qui tombe annonce la mort.",
              "La chute « ta tombe » révèle que l’être aimé est mort ; le bouquet de « houx vert » (qui reste vert en hiver) et de « bruyère en fleur » symbolise la fidélité d’un amour qui survit à la mort.",
            ),
          },
          {
            self: "Analyse des procédés (2 points) : citations courtes, intégrées aux phrases, et analysées (temps, figures de style, rythme, symboles).",
            pts: 2,
            why: "Chaque idée s’appuie sur une citation courte, entre guillemets, suivie de son analyse : on nomme le procédé (anaphore, antithèse, énumération, chute, symbole) et on dit l’effet qu’il produit. Une citation sans analyse ne rapporte rien.",
          },
          {
            self: "Conclusion (2 points) : bilan qui répond au projet de lecture, puis une ouverture.",
            pts: 2,
            why: "Bilan : grâce à la chute, le poème transforme un apparent rendez-vous en hommage funèbre ; la simplicité de la langue rend la douleur plus forte. Ouverture : d’autres poèmes des <em>Contemplations</em> consacrés à Léopoldine, comme « À Villequier », ou d’autres poèmes du deuil que tu as étudiés.",
          },
          {
            self: "Expression et présentation (3 points) : langue correcte, paragraphes et transitions, copie soignée.",
            pts: 3,
            why: EXPRESSION,
          },
        ],
      },
    ],
  },
  {
    id: "bac-blanc-1-francais-dissertation",
    subject: "FR",
    title: "Bac blanc DIANGAL n°1 : français, dissertation",
    durationMin: 240,
    parts: [
      {
        chapter: "La dissertation littéraire",
        stem:
          head(
            "Dissertation",
            20,
            "Un lecteur affirme : « On ouvre un roman pour oublier ses soucis, non pour réfléchir. » Tu discuteras ce jugement en t’appuyant sur des romans que tu as lus ou étudiés, africains notamment. Ensuite, compare ton travail au corrigé et note chaque palier.",
          ),
        questions: [
          {
            self: "Introduction (3 points) : une amorce, le sujet cité, la problématique et l’annonce du plan.",
            pts: 3,
            why: "Exemple : « Beaucoup de lecteurs prennent un roman comme on prend des vacances. Selon un lecteur, on l’ouvre pour oublier ses soucis, non pour réfléchir. Le roman n’est-il qu’un divertissement, ou peut-il aussi faire penser ? Nous verrons qu’il distrait, puis qu’il instruit et fait réfléchir, avant de montrer que le plaisir est justement le chemin de la réflexion. »",
          },
          {
            self: "Première partie (5 points) : le roman distrait et fait oublier le quotidien (intrigue, aventure, évasion), avec des exemples précis.",
            pts: 5,
            why: list(
              "L’intrigue et le suspense tiennent le lecteur : on veut connaître la suite (les romans d’aventure, comme <em>Les Trois Mousquetaires</em> d’Alexandre Dumas).",
              "Le roman fait voyager dans d’autres lieux et d’autres époques ; il permet de vivre d’autres vies par les personnages.",
              "Cette évasion repose et fait oublier un moment les soucis.",
            ),
          },
          {
            self: "Deuxième partie (5 points) : le roman fait aussi réfléchir (dénonciation, questions de société, connaissance de l’homme), avec des exemples précis.",
            pts: 5,
            why: list(
              "Il dénonce l’injustice : <em>Les Bouts de bois de Dieu</em> d’Ousmane Sembène (1960) raconte la grève des cheminots du Dakar-Niger de 1947-1948 ; <em>Germinal</em> d’Émile Zola montre la misère des mineurs.",
              "Il pose les questions d’une société : la polygamie et la condition de la femme dans <em>Une si longue lettre</em> de Mariama Bâ (1979) ; le choc des cultures dans <em>L’Aventure ambiguë</em> de Cheikh Hamidou Kane (1961) ; la colonisation dans <em>Le monde s’effondre</em> de Chinua Achebe (1958).",
              "Dépassement : le plaisir de lire et la réflexion vont ensemble ; c’est parce que l’histoire nous captive que ses questions nous touchent (« plaire et instruire »).",
            ),
          },
          {
            self: "Exemples (2 points) : au moins trois références précises (auteur, titre, personnage ou épisode), bien choisies et expliquées.",
            pts: 2,
            why: "Un exemple utile donne l’auteur, le titre et un épisode, puis dit en une phrase ce qu’il prouve. Citer un titre sans l’expliquer ne suffit pas.",
          },
          {
            self: "Conclusion (2 points) : bilan qui répond à la problématique, puis une ouverture.",
            pts: 2,
            why: "Exemple : « Le roman distrait, mais il ne s’y réduit pas : en nous captivant, il nous fait réfléchir sur nous-mêmes et sur notre société. On pourrait se demander si le cinéma, aujourd’hui, joue le même rôle. »",
          },
          {
            self: "Expression et présentation (3 points) : langue correcte, paragraphes et transitions, copie soignée.",
            pts: 3,
            why: EXPRESSION,
          },
        ],
      },
    ],
  },
];
