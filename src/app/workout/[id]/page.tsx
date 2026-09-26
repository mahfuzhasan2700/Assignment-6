"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { FALLBACK_WORKOUTS, API_BASE_URL } from "@/data/fallbackWorkouts";
import { usePlan } from "@/context/PlanContext";
import {
  Calendar,
  Bookmark,
  Check,
  Dumbbell,
  ArrowLeft,
} from "lucide-react";

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const id = Number(idStr);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { addToTodayPlan, addToSaved, isInTodayPlan, isInSaved, todayPlan } = usePlan();

  useEffect(() => {
    let isMounted = true;

    const loadWorkout = async () => {
      if (isNaN(id)) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/${id}`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (data && data.name) {
              setWorkout(data);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("Could not fetch workout from API, falling back to local dataset:", err);
      }

      // Fallback
      if (isMounted) {
        const found = FALLBACK_WORKOUTS.find((w) => w.id === id);
        if (found) {
          setWorkout(found);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      }
    };

    loadWorkout().finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 aspect-square bg-[#131518] rounded-3xl" />
          <div className="lg:col-span-6 space-y-6">
            <div className="h-10 bg-[#131518] rounded w-3/4" />
            <div className="h-20 bg-[#131518] rounded" />
            <div className="h-48 bg-[#131518] rounded-2xl" />
            <div className="h-32 bg-[#131518] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !workout) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#131518] border border-[#1e2127] flex items-center justify-center mx-auto mb-4">
          <Dumbbell className="w-8 h-8 text-zinc-500" />
        </div>
        <h1 className="font-display text-3xl font-bold uppercase text-white mb-2">
          WORKOUT NOT FOUND
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          The requested lift does not exist in the library.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#ccff00] text-[#090a0d] font-bold text-xs uppercase px-5 py-3 rounded-xl transition-all hover:bg-[#d6ff33]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Library</span>
        </Link>
      </div>
    );
  }

  const inPlan = isInTodayPlan(workout.id);
  const inSaved = isInSaved(workout.id);

  const keySpecs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <div className="py-10 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Two-column layout matching Figma */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column — Large Media */}
        <div className="lg:col-span-6 w-full">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#131518] border border-[#1e2127] shadow-xl">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Right Column — Details & Specifications */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Workout Title */}
          <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
            {workout.name}
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-2 text-zinc-400 text-sm sm:text-base leading-relaxed">
            {workout.description}
          </p>

          {/* Category Tag Pills (Bright Green filled with black bold text) */}
          <div className="flex flex-wrap gap-2 mt-4 mb-6">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="px-3.5 py-1 rounded-full bg-[#ccff00] text-[#090a0d] text-xs font-bold uppercase tracking-wider"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs Table/Panel */}
          <div className="bg-[#131518] border border-[#1e2127] rounded-2xl overflow-hidden divide-y divide-[#1e2127] mb-8 shadow-sm">
            {keySpecs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between px-6 py-3.5 text-xs"
              >
                <span className="font-semibold uppercase tracking-wider text-zinc-400">
                  {spec.label}
                </span>
                <span className="font-medium text-white text-sm">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* INSTRUCTIONS Section */}
          <div className="mb-8">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-3">
              INSTRUCTIONS
            </h2>

            <ol className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {workout.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-zinc-400 font-semibold">{idx + 1}.</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            {/* Primary Button: Add to today's plan */}
            <button
              onClick={() => addToTodayPlan(workout)}
              className="inline-flex items-center justify-center gap-2.5 bg-[#ccff00] hover:bg-[#d6ff33] text-[#090a0d] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all duration-200 shadow-sm active:scale-95"
            >
              {inPlan ? <Check className="w-4 h-4 stroke-[3]" /> : <Calendar className="w-4 h-4 stroke-[2.5]" />}
              <span>{inPlan ? "Added to today's plan" : "Add to today's plan"}</span>
            </button>

            {/* Secondary Button: Save for later */}
            <button
              onClick={() => addToSaved(workout)}
              className="inline-flex items-center justify-center gap-2.5 bg-transparent hover:bg-[#181a20] border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all duration-200 active:scale-98"
            >
              <Bookmark className={`w-4 h-4 ${inSaved ? "fill-zinc-300" : "text-zinc-400"}`} />
              <span>{inSaved ? "Saved for later" : "Save for later"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
