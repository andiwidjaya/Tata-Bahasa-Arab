import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BookOpen } from "lucide-react";

interface ProgressCardProps {
  title: string;
  category: 'nahwu' | 'shorof';
  completedLessons: number;
  totalLessons: number;
}

export function ProgressCard({ title, category, completedLessons, totalLessons }: ProgressCardProps) {
  const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const isNahwu = category === 'nahwu';

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
            <BookOpen className={`w-3.5 h-3.5 ${isNahwu ? 'text-emerald-600' : 'text-amber-600'}`} />
            <span>Progress {isNahwu ? 'Nahwu' : 'Shorof'}</span>
          </span>
          <span className="font-arabic font-bold text-lg text-slate-700 dark:text-slate-300">
            {isNahwu ? 'عِلْمُ النَّحْوِ' : 'عِلْمُ الصَّرْفِ'}
          </span>
        </div>
        <CardTitle className="text-base font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ProgressBar
          value={percentage}
          variant={isNahwu ? 'emerald' : 'amber'}
          label={`${completedLessons} dari ${totalLessons} Pelajaran Selesai`}
        />
      </CardContent>
    </Card>
  );
}
