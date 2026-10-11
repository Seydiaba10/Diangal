"use server";

import { refresh } from "next/cache";
import { mockState } from "@/mocks/progress-store";
import { getNotifications } from "./data";

export async function markAllNotificationsReadAction() {
  for (const n of await getNotifications()) mockState.readNotifications.add(n.id);
  refresh();
}
