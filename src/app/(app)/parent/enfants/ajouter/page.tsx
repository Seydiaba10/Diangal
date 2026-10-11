import { Baby, KeyRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Field, INPUT_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { linkChildAction } from "@/features/account/actions";

export async function generateMetadata() {
  const t = await getTranslations("addChild");
  return { title: t("title") };
}

async function ErrorNotice({ searchParams }: { searchParams: PageProps<"/parent/enfants/ajouter">["searchParams"] }) {
  const [{ erreur }, t] = await Promise.all([searchParams, getTranslations("addChild")]);
  return erreur === "code" ? <Notice tone="error">{t("error")}</Notice> : null;
}

export default async function AddChildPage({ searchParams }: PageProps<"/parent/enfants/ajouter">) {
  const t = await getTranslations("addChild");
  return (
    <PageContainer width="narrow" className="space-y-5">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={null}>
        <ErrorNotice searchParams={searchParams} />
      </Suspense>
      <SectionCard id="code-titre" title={t("codeTitle")} subtitle={t("codeBody")}>
        <form action={linkChildAction} className="space-y-4">
          <Field id="code" label={t("codeLabel")} hint={t("codeHint")}>
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink-subtle" aria-hidden />
              <input
                id="code"
                name="code"
                required
                autoCapitalize="characters"
                autoComplete="off"
                placeholder={t("codePlaceholder")}
                className={`${INPUT_CLASS} pl-10 font-mono uppercase tracking-widest`}
              />
            </div>
          </Field>
          <Button type="submit">{t("submit")}</Button>
        </form>
      </SectionCard>
      <div className="flex gap-3 rounded-2xl border border-dashed border-line bg-surface p-5">
        <Baby className="size-6 shrink-0 text-brand-700" aria-hidden />
        <div>
          <p className="font-semibold text-ink">{t("managedTitle")}</p>
          <p className="mt-1 text-sm text-ink-muted">{t("managedBody")}</p>
        </div>
      </div>
    </PageContainer>
  );
}
