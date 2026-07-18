import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import GamePage from './pages/GamePage';
import PodcastsPage from './pages/PodcastsPage';
import ReadingPage from './pages/ReadingPage';
import DailyLifePage from './pages/DailyLifePage';
import NewsPage from './pages/NewsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4">
        <header className="w-full max-w-5xl flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-violet-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            AI‑Lingo
          </h1>
        </header>
        <NavBar />
        <main className="w-full max-w-5xl mt-4">
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
    </BrowserRouter>
  );
}
