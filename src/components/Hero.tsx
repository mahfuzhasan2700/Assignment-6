import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Flame, Dumbbell, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#1f232b]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-[#1f232b]/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13161d] border border-[#1f232b] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00]">
                WORKOUT LIBRARY
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-[1.05]">
              TRAIN WITH INTENT.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#ccff00]">
                LOG EVERY SET.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#library"
                className="inline-flex items-center gap-3 bg-[#ccff00] hover:bg-[#d6ff33] text-[#090a0d] font-bold text-sm uppercase px-7 py-4 rounded-xl transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(204,255,0,0.35)] hover:shadow-[0_6px_25px_-2px_rgba(204,255,0,0.45)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>BROWSE WORKOUTS</span>
                <ArrowDown className="w-4 h-4 stroke-[2.5] animate-bounce" />
              </a>

              <Link
                href="/my-plan"
                className="inline-flex items-center gap-2 bg-[#13161d] hover:bg-[#1a1e27] border border-[#1f232b] hover:border-zinc-700 text-zinc-300 hover:text-white font-semibold text-sm px-6 py-4 rounded-xl transition-all duration-200"
              >
                <span>View Today&apos;s Plan</span>
              </Link>
            </div>

            {/* Quick stats pills */}
            <div className="pt-4 grid grid-cols-3 gap-3 w-full max-w-md border-t border-[#1f232b]/80">
              <div className="bg-[#13161d]/60 border border-[#1f232b] rounded-lg p-2.5">
                <div className="text-[#ccff00] font-display text-lg font-bold">12</div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Core Lifts</div>
              </div>
              <div className="bg-[#13161d]/60 border border-[#1f232b] rounded-lg p-2.5">
                <div className="text-[#ccff00] font-display text-lg font-bold">5 Lifts</div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Daily Cap</div>
              </div>
              <div className="bg-[#13161d]/60 border border-[#1f232b] rounded-lg p-2.5">
                <div className="text-[#ccff00] font-display text-lg font-bold">Live</div>
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-medium">Calorie Log</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-b from-[#151921] to-[#0c0d10] p-6 border border-[#1f232b] shadow-2xl flex items-center justify-center group overflow-hidden">
              {/* Neon border glow */}
              <div className="absolute inset-0 bg-radial from-[#ccff00]/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <Image
                src="/assets/banner.png"
                alt="FitLog Training Exercise Machine"
                width={420}
                height={420}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                priority
              />

              {/* Floating feature pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#090a0d]/90 backdrop-blur-md border border-[#1f232b] rounded-xl px-4 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-[#ccff00]" />
                  <span className="font-semibold text-zinc-200">Strict Form & Logging</span>
                </div>
                <span className="text-[#ccff00] font-bold font-display text-sm tracking-wide">NO EXCUSES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
