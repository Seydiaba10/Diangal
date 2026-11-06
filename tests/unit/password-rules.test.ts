import { describe, expect, it } from "vitest";
import { passwordProblem, passwordStrength } from "@/lib/password-rules";

describe("mot de passe des répétiteurs et de l'admin", () => {
  it("exige 10 caractères, des lettres et des chiffres", () => {
    expect(passwordProblem("court1")).toBe("short");
    expect(passwordProblem("12345678901")).toBe("letters");
    expect(passwordProblem("sanschiffres")).toBe("digits");
    expect(passwordProblem("a".repeat(130) + "1")).toBe("long");
    expect(passwordProblem("Thiès-2026-cours")).toBeNull();
  });

  it("mesure la force de 0 à 4", () => {
    expect(passwordStrength("")).toBe(0);
    expect(passwordStrength("abc")).toBe(0);
    expect(passwordStrength("abcdefghij1")).toBe(2);
    expect(passwordStrength("Abcdefghij1")).toBe(3);
    expect(passwordStrength("Abcdefghij1!")).toBe(4);
  });
});
