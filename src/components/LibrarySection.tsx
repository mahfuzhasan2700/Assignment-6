"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Workout, SortOption } from "@/types/workout";
import { WorkoutCard } from "@/components/WorkoutCard";
import { FALLBACK_WORKOUTS, API_BASE_URL } from "@/data/fallbackWorkouts";
import { ChevronDown, RefreshCw } from "lucide-react";

export const LibrarySection: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("Duration");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch workouts from API with robust fallback
  useEffect(() => {
    let isMounted = true;
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_BASE_URL, {
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`API responded with status: ${res.status}`);
        }

        const data: Workout[] = await res.json();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setWorkouts(data);
          } else {
            setWorkouts(FALLBACK_WORKOUTS);
          }
        }
      } catch (err) {
        console.warn("API fetch error, using fallback workout library:", err);
        if (isMounted) {
          setWorkouts(FALLBACK_WORKOUTS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sort workouts
  const sortedWorkouts = useMemo(() => {
    const result = [...workouts];
    result.sort((a, b) => {
      if (sortBy === "Duration") {
        return Number(b.duration) - Number(a.duration);
      } else if (sortBy === "Calories") {
        return Number(b.caloriesBurned) - Number(a.caloriesBurned);
      } else if (sortBy === "Rating") {
        return Number(b.rating) - Number(a.rating);
      }
      return 0;
    });
    return result;
  }, [workouts, sortBy]);

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Challenge C1: Sort By Dropdown */}
        <div className="relative self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-[#131518] hover:bg-[#181a20] border border-[#1e2127] text-zinc-300 px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all focus:outline-none"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span className="text-zinc-500">Sort By</span>
            <span className="text-white font-bold">{sortBy}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-[#131518] border border-[#1e2127] rounded-xl shadow-2xl py-1 z-30">
              {(["Duration", "Calories", "Rating"] as SortOption[]).map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    sortBy === option
                      ? "text-[#ccff00] bg-[#1a1d24]"
                      : "text-zinc-400 hover:text-white hover:bg-[#181a20]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-flex items-center gap-3 text-zinc-400 font-medium text-sm bg-[#131518] border border-[#1e2127] px-5 py-3 rounded-full animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin text-[#ccff00]" />
            <span>Loading workouts from library…</span>
          </div>
        </div>
      ) : (
        /* 3x4 Grid on Large Screens */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};
