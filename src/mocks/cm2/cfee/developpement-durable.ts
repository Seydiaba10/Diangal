import "server-only";

// CFEE blanc DIANGAL, éducation au développement durable (60 min, 40 points). Épreuve unique du guide
// pratique du CFEE : ressources 24 points (vivre dans son milieu 12, vivre ensemble 12) et compétence
// 16 points, une situation d'intégration sur « vivre dans son milieu ». Les faits suivent les leçons de
// CM2 de DIANGAL (cm2/esvs.ts).

import type { MockExamSpec } from "../../exercise-series";
import { head, reading } from "./helpers";

const MILIEU = head("Vivre dans son milieu", 12);
const ENSEMBLE = head("Vivre ensemble", 12);
const DEGRADATION = "La dégradation du milieu et des ressources";
const ALIMENTATION = "Alimentation, santé et carences nutritionnelles";
const SYMBOLES = "Les symboles de la République";
const INSTITUTIONS = "Les institutions de la République";
const COMMUNAUTE = "Vivre en communauté";

type Part = MockExamSpec["parts"][number];

const spec = (n: number, parts: Part[], chapter: string, situation: string, questions: Part["questions"]): MockExamSpec => ({
  id: `cfee-blanc-${n}-6-developpement-durable`,
  subject: "ESVS",
  title: `CFEE blanc DIANGAL n°${n} : éducation au développement durable`,
  durationMin: 60,
  parts: [
    ...parts,
    {
      chapter,
      stem: `${head("Contrôle de la compétence", 16, "Réponds aux questions qui suivent ce contexte.")}${situation}`,
      questions: questions.map((q) => ({ ...q, pts: 4 })),
    },
  ],
});

export const DEVELOPPEMENT_DURABLE: MockExamSpec[] = [
  spec(
    1,
    [
      {
        chapter: DEGRADATION,
        stem: MILIEU,
        questions: [
          { qcm: "Quelle activité est une cause de la déforestation ?", choices: ["*La coupe du bois pour faire du charbon", "L’arrosage des arbres", "La plantation de filaos", "La pêche en mer"], why: "La coupe du bois, le charbon de bois et le défrichement font reculer la forêt." },
          { qcm: "Reboiser, c’est :", choices: ["*planter des arbres là où il n’y en a plus", "couper de vieux arbres", "brûler les herbes sèches", "construire une route"], why: "Reboiser, c’est replanter des arbres, par exemple lors de la Journée nationale de l’arbre." },
          { qcm: "Pourquoi les sachets plastiques sont-ils dangereux dans la nature ?", choices: ["*Ils polluent et peuvent tuer des animaux.", "Ils font pousser les arbres.", "Ils nettoient les rues.", "Ils nourrissent le bétail."], why: "Les sachets ne disparaissent pas vite ; les animaux qui les avalent peuvent en mourir." },
        ],
      },
      {
        chapter: ALIMENTATION,
        stem: MILIEU,
        questions: [
          { qcm: "Quels aliments donnent surtout de l’énergie ?", choices: ["*Le mil et le riz", "La mangue et l’orange", "Le poisson et les œufs", "Le sel et l’eau"], why: "Le mil, le riz, le maïs, le manioc, l’huile et le sucre sont des aliments énergétiques." },
          { qcm: "Quelle maladie est due à un manque de protéines ?", choices: ["*Le kwashiorkor", "Le goitre", "Le scorbut", "L’anémie"], why: "L’enfant atteint de kwashiorkor a le ventre gonflé et les cheveux décolorés. Il a besoin de poisson, de lait, d’œufs, de niébé." },
          { qcm: "Quel aliment apporte de la vitamine A, utile pour la vue ?", choices: ["*La mangue", "Le sel iodé", "Le sucre", "Le riz blanc"], why: "La mangue, la carotte et l’huile de palme rouge apportent de la vitamine A : son manque cause des troubles de la vue." },
        ],
      },
      {
        chapter: SYMBOLES,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Quelles sont les couleurs du drapeau du Sénégal, dans l’ordre ?", choices: ["*Vert, or, rouge", "Rouge, or, vert", "Vert, blanc, rouge", "Bleu, or, rouge"], why: "Trois bandes verticales égales : vert, or, rouge, avec une étoile verte au centre de la bande or." },
          { qcm: "Quelle est la devise du Sénégal ?", choices: ["*Un Peuple – Un But – Une Foi", "Liberté – Égalité – Fraternité", "Travail – Paix – Patrie", "Union – Travail – Progrès"], why: "La devise du Sénégal est « Un Peuple – Un But – Une Foi »." },
        ],
      },
      {
        chapter: INSTITUTIONS,
        stem: ENSEMBLE,
        questions: [
          { num: "Pour combien d’années le président de la République est-il élu ?", answer: 5, why: "Le président de la République est élu au suffrage universel direct pour 5 ans." },
          { qcm: "Qui vote les lois au Sénégal ?", choices: ["*Les députés de l’Assemblée nationale", "Les ministres", "Les juges", "Les maires"], why: "Les députés votent les lois et le budget, et contrôlent l’action du Gouvernement." },
        ],
      },
      {
        chapter: COMMUNAUTE,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Jusqu’à quel âge la Convention internationale des droits de l’enfant protège-t-elle les enfants ?", choices: ["*Moins de 18 ans", "Moins de 10 ans", "Moins de 12 ans", "Moins de 25 ans"], why: "La Convention de 1989, ratifiée par le Sénégal, protège tous les enfants de moins de 18 ans." },
          { qcm: "Que signifie le sigle ASC dans un quartier ?", choices: ["*Association sportive et culturelle", "Assemblée du Sénégal central", "Aide scolaire communale", "Atelier de soudure et de construction"], why: "L’ASC réunit les jeunes du quartier autour du sport et de la culture." },
        ],
      },
    ],
    DEGRADATION,
    reading(
      "<strong>Contexte.</strong> Près de Kolda, un chasseur a laissé un feu mal éteint en brousse. Le vent s’est levé et le feu a brûlé plusieurs hectares de savane, des arbres et une partie des récoltes. Les habitants veulent éviter que cela recommence. Ils te demandent de les aider à préparer une réunion du village.",
    ),
    [
      { qcm: "Quelle est la cause de ce feu de brousse ?", choices: ["*L’imprudence du chasseur", "Le passage d’un camion", "La pluie", "La pêche"], why: "Le feu vient d’un feu mal éteint : c’est une imprudence, une cause fréquente des feux de brousse." },
      { qcm: "Quelle conséquence ce feu peut-il avoir sur les familles du village ?", choices: ["*Moins de récoltes et de pâturages", "Plus de poissons dans le fleuve", "Plus d’arbres fruitiers", "Moins de vent"], why: "Le feu détruit la végétation et les récoltes : les familles et le bétail manquent de nourriture." },
      { qcm: "Quel aménagement aide à arrêter un feu de brousse ?", choices: ["*Un pare-feu", "Une diguette", "Un foyer amélioré", "Un filet de pêche"], why: "Un pare-feu est une bande de terre sans herbe : le feu ne peut pas la traverser." },
      { self: "Sur ta feuille, écris trois règles que le village peut adopter pour éviter les feux de brousse. Compare ensuite avec le corrigé.", why: "<p>Trois règles possibles :</p><ul><li>ne jamais allumer de feu en brousse et bien éteindre tout feu ;</li><li>faire des pare-feu autour des champs et du village ;</li><li>prévenir tout le monde dès qu’un feu commence, et replanter les arbres brûlés.</li></ul><p>Compte ta réponse comme réussie si tu as écrit trois règles justes.</p>" },
    ],
  ),
  spec(
    2,
    [
      {
        chapter: DEGRADATION,
        stem: MILIEU,
        questions: [
          { qcm: "Quelle est une conséquence des feux de brousse ?", choices: ["*La destruction de la végétation et des récoltes", "L’augmentation des pluies", "La naissance de nouveaux arbres", "La protection des animaux"], why: "Les feux détruisent la végétation et les récoltes, et font fuir ou tuent les animaux." },
          { qcm: "À quoi sert un foyer amélioré ?", choices: ["*À consommer moins de bois", "À attraper des poissons", "À fabriquer des sachets", "À creuser un puits"], why: "Un foyer amélioré cuit les aliments avec moins de bois : il protège donc la forêt." },
          { qcm: "Pourquoi respecte-t-on un repos biologique pour la pêche ?", choices: ["*Pour laisser les poissons se reproduire", "Pour réparer les routes", "Pour laisser dormir les pêcheurs", "Pour vendre plus de sachets"], why: "Sans repos biologique, le poisson devient rare : c’est la surpêche." },
        ],
      },
      {
        chapter: ALIMENTATION,
        stem: MILIEU,
        questions: [
          { qcm: "Quel groupe d’aliments fait grandir et répare le corps ?", choices: ["*Les aliments de construction", "Les aliments énergétiques", "Les aliments de protection", "Aucun aliment"], why: "Le poisson, la viande, les œufs, le lait, le niébé et l’arachide sont des aliments de construction." },
          { qcm: "Quel produit prévient le goitre, un gonflement du cou ?", choices: ["*Le sel iodé", "Le sucre", "Le café", "L’huile"], why: "Le goitre est dû à un manque d’iode. Le sel iodé permet de l’éviter." },
          { qcm: "Quels sont les signes de l’anémie, due à un manque de fer ?", choices: ["*La fatigue et la pâleur", "Le ventre gonflé et les cheveux décolorés", "Le gonflement du cou", "Le saignement des gencives"], why: "L’anémie donne de la fatigue et de la pâleur. Les feuilles vertes, la viande et le foie apportent du fer." },
        ],
      },
      {
        chapter: SYMBOLES,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Comment s’appelle l’hymne national du Sénégal ?", choices: ["*Le Lion rouge", "La Marseillaise", "Le Baobab vert", "L’Étoile d’or"], why: "L’hymne national est « Le Lion rouge », dont Léopold Sédar Senghor a écrit les paroles." },
          { qcm: "Que trouve-t-on notamment sur les armoiries du Sénégal ?", choices: ["*Un lion et un baobab", "Un aigle et un palmier", "Un éléphant et un fleuve", "Un coq et un chêne"], why: "Les armoiries du Sénégal portent notamment un lion et un baobab." },
        ],
      },
      {
        chapter: INSTITUTIONS,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Qui nomme le Premier ministre ?", choices: ["*Le président de la République", "Les députés", "Les juges", "Le maire de Dakar"], why: "Le président de la République nomme le Premier ministre, qui dirige le Gouvernement avec les ministres." },
          { qcm: "Comment appelle-t-on la loi fondamentale du pays ?", choices: ["*La Constitution", "Le budget", "Le règlement intérieur", "La devise"], why: "La Constitution organise les pouvoirs et garantit les droits et les libertés des citoyens." },
        ],
      },
      {
        chapter: COMMUNAUTE,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Lequel de ces droits appartient à tous les enfants ?", choices: ["*Aller à l’école", "Conduire une voiture", "Voter aux élections", "Travailler la nuit"], why: "Tout enfant a le droit d’être nourri, soigné, logé, d’aller à l’école et d’être protégé." },
          { qcm: "Quelle ville accueille en 2026 les Jeux olympiques de la jeunesse ?", choices: ["*Dakar", "Thiès", "Paris", "Le Caire"], why: "Dakar accueille en 2026 les Jeux olympiques de la jeunesse : ce sont les premiers organisés en Afrique." },
        ],
      },
    ],
    DEGRADATION,
    reading(
      "<strong>Contexte.</strong> Autour du marché de ton quartier, les sachets plastiques et les ordures s’accumulent. L’eau de pluie stagne dans les caniveaux bouchés, les moustiques se multiplient et une chèvre est morte après avoir avalé des sachets. L’association des jeunes veut agir.",
    ),
    [
      { qcm: "Quel est le lien entre les ordures et les moustiques ?", choices: ["*Les caniveaux bouchés gardent l’eau où pondent les moustiques.", "Les moustiques mangent les sachets.", "Les ordures chassent les moustiques.", "Il n’y a aucun lien."], why: "Les moustiques pondent dans l’eau qui stagne. Déboucher les caniveaux limite leur nombre, et donc le paludisme." },
      { qcm: "Pourquoi la chèvre est-elle morte ?", choices: ["*Elle a avalé des sachets plastiques.", "Elle a bu de l’eau potable.", "Elle a mangé trop d’herbe.", "Elle a eu trop de soins."], why: "Le plastique ne se digère pas : il bloque l’appareil digestif de l’animal." },
      { qcm: "Quelle action réduit le plus les déchets à la source ?", choices: ["*Utiliser un panier au lieu des sachets", "Brûler les sachets dans la rue", "Jeter les ordures dans le caniveau", "Enterrer les sachets dans le champ"], why: "Réduire, c’est produire moins de déchets. Brûler du plastique donne en plus une fumée dangereuse." },
      { self: "Sur ta feuille, écris un petit plan d’action de trois étapes pour l’association des jeunes. Compare ensuite avec le corrigé.", why: "<p>Un plan possible :</p><ul><li>organiser un set-setal pour ramasser les ordures et déboucher les caniveaux ;</li><li>installer des poubelles et trier les déchets avec les vendeurs du marché ;</li><li>expliquer aux habitants qu’il faut utiliser des paniers et ne plus jeter de sachets.</li></ul><p>Compte ta réponse comme réussie si tes trois étapes sont réalistes et répondent au problème.</p>" },
    ],
  ),
  spec(
    3,
    [
      {
        chapter: DEGRADATION,
        stem: MILIEU,
        questions: [
          { qcm: "Qu’est-ce qui provoque l’érosion des sols ?", choices: ["*Le vent et le ruissellement sur des sols nus", "La plantation d’arbres", "Le repos biologique", "Les foyers améliorés"], why: "Sans végétation, le vent et l’eau emportent la terre : on perd des terres cultivables." },
          { qcm: "Dans les Niayes, on fixe les dunes en plantant :", choices: ["*des filaos", "du riz", "du coton", "des tomates"], why: "Les filaos retiennent le sable et protègent les cultures de légumes." },
          { qcm: "Que peut-on faire pour moins de déchets ?", choices: ["*Réduire, trier et recycler", "Tout jeter dans la rue", "Brûler tout le plastique", "Boucher les caniveaux"], why: "Réduire, trier et recycler les déchets limite la pollution." },
        ],
      },
      {
        chapter: ALIMENTATION,
        stem: MILIEU,
        questions: [
          { qcm: "À quoi servent les aliments de protection, comme les fruits et les légumes ?", choices: ["*À protéger contre les maladies", "À remplacer l’eau", "À donner seulement de l’énergie", "À faire pousser les cheveux"], why: "Les fruits (mangue, orange, pain de singe), les légumes et les feuilles protègent contre les maladies." },
          { qcm: "Quelle maladie est due au manque de vitamine C ?", choices: ["*Le scorbut", "Le goitre", "Le kwashiorkor", "Le marasme"], why: "Le scorbut fait saigner les gencives. Les agrumes, le bissap et le pain de singe apportent de la vitamine C." },
          { qcm: "Un enfant très maigre, qui manque de tous les aliments, souffre :", choices: ["*de marasme", "de goitre", "de scorbut", "de cécité nocturne"], why: "Le marasme vient d’un manque de nourriture en général : il faut des repas suffisants et variés." },
        ],
      },
      {
        chapter: SYMBOLES,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Où se trouve l’étoile sur le drapeau du Sénégal ?", choices: ["*Au centre de la bande or", "Dans la bande verte", "Dans la bande rouge", "Il n’y a pas d’étoile"], why: "L’étoile verte à cinq branches se trouve au centre de la bande or." },
          { qcm: "Quelle attitude adopte-t-on quand on chante l’hymne national ?", choices: ["*On se lève et on se tient droit.", "On reste assis et on parle.", "On joue au ballon.", "On tourne le dos au drapeau."], why: "On respecte les symboles de la République : on se lève et on se tient droit." },
        ],
      },
      {
        chapter: INSTITUTIONS,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Quel est le rôle du Conseil constitutionnel ?", choices: ["*Vérifier que les lois respectent la Constitution", "Soigner les malades", "Voter le budget", "Construire les routes"], why: "Il vérifie que les lois respectent la Constitution et proclame les résultats de l’élection présidentielle." },
          { qcm: "Quel pouvoir est exercé par les cours et les tribunaux ?", choices: ["*Le pouvoir judiciaire", "Le pouvoir exécutif", "Le pouvoir législatif", "Le pouvoir religieux"], why: "Le législatif fait les lois, l’exécutif les applique, le judiciaire juge. Cette séparation protège les citoyens." },
        ],
      },
      {
        chapter: COMMUNAUTE,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Lequel de ces comportements est un devoir de l’enfant ?", choices: ["*Respecter le règlement de l’école", "Empêcher les autres de jouer", "Abîmer le matériel", "Répondre mal aux adultes"], why: "L’enfant a aussi des devoirs : étudier, respecter ses parents, les autres et le règlement de l’école." },
          { qcm: "À quoi sert un groupement d’intérêt économique (GIE) ?", choices: ["*À mener ensemble une activité pour gagner de l’argent", "À juger les criminels", "À voter les lois", "À organiser les Jeux olympiques"], why: "Dans un GIE, plusieurs personnes s’associent pour une activité économique : ce qu’on ne peut pas faire seul, on le fait à plusieurs." },
        ],
      },
    ],
    ALIMENTATION,
    reading(
      "<strong>Contexte.</strong> Binta a 3 ans. Son ventre est gonflé, ses cheveux sont décolorés et elle est souvent malade. Sa famille lui donne presque uniquement de la bouillie de mil. Pourtant, il y a du niébé et des arachides au champ, et des œufs à la maison. L’agent de santé explique à sa mère ce qu’il faut changer.",
    ),
    [
      { qcm: "D’après ces signes, de quelle maladie Binta souffre-t-elle probablement ?", choices: ["*Du kwashiorkor", "Du goitre", "Du scorbut", "Du paludisme"], why: "Le ventre gonflé et les cheveux décolorés sont les signes du kwashiorkor, dû à un manque de protéines." },
      { qcm: "À quel groupe d’aliments appartient la bouillie de mil ?", choices: ["*Aux aliments énergétiques", "Aux aliments de construction", "Aux aliments de protection", "Aux médicaments"], why: "Le mil donne de l’énergie, mais il ne suffit pas pour construire le corps." },
      { qcm: "Quel aliment de sa maison la famille doit-elle ajouter pour apporter des protéines ?", choices: ["*Des œufs et du niébé", "Plus de bouillie de mil", "Du sucre", "De l’huile"], why: "Les œufs, le niébé, le poisson et le lait apportent des protéines : ce sont des aliments de construction." },
      { self: "Sur ta feuille, propose un repas équilibré pour Binta, avec des aliments des trois groupes. Compare ensuite avec le corrigé.", why: "<p>Un repas possible :</p><ul><li>aliment énergétique : de la bouillie de mil ou du riz ;</li><li>aliment de construction : du niébé, un œuf ou du poisson ;</li><li>aliment de protection : une mangue, une orange ou des feuilles vertes.</li></ul><p>N’oublie pas l’eau potable. Compte ta réponse comme réussie si ton repas contient les trois groupes.</p>" },
    ],
  ),
  spec(
    4,
    [
      {
        chapter: DEGRADATION,
        stem: MILIEU,
        questions: [
          { qcm: "Qu’est-ce qui cause la surpêche ?", choices: ["*Trop de pirogues et de chalutiers, et des filets interdits", "Le manque de poissons dans les marchés", "Le reboisement", "Les pluies abondantes"], why: "Trop de bateaux et des filets interdits prennent les poissons plus vite qu’ils ne se reproduisent." },
          { qcm: "À quoi sert un pare-feu ?", choices: ["*À empêcher un feu de brousse de s’étendre", "À éclairer le village", "À allumer les foyers", "À fixer les dunes"], why: "C’est une bande de terre sans herbe : le feu s’arrête, faute de quoi brûler." },
          { qcm: "Quel est le but de la Grande Muraille verte ?", choices: ["*Reboiser pour freiner le désert", "Construire un mur en pierre", "Protéger le port de Dakar", "Attraper plus de poissons"], why: "La Grande Muraille verte est un programme de reboisement pour lutter contre l’avancée du désert." },
        ],
      },
      {
        chapter: ALIMENTATION,
        stem: MILIEU,
        questions: [
          { qcm: "Une ration équilibrée contient chaque jour :", choices: ["*des aliments des trois groupes et de l’eau potable", "seulement du riz", "seulement des fruits", "seulement de la viande"], why: "Une ration équilibrée réunit les aliments énergétiques, de construction et de protection, avec de l’eau potable." },
          { qcm: "Qu’est-ce qui aide à prévenir la malnutrition du jeune enfant ?", choices: ["*L’allaitement maternel et la surveillance de la croissance", "Le sucre à chaque repas", "Un seul repas par jour", "Le café au lait"], why: "L’allaitement maternel, une alimentation variée et la surveillance de la croissance préviennent la malnutrition." },
          { vf: "Le pain de singe et le bissap apportent de la vitamine C.", answer: true, why: "Les agrumes, le bissap et le pain de singe apportent de la vitamine C, qui prévient le scorbut." },
        ],
      },
      {
        chapter: SYMBOLES,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Qui a écrit les paroles de l’hymne national du Sénégal ?", choices: ["*Léopold Sédar Senghor", "Abdou Diouf", "Blaise Diagne", "Lat Dior"], why: "Les paroles de « Le Lion rouge » sont de Léopold Sédar Senghor, premier président du Sénégal." },
          { vf: "La devise du Sénégal est « Un Peuple – Un But – Une Foi ».", answer: true, why: "C’est bien la devise du Sénégal." },
        ],
      },
      {
        chapter: INSTITUTIONS,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Qui compose le Gouvernement ?", choices: ["*Le Premier ministre et les ministres", "Les députés et les juges", "Les maires et les préfets", "Les élèves et les maîtres"], why: "Le Premier ministre et les ministres appliquent la politique de la nation." },
          { qcm: "Pourquoi sépare-t-on les pouvoirs (exécutif, législatif, judiciaire) ?", choices: ["*Pour protéger les citoyens contre les abus", "Pour payer moins d’impôts", "Pour avoir moins de lois", "Pour supprimer les élections"], why: "Si une seule personne avait tous les pouvoirs, elle pourrait en abuser." },
        ],
      },
      {
        chapter: COMMUNAUTE,
        stem: ENSEMBLE,
        questions: [
          { qcm: "Que doit faire un enfant victime de maltraitance ?", choices: ["*En parler à un adulte de confiance ou à son maître", "Garder le secret", "Quitter l’école", "Se venger"], why: "Il peut en parler à un adulte de confiance, à son maître ou à un service de protection de l’enfance." },
          { qcm: "Quel est le but des organisations comme les dahiras ou Caritas ?", choices: ["*Aider les plus pauvres", "Voter les lois", "Juger les criminels", "Vendre du poisson"], why: "Ces organisations confessionnelles aident les plus pauvres et les malades : l’entraide fait partie de la vie en communauté." },
        ],
      },
    ],
    DEGRADATION,
    reading(
      "<strong>Contexte.</strong> À Joal, les pêcheurs rentrent avec de moins en moins de poissons, et ceux-ci sont de plus en plus petits. Certains utilisent des filets aux mailles très fines et pêchent même les jeunes poissons. Les mareyeuses s’inquiètent pour leur travail. La communauté veut trouver des solutions.",
    ),
    [
      { qcm: "Comment appelle-t-on ce problème ?", choices: ["*La surpêche", "La déforestation", "L’érosion", "L’anémie"], why: "On pêche plus de poissons que la mer n’en produit : c’est la surpêche." },
      { qcm: "Pourquoi ne faut-il pas pêcher les jeunes poissons ?", choices: ["*Ils n’ont pas encore pu se reproduire.", "Ils ne sont pas comestibles.", "Ils abîment les pirogues.", "Ils coûtent trop cher."], why: "Un poisson pêché trop jeune ne se reproduira pas : il y aura moins de poissons plus tard. D’où les tailles minimales de pêche." },
      { qcm: "Quelle mesure peut aider à protéger le poisson ?", choices: ["*Respecter le repos biologique et les tailles minimales", "Utiliser des filets encore plus fins", "Pêcher jour et nuit", "Jeter les ordures dans la mer"], why: "Le repos biologique et les tailles minimales laissent le temps aux poissons de grandir et de se reproduire." },
      { self: "Sur ta feuille, écris deux conséquences de la surpêche pour la population de Joal et une solution que la communauté peut adopter. Compare ensuite avec le corrigé.", why: "<p>Réponse possible :</p><ul><li>conséquences : les pêcheurs et les mareyeuses gagnent moins d’argent ; le poisson devient rare et plus cher pour les familles ;</li><li>solution : interdire les filets aux mailles trop fines et faire respecter le repos biologique.</li></ul><p>Compte ta réponse comme réussie si tu as écrit deux conséquences et une solution justes.</p>" },
    ],
  ),
];
