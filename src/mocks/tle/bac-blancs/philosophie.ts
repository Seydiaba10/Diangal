import "server-only";

// Bac blanc DIANGAL n°1, philosophie : forme de l'épreuve de l'Office du Bac (4 heures, un sujet au choix parmi
// trois : deux dissertations et un texte à expliquer). Un sujet pour les séries S, un autre pour les séries L.
// Sujets rédigés par DIANGAL ; textes de Descartes (Discours de la méthode, 1637), du domaine public.
// La grille d'auto-évaluation est la même pour les trois sujets : le corrigé de chaque palier les traite tous.

import type { MockExamSpec } from "../../exercise-series";
import { head } from "../../cm2/cfee/helpers";

const list = (...items: string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

interface Sujets {
  /** Énoncés des trois sujets (le troisième est un texte). */
  dissertation1: string;
  dissertation2: string;
  text: string;
  source: string;
  /** Corrigé de chaque palier : un élément par sujet, dans l'ordre. */
  comprehension: [string, string, string];
  problem: [string, string, string];
  first: [string, string, string];
  second: [string, string, string];
  references: [string, string, string];
  conclusion: [string, string, string];
}

const bySujet = (items: [string, string, string]) =>
  list(`<strong>Sujet 1</strong> : ${items[0]}`, `<strong>Sujet 2</strong> : ${items[1]}`, `<strong>Sujet 3</strong> : ${items[2]}`);

function philosophy(id: string, s: Sujets): Omit<MockExamSpec, "series"> {
  const stem =
    head("Traite l’un des trois sujets suivants", 20, "Ensuite, compare ton travail au corrigé du sujet choisi et note chaque palier : « réussi » seulement si tout ce qu’il demande y est.") +
    `<p><strong>Sujet 1</strong> : ${s.dissertation1}</p>` +
    `<p><strong>Sujet 2</strong> : ${s.dissertation2}</p>` +
    `<p><strong>Sujet 3</strong> : dégage l’intérêt philosophique de ce texte à partir de son étude ordonnée.</p>` +
    `<blockquote><p>${s.text}</p></blockquote><p><em>${s.source}</em></p>`;
  return {
    id,
    subject: "PHILO",
    title: "Bac blanc DIANGAL n°1 : philosophie",
    durationMin: 240,
    parts: [
      {
        chapter: "Méthodologie de la dissertation et du commentaire",
        stem,
        questions: [
          {
            self: "Compréhension du sujet (2 points) : les notions sont définies et le sujet n’est pas déformé ; pour le texte, le thème et la thèse sont dégagés.",
            pts: 2,
            why: bySujet(s.comprehension),
          },
          {
            self: "Problématique et plan (2 points) : le problème est formulé clairement, sous forme de question, et le plan est annoncé.",
            pts: 2,
            why: bySujet(s.problem),
          },
          {
            self: "Première partie (3 points) : une idée directrice claire, expliquée pas à pas ; pour le texte, l’étude suit les moments de l’argumentation.",
            pts: 3,
            why: bySujet(s.first),
          },
          {
            self: "Deuxième partie (3 points) : une discussion réelle (objection, autre point de vue, limites), pas une simple répétition ; pour le texte, son intérêt et ses limites.",
            pts: 3,
            why: bySujet(s.second),
          },
          {
            self: "Arguments et exemples (2 points) : chaque idée est justifiée par un raisonnement et illustrée par un exemple précis, pris dans la vie, l’histoire ou les sciences.",
            pts: 2,
            why: "Un bon exemple est précis (un fait, une situation, une invention), expliqué en une ou deux phrases, et il sert l’idée : il ne la remplace pas. Les exemples tirés du Sénégal et de l’Afrique sont bienvenus.",
          },
          {
            self: "Références philosophiques (2 points) : au moins deux auteurs cités avec exactitude, dont la pensée est expliquée et utilisée.",
            pts: 2,
            why: bySujet(s.references),
          },
          {
            self: "Conclusion (2 points) : une réponse nette au problème posé, qui reprend le chemin parcouru.",
            pts: 2,
            why: bySujet(s.conclusion),
          },
          {
            self: "Progression (2 points) : des transitions qui relient les parties ; la réflexion avance au lieu de juxtaposer des idées.",
            pts: 2,
            why: "Chaque partie s’achève par une phrase de bilan et une transition qui annonce la suivante (« Cependant, si…, ne faut-il pas reconnaître que… ? »). Le lecteur doit sentir que la pensée progresse.",
          },
          {
            self: "Expression (2 points) : langue correcte, vocabulaire philosophique précis, copie lisible.",
            pts: 2,
            why: "Les phrases sont complètes et correctes, les notions sont employées avec leur sens exact (liberté, nature, raison, État…), l’écriture est lisible et la copie propre.",
          },
        ],
      },
    ],
  };
}

export const PHILOSOPHIE_S = philosophy("bac-blanc-1-philosophie-s", {
  dissertation1: "La technique libère-t-elle l’homme ?",
  dissertation2: "Peut-on être libre sans les autres ?",
  text: "[Ces notions générales touchant la physique] m’ont fait voir qu’il est possible de parvenir à des connaissances qui soient fort utiles à la vie, et qu’au lieu de cette philosophie spéculative qu’on enseigne dans les écoles, on en peut trouver une pratique, par laquelle, connaissant la force et les actions du feu, de l’eau, de l’air, des astres, des cieux et de tous les autres corps qui nous environnent, aussi distinctement que nous connaissons les divers métiers de nos artisans, nous les pourrions employer en même façon à tous les usages auxquels ils sont propres, et ainsi nous rendre comme maîtres et possesseurs de la nature. Ce qui n’est pas seulement à désirer pour l’invention d’une infinité d’artifices, qui feraient qu’on jouirait, sans aucune peine, des fruits de la terre et de toutes les commodités qui s’y trouvent, mais principalement aussi pour la conservation de la santé, laquelle est sans doute le premier bien et le fondement de tous les autres biens de cette vie.",
  source: "René Descartes, Discours de la méthode (1637), sixième partie.",
  comprehension: [
    "la technique est l’ensemble des outils et des procédés par lesquels l’homme transforme la nature pour satisfaire ses besoins ; « libérer », c’est affranchir d’une contrainte (le besoin, l’effort pénible, la maladie, la distance). Il ne faut pas réduire la technique au téléphone portable.",
    "être libre, c’est agir selon sa propre volonté, sans contrainte ; « sans les autres » signifie seul, hors de toute société. Le sujet demande si autrui est un obstacle ou une condition de la liberté.",
    "thème : la finalité de la science. Thèse : au lieu d’une philosophie spéculative, il faut une connaissance pratique de la nature, qui nous rende « comme maîtres et possesseurs de la nature », pour les commodités de la vie et surtout pour la santé.",
  ],
  problem: [
    "la technique, qui affranchit l’homme des contraintes naturelles, ne crée-t-elle pas de nouvelles dépendances ? Plan : la technique libère ; mais elle peut asservir ; tout dépend de la maîtrise que l’homme garde sur elle.",
    "autrui limite-t-il ma liberté, ou est-il la condition qui la rend possible ? Plan : les autres semblent un obstacle ; pourtant, on ne devient libre qu’avec eux et par des lois communes.",
    "la connaissance doit-elle viser l’utilité ? La maîtrise de la nature est-elle un bien sans limite ? Plan : étude des trois moments du texte, puis son intérêt et ses limites.",
  ],
  first: [
    "la technique libère : elle soulage du travail pénible (la motopompe ou le tracteur dans les Niayes), soigne (vaccins, chirurgie), rapproche les hommes (transports, communication). Elle réalise le projet de Descartes : se rendre « comme maîtres et possesseurs de la nature ».",
    "les autres semblent un obstacle : les lois interdisent, la société impose ses coutumes, le regard d’autrui me juge (Sartre, <em>Huis clos</em> : « l’enfer, c’est les autres »).",
    "1er moment (jusqu’à « pratique ») : opposition entre la philosophie spéculative des écoles et une philosophie pratique. 2e moment (jusqu’à « nature ») : connaître les forces de la nature comme on connaît les métiers des artisans, pour les employer à nos usages ; le mot « comme » marque une mesure : l’homme n’est pas Dieu. 3e moment : les deux buts, les commodités de la vie et surtout la santé, « premier bien ».",
  ],
  second: [
    "mais la technique peut asservir : dépendance aux machines, chômage, pollution, armes de destruction ; elle impose sa logique (Heidegger). Dépassement : la technique n’est qu’un moyen ; elle libère si la raison et la morale en fixent les fins (Hans Jonas, <em>Le Principe responsabilité</em>).",
    "pourtant, sans les autres, pas de liberté : l’éducation et le langage me forment ; la loi que nous nous donnons protège ma liberté (Rousseau : « l’obéissance à la loi qu’on s’est prescrite est liberté ») ; la sagesse africaine le dit aussi : « je suis parce que nous sommes » (John Mbiti).",
    "intérêt : ce texte fonde la science moderne au service de l’homme ; les progrès de la médecine et de l’agriculture lui donnent raison. Limites : la maîtrise de la nature a conduit à la crise écologique (Hans Jonas) ; la science peut aussi chercher la vérité pour elle-même (Aristote : la philosophie naît de l’étonnement).",
  ],
  references: [
    "Descartes (maîtres et possesseurs de la nature), Bergson (l’homme, <em>homo faber</em>), Rousseau (le progrès des arts n’a pas rendu l’homme meilleur), Heidegger, Hans Jonas.",
    "Rousseau (<em>Du contrat social</em>), Sartre, Hegel (la reconnaissance), Kant (l’autonomie), John Mbiti.",
    "Francis Bacon (« on ne commande à la nature qu’en lui obéissant »), Aristote, Heidegger, Hans Jonas.",
  ],
  conclusion: [
    "la technique libère l’homme de nombreuses contraintes, mais elle ne le rend vraiment libre que s’il garde la maîtrise de ses fins.",
    "la liberté ne se conquiert pas contre les autres : elle se construit avec eux, dans des lois communes.",
    "Descartes donne à la science une fin humaine, la maîtrise de la nature pour le bien de tous ; à nous d’ajouter la responsabilité envers la nature elle-même.",
  ],
});

export const PHILOSOPHIE_L = philosophy("bac-blanc-1-philosophie-l", {
  dissertation1: "L’État est-il l’ennemi de la liberté ?",
  dissertation2: "L’art doit-il imiter la nature ?",
  text: "Le bon sens est la chose du monde la mieux partagée : car chacun pense en être si bien pourvu, que ceux même qui sont les plus difficiles à contenter en toute autre chose n’ont point coutume d’en désirer plus qu’ils en ont. En quoi il n’est pas vraisemblable que tous se trompent ; mais plutôt cela témoigne que la puissance de bien juger et distinguer le vrai d’avec le faux, qui est proprement ce qu’on nomme le bon sens ou la raison, est naturellement égale en tous les hommes ; et ainsi que la diversité de nos opinions ne vient pas de ce que les uns sont plus raisonnables que les autres, mais seulement de ce que nous conduisons nos pensées par diverses voies, et ne considérons pas les mêmes choses. Car ce n’est pas assez d’avoir l’esprit bon, mais le principal est de l’appliquer bien.",
  source: "René Descartes, Discours de la méthode (1637), première partie.",
  comprehension: [
    "l’État est l’autorité politique souveraine qui exerce le pouvoir sur un territoire et une population, par des institutions et des lois ; « ennemi » désigne ce qui s’oppose et menace. Il s’agit de la liberté des individus et des peuples.",
    "l’art est l’activité humaine qui crée des œuvres pour le beau ou l’expression ; « imiter », c’est reproduire fidèlement ; « doit » pose une norme : la valeur de l’œuvre dépend-elle de sa ressemblance ?",
    "thème : la raison. Thèse : la capacité de bien juger est naturellement égale chez tous les hommes ; la diversité des opinions vient de la manière de conduire ses pensées ; il faut donc bien appliquer son esprit, d’où la nécessité d’une méthode.",
  ],
  problem: [
    "l’État, qui contraint par les lois et la force, détruit-il la liberté ou la rend-il possible ? Plan : l’État peut opprimer ; sans lui, la liberté naturelle est fragile ; l’État de droit, limité et contrôlé, garantit la liberté.",
    "l’œuvre d’art vaut-elle par sa ressemblance avec la nature, ou par ce qu’elle crée et exprime ? Plan : la tradition de l’imitation ; l’art comme création ; l’art transfigure la nature.",
    "si la raison est égale en tous, d’où viennent nos erreurs et nos désaccords ? Plan : étude des trois moments du texte, puis son intérêt et ses limites.",
  ],
  first: [
    "l’État peut être l’ennemi de la liberté : il détient le monopole de la violence physique légitime (Max Weber) ; les dictatures écrasent les libertés ; Nietzsche le dit « le plus froid des monstres froids ».",
    "l’art a longtemps été pensé comme imitation (mimèsis) : pour Platon, le peintre copie l’apparence des choses, il est éloigné de la vérité (<em>République</em>, livre X) ; pour Aristote, l’imitation est naturelle à l’homme et source de plaisir et de connaissance.",
    "1er moment (jusqu’à « qu’ils en ont ») : un constat ironique, chacun se croit assez pourvu de bon sens. 2e moment (jusqu’à « les mêmes choses ») : Descartes en tire que la raison est égale en tous ; la diversité des opinions vient des voies suivies et des objets considérés. 3e moment (dernière phrase) : avoir l’esprit bon ne suffit pas ; il faut l’appliquer bien, d’où la méthode.",
  ],
  second: [
    "pourtant, sans État, la liberté naturelle est précaire : pour Hobbes, l’état de nature est une guerre de tous contre tous ; pour Locke, l’État protège les droits ; pour Rousseau, la liberté civile remplace la liberté naturelle. Pour éviter les abus, Montesquieu demande que « le pouvoir arrête le pouvoir » : c’est l’État de droit.",
    "mais l’art crée : pour Hegel, le beau artistique, né de l’esprit, est supérieur au beau naturel ; pour Paul Klee, « l’art ne reproduit pas le visible ; il rend visible ». Les masques africains ne copient pas un visage : ils expriment des forces et des symboles, et ils ont inspiré Picasso et le cubisme.",
    "intérêt : ce texte affirme l’égalité de tous les hommes devant la raison ; il fonde l’éducation et la démocratie et répond aux préjugés qui refusaient la raison à certains peuples (Cheikh Anta Diop l’a montré pour l’Afrique). Limites : les passions, l’inconscient (Freud) et l’inégalité d’éducation empêchent souvent de bien appliquer son esprit ; « le cœur a ses raisons que la raison ne connaît point » (Pascal).",
  ],
  references: [
    "Hobbes (<em>Léviathan</em>), Locke, Rousseau (<em>Du contrat social</em>), Montesquieu (<em>De l’esprit des lois</em>), Max Weber, Nietzsche.",
    "Platon, Aristote (<em>Poétique</em>), Kant, Hegel, Paul Klee ; l’art africain et son influence.",
    "Platon (l’allégorie de la caverne), Kant (« Ose te servir de ton propre entendement »), Pascal, Freud, Cheikh Anta Diop.",
  ],
  conclusion: [
    "l’État peut menacer la liberté, mais l’État de droit, limité par la constitution et contrôlé par les citoyens, en est la condition.",
    "l’art s’inspire de la nature, mais sa valeur tient à ce qu’il crée : il transfigure le réel plus qu’il ne le copie.",
    "la raison est un bien commun à tous les hommes ; la vraie différence est dans l’usage, et c’est pourquoi il faut une méthode et une éducation.",
  ],
});
