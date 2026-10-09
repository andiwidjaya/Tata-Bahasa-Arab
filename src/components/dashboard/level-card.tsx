import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface LevelCardProps {
  level: number;
}

export function LevelCard({ level }: LevelCardProps) {
  return (
    <Card className="bg-blue-50/80 border-blue-200/80 dark:bg-blue-950/40 dark:border-blue-900/60">
      <CardContent className="p-4 flex items-center space-x-3">
        <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 shadow-sm">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
            Tingkat Pembelajar
          </p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Level {level}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
