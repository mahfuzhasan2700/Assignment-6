
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import {
  Flame,
  Clock,
  Dumbbell,
  Star,
  Check,
  X,
  Eye,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Calendar,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import { EmptyState } from "@/components/EmptyState";

export default function MyPlanPage() {
  const {
    todayPlan,
    savedWorkouts,
    isLoaded,
    metrics,
    removeFromTodayPlan,
    removeFromSaved,
    toggleMarkAsDone,
    clearTodayPlan,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  // Loading state
  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
        <div className="inline-flex items-center gap-3 text-zinc-400 font-medium text-sm bg-[#13161d] border border-[#1f232b] px-5 py-3 rounded-full animate-pulse">
          <div className="w-4 h-4 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin" />
          <span>Loading workouts…</span>
        </div>
      </div>
    );
  }

  const currentList = activeTab === "plan" ? todayPlan : savedWorkouts;

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ccff00] uppercase tracking-widest mb-1.5 font-display">
            <span>DAILY WORKBENCH</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
            MY PLAN
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {todayPlan.length > 0 && activeTab === "plan" && (
          <button
            onClick={clearTodayPlan}
            className="self-start md:self-auto text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1f232b] hover:border-red-500/30 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Today&apos;s Plan</span>
          </button>
        )}
      </div>

      {/* Metrics Summary Row (3 Stat Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {/* Card 1: Exercises */}
        <div className="bg-[#12141a] border border-[#1f232b] rounded-2xl p-5 relative overflow-hidden shadow-lg group hover:border-[#ccff00]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display">
              Exercises
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#181c25] flex items-center justify-center text-[#ccff00]">
              <Dumbbell className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-white">
              {metrics.exercises}
            </span>
            <span className="text-zinc-500 text-sm font-semibold">/ 5 max</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 w-full bg-[#1c212c] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#ccff00] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (metrics.exercises / 5) * 100)}%` }}
            />
          </div>

          <div className="mt-2 text-[11px] text-zinc-500 flex justify-between">
            <span>Completed: {metrics.completed}</span>
            <span>{5 - metrics.exercises} slots left</span>
          </div>
        </div>

        {/* Card 2: Minutes */}
        <div className="bg-[#12141a] border border-[#1f232b] rounded-2xl p-5 relative overflow-hidden shadow-lg group hover:border-[#ccff00]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display">
              Minutes
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#181c25] flex items-center justify-center text-sky-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-white">
              {metrics.minutes}
            </span>
            <span className="text-zinc-500 text-sm font-semibold">min estimated</span>
          </div>

          <div className="mt-3 w-full bg-[#1c212c] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-sky-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (metrics.minutes / 60) * 100)}%` }}
            />
          </div>

          <div className="mt-2 text-[11px] text-zinc-500">
            Total active gym training time
          </div>
        </div>

        {/* Card 3: Calories */}
        <div className="bg-[#12141a] border border-[#1f232b] rounded-2xl p-5 relative overflow-hidden shadow-lg group hover:border-[#ccff00]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display">
              Calories
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#181c25] flex items-center justify-center text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-black text-white">
              {metrics.calories}
            </span>
            <span className="text-zinc-500 text-sm font-semibold">kcal burn</span>
          </div>

          <div className="mt-3 w-full bg-[#1c212c] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-orange-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (metrics.calories / 1000) * 100)}%` }}
            />
          </div>

          <div className="mt-2 text-[11px] text-zinc-500">
            Projected energy consumption
          </div>
        </div>
      </div>

      {/* Tabs Row: Today's Plan / Saved */}
      <div className="flex items-center gap-3 border-b border-[#1f232b] pb-4 mb-8">
        <button
          onClick={() => setActiveTab("plan")}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "plan"
            ? "bg-[#ccff00] text-[#090a0d] shadow-sm"
            : "bg-[#13161d] text-zinc-400 hover:text-white hover:bg-[#181c25] border border-[#1f232b]"
            }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Today&apos;s Plan</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${activeTab === "plan"
              ? "bg-[#090a0d] text-[#ccff00]"
              : "bg-[#1f232b] text-zinc-300"
              }`}
          >
            {todayPlan.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "saved"
            ? "bg-[#ccff00] text-[#090a0d] shadow-sm"
            : "bg-[#13161d] text-zinc-400 hover:text-white hover:bg-[#181c25] border border-[#1f232b]"
            }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${activeTab === "saved"
              ? "bg-[#090a0d] text-[#ccff00]"
              : "bg-[#1f232b] text-zinc-300"
              }`}
          >
            {savedWorkouts.length}
          </span>
        </button>
      </div>

      {/* Workout Cards List / Empty State */}
      {currentList.length === 0 ? (
        <EmptyState
          title="NOTHING HERE YET"
          description={
            activeTab === "plan"
              ? "Browse the library and add a lift to get today moving."
              : "No saved workouts yet. Save exercises from the library to review later."
          }
          ctaText="Go to workouts"
          ctaHref="/"
        />
      ) : (
        /* Workout Cards List */
        <div className="space-y-4">
          {currentList.map((item) => {
            const isCompleted = activeTab === "plan" && Boolean(item.completed);

            return (
              <div
                key={item.id}
                className={`bg-[#12141a] border rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 shadow-md ${isCompleted
                  ? "border-emerald-500/40 bg-[#101915]/60 opacity-80"
                  : "border-[#1f232b] hover:border-zinc-700"
                  }`}
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#0c0d10] shrink-0 border border-[#1f232b]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    {isCompleted && (
                      <div className="absolute inset-0 bg-emerald-950/70 flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7 text-[#ccff00]" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#ccff00]">
                        {item.muscleGroups.join(" / ")}
                      </span>
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                          DONE
                        </span>
                      )}
                    </div>

                    <h3
                      className={`font-display text-lg sm:text-xl font-bold uppercase tracking-wide truncate ${isCompleted ? "line-through text-zinc-400" : "text-white"
                        }`}
                    >
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <Dumbbell className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="truncate">{item.equipment}</span>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 pt-1 text-xs text-zinc-300">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{item.duration} min</span>
                      </div>
                      <span className="text-zinc-700">•</span>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-orange-400" />
                        <span>{item.caloriesBurned} kcal</span>
                      </div>
                      <span className="text-zinc-700">•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-[#1f232b]">
                  {/* View Details Button */}
                  <Link
                    href={`/workout/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#181c25] hover:bg-[#202532] text-zinc-200 border border-[#1f232b] hover:border-zinc-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-zinc-400" />
                    <span>View Details</span>
                  </Link>

                  {/* Challenge C3: Mark as Done Button (Today's Plan tab) */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => toggleMarkAsDone(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${isCompleted
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                        : "bg-[#1f232b] hover:bg-[#ccff00] text-zinc-200 hover:text-[#090a0d] border border-transparent"
                        }`}
                      title={isCompleted ? "Mark incomplete" : "Mark as done"}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{isCompleted ? "Completed" : "Mark as Done"}</span>
                    </button>
                  )}

                  {/* Challenge C3: Remove (X) Button */}
                  <button
                    onClick={() => {
                      if (activeTab === "plan") {
                        removeFromTodayPlan(item.id);
                      } else {
                        removeFromSaved(item.id);
                      }
                    }}
                    className="p-2 rounded-xl text-zinc-400 hover:text-red-400 bg-[#181c25] hover:bg-red-500/10 border border-[#1f232b] hover:border-red-500/30 transition-colors"
                    title="Remove from list"
                    aria-label={`Remove ${item.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
