import { CircleCheck, CircleX, PenLine } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Field, INPUT_CLASS, TEXTAREA_CLASS } from "@/components/ui/form";
import { Notice } from "@/components/ui/notice";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  addLessonAction,
  deleteChapterAction,
  setChapterStatusAction,
  updateChapterAction,
} from "@/features/admin/actions";
import { PublishStatusBadge, VerificationBadge } from "@/features/admin/components/content-badges";
import { SourcesFieldset } from "@/features/admin/components/sources-fieldset";
import { getAdminChapter } from "@/features/admin/data";
import type { LevelCode } from "@/lib/levels";

type Props = PageProps<"/admin/contenus/chapitres/[id]">;

const ERRORS = ["champs", "lien", "sources", "lecons", "redaction", "statut", "lecon", "suppression"] as const;
const STATUS_DONE = ["draft", "review", "published"] as const;

export async function generateMetadata() {
  const t = await getTranslations("adminChapter");
  return { title: t("title") };
}

async function ChapterEditor({ params, searchParams }: Props) {
  const [{ id }, query, t, tContent, tLevels] = await Promise.all([
    params,
    searchParams,
    getTranslations("adminChapter"),
    getTranslations("adminContent"),
    getTranslations("levels"),
  ]);
  const data = await getAdminChapter(decodeURIComponent(id));
  if (!data) notFound();
  const { program, chapter } = data;

  const written = chapter.lessons.filter((l) => l.written).length;
  const checks = [
    { ok: chapter.sources.length > 0, label: t("checks.sources") },
    { ok: chapter.lessons.length > 0, label: t("checks.lessons") },
    { ok: chapter.lessons.length > 0 && written === chapter.lessons.length, label: t("checks.written", { written, total: chapter.lessons.length }) },
  ];
  const published = chapter.status === "published";
  const pendingLessons = chapter.lessons.some((l) => l.status !== "published");
  const error = ERRORS.find((e) => e === query.erreur);
  const statusDone = STATUS_DONE.find((s) => s === query.statut);
  const level = tLevels(program.levelCode as LevelCode);

  return (
    <>
      <Breadcrumb
        items={[
          { label: tContent("title"), href: `/admin/contenus?classe=${program.levelCode}` },
          { label: `${program.subjectName} · ${level}${program.seriesCode ? ` ${program.seriesCode}` : ""}` },
          { label: chapter.title },
        ]}
      />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {chapter.number}. {chapter.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          <PublishStatusBadge status={chapter.status} />
          <VerificationBadge verification={chapter.verification} />
        </div>
      </div>
      {query.demo ? <Notice tone="info">{t("demo")}</Notice> : null}
      {query.cree ? <Notice tone="success">{t("created")}</Notice> : null}
      {query.enregistre ? <Notice tone="success">{t("saved")}</Notice> : null}
      {statusDone ? <Notice tone="success">{t(`statusDone.${statusDone}`)}</Notice> : null}
      {error ? <Notice tone="error">{t(`errors.${error}`)}</Notice> : null}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[3fr_2fr]">
        <SectionCard id="infos-titre" title={t("infos")}>
          <form action={updateChapterAction.bind(null, chapter.id)} className="space-y-4">
            <Field id="title" label={t("fields.title")}>
              <input id="title" name="title" required minLength={3} maxLength={120} defaultValue={chapter.title} className={INPUT_CLASS} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
              <Field id="number" label={t("fields.number")}>
                <input id="number" name="number" type="number" required min={1} max={99} defaultValue={chapter.number} className={INPUT_CLASS} />
              </Field>
              <Field id="strand" label={t("fields.strand")} hint={t("fields.strandHint")}>
                <input id="strand" name="strand" maxLength={80} defaultValue={chapter.strand ?? ""} className={INPUT_CLASS} />
              </Field>
            </div>
            <Field id="summary" label={t("fields.summary")}>
              <textarea id="summary" name="summary" rows={3} maxLength={300} defaultValue={chapter.summary} className={TEXTAREA_CLASS} />
            </Field>
            <Field id="verification" label={t("fields.verification")} hint={t("fields.verificationHint")}>
              <select id="verification" name="verification" defaultValue={chapter.verification} className={INPUT_CLASS}>
                {(["unverified", "reviewed", "official"] as const).map((v) => (
                  <option key={v} value={v}>
                    {tContent(`verification.${v}`)}
                  </option>
                ))}
              </select>
            </Field>
            <SourcesFieldset sources={chapter.sources} />
            <Button type="submit">{t("save")}</Button>
          </form>
        </SectionCard>

        {/* Sur téléphone, la publication et les leçons passent avant le long formulaire. */}
        <div className="order-first space-y-5 xl:order-none">
          <SectionCard id="publication-titre" title={t("publication")}>
            <ul className="space-y-2">
              {checks.map((check) => (
                <li key={check.label} className="flex items-center gap-2 text-sm text-ink">
                  {check.ok ? (
                    <CircleCheck className="size-5 shrink-0 text-success-700" aria-hidden />
                  ) : (
                    <CircleX className="size-5 shrink-0 text-danger-700" aria-hidden />
                  )}
                  <span>
                    <span className="sr-only">{check.ok ? t("checks.ok") : t("checks.missing")} </span>
                    {check.label}
                  </span>
                </li>
              ))}
            </ul>
            {chapter.verification === "unverified" ? (
              <Notice tone="warning" className="mt-4">
                {t("unverifiedWarning")}
              </Notice>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {!published || pendingLessons ? (
                <form action={setChapterStatusAction.bind(null, chapter.id, "published")}>
                  <Button type="submit" size="sm">
                    {published ? t("republish") : t("publish")}
                  </Button>
                </form>
              ) : null}
              {chapter.status === "draft" ? (
                <form action={setChapterStatusAction.bind(null, chapter.id, "review")}>
                  <Button type="submit" size="sm" variant="outline">
                    {t("toReview")}
                  </Button>
                </form>
              ) : (
                <form action={setChapterStatusAction.bind(null, chapter.id, "draft")}>
                  <Button type="submit" size="sm" variant="outline">
                    {published ? t("unpublish") : t("toDraft")}
                  </Button>
                </form>
              )}
            </div>
          </SectionCard>

          <SectionCard id="lecons-titre" title={t("lessons")}>
            {chapter.lessons.length === 0 ? <p className="text-sm text-ink-muted">{t("noLessons")}</p> : null}
            <ol className="space-y-2">
              {chapter.lessons.map((lesson) => (
                <li key={lesson.id} className="flex flex-wrap items-center gap-2 rounded-xl bg-canvas px-3 py-2 text-sm">
                  <span className="min-w-0 flex-1 text-ink">
                    {lesson.number}. {lesson.title}
                  </span>
                  <PublishStatusBadge status={lesson.status} />
                  <Badge tone={lesson.written ? "success" : "idle"}>{lesson.written ? tContent("written") : tContent("toWrite")}</Badge>
                  <Link
                    href={`/admin/contenus/lecons/${encodeURIComponent(lesson.id)}`}
                    className="inline-flex h-11 items-center gap-1 rounded-lg px-2 font-medium text-brand-700 hover:bg-surface"
                  >
                    <PenLine className="size-4" aria-hidden />
                    {lesson.written ? tContent("edit") : t("write")}
                  </Link>
                </li>
              ))}
            </ol>
            <form action={addLessonAction.bind(null, chapter.id)} className="mt-4 space-y-3 border-t border-line pt-4">
              <p className="text-sm font-medium text-ink">{t("addLesson")}</p>
              <div className="grid gap-3 sm:grid-cols-[1fr_110px]">
                <Field id="lesson-title" label={t("fields.lessonTitle")}>
                  <input id="lesson-title" name="title" required minLength={3} maxLength={120} className={INPUT_CLASS} />
                </Field>
                <Field id="lesson-minutes" label={t("fields.minutes")}>
                  <input id="lesson-minutes" name="minutes" type="number" min={1} max={240} defaultValue={10} className={INPUT_CLASS} />
                </Field>
              </div>
              <Button type="submit" size="sm" variant="outline">
                {t("addSubmit")}
              </Button>
            </form>
          </SectionCard>

          {!published ? (
            <SectionCard id="suppression-titre" title={t("deleteTitle")} subtitle={t("deleteHint")}>
              <form action={deleteChapterAction.bind(null, chapter.id)}>
                <Button type="submit" size="sm" variant="ghost" className="text-danger-700 hover:bg-danger-50">
                  {t("delete")}
                </Button>
              </form>
            </SectionCard>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default function AdminChapterPage(props: Props) {
  return (
    <PageContainer width="wide" className="space-y-5">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <ChapterEditor {...props} />
      </Suspense>
    </PageContainer>
  );
}
