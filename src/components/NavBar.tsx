import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './Button';

type TabKey = 'game' | 'podcasts' | 'reading' | 'events' | 'news';

export const NavBar: React.FC = () => {
  const location = useLocation();
  const tabs: { key: TabKey; label: string; path: string }[] = [
    { key: 'game', label: 'Game', path: '/game' },
    { key: 'podcasts', label: 'Podcasts', path: '/podcasts' },
    { key: 'reading', label: 'Reading', path: '/reading' },
    { key: 'events', label: 'Daily Life', path: '/daily' },
    { key: 'news', label: 'News', path: '/news' },
  ];

  return (
    <nav className="flex justify-center space-x-2 p-2 glass rounded-b-lg">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          href={tab.path}
          className={
            location.pathname === tab.path
              ? 'bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 text-slate-900'
              : 'bg-gray-800 text-slate-300 hover:bg-gray-700'
          }
        >
          {tab.label}
        </Button>
      ))}
    </nav>
  );
};
