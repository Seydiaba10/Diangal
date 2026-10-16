import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { StudentDashboard, StudentDashboardSkeleton } from "@/features/progress/components/student-dashboard";
import { StudentTutorPanel, TutorLinkNotice } from "@/features/tutoring/components/family-tutor-panel";

async function MyTutor({ searchParams }: { searchParams: PageProps<"/eleve">["searchParams"] }) {
  const { repetiteur } = await searchParams;
  return (
    <div className="mt-5 space-y-4 lg:mt-7">
      <TutorLinkNotice value={repetiteur} />
      <StudentTutorPanel back="/eleve" />
    </div>
  );
}

export async function generateMetadata() {
  const t = await getTranslations("nav");
  return { title: t("home") };
}

export default function StudentHomePage({ searchParams }: PageProps<"/eleve">) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
      <Suspense fallback={<StudentDashboardSkeleton />}>
        <StudentDashboard />
      </Suspense>
      <Suspense fallback={null}>
        <MyTutor searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
