import type { ContentSource } from "@/types/domain";

// Sources d'un contenu (colonne jsonb « sources » des chapitres et des évaluations).

const KINDS = new Set<ContentSource["kind"]>(["official", "external", "diangal"]);

/** Liste typée ; les entrées mal formées sont ignorées. */
export function parseSources(value: unknown): ContentSource[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const { title, url, kind } = item as Record<string, unknown>;
    if (typeof title !== "string" || !KINDS.has(kind as ContentSource["kind"])) return [];
    return [{ title, kind: kind as ContentSource["kind"], ...(typeof url === "string" && url ? { url } : {}) }];
  });
}
