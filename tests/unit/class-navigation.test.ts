import { describe, expect, it } from "vitest";
import { browsableLevels, classQuery, resolveBrowsedClass, seriesForLevel } from "@/features/schooling/class-navigation";

describe("navigation entre les classes", () => {
  it("ouvre la classe actuelle et les précédentes, jamais les suivantes", () => {
    expect(browsableLevels("CI")).toEqual(["CI"]);
    expect(browsableLevels("2NDE")).toEqual(["2NDE", "3E", "4E", "5E", "6E", "CM2", "CM1", "CE2", "CE1", "CP", "CI"]);
    expect(browsableLevels("XX")).toEqual([]);
  });

  it("garde la classe actuelle sans paramètre, ou pour une classe supérieure", () => {
    const student = { levelCode: "2NDE", seriesCode: "S" };
    expect(resolveBrowsedClass({}, student)).toEqual({ levelCode: "2NDE", seriesCode: "S", isCurrent: true });
    expect(resolveBrowsedClass({ classe: "TLE" }, student)).toEqual({ levelCode: "2NDE", seriesCode: "S", isCurrent: true });
    expect(resolveBrowsedClass({ classe: "3e" }, student)).toEqual({ levelCode: "3E", seriesCode: null, isCurrent: false });
  });

  it("propose la série de l'historique, sinon la plus proche de la série actuelle", () => {
    const tle = { levelCode: "TLE", seriesCode: "S2" };
    expect(seriesForLevel("1RE", tle)).toBe("S2");
    expect(seriesForLevel("2NDE", tle)).toBe("S");
    expect(seriesForLevel("2NDE", { levelCode: "1RE", seriesCode: "L2" })).toBe("L");
    expect(seriesForLevel("1RE", tle, [{ levelCode: "1RE", seriesCode: "S1" }])).toBe("S1");
    expect(seriesForLevel("3E", tle)).toBeNull();
    // Une série demandée dans l'URL l'emporte si elle existe pour cette classe.
    expect(resolveBrowsedClass({ classe: "1RE", serie: "l1" }, tle)).toEqual({ levelCode: "1RE", seriesCode: "L1", isCurrent: false });
    expect(resolveBrowsedClass({ classe: "1RE", serie: "Z9" }, tle).seriesCode).toBe("S2");
  });

  it("ne met dans l'URL que les classes précédentes", () => {
    expect(classQuery({ levelCode: "2NDE", seriesCode: "S", isCurrent: true })).toEqual({});
    expect(classQuery({ levelCode: "1RE", seriesCode: "S2", isCurrent: false })).toEqual({ classe: "1RE", serie: "S2" });
    expect(classQuery({ levelCode: "3E", seriesCode: null, isCurrent: false })).toEqual({ classe: "3E" });
  });
});
