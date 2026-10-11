import type { ReactNode } from "react";

/** Mode « concentration » : pas de navigation pendant un contrôle, pour éviter les sorties involontaires. */
export default function FocusLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-canvas">{children}</div>;
}
