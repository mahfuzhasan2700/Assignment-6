import React from "react";
import Image from "next/image";

export const Hero: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      <div className="bg-[#131518] border border-[#1e2127] rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <span className="text-xs font-bold text-[#ccff00] uppercase tracking-wider mb-4">
              WORKOUT LIBRARY
            </span>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white leading-[1.02] mb-4">
              TRAIN WITH INTENT. LOG<br />EVERY SET.
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <a
              href="#library"
              className="inline-flex items-center justify-center bg-[#ccff00] hover:bg-[#d6ff33] text-[#090a0d] font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg transition-all duration-200 active:scale-95"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          {/* Right Column: Hero Banner Image */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] aspect-square flex items-center justify-center">
              <Image
                src="/assets/banner.png"
                alt="FitLog Gym Equipment Illustration"
                width={440}
                height={440}
                className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
