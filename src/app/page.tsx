import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100">
      {/* Landing Header */}
      <header className="border-b border-slate-800 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            ن
          </div>
          <span className="font-bold text-xl tracking-tight">
            Nahwu Shorof <span className="text-emerald-500">Academy</span>
          </span>
        </div>
        <div className="flex space-x-3">
          <Link href="/login">
            <Button variant="ghost">Masuk</Button>
          </Link>
          <Link href="/register">
            <Button variant="default">Daftar Gratis</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto my-12 space-y-8">
        <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-800/60 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Platform Belajar Nahwu & Shorof Interaktif</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Kuasai Tata Bahasa Arab dengan <span className="text-emerald-500">Metode Modern & Gamifikasi</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl">
          Belajar kaidah Nahwu & Shorof secara bertahap dari pemula hingga mahir melalui materi audio, kuis interaktif, dan mini-games edukatif.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/dashboard">
            <Button size="lg" className="w-full sm:w-auto space-x-2">
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/learn">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Lihat Kurikulum
            </Button>
          </Link>
        </div>
      </main>

      {/* Landing Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        © 2026 Nahwu Shorof Academy. All rights reserved.
      </footer>
    </div>
  );
}
