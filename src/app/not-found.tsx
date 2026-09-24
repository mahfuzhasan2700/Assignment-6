import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center bg-[#12141a] border border-[#1f232b] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-[#181c25] border border-[#1f232b] flex items-center justify-center mx-auto mb-6 text-[#ccff00]">
          <Dumbbell className="w-8 h-8 rotate-45" />
        </div>

        <span className="text-xs font-black tracking-widest text-[#ccff00] uppercase font-display">
          ERROR 404
        </span>

        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white mt-2 mb-3">
          LOST IN THE GYM
        </h1>

        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          The plate or route you are looking for has been racked away or doesn&apos;t exist. Get back on track and log your work.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#d6ff33] text-[#090a0d] font-bold text-xs uppercase px-6 py-3.5 rounded-xl transition-all shadow-lg active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Back to Workouts</span>
          </Link>

          <Link
            href="/my-plan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#181c25] hover:bg-[#202532] text-zinc-300 font-semibold text-xs uppercase px-5 py-3.5 rounded-xl border border-[#1f232b] transition-colors"
          >
            <span>My Plan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
