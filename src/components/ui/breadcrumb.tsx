import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export async function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const t = await getTranslations("breadcrumb");
  return (
    <nav aria-label={t("label")}>
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-muted">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1">
            {index > 0 ? <ChevronRight className="size-4 shrink-0 text-ink-subtle" aria-hidden /> : null}
            {item.href ? (
              <Link href={item.href} className="truncate rounded-md hover:text-brand-700 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="truncate font-medium text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
