import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-100 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
        <SearchX className="w-10 h-10" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-extrabold tracking-tight">404 - Halaman Tidak Ditemukan</h1>
        <p className="text-sm text-slate-400">
          Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
        </p>
      </div>

      <Link href="/dashboard">
        <Button size="lg" className="space-x-2">
          <Home className="w-5 h-5" />
          <span>Kembali ke Dashboard</span>
        </Button>
      </Link>
    </div>
  );
}
