"use client";

import type { RealtimeChannel } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

/**
 * Messagerie en temps réel : rafraîchit la page dès qu'un message arrive (Supabase Realtime).
 * La RLS filtre ce que reçoit chaque utilisateur ; « filter » limite à une conversation.
 */
export function LiveRefresh({ filter }: { filter?: string }) {
  const router = useRouter();
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let channel: RealtimeChannel | null = null;
    let cancelled = false;

    void (async () => {
      // Le jeton de l'utilisateur doit être transmis au temps réel AVANT l'abonnement :
      // sinon le serveur applique la RLS d'un visiteur anonyme et refuse le filtre.
      const { data } = await supabase.auth.getSession();
      if (cancelled || !data.session) return;
      await supabase.realtime.setAuth(data.session.access_token);
      // Page quittée pendant l'attente : ne pas créer un canal que plus personne ne fermerait.
      if (cancelled) return;
      // Nom unique : un désabonnement suivi d'un réabonnement immédiat (montage React en double
      // en développement, navigation rapide) ne doit pas réutiliser le canal en cours de fermeture.
      channel = supabase
        .channel(`messages:${filter ?? "toutes"}:${crypto.randomUUID()}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter }, () => router.refresh())
        .subscribe();
    })();

    return () => {
      cancelled = true;
      if (channel) void supabase.removeChannel(channel);
    };
  }, [router, filter]);
  return null;
}
