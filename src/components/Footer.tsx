import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0c0d10] border-t border-[#1f232b] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Brand logo icon + FITLOG */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-[#151921] border border-[#1f232b] flex items-center justify-center group-hover:border-[#ccff00]/40 transition-colors">
              <Image
                src="/assets/logo.png"
                alt="FitLog Logo"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </div>
            <span className="font-display text-xl font-bold tracking-wider text-white group-hover:text-[#ccff00] transition-colors">
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
