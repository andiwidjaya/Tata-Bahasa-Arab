"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface LessonCompletionProps {
  lessonId: string;
  isCompletedInitial: boolean;
  xpReward: number;
}

export function LessonCompletion({ lessonId, isCompletedInitial, xpReward }: LessonCompletionProps) {
  const [isCompleted, setIsCompleted] = React.useState(isCompletedInitial);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleComplete = async () => {
    if (isCompleted || loading) return;

    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from("user_progress") as any).upsert({
          user_id: user.id,
          lesson_id: lessonId,
          status: "completed",
          completed_at: new Date().toISOString(),
        });

        // Award XP
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase.from("user_xp") as any).insert({
          user_id: user.id,
          amount: xpReward,
          source: "lesson_completion",
          reference_id: lessonId,
        });

        setIsCompleted(true);
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to complete lesson", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-center space-y-3 my-6">
      {isCompleted ? (
        <div className="flex flex-col items-center space-y-2 text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          <h4 className="font-bold text-lg">Alhamdulillah! Pelajaran Selesai 🎉</h4>
          <p className="text-xs">Anda telah memperoleh +{xpReward} XP dari materi ini.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-slate-100">Apakah Anda sudah paham materi ini?</h4>
          <p className="text-xs text-slate-500">Tandai selesai untuk mengumpulkan +{xpReward} XP ke profil Anda.</p>
          <Button onClick={handleComplete} disabled={loading} size="lg" className="w-full sm:w-auto">
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
