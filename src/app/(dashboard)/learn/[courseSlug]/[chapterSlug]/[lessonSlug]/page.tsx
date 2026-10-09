import { Suspense } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { LessonHeader } from "@/components/learning/lesson-header";
import { LessonContent } from "@/components/learning/lesson-content";
import { LessonCompletion } from "@/components/learning/lesson-completion";
import { LessonNavigation } from "@/components/learning/lesson-navigation";
import { fetchLessonDetail } from "@/services/learning.service";
import { connection } from "next/server";

interface LessonPageProps {
  params: Promise<{
    courseSlug: string;
    chapterSlug: string;
    lessonSlug: string;
  }>;
}

async function LessonViewContent({ paramsPromise }: { paramsPromise: LessonPageProps['params'] }) {
  await connection();
  const { lessonSlug, courseSlug } = await paramsPromise;
  const detail = await fetchLessonDetail(lessonSlug);

  if (!detail) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Materi Tidak Ditemukan</h3>
        <p className="text-xs text-slate-500">Materi pelajaran ini belum tersedia.</p>
        <Link href={`/learn/${courseSlug}`}>
          <button className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs">
            Kembali ke Kurikulum
          </button>
        </Link>
      </div>
    );
  }

  const { lesson, contents, isCompletedInitial } = detail;

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto space-y-6">
        <LessonHeader
          title={lesson.title}
          titleArabic={lesson.titleArabic || undefined}
          chapterTitle={lesson.chapterTitle}
          category={lesson.category}
          learningObjective="Memahami definisi, ciri utama, dan contoh penggunaan dalam kalimat Bahasa Arab."
        />

        <LessonContent contents={contents} />

        <LessonCompletion
          lessonId={lesson.id}
          isCompletedInitial={isCompletedInitial}
          xpReward={lesson.xpReward}
        />

        <LessonNavigation prevHref={`/learn/${courseSlug}`} />
      </div>
    </PageContainer>
  );
}

export default function LessonDetailPage({ params }: LessonPageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat materi pelajaran...</div>}>
      <LessonViewContent paramsPromise={params} />
    </Suspense>
  );
}
