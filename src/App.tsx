import { useState } from 'react';
import { NavBar } from './components/NavBar';

type Tab = 'game' | 'podcasts' | 'reading' | 'events';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('game');

  const renderContent = () => {
    switch (activeTab) {
      case 'game':
        return <div className="p-4 text-center text-slate-200">Game component will appear here.</div>;
      case 'podcasts':
        return <div className="p-4 text-center text-slate-200">Simple list of AI podcasts will appear here.</div>;
      case 'reading':
        return <div className="p-4 text-center text-slate-200">AI articles reading section will appear here.</div>;
      case 'events':
        return <div className="p-4 text-center text-slate-200">Daily life AI concepts explanations will appear here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4">
      <header className="w-full max-w-5xl flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
          AI‑Lingo
        </h1>
      </header>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="w-full max-w-5xl mt-4">
        {renderContent()}
      </main>
    </div>
  );
}
