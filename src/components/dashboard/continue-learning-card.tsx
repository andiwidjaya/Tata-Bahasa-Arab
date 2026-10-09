import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowRight, BookOpen } from "lucide-react";

interface ContinueLearningCardProps {
  lessonId?: string;
  lessonTitle?: string;
  lessonArabicTitle?: string;
  chapterTitle?: string;
  category?: 'nahwu' | 'shorof';
}

export function ContinueLearningCard({
  lessonId,
  lessonTitle,
  lessonArabicTitle,
  chapterTitle,
  category,
}: ContinueLearningCardProps) {
  if (!lessonId || !lessonTitle) {
    return (
      <Card className="border-dashed border-2 border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <CardContent className="p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Belum Ada Pembelajaran Aktif</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Mulai petualangan belajar Bahasa Arab Anda dari bab pertama Nahwu atau Shorof.
          </p>
          <Link href="/learn" className="inline-block pt-2">
            <Button size="sm">Mulai Pelajaran Pertama</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const isNahwu = category === 'nahwu';

  return (
    <Card className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white border-none shadow-lg shadow-emerald-900/10">
      <CardHeader>
        <div className="flex justify-between items-center text-emerald-100 text-xs font-semibold">
          <span>{chapterTitle || 'Melanjutkan Materi'}</span>
          {lessonArabicTitle && (
            <span className="font-arabic text-xl text-white font-bold">{lessonArabicTitle}</span>
          )}
        </div>
        <CardTitle className="text-2xl font-extrabold text-white mt-2">
          {lessonTitle}
        </CardTitle>
        <CardDescription className="text-emerald-100">
          Lanjutkan dari titik terakhir pembelajaran Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/learn/${isNahwu ? 'nahwu' : 'shorof'}`}>
          <Button variant="secondary" size="lg" className="space-x-2">
            <PlayCircle className="w-5 h-5 fill-slate-950" />
            <span>Lanjutkan Belajar</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
