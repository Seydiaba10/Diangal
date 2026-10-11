import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button, ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDecimal, formatFCFA } from "@/lib/format";
import type { SubjectCode, TutorCard, TutorFilters } from "@/types/domain";
import { parseTutorFilters, PRICE_STEPS, searchTutors, TUTOR_CITIES } from "../data";
import { ModeBadges, SubjectChips, TutorAvatar, TutorLocation, TutorRating, VerifiedBadge } from "./tutor-bits";

const SUBJECTS: SubjectCode[] = ["MATH", "FR", "ANG", "HG", "SVT", "PC", "EC", "LV2"];
const LEVELS = ["CI", "CP", "CE1", "CE2", "CM1", "CM2", "6E", "5E", "4E", "3E", "2NDE", "1RE", "TLE"] as const;

const SELECT_CLASS =
  "mt-1.5 h-12 w-full rounded-xl border border-line bg-surface px-3 text-sm text-ink focus:border-brand-600";

/** Formulaire GET sans JavaScript : les filtres vivent dans l'URL (partageable, mis en cache). */
async function FiltersForm({ filters, idPrefix }: { filters: TutorFilters; idPrefix: string }) {
  const [t, tSubjects, tLevels, tModes] = await Promise.all([
    getTranslations("tutors"),
    getTranslations("subjects"),
    getTranslations("levels"),
    getTranslations("tutors.modes"),
  ]);
  const field = (name: string) => `${idPrefix}-${name}`;
  return (
    <form action="/repetiteurs" className="space-y-4">
      <div>
        <label htmlFor={field("matiere")} className="text-sm font-medium text-ink">{t("subject")}</label>
        <select id={field("matiere")} name="matiere" defaultValue={filters.subject ?? ""} className={SELECT_CLASS}>
          <option value="">{t("anySubject")}</option>
          {SUBJECTS.map((code) => (
            <option key={code} value={code}>{tSubjects(code)}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={field("niveau")} className="text-sm font-medium text-ink">{t("level")}</label>
        <select id={field("niveau")} name="niveau" defaultValue={filters.level ?? ""} className={SELECT_CLASS}>
          <option value="">{t("anyLevel")}</option>
          {LEVELS.map((code) => (
            <option key={code} value={code}>{tLevels(code)}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={field("ville")} className="text-sm font-medium text-ink">{t("city")}</label>
        <select id={field("ville")} name="ville" defaultValue={filters.city ?? ""} className={SELECT_CLASS}>
          <option value="">{t("anyCity")}</option>
          {TUTOR_CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={field("mode")} className="text-sm font-medium text-ink">{t("mode")}</label>
        <select id={field("mode")} name="mode" defaultValue={filters.mode ?? ""} className={SELECT_CLASS}>
          <option value="">{t("anyMode")}</option>
          <option value="online">{tModes("online")}</option>
          <option value="home">{tModes("home")}</option>
        </select>
      </div>
      <div>
        <label htmlFor={field("prix")} className="text-sm font-medium text-ink">{t("price")}</label>
        <select id={field("prix")} name="prix" defaultValue={filters.priceMax ?? ""} className={SELECT_CLASS}>
          <option value="">{t("anyPrice")}</option>
          {PRICE_STEPS.map((price) => (
            <option key={price} value={price}>{formatFCFA(price)}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={field("note")} className="text-sm font-medium text-ink">{t("minRating")}</label>
        <select id={field("note")} name="note" defaultValue={filters.minRating ?? ""} className={SELECT_CLASS}>
          <option value="">{t("anyRating")}</option>
          {[4, 4.5].map((value) => (
            <option key={value} value={value}>{t("ratingOption", { value: formatDecimal(value) })}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={field("tri")} className="text-sm font-medium text-ink">{t("sort")}</label>
        <select id={field("tri")} name="tri" defaultValue={filters.sort} className={SELECT_CLASS}>
          {(["relevance", "price", "rating"] as const).map((sort) => (
            <option key={sort} value={sort}>{t(`sortOptions.${sort}`)}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-3 pt-1">
        <Button type="submit" className="flex-1">{t("apply")}</Button>
        <ButtonLink href="/repetiteurs" variant="ghost">{t("reset")}</ButtonLink>
      </div>
    </form>
  );
}

async function TutorResultCard({ tutor }: { tutor: TutorCard }) {
  const t = await getTranslations("tutors");
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <TutorAvatar name={tutor.displayName} className="size-14 text-lg" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-ink">
            <Link href={`/repetiteurs/${tutor.id}`} className="hover:text-brand-700 hover:underline">
              {tutor.displayName}
            </Link>
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <VerifiedBadge />
            <TutorRating tutor={tutor} />
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-ink-muted">{tutor.headline}</p>
      <div className="mt-3">
        <SubjectChips subjects={tutor.subjects} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <TutorLocation tutor={tutor} />
        <ModeBadges mode={tutor.mode} />
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4 sm:mt-auto">
        <p className="font-semibold text-ink">{t("perHour", { price: formatFCFA(tutor.hourlyRateFcfa) })}</p>
        <ButtonLink href={`/repetiteurs/${tutor.id}`} variant="outline" size="sm">
          {t("viewProfile")}
        </ButtonLink>
      </div>
    </article>
  );
}

export async function TutorSearch({ params }: { params: Record<string, string | string[] | undefined> }) {
  const filters = parseTutorFilters(params);
  const [tutors, t] = await Promise.all([searchTutors(filters), getTranslations("tutors")]);
  const activeCount = [filters.subject, filters.level, filters.city, filters.mode, filters.priceMax, filters.minRating].filter(
    Boolean,
  ).length;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-7">
      <aside>
        <details className="rounded-2xl border border-line bg-surface lg:hidden">
          <summary className="flex h-12 cursor-pointer items-center gap-2 px-4 font-medium text-ink">
            <SlidersHorizontal className="size-4" aria-hidden />
            {t("filters")}
            {activeCount > 0 ? (
              <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs text-white">{activeCount}</span>
            ) : null}
          </summary>
          <div className="border-t border-line p-4">
            <FiltersForm filters={filters} idPrefix="mobile" />
          </div>
        </details>
        <div className="hidden rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-6 lg:block">
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-ink">
            <SlidersHorizontal className="size-4" aria-hidden />
            {t("filters")}
          </h2>
          <FiltersForm filters={filters} idPrefix="desktop" />
        </div>
      </aside>

      <section aria-live="polite">
        <p className="text-sm font-medium text-ink-muted">{t("count", { count: tutors.length })}</p>
        {tutors.length > 0 ? (
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:gap-4 xl:grid-cols-2">
            {tutors.map((tutor) => (
              <li key={tutor.id}>
                <TutorResultCard tutor={tutor} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-2xl border border-dashed border-line bg-surface p-6 text-center text-sm text-ink-muted">
            {t("empty")}
          </p>
        )}
      </section>
    </div>
  );
}

export function TutorSearchSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-7">
      <Skeleton className="h-12 rounded-2xl lg:h-[560px]" />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-60 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
