import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArabicText } from "@/components/learning/arabic-text";
import { RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";

interface MistakeCardProps {
  questionText: string;
  questionArabic?: string;
  lessonTitle?: string;
  mistakeCount: number;
  masteryLevel: number;
  onReview: () => void;
}

export function MistakeCard({
  questionText,
  questionArabic,
  lessonTitle,
  mistakeCount,
  masteryLevel,
  onReview,
}: MistakeCardProps) {
  const masteryLabels = ["Belum Dipelajari", "Learning", "Familiar", "Mastered"];
  const masteryVariants: ("destructive" | "secondary" | "outline" | "default")[] = [
    "destructive",
    "secondary",
    "outline",
    "default",
  ];

  return (
    <Card className="hover:border-amber-400 transition">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="text-xs">
            {lessonTitle || "Materi Umum"}
          </Badge>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-red-500 flex items-center space-x-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{mistakeCount}x Salah</span>
            </span>
            <Badge variant={masteryVariants[masteryLevel] || "outline"}>
              {masteryLabels[masteryLevel] || "Learning"}
            </Badge>
          </div>
        </div>

        <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {questionText}
        </CardTitle>

        {questionArabic && (
          <div className="pt-2">
            <ArabicText size="md" className="text-emerald-800 dark:text-emerald-300">
              {questionArabic}
            </ArabicText>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Button onClick={onReview} variant="secondary" className="w-full space-x-2">
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi & Pelajari Soal Ini</span>
        </Button>
      </CardContent>
    </Card>
  );
}
