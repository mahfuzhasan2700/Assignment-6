"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { FALLBACK_WORKOUTS, API_BASE_URL } from "@/data/fallbackWorkouts";
import { usePlan } from "@/context/PlanContext";
import {
  ArrowLeft,
  Calendar,
  Bookmark,
  Check,
  Clock,
  Flame,
  Star,
  Dumbbell,
  Layers,
  Repeat,
  Gauge,
  Sparkles,
  ChevronRight,
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
        <div className="h-6 w-36 bg-[#181c25] rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 aspect-square bg-[#181c25] rounded-3xl" />
          <div className="lg:col-span-6 space-y-6">
            <div className="h-10 bg-[#181c25] rounded w-3/4" />
            <div className="h-20 bg-[#181c25] rounded" />
            <div className="h-48 bg-[#181c25] rounded-2xl" />
            <div className="h-32 bg-[#181c25] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !workout) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#151921] border border-[#1f232b] flex items-center justify-center mx-auto mb-4">
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
  const planIsFull = todayPlan.length >= 5 && !inPlan;

  const keySpecs = [
    { label: "EQUIPMENT", value: workout.equipment, icon: Dumbbell },
    { label: "DIFFICULTY", value: workout.difficulty, icon: Gauge },
    { label: "SETS", value: workout.sets, icon: Layers },
    { label: "REPS", value: workout.reps, icon: Repeat },
    { label: "DURATION", value: `${workout.duration} min`, icon: Clock },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal`, icon: Flame },
    { label: "RATING", value: `${workout.rating} / 5.0`, icon: Star },
  ];

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-[#ccff00] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span>Library</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-300 font-medium">{workout.name}</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column — Visual / Media */}
        <div className="lg:col-span-6 w-full">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#13161d] border border-[#1f232b] shadow-2xl group">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
            />
            {/* Subtle gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d]/80 via-transparent to-black/20 pointer-events-none" />

            {/* Muscle Group Badges on media */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="px-3 py-1 rounded-lg bg-[#090a0d]/80 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-[#ccff00] border border-[#ccff00]/30 shadow-lg"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* In-Plan Indicator Badge */}
            {inPlan && (
              <div className="absolute bottom-4 left-4 bg-[#ccff00] text-[#090a0d] text-xs font-bold uppercase px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Locked in Today&apos;s Plan</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column — Details & Specifications */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          {/* Header & Description */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-2.5 py-1 rounded bg-[#1f232b] text-[11px] font-bold uppercase tracking-widest text-zinc-300">
                {workout.difficulty} Level
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-400 font-medium">
                {workout.duration} Minutes Session
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              {workout.name}
            </h1>

            <p className="mt-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Key Specs Table / Panel */}
          <div className="bg-[#12141a] border border-[#1f232b] rounded-2xl p-5 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>Key Specifications</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {keySpecs.map((spec) => {
                const IconComponent = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="bg-[#171a22] border border-[#1f232b] rounded-xl p-3 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                      <IconComponent className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">
                        {spec.label}
                      </span>
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-white line-clamp-1">
                      {spec.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="bg-[#12141a] border border-[#1f232b] rounded-2xl p-5 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-display mb-4">
              INSTRUCTIONS
            </h3>

            <ol className="space-y-3">
              {workout.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-[#1e232d] border border-[#2d3442] text-[#ccff00] text-xs font-black flex items-center justify-center shrink-0 mt-0.5 font-display">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-0.5">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3">
            {/* Primary Button: Add to today's plan */}
            <button
              onClick={() => addToTodayPlan(workout)}
              disabled={inPlan}
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md ${
                inPlan
                  ? "bg-[#181d14] border border-[#ccff00]/40 text-[#ccff00] cursor-default"
                  : planIsFull
                  ? "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700"
                  : "bg-[#ccff00] hover:bg-[#d6ff33] text-[#090a0d] shadow-[0_4px_20px_-4px_rgba(204,255,0,0.35)] hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {inPlan ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Today&apos;s Plan</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 stroke-[2.5]" />
                  <span>
                    {planIsFull ? "Today's Plan Full (5/5)" : "Add to Today's Plan"}
                  </span>
                </>
              )}
            </button>

            {/* Secondary Button: Save for later */}
            <button
              onClick={() => addToSaved(workout)}
              disabled={inSaved}
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border ${
                inSaved
                  ? "bg-[#171a22] border-zinc-700 text-zinc-400 cursor-default"
                  : "bg-[#13161d] hover:bg-[#1a1e27] border-zinc-700 hover:border-zinc-500 text-zinc-200 active:scale-98"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${inSaved ? "fill-zinc-400" : "text-zinc-400"}`}
              />
              <span>{inSaved ? "Saved in Library" : "Save for Later"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
