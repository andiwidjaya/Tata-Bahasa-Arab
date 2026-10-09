import * as React from "react";
import { cn } from "@/lib/utils";

interface TranslationProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function Translation({ children, className, ...props }: TranslationProps) {
  return (
    <p
      className={cn("text-sm text-slate-600 dark:text-slate-400 italic font-medium", className)}
      {...props}
    >
      "{children}"
    </p>
  );
}
