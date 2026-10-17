// Éducation à la science et à la vie sociale (ESVS) du CE2 : guide pédagogique officiel de l’étape 2
// (MEN), paliers 3 et 4 de chaque sous-domaine : histoire, géographie, initiation scientifique et
// technologique, vivre dans son milieu et vivre ensemble. Leçons rédigées par DIANGAL, à faire valider.

import { tableau } from "../3e/blocks";
import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";

const HIST = "Histoire";
const GEO = "Géographie";
const IST = "Initiation scientifique et technologique";
const VM = "Vivre dans son milieu";
const VE = "Vivre ensemble";

export const ESVS_CE2: CiChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "L’idée de progrès",
    strand: HIST,
    summary: "Comment les activités de l’homme et sa façon de vivre ont changé au fil du temps.",
    lessons: [
      {
        title: "Les progrès de l’homme",
        body: `${tableau([
            ["Autrefois", "Aujourd’hui"],
            ["chasse, pêche et cueillette pour se nourrir", "agriculture, élevage, pêche avec des moteurs"],
            ["outils en pierre, puis en fer", "machines, tracteurs"],
            ["feu de bois pour cuire et s’éclairer", "gaz, électricité, panneaux solaires"],
            ["cases en paille", "maisons en ciment"],
            ["guérisseurs et plantes", "hôpitaux et médicaments (et toujours certaines plantes)"],
          ])}
          ${keyPoint("La découverte du feu, l’agriculture, l’élevage et les métaux ont été de grands progrès.")}
          ${practice(["Demande à un grand-parent ce qui a changé depuis son enfance."])}`,
      },
    ],
  },
  {
    title: "Faits et personnages de l’histoire locale",
    strand: HIST,
    summary: "Les événements marquants et les personnages célèbres de sa localité dans l’histoire des royaumes du Sénégal.",
    lessons: [
      {
        title: "L’histoire de ma localité",
        body: `${bullets([
            "Événements marquants : batailles, fondation de villages, sécheresses, épidémies, années de famine ou d’abondance.",
            "Personnages marquants : rois et reines, chefs religieux et coutumiers, résistants, héros de la localité.",
            "Exemples : Lat Dior au Cayor, la reine Ndatté Yalla au Walo, Aline Sitoé Diatta en Casamance, El Hadji Omar dans le Fouta.",
          ])}
          ${keyPoint("Chaque localité du Sénégal a son histoire, liée à un ancien royaume.")}
          ${practice(["Cherche le nom d’un personnage célèbre de ta région et raconte ce qu’il a fait."])}`,
      },
    ],
  },
  {
    title: "Les royaumes du Sénégal d’autrefois",
    strand: HIST,
    summary: "Royaume et empire ; les principaux royaumes du Sénégal sur la carte.",
    lessons: [
      {
        title: "Royaumes et empires",
        body: `${bullets([
            "Un <strong>royaume</strong> est un territoire dirigé par un roi ; des chefs lui doivent obéissance (vassalité).",
            "Un <strong>empire</strong> est plus grand : il domine plusieurs royaumes.",
            "Principaux royaumes : Tékrour, Fouta, Djolof, Cayor, Baol, Walo, Sine, Saloum, Niani, Gabou, royaumes de Casamance, et la « république » lébou du Cap-Vert.",
          ])}
          ${keyPoint("Ces royaumes avaient chacun leur roi, leur capitale et leur organisation.")}
          ${practice(["Sur une carte du Sénégal, situe trois royaumes et ta région."])}`,
      },
    ],
  },
  {
    title: "Le Djolof, le Gabou et les royaumes successeurs",
    strand: HIST,
    summary: "L’organisation politique, sociale et économique du Djolof et de ses successeurs, du Gabou et des royaumes du sud.",
    lessons: [
      {
        title: "Du grand Djolof aux royaumes du Cayor, du Baol, du Walo, du Sine et du Saloum",
        body: `${bullets([
            "Le Djolof, fondé par Ndiadiane Ndiaye, réunissait plusieurs royaumes. Son roi était le Bourba.",
            "Après la bataille de Danki (XVI<sup>e</sup> siècle), le Cayor devient indépendant, puis d’autres royaumes s’en séparent.",
            "Rois : damel au Cayor, teigne au Baol, brak au Walo, bour au Sine et au Saloum.",
            "Économie : agriculture (mil), élevage, artisanat, commerce.",
          ])}
          ${keyPoint("La société était organisée autour du roi, des dignitaires, des hommes libres, des artisans et des griots.")}
          ${practice(["Fais une fiche sur un royaume : nom du roi, capitale, activités."])}`,
      },
      {
        title: "Le Gabou et les royaumes du sud et de l’est",
        body: `${bullets([
            "Le <strong>Gabou</strong>, royaume mandingue, dirigé par un mansa, s’étendait vers la Guinée-Bissau.",
            "Au sud : les royaumes diolas de Casamance, organisés autour des villages et des rois-prêtres.",
            "À l’est : les royaumes mandingues et peuls, le Boundou.",
          ])}
          ${keyPoint("Ces royaumes commerçaient entre eux : sel, poisson séché, mil, bétail, tissus.")}
          ${practice(["Situe le Gabou et le Boundou sur une carte."])}`,
      },
    ],
  },
  // ── Géographie ────────────────────────────────────────────────────────────
  {
    title: "S’orienter et lire une carte",
    strand: GEO,
    summary: "Les moyens de s’orienter ; limites, légende et signes conventionnels d’un plan ou d’une carte.",
    lessons: [
      {
        title: "Lire une carte",
        body: `${bullets([
            "Une carte représente un territoire vu de dessus, en plus petit.",
            "Le nord est en haut de la carte.",
            "La <strong>légende</strong> explique les couleurs et les signes : bleu pour l’eau, points pour les villes, traits pour les routes ou les frontières.",
          ])}
          ${keyPoint("On s’oriente avec le Soleil, l’étoile polaire, la boussole, ou un repère connu.")}
          ${practice(["Sur la carte du Sénégal, trouve ta région et le fleuve le plus proche."])}`,
      },
    ],
  },
  {
    title: "Ma région : relief, eau, climat et végétation",
    strand: GEO,
    summary: "Les caractéristiques physiques de sa région.",
    lessons: [
      {
        title: "Le milieu physique de ma région",
        body: `${tableau([
            ["Élément", "Ce que j’observe"],
            ["relief", "plaine, plateau, dunes, collines, vallée"],
            ["eau", "fleuve, rivière, marigot, lac, mer"],
            ["climat", "quantité de pluie, vents, température"],
            ["végétation", "steppe au nord, savane au centre, forêt au sud, mangrove près de la mer"],
          ])}
          ${keyPoint("Plus on va vers le sud du Sénégal, plus il pleut et plus la végétation est abondante.")}
          ${practice(["Décris la végétation de ta région en trois phrases."])}`,
      },
    ],
  },
  {
    title: "Les activités et la vie des hommes",
    strand: GEO,
    summary: "Agriculture, élevage, pêche, tourisme ; mouvements des populations et types d’habitat.",
    lessons: [
      {
        title: "Agriculture, élevage, pêche et tourisme",
        body: `${tableau([
            ["Activité", "Exemples"],
            ["agriculture", "cultures vivrières (mil, riz, maïs, niébé) et industrielles (arachide, coton) ; techniques traditionnelles (hilaire, daba) ou modernes (tracteur)"],
            ["élevage", "bovins, ovins, caprins, chevaux, ânes ; transhumance et embouche"],
            ["pêche", "artisanale en pirogue ou industrielle ; ligne, filet, nasse"],
            ["tourisme", "plages, parcs (Niokolo-Koba), culture ; hôtels et campements"],
          ])}
          ${keyPoint("Les produits sont transformés et conservés : huileries, rizeries, poisson séché ou fumé.")}
          ${practice(["Quelle est l’activité principale de ta région ?"])}`,
      },
      {
        title: "Les mouvements de population et l’habitat",
        body: `${bullets([
            "<strong>Exode rural</strong> : des jeunes quittent les villages pour la ville.",
            "<strong>Transhumance</strong> : les éleveurs se déplacent avec leurs troupeaux à la recherche de pâturages.",
            "Types d’habitat : case, maison en dur, villa, immeuble, mais aussi baraques et bidonvilles.",
          ])}
          ${keyPoint("L’exode rural vide les campagnes et surcharge les villes.")}
          ${practice(["Dessine le type d’habitation de ton quartier."])}`,
      },
    ],
  },
  // ── Initiation scientifique et technologique ─────────────────────────────
  {
    title: "Le corps humain",
    strand: IST,
    summary: "Organisation du corps, les cinq sens, la peau, le squelette, les muscles, la croissance.",
    lessons: [
      {
        title: "Les cinq sens et la peau",
        body: `${tableau([
            ["Sens", "Organe", "Hygiène"],
            ["la vue", "les yeux", "ne pas fixer le soleil, lire à la lumière"],
            ["l’ouïe", "les oreilles", "pas de bruit trop fort, pas d’objet pointu"],
            ["l’odorat", "le nez", "se moucher"],
            ["le goût", "la langue", "se brosser les dents"],
            ["le toucher", "la peau", "se laver, se protéger du soleil"],
          ])}
          ${keyPoint("La peau protège le corps ; elle a des pores par où sort la sueur.")}
          ${practice(["Les yeux fermés, reconnais des objets par le toucher."])}`,
      },
      {
        title: "Le squelette, les muscles et la croissance",
        body: `${bullets([
            "Le <strong>squelette</strong> soutient le corps ; les <strong>articulations</strong> (coude, genou) permettent de plier.",
            "Les <strong>muscles</strong> font bouger les os.",
            "L’enfant grandit : sa taille et son poids augmentent. Le bébé rampe, puis marche à quatre pattes, puis se tient debout.",
          ])}
          ${keyPoint("Pour bien grandir : bien manger, dormir assez et faire du sport.")}
          ${practice(["Plie ton bras : touche le muscle qui se gonfle."])}`,
      },
    ],
  },
  {
    title: "Les animaux",
    strand: IST,
    summary: "Organisation du corps de quelques animaux, leur utilité et leur mode de vie.",
    lessons: [
      {
        title: "Comment vivent les animaux",
        body: `${tableau([
            ["Caractère", "Exemples"],
            ["régime alimentaire", "herbivore (vache), carnivore (lion), omnivore (poule)"],
            ["déplacement", "marche (chèvre), nage (poisson), vol (oiseau), reptation (serpent)"],
            ["respiration", "poumons (chat) ou branchies (poisson)"],
            ["reproduction", "vivipare : le petit naît vivant (vache) ; ovipare : il naît d’un œuf (poule)"],
          ])}
          ${keyPoint("Les animaux nous sont utiles : viande, lait, œufs, peaux, transport, travail, garde.")}
          ${practice(["Fais la fiche d’identité d’un animal de ton milieu."])}`,
      },
    ],
  },
  {
    title: "Les plantes",
    strand: IST,
    summary: "Les parties de la plante, sa croissance, sa nutrition, sa respiration et son utilité.",
    lessons: [
      {
        title: "La vie des plantes",
        body: `${bullets([
            "Parties : racines, tronc ou tige, branches, feuilles, fleurs, fruits, écorce.",
            "Croissance : la graine germe, la plante se développe, fleurit puis donne des fruits.",
            "Nutrition : la plante puise l’eau et les éléments du sol par ses racines ; la sève circule dans la tige.",
            "Elle respire par ses feuilles.",
          ])}
          ${keyPoint("Les plantes nous donnent du bois, de l’ombre, des fruits, des médicaments et protègent le sol.")}
          ${practice(["Observe une plante de mil ou de maïs du semis à la récolte."])}`,
      },
    ],
  },
  {
    title: "Utiliser et fabriquer des objets technologiques",
    strand: IST,
    summary: "Utiliser et entretenir des objets ; circuit ouvert et fermé ; fabriquer un circuit simple et des jouets.",
    lessons: [
      {
        title: "Le circuit électrique et les objets fabriqués",
        body: `${bullets([
            "Une lampe de poche fonctionne avec des piles : la pile, les fils et l’ampoule forment un <strong>circuit</strong>.",
            "Circuit <strong>fermé</strong> : l’ampoule s’allume. Circuit <strong>ouvert</strong> : elle s’éteint.",
            "Les objets s’entretiennent : nettoyage, graissage, dépoussiérage.",
            "On peut fabriquer des jouets : voiturette en fil de fer, toupie, cerf-volant.",
          ])}
          ${keyPoint("Ne jamais jouer avec les prises et les fils du courant de la maison : c’est dangereux.")}
          ${practice(["Avec une pile, deux fils et une petite ampoule, fabrique un circuit qui s’allume."])}`,
      },
    ],
  },
  // ── Vivre dans son milieu ────────────────────────────────────────────────
  {
    title: "Se protéger contre le paludisme",
    strand: VM,
    summary: "Causes, signes, prévention et traitement du paludisme.",
    lessons: [
      {
        title: "Le paludisme",
        body: `${bullets([
            "Le paludisme est transmis par la piqûre d’un moustique, l’<strong>anophèle</strong> femelle.",
            "Les moustiques se multiplient dans les eaux stagnantes.",
            "Signes : fièvre, maux de tête, vomissements, fatigue.",
            "Se protéger : dormir sous une moustiquaire imprégnée, supprimer les eaux stagnantes, utiliser des insecticides.",
          ])}
          ${keyPoint("En cas de fièvre, il faut aller vite au poste de santé : le paludisme se soigne.")}
          ${practice(["Avec ta classe, repère et supprime les eaux stagnantes autour de l’école."])}`,
      },
    ],
  },
  {
    title: "Se protéger contre le sida",
    strand: VM,
    summary: "Les modes de transmission par le sang et les comportements qui protègent.",
    lessons: [
      {
        title: "Le sida : se protéger",
        body: `${bullets([
            "Le sida est une maladie causée par un virus, le VIH, qui affaiblit les défenses du corps.",
            "Il peut se transmettre par le sang : objets pointus ou tranchants déjà utilisés (lames, aiguilles), tatouages.",
            "Il ne se transmet pas en jouant, en mangeant ensemble ou en se serrant la main.",
          ])}
          ${keyPoint("Je ne touche pas le sang des autres à mains nues, je n’utilise pas une lame ou une aiguille déjà utilisée, et je parle à un adulte de confiance si une personne plus âgée me fait des avances.")}
          ${practice(["Fais une affiche : « Des gestes simples pour me protéger »."])}`,
      },
    ],
  },
  {
    title: "Environnement et population",
    strand: VM,
    summary: "Les formes de dégradation de l’environnement et les problèmes de population du milieu : causes, conséquences, solutions.",
    lessons: [
      {
        title: "Protéger l’environnement",
        body: `${tableau([
            ["Problème", "Solutions"],
            ["désertification, déforestation", "reboisement, brise-vent, foyers améliorés"],
            ["érosion", "diguettes, plantations"],
            ["feux de brousse", "pare-feu, sensibilisation"],
            ["ordures, eaux usées, péril fécal", "poubelles, puisards, toilettes"],
            ["bruit, fumées", "respect des règles, contrôle des véhicules"],
          ])}
          ${keyPoint("Le Code de l’environnement protège la nature : chacun doit le respecter.")}
          ${practice(["Choisis un problème d’environnement de ton quartier et propose deux solutions."])}`,
      },
      {
        title: "Les problèmes de population",
        body: `${bullets([
            "Problèmes : manque d’hygiène, malnutrition, maladies, logements trop petits (promiscuité), enfants non scolarisés, pauvreté.",
            "Solutions : informer et sensibiliser, aller à l’école, se soigner, bien se nourrir, garder un milieu propre.",
          ])}
          ${keyPoint("Une famille informée fait de meilleurs choix pour sa santé et son avenir.")}
          ${practice(["Prépare avec ta classe une journée de sensibilisation sur l’hygiène."])}`,
      },
    ],
  },
  // ── Vivre ensemble ────────────────────────────────────────────────────────
  {
    title: "Droits et devoirs",
    strand: VE,
    summary: "Ses devoirs et ses droits dans la vie en commun.",
    lessons: [
      {
        title: "Mes droits et mes devoirs",
        body: `${tableau([
            ["Mes droits", "Mes devoirs"],
            ["m’exprimer, donner mon avis", "respecter l’avis des autres"],
            ["être protégé, être en sécurité", "ne pas faire de mal aux autres"],
            ["aller à l’école, être informé", "travailler et respecter le règlement"],
            ["être respecté dans ma dignité", "être solidaire, hospitalier, discret"],
          ])}
          ${keyPoint("J’ai des droits, mais aussi des devoirs : respecter le bien public (l’école, la rue) et le bien des autres.")}
          ${practice(["Écris trois règles de vie pour ta classe."])}`,
      },
    ],
  },
  {
    title: "La paix et les valeurs",
    strand: VE,
    summary: "Les idéaux de paix et les valeurs positives de notre milieu.",
    lessons: [
      {
        title: "Vivre en paix",
        body: `${bullets([
            "Idéaux de paix : tolérance, respect des différences (religion, ethnie, opinion), solidarité, liberté, égalité, démocratie.",
            "Valeurs de notre milieu : la <em>teranga</em> (hospitalité), la solidarité, l’humilité, la politesse, le courage, le respect des anciens, la mesure (<em>kersa</em>).",
            "En cas de dispute, on discute calmement ou on demande l’aide d’un médiateur.",
          ])}
          ${keyPoint("Au Sénégal, la « parenté à plaisanterie » (<em>kal</em>) aide à apaiser les tensions entre familles et ethnies.")}
          ${practice(["Joue avec un camarade une scène de dispute réglée par le dialogue."])}`,
      },
    ],
  },
];
