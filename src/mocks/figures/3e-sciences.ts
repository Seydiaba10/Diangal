// Schémas de 3e en SVT (système nerveux, neurone, réflexe, œil et vision, alvéole, appareil urinaire,
// néphron, anticorps, groupes sanguins, plaques, cycle des roches, datation relative) et en physique-chimie
// (lentilles et image, prisme, forces, travail, électrisation, nœuds, loi d'Ohm, résistances, calorimètre,
// dilution, pH, indicateur coloré, alcanes). Schémas simplifiés, dessinés par DIANGAL.

import { svg } from "../drawings";
import { arrow, cell, circ, dot, ell, lab, lens, ln, meter, path, plot, type Pt, ray, rect, resistor, seg, tx, wire } from "./kit";

const W = 300;


// ── Système nerveux ─────────────────────────────────────────────────────────

const systemeNerveux = (() => {
  // Silhouette de face, encéphale, moelle épinière et quelques nerfs.
  let b = path("M150 18C170 18 180 34 180 50C180 66 170 76 160 80V90H200C214 90 220 100 222 112L232 190H214L204 124V210L210 300H184L162 214H138L116 300H90L96 210V124L86 190H68L78 112C80 100 86 90 100 90H140V80C130 76 120 66 120 50C120 34 130 18 150 18Z", "dg-t-grey");
  b += ell(150, 44, 24, 18, "dg-t-pink") + ell(150, 66, 9, 7, "dg-t-pink");
  b += path("M150 72V210", "dg-nerve-cord");
  for (const y of [100, 130, 160, 190]) b += path(`M150 ${y}C170 ${y + 4} 196 ${y + 10} 210 ${y + 40}M150 ${y}C130 ${y + 4} 104 ${y + 10} 90 ${y + 40}`, "dg-nerve");
  b += path("M154 206C170 236 182 264 196 296M146 206C130 236 118 264 104 296", "dg-nerve");
  b += lab(140, 40, 60, 30, "encéphale") + lab(150, 150, 236, 70, "moelle|épinière") + lab(200, 136, 248, 150, "nerf") + lab(184, 270, 236, 280, "nerf");
  return svg(W, 304, "Le système nerveux (schéma) : l’encéphale dans le crâne et la moelle épinière dans la colonne vertébrale forment le système nerveux central ; les nerfs les relient à tous les organes.", b);
})();

const neurone = (() => {
  let b = "";
  // Dendrites autour du corps cellulaire.
  for (let a = 0; a < 360; a += 45) {
    if (a === 0) continue;
    const r = (a * Math.PI) / 180;
    b += path(`M${50 + 18 * Math.cos(r)} ${80 + 18 * Math.sin(r)}l${22 * Math.cos(r)} ${22 * Math.sin(r)}m0 0l${10 * Math.cos(r + 0.6)} ${10 * Math.sin(r + 0.6)}m${-10 * Math.cos(r + 0.6)} ${-10 * Math.sin(r + 0.6)}l${10 * Math.cos(r - 0.6)} ${10 * Math.sin(r - 0.6)}`, "dg-ink-thin");
  }
  b += circ(50, 80, 20, "dg-t-yellow") + circ(50, 80, 7, "dg-nucleus");
  // Axone avec gaine, puis arborisation terminale.
  b += path("M70 80H250", "dg-axon");
  for (let x = 90; x < 240; x += 34) b += rect(x, 74, 26, 12, "dg-myelin", 6);
  b += path("M250 80l24 -16M250 80l26 0M250 80l24 16", "dg-ink-thin") + dot(274, 64, 3) + dot(276, 80, 3) + dot(274, 96, 3);
  b += arrow(110, 112, 220, 112, "dg-vec", "dg-vec-head", 8) + tx(165, 124, "sens du message nerveux", "dg-lbl-xs");
  b += lab(50, 80, 40, 136, "corps cellulaire") + lab(26, 52, 14, 20, "dendrites") + lab(160, 80, 160, 40, "axone") + lab(276, 80, 270, 136, "terminaisons");
  return svg(W, 146, "Un neurone (schéma) : le corps cellulaire avec son noyau, des dendrites courtes et un long prolongement, l’axone, qui conduit le message nerveux jusqu’aux terminaisons.", b);
})();

const arcReflexe = (() => {
  let b = "";
  // Coupe de moelle épinière (substance grise en papillon).
  b += ell(240, 90, 44, 36, "dg-t-pink") + path("M222 70C232 82 248 82 258 70C262 86 258 100 252 110C246 100 234 100 228 110C222 100 218 86 222 70Z", "dg-t-grey");
  // Main (récepteur) et muscle du bras.
  b += path("M20 170C30 150 54 148 70 156L76 172C60 176 40 182 20 180Z", "dg-t-pink") + ell(96, 110, 34, 14, "dg-t-red");
  b += path("M40 164C90 120 160 70 230 78", "dg-sensory") + path("M246 100C200 130 150 120 110 112", "dg-motor");
  b += arrow(120, 108, 140, 96, "dg-ink", "dg-pt", 6) + arrow(170, 116, 150, 117, "dg-ink", "dg-pt", 6);
  b += dot(40, 164, 4, "dg-vec-head") + path("M20 196h40", "dg-flame-line");
  b += lab(40, 164, 30, 214, "1. récepteur (peau)") + lab(120, 96, 120, 36, "2. nerf sensitif") + lab(240, 90, 250, 150, "3. moelle épinière|(centre)") + lab(160, 120, 170, 170, "4. nerf moteur") + lab(96, 110, 70, 76, "5. muscle");
  return svg(W, 224, "L’arc réflexe : la peau (récepteur) capte la chaleur, le nerf sensitif conduit le message à la moelle épinière, qui renvoie une réponse par le nerf moteur jusqu’au muscle, qui se contracte.", b);
})();

const oeil = (() => {
  const C: Pt = [140, 100];
  let b = circ(C[0], C[1], 80, "dg-t-sand") + circ(C[0], C[1], 74, "dg-retina") + circ(C[0], C[1], 70, "dg-vitre");
  b += path(`M${C[0] - 72} 66A50 50 0 0 0 ${C[0] - 72} 134`, "dg-cornea");
  b += ell(C[0] - 48, C[1], 9, 22, "dg-lens-eye");
  b += ln(C[0] - 58, 70, C[0] - 58, 86, "dg-iris") + ln(C[0] - 58, 114, C[0] - 58, 130, "dg-iris");
  b += path(`M${C[0] + 78} 108C${C[0] + 100} 114 ${C[0] + 120} 120 ${C[0] + 150} 124`, "dg-nerve-optic");
  b += lab(C[0] - 84, 76, 22, 40, "cornée") + lab(C[0] - 58, 76, 60, 18, "iris") + lab(C[0] - 48, 116, 40, 170, "cristallin") + lab(C[0] - 58, 100, 20, 112, "pupille") + lab(C[0] + 70, 62, 236, 30, "rétine") + lab(C[0] + 120, 120, 268, 160, "nerf|optique") + lab(C[0], C[1], 210, 196, "humeur vitrée");
  return svg(W, 206, "L’œil en coupe (schéma) : la lumière traverse la cornée et la pupille, au centre de l’iris, puis le cristallin, et forme une image sur la rétine ; le nerf optique conduit les messages au cerveau.", b);
})();

/** Image sur la rétine : réelle et renversée (deux rayons passant par le centre optique du cristallin). */
const imageRetine = (() => {
  let b = arrow(30, 130, 30, 50, "dg-object-line", "dg-object-head", 9) + tx(18, 46, "objet", "dg-lbl-xs");
  b += circ(214, 100, 60, "dg-vitre") + path("M214 40A60 60 0 0 1 214 160", "dg-retina-line") + ell(160, 100, 8, 22, "dg-lens-eye");
  const top: Pt = [30, 50];
  const bot: Pt = [30, 130];
  const O: Pt = [160, 100];
  const xr = 272;
  const at = (p: Pt): Pt => [xr, O[1] + ((O[1] - p[1]) * (xr - O[0])) / (O[0] - p[0])];
  b += ray(top, O) + ray(O, at(top)) + ray(bot, O) + ray(O, at(bot));
  b += arrow(xr, at(bot)[1], xr, at(top)[1], "dg-image-line", "dg-image-head", 8);
  b += tx(150, 180, "image réelle et renversée sur la rétine", "dg-lbl-xs") + tx(160, 66, "cristallin", "dg-lbl-xs") + tx(284, 40, "rétine", "dg-lbl-xs", "end");
  return svg(W, 190, "Formation de l’image dans l’œil : le cristallin, comme une lentille convergente, forme sur la rétine une image réelle et renversée de l’objet ; le cerveau la redresse.", b);
})();

const defauts = (() => {
  const eye = (cx: number, focusDx: number, label: string, note: string) => {
    let out = ell(cx, 70, 46, 40, "dg-vitre") + path(`M${cx + 10} 32A44 44 0 0 1 ${cx + 10} 108`, "dg-retina-line") + ell(cx - 34, 70, 6, 16, "dg-lens-eye");
    const F: Pt = [cx + 40 + focusDx, 70];
    for (const y of [50, 90]) out += seg([cx - 100, y], [cx - 34, y], "dg-ray") + seg([cx - 34, y], F, "dg-ray") + (focusDx < 0 ? seg(F, [cx + 44, 70 + (70 - y) * 0.5], "dg-ray-virtual") : "");
    out += dot(F[0], F[1], 3.5, "dg-vec-head") + tx(cx, 126, label, "dg-lbl-sm") + tx(cx, 140, note, "dg-lbl-xs");
    return out;
  };
  const b = eye(96, -26, "myopie", "image avant la rétine") + eye(236, 30, "hypermétropie", "image après la rétine");
  return svg(W, 150, "Défauts de la vision : chez le myope, l’image d’un objet lointain se forme avant la rétine (on corrige avec des lentilles divergentes) ; chez l’hypermétrope, elle se forme après (lentilles convergentes).", b);
})();

const alveole = (() => {
  let b = path("M150 20V50", "dg-bronchiole") + circ(150, 104, 56, "dg-t-pink") + circ(150, 104, 48, "dg-air");
  b += path("M84 140C110 176 190 176 216 140", "dg-capillary-red") + path("M84 70C110 34 190 34 216 70", "dg-capillary-blue");
  b += arrow(150, 86, 150, 150, "dg-red-line", "dg-red-fill", 8) + tx(160, 120, "O₂", "dg-lbl", "start");
  b += arrow(132, 44, 132, 96, "dg-blue-line", "dg-blue-fill", 8);
  b += path("M132 96", "dg-ink");
  b += tx(122, 72, "CO₂", "dg-lbl", "end");
  b += lab(150, 32, 196, 18, "air (bronchiole)") + lab(100, 104, 40, 110, "alvéole") + lab(200, 160, 250, 196, "sang qui repart|riche en O₂") + lab(206, 60, 252, 40, "sang qui arrive|riche en CO₂");
  return svg(W, 206, "Une alvéole pulmonaire entourée de capillaires sanguins : le dioxygène passe de l’air de l’alvéole dans le sang, le dioxyde de carbone passe du sang dans l’air, qui sera expiré.", b);
})();

const appareilUrinaire = (() => {
  let b = path("M86 40C60 40 50 70 56 96C62 120 86 126 96 110C104 96 92 84 98 70C104 56 104 40 86 40Z", "dg-t-red") + path("M214 40C240 40 250 70 244 96C238 120 214 126 204 110C196 96 208 84 202 70C196 56 196 40 214 40Z", "dg-t-red");
  b += path("M98 92C110 130 126 160 140 186M202 92C190 130 174 160 160 186", "dg-ureter");
  b += path("M126 180C126 168 174 168 174 180C176 204 164 214 150 214C136 214 124 204 126 180Z", "dg-t-yellow") + path("M150 214V250", "dg-ureter");
  b += path("M106 60H194", "dg-vessel-red-thin") + path("M110 76H190", "dg-vessel-blue-thin");
  b += lab(70, 80, 30, 80, "rein") + lab(118, 140, 60, 150, "uretère") + lab(150, 196, 220, 210, "vessie") + lab(150, 240, 220, 244, "urètre") + lab(150, 60, 236, 18, "aorte et veine cave");
  return svg(W, 258, "L’appareil urinaire (schéma) : deux reins, branchés sur les gros vaisseaux, fabriquent l’urine ; les uretères la conduisent à la vessie, qui se vide par l’urètre.", b);
})();

const nephron = (() => {
  let b = circ(60, 60, 26, "dg-t-pink") + path("M48 52c4-8 12-8 14 0s10 8 12 0-4 16-12 14-18-2-14-14z", "dg-capillary-red-fill");
  b += path("M80 72C110 80 120 60 140 70C160 80 150 110 170 120C190 130 200 100 220 110V200", "dg-tubule");
  b += arrow(68, 18, 60, 40, "dg-red-line", "dg-red-fill", 7) + tx(74, 14, "sang à filtrer", "dg-lbl-xs", "start");
  b += arrow(150, 130, 130, 160, "dg-blue-line", "dg-blue-fill", 7) + tx(126, 176, "réabsorption (eau, glucose…)", "dg-lbl-xs", "end");
  b += arrow(222, 200, 222, 226, "dg-yellow-line", "dg-yellow-line", 7) + tx(230, 220, "urine", "dg-lbl-xs", "start");
  b += lab(60, 60, 16, 110, "1. filtration|(glomérule)") + lab(140, 70, 200, 40, "2. tube urinaire") + lab(196, 106, 260, 140, "3. sécrétion");
  return svg(W, 232, "Un néphron (schéma) : le sang est filtré dans le glomérule ; le long du tube, l’eau, le glucose et une partie des sels retournent dans le sang (réabsorption) et quelques déchets y sont ajoutés (sécrétion) ; il reste l’urine.", b);
})();

const anticorps = (() => {
  const y = (x: number, top: number) => path(`M${x} ${top + 70}V${top + 34}L${x - 24} ${top}M${x} ${top + 34}L${x + 24} ${top}`, "dg-antibody");
  let b = y(80, 50) + y(220, 50);
  // Antigène reconnu (forme qui s'emboîte) et antigène non reconnu.
  b += path("M44 44L56 28L68 44L62 52L50 52Z", "dg-t-red") + tx(56, 18, "antigène reconnu", "dg-lbl-xs");
  b += circ(184, 40, 11, "dg-t-blue") + tx(184, 18, "autre antigène", "dg-lbl-xs");
  b += tx(80, 140, "anticorps : il se fixe", "dg-lbl-xs") + tx(80, 152, "sur son antigène", "dg-lbl-xs") + tx(220, 140, "il ne se fixe pas", "dg-lbl-xs") + tx(220, 152, "sur un autre", "dg-lbl-xs");
  return svg(W, 162, "Un anticorps en forme de Y reconnaît un seul antigène, qui s’emboîte comme une clé dans sa serrure ; il ne se fixe pas sur un autre antigène.", b);
})();

const groupes = (() => {
  const rbc = (cx: number, label: string, ag: ("A" | "B")[]) => {
    let out = circ(cx, 64, 28, "dg-t-red") + circ(cx, 64, 11, "dg-rbc-center");
    ag.forEach((a, i) => {
      for (let k = 0; k < 4; k++) {
        const ang = ((k * 90 + i * 45) * Math.PI) / 180;
        const x = cx + 30 * Math.cos(ang);
        const yy = 64 + 30 * Math.sin(ang);
        out += a === "A" ? path(`M${x - 4} ${yy + 3}L${x} ${yy - 4}L${x + 4} ${yy + 3}Z`, "dg-ag-a") : rect(x - 3.5, yy - 3.5, 7, 7, "dg-ag-b");
      }
    });
    return out + tx(cx, 110, `groupe ${label}`, "dg-lbl-sm");
  };
  let b = rbc(40, "A", ["A"]) + rbc(113, "B", ["B"]) + rbc(186, "AB", ["A", "B"]) + rbc(259, "O", []);
  b += path("M30 132L36 122L42 132Z", "dg-ag-a") + tx(48, 128, "antigène A", "dg-lbl-xs", "start") + rect(130, 124, 8, 8, "dg-ag-b") + tx(144, 128, "antigène B", "dg-lbl-xs", "start");
  return svg(W, 142, "Les groupes sanguins : les globules rouges du groupe A portent l’antigène A, ceux du groupe B l’antigène B, ceux du groupe AB les deux, ceux du groupe O aucun.", b);
})();

const plaques = (() => {
  const block = (x: number, title: string, art: string) => rect(x, 30, 92, 90, "dg-t-sand") + art + title.split("|").map((t, i) => tx(x + 46, 134 + i * 12, t, "dg-lbl-xs")).join("");
  let b = "";
  b += block(4, "divergence|(dorsale)", arrow(46, 70, 12, 70, "dg-vec", "dg-vec-head", 8) + arrow(54, 70, 88, 70, "dg-vec", "dg-vec-head", 8) + path("M50 30V120", "dg-magma-line"));
  b += block(104, "convergence|(subduction)", path("M104 60L150 60L196 100", "dg-ink") + path("M150 60L196 60", "dg-ink") + arrow(110, 50, 140, 50, "dg-vec", "dg-vec-head", 8) + arrow(190, 50, 162, 50, "dg-vec", "dg-vec-head", 8) + path("M166 60l7 -12 7 12", "dg-volcano-mini"));
  b += block(204, "coulissage|(faille)", ln(250, 30, 250, 120, "dg-fault") + arrow(232, 100, 232, 50, "dg-vec", "dg-vec-head", 8) + arrow(268, 50, 268, 100, "dg-vec", "dg-vec-head", 8));
  b += tx(150, 14, "mouvements aux frontières des plaques", "dg-lbl-sm");
  return svg(W, 156, "Trois mouvements de plaques : elles s’écartent au niveau des dorsales (divergence), l’une plonge sous l’autre (convergence, subduction), ou elles glissent côte à côte le long d’une faille (coulissage).", b);
})();

const cycleRoches = (() => {
  const box = (x: number, y: number, t: string, cls: string) => rect(x - 62, y - 16, 124, 32, cls, 10) + tx(x, y, t, "dg-lbl-xs");
  let b = box(150, 24, "magma", "dg-t-red") + box(234, 110, "roches magmatiques", "dg-t-grey") + box(150, 196, "roches sédimentaires", "dg-t-sand") + box(66, 110, "roches métamorphiques", "dg-t-violet");
  b += arrow(196, 40, 226, 90, "dg-ink", "dg-pt", 8) + tx(222, 58, "refroidissement", "dg-lbl-xs", "start");
  b += arrow(226, 128, 196, 178, "dg-ink", "dg-pt", 8) + tx(222, 162, "érosion, dépôt", "dg-lbl-xs", "start");
  b += arrow(104, 178, 74, 128, "dg-ink", "dg-pt", 8) + tx(80, 162, "enfouissement", "dg-lbl-xs", "end");
  b += arrow(74, 92, 104, 40, "dg-ink", "dg-pt", 8) + tx(80, 58, "fusion", "dg-lbl-xs", "end");
  return svg(W, 216, "Le cycle des roches : le magma refroidi donne des roches magmatiques ; l’érosion les détruit et leurs débris forment des roches sédimentaires ; enfouies, elles deviennent métamorphiques ; si elles fondent, elles redonnent un magma.", b);
})();

const datation = (() => {
  const layers: [number, string, string][] = [
    [10, "dg-t-yellow", "D"],
    [46, "dg-t-sand", "C"],
    [82, "dg-t-pink", "B"],
    [118, "dg-t-grey", "A"],
  ];
  let b = "";
  for (const [y, cls, n] of layers) b += rect(40, y, 220, 36, cls) + tx(50, y + 18, n, "dg-lbl", "start");
  // Faille qui coupe A, B et C mais pas D : plus récente que C, plus ancienne que D.
  b += path("M190 154L160 46", "dg-fault") + tx(196, 140, "F", "dg-lbl-math", "start");
  b += path("M84 154C94 130 104 110 100 82C114 100 120 130 124 154Z", "dg-magma") + tx(108, 138, "M", "dg-lbl");
  const notes = [
    "Superposition : A s’est déposée en premier, D en dernier.",
    "La faille F coupe A, B et C, mais pas D :",
    "elle est plus récente que C et plus ancienne que D.",
    "La roche M recoupe A et B : elle leur est postérieure.",
  ];
  notes.forEach((t, i) => (b += tx(150, 170 + i * 13, t, "dg-lbl-xs")));
  return svg(W, 218, "Datation relative : les couches A, B, C et D se sont déposées dans cet ordre (superposition) ; la faille F coupe A, B et C mais pas D, elle est donc plus récente que C et plus ancienne que D ; la roche M recoupe A et B, elle leur est postérieure.", b);
})();

// ── Physique-chimie ─────────────────────────────────────────────────────────

const lentilles = (() => {
  // Lentille convergente : rayons parallèles qui convergent en F′ ; divergente : qui semblent venir de F′.
  let b = ln(10, 70, 140, 70, "dg-ink-thin") + ln(75, 20, 75, 120, "dg-lens") + path("M66 28l9 -10 9 10M66 112l9 10 9 -10", "dg-lens-shape");
  for (const y of [45, 58, 82, 95]) b += seg([12, y], [75, y], "dg-ray") + seg([75, y], [145, y + ((70 - y) * (145 - 75)) / (115 - 75)], "dg-ray");
  b += dot(115, 70, 3) + tx(115, 82, "F′", "dg-lbl-math") + tx(75, 140, "convergente", "dg-lbl-sm");
  b += ln(160, 70, 290, 70, "dg-ink-thin") + ln(225, 20, 225, 120, "dg-lens") + path("M216 22l9 10 9 -10M216 118l9 -10 9 10", "dg-lens-shape");
  for (const y of [50, 60, 80, 90]) {
    const end: Pt = [290, 70 + ((y - 70) * (290 - 185)) / (225 - 185)];
    b += seg([162, y], [225, y], "dg-ray") + seg([225, y], end, "dg-ray") + seg([185, 70], [225, y], "dg-ray-virtual");
  }
  b += dot(185, 70, 3) + tx(185, 82, "F′", "dg-lbl-math") + tx(225, 140, "divergente", "dg-lbl-sm");
  return svg(W, 150, "Une lentille convergente fait converger un faisceau parallèle en son foyer image F′ ; une lentille divergente le fait diverger, comme s’il venait de F′.", b);
})();

const imageLentille = (() => {
  const L = lens({ f: 2, a: -5, h: 1.6, unit: 22, w: W });
  return svg(W, 140, `Construction de l’image d’un objet AB placé avant le foyer F d’une lentille convergente (distance focale 2, objet à 5 de la lentille) : l’image A′B′ est réelle et renversée, à ${(Math.round(L.image.a * 10) / 10).toString().replace(".", ",")} de la lentille.`, L.svg);
})();

const prisme = (() => {
  let b = path("M120 150L170 40L220 150Z", "dg-prism");
  b += ray([10, 112], [146, 96], "dg-ray-white");
  const colors = ["dg-sp-red", "dg-sp-orange", "dg-sp-yellow", "dg-sp-green", "dg-sp-blue", "dg-sp-indigo", "dg-sp-violet"];
  colors.forEach((cls, i) => {
    const exit: Pt = [196, 100 + i * 2];
    b += path(`M146 96L${exit[0]} ${exit[1]}L290 ${110 + i * 11}`, cls);
  });
  b += tx(296, 96, "rouge (le moins dévié)", "dg-lbl-xs", "end") + tx(292, 192, "violet (le plus dévié)", "dg-lbl-xs", "end") + tx(14, 130, "lumière blanche", "dg-lbl-xs", "start") + tx(170, 166, "prisme", "dg-lbl-xs");
  return svg(W, 198, "La lumière blanche qui traverse un prisme est déviée et décomposée en un spectre de couleurs, du rouge (le moins dévié) au violet (le plus dévié).", b);
})();

const equilibre = (() => {
  let b = rect(110, 10, 80, 10, "dg-pt") + ln(150, 20, 150, 90, "dg-ink") + rect(126, 90, 48, 40, "dg-t-grey", 4) + tx(150, 110, "S", "dg-lbl");
  b += arrow(150, 90, 150, 40, "dg-vec", "dg-vec-head", 10) + tx(160, 52, "T (tension du fil)", "dg-lbl-xs", "start");
  b += arrow(150, 112, 150, 166, "dg-vec", "dg-vec-head", 10) + tx(160, 160, "P (poids)", "dg-lbl-xs", "start");
  b += tx(150, 186, "même droite d’action, sens contraires, T = P", "dg-lbl-xs");
  return svg(W, 196, "Un solide suspendu à un fil est en équilibre sous deux forces : la tension du fil, vers le haut, et son poids, vers le bas ; elles ont la même droite d’action et la même intensité.", b);
})();

const reciproques = (() => {
  let b = rect(70, 50, 80, 60, "dg-t-blue", 6) + tx(96, 96, "A", "dg-lbl") + rect(150, 50, 80, 60, "dg-t-red", 6) + tx(204, 96, "B", "dg-lbl");
  b += arrow(150, 68, 204, 68, "dg-vec", "dg-vec-head", 10) + tx(204, 38, "F A/B (sur B)", "dg-lbl-xs");
  b += arrow(150, 68, 96, 68, "dg-vec", "dg-vec-head", 10) + tx(96, 38, "F B/A (sur A)", "dg-lbl-xs");
  b += tx(150, 140, "même intensité, sens contraires, sur deux corps différents", "dg-lbl-xs");
  return svg(W, 152, "Principe des actions réciproques : quand A pousse B, B pousse A ; les deux forces ont la même droite d’action et la même intensité, mais des sens contraires, et s’appliquent sur deux corps différents.", b);
})();

const travail = (() => {
  let b = rect(0, 168, W, 10, "dg-t-sand") + rect(60, 136, 40, 32, "dg-t-grey", 4) + rect(60, 36, 40, 32, "dg-t-grey", 4);
  b += path("M60 36h40v32h-40z", "dg-dash") + arrow(80, 130, 80, 76, "dg-ink", "dg-pt", 8);
  b += arrow(130, 168, 130, 36, "dg-ink-thin", "dg-pt", 6) + arrow(130, 36, 130, 168, "dg-ink-thin", "dg-pt", 6) + tx(138, 100, "h = 1,5 m", "dg-lbl-sm", "start");
  b += tx(150, 196, "W = P × h = 20 × 10 × 1,5 = 300 J", "dg-lbl-sm") + tx(80, 26, "sac de 20 kg", "dg-lbl-xs");
  return svg(W, 206, "Soulever un sac de 20 kg de 1,5 m demande un travail W = P × h = 200 N × 1,5 m = 300 J.", b);
})();

const electrisation = (() => {
  let b = path("M30 40L150 90", "dg-rod") + tx(40, 24, "règle frottée (chargée −)", "dg-lbl-xs", "start");
  for (const [x, y] of [[60, 48], [86, 60], [112, 70], [136, 80]] as Pt[]) b += tx(x, y + 8, "−", "dg-charge");
  for (const [x, y] of [[164, 140], [190, 150], [214, 136], [178, 120]] as Pt[]) b += rect(x - 7, y - 5, 14, 10, "dg-cell") ;
  b += arrow(180, 116, 160, 100, "dg-vec", "dg-vec-head", 7) + tx(212, 104, "morceaux de papier", "dg-lbl-xs", "start") + tx(212, 116, "attirés", "dg-lbl-xs", "start");
  b += tx(150, 176, "charges de même signe : répulsion ;", "dg-lbl-xs") + tx(150, 189, "de signes contraires : attraction", "dg-lbl-xs");
  return svg(W, 198, "Électrisation par frottement : une règle frottée se charge et attire de petits morceaux de papier. Deux charges de même signe se repoussent, deux charges de signes contraires s’attirent.", b);
})();

const noeuds = (() => {
  let b = cell(60, 24, "h") + wire([42, 24], [20, 24], [20, 70]) + meter(20, 88, "A", "v") + wire([20, 106], [20, 160], [100, 160]) + dot(100, 160, 3.2);
  b += wire([100, 160], [100, 100], [140, 100]) + resistor(158, 100, "h") + wire([176, 100], [240, 100], [240, 160]) + dot(240, 160, 3.2);
  b += wire([100, 160], [140, 160]) + resistor(158, 160, "h") + wire([176, 160], [240, 160]);
  b += wire([240, 160], [280, 160], [280, 24], [78, 24]);
  b += tx(32, 88, "I", "dg-lbl-math", "start") + tx(120, 92, "I₁", "dg-lbl-math") + tx(120, 152, "I₂", "dg-lbl-math") + tx(100, 176, "nœud", "dg-lbl-xs");
  b += tx(150, 196, "I = I₁ + I₂ : 0,8 A = 0,3 A + 0,5 A", "dg-lbl-sm");
  return svg(W, 206, "Loi des nœuds : au nœud, le courant principal I se partage entre les deux branches ; I = I₁ + I₂ (par exemple 0,8 A = 0,3 A + 0,5 A).", b);
})();

const ohm = plot(
  { x: [0, 0.07], y: [0, 7], unit: 3600, unitY: 24, ticksX: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06], ticksY: [1, 2, 3, 4, 5, 6], grid: false, labelX: "I (A)", labelY: "U (V)" },
  "Caractéristique d’un conducteur ohmique de 100 Ω : la tension U est proportionnelle à l’intensité I (droite qui passe par l’origine) ; pour I = 0,05 A, U = 5 V.",
  (p) => p.line(100, 0) + p.guides(0.05, 5) + p.point(0.05, 5, "", 0, 0) + p.text(0.052, 4.4, "U = 100 × I", "dg-lbl-sm", "start"),
);

const resistances = (() => {
  let b = wire([10, 40], [40, 40]) + resistor(58, 40, "h") + wire([76, 40], [94, 40]) + resistor(112, 40, "h") + wire([130, 40], [150, 40]);
  b += tx(58, 22, "100 Ω", "dg-lbl-xs") + tx(112, 22, "200 Ω", "dg-lbl-xs") + tx(80, 72, "en série : R = 300 Ω", "dg-lbl-xs");
  b += wire([170, 70], [190, 70]) + dot(190, 70, 3) + wire([190, 70], [190, 40], [212, 40]) + resistor(230, 40, "h") + wire([248, 40], [270, 40], [270, 70]);
  b += wire([190, 70], [190, 100], [212, 100]) + resistor(230, 100, "h") + wire([248, 100], [270, 100], [270, 70]) + dot(270, 70, 3) + wire([270, 70], [290, 70]);
  b += tx(230, 22, "100 Ω", "dg-lbl-xs") + tx(230, 82, "100 Ω", "dg-lbl-xs") + tx(230, 126, "en dérivation : R = 50 Ω", "dg-lbl-xs");
  return svg(W, 136, "Associations de résistances : en série, 100 Ω et 200 Ω équivalent à 300 Ω ; en dérivation, 100 Ω et 100 Ω équivalent à 50 Ω.", b);
})();

const calorimetre = (() => {
  let b = rect(80, 40, 140, 140, "dg-t-grey", 8) + rect(96, 54, 108, 120, "dg-cell", 4) + rect(100, 100, 100, 70, "dg-water");
  b += rect(84, 30, 132, 12, "dg-pt", 3) + ln(130, 14, 130, 150, "dg-ink") + circ(130, 150, 4, "dg-red-fill") + path("M170 14V140h-12", "dg-ink-thin");
  b += lab(88, 60, 50, 50, "paroi isolante") + lab(130, 30, 60, 14, "thermomètre") + lab(170, 60, 250, 40, "agitateur") + lab(150, 140, 250, 150, "mélange d’eau|chaude et froide");
  b += tx(150, 198, "200 g à 80 °C + 300 g à 20 °C → 44 °C", "dg-lbl-sm");
  return svg(W, 208, "Un calorimètre, récipient isolé avec thermomètre et agitateur : en y mélangeant 200 g d’eau à 80 °C et 300 g d’eau à 20 °C, on obtient une température d’équilibre de 44 °C.", b);
})();

const dilution = (() => {
  let b = path("M40 30V150Q40 160 50 160H90Q100 160 100 150V30", "dg-glass") + rect(42, 70, 56, 88, "dg-sol-strong");
  b += path("M120 20V120L126 132L132 120V20Z", "dg-glass") + rect(121, 60, 10, 60, "dg-sol-strong") + tx(126, 12, "pipette 50 mL", "dg-lbl-xs");
  b += arrow(140, 100, 180, 100, "dg-ink", "dg-pt", 8);
  b += path("M230 20V90C270 100 270 160 230 166H210C170 160 170 100 210 90V20Z", "dg-glass") + path("M184 130C186 110 200 100 212 98H228C240 100 254 110 256 130C258 150 248 164 230 164H210C192 164 182 150 184 130Z", "dg-sol-weak") + ln(205, 40, 235, 40, "dg-red-line") + tx(242, 40, "trait de jauge", "dg-lbl-xs", "start");
  b += tx(70, 180, "C₁ = 0,2 mol/L", "dg-lbl-xs") + tx(220, 182, "fiole de 200 mL : C₂ = 0,05 mol/L", "dg-lbl-xs");
  return svg(W, 192, "Dilution : on prélève 50 mL d’une solution à 0,2 mol/L avec une pipette, on les verse dans une fiole jaugée de 200 mL et on complète avec de l’eau jusqu’au trait de jauge ; la concentration devient 0,05 mol/L.", b);
})();

const echellePh = (() => {
  let b = "";
  for (let i = 0; i <= 14; i++) b += rect(10 + i * 19, 40, 19, 26, `dg-ph-${i}`) + tx(19.5 + i * 19, 78, i, "dg-tick");
  b += tx(70, 26, "acide", "dg-lbl-sm") + tx(152, 26, "neutre", "dg-lbl-sm") + tx(234, 26, "basique", "dg-lbl-sm");
  b += lab(46, 66, 46, 100, "citron (≈ 2)") + lab(152, 66, 150, 112, "eau pure (7)") + lab(248, 66, 254, 100, "javel (≈ 12)");
  return svg(W, 122, "Échelle de pH de 0 à 14 : en dessous de 7, la solution est acide (jus de citron, vers 2) ; à 7, elle est neutre (eau pure) ; au-dessus de 7, elle est basique (eau de javel, vers 12).", b);
})();

const bbt = (() => {
  const tube = (cx: number, cls: string, label: string) => path(`M${cx - 14} 20V110A14 14 0 0 0 ${cx + 14} 110V20`, "dg-glass") + rect(cx - 13, 60, 26, 52, cls) + path(`M${cx - 13} 112A13 13 0 0 0 ${cx + 13} 112Z`, cls) + tx(cx, 144, label, "dg-lbl-xs");
  const b = tube(60, "dg-bbt-yellow", "acide : jaune") + tube(150, "dg-bbt-green", "neutre : vert") + tube(240, "dg-bbt-blue", "basique : bleu") + tx(150, 12, "bleu de bromothymol (BBT)", "dg-lbl-sm");
  return svg(W, 154, "Le bleu de bromothymol est jaune en milieu acide, vert en milieu neutre et bleu en milieu basique.", b);
})();

const alcanes = (() => {
  /** Formule développée d'un alcane linéaire à n carbones. */
  const developpee = (x0: number, y: number, n: number) => {
    let out = "";
    for (let i = 0; i < n; i++) {
      const x = x0 + i * 30;
      out += tx(x, y, "C", "dg-formula") + tx(x, y - 22, "H", "dg-formula") + tx(x, y + 22, "H", "dg-formula") + ln(x, y - 15, x, y - 7, "dg-ink-thin") + ln(x, y + 7, x, y + 15, "dg-ink-thin");
      if (i < n - 1) out += ln(x + 7, y, x + 23, y, "dg-ink-thin");
    }
    out += tx(x0 - 22, y, "H", "dg-formula") + ln(x0 - 15, y, x0 - 7, y, "dg-ink-thin") + tx(x0 + (n - 1) * 30 + 22, y, "H", "dg-formula") + ln(x0 + (n - 1) * 30 + 7, y, x0 + (n - 1) * 30 + 15, y, "dg-ink-thin");
    return out;
  };
  let b = developpee(52, 40, 1) + tx(52, 80, "méthane CH₄", "dg-lbl-xs") + developpee(160, 40, 2) + tx(175, 80, "éthane C₂H₆", "dg-lbl-xs");
  b += developpee(52, 124, 3) + tx(82, 164, "propane C₃H₈", "dg-lbl-xs") + developpee(176, 124, 4) + tx(221, 164, "butane C₄H₁₀", "dg-lbl-xs");
  return svg(W, 174, "Formules développées des quatre premiers alcanes : méthane CH₄, éthane C₂H₆, propane C₃H₈ et butane C₄H₁₀ ; chaque carbone forme quatre liaisons.", b);
})();

export const SCHEMAS_3E_SCIENCES: Record<string, string> = {
  "s3-systeme-nerveux": systemeNerveux,
  "s3-neurone": neurone,
  "s3-arc-reflexe": arcReflexe,
  "s3-oeil": oeil,
  "s3-image-retine": imageRetine,
  "s3-defauts-vision": defauts,
  "s3-alveole": alveole,
  "s3-appareil-urinaire": appareilUrinaire,
  "s3-nephron": nephron,
  "s3-anticorps": anticorps,
  "s3-groupes-sanguins": groupes,
  "s3-plaques": plaques,
  "s3-cycle-roches": cycleRoches,
  "s3-datation": datation,
  "p3-lentilles": lentilles,
  "p3-image-lentille": imageLentille,
  "p3-prisme": prisme,
  "p3-equilibre": equilibre,
  "p3-actions-reciproques": reciproques,
  "p3-travail": travail,
  "p3-electrisation": electrisation,
  "p3-loi-noeuds": noeuds,
  "p3-loi-ohm": ohm,
  "p3-resistances": resistances,
  "p3-calorimetre": calorimetre,
  "p3-dilution": dilution,
  "p3-echelle-ph": echellePh,
  "p3-bbt": bbt,
  "p3-alcanes": alcanes,
};
