import { Suspense } from "react";
import { fetchCourseChapters } from "@/services/learning.service";
import { CurriculumView } from "@/components/learning/curriculum-view";
import { connection } from "next/server";

async function NahwuContent() {
  await connection();
  const { course, chapters } = await fetchCourseChapters("nahwu");

  if (!course) return null;

  return <CurriculumView course={course} chapters={chapters} />;
}

export default function NahwuLearnPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat Kurikulum Nahwu...</div>}>
      <NahwuContent />
    </Suspense>
  );
}
