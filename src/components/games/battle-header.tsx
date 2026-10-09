import { HealthBar } from "./health-bar";
import { Swords, Timer } from "lucide-react";

interface BattleHeaderProps {
  playerHp: number;
  opponentHp: number;
  timeLeft: number;
  score: number;
}

export function BattleHeader({ playerHp, opponentHp, timeLeft, score }: BattleHeaderProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-emerald-600 font-extrabold text-lg">
          <Swords className="w-6 h-6" />
          <span>I'RAB BATTLE</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300">
            <Timer className="w-4 h-4 text-amber-500" />
            <span>{timeLeft}s</span>
          </div>
          <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
            Skor: <span className="text-emerald-600">{score}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <HealthBar label="Pahlawan (Anda)" currentHp={playerHp} isPlayer={true} />
        <HealthBar label="Lawan (AI / Opponent)" currentHp={opponentHp} isPlayer={false} />
      </div>
    </div>
  );
}
