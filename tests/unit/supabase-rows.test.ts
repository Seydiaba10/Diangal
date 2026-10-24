import { describe, expect, it } from "vitest";
import { MAX_ROWS, selectAllRows, selectRowsByIds } from "@/lib/supabase/rows";

// Fausse API : renvoie au plus MAX_ROWS lignes, comme Supabase (max_rows), et note chaque appel.
function fakeTable(total: number) {
  const rows = Array.from({ length: total }, (_, i) => ({ id: i }));
  const calls: [number, number][] = [];
  const page = async (from: number, to: number) => {
    calls.push([from, to]);
    return { data: rows.slice(from, Math.min(to + 1, from + MAX_ROWS)), error: null };
  };
  return { rows, calls, page };
}

describe("selectAllRows", () => {
  it("lit toutes les lignes au-delà de la limite de l'API", async () => {
    const table = fakeTable(2 * MAX_ROWS + 78);
    const rows = await selectAllRows("test", table.page);
    expect(rows).toEqual(table.rows);
    expect(table.calls).toEqual([
      [0, MAX_ROWS - 1],
      [MAX_ROWS, 2 * MAX_ROWS - 1],
      [2 * MAX_ROWS, 3 * MAX_ROWS - 1],
    ]);
  });

  it("fait une page de plus quand le total tombe juste sur la limite", async () => {
    const table = fakeTable(MAX_ROWS);
    expect(await selectAllRows("test", table.page)).toHaveLength(MAX_ROWS);
    expect(table.calls).toHaveLength(2);
  });

  it("réessaie une page en erreur, puis signale l'échec", async () => {
    let failures = 1;
    const flaky = async () => (failures-- > 0 ? { data: null, error: { message: "coupé" } } : { data: [{ id: 1 }], error: null });
    expect(await selectAllRows("test", flaky, 3)).toEqual([{ id: 1 }]);
    const broken = async () => ({ data: null, error: { message: "coupé" } });
    await expect(selectAllRows("catalogue", broken, 3)).rejects.toThrow("catalogue : coupé");
  });
});

describe("selectRowsByIds", () => {
  it("découpe une longue liste d'identifiants en paquets", async () => {
    const ids = Array.from({ length: 450 }, (_, i) => `id-${i}`);
    const chunks: number[] = [];
    const rows = await selectRowsByIds("test", ids, async (chunk) => {
      chunks.push(chunk.length);
      return { data: chunk.map((id) => ({ id })), error: null };
    });
    expect(chunks).toEqual([200, 200, 50]);
    expect(rows.map((r) => r.id)).toEqual(ids);
  });

  it("ne lance aucune requête sans identifiant", async () => {
    let called = false;
    const rows = await selectRowsByIds("test", [], async () => {
      called = true;
      return { data: [], error: null };
    });
    expect(rows).toEqual([]);
    expect(called).toBe(false);
  });
});
