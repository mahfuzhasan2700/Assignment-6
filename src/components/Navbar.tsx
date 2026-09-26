"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Menu, X, Dumbbell } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts, isLoaded } = usePlan();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const planCount = isLoaded ? todayPlan.length : 0;
  const savedCount = isLoaded ? savedWorkouts.length : 0;

  const isHomeActive = pathname === "/" || pathname === "";
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0b0d]/95 backdrop-blur-md border-b border-[#181a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="FitLog Home"
          >
            <Dumbbell className="w-6 h-6 text-[#ccff00] -rotate-45" />
            <span className="font-display text-2xl font-bold tracking-wider text-white">
              FITLOG
            </span>
          </Link>

          {/* Middle: Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 bg-[#121418] p-1.5 rounded-full border border-[#1d2026]">
            <Link
              href="/"
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                isHomeActive
                  ? "bg-[#181d14] text-[#ccff00] border border-[#ccff00]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                isPlanActive
                  ? "bg-[#181d14] text-[#ccff00] border border-[#ccff00]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </nav>

          {/* Right: Status Badges (Counters) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Plan Badge */}
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              title="Today's Plan"
            >
              <span>Plan</span>
              <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black font-black text-xs flex items-center justify-center shadow-sm">
                {planCount}
              </span>
            </Link>

            {/* Saved Badge */}
            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 text-xs font-semibold uppercase tracking-wider transition-colors ml-2"
              title="Saved Workouts"
            >
              <span>Saved</span>
              <span className="w-5 h-5 rounded-full border border-zinc-700 bg-[#16181d] text-zinc-300 font-bold text-xs flex items-center justify-center">
                {savedCount}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 mr-2"
            >
              <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black font-bold text-xs flex items-center justify-center">
                {planCount}
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#1a1d24] py-4 space-y-2 bg-[#0a0b0d]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isHomeActive
                  ? "bg-[#181d14] text-[#ccff00] border border-[#ccff00]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isPlanActive
                  ? "bg-[#181d14] text-[#ccff00] border border-[#ccff00]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
