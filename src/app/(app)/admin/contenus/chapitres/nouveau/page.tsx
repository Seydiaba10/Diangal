import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Field, INPUT_CLASS, TEXTAREA_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { createChapterAction } from "@/features/admin/actions";
import { getAdminProgram } from "@/features/admin/data";
import type { LevelCode } from "@/lib/levels";

export async function generateMetadata() {
  const t = await getTranslations("adminChapter");
  return { title: t("newTitle") };
}

async function NewChapterForm({ searchParams }: { searchParams: PageProps<"/admin/contenus/chapitres/nouveau">["searchParams"] }) {
  const [query, t, tContent, tLevels] = await Promise.all([
    searchParams,
    getTranslations("adminChapter"),
    getTranslations("adminContent"),
    getTranslations("levels"),
  ]);
  const program = typeof query.programme === "string" ? await getAdminProgram(query.programme) : null;
  if (!program) notFound();
  const level = tLevels(program.levelCode as LevelCode);

  return (
    <>
      <Breadcrumb
        items={[
          { label: tContent("title"), href: `/admin/contenus?classe=${program.levelCode}` },
          { label: `${program.subjectName} · ${level}${program.seriesCode ? ` ${program.seriesCode}` : ""}` },
          { label: t("newTitle") },
        ]}
      />
      <h1 className="text-2xl font-semibold tracking-tight text-ink">{t("newTitle")}</h1>
      {query.demo ? <Notice tone="info">{t("demo")}</Notice> : null}
      {query.erreur ? <Notice tone="error">{t("errors.titre")}</Notice> : null}
      <SectionCard id="nouveau-titre" title={t("program", { subject: program.subjectName, level })} subtitle={t("newHint")}>
        <form action={createChapterAction.bind(null, program.id)} className="space-y-4">
          <Field id="title" label={t("fields.title")}>
            <input id="title" name="title" required minLength={3} maxLength={120} className={INPUT_CLASS} />
          </Field>
          <Field id="strand" label={t("fields.strand")} hint={t("fields.strandHint")}>
            <input id="strand" name="strand" maxLength={80} className={INPUT_CLASS} />
          </Field>
          <Field id="summary" label={t("fields.summary")}>
            <textarea id="summary" name="summary" rows={3} maxLength={300} className={TEXTAREA_CLASS} />
          </Field>
          <Button type="submit">{t("create")}</Button>
        </form>
      </SectionCard>
    </>
  );
}

export default function AdminNewChapterPage({ searchParams }: PageProps<"/admin/contenus/chapitres/nouveau">) {
  return (
    <PageContainer className="space-y-5">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <NewChapterForm searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
