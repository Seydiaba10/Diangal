"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegments } from "next/navigation";
import { cn } from "@/lib/cn";
import { PROFILE_PHOTOS, type LoginProfile } from "../profile-photos";

const ORDER: LoginProfile[] = ["eleve", "parent", "repetiteur"];
const HREF: Record<LoginProfile, string> = {
  eleve: "/connexion?profil=eleve",
  parent: "/connexion?profil=parent",
  repetiteur: "/connexion/repetiteur",
};

export interface ProfilePickerLabels {
  names: Record<LoginProfile, string>;
  alts: Record<LoginProfile, string>;
}

/** Profil affiché comme choisi, d'après l'adresse : page des répétiteurs, ?profil=, ?role= de l'inscription. */
export function useCurrentProfile(): LoginProfile {
  const segments = useSelectedLayoutSegments();
  const params = useSearchParams();
  if (segments.includes("repetiteur") || params.get("role") === "tutor") return "repetiteur";
  if (params.get("profil") === "eleve" || params.get("role") === "student") return "eleve";
  return "parent";
}

/** Trois cartes avec la photo de chaque profil ; à placer sous <Suspense> (lit l'adresse). */
export function ProfilePicker({ labels, size = "compact" }: { labels: ProfilePickerLabels; size?: "compact" | "panel" }) {
  const current = useCurrentProfile();
  return <ProfileCards labels={labels} size={size} current={current} />;
}

/** Version sans lecture de l'adresse (repli de Suspense, ou profil connu du serveur). */
export function ProfileCards({ labels, size = "compact", current }: { labels: ProfilePickerLabels; size?: "compact" | "panel"; current: LoginProfile | null }) {
  return (
    <ul className="grid grid-cols-3 gap-2">
      {ORDER.map((profile) => {
        const on = profile === current;
        return (
          <li key={profile} className="min-w-0">
            <Link
              href={HREF[profile]}
              aria-current={on ? "true" : undefined}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-2xl bg-surface transition-colors",
                on ? "border-[2.5px] border-brand-600 bg-cycle-middle-soft" : "border border-line hover:border-brand-100",
              )}
            >
              {on ? (
                <span aria-hidden className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-cycle-middle text-ink">
                  <Check className="size-4" />
                </span>
              ) : null}
              <Image
                src={PROFILE_PHOTOS[profile]}
                alt={labels.alts[profile]}
                width={199}
                height={149}
                loading="eager"
                className="aspect-[4/3] w-full object-cover object-[center_30%]"
              />
              <span className={cn("px-0.5 pb-2.5 pt-2 text-center font-semibold", size === "panel" ? "text-[15px]" : "text-[13px]", on ? "text-brand-800" : "text-ink")}>
                {labels.names[profile]}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
