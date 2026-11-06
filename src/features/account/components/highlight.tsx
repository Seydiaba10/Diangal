import type { ReactNode } from "react";

/** Mot surligné en jaune dans un titre des pages de connexion (couleur du cycle moyen, texte ink). */
export function Highlight({ children }: { children: ReactNode }) {
  return <mark className="rounded-md bg-cycle-middle px-1.5 text-ink box-decoration-clone">{children}</mark>;
}

/** Pour t.rich : « <mark>revoir</mark> » dans les textes de messages/fr.json. */
export const richMark = { mark: (chunks: ReactNode) => <Highlight>{chunks}</Highlight> };
