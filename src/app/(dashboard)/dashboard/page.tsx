import { PageContainer } from "@/components/layout/page-container";
import { XPCard } from "@/components/dashboard/xp-card";
import { StreakCard } from "@/components/dashboard/streak-card";
import { LevelCard } from "@/components/dashboard/level-card";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { ContinueLearningCard } from "@/components/dashboard/continue-learning-card";
import { DailyGoalCard } from "@/components/dashboard/daily-goal-card";
import { ReviewCard } from "@/components/dashboard/review-card";
import { Suspense } from "react";
import { fetchDashboardData } from "@/services/dashboard.service";
import { connection } from "next/server";

async function DashboardContent() {
  await connection();
  const data = await fetchDashboardData();

  return (
    <PageContainer
      title={`Assalamu'alaikum, ${data.profile.fullName} 👋`}
      description="Selamat datang kembali di platform pembelajaran Nahwu & Shorof Academy."
    >
      {/* Top Header Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <XPCard xp={data.totalXp} />
        <StreakCard streakDays={data.streakDays} />
        <LevelCard level={data.level} />
      </div>

      {/* Main Grid: Active Learning & Targets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="md:col-span-2">
          <ContinueLearningCard
            lessonId={data.activeLesson?.id}
            lessonTitle={data.activeLesson?.title}
            lessonArabicTitle={data.activeLesson?.titleArabic}
            chapterTitle={data.activeLesson?.chapterTitle}
            category={data.activeLesson?.category}
          />
        </div>

        <div className="space-y-6">
          <DailyGoalCard
            currentXpToday={data.xpToday}
            targetXpToday={50}
            isStreakMaintained={data.isTodayStreakCompleted}
          />
          <ReviewCard mistakeCount={data.pendingMistakesCount} />
        </div>
      </div>

      {/* Bottom Grid: Nahwu & Shorof Progress */}
      <div className="pt-4 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Progress Kurikulum</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProgressCard
            title="Kaidah Nahwu Dasar"
            category="nahwu"
            completedLessons={data.nahwuProgress.completed}
            totalLessons={data.nahwuProgress.total}
          />
          <ProgressCard
            title="Tashrif Shorof Dasar"
            category="shorof"
            completedLessons={data.shorofProgress.completed}
            totalLessons={data.shorofProgress.total}
          />
        </div>
      </div>
    </PageContainer>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 font-semibold animate-pulse">Memuat data dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
