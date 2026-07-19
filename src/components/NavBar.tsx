import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Gamepad2, Headphones, BookOpen, Calendar, Newspaper } from 'lucide-react';

type TabKey = 'game' | 'podcasts' | 'reading' | 'daily' | 'news';

const tabConfig: { key: TabKey; label: string; path: string; icon: React.ComponentType<any> }[] = [
  { key: 'game', label: 'Game', path: '/game', icon: Gamepad2 },
  { key: 'podcasts', label: 'Podcasts', path: '/podcasts', icon: Headphones },
  { key: 'reading', label: 'Reading', path: '/reading', icon: BookOpen },
  { key: 'daily', label: 'Daily Life', path: '/daily', icon: Calendar },
  { key: 'news', label: 'News', path: '/news', icon: Newspaper },
];

export const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      {tabConfig.map((tab) => {
        const isActive =
          location.pathname === tab.path ||
          (tab.key === 'game' && (location.pathname === '/' || location.pathname === ''));
        const Icon = tab.icon;
        return (
          <Link
            key={tab.key}
            to={tab.path}
            className={`nav-tab ${isActive ? 'nav-tab-active' : ''}`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
