"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { Clock, Flame, Star, Dumbbell, Plus, Check } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const { addToTodayPlan, isInTodayPlan } = usePlan();
  const added = isInTodayPlan(workout.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToTodayPlan(workout);
  };

  return (
    <div className="group relative bg-[#13161d] hover:bg-[#161a23] border border-[#1f232b] hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-xl">
      {/* Top Media / Thumbnail */}
      <Link href={`/workout/${workout.id}`} className="block relative aspect-4/3 overflow-hidden bg-[#0c0d10]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13161d] via-transparent to-black/20" />

        {/* Category Tag Pills */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="px-2.5 py-0.8 rounded-md bg-[#090a0d]/85 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-zinc-300 border border-[#1f232b]"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              workout.difficulty === "Beginner"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : workout.difficulty === "Advanced"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
            }`}
          >
            {workout.difficulty}
          </span>
        </div>
      </Link>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Workout Name */}
          <Link href={`/workout/${workout.id}`} className="block group-hover:text-[#ccff00] transition-colors">
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white leading-tight line-clamp-1">
              {workout.name}
            </h3>
          </Link>

          {/* Equipment line */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-zinc-400 font-medium line-clamp-1">
            <Dumbbell className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span>{workout.equipment}</span>
          </div>
        </div>

        {/* Stats Row & CTA */}
        <div className="mt-5 pt-3.5 border-t border-[#1f232b] flex items-center justify-between">
          {/* Stats row with icons: duration, calories, rating */}
          <div className="flex items-center gap-3 text-xs text-zinc-300 font-medium">
            <div className="flex items-center gap-1" title="Duration">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{workout.duration} min</span>
            </div>

            <span className="text-zinc-700">•</span>

            <div className="flex items-center gap-1" title="Calories Burned">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>

            <span className="text-zinc-700">•</span>

            <div className="flex items-center gap-1" title="User Rating">
              <Star className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
              <span className="text-white font-semibold">{workout.rating}</span>
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={added}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
              added
                ? "bg-[#1f232b] text-[#ccff00] cursor-default"
                : "bg-[#1f232b] hover:bg-[#ccff00] text-zinc-300 hover:text-[#090a0d] active:scale-95"
            }`}
            title={added ? "Already in today's plan" : "Add to today's plan"}
            aria-label={`Add ${workout.name} to plan`}
          >
            {added ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
