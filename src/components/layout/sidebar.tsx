"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Dumbbell, 
  Gamepad2, 
  User, 
  ShieldCheck 
} from "lucide-react";

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Pembelajaran', href: '/learn', icon: BookOpen },
  { label: 'Latihan', href: '/practice', icon: Dumbbell },
  { label: 'Game Edukasi', href: '/games', icon: Gamepad2 },
  { label: 'Profil Saya', href: '/profile', icon: User },
  { label: 'Admin CMS', href: '/admin', icon: ShieldCheck },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950 p-4 space-y-2 shrink-0">
      <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
        Menu Utama
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-none"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 dark:text-slate-400")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
