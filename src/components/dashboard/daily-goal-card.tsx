import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Target } from "lucide-react";

interface DailyGoalCardProps {
  currentXpToday: number;
  targetXpToday: number;
  isStreakMaintained: boolean;
}

export function DailyGoalCard({
  currentXpToday,
  targetXpToday = 50,
  isStreakMaintained,
}: DailyGoalCardProps) {
  const percentage = Math.min(100, (currentXpToday / targetXpToday) * 100);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center space-x-2 text-slate-500">
          <Target className="w-5 h-5 text-emerald-600" />
          <CardTitle className="text-lg">Target Harian</CardTitle>
        </div>
        <CardDescription>Kumpulkan XP harian untuk merawat streak</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span>XP Harian: {currentXpToday} / {targetXpToday} XP</span>
            <span className="text-emerald-600">{Math.round(percentage)}%</span>
          </div>
          <ProgressBar value={percentage} variant="emerald" />
        </div>
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300">
          {isStreakMaintained ? (
            '🔥 Hebat! Target harian Anda sudah tercapai hari ini.'
          ) : (
            '⚡ Selesaikan 1 kuis atau materi lagi untuk mempertahankan streak!'
          )}
        </div>
      </CardContent>
    </Card>
  );
}
