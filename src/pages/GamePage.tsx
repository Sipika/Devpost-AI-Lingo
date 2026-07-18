import React, { useState } from 'react';
import { Game } from '../components/Game';
import { GuideAvatar } from '../components/Guide/GuideAvatar';
import { Card } from '../components/Card';

const GamePage: React.FC = () => {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-white/5 pb-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200">
          AI Cascade Game
        </h2>
        <button
          onClick={() => setShowGuide((v) => !v)}
          className="px-4 py-1.5 bg-slate-800/80 border border-white/10 text-slate-200 rounded-full hover:bg-slate-700 transition text-xs font-semibold shadow-md"
        >
          {showGuide ? 'Hide' : 'Show'} Guide
        </button>
      </div>

      {showGuide && (
        <GuideAvatar title="Welcome to AI‑Lingo!">
          Match three tiles that share the same AI concept. When a match occurs, a concise tip appears, teaching you about that concept (e.g., bias, RAG, prompt‑engineering). Use the icons to identify concepts and improve your score. Have fun learning while playing!
        </GuideAvatar>
      )}

      <div className="py-2">
        <Game />
      </div>
    </Card>
  );
};

export default GamePage;
