import { NextResponse } from "next/server";
import { buildChapterPack } from "@/features/offline/data";

/** Paquet hors ligne d'un chapitre pour l'élève connecté (jamais mis en cache partagé). */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const pack = await buildChapterPack((await params).id);
  if (!pack) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(pack, { headers: { "Cache-Control": "private, no-store" } });
}
