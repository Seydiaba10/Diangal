"use client";

import { ArrowLeft, ArrowRight, BookOpen, Check, CircleAlert, Flag, PencilLine, Timer, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { SpeakButton } from "@/components/ui/read-aloud";
import { hasReadAloud } from "@/lib/levels";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { RichText } from "@/components/ui/rich-text";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { formatClock } from "@/lib/format";
import { SELF_CHECK_RETRY, SELF_CHECK_SUCCESS } from "@/lib/grading";
import type { AnswerMap, AnswerValue, AttemptSession, PlayerQuestion } from "@/types/domain";
import { submitAttemptAction } from "../actions";

const STORAGE_PREFIX = "diangal:tentative:";

function loadAnswers(attemptId: string): AnswerMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + attemptId);
    return raw ? (JSON.parse(raw) as AnswerMap) : {};
  } catch {
    return {};
  }
}

function storeAnswers(attemptId: string, answers: AnswerMap | null) {
  try {
    if (answers) window.localStorage.setItem(STORAGE_PREFIX + attemptId, JSON.stringify(answers));
    else window.localStorage.removeItem(STORAGE_PREFIX + attemptId);
  } catch {
    // Stockage indisponible (navigation privée) : les réponses restent en mémoire.
  }
}

function isAnswered(value: AnswerValue | undefined): boolean {
  return Array.isArray(value) ? value.length > 0 : Boolean(value?.trim());
}

const subscribeNoop = () => () => {};

interface AttemptPlayerProps {
  session: AttemptSession;
}

/** Texte d'un fragment HTML pour la lecture à voix haute : descriptions des figures comprises, sans les pointillés. */
function plainText(html: string): string {
  return html
    .replace(/<img[^>]*\balt="([^"]*)"[^>]*>/g, " $1. ")
    // Dessin SVG : sa description, pas les nombres écrits dedans.
    .replace(/<svg[^>]*\baria-label="([^"]*)"[^>]*>[\s\S]*?<\/svg>/g, " $1. ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/[.…]{3,}/g, " … ");
}

/** Les réponses sauvegardées ne sont lues qu'après le montage, pour éviter un écart d'hydratation. */
/** Texte lu à voix haute : l'énoncé commun, la question, puis les réponses proposées. */
function spokenQuestion(question: PlayerQuestion): string {
  return [question.stemHtml ?? "", question.promptHtml, ...question.options.map((o) => o.labelHtml)]
    .filter(Boolean)
    .map(plainText)
    .join(". ");
}

export function AttemptPlayer(props: AttemptPlayerProps) {
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!mounted) return <PlayerSkeleton />;
  return <Player {...props} />;
}

function Player({ session }: AttemptPlayerProps) {
  const { serverNow } = session;
  const t = useTranslations("player");
  const router = useRouter();
  const { questions } = session;
  const deadline = session.deadlineAt ? Date.parse(session.deadlineAt) : null;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>(() => loadAnswers(session.id));
  const [now, setNow] = useState(serverNow);
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const answersRef = useRef(answers);
  const submittedRef = useRef(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pageRef = useRef<HTMLDialogElement>(null);

  const submit = () => {
    submittedRef.current = true;
    setError(false);
    dialogRef.current?.close();
    startTransition(async () => {
      try {
        const result = await submitAttemptAction(session.id, answersRef.current);
        if (result.ok) {
          storeAnswers(session.id, null);
          router.replace(`/eleve/tentatives/${session.id}/resultat`);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
    });
  };
  const submitRef = useRef(submit);
  useEffect(() => {
    submitRef.current = submit;
  });

  // Chronomètre recalé sur l'heure du serveur ; envoi automatique à la fin du temps.
  useEffect(() => {
    if (deadline === null) return;
    const offset = serverNow - Date.now();
    const timer = window.setInterval(() => {
      const current = Date.now() + offset;
      setNow(current);
      if (current >= deadline && !submittedRef.current) submitRef.current();
    }, 1000);
    return () => window.clearInterval(timer);
  }, [deadline, serverNow]);

  const remaining = deadline === null ? null : Math.max(0, Math.ceil((deadline - now) / 1000));
  const timeUp = remaining === 0;
  const warning = remaining === null || timeUp ? null : remaining <= 60 ? "warning1" : remaining <= 300 ? "warning5" : null;

  const question = questions[index]!;
  const answeredCount = questions.filter((q) => isAnswered(answers[q.id])).length;
  const isLast = index === questions.length - 1;

  const setAnswer = (questionId: string, value: AnswerValue) => {
    const next = { ...answersRef.current, [questionId]: value };
    answersRef.current = next;
    setAnswers(next);
    storeAnswers(session.id, next);
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-surface">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between gap-3 px-4">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-ink-muted">{session.assessment.subject.name}</p>
            <h1 className="truncate font-semibold text-ink">{session.assessment.title}</h1>
          </div>
          <span
            role="timer"
            aria-label={t("timeLeft")}
            className={cn(
              "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl px-3 text-base font-semibold tabular-nums",
              remaining === null && "bg-canvas text-ink-muted",
              remaining !== null && remaining > 300 && "bg-brand-50 text-brand-700",
              remaining !== null && remaining <= 300 && remaining > 60 && "bg-premium-50 text-premium-700",
              remaining !== null && remaining <= 60 && "bg-danger-50 text-danger-700",
            )}
          >
            <Timer className="size-5" aria-hidden />
            {remaining === null ? t("untimed") : formatClock(remaining)}
          </span>
        </div>
        <ProgressBar
          value={(answeredCount / questions.length) * 100}
          label={t("question", { current: answeredCount, total: questions.length })}
          className="h-1 rounded-none"
        />
      </header>

      <div aria-live="polite" className="mx-auto w-full max-w-3xl px-4">
        {warning ? (
          <p className="mt-3 flex items-center gap-2 rounded-xl bg-premium-50 px-4 py-2.5 text-sm font-medium text-premium-700">
            <CircleAlert className="size-4" aria-hidden />
            {t(warning)}
          </p>
        ) : null}
      </div>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-5">
        <p className="flex items-center justify-between text-sm font-medium text-ink-muted">
          <span>{t("question", { current: index + 1, total: questions.length })}</span>
          <span>{t("points", { points: question.points })}</span>
        </p>

        {/* Page d'un cahier d'exercices : consultable pendant tout l'exercice. */}
        {session.introHtml ? (
          <Button variant="outline" className="mt-3 w-full sm:w-auto" onClick={() => pageRef.current?.showModal()}>
            <BookOpen className="size-4" aria-hidden />
            {t("showPage")}
          </Button>
        ) : null}

        <section className="mt-3 rounded-2xl border border-line bg-surface p-5">
          {question.stemHtml ? (
            <RichText html={question.stemHtml} className="mb-4 border-b border-line pb-4 text-base text-ink" />
          ) : null}
          <RichText html={question.promptHtml} className="text-lg text-ink" />
          {/* CI à CM1 : la question et ses réponses peuvent s'écouter. */}
          {hasReadAloud(session.assessment.subject.levelCode) ? (
            <SpeakButton key={question.id} text={spokenQuestion(question)} className="mt-3" />
          ) : null}
        </section>

        <QuestionInput
          key={question.id}
          question={question}
          value={answers[question.id]}
          onChange={(value) => setAnswer(question.id, value)}
          labels={{
            chooseOne: t("chooseOne"),
            chooseMany: t("chooseMany"),
            yourAnswer: t("yourAnswer"),
            numericHint: t("numericHint"),
            textHint: t("textHint"),
            selfInstruction: t("selfCheck.instruction"),
            selfDone: t("selfCheck.done"),
            selfModel: t("selfCheck.model"),
            selfQuestion: t("selfCheck.question"),
            selfSuccess: t("selfCheck.success"),
            selfRetry: t("selfCheck.retry"),
          }}
        />

        {answeredCount > 0 ? (
          <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
            <Check className="size-3.5 text-success-500" aria-hidden />
            {t("saved")}
          </p>
        ) : null}

        <nav aria-label={t("navigator")} className="mt-6">
          <ol className="flex flex-wrap gap-2">
            {questions.map((q, i) => {
              const answered = isAnswered(answers[q.id]);
              return (
                <li key={q.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index ? "step" : undefined}
                    aria-label={`${t("goTo", { number: i + 1 })}${answered ? `, ${t("answered")}` : ""}`}
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl border text-sm font-semibold transition-colors",
                      answered ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-surface text-ink-muted",
                      i === index && "ring-2 ring-brand-500 ring-offset-2",
                    )}
                  >
                    {i + 1}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </main>

      <footer className="sticky bottom-0 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex w-full max-w-3xl gap-3 px-4 py-3">
          <Button variant="outline" className="flex-1" disabled={index === 0} onClick={() => setIndex(index - 1)}>
            <ArrowLeft className="size-4" aria-hidden />
            {t("previous")}
          </Button>
          {isLast ? (
            <Button className="flex-1" onClick={() => dialogRef.current?.showModal()} disabled={isPending}>
              <Flag className="size-4" aria-hidden />
              {t("finish")}
            </Button>
          ) : (
            <Button className="flex-1" onClick={() => setIndex(index + 1)}>
              {t("next")}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          )}
        </div>
      </footer>

      <dialog
        ref={dialogRef}
        aria-labelledby="confirmer-titre"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-surface p-6 text-ink backdrop:bg-black/40"
      >
        <h2 id="confirmer-titre" className="text-lg font-semibold">
          {t("confirmTitle")}
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          {t("confirmBody", { answered: answeredCount, total: questions.length })}
        </p>
        {answeredCount < questions.length ? (
          <p className="mt-1 text-sm font-medium text-premium-700">
            {t("confirmUnanswered", { count: questions.length - answeredCount })}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => dialogRef.current?.close()}>
            {t("keepGoing")}
          </Button>
          <Button onClick={submit}>{t("submit")}</Button>
        </div>
      </dialog>

      {session.introHtml ? (
        <dialog
          ref={pageRef}
          aria-labelledby="page-cahier-titre"
          className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl bg-surface p-5 text-ink backdrop:bg-black/40"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 id="page-cahier-titre" className="text-lg font-semibold">
              {t("pageTitle")}
            </h2>
            <Button variant="outline" onClick={() => pageRef.current?.close()}>
              <X className="size-4" aria-hidden />
              {t("closePage")}
            </Button>
          </div>
          <RichText html={session.introHtml} className="mt-4 text-base text-ink" />
        </dialog>
      ) : null}

      {isPending || error || timeUp ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div role="alert" className="w-full max-w-md rounded-2xl bg-surface p-6 text-center">
            {error ? (
              <>
                <CircleAlert className="mx-auto size-10 text-danger-500" aria-hidden />
                <p className="mt-3 text-sm text-ink">{t("error")}</p>
                <Button className="mt-5 w-full" onClick={submit}>
                  {t("retry")}
                </Button>
              </>
            ) : (
              <>
                <span className="mx-auto block size-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
                <p className="mt-3 font-medium text-ink">{timeUp ? t("timeUp") : t("submitting")}</p>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

interface QuestionInputProps {
  question: PlayerQuestion;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  labels: {
    chooseOne: string;
    chooseMany: string;
    yourAnswer: string;
    numericHint: string;
    textHint: string;
    selfInstruction: string;
    selfDone: string;
    selfModel: string;
    selfQuestion: string;
    selfSuccess: string;
    selfRetry: string;
  };
}

/** Travail sur l'ardoise : l'élève le fait, découvre le corrigé, puis dit s'il a réussi. */
function SelfCheckInput({ question, value, onChange, labels }: QuestionInputProps) {
  const [revealed, setRevealed] = useState(typeof value === "string" && value !== "");
  const choices = [
    { value: SELF_CHECK_SUCCESS, label: labels.selfSuccess },
    { value: SELF_CHECK_RETRY, label: labels.selfRetry },
  ];
  return (
    <div className="mt-4 space-y-3">
      <p className="flex items-center gap-2 rounded-xl bg-info-50 px-4 py-3 text-sm font-medium text-info-700">
        <PencilLine className="size-4 shrink-0" aria-hidden />
        {labels.selfInstruction}
      </p>
      {revealed ? (
        <>
          <div className="rounded-xl bg-brand-50 p-4">
            <p className="text-sm font-semibold text-brand-800">{labels.selfModel}</p>
            <RichText html={question.modelHtml ?? ""} className="mt-1 text-base text-ink" />
          </div>
          <fieldset>
            <legend className="text-sm font-medium text-ink">{labels.selfQuestion}</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {choices.map((choice) => {
                const checked = value === choice.value;
                return (
                  <label
                    key={choice.value}
                    className={cn(
                      "flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors",
                      checked ? "border-brand-600 bg-brand-50" : "border-line bg-surface hover:border-brand-100",
                    )}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={choice.value}
                      checked={checked}
                      onChange={() => onChange(choice.value)}
                      className="size-5 shrink-0 accent-brand-600"
                    />
                    <span className="text-base text-ink">{choice.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </>
      ) : (
        <Button className="w-full" onClick={() => setRevealed(true)}>
          <Check className="size-4" aria-hidden />
          {labels.selfDone}
        </Button>
      )}
    </div>
  );
}

function QuestionInput({ question, value, onChange, labels }: QuestionInputProps) {
  if (question.type === "self_check") {
    return <SelfCheckInput question={question} value={value} onChange={onChange} labels={labels} />;
  }
  if (question.type === "short_text" || question.type === "numeric") {
    const numeric = question.type === "numeric";
    return (
      <div className="mt-4">
        <label htmlFor={`reponse-${question.id}`} className="text-sm font-medium text-ink">
          {labels.yourAnswer}
        </label>
        <input
          id={`reponse-${question.id}`}
          type="text"
          inputMode={numeric ? "decimal" : "text"}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={200}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={`aide-${question.id}`}
          className="mt-2 h-14 w-full rounded-xl border border-line bg-surface px-4 text-lg text-ink focus:border-brand-600"
        />
        <p id={`aide-${question.id}`} className="mt-1.5 text-xs text-ink-muted">
          {numeric ? labels.numericHint : labels.textHint}
        </p>
      </div>
    );
  }

  const multiple = question.type === "multiple_choice";
  const selected = Array.isArray(value) ? value : [];
  const toggle = (optionId: string) => {
    if (!multiple) return onChange([optionId]);
    onChange(selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId]);
  };

  return (
    <fieldset className="mt-4">
      <legend className="text-sm font-medium text-ink-muted">{multiple ? labels.chooseMany : labels.chooseOne}</legend>
      <div className="mt-2 space-y-2">
        {question.options.map((option) => {
          const checked = selected.includes(option.id);
          return (
            <label
              key={option.id}
              className={cn(
                "flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors",
                checked ? "border-brand-600 bg-brand-50" : "border-line bg-surface hover:border-brand-100",
              )}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={question.id}
                value={option.id}
                checked={checked}
                onChange={() => toggle(option.id)}
                className="size-5 shrink-0 accent-brand-600"
              />
              <RichText html={option.labelHtml} className="text-base text-ink" />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function PlayerSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-5">
      <Skeleton className="h-12" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-14" />
      <Skeleton className="h-14" />
      <Skeleton className="h-14" />
    </div>
  );
}
