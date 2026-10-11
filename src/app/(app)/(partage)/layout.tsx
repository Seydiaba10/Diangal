import type { ReactNode } from "react";
import { SharedAppShell } from "@/components/layout/app-shell";

export default function SharedLayout({ children }: { children: ReactNode }) {
  return <SharedAppShell>{children}</SharedAppShell>;
}
