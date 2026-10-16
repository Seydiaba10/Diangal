import { cn } from "@/lib/cn";

const NBSP = " ";

/** Typographie française : espace insécable à l'intérieur des guillemets (« ainsi »), jamais de guillemet seul en bout de ligne. */
function frenchQuotes(html: string): string {
  return html.replaceAll("« ", `«${NBSP}`).replaceAll(" »", `${NBSP}»`);
}

/**
 * Contenu pédagogique déjà converti en HTML, assaini côté serveur à l'enregistrement
 * (lib/sanitize.ts, liste blanche) : jamais de saisie utilisateur brute ici.
 */
export function RichText({ html, className }: { html: string; className?: string }) {
  return <div className={cn("rich-text", className)} dangerouslySetInnerHTML={{ __html: frenchQuotes(html) }} />;
}
