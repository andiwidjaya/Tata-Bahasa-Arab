import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface StreakCardProps {
  streakDays: number;
}

export function StreakCard({ streakDays }: StreakCardProps) {
  return (
    <Card className="bg-amber-50/80 border-amber-200/80 dark:bg-amber-950/40 dark:border-amber-900/60">
      <CardContent className="p-4 flex items-center space-x-3">
        <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950 shrink-0 shadow-sm">
          <Flame className="w-6 h-6 fill-slate-950" />
        </div>
        <div>
          <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
            Streak Harian
          </p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {streakDays} <span className="text-xs font-bold text-amber-600">Hari</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
