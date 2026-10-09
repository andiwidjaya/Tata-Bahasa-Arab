"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  Dumbbell, 
  Gamepad2, 
  User 
} from "lucide-react";

const mobileItems = [
  { label: 'Beranda', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Belajar', href: '/learn', icon: BookOpen },
  { label: 'Latihan', href: '/practice', icon: Dumbbell },
  { label: 'Game', href: '/games', icon: Gamepad2 },
  { label: 'Profil', href: '/profile', icon: User },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-slate-200 dark:bg-slate-950/90 dark:border-slate-800 px-2 py-2">
      <div className="flex justify-around items-center">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-1 px-3 rounded-xl transition text-xs font-medium",
                isActive ? "text-emerald-600 font-bold" : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
              )}
            >
              <Icon className={cn("w-5 h-5 mb-0.5", isActive ? "text-emerald-600" : "text-slate-500")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
