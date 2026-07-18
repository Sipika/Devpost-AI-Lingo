import React from 'react';
import Match3Board from './Game/Match3Board';

export const Game: React.FC = () => {
  return (
    <div className="text-center text-slate-200">
      <Match3Board />
    </div>
  );
};
