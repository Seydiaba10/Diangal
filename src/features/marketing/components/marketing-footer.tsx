import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/layout/logo";

const COLUMNS = [
  {
    key: "platform",
    links: [
      { href: "/#cours", key: "courses" },
      { href: "/#examens", key: "exams" },
      { href: "/repetiteurs", key: "tutors" },
      { href: "/tarifs", key: "pricing" },
    ],
  },
  {
    key: "families",
    links: [
      { href: "/inscription?role=parent", key: "parents" },
      { href: "/devenir-repetiteur", key: "becomeTutor" },
      { href: "/connexion", key: "signIn" },
    ],
  },
  {
    key: "legal",
    links: [
      { href: "/confidentialite", key: "privacy" },
      { href: "/cgu", key: "terms" },
      { href: "/mentions-legales", key: "legalNotice" },
    ],
  },
] as const;

export async function MarketingFooter() {
  const t = await getTranslations("marketing.footer");
  return (
    <footer className="border-t border-line bg-surface text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo href="/" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">{t("tagline")}</p>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.key}>
            <p className="text-sm font-semibold text-ink">{t(`columns.${column.key}`)}</p>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-sm text-ink-muted hover:text-brand-700">
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-ink-muted">{t("bottom", { year: 2026 })}</p>
      </div>
    </footer>
  );
}
