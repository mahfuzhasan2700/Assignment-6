"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Menu, X, Dumbbell, Calendar, Bookmark } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts, isLoaded } = usePlan();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const planCount = isLoaded ? todayPlan.length : 0;
  const savedCount = isLoaded ? savedWorkouts.length : 0;

  const isHomeActive = pathname === "/" || pathname === "";
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090a0d]/90 backdrop-blur-md border-b border-[#1f232b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="FitLog Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#151921] border border-[#1f232b] flex items-center justify-center group-hover:border-[#ccff00]/50 transition-all duration-300">
              <Image
                src="/assets/logo.png"
                alt="FitLog Logo"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
                priority
              />
            </div>
            <span className="font-display text-2xl font-bold tracking-wider text-white group-hover:text-[#ccff00] transition-colors">
              FITLOG
            </span>
          </Link>

          {/* Middle: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#13161d] p-1.5 rounded-full border border-[#1f232b]">
            <Link
              href="/"
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                isHomeActive
                  ? "bg-[#1f232b] text-[#ccff00] shadow-sm font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                isPlanActive
                  ? "bg-[#1f232b] text-[#ccff00] shadow-sm font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </nav>

          {/* Right: Status Badges (Counters) */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Plan Badge - Filled pill with accent background (#ccff00) */}
            <Link
              href="/my-plan"
              className="flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-[#090a0d] font-bold text-xs uppercase px-3.5 py-1.5 rounded-full transition-all duration-200 shadow-sm active:scale-95"
              title="Today's Plan"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Plan</span>
              <span className="bg-[#090a0d] text-[#ccff00] text-xs font-black px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {planCount}
              </span>
            </Link>

            {/* Saved Badge - Pill with outline/border only */}
            <Link
              href="/my-plan"
              className="flex items-center gap-2 bg-transparent hover:bg-[#151921] border border-zinc-700 hover:border-zinc-500 text-zinc-200 text-xs font-semibold uppercase px-3.5 py-1.5 rounded-full transition-all duration-200 active:scale-95"
              title="Saved Workouts"
            >
              <Bookmark className="w-3.5 h-3.5 text-zinc-400" />
              <span>Saved</span>
              <span className="bg-[#1f232b] text-zinc-300 text-xs font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {savedCount}
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 bg-[#ccff00] text-[#090a0d] text-xs font-bold px-2.5 py-1 rounded-full"
            >
              <span>Plan</span>
              <span className="bg-[#090a0d] text-[#ccff00] px-1 rounded-full text-[10px]">
                {planCount}
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg bg-[#151921] border border-[#1f232b]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#1f232b] py-4 space-y-3 bg-[#090a0d]/95 backdrop-blur-lg">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isHomeActive
                    ? "bg-[#151921] text-[#ccff00] border border-[#1f232b]"
                    : "text-zinc-300 hover:bg-[#151921]"
                }`}
              >
                Workout
              </Link>
              <Link
                href="/my-plan"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isPlanActive
                    ? "bg-[#151921] text-[#ccff00] border border-[#1f232b]"
                    : "text-zinc-300 hover:bg-[#151921]"
                }`}
              >
                My Plan
              </Link>
            </div>

            <div className="pt-2 border-t border-[#1f232b] flex items-center justify-around">
              <Link
                href="/my-plan"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 bg-[#ccff00] text-[#090a0d] text-xs font-bold px-4 py-2 rounded-full"
              >
                <Calendar className="w-4 h-4" />
                <span>Today's Plan ({planCount})</span>
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 border border-zinc-700 text-zinc-200 text-xs font-semibold px-4 py-2 rounded-full"
              >
                <Bookmark className="w-4 h-4" />
                <span>Saved ({savedCount})</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
