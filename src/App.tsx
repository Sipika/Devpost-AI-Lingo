import { useState } from 'react';
import { NavBar } from './components/NavBar';

type Tab = 'game' | 'podcasts' | 'reading' | 'events';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('game');

  const renderContent = () => {
    switch (activeTab) {
      case 'game':
        return <div className="p-4 text-center text-slate-200">🚀 <strong>AI‑Lingo Game</strong> – Match‑3 nodes to learn AI basics.</div>;
      case 'podcasts':
        return (
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold text-slate-100">AI Podcasts</h2>
            <ul className="list-disc list-inside text-slate-200">
              <li><a href="#" className="underline hover:text-slate-400">AI Explained – Simple AI concepts</a></li>
              <li><a href="#" className="underline hover:text-slate-400">Machine Learning Minute</a></li>
              <li><a href="#" className="underline hover:text-slate-400">Data Science Talk</a></li>
            </ul>
          </div>
        );
      case 'reading':
        return (
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold text-slate-100">AI Articles</h2>
            <ul className="list-disc list-inside text-slate-200">
              <li><a href="#" className="underline hover:text-slate-400">Understanding Neural Networks</a></li>
              <li><a href="#" className="underline hover:text-slate-400">What is Bias in AI?</a></li>
              <li><a href="#" className="underline hover:text-slate-400">Intro to Reinforcement Learning</a></li>
            </ul>
          </div>
        );
      case 'events':
        return (
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold text-slate-100">AI in Daily Life</h2>
            <p className="text-slate-200">How your phone suggests contacts, how streaming services recommend movies, and how smart home devices learn your habits.</p>
          </div>
        );
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
