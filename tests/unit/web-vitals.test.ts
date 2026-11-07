import { describe, expect, it } from "vitest";
import { pageOf, rateWebVital } from "@/lib/web-vitals";

describe("vitesse réelle des pages", () => {
  it("réduit l'adresse : aucun identifiant ni nom de leçon ne quitte le téléphone", () => {
    expect(pageOf("/")).toBe("/");
    expect(pageOf("/eleve")).toBe("/eleve");
    expect(pageOf("/eleve/cours/mathematiques-ci/3f2a9c1e-0000-4000-8000-000000000001/le-cercle")).toBe("/eleve/cours/:p/:p/:p");
    expect(pageOf("/connexion/pin-oublie")).toBe("/connexion/pin-oublie");
    expect(pageOf("/Eleve/Évaluations")).toBe("/eleve/:p");
    expect(pageOf(`/${"a".repeat(300)}`).length).toBeLessThanOrEqual(120);
  });

  it("classe chaque mesure avec les seuils officiels", () => {
    expect(rateWebVital("LCP", 2400)).toBe("good");
    expect(rateWebVital("LCP", 3000)).toBe("needs-improvement");
    expect(rateWebVital("LCP", 4100)).toBe("poor");
    expect(rateWebVital("INP", 200)).toBe("good");
    expect(rateWebVital("CLS", 0.3)).toBe("poor");
    expect(rateWebVital("TTFB", 900)).toBe("needs-improvement");
  });
});
