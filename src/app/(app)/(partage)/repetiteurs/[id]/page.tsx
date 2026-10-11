import { GraduationCap, MessageSquareText } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ModeBadges,
  SubjectChips,
  TutorAvatar,
  TutorLocation,
  TutorRating,
  VerifiedBadge,
} from "@/features/tutors/components/tutor-bits";
import { TutorContactPanel, TutorContactSkeleton } from "@/features/tutors/components/tutor-contact";
import { getAllTutorIds, getTutor, getTutorName } from "@/features/tutors/data";

export async function generateStaticParams() {
  return getAllTutorIds();
}

export async function generateMetadata({ params }: PageProps<"/repetiteurs/[id]">) {
  return { title: await getTutorName((await params).id) };
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Card aria-labelledby={id} className="p-5">
      <h2 id={id} className="font-semibold text-ink">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </Card>
  );
}

async function TutorProfileContent({ params }: { params: PageProps<"/repetiteurs/[id]">["params"] }) {
  const tutor = await getTutor((await params).id);
  if (!tutor) notFound();
  const [t, tLevels, tBreadcrumb] = await Promise.all([
    getTranslations("tutor"),
    getTranslations("levels"),
    getTranslations("breadcrumb"),
  ]);
  const weekdays = [1, 2, 3, 4, 5, 6, 7] as const;

  return (
    <>
      <Breadcrumb items={[{ label: tBreadcrumb("tutors"), href: "/repetiteurs" }, { label: tutor.displayName }]} />

      {/* Mobile : en-tête → tarif et contact → détails. Desktop : contact en colonne droite. */}
      <div className="grid grid-cols-1 gap-4 [grid-template-areas:'header''contact''details'] lg:grid-cols-[minmax(0,1fr)_340px] lg:grid-rows-[auto_1fr] lg:gap-5 lg:[grid-template-areas:'header_contact''details_contact']">
          <Card className="p-5 [grid-area:header]">
            <div className="flex items-start gap-4">
              <TutorAvatar name={tutor.displayName} className="size-20 text-2xl" />
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight text-ink">{tutor.displayName}</h1>
                <p className="mt-1 text-sm text-ink-muted">{tutor.headline}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <VerifiedBadge />
                  <TutorRating tutor={tutor} />
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <TutorLocation tutor={tutor} />
              <ModeBadges mode={tutor.mode} />
              <span className="text-sm text-ink-muted">{t("experience", { years: tutor.yearsExperience })}</span>
            </div>
          </Card>

        <div className="space-y-4 [grid-area:details]">
          <Section id="a-propos" title={t("about")}>
            <p className="text-sm leading-relaxed text-ink">{tutor.bio}</p>
          </Section>

          <Section id="matieres" title={t("subjectsLevels")}>
            <SubjectChips subjects={tutor.subjects} />
            <p className="mt-3 text-sm text-ink-muted">
              <span className="font-medium text-ink">{t("levels")} : </span>
              {tutor.levels.map((code) => tLevels(code as Parameters<typeof tLevels>[0])).join(", ")}
            </p>
          </Section>

          <Section id="diplomes" title={t("qualifications")}>
            <ul className="space-y-3">
              {tutor.qualifications.map((q) => (
                <li key={q.title} className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-700">
                    <GraduationCap className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{q.title}</span>
                    <span className="block text-xs text-ink-muted">
                      {q.institution} · {q.year}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="disponibilites" title={t("availability")}>
            <ul className="divide-y divide-line">
              {weekdays.map((day) => {
                const slots = tutor.availability.filter((s) => s.weekday === day);
                return (
                  <li key={day} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                    <span className="font-medium text-ink">{t(`weekdays.d${day}`)}</span>
                    <span className="text-right text-ink-muted">
                      {slots.length > 0 ? slots.map((s) => t("slot", { start: s.start, end: s.end })).join(", ") : "—"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Section>

          <Section id="avis" title={t("reviews")}>
            <p className="flex items-center gap-2 text-sm text-ink-muted">
              <MessageSquareText className="size-4 shrink-0" aria-hidden />
              {t("noReviews")}
            </p>
          </Section>
        </div>

        <aside className="[grid-area:contact] lg:sticky lg:top-6 lg:self-start">
          <Suspense fallback={<TutorContactSkeleton />}>
            <TutorContactPanel tutor={tutor} />
          </Suspense>
        </aside>
      </div>
    </>
  );
}

export default function TutorPage({ params }: PageProps<"/repetiteurs/[id]">) {
  return (
    <PageContainer className="space-y-5">
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <TutorProfileContent params={params} />
      </Suspense>
    </PageContainer>
  );
}
