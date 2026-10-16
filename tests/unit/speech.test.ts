import { describe, expect, it } from "vitest";
import { pickFrenchVoice, splitForSpeech } from "@/lib/speech";

describe("lecture à voix haute", () => {
  it("découpe un texte en phrases courtes, sans les symboles dessinés", () => {
    const chunks = splitForSpeech("Compte les points : ● ● ●\nCombien y en a-t-il ? Un, deux, trois.", 40);
    expect(chunks.join(" ")).not.toMatch(/●/);
    expect(chunks.every((c) => c.length <= 40)).toBe(true);
    expect(chunks.join(" ")).toContain("Combien y en a-t-il ?");
  });

  it("regroupe les petites phrases et coupe les trop longues", () => {
    expect(splitForSpeech("Oui. Non. Peut-être.", 180)).toEqual(["Oui. Non. Peut-être."]);
    const long = "mot ".repeat(100);
    expect(splitForSpeech(long, 50).every((c) => c.length <= 50)).toBe(true);
  });

  it("choisit une voix française, fr-FR en priorité", () => {
    const voice = (lang: string, localService = true) => ({ lang, localService }) as SpeechSynthesisVoice;
    expect(pickFrenchVoice([voice("en-US"), voice("fr-CA"), voice("fr-FR")])?.lang).toBe("fr-FR");
    expect(pickFrenchVoice([voice("en-US"), voice("fr-CA")])?.lang).toBe("fr-CA");
    expect(pickFrenchVoice([voice("en-US")])).toBeNull();
  });
});
