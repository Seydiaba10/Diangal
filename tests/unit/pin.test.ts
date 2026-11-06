import { afterEach, describe, expect, it, vi } from "vitest";
import { accountPinSubject, childPinSubject, derivePinPassword } from "@/lib/pin";
import { cleanPin, pinProblem } from "@/lib/pin-rules";

describe("règles du code PIN", () => {
  it("accepte un code de 6 chiffres sans motif évident", () => {
    expect(pinProblem("472915")).toBeNull();
    expect(pinProblem("830264", "+221771234567")).toBeNull();
  });

  it("refuse le mauvais format, les répétitions, les suites, les motifs et les codes connus", () => {
    expect(pinProblem("12345")).toBe("format");
    expect(pinProblem("12a456")).toBe("format");
    expect(pinProblem("0000000")).toBe("format");
    expect(pinProblem("777777")).toBe("repeat");
    expect(pinProblem("123456")).toBe("sequence");
    expect(pinProblem("987654")).toBe("sequence");
    expect(pinProblem("121212")).toBe("pattern");
    expect(pinProblem("123123")).toBe("pattern");
    expect(pinProblem("112233")).toBe("common");
    expect(pinProblem("159753")).toBe("common");
  });

  it("refuse la fin du numéro de téléphone", () => {
    expect(pinProblem("234567", "+221771234567")).toBe("sequence");
    expect(pinProblem("193846", "+221770193846")).toBe("phone");
    expect(pinProblem("193846", null)).toBeNull();
  });

  it("enlève les espaces de la saisie", () => {
    expect(cleanPin(" 47 29 15 ")).toBe("472915");
    expect(cleanPin(null)).toBe("");
  });
});

describe("mot de passe dérivé du code PIN", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("exige une clé secrète d'au moins 32 caractères", () => {
    vi.stubEnv("DIANGAL_PIN_PEPPER", "trop-courte");
    expect(() => derivePinPassword("+221771234567", "472915")).toThrow(/DIANGAL_PIN_PEPPER/);
  });

  it("dépend du compte, du code, de la clé et de sa version, sans jamais contenir le code", () => {
    vi.stubEnv("DIANGAL_PIN_PEPPER", "x".repeat(40));
    const a = derivePinPassword("+221771234567", "472915");
    expect(a).toMatch(/^[A-Za-z0-9_-]{43}:Pin1$/);
    expect(a).not.toContain("472915");
    expect(derivePinPassword("+221771234567", "472915")).toBe(a);
    expect(derivePinPassword("+221771234568", "472915")).not.toBe(a);
    expect(derivePinPassword("+221771234567", "472916")).not.toBe(a);
    expect(derivePinPassword("+221771234567", "472915", 2)).not.toBe(a);
    vi.stubEnv("DIANGAL_PIN_PEPPER", "y".repeat(40));
    expect(derivePinPassword("+221771234567", "472915")).not.toBe(a);
  });

  it("un élève ou un parent a un seul code PIN, qu'il se connecte avec son numéro ou son e-mail", () => {
    vi.stubEnv("DIANGAL_PIN_PEPPER", "x".repeat(40));
    const id = "6f1c2a3b-0000-4000-8000-000000000001";
    // Sujet = le compte, jamais l'identifiant tapé : changer de numéro ou ajouter un e-mail ne change rien.
    expect(accountPinSubject(id)).toBe(`user:${id}`);
    expect(derivePinPassword(accountPinSubject(id), "472915")).toBe(derivePinPassword(`user:${id}`, "472915"));
    // Un enfant sans téléphone et un compte de même identifiant ne partagent jamais de mot de passe.
    expect(derivePinPassword(accountPinSubject(id), "472915")).not.toBe(derivePinPassword(childPinSubject(id), "472915"));
  });
});
