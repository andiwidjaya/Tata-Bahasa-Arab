import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { MistakeCard } from "@/components/review/mistake-card";
import { ReviewService } from "@/services/review.service";
import { createClient } from "@/lib/supabase/server";
import { connection } from "next/server";
import { CheckCircle2, RotateCcw } from "lucide-react";
import Link from "next/link";

async function ReviewContent() {
  await connection();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const mistakes = user ? await ReviewService.getUserMistakes(user.id) : [];

  if (mistakes.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Tidak Ada Materi yang Perlu Direview 🎉
        </h3>
        <p className="text-xs text-slate-500">
          Semua soal kuis Anda dijawab dengan sempurna. Lanjutkan pembelajaran untuk menambah wawasan!
        </p>
        <Link href="/learn" className="inline-block pt-2">
          <button className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs">
            Eksplor Materi Baru
          </button>
        </Link>
      </div>
    );
  }

  return (
    <PageContainer
      title="Review Materi & Soal Salah"
      description="Ulangi soal-soal yang pernah Anda jawab salah untuk meningkatkan tingkat penguasaan (Mastery)."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {mistakes.map((m) => (
          <MistakeCard
            key={m.id}
            questionText={m.questionText}
            questionArabic={m.questionArabic}
            lessonTitle={m.lessonTitle}
            mistakeCount={m.mistakeCount}
            masteryLevel={m.masteryLevel}
            onReview={() => {
              // Redirect to practice quiz for this question
              window.location.href = `/practice`;
            }}
          />
        ))}
      </div>
    </PageContainer>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat antrean review...</div>}>
      <ReviewContent />
    </Suspense>
  );
}
