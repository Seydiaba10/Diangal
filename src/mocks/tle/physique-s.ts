// Physique de Terminale S1 et S2 (programme de sciences physiques d'août 2008, Office du Bac) :
// chapitres P1 à P15. Hors programme respecté : hodographes, loi de Biot et Savart, impédances
// complexes, cellule photoélectrique et potentiel d'arrêt, effet Compton, relativité. Le mouvement
// circulaire sinusoïdal et le théorème de l'accélération angulaire sont signalés « S1 et S3 ».
// Leçons rédigées par DIANGAL, à faire valider par un enseignant.

import {
  auBac,
  type ChapterSpec,
  definition,
  erreurs,
  exercice,
  formula,
  frac,
  liste,
  methode,
  objectifs,
  retenir,
  sqrt,
  sup,
  tableau,
  vec,
} from "./blocks";

export const PHYSIQUE_TLE_S: ChapterSpec[] = [
  {
    title: "Cinématique du point",
    summary: "Vecteurs position, vitesse et accélération ; mouvements rectilignes et circulaires.",
    lessons: [
      {
        title: "Position, vitesse et accélération",
        minutes: 30,
        body: `${objectifs([
            "choisir un référentiel et un repère ;",
            "définir et calculer les vecteurs position, vitesse et accélération ;",
            "utiliser le repère de Frenet pour un mouvement curviligne.",
          ])}
          <h2>1. Référentiel et repère</h2>
          <p>Le mouvement d’un point dépend du <strong>référentiel</strong> d’étude (solide de référence muni d’une horloge) : un passager assis dans un car est immobile par rapport au car mais en mouvement par rapport à la route. On utilise surtout les référentiels terrestre, géocentrique et héliocentrique.</p>
          <p>Dans un repère (O ; i⃗, j⃗, k⃗) lié au référentiel, la position du point M est donnée par le <strong>vecteur position</strong> ${vec("OM")}(t) = x(t) i⃗ + y(t) j⃗ + z(t) k⃗. Les fonctions x(t), y(t), z(t) sont les <strong>équations horaires</strong> ; la courbe décrite est la <strong>trajectoire</strong>.</p>
          <h2>2. Vitesse et accélération</h2>
          ${formula(`${vec("v")} = ${frac(`d${vec("OM")}`, "dt")} (m/s) et ${vec("a")} = ${frac(`d${vec("v")}`, "dt")} = ${frac(`d²${vec("OM")}`, "dt²")} (m/s²)`)}
          ${liste([
            "les coordonnées de v⃗ sont les dérivées de x, y, z ; celles de a⃗ sont les dérivées de celles de v⃗ ;",
            "le vecteur vitesse est toujours <strong>tangent à la trajectoire</strong>, dans le sens du mouvement ;",
            `réciproquement, connaissant a⃗, on retrouve v⃗ puis ${vec("OM")} par <strong>intégration</strong>, en utilisant les <strong>conditions initiales</strong>.`,
          ])}
          <h2>3. Repère de Frenet</h2>
          <p>Sur une trajectoire courbe, on utilise le vecteur unitaire τ⃗ tangent (dans le sens du mouvement) et le vecteur unitaire n⃗ normal, dirigé vers l’intérieur de la courbe :</p>
          ${formula(`${vec("a")} = ${frac("dv", "dt")} τ⃗ + ${frac("v²", "ρ")} n⃗ (ρ : rayon de courbure)`)}
          <p>L’accélération tangentielle traduit la variation de la valeur de la vitesse ; l’accélération normale, le changement de direction.</p>
          ${retenir("Si a⃗ · v⃗ &gt; 0, le mouvement est accéléré ; si a⃗ · v⃗ &lt; 0, il est retardé (décéléré) ; si a⃗ · v⃗ = 0 avec v constante, il est uniforme.")}
          ${exercice(
            "Les équations horaires d’un mobile sont x(t) = 2t et y(t) = −5t² + 4t (unités SI). Calcule v⃗ et a⃗, l’instant où la vitesse est horizontale et l’équation de la trajectoire.",
            [
              "v⃗ (2 ; −10t + 4) et a⃗ (0 ; −10) : l’accélération est constante, verticale, vers le bas.",
              "La vitesse est horizontale quand v<sub>y</sub> = 0 : −10t + 4 = 0, soit t = <strong>0,4 s</strong> ; le mobile est alors au sommet, en y = −0,8 + 1,6 = 0,8 m.",
              "t = x ÷ 2, d’où y = −5(x/2)² + 4(x/2) = <strong>−1,25 x² + 2x</strong> : la trajectoire est une parabole.",
            ],
          )}
          ${erreurs(["confondre trajectoire y = f(x) et équation horaire y(t) ;", "oublier les conditions initiales lors d’une intégration."])}`,
      },
      {
        title: "Mouvements rectilignes",
        minutes: 30,
        body: `${objectifs([
            "établir et utiliser les équations horaires des mouvements rectilignes ;",
            "reconnaître un mouvement uniforme, uniformément varié ou sinusoïdal ;",
            "exploiter un enregistrement.",
          ])}
          ${tableau([
            ["Mouvement", "Accélération", "Équations horaires", "Propriété caractéristique"],
            ["rectiligne <strong>uniforme</strong>", "a = 0", "x = v t + x₀", "distances égales pendant des durées égales"],
            ["rectiligne <strong>uniformément varié</strong>", "a constante ≠ 0", "v = a t + v₀ ; x = ½ a t² + v₀ t + x₀", "v² − v₀² = 2a(x − x₀)"],
            ["rectiligne <strong>sinusoïdal</strong>", "a = −ω² x", "x = X<sub>m</sub> cos(ωt + φ)", `${frac("d²x", "dt²")} + ω² x = 0`],
          ])}
          <h2>1. Mouvement uniformément varié</h2>
          <p>Il est <strong>accéléré</strong> si a et v ont le même signe, <strong>retardé</strong> sinon. Sur un enregistrement à intervalles de temps τ égaux, les distances parcourues successives augmentent (ou diminuent) d’une même quantité aτ².</p>
          <h2>2. Mouvement sinusoïdal</h2>
          ${liste([
            "X<sub>m</sub> est l’<strong>amplitude</strong>, ω la <strong>pulsation</strong> (rad/s), φ la <strong>phase à l’origine</strong> ;",
            `période T = ${frac("2π", "ω")} (s) et fréquence N = ${frac("1", "T")} (Hz) ;`,
            "v = −X<sub>m</sub> ω sin(ωt + φ) : la vitesse est maximale (X<sub>m</sub>ω) au centre et nulle aux extrémités ;",
            "X<sub>m</sub> et φ se déterminent à partir des conditions initiales.",
          ])}
          ${exercice(
            "Une voiture roulant à 72 km/h freine avec une décélération constante de 5 m/s². Quelle distance parcourt-elle avant de s’arrêter, et en combien de temps ?",
            [
              "v₀ = 72 ÷ 3,6 = 20 m/s ; a = −5 m/s² ; v final = 0.",
              "v² − v₀² = 2a d : 0 − 400 = 2 × (−5) × d, donc d = <strong>40 m</strong>.",
              "v = a t + v₀ : 0 = −5t + 20, donc t = <strong>4 s</strong>.",
            ],
          )}
          ${exercice(
            "Un point a un mouvement rectiligne sinusoïdal d’amplitude 4 cm et de période 0,5 s. À t = 0, il passe par x = 4 cm. Écris x(t) et calcule sa vitesse maximale.",
            [
              "ω = 2π ÷ T = 4π rad/s.",
              "x(0) = X<sub>m</sub> cos φ = 0,04 m, donc cos φ = 1 et φ = 0 : <strong>x(t) = 0,04 cos(4πt)</strong>.",
              "v<sub>max</sub> = X<sub>m</sub> ω = 0,04 × 4π ≈ <strong>0,50 m/s</strong>.",
            ],
          )}`,
      },
      {
        title: "Mouvements circulaires",
        minutes: 30,
        body: `${objectifs([
            "repérer un point par son abscisse angulaire ;",
            "décrire les mouvements circulaires uniforme et uniformément varié ;",
            "exprimer l’accélération dans le repère de Frenet.",
          ])}
          <p>Sur un cercle de rayon R, on repère M par son <strong>abscisse angulaire</strong> θ(t) (en rad) ou son abscisse curviligne s = Rθ. La <strong>vitesse angulaire</strong> est ω = ${frac("dθ", "dt")} (rad/s) et la vitesse linéaire v = Rω.</p>
          ${tableau([
            ["Mouvement", "Vitesse angulaire", "Accélération"],
            ["circulaire <strong>uniforme</strong>", "ω constante ; θ = ωt + θ₀", `a⃗ normale, <strong>centripète</strong> : a = ${frac("v²", "R")} = Rω²`],
            ["circulaire <strong>uniformément varié</strong>", `accélération angulaire θ̈ = ${frac("dω", "dt")} constante ; ω = θ̈ t + ω₀`, "a<sub>t</sub> = R θ̈ (tangentielle) et a<sub>n</sub> = Rω² (normale)"],
          ])}
          ${formula(`Mouvement uniforme : période T = ${frac("2π", "ω")} ; fréquence N = ${frac("1", "T")} (tours par seconde)`)}
          <h2>Mouvement circulaire sinusoïdal (séries S1 et S3)</h2>
          <p>Si θ(t) = θ<sub>m</sub> cos(ωt + φ), l’accélération angulaire vérifie θ̈ + ω² θ = 0 : c’est le mouvement d’un pendule qui oscille avec une faible amplitude.</p>
          ${exercice(
            "Une roue de rayon 0,30 m tourne à 10 tours par seconde. Calcule ω, la vitesse d’un point de la jante et son accélération.",
            [
              "ω = 2π × 10 = 20π ≈ <strong>62,8 rad/s</strong>.",
              "v = Rω = 0,30 × 62,8 ≈ <strong>18,8 m/s</strong>.",
              "Mouvement uniforme : a = Rω² = 0,30 × 62,8² ≈ <strong>1,2 × 10³ m/s²</strong>, dirigée vers le centre.",
            ],
          )}
          ${erreurs(["oublier de convertir les tours par minute en rad/s (1 tr/min = 2π/60 rad/s) ;", "dire qu’un mouvement circulaire uniforme n’a pas d’accélération : elle est centripète."])}`,
      },
    ],
  },
  {
    title: "Bases de la dynamique",
    summary: "Centre d’inertie, référentiels galiléens, lois de Newton, quantité de mouvement, chocs, solide en rotation.",
    lessons: [
      {
        title: "Quantité de mouvement et référentiels galiléens",
        minutes: 30,
        body: `${objectifs([
            "définir le centre d’inertie et la quantité de mouvement ;",
            "énoncer le principe de l’inertie et définir un référentiel galiléen ;",
            "utiliser la conservation de la quantité de mouvement (chocs).",
          ])}
          <h2>1. Le centre d’inertie</h2>
          <p>Un solide lancé sur une table à coussin d’air (sans frottement) a un point dont le mouvement est rectiligne uniforme, alors que les autres points ont des mouvements compliqués : c’est le <strong>centre d’inertie</strong> G. Pour un système de points de masses m<sub>i</sub> :</p>
          ${formula(`(Σ m<sub>i</sub>) ${vec("OG")} = Σ m<sub>i</sub> ${vec("OM<sub>i</sub>")} (relation barycentrique)`)}
          <h2>2. La quantité de mouvement</h2>
          ${formula(`${vec("p")} = m ${vec("v<sub>G</sub>")} (en kg·m/s)`)}
          <h2>3. Principe de l’inertie et référentiels galiléens</h2>
          ${retenir("<strong>1<sup>re</sup> loi de Newton</strong> : dans un référentiel galiléen, le centre d’inertie d’un système isolé (aucune force) ou pseudo-isolé (forces qui se compensent) est soit au repos, soit en mouvement rectiligne uniforme.")}
          ${liste([
            "un <strong>référentiel galiléen</strong> est un référentiel dans lequel le principe de l’inertie est vérifié ;",
            "le référentiel <strong>héliocentrique</strong> (de Copernic) est galiléen avec une très bonne précision ;",
            "le référentiel <strong>géocentrique</strong> est considéré comme galiléen pour l’étude des satellites ;",
            "le référentiel <strong>terrestre</strong> est considéré comme galiléen pour des expériences de courte durée.",
          ])}
          <h2>4. Conservation de la quantité de mouvement</h2>
          <p>La quantité de mouvement totale d’un système isolé se conserve, même lors d’un choc ou d’une explosion.</p>
          ${tableau([
            ["Choc", "Ce qui se conserve"],
            ["<strong>élastique</strong>", "la quantité de mouvement <strong>et</strong> l’énergie cinétique totale"],
            ["<strong>mou</strong> (inélastique, les corps restent accrochés)", "la quantité de mouvement seulement ; une partie de l’énergie cinétique est perdue (chaleur, déformation)"],
          ])}
          ${exercice(
            "Un wagon de 2 t roulant à 3 m/s percute un wagon immobile de 1 t et s’y accroche. Calcule leur vitesse commune et l’énergie cinétique perdue.",
            [
              "Système isolé (les forces verticales se compensent) : p avant = p après.",
              "2000 × 3 + 1000 × 0 = 3000 × v, donc v = <strong>2 m/s</strong>.",
              "E<sub>c</sub> avant = ½ × 2000 × 3² = 9000 J ; après = ½ × 3000 × 2² = 6000 J : <strong>3000 J perdus</strong>. C’est un choc mou.",
            ],
          )}
          ${auBac("Dans un choc élastique entre deux billes de même masse, dont l’une est immobile, les billes échangent leurs vitesses : c’est un résultat classique à savoir retrouver.")}`,
      },
      {
        title: "Relation fondamentale de la dynamique",
        minutes: 35,
        body: `${objectifs([
            "énoncer les trois lois de Newton ;",
            "appliquer le théorème du centre d’inertie avec une méthode rigoureuse ;",
            "utiliser le théorème de l’énergie cinétique.",
          ])}
          <h2>1. Les lois de Newton</h2>
          ${formula(`Dans un référentiel galiléen : Σ${vec("F<sub>ext</sub>")} = ${frac(`d${vec("p")}`, "dt")} = m ${vec("a<sub>G</sub>")}`)}
          ${liste([
            "la relation fondamentale de la dynamique est un <strong>postulat</strong> : elle ne se démontre pas, elle est justifiée par l’accord avec l’expérience ;",
            "pour une masse constante, elle donne le <strong>théorème du centre d’inertie</strong> (2<sup>e</sup> loi de Newton) ;",
            "<strong>3<sup>e</sup> loi</strong> (actions réciproques) : si A exerce sur B la force F⃗<sub>A/B</sub>, B exerce sur A la force F⃗<sub>B/A</sub> = −F⃗<sub>A/B</sub>.",
          ])}
          ${methode([
            "Définir le <strong>système</strong> étudié.",
            "Choisir un <strong>référentiel galiléen</strong> et un repère (origine des espaces et des temps).",
            "Faire le <strong>bilan des forces extérieures</strong> et les représenter sur un schéma.",
            "Écrire le théorème du centre d’inertie, puis le <strong>projeter</strong> sur des axes bien choisis.",
            "En déduire a, puis v(t) et x(t) par intégration avec les conditions initiales.",
          ], "Résoudre un problème de dynamique")}
          <h2>2. Les théorèmes relatifs à l’énergie</h2>
          ${retenir("<strong>Théorème de l’énergie cinétique</strong> : dans un référentiel galiléen, entre deux instants, ΔE<sub>c</sub> = E<sub>c2</sub> − E<sub>c1</sub> = ΣW(F⃗<sub>ext</sub>). Si seules des forces conservatives travaillent (poids, ressort), l’énergie mécanique E<sub>m</sub> = E<sub>c</sub> + E<sub>p</sub> se conserve.")}
          ${exercice(
            "Un solide de 2 kg, posé sur un plan horizontal, est tiré par une force horizontale de 10 N ; les frottements équivalent à une force de 2 N opposée au mouvement. Il part du repos. Calcule son accélération, puis sa vitesse après 5 m.",
            [
              "Système : le solide ; référentiel terrestre galiléen. Forces : poids P⃗, réaction normale R⃗<sub>n</sub>, force F⃗, frottement f⃗.",
              "Projection sur l’axe horizontal (sens du mouvement) : F − f = m a, donc a = (10 − 2) ÷ 2 = <strong>4 m/s²</strong>.",
              "Mouvement uniformément accéléré sans vitesse initiale : v² = 2 a d = 2 × 4 × 5 = 40, donc v ≈ <strong>6,3 m/s</strong>.",
              "Vérification par l’énergie : ΔE<sub>c</sub> = (F − f) d = 8 × 5 = 40 J = ½ × 2 × v², même résultat.",
            ],
          )}
          ${erreurs(["oublier une force (la réaction du support, les frottements) ;", "projeter sans avoir orienté l’axe ;", "appliquer la relation fondamentale dans un référentiel non galiléen (un car qui freine)."])}`,
      },
      {
        title: "Solide en rotation autour d’un axe fixe",
        minutes: 30,
        body: `${objectifs([
            "calculer le moment d’inertie d’un solide simple et utiliser le théorème de Huygens ;",
            "calculer l’énergie cinétique d’un solide en rotation ;",
            "appliquer le théorème de l’accélération angulaire (séries S1 et S3).",
          ])}
          <h2>1. Moment d’inertie</h2>
          <p>Le <strong>moment d’inertie</strong> J<sub>Δ</sub> d’un solide par rapport à un axe Δ mesure sa « résistance » à la mise en rotation : J<sub>Δ</sub> = Σ m<sub>i</sub> r<sub>i</sub>², où r<sub>i</sub> est la distance de chaque point à l’axe (kg·m²).</p>
          ${tableau([
            ["Solide (masse m)", "Axe", "Moment d’inertie"],
            ["point matériel à la distance r", "Δ", "m r²"],
            ["anneau ou cylindre creux de rayon R", "axe de révolution", "m R²"],
            ["disque ou cylindre plein de rayon R", "axe de révolution", "½ m R²"],
            ["sphère pleine de rayon R", "diamètre", `${frac("2", "5")} m R²`],
            ["tige de longueur ℓ", "perpendiculaire, par le milieu", `${frac("1", "12")} m ℓ²`],
          ])}
          ${retenir("<strong>Théorème de Huygens</strong> : J<sub>Δ</sub> = J<sub>G</sub> + m d², où J<sub>G</sub> est le moment d’inertie par rapport à l’axe parallèle passant par G et d la distance entre les deux axes.")}
          ${formula("Énergie cinétique de rotation : E<sub>c</sub> = ½ J<sub>Δ</sub> ω²")}
          <h2>2. Théorème de l’accélération angulaire (séries S1 et S3)</h2>
          ${formula(`Σ M<sub>Δ</sub>(${vec("F<sub>ext</sub>")}) = J<sub>Δ</sub> θ̈`)}
          <p>La somme des moments des forces extérieures par rapport à l’axe fixe est égale au produit du moment d’inertie par l’accélération angulaire. On travaille avec les moments algébriques (M = ± F × d, d étant le bras de levier).</p>
          ${exercice(
            "Tige homogène de masse m et de longueur ℓ : calcule son moment d’inertie par rapport à un axe perpendiculaire passant par une extrémité.",
            [
              "J<sub>G</sub> = m ℓ² ÷ 12 ; la distance entre G et l’extrémité est d = ℓ ÷ 2.",
              "Huygens : J = m ℓ²/12 + m (ℓ/2)² = m ℓ²/12 + 3 m ℓ²/12 = <strong>m ℓ²/3</strong>.",
            ],
          )}
          ${exercice(
            "(S1, S3) Un disque homogène de masse 2 kg et de rayon 10 cm, mobile autour de son axe, part du repos sous l’action d’un couple moteur constant de 0,05 N·m. Calcule son accélération angulaire, sa vitesse angulaire après 4 s et son énergie cinétique.",
            [
              "J = ½ m R² = ½ × 2 × 0,1² = 0,01 kg·m².",
              "Théorème de l’accélération angulaire : θ̈ = M ÷ J = 0,05 ÷ 0,01 = <strong>5 rad/s²</strong>.",
              "ω = θ̈ t = 5 × 4 = <strong>20 rad/s</strong> ; E<sub>c</sub> = ½ × 0,01 × 20² = <strong>2 J</strong>.",
              "Vérification : angle parcouru θ = ½ × 5 × 4² = 40 rad ; travail du couple W = M θ = 0,05 × 40 = 2 J = ΔE<sub>c</sub>.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Applications des bases de la dynamique",
    summary: "Chute libre, plan incliné, projectiles, chute dans un fluide, mouvements circulaires, particule dans un champ électrique.",
    lessons: [
      {
        title: "Chute libre et plan incliné",
        minutes: 30,
        body: `${objectifs([
            "établir les équations horaires d’une chute libre verticale ;",
            "étudier un mouvement sur un plan incliné, avec ou sans frottement ;",
            "déterminer g à partir d’un enregistrement.",
          ])}
          <h2>1. Chute libre verticale</h2>
          <p>Un corps en <strong>chute libre</strong> n’est soumis qu’à son poids. Le théorème du centre d’inertie donne m a⃗ = m g⃗, donc <strong>a⃗ = g⃗</strong> (g ≈ 9,8 m/s²), quelle que soit la masse.</p>
          ${formula("Axe vertical orienté vers le bas, départ sans vitesse : v = g t et z = ½ g t², d’où v² = 2 g z")}
          <h2>2. Plan incliné</h2>
          <p>Un solide glisse sur un plan incliné d’un angle α sur l’horizontale. Forces : poids P⃗, réaction R⃗ (perpendiculaire au plan s’il n’y a pas de frottement), éventuellement une force de frottement f⃗ parallèle au plan et opposée au mouvement.</p>
          ${formula(`Projection sur la ligne de plus grande pente (vers le bas) : a = g sin α − ${frac("f", "m")}`)}
          <p>Sans frottement, a = g sin α : la mesure de a sur un plan de pente connue permet de déterminer g.</p>
          ${exercice(
            "Un solide de 0,5 kg part du repos sur un plan incliné à 30° ; la force de frottement vaut 0,5 N (g = 10 m/s²). Calcule l’accélération et la vitesse après 2 m de parcours.",
            [
              "a = g sin α − f/m = 10 × 0,5 − 0,5 ÷ 0,5 = 5 − 1 = <strong>4 m/s²</strong>.",
              "Mouvement uniformément accéléré sans vitesse initiale : v² = 2 a d = 2 × 4 × 2 = 16, donc v = <strong>4 m/s</strong>.",
              "Sans frottement, on aurait a = 5 m/s² et v ≈ 4,5 m/s : le frottement a dissipé f × d = 1 J.",
            ],
          )}
          ${erreurs(["écrire a = g cos α : c’est sin α pour la composante parallèle au plan ;", "croire qu’un corps lourd tombe plus vite qu’un corps léger dans le vide."])}`,
      },
      {
        title: "Mouvement d’un projectile",
        minutes: 35,
        body: `${objectifs([
            "établir les équations horaires et l’équation de la trajectoire d’un projectile ;",
            "calculer la portée et la flèche ;",
            "résoudre un problème de tir (atteindre une cible).",
          ])}
          <p>Un projectile est lancé depuis O avec une vitesse v⃗₀ faisant un angle α avec l’horizontale. On néglige l’air : a⃗ = g⃗. Repère : Ox horizontal, Oz vertical vers le haut.</p>
          ${tableau([
            ["", "Selon Ox", "Selon Oz"],
            ["accélération", "0", "−g"],
            ["vitesse", "v₀ cos α (constante)", "−g t + v₀ sin α"],
            ["position", "x = (v₀ cos α) t", "z = −½ g t² + (v₀ sin α) t"],
          ])}
          <p>Le mouvement horizontal est uniforme, le mouvement vertical uniformément varié. En éliminant t (t = x ÷ (v₀ cos α)), on obtient une <strong>parabole</strong> :</p>
          ${formula(`z = −${frac("g", "2 v₀² cos² α")} x² + (tan α) x`)}
          ${liste([
            `<strong>flèche</strong> (hauteur maximale, quand v<sub>z</sub> = 0) : h = ${frac("v₀² sin² α", "2g")} ;`,
            `<strong>portée</strong> horizontale (retour à z = 0) : d = ${frac("v₀² sin 2α", "g")}, maximale pour α = 45° ;`,
            "deux angles complémentaires (30° et 60°) donnent la même portée.",
          ])}
          ${exercice(
            "Une pierre est lancée horizontalement à 10 m/s du haut d’une falaise de 45 m (g = 10 m/s²). Combien de temps dure la chute et à quelle distance du pied de la falaise tombe-t-elle ?",
            [
              "Origine au point de lancement, Oz vers le bas : x = 10 t et z = 5 t².",
              "Arrivée au sol : z = 45, donc t² = 9 et t = <strong>3 s</strong>.",
              "x = 10 × 3 = <strong>30 m</strong>. La vitesse à l’arrivée a pour composantes 10 m/s et 30 m/s : v ≈ 31,6 m/s.",
            ],
          )}
          ${auBac("Pour savoir si un projectile passe au-dessus d’un obstacle, calcule z pour l’abscisse x de l’obstacle à l’aide de l’équation de la trajectoire, puis compare à sa hauteur.")}`,
      },
      {
        title: "Chute verticale dans un fluide",
        minutes: 25,
        body: `${objectifs([
            "faire le bilan des forces sur un corps qui tombe dans un fluide ;",
            "distinguer régime transitoire et régime permanent ;",
            "calculer une vitesse limite.",
          ])}
          <p>Dans un fluide (air, eau, huile), un corps est soumis à trois forces :</p>
          ${liste([
            "son <strong>poids</strong> P = m g ;",
            "la <strong>poussée d’Archimède</strong>, verticale vers le haut, égale au poids du fluide déplacé : Π = ρ<sub>f</sub> V g ;",
            "une <strong>force de frottement</strong> opposée à la vitesse, qui augmente avec elle : f = k v (vitesses faibles) ou f = k v² (vitesses plus grandes).",
          ])}
          ${formula(`m ${frac("dv", "dt")} = m g − ρ<sub>f</sub> V g − k v`)}
          ${tableau([
            ["Régime", "Ce qui se passe"],
            ["transitoire", "la vitesse augmente, le frottement aussi, l’accélération diminue"],
            ["permanent", "les forces se compensent : la vitesse est constante, c’est la <strong>vitesse limite</strong>"],
          ])}
          ${formula(`v<sub>lim</sub> = ${frac("(m − ρ<sub>f</sub> V) g", "k")}`)}
          <p>La méthode d’Euler permet de calculer la vitesse pas à pas à partir de l’équation différentielle. Le parachute augmente beaucoup k et réduit la vitesse limite à quelques m/s.</p>
          ${exercice(
            "Une bille de poids 0,10 N tombe dans de la glycérine ; la poussée d’Archimède vaut 0,02 N et le frottement f = 0,4 v (SI). Calcule la vitesse limite et l’accélération au départ (vitesse nulle, g = 10 m/s²).",
            [
              "Régime permanent : P = Π + k v<sub>lim</sub>, donc v<sub>lim</sub> = (0,10 − 0,02) ÷ 0,4 = <strong>0,2 m/s</strong>.",
              "Au départ, v = 0 : pas de frottement. m = 0,01 kg, donc a₀ = (0,10 − 0,02) ÷ 0,01 = <strong>8 m/s²</strong>, moins que g à cause de la poussée.",
            ],
          )}`,
      },
      {
        title: "Mouvements circulaires : pendule conique, virage, fronde",
        minutes: 30,
        body: `${objectifs([
            "appliquer le théorème du centre d’inertie à un mouvement circulaire uniforme ;",
            "étudier le pendule conique, le virage relevé et la fronde ;",
            "étudier un mouvement sur une piste circulaire verticale.",
          ])}
          <p>Pour un mouvement circulaire uniforme de rayon R, l’accélération est centripète : la somme des forces est dirigée vers le centre et vaut m${frac("v²", "R")} = m R ω².</p>
          ${tableau([
            ["Situation", "Résultat"],
            ["<strong>pendule conique</strong> (fil de longueur ℓ faisant l’angle θ avec la verticale)", `tan θ = ${frac("v²", "R g")} et cos θ = ${frac("g", "ℓ ω²")} ; tension T = ${frac("m g", "cos θ")}`],
            ["<strong>virage relevé</strong> d’un angle α, sans frottement latéral", `tan α = ${frac("v²", "R g")}`],
            ["<strong>fronde</strong>", "la tension du fil fournit la force centripète ; si le fil casse, la pierre part selon la tangente"],
          ])}
          <h2>Mouvements curvilignes</h2>
          <p>Pour un solide qui glisse sur une calotte sphérique ou un pendule qui tourne dans un plan vertical, la vitesse varie : on la calcule avec le <strong>théorème de l’énergie cinétique</strong>, puis on projette le théorème du centre d’inertie sur la normale pour trouver la réaction ou la tension. Le solide quitte la calotte quand la réaction s’annule.</p>
          ${exercice(
            "Un pendule conique est formé d’une bille de 100 g au bout d’un fil de 0,5 m ; le fil fait 60° avec la verticale (g = 10 m/s²). Calcule la vitesse angulaire, la période et la tension du fil.",
            [
              "cos θ = g ÷ (ℓ ω²), donc ω² = g ÷ (ℓ cos θ) = 10 ÷ (0,5 × 0,5) = 40 et ω ≈ <strong>6,3 rad/s</strong>.",
              "T<sub>période</sub> = 2π ÷ ω ≈ <strong>1,0 s</strong>.",
              "Projection verticale : T cos θ = m g, donc T = 0,1 × 10 ÷ 0,5 = <strong>2 N</strong>.",
            ],
          )}
          ${exercice(
            "Quel angle d’inclinaison faut-il donner à un virage de rayon 100 m pour qu’une voiture le prenne à 72 km/h sans frottement latéral (g = 10 m/s²) ?",
            ["v = 20 m/s ; tan α = v² ÷ (R g) = 400 ÷ 1000 = 0,4.", "α ≈ <strong>22°</strong>."],
          )}`,
      },
      {
        title: "Particule chargée dans un champ électrique uniforme",
        minutes: 35,
        body: `${objectifs([
            "étudier le mouvement d’une particule chargée accélérée par un champ uniforme ;",
            "établir la trajectoire parabolique et la déflexion électrique ;",
            "expliquer le principe de l’oscilloscope.",
          ])}
          <p>Entre deux plaques parallèles distantes de d, soumises à la tension U, le champ électrique est uniforme : E = ${frac("U", "d")} (V/m), dirigé de la plaque + vers la plaque −. Une particule de charge q et de masse m subit F⃗ = qE⃗ ; son poids est négligeable devant cette force.</p>
          <h2>1. Vitesse initiale nulle ou parallèle au champ</h2>
          <p>Le mouvement est rectiligne uniformément varié, d’accélération a = ${frac("|q| E", "m")}. Le théorème de l’énergie cinétique donne directement :</p>
          ${formula("½ m v² − ½ m v₀² = |q| U")}
          <h2>2. Vitesse initiale perpendiculaire au champ</h2>
          <p>La particule entre en O avec v⃗₀ selon Ox ; le champ est selon Oy. Comme pour un projectile :</p>
          ${formula(`x = v₀ t et y = ${frac("|q| E", "2m")} t², d’où y = ${frac("|q| U", "2 m d v₀²")} x²`)}
          <p>La trajectoire est une portion de <strong>parabole</strong> entre les plaques, puis une droite après la sortie. La <strong>déflexion</strong> sur un écran placé à la distance L du milieu des plaques (longueur ℓ) est :</p>
          ${formula(`Y = ${frac("|q| U ℓ L", "m d v₀²")}, proportionnelle à U`)}
          ${retenir("Dans l’<strong>oscilloscope</strong>, les électrons sont accélérés par un canon à électrons puis déviés par deux paires de plaques ; la déviation du spot est proportionnelle à la tension appliquée : c’est ainsi qu’on visualise une tension.")}
          ${exercice(
            "Des électrons (e = 1,6 × 10<sup>−19</sup> C ; m = 9,1 × 10<sup>−31</sup> kg) entrent à v₀ = 2,0 × 10<sup>7</sup> m/s entre deux plaques de longueur ℓ = 5 cm, distantes de d = 2 cm, sous U = 100 V. Calcule la déviation y à la sortie des plaques.",
            [
              "Durée de la traversée : t = ℓ ÷ v₀ = 0,05 ÷ (2 × 10<sup>7</sup>) = 2,5 × 10<sup>−9</sup> s.",
              "a = eU ÷ (m d) = 1,6 × 10<sup>−17</sup> ÷ (9,1 × 10<sup>−31</sup> × 0,02) ≈ 8,8 × 10<sup>14</sup> m/s².",
              "y = ½ a t² ≈ 0,5 × 8,8 × 10<sup>14</sup> × 6,25 × 10<sup>−18</sup> ≈ <strong>2,7 mm</strong>.",
            ],
          )}
          ${erreurs(["oublier le signe de la charge : un électron est dévié vers la plaque positive ;", "tenir compte du poids de l’électron : il est négligeable."])}`,
      },
    ],
  },
  {
    title: "Gravitation universelle",
    summary: "Loi de Newton, champ de gravitation, mouvement des satellites et lois de Kepler.",
    lessons: [
      {
        title: "Loi de la gravitation et champ de gravitation",
        minutes: 25,
        body: `${objectifs([
            "énoncer la loi de la gravitation universelle ;",
            "exprimer le champ de gravitation terrestre en fonction de l’altitude ;",
            "relier poids et gravitation.",
          ])}
          ${retenir("<strong>Loi de Newton</strong> : deux corps ponctuels (ou à symétrie sphérique) de masses m et m’, dont les centres sont distants de d, exercent l’un sur l’autre des forces attractives, opposées, dirigées selon la droite qui les joint, de valeur F = G m m’ / d².")}
          ${formula(`F = G ${frac("m m’", "d²")}, avec G = 6,67 × 10${sup("−11")} N·m²/kg²`)}
          <p>La Terre (masse M, rayon R) crée en tout point de l’espace un <strong>champ de gravitation</strong> dirigé vers son centre :</p>
          ${formula(`𝒢(h) = G ${frac("M", "(R + h)²")} = g₀ ${frac("R²", "(R + h)²")}, avec g₀ = G ${frac("M", "R²")} ≈ 9,8 m/s² au sol`)}
          <p>Le <strong>poids</strong> d’un corps est, à peu de chose près, la force de gravitation exercée par la Terre : P = m g. Le champ diminue avec l’altitude : à h = R (≈ 6 400 km), il ne vaut plus que g₀ ÷ 4.</p>
          ${exercice(
            "Calcule la masse de la Terre sachant que g₀ = 9,8 m/s² et R = 6,4 × 10<sup>6</sup> m.",
            [
              "g₀ = G M ÷ R², donc M = g₀ R² ÷ G.",
              "M = 9,8 × (6,4 × 10<sup>6</sup>)² ÷ (6,67 × 10<sup>−11</sup>) ≈ <strong>6,0 × 10<sup>24</sup> kg</strong>.",
            ],
          )}`,
      },
      {
        title: "Mouvement des satellites",
        minutes: 35,
        body: `${objectifs([
            "établir que le mouvement d’un satellite en orbite circulaire est uniforme ;",
            "exprimer sa vitesse et sa période ; énoncer la 3<sup>e</sup> loi de Kepler ;",
            "décrire un satellite géostationnaire.",
          ])}
          <p>Dans le référentiel géocentrique (galiléen), un satellite en orbite circulaire de rayon r = R + h n’est soumis qu’à la force de gravitation, dirigée vers le centre de la Terre. Le théorème du centre d’inertie donne a⃗ = 𝒢⃗ : l’accélération est centripète, donc le mouvement est <strong>circulaire uniforme</strong>, avec v²/r = G M/r².</p>
          ${formula(`v = ${sqrt("(GM/r)")} = ${sqrt("(g₀ R²/r)")} et T = ${frac("2π r", "v")} = 2π ${sqrt("(r³/GM)")}`)}
          ${retenir(`<strong>3<sup>e</sup> loi de Kepler</strong> : ${frac("T²", "r³")} = ${frac("4π²", "GM")} : ce rapport est le même pour tous les satellites d’un même astre.`)}
          ${liste([
            "la vitesse et la période ne dépendent <strong>pas</strong> de la masse du satellite ;",
            "plus un satellite est haut, plus il est lent et plus sa période est longue ;",
            "un satellite <strong>géostationnaire</strong> tourne dans le plan de l’équateur, dans le même sens que la Terre, avec la période de rotation de la Terre (T ≈ 86 164 s) : il est à environ 36 000 km d’altitude et paraît immobile depuis le sol (télévision, télécommunications, météo).",
          ])}
          <p>Les lois de Kepler s’appliquent aussi aux planètes autour du Soleil (orbites elliptiques dont le Soleil occupe un foyer).</p>
          ${exercice(
            "La station spatiale internationale tourne à 400 km d’altitude. Calcule sa vitesse et sa période (R = 6,4 × 10<sup>6</sup> m ; g₀ = 9,8 m/s²).",
            [
              "r = 6,4 × 10<sup>6</sup> + 0,4 × 10<sup>6</sup> = 6,8 × 10<sup>6</sup> m ; GM = g₀ R² ≈ 4,0 × 10<sup>14</sup> SI.",
              "v = √(GM ÷ r) = √(4,0 × 10<sup>14</sup> ÷ 6,8 × 10<sup>6</sup>) ≈ <strong>7,7 km/s</strong>.",
              "T = 2π r ÷ v ≈ 2π × 6,8 × 10<sup>6</sup> ÷ 7 700 ≈ 5 550 s, soit environ <strong>92 min</strong>.",
            ],
          )}
          ${auBac("Pour retrouver l’altitude d’un satellite géostationnaire, utilise la 3<sup>e</sup> loi de Kepler avec T = 86 164 s : r³ = GM T²/(4π²), puis h = r − R.")}`,
      },
    ],
  },
  {
    title: "Champs magnétiques",
    summary: "Aimants, lignes de champ, champ terrestre, champs créés par des courants (fil, spire, solénoïde).",
    lessons: [
      {
        title: "Généralités sur le champ magnétique",
        minutes: 25,
        body: `${objectifs([
            "mettre en évidence un champ magnétique et le représenter ;",
            "décrire le champ d’un aimant et le champ magnétique terrestre ;",
            "additionner des champs magnétiques.",
          ])}
          <p>Un aimant ou un conducteur parcouru par un courant modifie l’espace qui l’entoure : il y crée un <strong>champ magnétique</strong> B⃗. On le détecte avec une aiguille aimantée, qui s’oriente selon B⃗ (de son pôle sud vers son pôle nord).</p>
          ${liste([
            "B s’exprime en <strong>tesla</strong> (T) et se mesure au teslamètre ;",
            "les <strong>lignes de champ</strong> sont tangentes à B⃗ en chaque point ; elles sortent par le pôle nord d’un aimant et entrent par le pôle sud (spectre magnétique visualisé avec de la limaille de fer) ;",
            "entre les branches d’un aimant en U, les lignes sont parallèles : le champ est <strong>uniforme</strong> ;",
            "deux champs en un même point s’additionnent <strong>vectoriellement</strong>.",
          ])}
          <h2>Le champ magnétique terrestre</h2>
          <p>La Terre se comporte comme un énorme aimant. En un lieu, son champ B⃗<sub>T</sub> a une composante horizontale B⃗<sub>H</sub>, qui oriente la boussole vers le nord magnétique (de l’ordre de 2 à 3 × 10<sup>−5</sup> T à Dakar), et une composante verticale. Le plan vertical qui contient B⃗<sub>H</sub> est le <strong>méridien magnétique</strong>.</p>
          ${exercice(
            "Une aiguille aimantée horizontale, d’abord orientée selon B⃗<sub>H</sub> (2 × 10<sup>−5</sup> T), est soumise en plus à un champ horizontal B⃗ perpendiculaire au méridien. Elle tourne de 45°. Que vaut B ?",
            [
              "L’aiguille s’oriente selon le champ total B⃗<sub>H</sub> + B⃗.",
              "Les deux champs sont perpendiculaires : tan α = B ÷ B<sub>H</sub>.",
              "tan 45° = 1, donc B = B<sub>H</sub> = <strong>2 × 10<sup>−5</sup> T</strong>.",
            ],
          )}`,
      },
      {
        title: "Champs magnétiques créés par des courants",
        minutes: 30,
        body: `${objectifs([
            "déterminer le sens du champ créé par un courant ;",
            "connaître les caractéristiques du champ d’un fil, d’une spire, d’une bobine plate et d’un solénoïde ;",
            "utiliser la proportionnalité de B à l’intensité.",
          ])}
          <p>Le sens de B⃗ se trouve avec une règle bien maîtrisée : règle de la <strong>main droite</strong> ou du <strong>bonhomme d’Ampère</strong> (le courant entre par ses pieds et sort par sa tête ; il regarde le point considéré ; B⃗ est dirigé vers sa gauche).</p>
          ${tableau([
            ["Circuit", "Lignes de champ", "Valeur de B"],
            ["fil rectiligne très long", "cercles centrés sur le fil", `B = ${frac("μ₀ I", "2π d")}`],
            ["spire de rayon R (au centre)", "B⃗ perpendiculaire au plan de la spire", `B = ${frac("μ₀ I", "2R")}`],
            ["bobine plate de N spires (au centre)", "idem", `B = ${frac("μ₀ N I", "2R")}`],
            ["solénoïde long (N spires, longueur ℓ)", "parallèles à l’axe à l’intérieur : champ <strong>uniforme</strong>", `B = μ₀ ${frac("N", "ℓ")} I = μ₀ n I`],
          ])}
          ${formula("μ₀ = 4π × 10<sup>−7</sup> SI (perméabilité du vide)")}
          ${liste([
            "ces valeurs sont données sans démonstration ; la valeur pour le solénoïde se vérifie expérimentalement avec un teslamètre ;",
            "B est <strong>proportionnel à I</strong> ; si le courant change de sens, B⃗ aussi ;",
            "les faces d’un solénoïde se comportent comme les pôles d’un aimant : on sort par la face nord.",
          ])}
          ${exercice(
            "Un solénoïde de 500 spires et de 25 cm de long est parcouru par un courant de 2 A. Calcule le champ à l’intérieur. Quel courant faudrait-il pour que ce champ soit égal à B<sub>H</sub> = 2 × 10<sup>−5</sup> T ?",
            [
              "n = 500 ÷ 0,25 = 2000 spires/m ; B = 4π × 10<sup>−7</sup> × 2000 × 2 ≈ <strong>5,0 × 10<sup>−3</sup> T</strong>.",
              "B est proportionnel à I : I = B ÷ (μ₀ n) = 2 × 10<sup>−5</sup> ÷ (4π × 10<sup>−7</sup> × 2000) ≈ <strong>8 mA</strong>.",
            ],
          )}
          ${erreurs(["utiliser la longueur en cm dans n = N/ℓ ;", "confondre le nombre total de spires N et le nombre de spires par mètre n."])}`,
      },
    ],
  },
  {
    title: "Particule chargée dans un champ magnétique uniforme",
    summary: "Force de Lorentz, mouvement circulaire uniforme, spectrographe de masse, cyclotron, déflexion magnétique.",
    lessons: [
      {
        title: "Force de Lorentz et mouvement circulaire",
        minutes: 30,
        body: `${objectifs([
            "donner les caractéristiques de la force de Lorentz ;",
            "montrer que le mouvement dans un champ uniforme est circulaire uniforme ;",
            "calculer le rayon et la période.",
          ])}
          ${formula(`Force de Lorentz : ${vec("F")} = q ${vec("v")} ∧ ${vec("B")}, de valeur F = |q| v B sin α`)}
          ${liste([
            "F⃗ est perpendiculaire à v⃗ et à B⃗ ; le trièdre (q v⃗, B⃗, F⃗) est direct ;",
            "F⃗ étant perpendiculaire à la vitesse, elle <strong>ne travaille pas</strong> : d’après le théorème de l’énergie cinétique, la valeur de la vitesse reste constante ;",
            "si v⃗₀ est parallèle à B⃗, F = 0 : mouvement rectiligne uniforme.",
          ])}
          <p>Si v⃗₀ est perpendiculaire à B⃗ uniforme, le mouvement est plan, uniforme, et l’accélération est normale : a = v²/R = |q| v B / m. Le mouvement est <strong>circulaire uniforme</strong> :</p>
          ${formula(`R = ${frac("m v", "|q| B")} et T = ${frac("2π m", "|q| B")}`)}
          <p>La période ne dépend pas de la vitesse : c’est le principe du cyclotron.</p>
          ${exercice(
            "Un proton (m = 1,67 × 10<sup>−27</sup> kg ; q = 1,6 × 10<sup>−19</sup> C) entre perpendiculairement dans un champ B = 0,1 T à 10<sup>6</sup> m/s. Calcule le rayon et la période de sa trajectoire.",
            [
              "R = m v ÷ (q B) = 1,67 × 10<sup>−21</sup> ÷ (1,6 × 10<sup>−20</sup>) ≈ <strong>0,10 m</strong>.",
              "T = 2π m ÷ (q B) = 2π × 1,67 × 10<sup>−27</sup> ÷ (1,6 × 10<sup>−20</sup>) ≈ <strong>6,6 × 10<sup>−7</sup> s</strong>.",
            ],
          )}
          ${auBac("Pour trouver le sens de déviation, applique la règle des trois doigts de la main droite à q v⃗ : pour un électron (q &lt; 0), le sens est inversé.")}`,
      },
      {
        title: "Applications : spectrographe, cyclotron, déflexion magnétique",
        minutes: 30,
        body: `${objectifs([
            "expliquer le principe du spectrographe de masse et calculer la séparation de deux isotopes ;",
            "expliquer le principe du cyclotron ;",
            "décrire la déflexion magnétique.",
          ])}
          <h2>1. Le spectrographe de masse</h2>
          <p>Des ions de même charge q sont accélérés par la même tension U : ½ m v² = |q| U, donc v = √(2|q|U/m). Dans le champ B, ils décrivent des demi-cercles de rayon :</p>
          ${formula(`R = ${frac("1", "B")} ${sqrt("(2 m U / |q|)")}, donc R est proportionnel à √m`)}
          <p>Les isotopes d’un élément arrivent en des points différents du détecteur : on peut les séparer et mesurer leurs masses.</p>
          <h2>2. Le cyclotron</h2>
          <p>Deux demi-boîtes creuses (les « dees ») sont placées dans un champ magnétique uniforme ; une tension alternative est appliquée entre elles. Dans chaque dee, la particule décrit un demi-cercle en T/2 = πm/(|q|B), durée indépendante de la vitesse. Si la tension change de signe à chaque demi-tour, la particule est accélérée à chaque passage entre les dees : son rayon augmente jusqu’à la sortie.</p>
          <h2>3. La déflexion magnétique</h2>
          <p>Dans les anciens téléviseurs à tube, des bobines créaient un champ magnétique qui déviait le faisceau d’électrons pour balayer l’écran.</p>
          ${exercice(
            "Des ions ³⁹K⁺ et ⁴¹K⁺, accélérés sous la même tension, entrent dans un spectrographe. Les ions ³⁹K⁺ décrivent un demi-cercle de rayon 20,0 cm. Calcule le rayon pour ⁴¹K⁺ et la distance entre les points d’impact.",
            [
              "R est proportionnel à √m : R₄₁ = R₃₉ × √(41 ÷ 39) ≈ 20,0 × 1,025 ≈ <strong>20,5 cm</strong>.",
              "Les ions font un demi-tour : les points d’impact sont à 2R de l’entrée.",
              "Distance = 2(R₄₁ − R₃₉) ≈ 2 × 0,5 = <strong>1,0 cm</strong>.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Loi de Laplace",
    summary: "Force exercée par un champ magnétique sur un conducteur parcouru par un courant ; interaction entre courants ; applications.",
    lessons: [
      {
        title: "La force de Laplace",
        minutes: 30,
        body: `${objectifs([
            "donner les caractéristiques de la force de Laplace ;",
            "déterminer son sens ;",
            "décrire l’interaction entre deux courants parallèles et la définition légale de l’ampère.",
          ])}
          <p>Un conducteur rectiligne de longueur ℓ, parcouru par un courant I et placé dans un champ magnétique uniforme B⃗, subit la <strong>force de Laplace</strong> :</p>
          ${formula(`${vec("F")} = I ${vec("ℓ")} ∧ ${vec("B")}, de valeur F = I ℓ B sin α`)}
          ${liste([
            "ℓ⃗ est orienté dans le sens du courant ; α est l’angle entre le conducteur et B⃗ ;",
            "F⃗ est appliquée au milieu de la portion de conducteur placée dans le champ, perpendiculaire au conducteur et à B⃗ ;",
            "la force est maximale (F = IℓB) quand le conducteur est perpendiculaire au champ, nulle quand il lui est parallèle ;",
            "elle est due aux forces de Lorentz qui s’exercent sur les électrons en mouvement dans le conducteur.",
          ])}
          <h2>Interaction entre deux courants parallèles</h2>
          <p>Deux fils parallèles parcourus par des courants de même sens s’<strong>attirent</strong> ; de sens contraires, ils se <strong>repoussent</strong> : chacun est placé dans le champ magnétique créé par l’autre.</p>
          ${retenir("<strong>Définition légale de l’ampère</strong> : 1 A est l’intensité d’un courant qui, circulant dans deux fils parallèles, rectilignes, infiniment longs, distants de 1 m dans le vide, produit entre eux une force de 2 × 10<sup>−7</sup> N par mètre de longueur.")}
          ${exercice(
            "Une tige de cuivre de 10 cm et de 20 g est posée perpendiculairement sur deux rails horizontaux (rails de Laplace) ; elle est parcourue par 5 A dans un champ vertical B = 0,2 T. Calcule la force de Laplace et l’accélération de la tige (frottements négligés).",
            [
              "Tige perpendiculaire à B⃗ : F = I ℓ B = 5 × 0,10 × 0,2 = <strong>0,1 N</strong>, horizontale, perpendiculaire à la tige.",
              "Poids et réaction des rails se compensent : a = F ÷ m = 0,1 ÷ 0,020 = <strong>5 m/s²</strong>.",
            ],
          )}`,
      },
      {
        title: "Applications de la loi de Laplace",
        minutes: 25,
        body: `${objectifs([
            "expliquer le fonctionnement de la roue de Barlow, du moteur à courant continu et du haut-parleur ;",
            "calculer le moment du couple exercé sur un cadre.",
          ])}
          ${tableau([
            ["Appareil", "Principe"],
            ["<strong>roue de Barlow</strong>", "une roue conductrice parcourue par un courant radial tourne entre les pôles d’un aimant : prototype du moteur électrique"],
            ["<strong>moteur à courant continu</strong>", "les forces de Laplace sur deux côtés opposés d’un cadre (bobine) forment un <strong>couple</strong> qui le fait tourner ; un collecteur inverse le courant à chaque demi-tour"],
            ["<strong>haut-parleur</strong>", "une bobine mobile, placée dans le champ d’un aimant et solidaire d’une membrane, vibre au rythme du courant : la membrane émet un son"],
            ["<strong>galvanomètre</strong> et ampèremètre à cadre mobile", "le couple de Laplace est équilibré par un ressort : la déviation est proportionnelle à I"],
          ])}
          <h2>Couple exercé sur un cadre</h2>
          <p>Un cadre rectangulaire de N spires, de côtés a et b, parcouru par I, est placé dans un champ B⃗ uniforme parallèle à son plan. Les deux côtés de longueur a perpendiculaires à B⃗ subissent des forces F = N I a B, opposées, distantes de b : elles forment un couple de moment algébrique M = F × b = N I a b B = N I S B.</p>
          ${retenir("La force de Laplace convertit de l’énergie <strong>électrique</strong> en énergie <strong>mécanique</strong> : c’est le principe de tous les moteurs électriques.")}
          ${exercice(
            "Un cadre de 100 spires de 4 cm × 5 cm, parcouru par 0,5 A, est placé dans un champ de 0,2 T parallèle à son plan. Calcule le moment du couple.",
            ["S = 0,04 × 0,05 = 2 × 10<sup>−3</sup> m².", "M = N I S B = 100 × 0,5 × 2 × 10<sup>−3</sup> × 0,2 = <strong>0,02 N·m</strong>."],
          )}`,
      },
    ],
  },
  {
    title: "Induction magnétique et dipôle (R, L)",
    summary: "Flux, lois de Faraday et de Lenz, auto-induction, établissement et rupture du courant dans une bobine.",
    lessons: [
      {
        title: "Le phénomène d’induction",
        minutes: 35,
        body: `${objectifs([
            "mettre en évidence le phénomène d’induction ;",
            "calculer un flux magnétique et une force électromotrice induite (loi de Faraday) ;",
            "déterminer le sens du courant induit (loi de Lenz).",
          ])}
          <h2>1. Mise en évidence</h2>
          <p>On approche ou on éloigne un aimant d’une bobine reliée à un galvanomètre : un courant apparaît, seulement pendant le mouvement ; il change de sens si l’on inverse le mouvement. C’est le phénomène d’<strong>induction</strong> : l’aimant est l’<strong>inducteur</strong>, la bobine l’<strong>induit</strong>.</p>
          <h2>2. Le flux magnétique</h2>
          ${formula("Φ = N B S cos θ (en weber, Wb)")}
          <p>θ est l’angle entre B⃗ et le vecteur normal n⃗ au circuit (orienté par le sens positif choisi pour le courant, avec la règle de la main droite).</p>
          ${retenir("<strong>Loi de Faraday</strong> : toute variation du flux magnétique à travers un circuit y fait apparaître une force électromotrice induite e = −dΦ/dt. Si le circuit est fermé, un courant induit i = e/R circule.")}
          ${retenir("<strong>Loi de Lenz</strong> : le courant induit a un sens tel que, par ses effets, il s’oppose à la cause qui lui donne naissance.")}
          <h2>3. Applications</h2>
          ${liste([
            "<strong>alternateur</strong> : un aimant (rotor) tourne devant des bobines (stator) : la f.é.m. est sinusoïdale ;",
            "dynamo de vélo, transformateur, plaques de cuisson à induction, freinage par courants de Foucault ;",
            "conducteur qui se déplace dans un champ : e = B ℓ v (rails de Laplace utilisés en générateur).",
          ])}
          ${exercice(
            "Une tige de 20 cm glisse à 2 m/s sur deux rails horizontaux reliés par une résistance ; le circuit total a une résistance de 0,5 Ω et se trouve dans un champ vertical B = 0,5 T. Calcule la f.é.m., le courant et la force qui s’exerce sur la tige.",
            [
              "Le flux varie car la surface du circuit varie : |e| = B ℓ v = 0,5 × 0,20 × 2 = <strong>0,2 V</strong>.",
              "i = e ÷ R = 0,2 ÷ 0,5 = <strong>0,4 A</strong>.",
              "La tige parcourue par i subit une force de Laplace F = i ℓ B = 0,4 × 0,20 × 0,5 = <strong>0,04 N</strong> qui, d’après la loi de Lenz, s’oppose au mouvement : il faut fournir un travail pour produire de l’électricité.",
            ],
          )}
          ${erreurs(["oublier que seule une <strong>variation</strong> de flux crée une f.é.m. : un aimant immobile n’induit rien ;", "oublier N dans le flux d’une bobine."])}`,
      },
      {
        title: "Auto-induction et dipôle (R, L)",
        minutes: 35,
        body: `${objectifs([
            "définir l’inductance d’une bobine et l’auto-induction ;",
            "établir et résoudre l’équation de l’établissement du courant dans un circuit (R, L) ;",
            "calculer l’énergie emmagasinée dans une bobine.",
          ])}
          <h2>1. Auto-induction</h2>
          <p>Une bobine parcourue par un courant i crée un champ, donc un flux propre à travers ses propres spires : Φ = L i. L est l’<strong>inductance</strong> (en henry, H). Si i varie, Φ varie et une f.é.m. d’<strong>auto-induction</strong> e = −L di/dt apparaît dans la bobine.</p>
          ${formula(`Tension aux bornes d’une bobine (résistance r) : u<sub>L</sub> = r i + L ${frac("di", "dt")}`)}
          <h2>2. Établissement du courant</h2>
          <p>Un circuit comprend une bobine (L) et une résistance totale R, alimenté sous une tension E à t = 0. La loi des mailles donne :</p>
          ${formula(`L ${frac("di", "dt")} + R i = E, dont la solution est i(t) = ${frac("E", "R")}(1 − e${sup("−t/τ")}), avec τ = ${frac("L", "R")}`)}
          ${liste([
            "τ est la <strong>constante de temps</strong> (en s) : à t = τ, i atteint 63 % de sa valeur finale ;",
            "au bout de 5τ, le régime permanent (I = E/R) est pratiquement atteint ;",
            "la bobine <strong>retarde</strong> l’établissement du courant : l’intensité ne peut pas varier brusquement dans une bobine ;",
            "à la rupture du circuit, la variation brutale de i crée une forte f.é.m. : étincelle de rupture (allumage des moteurs, lampes au néon).",
          ])}
          ${formula("Énergie emmagasinée dans une bobine : E<sub>m</sub> = ½ L i²")}
          ${exercice(
            "Une bobine (L = 0,24 H) est montée en série avec une résistance ; la résistance totale vaut 24 Ω ; le circuit est alimenté sous 12 V. Calcule τ, l’intensité finale, l’intensité à t = τ et l’énergie emmagasinée en régime permanent.",
            [
              "τ = L ÷ R = 0,24 ÷ 24 = <strong>0,01 s</strong>.",
              "I = E ÷ R = 12 ÷ 24 = <strong>0,5 A</strong> ; à t = τ : i = 0,5 × (1 − e<sup>−1</sup>) ≈ <strong>0,32 A</strong>.",
              "E<sub>m</sub> = ½ × 0,24 × 0,5² = <strong>0,03 J</strong>.",
            ],
          )}
          ${auBac("Sur une courbe i(t), τ se lit à 63 % de la valeur finale ou à l’intersection de la tangente à l’origine avec l’asymptote.")}`,
      },
    ],
  },
  {
    title: "Étude du dipôle (R, C)",
    summary: "Condensateur, charge et décharge, constante de temps, énergie emmagasinée.",
    lessons: [
      {
        title: "Le condensateur",
        minutes: 25,
        body: `${objectifs([
            "décrire un condensateur et définir sa capacité ;",
            "relier charge, tension et intensité ;",
            "calculer l’énergie emmagasinée ; associer des condensateurs.",
          ])}
          <p>Un <strong>condensateur</strong> est formé de deux armatures conductrices séparées par un isolant (le diélectrique). Quand on le charge, une armature porte la charge +q et l’autre −q, proportionnelles à la tension :</p>
          ${formula(`q = C u et i = ${frac("dq", "dt")} = C ${frac("du", "dt")} (convention récepteur)`)}
          ${liste([
            "C est la <strong>capacité</strong>, en farad (F) ; on utilise le µF (10<sup>−6</sup> F) et le nF ;",
            "pour un condensateur plan : C = ε S / e (S : surface des armatures, e : épaisseur de l’isolant, ε : permittivité) ;",
            "en <strong>parallèle</strong>, les capacités s’ajoutent : C = C₁ + C₂ ; en <strong>série</strong> : 1/C = 1/C₁ + 1/C₂.",
          ])}
          ${formula("Énergie emmagasinée : E = ½ C u² = ½ q²/C")}
          ${exercice(
            "Un condensateur de 100 µF est chargé sous 12 V. Calcule sa charge et l’énergie emmagasinée. Que devient l’énergie si on double la tension ?",
            [
              "q = C u = 100 × 10<sup>−6</sup> × 12 = <strong>1,2 × 10<sup>−3</sup> C</strong>.",
              "E = ½ × 10<sup>−4</sup> × 12² = <strong>7,2 mJ</strong> (ordre de grandeur d’un flash d’appareil photo).",
              "E est proportionnelle à u² : en doublant la tension, l’énergie est <strong>multipliée par 4</strong>.",
            ],
          )}`,
      },
      {
        title: "Charge et décharge d’un condensateur",
        minutes: 35,
        body: `${objectifs([
            "établir l’équation différentielle de la charge et de la décharge ;",
            "exprimer u<sub>C</sub>(t) et i(t) ; définir et mesurer la constante de temps τ = RC ;",
            "exploiter un enregistrement.",
          ])}
          <h2>1. Charge sous une tension constante E</h2>
          <p>La loi des mailles donne E = R i + u<sub>C</sub>, avec i = C du<sub>C</sub>/dt :</p>
          ${formula(`RC ${frac("du<sub>C</sub>", "dt")} + u<sub>C</sub> = E, d’où u<sub>C</sub>(t) = E(1 − e${sup("−t/τ")}) et i(t) = ${frac("E", "R")} e${sup("−t/τ")}`)}
          <h2>2. Décharge dans une résistance</h2>
          ${formula(`RC ${frac("du<sub>C</sub>", "dt")} + u<sub>C</sub> = 0, d’où u<sub>C</sub>(t) = E e${sup("−t/τ")}`)}
          ${liste([
            "τ = RC est la <strong>constante de temps</strong> (en s) ;",
            "à t = τ, le condensateur est chargé à 63 % (ou déchargé à 37 %) ;",
            "la tangente à l’origine de la courbe de charge coupe l’asymptote u = E à l’instant τ ;",
            "après 5τ, la charge (ou la décharge) est pratiquement terminée.",
          ])}
          ${retenir("La tension aux bornes d’un condensateur ne peut pas varier brusquement (elle est continue) ; l’intensité, si : à t = 0, i = E/R.")}
          ${exercice(
            "Un condensateur de 100 µF se charge à travers une résistance de 10 kΩ sous 6 V. Calcule τ, l’intensité au départ, la tension à t = 1 s et la durée pour atteindre 95 % de la charge.",
            [
              "τ = RC = 10<sup>4</sup> × 10<sup>−4</sup> = <strong>1 s</strong>.",
              "i(0) = E ÷ R = 6 ÷ 10<sup>4</sup> = <strong>0,6 mA</strong>.",
              "u(1 s) = 6 × (1 − e<sup>−1</sup>) ≈ <strong>3,8 V</strong>.",
              "95 % : 1 − e<sup>−t/τ</sup> = 0,95, donc e<sup>−t/τ</sup> = 0,05 et t = τ ln 20 ≈ <strong>3 s</strong>.",
            ],
          )}
          ${auBac("Pour vérifier qu’une fonction est solution, remplace-la dans l’équation différentielle ; pour trouver les constantes, utilise la condition initiale u<sub>C</sub>(0).")}`,
      },
    ],
  },
  {
    title: "Oscillations électriques libres et forcées",
    summary: "Circuit LC, amortissement, circuit RLC en régime sinusoïdal forcé, résonance, puissance.",
    lessons: [
      {
        title: "Oscillations électriques libres",
        minutes: 35,
        body: `${objectifs([
            "établir l’équation différentielle d’un circuit LC et la résoudre ;",
            "exprimer la période propre ; étudier les échanges d’énergie ;",
            "décrire les régimes d’un circuit RLC libre.",
          ])}
          <h2>1. Le circuit LC (non amorti)</h2>
          <p>Un condensateur chargé (charge Q<sub>m</sub>) se décharge dans une bobine idéale. Avec i = dq/dt et la loi des mailles L di/dt + q/C = 0 :</p>
          ${formula(`${frac("d²q", "dt²")} + ${frac("1", "LC")} q = 0`)}
          <p>Les solutions sont sinusoïdales : q = Q<sub>m</sub> cos(ω₀t + φ), avec :</p>
          ${formula(`ω₀ = ${frac("1", sqrt("(LC)"))} ; T₀ = 2π${sqrt("(LC)")} ; f₀ = ${frac("1", "T₀")}`)}
          ${retenir("L’énergie totale E = ½ q²/C + ½ L i² = ½ Q<sub>m</sub>²/C se <strong>conserve</strong> : elle passe sans cesse du condensateur (énergie électrique) à la bobine (énergie magnétique).")}
          <h2>2. Le circuit RLC libre (amorti)</h2>
          ${formula(`L ${frac("d²q", "dt²")} + R ${frac("dq", "dt")} + ${frac("q", "C")} = 0`)}
          ${tableau([
            ["Résistance", "Régime"],
            ["R faible", "<strong>pseudo-périodique</strong> : oscillations dont l’amplitude diminue ; pseudo-période voisine de T₀"],
            ["R = R<sub>c</sub> = 2√(L/C)", "<strong>critique</strong> : retour le plus rapide à zéro sans oscillation"],
            ["R grande", "<strong>apériodique</strong> : pas d’oscillation"],
          ])}
          <p>L’énergie est dissipée par effet Joule dans la résistance. (La résolution de cette équation n’est pas au programme.)</p>
          ${exercice(
            "Un condensateur de 10 µF chargé sous 10 V se décharge dans une bobine idéale de 0,1 H. Calcule la période propre, l’énergie totale et l’intensité maximale.",
            [
              "T₀ = 2π √(LC) = 2π √(0,1 × 10<sup>−5</sup>) = 2π × 10<sup>−3</sup> ≈ <strong>6,3 ms</strong>.",
              "E = ½ C U² = ½ × 10<sup>−5</sup> × 100 = <strong>5 × 10<sup>−4</sup> J</strong>.",
              "Quand q = 0, toute l’énergie est dans la bobine : ½ L I<sub>m</sub>² = 5 × 10<sup>−4</sup>, donc I<sub>m</sub> = √(10<sup>−2</sup>) = <strong>0,1 A</strong>.",
            ],
          )}`,
      },
      {
        title: "Circuit RLC en régime forcé et résonance",
        minutes: 40,
        body: `${objectifs([
            "utiliser la construction de Fresnel pour un dipôle RLC série ;",
            "calculer impédance et déphasage ;",
            "étudier la résonance d’intensité, la bande passante, le facteur de qualité et la puissance.",
          ])}
          <p>Un générateur impose u(t) = U<sub>m</sub> cos ωt à un dipôle RLC série. Le courant a la même pulsation : i = I<sub>m</sub> cos(ωt + φ). Les oscillations sont <strong>forcées</strong> : la pulsation est celle du générateur, pas ω₀.</p>
          <h2>1. Construction de Fresnel</h2>
          <p>On représente chaque tension par un vecteur tournant : R I<sub>m</sub> en phase avec i, Lω I<sub>m</sub> en avance de π/2, I<sub>m</sub>/(Cω) en retard de π/2. Leur somme donne :</p>
          ${formula(`Z = ${frac("U<sub>m</sub>", "I<sub>m</sub>")} = ${sqrt("[R² + (Lω − 1/(Cω))²]")} ; tan φ = ${frac("1/(Cω) − Lω", "R")} (φ : avance de i sur u)`)}
          <h2>2. La résonance d’intensité</h2>
          ${retenir(`Pour ω = ω₀ = ${frac("1", sqrt("(LC)"))}, Lω = 1/(Cω) : Z = R est <strong>minimale</strong>, l’intensité est <strong>maximale</strong> (I₀ = U/R) et u et i sont <strong>en phase</strong>.`)}
          ${liste([
            "<strong>bande passante</strong> : intervalle [ω₁ ; ω₂] des pulsations pour lesquelles I ≥ I₀/√2 ; sa largeur est Δω = ω₂ − ω₁ = R/L ;",
            "<strong>facteur de qualité</strong> : Q = ω₀/Δω = Lω₀/R ; plus Q est grand, plus la résonance est aiguë (circuit d’accord d’un poste radio) ;",
            "à la résonance, la tension aux bornes du condensateur vaut Q fois la tension du générateur : <strong>surtension</strong>.",
          ])}
          <h2>3. Puissance</h2>
          ${formula("P = U I cos φ (U et I efficaces) ; facteur de puissance : cos φ = R/Z")}
          <p>Seule la résistance consomme de la puissance en moyenne : P = R I². Un mauvais facteur de puissance augmente l’intensité, donc les pertes en ligne : la SENELEC pénalise les gros consommateurs dont le cos φ est trop faible.</p>
          ${exercice(
            "Un dipôle RLC série (R = 100 Ω, L = 0,5 H, C = 2 µF) est alimenté sous une tension efficace de 10 V de fréquence variable. Calcule la pulsation de résonance, l’intensité efficace à la résonance, la bande passante, Q et la tension aux bornes du condensateur à la résonance.",
            [
              "ω₀ = 1 ÷ √(LC) = 1 ÷ √(10<sup>−6</sup>) = <strong>1000 rad/s</strong> (f₀ ≈ 159 Hz).",
              "À la résonance, Z = R : I₀ = 10 ÷ 100 = <strong>0,1 A</strong>.",
              "Δω = R ÷ L = <strong>200 rad/s</strong> ; Q = ω₀ ÷ Δω = <strong>5</strong>.",
              "U<sub>C</sub> = I₀ ÷ (Cω₀) = 0,1 ÷ (2 × 10<sup>−6</sup> × 1000) = <strong>50 V</strong> = Q × 10 V : surtension.",
            ],
          )}
          ${erreurs(["confondre pulsation (rad/s) et fréquence (Hz) : ω = 2πf ;", "appliquer les formules aux valeurs maximales et efficaces mélangées."])}`,
      },
    ],
  },
  {
    title: "Oscillations mécaniques libres",
    summary: "Pendule élastique, pendule simple, énergie, amortissement et analogie électrique.",
    lessons: [
      {
        title: "Le pendule élastique",
        minutes: 35,
        body: `${objectifs([
            "établir l’équation différentielle du pendule élastique horizontal ;",
            "déterminer la solution à partir des conditions initiales ; exprimer la période propre ;",
            "montrer la conservation de l’énergie mécanique.",
          ])}
          <p>Un solide de masse m, accroché à un ressort de raideur k, glisse sans frottement sur un plan horizontal. On repère G par son abscisse x, comptée à partir de la position d’équilibre. Forces : poids, réaction (qui se compensent) et tension du ressort T⃗ = −k x i⃗.</p>
          ${formula(`Théorème du centre d’inertie : m ${frac("d²x", "dt²")} = −k x, soit ${frac("d²x", "dt²")} + ${frac("k", "m")} x = 0`)}
          <p>C’est l’équation d’un <strong>oscillateur harmonique</strong> ; ses solutions sont x = X<sub>m</sub> cos(ω₀t + φ), avec :</p>
          ${formula(`ω₀ = ${sqrt("(k/m)")} et T₀ = 2π${sqrt("(m/k)")}`)}
          ${liste([
            "la période ne dépend <strong>pas</strong> de l’amplitude (isochronisme) ;",
            "X<sub>m</sub> et φ sont fixés par les conditions initiales x(0) et v(0) ;",
            "l’énergie mécanique E = ½ m v² + ½ k x² = ½ k X<sub>m</sub>² se conserve ; en dérivant E par rapport au temps, on retrouve l’équation différentielle (méthode énergétique).",
          ])}
          <p>Pour un pendule élastique vertical, on compte x à partir de la position d’équilibre (où le ressort est déjà allongé) : on obtient la même équation et la même période.</p>
          ${exercice(
            "Un solide de 200 g, accroché à un ressort de raideur 20 N/m, est écarté de 5 cm puis lâché sans vitesse à t = 0. Écris x(t) et calcule la vitesse maximale et l’énergie mécanique.",
            [
              "ω₀ = √(20 ÷ 0,2) = <strong>10 rad/s</strong> ; T₀ = 2π ÷ 10 ≈ 0,63 s.",
              "x(0) = X<sub>m</sub> cos φ = 0,05 et v(0) = −X<sub>m</sub>ω₀ sin φ = 0, donc φ = 0 : <strong>x(t) = 0,05 cos(10t)</strong>.",
              "v<sub>max</sub> = X<sub>m</sub> ω₀ = <strong>0,5 m/s</strong> ; E = ½ k X<sub>m</sub>² = ½ × 20 × 0,05² = <strong>0,025 J</strong>.",
            ],
          )}`,
      },
      {
        title: "Pendule simple et amortissement",
        minutes: 30,
        body: `${objectifs([
            "établir la période du pendule simple pour de petites oscillations ;",
            "décrire qualitativement les oscillations amorties ;",
            "faire l’analogie entre oscillateurs mécaniques et électriques.",
          ])}
          <h2>1. Le pendule simple</h2>
          <p>Une petite masse au bout d’un fil inextensible de longueur ℓ oscille autour de la verticale. Pour de petites oscillations (θ inférieur à 15° environ), sin θ ≈ θ (en radians) et :</p>
          ${formula(`${frac("d²θ", "dt²")} + ${frac("g", "ℓ")} θ = 0, d’où T₀ = 2π${sqrt("(ℓ/g)")}`)}
          <p>La période ne dépend ni de la masse ni de l’amplitude (si elle est petite). Le pendule pesant et le pendule de torsion s’étudient en exercice de la même manière.</p>
          <h2>2. Oscillations amorties</h2>
          <p>Avec une force de frottement fluide f⃗ = −b v⃗, l’équation devient m ẍ + b ẋ + k x = 0. L’énergie mécanique n’est plus conservée : elle est dissipée par le travail des frottements. Régime <strong>pseudo-périodique</strong> si le frottement est faible, <strong>apériodique</strong> s’il est fort : c’est le rôle des <strong>amortisseurs</strong> de voiture. Il existe aussi des oscillations mécaniques forcées et une résonance (pont, machine à laver).</p>
          ${tableau([
            ["Oscillateur mécanique", "Oscillateur électrique"],
            ["élongation x", "charge q"],
            ["vitesse v = dx/dt", "intensité i = dq/dt"],
            ["masse m", "inductance L"],
            ["raideur k", "inverse de la capacité 1/C"],
            ["coefficient de frottement b", "résistance R"],
            ["½ m v² + ½ k x²", "½ L i² + ½ q²/C"],
          ])}
          ${exercice(
            "Pour mesurer g, un élève chronomètre 20 oscillations d’un pendule simple de 1,00 m : il trouve 40,1 s. Calcule g.",
            [
              "T₀ = 40,1 ÷ 20 = 2,005 s (mesurer plusieurs oscillations réduit l’erreur).",
              "T₀ = 2π √(ℓ/g), donc g = 4π² ℓ ÷ T₀² = 39,48 × 1,00 ÷ 2,005² ≈ <strong>9,82 m/s²</strong>.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Interférences lumineuses",
    summary: "Fentes de Young, différence de marche, interfrange, lumière blanche, nature ondulatoire de la lumière.",
    lessons: [
      {
        title: "L’expérience des fentes de Young",
        minutes: 35,
        body: `${objectifs([
            "décrire l’expérience des fentes de Young et les conditions d’interférence ;",
            "établir la différence de marche et la position des franges ;",
            "calculer l’interfrange et une longueur d’onde.",
          ])}
          <p>Une fente source F, éclairée par une lumière monochromatique, éclaire deux fentes fines F₁ et F₂, parallèles, distantes de a. Elles se comportent comme deux sources <strong>cohérentes</strong> (même fréquence, déphasage constant), car elles viennent de la même source. Sur un écran placé à la distance D (avec D très grand devant a), on observe dans la zone commune aux deux faisceaux diffractés des franges alternativement brillantes et sombres, rectilignes et équidistantes.</p>
          ${formula(`Différence de marche en un point M d’abscisse x : δ = F₂M − F₁M = ${frac("a x", "D")}`)}
          ${tableau([
            ["Frange", "Condition", "Position"],
            ["brillante (interférence constructive)", "δ = k λ (k entier : <strong>ordre</strong> d’interférence)", `x = k ${frac("λ D", "a")}`],
            ["sombre (interférence destructive)", "δ = (k + ½) λ", `x = (k + ½) ${frac("λ D", "a")}`],
          ])}
          ${formula(`Interfrange (distance entre deux franges brillantes ou sombres consécutives) : i = ${frac("λ D", "a")}`)}
          ${liste([
            "la frange centrale (x = 0, δ = 0) est brillante ;",
            "i augmente avec λ et D, diminue quand on écarte les fentes.",
          ])}
          ${exercice(
            "Avec a = 0,5 mm et D = 1,5 m, on mesure que 10 interfranges couvrent 18 mm. Calcule la longueur d’onde. À quelle distance de la frange centrale se trouve la 3<sup>e</sup> frange sombre ?",
            [
              "i = 18 ÷ 10 = 1,8 mm (mesurer plusieurs interfranges réduit l’erreur).",
              "λ = a i ÷ D = 0,5 × 10<sup>−3</sup> × 1,8 × 10<sup>−3</sup> ÷ 1,5 = <strong>6,0 × 10<sup>−7</sup> m = 600 nm</strong> (orangé).",
              "Les franges sombres sont en x = (k + ½) i ; la 3<sup>e</sup> correspond à k = 2 : x = 2,5 × 1,8 = <strong>4,5 mm</strong>.",
            ],
          )}
          ${erreurs(["oublier de convertir mm et nm en mètres ;", "mesurer un seul interfrange au lieu de plusieurs."])}`,
      },
      {
        title: "Interprétation et applications",
        minutes: 25,
        body: `${objectifs([
            "interpréter les interférences par la nature ondulatoire de la lumière ;",
            "décrire les interférences en lumière blanche ;",
            "situer le domaine visible et citer des applications.",
          ])}
          <p>Les interférences ne s’expliquent que si la lumière est une <strong>onde</strong> : en un point où les deux ondes arrivent en phase, leurs vibrations s’ajoutent (frange brillante) ; là où elles arrivent en opposition de phase, elles s’annulent (frange sombre). « Lumière + lumière » peut donc donner de l’obscurité. La diffraction par une fente fine est un autre signe de cette nature ondulatoire.</p>
          ${formula("λ = c/ν, avec c = 3,00 × 10<sup>8</sup> m/s dans le vide")}
          ${tableau([
            ["Domaine", "Longueurs d’onde dans le vide"],
            ["ultraviolet", "moins de 400 nm"],
            ["visible", "de 400 nm (violet) à 800 nm (rouge) environ"],
            ["infrarouge", "plus de 800 nm"],
          ])}
          <h2>Interférences en lumière blanche</h2>
          <p>Chaque radiation donne son propre système de franges, d’interfrange différent. La frange centrale est <strong>blanche</strong> (toutes les couleurs y sont brillantes), bordée de franges irisées ; plus loin, les couleurs se mélangent et l’écran paraît blanc (« blanc d’ordre supérieur »).</p>
          <h2>Applications</h2>
          ${liste([
            "mesure de longueurs d’onde ;",
            "mesure de très petites épaisseurs ou de défauts de surface (interféromètres) ;",
            "hologrammes, couleurs des bulles de savon et des taches d’huile sur l’eau.",
          ])}
          ${exercice(
            "Dans l’expérience de Young (a = 1 mm, D = 2 m), on éclaire successivement en rouge (λ = 750 nm) puis en violet (λ = 400 nm). Calcule les deux interfranges.",
            [
              "Rouge : i = λD/a = 750 × 10<sup>−9</sup> × 2 ÷ 10<sup>−3</sup> = <strong>1,5 mm</strong>.",
              "Violet : i = 400 × 10<sup>−9</sup> × 2 ÷ 10<sup>−3</sup> = <strong>0,8 mm</strong>.",
              "Les franges rouges sont plus espacées : en lumière blanche, chaque frange brillante est bordée de violet du côté de la frange centrale et de rouge de l’autre.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Effet photoélectrique",
    summary: "Mise en évidence, seuil photoélectrique, photon, relation d’Einstein, dualité onde-corpuscule.",
    lessons: [
      {
        title: "Mise en évidence de l’effet photoélectrique",
        minutes: 25,
        body: `${objectifs([
            "décrire l’expérience de Hertz ;",
            "mettre en évidence l’existence d’un seuil photoélectrique ;",
            "montrer les limites du modèle ondulatoire.",
          ])}
          ${definition("effet photoélectrique", "émission d’électrons par un métal éclairé par une lumière de fréquence convenable.")}
          <p><strong>Expérience de Hertz (1887)</strong> : une plaque de zinc fraîchement décapée est fixée sur un électroscope chargé négativement.</p>
          ${tableau([
            ["Éclairage", "Observation"],
            ["lumière visible, même très intense", "l’électroscope reste chargé"],
            ["lumière ultraviolette (lampe à vapeur de mercure), même faible", "l’électroscope se décharge : des électrons sont arrachés au zinc"],
            ["ultraviolet, avec une plaque de verre (qui arrête l’UV) interposée", "pas de décharge"],
            ["ultraviolet, électroscope chargé positivement", "pas de décharge : les électrons arrachés sont rattrapés"],
          ])}
          ${liste([
            "l’effet n’a lieu que si la fréquence ν de la lumière est supérieure à une <strong>fréquence seuil</strong> ν₀ caractéristique du métal (λ inférieure à la longueur d’onde seuil λ₀ = c/ν₀) ;",
            "au-dessus du seuil, l’émission est <strong>immédiate</strong> ; une lumière plus intense arrache plus d’électrons ;",
            "en dessous du seuil, rien ne se passe, quelle que soit l’intensité.",
          ])}
          ${retenir("Le modèle ondulatoire n’explique pas ce seuil : une onde très intense devrait finir par fournir assez d’énergie aux électrons. Il faut un modèle <strong>corpusculaire</strong> de la lumière.")}
          <p>Applications : cellules photovoltaïques (panneaux solaires, très utilisés au Sénégal), capteurs de lumière, portes automatiques.</p>`,
      },
      {
        title: "Le photon et la relation d’Einstein",
        minutes: 30,
        body: `${objectifs([
            "énoncer l’hypothèse des photons et exprimer leur énergie ;",
            "interpréter le seuil et calculer l’énergie cinétique des électrons émis ;",
            "expliquer la dualité onde-corpuscule.",
          ])}
          <p><strong>Einstein (1905)</strong> : la lumière est formée de grains d’énergie, les <strong>photons</strong>. Chaque photon d’une radiation de fréquence ν transporte un quantum d’énergie :</p>
          ${formula("E = h ν = h c/λ, avec h = 6,62 × 10<sup>−34</sup> J·s (constante de Planck)")}
          <p>Un photon interagit avec un seul électron et lui cède toute son énergie. Pour extraire l’électron du métal, il faut au moins le <strong>travail d’extraction</strong> W₀ = h ν₀. L’excédent devient énergie cinétique :</p>
          ${formula("E<sub>c max</sub> = h ν − W₀ = h (ν − ν₀)")}
          ${liste([
            "si h ν &lt; W₀, aucun électron n’est arraché, quel que soit le nombre de photons : c’est le seuil ;",
            "l’intensité lumineuse correspond au nombre de photons, donc au nombre d’électrons arrachés, pas à leur énergie ;",
            "unité pratique : l’électronvolt, 1 eV = 1,6 × 10<sup>−19</sup> J.",
          ])}
          ${retenir("<strong>Dualité onde-corpuscule</strong> : la lumière se comporte comme une onde (interférences, diffraction) ou comme un flux de particules (effet photoélectrique) selon l’expérience. Ces deux aspects se complètent ; la relation E = hν les relie.")}
          ${exercice(
            "Le travail d’extraction du zinc vaut 4,3 eV, celui du césium 1,9 eV. Calcule les longueurs d’onde seuils. Explique l’expérience de Hertz. Quelle est l’énergie cinétique maximale des électrons arrachés au césium par une lumière de 500 nm ?",
            [
              "λ₀ = h c ÷ W₀. Zinc : λ₀ = 6,62 × 10<sup>−34</sup> × 3 × 10<sup>8</sup> ÷ (4,3 × 1,6 × 10<sup>−19</sup>) ≈ <strong>289 nm</strong> (ultraviolet). Césium : λ₀ ≈ <strong>653 nm</strong> (visible).",
              "La lumière visible (λ &gt; 400 nm) a une longueur d’onde supérieure au seuil du zinc : elle ne peut pas arracher d’électrons au zinc ; l’ultraviolet le peut. C’est ce qu’a observé Hertz.",
              "Photon de 500 nm : E = h c/λ ≈ 3,97 × 10<sup>−19</sup> J ≈ 2,48 eV ; E<sub>c max</sub> = 2,48 − 1,9 ≈ <strong>0,6 eV</strong>.",
            ],
          )}`,
      },
    ],
  },
  {
    title: "Niveaux d’énergie de l’atome",
    summary: "Quantification, spectres d’émission et d’absorption, atome d’hydrogène.",
    lessons: [
      {
        title: "Quantification de l’énergie et spectres",
        minutes: 25,
        body: `${objectifs([
            "distinguer spectres continus et spectres de raies ;",
            "interpréter l’émission et l’absorption par la quantification de l’énergie ;",
            "représenter un diagramme de niveaux d’énergie.",
          ])}
          <h2>1. Les spectres</h2>
          ${tableau([
            ["Source", "Spectre obtenu avec un prisme ou un réseau"],
            ["solide ou liquide très chaud (filament de lampe, Soleil)", "spectre <strong>continu</strong>, d’autant plus riche en bleu que la température est élevée"],
            ["gaz à basse pression excité (lampe à vapeur)", "spectre de <strong>raies d’émission</strong>, caractéristique de l’élément"],
            ["lumière blanche traversant un gaz froid", "spectre continu barré de <strong>raies d’absorption</strong> noires, aux mêmes longueurs d’onde que les raies d’émission du gaz"],
          ])}
          <h2>2. La quantification</h2>
          <p>L’énergie d’un atome ne peut prendre que certaines valeurs : elle est <strong>quantifiée</strong>. Le niveau de plus basse énergie est l’<strong>état fondamental</strong> ; les autres sont des <strong>états excités</strong> (instables).</p>
          ${formula("Passage du niveau E<sub>p</sub> au niveau E<sub>n</sub> &lt; E<sub>p</sub> : émission d’un photon de fréquence ν = (E<sub>p</sub> − E<sub>n</sub>)/h")}
          ${liste([
            "un atome ne peut absorber un photon que si son énergie correspond <strong>exactement</strong> à la différence entre deux niveaux (ou s’il suffit à l’ioniser) ;",
            "un électron incident peut, lui, céder seulement une partie de son énergie cinétique ;",
            "chaque raie correspond à une transition : le spectre est la « carte d’identité » de l’élément.",
          ])}
          ${retenir("L’analyse du spectre de la lumière d’une étoile renseigne sur sa composition chimique (raies d’absorption) et sa température (couleur dominante).")}`,
      },
      {
        title: "L’atome d’hydrogène",
        minutes: 30,
        body: `${objectifs([
            "utiliser la formule des niveaux d’énergie de l’hydrogène ;",
            "calculer la longueur d’onde d’une raie ; connaître les séries de Lyman, Balmer et Paschen ;",
            "définir l’énergie d’ionisation.",
          ])}
          ${formula(`E<sub>n</sub> = −${frac("13,6", "n²")} eV, n = 1, 2, 3… (nombre quantique principal)`)}
          ${liste([
            "état fondamental : E₁ = −13,6 eV ; l’état n = ∞ (E = 0) correspond à l’atome ionisé ;",
            "<strong>énergie d’ionisation</strong> depuis l’état fondamental : 13,6 eV ;",
            "série de <strong>Lyman</strong> : retour au niveau n = 1 (ultraviolet) ;",
            "série de <strong>Balmer</strong> : retour au niveau n = 2 (quatre raies visibles) ;",
            "série de <strong>Paschen</strong> : retour au niveau n = 3 (infrarouge).",
          ])}
          ${formula(`Longueur d’onde de la raie p → n : ${frac("1", "λ")} = ${frac("13,6 × 1,6 × 10<sup>−19</sup>", "h c")} (${frac("1", "n²")} − ${frac("1", "p²")})`)}
          ${exercice(
            "Calcule la longueur d’onde de la raie émise lors de la transition 3 → 2 de l’hydrogène. Un atome à l’état fondamental peut-il absorber un photon de 10,2 eV ? de 11 eV ?",
            [
              "ΔE = 13,6 (1/4 − 1/9) ≈ 1,89 eV ≈ 3,02 × 10<sup>−19</sup> J.",
              "λ = h c ÷ ΔE ≈ 6,62 × 10<sup>−34</sup> × 3 × 10<sup>8</sup> ÷ (3,02 × 10<sup>−19</sup>) ≈ <strong>658 nm</strong> : la raie rouge de la série de Balmer.",
              "E₂ − E₁ = −3,4 + 13,6 = 10,2 eV : le photon de 10,2 eV est <strong>absorbé</strong> (passage au niveau 2).",
              "11 eV ne correspond à aucune différence de niveaux (E₃ − E₁ = 12,1 eV) et ne suffit pas à ioniser : ce photon n’est <strong>pas absorbé</strong>.",
            ],
          )}
          ${auBac("Trace le diagramme des niveaux (axe vertical en eV) et représente chaque transition par une flèche verticale : vers le bas pour une émission, vers le haut pour une absorption.")}`,
      },
    ],
  },
  {
    title: "Réactions nucléaires",
    summary: "Noyau, énergie de liaison, radioactivité, décroissance, fission et fusion.",
    lessons: [
      {
        title: "Le noyau et l’énergie de liaison",
        minutes: 30,
        body: `${objectifs([
            "décrire la composition d’un noyau et définir des isotopes ;",
            "calculer un défaut de masse et une énergie de liaison ;",
            "comparer la stabilité des noyaux (courbe d’Aston).",
          ])}
          <p>Un noyau ${sup("A")}<sub>Z</sub>X contient <strong>Z protons</strong> et <strong>N = A − Z neutrons</strong> : ce sont les <strong>nucléons</strong> (A = nombre de masse, Z = numéro atomique). Des <strong>isotopes</strong> ont le même Z mais des A différents (carbone 12 et carbone 14).</p>
          <h2>Défaut de masse et énergie de liaison</h2>
          <p>La masse d’un noyau est inférieure à la somme des masses de ses nucléons séparés : c’est le <strong>défaut de masse</strong> Δm = Z m<sub>p</sub> + (A − Z) m<sub>n</sub> − m<sub>noyau</sub>. D’après l’équivalence masse-énergie d’Einstein (E = m c²), il correspond à l’<strong>énergie de liaison</strong>, énergie qu’il faut fournir pour séparer tous les nucléons :</p>
          ${formula("E<sub>ℓ</sub> = Δm c² ; 1 u = 1,66 × 10<sup>−27</sup> kg ↔ 931,5 MeV/c² ; 1 MeV = 1,6 × 10<sup>−13</sup> J")}
          ${retenir("Plus l’énergie de liaison <strong>par nucléon</strong> E<sub>ℓ</sub>/A est grande, plus le noyau est stable. La courbe d’Aston (−E<sub>ℓ</sub>/A en fonction de A) montre que les noyaux les plus stables ont A voisin de 60 (fer, nickel) : les noyaux lourds peuvent gagner en stabilité en se cassant (fission), les noyaux légers en fusionnant (fusion).")}
          ${exercice(
            "Calcule l’énergie de liaison du noyau d’hélium 4 (m = 4,00151 u ; m<sub>p</sub> = 1,00728 u ; m<sub>n</sub> = 1,00866 u) et son énergie de liaison par nucléon.",
            [
              "Δm = 2 × 1,00728 + 2 × 1,00866 − 4,00151 = <strong>0,03037 u</strong>.",
              "E<sub>ℓ</sub> = 0,03037 × 931,5 ≈ <strong>28,3 MeV</strong>.",
              "E<sub>ℓ</sub>/A ≈ 28,3 ÷ 4 ≈ <strong>7,1 MeV par nucléon</strong> : l’hélium 4 est un noyau très stable.",
            ],
          )}`,
      },
      {
        title: "Radioactivité et décroissance",
        minutes: 35,
        body: `${objectifs([
            "écrire les équations des désintégrations α, β⁻, β⁺ et l’émission γ ;",
            "utiliser la loi de décroissance radioactive, la période et l’activité ;",
            "dater un échantillon.",
          ])}
          <p>La <strong>radioactivité</strong> est la transformation spontanée, aléatoire et inéluctable d’un noyau instable (noyau père) en un autre noyau (noyau fils), avec émission de particules.</p>
          ${tableau([
            ["Type", "Particule émise", "Équation"],
            ["α", `noyau d’hélium ${sup("4")}<sub>2</sub>He`, `${sup("A")}<sub>Z</sub>X → ${sup("A−4")}<sub>Z−2</sub>Y + ${sup("4")}<sub>2</sub>He`],
            ["β⁻", `électron ${sup("0")}<sub>−1</sub>e`, `${sup("A")}<sub>Z</sub>X → ${sup("A")}<sub>Z+1</sub>Y + ${sup("0")}<sub>−1</sub>e (un neutron devient un proton)`],
            ["β⁺", `positon ${sup("0")}<sub>1</sub>e`, `${sup("A")}<sub>Z</sub>X → ${sup("A")}<sub>Z−1</sub>Y + ${sup("0")}<sub>1</sub>e (un proton devient un neutron)`],
            ["γ", "photon de grande énergie", "désexcitation du noyau fils formé dans un état excité"],
          ])}
          ${retenir("<strong>Lois de conservation</strong> (Soddy) : dans une réaction nucléaire, le nombre de nucléons A et le nombre de charge Z se conservent.")}
          <h2>Loi de décroissance</h2>
          ${formula(`N(t) = N₀ e${sup("−λt")} ; période (demi-vie) T = ${frac("ln 2", "λ")} ; activité A = λ N (becquerel, Bq)`)}
          ${liste([
            "au bout d’une période, la moitié des noyaux présents s’est désintégrée ; au bout de n périodes, il en reste N₀/2ⁿ ;",
            "l’activité suit la même loi : A(t) = A₀ e<sup>−λt</sup> ;",
            "<strong>datation au carbone 14</strong> (T = 5 730 ans) : un organisme vivant a une teneur constante en ¹⁴C ; après sa mort, elle décroît.",
          ])}
          ${exercice(
            "L’iode 131, utilisé en médecine, a une période de 8 jours. Une source a une activité de 8 × 10<sup>6</sup> Bq. Quelle est son activité après 24 jours ? Calcule la constante radioactive.",
            [
              "24 jours = 3 périodes : A = A₀ ÷ 2³ = 8 × 10<sup>6</sup> ÷ 8 = <strong>10<sup>6</sup> Bq</strong>.",
              "λ = ln 2 ÷ T = 0,693 ÷ (8 × 86 400 s) ≈ <strong>1,0 × 10<sup>−6</sup> s<sup>−1</sup></strong>.",
            ],
          )}
          ${exercice(
            "Un morceau de bois ancien a une activité en carbone 14 égale au quart de celle d’un bois vivant de même masse. Quel est son âge ?",
            ["A ÷ A₀ = 1/4 = 1/2² : il s’est écoulé 2 périodes.", "Âge ≈ 2 × 5 730 ≈ <strong>11 460 ans</strong>."],
          )}`,
      },
      {
        title: "Fission, fusion et applications",
        minutes: 30,
        body: `${objectifs([
            "écrire des équations de fission et de fusion ;",
            "calculer l’énergie libérée par une réaction nucléaire ;",
            "connaître les applications et les dangers des rayonnements.",
          ])}
          ${tableau([
            ["", "Fission", "Fusion"],
            ["Principe", "un noyau lourd, frappé par un neutron lent, se casse en deux noyaux plus légers et libère 2 ou 3 neutrons", "deux noyaux légers s’unissent pour former un noyau plus lourd"],
            ["Exemple", `${sup("235")}<sub>92</sub>U + ${sup("1")}<sub>0</sub>n → ${sup("94")}<sub>38</sub>Sr + ${sup("140")}<sub>54</sub>Xe + 2 ${sup("1")}<sub>0</sub>n`, `${sup("2")}<sub>1</sub>H + ${sup("3")}<sub>1</sub>H → ${sup("4")}<sub>2</sub>He + ${sup("1")}<sub>0</sub>n (17,6 MeV)`],
            ["Où ?", "centrales nucléaires (réaction en chaîne contrôlée), bombe A", "étoiles (Soleil), bombe H ; recherche (ITER)"],
          ])}
          ${formula("Énergie libérée : E = (m<sub>réactifs</sub> − m<sub>produits</sub>) c² = Δm c²")}
          <p>Les neutrons libérés par une fission peuvent provoquer d’autres fissions : c’est la <strong>réaction en chaîne</strong>, contrôlée dans un réacteur par des barres qui absorbent des neutrons.</p>
          <h2>Effets et applications des rayonnements</h2>
          ${liste([
            "les rayonnements ionisants détruisent les cellules et abîment l’ADN : on s’en protège par la <strong>distance</strong>, des <strong>écrans</strong> (papier pour α, aluminium pour β, plomb et béton pour γ) et une <strong>durée</strong> d’exposition courte ;",
            "médecine : radiothérapie des cancers, imagerie (scintigraphie), stérilisation du matériel ;",
            "datation (carbone 14), traceurs, conservation des aliments.",
          ])}
          ${exercice(
            "Une fission d’uranium 235 libère environ 200 MeV. Calcule l’énergie libérée par la fission de 1 g d’uranium 235 (N<sub>A</sub> = 6,02 × 10<sup>23</sup> mol<sup>−1</sup>).",
            [
              "Nombre de noyaux : N = (1 ÷ 235) × 6,02 × 10<sup>23</sup> ≈ 2,56 × 10<sup>21</sup>.",
              "E = 2,56 × 10<sup>21</sup> × 200 MeV ≈ 5,1 × 10<sup>23</sup> MeV.",
              "E ≈ 5,1 × 10<sup>23</sup> × 1,6 × 10<sup>−13</sup> ≈ <strong>8,2 × 10<sup>10</sup> J</strong>, autant que la combustion d’environ 2 tonnes de pétrole.",
            ],
          )}`,
      },
    ],
  },
];
