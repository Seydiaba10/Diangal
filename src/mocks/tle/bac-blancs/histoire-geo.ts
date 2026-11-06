import "server-only";

// Bac blanc DIANGAL n°1, histoire et géographie (séries L et S) : forme de l'épreuve de l'Office du Bac
// (4 heures ; A. histoire sur 10 points, B. géographie sur 10 points, un sujet au choix dans chaque partie).
// En géographie, le commentaire de document est remplacé par une seconde dissertation : DIANGAL n'invente pas de
// statistiques. Le document d'histoire est un texte officiel de 1944 (recommandations de la conférence de Brazzaville).

import type { MockExamSpec } from "../../exercise-series";
import { head } from "../../cm2/cfee/helpers";

const list = (...items: string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
const both = (first: string, second: string) => list(`<strong>Sujet 1</strong> : ${first}`, `<strong>Sujet 2</strong> : ${second}`);
const NOTE = "Traite l’un des deux sujets. Ensuite, compare ton travail au corrigé du sujet choisi et note chaque palier.";

export const HISTOIRE_GEO: Omit<MockExamSpec, "series">[] = [
  {
    id: "bac-blanc-1-histoire-geo",
    subject: "HG",
    title: "Bac blanc DIANGAL n°1 : histoire et géographie",
    durationMin: 240,
    parts: [
      {
        chapter: "La décolonisation en Afrique",
        stem:
          head("A. Histoire", 10, NOTE) +
          "<p><strong>Sujet 1 (dissertation)</strong> : la décolonisation de l’Afrique noire française, de la conférence de Brazzaville (1944) aux indépendances (1960).</p>" +
          "<p><strong>Sujet 2 (commentaire de document)</strong> : présente le document, explique-le, puis montre comment l’évolution de l’Afrique noire française entre 1944 et 1960 l’a contredit.</p>" +
          "<blockquote><p>« Les fins de l’œuvre de civilisation accomplie par la France dans les colonies écartent toute idée d’autonomie, toute possibilité d’évolution hors du bloc français de l’Empire ; la constitution éventuelle, même lointaine, de self-governments dans les colonies est à écarter. »</p></blockquote>" +
          "<p><em>Recommandations de la conférence africaine française de Brazzaville, janvier-février 1944.</em></p>",
        questions: [
          {
            self: "Introduction (2 points) : le contexte est posé, la problématique formulée et le plan annoncé ; pour le commentaire, le document est présenté (nature, date, auteur, contexte).",
            pts: 2,
            why: both(
              "contexte : en 1944, la France libre, aidée par l’Empire, prépare l’après-guerre. Problématique : comment l’Afrique noire française est-elle passée d’un refus de toute autonomie à l’indépendance en seize ans ? Plan : des réformes sans émancipation (1944-1956) ; de la loi-cadre aux indépendances (1956-1960).",
              "texte officiel, recommandation adoptée à la conférence de Brazzaville (janvier-février 1944), réunie par le Comité français de libération nationale autour du général de Gaulle, avec des gouverneurs et des administrateurs coloniaux, sans élus africains. Problématique : pourquoi la France refuse-t-elle l’autonomie en 1944, et comment les faits ont-ils démenti ce refus ?",
            ),
          },
          {
            self: "Première partie (3 points) : connaissances exactes (dates, lieux, acteurs) sur la première étape, organisées autour d’une idée.",
            pts: 3,
            why: both(
              "1944-1956, des réformes sans émancipation : promesses de Brazzaville (fin du travail forcé, abolition de l’indigénat, représentation à Paris) ; Constitution de 1946 et Union française ; loi Lamine Guèye (1946) qui fait des Africains des citoyens ; élus africains à l’Assemblée nationale (Lamine Guèye, Léopold Sédar Senghor, Félix Houphouët-Boigny) ; naissance du RDA à Bamako en 1946 ; grève des cheminots du Dakar-Niger (1947-1948).",
              "explication : la France veut garder son Empire, qui l’a aidée pendant la guerre ; elle accepte des réformes (fin du travail forcé et de l’indigénat) mais refuse l’autonomie et le « self-government », c’est-à-dire le gouvernement des colonies par elles-mêmes, et toute sortie du « bloc français ».",
            ),
          },
          {
            self: "Deuxième partie (3 points) : connaissances exactes sur la seconde étape, et lien avec le sujet ou le document.",
            pts: 3,
            why: both(
              "1956-1960, vers les indépendances : contexte international (Bandung en 1955, guerre d’Algérie, indépendance du Ghana en 1957) ; loi-cadre Defferre (1956) qui crée des gouvernements locaux élus ; référendum de 1958 sur la Communauté : la Guinée de Sékou Touré vote « non » et devient indépendante ; Fédération du Mali (Sénégal et Soudan) puis indépendances de 1960 : accords du 4 avril 1960, puis éclatement de la Fédération le 20 août ; Senghor devient président du Sénégal en septembre 1960.",
              "le document contredit par les faits : loi-cadre de 1956 (autonomie interne), Communauté de 1958, indépendance de la Guinée (1958), indépendances de 1960 (accords du 4 avril 1960 pour le Sénégal). La pression des élus et des peuples africains et le contexte mondial ont obligé la France à accepter ce qu’elle écartait en 1944.",
            ),
          },
          {
            self: "Conclusion d’histoire (1 point) : un bilan qui répond à la problématique, éventuellement une ouverture.",
            pts: 1,
            why: "Bilan : en seize ans, la France est passée du refus de toute autonomie aux indépendances, par étapes et en grande partie sans guerre en Afrique noire. Ouverture : les liens maintenus après 1960 (coopération, franc CFA) posent la question d’une indépendance réelle.",
          },
          {
            self: "Expression en histoire (1 point) : langue correcte, paragraphes et transitions, copie soignée.",
            pts: 1,
            why: "Phrases correctes, dates et noms propres bien écrits, une idée par paragraphe, transitions entre les parties.",
          },
        ],
      },
      {
        chapter: "L’Afrique et le Sénégal",
        stem:
          head("B. Géographie", 10, NOTE) +
          "<p><strong>Sujet 1 (dissertation)</strong> : l’agriculture au Sénégal : atouts et contraintes.</p>" +
          "<p><strong>Sujet 2 (dissertation)</strong> : l’intégration régionale en Afrique de l’Ouest : réalisations et limites.</p>",
        questions: [
          {
            self: "Introduction (2 points) : les termes sont définis, la problématique formulée et le plan annoncé.",
            pts: 2,
            why: both(
              "l’agriculture fait vivre une grande partie de la population sénégalaise, mais le pays importe encore une part de sa nourriture, notamment du riz. Problématique : pourquoi l’agriculture sénégalaise ne nourrit-elle pas encore tout le pays malgré ses atouts ? Plan : des atouts réels ; de lourdes contraintes ; les politiques mises en œuvre.",
              "l’intégration régionale est le rapprochement de plusieurs États pour former un ensemble économique et politique. Problématique : la CEDEAO et l’UEMOA ont-elles réussi à unir l’Afrique de l’Ouest ? Plan : des réalisations ; des limites.",
            ),
          },
          {
            self: "Première partie (3 points) : connaissances exactes et localisées, organisées autour d’une idée.",
            pts: 3,
            why: both(
              "des atouts : des terres cultivables, les vallées du fleuve Sénégal et de l’Anambé pour le riz irrigué, la zone des Niayes pour le maraîchage, le bassin arachidier, une main-d’œuvre nombreuse ; des cultures variées (arachide, mil, maïs, riz, coton, fruits et légumes).",
              "des réalisations : CEDEAO créée en 1975 (traité de Lagos), UEMOA en 1994 ; libre circulation des personnes (passeport et carte d’identité de la CEDEAO), tarif extérieur commun, monnaie commune de l’UEMOA (le franc CFA), interventions pour la paix ; de grands projets communs (OMVS sur le fleuve Sénégal).",
            ),
          },
          {
            self: "Deuxième partie (3 points) : les contraintes ou les limites, avec des exemples précis, et les solutions proposées.",
            pts: 3,
            why: both(
              "des contraintes : pluies irrégulières et courtes, sécheresses, salinisation des terres (Casamance, Sine-Saloum), appauvrissement des sols, faible mécanisation, difficultés de stockage et de vente, dépendance aux importations de riz. Réponses : maîtrise de l’eau (barrages de Diama et de Manantali), programmes agricoles de l’État, encadrement par la SAED dans la vallée du fleuve.",
              "des limites : barrières aux frontières, faibles échanges entre les pays, infrastructures insuffisantes, instabilité politique et coups d’État ; retrait du Mali, du Burkina Faso et du Niger de la CEDEAO, effectif en 2025, et création de l’Alliance des États du Sahel.",
            ),
          },
          {
            self: "Conclusion de géographie (1 point) : un bilan qui répond à la problématique, éventuellement une ouverture.",
            pts: 1,
            why: both(
              "l’agriculture sénégalaise a des atouts, mais elle reste fragile ; la maîtrise de l’eau et la modernisation sont les clés de la souveraineté alimentaire.",
              "l’intégration ouest-africaine a progressé, surtout pour la circulation des personnes, mais elle reste inachevée ; son avenir dépend de la paix et de la volonté des États.",
            ),
          },
          {
            self: "Expression en géographie (1 point) : langue correcte, paragraphes et transitions, copie soignée.",
            pts: 1,
            why: "Phrases correctes, noms de lieux bien écrits et localisés, une idée par paragraphe, transitions entre les parties. Un croquis simple, s’il est juste, est un plus.",
          },
        ],
      },
    ],
  },
];
