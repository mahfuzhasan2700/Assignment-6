import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "NOTHING HERE YET",
  description = "Browse the library and add a lift to get today moving.",
  ctaText = "Go to workouts",
  ctaHref = "/",
}) => {
  return (
    <div className="bg-[#12141a] border border-[#1f232b] rounded-3xl p-12 sm:p-16 text-center max-w-lg mx-auto my-6 shadow-xl">
      <div className="w-16 h-16 rounded-2xl bg-[#181c25] border border-[#1f232b] flex items-center justify-center mx-auto mb-4 text-zinc-500">
        <Dumbbell className="w-8 h-8" />
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white">
        {title}
      </h2>
      <p className="text-zinc-400 text-sm mt-2 mb-7 leading-relaxed">
        {description}
      </p>
      <Link
        href={ctaHref}
        className="inline-flex items-center gap-2.5 bg-[#ccff00] hover:bg-[#d6ff33] text-[#090a0d] font-bold text-xs uppercase px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg active:scale-95"
      >
        <span>{ctaText}</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </Link>
    </div>
  );
};
