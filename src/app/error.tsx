"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-100 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-400">
        <AlertTriangle className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-extrabold tracking-tight">Terjadi Kesalahan Sistem</h1>
        <p className="text-sm text-slate-400">
          Maaf, aplikasi mengalami kesalahan tidak terduga. Silakan coba muat ulang halaman.
        </p>
      </div>

      <Button onClick={() => reset()} size="lg" className="space-x-2">
        <RotateCcw className="w-5 h-5" />
        <span>Coba Muat Ulang</span>
      </Button>
    </div>
  );
}
