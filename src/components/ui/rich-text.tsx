import { cn } from "@/lib/cn";

/**
 * Contenu pédagogique déjà converti en HTML. En phase 3, ce HTML est produit et assaini
 * côté serveur à l'enregistrement (rehype-sanitize) : jamais de saisie utilisateur brute ici.
 */
export function RichText({ html, className }: { html: string; className?: string }) {
  return <div className={cn("rich-text", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
