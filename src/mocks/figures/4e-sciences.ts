// Schémas de 4e en SVT (appareil digestif, villosité, sang, cœur et circulation, appareils reproducteurs,
// grossesse, chromosomes, séisme, structure du globe, volcan, roches) et en physique-chimie (éprouvette,
// dynamomètre, circuits, ombre, éclipse, réflexion, réfraction, séparation des mélanges, molécules,
// réaction chimique). Schémas simplifiés, dessinés par DIANGAL.

import { svg } from "../drawings";
import { arrow, cell, circ, dot, ell, lab, lamp, ln, path, type Pt, ray, rect, seg, switchK, tx, wire } from "./kit";

const W = 300;

/** Légende à gauche (texte calé à droite en x) ou à droite (texte calé à gauche) reliée au point (px, py). */

// ── Appareil digestif ───────────────────────────────────────────────────────

const digestif = (() => {
  let b = "";
  // Foie (à gauche de l'image = côté droit du corps) et vésicule biliaire.
  b += path("M104 96C130 84 176 86 190 96C186 112 160 118 140 128C124 136 110 140 104 132C100 120 100 106 104 96Z", "dg-t-red");
  b += ell(132, 136, 7, 5, "dg-t-green");
  // Œsophage et estomac (à droite de l'image).
  b += path("M150 30C152 60 156 80 166 98", "dg-tube");
  b += path("M164 94C182 84 206 92 206 114C206 140 190 158 168 158C156 158 150 150 156 142C166 138 176 132 178 116C174 108 168 104 164 94Z", "dg-t-pink");
  // Pancréas sous l'estomac.
  b += path("M150 164C166 160 192 160 206 168C196 174 166 174 150 170Z", "dg-t-yellow");
  // Gros intestin : côlon ascendant, transverse, descendant, puis rectum.
  b += path("M118 270V184H198V258C198 270 186 276 170 276H158", "dg-colon");
  b += path("M158 276V292", "dg-tube") + tx(158, 297, "", "dg-lbl-xs");
  b += path("M118 270C114 276 112 282 116 286", "dg-tube");
  // Intestin grêle (replis) dans le cadre du côlon.
  b += path("M154 150C150 160 140 176 134 194C150 196 176 194 182 204C168 210 140 206 136 216C152 222 178 218 184 228C170 236 142 232 138 242C154 250 176 246 180 256", "dg-small-gut");
  // Bouche et glande salivaire.
  b += ell(150, 22, 16, 7, "dg-t-pink") + ell(118, 34, 7, 5, "dg-t-yellow");
  b += lab(150, 22, 214, 14, "bouche") + lab(118, 34, 96, 40, "glande salivaire") + lab(153, 62, 214, 58, "œsophage");
  b += lab(116, 110, 96, 104, "foie") + lab(132, 136, 96, 146, "vésicule biliaire") + lab(192, 120, 214, 110, "estomac");
  b += lab(196, 167, 214, 166, "pancréas") + lab(160, 222, 214, 224, "intestin grêle") + lab(118, 222, 96, 210, "gros intestin");
  b += lab(115, 284, 96, 284, "appendice") + lab(176, 274, 214, 268, "rectum") + lab(158, 292, 214, 292, "anus");
  return svg(W, 302, "Appareil digestif (schéma) : bouche, glandes salivaires, œsophage, estomac, foie, vésicule biliaire, pancréas, intestin grêle, gros intestin, rectum et anus.", b);
})();

const villosite = (() => {
  let b = rect(0, 196, W, 20, "dg-t-pink") + tx(292, 206, "paroi de l’intestin", "dg-lbl-xs", "end");
  // Villosité : doigt de gant.
  b += path("M110 200V60C110 30 190 30 190 60V200", "dg-t-pink");
  b += path("M126 196V66C126 48 174 48 174 66V196", "dg-ink-thin");
  // Capillaires (artériole rouge, veinule bleue) et chylifère (jaune).
  b += path("M134 196V74C134 58 166 58 166 74V196", "dg-blue-line") + path("M134 196V100", "dg-red-line");
  b += path("M150 196V82", "dg-yellow-line");
  for (let y = 90; y < 190; y += 22) b += path(`M134 ${y}C142 ${y + 6} 158 ${y + 6} 166 ${y}`, "dg-ink-thin");
  // Nutriments qui passent.
  for (const [x, y] of [[70, 80], [80, 120], [230, 90], [222, 136]] as Pt[]) b += dot(x, y, 3, "dg-vec-head") + arrow(x + (x < 150 ? 8 : -8), y, x < 150 ? 106 : 194, y + 4, "dg-ink-thin", "dg-pt", 5);
  b += tx(20, 40, "nutriments", "dg-lbl-xs", "start") + tx(20, 52, "(intérieur de l’intestin)", "dg-lbl-xs", "start");
  b += lab(134, 120, 96, 158, "capillaire|sanguin") + lab(150, 140, 232, 170, "vaisseau|lymphatique") + lab(186, 60, 232, 40, "cellules|de la paroi");
  return svg(W, 222, "Une villosité intestinale (schéma) : un repli de la paroi de l’intestin grêle, parcouru par des capillaires sanguins et un vaisseau lymphatique ; les nutriments la traversent pour passer dans le sang et la lymphe.", b);
})();

const sang = (() => {
  let b = rect(0, 0, W, 170, "dg-t-yellow") + tx(292, 160, "plasma", "dg-lbl-xs", "end");
  const rbc = (x: number, y: number) => circ(x, y, 12, "dg-t-red") + circ(x, y, 5, "dg-rbc-center");
  for (const [x, y] of [[30, 30], [70, 50], [40, 80], [110, 30], [130, 100], [180, 40], [240, 30], [260, 80], [200, 120], [60, 130], [100, 70], [230, 140]] as Pt[]) b += rbc(x, y);
  // Globules blancs : plus gros, noyau violet en lobes.
  b += circ(168, 82, 20, "dg-cell") + path("M156 80c4-8 12-6 12 0s8 8 12 0 4 8-2 12-16 4-22 0z", "dg-nucleus");
  b += circ(36, 140, 18, "dg-cell") + circ(36, 140, 10, "dg-nucleus");
  // Plaquettes : petits fragments.
  for (const [x, y] of [[90, 140], [150, 140], [210, 70], [270, 120], [130, 60]] as Pt[]) b += ell(x, y, 4, 2.5, "dg-t-violet");
  const under = (px: number, py: number, x: number, text: string) => ln(px, py, x, 178, "dg-leader") + dot(px, py, 1.8) + tx(x, 186, text, "dg-lbl-xs");
  b += under(70, 50, 50, "globule rouge") + under(168, 82, 150, "globule blanc") + under(270, 120, 252, "plaquette");
  return svg(W, 196, "Le sang observé au microscope (schéma) : de nombreux globules rouges sans noyau, quelques globules blancs avec un noyau, de petites plaquettes, dans un liquide, le plasma.", b);
})();

/** Cœur en coupe : la moitié droite du cœur est à gauche de l'image (on regarde la personne de face). */
const coeur = (() => {
  let b = "";
  // Vaisseaux : veine cave (bleu) en haut à gauche, aorte (rouge) au centre, artère pulmonaire (bleu).
  b += path("M84 16V70", "dg-vessel-blue") + path("M84 214V170", "dg-vessel-blue");
  b += path("M150 96C150 40 186 24 218 34", "dg-vessel-red") + path("M130 100C124 60 100 50 70 50", "dg-vessel-blue-thin");
  b += path("M250 70H214", "dg-vessel-red-thin");
  // Cavités.
  b += path("M70 72H148V112H70Z", "dg-t-blue") + path("M152 72H234V112H152Z", "dg-t-red");
  b += path("M70 116H148V176C148 196 120 204 104 196C84 186 70 160 70 116Z", "dg-t-blue") + path("M152 116H234C234 160 220 190 196 204C176 214 156 200 152 176Z", "dg-t-red");
  b += ln(150, 70, 150, 200, "dg-septum");
  // Sens du sang.
  b += arrow(84, 22, 84, 64, "dg-blue-line", "dg-blue-fill", 8) + arrow(84, 208, 84, 176, "dg-blue-line", "dg-blue-fill", 8) + arrow(110, 100, 110, 150, "dg-ink", "dg-pt", 7);
  b += arrow(248, 70, 222, 86, "dg-red-line", "dg-red-fill", 8) + arrow(196, 100, 196, 150, "dg-ink", "dg-pt", 7);
  b += tx(109, 92, "OD", "dg-lbl") + tx(193, 92, "OG", "dg-lbl") + tx(109, 160, "VD", "dg-lbl") + tx(193, 160, "VG", "dg-lbl");
  b += lab(84, 40, 60, 30, "veine cave") + lab(206, 32, 238, 18, "aorte") + lab(92, 50, 60, 56, "artère pulm.") + lab(244, 70, 238, 58, "veines pulm.");
  b += tx(10, 222, "OD, VD : oreillette et ventricule droits (sang pauvre en O₂)", "dg-lbl-xs", "start") + tx(10, 236, "OG, VG : oreillette et ventricule gauches (sang riche en O₂)", "dg-lbl-xs", "start");
  return svg(W, 244, "Le cœur en coupe (schéma, vu de face) : deux oreillettes et deux ventricules ; le cœur droit (à gauche du dessin) reçoit le sang pauvre en dioxygène des veines caves, le cœur gauche envoie le sang riche en dioxygène dans l’aorte.", b);
})();

const doubleCirculation = (() => {
  let b = "";
  b += rect(100, 12, 100, 30, "dg-t-pink", 10) + tx(150, 27, "poumons", "dg-lbl");
  b += rect(100, 196, 100, 30, "dg-t-sand", 10) + tx(150, 211, "organes", "dg-lbl");
  b += rect(110, 100, 38, 40, "dg-t-blue", 6) + rect(152, 100, 38, 40, "dg-t-red", 6) + tx(129, 120, "droit", "dg-lbl-xs") + tx(171, 120, "gauche", "dg-lbl-xs") + tx(150, 92, "cœur", "dg-lbl-sm");
  // Petite circulation : cœur droit → poumons (bleu) → cœur gauche (rouge).
  b += path("M120 100V70Q120 52 110 42", "dg-blue-line") + arrow(116, 60, 112, 46, "dg-blue-line", "dg-blue-fill", 7);
  b += path("M190 42Q180 52 180 70V100", "dg-red-line") + arrow(180, 80, 180, 96, "dg-red-line", "dg-red-fill", 7);
  // Grande circulation : cœur gauche → organes (rouge) → cœur droit (bleu).
  b += path("M190 140Q230 150 230 196", "dg-red-line") + arrow(228, 176, 226, 192, "dg-red-line", "dg-red-fill", 7);
  b += path("M100 210Q70 180 70 150Q70 132 110 130", "dg-blue-line") + arrow(84, 136, 106, 131, "dg-blue-line", "dg-blue-fill", 7);
  b += tx(250, 70, "petite", "dg-lbl-xs") + tx(250, 82, "circulation", "dg-lbl-xs") + tx(262, 150, "grande", "dg-lbl-xs") + tx(262, 162, "circulation", "dg-lbl-xs");
  b += rect(10, 236, 14, 6, "dg-red-fill") + tx(30, 239, "sang riche en dioxygène", "dg-lbl-xs", "start") + rect(160, 236, 14, 6, "dg-blue-fill") + tx(180, 239, "sang pauvre en dioxygène", "dg-lbl-xs", "start");
  return svg(W, 250, "La double circulation : le cœur droit envoie le sang aux poumons, où il se charge en dioxygène, puis il revient au cœur gauche (petite circulation) ; le cœur gauche l’envoie aux organes, d’où il revient au cœur droit (grande circulation).", b);
})();

/** Appareil reproducteur féminin, vu de face (schéma). */
const feminin = (() => {
  let b = path("M126 110C126 82 174 82 174 110C174 140 162 160 156 172H144C138 160 126 140 126 110Z", "dg-t-pink");
  b += path("M144 172V214H156V172", "dg-t-pink");
  b += path("M128 100C110 84 92 88 76 98C70 102 66 110 72 114", "dg-tube-pink") + path("M172 100C190 84 208 88 224 98C230 102 234 110 228 114", "dg-tube-pink");
  b += ell(84, 124, 14, 9, "dg-t-yellow") + ell(216, 124, 14, 9, "dg-t-yellow");
  b += lab(84, 124, 60, 140, "ovaire") + lab(100, 88, 60, 74, "trompe") + lab(150, 120, 236, 160, "utérus") + lab(150, 168, 236, 184, "col de l’utérus") + lab(150, 204, 236, 206, "vagin");
  return svg(W, 222, "Appareil reproducteur de la femme (schéma, vu de face) : deux ovaires, deux trompes, l’utérus, son col et le vagin.", b);
})();

/** Appareil reproducteur masculin, vu de face (schéma). */
const masculin = (() => {
  let b = ell(150, 62, 34, 26, "dg-t-yellow") + tx(150, 62, "vessie", "dg-lbl-xs");
  b += ell(150, 98, 16, 10, "dg-t-sand");
  b += path("M146 104V176H154V104", "dg-t-pink") + path("M138 150C138 190 162 190 162 150", "dg-t-pink");
  b += ell(110, 196, 14, 18, "dg-t-pink") + ell(190, 196, 14, 18, "dg-t-pink");
  b += path("M110 178C96 140 106 96 140 92", "dg-tube") + path("M190 178C204 140 194 96 160 92", "dg-tube");
  b += path("M100 186C96 196 98 208 104 212", "dg-ink-thin") + path("M200 186C204 196 202 208 196 212", "dg-ink-thin");
  b += lab(150, 98, 236, 102, "prostate") + lab(104, 130, 60, 120, "spermiducte") + lab(150, 160, 236, 150, "pénis") + lab(150, 130, 236, 126, "urètre") + lab(110, 200, 60, 200, "testicule");
  return svg(W, 222, "Appareil reproducteur de l’homme (schéma, vu de face) : deux testicules, les spermiductes, la prostate, l’urètre et le pénis, sous la vessie.", b);
})();

const grossesse = (() => {
  let b = path("M60 70C60 20 240 20 240 70C240 150 200 200 160 214H140C100 200 60 150 60 70Z", "dg-t-pink");
  b += path("M82 76C82 40 218 40 218 76C218 140 186 180 150 192C114 180 82 140 82 76Z", "dg-amnios");
  // Placenta en haut à droite, cordon jusqu'au fœtus.
  b += path("M170 46C196 44 214 56 216 76C204 70 186 66 170 60Z", "dg-t-red");
  // Fœtus (tête en bas).
  b += circ(140, 150, 22, "dg-t-sand") + path("M120 136C112 110 120 82 146 76C172 72 184 96 178 122C174 140 160 146 150 138", "dg-t-sand");
  b += path("M160 110C176 100 186 84 192 64", "dg-cord");
  b += lab(196, 56, 236, 30, "placenta") + lab(182, 88, 248, 80, "cordon|ombilical") + lab(150, 100, 248, 120, "fœtus") + lab(100, 90, 54, 60, "liquide|amniotique") + lab(150, 206, 236, 210, "col de l’utérus") + lab(66, 120, 54, 150, "paroi de|l’utérus");
  return svg(W, 224, "Le fœtus dans l’utérus (schéma) : il baigne dans le liquide amniotique ; le cordon ombilical le relie au placenta, où se font les échanges avec le sang de la mère.", b);
})();

/** Caryotype schématique : 22 paires et la paire sexuelle (XX ou XY). */
const caryotype = (() => {
  let b = "";
  const len = (i: number) => 34 - i * 1.1;
  for (let i = 0; i < 22; i++) {
    const col = i % 8;
    const row = Math.floor(i / 8);
    const x = 14 + col * 36;
    const y = 30 + row * 56;
    const l = len(i);
    b += rect(x, y + (34 - l), 6, l, "dg-chromo", 3) + rect(x + 9, y + (34 - l), 6, l, "dg-chromo", 3) + tx(x + 7.5, y + 44, i + 1, "dg-tick");
  }
  const x = 14 + 6 * 36;
  const y = 30 + 2 * 56;
  b += rect(x, y, 6, 30, "dg-chromo-x", 3) + rect(x + 9, y, 6, 30, "dg-chromo-x", 3) + tx(x + 7.5, y + 44, "XX", "dg-tick");
  b += rect(x + 36, y, 6, 30, "dg-chromo-x", 3) + rect(x + 45, y + 18, 6, 12, "dg-chromo-y", 3) + tx(x + 43.5, y + 44, "XY", "dg-tick");
  b += tx(150, 12, "22 paires semblables chez la femme et chez l’homme", "dg-lbl-xs") + tx(150, 196, "23e paire : XX chez la femme, XY chez l’homme", "dg-lbl-xs");
  return svg(W, 204, "Caryotype humain (schéma) : 23 paires de chromosomes, soit 46. Les 22 premières paires sont semblables chez la femme et chez l’homme ; la 23e est XX chez la femme et XY chez l’homme.", b);
})();

const seisme = (() => {
  let b = rect(0, 40, W, 150, "dg-t-sand") + path("M0 40H300", "dg-ink");
  b += path("M178 40L120 190", "dg-fault");
  const F: Pt = [146, 122];
  for (const r of [20, 40, 62, 86]) b += circ(F[0], F[1], r, "dg-wave");
  b += dot(F[0], F[1], 5, "dg-vec-head") + ln(F[0], F[1], F[0], 40, "dg-dash") + path(`M${F[0] - 7} 40l7 -12 7 12z`, "dg-vec-head");
  b += lab(F[0], F[1], 60, 168, "foyer|(hypocentre)") + lab(F[0], 34, 70, 18, "épicentre") + lab(166, 70, 240, 18, "faille") + lab(F[0] + 62, F[1], 240, 168, "ondes|sismiques");
  return svg(W, 196, "Un séisme (schéma en coupe) : la rupture des roches le long d’une faille, au foyer, libère des ondes sismiques ; l’épicentre est le point de la surface situé juste au-dessus du foyer.", b);
})();

/** Structure du globe : quart de sphère en coupe, épaisseurs à l'échelle (rayon 6 370 km). */
const globe = (() => {
  const C: Pt = [14, 190];
  const R = 160;
  const r = (km: number) => (R * (6370 - km)) / 6370;
  const quarter = (rad: number, cls: string) => path(`M${C[0]} ${C[1]}L${C[0] + rad} ${C[1]}A${rad} ${rad} 0 0 0 ${C[0]} ${C[1] - rad}Z`, cls);
  let b = quarter(R, "dg-t-sand") + quarter(r(30), "dg-t-red") + quarter(r(2900), "dg-t-yellow") + quarter(r(5150), "dg-t-pink");
  b += lab(C[0] + R * 0.72, C[1] - R * 0.7, 196, 22, "croûte|(5 à 70 km)") + lab(C[0] + r(30) * 0.85, C[1] - r(30) * 0.4, 196, 70, "manteau") + lab(C[0] + r(2900) * 0.8, C[1] - r(2900) * 0.45, 196, 118, "noyau externe|(liquide)") + lab(C[0] + r(5150) * 0.5, C[1] - r(5150) * 0.5, 196, 166, "graine|(solide)");
  b += tx(C[0] + r(2900), C[1] + 11, "2 900 km", "dg-tick") + tx(C[0], C[1] + 11, "6 370 km", "dg-tick", "start") + tx(C[0] + R, C[1] + 11, "0", "dg-tick") + tx(C[0] + R / 2, C[1] + 25, "profondeur", "dg-lbl-xs");
  return svg(W, 222, "La structure du globe (quart de sphère en coupe, épaisseurs à l’échelle) : une croûte très mince, le manteau jusqu’à 2 900 km de profondeur, puis le noyau, liquide dans sa partie externe et solide au centre.", b);
})();

const volcan = (() => {
  let b = rect(0, 150, W, 70, "dg-t-sand") + path("M20 150L120 52H180L280 150Z", "dg-t-grey");
  b += path("M138 214C126 208 124 194 140 190C156 186 176 192 172 206C168 216 150 218 138 214Z", "dg-magma") + path("M146 190V58H154V190Z", "dg-magma");
  b += path("M150 56C130 30 140 8 160 14C176 0 196 12 186 30C200 36 190 52 176 48", "dg-ash");
  b += path("M178 56C196 80 212 104 236 132", "dg-lava");
  b += lab(150, 205, 230, 202, "chambre|magmatique") + lab(150, 120, 230, 100, "cheminée") + lab(150, 56, 230, 66, "cratère") + lab(210, 100, 252, 132, "coulée|de lave") + lab(170, 24, 230, 20, "cendres et gaz") + lab(70, 120, 94, 36, "couches de laves|et de cendres");
  return svg(W, 222, "Un volcan en coupe (schéma) : le magma monte de la chambre magmatique par la cheminée jusqu’au cratère ; il sort en coulées de lave ou en projections de cendres.", b);
})();

const roches = (() => {
  const view = (cx: number, glass: boolean) => {
    let out = circ(cx, 84, 62, glass ? "dg-t-grey" : "dg-cell");
    if (glass) {
      for (let i = 0; i < 26; i++) {
        const a = i * 2.4;
        const d = 10 + ((i * 37) % 48);
        out += rect(cx + d * Math.cos(a) - 4, 84 + d * Math.sin(a) - 1.2, 8, 2.4, "dg-pt");
      }
      out += ell(cx + 18, 70, 9, 6, "dg-t-green") + ell(cx - 22, 100, 8, 5, "dg-t-green");
    } else {
      const crystals: [number, number, number, string][] = [[-30, -20, 18, "dg-t-pink"], [6, -34, 16, "dg-cell-hi"], [24, 6, 20, "dg-t-pink"], [-14, 24, 17, "dg-cell-hi"], [-36, 14, 10, "dg-pt"], [12, 38, 9, "dg-pt"], [36, -24, 10, "dg-pt"], [-8, -4, 12, "dg-t-violet"]];
      for (const [dx, dy, s, cls] of crystals) out += path(`M${cx + dx - s / 2} ${84 + dy}l${s / 2} ${-s / 2} ${s / 2} ${s / 2} ${-s / 2} ${s / 2}z`, cls);
    }
    return out;
  };
  let b = view(78, true) + view(222, false);
  b += tx(78, 162, "basalte (volcanique)", "dg-lbl-sm") + tx(78, 176, "petits cristaux et verre", "dg-lbl-xs") + tx(78, 188, "refroidi vite, en surface", "dg-lbl-xs");
  b += tx(222, 162, "granite (plutonique)", "dg-lbl-sm") + tx(222, 176, "grands cristaux jointifs", "dg-lbl-xs") + tx(222, 188, "refroidi lentement, en profondeur", "dg-lbl-xs");
  return svg(W, 196, "Basalte et granite vus au microscope (schéma) : le basalte, refroidi vite en surface, a de petits cristaux dans du verre ; le granite, refroidi lentement en profondeur, n’a que de grands cristaux.", b);
})();

// ── Physique-chimie ─────────────────────────────────────────────────────────

const eprouvette = (() => {
  let b = path("M50 20V190Q50 200 60 200H100Q110 200 110 190V20", "dg-glass") + path("M40 200H120", "dg-ink");
  for (let v = 0; v <= 100; v += 10) {
    const y = 190 - v * 1.6;
    b += ln(94, y, 110, y, "dg-ink-thin") + (v % 20 === 0 ? tx(116, y, v, "dg-tick", "start") : "");
  }
  // Liquide jusqu'à 62 mL, ménisque creux.
  const yl = 190 - 62 * 1.6;
  b += path(`M51 ${yl - 4}Q80 ${yl + 6} 109 ${yl - 4}V199H51Z`, "dg-water");
  b += ln(20, yl + 1, 160, yl + 1, "dg-dash") + path(`M14 ${yl + 1}m-8 -5h8l4 5-4 5h-8z`, "dg-eye-shape");
  b += tx(166, yl - 8, "lire en bas du ménisque,", "dg-lbl-xs", "start") + tx(166, yl + 5, "l’œil à sa hauteur :", "dg-lbl-xs", "start") + tx(166, yl + 19, "V = 62 mL", "dg-lbl-sm", "start");
  b += tx(80, 214, "mL", "dg-lbl-xs");
  return svg(W, 222, "Lecture d’une éprouvette graduée : l’œil est à la hauteur du liquide et on lit la graduation au bas du ménisque, ici 62 mL.", b);
})();

const dynamometre = (() => {
  let b = rect(130, 10, 40, 8, "dg-pt") + rect(140, 18, 20, 120, "dg-cell", 4);
  for (let n = 0; n <= 10; n++) b += ln(160, 26 + n * 10, 166, 26 + n * 10, "dg-ink-thin") + (n % 5 === 0 ? tx(172, 26 + n * 10, n, "dg-tick", "start") : "");
  b += path(`M150 22${"l-6 4 12 4 -12 4 12 4 -12 4 6 4".repeat(3)}`, "dg-ink-thin");
  b += ln(150, 76, 150, 150, "dg-ink") + ln(140, 76, 162, 76, "dg-red-line");
  b += rect(126, 150, 48, 34, "dg-t-grey", 3) + tx(150, 167, "500 g", "dg-lbl-sm");
  b += arrow(196, 167, 196, 210, "dg-vec", "dg-vec-head", 9) + tx(204, 196, "P", "dg-lbl-math", "start");
  b += tx(18, 90, "aiguille sur 5 N", "dg-lbl-xs", "start") + ln(100, 90, 138, 76, "dg-leader");
  b += tx(18, 200, "P = m × g = 0,5 × 10 = 5 N", "dg-lbl-sm", "start");
  return svg(W, 218, "Un dynamomètre mesure le poids : une masse de 500 g étire le ressort jusqu’à 5 N ; le poids P est vertical et dirigé vers le bas (P = m × g avec g ≈ 10 N/kg).", b);
})();

const circuits = (() => {
  // Série : pile en haut, interrupteur, deux lampes sur une seule boucle.
  let b = cell(74, 26, "h") + wire([56, 26], [20, 26], [20, 60]) + wire([20, 96], [20, 130], [40, 130]) + lamp(58, 130, "h") + wire([76, 130], [104, 130]) + lamp(122, 130, "h") + wire([140, 130], [140, 26], [92, 26]);
  b += switchK(20, 78, true, "v") + tx(30, 78, "K", "dg-lbl-math", "start");
  b += tx(80, 158, "en série : une seule boucle", "dg-lbl-xs");
  // Dérivation : pile, deux branches avec chacune une lampe.
  b += cell(226, 26, "h") + wire([208, 26], [170, 26], [170, 130], [282, 130], [282, 26], [244, 26]);
  b += wire([170, 78], [208, 78]) + lamp(226, 78, "h") + wire([244, 78], [282, 78]) + lamp(226, 130, "h");
  b += dot(170, 78, 3) + dot(282, 78, 3) + tx(226, 158, "en dérivation : deux branches", "dg-lbl-xs");
  return svg(W, 168, "Deux circuits avec une pile et deux lampes : en série, les lampes sont sur une seule boucle avec l’interrupteur ; en dérivation, chaque lampe est sur sa propre branche.", b);
})();

const ombre = (() => {
  const S: Pt = [20, 100];
  const top: Pt = [120, 70];
  const bot: Pt = [120, 130];
  const xs = 270;
  const hit = (p: Pt): Pt => [xs, S[1] + ((p[1] - S[1]) * (xs - S[0])) / (p[0] - S[0])];
  let b = path(`M${top[0]} ${top[1]}L${hit(top)[0]} ${hit(top)[1]}L${hit(bot)[0]} ${hit(bot)[1]}L${bot[0]} ${bot[1]}Z`, "dg-shadow");
  b += ray(S, hit(top), "dg-ray", 0.3) + ray(S, hit(bot), "dg-ray", 0.3);
  b += circ(S[0], S[1], 9, "dg-t-yellow") + rect(110, 70, 20, 60, "dg-t-grey", 10) + rect(xs, 20, 8, 160, "dg-cell");
  b += lab(S[0], S[1] - 9, 20, 30, "source") + lab(126, 76, 150, 40, "objet opaque") + lab(xs, 150, 230, 196, "ombre portée sur l’écran") + lab(200, 100, 200, 30, "cône d’ombre");
  return svg(W, 204, "Propagation rectiligne de la lumière : les rayons issus de la source, en ligne droite, frôlent l’objet opaque ; derrière lui, le cône d’ombre donne une ombre portée sur l’écran.", b);
})();

const eclipse = (() => {
  let b = circ(30, 70, 24, "dg-t-yellow") + tx(30, 112, "Soleil", "dg-lbl-xs");
  b += path("M30 46L270 62V78L30 94Z", "dg-ray-zone");
  b += circ(170, 70, 18, "dg-t-blue") + tx(170, 104, "Terre", "dg-lbl-xs");
  b += path("M170 52L280 66V74L170 88Z", "dg-shadow");
  b += circ(250, 70, 7, "dg-t-grey") + tx(250, 92, "Lune", "dg-lbl-xs");
  b += tx(150, 128, "éclipse de Lune : la Lune passe dans l’ombre de la Terre", "dg-lbl-xs");
  return svg(W, 138, "Éclipse de Lune (schéma, tailles et distances non respectées) : le Soleil, la Terre et la Lune sont alignés ; la Lune entre dans l’ombre de la Terre.", b);
})();

const reflexion = (() => {
  const I: Pt = [150, 150];
  const iDeg = 40;
  const t = (iDeg * Math.PI) / 180;
  const A: Pt = [I[0] - 120 * Math.sin(t), I[1] - 120 * Math.cos(t)];
  const B: Pt = [I[0] + 120 * Math.sin(t), I[1] - 120 * Math.cos(t)];
  let b = rect(30, 150, 240, 10, "dg-mirror") + ln(I[0], 20, I[0], 150, "dg-dash");
  b += ray(A, I) + ray(I, B);
  b += path(`M${I[0]} ${I[1] - 36}A36 36 0 0 0 ${I[0] - 36 * Math.sin(t)} ${I[1] - 36 * Math.cos(t)}`, "dg-arc") + path(`M${I[0]} ${I[1] - 46}A46 46 0 0 1 ${I[0] + 46 * Math.sin(t)} ${I[1] - 46 * Math.cos(t)}`, "dg-arc-2");
  b += tx(I[0] - 14, I[1] - 54, "i", "dg-lbl-math") + tx(I[0] + 16, I[1] - 62, "r", "dg-lbl-math") + tx(I[0] + 4, 14, "normale", "dg-lbl-xs", "start");
  b += tx(A[0], A[1] - 10, "rayon incident", "dg-lbl-xs") + tx(B[0], B[1] - 10, "rayon réfléchi", "dg-lbl-xs") + tx(150, 176, "miroir : i = r = 40°", "dg-lbl-sm");
  return svg(W, 186, "Réflexion sur un miroir plan : l’angle de réflexion r est égal à l’angle d’incidence i ; les angles se mesurent à partir de la normale.", b);
})();

/** Réfraction air → eau : sin i = 1,33 × sin r (indice de l'eau 1,33). */
const refraction = (() => {
  const I: Pt = [150, 100];
  const iDeg = 50;
  const rDeg = (Math.asin(Math.sin((iDeg * Math.PI) / 180) / 1.33) * 180) / Math.PI;
  const at = (deg: number, len: number, down: boolean): Pt => [I[0] + (down ? 1 : -1) * len * Math.sin((deg * Math.PI) / 180), I[1] + (down ? 1 : -1) * len * Math.cos((deg * Math.PI) / 180)];
  let b = rect(0, 100, W, 96, "dg-sea") + ln(0, 100, W, 100, "dg-ink") + ln(I[0], 10, I[0], 190, "dg-dash");
  b += ray(at(iDeg, 110, false), I) + ray(I, at(rDeg, 110, true));
  b += seg(I, at(iDeg, 90, true), "dg-dash-thin");
  b += path(`M${I[0]} ${I[1] - 34}A34 34 0 0 0 ${at(iDeg, 34, false)[0]} ${at(iDeg, 34, false)[1]}`, "dg-arc") + path(`M${I[0]} ${I[1] + 40}A40 40 0 0 0 ${at(rDeg, 40, true)[0]} ${at(rDeg, 40, true)[1]}`, "dg-arc-2");
  b += tx(I[0] - 16, I[1] - 46, "i = 50°", "dg-lbl-xs", "end") + tx(I[0] + 24, I[1] + 52, `r ≈ ${Math.round(rDeg)}°`, "dg-lbl-xs", "start");
  b += tx(10, 90, "air", "dg-lbl-sm", "start") + tx(10, 186, "eau", "dg-lbl-sm", "start") + tx(I[0] + 4, 14, "normale", "dg-lbl-xs", "start");
  b += tx(292, 186, "le rayon se rapproche de la normale", "dg-lbl-xs", "end");
  return svg(W, 196, `Réfraction de l’air dans l’eau : un rayon qui arrive avec un angle d’incidence de 50° continue dans l’eau avec un angle de réfraction d’environ ${Math.round(rDeg)}°, plus près de la normale (sin i = 1,33 × sin r).`, b);
})();

const separation = (() => {
  // Décantation : bécher avec dépôt.
  let b = path("M16 40V150Q16 158 24 158H84Q92 158 92 150V40", "dg-glass") + rect(18, 70, 72, 70, "dg-water") + rect(18, 140, 72, 16, "dg-t-sand");
  b += tx(54, 176, "1. décantation", "dg-lbl-xs") + lab(54, 148, 54, 24, "dépôt au fond");
  // Filtration : entonnoir, papier filtre, bécher, filtrat limpide.
  b += path("M150 40L250 40L210 96V130H190V96Z", "dg-glass") + path("M160 44L240 44L200 90Z", "dg-filter") + path("M170 52L230 52L200 82Z", "dg-t-sand");
  b += path("M180 120V156Q180 162 186 162H214Q220 162 220 156V120", "dg-glass") + rect(181, 140, 38, 20, "dg-water-clear");
  b += arrow(200, 132, 200, 140, "dg-blue-line", "dg-blue-fill", 6);
  b += lab(232, 46, 256, 22, "papier|filtre") + lab(214, 66, 256, 70, "résidu") + lab(214, 150, 252, 146, "filtrat|limpide");
  b += tx(200, 176, "2. filtration", "dg-lbl-xs");
  return svg(W, 186, "Séparer un solide d’un liquide : on laisse d’abord reposer (décantation), le solide tombe au fond ; puis on filtre : le papier filtre retient le résidu et laisse passer un filtrat limpide.", b);
})();

const distillation = (() => {
  // Ballon chauffé, thermomètre, réfrigérant à eau, erlenmeyer.
  let b = circ(60, 130, 34, "dg-glass") + path("M30 140Q60 174 90 140Z", "dg-water") + rect(52, 64, 16, 40, "dg-glass");
  b += path("M50 186H70L60 170Z", "dg-flame") + rect(40, 186, 40, 6, "dg-t-grey");
  b += ln(60, 40, 60, 100, "dg-ink") + circ(60, 100, 3, "dg-red-fill");
  b += path("M68 72L230 140", "dg-glass-tube") + path("M110 80L210 122L200 142L100 100Z", "dg-cooling");
  b += arrow(214, 150, 214, 132, "dg-blue-line", "dg-blue-fill", 6) + arrow(106, 72, 106, 54, "dg-blue-line", "dg-blue-fill", 6);
  b += path("M224 150L216 186H264L256 150Z", "dg-glass") + rect(218, 172, 44, 13, "dg-water-clear");
  b += lab(60, 46, 80, 26, "thermomètre") + lab(160, 104, 176, 70, "réfrigérant|(eau froide)") + lab(240, 178, 232, 206, "distillat") + lab(70, 146, 100, 178, "mélange|chauffé");
  b += tx(106, 48, "sortie d’eau", "dg-lbl-xs") + tx(222, 156, "entrée d’eau", "dg-lbl-xs", "end");
  return svg(W, 216, "Distillation : le mélange chauffé dans le ballon bout ; la vapeur se refroidit dans le réfrigérant, où circule de l’eau froide, et se condense ; on recueille le distillat.", b);
})();

/** Modèles moléculaires (conventions : H blanc, O rouge, C noir). */
const atom = (x: number, y: number, el: "H" | "O" | "C", r?: number) => {
  const size = r ?? (el === "H" ? 9 : 14);
  const cls = el === "H" ? "dg-atom-h" : el === "O" ? "dg-atom-o" : "dg-atom-c";
  return circ(x, y, size, cls) + tx(x, y + 0.5, el, el === "C" ? "dg-atom-label-light" : "dg-atom-label");
};

const molecules = (() => {
  let b = "";
  // Eau : angle d'environ 105°.
  b += atom(42, 50, "O") + atom(42 - 16 * Math.sin(0.92), 50 + 16 * Math.cos(0.92), "H") + atom(42 + 16 * Math.sin(0.92), 50 + 16 * Math.cos(0.92), "H");
  b += tx(42, 90, "eau", "dg-lbl-xs") + tx(42, 102, "H₂O", "dg-lbl-xs");
  b += atom(112, 54, "O") + atom(136, 54, "O") + tx(124, 90, "dioxygène", "dg-lbl-xs") + tx(124, 102, "O₂", "dg-lbl-xs");
  b += atom(198, 54, "O") + atom(222, 54, "C") + atom(246, 54, "O") + tx(222, 90, "dioxyde de carbone", "dg-lbl-xs") + tx(222, 102, "CO₂", "dg-lbl-xs");
  b += atom(150, 140, "C") + atom(150, 116, "H") + atom(128, 152, "H") + atom(172, 152, "H") + atom(150, 162, "H");
  b += tx(150, 186, "méthane CH₄", "dg-lbl-xs");
  return svg(W, 196, "Modèles de molécules : l’eau (2 atomes d’hydrogène et 1 d’oxygène), le dioxygène (2 atomes d’oxygène), le dioxyde de carbone (1 carbone et 2 oxygènes), le méthane (1 carbone et 4 hydrogènes).", b);
})();

const reaction = (() => {
  let b = atom(24, 40, "C") + tx(48, 40, "+", "dg-lbl") + atom(68, 40, "O") + atom(92, 40, "O") + arrow(112, 40, 150, 40, "dg-ink", "dg-pt", 8) + atom(178, 40, "O") + atom(202, 40, "C") + atom(226, 40, "O");
  b += tx(150, 70, "C + O₂ → CO₂ : 1 C et 2 O de chaque côté", "dg-lbl-xs");
  b += atom(20, 112, "H", 8) + atom(36, 112, "H", 8) + atom(20, 134, "H", 8) + atom(36, 134, "H", 8) + tx(56, 123, "+", "dg-lbl") + atom(76, 123, "O", 12) + atom(98, 123, "O", 12);
  b += arrow(118, 123, 150, 123, "dg-ink", "dg-pt", 8);
  b += atom(186, 112, "O", 12) + atom(172, 124, "H", 8) + atom(200, 124, "H", 8) + atom(242, 112, "O", 12) + atom(228, 124, "H", 8) + atom(256, 124, "H", 8);
  b += tx(150, 160, "2 H₂ + O₂ → 2 H₂O : 4 H et 2 O de chaque côté", "dg-lbl-xs");
  return svg(W, 172, "Réactions chimiques avec des modèles : les atomes se réarrangent sans disparaître. C + O₂ → CO₂ ; 2 H₂ + O₂ → 2 H₂O : il y a autant d’atomes de chaque sorte avant et après.", b);
})();

export const SCHEMAS_4E_SCIENCES: Record<string, string> = {
  "s4-digestif": digestif,
  "s4-villosite": villosite,
  "s4-sang": sang,
  "s4-coeur": coeur,
  "s4-double-circulation": doubleCirculation,
  "s4-app-feminin": feminin,
  "s4-app-masculin": masculin,
  "s4-grossesse": grossesse,
  "s4-caryotype": caryotype,
  "s4-seisme": seisme,
  "s4-globe": globe,
  "s4-volcan": volcan,
  "s4-roches": roches,
  "p4-eprouvette": eprouvette,
  "p4-dynamometre": dynamometre,
  "p4-circuits": circuits,
  "p4-ombre": ombre,
  "p4-eclipse": eclipse,
  "p4-reflexion": reflexion,
  "p4-refraction": refraction,
  "p4-separation": separation,
  "p4-distillation": distillation,
  "p4-molecules": molecules,
  "p4-reaction": reaction,
};

