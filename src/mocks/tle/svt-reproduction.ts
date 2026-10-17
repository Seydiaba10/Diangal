// SVT de Terminale : immunologie, reproduction, génétique, hérédité humaine et biotechnologies
// (programmes L2, S1 et S2, Office du Bac). Leçons rédigées par DIANGAL, à faire valider par un
// enseignant.

import { exemple, formula, type LessonSpec, liste, methode, retenir, tableau } from "./blocks";

// ── Immunologie ─────────────────────────────────────────────────────────────

export const SYSTEME_IMMUNITAIRE: LessonSpec = {
  title: "Le système immunitaire",
  minutes: 12,
  body: `<p>Le système immunitaire distingue le <strong>soi</strong> (ce qui appartient à l’organisme, marqué par les molécules du CMH à la surface des cellules) du <strong>non-soi</strong> (microbes, cellules étrangères, cellules anormales). Une molécule reconnue comme étrangère est un <strong>antigène</strong>.</p>
    ${tableau([
      ["Organes lymphoïdes", "Rôle"],
      ["moelle osseuse", "production de toutes les cellules immunitaires ; maturation des lymphocytes B"],
      ["thymus", "maturation des lymphocytes T"],
      ["ganglions, rate, amygdales", "rencontre des lymphocytes et des antigènes"],
    ])}
    ${tableau([
      ["Cellule", "Rôle"],
      ["macrophages, granulocytes", "phagocytose ; présentation des antigènes"],
      ["lymphocytes B", "produisent les anticorps (plasmocytes)"],
      ["lymphocytes T4 (auxiliaires)", "coordonnent la réponse"],
      ["lymphocytes T8 (cytotoxiques)", "détruisent les cellules infectées"],
    ])}`,
};

export const REPONSE_IMMUNITAIRE: LessonSpec = {
  title: "La réponse immunitaire",
  minutes: 18,
  body: `<h2>Réponse non spécifique (immédiate)</h2>
    <p>Barrières naturelles (peau, muqueuses), puis <strong>réaction inflammatoire</strong> (rougeur, chaleur, gonflement, douleur) et <strong>phagocytose</strong> des microbes par les macrophages et les granulocytes.</p>
    <h2>Réponse spécifique (adaptative)</h2>
    ${methode([
      "Reconnaissance : chaque lymphocyte porte des récepteurs spécifiques d’un antigène ; les macrophages présentent l’antigène aux LT4.",
      "Activation et multiplication des lymphocytes sélectionnés (sélection clonale), stimulées par les interleukines des LT4.",
      "Action : les LB deviennent des <strong>plasmocytes</strong> qui sécrètent des <strong>anticorps</strong> (réponse humorale) ; les LT8 deviennent des LT cytotoxiques qui détruisent les cellules infectées (réponse cellulaire).",
      "Élimination : les complexes antigène-anticorps sont phagocytés.",
    ])}
    ${retenir("Après une première rencontre, des cellules <strong>mémoire</strong> persistent : la réponse secondaire est plus rapide, plus forte et plus durable. C’est la base de la vaccination.")}
    ${formula("Anticorps (immunoglobuline) : molécule en Y, avec deux sites de fixation spécifiques de l’antigène")}`,
};

export const VIH_SIDA: LessonSpec = {
  title: "Le VIH et le sida",
  minutes: 12,
  body: `<p>Le <strong>VIH</strong> (virus de l’immunodéficience humaine) est un rétrovirus qui infecte surtout les <strong>lymphocytes T4</strong>, chefs d’orchestre de la réponse immunitaire.</p>
    ${tableau([
      ["Phase", "Ce qui se passe"],
      ["primo-infection", "le virus se multiplie ; symptômes proches d’une grippe ; apparition des anticorps (séropositivité)"],
      ["phase asymptomatique (plusieurs années)", "le virus se multiplie ; les LT4 diminuent lentement"],
      ["sida", "LT4 effondrés (moins de 200/mm³) : maladies opportunistes (tuberculose, candidose…)"],
    ])}
    ${liste([
      "transmission : rapports sexuels non protégés, sang (seringues, objets coupants), de la mère à l’enfant ;",
      "dépistage : test sanguin de recherche des anticorps, gratuit et confidentiel au Sénégal ;",
      "traitement : les antirétroviraux bloquent la multiplication du virus mais ne le font pas disparaître.",
    ])}
    ${retenir("Prévention : préservatif, fidélité ou abstinence, matériel stérile, traitement de la femme enceinte séropositive. Le VIH ne se transmet ni par la salive, ni par une poignée de main, ni par les moustiques.")}`,
};

export const AIDES_IMMUNITE: LessonSpec = {
  title: "Aides à la réponse immunitaire",
  minutes: 12,
  body: `${tableau([
      ["", "Vaccination", "Sérothérapie"],
      ["Principe", "injection d’un antigène rendu inoffensif", "injection d’anticorps déjà fabriqués"],
      ["Immunité", "active, apparaît en quelques semaines", "passive, immédiate"],
      ["Durée", "longue (cellules mémoire), avec rappels", "courte (quelques semaines)"],
      ["Rôle", "prévention", "traitement d’urgence (tétanos, venin de serpent)"],
    ])}
    ${retenir("Le Programme élargi de vaccination (PEV) protège les enfants contre la tuberculose, la rougeole, la poliomyélite, le tétanos, la diphtérie, la coqueluche, l’hépatite B…")}
    ${liste([
      "greffes : un greffon étranger est rejeté ; on cherche un donneur compatible (CMH proche) et on donne des immunosuppresseurs ;",
      "transfusions : il faut respecter la compatibilité des groupes sanguins ABO et Rhésus.",
    ])}`,
};

// ── Reproduction ────────────────────────────────────────────────────────────

export const GAMETOGENESE: LessonSpec = {
  title: "Appareils reproducteurs et gamétogenèse",
  minutes: 18,
  body: `<p>Les <strong>gonades</strong> (testicules, ovaires) produisent les gamètes et des hormones sexuelles.</p>
    ${tableau([
      ["", "Spermatogenèse (testicule)", "Ovogenèse (ovaire)"],
      ["Lieu", "tubes séminifères", "follicules ovariens"],
      ["Période", "en continu à partir de la puberté", "commence avant la naissance, un ovocyte par cycle de la puberté à la ménopause"],
      ["Produit", "4 spermatozoïdes par cellule souche", "1 ovocyte (et des globules polaires)"],
    ])}
    ${methode([
      "Multiplication : les cellules souches (2n chromosomes) se multiplient par mitose.",
      "Accroissement : les cellules grossissent.",
      "Maturation : la <strong>méiose</strong> (deux divisions successives) donne des cellules à n chromosomes.",
      "Différenciation : formation du spermatozoïde (tête, pièce intermédiaire, flagelle).",
    ], "Étapes de la gamétogenèse")}
    ${retenir("La méiose réduit de moitié le nombre de chromosomes (46 → 23 chez l’Homme) et brasse l’information génétique : chaque gamète est unique.")}`,
};

export const FECONDATION: LessonSpec = {
  title: "Fécondation et problèmes liés à la fécondation",
  minutes: 12,
  body: `<p>La <strong>fécondation</strong> a lieu dans le tiers supérieur de la trompe : un seul spermatozoïde traverse la zone pellucide grâce aux enzymes de son acrosome, puis son noyau fusionne avec celui de l’ovocyte. La cellule-œuf (2n = 46) est formée.</p>
    ${liste([
      "la fécondation rétablit la diploïdie et détermine le sexe (XX fille, XY garçon, selon le spermatozoïde) ;",
      "la cellule-œuf se divise, et l’embryon s’implante dans l’utérus vers le 7<sup>e</sup> jour (nidation).",
    ])}
    <h2>Problèmes liés à la fécondation</h2>
    ${liste([
      "stérilité masculine (spermatozoïdes peu nombreux ou peu mobiles) ou féminine (trompes bouchées, souvent après une infection sexuellement transmissible) ;",
      "procréation médicalement assistée : insémination artificielle, fécondation in vitro (FIV) ;",
      "grossesse extra-utérine : l’embryon s’implante dans la trompe (urgence médicale).",
    ])}
    ${retenir("Les vrais jumeaux viennent d’une seule cellule-œuf qui s’est séparée en deux ; les faux jumeaux, de deux ovocytes fécondés par deux spermatozoïdes.")}`,
};

export const REGULATION_REPRODUCTION: LessonSpec = {
  title: "Régulation hormonale des appareils reproducteurs",
  minutes: 18,
  body: `<p>L’<strong>hypothalamus</strong> sécrète la GnRH, qui stimule l’<strong>hypophyse</strong>. Celle-ci libère deux hormones, FSH et LH, qui agissent sur les gonades.</p>
    <h2>Chez l’homme</h2>
    <p>FSH stimule la spermatogenèse ; LH fait sécréter la <strong>testostérone</strong>. Celle-ci exerce un rétrocontrôle négatif sur l’hypothalamus et l’hypophyse : son taux reste à peu près constant.</p>
    <h2>Chez la femme : le cycle de 28 jours</h2>
    ${tableau([
      ["Phase", "Ovaire", "Utérus"],
      ["folliculaire (J1 à J14)", "croissance d’un follicule qui sécrète les œstrogènes", "règles, puis épaississement de la muqueuse"],
      ["ovulation (J14)", "pic de LH : le follicule libère l’ovocyte", ""],
      ["lutéale (J14 à J28)", "le corps jaune sécrète progestérone et œstrogènes", "la muqueuse devient prête à recevoir un embryon"],
    ])}
    ${retenir("Sans fécondation, le corps jaune dégénère : la chute de progestérone déclenche les règles. Les œstrogènes exercent un rétrocontrôle négatif, sauf avant l’ovulation où un taux élevé provoque le pic de LH (rétrocontrôle positif).")}`,
};

export const GESTATION: LessonSpec = {
  title: "Gestation et accouchement",
  minutes: 12,
  body: `<p>Après la nidation, l’embryon (puis le fœtus à partir du 3<sup>e</sup> mois) se développe dans l’utérus pendant 9 mois. Le <strong>placenta</strong> assure les échanges avec la mère : dioxygène et nutriments vers le fœtus, CO₂ et déchets vers la mère, sans mélange des sangs.</p>
    ${liste([
      "l’hormone hCG produite par l’embryon maintient le corps jaune au début de la grossesse (c’est elle que détectent les tests de grossesse) ;",
      "ensuite, le placenta produit lui-même progestérone et œstrogènes ;",
      "alcool, tabac, certains médicaments et des microbes traversent le placenta : danger pour le fœtus.",
    ])}
    ${retenir("À l’accouchement, l’ocytocine (hypophyse) provoque les contractions de l’utérus. Les consultations prénatales permettent de suivre la grossesse.")}`,
};

export const LACTATION: LessonSpec = {
  title: "La lactation",
  minutes: 10,
  body: `<p>Pendant la grossesse, les œstrogènes et la progestérone développent les glandes mammaires. Après l’accouchement, la <strong>prolactine</strong> (hypophyse) déclenche la production de lait ; la tétée stimule la sécrétion d’<strong>ocytocine</strong>, qui provoque l’éjection du lait.</p>
    ${liste([
      "le colostrum des premiers jours est riche en anticorps : il protège le nouveau-né ;",
      "le lait maternel est adapté aux besoins du bébé et gratuit ;",
      "l’OMS recommande l’allaitement exclusif jusqu’à 6 mois.",
    ])}
    ${retenir("C’est un réflexe neuro-hormonal : la succion du mamelon envoie un message nerveux à l’hypothalamus, qui fait libérer prolactine et ocytocine.")}`,
};

export const CONTRACEPTION: LessonSpec = {
  title: "Quelques méthodes contraceptives",
  minutes: 12,
  body: `${tableau([
      ["Méthode", "Principe"],
      ["pilule œstroprogestative", "bloque l’ovulation par rétrocontrôle négatif sur l’hypophyse"],
      ["implant, injection", "libèrent un progestatif qui bloque l’ovulation et épaissit la glaire du col"],
      ["dispositif intra-utérin (stérilet)", "empêche la nidation et gêne les spermatozoïdes"],
      ["préservatif masculin ou féminin", "barrière mécanique ; protège aussi des IST et du VIH"],
      ["méthodes naturelles (calendrier, températures)", "abstinence autour de l’ovulation ; peu fiables"],
    ])}
    ${retenir("Le préservatif est la seule méthode qui protège à la fois de la grossesse et des infections sexuellement transmissibles. Le choix d’une méthode se fait avec un personnel de santé.")}`,
};

export const REPRODUCTION_SPERMAPHYTES: LessonSpec = {
  title: "Reproduction des plantes à fleurs",
  minutes: 15,
  body: `<p>La <strong>fleur</strong> porte les organes reproducteurs : les <strong>étamines</strong> (organes mâles) produisent le pollen ; le <strong>pistil</strong> (organe femelle) contient les ovules dans l’ovaire.</p>
    ${methode([
      "<strong>Pollinisation</strong> : le pollen est transporté sur le stigmate par le vent, les insectes ou l’Homme.",
      "Le grain de pollen germe : un tube pollinique descend dans le style jusqu’à l’ovule.",
      "<strong>Double fécondation</strong> : un gamète mâle féconde l’oosphère (→ embryon), l’autre s’unit aux noyaux centraux (→ albumen, réserves).",
      "L’ovule devient la <strong>graine</strong> et l’ovaire devient le <strong>fruit</strong>.",
    ])}
    ${retenir("La graine germe dans de bonnes conditions (eau, chaleur, air) et donne une nouvelle plante. Les plantes peuvent aussi se reproduire sans fécondation : bouturage, marcottage, greffage.")}
    ${exemple(["Le manguier, l’arachide ou le mil sont des spermaphytes ; l’arachide enfouit ses fruits dans le sol (géocarpie)."])}`,
};

// ── Génétique ───────────────────────────────────────────────────────────────

export const LOIS_MENDEL: LessonSpec = {
  title: "Lois statistiques de la transmission des caractères",
  minutes: 20,
  body: `<p>Un <strong>gène</strong> occupe un locus sur un chromosome ; ses différentes versions sont les <strong>allèles</strong>. Un individu diploïde possède deux allèles de chaque gène : homozygote s’ils sont identiques, hétérozygote sinon. Un allèle <strong>dominant</strong> s’exprime chez l’hétérozygote, un allèle <strong>récessif</strong> non.</p>
    <h2>Monohybridisme</h2>
    ${exemple([
      "On croise deux lignées pures de pois : graines lisses [L] × ridées [r]. Toute la F1 est lisse : L domine r.",
      "F1 × F1 (L//r × L//r) : la F2 donne 3/4 [L] et 1/4 [r].",
      "Croisement-test (F1 × parent récessif) : 1/2 [L], 1/2 [r], ce qui prouve que la F1 est hétérozygote.",
    ])}
    ${retenir("1<sup>re</sup> loi de Mendel : la F1 issue de deux lignées pures est homogène. 2<sup>e</sup> loi : chaque gamète ne reçoit qu’un allèle de chaque gène (pureté des gamètes).")}
    <h2>Dihybridisme</h2>
    ${liste([
      "deux gènes <strong>indépendants</strong> (sur des chromosomes différents) : F2 en proportions 9/16, 3/16, 3/16, 1/16 ; croisement-test : 4 phénotypes à 25 % ;",
      "deux gènes <strong>liés</strong> (sur le même chromosome) : croisement-test avec deux phénotypes parentaux majoritaires et deux phénotypes recombinés minoritaires, dus au <strong>crossing-over</strong>.",
    ])}
    ${formula("Distance entre deux gènes liés (en centimorgans) = pourcentage de recombinés")}
    ${methode([
      "Repérer les lignées pures et la dominance à partir de la F1.",
      "Écrire génotypes et phénotypes, puis les gamètes avec leurs proportions.",
      "Construire l’échiquier de croisement et comparer aux résultats observés.",
    ])}`,
};

export const HEREDITE_HUMAINE: LessonSpec = {
  title: "L’hérédité chez l’espèce humaine",
  minutes: 18,
  body: `<p>On étudie la transmission des caractères humains à l’aide d’<strong>arbres généalogiques</strong> (carrés pour les hommes, ronds pour les femmes, symboles pleins pour les atteints).</p>
    ${tableau([
      ["Indice dans l’arbre", "Conclusion"],
      ["deux parents sains ont un enfant atteint", "l’allèle de la maladie est récessif"],
      ["un enfant atteint a toujours un parent atteint", "allèle probablement dominant"],
      ["seuls des garçons sont atteints, nés de mères saines", "gène probablement porté par le chromosome X, récessif"],
      ["un père atteint a une fille saine", "maladie non liée à l’X dominante"],
    ])}
    ${exemple([
      "<strong>Drépanocytose</strong> : maladie autosomale récessive, fréquente en Afrique ; l’hémoglobine anormale déforme les globules rouges (faucilles). Deux parents porteurs sains (AS) ont, à chaque naissance, 1 risque sur 4 d’avoir un enfant malade (SS).",
      "<strong>Hémophilie</strong> et <strong>daltonisme</strong> : récessifs liés à X, beaucoup plus fréquents chez les garçons.",
      "<strong>Groupes sanguins ABO</strong> : A et B sont codominants, O est récessif.",
    ], "Exemples")}
    ${retenir("Anomalies chromosomiques : la trisomie 21 (47 chromosomes) résulte d’une mauvaise séparation des chromosomes pendant la méiose ; son risque augmente avec l’âge de la mère. Le conseil génétique aide les couples à risque.")}`,
};

export const BIOTECHNOLOGIES: LessonSpec = {
  title: "Les biotechnologies",
  minutes: 12,
  body: `<p>Le <strong>génie génétique</strong> permet de transférer un gène d’un organisme à un autre, car le code génétique est universel.</p>
    ${methode([
      "Isoler le gène d’intérêt (par exemple le gène de l’insuline humaine) grâce aux enzymes de restriction.",
      "L’insérer dans un vecteur (plasmide bactérien) avec une ligase.",
      "Introduire le plasmide dans une bactérie, qui se multiplie et fabrique la protéine.",
    ], "Principe de la transgenèse")}
    ${liste([
      "applications médicales : insuline, hormone de croissance, vaccins (hépatite B) produits par des bactéries ou des levures ;",
      "agriculture : plantes génétiquement modifiées (OGM) résistantes aux insectes ou à la sécheresse, qui posent des questions de biosécurité ;",
      "empreintes génétiques (ADN) : identification en justice, recherche de paternité ;",
      "clonage : production d’individus génétiquement identiques (bouturage, culture in vitro).",
    ])}
    ${retenir("Les biotechnologies posent des questions éthiques : sécurité alimentaire, dépendance des paysans envers les semences, respect de la vie.")}`,
};
