import { cn } from "@/lib/cn";

/** Bandeau tricolore vert, jaune, rouge (décoratif). */
export function FlagStripe({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex h-1.5 w-full", className)}>
      <span className="flex-1 bg-senegal-green" />
      <span className="flex-1 bg-senegal-yellow" />
      <span className="flex-1 bg-senegal-red" />
    </div>
  );
}

/** Petit drapeau du Sénégal : trois bandes verticales et l'étoile verte au centre. */
export function SenegalFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" aria-hidden className={cn("h-3.5 w-auto shrink-0 rounded-[2px]", className)}>
      <rect width="10" height="20" className="fill-senegal-green" />
      <rect x="10" width="10" height="20" className="fill-senegal-yellow" />
      <rect x="20" width="10" height="20" className="fill-senegal-red" />
      <path
        d="M15 6.6l.76 2.35h2.47l-2 1.45.77 2.35-2-1.45-2 1.45.77-2.35-2-1.45h2.47z"
        className="fill-senegal-green"
      />
    </svg>
  );
}
