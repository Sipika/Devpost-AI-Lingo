import { HashRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import GamePage from './pages/GamePage';
import PodcastsPage from './pages/PodcastsPage';
import ReadingPage from './pages/ReadingPage';
import DailyLifePage from './pages/DailyLifePage';
import NewsPage from './pages/NewsPage';
import { Bell } from 'lucide-react';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0a0e1a] text-slate-100 flex flex-col items-center relative overflow-x-hidden bg-grid">

        {/* Ambient glow background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] rounded-full bg-violet-600/8 blur-[160px]" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/6 blur-[160px]" />
          <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[160px]" />
          <div className="absolute bottom-[20%] left-[15%] w-[30%] h-[30%] rounded-full bg-pink-500/4 blur-[140px]" />
          <div className="absolute top-[60%] left-[40%] w-[25%] h-[25%] rounded-full bg-orange-500/4 blur-[120px]" />
        </div>

        {/* Top Header Bar */}
        <header className="w-full max-w-[1200px] px-4 sm:px-6 pt-5 pb-3">
          <div className="glass rounded-full px-5 py-2.5 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span className="w-9 h-9 bg-gradient-to-tr from-violet-600 via-indigo-500 to-emerald-400 rounded-xl flex items-center justify-center font-black text-white text-base shadow-lg shadow-violet-500/25 border border-white/20 select-none">
                A
              </span>
              <h1 className="text-lg font-black gradient-text tracking-tight select-none">
                AI‑Lingo
              </h1>
            </div>

            {/* Nav */}
            <NavBar />

            {/* Profile Area */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button 
                onClick={() => alert("🔔 Notifications:\n1. Welcome to AI-Lingo! Explore Daily Life scenarios now.\n2. Complete Level 3 in AI Cascade to join the leaderboard!")}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/5 transition relative cursor-pointer active:scale-95"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-violet-500 rounded-full border-2 border-[#0a0e1a]" />
              </button>
              <div 
                onClick={() => alert("👤 Profile Settings:\nUser: Saurabh\nLanguage Track: Spanish 🇪🇸\nStatus: Fluent in AI & Lingo")}
                className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-500/20 border border-white/15 select-none cursor-pointer active:scale-95"
              >
                S
              </div>
            </div>
          </div>
        </header>

        <main className="w-full max-w-[1200px] px-4 sm:px-6 mt-2 mb-12">
          <Routes>
            <Route path="/" element={<GamePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/reading" element={<ReadingPage />} />
            <Route path="/daily" element={<DailyLifePage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}