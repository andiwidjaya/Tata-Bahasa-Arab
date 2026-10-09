import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle2 } from "lucide-react";

interface ReviewCardProps {
  mistakeCount: number;
}

export function ReviewCard({ mistakeCount }: ReviewCardProps) {
  return (
    <Card className="border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20">
      <CardHeader>
        <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
          <RotateCcw className="w-5 h-5" />
          <CardTitle className="text-lg">Review Rekomendasi</CardTitle>
        </div>
        <CardDescription>
          {mistakeCount > 0
            ? `Terdapat ${mistakeCount} soal yang sering Anda perbaiki.`
            : 'Belum ada catatan soal salah. Pertahankan!'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {mistakeCount > 0 ? (
          <Link href="/practice">
            <Button variant="secondary" size="sm" className="w-full space-x-2">
              <RotateCcw className="w-4 h-4" />
              <span>Review {mistakeCount} Soal Salah</span>
            </Button>
          </Link>
        ) : (
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/40">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Semua soal kuis Anda terjawab sempurna!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
