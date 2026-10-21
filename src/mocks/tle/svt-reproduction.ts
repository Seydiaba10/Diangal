// SVT de Terminale : immunologie, reproduction, génétique, hérédité humaine et biotechnologies
// (programmes L2, S1 et S2 de 2015, Office du Bac). L'hérédité humaine suit le programme de chaque
// série : L2 (albinisme, groupes sanguins, rhésus), S1 (albinisme, hérédité liée au sexe), S2 (tout,
// plus les anomalies chromosomiques et la bioéthique). Leçons rédigées par DIANGAL, à faire valider
// par un enseignant.

import { auBac, definition, erreurs, exercice, formula, type LessonSpec, liste, methode, objectifs, retenir, tableau } from "./blocks";

// ── Immunologie ─────────────────────────────────────────────────────────────

export const SYSTEME_IMMUNITAIRE: LessonSpec = {
  title: "Le système immunitaire",
  minutes: 25,
  body: `${objectifs([
      "définir le soi, le non-soi, l’intégrité et l’immunité ;",
      "citer les organes, les cellules et les molécules du système immunitaire.",
    ])}
    <h2>1. Soi, non-soi et intégrité</h2>
    ${definition("soi", "ensemble des molécules propres à un individu, déterminées par ses gènes. Les plus importantes sont les marqueurs du <strong>CMH</strong> (complexe majeur d’histocompatibilité, appelé HLA chez l’Homme), présents à la surface de presque toutes ses cellules, et les marqueurs des groupes sanguins sur les hématies.")}
    ${liste([
      "le <strong>non-soi</strong> est tout ce que l’organisme reconnaît comme étranger : microbes (bactéries, virus, parasites), cellules greffées, toxines ;",
      "le <strong>soi modifié</strong> : cellules infectées par un virus ou cellules cancéreuses ;",
      "une molécule capable de déclencher une réponse immunitaire est un <strong>antigène</strong>.",
    ])}
    <p>L’<strong>intégrité</strong> de l’organisme, c’est le maintien de son soi. L’<strong>immunité</strong> est l’ensemble des moyens de défense qui l’assurent.</p>
    <h2>2. Les organes du système immunitaire</h2>
    ${tableau([
      ["Organes", "Rôle"],
      ["<strong>centraux</strong> : moelle osseuse rouge, thymus", "production de toutes les cellules immunitaires ; maturation des lymphocytes B (moelle) et T (thymus), qui apprennent à tolérer le soi"],
      ["<strong>périphériques</strong> : ganglions lymphatiques, rate, amygdales, végétations, plaques de Peyer de l’intestin", "lieux de rencontre des lymphocytes et des antigènes, où se déclenche la réponse"],
    ])}
    <p>Les cellules immunitaires circulent par le <strong>sang</strong> et la <strong>lymphe</strong>. Un ganglion qui gonfle (« adénopathie ») signale une réponse immunitaire en cours.</p>
    <h2>3. Les cellules immunitaires</h2>
    ${tableau([
      ["Cellule", "Rôle"],
      ["granulocytes (polynucléaires) et monocytes devenant <strong>macrophages</strong>", "<strong>phagocytose</strong> ; les macrophages présentent aussi les antigènes aux lymphocytes"],
      ["<strong>lymphocytes B</strong>", "reconnaissent l’antigène et deviennent des <strong>plasmocytes</strong> qui sécrètent des anticorps"],
      ["<strong>lymphocytes T4</strong> (auxiliaires)", "coordonnent la réponse en sécrétant des interleukines"],
      ["<strong>lymphocytes T8</strong>", "deviennent des lymphocytes T cytotoxiques qui tuent les cellules infectées"],
      ["mastocytes", "libèrent l’histamine (inflammation, allergie)"],
    ])}
    <h2>4. Les molécules immunitaires</h2>
    ${liste([
      "les <strong>anticorps</strong> (immunoglobulines) : molécules en Y à deux sites de fixation spécifiques d’un antigène ;",
      "les <strong>interleukines</strong> : messagers chimiques entre cellules immunitaires ;",
      "le <strong>complément</strong> : protéines du plasma qui perforent les bactéries ;",
      "l’<strong>histamine</strong> et d’autres médiateurs de l’inflammation ; la <strong>perforine</strong> des lymphocytes T cytotoxiques.",
    ])}
    ${exercice(
      "Une greffe de peau prise sur un jumeau vrai est conservée ; une greffe prise sur un frère non jumeau est rejetée en deux semaines. Explique.",
      [
        "Des jumeaux vrais ont les mêmes gènes, donc le même CMH : le greffon est reconnu comme du soi.",
        "Un frère non jumeau a un CMH différent : ses cellules portent des marqueurs du non-soi.",
        "Le système immunitaire du receveur reconnaît le greffon comme étranger et le détruit : c’est le <strong>rejet de greffe</strong>.",
      ],
    )}
    ${retenir("Le système immunitaire distingue le soi (CMH) du non-soi. Organes centraux : moelle osseuse et thymus ; organes périphériques : ganglions, rate, amygdales. Acteurs : phagocytes, lymphocytes B, T4, T8 ; anticorps et interleukines.")}`,
};

export const REPONSE_IMMUNITAIRE: LessonSpec = {
  title: "La réponse immunitaire",
  minutes: 35,
  body: `${objectifs([
      "décrire la réaction inflammatoire et la phagocytose ;",
      "caractériser l’immunité à médiation humorale et à médiation cellulaire ;",
      "décrire les étapes de la réponse spécifique, la coopération cellulaire et la mémoire immunitaire.",
    ])}
    <h2>1. La réponse non spécifique (innée)</h2>
    <p>Elle est immédiate et agit contre tous les intrus de la même façon.</p>
    ${liste([
      "<strong>barrières naturelles</strong> : peau, muqueuses, mucus, larmes (lysozyme), acidité de l’estomac ;",
      "<strong>réaction inflammatoire</strong> après une blessure : rougeur, chaleur, gonflement, douleur. Les mastocytes libèrent de l’histamine : les vaisseaux se dilatent et deviennent plus perméables ; les phagocytes sortent des capillaires (<strong>diapédèse</strong>) et se rendent au foyer ;",
      "<strong>phagocytose</strong> en quatre étapes : adhésion du microbe, ingestion (formation d’une vésicule), digestion par les enzymes des lysosomes, rejet des débris. Le pus est un amas de phagocytes morts et de microbes.",
    ])}
    <h2>2. La réponse spécifique (acquise)</h2>
    <p>Elle vise un antigène précis, se met en place en quelques jours et laisse une mémoire.</p>
    ${tableau([
      ["", "Immunité à médiation humorale", "Immunité à médiation cellulaire"],
      ["Mise en évidence", "le <strong>sérum</strong> d’un animal immunisé transmet la protection à un animal neuf", "seuls les <strong>lymphocytes T</strong> d’un animal immunisé transmettent la protection (cas du BCG, des greffes)"],
      ["Effecteurs", "<strong>anticorps</strong> produits par les plasmocytes (issus des LB)", "<strong>lymphocytes T cytotoxiques</strong> (issus des LT8)"],
      ["Cibles", "antigènes libres : bactéries, toxines, virus hors des cellules", "cellules infectées par un virus, cellules cancéreuses, greffons"],
      ["Mode d’action", "formation de <strong>complexes immuns</strong> antigène-anticorps qui neutralisent l’antigène, puis sont phagocytés", "contact avec la cellule cible, libération de <strong>perforine</strong> qui la détruit (lyse)"],
    ])}
    <p>Le test d’<strong>Ouchterlony</strong> (immunodiffusion en gélose) montre la spécificité des anticorps : un arc de précipitation n’apparaît qu’entre un anticorps et l’antigène qui l’a induit.</p>
    <h2>3. Les étapes de la réponse spécifique</h2>
    ${methode([
      "<strong>Induction (reconnaissance)</strong> : chaque lymphocyte possède des récepteurs d’une seule spécificité. Les LB reconnaissent l’antigène entier ; les LT reconnaissent un fragment de l’antigène <strong>présenté</strong> par une cellule (macrophage) associé au CMH : c’est la double reconnaissance. Seuls les lymphocytes spécifiques sont <strong>sélectionnés</strong>.",
      "<strong>Amplification</strong> : les lymphocytes sélectionnés se multiplient et forment un <strong>clone</strong> (sélection clonale) ; les LT4 activés sécrètent l’<strong>interleukine 2</strong>, qui stimule cette multiplication.",
      "<strong>Différenciation</strong> : les LB deviennent des plasmocytes, les LT8 des LT cytotoxiques ; une partie devient des <strong>cellules mémoire</strong>.",
      "<strong>Phase effectrice</strong> : les anticorps neutralisent les antigènes, les LT cytotoxiques détruisent les cellules infectées ; les phagocytes éliminent les complexes immuns.",
    ], "Quatre phases")}
    <h2>4. La coopération cellulaire</h2>
    <p>Des expériences de culture le montrent : des LB seuls, mis en présence d’un antigène, ne produisent pas d’anticorps ; il faut aussi des <strong>macrophages</strong> et des <strong>LT4</strong>. Le LT4 est le chef d’orchestre : sans lui, ni la réponse humorale ni la réponse cellulaire ne se développent. C’est pourquoi le VIH, qui détruit les LT4, est si dangereux.</p>
    <h2>5. La mémoire immunitaire</h2>
    ${tableau([
      ["", "Réponse primaire (1<sup>er</sup> contact)", "Réponse secondaire (contact suivant)"],
      ["Délai", "5 à 15 jours", "2 à 3 jours"],
      ["Quantité d’anticorps", "faible", "beaucoup plus élevée"],
      ["Durée", "courte", "longue"],
    ])}
    <p>La réponse secondaire est plus rapide et plus forte grâce aux <strong>cellules mémoire</strong>, nombreuses et à longue durée de vie. C’est le principe de la vaccination.</p>
    ${exercice(
      "On injecte à une souris l’anatoxine tétanique, puis 3 semaines plus tard la toxine tétanique : elle survit. Une souris neuve qui reçoit le sérum de la première survit aussi à la toxine, mais pas une souris qui reçoit ses lymphocytes T seulement. Interprète.",
      [
        "L’anatoxine (toxine rendue inoffensive mais encore antigénique) a déclenché une réponse spécifique : la souris est immunisée.",
        "La protection est transmise par le <strong>sérum</strong> : elle est due à des <strong>anticorps</strong> antitoxine.",
        "Les LT seuls ne protègent pas : il s’agit d’une immunité à médiation <strong>humorale</strong>.",
      ],
    )}
    ${retenir("Réponse innée : barrières, inflammation, phagocytose. Réponse spécifique : induction (sélection), amplification (clones, interleukines), différenciation (plasmocytes, LTc, mémoire), phase effectrice (anticorps, perforine). Le LT4 coordonne tout.")}
    ${auBac("Pour un exercice de transfert (sérum, lymphocytes), raisonne ainsi : « ce qui transfère la protection » porte l’immunité. Sérum = anticorps (humorale) ; lymphocytes T = immunité cellulaire.")}`,
};

export const VIH_SIDA: LessonSpec = {
  title: "Le VIH et le sida",
  minutes: 30,
  body: `${objectifs([
      "décrire la structure du VIH et sa cellule cible ;",
      "décrire le cycle du virus et l’évolution de l’infection ;",
      "connaître les modes de transmission et les moyens de prévention.",
    ])}
    ${definition("dysfonctionnement du système immunitaire", "situation où le système immunitaire ne joue plus son rôle : il est affaibli (immunodéficience, comme le sida) ou il s’attaque à tort au soi ou à des substances inoffensives (maladies auto-immunes, allergies).")}
    <h2>1. Le virus</h2>
    <p>Le <strong>VIH</strong> (virus de l’immunodéficience humaine) est un <strong>rétrovirus</strong> d’environ 0,1 µm :</p>
    ${liste([
      "une <strong>enveloppe</strong> issue de la cellule infectée, hérissée de protéines <strong>gp120</strong> ;",
      "une <strong>capside</strong> contenant deux molécules d’<strong>ARN</strong> (son information génétique) et des enzymes, dont la <strong>transcriptase inverse</strong>.",
    ])}
    <p>Sa cellule cible principale est le <strong>lymphocyte T4</strong> : la gp120 se fixe sur la molécule <strong>CD4</strong> de sa membrane. Il infecte aussi les macrophages.</p>
    <h2>2. Le cycle du VIH</h2>
    ${methode([
      "<strong>Fixation</strong> de la gp120 sur le CD4, puis fusion de l’enveloppe avec la membrane : la capside entre dans la cellule.",
      "<strong>Transcription inverse</strong> : la transcriptase inverse copie l’ARN viral en ADN.",
      "<strong>Intégration</strong> de cet ADN dans un chromosome de la cellule : le virus peut y rester caché des années.",
      "<strong>Expression</strong> : la cellule fabrique de l’ARN et des protéines virales.",
      "<strong>Assemblage</strong> de nouveaux virus et <strong>bourgeonnement</strong> : ils sortent en emportant un morceau de membrane, et le LT4 finit par mourir.",
    ], "Étapes")}
    <h2>3. Évolution de l’infection</h2>
    ${tableau([
      ["Phase", "Durée", "Ce qui se passe"],
      ["primo-infection", "quelques semaines", "le virus se multiplie beaucoup ; parfois fièvre, ganglions ; les anticorps anti-VIH apparaissent : la personne devient <strong>séropositive</strong>"],
      ["phase asymptomatique", "plusieurs années", "pas de signe, mais le virus se multiplie et les LT4 diminuent lentement ; la personne peut transmettre le virus"],
      ["sida (syndrome d’immunodéficience acquise)", "—", "les LT4 tombent sous 200 par mm³ : <strong>maladies opportunistes</strong> (tuberculose, pneumonies, candidoses, diarrhées, certains cancers)"],
    ])}
    <p>Le dépistage se fait par un test sanguin qui recherche les anticorps anti-VIH (test ELISA, confirmé par un second test). Il faut attendre environ 3 mois après une prise de risque pour un résultat sûr (« fenêtre sérologique »). Au Sénégal, le dépistage est gratuit et confidentiel.</p>
    <h2>4. Transmission et prévention</h2>
    ${tableau([
      ["Voie de transmission", "Prévention"],
      ["rapports sexuels non protégés", "abstinence, fidélité réciproque, <strong>préservatif</strong>"],
      ["sang : seringues, objets coupants partagés, transfusion non contrôlée", "matériel stérile et à usage unique, contrôle du sang transfusé"],
      ["de la mère à l’enfant (grossesse, accouchement, allaitement)", "dépistage pendant la grossesse et traitement de la mère"],
    ])}
    ${retenir("Le VIH ne se transmet <strong>pas</strong> par la salive, la sueur, une poignée de main, le partage d’un repas ou les piqûres de moustique : il ne faut pas rejeter les personnes vivant avec le VIH.")}
    <p><strong>Traitement</strong> : les <strong>antirétroviraux</strong> (ARV), gratuits au Sénégal, bloquent des enzymes du virus (transcriptase inverse, protéase). Ils ne guérissent pas, mais permettent une vie presque normale et rendent le virus indétectable, donc non transmissible.</p>
    ${exercice(
      "Chez un patient séropositif, le nombre de LT4 passe de 900 à 150 par mm³ en 8 ans, tandis que la quantité de virus dans le sang augmente. Il fait une tuberculose. Explique le lien entre ces observations.",
      [
        "Le VIH infecte et détruit les LT4 : leur nombre diminue au fil des années.",
        "Les LT4 coordonnent les réponses humorale et cellulaire : leur chute effondre les défenses.",
        "Sous 200 LT4 par mm³, l’organisme ne se défend plus contre des microbes habituellement contrôlés : le patient est au stade sida et développe une maladie opportuniste, la tuberculose.",
      ],
    )}
    ${auBac("Le sujet peut prendre la forme d’un exposé : introduction, plan structuré (structure du virus, cycle, évolution, prévention), schéma du cycle, conclusion.")}`,
};

export const AIDES_IMMUNITE: LessonSpec = {
  title: "Aides à la réponse immunitaire",
  minutes: 30,
  body: `${objectifs([
      "expliquer le principe de la vaccination et de la sérothérapie ;",
      "comparer immunité active et immunité passive ;",
      "connaître le rôle et les limites des antibiotiques ; les greffes et transfusions.",
    ])}
    <h2>1. La vaccination : une aide préventive</h2>
    <p>Un <strong>vaccin</strong> contient un antigène rendu inoffensif mais qui garde son pouvoir de déclencher une réponse : microbe tué ou atténué, toxine transformée en <strong>anatoxine</strong>, ou fragment du microbe. Il provoque une réponse primaire et la formation de <strong>cellules mémoire</strong> ; lors d’une vraie infection, la réponse secondaire, rapide et forte, empêche la maladie. Les <strong>rappels</strong> entretiennent la mémoire.</p>
    <p>Historiquement : Jenner contre la variole (1796), Pasteur contre la rage (1885). La variole a été éradiquée en 1980 grâce à la vaccination.</p>
    ${retenir("Le <strong>Programme élargi de vaccination</strong> (PEV) du Sénégal protège gratuitement les enfants contre la tuberculose (BCG), la poliomyélite, la diphtérie, le tétanos, la coqueluche, l’hépatite B, la rougeole, la fièvre jaune, entre autres.")}
    <h2>2. La sérothérapie : une aide curative</h2>
    <p>On injecte un <strong>sérum</strong> contenant des anticorps déjà fabriqués par un animal (souvent un cheval) immunisé. La protection est immédiate mais courte, car ces anticorps sont étrangers et vite éliminés. Exemples : sérum antitétanique après une blessure souillée chez une personne non vaccinée, sérum antivenimeux après une morsure de serpent.</p>
    ${tableau([
      ["", "Vaccination", "Sérothérapie"],
      ["Ce qu’on injecte", "un antigène inoffensif", "des anticorps"],
      ["Type d’immunité", "<strong>active</strong> (l’organisme produit lui-même)", "<strong>passive</strong> (anticorps reçus)"],
      ["Délai d’action", "2 à 3 semaines", "immédiat"],
      ["Durée", "longue (mémoire, rappels)", "quelques semaines"],
      ["But", "prévenir", "soigner une urgence"],
    ])}
    <p>Le nouveau-né bénéficie aussi d’une immunité passive naturelle : anticorps de sa mère reçus à travers le placenta et par le lait (colostrum).</p>
    <h2>3. Les antibiotiques</h2>
    ${liste([
      "ce sont des substances (souvent produites par des champignons, comme la pénicilline découverte par Fleming en 1928) qui tuent les <strong>bactéries</strong> ou bloquent leur multiplication ;",
      "ils sont <strong>sans effet sur les virus</strong> : inutile d’en prendre pour une grippe ;",
      "leur usage abusif ou un traitement arrêté trop tôt sélectionne des bactéries <strong>résistantes</strong> : on ne les prend que sur prescription, jusqu’au bout.",
    ])}
    <h2>4. Greffes et transfusions</h2>
    ${liste([
      "pour une greffe d’organe ou de moelle osseuse, on choisit un donneur au CMH le plus proche possible (souvent dans la famille) et on donne des <strong>immunosuppresseurs</strong> pour éviter le rejet ;",
      "une transfusion doit respecter la compatibilité des groupes sanguins ABO et rhésus, sinon les anticorps du receveur agglutinent les hématies reçues.",
    ])}
    ${exercice(
      "Un enfant non vacciné se blesse profondément avec un clou rouillé. Le médecin lui injecte à la fois du sérum antitétanique et une première dose de vaccin. Justifie ce double traitement.",
      [
        "La blessure peut contenir le bacille du tétanos, dont la toxine est mortelle : il faut une protection <strong>immédiate</strong>, apportée par les anticorps du sérum (immunité passive).",
        "Cette protection ne dure que quelques semaines.",
        "Le vaccin (anatoxine) déclenche une immunité <strong>active</strong> et durable, avec cellules mémoire, qui prendra le relais et protégera l’enfant à l’avenir.",
      ],
    )}
    ${retenir("Vaccin = antigène inoffensif → immunité active, durable, préventive. Sérum = anticorps → immunité passive, immédiate, brève, curative. Antibiotiques : contre les bactéries seulement.")}`,
};

// ── Reproduction ────────────────────────────────────────────────────────────

export const GAMETOGENESE: LessonSpec = {
  title: "Appareils reproducteurs et gamétogenèse",
  minutes: 40,
  body: `${objectifs([
      "décrire les gamètes, le testicule et l’ovaire ;",
      "décrire les étapes de la spermatogenèse et de l’ovogenèse ;",
      "décrire la méiose et expliquer les brassages chromosomiques.",
    ])}
    <h2>1. Les gamètes</h2>
    ${tableau([
      ["", "Spermatozoïde", "Ovocyte"],
      ["Taille", "≈ 60 µm, mobile", "≈ 120 µm, immobile, la plus grosse cellule du corps"],
      ["Structure", "<strong>tête</strong> (noyau à 23 chromosomes, acrosome riche en enzymes), <strong>pièce intermédiaire</strong> (mitochondries : énergie), <strong>flagelle</strong>", "noyau, cytoplasme riche en réserves, entouré de la <strong>zone pellucide</strong> et de cellules folliculaires (corona radiata)"],
    ])}
    <h2>2. La spermatogenèse (dans le testicule)</h2>
    <p>Le testicule contient des centaines de <strong>tubes séminifères</strong> ; entre eux, les <strong>cellules interstitielles de Leydig</strong> produisent la testostérone. Dans la paroi des tubes, les <strong>cellules de Sertoli</strong> nourrissent les cellules germinales, qui évoluent de la périphérie vers la lumière du tube.</p>
    ${methode([
      "<strong>Multiplication</strong> : les <strong>spermatogonies</strong> (2n) se divisent par mitoses.",
      "<strong>Accroissement</strong> : elles grossissent et deviennent des <strong>spermatocytes I</strong> (2n).",
      "<strong>Maturation (méiose)</strong> : chaque spermatocyte I donne deux <strong>spermatocytes II</strong> (n), puis quatre <strong>spermatides</strong> (n).",
      "<strong>Différenciation (spermiogenèse)</strong> : chaque spermatide devient un <strong>spermatozoïde</strong>.",
    ], "Les quatre phases")}
    <p>Elle dure environ 74 jours et se fait en continu de la puberté à la fin de la vie.</p>
    <h2>3. L’ovogenèse (dans l’ovaire)</h2>
    <p>L’ovaire contient des <strong>follicules</strong> à différents stades : primordiaux, primaires, secondaires (cavitaires), puis le <strong>follicule mûr</strong> (de De Graaf) qui libère l’ovocyte à l’ovulation et devient ensuite le <strong>corps jaune</strong>.</p>
    ${liste([
      "les ovogonies se multiplient <strong>avant la naissance</strong> ; à la naissance, l’ovaire contient environ 1 million d’ovocytes I bloqués en prophase de la 1<sup>re</sup> division de méiose ;",
      "à chaque cycle, à partir de la puberté, un ovocyte I achève la 1<sup>re</sup> division juste avant l’ovulation : il donne un <strong>ovocyte II</strong> et un petit globule polaire ;",
      "l’ovocyte II est bloqué en métaphase de la 2<sup>e</sup> division ; il ne l’achève qu’<strong>en cas de fécondation</strong> ;",
      "une cellule germinale ne donne qu’<strong>un</strong> gamète (les globules polaires dégénèrent) ; l’ovogenèse s’arrête à la ménopause.",
    ])}
    <h2>4. La méiose</h2>
    ${definition("méiose", "succession de <strong>deux divisions</strong> qui, à partir d’une cellule diploïde (2n), donne quatre cellules haploïdes (n). Elle est précédée d’une réplication de l’ADN.")}
    ${tableau([
      ["Division", "Événements principaux"],
      ["1<sup>re</sup> division (<strong>réductionnelle</strong>)", "prophase I : les chromosomes homologues s’apparient (tétrades) et échangent des segments (<strong>crossing-over</strong> au niveau des chiasmas) ; métaphase I : les paires se placent sur l’équateur ; anaphase I : les <strong>homologues se séparent</strong> ; on passe de 2n à n chromosomes à deux chromatides"],
      ["2<sup>e</sup> division (<strong>équationnelle</strong>)", "comme une mitose : les deux chromatides de chaque chromosome se séparent ; quatre cellules à n chromosomes à une chromatide"],
    ])}
    <p>Quantité d’ADN par cellule : q (avant réplication) → 2q (après réplication) → q (après la 1<sup>re</sup> division) → q/2 (gamète).</p>
    <h2>5. Les brassages chromosomiques</h2>
    ${liste([
      "<strong>brassage interchromosomique</strong> (anaphase I) : chaque paire d’homologues se sépare au hasard, indépendamment des autres ; avec 23 paires, un individu peut produire 2²³ (plus de 8 millions) gamètes différents ;",
      "<strong>brassage intrachromosomique</strong> (prophase I) : le crossing-over échange des allèles entre chromosomes homologues et crée de nouvelles combinaisons.",
    ])}
    ${retenir("La méiose réduit de moitié le nombre de chromosomes (46 → 23) et, par les brassages, rend chaque gamète unique : c’est la source de la diversité des individus.")}
    ${exercice(
      "Une cellule de testicule contient 23 chromosomes à deux chromatides. De quelle cellule s’agit-il et à quelle étape est-elle ?",
      [
        "23 chromosomes : la cellule est haploïde, la 1<sup>re</sup> division de méiose a eu lieu.",
        "Les chromosomes ont encore deux chromatides : la 2<sup>e</sup> division ne s’est pas encore faite.",
        "C’est un <strong>spermatocyte II</strong>, entre les deux divisions de la méiose.",
      ],
    )}
    ${auBac("Pour schématiser la méiose, prends 2n = 4 (deux paires de chromosomes, de couleurs différentes) et dessine chaque phase ; c’est ce qui est attendu au Bac.")}`,
};

export const FECONDATION: LessonSpec = {
  title: "Fécondation et problèmes liés à la fécondation",
  minutes: 30,
  body: `${objectifs([
      "décrire les étapes de la fécondation chez les mammifères ;",
      "expliquer la monospermie et le rétablissement de la diploïdie ;",
      "connaître les principales causes d’infertilité et les techniques de procréation médicalement assistée.",
    ])}
    <h2>1. La rencontre des gamètes</h2>
    <p>Lors de l’ovulation, l’ovocyte II est recueilli par le pavillon de la trompe. Les spermatozoïdes déposés dans le vagin remontent l’utérus et les trompes ; pendant ce trajet, ils deviennent aptes à féconder (<strong>capacitation</strong>). La fécondation a lieu dans le <strong>tiers supérieur de la trompe</strong>. L’ovocyte ne vit qu’environ 24 heures après l’ovulation, les spermatozoïdes 3 à 5 jours.</p>
    <h2>2. Les étapes de la fécondation</h2>
    ${methode([
      "Les spermatozoïdes traversent la corona radiata ; au contact de la zone pellucide, l’<strong>acrosome</strong> libère ses enzymes (<strong>réaction acrosomique</strong>), qui creusent un passage.",
      "La membrane d’un seul spermatozoïde fusionne avec celle de l’ovocyte ; la tête entre dans le cytoplasme.",
      "<strong>Réaction corticale</strong> : des granules libèrent leur contenu et modifient la zone pellucide, qui devient infranchissable : c’est la <strong>monospermie</strong>.",
      "L’ovocyte achève sa 2<sup>e</sup> division de méiose et expulse le 2<sup>e</sup> globule polaire.",
      "Les deux noyaux (pronucléus mâle et femelle) se rapprochent et mettent en commun leurs chromosomes (<strong>amphimixie</strong>) : la <strong>cellule-œuf</strong> (zygote) est formée.",
    ], "Déroulement")}
    ${retenir("La fécondation rétablit la <strong>diploïdie</strong> (23 + 23 = 46 chromosomes), réunit deux patrimoines génétiques différents et détermine le sexe : le spermatozoïde apporte X (fille, XX) ou Y (garçon, XY).")}
    <p>La cellule-œuf se divise en descendant la trompe ; vers le 7<sup>e</sup> jour, l’embryon s’implante dans la muqueuse utérine : c’est la <strong>nidation</strong>.</p>
    <h2>3. Les jumeaux</h2>
    ${liste([
      "<strong>vrais jumeaux</strong> (monozygotes) : une seule cellule-œuf dont l’embryon se sépare en deux ; même sexe et même patrimoine génétique ;",
      "<strong>faux jumeaux</strong> (dizygotes) : deux ovocytes fécondés par deux spermatozoïdes ; ils se ressemblent comme des frères et sœurs.",
    ])}
    <h2>4. Problèmes liés à la fécondation</h2>
    ${tableau([
      ["Cause d’infertilité", "Exemples"],
      ["chez l’homme", "spermatozoïdes trop peu nombreux, peu mobiles ou anormaux ; obstruction des voies (souvent après une infection)"],
      ["chez la femme", "absence d’ovulation, <strong>trompes bouchées</strong> (souvent après une infection sexuellement transmissible mal soignée), glaire du col hostile"],
    ])}
    ${liste([
      "<strong>insémination artificielle</strong> : on dépose le sperme dans l’utérus au moment de l’ovulation ;",
      "<strong>fécondation in vitro</strong> (FIV) : on stimule les ovaires, on prélève des ovocytes, on les féconde en laboratoire et on replace un ou deux embryons dans l’utérus ;",
      "<strong>grossesse extra-utérine</strong> : l’embryon s’implante dans la trompe ; c’est une urgence chirurgicale.",
    ])}
    ${exercice(
      "Une femme a des cycles réguliers et ovule normalement, mais ne parvient pas à avoir d’enfant. Un examen montre que ses deux trompes sont bouchées. Pourquoi est-elle stérile et quelle technique peut l’aider ?",
      [
        "La fécondation se fait dans la trompe : si elle est bouchée, spermatozoïdes et ovocyte ne peuvent pas se rencontrer.",
        "La femme est donc stérile malgré une ovulation normale.",
        "La <strong>fécondation in vitro</strong> contourne l’obstacle : la fécondation a lieu au laboratoire et l’embryon est placé directement dans l’utérus.",
      ],
    )}`,
};

export const REGULATION_REPRODUCTION: LessonSpec = {
  title: "Régulation hormonale des appareils reproducteurs",
  minutes: 40,
  body: `${objectifs([
      "décrire les fonctions exocrine et endocrine du testicule et de l’ovaire ;",
      "décrire les cycles sexuels de la femme ;",
      "expliquer le contrôle par le complexe hypothalamo-hypophysaire et les rétrocontrôles.",
    ])}
    <h2>1. Les fonctions du testicule</h2>
    ${tableau([
      ["Expérience", "Résultat", "Conclusion"],
      ["castration (ablation des testicules) d’un jeune animal", "pas de spermatozoïdes, caractères sexuels secondaires absents, comportement sexuel absent", "le testicule produit les gamètes (fonction <strong>exocrine</strong>) et contrôle les caractères sexuels"],
      ["injection de testostérone à l’animal castré", "les caractères sexuels réapparaissent, pas les spermatozoïdes", "le testicule agit par une hormone, la <strong>testostérone</strong> (fonction <strong>endocrine</strong>)"],
    ])}
    <p>La testostérone, produite par les cellules de Leydig, assure le développement des organes génitaux, les caractères sexuels secondaires (voix grave, pilosité, musculature) et est nécessaire à la spermatogenèse.</p>
    <h2>2. Les fonctions de l’ovaire et les cycles de la femme</h2>
    <p>L’ovaire libère un ovocyte par cycle (fonction exocrine) et sécrète des <strong>œstrogènes</strong> et de la <strong>progestérone</strong> (fonction endocrine). Ces hormones agissent sur l’utérus. Un cycle dure en moyenne 28 jours ; le jour 1 est le premier jour des règles.</p>
    ${tableau([
      ["Phase", "Cycle ovarien", "Hormones ovariennes", "Cycle de l’utérus"],
      ["folliculaire (J1 à J14)", "croissance de plusieurs follicules ; un seul devient mûr", "<strong>œstrogènes</strong> en hausse", "règles (J1 à J4), puis la muqueuse s’épaissit"],
      ["ovulation (≈ J14)", "le follicule mûr libère l’ovocyte II", "pic d’œstrogènes juste avant", "—"],
      ["lutéale (J14 à J28)", "le follicule vide devient le <strong>corps jaune</strong>", "<strong>progestérone</strong> et œstrogènes", "la muqueuse se creuse de glandes (« dentelle utérine »), prête à accueillir un embryon"],
    ])}
    <p>Sans fécondation, le corps jaune dégénère vers J28 : la chute des hormones provoque la destruction de la muqueuse : ce sont les <strong>règles</strong>, et un nouveau cycle commence. La température du corps monte d’environ 0,5 °C après l’ovulation (effet de la progestérone).</p>
    <h2>3. Le contrôle hypothalamo-hypophysaire</h2>
    ${methode([
      "L’<strong>hypothalamus</strong> sécrète la <strong>GnRH</strong> de façon pulsatile.",
      "La GnRH stimule l’<strong>antéhypophyse</strong>, qui sécrète deux gonadostimulines : <strong>FSH</strong> et <strong>LH</strong>.",
      "Chez l’homme : la FSH stimule la spermatogenèse (via les cellules de Sertoli), la LH stimule la sécrétion de testostérone par les cellules de Leydig.",
      "Chez la femme : la FSH stimule la croissance des follicules ; le <strong>pic de LH</strong> déclenche l’ovulation et la formation du corps jaune.",
    ], "La commande")}
    <p>L’ablation de l’hypophyse (hypophysectomie) entraîne l’arrêt du fonctionnement des gonades ; des injections de FSH et LH le rétablissent.</p>
    <h2>4. Les rétrocontrôles</h2>
    ${liste([
      "chez l’homme, la testostérone exerce un <strong>rétrocontrôle négatif</strong> sur l’hypothalamus et l’hypophyse : si son taux augmente, la sécrétion de GnRH et de LH diminue. Le taux de testostérone reste ainsi à peu près constant ;",
      "chez la femme, des taux faibles ou moyens d’œstrogènes exercent un rétrocontrôle négatif ; mais un taux <strong>élevé</strong> d’œstrogènes en fin de phase folliculaire exerce un <strong>rétrocontrôle positif</strong> : il déclenche le pic de LH, donc l’ovulation ;",
      "en phase lutéale, progestérone et œstrogènes exercent un rétrocontrôle négatif : pas de nouvelle ovulation.",
    ])}
    <h2>5. Influence du système nerveux</h2>
    <p>L’hypothalamus est sensible aux émotions et au milieu : un stress, un voyage, une maladie ou une forte perte de poids peuvent retarder ou supprimer les règles. Chez certains animaux (lapine, chatte), c’est l’accouplement qui déclenche l’ovulation par voie nerveuse.</p>
    ${exercice(
      "Chez un rat, on injecte de fortes doses de testostérone pendant plusieurs semaines. Les testicules s’atrophient et la production de spermatozoïdes diminue. Explique ce paradoxe.",
      [
        "La testostérone injectée exerce un rétrocontrôle négatif sur l’hypothalamus et l’hypophyse.",
        "La sécrétion de GnRH, puis de FSH et de LH, diminue fortement.",
        "Privés de FSH et de LH, les testicules ne sont plus stimulés : ils s’atrophient et la spermatogenèse diminue.",
      ],
    )}
    ${retenir("Hypothalamus (GnRH) → hypophyse (FSH, LH) → gonades (gamètes et hormones) → rétrocontrôle sur l’hypothalamus et l’hypophyse. Rétrocontrôle négatif, sauf le pic d’œstrogènes avant l’ovulation (positif).")}
    ${auBac("Construis un <strong>schéma fonctionnel</strong> : cadres « hypothalamus », « hypophyse », « ovaire », « utérus », flèches de stimulation (+) et de rétrocontrôle (−).")}`,
};

export const GESTATION: LessonSpec = {
  title: "Gestation et accouchement",
  minutes: 30,
  body: `${objectifs([
      "décrire la nidation et le maintien de la grossesse ;",
      "décrire la structure et les rôles du placenta ;",
      "expliquer le déclenchement de l’accouchement.",
    ])}
    <h2>1. Nidation et maintien du corps jaune</h2>
    <p>Vers le 7<sup>e</sup> jour, l’embryon s’implante dans la muqueuse utérine préparée par la progestérone. Ses cellules externes sécrètent l’hormone <strong>hCG</strong>, qui maintient le corps jaune : celui-ci continue à produire progestérone et œstrogènes, la muqueuse est conservée et il n’y a <strong>pas de règles</strong>. Les tests de grossesse détectent la hCG dans l’urine.</p>
    <h2>2. Le placenta</h2>
    <p>Le placenta se forme à partir de tissus de l’embryon et de la muqueuse utérine. Le sang de la mère et celui du fœtus circulent très près l’un de l’autre, <strong>sans se mélanger</strong> ; le fœtus est relié au placenta par le cordon ombilical.</p>
    ${tableau([
      ["Rôle", "Détails"],
      ["échanges", "vers le fœtus : dioxygène, eau, glucose, acides aminés, sels minéraux, anticorps de la mère ; vers la mère : CO₂, urée et autres déchets"],
      ["endocrine", "à partir du 3<sup>e</sup> mois, le placenta produit lui-même la progestérone et les œstrogènes qui maintiennent la grossesse"],
      ["barrière (incomplète)", "il arrête la plupart des microbes, mais laisse passer l’<strong>alcool</strong>, la nicotine, certains médicaments et des microbes (VIH, rubéole, toxoplasmose)"],
    ])}
    <h2>3. Le développement</h2>
    <p>On parle d’<strong>embryon</strong> pendant les deux premiers mois, quand les organes se mettent en place ; c’est la période la plus sensible aux toxiques. Ensuite, le <strong>fœtus</strong> grandit et ses organes mûrissent. La grossesse dure environ 9 mois (≈ 38 semaines après la fécondation).</p>
    <h2>4. L’accouchement (parturition)</h2>
    ${methode([
      "En fin de grossesse, le taux de progestérone baisse ; l’utérus devient sensible à l’<strong>ocytocine</strong>, libérée par la posthypophyse, et aux prostaglandines.",
      "<strong>Dilatation</strong> du col de l’utérus sous l’effet de contractions de plus en plus fortes et rapprochées ; la poche des eaux se rompt.",
      "<strong>Expulsion</strong> de l’enfant.",
      "<strong>Délivrance</strong> : expulsion du placenta.",
    ], "Étapes")}
    <p>Les contractions et l’ocytocine se renforcent mutuellement : la pression de la tête du fœtus sur le col stimule la libération d’ocytocine, qui intensifie les contractions (rétrocontrôle positif).</p>
    ${retenir("Les consultations prénatales (au moins quatre), une alimentation riche en fer et en acide folique, l’absence d’alcool et de tabac et l’accouchement dans une structure de santé protègent la mère et l’enfant.")}
    ${exercice(
      "Chez une femme enceinte, on enlève les ovaires au 4<sup>e</sup> mois de grossesse pour une raison médicale : la grossesse continue. La même opération faite au 1<sup>er</sup> mois provoque un avortement. Explique.",
      [
        "Au 1<sup>er</sup> mois, la progestérone indispensable au maintien de la muqueuse vient du corps jaune de l’ovaire : l’ablation provoque sa chute et l’avortement.",
        "À partir du 3<sup>e</sup> mois, le <strong>placenta</strong> produit lui-même la progestérone et les œstrogènes.",
        "Au 4<sup>e</sup> mois, les ovaires ne sont donc plus indispensables : la grossesse continue.",
      ],
    )}`,
};

export const LACTATION: LessonSpec = {
  title: "La lactation",
  minutes: 25,
  body: `${objectifs([
      "décrire la préparation des glandes mammaires pendant la grossesse ;",
      "expliquer la sécrétion et l’éjection du lait par un réflexe neuro-hormonal ;",
      "connaître les avantages de l’allaitement maternel.",
    ])}
    <h2>1. Préparation pendant la grossesse</h2>
    <p>Les <strong>œstrogènes</strong> développent les canaux galactophores et la <strong>progestérone</strong> les acini (petits sacs qui produisent le lait). Pendant la grossesse, la prolactine est présente mais son action est freinée par les taux élevés de progestérone et d’œstrogènes.</p>
    <h2>2. Déclenchement et entretien de la lactation</h2>
    <p>Après l’accouchement, l’expulsion du placenta fait chuter les hormones placentaires : la <strong>prolactine</strong> (antéhypophyse) peut agir et déclenche la sécrétion du lait.</p>
    ${methode([
      "La <strong>succion</strong> du mamelon par le bébé stimule des récepteurs sensibles.",
      "Un message nerveux remonte jusqu’à l’<strong>hypothalamus</strong>.",
      "L’antéhypophyse libère de la <strong>prolactine</strong> : sécrétion du lait pour la tétée suivante.",
      "La posthypophyse libère de l’<strong>ocytocine</strong> : les cellules autour des acini se contractent et éjectent le lait.",
    ], "Le réflexe neuro-hormonal de la tétée")}
    <p>Plus le bébé tète, plus il y a de lait : la lactation s’arrête quelques jours après la fin des tétées.</p>
    <h2>3. Le lait maternel</h2>
    ${liste([
      "le <strong>colostrum</strong> des premiers jours, jaunâtre, est très riche en <strong>anticorps</strong> : il protège le nouveau-né contre les infections (immunité passive) ;",
      "le lait contient eau, lactose, graisses, protéines, sels minéraux et vitamines en quantités adaptées, à bonne température et sans microbes ;",
      "l’allaitement renforce le lien mère-enfant et, s’il est exclusif, espace un peu les naissances (la prolactine freine l’ovulation), sans être une méthode contraceptive sûre ;",
      "l’OMS recommande l’<strong>allaitement exclusif</strong> jusqu’à 6 mois, puis poursuivi avec d’autres aliments jusqu’à 2 ans.",
    ])}
    ${exercice(
      "Chez une chèvre en lactation, on sectionne les nerfs sensitifs des mamelles : la production de lait diminue fortement, mais l’injection d’ocytocine provoque toujours l’éjection du lait. Interprète.",
      [
        "Sans nerfs sensitifs, la succion ne déclenche plus le message nerveux vers l’hypothalamus.",
        "La prolactine et l’ocytocine ne sont plus libérées : la production et l’éjection diminuent. Le réflexe a une partie nerveuse.",
        "L’ocytocine injectée agit directement sur la glande : sa partie efférente est <strong>hormonale</strong>. C’est un réflexe neuro-hormonal.",
      ],
    )}
    ${retenir("Prolactine = production du lait ; ocytocine = éjection du lait. La tétée entretient la lactation par un réflexe neuro-hormonal.")}`,
};

export const CONTRACEPTION: LessonSpec = {
  title: "Quelques méthodes contraceptives",
  minutes: 30,
  body: `${objectifs([
      "distinguer contraception et contragestion ;",
      "expliquer le mode d’action des principales méthodes ;",
      "connaître la seule méthode qui protège aussi des infections sexuellement transmissibles.",
    ])}
    ${definition("contraception", "ensemble des méthodes qui empêchent la fécondation ou la nidation, de façon réversible, pour choisir le moment d’avoir un enfant et espacer les naissances (planification familiale).")}
    <h2>1. Les méthodes hormonales</h2>
    ${tableau([
      ["Méthode", "Mode d’action"],
      ["pilule œstroprogestative (à prendre chaque jour)", "les hormones de synthèse exercent un <strong>rétrocontrôle négatif</strong> sur l’hypothalamus et l’hypophyse : pas de pic de LH, donc <strong>pas d’ovulation</strong> ; la glaire du col devient épaisse"],
      ["pilule progestative, implant sous la peau (3 à 5 ans), injection (tous les 3 mois)", "progestatif : glaire infranchissable, muqueuse impropre à la nidation, souvent blocage de l’ovulation"],
    ])}
    <h2>2. Les méthodes mécaniques et chimiques</h2>
    ${tableau([
      ["Méthode", "Mode d’action"],
      ["<strong>préservatif</strong> masculin ou féminin", "barrière qui empêche les spermatozoïdes d’atteindre l’utérus"],
      ["dispositif intra-utérin (DIU, stérilet)", "empêche la nidation et gêne les spermatozoïdes ; dure plusieurs années"],
      ["spermicides", "détruisent les spermatozoïdes ; peu efficaces seuls"],
    ])}
    <h2>3. Les méthodes naturelles</h2>
    <p>Elles reposent sur l’abstinence pendant la période fertile autour de l’ovulation, repérée par le calendrier (méthode Ogino), la courbe de température ou l’aspect de la glaire. Elles sont <strong>peu fiables</strong>, surtout si les cycles sont irréguliers. Le retrait l’est encore moins.</p>
    <h2>4. Méthodes définitives et contragestion</h2>
    ${liste([
      "la ligature des trompes ou la vasectomie sont des méthodes chirurgicales, en principe définitives ;",
      "la <strong>contraception d’urgence</strong> (« pilule du lendemain ») se prend le plus tôt possible après un rapport non protégé (dans les 72 heures) : elle retarde l’ovulation ; ce n’est pas une méthode régulière.",
    ])}
    ${retenir("Le <strong>préservatif</strong> est la seule méthode qui protège à la fois de la grossesse et des infections sexuellement transmissibles (VIH, hépatite B, syphilis…). Le choix d’une méthode se fait avec une sage-femme ou un médecin.")}
    ${exercice(
      "Explique, à l’aide de tes connaissances sur la régulation du cycle, pourquoi une femme qui prend correctement une pilule œstroprogestative n’ovule pas.",
      [
        "La pilule apporte chaque jour des œstrogènes et un progestatif de synthèse à doses suffisantes.",
        "Ces hormones exercent un rétrocontrôle négatif permanent sur l’hypothalamus et l’hypophyse : la GnRH, la FSH et la LH restent basses.",
        "Sans FSH, aucun follicule ne mûrit ; sans pic de LH, il n’y a pas d’ovulation.",
      ],
    )}`,
};

export const REPRODUCTION_SPERMAPHYTES: LessonSpec = {
  title: "Reproduction des plantes à fleurs",
  minutes: 40,
  body: `${objectifs([
      "décrire la fleur, le grain de pollen et l’ovule ;",
      "expliquer la pollinisation et la double fécondation ;",
      "décrire la formation de la graine et du fruit, la germination et le cycle de développement.",
    ])}
    <h2>1. La fleur</h2>
    ${tableau([
      ["Pièce florale", "Rôle"],
      ["calice (sépales) et corolle (pétales)", "protection ; les pétales colorés attirent les insectes"],
      ["<strong>androcée</strong> : étamines (filet + anthère)", "organe mâle : les anthères produisent le <strong>pollen</strong>"],
      ["<strong>gynécée</strong> ou pistil : stigmate, style, ovaire", "organe femelle : l’ovaire contient les <strong>ovules</strong>"],
    ])}
    <p>Le <strong>grain de pollen</strong> mûr contient une cellule végétative et une cellule reproductrice qui donnera <strong>deux gamètes mâles</strong> (anthérozoïdes). L’ovule contient le <strong>sac embryonnaire</strong>, à 8 noyaux : l’<strong>oosphère</strong> (gamète femelle), deux synergides, trois antipodes et deux noyaux polaires, qui fusionnent en un <strong>noyau secondaire</strong> diploïde.</p>
    <h2>2. La pollinisation</h2>
    ${definition("pollinisation", "transport du pollen de l’anthère jusqu’au stigmate.")}
    ${liste([
      "<strong>autopollinisation</strong> (autogamie) : le pollen tombe sur le stigmate de la même fleur (arachide, haricot) ;",
      "<strong>pollinisation croisée</strong> (allogamie) : le pollen vient d’une autre plante, transporté par le <strong>vent</strong> (mil, maïs : pollen léger et abondant) ou par les <strong>insectes</strong> (manguier, bissap : fleurs colorées, parfumées, avec nectar) ; elle augmente la diversité génétique.",
    ])}
    <h2>3. La double fécondation</h2>
    ${methode([
      "Sur le stigmate, le grain de pollen germe : il émet un <strong>tube pollinique</strong> qui s’allonge dans le style et conduit les deux gamètes mâles jusqu’à l’ovule.",
      "Un gamète mâle (n) s’unit à l’<strong>oosphère</strong> (n) : il se forme un <strong>zygote</strong> (2n), qui deviendra l’<strong>embryon</strong>.",
      "L’autre gamète mâle (n) s’unit au <strong>noyau secondaire</strong> (2n) : il se forme un noyau triploïde (3n), qui donnera l’<strong>albumen</strong>, tissu de réserve.",
    ], "Étapes")}
    ${retenir("La <strong>double fécondation</strong> est propre aux plantes à fleurs (angiospermes) : deux fécondations dans le même ovule, l’une donne l’embryon, l’autre l’albumen.")}
    <h2>4. Graine et fruit</h2>
    ${tableau([
      ["Avant fécondation", "Après fécondation"],
      ["ovule", "<strong>graine</strong> : embryon (radicule, tigelle, gemmule, cotylédons), réserves (albumen ou cotylédons), téguments"],
      ["ovaire", "<strong>fruit</strong>, qui protège et aide à disperser les graines"],
      ["pétales, étamines, style", "se fanent et tombent"],
    ])}
    <p>Les graines sont dispersées par le vent, les animaux ou l’eau. Dans de bonnes conditions (eau, dioxygène, température convenable), la graine <strong>germe</strong> : l’embryon reprend sa croissance en utilisant ses réserves, puis la plantule devient autonome grâce à la photosynthèse.</p>
    <h2>5. Le cycle de développement</h2>
    <p>La plante feuillée est diploïde (2n) : c’est le <strong>sporophyte</strong>. La méiose a lieu dans les anthères et les ovules ; le grain de pollen et le sac embryonnaire sont des structures haploïdes très réduites (gamétophytes). La fécondation rétablit la diploïdie. On a donc une alternance de phases haploïde et diploïde, avec une phase diploïde dominante.</p>
    <h2>6. La reproduction asexuée</h2>
    <p>Beaucoup de plantes se reproduisent aussi sans fécondation : <strong>bouturage</strong> (manioc), <strong>marcottage</strong>, <strong>greffage</strong> (manguiers greffés), tubercules, rejets (bananier). Les plantes obtenues sont identiques à la plante mère (clones).</p>
    ${exercice(
      "Dans un ovule de maïs, les cellules de l’embryon ont 20 chromosomes. Combien de chromosomes ont l’oosphère, le noyau secondaire et les cellules de l’albumen ?",
      [
        "L’embryon est diploïde : 2n = 20, donc n = 10.",
        "L’oosphère est haploïde : <strong>10</strong> chromosomes ; le noyau secondaire, issu de deux noyaux polaires, est diploïde : <strong>20</strong> chromosomes.",
        "L’albumen vient de la fusion du noyau secondaire (2n) avec un gamète mâle (n) : 3n = <strong>30</strong> chromosomes.",
      ],
    )}`,
};

// ── Génétique ───────────────────────────────────────────────────────────────

export const LOIS_MENDEL: LessonSpec = {
  title: "Lois statistiques de la transmission des caractères",
  minutes: 50,
  body: `${objectifs([
      "maîtriser le vocabulaire et les notations de la génétique ;",
      "interpréter un monohybridisme : dominance, codominance, gène létal, hérédité liée au sexe ;",
      "interpréter un dihybridisme : gènes indépendants ou liés ; calculer une distance et établir une carte factorielle.",
    ])}
    <h2>1. Vocabulaire</h2>
    ${tableau([
      ["Mot", "Définition"],
      ["gène", "portion d’ADN qui détermine un caractère héréditaire ; il occupe un <strong>locus</strong> sur un chromosome"],
      ["allèles", "versions différentes d’un même gène"],
      ["homozygote / hétérozygote", "deux allèles identiques / différents pour un gène"],
      ["dominant / récessif", "l’allèle dominant s’exprime chez l’hétérozygote ; le récessif ne s’exprime qu’à l’état homozygote"],
      ["codominance", "les deux allèles s’expriment chez l’hétérozygote"],
      ["lignée (race) pure", "individus homozygotes qui donnent toujours des descendants identiques à eux"],
      ["phénotype [ ] / génotype ( )", "caractère observable / combinaison d’allèles, écrite par exemple (L//r)"],
    ])}
    <h2>2. Monohybridisme : un seul caractère</h2>
    <p><strong>Dominance complète.</strong> On croise deux lignées pures de pois : graines lisses × graines ridées. Toute la F1 est lisse : l’allèle L (lisse) domine r (ridé).</p>
    ${tableau([
      ["Gamètes F1 (L//r)", "L (1/2)", "r (1/2)"],
      ["L (1/2)", "L//L [L] 1/4", "L//r [L] 1/4"],
      ["r (1/2)", "L//r [L] 1/4", "r//r [r] 1/4"],
    ])}
    <p>F2 : <strong>3/4 [lisse], 1/4 [ridé]</strong>.</p>
    ${liste([
      "1<sup>re</sup> loi de Mendel (uniformité des hybrides de 1<sup>re</sup> génération) : la F1 issue de deux lignées pures est homogène ;",
      "2<sup>e</sup> loi (pureté des gamètes) : chaque gamète ne reçoit qu’<strong>un seul</strong> allèle de chaque gène ;",
      "<strong>test-cross</strong> (croisement-test) : on croise l’individu à tester avec un homozygote récessif. 100 % [dominant] : il était homozygote ; 1/2 - 1/2 : il était hétérozygote ;",
      "<strong>backcross</strong> : croisement d’un hybride avec l’un de ses parents.",
    ])}
    <p><strong>Codominance.</strong> Belle-de-nuit rouge × blanche : F1 entièrement rose ; F2 : 1/4 rouge, 1/2 rose, 1/4 blanc.</p>
    <p><strong>Gène létal.</strong> Souris jaunes × souris jaunes : 2/3 jaunes, 1/3 grises. Les homozygotes jaunes meurent avant la naissance : l’allèle « jaune » est dominant pour la couleur mais récessif létal.</p>
    <p><strong>Hérédité liée au sexe.</strong> Chez la drosophile, le gène de la couleur des yeux est sur le chromosome X. Les croisements réciproques donnent des résultats différents : femelle [yeux rouges] × mâle [yeux blancs] → F1 toute [rouge] ; femelle [blancs] × mâle [rouges] → femelles [rouges], mâles [blancs]. Un résultat qui dépend du sexe signale un gène porté par un <strong>gonosome</strong>.</p>
    <h2>3. Dihybridisme : deux caractères</h2>
    <p><strong>Gènes indépendants</strong> (sur deux paires de chromosomes différentes) : la F1 double hétérozygote produit 4 types de gamètes en proportions égales (brassage interchromosomique).</p>
    ${liste([
      "F1 × F1 : F2 en proportions <strong>9/16, 3/16, 3/16, 1/16</strong> ;",
      "test-cross : 4 phénotypes à <strong>25 % chacun</strong>.",
    ])}
    <p><strong>Gènes liés</strong> (sur le même chromosome) : au test-cross,</p>
    ${liste([
      "<strong>liaison totale</strong> : seulement les deux phénotypes parentaux, à 50 % chacun ;",
      "<strong>liaison partielle</strong> : deux phénotypes parentaux majoritaires et deux phénotypes <strong>recombinés</strong> minoritaires, en proportions égales deux à deux. Les recombinés viennent du <strong>crossing-over</strong> en prophase I.",
    ])}
    ${formula("distance entre deux gènes (en cM) = (nombre de recombinés ÷ total) × 100")}
    <p>1 centimorgan (cM) correspond à 1 % de recombinés. Avec trois gènes liés, les trois distances permettent de placer les gènes dans l’ordre sur le chromosome : c’est la <strong>carte factorielle</strong> (la plus grande distance est entre les deux gènes extrêmes).</p>
    ${methode([
      "Repérer les lignées pures et en déduire la dominance à partir de la F1.",
      "Pour chaque caractère, vérifier les proportions (3/4 - 1/4, 1/2 - 1/2…) et l’éventuel lien avec le sexe.",
      "Avec deux caractères, regarder le test-cross : 4 × 25 % = indépendants ; 2 phénotypes majoritaires = liés.",
      "Écrire les génotypes, les gamètes avec leurs proportions et l’échiquier de croisement.",
      "Comparer les résultats théoriques aux résultats observés et conclure.",
    ], "Résoudre un exercice de génétique")}
    ${exercice(
      "On croise des drosophiles femelles F1 [corps gris, ailes longues], issues de lignées pures, avec des mâles [corps noir, ailes vestigiales]. On obtient : 1 394 [gris, longues], 1 418 [noir, vestigiales], 287 [gris, vestigiales], 288 [noir, longues]. Interprète.",
      [
        "La F1 issue de lignées pures est [gris, longues] : gris (G) domine noir (n), long (L) domine vestigial (v). Le croisement avec le double récessif est un <strong>test-cross</strong>.",
        "On n’obtient pas 4 × 25 % : deux phénotypes parentaux sont majoritaires (≈ 83 %), deux recombinés minoritaires (≈ 17 %). Les deux gènes sont <strong>liés</strong> sur le même chromosome, avec crossing-over.",
        "Total = 3 387 ; recombinés = 287 + 288 = 575 ; 575 ÷ 3 387 × 100 ≈ <strong>17 %</strong>.",
        "Les deux gènes sont à <strong>17 cM</strong> l’un de l’autre. Génotype de la F1 : (G L // n v).",
      ],
    )}
    ${erreurs([
      "confondre phénotype (entre crochets) et génotype (entre parenthèses, avec //) ;",
      "conclure à des gènes liés sans avoir fait un test-cross ou une analyse de F2 ;",
      "oublier de vérifier si le caractère dépend du sexe des descendants.",
    ])}
    ${auBac("Rédige toujours dans l’ordre : analyse des résultats → hypothèse → vérification par l’échiquier → conclusion. Les points sont donnés pour le raisonnement autant que pour le résultat.")}`,
};

// ── Hérédité humaine : une version par série ────────────────────────────────

const HEREDITE_METHODES = `<h2>1. Les méthodes d’étude</h2>
    <p>L’étude de l’hérédité humaine est difficile : pas de croisements expérimentaux, peu d’enfants par couple, des générations longues (25 à 30 ans). On utilise donc :</p>
    ${liste([
      "l’<strong>arbre généalogique</strong> (pedigree) : carré = homme, rond = femme, symbole plein = atteint, trait horizontal = union, chiffres romains pour les générations ;",
      "l’étude des jumeaux, des populations, du caryotype et de l’ADN.",
    ])}
    ${methode([
      "Le caractère est-il <strong>dominant ou récessif</strong> ? Si deux parents sains ont un enfant atteint, l’allèle responsable est <strong>récessif</strong> (les parents sont porteurs sains).",
      "Le gène est-il porté par un <strong>autosome ou par X</strong> ? Teste l’hypothèse « lié à X » : si elle conduit à une contradiction (par exemple une fille atteinte d’un père sain pour un allèle récessif), le gène est autosomal.",
      "Écris les génotypes de chaque individu possible et calcule les risques demandés.",
    ], "Analyser un arbre généalogique")}`;

const HEREDITE_ALBINISME = `<h2>2. Hérédité autosomale : l’albinisme</h2>
    <p>L’<strong>albinisme</strong> est une absence de pigment (mélanine) dans la peau, les poils et les yeux. Il est dû à un allèle <strong>récessif</strong> (a) d’un gène porté par un <strong>autosome</strong>.</p>
    ${liste([
      "deux parents à la peau pigmentée peuvent avoir un enfant albinos : ils sont tous deux hétérozygotes (A//a) ;",
      "pour un couple A//a × A//a, le risque d’avoir un enfant albinos est de <strong>1/4</strong> à chaque naissance, quel que soit le sexe ;",
      "les personnes albinos doivent protéger leur peau et leurs yeux du soleil ; elles ne doivent subir aucune discrimination.",
    ])}
    <p>La <strong>drépanocytose</strong>, fréquente au Sénégal, se transmet de la même façon (allèle S récessif) : deux parents porteurs sains AS ont 1 risque sur 4 d’avoir un enfant SS malade. Le test d’électrophorèse de l’hémoglobine avant le mariage permet de connaître son statut.</p>`;

const HEREDITE_GROUPES = `<h2>3. Les groupes sanguins</h2>
    <p><strong>Système ABO.</strong> Un gène autosomal possède trois allèles : A et B, <strong>codominants</strong>, et O, <strong>récessif</strong>.</p>
    ${tableau([
      ["Groupe (phénotype)", "Génotypes possibles", "Marqueurs sur les hématies", "Anticorps dans le plasma"],
      ["[A]", "A//A ou A//O", "A", "anti-B"],
      ["[B]", "B//B ou B//O", "B", "anti-A"],
      ["[AB]", "A//B", "A et B", "aucun"],
      ["[O]", "O//O", "aucun", "anti-A et anti-B"],
    ])}
    <p>Pour une <strong>transfusion</strong>, les hématies du donneur ne doivent pas porter de marqueur reconnu par les anticorps du receveur : le groupe O peut donner à tous (« donneur universel »), le groupe AB peut recevoir de tous (« receveur universel ») ; en pratique, on transfuse dans le même groupe.</p>
    <p><strong>Système rhésus.</strong> L’allèle Rh+ (présence du marqueur D) <strong>domine</strong> Rh−. Une mère Rh− qui porte un enfant Rh+ (père Rh+) peut fabriquer des anticorps anti-D lors du premier accouchement ; à la grossesse suivante, ils traversent le placenta et détruisent les hématies d’un fœtus Rh+ (<strong>maladie hémolytique du nouveau-né</strong>). Prévention : injection d’anticorps anti-D à la mère dans les 72 heures après chaque accouchement d’un enfant Rh+.</p>`;

const HEREDITE_SEXE = `<h2>Hérédité liée au sexe</h2>
    <p>Certains gènes sont portés par le chromosome <strong>X</strong>, sans équivalent sur Y. Un homme (XY) n’a qu’un allèle : s’il porte l’allèle récessif, il est atteint. Une femme (XX) hétérozygote est <strong>conductrice</strong> (porteuse saine) : elle transmet l’allèle à la moitié de ses enfants.</p>
    ${tableau([
      ["Maladie", "Effet", "Transmission"],
      ["<strong>hémophilie</strong>", "le sang coagule mal (manque d’un facteur de coagulation) : hémorragies", "allèle récessif porté par X ; presque uniquement des garçons atteints"],
      ["<strong>daltonisme</strong>", "confusion du rouge et du vert", "allèle récessif porté par X ; environ 8 % des hommes, moins de 1 % des femmes"],
    ])}
    ${liste([
      "un fils reçoit son X de sa <strong>mère</strong> : un père atteint ne transmet jamais la maladie à ses fils, mais toutes ses filles sont conductrices ;",
      "une fille n’est atteinte que si son père est atteint et sa mère au moins conductrice ;",
      "certains allèles sont <strong>létaux</strong> : ils provoquent la mort de l’embryon, ce qui modifie les proportions observées.",
    ])}
    <p>Les <strong>mariages consanguins</strong> (entre cousins) augmentent le risque que deux allèles récessifs rares, venus d’un ancêtre commun, se retrouvent chez un enfant : les maladies récessives y sont plus fréquentes.</p>`;

const HEREDITE_ANOMALIES = `<h2>Les anomalies chromosomiques</h2>
    <p>Le <strong>caryotype</strong> est la photographie des chromosomes d’une cellule, classés par paires : 22 paires d’autosomes et une paire de chromosomes sexuels (XX ou XY).</p>
    ${tableau([
      ["Anomalie", "Caryotype", "Conséquences"],
      ["<strong>trisomie 21</strong> (syndrome de Down)", "47 chromosomes, trois chromosomes 21", "déficience intellectuelle, traits du visage caractéristiques, parfois malformations du cœur"],
      ["<strong>syndrome de Turner</strong>", "45, X (un seul X)", "femme de petite taille, stérile"],
      ["<strong>syndrome de Klinefelter</strong>", "47, XXY", "homme grand, stérile"],
    ])}
    <p>Cause : une <strong>non-disjonction</strong> pendant la méiose (deux chromosomes homologues ou deux chromatides ne se séparent pas) donne un gamète avec un chromosome en trop ou en moins. Le risque de trisomie 21 augmente avec l’âge de la mère. Un <strong>diagnostic prénatal</strong> (caryotype du fœtus) est possible.</p>
    <h2>Génétique et bioéthique</h2>
    ${liste([
      "applications : dépistage des porteurs, diagnostic prénatal, <strong>conseil génétique</strong> aux couples à risque, recherche de thérapies géniques ;",
      "la <strong>bioéthique</strong> réfléchit aux limites : respect de la dignité de la personne, consentement, confidentialité des données génétiques, refus de toute discrimination génétique, interdiction du clonage reproductif humain ;",
      "la <strong>Déclaration universelle de l’UNESCO sur le génome humain et les droits de l’homme</strong> (1997) fait du génome humain un patrimoine de l’humanité à protéger.",
    ])}`;

const heredite = (sections: string[], exerciceHtml: string, minutes: number): LessonSpec => ({
  title: "L’hérédité chez l’espèce humaine",
  minutes,
  body: sections.join("\n") + exerciceHtml,
});

const EXERCICE_ALBINISME = exercice(
  "Dans une famille, deux parents à la peau normalement pigmentée (I-1 et I-2) ont trois enfants : une fille albinos (II-1), un garçon normal (II-2) et une fille normale (II-3). Quel est le mode de transmission de l’albinisme ? Quelle est la probabilité que leur prochain enfant soit albinos ?",
  [
    "Deux parents sains ont un enfant atteint : l’allèle de l’albinisme (a) est <strong>récessif</strong> ; les parents le portent sans l’exprimer.",
    "Si le gène était porté par X, la fille albinos (X<sup>a</sup>X<sup>a</sup>) aurait reçu un X<sup>a</sup> de son père, qui serait alors albinos (X<sup>a</sup>Y). Or il est sain : le gène est <strong>autosomal</strong>, et les deux parents sont hétérozygotes (A//a).",
    "A//a × A//a : 1/4 A//A, 1/2 A//a, 1/4 a//a. Le risque est de <strong>1/4</strong> à chaque naissance, quel que soit le sexe.",
  ],
);

const EXERCICE_HEMOPHILIE = exercice(
  "Une femme dont le père est hémophile épouse un homme sain. Quels sont les risques pour leurs enfants ?",
  [
    "L’hémophilie est due à un allèle récessif h porté par X. Le père de la femme, hémophile, est X<sup>h</sup>Y : il lui a donné son X<sup>h</sup>. La femme, saine, est donc <strong>conductrice</strong> : X<sup>H</sup>X<sup>h</sup>.",
    "Le mari sain est X<sup>H</sup>Y. Échiquier : filles X<sup>H</sup>X<sup>H</sup> ou X<sup>H</sup>X<sup>h</sup> ; garçons X<sup>H</sup>Y ou X<sup>h</sup>Y.",
    "Aucune fille ne sera hémophile (1 sur 2 sera conductrice) ; chaque garçon a <strong>1 risque sur 2</strong> d’être hémophile. Pour un enfant de sexe inconnu, le risque est de 1/4.",
  ],
);

const EXERCICE_GROUPES = exercice(
  "Un homme de groupe [A] et une femme de groupe [B] ont un premier enfant de groupe [O]. Quels groupes peuvent avoir leurs autres enfants ?",
  [
    "L’enfant [O] est O//O : il a reçu un allèle O de chaque parent.",
    "Le père [A] est donc A//O et la mère [B] est B//O.",
    "Échiquier : A//B [AB], A//O [A], B//O [B], O//O [O], chacun avec une probabilité de <strong>1/4</strong>. Les quatre groupes sont possibles.",
  ],
);

/** Terminale L2 : hérédité autosomale (albinisme, groupes sanguins ABO, rhésus). */
export const HEREDITE_HUMAINE_L2 = heredite([HEREDITE_METHODES, HEREDITE_ALBINISME, HEREDITE_GROUPES], `${EXERCICE_GROUPES}
    ${retenir("Deux parents sains qui ont un enfant atteint : allèle récessif. Albinisme et drépanocytose : autosomaux récessifs. Groupes ABO : A et B codominants, O récessif. Rh+ domine Rh−.")}`, 35);

/** Terminale S1 : hérédité autosomale (albinisme) et hérédité liée au sexe (hémophilie, daltonisme). */
export const HEREDITE_HUMAINE_S1 = heredite([HEREDITE_METHODES, HEREDITE_ALBINISME, HEREDITE_SEXE.replace("<h2>", "<h2>3. ")], `${EXERCICE_ALBINISME}
    ${EXERCICE_HEMOPHILIE}
    ${retenir("Autosomal récessif : garçons et filles également atteints, souvent nés de parents sains. Récessif lié à X : surtout des garçons, nés de mères conductrices ; jamais de transmission du père au fils.")}
    ${auBac("Pour éliminer l’hypothèse « liée à X récessive », cherche une fille atteinte dont le père est sain, ou un garçon sain dont la mère est atteinte.")}`, 40);

/** Terminale S2 : programme complet, avec anomalies chromosomiques et bioéthique. */
export const HEREDITE_HUMAINE_S2 = heredite(
  [HEREDITE_METHODES, HEREDITE_ALBINISME, HEREDITE_GROUPES, HEREDITE_SEXE.replace("<h2>", "<h2>4. "), HEREDITE_ANOMALIES.replace("<h2>Les", "<h2>5. Les").replace("<h2>Génétique", "<h2>6. Génétique")],
  `${EXERCICE_HEMOPHILIE}
    ${EXERCICE_GROUPES}
    ${retenir("Autosomal récessif (albinisme, drépanocytose), codominance (ABO), dominance (rhésus), récessif lié à X (hémophilie, daltonisme), anomalies chromosomiques par non-disjonction (trisomie 21, Turner, Klinefelter). La génétique humaine doit respecter la dignité de la personne.")}
    ${auBac("Justifie chaque conclusion par un individu précis de l’arbre (« II-3 est atteint alors que ses parents I-1 et I-2 sont sains, donc… »).")}`,
  50,
);

export const BIOTECHNOLOGIES: LessonSpec = {
  title: "Les biotechnologies",
  minutes: 35,
  body: `${objectifs([
      "définir les biotechnologies et citer des exemples traditionnels et modernes ;",
      "décrire les outils et les étapes du génie génétique (transgenèse) ;",
      "connaître quelques applications et les questions éthiques qu’elles posent.",
    ])}
    ${definition("biotechnologies", "ensemble des techniques qui utilisent des êtres vivants (surtout des micro-organismes) ou leurs constituants pour produire des biens ou des services.")}
    <h2>1. Des biotechnologies anciennes</h2>
    <p>Depuis longtemps, on utilise des micro-organismes sans les connaître : levures pour le pain et les boissons fermentées, bactéries lactiques pour le lait caillé (soow) et le fromage, fermentation du poisson (guedj), du néré ou du cacao, compostage. La sélection des plantes et des animaux est aussi une biotechnologie.</p>
    <h2>2. Le génie génétique</h2>
    <p>Il repose sur l’<strong>universalité du code génétique</strong> : un gène humain placé dans une bactérie y est « lu » et produit la même protéine.</p>
    ${tableau([
      ["Outil", "Rôle"],
      ["<strong>enzymes de restriction</strong>", "« ciseaux moléculaires » qui coupent l’ADN à des séquences précises"],
      ["<strong>ligase</strong>", "« colle » qui soude deux fragments d’ADN"],
      ["<strong>vecteur</strong> (plasmide bactérien, virus)", "petite molécule d’ADN qui transporte le gène dans la cellule hôte"],
      ["<strong>PCR</strong> (amplification en chaîne)", "fabrique des millions de copies d’un fragment d’ADN en quelques heures"],
    ])}
    ${methode([
      "Isoler le gène d’intérêt (par exemple celui de l’insuline humaine).",
      "Couper le plasmide avec la même enzyme de restriction et y insérer le gène grâce à la ligase : on obtient un ADN <strong>recombiné</strong>.",
      "Introduire le plasmide dans une bactérie (souvent <em>E. coli</em>) ou une levure : elle devient <strong>transgénique</strong>.",
      "Sélectionner les bactéries qui ont reçu le gène et les cultiver en grande quantité (fermenteurs).",
      "Extraire et purifier la protéine produite.",
    ], "Étapes de la transgenèse")}
    <h2>3. Applications</h2>
    ${tableau([
      ["Domaine", "Exemples"],
      ["médecine", "insuline humaine pour les diabétiques, hormone de croissance, vaccin contre l’hépatite B, facteurs de coagulation pour les hémophiles ; diagnostic des maladies génétiques ; thérapie génique en recherche"],
      ["agriculture", "plantes transgéniques (OGM) résistantes à des insectes ou à des herbicides ; culture <em>in vitro</em> pour multiplier des plants sains (bananier, manioc)"],
      ["justice", "<strong>empreintes génétiques</strong> : identification d’un suspect ou d’une victime, recherche de paternité"],
      ["environnement et industrie", "bactéries qui dégradent les polluants (pétrole), production d’enzymes pour les lessives, de biogaz"],
    ])}
    <p>Le <strong>clonage</strong> produit des individus génétiquement identiques : il est courant chez les plantes (bouturage, culture in vitro) ; chez les animaux, la brebis Dolly (1996) a été le premier mammifère cloné à partir d’une cellule adulte. Le clonage reproductif humain est interdit.</p>
    <h2>4. Questions et risques</h2>
    ${liste([
      "dissémination de gènes dans l’environnement, perte de biodiversité, résistances chez les insectes ;",
      "dépendance des paysans envers des semences brevetées qu’il faut racheter chaque année ;",
      "questions de santé et d’information du consommateur ;",
      "respect de la vie et de la dignité humaine (bioéthique). Les OGM sont encadrés par des lois de biosécurité.",
    ])}
    ${exercice(
      "Avant 1982, l’insuline des diabétiques était extraite du pancréas de porcs et de bœufs. Pourquoi la production par des bactéries transgéniques est-elle un progrès ?",
      [
        "L’insuline animale est légèrement différente de l’insuline humaine : elle pouvait provoquer des réactions immunitaires (allergies).",
        "Une bactérie qui a reçu le gène humain fabrique de l’insuline <strong>identique</strong> à l’insuline humaine, grâce à l’universalité du code génétique.",
        "Les bactéries se multiplient très vite : la production est abondante, régulière et ne dépend plus des abattoirs.",
      ],
    )}
    ${retenir("Génie génétique : enzymes de restriction (couper), ligase (coller), vecteur (transporter), cellule hôte (produire). Applications en médecine, agriculture, justice et environnement ; elles posent des questions de biosécurité et d’éthique.")}`,
};
