import { describe, expect, it } from "vitest";
import { safeInternalPath } from "@/lib/safe-path";

describe("safeInternalPath", () => {
  it("garde une page du site, avec sa requête", () => {
    expect(safeInternalPath("/eleve/cours")).toBe("/eleve/cours");
    expect(safeInternalPath("/admin/repetiteurs?statut=pending")).toBe("/admin/repetiteurs?statut=pending");
  });

  it("refuse les adresses externes déguisées", () => {
    for (const value of ["//evil.com", "/\\evil.com", "/\\/evil.com", "https://evil.com", "evil.com", "/\tevil", "", null, 42]) {
      expect(safeInternalPath(value)).toBeNull();
    }
  });
});
