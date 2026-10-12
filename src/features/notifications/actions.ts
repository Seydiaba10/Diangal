"use server";

import { refresh } from "next/cache";
import { requireIdentity } from "@/features/account/session";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mockState } from "@/mocks/progress-store";
import { getNotifications } from "./data";

export async function markAllNotificationsReadAction() {
  if (isSupabaseConfigured()) {
    const { userId } = await requireIdentity();
    const supabase = await createSupabaseServerClient();
    await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("user_id", userId).is("read_at", null);
    refresh();
    return;
  }
  for (const n of await getNotifications()) mockState.readNotifications.add(n.id);
  refresh();
}
