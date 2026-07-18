import React from 'react';

type TabKey = 'game' | 'podcasts' | 'reading' | 'events';

interface NavBarProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'game' as TabKey, label: 'Game' },
    { key: 'podcasts' as TabKey, label: 'Podcasts' },
    { key: 'reading' as TabKey, label: 'Reading' },
    { key: 'events' as TabKey, label: 'Daily Life' },
  ];

  return (
    <nav className="flex space-x-4 text-lg font-medium">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-3 py-1 rounded transition-colors duration-200 ${
            activeTab === tab.key
              ? 'bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 text-slate-900'
              : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};
