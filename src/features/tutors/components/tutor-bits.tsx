import { MapPin, ShieldCheck, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { formatDecimal } from "@/lib/format";
import { SUBJECT_STYLES } from "@/lib/subjects";
import type { SubjectCode, TutorCard } from "@/types/domain";

const AVATAR_TONES = ["bg-pastel-mint", "bg-pastel-cream", "bg-pastel-sand", "bg-pastel-sage", "bg-pastel-lavender"];

/** Initiales sur fond pastel (la photo du répétiteur viendra après validation par l'admin). */
export function TutorAvatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const tone = AVATAR_TONES[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_TONES.length];
  return (
    <span
      aria-hidden
      className={cn("flex shrink-0 items-center justify-center rounded-full font-semibold text-ink", tone, className)}
    >
      {initials}
    </span>
  );
}

export async function VerifiedBadge() {
  const t = await getTranslations("tutors");
  return (
    <Badge tone="success" icon={ShieldCheck}>
      {t("verified")}
    </Badge>
  );
}

export async function TutorRating({ tutor }: { tutor: Pick<TutorCard, "ratingAvg" | "ratingCount"> }) {
  const t = await getTranslations("tutors");
  if (tutor.ratingAvg === null) return <Badge tone="brand">{t("new")}</Badge>;
  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium text-ink">
      <Star className="size-4 fill-premium-500 text-premium-500" aria-hidden />
      {t("rating", { rating: formatDecimal(tutor.ratingAvg), count: tutor.ratingCount })}
    </span>
  );
}

export async function SubjectChips({ subjects }: { subjects: SubjectCode[] }) {
  const t = await getTranslations("subjects");
  return (
    <ul className="flex flex-wrap gap-1.5">
      {subjects.map((code) => (
        <li
          key={code}
          className={cn("rounded-full px-2.5 py-1 text-xs font-medium", SUBJECT_STYLES[code].soft, SUBJECT_STYLES[code].text)}
        >
          {t(code)}
        </li>
      ))}
    </ul>
  );
}

export function TutorLocation({ tutor }: { tutor: Pick<TutorCard, "city" | "neighborhood"> }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-ink-muted">
      <MapPin className="size-4 shrink-0" aria-hidden />
      {tutor.neighborhood ? `${tutor.city} · ${tutor.neighborhood}` : tutor.city}
    </span>
  );
}

export async function ModeBadges({ mode }: { mode: TutorCard["mode"] }) {
  const t = await getTranslations("tutors.modes");
  const modes = mode === "both" ? (["online", "home"] as const) : ([mode] as const);
  return (
    <span className="flex flex-wrap gap-1.5">
      {modes.map((m) => (
        <Badge key={m} tone="idle">
          {t(m)}
        </Badge>
      ))}
    </span>
  );
}
