import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { DEMO_ROLE_COOKIE } from "@/features/account/data";
import { ROLE_HOME, ROLES } from "@/features/account/roles";
import type { AppRole } from "@/types/domain";

/** Point d'entrée de l'application installée : espace du rôle connecté, sinon la connexion. */
export async function GET(request: Request) {
  const role = (await cookies()).get(DEMO_ROLE_COOKIE)?.value as AppRole | undefined;
  const target = role && ROLES.includes(role) ? ROLE_HOME[role] : "/connexion";
  return NextResponse.redirect(new URL(target, request.url));
}
