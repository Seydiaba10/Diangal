import { cn } from "@/lib/cn";

/**
 * Contenu pédagogique déjà converti en HTML, assaini côté serveur à l'enregistrement
 * (lib/sanitize.ts, liste blanche) : jamais de saisie utilisateur brute ici.
 */
export function RichText({ html, className }: { html: string; className?: string }) {
  return <div className={cn("rich-text", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
