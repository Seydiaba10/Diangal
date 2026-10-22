import { LogOut, Settings } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button, ButtonLink } from "@/components/ui/button";
import { signOutAction } from "../actions";

/** « Mon compte » et déconnexion, en bas des pages de profil (accès sur mobile, où la barre du bas est pleine). */
export async function AccountLinks() {
  const t = await getTranslations("account");
  return (
    <div className="space-y-2">
      <ButtonLink href="/compte" variant="outline" className="w-full">
        <Settings className="size-4" aria-hidden />
        {t("links.manage")}
      </ButtonLink>
      <form action={signOutAction}>
        <Button type="submit" variant="ghost" className="w-full">
          <LogOut className="size-4" aria-hidden />
          {t("session.signOut")}
        </Button>
      </form>
    </div>
  );
}
