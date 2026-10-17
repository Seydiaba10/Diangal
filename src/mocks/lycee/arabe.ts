// Arabe de la série LA (1re et Terminale) : langue et littérature arabes, civilisation arabo-islamique.
// Chapitres INDICATIFS, établis d’après la liste des épreuves du Bac de la série LA (programme officiel
// non trouvé en ligne). Explications en français, exemples en arabe avec translittération. Leçons
// rédigées par DIANGAL, à faire valider par un professeur d’arabe.

import { type ChapterSpec, exemple, liste, methode, retenir, tableau } from "../tle/blocks";

const LANG = "Langue";
const LIT = "Littérature";
const CIV = "Civilisation arabo-islamique";

export const AR_1RE: ChapterSpec[] = [
  {
    title: "La phrase nominale et la phrase verbale",
    summary: "Sujet et prédicat de la phrase nominale ; verbe, sujet et complément de la phrase verbale.",
    strand: LANG,
    lessons: [
      {
        title: "Deux types de phrases",
        minutes: 15,
        body: `${tableau([
            ["Phrase", "Éléments", "Exemple"],
            ["nominale (al-jumla al-ismiyya)", "sujet (al-mubtada’) + prédicat (al-khabar), tous deux au nominatif", "الكتابُ جديدٌ (al-kitābu jadīdun) : le livre est neuf"],
            ["verbale (al-jumla al-fi‘liyya)", "verbe (al-fi‘l) + sujet (al-fā‘il) + complément d’objet (al-maf‘ūl bihi)", "كتبَ التلميذُ الدرسَ (kataba at-tilmīdhu ad-darsa) : l’élève a écrit la leçon"],
          ])}
          ${retenir("Dans la phrase verbale, le verbe vient en tête et reste au singulier quand le sujet le suit.")}`,
      },
    ],
  },
  {
    title: "Les cas et la déclinaison",
    summary: "Nominatif, accusatif et génitif ; les prépositions.",
    strand: LANG,
    lessons: [
      {
        title: "L’i‘rāb",
        minutes: 15,
        body: `${liste([
            "le nom se décline : <strong>nominatif</strong> (raf‘, voyelle u : ـُ), <strong>accusatif</strong> (naṣb, voyelle a : ـَ), <strong>génitif</strong> (jarr, voyelle i : ـِ) ;",
            "le sujet et le prédicat sont au nominatif ; le complément d’objet est à l’accusatif ;",
            "après une préposition (fī « dans », min « de », ilā « vers », ‘alā « sur »), le nom est au génitif.",
          ])}
          ${exemple(["في المدرسةِ (fī al-madrasati) : dans l’école — « al-madrasa » est au génitif."])}`,
      },
    ],
  },
  {
    title: "La conjugaison : l’accompli et l’inachevé",
    summary: "Racine trilitère, accompli, inachevé et impératif.",
    strand: LANG,
    lessons: [
      {
        title: "Conjuguer un verbe trilitère",
        minutes: 15,
        body: `${liste([
            "la plupart des mots arabes viennent d’une <strong>racine</strong> de trois consonnes : k-t-b exprime l’idée d’écrire ;",
            "l’<strong>accompli</strong> (al-māḍī) exprime une action terminée : كتبَ (kataba) « il a écrit » ;",
            "l’<strong>inachevé</strong> (al-muḍāri‘) exprime une action en cours ou future : يكتبُ (yaktubu) « il écrit » ;",
            "l’<strong>impératif</strong> (al-amr) : اكتبْ (uktub) « écris ! ».",
          ])}
          ${retenir("À l’accompli, la personne est marquée par un suffixe ; à l’inachevé, par un préfixe (et parfois un suffixe).")}`,
      },
    ],
  },
  {
    title: "Les schèmes et la dérivation",
    summary: "Former des mots à partir d’une racine : nom d’agent, nom de patient, nom de lieu.",
    strand: LANG,
    lessons: [
      {
        title: "Une racine, une famille de mots",
        minutes: 12,
        body: `${tableau([
            ["Schème", "Sens", "Racine k-t-b"],
            ["fā‘il", "celui qui fait", "كاتب (kātib) : écrivain"],
            ["maf‘ūl", "ce qui subit l’action", "مكتوب (maktūb) : écrit, lettre"],
            ["maf‘al", "lieu de l’action", "مكتب (maktab) : bureau"],
            ["maf‘ala", "lieu (souvent)", "مكتبة (maktaba) : bibliothèque"],
          ])}
          ${retenir("Connaître les schèmes permet de deviner le sens d’un mot nouveau et de trouver sa racine dans le dictionnaire.")}`,
      },
    ],
  },
  {
    title: "La poésie arabe préislamique",
    summary: "La Jāhiliyya, les Mu‘allaqāt, la structure de la qaṣīda.",
    strand: LIT,
    lessons: [
      {
        title: "Les poètes de la Jāhiliyya",
        minutes: 15,
        body: `${liste([
            "avant l’islam, la poésie est l’art majeur des Arabes : le poète défend l’honneur de sa tribu ;",
            "les <strong>Mu‘allaqāt</strong> (« poèmes suspendus ») rassemblent les plus célèbres poèmes de cette époque ; Imru’ al-Qays en est le plus connu ;",
            "la <strong>qaṣīda</strong> classique s’ouvre sur l’évocation du campement abandonné (nasīb), décrit le voyage (raḥīl), puis traite son sujet principal (éloge, fierté, satire).",
          ])}
          ${retenir("Cette poésie, transmise oralement, est aussi une source sur la vie et les valeurs des Arabes avant l’islam.")}`,
      },
    ],
  },
  {
    title: "La littérature aux époques islamique et omeyyade",
    summary: "Le Coran, modèle de la langue ; la poésie au service de l’islam ; poésie omeyyade.",
    strand: LIT,
    lessons: [
      {
        title: "De l’islam aux Omeyyades",
        minutes: 15,
        body: `${liste([
            "le Coran devient la référence de la langue arabe et de son éloquence ;",
            "Ḥassān ibn Thābit est appelé « le poète du Prophète » ;",
            "sous les Omeyyades (Damas, 661-750), la poésie de joute oppose Jarīr et al-Farazdaq ; le ghazal ‘udhrī chante un amour chaste et impossible (Jamīl Buthayna).",
          ])}`,
      },
    ],
  },
  {
    title: "Les fondements de la civilisation arabo-islamique",
    summary: "Le Coran et la Sunna, l’hégire, les califes, l’expansion de l’islam.",
    strand: CIV,
    lessons: [
      {
        title: "Naissance et expansion",
        minutes: 15,
        body: `${liste([
            "le Coran et la Sunna (paroles et actes du Prophète) sont les sources de l’islam ;",
            "l’hégire (622) ouvre le calendrier musulman ;",
            "les quatre premiers califes (Abū Bakr, ‘Umar, ‘Uthmān, ‘Alī) étendent l’islam hors d’Arabie ;",
            "sous les Omeyyades puis les Abbassides, l’arabe devient langue de l’administration, de la science et de la culture.",
          ])}`,
      },
    ],
  },
  {
    title: "L’arabe au Sénégal",
    summary: "Daaras, érudits sénégalais de langue arabe, écriture ajami.",
    strand: CIV,
    lessons: [
      {
        title: "Une tradition savante",
        minutes: 15,
        body: `${liste([
            "l’arabe est enseigné depuis des siècles dans les daaras et les écoles coraniques ;",
            "de grands érudits sénégalais ont écrit en arabe : Cheikh Moussa Kamara (histoire du Fouta), El Hadji Malick Sy (poésie religieuse), Cheikh Ahmadou Bamba (khassaïdes) ;",
            "l’<strong>ajami</strong> consiste à écrire les langues nationales en caractères arabes : le wolofal pour le wolof (poèmes de Serigne Moussa Ka).",
          ])}
          ${retenir("Le Sénégal possède un riche patrimoine de manuscrits en arabe et en ajami.")}`,
      },
    ],
  },
];

export const AR_TLE: ChapterSpec[] = [
  {
    title: "La rhétorique arabe",
    summary: "La balāgha : comparaison, métaphore, métonymie, figures de sonorité et d’opposition.",
    strand: LANG,
    lessons: [
      {
        title: "Les figures de la balāgha",
        minutes: 15,
        body: `${tableau([
            ["Figure", "Définition"],
            ["tashbīh", "comparaison, avec un outil (ka, mithl)"],
            ["isti‘āra", "métaphore : comparaison sans outil ni comparé"],
            ["kināya", "expression indirecte (métonymie, périphrase)"],
            ["ṭibāq", "rapprochement de deux contraires (antithèse)"],
            ["jinās", "rapprochement de deux mots aux sons proches (paronomase)"],
          ])}
          ${exemple(["زيدٌ كالأسدِ (Zaydun ka-l-asadi) : Zayd est comme un lion (tashbīh)."])}`,
      },
    ],
  },
  {
    title: "La métrique arabe",
    summary: "Le ‘arūḍ d’al-Khalīl, les mètres, la rime.",
    strand: LANG,
    lessons: [
      {
        title: "Le ‘arūḍ",
        minutes: 15,
        body: `${liste([
            "al-Khalīl ibn Aḥmad (VIII<sup>e</sup> siècle) a décrit les règles de la métrique arabe : le <strong>‘arūḍ</strong> ;",
            "il décrit quinze mètres (buḥūr) ; le grammairien al-Akhfash en ajoute un seizième. Les plus courants sont le ṭawīl, le basīṭ, le kāmil et le wāfir ;",
            "le vers classique a deux hémistiches ; toute la qaṣīda garde la même rime et la même lettre finale (rawī).",
          ])}
          ${retenir("Scander un vers, c’est repérer la suite des syllabes longues et brèves pour identifier son mètre.")}`,
      },
    ],
  },
  {
    title: "La littérature abbasside",
    summary: "Poésie et prose de l’âge classique : al-Mutanabbī, Abū Nuwās, al-Jāḥiẓ, Ibn al-Muqaffa‘.",
    strand: LIT,
    lessons: [
      {
        title: "L’âge d’or de Bagdad",
        minutes: 15,
        body: `${liste([
            "sous les Abbassides (750-1258), Bagdad devient un grand centre culturel ;",
            "poésie : Abū Nuwās renouvelle les thèmes ; al-Mutanabbī est considéré comme l’un des plus grands poètes arabes ;",
            "prose : al-Jāḥiẓ (essais, <em>Le Livre des animaux</em>), Ibn al-Muqaffa‘ (<em>Kalīla wa Dimna</em>, fables) ;",
            "les contes des <em>Mille et Une Nuits</em> se sont formés sur plusieurs siècles.",
          ])}`,
      },
    ],
  },
  {
    title: "La Nahda et la littérature arabe moderne",
    summary: "La renaissance arabe du XIXe siècle et les grands auteurs du XXe siècle.",
    strand: LIT,
    lessons: [
      {
        title: "Renaissance et modernité",
        minutes: 15,
        body: `${liste([
            "la <strong>Nahda</strong> (« renaissance ») au XIX<sup>e</sup> siècle renouvelle la langue, la presse et la littérature ;",
            "Aḥmad Shawqī est surnommé « le prince des poètes » ;",
            "Ṭāhā Ḥusayn raconte son enfance dans <em>Al-Ayyām</em> (Le Livre des jours) ;",
            "Naguib Mahfouz reçoit le prix Nobel de littérature en 1988 ; Mahmoud Darwich est le grand poète palestinien.",
          ])}`,
      },
    ],
  },
  {
    title: "Méthodes : dissertation et commentaire en arabe",
    summary: "Organiser une dissertation et un commentaire de texte en arabe.",
    strand: LANG,
    lessons: [
      {
        title: "Rédiger en arabe",
        minutes: 15,
        body: `${methode([
            "Introduction (al-muqaddima) : présenter le sujet et poser la question.",
            "Développement (al-‘arḍ) : idées organisées en paragraphes, avec des exemples tirés des textes étudiés.",
            "Conclusion (al-khātima) : répondre à la question et ouvrir.",
            "Soigner les liaisons (wa, fa, thumma, lākin) et la correction de l’i‘rāb.",
          ])}`,
      },
    ],
  },
  {
    title: "Les sciences dans la civilisation arabo-islamique",
    summary: "La Maison de la sagesse et les grands savants.",
    strand: CIV,
    lessons: [
      {
        title: "Savants et savoirs",
        minutes: 15,
        body: `${tableau([
            ["Savant", "Domaine"],
            ["al-Khwārizmī", "mathématiques : l’algèbre (al-jabr) ; son nom a donné « algorithme »"],
            ["Ibn Sīnā (Avicenne)", "médecine, philosophie"],
            ["Ibn Rushd (Averroès)", "philosophie, commentaire d’Aristote"],
            ["al-Idrīsī", "géographie, cartographie"],
            ["Ibn Khaldūn", "histoire et sociologie (<em>la Muqaddima</em>)"],
          ])}
          ${retenir("À Bagdad, la Maison de la sagesse (Bayt al-Ḥikma) traduisait en arabe les savoirs grecs, perses et indiens.")}`,
      },
    ],
  },
  {
    title: "L’islam en Afrique de l’Ouest",
    summary: "Diffusion de l’islam, centres de savoir, confréries.",
    strand: CIV,
    lessons: [
      {
        title: "Diffusion et confréries",
        minutes: 15,
        body: `${liste([
            "l’islam gagne l’Afrique de l’Ouest par le commerce transsaharien et les lettrés ; les Almoravides (XI<sup>e</sup> siècle) jouent un rôle important ;",
            "Tombouctou et sa mosquée de Sankoré sont un grand foyer de savoir (Ahmed Baba, XVI<sup>e</sup> siècle) ;",
            "au Sénégal, les confréries soufies structurent la vie religieuse : Qadiriyya, Tijaniyya, Mouridiyya, Layène.",
          ])}`,
      },
    ],
  },
];
