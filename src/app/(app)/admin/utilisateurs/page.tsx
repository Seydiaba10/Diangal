import { Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, Td, Th } from "@/components/ui/table";
import { getAdminUsers } from "@/features/admin/data";
import { formatDate } from "@/lib/format";

export async function generateMetadata() {
  const t = await getTranslations("adminUsers");
  return { title: t("title") };
}

async function Users({ searchParams }: { searchParams: PageProps<"/admin/utilisateurs">["searchParams"] }) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q) ?? "";
  const [users, t, tDemo] = await Promise.all([getAdminUsers(query), getTranslations("adminUsers"), getTranslations("demo")]);
  return (
    <div className="space-y-4">
      <form action="/admin/utilisateurs" role="search" className="relative max-w-sm">
        <label htmlFor="q" className="sr-only">
          {t("search")}
        </label>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-ink-subtle" aria-hidden />
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder={t("search")}
          className="h-11 w-full rounded-xl border border-line bg-surface pl-11 pr-4 text-sm text-ink focus:border-brand-600"
        />
      </form>
      <Table caption={t("title")}>
        <thead>
          <tr>
            <Th>{t("cols.name")}</Th>
            <Th>{t("cols.role")}</Th>
            <Th>{t("cols.city")}</Th>
            <Th>{t("cols.created")}</Th>
            <Th>{t("cols.consent")}</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <Td className="font-medium">{u.name}</Td>
              <Td>{tDemo(`roles.${u.role}`)}</Td>
              <Td>{u.city}</Td>
              <Td>{formatDate(u.createdAt)}</Td>
              <Td>
                {u.consentStatus ? (
                  <Badge tone={u.consentStatus === "pending" ? "danger" : u.consentStatus === "granted" ? "success" : "idle"}>
                    {t(`consent.${u.consentStatus}`)}
                  </Badge>
                ) : (
                  <span className="text-ink-subtle">—</span>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="text-xs text-ink-subtle">{t("privacy")}</p>
    </div>
  );
}

export default async function AdminUsersPage({ searchParams }: PageProps<"/admin/utilisateurs">) {
  const t = await getTranslations("adminUsers");
  return (
    <PageContainer width="wide" className="space-y-5 lg:space-y-7">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <Suspense fallback={<Skeleton className="h-64 rounded-2xl" />}>
        <Users searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
