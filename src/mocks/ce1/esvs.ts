// Éducation à la science et à la vie sociale (ESVS) du CE1 : guide pédagogique officiel de l’étape 2
// (MEN), paliers 1 et 2 de chaque sous-domaine : histoire, géographie, initiation scientifique et
// technologique (découverte du monde), vivre dans son milieu et vivre ensemble (éducation au
// développement durable). Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { tableau } from "../3e/blocks";
import { bullets, type CiChapterSpec, keyPoint, practice } from "../ci/blocks";

const HIST = "Histoire";
const GEO = "Géographie";
const IST = "Initiation scientifique et technologique";
const VM = "Vivre dans son milieu";
const VE = "Vivre ensemble";

export const ESVS_CE1: CiChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "Le temps qui passe",
    strand: HIST,
    summary: "Distinguer le passé, le présent et le futur ; se situer dans le temps.",
    lessons: [
      {
        title: "Hier, aujourd’hui, demain",
        body: `${tableau([
            ["Passé", "Présent", "Futur"],
            ["hier, avant, l’année dernière, il y a longtemps", "aujourd’hui, maintenant, cette année", "demain, après, l’année prochaine"],
          ])}
          ${bullets(["Mon grand-père est né il y a longtemps : c’est le passé.", "Aujourd’hui, je suis en CE1 : c’est le présent.", "L’année prochaine, je serai en CE2 : c’est le futur."])}
          ${keyPoint("Une frise du temps range les événements dans l’ordre, du plus ancien au plus récent.")}
          ${practice(["Dessine une frise avec ta naissance, ton entrée à l’école et aujourd’hui.", "Demande l’âge de tes parents et de tes grands-parents."])}`,
      },
    ],
  },
  {
    title: "L’histoire de ma famille et de mon école",
    strand: HIST,
    summary: "L’arbre généalogique sur trois générations ; l’histoire de son école.",
    lessons: [
      {
        title: "Mon arbre généalogique",
        body: `<p>L’<strong>arbre généalogique</strong> montre les membres d’une famille sur plusieurs générations.</p>
          ${bullets(["1re génération : mes grands-parents.", "2e génération : mes parents, mes oncles et tantes.", "3e génération : moi, mes frères, mes sœurs, mes cousins."])}
          ${keyPoint("Les anciens de la famille connaissent son histoire : on peut les interroger.")}
          ${practice(["Dessine ton arbre généalogique avec les prénoms de tes grands-parents.", "Demande à un grand-parent comment était sa vie quand il était enfant."])}`,
      },
      {
        title: "L’histoire de mon école",
        body: `${bullets(["Quand l’école a-t-elle été créée ?", "Qui était le premier directeur ?", "Qui est son parrain (la personne dont elle porte le nom) ?", "Comment l’école s’est-elle agrandie ?"])}
          ${keyPoint("Pour connaître l’histoire de l’école, j’interroge le directeur, les anciens maîtres et je regarde les vieilles photos.")}
          ${practice(["Fais une petite fiche : nom de l’école, date de création, nombre de classes."])}`,
      },
    ],
  },
  {
    title: "L’histoire de mon quartier ou de mon village",
    strand: HIST,
    summary: "L’origine et l’évolution du quartier, les vestiges du passé, les personnes célèbres de la localité.",
    lessons: [
      {
        title: "Mon quartier hier et aujourd’hui",
        body: `${bullets([
            "Origine : qui a fondé le quartier ou le village ? Pourquoi à cet endroit ?",
            "Évolution : nouvelles maisons, routes, écoles, marchés.",
            "Vestiges du passé : vieille mosquée ou église, cimetière, fort, place publique, puits ancien, musée.",
          ])}
          ${keyPoint("Les vestiges et les récits des anciens nous racontent le passé de notre localité.")}
          ${practice(["Demande à un ancien qui a fondé ton quartier ou ton village.", "Dessine un monument ou un lieu ancien de ta localité."])}`,
      },
    ],
  },
  {
    title: "L’histoire de ma commune",
    strand: HIST,
    summary: "L’origine, l’organisation et les grandes figures de sa commune.",
    lessons: [
      {
        title: "Ma commune",
        body: `<p>La <strong>commune</strong> regroupe plusieurs quartiers ou villages. Elle est dirigée par un <strong>maire</strong> et un <strong>conseil municipal</strong> élus par les habitants.</p>
          ${bullets(["La commune s’occupe de l’état civil (déclarer les naissances), des marchés, de la propreté, des écoles.", "Elle a son histoire : fondation, événements importants, personnes célèbres."])}
          ${keyPoint("La mairie est le bâtiment où travaillent le maire et ses agents.")}
          ${practice(["Cherche le nom de ta commune et de son maire.", "Cite un événement important de l’histoire de ta commune."])}`,
      },
    ],
  },
  // ── Géographie ────────────────────────────────────────────────────────────
  {
    title: "Le jour, la nuit et les points cardinaux",
    strand: GEO,
    summary: "La Terre est ronde et tourne ; le jour et la nuit ; s’orienter avec les points cardinaux.",
    lessons: [
      {
        title: "Le jour et la nuit",
        body: `<p>La <strong>Terre est ronde</strong> et elle <strong>tourne</strong> sur elle-même en un jour. Le côté éclairé par le Soleil est dans le jour ; l’autre côté est dans la nuit.</p>
          ${keyPoint("Le Soleil se lève à l’est et se couche à l’ouest.")}
          ${practice(["Avec une lampe et une balle, montre le jour et la nuit."])}`,
      },
      {
        title: "S’orienter",
        body: `<p>Les quatre <strong>points cardinaux</strong> sont le <strong>nord</strong>, le <strong>sud</strong>, l’<strong>est</strong> et l’<strong>ouest</strong>.</p>
          ${bullets([
            "Le matin, si je regarde le Soleil levant, je suis face à l’est ; l’ouest est derrière moi, le nord à ma gauche, le sud à ma droite.",
            "La nuit, l’étoile polaire indique le nord.",
            "Une mosquée est tournée vers La Mecque, c’est-à-dire vers l’est au Sénégal.",
            "La boussole indique toujours le nord.",
          ])}
          ${keyPoint("Pour s’orienter, on utilise le Soleil, l’étoile polaire, la boussole ou un repère connu.")}
          ${practice(["Dans la cour, montre l’est, l’ouest, le nord et le sud."])}`,
      },
    ],
  },
  {
    title: "Le temps qu’il fait et les saisons",
    strand: GEO,
    summary: "Observer le temps (soleil, vent, pluie, température) ; les deux saisons du Sénégal.",
    lessons: [
      {
        title: "Le temps et les saisons au Sénégal",
        body: `${bullets(["Le temps qu’il fait : il fait chaud, il fait frais, il y a du vent, il pleut.", "On mesure la température avec un thermomètre."])}
          ${tableau([
            ["Saison", "Période", "Caractéristiques"],
            ["saison des pluies (hivernage)", "de juin-juillet à octobre", "pluies, chaleur humide, travaux des champs"],
            ["saison sèche", "de novembre à juin", "pas de pluie, harmattan, fraîcheur puis forte chaleur"],
          ])}
          ${keyPoint("Pendant l’hivernage, les paysans sèment et cultivent ; pendant la saison sèche, ils récoltent et préparent la saison suivante.")}
          ${practice(["Note le temps qu’il fait chaque jour pendant une semaine."])}`,
      },
    ],
  },
  {
    title: "Le relief",
    strand: GEO,
    summary: "Plaine, colline, vallée, dune, plateau, montagne, cuvette : reconnaître et représenter le relief.",
    lessons: [
      {
        title: "Les formes du relief",
        body: `${tableau([
            ["Forme", "Description"],
            ["plaine", "terrain plat et bas"],
            ["plateau", "terrain plat mais élevé"],
            ["colline", "petite hauteur aux pentes douces"],
            ["montagne", "grande hauteur aux pentes raides"],
            ["vallée", "creux allongé où coule souvent un cours d’eau"],
            ["dune", "colline de sable formée par le vent"],
            ["cuvette", "creux fermé où l’eau peut s’accumuler"],
          ])}
          ${keyPoint("Le Sénégal est surtout un pays de plaines ; on trouve des collines au sud-est (Kédougou) et des dunes au bord de la mer.")}
          ${practice(["Fabrique une maquette du relief avec du sable ou de l’argile."])}`,
      },
    ],
  },
  {
    title: "Les points d’eau et les cours d’eau",
    strand: GEO,
    summary: "Puits, forages, mares, lacs ; ruisseaux, rivières, fleuves et mer.",
    lessons: [
      {
        title: "L’eau autour de moi",
        body: `${bullets([
            "<strong>Points d’eau</strong> : puits, forage, bassin de rétention, mare, lac, marigot.",
            "<strong>Cours d’eau</strong> : la source, le ruisseau, la rivière, le fleuve qui se jette dans la mer.",
            "Les grands fleuves du Sénégal : le Sénégal, la Gambie, la Casamance.",
          ])}
          ${keyPoint("Un fleuve se jette dans la mer ou dans l’océan ; une rivière se jette dans un fleuve.")}
          ${practice(["Quel point d’eau y a-t-il près de chez toi ?", "Dessine un fleuve qui va de sa source à la mer."])}`,
      },
    ],
  },
  {
    title: "Faire un plan",
    strand: GEO,
    summary: "Établir le plan simple de la classe, de l’école ou de la maison et y situer des éléments.",
    lessons: [
      {
        title: "Le plan de ma classe",
        body: `<p>Un <strong>plan</strong> est un dessin vu de dessus, en plus petit.</p>
          ${bullets(["Je dessine les murs, la porte et les fenêtres.", "Je place le bureau du maître, le tableau et les tables.", "J’ajoute une légende : un signe pour chaque objet."])}
          ${keyPoint("Sur un plan, on voit les objets comme un oiseau qui vole au-dessus.")}
          ${practice(["Dessine le plan de ta chambre ou de ta classe avec une légende."])}`,
      },
    ],
  },
  // ── Initiation scientifique et technologique ─────────────────────────────
  {
    title: "Les êtres vivants se nourrissent",
    strand: IST,
    summary: "Les parties du corps, de l’animal et de la plante ; les besoins ; herbivores, carnivores, omnivores.",
    lessons: [
      {
        title: "Les besoins des êtres vivants",
        body: `${bullets([
            "L’homme et l’animal ont besoin de manger et de boire : on a faim, on a soif.",
            "La plante a besoin d’eau, de lumière et des éléments du sol.",
            "La plante a des racines, une tige, des feuilles, des fleurs et des fruits.",
          ])}
          ${keyPoint("Tous les êtres vivants ont besoin de se nourrir pour vivre et grandir.")}
          ${practice(["Plante une graine de niébé : arrose-la et observe-la chaque jour."])}`,
      },
      {
        title: "Ce que mangent les animaux",
        body: `${tableau([
            ["Régime", "Il mange…", "Exemples"],
            ["herbivore", "des plantes", "mouton, chèvre, vache"],
            ["carnivore", "de la viande", "lion, chacal"],
            ["omnivore", "de tout", "homme, poule"],
            ["granivore", "des graines", "moineau, mange-mil"],
            ["insectivore", "des insectes", "lézard, hirondelle"],
          ])}
          ${keyPoint("Les dents d’un animal montrent souvent ce qu’il mange.")}
          ${practice(["Classe : chat, âne, poule, criquet, lion."])}`,
      },
    ],
  },
  {
    title: "Les êtres vivants respirent",
    strand: IST,
    summary: "La respiration de l’homme, de l’animal et de la plante.",
    lessons: [
      {
        title: "Respirer",
        body: `${bullets([
            "L’homme et beaucoup d’animaux respirent par le nez : l’air va dans les poumons.",
            "Le poisson respire dans l’eau grâce à ses branchies.",
            "La plante respire aussi, par ses feuilles.",
          ])}
          ${keyPoint("Sans air, aucun être vivant ne peut vivre.")}
          ${practice(["Pose ta main sur ta poitrine : sens-tu qu’elle se soulève quand tu respires ?"])}`,
      },
    ],
  },
  {
    title: "Les produits et les objets de la maison",
    strand: IST,
    summary: "Propriétés de quelques combustibles et produits courants ; utiliser et entretenir des objets simples.",
    lessons: [
      {
        title: "Combustibles et produits courants",
        body: `${bullets([
            "Les <strong>combustibles</strong> brûlent et donnent de la chaleur : bois, charbon de bois, gaz, pétrole, essence. Ils sont dangereux près du feu.",
            "Produits courants : l’eau mouille et dissout le sucre ; l’huile ne se mélange pas à l’eau ; le coton absorbe l’eau ; le plastique est imperméable.",
          ])}
          ${keyPoint("On garde l’essence, le pétrole et le gaz loin du feu et hors de portée des enfants.")}
          ${practice(["Mets du sucre, puis de l’huile dans un verre d’eau : que se passe-t-il ?"])}`,
      },
      {
        title: "Utiliser et entretenir des objets simples",
        body: `${bullets([
            "Lampe de poche : on met les piles dans le bon sens et on l’éteint après usage.",
            "Foyer amélioré : il consomme moins de bois que le foyer traditionnel.",
            "Fer à repasser, radio, thermomètre, montre : on les utilise avec soin et on les nettoie.",
          ])}
          ${keyPoint("Un objet bien entretenu dure plus longtemps.")}
          ${practice(["Montre comment changer les piles d’une lampe de poche."])}`,
      },
    ],
  },
  // ── Vivre dans son milieu ────────────────────────────────────────────────
  {
    title: "L’eau potable",
    strand: VM,
    summary: "S’approvisionner en eau potable, la protéger, la purifier et l’économiser.",
    lessons: [
      {
        title: "Avoir de l’eau propre et l’économiser",
        body: `${bullets([
            "L’eau potable vient du robinet, du forage ou d’un puits protégé.",
            "Je la transporte et la conserve dans des récipients propres et couverts.",
            "Pour purifier l’eau : la laisser reposer (décantation), la filtrer, ajouter quelques gouttes d’eau de Javel.",
            "J’économise l’eau : je ferme bien le robinet, je signale les fuites.",
          ])}
          ${keyPoint("Une eau sale peut donner des maladies : diarrhée, choléra, vers.")}
          ${practice(["Montre comment filtrer de l’eau avec un linge propre."])}`,
      },
    ],
  },
  {
    title: "L’hygiène et l’alimentation",
    strand: VM,
    summary: "Hygiène du corps, des vêtements, de la classe et de la maison ; ordures et eaux usées ; manger sainement.",
    lessons: [
      {
        title: "Être propre et garder son milieu propre",
        body: `${bullets([
            "Je me lave tous les jours, je me brosse les dents, je coupe mes ongles.",
            "Je me lave les mains avec du savon avant de manger et après les toilettes.",
            "Je jette les ordures dans la poubelle ; on ne jette pas les eaux usées dans la rue.",
          ])}
          ${keyPoint("La propreté du corps et du milieu protège contre les maladies.")}
          ${practice(["Organise avec ta classe le nettoyage de la cour."])}`,
      },
      {
        title: "Manger sainement",
        body: `${bullets([
            "Des aliments pour avoir de l’énergie : mil, riz, maïs.",
            "Des aliments pour grandir : poisson, viande, œufs, lait, niébé.",
            "Des aliments pour se protéger des maladies : fruits et légumes.",
          ])}
          ${keyPoint("Un bon repas contient des aliments des trois groupes. On lave les fruits avant de les manger.")}
          ${practice(["Compose un repas équilibré avec des aliments de ton milieu."])}`,
      },
    ],
  },
  {
    title: "Protéger l’environnement",
    strand: VM,
    summary: "Les formes de dégradation du milieu proche et les moyens simples de le restaurer et de le sauvegarder.",
    lessons: [
      {
        title: "Protéger notre milieu",
        body: `${bullets([
            "Formes de dégradation : arbres coupés, sol emporté par le vent ou l’eau, feux de brousse, ordures, tables cassées.",
            "Ce qu’on peut faire : planter et arroser des arbres, ramasser les ordures, entretenir les toilettes et le mobilier de l’école.",
          ])}
          ${keyPoint("L’école est à nous tous : on la garde propre et on ne casse rien.")}
          ${practice(["Plante un arbre dans la cour de l’école avec ta classe et arrose-le."])}`,
      },
    ],
  },
  // ── Vivre ensemble ────────────────────────────────────────────────────────
  {
    title: "Respecter les autres",
    strand: VE,
    summary: "Règles de politesse et de bon voisinage, respect des plus faibles et des adultes.",
    lessons: [
      {
        title: "La politesse et le respect",
        body: `${bullets([
            "Je dis bonjour, s’il vous plaît, merci, pardon.",
            "Je cède ma place à une personne âgée, j’aide un camarade handicapé.",
            "Je respecte le repos des voisins et je n’insulte personne.",
            "J’obéis à mes parents, à mes maîtres et aux adultes.",
          ])}
          ${keyPoint("Respecter les autres, c’est les traiter comme j’aimerais qu’on me traite.")}
          ${practice(["Joue une scène où tu aides une personne âgée à traverser la rue."])}`,
      },
    ],
  },
  {
    title: "Le civisme",
    strand: VE,
    summary: "Respecter les symboles de la Nation, les forces de l’ordre, les autorités et les règlements.",
    lessons: [
      {
        title: "Respecter les symboles de la Nation et les règles",
        body: `${bullets([
            "Les symboles : le drapeau vert, or, rouge avec une étoile verte ; l’hymne national ; la devise « Un Peuple – Un But – Une Foi » ; la fête de l’indépendance le 4 avril.",
            "Les forces de l’ordre nous protègent : policier, gendarme, sapeur-pompier, militaire.",
            "Je respecte le règlement de l’école et le code de la route.",
          ])}
          ${keyPoint("Pendant la levée des couleurs, je me tiens droit et silencieux.")}
          ${practice(["Dessine le drapeau du Sénégal avec ses couleurs dans l’ordre."])}`,
      },
    ],
  },
  {
    title: "Respecter les différences",
    strand: VE,
    summary: "Respecter les garçons et les filles, les personnes handicapées, les opinions et les cultures des autres.",
    lessons: [
      {
        title: "Nous sommes tous différents",
        body: `${bullets([
            "Garçons et filles ont les mêmes droits : aller à l’école, jouer, être respectés.",
            "On ne se moque pas de quelqu’un parce qu’il est petit, malade, handicapé ou pauvre.",
            "Au Sénégal, des personnes d’ethnies et de religions différentes vivent ensemble dans la paix.",
            "Chacun a le droit de donner son avis.",
          ])}
          ${keyPoint("Nos différences sont une richesse.")}
          ${practice(["Cite trois langues parlées dans ta classe ou ton quartier."])}`,
      },
    ],
  },
];
