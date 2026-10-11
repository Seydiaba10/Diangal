// Contenus de leçon fictifs (HTML déjà « pré-rendu », comme le fera l'enregistrement admin
// en phase 3). Seules les leçons de Thalès sont rédigées ; les autres affichent un gabarit.

const frac = (num: string, den: string) => `<span class="frac"><span>${num}</span><span>${den}</span></span>`;

const THALES_FORMULA = `<p class="formula">${frac("AM", "AB")} = ${frac("AN", "AC")} = ${frac("MN", "BC")}</p>`;

export const LESSON_BODIES: Record<string, string> = {
  "math-theoreme-de-thales--la-configuration-de-thales": `
    <p>Le théorème de Thalès s’utilise dans une figure bien précise : deux droites sécantes en un point A, coupées par deux droites parallèles.</p>
    <h2>Les deux configurations</h2>
    <ul>
      <li><strong>Le triangle</strong> : M est sur [AB], N est sur [AC] et (MN) est parallèle à (BC).</li>
      <li><strong>Le papillon</strong> : M et N sont de l’autre côté de A par rapport à B et C, et (MN) est parallèle à (BC).</li>
    </ul>
    <div class="callout"><p class="callout-title">À retenir</p><p>Avant d’appliquer Thalès, vérifie toujours : deux droites sécantes en A <strong>et</strong> deux droites parallèles.</p></div>`,

  "math-theoreme-de-thales--l-enonce-du-theoreme": `
    <p>Soit deux droites (BM) et (CN) sécantes en A. Si les droites (MN) et (BC) sont parallèles, alors :</p>
    ${THALES_FORMULA}
    <h2>Comment lire ces égalités ?</h2>
    <p>Chaque rapport compare une longueur du « petit » triangle AMN à la longueur correspondante du « grand » triangle ABC. Les trois rapports sont égaux : c’est le coefficient d’agrandissement ou de réduction.</p>
    <div class="callout"><p class="callout-title">Astuce</p><p>Écris les points dans le même ordre en haut et en bas : A, M, N pour le petit triangle ; A, B, C pour le grand.</p></div>`,

  "math-theoreme-de-thales--calculer-une-longueur": `
    <p>Le théorème permet de calculer une longueur inconnue à partir de trois longueurs connues.</p>
    <h2>Exemple</h2>
    <div class="example">
      <p>Dans le triangle ABC, M ∈ [AB] et N ∈ [AC] avec (MN) // (BC). On donne AM = 3 cm, AB = 5 cm et AC = 10 cm. Calculer AN.</p>
      <p>D’après le théorème de Thalès : ${frac("AM", "AB")} = ${frac("AN", "AC")}, donc ${frac("3", "5")} = ${frac("AN", "10")}.</p>
      <p>AN = ${frac("3 × 10", "5")} = <strong>6 cm</strong>.</p>
    </div>
    <div class="callout"><p class="callout-title">Méthode</p><p>1. Vérifier la configuration. 2. Écrire les trois rapports. 3. Garder les deux rapports utiles. 4. Faire le produit en croix.</p></div>`,

  "math-theoreme-de-thales--la-reciproque-du-theoreme-de-thales": `
    <p>La réciproque permet de <strong>démontrer</strong> que deux droites sont parallèles.</p>
    <p>Si les points A, M, B d’une part et A, N, C d’autre part sont alignés <strong>dans le même ordre</strong> et si ${frac("AM", "AB")} = ${frac("AN", "AC")}, alors les droites (MN) et (BC) sont parallèles.</p>
    <h2>Exemple</h2>
    <div class="example"><p>AM = 4, AB = 6, AN = 6 et AC = 9. On calcule ${frac("AM", "AB")} = ${frac("4", "6")} = ${frac("2", "3")} et ${frac("AN", "AC")} = ${frac("6", "9")} = ${frac("2", "3")}. Les rapports sont égaux et les points sont dans le même ordre : (MN) // (BC).</p></div>`,

  "math-theoreme-de-thales--configuration-papillon-et-problemes": `
    <p>Dans la configuration papillon, le point A est entre B et M, et entre C et N. Les égalités de Thalès restent les mêmes :</p>
    ${THALES_FORMULA}
    <div class="callout"><p class="callout-title">Pour le BFEM</p><p>Les exercices combinent souvent Thalès, sa réciproque et le théorème de Pythagore : rédige chaque étape en citant le théorème utilisé.</p></div>`,
};

export function genericLessonBody(lessonTitle: string, chapterTitle: string): string {
  return `
    <p><strong>${lessonTitle}</strong> fait partie du chapitre « ${chapterTitle} ».</p>
    <div class="callout"><p class="callout-title">Contenu de démonstration</p><p>Le cours réel de cette leçon sera rédigé et relu par un enseignant, d’après le programme officiel.</p></div>`;
}
