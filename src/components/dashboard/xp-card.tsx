import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

interface XPCardProps {
  xp: number;
}

export function XPCard({ xp }: XPCardProps) {
  return (
    <Card className="bg-emerald-50/80 border-emerald-200/80 dark:bg-emerald-950/40 dark:border-emerald-900/60">
      <CardContent className="p-4 flex items-center space-x-3">
        <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            Total XP
          </p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {xp.toLocaleString('id-ID')} <span className="text-xs font-bold text-emerald-600">XP</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
