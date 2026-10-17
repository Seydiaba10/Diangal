// SVT de Terminale : relations de l'organisme avec le milieu, activité cardiaque, milieu intérieur
// et glycémie (programmes L2, S1 et S2, Office du Bac). Une même leçon sert aux séries dont le
// programme la contient. Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { exemple, formula, type LessonSpec, liste, methode, retenir, tableau } from "./blocks";

export const ENCEPHALE: LessonSpec = {
  title: "Organisation de l’encéphale",
  minutes: 12,
  body: `<p>Le système nerveux central (encéphale et moelle épinière) est protégé par des os (boîte crânienne, colonne vertébrale), par trois <strong>méninges</strong> (dure-mère, arachnoïde, pie-mère) et par le <strong>liquide céphalorachidien</strong>, qui amortit les chocs.</p>
    ${tableau([
      ["Partie de l’encéphale", "Rôles principaux"],
      ["cerveau (deux hémisphères)", "sensations conscientes, mouvements volontaires, mémoire, langage"],
      ["cervelet", "équilibre et coordination des mouvements"],
      ["tronc cérébral (bulbe rachidien…)", "centres de la respiration, du rythme cardiaque, de la pression artérielle"],
    ])}
    <p>Sur une coupe, on distingue la <strong>substance grise</strong> (corps cellulaires des neurones), en surface dans le cortex cérébral, et la <strong>substance blanche</strong> (fibres nerveuses), à l’intérieur.</p>
    ${retenir("Dans le cerveau, la substance grise est à l’extérieur (cortex) et la substance blanche à l’intérieur : c’est l’inverse de la moelle épinière.")}
    ${exemple(["La méningite est une inflammation des méninges ; on la diagnostique par une ponction de liquide céphalorachidien."], "Santé")}`,
};

export const MOELLE: LessonSpec = {
  title: "Organisation de la moelle épinière",
  minutes: 12,
  body: `<p>La moelle épinière est un cordon nerveux logé dans le canal vertébral. Sur une coupe transversale, on voit la <strong>substance grise</strong> en forme de papillon (ou de H) au centre, entourée de <strong>substance blanche</strong>, avec le canal de l’épendyme au milieu.</p>
    ${liste([
      "de chaque côté partent des <strong>nerfs rachidiens</strong> (31 paires chez l’Homme) ;",
      "chaque nerf rachidien naît par une <strong>racine dorsale</strong> (sensitive), qui porte un ganglion spinal, et une <strong>racine ventrale</strong> (motrice) ;",
      "les cornes dorsales de la substance grise reçoivent les messages sensitifs ; les cornes ventrales contiennent les corps cellulaires des motoneurones.",
    ])}
    ${retenir("La moelle épinière est à la fois un centre nerveux (réflexes) et une voie de conduction entre l’encéphale et le reste du corps.")}
    ${exemple(["Expériences de section : couper la racine dorsale supprime la sensibilité du territoire du nerf ; couper la racine ventrale entraîne une paralysie."])}`,
};

export const STRUCTURE_TISSU_NERVEUX: LessonSpec = {
  title: "Structure du tissu nerveux",
  minutes: 12,
  body: `<p>L’unité du tissu nerveux est le <strong>neurone</strong>, cellule formée d’un corps cellulaire (avec le noyau), de prolongements courts et ramifiés, les <strong>dendrites</strong>, et d’un prolongement long, l’<strong>axone</strong>, terminé par des arborisations.</p>
    ${liste([
      "une <strong>fibre nerveuse</strong> est un axone (ou une longue dendrite) entouré ou non d’une gaine de myéline, interrompue aux nœuds de Ranvier ;",
      "un <strong>nerf</strong> est un ensemble de fibres nerveuses regroupées en faisceaux, entourés de tissu conjonctif ;",
      "les neurones peuvent être sensitifs, moteurs (motoneurones) ou d’association.",
    ])}
    ${tableau([
      ["Fibre", "Caractéristiques"],
      ["myélinisée", "gaine de myéline (cellules de Schwann) et nœuds de Ranvier"],
      ["amyélinisée", "pas de myéline"],
    ])}
    ${retenir("Le neurone ne se divise plus chez l’adulte : un neurone détruit n’est pas remplacé.")}`,
};

export const PROPRIETES_TISSU_NERVEUX: LessonSpec = {
  title: "Propriétés du tissu nerveux",
  minutes: 12,
  body: `<p>Le tissu nerveux a deux propriétés : l’<strong>excitabilité</strong> (capacité à réagir à un stimulus en produisant un message nerveux, l’influx) et la <strong>conductibilité</strong> (capacité à propager ce message).</p>
    ${liste([
      "un stimulus efficace doit atteindre une intensité minimale, le <strong>seuil</strong> ; la rhéobase est l’intensité seuil pour un stimulus de longue durée ;",
      "la <strong>chronaxie</strong> est la durée minimale d’un stimulus d’intensité double de la rhéobase pour qu’il soit efficace : elle mesure l’excitabilité ;",
      "une <strong>fibre</strong> isolée obéit à la loi du « tout ou rien » ; un <strong>nerf</strong>, formé de fibres de seuils différents, donne une réponse qui augmente avec l’intensité (recrutement) jusqu’à un maximum.",
    ])}
    ${retenir("Plus la chronaxie est courte, plus le tissu est excitable. Après une excitation, la fibre est inexcitable pendant une courte période réfractaire.")}`,
};

export const PHENOMENES_ELECTRIQUES: LessonSpec = {
  title: "Phénomènes électriques liés à l’influx nerveux",
  minutes: 15,
  body: `<p>Avec une microélectrode implantée dans l’axone et une autre à la surface, un oscilloscope révèle une différence de potentiel.</p>
    ${liste([
      "<strong>potentiel de repos</strong> : environ −70 mV ; l’intérieur de la fibre est négatif par rapport à l’extérieur (membrane polarisée) ;",
      "<strong>potentiel d’action</strong> : après une stimulation efficace, la membrane se dépolarise brutalement (jusqu’à +30 mV environ), puis se repolarise en 1 à 2 ms.",
    ])}
    ${tableau([
      ["Phase", "Mouvement d’ions"],
      ["repos", "inégale répartition : K⁺ plus concentré à l’intérieur, Na⁺ à l’extérieur ; pompe Na⁺/K⁺ (consomme de l’ATP)"],
      ["dépolarisation", "entrée massive de Na⁺"],
      ["repolarisation", "sortie de K⁺"],
    ])}
    ${retenir("Le potentiel d’action a toujours la même amplitude : l’intensité du stimulus est codée par la <strong>fréquence</strong> des potentiels d’action.")}`,
};

export const CONDUCTION_INFLUX: LessonSpec = {
  title: "Conduction de l’influx nerveux",
  minutes: 12,
  body: `<p>Le potentiel d’action créé en un point dépolarise la zone voisine, qui produit à son tour un potentiel d’action : l’influx se propage sans s’affaiblir, dans un seul sens (la zone qui vient d’être active est réfractaire).</p>
    ${tableau([
      ["Fibre", "Mode de conduction", "Vitesse"],
      ["amyélinisée", "de proche en proche (continue)", "lente : 0,5 à 2 m/s"],
      ["myélinisée", "saltatoire : de nœud de Ranvier en nœud de Ranvier", "rapide : jusqu’à 100 m/s et plus"],
    ])}
    ${liste([
      "la vitesse augmente avec le diamètre de la fibre ;",
      "on la mesure en stimulant le nerf et en enregistrant la réponse à deux distances différentes : v = d ÷ Δt.",
    ])}
    ${exemple(["Deux électrodes réceptrices distantes de 4 cm enregistrent le potentiel d’action à 0,5 ms d’intervalle : v = 0,04 ÷ 0,0005 = 80 m/s."])}
    ${retenir("Dans la sclérose en plaques, la myéline est détruite : la conduction ralentit ou se bloque.")}`,
};

export const SYNAPSE: LessonSpec = {
  title: "La transmission synaptique",
  minutes: 15,
  body: `<p>Une <strong>synapse</strong> est la zone de contact entre deux neurones, ou entre un neurone et une cellule effectrice (la plaque motrice, avec un muscle). Elle comprend un élément présynaptique, une fente synaptique et un élément postsynaptique.</p>
    ${methode([
      "Le potentiel d’action arrive à la terminaison présynaptique.",
      "Des vésicules libèrent un <strong>neurotransmetteur</strong> (acétylcholine, noradrénaline…) dans la fente (exocytose, déclenchée par l’entrée de Ca²⁺).",
      "Le neurotransmetteur se fixe sur des récepteurs de la membrane postsynaptique et modifie sa perméabilité aux ions.",
      "Il est ensuite détruit (enzyme comme l’acétylcholinestérase) ou recapturé.",
    ], "Fonctionnement d’une synapse chimique")}
    ${liste([
      "synapse <strong>excitatrice</strong> : dépolarisation (PPSE) ; synapse <strong>inhibitrice</strong> : hyperpolarisation (PPSI) ;",
      "le neurone postsynaptique fait la <strong>sommation</strong> (spatiale et temporelle) des messages reçus : il n’émet un potentiel d’action que si le seuil est atteint ;",
      "la transmission est unidirectionnelle et marquée par un délai synaptique (environ 0,5 ms).",
    ])}
    ${retenir("De nombreuses drogues et médicaments agissent sur les synapses (curare, nicotine, morphine) : la toxicomanie modifie durablement leur fonctionnement.")}`,
};

export const REFLEXES: LessonSpec = {
  title: "Mouvements involontaires ou réflexes",
  minutes: 12,
  body: `<p>Un <strong>réflexe</strong> est une réponse involontaire, rapide et stéréotypée à une stimulation.</p>
    ${liste([
      "réflexe <strong>inné</strong> (inconditionnel) : présent dès la naissance chez tous les individus de l’espèce (réflexe rotulien, retrait de la main) ;",
      "réflexe <strong>conditionnel</strong> (acquis) : établi par apprentissage, en associant un stimulus neutre à un stimulus absolu (expériences de Pavlov sur le chien et la salivation).",
    ])}
    ${retenir("L’arc réflexe comprend : récepteur → neurone sensitif (fibre afférente) → centre nerveux (moelle épinière) → motoneurone (fibre efférente) → effecteur (muscle).")}
    ${exemple([
      "Réflexe myotatique : un coup de marteau sur le tendon étire le quadriceps ; les fuseaux neuromusculaires envoient un message qui, par une seule synapse dans la moelle, fait contracter ce même muscle.",
      "En même temps, le muscle antagoniste (ischio-jambiers) est relâché grâce à un interneurone inhibiteur.",
    ])}`,
};

export const MOUVEMENTS_VOLONTAIRES: LessonSpec = {
  title: "Mouvements volontaires",
  minutes: 12,
  body: `<p>Un mouvement volontaire est décidé et commandé par le <strong>cortex cérébral</strong>.</p>
    ${liste([
      "l’<strong>aire motrice</strong> (en avant du sillon de Rolando) commande les muscles ; chaque partie du corps y est représentée (homonculus moteur) ;",
      "l’<strong>aire sensitive</strong>, en arrière du sillon, reçoit les sensations ;",
      "les fibres de la voie motrice (faisceau pyramidal) se croisent : l’hémisphère gauche commande la moitié droite du corps ;",
      "elles font synapse avec les motoneurones de la moelle, qui commandent les muscles.",
    ])}
    ${retenir("Un accident vasculaire cérébral (AVC) dans l’hémisphère gauche peut paralyser le côté droit du corps (hémiplégie).")}
    <p>Le cervelet coordonne les mouvements et l’équilibre ; l’apprentissage (marcher, écrire) rend certains gestes automatiques.</p>`,
};

export const STRUCTURE_MUSCLE: LessonSpec = {
  title: "Structure du muscle strié squelettique",
  minutes: 12,
  body: `<p>Un muscle squelettique est formé de faisceaux de <strong>fibres musculaires</strong> : ce sont de très longues cellules à plusieurs noyaux.</p>
    ${liste([
      "chaque fibre contient des <strong>myofibrilles</strong> qui présentent une alternance de bandes claires (I) et sombres (A) : d’où le nom de muscle strié ;",
      "l’unité de base est le <strong>sarcomère</strong>, délimité par deux stries Z ;",
      "il contient des filaments fins d’<strong>actine</strong> et des filaments épais de <strong>myosine</strong>.",
    ])}
    ${retenir("Une <strong>unité motrice</strong> est l’ensemble formé par un motoneurone et toutes les fibres musculaires qu’il commande, au niveau des plaques motrices (jonctions neuromusculaires).")}`,
};

export const FONCTIONNEMENT_MUSCLE: LessonSpec = {
  title: "Fonctionnement du muscle squelettique",
  minutes: 18,
  body: `<h2>Phénomènes mécaniques</h2>
    <p>Au myographe, une stimulation efficace donne une <strong>secousse musculaire</strong> : temps de latence, contraction, relâchement. Des stimulations rapprochées donnent une fusion des secousses, puis un <strong>tétanos</strong> (contraction soutenue, imparfait puis parfait).</p>
    <h2>Mécanisme de la contraction</h2>
    ${methode([
      "Le potentiel d’action musculaire libère des ions Ca²⁺ stockés dans la fibre.",
      "Le calcium permet aux têtes de myosine de se fixer sur l’actine.",
      "En hydrolysant l’ATP, les têtes de myosine pivotent et font glisser les filaments d’actine : les sarcomères raccourcissent.",
    ])}
    <h2>Phénomènes énergétiques et thermiques</h2>
    ${tableau([
      ["Voie de régénération de l’ATP", "Caractéristiques"],
      ["phosphocréatine", "immédiate, très courte (sprint)"],
      ["fermentation lactique (sans O₂)", "rapide, peu rentable (2 ATP par glucose), produit de l’acide lactique (crampes)"],
      ["respiration (avec O₂)", "plus lente, très rentable (36 à 38 ATP par glucose), efforts longs"],
    ])}
    ${formula("C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + énergie")}
    ${retenir("La contraction dégage de la chaleur : une chaleur initiale pendant la contraction, puis une chaleur retardée liée à la régénération de l’ATP.")}`,
};

export const AUTOMATISME_CARDIAQUE: LessonSpec = {
  title: "L’automatisme cardiaque",
  minutes: 12,
  body: `<p>Un cœur isolé et irrigué continue à battre : il est <strong>automatique</strong>. Cette activité naît dans le <strong>tissu nodal</strong>.</p>
    ${liste([
      "le <strong>nœud sinusal</strong> (oreillette droite) donne le rythme : c’est le « pacemaker » naturel ;",
      "l’excitation gagne les oreillettes, puis le <strong>nœud auriculo-ventriculaire</strong>, le <strong>faisceau de His</strong> et le réseau de Purkinje, qui la distribuent aux ventricules.",
    ])}
    ${tableau([
      ["Phase du cycle cardiaque", "Événement"],
      ["systole auriculaire", "les oreillettes se contractent et remplissent les ventricules"],
      ["systole ventriculaire", "les ventricules éjectent le sang dans les artères ; les valvules auriculo-ventriculaires sont fermées"],
      ["diastole", "relâchement général ; le cœur se remplit"],
    ])}
    ${retenir("L’électrocardiogramme (ECG) enregistre l’activité électrique du cœur : onde P (oreillettes), complexe QRS (ventricules), onde T.")}`,
};

export const PRESSION_ARTERIELLE: LessonSpec = {
  title: "Activité cardiaque et régulation de la pression artérielle",
  minutes: 18,
  body: `<p>La <strong>pression artérielle</strong> est la pression du sang dans les artères. Elle varie entre une valeur maximale (systolique, environ 12 cmHg) et minimale (diastolique, environ 8 cmHg). Elle dépend du débit cardiaque et de la résistance des vaisseaux.</p>
    ${methode([
      "Des <strong>barorécepteurs</strong> du sinus carotidien et de la crosse aortique mesurent la pression.",
      "Ils envoient des messages par les nerfs de Hering et de Cyon aux <strong>centres bulbaires</strong>.",
      "Si la pression augmente, le centre cardiomodérateur active le nerf parasympathique (pneumogastrique, X) : le cœur ralentit et la pression baisse.",
      "Si la pression baisse, le système sympathique accélère le cœur et contracte les artérioles (vasoconstriction).",
    ], "Régulation nerveuse (réflexe)")}
    ${liste([
      "régulation hormonale : l’<strong>adrénaline</strong> accélère le cœur ; le système rénine-angiotensine-aldostérone fait remonter la pression ;",
      "l’hypertension artérielle augmente les risques d’AVC et d’infarctus.",
    ])}
    ${retenir("L’<strong>athérosclérose</strong> est un dépôt de graisses (cholestérol) dans la paroi des artères. Prévention : alimentation pauvre en sel et en graisses, activité physique, pas de tabac.")}`,
};

export const MILIEU_INTERIEUR: LessonSpec = {
  title: "Composition et rôles du milieu intérieur",
  minutes: 12,
  body: `<p>Le <strong>milieu intérieur</strong> est l’ensemble des liquides qui baignent les cellules : le <strong>plasma</strong> (partie liquide du sang), la <strong>lymphe</strong> et le <strong>liquide interstitiel</strong>.</p>
    ${tableau([
      ["Composant du sang", "Rôle"],
      ["plasma : eau, sels minéraux, glucose, protéines…", "transport des nutriments, des déchets, des hormones"],
      ["hématies (globules rouges)", "transport du dioxygène (hémoglobine)"],
      ["leucocytes (globules blancs)", "défense de l’organisme"],
      ["plaquettes", "coagulation"],
    ])}
    ${retenir("Le milieu intérieur apporte aux cellules ce dont elles ont besoin et emporte leurs déchets ; sa composition doit rester à peu près constante.")}
    ${exemple(["Valeurs normales : glycémie ≈ 1 g/L ; pH du sang ≈ 7,4 ; température ≈ 37 °C."])}`,
};

export const HOMEOSTASIE: LessonSpec = {
  title: "Régulation de la constance du milieu intérieur",
  minutes: 15,
  body: `<p>L’<strong>homéostasie</strong> est le maintien des constantes du milieu intérieur (glycémie, pression, température, pH, concentration en sels) malgré les variations extérieures.</p>
    ${methode([
      "Un <strong>capteur</strong> détecte l’écart à la valeur de consigne.",
      "Un <strong>centre intégrateur</strong> (souvent l’hypothalamus ou le bulbe) compare et envoie un message nerveux ou hormonal.",
      "Des <strong>effecteurs</strong> corrigent l’écart : c’est une rétroaction négative.",
    ], "Schéma d’une régulation")}
    ${exemple([
      "Quand on boit peu, la concentration du plasma augmente ; l’hypothalamus fait libérer l’<strong>ADH</strong> (hormone antidiurétique), qui fait réabsorber l’eau par le rein : l’urine est concentrée.",
      "Le rein élimine aussi l’urée et maintient la concentration en sels.",
    ])}
    ${retenir("Le rein filtre le sang, réabsorbe ce qui est utile et rejette les déchets : il joue un rôle central dans l’homéostasie.")}`,
};

export const GLYCEMIE: LessonSpec = {
  title: "Régulation de la glycémie",
  minutes: 15,
  body: `<p>La <strong>glycémie</strong> est le taux de glucose dans le sang : environ 1 g/L à jeun (0,8 à 1,2 g/L). Le glucose est la principale source d’énergie des cellules.</p>
    ${tableau([
      ["Situation", "Hormone pancréatique", "Effet"],
      ["hyperglycémie (après un repas)", "<strong>insuline</strong> (cellules β des îlots de Langerhans)", "stockage du glucose en glycogène (foie, muscles) ; la glycémie baisse"],
      ["hypoglycémie (jeûne, effort)", "<strong>glucagon</strong> (cellules α)", "le foie libère du glucose (glycogénolyse) ; la glycémie remonte"],
    ])}
    ${retenir("L’insuline est la seule hormone hypoglycémiante ; glucagon, adrénaline et cortisol sont hyperglycémiants. Le foie est l’organe de stockage et de libération du glucose.")}
    <h2>Le diabète</h2>
    ${liste([
      "diabète de type 1 : le pancréas ne produit plus d’insuline ; traitement par injections d’insuline ;",
      "diabète de type 2 : l’insuline agit mal (souvent lié au surpoids et à la sédentarité) ; régime, activité physique, médicaments.",
    ])}`,
};
