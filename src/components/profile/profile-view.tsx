"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { AchievementCard } from "@/components/profile/achievement-card";
import { UserAchievementItem } from "@/services/achievement.service";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Award,
  Flame,
  BookOpen,
  LogOut,
  Edit2,
  Check,
  ShieldCheck,
  User,
  Sparkles,
  Zap
} from "lucide-react";

interface ProfileViewProps {
  initialProfile: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    totalXp: number;
    level: number;
    streakDays: number;
    completedLessonsCount: number;
  };
  achievements: UserAchievementItem[];
}

export function ProfileView({ initialProfile, achievements }: ProfileViewProps) {
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [fullNameInput, setFullNameInput] = useState(initialProfile.fullName);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Level XP math
  const currentLevelXpTarget = profile.level * 250;
  const currentLevelXpProgress = profile.totalXp % 250;
  const progressPercent = Math.min(Math.round((currentLevelXpProgress / 250) * 100), 100);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullNameInput.trim()) return;

    setLoading(true);
    try {
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from("profiles") as any)
        .update({
          full_name: fullNameInput,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (error) throw error;

      setProfile({ ...profile, fullName: fullNameInput });
      setIsEditing(false);
      setToast("✓ Nama profil berhasil diperbarui!");
      setTimeout(() => setToast(null), 3000);
      router.refresh();
    } catch (err) {
      console.error("Profile save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="p-4 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md animate-in fade-in">
          {toast}
        </div>
      )}

      {/* Main Profile Header Card */}
      <Card className="bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950 text-white border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64 text-emerald-400" />
        </div>

        <CardContent className="pt-8 pb-6 px-6 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              {/* Avatar Circle */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white text-4xl font-extrabold border-4 border-emerald-500/30 shadow-lg shrink-0">
                {profile.fullName.charAt(0).toUpperCase()}
              </div>

              {/* Name & Info */}
              <div className="space-y-2">
                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={fullNameInput}
                      onChange={(e) => setFullNameInput(e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-lg focus:outline-none focus:border-emerald-500"
                    />
                    <Button type="submit" size="sm" disabled={loading} className="bg-emerald-600 text-white">
                      <Check className="w-4 h-4" />
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center space-x-2 justify-center sm:justify-start">
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">{profile.fullName}</h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Edit Nama"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <p className="text-xs text-slate-400 font-mono">{profile.email}</p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
                  <Badge variant="outline" className="bg-emerald-950/60 border-emerald-600/50 text-emerald-300">
                    Level {profile.level} Pembelajar
                  </Badge>
                  {profile.role === "admin" && (
                    <Badge className="bg-amber-400 text-slate-950 font-bold flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Administrator</span>
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Logout Action Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-rose-800/80 bg-rose-950/30 text-rose-300 hover:bg-rose-900/60 hover:text-white transition font-bold"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span>Keluar dari Akun</span>
            </Button>
          </div>

          {/* Level Progress Bar */}
          <div className="space-y-2 border-t border-slate-800 pt-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold flex items-center space-x-1">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Kemajuan Level {profile.level} ({currentLevelXpProgress} / 250 XP)</span>
              </span>
              <span className="text-emerald-400 font-extrabold">{progressPercent}%</span>
            </div>
            <ProgressBar value={progressPercent} className="h-3 bg-slate-800" />
            <p className="text-[11px] text-slate-400">
              Kumpulkan {250 - currentLevelXpProgress} XP lagi untuk naik ke <span className="font-bold text-white">Level {profile.level + 1}</span>!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Gamification Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 border-l-4 border-l-emerald-500">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Total XP Akumulasi</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{profile.totalXp.toLocaleString()} XP</h3>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-500">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-950 text-amber-600 rounded-xl">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Streak Belajar</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{profile.streakDays} Hari</h3>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-l-4 border-l-teal-500">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-teal-100 dark:bg-teal-950 text-teal-600 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold">Pelajaran Selesai</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{profile.completedLessonsCount} Materi</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Achievements Badges */}
      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Lencana Penghargaan ({unlockedCount} / {achievements.length})</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <AchievementCard key={ach.code} achievement={ach} />
          ))}
        </div>
      </div>
    </div>
  );
}
