import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentRole } from "@/features/account/data";
import { ROLE_HOME } from "@/features/account/roles";
import type { AppRole } from "@/types/domain";
import { BottomNav } from "./bottom-nav";
import { MobileTopBar } from "./mobile-top-bar";
import { Sidebar } from "./sidebar";

/**
 * Renvoie vers l'espace du rôle connecté si l'URL appartient à un autre rôle.
 * Phase 4 : doublé par proxy.ts et, surtout, par la RLS côté base.
 */
async function RoleGuard({ role }: { role: AppRole }) {
  const current = await getCurrentRole();
  if (current !== role) redirect(ROLE_HOME[current]);
  return null;
}

async function SkipLink() {
  const t = await getTranslations("nav");
  return (
    <a
      href="#contenu"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-surface focus:px-4 focus:py-3 focus:text-sm focus:font-medium"
    >
      {t("skipToContent")}
    </a>
  );
}

export function AppShell({ role, guard = true, children }: { role: AppRole; guard?: boolean; children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <SkipLink />
      <Sidebar role={role} />
      <div className="lg:pl-62">
        <MobileTopBar role={role} />
        <main id="contenu" className="pb-24 lg:pb-10">
          {children}
        </main>
      </div>
      <BottomNav role={role} />
      {guard ? (
        <Suspense fallback={null}>
          <RoleGuard role={role} />
        </Suspense>
      ) : null}
    </div>
  );
}

/** Coquille des pages partagées entre rôles (répétiteurs, messages…) : le rôle vient de la session. */
async function SessionShell({ children }: { children: ReactNode }) {
  const role = await getCurrentRole();
  return (
    <AppShell role={role} guard={false}>
      {children}
    </AppShell>
  );
}

export function SharedAppShell({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh lg:pl-62">
          <div className="fixed inset-y-0 left-0 hidden w-62 border-r border-line bg-surface lg:block" />
          <div className="mx-auto max-w-5xl space-y-4 px-4 py-6">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      }
    >
      <SessionShell>{children}</SessionShell>
    </Suspense>
  );
}
