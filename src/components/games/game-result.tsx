import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface GameResultProps {
  isVictory: boolean;
  score: number;
  xpEarned: number;
  maxCombo: number;
  onRestart: () => void;
}

export function GameResult({ isVictory, score, xpEarned, maxCombo, onRestart }: GameResultProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center space-y-6 max-w-md mx-auto shadow-xl">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-white text-3xl font-bold shadow-lg ${isVictory ? 'bg-emerald-600' : 'bg-red-600'}`}>
        {isVictory ? <Trophy className="w-10 h-10" /> : '💀'}
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          {isVictory ? "Kemenangan Telak! 🎉" : "Kekalahan 💔"}
        </h2>
        <p className="text-xs text-slate-500">
          {isVictory ? "Anda berhasil mengalahkan lawan dalam pertarungan I'rab!" : "Jangan menyerah, asah kembali pemahaman I'rab Anda!"}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl text-center">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Skor</p>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{score}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">XP Diraih</p>
          <p className="text-xl font-extrabold text-emerald-600">+{xpEarned}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Max Combo</p>
          <p className="text-xl font-extrabold text-amber-500">{maxCombo}x</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/games" className="w-1/2">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Kembali</span>
          </Button>
        </Link>
        <Button onClick={onRestart} className="w-1/2">
          <RotateCcw className="w-4 h-4 mr-2" />
          <span>Main Lagi</span>
        </Button>
      </div>
    </div>
  );
}
