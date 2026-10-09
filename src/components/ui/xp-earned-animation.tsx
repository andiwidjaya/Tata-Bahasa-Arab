"use client";

import * as React from "react";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface XPEarnedAnimationProps {
  amount: number;
  onAnimationEnd?: () => void;
  className?: string;
}

export function XPEarnedAnimation({ amount, onAnimationEnd, className }: XPEarnedAnimationProps) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onAnimationEnd) onAnimationEnd();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onAnimationEnd]);

  if (!visible || amount <= 0) return null;

  return (
    <div
      className={cn(
        "fixed bottom-20 right-6 z-50 flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-xl shadow-emerald-600/30 border border-emerald-400/40 animate-bounce duration-1000",
        className
      )}
    >
      <Award className="w-6 h-6 text-amber-300" />
      <span className="font-extrabold text-base tracking-wide">+{amount} XP Berhasil Diraih!</span>
    </div>
  );
}
