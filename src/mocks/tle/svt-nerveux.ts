// SVT de Terminale : relations de l'organisme avec le milieu, activité cardiaque, milieu intérieur
// et glycémie (programmes L2, S1 et S2 de 2015, Office du Bac). Une même leçon sert aux séries dont le
// programme la contient. Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { auBac, definition, erreurs, exercice, formula, type LessonSpec, liste, methode, objectifs, retenir, tableau } from "./blocks";

// ── Système nerveux cérébro-spinal ──────────────────────────────────────────

export const ENCEPHALE: LessonSpec = {
  title: "Organisation de l’encéphale",
  minutes: 25,
  body: `${objectifs([
      "localiser l’encéphale et décrire ses moyens de protection ;",
      "reconnaître les structures externes et internes de l’encéphale de mouton ;",
      "expliquer la dualité structurale (substance grise, substance blanche).",
    ])}
    <p>Le <strong>système nerveux cérébro-spinal</strong> (ou système nerveux central) comprend l’<strong>encéphale</strong>, logé dans la boîte crânienne, et la <strong>moelle épinière</strong>, logée dans la colonne vertébrale. Il reçoit les informations venues des organes des sens et commande les muscles.</p>
    <h2>1. Localisation et protection</h2>
    ${liste([
      "une protection <strong>osseuse</strong> : les os du crâne, soudés chez l’adulte ;",
      "trois <strong>méninges</strong>, de l’extérieur vers l’intérieur : la <strong>dure-mère</strong> (épaisse et résistante), l’<strong>arachnoïde</strong> et la <strong>pie-mère</strong> (fine, collée au tissu nerveux et riche en vaisseaux) ;",
      "le <strong>liquide céphalorachidien</strong> (LCR), entre l’arachnoïde et la pie-mère et dans les cavités de l’encéphale : il amortit les chocs et participe aux échanges.",
    ])}
    <h2>2. Anatomie externe de l’encéphale de mouton</h2>
    ${tableau([
      ["Face", "Structures visibles"],
      ["dorsale (au-dessus)", "deux <strong>hémisphères cérébraux</strong> séparés par la scissure interhémisphérique, avec des circonvolutions et des sillons ; en arrière, le <strong>cervelet</strong> (vermis au milieu, deux lobes latéraux) ; puis le <strong>bulbe rachidien</strong> qui se prolonge par la moelle"],
      ["ventrale (en dessous)", "bulbes et nerfs <strong>olfactifs</strong> ; <strong>chiasma optique</strong> (croisement des nerfs optiques) ; <strong>hypophyse</strong> ; pédoncules cérébraux ; <strong>protubérance annulaire</strong> ; bulbe rachidien ; départ des nerfs crâniens (12 paires)"],
    ])}
    <h2>3. Anatomie interne</h2>
    <p>Une coupe sagittale (dans le plan de symétrie) montre le <strong>corps calleux</strong>, qui relie les deux hémisphères, les <strong>ventricules</strong> (cavités remplies de LCR, reliées entre elles par l’aqueduc de Sylvius), le <strong>thalamus</strong> et l’<strong>hypothalamus</strong> au-dessus de l’hypophyse. Dans le cervelet, la substance blanche dessine un « arbre de vie ».</p>
    ${definition("dualité structurale", "le tissu nerveux est formé de deux substances : la <strong>substance grise</strong>, où se trouvent les corps cellulaires des neurones, et la <strong>substance blanche</strong>, formée de fibres nerveuses entourées de myéline (d’où leur couleur).")}
    ${tableau([
      ["Organe", "Substance grise", "Substance blanche"],
      ["cerveau", "à l’extérieur (<strong>cortex</strong>) et en noyaux gris centraux", "à l’intérieur"],
      ["cervelet", "à l’extérieur (cortex cérébelleux)", "à l’intérieur (arbre de vie)"],
      ["moelle épinière", "au centre (en forme de H)", "à l’extérieur"],
    ])}
    <h2>4. Rôles des parties de l’encéphale</h2>
    ${liste([
      "<strong>cerveau</strong> : sensations conscientes, mouvements volontaires, mémoire, langage, intelligence ;",
      "<strong>cervelet</strong> : équilibre et coordination des mouvements ;",
      "<strong>bulbe rachidien</strong> : centres vitaux de la respiration, du rythme cardiaque et de la pression artérielle ;",
      "<strong>hypothalamus</strong> : faim, soif, température, commande de l’hypophyse.",
    ])}
    ${exercice(
      "Un accidenté de la route présente des troubles de l’équilibre et des gestes mal coordonnés, mais il reste conscient et peut bouger volontairement. Quelle partie de l’encéphale est probablement atteinte ? Justifie.",
      [
        "La conscience et la motricité volontaire sont conservées : le cerveau fonctionne.",
        "Les troubles portent sur l’équilibre et la coordination des mouvements, rôle du cervelet.",
        "Conclusion : c’est le <strong>cervelet</strong> qui est probablement lésé.",
      ],
    )}
    ${retenir("Encéphale = cerveau + cervelet + tronc cérébral (bulbe). Il est protégé par le crâne, trois méninges et le LCR. Dans le cerveau, la substance grise est à l’extérieur ; dans la moelle, elle est au centre.")}
    ${auBac("On te demande souvent un <strong>schéma annoté</strong> d’une coupe de l’encéphale ou de la moelle. Trace-le grand, au crayon, avec des traits de rappel horizontaux et un titre précis.")}`,
};

export const MOELLE: LessonSpec = {
  title: "Organisation de la moelle épinière",
  minutes: 25,
  body: `${objectifs([
      "décrire la protection et l’organisation externe de la moelle épinière ;",
      "décrire une coupe transversale de moelle et ses rapports avec un nerf rachidien ;",
      "exploiter des expériences de section de racines (Magendie, Waller).",
    ])}
    <h2>1. Localisation et protection</h2>
    <p>La moelle épinière est un cordon blanchâtre d’environ 45 cm chez l’Homme, logé dans le <strong>canal rachidien</strong> formé par les trous des vertèbres. Elle part du bulbe rachidien et se termine vers la 2<sup>e</sup> vertèbre lombaire ; au-delà, les racines des nerfs forment la <strong>queue de cheval</strong>. Comme l’encéphale, elle est entourée des trois méninges et baignée de LCR.</p>
    <h2>2. Organisation externe</h2>
    ${liste([
      "deux <strong>renflements</strong> (cervical et lombaire), d’où partent les nerfs des membres ;",
      "un <strong>sillon médian ventral</strong> large et un <strong>sillon médian dorsal</strong> étroit ;",
      "<strong>31 paires de nerfs rachidiens</strong> ; chaque nerf naît de deux racines : une <strong>racine dorsale</strong>, qui porte un renflement, le <strong>ganglion spinal</strong>, et une <strong>racine ventrale</strong>.",
    ])}
    <h2>3. Organisation interne</h2>
    <p>Sur une coupe transversale, la <strong>substance grise</strong> centrale a la forme d’un H (ou d’un papillon) : deux <strong>cornes dorsales</strong> étroites et deux <strong>cornes ventrales</strong> larges, avec au centre le <strong>canal de l’épendyme</strong>. La <strong>substance blanche</strong> qui l’entoure est formée de cordons de fibres qui montent vers l’encéphale ou en descendent.</p>
    <h2>4. Rôle des racines : expériences historiques</h2>
    ${tableau([
      ["Expérience", "Résultat", "Conclusion"],
      ["section de la racine dorsale", "perte de la sensibilité du territoire du nerf ; la motricité est conservée", "la racine dorsale est <strong>sensitive</strong>"],
      ["section de la racine ventrale", "paralysie du territoire ; la sensibilité est conservée", "la racine ventrale est <strong>motrice</strong>"],
      ["excitation du bout central de la racine dorsale coupée", "réaction (mouvement, douleur)", "le message sensitif va de la périphérie vers la moelle"],
      ["excitation du bout périphérique de la racine ventrale coupée", "contraction des muscles", "le message moteur va de la moelle vers les muscles"],
    ])}
    ${definition("dégénérescence wallérienne", "une fibre nerveuse séparée de son corps cellulaire dégénère ; la partie restée en contact avec le corps cellulaire survit. Le corps cellulaire est le <strong>centre trophique</strong> (nourricier) de la fibre.")}
    ${liste([
      "après une section de la racine dorsale <strong>entre le ganglion et la moelle</strong>, c’est le bout relié à la moelle qui dégénère : les corps cellulaires des neurones sensitifs sont dans le <strong>ganglion spinal</strong> ;",
      "après une section de la racine ventrale, c’est le bout périphérique qui dégénère : les corps cellulaires des neurones moteurs (motoneurones) sont dans la <strong>corne ventrale</strong>.",
    ])}
    ${exercice(
      "Chez un chien, on sectionne le nerf rachidien au-delà de la réunion des deux racines. Quelles conséquences observe-t-on et pourquoi dit-on que le nerf rachidien est un nerf mixte ?",
      [
        "Le territoire du nerf perd à la fois sa sensibilité et sa motricité.",
        "Au-delà de la réunion des racines, le nerf contient des fibres sensitives (de la racine dorsale) et des fibres motrices (de la racine ventrale).",
        "Il conduit donc deux types de messages : c’est un <strong>nerf mixte</strong>.",
      ],
    )}
    ${retenir("La moelle épinière est un <strong>centre nerveux</strong> (réflexes) et une <strong>voie de conduction</strong> entre l’encéphale et le reste du corps. Racine dorsale sensitive avec ganglion spinal ; racine ventrale motrice.")}
    ${erreurs([
      "inverser cornes dorsales (étroites, sensitives) et cornes ventrales (larges, motrices) ;",
      "placer la substance grise à l’extérieur de la moelle, comme dans le cerveau.",
    ])}`,
};

// ── Tissu nerveux et ses propriétés ─────────────────────────────────────────

export const STRUCTURE_TISSU_NERVEUX: LessonSpec = {
  title: "Structure du tissu nerveux",
  minutes: 25,
  body: `${objectifs([
      "décrire le neurone, unité structurale et fonctionnelle du tissu nerveux ;",
      "distinguer fibre myélinisée et fibre amyélinique ;",
      "décrire la structure d’un nerf.",
    ])}
    <h2>1. Le neurone</h2>
    <p>Le <strong>neurone</strong> est la cellule nerveuse. Il comprend :</p>
    ${liste([
      "un <strong>corps cellulaire</strong> (ou péricaryon) avec un noyau, des neurofibrilles et des corps de Nissl ;",
      "des <strong>dendrites</strong>, prolongements courts et ramifiés qui reçoivent les messages ;",
      "un <strong>axone</strong>, prolongement unique et souvent long (jusqu’à 1 m), qui conduit le message et se termine par une <strong>arborisation terminale</strong> aux boutons synaptiques.",
    ])}
    ${tableau([
      ["Type de neurone", "Forme", "Exemple"],
      ["multipolaire", "nombreuses dendrites, un axone", "motoneurone de la corne ventrale"],
      ["en T (pseudo-unipolaire)", "un prolongement qui se divise en deux branches", "neurone sensitif du ganglion spinal"],
      ["bipolaire", "une dendrite et un axone opposés", "neurones de la rétine"],
    ])}
    <h2>2. La fibre nerveuse</h2>
    ${tableau([
      ["Fibre", "Structure", "Où ?"],
      ["<strong>myélinisée</strong>", "axone entouré d’une gaine de <strong>myéline</strong> (enroulement de cellules de Schwann), interrompue par les <strong>nœuds de Ranvier</strong>", "nerfs rachidiens, substance blanche"],
      ["<strong>amyélinique</strong>", "axone entouré seulement par la cellule de Schwann, sans myéline", "fibres du système nerveux végétatif"],
    ])}
    <h2>3. Le nerf</h2>
    <p>Un <strong>nerf</strong> est un ensemble de fibres nerveuses groupées en <strong>faisceaux</strong>. Chaque fibre est entourée d’un tissu conjonctif (endonèvre), chaque faisceau d’un périnèvre et le nerf entier d’un épinèvre, parcouru par des vaisseaux sanguins.</p>
    ${retenir("Un nerf ne contient <strong>pas</strong> de corps cellulaires : seulement des fibres. Les corps cellulaires sont dans les centres nerveux (substance grise) et dans les ganglions.")}
    <p>Le tissu nerveux contient aussi des <strong>cellules gliales</strong>, plus nombreuses que les neurones, qui les nourrissent, les soutiennent et fabriquent la myéline.</p>
    ${exercice(
      "Au microscope, on observe une coupe transversale de nerf : des cercles clairs entourés d’un anneau sombre (après coloration à l’acide osmique), groupés en paquets. Interprète.",
      [
        "Chaque cercle est la coupe d’une fibre nerveuse ; l’anneau sombre est la gaine de myéline, colorée par l’acide osmique.",
        "Les paquets sont des faisceaux de fibres entourés de périnèvre.",
        "Il s’agit d’un nerf formé de fibres myélinisées.",
      ],
    )}
    ${auBac("Pour un schéma de neurone, indique toujours le sens de propagation du message par une flèche : dendrites → corps cellulaire → axone → arborisation terminale.")}`,
};

export const PROPRIETES_TISSU_NERVEUX: LessonSpec = {
  title: "Propriétés du tissu nerveux",
  minutes: 25,
  body: `${objectifs([
      "définir l’excitabilité et la conductibilité ;",
      "énoncer les conditions d’efficacité d’un stimulus (intensité, durée, établissement) ;",
      "définir rhéobase, chronaxie et période réfractaire ; distinguer fibre et nerf.",
    ])}
    <h2>1. Excitabilité</h2>
    ${definition("excitabilité", "propriété du tissu nerveux de répondre à un <strong>stimulus</strong> (électrique, mécanique, chimique ou thermique) en produisant un message nerveux, l’<strong>influx nerveux</strong>.")}
    <p>On utilise surtout des stimulations électriques, faciles à doser. Un stimulus n’est efficace que s’il remplit trois conditions :</p>
    ${liste([
      "une <strong>intensité</strong> au moins égale au <strong>seuil</strong> ; l’intensité seuil pour un courant de longue durée est la <strong>rhéobase</strong> ;",
      "une <strong>durée</strong> suffisante, le <strong>temps utile</strong> ;",
      "un <strong>établissement brusque</strong> : un courant qui augmente lentement n’excite pas, la fibre s’adapte (<strong>accommodation</strong>).",
    ])}
    ${definition("chronaxie", "durée minimale d’un courant d’intensité égale à <strong>deux fois la rhéobase</strong> pour qu’il soit efficace. Plus la chronaxie est courte, plus le tissu est excitable.")}
    <p>La courbe intensité-durée (courbe de Lapicque) montre que plus le stimulus est bref, plus il doit être intense.</p>
    <h2>2. Période réfractaire</h2>
    <p>Juste après une excitation, la fibre ne répond plus, quelle que soit l’intensité : c’est la <strong>période réfractaire absolue</strong> (environ 1 ms). Elle est suivie d’une <strong>période réfractaire relative</strong>, où seul un stimulus plus fort que le seuil est efficace.</p>
    <h2>3. Fibre isolée et nerf</h2>
    ${tableau([
      ["", "Fibre isolée", "Nerf"],
      ["Réponse à des intensités croissantes", "rien sous le seuil, puis une réponse d’amplitude maximale d’emblée : loi du <strong>tout ou rien</strong>", "réponse qui augmente avec l’intensité, puis un plateau"],
      ["Explication", "la fibre a un seul seuil", "les fibres ont des seuils différents : de plus en plus de fibres répondent (<strong>recrutement</strong>) jusqu’à ce que toutes répondent"],
    ])}
    <h2>4. Conductibilité</h2>
    <p>Le tissu nerveux <strong>conduit</strong> l’influx. La conduction exige un nerf intact : une ligature, le froid ou un anesthésique (novocaïne) la bloquent. Expérimentalement, une fibre stimulée en son milieu conduit l’influx dans les deux sens ; dans l’organisme, il circule dans un seul sens à cause des synapses.</p>
    ${exercice(
      "On mesure les seuils d’excitation d’un nerf A : rhéobase 2 V, chronaxie 0,3 ms ; d’un nerf B : rhéobase 3 V, chronaxie 0,1 ms. Lequel est le plus excitable ?",
      [
        "La rhéobase ne suffit pas à comparer l’excitabilité : on compare les chronaxies.",
        "La chronaxie de B (0,1 ms) est plus courte que celle de A (0,3 ms).",
        "Le nerf <strong>B</strong> est le plus excitable, même si sa rhéobase est plus élevée.",
      ],
    )}
    ${retenir("Excitabilité et conductibilité sont les deux propriétés du tissu nerveux. Fibre : tout ou rien. Nerf : recrutement. La chronaxie mesure l’excitabilité.")}
    ${erreurs(["dire qu’un nerf obéit à la loi du tout ou rien : c’est la fibre qui y obéit ;", "comparer l’excitabilité de deux tissus avec la rhéobase au lieu de la chronaxie."])}`,
};

export const PHENOMENES_ELECTRIQUES: LessonSpec = {
  title: "Phénomènes électriques liés à l’influx nerveux",
  minutes: 30,
  body: `${objectifs([
      "décrire le dispositif d’enregistrement et le potentiel de repos ;",
      "décrire le potentiel d’action et expliquer son origine ionique ;",
      "distinguer le potentiel d’action d’une fibre et le potentiel global d’un nerf.",
    ])}
    <h2>1. Le dispositif d’enregistrement</h2>
    <p>On utilise un <strong>oscilloscope</strong> relié à deux électrodes réceptrices. Avec une microélectrode enfoncée dans un axone géant (de calmar) et une électrode de référence à l’extérieur, on mesure la différence de potentiel de part et d’autre de la membrane.</p>
    <h2>2. Le potentiel de repos</h2>
    <p>Dès que la microélectrode traverse la membrane, le spot descend à environ <strong>−70 mV</strong> et y reste : c’est le <strong>potentiel de repos</strong>. La face interne de la membrane est négative par rapport à la face externe : la membrane est <strong>polarisée</strong>.</p>
    ${tableau([
      ["Ion", "À l’intérieur de l’axone", "À l’extérieur"],
      ["K⁺", "très concentré (environ 140 mmol/L)", "peu concentré (environ 5 mmol/L)"],
      ["Na⁺", "peu concentré (environ 10 mmol/L)", "très concentré (environ 140 mmol/L)"],
    ])}
    <p>Au repos, la membrane laisse surtout fuir le K⁺ vers l’extérieur, ce qui crée la polarisation. Les fuites (sortie de K⁺, entrée de Na⁺) sont compensées par la <strong>pompe Na⁺/K⁺</strong>, qui fait sortir 3 Na⁺ et entrer 2 K⁺ en consommant de l’<strong>ATP</strong>. Un poison qui bloque la production d’ATP (cyanure, dinitrophénol) fait disparaître lentement le potentiel de repos.</p>
    <h2>3. Le potentiel d’action</h2>
    <p>Après une stimulation efficace, on enregistre une variation brève (1 à 2 ms) et stéréotypée de la polarisation : le <strong>potentiel d’action</strong>.</p>
    ${tableau([
      ["Phase", "Variation du potentiel", "Cause ionique"],
      ["dépolarisation", "de −70 mV à environ +30 mV (inversion de polarité)", "ouverture des canaux à Na⁺ : <strong>entrée massive de Na⁺</strong>"],
      ["repolarisation", "retour vers −70 mV", "fermeture des canaux à Na⁺, ouverture des canaux à K⁺ : <strong>sortie de K⁺</strong>"],
      ["hyperpolarisation", "passage bref sous −70 mV", "les canaux à K⁺ se ferment lentement"],
    ])}
    ${liste([
      "si l’on diminue la concentration de Na⁺ dans le milieu extérieur, l’amplitude du potentiel d’action diminue : il est bien dû à l’entrée de Na⁺ ;",
      "la <strong>tétrodotoxine</strong> (poison du poisson-globe) bloque les canaux à Na⁺ : plus de potentiel d’action ;",
      "le potentiel d’action d’une fibre a toujours la même amplitude (tout ou rien) ; un stimulus plus intense donne des potentiels d’action plus <strong>fréquents</strong> : le message nerveux est <strong>codé en fréquence</strong>.",
    ])}
    <h2>4. Le potentiel global d’un nerf</h2>
    <p>Avec deux électrodes posées à la surface d’un nerf, on enregistre un potentiel <strong>diphasique</strong> : l’influx passe d’abord sous la première électrode, puis sous la seconde. Si l’on écrase le nerf entre les deux électrodes, l’influx n’atteint plus la seconde : le potentiel devient <strong>monophasique</strong>. Son amplitude augmente avec l’intensité de stimulation (recrutement des fibres).</p>
    ${exercice(
      "On place un axone dans de l’eau de mer dont la concentration en Na⁺ est divisée par trois. Le potentiel de repos reste presque identique, mais le potentiel d’action passe de 100 mV à 60 mV d’amplitude. Interprète.",
      [
        "Le potentiel de repos ne change presque pas : il dépend surtout du K⁺, pas du Na⁺ extérieur.",
        "L’amplitude du potentiel d’action diminue quand Na⁺ extérieur diminue.",
        "La dépolarisation est donc due à une <strong>entrée de Na⁺</strong> ; moins il y a de Na⁺ dehors, plus cette entrée est faible.",
      ],
    )}
    ${retenir("Repos : −70 mV, membrane polarisée, maintenue par la pompe Na⁺/K⁺ (ATP). Potentiel d’action : entrée de Na⁺ (dépolarisation), puis sortie de K⁺ (repolarisation). Message nerveux codé en fréquence de potentiels d’action.")}
    ${auBac("Sur un enregistrement, repère toujours les axes et leurs unités (mV, ms), puis décris avant d’interpréter : « on observe… », puis « on en déduit… ».")}`,
};

export const CONDUCTION_INFLUX: LessonSpec = {
  title: "Conduction de l’influx nerveux",
  minutes: 25,
  body: `${objectifs([
      "expliquer la propagation du potentiel d’action par les courants locaux ;",
      "distinguer conduction continue et conduction saltatoire ;",
      "calculer une vitesse de conduction et citer ses facteurs de variation.",
    ])}
    <h2>1. Mécanisme de la propagation</h2>
    <p>Au point excité, la membrane est inversée (intérieur positif). Des <strong>courants locaux</strong> s’établissent entre cette zone et les zones voisines encore au repos ; ils les dépolarisent jusqu’au seuil, et elles produisent à leur tour un potentiel d’action. L’influx se propage ainsi <strong>sans s’affaiblir</strong>.</p>
    <p>La zone qui vient d’être active est en période réfractaire : l’influx ne peut pas revenir en arrière.</p>
    <h2>2. Deux modes de conduction</h2>
    ${tableau([
      ["Fibre", "Mode", "Vitesse"],
      ["amyélinique", "<strong>continue</strong>, de proche en proche sur toute la membrane", "lente : 0,5 à 2 m/s"],
      ["myélinisée", "<strong>saltatoire</strong> : la myéline est isolante, le potentiel d’action « saute » d’un nœud de Ranvier au suivant", "rapide : jusqu’à 100 à 120 m/s"],
    ])}
    <h2>3. Mesure de la vitesse</h2>
    ${methode([
      "Stimuler le nerf en un point et enregistrer le potentiel avec une électrode réceptrice placée à une distance d₁, puis à une distance d₂.",
      "Mesurer le temps de latence t₁ puis t₂ entre l’artefact de stimulation et le début de la réponse.",
      "Calculer v = (d₂ − d₁) ÷ (t₂ − t₁) : en faisant la différence, on élimine le temps d’excitation au point stimulé.",
    ], "Calculer une vitesse de conduction")}
    ${formula("v = Δd ÷ Δt (en m/s : distances en mètres, temps en secondes)")}
    <h2>4. Facteurs de variation</h2>
    ${liste([
      "le <strong>diamètre</strong> de la fibre : plus il est grand, plus la conduction est rapide (axone géant du calmar) ;",
      "la <strong>myéline</strong> : elle multiplie la vitesse ;",
      "la <strong>température</strong> : le froid ralentit la conduction.",
    ])}
    ${exercice(
      "Une électrode réceptrice placée à 2 cm du point de stimulation enregistre la réponse après 0,6 ms ; à 6 cm, après 1,1 ms. Calcule la vitesse de conduction et dis s’il s’agit probablement d’une fibre myélinisée.",
      [
        "Δd = 6 − 2 = 4 cm = 0,04 m ; Δt = 1,1 − 0,6 = 0,5 ms = 0,0005 s.",
        "v = 0,04 ÷ 0,0005 = <strong>80 m/s</strong>.",
        "Cette vitesse élevée correspond à une conduction saltatoire : la fibre est probablement <strong>myélinisée</strong>.",
      ],
    )}
    ${retenir("L’influx se propage par courants locaux, sans perte d’amplitude. Conduction saltatoire (myéline) bien plus rapide que la conduction continue. Dans la sclérose en plaques, la myéline est détruite et la conduction se ralentit.")}
    ${erreurs(["oublier de convertir les cm en m et les ms en s ;", "calculer v = d ÷ t avec une seule mesure : le temps d’excitation au point stimulé fausse le résultat."])}`,
};

export const SYNAPSE: LessonSpec = {
  title: "La transmission synaptique",
  minutes: 30,
  body: `${objectifs([
      "décrire la structure d’une synapse chimique ;",
      "expliquer le mécanisme de la transmission synaptique et le délai synaptique ;",
      "distinguer synapse excitatrice et inhibitrice, sommation spatiale et temporelle ;",
      "expliquer l’action de quelques substances sur les synapses.",
    ])}
    <h2>1. Structure</h2>
    <p>Une <strong>synapse</strong> est la zone de jonction entre deux neurones (synapse neuro-neuronique) ou entre un neurone et une cellule effectrice, par exemple une fibre musculaire (synapse neuromusculaire ou <strong>plaque motrice</strong>). On y distingue :</p>
    ${liste([
      "l’<strong>élément présynaptique</strong> : le bouton terminal de l’axone, rempli de <strong>vésicules</strong> contenant un neurotransmetteur ;",
      "la <strong>fente synaptique</strong>, espace d’environ 20 nm ;",
      "l’<strong>élément postsynaptique</strong>, dont la membrane porte des <strong>récepteurs</strong> spécifiques du neurotransmetteur.",
    ])}
    <h2>2. Le fonctionnement</h2>
    ${methode([
      "Le potentiel d’action arrive dans le bouton présynaptique et provoque l’<strong>entrée d’ions Ca²⁺</strong>.",
      "Les vésicules fusionnent avec la membrane et libèrent le <strong>neurotransmetteur</strong> dans la fente (<strong>exocytose</strong>) ; sa quantité dépend de la fréquence des potentiels d’action.",
      "Le neurotransmetteur se fixe sur ses récepteurs, qui sont des canaux ioniques : ils s’ouvrent.",
      "Il naît un <strong>potentiel postsynaptique</strong> ; s’il atteint le seuil, un potentiel d’action part dans le neurone postsynaptique.",
      "Le neurotransmetteur est ensuite détruit par une enzyme (l’<strong>acétylcholinestérase</strong> pour l’acétylcholine) ou recapturé : la transmission s’arrête.",
    ], "Étapes de la transmission")}
    <p>Ces étapes prennent du temps : c’est le <strong>délai synaptique</strong> (environ 0,5 ms). La transmission est <strong>unidirectionnelle</strong> : seul l’élément présynaptique contient le neurotransmetteur.</p>
    <h2>3. Synapses excitatrices et inhibitrices</h2>
    ${tableau([
      ["Synapse", "Effet sur la membrane postsynaptique", "Exemple d’ions"],
      ["excitatrice", "dépolarisation : <strong>PPSE</strong> (potentiel postsynaptique excitateur)", "entrée de Na⁺"],
      ["inhibitrice", "hyperpolarisation : <strong>PPSI</strong>", "entrée de Cl⁻ ou sortie de K⁺"],
    ])}
    <h2>4. L’intégration</h2>
    <p>Un neurone reçoit des milliers de synapses. Il fait la <strong>somme algébrique</strong> des PPSE et des PPSI :</p>
    ${liste([
      "<strong>sommation spatiale</strong> : potentiels arrivant en même temps par des synapses différentes ;",
      "<strong>sommation temporelle</strong> : potentiels arrivant très rapprochés par la même synapse.",
    ])}
    <p>Le neurone n’émet un potentiel d’action que si la somme atteint le seuil au niveau du segment initial de l’axone. Le message est codé en <strong>fréquence</strong> de potentiels d’action sur l’axone et en <strong>concentration</strong> de neurotransmetteur dans la synapse.</p>
    <h2>5. Substances qui agissent sur les synapses</h2>
    ${tableau([
      ["Substance", "Action"],
      ["curare", "se fixe sur les récepteurs à acétylcholine de la plaque motrice sans les ouvrir : paralysie"],
      ["insecticides organophosphorés", "bloquent l’acétylcholinestérase : contractions permanentes"],
      ["morphine, héroïne", "imitent les endorphines (antidouleur naturels) ; dépendance"],
      ["cocaïne", "empêche la recapture de la dopamine : dépendance"],
      ["nicotine", "active les récepteurs à acétylcholine"],
    ])}
    ${exercice(
      "On stimule un neurone présynaptique et on enregistre le neurone postsynaptique : un stimulus isolé donne une petite dépolarisation de 5 mV ; deux stimulus séparés de 2 ms donnent une dépolarisation de 10 mV ; quatre stimulus rapprochés déclenchent un potentiel d’action. Interprète.",
      [
        "Un stimulus isolé donne un PPSE trop faible pour atteindre le seuil : la synapse est excitatrice.",
        "Des stimulus rapprochés donnent des PPSE qui s’additionnent : c’est une <strong>sommation temporelle</strong>.",
        "Avec quatre stimulus, la somme atteint le seuil : le neurone postsynaptique émet un potentiel d’action.",
      ],
    )}
    ${retenir("Synapse chimique : potentiel d’action → entrée de Ca²⁺ → exocytose du neurotransmetteur → fixation sur les récepteurs → PPSE ou PPSI → intégration. Délai synaptique et sens unique. Drogues et poisons agissent souvent sur les synapses.")}
    ${auBac("Un schéma fonctionnel de la synapse, avec des flèches numérotées dans l’ordre des étapes, vaut souvent mieux qu’un long texte.")}`,
};

// ── Rôle du système nerveux dans le comportement moteur (S2) ───────────────

export const REFLEXES: LessonSpec = {
  title: "Mouvements involontaires ou réflexes",
  minutes: 30,
  body: `${objectifs([
      "définir un réflexe et décrire l’arc réflexe ;",
      "expliquer le réflexe myotatique et l’innervation réciproque ;",
      "distinguer réflexes innés et réflexes conditionnels (Pavlov, Skinner).",
    ])}
    ${definition("réflexe", "réponse <strong>involontaire</strong>, rapide et prévisible à une stimulation.")}
    <h2>1. Les réflexes innés (inconditionnels)</h2>
    <p>Ils existent chez tous les individus de l’espèce dès la naissance (succion du nouveau-né, retrait de la main d’une plaque chaude, réflexe pupillaire).</p>
    <p>Une grenouille <strong>spinale</strong> (encéphale détruit, moelle intacte) réagit encore à un pincement ou à de l’acide sur la patte : la moelle épinière suffit pour ces réflexes. Si l’on détruit la moelle, plus aucune réaction : la moelle est le <strong>centre</strong> de ces réflexes.</p>
    ${methode([
      "un <strong>récepteur</strong> sensoriel (peau, fuseau neuromusculaire) ;",
      "une <strong>voie afférente</strong> (fibre sensitive, racine dorsale) ;",
      "un <strong>centre nerveux</strong> (substance grise de la moelle) ;",
      "une <strong>voie efférente</strong> (fibre d’un motoneurone, racine ventrale) ;",
      "un <strong>effecteur</strong> (muscle).",
    ], "Les 5 éléments de l’arc réflexe")}
    <h2>2. Le réflexe myotatique</h2>
    <p>C’est la contraction d’un muscle en réponse à son propre étirement (réflexe rotulien, réflexe achilléen). Il assure le tonus musculaire et la posture.</p>
    ${liste([
      "le choc sur le tendon étire le muscle extenseur ; ses <strong>fuseaux neuromusculaires</strong> envoient des potentiels d’action par la fibre sensitive ;",
      "dans la moelle, la fibre sensitive fait synapse <strong>directement</strong> avec le motoneurone du même muscle : réflexe <strong>monosynaptique</strong> (temps de réaction très court) ;",
      "en même temps, par un <strong>interneurone inhibiteur</strong>, le motoneurone du muscle antagoniste (fléchisseur) est inhibé : il se relâche. C’est l’<strong>innervation réciproque</strong>.",
    ])}
    <h2>3. Les réflexes conditionnels (acquis)</h2>
    ${tableau([
      ["", "Conditionnement de Pavlov (classique)", "Conditionnement de Skinner (opérant)"],
      ["Expérience", "on fait sonner une cloche juste avant de donner de la viande à un chien, plusieurs fois", "un rat dans une boîte appuie par hasard sur un levier et reçoit de la nourriture"],
      ["Résultat", "le son seul fait saliver le chien", "le rat appuie de plus en plus souvent sur le levier"],
      ["Principe", "association d’un <strong>stimulus neutre</strong> (son) à un <strong>stimulus absolu</strong> (viande)", "un comportement suivi d’une récompense (<strong>renforcement</strong>) est répété"],
    ])}
    ${liste([
      "un réflexe conditionnel est individuel, s’acquiert par apprentissage et s’<strong>éteint</strong> s’il n’est plus renforcé ;",
      "son centre est le <strong>cortex cérébral</strong> : un animal dont on a enlevé le cortex ne peut pas l’acquérir ;",
      "nos habitudes (se lever à la sonnerie, freiner au feu rouge) reposent sur ces mécanismes.",
    ])}
    ${exercice(
      "Chez une grenouille spinale, on pince la patte postérieure droite : elle se retire. On sectionne la racine dorsale du nerf de cette patte, puis on recommence : rien ne se passe, mais l’excitation du bout central de cette racine provoque le retrait. Interprète.",
      [
        "Le retrait après pincement est un réflexe médullaire (l’encéphale est détruit).",
        "Après section de la racine dorsale, le message sensitif n’atteint plus la moelle : plus de réflexe.",
        "En excitant le bout central, on envoie un message vers la moelle : le centre, la voie motrice et le muscle fonctionnent. La racine dorsale est la voie afférente de l’arc réflexe.",
      ],
    )}
    ${retenir("Réflexe inné : arc réflexe à 5 éléments, centre médullaire. Réflexe myotatique monosynaptique avec innervation réciproque. Réflexe conditionnel : apprentissage, centre cortical, extinction sans renforcement.")}`,
};

export const MOUVEMENTS_VOLONTAIRES: LessonSpec = {
  title: "Mouvements volontaires",
  minutes: 25,
  body: `${objectifs([
      "localiser les aires motrices du cortex ;",
      "décrire la voie motrice pyramidale et son croisement ;",
      "expliquer le rôle intégrateur du motoneurone.",
    ])}
    <p>Un mouvement <strong>volontaire</strong> (ou spontané) est décidé et commandé par le cerveau : il n’a pas besoin d’un stimulus extérieur.</p>
    <h2>1. Les aires motrices</h2>
    ${liste([
      "l’<strong>aire motrice principale</strong> est située dans la circonvolution frontale ascendante, juste en avant de la <strong>scissure de Rolando</strong> ;",
      "chaque partie du corps y est représentée (somatotopie) ; la main, la langue et les lèvres, aux mouvements précis, occupent une grande surface : c’est l’<strong>homonculus moteur</strong> ;",
      "l’<strong>aire prémotrice</strong>, en avant, prépare et organise les mouvements ;",
      "l’<strong>aire sensitive</strong>, en arrière de la scissure, reçoit les sensations du corps.",
    ])}
    <p>Des observations cliniques et des expériences de stimulation l’ont montré : la stimulation d’un point de l’aire motrice droite fait contracter un muscle précis du côté <strong>gauche</strong> ; une lésion provoque une paralysie du côté opposé.</p>
    <h2>2. La voie motrice</h2>
    ${methode([
      "Les corps cellulaires des neurones pyramidaux sont dans le cortex moteur.",
      "Leurs axones descendent dans la substance blanche (faisceau pyramidal) et <strong>croisent la ligne médiane</strong> dans le bulbe rachidien (décussation des pyramides).",
      "Ils font synapse avec les <strong>motoneurones</strong> de la corne ventrale de la moelle.",
      "Les motoneurones commandent les fibres musculaires au niveau des plaques motrices.",
    ], "Du cortex au muscle")}
    ${retenir("À cause du croisement des voies, un <strong>accident vasculaire cérébral</strong> dans l’hémisphère gauche peut paralyser la moitié droite du corps (hémiplégie droite) et parfois troubler le langage.")}
    <h2>3. Le motoneurone, voie finale commune</h2>
    <p>Le motoneurone reçoit à la fois les messages des réflexes (fibres sensitives, interneurones) et les ordres du cortex. Il <strong>intègre</strong> tous ces messages, excitateurs et inhibiteurs, et la fréquence des potentiels d’action qu’il envoie au muscle en résulte. C’est la seule voie de sortie vers le muscle : on l’appelle la <strong>voie finale commune</strong>.</p>
    <p>Le <strong>cervelet</strong> coordonne les mouvements et l’équilibre. Avec l’apprentissage, certains gestes volontaires (marcher, écrire, conduire) deviennent automatiques.</p>
    ${exercice(
      "Après un AVC, un patient ne peut plus bouger le bras et la jambe gauches, mais ses réflexes rotuliens existent toujours. Localise la lésion et explique la conservation des réflexes.",
      [
        "La paralysie touche le côté gauche : à cause du croisement de la voie pyramidale, la lésion est dans l’<strong>hémisphère droit</strong>, au niveau de l’aire motrice ou de la voie qui en part.",
        "Les réflexes myotatiques ont leur centre dans la moelle épinière, qui n’est pas atteinte.",
        "Les arcs réflexes sont intacts : les réflexes sont conservés.",
      ],
    )}
    ${auBac("Pour expliquer un trouble moteur, suis toujours le trajet complet : cortex → voie pyramidale (croisement dans le bulbe) → motoneurone médullaire → plaque motrice → muscle.")}`,
};

// ── Activité du muscle strié squelettique ───────────────────────────────────

export const STRUCTURE_MUSCLE: LessonSpec = {
  title: "Structure du muscle strié squelettique",
  minutes: 25,
  body: `${objectifs([
      "décrire l’organisation du muscle, de l’organe à la molécule ;",
      "décrire un sarcomère au microscope électronique ;",
      "définir l’unité motrice et la plaque motrice.",
    ])}
    <h2>1. Du muscle à la fibre</h2>
    ${tableau([
      ["Niveau", "Description"],
      ["muscle", "organe entouré d’une enveloppe conjonctive, relié aux os par des tendons"],
      ["faisceau", "groupe de fibres musculaires"],
      ["fibre musculaire", "très longue cellule (jusqu’à plusieurs cm) à <strong>plusieurs noyaux</strong>, limitée par le sarcolemme ; son cytoplasme (sarcoplasme) contient des myofibrilles, des mitochondries, du glycogène et un <strong>réticulum sarcoplasmique</strong> qui stocke le calcium"],
      ["myofibrille", "filament contractile montrant une alternance de bandes sombres et claires : d’où la striation"],
    ])}
    <h2>2. Le sarcomère</h2>
    <p>Le <strong>sarcomère</strong> est l’unité contractile de la myofibrille, compris entre deux <strong>stries Z</strong>. On y observe :</p>
    ${liste([
      "une <strong>bande sombre A</strong> au centre, avec une zone plus claire, la <strong>zone H</strong> ;",
      "deux demi-<strong>bandes claires I</strong>, de part et d’autre, coupées par les stries Z ;",
      "des <strong>filaments fins d’actine</strong>, fixés aux stries Z, et des <strong>filaments épais de myosine</strong>, au centre ; la bande A correspond à la longueur des filaments de myosine.",
    ])}
    ${tableau([
      ["Zone", "Filaments présents"],
      ["bande I", "actine seulement"],
      ["zone H", "myosine seulement"],
      ["reste de la bande A", "actine et myosine qui se chevauchent"],
    ])}
    <h2>3. Innervation du muscle</h2>
    ${definition("unité motrice", "ensemble formé par un <strong>motoneurone</strong> et toutes les fibres musculaires qu’il commande. Les muscles aux mouvements fins (doigts, yeux) ont de petites unités motrices.")}
    <p>Chaque fibre musculaire reçoit une terminaison nerveuse au niveau d’une <strong>plaque motrice</strong>, synapse dont le neurotransmetteur est l’<strong>acétylcholine</strong>.</p>
    ${exercice(
      "On compare deux électronographies du même sarcomère : au repos, bande I = 1 µm, bande A = 1,6 µm, zone H = 0,6 µm ; contracté, bande I = 0,4 µm, bande A = 1,6 µm, zone H = 0. Interprète.",
      [
        "La bande A ne change pas : les filaments de myosine gardent leur longueur.",
        "La bande I et la zone H diminuent : les filaments d’actine avancent entre les filaments de myosine.",
        "Les filaments ne raccourcissent pas, ils <strong>glissent</strong> les uns sur les autres : le sarcomère raccourcit.",
      ],
    )}
    ${retenir("Muscle → faisceaux → fibres (cellules multinucléées) → myofibrilles → sarcomères (actine et myosine). Pendant la contraction, la bande A reste constante, la bande I et la zone H diminuent.")}`,
};

export const FONCTIONNEMENT_MUSCLE: LessonSpec = {
  title: "Fonctionnement du muscle squelettique",
  minutes: 35,
  body: `${objectifs([
      "analyser un myogramme : secousse, fusion, tétanos ;",
      "expliquer le mécanisme moléculaire de la contraction ;",
      "décrire les voies de régénération de l’ATP et les phénomènes thermiques.",
    ])}
    <h2>1. Phénomènes mécaniques</h2>
    <p>Un muscle de grenouille relié à un <strong>myographe</strong> trace un <strong>myogramme</strong>.</p>
    ${tableau([
      ["Stimulation", "Réponse"],
      ["un stimulus efficace", "une <strong>secousse musculaire</strong> : temps de latence (quelques ms), phase de contraction, phase de relâchement"],
      ["deux stimulus rapprochés", "les deux secousses s’additionnent (sommation)"],
      ["stimulus répétés, fréquence moyenne", "<strong>tétanos imparfait</strong> : plateau dentelé (fusion partielle)"],
      ["stimulus répétés, fréquence élevée", "<strong>tétanos parfait</strong> : plateau lisse (fusion complète)"],
    ])}
    <p>Nos contractions volontaires sont des tétanos. Une stimulation prolongée entraîne la <strong>fatigue</strong> : l’amplitude diminue.</p>
    <h2>2. Phénomènes électriques</h2>
    <p>Chaque contraction est précédée d’un <strong>potentiel d’action musculaire</strong>, né au niveau de la plaque motrice et propagé le long du sarcolemme. L’électromyogramme l’enregistre.</p>
    <h2>3. Mécanisme moléculaire de la contraction</h2>
    ${methode([
      "Le potentiel d’action musculaire se propage et déclenche la libération des ions <strong>Ca²⁺</strong> stockés dans le réticulum sarcoplasmique.",
      "Le Ca²⁺ libère les sites de fixation sur l’actine : les têtes de <strong>myosine</strong> s’y accrochent (pont actomyosine).",
      "La myosine hydrolyse l’<strong>ATP</strong> ; ses têtes pivotent et tirent les filaments d’actine vers le centre du sarcomère.",
      "Une nouvelle molécule d’ATP détache la tête de myosine, qui peut se fixer plus loin : le cycle recommence tant qu’il y a du Ca²⁺ et de l’ATP.",
      "Le Ca²⁺ est repompé dans le réticulum : le muscle se relâche.",
    ], "Couplage excitation-contraction")}
    ${retenir("Sans ATP, les têtes de myosine restent accrochées à l’actine : c’est la <strong>rigidité cadavérique</strong> après la mort.")}
    <h2>4. Phénomènes chimiques : régénérer l’ATP</h2>
    <p>Le muscle ne contient qu’un peu d’ATP, épuisé en quelques secondes. Il le régénère par trois voies :</p>
    ${tableau([
      ["Voie", "Réaction", "Caractéristiques"],
      ["phosphocréatine", "phosphocréatine + ADP → créatine + ATP", "immédiate, très courte : départ d’un sprint"],
      ["fermentation lactique (sans O₂)", "glucose → 2 acide lactique + 2 ATP", "rapide mais peu rentable ; l’acide lactique s’accumule (fatigue, crampes)"],
      ["respiration (avec O₂)", "glucose + 6 O₂ → 6 CO₂ + 6 H₂O + 36 à 38 ATP", "plus lente à démarrer, très rentable : efforts longs"],
    ])}
    ${formula("C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + énergie (ATP)")}
    <p>Le glucose vient du <strong>glycogène</strong> stocké dans la fibre ou du sang.</p>
    <h2>5. Phénomènes thermiques</h2>
    <p>Seule une partie de l’énergie devient du travail mécanique (environ 20 à 25 %) ; le reste est dégagé en <strong>chaleur</strong>. On distingue une <strong>chaleur initiale</strong>, pendant la contraction et le relâchement, et une <strong>chaleur retardée</strong>, plus longue, liée à la régénération de l’ATP (respiration). C’est pourquoi l’effort réchauffe le corps et pourquoi on frissonne quand on a froid.</p>
    ${exercice(
      "Un muscle est empoisonné à l’acide iodoacétique (qui bloque la glycolyse). Il peut encore se contracter un moment, puis s’arrête ; on constate alors que sa phosphocréatine a disparu alors que son ATP est à peine diminué. Interprète.",
      [
        "La glycolyse est bloquée : ni fermentation ni respiration ne peuvent fournir d’ATP à partir du glucose.",
        "Le muscle se contracte quand même un moment : l’ATP consommé est régénéré par la <strong>phosphocréatine</strong>, qui disparaît.",
        "Quand la phosphocréatine est épuisée, l’ATP n’est plus régénéré : la contraction s’arrête. L’ATP est donc la source directe d’énergie et la phosphocréatine une réserve immédiate.",
      ],
    )}
    ${auBac("Dans un exercice sur le myogramme, nomme précisément ce que tu vois (secousse, tétanos imparfait ou parfait) et relie-le à la <strong>fréquence</strong> des stimulations.")}`,
};

// ── Activité cardiaque et pression artérielle ───────────────────────────────

export const AUTOMATISME_CARDIAQUE: LessonSpec = {
  title: "L’automatisme cardiaque",
  minutes: 30,
  body: `${objectifs([
      "mettre en évidence l’automatisme du cœur ;",
      "décrire le tissu nodal et la propagation de l’excitation ;",
      "décrire le cycle cardiaque et interpréter un électrocardiogramme.",
    ])}
    <h2>1. Le cœur est automatique</h2>
    <p>Un cœur de grenouille isolé, placé dans un liquide physiologique (liquide de Ringer), continue à battre pendant des heures, sans aucun nerf : l’activité cardiaque naît dans le cœur lui-même. C’est l’<strong>automatisme cardiaque</strong>.</p>
    <h2>2. Le tissu nodal</h2>
    <p>Le muscle cardiaque (myocarde) contient un tissu spécialisé, le <strong>tissu nodal</strong>, qui produit et conduit l’excitation :</p>
    ${methode([
      "le <strong>nœud sinusal</strong> (de Keith et Flack), dans la paroi de l’oreillette droite, émet spontanément des potentiels d’action : c’est le <strong>centre d’automatisme</strong> (« pacemaker ») ;",
      "l’excitation se propage dans les deux oreillettes, qui se contractent ;",
      "elle atteint le <strong>nœud auriculo-ventriculaire</strong> (d’Aschoff-Tawara), qui la ralentit un peu ;",
      "le <strong>faisceau de His</strong> la conduit dans la cloison, puis le <strong>réseau de Purkinje</strong> la distribue aux ventricules, qui se contractent de la pointe vers la base.",
    ], "Trajet de l’excitation")}
    <p>Les ligatures de Stannius sur le cœur de grenouille montrent une hiérarchie : le centre le plus rapide (sinus) impose son rythme ; s’il est isolé, le nœud auriculo-ventriculaire prend le relais, avec un rythme plus lent.</p>
    <h2>3. Le cycle cardiaque</h2>
    ${tableau([
      ["Phase (pour 75 battements par minute)", "Durée", "Événements"],
      ["systole auriculaire", "0,1 s", "les oreillettes se contractent et finissent de remplir les ventricules"],
      ["systole ventriculaire", "0,3 s", "les valvules auriculo-ventriculaires se ferment (1<sup>er</sup> bruit), les ventricules éjectent le sang dans l’aorte et l’artère pulmonaire"],
      ["diastole générale", "0,4 s", "relâchement ; les valvules sigmoïdes se ferment (2<sup>e</sup> bruit) ; le cœur se remplit"],
    ])}
    <h2>4. Propriétés du muscle cardiaque</h2>
    ${liste([
      "il obéit à la loi du <strong>tout ou rien</strong> ;",
      "il a une <strong>période réfractaire longue</strong> (toute la systole) : il ne peut pas être tétanisé, ce qui garantit l’alternance contraction-remplissage ;",
      "une stimulation pendant la diastole provoque une contraction supplémentaire (<strong>extrasystole</strong>), suivie d’un repos compensateur.",
    ])}
    <h2>5. L’électrocardiogramme (ECG)</h2>
    ${tableau([
      ["Onde", "Signification"],
      ["onde P", "dépolarisation des oreillettes"],
      ["complexe QRS", "dépolarisation des ventricules"],
      ["onde T", "repolarisation des ventricules"],
    ])}
    ${exercice(
      "Sur un ECG, deux complexes QRS successifs sont séparés de 0,75 s. Calcule la fréquence cardiaque. Que dirais-tu si les ondes P n’étaient plus suivies régulièrement d’un QRS ?",
      [
        "Fréquence = 60 ÷ 0,75 = <strong>80 battements par minute</strong>.",
        "Si les ondes P ne sont plus suivies d’un QRS, l’excitation des oreillettes ne passe plus vers les ventricules.",
        "Le blocage se situe au niveau du nœud auriculo-ventriculaire ou du faisceau de His (bloc auriculo-ventriculaire) ; on peut poser un stimulateur cardiaque artificiel.",
      ],
    )}
    ${retenir("Le cœur est automatique grâce au tissu nodal : nœud sinusal (pacemaker) → oreillettes → nœud auriculo-ventriculaire → faisceau de His → réseau de Purkinje. Période réfractaire longue : pas de tétanos cardiaque.")}`,
};

export const PRESSION_ARTERIELLE: LessonSpec = {
  title: "Activité cardiaque et régulation de la pression artérielle",
  minutes: 35,
  body: `${objectifs([
      "définir la pression artérielle et ses facteurs de variation ;",
      "expliquer la régulation nerveuse (réflexe) et hormonale de la pression artérielle ;",
      "connaître les causes, les conséquences et la prévention de l’hypertension.",
    ])}
    <h2>1. La pression artérielle</h2>
    <p>La <strong>pression artérielle</strong> est la force exercée par le sang sur la paroi des artères. Elle est maximale pendant la systole ventriculaire (<strong>pression systolique</strong>, environ 12 cmHg) et minimale pendant la diastole (<strong>pression diastolique</strong>, environ 8 cmHg) : on note « 12/8 » (ou 120/80 mmHg). On la mesure avec un tensiomètre.</p>
    ${tableau([
      ["Facteur", "Effet sur la pression"],
      ["débit cardiaque (fréquence × volume éjecté)", "s’il augmente, la pression augmente"],
      ["résistance des petites artères (vasomotricité)", "la <strong>vasoconstriction</strong> l’augmente, la vasodilatation la diminue"],
      ["volume sanguin (volémie)", "une hémorragie la fait chuter ; trop de sel et d’eau retenus l’augmentent"],
    ])}
    <h2>2. La régulation nerveuse : un réflexe</h2>
    ${methode([
      "<strong>Récepteurs</strong> : les <strong>barorécepteurs</strong> (sensibles à l’étirement de la paroi) du <strong>sinus carotidien</strong> et de la <strong>crosse aortique</strong>.",
      "<strong>Voies afférentes</strong> : les nerfs de <strong>Hering</strong> (sinus carotidien) et de <strong>Cyon</strong> (crosse aortique) ; plus la pression est forte, plus la fréquence de leurs potentiels d’action est élevée.",
      "<strong>Centres</strong> : dans le <strong>bulbe rachidien</strong>, un centre cardiomodérateur, un centre cardioaccélérateur et un centre vasomoteur.",
      "<strong>Voies efférentes</strong> : le <strong>nerf pneumogastrique</strong> (nerf X, parasympathique, qui libère de l’acétylcholine) ralentit le cœur ; les <strong>nerfs sympathiques</strong> (noradrénaline) l’accélèrent et resserrent les artérioles.",
      "<strong>Effecteurs</strong> : le cœur (nœud sinusal) et les muscles des artérioles.",
    ], "Les éléments du réflexe")}
    ${tableau([
      ["Expérience", "Résultat", "Interprétation"],
      ["section des nerfs de Hering et de Cyon", "hypertension durable", "ces nerfs transmettent en permanence un message qui modère la pression"],
      ["stimulation du bout central du nerf de Hering coupé", "baisse de la pression et ralentissement du cœur", "le message sensitif active le centre cardiomodérateur"],
      ["section des deux nerfs X", "accélération du cœur", "le nerf X freine en permanence le cœur (tonus parasympathique)"],
      ["stimulation du bout périphérique du nerf X", "ralentissement, voire arrêt du cœur", "le nerf X est cardiomodérateur"],
    ])}
    <p>En cas d’<strong>hypertension</strong>, les barorécepteurs envoient plus de messages : le centre cardiomodérateur est activé (nerf X), le sympathique est freiné : le cœur ralentit, les artérioles se dilatent, la pression baisse. En cas d’<strong>hypotension</strong>, c’est l’inverse. C’est une <strong>rétroaction négative</strong>.</p>
    <h2>3. La régulation hormonale</h2>
    ${liste([
      "l’<strong>adrénaline</strong>, libérée par la médullosurrénale lors d’un stress, accélère le cœur et provoque une vasoconstriction : la pression monte ;",
      "si la pression baisse, le rein libère la <strong>rénine</strong>, qui produit l’<strong>angiotensine</strong> (puissant vasoconstricteur) ; celle-ci fait sécréter l’<strong>aldostérone</strong>, qui fait retenir le sodium et l’eau par le rein : la volémie et la pression remontent ;",
      "l’<strong>ADH</strong> (hormone antidiurétique) fait retenir l’eau par le rein.",
    ])}
    <p>Les deux régulations se complètent : la régulation nerveuse est rapide (quelques secondes), la régulation hormonale plus lente et plus durable. On parle de régulation <strong>neuro-hormonale</strong>.</p>
    <h2>4. Une maladie cardiovasculaire : l’hypertension artérielle</h2>
    ${tableau([
      ["", "Hypertension artérielle (au-delà de 14/9 de façon durable)"],
      ["Causes et facteurs de risque", "excès de sel, surpoids, sédentarité, tabac, alcool, stress, diabète, hérédité, âge"],
      ["Conséquences", "accident vasculaire cérébral (AVC), infarctus du myocarde, insuffisance cardiaque ou rénale, troubles de la vue"],
      ["Prévention et traitement", "manger moins salé et moins gras, activité physique, arrêt du tabac, contrôle régulier de la tension ; médicaments si nécessaire"],
    ])}
    <p>Souvent silencieuse, l’hypertension est très fréquente au Sénégal : il faut la mesurer régulièrement à partir de l’âge adulte.</p>
    ${exercice(
      "Chez un chien, on pince les deux carotides en dessous des sinus carotidiens : la pression monte et le cœur accélère. Explique.",
      [
        "Sous le pincement, le sang arrive moins aux sinus carotidiens : la pression y baisse.",
        "Les barorécepteurs, moins étirés, envoient moins de potentiels d’action par les nerfs de Hering.",
        "Le centre bulbaire interprète cela comme une hypotension : il freine le nerf X et active le sympathique. Le cœur accélère, les artérioles se resserrent : la pression générale monte.",
      ],
    )}
    ${retenir("Régulation réflexe : barorécepteurs (sinus carotidien, crosse aortique) → nerfs de Hering et de Cyon → bulbe → nerf X (freine) ou sympathique (accélère, vasoconstriction) → cœur et vaisseaux. Hormones : adrénaline, rénine-angiotensine-aldostérone, ADH.")}
    ${auBac("On te demande souvent un <strong>schéma fonctionnel</strong> de la régulation : place les récepteurs, les voies, les centres et les effecteurs dans des cadres reliés par des flèches, avec des + et des − pour les effets.")}`,
};

// ── Milieu intérieur (S2) ───────────────────────────────────────────────────

export const MILIEU_INTERIEUR: LessonSpec = {
  title: "Composition et rôles du milieu intérieur",
  minutes: 25,
  body: `${objectifs([
      "définir le milieu intérieur et ses compartiments ;",
      "décrire la composition du sang et de la lymphe ;",
      "expliquer les rôles du milieu intérieur.",
    ])}
    ${definition("milieu intérieur", "ensemble des liquides de l’organisme qui baignent les cellules et assurent leurs échanges : le <strong>plasma sanguin</strong>, la <strong>lymphe</strong> et le <strong>liquide interstitiel</strong>.")}
    <h2>1. Les compartiments liquidiens</h2>
    <p>L’eau représente environ 60 % de la masse du corps. Environ deux tiers sont à l’intérieur des cellules (liquide <strong>intracellulaire</strong>) ; un tiers est à l’extérieur (liquide <strong>extracellulaire</strong>) : c’est le milieu intérieur.</p>
    <p>Le plasma traverse en partie la paroi des capillaires et forme le <strong>liquide interstitiel</strong> autour des cellules ; une partie de ce liquide est reprise par les vaisseaux lymphatiques : c’est la <strong>lymphe</strong>, qui retourne au sang.</p>
    <h2>2. Composition du sang</h2>
    ${tableau([
      ["Composant", "Composition ou nombre", "Rôle"],
      ["plasma (55 % du sang)", "eau (90 %), protéines (70 à 80 g/L), glucose (≈ 1 g/L), lipides, sels minéraux, urée, hormones", "transport des nutriments, des déchets, des hormones ; coagulation (fibrinogène) ; défense (anticorps)"],
      ["hématies", "4,5 à 5 millions par mm³", "transport du dioxygène par l’<strong>hémoglobine</strong>"],
      ["leucocytes", "6 000 à 8 000 par mm³", "défense de l’organisme"],
      ["plaquettes", "150 000 à 400 000 par mm³", "coagulation du sang"],
    ])}
    <h2>3. Rôles du milieu intérieur</h2>
    ${liste([
      "<strong>apport</strong> aux cellules du dioxygène et des nutriments (glucose, acides aminés, acides gras) ;",
      "<strong>évacuation</strong> des déchets (CO₂ vers les poumons, urée vers les reins) ;",
      "<strong>transport</strong> des hormones, qui coordonnent les organes ;",
      "<strong>défense</strong> de l’organisme (leucocytes, anticorps) ;",
      "maintien d’un environnement constant pour les cellules.",
    ])}
    <h2>4. Les constantes du milieu intérieur</h2>
    ${tableau([
      ["Paramètre", "Valeur normale"],
      ["glycémie", "≈ 1 g/L à jeun"],
      ["pH du sang", "7,35 à 7,45"],
      ["température centrale", "≈ 37 °C"],
      ["natrémie (Na⁺)", "≈ 3,3 g/L (≈ 140 mmol/L)"],
      ["pression osmotique", "équivalente à une solution de NaCl à 9 g/L (sérum physiologique)"],
    ])}
    ${exercice(
      "Pourquoi le sérum injecté à un malade déshydraté est-il une solution de NaCl à 9 g/L et pas de l’eau pure ?",
      [
        "Le milieu intérieur a une pression osmotique équivalente à celle d’une solution de NaCl à 9 g/L.",
        "De l’eau pure diluerait le plasma : l’eau entrerait dans les hématies, qui gonfleraient et éclateraient (hémolyse).",
        "Une solution à 9 g/L est <strong>isotonique</strong> : elle réhydrate sans perturber les cellules.",
      ],
    )}
    ${retenir("Milieu intérieur = plasma + lymphe + liquide interstitiel. Il apporte, évacue, transporte et défend ; ses constantes doivent rester stables pour que les cellules fonctionnent.")}`,
};

export const HOMEOSTASIE: LessonSpec = {
  title: "Régulation de la constance du milieu intérieur",
  minutes: 35,
  body: `${objectifs([
      "définir l’homéostasie et décrire le schéma général d’une régulation ;",
      "décrire le néphron et la formation de l’urine ;",
      "expliquer le rôle de l’ADH et de l’aldostérone, et la régulation du pH.",
    ])}
    ${definition("homéostasie", "maintien des constantes du milieu intérieur (glycémie, pression, température, pH, teneur en eau et en sels) dans des limites étroites, malgré les variations du milieu extérieur et de l’activité.")}
    ${methode([
      "un <strong>capteur</strong> détecte la valeur du paramètre ;",
      "un <strong>centre intégrateur</strong> la compare à la valeur de consigne ;",
      "il envoie un message <strong>nerveux</strong> ou <strong>hormonal</strong> à des <strong>effecteurs</strong> ;",
      "les effecteurs corrigent l’écart : c’est une <strong>rétroaction négative</strong>.",
    ], "Schéma général d’une régulation")}
    <h2>1. Le rein et la formation de l’urine</h2>
    <p>Chaque rein contient environ un million de <strong>néphrons</strong>. Un néphron comprend un <strong>glomérule</strong> (pelote de capillaires) dans la <strong>capsule de Bowman</strong>, puis un tubule : tube contourné proximal, <strong>anse de Henlé</strong>, tube contourné distal, qui débouche dans un <strong>tube collecteur</strong>.</p>
    ${tableau([
      ["Étape", "Où ?", "Ce qui se passe"],
      ["filtration", "glomérule → capsule de Bowman", "l’eau et les petites molécules passent ; les protéines et les cellules restent dans le sang ; environ 180 L d’<strong>urine primitive</strong> par jour"],
      ["réabsorption", "tubule", "retour vers le sang de l’eau (99 %), de tout le glucose, de la plupart des sels"],
      ["sécrétion", "tubule", "élimination active de certains ions (H⁺, K⁺) et de médicaments"],
      ["résultat", "tube collecteur", "environ 1,5 L d’<strong>urine définitive</strong> par jour"],
    ])}
    ${tableau([
      ["Substance (g/L)", "Plasma", "Urine primitive", "Urine définitive"],
      ["protéines", "70 à 80", "0", "0"],
      ["glucose", "1", "1", "0"],
      ["urée", "0,3", "0,3", "≈ 20"],
    ])}
    <p>Le glucose est entièrement réabsorbé tant que la glycémie reste sous un <strong>seuil rénal</strong> (environ 1,8 g/L). Au-delà, il passe dans l’urine : <strong>glycosurie</strong> (cas du diabète). L’urée est concentrée parce que l’eau est réabsorbée.</p>
    <h2>2. Régulation de la teneur en eau : l’ADH</h2>
    <p>Quand on boit peu ou qu’on transpire, la pression osmotique du plasma augmente. Des <strong>osmorécepteurs</strong> de l’hypothalamus le détectent ; l’hypothalamus fait libérer l’<strong>ADH</strong> (hormone antidiurétique) par la posthypophyse. L’ADH rend le tube collecteur perméable à l’eau : l’eau est réabsorbée, l’urine est peu abondante et concentrée. La soif est déclenchée en même temps. Sans ADH (diabète insipide), on élimine jusqu’à 20 L d’urine diluée par jour.</p>
    <h2>3. Régulation du sodium : l’aldostérone</h2>
    <p>L’<strong>aldostérone</strong>, sécrétée par la corticosurrénale (sous l’action du système rénine-angiotensine), augmente la réabsorption du Na⁺ dans le tube distal ; l’eau suit : la volémie et la pression artérielle augmentent.</p>
    <h2>4. Régulation du pH</h2>
    ${liste([
      "les <strong>systèmes tampons</strong> du sang (bicarbonates, protéines, hémoglobine) limitent immédiatement les variations ;",
      "les <strong>poumons</strong> éliminent le CO₂ (un excès de CO₂ acidifie le sang : la respiration s’accélère) ;",
      "les <strong>reins</strong> éliminent les ions H⁺ et réabsorbent les bicarbonates.",
    ])}
    ${exercice(
      "Un sportif court deux heures sous le soleil sans boire. Son urine devient rare et foncée. Explique ce mécanisme.",
      [
        "La transpiration fait perdre de l’eau : le plasma devient plus concentré (pression osmotique augmentée).",
        "Les osmorécepteurs de l’hypothalamus le détectent ; la posthypophyse libère de l’<strong>ADH</strong>.",
        "L’ADH augmente la réabsorption d’eau dans les tubes collecteurs : l’urine est peu abondante et concentrée (foncée). L’eau est économisée : c’est une rétroaction négative.",
      ],
    )}
    ${retenir("Le rein filtre (glomérule), réabsorbe (tubule) et sécrète. L’ADH règle la réabsorption de l’eau, l’aldostérone celle du sodium. Le pH est maintenu par les tampons, les poumons et les reins.")}
    ${auBac("Pour comparer plasma, urine primitive et urine définitive, raisonne substance par substance : « absente de l’urine primitive » = non filtrée ; « absente de l’urine définitive » = réabsorbée ; « plus concentrée » = eau réabsorbée ou sécrétion.")}`,
};

// ── Régulation de la glycémie ───────────────────────────────────────────────

export const GLYCEMIE: LessonSpec = {
  title: "Régulation de la glycémie",
  minutes: 35,
  body: `${objectifs([
      "définir la glycémie et mettre en évidence sa régulation ;",
      "expliquer le rôle du pancréas endocrine, du foie et des hormones hypo- et hyperglycémiantes ;",
      "décrire la régulation nerveuse et les dysfonctionnements (diabète).",
    ])}
    <h2>1. La glycémie</h2>
    ${definition("glycémie", "concentration du glucose dans le plasma sanguin. Sa valeur normale à jeun est d’environ <strong>1 g/L</strong> (de 0,8 à 1,2 g/L).")}
    <p>Après un repas sucré, la glycémie monte jusqu’à environ 1,4 g/L, puis revient à 1 g/L en 2 à 3 heures ; pendant un jeûne ou un effort, elle reste proche de 1 g/L. Elle est donc <strong>régulée</strong>. Le glucose est indispensable : le cerveau en consomme en permanence.</p>
    <h2>2. Le pancréas, glande endocrine</h2>
    ${tableau([
      ["Expérience", "Résultat", "Conclusion"],
      ["ablation du pancréas chez un chien (von Mering et Minkowski)", "hyperglycémie, glycosurie, urine abondante, soif intense, amaigrissement, puis mort", "le pancréas est indispensable à la régulation"],
      ["ligature du canal pancréatique", "troubles digestifs, mais glycémie normale", "ce n’est pas la fonction digestive (exocrine) qui règle la glycémie"],
      ["greffe d’un pancréas sous la peau d’un chien sans pancréas", "glycémie normale", "le pancréas agit par voie sanguine : par des <strong>hormones</strong>"],
      ["injection d’extraits d’îlots de Langerhans", "la glycémie baisse", "les îlots produisent une hormone hypoglycémiante : l’insuline"],
    ])}
    <p>Les <strong>îlots de Langerhans</strong> contiennent des <strong>cellules β</strong>, qui sécrètent l’<strong>insuline</strong>, et des <strong>cellules α</strong>, qui sécrètent le <strong>glucagon</strong>. Ils détectent eux-mêmes la glycémie.</p>
    <h2>3. Le système hypoglycémiant : l’insuline</h2>
    ${liste([
      "le <strong>foie</strong> et les <strong>muscles</strong> stockent le glucose sous forme de <strong>glycogène</strong> (glycogenèse) ;",
      "le <strong>tissu adipeux</strong> transforme le glucose en graisses (lipogenèse) ;",
      "toutes les cellules absorbent et consomment davantage de glucose.",
    ])}
    ${retenir("L’insuline est la <strong>seule</strong> hormone hypoglycémiante.")}
    <h2>4. Le système hyperglycémiant</h2>
    ${liste([
      "le <strong>glucagon</strong> fait libérer le glucose par le foie (glycogénolyse) et fabriquer du glucose à partir d’acides aminés (néoglucogenèse) ;",
      "l’<strong>adrénaline</strong> (stress, effort) a le même effet rapide ;",
      "le <strong>cortisol</strong> et l’hormone de croissance agissent plus lentement.",
    ])}
    <p>L’expérience du <strong>foie lavé</strong> de Claude Bernard le montre : un foie lavé jusqu’à ce que l’eau ne contienne plus de glucose en libère de nouveau quelques heures plus tard, à partir de son glycogène. Seul le foie peut libérer du glucose dans le sang ; le glycogène musculaire sert au muscle lui-même.</p>
    <h2>5. La régulation nerveuse</h2>
    <p>Claude Bernard a provoqué une hyperglycémie en piquant le plancher du 4<sup>e</sup> ventricule (« piqûre diabétique »). L’<strong>hypothalamus</strong> et le bulbe interviennent : le système sympathique fait libérer l’adrénaline et le glucagon (hyperglycémie) ; le parasympathique (nerf X) stimule la sécrétion d’insuline.</p>
    <h2>6. Dysfonctionnement : le diabète sucré</h2>
    ${tableau([
      ["", "Diabète de type 1", "Diabète de type 2"],
      ["Cause", "les cellules β sont détruites (maladie auto-immune) : plus d’insuline", "l’insuline agit mal (insulinorésistance), puis le pancréas s’épuise"],
      ["Qui ?", "souvent l’enfant ou l’adulte jeune", "souvent l’adulte, avec surpoids et sédentarité"],
      ["Traitement", "injections d’insuline à vie", "alimentation équilibrée, activité physique, médicaments, parfois insuline"],
    ])}
    <p>Signes : hyperglycémie, glycosurie, urines abondantes, soif, faim, amaigrissement. Complications à long terme : atteintes des yeux, des reins, des nerfs, plaies du pied qui guérissent mal. À l’inverse, une <strong>hypoglycémie</strong> (sous 0,6 g/L) provoque malaise, sueurs et peut aller jusqu’au coma : il faut donner du sucre.</p>
    ${exercice(
      "On mesure chez un homme la glycémie et l’insulinémie après absorption de 75 g de glucose : la glycémie passe de 0,9 à 1,5 g/L en 30 min puis revient à 0,9 g/L en 2 h 30 ; l’insuline augmente fortement entre 15 et 60 min. Interprète.",
      [
        "L’absorption intestinale du glucose fait monter la glycémie (hyperglycémie).",
        "Les cellules β détectent cette hausse et sécrètent de l’insuline : l’insulinémie augmente juste après la glycémie.",
        "L’insuline fait stocker le glucose (glycogène dans le foie et les muscles) et augmente sa consommation : la glycémie revient à sa valeur normale. C’est une régulation par rétroaction négative.",
      ],
    )}
    ${retenir("Hyperglycémie → cellules β → insuline → stockage du glucose (foie, muscles, tissu adipeux). Hypoglycémie → cellules α → glucagon → libération du glucose par le foie. Le diabète est une glycémie durablement trop élevée.")}
    ${auBac("Dans un exercice avec des courbes de glycémie et d’hormones, compare toujours l’ordre chronologique : une hormone qui augmente <strong>après</strong> la glycémie en est la réponse, pas la cause.")}`,
};
