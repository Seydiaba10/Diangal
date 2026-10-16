import { Archive, CircleCheck, CircleHelp, Eye, PencilLine, ShieldCheck, UserCheck, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import type { ContentVerification, PublishStatus } from "@/types/domain";

type Tone = Parameters<typeof Badge>[0]["tone"];

const STATUS: Record<PublishStatus, { tone: Tone; icon: LucideIcon }> = {
  published: { tone: "success", icon: CircleCheck },
  review: { tone: "info", icon: Eye },
  draft: { tone: "idle", icon: PencilLine },
  archived: { tone: "idle", icon: Archive },
};

const VERIFICATION: Record<ContentVerification, { tone: Tone; icon: LucideIcon }> = {
  official: { tone: "brand", icon: ShieldCheck },
  reviewed: { tone: "info", icon: UserCheck },
  unverified: { tone: "idle", icon: CircleHelp },
};

/** Statut de publication d'un chapitre ou d'une leçon (icône + libellé). */
export async function PublishStatusBadge({ status }: { status: PublishStatus }) {
  const t = await getTranslations("adminContent.status");
  const { tone, icon } = STATUS[status];
  return (
    <Badge tone={tone} icon={icon}>
      {t(status)}
    </Badge>
  );
}

/** Statut de vérification d'un chapitre : à vérifier, relu par un enseignant, source officielle. */
export async function VerificationBadge({ verification }: { verification: ContentVerification }) {
  const t = await getTranslations("adminContent.verification");
  const { tone, icon } = VERIFICATION[verification];
  return (
    <Badge tone={tone} icon={icon}>
      {t(verification)}
    </Badge>
  );
}
