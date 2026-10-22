import type { ChangeEvent } from "react";
import { cn } from "@/lib/cn";
import type { DialCountry } from "@/lib/phone";

const REGION_NAMES = new Intl.DisplayNames(["fr"], { type: "region" });

/**
 * Indicatif du pays devant un champ de téléphone : « +221 » fixe si seul le Sénégal est ouvert,
 * sinon une liste (pays ouverts par le serveur). Utilisable en formulaire serveur (name) ou contrôlé.
 */
export function DialCodeSelect({
  countries,
  label,
  name,
  value,
  defaultValue,
  onChange,
  className,
}: {
  countries: readonly Pick<DialCountry, "iso" | "dial">[];
  /** Libellé accessible de la liste (« Indicatif du pays »). */
  label: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (dial: string) => void;
  className?: string;
}) {
  const box = cn("flex h-12 shrink-0 items-center rounded-xl border border-line bg-canvas px-3 font-medium text-ink", className);
  if (countries.length <= 1) {
    const dial = countries[0]?.dial ?? "221";
    return (
      <>
        {name ? <input type="hidden" name={name} value={dial} /> : null}
        <span className={box}>+{dial}</span>
      </>
    );
  }
  return (
    <select
      name={name}
      aria-label={label}
      value={value}
      defaultValue={value === undefined ? (defaultValue ?? countries[0]!.dial) : undefined}
      onChange={onChange ? (e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value) : undefined}
      className={cn(box, "w-28 cursor-pointer bg-surface pr-1 text-sm")}
    >
      {countries.map((c) => (
        <option key={c.iso} value={c.dial}>
          +{c.dial} {REGION_NAMES.of(c.iso)}
        </option>
      ))}
    </select>
  );
}
