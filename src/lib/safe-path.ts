const BASE = "http://diangal.invalid";

/**
 * Chemin de retour (« next ») : uniquement une page du site. Refuse les adresses externes
 * déguisées (« //site », « /\site », caractères de contrôle) qui provoqueraient une redirection ouverte.
 */
export function safeInternalPath(value: unknown): string | null {
  if (typeof value !== "string" || !value.startsWith("/") || value.length > 512) return null;
  if (value.startsWith("//") || value.includes("\\") || /[\u0000-\u001f\u007f]/.test(value)) return null;
  try {
    const url = new URL(value, BASE);
    return url.origin === BASE ? `${url.pathname}${url.search}${url.hash}` : null;
  } catch {
    return null;
  }
}
