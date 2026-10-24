// L'API Supabase renvoie au plus 1 000 lignes par requête (réglage max_rows du projet) : au-delà, la
// réponse est coupée sans erreur. Ces aides lisent une requête page par page, ou une longue liste
// d'identifiants par paquets (une URL trop longue est refusée).

/** Lignes par page : le max_rows du projet. */
export const MAX_ROWS = 1000;

type RowsResult<T> = PromiseLike<{ data: T[] | null; error: { message: string } | null }>;

/**
 * Toutes les lignes d'une requête, lue par pages de MAX_ROWS. La requête doit avoir un ordre total
 * (terminer par une colonne unique, ex. l'id), sinon une ligne peut changer de page entre deux lectures.
 * `attempts` : essais par page (une grosse réponse arrive parfois coupée sur un réseau lent).
 */
export async function selectAllRows<T>(label: string, page: (from: number, to: number) => RowsResult<T>, attempts = 1): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += MAX_ROWS) {
    let result = await page(from, from + MAX_ROWS - 1);
    for (let attempt = 1; result.error && attempt < attempts; attempt++) result = await page(from, from + MAX_ROWS - 1);
    if (result.error) throw new Error(`${label} : ${result.error.message.slice(0, 200)}`);
    const data = result.data ?? [];
    rows.push(...data);
    if (data.length < MAX_ROWS) return rows;
  }
}

/** Lignes liées à une liste d'identifiants, lue par paquets de `size` (au plus une ligne par identifiant). */
export async function selectRowsByIds<T>(label: string, ids: string[], query: (chunk: string[]) => RowsResult<T>, size = 200): Promise<T[]> {
  const rows: T[] = [];
  for (let i = 0; i < ids.length; i += size) {
    const { data, error } = await query(ids.slice(i, i + size));
    if (error) throw new Error(`${label} : ${error.message.slice(0, 200)}`);
    rows.push(...(data ?? []));
  }
  return rows;
}
