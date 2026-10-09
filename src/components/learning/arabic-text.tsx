import * as React from "react";
import { cn } from "@/lib/utils";

interface ArabicTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export function ArabicText({ children, size = 'lg', className, ...props }: ArabicTextProps) {
  const sizeClasses = {
    sm: 'text-xl leading-loose',
    md: 'text-2xl sm:text-3xl leading-loose',
    lg: 'text-3xl sm:text-4xl leading-[2.2]',
    xl: 'text-4xl sm:text-5xl leading-[2.4]',
    '2xl': 'text-5xl sm:text-6xl leading-[2.5]',
  };

  return (
    <div
      dir="rtl"
      className={cn(
        "font-arabic font-bold text-slate-900 dark:text-slate-100 tracking-wide select-none transition-all",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
