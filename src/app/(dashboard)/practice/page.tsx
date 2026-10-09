import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import { QuizService } from "@/services/quiz.service";
import { connection } from "next/server";

interface PracticePageProps {
  searchParams: Promise<{
    lessonId?: string;
  }>;
}

async function PracticeContent({ searchParamsPromise }: { searchParamsPromise: PracticePageProps['searchParams'] }) {
  await connection();
  const { lessonId } = await searchParamsPromise;
  const quiz = await QuizService.getQuizByLessonId(lessonId || "l1111111-1111-1111-1111-111111111111");

  if (!quiz) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-500">Kuis belum tersedia untuk pelajaran ini.</p>
      </div>
    );
  }

  return (
    <PageContainer
      title="Sesi Latihan Interaktif"
      description="Uji pemahaman Nahwu & Shorof Anda dengan latihan soal interaktif."
    >
      <QuizRunner quiz={quiz} />
    </PageContainer>
  );
}

export default function PracticePage({ searchParams }: PracticePageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat kuis...</div>}>
      <PracticeContent searchParamsPromise={searchParams} />
    </Suspense>
  );
}
