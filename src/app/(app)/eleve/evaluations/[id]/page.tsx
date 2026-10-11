import { CircleCheck, ClipboardList, Scale, Timer, Trophy } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Badge, PremiumBadge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SubjectIcon } from "@/components/ui/subject-icon";
import { getCurrentStudent } from "@/features/account/data";
import { startAttemptAction } from "@/features/assessments/actions";
import { getAllAssessmentIds, getAssessment, getAssessmentBestScore } from "@/features/assessments/data";
import { PaywallCard } from "@/features/payments/components/paywall-card";
import { formatDuration, formatScore } from "@/lib/format";
import type { AssessmentSummary } from "@/types/domain";

export async function generateStaticParams() {
  return getAllAssessmentIds();
}

export async function generateMetadata({ params }: PageProps<"/eleve/evaluations/[id]">) {
  return { title: (await getAssessment((await params).id))?.title };
}

function InfoTile({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <span className="text-brand-700">{icon}</span>
      <p className="mt-2 text-xs text-ink-muted">{label}</p>
      <p className="font-semibold text-ink">{value}</p>
    </div>
  );
}

/** Partie propre à l'élève : accès Premium, meilleure note et bouton de démarrage. */
async function StartPanel({ assessment }: { assessment: AssessmentSummary }) {
  const [student, best, t, tAssessment] = await Promise.all([
    getCurrentStudent(),
    getAssessmentBestScore(assessment.id),
    getTranslations("intro"),
    getTranslations("assessment"),
  ]);
  if (assessment.isPremium && !student.isPremium) return <PaywallCard title={t("lockedTitle")} />;

  return (
    <div className="space-y-3">
      {best !== null ? (
        <p className="flex items-center justify-center gap-2 text-sm font-medium text-ink">
          <Trophy className="size-4 text-premium-500" aria-hidden />
          {tAssessment("bestScore", { score: formatScore(best) })}
        </p>
      ) : null}
      <form action={startAttemptAction.bind(null, assessment.id)}>
        <Button type="submit" className="w-full">
          {assessment.durationS ? t("startQuiz") : t("startExercise")}
        </Button>
      </form>
    </div>
  );
}

async function AssessmentIntro({ params }: { params: PageProps<"/eleve/evaluations/[id]">["params"] }) {
  const assessment = await getAssessment((await params).id);
  if (!assessment) notFound();
  const [t, tAssessment, tBreadcrumb] = await Promise.all([
    getTranslations("intro"),
    getTranslations("assessment"),
    getTranslations("breadcrumb"),
  ]);
  const timed = assessment.durationS !== null;
  const rules = timed
    ? (["timer", "saved", "auto", "online", "correction"] as const)
    : (["practice", "saved", "correction"] as const);

  return (
    <>
      <Breadcrumb items={[{ label: tBreadcrumb("practice"), href: "/eleve/entrainement" }, { label: assessment.title }]} />

      <header className="flex items-start gap-4">
        <SubjectIcon code={assessment.subject.code} size="lg" />
        <div className="min-w-0">
          <div className="flex flex-wrap gap-1.5">
            <Badge tone={timed ? "brand" : "info"} icon={Timer}>
              {tAssessment(`kind.${assessment.kind}`)}
            </Badge>
            {assessment.isPremium ? <PremiumBadge /> : null}
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">{assessment.title}</h1>
          {assessment.chapterHref ? (
            <Link href={assessment.chapterHref} className="mt-1 inline-block text-sm text-brand-700 hover:underline">
              {t("chapterLink", { title: assessment.chapterTitle ?? "" })}
            </Link>
          ) : null}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3">
        <InfoTile
          icon={<Timer className="size-5" aria-hidden />}
          label={t("duration")}
          value={timed ? formatDuration(assessment.durationS!) : t("untimed")}
        />
        <InfoTile
          icon={<ClipboardList className="size-5" aria-hidden />}
          label={t("questions")}
          value={String(assessment.questionsCount)}
        />
        <InfoTile icon={<Scale className="size-5" aria-hidden />} label={t("scale")} value={t("scaleValue")} />
      </div>

      <Card aria-labelledby="consignes-titre" className="p-5">
        <h2 id="consignes-titre" className="font-semibold text-ink">
          {t("rulesTitle")}
        </h2>
        <ul className="mt-3 space-y-2.5">
          {rules.map((rule) => (
            <li key={rule} className="flex gap-2.5 text-sm text-ink">
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
              {t(`rules.${rule}`)}
            </li>
          ))}
        </ul>
      </Card>

      <Suspense fallback={<Skeleton className="h-12" />}>
        <StartPanel assessment={assessment} />
      </Suspense>
    </>
  );
}

export default function AssessmentIntroPage({ params }: PageProps<"/eleve/evaluations/[id]">) {
  return (
    <PageContainer width="narrow" className="space-y-5">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <AssessmentIntro params={params} />
      </Suspense>
    </PageContainer>
  );
}
