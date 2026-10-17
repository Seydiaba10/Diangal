import "server-only";

// Exercices corrigés de sciences physiques et de SVT de Terminale, par titre de chapitre.
// Écrits par DIANGAL d’après les leçons, à faire relire par des enseignants.

import type { ExerciseSpec } from "../exercise-series";

export const PC_TLE_EXERCISES: Record<string, ExerciseSpec[]> = {
  // ── Physique S ────────────────────────────────────────────────────────────
  "Cinématique du point": [
    { num: "Un mobile part du repos avec une accélération de 2 m/s². Quelle est sa vitesse (en m/s) après 4 s ?", answer: 8, why: "v = at = 2 × 4 = 8 m/s." },
    { qcm: "Dans un mouvement circulaire uniforme, l’accélération est…", choices: ["nulle", "*centripète", "tangente à la trajectoire"], why: "a = v²/R, dirigée vers le centre." },
    { vf: "Le vecteur vitesse est toujours tangent à la trajectoire.", answer: true, why: "C’est une propriété du vecteur vitesse." },
  ],
  "Bases de la dynamique": [
    { num: "Une force résultante de 20 N agit sur une masse de 4 kg. Calcule l’accélération (en m/s²).", answer: 5, why: "a = F ÷ m = 20 ÷ 4 = 5 m/s²." },
    { vf: "Dans un référentiel galiléen, le centre d’inertie d’un système isolé peut avoir un mouvement rectiligne uniforme.", answer: true, why: "C’est le principe de l’inertie." },
    { qcm: "La quantité de mouvement s’exprime en…", choices: ["N", "*kg·m/s", "J"], why: "p = mv." },
  ],
  "Applications des bases de la dynamique": [
    { qcm: "En chute libre, l’accélération d’un corps…", choices: ["dépend de sa masse", "*vaut g, quelle que soit sa masse", "est nulle"], why: "La relation fondamentale donne a⃗ = g⃗." },
    { num: "Sur un plan incliné de 30° sans frottement (g = 10 m/s²), quelle est l’accélération en m/s² ?", answer: 5, why: "a = g sin 30° = 10 × 0,5 = 5 m/s²." },
    { qcm: "La portée d’un projectile lancé à vitesse donnée est maximale pour un angle de…", choices: ["30°", "*45°", "60°"], why: "d = v₀² sin 2α / g, maximal pour 2α = 90°." },
  ],
  "Gravitation universelle": [
    { qcm: "Si la distance entre deux corps double, la force de gravitation est…", choices: ["divisée par 2", "*divisée par 4", "multipliée par 2"], why: "F est inversement proportionnelle à d²." },
    { vf: "La période d’un satellite en orbite circulaire dépend de sa masse.", answer: false, why: "T = 2π√(r³/GM) ne dépend que de r et de la masse de l’astre." },
    { num: "Quelle est, en heures (arrondie), la période d’un satellite géostationnaire ?", answer: 24, why: "Il tourne avec la Terre : environ 24 h (86 164 s)." },
  ],
  "Champs magnétiques": [
    { qcm: "Le champ magnétique s’exprime en…", choices: ["volt", "*tesla", "weber"], why: "L’unité de B est le tesla (T)." },
    { vf: "À l’intérieur d’un long solénoïde, le champ magnétique est uniforme.", answer: true, why: "B = μ₀(N/ℓ)I, parallèle à l’axe." },
    { qcm: "Si on double l’intensité dans un solénoïde, le champ…", choices: ["ne change pas", "*double", "est divisé par 2"], why: "B est proportionnel à I." },
  ],
  "Particule chargée dans un champ magnétique uniforme": [
    { qcm: "La force de Lorentz…", choices: ["accélère toujours la particule", "*ne modifie pas la valeur de la vitesse", "est parallèle à la vitesse"], why: "Perpendiculaire à v⃗, elle ne travaille pas." },
    { qcm: "Le rayon de la trajectoire circulaire est R = …", choices: ["|q|B ÷ (mv)", "*mv ÷ (|q|B)", "mvB ÷ |q|"], why: "La relation fondamentale donne R = mv/(|q|B)." },
    { vf: "Dans un spectrographe de masse, des isotopes de masses différentes ont des trajectoires de rayons différents.", answer: true, why: "R dépend de la masse." },
  ],
  "Loi de Laplace": [
    { num: "Une tige de 0,2 m parcourue par 5 A est perpendiculaire à un champ de 0,1 T. Calcule F (en N).", answer: 0.1, why: "F = IℓB = 5 × 0,2 × 0,1 = 0,1 N." },
    { vf: "La force de Laplace est nulle si le conducteur est parallèle au champ.", answer: true, why: "F = IℓB sin α avec α = 0." },
    { qcm: "Le moteur électrique transforme…", choices: ["de l’énergie mécanique en énergie électrique", "*de l’énergie électrique en énergie mécanique", "de la chaleur en électricité"], why: "Les forces de Laplace font tourner le rotor." },
  ],
  "Induction magnétique et dipôle (R, L)": [
    { qcm: "Selon la loi de Lenz, le courant induit…", choices: ["renforce la cause qui le produit", "*s’oppose à la cause qui le produit", "est toujours nul"], why: "C’est l’énoncé de la loi de Lenz." },
    { num: "L = 0,2 H et R = 20 Ω. Calcule la constante de temps τ = L/R (en s).", answer: 0.01, why: "τ = 0,2 ÷ 20 = 0,01 s." },
    { vf: "Une bobine s’oppose aux variations du courant qui la traverse.", answer: true, why: "C’est le phénomène d’auto-induction." },
  ],
  "Étude du dipôle (R, C)": [
    { num: "R = 1000 Ω et C = 1 × 10⁻³ F. Calcule τ = RC (en s).", answer: 1, why: "τ = 1000 × 0,001 = 1 s." },
    { qcm: "À t = τ, un condensateur en charge a atteint environ…", choices: ["37 %", "*63 %", "100 %"], why: "1 − e<sup>−1</sup> ≈ 0,63." },
    { vf: "L’énergie d’un condensateur est ½ C u².", answer: true, why: "C’est la formule du cours." },
  ],
  "Oscillations électriques libres et forcées": [
    { qcm: "La période propre d’un circuit LC est…", choices: ["2π√(L/C)", "*2π√(LC)", "1 ÷ (LC)"], why: "T₀ = 2π√(LC)." },
    { vf: "À la résonance d’intensité, l’impédance d’un RLC série est égale à R.", answer: true, why: "Lω = 1/(Cω) : les réactances se compensent." },
    { qcm: "Le facteur de puissance d’un dipôle est…", choices: ["tan φ", "*cos φ", "sin φ"], why: "P = UI cos φ." },
  ],
  "Oscillations mécaniques libres": [
    { qcm: "La période d’un pendule élastique est T₀ = …", choices: ["2π√(k/m)", "*2π√(m/k)", "2π mk"], why: "ω₀ = √(k/m), donc T₀ = 2π√(m/k)." },
    { vf: "La période des petites oscillations d’un pendule simple dépend de sa longueur.", answer: true, why: "T₀ = 2π√(ℓ/g)." },
    { num: "m = 0,1 kg et k = 10 N/m. Calcule la pulsation propre ω₀ (en rad/s).", answer: 10, why: "ω₀ = √(10 ÷ 0,1) = √100 = 10." },
  ],
  "Interférences lumineuses": [
    { qcm: "L’interfrange s’écrit i = …", choices: ["a D ÷ λ", "*λ D ÷ a", "λ a ÷ D"], why: "i = λD/a." },
    { vf: "Les interférences lumineuses montrent le caractère ondulatoire de la lumière.", answer: true, why: "Seules des ondes peuvent interférer." },
    { qcm: "Pour obtenir des interférences, les deux sources doivent être…", choices: ["de couleurs différentes", "*cohérentes", "très éloignées"], why: "Elles doivent être synchrones, issues de la même source." },
  ],
  "Effet photoélectrique": [
    { qcm: "L’énergie d’un photon de fréquence ν est…", choices: ["h ÷ ν", "*h ν", "ν ÷ h"], why: "E = hν (Einstein)." },
    { vf: "Augmenter l’intensité d’une lumière de fréquence inférieure au seuil déclenche l’effet photoélectrique.", answer: false, why: "Il faut ν &gt; ν₀, quelle que soit l’intensité." },
    { num: "Un photon de 3 eV frappe un métal de travail d’extraction 2 eV. Quelle est l’énergie cinétique maximale de l’électron (en eV) ?", answer: 1, why: "E<sub>c</sub> = hν − W₀ = 3 − 2 = 1 eV." },
  ],
  "Niveaux d’énergie de l’atome": [
    { num: "Quelle est, en eV, l’énergie d’ionisation de l’atome d’hydrogène dans son état fondamental ?", answer: 13.6, why: "Il faut passer de E₁ = −13,6 eV à 0." },
    { qcm: "La série de Balmer correspond aux retours vers le niveau…", choices: ["n = 1", "*n = 2", "n = 3"], why: "Lyman : n = 1 ; Balmer : n = 2 ; Paschen : n = 3." },
    { vf: "Un gaz froid absorbe les mêmes radiations que celles qu’il émet quand il est chaud.", answer: true, why: "Les raies d’absorption et d’émission coïncident." },
  ],
  "Réactions nucléaires": [
    { qcm: "Lors d’une désintégration α, le nombre de masse A…", choices: ["augmente de 4", "*diminue de 4", "ne change pas"], why: "Le noyau perd un noyau d’hélium ⁴₂He." },
    { num: "Un échantillon contient 800 noyaux radioactifs. Combien en reste-t-il après 3 demi-vies ?", answer: 100, why: "800 → 400 → 200 → 100." },
    { vf: "Plus l’énergie de liaison par nucléon est grande, plus le noyau est stable.", answer: true, why: "C’est l’interprétation de la courbe d’Aston." },
  ],
  // ── Chimie S ──────────────────────────────────────────────────────────────
  "Les alcools": [
    { qcm: "Le propan-2-ol est un alcool…", choices: ["primaire", "*secondaire", "tertiaire"], why: "Son carbone fonctionnel porte deux groupes carbonés." },
    { qcm: "L’oxydation ménagée d’un alcool secondaire donne…", choices: ["un aldéhyde", "*une cétone", "un acide carboxylique"], why: "Alcool secondaire → cétone." },
    { vf: "La liqueur de Fehling donne un précipité rouge brique avec un aldéhyde.", answer: true, why: "C’est le test caractéristique des aldéhydes." },
  ],
  "Les amines": [
    { qcm: "CH₃−NH−CH₃ est une amine…", choices: ["primaire", "*secondaire", "tertiaire"], why: "L’azote porte deux groupes carbonés." },
    { vf: "Une solution aqueuse d’amine est basique.", answer: true, why: "Le doublet de l’azote capte un proton." },
    { qcm: "La propriété nucléophile des amines est due…", choices: ["à l’atome d’hydrogène", "*au doublet non liant de l’azote", "à la chaîne carbonée"], why: "Le doublet attaque les carbones déficitaires en électrons." },
  ],
  "Acides carboxyliques et dérivés": [
    { qcm: "La réaction acide + alcool ⇌ ester + eau est…", choices: ["rapide et totale", "*lente et limitée", "violente"], why: "L’estérification directe conduit à un équilibre." },
    { num: "Quel est le rendement (en %) d’une estérification à partir d’un mélange équimolaire d’acide et d’alcool primaire ?", answer: 67, why: "Environ deux tiers de l’acide est estérifié." },
    { vf: "La saponification d’un ester est totale.", answer: true, why: "L’ion hydroxyde réagit totalement avec l’ester." },
  ],
  "Cinétique chimique": [
    { qcm: "Un catalyseur…", choices: ["modifie l’état final", "*accélère la réaction sans être consommé", "ralentit toujours la réaction"], why: "C’est la définition d’un catalyseur." },
    { vf: "Une élévation de température accélère en général une réaction chimique.", answer: true, why: "La température est un facteur cinétique." },
    { qcm: "La vitesse de formation d’un produit à l’instant t se lit…", choices: ["sur l’axe des ordonnées", "*sur la pente de la tangente à la courbe", "sur l’axe des abscisses"], why: "v = d[P]/dt." },
  ],
  "Autoprotolyse de l’eau, pH et indicateurs colorés": [
    { num: "[H₃O⁺] = 10⁻⁵ mol/L. Quel est le pH ?", answer: 5, why: "pH = −log 10⁻⁵ = 5." },
    { qcm: "À 25 °C, une solution de pH = 9 est…", choices: ["acide", "neutre", "*basique"], why: "pH &gt; 7." },
    { num: "À 25 °C, une solution a [H₃O⁺] = 10⁻³ mol/L. Quelle est la valeur de pOH = −log[OH⁻] ?", answer: 11, why: "[OH⁻] = 10⁻¹⁴ ÷ 10⁻³ = 10⁻¹¹ mol/L." },
  ],
  "Acide fort, base forte et dosage": [
    { num: "Quel est le pH d’une solution d’acide chlorhydrique à 10⁻² mol/L ?", answer: 2, why: "Acide fort : pH = −log C = 2." },
    { qcm: "Le pH à l’équivalence d’un dosage acide fort-base forte vaut…", choices: ["4", "*7", "9"], why: "La solution obtenue contient NaCl, neutre." },
    { num: "10 mL d’acide sont neutralisés par 20 mL de soude à 0,05 mol/L. Calcule C<sub>a</sub> (en mol/L).", answer: 0.1, why: "C<sub>a</sub> = 0,05 × 20 ÷ 10 = 0,1 mol/L." },
  ],
  "Acides et bases faibles, couples acide-base": [
    { qcm: "Plus le pKa d’un couple est petit, plus l’acide est…", choices: ["faible", "*fort", "dilué"], why: "Un petit pKa correspond à un grand Ka." },
    { vf: "À pH = pKa, les formes acide et basique ont la même concentration.", answer: true, why: "pH = pKa + log([A⁻]/[AH]) avec log 1 = 0." },
    { qcm: "Pour le couple NH₄⁺/NH₃ (pKa = 9,2), à pH = 11 domine…", choices: ["NH₄⁺", "*NH₃", "aucune des deux"], why: "pH &gt; pKa : la forme basique prédomine." },
  ],
  "Réaction acide faible-base forte, effet tampon": [
    { qcm: "À la demi-équivalence du dosage d’un acide faible par une base forte…", choices: ["pH = 7", "*pH = pKa", "pH = 14"], why: "[AH] = [A⁻] à la demi-équivalence." },
    { vf: "Le pH à l’équivalence du dosage de l’acide éthanoïque par la soude est supérieur à 7.", answer: true, why: "La solution contient la base faible CH₃COO⁻." },
    { qcm: "Une solution tampon…", choices: ["a toujours pH = 7", "*voit son pH peu varier par dilution ou ajout modéré d’acide", "ne contient que de l’eau"], why: "C’est la définition de l’effet tampon." },
  ],
  "Acides α-aminés": [
    { qcm: "Un carbone asymétrique est lié à…", choices: ["deux groupes identiques", "*quatre groupes différents", "trois atomes d’hydrogène"], why: "C’est la définition." },
    { vf: "La glycine (R = H) est chirale.", answer: false, why: "Son carbone α porte deux atomes d’hydrogène : il n’est pas asymétrique." },
    { qcm: "La liaison peptidique est…", choices: ["−COO−", "*−CO−NH−", "−NH₂"], why: "Elle résulte de la réaction de −COOH avec −NH₂." },
  ],
  // ── Sciences physiques L2 ────────────────────────────────────────────────
  "Production, transport et utilisation de l’énergie électrique": [
    { num: "Un appareil de 2 kW fonctionne 3 heures. Quelle énergie consomme-t-il (en kWh) ?", answer: 6, why: "E = P × t = 2 × 3 = 6 kWh." },
    { vf: "On transporte l’électricité en haute tension pour réduire les pertes par effet Joule.", answer: true, why: "À puissance égale, l’intensité est plus faible." },
    { qcm: "Le barrage de Manantali produit de l’électricité…", choices: ["thermique", "*hydraulique", "nucléaire"], why: "C’est une centrale hydroélectrique sur le fleuve Sénégal." },
  ],
  "Énergie nucléaire": [
    { num: "Un échantillon contient 1000 noyaux de période 8 jours. Combien en reste-t-il après 16 jours ?", answer: 250, why: "Deux périodes : 1000 → 500 → 250." },
    { qcm: "L’énergie du Soleil provient…", choices: ["de la fission", "*de la fusion", "de la combustion"], why: "Des noyaux légers fusionnent au cœur du Soleil." },
    { vf: "Dans une réaction nucléaire, une partie de la masse est transformée en énergie.", answer: true, why: "E = Δm c²." },
  ],
  "Signaux et ondes mécaniques": [
    { num: "Un signal parcourt 30 m en 2 s. Calcule sa célérité (en m/s).", answer: 15, why: "c = d ÷ Δt = 30 ÷ 2 = 15 m/s." },
    { qcm: "Le son est une onde…", choices: ["transversale", "*longitudinale", "électromagnétique"], why: "La compression de l’air se fait dans le sens de propagation." },
    { vf: "Le son se propage dans le vide.", answer: false, why: "Il a besoin d’un milieu matériel." },
  ],
  "Aspect ondulatoire de la lumière": [
    { qcm: "La diffraction et les interférences montrent que la lumière est…", choices: ["formée de grains de matière", "*une onde", "un courant électrique"], why: "Ce sont des phénomènes ondulatoires." },
    { qcm: "La lumière rouge a une longueur d’onde d’environ…", choices: ["400 nm", "*750 nm", "10 m"], why: "Le visible va d’environ 400 nm (violet) à 800 nm (rouge)." },
    { vf: "L’infrarouge est visible à l’œil nu.", answer: false, why: "Il est au-delà du rouge, invisible." },
  ],
  "Aspect corpusculaire de la lumière": [
    { qcm: "Les « grains » de lumière s’appellent…", choices: ["électrons", "*photons", "neutrons"], why: "Einstein a nommé ainsi les quanta de lumière." },
    { vf: "Plus la fréquence d’une lumière est grande, plus ses photons sont énergétiques.", answer: true, why: "E = hν." },
    { qcm: "Les panneaux solaires utilisent…", choices: ["la fission", "*l’effet photoélectrique", "le magnétisme"], why: "La lumière libère des électrons dans le matériau." },
  ],
  "Matières plastiques": [
    { num: "Un polymère de masse molaire 28 000 g/mol a un motif de 28 g/mol. Quel est son degré de polymérisation ?", answer: 1000, why: "n = 28 000 ÷ 28 = 1000." },
    { qcm: "Le PVC est obtenu à partir…", choices: ["de l’éthylène", "*du chlorure de vinyle", "du styrène"], why: "Polychlorure de vinyle." },
    { vf: "Un thermoplastique ramollit à la chaleur et peut être remoulé.", answer: true, why: "C’est ce qui permet son recyclage." },
  ],
  "Les textiles": [
    { qcm: "Le coton est une fibre…", choices: ["synthétique", "artificielle", "*naturelle végétale"], why: "Il provient d’une plante." },
    { qcm: "Le nylon est un…", choices: ["polyester", "*polyamide", "polyéthylène"], why: "Il contient des liaisons amide." },
    { vf: "Les fibres synthétiques sont fabriquées à partir du pétrole.", answer: true, why: "Leurs monomères viennent de la pétrochimie." },
  ],
  "Les savons": [
    { qcm: "La réaction qui fabrique le savon s’appelle…", choices: ["estérification", "*saponification", "polymérisation"], why: "Corps gras + soude → savon + glycérol." },
    { vf: "La tête −COO⁻ d’un ion savon est hydrophile.", answer: true, why: "Elle est attirée par l’eau ; la chaîne carbonée est hydrophobe." },
    { qcm: "Avec la soude, on obtient un savon…", choices: ["mou", "*dur", "liquide"], why: "Soude → savon dur ; potasse → savon mou." },
  ],
  "Lessives, antiseptiques et désinfectants": [
    { qcm: "L’eau de Javel est…", choices: ["un antiseptique pour les plaies", "*un désinfectant", "un savon"], why: "Elle s’utilise sur les objets et les surfaces." },
    { vf: "On peut mélanger l’eau de Javel avec un détartrant acide.", answer: false, why: "Il se dégage du dichlore, gaz toxique." },
    { qcm: "L’alcool à 70° utilisé sur la peau est…", choices: ["un désinfectant", "*un antiseptique", "un détergent"], why: "Les antiseptiques s’appliquent sur les tissus vivants." },
  ],
  "Pollution de l’air et de l’eau": [
    { qcm: "Le gaz très toxique produit par une combustion incomplète est…", choices: ["le dioxyde de carbone", "*le monoxyde de carbone", "le dioxygène"], why: "Le CO empêche le sang de transporter le dioxygène." },
    { vf: "Les nitrates et phosphates en excès provoquent la prolifération des algues.", answer: true, why: "C’est l’eutrophisation." },
    { qcm: "Les pluies acides sont surtout dues…", choices: ["au CO₂", "*au SO₂ et aux oxydes d’azote", "à la vapeur d’eau"], why: "Ces gaz forment des acides dans l’atmosphère." },
  ],
};

export const SVT_TLE_EXERCISES: Record<string, ExerciseSpec[]> = {
  "Organisation du système nerveux cérébro-spinal": [
    { qcm: "Le centre de l’équilibre et de la coordination des mouvements est…", choices: ["le bulbe rachidien", "*le cervelet", "la moelle épinière"], why: "C’est le rôle du cervelet." },
    { vf: "Dans la moelle épinière, la substance grise est au centre.", answer: true, why: "Elle forme un H (ou un papillon) entouré de substance blanche." },
    { qcm: "La racine dorsale d’un nerf rachidien est…", choices: ["motrice", "*sensitive", "inexistante"], why: "Sa section supprime la sensibilité." },
  ],
  "Le tissu nerveux et ses propriétés": [
    { num: "Le potentiel de repos d’une fibre nerveuse vaut environ −70 mV. Combien de millivolts sépare-t-il de 0 mV ?", answer: 70, why: "L’intérieur de la fibre est négatif : environ −70 mV, soit 70 mV sous 0." },
    { qcm: "La dépolarisation du potentiel d’action est due…", choices: ["à une sortie de K⁺", "*à une entrée de Na⁺", "à une entrée de Cl⁻"], why: "Les canaux sodium s’ouvrent." },
    { vf: "La conduction est plus rapide dans une fibre myélinisée.", answer: true, why: "Conduction saltatoire de nœud en nœud." },
    { qcm: "Le neurotransmetteur de la plaque motrice est…", choices: ["l’insuline", "*l’acétylcholine", "l’adrénaline"], why: "L’acétylcholine est libérée à la jonction neuromusculaire." },
  ],
  "Rôle du système nerveux dans le comportement moteur": [
    { qcm: "Le centre nerveux du réflexe rotulien est…", choices: ["le cerveau", "*la moelle épinière", "le cervelet"], why: "C’est un réflexe médullaire." },
    { vf: "Le réflexe de salivation au son d’une cloche chez le chien de Pavlov est un réflexe inné.", answer: false, why: "Il est conditionnel, acquis par apprentissage." },
    { qcm: "L’hémisphère cérébral gauche commande…", choices: ["la moitié gauche du corps", "*la moitié droite du corps", "tout le corps"], why: "Les voies motrices se croisent." },
  ],
  "Activité du muscle strié squelettique": [
    { qcm: "L’unité de base de la myofibrille est…", choices: ["le neurone", "*le sarcomère", "la synapse"], why: "Le sarcomère est délimité par deux stries Z." },
    { vf: "La contraction musculaire consomme de l’ATP.", answer: true, why: "L’ATP permet le glissement des filaments." },
    { qcm: "La fermentation lactique produit…", choices: ["beaucoup d’ATP", "*peu d’ATP et de l’acide lactique", "du dioxygène"], why: "2 ATP par glucose, sans dioxygène." },
  ],
  "Activité cardiaque et régulation de la pression artérielle": [
    { qcm: "Le « pacemaker » naturel du cœur est…", choices: ["le faisceau de His", "*le nœud sinusal", "le ventricule gauche"], why: "Il donne le rythme cardiaque." },
    { vf: "Une hausse de la pression artérielle provoque un ralentissement du cœur.", answer: true, why: "Les barorécepteurs activent le centre cardiomodérateur." },
    { qcm: "L’athérosclérose est…", choices: ["une infection du cœur", "*un dépôt de graisses dans la paroi des artères", "une baisse de la pression"], why: "Elle favorise infarctus et AVC." },
  ],
  "Le milieu intérieur": [
    { qcm: "Le milieu intérieur comprend…", choices: ["le contenu de l’estomac", "*le plasma, la lymphe et le liquide interstitiel", "l’air des poumons"], why: "Ce sont les liquides qui baignent les cellules." },
    { qcm: "L’hormone qui fait réabsorber l’eau par le rein est…", choices: ["l’insuline", "*l’ADH", "le glucagon"], why: "Hormone antidiurétique." },
    { vf: "L’homéostasie est le maintien des constantes du milieu intérieur.", answer: true, why: "C’est sa définition." },
  ],
  "Régulation de la glycémie": [
    { num: "Quelle est, en g/L, la valeur normale de la glycémie à jeun ?", answer: 1, why: "Environ 1 g/L (0,8 à 1,2)." },
    { qcm: "La seule hormone hypoglycémiante est…", choices: ["le glucagon", "*l’insuline", "l’adrénaline"], why: "Elle fait baisser la glycémie." },
    { vf: "Le foie stocke le glucose sous forme de glycogène.", answer: true, why: "Sous l’action de l’insuline." },
  ],
  Immunologie: [
    { qcm: "Les cellules qui produisent les anticorps sont…", choices: ["les LT8", "*les plasmocytes (issus des LB)", "les hématies"], why: "Les LB activés deviennent des plasmocytes." },
    { qcm: "Le VIH infecte surtout…", choices: ["les hématies", "*les lymphocytes T4", "les neurones"], why: "Il détruit les chefs d’orchestre de l’immunité." },
    { vf: "La réponse immunitaire secondaire est plus rapide grâce aux cellules mémoire.", answer: true, why: "C’est la mémoire immunitaire." },
  ],
  "Reproduction chez les mammifères": [
    { num: "Combien de chromosomes contient un spermatozoïde humain ?", answer: 23, why: "La méiose réduit 46 à 23." },
    { qcm: "L’ovulation est déclenchée par…", choices: ["une chute de progestérone", "*un pic de LH", "la testostérone"], why: "Le pic de LH provoque la libération de l’ovocyte." },
    { vf: "La fécondation a lieu dans l’utérus.", answer: false, why: "Elle a lieu dans le tiers supérieur de la trompe." },
  ],
  "Reproduction chez les spermaphytes": [
    { qcm: "Après la fécondation, l’ovaire de la fleur devient…", choices: ["la graine", "*le fruit", "la feuille"], why: "L’ovule devient la graine, l’ovaire le fruit." },
    { vf: "Chez les plantes à fleurs, il y a une double fécondation.", answer: true, why: "Un gamète donne l’embryon, l’autre l’albumen." },
    { qcm: "Le transport du pollen vers le stigmate s’appelle…", choices: ["germination", "*pollinisation", "fécondation"], why: "C’est la pollinisation." },
  ],
  Génétique: [
    { qcm: "Le croisement de deux hybrides F1 (monohybridisme, dominance complète) donne en F2…", choices: ["100 % d’un phénotype", "*3/4 et 1/4", "1/2 et 1/2"], why: "C’est la 2e loi de Mendel." },
    { qcm: "Un croisement-test se fait avec un individu…", choices: ["hétérozygote", "*homozygote récessif", "de la F1"], why: "Il révèle les gamètes de l’individu testé." },
    { num: "Un croisement-test donne 8 % de recombinés. Quelle est la distance entre les deux gènes (en centimorgans) ?", answer: 8, why: "1 % de recombinés = 1 cM." },
  ],
  "Hérédité humaine": [
    { qcm: "Deux parents porteurs sains de la drépanocytose (AS) ont, à chaque naissance, un risque d’enfant malade de…", choices: ["1/2", "*1/4", "0"], why: "AS × AS donne 1/4 SS." },
    { vf: "L’hémophilie touche plus souvent les garçons.", answer: true, why: "Allèle récessif porté par le chromosome X." },
    { num: "Combien de chromosomes a une personne atteinte de trisomie 21 ?", answer: 47, why: "Trois chromosomes 21 au lieu de deux." },
  ],
  Biotechnologies: [
    { qcm: "Pour fabriquer de l’insuline humaine, on insère le gène dans…", choices: ["un virus de la grippe", "*un plasmide bactérien", "un globule rouge"], why: "Le plasmide sert de vecteur." },
    { vf: "Le génie génétique est possible parce que le code génétique est universel.", answer: true, why: "Une bactérie lit un gène humain." },
    { qcm: "Un OGM est…", choices: ["un organisme malade", "*un organisme génétiquement modifié", "un engrais"], why: "Il a reçu un gène étranger." },
  ],
};
