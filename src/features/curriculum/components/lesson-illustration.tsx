import { cn } from "@/lib/cn";

// Petite illustration en tête des leçons des plus jeunes (CI à CM1), dessinée en SVG avec les
// couleurs de la matière et du drapeau : aucune image à télécharger.

function MathScene() {
  return (
    <>
      <circle cx="40" cy="70" r="16" className="fill-subject-math" />
      <circle cx="82" cy="70" r="16" className="fill-subject-math" />
      <circle cx="124" cy="70" r="16" className="fill-subject-math" />
      <path d="M170 86 L190 50 L210 86 Z" className="fill-senegal-yellow stroke-ink" strokeWidth="2" />
      <rect x="222" y="54" width="32" height="32" rx="4" className="fill-senegal-green" />
      <text x="40" y="76" textAnchor="middle" className="fill-surface text-[18px] font-bold">1</text>
      <text x="82" y="76" textAnchor="middle" className="fill-surface text-[18px] font-bold">2</text>
      <text x="124" y="76" textAnchor="middle" className="fill-surface text-[18px] font-bold">3</text>
    </>
  );
}

function FrenchScene() {
  return (
    <>
      <path d="M40 40 Q90 28 140 44 L140 100 Q90 86 40 98 Z" className="fill-surface stroke-subject-fr" strokeWidth="3" />
      <path d="M140 44 Q190 28 240 40 L240 98 Q190 86 140 100 Z" className="fill-surface stroke-subject-fr" strokeWidth="3" />
      <text x="88" y="78" textAnchor="middle" className="fill-subject-fr text-[30px] font-bold">a</text>
      <text x="190" y="78" textAnchor="middle" className="fill-subject-fr text-[30px] font-bold">b</text>
      <circle cx="262" cy="34" r="12" className="fill-senegal-yellow" />
    </>
  );
}

function LifeScene() {
  return (
    <>
      <circle cx="250" cy="32" r="16" className="fill-senegal-yellow" />
      <rect x="40" y="96" width="240" height="8" rx="4" className="fill-cycle-elementary" />
      <rect x="66" y="58" width="12" height="40" className="fill-subject-esvs" />
      <circle cx="72" cy="50" r="24" className="fill-senegal-green" />
      <path d="M130 66 L170 38 L210 66 Z" className="fill-senegal-red" />
      <rect x="138" y="66" width="64" height="32" className="fill-subject-esvs-soft stroke-subject-esvs" strokeWidth="2" />
      <rect x="162" y="78" width="16" height="20" className="fill-subject-esvs" />
    </>
  );
}

const SCENES: Record<string, () => React.JSX.Element> = { MATH: MathScene, FR: FrenchScene, ESVS: LifeScene };

/** Illustration décorative (ignorée par les lecteurs d'écran) ; rien pour une matière sans dessin. */
export function LessonIllustration({ subjectCode, className }: { subjectCode: string; className?: string }) {
  const Scene = SCENES[subjectCode];
  if (!Scene) return null;
  return (
    <svg viewBox="0 0 300 120" aria-hidden focusable="false" className={cn("h-24 w-auto rounded-2xl bg-cycle-elementary-soft", className)}>
      <Scene />
    </svg>
  );
}
