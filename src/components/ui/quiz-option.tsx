"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { QuizOption as QuizOptionType } from "@/types/quiz";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  status?: 'idle' | 'correct' | 'incorrect';
  onSelect: () => void;
}

export function QuizOption({ option, isSelected, status = 'idle', onSelect }: QuizOptionProps) {
  return (
    <button
      onClick={onSelect}
      disabled={status !== 'idle'}
      className={cn(
        "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group",
        status === 'idle' && isSelected && "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30",
        status === 'idle' && !isSelected && "border-slate-200 hover:border-emerald-300 dark:border-slate-800 dark:hover:border-emerald-700 bg-white dark:bg-slate-900",
        status === 'correct' && "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200",
        status === 'incorrect' && "border-red-500 bg-red-100 dark:bg-red-900/50 text-red-900 dark:text-red-200"
      )}
    >
      <div className="flex items-center space-x-3">
        <span className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border transition",
          isSelected ? "bg-emerald-600 text-white border-emerald-600" : "border-slate-300 dark:border-slate-700 text-slate-500"
        )}>
          {option.id.toUpperCase()}
        </span>
        <span className="font-medium text-slate-800 dark:text-slate-200">{option.text}</span>
      </div>

      <div className="flex items-center space-x-3">
        {option.textArabic && (
          <span className="font-arabic text-xl text-slate-900 dark:text-slate-100 font-bold">
            {option.textArabic}
          </span>
        )}
        {status === 'correct' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
        {status === 'incorrect' && <XCircle className="w-5 h-5 text-red-600" />}
      </div>
    </button>
  );
}
