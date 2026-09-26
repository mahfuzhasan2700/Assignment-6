# 💪 FitLog — Workout Library & Daily Training Log

> **"TRAIN WITH INTENT. LOG EVERY SET."**  
> FitLog is a dark, high-performance gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

---

## 🔗 Project Links

- **Live Demo:** [https://fitlog-workout.vercel.app](https://fitlog-workout.vercel.app) *(Replace with your live deployment URL)*
- **GitHub Repository:** [https://github.com/Perseus2700/Assignment-6](https://github.com/Perseus2700/Assignment-6)

---

## 📖 Project Overview

**FitLog** is an all-in-one gym logging and workout discovery application built for dedicated lifters and fitness enthusiasts. Inspired by bold gym aesthetics and modern interface standards, FitLog provides immediate access to 12 fundamental compound and isolation lifts, real-time workload estimation, daily planning with a strict 5-lift cap, and persistent progress logging that survives browser reloads.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15+ (App Router)** | High-performance React framework for server components and dynamic routing (`/`, `/workout/[id]`, `/my-plan`) |
| **React 19** | Modern UI rendering with concurrent features and state hooks |
| **Tailwind CSS v4** | Clean, responsive dark gym styling with tailored neon-lime (`#ccff00`) accents and glassmorphism |
| **Google Fonts (Oswald & Inter)** | Bold industrial display typography paired with clean readable body text |
| **Lucide React** | Lightweight SVG iconography for gym equipment, workout metrics, and interactive controls |
| **Canvas Confetti** | Celebratory visual micro-interactions when workouts are marked as completed |
| **Web Storage API (localStorage)** | Seamless client-side persistence for Today's Plan and Saved workouts |

---

## ✨ Key Features (Minimum 5 Highlighted)

### 1. 🏋️ Dynamic Workout Library & Multi-Attribute Sorting
- Browse all 12 core lifts across every major muscle group (Chest, Back, Legs, Arms, Core, Shoulders, Full Body).
- **Challenge C1**: Integrated interactive "Sort By" dropdown allowing on-the-fly re-ordering by **Duration**, **Calories Burned**, or **Rating**.
- Instant muscle group category filtering chips and real-time live search.

### 2. 📋 Comprehensive Two-Column Exercise Detail View
- Dynamic routing (`/workout/[id]`) rendering high-resolution exercise media, muscle tags, and difficulty badges.
- **Key Specs Panel**: Instant glance at Equipment, Difficulty, Sets, Reps, Duration, Calories, and Rating.
- **4-Step Technique Guide**: Numbered, step-by-step form execution cues to maximize efficiency and safety.
- Dual action triggers: **"Add to today's plan"** and **"Save for later"** with custom feedback toasts.

### 3. 📊 Real-Time Daily Metrics Summary Dashboard
- Three live stat cards on the **My Plan** page (`/my-plan`):
  - **Exercises**: Current active lifts with visual progress towards the daily 5-lift cap.
  - **Minutes**: Live calculated total training duration in minutes.
  - **Calories**: Live aggregated caloric expenditure based on chosen lifts.
- Values immediately re-calculate whenever an exercise is added, removed, or toggled.

### 4. 🔒 Dual-Tab Planning System & Daily 5-Lift Cap Enforcement
- Seamless switching between **Today's Plan** and **Saved** tabs with individual counter pills.
- Enforces the realistic workout cap: prevents adding more than 5 lifts to today's plan to encourage disciplined, high-intensity training.
- Persistent state backed by `localStorage` ensuring your plan remains intact across page reloads and browser sessions.

### 5. ✅ Interactive Workout Execution ("Mark as Done" & Quick Remove)
- **Challenge C3**: Mark individual exercises as completed with real-time visual feedback (strike-through text, green check badges, and completion tags).
- Confetti celebration triggered upon workout completion.
- One-click removal (`X` button) with responsive toast confirmation.

### 6. 🎨 Premium Dark Gym Aesthetic & Custom 404 Experience
- Deep obsidian background (`#090a0d`), slate card elevation, and electric lime highlights (`#ccff00`).
- Fully responsive across mobile, tablet, and ultra-wide desktop viewports.
- Themed custom 404 error page (*"Lost in the Gym"*) with quick routing back to the exercise catalog.

---

## 📡 API Integration

FitLog fetches real-time exercise information from the official worker endpoints:
- **All Workouts:** `https://api.abcz.workers.dev/api/fitlog`
- **Single Workout:** `https://api.abcz.workers.dev/api/fitlog/:id`
- *Includes graceful fallback dataset to ensure zero downtime and uninterrupted offline browsing.*

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17 or higher
- **npm** or **pnpm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fitlog-app.git
   cd fitlog-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

5. Build for production:
   ```bash
   npm run build
   npm start
   ```

---

## 📱 Responsive Breakpoints Tested

- **Mobile (375px - 640px)**: Compact collapsible navigation drawer, stacked hero banner, 1-column workout grid, and full-width stat cards.
- **Tablet (641px - 1024px)**: 2-column library grid, side-by-side metrics cards.
- **Desktop (1025px+)**: Full 3-column layout, two-column split exercise detail specs, fixed sticky navbar with live counters.

---

## 📄 License & Attribution

Designed and developed for **B14-A6 FitLog Assignment**.  
© 2026 FitLog — Workout Library. *Train hard, log honest.*