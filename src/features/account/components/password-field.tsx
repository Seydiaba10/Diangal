"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { passwordStrength } from "@/lib/password-rules";
import { PILL_INPUT } from "./auth-card";

/**
 * Champ de mot de passe en pilule, avec bouton « afficher » et, pour un nouveau mot de passe, la force
 * (4 barres et un libellé). Les libellés viennent de la page (messages/fr.json).
 */
export function PasswordField({
  id,
  name,
  label,
  showLabel,
  hideLabel,
  autoComplete,
  strengthLabels,
  invalid = false,
}: {
  id: string;
  name: string;
  label: string;
  showLabel: string;
  hideLabel: string;
  autoComplete: "current-password" | "new-password";
  /** Pour un nouveau mot de passe : libellés des niveaux 0 à 4. */
  strengthLabels?: string[];
  invalid?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const level = passwordStrength(value);
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-brand-800">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          required
          maxLength={128}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={invalid || undefined}
          className={cn(PILL_INPUT, "pr-14", invalid && "border-danger-700")}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
          className="absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:text-ink"
        >
          {visible ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
        </button>
      </div>
      {strengthLabels && value ? (
        <div className="mt-2 space-y-1.5" aria-live="polite">
          <div className="flex gap-1" aria-hidden>
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className={cn("h-1.5 flex-1 rounded-full", n <= level ? "bg-brand-600" : "bg-line")} />
            ))}
          </div>
          <p className="text-[13px] font-semibold text-brand-800">{strengthLabels[level]}</p>
        </div>
      ) : null}
    </div>
  );
}
