import { describe, expect, it } from "vitest";
import { daysUntil, formatDate, formatDateTime, formatFCFA, formatPhone, formatScore } from "@/lib/format";

// Intl fr-FR sépare les milliers par une espace fine insécable (U+202F).
const NNBSP = " ";
const NBSP = " ";

describe("formatFCFA", () => {
  it("sépare les milliers et ajoute FCFA", () => {
    expect(formatFCFA(2500)).toBe(`2${NNBSP}500${NBSP}FCFA`);
    expect(formatFCFA(15000)).toBe(`15${NNBSP}000${NBSP}FCFA`);
  });

  it("arrondit (le FCFA n'a pas de centimes)", () => {
    expect(formatFCFA(999.6)).toBe(`1${NNBSP}000${NBSP}FCFA`);
    expect(formatFCFA(500)).toBe(`500${NBSP}FCFA`);
  });
});

describe("formatDateTime", () => {
  it("donne la date et l’heure de Dakar", () => {
    expect(formatDateTime("2026-10-14T17:00:00Z")).toBe("14/10/2026 à 17:00");
  });
});

describe("formatDate", () => {
  it("affiche jour/mois/année", () => {
    expect(formatDate("2027-07-06")).toBe("06/07/2027");
  });

  it("utilise l'heure de Dakar (UTC+0)", () => {
    expect(formatDate(new Date("2026-10-10T23:30:00Z"))).toBe("10/10/2026");
  });
});

describe("formatScore", () => {
  it("affiche la note sur 20 avec une virgule", () => {
    expect(formatScore(13.4)).toBe("13,4/20");
    expect(formatScore(15)).toBe("15/20");
    expect(formatScore(7.25)).toBe("7,3/20");
  });

  it("gère l'absence de note", () => {
    expect(formatScore(null)).toBe("–");
  });
});

describe("formatPhone", () => {
  it("formate un numéro sénégalais", () => {
    expect(formatPhone("+221771234567")).toBe("77 123 45 67");
  });

  it("laisse les autres numéros intacts", () => {
    expect(formatPhone("+33612345678")).toBe("+33612345678");
  });
});

describe("daysUntil", () => {
  it("compte les jours calendaires", () => {
    expect(daysUntil("2027-07-06", new Date("2026-10-10T08:00:00Z"))).toBe(269);
    expect(daysUntil("2026-10-11", new Date("2026-10-10T23:59:00Z"))).toBe(1);
  });

  it("vaut 0 le jour même et devient négatif ensuite", () => {
    expect(daysUntil("2026-10-10", new Date("2026-10-10T12:00:00Z"))).toBe(0);
    expect(daysUntil("2026-10-09", new Date("2026-10-10T12:00:00Z"))).toBe(-1);
  });
});
