"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface NavLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
  exact?: boolean;
  variant: "sidebar" | "bottom";
}

/**
 * Lien de navigation avec état actif. Avec Cache Components, usePathname() suspend sur les
 * routes à paramètre dynamique : le lien inactif sert de repli dans le shell prérendu.
 */
export function NavLink(props: NavLinkProps) {
  return (
    <Suspense fallback={<NavLinkView {...props} active={false} />}>
      <ActiveNavLink {...props} />
    </Suspense>
  );
}

function ActiveNavLink(props: NavLinkProps) {
  const pathname = usePathname();
  const active = props.exact
    ? pathname === props.href
    : pathname === props.href || pathname.startsWith(`${props.href}/`);
  return <NavLinkView {...props} active={active} />;
}

function NavLinkView({ href, label, icon, variant, active }: NavLinkProps & { active: boolean }) {
  if (variant === "bottom") {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium",
          active ? "text-brand-700" : "text-ink-muted",
        )}
      >
        <span
          className={cn(
            "flex h-7 w-12 items-center justify-center rounded-full transition-colors",
            active && "bg-brand-50",
          )}
        >
          {icon}
        </span>
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
        active ? "bg-brand-50 text-brand-700" : "text-ink-muted hover:bg-canvas hover:text-ink",
      )}
    >
      {icon}
      {label}
    </Link>
  );
}
