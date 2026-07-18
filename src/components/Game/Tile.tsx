import React from 'react';
import './Tile.css';

type TileProps = {
  concept: string; // e.g., 'bias', 'rag'
  icon: string; // emoji or SVG
  onClick: () => void;
};

const Tile: React.FC<TileProps> = ({ concept, icon, onClick }) => {
  return (
    <div
      className="tile glass cursor-pointer flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105"
      style={{ width: '80px', height: '80px', fontSize: '1.5rem' }}
      onClick={onClick}
    >
      <span role="img" aria-label={concept}>{icon}</span>
      <div className="text-xs text-slate-200 mt-1 capitalize">{concept}</div>
    </div>
  );
};

export default Tile;
