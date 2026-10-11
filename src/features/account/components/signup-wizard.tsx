"use client";

import { ArrowLeft, ArrowRight, BookOpen, CircleAlert, GraduationCap, Info, Mail, Smartphone, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useTransition, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";
import type { AppRole, SubjectCode } from "@/types/domain";
import { completeSignupAction } from "../actions";
import { INPUT_CLASS } from "./auth-card";

type SignupRole = Exclude<AppRole, "admin">;

const LEVELS = ["CI", "CP", "CE1", "CE2", "CM1", "CM2", "6E", "5E", "4E", "3E", "2NDE", "1RE", "TLE"] as const;
const SERIES: Partial<Record<(typeof LEVELS)[number], string[]>> = {
  "2NDE": ["L", "S"],
  "1RE": ["L1", "L2", "L'", "S1", "S2", "S3", "S4", "S5", "G", "T1", "T2"],
  TLE: ["L1", "L2", "L'", "S1", "S2", "S3", "S4", "S5", "G", "T1", "T2"],
};
const SUBJECTS: SubjectCode[] = ["MATH", "FR", "ANG", "HG", "SVT", "PC", "EC", "LV2"];

const ROLE_OPTIONS: { role: SignupRole; icon: typeof Users }[] = [
  { role: "student", icon: GraduationCap },
  { role: "parent", icon: Users },
  { role: "tutor", icon: BookOpen },
];

function isMinor(birthDate: string): boolean {
  const birth = Date.parse(birthDate);
  if (Number.isNaN(birth)) return false;
  const eighteen = new Date(birth);
  eighteen.setFullYear(eighteen.getFullYear() + 18);
  return eighteen.getTime() > Date.now();
}

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint ? <p className="mt-1.5 text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}

export function SignupWizard({ initialRole }: { initialRole: SignupRole | null }) {
  const t = useTranslations("signup");
  const tLevels = useTranslations("levels");
  const tSubjects = useTranslations("subjects");
  const [step, setStep] = useState(initialRole ? 1 : 0);
  const [role, setRole] = useState<SignupRole>(initialRole ?? "student");
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("3E");
  const [series, setSeries] = useState("");
  const [childCode, setChildCode] = useState("");
  const [city, setCity] = useState("");
  const [subjects, setSubjects] = useState<SubjectCode[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [parentPhone, setParentPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const minor = role === "student" && isMinor(birthDate);
  const steps = ["role", "identifier", "code", "profile", "details", "consent"] as const;
  const current = steps[step]!;

  const validate = (): string | null => {
    switch (current) {
      case "identifier":
        if (method === "phone" && identifier.replace(/\D/g, "").length !== 9) return t("errors.phone");
        if (method === "email" && !/^\S+@\S+\.\S+$/.test(identifier)) return t("errors.email");
        return null;
      case "code":
        return /^\d{6}$/.test(code.replace(/\s/g, "")) ? null : t("errors.code");
      case "profile":
        if (!firstName.trim() || !lastName.trim()) return t("errors.name");
        if (role === "student" && !birthDate) return t("errors.birthDate");
        if (role === "tutor" && !city.trim()) return t("errors.city");
        return null;
      case "details":
        if (role === "student" && SERIES[level] && !series) return t("errors.series");
        if (role === "tutor" && subjects.length === 0) return t("errors.subjects");
        return null;
      case "consent":
        if (!acceptTerms) return t("errors.terms");
        if (minor && parentPhone.replace(/\D/g, "").length !== 9) return t("errors.parentPhone");
        return null;
      default:
        return null;
    }
  };

  const next = () => {
    const problem = validate();
    setError(problem);
    if (problem) return;
    if (current !== "consent") {
      setStep(step + 1);
      return;
    }
    startTransition(async () => {
      const result = await completeSignupAction({ role, firstName, code });
      if (result?.error === "code") {
        setStep(steps.indexOf("code"));
        setError(t("errors.wrongCode"));
      } else if (result?.error) {
        setError(t("errors.generic"));
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-ink-muted">
        <span>{t("step", { current: step + 1, total: steps.length })}</span>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setError(null);
              setStep(step - 1);
            }}
            className="inline-flex h-10 items-center gap-1 rounded-lg px-2 font-medium text-brand-700 hover:bg-brand-50"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("back")}
          </button>
        ) : null}
      </div>
      <ProgressBar value={((step + 1) / steps.length) * 100} label={t("step", { current: step + 1, total: steps.length })} className="mt-2" />

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <h2 className="text-lg font-semibold text-ink">{t(`titles.${current}`)}</h2>

        {current === "role" ? (
          <fieldset className="space-y-3">
            <legend className="sr-only">{t("titles.role")}</legend>
            {ROLE_OPTIONS.map(({ role: option, icon: Icon }) => (
              <label
                key={option}
                className={cn(
                  "flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-colors",
                  role === option ? "border-brand-600 bg-brand-50" : "border-line hover:border-brand-100",
                )}
              >
                <input
                  type="radio"
                  name="role"
                  value={option}
                  checked={role === option}
                  onChange={() => setRole(option)}
                  className="sr-only"
                />
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface text-brand-700">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold text-ink">{t(`roles.${option}.title`)}</span>
                  <span className="block text-sm text-ink-muted">{t(`roles.${option}.body`)}</span>
                </span>
              </label>
            ))}
          </fieldset>
        ) : null}

        {current === "identifier" ? (
          <>
            <div className="flex gap-1 rounded-xl bg-canvas p-1">
              {(["phone", "email"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={method === m}
                  onClick={() => {
                    setMethod(m);
                    setIdentifier("");
                  }}
                  className={cn(
                    "flex h-11 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-medium",
                    method === m ? "bg-surface text-ink shadow-sm" : "text-ink-muted",
                  )}
                >
                  {m === "phone" ? <Smartphone className="size-4" aria-hidden /> : <Mail className="size-4" aria-hidden />}
                  {t(`methods.${m}`)}
                </button>
              ))}
            </div>
            {method === "phone" ? (
              <Field id="tel" label={t("fields.phone")} hint={t("hints.phone")}>
                <div className="flex gap-2">
                  <span className="flex h-12 items-center rounded-xl border border-line bg-canvas px-3 font-medium text-ink">+221</span>
                  <input
                    id="tel"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className={INPUT_CLASS}
                  />
                </div>
              </Field>
            ) : (
              <Field id="email" label={t("fields.email")}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={INPUT_CLASS}
                />
              </Field>
            )}
          </>
        ) : null}

        {current === "code" ? (
          <>
            <Field id="otp" label={t("fields.code")} hint={t("hints.code", { to: identifier })}>
              <input
                id="otp"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={7}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={cn(INPUT_CLASS, "text-center text-2xl font-semibold tracking-[0.5em]")}
              />
            </Field>
            <p className="flex gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-800">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              {t("hints.demoCode")}
            </p>
          </>
        ) : null}

        {current === "profile" ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="prenom" label={t("fields.firstName")}>
                <input id="prenom" autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={INPUT_CLASS} />
              </Field>
              <Field id="nom" label={t("fields.lastName")}>
                <input id="nom" autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className={INPUT_CLASS} />
              </Field>
            </div>
            {role === "student" ? (
              <Field id="naissance" label={t("fields.birthDate")} hint={t("hints.birthDate")}>
                <input id="naissance" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className={INPUT_CLASS} />
              </Field>
            ) : null}
            {role === "tutor" ? (
              <Field id="ville" label={t("fields.city")}>
                <input id="ville" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} className={INPUT_CLASS} />
              </Field>
            ) : null}
          </>
        ) : null}

        {current === "details" && role === "student" ? (
          <>
            <Field id="niveau" label={t("fields.level")}>
              <select
                id="niveau"
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value as (typeof LEVELS)[number]);
                  setSeries("");
                }}
                className={INPUT_CLASS}
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {tLevels(l)}
                  </option>
                ))}
              </select>
            </Field>
            {SERIES[level] ? (
              <Field id="serie" label={t("fields.series")}>
                <select id="serie" value={series} onChange={(e) => setSeries(e.target.value)} className={INPUT_CLASS}>
                  <option value="">{t("fields.chooseSeries")}</option>
                  {SERIES[level]!.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            ) : null}
          </>
        ) : null}

        {current === "details" && role === "parent" ? (
          <Field id="code-eleve" label={t("fields.childCode")} hint={t("hints.childCode")}>
            <input id="code-eleve" autoCapitalize="characters" value={childCode} onChange={(e) => setChildCode(e.target.value)} className={INPUT_CLASS} />
          </Field>
        ) : null}

        {current === "details" && role === "tutor" ? (
          <fieldset>
            <legend className="text-sm font-medium text-ink">{t("fields.subjects")}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {SUBJECTS.map((s) => {
                const checked = subjects.includes(s);
                return (
                  <label
                    key={s}
                    className={cn(
                      "flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium",
                      checked ? "border-brand-600 bg-brand-50 text-brand-700" : "border-line text-ink-muted",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => setSubjects(checked ? subjects.filter((x) => x !== s) : [...subjects, s])}
                      className="accent-brand-600"
                    />
                    {tSubjects(s)}
                  </label>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-ink-muted">{t("hints.tutorReview")}</p>
          </fieldset>
        ) : null}

        {current === "consent" ? (
          <>
            {minor ? (
              <div className="rounded-2xl bg-premium-50 p-4">
                <p className="font-semibold text-premium-700">{t("minor.title")}</p>
                <p className="mt-1 text-sm text-ink">{t("minor.body")}</p>
                <div className="mt-3">
                  <Field id="tel-parent" label={t("fields.parentPhone")}>
                    <div className="flex gap-2">
                      <span className="flex h-12 items-center rounded-xl border border-line bg-surface px-3 font-medium text-ink">+221</span>
                      <input
                        id="tel-parent"
                        type="tel"
                        inputMode="numeric"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        className={INPUT_CLASS}
                      />
                    </div>
                  </Field>
                </div>
              </div>
            ) : null}
            <label className="flex cursor-pointer gap-3 text-sm text-ink">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-brand-600"
              />
              <span>
                {t("consent.terms")}{" "}
                <Link href="/cgu" className="font-medium text-brand-700 underline" target="_blank">
                  {t("consent.termsLink")}
                </Link>{" "}
                {t("consent.and")}{" "}
                <Link href="/confidentialite" className="font-medium text-brand-700 underline" target="_blank">
                  {t("consent.privacyLink")}
                </Link>
              </span>
            </label>
            <p className="text-xs text-ink-muted">{t("consent.dataNote")}</p>
          </>
        ) : null}

        {error ? (
          <p role="alert" className="flex items-center gap-1.5 text-sm font-medium text-danger-700">
            <CircleAlert className="size-4 shrink-0" aria-hidden />
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isPending}>
          {current === "consent" ? t("finish") : t("continue")}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </form>
    </div>
  );
}
