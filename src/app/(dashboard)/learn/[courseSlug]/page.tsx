import { Suspense } from "react";
import Link from "next/link";
import { fetchCourseChapters } from "@/services/learning.service";
import { CurriculumView } from "@/components/learning/curriculum-view";
import { connection } from "next/server";

interface CoursePageProps {
  params: Promise<{
    courseSlug: string;
  }>;
}

async function CourseContent({ paramsPromise }: { paramsPromise: CoursePageProps['params'] }) {
  await connection();
  const { courseSlug } = await paramsPromise;
  const { course, chapters } = await fetchCourseChapters(courseSlug);

  if (!course) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Kursus Tidak Ditemukan</h3>
        <p className="text-xs text-slate-500">Kategori kursus "{courseSlug}" belum tersedia.</p>
        <Link href="/learn">
          <button className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs">
            Kembali ke Daftar Kursus
          </button>
        </Link>
      </div>
    );
  }

  return <CurriculumView course={course} chapters={chapters} />;
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat daftar bab...</div>}>
      <CourseContent paramsPromise={params} />
    </Suspense>
  );
}
