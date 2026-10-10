"use client";

import * as React from "react";
import { Award, Sparkles, X, Flame, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface XPEarnedAnimationProps {
  amount: number;
  onAnimationEnd?: () => void;
  className?: string;
}

export function XPEarnedAnimation({ amount, onAnimationEnd, className }: XPEarnedAnimationProps) {
  const [visible, setVisible] = React.useState(true);
  const [displayedXp, setDisplayedXp] = React.useState(0);

  React.useEffect(() => {
    if (amount <= 0) return;

    // Animate XP count from 0 to amount
    const duration = 1000;
    const steps = 20;
    const stepTime = duration / steps;
    const increment = Math.max(1, Math.ceil(amount / steps));

    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= amount) {
        setDisplayedXp(amount);
        clearInterval(interval);
      } else {
        setDisplayedXp(current);
      }
    }, stepTime);

    const autoCloseTimer = setTimeout(() => {
      setVisible(false);
      if (onAnimationEnd) onAnimationEnd();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(autoCloseTimer);
    };
  }, [amount, onAnimationEnd]);

  const handleClose = () => {
    setVisible(false);
    if (onAnimationEnd) onAnimationEnd();
  };

  if (!visible || amount <= 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
      {/* Floating Sparkle Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-75" />
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-emerald-400 rounded-full animate-bounce opacity-80" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-amber-300 rounded-full animate-pulse opacity-90" />
      </div>

      <div
        className={cn(
          "relative bg-white dark:bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl shadow-emerald-500/20 transform animate-in zoom-in-90 duration-300 space-y-5",
          className
        )}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Animated Icon */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500 to-amber-400 blur-lg opacity-60 animate-pulse" />
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30">
            <Award className="w-10 h-10 text-amber-300 animate-bounce" />
          </div>
          <div className="absolute -top-2 -right-2 bg-amber-400 p-1.5 rounded-full text-slate-950 shadow-md">
            <Sparkles className="w-4 h-4 fill-slate-950" />
          </div>
        </div>

        {/* Header Text */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Pelajaran Selesai!</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            MasyaAllah! 🎉
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            XP telah berhasil ditambahkan ke total statistik Anda!
          </p>
        </div>

        {/* Big XP Counter Badge */}
        <div className="py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
          <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
            Perolehan XP
          </span>
          <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight flex items-center justify-center space-x-1">
            <span>+{displayedXp}</span>
            <span className="text-2xl font-extrabold text-amber-500">XP</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClose}
          className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center space-x-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Lanjutkan Belajar</span>
        </button>
      </div>
    </div>
  );
}

