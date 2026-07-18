import { HashRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import GamePage from './pages/GamePage';
import PodcastsPage from './pages/PodcastsPage';
import ReadingPage from './pages/ReadingPage';
import DailyLifePage from './pages/DailyLifePage';
import NewsPage from './pages/NewsPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 text-slate-100 flex flex-col items-center p-4 relative overflow-x-hidden">
        
        {/* Glow ambient background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[130px]" />
          <div className="absolute top-[40%] right-[20%] w-[35%] h-[35%] rounded-full bg-indigo-500/10 blur-[130px]" />
        </div>

        <header className="w-full max-w-5xl flex items-center justify-between mb-8 mt-4">
          <h1 className="text-4xl font-black bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
            AI‑Lingo
          </h1>
        </header>

        {/* Re-designed welcome container */}
        <div className="w-full max-w-5xl p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-lg mb-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-indigo-500/5 to-emerald-500/5 -z-10" />
          <h2 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            Welcome to AI‑Lingo! 🎉
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Explore the app by switching the tabs below to play the match-3 game, listen to custom podcasts, read papers, or check the latest AI news!
          </p>
        </div>

        <NavBar />

        <main className="w-full max-w-5xl mt-2 mb-12">
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