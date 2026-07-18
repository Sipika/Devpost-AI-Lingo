import React from 'react';
import Match3Board from './Game/Match3Board';

export const Game: React.FC = () => {
  return (
    <div className="p-4 text-center text-slate-200 space-y-4">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-200 mb-4">
        AI Cascade Game
      </h2>
      <Match3Board />
    </div>
  );
};
