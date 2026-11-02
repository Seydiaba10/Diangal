"use client";

import { CircleAlert } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { startMfaEnrollmentAction, verifyMfaAction, type MfaEnrollmentState, type MfaVerifyState } from "../actions";
import { INPUT_CLASS } from "./auth-card";

interface MfaFormProps {
  /** Application déjà validée : on demande son code. Sinon (null) : enrôlement par QR code. */
  verifiedFactorId: string | null;
  next: string | null;
  labels: {
    challengeBody: string;
    enrollIntro: string;
    showQr: string;
    enrollTitle: string;
    enrollBody: string;
    qrAlt: string;
    secretLabel: string;
    enrollError: string;
    codeLabel: string;
    submit: string;
    error: string;
  };
}

/**
 * Double authentification de l'admin. Le QR code n'est créé qu'au clic (action serveur exécutée une
 * seule fois) et reste affiché si un code est refusé, pour pouvoir retaper le code.
 */
export function MfaForm({ verifiedFactorId, next, labels }: MfaFormProps) {
  const [enrollment, showQr, creating] = useActionState(startMfaEnrollmentAction, { status: "idle" } as MfaEnrollmentState);
  const factorId = verifiedFactorId ?? (enrollment.status === "ready" ? enrollment.factorId : null);

  return (
    <div className="space-y-5">
      {verifiedFactorId ? (
        <p className="text-sm text-ink">{labels.challengeBody}</p>
      ) : enrollment.status === "ready" ? (
        <section className="space-y-3 rounded-2xl bg-canvas p-4">
          <h2 className="font-semibold text-ink">{labels.enrollTitle}</h2>
          <p className="text-sm text-ink">{labels.enrollBody}</p>
          {/* QR code SVG renvoyé par Supabase (data URI) : aucune requête externe. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={enrollment.qrCode} alt={labels.qrAlt} width={192} height={192} className="mx-auto rounded-xl bg-white p-2" />
          <p className="break-all text-xs text-ink-muted">
            {labels.secretLabel} <span className="font-mono font-semibold text-ink">{enrollment.secret}</span>
          </p>
        </section>
      ) : (
        <form action={showQr} className="space-y-3">
          <p className="text-sm text-ink">{labels.enrollIntro}</p>
          {enrollment.status === "error" ? <ErrorLine text={labels.enrollError} /> : null}
          <Button type="submit" className="w-full" disabled={creating}>
            {labels.showQr}
          </Button>
        </form>
      )}
      {factorId ? <CodeForm key={factorId} factorId={factorId} next={next} labels={labels} /> : null}
    </div>
  );
}

function CodeForm({ factorId, next, labels }: { factorId: string; next: string | null; labels: MfaFormProps["labels"] }) {
  const [state, verify, checking] = useActionState(verifyMfaAction.bind(null, factorId), { error: false } as MfaVerifyState);
  return (
    <form action={verify} className="space-y-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <div>
        <label htmlFor="code" className="text-sm font-medium text-ink">
          {labels.codeLabel}
        </label>
        <input
          id="code"
          name="code"
          required
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]{6,7}"
          maxLength={7}
          aria-invalid={state.error || undefined}
          className={cn(INPUT_CLASS, "mt-1.5 text-center text-2xl font-semibold tracking-[0.5em]")}
        />
        {state.error ? <ErrorLine text={labels.error} /> : null}
      </div>
      <Button type="submit" className="w-full" disabled={checking}>
        {labels.submit}
      </Button>
    </form>
  );
}

function ErrorLine({ text }: { text: string }) {
  return (
    <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-danger-700">
      <CircleAlert className="size-4" aria-hidden />
      {text}
    </p>
  );
}
