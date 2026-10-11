import { getTranslations } from "next-intl/server";
import { MarketingHeader } from "./marketing-header";

type LegalKey = "privacy" | "terms" | "notice";

/** Page légale : sections lues dans les traductions. Textes à faire valider par un juriste. */
export async function LegalPage({ page }: { page: LegalKey }) {
  const t = await getTranslations("legal");
  const sections = t.raw(`${page}.sections`) as { title: string; body: string }[];
  return (
    <>
      <MarketingHeader />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t(`${page}.title`)}</h1>
        <p className="mt-3 rounded-xl bg-premium-50 px-4 py-3 text-sm text-premium-700">{t("draftNotice")}</p>
        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}

export function legalMetadata(page: LegalKey) {
  return async function generateMetadata() {
    const t = await getTranslations("legal");
    return { title: t(`${page}.title`) };
  };
}
