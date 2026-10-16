// Éducation civique de 3e. Chapitres indicatifs (statut de la matière au BFEM à vérifier :
// docs/programme/releve-ci-3e.md). Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type Chapter3eSpec, liste, retenir, tableau } from "./blocks";

export const EC_3E: Chapter3eSpec[] = [
  {
    title: "Les droits de l’enfant",
    summary: "La Convention relative aux droits de l’enfant.",
    lessons: [
      {
        title: "La Convention relative aux droits de l’enfant",
        body: `<p>La <strong>Convention relative aux droits de l’enfant</strong> (CDE) a été adoptée par l’ONU le 20 novembre 1989. Le Sénégal l’a ratifiée en 1990. Est un enfant toute personne de moins de 18 ans.</p>
          ${tableau([
            ["Famille de droits", "Exemples"],
            ["Survie", "droit à la vie, à la santé, à une alimentation suffisante"],
            ["Développement", "droit à l’éducation, aux loisirs, à un nom et une nationalité"],
            ["Protection", "contre la violence, l’exploitation, les mariages précoces"],
            ["Participation", "droit d’exprimer son opinion sur ce qui le concerne"],
          ])}
          ${retenir("En Afrique, la Charte africaine des droits et du bien-être de l’enfant complète la Convention.")}`,
      },
      {
        title: "Protéger les enfants au Sénégal",
        body: `${liste([
            "Les pires formes de travail des enfants et la mendicité forcée sont interdites.",
            "L’excision est interdite par la loi depuis 1999.",
            "L’école est obligatoire de 6 à 16 ans.",
            "En cas de danger, on peut alerter les services de protection de l’enfance, la police ou un adulte de confiance.",
          ])}
          ${retenir("Les droits vont avec des devoirs : respecter les autres, étudier, participer à la vie de la famille.")}`,
      },
    ],
  },
  {
    title: "La Constitution du Sénégal",
    summary: "Le texte fondamental de la République.",
    lessons: [
      {
        title: "Qu’est-ce qu’une Constitution ?",
        body: `<p>La <strong>Constitution</strong> est la loi fondamentale de l’État : elle organise les pouvoirs et garantit les droits et libertés. Toutes les autres lois doivent la respecter.</p>
          ${liste([
            "La Constitution actuelle du Sénégal a été adoptée par référendum le 7 janvier 2001.",
            "Elle a été révisée plusieurs fois, notamment par le référendum de 2016.",
          ])}
          ${retenir("Le Sénégal est une République laïque, démocratique et sociale.")}`,
      },
      {
        title: "Les symboles de la République",
        body: `${liste([
            "La <strong>devise</strong> : « Un Peuple – Un But – Une Foi ».",
            "Le <strong>drapeau</strong> : trois bandes verticales vert, or et rouge, avec une étoile verte au centre.",
            "L’<strong>hymne national</strong> : « Pincez tous vos koras, frappez les balafons », écrit par Léopold Sédar Senghor.",
          ])}
          ${retenir("Respecter les symboles de la République est un devoir du citoyen.")}`,
      },
    ],
  },
  {
    title: "Les institutions de la République",
    summary: "Pouvoirs exécutif, législatif et judiciaire.",
    lessons: [
      {
        title: "La séparation des pouvoirs",
        body: `${tableau([
            ["Pouvoir", "Rôle", "Institution"],
            ["Exécutif", "applique les lois, dirige l’État", "le président de la République et le Gouvernement"],
            ["Législatif", "vote les lois et le budget, contrôle le Gouvernement", "l’Assemblée nationale"],
            ["Judiciaire", "rend la justice", "les cours et tribunaux"],
          ])}
          ${retenir("Séparer les pouvoirs évite qu’une seule personne les détienne tous : c’est une garantie de liberté.")}`,
      },
      {
        title: "Le fonctionnement des institutions",
        body: `${liste([
            "Le <strong>président de la République</strong> est élu au suffrage universel direct pour 5 ans, renouvelable une fois.",
            "Il nomme le <strong>Premier ministre</strong>, qui dirige le Gouvernement.",
            "Les <strong>députés</strong> de l’Assemblée nationale sont élus pour 5 ans.",
            "Le <strong>Conseil constitutionnel</strong> vérifie que les lois respectent la Constitution et proclame les résultats de l’élection présidentielle.",
          ])}`,
      },
    ],
  },
  {
    title: "La citoyenneté",
    summary: "Droits et devoirs du citoyen.",
    lessons: [
      {
        title: "Être citoyen",
        body: `<p>Le <strong>citoyen</strong> est membre d’un État : il a la nationalité de ce pays, des droits et des devoirs.</p>
          ${tableau([
            ["Droits", "Devoirs"],
            ["voter et être élu", "respecter les lois"],
            ["s’exprimer librement", "payer ses impôts"],
            ["aller à l’école, se soigner", "défendre la patrie"],
            ["circuler librement", "protéger les biens publics"],
          ])}`,
      },
      {
        title: "Le civisme au quotidien",
        body: `${liste([
            "Respecter le Code de la route et les autres usagers.",
            "Garder propres la rue, l’école et les marchés (les journées de « set setal »).",
            "Ne pas abîmer le matériel public : tables-bancs, lampadaires, bus.",
            "Refuser la corruption et la fraude, même aux examens.",
          ])}
          ${retenir("Le civisme, c’est penser à l’intérêt général et pas seulement à soi.")}`,
      },
    ],
  },
  {
    title: "La démocratie et les élections",
    summary: "Le vote et la vie démocratique.",
    lessons: [
      {
        title: "Les principes de la démocratie",
        body: `<p>La <strong>démocratie</strong> est le pouvoir du peuple, par le peuple et pour le peuple. Le peuple choisit ses dirigeants par des élections libres.</p>
          ${liste(["Pluralisme : plusieurs partis politiques.", "Libertés d’expression, de presse et de réunion.", "Alternance : les dirigeants peuvent changer par le vote."])}
          ${retenir("Le Sénégal a connu des alternances pacifiques en 2000, en 2012 et en 2024.")}`,
      },
      {
        title: "Comment vote-t-on ?",
        body: `${liste([
            "Il faut avoir 18 ans, être inscrit sur les listes électorales et avoir sa carte d’électeur.",
            "Le vote est <strong>secret</strong> : on passe par l’isoloir avant de déposer son bulletin dans l’urne.",
            "Le suffrage est <strong>universel</strong> et <strong>égal</strong> : une personne, une voix.",
            "La CENA (Commission électorale nationale autonome) contrôle le bon déroulement des élections.",
          ])}`,
      },
    ],
  },
  {
    title: "La paix et la sécurité",
    summary: "Prévenir les conflits.",
    lessons: [
      {
        title: "Prévenir et régler les conflits",
        body: `${liste([
            "Le <strong>dialogue</strong> et la <strong>médiation</strong> permettent de régler un conflit sans violence.",
            "Le <strong>cousinage à plaisanterie</strong> (kal) aide les Sénégalais à désamorcer les tensions entre groupes.",
            "La justice règle les différends selon la loi.",
          ])}
          ${retenir("La tolérance et le respect des différences (religion, ethnie, opinion) sont la base de la paix.")}`,
      },
      {
        title: "La sécurité, l’affaire de tous",
        body: `${liste([
            "Les forces de défense et de sécurité (armée, gendarmerie, police) protègent la population et le territoire.",
            "Le Sénégal envoie des soldats dans les missions de paix de l’ONU (casques bleus).",
            "Chacun peut agir : signaler un danger, respecter les consignes, refuser la violence.",
          ])}`,
      },
    ],
  },
  {
    title: "Le développement durable",
    summary: "Protéger l’environnement.",
    lessons: [
      {
        title: "Les trois piliers",
        body: `<p>Le <strong>développement durable</strong> répond aux besoins du présent sans compromettre ceux des générations futures. Il concilie trois dimensions :</p>
          ${liste(["<strong>économique</strong> : produire des richesses ;", "<strong>sociale</strong> : réduire la pauvreté et les inégalités ;", "<strong>environnementale</strong> : préserver la nature."])}
          ${retenir("En 2015, l’ONU a adopté 17 objectifs de développement durable (ODD) à atteindre d’ici 2030.")}`,
      },
      {
        title: "Agir pour l’environnement",
        body: `${liste([
            "Planter des arbres et lutter contre les feux de brousse.",
            "Économiser l’eau et l’électricité.",
            "Réduire les déchets plastiques : le Sénégal a interdit plusieurs plastiques à usage unique par une loi de 2020.",
            "Trier et réutiliser les déchets.",
          ])}`,
      },
    ],
  },
  {
    title: "La santé publique",
    summary: "Hygiène et prévention.",
    lessons: [
      {
        title: "Hygiène et prévention",
        body: `${liste([
            "Se laver les mains au savon avant de manger et après les toilettes.",
            "Boire de l’eau potable et bien conserver les aliments.",
            "Dormir sous une moustiquaire imprégnée contre le paludisme.",
            "Se faire vacciner selon le calendrier.",
          ])}
          ${retenir("Prévenir coûte moins cher que guérir.")}`,
      },
      {
        title: "Le système de santé",
        body: `${liste([
            "Cases et postes de santé dans les villages et quartiers, centres de santé, hôpitaux.",
            "La couverture maladie universelle (CMU), lancée en 2013, aide les familles à payer les soins.",
            "Les campagnes de sensibilisation informent sur le paludisme, le VIH, la tuberculose.",
          ])}
          ${retenir("La santé publique concerne toute la population : chacun protège aussi les autres en respectant les règles d’hygiène.")}`,
      },
    ],
  },
];
