// Éducation à la science et à la vie sociale (ESVS) du CI. Programme : Curriculum de l'Éducation
// de Base, guide pédagogique de l'étape 1 (CI-CP), MEN — paliers 1 et 2 (niveau 1) de l'histoire,
// de la géographie, de l'initiation scientifique et technologique, de « Vivre dans son milieu » et
// de « Vivre ensemble ». Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { bullets, type CiChapterSpec, keyPoint, practice } from "./blocks";
import { figure, pic, row, schema } from "../lesson-figures";

export const ESVS_CI: CiChapterSpec[] = [
  // ── Histoire ──────────────────────────────────────────────────────────────
  {
    title: "Histoire : ma journée et le temps qui passe",
    strand: "Histoire",
    summary: "Rythmes, ordre des événements, avant et après, hier, aujourd’hui et demain.",
    lessons: [
      {
        title: "Avant, en même temps, après",
        body: `<p>Les choses arrivent les unes <strong>après</strong> les autres : c’est l’ordre du temps.</p>
          ${figure(schema("ci-journee", "Ma journée : le matin, à l’école, le repas, la nuit."), "Les moments de ma journée arrivent les uns <strong>après</strong> les autres.")}
          <h2>Je découvre</h2>
          ${bullets(["Je me lave <strong>avant</strong> de m’habiller.", "Je mange <strong>après</strong> m’être lavé les mains.", "Maman prépare le repas <strong>en même temps</strong> que papa balaie la cour."])}
          ${keyPoint("Pour raconter ma journée, je dis ce qui se passe d’abord, puis ensuite, et enfin.")}
          ${practice(["Raconte ton matin à un adulte dans l’ordre : réveil, toilette, petit-déjeuner, départ à l’école."])}`,
      },
      {
        title: "Hier, aujourd’hui, demain",
        body: `<p><strong>Aujourd’hui</strong>, c’est le jour où nous sommes. <strong>Hier</strong>, c’était le jour d’avant. <strong>Demain</strong>, ce sera le jour d’après.</p>
          ${figure("<table><tr><th>hier</th><th>aujourd’hui</th><th>demain</th></tr><tr><td>lundi</td><td>mardi</td><td>mercredi</td></tr></table>", "Si aujourd’hui c’est mardi, hier c’était lundi et demain ce sera mercredi.")}
          <h2>Je découvre</h2>
          ${bullets(["Hier, je suis allé chez ma grand-mère.", "Aujourd’hui, je vais à l’école.", "Demain, nous irons au marché."])}
          ${keyPoint("Hier est passé, aujourd’hui c’est maintenant, demain n’est pas encore arrivé.")}
          ${practice(["Dis une chose que tu as faite hier, une que tu fais aujourd’hui et une que tu feras demain."])}`,
      },
      {
        title: "Ce que l’on fait souvent",
        body: `<p>Certaines activités reviennent chaque jour : ce sont nos <strong>habitudes</strong>.</p>
          ${figure(row(pic("brosse-a-dents", "je me brosse les dents"), pic("savon", "je me lave"), pic("cartable", "je vais à l’école")), "Ce que je fais chaque jour : ce sont mes <strong>habitudes</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["Chaque jour : se laver, manger, aller à l’école, dormir.", "Chaque semaine : le marché, le jour de repos.", "Le jour et la nuit reviennent toujours l’un après l’autre."])}
          ${keyPoint("Ce qui revient souvent est fréquent ; ce qui arrive rarement est moins fréquent.")}
          ${practice(["Tape un rythme dans tes mains, l’adulte le répète. Puis dis trois choses que tu fais tous les jours."])}`,
      },
    ],
  },
  {
    title: "Histoire : mesurer une durée",
    strand: "Histoire",
    summary: "Estimer, comparer et mesurer une durée sans montre ; jeune et vieux, ancien et nouveau.",
    lessons: [
      {
        title: "C’est long ou c’est court ?",
        body: `<p>Certaines choses durent longtemps, d’autres très peu.</p>
          ${figure(row(pic("verre-eau", "boire un verre d’eau : court"), pic("lit", "une nuit de sommeil : long")), "Boire un verre d’eau dure <strong>peu</strong> de temps ; une nuit de sommeil dure <strong>longtemps</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["Une récréation est plus courte qu’une journée d’école.", "Mon petit frère est plus <strong>jeune</strong> que moi ; mon grand-père est plus <strong>âgé</strong>.", "Mon cahier neuf est <strong>nouveau</strong> ; la vieille malle de la maison est <strong>ancienne</strong>."])}
          ${keyPoint("Plus longtemps, moins longtemps, plus âgé, moins âgé : ces mots comparent le temps.")}
          ${practice(["Range les membres de ta famille du plus jeune au plus âgé."])}`,
      },
      {
        title: "Mesurer le temps sans montre",
        body: `<p>Sans montre, on peut quand même <strong>mesurer</strong> une durée.</p>
          ${figure(schema("ci-soleil-journee", "Le soleil le matin, à midi et le soir."), "La place du soleil dans le ciel aide à savoir le moment de la journée.")}
          <h2>Je découvre</h2>
          ${bullets(["On compte : un, deux, trois…", "On frappe dans ses mains à un rythme régulier.", "On regarde le sable couler dans un sablier."])}
          ${keyPoint("Pour mesurer, j’utilise toujours la même façon de compter.")}
          ${practice(["Fabrique un sablier avec deux bouteilles et du sable, avec un adulte.", "Compte combien de temps tu tiens sur un pied."])}`,
      },
    ],
  },

  // ── Géographie ────────────────────────────────────────────────────────────
  {
    title: "Géographie : se repérer autour de soi",
    strand: "Géographie",
    summary: "Repères fixes et repères mobiles, se situer, suivre et indiquer un itinéraire.",
    lessons: [
      {
        title: "Les repères de mon quartier",
        body: `<p>Un <strong>repère</strong>, c’est quelque chose que l’on reconnaît et qui aide à trouver son chemin.</p>
          ${figure(row(pic("maison", "ma maison"), pic("boutique", "la boutique"), pic("arbre", "le grand arbre"), pic("ecole", "l’école")), "Des <strong>repères</strong> de mon quartier : on les voit de loin et on les reconnaît.")}
          <h2>Je découvre</h2>
          ${bullets(["Des repères <strong>fixes</strong> ne bougent pas : la mosquée, l’église, le grand arbre, la borne-fontaine, le puits.", "Des repères qui <strong>bougent</strong> : le soleil se lève d’un côté et se couche de l’autre."])}
          ${keyPoint("Un bon repère est facile à voir et ne change pas de place.")}
          ${practice(["Sur le chemin de l’école, cite trois repères fixes."])}`,
      },
      {
        title: "Le soleil, le jour et la nuit",
        body: `<p>Le matin, le soleil <strong>apparaît</strong> ; à midi, il est haut dans le ciel ; le soir, il <strong>disparaît</strong>. Puis c’est la nuit.</p>
          ${figure(schema("ci-jour-nuit", "Le soleil éclaire la Terre : le jour d’un côté, la nuit de l’autre."), "Le côté éclairé par le soleil a le <strong>jour</strong> ; l’autre côté a la <strong>nuit</strong>.")}
          <h2>Je découvre</h2>
          <p>À midi, l’ombre de l’arbre est toute petite. Le matin et le soir, elle est longue.</p>
          ${keyPoint("Le soleil semble se déplacer dans le ciel pendant la journée : il aide à se repérer.")}
          ${practice(["Plante un bâton dans le sable et regarde son ombre le matin, à midi et le soir."])}`,
      },
      {
        title: "Suivre et indiquer un chemin",
        body: `<p>Pour aller quelque part, on suit des <strong>indications</strong> : à droite, à gauche, devant, en face de, à côté de…</p>
          ${figure(schema("ci-itineraire", "Un chemin rouge sur un quadrillage, jusqu’à l’école."), "Pour indiquer un chemin, on dit où tourner : tout droit, à droite, à gauche.")}
          <h2>Je découvre</h2>
          <p>« Sors de la maison, tourne à gauche, marche jusqu’à la boutique : l’école est en face. »</p>
          ${keyPoint("Pour indiquer un chemin, je donne les repères dans l’ordre où on les rencontre.")}
          ${practice(["Cache un objet dans la maison. Guide l’adulte jusqu’à lui avec des indications."])}`,
      },
    ],
  },
  {
    title: "Géographie : mon milieu",
    strand: "Géographie",
    summary: "Découvrir ce qui m’entoure et localiser des éléments à partir de repères.",
    lessons: [
      {
        title: "Ce qu’il y a autour de moi",
        body: `<p>Mon <strong>milieu</strong>, c’est tout ce qui m’entoure : la maison, la rue, l’école, les gens, les animaux et les plantes.</p>
          ${figure(row(pic("arbre", "un arbre"), pic("case", "une case"), pic("chevre", "une chèvre"), pic("nuage", "un nuage")), "Autour de moi, il y a des plantes, des maisons, des animaux et le ciel.")}
          <h2>Je découvre</h2>
          ${bullets(["Des éléments physiques : le sol, la route, le fleuve ou la mer.", "Des plantes : le baobab, le manguier, les herbes.", "Des animaux : les chèvres, les poules, les oiseaux.", "Des hommes et des femmes qui travaillent : le boutiquier, le tailleur, le pêcheur."])}
          ${keyPoint("Mon milieu n’est pas le même que celui d’un enfant qui vit ailleurs.")}
          ${practice(["Fais la liste de ce que tu vois en sortant de chez toi."])}`,
      },
      {
        title: "Placer les choses à partir de repères",
        body: `<p>Pour dire où se trouve une chose, je la place par rapport à un <strong>repère</strong>.</p>
          ${figure(schema("ci-rangee", "Une mangue, un ballon et un cahier sur une étagère."), "Le ballon sert de repère : la mangue est à gauche du ballon, le cahier à droite.")}
          <h2>Je découvre</h2>
          ${bullets(["La boutique est <strong>à côté de</strong> la mosquée.", "Le puits est <strong>entre</strong> la maison et le jardin.", "Les chèvres sont <strong>dans</strong> l’enclos ; le chien est <strong>dehors</strong>."])}
          ${keyPoint("À côté de, entre, dedans, dehors, en face de : ces mots aident à placer les choses.")}
          ${practice(["Dessine ta rue et place-y ta maison, la boutique et un grand arbre. Explique ton dessin."])}`,
      },
    ],
  },

  // ── Initiation scientifique et technologique ─────────────────────────────
  {
    title: "Sciences : le monde qui m’entoure",
    strand: "Initiation scientifique et technologique",
    summary: "Éléments naturels et objets techniques, animaux, insectes, plantes et êtres humains.",
    lessons: [
      {
        title: "Les éléments naturels et les objets",
        body: `<p>Autour de moi, il y a des choses de la <strong>nature</strong> et des <strong>objets fabriqués</strong> par l’homme.</p>
          ${figure(row(pic("arbre", "naturel"), pic("caillou", "naturel"), pic("table", "fabriqué"), pic("velo", "fabriqué")), "L’arbre et le caillou viennent de la <strong>nature</strong> ; la table et le vélo sont <strong>fabriqués</strong> par l’homme.")}
          <h2>Je découvre</h2>
          ${bullets(["Dans la nature : les pierres, le sable, l’argile, l’eau.", "Fabriqués par l’homme : la lampe, la table, le téléphone, les jouets."])}
          ${keyPoint("Un objet fabriqué a été fait par des personnes ; un élément naturel existe sans elles.")}
          ${practice(["Trie des objets de la maison en deux tas : nature et fabriqué."])}`,
      },
      {
        title: "Les animaux et les plantes",
        body: `<p>Les animaux et les plantes sont des <strong>êtres vivants</strong> : ils naissent, grandissent et meurent.</p>
          ${figure(row(pic("chevre", "une chèvre"), pic("poule", "une poule"), pic("arbre", "un arbre"), pic("fleur", "une fleur")), "La chèvre et la poule sont des <strong>animaux</strong> ; l’arbre et la fleur sont des <strong>plantes</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["Animaux <strong>domestiques</strong> : la chèvre, le mouton, la poule. Animaux <strong>sauvages</strong> : le lion, le singe.", "Certains ont des poils, d’autres des plumes. Certains mangent de l’herbe, d’autres de la viande.", "Des insectes : la mouche, le moustique, l’abeille.", "Des plantes : les arbres, les fleurs, les herbes."])}
          ${keyPoint("On peut classer les animaux : domestiques ou sauvages, à poils ou à plumes.")}
          ${practice(["Cherche dans un livre ou dans la cour un animal à plumes, un animal à poils et un insecte."])}`,
      },
    ],
  },
  {
    title: "Sciences : la matière et la croissance",
    strand: "Initiation scientifique et technologique",
    summary: "Solides, liquides et gaz ; les étapes du développement d’une plante, d’un animal, d’un enfant.",
    lessons: [
      {
        title: "Solide, liquide ou gaz ?",
        body: `<p>Tout ce qui nous entoure est fait de <strong>matière</strong>.</p>
          ${figure(row(pic("caillou", "solide"), pic("verre-eau", "liquide"), pic("ballon-baudruche", "gaz")), "Le caillou est <strong>solide</strong>, l’eau est <strong>liquide</strong>, l’air dans le ballon est un <strong>gaz</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["Un <strong>solide</strong> garde sa forme : une pierre, un morceau de sucre.", "Un <strong>liquide</strong> coule et prend la forme du récipient : l’eau, l’huile, le lait.", "Un <strong>gaz</strong> ne se voit souvent pas, mais il remplit tout : l’air d’un ballon, le gaz de la bonbonne."])}
          ${keyPoint("Solide, liquide, gaz : ce sont les trois états de la matière.")}
          ${practice(["Classe en trois groupes : du sucre, de l’huile, un ballon gonflé, une craie, de l’eau."])}`,
      },
      {
        title: "Grandir",
        body: `<p>Les êtres vivants <strong>grandissent</strong> en passant par plusieurs étapes.</p>
          ${figure(row(pic("bebe", "bébé", 60), pic("eleve-garcon", "enfant", 90), pic("papa", "adulte", 120)), "Le bébé grandit : il devient un enfant, puis un adulte.")}
          <h2>Je découvre</h2>
          ${bullets(["La plante : la graine, la germination, la tige qui monte, puis la fleur.", "La poule : l’œuf est couvé, le poussin éclôt, puis il devient une poule.", "L’enfant : le bébé, l’enfant, puis l’adulte."])}
          ${keyPoint("Chaque être vivant grandit dans un ordre qui ne change pas.")}
          ${practice(["Fais germer une graine d’arachide ou de haricot dans du coton humide et observe-la chaque jour.", "Compare ta taille avec celle de tes camarades."])}`,
      },
    ],
  },

  // ── Vivre dans son milieu ─────────────────────────────────────────────────
  {
    title: "Vivre dans son milieu : santé et hygiène",
    strand: "Vivre dans son milieu",
    summary: "Se protéger des maladies comme le paludisme, être propre, éviter les aliments abîmés.",
    lessons: [
      {
        title: "Se protéger du paludisme",
        body: `<p>Le <strong>paludisme</strong> est une maladie transmise par la piqûre de certains moustiques. Il donne de la fièvre.</p>
          ${figure(row(pic("moustique", "le moustique"), pic("moustiquaire", "la moustiquaire")), "Le moustique transmet le paludisme : je dors sous une <strong>moustiquaire</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["Je dors sous une moustiquaire.", "Je ne laisse pas d’eau qui stagne dans les boîtes et les pneus : les moustiques y pondent.", "Si j’ai de la fièvre, je le dis tout de suite à un adulte : il faut aller au poste de santé."])}
          ${keyPoint("La moustiquaire protège des piqûres de moustiques pendant la nuit.")}
          ${practice(["Fais le tour de la cour avec un adulte et cherche l’eau qui stagne."])}`,
      },
      {
        title: "Être propre : mon corps, ma classe, ma maison",
        body: `<p>L’<strong>hygiène</strong>, c’est rester propre pour ne pas tomber malade.</p>
          ${figure(row(pic("savon", "le savon"), pic("brosse-a-dents", "la brosse à dents"), pic("poubelle", "la poubelle")), "Je me lave avec du savon, je me brosse les dents et je jette les déchets à la poubelle.")}
          <h2>Je découvre</h2>
          ${bullets(["Je me lave les mains avec du savon avant de manger et après être allé aux toilettes.", "Je me brosse les dents et je porte des habits propres.", "Je jette les ordures dans la poubelle, à la maison comme à l’école.", "J’utilise les toilettes : jamais dans la nature."])}
          ${keyPoint("Se laver les mains avec du savon chasse les microbes qu’on ne voit pas.")}
          ${practice(["Montre à un adulte comment tu te laves les mains : paumes, dos des mains, entre les doigts, ongles."])}`,
      },
      {
        title: "Attention aux aliments abîmés",
        body: `<p>Certains aliments peuvent rendre <strong>malade</strong>.</p>
          ${figure(row(pic("mangue", "bonne à manger"), pic("mangue-abimee", "abîmée")), "Une mangue abîmée peut rendre malade : je ne la mange pas.")}
          <h2>Je découvre</h2>
          ${bullets(["Je ne mange pas un aliment pourri ou qui sent mauvais.", "Je ne mange pas de fruits pas mûrs.", "On couvre les plats pour les protéger des mouches.", "Un produit dont la date est dépassée ne se mange pas : un adulte vérifie."])}
          ${keyPoint("Quand je ne suis pas sûr qu’un aliment est bon, je demande à un adulte.")}
          ${practice(["Avec un adulte, regarde la date sur un paquet de biscuits ou une boîte de lait."])}`,
      },
    ],
  },
  {
    title: "Vivre dans son milieu : protéger l’environnement",
    strand: "Vivre dans son milieu",
    summary: "Prendre soin des plantes et des animaux, ne pas salir, ne pas gaspiller, respecter les biens communs.",
    lessons: [
      {
        title: "Prendre soin des plantes et des animaux",
        body: `<p>Les plantes et les animaux de la maison et de l’école ont besoin de nous.</p>
          ${figure(row(pic("arrosoir", "j’arrose"), pic("plante", "la plante pousse"), pic("poule", "je nourris la poule")), "J’arrose les plantes et je donne à manger aux animaux.")}
          <h2>Je découvre</h2>
          ${bullets(["J’arrose les plantes et je ne casse pas leurs branches.", "Je donne à boire et à manger aux animaux domestiques.", "Je ne fais pas de mal aux animaux."])}
          ${keyPoint("Les arbres donnent de l’ombre et des fruits ; les animaux nous rendent service : il faut les protéger.")}
          ${practice(["Choisis une plante de la maison et occupe-t’en pendant une semaine."])}`,
      },
      {
        title: "Ne pas salir, ne pas gaspiller",
        body: `<p>Notre environnement est fragile. Chacun peut le protéger par de petits gestes.</p>
          ${figure(row(pic("poubelle", "je jette à la poubelle"), pic("verre-eau", "je ne gaspille pas l’eau")), "Je garde mon milieu propre et je n’use que l’eau dont j’ai besoin.")}
          <h2>Je découvre</h2>
          ${bullets(["Je ne jette pas les sachets plastiques par terre.", "Je ferme le robinet quand je n’utilise plus l’eau.", "J’éteins la lumière en quittant une pièce.", "Je prends soin des tables, des livres et des murs de l’école : ils appartiennent à tous."])}
          ${keyPoint("Ne pas salir, ne pas abîmer, ne pas gaspiller : ce sont des gestes de citoyen.")}
          ${practice(["Ramasse avec un adulte les déchets devant la maison, en portant des gants ou un sac."])}`,
      },
    ],
  },

  // ── Vivre ensemble ────────────────────────────────────────────────────────
  {
    title: "Vivre ensemble : bien se conduire",
    strand: "Vivre ensemble",
    summary: "Se respecter et respecter les autres, être ponctuel, rendre service, dire la vérité.",
    lessons: [
      {
        title: "Le respect de soi et des autres",
        body: `<p>Se <strong>respecter</strong>, c’est prendre soin de son corps, de ses habits et de son langage. Respecter les autres, c’est être poli avec tout le monde.</p>
          ${figure(row(pic("eleve-fille", "« Bonjour, madame ! »", 90), pic("maitresse", "« Bonjour, Awa ! »", 90)), "Je salue, je dis « s’il te plaît » et « merci » : je respecte les autres.")}
          <h2>Je découvre</h2>
          ${bullets(["Je salue les personnes que je rencontre.", "Je parle poliment, sans gros mots.", "Je respecte les aînés, mes parents, mes maîtres et même l’adversaire dans un jeu."])}
          ${keyPoint("Le respect se voit dans mes paroles et dans mes gestes.")}
          ${practice(["Joue avec un adulte la scène d’un enfant qui salue un voisin âgé."])}`,
      },
      {
        title: "À l’heure, serviable et franc",
        body: `<p>À l’école et à la maison, de bons comportements rendent la vie plus agréable.</p>
          ${figure(row(pic("cartable", "je prépare mon cartable la veille"), pic("ecole", "j’arrive à l’heure")), "Préparer ses affaires la veille aide à arriver <strong>à l’heure</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["Je viens à l’heure et je ne m’absente pas sans raison : c’est la <strong>ponctualité</strong> et l’<strong>assiduité</strong>.", "J’aide un camarade qui en a besoin : c’est l’<strong>entraide</strong>.", "Je dis la vérité, même quand j’ai fait une bêtise : c’est la <strong>franchise</strong>."])}
          ${keyPoint("Dire la vérité donne confiance aux autres.")}
          ${practice(["Raconte une fois où tu as aidé quelqu’un, et une fois où quelqu’un t’a aidé."])}`,
      },
    ],
  },
  {
    title: "Vivre ensemble : moi et les autres",
    strand: "Vivre ensemble",
    summary: "Se présenter, dire à quels groupes on appartient, être solidaire.",
    lessons: [
      {
        title: "Je me présente et je fais partie de groupes",
        body: `<p>Chacun a une identité : un prénom, un nom, un âge, une famille, une adresse.</p>
          ${figure(row(pic("papa", "papa", 100), pic("maman", "maman", 100), pic("eleve-fille", "moi", 80), pic("bebe", "mon petit frère", 50)), "Ma famille est un <strong>groupe</strong> ; ma classe aussi.")}
          <h2>Je découvre</h2>
          ${bullets(["« Je m’appelle Fatou Diop. J’ai 6 ans. Mon père s’appelle Ibrahima. »", "J’appartiens à des <strong>groupes</strong> : ma famille, ma classe, mon école, mon équipe."])}
          ${keyPoint("Je connais mon nom, mon adresse et le numéro de téléphone d’un parent, mais je ne les donne pas à un inconnu.")}
          ${practice(["Apprends par cœur le numéro de téléphone d’un parent avec son aide."])}`,
      },
      {
        title: "La solidarité",
        body: `<p>Être <strong>solidaire</strong>, c’est aider ceux qui en ont besoin.</p>
          ${figure(row(pic("eleve-garcon", "Modou", 90), pic("livre", "", 50), pic("eleve-fille", "Awa", 90)), "Modou partage son livre avec Awa : il est <strong>solidaire</strong>.")}
          <h2>Je découvre</h2>
          ${bullets(["Je prête ma règle à un camarade qui a oublié la sienne.", "Je partage mon goûter avec un ami qui n’en a pas.", "J’aide un camarade blessé et je préviens un adulte."])}
          ${keyPoint("Dans une classe solidaire, personne n’est laissé seul.")}
          ${practice(["Trouve avec ta famille une façon d’aider un voisin cette semaine."])}`,
      },
    ],
  },
];
