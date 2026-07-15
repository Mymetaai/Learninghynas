# Kitsune's Path — Spanish Vocabulary Learning Platform

Kitsune's Path (also known as TheLearningHyena's Notebook) is a gamified, interactive Spanish language learning application built with React, TypeScript, Vite, and Tailwind CSS. The app features 3D assets, Framer Motion animations, progress tracking, and interactive exercises.

## 🚀 Features

- **Interactive Adventure Map**: Winding SVG paths representing quest nodes leading up to a Guardian Boss Battle.
- **3D Kitsune Companion**: An interactive, animated 3D pet rendered with Three.js.
- **Yuki Boss Battle (HP Duel)**: A high-stakes playable screen featuring HP tracking, live questions, combo systems, and custom victory/defeat screens.
- **Unified Vocab Trainer**: Flashcard fan rendering, auto-playing modes, and matching pairs shuffle systems.
- **Design Language**: A beautiful cream, navy, and terracotta light theme with smooth animations.

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS tokens (Cream/Navy/Terracotta light theme)
- **Animations**: Framer Motion
- **3D Graphics**: Three.js
- **State Management**: Zustand
- **Routing**: React Router DOM

## 📂 Project Structure

- `src/components/`: Reusable components (e.g., exercises, 3D Kitsune, Confetti, Flashcards).
- `src/screens/`: Main page layouts (e.g., Boss Battle, Shop, World Map, Profile).
- `src/state/`: Zustand stores for player progress, statistics, companion modes, etc.
- `src/content/`: Quest metadata, worlds, stories, and vocabulary JSON structures.

## 💻 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
