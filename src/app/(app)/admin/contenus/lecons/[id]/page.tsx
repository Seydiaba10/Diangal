import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { TEXTAREA_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { RichText } from "@/components/ui/rich-text";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { saveLessonBodyAction } from "@/features/admin/actions";
import { PublishStatusBadge } from "@/features/admin/components/content-badges";
import { getAdminLesson } from "@/features/admin/data";
import type { LevelCode } from "@/lib/levels";

type Props = PageProps<"/admin/contenus/lecons/[id]">;

export async function generateMetadata() {
  const t = await getTranslations("adminLesson");
  return { title: t("title") };
}

async function LessonEditor({ params, searchParams }: Props) {
  const [{ id }, query, t, tContent, tLevels] = await Promise.all([
    params,
    searchParams,
    getTranslations("adminLesson"),
    getTranslations("adminContent"),
    getTranslations("levels"),
  ]);
  const data = await getAdminLesson(decodeURIComponent(id));
  if (!data) notFound();
  const { subjectName, levelCode, chapter, lesson, body } = data;
  const published = lesson.status === "published";

  return (
    <>
      <Breadcrumb
        items={[
          { label: tContent("title"), href: `/admin/contenus?classe=${levelCode}` },
          { label: `${subjectName} · ${tLevels(levelCode as LevelCode)}` },
          { label: chapter.title, href: `/admin/contenus/chapitres/${encodeURIComponent(chapter.id)}` },
          { label: lesson.title },
        ]}
      />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{lesson.title}</h1>
        <PublishStatusBadge status={lesson.status} />
      </div>
      {query.nouvelle ? <Notice tone="info">{t("created")}</Notice> : null}
      {query.enregistre ? <Notice tone="success">{published ? t("saved") : t("savedDraft")}</Notice> : null}
      {query.erreur ? <Notice tone="error">{t("error")}</Notice> : null}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <SectionCard id="editeur-titre" title={t("editor")} subtitle={t("editorHint")}>
          <form action={saveLessonBodyAction.bind(null, lesson.id)} className="space-y-3">
            <label htmlFor="body" className="sr-only">
              {t("editor")}
            </label>
            <textarea id="body" name="body" rows={18} defaultValue={body.trim()} className={`${TEXTAREA_CLASS} font-mono text-sm`} />
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit">{t("save")}</Button>
              <span className="text-xs text-ink-muted">{published ? t("workflowPublished") : t("workflowDraft")}</span>
            </div>
          </form>
        </SectionCard>
        <SectionCard id="apercu-titre" title={t("preview")}>
          {body.trim() ? <RichText html={body} className="text-ink" /> : <p className="text-sm text-ink-muted">{t("emptyPreview")}</p>}
        </SectionCard>
      </div>
    </>
  );
}

export default function AdminLessonPage(props: Props) {
  return (
    <PageContainer width="wide" className="space-y-5">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <LessonEditor {...props} />
      </Suspense>
    </PageContainer>
  );
}
