import React from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0a0b0d] border-t border-[#181a20] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Brand logo icon + FITLOG */}
          <Link href="/" className="flex items-center gap-2 group">
            <Dumbbell className="w-5 h-5 text-[#ccff00] -rotate-45" />
            <span className="font-display text-xl font-bold tracking-wider text-white">
              FITLOG
            </span>
          </Link>

          {/* Right: Copyright line */}
          <p className="text-zinc-500 text-xs sm:text-sm text-center sm:text-right font-medium">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
};
