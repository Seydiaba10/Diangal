"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Code à 6 chiffres affiché en 6 cases. Un seul vrai champ (transparent, posé sur les cases) : clavier
 * numérique du téléphone, collage d'un code, gestionnaires de mots de passe et lecteurs d'écran
 * fonctionnent comme avec un champ ordinaire. Code PIN : chiffres masqués par un point.
 */
export function PinBoxes({
  name,
  label,
  secret = true,
  invalid = false,
  autoFocus = false,
  describedBy,
  id,
}: {
  name: string;
  /** Libellé accessible (le libellé visible est à côté, relié par id). */
  label?: string;
  /** Code PIN (masqué) ou code reçu par message (visible). */
  secret?: boolean;
  invalid?: boolean;
  autoFocus?: boolean;
  describedBy?: string;
  id?: string;
}) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <div aria-hidden className="flex justify-between gap-2">
        {Array.from({ length: 6 }, (_, i) => {
          const active = focused && !invalid && i === Math.min(value.length, 5);
          return (
            <span
              key={i}
              className={cn(
                "flex h-14 min-w-0 max-w-14 flex-1 items-center justify-center rounded-xl border-[1.5px] text-[22px] font-bold text-ink",
                invalid ? "border-danger-700 bg-danger-50" : active ? "border-2 border-brand-600 bg-surface" : "border-line bg-surface",
              )}
            >
              {i < value.length ? secret ? <span className="size-3.5 rounded-full bg-ink" /> : value[i] : null}
            </span>
          );
        })}
      </div>
      <input
        id={inputId}
        name={name}
        type={secret ? "password" : "text"}
        inputMode="numeric"
        autoComplete={secret ? "off" : "one-time-code"}
        pattern="[0-9]{6}"
        maxLength={6}
        required
        autoFocus={autoFocus}
        aria-label={label}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        value={value}
        onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="absolute inset-0 h-full w-full cursor-text rounded-xl text-transparent caret-transparent opacity-0 focus-visible:outline-none"
      />
    </div>
  );
}
