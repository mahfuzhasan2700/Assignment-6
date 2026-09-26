"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#131518] hover:bg-[#16181d] border border-[#1e2127] hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Top Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0c0d10]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag Pills (Bright Green filled with black bold text) */}
          <div className="flex flex-wrap gap-2 mb-3">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="px-2.5 py-0.5 rounded-full bg-[#ccff00] text-[#090a0d] text-[11px] font-extrabold tracking-wider uppercase"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white leading-tight">
            {workout.name}
          </h3>

          {/* Equipment line */}
          <p className="mt-1 text-xs text-zinc-400 font-normal">
            {workout.equipment}
          </p>
        </div>

        {/* Divider & Stats Row */}
        <div className="mt-5 pt-3.5 border-t border-[#1e2127] flex items-center gap-4 text-xs text-zinc-400 font-medium">
          <div className="flex items-center gap-1.5" title="Duration">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5" title="Calories Burned">
            <Flame className="w-3.5 h-3.5 text-zinc-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5" title="Rating">
            <Star className="w-3.5 h-3.5 text-zinc-400" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
