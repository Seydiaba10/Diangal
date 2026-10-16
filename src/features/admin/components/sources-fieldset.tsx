import { getTranslations } from "next-intl/server";
import { INPUT_CLASS } from "@/components/ui/form";
import type { ContentSource } from "@/types/domain";

const SOURCE_KINDS: ContentSource["kind"][] = ["official", "external", "diangal"];
const EMPTY_SOURCE: ContentSource = { title: "", kind: "official" };

/**
 * Sources d'un contenu (chapitre, sujet d'examen) : une ligne par document, plus deux lignes
 * vides pour en ajouter. Champs sourceTitle / sourceUrl / sourceKind lus par readSources.
 */
export async function SourcesFieldset({ sources }: { sources: ContentSource[] }) {
  const t = await getTranslations("adminChapter");
  const rows = [...sources, EMPTY_SOURCE, EMPTY_SOURCE];
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-ink">{t("fields.sources")}</legend>
      <p className="text-xs text-ink-muted">{t("fields.sourcesHint")}</p>
      {rows.map((source, i) => (
        <div key={i} className="grid gap-2 rounded-xl bg-canvas p-3 sm:grid-cols-[1fr_1fr_150px]">
          <label className="sr-only" htmlFor={`source-title-${i}`}>
            {t("fields.sourceTitle", { n: i + 1 })}
          </label>
          <input
            id={`source-title-${i}`}
            name="sourceTitle"
            maxLength={200}
            defaultValue={source.title}
            placeholder={t("fields.sourceTitlePlaceholder")}
            className={INPUT_CLASS}
          />
          <label className="sr-only" htmlFor={`source-url-${i}`}>
            {t("fields.sourceUrl", { n: i + 1 })}
          </label>
          <input
            id={`source-url-${i}`}
            name="sourceUrl"
            type="url"
            maxLength={500}
            defaultValue={source.url ?? ""}
            placeholder="https://"
            className={INPUT_CLASS}
          />
          <label className="sr-only" htmlFor={`source-kind-${i}`}>
            {t("fields.sourceKind", { n: i + 1 })}
          </label>
          <select id={`source-kind-${i}`} name="sourceKind" defaultValue={source.kind} className={INPUT_CLASS}>
            {SOURCE_KINDS.map((kind) => (
              <option key={kind} value={kind}>
                {t(`kinds.${kind}`)}
              </option>
            ))}
          </select>
        </div>
      ))}
    </fieldset>
  );
}
