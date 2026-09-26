"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Workout, SortOption } from "@/types/workout";
import { WorkoutCard } from "@/components/WorkoutCard";
import { FALLBACK_WORKOUTS, API_BASE_URL } from "@/data/fallbackWorkouts";
import { ChevronDown, Search, Filter, Sparkles, RefreshCw } from "lucide-react";

export const LibrarySection: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("All");
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

  // Filter and sort workouts
  const filteredAndSortedWorkouts = useMemo(() => {
    let result = [...workouts];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.equipment.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      );
    }

    // Muscle category filter
    if (selectedMuscle !== "All") {
      result = result.filter((w) =>
        w.muscleGroups.some(
          (m) => m.toLowerCase() === selectedMuscle.toLowerCase()
        )
      );
    }

    // Sort by selected option
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
  }, [workouts, searchQuery, selectedMuscle, sortBy]);

  const muscleCategories = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Arms",
    "Core",
    "Shoulders",
    "Full Body",
  ];

  return (
    <section id="library" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ccff00] uppercase tracking-widest mb-2 font-display">
            <span>FULL ROSTER</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Challenge C1: Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2.5 bg-[#13161d] hover:bg-[#1a1e27] border border-[#1f232b] hover:border-zinc-700 text-zinc-200 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all min-w-44 focus:outline-none"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span className="text-zinc-400">Sort By:</span>
              <span className="text-[#ccff00] font-bold">{sortBy}</span>
              <ChevronDown
                className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-[#13161d] border border-[#1f232b] rounded-xl shadow-2xl z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  {(["Duration", "Calories", "Rating"] as SortOption[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors ${
                        sortBy === option
                          ? "bg-[#1f232b] text-[#ccff00]"
                          : "text-zinc-300 hover:bg-[#181c24] hover:text-white"
                      }`}
                    >
                      <span>{option}</span>
                      {sortBy === option && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#101217] border border-[#1f232b] p-3 sm:p-4 rounded-2xl mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
        {/* Muscle Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
          {muscleCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedMuscle(category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedMuscle === category
                  ? "bg-[#ccff00] text-[#090a0d] shadow-sm font-bold"
                  : "bg-[#151921] text-zinc-400 hover:text-white hover:bg-[#1a1e27] border border-[#1f232b]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search exercises, equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151921] border border-[#1f232b] focus:border-[#ccff00]/60 text-white text-xs pl-9.5 pr-4 py-2.5 rounded-xl placeholder:text-zinc-500 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Loading Skeleton State */}
      {loading ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-zinc-400 text-sm py-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#ccff00]" />
            <span>Loading workouts from library…</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#13161d] border border-[#1f232b] rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-4/3 bg-[#181c25]" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-[#181c25] rounded w-3/4" />
                  <div className="h-4 bg-[#181c25] rounded w-1/2" />
                  <div className="pt-3 border-t border-[#1f232b] flex justify-between">
                    <div className="h-4 bg-[#181c25] rounded w-1/3" />
                    <div className="h-6 w-6 bg-[#181c25] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filteredAndSortedWorkouts.length === 0 ? (
        /* Empty Filter State */
        <div className="bg-[#13161d] border border-[#1f232b] rounded-2xl p-12 text-center max-w-md mx-auto my-12">
          <Filter className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="font-display text-xl uppercase font-bold text-white">
            NO LIFTS FOUND
          </h3>
          <p className="text-zinc-400 text-sm mt-1 mb-5">
            No exercises match your current search or category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedMuscle("All");
            }}
            className="px-4 py-2 bg-[#1f232b] hover:bg-[#ccff00] text-zinc-200 hover:text-[#090a0d] text-xs uppercase font-bold rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* 3x4 Grid on Large Screens */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredAndSortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};
