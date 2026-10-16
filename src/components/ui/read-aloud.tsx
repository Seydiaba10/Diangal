"use client";

import { Headphones, Pause, Play, Square, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { pickFrenchVoice, splitForSpeech } from "@/lib/speech";

// Lecture à voix haute avec la synthèse vocale du téléphone (fonctionne hors ligne si une voix
// française est installée). « Pause » mémorise la phrase en cours ; « Reprendre » la relit.

const noop = () => () => {};
const isSupported = () => "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

/** Vrai dans un navigateur qui sait lire à voix haute (faux pendant le rendu serveur). */
function useSpeechSupport() {
  return useSyncExternalStore(noop, isSupported, () => false);
}

/** Lit une suite de phrases ; renvoie les commandes. Une seule lecture à la fois sur la page. */
function useSpeaker() {
  const voice = useRef<SpeechSynthesisVoice | null>(null);
  const run = useRef(0);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!isSupported()) return;
    const synth = window.speechSynthesis;
    const pick = () => {
      voice.current = pickFrenchVoice(synth.getVoices());
    };
    pick();
    synth.addEventListener("voiceschanged", pick);
    return () => {
      synth.removeEventListener("voiceschanged", pick);
      run.current += 1;
      synth.cancel();
    };
  }, []);

  /** Lit chunks à partir de start ; onProgress reçoit l'index de la phrase en cours, onDone la fin. */
  function speak(chunks: string[], start: number, rate: number, onProgress: (index: number) => void, onDone: () => void) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const current = ++run.current;
    const say = (index: number) => {
      if (run.current !== current) return;
      if (index >= chunks.length) {
        setSpeaking(false);
        onDone();
        return;
      }
      onProgress(index);
      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.lang = voice.current?.lang ?? "fr-FR";
      if (voice.current) utterance.voice = voice.current;
      utterance.rate = rate;
      utterance.onend = () => say(index + 1);
      // Une lecture interrompue (pause, arrêt) déclenche aussi une erreur : ignorée si une autre a pris la main.
      utterance.onerror = () => {
        if (run.current === current) setSpeaking(false);
      };
      synth.speak(utterance);
    };
    setSpeaking(true);
    say(start);
  }

  function stop() {
    run.current += 1;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  return { speak, stop, speaking };
}

const BUTTON =
  "inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

/** Barre d'écoute d'un texte affiché sur la page (élément targetId), avec pause et reprise. */
export function ReadAloud({ targetId, className }: { targetId: string; className?: string }) {
  const t = useTranslations("readAloud");
  const supported = useSpeechSupport();
  const { speak, stop, speaking } = useSpeaker();
  const [paused, setPaused] = useState(false);
  const [slow, setSlow] = useState(false);
  const chunks = useRef<string[]>([]);
  const index = useRef(0);

  if (!supported) {
    return <p className={cn("rounded-2xl bg-canvas px-4 py-3 text-sm text-ink-muted", className)}>{t("unavailable")}</p>;
  }

  const rate = slow ? 0.7 : 0.95;
  const start = (from: number) => {
    setPaused(false);
    speak(chunks.current, from, rate, (i) => (index.current = i), () => (index.current = 0));
  };
  const play = () => {
    chunks.current = splitForSpeech(document.getElementById(targetId)?.innerText ?? "");
    start(0);
  };
  const pause = () => {
    stop();
    setPaused(true);
  };
  const end = () => {
    stop();
    setPaused(false);
    index.current = 0;
  };

  return (
    <section aria-label={t("label")} className={cn("flex flex-wrap items-center gap-2 rounded-2xl bg-brand-50 p-3", className)}>
      <span className="flex items-center gap-2 px-1 text-sm font-semibold text-brand-800">
        <Headphones className="size-5" aria-hidden />
        {t("title")}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {speaking ? (
          <button type="button" onClick={pause} className={cn(BUTTON, "bg-brand-600 text-white")}>
            <Pause className="size-4" aria-hidden />
            {t("pause")}
          </button>
        ) : paused ? (
          <button type="button" onClick={() => start(index.current)} className={cn(BUTTON, "bg-brand-600 text-white")}>
            <Play className="size-4" aria-hidden />
            {t("resume")}
          </button>
        ) : (
          <button type="button" onClick={play} className={cn(BUTTON, "bg-brand-600 text-white")}>
            <Play className="size-4" aria-hidden />
            {t("play")}
          </button>
        )}
        {speaking || paused ? (
          <button type="button" onClick={end} className={cn(BUTTON, "border border-brand-600 bg-surface text-brand-700")}>
            <Square className="size-4" aria-hidden />
            {t("stop")}
          </button>
        ) : null}
        <label className="flex h-11 items-center gap-2 px-2 text-sm text-ink">
          <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} className="size-5 accent-brand-600" />
          {t("slow")}
        </label>
      </div>
      <p aria-live="polite" className="sr-only">
        {speaking ? t("speaking") : paused ? t("paused") : ""}
      </p>
    </section>
  );
}

/** Petit bouton « Écouter » pour un texte court (consigne d'exercice, question). */
export function SpeakButton({ text, className }: { text: string; className?: string }) {
  const t = useTranslations("readAloud");
  const supported = useSpeechSupport();
  const { speak, stop, speaking } = useSpeaker();
  if (!supported) return null;
  return (
    <button
      type="button"
      onClick={() => (speaking ? stop() : speak(splitForSpeech(text), 0, 0.9, () => {}, () => {}))}
      aria-pressed={speaking}
      className={cn(BUTTON, "border border-brand-600 bg-surface text-brand-700", className)}
    >
      {speaking ? <Square className="size-4" aria-hidden /> : <Volume2 className="size-4" aria-hidden />}
      {speaking ? t("stop") : t("listen")}
    </button>
  );
}
