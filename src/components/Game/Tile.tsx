import React from 'react';
import './Tile.css';

type TileProps = {
  concept: string; // e.g., 'bias', 'rag'
  icon: string; // emoji or SVG
  selected: boolean;
  onClick: () => void;
};

const Tile: React.FC<TileProps> = ({ concept, icon, selected, onClick }) => {
  return (
    <div
      className={`tile glass cursor-pointer flex flex-col items-center justify-center transition-all duration-200 ${
        selected ? 'ring-2 ring-violet-400 bg-violet-500/25 scale-105 shadow-[0_0_20px_rgba(139,92,246,0.6)]' : 'hover:scale-105'
      }`}
      style={{ width: '80px', height: '80px', fontSize: '1.6rem' }}
      onClick={onClick}
    >
      <span role="img" aria-label={concept} className="select-none">{icon}</span>
      <div className="text-[10px] text-slate-300 mt-1 capitalize font-medium select-none">{concept}</div>
    </div>
  );
};

export default Tile;
