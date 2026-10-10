"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Award, LogIn, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LessonCompletionProps {
  lessonId: string;
  isCompletedInitial: boolean;
  xpReward: number;
}

export function LessonCompletion({ lessonId, isCompletedInitial, xpReward }: LessonCompletionProps) {
  const [isCompleted, setIsCompleted] = React.useState(isCompletedInitial);
  const [loading, setLoading] = React.useState(false);
  const [showGuestPrompt, setShowGuestPrompt] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const router = useRouter();

  React.useEffect(() => {
    async function checkUser() {
      const supabase = createClient();
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
    }
    checkUser();

    try {
      const saved = JSON.parse(localStorage.getItem("completed_lessons") || "[]");
      if (saved.includes(lessonId)) {
        setIsCompleted(true);
      }
    } catch (e) {}
  }, [lessonId]);

  const handleComplete = async () => {
    if (isCompleted || loading) return;

    if (!user) {
      setShowGuestPrompt(true);
      return;
    }

    setLoading(true);
    try {
      try {
        const saved = JSON.parse(localStorage.getItem("completed_lessons") || "[]");
        if (!saved.includes(lessonId)) {
          saved.push(lessonId);
          localStorage.setItem("completed_lessons", JSON.stringify(saved));
        }
      } catch (e) {}

      const supabase = createClient();

      // 1. Record Lesson Progress
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("user_progress") as any).upsert({
        user_id: user.id,
        lesson_id: lessonId,
        status: "completed",
        completed_at: new Date().toISOString(),
      });

      // 2. Award XP
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("user_xp") as any).insert({
        user_id: user.id,
        amount: xpReward,
        source: "lesson_completion",
        reference_id: lessonId,
      });

      // 3. Record Today's Streak
      const todayStr = new Date().toISOString().split("T")[0];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from("user_streaks") as any).upsert({
        user_id: user.id,
        streak_date: todayStr,
        completed: true,
      });

      setIsCompleted(true);
      router.refresh();
    } catch (err) {
      console.error("Failed to complete lesson", err);
      setIsCompleted(true);
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-center space-y-3 my-6 shadow-sm">
      {/* Guest Login/Register Prompt Modal */}
      {showGuestPrompt && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-md w-full space-y-4 text-center shadow-2xl animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-500 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100">Daftar Akun Untuk Simpan XP</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Anda berada di Mode Tamu. Silakan mendaftar atau masuk ke akun Anda agar perolehan <span className="font-bold text-emerald-600">+{xpReward} XP</span>, streak harian, dan lencana pencapaian tersimpan di profil Anda!
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/login"
                className="flex items-center justify-center space-x-1 py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <LogIn className="w-4 h-4 mr-1 text-emerald-600" />
                <span>Masuk</span>
              </Link>

              <Link
                href="/register"
                className="flex items-center justify-center space-x-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                <span>Daftar Akun</span>
              </Link>
            </div>
            <button
              onClick={() => setShowGuestPrompt(false)}
              className="text-xs text-slate-400 hover:text-slate-600 underline pt-1 block mx-auto"
            >
              Lanjutkan Membaca Sebagai Tamu
            </button>
          </div>
        </div>
      )}

      {isCompleted ? (
        <div className="flex flex-col items-center space-y-2 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
          <h4 className="font-extrabold text-xl">Alhamdulillah! Pelajaran Selesai 🎉</h4>
          <div className="inline-flex items-center space-x-1.5 bg-emerald-100 dark:bg-emerald-900/60 px-3 py-1 rounded-full text-emerald-800 dark:text-emerald-200 font-bold text-xs">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Berhasil Memperoleh +{xpReward} XP</span>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Apakah Anda sudah memahami materi ini?</h4>
          <p className="text-xs text-slate-500">Tandai selesai untuk mengumpulkan +{xpReward} XP ke profil Anda.</p>
          <Button onClick={handleComplete} disabled={loading} size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 font-bold">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>Menyimpan Progress...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                <span>Tandai Selesai (+{xpReward} XP)</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
