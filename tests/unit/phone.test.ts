import { describe, expect, it } from "vitest";
import { countriesFor, DIAL_COUNTRIES, isAllowedPhone, maskPhone, parsePhone } from "@/lib/phone";

describe("parsePhone", () => {
  it("lit un numéro sénégalais sous toutes ses formes", () => {
    expect(parsePhone("77 123 45 67")).toBe("+221771234567");
    expect(parsePhone("+221 77 123 45 67")).toBe("+221771234567");
    expect(parsePhone("00221771234567")).toBe("+221771234567");
    expect(parsePhone("221771234567")).toBe("+221771234567");
    expect(parsePhone("7712345")).toBeNull();
    expect(parsePhone("")).toBeNull();
  });

  it("lit un numéro de la diaspora avec l'indicatif choisi ou tapé", () => {
    expect(parsePhone("06 12 34 56 78", "33")).toBe("+33612345678");
    expect(parsePhone("+33 6 12 34 56 78")).toBe("+33612345678");
    expect(parsePhone("07 07 12 34 56", "225")).toBe("+2250707123456");
    expect(parsePhone("+1 202 555 0143")).toBe("+12025550143");
    expect(parsePhone("612", "33")).toBeNull();
    expect(parsePhone("+999 123456789")).toBeNull();
  });

  it("refuse un pays qui n'est pas ouvert", () => {
    const senegalOnly = countriesFor([]);
    expect(senegalOnly.map((c) => c.iso)).toEqual(["SN"]);
    expect(parsePhone("+33612345678", "221", senegalOnly)).toBeNull();
    expect(isAllowedPhone("+221771234567", senegalOnly)).toBe(true);
    expect(isAllowedPhone("+33612345678", senegalOnly)).toBe(false);
    expect(isAllowedPhone("+33612345678", countriesFor(["FR"]))).toBe(true);
    expect(isAllowedPhone("+33612345678", DIAL_COUNTRIES)).toBe(true);
  });

  it("masque un numéro pour l'affichage", () => {
    expect(maskPhone("+221771234567")).toBe("+221 77 ••• •• 67");
    expect(maskPhone("+33612345678")).toBe("+33 61 ••• •• 78");
  });
});
