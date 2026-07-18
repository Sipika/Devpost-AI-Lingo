import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable glass‑morphism card. Adds the .card and .glass utilities.
 */
export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const baseClass = 'card glass';
  const combined = `${baseClass} ${className}`.trim();
  return <div className={combined}>{children}</div>;
};
