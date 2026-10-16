import { BookOpenCheck, CircleCheck, FileText, GraduationCap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { LevelBadge } from "@/components/ui/level-badge";
import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { Table, Td, Th } from "@/components/ui/table";
import { getContentTracking } from "@/features/admin/data";
import { LEVEL_CODES, type LevelCode } from "@/lib/levels";
import type { ContentTrackingRow } from "@/types/domain";

type GapKey = "noChapters" | "lessonsToWrite" | "noExercises" | "noQuiz" | "noExam" | "unverified" | "unsourced";

// Classes d'examen (CFEE, BFEM, Bac) : un sujet d'examen y est attendu.
const EXAM_LEVELS = new Set(["CM2", "3E", "TLE"]);

export async function generateMetadata() {
  const t = await getTranslations("adminTracking");
  return { title: t("title") };
}

/** Ce qui manque encore pour un programme, du plus bloquant au moins urgent. */
function gapsOf(row: ContentTrackingRow) {
  const gaps: { key: GapKey; count?: number }[] = [];
  if (row.chapters === 0) return [...gaps, { key: "noChapters" as const }];
  if (row.lessons > row.lessonsWritten) gaps.push({ key: "lessonsToWrite", count: row.lessons - row.lessonsWritten });
  if (row.exercises === 0) gaps.push({ key: "noExercises" });
  if (row.quizzes === 0) gaps.push({ key: "noQuiz" });
  if (EXAM_LEVELS.has(row.levelCode) && row.exams === 0) gaps.push({ key: "noExam" });
  if (row.chaptersUnverified > 0) gaps.push({ key: "unverified", count: row.chaptersUnverified });
  if (row.chapters > row.sourcedChapters) gaps.push({ key: "unsourced", count: row.chapters - row.sourcedChapters });
  return gaps;
}

async function Tracking() {
  const [rows, t, tLevels] = await Promise.all([getContentTracking(), getTranslations("adminTracking"), getTranslations("levels")]);
  const sum = (pick: (r: ContentTrackingRow) => number) => rows.reduce((total, r) => total + pick(r), 0);
  const levelsWithProgram = new Set(rows.filter((r) => r.chapters > 0).map((r) => r.levelCode));
  const missingLevels = LEVEL_CODES.filter((code) => !levelsWithProgram.has(code));
  const chapters = sum((r) => r.chapters);
  const tiles = [
    {
      icon: GraduationCap,
      tint: "bg-brand-50 text-brand-700",
      label: t("tiles.levels"),
      value: `${levelsWithProgram.size}/${LEVEL_CODES.length}`,
    },
    {
      icon: BookOpenCheck,
      tint: "bg-success-50 text-success-700",
      label: t("tiles.chapters"),
      value: `${sum((r) => r.chaptersPublished)}/${chapters}`,
    },
    {
      icon: FileText,
      tint: "bg-info-50 text-info-700",
      label: t("tiles.lessons"),
      value: `${sum((r) => r.lessonsWritten)}/${sum((r) => r.lessons)}`,
    },
    {
      icon: ShieldCheck,
      tint: "bg-premium-50 text-premium-700",
      label: t("tiles.verified"),
      value: `${sum((r) => r.chaptersReviewed + r.chaptersOfficial)}/${chapters}`,
    },
  ];

  return (
    <div className="space-y-5 lg:space-y-7">
      <section aria-label={t("summary")} className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {tiles.map(({ icon: Icon, tint, label, value }) => (
          <StatCard key={label} icon={<Icon className="size-5" aria-hidden />} iconClassName={tint} label={label} value={value} />
        ))}
      </section>

      <Table caption={t("caption")}>
        <thead>
          <tr>
            <Th>{t("cols.level")}</Th>
            <Th>{t("cols.subject")}</Th>
            <Th>{t("cols.chapters")}</Th>
            <Th>{t("cols.lessons")}</Th>
            <Th>{t("cols.exercises")}</Th>
            <Th>{t("cols.quizzes")}</Th>
            <Th>{t("cols.exams")}</Th>
            <Th>{t("cols.verified")}</Th>
            <Th>{t("cols.free")}</Th>
            <Th>{t("cols.gaps")}</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const gaps = gapsOf(row);
            return (
              <tr key={row.programId}>
                <Td>
                  <LevelBadge code={row.levelCode}>
                    {tLevels(row.levelCode as LevelCode)}
                    {row.seriesCode ? ` ${row.seriesCode}` : ""}
                  </LevelBadge>
                </Td>
                <Td className="font-medium">
                  <Link href={`/admin/contenus?classe=${row.levelCode}`} className="hover:text-brand-700 hover:underline">
                    {row.subjectName}
                  </Link>
                </Td>
                <Td>{t("ratio", { done: row.chaptersPublished, total: row.chapters })}</Td>
                <Td>{t("ratio", { done: row.lessonsWritten, total: row.lessons })}</Td>
                <Td>{row.exercises}</Td>
                <Td>{row.quizzes}</Td>
                <Td>{EXAM_LEVELS.has(row.levelCode) ? row.exams : t("notApplicable")}</Td>
                <Td>{t("ratio", { done: row.chaptersReviewed + row.chaptersOfficial, total: row.chapters })}</Td>
                <Td>{row.freeChapters}</Td>
                <Td>
                  {gaps.length ? (
                    <ul className="flex flex-wrap gap-1.5">
                      {gaps.map((gap) => (
                        <li key={gap.key}>
                          <Badge tone={gap.key === "noChapters" ? "danger" : "idle"}>{t(`gaps.${gap.key}`, { count: gap.count ?? 0 })}</Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Badge tone="success" icon={CircleCheck}>
                      {t("gaps.complete")}
                    </Badge>
                  )}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p className="text-xs text-ink-muted">{t("legend")}</p>

      <SectionCard id="manques-titre" title={t("missingLevels")} subtitle={t("missingLevelsHint")}>
        <ul className="flex flex-wrap gap-2">
          {missingLevels.map((code) => (
            <li key={code}>
              <Link
                href={`/admin/referentiel?classe=${code}`}
                className="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm font-medium text-ink hover:border-brand-600"
              >
                {tLevels(code)}
              </Link>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}

export default async function AdminTrackingPage() {
  const t = await getTranslations("adminTracking");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <Tracking />
      </Suspense>
    </PageContainer>
  );
}
