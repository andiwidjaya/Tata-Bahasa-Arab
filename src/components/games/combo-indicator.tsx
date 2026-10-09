import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComboIndicatorProps {
  comboCount: number;
}

export function ComboIndicator({ comboCount }: ComboIndicatorProps) {
  if (comboCount < 2) return null;

  let multiplier = "x1";
  if (comboCount >= 10) multiplier = "x5";
  else if (comboCount >= 5) multiplier = "x3";
  else if (comboCount >= 3) multiplier = "x2";

  return (
    <div className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-md animate-pulse">
      <Flame className="w-4 h-4 fill-white" />
      <span>COMBO {comboCount} ({multiplier})</span>
    </div>
  );
}
