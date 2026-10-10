"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flame, Award, LogOut, User, LogIn, UserPlus, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);
  const [totalXp, setTotalXp] = React.useState<number>(0);
  const [level, setLevel] = React.useState<number>(1);
  const [streakDays, setStreakDays] = React.useState<number>(0);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function loadUserData() {
      try {
        const supabase = createClient();
        const { data: { user: currentUser } } = await supabase.auth.getUser();

        if (currentUser) {
          setUser(currentUser);
          if (currentUser.email === "juanda.andi@gmail.com") {
            setIsAdmin(true);
          }

          // Fetch XP
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: xpData } = await (supabase.from("user_xp") as any)
            .select("amount")
            .eq("user_id", currentUser.id);

          const sumXp = (xpData || []).reduce((acc: number, curr: any) => acc + curr.amount, 0);
          setTotalXp(sumXp);
          setLevel(Math.floor(sumXp / 250) + 1);

          // Fetch Streaks
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: streakData } = await (supabase.from("user_streaks") as any)
            .select("streak_date")
            .eq("user_id", currentUser.id);

          setStreakDays(streakData?.length || 0);

          // Fetch Profile for role check
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data: profile } = await (supabase.from("profiles") as any)
            .select("role")
            .eq("id", currentUser.id)
            .single();

          if (profile?.role === "admin") {
            setIsAdmin(true);
          }
        }
      } catch (err) {
        console.error("Navbar user load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-emerald-500/20">
              ن
            </div>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 text-lg hidden sm:inline-block tracking-tight">
              Nahwu Shorof <span className="text-emerald-600">Academy</span>
            </span>
          </Link>

          {!loading && !user && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hidden md:inline-block">
              Mode Tamu (Pratinjau)
            </span>
          )}
        </div>

        {/* Header Stats & User Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {user ? (
            <>
              {/* Streak Badge */}
              <div className="flex items-center space-x-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 px-3 py-1 rounded-full text-amber-700 dark:text-amber-400 text-xs font-bold">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                <span>{streakDays} Hari Streak</span>
              </div>

              {/* Dynamic XP Badge */}
              <div className="flex items-center space-x-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>{totalXp.toLocaleString()} XP (Lvl {level})</span>
              </div>

              {/* Admin Panel Access Link if Admin */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center space-x-1 bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full text-xs font-extrabold hover:bg-amber-300 transition"
                  title="Panel CMS Admin"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Admin CMS</span>
                </Link>
              )}

              {/* Profile Icon Link */}
              <Link
                href="/profile"
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
                title="Profil Saya"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Functional Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition text-xs font-bold"
                title="Keluar / Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <LogIn className="w-4 h-4 text-emerald-600" />
                <span>Masuk</span>
              </Link>

              <Link
                href="/register"
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Akun</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
