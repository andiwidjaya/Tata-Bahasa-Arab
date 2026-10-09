import * as React from "react";
import { cn } from "@/lib/utils";

interface HealthBarProps {
  label: string;
  currentHp: number;
  maxHp?: number;
  isPlayer?: boolean;
}

export function HealthBar({ label, currentHp, maxHp = 100, isPlayer = true }: HealthBarProps) {
  const percentage = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
        <span>{label}</span>
        <span>{Math.max(0, currentHp)} / {maxHp} HP</span>
      </div>
      <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            isPlayer ? "bg-emerald-500" : "bg-red-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
