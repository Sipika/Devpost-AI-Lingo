import React, { useState } from 'react';
import { Game } from '../components/Game';
import { GuideAvatar } from '../components/Guide/GuideAvatar';
import { Card } from '../components/Card';

const GamePage: React.FC = () => {
  const [showGuide, setShowGuide] = useState(true);

    return (
      <Card className="p-6 space-y-6">
        <div className="p-4 space-y-8">
          {/* Toggle button */}
          <button
            onClick={() => setShowGuide((v) => !v)}
            className="px-3 py-1 mb-4 bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 text-slate-900 rounded hover:opacity-90 transition"
          >
            {showGuide ? 'Hide' : 'Show'} Tutorial
          </button>

          {showGuide && (
            <GuideAvatar title="Welcome to AI‑Lingo!">
              Match three tiles that share the same AI concept. When a match occurs, a concise tip appears, teaching you about that concept (e.g., bias, RAG, prompt‑engineering). Use the icons to identify concepts and improve your score. Have fun learning while playing!
            </GuideAvatar>
          )}

          <Game />
        </div>
      </Card>
    );
};

export default GamePage;
