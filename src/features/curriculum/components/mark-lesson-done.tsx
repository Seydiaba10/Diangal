"use client";

import { CircleAlert, CircleCheck } from "lucide-react";
import { useOptimistic, useState } from "react";
import { Button } from "@/components/ui/button";
import { markLessonCompletedAction } from "../actions";

/**
 * « Marquer comme terminée » : la leçon s'affiche terminée tout de suite (mise à jour optimiste), sans attendre le
 * serveur sur un réseau lent. Si l'enregistrement échoue, le bouton revient avec un message.
 */
export function MarkLessonDone({ lessonId, labels }: { lessonId: string; labels: { markDone: string; done: string; error: string } }) {
  const [done, setDone] = useOptimistic(false);
  const [failed, setFailed] = useState(false);

  if (done) {
    return (
      <p role="status" className="flex items-center justify-center gap-2 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700">
        <CircleCheck className="size-5" aria-hidden />
        {labels.done}
      </p>
    );
  }
  return (
    <form
      action={async () => {
        setFailed(false);
        setDone(true);
        const result = await markLessonCompletedAction(lessonId);
        // Échec : l'état optimiste disparaît à la fin de l'action, le bouton revient.
        if (!result.ok) setFailed(true);
      }}
      className="space-y-2"
    >
      <Button type="submit" variant="outline" className="w-full">
        <CircleCheck className="size-5" aria-hidden />
        {labels.markDone}
      </Button>
      {failed ? (
        <p role="alert" className="flex items-start gap-1.5 text-sm font-medium text-danger-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          {labels.error}
        </p>
      ) : null}
    </form>
  );
}
