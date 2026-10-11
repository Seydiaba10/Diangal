import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { StudentDashboard, StudentDashboardSkeleton } from "@/features/progress/components/student-dashboard";

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: t("home") };
}

export default function StudentHomePage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <Suspense fallback={<StudentDashboardSkeleton />}>
        <StudentDashboard />
      </Suspense>
    </div>
  );
}
