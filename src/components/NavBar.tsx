import React from 'react';

import { Link, useLocation } from 'react-router-dom';

type TabKey = 'game' | 'podcasts' | 'reading' | 'events' | 'news';

interface NavBarProps {
  setActiveTab?: (tab: TabKey) => void; // No longer needed, keep optional for compatibility
}

export const NavBar: React.FC<NavBarProps> = () => {
  const location = useLocation();
  const tabs: { key: TabKey; label: string; path: string }[] = [
    { key: 'game', label: 'Game', path: '/game' },
    { key: 'podcasts', label: 'Podcasts', path: '/podcasts' },
    { key: 'reading', label: 'Reading', path: '/reading' },
    { key: 'events', label: 'Daily Life', path: '/daily' },
    { key: 'news', label: 'News', path: '/news' },
  ];

  return (
    <nav className="flex justify-center space-x-4 p-2 glass rounded-b-lg">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          to={tab.path}
          className={`px-3 py-1 rounded transition-colors duration-200 ${
            location.pathname === tab.path
              ? 'bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 text-slate-900'
              : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
};
