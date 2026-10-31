import "server-only";

// CI : questions illustrées ajoutées aux séries de français et d'ESVS (environ 8 questions par
// chapitre), avec les dessins de la banque et les schémas des leçons. Elles complètent les
// questions de ci/exercises.ts sans les répéter.

import type { ExerciseSpec } from "../exercise-series";
import { ask, pc, scene, schemaFig, soundPick, syllableCount, tf } from "../illustrated-questions";

const GESTURES = schemaFig("ci-gestes", "Quatre gestes d’écriture : un trait, un rond, un pont et une boucle.");
const DAY = schemaFig("ci-journee", "Ma journée dans l’ordre : le matin, l’école, le repas, la nuit.");

export const EXTRA_CI: Record<string, ExerciseSpec[]> = {
  // ── Français ──
  "Bonjour l’école !": [
    ask("Qu’est-ce que tu emportes à l’école ?", [`*${pc("cartable", "mon cartable")}`, pc("lit", "mon lit"), pc("bol", "mon bol")], "le cartable porte les cahiers et les livres."),
    ask("La maîtresse montre ce dessin. Que fais-tu ?", ["*J’écoute.", "Je regarde.", "J’écris."], "l’oreille veut dire : on écoute.", scene(["oreille", "une oreille"])),
    ask("La maîtresse montre ce dessin. Que fais-tu ?", ["J’écoute.", "*Je regarde.", "Je lève la main."], "l’œil veut dire : on regarde.", scene(["oeil", "un œil"])),
    ask("Tu veux parler en classe. Que fais-tu ?", ["Je crie.", "Je sors.", "*Je lève la main."], "on lève la main et on attend son tour.", scene(["main", "une main levée"])),
  ],
  "Découvrir l’écrit": [
    syllableCount("moto", "une moto", "mo-to"),
    syllableCount("tomate", "une tomate", "to-ma-te"),
    syllableCount("lit", "un lit", "lit"),
    syllableCount("ananas", "un ananas", "a-na-nas"),
  ],
  "Les premiers gestes d’écriture": [
    ask("Avec quoi écris-tu dans ton cahier ?", [`*${pc("crayon", "le crayon")}`, pc("craie", "la craie"), pc("savon", "le savon")], "le crayon écrit sur le papier ; la craie, sur l’ardoise."),
    ask("Quel objet aide à tracer un trait bien droit ?", [`*${pc("regle", "la règle")}`, pc("fourchette", "la fourchette"), pc("bol", "le bol")], "on fait glisser le crayon le long de la règle."),
    ask("Regarde les gestes. Lequel tourne et se croise ?", ["le trait", "le rond", "le pont", "*la boucle"], "la boucle monte, tourne et se croise.", GESTURES),
    ask("Regarde les gestes. Lequel vient juste après le rond ?", ["le trait", "*le pont", "la boucle"], "dans l’ordre : le trait, le rond, le pont, la boucle.", GESTURES),
  ],
  "Les sons a, i et t": [
    soundPick("a", ["ananas", "ananas"], [["lit", "lit"], ["moto", "moto"]]),
    soundPick("i", ["lit", "lit"], [["sac", "sac"], ["moto", "moto"]]),
    ask("Quel mot commence par le son <strong>[t]</strong> ?", [`*${pc("tomate", "tomate")}`, pc("ballon", "ballon"), pc("lune", "lune")], "« to-ma-te » commence par [t]."),
    ask("Quel mot commence par le son <strong>[t]</strong> ?", [pc("ananas", "ananas"), `*${pc("table", "table")}`, pc("nid", "nid")], "« ta-ble » commence par [t]."),
  ],
  "Les sons o et l": [
    soundPick("o", ["radio", "radio"], [["lit", "lit"], ["nid", "nid"]]),
    soundPick("o", ["bol", "bol"], [["tasse", "tasse"], ["lune", "lune"]]),
    ask("Quel mot commence par le son <strong>[l]</strong> ?", [`*${pc("lit", "lit")}`, pc("moto", "moto"), pc("sac", "sac")], "« lit » commence par [l]."),
    ask("Quel mot commence par le son <strong>[l]</strong> ?", [pc("pomme", "pomme"), pc("tomate", "tomate"), `*${pc("lait", "lait")}`], "« lait » commence par [l]."),
  ],
  "Demander et donner un renseignement": [
    ask("Regarde. Où est Modou ?", ["*À l’école.", "À la maison.", "Au marché."], "Modou est devant l’école.", scene(["eleve-garcon", "Modou"], ["ecole", "l’école"])),
    ask("Comment Awa va-t-elle à l’école ?", ["*À vélo.", "En pirogue.", "À cheval."], "on voit un vélo : elle y va à vélo.", scene(["eleve-fille", "Awa"], ["velo", "un vélo"])),
    { num: "Regarde. Combien de livres y a-t-il ?", fig: scene(["livre", "trois livres"], ["livre", ""], ["livre", ""]), answer: 3, why: "On compte les livres : <strong>3</strong>." },
    ask("Regarde. Qui est-ce ?", ["*la maîtresse", "le bébé", "le boulanger"], "elle tient un livre devant la classe : c’est la maîtresse.", scene(["maitresse", "une maîtresse"])),
  ],
  "Les sons n et e": [
    soundPick("n", ["lune", "lune"], [["moto", "moto"], ["sac", "sac"]]),
    soundPick("n", ["ane", "âne"], [["pomme", "pomme"], ["lit", "lit"]]),
    ask("Dans quel mot entends-tu le son <strong>[e]</strong>, comme dans « le » ?", [`*${pc("cheval", "cheval")}`, pc("bol", "bol"), pc("sac", "sac")], "« che-val » : on entend [e] comme dans « le »."),
    ask("Dans quel mot entends-tu le son <strong>[e]</strong>, comme dans « le » ?", [pc("radio", "radio"), `*${pc("chemise", "chemise")}`, pc("moto", "moto")], "« che-mi-se » : on entend [e] comme dans « le »."),
  ],
  "Les sons p, d, m et b": [
    soundPick("p", ["poule", "poule"], [["ballon", "ballon"], ["mangue", "mangue"]]),
    soundPick("d", ["de", "dé"], [["pomme", "pomme"], ["lune", "lune"]]),
    soundPick("m", ["moto", "moto"], [["ballon", "ballon"], ["poule", "poule"]]),
    soundPick("b", ["banane", "banane"], [["tomate", "tomate"], ["lit", "lit"]]),
  ],
  "Dire ce que je ressens et ce que j’aime": [
    ask("Awa a très soif. Que dit-elle ?", ["*J’ai soif, je voudrais de l’eau.", "J’ai sommeil.", "J’ai froid."], "quand on a soif, on demande à boire.", scene(["verre-eau", "un verre d’eau"])),
    ask("Modou bâille, il veut dormir. Il dit :", ["*J’ai sommeil.", "J’ai faim.", "J’ai chaud."], "quand on veut dormir, on a sommeil.", scene(["lit", "un lit"])),
    ask("Le soleil tape très fort. Tu dis :", ["*J’ai chaud.", "J’ai froid.", "J’ai sommeil."], "sous un soleil fort, on a chaud.", scene(["soleil", "le soleil"])),
    ask("Tu n’aimes pas le lait. Tu dis poliment :", ["*Non merci, je n’aime pas le lait.", "Ton lait est mauvais !", "Je veux du lait."], "on peut dire ce qu’on n’aime pas, poliment.", scene(["lait", "du lait"])),
  ],
  "Les sons f, u et ou": [
    soundPick("f", ["fleur", "fleur"], [["tomate", "tomate"], ["lune", "lune"]]),
    soundPick("u", ["tortue", "tortue"], [["poule", "poule"], ["moto", "moto"]]),
    soundPick("ou", ["roue", "roue"], [["lune", "lune"], ["lit", "lit"]]),
    soundPick("ou", ["mouton", "mouton"], [["moto", "moto"], ["tasse", "tasse"]]),
  ],
  "Les sons é et è": [
    soundPick("é", ["cle", "clé"], [["lune", "lune"], ["bol", "bol"]]),
    soundPick("é", ["velo", "vélo"], [["regle", "règle"], ["sac", "sac"]]),
    soundPick("è", ["chevre", "chèvre"], [["velo", "vélo"], ["moto", "moto"]]),
    soundPick("è", ["regle", "règle"], [["cle", "clé"], ["lit", "lit"]]),
  ],
  "Les sons s, r, au et on": [
    soundPick("s", ["savon", "savon"], [["moto", "moto"], ["lune", "lune"]]),
    soundPick("r", ["robe", "robe"], [["pomme", "pomme"], ["lit", "lit"]]),
    soundPick("on", ["ballon", "ballon"], [["moto", "moto"], ["lune", "lune"]]),
    ask("Dans quel mot vois-tu les lettres « eau », qui se lisent [o] ?", [`*${pc("seau", "seau")}`, pc("lit", "lit"), pc("pain", "pain")], "« s-eau » : les lettres « eau » se lisent [o]."),
  ],
  "Demander la permission ou un service": [
    ask("Tu veux la règle de ton ami. Tu dis :", ["*Peux-tu me prêter ta règle, s’il te plaît ?", "Donne ta règle !", "Ta règle est à moi."], "on demande un service avec « s’il te plaît ».", scene(["regle", "une règle"])),
    ask("Tu as soif. Que demandes-tu à maman ?", ["*Maman, je peux avoir de l’eau, s’il te plaît ?", "De l’eau !", "Je ne veux rien."], "on demande poliment, même à la maison.", scene(["maman", "maman"], ["verre-eau", "un verre d’eau"])),
    ask("Tu veux jouer avec le ballon de Modou. Tu dis :", ["*Modou, je peux jouer avec ton ballon ?", "Je prends ton ballon.", "Ton ballon est nul."], "on demande la permission avant de prendre.", scene(["eleve-garcon", "Modou"], ["ballon", "un ballon"])),
    tf("On demande la permission avant de prendre l’objet d’un camarade.", true, "l’objet est à lui : on lui demande d’abord."),
  ],
  "Mes premières lettres attachées": [
    ask("Quel mot commence par une lettre ronde ?", [`*${pc("cle", "clé")}`, pc("lit", "lit"), pc("table", "table")], "le c de « clé » se trace en tournant : c’est une lettre ronde."),
    ask("Quelle lettre monte et fait une boucle ?", ["*l", "o", "c"], "le l monte haut et fait une boucle."),
    { num: "Regarde les gestes d’écriture. Combien y en a-t-il ?", fig: GESTURES, answer: 4, why: "Un trait, un rond, un pont et une boucle : <strong>4</strong> gestes." },
    ask("Pour écrire la lettre n, on trace…", ["*des ponts", "un rond", "une boucle"], "le n est fait de ponts.", GESTURES),
  ],
  "J’écris mes premières phrases": [
    ask("Quelle phrase va avec le dessin ?", ["*Le chat boit du lait.", "La vache mange.", "Le poisson nage."], "on voit un chat et du lait.", scene(["chat", "un chat"], ["lait", "du lait"])),
    ask("Quelle phrase va avec le dessin ?", ["Le chat dort.", "*Le poisson nage.", "La poule court."], "on voit un poisson.", scene(["poisson", "un poisson"])),
    ask("Quelle phrase va avec le dessin ?", ["Awa mange une mangue.", "*Awa lit un livre.", "Awa dort."], "on voit Awa et un livre.", scene(["eleve-fille", "Awa"], ["livre", "un livre"])),
    ask("Remets les mots dans l’ordre : boit / Modou / de l’eau", ["*Modou boit de l’eau.", "Boit de l’eau Modou.", "De l’eau Modou boit."], "on dit d’abord qui fait l’action.", scene(["eleve-garcon", "Modou"], ["verre-eau", "un verre d’eau"])),
  ],
  // ── ESVS ──
  "Histoire : ma journée et le temps qui passe": [
    ask("Qu’est-ce qui vient après le repas ?", ["*la nuit", "le matin", "l’école"], "dans l’ordre : le matin, l’école, le repas, puis la nuit.", DAY),
    ask("Qu’est-ce qui vient juste avant l’école ?", ["*le matin", "le repas", "la nuit"], "le matin, on se prépare, puis on va à l’école.", DAY),
    ask("Quand dort-on ?", ["*la nuit", "à midi", "pendant la classe"], "on dort la nuit, quand il fait noir.", scene(["lit", "un lit"], ["lune", "la lune"])),
    tf("Je me brosse les dents chaque jour : c’est une habitude.", true, "ce que l’on fait chaque jour est une habitude.", scene(["brosse-a-dents", "une brosse à dents"])),
  ],
  "Histoire : mesurer une durée": [
    ask("Qu’est-ce qui dure le moins longtemps ?", [`*${pc("verre-eau", "boire un verre d’eau")}`, pc("ecole", "une journée de classe"), pc("lit", "une nuit de sommeil")], "boire un verre d’eau prend quelques secondes."),
    ask("Qu’est-ce qui dure le plus longtemps ?", [`*${pc("arbre", "faire pousser un arbre")}`, pc("mangue", "manger une mangue")], "un arbre met des années à pousser."),
    ask("Le soleil se couche. C’est…", ["*le soir", "le matin", "midi"], "le soleil se couche le soir.", schemaFig("ci-soleil-journee", "Le soleil le matin, à midi et le soir.")),
    tf("On peut compter « 1, 2, 3… » pour mesurer une courte durée.", true, "compter régulièrement mesure le temps qui passe."),
  ],
  "Géographie : se repérer autour de soi": [
    ask("Le côté de la Terre éclairé par le soleil a…", ["*le jour", "la nuit"], "là où le soleil éclaire, il fait jour.", schemaFig("ci-jour-nuit", "Le soleil éclaire la Terre : le jour d’un côté, la nuit de l’autre.")),
    ask("Où achète-t-on le pain du quartier ?", [`*${pc("boutique", "à la boutique")}`, pc("arbre", "sous l’arbre"), pc("ecole", "à l’école")], "on achète le pain à la boutique."),
    ask("Où arrive le chemin rouge ?", ["*à l’école", "à la maison", "au marché"], "le chemin finit sur la case de l’école.", schemaFig("ci-itineraire", "Un chemin rouge sur un quadrillage, jusqu’à l’école.")),
    ask("Quel ballon est le plus près du garçon ?", ["*le ballon A", "le ballon B"], "son pointillé jusqu’au garçon est le plus court.", schemaFig("ci-pres-loin", "Un garçon et deux ballons, A et B.")),
  ],
  "Géographie : mon milieu": [
    ask("Qu’est-ce qui est fabriqué par l’homme ?", [`*${pc("velo", "le vélo")}`, pc("arbre", "l’arbre"), pc("caillou", "le caillou")], "le vélo est fabriqué dans un atelier."),
    ask("Au bord de la mer, les pêcheurs partent en…", [`*${pc("pirogue", "pirogue")}`, pc("velo", "vélo"), pc("cheval", "cheval")], "la pirogue va sur la mer."),
    ask("Qu’y a-t-il à gauche du ballon ?", ["*la mangue", "le cahier"], "sur l’étagère, la mangue est à gauche du ballon.", schemaFig("ci-rangee", "Une mangue, un ballon et un cahier sur une étagère.")),
    ask("Où est le ballon ?", ["*sous la table", "sur la table"], "le ballon est sous la table, la pastèque dessus.", schemaFig("ci-sur-sous", "Une pastèque sur une table et un ballon sous la table.")),
  ],
  "Sciences : le monde qui m’entoure": [
    ask("Lequel est un être vivant ?", [`*${pc("oiseau", "l’oiseau")}`, pc("caillou", "le caillou"), pc("ballon", "le ballon")], "l’oiseau naît, mange, grandit : il est vivant."),
    ask("Qu’est-ce qui pousse dans la terre ?", [`*${pc("fleur", "la fleur")}`, pc("chat", "le chat"), pc("savon", "le savon")], "la fleur est une plante : elle pousse dans la terre."),
    ask("Quel animal pond des œufs ?", [`*${pc("poule", "la poule")}`, pc("chat", "le chat"), pc("chien", "le chien")], "la poule pond des œufs."),
    ask("Quel animal vit dans l’eau ?", [`*${pc("poisson", "le poisson")}`, pc("mouton", "le mouton"), pc("ane", "l’âne")], "le poisson nage dans l’eau."),
  ],
  "Sciences : la matière et la croissance": [
    ask("Lequel coule comme l’eau ?", [`*${pc("lait", "le lait")}`, pc("pain", "le pain"), pc("cle", "la clé")], "le lait coule : c’est un liquide."),
    ask("Lequel garde toujours sa forme ?", [`*${pc("cle", "la clé")}`, pc("lait", "le lait"), pc("verre-eau", "l’eau")], "la clé ne coule pas : c’est un solide."),
    ask("Qu’y a-t-il dans le ballon gonflé ?", ["*de l’air", "de l’eau", "du sable"], "on souffle de l’air dedans : l’air est un gaz.", scene(["ballon-baudruche", "un ballon gonflé"])),
    ask("Dans l’ordre, le bébé devient…", ["*un enfant, puis un adulte", "un adulte, puis un enfant"], "on grandit : bébé, enfant, adulte.", scene(["bebe", "un bébé"], ["eleve-garcon", "un enfant"], ["papa", "un adulte"])),
  ],
  "Vivre dans son milieu : santé et hygiène": [
    ask("Où les moustiques pondent-ils leurs œufs ?", ["*dans l’eau qui ne coule pas", "dans le sable sec", "dans le feu"], "on vide les eaux stagnantes pour avoir moins de moustiques.", scene(["moustique", "un moustique"])),
    ask("Avec quoi te brosses-tu les dents ?", [`*${pc("brosse-a-dents", "la brosse à dents")}`, pc("fourchette", "la fourchette"), pc("regle", "la règle")], "on se brosse les dents après les repas."),
    ask("Quelle mangue peux-tu manger, après l’avoir lavée ?", [`*${pc("mangue", "la mangue fraîche")}`, pc("mangue-abimee", "la mangue abîmée")], "un fruit abîmé peut rendre malade."),
    tf("On peut boire l’eau sale d’une flaque.", false, "l’eau sale contient des microbes : on boit de l’eau propre.", scene(["verre-eau", "un verre d’eau propre"])),
  ],
  "Vivre dans son milieu : protéger l’environnement": [
    ask("La poubelle de la maison est pleine. Où la vides-tu ?", ["*au point de ramassage des ordures", "dans la rue", "dans la mer"], "les ordures sont ramassées et emportées loin des maisons.", scene(["poubelle", "une poubelle"])),
    ask("Qu’est-ce qui salit la plage et la mer ?", ["*les sachets en plastique jetés par terre", "les poissons", "les coquillages"], "le plastique jeté finit dans la mer et tue les animaux."),
    ask("Que nous donne l’arbre ?", ["*de l’ombre et des fruits", "de la fumée", "du bruit"], "l’arbre est utile : on le protège.", scene(["arbre", "un arbre"])),
    ask("De quoi la poule a-t-elle besoin ?", ["*d’eau et de nourriture", "de rien", "d’un ballon"], "les animaux ont besoin de boire et de manger.", scene(["poule", "une poule"])),
  ],
  "Vivre ensemble : bien se conduire": [
    ask("Un adulte te parle. Que fais-tu ?", ["*J’écoute sans couper la parole.", "Je crie plus fort.", "Je pars."], "écouter quelqu’un, c’est le respecter.", scene(["papa", "un adulte"], ["oreille", "une oreille"])),
    ask("Pour arriver à l’heure, tu prépares ton cartable…", ["*la veille", "en retard", "jamais"], "préparé la veille, on part sans perdre de temps.", scene(["cartable", "un cartable"])),
    ask("Tu trouves un crayon qui n’est pas à toi. Tu…", ["*le donnes à la maîtresse", "le gardes", "le jettes"], "on rend ce qui ne nous appartient pas : c’est être honnête.", scene(["crayon", "un crayon"])),
    ask("Ton camarade a oublié son livre. Tu…", ["*partages le tien", "te moques de lui", "caches le tien"], "on aide un camarade : c’est être serviable.", scene(["livre", "un livre"])),
  ],
  "Vivre ensemble : moi et les autres": [
    ask("Comment appelle-t-on ce groupe ?", ["*la famille", "la classe", "l’équipe"], "papa, maman et les enfants forment une famille.", scene(["papa", "papa"], ["maman", "maman"], ["eleve-fille", "une fille"], ["bebe", "un bébé"])),
    ask("Des enfants qui jouent au football ensemble forment…", ["*une équipe", "une famille", "un village"], "ils jouent ensemble : c’est une équipe.", scene(["ballon", "un ballon"])),
    ask("Dans ta classe, qui vous apprend à lire ?", ["*la maîtresse", "le bébé", "le boutiquier"], "la maîtresse fait la classe.", scene(["maitresse", "la maîtresse"])),
    ask("Modou porte le seau d’eau de sa grand-mère. Il est…", ["*serviable", "paresseux", "méchant"], "il aide une personne âgée : il est serviable.", scene(["eleve-garcon", "Modou"], ["seau", "un seau"])),
  ],
};
