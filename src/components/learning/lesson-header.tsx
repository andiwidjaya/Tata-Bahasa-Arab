import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface LessonHeaderProps {
  title: string;
  titleArabic?: string;
  chapterTitle?: string;
  category?: string;
  learningObjective?: string;
}

export function LessonHeader({
  title,
  titleArabic,
  chapterTitle,
  category,
  learningObjective,
}: LessonHeaderProps) {
  return (
    <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
      <div className="flex items-center space-x-2">
        <Badge variant={category === 'nahwu' ? 'default' : 'secondary'} className="uppercase">
          {category || 'Materi'}
        </Badge>
        {chapterTitle && (
          <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{chapterTitle}</span>
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          {title}
        </h1>
        {titleArabic && (
          <span className="font-arabic text-3xl font-bold text-emerald-700 dark:text-emerald-400">
            {titleArabic}
          </span>
        )}
      </div>

      {learningObjective && (
        <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 font-medium">
          🎯 <span className="font-bold">Tujuan Pembelajaran:</span> {learningObjective}
        </div>
      )}
    </div>
  );
}
