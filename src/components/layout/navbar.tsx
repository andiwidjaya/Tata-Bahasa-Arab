"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Flame, Award, LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-emerald-200 dark:shadow-none">
              ن
            </div>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-lg hidden sm:inline-block tracking-tight">
              Nahwu Shorof <span className="text-emerald-600">Academy</span>
            </span>
          </Link>
        </div>

        {/* Header Stats & Actions */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/50 px-3 py-1 rounded-full text-amber-700 dark:text-amber-400 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>7 Hari Streak</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/50 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>1,250 XP</span>
          </div>

          <Link href="/profile" className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <User className="w-5 h-5" />
          </Link>

          <Link href="/login" className="p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition">
            <LogOut className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
