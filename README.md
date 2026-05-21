# TheDeductionist (Murdle)

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini](https://img.shields.io/badge/AI-Gemini%20API-orange?logo=google&logoColor=white)](https://ai.google.dev/)

> **Unravel the truth. One mark at a time.**

**TheDeductionist** is a premium, procedurally generated logic puzzle game inspired by *Murdle*. Step into the shoes of an investigator, analyze clues, mark your deduction matrix, and build a airtight case to accuse the killer.

---

## 🔍 Key Features

### 1. Procedural Puzzle Generator
- **Infinite Replayability**: Generates completely unique puzzles on every run using a customizable seed system.
- **Conflict-Free Solver**: An embedded backtracking solver validates that every generated puzzle has exactly one logical solution with zero contradictions.
- **Scalable Grid Size**: Choose your complexity from **3x3 to 7x7** grid configurations.
- **Ranks / Difficulties**: 
  - **Cadet**: A gentle learning curve with generous hypothesis verifications.
  - **Sergeant**: The standard detective experience.
  - **Inspector**: High stakes, fewer verifications, tighter constraints.
  - **Special Agent**: One shot to solve it. No safety nets.

### 2. AI Narrative Engine
- Powered by the **Google Gemini API**, the game transforms dry logic rules (e.g. `Victor Hale != Seven-Iron`) into immersive, atmospheric narrative prose in real-time.
- Unlocks creative and contextual writing styles fitting the theme.

### 3. Sleek Interactive UI/UX
- **Interactive Evidence Grid**: A custom-drawn logic matrix featuring smooth cell toggle interactions (O, X, and empty) and smart auto-propagation lines to speed up your solving.
- **Interactive Dossiers**: View detailed suspect backstories, weapon specs (weights/materials), and location trace evidence to gather clues.
- **Accuse Panel**: Make your final accusation by specifying the Suspect, Weapon, and Location.
- **Step-by-Step Walkthrough**: Stuck on a clue? Press the **Solve** (💡) button to see a beautifully animated step-by-step logical breakdown of how each clue helps solve the grid.

### 4. Cinematic Settings & Themes
Switch dynamically between three custom-designed aesthetic visual themes:
- 🔵 **Modern Detective**: A sleek cyberpunk-noir cyber-hacker station.
- 🔴 **Noir Mystery**: A gritty, dark monochromatic environment with stark blood-red accents.
- 🔮 **Fantasy Realm**: A mystical, alchemical interface glowing with arcane purple and gold energy.

---

## 🛠️ Tech Stack
- **Framework**: React 19 (TypeScript)
- **Bundler**: Vite 8
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with dynamic CSS variables

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cacheparadox/Murdle.git
   cd Murdle
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Add your Gemini API Key**:
   - Open the game settings in the bottom-left corner of the main menu.
   - Enter your Gemini API key (no billing required, standard free-tier keys work perfectly) to enable the AI Narrative Engine.

---

## ⚖️ Game Rules
To solve the crime, you must determine which **Suspect** committed the murder with which **Weapon** at which **Location**.
- Each suspect is associated with exactly one weapon and one location.
- Use the clues in the briefing to mark relationships on the grid:
  - Place a green circle (**O**) if a connection is true.
  - Place a red cross (**X**) if a connection is false.
- Use your deduction skills to fill out the remaining grids. Once you are sure of the murderer triad, click **ACCUSE** and lock in the guilty party!
