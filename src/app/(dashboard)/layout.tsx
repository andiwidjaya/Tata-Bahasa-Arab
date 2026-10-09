import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavigation } from "@/components/layout/mobile-nav";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<div className="w-64 border-r border-slate-200 dark:border-slate-800 hidden md:block" />}>
          <Sidebar />
        </Suspense>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
      <Suspense fallback={null}>
        <MobileNavigation />
      </Suspense>
    </div>
  );
}
