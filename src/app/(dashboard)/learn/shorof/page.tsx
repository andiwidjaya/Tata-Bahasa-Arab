import { Suspense } from "react";
import { fetchCourseChapters } from "@/services/learning.service";
import { CurriculumView } from "@/components/learning/curriculum-view";
import { connection } from "next/server";

async function ShorofContent() {
  await connection();
  const { course, chapters } = await fetchCourseChapters("shorof");

  if (!course) return null;

  return <CurriculumView course={course} chapters={chapters} />;
}

export default function ShorofLearnPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat Kurikulum Shorof...</div>}>
      <ShorofContent />
    </Suspense>
  );
}
