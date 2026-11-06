import "server-only";

import { getTranslations } from "next-intl/server";
import type { ProfilePickerLabels } from "./components/profile-picker";

/** Noms et descriptions des photos des trois profils (pages de connexion et d’inscription). */
export async function profileLabels(): Promise<ProfilePickerLabels> {
  const t = await getTranslations("auth.panel");
  return {
    names: { eleve: t("profiles.eleve"), parent: t("profiles.parent"), repetiteur: t("profiles.repetiteur") },
    alts: { eleve: t("photoAlt.eleve"), parent: t("photoAlt.parent"), repetiteur: t("photoAlt.repetiteur") },
  };
}

