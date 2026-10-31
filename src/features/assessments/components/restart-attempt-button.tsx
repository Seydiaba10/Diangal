"use client";

import { RotateCcw } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface RestartAttemptButtonProps {
  /** Server Action liée à l'évaluation et à la tentative (restartAttemptAction). */
  action: () => Promise<void>;
  labels: { open: string; title: string; body: string; confirm: string; cancel: string };
}

/** « Recommencer à zéro » : demande confirmation avant d'effacer l'essai en cours (jamais compté dans les notes). */
export function RestartAttemptButton({ action, labels }: RestartAttemptButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Button variant="ghost" className="w-full" onClick={() => dialogRef.current?.showModal()}>
        <RotateCcw className="size-4" aria-hidden />
        {labels.open}
      </Button>
      <dialog
        ref={dialogRef}
        aria-labelledby="recommencer-titre"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-surface p-6 text-ink backdrop:bg-black/40"
      >
        <h2 id="recommencer-titre" className="text-lg font-semibold">
          {labels.title}
        </h2>
        <p className="mt-2 text-sm text-ink-muted">{labels.body}</p>
        <form action={action} className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => dialogRef.current?.close()}>
            {labels.cancel}
          </Button>
          <Button type="submit">{labels.confirm}</Button>
        </form>
      </dialog>
    </>
  );
}
