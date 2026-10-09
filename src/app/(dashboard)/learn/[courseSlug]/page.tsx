import { Suspense } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchCourseChapters } from "@/services/learning.service";
import { connection } from "next/server";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

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

  const isNahwu = course.category === 'nahwu';

  return (
    <PageContainer
      title={course.title}
      description={course.description || ''}
      action={<Badge variant={isNahwu ? "default" : "secondary"}>Level {course.level}</Badge>}
    >
      <div className="space-y-6 pt-2">
        {chapters.map((chapter) => (
          <Card key={chapter.id} className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <BookOpen className={`w-5 h-5 ${isNahwu ? 'text-emerald-600' : 'text-amber-500'}`} />
                <span>{chapter.title}</span>
              </CardTitle>
              {chapter.description && <CardDescription>{chapter.description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-3">
              {chapter.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/learn/${courseSlug}/${chapter.id}/${lesson.id}`}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    {lesson.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 transition">
                        {lesson.title}
                      </p>
                      {lesson.titleArabic && (
                        <p className="font-arabic text-base text-emerald-700 dark:text-emerald-400 font-bold">
                          {lesson.titleArabic}
                        </p>
                      )}
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}

export default function CourseDetailPage({ params }: CoursePageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat daftar bab...</div>}>
      <CourseContent paramsPromise={params} />
    </Suspense>
  );
}
