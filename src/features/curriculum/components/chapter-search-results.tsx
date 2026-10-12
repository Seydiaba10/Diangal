import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { searchChapters } from "../data";

export async function ChapterSearchResults({ query, levelCode }: { query: string; levelCode: string }) {
  const [hits, t] = await Promise.all([searchChapters(query, levelCode), getTranslations("courses")]);
  return (
    <Card aria-live="polite" className="p-4 sm:p-5">
      <h2 className="font-semibold text-ink">{t("searchResults", { count: hits.length, query })}</h2>
      {hits.length > 0 ? (
        <ul className="mt-3 divide-y divide-line">
          {hits.map((hit) => (
            <li key={`${hit.subject.slug}/${hit.chapterSlug}`}>
              <Link
                href={`/eleve/cours/${hit.subject.slug}/${hit.chapterSlug}`}
                className="flex items-center gap-3 rounded-xl py-3 hover:bg-canvas"
              >
                <SubjectIcon code={hit.subject.code} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-ink">{hit.chapterTitle}</span>
                  <span className="block text-xs text-ink-muted">
                    {hit.subject.name} · {t("chapterNumber", { number: hit.number })}
                  </span>
                </span>
                <ChevronRight className="size-4 text-ink-subtle" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}
