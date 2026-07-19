# AI-Lingo

An interactive, high-fidelity language track exploration dashboard styled with premium dark glassmorphism, designed to teach core AI and computer science concepts alongside everyday vocabulary.

👉 **Live URL**: [https://sipika.github.io/Devpost-AI-Lingo/](https://sipika.github.io/Devpost-AI-Lingo/)

---

## 🚀 How AI Models Were Used in Development

This project was built and optimized utilizing state-of-the-art AI agents:

### 1. Codex
*   **Grid Cascading & Animation Physics**: Codex was used to build the core game board matching loops in the **AI Cascade Game**. It handled matrix offset checks, column collapsing indices, dynamic refilling animations (`animate-fall`, `animate-pop`), and matching sweeps safely without mutating state directly.
*   **Performance Engineering**: Codex streamlined React state updates during high-frequency swap and collapse render cycles, ensuring smooth frame rates.

### 2. GPT-5.6 (Low & High Tiers)
*   **UI Redesign & CSS Architecture**: GPT-5.6 mapped the high-fidelity design mockup specifications exactly to React Tailwind CSS classes and our modular custom theme configuration (`theme.css` and `index.css`). It formulated the ambient glow blurs, glass cards styling parameters, and responsive grid layouts.
*   **SpeechSynthesis Orchestration**: GPT-5.6 engineered the sequential speech synthesis queue inside the Podcasts player, configuring line-by-line reading callbacks to prevent memory blocks or narration lockups.
*   **Interactive Explanations**: GPT-5.6 generated child-friendly explanations for complex AI architectures in the Daily Life section (translating deep-learning recommender engines and neural network voice transcribers to simple analogies).

---

## 🛠️ Features

1.  **🎮 AI Cascade Game**: Swap nodes matching deep learning systems (Data, Model, Prompt, Neuron, Output, Bias) to trigger score multipliers and display real-time glossary facts.
2.  **🎙️ Explore Podcasts**: Narration voice synthesis with a bottom floating media control player and dynamic sidebar recommendations.
3.  **📚 Reading Feed**: Responsive card catalog displaying custom-difficulty articles with bookmarking metrics.
4.  **🎯 Daily Life AI Connections**: Simplified breakdowns explaining the exact algorithm tech stacks behind everyday routines (restaurants, cafés, maps, transit, meetings).
5.  **📰 News Feed**: Interactive breakthrough articles list with load-more controls and likes toggling.

---

## 💻 Local Setup & Installation

### Prereqs
- Node.js (v18+)
- npm

### Instructions
1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Sipika/Devpost-AI-Lingo.git
    cd Devpost-AI-Lingo
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open the local server (e.g. `http://localhost:5173/Devpost-AI-Lingo/`) in your browser.
4.  **Build for Production**:
    ```bash
    npm run build
    ```
