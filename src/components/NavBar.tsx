import React from 'react';
import { useLocation, Link } from 'react-router-dom';

type TabKey = 'game' | 'podcasts' | 'reading' | 'daily' | 'news';

export const NavBar: React.FC = () => {
  const location = useLocation();
  const tabs: { key: TabKey; label: string; path: string }[] = [
    { key: 'game', label: 'Game', path: '/game' },
    { key: 'podcasts', label: 'Podcasts', path: '/podcasts' },
    { key: 'reading', label: 'Reading', path: '/reading' },
    { key: 'daily', label: 'Daily Life', path: '/daily' },
    { key: 'news', label: 'News', path: '/news' },
  ];

  return (
    <nav className="nav-bar glass">
      {tabs.map((tab) => {
        const isActive =
          location.pathname === tab.path ||
          (tab.key === 'game' && (location.pathname === '/' || location.pathname === ''));
        return (
          <Link
            key={tab.key}
            to={tab.path}
            className={`nav-tab ${isActive ? 'nav-tab-active' : ''}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
};
