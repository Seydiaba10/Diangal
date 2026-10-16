import { Check } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CycleDot } from "@/components/ui/level-badge";
import { cn } from "@/lib/cn";
import { cycleOf, isLevelCode, LEVEL_CODES, type LevelCode } from "@/lib/levels";

/** Classe choisie dans l'URL (?classe=CI), le CI par défaut. */
export function pickLevel(value: string | string[] | undefined): LevelCode {
  return typeof value === "string" && isLevelCode(value) ? value : "CI";
}

/** Les 13 classes du CI à la Terminale, en liens ; celles qui ont un programme portent une coche. */
export async function LevelTabs({ basePath, current, filled }: { basePath: string; current: LevelCode; filled?: Set<string> }) {
  const [t, tLevels] = await Promise.all([getTranslations("adminContent"), getTranslations("levels")]);
  return (
    <nav aria-label={t("classes")}>
      <ul className="flex flex-wrap gap-2">
        {LEVEL_CODES.map((code) => {
          const active = code === current;
          const cycle = cycleOf(code);
          return (
            <li key={code}>
              <Link
                href={`${basePath}?classe=${code}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium",
                  active ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface text-ink hover:border-brand-600",
                )}
              >
                {cycle ? <CycleDot cycle={cycle} className={active ? "ring-2 ring-white" : undefined} /> : null}
                {tLevels(code)}
                {filled?.has(code) ? (
                  <>
                    <Check className={cn("size-4", active ? "text-white" : "text-success-700")} aria-hidden />
                    <span className="sr-only">{t("hasProgram")}</span>
                  </>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
