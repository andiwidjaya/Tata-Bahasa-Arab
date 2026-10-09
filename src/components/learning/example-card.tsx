import { Card } from "@/components/ui/card";
import { ArabicText } from "./arabic-text";
import { Translation } from "./translation";

interface ExampleCardProps {
  arabic: string;
  translation: string;
  explanation?: string;
}

export function ExampleCard({ arabic, translation, explanation }: ExampleCardProps) {
  return (
    <Card className="p-4 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Contoh Kalimat</span>
        <ArabicText size="md">{arabic}</ArabicText>
      </div>
      <Translation>{translation}</Translation>
      {explanation && (
        <p className="text-xs text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-2 mt-2">
          💡 {explanation}
        </p>
      )}
    </Card>
  );
}
