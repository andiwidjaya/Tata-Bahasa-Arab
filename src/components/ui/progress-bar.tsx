import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  label?: string;
  variant?: 'emerald' | 'amber' | 'blue';
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, label, variant = 'emerald', className, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    const colorVariants = {
      emerald: 'bg-emerald-500',
      amber: 'bg-amber-500',
      blue: 'bg-blue-500',
    };

    return (
      <div className="w-full space-y-1.5" ref={ref} {...props}>
        {label && (
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span>{label}</span>
            <span>{Math.round(clampedValue)}%</span>
          </div>
        )}
        <div className={cn("h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200/50 dark:border-slate-700/50", className)}>
          <div
            className={cn("h-full rounded-full transition-all duration-500 ease-out", colorVariants[variant])}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";
