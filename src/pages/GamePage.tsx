import React, { useState } from 'react';
import { Game } from '../components/Game';
import { Bot, Lightbulb } from 'lucide-react';
import { Card } from '../components/Card';

const GamePage: React.FC = () => {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="min-h-screen text-white p-4 md:p-8 flex flex-col font-sans max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <header className="flex justify-between items-center pb-4 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-300 bg-clip-text text-transparent">
            AI Cascade Game
          </h1>
          <p className="text-slate-400 mt-1">Match 3 tiles of the same AI concept to cascade the grid and unlock details!</p>
        </div>
        
        <button
          onClick={() => setShowGuide((v) => !v)}
          className="px-4 py-1.5 bg-slate-800/80 border border-white/10 text-slate-200 rounded-full hover:bg-slate-700 transition text-xs font-semibold shadow-md shrink-0"
        >
          {showGuide ? 'Hide' : 'Show'} Guide
        </button>
      </header>

      {showGuide && (
        <Card className="p-5 glass border-white/10 flex items-start gap-4 animate-fade-in">
          <div className="relative h-12 w-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shrink-0">
            <Bot className="w-7 h-7 text-cyan-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 flex items-center gap-1.5 text-sm md:text-base">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              Welcome to AI Cascade!
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">
              Swap adjacent tiles on the 7x6 board to line up 3 or more matching AI items (Data, Model, Prompt, Neuron, Output, Bias). Matching them clears the line, cascades new items down, boosts your score, and reveals an interactive AI learning fact below the board!
            </p>
          </div>
        </Card>
      )}

      <div className="py-2">
        <Game />
      </div>
    </div>
  );
};

export default GamePage;
