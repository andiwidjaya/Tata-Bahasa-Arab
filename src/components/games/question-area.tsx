import { Question } from "@/types/quiz-engine";
import { ArabicText } from "@/components/learning/arabic-text";

interface QuestionAreaProps {
  question: Question;
  sentenceArabic?: string;
  targetWord?: string;
}

export function QuestionArea({ question, sentenceArabic, targetWord }: QuestionAreaProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-sm">
      {sentenceArabic && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <ArabicText size="xl" className="text-emerald-800 dark:text-emerald-300">
            {sentenceArabic}
          </ArabicText>
        </div>
      )}

      <div className="space-y-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pertanyaan I'rab</span>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
          {question.questionText}
        </h3>
      </div>
    </div>
  );
}
