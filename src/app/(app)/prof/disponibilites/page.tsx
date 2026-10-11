import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { Skeleton } from "@/components/ui/skeleton";
import { saveAvailabilityAction } from "@/features/tutors/actions";
import { getDemoTutorProfile } from "@/features/tutors/data";

export async function generateMetadata() {
  const t = await getTranslations("tutorAvailability");
  return { title: t("title") };
}

const TIME_CLASS = "h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink focus:border-brand-600";

async function AvailabilityForm({ searchParams }: { searchParams: PageProps<"/prof/disponibilites">["searchParams"] }) {
  const [params, profile, t, tTutor] = await Promise.all([
    searchParams,
    getDemoTutorProfile(),
    getTranslations("tutorAvailability"),
    getTranslations("tutor"),
  ]);
  const weekdays = [1, 2, 3, 4, 5, 6, 7] as const;

  return (
    <form action={saveAvailabilityAction} className="space-y-4">
      {params.enregistre ? <Notice tone="success">{t("saved")}</Notice> : null}
      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {weekdays.map((day) => {
          const slot = profile.availability.find((s) => s.weekday === day);
          const dayName = tTutor(`weekdays.d${day}`);
          return (
            <li key={day} className="grid grid-cols-[1fr_auto] items-center gap-3 p-4 sm:grid-cols-[160px_1fr_1fr]">
              <label className="flex items-center gap-3 font-medium text-ink">
                <input type="checkbox" name={`d${day}-on`} defaultChecked={Boolean(slot)} className="size-5 accent-brand-600" />
                {dayName}
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-2">
                <div>
                  <label htmlFor={`d${day}-start`} className="text-xs text-ink-muted">
                    {t("from")}
                  </label>
                  <input id={`d${day}-start`} name={`d${day}-start`} type="time" defaultValue={slot?.start ?? "17:00"} className={TIME_CLASS} />
                </div>
                <div>
                  <label htmlFor={`d${day}-end`} className="text-xs text-ink-muted">
                    {t("to")}
                  </label>
                  <input id={`d${day}-end`} name={`d${day}-end`} type="time" defaultValue={slot?.end ?? "20:00"} className={TIME_CLASS} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-xs text-ink-muted">{t("hint")}</p>
      <Button type="submit">{t("save")}</Button>
    </form>
  );
}

export default async function TutorAvailabilityPage({ searchParams }: PageProps<"/prof/disponibilites">) {
  const t = await getTranslations("tutorAvailability");
  return (
    <PageContainer width="narrow" className="space-y-5">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-96 rounded-2xl" />}>
        <AvailabilityForm searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
