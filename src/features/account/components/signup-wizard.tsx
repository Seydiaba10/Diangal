"use client";

import { ArrowLeft, ArrowRight, BookOpen, CircleAlert, GraduationCap, Info, Mail, MessageCircle, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState, useTransition, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CycleDot } from "@/components/ui/level-badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { cn } from "@/lib/cn";
import { CYCLE_STYLES, CYCLES, SERIES_BY_LEVEL, type LevelCode } from "@/lib/levels";
import type { AppRole, SubjectCode } from "@/types/domain";
import { completeSignupAction, requestSignupCodeAction, type SignupError, type SignupInput } from "../actions";
import { INPUT_CLASS } from "./auth-card";

type SignupRole = Exclude<AppRole, "admin">;

const SUBJECTS: SubjectCode[] = ["MATH", "FR", "ANG", "HG", "SVT", "PC", "EC", "LV2"];

const ROLE_OPTIONS: { role: SignupRole; icon: typeof Users }[] = [
  { role: "student", icon: GraduationCap },
  { role: "parent", icon: Users },
  { role: "tutor", icon: BookOpen },
];

// Le compte est créé à l'envoi du code : la classe et la date de naissance doivent être connues avant.
const STEPS = ["role", "profile", "details", "consent", "identifier", "code"] as const;

const ERROR_KEYS: Record<SignupError, string> = {
  invalid: "generic",
  limit: "limit",
  sms: "sms",
  whatsapp: "whatsapp",
  send: "send",
  profile: "profile",
  code: "wrongCode",
};

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

export function SignupWizard({
  initialRole,
  whatsappEnabled,
  emailCode,
  demo,
}: {
  initialRole: SignupRole | null;
  /** Code envoyé sur WhatsApp possible (fonction send-sms + WhatsApp Business). */
  whatsappEnabled: boolean;
  /** L'email contient un code à 6 chiffres ; sinon, un lien à ouvrir sur l'appareil. */
  emailCode: boolean;
  demo: boolean;
}) {
  const t = useTranslations("signup");
  const tLevels = useTranslations("levels");
  const tCycles = useTranslations("cycles");
  const tSubjects = useTranslations("subjects");
  const [step, setStep] = useState(initialRole ? 1 : 0);
  const [role, setRole] = useState<SignupRole>(initialRole ?? "student");
  // Moyens ouverts, du plus courant au Sénégal au plus universel.
  // Code par WhatsApp (quand il est branché) ou par email : pas de SMS.
  const methods: SignupInput["method"][] = [...(whatsappEnabled ? (["whatsapp"] as const) : []), "email"];
  const [method, setMethod] = useState<SignupInput["method"]>(methods[0]!);
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [level, setLevel] = useState<LevelCode>("3E");
  const [series, setSeries] = useState("");
  const [childCode, setChildCode] = useState("");
  const [city, setCity] = useState("");
  const [subjects, setSubjects] = useState<SubjectCode[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [parentPhone, setParentPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const minor = role === "student" && isMinor(birthDate);
  const current = STEPS[step]!;
  const linkMode = !demo && method === "email" && !emailCode;

  const input = (): SignupInput => ({
    role,
    method,
    identifier,
    firstName,
    lastName,
    birthDate,
    levelCode: level,
    seriesCode: series,
    city,
    subjects,
    childCode,
    parentPhone: minor ? parentPhone : "",
    acceptTerms,
  });

  const validate = (): string | null => {
    switch (current) {
      case "profile":
        if (!firstName.trim() || !lastName.trim()) return t("errors.name");
        if (role === "student" && !birthDate) return t("errors.birthDate");
        if (role === "tutor" && !city.trim()) return t("errors.city");
        return null;
      case "details":
        if (role === "student" && SERIES_BY_LEVEL[level] && !series) return t("errors.series");
        if (role === "tutor" && subjects.length === 0) return t("errors.subjects");
        return null;
      case "consent":
        if (!acceptTerms) return t("errors.terms");
        if (minor && parentPhone.replace(/\D/g, "").length !== 9) return t("errors.parentPhone");
        return null;
      case "identifier":
        if (method !== "email" && identifier.replace(/\D/g, "").length !== 9) return t("errors.phone");
        if (method === "email" && !/^\S+@\S+\.\S+$/.test(identifier)) return t("errors.email");
        return null;
      case "code":
        return /^\d{6}$/.test(code.replace(/\s/g, "")) ? null : t("errors.code");
      default:
        return null;
    }
  };

  const showError = (key: SignupError) => setError(t(`errors.${ERROR_KEYS[key]}` as "errors.generic"));

  const next = () => {
    const problem = validate();
    setError(problem);
    if (problem) return;
    if (current === "identifier") {
      startTransition(async () => {
        const result = await requestSignupCodeAction(input());
        if (result.error) showError(result.error);
        else setStep(step + 1);
      });
      return;
    }
    if (current === "code") {
      startTransition(async () => {
        const result = await completeSignupAction({ ...input(), code });
        if (result?.error) showError(result.error);
      });
      return;
    }
    setStep(step + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-ink-muted">
        <span>{t("step", { current: step + 1, total: STEPS.length })}</span>
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
      <ProgressBar value={((step + 1) / STEPS.length) * 100} label={t("step", { current: step + 1, total: STEPS.length })} className="mt-2" />

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
            {/* Classes groupées par cycle, aux couleurs du drapeau : vert, jaune, rouge. */}
            <fieldset>
              <legend className="text-sm font-medium text-ink">{t("fields.level")}</legend>
              <div className="mt-2 space-y-3">
                {CYCLES.map((cycle) => (
                  <div key={cycle.key}>
                    <p className="flex items-center gap-2 text-xs font-semibold text-ink-muted">
                      <CycleDot cycle={cycle.key} />
                      {tCycles(cycle.key)}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {cycle.levels.map((l) => (
                        <label
                          key={l}
                          className={cn(
                            "flex h-11 min-w-12 cursor-pointer items-center justify-center rounded-full border-2 px-4 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600 has-[:focus-visible]:ring-offset-2",
                            level === l
                              ? [CYCLE_STYLES[cycle.key].solid, CYCLE_STYLES[cycle.key].onSolid, "border-transparent"]
                              : "border-line bg-surface text-ink hover:bg-canvas",
                          )}
                        >
                          <input
                            type="radio"
                            name="niveau"
                            value={l}
                            checked={level === l}
                            onChange={() => {
                              setLevel(l);
                              setSeries("");
                            }}
                            className="sr-only"
                          />
                          {tLevels(l)}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
            {SERIES_BY_LEVEL[level] ? (
              <Field id="serie" label={t("fields.series")}>
                <select id="serie" value={series} onChange={(e) => setSeries(e.target.value)} className={INPUT_CLASS}>
                  <option value="">{t("fields.chooseSeries")}</option>
                  {SERIES_BY_LEVEL[level].map((s) => (
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

        {current === "identifier" ? (
          <>
            {methods.length > 1 ? (
              <div className="flex gap-1 rounded-xl bg-canvas p-1">
                {methods.map((m) => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={method === m}
                    onClick={() => {
                      setMethod(m);
                      setIdentifier("");
                    }}
                    className={cn(
                      "flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg text-sm font-medium",
                      method === m ? "bg-surface text-ink shadow-sm" : "text-ink-muted",
                    )}
                  >
                    {m === "whatsapp" ? <MessageCircle className="size-4" aria-hidden /> : <Mail className="size-4" aria-hidden />}
                    {t(`methods.${m === "phone" ? "whatsapp" : m}`)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ink-muted">{t("hints.emailOnly")}</p>
            )}
            {method !== "email" ? (
              <Field id="tel" label={t("fields.phone")} hint={t("hints.whatsapp")}>
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
            {linkMode ? (
              <p className="rounded-xl bg-brand-50 p-3 text-sm font-medium text-brand-800">{t("hints.linkSent", { to: identifier })}</p>
            ) : null}
            <Field
              id="otp"
              label={t("fields.code")}
              hint={linkMode ? t("hints.codeExpiry") : `${t("hints.code", { to: identifier })} ${t("hints.codeExpiry")}`}
            >
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
            {demo ? (
              <p className="flex gap-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-800">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
                {t("hints.demoCode")}
              </p>
            ) : null}
          </>
        ) : null}

        {error ? (
          <p role="alert" className="flex items-center gap-1.5 text-sm font-medium text-danger-700">
            <CircleAlert className="size-4 shrink-0" aria-hidden />
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isPending}>
          {current === "code" ? t("finish") : current === "identifier" ? t("sendCode") : t("continue")}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </form>
    </div>
  );
}
