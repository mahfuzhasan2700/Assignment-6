"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Workout } from "@/types/workout";
import { useToast } from "@/context/ToastContext";
import confetti from "canvas-confetti";

interface Metrics {
  exercises: number;
  minutes: number;
  calories: number;
  completed: number;
}

interface PlanContextType {
  todayPlan: Workout[];
  savedWorkouts: Workout[];
  isLoaded: boolean;
  metrics: Metrics;
  addToTodayPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => boolean;
  removeFromTodayPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleMarkAsDone: (id: number) => void;
  isInTodayPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  clearTodayPlan: () => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const STORAGE_KEY_PLAN = "fitlog_today_plan_v1";
const STORAGE_KEY_SAVED = "fitlog_saved_v1";
const DAILY_CAP = 5;

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(STORAGE_KEY_PLAN);
      const storedSaved = localStorage.getItem(STORAGE_KEY_SAVED);

      if (storedPlan) {
        setTodayPlan(JSON.parse(storedPlan));
      } else {
        // Preload default workouts matching Figma preview (e.g. 2 workouts)
        // This gives immediate visual match like in Figma status badges (Plan: 2)
        const initialPlan = [
          {
            id: 1,
            name: "Barbell Bench Press",
            image: "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740",
            muscleGroups: ["Chest", "Arms"],
            equipment: "Barbell, Bench",
            difficulty: "Intermediate",
            duration: 25,
            caloriesBurned: 180,
            sets: 4,
            reps: "6-8",
            rating: 4.8,
            description: "A compound press that builds chest thickness, triceps, and pressing power from a stable bench.",
            instructions: [
              "Lie on the bench with eyes under the bar and feet planted.",
              "Unrack with locked elbows and lower the bar to mid-chest.",
              "Press up in a slight arc until elbows lock without bouncing.",
              "Keep shoulder blades pinched and a natural arch in the back."
            ],
            completed: false,
          },
          {
            id: 2,
            name: "Pull-Up",
            image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740",
            muscleGroups: ["Back", "Arms"],
            equipment: "Pull-up Bar",
            difficulty: "Intermediate",
            duration: 15,
            caloriesBurned: 120,
            sets: 4,
            reps: "6-10",
            rating: 4.7,
            description: "Bodyweight vertical pull that hammers lats, biceps, and grip while improving relative strength.",
            instructions: [
              "Hang from the bar with a shoulder-width overhand grip.",
              "Brace your core and pull your chest toward the bar.",
              "Pause at the top with elbows tucked, then lower with control.",
              "Avoid kipping unless you are training a specific variation."
            ],
            completed: false,
          }
        ];
        setTodayPlan(initialPlan);
        localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(initialPlan));
      }

      if (storedSaved) {
        setSavedWorkouts(JSON.parse(storedSaved));
      }
    } catch (e) {
      console.error("Failed to load plans from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(todayPlan));
    } catch (e) {
      console.error("Failed to save todayPlan to localStorage", e);
    }
  }, [todayPlan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedWorkouts));
    } catch (e) {
      console.error("Failed to save savedWorkouts to localStorage", e);
    }
  }, [savedWorkouts, isLoaded]);

  // Compute live metrics
  const metrics: Metrics = useMemo(() => {
    const exercises = todayPlan.length;
    const minutes = todayPlan.reduce((sum, item) => sum + (Number(item.duration) || 0), 0);
    const calories = todayPlan.reduce((sum, item) => sum + (Number(item.caloriesBurned) || 0), 0);
    const completed = todayPlan.filter((item) => item.completed).length;

    return { exercises, minutes, calories, completed };
  }, [todayPlan]);

  const isInTodayPlan = (id: number) => todayPlan.some((item) => item.id === id);
  const isInSaved = (id: number) => savedWorkouts.some((item) => item.id === id);

  const addToTodayPlan = (workout: Workout): boolean => {
    if (isInTodayPlan(workout.id)) {
      showToast(`${workout.name} is already in today's plan!`, "info", "Already Added");
      return false;
    }

    if (todayPlan.length >= DAILY_CAP) {
      showToast(
        `Cap of ${DAILY_CAP} lifts reached! Finish today's work before loading more.`,
        "warning",
        "Daily Limit Reached"
      );
      return false;
    }

    const newWorkout = { ...workout, completed: false, addedAt: Date.now() };
    setTodayPlan((prev) => [...prev, newWorkout]);
    showToast(`Added ${workout.name} to today's plan`, "success", "Plan Updated");
    return true;
  };

  const addToSaved = (workout: Workout): boolean => {
    if (isInSaved(workout.id)) {
      showToast(`${workout.name} is already saved!`, "info", "Saved Workout");
      return false;
    }

    const newWorkout = { ...workout, addedAt: Date.now() };
    setSavedWorkouts((prev) => [...prev, newWorkout]);
    showToast(`Saved ${workout.name} for later`, "success", "Saved");
    return true;
  };

  const removeFromTodayPlan = (id: number) => {
    const target = todayPlan.find((w) => w.id === id);
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    showToast(
      target ? `Removed ${target.name} from today's plan` : "Workout removed from plan",
      "info",
      "Removed"
    );
  };

  const removeFromSaved = (id: number) => {
    const target = savedWorkouts.find((w) => w.id === id);
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    showToast(
      target ? `Removed ${target.name} from saved` : "Workout removed from saved",
      "info",
      "Removed"
    );
  };

  const toggleMarkAsDone = (id: number) => {
    let nextStatus = false;
    let workoutName = "";

    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          nextStatus = !item.completed;
          workoutName = item.name;
          return { ...item, completed: nextStatus };
        }
        return item;
      })
    );

    if (nextStatus) {
      showToast(`Completed: ${workoutName} 💪`, "success", "Great Work!");
      // Trigger subtle celebration
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#ccff00", "#ffffff", "#8a92a0"],
        });
      } catch (e) {}
    } else {
      showToast(`Marked ${workoutName} as incomplete`, "info", "Status Updated");
    }
  };

  const clearTodayPlan = () => {
    setTodayPlan([]);
    showToast("Cleared today's plan", "info", "Plan Reset");
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        isLoaded,
        metrics,
        addToTodayPlan,
        addToSaved,
        removeFromTodayPlan,
        removeFromSaved,
        toggleMarkAsDone,
        isInTodayPlan,
        isInSaved,
        clearTodayPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
