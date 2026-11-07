import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// Réception des mesures de vitesse envoyées par les navigateurs (composant WebVitals) : anonymes, validées,
// rangées par lots dans private.web_vitals. Aucun service tiers.

const Vital = z.object({
  metric: z.enum(["LCP", "INP", "CLS", "FCP", "TTFB"]),
  value: z.number().finite().min(0).max(599_999),
  rating: z.enum(["good", "needs-improvement", "poor"]),
  // Adresse de la page sans identifiant ni paramètre (déjà réduite par le navigateur).
  page: z.string().min(1).max(120).regex(/^\/[a-z0-9\-/:]*$/),
  connection: z.enum(["slow-2g", "2g", "3g", "4g"]).optional(),
});
const Batch = z.array(Vital).min(1).max(20);

export async function POST(request: NextRequest) {
  // Seulement depuis le site lui-même.
  const origin = request.headers.get("origin");
  if (!origin || new URL(origin).host !== request.headers.get("host")) return new NextResponse(null, { status: 403 });
  const body = await request.text();
  if (body.length > 8_000) return new NextResponse(null, { status: 413 });

  let parsed: z.infer<typeof Batch>;
  try {
    const result = Batch.safeParse(JSON.parse(body));
    if (!result.success) return new NextResponse(null, { status: 400 });
    parsed = result.data;
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    const { error } = await createSupabaseAdminClient().rpc("record_web_vitals", { p_rows: parsed });
    if (error) console.error("vitesse des pages :", error.message);
  }
  return new NextResponse(null, { status: 204 });
}
