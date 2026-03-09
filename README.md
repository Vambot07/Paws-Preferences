# Paws & Preferences 🐾

A fun, interactive Tinder-style swiping application for discovering and rating cute cats! Built with React, Tailwind CSS, and Framer Motion.

## Features ✨

*   **Tinder-Style Swiping:** Swipe right to "like" a cat or swipe left to "pass". You can also use the heart and "X" buttons!
*   **Haptic Feedback:** Enjoy subtle phone vibrations when swiping or clicking buttons (on supported devices).
*   **Dynamic Summary View:** When you finish swiping through your deck of cats, view a polished dashboard summarizing your top picks!
*   **Full-Screen Modal:** Click on any of your liked cats in the summary view to see them in a full-screen, high-quality modal.
*   **Beautiful Animations:** Smooth, bouncy card animations and satisfying visual feedback built with `framer-motion` and `canvas-confetti`.
*   **Live Data:** Fresh cat pictures are fetched dynamically from the Cataas (Cats as a Service) API.

## Tech Stack 🛠️

*   **Frontend Library:** [React 18](https://react.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **API:** [Cataas API](https://cataas.com/)

## Getting Started 🚀

To run this project locally, simply follow these steps:

### Prerequisites

You will need [Node.js](https://nodejs.org/en/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Vambot07/Paws-Preferences.git
    cd Paws-Preferences
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` (or the port Vite provides) to start swiping!

## How to Play 🎮

1.  When the app loads, you will be presented with a stack of cat cards.
2.  **To Like a Cat:** Swipe the top card to the right, or click the pink Heart button.
3.  **To Pass:** Swipe the top card to the left, or click the red 'X' button.
4.  Once all cats have been swiped, you will automatically be taken to a summary screen displaying all the cats you liked.
5.  Click on any cat in the summary to enlarge it.
6.  Click the **"Find More Cats"** button to fetch a new deck and play again!
