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
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 text-slate-100 flex flex-col items-center p-4 relative overflow-x-hidden bg-grid">
        
        {/* Glow ambient background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[130px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[130px]" />
          <div className="absolute top-[40%] right-[20%] w-[35%] h-[35%] rounded-full bg-indigo-500/10 blur-[130px]" />
        </div>

        <header className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 mb-6 mt-4 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-to-tr from-violet-600 via-indigo-500 to-emerald-400 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-violet-500/20 border border-white/25 select-none">
              A
            </span>
            <h1 className="text-3xl font-black bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
              AI‑Lingo
            </h1>
          </div>
          <NavBar />
        </header>

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