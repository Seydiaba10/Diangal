// Physique de Terminale S1 et S2 (programme de sciences physiques d'août 2008, Office du Bac) :
// chapitres P1 à P15. Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import { type ChapterSpec, exemple, formula, frac, liste, methode, retenir, sqrt, sup, tableau, vec } from "./blocks";

export const PHYSIQUE_TLE_S: ChapterSpec[] = [
  {
    title: "Cinématique du point",
    summary: "Vecteurs position, vitesse et accélération ; mouvements rectilignes et circulaires.",
    lessons: [
      {
        title: "Position, vitesse et accélération",
        minutes: 15,
        body: `<p>Dans un repère lié au référentiel d’étude, la position d’un point mobile M est donnée par le <strong>vecteur position</strong> ${vec("OM")}(t) = x(t) i⃗ + y(t) j⃗ + z(t) k⃗.</p>
          ${formula(`${vec("v")} = ${frac(`d${vec("OM")}`, "dt")} et ${vec("a")} = ${frac(`d${vec("v")}`, "dt")}`)}
          ${liste([
            "le vecteur vitesse est tangent à la trajectoire, dans le sens du mouvement ; sa norme s’exprime en m/s ;",
            "l’accélération s’exprime en m/s² ; ses coordonnées sont les dérivées de celles de la vitesse.",
          ])}
          <h2>Repère de Frenet</h2>
          <p>Pour une trajectoire courbe, on décompose l’accélération selon la tangente (vecteur τ⃗) et la normale orientée vers l’intérieur de la courbe (vecteur n⃗) :</p>
          ${formula(`${vec("a")} = ${frac("dv", "dt")} τ⃗ + ${frac("v²", "ρ")} n⃗ (ρ : rayon de courbure)`)}
          ${exemple([
            "x(t) = 2t et y(t) = −5t² + 4t (SI). v⃗(2 ; −10t + 4) et a⃗(0 ; −10) : l’accélération est constante.",
          ])}`,
      },
      {
        title: "Mouvements rectilignes",
        minutes: 15,
        body: `${tableau([
            ["Mouvement", "Accélération", "Équations horaires"],
            ["rectiligne uniforme", "a = 0", "x = v t + x₀"],
            ["rectiligne uniformément varié", "a constante", "v = a t + v₀ ; x = ½ a t² + v₀ t + x₀"],
            ["rectiligne sinusoïdal", "a = −ω² x", "x = X<sub>m</sub> cos(ωt + φ)"],
          ])}
          ${retenir("Pour un mouvement uniformément varié : v² − v₀² = 2a(x − x₀). Le mouvement est accéléré si a et v ont le même signe, décéléré (retardé) sinon.")}
          ${exemple([
            "Une moto démarre (v₀ = 0) avec a = 2 m/s². Après 5 s : v = 10 m/s et x = ½ × 2 × 25 = 25 m.",
            "Pour s’arrêter depuis 20 m/s avec a = −4 m/s² : 0 − 400 = 2 × (−4) × d, donc d = 50 m.",
          ])}
          <p>Dans un mouvement sinusoïdal, X<sub>m</sub> est l’amplitude, ω la pulsation (rad/s), T = ${frac("2π", "ω")} la période.</p>`,
      },
      {
        title: "Mouvements circulaires",
        minutes: 12,
        body: `<p>Sur un cercle de rayon R, on repère M par son abscisse angulaire θ(t). La vitesse angulaire est ω = ${frac("dθ", "dt")} (rad/s) et la vitesse v = Rω.</p>
          ${liste([
            `<strong>mouvement circulaire uniforme</strong> : ω constante ; l’accélération est <strong>centripète</strong>, de valeur a = ${frac("v²", "R")} = Rω² ;`,
            `<strong>uniformément varié</strong> : accélération angulaire ${frac("dω", "dt")} constante ; a⃗ a une composante tangentielle R${frac("dω", "dt")} et une composante normale Rω².`,
          ])}
          ${formula(`Période : T = ${frac("2π", "ω")} ; fréquence : N = ${frac("1", "T")}`)}
          ${exemple(["Une roue de rayon 0,30 m tourne à 10 tours par seconde : ω = 20π ≈ 62,8 rad/s et la vitesse d’un point de la jante est v ≈ 18,8 m/s."])}`,
      },
    ],
  },
  {
    title: "Bases de la dynamique",
    summary: "Référentiels galiléens, lois de Newton, quantité de mouvement et chocs.",
    lessons: [
      {
        title: "Quantité de mouvement et référentiels galiléens",
        minutes: 12,
        body: `<p>Le <strong>centre d’inertie</strong> G d’un solide est le point dont le mouvement est le plus simple. La <strong>quantité de mouvement</strong> d’un système de masse m est p⃗ = m${vec("v<sub>G</sub>")} (kg·m/s).</p>
          ${retenir("<strong>Principe de l’inertie</strong> (1<sup>re</sup> loi de Newton) : dans un référentiel galiléen, le centre d’inertie d’un système isolé ou pseudo-isolé est au repos ou en mouvement rectiligne uniforme.")}
          <p>Le référentiel terrestre est considéré comme galiléen pour des expériences de courte durée ; le référentiel géocentrique sert pour les satellites.</p>
          <h2>Conservation de la quantité de mouvement</h2>
          <p>La quantité de mouvement d’un système isolé se conserve. Lors d’un <strong>choc élastique</strong>, l’énergie cinétique se conserve aussi ; lors d’un <strong>choc mou</strong> (inélastique), les corps restent accrochés et une partie de l’énergie cinétique est perdue.</p>
          ${exemple(["Un wagon de 2 t à 3 m/s percute un wagon immobile de 1 t et s’y accroche : 2000 × 3 = 3000 × v, donc v = 2 m/s."])}`,
      },
      {
        title: "Relation fondamentale de la dynamique",
        minutes: 15,
        body: `${formula(`Dans un référentiel galiléen : Σ${vec("F<sub>ext</sub>")} = ${frac(`d${vec("p")}`, "dt")} = m${vec("a<sub>G</sub>")}`)}
          <p>C’est la 2<sup>e</sup> loi de Newton, ou théorème du centre d’inertie. La 3<sup>e</sup> loi (actions réciproques) dit que A exerce sur B une force opposée à celle que B exerce sur A.</p>
          ${methode([
            "Définir le système et le référentiel (galiléen).",
            "Faire le bilan des forces extérieures et les représenter.",
            "Écrire la relation fondamentale, puis la projeter sur des axes bien choisis.",
            "En déduire l’accélération, puis les équations horaires par intégration (avec les conditions initiales).",
          ])}
          ${retenir("Théorème de l’énergie cinétique : entre deux instants, la variation de l’énergie cinétique est égale à la somme des travaux des forces : ΔE<sub>c</sub> = ΣW(F⃗).")}
          ${exemple(["Une voiture de 1000 kg passe de 0 à 20 m/s en 10 s : a = 2 m/s², la résultante des forces vaut 2000 N."])}`,
      },
    ],
  },
  {
    title: "Applications des bases de la dynamique",
    summary: "Chute libre, projectiles, chute dans un fluide, mouvements circulaires, particule dans un champ électrique.",
    lessons: [
      {
        title: "Chute libre et plan incliné",
        minutes: 12,
        body: `<p>Un corps en <strong>chute libre</strong> n’est soumis qu’à son poids : la relation fondamentale donne a⃗ = g⃗ (g ≈ 9,8 m/s²), quelle que soit sa masse.</p>
          ${formula("Chute verticale sans vitesse initiale : v = g t et z = ½ g t²")}
          <p>Sur un plan incliné d’un angle α, sans frottement, la réaction est perpendiculaire au plan et l’accélération vaut :</p>
          ${formula("a = g sin α")}
          ${exemple([
            "Une bille est lâchée d’une hauteur de 20 m : t = √(2 × 20 ÷ 9,8) ≈ 2,0 s ; elle touche le sol à v ≈ 19,8 m/s.",
            "Sur un plan incliné à 30°, a = 9,8 × 0,5 = 4,9 m/s².",
          ])}
          ${retenir("La mesure de a sur un plan incliné de pente connue permet de déterminer g.")}`,
      },
      {
        title: "Mouvement d’un projectile",
        minutes: 15,
        body: `<p>Un projectile est lancé de O avec une vitesse v₀ faisant un angle α avec l’horizontale. On néglige l’air : a⃗ = g⃗.</p>
          ${formula("x = (v₀ cos α) t ; z = −½ g t² + (v₀ sin α) t")}
          <p>En éliminant t, on obtient la trajectoire, une <strong>parabole</strong> :</p>
          ${formula(`z = −${frac("g", "2 v₀² cos² α")} x² + (tan α) x`)}
          ${liste([
            `portée horizontale (retour à z = 0) : d = ${frac("v₀² sin 2α", "g")}, maximale pour α = 45° ;`,
            `flèche (hauteur maximale) : h = ${frac("v₀² sin² α", "2g")}.`,
          ])}
          ${exemple(["Un ballon frappé à v₀ = 20 m/s sous α = 45° (g = 10 m/s²) : portée d = 400 ÷ 10 = 40 m ; flèche h = 400 × 0,5 ÷ 20 = 10 m."])}`,
      },
      {
        title: "Chute verticale dans un fluide",
        minutes: 12,
        body: `<p>Dans un fluide, un corps est soumis à son poids P⃗, à la <strong>poussée d’Archimède</strong> (verticale, vers le haut, égale au poids du fluide déplacé : ρ<sub>fluide</sub> V g) et à une force de frottement opposée à la vitesse, souvent modélisée par f = kv.</p>
          ${formula(`m ${frac("dv", "dt")} = mg − ρ<sub>f</sub> V g − kv`)}
          ${liste([
            "au début, la vitesse augmente (régime transitoire) ;",
            "le frottement augmente avec la vitesse jusqu’à compenser poids et poussée : la vitesse devient constante, c’est la vitesse limite (régime permanent).",
          ])}
          ${formula(`v<sub>lim</sub> = ${frac("(m − ρ<sub>f</sub> V) g", "k")}`)}
          ${retenir("C’est le principe du parachute : le frottement de l’air limite la vitesse de chute.")}`,
      },
      {
        title: "Mouvements circulaires : pendule conique, virage, fronde",
        minutes: 12,
        body: `<p>Pour un mouvement circulaire uniforme de rayon R, la somme des forces est <strong>centripète</strong> et vaut m${frac("v²", "R")}.</p>
          ${exemple([
            "<strong>Pendule conique</strong> : une bille au bout d’un fil de longueur ℓ tourne dans un plan horizontal ; le fil fait l’angle θ avec la verticale. On trouve tan θ = v²/(Rg) et cos θ = g/(ℓω²).",
            "<strong>Virage relevé</strong> : sans frottement latéral, la route doit être inclinée d’un angle α tel que tan α = v²/(Rg).",
            "<strong>Fronde</strong> : la tension du fil fournit la force centripète ; si le fil casse, la pierre part selon la tangente.",
          ], "Exemples")}
          ${exemple(["Virage de rayon 100 m pris à 72 km/h (20 m/s), g = 10 m/s² : tan α = 400 ÷ 1000 = 0,4, soit α ≈ 22°."])}`,
      },
      {
        title: "Particule chargée dans un champ électrique uniforme",
        minutes: 15,
        body: `<p>Entre deux plaques parallèles distantes de d et soumises à la tension U, le champ est uniforme : E = ${frac("U", "d")} (V/m). Une particule de charge q et de masse m subit F⃗ = qE⃗ ; son poids est négligeable.</p>
          ${liste([
            `vitesse initiale parallèle à E⃗ : mouvement rectiligne uniformément varié (accélération ${frac("|q|E", "m")}) ; le théorème de l’énergie cinétique donne ½mv² − ½mv₀² = |q|U ;`,
            "vitesse initiale perpendiculaire à E⃗ : trajectoire parabolique entre les plaques, puis rectiligne après : c’est la <strong>déflexion électrique</strong>.",
          ])}
          ${formula(`Déviation verticale à la sortie des plaques de longueur ℓ : y = ${frac("|q| U ℓ²", "2 m d v₀²")}`)}
          ${exemple(["Un électron (e = 1,6 × 10<sup>−19</sup> C, m = 9,1 × 10<sup>−31</sup> kg) accéléré sous 1000 V sans vitesse initiale : v = √(2eU/m) ≈ 1,9 × 10<sup>7</sup> m/s."])}
          ${retenir("Dans l’oscilloscope, la déviation du spot sur l’écran est proportionnelle à la tension appliquée aux plaques.")}`,
      },
    ],
  },
  {
    title: "Gravitation universelle",
    summary: "Loi de Newton, champ de gravitation, mouvement des satellites et lois de Kepler.",
    lessons: [
      {
        title: "Loi de la gravitation et champ de gravitation",
        minutes: 12,
        body: `${formula(`F = G ${frac("m m’", "d²")}, avec G = 6,67 × 10${sup("−11")} N·m²/kg²`)}
          <p>Deux corps à symétrie sphérique s’attirent selon la droite qui joint leurs centres. La Terre (masse M, rayon R) crée à l’altitude h un <strong>champ de gravitation</strong> dirigé vers son centre :</p>
          ${formula(`𝒢(h) = G ${frac("M", "(R + h)²")} = g₀ ${frac("R²", "(R + h)²")}, avec g₀ ≈ 9,8 m/s² au sol`)}
          ${exemple(["À l’altitude h = R ≈ 6400 km, le champ vaut g₀ ÷ 4 ≈ 2,45 m/s²."])}
          ${retenir("Le poids d’un corps est, à peu de chose près, la force de gravitation exercée par la Terre : P = mg.")}`,
      },
      {
        title: "Mouvement des satellites",
        minutes: 15,
        body: `<p>Dans le référentiel géocentrique, un satellite en orbite circulaire de rayon r = R + h n’est soumis qu’à la gravitation. La relation fondamentale donne un mouvement <strong>circulaire uniforme</strong> :</p>
          ${formula(`v = ${sqrt("(GM/r)")} et T = 2π ${sqrt("(r³/GM)")}`)}
          ${retenir(`3<sup>e</sup> loi de Kepler : ${frac("T²", "r³")} = ${frac("4π²", "GM")}, la même valeur pour tous les satellites d’un même astre.`)}
          ${liste([
            "la vitesse et la période ne dépendent pas de la masse du satellite ;",
            "un satellite <strong>géostationnaire</strong> tourne dans le plan de l’équateur, dans le sens de la Terre, en T ≈ 24 h (86 164 s) : il est à environ 36 000 km d’altitude et paraît immobile pour un observateur terrestre (télévision, météo).",
          ])}
          ${exemple(["Pour h = 400 km (station spatiale) : r ≈ 6,8 × 10<sup>6</sup> m, v ≈ 7,7 km/s, T ≈ 92 min."])}`,
      },
    ],
  },
  {
    title: "Champs magnétiques",
    summary: "Aimants, lignes de champ, champ terrestre, champs créés par un courant (fil, solénoïde).",
    lessons: [
      {
        title: "Généralités sur le champ magnétique",
        minutes: 12,
        body: `<p>Un aimant ou un courant crée un <strong>champ magnétique</strong> B⃗ dans l’espace qui l’entoure. On le détecte avec une aiguille aimantée, qui s’oriente selon B⃗ (du pôle sud vers le pôle nord de l’aiguille).</p>
          ${liste([
            "B s’exprime en tesla (T) et se mesure au teslamètre ;",
            "les <strong>lignes de champ</strong> sont tangentes à B⃗ ; elles sortent du pôle nord d’un aimant et entrent par le pôle sud ;",
            "entre les branches d’un aimant en U, le champ est uniforme ;",
            "les champs s’additionnent vectoriellement (superposition).",
          ])}
          ${retenir("Le champ magnétique terrestre a une composante horizontale de l’ordre de 2 à 3 × 10<sup>−5</sup> T : c’est elle qui oriente la boussole vers le nord magnétique.")}`,
      },
      {
        title: "Champs magnétiques créés par des courants",
        minutes: 15,
        body: `<p>Le sens de B⃗ se trouve avec la règle de la main droite (ou du bonhomme d’Ampère : le courant entre par ses pieds et sort par sa tête, il regarde le point considéré ; B⃗ est dirigé vers sa gauche).</p>
          ${tableau([
            ["Circuit", "Champ", "Valeur"],
            ["fil rectiligne infini", "lignes de champ : cercles centrés sur le fil", `B = ${frac("μ₀ I", "2πd")}`],
            ["solénoïde long (N spires, longueur ℓ)", "uniforme à l’intérieur, parallèle à l’axe", `B = μ₀ ${frac("N", "ℓ")} I`],
          ])}
          ${formula("μ₀ = 4π × 10<sup>−7</sup> SI (perméabilité du vide)")}
          ${exemple(["Solénoïde de 500 spires, de 25 cm de long, parcouru par 2 A : B = 4π × 10<sup>−7</sup> × 2000 × 2 ≈ 5,0 × 10<sup>−3</sup> T."])}
          ${retenir("B est proportionnel à l’intensité du courant. Les faces d’un solénoïde se comportent comme les pôles d’un aimant.")}`,
      },
    ],
  },
  {
    title: "Particule chargée dans un champ magnétique uniforme",
    summary: "Force de Lorentz, mouvement circulaire uniforme, spectrographe de masse et cyclotron.",
    lessons: [
      {
        title: "Force de Lorentz et mouvement circulaire",
        minutes: 15,
        body: `${formula(`Force de Lorentz : ${vec("F")} = q ${vec("v")} ∧ ${vec("B")}, de valeur F = |q| v B sin α`)}
          <p>Elle est perpendiculaire à la vitesse : elle ne travaille pas, donc la vitesse garde la même valeur. Si v⃗₀ est perpendiculaire à B⃗ uniforme, le mouvement est <strong>circulaire uniforme</strong> dans le plan perpendiculaire à B⃗ :</p>
          ${formula(`R = ${frac("m v", "|q| B")} et T = ${frac("2π m", "|q| B")}`)}
          ${exemple(["Un proton (m = 1,67 × 10<sup>−27</sup> kg) à 10<sup>6</sup> m/s dans B = 0,1 T : R = 1,67 × 10<sup>−21</sup> ÷ (1,6 × 10<sup>−20</sup>) ≈ 0,10 m."])}
          ${retenir("Si v⃗₀ est parallèle à B⃗, la force est nulle : le mouvement est rectiligne uniforme.")}`,
      },
      {
        title: "Applications : spectrographe, cyclotron, déflexion magnétique",
        minutes: 12,
        body: `${liste([
            `<strong>Spectrographe de masse</strong> : des ions de même charge, accélérés sous la même tension, décrivent des demi-cercles de rayons différents selon leur masse (R ∝ √m) ; on sépare ainsi les isotopes.`,
            `<strong>Cyclotron</strong> : la période T = 2πm/(|q|B) ne dépend pas de la vitesse ; une tension alternative de même période accélère la particule à chaque demi-tour.`,
            "<strong>Déflexion magnétique</strong> : dans un tube de télévision ancien, des bobines dévient le faisceau d’électrons.",
          ])}
          ${exemple([
            "Deux isotopes ³⁹K⁺ et ⁴¹K⁺ accélérés sous la même tension : R₄₁ ÷ R₃₉ = √(41 ÷ 39) ≈ 1,025 ; les points d’impact sont distincts.",
          ])}`,
      },
    ],
  },
  {
    title: "Loi de Laplace",
    summary: "Force exercée par un champ magnétique sur un conducteur parcouru par un courant ; applications.",
    lessons: [
      {
        title: "La force de Laplace",
        minutes: 12,
        body: `<p>Un conducteur rectiligne de longueur ℓ, parcouru par un courant I et placé dans un champ magnétique B⃗, subit la <strong>force de Laplace</strong> :</p>
          ${formula(`${vec("F")} = I ${vec("ℓ")} ∧ ${vec("B")}, de valeur F = I ℓ B sin α`)}
          <p>ℓ⃗ est orienté dans le sens du courant ; α est l’angle entre le conducteur et B⃗. Le sens se trouve avec la règle des trois doigts de la main droite ou le bonhomme d’Ampère.</p>
          ${exemple(["Une tige de 10 cm parcourue par 5 A, perpendiculaire à B = 0,2 T : F = 5 × 0,10 × 0,2 = 0,1 N."])}
          ${retenir("La force est maximale quand le conducteur est perpendiculaire au champ, nulle quand il lui est parallèle.")}`,
      },
      {
        title: "Applications de la loi de Laplace",
        minutes: 10,
        body: `${liste([
            "<strong>rails de Laplace</strong> : une tige posée sur deux rails alimentés se met à rouler ;",
            "<strong>moteur électrique à courant continu</strong> : des forces de Laplace sur les côtés d’une bobine créent un couple qui la fait tourner ;",
            "<strong>haut-parleur</strong> : une bobine dans le champ d’un aimant fait vibrer la membrane au rythme du courant ;",
            "<strong>roue de Barlow</strong> : une roue conductrice tourne entre les pôles d’un aimant.",
          ])}
          ${retenir("La force de Laplace transforme de l’énergie électrique en énergie mécanique.")}`,
      },
    ],
  },
  {
    title: "Induction magnétique et dipôle (R, L)",
    summary: "Flux, loi de Faraday et de Lenz, auto-induction, établissement du courant dans une bobine.",
    lessons: [
      {
        title: "Le phénomène d’induction",
        minutes: 15,
        body: `<p>Le <strong>flux magnétique</strong> à travers un circuit de N spires de surface S est Φ = N B S cos θ (en weber, Wb), θ étant l’angle entre B⃗ et la normale au circuit.</p>
          ${retenir("Loi de Faraday : toute variation du flux à travers un circuit y crée une force électromotrice induite e = −dΦ/dt.")}
          ${retenir("Loi de Lenz : le courant induit a un sens tel qu’il s’oppose, par ses effets, à la cause qui lui donne naissance.")}
          ${exemple([
            "Bobine de 100 spires de 20 cm² ; B passe de 0 à 0,5 T en 0,1 s, perpendiculairement aux spires.",
            "ΔΦ = 100 × 0,5 × 20 × 10<sup>−4</sup> = 0,1 Wb, donc |e| = 0,1 ÷ 0,1 = 1 V.",
          ])}
          <p>Applications : alternateur (une bobine tourne dans un champ, ou un aimant tourne devant une bobine), dynamo de vélo, transformateur, plaques à induction.</p>`,
      },
      {
        title: "Auto-induction et dipôle (R, L)",
        minutes: 15,
        body: `<p>Une bobine traversée par un courant variable crée elle-même un flux variable : Φ = L i, où L est l’<strong>inductance</strong> (henry, H). La tension à ses bornes (résistance r) est :</p>
          ${formula(`u<sub>L</sub> = r i + L ${frac("di", "dt")}`)}
          <p>Dans un circuit (R, L) alimenté sous une tension E, le courant ne s’établit pas instantanément :</p>
          ${formula(`i(t) = ${frac("E", "R")}(1 − e${sup("−t/τ")}), avec τ = ${frac("L", "R")} (constante de temps)`)}
          ${liste([
            "au bout de 5τ, le régime permanent est pratiquement atteint ;",
            "la bobine s’oppose aux variations du courant (étincelle de rupture) ;",
            "énergie emmagasinée : E<sub>m</sub> = ½ L i².",
          ])}
          ${exemple(["L = 0,5 H et R = 50 Ω : τ = 0,01 s ; le courant s’établit en 0,05 s environ."])}`,
      },
    ],
  },
  {
    title: "Étude du dipôle (R, C)",
    summary: "Condensateur, charge et décharge, constante de temps, énergie emmagasinée.",
    lessons: [
      {
        title: "Le condensateur",
        minutes: 10,
        body: `<p>Un <strong>condensateur</strong> est formé de deux armatures conductrices séparées par un isolant. Il porte les charges +q et −q, proportionnelles à la tension :</p>
          ${formula(`q = C u, et i = ${frac("dq", "dt")} = C ${frac("du", "dt")}`)}
          <p>C est la <strong>capacité</strong>, en farad (F) ; on utilise souvent le µF ou le nF. Pour un condensateur plan : C = ε${frac("S", "e")}.</p>
          ${formula("Énergie emmagasinée : E = ½ C u²")}
          ${exemple(["C = 100 µF chargé sous 12 V : q = 1,2 × 10<sup>−3</sup> C et E = ½ × 10<sup>−4</sup> × 144 = 7,2 mJ (flash d’appareil photo)."])}`,
      },
      {
        title: "Charge et décharge d’un condensateur",
        minutes: 15,
        body: `<p>Un condensateur se charge à travers une résistance R sous une tension E. La loi des mailles donne l’équation différentielle RC ${frac("du", "dt")} + u = E, dont la solution est :</p>
          ${formula(`Charge : u<sub>C</sub>(t) = E(1 − e${sup("−t/τ")}) ; décharge : u<sub>C</sub>(t) = E e${sup("−t/τ")} ; τ = RC`)}
          ${liste([
            "τ s’exprime en secondes ; à t = τ, le condensateur est chargé à 63 % ;",
            "la tangente à l’origine de la courbe de charge coupe l’asymptote u = E à l’instant τ ;",
            "après 5τ, la charge (ou la décharge) est pratiquement terminée.",
          ])}
          ${exemple(["R = 10 kΩ et C = 100 µF : τ = 1 s, la charge dure environ 5 s."])}
          ${retenir("La tension aux bornes d’un condensateur ne peut pas varier brusquement ; l’intensité, si.")}`,
      },
    ],
  },
  {
    title: "Oscillations électriques libres et forcées",
    summary: "Circuit LC, amortissement, circuit RLC en régime sinusoïdal forcé, résonance, puissance.",
    lessons: [
      {
        title: "Oscillations électriques libres",
        minutes: 15,
        body: `<p>Un condensateur chargé se décharge dans une bobine idéale (circuit LC). La loi des mailles donne :</p>
          ${formula(`${frac("d²q", "dt²")} + ${frac("1", "LC")} q = 0`)}
          <p>Ses solutions sont sinusoïdales : q = Q<sub>m</sub> cos(ω₀t + φ), avec la pulsation propre et la période propre :</p>
          ${formula(`ω₀ = ${frac("1", sqrt("(LC)"))} et T₀ = 2π${sqrt("(LC)")}`)}
          ${retenir("Sans résistance, l’énergie totale ½ q²/C + ½ L i² se conserve : elle passe sans cesse du condensateur à la bobine.")}
          <p>Avec une résistance R, l’énergie se dissipe par effet Joule : régime <strong>pseudo-périodique</strong> (oscillations amorties) si R est faible, <strong>apériodique</strong> (pas d’oscillation) si R est grand, <strong>critique</strong> à la limite.</p>
          ${exemple(["L = 0,1 H et C = 10 µF : T₀ = 2π √(10<sup>−6</sup>) ≈ 6,3 ms."])}`,
      },
      {
        title: "Circuit RLC en régime forcé et résonance",
        minutes: 18,
        body: `<p>Un générateur impose u(t) = U<sub>m</sub> cos ωt à un dipôle RLC série. Le courant a la même pulsation : i = I<sub>m</sub> cos(ωt + φ). La construction de Fresnel donne :</p>
          ${formula(`Z = ${frac("U<sub>m</sub>", "I<sub>m</sub>")} = ${sqrt("[R² + (Lω − 1/(Cω))²]")} ; tan φ = ${frac("1/(Cω) − Lω", "R")}`)}
          ${retenir(`<strong>Résonance d’intensité</strong> : pour ω = ω₀ = ${frac("1", sqrt("(LC)"))}, Z = R est minimale et l’intensité maximale ; u et i sont en phase.`)}
          ${liste([
            "bande passante : intervalle des pulsations pour lesquelles I ≥ I<sub>max</sub>/√2 ; sa largeur est Δω = R/L ;",
            "facteur de qualité : Q = ω₀/Δω = Lω₀/R ; plus Q est grand, plus la résonance est aiguë (circuit d’accord d’une radio).",
          ])}
          <h2>Puissance</h2>
          ${formula("P = U I cos φ (U et I efficaces) ; facteur de puissance : cos φ = R/Z")}
          ${retenir("Un mauvais facteur de puissance augmente l’intensité, donc les pertes en ligne : la SENELEC pénalise les gros consommateurs dont le cos φ est trop faible.")}`,
      },
    ],
  },
  {
    title: "Oscillations mécaniques libres",
    summary: "Pendule élastique, pendule simple, énergie et amortissement.",
    lessons: [
      {
        title: "Le pendule élastique",
        minutes: 15,
        body: `<p>Un solide de masse m, accroché à un ressort de raideur k, glisse sans frottement sur un plan horizontal. La relation fondamentale donne :</p>
          ${formula(`${frac("d²x", "dt²")} + ${frac("k", "m")} x = 0`)}
          <p>C’est un <strong>oscillateur harmonique</strong> : x = X<sub>m</sub> cos(ω₀t + φ), avec :</p>
          ${formula(`ω₀ = ${sqrt("(k/m)")} et T₀ = 2π${sqrt("(m/k)")}`)}
          ${liste([
            "la période ne dépend pas de l’amplitude ;",
            "l’énergie mécanique ½ m v² + ½ k x² = ½ k X<sub>m</sub>² se conserve en l’absence de frottement.",
          ])}
          ${exemple(["m = 0,2 kg et k = 20 N/m : ω₀ = 10 rad/s et T₀ ≈ 0,63 s."])}`,
      },
      {
        title: "Pendule simple et amortissement",
        minutes: 12,
        body: `<p>Un pendule simple est une petite masse au bout d’un fil de longueur ℓ. Pour de petites oscillations (θ &lt; 15° environ), sin θ ≈ θ et :</p>
          ${formula(`${frac("d²θ", "dt²")} + ${frac("g", "ℓ")} θ = 0, d’où T₀ = 2π${sqrt("(ℓ/g)")}`)}
          ${exemple(["Un pendule de 1 m de long bat environ toutes les 2 s : T₀ = 2π √(1 ÷ 9,8) ≈ 2,0 s."])}
          <p>Avec des frottements, l’amplitude diminue : régime pseudo-périodique si le frottement est faible, apériodique s’il est fort (amortisseurs de voiture).</p>
          ${retenir("Oscillateurs mécaniques et électriques obéissent à la même équation : m ↔ L, k ↔ 1/C, x ↔ q, frottement ↔ résistance.")}`,
      },
    ],
  },
  {
    title: "Interférences lumineuses",
    summary: "Fentes de Young, différence de marche, interfrange, nature ondulatoire de la lumière.",
    lessons: [
      {
        title: "L’expérience des fentes de Young",
        minutes: 15,
        body: `<p>Deux fentes fines F₁ et F₂, distantes de a, sont éclairées par la même source monochromatique : ce sont deux sources <strong>cohérentes</strong>. Sur un écran à la distance D, on observe des franges alternativement brillantes et sombres, régulièrement espacées.</p>
          ${formula(`Différence de marche en un point d’abscisse x : δ = ${frac("a x", "D")}`)}
          ${liste([
            "frange brillante (interférence constructive) : δ = kλ, k entier ;",
            "frange sombre (interférence destructive) : δ = (k + ½)λ.",
          ])}
          ${formula(`Interfrange : i = ${frac("λ D", "a")}`)}
          ${exemple(["λ = 600 nm, a = 1 mm, D = 2 m : i = 600 × 10<sup>−9</sup> × 2 ÷ 10<sup>−3</sup> = 1,2 mm."])}`,
      },
      {
        title: "Interprétation et applications",
        minutes: 10,
        body: `<p>Les interférences ne s’expliquent que si la lumière est une <strong>onde</strong> : deux vibrations en phase s’ajoutent, deux vibrations en opposition de phase s’annulent. La diffraction par une fente fine en est un autre signe.</p>
          ${liste([
            "en mesurant i, a et D, on détermine la longueur d’onde λ = a i / D ;",
            "en lumière blanche, chaque couleur donne son système de franges : la frange centrale est blanche, les autres sont irisées ;",
            "domaine visible : de 400 nm (violet) à 800 nm (rouge) environ.",
          ])}
          ${retenir("Une onde lumineuse de fréquence ν a pour longueur d’onde dans le vide λ = c/ν, avec c = 3,00 × 10<sup>8</sup> m/s.")}`,
      },
    ],
  },
  {
    title: "Effet photoélectrique",
    summary: "Mise en évidence, seuil photoélectrique, photon, relation d’Einstein, dualité onde-corpuscule.",
    lessons: [
      {
        title: "Mise en évidence de l’effet photoélectrique",
        minutes: 12,
        body: `<p>Une plaque de zinc chargée négativement se décharge quand on l’éclaire en ultraviolet, mais pas en lumière visible, même intense (expérience de Hertz) : la lumière arrache des électrons au métal.</p>
          ${liste([
            "l’effet n’a lieu que si la fréquence ν de la lumière dépasse une <strong>fréquence seuil</strong> ν₀ propre au métal (ou si λ &lt; λ₀) ;",
            "l’intensité lumineuse change le nombre d’électrons arrachés, pas leur énergie ;",
            "dans une cellule photoélectrique, ces électrons créent un courant.",
          ])}
          ${retenir("La théorie ondulatoire n’explique pas l’existence d’un seuil : il faut un modèle corpusculaire de la lumière.")}`,
      },
      {
        title: "Le photon et la relation d’Einstein",
        minutes: 15,
        body: `<p>Einstein (1905) : la lumière est formée de <strong>photons</strong>, chacun transportant l’énergie</p>
          ${formula("E = h ν = h c / λ, avec h = 6,62 × 10<sup>−34</sup> J·s")}
          <p>Un photon cède toute son énergie à un électron. Il faut au moins W₀ = hν₀ (travail d’extraction) pour l’arracher ; le reste devient énergie cinétique :</p>
          ${formula("h ν = W₀ + E<sub>c max</sub> ; potentiel d’arrêt : e U₀ = E<sub>c max</sub>")}
          ${exemple([
            "Césium : W₀ = 1,9 eV. Lumière de λ = 500 nm : E = 6,62 × 10<sup>−34</sup> × 3 × 10<sup>8</sup> ÷ (5 × 10<sup>−7</sup>) ≈ 3,97 × 10<sup>−19</sup> J ≈ 2,5 eV.",
            "E<sub>c max</sub> ≈ 2,5 − 1,9 = 0,6 eV.",
          ])}
          ${retenir("<strong>Dualité onde-corpuscule</strong> : la lumière se comporte comme une onde (interférences) ou comme des particules (effet photoélectrique) selon l’expérience. 1 eV = 1,6 × 10<sup>−19</sup> J.")}`,
      },
    ],
  },
  {
    title: "Niveaux d’énergie de l’atome",
    summary: "Quantification, spectres d’émission et d’absorption, atome d’hydrogène.",
    lessons: [
      {
        title: "Quantification de l’énergie et spectres",
        minutes: 12,
        body: `<p>L’énergie d’un atome ne peut prendre que certaines valeurs : elle est <strong>quantifiée</strong>. Le niveau le plus bas est l’état fondamental ; les autres sont des états excités.</p>
          ${formula("Passage du niveau E<sub>p</sub> au niveau E<sub>n</sub> &lt; E<sub>p</sub> : émission d’un photon de fréquence ν = (E<sub>p</sub> − E<sub>n</sub>) / h")}
          ${liste([
            "un gaz chaud émet un <strong>spectre de raies</strong> (spectre discontinu), caractéristique de l’élément ;",
            "un gaz froid éclairé en lumière blanche absorbe exactement les mêmes radiations : spectre d’absorption (raies noires) ;",
            "un solide ou un liquide chaud émet un spectre continu.",
          ])}
          ${retenir("L’analyse du spectre de la lumière d’une étoile donne sa composition chimique et sa température.")}`,
      },
      {
        title: "L’atome d’hydrogène",
        minutes: 15,
        body: `${formula(`E<sub>n</sub> = −${frac("13,6", "n²")} eV, n = 1, 2, 3… (nombre quantique principal)`)}
          ${liste([
            "état fondamental : E₁ = −13,6 eV ; énergie d’ionisation : 13,6 eV ;",
            "série de <strong>Lyman</strong> : retour au niveau n = 1 (ultraviolet) ;",
            "série de <strong>Balmer</strong> : retour au niveau n = 2 (en partie visible) ;",
            "série de <strong>Paschen</strong> : retour au niveau n = 3 (infrarouge).",
          ])}
          ${exemple([
            "Transition 3 → 2 : ΔE = 13,6(¼ − 1/9) ≈ 1,89 eV ≈ 3,02 × 10<sup>−19</sup> J.",
            "λ = hc/ΔE ≈ 6,62 × 10<sup>−34</sup> × 3 × 10<sup>8</sup> ÷ (3,02 × 10<sup>−19</sup>) ≈ 658 nm : la raie rouge de l’hydrogène.",
          ])}
          ${retenir("Longueur d’onde limite d’une série : transition depuis n infini, par exemple 365 nm pour Balmer.")}`,
      },
    ],
  },
  {
    title: "Réactions nucléaires",
    summary: "Noyau, énergie de liaison, radioactivité, décroissance, fission et fusion.",
    lessons: [
      {
        title: "Le noyau et l’énergie de liaison",
        minutes: 15,
        body: `<p>Un noyau ${sup("A")}<sub>Z</sub>X contient Z protons et N = A − Z neutrons (les nucléons). Des <strong>isotopes</strong> ont le même Z et des A différents.</p>
          <p>La masse d’un noyau est inférieure à la somme des masses de ses nucléons : c’est le <strong>défaut de masse</strong> Δm. Selon Einstein (E = mc²), il correspond à l’<strong>énergie de liaison</strong> :</p>
          ${formula("E<sub>ℓ</sub> = Δm c², avec 1 u = 1,66 × 10<sup>−27</sup> kg ↔ 931,5 MeV")}
          ${retenir("Plus l’énergie de liaison par nucléon E<sub>ℓ</sub>/A est grande, plus le noyau est stable. Les noyaux les plus stables ont A voisin de 60 (fer) : courbe d’Aston.")}
          ${exemple(["Hélium 4 : Δm ≈ 0,0304 u, donc E<sub>ℓ</sub> ≈ 28,3 MeV, soit environ 7,1 MeV par nucléon."])}`,
      },
      {
        title: "Radioactivité et décroissance",
        minutes: 15,
        body: `${tableau([
            ["Type", "Particule émise", "Équation"],
            ["α", "noyau d’hélium", "<sup>A</sup><sub>Z</sub>X → <sup>A−4</sup><sub>Z−2</sub>Y + <sup>4</sup><sub>2</sub>He"],
            ["β⁻", "électron", "un neutron devient un proton : Z augmente de 1"],
            ["β⁺", "positon", "un proton devient un neutron : Z diminue de 1"],
            ["γ", "photon", "désexcitation du noyau fils"],
          ])}
          ${retenir("Lois de Soddy : le nombre de masse A et le nombre de charge Z se conservent dans une réaction nucléaire.")}
          ${formula(`N(t) = N₀ e${sup("−λt")} ; demi-vie T = ${frac("ln 2", "λ")} ; activité A = λN (becquerel, Bq)`)}
          ${exemple([
            "Le carbone 14 a une demi-vie de 5730 ans. Un bois ancien a une activité égale au quart de celle d’un bois vivant : il s’est écoulé 2 demi-vies, soit environ 11 460 ans.",
          ])}`,
      },
      {
        title: "Fission, fusion et applications",
        minutes: 12,
        body: `${liste([
            "<strong>Fission</strong> : un noyau lourd (uranium 235) frappé par un neutron se casse en deux noyaux plus légers et libère 2 ou 3 neutrons : réaction en chaîne, contrôlée dans les centrales nucléaires ;",
            "<strong>Fusion</strong> : deux noyaux légers (isotopes de l’hydrogène) s’unissent ; c’est la source d’énergie du Soleil.",
          ])}
          ${formula("Énergie libérée : E = (m<sub>réactifs</sub> − m<sub>produits</sub>) c²")}
          ${exemple(["Une fission de ²³⁵U libère environ 200 MeV, soit des millions de fois plus qu’une réaction chimique."])}
          ${retenir("Les rayonnements ionisants sont dangereux : on s’en protège par la distance, des écrans (plomb, béton) et une durée d’exposition courte. Ils servent aussi en médecine (radiothérapie, imagerie) et pour la datation.")}`,
      },
    ],
  },
];
