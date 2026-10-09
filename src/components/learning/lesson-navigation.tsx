import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LessonNavigationProps {
  prevHref?: string;
  nextHref?: string;
}

export function LessonNavigation({ prevHref, nextHref }: LessonNavigationProps) {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-800">
      {prevHref ? (
        <Link href={prevHref}>
          <Button variant="outline" size="sm" className="space-x-1">
            <ChevronLeft className="w-4 h-4" />
            <span>Pelajaran Sebelumnya</span>
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {nextHref && (
        <Link href={nextHref}>
          <Button variant="default" size="sm" className="space-x-1">
            <span>Pelajaran Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}
